const R = (r, a, e) => {
    const t = r[a];
    return t
      ? typeof t == 'function'
        ? t()
        : Promise.resolve(t)
      : new Promise((n, s) => {
          (typeof queueMicrotask == 'function' ? queueMicrotask : setTimeout)(
            s.bind(
              null,
              new Error(
                'Unknown variable dynamic import: ' +
                  a +
                  (a.split('/').length !== e
                    ? '. Note that variables only represent file names one level deep.'
                    : '')
              )
            )
          );
        });
  },
  u = {
    SYSTEM: 'system',
    USER: 'user',
    ASSISTANT: 'assistant',
  },
  g = {
    READILY: 'readily',
    AFTER_DOWNLOAD: 'after-download',
    NO: 'no',
  },
  k = 4096,
  z = 0.8,
  D = 1,
  E = 3,
  K = 128;
let w;
class _ {
  constructor() {
    this.__polyfill = {
      async setBackend(a) {
        const [e, t] = a.split('/');
        w = (
          await R(
            /* @__PURE__ */ Object.assign({
              './ai-providers/cloud/chatgpt.js': () =>
                import('./chatgpt-BbcDl7zQ.js'),
              './ai-providers/cloud/gemini.js': () =>
                import('./gemini-B15X68vq.js'),
              './ai-providers/local/mediapipe-llm.js': () =>
                import('./mediapipe-llm-BPKlf3M6.js'),
            }),
            `./ai-providers/${e}/${t}.js`,
            4
          )
        ).default;
      },
    };
  }
  async create(a = {}) {
    if (a.monitor) {
      const e = new j();
      a.monitor(e);
    }
    return new v(a);
  }
  async capabilities() {
    return new U();
  }
}
class v extends EventTarget {
  #a;
  constructor(a = {}) {
    if (
      (super(),
      a.systemPrompt && (this.systemPrompt = a.systemPrompt),
      a.initialPrompts && (this.initialPrompts = a.initialPrompts),
      a.oncontextoverflow && (this.oncontextoverflow = a.oncontextoverflow),
      (this.topK = a.topK || E),
      (this.temperature = a.temperature || z),
      (this.maxTokens = k),
      (this.tokensLeft = k),
      (this.tokensSoFar = 0),
      (this.#a = []),
      this.systemPrompt &&
        this.initialPrompts &&
        Array.isArray(this.initialPrompts))
    ) {
      for (const e of this.initialPrompts)
        if (e?.role === u.SYSTEM)
          throw new Error(
            'System prompt cannot be part of the array if systemPrompt is specified.'
          );
    }
    if (this.initialPrompts && Array.isArray(this.initialPrompts)) {
      let e = 0,
        t = !1;
      for (const n of this.initialPrompts) {
        if (n?.role === u.SYSTEM) {
          t = !0;
          break;
        }
        e++;
      }
      if (t && e > 0)
        throw new Error(
          'System prompt must be first element of the initialPrompt array.'
        );
    }
    this.systemPrompt &&
      this.#a.push({
        role: u.SYSTEM,
        content: this.systemPrompt,
      }),
      this.initialPrompts && this.#a.push(...this.initialPrompts);
  }
  updateTokensAndHistory(a) {
    (this.tokensLeft = this.maxTokens - a.tokens),
      (this.tokensSoFar = a.tokens),
      this.#a.push(
        {
          role: u.USER,
          content: a.prompt,
        },
        {
          role: u.ASSISTANT,
          content: a.answer,
        }
      );
  }
  async prompt(a, e = {}) {
    (e.history = this.#a),
      (e.temperature = e.temperature ?? this.temperature),
      (e.topK = e.topK ?? this.topK),
      (e.signal = e.signal ?? new AbortController().signal);
    const t = await w(a, e, (s) => this.updateTokensAndHistory(s));
    let n = '';
    for await (const s of t) n += s;
    return n;
  }
  promptStreaming(a, e = {}) {
    return (
      (e.history = this.#a),
      (e.temperature = e.temperature ?? this.temperature),
      (e.topK = e.topK ?? this.topK),
      (e.signal = e.signal ?? new AbortController().signal),
      w(a, e, (t) => this.updateTokensAndHistory(t))
    );
  }
  async countPromptTokens(a, e = {}) {
    return a.length;
  }
  async clone() {
    return new v({
      systemPrompt: this.systemPrompt,
      initialPrompts: this.initialPrompts,
      topK: this.topK,
      temperature: this.temperature,
      oncontextoverflow: this.oncontextoverflow,
    });
  }
  destroy() {
    this.#a = [];
  }
}
class U {
  constructor() {
    (this.available = g.READILY),
      (this.defaultTopK = E),
      (this.maxTopK = K),
      (this.maxTemperature = D),
      (this.defaultTemperature = z);
  }
  supportsLanguage(a) {
    return g.READILY;
  }
}
async function C(r = {}) {
  const { wasmPath: a, ...e } = r,
    t = (await import('./fastText.common-BVQpLcCO.js')).default;
  return await t({
    // Binding js use the callback to locate wasm for now
    locateFile: (n, s) =>
      a ? (typeof a == 'string' ? a : a(n, s)) : (s || '/') + n,
    ...e,
  });
}
async function B(r = {}) {
  return await C(r);
}
const O = '/fastText',
  W = '/fastText/models',
  T = 'train.txt',
  A = 'test.txt',
  y = 'model.bin',
  q =
    typeof window < 'u' && !!window.document && !!window.document.createElement,
  H =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    'importScripts' in globalThis &&
    typeof globalThis.importScripts == 'function';
let P, S, F;
const M = (r) => new Uint8Array(r.buffer, r.byteOffset, r.length),
  Y = async (r) =>
    q || H
      ? new Uint8Array(await (await fetch(r)).arrayBuffer())
      : r.startsWith('file://')
        ? ((P ??= (await Promise.resolve().then(() => b)).readFile),
          (F ??= (await Promise.resolve().then(() => b)).fileURLToPath),
          M(await P(F(r))))
        : ((S ??= (await Promise.resolve().then(() => b)).request),
          new Promise((a, e) => {
            const t = [];
            S(r, (n) =>
              n
                .on('close', () => a(M(Buffer.concat(t))))
                .on('data', (s) => t.push(s))
                .on('error', (s) => e(s))
            );
          }));
class x {
  core;
  ft;
  constructor(a, e) {
    (this.ft = a), (this.core = e);
  }
  getFloat32ArrayFromHeap = (a) => {
    const e = a * Float32Array.BYTES_PER_ELEMENT,
      t = this.core._malloc(e),
      n = new Uint8Array(this.core.HEAPU8.buffer, t, e);
    return {
      ptr: n.byteOffset,
      size: a,
      buffer: n.buffer,
    };
  };
  heapToFloat32 = (a) => new Float32Array(a.buffer, a.ptr, a.size);
  /**
   * isQuant
   *
   * @return {bool}   true if the model is quantized
   */
  isQuant() {
    return this.ft.isQuant;
  }
  /**
   * getDimension
   *
   * @return {number}    the dimension (size) of a lookup vector (hidden layer)
   */
  getDimension() {
    return this.ft.args.dim;
  }
  /**
   * getWordVector
   *
   * @param {string}          word
   *
   * @return {Float32Array}   the vector representation of `word`.
   *
   */
  getWordVector(a) {
    const e = this.getFloat32ArrayFromHeap(this.getDimension());
    return this.ft.getWordVector(e, a), this.heapToFloat32(e);
  }
  /**
   * getSentenceVector
   *
   * @return {Float32Array}   the vector representation of `text`.
   *
   */
  getSentenceVector(a) {
    a.includes(`
`),
      (a += `
`);
    const e = this.getFloat32ArrayFromHeap(this.getDimension());
    return this.ft.getSentenceVector(e, a), this.heapToFloat32(e);
  }
  /**
   * getNearestNeighbors
   *
   * returns the nearest `k` neighbors of `word`.
   *
   * @return words and their corresponding cosine similarities.
   *
   */
  getNearestNeighbors(a, e = 10) {
    return this.ft.getNN(a, e);
  }
  /**
   * getAnalogies
   *
   * returns the nearest `k` neighbors of the operation
   * `wordA - wordB + wordC`.
   *
   * @return words and their corresponding cosine similarities
   *
   */
  getAnalogies(a, e, t, n) {
    return this.ft.getAnalogies(n, a, e, t);
  }
  /**
   * getWordId
   *
   * Given a word, get the word id within the dictionary.
   * Returns -1 if word is not in the dictionary.
   */
  getWordId(a) {
    return this.ft.getWordId(a);
  }
  /**
   * getSubwordId
   *
   * Given a subword, return the index (within input matrix) it hashes to.
   */
  getSubwordId(a) {
    return this.ft.getSubwordId(a);
  }
  /**
   * getSubwords
   *
   * returns the subwords and their indicies.
   *
   * @return words and their corresponding indicies
   *
   */
  getSubwords(a) {
    return this.ft.getSubwords(a);
  }
  /**
   * getInputVector
   *
   * Given an index, get the corresponding vector of the Input Matrix.
   *
   * @return {Float32Array}   the vector of the `ind`'th index
   *
   */
  getInputVector(a) {
    const e = this.getFloat32ArrayFromHeap(this.getDimension());
    return this.ft.getInputVector(e, a), this.heapToFloat32(e);
  }
  /**
   * predict
   *
   * Given a string, get a list of labels and a list of corresponding
   * probabilities. k controls the number of returned labels.
   *
   * @return labels and their probabilities
   *
   */
  predict(a, e = 1, t = 0) {
    return this.ft.predict(a, e, t);
  }
  /**
   * getInputMatrix
   *
   * Get a reference to the full input matrix of a Model. This only
   * works if the model is not quantized.
   *
   * @return {DenseMatrix}
   *     densematrix with functions: `rows`, `cols`, `at(i,j)`
   *
   * example:
   *     let inputMatrix = model.getInputMatrix();
   *     let value = inputMatrix.at(1, 2);
   */
  getInputMatrix() {
    if (this.isQuant()) throw new Error("Can't get quantized Matrix");
    return this.ft.getInputMatrix();
  }
  /**
   * getOutputMatrix
   *
   * Get a reference to the full input matrix of a Model. This only
   * works if the model is not quantized.
   *
   * @return {DenseMatrix}
   *     densematrix with functions: `rows`, `cols`, `at(i,j)`
   *
   * example:
   *     let outputMatrix = model.getOutputMatrix();
   *     let value = outputMatrix.at(1, 2);
   */
  getOutputMatrix() {
    if (this.isQuant()) throw new Error("Can't get quantized Matrix");
    return this.ft.getOutputMatrix();
  }
  /**
   * getWords
   *
   * Get the entire list of words of the dictionary including the frequency
   * of the individual words. This does not include any subwords. For that
   * please consult the function get_subwords.
   *
   * @return {Pair.<Array.<string>, Array.<int>>}
   *     words and their corresponding frequencies
   *
   */
  getWords() {
    return this.ft.getWords();
  }
  /**
   * getLabels
   *
   * Get the entire list of labels of the dictionary including the frequency
   * of the individual labels.
   *
   * @return {Pair.<Array.<string>, Array.<int>>}
   *     labels and their corresponding frequencies
   *
   */
  getLabels() {
    return this.ft.getLabels();
  }
  /**
   * getLine
   *
   * Split a line of text into words and labels. Labels must start with
   * the prefix used to create the model (__label__ by default).
   *
   * @return {Pair.<Array.<string>, Array.<string>>}
   *     words and labels
   *
   */
  getLine(a) {
    return this.ft.getLine(a);
  }
  /**
   * saveModel
   *
   * Saves the model file in web assembly in-memory FS and returns a blob
   *
   * @return {Blob}           blob data of the file saved in web assembly FS
   *
   */
  saveModel() {
    this.ft.saveModel(y);
    const a = this.core.FS.readFile(y, {
      encoding: 'binary',
    });
    return new Blob([new Uint8Array(a, a.byteOffset, a.length)], {
      type: ' application/octet-stream',
    });
  }
  /**
   * test
   *
   * Downloads the test file from the specified url, evaluates the supervised
   * model with it.
   *
   * @return {Promise}   promise object that resolves to a `Meter` object
   *
   * example:
   * model.test("/absolute/url/to/test.txt", 1, 0.0).then((meter) => {
   *     console.log(meter.precision);
   *     console.log(meter.recall);
   *     console.log(meter.f1Score);
   *     console.log(meter.nexamples());
   * });
   *
   */
  test(a, e, t) {
    const n = globalThis.fetch || fetch,
      s = this.ft;
    return new Promise((o, i) => {
      n(a)
        .then((l) => l.arrayBuffer())
        .then((l) => {
          const h = new Uint8Array(l);
          this.core.FS.writeFile(A, h);
        })
        .then(() => {
          const l = s.test(A, e, t);
          o(l);
        })
        .catch((l) => {
          i(l);
        });
    });
  }
}
const G = async (r) => {
    const { getFastTextModule: a } = r,
      e = await a();
    return class {
      core;
      ft;
      fs;
      constructor() {
        (this.core = e), (this.ft = new e.FastText()), (this.fs = e.FS);
      }
      /**
       * loadModel
       *
       * Loads the model file from the specified url, and returns the
       * corresponding `FastTextModel` object.
       */
      async loadModel(n) {
        const s = this.ft,
          o = await Y(n),
          i = new Uint8Array(o);
        return await e.FS.writeFile(y, i), s.loadModel(y), new x(s, this.core);
      }
      _train(n, s, o = {}, i = null) {
        const l = globalThis.fetch || fetch,
          h = this.ft;
        return new Promise((p, f) => {
          l(n)
            .then((m) => m.arrayBuffer())
            .then((m) => {
              const c = new Uint8Array(m);
              e.FS.writeFile(T, c);
            })
            .then(() => {
              const m = [
                  'lr',
                  'lrUpdateRate',
                  'dim',
                  'ws',
                  'epoch',
                  'minCount',
                  'minCountLabel',
                  'neg',
                  'wordNgrams',
                  'loss',
                  'model',
                  'bucket',
                  'minn',
                  'maxn',
                  't',
                  'label',
                  'verbose',
                  'pretrainedVectors',
                  'saveOutput',
                  'seed',
                  'qout',
                  'retrain',
                  'qnorm',
                  'cutoff',
                  'dsub',
                  'qnorm',
                  'autotuneValidationFile',
                  'autotuneMetric',
                  'autotunePredictions',
                  'autotuneDuration',
                  'autotuneModelSize',
                ],
                c = new e.Args();
              m.forEach((N) => {
                N in o && (c[N] = o[N]);
              }),
                (c.model = e.ModelName[s]),
                (c.loss = 'loss' in o ? e.LossName[o.loss] : 'hs'),
                (c.thread = 1),
                (c.input = T),
                h.train(c, i),
                p(new x(h, this.core));
            })
            .catch((m) => {
              f(m);
            });
        });
      }
      /**
       * trainSupervised
       *
       * Downloads the input file from the specified url, trains a supervised
       * model and returns a `FastTextModel` object.
       */
      trainSupervised(n, s = {}, o) {
        const i = this;
        return new Promise((l, h) => {
          i._train(n, 'supervised', s, o)
            .then((p) => {
              l(p);
            })
            .catch((p) => {
              h(p);
            });
        });
      }
      /**
       * trainUnsupervised
       *
       * Downloads the input file from the specified url, trains an unsupervised
       * model and returns a `FastTextModel` object.
       *
       * @param {function}   callback
       *     train callback function
       *     `callback` function is called regularly from the train loop:
       *     `callback(progress, loss, wordsPerSec, learningRate, eta)`
       *
       * @return {Promise}   promise object that resolves to a `FastTextModel`
       *
       */
      trainUnsupervised(n, s, o = {}, i) {
        const l = this;
        return new Promise((h, p) => {
          l._train(n, s, o, i)
            .then((f) => {
              h(f);
            })
            .catch((f) => {
              p(f);
            });
        });
      }
    };
  },
  V = {
    alpha3: 'afr',
    alpha2: 'af',
    refName: 'Afrikaans',
  },
  $ = {
    alpha3: 'gsw',
    alpha2: null,
    refName: 'Swiss German',
  },
  Q = {
    alpha3: 'amh',
    alpha2: 'am',
    refName: 'Amharic',
  },
  X = {
    alpha3: 'arg',
    alpha2: 'an',
    refName: 'Aragonese',
  },
  J = {
    alpha3: 'ara',
    alpha2: 'ar',
    refName: 'Arabic',
  },
  Z = {
    alpha3: 'arz',
    alpha2: null,
    refName: 'Egyptian Arabic',
  },
  aa = {
    alpha3: 'asm',
    alpha2: 'as',
    refName: 'Assamese',
  },
  ea = {
    alpha3: 'ast',
    alpha2: null,
    refName: 'Asturian',
  },
  ta = {
    alpha3: 'ava',
    alpha2: 'av',
    refName: 'Avaric',
  },
  na = {
    alpha3: 'aze',
    alpha2: 'az',
    refName: 'Azerbaijani',
  },
  ra = {
    alpha3: 'azb',
    alpha2: null,
    refName: 'South Azerbaijani',
  },
  sa = {
    alpha3: 'bak',
    alpha2: 'ba',
    refName: 'Bashkir',
  },
  la = {
    alpha3: 'bar',
    alpha2: null,
    refName: 'Bavarian',
  },
  oa = {
    alpha3: 'bcl',
    alpha2: null,
    refName: 'Central Bikol',
  },
  ia = {
    alpha3: 'bel',
    alpha2: 'be',
    refName: 'Belarusian',
  },
  ha = {
    alpha3: 'bul',
    alpha2: 'bg',
    refName: 'Bulgarian',
  },
  pa = {
    alpha3: 'bih',
    alpha2: 'bh',
    refName: 'Bihari languages',
  },
  ca = {
    alpha3: 'ben',
    alpha2: 'bn',
    refName: 'Bengali',
  },
  ma = {
    alpha3: 'bod',
    alpha2: 'bo',
    refName: 'Tibetan',
  },
  fa = {
    alpha3: 'bpy',
    alpha2: null,
    refName: 'Bishnupriya',
  },
  ua = {
    alpha3: 'bre',
    alpha2: 'br',
    refName: 'Breton',
  },
  da = {
    alpha3: 'bos',
    alpha2: 'bs',
    refName: 'Bosnian',
  },
  Na = {
    alpha3: 'bxr',
    alpha2: null,
    refName: 'Russia Buriat',
  },
  ga = {
    alpha3: 'cat',
    alpha2: 'ca',
    refName: 'Catalan',
  },
  ya = {
    alpha3: 'cbk',
    alpha2: null,
    refName: 'Chavacano',
  },
  ba = {
    alpha3: 'che',
    alpha2: 'ce',
    refName: 'Chechen',
  },
  wa = {
    alpha3: 'ceb',
    alpha2: null,
    refName: 'Cebuano',
  },
  va = {
    alpha3: 'kur',
    alpha2: 'ku',
    refName: 'Kurdish',
  },
  ka = {
    alpha3: 'cos',
    alpha2: 'co',
    refName: 'Corsican',
  },
  Ta = {
    alpha3: 'ces',
    alpha2: 'cs',
    refName: 'Czech',
  },
  Aa = {
    alpha3: 'chv',
    alpha2: 'cv',
    refName: 'Chuvash',
  },
  Pa = {
    alpha3: 'cym',
    alpha2: 'cy',
    refName: 'Welsh',
  },
  Sa = {
    alpha3: 'dan',
    alpha2: 'da',
    refName: 'Danish',
  },
  Fa = {
    alpha3: 'deu',
    alpha2: 'de',
    refName: 'German',
  },
  Ma = {
    alpha3: 'zza',
    alpha2: null,
    refName: 'Zaza',
  },
  xa = {
    alpha3: 'dsb',
    alpha2: null,
    refName: 'Lower Sorbian',
  },
  za = {
    alpha3: 'dty',
    alpha2: null,
    refName: 'Dotyali',
  },
  Ea = {
    alpha3: 'div',
    alpha2: 'dv',
    refName: 'Dhivehi',
  },
  La = {
    alpha3: 'ell',
    alpha2: 'el',
    refName: 'Modern Greek (1453-)',
  },
  Ia = {
    alpha3: 'eml',
    alpha2: null,
    refName: 'Emiliano-Romagnolo',
  },
  ja = {
    alpha3: 'eng',
    alpha2: 'en',
    refName: 'English',
  },
  Ra = {
    alpha3: 'epo',
    alpha2: 'eo',
    refName: 'Esperanto',
  },
  Da = {
    alpha3: 'spa',
    alpha2: 'es',
    refName: 'Spanish',
  },
  Ka = {
    alpha3: 'est',
    alpha2: 'et',
    refName: 'Estonian',
  },
  _a = {
    alpha3: 'eus',
    alpha2: 'eu',
    refName: 'Basque',
  },
  Ua = {
    alpha3: 'fas',
    alpha2: 'fa',
    refName: 'Persian',
  },
  Ca = {
    alpha3: 'fin',
    alpha2: 'fi',
    refName: 'Finnish',
  },
  Ba = {
    alpha3: 'fra',
    alpha2: 'fr',
    refName: 'French',
  },
  Oa = {
    alpha3: 'frr',
    alpha2: null,
    refName: 'Northern Frisian',
  },
  Wa = {
    alpha3: 'fry',
    alpha2: 'fy',
    refName: 'Western Frisian',
  },
  qa = {
    alpha3: 'gle',
    alpha2: 'ga',
    refName: 'Irish',
  },
  Ha = {
    alpha3: 'gla',
    alpha2: 'gd',
    refName: 'Scottish Gaelic',
  },
  Ya = {
    alpha3: 'glg',
    alpha2: 'gl',
    refName: 'Galician',
  },
  Ga = {
    alpha3: 'grn',
    alpha2: 'gn',
    refName: 'Guarani',
  },
  Va = {
    alpha3: 'gom',
    alpha2: null,
    refName: 'Goan Konkani',
  },
  $a = {
    alpha3: 'guj',
    alpha2: 'gu',
    refName: 'Gujarati',
  },
  Qa = {
    alpha3: 'glv',
    alpha2: 'gv',
    refName: 'Manx',
  },
  Xa = {
    alpha3: 'heb',
    alpha2: 'he',
    refName: 'Hebrew',
  },
  Ja = {
    alpha3: 'hin',
    alpha2: 'hi',
    refName: 'Hindi',
  },
  Za = {
    alpha3: 'hif',
    alpha2: null,
    refName: 'Fiji Hindi',
  },
  ae = {
    alpha3: 'hrv',
    alpha2: 'hr',
    refName: 'Croatian',
  },
  ee = {
    alpha3: 'hsb',
    alpha2: null,
    refName: 'Upper Sorbian',
  },
  te = {
    alpha3: 'hat',
    alpha2: 'ht',
    refName: 'Haitian',
  },
  ne = {
    alpha3: 'hun',
    alpha2: 'hu',
    refName: 'Hungarian',
  },
  re = {
    alpha3: 'hye',
    alpha2: 'hy',
    refName: 'Armenian',
  },
  se = {
    alpha3: 'ina',
    alpha2: 'ia',
    refName: 'Interlingua (International Auxiliary Language Association)',
  },
  le = {
    alpha3: 'ind',
    alpha2: 'id',
    refName: 'Indonesian',
  },
  oe = {
    alpha3: 'ile',
    alpha2: 'ie',
    refName: 'Interlingue',
  },
  ie = {
    alpha3: 'ilo',
    alpha2: null,
    refName: 'Iloko',
  },
  he = {
    alpha3: 'ido',
    alpha2: 'io',
    refName: 'Ido',
  },
  pe = {
    alpha3: 'isl',
    alpha2: 'is',
    refName: 'Icelandic',
  },
  ce = {
    alpha3: 'ita',
    alpha2: 'it',
    refName: 'Italian',
  },
  me = {
    alpha3: 'jpn',
    alpha2: 'ja',
    refName: 'Japanese',
  },
  fe = {
    alpha3: 'jbo',
    alpha2: null,
    refName: 'Lojban',
  },
  ue = {
    alpha3: 'jav',
    alpha2: 'jv',
    refName: 'Javanese',
  },
  de = {
    alpha3: 'kat',
    alpha2: 'ka',
    refName: 'Georgian',
  },
  Ne = {
    alpha3: 'kaz',
    alpha2: 'kk',
    refName: 'Kazakh',
  },
  ge = {
    alpha3: 'khm',
    alpha2: 'km',
    refName: 'Khmer',
  },
  ye = {
    alpha3: 'kan',
    alpha2: 'kn',
    refName: 'Kannada',
  },
  be = {
    alpha3: 'kor',
    alpha2: 'ko',
    refName: 'Korean',
  },
  we = {
    alpha3: 'krc',
    alpha2: null,
    refName: 'Karachay-Balkar',
  },
  ve = {
    alpha3: 'kmr',
    alpha2: null,
    refName: 'Northern Kurdish',
  },
  ke = {
    alpha3: 'kom',
    alpha2: 'kv',
    refName: 'Komi',
  },
  Te = {
    alpha3: 'cor',
    alpha2: 'kw',
    refName: 'Cornish',
  },
  Ae = {
    alpha3: 'kir',
    alpha2: 'ky',
    refName: 'Kirghiz',
  },
  Pe = {
    alpha3: 'lat',
    alpha2: 'la',
    refName: 'Latin',
  },
  Se = {
    alpha3: 'ltz',
    alpha2: 'lb',
    refName: 'Luxembourgish',
  },
  Fe = {
    alpha3: 'lez',
    alpha2: null,
    refName: 'Lezghian',
  },
  Me = {
    alpha3: 'lim',
    alpha2: 'li',
    refName: 'Limburgan',
  },
  xe = {
    alpha3: 'lmo',
    alpha2: null,
    refName: 'Lombard',
  },
  ze = {
    alpha3: 'lao',
    alpha2: 'lo',
    refName: 'Lao',
  },
  Ee = {
    alpha3: 'lrc',
    alpha2: null,
    refName: 'Northern Luri',
  },
  Le = {
    alpha3: 'lit',
    alpha2: 'lt',
    refName: 'Lithuanian',
  },
  Ie = {
    alpha3: 'lav',
    alpha2: 'lv',
    refName: 'Latvian',
  },
  je = {
    alpha3: 'mai',
    alpha2: null,
    refName: 'Maithili',
  },
  Re = {
    alpha3: 'mlg',
    alpha2: 'mg',
    refName: 'Malagasy',
  },
  De = {
    alpha3: 'mhr',
    alpha2: null,
    refName: 'Eastern Mari',
  },
  Ke = {
    alpha3: 'min',
    alpha2: null,
    refName: 'Minangkabau',
  },
  _e = {
    alpha3: 'mkd',
    alpha2: 'mk',
    refName: 'Macedonian',
  },
  Ue = {
    alpha3: 'mal',
    alpha2: 'ml',
    refName: 'Malayalam',
  },
  Ce = {
    alpha3: 'mon',
    alpha2: 'mn',
    refName: 'Mongolian',
  },
  Be = {
    alpha3: 'mar',
    alpha2: 'mr',
    refName: 'Marathi',
  },
  Oe = {
    alpha3: 'mrj',
    alpha2: null,
    refName: 'Western Mari',
  },
  We = {
    alpha3: 'msa',
    alpha2: 'ms',
    refName: 'Malay (macrolanguage)',
  },
  qe = {
    alpha3: 'mlt',
    alpha2: 'mt',
    refName: 'Maltese',
  },
  He = {
    alpha3: 'mwl',
    alpha2: null,
    refName: 'Mirandese',
  },
  Ye = {
    alpha3: 'mya',
    alpha2: 'my',
    refName: 'Burmese',
  },
  Ge = {
    alpha3: 'myv',
    alpha2: null,
    refName: 'Erzya',
  },
  Ve = {
    alpha3: 'mzn',
    alpha2: null,
    refName: 'Mazanderani',
  },
  $e = {
    alpha3: 'nah',
    alpha2: null,
    refName: 'Nahuatl languages',
  },
  Qe = {
    alpha3: 'nap',
    alpha2: null,
    refName: 'Neapolitan',
  },
  Xe = {
    alpha3: 'nds',
    alpha2: null,
    refName: 'Low German',
  },
  Je = {
    alpha3: 'nep',
    alpha2: 'ne',
    refName: 'Nepali (macrolanguage)',
  },
  Ze = {
    alpha3: 'nld',
    alpha2: 'nl',
    refName: 'Dutch',
  },
  at = {
    alpha3: 'nor',
    alpha2: 'no',
    refName: 'Norwegian',
  },
  et = {
    alpha3: 'nor',
    alpha2: 'no',
    refName: 'Norwegian',
  },
  tt = {
    alpha3: 'oci',
    alpha2: 'oc',
    refName: 'Occitan (post 1500)',
  },
  nt = {
    alpha3: 'ory',
    alpha2: null,
    refName: 'Odia',
  },
  rt = {
    alpha3: 'oss',
    alpha2: 'os',
    refName: 'Ossetian',
  },
  st = {
    alpha3: 'pan',
    alpha2: 'pa',
    refName: 'Panjabi',
  },
  lt = {
    alpha3: 'pam',
    alpha2: null,
    refName: 'Pampanga',
  },
  ot = {
    alpha3: 'pfl',
    alpha2: null,
    refName: 'Pfaelzisch',
  },
  it = {
    alpha3: 'pol',
    alpha2: 'pl',
    refName: 'Polish',
  },
  ht = {
    alpha3: 'pms',
    alpha2: null,
    refName: 'Piemontese',
  },
  pt = {
    alpha3: 'pnb',
    alpha2: null,
    refName: 'Western Panjabi',
  },
  ct = {
    alpha3: 'pus',
    alpha2: 'ps',
    refName: 'Pushto',
  },
  mt = {
    alpha3: 'por',
    alpha2: 'pt',
    refName: 'Portuguese',
  },
  ft = {
    alpha3: 'que',
    alpha2: 'qu',
    refName: 'Quechua',
  },
  ut = {
    alpha3: 'roh',
    alpha2: 'rm',
    refName: 'Romansh',
  },
  dt = {
    alpha3: 'ron',
    alpha2: 'ro',
    refName: 'Romanian',
  },
  Nt = {
    alpha3: 'rus',
    alpha2: 'ru',
    refName: 'Russian',
  },
  gt = {
    alpha3: 'rue',
    alpha2: null,
    refName: 'Rusyn',
  },
  yt = {
    alpha3: 'san',
    alpha2: 'sa',
    refName: 'Sanskrit',
  },
  bt = {
    alpha3: 'sah',
    alpha2: null,
    refName: 'Yakut',
  },
  wt = {
    alpha3: 'srd',
    alpha2: 'sc',
    refName: 'Sardinian',
  },
  vt = {
    alpha3: 'scn',
    alpha2: null,
    refName: 'Sicilian',
  },
  kt = {
    alpha3: 'sco',
    alpha2: null,
    refName: 'Scots',
  },
  Tt = {
    alpha3: 'snd',
    alpha2: 'sd',
    refName: 'Sindhi',
  },
  At = {
    alpha3: 'hbs',
    alpha2: 'sh',
    refName: 'Serbo-Croatian',
  },
  Pt = {
    alpha3: 'sin',
    alpha2: 'si',
    refName: 'Sinhala',
  },
  St = {
    alpha3: 'slk',
    alpha2: 'sk',
    refName: 'Slovak',
  },
  Ft = {
    alpha3: 'slv',
    alpha2: 'sl',
    refName: 'Slovenian',
  },
  Mt = {
    alpha3: 'som',
    alpha2: 'so',
    refName: 'Somali',
  },
  xt = {
    alpha3: 'sqi',
    alpha2: 'sq',
    refName: 'Albanian',
  },
  zt = {
    alpha3: 'srp',
    alpha2: 'sr',
    refName: 'Serbian',
  },
  Et = {
    alpha3: 'sun',
    alpha2: 'su',
    refName: 'Sundanese',
  },
  Lt = {
    alpha3: 'swe',
    alpha2: 'sv',
    refName: 'Swedish',
  },
  It = {
    alpha3: 'swa',
    alpha2: 'sw',
    refName: 'Swahili (macrolanguage)',
  },
  jt = {
    alpha3: 'tam',
    alpha2: 'ta',
    refName: 'Tamil',
  },
  Rt = {
    alpha3: 'tel',
    alpha2: 'te',
    refName: 'Telugu',
  },
  Dt = {
    alpha3: 'tgk',
    alpha2: 'tg',
    refName: 'Tajik',
  },
  Kt = {
    alpha3: 'tha',
    alpha2: 'th',
    refName: 'Thai',
  },
  _t = {
    alpha3: 'tuk',
    alpha2: 'tk',
    refName: 'Turkmen',
  },
  Ut = {
    alpha3: 'tgl',
    alpha2: 'tl',
    refName: 'Tagalog',
  },
  Ct = {
    alpha3: 'tur',
    alpha2: 'tr',
    refName: 'Turkish',
  },
  Bt = {
    alpha3: 'tat',
    alpha2: 'tt',
    refName: 'Tatar',
  },
  Ot = {
    alpha3: 'tyv',
    alpha2: null,
    refName: 'Tuvinian',
  },
  Wt = {
    alpha3: 'uig',
    alpha2: 'ug',
    refName: 'Uighur',
  },
  qt = {
    alpha3: 'ukr',
    alpha2: 'uk',
    refName: 'Ukrainian',
  },
  Ht = {
    alpha3: 'urd',
    alpha2: 'ur',
    refName: 'Urdu',
  },
  Yt = {
    alpha3: 'uzb',
    alpha2: 'uz',
    refName: 'Uzbek',
  },
  Gt = {
    alpha3: 'vec',
    alpha2: null,
    refName: 'Venetian',
  },
  Vt = {
    alpha3: 'vep',
    alpha2: null,
    refName: 'Veps',
  },
  $t = {
    alpha3: 'vie',
    alpha2: 'vi',
    refName: 'Vietnamese',
  },
  Qt = {
    alpha3: 'vls',
    alpha2: null,
    refName: 'Vlaams',
  },
  Xt = {
    alpha3: 'vol',
    alpha2: 'vo',
    refName: 'Volapük',
  },
  Jt = {
    alpha3: 'wln',
    alpha2: 'wa',
    refName: 'Walloon',
  },
  Zt = {
    alpha3: 'war',
    alpha2: null,
    refName: 'Waray (Philippines)',
  },
  an = {
    alpha3: 'wuu',
    alpha2: null,
    refName: 'Wu Chinese',
  },
  en = {
    alpha3: 'xal',
    alpha2: null,
    refName: 'Kalmyk',
  },
  tn = {
    alpha3: 'xmf',
    alpha2: null,
    refName: 'Mingrelian',
  },
  nn = {
    alpha3: 'yid',
    alpha2: 'yi',
    refName: 'Yiddish',
  },
  rn = {
    alpha3: 'yor',
    alpha2: 'yo',
    refName: 'Yoruba',
  },
  sn = {
    alpha3: 'yue',
    alpha2: null,
    refName: 'Yue Chinese',
  },
  ln = {
    alpha3: 'zho',
    alpha2: 'zh',
    refName: 'Chinese',
  },
  L = {
    af: V,
    als: $,
    am: Q,
    an: X,
    ar: J,
    arz: Z,
    as: aa,
    ast: ea,
    av: ta,
    az: na,
    azb: ra,
    ba: sa,
    bar: la,
    bcl: oa,
    be: ia,
    bg: ha,
    bh: pa,
    bn: ca,
    bo: ma,
    bpy: fa,
    br: ua,
    bs: da,
    bxr: Na,
    ca: ga,
    cbk: ya,
    ce: ba,
    ceb: wa,
    ckb: va,
    co: ka,
    cs: Ta,
    cv: Aa,
    cy: Pa,
    da: Sa,
    de: Fa,
    diq: Ma,
    dsb: xa,
    dty: za,
    dv: Ea,
    el: La,
    eml: Ia,
    en: ja,
    eo: Ra,
    es: Da,
    et: Ka,
    eu: _a,
    fa: Ua,
    fi: Ca,
    fr: Ba,
    frr: Oa,
    fy: Wa,
    ga: qa,
    gd: Ha,
    gl: Ya,
    gn: Ga,
    gom: Va,
    gu: $a,
    gv: Qa,
    he: Xa,
    hi: Ja,
    hif: Za,
    hr: ae,
    hsb: ee,
    ht: te,
    hu: ne,
    hy: re,
    ia: se,
    id: le,
    ie: oe,
    ilo: ie,
    io: he,
    is: pe,
    it: ce,
    ja: me,
    jbo: fe,
    jv: ue,
    ka: de,
    kk: Ne,
    km: ge,
    kn: ye,
    ko: be,
    krc: we,
    ku: ve,
    kv: ke,
    kw: Te,
    ky: Ae,
    la: Pe,
    lb: Se,
    lez: Fe,
    li: Me,
    lmo: xe,
    lo: ze,
    lrc: Ee,
    lt: Le,
    lv: Ie,
    mai: je,
    mg: Re,
    mhr: De,
    min: Ke,
    mk: _e,
    ml: Ue,
    mn: Ce,
    mr: Be,
    mrj: Oe,
    ms: We,
    mt: qe,
    mwl: He,
    my: Ye,
    myv: Ge,
    mzn: Ve,
    nah: $e,
    nap: Qe,
    nds: Xe,
    ne: Je,
    new: {
      alpha3: 'new',
      alpha2: null,
      refName: 'Newari',
    },
    nl: Ze,
    nn: at,
    no: et,
    oc: tt,
    or: nt,
    os: rt,
    pa: st,
    pam: lt,
    pfl: ot,
    pl: it,
    pms: ht,
    pnb: pt,
    ps: ct,
    pt: mt,
    qu: ft,
    rm: ut,
    ro: dt,
    ru: Nt,
    rue: gt,
    sa: yt,
    sah: bt,
    sc: wt,
    scn: vt,
    sco: kt,
    sd: Tt,
    sh: At,
    si: Pt,
    sk: St,
    sl: Ft,
    so: Mt,
    sq: xt,
    sr: zt,
    su: Et,
    sv: Lt,
    sw: It,
    ta: jt,
    te: Rt,
    tg: Dt,
    th: Kt,
    tk: _t,
    tl: Ut,
    tr: Ct,
    tt: Bt,
    tyv: Ot,
    ug: Wt,
    uk: qt,
    ur: Ht,
    uz: Yt,
    vec: Gt,
    vep: Vt,
    vi: $t,
    vls: Qt,
    vo: Xt,
    wa: Jt,
    war: Zt,
    wuu: an,
    xal: en,
    xmf: tn,
    yi: nn,
    yo: rn,
    yue: sn,
    zh: ln,
  },
  on = Object.keys(L).length;
class d {
  getFastTextModule;
  wasmPath;
  modelPath;
  model = null;
  static formatLang(a) {
    const e = a.replace('__label__', '');
    return d.normalizeIdentifyLang(e);
  }
  /**
   * fastText [language identification model](https://fasttext.cc/docs/en/language-identification.html)
   * result is based on [List of Wikipedias](https://en.wikipedia.org/wiki/List_of_Wikipedias) `WP code`
   *
   * This lib provide a normalize method to transform `WP code` to ISO 639-3 as much as possible.
   *
   * More detail refer to [languages scripts](https://github.com/yunsii/fasttext.wasm.js/tree/master/scripts/languages).
   *
   * Notice: ISO 639 provides two and three-character codes for representing names of languages. ISO 3166 provides two and three-character codes for representing names of countries.
   */
  static normalizeIdentifyLang(a) {
    return L[a];
  }
  constructor(a) {
    const { getFastTextModule: e, wasmPath: t, modelPath: n } = a;
    if (!n) throw new Error('No model path provided.');
    (this.getFastTextModule = e), (this.wasmPath = t), (this.modelPath = n);
  }
  /**
   * Use `lid.176.ftz` as default model
   */
  async load() {
    if (!this.model) {
      const a = await G({
          getFastTextModule: () =>
            this.getFastTextModule({
              wasmPath: this.wasmPath,
            }),
        }),
        e = new a(),
        t = this.modelPath;
      this.model = await e.loadModel(t);
    }
    return this.model;
  }
  async identify(a, e) {
    const t = Math.max(e || 1, 1),
      n = Math.min(on, t),
      s = (await this.load()).predict(a, n, 0);
    return typeof e > 'u'
      ? {
          ...d.formatLang(s.get(0)[1]),
          possibility: s.get(0)[0],
        }
      : Array.from({ length: s.size() }).map((o, i) => ({
          ...d.formatLang(s.get(i)[1]),
          possibility: s.get(i)[0],
        }));
  }
}
class hn extends d {
  constructor(a = {}) {
    const e =
      typeof globalThis.location < 'u' ? globalThis.location.origin : '';
    super({
      wasmPath: `${e}${O}/fastText.common.wasm`,
      modelPath: `${e}${W}/lid.176.ftz`,
      ...a,
      getFastTextModule: B,
    });
  }
}
async function pn(r = {}) {
  return new hn(r);
}
const cn = pn,
  I = await cn({
    wasmPath: '/fastText/fasttext.common.wasm',
    modelPath: '/fastText/models/lid.176.ftz',
  });
await I.load();
class mn {
  constructor() {}
  async create(a = {}) {
    if (a.monitor) {
      const e = new j();
      a.monitor(e);
    }
    return new fn(a);
  }
  async capabilities() {
    return new un();
  }
}
class fn {
  constructor() {}
  async detect(a, e = {}) {
    const { alpha2: t, possibility: n } = await I.identify(a);
    return [new dn(t, n)];
  }
  destroy() {}
}
class un {
  constructor() {
    this.available = g.READILY;
  }
  canDetect(a) {
    return g.READILY;
  }
}
class dn {
  constructor(a, e) {
    (this.detectedLanguage = a), (this.confidence = e);
  }
}
(function () {
  ('ai' in self && 'assistant' in self.ai) ||
    (typeof self < 'u' &&
      Object.defineProperty(self, 'ai', {
        get() {
          return new Nn();
        },
        configurable: !0,
      }));
})();
class Nn {
  constructor() {
    (this.assistant = new _()), (this.languageDetector = new mn());
  }
}
class j extends EventTarget {
  constructor() {
    super(), (this.ondownloadprogress = null);
  }
}
const b = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
export { j as AICreateMonitor };
