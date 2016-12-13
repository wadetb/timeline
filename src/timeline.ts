export let t = 0;

var threads: Thread[] = [];
var canvas: HTMLCanvasElement;

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

export let pxPerMs = 10;
export let msPerTick = 0.25;

export function tick() {
    let msLeft = msPerTick;
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
        ctx.strokeStyle = "#000000";
        let y = e.thread.y;
        ctx.beginPath();
        ctx.moveTo(e.timestamp * pxPerMs, e.waitThread.y + 5);
        ctx.bezierCurveTo(
            e.timestamp * pxPerMs, (e.thread.y * 0.9 + e.waitThread.y * 0.1) + 5,
            e.startTimestamp * pxPerMs, (e.thread.y * 0.5 + e.waitThread.y * 0.5) + 5,
            e.startTimestamp * pxPerMs, e.thread.y + 5);
        ctx.lineTo(e.waitTimestamp * pxPerMs, e.thread.y + 5);
        ctx.lineTo(e.timestamp * pxPerMs, e.waitThread.y + 5);
        ctx.stroke();
        ctx.fillStyle = "#d0d0d0";
        ctx.fill();
    }

    for (let e of workEvents) {
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = e.color || "#780000";
        let y = e.thread.y;
        ctx.beginPath();
        ctx.rect(e.timestamp * pxPerMs, y - 5, (e.duration || t - e.timestamp) * pxPerMs, 20);
        ctx.fill();
        ctx.stroke();
    }

    for (let e of signalEvents) {
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#780000";
        let y = e.thread.y;
        ctx.beginPath();
        ctx.moveTo(e.timestamp * pxPerMs, y + 5);
        ctx.lineTo(e.timestamp * pxPerMs - 8, y - 8);
        ctx.lineTo(e.timestamp * pxPerMs + 8, y - 8);
        ctx.lineTo(e.timestamp * pxPerMs, y + 5);
        ctx.fill();
    }

    for (let e of waitEvents) {
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#000000";
        let y = e.thread.y;
        ctx.beginPath();
        ctx.arc(e.timestamp * pxPerMs, y + 5, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    ctx.restore();

    for (let t of threads) {
        ctx.font = "12px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(t.name, 2, t.y - 10);
    }
}

interface TimelineOptions {
    canvas: HTMLCanvasElement;
    threads: ThreadParams[];
}

export function timeline(options: TimelineOptions) {
    canvas = options.canvas;

    for (let t of options.threads) {
        threads.push(new Thread(t));
    }

    setInterval(tick, 30);
}
