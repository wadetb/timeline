import { get, set, signal, wait, work, t, timeline, acquire, release, clear, drawRect, drawFrom, runFor, run, scrollTo, setMsPerSec, setMsView } from './timeline';

// maybe should be called display, this thread controls flipping the display from
// one display buffer to the other.
function* display() {
    let lastQueueFlip = -1;
    let displayBuffer = 0;

    set('display', displayBuffer);
    acquire(`what your eyes see!`);
    acquire(`frameBuffer${displayBuffer}`);

    for (let N = 0; ; N++) {
        yield work('scanout', 'Scan out', '#6060a0', function* () {
            for (let H = 0; H < 168; H++) {
                drawFrom("what your eyes see!", 0, H, `frameBuffer${displayBuffer}`, 0, H, 300, 1);
                drawRect("what your eyes see!", 0, H, 3, 1, "#ffffff");
                yield 16.66666667 * 1.0 / (168 + 22);
            }
        });

        yield work('vblank', 'Vertical retrace', '#a06060', function* () {
            for (let H = 0; H < 22; H++) {
                drawRect("what your eyes see!", 0, 168 - H * 168 / 22, 3, 168, "#ff0000");
                yield 16.66666667 * 1.0 / (168 + 22);

                // allow flipping the display during the retrace
                if (get('queue flip') != lastQueueFlip) {
                    lastQueueFlip = get('queue flip');

                    release(`frameBuffer${displayBuffer}`);
                    displayBuffer = (displayBuffer + 1) % 2;
                    set('display', displayBuffer);
                    acquire(`frameBuffer${displayBuffer}`);

                    // signal that the flip has occured
                    signal('flip', N);
                }
            }
        });
    }
}

function* computer() {
    set('queue flip', -1);
    let displayBuffer = 1;
    for (let N = 0; ; N++) {
        // wait for display buffer
        yield wait(function* display() { while (get('display') == displayBuffer) { yield 0; } });

        // render the frame
        acquire(`frameBuffer${displayBuffer}`);
        clear(`frameBuffer${displayBuffer}`, '#000000');
        drawRect(`frameBuffer${displayBuffer}`, (N % 20) * 5, 20, 10, 10, '#ffffff');
        yield work("Render", "Render", "#808080", 25.0);
        release(`frameBuffer${displayBuffer}`);
        displayBuffer = (displayBuffer + 1) % 2;

        // all drawing done, queue the page flip
        signal('queue flip', N);
    }
}

function* director() {
    scrollTo(-15);
    setMsPerSec(30);
    setMsView(100);
    for(let N = 0; N < 5; N++) {
        runFor(16.6667);
        yield;
    }
    run();
}

const t1Y = 450;
const t2Y = 680;

export async function build() {
    timeline({
        canvas: <HTMLCanvasElement>document.getElementById("myCanvas"),
        controls: document.getElementById("myControls"),
        threads: [
            { name: 'Display', fn: display, y: t1Y },
            { name: 'Computer', fn: computer, y: t2Y },
        ],
        buffers: [
            { name: 'frameBuffer0', x: 10, y: (t1Y + t2Y) / 2, width: 300, height: 168, scale: 0.35 },
            { name: 'frameBuffer1', x: 120, y: (t1Y + t2Y) / 2, width: 300, height: 168, scale: 0.35 },
            { name: 'what your eyes see!', x: -360, y: 100, width: 300, height: 168 }
        ],
        director: director()
    })
}
