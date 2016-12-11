import { set, signal, wait, work, Thread, t, timeline } from './timeline';

function* vblank() {
    for (; ;) {
        signal('vblank');
        yield wait(16.666667);
    }
}

function* eye() {
    for (let N = 0; ; N++) {
        yield wait('flip', N);
        yield wait(30);
        signal('eye', N);
    }
}

function* flip() {
    set('display', 1);
    for (let N = 0; ; N++) {
        yield wait('queued_flip', N);
        yield wait('vblank', 'changed');
        set('display', N & 1);
        signal('flip', N);
    }
}

interface DrawList {
    name: string;
    color: string;
    cpuMs: number;
    gpuMs: number;
};

let drawLists: DrawList[] = [
    { name: 'shadows', color: 'gray', cpuMs: 1.0, gpuMs: 1.0 },
    { name: 'prepass', color: 'darkgray', cpuMs: 1.0, gpuMs: 2.0 },
    { name: 'opaque', color: 'blue', cpuMs: 3.0, gpuMs: 6.0 },
    { name: 'translucents', color: 'yellow', cpuMs: 1.0, gpuMs: 1.0 },
    { name: 'postfx', color: 'purple', cpuMs: 0.25, gpuMs: 10.0 },
    { name: 'ui', color: 'cyan', cpuMs: 1.0, gpuMs: 1.0 },
];

function* gpu() {
    for (let N = 0; ; N++) {
        for (let list of drawLists) {
            yield wait(`cpu_${list.name}`, N);
            if (list.name == 'ui') {
                yield wait('display', (N & 1) ^ 1);
            }
            yield work(`gpu_${list.name}`, list.color, list.gpuMs, N);
        }
        signal('queued_flip', N);
    }
}

function* cpu() {
    let maxFps = 60;
    let lastFrame = -Infinity;
    for (let N = 0; ; N++) {
        yield wait(() => t - lastFrame < 1000 / maxFps);
        lastFrame = t;
        // controller throttle
        for (let list of drawLists) {
            if (N > 0) {
                yield wait(`gpu_${list.name}`, N - 1);
            }
            yield work(`cpu_${list.name}`, list.color, list.cpuMs, N);
        }
    }
}

(async function run() {
    timeline({
        canvas: <HTMLCanvasElement>document.getElementById("myCanvas"),
        threads: [
            { name: 'vblank', fn: vblank },
            // { name: 'eye', fn: eye },
            { name: 'flip', fn: flip },
            { name: 'gpu', fn: gpu },
            { name: 'cpu', fn: cpu }
        ]
    })
} ());
