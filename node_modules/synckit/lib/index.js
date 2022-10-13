var _a;
import { __awaiter } from "tslib";
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { MessageChannel, Worker, receiveMessageOnPort, 
// type-coverage:ignore-next-line -- we can't control
workerData, parentPort, } from 'node:worker_threads';
import { findUp, tryExtensions } from '@pkgr/utils';
export * from './types.js';
const { SYNCKIT_BUFFER_SIZE, SYNCKIT_TIMEOUT, SYNCKIT_EXEC_ARV } = process.env;
export const DEFAULT_BUFFER_SIZE = SYNCKIT_BUFFER_SIZE
    ? +SYNCKIT_BUFFER_SIZE
    : undefined;
export const DEFAULT_TIMEOUT = SYNCKIT_TIMEOUT ? +SYNCKIT_TIMEOUT : undefined;
export const DEFAULT_WORKER_BUFFER_SIZE = DEFAULT_BUFFER_SIZE || 1024;
/* istanbul ignore next */
export const DEFAULT_EXEC_ARGV = (_a = SYNCKIT_EXEC_ARV === null || SYNCKIT_EXEC_ARV === void 0 ? void 0 : SYNCKIT_EXEC_ARV.split(',')) !== null && _a !== void 0 ? _a : [];
const syncFnCache = new Map();
// MessagePort doesn't copy the properties of Error objects. We still want
// error objects to have extra properties such as "warnings" so implement the
// property copying manually.
export const extractProperties = (object) => {
    if (object && typeof object === 'object') {
        const properties = {};
        for (const key in object) {
            properties[key] = object[key];
        }
        return properties;
    }
};
export function createSyncFn(workerPath, bufferSizeOrOptions, timeout) {
    if (!path.isAbsolute(workerPath)) {
        throw new Error('`workerPath` must be absolute');
    }
    const cachedSyncFn = syncFnCache.get(workerPath);
    if (cachedSyncFn) {
        return cachedSyncFn;
    }
    const syncFn = startWorkerThread(workerPath, 
    /* istanbul ignore next */ typeof bufferSizeOrOptions === 'number'
        ? { bufferSize: bufferSizeOrOptions, timeout }
        : bufferSizeOrOptions);
    syncFnCache.set(workerPath, syncFn);
    return syncFn;
}
const cjsRequire = typeof require === 'undefined'
    ? createRequire(import.meta.url)
    : /* istanbul ignore next */ require;
const dataUrl = (code) => new URL(`data:text/javascript,${encodeURIComponent(code)}`);
// eslint-disable-next-line sonarjs/cognitive-complexity
const setupTsNode = (workerPath, execArgv) => {
    if (!/[/\\]node_modules[/\\]/.test(workerPath)) {
        const ext = path.extname(workerPath);
        if (!ext || /\.[cm]?js$/.test(ext)) {
            const workPathWithoutExt = ext
                ? workerPath.slice(0, -ext.length)
                : workerPath;
            let extensions;
            switch (ext) {
                case '.cjs':
                    extensions = ['cts', 'cjs'];
                    break;
                case '.mjs':
                    extensions = ['mts', 'mjs'];
                    break;
                default:
                    extensions = ['.ts', '.js'];
                    break;
            }
            const found = tryExtensions(workPathWithoutExt, extensions);
            if (found && (!ext || found !== workPathWithoutExt)) {
                workerPath = found;
            }
        }
    }
    const isTs = /\.[cm]?ts$/.test(workerPath);
    let tsUseEsm = workerPath.endsWith('.mts');
    if (isTs) {
        if (!tsUseEsm) {
            const pkg = findUp(workerPath);
            if (pkg) {
                tsUseEsm =
                    cjsRequire(pkg).type ===
                        'module';
            }
        }
        if (tsUseEsm && !execArgv.includes('--loader')) {
            execArgv = ['--loader', 'ts-node/esm', ...execArgv];
        }
    }
    return {
        isTs,
        tsUseEsm,
        workerPath,
        execArgv,
    };
};
function startWorkerThread(workerPath, { bufferSize = DEFAULT_WORKER_BUFFER_SIZE, timeout = DEFAULT_TIMEOUT, execArgv = DEFAULT_EXEC_ARGV, } = {}) {
    const { port1: mainPort, port2: workerPort } = new MessageChannel();
    const { isTs, tsUseEsm, workerPath: finalWorkerPath, execArgv: finalExecArgv, } = setupTsNode(workerPath, execArgv);
    const worker = new Worker(isTs
        ? tsUseEsm
            ? dataUrl(`import '${String(pathToFileURL(finalWorkerPath))}'`)
            : `require('ts-node/register');require('${finalWorkerPath.replace(/\\/g, '\\\\')}')`
        : pathToFileURL(finalWorkerPath), {
        eval: isTs && !tsUseEsm,
        workerData: { workerPort },
        transferList: [workerPort],
        execArgv: finalExecArgv,
    });
    let nextID = 0;
    const syncFn = (...args) => {
        const id = nextID++;
        const sharedBuffer = new SharedArrayBuffer(bufferSize);
        const sharedBufferView = new Int32Array(sharedBuffer);
        const msg = { sharedBuffer, id, args };
        worker.postMessage(msg);
        const status = Atomics.wait(sharedBufferView, 0, 0, timeout);
        /* istanbul ignore if */
        if (!['ok', 'not-equal'].includes(status)) {
            throw new Error('Internal error: Atomics.wait() failed: ' + status);
        }
        const { id: id2, result, error, properties, } = receiveMessageOnPort(mainPort)
            .message;
        /* istanbul ignore if */
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
/* istanbul ignore next */
export function runAsWorker(fn) {
    // type-coverage:ignore-next-line -- we can't control
    if (!workerData) {
        return;
    }
    const { workerPort } = workerData;
    parentPort.on('message', ({ sharedBuffer, id, args }) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        ;
        (() => __awaiter(this, void 0, void 0, function* () {
            const sharedBufferView = new Int32Array(sharedBuffer);
            let msg;
            try {
                msg = { id, result: yield fn(...args) };
            }
            catch (error) {
                msg = {
                    id,
                    error,
                    properties: extractProperties(error),
                };
            }
            workerPort.postMessage(msg);
            Atomics.add(sharedBufferView, 0, 1);
            Atomics.notify(sharedBufferView, 0);
        }))();
    });
}
//# sourceMappingURL=index.js.map