var Hi = (() => {
  var pr =
    typeof document < 'u' && document.currentScript
      ? document.currentScript.src
      : void 0;
  return function (hr = {}) {
    var d = hr,
      yr,
      ve;
    (d.ready = new Promise((e, r) => {
      (yr = e), (ve = r);
    })),
      [
        '_malloc',
        '_free',
        '_memory',
        '___indirect_function_table',
        'onRuntimeInitialized',
      ].forEach((e) => {
        Object.getOwnPropertyDescriptor(d.ready, e) ||
          Object.defineProperty(d.ready, e, {
            get: () =>
              U(
                'You are getting ' +
                  e +
                  ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'
              ),
            set: () =>
              U(
                'You are setting ' +
                  e +
                  ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'
              ),
          });
      });
    var wr = Object.assign({}, d),
      Me = [],
      br = './this.program',
      Xe = (e, r) => {
        throw r;
      },
      Ze = typeof window == 'object',
      _e = typeof importScripts == 'function',
      Tr =
        typeof process == 'object' &&
        typeof process.versions == 'object' &&
        typeof process.versions.node == 'string',
      Er = !Ze && !Tr && !_e;
    if (d.ENVIRONMENT)
      throw new Error(
        'Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)'
      );
    var Y = '';
    function wt(e) {
      return d.locateFile ? d.locateFile(e, Y) : Y + e;
    }
    var me, ge;
    if (Er) {
      if (
        (typeof process == 'object' && typeof require == 'function') ||
        typeof window == 'object' ||
        typeof importScripts == 'function'
      )
        throw new Error(
          'not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)'
        );
      typeof read < 'u' && read,
        (ge = (e) => {
          if (typeof readbuffer == 'function')
            return new Uint8Array(readbuffer(e));
          let r = read(e, 'binary');
          return m(typeof r == 'object'), r;
        }),
        (me = (e, r, t) => {
          setTimeout(() => r(ge(e)));
        }),
        typeof clearTimeout > 'u' && (globalThis.clearTimeout = (e) => {}),
        typeof setTimeout > 'u' &&
          (globalThis.setTimeout = (e) => (typeof e == 'function' ? e() : U())),
        typeof scriptArgs < 'u'
          ? (Me = scriptArgs)
          : typeof arguments < 'u' && (Me = arguments),
        typeof quit == 'function' &&
          (Xe = (e, r) => {
            throw (
              (setTimeout(() => {
                if (!(r instanceof xr)) {
                  let t = r;
                  r && typeof r == 'object' && r.stack && (t = [r, r.stack]),
                    C(`exiting due to exception: ${t}`);
                }
                quit(e);
              }),
              r)
            );
          }),
        typeof print < 'u' &&
          (typeof console > 'u' && (console = {}),
          (console.log = print),
          (console.warn = console.error =
            typeof printErr < 'u' ? printErr : print));
    } else if (Ze || _e) {
      if (
        (_e
          ? (Y = self.location.href)
          : typeof document < 'u' &&
            document.currentScript &&
            (Y = document.currentScript.src),
        pr && (Y = pr),
        Y.startsWith('blob:')
          ? (Y = '')
          : (Y = Y.substr(0, Y.replace(/[?#].*/, '').lastIndexOf('/') + 1)),
        !(typeof window == 'object' || typeof importScripts == 'function'))
      )
        throw new Error(
          'not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)'
        );
      _e &&
        (ge = (e) => {
          var r = new XMLHttpRequest();
          return (
            r.open('GET', e, !1),
            (r.responseType = 'arraybuffer'),
            r.send(null),
            new Uint8Array(r.response)
          );
        }),
        (me = (e, r, t) => {
          var n = new XMLHttpRequest();
          n.open('GET', e, !0),
            (n.responseType = 'arraybuffer'),
            (n.onload = () => {
              if (n.status == 200 || (n.status == 0 && n.response)) {
                r(n.response);
                return;
              }
              t();
            }),
            (n.onerror = t),
            n.send(null);
        });
    } else throw new Error('environment detection error');
    var Oe = d.print || console.log.bind(console),
      C = d.printErr || console.error.bind(console);
    Object.assign(d, wr),
      (wr = null),
      Ga(),
      d.arguments && (Me = d.arguments),
      G('arguments', 'arguments_'),
      d.thisProgram && (br = d.thisProgram),
      G('thisProgram', 'thisProgram'),
      d.quit && (Xe = d.quit),
      G('quit', 'quit_'),
      m(
        typeof d.memoryInitializerPrefixURL > 'u',
        'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead'
      ),
      m(
        typeof d.pthreadMainPrefixURL > 'u',
        'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead'
      ),
      m(
        typeof d.cdInitializerPrefixURL > 'u',
        'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead'
      ),
      m(
        typeof d.filePackagePrefixURL > 'u',
        'Module.filePackagePrefixURL option was removed, use Module.locateFile instead'
      ),
      m(
        typeof d.read > 'u',
        'Module.read option was removed (modify read_ in JS)'
      ),
      m(
        typeof d.readAsync > 'u',
        'Module.readAsync option was removed (modify readAsync in JS)'
      ),
      m(
        typeof d.readBinary > 'u',
        'Module.readBinary option was removed (modify readBinary in JS)'
      ),
      m(
        typeof d.setWindowTitle > 'u',
        'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)'
      ),
      m(
        typeof d.TOTAL_MEMORY > 'u',
        'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY'
      ),
      G('asm', 'wasmExports'),
      G('read', 'read_'),
      G('readAsync', 'readAsync'),
      G('readBinary', 'readBinary'),
      G('setWindowTitle', 'setWindowTitle'),
      m(
        !Tr,
        'node environment detected but not enabled at build time.  Add `node` to `-sENVIRONMENT` to enable.'
      ),
      m(
        !Er,
        'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.'
      );
    var pe;
    d.wasmBinary && (pe = d.wasmBinary),
      G('wasmBinary', 'wasmBinary'),
      typeof WebAssembly != 'object' && C('no native wasm support detected');
    var he,
      ye = !1;
    function m(e, r) {
      e || U('Assertion failed' + (r ? ': ' + r : ''));
    }
    var R, W, ie, we, D, b, Pr, Sr;
    function Fr() {
      var e = he.buffer;
      (d.HEAP8 = R = new Int8Array(e)),
        (d.HEAP16 = ie = new Int16Array(e)),
        (d.HEAPU8 = W = new Uint8Array(e)),
        (d.HEAPU16 = we = new Uint16Array(e)),
        (d.HEAP32 = D = new Int32Array(e)),
        (d.HEAPU32 = b = new Uint32Array(e)),
        (d.HEAPF32 = Pr = new Float32Array(e)),
        (d.HEAPF64 = Sr = new Float64Array(e));
    }
    m(
      !d.STACK_SIZE,
      'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time'
    ),
      m(
        typeof Int32Array < 'u' &&
          typeof Float64Array < 'u' &&
          Int32Array.prototype.subarray != null &&
          Int32Array.prototype.set != null,
        'JS engine does not provide full typed array support'
      ),
      m(
        !d.wasmMemory,
        'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally'
      ),
      m(
        !d.INITIAL_MEMORY,
        'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically'
      );
    function bt() {
      var e = gr();
      m((e & 3) == 0),
        e == 0 && (e += 4),
        (b[e >> 2] = 34821223),
        (b[(e + 4) >> 2] = 2310721022),
        (b[0] = 1668509029);
    }
    function Qe() {
      if (!ye) {
        var e = gr();
        e == 0 && (e += 4);
        var r = b[e >> 2],
          t = b[(e + 4) >> 2];
        (r != 34821223 || t != 2310721022) &&
          U(
            `Stack overflow! Stack cookie has been overwritten at ${oe(e)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${oe(t)} ${oe(r)}`
          ),
          b[0] != 1668509029 &&
            U(
              'Runtime error: The application has corrupted its heap memory area (address zero)!'
            );
      }
    }
    (function () {
      var e = new Int16Array(1),
        r = new Int8Array(e.buffer);
      if (((e[0] = 25459), r[0] !== 115 || r[1] !== 99))
        throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
    })();
    var Cr = [],
      Ar = [],
      $r = [],
      er = !1;
    function Tt() {
      if (d.preRun)
        for (
          typeof d.preRun == 'function' && (d.preRun = [d.preRun]);
          d.preRun.length;

        )
          St(d.preRun.shift());
      tr(Cr);
    }
    function Et() {
      m(!er), (er = !0), Qe(), tr(Ar);
    }
    function Pt() {
      if ((Qe(), d.postRun))
        for (
          typeof d.postRun == 'function' && (d.postRun = [d.postRun]);
          d.postRun.length;

        )
          kr(d.postRun.shift());
      tr($r);
    }
    function St(e) {
      Cr.unshift(e);
    }
    function Ft(e) {
      Ar.unshift(e);
    }
    function kr(e) {
      $r.unshift(e);
    }
    m(
      Math.imul,
      'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill'
    ),
      m(
        Math.fround,
        'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill'
      ),
      m(
        Math.clz32,
        'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill'
      ),
      m(
        Math.trunc,
        'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill'
      );
    var Z = 0,
      Q = null,
      be = null,
      se = {};
    function Wr(e) {
      for (var r = e; ; ) {
        if (!se[e]) return e;
        e = r + Math.random();
      }
    }
    function Ie(e) {
      Z++,
        d.monitorRunDependencies?.(Z),
        e
          ? (m(!se[e]),
            (se[e] = 1),
            Q === null &&
              typeof setInterval < 'u' &&
              (Q = setInterval(() => {
                if (ye) {
                  clearInterval(Q), (Q = null);
                  return;
                }
                var r = !1;
                for (var t in se)
                  r || ((r = !0), C('still waiting on run dependencies:')),
                    C(`dependency: ${t}`);
                r && C('(end of list)');
              }, 1e4)))
          : C('warning: run dependency added without ID');
    }
    function Te(e) {
      if (
        (Z--,
        d.monitorRunDependencies?.(Z),
        e
          ? (m(se[e]), delete se[e])
          : C('warning: run dependency removed without ID'),
        Z == 0 && (Q !== null && (clearInterval(Q), (Q = null)), be))
      ) {
        var r = be;
        (be = null), r();
      }
    }
    function U(e) {
      d.onAbort?.(e), (e = 'Aborted(' + e + ')'), C(e), (ye = !0);
      var r = new WebAssembly.RuntimeError(e);
      throw (ve(r), r);
    }
    var Ct = 'data:application/octet-stream;base64,',
      Dr = (e) => e.startsWith(Ct),
      rr = (e) => e.startsWith('file://');
    function h(e) {
      return (...r) => {
        m(er, `native function \`${e}\` called before runtime initialization`);
        var t = X[e];
        return m(t, `exported native function \`${e}\` not found`), t(...r);
      };
    }
    var K;
    (K = 'fastText.common.wasm'), Dr(K) || (K = wt(K));
    function Mr(e) {
      if (e == K && pe) return new Uint8Array(pe);
      if (ge) return ge(e);
      throw 'both async and sync fetching of the wasm failed';
    }
    function At(e) {
      if (!pe && (Ze || _e)) {
        if (typeof fetch == 'function' && !rr(e))
          return fetch(e, { credentials: 'same-origin' })
            .then((r) => {
              if (!r.ok) throw `failed to load wasm binary file at '${e}'`;
              return r.arrayBuffer();
            })
            .catch(() => Mr(e));
        if (me)
          return new Promise((r, t) => {
            me(e, (n) => r(new Uint8Array(n)), t);
          });
      }
      return Promise.resolve().then(() => Mr(e));
    }
    function Or(e, r, t) {
      return At(e)
        .then((n) => WebAssembly.instantiate(n, r))
        .then(t, (n) => {
          C(`failed to asynchronously prepare wasm: ${n}`),
            rr(K) &&
              C(
                `warning: Loading from a file URI (${K}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`
              ),
            U(n);
        });
    }
    function $t(e, r, t, n) {
      return !e &&
        typeof WebAssembly.instantiateStreaming == 'function' &&
        !Dr(r) &&
        !rr(r) &&
        typeof fetch == 'function'
        ? fetch(r, { credentials: 'same-origin' }).then((a) => {
            var i = WebAssembly.instantiateStreaming(a, t);
            return i.then(n, function (o) {
              return (
                C(`wasm streaming compile failed: ${o}`),
                C('falling back to ArrayBuffer instantiation'),
                Or(r, t, n)
              );
            });
          })
        : Or(r, t, n);
    }
    function kt() {
      var e = { env: pt, wasi_snapshot_preview1: pt };
      function r(a, i) {
        return (
          (X = a.exports),
          (he = X.memory),
          m(he, 'memory not found in wasm exports'),
          Fr(),
          (Be = X.__indirect_function_table),
          m(Be, 'table not found in wasm exports'),
          Ft(X.__wasm_call_ctors),
          Te('wasm-instantiate'),
          X
        );
      }
      Ie('wasm-instantiate');
      var t = d;
      function n(a) {
        m(
          d === t,
          'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?'
        ),
          (t = null),
          r(a.instance);
      }
      if (d.instantiateWasm)
        try {
          return d.instantiateWasm(e, r);
        } catch (a) {
          C(`Module.instantiateWasm callback failed with error: ${a}`), ve(a);
        }
      return $t(pe, K, e, n).catch(ve), {};
    }
    var T;
    function G(e, r, t = !0) {
      Object.getOwnPropertyDescriptor(d, e) ||
        Object.defineProperty(d, e, {
          configurable: !0,
          get() {
            let n = t
              ? ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'
              : '';
            U(`\`Module.${e}\` has been replaced by \`${r}\`` + n);
          },
        });
    }
    function Wt(e) {
      Object.getOwnPropertyDescriptor(d, e) &&
        U(
          `\`Module.${e}\` was supplied but \`${e}\` not included in INCOMING_MODULE_JS_API`
        );
    }
    function Ir(e) {
      return (
        e === 'FS_createPath' ||
        e === 'FS_createDataFile' ||
        e === 'FS_createPreloadedFile' ||
        e === 'FS_unlink' ||
        e === 'addRunDependency' ||
        e === 'removeRunDependency'
      );
    }
    function Rr(e, r) {
      typeof globalThis < 'u' &&
        Object.defineProperty(globalThis, e, {
          configurable: !0,
          get() {
            J(`\`${e}\` is not longer defined by emscripten. ${r}`);
          },
        });
    }
    Rr('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer'),
      Rr('asm', 'Please use wasmExports instead');
    function Dt(e) {
      typeof globalThis < 'u' &&
        !Object.getOwnPropertyDescriptor(globalThis, e) &&
        Object.defineProperty(globalThis, e, {
          configurable: !0,
          get() {
            var r = `\`${e}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`,
              t = e;
            t.startsWith('_') || (t = '$' + e),
              (r += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${t}')`),
              Ir(e) &&
                (r +=
                  '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you'),
              J(r);
          },
        }),
        Ur(e);
    }
    function Ur(e) {
      Object.getOwnPropertyDescriptor(d, e) ||
        Object.defineProperty(d, e, {
          configurable: !0,
          get() {
            var r = `'${e}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
            Ir(e) &&
              (r +=
                '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you'),
              U(r);
          },
        });
    }
    function xr(e) {
      (this.name = 'ExitStatus'),
        (this.message = `Program terminated with exit(${e})`),
        (this.status = e);
    }
    var tr = (e) => {
        for (; e.length > 0; ) e.shift()(d);
      },
      Mt = d.noExitRuntime || !0,
      oe = (e) => (
        m(typeof e == 'number'),
        (e >>>= 0),
        '0x' + e.toString(16).padStart(8, '0')
      ),
      J = (e) => {
        (J.shown ||= {}), J.shown[e] || ((J.shown[e] = 1), C(e));
      },
      Lr = typeof TextDecoder < 'u' ? new TextDecoder('utf8') : void 0,
      jr = (e, r, t) => {
        for (var n = r + t, a = r; e[a] && !(a >= n); ) ++a;
        if (a - r > 16 && e.buffer && Lr) return Lr.decode(e.subarray(r, a));
        for (var i = ''; r < a; ) {
          var o = e[r++];
          if (!(o & 128)) {
            i += String.fromCharCode(o);
            continue;
          }
          var s = e[r++] & 63;
          if ((o & 224) == 192) {
            i += String.fromCharCode(((o & 31) << 6) | s);
            continue;
          }
          var l = e[r++] & 63;
          if (
            ((o & 240) == 224
              ? (o = ((o & 15) << 12) | (s << 6) | l)
              : ((o & 248) != 240 &&
                  J(
                    'Invalid UTF-8 leading byte ' +
                      oe(o) +
                      ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!'
                  ),
                (o = ((o & 7) << 18) | (s << 12) | (l << 6) | (e[r++] & 63))),
            o < 65536)
          )
            i += String.fromCharCode(o);
          else {
            var u = o - 65536;
            i += String.fromCharCode(55296 | (u >> 10), 56320 | (u & 1023));
          }
        }
        return i;
      },
      N = (e, r) => (
        m(
          typeof e == 'number',
          `UTF8ToString expects a number (got ${typeof e})`
        ),
        e ? jr(W, e, r) : ''
      ),
      Ot = (e, r, t, n) => {
        U(
          `Assertion failed: ${N(e)}, at: ` +
            [r ? N(r) : 'unknown filename', t, n ? N(n) : 'unknown function']
        );
      };
    class It {
      constructor(r) {
        (this.excPtr = r), (this.ptr = r - 24);
      }
      set_type(r) {
        b[(this.ptr + 4) >> 2] = r;
      }
      get_type() {
        return b[(this.ptr + 4) >> 2];
      }
      set_destructor(r) {
        b[(this.ptr + 8) >> 2] = r;
      }
      get_destructor() {
        return b[(this.ptr + 8) >> 2];
      }
      set_caught(r) {
        (r = r ? 1 : 0), (R[this.ptr + 12] = r);
      }
      get_caught() {
        return R[this.ptr + 12] != 0;
      }
      set_rethrown(r) {
        (r = r ? 1 : 0), (R[this.ptr + 13] = r);
      }
      get_rethrown() {
        return R[this.ptr + 13] != 0;
      }
      init(r, t) {
        this.set_adjusted_ptr(0), this.set_type(r), this.set_destructor(t);
      }
      set_adjusted_ptr(r) {
        b[(this.ptr + 16) >> 2] = r;
      }
      get_adjusted_ptr() {
        return b[(this.ptr + 16) >> 2];
      }
      get_exception_ptr() {
        var r = Za(this.get_type());
        if (r) return b[this.excPtr >> 2];
        var t = this.get_adjusted_ptr();
        return t !== 0 ? t : this.excPtr;
      }
    }
    var Rt = (e, r, t) => {
        var n = new It(e);
        n.init(r, t),
          m(
            !1,
            'Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.'
          );
      },
      Re = {},
      Ee = (e) => {
        for (; e.length; ) {
          var r = e.pop(),
            t = e.pop();
          t(r);
        }
      };
    function le(e) {
      return this.fromWireType(b[e >> 2]);
    }
    var ue = {},
      ee = {},
      Ue = {},
      Nr,
      xe = (e) => {
        throw new Nr(e);
      },
      q = (e, r, t) => {
        e.forEach(function (s) {
          Ue[s] = r;
        });
        function n(s) {
          var l = t(s);
          l.length !== e.length && xe('Mismatched type converter count');
          for (var u = 0; u < e.length; ++u) B(e[u], l[u]);
        }
        var a = new Array(r.length),
          i = [],
          o = 0;
        r.forEach((s, l) => {
          ee.hasOwnProperty(s)
            ? (a[l] = ee[s])
            : (i.push(s),
              ue.hasOwnProperty(s) || (ue[s] = []),
              ue[s].push(() => {
                (a[l] = ee[s]), ++o, o === i.length && n(a);
              }));
        }),
          i.length === 0 && n(a);
      },
      Ut = (e) => {
        var r = Re[e];
        delete Re[e];
        var t = r.elements,
          n = t.length,
          a = t
            .map((s) => s.getterReturnType)
            .concat(t.map((s) => s.setterArgumentType)),
          i = r.rawConstructor,
          o = r.rawDestructor;
        q(
          [e],
          a,
          (s) => (
            t.forEach((l, u) => {
              var f = s[u],
                v = l.getter,
                _ = l.getterContext,
                p = s[u + n],
                w = l.setter,
                P = l.setterContext;
              (l.read = (S) => f.fromWireType(v(_, S))),
                (l.write = (S, $) => {
                  var c = [];
                  w(P, S, p.toWireType(c, $)), Ee(c);
                });
            }),
            [
              {
                name: r.name,
                fromWireType: (l) => {
                  for (var u = new Array(n), f = 0; f < n; ++f)
                    u[f] = t[f].read(l);
                  return o(l), u;
                },
                toWireType: (l, u) => {
                  if (n !== u.length)
                    throw new TypeError(
                      `Incorrect number of tuple elements for ${r.name}: expected=${n}, actual=${u.length}`
                    );
                  for (var f = i(), v = 0; v < n; ++v) t[v].write(f, u[v]);
                  return l !== null && l.push(o, f), f;
                },
                argPackAdvance: H,
                readValueFromPointer: le,
                destructorFunction: o,
              },
            ]
          )
        );
      },
      Le = {},
      xt = (e) => {
        var r = Le[e];
        delete Le[e];
        var t = r.rawConstructor,
          n = r.rawDestructor,
          a = r.fields,
          i = a
            .map((o) => o.getterReturnType)
            .concat(a.map((o) => o.setterArgumentType));
        q([e], i, (o) => {
          var s = {};
          return (
            a.forEach((l, u) => {
              var f = l.fieldName,
                v = o[u],
                _ = l.getter,
                p = l.getterContext,
                w = o[u + a.length],
                P = l.setter,
                S = l.setterContext;
              s[f] = {
                read: ($) => v.fromWireType(_(p, $)),
                write: ($, c) => {
                  var g = [];
                  P(S, $, w.toWireType(g, c)), Ee(g);
                },
              };
            }),
            [
              {
                name: r.name,
                fromWireType: (l) => {
                  var u = {};
                  for (var f in s) u[f] = s[f].read(l);
                  return n(l), u;
                },
                toWireType: (l, u) => {
                  for (var f in s)
                    if (!(f in u)) throw new TypeError(`Missing field: "${f}"`);
                  var v = t();
                  for (f in s) s[f].write(v, u[f]);
                  return l !== null && l.push(n, v), v;
                },
                argPackAdvance: H,
                readValueFromPointer: le,
                destructorFunction: n,
              },
            ]
          );
        });
      },
      Lt = (e, r, t, n, a) => {},
      jt = () => {
        for (var e = new Array(256), r = 0; r < 256; ++r)
          e[r] = String.fromCharCode(r);
        Hr = e;
      },
      Hr,
      M = (e) => {
        for (var r = '', t = e; W[t]; ) r += Hr[W[t++]];
        return r;
      },
      fe,
      E = (e) => {
        throw new fe(e);
      };
    function Nt(e, r, t = {}) {
      var n = r.name;
      if (
        (e || E(`type "${n}" must have a positive integer typeid pointer`),
        ee.hasOwnProperty(e))
      ) {
        if (t.ignoreDuplicateRegistrations) return;
        E(`Cannot register type '${n}' twice`);
      }
      if (((ee[e] = r), delete Ue[e], ue.hasOwnProperty(e))) {
        var a = ue[e];
        delete ue[e], a.forEach((i) => i());
      }
    }
    function B(e, r, t = {}) {
      if (!('argPackAdvance' in r))
        throw new TypeError(
          'registerType registeredInstance requires argPackAdvance'
        );
      return Nt(e, r, t);
    }
    var H = 8,
      Ht = (e, r, t, n) => {
        (r = M(r)),
          B(e, {
            name: r,
            fromWireType: function (a) {
              return !!a;
            },
            toWireType: function (a, i) {
              return i ? t : n;
            },
            argPackAdvance: H,
            readValueFromPointer: function (a) {
              return this.fromWireType(W[a]);
            },
            destructorFunction: null,
          });
      },
      Vt = (e) => ({
        count: e.count,
        deleteScheduled: e.deleteScheduled,
        preservePointerOnDelete: e.preservePointerOnDelete,
        ptr: e.ptr,
        ptrType: e.ptrType,
        smartPtr: e.smartPtr,
        smartPtrType: e.smartPtrType,
      }),
      nr = (e) => {
        function r(t) {
          return t.$$.ptrType.registeredClass.name;
        }
        E(r(e) + ' instance already deleted');
      },
      ar = !1,
      Vr = (e) => {},
      Yt = (e) => {
        e.smartPtr
          ? e.smartPtrType.rawDestructor(e.smartPtr)
          : e.ptrType.registeredClass.rawDestructor(e.ptr);
      },
      Yr = (e) => {
        e.count.value -= 1;
        var r = e.count.value === 0;
        r && Yt(e);
      },
      Br = (e, r, t) => {
        if (r === t) return e;
        if (t.baseClass === void 0) return null;
        var n = Br(e, r, t.baseClass);
        return n === null ? null : t.downcast(n);
      },
      zr = {},
      Bt = () => Object.keys(Fe).length,
      zt = () => {
        var e = [];
        for (var r in Fe) Fe.hasOwnProperty(r) && e.push(Fe[r]);
        return e;
      },
      Pe = [],
      ir = () => {
        for (; Pe.length; ) {
          var e = Pe.pop();
          (e.$$.deleteScheduled = !1), e.delete();
        }
      },
      Se,
      Gt = (e) => {
        (Se = e), Pe.length && Se && Se(ir);
      },
      Jt = () => {
        (d.getInheritedInstanceCount = Bt),
          (d.getLiveInheritedInstances = zt),
          (d.flushPendingDeletes = ir),
          (d.setDelayFunction = Gt);
      },
      Fe = {},
      qt = (e, r) => {
        for (r === void 0 && E('ptr should not be undefined'); e.baseClass; )
          (r = e.upcast(r)), (e = e.baseClass);
        return r;
      },
      Kt = (e, r) => ((r = qt(e, r)), Fe[r]),
      je = (e, r) => {
        (!r.ptrType || !r.ptr) &&
          xe('makeClassHandle requires ptr and ptrType');
        var t = !!r.smartPtrType,
          n = !!r.smartPtr;
        return (
          t !== n && xe('Both smartPtrType and smartPtr must be specified'),
          (r.count = { value: 1 }),
          Ce(Object.create(e, { $$: { value: r, writable: !0 } }))
        );
      };
    function Gr(e) {
      var r = this.getPointee(e);
      if (!r) return this.destructor(e), null;
      var t = Kt(this.registeredClass, r);
      if (t !== void 0) {
        if (t.$$.count.value === 0)
          return (t.$$.ptr = r), (t.$$.smartPtr = e), t.clone();
        var n = t.clone();
        return this.destructor(e), n;
      }
      function a() {
        return this.isSmartPointer
          ? je(this.registeredClass.instancePrototype, {
              ptrType: this.pointeeType,
              ptr: r,
              smartPtrType: this,
              smartPtr: e,
            })
          : je(this.registeredClass.instancePrototype, {
              ptrType: this,
              ptr: e,
            });
      }
      var i = this.registeredClass.getActualType(r),
        o = zr[i];
      if (!o) return a.call(this);
      var s;
      this.isConst ? (s = o.constPointerType) : (s = o.pointerType);
      var l = Br(r, this.registeredClass, s.registeredClass);
      return l === null
        ? a.call(this)
        : this.isSmartPointer
          ? je(s.registeredClass.instancePrototype, {
              ptrType: s,
              ptr: l,
              smartPtrType: this,
              smartPtr: e,
            })
          : je(s.registeredClass.instancePrototype, { ptrType: s, ptr: l });
    }
    var Ce = (e) =>
        typeof FinalizationRegistry > 'u'
          ? ((Ce = (r) => r), e)
          : ((ar = new FinalizationRegistry((r) => {
              console.warn(r.leakWarning.stack.replace(/^Error: /, '')),
                Yr(r.$$);
            })),
            (Ce = (r) => {
              var t = r.$$,
                n = !!t.smartPtr;
              if (n) {
                var a = { $$: t },
                  i = t.ptrType.registeredClass;
                (a.leakWarning =
                  new Error(`Embind found a leaked C++ instance ${i.name} <${oe(t.ptr)}>.
We'll free it automatically in this case, but this functionality is not reliable across various environments.
Make sure to invoke .delete() manually once you're done with the instance instead.
Originally allocated`)),
                  'captureStackTrace' in Error &&
                    Error.captureStackTrace(a.leakWarning, Gr),
                  ar.register(r, a, r);
              }
              return r;
            }),
            (Vr = (r) => ar.unregister(r)),
            Ce(e)),
      Xt = () => {
        Object.assign(Ne.prototype, {
          isAliasOf(e) {
            if (!(this instanceof Ne) || !(e instanceof Ne)) return !1;
            var r = this.$$.ptrType.registeredClass,
              t = this.$$.ptr;
            e.$$ = e.$$;
            for (
              var n = e.$$.ptrType.registeredClass, a = e.$$.ptr;
              r.baseClass;

            )
              (t = r.upcast(t)), (r = r.baseClass);
            for (; n.baseClass; ) (a = n.upcast(a)), (n = n.baseClass);
            return r === n && t === a;
          },
          clone() {
            if ((this.$$.ptr || nr(this), this.$$.preservePointerOnDelete))
              return (this.$$.count.value += 1), this;
            var e = Ce(
              Object.create(Object.getPrototypeOf(this), {
                $$: { value: Vt(this.$$) },
              })
            );
            return (e.$$.count.value += 1), (e.$$.deleteScheduled = !1), e;
          },
          delete() {
            this.$$.ptr || nr(this),
              this.$$.deleteScheduled &&
                !this.$$.preservePointerOnDelete &&
                E('Object already scheduled for deletion'),
              Vr(this),
              Yr(this.$$),
              this.$$.preservePointerOnDelete ||
                ((this.$$.smartPtr = void 0), (this.$$.ptr = void 0));
          },
          isDeleted() {
            return !this.$$.ptr;
          },
          deleteLater() {
            return (
              this.$$.ptr || nr(this),
              this.$$.deleteScheduled &&
                !this.$$.preservePointerOnDelete &&
                E('Object already scheduled for deletion'),
              Pe.push(this),
              Pe.length === 1 && Se && Se(ir),
              (this.$$.deleteScheduled = !0),
              this
            );
          },
        });
      };
    function Ne() {}
    var Ae = (e, r) => Object.defineProperty(r, 'name', { value: e }),
      Jr = (e, r, t) => {
        if (e[r].overloadTable === void 0) {
          var n = e[r];
          (e[r] = function (...a) {
            return (
              e[r].overloadTable.hasOwnProperty(a.length) ||
                E(
                  `Function '${t}' called with an invalid number of arguments (${a.length}) - expects one of (${e[r].overloadTable})!`
                ),
              e[r].overloadTable[a.length].apply(this, a)
            );
          }),
            (e[r].overloadTable = []),
            (e[r].overloadTable[n.argCount] = n);
        }
      },
      qr = (e, r, t) => {
        d.hasOwnProperty(e)
          ? (E(`Cannot register public name '${e}' twice`),
            Jr(d, e, e),
            d.hasOwnProperty(t) &&
              E(
                `Cannot register multiple overloads of a function with the same number of arguments (${t})!`
              ),
            (d[e].overloadTable[t] = r))
          : (d[e] = r);
      },
      Zt = 48,
      Qt = 57,
      en = (e) => {
        if (e === void 0) return '_unknown';
        e = e.replace(/[^a-zA-Z0-9_]/g, '$');
        var r = e.charCodeAt(0);
        return r >= Zt && r <= Qt ? `_${e}` : e;
      };
    function rn(e, r, t, n, a, i, o, s) {
      (this.name = e),
        (this.constructor = r),
        (this.instancePrototype = t),
        (this.rawDestructor = n),
        (this.baseClass = a),
        (this.getActualType = i),
        (this.upcast = o),
        (this.downcast = s),
        (this.pureVirtualFunctions = []);
    }
    var He = (e, r, t) => {
      for (; r !== t; )
        r.upcast ||
          E(
            `Expected null or instance of ${t.name}, got an instance of ${r.name}`
          ),
          (e = r.upcast(e)),
          (r = r.baseClass);
      return e;
    };
    function tn(e, r) {
      if (r === null)
        return this.isReference && E(`null is not a valid ${this.name}`), 0;
      r.$$ || E(`Cannot pass "${de(r)}" as a ${this.name}`),
        r.$$.ptr ||
          E(`Cannot pass deleted object as a pointer of type ${this.name}`);
      var t = r.$$.ptrType.registeredClass,
        n = He(r.$$.ptr, t, this.registeredClass);
      return n;
    }
    function nn(e, r) {
      var t;
      if (r === null)
        return (
          this.isReference && E(`null is not a valid ${this.name}`),
          this.isSmartPointer
            ? ((t = this.rawConstructor()),
              e !== null && e.push(this.rawDestructor, t),
              t)
            : 0
        );
      (!r || !r.$$) && E(`Cannot pass "${de(r)}" as a ${this.name}`),
        r.$$.ptr ||
          E(`Cannot pass deleted object as a pointer of type ${this.name}`),
        !this.isConst &&
          r.$$.ptrType.isConst &&
          E(
            `Cannot convert argument of type ${r.$$.smartPtrType ? r.$$.smartPtrType.name : r.$$.ptrType.name} to parameter type ${this.name}`
          );
      var n = r.$$.ptrType.registeredClass;
      if (((t = He(r.$$.ptr, n, this.registeredClass)), this.isSmartPointer))
        switch (
          (r.$$.smartPtr === void 0 &&
            E('Passing raw pointer to smart pointer is illegal'),
          this.sharingPolicy)
        ) {
          case 0:
            r.$$.smartPtrType === this
              ? (t = r.$$.smartPtr)
              : E(
                  `Cannot convert argument of type ${r.$$.smartPtrType ? r.$$.smartPtrType.name : r.$$.ptrType.name} to parameter type ${this.name}`
                );
            break;
          case 1:
            t = r.$$.smartPtr;
            break;
          case 2:
            if (r.$$.smartPtrType === this) t = r.$$.smartPtr;
            else {
              var a = r.clone();
              (t = this.rawShare(
                t,
                re.toHandle(() => a.delete())
              )),
                e !== null && e.push(this.rawDestructor, t);
            }
            break;
          default:
            E('Unsupporting sharing policy');
        }
      return t;
    }
    function an(e, r) {
      if (r === null)
        return this.isReference && E(`null is not a valid ${this.name}`), 0;
      r.$$ || E(`Cannot pass "${de(r)}" as a ${this.name}`),
        r.$$.ptr ||
          E(`Cannot pass deleted object as a pointer of type ${this.name}`),
        r.$$.ptrType.isConst &&
          E(
            `Cannot convert argument of type ${r.$$.ptrType.name} to parameter type ${this.name}`
          );
      var t = r.$$.ptrType.registeredClass,
        n = He(r.$$.ptr, t, this.registeredClass);
      return n;
    }
    var sn = () => {
      Object.assign(Ve.prototype, {
        getPointee(e) {
          return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
        },
        destructor(e) {
          this.rawDestructor?.(e);
        },
        argPackAdvance: H,
        readValueFromPointer: le,
        fromWireType: Gr,
      });
    };
    function Ve(e, r, t, n, a, i, o, s, l, u, f) {
      (this.name = e),
        (this.registeredClass = r),
        (this.isReference = t),
        (this.isConst = n),
        (this.isSmartPointer = a),
        (this.pointeeType = i),
        (this.sharingPolicy = o),
        (this.rawGetPointee = s),
        (this.rawConstructor = l),
        (this.rawShare = u),
        (this.rawDestructor = f),
        !a && r.baseClass === void 0
          ? n
            ? ((this.toWireType = tn), (this.destructorFunction = null))
            : ((this.toWireType = an), (this.destructorFunction = null))
          : (this.toWireType = nn);
    }
    var on = (e, r, t) => {
        d.hasOwnProperty(e) || xe('Replacing nonexistent public symbol'),
          d[e].overloadTable !== void 0 && t !== void 0
            ? (d[e].overloadTable[t] = r)
            : ((d[e] = r), (d[e].argCount = t));
      },
      ln = (e, r, t) => {
        m(
          'dynCall_' + e in d,
          `bad function pointer type - dynCall function not found for sig '${e}'`
        ),
          t?.length
            ? m(t.length === e.substring(1).replace(/j/g, '--').length)
            : m(e.length == 1);
        var n = d['dynCall_' + e];
        return n(r, ...t);
      },
      Ye = [],
      Be,
      sr = (e) => {
        var r = Ye[e];
        return (
          r || (e >= Ye.length && (Ye.length = e + 1), (Ye[e] = r = Be.get(e))),
          m(
            Be.get(e) == r,
            'JavaScript-side Wasm function table mirror is out of date!'
          ),
          r
        );
      },
      un = (e, r, t = []) => {
        if (e.includes('j')) return ln(e, r, t);
        m(sr(r), `missing table entry in dynCall: ${r}`);
        var n = sr(r)(...t);
        return n;
      },
      fn = (e, r) => (
        m(
          e.includes('j') || e.includes('p'),
          'getDynCaller should only be called with i64 sigs'
        ),
        (...t) => un(e, r, t)
      ),
      I = (e, r) => {
        e = M(e);
        function t() {
          return e.includes('j') ? fn(e, r) : sr(r);
        }
        var n = t();
        return (
          typeof n != 'function' &&
            E(`unknown function pointer with signature ${e}: ${r}`),
          n
        );
      },
      dn = (e, r) => {
        var t = Ae(r, function (n) {
          (this.name = r), (this.message = n);
          var a = new Error(n).stack;
          a !== void 0 &&
            (this.stack =
              this.toString() +
              `
` +
              a.replace(/^Error(:[^\n]*)?\n/, ''));
        });
        return (
          (t.prototype = Object.create(e.prototype)),
          (t.prototype.constructor = t),
          (t.prototype.toString = function () {
            return this.message === void 0
              ? this.name
              : `${this.name}: ${this.message}`;
          }),
          t
        );
      },
      Kr,
      Xr = (e) => {
        var r = Ja(e),
          t = M(r);
        return L(r), t;
      },
      $e = (e, r) => {
        var t = [],
          n = {};
        function a(i) {
          if (!n[i] && !ee[i]) {
            if (Ue[i]) {
              Ue[i].forEach(a);
              return;
            }
            t.push(i), (n[i] = !0);
          }
        }
        throw (r.forEach(a), new Kr(`${e}: ` + t.map(Xr).join([', '])));
      },
      cn = (e, r, t, n, a, i, o, s, l, u, f, v, _) => {
        (f = M(f)),
          (i = I(a, i)),
          (s &&= I(o, s)),
          (u &&= I(l, u)),
          (_ = I(v, _));
        var p = en(f);
        qr(p, function () {
          $e(`Cannot construct ${f} due to unbound types`, [n]);
        }),
          q([e, r, t], n ? [n] : [], (w) => {
            w = w[0];
            var P, S;
            n
              ? ((P = w.registeredClass), (S = P.instancePrototype))
              : (S = Ne.prototype);
            var $ = Ae(f, function (...ae) {
                if (Object.getPrototypeOf(this) !== c)
                  throw new fe("Use 'new' to construct " + f);
                if (g.constructor_body === void 0)
                  throw new fe(f + ' has no accessible constructor');
                var Ke = g.constructor_body[ae.length];
                if (Ke === void 0)
                  throw new fe(
                    `Tried to invoke ctor of ${f} with invalid number of parameters (${ae.length}) - expected (${Object.keys(g.constructor_body).toString()}) parameters instead!`
                  );
                return Ke.apply(this, ae);
              }),
              c = Object.create(S, { constructor: { value: $ } });
            $.prototype = c;
            var g = new rn(f, $, c, _, P, i, s, u);
            g.baseClass &&
              ((g.baseClass.__derivedClasses ??= []),
              g.baseClass.__derivedClasses.push(g));
            var O = new Ve(f, g, !0, !1, !1),
              k = new Ve(f + '*', g, !1, !1, !1),
              z = new Ve(f + ' const*', g, !1, !0, !1);
            return (
              (zr[e] = { pointerType: k, constPointerType: z }),
              on(p, $),
              [O, k, z]
            );
          });
      },
      Zr = (e, r) => {
        for (var t = [], n = 0; n < e; n++) t.push(b[(r + n * 4) >> 2]);
        return t;
      };
    function vn(e) {
      for (var r = 1; r < e.length; ++r)
        if (e[r] !== null && e[r].destructorFunction === void 0) return !0;
      return !1;
    }
    var _n = {
      ftf: function (e, r, t, n, a, i, o) {
        if (arguments.length !== 7)
          throw new Error(
            e + 'Expected 7 closure arguments ' + arguments.length + ' given.'
          );
        return function () {
          arguments.length !== 0 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 0'
            );
          var s = t(n),
            l = i.fromWireType(s);
          return l;
        };
      },
      ttfn: function (e, r, t, n, a, i, o) {
        if (arguments.length !== 7)
          throw new Error(
            e + 'Expected 7 closure arguments ' + arguments.length + ' given.'
          );
        return function () {
          arguments.length !== 0 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 0'
            );
          var s = o.toWireType(null, this),
            l = t(n, s),
            u = i.fromWireType(l);
          return u;
        };
      },
      tffntn: function (e, r, t, n, a, i, o, s, l, u) {
        if (arguments.length !== 10)
          throw new Error(
            e + 'Expected 10 closure arguments ' + arguments.length + ' given.'
          );
        return function (f, v) {
          arguments.length !== 2 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 2'
            );
          var _ = o.toWireType(null, this),
            p = s.toWireType(null, f),
            w = l.toWireType(null, v);
          t(n, _, p, w), u(p);
        };
      },
      tffnt: function (e, r, t, n, a, i, o, s, l) {
        if (arguments.length !== 9)
          throw new Error(
            e + 'Expected 9 closure arguments ' + arguments.length + ' given.'
          );
        return function (u) {
          arguments.length !== 1 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 1'
            );
          var f = o.toWireType(null, this),
            v = s.toWireType(null, u);
          t(n, f, v), l(v);
        };
      },
      ttfntn: function (e, r, t, n, a, i, o, s, l, u) {
        if (arguments.length !== 10)
          throw new Error(
            e + 'Expected 10 closure arguments ' + arguments.length + ' given.'
          );
        return function (f, v) {
          arguments.length !== 2 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 2'
            );
          var _ = o.toWireType(null, this),
            p = s.toWireType(null, f),
            w = l.toWireType(null, v),
            P = t(n, _, p, w);
          u(p);
          var S = i.fromWireType(P);
          return S;
        };
      },
      ttfnnttt: function (e, r, t, n, a, i, o, s, l, u, f, v, _, p) {
        if (arguments.length !== 14)
          throw new Error(
            e + 'Expected 14 closure arguments ' + arguments.length + ' given.'
          );
        return function (w, P, S, $) {
          arguments.length !== 4 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 4'
            );
          var c = o.toWireType(null, this),
            g = s.toWireType(null, w),
            O = l.toWireType(null, P),
            k = u.toWireType(null, S),
            z = f.toWireType(null, $),
            ae = t(n, c, g, O, k, z);
          v(O), _(k), p(z);
          var Ke = i.fromWireType(ae);
          return Ke;
        };
      },
      ttfnt: function (e, r, t, n, a, i, o, s, l) {
        if (arguments.length !== 9)
          throw new Error(
            e + 'Expected 9 closure arguments ' + arguments.length + ' given.'
          );
        return function (u) {
          arguments.length !== 1 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 1'
            );
          var f = o.toWireType(null, this),
            v = s.toWireType(null, u),
            _ = t(n, f, v);
          l(v);
          var p = i.fromWireType(_);
          return p;
        };
      },
      ttfntnn: function (e, r, t, n, a, i, o, s, l, u, f) {
        if (arguments.length !== 11)
          throw new Error(
            e + 'Expected 11 closure arguments ' + arguments.length + ' given.'
          );
        return function (v, _, p) {
          arguments.length !== 3 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 3'
            );
          var w = o.toWireType(null, this),
            P = s.toWireType(null, v),
            S = l.toWireType(null, _),
            $ = u.toWireType(null, p),
            c = t(n, w, P, S, $);
          f(P);
          var g = i.fromWireType(c);
          return g;
        };
      },
      tffntt: function (e, r, t, n, a, i, o, s, l, u, f) {
        if (arguments.length !== 11)
          throw new Error(
            e + 'Expected 11 closure arguments ' + arguments.length + ' given.'
          );
        return function (v, _) {
          arguments.length !== 2 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 2'
            );
          var p = o.toWireType(null, this),
            w = s.toWireType(null, v),
            P = l.toWireType(null, _);
          t(n, p, w, P), u(w), f(P);
        };
      },
      tffnnn: function (e, r, t, n, a, i, o, s, l) {
        if (arguments.length !== 9)
          throw new Error(
            e + 'Expected 9 closure arguments ' + arguments.length + ' given.'
          );
        return function (u, f) {
          arguments.length !== 2 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 2'
            );
          var v = o.toWireType(null, this),
            _ = s.toWireType(null, u),
            p = l.toWireType(null, f);
          t(n, v, _, p);
        };
      },
      ttfnnn: function (e, r, t, n, a, i, o, s, l) {
        if (arguments.length !== 9)
          throw new Error(
            e + 'Expected 9 closure arguments ' + arguments.length + ' given.'
          );
        return function (u, f) {
          arguments.length !== 2 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 2'
            );
          var v = o.toWireType(null, this),
            _ = s.toWireType(null, u),
            p = l.toWireType(null, f),
            w = t(n, v, _, p),
            P = i.fromWireType(w);
          return P;
        };
      },
      ftfn: function (e, r, t, n, a, i, o, s) {
        if (arguments.length !== 8)
          throw new Error(
            e + 'Expected 8 closure arguments ' + arguments.length + ' given.'
          );
        return function (l) {
          arguments.length !== 1 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 1'
            );
          var u = s.toWireType(null, l),
            f = t(n, u),
            v = i.fromWireType(f);
          return v;
        };
      },
      tffnnt: function (e, r, t, n, a, i, o, s, l, u) {
        if (arguments.length !== 10)
          throw new Error(
            e + 'Expected 10 closure arguments ' + arguments.length + ' given.'
          );
        return function (f, v) {
          arguments.length !== 2 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 2'
            );
          var _ = o.toWireType(null, this),
            p = s.toWireType(null, f),
            w = l.toWireType(null, v);
          t(n, _, p, w), u(w);
        };
      },
      ttfnnt: function (e, r, t, n, a, i, o, s, l, u) {
        if (arguments.length !== 10)
          throw new Error(
            e + 'Expected 10 closure arguments ' + arguments.length + ' given.'
          );
        return function (f, v) {
          arguments.length !== 2 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 2'
            );
          var _ = o.toWireType(null, this),
            p = s.toWireType(null, f),
            w = l.toWireType(null, v),
            P = t(n, _, p, w);
          u(w);
          var S = i.fromWireType(P);
          return S;
        };
      },
      ttfnn: function (e, r, t, n, a, i, o, s) {
        if (arguments.length !== 8)
          throw new Error(
            e + 'Expected 8 closure arguments ' + arguments.length + ' given.'
          );
        return function (l) {
          arguments.length !== 1 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 1'
            );
          var u = o.toWireType(null, this),
            f = s.toWireType(null, l),
            v = t(n, u, f),
            _ = i.fromWireType(v);
          return _;
        };
      },
      tffnn: function (e, r, t, n, a, i, o, s) {
        if (arguments.length !== 8)
          throw new Error(
            e + 'Expected 8 closure arguments ' + arguments.length + ' given.'
          );
        return function (l) {
          arguments.length !== 1 &&
            r(
              'function ' +
                e +
                ' called with ' +
                arguments.length +
                ' arguments, expected 1'
            );
          var u = o.toWireType(null, this),
            f = s.toWireType(null, l);
          t(n, u, f);
        };
      },
    };
    function mn(e, r, t, n) {
      const a = [r ? 't' : 'f', t ? 't' : 'f', n ? 't' : 'f'];
      for (let i = r ? 1 : 2; i < e.length; ++i) {
        const o = e[i];
        let s = '';
        o.destructorFunction === void 0
          ? (s = 'u')
          : o.destructorFunction === null
            ? (s = 'n')
            : (s = 't'),
          a.push(s);
      }
      return a.join('');
    }
    function Qr(e, r, t, n, a, i) {
      var o = r.length;
      o < 2 &&
        E(
          "argTypes array size mismatch! Must at least get return value and 'this' types!"
        ),
        m(!i, 'Async bindings are only supported with JSPI.');
      for (
        var s = r[1] !== null && t !== null,
          l = vn(r),
          u = r[0].name !== 'void',
          f = [e, E, n, a, Ee, r[0], r[1]],
          v = 0;
        v < o - 2;
        ++v
      )
        f.push(r[v + 2]);
      if (!l)
        for (var v = s ? 1 : 2; v < r.length; ++v)
          r[v].destructorFunction !== null && f.push(r[v].destructorFunction);
      var _ = mn(r, s, u, i),
        p = _n[_](...f);
      return Ae(e, p);
    }
    var gn = (e, r, t, n, a, i) => {
        m(r > 0);
        var o = Zr(r, t);
        (a = I(n, a)),
          q([], [e], (s) => {
            s = s[0];
            var l = `constructor ${s.name}`;
            if (
              (s.registeredClass.constructor_body === void 0 &&
                (s.registeredClass.constructor_body = []),
              s.registeredClass.constructor_body[r - 1] !== void 0)
            )
              throw new fe(
                `Cannot register multiple constructors with identical number of parameters (${r - 1}) for class '${s.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`
              );
            return (
              (s.registeredClass.constructor_body[r - 1] = () => {
                $e(`Cannot construct ${s.name} due to unbound types`, o);
              }),
              q(
                [],
                o,
                (u) => (
                  u.splice(1, 0, null),
                  (s.registeredClass.constructor_body[r - 1] = Qr(
                    l,
                    u,
                    null,
                    a,
                    i
                  )),
                  []
                )
              ),
              []
            );
          });
      },
      pn = (e) => {
        e = e.trim();
        const r = e.indexOf('(');
        return r !== -1
          ? (m(
              e[e.length - 1] == ')',
              'Parentheses for argument names should match.'
            ),
            e.substr(0, r))
          : e;
      },
      hn = (e, r, t, n, a, i, o, s, l) => {
        var u = Zr(t, n);
        (r = M(r)),
          (r = pn(r)),
          (i = I(a, i)),
          q([], [e], (f) => {
            f = f[0];
            var v = `${f.name}.${r}`;
            r.startsWith('@@') && (r = Symbol[r.substring(2)]),
              s && f.registeredClass.pureVirtualFunctions.push(r);
            function _() {
              $e(`Cannot call ${v} due to unbound types`, u);
            }
            var p = f.registeredClass.instancePrototype,
              w = p[r];
            return (
              w === void 0 ||
              (w.overloadTable === void 0 &&
                w.className !== f.name &&
                w.argCount === t - 2)
                ? ((_.argCount = t - 2), (_.className = f.name), (p[r] = _))
                : (Jr(p, r, v), (p[r].overloadTable[t - 2] = _)),
              q([], u, (P) => {
                var S = Qr(v, P, f, i, o, l);
                return (
                  p[r].overloadTable === void 0
                    ? ((S.argCount = t - 2), (p[r] = S))
                    : (p[r].overloadTable[t - 2] = S),
                  []
                );
              }),
              []
            );
          });
      },
      et = (e, r, t) => (
        e instanceof Object || E(`${t} with invalid "this": ${e}`),
        e instanceof r.registeredClass.constructor ||
          E(`${t} incompatible with "this" of type ${e.constructor.name}`),
        e.$$.ptr ||
          E(`cannot call emscripten binding method ${t} on deleted object`),
        He(e.$$.ptr, e.$$.ptrType.registeredClass, r.registeredClass)
      ),
      yn = (e, r, t, n, a, i, o, s, l, u) => {
        (r = M(r)),
          (a = I(n, a)),
          q([], [e], (f) => {
            f = f[0];
            var v = `${f.name}.${r}`,
              _ = {
                get() {
                  $e(`Cannot access ${v} due to unbound types`, [t, o]);
                },
                enumerable: !0,
                configurable: !0,
              };
            return (
              l
                ? (_.set = () =>
                    $e(`Cannot access ${v} due to unbound types`, [t, o]))
                : (_.set = (p) => E(v + ' is a read-only property')),
              Object.defineProperty(f.registeredClass.instancePrototype, r, _),
              q([], l ? [t, o] : [t], (p) => {
                var w = p[0],
                  P = {
                    get() {
                      var $ = et(this, f, v + ' getter');
                      return w.fromWireType(a(i, $));
                    },
                    enumerable: !0,
                  };
                if (l) {
                  l = I(s, l);
                  var S = p[1];
                  P.set = function ($) {
                    var c = et(this, f, v + ' setter'),
                      g = [];
                    l(u, c, S.toWireType(g, $)), Ee(g);
                  };
                }
                return (
                  Object.defineProperty(
                    f.registeredClass.instancePrototype,
                    r,
                    P
                  ),
                  []
                );
              }),
              []
            );
          });
      },
      or = [],
      j = [],
      lr = (e) => {
        e > 9 &&
          --j[e + 1] === 0 &&
          (m(j[e] !== void 0, 'Decref for unallocated handle.'),
          (j[e] = void 0),
          or.push(e));
      },
      wn = () => j.length / 2 - 5 - or.length,
      bn = () => {
        j.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1),
          m(j.length === 5 * 2),
          (d.count_emval_handles = wn);
      },
      re = {
        toValue: (e) => (
          e || E('Cannot use deleted val. handle = ' + e),
          m(
            e === 2 || (j[e] !== void 0 && e % 2 === 0),
            `invalid handle: ${e}`
          ),
          j[e]
        ),
        toHandle: (e) => {
          switch (e) {
            case void 0:
              return 2;
            case null:
              return 4;
            case !0:
              return 6;
            case !1:
              return 8;
            default: {
              const r = or.pop() || j.length;
              return (j[r] = e), (j[r + 1] = 1), r;
            }
          }
        },
      },
      Tn = {
        name: 'emscripten::val',
        fromWireType: (e) => {
          var r = re.toValue(e);
          return lr(e), r;
        },
        toWireType: (e, r) => re.toHandle(r),
        argPackAdvance: H,
        readValueFromPointer: le,
        destructorFunction: null,
      },
      En = (e) => B(e, Tn),
      Pn = (e, r, t) => {
        switch (r) {
          case 1:
            return t
              ? function (n) {
                  return this.fromWireType(R[n]);
                }
              : function (n) {
                  return this.fromWireType(W[n]);
                };
          case 2:
            return t
              ? function (n) {
                  return this.fromWireType(ie[n >> 1]);
                }
              : function (n) {
                  return this.fromWireType(we[n >> 1]);
                };
          case 4:
            return t
              ? function (n) {
                  return this.fromWireType(D[n >> 2]);
                }
              : function (n) {
                  return this.fromWireType(b[n >> 2]);
                };
          default:
            throw new TypeError(`invalid integer width (${r}): ${e}`);
        }
      },
      Sn = (e, r, t, n) => {
        r = M(r);
        function a() {}
        (a.values = {}),
          B(e, {
            name: r,
            constructor: a,
            fromWireType: function (i) {
              return this.constructor.values[i];
            },
            toWireType: (i, o) => o.value,
            argPackAdvance: H,
            readValueFromPointer: Pn(r, t, n),
            destructorFunction: null,
          }),
          qr(r, a);
      },
      ur = (e, r) => {
        var t = ee[e];
        return t === void 0 && E(`${r} has unknown type ${Xr(e)}`), t;
      },
      Fn = (e, r, t) => {
        var n = ur(e, 'enum');
        r = M(r);
        var a = n.constructor,
          i = Object.create(n.constructor.prototype, {
            value: { value: t },
            constructor: { value: Ae(`${n.name}_${r}`, function () {}) },
          });
        (a.values[t] = i), (a[r] = i);
      },
      de = (e) => {
        if (e === null) return 'null';
        var r = typeof e;
        return r === 'object' || r === 'array' || r === 'function'
          ? e.toString()
          : '' + e;
      },
      Cn = (e, r) => {
        switch (r) {
          case 4:
            return function (t) {
              return this.fromWireType(Pr[t >> 2]);
            };
          case 8:
            return function (t) {
              return this.fromWireType(Sr[t >> 3]);
            };
          default:
            throw new TypeError(`invalid float width (${r}): ${e}`);
        }
      },
      An = (e, r, t) => {
        (r = M(r)),
          B(e, {
            name: r,
            fromWireType: (n) => n,
            toWireType: (n, a) => {
              if (typeof a != 'number' && typeof a != 'boolean')
                throw new TypeError(`Cannot convert ${de(a)} to ${this.name}`);
              return a;
            },
            argPackAdvance: H,
            readValueFromPointer: Cn(r, t),
            destructorFunction: null,
          });
      },
      $n = (e, r, t) => {
        switch (r) {
          case 1:
            return t ? (n) => R[n] : (n) => W[n];
          case 2:
            return t ? (n) => ie[n >> 1] : (n) => we[n >> 1];
          case 4:
            return t ? (n) => D[n >> 2] : (n) => b[n >> 2];
          default:
            throw new TypeError(`invalid integer width (${r}): ${e}`);
        }
      },
      kn = (e, r, t, n, a) => {
        (r = M(r)), a === -1 && (a = 4294967295);
        var i = (f) => f;
        if (n === 0) {
          var o = 32 - 8 * t;
          i = (f) => (f << o) >>> o;
        }
        var s = r.includes('unsigned'),
          l = (f, v) => {
            if (typeof f != 'number' && typeof f != 'boolean')
              throw new TypeError(`Cannot convert "${de(f)}" to ${v}`);
            if (f < n || f > a)
              throw new TypeError(
                `Passing a number "${de(f)}" from JS side to C/C++ side to an argument of type "${r}", which is outside the valid range [${n}, ${a}]!`
              );
          },
          u;
        s
          ? (u = function (f, v) {
              return l(v, this.name), v >>> 0;
            })
          : (u = function (f, v) {
              return l(v, this.name), v;
            }),
          B(e, {
            name: r,
            fromWireType: i,
            toWireType: u,
            argPackAdvance: H,
            readValueFromPointer: $n(r, t, n !== 0),
            destructorFunction: null,
          });
      },
      Wn = (e, r, t) => {
        var n = [
            Int8Array,
            Uint8Array,
            Int16Array,
            Uint16Array,
            Int32Array,
            Uint32Array,
            Float32Array,
            Float64Array,
          ],
          a = n[r];
        function i(o) {
          var s = b[o >> 2],
            l = b[(o + 4) >> 2];
          return new a(R.buffer, l, s);
        }
        (t = M(t)),
          B(
            e,
            {
              name: t,
              fromWireType: i,
              argPackAdvance: H,
              readValueFromPointer: i,
            },
            { ignoreDuplicateRegistrations: !0 }
          );
      },
      fr = (e, r, t, n) => {
        if (
          (m(
            typeof e == 'string',
            `stringToUTF8Array expects a string (got ${typeof e})`
          ),
          !(n > 0))
        )
          return 0;
        for (var a = t, i = t + n - 1, o = 0; o < e.length; ++o) {
          var s = e.charCodeAt(o);
          if (s >= 55296 && s <= 57343) {
            var l = e.charCodeAt(++o);
            s = (65536 + ((s & 1023) << 10)) | (l & 1023);
          }
          if (s <= 127) {
            if (t >= i) break;
            r[t++] = s;
          } else if (s <= 2047) {
            if (t + 1 >= i) break;
            (r[t++] = 192 | (s >> 6)), (r[t++] = 128 | (s & 63));
          } else if (s <= 65535) {
            if (t + 2 >= i) break;
            (r[t++] = 224 | (s >> 12)),
              (r[t++] = 128 | ((s >> 6) & 63)),
              (r[t++] = 128 | (s & 63));
          } else {
            if (t + 3 >= i) break;
            s > 1114111 &&
              J(
                'Invalid Unicode code point ' +
                  oe(s) +
                  ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).'
              ),
              (r[t++] = 240 | (s >> 18)),
              (r[t++] = 128 | ((s >> 12) & 63)),
              (r[t++] = 128 | ((s >> 6) & 63)),
              (r[t++] = 128 | (s & 63));
          }
        }
        return (r[t] = 0), t - a;
      },
      ke = (e, r, t) => (
        m(
          typeof t == 'number',
          'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!'
        ),
        fr(e, W, r, t)
      ),
      te = (e) => {
        for (var r = 0, t = 0; t < e.length; ++t) {
          var n = e.charCodeAt(t);
          n <= 127
            ? r++
            : n <= 2047
              ? (r += 2)
              : n >= 55296 && n <= 57343
                ? ((r += 4), ++t)
                : (r += 3);
        }
        return r;
      },
      Dn = (e, r) => {
        r = M(r);
        var t = r === 'std::string';
        B(e, {
          name: r,
          fromWireType(n) {
            var a = b[n >> 2],
              i = n + 4,
              o;
            if (t)
              for (var s = i, l = 0; l <= a; ++l) {
                var u = i + l;
                if (l == a || W[u] == 0) {
                  var f = u - s,
                    v = N(s, f);
                  o === void 0 ? (o = v) : ((o += '\0'), (o += v)), (s = u + 1);
                }
              }
            else {
              for (var _ = new Array(a), l = 0; l < a; ++l)
                _[l] = String.fromCharCode(W[i + l]);
              o = _.join('');
            }
            return L(n), o;
          },
          toWireType(n, a) {
            a instanceof ArrayBuffer && (a = new Uint8Array(a));
            var i,
              o = typeof a == 'string';
            o ||
              a instanceof Uint8Array ||
              a instanceof Uint8ClampedArray ||
              a instanceof Int8Array ||
              E('Cannot pass non-string to std::string'),
              t && o ? (i = te(a)) : (i = a.length);
            var s = ne(4 + i + 1),
              l = s + 4;
            if (((b[s >> 2] = i), t && o)) ke(a, l, i + 1);
            else if (o)
              for (var u = 0; u < i; ++u) {
                var f = a.charCodeAt(u);
                f > 255 &&
                  (L(l),
                  E('String has UTF-16 code units that do not fit in 8 bits')),
                  (W[l + u] = f);
              }
            else for (var u = 0; u < i; ++u) W[l + u] = a[u];
            return n !== null && n.push(L, s), s;
          },
          argPackAdvance: H,
          readValueFromPointer: le,
          destructorFunction(n) {
            L(n);
          },
        });
      },
      rt = typeof TextDecoder < 'u' ? new TextDecoder('utf-16le') : void 0,
      Mn = (e, r) => {
        m(
          e % 2 == 0,
          'Pointer passed to UTF16ToString must be aligned to two bytes!'
        );
        for (var t = e, n = t >> 1, a = n + r / 2; !(n >= a) && we[n]; ) ++n;
        if (((t = n << 1), t - e > 32 && rt))
          return rt.decode(W.subarray(e, t));
        for (var i = '', o = 0; !(o >= r / 2); ++o) {
          var s = ie[(e + o * 2) >> 1];
          if (s == 0) break;
          i += String.fromCharCode(s);
        }
        return i;
      },
      On = (e, r, t) => {
        if (
          (m(
            r % 2 == 0,
            'Pointer passed to stringToUTF16 must be aligned to two bytes!'
          ),
          m(
            typeof t == 'number',
            'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!'
          ),
          (t ??= 2147483647),
          t < 2)
        )
          return 0;
        t -= 2;
        for (
          var n = r, a = t < e.length * 2 ? t / 2 : e.length, i = 0;
          i < a;
          ++i
        ) {
          var o = e.charCodeAt(i);
          (ie[r >> 1] = o), (r += 2);
        }
        return (ie[r >> 1] = 0), r - n;
      },
      In = (e) => e.length * 2,
      Rn = (e, r) => {
        m(
          e % 4 == 0,
          'Pointer passed to UTF32ToString must be aligned to four bytes!'
        );
        for (var t = 0, n = ''; !(t >= r / 4); ) {
          var a = D[(e + t * 4) >> 2];
          if (a == 0) break;
          if ((++t, a >= 65536)) {
            var i = a - 65536;
            n += String.fromCharCode(55296 | (i >> 10), 56320 | (i & 1023));
          } else n += String.fromCharCode(a);
        }
        return n;
      },
      Un = (e, r, t) => {
        if (
          (m(
            r % 4 == 0,
            'Pointer passed to stringToUTF32 must be aligned to four bytes!'
          ),
          m(
            typeof t == 'number',
            'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!'
          ),
          (t ??= 2147483647),
          t < 4)
        )
          return 0;
        for (var n = r, a = n + t - 4, i = 0; i < e.length; ++i) {
          var o = e.charCodeAt(i);
          if (o >= 55296 && o <= 57343) {
            var s = e.charCodeAt(++i);
            o = (65536 + ((o & 1023) << 10)) | (s & 1023);
          }
          if (((D[r >> 2] = o), (r += 4), r + 4 > a)) break;
        }
        return (D[r >> 2] = 0), r - n;
      },
      xn = (e) => {
        for (var r = 0, t = 0; t < e.length; ++t) {
          var n = e.charCodeAt(t);
          n >= 55296 && n <= 57343 && ++t, (r += 4);
        }
        return r;
      },
      Ln = (e, r, t) => {
        t = M(t);
        var n, a, i, o;
        r === 2
          ? ((n = Mn), (a = On), (o = In), (i = (s) => we[s >> 1]))
          : r === 4 && ((n = Rn), (a = Un), (o = xn), (i = (s) => b[s >> 2])),
          B(e, {
            name: t,
            fromWireType: (s) => {
              for (var l = b[s >> 2], u, f = s + 4, v = 0; v <= l; ++v) {
                var _ = s + 4 + v * r;
                if (v == l || i(_) == 0) {
                  var p = _ - f,
                    w = n(f, p);
                  u === void 0 ? (u = w) : ((u += '\0'), (u += w)), (f = _ + r);
                }
              }
              return L(s), u;
            },
            toWireType: (s, l) => {
              typeof l != 'string' &&
                E(`Cannot pass non-string to C++ string type ${t}`);
              var u = o(l),
                f = ne(4 + u + r);
              return (
                (b[f >> 2] = u / r),
                a(l, f + 4, u + r),
                s !== null && s.push(L, f),
                f
              );
            },
            argPackAdvance: H,
            readValueFromPointer: le,
            destructorFunction(s) {
              L(s);
            },
          });
      },
      jn = (e, r, t, n, a, i) => {
        Re[e] = {
          name: M(r),
          rawConstructor: I(t, n),
          rawDestructor: I(a, i),
          elements: [],
        };
      },
      Nn = (e, r, t, n, a, i, o, s, l) => {
        Re[e].elements.push({
          getterReturnType: r,
          getter: I(t, n),
          getterContext: a,
          setterArgumentType: i,
          setter: I(o, s),
          setterContext: l,
        });
      },
      Hn = (e, r, t, n, a, i) => {
        Le[e] = {
          name: M(r),
          rawConstructor: I(t, n),
          rawDestructor: I(a, i),
          fields: [],
        };
      },
      Vn = (e, r, t, n, a, i, o, s, l, u) => {
        Le[e].fields.push({
          fieldName: M(r),
          getterReturnType: t,
          getter: I(n, a),
          getterContext: i,
          setterArgumentType: o,
          setter: I(s, l),
          setterContext: u,
        });
      },
      Yn = (e, r) => {
        (r = M(r)),
          B(e, {
            isVoid: !0,
            name: r,
            argPackAdvance: 0,
            fromWireType: () => {},
            toWireType: (t, n) => {},
          });
      },
      Bn = 1,
      zn = () => Bn,
      dr = [],
      Gn = (e, r, t, n) => ((e = dr[e]), (r = re.toValue(r)), e(null, r, t, n)),
      Jn = (e) => {
        var r = dr.length;
        return dr.push(e), r;
      },
      qn = (e, r) => {
        for (var t = new Array(e), n = 0; n < e; ++n)
          t[n] = ur(b[(r + n * 4) >> 2], 'parameter ' + n);
        return t;
      },
      Kn = Reflect.construct,
      Xn = (e, r, t) => {
        var n = [],
          a = e.toWireType(n, t);
        return n.length && (b[r >> 2] = re.toHandle(n)), a;
      },
      Zn = (e, r, t) => {
        var n = qn(e, r),
          a = n.shift();
        e--;
        var i = new Array(e),
          o = (l, u, f, v) => {
            for (var _ = 0, p = 0; p < e; ++p)
              (i[p] = n[p].readValueFromPointer(v + _)),
                (_ += n[p].argPackAdvance);
            var w = t === 1 ? Kn(u, i) : u.apply(l, i);
            return Xn(a, f, w);
          },
          s = `methodCaller<(${n.map((l) => l.name).join(', ')}) => ${a.name}>`;
        return Jn(Ae(s, o));
      },
      Qn = (e) => {
        e > 9 && (j[e + 1] += 1);
      },
      ea = (e) => {
        var r = re.toValue(e);
        Ee(r), lr(e);
      },
      ra = (e, r) => {
        e = ur(e, '_emval_take_value');
        var t = e.readValueFromPointer(r);
        return re.toHandle(t);
      },
      ta = (e, r) => W.set(ce[e].fileData, r),
      ze = [],
      na = () => ze.length,
      ce = [],
      cr = !1,
      aa = () => ((cr = !0), ce.length),
      ia = (e, r) => {
        var t = ze[e].childName,
          n = te(t) + 1;
        ke(t, r, n);
      },
      sa = (e) => ce[e].mode,
      oa = (e) => ce[e].fileData.length,
      la = (e, r) => {
        var t = ze[e].parentPath,
          n = te(t) + 1;
        ke(t, r, n);
      },
      ua = (e, r) => {
        var t = ce[e].pathName,
          n = te(t) + 1;
        ke(t, r, n);
      },
      fa = (e, r) => (m(x[e]), x[e].allocFile(r)),
      da = (e, r) => (m(x[e]), x[e].freeFile(r)),
      ca = (e, r) => (m(x[e]), x[e].getSize(r)),
      tt = (e, r) => (
        m(e == e >>> 0 || e == (e | 0)),
        m(r === (r | 0)),
        (r + 2097152) >>> 0 < 4194305 - !!e ? (e >>> 0) + r * 4294967296 : NaN
      );
    function va(e, r, t, n, a, i) {
      var o = tt(a, i);
      return m(x[e]), x[e].read ? x[e].read(r, t, n, o) : -28;
    }
    function _a(e, r, t, n, a, i) {
      var o = tt(a, i);
      return m(x[e]), x[e].write ? x[e].write(r, t, n, o) : -28;
    }
    var vr = [];
    function nt(e, r, t) {
      var n = te(e) + 1,
        a = new Array(n),
        i = fr(e, a, 0, a.length);
      return r && (a.length = i), a;
    }
    var ma = () => {
        if (!vr.length) {
          var e = null;
          if (
            (typeof window < 'u' && typeof window.prompt == 'function'
              ? ((e = window.prompt('Input: ')),
                e !== null &&
                  (e += `
`))
              : typeof readline == 'function' &&
                ((e = readline()),
                e !== null &&
                  (e += `
`)),
            !e)
          )
            return null;
          vr = nt(e, !0);
        }
        return vr.shift();
      },
      ga = () => {
        var e = ma();
        return typeof e == 'number' ? e : -1;
      },
      pa = () => {
        U('native code called abort()');
      },
      ha = () => Date.now(),
      ya = (e) => C(N(e)),
      at;
    at = () => performance.now();
    var wa = (e, r, t) => W.copyWithin(e, r, r + t),
      ba = (e) => Oe(N(e)),
      Ta = () => 2147483648,
      Ea = (e) => {
        var r = he.buffer,
          t = (e - r.byteLength + 65535) / 65536;
        try {
          return he.grow(t), Fr(), 1;
        } catch (n) {
          C(
            `growMemory: Attempted to grow heap from ${r.byteLength} bytes to ${e} bytes, but got error: ${n}`
          );
        }
      },
      Pa = (e) => {
        var r = W.length;
        (e >>>= 0), m(e > r);
        var t = Ta();
        if (e > t)
          return (
            C(
              `Cannot enlarge memory, requested ${e} bytes, but the limit is ${t} bytes!`
            ),
            !1
          );
        for (var n = (l, u) => l + ((u - (l % u)) % u), a = 1; a <= 4; a *= 2) {
          var i = r * (1 + 0.2 / a);
          i = Math.min(i, e + 100663296);
          var o = Math.min(t, n(Math.max(e, i), 65536)),
            s = Ea(o);
          if (s) return !0;
        }
        return (
          C(
            `Failed to grow the heap from ${r} bytes to ${o} bytes, not enough memory!`
          ),
          !1
        );
      },
      _r = {},
      Sa = () => br || './this.program',
      We = () => {
        if (!We.strings) {
          var e =
              (
                (typeof navigator == 'object' &&
                  navigator.languages &&
                  navigator.languages[0]) ||
                'C'
              ).replace('-', '_') + '.UTF-8',
            r = {
              USER: 'web_user',
              LOGNAME: 'web_user',
              PATH: '/',
              PWD: '/',
              HOME: '/home/web_user',
              LANG: e,
              _: Sa(),
            };
          for (var t in _r) _r[t] === void 0 ? delete r[t] : (r[t] = _r[t]);
          var n = [];
          for (var t in r) n.push(`${t}=${r[t]}`);
          We.strings = n;
        }
        return We.strings;
      },
      Fa = (e, r) => {
        for (var t = 0; t < e.length; ++t)
          m(e.charCodeAt(t) === (e.charCodeAt(t) & 255)),
            (R[r++] = e.charCodeAt(t));
        R[r] = 0;
      },
      Ca = (e, r) => {
        var t = 0;
        return (
          We().forEach((n, a) => {
            var i = r + t;
            (b[(e + a * 4) >> 2] = i), Fa(n, i), (t += n.length + 1);
          }),
          0
        );
      },
      Aa = (e, r) => {
        var t = We();
        b[e >> 2] = t.length;
        var n = 0;
        return t.forEach((a) => (n += a.length + 1)), (b[r >> 2] = n), 0;
      },
      it = 0,
      st = () => Mt || it > 0,
      $a = (e) => {
        st() || (d.onExit?.(e), (ye = !0)), Xe(e, new xr(e));
      },
      ka = (e, r) => {
        if ((Ni(), st() && !r)) {
          var t = `program exited (with status: ${e}), but keepRuntimeAlive() is set (counter=${it}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
          ve(t), C(t);
        }
        $a(e);
      },
      Wa = ka,
      Da = () => {
        if (
          typeof crypto == 'object' &&
          typeof crypto.getRandomValues == 'function'
        )
          return (e) => crypto.getRandomValues(e);
        U(
          'no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };'
        );
      },
      ot = (e) => (ot = Da())(e),
      Ma = (e, r) => (ot(W.subarray(e, e + r)), 0),
      Ge = (e) => e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0),
      Oa = (e, r) => {
        for (var t = 0, n = 0; n <= r; t += e[n++]);
        return t;
      },
      lt = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      ut = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Ia = (e, r) => {
        for (var t = new Date(e.getTime()); r > 0; ) {
          var n = Ge(t.getFullYear()),
            a = t.getMonth(),
            i = (n ? lt : ut)[a];
          if (r > i - t.getDate())
            (r -= i - t.getDate() + 1),
              t.setDate(1),
              a < 11
                ? t.setMonth(a + 1)
                : (t.setMonth(0), t.setFullYear(t.getFullYear() + 1));
          else return t.setDate(t.getDate() + r), t;
        }
        return t;
      },
      Ra = (e, r) => {
        m(
          e.length >= 0,
          'writeArrayToMemory array must have a length (should be an array or typed array)'
        ),
          R.set(e, r);
      },
      Ua = (e, r, t, n) => {
        var a = b[(n + 40) >> 2],
          i = {
            tm_sec: D[n >> 2],
            tm_min: D[(n + 4) >> 2],
            tm_hour: D[(n + 8) >> 2],
            tm_mday: D[(n + 12) >> 2],
            tm_mon: D[(n + 16) >> 2],
            tm_year: D[(n + 20) >> 2],
            tm_wday: D[(n + 24) >> 2],
            tm_yday: D[(n + 28) >> 2],
            tm_isdst: D[(n + 32) >> 2],
            tm_gmtoff: D[(n + 36) >> 2],
            tm_zone: a ? N(a) : '',
          },
          o = N(t),
          s = {
            '%c': '%a %b %d %H:%M:%S %Y',
            '%D': '%m/%d/%y',
            '%F': '%Y-%m-%d',
            '%h': '%b',
            '%r': '%I:%M:%S %p',
            '%R': '%H:%M',
            '%T': '%H:%M:%S',
            '%x': '%m/%d/%y',
            '%X': '%H:%M:%S',
            '%Ec': '%c',
            '%EC': '%C',
            '%Ex': '%m/%d/%y',
            '%EX': '%H:%M:%S',
            '%Ey': '%y',
            '%EY': '%Y',
            '%Od': '%d',
            '%Oe': '%e',
            '%OH': '%H',
            '%OI': '%I',
            '%Om': '%m',
            '%OM': '%M',
            '%OS': '%S',
            '%Ou': '%u',
            '%OU': '%U',
            '%OV': '%V',
            '%Ow': '%w',
            '%OW': '%W',
            '%Oy': '%y',
          };
        for (var l in s) o = o.replace(new RegExp(l, 'g'), s[l]);
        var u = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          f = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];
        function v(c, g, O) {
          for (
            var k = typeof c == 'number' ? c.toString() : c || '';
            k.length < g;

          )
            k = O[0] + k;
          return k;
        }
        function _(c, g) {
          return v(c, g, '0');
        }
        function p(c, g) {
          function O(z) {
            return z < 0 ? -1 : z > 0 ? 1 : 0;
          }
          var k;
          return (
            (k = O(c.getFullYear() - g.getFullYear())) === 0 &&
              (k = O(c.getMonth() - g.getMonth())) === 0 &&
              (k = O(c.getDate() - g.getDate())),
            k
          );
        }
        function w(c) {
          switch (c.getDay()) {
            case 0:
              return new Date(c.getFullYear() - 1, 11, 29);
            case 1:
              return c;
            case 2:
              return new Date(c.getFullYear(), 0, 3);
            case 3:
              return new Date(c.getFullYear(), 0, 2);
            case 4:
              return new Date(c.getFullYear(), 0, 1);
            case 5:
              return new Date(c.getFullYear() - 1, 11, 31);
            case 6:
              return new Date(c.getFullYear() - 1, 11, 30);
          }
        }
        function P(c) {
          var g = Ia(new Date(c.tm_year + 1900, 0, 1), c.tm_yday),
            O = new Date(g.getFullYear(), 0, 4),
            k = new Date(g.getFullYear() + 1, 0, 4),
            z = w(O),
            ae = w(k);
          return p(z, g) <= 0
            ? p(ae, g) <= 0
              ? g.getFullYear() + 1
              : g.getFullYear()
            : g.getFullYear() - 1;
        }
        var S = {
          '%a': (c) => u[c.tm_wday].substring(0, 3),
          '%A': (c) => u[c.tm_wday],
          '%b': (c) => f[c.tm_mon].substring(0, 3),
          '%B': (c) => f[c.tm_mon],
          '%C': (c) => {
            var g = c.tm_year + 1900;
            return _((g / 100) | 0, 2);
          },
          '%d': (c) => _(c.tm_mday, 2),
          '%e': (c) => v(c.tm_mday, 2, ' '),
          '%g': (c) => P(c).toString().substring(2),
          '%G': P,
          '%H': (c) => _(c.tm_hour, 2),
          '%I': (c) => {
            var g = c.tm_hour;
            return g == 0 ? (g = 12) : g > 12 && (g -= 12), _(g, 2);
          },
          '%j': (c) =>
            _(c.tm_mday + Oa(Ge(c.tm_year + 1900) ? lt : ut, c.tm_mon - 1), 3),
          '%m': (c) => _(c.tm_mon + 1, 2),
          '%M': (c) => _(c.tm_min, 2),
          '%n': () => `
`,
          '%p': (c) => (c.tm_hour >= 0 && c.tm_hour < 12 ? 'AM' : 'PM'),
          '%S': (c) => _(c.tm_sec, 2),
          '%t': () => '	',
          '%u': (c) => c.tm_wday || 7,
          '%U': (c) => {
            var g = c.tm_yday + 7 - c.tm_wday;
            return _(Math.floor(g / 7), 2);
          },
          '%V': (c) => {
            var g = Math.floor((c.tm_yday + 7 - ((c.tm_wday + 6) % 7)) / 7);
            if (((c.tm_wday + 371 - c.tm_yday - 2) % 7 <= 2 && g++, g)) {
              if (g == 53) {
                var k = (c.tm_wday + 371 - c.tm_yday) % 7;
                k != 4 && (k != 3 || !Ge(c.tm_year)) && (g = 1);
              }
            } else {
              g = 52;
              var O = (c.tm_wday + 7 - c.tm_yday - 1) % 7;
              (O == 4 || (O == 5 && Ge((c.tm_year % 400) - 1))) && g++;
            }
            return _(g, 2);
          },
          '%w': (c) => c.tm_wday,
          '%W': (c) => {
            var g = c.tm_yday + 7 - ((c.tm_wday + 6) % 7);
            return _(Math.floor(g / 7), 2);
          },
          '%y': (c) => (c.tm_year + 1900).toString().substring(2),
          '%Y': (c) => c.tm_year + 1900,
          '%z': (c) => {
            var g = c.tm_gmtoff,
              O = g >= 0;
            return (
              (g = Math.abs(g) / 60),
              (g = (g / 60) * 100 + (g % 60)),
              (O ? '+' : '-') + ('0000' + g).slice(-4)
            );
          },
          '%Z': (c) => c.tm_zone,
          '%%': () => '%',
        };
        o = o.replace(/%%/g, '\0\0');
        for (var l in S)
          o.includes(l) && (o = o.replace(new RegExp(l, 'g'), S[l](i)));
        o = o.replace(/\0\0/g, '%');
        var $ = nt(o, !1);
        return $.length > r ? 0 : (Ra($, e), $.length - 1);
      },
      xa = (e, r, t, n, a) => Ua(e, r, t, n),
      F = (e) => {
        var r = te(e) + 1,
          t = Xa(r);
        return ke(e, t, r), t;
      },
      V = {
        isAbs: (e) => e.charAt(0) === '/',
        splitPath: (e) => {
          var r =
            /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
          return r.exec(e).slice(1);
        },
        normalizeArray: (e, r) => {
          for (var t = 0, n = e.length - 1; n >= 0; n--) {
            var a = e[n];
            a === '.'
              ? e.splice(n, 1)
              : a === '..'
                ? (e.splice(n, 1), t++)
                : t && (e.splice(n, 1), t--);
          }
          if (r) for (; t; t--) e.unshift('..');
          return e;
        },
        normalize: (e) => {
          var r = V.isAbs(e),
            t = e.substr(-1) === '/';
          return (
            (e = V.normalizeArray(
              e.split('/').filter((n) => !!n),
              !r
            ).join('/')),
            !e && !r && (e = '.'),
            e && t && (e += '/'),
            (r ? '/' : '') + e
          );
        },
        dirname: (e) => {
          var r = V.splitPath(e),
            t = r[0],
            n = r[1];
          return !t && !n ? '.' : (n && (n = n.substr(0, n.length - 1)), t + n);
        },
        basename: (e) => {
          if (e === '/') return '/';
          (e = V.normalize(e)), (e = e.replace(/\/$/, ''));
          var r = e.lastIndexOf('/');
          return r === -1 ? e : e.substr(r + 1);
        },
        join: (...e) => V.normalize(e.join('/')),
        join2: (e, r) => V.normalize(e + '/' + r),
      },
      A = (e) => {
        var r = qa(),
          t = e();
        return Ka(r), t;
      },
      De = (e) => b[e >> 2] + D[(e + 4) >> 2] * 4294967296,
      La = (e) => b[e >> 2] + b[(e + 4) >> 2] * 4294967296,
      ft = (e, r, t) =>
        y.handleError(
          A(() => {
            var n = F(e);
            return ii(n, r, t);
          })
        ),
      dt = (e, r = 438) => ((r &= 4095), (r |= 32768), ft(e, r, 0)),
      ct = (e, r) =>
        A(() => {
          var t = F(e);
          if (typeof r == 'string') {
            var n = new Uint8Array(te(r) + 1),
              a = fr(r, n, 0, n.length);
            r = n.slice(0, a);
          }
          var i = ne(r.length);
          m(i);
          for (var o = 0; o < r.length; o++) R[i + o] = r[o];
          var s = ei(t, i, r.length);
          return L(i), s;
        }),
      vt = (e, r, t, n, a, i) => {
        var o = r ? e + '/' + r : e,
          s = _t(n, a);
        cr
          ? (dt(o, s), ct(o, t))
          : ce.push({ pathName: o, fileData: t, mode: s });
      },
      ja = (e, r, t, n) => {
        var a = Wr(`al ${e}`);
        me(
          e,
          (i) => {
            m(i, `Loading data file "${e}" failed (no arrayBuffer).`),
              r(new Uint8Array(i)),
              a && Te(a);
          },
          (i) => {
            if (t) t();
            else throw `Loading data file "${e}" failed.`;
          }
        ),
          a && Ie(a);
      },
      mr = {
        resolve: (...e) => {
          for (var r = '', t = !1, n = e.length - 1; n >= -1 && !t; n--) {
            var a = n >= 0 ? e[n] : y.cwd();
            if (typeof a != 'string')
              throw new TypeError('Arguments to path.resolve must be strings');
            if (!a) return '';
            (r = a + '/' + r), (t = V.isAbs(a));
          }
          return (
            (r = V.normalizeArray(
              r.split('/').filter((i) => !!i),
              !t
            ).join('/')),
            (t ? '/' : '') + r || '.'
          );
        },
        relative: (e, r) => {
          (e = mr.resolve(e).substr(1)), (r = mr.resolve(r).substr(1));
          function t(u) {
            for (var f = 0; f < u.length && u[f] === ''; f++);
            for (var v = u.length - 1; v >= 0 && u[v] === ''; v--);
            return f > v ? [] : u.slice(f, v - f + 1);
          }
          for (
            var n = t(e.split('/')),
              a = t(r.split('/')),
              i = Math.min(n.length, a.length),
              o = i,
              s = 0;
            s < i;
            s++
          )
            if (n[s] !== a[s]) {
              o = s;
              break;
            }
          for (var l = [], s = o; s < n.length; s++) l.push('..');
          return (l = l.concat(a.slice(o))), l.join('/');
        },
      },
      Na = d.preloadPlugins || [],
      Ha = (e, r, t, n) => {
        typeof Browser < 'u' && Browser.init();
        var a = !1;
        return (
          Na.forEach((i) => {
            a || (i.canHandle(r) && (i.handle(e, r, t, n), (a = !0)));
          }),
          a
        );
      },
      Va = (e, r, t, n, a, i, o, s, l, u) => {
        var f = r ? mr.resolve(V.join2(e, r)) : e,
          v = Wr(`cp ${f}`);
        function _(p) {
          function w(P) {
            u?.(), s || vt(e, r, P, n, a), i?.(), Te(v);
          }
          Ha(p, f, w, () => {
            o?.(), Te(v);
          }) || w(p);
        }
        Ie(v), typeof t == 'string' ? ja(t, _, o) : _(t);
      },
      _t = (e, r) => {
        var t = 0;
        return e && (t |= 365), r && (t |= 146), t;
      },
      Ya = (e) => {
        var r = { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
          t = r[e];
        if (typeof t > 'u') throw new Error(`Unknown file open mode: ${e}`);
        return t;
      },
      mt = (e, r = 511) =>
        y.handleError(
          A(() => {
            var t = F(e);
            return ri(t, r);
          })
        ),
      Ba = (e, r) => {
        for (var t = e.split('/'), n = '', a = 0; a < t.length; ++a)
          if (t[a]) {
            n += '/' + t[a];
            try {
              mt(n, r);
            } catch (i) {
              if (i.errno != 20) throw i;
            }
          }
      },
      za = (e) =>
        A(() => {
          var r = F(e);
          return si(r);
        }),
      x = {},
      gt = {},
      Je = {},
      y = {
        init() {
          y.ensureErrnoError();
        },
        ErrnoError: null,
        handleError(e) {
          if (e < 0) throw new y.ErrnoError(-e);
          return e;
        },
        ensureErrnoError() {
          y.ErrnoError ||
            ((y.ErrnoError = function (r) {
              (this.errno = r),
                (this.message = 'FS error'),
                (this.name = 'ErrnoError');
            }),
            (y.ErrnoError.prototype = new Error()),
            (y.ErrnoError.prototype.constructor = y.ErrnoError));
        },
        createDataFile(e, r, t, n, a, i) {
          vt(e, r, t, n, a);
        },
        createPath(e, r, t, n) {
          for (var a = r.split('/').reverse(); a.length; ) {
            var i = a.pop();
            if (i) {
              var o = V.join2(e, i);
              cr ? y.mkdir(o) : ze.push({ parentPath: e, childName: i }),
                (e = o);
            }
          }
          return o;
        },
        createPreloadedFile(e, r, t, n, a, i, o, s, l, u) {
          return Va(e, r, t, n, a, i, o, s, l, u);
        },
        readFile(e, r = {}) {
          if (
            ((r.encoding = r.encoding || 'binary'),
            r.encoding !== 'utf8' && r.encoding !== 'binary')
          )
            throw new Error('Invalid encoding type "' + r.encoding + '"');
          var t = A(() => Qa(F(e))),
            n = De(t),
            a = new Uint8Array(W.subarray(t + 8, t + 8 + n));
          return r.encoding === 'utf8' && (a = jr(a, 0)), a;
        },
        cwd: () => N(Oi()),
        analyzePath(e) {
          var r = !!y.findObject(e);
          return { exists: r, object: { contents: r ? y.readFile(e) : null } };
        },
        mkdir: (e, r) => mt(e, r),
        mkdirTree: (e, r) => Ba(e, r),
        rmdir: (e) => y.handleError(A(() => ti(F(e)))),
        open: (e, r, t) =>
          A(() => {
            (r = typeof r == 'string' ? Ya(r) : r),
              (t = typeof t > 'u' ? 438 : t);
            var n = F(e),
              a = y.handleError(ni(n, r, t));
            return { fd: a };
          }),
        create: (e, r) => dt(e, r),
        close: (e) => y.handleError(-bi(e.fd)),
        unlink: (e) => za(e),
        chdir: (e) =>
          A(() => {
            var r = F(e);
            return oi(r);
          }),
        read(e, r, t, n, a) {
          var i = typeof a < 'u',
            o = ne(n),
            s;
          i ? (s = hi(e.fd, o, n, a)) : (s = pi(e.fd, o, n)),
            (s = y.handleError(s));
          for (var l = 0; l < n; l++) r[t + l] = R[o + l];
          return L(o), s;
        },
        write(e, r, t, n, a, i) {
          for (var o = typeof a < 'u', s = ne(n), l = 0; l < n; l++)
            R[s + l] = r[t + l];
          var u;
          return (
            o ? (u = di(e.fd, s, n, a)) : (u = fi(e.fd, s, n)),
            (u = y.handleError(u)),
            L(s),
            u
          );
        },
        allocate(e, r, t) {
          return y.handleError(
            ai(
              e.fd,
              r >>> 0,
              ((T = r),
              +Math.abs(T) >= 1
                ? T > 0
                  ? +Math.floor(T / 4294967296) >>> 0
                  : ~~+Math.ceil((T - +(~~T >>> 0)) / 4294967296) >>> 0
                : 0),
              t >>> 0,
              ((T = t),
              +Math.abs(T) >= 1
                ? T > 0
                  ? +Math.floor(T / 4294967296) >>> 0
                  : ~~+Math.ceil((T - +(~~T >>> 0)) / 4294967296) >>> 0
                : 0)
            )
          );
        },
        writeFile: (e, r) => ct(e, r),
        mmap: (e, r, t, n, a) => {
          var i = y.handleError(
            Ti(
              r,
              n,
              a,
              e.fd,
              t >>> 0,
              ((T = t),
              +Math.abs(T) >= 1
                ? T > 0
                  ? +Math.floor(T / 4294967296) >>> 0
                  : ~~+Math.ceil((T - +(~~T >>> 0)) / 4294967296) >>> 0
                : 0)
            )
          );
          return { ptr: i, allocated: !0 };
        },
        msync: (e, r, t, n, a) => (m(t === 0), y.handleError(Ei(r, n, a))),
        munmap: (e, r) => y.handleError(Pi(e, r)),
        symlink: (e, r) => A(() => li(F(e), F(r))),
        readlink(e) {
          var r = y.handleError(A(() => ui(F(e))));
          return N(r);
        },
        statBufToObject(e) {
          return {
            dev: b[e >> 2],
            mode: b[(e + 4) >> 2],
            nlink: b[(e + 8) >> 2],
            uid: b[(e + 12) >> 2],
            gid: b[(e + 16) >> 2],
            rdev: b[(e + 20) >> 2],
            size: De(e + 24),
            blksize: b[(e + 32) >> 2],
            blocks: b[(e + 36) >> 2],
            atime: De(e + 40),
            mtime: De(e + 56),
            ctime: De(e + 72),
            ino: La(e + 88),
          };
        },
        stat(e) {
          var r = ne(96);
          y.handleError(A(() => Fi(F(e), r)));
          var t = y.statBufToObject(r);
          return L(r), t;
        },
        lstat(e) {
          var r = ne(96);
          y.handleError(A(() => Ci(F(e), r)));
          var t = y.statBufToObject(r);
          return L(r), t;
        },
        chmod(e, r) {
          return y.handleError(
            A(() => {
              var t = F(e);
              return ci(t, r);
            })
          );
        },
        lchmod(e, r) {
          return y.handleError(
            A(() => {
              var t = F(e);
              return _i(t, r);
            })
          );
        },
        fchmod(e, r) {
          return y.handleError(vi(e, r));
        },
        utime: (e, r, t) => y.handleError(A(() => Si(F(e), r, t))),
        truncate(e, r) {
          return y.handleError(
            A(() =>
              yi(
                F(e),
                r >>> 0,
                ((T = r),
                +Math.abs(T) >= 1
                  ? T > 0
                    ? +Math.floor(T / 4294967296) >>> 0
                    : ~~+Math.ceil((T - +(~~T >>> 0)) / 4294967296) >>> 0
                  : 0)
              )
            )
          );
        },
        ftruncate(e, r) {
          return y.handleError(
            wi(
              e,
              r >>> 0,
              ((T = r),
              +Math.abs(T) >= 1
                ? T > 0
                  ? +Math.floor(T / 4294967296) >>> 0
                  : ~~+Math.ceil((T - +(~~T >>> 0)) / 4294967296) >>> 0
                : 0)
            )
          );
        },
        findObject(e) {
          var r = A(() => ki(F(e)));
          return r == 44 ? null : { isFolder: r == 31, isDevice: !1 };
        },
        readdir: (e) =>
          A(() => {
            var r = F(e),
              t = [],
              n = Wi(r);
            if (!n) throw new Error('No such directory');
            for (var a; (a = Di(n)); ) t.push(N(a));
            return Mi(n), t;
          }),
        mount: (e, r, t) => {
          if (typeof e == 'string') throw e;
          var n = e.createBackend(r);
          return y.handleError(A(() => Ai(F(t), n)));
        },
        unmount: (e) => y.handleError(A(() => $i(F(e)))),
        mknod: (e, r, t) => ft(e, r, t),
        makedev: (e, r) => (e << 8) | r,
        registerDevice(e, r) {
          var t = Ii(),
            n = {
              userRead: r.read,
              userWrite: r.write,
              allocFile: (a) => {
                Je[a] = {};
              },
              freeFile: (a) => {
                Je[a] = void 0;
              },
              getSize: (a) => {},
              read: (a, i, o, s) => {
                var l = d.HEAP8.subarray(i, i + o);
                try {
                  var u = n.userRead(Je[a], l, 0, o, s);
                } catch (f) {
                  return -f.errno;
                }
                return d.HEAP8.set(l, i), u;
              },
              write: (a, i, o, s) => {
                var l = d.HEAP8.subarray(i, i + o);
                try {
                  var u = n.userWrite(Je[a], l, 0, o, s);
                } catch (f) {
                  return -f.errno;
                }
                return d.HEAP8.set(l, i), u;
              },
            };
          (x[t] = n), (gt[e] = t);
        },
        createDevice(e, r, t, n) {
          if (typeof e != 'string')
            throw new Error('Only string paths are accepted');
          var a = V.join2(e, r),
            i = _t(!!t, !!n);
          y.createDevice.major || (y.createDevice.major = 64);
          var o = y.makedev(y.createDevice.major++, 0);
          return (
            y.registerDevice(o, {
              read(s, l, u, f, v) {
                for (var _ = 0, p = 0; p < f; p++) {
                  var w;
                  try {
                    w = t();
                  } catch {
                    throw new y.ErrnoError(29);
                  }
                  if (w === void 0 && _ === 0) throw new y.ErrnoError(6);
                  if (w == null) break;
                  _++, (l[u + p] = w);
                }
                return _;
              },
              write(s, l, u, f, v) {
                for (var _ = 0; _ < f; _++)
                  try {
                    n(l[u + _]);
                  } catch {
                    throw new y.ErrnoError(29);
                  }
                return _;
              },
            }),
            y.mkdev(a, i, o)
          );
        },
        mkdev(e, r, t) {
          typeof t > 'u' && ((t = r), (r = 438));
          var n = gt[t];
          if (!n) throw new Error('Invalid device ID.');
          return y.handleError(A(() => Ri(F(e), r, n)));
        },
        rename(e, r) {
          return y.handleError(
            A(() => {
              var t = F(e),
                n = F(r);
              return gi(t, n);
            })
          );
        },
        llseek(e, r, t) {
          return y.handleError(
            mi(
              e.fd,
              r >>> 0,
              ((T = r),
              +Math.abs(T) >= 1
                ? T > 0
                  ? +Math.floor(T / 4294967296) >>> 0
                  : ~~+Math.ceil((T - +(~~T >>> 0)) / 4294967296) >>> 0
                : 0),
              t
            )
          );
        },
      };
    (Nr = d.InternalError =
      class extends Error {
        constructor(r) {
          super(r), (this.name = 'InternalError');
        }
      }),
      jt(),
      (fe = d.BindingError =
        class extends Error {
          constructor(r) {
            super(r), (this.name = 'BindingError');
          }
        }),
      Xt(),
      Jt(),
      sn(),
      (Kr = d.UnboundTypeError = dn(Error, 'UnboundTypeError')),
      bn(),
      y.init();
    function Ga() {
      Wt('fetchSettings');
    }
    var pt = {
        __assert_fail: Ot,
        __cxa_throw: Rt,
        _embind_finalize_value_array: Ut,
        _embind_finalize_value_object: xt,
        _embind_register_bigint: Lt,
        _embind_register_bool: Ht,
        _embind_register_class: cn,
        _embind_register_class_constructor: gn,
        _embind_register_class_function: hn,
        _embind_register_class_property: yn,
        _embind_register_emval: En,
        _embind_register_enum: Sn,
        _embind_register_enum_value: Fn,
        _embind_register_float: An,
        _embind_register_integer: kn,
        _embind_register_memory_view: Wn,
        _embind_register_std_string: Dn,
        _embind_register_std_wstring: Ln,
        _embind_register_value_array: jn,
        _embind_register_value_array_element: Nn,
        _embind_register_value_object: Hn,
        _embind_register_value_object_field: Vn,
        _embind_register_void: Yn,
        _emscripten_get_now_is_monotonic: zn,
        _emval_call: Gn,
        _emval_decref: lr,
        _emval_get_method_caller: Zn,
        _emval_incref: Qn,
        _emval_run_destructors: ea,
        _emval_take_value: ra,
        _wasmfs_copy_preloaded_file_data: ta,
        _wasmfs_get_num_preloaded_dirs: na,
        _wasmfs_get_num_preloaded_files: aa,
        _wasmfs_get_preloaded_child_path: ia,
        _wasmfs_get_preloaded_file_mode: sa,
        _wasmfs_get_preloaded_file_size: oa,
        _wasmfs_get_preloaded_parent_path: la,
        _wasmfs_get_preloaded_path_name: ua,
        _wasmfs_jsimpl_alloc_file: fa,
        _wasmfs_jsimpl_free_file: da,
        _wasmfs_jsimpl_get_size: ca,
        _wasmfs_jsimpl_read: va,
        _wasmfs_jsimpl_write: _a,
        _wasmfs_stdin_get_char: ga,
        abort: pa,
        emscripten_date_now: ha,
        emscripten_err: ya,
        emscripten_get_now: at,
        emscripten_memcpy_js: wa,
        emscripten_out: ba,
        emscripten_resize_heap: Pa,
        environ_get: Ca,
        environ_sizes_get: Aa,
        exit: Wa,
        getentropy: Ma,
        strftime_l: xa,
      },
      X = kt(),
      L = (d._free = h('free')),
      ne = (d._malloc = h('malloc')),
      Ja = h('__getTypeName'),
      ht = () => (ht = X.emscripten_stack_init)(),
      gr = () => (gr = X.emscripten_stack_get_end)(),
      qa = h('stackSave'),
      Ka = h('stackRestore'),
      Xa = h('stackAlloc'),
      Za = h('__cxa_is_pointer_type'),
      Qa = h('_wasmfs_read_file'),
      ei = h('_wasmfs_write_file'),
      ri = h('_wasmfs_mkdir'),
      ti = h('_wasmfs_rmdir'),
      ni = h('_wasmfs_open'),
      ai = h('_wasmfs_allocate'),
      ii = h('_wasmfs_mknod'),
      si = h('_wasmfs_unlink'),
      oi = h('_wasmfs_chdir'),
      li = h('_wasmfs_symlink'),
      ui = h('_wasmfs_readlink'),
      fi = h('_wasmfs_write'),
      di = h('_wasmfs_pwrite'),
      ci = h('_wasmfs_chmod'),
      vi = h('_wasmfs_fchmod'),
      _i = h('_wasmfs_lchmod'),
      mi = h('_wasmfs_llseek'),
      gi = h('_wasmfs_rename'),
      pi = h('_wasmfs_read'),
      hi = h('_wasmfs_pread'),
      yi = h('_wasmfs_truncate'),
      wi = h('_wasmfs_ftruncate'),
      bi = h('_wasmfs_close'),
      Ti = h('_wasmfs_mmap'),
      Ei = h('_wasmfs_msync'),
      Pi = h('_wasmfs_munmap'),
      Si = h('_wasmfs_utime'),
      Fi = h('_wasmfs_stat'),
      Ci = h('_wasmfs_lstat'),
      Ai = h('_wasmfs_mount'),
      $i = h('_wasmfs_unmount'),
      ki = h('_wasmfs_identify'),
      Wi = h('_wasmfs_readdir_start'),
      Di = h('_wasmfs_readdir_get'),
      Mi = h('_wasmfs_readdir_finish'),
      Oi = h('_wasmfs_get_cwd'),
      Ii = h('wasmfs_create_jsimpl_backend'),
      Ri = h('wasmfs_create_file'),
      Ui = h('wasmfs_flush');
    (d.dynCall_fiij = h('dynCall_fiij')),
      (d.dynCall_viijf = h('dynCall_viijf')),
      (d.dynCall_jiji = h('dynCall_jiji')),
      (d.dynCall_viijii = h('dynCall_viijii')),
      (d.dynCall_iiiiij = h('dynCall_iiiiij')),
      (d.dynCall_iiiiijj = h('dynCall_iiiiijj')),
      (d.dynCall_iiiiiijj = h('dynCall_iiiiiijj')),
      (d.dynCall_ji = h('dynCall_ji')),
      (d.dynCall_iiiij = h('dynCall_iiiij')),
      (d.dynCall_iij = h('dynCall_iij')),
      (d.addOnPostRun = kr),
      (d.addRunDependency = Ie),
      (d.removeRunDependency = Te),
      (d.FS_createPath = y.createPath),
      (d.FS_createPreloadedFile = y.createPreloadedFile),
      (d.FS = y),
      (d.FS_createDataFile = y.createDataFile),
      (d.FS_unlink = y.unlink);
    var xi = [
      'writeI53ToI64',
      'writeI53ToI64Clamped',
      'writeI53ToI64Signaling',
      'writeI53ToU64Clamped',
      'writeI53ToU64Signaling',
      'convertI32PairToI53',
      'convertU32PairToI53',
      'zeroMemory',
      'ydayFromDate',
      'inetPton4',
      'inetNtop4',
      'inetPton6',
      'inetNtop6',
      'readSockaddr',
      'writeSockaddr',
      'getCallstack',
      'emscriptenLog',
      'convertPCtoSourceLocation',
      'readEmAsmArgs',
      'jstoi_q',
      'listenOnce',
      'autoResumeAudioContext',
      'handleException',
      'runtimeKeepalivePush',
      'runtimeKeepalivePop',
      'callUserCallback',
      'maybeExit',
      'asmjsMangle',
      'alignMemory',
      'mmapAlloc',
      'HandleAllocator',
      'getNativeTypeSize',
      'STACK_SIZE',
      'STACK_ALIGN',
      'POINTER_SIZE',
      'ASSERTIONS',
      'getCFunc',
      'ccall',
      'cwrap',
      'uleb128Encode',
      'sigToWasmTypes',
      'generateFuncType',
      'convertJsFunctionToWasm',
      'getEmptyTableSlot',
      'updateTableMap',
      'getFunctionAddress',
      'addFunction',
      'removeFunction',
      'reallyNegative',
      'unSign',
      'strLen',
      'reSign',
      'formatString',
      'intArrayToString',
      'AsciiToString',
      'stringToNewUTF8',
      'registerKeyEventCallback',
      'maybeCStringToJsString',
      'findEventTarget',
      'getBoundingClientRect',
      'fillMouseEventData',
      'registerMouseEventCallback',
      'registerWheelEventCallback',
      'registerUiEventCallback',
      'registerFocusEventCallback',
      'fillDeviceOrientationEventData',
      'registerDeviceOrientationEventCallback',
      'fillDeviceMotionEventData',
      'registerDeviceMotionEventCallback',
      'screenOrientation',
      'fillOrientationChangeEventData',
      'registerOrientationChangeEventCallback',
      'fillFullscreenChangeEventData',
      'registerFullscreenChangeEventCallback',
      'JSEvents_requestFullscreen',
      'JSEvents_resizeCanvasForFullscreen',
      'registerRestoreOldStyle',
      'hideEverythingExceptGivenElement',
      'restoreHiddenElements',
      'setLetterbox',
      'softFullscreenResizeWebGLRenderTarget',
      'doRequestFullscreen',
      'fillPointerlockChangeEventData',
      'registerPointerlockChangeEventCallback',
      'registerPointerlockErrorEventCallback',
      'requestPointerLock',
      'fillVisibilityChangeEventData',
      'registerVisibilityChangeEventCallback',
      'registerTouchEventCallback',
      'fillGamepadEventData',
      'registerGamepadEventCallback',
      'registerBeforeUnloadEventCallback',
      'fillBatteryEventData',
      'battery',
      'registerBatteryEventCallback',
      'setCanvasElementSize',
      'getCanvasElementSize',
      'jsStackTrace',
      'stackTrace',
      'checkWasiClock',
      'flush_NO_FILESYSTEM',
      'wasiRightsToMuslOFlags',
      'wasiOFlagsToMuslOFlags',
      'createDyncallWrapper',
      'safeSetTimeout',
      'setImmediateWrapped',
      'clearImmediateWrapped',
      'polyfillSetImmediate',
      'getPromise',
      'makePromise',
      'idsToPromises',
      'makePromiseCallback',
      'findMatchingCatch',
      'Browser_asyncPrepareDataCounter',
      'setMainLoop',
      'wasmfsNodeConvertNodeCode',
      'wasmfsNodeFixStat',
      'wasmfsNodeLstat',
      'wasmfsNodeFstat',
      'FileSystemAsyncAccessHandle',
      'wasmfsOPFSCreateAsyncAccessHandle',
      'wasmfsOPFSProxyFinish',
      'wasmfsOPFSGetOrCreateFile',
      'wasmfsOPFSGetOrCreateDir',
      'heapObjectForWebGLType',
      'toTypedArrayIndex',
      'webgl_enable_ANGLE_instanced_arrays',
      'webgl_enable_OES_vertex_array_object',
      'webgl_enable_WEBGL_draw_buffers',
      'webgl_enable_WEBGL_multi_draw',
      'emscriptenWebGLGet',
      'computeUnpackAlignedImageSize',
      'colorChannelsInGlTextureFormat',
      'emscriptenWebGLGetTexPixelData',
      'emscriptenWebGLGetUniform',
      'webglGetUniformLocation',
      'webglPrepareUniformLocationsBeforeFirstUse',
      'webglGetLeftBracePos',
      'emscriptenWebGLGetVertexAttrib',
      '__glGetActiveAttribOrUniform',
      'writeGLArray',
      'registerWebGlEventCallback',
      'runAndAbortIfError',
      'ALLOC_NORMAL',
      'ALLOC_STACK',
      'allocate',
      'writeStringToMemory',
      'writeAsciiToMemory',
      'setErrNo',
      'demangle',
      'getFunctionArgsName',
      'createJsInvoker',
      'registerInheritedInstance',
      'unregisterInheritedInstance',
      'getStringOrSymbol',
      'emval_get_global',
    ];
    xi.forEach(Dt);
    var Li = [
      'run',
      'addOnPreRun',
      'addOnInit',
      'addOnPreMain',
      'addOnExit',
      'FS_createFolder',
      'FS_createLazyFile',
      'FS_createLink',
      'FS_createDevice',
      'FS_readFile',
      'out',
      'err',
      'callMain',
      'abort',
      'wasmMemory',
      'wasmExports',
      'stackAlloc',
      'stackSave',
      'stackRestore',
      'getTempRet0',
      'setTempRet0',
      'writeStackCookie',
      'checkStackCookie',
      'readI53FromI64',
      'readI53FromU64',
      'convertI32PairToI53Checked',
      'ptrToString',
      'exitJS',
      'getHeapMax',
      'growMemory',
      'ENV',
      'MONTH_DAYS_REGULAR',
      'MONTH_DAYS_LEAP',
      'MONTH_DAYS_REGULAR_CUMULATIVE',
      'MONTH_DAYS_LEAP_CUMULATIVE',
      'isLeapYear',
      'arraySum',
      'addDays',
      'ERRNO_CODES',
      'ERRNO_MESSAGES',
      'DNS',
      'Protocols',
      'Sockets',
      'initRandomFill',
      'randomFill',
      'timers',
      'warnOnce',
      'UNWIND_CACHE',
      'readEmAsmArgsArray',
      'jstoi_s',
      'getExecutableName',
      'dynCallLegacy',
      'getDynCaller',
      'dynCall',
      'keepRuntimeAlive',
      'asyncLoad',
      'wasmTable',
      'noExitRuntime',
      'freeTableIndexes',
      'functionsInTableMap',
      'setValue',
      'getValue',
      'PATH',
      'PATH_FS',
      'UTF8Decoder',
      'UTF8ArrayToString',
      'UTF8ToString',
      'stringToUTF8Array',
      'stringToUTF8',
      'lengthBytesUTF8',
      'intArrayFromString',
      'stringToAscii',
      'UTF16Decoder',
      'UTF16ToString',
      'stringToUTF16',
      'lengthBytesUTF16',
      'UTF32ToString',
      'stringToUTF32',
      'lengthBytesUTF32',
      'stringToUTF8OnStack',
      'writeArrayToMemory',
      'JSEvents',
      'specialHTMLTargets',
      'findCanvasEventTarget',
      'currentFullscreenStrategy',
      'restoreOldWindowedStyle',
      'ExitStatus',
      'getEnvStrings',
      'promiseMap',
      'uncaughtExceptionCount',
      'exceptionLast',
      'exceptionCaught',
      'ExceptionInfo',
      'Browser',
      'getPreloadedImageData__data',
      'wget',
      'preloadPlugins',
      'FS_modeStringToFlags',
      'FS_getMode',
      'FS_stdin_getChar_buffer',
      'FS_stdin_getChar',
      'MEMFS',
      'wasmFSPreloadedFiles',
      'wasmFSPreloadedDirs',
      'wasmFSPreloadingFlushed',
      'wasmFSDevices',
      'wasmFSDeviceStreams',
      'FS_mknod',
      'FS_create',
      'FS_writeFile',
      'FS_mkdir',
      'FS_mkdirTree',
      'wasmFS$JSMemoryFiles',
      'wasmFS$backends',
      'wasmfsNodeIsWindows',
      'wasmfsOPFSDirectoryHandles',
      'wasmfsOPFSFileHandles',
      'wasmfsOPFSAccessHandles',
      'wasmfsOPFSBlobs',
      'tempFixedLengthArray',
      'miniTempWebGLFloatBuffers',
      'miniTempWebGLIntBuffers',
      'GL',
      'AL',
      'GLUT',
      'EGL',
      'GLEW',
      'IDBStore',
      'SDL',
      'SDL_gfx',
      'allocateUTF8',
      'allocateUTF8OnStack',
      'InternalError',
      'BindingError',
      'throwInternalError',
      'throwBindingError',
      'registeredTypes',
      'awaitingDependencies',
      'typeDependencies',
      'tupleRegistrations',
      'structRegistrations',
      'sharedRegisterType',
      'whenDependentTypesAreResolved',
      'embind_charCodes',
      'embind_init_charCodes',
      'readLatin1String',
      'getTypeName',
      'getFunctionName',
      'heap32VectorToArray',
      'requireRegisteredType',
      'usesDestructorStack',
      'createJsInvokerSignature',
      'UnboundTypeError',
      'PureVirtualError',
      'GenericWireTypeSize',
      'InvokerFunctions',
      'EmValType',
      'init_embind',
      'throwUnboundTypeError',
      'ensureOverloadTable',
      'exposePublicSymbol',
      'replacePublicSymbol',
      'extendError',
      'createNamedFunction',
      'embindRepr',
      'registeredInstances',
      'getBasestPointer',
      'getInheritedInstance',
      'getInheritedInstanceCount',
      'getLiveInheritedInstances',
      'registeredPointers',
      'registerType',
      'integerReadValueFromPointer',
      'enumReadValueFromPointer',
      'floatReadValueFromPointer',
      'readPointer',
      'runDestructors',
      'craftInvokerFunction',
      'embind__requireFunction',
      'genericPointerToWireType',
      'constNoSmartPtrRawPointerToWireType',
      'nonConstNoSmartPtrRawPointerToWireType',
      'init_RegisteredPointer',
      'RegisteredPointer',
      'RegisteredPointer_fromWireType',
      'runDestructor',
      'releaseClassHandle',
      'finalizationRegistry',
      'detachFinalizer_deps',
      'detachFinalizer',
      'attachFinalizer',
      'makeClassHandle',
      'init_ClassHandle',
      'ClassHandle',
      'throwInstanceAlreadyDeleted',
      'deletionQueue',
      'flushPendingDeletes',
      'delayFunction',
      'setDelayFunction',
      'RegisteredClass',
      'shallowCopyInternalPointer',
      'downcastPointer',
      'upcastPointer',
      'validateThis',
      'char_0',
      'char_9',
      'makeLegalFunctionName',
      'emval_freelist',
      'emval_handles',
      'emval_symbols',
      'init_emval',
      'count_emval_handles',
      'Emval',
      'emval_returnValue',
      'emval_lookupTypes',
      'emval_methodCallers',
      'emval_addMethodCaller',
      'reflectConstruct',
    ];
    Li.forEach(Ur);
    var qe;
    be = function e() {
      qe || yt(), qe || (be = e);
    };
    function ji() {
      ht(), bt();
    }
    function yt(e = Me) {
      if (Z > 0 || (ji(), Tt(), Z > 0)) return;
      function r() {
        qe ||
          ((qe = !0),
          (d.calledRun = !0),
          !ye &&
            (Et(),
            yr(d),
            d.onRuntimeInitialized && d.onRuntimeInitialized(),
            m(
              !d._main,
              'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'
            ),
            Pt()));
      }
      d.setStatus
        ? (d.setStatus('Running...'),
          setTimeout(function () {
            setTimeout(function () {
              d.setStatus('');
            }, 1),
              r();
          }, 1))
        : r(),
        Qe();
    }
    function Ni() {
      var e = Oe,
        r = C,
        t = !1;
      Oe = C = (n) => {
        t = !0;
      };
      try {
        Ui();
      } catch {}
      (Oe = e),
        (C = r),
        t &&
          (J(
            'stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.'
          ),
          J(
            '(this may also be due to not including full filesystem support - try building with -sFORCE_FILESYSTEM)'
          ));
    }
    if (d.preInit)
      for (
        typeof d.preInit == 'function' && (d.preInit = [d.preInit]);
        d.preInit.length > 0;

      )
        d.preInit.pop()();
    return yt(), hr.ready;
  };
})();
export { Hi as default };
