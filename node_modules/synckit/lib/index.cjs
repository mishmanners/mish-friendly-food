'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var node_module = require('node:module');
var path = require('node:path');
var node_url = require('node:url');
var node_worker_threads = require('node:worker_threads');
var utils = require('@pkgr/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const import_meta = {};
var _a;
const { SYNCKIT_BUFFER_SIZE, SYNCKIT_TIMEOUT, SYNCKIT_EXEC_ARV } = process.env;
const DEFAULT_BUFFER_SIZE = SYNCKIT_BUFFER_SIZE ? +SYNCKIT_BUFFER_SIZE : void 0;
const DEFAULT_TIMEOUT = SYNCKIT_TIMEOUT ? +SYNCKIT_TIMEOUT : void 0;
const DEFAULT_WORKER_BUFFER_SIZE = DEFAULT_BUFFER_SIZE || 1024;
const DEFAULT_EXEC_ARGV = (_a = SYNCKIT_EXEC_ARV == null ? void 0 : SYNCKIT_EXEC_ARV.split(",")) != null ? _a : [];
const syncFnCache = /* @__PURE__ */ new Map();
const extractProperties = (object) => {
  if (object && typeof object === "object") {
    const properties = {};
    for (const key in object) {
      properties[key] = object[key];
    }
    return properties;
  }
};
function createSyncFn(workerPath, bufferSizeOrOptions, timeout) {
  if (!path__default["default"].isAbsolute(workerPath)) {
    throw new Error("`workerPath` must be absolute");
  }
  const cachedSyncFn = syncFnCache.get(workerPath);
  if (cachedSyncFn) {
    return cachedSyncFn;
  }
  const syncFn = startWorkerThread(workerPath, typeof bufferSizeOrOptions === "number" ? { bufferSize: bufferSizeOrOptions, timeout } : bufferSizeOrOptions);
  syncFnCache.set(workerPath, syncFn);
  return syncFn;
}
const cjsRequire = typeof require === "undefined" ? node_module.createRequire(import_meta.url) : require;
const dataUrl = (code) => new URL(`data:text/javascript,${encodeURIComponent(code)}`);
const setupTsNode = (workerPath, execArgv) => {
  if (!/[/\\]node_modules[/\\]/.test(workerPath)) {
    const ext = path__default["default"].extname(workerPath);
    if (!ext || /\.[cm]?js$/.test(ext)) {
      const workPathWithoutExt = ext ? workerPath.slice(0, -ext.length) : workerPath;
      let extensions;
      switch (ext) {
        case ".cjs":
          extensions = ["cts", "cjs"];
          break;
        case ".mjs":
          extensions = ["mts", "mjs"];
          break;
        default:
          extensions = [".ts", ".js"];
          break;
      }
      const found = utils.tryExtensions(workPathWithoutExt, extensions);
      if (found && (!ext || found !== workPathWithoutExt)) {
        workerPath = found;
      }
    }
  }
  const isTs = /\.[cm]?ts$/.test(workerPath);
  let tsUseEsm = workerPath.endsWith(".mts");
  if (isTs) {
    if (!tsUseEsm) {
      const pkg = utils.findUp(workerPath);
      if (pkg) {
        tsUseEsm = cjsRequire(pkg).type === "module";
      }
    }
    if (tsUseEsm && !execArgv.includes("--loader")) {
      execArgv = ["--loader", "ts-node/esm", ...execArgv];
    }
  }
  return {
    isTs,
    tsUseEsm,
    workerPath,
    execArgv
  };
};
function startWorkerThread(workerPath, {
  bufferSize = DEFAULT_WORKER_BUFFER_SIZE,
  timeout = DEFAULT_TIMEOUT,
  execArgv = DEFAULT_EXEC_ARGV
} = {}) {
  const { port1: mainPort, port2: workerPort } = new node_worker_threads.MessageChannel();
  const {
    isTs,
    tsUseEsm,
    workerPath: finalWorkerPath,
    execArgv: finalExecArgv
  } = setupTsNode(workerPath, execArgv);
  const worker = new node_worker_threads.Worker(isTs ? tsUseEsm ? dataUrl(`import '${String(node_url.pathToFileURL(finalWorkerPath))}'`) : `require('ts-node/register');require('${finalWorkerPath.replace(/\\/g, "\\\\")}')` : node_url.pathToFileURL(finalWorkerPath), {
    eval: isTs && !tsUseEsm,
    workerData: { workerPort },
    transferList: [workerPort],
    execArgv: finalExecArgv
  });
  let nextID = 0;
  const syncFn = (...args) => {
    const id = nextID++;
    const sharedBuffer = new SharedArrayBuffer(bufferSize);
    const sharedBufferView = new Int32Array(sharedBuffer);
    const msg = { sharedBuffer, id, args };
    worker.postMessage(msg);
    const status = Atomics.wait(sharedBufferView, 0, 0, timeout);
    if (!["ok", "not-equal"].includes(status)) {
      throw new Error("Internal error: Atomics.wait() failed: " + status);
    }
    const {
      id: id2,
      result,
      error,
      properties
    } = node_worker_threads.receiveMessageOnPort(mainPort).message;
    if (id !== id2) {
      throw new Error(`Internal error: Expected id ${id} but got id ${id2}`);
    }
    if (error) {
      throw Object.assign(error, properties);
    }
    return result;
  };
  worker.unref();
  return syncFn;
}
function runAsWorker(fn) {
  if (!node_worker_threads.workerData) {
    return;
  }
  const { workerPort } = node_worker_threads.workerData;
  node_worker_threads.parentPort.on("message", ({ sharedBuffer, id, args }) => {
    (() => __async(this, null, function* () {
      const sharedBufferView = new Int32Array(sharedBuffer);
      let msg;
      try {
        msg = { id, result: yield fn(...args) };
      } catch (error) {
        msg = {
          id,
          error,
          properties: extractProperties(error)
        };
      }
      workerPort.postMessage(msg);
      Atomics.add(sharedBufferView, 0, 1);
      Atomics.notify(sharedBufferView, 0);
    }))();
  });
}

exports.DEFAULT_BUFFER_SIZE = DEFAULT_BUFFER_SIZE;
exports.DEFAULT_EXEC_ARGV = DEFAULT_EXEC_ARGV;
exports.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
exports.DEFAULT_WORKER_BUFFER_SIZE = DEFAULT_WORKER_BUFFER_SIZE;
exports.createSyncFn = createSyncFn;
exports.extractProperties = extractProperties;
exports.runAsWorker = runAsWorker;
