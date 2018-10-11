export let t = 0;

let startT = -2;
let frame = 0;

let paused = false;
let msPerSec = 1;
let msView = 20;

let tickRate = 30;
let pxPerMs = 10;

let dragging = false;
let dragStartT = 0;
let dragStartX = 0;

var threads: Thread[] = [];
var buffers: Buffer[] = [];

var canvas: HTMLCanvasElement;
var controls: HTMLElement;

var ctx: CanvasRenderingContext2D;

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
    waitThread: Thread;
    waitTimestamp: number;
}
let waitEvents: WaitEvent[] = [];

interface WorkEvent {
    name: string;
    title: string;
    thread: Thread;
    timestamp: number;
    color: string;
    duration: number;
}
let workEvents: WorkEvent[] = [];

export let inspect = {};

let runningThread = null;
let activeEvent = null;
let errorMessage = null;

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

export function get(key: string): number {
    if (!(key in values)) {
        throw new Error(`Cannot get nonexistent value: ${key}`);
    }
    const value = values[key].value;
    if (runningThread.name in inspect) {
        console.log(`${runningThread.name}: get ${key} => ${value}`);
    }
    return value;
}

export function* wait(keyOrMsOrFn: string | number | Function, value?: number | string) {
    if (runningThread.name in inspect) {
        console.log(`${runningThread.name}: wait ${keyOrMsOrFn} => ${value}`);
    }
    if (typeof keyOrMsOrFn === 'string') {

        let w = {
            name: keyOrMsOrFn,
            thread: runningThread,
            timestamp: t,
            waitThread: null,
            waitTimestamp: null
        };
        waitEvents.push(w);

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
                throw new Error(`Expected number or 'changed' for value of ${keyOrMsOrFn}, got: ${value}`);
            }
        } else {
            while (!(keyOrMsOrFn in values)) {
                yield 0;
            }
        }

        let v = values[keyOrMsOrFn];
        w.waitThread = v.thread;
        w.waitTimestamp = v.timestamp;

    } else if (typeof keyOrMsOrFn === 'number') {

        let w = {
            name: '' + keyOrMsOrFn,
            thread: runningThread,
            timestamp: t,
            waitThread: null,
            waitTimestamp: null
        };
        waitEvents.push(w);

        yield keyOrMsOrFn;

        w.waitThread = runningThread;
        w.waitTimestamp = t;

    } else if (typeof keyOrMsOrFn === 'function') {

        let w = {
            name: keyOrMsOrFn.name,
            thread: runningThread,
            timestamp: t,
            waitThread: null,
            waitTimestamp: null
        };
        waitEvents.push(w);

        while (keyOrMsOrFn()) {
            yield 0;
        }

        w.waitThread = runningThread;
        w.waitTimestamp = t;

    } else {
        throw new Error(`Invalid wait input: ${keyOrMsOrFn}`);
    }
}

export function* work(name: string, title: string, color: string, ms: number, value?: number) {
    if (runningThread.name in inspect) {
        console.log(`${runningThread.name}: work ${name} ${ms}ms => ${value}`);
    }
    let e = {
        name: name,
        title: title,
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

export interface BufferParams {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Buffer {
    readonly name: string;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    constructor(params: BufferParams) {
        this.name = params.name;
        this.x = params.x;
        this.y = params.y;
        this.width = params.width;
        this.height = params.height;
        this.image = ctx.createImageData(this.width, this.height);
    }
    image = null;
    thread = null;
    currentY = 0;
    transitionY = 0;
    transitionFrame = 0;
}

export function acquire(name: string) {
    if (runningThread.name in inspect) {
        console.log(`${runningThread.name}: acquire ${name}`);
    }
    for (let b of buffers) {
        if (b.name == name) {
            if (b.thread != null) {
                throw new Error(`Tried to aquire ${name}, but it is owned by ${b.thread.name}.`);
            }
            b.transitionFrame = frame;
            b.transitionY = b.currentY;
            b.thread = runningThread;
            return;
        }
    }
    throw new Error(`Cannot acquire nonexistent buffer: ${name}`);
}

export function release(name: string) {
    if (runningThread.name in inspect) {
        console.log(`${runningThread.name}: release ${name}`);
    }
    for (let b of buffers) {
        if (b.name == name) {
            if (b.thread == null) {
                throw new Error(`Tried to release ${name}, but it is not owned.`);
            }
            if (b.thread != runningThread) {
                throw new Error(`Tried to release ${name}, but it is owned by ${b.thread.name}.`);
            }
            b.transitionFrame = frame;
            b.transitionY = b.currentY;
            b.thread = null;
            return;
        }
    }
    throw new Error(`Cannot release nonexistent buffer: ${name}`);
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

function tick() {
    let msLeft = paused || dragging
        ? 0
        : msPerSec / tickRate;

    if (errorMessage != null) {
        return;
    }

    if (!dragging && (t - startT) * pxPerMs > canvas.width - 400) {
        startT += msLeft;
    }

    runningThread = null;
    errorMessage = null;

    try {

        // if (t > 5) {
        //     throw new Error("YO YO YO");
        // }

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
                            throw new Error("Generators are expected to return 0, a time in milliseconds, or another generator.")
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

    } catch (err) {
        errorMessage = err.message;
        console.log((runningThread ? `In thread ${runningThread.name}: ` : '') + err.message);
        console.log(err.stack);
    }
}

function waitTimePath(e: WaitEvent) {
    let x1 = e.timestamp * pxPerMs;
    let y1 = e.thread.y;
    let x2 = (e.waitTimestamp ? e.waitTimestamp : t) * pxPerMs;
    ctx.beginPath();
    ctx.rect(x1, y1 + 30, x2 - x1, 20);
}

function waitHandlePath(e: WaitEvent) {
    let x = e.waitTimestamp * pxPerMs;
    let y = e.waitThread.y;
    ctx.beginPath();
    ctx.arc(x, y + 10, 5, 0, 2 * Math.PI);
}

function workPath(e: WorkEvent) {
    let x = e.timestamp * pxPerMs;
    let w = (e.duration || t - e.timestamp) * pxPerMs;
    let y = e.thread.y;
    ctx.beginPath();
    ctx.rect(x, y + 2, w, 80);
}

function signalPath(e: SignalEvent) {
    let x = e.timestamp * pxPerMs;
    let y = e.thread.y;
    ctx.beginPath();
    ctx.moveTo(x, y + 5);
    ctx.lineTo(x - 8, y - 8);
    ctx.lineTo(x + 8, y - 8);
    ctx.closePath();
}

function parseColor(color: string): number[] {
    color = color[0] == '#' ? color.slice(1) : color;
    const r = parseInt(color.slice(0, 2)) / 255.0,
        g = parseInt(color.slice(2, 4)) / 255.0,
        b = parseInt(color.slice(4, 6)) / 255.0;
    return [r, g, b];
}

function formatColor(rgb: number[]) {
    const [r, g, b] = rgb;
    return 'rgb(' +
        Math.round(r * 255) + ',' +
        Math.round(r * 255) + ',' +
        Math.round(b * 255) + ')'
}

function rgbToHSL(rgb: number[]): number[] {
    const [r, g, b] = rgb;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

function hslToRGB(hsl: number[]) {
    const [h, s, l] = hsl;
    var r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hueToRGB = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hueToRGB(p, q, h + 1 / 3);
        g = hueToRGB(p, q, h);
        b = hueToRGB(p, q, h - 1 / 3);
    }
    return [r, g, b];
}

function lightenColor(color: string, amount: number) {
    let [h, s, l] = rgbToHSL(parseColor(color));
    l = l * amount;
    return formatColor(hslToRGB([h, s, l]));
}

function lerp(a: number, b: number, t: number) {
    return b*t + a*(1-t);
}

function smoothstep(e0: number, e1: number, a: number) {
    const b = Math.min(1.0, Math.max(0.0, (a - e0) / (e1 - e0)));
    return b * b * (3 - 2 * b);
}

function draw() {
    pxPerMs = canvas.width / msView;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    let y = 160;
    for (let t of threads) {
        t.y = y;
        ctx.strokeStyle = "#c0c0c0";
        ctx.beginPath();
        ctx.moveTo(0, t.y + 1);
        ctx.lineTo(canvas.width, t.y + 1);
        ctx.stroke();
        y += 220;
    }

    ctx.scale(1, 1);
    ctx.translate(-startT * pxPerMs, 0);

    ctx.save();
    ctx.fillStyle = "#808080";
    ctx.fillRect(t * pxPerMs, 0, 1, canvas.height);
    ctx.font = "italic 44px Calibri";
    ctx.textAlign = 'left'
    ctx.fillStyle = "#808080";
    ctx.fillText("t", t * pxPerMs + 5, 45);
    ctx.restore();

    for (let e of waitEvents) {
        if (e.waitTimestamp == null || e.waitTimestamp > e.timestamp) {
            ctx.save()
            waitTimePath(e);
            if (e === activeEvent) {
                ctx.strokeStyle = "yellow";
                ctx.lineWidth = 4;
            } else {
                ctx.strokeStyle = "#808080";
                ctx.lineWidth = 1;
            }
            ctx.fillStyle = "#f8f8f8";
            ctx.fill();
            ctx.stroke();
            ctx.clip();
            ctx.font = "12px Calibri";
            ctx.fillStyle = "#808080";
            ctx.fillText("wait " + e.name, e.timestamp * pxPerMs + 10, e.thread.y + 45);
            ctx.restore()
        }
    }

    for (let e of workEvents) {
        ctx.save()
        workPath(e);
        if (e === activeEvent) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
        } else {
            ctx.strokeStyle = e.color; //lightenColor(e.color, 0.9);
            ctx.lineWidth = 2;
        }
        ctx.fillStyle = e.color || "#780000";
        ctx.fill();
        ctx.stroke();
        ctx.clip();
        ctx.font = "18px Calibri";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(e.title || e.name, e.timestamp * pxPerMs + 10, e.thread.y + 45);
        ctx.restore()
    }

    for (let e of signalEvents) {
        ctx.save();
        signalPath(e);
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
        ctx.font = "12px Calibri";
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.textAlign = 'center'
        ctx.fillText(e.name, e.timestamp * pxPerMs, e.thread.y - 15);
        ctx.restore();
    }

    for (let e of waitEvents) {
        if (e.waitTimestamp != null && e.waitTimestamp > e.timestamp) {
            ctx.save();
            if (e === activeEvent) {
                ctx.strokeStyle = "yellow";
                ctx.lineWidth = 4;
            } else {
                ctx.strokeStyle = "#404040";
                ctx.lineWidth = 1;
            }
            ctx.fillStyle = "#f0f0f0";
            waitHandlePath(e);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }

    for (let b of buffers) {
        const x = t * pxPerMs + 40;
        const targetY = b.thread != null ? b.thread.y + 25 : 160 + 110;
        const l = smoothstep(b.transitionFrame, b.transitionFrame + 5, frame);
        const y = lerp(b.transitionY, targetY, l);
        b.currentY = y;
        ctx.save();
        ctx.strokeStyle = "#404040";
        ctx.lineWidth = 1;
        ctx.fillStyle = "#f0f0f0";
        ctx.beginPath();
        ctx.rect(x + b.x, y + b.y, b.width, b.height);
        ctx.fill();
        ctx.stroke();
        ctx.font = "12px Consolas";
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.textAlign = 'center'
        ctx.fillText(b.name, x + b.x + b.width / 2, y);
        ctx.restore();
    }

    if (errorMessage != null) {
        let y = runningThread != null ? runningThread.y - 15 : 45;
        ctx.font = runningThread != null ? "bold 22px Consolas" : "40px Consolas";
        ctx.fillStyle = "#ff0000";
        ctx.textAlign = 'right'
        let text = runningThread != null
            ? `THREAD ERROR: ${errorMessage} - see JavaScript console for callstack`
            : 'ERROR: ' + errorMessage;
        ctx.fillText(text, t * pxPerMs - 10, y);
    }

    ctx.restore();

    for (let t of threads) {
        ctx.font = "56px Calibri";
        ctx.fillStyle = "#000000";
        ctx.textAlign = 'left'
        ctx.fillText(t.name, 2, t.y - 10);
    }

    frame++;
}

function mouseMove(this: HTMLCanvasElement, ev: MouseEvent) {
    let rect = canvas.getBoundingClientRect();
    let canvasX = ev.clientX - rect.left;
    let canvasY = ev.clientY - rect.top;

    if (dragging) {
        startT = dragStartT - (canvasX - dragStartX) / pxPerMs;
        return;
    }

    let x = canvasX + startT * pxPerMs;
    let y = canvasY;

    ctx.save();

    activeEvent = null;
    for (let e of waitEvents) {
        if (e.waitTimestamp == null || e.waitTimestamp > e.timestamp) {
            waitTimePath(e);
            if (ctx.isPointInPath(x, y)) {
                activeEvent = e;
            }
        }
    }
    for (let e of workEvents) {
        workPath(e);
        if (ctx.isPointInPath(x, y)) {
            activeEvent = e;
        }
    }
    for (let e of signalEvents) {
        signalPath(e);
        if (ctx.isPointInPath(x, y)) {
            activeEvent = e;
        }
    }
    for (let e of waitEvents) {
        if (e.waitTimestamp != null && e.waitTimestamp > e.timestamp) {
            if (e.waitTimestamp) {
                waitHandlePath(e);
                if (ctx.isPointInPath(x, y)) {
                    activeEvent = e;
                }
            }
        }
    }

    ctx.restore();
}

function mouseDown(this: HTMLCanvasElement, ev: MouseEvent) {
    let rect = canvas.getBoundingClientRect();
    let canvasX = ev.clientX - rect.left;

    dragging = true;
    dragStartT = startT;
    dragStartX = canvasX;
}

function mouseUp(this: HTMLCanvasElement, ev: MouseEvent) {
    if (!dragging) {
        return;
    }

    dragging = false;

    let rect = canvas.getBoundingClientRect();
    let canvasX = ev.clientX - rect.left;

    if (Math.abs(canvasX - dragStartX) < 5) {
        setPaused(!paused);
    }
}

function mouseWheel(this: HTMLCanvasElement, ev: WheelEvent) {
    let rect = canvas.getBoundingClientRect();
    let canvasX = ev.clientX - rect.left;

    setMsView(msView * (ev.deltaY > 0 ? 1.2 : 0.8));

    let cursorT = startT + canvasX / pxPerMs;
    pxPerMs = canvas.width / msView;
    startT = cursorT - canvasX / pxPerMs;

    ev.preventDefault();
}

function setMsView(value: number) {
    msView = value;
    controls.querySelector("#view")
        .setAttribute('value', String(Math.round(msView * 10) / 10));
}

function setPaused(newPaused: boolean) {
    paused = newPaused;

    controls.querySelectorAll("#pause > i").forEach((item) => {
        if (paused) {
            item.classList.remove('pause');
            item.classList.add('play');
        } else {
            item.classList.remove('play');
            item.classList.add('pause');
        }
    });
}

function setMsPerSec(newMsPerSec: number) {
    msPerSec = newMsPerSec;

    controls.querySelectorAll("#rate").forEach((button) => {
        if (button.textContent == String(msPerSec)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function keyPress(this: HTMLCanvasElement, ev: KeyboardEvent) {
    if (ev.keyCode == 32) {
        setPaused(!paused);
    }
}

function bind() {
    controls.querySelector("#pause")
        .addEventListener("click", function (this, ev) {
            setPaused(!paused);
        });
    setPaused(paused);

    controls.querySelectorAll("#rate").forEach((item) =>
        item.addEventListener("click", function (this, ev) {
            const button = (<HTMLButtonElement>this);
            setMsPerSec(Number(button.textContent));
        }));
    setMsPerSec(msPerSec);

    controls.querySelector("#view")
        .setAttribute('value', String(msView));
    controls.querySelector("#view")
        .addEventListener("input", function (this, ev) {
            msView = Number((<HTMLInputElement>this).value);
        });

    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    canvas.addEventListener('wheel', mouseWheel);
    canvas.addEventListener('keydown', keyPress);
}

interface TimelineOptions {
    canvas: HTMLCanvasElement;
    controls: HTMLElement;
    threads: ThreadParams[];
    buffers?: BufferParams[];
}

export function timeline(options: TimelineOptions) {
    canvas = options.canvas;
    controls = options.controls;

    ctx = canvas.getContext("2d");

    for (let t of options.threads) {
        threads.push(new Thread(t));
    }

    if (options.buffers) {
        for (let b of options.buffers) {
            buffers.push(new Buffer(b));
        }
    }

    bind();

    setInterval(() => {
        tick();
        draw();
    }, tickRate);
}
