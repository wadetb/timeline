import { set, signal, wait, work, Thread, t, timeline } from './timeline';

// this thread just generates a vblank signal at 60hz
function* vblank() {
    for (; ;) {
        signal('vblank');
        yield wait(16.666667);
    }
}

// this just simulates an eye watching the display, adding some extra latency, pretty 
// dumb really
function* eye() {
    for (let N = 0; ; N++) {
        // wait for the Nth page flip
        yield wait('flip', N);
        // add some latency
        yield wait(30);
        signal('eye', N);
    }
}

// maybe should be called display, this thread controls flipping the display from
// one display buffer to the other.
function* flip() {
    set('display', 1);
    for (let N = 0; ; N++) {
        // wait for the gpu to queue a flip
        yield wait('queued_flip', N);
        // wait for the vblank
        yield wait('vblank', 'changed');
        // flip the display
        set('display', N & 1);
        // signal that the flip has occured
        signal('flip', N);
    }
}

interface DrawList {
    name: string;
    color: string;
    cpuMs: number;
    gpuMs: number;
};

// the scene is divided into a bunch of arbitrary work units called draw lists, mostly to
// demonstrate multithreading later. this isn't part of the overall framework, just something
// local to this demo.
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
            // wait for CPU to finish submitting draw list
            yield wait(`cpu_${list.name}`, N);
            // ui waits for display to be ready
            if (list.name == 'ui') {
                yield wait('display', (N & 1) ^ 1);
            }
            // do drawing
            yield work(`gpu_${list.name}`, list.color, list.gpuMs, N);
        }
        // all drawing done, queue the page flip
        signal('queued_flip', N);
    }
}

function* cpu() {
    let maxFps = 60;
    let lastFrame = -Infinity;
    for (let N = 0; ; N++) {
        // limit framerate
        yield wait(() => t - lastFrame < 1000 / maxFps);
        lastFrame = t;
        // TODO: controller throttle goes here
        for (let list of drawLists) {
            if (N > 0) {
                // wait for gpu to finish using buffers from the previous frame
                yield wait(`gpu_${list.name}`, N - 1);
            }
            // fill buffers and submit draw commands
            yield work(`cpu_${list.name}`, list.color, list.cpuMs, N);
        }
    }
}

(async function run() {
    timeline({
        canvas: <HTMLCanvasElement>document.getElementById("myCanvas"),
        controls: document.getElementById("myControls"),
        threads: [
            { name: 'vblank', fn: vblank },
            // { name: 'eye', fn: eye },
            { name: 'flip', fn: flip },
            { name: 'gpu', fn: gpu },
            { name: 'cpu', fn: cpu }
        ]
    })
} ());
