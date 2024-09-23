// Build 667584267

var ModuleFactory = (() => {
  var _scriptName =
    typeof document != 'undefined' ? document.currentScript?.src : undefined;
  if (typeof __filename != 'undefined') _scriptName ||= __filename;
  return function (moduleArg = {}) {
    var moduleRtn;

    var Module = moduleArg;
    var readyPromiseResolve, readyPromiseReject;
    var readyPromise = new Promise((resolve, reject) => {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
    var ENVIRONMENT_IS_WEB = typeof window == 'object';
    var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
    var ENVIRONMENT_IS_NODE =
      typeof process == 'object' &&
      typeof process.versions == 'object' &&
      typeof process.versions.node == 'string';
    if (ENVIRONMENT_IS_NODE) {
    }
    var moduleOverrides = Object.assign({}, Module);
    var arguments_ = [];
    var thisProgram = './this.program';
    var quit_ = (status, toThrow) => {
      throw toThrow;
    };
    var scriptDirectory = '';
    function locateFile(path) {
      if (Module['locateFile']) {
        return Module['locateFile'](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var readAsync, readBinary;
    if (ENVIRONMENT_IS_NODE) {
      var fs = require('fs');
      var nodePath = require('path');
      scriptDirectory = __dirname + '/';
      readBinary = (filename) => {
        filename = isFileURI(filename)
          ? new URL(filename)
          : nodePath.normalize(filename);
        var ret = fs.readFileSync(filename);
        return ret;
      };
      readAsync = (filename, binary = true) => {
        filename = isFileURI(filename)
          ? new URL(filename)
          : nodePath.normalize(filename);
        return new Promise((resolve, reject) => {
          fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(binary ? data.buffer : data);
          });
        });
      };
      if (!Module['thisProgram'] && process.argv.length > 1) {
        thisProgram = process.argv[1].replace(/\\/g, '/');
      }
      arguments_ = process.argv.slice(2);
      quit_ = (status, toThrow) => {
        process.exitCode = status;
        throw toThrow;
      };
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
      } else if (typeof document != 'undefined' && document.currentScript) {
        scriptDirectory = document.currentScript.src;
      }
      if (_scriptName) {
        scriptDirectory = _scriptName;
      }
      if (scriptDirectory.startsWith('blob:')) {
        scriptDirectory = '';
      } else {
        scriptDirectory = scriptDirectory.substr(
          0,
          scriptDirectory.replace(/[?#].*/, '').lastIndexOf('/') + 1
        );
      }
      {
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.responseType = 'arraybuffer';
            xhr.send(null);
            return new Uint8Array(xhr.response);
          };
        }
        readAsync = (url) => {
          if (isFileURI(url)) {
            return new Promise((reject, resolve) => {
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, true);
              xhr.responseType = 'arraybuffer';
              xhr.onload = () => {
                if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
                  resolve(xhr.response);
                }
                reject(xhr.status);
              };
              xhr.onerror = reject;
              xhr.send(null);
            });
          }
          return fetch(url, { credentials: 'same-origin' }).then((response) => {
            if (response.ok) {
              return response.arrayBuffer();
            }
            return Promise.reject(
              new Error(response.status + ' : ' + response.url)
            );
          });
        };
      }
    } else {
    }
    var out = Module['print'] || console.log.bind(console);
    var err = Module['printErr'] || console.error.bind(console);
    Object.assign(Module, moduleOverrides);
    moduleOverrides = null;
    if (Module['arguments']) arguments_ = Module['arguments'];
    if (Module['thisProgram']) thisProgram = Module['thisProgram'];
    if (Module['quit']) quit_ = Module['quit'];
    var wasmBinary;
    if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];
    var wasmMemory;
    var ABORT = false;
    var EXITSTATUS;
    var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
    function updateMemoryViews() {
      var b = wasmMemory.buffer;
      Module['HEAP8'] = HEAP8 = new Int8Array(b);
      Module['HEAP16'] = HEAP16 = new Int16Array(b);
      Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
      Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
      Module['HEAP32'] = HEAP32 = new Int32Array(b);
      Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
      Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
      Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
    }
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;
    function preRun() {
      if (Module['preRun']) {
        if (typeof Module['preRun'] == 'function')
          Module['preRun'] = [Module['preRun']];
        while (Module['preRun'].length) {
          addOnPreRun(Module['preRun'].shift());
        }
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      runtimeInitialized = true;
      if (!Module['noFSInit'] && !FS.init.initialized) FS.init();
      FS.ignorePermissions = false;
      TTY.init();
      callRuntimeCallbacks(__ATINIT__);
    }
    function postRun() {
      if (Module['postRun']) {
        if (typeof Module['postRun'] == 'function')
          Module['postRun'] = [Module['postRun']];
        while (Module['postRun'].length) {
          addOnPostRun(Module['postRun'].shift());
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }
    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null;
    function getUniqueRunDependency(id) {
      return id;
    }
    function addRunDependency(id) {
      runDependencies++;
      Module['monitorRunDependencies']?.(runDependencies);
    }
    function removeRunDependency(id) {
      runDependencies--;
      Module['monitorRunDependencies']?.(runDependencies);
      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
        }
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    function abort(what) {
      Module['onAbort']?.(what);
      what = 'Aborted(' + what + ')';
      err(what);
      ABORT = true;
      EXITSTATUS = 1;
      what += '. Build with -sASSERTIONS for more info.';
      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject(e);
      throw e;
    }
    var dataURIPrefix = 'data:application/octet-stream;base64,';
    var isDataURI = (filename) => filename.startsWith(dataURIPrefix);
    var isFileURI = (filename) => filename.startsWith('file://');
    function findWasmBinary() {
      var f = 'genai_wasm_nosimd_internal.wasm';
      if (!isDataURI(f)) {
        return locateFile(f);
      }
      return f;
    }
    var wasmBinaryFile;
    function getBinarySync(file) {
      if (file == wasmBinaryFile && wasmBinary) {
        return new Uint8Array(wasmBinary);
      }
      if (readBinary) {
        return readBinary(file);
      }
      throw 'both async and sync fetching of the wasm failed';
    }
    function getBinaryPromise(binaryFile) {
      if (!wasmBinary) {
        return readAsync(binaryFile).then(
          (response) => new Uint8Array(response),
          () => getBinarySync(binaryFile)
        );
      }
      return Promise.resolve().then(() => getBinarySync(binaryFile));
    }
    function instantiateArrayBuffer(binaryFile, imports, receiver) {
      return getBinaryPromise(binaryFile)
        .then((binary) => WebAssembly.instantiate(binary, imports))
        .then(receiver, (reason) => {
          err(`failed to asynchronously prepare wasm: ${reason}`);
          abort(reason);
        });
    }
    function instantiateAsync(binary, binaryFile, imports, callback) {
      if (
        !binary &&
        typeof WebAssembly.instantiateStreaming == 'function' &&
        !isDataURI(binaryFile) &&
        !isFileURI(binaryFile) &&
        !ENVIRONMENT_IS_NODE &&
        typeof fetch == 'function'
      ) {
        return fetch(binaryFile, { credentials: 'same-origin' }).then(
          (response) => {
            var result = WebAssembly.instantiateStreaming(response, imports);
            return result.then(callback, function (reason) {
              err(`wasm streaming compile failed: ${reason}`);
              err('falling back to ArrayBuffer instantiation');
              return instantiateArrayBuffer(binaryFile, imports, callback);
            });
          }
        );
      }
      return instantiateArrayBuffer(binaryFile, imports, callback);
    }
    function getWasmImports() {
      return { a: wasmImports };
    }
    function createWasm() {
      var info = getWasmImports();
      function receiveInstance(instance, module) {
        wasmExports = instance.exports;
        wasmExports = Asyncify.instrumentWasmExports(wasmExports);
        wasmMemory = wasmExports['Ac'];
        updateMemoryViews();
        wasmTable = wasmExports['Cc'];
        addOnInit(wasmExports['Bc']);
        removeRunDependency('wasm-instantiate');
        return wasmExports;
      }
      addRunDependency('wasm-instantiate');
      function receiveInstantiationResult(result) {
        receiveInstance(result['instance']);
      }
      if (Module['instantiateWasm']) {
        try {
          return Module['instantiateWasm'](info, receiveInstance);
        } catch (e) {
          err(`Module.instantiateWasm callback failed with error: ${e}`);
          readyPromiseReject(e);
        }
      }
      if (!wasmBinaryFile) wasmBinaryFile = findWasmBinary();
      instantiateAsync(
        wasmBinary,
        wasmBinaryFile,
        info,
        receiveInstantiationResult
      ).catch(readyPromiseReject);
      return {};
    }
    var tempDouble;
    var tempI64;
    var ASM_CONSTS = {
      665760: ($0) => {
        const device = WebGPU.mgrDevice.get($0);
        return (
          device.features.has('chromium-experimental-subgroups') ||
          device.features.has('subgroups')
        );
      },
      665904: () => !!Module['preinitializedWebGPUDevice'],
      665955: () => {
        specialHTMLTargets['#canvas'] = Module.canvas;
      },
      666006: () => typeof wasmOffsetConverter !== 'undefined',
    };
    function JsOnEmptyPacketListener(output_stream_name, timestamp) {
      Module._wrapEmptyPacketListenerOutput(output_stream_name, timestamp);
    }
    function JsOnVectorFinishedListener(output_stream_name, timestamp) {
      Module._wrapSimpleListenerOutput(
        output_stream_name,
        undefined,
        true,
        timestamp
      );
    }
    function JsOnSimpleListenerBool(output_stream_name, out_data, timestamp) {
      Module._wrapSimpleListenerOutput(output_stream_name, out_data, timestamp);
    }
    function JsOnVectorListenerBool(output_stream_name, out_data, timestamp) {
      Module._wrapSimpleListenerOutput(
        output_stream_name,
        out_data,
        false,
        timestamp
      );
    }
    function JsOnSimpleListenerInt(output_stream_name, out_data, timestamp) {
      Module._wrapSimpleListenerOutput(output_stream_name, out_data, timestamp);
    }
    function JsOnVectorListenerInt(output_stream_name, out_data, timestamp) {
      Module._wrapSimpleListenerOutput(
        output_stream_name,
        out_data,
        false,
        timestamp
      );
    }
    function JsOnSimpleListenerUint(output_stream_name, out_data, timestamp) {
      Module._wrapSimpleListenerOutput(output_stream_name, out_data, timestamp);
    }
    function JsOnVectorListenerUint(output_stream_name, out_data, timestamp) {
      Module._wrapSimpleListenerOutput(
        output_stream_name,
        out_data,
        false,
        timestamp
      );
    }
    function JsOnSimpleListenerDouble(output_stream_name, out_data, timestamp) {
      Module._wrapSimpleListenerOutput(output_stream_name, out_data, timestamp);
    }
    function JsOnVectorListenerDouble(output_stream_name, out_data, timestamp) {
      Module._wrapSimpleListenerOutput(
        output_stream_name,
        out_data,
        false,
        timestamp
      );
    }
    function JsOnSimpleListenerFloat(output_stream_name, out_data, timestamp) {
      Module._wrapSimpleListenerOutput(output_stream_name, out_data, timestamp);
    }
    function JsOnVectorListenerFloat(output_stream_name, out_data, timestamp) {
      Module._wrapSimpleListenerOutput(
        output_stream_name,
        out_data,
        false,
        timestamp
      );
    }
    function JsOnSimpleListenerString(output_stream_name, out_data, timestamp) {
      Module._wrapSimpleListenerOutput(
        output_stream_name,
        UTF8ToString(out_data),
        timestamp
      );
    }
    function JsOnVectorListenerString(output_stream_name, out_data, timestamp) {
      Module._wrapSimpleListenerOutput(
        output_stream_name,
        UTF8ToString(out_data),
        false,
        timestamp
      );
    }
    function JsOnVectorListenerProto(
      output_stream_name,
      proto_ptr,
      proto_size,
      make_deep_copy,
      timestamp
    ) {
      const newProtoArray = make_deep_copy
        ? Module.HEAPU8.slice(proto_ptr, proto_ptr + proto_size)
        : new Uint8Array(Module.HEAPU8.buffer, proto_ptr, proto_size);
      Module._wrapSimpleListenerOutput(
        output_stream_name,
        newProtoArray,
        false,
        timestamp
      );
    }
    function JsWrapSimpleListeners() {
      if (!Module._wrapSimpleListenerOutput) {
        Module._wrapSimpleListenerOutput = (outputStreamName, ...args) => {
          if (Module.simpleListeners) {
            const streamName = UTF8ToString(outputStreamName);
            if (Module.simpleListeners[streamName]) {
              Module.simpleListeners[streamName](...args);
            }
          }
        };
      }
      if (!Module._wrapEmptyPacketListenerOutput) {
        Module._wrapEmptyPacketListenerOutput = (
          outputStreamName,
          timestamp
        ) => {
          if (Module.emptyPacketListeners) {
            const streamName = UTF8ToString(outputStreamName);
            if (Module.emptyPacketListeners[streamName]) {
              Module.emptyPacketListeners[streamName](timestamp);
            }
          }
        };
      }
    }
    function JsOnSimpleListenerBinaryArray(
      output_stream_name,
      binary_ptr,
      binary_size,
      make_deep_copy,
      timestamp
    ) {
      const newProtoArray = make_deep_copy
        ? Module.HEAPU8.slice(binary_ptr, binary_ptr + binary_size)
        : new Uint8Array(Module.HEAPU8.buffer, binary_ptr, binary_size);
      Module._wrapSimpleListenerOutput(
        output_stream_name,
        newProtoArray,
        timestamp
      );
    }
    function __asyncjs__CallReadDataFn(fn, offset, size, mode) {
      return Asyncify.handleAsync(
        async () => await Emval.toValue(fn)(offset, size, mode)
      );
    }
    function __asyncjs__mediapipe_map_buffer_jspi(buffer_handle, data) {
      return Asyncify.handleAsync(async () => {
        const buffer = WebGPU.mgrBuffer.get(buffer_handle);
        await buffer.mapAsync(GPUMapMode.READ);
        const mapped = buffer.getMappedRange();
        HEAPU8.set(new Uint8Array(mapped), data);
        buffer.unmap();
      });
    }
    function JsGetDeviceMinSubgroupSize(deviceId) {
      const device = WebGPU.mgrDevice.get(deviceId);
      return device.limits.minSubgroupSize;
    }
    function JsGetDeviceMaxSubgroupSize(deviceId) {
      const device = WebGPU.mgrDevice.get(deviceId);
      return device.limits.maxSubgroupSize;
    }
    function ReadBufferDataJs(wgpu_buffer_id, data_ptr) {
      Asyncify.handleAsync(async () => {
        const gpuReadBuffer = WebGPU['mgrBuffer'].get(wgpu_buffer_id);
        await gpuReadBuffer.mapAsync(GPUMapMode.READ);
        const arrayBuffer = gpuReadBuffer.getMappedRange();
        const u8view = new Uint8Array(arrayBuffer);
        Module.HEAPU8.set(u8view, data_ptr >>> 0);
      });
    }
    function WaitUntilCompletedJs(queue_handle) {
      Asyncify.handleAsync(async () => {
        const gpuQueue = WebGPU.mgrQueue.get(queue_handle);
        await gpuQueue.onSubmittedWorkDone();
      });
    }
    function CreateComputePipelineAsyncJs(
      device_id,
      pipeline_id,
      label,
      layout,
      compute
    ) {
      const desc = {
        label: undefined,
        layout: WebGPU.makePipelineLayout(layout),
        compute: WebGPU.makeProgrammableStageDescriptor(compute),
      };
      if (label) desc['label'] = UTF8ToString(label);
      Module.asyncComputePipelineResolvers =
        Module.asyncComputePipelineResolvers || {};
      Module.asyncComputePipelinePromises =
        Module.asyncComputePipelinePromises || {};
      Module.asyncComputePipelinePromises[pipeline_id] = new Promise(
        (res, rej) => {
          Module.asyncComputePipelineResolvers[pipeline_id] = res;
        }
      );
      const gpuDevice = WebGPU.mgrDevice.get(device_id);
      gpuDevice['createComputePipelineAsync'](desc).then((pipeline) => {
        const finalResult = WebGPU.mgrComputePipeline.create(pipeline);
        Module.asyncComputePipelineResolvers[pipeline_id](finalResult);
      });
    }
    function WaitUntilPipelineCreatedJs(pipeline_id) {
      const retVal = Asyncify.handleAsync(async () => {
        const result = await Module.asyncComputePipelinePromises[pipeline_id];
        return result;
      });
      return retVal;
    }
    function GetAdapterArchitecture() {
      const device = Module['preinitializedWebGPUDevice'];
      const architecture = device.adapterInfo
        ? device.adapterInfo.architecture
        : 'Unknown';
      return stringToNewUTF8(architecture);
    }
    function GetAdapterDescription() {
      const device = Module['preinitializedWebGPUDevice'];
      const description = device.adapterInfo
        ? device.adapterInfo.description
        : 'Unknown';
      return stringToNewUTF8(description);
    }
    function GetAdapterDeviceName() {
      const device = Module['preinitializedWebGPUDevice'];
      const deviceName = device.adapterInfo
        ? device.adapterInfo.device
        : 'Unknown';
      return stringToNewUTF8(deviceName);
    }
    function GetAdapterVendor() {
      const device = Module['preinitializedWebGPUDevice'];
      const vendor = device.adapterInfo ? device.adapterInfo.vendor : 'Unknown';
      return stringToNewUTF8(vendor);
    }
    function JsWrapErrorListener(code, message) {
      if (Module.errorListener) {
        const stringMessage = UTF8ToString(message);
        Module.errorListener(code, stringMessage);
      }
    }
    function UseBottomLeftGpuOrigin() {
      return Module && Module.gpuOriginForWebTexturesIsBottomLeft;
    }
    function custom_emscripten_dbgn(str, len) {
      if (typeof dbg !== 'undefined') {
        dbg(UTF8ToString(str, len));
      } else {
        if (typeof custom_dbg === 'undefined') {
          function custom_dbg(text) {
            console.warn.apply(console, arguments);
          }
        }
        custom_dbg(UTF8ToString(str, len));
      }
    }
    function HaveOffsetConverter() {
      return typeof wasmOffsetConverter !== 'undefined';
    }
    var _emscripten_set_main_loop_timing = (mode, value) => {
      Browser.mainLoop.timingMode = mode;
      Browser.mainLoop.timingValue = value;
      if (!Browser.mainLoop.func) {
        return 1;
      }
      if (!Browser.mainLoop.running) {
        Browser.mainLoop.running = true;
      }
      if (mode == 0) {
        Browser.mainLoop.scheduler =
          function Browser_mainLoop_scheduler_setTimeout() {
            var timeUntilNextTick =
              Math.max(
                0,
                Browser.mainLoop.tickStartTime + value - _emscripten_get_now()
              ) | 0;
            setTimeout(Browser.mainLoop.runner, timeUntilNextTick);
          };
        Browser.mainLoop.method = 'timeout';
      } else if (mode == 1) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      } else if (mode == 2) {
        if (typeof Browser.setImmediate == 'undefined') {
          if (typeof setImmediate == 'undefined') {
            var setImmediates = [];
            var emscriptenMainLoopMessageId = 'setimmediate';
            var Browser_setImmediate_messageHandler = (event) => {
              if (
                event.data === emscriptenMainLoopMessageId ||
                event.data.target === emscriptenMainLoopMessageId
              ) {
                event.stopPropagation();
                setImmediates.shift()();
              }
            };
            addEventListener(
              'message',
              Browser_setImmediate_messageHandler,
              true
            );
            Browser.setImmediate = function Browser_emulated_setImmediate(
              func
            ) {
              setImmediates.push(func);
              if (ENVIRONMENT_IS_WORKER) {
                Module['setImmediates'] ??= [];
                Module['setImmediates'].push(func);
                postMessage({ target: emscriptenMainLoopMessageId });
              } else postMessage(emscriptenMainLoopMessageId, '*');
            };
          } else {
            Browser.setImmediate = setImmediate;
          }
        }
        Browser.mainLoop.scheduler =
          function Browser_mainLoop_scheduler_setImmediate() {
            Browser.setImmediate(Browser.mainLoop.runner);
          };
        Browser.mainLoop.method = 'immediate';
      }
      return 0;
    };
    var _emscripten_get_now;
    _emscripten_get_now = () => performance.now();
    var setMainLoop = (
      browserIterationFunc,
      fps,
      simulateInfiniteLoop,
      arg,
      noSetTiming
    ) => {
      Browser.mainLoop.func = browserIterationFunc;
      Browser.mainLoop.arg = arg;
      var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
      function checkIsRunning() {
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
          return false;
        }
        return true;
      }
      Browser.mainLoop.running = false;
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next =
              remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              next = next + 0.5;
              Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9;
            }
          }
          Browser.mainLoop.updateStatus();
          if (!checkIsRunning()) return;
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
        if (!checkIsRunning()) return;
        Browser.mainLoop.currentFrameNumber =
          (Browser.mainLoop.currentFrameNumber + 1) | 0;
        if (
          Browser.mainLoop.timingMode == 1 &&
          Browser.mainLoop.timingValue > 1 &&
          Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue !=
            0
        ) {
          Browser.mainLoop.scheduler();
          return;
        } else if (Browser.mainLoop.timingMode == 0) {
          Browser.mainLoop.tickStartTime = _emscripten_get_now();
        }
        GL.newRenderingFrameStarted();
        Browser.mainLoop.runIter(browserIterationFunc);
        if (!checkIsRunning()) return;
        if (typeof SDL == 'object') SDL.audio?.queueNewAudioData?.();
        Browser.mainLoop.scheduler();
      };
      if (!noSetTiming) {
        if (fps && fps > 0) {
          _emscripten_set_main_loop_timing(0, 1e3 / fps);
        } else {
          _emscripten_set_main_loop_timing(1, 1);
        }
        Browser.mainLoop.scheduler();
      }
      if (simulateInfiniteLoop) {
        throw 'unwind';
      }
    };
    var handleException = (e) => {
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      quit_(1, e);
    };
    function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
    var runtimeKeepaliveCounter = 0;
    var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
    var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
    var exitJS = (status, implicit) => {
      EXITSTATUS = status;
      _proc_exit(status);
    };
    var _exit = exitJS;
    var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
    var callUserCallback = (func) => {
      if (ABORT) {
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
    var safeSetTimeout = (func, timeout) =>
      setTimeout(() => {
        callUserCallback(func);
      }, timeout);
    var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };
    var preloadPlugins = Module['preloadPlugins'] || [];
    var Browser = {
      mainLoop: {
        running: false,
        scheduler: null,
        method: '',
        currentlyRunningMainloop: 0,
        func: null,
        arg: 0,
        timingMode: 0,
        timingValue: 0,
        currentFrameNumber: 0,
        queue: [],
        pause() {
          Browser.mainLoop.scheduler = null;
          Browser.mainLoop.currentlyRunningMainloop++;
        },
        resume() {
          Browser.mainLoop.currentlyRunningMainloop++;
          var timingMode = Browser.mainLoop.timingMode;
          var timingValue = Browser.mainLoop.timingValue;
          var func = Browser.mainLoop.func;
          Browser.mainLoop.func = null;
          setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
          _emscripten_set_main_loop_timing(timingMode, timingValue);
          Browser.mainLoop.scheduler();
        },
        updateStatus() {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](
                  `{message} ({expected - remaining}/{expected})`
                );
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        },
        runIter(func) {
          if (ABORT) return;
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']();
            if (preRet === false) {
              return;
            }
          }
          callUserCallback(func);
          Module['postMainLoop']?.();
        },
      },
      isFullscreen: false,
      pointerLock: false,
      moduleContextCreatedCallbacks: [],
      workers: [],
      init() {
        if (Browser.initted) return;
        Browser.initted = true;
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(
          byteArray,
          name,
          onload,
          onerror
        ) {
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          if (b.size !== byteArray.length) {
            b = new Blob([new Uint8Array(byteArray).buffer], {
              type: Browser.getMimetype(name),
            });
          }
          var url = URL.createObjectURL(b);
          var img = new Image();
          img.onload = () => {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            preloadedImages[name] = canvas;
            URL.revokeObjectURL(url);
            onload?.(byteArray);
          };
          img.onerror = (event) => {
            err(`Image ${url} could not be decoded`);
            onerror?.();
          };
          img.src = url;
        };
        preloadPlugins.push(imagePlugin);
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return (
            !Module.noAudioDecoding &&
            name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 }
          );
        };
        audioPlugin['handle'] = function audioPlugin_handle(
          byteArray,
          name,
          onload,
          onerror
        ) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            preloadedAudios[name] = audio;
            onload?.(byteArray);
          }
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          var url = URL.createObjectURL(b);
          var audio = new Audio();
          audio.addEventListener('canplaythrough', () => finish(audio), false);
          audio.onerror = function audio_onerror(event) {
            if (done) return;
            err(
              `warning: browser could not fully decode audio ${name}, trying slower base64 approach`
            );
            function encode64(data) {
              var BASE =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
              var PAD = '=';
              var ret = '';
              var leftchar = 0;
              var leftbits = 0;
              for (var i = 0; i < data.length; i++) {
                leftchar = (leftchar << 8) | data[i];
                leftbits += 8;
                while (leftbits >= 6) {
                  var curr = (leftchar >> (leftbits - 6)) & 63;
                  leftbits -= 6;
                  ret += BASE[curr];
                }
              }
              if (leftbits == 2) {
                ret += BASE[(leftchar & 3) << 4];
                ret += PAD + PAD;
              } else if (leftbits == 4) {
                ret += BASE[(leftchar & 15) << 2];
                ret += PAD;
              }
              return ret;
            }
            audio.src =
              'data:audio/x-' +
              name.substr(-3) +
              ';base64,' +
              encode64(byteArray);
            finish(audio);
          };
          audio.src = url;
          safeSetTimeout(() => {
            finish(audio);
          }, 1e4);
        };
        preloadPlugins.push(audioPlugin);
        function pointerLockChange() {
          Browser.pointerLock =
            document['pointerLockElement'] === Module['canvas'] ||
            document['mozPointerLockElement'] === Module['canvas'] ||
            document['webkitPointerLockElement'] === Module['canvas'] ||
            document['msPointerLockElement'] === Module['canvas'];
        }
        var canvas = Module['canvas'];
        if (canvas) {
          canvas.requestPointerLock =
            canvas['requestPointerLock'] ||
            canvas['mozRequestPointerLock'] ||
            canvas['webkitRequestPointerLock'] ||
            canvas['msRequestPointerLock'] ||
            (() => {});
          canvas.exitPointerLock =
            document['exitPointerLock'] ||
            document['mozExitPointerLock'] ||
            document['webkitExitPointerLock'] ||
            document['msExitPointerLock'] ||
            (() => {});
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
          document.addEventListener(
            'pointerlockchange',
            pointerLockChange,
            false
          );
          document.addEventListener(
            'mozpointerlockchange',
            pointerLockChange,
            false
          );
          document.addEventListener(
            'webkitpointerlockchange',
            pointerLockChange,
            false
          );
          document.addEventListener(
            'mspointerlockchange',
            pointerLockChange,
            false
          );
          if (Module['elementPointerLock']) {
            canvas.addEventListener(
              'click',
              (ev) => {
                if (
                  !Browser.pointerLock &&
                  Module['canvas'].requestPointerLock
                ) {
                  Module['canvas'].requestPointerLock();
                  ev.preventDefault();
                }
              },
              false
            );
          }
        }
      },
      createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas)
          return Module.ctx;
        var ctx;
        var contextHandle;
        if (useWebGL) {
          var contextAttributes = {
            antialias: false,
            alpha: false,
            majorVersion: typeof WebGL2RenderingContext != 'undefined' ? 2 : 1,
          };
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
          if (typeof GL != 'undefined') {
            contextHandle = GL.createContext(canvas, contextAttributes);
            if (contextHandle) {
              ctx = GL.getContext(contextHandle).GLctx;
            }
          }
        } else {
          ctx = canvas.getContext('2d');
        }
        if (!ctx) return null;
        if (setInModule) {
          Module.ctx = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach((callback) =>
            callback()
          );
          Browser.init();
        }
        return ctx;
      },
      destroyContext(canvas, useWebGL, setInModule) {},
      fullscreenHandlersInstalled: false,
      lockPointer: undefined,
      resizeCanvas: undefined,
      requestFullscreen(lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer == 'undefined')
          Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas == 'undefined')
          Browser.resizeCanvas = false;
        var canvas = Module['canvas'];
        function fullscreenChange() {
          Browser.isFullscreen = false;
          var canvasContainer = canvas.parentNode;
          if (
            (document['fullscreenElement'] ||
              document['mozFullScreenElement'] ||
              document['msFullscreenElement'] ||
              document['webkitFullscreenElement'] ||
              document['webkitCurrentFullScreenElement']) === canvasContainer
          ) {
            canvas.exitFullscreen = Browser.exitFullscreen;
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullscreen = true;
            if (Browser.resizeCanvas) {
              Browser.setFullscreenCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          } else {
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
            if (Browser.resizeCanvas) {
              Browser.setWindowedCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          }
          Module['onFullScreen']?.(Browser.isFullscreen);
          Module['onFullscreen']?.(Browser.isFullscreen);
        }
        if (!Browser.fullscreenHandlersInstalled) {
          Browser.fullscreenHandlersInstalled = true;
          document.addEventListener(
            'fullscreenchange',
            fullscreenChange,
            false
          );
          document.addEventListener(
            'mozfullscreenchange',
            fullscreenChange,
            false
          );
          document.addEventListener(
            'webkitfullscreenchange',
            fullscreenChange,
            false
          );
          document.addEventListener(
            'MSFullscreenChange',
            fullscreenChange,
            false
          );
        }
        var canvasContainer = document.createElement('div');
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
        canvasContainer.requestFullscreen =
          canvasContainer['requestFullscreen'] ||
          canvasContainer['mozRequestFullScreen'] ||
          canvasContainer['msRequestFullscreen'] ||
          (canvasContainer['webkitRequestFullscreen']
            ? () =>
                canvasContainer['webkitRequestFullscreen'](
                  Element['ALLOW_KEYBOARD_INPUT']
                )
            : null) ||
          (canvasContainer['webkitRequestFullScreen']
            ? () =>
                canvasContainer['webkitRequestFullScreen'](
                  Element['ALLOW_KEYBOARD_INPUT']
                )
            : null);
        canvasContainer.requestFullscreen();
      },
      exitFullscreen() {
        if (!Browser.isFullscreen) {
          return false;
        }
        var CFS =
          document['exitFullscreen'] ||
          document['cancelFullScreen'] ||
          document['mozCancelFullScreen'] ||
          document['msExitFullscreen'] ||
          document['webkitCancelFullScreen'] ||
          (() => {});
        CFS.apply(document, []);
        return true;
      },
      nextRAF: 0,
      fakeRequestAnimationFrame(func) {
        var now = Date.now();
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1e3 / 60;
        } else {
          while (now + 2 >= Browser.nextRAF) {
            Browser.nextRAF += 1e3 / 60;
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
      },
      requestAnimationFrame(func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func);
          return;
        }
        var RAF = Browser.fakeRequestAnimationFrame;
        RAF(func);
      },
      safeSetTimeout(func, timeout) {
        return safeSetTimeout(func, timeout);
      },
      safeRequestAnimationFrame(func) {
        return Browser.requestAnimationFrame(() => {
          callUserCallback(func);
        });
      },
      getMimetype(name) {
        return {
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          png: 'image/png',
          bmp: 'image/bmp',
          ogg: 'audio/ogg',
          wav: 'audio/wav',
          mp3: 'audio/mpeg',
        }[name.substr(name.lastIndexOf('.') + 1)];
      },
      getUserMedia(func) {
        window.getUserMedia ||=
          navigator['getUserMedia'] || navigator['mozGetUserMedia'];
        window.getUserMedia(func);
      },
      getMovementX(event) {
        return (
          event['movementX'] ||
          event['mozMovementX'] ||
          event['webkitMovementX'] ||
          0
        );
      },
      getMovementY(event) {
        return (
          event['movementY'] ||
          event['mozMovementY'] ||
          event['webkitMovementY'] ||
          0
        );
      },
      getMouseWheelDelta(event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll':
            delta = event.detail / 3;
            break;
          case 'mousewheel':
            delta = event.wheelDelta / 120;
            break;
          case 'wheel':
            delta = event.deltaY;
            switch (event.deltaMode) {
              case 0:
                delta /= 100;
                break;
              case 1:
                delta /= 3;
                break;
              case 2:
                delta *= 80;
                break;
              default:
                throw 'unrecognized mouse wheel delta mode: ' + event.deltaMode;
            }
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },
      mouseX: 0,
      mouseY: 0,
      mouseMovementX: 0,
      mouseMovementY: 0,
      touches: {},
      lastTouches: {},
      calculateMouseCoords(pageX, pageY) {
        var rect = Module['canvas'].getBoundingClientRect();
        var cw = Module['canvas'].width;
        var ch = Module['canvas'].height;
        var scrollX =
          typeof window.scrollX != 'undefined'
            ? window.scrollX
            : window.pageXOffset;
        var scrollY =
          typeof window.scrollY != 'undefined'
            ? window.scrollY
            : window.pageYOffset;
        var adjustedX = pageX - (scrollX + rect.left);
        var adjustedY = pageY - (scrollY + rect.top);
        adjustedX = adjustedX * (cw / rect.width);
        adjustedY = adjustedY * (ch / rect.height);
        return { x: adjustedX, y: adjustedY };
      },
      setMouseCoords(pageX, pageY) {
        const { x: x, y: y } = Browser.calculateMouseCoords(pageX, pageY);
        Browser.mouseMovementX = x - Browser.mouseX;
        Browser.mouseMovementY = y - Browser.mouseY;
        Browser.mouseX = x;
        Browser.mouseY = y;
      },
      calculateMouseEvent(event) {
        if (Browser.pointerLock) {
          if (event.type != 'mousemove' && 'mozMovementX' in event) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          Browser.mouseX += Browser.mouseMovementX;
          Browser.mouseY += Browser.mouseMovementY;
        } else {
          if (
            event.type === 'touchstart' ||
            event.type === 'touchend' ||
            event.type === 'touchmove'
          ) {
            var touch = event.touch;
            if (touch === undefined) {
              return;
            }
            var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (
              event.type === 'touchend' ||
              event.type === 'touchmove'
            ) {
              var last = Browser.touches[touch.identifier];
              last ||= coords;
              Browser.lastTouches[touch.identifier] = last;
              Browser.touches[touch.identifier] = coords;
            }
            return;
          }
          Browser.setMouseCoords(event.pageX, event.pageY);
        }
      },
      resizeListeners: [],
      updateResizeListeners() {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach((listener) =>
          listener(canvas.width, canvas.height)
        );
      },
      setCanvasSize(width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },
      windowedWidth: 0,
      windowedHeight: 0,
      setFullscreenCanvasSize() {
        if (typeof SDL != 'undefined') {
          var flags = HEAPU32[SDL.screen >> 2];
          flags = flags | 8388608;
          HEAP32[SDL.screen >> 2] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },
      setWindowedCanvasSize() {
        if (typeof SDL != 'undefined') {
          var flags = HEAPU32[SDL.screen >> 2];
          flags = flags & ~8388608;
          HEAP32[SDL.screen >> 2] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },
      updateCanvasDimensions(canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w / h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (
          (document['fullscreenElement'] ||
            document['mozFullScreenElement'] ||
            document['msFullscreenElement'] ||
            document['webkitFullscreenElement'] ||
            document['webkitCurrentFullScreenElement']) === canvas.parentNode &&
          typeof screen != 'undefined'
        ) {
          var factor = Math.min(screen.width / w, screen.height / h);
          w = Math.round(w * factor);
          h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width != w) canvas.width = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty('width');
            canvas.style.removeProperty('height');
          }
        } else {
          if (canvas.width != wNative) canvas.width = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty('width', w + 'px', 'important');
              canvas.style.setProperty('height', h + 'px', 'important');
            } else {
              canvas.style.removeProperty('width');
              canvas.style.removeProperty('height');
            }
          }
        }
      },
    };
    var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        callbacks.shift()(Module);
      }
    };
    var noExitRuntime = Module['noExitRuntime'] || true;
    var stackRestore = (val) => __emscripten_stack_restore(val);
    var stackSave = () => _emscripten_stack_get_current();
    var PATH = {
      isAbs: (path) => path.charAt(0) === '/',
      splitPath: (filename) => {
        var splitPathRe =
          /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
      normalizeArray: (parts, allowAboveRoot) => {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },
      normalize: (path) => {
        var isAbsolute = PATH.isAbs(path),
          trailingSlash = path.substr(-1) === '/';
        path = PATH.normalizeArray(
          path.split('/').filter((p) => !!p),
          !isAbsolute
        ).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },
      dirname: (path) => {
        var result = PATH.splitPath(path),
          root = result[0],
          dir = result[1];
        if (!root && !dir) {
          return '.';
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
      basename: (path) => {
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, '');
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash + 1);
      },
      join: (...paths) => PATH.normalize(paths.join('/')),
      join2: (l, r) => PATH.normalize(l + '/' + r),
    };
    var initRandomFill = () => {
      if (
        typeof crypto == 'object' &&
        typeof crypto['getRandomValues'] == 'function'
      ) {
        return (view) => crypto.getRandomValues(view);
      } else if (ENVIRONMENT_IS_NODE) {
        try {
          var crypto_module = require('crypto');
          var randomFillSync = crypto_module['randomFillSync'];
          if (randomFillSync) {
            return (view) => crypto_module['randomFillSync'](view);
          }
          var randomBytes = crypto_module['randomBytes'];
          return (view) => (view.set(randomBytes(view.byteLength)), view);
        } catch (e) {}
      }
      abort('initRandomDevice');
    };
    var randomFill = (view) => (randomFill = initRandomFill())(view);
    var PATH_FS = {
      resolve: (...args) => {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? args[i] : FS.cwd();
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return '';
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        resolvedPath = PATH.normalizeArray(
          resolvedPath.split('/').filter((p) => !!p),
          !resolvedAbsolute
        ).join('/');
        return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
      },
      relative: (from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      },
    };
    var UTF8Decoder = new TextDecoder();
    var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
      return UTF8Decoder.decode(
        heapOrArray.buffer
          ? heapOrArray.subarray(idx, endPtr)
          : new Uint8Array(heapOrArray.slice(idx, endPtr))
      );
    };
    var FS_stdin_getChar_buffer = [];
    var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);
        if (c <= 127) {
          len++;
        } else if (c <= 2047) {
          len += 2;
        } else if (c >= 55296 && c <= 57343) {
          len += 4;
          ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
    var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      if (!(maxBytesToWrite > 0)) return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
          var u1 = str.charCodeAt(++i);
          u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
        }
        if (u <= 127) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 192 | (u >> 6);
          heap[outIdx++] = 128 | (u & 63);
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 224 | (u >> 12);
          heap[outIdx++] = 128 | ((u >> 6) & 63);
          heap[outIdx++] = 128 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          heap[outIdx++] = 240 | (u >> 18);
          heap[outIdx++] = 128 | ((u >> 12) & 63);
          heap[outIdx++] = 128 | ((u >> 6) & 63);
          heap[outIdx++] = 128 | (u & 63);
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
    function intArrayFromString(stringy, dontAddNull, length) {
      var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(
        stringy,
        u8array,
        0,
        u8array.length
      );
      if (dontAddNull) u8array.length = numBytesWritten;
      return u8array;
    }
    var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
          var BUFSIZE = 256;
          var buf = Buffer.alloc(BUFSIZE);
          var bytesRead = 0;
          var fd = process.stdin.fd;
          try {
            bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
          } catch (e) {
            if (e.toString().includes('EOF')) bytesRead = 0;
            else throw e;
          }
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString('utf-8');
          }
        } else if (
          typeof window != 'undefined' &&
          typeof window.prompt == 'function'
        ) {
          result = window.prompt('Input: ');
          if (result !== null) {
            result += '\n';
          }
        } else {
        }
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
    var TTY = {
      ttys: [],
      init() {},
      shutdown() {},
      register(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
      stream_ops: {
        open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
        close(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
        fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
        read(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset + i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
        write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        },
      },
      default_tty_ops: {
        get_char(tty) {
          return FS_stdin_getChar();
        },
        put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
        fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
        ioctl_tcgets(tty) {
          return {
            c_iflag: 25856,
            c_oflag: 5,
            c_cflag: 191,
            c_lflag: 35387,
            c_cc: [
              3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
          };
        },
        ioctl_tcsets(tty, optional_actions, data) {
          return 0;
        },
        ioctl_tiocgwinsz(tty) {
          return [24, 80];
        },
      },
      default_tty1_ops: {
        put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
        fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
      },
    };
    var zeroMemory = (address, size) => {
      HEAPU8.fill(0, address, address + size);
      return address;
    };
    var alignMemory = (size, alignment) =>
      Math.ceil(size / alignment) * alignment;
    var mmapAlloc = (size) => {
      size = alignMemory(size, 65536);
      var ptr = _emscripten_builtin_memalign(65536, size);
      if (!ptr) return 0;
      return zeroMemory(ptr, size);
    };
    var MEMFS = {
      ops_table: null,
      mount(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511, 0);
      },
      createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          throw new FS.ErrnoError(63);
        }
        MEMFS.ops_table ||= {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink,
            },
            stream: { llseek: MEMFS.stream_ops.llseek },
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync,
            },
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink,
            },
            stream: {},
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
            },
            stream: FS.chrdev_stream_ops,
          },
        };
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0;
          node.contents = null;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },
      getFileDataAsTypedArray(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray)
          return node.contents.subarray(0, node.usedBytes);
        return new Uint8Array(node.contents);
      },
      expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return;
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(
          newCapacity,
          (prevCapacity *
            (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>>
            0
        );
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity);
        if (node.usedBytes > 0)
          node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
      },
      resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null;
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize);
          if (oldContents) {
            node.contents.set(
              oldContents.subarray(0, Math.min(newSize, node.usedBytes))
            );
          }
          node.usedBytes = newSize;
        }
      },
      node_ops: {
        getattr(node) {
          var attr = {};
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
        setattr(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
        lookup(parent, name) {
          throw FS.genericErrors[44];
        },
        mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
        rename(old_node, new_dir, new_name) {
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {}
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now();
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
        },
        unlink(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
        rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
        readdir(node) {
          var entries = ['.', '..'];
          for (var key of Object.keys(node.contents)) {
            entries.push(key);
          }
          return entries;
        },
        symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
          node.link = oldpath;
          return node;
        },
        readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        },
      },
      stream_ops: {
        read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          if (size > 8 && contents.subarray) {
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++)
              buffer[offset + i] = contents[position + i];
          }
          return size;
        },
        write(stream, buffer, offset, length, position, canOwn) {
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
          if (buffer.subarray && (!node.contents || node.contents.subarray)) {
            if (canOwn) {
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) {
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) {
              node.contents.set(
                buffer.subarray(offset, offset + length),
                position
              );
              return length;
            }
          }
          MEMFS.expandFileStorage(node, position + length);
          if (node.contents.subarray && buffer.subarray) {
            node.contents.set(
              buffer.subarray(offset, offset + length),
              position
            );
          } else {
            for (var i = 0; i < length; i++) {
              node.contents[position + i] = buffer[offset + i];
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
        llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
        allocate(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(
            stream.node.usedBytes,
            offset + length
          );
        },
        mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(
                  contents,
                  position,
                  position + length
                );
              }
            }
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        },
        msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          return 0;
        },
      },
    };
    var asyncLoad = (url, onload, onerror, noRunDep) => {
      var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : '';
      readAsync(url).then(
        (arrayBuffer) => {
          onload(new Uint8Array(arrayBuffer));
          if (dep) removeRunDependency(dep);
        },
        (err) => {
          if (onerror) {
            onerror();
          } else {
            throw `Loading data file "${url}" failed.`;
          }
        }
      );
      if (dep) addRunDependency(dep);
    };
    var FS_createDataFile = (
      parent,
      name,
      fileData,
      canRead,
      canWrite,
      canOwn
    ) => {
      FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
    };
    var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
      if (typeof Browser != 'undefined') Browser.init();
      var handled = false;
      preloadPlugins.forEach((plugin) => {
        if (handled) return;
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    };
    var FS_createPreloadedFile = (
      parent,
      name,
      url,
      canRead,
      canWrite,
      onload,
      onerror,
      dontCreateFile,
      canOwn,
      preFinish
    ) => {
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`);
      function processData(byteArray) {
        function finish(byteArray) {
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(
              parent,
              name,
              byteArray,
              canRead,
              canWrite,
              canOwn
            );
          }
          onload?.();
          removeRunDependency(dep);
        }
        if (
          FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
            onerror?.();
            removeRunDependency(dep);
          })
        ) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == 'string') {
        asyncLoad(url, processData, onerror);
      } else {
        processData(url);
      }
    };
    var FS_modeStringToFlags = (str) => {
      var flagModes = {
        r: 0,
        'r+': 2,
        w: 512 | 64 | 1,
        'w+': 512 | 64 | 2,
        a: 1024 | 64 | 1,
        'a+': 1024 | 64 | 2,
      };
      var flags = flagModes[str];
      if (typeof flags == 'undefined') {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
    var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    };
    var FS = {
      root: null,
      mounts: [],
      devices: {},
      streams: [],
      nextInode: 1,
      nameTable: null,
      currentPath: '/',
      initialized: false,
      ignorePermissions: true,
      ErrnoError: class {
        constructor(errno) {
          this.name = 'ErrnoError';
          this.errno = errno;
        }
      },
      genericErrors: {},
      filesystems: null,
      syncFSRequests: 0,
      FSStream: class {
        constructor() {
          this.shared = {};
        }
        get object() {
          return this.node;
        }
        set object(val) {
          this.node = val;
        }
        get isRead() {
          return (this.flags & 2097155) !== 1;
        }
        get isWrite() {
          return (this.flags & 2097155) !== 0;
        }
        get isAppend() {
          return this.flags & 1024;
        }
        get flags() {
          return this.shared.flags;
        }
        set flags(val) {
          this.shared.flags = val;
        }
        get position() {
          return this.shared.position;
        }
        set position(val) {
          this.shared.position = val;
        }
      },
      FSNode: class {
        constructor(parent, name, mode, rdev) {
          if (!parent) {
            parent = this;
          }
          this.parent = parent;
          this.mount = parent.mount;
          this.mounted = null;
          this.id = FS.nextInode++;
          this.name = name;
          this.mode = mode;
          this.node_ops = {};
          this.stream_ops = {};
          this.rdev = rdev;
          this.readMode = 292 | 73;
          this.writeMode = 146;
        }
        get read() {
          return (this.mode & this.readMode) === this.readMode;
        }
        set read(val) {
          val ? (this.mode |= this.readMode) : (this.mode &= ~this.readMode);
        }
        get write() {
          return (this.mode & this.writeMode) === this.writeMode;
        }
        set write(val) {
          val ? (this.mode |= this.writeMode) : (this.mode &= ~this.writeMode);
        }
        get isFolder() {
          return FS.isDir(this.mode);
        }
        get isDevice() {
          return FS.isChrdev(this.mode);
        }
      },
      lookupPath(path, opts = {}) {
        path = PATH_FS.resolve(path);
        if (!path) return { path: '', node: null };
        var defaults = { follow_mount: true, recurse_count: 0 };
        opts = Object.assign(defaults, opts);
        if (opts.recurse_count > 8) {
          throw new FS.ErrnoError(32);
        }
        var parts = path.split('/').filter((p) => !!p);
        var current = FS.root;
        var current_path = '/';
        for (var i = 0; i < parts.length; i++) {
          var islast = i === parts.length - 1;
          if (islast && opts.parent) {
            break;
          }
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
              var lookup = FS.lookupPath(current_path, {
                recurse_count: opts.recurse_count + 1,
              });
              current = lookup.node;
              if (count++ > 40) {
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
        return { path: current_path, node: current };
      },
      getPath(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length - 1] !== '/'
              ? `${mount}/${path}`
              : mount + path;
          }
          path = path ? `${node.name}/${path}` : node.name;
          node = node.parent;
        }
      },
      hashName(parentid, name) {
        var hash = 0;
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },
      hashAddNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
      hashRemoveNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
      lookupNode(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        return FS.lookup(parent, name);
      },
      createNode(parent, name, mode, rdev) {
        var node = new FS.FSNode(parent, name, mode, rdev);
        FS.hashAddNode(node);
        return node;
      },
      destroyNode(node) {
        FS.hashRemoveNode(node);
      },
      isRoot(node) {
        return node === node.parent;
      },
      isMountpoint(node) {
        return !!node.mounted;
      },
      isFile(mode) {
        return (mode & 61440) === 32768;
      },
      isDir(mode) {
        return (mode & 61440) === 16384;
      },
      isLink(mode) {
        return (mode & 61440) === 40960;
      },
      isChrdev(mode) {
        return (mode & 61440) === 8192;
      },
      isBlkdev(mode) {
        return (mode & 61440) === 24576;
      },
      isFIFO(mode) {
        return (mode & 61440) === 4096;
      },
      isSocket(mode) {
        return (mode & 49152) === 49152;
      },
      flagsToPermissionString(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if (flag & 512) {
          perms += 'w';
        }
        return perms;
      },
      nodePermissions(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
      mayLookup(dir) {
        if (!FS.isDir(dir.mode)) return 54;
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
      mayCreate(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {}
        return FS.nodePermissions(dir, 'wx');
      },
      mayDelete(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
      mayOpen(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || flags & 512) {
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
      MAX_OPEN_FDS: 4096,
      nextfd() {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
      getStreamChecked(fd) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        return stream;
      },
      getStream: (fd) => FS.streams[fd],
      createStream(stream, fd = -1) {
        stream = Object.assign(new FS.FSStream(), stream);
        if (fd == -1) {
          fd = FS.nextfd();
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
      closeStream(fd) {
        FS.streams[fd] = null;
      },
      dupStream(origStream, fd = -1) {
        var stream = FS.createStream(origStream, fd);
        stream.stream_ops?.dup?.(stream);
        return stream;
      },
      chrdev_stream_ops: {
        open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          stream.stream_ops = device.stream_ops;
          stream.stream_ops.open?.(stream);
        },
        llseek() {
          throw new FS.ErrnoError(70);
        },
      },
      major: (dev) => dev >> 8,
      minor: (dev) => dev & 255,
      makedev: (ma, mi) => (ma << 8) | mi,
      registerDevice(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },
      getDevice: (dev) => FS.devices[dev],
      getMounts(mount) {
        var mounts = [];
        var check = [mount];
        while (check.length) {
          var m = check.pop();
          mounts.push(m);
          check.push(...m.mounts);
        }
        return mounts;
      },
      syncfs(populate, callback) {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
        FS.syncFSRequests++;
        if (FS.syncFSRequests > 1) {
          err(
            `warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`
          );
        }
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
        function doCallback(errCode) {
          FS.syncFSRequests--;
          return callback(errCode);
        }
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        }
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
      mount(type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
          mountpoint = lookup.path;
          node = lookup.node;
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: [],
        };
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          node.mounted = mount;
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
        return mountRoot;
      },
      unmount(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
          while (current) {
            var next = current.name_next;
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
            current = next;
          }
        });
        node.mounted = null;
        var idx = node.mount.mounts.indexOf(mount);
        node.mount.mounts.splice(idx, 1);
      },
      lookup(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
      mknod(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
      create(path, mode) {
        mode = mode !== undefined ? mode : 438;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
      mkdir(path, mode) {
        mode = mode !== undefined ? mode : 511;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
      mkdirTree(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch (e) {
            if (e.errno != 20) throw e;
          }
        }
      },
      mkdev(path, mode, dev) {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 438;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
      symlink(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
      rename(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        var lookup, old_dir, new_dir;
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        var old_node = FS.lookupNode(old_dir, old_name);
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {}
        if (old_node === new_node) {
          return;
        }
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        errCode = new_node
          ? FS.mayDelete(new_dir, new_name, isdir)
          : FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (
          FS.isMountpoint(old_node) ||
          (new_node && FS.isMountpoint(new_node))
        ) {
          throw new FS.ErrnoError(10);
        }
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        FS.hashRemoveNode(old_node);
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
          old_node.parent = new_dir;
        } catch (e) {
          throw e;
        } finally {
          FS.hashAddNode(old_node);
        }
      },
      rmdir(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
      readdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
      unlink(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
      readlink(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(
          FS.getPath(link.parent),
          link.node_ops.readlink(link)
        );
      },
      stat(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
      lstat(path) {
        return FS.stat(path, true);
      },
      chmod(path, mode, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now(),
        });
      },
      lchmod(path, mode) {
        FS.chmod(path, mode, true);
      },
      fchmod(fd, mode) {
        var stream = FS.getStreamChecked(fd);
        FS.chmod(stream.node, mode);
      },
      chown(path, uid, gid, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, { timestamp: Date.now() });
      },
      lchown(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
      fchown(fd, uid, gid) {
        var stream = FS.getStreamChecked(fd);
        FS.chown(stream.node, uid, gid);
      },
      truncate(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, { size: len, timestamp: Date.now() });
      },
      ftruncate(fd, len) {
        var stream = FS.getStreamChecked(fd);
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
      utime(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) });
      },
      open(path, flags, mode) {
        if (path === '') {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS_modeStringToFlags(flags) : flags;
        if (flags & 64) {
          mode = typeof mode == 'undefined' ? 438 : mode;
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, { follow: !(flags & 131072) });
            node = lookup.node;
          } catch (e) {}
        }
        var created = false;
        if (flags & 64) {
          if (node) {
            if (flags & 128) {
              throw new FS.ErrnoError(20);
            }
          } else {
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        if (flags & 65536 && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        if (flags & 512 && !created) {
          FS.truncate(node, 0);
        }
        flags &= ~(128 | 512 | 131072);
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          ungotten: [],
          error: false,
        });
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
      close(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null;
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
      isClosed(stream) {
        return stream.fd === null;
      },
      llseek(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
      read(stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(
          stream,
          buffer,
          offset,
          length,
          position
        );
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
      write(stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(
          stream,
          buffer,
          offset,
          length,
          position,
          canOwn
        );
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
      allocate(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },
      mmap(stream, length, position, prot, flags) {
        if (
          (prot & 2) !== 0 &&
          (flags & 2) === 0 &&
          (stream.flags & 2097155) !== 2
        ) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
      msync(stream, buffer, offset, length, mmapFlags) {
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(
          stream,
          buffer,
          offset,
          length,
          mmapFlags
        );
      },
      ioctl(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
      readFile(path, opts = {}) {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error(`Invalid encoding type "${opts.encoding}"`);
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
      writeFile(path, data, opts = {}) {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },
      cwd: () => FS.currentPath,
      chdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
      createDefaultDirectories() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },
      createDefaultDevices() {
        FS.mkdir('/dev');
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        var randomBuffer = new Uint8Array(1024),
          randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomLeft = randomFill(randomBuffer).byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },
      createSpecialDirectories() {
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount(
          {
            mount() {
              var node = FS.createNode(proc_self, 'fd', 16384 | 511, 73);
              node.node_ops = {
                lookup(parent, name) {
                  var fd = +name;
                  var stream = FS.getStreamChecked(fd);
                  var ret = {
                    parent: null,
                    mount: { mountpoint: 'fake' },
                    node_ops: { readlink: () => stream.path },
                  };
                  ret.parent = ret;
                  return ret;
                },
              };
              return node;
            },
          },
          {},
          '/proc/self/fd'
        );
      },
      createStandardStreams() {
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
      },
      staticInit() {
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
        FS.nameTable = new Array(4096);
        FS.mount(MEMFS, {}, '/');
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
        FS.filesystems = { MEMFS: MEMFS };
      },
      init(input, output, error) {
        FS.init.initialized = true;
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
        FS.createStandardStreams();
      },
      quit() {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
      findObject(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
      analyzePath(path, dontResolveLastLink) {
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {}
        var ret = {
          isRoot: false,
          exists: false,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: false,
          parentPath: null,
          parentObject: null,
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        }
        return ret;
      },
      createPath(parent, path, canRead, canWrite) {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {}
          parent = current;
        }
        return current;
      },
      createFile(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(
          typeof parent == 'string' ? parent : FS.getPath(parent),
          name
        );
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
      createDataFile(parent, name, data, canRead, canWrite, canOwn) {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i)
              arr[i] = data.charCodeAt(i);
            data = arr;
          }
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
      },
      createDevice(parent, name, input, output) {
        var path = PATH.join2(
          typeof parent == 'string' ? parent : FS.getPath(parent),
          name
        );
        var mode = FS_getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        FS.registerDevice(dev, {
          open(stream) {
            stream.seekable = false;
          },
          close(stream) {
            if (output?.buffer?.length) {
              output(10);
            }
          },
          read(stream, buffer, offset, length, pos) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset + i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset + i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          },
        });
        return FS.mkdev(path, mode, dev);
      },
      forceLoadFile(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
          return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error(
            'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.'
          );
        } else {
          try {
            obj.contents = readBinary(obj.url);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
      },
      createLazyFile(parent, name, url, canRead, canWrite) {
        class LazyUint8Array {
          constructor() {
            this.lengthKnown = false;
            this.chunks = [];
          }
          get(idx) {
            if (idx > this.length - 1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = (idx / this.chunkSize) | 0;
            return this.getter(chunkNum)[chunkOffset];
          }
          setDataGetter(getter) {
            this.getter = getter;
          }
          cacheLength() {
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, false);
            xhr.send(null);
            if (
              !((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304)
            )
              throw new Error(
                "Couldn't load " + url + '. Status: ' + xhr.status
              );
            var datalength = Number(xhr.getResponseHeader('Content-length'));
            var header;
            var hasByteServing =
              (header = xhr.getResponseHeader('Accept-Ranges')) &&
              header === 'bytes';
            var usesGzip =
              (header = xhr.getResponseHeader('Content-Encoding')) &&
              header === 'gzip';
            var chunkSize = 1024 * 1024;
            if (!hasByteServing) chunkSize = datalength;
            var doXHR = (from, to) => {
              if (from > to)
                throw new Error(
                  'invalid range (' +
                    from +
                    ', ' +
                    to +
                    ') or no bytes requested!'
                );
              if (to > datalength - 1)
                throw new Error(
                  'only ' + datalength + ' bytes available! programmer error!'
                );
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, false);
              if (datalength !== chunkSize)
                xhr.setRequestHeader('Range', 'bytes=' + from + '-' + to);
              xhr.responseType = 'arraybuffer';
              if (xhr.overrideMimeType) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
              }
              xhr.send(null);
              if (
                !((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304)
              )
                throw new Error(
                  "Couldn't load " + url + '. Status: ' + xhr.status
                );
              if (xhr.response !== undefined) {
                return new Uint8Array(xhr.response || []);
              }
              return intArrayFromString(xhr.responseText || '', true);
            };
            var lazyArray = this;
            lazyArray.setDataGetter((chunkNum) => {
              var start = chunkNum * chunkSize;
              var end = (chunkNum + 1) * chunkSize - 1;
              end = Math.min(end, datalength - 1);
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
              }
              if (typeof lazyArray.chunks[chunkNum] == 'undefined')
                throw new Error('doXHR failed!');
              return lazyArray.chunks[chunkNum];
            });
            if (usesGzip || !datalength) {
              chunkSize = datalength = 1;
              datalength = this.getter(0).length;
              chunkSize = datalength;
              out(
                'LazyFiles on gzip forces download of the whole file when length is accessed'
              );
            }
            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
          }
          get length() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._length;
          }
          get chunkSize() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._chunkSize;
          }
        }
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER)
            throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        Object.defineProperties(node, {
          usedBytes: {
            get: function () {
              return this.contents.length;
            },
          },
        });
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = (...args) => {
            FS.forceLoadFile(node);
            return fn(...args);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length) return 0;
          var size = Math.min(contents.length - position, length);
          if (contents.slice) {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position);
        };
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr: ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },
    };
    var UTF8ToString = (ptr, maxBytesToRead) => {
      if (!ptr) return '';
      var maxPtr = ptr + maxBytesToRead;
      for (var end = ptr; !(end >= maxPtr) && HEAPU8[end]; ) ++end;
      return UTF8Decoder.decode(HEAPU8.subarray(ptr, end));
    };
    var SYSCALLS = {
      DEFAULT_POLLMASK: 5,
      calculateAt(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },
      doStat(func, path, buf) {
        var stat = func(path);
        HEAP32[buf >> 2] = stat.dev;
        HEAP32[(buf + 4) >> 2] = stat.mode;
        HEAPU32[(buf + 8) >> 2] = stat.nlink;
        HEAP32[(buf + 12) >> 2] = stat.uid;
        HEAP32[(buf + 16) >> 2] = stat.gid;
        HEAP32[(buf + 20) >> 2] = stat.rdev;
        (tempI64 = [
          stat.size >>> 0,
          ((tempDouble = stat.size),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? +Math.floor(tempDouble / 4294967296) >>> 0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(buf + 24) >> 2] = tempI64[0]),
          (HEAP32[(buf + 28) >> 2] = tempI64[1]);
        HEAP32[(buf + 32) >> 2] = 4096;
        HEAP32[(buf + 36) >> 2] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        (tempI64 = [
          Math.floor(atime / 1e3) >>> 0,
          ((tempDouble = Math.floor(atime / 1e3)),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? +Math.floor(tempDouble / 4294967296) >>> 0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(buf + 40) >> 2] = tempI64[0]),
          (HEAP32[(buf + 44) >> 2] = tempI64[1]);
        HEAPU32[(buf + 48) >> 2] = (atime % 1e3) * 1e3;
        (tempI64 = [
          Math.floor(mtime / 1e3) >>> 0,
          ((tempDouble = Math.floor(mtime / 1e3)),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? +Math.floor(tempDouble / 4294967296) >>> 0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(buf + 56) >> 2] = tempI64[0]),
          (HEAP32[(buf + 60) >> 2] = tempI64[1]);
        HEAPU32[(buf + 64) >> 2] = (mtime % 1e3) * 1e3;
        (tempI64 = [
          Math.floor(ctime / 1e3) >>> 0,
          ((tempDouble = Math.floor(ctime / 1e3)),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? +Math.floor(tempDouble / 4294967296) >>> 0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(buf + 72) >> 2] = tempI64[0]),
          (HEAP32[(buf + 76) >> 2] = tempI64[1]);
        HEAPU32[(buf + 80) >> 2] = (ctime % 1e3) * 1e3;
        (tempI64 = [
          stat.ino >>> 0,
          ((tempDouble = stat.ino),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? +Math.floor(tempDouble / 4294967296) >>> 0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0),
        ]),
          (HEAP32[(buf + 88) >> 2] = tempI64[0]),
          (HEAP32[(buf + 92) >> 2] = tempI64[1]);
        return 0;
      },
      doMsync(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
      getStreamFromFD(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream;
      },
      varargs: undefined,
      getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
    };
    function ___syscall_dup(fd) {
      try {
        var old = SYSCALLS.getStreamFromFD(fd);
        return FS.dupStream(old).fd;
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return -e.errno;
      }
    }
    function ___syscall_faccessat(dirfd, path, amode, flags) {
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        if (amode & ~7) {
          return -28;
        }
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node) {
          return -44;
        }
        var perms = '';
        if (amode & 4) perms += 'r';
        if (amode & 2) perms += 'w';
        if (amode & 1) perms += 'x';
        if (perms && FS.nodePermissions(node, perms)) {
          return -2;
        }
        return 0;
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return -e.errno;
      }
    }
    function syscallGetVarargI() {
      var ret = HEAP32[+SYSCALLS.varargs >> 2];
      SYSCALLS.varargs += 4;
      return ret;
    }
    var syscallGetVarargP = syscallGetVarargI;
    function ___syscall_fcntl64(fd, cmd, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (cmd) {
          case 0: {
            var arg = syscallGetVarargI();
            if (arg < 0) {
              return -28;
            }
            while (FS.streams[arg]) {
              arg++;
            }
            var newStream;
            newStream = FS.dupStream(stream, arg);
            return newStream.fd;
          }
          case 1:
          case 2:
            return 0;
          case 3:
            return stream.flags;
          case 4: {
            var arg = syscallGetVarargI();
            stream.flags |= arg;
            return 0;
          }
          case 12: {
            var arg = syscallGetVarargP();
            var offset = 0;
            HEAP16[(arg + offset) >> 1] = 2;
            return 0;
          }
          case 13:
          case 14:
            return 0;
        }
        return -28;
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return -e.errno;
      }
    }
    function ___syscall_fstat64(fd, buf) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        return SYSCALLS.doStat(FS.stat, stream.path, buf);
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return -e.errno;
      }
    }
    function ___syscall_ioctl(fd, op, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (op) {
          case 21509: {
            if (!stream.tty) return -59;
            return 0;
          }
          case 21505: {
            if (!stream.tty) return -59;
            if (stream.tty.ops.ioctl_tcgets) {
              var termios = stream.tty.ops.ioctl_tcgets(stream);
              var argp = syscallGetVarargP();
              HEAP32[argp >> 2] = termios.c_iflag || 0;
              HEAP32[(argp + 4) >> 2] = termios.c_oflag || 0;
              HEAP32[(argp + 8) >> 2] = termios.c_cflag || 0;
              HEAP32[(argp + 12) >> 2] = termios.c_lflag || 0;
              for (var i = 0; i < 32; i++) {
                HEAP8[argp + i + 17] = termios.c_cc[i] || 0;
              }
              return 0;
            }
            return 0;
          }
          case 21510:
          case 21511:
          case 21512: {
            if (!stream.tty) return -59;
            return 0;
          }
          case 21506:
          case 21507:
          case 21508: {
            if (!stream.tty) return -59;
            if (stream.tty.ops.ioctl_tcsets) {
              var argp = syscallGetVarargP();
              var c_iflag = HEAP32[argp >> 2];
              var c_oflag = HEAP32[(argp + 4) >> 2];
              var c_cflag = HEAP32[(argp + 8) >> 2];
              var c_lflag = HEAP32[(argp + 12) >> 2];
              var c_cc = [];
              for (var i = 0; i < 32; i++) {
                c_cc.push(HEAP8[argp + i + 17]);
              }
              return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
                c_iflag: c_iflag,
                c_oflag: c_oflag,
                c_cflag: c_cflag,
                c_lflag: c_lflag,
                c_cc: c_cc,
              });
            }
            return 0;
          }
          case 21519: {
            if (!stream.tty) return -59;
            var argp = syscallGetVarargP();
            HEAP32[argp >> 2] = 0;
            return 0;
          }
          case 21520: {
            if (!stream.tty) return -59;
            return -28;
          }
          case 21531: {
            var argp = syscallGetVarargP();
            return FS.ioctl(stream, op, argp);
          }
          case 21523: {
            if (!stream.tty) return -59;
            if (stream.tty.ops.ioctl_tiocgwinsz) {
              var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
              var argp = syscallGetVarargP();
              HEAP16[argp >> 1] = winsize[0];
              HEAP16[(argp + 2) >> 1] = winsize[1];
            }
            return 0;
          }
          case 21524: {
            if (!stream.tty) return -59;
            return 0;
          }
          case 21515: {
            if (!stream.tty) return -59;
            return 0;
          }
          default:
            return -28;
        }
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return -e.errno;
      }
    }
    function ___syscall_newfstatat(dirfd, path, buf, flags) {
      try {
        path = SYSCALLS.getStr(path);
        var nofollow = flags & 256;
        var allowEmpty = flags & 4096;
        flags = flags & ~6400;
        path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
        return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return -e.errno;
      }
    }
    function ___syscall_openat(dirfd, path, flags, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        var mode = varargs ? syscallGetVarargI() : 0;
        return FS.open(path, flags, mode).fd;
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return -e.errno;
      }
    }
    function ___syscall_stat64(path, buf) {
      try {
        path = SYSCALLS.getStr(path);
        return SYSCALLS.doStat(FS.stat, path, buf);
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return -e.errno;
      }
    }
    var __abort_js = () => {
      abort('');
    };
    var __embind_register_bigint = (
      primitiveType,
      name,
      size,
      minRange,
      maxRange
    ) => {};
    var embind_init_charCodes = () => {
      var codes = new Array(256);
      for (var i = 0; i < 256; ++i) {
        codes[i] = String.fromCharCode(i);
      }
      embind_charCodes = codes;
    };
    var embind_charCodes;
    var readLatin1String = (ptr) => {
      var ret = '';
      var c = ptr;
      while (HEAPU8[c]) {
        ret += embind_charCodes[HEAPU8[c++]];
      }
      return ret;
    };
    var awaitingDependencies = {};
    var registeredTypes = {};
    var typeDependencies = {};
    var BindingError;
    var throwBindingError = (message) => {
      throw new BindingError(message);
    };
    var InternalError;
    var throwInternalError = (message) => {
      throw new InternalError(message);
    };
    var whenDependentTypesAreResolved = (
      myTypes,
      dependentTypes,
      getTypeConverters
    ) => {
      myTypes.forEach(function (type) {
        typeDependencies[type] = dependentTypes;
      });
      function onComplete(typeConverters) {
        var myTypeConverters = getTypeConverters(typeConverters);
        if (myTypeConverters.length !== myTypes.length) {
          throwInternalError('Mismatched type converter count');
        }
        for (var i = 0; i < myTypes.length; ++i) {
          registerType(myTypes[i], myTypeConverters[i]);
        }
      }
      var typeConverters = new Array(dependentTypes.length);
      var unregisteredTypes = [];
      var registered = 0;
      dependentTypes.forEach((dt, i) => {
        if (registeredTypes.hasOwnProperty(dt)) {
          typeConverters[i] = registeredTypes[dt];
        } else {
          unregisteredTypes.push(dt);
          if (!awaitingDependencies.hasOwnProperty(dt)) {
            awaitingDependencies[dt] = [];
          }
          awaitingDependencies[dt].push(() => {
            typeConverters[i] = registeredTypes[dt];
            ++registered;
            if (registered === unregisteredTypes.length) {
              onComplete(typeConverters);
            }
          });
        }
      });
      if (0 === unregisteredTypes.length) {
        onComplete(typeConverters);
      }
    };
    function sharedRegisterType(rawType, registeredInstance, options = {}) {
      var name = registeredInstance.name;
      if (!rawType) {
        throwBindingError(
          `type "${name}" must have a positive integer typeid pointer`
        );
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
          return;
        } else {
          throwBindingError(`Cannot register type '${name}' twice`);
        }
      }
      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];
      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach((cb) => cb());
      }
    }
    function registerType(rawType, registeredInstance, options = {}) {
      if (!('argPackAdvance' in registeredInstance)) {
        throw new TypeError(
          'registerType registeredInstance requires argPackAdvance'
        );
      }
      return sharedRegisterType(rawType, registeredInstance, options);
    }
    var GenericWireTypeSize = 8;
    var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        fromWireType: function (wt) {
          return !!wt;
        },
        toWireType: function (destructors, o) {
          return o ? trueValue : falseValue;
        },
        argPackAdvance: GenericWireTypeSize,
        readValueFromPointer: function (pointer) {
          return this['fromWireType'](HEAPU8[pointer]);
        },
        destructorFunction: null,
      });
    };
    var emval_freelist = [];
    var emval_handles = [];
    var __emval_decref = (handle) => {
      if (handle > 9 && 0 === --emval_handles[handle + 1]) {
        emval_handles[handle] = undefined;
        emval_freelist.push(handle);
      }
    };
    var count_emval_handles = () =>
      emval_handles.length / 2 - 5 - emval_freelist.length;
    var init_emval = () => {
      emval_handles.push(0, 1, undefined, 1, null, 1, true, 1, false, 1);
      Module['count_emval_handles'] = count_emval_handles;
    };
    var Emval = {
      toValue: (handle) => {
        if (!handle) {
          throwBindingError('Cannot use deleted val. handle = ' + handle);
        }
        return emval_handles[handle];
      },
      toHandle: (value) => {
        switch (value) {
          case undefined:
            return 2;
          case null:
            return 4;
          case true:
            return 6;
          case false:
            return 8;
          default: {
            const handle = emval_freelist.pop() || emval_handles.length;
            emval_handles[handle] = value;
            emval_handles[handle + 1] = 1;
            return handle;
          }
        }
      },
    };
    function readPointer(pointer) {
      return this['fromWireType'](HEAPU32[pointer >> 2]);
    }
    var EmValType = {
      name: 'emscripten::val',
      fromWireType: (handle) => {
        var rv = Emval.toValue(handle);
        __emval_decref(handle);
        return rv;
      },
      toWireType: (destructors, value) => Emval.toHandle(value),
      argPackAdvance: GenericWireTypeSize,
      readValueFromPointer: readPointer,
      destructorFunction: null,
    };
    var __embind_register_emval = (rawType) => registerType(rawType, EmValType);
    var floatReadValueFromPointer = (name, width) => {
      switch (width) {
        case 4:
          return function (pointer) {
            return this['fromWireType'](HEAPF32[pointer >> 2]);
          };
        case 8:
          return function (pointer) {
            return this['fromWireType'](HEAPF64[pointer >> 3]);
          };
        default:
          throw new TypeError(`invalid float width (${width}): ${name}`);
      }
    };
    var __embind_register_float = (rawType, name, size) => {
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        fromWireType: (value) => value,
        toWireType: (destructors, value) => value,
        argPackAdvance: GenericWireTypeSize,
        readValueFromPointer: floatReadValueFromPointer(name, size),
        destructorFunction: null,
      });
    };
    var createNamedFunction = (name, body) =>
      Object.defineProperty(body, 'name', { value: name });
    var runDestructors = (destructors) => {
      while (destructors.length) {
        var ptr = destructors.pop();
        var del = destructors.pop();
        del(ptr);
      }
    };
    function usesDestructorStack(argTypes) {
      for (var i = 1; i < argTypes.length; ++i) {
        if (
          argTypes[i] !== null &&
          argTypes[i].destructorFunction === undefined
        ) {
          return true;
        }
      }
      return false;
    }
    var runAndAbortIfError = (func) => {
      try {
        return func();
      } catch (e) {
        abort(e);
      }
    };
    var runtimeKeepalivePush = () => {
      runtimeKeepaliveCounter += 1;
    };
    var runtimeKeepalivePop = () => {
      runtimeKeepaliveCounter -= 1;
    };
    var Asyncify = {
      instrumentWasmImports(imports) {
        var importPattern =
          /^(ReadBufferDataJs|WaitUntilCompletedJs|WaitUntilPipelineCreatedJs|invoke_.*|__asyncjs__.*)$/;
        for (let [x, original] of Object.entries(imports)) {
          if (typeof original == 'function') {
            let isAsyncifyImport = original.isAsync || importPattern.test(x);
          }
        }
      },
      instrumentWasmExports(exports) {
        var ret = {};
        for (let [x, original] of Object.entries(exports)) {
          if (typeof original == 'function') {
            ret[x] = (...args) => {
              Asyncify.exportCallStack.push(x);
              try {
                return original(...args);
              } finally {
                if (!ABORT) {
                  var y = Asyncify.exportCallStack.pop();
                  Asyncify.maybeStopUnwind();
                }
              }
            };
          } else {
            ret[x] = original;
          }
        }
        return ret;
      },
      State: { Normal: 0, Unwinding: 1, Rewinding: 2, Disabled: 3 },
      state: 0,
      StackSize: 4096,
      currData: null,
      handleSleepReturnValue: 0,
      exportCallStack: [],
      callStackNameToId: {},
      callStackIdToName: {},
      callStackId: 0,
      asyncPromiseHandlers: null,
      sleepCallbacks: [],
      getCallStackId(funcName) {
        var id = Asyncify.callStackNameToId[funcName];
        if (id === undefined) {
          id = Asyncify.callStackId++;
          Asyncify.callStackNameToId[funcName] = id;
          Asyncify.callStackIdToName[id] = funcName;
        }
        return id;
      },
      maybeStopUnwind() {
        if (
          Asyncify.currData &&
          Asyncify.state === Asyncify.State.Unwinding &&
          Asyncify.exportCallStack.length === 0
        ) {
          Asyncify.state = Asyncify.State.Normal;
          runAndAbortIfError(_asyncify_stop_unwind);
          if (typeof Fibers != 'undefined') {
            Fibers.trampoline();
          }
        }
      },
      whenDone() {
        return new Promise((resolve, reject) => {
          Asyncify.asyncPromiseHandlers = { resolve: resolve, reject: reject };
        });
      },
      allocateData() {
        var ptr = _malloc(12 + Asyncify.StackSize);
        Asyncify.setDataHeader(ptr, ptr + 12, Asyncify.StackSize);
        Asyncify.setDataRewindFunc(ptr);
        return ptr;
      },
      setDataHeader(ptr, stack, stackSize) {
        HEAPU32[ptr >> 2] = stack;
        HEAPU32[(ptr + 4) >> 2] = stack + stackSize;
      },
      setDataRewindFunc(ptr) {
        var bottomOfCallStack = Asyncify.exportCallStack[0];
        var rewindId = Asyncify.getCallStackId(bottomOfCallStack);
        HEAP32[(ptr + 8) >> 2] = rewindId;
      },
      getDataRewindFuncName(ptr) {
        var id = HEAP32[(ptr + 8) >> 2];
        var name = Asyncify.callStackIdToName[id];
        return name;
      },
      getDataRewindFunc(name) {
        var func = wasmExports[name];
        return func;
      },
      doRewind(ptr) {
        var name = Asyncify.getDataRewindFuncName(ptr);
        var func = Asyncify.getDataRewindFunc(name);
        return func();
      },
      handleSleep(startAsync) {
        if (ABORT) return;
        if (Asyncify.state === Asyncify.State.Normal) {
          var reachedCallback = false;
          var reachedAfterCallback = false;
          startAsync((handleSleepReturnValue = 0) => {
            if (ABORT) return;
            Asyncify.handleSleepReturnValue = handleSleepReturnValue;
            reachedCallback = true;
            if (!reachedAfterCallback) {
              return;
            }
            Asyncify.state = Asyncify.State.Rewinding;
            runAndAbortIfError(() => _asyncify_start_rewind(Asyncify.currData));
            if (typeof Browser != 'undefined' && Browser.mainLoop.func) {
              Browser.mainLoop.resume();
            }
            var asyncWasmReturnValue,
              isError = false;
            try {
              asyncWasmReturnValue = Asyncify.doRewind(Asyncify.currData);
            } catch (err) {
              asyncWasmReturnValue = err;
              isError = true;
            }
            var handled = false;
            if (!Asyncify.currData) {
              var asyncPromiseHandlers = Asyncify.asyncPromiseHandlers;
              if (asyncPromiseHandlers) {
                Asyncify.asyncPromiseHandlers = null;
                (isError
                  ? asyncPromiseHandlers.reject
                  : asyncPromiseHandlers.resolve)(asyncWasmReturnValue);
                handled = true;
              }
            }
            if (isError && !handled) {
              throw asyncWasmReturnValue;
            }
          });
          reachedAfterCallback = true;
          if (!reachedCallback) {
            Asyncify.state = Asyncify.State.Unwinding;
            Asyncify.currData = Asyncify.allocateData();
            if (typeof Browser != 'undefined' && Browser.mainLoop.func) {
              Browser.mainLoop.pause();
            }
            runAndAbortIfError(() => _asyncify_start_unwind(Asyncify.currData));
          }
        } else if (Asyncify.state === Asyncify.State.Rewinding) {
          Asyncify.state = Asyncify.State.Normal;
          runAndAbortIfError(_asyncify_stop_rewind);
          _free(Asyncify.currData);
          Asyncify.currData = null;
          Asyncify.sleepCallbacks.forEach(callUserCallback);
        } else {
          abort(`invalid state: ${Asyncify.state}`);
        }
        return Asyncify.handleSleepReturnValue;
      },
      handleAsync(startAsync) {
        return Asyncify.handleSleep((wakeUp) => {
          startAsync().then(wakeUp);
        });
      },
    };
    function craftInvokerFunction(
      humanName,
      argTypes,
      classType,
      cppInvokerFunc,
      cppTargetFunc,
      isAsync
    ) {
      var argCount = argTypes.length;
      if (argCount < 2) {
        throwBindingError(
          "argTypes array size mismatch! Must at least get return value and 'this' types!"
        );
      }
      var isClassMethodFunc = argTypes[1] !== null && classType !== null;
      var needsDestructorStack = usesDestructorStack(argTypes);
      var returns = argTypes[0].name !== 'void';
      var expectedArgCount = argCount - 2;
      var argsWired = new Array(expectedArgCount);
      var invokerFuncArgs = [];
      var destructors = [];
      var invokerFn = function (...args) {
        if (args.length !== expectedArgCount) {
          throwBindingError(
            `function ${humanName} called with ${args.length} arguments, expected ${expectedArgCount}`
          );
        }
        destructors.length = 0;
        var thisWired;
        invokerFuncArgs.length = isClassMethodFunc ? 2 : 1;
        invokerFuncArgs[0] = cppTargetFunc;
        if (isClassMethodFunc) {
          thisWired = argTypes[1]['toWireType'](destructors, this);
          invokerFuncArgs[1] = thisWired;
        }
        for (var i = 0; i < expectedArgCount; ++i) {
          argsWired[i] = argTypes[i + 2]['toWireType'](destructors, args[i]);
          invokerFuncArgs.push(argsWired[i]);
        }
        var rv = cppInvokerFunc(...invokerFuncArgs);
        function onDone(rv) {
          if (needsDestructorStack) {
            runDestructors(destructors);
          } else {
            for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; i++) {
              var param = i === 1 ? thisWired : argsWired[i - 2];
              if (argTypes[i].destructorFunction !== null) {
                argTypes[i].destructorFunction(param);
              }
            }
          }
          if (returns) {
            return argTypes[0]['fromWireType'](rv);
          }
        }
        if (Asyncify.currData) {
          return Asyncify.whenDone().then(onDone);
        }
        return onDone(rv);
      };
      return createNamedFunction(humanName, invokerFn);
    }
    var ensureOverloadTable = (proto, methodName, humanName) => {
      if (undefined === proto[methodName].overloadTable) {
        var prevFunc = proto[methodName];
        proto[methodName] = function (...args) {
          if (!proto[methodName].overloadTable.hasOwnProperty(args.length)) {
            throwBindingError(
              `Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`
            );
          }
          return proto[methodName].overloadTable[args.length].apply(this, args);
        };
        proto[methodName].overloadTable = [];
        proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
      }
    };
    var exposePublicSymbol = (name, value, numArguments) => {
      if (Module.hasOwnProperty(name)) {
        if (
          undefined === numArguments ||
          (undefined !== Module[name].overloadTable &&
            undefined !== Module[name].overloadTable[numArguments])
        ) {
          throwBindingError(`Cannot register public name '${name}' twice`);
        }
        ensureOverloadTable(Module, name, name);
        if (Module.hasOwnProperty(numArguments)) {
          throwBindingError(
            `Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`
          );
        }
        Module[name].overloadTable[numArguments] = value;
      } else {
        Module[name] = value;
        if (undefined !== numArguments) {
          Module[name].numArguments = numArguments;
        }
      }
    };
    var heap32VectorToArray = (count, firstElement) => {
      var array = [];
      for (var i = 0; i < count; i++) {
        array.push(HEAPU32[(firstElement + i * 4) >> 2]);
      }
      return array;
    };
    var replacePublicSymbol = (name, value, numArguments) => {
      if (!Module.hasOwnProperty(name)) {
        throwInternalError('Replacing nonexistent public symbol');
      }
      if (
        undefined !== Module[name].overloadTable &&
        undefined !== numArguments
      ) {
        Module[name].overloadTable[numArguments] = value;
      } else {
        Module[name] = value;
        Module[name].argCount = numArguments;
      }
    };
    var dynCallLegacy = (sig, ptr, args) => {
      sig = sig.replace(/p/g, 'i');
      var f = Module['dynCall_' + sig];
      return f(ptr, ...args);
    };
    var wasmTable;
    var dynCall = (sig, ptr, args = []) => {
      var rtn = dynCallLegacy(sig, ptr, args);
      return rtn;
    };
    var getDynCaller =
      (sig, ptr) =>
      (...args) =>
        dynCall(sig, ptr, args);
    var embind__requireFunction = (signature, rawFunction) => {
      signature = readLatin1String(signature);
      function makeDynCaller() {
        return getDynCaller(signature, rawFunction);
      }
      var fp = makeDynCaller();
      if (typeof fp != 'function') {
        throwBindingError(
          `unknown function pointer with signature ${signature}: ${rawFunction}`
        );
      }
      return fp;
    };
    var extendError = (baseErrorType, errorName) => {
      var errorClass = createNamedFunction(errorName, function (message) {
        this.name = errorName;
        this.message = message;
        var stack = new Error(message).stack;
        if (stack !== undefined) {
          this.stack =
            this.toString() + '\n' + stack.replace(/^Error(:[^\n]*)?\n/, '');
        }
      });
      errorClass.prototype = Object.create(baseErrorType.prototype);
      errorClass.prototype.constructor = errorClass;
      errorClass.prototype.toString = function () {
        if (this.message === undefined) {
          return this.name;
        } else {
          return `${this.name}: ${this.message}`;
        }
      };
      return errorClass;
    };
    var UnboundTypeError;
    var getTypeName = (type) => {
      var ptr = ___getTypeName(type);
      var rv = readLatin1String(ptr);
      _free(ptr);
      return rv;
    };
    var throwUnboundTypeError = (message, types) => {
      var unboundTypes = [];
      var seen = {};
      function visit(type) {
        if (seen[type]) {
          return;
        }
        if (registeredTypes[type]) {
          return;
        }
        if (typeDependencies[type]) {
          typeDependencies[type].forEach(visit);
          return;
        }
        unboundTypes.push(type);
        seen[type] = true;
      }
      types.forEach(visit);
      throw new UnboundTypeError(
        `${message}: ` + unboundTypes.map(getTypeName).join([', '])
      );
    };
    var getFunctionName = (signature) => {
      signature = signature.trim();
      const argsIndex = signature.indexOf('(');
      if (argsIndex !== -1) {
        return signature.substr(0, argsIndex);
      } else {
        return signature;
      }
    };
    var __embind_register_function = (
      name,
      argCount,
      rawArgTypesAddr,
      signature,
      rawInvoker,
      fn,
      isAsync
    ) => {
      var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      name = readLatin1String(name);
      name = getFunctionName(name);
      rawInvoker = embind__requireFunction(signature, rawInvoker);
      exposePublicSymbol(
        name,
        function () {
          throwUnboundTypeError(
            `Cannot call ${name} due to unbound types`,
            argTypes
          );
        },
        argCount - 1
      );
      whenDependentTypesAreResolved([], argTypes, (argTypes) => {
        var invokerArgsArray = [argTypes[0], null].concat(argTypes.slice(1));
        replacePublicSymbol(
          name,
          craftInvokerFunction(
            name,
            invokerArgsArray,
            null,
            rawInvoker,
            fn,
            isAsync
          ),
          argCount - 1
        );
        return [];
      });
    };
    var integerReadValueFromPointer = (name, width, signed) => {
      switch (width) {
        case 1:
          return signed
            ? (pointer) => HEAP8[pointer]
            : (pointer) => HEAPU8[pointer];
        case 2:
          return signed
            ? (pointer) => HEAP16[pointer >> 1]
            : (pointer) => HEAPU16[pointer >> 1];
        case 4:
          return signed
            ? (pointer) => HEAP32[pointer >> 2]
            : (pointer) => HEAPU32[pointer >> 2];
        default:
          throw new TypeError(`invalid integer width (${width}): ${name}`);
      }
    };
    var __embind_register_integer = (
      primitiveType,
      name,
      size,
      minRange,
      maxRange
    ) => {
      name = readLatin1String(name);
      if (maxRange === -1) {
        maxRange = 4294967295;
      }
      var fromWireType = (value) => value;
      if (minRange === 0) {
        var bitshift = 32 - 8 * size;
        fromWireType = (value) => (value << bitshift) >>> bitshift;
      }
      var isUnsignedType = name.includes('unsigned');
      var checkAssertions = (value, toTypeName) => {};
      var toWireType;
      if (isUnsignedType) {
        toWireType = function (destructors, value) {
          checkAssertions(value, this.name);
          return value >>> 0;
        };
      } else {
        toWireType = function (destructors, value) {
          checkAssertions(value, this.name);
          return value;
        };
      }
      registerType(primitiveType, {
        name: name,
        fromWireType: fromWireType,
        toWireType: toWireType,
        argPackAdvance: GenericWireTypeSize,
        readValueFromPointer: integerReadValueFromPointer(
          name,
          size,
          minRange !== 0
        ),
        destructorFunction: null,
      });
    };
    var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
      var typeMapping = [
        Int8Array,
        Uint8Array,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
      ];
      var TA = typeMapping[dataTypeIndex];
      function decodeMemoryView(handle) {
        var size = HEAPU32[handle >> 2];
        var data = HEAPU32[(handle + 4) >> 2];
        return new TA(HEAP8.buffer, data, size);
      }
      name = readLatin1String(name);
      registerType(
        rawType,
        {
          name: name,
          fromWireType: decodeMemoryView,
          argPackAdvance: GenericWireTypeSize,
          readValueFromPointer: decodeMemoryView,
        },
        { ignoreDuplicateRegistrations: true }
      );
    };
    var stringToUTF8 = (str, outPtr, maxBytesToWrite) =>
      stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    var __embind_register_std_string = (rawType, name) => {
      name = readLatin1String(name);
      var stdStringIsUTF8 = name === 'std::string';
      registerType(rawType, {
        name: name,
        fromWireType(value) {
          var length = HEAPU32[value >> 2];
          var payload = value + 4;
          var str;
          if (stdStringIsUTF8) {
            var decodeStartPtr = payload;
            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = payload + i;
              if (i == length || HEAPU8[currentBytePtr] == 0) {
                var maxRead = currentBytePtr - decodeStartPtr;
                var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                if (str === undefined) {
                  str = stringSegment;
                } else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }
                decodeStartPtr = currentBytePtr + 1;
              }
            }
          } else {
            var a = new Array(length);
            for (var i = 0; i < length; ++i) {
              a[i] = String.fromCharCode(HEAPU8[payload + i]);
            }
            str = a.join('');
          }
          _free(value);
          return str;
        },
        toWireType(destructors, value) {
          if (value instanceof ArrayBuffer) {
            value = new Uint8Array(value);
          }
          var length;
          var valueIsOfTypeString = typeof value == 'string';
          if (
            !(
              valueIsOfTypeString ||
              value instanceof Uint8Array ||
              value instanceof Uint8ClampedArray ||
              value instanceof Int8Array
            )
          ) {
            throwBindingError('Cannot pass non-string to std::string');
          }
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            length = lengthBytesUTF8(value);
          } else {
            length = value.length;
          }
          var base = _malloc(4 + length + 1);
          var ptr = base + 4;
          HEAPU32[base >> 2] = length;
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            stringToUTF8(value, ptr, length + 1);
          } else {
            if (valueIsOfTypeString) {
              for (var i = 0; i < length; ++i) {
                var charCode = value.charCodeAt(i);
                if (charCode > 255) {
                  _free(ptr);
                  throwBindingError(
                    'String has UTF-16 code units that do not fit in 8 bits'
                  );
                }
                HEAPU8[ptr + i] = charCode;
              }
            } else {
              for (var i = 0; i < length; ++i) {
                HEAPU8[ptr + i] = value[i];
              }
            }
          }
          if (destructors !== null) {
            destructors.push(_free, base);
          }
          return base;
        },
        argPackAdvance: GenericWireTypeSize,
        readValueFromPointer: readPointer,
        destructorFunction(ptr) {
          _free(ptr);
        },
      });
    };
    var UTF16Decoder = new TextDecoder('utf-16le');
    var UTF16ToString = (ptr, maxBytesToRead) => {
      var endPtr = ptr;
      var idx = endPtr >> 1;
      var maxIdx = idx + maxBytesToRead / 2;
      while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
      endPtr = idx << 1;
      return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
    };
    var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
      maxBytesToWrite ??= 2147483647;
      if (maxBytesToWrite < 2) return 0;
      maxBytesToWrite -= 2;
      var startPtr = outPtr;
      var numCharsToWrite =
        maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
      for (var i = 0; i < numCharsToWrite; ++i) {
        var codeUnit = str.charCodeAt(i);
        HEAP16[outPtr >> 1] = codeUnit;
        outPtr += 2;
      }
      HEAP16[outPtr >> 1] = 0;
      return outPtr - startPtr;
    };
    var lengthBytesUTF16 = (str) => str.length * 2;
    var UTF32ToString = (ptr, maxBytesToRead) => {
      var i = 0;
      var str = '';
      while (!(i >= maxBytesToRead / 4)) {
        var utf32 = HEAP32[(ptr + i * 4) >> 2];
        if (utf32 == 0) break;
        ++i;
        if (utf32 >= 65536) {
          var ch = utf32 - 65536;
          str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
        } else {
          str += String.fromCharCode(utf32);
        }
      }
      return str;
    };
    var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
      maxBytesToWrite ??= 2147483647;
      if (maxBytesToWrite < 4) return 0;
      var startPtr = outPtr;
      var endPtr = startPtr + maxBytesToWrite - 4;
      for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343) {
          var trailSurrogate = str.charCodeAt(++i);
          codeUnit =
            (65536 + ((codeUnit & 1023) << 10)) | (trailSurrogate & 1023);
        }
        HEAP32[outPtr >> 2] = codeUnit;
        outPtr += 4;
        if (outPtr + 4 > endPtr) break;
      }
      HEAP32[outPtr >> 2] = 0;
      return outPtr - startPtr;
    };
    var lengthBytesUTF32 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
        len += 4;
      }
      return len;
    };
    var __embind_register_std_wstring = (rawType, charSize, name) => {
      name = readLatin1String(name);
      var decodeString, encodeString, readCharAt, lengthBytesUTF;
      if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
        readCharAt = (pointer) => HEAPU16[pointer >> 1];
      } else if (charSize === 4) {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
        readCharAt = (pointer) => HEAPU32[pointer >> 2];
      }
      registerType(rawType, {
        name: name,
        fromWireType: (value) => {
          var length = HEAPU32[value >> 2];
          var str;
          var decodeStartPtr = value + 4;
          for (var i = 0; i <= length; ++i) {
            var currentBytePtr = value + 4 + i * charSize;
            if (i == length || readCharAt(currentBytePtr) == 0) {
              var maxReadBytes = currentBytePtr - decodeStartPtr;
              var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
              if (str === undefined) {
                str = stringSegment;
              } else {
                str += String.fromCharCode(0);
                str += stringSegment;
              }
              decodeStartPtr = currentBytePtr + charSize;
            }
          }
          _free(value);
          return str;
        },
        toWireType: (destructors, value) => {
          if (!(typeof value == 'string')) {
            throwBindingError(
              `Cannot pass non-string to C++ string type ${name}`
            );
          }
          var length = lengthBytesUTF(value);
          var ptr = _malloc(4 + length + charSize);
          HEAPU32[ptr >> 2] = length / charSize;
          encodeString(value, ptr + 4, length + charSize);
          if (destructors !== null) {
            destructors.push(_free, ptr);
          }
          return ptr;
        },
        argPackAdvance: GenericWireTypeSize,
        readValueFromPointer: readPointer,
        destructorFunction(ptr) {
          _free(ptr);
        },
      });
    };
    var __embind_register_void = (rawType, name) => {
      name = readLatin1String(name);
      registerType(rawType, {
        isVoid: true,
        name: name,
        argPackAdvance: 0,
        fromWireType: () => undefined,
        toWireType: (destructors, o) => undefined,
      });
    };
    var nowIsMonotonic = 1;
    var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;
    var __emscripten_memcpy_js = (dest, src, num) =>
      HEAPU8.copyWithin(dest, src, src + num);
    var __emval_incref = (handle) => {
      if (handle > 9) {
        emval_handles[handle + 1] += 1;
      }
    };
    var requireRegisteredType = (rawType, humanName) => {
      var impl = registeredTypes[rawType];
      if (undefined === impl) {
        throwBindingError(
          `${humanName} has unknown type ${getTypeName(rawType)}`
        );
      }
      return impl;
    };
    var __emval_take_value = (type, arg) => {
      type = requireRegisteredType(type, '_emval_take_value');
      var v = type['readValueFromPointer'](arg);
      return Emval.toHandle(v);
    };
    var convertI32PairToI53Checked = (lo, hi) =>
      (hi + 2097152) >>> 0 < 4194305 - !!lo
        ? (lo >>> 0) + hi * 4294967296
        : NaN;
    function __gmtime_js(time_low, time_high, tmPtr) {
      var time = convertI32PairToI53Checked(time_low, time_high);
      var date = new Date(time * 1e3);
      HEAP32[tmPtr >> 2] = date.getUTCSeconds();
      HEAP32[(tmPtr + 4) >> 2] = date.getUTCMinutes();
      HEAP32[(tmPtr + 8) >> 2] = date.getUTCHours();
      HEAP32[(tmPtr + 12) >> 2] = date.getUTCDate();
      HEAP32[(tmPtr + 16) >> 2] = date.getUTCMonth();
      HEAP32[(tmPtr + 20) >> 2] = date.getUTCFullYear() - 1900;
      HEAP32[(tmPtr + 24) >> 2] = date.getUTCDay();
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
      HEAP32[(tmPtr + 28) >> 2] = yday;
    }
    var isLeapYear = (year) =>
      year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    var MONTH_DAYS_LEAP_CUMULATIVE = [
      0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335,
    ];
    var MONTH_DAYS_REGULAR_CUMULATIVE = [
      0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334,
    ];
    var ydayFromDate = (date) => {
      var leap = isLeapYear(date.getFullYear());
      var monthDaysCumulative = leap
        ? MONTH_DAYS_LEAP_CUMULATIVE
        : MONTH_DAYS_REGULAR_CUMULATIVE;
      var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
      return yday;
    };
    function __localtime_js(time_low, time_high, tmPtr) {
      var time = convertI32PairToI53Checked(time_low, time_high);
      var date = new Date(time * 1e3);
      HEAP32[tmPtr >> 2] = date.getSeconds();
      HEAP32[(tmPtr + 4) >> 2] = date.getMinutes();
      HEAP32[(tmPtr + 8) >> 2] = date.getHours();
      HEAP32[(tmPtr + 12) >> 2] = date.getDate();
      HEAP32[(tmPtr + 16) >> 2] = date.getMonth();
      HEAP32[(tmPtr + 20) >> 2] = date.getFullYear() - 1900;
      HEAP32[(tmPtr + 24) >> 2] = date.getDay();
      var yday = ydayFromDate(date) | 0;
      HEAP32[(tmPtr + 28) >> 2] = yday;
      HEAP32[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60);
      var start = new Date(date.getFullYear(), 0, 1);
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dst =
        (summerOffset != winterOffset &&
          date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
      HEAP32[(tmPtr + 32) >> 2] = dst;
    }
    var setTempRet0 = (val) => __emscripten_tempret_set(val);
    var __mktime_js = function (tmPtr) {
      var ret = (() => {
        var date = new Date(
          HEAP32[(tmPtr + 20) >> 2] + 1900,
          HEAP32[(tmPtr + 16) >> 2],
          HEAP32[(tmPtr + 12) >> 2],
          HEAP32[(tmPtr + 8) >> 2],
          HEAP32[(tmPtr + 4) >> 2],
          HEAP32[tmPtr >> 2],
          0
        );
        var dst = HEAP32[(tmPtr + 32) >> 2];
        var guessedOffset = date.getTimezoneOffset();
        var start = new Date(date.getFullYear(), 0, 1);
        var summerOffset = new Date(
          date.getFullYear(),
          6,
          1
        ).getTimezoneOffset();
        var winterOffset = start.getTimezoneOffset();
        var dstOffset = Math.min(winterOffset, summerOffset);
        if (dst < 0) {
          HEAP32[(tmPtr + 32) >> 2] = Number(
            summerOffset != winterOffset && dstOffset == guessedOffset
          );
        } else if (dst > 0 != (dstOffset == guessedOffset)) {
          var nonDstOffset = Math.max(winterOffset, summerOffset);
          var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
          date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
        }
        HEAP32[(tmPtr + 24) >> 2] = date.getDay();
        var yday = ydayFromDate(date) | 0;
        HEAP32[(tmPtr + 28) >> 2] = yday;
        HEAP32[tmPtr >> 2] = date.getSeconds();
        HEAP32[(tmPtr + 4) >> 2] = date.getMinutes();
        HEAP32[(tmPtr + 8) >> 2] = date.getHours();
        HEAP32[(tmPtr + 12) >> 2] = date.getDate();
        HEAP32[(tmPtr + 16) >> 2] = date.getMonth();
        HEAP32[(tmPtr + 20) >> 2] = date.getYear();
        var timeMs = date.getTime();
        if (isNaN(timeMs)) {
          return -1;
        }
        return timeMs / 1e3;
      })();
      return (
        setTempRet0(
          ((tempDouble = ret),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? +Math.floor(tempDouble / 4294967296) >>> 0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0)
        ),
        ret >>> 0
      );
    };
    function __mmap_js(
      len,
      prot,
      flags,
      fd,
      offset_low,
      offset_high,
      allocated,
      addr
    ) {
      var offset = convertI32PairToI53Checked(offset_low, offset_high);
      try {
        if (isNaN(offset)) return 61;
        var stream = SYSCALLS.getStreamFromFD(fd);
        var res = FS.mmap(stream, len, offset, prot, flags);
        var ptr = res.ptr;
        HEAP32[allocated >> 2] = res.allocated;
        HEAPU32[addr >> 2] = ptr;
        return 0;
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return -e.errno;
      }
    }
    function __munmap_js(addr, len, prot, flags, fd, offset_low, offset_high) {
      var offset = convertI32PairToI53Checked(offset_low, offset_high);
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        if (prot & 2) {
          SYSCALLS.doMsync(addr, stream, len, flags, offset);
        }
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return -e.errno;
      }
    }
    var __tzset_js = (timezone, daylight, std_name, dst_name) => {
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
      HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
      HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
      var extractZone = (date) =>
        date
          .toLocaleTimeString(undefined, {
            hour12: false,
            timeZoneName: 'short',
          })
          .split(' ')[1];
      var winterName = extractZone(winter);
      var summerName = extractZone(summer);
      if (summerOffset < winterOffset) {
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    };
    var readEmAsmArgsArray = [];
    var readEmAsmArgs = (sigPtr, buf) => {
      readEmAsmArgsArray.length = 0;
      var ch;
      while ((ch = HEAPU8[sigPtr++])) {
        var wide = ch != 105;
        wide &= ch != 112;
        buf += wide && buf % 8 ? 4 : 0;
        readEmAsmArgsArray.push(
          ch == 112
            ? HEAPU32[buf >> 2]
            : ch == 105
              ? HEAP32[buf >> 2]
              : HEAPF64[buf >> 3]
        );
        buf += wide ? 8 : 4;
      }
      return readEmAsmArgsArray;
    };
    var runEmAsmFunction = (code, sigPtr, argbuf) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      return ASM_CONSTS[code](...args);
    };
    var _emscripten_asm_const_int = (code, sigPtr, argbuf) =>
      runEmAsmFunction(code, sigPtr, argbuf);
    var _emscripten_date_now = () => Date.now();
    var _emscripten_errn = (str, len) => err(UTF8ToString(str, len));
    var getHeapMax = () => 2147483648;
    var _emscripten_get_heap_max = () => getHeapMax();
    var _emscripten_has_asyncify = () => 1;
    var _emscripten_outn = (str, len) => out(UTF8ToString(str, len));
    var _emscripten_pc_get_function = (pc) => {
      abort(
        'Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER'
      );
      return 0;
    };
    var growMemory = (size) => {
      var b = wasmMemory.buffer;
      var pages = (size - b.byteLength + 65535) / 65536;
      try {
        wasmMemory.grow(pages);
        updateMemoryViews();
        return 1;
      } catch (e) {}
    };
    var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      requestedSize >>>= 0;
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        return false;
      }
      var alignUp = (x, multiple) =>
        x + ((multiple - (x % multiple)) % multiple);
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(
          overGrownHeapSize,
          requestedSize + 100663296
        );
        var newSize = Math.min(
          maxHeapSize,
          alignUp(Math.max(requestedSize, overGrownHeapSize), 65536)
        );
        var replacement = growMemory(newSize);
        if (replacement) {
          return true;
        }
      }
      return false;
    };
    var convertFrameToPC = (frame) => {
      abort(
        'Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER'
      );
      return 0;
    };
    var UNWIND_CACHE = {};
    var saveInUnwindCache = (callstack) => {
      callstack.forEach((frame) => {
        var pc = convertFrameToPC(frame);
        if (pc) {
          UNWIND_CACHE[pc] = frame;
        }
      });
    };
    function jsStackTrace() {
      return new Error().stack.toString();
    }
    function _emscripten_stack_snapshot() {
      var callstack = jsStackTrace().split('\n');
      if (callstack[0] == 'Error') {
        callstack.shift();
      }
      saveInUnwindCache(callstack);
      UNWIND_CACHE.last_addr = convertFrameToPC(callstack[3]);
      UNWIND_CACHE.last_stack = callstack;
      return UNWIND_CACHE.last_addr;
    }
    var _emscripten_stack_unwind_buffer = (addr, buffer, count) => {
      var stack;
      if (UNWIND_CACHE.last_addr == addr) {
        stack = UNWIND_CACHE.last_stack;
      } else {
        stack = jsStackTrace().split('\n');
        if (stack[0] == 'Error') {
          stack.shift();
        }
        saveInUnwindCache(stack);
      }
      var offset = 3;
      while (stack[offset] && convertFrameToPC(stack[offset]) != addr) {
        ++offset;
      }
      for (var i = 0; i < count && stack[i + offset]; ++i) {
        HEAP32[(buffer + i * 4) >> 2] = convertFrameToPC(stack[i + offset]);
      }
      return i;
    };
    var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
      var ext = ctx.getExtension('ANGLE_instanced_arrays');
      if (ext) {
        ctx['vertexAttribDivisor'] = (index, divisor) =>
          ext['vertexAttribDivisorANGLE'](index, divisor);
        ctx['drawArraysInstanced'] = (mode, first, count, primcount) =>
          ext['drawArraysInstancedANGLE'](mode, first, count, primcount);
        ctx['drawElementsInstanced'] = (
          mode,
          count,
          type,
          indices,
          primcount
        ) =>
          ext['drawElementsInstancedANGLE'](
            mode,
            count,
            type,
            indices,
            primcount
          );
        return 1;
      }
    };
    var webgl_enable_OES_vertex_array_object = (ctx) => {
      var ext = ctx.getExtension('OES_vertex_array_object');
      if (ext) {
        ctx['createVertexArray'] = () => ext['createVertexArrayOES']();
        ctx['deleteVertexArray'] = (vao) => ext['deleteVertexArrayOES'](vao);
        ctx['bindVertexArray'] = (vao) => ext['bindVertexArrayOES'](vao);
        ctx['isVertexArray'] = (vao) => ext['isVertexArrayOES'](vao);
        return 1;
      }
    };
    var webgl_enable_WEBGL_draw_buffers = (ctx) => {
      var ext = ctx.getExtension('WEBGL_draw_buffers');
      if (ext) {
        ctx['drawBuffers'] = (n, bufs) => ext['drawBuffersWEBGL'](n, bufs);
        return 1;
      }
    };
    var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) =>
      !!(ctx.dibvbi = ctx.getExtension(
        'WEBGL_draw_instanced_base_vertex_base_instance'
      ));
    var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (
      ctx
    ) =>
      !!(ctx.mdibvbi = ctx.getExtension(
        'WEBGL_multi_draw_instanced_base_vertex_base_instance'
      ));
    var webgl_enable_WEBGL_multi_draw = (ctx) =>
      !!(ctx.multiDrawWebgl = ctx.getExtension('WEBGL_multi_draw'));
    var getEmscriptenSupportedExtensions = (ctx) => {
      var supportedExtensions = [
        'ANGLE_instanced_arrays',
        'EXT_blend_minmax',
        'EXT_disjoint_timer_query',
        'EXT_frag_depth',
        'EXT_shader_texture_lod',
        'EXT_sRGB',
        'OES_element_index_uint',
        'OES_fbo_render_mipmap',
        'OES_standard_derivatives',
        'OES_texture_float',
        'OES_texture_half_float',
        'OES_texture_half_float_linear',
        'OES_vertex_array_object',
        'WEBGL_color_buffer_float',
        'WEBGL_depth_texture',
        'WEBGL_draw_buffers',
        'EXT_color_buffer_float',
        'EXT_conservative_depth',
        'EXT_disjoint_timer_query_webgl2',
        'EXT_texture_norm16',
        'NV_shader_noperspective_interpolation',
        'WEBGL_clip_cull_distance',
        'EXT_color_buffer_half_float',
        'EXT_depth_clamp',
        'EXT_float_blend',
        'EXT_texture_compression_bptc',
        'EXT_texture_compression_rgtc',
        'EXT_texture_filter_anisotropic',
        'KHR_parallel_shader_compile',
        'OES_texture_float_linear',
        'WEBGL_blend_func_extended',
        'WEBGL_compressed_texture_astc',
        'WEBGL_compressed_texture_etc',
        'WEBGL_compressed_texture_etc1',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_compressed_texture_s3tc_srgb',
        'WEBGL_debug_renderer_info',
        'WEBGL_debug_shaders',
        'WEBGL_lose_context',
        'WEBGL_multi_draw',
      ];
      return (ctx.getSupportedExtensions() || []).filter((ext) =>
        supportedExtensions.includes(ext)
      );
    };
    var GL = {
      counter: 1,
      buffers: [],
      mappedBuffers: {},
      programs: [],
      framebuffers: [],
      renderbuffers: [],
      textures: [],
      shaders: [],
      vaos: [],
      contexts: [],
      offscreenCanvases: {},
      queries: [],
      samplers: [],
      transformFeedbacks: [],
      syncs: [],
      byteSizeByTypeRoot: 5120,
      byteSizeByType: [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
      stringCache: {},
      stringiCache: {},
      unpackAlignment: 4,
      unpackRowLength: 0,
      recordError: (errorCode) => {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },
      getNewId: (table) => {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },
      genObject: (n, buffers, createFunction, objectTable) => {
        for (var i = 0; i < n; i++) {
          var buffer = GLctx[createFunction]();
          var id = buffer && GL.getNewId(objectTable);
          if (buffer) {
            buffer.name = id;
            objectTable[id] = buffer;
          } else {
            GL.recordError(1282);
          }
          HEAP32[(buffers + i * 4) >> 2] = id;
        }
      },
      MAX_TEMP_BUFFER_SIZE: 2097152,
      numTempVertexBuffersPerSize: 64,
      log2ceilLookup: (i) => 32 - Math.clz32(i === 0 ? 0 : i - 1),
      generateTempBuffers: (quads, context) => {
        var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        context.tempVertexBufferCounters1 = [];
        context.tempVertexBufferCounters2 = [];
        context.tempVertexBufferCounters1.length =
          context.tempVertexBufferCounters2.length = largestIndex + 1;
        context.tempVertexBuffers1 = [];
        context.tempVertexBuffers2 = [];
        context.tempVertexBuffers1.length = context.tempVertexBuffers2.length =
          largestIndex + 1;
        context.tempIndexBuffers = [];
        context.tempIndexBuffers.length = largestIndex + 1;
        for (var i = 0; i <= largestIndex; ++i) {
          context.tempIndexBuffers[i] = null;
          context.tempVertexBufferCounters1[i] =
            context.tempVertexBufferCounters2[i] = 0;
          var ringbufferLength = GL.numTempVertexBuffersPerSize;
          context.tempVertexBuffers1[i] = [];
          context.tempVertexBuffers2[i] = [];
          var ringbuffer1 = context.tempVertexBuffers1[i];
          var ringbuffer2 = context.tempVertexBuffers2[i];
          ringbuffer1.length = ringbuffer2.length = ringbufferLength;
          for (var j = 0; j < ringbufferLength; ++j) {
            ringbuffer1[j] = ringbuffer2[j] = null;
          }
        }
        if (quads) {
          context.tempQuadIndexBuffer = GLctx.createBuffer();
          context.GLctx.bindBuffer(34963, context.tempQuadIndexBuffer);
          var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
          var quadIndexes = new Uint16Array(numIndexes);
          var i = 0,
            v = 0;
          while (1) {
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v + 1;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v + 2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v + 2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v + 3;
            if (i >= numIndexes) break;
            v += 4;
          }
          context.GLctx.bufferData(34963, quadIndexes, 35044);
          context.GLctx.bindBuffer(34963, null);
        }
      },
      getTempVertexBuffer: (sizeBytes) => {
        var idx = GL.log2ceilLookup(sizeBytes);
        var ringbuffer = GL.currentContext.tempVertexBuffers1[idx];
        var nextFreeBufferIndex =
          GL.currentContext.tempVertexBufferCounters1[idx];
        GL.currentContext.tempVertexBufferCounters1[idx] =
          (GL.currentContext.tempVertexBufferCounters1[idx] + 1) &
          (GL.numTempVertexBuffersPerSize - 1);
        var vbo = ringbuffer[nextFreeBufferIndex];
        if (vbo) {
          return vbo;
        }
        var prevVBO = GLctx.getParameter(34964);
        ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
        GLctx.bindBuffer(34962, ringbuffer[nextFreeBufferIndex]);
        GLctx.bufferData(34962, 1 << idx, 35048);
        GLctx.bindBuffer(34962, prevVBO);
        return ringbuffer[nextFreeBufferIndex];
      },
      getTempIndexBuffer: (sizeBytes) => {
        var idx = GL.log2ceilLookup(sizeBytes);
        var ibo = GL.currentContext.tempIndexBuffers[idx];
        if (ibo) {
          return ibo;
        }
        var prevIBO = GLctx.getParameter(34965);
        GL.currentContext.tempIndexBuffers[idx] = GLctx.createBuffer();
        GLctx.bindBuffer(34963, GL.currentContext.tempIndexBuffers[idx]);
        GLctx.bufferData(34963, 1 << idx, 35048);
        GLctx.bindBuffer(34963, prevIBO);
        return GL.currentContext.tempIndexBuffers[idx];
      },
      newRenderingFrameStarted: () => {
        if (!GL.currentContext) {
          return;
        }
        var vb = GL.currentContext.tempVertexBuffers1;
        GL.currentContext.tempVertexBuffers1 =
          GL.currentContext.tempVertexBuffers2;
        GL.currentContext.tempVertexBuffers2 = vb;
        vb = GL.currentContext.tempVertexBufferCounters1;
        GL.currentContext.tempVertexBufferCounters1 =
          GL.currentContext.tempVertexBufferCounters2;
        GL.currentContext.tempVertexBufferCounters2 = vb;
        var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        for (var i = 0; i <= largestIndex; ++i) {
          GL.currentContext.tempVertexBufferCounters1[i] = 0;
        }
      },
      getSource: (shader, count, string, length) => {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAPU32[(length + i * 4) >> 2] : undefined;
          source += UTF8ToString(HEAPU32[(string + i * 4) >> 2], len);
        }
        return source;
      },
      calcBufLength: (size, type, stride, count) => {
        if (stride > 0) {
          return count * stride;
        }
        var typeSize = GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
        return size * typeSize * count;
      },
      usedTempBuffers: [],
      preDrawHandleClientVertexAttribBindings: (count) => {
        GL.resetBufferBinding = false;
        for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
          var cb = GL.currentContext.clientBuffers[i];
          if (!cb.clientside || !cb.enabled) continue;
          GL.resetBufferBinding = true;
          var size = GL.calcBufLength(cb.size, cb.type, cb.stride, count);
          var buf = GL.getTempVertexBuffer(size);
          GLctx.bindBuffer(34962, buf);
          GLctx.bufferSubData(34962, 0, HEAPU8.subarray(cb.ptr, cb.ptr + size));
          cb.vertexAttribPointerAdaptor.call(
            GLctx,
            i,
            cb.size,
            cb.type,
            cb.normalized,
            cb.stride,
            0
          );
        }
      },
      postDrawHandleClientVertexAttribBindings: () => {
        if (GL.resetBufferBinding) {
          GLctx.bindBuffer(34962, GL.buffers[GLctx.currentArrayBufferBinding]);
        }
      },
      createContext: (canvas, webGLContextAttributes) => {
        if (!canvas.getContextSafariWebGL2Fixed) {
          canvas.getContextSafariWebGL2Fixed = canvas.getContext;
          function fixedGetContext(ver, attrs) {
            var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
            return (ver == 'webgl') == gl instanceof WebGLRenderingContext
              ? gl
              : null;
          }
          canvas.getContext = fixedGetContext;
        }
        var ctx =
          webGLContextAttributes.majorVersion > 1
            ? canvas.getContext('webgl2', webGLContextAttributes)
            : canvas.getContext('webgl', webGLContextAttributes);
        if (!ctx) return 0;
        var handle = GL.registerContext(ctx, webGLContextAttributes);
        return handle;
      },
      registerContext: (ctx, webGLContextAttributes) => {
        var handle = GL.getNewId(GL.contexts);
        var context = {
          handle: handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx,
        };
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (
          typeof webGLContextAttributes.enableExtensionsByDefault ==
            'undefined' ||
          webGLContextAttributes.enableExtensionsByDefault
        ) {
          GL.initExtensions(context);
        }
        context.maxVertexAttribs = context.GLctx.getParameter(34921);
        context.clientBuffers = [];
        for (var i = 0; i < context.maxVertexAttribs; i++) {
          context.clientBuffers[i] = {
            enabled: false,
            clientside: false,
            size: 0,
            type: 0,
            normalized: 0,
            stride: 0,
            ptr: 0,
            vertexAttribPointerAdaptor: null,
          };
        }
        GL.generateTempBuffers(false, context);
        return handle;
      },
      makeContextCurrent: (contextHandle) => {
        GL.currentContext = GL.contexts[contextHandle];
        Module.ctx = GLctx = GL.currentContext?.GLctx;
        return !(contextHandle && !GLctx);
      },
      getContext: (contextHandle) => GL.contexts[contextHandle],
      deleteContext: (contextHandle) => {
        if (GL.currentContext === GL.contexts[contextHandle]) {
          GL.currentContext = null;
        }
        if (typeof JSEvents == 'object') {
          JSEvents.removeAllHandlersOnTarget(
            GL.contexts[contextHandle].GLctx.canvas
          );
        }
        if (
          GL.contexts[contextHandle] &&
          GL.contexts[contextHandle].GLctx.canvas
        ) {
          GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
        }
        GL.contexts[contextHandle] = null;
      },
      initExtensions: (context) => {
        context ||= GL.currentContext;
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
        var GLctx = context.GLctx;
        webgl_enable_ANGLE_instanced_arrays(GLctx);
        webgl_enable_OES_vertex_array_object(GLctx);
        webgl_enable_WEBGL_draw_buffers(GLctx);
        webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
        webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(
          GLctx
        );
        if (context.version >= 2) {
          GLctx.disjointTimerQueryExt = GLctx.getExtension(
            'EXT_disjoint_timer_query_webgl2'
          );
        }
        if (context.version < 2 || !GLctx.disjointTimerQueryExt) {
          GLctx.disjointTimerQueryExt = GLctx.getExtension(
            'EXT_disjoint_timer_query'
          );
        }
        webgl_enable_WEBGL_multi_draw(GLctx);
        getEmscriptenSupportedExtensions(GLctx).forEach((ext) => {
          if (!ext.includes('lose_context') && !ext.includes('debug')) {
            GLctx.getExtension(ext);
          }
        });
      },
    };
    var JSEvents = {
      removeAllEventListeners() {
        while (JSEvents.eventHandlers.length) {
          JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
        }
        JSEvents.deferredCalls = [];
      },
      inEventHandler: 0,
      deferredCalls: [],
      deferCall(targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false;
          for (var i in arrA) {
            if (arrA[i] != arrB[i]) return false;
          }
          return true;
        }
        for (var call of JSEvents.deferredCalls) {
          if (
            call.targetFunction == targetFunction &&
            arraysHaveEqualContent(call.argsList, argsList)
          ) {
            return;
          }
        }
        JSEvents.deferredCalls.push({
          targetFunction: targetFunction,
          precedence: precedence,
          argsList: argsList,
        });
        JSEvents.deferredCalls.sort((x, y) => x.precedence < y.precedence);
      },
      removeDeferredCalls(targetFunction) {
        JSEvents.deferredCalls = JSEvents.deferredCalls.filter(
          (call) => call.targetFunction != targetFunction
        );
      },
      canPerformEventHandlerRequests() {
        if (navigator.userActivation) {
          return navigator.userActivation.isActive;
        }
        return (
          JSEvents.inEventHandler &&
          JSEvents.currentEventHandler.allowsDeferredCalls
        );
      },
      runDeferredCalls() {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return;
        }
        var deferredCalls = JSEvents.deferredCalls;
        JSEvents.deferredCalls = [];
        for (var call of deferredCalls) {
          call.targetFunction(...call.argsList);
        }
      },
      eventHandlers: [],
      removeAllHandlersOnTarget: (target, eventTypeString) => {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (
            JSEvents.eventHandlers[i].target == target &&
            (!eventTypeString ||
              eventTypeString == JSEvents.eventHandlers[i].eventTypeString)
          ) {
            JSEvents._removeHandler(i--);
          }
        }
      },
      _removeHandler(i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(
          h.eventTypeString,
          h.eventListenerFunc,
          h.useCapture
        );
        JSEvents.eventHandlers.splice(i, 1);
      },
      registerOrRemoveHandler(eventHandler) {
        if (!eventHandler.target) {
          return -4;
        }
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = function (event) {
            ++JSEvents.inEventHandler;
            JSEvents.currentEventHandler = eventHandler;
            JSEvents.runDeferredCalls();
            eventHandler.handlerFunc(event);
            JSEvents.runDeferredCalls();
            --JSEvents.inEventHandler;
          };
          eventHandler.target.addEventListener(
            eventHandler.eventTypeString,
            eventHandler.eventListenerFunc,
            eventHandler.useCapture
          );
          JSEvents.eventHandlers.push(eventHandler);
        } else {
          for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (
              JSEvents.eventHandlers[i].target == eventHandler.target &&
              JSEvents.eventHandlers[i].eventTypeString ==
                eventHandler.eventTypeString
            ) {
              JSEvents._removeHandler(i--);
            }
          }
        }
        return 0;
      },
      getNodeNameForTarget(target) {
        if (!target) return '';
        if (target == window) return '#window';
        if (target == screen) return '#screen';
        return target?.nodeName || '';
      },
      fullscreenEnabled() {
        return document.fullscreenEnabled || document.webkitFullscreenEnabled;
      },
    };
    var webglPowerPreferences = ['default', 'low-power', 'high-performance'];
    var specialHTMLTargets = [
      0,
      typeof document != 'undefined' ? document : 0,
      typeof window != 'undefined' ? window : 0,
    ];
    var findEventTarget = (target) => {
      try {
        if (!target) return window;
        if (typeof target == 'number')
          target = specialHTMLTargets[target] || UTF8ToString(target);
        if (target === '#window') return window;
        else if (target === '#document') return document;
        else if (target === '#screen') return screen;
        else if (target === '#canvas') return Module['canvas'];
        return typeof target == 'string'
          ? document.getElementById(target)
          : target;
      } catch (e) {
        return null;
      }
    };
    var findCanvasEventTarget = (target) => {
      if (typeof target == 'number') target = UTF8ToString(target);
      if (!target || target === '#canvas') {
        if (typeof GL != 'undefined' && GL.offscreenCanvases['canvas'])
          return GL.offscreenCanvases['canvas'];
        return Module['canvas'];
      }
      if (typeof GL != 'undefined' && GL.offscreenCanvases[target])
        return GL.offscreenCanvases[target];
      return findEventTarget(target);
    };
    var _emscripten_webgl_do_create_context = (target, attributes) => {
      var attr32 = attributes >> 2;
      var powerPreference = HEAP32[attr32 + (8 >> 2)];
      var contextAttributes = {
        alpha: !!HEAP8[attributes + 0],
        depth: !!HEAP8[attributes + 1],
        stencil: !!HEAP8[attributes + 2],
        antialias: !!HEAP8[attributes + 3],
        premultipliedAlpha: !!HEAP8[attributes + 4],
        preserveDrawingBuffer: !!HEAP8[attributes + 5],
        powerPreference: webglPowerPreferences[powerPreference],
        failIfMajorPerformanceCaveat: !!HEAP8[attributes + 12],
        majorVersion: HEAP32[attr32 + (16 >> 2)],
        minorVersion: HEAP32[attr32 + (20 >> 2)],
        enableExtensionsByDefault: HEAP8[attributes + 24],
        explicitSwapControl: HEAP8[attributes + 25],
        proxyContextToMainThread: HEAP32[attr32 + (28 >> 2)],
        renderViaOffscreenBackBuffer: HEAP8[attributes + 32],
      };
      var canvas = findCanvasEventTarget(target);
      if (!canvas) {
        return 0;
      }
      if (contextAttributes.explicitSwapControl) {
        return 0;
      }
      var contextHandle = GL.createContext(canvas, contextAttributes);
      return contextHandle;
    };
    var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;
    var _emscripten_webgl_destroy_context = (contextHandle) => {
      if (GL.currentContext == contextHandle) GL.currentContext = 0;
      GL.deleteContext(contextHandle);
    };
    var _emscripten_webgl_get_context_attributes = (c, a) => {
      if (!a) return -5;
      c = GL.contexts[c];
      if (!c) return -3;
      var t = c.GLctx;
      if (!t) return -3;
      t = t.getContextAttributes();
      HEAP8[a] = t.alpha;
      HEAP8[a + 1] = t.depth;
      HEAP8[a + 2] = t.stencil;
      HEAP8[a + 3] = t.antialias;
      HEAP8[a + 4] = t.premultipliedAlpha;
      HEAP8[a + 5] = t.preserveDrawingBuffer;
      var power =
        t['powerPreference'] &&
        webglPowerPreferences.indexOf(t['powerPreference']);
      HEAP32[(a + 8) >> 2] = power;
      HEAP8[a + 12] = t.failIfMajorPerformanceCaveat;
      HEAP32[(a + 16) >> 2] = c.version;
      HEAP32[(a + 20) >> 2] = 0;
      HEAP8[a + 24] = c.attributes.enableExtensionsByDefault;
      return 0;
    };
    var _emscripten_webgl_do_get_current_context = () =>
      GL.currentContext ? GL.currentContext.handle : 0;
    var _emscripten_webgl_get_current_context =
      _emscripten_webgl_do_get_current_context;
    var _emscripten_webgl_make_context_current = (contextHandle) => {
      var success = GL.makeContextCurrent(contextHandle);
      return success ? 0 : -5;
    };
    var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
    var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };
    var WebGPU = {
      errorCallback: (callback, type, message, userdata) => {
        var sp = stackSave();
        var messagePtr = stringToUTF8OnStack(message);
        ((a1, a2, a3) => dynCall_viii(callback, a1, a2, a3))(
          type,
          messagePtr,
          userdata
        );
        stackRestore(sp);
      },
      initManagers: () => {
        if (WebGPU.mgrDevice) return;
        function Manager() {
          this.objects = {};
          this.nextId = 1;
          this.create = function (object, wrapper = {}) {
            var id = this.nextId++;
            wrapper.refcount = 1;
            wrapper.object = object;
            this.objects[id] = wrapper;
            return id;
          };
          this.get = function (id) {
            if (!id) return undefined;
            var o = this.objects[id];
            return o.object;
          };
          this.reference = function (id) {
            var o = this.objects[id];
            o.refcount++;
          };
          this.release = function (id) {
            var o = this.objects[id];
            o.refcount--;
            if (o.refcount <= 0) {
              delete this.objects[id];
            }
          };
        }
        WebGPU.mgrSurface = WebGPU.mgrSurface || new Manager();
        WebGPU.mgrSwapChain = WebGPU.mgrSwapChain || new Manager();
        WebGPU.mgrAdapter = WebGPU.mgrAdapter || new Manager();
        WebGPU.mgrDevice = WebGPU.mgrDevice || new Manager();
        WebGPU.mgrQueue = WebGPU.mgrQueue || new Manager();
        WebGPU.mgrCommandBuffer = WebGPU.mgrCommandBuffer || new Manager();
        WebGPU.mgrCommandEncoder = WebGPU.mgrCommandEncoder || new Manager();
        WebGPU.mgrRenderPassEncoder =
          WebGPU.mgrRenderPassEncoder || new Manager();
        WebGPU.mgrComputePassEncoder =
          WebGPU.mgrComputePassEncoder || new Manager();
        WebGPU.mgrBindGroup = WebGPU.mgrBindGroup || new Manager();
        WebGPU.mgrBuffer = WebGPU.mgrBuffer || new Manager();
        WebGPU.mgrSampler = WebGPU.mgrSampler || new Manager();
        WebGPU.mgrTexture = WebGPU.mgrTexture || new Manager();
        WebGPU.mgrTextureView = WebGPU.mgrTextureView || new Manager();
        WebGPU.mgrQuerySet = WebGPU.mgrQuerySet || new Manager();
        WebGPU.mgrBindGroupLayout = WebGPU.mgrBindGroupLayout || new Manager();
        WebGPU.mgrPipelineLayout = WebGPU.mgrPipelineLayout || new Manager();
        WebGPU.mgrRenderPipeline = WebGPU.mgrRenderPipeline || new Manager();
        WebGPU.mgrComputePipeline = WebGPU.mgrComputePipeline || new Manager();
        WebGPU.mgrShaderModule = WebGPU.mgrShaderModule || new Manager();
        WebGPU.mgrRenderBundleEncoder =
          WebGPU.mgrRenderBundleEncoder || new Manager();
        WebGPU.mgrRenderBundle = WebGPU.mgrRenderBundle || new Manager();
      },
      makeColor: (ptr) => ({
        r: HEAPF64[ptr >> 3],
        g: HEAPF64[(ptr + 8) >> 3],
        b: HEAPF64[(ptr + 16) >> 3],
        a: HEAPF64[(ptr + 24) >> 3],
      }),
      makeExtent3D: (ptr) => ({
        width: HEAPU32[ptr >> 2],
        height: HEAPU32[(ptr + 4) >> 2],
        depthOrArrayLayers: HEAPU32[(ptr + 8) >> 2],
      }),
      makeOrigin3D: (ptr) => ({
        x: HEAPU32[ptr >> 2],
        y: HEAPU32[(ptr + 4) >> 2],
        z: HEAPU32[(ptr + 8) >> 2],
      }),
      makeImageCopyTexture: (ptr) => ({
        texture: WebGPU.mgrTexture.get(HEAPU32[(ptr + 4) >> 2]),
        mipLevel: HEAPU32[(ptr + 8) >> 2],
        origin: WebGPU.makeOrigin3D(ptr + 12),
        aspect: WebGPU.TextureAspect[HEAPU32[(ptr + 24) >> 2]],
      }),
      makeTextureDataLayout: (ptr) => {
        var bytesPerRow = HEAPU32[(ptr + 16) >> 2];
        var rowsPerImage = HEAPU32[(ptr + 20) >> 2];
        return {
          offset:
            HEAPU32[(ptr + 4 + 8) >> 2] * 4294967296 + HEAPU32[(ptr + 8) >> 2],
          bytesPerRow: bytesPerRow === 4294967295 ? undefined : bytesPerRow,
          rowsPerImage: rowsPerImage === 4294967295 ? undefined : rowsPerImage,
        };
      },
      makeImageCopyBuffer: (ptr) => {
        var layoutPtr = ptr + 8;
        var bufferCopyView = WebGPU.makeTextureDataLayout(layoutPtr);
        bufferCopyView['buffer'] = WebGPU.mgrBuffer.get(
          HEAPU32[(ptr + 32) >> 2]
        );
        return bufferCopyView;
      },
      makePipelineConstants: (constantCount, constantsPtr) => {
        if (!constantCount) return;
        var constants = {};
        for (var i = 0; i < constantCount; ++i) {
          var entryPtr = constantsPtr + 16 * i;
          var key = UTF8ToString(HEAPU32[(entryPtr + 4) >> 2]);
          constants[key] = HEAPF64[(entryPtr + 8) >> 3];
        }
        return constants;
      },
      makePipelineLayout: (layoutPtr) => {
        if (!layoutPtr) return 'auto';
        return WebGPU.mgrPipelineLayout.get(layoutPtr);
      },
      makeProgrammableStageDescriptor: (ptr) => {
        if (!ptr) return undefined;
        var desc = {
          module: WebGPU.mgrShaderModule.get(HEAPU32[(ptr + 4) >> 2]),
          constants: WebGPU.makePipelineConstants(
            HEAPU32[(ptr + 12) >> 2],
            HEAPU32[(ptr + 16) >> 2]
          ),
        };
        var entryPointPtr = HEAPU32[(ptr + 8) >> 2];
        if (entryPointPtr) desc['entryPoint'] = UTF8ToString(entryPointPtr);
        return desc;
      },
      fillLimitStruct: (limits, supportedLimitsOutPtr) => {
        var limitsOutPtr = supportedLimitsOutPtr + 8;
        function setLimitValueU32(name, limitOffset) {
          var limitValue = limits[name];
          HEAP32[(limitsOutPtr + limitOffset) >> 2] = limitValue;
        }
        function setLimitValueU64(name, limitOffset) {
          var limitValue = limits[name];
          (tempI64 = [
            limitValue >>> 0,
            ((tempDouble = limitValue),
            +Math.abs(tempDouble) >= 1
              ? tempDouble > 0
                ? +Math.floor(tempDouble / 4294967296) >>> 0
                : ~~+Math.ceil(
                    (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                  ) >>> 0
              : 0),
          ]),
            (HEAP32[(limitsOutPtr + limitOffset) >> 2] = tempI64[0]),
            (HEAP32[(limitsOutPtr + (limitOffset + 4)) >> 2] = tempI64[1]);
        }
        setLimitValueU32('maxTextureDimension1D', 0);
        setLimitValueU32('maxTextureDimension2D', 4);
        setLimitValueU32('maxTextureDimension3D', 8);
        setLimitValueU32('maxTextureArrayLayers', 12);
        setLimitValueU32('maxBindGroups', 16);
        setLimitValueU32('maxBindGroupsPlusVertexBuffers', 20);
        setLimitValueU32('maxBindingsPerBindGroup', 24);
        setLimitValueU32('maxDynamicUniformBuffersPerPipelineLayout', 28);
        setLimitValueU32('maxDynamicStorageBuffersPerPipelineLayout', 32);
        setLimitValueU32('maxSampledTexturesPerShaderStage', 36);
        setLimitValueU32('maxSamplersPerShaderStage', 40);
        setLimitValueU32('maxStorageBuffersPerShaderStage', 44);
        setLimitValueU32('maxStorageTexturesPerShaderStage', 48);
        setLimitValueU32('maxUniformBuffersPerShaderStage', 52);
        setLimitValueU32('minUniformBufferOffsetAlignment', 72);
        setLimitValueU32('minStorageBufferOffsetAlignment', 76);
        setLimitValueU64('maxUniformBufferBindingSize', 56);
        setLimitValueU64('maxStorageBufferBindingSize', 64);
        setLimitValueU32('maxVertexBuffers', 80);
        setLimitValueU32('maxBufferSize', 88);
        setLimitValueU32('maxVertexAttributes', 96);
        setLimitValueU32('maxVertexBufferArrayStride', 100);
        setLimitValueU32('maxInterStageShaderComponents', 104);
        setLimitValueU32('maxInterStageShaderVariables', 108);
        setLimitValueU32('maxColorAttachments', 112);
        setLimitValueU32('maxColorAttachmentBytesPerSample', 116);
        setLimitValueU32('maxComputeWorkgroupStorageSize', 120);
        setLimitValueU32('maxComputeInvocationsPerWorkgroup', 124);
        setLimitValueU32('maxComputeWorkgroupSizeX', 128);
        setLimitValueU32('maxComputeWorkgroupSizeY', 132);
        setLimitValueU32('maxComputeWorkgroupSizeZ', 136);
        setLimitValueU32('maxComputeWorkgroupsPerDimension', 140);
      },
      Int_BufferMapState: { unmapped: 0, pending: 1, mapped: 2 },
      Int_CompilationMessageType: { error: 0, warning: 1, info: 2 },
      Int_DeviceLostReason: { undefined: 1, unknown: 1, destroyed: 2 },
      Int_PreferredFormat: { rgba8unorm: 18, bgra8unorm: 23 },
      WGSLFeatureName: [
        ,
        'readonly_and_readwrite_storage_textures',
        'packed_4x8_integer_dot_product',
        'unrestricted_pointer_parameters',
        'pointer_composite_access',
      ],
      AddressMode: [, 'clamp-to-edge', 'repeat', 'mirror-repeat'],
      BlendFactor: [
        ,
        'zero',
        'one',
        'src',
        'one-minus-src',
        'src-alpha',
        'one-minus-src-alpha',
        'dst',
        'one-minus-dst',
        'dst-alpha',
        'one-minus-dst-alpha',
        'src-alpha-saturated',
        'constant',
        'one-minus-constant',
      ],
      BlendOperation: [, 'add', 'subtract', 'reverse-subtract', 'min', 'max'],
      BufferBindingType: [, 'uniform', 'storage', 'read-only-storage'],
      BufferMapState: { 1: 'unmapped', 2: 'pending', 3: 'mapped' },
      CompareFunction: [
        ,
        'never',
        'less',
        'equal',
        'less-equal',
        'greater',
        'not-equal',
        'greater-equal',
        'always',
      ],
      CompilationInfoRequestStatus: [
        'success',
        'error',
        'device-lost',
        'unknown',
      ],
      CullMode: [, 'none', 'front', 'back'],
      ErrorFilter: { 1: 'validation', 2: 'out-of-memory', 3: 'internal' },
      FeatureName: [
        ,
        'depth-clip-control',
        'depth32float-stencil8',
        'timestamp-query',
        'texture-compression-bc',
        'texture-compression-etc2',
        'texture-compression-astc',
        'indirect-first-instance',
        'shader-f16',
        'rg11b10ufloat-renderable',
        'bgra8unorm-storage',
        'float32-filterable',
      ],
      FilterMode: [, 'nearest', 'linear'],
      FrontFace: [, 'ccw', 'cw'],
      IndexFormat: [, 'uint16', 'uint32'],
      LoadOp: [, 'clear', 'load'],
      MipmapFilterMode: [, 'nearest', 'linear'],
      PowerPreference: [, 'low-power', 'high-performance'],
      PrimitiveTopology: [
        ,
        'point-list',
        'line-list',
        'line-strip',
        'triangle-list',
        'triangle-strip',
      ],
      QueryType: { 1: 'occlusion', 2: 'timestamp' },
      SamplerBindingType: [, 'filtering', 'non-filtering', 'comparison'],
      StencilOperation: [
        ,
        'keep',
        'zero',
        'replace',
        'invert',
        'increment-clamp',
        'decrement-clamp',
        'increment-wrap',
        'decrement-wrap',
      ],
      StorageTextureAccess: [, 'write-only', 'read-only', 'read-write'],
      StoreOp: [, 'store', 'discard'],
      TextureAspect: [, 'all', 'stencil-only', 'depth-only'],
      TextureDimension: [, '1d', '2d', '3d'],
      TextureFormat: [
        ,
        'r8unorm',
        'r8snorm',
        'r8uint',
        'r8sint',
        'r16uint',
        'r16sint',
        'r16float',
        'rg8unorm',
        'rg8snorm',
        'rg8uint',
        'rg8sint',
        'r32float',
        'r32uint',
        'r32sint',
        'rg16uint',
        'rg16sint',
        'rg16float',
        'rgba8unorm',
        'rgba8unorm-srgb',
        'rgba8snorm',
        'rgba8uint',
        'rgba8sint',
        'bgra8unorm',
        'bgra8unorm-srgb',
        'rgb10a2uint',
        'rgb10a2unorm',
        'rg11b10ufloat',
        'rgb9e5ufloat',
        'rg32float',
        'rg32uint',
        'rg32sint',
        'rgba16uint',
        'rgba16sint',
        'rgba16float',
        'rgba32float',
        'rgba32uint',
        'rgba32sint',
        'stencil8',
        'depth16unorm',
        'depth24plus',
        'depth24plus-stencil8',
        'depth32float',
        'depth32float-stencil8',
        'bc1-rgba-unorm',
        'bc1-rgba-unorm-srgb',
        'bc2-rgba-unorm',
        'bc2-rgba-unorm-srgb',
        'bc3-rgba-unorm',
        'bc3-rgba-unorm-srgb',
        'bc4-r-unorm',
        'bc4-r-snorm',
        'bc5-rg-unorm',
        'bc5-rg-snorm',
        'bc6h-rgb-ufloat',
        'bc6h-rgb-float',
        'bc7-rgba-unorm',
        'bc7-rgba-unorm-srgb',
        'etc2-rgb8unorm',
        'etc2-rgb8unorm-srgb',
        'etc2-rgb8a1unorm',
        'etc2-rgb8a1unorm-srgb',
        'etc2-rgba8unorm',
        'etc2-rgba8unorm-srgb',
        'eac-r11unorm',
        'eac-r11snorm',
        'eac-rg11unorm',
        'eac-rg11snorm',
        'astc-4x4-unorm',
        'astc-4x4-unorm-srgb',
        'astc-5x4-unorm',
        'astc-5x4-unorm-srgb',
        'astc-5x5-unorm',
        'astc-5x5-unorm-srgb',
        'astc-6x5-unorm',
        'astc-6x5-unorm-srgb',
        'astc-6x6-unorm',
        'astc-6x6-unorm-srgb',
        'astc-8x5-unorm',
        'astc-8x5-unorm-srgb',
        'astc-8x6-unorm',
        'astc-8x6-unorm-srgb',
        'astc-8x8-unorm',
        'astc-8x8-unorm-srgb',
        'astc-10x5-unorm',
        'astc-10x5-unorm-srgb',
        'astc-10x6-unorm',
        'astc-10x6-unorm-srgb',
        'astc-10x8-unorm',
        'astc-10x8-unorm-srgb',
        'astc-10x10-unorm',
        'astc-10x10-unorm-srgb',
        'astc-12x10-unorm',
        'astc-12x10-unorm-srgb',
        'astc-12x12-unorm',
        'astc-12x12-unorm-srgb',
      ],
      TextureSampleType: [
        ,
        'float',
        'unfilterable-float',
        'depth',
        'sint',
        'uint',
      ],
      TextureViewDimension: [
        ,
        '1d',
        '2d',
        '2d-array',
        'cube',
        'cube-array',
        '3d',
      ],
      VertexFormat: [
        ,
        'uint8x2',
        'uint8x4',
        'sint8x2',
        'sint8x4',
        'unorm8x2',
        'unorm8x4',
        'snorm8x2',
        'snorm8x4',
        'uint16x2',
        'uint16x4',
        'sint16x2',
        'sint16x4',
        'unorm16x2',
        'unorm16x4',
        'snorm16x2',
        'snorm16x4',
        'float16x2',
        'float16x4',
        'float32',
        'float32x2',
        'float32x3',
        'float32x4',
        'uint32',
        'uint32x2',
        'uint32x3',
        'uint32x4',
        'sint32',
        'sint32x2',
        'sint32x3',
        'sint32x4',
        'unorm10-10-10-2',
      ],
      VertexStepMode: [, 'vertex-buffer-not-used', 'vertex', 'instance'],
      FeatureNameString2Enum: {
        undefined: '0',
        'depth-clip-control': '1',
        'depth32float-stencil8': '2',
        'timestamp-query': '3',
        'texture-compression-bc': '4',
        'texture-compression-etc2': '5',
        'texture-compression-astc': '6',
        'indirect-first-instance': '7',
        'shader-f16': '8',
        'rg11b10ufloat-renderable': '9',
        'bgra8unorm-storage': '10',
        'float32-filterable': '11',
      },
    };
    var _emscripten_webgpu_get_device = () => {
      if (WebGPU.preinitializedDeviceId === undefined) {
        var device = Module['preinitializedWebGPUDevice'];
        var deviceWrapper = {
          queueId: WebGPU.mgrQueue.create(device['queue']),
        };
        WebGPU.preinitializedDeviceId = WebGPU.mgrDevice.create(
          device,
          deviceWrapper
        );
      }
      WebGPU.mgrDevice.reference(WebGPU.preinitializedDeviceId);
      return WebGPU.preinitializedDeviceId;
    };
    var ENV = {};
    var getExecutableName = () => thisProgram || './this.program';
    var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        var lang =
          (
            (typeof navigator == 'object' &&
              navigator.languages &&
              navigator.languages[0]) ||
            'C'
          ).replace('-', '_') + '.UTF-8';
        var env = {
          USER: 'web_user',
          LOGNAME: 'web_user',
          PATH: '/',
          PWD: '/',
          HOME: '/home/web_user',
          LANG: lang,
          _: getExecutableName(),
        };
        for (var x in ENV) {
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
    var stringToAscii = (str, buffer) => {
      for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++] = str.charCodeAt(i);
      }
      HEAP8[buffer] = 0;
    };
    var _environ_get = (__environ, environ_buf) => {
      var bufSize = 0;
      getEnvStrings().forEach((string, i) => {
        var ptr = environ_buf + bufSize;
        HEAPU32[(__environ + i * 4) >> 2] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    };
    var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[penviron_count >> 2] = strings.length;
      var bufSize = 0;
      strings.forEach((string) => (bufSize += string.length + 1));
      HEAPU32[penviron_buf_size >> 2] = bufSize;
      return 0;
    };
    function _fd_close(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.close(stream);
        return 0;
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return e.errno;
      }
    }
    var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[(iov + 4) >> 2];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break;
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
    function _fd_read(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doReadv(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return e.errno;
      }
    }
    function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
      var offset = convertI32PairToI53Checked(offset_low, offset_high);
      try {
        if (isNaN(offset)) return 61;
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.llseek(stream, offset, whence);
        (tempI64 = [
          stream.position >>> 0,
          ((tempDouble = stream.position),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? +Math.floor(tempDouble / 4294967296) >>> 0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0),
        ]),
          (HEAP32[newOffset >> 2] = tempI64[0]),
          (HEAP32[(newOffset + 4) >> 2] = tempI64[1]);
        if (stream.getdents && offset === 0 && whence === 0)
          stream.getdents = null;
        return 0;
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return e.errno;
      }
    }
    var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[(iov + 4) >> 2];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
    function _fd_write(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doWritev(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return e.errno;
      }
    }
    var _getentropy = (buffer, size) => {
      randomFill(HEAPU8.subarray(buffer, buffer + size));
      return 0;
    };
    var _glActiveTexture = (x0) => GLctx.activeTexture(x0);
    var _glAttachShader = (program, shader) => {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
    };
    var _glBindAttribLocation = (program, index, name) => {
      GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
    };
    var _glBindBuffer = (target, buffer) => {
      if (target == 34962) {
        GLctx.currentArrayBufferBinding = buffer;
      } else if (target == 34963) {
        GLctx.currentElementArrayBufferBinding = buffer;
      }
      if (target == 35051) {
        GLctx.currentPixelPackBufferBinding = buffer;
      } else if (target == 35052) {
        GLctx.currentPixelUnpackBufferBinding = buffer;
      }
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    };
    var _glBindFramebuffer = (target, framebuffer) => {
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
    };
    var _glBindTexture = (target, texture) => {
      GLctx.bindTexture(target, GL.textures[texture]);
    };
    var _glBufferData = (target, size, data, usage) => {
      if (GL.currentContext.version >= 2) {
        if (data && size) {
          GLctx.bufferData(target, HEAPU8, usage, data, size);
        } else {
          GLctx.bufferData(target, size, usage);
        }
        return;
      }
      GLctx.bufferData(
        target,
        data ? HEAPU8.subarray(data, data + size) : size,
        usage
      );
    };
    var convertI32PairToI53 = (lo, hi) => (lo >>> 0) + hi * 4294967296;
    var _glClientWaitSync = (sync, flags, timeout_low, timeout_high) => {
      var timeout = convertI32PairToI53(timeout_low, timeout_high);
      return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout);
    };
    var _glCompileShader = (shader) => {
      GLctx.compileShader(GL.shaders[shader]);
    };
    var _glCreateProgram = () => {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      program.name = id;
      program.maxUniformLength =
        program.maxAttributeLength =
        program.maxUniformBlockNameLength =
          0;
      program.uniformIdCounter = 1;
      GL.programs[id] = program;
      return id;
    };
    var _glCreateShader = (shaderType) => {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
      return id;
    };
    var _glDeleteFramebuffers = (n, framebuffers) => {
      for (var i = 0; i < n; ++i) {
        var id = HEAP32[(framebuffers + i * 4) >> 2];
        var framebuffer = GL.framebuffers[id];
        if (!framebuffer) continue;
        GLctx.deleteFramebuffer(framebuffer);
        framebuffer.name = 0;
        GL.framebuffers[id] = null;
      }
    };
    var _glDeleteProgram = (id) => {
      if (!id) return;
      var program = GL.programs[id];
      if (!program) {
        GL.recordError(1281);
        return;
      }
      GLctx.deleteProgram(program);
      program.name = 0;
      GL.programs[id] = null;
    };
    var _glDeleteShader = (id) => {
      if (!id) return;
      var shader = GL.shaders[id];
      if (!shader) {
        GL.recordError(1281);
        return;
      }
      GLctx.deleteShader(shader);
      GL.shaders[id] = null;
    };
    var _glDeleteSync = (id) => {
      if (!id) return;
      var sync = GL.syncs[id];
      if (!sync) {
        GL.recordError(1281);
        return;
      }
      GLctx.deleteSync(sync);
      sync.name = 0;
      GL.syncs[id] = null;
    };
    var _glDeleteTextures = (n, textures) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(textures + i * 4) >> 2];
        var texture = GL.textures[id];
        if (!texture) continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
      }
    };
    var _glDetachShader = (program, shader) => {
      GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
    };
    var _glDisableVertexAttribArray = (index) => {
      var cb = GL.currentContext.clientBuffers[index];
      cb.enabled = false;
      GLctx.disableVertexAttribArray(index);
    };
    var _glDrawArrays = (mode, first, count) => {
      GL.preDrawHandleClientVertexAttribBindings(first + count);
      GLctx.drawArrays(mode, first, count);
      GL.postDrawHandleClientVertexAttribBindings();
    };
    var _glEnableVertexAttribArray = (index) => {
      var cb = GL.currentContext.clientBuffers[index];
      cb.enabled = true;
      GLctx.enableVertexAttribArray(index);
    };
    var _glFenceSync = (condition, flags) => {
      var sync = GLctx.fenceSync(condition, flags);
      if (sync) {
        var id = GL.getNewId(GL.syncs);
        sync.name = id;
        GL.syncs[id] = sync;
        return id;
      }
      return 0;
    };
    var _glFinish = () => GLctx.finish();
    var _glFramebufferTexture2D = (
      target,
      attachment,
      textarget,
      texture,
      level
    ) => {
      GLctx.framebufferTexture2D(
        target,
        attachment,
        textarget,
        GL.textures[texture],
        level
      );
    };
    var _glGenBuffers = (n, buffers) => {
      GL.genObject(n, buffers, 'createBuffer', GL.buffers);
    };
    var _glGenFramebuffers = (n, ids) => {
      GL.genObject(n, ids, 'createFramebuffer', GL.framebuffers);
    };
    var _glGenTextures = (n, textures) => {
      GL.genObject(n, textures, 'createTexture', GL.textures);
    };
    var _glGetError = () => {
      var error = GLctx.getError() || GL.lastError;
      GL.lastError = 0;
      return error;
    };
    var writeI53ToI64 = (ptr, num) => {
      HEAPU32[ptr >> 2] = num;
      var lower = HEAPU32[ptr >> 2];
      HEAPU32[(ptr + 4) >> 2] = (num - lower) / 4294967296;
    };
    var webglGetExtensions = function $webglGetExtensions() {
      var exts = getEmscriptenSupportedExtensions(GLctx);
      exts = exts.concat(exts.map((e) => 'GL_' + e));
      return exts;
    };
    var emscriptenWebGLGet = (name_, p, type) => {
      if (!p) {
        GL.recordError(1281);
        return;
      }
      var ret = undefined;
      switch (name_) {
        case 36346:
          ret = 1;
          break;
        case 36344:
          if (type != 0 && type != 1) {
            GL.recordError(1280);
          }
          return;
        case 34814:
        case 36345:
          ret = 0;
          break;
        case 34466:
          var formats = GLctx.getParameter(34467);
          ret = formats ? formats.length : 0;
          break;
        case 33309:
          if (GL.currentContext.version < 2) {
            GL.recordError(1282);
            return;
          }
          ret = webglGetExtensions().length;
          break;
        case 33307:
        case 33308:
          if (GL.currentContext.version < 2) {
            GL.recordError(1280);
            return;
          }
          ret = name_ == 33307 ? 3 : 0;
          break;
      }
      if (ret === undefined) {
        var result = GLctx.getParameter(name_);
        switch (typeof result) {
          case 'number':
            ret = result;
            break;
          case 'boolean':
            ret = result ? 1 : 0;
            break;
          case 'string':
            GL.recordError(1280);
            return;
          case 'object':
            if (result === null) {
              switch (name_) {
                case 34964:
                case 35725:
                case 34965:
                case 36006:
                case 36007:
                case 32873:
                case 34229:
                case 36662:
                case 36663:
                case 35053:
                case 35055:
                case 36010:
                case 35097:
                case 35869:
                case 32874:
                case 36389:
                case 35983:
                case 35368:
                case 34068: {
                  ret = 0;
                  break;
                }
                default: {
                  GL.recordError(1280);
                  return;
                }
              }
            } else if (
              result instanceof Float32Array ||
              result instanceof Uint32Array ||
              result instanceof Int32Array ||
              result instanceof Array
            ) {
              for (var i = 0; i < result.length; ++i) {
                switch (type) {
                  case 0:
                    HEAP32[(p + i * 4) >> 2] = result[i];
                    break;
                  case 2:
                    HEAPF32[(p + i * 4) >> 2] = result[i];
                    break;
                  case 4:
                    HEAP8[p + i] = result[i] ? 1 : 0;
                    break;
                }
              }
              return;
            } else {
              try {
                ret = result.name | 0;
              } catch (e) {
                GL.recordError(1280);
                err(
                  `GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`
                );
                return;
              }
            }
            break;
          default:
            GL.recordError(1280);
            err(
              `GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof result}!`
            );
            return;
        }
      }
      switch (type) {
        case 1:
          writeI53ToI64(p, ret);
          break;
        case 0:
          HEAP32[p >> 2] = ret;
          break;
        case 2:
          HEAPF32[p >> 2] = ret;
          break;
        case 4:
          HEAP8[p] = ret ? 1 : 0;
          break;
      }
    };
    var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);
    var stringToNewUTF8 = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8(str, ret, size);
      return ret;
    };
    var _glGetString = (name_) => {
      var ret = GL.stringCache[name_];
      if (!ret) {
        switch (name_) {
          case 7939:
            ret = stringToNewUTF8(webglGetExtensions().join(' '));
            break;
          case 7936:
          case 7937:
          case 37445:
          case 37446:
            var s = GLctx.getParameter(name_);
            if (!s) {
              GL.recordError(1280);
            }
            ret = s ? stringToNewUTF8(s) : 0;
            break;
          case 7938:
            var glVersion = GLctx.getParameter(7938);
            if (GL.currentContext.version >= 2)
              glVersion = `OpenGL ES 3.0 (${glVersion})`;
            else {
              glVersion = `OpenGL ES 2.0 (${glVersion})`;
            }
            ret = stringToNewUTF8(glVersion);
            break;
          case 35724:
            var glslVersion = GLctx.getParameter(35724);
            var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
            var ver_num = glslVersion.match(ver_re);
            if (ver_num !== null) {
              if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + '0';
              glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
            }
            ret = stringToNewUTF8(glslVersion);
            break;
          default:
            GL.recordError(1280);
        }
        GL.stringCache[name_] = ret;
      }
      return ret;
    };
    var jstoi_q = (str) => parseInt(str);
    var webglGetLeftBracePos = (name) =>
      name.slice(-1) == ']' && name.lastIndexOf('[');
    var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
      var uniformLocsById = program.uniformLocsById,
        uniformSizeAndIdsByName = program.uniformSizeAndIdsByName,
        i,
        j;
      if (!uniformLocsById) {
        program.uniformLocsById = uniformLocsById = {};
        program.uniformArrayNamesById = {};
        for (i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
          var u = GLctx.getActiveUniform(program, i);
          var nm = u.name;
          var sz = u.size;
          var lb = webglGetLeftBracePos(nm);
          var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
          var id = program.uniformIdCounter;
          program.uniformIdCounter += sz;
          uniformSizeAndIdsByName[arrayName] = [sz, id];
          for (j = 0; j < sz; ++j) {
            uniformLocsById[id] = j;
            program.uniformArrayNamesById[id++] = arrayName;
          }
        }
      }
    };
    var _glGetUniformLocation = (program, name) => {
      name = UTF8ToString(name);
      if ((program = GL.programs[program])) {
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var uniformLocsById = program.uniformLocsById;
        var arrayIndex = 0;
        var uniformBaseName = name;
        var leftBrace = webglGetLeftBracePos(name);
        if (leftBrace > 0) {
          arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
          uniformBaseName = name.slice(0, leftBrace);
        }
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
          arrayIndex += sizeAndId[1];
          if (
            (uniformLocsById[arrayIndex] =
              uniformLocsById[arrayIndex] ||
              GLctx.getUniformLocation(program, name))
          ) {
            return arrayIndex;
          }
        }
      } else {
        GL.recordError(1281);
      }
      return -1;
    };
    var _glLinkProgram = (program) => {
      program = GL.programs[program];
      GLctx.linkProgram(program);
      program.uniformLocsById = 0;
      program.uniformSizeAndIdsByName = {};
    };
    var _glPixelStorei = (pname, param) => {
      if (pname == 3317) {
        GL.unpackAlignment = param;
      } else if (pname == 3314) {
        GL.unpackRowLength = param;
      }
      GLctx.pixelStorei(pname, param);
    };
    var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
      function roundedToNextMultipleOf(x, y) {
        return (x + y - 1) & -y;
      }
      var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
      var alignedRowSize = roundedToNextMultipleOf(
        plainRowSize,
        GL.unpackAlignment
      );
      return height * alignedRowSize;
    };
    var colorChannelsInGlTextureFormat = (format) => {
      var colorChannels = {
        5: 3,
        6: 4,
        8: 2,
        29502: 3,
        29504: 4,
        26917: 2,
        26918: 2,
        29846: 3,
        29847: 4,
      };
      return colorChannels[format - 6402] || 1;
    };
    var heapObjectForWebGLType = (type) => {
      type -= 5120;
      if (type == 0) return HEAP8;
      if (type == 1) return HEAPU8;
      if (type == 2) return HEAP16;
      if (type == 4) return HEAP32;
      if (type == 6) return HEAPF32;
      if (
        type == 5 ||
        type == 28922 ||
        type == 28520 ||
        type == 30779 ||
        type == 30782
      )
        return HEAPU32;
      return HEAPU16;
    };
    var toTypedArrayIndex = (pointer, heap) =>
      pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));
    var emscriptenWebGLGetTexPixelData = (
      type,
      format,
      width,
      height,
      pixels,
      internalFormat
    ) => {
      var heap = heapObjectForWebGLType(type);
      var sizePerPixel =
        colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
      var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
      return heap.subarray(
        toTypedArrayIndex(pixels, heap),
        toTypedArrayIndex(pixels + bytes, heap)
      );
    };
    var _glReadPixels = (x, y, width, height, format, type, pixels) => {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelPackBufferBinding) {
          GLctx.readPixels(x, y, width, height, format, type, pixels);
          return;
        }
        var heap = heapObjectForWebGLType(type);
        var target = toTypedArrayIndex(pixels, heap);
        GLctx.readPixels(x, y, width, height, format, type, heap, target);
        return;
      }
      var pixelData = emscriptenWebGLGetTexPixelData(
        type,
        format,
        width,
        height,
        pixels,
        format
      );
      if (!pixelData) {
        GL.recordError(1280);
        return;
      }
      GLctx.readPixels(x, y, width, height, format, type, pixelData);
    };
    var _glShaderSource = (shader, count, string, length) => {
      var source = GL.getSource(shader, count, string, length);
      GLctx.shaderSource(GL.shaders[shader], source);
    };
    var _glTexImage2D = (
      target,
      level,
      internalFormat,
      width,
      height,
      border,
      format,
      type,
      pixels
    ) => {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texImage2D(
            target,
            level,
            internalFormat,
            width,
            height,
            border,
            format,
            type,
            pixels
          );
          return;
        }
        if (pixels) {
          var heap = heapObjectForWebGLType(type);
          var index = toTypedArrayIndex(pixels, heap);
          GLctx.texImage2D(
            target,
            level,
            internalFormat,
            width,
            height,
            border,
            format,
            type,
            heap,
            index
          );
          return;
        }
      }
      var pixelData = pixels
        ? emscriptenWebGLGetTexPixelData(
            type,
            format,
            width,
            height,
            pixels,
            internalFormat
          )
        : null;
      GLctx.texImage2D(
        target,
        level,
        internalFormat,
        width,
        height,
        border,
        format,
        type,
        pixelData
      );
    };
    var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);
    var _glTexStorage2D = (x0, x1, x2, x3, x4) =>
      GLctx.texStorage2D(x0, x1, x2, x3, x4);
    var webglGetUniformLocation = (location) => {
      var p = GLctx.currentProgram;
      if (p) {
        var webglLoc = p.uniformLocsById[location];
        if (typeof webglLoc == 'number') {
          p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(
            p,
            p.uniformArrayNamesById[location] +
              (webglLoc > 0 ? `[${webglLoc}]` : '')
          );
        }
        return webglLoc;
      } else {
        GL.recordError(1282);
      }
    };
    var _glUniform1i = (location, v0) => {
      GLctx.uniform1i(webglGetUniformLocation(location), v0);
    };
    var _glUseProgram = (program) => {
      program = GL.programs[program];
      GLctx.useProgram(program);
      GLctx.currentProgram = program;
    };
    var _glVertexAttribPointer = (
      index,
      size,
      type,
      normalized,
      stride,
      ptr
    ) => {
      var cb = GL.currentContext.clientBuffers[index];
      if (!GLctx.currentArrayBufferBinding) {
        cb.size = size;
        cb.type = type;
        cb.normalized = normalized;
        cb.stride = stride;
        cb.ptr = ptr;
        cb.clientside = true;
        cb.vertexAttribPointerAdaptor = function (
          index,
          size,
          type,
          normalized,
          stride,
          ptr
        ) {
          this.vertexAttribPointer(index, size, type, normalized, stride, ptr);
        };
        return;
      }
      cb.clientside = false;
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    };
    var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);
    var _wgpuBindGroupLayoutReference = (id) =>
      WebGPU.mgrBindGroupLayout.reference(id);
    var _wgpuBindGroupLayoutRelease = (id) =>
      WebGPU.mgrBindGroupLayout.release(id);
    var _wgpuBindGroupRelease = (id) => WebGPU.mgrBindGroup.release(id);
    var _wgpuBufferDestroy = (bufferId) => {
      var bufferWrapper = WebGPU.mgrBuffer.objects[bufferId];
      if (bufferWrapper.onUnmap) {
        for (var i = 0; i < bufferWrapper.onUnmap.length; ++i) {
          bufferWrapper.onUnmap[i]();
        }
        bufferWrapper.onUnmap = undefined;
      }
      WebGPU.mgrBuffer.get(bufferId).destroy();
    };
    var _wgpuBufferGetMappedRange = (bufferId, offset, size) => {
      var bufferWrapper = WebGPU.mgrBuffer.objects[bufferId];
      if (size === 0)
        warnOnce('getMappedRange size=0 no longer means WGPU_WHOLE_MAP_SIZE');
      if (size == -1) size = undefined;
      if (bufferWrapper.mapMode !== 2) {
        return 0;
      }
      var mapped;
      try {
        mapped = bufferWrapper.object.getMappedRange(offset, size);
      } catch (ex) {
        return 0;
      }
      var data = _memalign(16, mapped.byteLength);
      HEAPU8.fill(0, data, mapped.byteLength);
      bufferWrapper.onUnmap.push(() => {
        new Uint8Array(mapped).set(
          HEAPU8.subarray(data, data + mapped.byteLength)
        );
        _free(data);
      });
      return data;
    };
    var _wgpuBufferGetSize = function (bufferId) {
      var ret = (() => {
        var buffer = WebGPU.mgrBuffer.get(bufferId);
        return buffer.size;
      })();
      return (
        setTempRet0(
          ((tempDouble = ret),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? +Math.floor(tempDouble / 4294967296) >>> 0
              : ~~+Math.ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0)
        ),
        ret >>> 0
      );
    };
    var _wgpuBufferGetUsage = (bufferId) => {
      var buffer = WebGPU.mgrBuffer.get(bufferId);
      return buffer.usage;
    };
    var _wgpuBufferReference = (id) => WebGPU.mgrBuffer.reference(id);
    var _wgpuBufferRelease = (id) => WebGPU.mgrBuffer.release(id);
    var _wgpuBufferUnmap = (bufferId) => {
      var bufferWrapper = WebGPU.mgrBuffer.objects[bufferId];
      if (!bufferWrapper.onUnmap) {
        return;
      }
      for (var i = 0; i < bufferWrapper.onUnmap.length; ++i) {
        bufferWrapper.onUnmap[i]();
      }
      bufferWrapper.onUnmap = undefined;
      bufferWrapper.object.unmap();
    };
    var _wgpuCommandBufferReference = (id) =>
      WebGPU.mgrCommandBuffer.reference(id);
    var _wgpuCommandBufferRelease = (id) => WebGPU.mgrCommandBuffer.release(id);
    var _wgpuCommandEncoderBeginComputePass = (encoderId, descriptor) => {
      var desc;
      function makeComputePassTimestampWrites(twPtr) {
        if (twPtr === 0) return undefined;
        return {
          querySet: WebGPU.mgrQuerySet.get(HEAPU32[twPtr >> 2]),
          beginningOfPassWriteIndex: HEAPU32[(twPtr + 4) >> 2],
          endOfPassWriteIndex: HEAPU32[(twPtr + 8) >> 2],
        };
      }
      if (descriptor) {
        desc = {
          label: undefined,
          timestampWrites: makeComputePassTimestampWrites(
            HEAPU32[(descriptor + 8) >> 2]
          ),
        };
        var labelPtr = HEAPU32[(descriptor + 4) >> 2];
        if (labelPtr) desc['label'] = UTF8ToString(labelPtr);
      }
      var commandEncoder = WebGPU.mgrCommandEncoder.get(encoderId);
      return WebGPU.mgrComputePassEncoder.create(
        commandEncoder.beginComputePass(desc)
      );
    };
    function _wgpuCommandEncoderCopyBufferToBuffer(
      encoderId,
      srcId,
      srcOffset_low,
      srcOffset_high,
      dstId,
      dstOffset_low,
      dstOffset_high,
      size_low,
      size_high
    ) {
      var srcOffset = convertI32PairToI53Checked(srcOffset_low, srcOffset_high);
      var dstOffset = convertI32PairToI53Checked(dstOffset_low, dstOffset_high);
      var size = convertI32PairToI53Checked(size_low, size_high);
      var commandEncoder = WebGPU.mgrCommandEncoder.get(encoderId);
      var src = WebGPU.mgrBuffer.get(srcId);
      var dst = WebGPU.mgrBuffer.get(dstId);
      commandEncoder.copyBufferToBuffer(src, srcOffset, dst, dstOffset, size);
    }
    var _wgpuCommandEncoderCopyTextureToBuffer = (
      encoderId,
      srcPtr,
      dstPtr,
      copySizePtr
    ) => {
      var commandEncoder = WebGPU.mgrCommandEncoder.get(encoderId);
      var copySize = WebGPU.makeExtent3D(copySizePtr);
      commandEncoder.copyTextureToBuffer(
        WebGPU.makeImageCopyTexture(srcPtr),
        WebGPU.makeImageCopyBuffer(dstPtr),
        copySize
      );
    };
    var _wgpuCommandEncoderCopyTextureToTexture = (
      encoderId,
      srcPtr,
      dstPtr,
      copySizePtr
    ) => {
      var commandEncoder = WebGPU.mgrCommandEncoder.get(encoderId);
      var copySize = WebGPU.makeExtent3D(copySizePtr);
      commandEncoder.copyTextureToTexture(
        WebGPU.makeImageCopyTexture(srcPtr),
        WebGPU.makeImageCopyTexture(dstPtr),
        copySize
      );
    };
    var _wgpuCommandEncoderFinish = (encoderId, descriptor) => {
      var commandEncoder = WebGPU.mgrCommandEncoder.get(encoderId);
      return WebGPU.mgrCommandBuffer.create(commandEncoder.finish());
    };
    var _wgpuCommandEncoderRelease = (id) =>
      WebGPU.mgrCommandEncoder.release(id);
    var _wgpuComputePassEncoderDispatchWorkgroups = (passId, x, y, z) => {
      var pass = WebGPU.mgrComputePassEncoder.get(passId);
      pass.dispatchWorkgroups(x, y, z);
    };
    var _wgpuComputePassEncoderEnd = (passId) => {
      var pass = WebGPU.mgrComputePassEncoder.get(passId);
      pass.end();
    };
    var _wgpuComputePassEncoderReference = (id) =>
      WebGPU.mgrComputePassEncoder.reference(id);
    var _wgpuComputePassEncoderRelease = (id) =>
      WebGPU.mgrComputePassEncoder.release(id);
    var _wgpuComputePassEncoderSetBindGroup = (
      passId,
      groupIndex,
      groupId,
      dynamicOffsetCount,
      dynamicOffsetsPtr
    ) => {
      var pass = WebGPU.mgrComputePassEncoder.get(passId);
      var group = WebGPU.mgrBindGroup.get(groupId);
      if (dynamicOffsetCount == 0) {
        pass.setBindGroup(groupIndex, group);
      } else {
        var offsets = [];
        for (var i = 0; i < dynamicOffsetCount; i++, dynamicOffsetsPtr += 4) {
          offsets.push(HEAPU32[dynamicOffsetsPtr >> 2]);
        }
        pass.setBindGroup(groupIndex, group, offsets);
      }
    };
    var _wgpuComputePassEncoderSetPipeline = (passId, pipelineId) => {
      var pass = WebGPU.mgrComputePassEncoder.get(passId);
      var pipeline = WebGPU.mgrComputePipeline.get(pipelineId);
      pass.setPipeline(pipeline);
    };
    var _wgpuComputePipelineReference = (id) =>
      WebGPU.mgrComputePipeline.reference(id);
    var _wgpuComputePipelineRelease = (id) =>
      WebGPU.mgrComputePipeline.release(id);
    var readI53FromI64 = (ptr) =>
      HEAPU32[ptr >> 2] + HEAP32[(ptr + 4) >> 2] * 4294967296;
    var _wgpuDeviceCreateBindGroup = (deviceId, descriptor) => {
      function makeEntry(entryPtr) {
        var bufferId = HEAPU32[(entryPtr + 8) >> 2];
        var samplerId = HEAPU32[(entryPtr + 32) >> 2];
        var textureViewId = HEAPU32[(entryPtr + 36) >> 2];
        var binding = HEAPU32[(entryPtr + 4) >> 2];
        if (bufferId) {
          var size = readI53FromI64(entryPtr + 24);
          if (size == -1) size = undefined;
          return {
            binding: binding,
            resource: {
              buffer: WebGPU.mgrBuffer.get(bufferId),
              offset:
                HEAPU32[(entryPtr + 4 + 16) >> 2] * 4294967296 +
                HEAPU32[(entryPtr + 16) >> 2],
              size: size,
            },
          };
        } else if (samplerId) {
          return {
            binding: binding,
            resource: WebGPU.mgrSampler.get(samplerId),
          };
        } else {
          return {
            binding: binding,
            resource: WebGPU.mgrTextureView.get(textureViewId),
          };
        }
      }
      function makeEntries(count, entriesPtrs) {
        var entries = [];
        for (var i = 0; i < count; ++i) {
          entries.push(makeEntry(entriesPtrs + 40 * i));
        }
        return entries;
      }
      var desc = {
        label: undefined,
        layout: WebGPU.mgrBindGroupLayout.get(HEAPU32[(descriptor + 8) >> 2]),
        entries: makeEntries(
          HEAPU32[(descriptor + 12) >> 2],
          HEAPU32[(descriptor + 16) >> 2]
        ),
      };
      var labelPtr = HEAPU32[(descriptor + 4) >> 2];
      if (labelPtr) desc['label'] = UTF8ToString(labelPtr);
      var device = WebGPU.mgrDevice.get(deviceId);
      return WebGPU.mgrBindGroup.create(device.createBindGroup(desc));
    };
    var _wgpuDeviceCreateBindGroupLayout = (deviceId, descriptor) => {
      function makeBufferEntry(entryPtr) {
        var typeInt = HEAPU32[(entryPtr + 4) >> 2];
        if (!typeInt) return undefined;
        return {
          type: WebGPU.BufferBindingType[typeInt],
          hasDynamicOffset: !!HEAPU32[(entryPtr + 8) >> 2],
          minBindingSize:
            HEAPU32[(entryPtr + 4 + 16) >> 2] * 4294967296 +
            HEAPU32[(entryPtr + 16) >> 2],
        };
      }
      function makeSamplerEntry(entryPtr) {
        var typeInt = HEAPU32[(entryPtr + 4) >> 2];
        if (!typeInt) return undefined;
        return { type: WebGPU.SamplerBindingType[typeInt] };
      }
      function makeTextureEntry(entryPtr) {
        var sampleTypeInt = HEAPU32[(entryPtr + 4) >> 2];
        if (!sampleTypeInt) return undefined;
        return {
          sampleType: WebGPU.TextureSampleType[sampleTypeInt],
          viewDimension:
            WebGPU.TextureViewDimension[HEAPU32[(entryPtr + 8) >> 2]],
          multisampled: !!HEAPU32[(entryPtr + 12) >> 2],
        };
      }
      function makeStorageTextureEntry(entryPtr) {
        var accessInt = HEAPU32[(entryPtr + 4) >> 2];
        if (!accessInt) return undefined;
        return {
          access: WebGPU.StorageTextureAccess[accessInt],
          format: WebGPU.TextureFormat[HEAPU32[(entryPtr + 8) >> 2]],
          viewDimension:
            WebGPU.TextureViewDimension[HEAPU32[(entryPtr + 12) >> 2]],
        };
      }
      function makeEntry(entryPtr) {
        return {
          binding: HEAPU32[(entryPtr + 4) >> 2],
          visibility: HEAPU32[(entryPtr + 8) >> 2],
          buffer: makeBufferEntry(entryPtr + 16),
          sampler: makeSamplerEntry(entryPtr + 40),
          texture: makeTextureEntry(entryPtr + 48),
          storageTexture: makeStorageTextureEntry(entryPtr + 64),
        };
      }
      function makeEntries(count, entriesPtrs) {
        var entries = [];
        for (var i = 0; i < count; ++i) {
          entries.push(makeEntry(entriesPtrs + 80 * i));
        }
        return entries;
      }
      var desc = {
        entries: makeEntries(
          HEAPU32[(descriptor + 8) >> 2],
          HEAPU32[(descriptor + 12) >> 2]
        ),
      };
      var labelPtr = HEAPU32[(descriptor + 4) >> 2];
      if (labelPtr) desc['label'] = UTF8ToString(labelPtr);
      var device = WebGPU.mgrDevice.get(deviceId);
      return WebGPU.mgrBindGroupLayout.create(
        device.createBindGroupLayout(desc)
      );
    };
    var _wgpuDeviceCreateBuffer = (deviceId, descriptor) => {
      var mappedAtCreation = !!HEAPU32[(descriptor + 24) >> 2];
      var desc = {
        label: undefined,
        usage: HEAPU32[(descriptor + 8) >> 2],
        size:
          HEAPU32[(descriptor + 4 + 16) >> 2] * 4294967296 +
          HEAPU32[(descriptor + 16) >> 2],
        mappedAtCreation: mappedAtCreation,
      };
      var labelPtr = HEAPU32[(descriptor + 4) >> 2];
      if (labelPtr) desc['label'] = UTF8ToString(labelPtr);
      var device = WebGPU.mgrDevice.get(deviceId);
      var bufferWrapper = {};
      var id = WebGPU.mgrBuffer.create(
        device.createBuffer(desc),
        bufferWrapper
      );
      if (mappedAtCreation) {
        bufferWrapper.mapMode = 2;
        bufferWrapper.onUnmap = [];
      }
      return id;
    };
    var _wgpuDeviceCreateCommandEncoder = (deviceId, descriptor) => {
      var desc;
      if (descriptor) {
        desc = { label: undefined };
        var labelPtr = HEAPU32[(descriptor + 4) >> 2];
        if (labelPtr) desc['label'] = UTF8ToString(labelPtr);
      }
      var device = WebGPU.mgrDevice.get(deviceId);
      return WebGPU.mgrCommandEncoder.create(device.createCommandEncoder(desc));
    };
    var generateComputePipelineDesc = (descriptor) => {
      var desc = {
        label: undefined,
        layout: WebGPU.makePipelineLayout(HEAPU32[(descriptor + 8) >> 2]),
        compute: WebGPU.makeProgrammableStageDescriptor(descriptor + 12),
      };
      var labelPtr = HEAPU32[(descriptor + 4) >> 2];
      if (labelPtr) desc['label'] = UTF8ToString(labelPtr);
      return desc;
    };
    var _wgpuDeviceCreateComputePipeline = (deviceId, descriptor) => {
      var desc = generateComputePipelineDesc(descriptor);
      var device = WebGPU.mgrDevice.get(deviceId);
      return WebGPU.mgrComputePipeline.create(
        device.createComputePipeline(desc)
      );
    };
    var _wgpuDeviceCreatePipelineLayout = (deviceId, descriptor) => {
      var bglCount = HEAPU32[(descriptor + 8) >> 2];
      var bglPtr = HEAPU32[(descriptor + 12) >> 2];
      var bgls = [];
      for (var i = 0; i < bglCount; ++i) {
        bgls.push(
          WebGPU.mgrBindGroupLayout.get(HEAPU32[(bglPtr + 4 * i) >> 2])
        );
      }
      var desc = { label: undefined, bindGroupLayouts: bgls };
      var labelPtr = HEAPU32[(descriptor + 4) >> 2];
      if (labelPtr) desc['label'] = UTF8ToString(labelPtr);
      var device = WebGPU.mgrDevice.get(deviceId);
      return WebGPU.mgrPipelineLayout.create(device.createPipelineLayout(desc));
    };
    var _wgpuDeviceCreateShaderModule = (deviceId, descriptor) => {
      var nextInChainPtr = HEAPU32[descriptor >> 2];
      var sType = HEAPU32[(nextInChainPtr + 4) >> 2];
      var desc = { label: undefined, code: '' };
      var labelPtr = HEAPU32[(descriptor + 4) >> 2];
      if (labelPtr) desc['label'] = UTF8ToString(labelPtr);
      switch (sType) {
        case 5: {
          var count = HEAPU32[(nextInChainPtr + 8) >> 2];
          var start = HEAPU32[(nextInChainPtr + 12) >> 2];
          var offset = start >> 2;
          desc['code'] = HEAPU32.subarray(offset, offset + count);
          break;
        }
        case 6: {
          var sourcePtr = HEAPU32[(nextInChainPtr + 8) >> 2];
          if (sourcePtr) {
            desc['code'] = UTF8ToString(sourcePtr);
          }
          break;
        }
      }
      var device = WebGPU.mgrDevice.get(deviceId);
      return WebGPU.mgrShaderModule.create(device.createShaderModule(desc));
    };
    var _wgpuDeviceCreateTexture = (deviceId, descriptor) => {
      var desc = {
        label: undefined,
        size: WebGPU.makeExtent3D(descriptor + 16),
        mipLevelCount: HEAPU32[(descriptor + 32) >> 2],
        sampleCount: HEAPU32[(descriptor + 36) >> 2],
        dimension: WebGPU.TextureDimension[HEAPU32[(descriptor + 12) >> 2]],
        format: WebGPU.TextureFormat[HEAPU32[(descriptor + 28) >> 2]],
        usage: HEAPU32[(descriptor + 8) >> 2],
      };
      var labelPtr = HEAPU32[(descriptor + 4) >> 2];
      if (labelPtr) desc['label'] = UTF8ToString(labelPtr);
      var viewFormatCount = HEAPU32[(descriptor + 40) >> 2];
      if (viewFormatCount) {
        var viewFormatsPtr = HEAPU32[(descriptor + 44) >> 2];
        desc['viewFormats'] = Array.from(
          HEAP32.subarray(
            viewFormatsPtr >> 2,
            (viewFormatsPtr + viewFormatCount * 4) >> 2
          ),
          function (format) {
            return WebGPU.TextureFormat[format];
          }
        );
      }
      var device = WebGPU.mgrDevice.get(deviceId);
      return WebGPU.mgrTexture.create(device.createTexture(desc));
    };
    var _wgpuDeviceEnumerateFeatures = (deviceId, featuresOutPtr) => {
      var device = WebGPU.mgrDevice.get(deviceId);
      if (featuresOutPtr !== 0) {
        var offset = 0;
        device.features.forEach((feature) => {
          var featureEnumValue = WebGPU.FeatureNameString2Enum[feature];
          HEAP32[(featuresOutPtr + offset) >> 2] = featureEnumValue;
          offset += 4;
        });
      }
      return device.features.size;
    };
    var _wgpuDeviceGetLimits = (deviceId, limitsOutPtr) => {
      var device = WebGPU.mgrDevice.objects[deviceId].object;
      WebGPU.fillLimitStruct(device.limits, limitsOutPtr);
      return 1;
    };
    var _wgpuDeviceGetQueue = (deviceId) => {
      var queueId = WebGPU.mgrDevice.objects[deviceId].queueId;
      WebGPU.mgrQueue.reference(queueId);
      return queueId;
    };
    var _wgpuDeviceHasFeature = (deviceId, featureEnumValue) => {
      var device = WebGPU.mgrDevice.get(deviceId);
      return device.features.has(WebGPU.FeatureName[featureEnumValue]);
    };
    var _wgpuDeviceReference = (id) => WebGPU.mgrDevice.reference(id);
    var _wgpuDeviceRelease = (id) => WebGPU.mgrDevice.release(id);
    var _wgpuPipelineLayoutReference = (id) =>
      WebGPU.mgrPipelineLayout.reference(id);
    var _wgpuPipelineLayoutRelease = (id) =>
      WebGPU.mgrPipelineLayout.release(id);
    var _wgpuQueueRelease = (id) => WebGPU.mgrQueue.release(id);
    var _wgpuQueueSubmit = (queueId, commandCount, commands) => {
      var queue = WebGPU.mgrQueue.get(queueId);
      var cmds = Array.from(
        HEAP32.subarray(commands >> 2, (commands + commandCount * 4) >> 2),
        (id) => WebGPU.mgrCommandBuffer.get(id)
      );
      queue.submit(cmds);
    };
    function _wgpuQueueWriteBuffer(
      queueId,
      bufferId,
      bufferOffset_low,
      bufferOffset_high,
      data,
      size
    ) {
      var bufferOffset = convertI32PairToI53Checked(
        bufferOffset_low,
        bufferOffset_high
      );
      var queue = WebGPU.mgrQueue.get(queueId);
      var buffer = WebGPU.mgrBuffer.get(bufferId);
      var subarray = HEAPU8.subarray(data, data + size);
      queue.writeBuffer(buffer, bufferOffset, subarray, 0, size);
    }
    var _wgpuQueueWriteTexture = (
      queueId,
      destinationPtr,
      data,
      dataSize,
      dataLayoutPtr,
      writeSizePtr
    ) => {
      var queue = WebGPU.mgrQueue.get(queueId);
      var destination = WebGPU.makeImageCopyTexture(destinationPtr);
      var dataLayout = WebGPU.makeTextureDataLayout(dataLayoutPtr);
      var writeSize = WebGPU.makeExtent3D(writeSizePtr);
      var subarray = HEAPU8.subarray(data, data + dataSize);
      queue.writeTexture(destination, subarray, dataLayout, writeSize);
    };
    var _wgpuSamplerReference = (id) => WebGPU.mgrSampler.reference(id);
    var _wgpuSamplerRelease = (id) => WebGPU.mgrSampler.release(id);
    var _wgpuShaderModuleRelease = (id) => WebGPU.mgrShaderModule.release(id);
    var _wgpuTextureCreateView = (textureId, descriptor) => {
      var desc;
      if (descriptor) {
        var mipLevelCount = HEAPU32[(descriptor + 20) >> 2];
        var arrayLayerCount = HEAPU32[(descriptor + 28) >> 2];
        desc = {
          format: WebGPU.TextureFormat[HEAPU32[(descriptor + 8) >> 2]],
          dimension:
            WebGPU.TextureViewDimension[HEAPU32[(descriptor + 12) >> 2]],
          baseMipLevel: HEAPU32[(descriptor + 16) >> 2],
          mipLevelCount:
            mipLevelCount === 4294967295 ? undefined : mipLevelCount,
          baseArrayLayer: HEAPU32[(descriptor + 24) >> 2],
          arrayLayerCount:
            arrayLayerCount === 4294967295 ? undefined : arrayLayerCount,
          aspect: WebGPU.TextureAspect[HEAPU32[(descriptor + 32) >> 2]],
        };
        var labelPtr = HEAPU32[(descriptor + 4) >> 2];
        if (labelPtr) desc['label'] = UTF8ToString(labelPtr);
      }
      var texture = WebGPU.mgrTexture.get(textureId);
      return WebGPU.mgrTextureView.create(texture.createView(desc));
    };
    var _wgpuTextureGetDepthOrArrayLayers = (textureId) => {
      var texture = WebGPU.mgrTexture.get(textureId);
      return texture.depthOrArrayLayers;
    };
    var _wgpuTextureGetFormat = (textureId) => {
      var texture = WebGPU.mgrTexture.get(textureId);
      return WebGPU.TextureFormat.indexOf(texture.format);
    };
    var _wgpuTextureGetHeight = (textureId) => {
      var texture = WebGPU.mgrTexture.get(textureId);
      return texture.height;
    };
    var _wgpuTextureGetWidth = (textureId) => {
      var texture = WebGPU.mgrTexture.get(textureId);
      return texture.width;
    };
    var _wgpuTextureReference = (id) => WebGPU.mgrTexture.reference(id);
    var _wgpuTextureRelease = (id) => WebGPU.mgrTexture.release(id);
    var _wgpuTextureViewReference = (id) => WebGPU.mgrTextureView.reference(id);
    var _wgpuTextureViewRelease = (id) => WebGPU.mgrTextureView.release(id);
    var getCFunc = (ident) => {
      var func = Module['_' + ident];
      return func;
    };
    var writeArrayToMemory = (array, buffer) => {
      HEAP8.set(array, buffer);
    };
    var ccall = (ident, returnType, argTypes, args, opts) => {
      var toC = {
        string: (str) => {
          var ret = 0;
          if (str !== null && str !== undefined && str !== 0) {
            ret = stringToUTF8OnStack(str);
          }
          return ret;
        },
        array: (arr) => {
          var ret = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret);
          return ret;
        },
      };
      function convertReturnValue(ret) {
        if (returnType === 'string') {
          return UTF8ToString(ret);
        }
        if (returnType === 'boolean') return Boolean(ret);
        return ret;
      }
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var previousAsync = Asyncify.currData;
      var ret = func(...cArgs);
      function onDone(ret) {
        runtimeKeepalivePop();
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
      }
      var asyncMode = opts?.async;
      runtimeKeepalivePush();
      if (Asyncify.currData != previousAsync) {
        return Asyncify.whenDone().then(onDone);
      }
      ret = onDone(ret);
      if (asyncMode) return Promise.resolve(ret);
      return ret;
    };
    var FS_createPath = FS.createPath;
    var FS_unlink = (path) => FS.unlink(path);
    var FS_createLazyFile = FS.createLazyFile;
    var FS_createDevice = FS.createDevice;
    Module['requestFullscreen'] = Browser.requestFullscreen;
    Module['requestAnimationFrame'] = Browser.requestAnimationFrame;
    Module['setCanvasSize'] = Browser.setCanvasSize;
    Module['pauseMainLoop'] = Browser.mainLoop.pause;
    Module['resumeMainLoop'] = Browser.mainLoop.resume;
    Module['getUserMedia'] = Browser.getUserMedia;
    Module['createContext'] = Browser.createContext;
    var preloadedImages = {};
    var preloadedAudios = {};
    FS.createPreloadedFile = FS_createPreloadedFile;
    FS.staticInit();
    Module['FS_createPath'] = FS.createPath;
    Module['FS_createDataFile'] = FS.createDataFile;
    Module['FS_createPreloadedFile'] = FS.createPreloadedFile;
    Module['FS_unlink'] = FS.unlink;
    Module['FS_createLazyFile'] = FS.createLazyFile;
    Module['FS_createDevice'] = FS.createDevice;
    embind_init_charCodes();
    BindingError = Module['BindingError'] = class BindingError extends Error {
      constructor(message) {
        super(message);
        this.name = 'BindingError';
      }
    };
    InternalError = Module['InternalError'] = class InternalError extends (
      Error
    ) {
      constructor(message) {
        super(message);
        this.name = 'InternalError';
      }
    };
    init_emval();
    UnboundTypeError = Module['UnboundTypeError'] = extendError(
      Error,
      'UnboundTypeError'
    );
    var GLctx;
    WebGPU.initManagers();
    var wasmImports = {
      yc: CreateComputePipelineAsyncJs,
      xc: GetAdapterArchitecture,
      wc: GetAdapterDescription,
      vc: GetAdapterDeviceName,
      uc: GetAdapterVendor,
      tc: HaveOffsetConverter,
      sc: JsGetDeviceMaxSubgroupSize,
      rc: JsGetDeviceMinSubgroupSize,
      qc: JsOnEmptyPacketListener,
      V: JsOnSimpleListenerBinaryArray,
      pc: JsOnSimpleListenerBool,
      oc: JsOnSimpleListenerDouble,
      nc: JsOnSimpleListenerFloat,
      mc: JsOnSimpleListenerInt,
      lc: JsOnSimpleListenerString,
      kc: JsOnSimpleListenerUint,
      h: JsOnVectorFinishedListener,
      jc: JsOnVectorListenerBool,
      ic: JsOnVectorListenerDouble,
      hc: JsOnVectorListenerFloat,
      gc: JsOnVectorListenerInt,
      fc: JsOnVectorListenerProto,
      ec: JsOnVectorListenerString,
      dc: JsOnVectorListenerUint,
      B: JsWrapErrorListener,
      c: JsWrapSimpleListeners,
      A: ReadBufferDataJs,
      U: UseBottomLeftGpuOrigin,
      cc: WaitUntilCompletedJs,
      T: WaitUntilPipelineCreatedJs,
      zc: __asyncjs__CallReadDataFn,
      Xa: __asyncjs__mediapipe_map_buffer_jspi,
      bc: ___syscall_dup,
      ac: ___syscall_faccessat,
      S: ___syscall_fcntl64,
      $b: ___syscall_fstat64,
      _b: ___syscall_ioctl,
      Zb: ___syscall_newfstatat,
      R: ___syscall_openat,
      Yb: ___syscall_stat64,
      Tb: __abort_js,
      tb: __embind_register_bigint,
      Sb: __embind_register_bool,
      Rb: __embind_register_emval,
      Q: __embind_register_float,
      P: __embind_register_function,
      g: __embind_register_integer,
      a: __embind_register_memory_view,
      O: __embind_register_std_string,
      x: __embind_register_std_wstring,
      Qb: __embind_register_void,
      Pb: __emscripten_get_now_is_monotonic,
      Ob: __emscripten_memcpy_js,
      j: __emval_decref,
      w: __emval_incref,
      Nb: __emval_take_value,
      qb: __gmtime_js,
      rb: __localtime_js,
      sb: __mktime_js,
      ob: __mmap_js,
      pb: __munmap_js,
      Mb: __tzset_js,
      Lb: custom_emscripten_dbgn,
      o: _emscripten_asm_const_int,
      Kb: _emscripten_date_now,
      v: _emscripten_errn,
      Jb: _emscripten_get_heap_max,
      b: _emscripten_get_now,
      Ib: _emscripten_has_asyncify,
      Hb: _emscripten_outn,
      Gb: _emscripten_pc_get_function,
      Fb: _emscripten_resize_heap,
      Eb: _emscripten_stack_snapshot,
      Db: _emscripten_stack_unwind_buffer,
      Cb: _emscripten_webgl_create_context,
      Bb: _emscripten_webgl_destroy_context,
      Ab: _emscripten_webgl_get_context_attributes,
      N: _emscripten_webgl_get_current_context,
      zb: _emscripten_webgl_make_context_current,
      yb: _emscripten_webgpu_get_device,
      Xb: _environ_get,
      Wb: _environ_sizes_get,
      xb: _exit,
      z: _fd_close,
      Vb: _fd_read,
      nb: _fd_seek,
      y: _fd_write,
      mb: _getentropy,
      u: _glActiveTexture,
      M: _glAttachShader,
      lb: _glBindAttribLocation,
      f: _glBindBuffer,
      n: _glBindFramebuffer,
      e: _glBindTexture,
      t: _glBufferData,
      i: _glClientWaitSync,
      kb: _glCompileShader,
      jb: _glCreateProgram,
      ib: _glCreateShader,
      hb: _glDeleteFramebuffers,
      gb: _glDeleteProgram,
      L: _glDeleteShader,
      m: _glDeleteSync,
      fb: _glDeleteTextures,
      K: _glDetachShader,
      J: _glDisableVertexAttribArray,
      eb: _glDrawArrays,
      I: _glEnableVertexAttribArray,
      H: _glFenceSync,
      l: _glFinish,
      s: _glFramebufferTexture2D,
      G: _glGenBuffers,
      db: _glGenFramebuffers,
      r: _glGenTextures,
      k: _glGetError,
      F: _glGetIntegerv,
      q: _glGetString,
      cb: _glGetUniformLocation,
      bb: _glLinkProgram,
      p: _glPixelStorei,
      E: _glReadPixels,
      ab: _glShaderSource,
      $a: _glTexImage2D,
      d: _glTexParameteri,
      D: _glTexStorage2D,
      _a: _glUniform1i,
      Za: _glUseProgram,
      C: _glVertexAttribPointer,
      Ya: _glViewport,
      Ub: _proc_exit,
      Wa: _wgpuBindGroupLayoutReference,
      Va: _wgpuBindGroupLayoutRelease,
      Ua: _wgpuBindGroupRelease,
      Ta: _wgpuBufferDestroy,
      Sa: _wgpuBufferGetMappedRange,
      wb: _wgpuBufferGetSize,
      Ra: _wgpuBufferGetUsage,
      Qa: _wgpuBufferReference,
      Pa: _wgpuBufferRelease,
      Oa: _wgpuBufferUnmap,
      Na: _wgpuCommandBufferReference,
      Ma: _wgpuCommandBufferRelease,
      La: _wgpuCommandEncoderBeginComputePass,
      vb: _wgpuCommandEncoderCopyBufferToBuffer,
      Ka: _wgpuCommandEncoderCopyTextureToBuffer,
      Ja: _wgpuCommandEncoderCopyTextureToTexture,
      Ia: _wgpuCommandEncoderFinish,
      Ha: _wgpuCommandEncoderRelease,
      Ga: _wgpuComputePassEncoderDispatchWorkgroups,
      Fa: _wgpuComputePassEncoderEnd,
      Ea: _wgpuComputePassEncoderReference,
      Da: _wgpuComputePassEncoderRelease,
      Ca: _wgpuComputePassEncoderSetBindGroup,
      Ba: _wgpuComputePassEncoderSetPipeline,
      Aa: _wgpuComputePipelineReference,
      za: _wgpuComputePipelineRelease,
      ya: _wgpuDeviceCreateBindGroup,
      xa: _wgpuDeviceCreateBindGroupLayout,
      wa: _wgpuDeviceCreateBuffer,
      va: _wgpuDeviceCreateCommandEncoder,
      ua: _wgpuDeviceCreateComputePipeline,
      ta: _wgpuDeviceCreatePipelineLayout,
      sa: _wgpuDeviceCreateShaderModule,
      ra: _wgpuDeviceCreateTexture,
      qa: _wgpuDeviceEnumerateFeatures,
      pa: _wgpuDeviceGetLimits,
      oa: _wgpuDeviceGetQueue,
      na: _wgpuDeviceHasFeature,
      ma: _wgpuDeviceReference,
      la: _wgpuDeviceRelease,
      ka: _wgpuPipelineLayoutReference,
      ja: _wgpuPipelineLayoutRelease,
      ia: _wgpuQueueRelease,
      ha: _wgpuQueueSubmit,
      ub: _wgpuQueueWriteBuffer,
      ga: _wgpuQueueWriteTexture,
      fa: _wgpuSamplerReference,
      ea: _wgpuSamplerRelease,
      da: _wgpuShaderModuleRelease,
      ca: _wgpuTextureCreateView,
      ba: _wgpuTextureGetDepthOrArrayLayers,
      aa: _wgpuTextureGetFormat,
      $: _wgpuTextureGetHeight,
      _: _wgpuTextureGetWidth,
      Z: _wgpuTextureReference,
      Y: _wgpuTextureRelease,
      X: _wgpuTextureViewReference,
      W: _wgpuTextureViewRelease,
    };
    var wasmExports = createWasm();
    var ___wasm_call_ctors = () => (___wasm_call_ctors = wasmExports['Bc'])();
    var _free = (Module['_free'] = (a0) =>
      (_free = Module['_free'] = wasmExports['Dc'])(a0));
    var _registerModelResourcesGraphService = (Module[
      '_registerModelResourcesGraphService'
    ] = () =>
      (_registerModelResourcesGraphService = Module[
        '_registerModelResourcesGraphService'
      ] =
        wasmExports['Ec'])());
    var _malloc = (Module['_malloc'] = (a0) =>
      (_malloc = Module['_malloc'] = wasmExports['Fc'])(a0));
    var _bindTextureToStream = (Module['_bindTextureToStream'] = (a0) =>
      (_bindTextureToStream = Module['_bindTextureToStream'] =
        wasmExports['Gc'])(a0));
    var _addBoundTextureToStream = (Module['_addBoundTextureToStream'] = (
      a0,
      a1,
      a2,
      a3
    ) =>
      (_addBoundTextureToStream = Module['_addBoundTextureToStream'] =
        wasmExports['Hc'])(a0, a1, a2, a3));
    var _addDoubleToInputStream = (Module['_addDoubleToInputStream'] = (
      a0,
      a1,
      a2
    ) =>
      (_addDoubleToInputStream = Module['_addDoubleToInputStream'] =
        wasmExports['Ic'])(a0, a1, a2));
    var _addFloatToInputStream = (Module['_addFloatToInputStream'] = (
      a0,
      a1,
      a2
    ) =>
      (_addFloatToInputStream = Module['_addFloatToInputStream'] =
        wasmExports['Jc'])(a0, a1, a2));
    var _addBoolToInputStream = (Module['_addBoolToInputStream'] = (
      a0,
      a1,
      a2
    ) =>
      (_addBoolToInputStream = Module['_addBoolToInputStream'] =
        wasmExports['Kc'])(a0, a1, a2));
    var _addIntToInputStream = (Module['_addIntToInputStream'] = (a0, a1, a2) =>
      (_addIntToInputStream = Module['_addIntToInputStream'] =
        wasmExports['Lc'])(a0, a1, a2));
    var _addUintToInputStream = (Module['_addUintToInputStream'] = (
      a0,
      a1,
      a2
    ) =>
      (_addUintToInputStream = Module['_addUintToInputStream'] =
        wasmExports['Mc'])(a0, a1, a2));
    var _addStringToInputStream = (Module['_addStringToInputStream'] = (
      a0,
      a1,
      a2
    ) =>
      (_addStringToInputStream = Module['_addStringToInputStream'] =
        wasmExports['Nc'])(a0, a1, a2));
    var _addRawDataSpanToInputStream = (Module['_addRawDataSpanToInputStream'] =
      (a0, a1, a2, a3) =>
        (_addRawDataSpanToInputStream = Module['_addRawDataSpanToInputStream'] =
          wasmExports['Oc'])(a0, a1, a2, a3));
    var _allocateBoolVector = (Module['_allocateBoolVector'] = (a0) =>
      (_allocateBoolVector = Module['_allocateBoolVector'] = wasmExports['Pc'])(
        a0
      ));
    var _allocateFloatVector = (Module['_allocateFloatVector'] = (a0) =>
      (_allocateFloatVector = Module['_allocateFloatVector'] =
        wasmExports['Qc'])(a0));
    var _allocateDoubleVector = (Module['_allocateDoubleVector'] = (a0) =>
      (_allocateDoubleVector = Module['_allocateDoubleVector'] =
        wasmExports['Rc'])(a0));
    var _allocateIntVector = (Module['_allocateIntVector'] = (a0) =>
      (_allocateIntVector = Module['_allocateIntVector'] = wasmExports['Sc'])(
        a0
      ));
    var _allocateUintVector = (Module['_allocateUintVector'] = (a0) =>
      (_allocateUintVector = Module['_allocateUintVector'] = wasmExports['Tc'])(
        a0
      ));
    var _allocateStringVector = (Module['_allocateStringVector'] = (a0) =>
      (_allocateStringVector = Module['_allocateStringVector'] =
        wasmExports['Uc'])(a0));
    var _addBoolVectorEntry = (Module['_addBoolVectorEntry'] = (a0, a1) =>
      (_addBoolVectorEntry = Module['_addBoolVectorEntry'] = wasmExports['Vc'])(
        a0,
        a1
      ));
    var _addFloatVectorEntry = (Module['_addFloatVectorEntry'] = (a0, a1) =>
      (_addFloatVectorEntry = Module['_addFloatVectorEntry'] =
        wasmExports['Wc'])(a0, a1));
    var _addDoubleVectorEntry = (Module['_addDoubleVectorEntry'] = (a0, a1) =>
      (_addDoubleVectorEntry = Module['_addDoubleVectorEntry'] =
        wasmExports['Xc'])(a0, a1));
    var _addIntVectorEntry = (Module['_addIntVectorEntry'] = (a0, a1) =>
      (_addIntVectorEntry = Module['_addIntVectorEntry'] = wasmExports['Yc'])(
        a0,
        a1
      ));
    var _addUintVectorEntry = (Module['_addUintVectorEntry'] = (a0, a1) =>
      (_addUintVectorEntry = Module['_addUintVectorEntry'] = wasmExports['Zc'])(
        a0,
        a1
      ));
    var _addStringVectorEntry = (Module['_addStringVectorEntry'] = (a0, a1) =>
      (_addStringVectorEntry = Module['_addStringVectorEntry'] =
        wasmExports['_c'])(a0, a1));
    var _addBoolVectorToInputStream = (Module['_addBoolVectorToInputStream'] = (
      a0,
      a1,
      a2
    ) =>
      (_addBoolVectorToInputStream = Module['_addBoolVectorToInputStream'] =
        wasmExports['$c'])(a0, a1, a2));
    var _addFloatVectorToInputStream = (Module['_addFloatVectorToInputStream'] =
      (a0, a1, a2) =>
        (_addFloatVectorToInputStream = Module['_addFloatVectorToInputStream'] =
          wasmExports['ad'])(a0, a1, a2));
    var _addDoubleVectorToInputStream = (Module[
      '_addDoubleVectorToInputStream'
    ] = (a0, a1, a2) =>
      (_addDoubleVectorToInputStream = Module['_addDoubleVectorToInputStream'] =
        wasmExports['bd'])(a0, a1, a2));
    var _addIntVectorToInputStream = (Module['_addIntVectorToInputStream'] = (
      a0,
      a1,
      a2
    ) =>
      (_addIntVectorToInputStream = Module['_addIntVectorToInputStream'] =
        wasmExports['cd'])(a0, a1, a2));
    var _addUintVectorToInputStream = (Module['_addUintVectorToInputStream'] = (
      a0,
      a1,
      a2
    ) =>
      (_addUintVectorToInputStream = Module['_addUintVectorToInputStream'] =
        wasmExports['dd'])(a0, a1, a2));
    var _addStringVectorToInputStream = (Module[
      '_addStringVectorToInputStream'
    ] = (a0, a1, a2) =>
      (_addStringVectorToInputStream = Module['_addStringVectorToInputStream'] =
        wasmExports['ed'])(a0, a1, a2));
    var _addFlatHashMapToInputStream = (Module['_addFlatHashMapToInputStream'] =
      (a0, a1, a2, a3, a4) =>
        (_addFlatHashMapToInputStream = Module['_addFlatHashMapToInputStream'] =
          wasmExports['fd'])(a0, a1, a2, a3, a4));
    var _addProtoToInputStream = (Module['_addProtoToInputStream'] = (
      a0,
      a1,
      a2,
      a3,
      a4
    ) =>
      (_addProtoToInputStream = Module['_addProtoToInputStream'] =
        wasmExports['gd'])(a0, a1, a2, a3, a4));
    var _addEmptyPacketToInputStream = (Module['_addEmptyPacketToInputStream'] =
      (a0, a1) =>
        (_addEmptyPacketToInputStream = Module['_addEmptyPacketToInputStream'] =
          wasmExports['hd'])(a0, a1));
    var _addBoolToInputSidePacket = (Module['_addBoolToInputSidePacket'] = (
      a0,
      a1
    ) =>
      (_addBoolToInputSidePacket = Module['_addBoolToInputSidePacket'] =
        wasmExports['id'])(a0, a1));
    var _addDoubleToInputSidePacket = (Module['_addDoubleToInputSidePacket'] = (
      a0,
      a1
    ) =>
      (_addDoubleToInputSidePacket = Module['_addDoubleToInputSidePacket'] =
        wasmExports['jd'])(a0, a1));
    var _addFloatToInputSidePacket = (Module['_addFloatToInputSidePacket'] = (
      a0,
      a1
    ) =>
      (_addFloatToInputSidePacket = Module['_addFloatToInputSidePacket'] =
        wasmExports['kd'])(a0, a1));
    var _addIntToInputSidePacket = (Module['_addIntToInputSidePacket'] = (
      a0,
      a1
    ) =>
      (_addIntToInputSidePacket = Module['_addIntToInputSidePacket'] =
        wasmExports['ld'])(a0, a1));
    var _addUintToInputSidePacket = (Module['_addUintToInputSidePacket'] = (
      a0,
      a1
    ) =>
      (_addUintToInputSidePacket = Module['_addUintToInputSidePacket'] =
        wasmExports['md'])(a0, a1));
    var _addStringToInputSidePacket = (Module['_addStringToInputSidePacket'] = (
      a0,
      a1
    ) =>
      (_addStringToInputSidePacket = Module['_addStringToInputSidePacket'] =
        wasmExports['nd'])(a0, a1));
    var _addRawDataSpanToInputSidePacket = (Module[
      '_addRawDataSpanToInputSidePacket'
    ] = (a0, a1, a2) =>
      (_addRawDataSpanToInputSidePacket = Module[
        '_addRawDataSpanToInputSidePacket'
      ] =
        wasmExports['od'])(a0, a1, a2));
    var _addProtoToInputSidePacket = (Module['_addProtoToInputSidePacket'] = (
      a0,
      a1,
      a2,
      a3
    ) =>
      (_addProtoToInputSidePacket = Module['_addProtoToInputSidePacket'] =
        wasmExports['pd'])(a0, a1, a2, a3));
    var _addBoolVectorToInputSidePacket = (Module[
      '_addBoolVectorToInputSidePacket'
    ] = (a0, a1) =>
      (_addBoolVectorToInputSidePacket = Module[
        '_addBoolVectorToInputSidePacket'
      ] =
        wasmExports['qd'])(a0, a1));
    var _addDoubleVectorToInputSidePacket = (Module[
      '_addDoubleVectorToInputSidePacket'
    ] = (a0, a1) =>
      (_addDoubleVectorToInputSidePacket = Module[
        '_addDoubleVectorToInputSidePacket'
      ] =
        wasmExports['rd'])(a0, a1));
    var _addFloatVectorToInputSidePacket = (Module[
      '_addFloatVectorToInputSidePacket'
    ] = (a0, a1) =>
      (_addFloatVectorToInputSidePacket = Module[
        '_addFloatVectorToInputSidePacket'
      ] =
        wasmExports['sd'])(a0, a1));
    var _addIntVectorToInputSidePacket = (Module[
      '_addIntVectorToInputSidePacket'
    ] = (a0, a1) =>
      (_addIntVectorToInputSidePacket = Module[
        '_addIntVectorToInputSidePacket'
      ] =
        wasmExports['td'])(a0, a1));
    var _addUintVectorToInputSidePacket = (Module[
      '_addUintVectorToInputSidePacket'
    ] = (a0, a1) =>
      (_addUintVectorToInputSidePacket = Module[
        '_addUintVectorToInputSidePacket'
      ] =
        wasmExports['ud'])(a0, a1));
    var _addStringVectorToInputSidePacket = (Module[
      '_addStringVectorToInputSidePacket'
    ] = (a0, a1) =>
      (_addStringVectorToInputSidePacket = Module[
        '_addStringVectorToInputSidePacket'
      ] =
        wasmExports['vd'])(a0, a1));
    var _attachBoolListener = (Module['_attachBoolListener'] = (a0) =>
      (_attachBoolListener = Module['_attachBoolListener'] = wasmExports['wd'])(
        a0
      ));
    var _attachBoolVectorListener = (Module['_attachBoolVectorListener'] = (
      a0
    ) =>
      (_attachBoolVectorListener = Module['_attachBoolVectorListener'] =
        wasmExports['xd'])(a0));
    var _attachDoubleListener = (Module['_attachDoubleListener'] = (a0) =>
      (_attachDoubleListener = Module['_attachDoubleListener'] =
        wasmExports['yd'])(a0));
    var _attachDoubleVectorListener = (Module['_attachDoubleVectorListener'] = (
      a0
    ) =>
      (_attachDoubleVectorListener = Module['_attachDoubleVectorListener'] =
        wasmExports['zd'])(a0));
    var _attachFloatListener = (Module['_attachFloatListener'] = (a0) =>
      (_attachFloatListener = Module['_attachFloatListener'] =
        wasmExports['Ad'])(a0));
    var _attachFloatVectorListener = (Module['_attachFloatVectorListener'] = (
      a0
    ) =>
      (_attachFloatVectorListener = Module['_attachFloatVectorListener'] =
        wasmExports['Bd'])(a0));
    var _attachIntListener = (Module['_attachIntListener'] = (a0) =>
      (_attachIntListener = Module['_attachIntListener'] = wasmExports['Cd'])(
        a0
      ));
    var _attachIntVectorListener = (Module['_attachIntVectorListener'] = (a0) =>
      (_attachIntVectorListener = Module['_attachIntVectorListener'] =
        wasmExports['Dd'])(a0));
    var _attachUintListener = (Module['_attachUintListener'] = (a0) =>
      (_attachUintListener = Module['_attachUintListener'] = wasmExports['Ed'])(
        a0
      ));
    var _attachUintVectorListener = (Module['_attachUintVectorListener'] = (
      a0
    ) =>
      (_attachUintVectorListener = Module['_attachUintVectorListener'] =
        wasmExports['Fd'])(a0));
    var _attachStringListener = (Module['_attachStringListener'] = (a0) =>
      (_attachStringListener = Module['_attachStringListener'] =
        wasmExports['Gd'])(a0));
    var _attachStringVectorListener = (Module['_attachStringVectorListener'] = (
      a0
    ) =>
      (_attachStringVectorListener = Module['_attachStringVectorListener'] =
        wasmExports['Hd'])(a0));
    var _attachProtoListener = (Module['_attachProtoListener'] = (a0, a1) =>
      (_attachProtoListener = Module['_attachProtoListener'] =
        wasmExports['Id'])(a0, a1));
    var _attachProtoVectorListener = (Module['_attachProtoVectorListener'] = (
      a0,
      a1
    ) =>
      (_attachProtoVectorListener = Module['_attachProtoVectorListener'] =
        wasmExports['Jd'])(a0, a1));
    var _getGraphConfig = (Module['_getGraphConfig'] = (a0, a1) =>
      (_getGraphConfig = Module['_getGraphConfig'] = wasmExports['Kd'])(
        a0,
        a1
      ));
    var _clearSubgraphs = (Module['_clearSubgraphs'] = () =>
      (_clearSubgraphs = Module['_clearSubgraphs'] = wasmExports['Ld'])());
    var _pushBinarySubgraph = (Module['_pushBinarySubgraph'] = (a0, a1) =>
      (_pushBinarySubgraph = Module['_pushBinarySubgraph'] = wasmExports['Md'])(
        a0,
        a1
      ));
    var _pushTextSubgraph = (Module['_pushTextSubgraph'] = (a0, a1) =>
      (_pushTextSubgraph = Module['_pushTextSubgraph'] = wasmExports['Nd'])(
        a0,
        a1
      ));
    var _changeBinaryGraph = (Module['_changeBinaryGraph'] = (a0, a1) =>
      (_changeBinaryGraph = Module['_changeBinaryGraph'] = wasmExports['Od'])(
        a0,
        a1
      ));
    var _changeTextGraph = (Module['_changeTextGraph'] = (a0, a1) =>
      (_changeTextGraph = Module['_changeTextGraph'] = wasmExports['Pd'])(
        a0,
        a1
      ));
    var _processGl = (Module['_processGl'] = (a0) =>
      (_processGl = Module['_processGl'] = wasmExports['Qd'])(a0));
    var _process = (Module['_process'] = (a0) =>
      (_process = Module['_process'] = wasmExports['Rd'])(a0));
    var _bindTextureToCanvas = (Module['_bindTextureToCanvas'] = () =>
      (_bindTextureToCanvas = Module['_bindTextureToCanvas'] =
        wasmExports['Sd'])());
    var _requestShaderRefreshOnGraphChange = (Module[
      '_requestShaderRefreshOnGraphChange'
    ] = () =>
      (_requestShaderRefreshOnGraphChange = Module[
        '_requestShaderRefreshOnGraphChange'
      ] =
        wasmExports['Td'])());
    var _waitUntilIdle = (Module['_waitUntilIdle'] = () =>
      (_waitUntilIdle = Module['_waitUntilIdle'] = wasmExports['Ud'])());
    var _closeGraph = (Module['_closeGraph'] = () =>
      (_closeGraph = Module['_closeGraph'] = wasmExports['Vd'])());
    var _setAutoRenderToScreen = (Module['_setAutoRenderToScreen'] = (a0) =>
      (_setAutoRenderToScreen = Module['_setAutoRenderToScreen'] =
        wasmExports['Wd'])(a0));
    var ___getTypeName = (a0) => (___getTypeName = wasmExports['Xd'])(a0);
    var _emscripten_builtin_memalign = (a0, a1) =>
      (_emscripten_builtin_memalign = wasmExports['Yd'])(a0, a1);
    var _memalign = (a0, a1) => (_memalign = wasmExports['Zd'])(a0, a1);
    var __emscripten_tempret_set = (a0) =>
      (__emscripten_tempret_set = wasmExports['_d'])(a0);
    var __emscripten_stack_restore = (a0) =>
      (__emscripten_stack_restore = wasmExports['$d'])(a0);
    var __emscripten_stack_alloc = (a0) =>
      (__emscripten_stack_alloc = wasmExports['ae'])(a0);
    var _emscripten_stack_get_current = () =>
      (_emscripten_stack_get_current = wasmExports['be'])();
    var dynCall_i = (Module['dynCall_i'] = (a0) =>
      (dynCall_i = Module['dynCall_i'] = wasmExports['ce'])(a0));
    var dynCall_ii = (Module['dynCall_ii'] = (a0, a1) =>
      (dynCall_ii = Module['dynCall_ii'] = wasmExports['de'])(a0, a1));
    var dynCall_iii = (Module['dynCall_iii'] = (a0, a1, a2) =>
      (dynCall_iii = Module['dynCall_iii'] = wasmExports['ee'])(a0, a1, a2));
    var dynCall_viii = (Module['dynCall_viii'] = (a0, a1, a2, a3) =>
      (dynCall_viii = Module['dynCall_viii'] = wasmExports['fe'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_vii = (Module['dynCall_vii'] = (a0, a1, a2) =>
      (dynCall_vii = Module['dynCall_vii'] = wasmExports['ge'])(a0, a1, a2));
    var dynCall_vi = (Module['dynCall_vi'] = (a0, a1) =>
      (dynCall_vi = Module['dynCall_vi'] = wasmExports['he'])(a0, a1));
    var dynCall_jii = (Module['dynCall_jii'] = (a0, a1, a2) =>
      (dynCall_jii = Module['dynCall_jii'] = wasmExports['ie'])(a0, a1, a2));
    var dynCall_ji = (Module['dynCall_ji'] = (a0, a1) =>
      (dynCall_ji = Module['dynCall_ji'] = wasmExports['je'])(a0, a1));
    var dynCall_iiii = (Module['dynCall_iiii'] = (a0, a1, a2, a3) =>
      (dynCall_iiii = Module['dynCall_iiii'] = wasmExports['ke'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_v = (Module['dynCall_v'] = (a0) =>
      (dynCall_v = Module['dynCall_v'] = wasmExports['le'])(a0));
    var dynCall_ff = (Module['dynCall_ff'] = (a0, a1) =>
      (dynCall_ff = Module['dynCall_ff'] = wasmExports['me'])(a0, a1));
    var dynCall_fff = (Module['dynCall_fff'] = (a0, a1, a2) =>
      (dynCall_fff = Module['dynCall_fff'] = wasmExports['ne'])(a0, a1, a2));
    var dynCall_viiiii = (Module['dynCall_viiiii'] = (a0, a1, a2, a3, a4, a5) =>
      (dynCall_viiiii = Module['dynCall_viiiii'] = wasmExports['oe'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5
      ));
    var dynCall_viiiiii = (Module['dynCall_viiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6
    ) =>
      (dynCall_viiiiii = Module['dynCall_viiiiii'] = wasmExports['pe'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6
      ));
    var dynCall_fii = (Module['dynCall_fii'] = (a0, a1, a2) =>
      (dynCall_fii = Module['dynCall_fii'] = wasmExports['qe'])(a0, a1, a2));
    var dynCall_viiiiiiii = (Module['dynCall_viiiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8
    ) =>
      (dynCall_viiiiiiii = Module['dynCall_viiiiiiii'] = wasmExports['re'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8
      ));
    var dynCall_fi = (Module['dynCall_fi'] = (a0, a1) =>
      (dynCall_fi = Module['dynCall_fi'] = wasmExports['se'])(a0, a1));
    var dynCall_jjj = (Module['dynCall_jjj'] = (a0, a1, a2, a3, a4) =>
      (dynCall_jjj = Module['dynCall_jjj'] = wasmExports['te'])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));
    var dynCall_viiii = (Module['dynCall_viiii'] = (a0, a1, a2, a3, a4) =>
      (dynCall_viiii = Module['dynCall_viiii'] = wasmExports['ue'])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));
    var dynCall_iiiii = (Module['dynCall_iiiii'] = (a0, a1, a2, a3, a4) =>
      (dynCall_iiiii = Module['dynCall_iiiii'] = wasmExports['ve'])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));
    var dynCall_viid = (Module['dynCall_viid'] = (a0, a1, a2, a3) =>
      (dynCall_viid = Module['dynCall_viid'] = wasmExports['we'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_vidd = (Module['dynCall_vidd'] = (a0, a1, a2, a3) =>
      (dynCall_vidd = Module['dynCall_vidd'] = wasmExports['xe'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_vifd = (Module['dynCall_vifd'] = (a0, a1, a2, a3) =>
      (dynCall_vifd = Module['dynCall_vifd'] = wasmExports['ye'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_iiiijij = (Module['dynCall_iiiijij'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8
    ) =>
      (dynCall_iiiijij = Module['dynCall_iiiijij'] = wasmExports['ze'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8
      ));
    var dynCall_iiiiiii = (Module['dynCall_iiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6
    ) =>
      (dynCall_iiiiiii = Module['dynCall_iiiiiii'] = wasmExports['Ae'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6
      ));
    var dynCall_viji = (Module['dynCall_viji'] = (a0, a1, a2, a3, a4) =>
      (dynCall_viji = Module['dynCall_viji'] = wasmExports['Be'])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));
    var dynCall_iiiiii = (Module['dynCall_iiiiii'] = (a0, a1, a2, a3, a4, a5) =>
      (dynCall_iiiiii = Module['dynCall_iiiiii'] = wasmExports['Ce'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5
      ));
    var dynCall_iiif = (Module['dynCall_iiif'] = (a0, a1, a2, a3) =>
      (dynCall_iiif = Module['dynCall_iiif'] = wasmExports['De'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_viiiiiiiii = (Module['dynCall_viiiiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9
    ) =>
      (dynCall_viiiiiiiii = Module['dynCall_viiiiiiiii'] = wasmExports['Ee'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9
      ));
    var dynCall_viiiiiii = (Module['dynCall_viiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7
    ) =>
      (dynCall_viiiiiii = Module['dynCall_viiiiiii'] = wasmExports['Fe'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7
      ));
    var dynCall_viiiiiiiiiii = (Module['dynCall_viiiiiiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11
    ) =>
      (dynCall_viiiiiiiiiii = Module['dynCall_viiiiiiiiiii'] =
        wasmExports['Ge'])(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11));
    var dynCall_viiiiiiiiiiiii = (Module['dynCall_viiiiiiiiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13
    ) =>
      (dynCall_viiiiiiiiiiiii = Module['dynCall_viiiiiiiiiiiii'] =
        wasmExports['He'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9,
        a10,
        a11,
        a12,
        a13
      ));
    var dynCall_iiiiiiiiii = (Module['dynCall_iiiiiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9
    ) =>
      (dynCall_iiiiiiiiii = Module['dynCall_iiiiiiiiii'] = wasmExports['Ie'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9
      ));
    var dynCall_viiiiiiiiiiii = (Module['dynCall_viiiiiiiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12
    ) =>
      (dynCall_viiiiiiiiiiii = Module['dynCall_viiiiiiiiiiii'] =
        wasmExports['Je'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9,
        a10,
        a11,
        a12
      ));
    var dynCall_viiiiiiiiiiiiiiii = (Module['dynCall_viiiiiiiiiiiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16
    ) =>
      (dynCall_viiiiiiiiiiiiiiii = Module['dynCall_viiiiiiiiiiiiiiii'] =
        wasmExports['Ke'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9,
        a10,
        a11,
        a12,
        a13,
        a14,
        a15,
        a16
      ));
    var dynCall_viiiiiiiiiiiiiiiii = (Module['dynCall_viiiiiiiiiiiiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16,
      a17
    ) =>
      (dynCall_viiiiiiiiiiiiiiiii = Module['dynCall_viiiiiiiiiiiiiiiii'] =
        wasmExports['Le'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9,
        a10,
        a11,
        a12,
        a13,
        a14,
        a15,
        a16,
        a17
      ));
    var dynCall_ffi = (Module['dynCall_ffi'] = (a0, a1, a2) =>
      (dynCall_ffi = Module['dynCall_ffi'] = wasmExports['Me'])(a0, a1, a2));
    var dynCall_viiiiiiiiii = (Module['dynCall_viiiiiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10
    ) =>
      (dynCall_viiiiiiiiii = Module['dynCall_viiiiiiiiii'] = wasmExports['Ne'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9,
        a10
      ));
    var dynCall_iifff = (Module['dynCall_iifff'] = (a0, a1, a2, a3, a4) =>
      (dynCall_iifff = Module['dynCall_iifff'] = wasmExports['Oe'])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));
    var dynCall_iiff = (Module['dynCall_iiff'] = (a0, a1, a2, a3) =>
      (dynCall_iiff = Module['dynCall_iiff'] = wasmExports['Pe'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_iiiiiffii = (Module['dynCall_iiiiiffii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8
    ) =>
      (dynCall_iiiiiffii = Module['dynCall_iiiiiffii'] = wasmExports['Qe'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8
      ));
    var dynCall_iiiiifii = (Module['dynCall_iiiiifii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7
    ) =>
      (dynCall_iiiiifii = Module['dynCall_iiiiifii'] = wasmExports['Re'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7
      ));
    var dynCall_iiifiii = (Module['dynCall_iiifiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6
    ) =>
      (dynCall_iiifiii = Module['dynCall_iiifiii'] = wasmExports['Se'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6
      ));
    var dynCall_vif = (Module['dynCall_vif'] = (a0, a1, a2) =>
      (dynCall_vif = Module['dynCall_vif'] = wasmExports['Te'])(a0, a1, a2));
    var dynCall_viif = (Module['dynCall_viif'] = (a0, a1, a2, a3) =>
      (dynCall_viif = Module['dynCall_viif'] = wasmExports['Ue'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_vifi = (Module['dynCall_vifi'] = (a0, a1, a2, a3) =>
      (dynCall_vifi = Module['dynCall_vifi'] = wasmExports['Ve'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_iifffi = (Module['dynCall_iifffi'] = (a0, a1, a2, a3, a4, a5) =>
      (dynCall_iifffi = Module['dynCall_iifffi'] = wasmExports['We'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5
      ));
    var dynCall_iiffi = (Module['dynCall_iiffi'] = (a0, a1, a2, a3, a4) =>
      (dynCall_iiffi = Module['dynCall_iiffi'] = wasmExports['Xe'])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));
    var dynCall_iiffii = (Module['dynCall_iiffii'] = (a0, a1, a2, a3, a4, a5) =>
      (dynCall_iiffii = Module['dynCall_iiffii'] = wasmExports['Ye'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5
      ));
    var dynCall_viiiiiiiiiiiiii = (Module['dynCall_viiiiiiiiiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14
    ) =>
      (dynCall_viiiiiiiiiiiiii = Module['dynCall_viiiiiiiiiiiiii'] =
        wasmExports['Ze'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9,
        a10,
        a11,
        a12,
        a13,
        a14
      ));
    var dynCall_iif = (Module['dynCall_iif'] = (a0, a1, a2) =>
      (dynCall_iif = Module['dynCall_iif'] = wasmExports['_e'])(a0, a1, a2));
    var dynCall_iifiii = (Module['dynCall_iifiii'] = (a0, a1, a2, a3, a4, a5) =>
      (dynCall_iifiii = Module['dynCall_iifiii'] = wasmExports['$e'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5
      ));
    var dynCall_iifii = (Module['dynCall_iifii'] = (a0, a1, a2, a3, a4) =>
      (dynCall_iifii = Module['dynCall_iifii'] = wasmExports['af'])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));
    var dynCall_iifi = (Module['dynCall_iifi'] = (a0, a1, a2, a3) =>
      (dynCall_iifi = Module['dynCall_iifi'] = wasmExports['bf'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_viijj = (Module['dynCall_viijj'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6
    ) =>
      (dynCall_viijj = Module['dynCall_viijj'] = wasmExports['cf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6
      ));
    var dynCall_viiif = (Module['dynCall_viiif'] = (a0, a1, a2, a3, a4) =>
      (dynCall_viiif = Module['dynCall_viiif'] = wasmExports['df'])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));
    var dynCall_viiifiii = (Module['dynCall_viiifiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7
    ) =>
      (dynCall_viiifiii = Module['dynCall_viiifiii'] = wasmExports['ef'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7
      ));
    var dynCall_fiif = (Module['dynCall_fiif'] = (a0, a1, a2, a3) =>
      (dynCall_fiif = Module['dynCall_fiif'] = wasmExports['ff'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_iiiifi = (Module['dynCall_iiiifi'] = (a0, a1, a2, a3, a4, a5) =>
      (dynCall_iiiifi = Module['dynCall_iiiifi'] = wasmExports['gf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5
      ));
    var dynCall_iiiifiii = (Module['dynCall_iiiifiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7
    ) =>
      (dynCall_iiiifiii = Module['dynCall_iiiifiii'] = wasmExports['hf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7
      ));
    var dynCall_iiifi = (Module['dynCall_iiifi'] = (a0, a1, a2, a3, a4) =>
      (dynCall_iiifi = Module['dynCall_iiifi'] = wasmExports['jf'])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));
    var dynCall_viiiif = (Module['dynCall_viiiif'] = (a0, a1, a2, a3, a4, a5) =>
      (dynCall_viiiif = Module['dynCall_viiiif'] = wasmExports['kf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5
      ));
    var dynCall_vji = (Module['dynCall_vji'] = (a0, a1, a2, a3) =>
      (dynCall_vji = Module['dynCall_vji'] = wasmExports['lf'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_vij = (Module['dynCall_vij'] = (a0, a1, a2, a3) =>
      (dynCall_vij = Module['dynCall_vij'] = wasmExports['mf'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_dii = (Module['dynCall_dii'] = (a0, a1, a2) =>
      (dynCall_dii = Module['dynCall_dii'] = wasmExports['nf'])(a0, a1, a2));
    var dynCall_vidi = (Module['dynCall_vidi'] = (a0, a1, a2, a3) =>
      (dynCall_vidi = Module['dynCall_vidi'] = wasmExports['of'])(
        a0,
        a1,
        a2,
        a3
      ));
    var dynCall_viijii = (Module['dynCall_viijii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6
    ) =>
      (dynCall_viijii = Module['dynCall_viijii'] = wasmExports['pf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6
      ));
    var dynCall_vijjj = (Module['dynCall_vijjj'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7
    ) =>
      (dynCall_vijjj = Module['dynCall_vijjj'] = wasmExports['qf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7
      ));
    var dynCall_vj = (Module['dynCall_vj'] = (a0, a1, a2) =>
      (dynCall_vj = Module['dynCall_vj'] = wasmExports['rf'])(a0, a1, a2));
    var dynCall_viij = (Module['dynCall_viij'] = (a0, a1, a2, a3, a4) =>
      (dynCall_viij = Module['dynCall_viij'] = wasmExports['sf'])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));
    var dynCall_viiiiij = (Module['dynCall_viiiiij'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7
    ) =>
      (dynCall_viiiiij = Module['dynCall_viiiiij'] = wasmExports['tf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7
      ));
    var dynCall_jiji = (Module['dynCall_jiji'] = (a0, a1, a2, a3, a4) =>
      (dynCall_jiji = Module['dynCall_jiji'] = wasmExports['uf'])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));
    var dynCall_iidiiii = (Module['dynCall_iidiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6
    ) =>
      (dynCall_iidiiii = Module['dynCall_iidiiii'] = wasmExports['vf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6
      ));
    var dynCall_iiiiiiiii = (Module['dynCall_iiiiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8
    ) =>
      (dynCall_iiiiiiiii = Module['dynCall_iiiiiiiii'] = wasmExports['wf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8
      ));
    var dynCall_iiiiij = (Module['dynCall_iiiiij'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6
    ) =>
      (dynCall_iiiiij = Module['dynCall_iiiiij'] = wasmExports['xf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6
      ));
    var dynCall_iiiiid = (Module['dynCall_iiiiid'] = (a0, a1, a2, a3, a4, a5) =>
      (dynCall_iiiiid = Module['dynCall_iiiiid'] = wasmExports['yf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5
      ));
    var dynCall_iiiiijj = (Module['dynCall_iiiiijj'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8
    ) =>
      (dynCall_iiiiijj = Module['dynCall_iiiiijj'] = wasmExports['zf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8
      ));
    var dynCall_iiiiiiii = (Module['dynCall_iiiiiiii'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7
    ) =>
      (dynCall_iiiiiiii = Module['dynCall_iiiiiiii'] = wasmExports['Af'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7
      ));
    var dynCall_iiiiiijj = (Module['dynCall_iiiiiijj'] = (
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9
    ) =>
      (dynCall_iiiiiijj = Module['dynCall_iiiiiijj'] = wasmExports['Bf'])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9
      ));
    var _asyncify_start_unwind = (a0) =>
      (_asyncify_start_unwind = wasmExports['Cf'])(a0);
    var _asyncify_stop_unwind = () =>
      (_asyncify_stop_unwind = wasmExports['Df'])();
    var _asyncify_start_rewind = (a0) =>
      (_asyncify_start_rewind = wasmExports['Ef'])(a0);
    var _asyncify_stop_rewind = () =>
      (_asyncify_stop_rewind = wasmExports['Ff'])();
    var _kVersionStampBuildChangelistStr = (Module[
      '_kVersionStampBuildChangelistStr'
    ] = 1024);
    var _kVersionStampCitcSnapshotStr = (Module[
      '_kVersionStampCitcSnapshotStr'
    ] = 1056);
    var _kVersionStampCitcWorkspaceIdStr = (Module[
      '_kVersionStampCitcWorkspaceIdStr'
    ] = 1088);
    var _kVersionStampSourceUriStr = (Module['_kVersionStampSourceUriStr'] =
      1600);
    var _kVersionStampBuildClientStr = (Module['_kVersionStampBuildClientStr'] =
      2112);
    var _kVersionStampBuildClientMintStatusStr = (Module[
      '_kVersionStampBuildClientMintStatusStr'
    ] = 2624);
    var _kVersionStampBuildCompilerStr = (Module[
      '_kVersionStampBuildCompilerStr'
    ] = 2656);
    var _kVersionStampBuildDateTimePstStr = (Module[
      '_kVersionStampBuildDateTimePstStr'
    ] = 3168);
    var _kVersionStampBuildDepotPathStr = (Module[
      '_kVersionStampBuildDepotPathStr'
    ] = 3200);
    var _kVersionStampBuildIdStr = (Module['_kVersionStampBuildIdStr'] = 3712);
    var _kVersionStampBuildInfoStr = (Module['_kVersionStampBuildInfoStr'] =
      4224);
    var _kVersionStampBuildLabelStr = (Module['_kVersionStampBuildLabelStr'] =
      4736);
    var _kVersionStampBuildTargetStr = (Module['_kVersionStampBuildTargetStr'] =
      5248);
    var _kVersionStampBuildTimestampStr = (Module[
      '_kVersionStampBuildTimestampStr'
    ] = 5760);
    var _kVersionStampBuildToolStr = (Module['_kVersionStampBuildToolStr'] =
      5792);
    var _kVersionStampG3BuildTargetStr = (Module[
      '_kVersionStampG3BuildTargetStr'
    ] = 6304);
    var _kVersionStampVerifiableStr = (Module['_kVersionStampVerifiableStr'] =
      6816);
    var _kVersionStampBuildFdoTypeStr = (Module[
      '_kVersionStampBuildFdoTypeStr'
    ] = 6848);
    var _kVersionStampBuildBaselineChangelistStr = (Module[
      '_kVersionStampBuildBaselineChangelistStr'
    ] = 6880);
    var _kVersionStampBuildLtoTypeStr = (Module[
      '_kVersionStampBuildLtoTypeStr'
    ] = 6912);
    var _kVersionStampBuildPropellerTypeStr = (Module[
      '_kVersionStampBuildPropellerTypeStr'
    ] = 6944);
    var _kVersionStampBuildPghoTypeStr = (Module[
      '_kVersionStampBuildPghoTypeStr'
    ] = 6976);
    var _kVersionStampBuildUsernameStr = (Module[
      '_kVersionStampBuildUsernameStr'
    ] = 7008);
    var _kVersionStampBuildHostnameStr = (Module[
      '_kVersionStampBuildHostnameStr'
    ] = 7520);
    var _kVersionStampBuildDirectoryStr = (Module[
      '_kVersionStampBuildDirectoryStr'
    ] = 8032);
    var _kVersionStampBuildChangelistInt = (Module[
      '_kVersionStampBuildChangelistInt'
    ] = 8544);
    var _kVersionStampCitcSnapshotInt = (Module[
      '_kVersionStampCitcSnapshotInt'
    ] = 8552);
    var _kVersionStampBuildClientMintStatusInt = (Module[
      '_kVersionStampBuildClientMintStatusInt'
    ] = 8556);
    var _kVersionStampBuildTimestampInt = (Module[
      '_kVersionStampBuildTimestampInt'
    ] = 8560);
    var _kVersionStampVerifiableInt = (Module['_kVersionStampVerifiableInt'] =
      8568);
    var _kVersionStampBuildCoverageEnabledInt = (Module[
      '_kVersionStampBuildCoverageEnabledInt'
    ] = 8572);
    var _kVersionStampBuildBaselineChangelistInt = (Module[
      '_kVersionStampBuildBaselineChangelistInt'
    ] = 8576);
    var _kVersionStampPrecookedTimestampStr = (Module[
      '_kVersionStampPrecookedTimestampStr'
    ] = 8592);
    var _kVersionStampPrecookedClientInfoStr = (Module[
      '_kVersionStampPrecookedClientInfoStr'
    ] = 9104);
    Module['addRunDependency'] = addRunDependency;
    Module['removeRunDependency'] = removeRunDependency;
    Module['ccall'] = ccall;
    Module['stringToNewUTF8'] = stringToNewUTF8;
    Module['FS_createPreloadedFile'] = FS_createPreloadedFile;
    Module['FS_unlink'] = FS_unlink;
    Module['FS_createPath'] = FS_createPath;
    Module['FS_createDevice'] = FS_createDevice;
    Module['FS_createDataFile'] = FS_createDataFile;
    Module['FS_createLazyFile'] = FS_createLazyFile;
    var calledRun;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun) run();
      if (!calledRun) dependenciesFulfilled = runCaller;
    };
    function run() {
      if (runDependencies > 0) {
        return;
      }
      preRun();
      if (runDependencies > 0) {
        return;
      }
      function doRun() {
        if (calledRun) return;
        calledRun = true;
        Module['calledRun'] = true;
        if (ABORT) return;
        initRuntime();
        readyPromiseResolve(Module);
        Module['onRuntimeInitialized']?.();
        postRun();
      }
      if (Module['setStatus']) {
        Module['setStatus']('Running...');
        setTimeout(function () {
          setTimeout(function () {
            Module['setStatus']('');
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }
    if (Module['preInit']) {
      if (typeof Module['preInit'] == 'function')
        Module['preInit'] = [Module['preInit']];
      while (Module['preInit'].length > 0) {
        Module['preInit'].pop()();
      }
    }
    run();
    moduleRtn = readyPromise;

    return moduleRtn;
  };
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = ModuleFactory;
else if (typeof define === 'function' && define['amd'])
  define([], () => ModuleFactory);
