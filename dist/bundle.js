/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
// import { build as slideTestComplex } from './slide-test-complex';
var slide_intro_1 = __webpack_require__(/*! ./slide-intro */ "./slide-intro.ts");
slide_intro_1.build();


/***/ }),

/***/ "./slide-intro.ts":
/*!************************!*
  !*** ./slide-intro.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build = void 0;
var timeline_1 = __webpack_require__(/*! ./timeline */ "./timeline.ts");
// maybe should be called display, this thread controls flipping the display from
// one display buffer to the other.
function display() {
    var lastQueueFlip, displayBuffer, _loop_1, N;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lastQueueFlip = -1;
                displayBuffer = 0;
                timeline_1.set('display', displayBuffer);
                timeline_1.acquire("what your eyes see!");
                timeline_1.acquire("frameBuffer" + displayBuffer);
                _loop_1 = function (N) {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, timeline_1.work('scanout', 'Scan out', '#6060a0', function () {
                                    var H;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                H = 0;
                                                _a.label = 1;
                                            case 1:
                                                if (!(H < 168)) return [3 /*break*/, 4];
                                                timeline_1.drawFrom("what your eyes see!", 0, H, "frameBuffer" + displayBuffer, 0, H, 300, 1);
                                                timeline_1.drawRect("what your eyes see!", 0, H, 3, 1, "#ffffff");
                                                return [4 /*yield*/, 16.66666667 * 1.0 / (168 + 22)];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3:
                                                H++;
                                                return [3 /*break*/, 1];
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, timeline_1.work('vblank', 'Vertical retrace', '#a06060', function () {
                                        var H;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    H = 0;
                                                    _a.label = 1;
                                                case 1:
                                                    if (!(H < 22)) return [3 /*break*/, 4];
                                                    timeline_1.drawRect("what your eyes see!", 0, 168 - H * 168 / 22, 3, 168, "#ff0000");
                                                    return [4 /*yield*/, 16.66666667 * 1.0 / (168 + 22)];
                                                case 2:
                                                    _a.sent();
                                                    // allow flipping the display during the retrace
                                                    if (timeline_1.get('queue flip') != lastQueueFlip) {
                                                        lastQueueFlip = timeline_1.get('queue flip');
                                                        timeline_1.release("frameBuffer" + displayBuffer);
                                                        displayBuffer = (displayBuffer + 1) % 2;
                                                        timeline_1.set('display', displayBuffer);
                                                        timeline_1.acquire("frameBuffer" + displayBuffer);
                                                        // signal that the flip has occured
                                                        timeline_1.signal('flip', N);
                                                    }
                                                    _a.label = 3;
                                                case 3:
                                                    H++;
                                                    return [3 /*break*/, 1];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    })];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                N = 0;
                _a.label = 1;
            case 1: return [5 /*yield**/, _loop_1(N)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                N++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
function computer() {
    var displayBuffer, startX, N, flapFrames;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                timeline_1.set('queue flip', -1);
                displayBuffer = 1;
                startX = 0;
                N = 0;
                _a.label = 1;
            case 1: 
            // wait for display buffer
            return [4 /*yield*/, timeline_1.wait(function display() { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(timeline_1.get('display') == displayBuffer)) return [3 /*break*/, 2];
                            return [4 /*yield*/, 0];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                }); })];
            case 2:
                // wait for display buffer
                _a.sent();
                // render the frame
                timeline_1.acquire("frameBuffer" + displayBuffer);
                timeline_1.clear("frameBuffer" + displayBuffer, '#ffffff');
                timeline_1.drawSprite("frameBuffer" + displayBuffer, 2, startX + 300, 168 - 48);
                timeline_1.drawSprite("frameBuffer" + displayBuffer, 0, startX + 300, 168 - 32);
                timeline_1.drawSprite("frameBuffer" + displayBuffer, 1, startX + 300, 168 - 16);
                flapFrames = [5, 6, 7, 6];
                timeline_1.drawSprite("frameBuffer" + displayBuffer, flapFrames[N % flapFrames.length], 80, 80);
                return [4 /*yield*/, timeline_1.work("Render", "Render", "#808080", 15.0)];
            case 3:
                _a.sent();
                timeline_1.release("frameBuffer" + displayBuffer);
                displayBuffer = (displayBuffer + 1) % 2;
                startX -= 10;
                if (startX < -320) {
                    startX = 0;
                }
                // all drawing done, queue the page flip
                timeline_1.signal('queue flip', N);
                _a.label = 4;
            case 4:
                N++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}
function director() {
    var N;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                timeline_1.scrollTo(-15);
                timeline_1.setMsPerSec(30);
                timeline_1.setMsView(100);
                N = 0;
                _a.label = 1;
            case 1:
                if (!(N < 1)) return [3 /*break*/, 4];
                timeline_1.runFor(16.6667);
                return [4 /*yield*/];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                N++;
                return [3 /*break*/, 1];
            case 4:
                timeline_1.run();
                return [2 /*return*/];
        }
    });
}
var t1Y = 450;
var t2Y = 680;
function build() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            timeline_1.timeline({
                canvas: document.getElementById("myCanvas"),
                controls: document.getElementById("myControls"),
                sprites: document.getElementById("mySprites"),
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
            });
            return [2 /*return*/];
        });
    });
}
exports.build = build;


/***/ }),

/***/ "./timeline.ts":
/*!*********************!*
  !*** ./timeline.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports) {


var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.timeline = exports.run = exports.runFor = exports.scrollTo = exports.setMsPerSec = exports.setPaused = exports.setMsView = exports.Thread = exports.release = exports.acquire = exports.drawSprite = exports.drawFrom = exports.drawRect = exports.clear = exports.drawOn = exports.getBuffer = exports.Buffer = exports.BufferParams = exports.work = exports.wait = exports.get = exports.set = exports.signal = exports.inspect = exports.t = void 0;
exports.t = 0;
var startT = -2;
var stopT = null;
var reapT = 300;
var frame = 0;
var paused = false;
var msPerSec = 1;
var msView = 20;
var pxPerMs = 10;
var dragging = false;
var dragStartT = 0;
var dragStartX = 0;
var threads = [];
var buffers = [];
var canvas;
var controls;
var sprites;
var director = null;
var ctx;
var values = {};
var signalEvents = [];
var waitEvents = [];
var workEvents = [];
exports.inspect = {};
var runningThread = null;
var activeEvent = null;
var errorMessage = null;
function signal(key, value) {
    if (runningThread.name in exports.inspect) {
        console.log(runningThread.name + ": signal " + key + " => " + value);
    }
    signalEvents.push({
        name: key,
        thread: runningThread,
        timestamp: exports.t
    });
    values[key] = { thread: runningThread, timestamp: exports.t, value: value };
}
exports.signal = signal;
function set(key, value) {
    if (runningThread.name in exports.inspect) {
        console.log(runningThread.name + ": set " + key + " => " + value);
    }
    values[key] = { thread: runningThread, timestamp: exports.t, value: value };
}
exports.set = set;
function get(key) {
    if (!(key in values)) {
        throw new Error("Cannot get nonexistent value: " + key);
    }
    var value = values[key].value;
    if (runningThread.name in exports.inspect) {
        console.log(runningThread.name + ": get " + key + " => " + value);
    }
    return value;
}
exports.get = get;
function wait(keyOrMsOrFn, value) {
    var w, t_1, v, w, w;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (runningThread.name in exports.inspect) {
                    console.log(runningThread.name + ": wait " + keyOrMsOrFn + " => " + value);
                }
                if (!(typeof keyOrMsOrFn === 'string')) return [3 /*break*/, 16];
                w = {
                    name: keyOrMsOrFn,
                    thread: runningThread,
                    timestamp: exports.t,
                    waitThread: null,
                    waitTimestamp: null
                };
                waitEvents.push(w);
                if (!(value !== undefined)) return [3 /*break*/, 13];
                if (!(typeof value === 'number')) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                if (!(!(keyOrMsOrFn in values) ||
                    values[keyOrMsOrFn].value != value)) return [3 /*break*/, 3];
                return [4 /*yield*/, 0];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [3 /*break*/, 12];
            case 4:
                if (!(value == 'changed')) return [3 /*break*/, 11];
                if (!(keyOrMsOrFn in values)) return [3 /*break*/, 8];
                t_1 = values[keyOrMsOrFn].timestamp;
                _a.label = 5;
            case 5:
                if (!(values[keyOrMsOrFn].timestamp == t_1)) return [3 /*break*/, 7];
                return [4 /*yield*/, 0];
            case 6:
                _a.sent();
                return [3 /*break*/, 5];
            case 7: return [3 /*break*/, 10];
            case 8:
                if (!!(keyOrMsOrFn in values)) return [3 /*break*/, 10];
                return [4 /*yield*/, 0];
            case 9:
                _a.sent();
                return [3 /*break*/, 8];
            case 10: return [3 /*break*/, 12];
            case 11: throw new Error("Expected number or 'changed' for value of " + keyOrMsOrFn + ", got: " + value);
            case 12: return [3 /*break*/, 15];
            case 13:
                if (!!(keyOrMsOrFn in values)) return [3 /*break*/, 15];
                return [4 /*yield*/, 0];
            case 14:
                _a.sent();
                return [3 /*break*/, 13];
            case 15:
                v = values[keyOrMsOrFn];
                w.waitThread = v.thread;
                w.waitTimestamp = v.timestamp;
                return [3 /*break*/, 21];
            case 16:
                if (!(typeof keyOrMsOrFn === 'number')) return [3 /*break*/, 18];
                w = {
                    name: '' + keyOrMsOrFn,
                    thread: runningThread,
                    timestamp: exports.t,
                    waitThread: null,
                    waitTimestamp: null
                };
                waitEvents.push(w);
                return [4 /*yield*/, keyOrMsOrFn];
            case 17:
                _a.sent();
                w.waitThread = runningThread;
                w.waitTimestamp = exports.t;
                return [3 /*break*/, 21];
            case 18:
                if (!(typeof keyOrMsOrFn === 'function')) return [3 /*break*/, 20];
                w = {
                    name: keyOrMsOrFn.name,
                    thread: runningThread,
                    timestamp: exports.t,
                    waitThread: null,
                    waitTimestamp: null
                };
                waitEvents.push(w);
                return [4 /*yield*/, keyOrMsOrFn()];
            case 19:
                _a.sent();
                w.waitThread = runningThread;
                w.waitTimestamp = exports.t;
                return [3 /*break*/, 21];
            case 20: throw new Error("Invalid wait input: " + keyOrMsOrFn);
            case 21: return [2 /*return*/];
        }
    });
}
exports.wait = wait;
function work(name, title, color, msOrFn, value) {
    var e, startT;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (runningThread.name in exports.inspect) {
                    console.log(runningThread.name + ": work " + name + " " + msOrFn + " => " + value);
                }
                e = {
                    name: name,
                    title: title,
                    color: color,
                    thread: runningThread,
                    timestamp: exports.t,
                    value: value,
                    duration: null
                };
                workEvents.push(e);
                startT = exports.t;
                if (!(typeof msOrFn === 'function')) return [3 /*break*/, 2];
                return [4 /*yield*/, msOrFn()];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, msOrFn];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                e.duration = exports.t - startT;
                values[name] = { thread: runningThread, timestamp: exports.t, value: value };
                return [2 /*return*/];
        }
    });
}
exports.work = work;
var BufferParams = /** @class */ (function () {
    function BufferParams() {
    }
    return BufferParams;
}());
exports.BufferParams = BufferParams;
var Buffer = /** @class */ (function () {
    function Buffer(params) {
        this.canvas = null;
        this.ctx = null;
        this.thread = null;
        this.currentY = 0;
        this.currentAlpha = 0;
        this.transitionY = 0;
        this.transitionAlpha = 0;
        this.transitionFrame = 0;
        this.name = params.name;
        this.x = params.x;
        this.y = params.y;
        this.width = params.width;
        this.height = params.height;
        this.scale = params.scale;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
    }
    return Buffer;
}());
exports.Buffer = Buffer;
function getBuffer(name) {
    for (var _i = 0, buffers_1 = buffers; _i < buffers_1.length; _i++) {
        var b = buffers_1[_i];
        if (b.name == name) {
            return b;
        }
    }
    throw new Error("Cannot use nonexistent buffer: " + name);
}
exports.getBuffer = getBuffer;
function drawOn(name) {
    var b = getBuffer(name);
    if (b.thread == null) {
        throw new Error("Tried to draw on buffer " + name + ", but it is not owned.");
    }
    if (b.thread != runningThread) {
        throw new Error("Tried to draw on buffer " + name + ", but it is owned by " + b.thread.name + ".");
    }
    return b.ctx;
}
exports.drawOn = drawOn;
function clear(name, color) {
    var ctx = drawOn(name);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1000, 1000);
}
exports.clear = clear;
function drawRect(name, x, y, w, h, color) {
    var ctx = drawOn(name);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}
exports.drawRect = drawRect;
function drawFrom(name, x, y, sourceName, sx, sy, sw, sh) {
    var ctx = drawOn(name);
    var srcB = getBuffer(sourceName);
    if (srcB.thread == null) {
        throw new Error("Tried to draw from buffer " + sourceName + ", but it is not owned.");
    }
    if (srcB.thread != runningThread) {
        throw new Error("Tried to draw from buffer " + sourceName + ", but it is owned by " + srcB.thread.name + ".");
    }
    ctx.drawImage(srcB.canvas, sx, sy, sw, sh, x, y, sw, sh);
}
exports.drawFrom = drawFrom;
function drawSprite(name, index, x, y) {
    var ctx = drawOn(name);
    ctx.drawImage(sprites, index * 16, 0, 16, 16, x, y, 16, 16);
}
exports.drawSprite = drawSprite;
function acquire(name) {
    if (runningThread.name in exports.inspect) {
        console.log(runningThread.name + ": acquire " + name);
    }
    for (var _i = 0, buffers_2 = buffers; _i < buffers_2.length; _i++) {
        var b = buffers_2[_i];
        if (b.name == name) {
            if (b.thread != null) {
                throw new Error("Tried to aquire " + name + ", but it is owned by " + b.thread.name + ".");
            }
            b.transitionFrame = frame;
            b.transitionY = b.currentY;
            b.transitionAlpha = b.currentAlpha;
            b.thread = runningThread;
            return;
        }
    }
    throw new Error("Cannot acquire nonexistent buffer: " + name);
}
exports.acquire = acquire;
function release(name) {
    if (runningThread.name in exports.inspect) {
        console.log(runningThread.name + ": release " + name);
    }
    for (var _i = 0, buffers_3 = buffers; _i < buffers_3.length; _i++) {
        var b = buffers_3[_i];
        if (b.name == name) {
            if (b.thread == null) {
                throw new Error("Tried to release " + name + ", but it is not owned.");
            }
            if (b.thread != runningThread) {
                throw new Error("Tried to release " + name + ", but it is owned by " + b.thread.name + ".");
            }
            b.transitionFrame = frame;
            b.transitionY = b.currentY;
            b.thread = null;
            return;
        }
    }
    throw new Error("Cannot release nonexistent buffer: " + name);
}
exports.release = release;
var Thread = /** @class */ (function () {
    function Thread(params) {
        this.waitTime = 0;
        this.name = params.name;
        this.fn = params.fn;
        this.y = params.y;
        this.stack = [this.fn()];
    }
    return Thread;
}());
exports.Thread = Thread;
function reap() {
    var firstSignal = 0;
    for (; firstSignal < signalEvents.length; firstSignal++) {
        var e = signalEvents[firstSignal];
        if (exports.t - e.timestamp < reapT) {
            break;
        }
    }
    signalEvents = signalEvents.slice(firstSignal);
    var firstWait = 0;
    for (; firstWait < waitEvents.length; firstWait++) {
        var e = waitEvents[firstWait];
        if (e.waitTimestamp == null) {
            break;
        }
        if (exports.t - e.waitTimestamp < reapT) {
            break;
        }
    }
    waitEvents = waitEvents.slice(firstWait);
    var firstWork = 0;
    for (; firstWork < workEvents.length; firstWork++) {
        var e = workEvents[firstWork];
        if (e.duration == null) {
            break;
        }
        if (exports.t - (e.timestamp + e.duration) < reapT) {
            break;
        }
    }
    workEvents = workEvents.slice(firstWork);
}
function tick(ms) {
    var msLeft = paused || dragging
        ? 0
        : msPerSec * ms / 1000;
    if (errorMessage != null) {
        return;
    }
    if (stopT != null && exports.t + msLeft > stopT) {
        msLeft = stopT - exports.t;
    }
    if (!dragging && (exports.t - startT) * pxPerMs > canvas.width - 400) {
        startT += msLeft;
    }
    if (startT < exports.t - reapT) {
        startT = exports.t - reapT;
    }
    reap();
    runningThread = null;
    errorMessage = null;
    try {
        while (msLeft > 0) {
            for (var _i = 0, threads_1 = threads; _i < threads_1.length; _i++) {
                var t_2 = threads_1[_i];
                if (t_2.waitTime == 0) {
                    runningThread = t_2;
                    for (;;) {
                        var v = t_2.stack[t_2.stack.length - 1].next();
                        if (v.done) {
                            t_2.stack.pop();
                        }
                        else if (typeof v.value.next === 'function') {
                            t_2.stack.push(v.value);
                        }
                        else if (typeof v.value === 'number') {
                            t_2.waitTime = v.value;
                            break;
                        }
                        else {
                            throw new Error("Generators are expected to return 0, a time in milliseconds, or another generator.");
                        }
                    }
                }
            }
            var shortest = Number.POSITIVE_INFINITY;
            for (var _a = 0, threads_2 = threads; _a < threads_2.length; _a++) {
                var t_3 = threads_2[_a];
                if (t_3.waitTime > 0 && t_3.waitTime < shortest) {
                    shortest = t_3.waitTime;
                }
            }
            if (shortest == Number.POSITIVE_INFINITY) {
                throw new Error("No thread made progress.");
            }
            shortest = Math.min(shortest, msLeft);
            for (var _b = 0, threads_3 = threads; _b < threads_3.length; _b++) {
                var t_4 = threads_3[_b];
                if (t_4.waitTime > 0) {
                    t_4.waitTime -= shortest;
                }
            }
            msLeft -= shortest;
            exports.t += shortest;
        }
    }
    catch (err) {
        errorMessage = err.message;
        console.log((runningThread ? "In thread " + runningThread.name + ": " : '') + err.message);
        console.log(err.stack);
    }
}
function waitTimePath(e) {
    var x1 = e.timestamp * pxPerMs;
    var y1 = e.thread.y;
    var x2 = (e.waitTimestamp ? e.waitTimestamp : exports.t) * pxPerMs;
    ctx.beginPath();
    ctx.rect(x1, y1 + 30, x2 - x1, 20);
}
function waitHandlePath(e) {
    var x = e.waitTimestamp * pxPerMs;
    var y = e.waitThread.y;
    ctx.beginPath();
    ctx.arc(x, y + 10, 5, 0, 2 * Math.PI);
}
function workPath(e) {
    var x = e.timestamp * pxPerMs;
    var w = (e.duration || exports.t - e.timestamp) * pxPerMs;
    var y = e.thread.y;
    ctx.beginPath();
    ctx.rect(x, y + 2, w, 80);
}
function signalPath(e) {
    var x = e.timestamp * pxPerMs;
    var y = e.thread.y;
    ctx.beginPath();
    ctx.moveTo(x, y + 5);
    ctx.lineTo(x - 8, y - 8);
    ctx.lineTo(x + 8, y - 8);
    ctx.closePath();
}
function parseColor(color) {
    color = color[0] == '#' ? color.slice(1) : color;
    var r = parseInt(color.slice(0, 2)) / 255.0, g = parseInt(color.slice(2, 4)) / 255.0, b = parseInt(color.slice(4, 6)) / 255.0;
    return [r, g, b];
}
function formatColor(rgb) {
    var r = rgb[0], g = rgb[1], b = rgb[2];
    return 'rgb(' +
        Math.round(r * 255) + ',' +
        Math.round(r * 255) + ',' +
        Math.round(b * 255) + ')';
}
function rgbToHSL(rgb) {
    var r = rgb[0], g = rgb[1], b = rgb[2];
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
}
function hslToRGB(hsl) {
    var h = hsl[0], s = hsl[1], l = hsl[2];
    var r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    }
    else {
        var hueToRGB = function hue2rgb(p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hueToRGB(p, q, h + 1 / 3);
        g = hueToRGB(p, q, h);
        b = hueToRGB(p, q, h - 1 / 3);
    }
    return [r, g, b];
}
function lightenColor(color, amount) {
    var _a = rgbToHSL(parseColor(color)), h = _a[0], s = _a[1], l = _a[2];
    l = l * amount;
    return formatColor(hslToRGB([h, s, l]));
}
function lerp(a, b, t) {
    return b * t + a * (1 - t);
}
function smoothstep(e0, e1, a) {
    var b = Math.min(1.0, Math.max(0.0, (a - e0) / (e1 - e0)));
    return b * b * (3 - 2 * b);
}
function draw() {
    pxPerMs = canvas.width / msView;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    for (var _i = 0, threads_4 = threads; _i < threads_4.length; _i++) {
        var t_5 = threads_4[_i];
        ctx.strokeStyle = "#c0c0c0";
        ctx.beginPath();
        ctx.moveTo(0, t_5.y + 1);
        ctx.lineTo(canvas.width, t_5.y + 1);
        ctx.stroke();
    }
    ctx.scale(1, 1);
    ctx.translate(-startT * pxPerMs, 0);
    ctx.save();
    ctx.fillStyle = "#808080";
    ctx.fillRect(exports.t * pxPerMs, 0, 1, canvas.height);
    ctx.font = "italic 44px Calibri";
    ctx.textAlign = 'left';
    ctx.fillStyle = "#808080";
    ctx.fillText("t=" + (Math.round(exports.t * 1000) / 1000).toFixed(3) + "ms", exports.t * pxPerMs + 5, 45);
    ctx.restore();
    for (var _a = 0, waitEvents_1 = waitEvents; _a < waitEvents_1.length; _a++) {
        var e = waitEvents_1[_a];
        if (e.waitTimestamp == null || e.waitTimestamp > e.timestamp) {
            ctx.save();
            waitTimePath(e);
            if (e === activeEvent) {
                ctx.strokeStyle = "yellow";
                ctx.lineWidth = 4;
            }
            else {
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
            ctx.restore();
        }
    }
    for (var _b = 0, workEvents_1 = workEvents; _b < workEvents_1.length; _b++) {
        var e = workEvents_1[_b];
        ctx.save();
        workPath(e);
        if (e === activeEvent) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
        }
        else {
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
        ctx.restore();
    }
    for (var _c = 0, signalEvents_1 = signalEvents; _c < signalEvents_1.length; _c++) {
        var e = signalEvents_1[_c];
        ctx.save();
        signalPath(e);
        if (e === activeEvent) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 4;
        }
        else {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
        }
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.stroke();
        ctx.font = "12px Calibri";
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.textAlign = 'center';
        ctx.fillText(e.name, e.timestamp * pxPerMs, e.thread.y - 15);
        ctx.restore();
    }
    for (var _d = 0, waitEvents_2 = waitEvents; _d < waitEvents_2.length; _d++) {
        var e = waitEvents_2[_d];
        if (e.waitTimestamp != null && e.waitTimestamp > e.timestamp) {
            ctx.save();
            if (e === activeEvent) {
                ctx.strokeStyle = "yellow";
                ctx.lineWidth = 4;
            }
            else {
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
    for (var _e = 0, buffers_4 = buffers; _e < buffers_4.length; _e++) {
        var b = buffers_4[_e];
        var scale = b.scale ? b.scale : 1.0;
        var x = exports.t * pxPerMs;
        var targetY = b.thread != null && b.x > 0 ? b.thread.y + (45 - b.height * scale / 2) : b.y;
        var targetAlpha = b.thread != null || b.x < 0 ? 1.0 : 0.25;
        var l = smoothstep(b.transitionFrame, b.transitionFrame + 7, frame);
        var y = lerp(b.transitionY, targetY, l);
        var alpha = lerp(b.transitionAlpha, targetAlpha, l);
        b.currentY = y;
        b.currentAlpha = alpha;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.font = "12px Consolas";
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.textAlign = 'center';
        ctx.fillText(b.name, x + b.x + b.width * scale / 2, y - 2);
        ctx.strokeStyle = "#404040";
        ctx.lineWidth = 1;
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(x + b.x, y, b.width * scale + 2, b.height * scale + 2);
        ctx.drawImage(b.canvas, x + b.x + 1, y + 1, b.width * scale, b.height * scale);
        ctx.restore();
    }
    if (errorMessage != null) {
        var y = runningThread != null ? runningThread.y - 15 : 45;
        ctx.font = runningThread != null ? "bold 22px Consolas" : "40px Consolas";
        ctx.fillStyle = "#ff0000";
        ctx.textAlign = 'right';
        var text = runningThread != null
            ? "THREAD ERROR: " + errorMessage + " - see JavaScript console for callstack"
            : 'ERROR: ' + errorMessage;
        ctx.fillText(text, exports.t * pxPerMs - 10, y);
    }
    ctx.restore();
    for (var _f = 0, threads_5 = threads; _f < threads_5.length; _f++) {
        var t_6 = threads_5[_f];
        ctx.font = "56px Calibri";
        ctx.fillStyle = "#000000";
        ctx.textAlign = 'left';
        ctx.fillText(t_6.name, 2, t_6.y - 40);
    }
    frame++;
}
function mouseMove(ev) {
    var rect = canvas.getBoundingClientRect();
    var canvasX = ev.clientX - rect.left;
    var canvasY = ev.clientY - rect.top;
    if (dragging) {
        startT = dragStartT - (canvasX - dragStartX) / pxPerMs;
        return;
    }
    var x = canvasX + startT * pxPerMs;
    var y = canvasY;
    ctx.save();
    activeEvent = null;
    for (var _i = 0, waitEvents_3 = waitEvents; _i < waitEvents_3.length; _i++) {
        var e = waitEvents_3[_i];
        if (e.waitTimestamp == null || e.waitTimestamp > e.timestamp) {
            waitTimePath(e);
            if (ctx.isPointInPath(x, y)) {
                activeEvent = e;
            }
        }
    }
    for (var _a = 0, workEvents_2 = workEvents; _a < workEvents_2.length; _a++) {
        var e = workEvents_2[_a];
        workPath(e);
        if (ctx.isPointInPath(x, y)) {
            activeEvent = e;
        }
    }
    for (var _b = 0, signalEvents_2 = signalEvents; _b < signalEvents_2.length; _b++) {
        var e = signalEvents_2[_b];
        signalPath(e);
        if (ctx.isPointInPath(x, y)) {
            activeEvent = e;
        }
    }
    for (var _c = 0, waitEvents_4 = waitEvents; _c < waitEvents_4.length; _c++) {
        var e = waitEvents_4[_c];
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
function mouseDown(ev) {
    var rect = canvas.getBoundingClientRect();
    var canvasX = ev.clientX - rect.left;
    dragging = true;
    dragStartT = startT;
    dragStartX = canvasX;
}
function mouseUp(ev) {
    if (!dragging) {
        return;
    }
    dragging = false;
    var rect = canvas.getBoundingClientRect();
    var canvasX = ev.clientX - rect.left;
    if (Math.abs(canvasX - dragStartX) < 5) {
        advanceDirector();
    }
}
function mouseWheel(ev) {
    var rect = canvas.getBoundingClientRect();
    var canvasX = ev.clientX - rect.left;
    setMsView(msView * (ev.deltaY > 0 ? 1.2 : 0.8));
    var cursorT = startT + canvasX / pxPerMs;
    pxPerMs = canvas.width / msView;
    startT = cursorT - canvasX / pxPerMs;
    ev.preventDefault();
}
function setMsView(value) {
    msView = value;
    controls.querySelector("#view")
        .setAttribute('value', String(Math.round(msView * 10) / 10));
}
exports.setMsView = setMsView;
function setPaused(newPaused) {
    paused = newPaused;
    controls.querySelectorAll("#pause > i").forEach(function (item) {
        if (paused) {
            item.classList.remove('pause');
            item.classList.add('play');
        }
        else {
            item.classList.remove('play');
            item.classList.add('pause');
        }
    });
}
exports.setPaused = setPaused;
function setMsPerSec(newMsPerSec) {
    msPerSec = newMsPerSec;
    controls.querySelectorAll("#rate").forEach(function (button) {
        if (button.textContent == String(msPerSec)) {
            button.classList.add('active');
        }
        else {
            button.classList.remove('active');
        }
    });
}
exports.setMsPerSec = setMsPerSec;
function scrollTo(ms) {
    startT = ms;
}
exports.scrollTo = scrollTo;
function runFor(ms) {
    stopT = exports.t + ms;
}
exports.runFor = runFor;
function run() {
    stopT = null;
}
exports.run = run;
function advanceDirector() {
    if (director != null) {
        try {
            director.next();
        }
        catch (err) {
            errorMessage = err.message;
            console.log("In director: " + err.message);
            console.log(err.stack);
        }
    }
}
function keyPress(ev) {
    if (ev.keyCode == 32) {
        setPaused(!paused);
    }
}
function bind() {
    controls.querySelector("#next")
        .addEventListener("click", function (ev) {
        advanceDirector();
    });
    controls.querySelector("#pause")
        .addEventListener("click", function (ev) {
        setPaused(!paused);
    });
    setPaused(paused);
    controls.querySelectorAll("#rate").forEach(function (item) {
        return item.addEventListener("click", function (ev) {
            var button = this;
            setMsPerSec(Number(button.textContent));
        });
    });
    setMsPerSec(msPerSec);
    controls.querySelector("#view")
        .setAttribute('value', String(msView));
    controls.querySelector("#view")
        .addEventListener("input", function (ev) {
        msView = Number(this.value);
    });
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    canvas.addEventListener('wheel', mouseWheel);
    canvas.addEventListener('keydown', keyPress);
}
function timeline(options) {
    canvas = options.canvas;
    controls = options.controls;
    sprites = options.sprites;
    director = options.director;
    ctx = canvas.getContext("2d");
    for (var _i = 0, _a = options.threads; _i < _a.length; _i++) {
        var t_7 = _a[_i];
        threads.push(new Thread(t_7));
    }
    if (options.buffers) {
        for (var _b = 0, _c = options.buffers; _b < _c.length; _b++) {
            var b = _c[_b];
            buffers.push(new Buffer(b));
        }
    }
    bind();
    advanceDirector();
    var prevTimestamp = 0;
    function step(timestamp) {
        tick(timestamp - prevTimestamp);
        prevTimestamp = timestamp;
        draw();
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
exports.timeline = timeline;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW1lbGluZS8uL2luZGV4LnRzIiwid2VicGFjazovL3RpbWVsaW5lLy4vc2xpZGUtaW50cm8udHMiLCJ3ZWJwYWNrOi8vdGltZWxpbmUvLi90aW1lbGluZS50cyIsIndlYnBhY2s6Ly90aW1lbGluZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aW1lbGluZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQW9FO0FBQ3BFLGlGQUFvRDtBQUVwRCxtQkFBVSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSGIsd0VBQStLO0FBRS9LLGlGQUFpRjtBQUNqRixtQ0FBbUM7QUFDbkMsU0FBVSxPQUFPOzs7OztnQkFDVCxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLGFBQWEsR0FBRyxDQUFDLENBQUM7Z0JBRXRCLGNBQUcsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQzlCLGtCQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDL0Isa0JBQU8sQ0FBQyxnQkFBYyxhQUFlLENBQUMsQ0FBQztvQ0FFOUIsQ0FBQzs7O29DQUNOLHFCQUFNLGVBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRTs7Ozs7Z0RBQ2hDLENBQUMsR0FBRyxDQUFDOzs7cURBQUUsRUFBQyxHQUFHLEdBQUc7Z0RBQ25CLG1CQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxnQkFBYyxhQUFlLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0RBQ25GLG1CQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dEQUN2RCxxQkFBTSxXQUFXLEdB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QTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBidWlsZCBhcyBzbGlkZVRlc3RDb21wbGV4IH0gZnJvbSAnLi9zbGlkZS10ZXN0LWNvbXBsZXgnO1xuaW1wb3J0IHsgYnVpbGQgYXMgc2xpZGVJbnRybyB9IGZyb20gJy4vc2xpZGUtaW50cm8nO1xuXG5zbGlkZUludHJvKCk7XG4iLCJpbXBvcnQgeyBnZXQsIHNldCwgc2lnbmFsLCB3YWl0LCB3b3JrLCB0LCB0aW1lbGluZSwgYWNxdWlyZSwgcmVsZWFzZSwgY2xlYXIsIGRyYXdSZWN0LCBkcmF3RnJvbSwgcnVuRm9yLCBydW4sIHNjcm9sbFRvLCBzZXRNc1BlclNlYywgc2V0TXNWaWV3LCBkcmF3U3ByaXRlIH0gZnJvbSAnLi90aW1lbGluZSc7XG5cbi8vIG1heWJlIHNob3VsZCBiZSBjYWxsZWQgZGlzcGxheSwgdGhpcyB0aHJlYWQgY29udHJvbHMgZmxpcHBpbmcgdGhlIGRpc3BsYXkgZnJvbVxuLy8gb25lIGRpc3BsYXkgYnVmZmVyIHRvIHRoZSBvdGhlci5cbmZ1bmN0aW9uKiBkaXNwbGF5KCkge1xuICAgIGxldCBsYXN0UXVldWVGbGlwID0gLTE7XG4gICAgbGV0IGRpc3BsYXlCdWZmZXIgPSAwO1xuXG4gICAgc2V0KCdkaXNwbGF5JywgZGlzcGxheUJ1ZmZlcik7XG4gICAgYWNxdWlyZShgd2hhdCB5b3VyIGV5ZXMgc2VlIWApO1xuICAgIGFjcXVpcmUoYGZyYW1lQnVmZmVyJHtkaXNwbGF5QnVmZmVyfWApO1xuXG4gICAgZm9yIChsZXQgTiA9IDA7IDsgTisrKSB7XG4gICAgICAgIHlpZWxkIHdvcmsoJ3NjYW5vdXQnLCAnU2NhbiBvdXQnLCAnIzYwNjBhMCcsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBIID0gMDsgSCA8IDE2ODsgSCsrKSB7XG4gICAgICAgICAgICAgICAgZHJhd0Zyb20oXCJ3aGF0IHlvdXIgZXllcyBzZWUhXCIsIDAsIEgsIGBmcmFtZUJ1ZmZlciR7ZGlzcGxheUJ1ZmZlcn1gLCAwLCBILCAzMDAsIDEpO1xuICAgICAgICAgICAgICAgIGRyYXdSZWN0KFwid2hhdCB5b3VyIGV5ZXMgc2VlIVwiLCAwLCBILCAzLCAxLCBcIiNmZmZmZmZcIik7XG4gICAgICAgICAgICAgICAgeWllbGQgMTYuNjY2NjY2NjcgKiAxLjAgLyAoMTY4ICsgMjIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB5aWVsZCB3b3JrKCd2YmxhbmsnLCAnVmVydGljYWwgcmV0cmFjZScsICcjYTA2MDYwJywgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IEggPSAwOyBIIDwgMjI7IEgrKykge1xuICAgICAgICAgICAgICAgIGRyYXdSZWN0KFwid2hhdCB5b3VyIGV5ZXMgc2VlIVwiLCAwLCAxNjggLSBIICogMTY4IC8gMjIsIDMsIDE2OCwgXCIjZmYwMDAwXCIpO1xuICAgICAgICAgICAgICAgIHlpZWxkIDE2LjY2NjY2NjY3ICogMS4wIC8gKDE2OCArIDIyKTtcblxuICAgICAgICAgICAgICAgIC8vIGFsbG93IGZsaXBwaW5nIHRoZSBkaXNwbGF5IGR1cmluZyB0aGUgcmV0cmFjZVxuICAgICAgICAgICAgICAgIGlmIChnZXQoJ3F1ZXVlIGZsaXAnKSAhPSBsYXN0UXVldWVGbGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RRdWV1ZUZsaXAgPSBnZXQoJ3F1ZXVlIGZsaXAnKTtcblxuICAgICAgICAgICAgICAgICAgICByZWxlYXNlKGBmcmFtZUJ1ZmZlciR7ZGlzcGxheUJ1ZmZlcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheUJ1ZmZlciA9IChkaXNwbGF5QnVmZmVyICsgMSkgJSAyO1xuICAgICAgICAgICAgICAgICAgICBzZXQoJ2Rpc3BsYXknLCBkaXNwbGF5QnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgYWNxdWlyZShgZnJhbWVCdWZmZXIke2Rpc3BsYXlCdWZmZXJ9YCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2lnbmFsIHRoYXQgdGhlIGZsaXAgaGFzIG9jY3VyZWRcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsKCdmbGlwJywgTik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uKiBjb21wdXRlcigpIHtcbiAgICBzZXQoJ3F1ZXVlIGZsaXAnLCAtMSk7XG4gICAgbGV0IGRpc3BsYXlCdWZmZXIgPSAxO1xuICAgIGxldCBzdGFydFggPSAwO1xuICAgIGZvciAobGV0IE4gPSAwOyA7IE4rKykge1xuICAgICAgICAvLyB3YWl0IGZvciBkaXNwbGF5IGJ1ZmZlclxuICAgICAgICB5aWVsZCB3YWl0KGZ1bmN0aW9uKiBkaXNwbGF5KCkgeyB3aGlsZSAoZ2V0KCdkaXNwbGF5JykgPT0gZGlzcGxheUJ1ZmZlcikgeyB5aWVsZCAwOyB9IH0pO1xuXG4gICAgICAgIC8vIHJlbmRlciB0aGUgZnJhbWVcbiAgICAgICAgYWNxdWlyZShgZnJhbWVCdWZmZXIke2Rpc3BsYXlCdWZmZXJ9YCk7XG4gICAgICAgIGNsZWFyKGBmcmFtZUJ1ZmZlciR7ZGlzcGxheUJ1ZmZlcn1gLCAnI2ZmZmZmZicpO1xuICAgICAgICBkcmF3U3ByaXRlKGBmcmFtZUJ1ZmZlciR7ZGlzcGxheUJ1ZmZlcn1gLCAyLCBzdGFydFggKyAzMDAsIDE2OC00OCk7XG4gICAgICAgIGRyYXdTcHJpdGUoYGZyYW1lQnVmZmVyJHtkaXNwbGF5QnVmZmVyfWAsIDAsIHN0YXJ0WCArIDMwMCwgMTY4LTMyKTtcbiAgICAgICAgZHJhd1Nwcml0ZShgZnJhbWVCdWZmZXIke2Rpc3BsYXlCdWZmZXJ9YCwgMSwgc3RhcnRYICsgMzAwLCAxNjgtMTYpO1xuICAgICAgICBsZXQgZmxhcEZyYW1lcyA9IFs1LCA2LCA3LCA2XTtcbiAgICAgICAgZHJhd1Nwcml0ZShgZnJhbWVCdWZmZXIke2Rpc3BsYXlCdWZmZXJ9YCwgZmxhcEZyYW1lc1tOJWZsYXBGcmFtZXMubGVuZ3RoXSwgODAsIDgwKTtcbiAgICAgICAgeWllbGQgd29yayhcIlJlbmRlclwiLCBcIlJlbmRlclwiLCBcIiM4MDgwODBcIiwgMTUuMCk7XG4gICAgICAgIHJlbGVhc2UoYGZyYW1lQnVmZmVyJHtkaXNwbGF5QnVmZmVyfWApO1xuICAgICAgICBkaXNwbGF5QnVmZmVyID0gKGRpc3BsYXlCdWZmZXIgKyAxKSAlIDI7XG5cbiAgICAgICAgc3RhcnRYIC09IDEwO1xuICAgICAgICBpZiAoc3RhcnRYIDwgLTMyMCkge1xuICAgICAgICAgICAgc3RhcnRYID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFsbCBkcmF3aW5nIGRvbmUsIHF1ZXVlIHRoZSBwYWdlIGZsaXBcbiAgICAgICAgc2lnbmFsKCdxdWV1ZSBmbGlwJywgTik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiogZGlyZWN0b3IoKSB7XG4gICAgc2Nyb2xsVG8oLTE1KTtcbiAgICBzZXRNc1BlclNlYygzMCk7XG4gICAgc2V0TXNWaWV3KDEwMCk7XG4gICAgZm9yKGxldCBOID0gMDsgTiA8IDE7IE4rKykge1xuICAgICAgICBydW5Gb3IoMTYuNjY2Nyk7XG4gICAgICAgIHlpZWxkO1xuICAgIH1cbiAgICBydW4oKTtcbn1cblxuY29uc3QgdDFZID0gNDUwO1xuY29uc3QgdDJZID0gNjgwO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYnVpbGQoKSB7XG4gICAgdGltZWxpbmUoe1xuICAgICAgICBjYW52YXM6IDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Q2FudmFzXCIpLFxuICAgICAgICBjb250cm9sczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNvbnRyb2xzXCIpLFxuICAgICAgICBzcHJpdGVzOiA8SFRNTEltYWdlRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U3ByaXRlc1wiKSxcbiAgICAgICAgdGhyZWFkczogW1xuICAgICAgICAgICAgeyBuYW1lOiAnRGlzcGxheScsIGZuOiBkaXNwbGF5LCB5OiB0MVkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ0NvbXB1dGVyJywgZm46IGNvbXB1dGVyLCB5OiB0MlkgfSxcbiAgICAgICAgXSxcbiAgICAgICAgYnVmZmVyczogW1xuICAgICAgICAgICAgeyBuYW1lOiAnZnJhbWVCdWZmZXIwJywgeDogMTAsIHk6ICh0MVkgKyB0MlkpIC8gMiwgd2lkdGg6IDMwMCwgaGVpZ2h0OiAxNjgsIHNjYWxlOiAwLjM1IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdmcmFtZUJ1ZmZlcjEnLCB4OiAxMjAsIHk6ICh0MVkgKyB0MlkpIC8gMiwgd2lkdGg6IDMwMCwgaGVpZ2h0OiAxNjgsIHNjYWxlOiAwLjM1IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICd3aGF0IHlvdXIgZXllcyBzZWUhJywgeDogLTM2MCwgeTogMTAwLCB3aWR0aDogMzAwLCBoZWlnaHQ6IDE2OCB9XG4gICAgICAgIF0sXG4gICAgICAgIGRpcmVjdG9yOiBkaXJlY3RvcigpXG4gICAgfSlcbn1cbiIsImV4cG9ydCBsZXQgdCA9IDA7XG5cbmxldCBzdGFydFQgPSAtMjtcbmxldCBzdG9wVCA9IG51bGw7XG5jb25zdCByZWFwVCA9IDMwMDtcbmxldCBmcmFtZSA9IDA7XG5cbmxldCBwYXVzZWQgPSBmYWxzZTtcbmxldCBtc1BlclNlYyA9IDE7XG5sZXQgbXNWaWV3ID0gMjA7XG5sZXQgcHhQZXJNcyA9IDEwO1xuXG5sZXQgZHJhZ2dpbmcgPSBmYWxzZTtcbmxldCBkcmFnU3RhcnRUID0gMDtcbmxldCBkcmFnU3RhcnRYID0gMDtcblxudmFyIHRocmVhZHM6IFRocmVhZFtdID0gW107XG52YXIgYnVmZmVyczogQnVmZmVyW10gPSBbXTtcblxudmFyIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG52YXIgY29udHJvbHM6IEhUTUxFbGVtZW50O1xudmFyIHNwcml0ZXM6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cbmxldCBkaXJlY3RvcjogSXRlcmFibGVJdGVyYXRvcjxhbnk+ID0gbnVsbDtcblxudmFyIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG5pbnRlcmZhY2UgVmFsdWUge1xuICAgIHRocmVhZDogVGhyZWFkO1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgIHZhbHVlOiBudW1iZXI7XG59XG5sZXQgdmFsdWVzOiB7IFtrZXk6IHN0cmluZ106IFZhbHVlIH0gPSB7fTtcblxuaW50ZXJmYWNlIFNpZ25hbEV2ZW50IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdGhyZWFkOiBUaHJlYWQ7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG59XG5sZXQgc2lnbmFsRXZlbnRzOiBTaWduYWxFdmVudFtdID0gW107XG5cbmludGVyZmFjZSBXYWl0RXZlbnQge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0aHJlYWQ6IFRocmVhZDtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICB3YWl0VGhyZWFkOiBUaHJlYWQ7XG4gICAgd2FpdFRpbWVzdGFtcDogbnVtYmVyO1xufVxubGV0IHdhaXRFdmVudHM6IFdhaXRFdmVudFtdID0gW107XG5cbmludGVyZmFjZSBXb3JrRXZlbnQge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHRocmVhZDogVGhyZWFkO1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgZHVyYXRpb246IG51bWJlcjtcbn1cbmxldCB3b3JrRXZlbnRzOiBXb3JrRXZlbnRbXSA9IFtdO1xuXG5leHBvcnQgbGV0IGluc3BlY3QgPSB7fTtcblxubGV0IHJ1bm5pbmdUaHJlYWQgPSBudWxsO1xubGV0IGFjdGl2ZUV2ZW50ID0gbnVsbDtcbmxldCBlcnJvck1lc3NhZ2UgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gc2lnbmFsKGtleTogc3RyaW5nLCB2YWx1ZT86IG51bWJlcikge1xuICAgIGlmIChydW5uaW5nVGhyZWFkLm5hbWUgaW4gaW5zcGVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtydW5uaW5nVGhyZWFkLm5hbWV9OiBzaWduYWwgJHtrZXl9ID0+ICR7dmFsdWV9YCk7XG4gICAgfVxuICAgIHNpZ25hbEV2ZW50cy5wdXNoKHtcbiAgICAgICAgbmFtZToga2V5LFxuICAgICAgICB0aHJlYWQ6IHJ1bm5pbmdUaHJlYWQsXG4gICAgICAgIHRpbWVzdGFtcDogdFxuICAgIH0pO1xuICAgIHZhbHVlc1trZXldID0geyB0aHJlYWQ6IHJ1bm5pbmdUaHJlYWQsIHRpbWVzdGFtcDogdCwgdmFsdWU6IHZhbHVlIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAocnVubmluZ1RocmVhZC5uYW1lIGluIGluc3BlY3QpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7cnVubmluZ1RocmVhZC5uYW1lfTogc2V0ICR7a2V5fSA9PiAke3ZhbHVlfWApO1xuICAgIH1cbiAgICB2YWx1ZXNba2V5XSA9IHsgdGhyZWFkOiBydW5uaW5nVGhyZWFkLCB0aW1lc3RhbXA6IHQsIHZhbHVlOiB2YWx1ZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGtleTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBpZiAoIShrZXkgaW4gdmFsdWVzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBnZXQgbm9uZXhpc3RlbnQgdmFsdWU6ICR7a2V5fWApO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlc1trZXldLnZhbHVlO1xuICAgIGlmIChydW5uaW5nVGhyZWFkLm5hbWUgaW4gaW5zcGVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtydW5uaW5nVGhyZWFkLm5hbWV9OiBnZXQgJHtrZXl9ID0+ICR7dmFsdWV9YCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiB3YWl0KGtleU9yTXNPckZuOiBzdHJpbmcgfCBudW1iZXIgfCBGdW5jdGlvbiwgdmFsdWU/OiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICBpZiAocnVubmluZ1RocmVhZC5uYW1lIGluIGluc3BlY3QpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7cnVubmluZ1RocmVhZC5uYW1lfTogd2FpdCAke2tleU9yTXNPckZufSA9PiAke3ZhbHVlfWApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGtleU9yTXNPckZuID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgIGxldCB3ID0ge1xuICAgICAgICAgICAgbmFtZToga2V5T3JNc09yRm4sXG4gICAgICAgICAgICB0aHJlYWQ6IHJ1bm5pbmdUaHJlYWQsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHQsXG4gICAgICAgICAgICB3YWl0VGhyZWFkOiBudWxsLFxuICAgICAgICAgICAgd2FpdFRpbWVzdGFtcDogbnVsbFxuICAgICAgICB9O1xuICAgICAgICB3YWl0RXZlbnRzLnB1c2godyk7XG5cbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCEoa2V5T3JNc09yRm4gaW4gdmFsdWVzKSB8fFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNba2V5T3JNc09yRm5dLnZhbHVlICE9IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PSAnY2hhbmdlZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5T3JNc09yRm4gaW4gdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ID0gdmFsdWVzW2tleU9yTXNPckZuXS50aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh2YWx1ZXNba2V5T3JNc09yRm5dLnRpbWVzdGFtcCA9PSB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCEoa2V5T3JNc09yRm4gaW4gdmFsdWVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBudW1iZXIgb3IgJ2NoYW5nZWQnIGZvciB2YWx1ZSBvZiAke2tleU9yTXNPckZufSwgZ290OiAke3ZhbHVlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKCEoa2V5T3JNc09yRm4gaW4gdmFsdWVzKSkge1xuICAgICAgICAgICAgICAgIHlpZWxkIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdiA9IHZhbHVlc1trZXlPck1zT3JGbl07XG4gICAgICAgIHcud2FpdFRocmVhZCA9IHYudGhyZWFkO1xuICAgICAgICB3LndhaXRUaW1lc3RhbXAgPSB2LnRpbWVzdGFtcDtcblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGtleU9yTXNPckZuID09PSAnbnVtYmVyJykge1xuXG4gICAgICAgIGxldCB3ID0ge1xuICAgICAgICAgICAgbmFtZTogJycgKyBrZXlPck1zT3JGbixcbiAgICAgICAgICAgIHRocmVhZDogcnVubmluZ1RocmVhZCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogdCxcbiAgICAgICAgICAgIHdhaXRUaHJlYWQ6IG51bGwsXG4gICAgICAgICAgICB3YWl0VGltZXN0YW1wOiBudWxsXG4gICAgICAgIH07XG4gICAgICAgIHdhaXRFdmVudHMucHVzaCh3KTtcblxuICAgICAgICB5aWVsZCBrZXlPck1zT3JGbjtcblxuICAgICAgICB3LndhaXRUaHJlYWQgPSBydW5uaW5nVGhyZWFkO1xuICAgICAgICB3LndhaXRUaW1lc3RhbXAgPSB0O1xuXG4gICAgfSBlbHNlIGlmICh0eXBlb2Yga2V5T3JNc09yRm4gPT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgICBsZXQgdyA9IHtcbiAgICAgICAgICAgIG5hbWU6IGtleU9yTXNPckZuLm5hbWUsXG4gICAgICAgICAgICB0aHJlYWQ6IHJ1bm5pbmdUaHJlYWQsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHQsXG4gICAgICAgICAgICB3YWl0VGhyZWFkOiBudWxsLFxuICAgICAgICAgICAgd2FpdFRpbWVzdGFtcDogbnVsbFxuICAgICAgICB9O1xuICAgICAgICB3YWl0RXZlbnRzLnB1c2godyk7XG5cbiAgICAgICAgeWllbGQga2V5T3JNc09yRm4oKTtcblxuICAgICAgICB3LndhaXRUaHJlYWQgPSBydW5uaW5nVGhyZWFkO1xuICAgICAgICB3LndhaXRUaW1lc3RhbXAgPSB0O1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHdhaXQgaW5wdXQ6ICR7a2V5T3JNc09yRm59YCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24qIHdvcmsobmFtZTogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBtc09yRm46IG51bWJlciB8IEZ1bmN0aW9uLCB2YWx1ZT86IG51bWJlcikge1xuICAgIGlmIChydW5uaW5nVGhyZWFkLm5hbWUgaW4gaW5zcGVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtydW5uaW5nVGhyZWFkLm5hbWV9OiB3b3JrICR7bmFtZX0gJHttc09yRm59ID0+ICR7dmFsdWV9YCk7XG4gICAgfVxuICAgIGxldCBlID0ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgdGhyZWFkOiBydW5uaW5nVGhyZWFkLFxuICAgICAgICB0aW1lc3RhbXA6IHQsXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZHVyYXRpb246IG51bGxcbiAgICB9XG4gICAgd29ya0V2ZW50cy5wdXNoKGUpO1xuICAgIGxldCBzdGFydFQgPSB0O1xuICAgIGlmICh0eXBlb2YgbXNPckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHlpZWxkIG1zT3JGbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHlpZWxkIG1zT3JGbjtcbiAgICB9XG4gICAgZS5kdXJhdGlvbiA9IHQgLSBzdGFydFQ7XG4gICAgdmFsdWVzW25hbWVdID0geyB0aHJlYWQ6IHJ1bm5pbmdUaHJlYWQsIHRpbWVzdGFtcDogdCwgdmFsdWU6IHZhbHVlIH07XG59XG5cbmV4cG9ydCBjbGFzcyBCdWZmZXJQYXJhbXMge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgc2NhbGU/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBCdWZmZXIge1xuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgICByZWFkb25seSB4OiBudW1iZXI7XG4gICAgcmVhZG9ubHkgeTogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHdpZHRoOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgaGVpZ2h0OiBudW1iZXI7XG4gICAgcmVhZG9ubHkgc2NhbGU6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IEJ1ZmZlclBhcmFtcykge1xuICAgICAgICB0aGlzLm5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICAgICAgdGhpcy54ID0gcGFyYW1zLng7XG4gICAgICAgIHRoaXMueSA9IHBhcmFtcy55O1xuICAgICAgICB0aGlzLndpZHRoID0gcGFyYW1zLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHBhcmFtcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBwYXJhbXMuc2NhbGU7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB9XG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IG51bGw7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBudWxsO1xuICAgIHRocmVhZDogVGhyZWFkID0gbnVsbDtcbiAgICBjdXJyZW50WTogbnVtYmVyID0gMDtcbiAgICBjdXJyZW50QWxwaGE6IG51bWJlciA9IDA7XG4gICAgdHJhbnNpdGlvblk6IG51bWJlciA9IDA7XG4gICAgdHJhbnNpdGlvbkFscGhhOiBudW1iZXIgPSAwO1xuICAgIHRyYW5zaXRpb25GcmFtZTogbnVtYmVyID0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJ1ZmZlcihuYW1lOiBzdHJpbmcpOiBCdWZmZXIge1xuICAgIGZvciAobGV0IGIgb2YgYnVmZmVycykge1xuICAgICAgICBpZiAoYi5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgdXNlIG5vbmV4aXN0ZW50IGJ1ZmZlcjogJHtuYW1lfWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd09uKG5hbWU6IHN0cmluZyk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XG4gICAgY29uc3QgYiA9IGdldEJ1ZmZlcihuYW1lKTtcbiAgICBpZiAoYi50aHJlYWQgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRyaWVkIHRvIGRyYXcgb24gYnVmZmVyICR7bmFtZX0sIGJ1dCBpdCBpcyBub3Qgb3duZWQuYCk7XG4gICAgfVxuICAgIGlmIChiLnRocmVhZCAhPSBydW5uaW5nVGhyZWFkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVHJpZWQgdG8gZHJhdyBvbiBidWZmZXIgJHtuYW1lfSwgYnV0IGl0IGlzIG93bmVkIGJ5ICR7Yi50aHJlYWQubmFtZX0uYCk7XG4gICAgfVxuICAgIHJldHVybiBiLmN0eDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKG5hbWU6IHN0cmluZywgY29sb3I6IHN0cmluZykge1xuICAgIGNvbnN0IGN0eCA9IGRyYXdPbihuYW1lKTtcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIDEwMDAsIDEwMDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd1JlY3QobmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjdHggPSBkcmF3T24obmFtZSk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIGN0eC5maWxsUmVjdCh4LCB5LCB3LCBoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdGcm9tKG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHNvdXJjZU5hbWU6IHN0cmluZywgc3g6IG51bWJlciwgc3k6IG51bWJlciwgc3c6IG51bWJlciwgc2g6IG51bWJlcikge1xuICAgIGNvbnN0IGN0eCA9IGRyYXdPbihuYW1lKTtcbiAgICBjb25zdCBzcmNCID0gZ2V0QnVmZmVyKHNvdXJjZU5hbWUpO1xuICAgIGlmIChzcmNCLnRocmVhZCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVHJpZWQgdG8gZHJhdyBmcm9tIGJ1ZmZlciAke3NvdXJjZU5hbWV9LCBidXQgaXQgaXMgbm90IG93bmVkLmApO1xuICAgIH1cbiAgICBpZiAoc3JjQi50aHJlYWQgIT0gcnVubmluZ1RocmVhZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRyaWVkIHRvIGRyYXcgZnJvbSBidWZmZXIgJHtzb3VyY2VOYW1lfSwgYnV0IGl0IGlzIG93bmVkIGJ5ICR7c3JjQi50aHJlYWQubmFtZX0uYCk7XG4gICAgfVxuICAgIGN0eC5kcmF3SW1hZ2Uoc3JjQi5jYW52YXMsIHN4LCBzeSwgc3csIHNoLCB4LCB5LCBzdywgc2gpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3U3ByaXRlKG5hbWU6IHN0cmluZywgaW5kZXg6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICBjb25zdCBjdHggPSBkcmF3T24obmFtZSk7XG4gICAgY3R4LmRyYXdJbWFnZShzcHJpdGVzLCBpbmRleCoxNiwgMCwgMTYsIDE2LCB4LCB5LCAxNiwgMTYpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3F1aXJlKG5hbWU6IHN0cmluZykge1xuICAgIGlmIChydW5uaW5nVGhyZWFkLm5hbWUgaW4gaW5zcGVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtydW5uaW5nVGhyZWFkLm5hbWV9OiBhY3F1aXJlICR7bmFtZX1gKTtcbiAgICB9XG4gICAgZm9yIChsZXQgYiBvZiBidWZmZXJzKSB7XG4gICAgICAgIGlmIChiLm5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgICAgaWYgKGIudGhyZWFkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRyaWVkIHRvIGFxdWlyZSAke25hbWV9LCBidXQgaXQgaXMgb3duZWQgYnkgJHtiLnRocmVhZC5uYW1lfS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGIudHJhbnNpdGlvbkZyYW1lID0gZnJhbWU7XG4gICAgICAgICAgICBiLnRyYW5zaXRpb25ZID0gYi5jdXJyZW50WTtcbiAgICAgICAgICAgIGIudHJhbnNpdGlvbkFscGhhID0gYi5jdXJyZW50QWxwaGE7XG4gICAgICAgICAgICBiLnRocmVhZCA9IHJ1bm5pbmdUaHJlYWQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgYWNxdWlyZSBub25leGlzdGVudCBidWZmZXI6ICR7bmFtZX1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbGVhc2UobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKHJ1bm5pbmdUaHJlYWQubmFtZSBpbiBpbnNwZWN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3J1bm5pbmdUaHJlYWQubmFtZX06IHJlbGVhc2UgJHtuYW1lfWApO1xuICAgIH1cbiAgICBmb3IgKGxldCBiIG9mIGJ1ZmZlcnMpIHtcbiAgICAgICAgaWYgKGIubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICBpZiAoYi50aHJlYWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVHJpZWQgdG8gcmVsZWFzZSAke25hbWV9LCBidXQgaXQgaXMgbm90IG93bmVkLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGIudGhyZWFkICE9IHJ1bm5pbmdUaHJlYWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRyaWVkIHRvIHJlbGVhc2UgJHtuYW1lfSwgYnV0IGl0IGlzIG93bmVkIGJ5ICR7Yi50aHJlYWQubmFtZX0uYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiLnRyYW5zaXRpb25GcmFtZSA9IGZyYW1lO1xuICAgICAgICAgICAgYi50cmFuc2l0aW9uWSA9IGIuY3VycmVudFk7XG4gICAgICAgICAgICBiLnRocmVhZCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmVsZWFzZSBub25leGlzdGVudCBidWZmZXI6ICR7bmFtZX1gKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUaHJlYWRQYXJhbXMge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBmbjogYW55O1xuICAgIHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFRocmVhZCB7XG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICAgIHJlYWRvbmx5IGZuOiBhbnk7XG4gICAgcmVhZG9ubHkgeTogbnVtYmVyO1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogVGhyZWFkUGFyYW1zKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgICAgICB0aGlzLmZuID0gcGFyYW1zLmZuO1xuICAgICAgICB0aGlzLnkgPSBwYXJhbXMueTtcbiAgICAgICAgdGhpcy5zdGFjayA9IFt0aGlzLmZuKCldO1xuICAgIH1cbiAgICBzdGFjazogYW55W107XG4gICAgd2FpdFRpbWUgPSAwO1xufVxuXG5mdW5jdGlvbiByZWFwKCkge1xuICAgIGxldCBmaXJzdFNpZ25hbCA9IDA7XG4gICAgZm9yICg7IGZpcnN0U2lnbmFsIDwgc2lnbmFsRXZlbnRzLmxlbmd0aDsgZmlyc3RTaWduYWwrKykge1xuICAgICAgICBjb25zdCBlID0gc2lnbmFsRXZlbnRzW2ZpcnN0U2lnbmFsXTtcbiAgICAgICAgaWYgKHQgLSBlLnRpbWVzdGFtcCA8IHJlYXBUKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaWduYWxFdmVudHMgPSBzaWduYWxFdmVudHMuc2xpY2UoZmlyc3RTaWduYWwpO1xuXG4gICAgbGV0IGZpcnN0V2FpdCA9IDA7XG4gICAgZm9yICg7IGZpcnN0V2FpdCA8IHdhaXRFdmVudHMubGVuZ3RoOyBmaXJzdFdhaXQrKykge1xuICAgICAgICBjb25zdCBlID0gd2FpdEV2ZW50c1tmaXJzdFdhaXRdO1xuICAgICAgICBpZiAoZS53YWl0VGltZXN0YW1wID09IG51bGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0IC0gZS53YWl0VGltZXN0YW1wIDwgcmVhcFQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdhaXRFdmVudHMgPSB3YWl0RXZlbnRzLnNsaWNlKGZpcnN0V2FpdCk7XG5cbiAgICBsZXQgZmlyc3RXb3JrID0gMDtcbiAgICBmb3IgKDsgZmlyc3RXb3JrIDwgd29ya0V2ZW50cy5sZW5ndGg7IGZpcnN0V29yaysrKSB7XG4gICAgICAgIGNvbnN0IGUgPSB3b3JrRXZlbnRzW2ZpcnN0V29ya107XG4gICAgICAgIGlmIChlLmR1cmF0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0IC0gKGUudGltZXN0YW1wICsgZS5kdXJhdGlvbikgPCByZWFwVCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgd29ya0V2ZW50cyA9IHdvcmtFdmVudHMuc2xpY2UoZmlyc3RXb3JrKTtcbn1cblxuZnVuY3Rpb24gdGljayhtcykge1xuICAgIGxldCBtc0xlZnQgPSBwYXVzZWQgfHwgZHJhZ2dpbmdcbiAgICAgICAgPyAwXG4gICAgICAgIDogbXNQZXJTZWMgKiBtcyAvIDEwMDA7XG5cbiAgICBpZiAoZXJyb3JNZXNzYWdlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzdG9wVCAhPSBudWxsICYmIHQgKyBtc0xlZnQgPiBzdG9wVCkge1xuICAgICAgICBtc0xlZnQgPSBzdG9wVCAtIHQ7XG4gICAgfVxuXG4gICAgaWYgKCFkcmFnZ2luZyAmJiAodCAtIHN0YXJ0VCkgKiBweFBlck1zID4gY2FudmFzLndpZHRoIC0gNDAwKSB7XG4gICAgICAgIHN0YXJ0VCArPSBtc0xlZnQ7XG4gICAgfVxuICAgIGlmIChzdGFydFQgPCB0IC0gcmVhcFQpIHtcbiAgICAgICAgc3RhcnRUID0gdCAtIHJlYXBUO1xuICAgIH1cblxuICAgIHJlYXAoKTtcblxuICAgIHJ1bm5pbmdUaHJlYWQgPSBudWxsO1xuICAgIGVycm9yTWVzc2FnZSA9IG51bGw7XG5cbiAgICB0cnkge1xuXG4gICAgICAgIHdoaWxlIChtc0xlZnQgPiAwKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHQgb2YgdGhyZWFkcykge1xuICAgICAgICAgICAgICAgIGlmICh0LndhaXRUaW1lID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcnVubmluZ1RocmVhZCA9IHQ7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoOyA7KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IHQuc3RhY2tbdC5zdGFjay5sZW5ndGggLSAxXS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodi5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5zdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHYudmFsdWUubmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuc3RhY2sucHVzaCh2LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHYudmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdC53YWl0VGltZSA9IHYudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvcnMgYXJlIGV4cGVjdGVkIHRvIHJldHVybiAwLCBhIHRpbWUgaW4gbWlsbGlzZWNvbmRzLCBvciBhbm90aGVyIGdlbmVyYXRvci5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHNob3J0ZXN0ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgICAgICAgICAgZm9yIChsZXQgdCBvZiB0aHJlYWRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHQud2FpdFRpbWUgPiAwICYmIHQud2FpdFRpbWUgPCBzaG9ydGVzdCkge1xuICAgICAgICAgICAgICAgICAgICBzaG9ydGVzdCA9IHQud2FpdFRpbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNob3J0ZXN0ID09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRocmVhZCBtYWRlIHByb2dyZXNzLlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2hvcnRlc3QgPSBNYXRoLm1pbihzaG9ydGVzdCwgbXNMZWZ0KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgdCBvZiB0aHJlYWRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHQud2FpdFRpbWUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHQud2FpdFRpbWUgLT0gc2hvcnRlc3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtc0xlZnQgLT0gc2hvcnRlc3Q7XG4gICAgICAgICAgICB0ICs9IHNob3J0ZXN0O1xuICAgICAgICB9XG5cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgIGNvbnNvbGUubG9nKChydW5uaW5nVGhyZWFkID8gYEluIHRocmVhZCAke3J1bm5pbmdUaHJlYWQubmFtZX06IGAgOiAnJykgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB3YWl0VGltZVBhdGgoZTogV2FpdEV2ZW50KSB7XG4gICAgbGV0IHgxID0gZS50aW1lc3RhbXAgKiBweFBlck1zO1xuICAgIGxldCB5MSA9IGUudGhyZWFkLnk7XG4gICAgbGV0IHgyID0gKGUud2FpdFRpbWVzdGFtcCA/IGUud2FpdFRpbWVzdGFtcCA6IHQpICogcHhQZXJNcztcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnJlY3QoeDEsIHkxICsgMzAsIHgyIC0geDEsIDIwKTtcbn1cblxuZnVuY3Rpb24gd2FpdEhhbmRsZVBhdGgoZTogV2FpdEV2ZW50KSB7XG4gICAgbGV0IHggPSBlLndhaXRUaW1lc3RhbXAgKiBweFBlck1zO1xuICAgIGxldCB5ID0gZS53YWl0VGhyZWFkLnk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoeCwgeSArIDEwLCA1LCAwLCAyICogTWF0aC5QSSk7XG59XG5cbmZ1bmN0aW9uIHdvcmtQYXRoKGU6IFdvcmtFdmVudCkge1xuICAgIGxldCB4ID0gZS50aW1lc3RhbXAgKiBweFBlck1zO1xuICAgIGxldCB3ID0gKGUuZHVyYXRpb24gfHwgdCAtIGUudGltZXN0YW1wKSAqIHB4UGVyTXM7XG4gICAgbGV0IHkgPSBlLnRocmVhZC55O1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgucmVjdCh4LCB5ICsgMiwgdywgODApO1xufVxuXG5mdW5jdGlvbiBzaWduYWxQYXRoKGU6IFNpZ25hbEV2ZW50KSB7XG4gICAgbGV0IHggPSBlLnRpbWVzdGFtcCAqIHB4UGVyTXM7XG4gICAgbGV0IHkgPSBlLnRocmVhZC55O1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHgsIHkgKyA1KTtcbiAgICBjdHgubGluZVRvKHggLSA4LCB5IC0gOCk7XG4gICAgY3R4LmxpbmVUbyh4ICsgOCwgeSAtIDgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VDb2xvcihjb2xvcjogc3RyaW5nKTogbnVtYmVyW10ge1xuICAgIGNvbG9yID0gY29sb3JbMF0gPT0gJyMnID8gY29sb3Iuc2xpY2UoMSkgOiBjb2xvcjtcbiAgICBjb25zdCByID0gcGFyc2VJbnQoY29sb3Iuc2xpY2UoMCwgMikpIC8gMjU1LjAsXG4gICAgICAgIGcgPSBwYXJzZUludChjb2xvci5zbGljZSgyLCA0KSkgLyAyNTUuMCxcbiAgICAgICAgYiA9IHBhcnNlSW50KGNvbG9yLnNsaWNlKDQsIDYpKSAvIDI1NS4wO1xuICAgIHJldHVybiBbciwgZywgYl07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdENvbG9yKHJnYjogbnVtYmVyW10pIHtcbiAgICBjb25zdCBbciwgZywgYl0gPSByZ2I7XG4gICAgcmV0dXJuICdyZ2IoJyArXG4gICAgICAgIE1hdGgucm91bmQociAqIDI1NSkgKyAnLCcgK1xuICAgICAgICBNYXRoLnJvdW5kKHIgKiAyNTUpICsgJywnICtcbiAgICAgICAgTWF0aC5yb3VuZChiICogMjU1KSArICcpJ1xufVxuXG5mdW5jdGlvbiByZ2JUb0hTTChyZ2I6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IFtyLCBnLCBiXSA9IHJnYjtcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKSwgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgdmFyIGgsIHMsIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gICAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICAgICAgaCA9IHMgPSAwOyAvLyBhY2hyb21hdGljXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGQgPSBtYXggLSBtaW47XG4gICAgICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKTtcbiAgICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgICAgIGNhc2UgcjogaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZzogaCA9IChiIC0gcikgLyBkICsgMjsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGI6IGggPSAociAtIGcpIC8gZCArIDQ7IGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGggLz0gNjtcbiAgICB9XG4gICAgcmV0dXJuIFtoLCBzLCBsXTtcbn1cblxuZnVuY3Rpb24gaHNsVG9SR0IoaHNsOiBudW1iZXJbXSkge1xuICAgIGNvbnN0IFtoLCBzLCBsXSA9IGhzbDtcbiAgICB2YXIgciwgZywgYjtcbiAgICBpZiAocyA9PSAwKSB7XG4gICAgICAgIHIgPSBnID0gYiA9IGw7IC8vIGFjaHJvbWF0aWNcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaHVlVG9SR0IgPSBmdW5jdGlvbiBodWUycmdiKHAsIHEsIHQpIHtcbiAgICAgICAgICAgIGlmICh0IDwgMCkgdCArPSAxO1xuICAgICAgICAgICAgaWYgKHQgPiAxKSB0IC09IDE7XG4gICAgICAgICAgICBpZiAodCA8IDEgLyA2KSByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdDtcbiAgICAgICAgICAgIGlmICh0IDwgMSAvIDIpIHJldHVybiBxO1xuICAgICAgICAgICAgaWYgKHQgPCAyIC8gMykgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdCkgKiA2O1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xuICAgICAgICB2YXIgcCA9IDIgKiBsIC0gcTtcbiAgICAgICAgciA9IGh1ZVRvUkdCKHAsIHEsIGggKyAxIC8gMyk7XG4gICAgICAgIGcgPSBodWVUb1JHQihwLCBxLCBoKTtcbiAgICAgICAgYiA9IGh1ZVRvUkdCKHAsIHEsIGggLSAxIC8gMyk7XG4gICAgfVxuICAgIHJldHVybiBbciwgZywgYl07XG59XG5cbmZ1bmN0aW9uIGxpZ2h0ZW5Db2xvcihjb2xvcjogc3RyaW5nLCBhbW91bnQ6IG51bWJlcikge1xuICAgIGxldCBbaCwgcywgbF0gPSByZ2JUb0hTTChwYXJzZUNvbG9yKGNvbG9yKSk7XG4gICAgbCA9IGwgKiBhbW91bnQ7XG4gICAgcmV0dXJuIGZvcm1hdENvbG9yKGhzbFRvUkdCKFtoLCBzLCBsXSkpO1xufVxuXG5mdW5jdGlvbiBsZXJwKGE6IG51bWJlciwgYjogbnVtYmVyLCB0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gYiAqIHQgKyBhICogKDEgLSB0KTtcbn1cblxuZnVuY3Rpb24gc21vb3Roc3RlcChlMDogbnVtYmVyLCBlMTogbnVtYmVyLCBhOiBudW1iZXIpIHtcbiAgICBjb25zdCBiID0gTWF0aC5taW4oMS4wLCBNYXRoLm1heCgwLjAsIChhIC0gZTApIC8gKGUxIC0gZTApKSk7XG4gICAgcmV0dXJuIGIgKiBiICogKDMgLSAyICogYik7XG59XG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgcHhQZXJNcyA9IGNhbnZhcy53aWR0aCAvIG1zVmlldztcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgIGN0eC5zYXZlKCk7XG5cbiAgICBmb3IgKGxldCB0IG9mIHRocmVhZHMpIHtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjYzBjMGMwXCI7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbygwLCB0LnkgKyAxKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjYW52YXMud2lkdGgsIHQueSArIDEpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgY3R4LnNjYWxlKDEsIDEpO1xuICAgIGN0eC50cmFuc2xhdGUoLXN0YXJ0VCAqIHB4UGVyTXMsIDApO1xuXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjODA4MDgwXCI7XG4gICAgY3R4LmZpbGxSZWN0KHQgKiBweFBlck1zLCAwLCAxLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjdHguZm9udCA9IFwiaXRhbGljIDQ0cHggQ2FsaWJyaVwiO1xuICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCdcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjODA4MDgwXCI7XG4gICAgY3R4LmZpbGxUZXh0KGB0PSR7KE1hdGgucm91bmQodCAqIDEwMDApIC8gMTAwMCkudG9GaXhlZCgzKX1tc2AsIHQgKiBweFBlck1zICsgNSwgNDUpO1xuICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICBmb3IgKGxldCBlIG9mIHdhaXRFdmVudHMpIHtcbiAgICAgICAgaWYgKGUud2FpdFRpbWVzdGFtcCA9PSBudWxsIHx8IGUud2FpdFRpbWVzdGFtcCA+IGUudGltZXN0YW1wKSB7XG4gICAgICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgICAgICB3YWl0VGltZVBhdGgoZSk7XG4gICAgICAgICAgICBpZiAoZSA9PT0gYWN0aXZlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInllbGxvd1wiO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSA0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiM4MDgwODBcIjtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmOGY4ZjhcIjtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguY2xpcCgpO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjEycHggQ2FsaWJyaVwiO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzgwODA4MFwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwid2FpdCBcIiArIGUubmFtZSwgZS50aW1lc3RhbXAgKiBweFBlck1zICsgMTAsIGUudGhyZWFkLnkgKyA0NSk7XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBlIG9mIHdvcmtFdmVudHMpIHtcbiAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICB3b3JrUGF0aChlKTtcbiAgICAgICAgaWYgKGUgPT09IGFjdGl2ZUV2ZW50KSB7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInllbGxvd1wiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBlLmNvbG9yOyAvL2xpZ2h0ZW5Db2xvcihlLmNvbG9yLCAwLjkpO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGUuY29sb3IgfHwgXCIjNzgwMDAwXCI7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsaXAoKTtcbiAgICAgICAgY3R4LmZvbnQgPSBcIjE4cHggQ2FsaWJyaVwiO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XG4gICAgICAgIGN0eC5maWxsVGV4dChlLnRpdGxlIHx8IGUubmFtZSwgZS50aW1lc3RhbXAgKiBweFBlck1zICsgMTAsIGUudGhyZWFkLnkgKyA0NSk7XG4gICAgICAgIGN0eC5yZXN0b3JlKClcbiAgICB9XG5cbiAgICBmb3IgKGxldCBlIG9mIHNpZ25hbEV2ZW50cykge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBzaWduYWxQYXRoKGUpO1xuICAgICAgICBpZiAoZSA9PT0gYWN0aXZlRXZlbnQpIHtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwieWVsbG93XCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gNDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5mb250ID0gXCIxMnB4IENhbGlicmlcIjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInXG4gICAgICAgIGN0eC5maWxsVGV4dChlLm5hbWUsIGUudGltZXN0YW1wICogcHhQZXJNcywgZS50aHJlYWQueSAtIDE1KTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBlIG9mIHdhaXRFdmVudHMpIHtcbiAgICAgICAgaWYgKGUud2FpdFRpbWVzdGFtcCAhPSBudWxsICYmIGUud2FpdFRpbWVzdGFtcCA+IGUudGltZXN0YW1wKSB7XG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgaWYgKGUgPT09IGFjdGl2ZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gNDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjNDA0MDQwXCI7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZjBmMGYwXCI7XG4gICAgICAgICAgICB3YWl0SGFuZGxlUGF0aChlKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYiBvZiBidWZmZXJzKSB7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gYi5zY2FsZSA/IGIuc2NhbGUgOiAxLjA7XG4gICAgICAgIGNvbnN0IHggPSB0ICogcHhQZXJNcztcbiAgICAgICAgY29uc3QgdGFyZ2V0WSA9IGIudGhyZWFkICE9IG51bGwgJiYgYi54ID4gMCA/IGIudGhyZWFkLnkgKyAoNDUgLSBiLmhlaWdodCAqIHNjYWxlIC8gMikgOiBiLnk7XG4gICAgICAgIGNvbnN0IHRhcmdldEFscGhhID0gYi50aHJlYWQgIT0gbnVsbCB8fCBiLnggPCAwID8gMS4wIDogMC4yNTtcbiAgICAgICAgY29uc3QgbCA9IHNtb290aHN0ZXAoYi50cmFuc2l0aW9uRnJhbWUsIGIudHJhbnNpdGlvbkZyYW1lICsgNywgZnJhbWUpO1xuICAgICAgICBjb25zdCB5ID0gbGVycChiLnRyYW5zaXRpb25ZLCB0YXJnZXRZLCBsKTtcbiAgICAgICAgY29uc3QgYWxwaGEgPSBsZXJwKGIudHJhbnNpdGlvbkFscGhhLCB0YXJnZXRBbHBoYSwgbCk7XG4gICAgICAgIGIuY3VycmVudFkgPSB5O1xuICAgICAgICBiLmN1cnJlbnRBbHBoYSA9IGFscGhhO1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSBhbHBoYTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguZm9udCA9IFwiMTJweCBDb25zb2xhc1wiO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcidcbiAgICAgICAgY3R4LmZpbGxUZXh0KGIubmFtZSwgeCArIGIueCArIGIud2lkdGggKiBzY2FsZSAvIDIsIHkgLSAyKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjNDA0MDQwXCI7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZjBmMGYwXCI7XG4gICAgICAgIGN0eC5maWxsUmVjdCh4ICsgYi54LCB5LCBiLndpZHRoICogc2NhbGUgKyAyLCBiLmhlaWdodCAqIHNjYWxlICsgMik7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoYi5jYW52YXMsIHggKyBiLnggKyAxLCB5ICsgMSwgYi53aWR0aCAqIHNjYWxlLCBiLmhlaWdodCAqIHNjYWxlKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3JNZXNzYWdlICE9IG51bGwpIHtcbiAgICAgICAgbGV0IHkgPSBydW5uaW5nVGhyZWFkICE9IG51bGwgPyBydW5uaW5nVGhyZWFkLnkgLSAxNSA6IDQ1O1xuICAgICAgICBjdHguZm9udCA9IHJ1bm5pbmdUaHJlYWQgIT0gbnVsbCA/IFwiYm9sZCAyMnB4IENvbnNvbGFzXCIgOiBcIjQwcHggQ29uc29sYXNcIjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmMDAwMFwiO1xuICAgICAgICBjdHgudGV4dEFsaWduID0gJ3JpZ2h0J1xuICAgICAgICBsZXQgdGV4dCA9IHJ1bm5pbmdUaHJlYWQgIT0gbnVsbFxuICAgICAgICAgICAgPyBgVEhSRUFEIEVSUk9SOiAke2Vycm9yTWVzc2FnZX0gLSBzZWUgSmF2YVNjcmlwdCBjb25zb2xlIGZvciBjYWxsc3RhY2tgXG4gICAgICAgICAgICA6ICdFUlJPUjogJyArIGVycm9yTWVzc2FnZTtcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIHQgKiBweFBlck1zIC0gMTAsIHkpO1xuICAgIH1cblxuICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICBmb3IgKGxldCB0IG9mIHRocmVhZHMpIHtcbiAgICAgICAgY3R4LmZvbnQgPSBcIjU2cHggQ2FsaWJyaVwiO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCdcbiAgICAgICAgY3R4LmZpbGxUZXh0KHQubmFtZSwgMiwgdC55IC0gNDApO1xuICAgIH1cblxuICAgIGZyYW1lKys7XG59XG5cbmZ1bmN0aW9uIG1vdXNlTW92ZSh0aGlzOiBIVE1MQ2FudmFzRWxlbWVudCwgZXY6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgY2FudmFzWCA9IGV2LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgbGV0IGNhbnZhc1kgPSBldi5jbGllbnRZIC0gcmVjdC50b3A7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgc3RhcnRUID0gZHJhZ1N0YXJ0VCAtIChjYW52YXNYIC0gZHJhZ1N0YXJ0WCkgLyBweFBlck1zO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHggPSBjYW52YXNYICsgc3RhcnRUICogcHhQZXJNcztcbiAgICBsZXQgeSA9IGNhbnZhc1k7XG5cbiAgICBjdHguc2F2ZSgpO1xuXG4gICAgYWN0aXZlRXZlbnQgPSBudWxsO1xuICAgIGZvciAobGV0IGUgb2Ygd2FpdEV2ZW50cykge1xuICAgICAgICBpZiAoZS53YWl0VGltZXN0YW1wID09IG51bGwgfHwgZS53YWl0VGltZXN0YW1wID4gZS50aW1lc3RhbXApIHtcbiAgICAgICAgICAgIHdhaXRUaW1lUGF0aChlKTtcbiAgICAgICAgICAgIGlmIChjdHguaXNQb2ludEluUGF0aCh4LCB5KSkge1xuICAgICAgICAgICAgICAgIGFjdGl2ZUV2ZW50ID0gZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBlIG9mIHdvcmtFdmVudHMpIHtcbiAgICAgICAgd29ya1BhdGgoZSk7XG4gICAgICAgIGlmIChjdHguaXNQb2ludEluUGF0aCh4LCB5KSkge1xuICAgICAgICAgICAgYWN0aXZlRXZlbnQgPSBlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGUgb2Ygc2lnbmFsRXZlbnRzKSB7XG4gICAgICAgIHNpZ25hbFBhdGgoZSk7XG4gICAgICAgIGlmIChjdHguaXNQb2ludEluUGF0aCh4LCB5KSkge1xuICAgICAgICAgICAgYWN0aXZlRXZlbnQgPSBlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGUgb2Ygd2FpdEV2ZW50cykge1xuICAgICAgICBpZiAoZS53YWl0VGltZXN0YW1wICE9IG51bGwgJiYgZS53YWl0VGltZXN0YW1wID4gZS50aW1lc3RhbXApIHtcbiAgICAgICAgICAgIGlmIChlLndhaXRUaW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICB3YWl0SGFuZGxlUGF0aChlKTtcbiAgICAgICAgICAgICAgICBpZiAoY3R4LmlzUG9pbnRJblBhdGgoeCwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlRXZlbnQgPSBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGN0eC5yZXN0b3JlKCk7XG59XG5cbmZ1bmN0aW9uIG1vdXNlRG93bih0aGlzOiBIVE1MQ2FudmFzRWxlbWVudCwgZXY6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgY2FudmFzWCA9IGV2LmNsaWVudFggLSByZWN0LmxlZnQ7XG5cbiAgICBkcmFnZ2luZyA9IHRydWU7XG4gICAgZHJhZ1N0YXJ0VCA9IHN0YXJ0VDtcbiAgICBkcmFnU3RhcnRYID0gY2FudmFzWDtcbn1cblxuZnVuY3Rpb24gbW91c2VVcCh0aGlzOiBIVE1MQ2FudmFzRWxlbWVudCwgZXY6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGNhbnZhc1ggPSBldi5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuXG4gICAgaWYgKE1hdGguYWJzKGNhbnZhc1ggLSBkcmFnU3RhcnRYKSA8IDUpIHtcbiAgICAgICAgYWR2YW5jZURpcmVjdG9yKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtb3VzZVdoZWVsKHRoaXM6IEhUTUxDYW52YXNFbGVtZW50LCBldjogV2hlZWxFdmVudCkge1xuICAgIGxldCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBjYW52YXNYID0gZXYuY2xpZW50WCAtIHJlY3QubGVmdDtcblxuICAgIHNldE1zVmlldyhtc1ZpZXcgKiAoZXYuZGVsdGFZID4gMCA/IDEuMiA6IDAuOCkpO1xuXG4gICAgbGV0IGN1cnNvclQgPSBzdGFydFQgKyBjYW52YXNYIC8gcHhQZXJNcztcbiAgICBweFBlck1zID0gY2FudmFzLndpZHRoIC8gbXNWaWV3O1xuICAgIHN0YXJ0VCA9IGN1cnNvclQgLSBjYW52YXNYIC8gcHhQZXJNcztcblxuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRNc1ZpZXcodmFsdWU6IG51bWJlcikge1xuICAgIG1zVmlldyA9IHZhbHVlO1xuICAgIGNvbnRyb2xzLnF1ZXJ5U2VsZWN0b3IoXCIjdmlld1wiKVxuICAgICAgICAuc2V0QXR0cmlidXRlKCd2YWx1ZScsIFN0cmluZyhNYXRoLnJvdW5kKG1zVmlldyAqIDEwKSAvIDEwKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQYXVzZWQobmV3UGF1c2VkOiBib29sZWFuKSB7XG4gICAgcGF1c2VkID0gbmV3UGF1c2VkO1xuXG4gICAgY29udHJvbHMucXVlcnlTZWxlY3RvckFsbChcIiNwYXVzZSA+IGlcIikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAocGF1c2VkKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlJyk7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3BsYXknKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgncGxheScpO1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdwYXVzZScpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRNc1BlclNlYyhuZXdNc1BlclNlYzogbnVtYmVyKSB7XG4gICAgbXNQZXJTZWMgPSBuZXdNc1BlclNlYztcblxuICAgIGNvbnRyb2xzLnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcmF0ZVwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgaWYgKGJ1dHRvbi50ZXh0Q29udGVudCA9PSBTdHJpbmcobXNQZXJTZWMpKSB7XG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbFRvKG1zOiBudW1iZXIpIHtcbiAgICBzdGFydFQgPSBtcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkZvcihtczogbnVtYmVyKSB7XG4gICAgc3RvcFQgPSB0ICsgbXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW4oKSB7XG4gICAgc3RvcFQgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBhZHZhbmNlRGlyZWN0b3IoKSB7XG4gICAgaWYgKGRpcmVjdG9yICE9IG51bGwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRpcmVjdG9yLm5leHQoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBJbiBkaXJlY3RvcjogYCArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGtleVByZXNzKHRoaXM6IEhUTUxDYW52YXNFbGVtZW50LCBldjogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChldi5rZXlDb2RlID09IDMyKSB7XG4gICAgICAgIHNldFBhdXNlZCghcGF1c2VkKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgY29udHJvbHMucXVlcnlTZWxlY3RvcihcIiNuZXh0XCIpXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKHRoaXMsIGV2KSB7XG4gICAgICAgICAgICBhZHZhbmNlRGlyZWN0b3IoKTtcbiAgICAgICAgfSk7XG5cbiAgICBjb250cm9scy5xdWVyeVNlbGVjdG9yKFwiI3BhdXNlXCIpXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKHRoaXMsIGV2KSB7XG4gICAgICAgICAgICBzZXRQYXVzZWQoIXBhdXNlZCk7XG4gICAgICAgIH0pO1xuICAgIHNldFBhdXNlZChwYXVzZWQpO1xuXG4gICAgY29udHJvbHMucXVlcnlTZWxlY3RvckFsbChcIiNyYXRlXCIpLmZvckVhY2goKGl0ZW0pID0+XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICh0aGlzLCBldikge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gKDxIVE1MQnV0dG9uRWxlbWVudD50aGlzKTtcbiAgICAgICAgICAgIHNldE1zUGVyU2VjKE51bWJlcihidXR0b24udGV4dENvbnRlbnQpKTtcbiAgICAgICAgfSkpO1xuICAgIHNldE1zUGVyU2VjKG1zUGVyU2VjKTtcblxuICAgIGNvbnRyb2xzLnF1ZXJ5U2VsZWN0b3IoXCIjdmlld1wiKVxuICAgICAgICAuc2V0QXR0cmlidXRlKCd2YWx1ZScsIFN0cmluZyhtc1ZpZXcpKTtcbiAgICBjb250cm9scy5xdWVyeVNlbGVjdG9yKFwiI3ZpZXdcIilcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAodGhpcywgZXYpIHtcbiAgICAgICAgICAgIG1zVmlldyA9IE51bWJlcigoPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcykudmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd24pO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgbW91c2VXaGVlbCk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlQcmVzcyk7XG59XG5cbmludGVyZmFjZSBUaW1lbGluZU9wdGlvbnMge1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY29udHJvbHM6IEhUTUxFbGVtZW50O1xuICAgIHNwcml0ZXM/OiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHRocmVhZHM6IFRocmVhZFBhcmFtc1tdO1xuICAgIGJ1ZmZlcnM/OiBCdWZmZXJQYXJhbXNbXTtcbiAgICBkaXJlY3Rvcj86IEl0ZXJhYmxlSXRlcmF0b3I8YW55Pjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVsaW5lKG9wdGlvbnM6IFRpbWVsaW5lT3B0aW9ucykge1xuICAgIGNhbnZhcyA9IG9wdGlvbnMuY2FudmFzO1xuICAgIGNvbnRyb2xzID0gb3B0aW9ucy5jb250cm9scztcbiAgICBzcHJpdGVzID0gb3B0aW9ucy5zcHJpdGVzO1xuICAgIGRpcmVjdG9yID0gb3B0aW9ucy5kaXJlY3RvcjtcblxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBmb3IgKGxldCB0IG9mIG9wdGlvbnMudGhyZWFkcykge1xuICAgICAgICB0aHJlYWRzLnB1c2gobmV3IFRocmVhZCh0KSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuYnVmZmVycykge1xuICAgICAgICBmb3IgKGxldCBiIG9mIG9wdGlvbnMuYnVmZmVycykge1xuICAgICAgICAgICAgYnVmZmVycy5wdXNoKG5ldyBCdWZmZXIoYikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZCgpO1xuXG4gICAgYWR2YW5jZURpcmVjdG9yKCk7XG5cbiAgICBsZXQgcHJldlRpbWVzdGFtcCA9IDA7XG4gICAgZnVuY3Rpb24gc3RlcCh0aW1lc3RhbXApIHtcbiAgICAgICAgdGljayh0aW1lc3RhbXAgLSBwcmV2VGltZXN0YW1wKTtcbiAgICAgICAgcHJldlRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgZHJhdygpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL2luZGV4LnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==