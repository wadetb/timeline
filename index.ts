import { get, set, signal, wait, work, t, timeline, acquire, release } from './timeline';

// maybe should be called display, this thread controls flipping the display from
// one display buffer to the other.
function* display() {
    let lastQueueFlip = -1;
    let displayBuffer = 0;
    set('display', displayBuffer);
    acquire(`frameBuffer${displayBuffer}`);
    for (let N = 0; ; N++) {
        // wait for the vblank
        yield work('scanout', 'Scan out', displayBuffer == 0 ? '#6060a0' : displayBuffer == 1 ?  '#8080F0' : '#808000', 16.66666667);
        // yield 0;

        // flip the display
        if (get('queue flip') != lastQueueFlip) {
            lastQueueFlip = get('queue flip');

            // get('foo');

            release(`frameBuffer${displayBuffer}`);
            displayBuffer = (displayBuffer + 1) % 3;
            set('display', displayBuffer);
            acquire(`frameBuffer${displayBuffer}`);

            // signal that the flip has occured
            signal('flip', N);
        }
    }
}

interface DrawList {
    name: string;
    color: string;
    cpuMs: number;
    gpuMs: number;
};

const POWERPOINT_PALETTE = ['#4472c4', '#000000', '#ed7d31', '#a5a5a5', '#ffc000', '#70ad47'];

let palette = POWERPOINT_PALETTE;

// the scene is divided into a bunch of arbitrary work units called draw lists, mostly to
// demonstrate multithreading later. this isn't part of the overall framework, just something
// local to this demo.
let drawLists: DrawList[] = [
    { name: 'Shadows', color: palette[0], cpuMs: 1.0, gpuMs: 1.0 },
    { name: 'Prepass', color: palette[1], cpuMs: 1.0, gpuMs: 2.0 },
    { name: 'Opaque', color: palette[2], cpuMs: 2.0, gpuMs: 1.0 },
    { name: 'Translucents', color: palette[3], cpuMs: 1.0, gpuMs: 1.0 },
    { name: 'PostFX', color: palette[4], cpuMs: 0.25, gpuMs: 1.0 },
    { name: 'UI', color: palette[5], cpuMs: 1.0, gpuMs: 1.0 },
];

function* gpu() {
    set('queue flip', -1);
    let displayBuffer = 1;
    for (let N = 0; ; N++) {
        for (let list of drawLists) {
            // wait for CPU to finish submitting draw list
            yield wait(`CPU ${list.name}`, N);
            // ui waits for display to be ready
            if (list.name == 'Shadows') {
                yield wait(function displayXXX() { return get('display') == displayBuffer });
                acquire(`frameBuffer${displayBuffer}`);
            }
            // do drawing
            yield work(`GPU ${list.name}`, list.name, list.color, list.gpuMs, N);
            if (list.name == 'UI') {
                release(`frameBuffer${displayBuffer}`);
                displayBuffer = (displayBuffer + 1) % 3;
            }
        }
        // all drawing done, queue the page flip
        signal('queue flip', N);
    }
}

function* cpu() {
    let maxFps = 60;
    let lastFrame = -Infinity;
    for (let N = 0; ; N++) {
        // limit framerate
        // yield wait(function throttleFPS() { return t - lastFrame < 1000 / maxFps });
        lastFrame = t;
        // TODO: controller throttle goes here
        for (let list of drawLists) {
            if (N > 0) {
                // wait for gpu to finish using buffers from the previous frame
                yield wait(`GPU ${list.name}`, N - 1);
            }
            // fill buffers and submit draw commands
            yield work(`CPU ${list.name}`, list.name, list.color, list.cpuMs, N);
        }
    }
}

(async function run() {
    timeline({
        canvas: <HTMLCanvasElement>document.getElementById("myCanvas"),
        controls: document.getElementById("myControls"),
        threads: [
            { name: 'Display', fn: display },
            { name: 'GPU', fn: gpu },
            { name: 'CPU', fn: cpu }
        ],
        buffers: [
            { name: 'frameBuffer0', x: 0, y: 0, width: 100, height: 56 },
            { name: 'frameBuffer1', x: 110, y: 0, width: 100, height: 56 },
            { name: 'frameBuffer2', x: 220, y: 0, width: 100, height: 56 }
        ]
    })
}());
