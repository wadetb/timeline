export let t = 0;

var threads: Thread[] = [];
var canvas: HTMLCanvasElement;
var controls: HTMLElement;

interface Value {
    thread: Thread;
    timestamp: number;
    value: number;
}
let values: { [key: string]: Value } = {};

interface SignalEvent {
    name: string;
    thread: Thread;
    timestamp: number;
}
let signalEvents: SignalEvent[] = [];

interface WaitEvent {
    name: string;
    thread: Thread;
    timestamp: number;
    startTimestamp: number;
    waitThread: Thread;
    waitTimestamp: number;
}
let waitEvents: WaitEvent[] = [];

interface WorkEvent {
    name: string;
    thread: Thread;
    timestamp: number;
    color: string;
    duration: number;
}
let workEvents: WorkEvent[] = [];

export let inspect = {};

let runningThread = null;
let activeEvent = null;

export function signal(key: string, value?: number) {
    if (runningThread.name in inspect) {
        console.log(`${runningThread.name}: signal ${key} => ${value}`);
    }
    signalEvents.push({
        name: key,
        thread: runningThread,
        timestamp: t
    });
    values[key] = { thread: runningThread, timestamp: t, value: value };
}

export function set(key: string, value: number) {
    if (runningThread.name in inspect) {
        console.log(`${runningThread.name}: set ${key} => ${value}`);
    }
    values[key] = { thread: runningThread, timestamp: t, value: value };
}

export function* wait(keyOrMsOrFn: string | number | Function, value?: number | string) {
    if (runningThread.name in inspect) {
        console.log(`${runningThread.name}: wait ${keyOrMsOrFn} => ${value}`);
    }
    if (typeof keyOrMsOrFn === 'string') {

        let start = t;

        if (value !== undefined) {
            if (typeof value === 'number') {
                while (!(keyOrMsOrFn in values) ||
                    values[keyOrMsOrFn].value != value) {
                    yield 0;
                }
            } else if (value == 'changed') {
                if (keyOrMsOrFn in values) {
                    let t = values[keyOrMsOrFn].timestamp;
                    while (values[keyOrMsOrFn].timestamp == t) {
                        yield 0;
                    }
                } else {
                    while (!(keyOrMsOrFn in values)) {
                        yield 0;
                    }
                }
            } else {
                throw new Error("Expected number or 'changed' for value.");
            }
        } else {
            while (!(keyOrMsOrFn in values)) {
                yield 0;
            }
        }

        let v = values[keyOrMsOrFn];
        if (v.timestamp > start) {
            waitEvents.push({
                name: keyOrMsOrFn,
                thread: runningThread,
                timestamp: t,
                startTimestamp: start,
                waitThread: v.thread,
                waitTimestamp: v.timestamp
            });
        }

    } else if (typeof keyOrMsOrFn === 'number') {
        yield keyOrMsOrFn;
    } else if (typeof keyOrMsOrFn === 'function') {
        while (keyOrMsOrFn()) {
            yield 0;
        }
    } else {
        throw new Error("Invalid input.");
    }
}

export function* work(name: string, color: string, ms: number, value?: number) {
    if (runningThread.name in inspect) {
        console.log(`${runningThread.name}: work ${name} ${ms}ms => ${value}`);
    }
    let e = {
        name: name,
        color: color,
        thread: runningThread,
        timestamp: t,
        value: value,
        duration: undefined
    }
    workEvents.push(e);
    yield ms;
    e.duration = ms;
    values[name] = { thread: runningThread, timestamp: t, value: value };
}

export interface ThreadParams {
    name: string;
    fn: any;
}

export class Thread {
    readonly name: string;
    readonly fn: any;
    constructor(params: ThreadParams) {
        this.name = params.name;
        this.fn = params.fn;
        this.stack = [this.fn()];
    }
    y = 0;
    stack: any[];
    waitTime = 0;
}

let tickRate = 30;

let paused = false;
let pxPerMs = 10;
let msPerTick = 0.25;
let msView = 10;

function tick() {
    let msLeft = paused
        ? 0
        : msPerTick;

    while (msLeft > 0) {

        for (let t of threads) {
            if (t.waitTime == 0) {
                runningThread = t;
                for (; ;) {
                    let v = t.stack[t.stack.length - 1].next();
                    if (v.done) {
                        t.stack.pop();
                    } else if (typeof v.value.next === 'function') {
                        t.stack.push(v.value);
                    } else if (typeof v.value === 'number') {
                        t.waitTime = v.value;
                        break;
                    } else {
                        throw new Error("Generators are expected to return a number or another generator.")
                    }
                }
            }
        }

        let shortest = Number.POSITIVE_INFINITY;
        for (let t of threads) {
            if (t.waitTime > 0 && t.waitTime < shortest) {
                shortest = t.waitTime;
            }
        }
        if (shortest == Number.POSITIVE_INFINITY) {
            throw new Error("No thread made progress.");
        }

        shortest = Math.min(shortest, msLeft);

        for (let t of threads) {
            if (t.waitTime > 0) {
                t.waitTime -= shortest;
            }
        }

        msLeft -= shortest;
        t += shortest;
    }
}

function waitTimePath(ctx: CanvasRenderingContext2D, e: WaitEvent) {
    let x1 = e.timestamp * pxPerMs;
    let x2 = e.startTimestamp * pxPerMs;
    let x3 = e.waitTimestamp * pxPerMs;
    let y1 = e.thread.y;
    let y3 = e.waitThread.y;
    ctx.beginPath();
    ctx.moveTo(x1, y3 + 5);
    ctx.bezierCurveTo(
        x1, (y1 * 0.9 + y3 * 0.1) + 5,
        x2, (y1 * 0.5 + y3 * 0.5) + 5,
        x2, y1 + 5);
    ctx.lineTo(x3, y1 + 5);
    ctx.closePath();
}

function waitHandlePath(ctx: CanvasRenderingContext2D, e: WaitEvent) {
    let x = e.timestamp * pxPerMs;
    let y = e.thread.y;
    ctx.beginPath();
    ctx.arc(x, y + 5, 5, 0, 2 * Math.PI);
}

function workPath(ctx: CanvasRenderingContext2D, e: WorkEvent) {
    let x = e.timestamp * pxPerMs;
    let w = (e.duration || t - e.timestamp) * pxPerMs;
    let y = e.thread.y;
    ctx.beginPath();
    ctx.rect(x, y - 5, w, 20);
}

function signalPath(ctx: CanvasRenderingContext2D, e: SignalEvent) {
    let x = e.timestamp * pxPerMs;
    let y = e.thread.y;
    ctx.beginPath();
    ctx.moveTo(x, y + 5);
    ctx.lineTo(x - 8, y - 8);
    ctx.lineTo(x + 8, y - 8);
    ctx.closePath();
}

function draw() {
    pxPerMs = canvas.width / msView;
     
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    let y = 30;
    for (let t of threads) {
        t.y = y;
        ctx.beginPath();
        ctx.moveTo(0, t.y + 5);
        ctx.lineTo(canvas.width, t.y + 5);
        ctx.stroke();
        y += 50;
    }

    ctx.scale(1, 1);
    ctx.translate(Math.min(0, -t * pxPerMs + canvas.width - 20), 0);

    ctx.fillStyle = "#808080";
    ctx.fillRect(t * pxPerMs, 0, 1, canvas.height);

    for (let e of waitEvents) {
        waitTimePath(ctx, e);
        if (e === activeEvent) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 4;
        } else {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
        }
        ctx.fillStyle = "#d0d0d0";
        ctx.fill();
        ctx.stroke();
    }

    for (let e of workEvents) {
        workPath(ctx, e);
        if (e === activeEvent) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 4;
        } else {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
        }
        ctx.fillStyle = e.color || "#780000";
        ctx.fill();
        ctx.stroke();
    }

    for (let e of signalEvents) {
        signalPath(ctx, e);
        if (e === activeEvent) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 4;
        } else {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
        }
        ctx.fillStyle = "#780000";
        ctx.fill();
        ctx.stroke();
    }

    for (let e of waitEvents) {
        waitHandlePath(ctx, e);
        if (e === activeEvent) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 4;
        } else {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
        }
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.stroke();
    }

    ctx.restore();

    for (let t of threads) {
        ctx.font = "12px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(t.name, 2, t.y - 10);
    }
}

function mouseMove(this: HTMLCanvasElement, ev: MouseEvent) {
    let ctx = canvas.getContext("2d");

    ctx.save();

    let rect = canvas.getBoundingClientRect();
    let canvasX = ev.clientX - rect.left;
    let canvasY = ev.clientY - rect.top;

    let x = canvasX - Math.min(0, -t * pxPerMs + canvas.width - 20);
    let y = canvasY;

    activeEvent = null;
    for (let e of waitEvents) {
        waitTimePath(ctx, e);
        if (ctx.isPointInPath(x, y)) {
            activeEvent = e;
        }
    }
    for (let e of workEvents) {
        workPath(ctx, e);
        if (ctx.isPointInPath(x, y)) {
            activeEvent = e;
        }
    }
    for (let e of signalEvents) {
        signalPath(ctx, e);
        if (ctx.isPointInPath(x, y)) {
            activeEvent = e;
        }
    }
    for (let e of waitEvents) {
        waitHandlePath(ctx, e);
        if (ctx.isPointInPath(x, y)) {
            activeEvent = e;
        }
    }

    ctx.restore();
}

interface TimelineOptions {
    canvas: HTMLCanvasElement;
    controls: HTMLElement;
    threads: ThreadParams[];
}

export function timeline(options: TimelineOptions) {
    canvas = options.canvas;
    controls = options.controls;

    for (let t of options.threads) {
        threads.push(new Thread(t));
    }

    controls.querySelector("#pause")
        .addEventListener("click", function (this, ev) {
            paused = !paused;
            if (paused) {
                this.classList.add('active');
            } else {
                this.classList.remove('active');
            }
        });

    controls.querySelector("#rate")
        .addEventListener("input", function (this, ev) {
            msPerTick = Number((<HTMLInputElement>this).value) / tickRate;
        });

    controls.querySelector("#view")
        .addEventListener("input", function (this, ev) {
            msView = Number((<HTMLInputElement>this).value);
        });

    canvas.addEventListener('mousemove', mouseMove);

    setInterval(() => {
        tick();
        draw();
    }, tickRate);
}
