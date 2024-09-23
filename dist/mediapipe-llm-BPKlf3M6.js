var ne = typeof self < "u" ? self : {};
function Oe(e, t) {
  e: {
    for (var r = ["CLOSURE_FLAGS"], n = ne, i = 0; i < r.length; i++) if ((n = n[r[i]]) == null) {
      r = null;
      break e;
    }
    r = n;
  }
  return (e = r && r[e]) != null ? e : t;
}
let cn;
const hn = typeof TextEncoder < "u";
function gr(e) {
  if (hn) e = (cn ||= new TextEncoder()).encode(e);
  else {
    let r = 0;
    const n = new Uint8Array(3 * e.length);
    for (let i = 0; i < e.length; i++) {
      var t = e.charCodeAt(i);
      if (t < 128) n[r++] = t;
      else {
        if (t < 2048) n[r++] = t >> 6 | 192;
        else {
          if (t >= 55296 && t <= 57343) {
            if (t <= 56319 && i < e.length) {
              const o = e.charCodeAt(++i);
              if (o >= 56320 && o <= 57343) {
                t = 1024 * (t - 55296) + o - 56320 + 65536, n[r++] = t >> 18 | 240, n[r++] = t >> 12 & 63 | 128, n[r++] = t >> 6 & 63 | 128, n[r++] = 63 & t | 128;
                continue;
              }
              i--;
            }
            t = 65533;
          }
          n[r++] = t >> 12 | 224, n[r++] = t >> 6 & 63 | 128;
        }
        n[r++] = 63 & t | 128;
      }
    }
    e = r === n.length ? n : n.subarray(0, r);
  }
  return e;
}
var ye, _r = Oe(610401301, !1), fn = Oe(645172343, Oe(1, !0)), dn = Oe(660014094, !1);
const Lt = ne.navigator;
function ot(e) {
  return !!_r && !!ye && ye.brands.some(({ brand: t }) => t && t.indexOf(e) != -1);
}
function N(e) {
  var t;
  return (t = ne.navigator) && (t = t.userAgent) || (t = ""), t.indexOf(e) != -1;
}
function q() {
  return !!_r && !!ye && ye.brands.length > 0;
}
function Je() {
  return q() ? ot("Chromium") : (N("Chrome") || N("CriOS")) && !(!q() && N("Edge")) || N("Silk");
}
ye = Lt && Lt.userAgentData || null;
var pn = !q() && (N("Trident") || N("MSIE"));
!N("Android") || Je(), Je(), N("Safari") && (Je() || !q() && N("Coast") || !q() && N("Opera") || !q() && N("Edge") || (q() ? ot("Microsoft Edge") : N("Edg/")) || q() && ot("Opera"));
var yr = {}, pe = null;
function mn(e) {
  var t = e.length, r = 3 * t / 4;
  r % 3 ? r = Math.floor(r) : "=.".indexOf(e[t - 1]) != -1 && (r = "=.".indexOf(e[t - 2]) != -1 ? r - 2 : r - 1);
  var n = new Uint8Array(r), i = 0;
  return function(o, s) {
    function u(p) {
      for (; a < o.length; ) {
        var _ = o.charAt(a++), A = pe[_];
        if (A != null) return A;
        if (!/^[\s\xa0]*$/.test(_)) throw Error("Unknown base64 encoding at char: " + _);
      }
      return p;
    }
    vr();
    for (var a = 0; ; ) {
      var l = u(-1), c = u(0), h = u(64), d = u(64);
      if (d === 64 && l === -1) break;
      s(l << 2 | c >> 4), h != 64 && (s(c << 4 & 240 | h >> 2), d != 64 && s(h << 6 & 192 | d));
    }
  }(e, function(o) {
    n[i++] = o;
  }), i !== r ? n.subarray(0, i) : n;
}
function vr() {
  if (!pe) {
    pe = {};
    for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), t = ["+/=", "+/", "-_=", "-_.", "-_"], r = 0; r < 5; r++) {
      var n = e.concat(t[r].split(""));
      yr[r] = n;
      for (var i = 0; i < n.length; i++) {
        var o = n[i];
        pe[o] === void 0 && (pe[o] = i);
      }
    }
  }
}
var br = typeof Uint8Array < "u", wr = !pn && typeof btoa == "function";
function kt(e) {
  if (!wr) {
    var t;
    t === void 0 && (t = 0), vr(), t = yr[t];
    var r = Array(Math.floor(e.length / 3)), n = t[64] || "";
    let a = 0, l = 0;
    for (; a < e.length - 2; a += 3) {
      var i = e[a], o = e[a + 1], s = e[a + 2], u = t[i >> 2];
      i = t[(3 & i) << 4 | o >> 4], o = t[(15 & o) << 2 | s >> 6], s = t[63 & s], r[l++] = u + i + o + s;
    }
    switch (u = 0, s = n, e.length - a) {
      case 2:
        s = t[(15 & (u = e[a + 1])) << 2] || n;
      case 1:
        e = e[a], r[l] = t[e >> 2] + t[(3 & e) << 4 | u >> 4] + s + n;
    }
    return r.join("");
  }
  for (t = "", r = 0, n = e.length - 10240; r < n; ) t += String.fromCharCode.apply(null, e.subarray(r, r += 10240));
  return t += String.fromCharCode.apply(null, r ? e.subarray(r) : e), btoa(t);
}
const xt = /[-_.]/g, gn = { "-": "+", _: "/", ".": "=" };
function _n(e) {
  return gn[e] || "";
}
function Ut(e) {
  if (!wr) return mn(e);
  xt.test(e) && (e = e.replace(xt, _n)), e = atob(e);
  const t = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++) t[r] = e.charCodeAt(r);
  return t;
}
function ve(e) {
  return br && e != null && e instanceof Uint8Array;
}
var be = {};
let yn;
function Sr(e) {
  if (e !== be) throw Error("illegal external caller");
}
function Xe() {
  return yn ||= new Y(null, be);
}
var Y = class {
  constructor(e, t) {
    if (Sr(t), this.i = e, e != null && e.length === 0) throw Error("ByteString should be constructed with non-empty values");
  }
};
function Ar(e, t) {
  e.__closure__error__context__984382 || (e.__closure__error__context__984382 = {}), e.__closure__error__context__984382.severity = t;
}
let vn;
function Le() {
  const e = Error();
  Ar(e, "incident"), function(t) {
    ne.setTimeout(() => {
      throw t;
    }, 0);
  }(e);
}
function we(e) {
  return Ar(e = Error(e), "warning"), e;
}
function mt() {
  return typeof BigInt == "function";
}
function $(e) {
  return Array.prototype.slice.call(e);
}
var se = typeof Symbol == "function" && typeof Symbol() == "symbol";
function gt(e) {
  return typeof Symbol == "function" && typeof Symbol() == "symbol" ? Symbol() : e;
}
var Se = gt(), Ze = gt("2ex"), ce = gt("1oa"), Er = se ? (e, t) => {
  e[Se] |= t;
} : (e, t) => {
  e.i !== void 0 ? e.i |= t : Object.defineProperties(e, { i: { value: t, configurable: !0, writable: !0, enumerable: !1 } });
}, Bt = se ? (e, t) => {
  e[Se] &= ~t;
} : (e, t) => {
  e.i !== void 0 && (e.i &= ~t);
}, L = se ? (e) => 0 | e[Se] : (e) => 0 | e.i, k = se ? (e) => e[Se] : (e) => e.i, v = se ? (e, t) => {
  e[Se] = t;
} : (e, t) => {
  e.i !== void 0 ? e.i = t : Object.defineProperties(e, { i: { value: t, configurable: !0, writable: !0, enumerable: !1 } });
};
function bn(e, t) {
  v(t, -14591 & (0 | e));
}
function st(e, t) {
  v(t, -14557 & (34 | e));
}
var _t, Ce = {}, wn = {};
function Nt(e) {
  return !(!e || typeof e != "object" || e.i !== wn);
}
function yt(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e) && e.constructor === Object;
}
function ke(e) {
  return !(!Array.isArray(e) || e.length) && !!(1 & L(e));
}
const jt = [];
function ae(e) {
  if (2 & e) throw Error();
}
v(jt, 55), _t = Object.freeze(jt);
var Sn = Object.freeze({}), An = Object.freeze({});
let En, y = 0, b = 0;
function Ft(e) {
  const t = e >>> 0;
  y = t, b = (e - t) / 4294967296 >>> 0;
}
function ie(e) {
  if (e < 0) {
    Ft(-e);
    const [t, r] = vt(y, b);
    y = t >>> 0, b = r >>> 0;
  } else Ft(e);
}
function xe(e, t) {
  if (e >>>= 0, (t >>>= 0) <= 2097151) var r = "" + (4294967296 * t + e);
  else mt() ? r = "" + (BigInt(t) << BigInt(32) | BigInt(e)) : (e = (16777215 & e) + 6777216 * (r = 16777215 & (e >>> 24 | t << 8)) + 6710656 * (t = t >> 16 & 65535), r += 8147497 * t, t *= 2, e >= 1e7 && (r += e / 1e7 >>> 0, e %= 1e7), r >= 1e7 && (t += r / 1e7 >>> 0, r %= 1e7), r = t + Dt(r) + Dt(e));
  return r;
}
function Dt(e) {
  return e = String(e), "0000000".slice(e.length) + e;
}
function Ge(e) {
  if (e.length < 16) ie(Number(e));
  else if (mt()) e = BigInt(e), y = Number(e & BigInt(4294967295)) >>> 0, b = Number(e >> BigInt(32) & BigInt(4294967295));
  else {
    const t = +(e[0] === "-");
    b = y = 0;
    const r = e.length;
    for (let n = t, i = (r - t) % 6 + t; i <= r; n = i, i += 6) {
      const o = Number(e.slice(n, i));
      b *= 1e6, y = 1e6 * y + o, y >= 4294967296 && (b += Math.trunc(y / 4294967296), b >>>= 0, y >>>= 0);
    }
    if (t) {
      const [n, i] = vt(y, b);
      y = n, b = i;
    }
  }
}
function vt(e, t) {
  return t = ~t, e ? e = 1 + ~e : t += 1, [e, t];
}
var bt = typeof ne.BigInt == "function" && typeof ne.BigInt(0) == "bigint";
const Tn = Number.MIN_SAFE_INTEGER.toString(), Pn = bt ? BigInt(Number.MIN_SAFE_INTEGER) : void 0, In = Number.MAX_SAFE_INTEGER.toString(), On = bt ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
function Mt(e, t) {
  if (e.length > t.length) return !1;
  if (e.length < t.length || e === t) return !0;
  for (let r = 0; r < e.length; r++) {
    const n = e[r], i = t[r];
    if (n > i) return !1;
    if (n < i) return !0;
  }
}
function Qe(e) {
  if (e != null && typeof e != "number") throw Error(`Value of float/double field must be a number, found ${typeof e}: ${e}`);
  return e;
}
function Tr(e) {
  return e == null || typeof e == "number" ? e : e === "NaN" || e === "Infinity" || e === "-Infinity" ? Number(e) : void 0;
}
const Ln = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function Pr(e) {
  const t = typeof e;
  switch (t) {
    case "bigint":
      return !0;
    case "number":
      return Number.isFinite(e);
  }
  return t === "string" && Ln.test(e);
}
function Ir(e) {
  if (typeof e != "number" || !Number.isFinite(e)) throw we("int32");
  return 0 | e;
}
function at(e) {
  return e == null ? e : Ir(e);
}
function ue(e) {
  if (e == null) return e;
  if (typeof e == "string") {
    if (!e) return;
    e = +e;
  }
  return typeof e == "number" && Number.isFinite(e) ? 0 | e : void 0;
}
function Ee(e) {
  if (e != null) {
    if (typeof e != "number" || !Number.isFinite(e)) throw we("uint32");
    e >>>= 0;
  }
  return e;
}
function Rt(e) {
  return e[0] !== "-" && (e.length < 20 || e.length === 20 && Number(e.substring(0, 6)) < 184467);
}
function kn(e) {
  if (e == null) return e;
  var t = typeof e;
  if (t === "bigint") return String(BigInt.asUintN(64, e));
  if (Pr(e)) {
    if (t === "string") return t = Math.trunc(Number(e)), Number.isSafeInteger(t) && t >= 0 ? e = String(t) : ((t = e.indexOf(".")) !== -1 && (e = e.substring(0, t)), Rt(e) || (Ge(e), e = xe(y, b))), e;
    if (t === "number") return (e = Math.trunc(e)) >= 0 && Number.isSafeInteger(e) ? e : function(r) {
      if (r < 0) {
        ie(r);
        const n = xe(y, b);
        return r = Number(n), Number.isSafeInteger(r) ? r : n;
      }
      return Rt(String(r)) ? r : (ie(r), 4294967296 * b + (y >>> 0));
    }(e);
  }
}
function Or(e) {
  return e == null || typeof e == "string" ? e : void 0;
}
function Lr(e, t, r) {
  if (e != null && typeof e == "object" && e.M === Ce) return e;
  if (Array.isArray(e)) {
    var n = L(e), i = n;
    return i === 0 && (i |= 32 & r), (i |= 2 & r) !== n && v(e, i), new t(e);
  }
}
function kr(e) {
  var t = Ue?.get(e);
  if (t) return t;
  if (Math.random() > 0.01) return e;
  if (he === void 0) if (typeof Proxy != "function") he = null;
  else try {
    he = Proxy.toString().indexOf("[native code]") !== -1 ? Proxy : null;
  } catch {
    he = null;
  }
  return (t = he) ? (function(r, n) {
    (Ue ||= /* @__PURE__ */ new WeakMap()).set(r, n), (xr ||= /* @__PURE__ */ new WeakMap()).set(n, r);
  }(e, t = new t(e, { set: (r, n, i) => (Le(), r[n] = i, !0) })), t) : e;
}
let Ue, xr, he, Be, xn, Un, Ne;
function Ur(e, t, r) {
  if (e == null && (e = Be), Be = void 0, e == null) {
    var n = 96;
    r ? (e = [r], n |= 512) : e = [], t && (n = -16760833 & n | (1023 & t) << 14);
  } else {
    if (!Array.isArray(e)) throw Error("narr");
    if (2048 & (n = L(e))) throw Error("farr");
    if (64 & n) return e;
    if (n |= 64, r && (n |= 512, r !== e[0])) throw Error("mid");
    e: {
      const i = (r = e).length;
      if (i) {
        const o = i - 1;
        if (yt(r[o])) {
          if ((t = o - (+!!(512 & (n |= 256)) - 1)) >= 1024) throw Error("pvtlmt");
          n = -16760833 & n | (1023 & t) << 14;
          break e;
        }
      }
      if (t) {
        if ((t = Math.max(t, i - (+!!(512 & n) - 1))) > 1024) throw Error("spvt");
        n = -16760833 & n | (1023 & t) << 14;
      }
    }
  }
  return v(e, n), e;
}
function Br(e, t, r, n, i) {
  if (e != null) {
    if (Array.isArray(e)) e = ke(e) ? void 0 : i && 2 & L(e) ? e : ze(e, t, r, n !== void 0, i);
    else if (yt(e)) {
      const o = {};
      for (let s in e) o[s] = Br(e[s], t, r, n, i);
      e = o;
    } else e = t(e, n);
    return e;
  }
}
function ze(e, t, r, n, i) {
  const o = n || r ? L(e) : 0;
  n = n ? !!(32 & o) : void 0, e = $(e);
  for (let s = 0; s < e.length; s++) e[s] = Br(e[s], t, r, n, i);
  return r && r(o, e), e;
}
function Nr(e) {
  return e.M === Ce ? e.toJSON() : function(t) {
    switch (typeof t) {
      case "number":
        return isFinite(t) ? t : String(t);
      case "bigint":
        return (bt ? t >= Pn && t <= On : t[0] === "-" ? Mt(t, Tn) : Mt(t, In)) ? Number(t) : String(t);
      case "boolean":
        return t ? 1 : 0;
      case "object":
        if (t) if (Array.isArray(t)) {
          if (ke(t)) return;
        } else {
          if (ve(t)) return kt(t);
          if (t instanceof Y) {
            const r = t.i;
            return r == null ? "" : typeof r == "string" ? r : t.i = kt(r);
          }
        }
    }
    return t;
  }(e);
}
function jr(e, t, r = st) {
  if (e != null) {
    if (br && e instanceof Uint8Array) return t ? e : new Uint8Array(e);
    if (Array.isArray(e)) {
      var n = L(e);
      return 2 & n ? e : (t &&= n === 0 || !!(32 & n) && !(64 & n || !(16 & n)), t ? (v(e, -12293 & (34 | n)), e) : ze(e, jr, 4 & n ? st : r, !0, !0));
    }
    return e.M === Ce && (r = e.m, e = 2 & (n = k(r)) ? e : Fr(e, r, n, !0)), e;
  }
}
function Fr(e, t, r, n) {
  return e = e.constructor, Be = t = function(i, o, s) {
    const u = s || 2 & o ? st : bn, a = !!(32 & o);
    return i = function(l, c, h) {
      var d = (l = $(l)).length;
      const p = 256 & c ? l[d - 1] : void 0;
      for (d += p ? -1 : 0, c = 512 & c ? 1 : 0; c < d; c++) l[c] = h(l[c]);
      if (p) {
        c = l[c] = {};
        for (const _ in p) c[_] = h(p[_]);
      }
      return l;
    }(i, o, (l) => jr(l, a, u)), Er(i, 32 | (s ? 2 : 0)), i;
  }(t, r, n), t = new e(t), Be = void 0, t;
}
function Dr(e) {
  const t = e.m, r = k(t);
  return 2 & r ? Fr(e, t, r, !1) : e;
}
function Mr(e, t, r, n) {
  return !(4 & t) || r != null;
}
function Rr(e, t) {
  return le(e = e.m, k(e), t);
}
function Vt(e, t, r, n) {
  if (!((t = n + (+!!(512 & t) - 1)) < 0 || t >= e.length || t >= r)) return e[t];
}
function le(e, t, r, n) {
  if (r === -1) return null;
  const i = t >> 14 & 1023 || 536870912;
  if (!(r >= i)) {
    var o = e.length;
    return n && 256 & t && (n = e[o - 1][r]) != null ? (Vt(e, t, i, r) && Ze != null && ((t = (e = vn ??= {})[Ze] || 0) >= 4 || (e[Ze] = t + 1, Le())), n) : Vt(e, t, i, r);
  }
  return 256 & t ? e[e.length - 1][r] : void 0;
}
function K(e, t, r) {
  const n = e.m;
  let i = k(n);
  return ae(i), T(n, i, t, r), e;
}
function T(e, t, r, n, i) {
  const o = t >> 14 & 1023 || 536870912;
  if (r >= o || i && !fn) {
    let s = t;
    if (256 & t) i = e[e.length - 1];
    else {
      if (n == null) return s;
      i = e[o + (+!!(512 & t) - 1)] = {}, s |= 256;
    }
    return i[r] = n, r < o && (e[r + (+!!(512 & t) - 1)] = void 0), s !== t && v(e, s), s;
  }
  return e[r + (+!!(512 & t) - 1)] = n, 256 & t && r in (e = e[e.length - 1]) && delete e[r], t;
}
function Vr(e, t, r) {
  return e = le(e, t, r), Array.isArray(e) ? e : _t;
}
function Cr(e, t) {
  return e === 0 && (e = te(e, t)), 1 | e;
}
function G(e) {
  return !!(2 & e) && !!(4 & e) || !!(2048 & e);
}
function F(e, t, r, n) {
  e = e.m;
  let i = k(e);
  ae(i), T(e, i, t, (n === "0" ? Number(r) === 0 : r === n) ? void 0 : r);
}
function Ct(e) {
  if (se) return e[ce] ?? (e[ce] = /* @__PURE__ */ new Map());
  if (ce in e) return e[ce];
  const t = /* @__PURE__ */ new Map();
  return Object.defineProperty(e, ce, { value: t }), t;
}
function Gt(e, t, r) {
  var n = Re;
  let i = e.get(n);
  if (i != null) return i;
  i = 0;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    le(t, r, s) != null && (i !== 0 && (r = T(t, r, i)), i = s);
  }
  return e.set(n, i), i;
}
function ut(e, t, r) {
  var n = e.m, i = k(n), o = le(n, i, r, !1);
  return (t = Lr(o, t, i)) !== o && t != null && T(n, i, r, t, !1), (n = t) == null || (e = e.m, 2 & (i = k(e)) || (o = Dr(n)) !== n && T(e, i, r, n = o, !1)), n;
}
function J(e, t, r) {
  return r == null && (r = void 0), K(e, t, r);
}
function te(e, t) {
  return -2049 & (e = 32 | (2 & t ? 2 | e : -3 & e));
}
function oe(e, t, r) {
  return 32 & t && r || (e &= -33), e;
}
function me(e, t, r, n) {
  e = e.m;
  var i = k(e);
  ae(i);
  var o, s = !!(2 & i);
  const u = s ? 1 : 2;
  p &&= !s, s = Vr(e, i, t);
  var a = L(s), l = !!(4 & a);
  if (!l) {
    var c = s, h = i, d = !!(2 & (a = Cr(a, i)));
    d && (h |= 2);
    let _ = !d, A = !0, Ae = 0, qe = 0;
    for (; Ae < c.length; Ae++) {
      const Ye = Lr(c[Ae], r, h);
      if (Ye instanceof r) {
        if (!d) {
          const Ot = !!(2 & L(Ye.m));
          _ &&= !Ot, A &&= Ot;
        }
        c[qe++] = Ye;
      }
    }
    qe < Ae && (c.length = qe), a |= 4, a = A ? 16 | a : -17 & a, v(c, a = _ ? 8 | a : -9 & a), d && Object.freeze(c);
  }
  if (p && !(8 & a || !s.length && (u === 1 || u === 4 && 32 & a))) {
    G(a) && (s = $(s), a = te(a, i), i = T(e, i, t, s));
    var p = s;
    for (c = a, a = 0; a < p.length; a++) (h = p[a]) !== (d = Dr(h)) && (p[a] = d);
    c |= 8, c = p.length ? -17 & c : 16 | c, v(p, c), a = c;
  }
  u === 1 || u === 4 && 32 & a ? G(a) || (t = a, (a |= !s.length || 16 & a && (!l || 32 & a) ? 2 : 2048) !== t && v(s, a), Object.freeze(s)) : (l = u === 5 && (!!(32 & a) || G(a) || !!Ue?.get(s)), (u === 2 || l) && G(a) && (s = $(s), a = oe(a = te(a, i), i, !0), v(s, a), i = T(e, i, t, s)), G(a) || (t = a, (a = oe(a, i, !0)) !== t && v(s, a)), l && (o = kr(s))), o = o || s, r = n ?? new r(), o.push(r), 2 & L(r.m) ? Bt(o, 8) : Bt(o, 16);
}
function lt(e) {
  return e ?? 0;
}
function Q(e, t) {
  return lt(function(r) {
    if (r == null) return r;
    if (typeof r == "string") {
      if (!r) return;
      r = +r;
    }
    return typeof r == "number" && Number.isFinite(r) ? r >>> 0 : void 0;
  }(Rr(e, t)));
}
function D(e, t, r) {
  F(e, t, at(r), 0);
}
function P(e, t, r) {
  if (r != null && typeof r != "string") throw Error();
  F(e, t, r, "");
}
function Gr(e, t, r) {
  {
    const u = e.m;
    let a = k(u);
    if (ae(a), r == null) T(u, a, t);
    else {
      r = xr?.get(r) || r;
      var n, i = L(r), o = i, s = !!(2 & i) || Object.isFrozen(r);
      if ((n = !s) && (n = An === void 0 || !1), Mr(e, i)) for (i = 21, s && (r = $(r), o = 0, i = oe(i = te(i, a), a, !0)), e = 0; e < r.length; e++) r[e] = Ir(r[e]);
      n && (r = $(r), o = 0, i = oe(i = te(i, a), a, !0)), i !== o && v(r, i), T(u, a, t, r);
    }
  }
}
function m(e, t, r) {
  e = e.m;
  const n = k(e);
  ae(n);
  var i = 2 & n;
  let o = le(e, n, t);
  Array.isArray(o) || (o = _t);
  const s = !!(32 & n);
  let u = L(o);
  if (u === 0 && s && !i ? (u |= 33, v(o, u)) : 1 & u || (u |= 1, v(o, u)), i ? (2 & u || Er(o, 34), Object.freeze(o)) : (2 & u || 2048 & u) && (o = $(o), i = 1, s && (i |= 32), v(o, i), T(e, n, t, o)), typeof r != "string") throw Error();
  o.push(r);
}
function zt(e) {
  if (typeof e == "string") return { buffer: Ut(e), B: !1 };
  if (Array.isArray(e)) return { buffer: new Uint8Array(e), B: !1 };
  if (e.constructor === Uint8Array) return { buffer: e, B: !1 };
  if (e.constructor === ArrayBuffer) return { buffer: new Uint8Array(e), B: !1 };
  if (e.constructor === Y) {
    Sr(be);
    var t = e.i;
    return { buffer: ((t = t == null || ve(t) ? t : typeof t == "string" ? Ut(t) : null) == null ? t : e.i = t) || new Uint8Array(0), B: !0 };
  }
  if (e instanceof Uint8Array) return { buffer: new Uint8Array(e.buffer, e.byteOffset, e.byteLength), B: !1 };
  throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
}
var w = class {
  constructor(e, t) {
    this.m = Ur(e, t);
  }
  toJSON() {
    return zr(this);
  }
  B() {
    return !!(2 & L(this.m));
  }
};
function zr(e) {
  e = Ne ? e.m : ze(e.m, Nr, void 0, void 0, !1);
  {
    var t = !Ne;
    let l = e.length;
    if (l) {
      var r = e[l - 1], n = yt(r);
      n ? l-- : r = void 0;
      var i = e;
      if (n) {
        e: {
          var o = r, s = {};
          if (n = !1, o) for (var u in o) {
            if (isNaN(+u)) {
              s[u] = o[u];
              continue;
            }
            let c = o[u];
            Array.isArray(c) && (ke(c) || Nt(c) && c.size === 0) && (c = null), c == null && (n = !0), c != null && (s[u] = c);
          }
          if (n) {
            for (let c in s) break e;
            s = null;
          } else s = o;
        }
        o = s == null ? r != null : s !== r;
      }
      for (; l > 0 && ((u = i[l - 1]) == null || ke(u) || Nt(u) && u.size === 0); l--) var a = !0;
      (i !== e || o || a) && (t ? (a || o || s) && (i.length = l) : i = Array.prototype.slice.call(i, 0, l), s && i.push(s)), a = i;
    } else a = e;
  }
  return a;
}
function $t(e) {
  return e ? /^\d+$/.test(e) ? (Ge(e), new Wt(y, b)) : null : Bn ||= new Wt(0, 0);
}
w.prototype.M = Ce, w.prototype.toString = function() {
  try {
    return Ne = !0, zr(this).toString();
  } finally {
    Ne = !1;
  }
};
var Wt = class {
  constructor(e, t) {
    this.j = e >>> 0, this.i = t >>> 0;
  }
};
let Bn;
function Ht(e) {
  return e ? /^-?\d+$/.test(e) ? (Ge(e), new Kt(y, b)) : null : Nn ||= new Kt(0, 0);
}
var Kt = class {
  constructor(e, t) {
    this.j = e >>> 0, this.i = t >>> 0;
  }
};
let Nn;
function je(e, t, r) {
  for (; r > 0 || t > 127; ) e.i.push(127 & t | 128), t = (t >>> 7 | r << 25) >>> 0, r >>>= 7;
  e.i.push(t);
}
function M(e, t) {
  for (; t > 127; ) e.i.push(127 & t | 128), t >>>= 7;
  e.i.push(t);
}
function $e(e, t) {
  if (t >= 0) M(e, t);
  else {
    for (let r = 0; r < 9; r++) e.i.push(127 & t | 128), t >>= 7;
    e.i.push(1);
  }
}
function Fe(e, t) {
  t.length !== 0 && (e.l.push(t), e.j += t.length);
}
function wt(e, t) {
  return M(e.i, 8 * t + 2), t = e.i.end(), Fe(e, t), t.push(e.j), t;
}
function St(e, t) {
  var r = t.pop();
  for (r = e.j + e.i.length() - r; r > 127; ) t.push(127 & r | 128), r >>>= 7, e.j++;
  t.push(r), e.j++;
}
function De(e, t, r) {
  M(e.i, 8 * t + 2), M(e.i, r.length), Fe(e, e.i.end()), Fe(e, r);
}
class R {
  constructor(t, r) {
    this.i = t, this.P = r;
  }
}
function At(e, t) {
  if (Array.isArray(t)) {
    var r = L(t);
    if (4 & r) return t;
    for (var n = 0, i = 0; n < t.length; n++) {
      const o = e(t[n]);
      o != null && (t[i++] = o);
    }
    return i < n && (t.length = i), v(t, -12289 & (5 | r)), 2 & r && Object.freeze(t), t;
  }
}
const jn = Symbol(), qt = Symbol();
function $r(e) {
  let t = e[qt];
  if (!t) {
    const r = We(e);
    t = (n, i) => Wr(n, i, r), e[qt] = t;
  }
  return t;
}
const et = Symbol();
function Fn(e) {
  return e.i;
}
function Dn(e, t) {
  let r, n;
  const i = e.i;
  return (o, s, u) => i(o, s, u, n ||= We(t).i, r ||= $r(t));
}
function We(e) {
  var t = e[et];
  if (t) return t;
  var r = Fn, n = Dn;
  (t = e[et] = {}).i = function(d) {
    switch (typeof d) {
      case "boolean":
        return xn ||= [0, void 0, !0];
      case "number":
        return d > 0 ? void 0 : d === 0 ? Un ||= [0, void 0] : [-d, void 0];
      case "string":
        return [0, d];
      case "object":
        return d;
    }
  }(e[0]);
  let i = 0;
  var o = e[++i];
  o && o.constructor === Object && (t.L = o, typeof (o = e[++i]) == "function" && (t.l = o, t.j = e[++i], o = e[++i]));
  const s = {};
  for (; Array.isArray(o) && typeof o[0] == "number" && o[0] > 0; ) {
    for (var u = 0; u < o.length; u++) s[o[u]] = o;
    o = e[++i];
  }
  for (u = 1; o !== void 0; ) {
    let d;
    typeof o == "number" && (u += o, o = e[++i]);
    var a = void 0;
    if (o instanceof R ? d = o : (d = Gn, i--), d.P) {
      o = e[++i], a = e;
      var l = i;
      typeof o == "function" && (o = o(), a[l] = o), a = o;
    }
    let p = u + 1;
    for (typeof (o = e[++i]) == "number" && o < 0 && (p -= o, o = e[++i]); u < p; u++) {
      var c = s[u];
      l = t;
      var h = u;
      c = a ? n(d, a) : r(d), l[h] = c;
    }
  }
  return Mn in e && jn in e && et in e && (e.length = 0), t;
}
const Mn = Symbol();
function Yt(e, t) {
  var r = e[t];
  if (r) return r;
  if (r = e.L) {
    var n = r[t];
    if (n) {
      var i = (n = Array.isArray(n) ? n[0] instanceof R ? n : [Cn, n] : [n, void 0])[0].i;
      if (n = n[1], r = r.C?.[t], !dn || r) {
        if (n) {
          const o = $r(n), s = We(n).i;
          r = (r = e.j) ? r(s, o) : (u, a, l) => i(u, a, l, s, o);
        } else r = i;
        return e[t] = r;
      }
    }
  }
}
function Wr(e, t, r) {
  for (var n = k(e), i = +!!(512 & n) - 1, o = e.length, s = 512 & n ? 1 : 0, u = o + (256 & n ? -1 : 0); s < u; s++) {
    const a = e[s];
    if (a == null) continue;
    const l = s - i, c = Yt(r, l);
    if (!c) continue;
    const h = r.L;
    h?.[l] && !h?.C?.[l] && Jt++ < 5 && Le(), c(t, a, l);
  }
  if (256 & n) {
    e = e[o - 1];
    for (let a in e) n = +a, !Number.isNaN(n) && (i = e[a]) != null && (o = Yt(r, n)) && ((u = r.L)?.[n] && !u?.C?.[n] && Jt++ < 5 && Le(), o(t, i, n));
  }
}
function x(e) {
  return new R(e, !1);
}
let Jt = 0;
function Et(e, t, r) {
  (t = ue(t)) != null && t != null && (M(e.i, 8 * r), $e(e.i, t));
}
function Hr(e, t, r) {
  (t = t == null || typeof t == "boolean" ? t : typeof t == "number" ? !!t : void 0) != null && (M(e.i, 8 * r), e.i.i.push(t ? 1 : 0));
}
function Tt(e, t, r) {
  (t = Or(t)) != null && De(e, r, gr(t));
}
function He(e, t, r, n, i) {
  (t = t instanceof w ? t.m : Array.isArray(t) ? Ur(t, n[0], n[1]) : void 0) != null && (r = wt(e, r), i(t, e), St(e, r));
}
function Kr(e, t, r) {
  (t = ue(t)) != null && (t = parseInt(t, 10), M(e.i, 8 * r), $e(e.i, t));
}
var B, ct = x(function(e, t, r) {
  (t = Tr(t)) != null && (M(e.i, 8 * r + 5), e = e.i, (r = En ||= new DataView(new ArrayBuffer(8))).setFloat32(0, +t, !0), b = 0, t = y = r.getUint32(0, !0), e.i.push(t >>> 0 & 255), e.i.push(t >>> 8 & 255), e.i.push(t >>> 16 & 255), e.i.push(t >>> 24 & 255));
}), tt = x(function(e, t, r) {
  t = function(n) {
    if (n == null) return n;
    var i = typeof n;
    if (i === "bigint") return String(BigInt.asIntN(64, n));
    if (Pr(n)) {
      if (i === "string") {
        if (i = Math.trunc(Number(n)), Number.isSafeInteger(i)) n = String(i);
        else if ((i = n.indexOf(".")) !== -1 && (n = n.substring(0, i)), !(n[0] === "-" ? n.length < 20 || n.length === 20 && Number(n.substring(0, 7)) > -922337 : n.length < 19 || n.length === 19 && Number(n.substring(0, 6)) < 922337)) if (Ge(n), n = y, 2147483648 & (i = b)) if (mt()) n = "" + (BigInt(0 | i) << BigInt(32) | BigInt(n >>> 0));
        else {
          const [s, u] = vt(n, i);
          n = "-" + xe(s, u);
        }
        else n = xe(n, i);
        return n;
      }
      if (i === "number") {
        if (n = Math.trunc(n), !Number.isSafeInteger(n)) {
          ie(n), i = y;
          var o = b;
          (n = 2147483648 & o) && (o = ~o >>> 0, (i = 1 + ~i >>> 0) == 0 && (o = o + 1 >>> 0)), i = 4294967296 * o + (i >>> 0), n = n ? -i : i;
        }
        return n;
      }
    }
  }(t), t != null && (typeof t == "string" && Ht(t), t != null && (M(e.i, 8 * r), typeof t == "number" ? (e = e.i, ie(t), je(e, y, b)) : (r = Ht(t), je(e.i, r.j, r.i))));
}), Rn = x(function(e, t, r) {
  (t = kn(t)) != null && (typeof t == "string" && $t(t), t != null && (M(e.i, 8 * r), typeof t == "number" ? (e = e.i, ie(t), je(e, y, b)) : (r = $t(t), je(e.i, r.j, r.i))));
}), ee = x(Et), Me = new R(function(e, t, r) {
  if ((t = At(ue, t)) != null && t.length) {
    r = wt(e, r);
    for (let n = 0; n < t.length; n++) $e(e.i, t[n]);
    St(e, r);
  }
}, !1), g = x(Et), Vn = x(Et), j = x(Hr), S = x(Hr), U = new R(function(e, t, r) {
  if ((t = At(Or, t)) != null) for (let s = 0; s < t.length; s++) {
    var n = e, i = r, o = t[s];
    o != null && De(n, i, gr(o));
  }
}, !1), O = x(Tt), qr = x(Tt), I = x(Tt), Cn = new R(He, !0), Gn = new R(He, !0);
B = new R(function(e, t, r, n, i) {
  if (Array.isArray(t)) for (let o = 0; o < t.length; o++) He(e, t[o], r, n, i);
}, !0);
var V = new R(He, !0), ge = x(Kr), Yr = new R(function(e, t, r) {
  if ((t = At(ue, t)) != null && t.length) {
    r = wt(e, r);
    for (let n = 0; n < t.length; n++) $e(e.i, t[n]);
    St(e, r);
  }
}, !1), z = x(Kr);
function Ke(e) {
  return function() {
    const t = new class {
      constructor() {
        this.l = [], this.j = 0, this.i = new class {
          constructor() {
            this.i = [];
          }
          length() {
            return this.i.length;
          }
          end() {
            const s = this.i;
            return this.i = [], s;
          }
        }();
      }
    }();
    Wr(this.m, t, We(e)), Fe(t, t.i.end());
    const r = new Uint8Array(t.j), n = t.l, i = n.length;
    let o = 0;
    for (let s = 0; s < i; s++) {
      const u = n[s];
      r.set(u, o), o += u.length;
    }
    return t.l = [r], r;
  };
}
function rt(e, t) {
  if (t != null) if (Array.isArray(t)) K(e, 2, ze(t, Nr, void 0, void 0, !1));
  else {
    if (!(typeof t == "string" || t instanceof Y || ve(t))) throw Error("invalid value in Any.value field: " + t + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
    if (t != null) {
      if (typeof t == "string") t = t ? new Y(t, be) : Xe();
      else if (t.constructor !== Y) {
        if (!ve(t)) throw Error();
        t = t.length ? new Y(new Uint8Array(t), be) : Xe();
      }
    }
    F(e, 2, t, Xe());
  }
}
var re = class extends w {
  constructor(e) {
    super(e);
  }
}, Xt = [0, O, x(function(e, t, r) {
  if (t != null) {
    if (t instanceof w) {
      const n = t.aa;
      return void (n && (t = n(t), t != null && De(e, r, zt(t).buffer)));
    }
    if (Array.isArray(t)) return;
  }
  (t = t == null || typeof t == "string" || ve(t) || t instanceof Y ? t : void 0) != null && De(e, r, zt(t).buffer);
})], zn = [0, I, j, -1, ee, [0, [1, 2, 3, 4, 5, 6], V, [0], V, [0, j, I, j, ge, -1, Yr, I, -1, [0, j, -1], ge, j], V, [0, I, -2], V, [0, ee, j, 1, j, -3], V, [0, ee, ge, j, -1, Me, ge, -1], V, [0, I, -2]], [0, I], j, [0, [1, 3], [2, 4], V, [0, Me], -1, V, [0, U], -1, B, [0, I, -1]], I], Pt = {}, $n = Pt.C = {};
Pt[336783863] = zn, $n[336783863] = 1;
var Zt = class extends w {
  constructor(e) {
    super(e);
  }
}, Qt = [0, tt, -1, S, -3, tt, Me, O, g, tt, -1, S, g, S, -2, O], C = class extends w {
  constructor(e) {
    super(e, 500);
  }
  K(e) {
    return J(this, 7, e);
  }
}, _e = [-1, { C: {} }], er = [0, I, 1, _e], tr = [0, I, U, _e];
function W(e, t) {
  me(e, 1, C, t);
}
var Jr = class extends w {
  constructor() {
    super(void 0, 500);
  }
  K(e) {
    return J(this, 1001, e);
  }
};
Jr.prototype.i = Ke([-500, B, [-500, O, -1, U, -3, [-2, Pt, j], B, Xt, g, -1, er, tr, B, [0, O, S], O, Qt, g, U, 987, U], 4, B, [-500, I, -1, [-1, { C: {} }], 998, I], B, [-500, I, U, -1, [-2, { C: {} }, j], 997, U, -1], g, B, [-500, I, U, _e, 998, U], U, g, er, tr, B, [0, O, -1, _e], U, -2, Qt, O, -1, S, 979, _e, B, Xt]);
var rr = class extends w {
  constructor(e) {
    super(e);
  }
};
let Te;
const Wn = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function Xr() {
  if (Te === void 0) try {
    await WebAssembly.instantiate(Wn), Te = !0;
  } catch {
    Te = !1;
  }
  return Te;
}
async function fe(e, t = "") {
  const r = await Xr() ? "wasm_internal" : "wasm_nosimd_internal";
  return { wasmLoaderPath: `${t}/${e}_${r}.js`, wasmBinaryPath: `${t}/${e}_${r}.wasm` };
}
var Z = class {
};
function Hn() {
  var e = navigator;
  return typeof OffscreenCanvas < "u" && (!function(t = navigator) {
    return (t = t.userAgent).includes("Safari") && !t.includes("Chrome");
  }(e) || !!((e = e.userAgent.match(/Version\/([\d]+).*Safari/)) && e.length >= 1 && Number(e[1]) >= 17));
}
async function nr(e) {
  if (typeof importScripts != "function") {
    const t = document.createElement("script");
    return t.src = e.toString(), t.crossOrigin = "anonymous", new Promise((r, n) => {
      t.addEventListener("load", () => {
        r();
      }, !1), t.addEventListener("error", (i) => {
        n(i);
      }, !1), document.body.appendChild(t);
    });
  }
  importScripts(e.toString());
}
Z.forVisionTasks = function(e) {
  return fe("vision", e);
}, Z.forTextTasks = function(e) {
  return fe("text", e);
}, Z.forGenAiExperimentalTasks = function(e) {
  return fe("genai_experimental", e);
}, Z.forGenAiTasks = function(e) {
  return fe("genai", e);
}, Z.forAudioTasks = function(e) {
  return fe("audio", e);
}, Z.isSimdSupported = function() {
  return Xr();
};
function f(e, t, r) {
  e.o || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), r(t = e.h.stringToNewUTF8(t)), e.h._free(t);
}
function ir(e, t, r) {
  e.o || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
  const n = new Uint32Array(t.length);
  for (let i = 0; i < t.length; i++) n[i] = e.h.stringToNewUTF8(t[i]);
  t = e.h._malloc(4 * n.length), e.h.HEAPU32.set(n, t >> 2), r(t);
  for (const i of n) e.h._free(i);
  e.h._free(t);
}
function H(e, t, r) {
  e.h.simpleListeners = e.h.simpleListeners || {}, e.h.simpleListeners[t] = r;
}
function X(e, t, r) {
  let n = [];
  e.h.simpleListeners = e.h.simpleListeners || {}, e.h.simpleListeners[t] = (i, o, s) => {
    o ? (r(n, s), n = []) : n.push(i);
  };
}
const Kn = (or = class {
  constructor(e, t) {
    this.l = !0, this.h = e, this.i = null, this.j = 0, this.o = typeof this.h._addIntToInputStream == "function", t !== void 0 ? this.h.canvas = t : Hn() ? this.h.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.h.canvas = document.createElement("canvas"));
  }
  async initializeGraph(e) {
    const t = await (await fetch(e)).arrayBuffer();
    e = !(e.endsWith(".pbtxt") || e.endsWith(".textproto")), this.setGraph(new Uint8Array(t), e);
  }
  setGraphFromString(e) {
    this.setGraph(new TextEncoder().encode(e), !1);
  }
  setGraph(e, t) {
    const r = e.length, n = this.h._malloc(r);
    this.h.HEAPU8.set(e, n), t ? this.h._changeBinaryGraph(r, n) : this.h._changeTextGraph(r, n), this.h._free(n);
  }
  configureAudio(e, t, r, n, i) {
    this.h._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), f(this, n || "input_audio", (o) => {
      f(this, i = i || "audio_header", (s) => {
        this.h._configureAudio(o, s, e, t, r);
      });
    });
  }
  setAutoResizeCanvas(e) {
    this.l = e;
  }
  setAutoRenderToScreen(e) {
    this.h._setAutoRenderToScreen(e);
  }
  setGpuBufferVerticalFlip(e) {
    this.h.gpuOriginForWebTexturesIsBottomLeft = e;
  }
  attachErrorListener(e) {
    this.h.errorListener = e;
  }
  attachEmptyPacketListener(e, t) {
    this.h.emptyPacketListeners = this.h.emptyPacketListeners || {}, this.h.emptyPacketListeners[e] = t;
  }
  addAudioToStream(e, t, r) {
    this.addAudioToStreamWithShape(e, 0, 0, t, r);
  }
  addAudioToStreamWithShape(e, t, r, n, i) {
    const o = 4 * e.length;
    this.j !== o && (this.i && this.h._free(this.i), this.i = this.h._malloc(o), this.j = o), this.h.HEAPF32.set(e, this.i / 4), f(this, n, (s) => {
      this.h._addAudioToInputStream(this.i, t, r, s, i);
    });
  }
  addGpuBufferToStream(e, t, r) {
    f(this, t, (n) => {
      if (!this.h.canvas) throw Error("No OpenGL canvas configured.");
      n ? this.h._bindTextureToStream(n) : this.h._bindTextureToCanvas();
      const i = this.h.canvas.getContext("webgl2") || this.h.canvas.getContext("webgl");
      if (!i) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
      this.h.gpuOriginForWebTexturesIsBottomLeft && i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, !0), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, e), this.h.gpuOriginForWebTexturesIsBottomLeft && i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, !1);
      const [o, s] = e.videoWidth !== void 0 ? [e.videoWidth, e.videoHeight] : e.naturalWidth !== void 0 ? [e.naturalWidth, e.naturalHeight] : e.displayWidth !== void 0 ? [e.displayWidth, e.displayHeight] : [e.width, e.height];
      !this.l || o === this.h.canvas.width && s === this.h.canvas.height || (this.h.canvas.width = o, this.h.canvas.height = s);
      const [u, a] = [o, s];
      this.h._addBoundTextureToStream(n, u, a, r);
    });
  }
  addBoolToStream(e, t, r) {
    f(this, t, (n) => {
      this.h._addBoolToInputStream(e, n, r);
    });
  }
  addDoubleToStream(e, t, r) {
    f(this, t, (n) => {
      this.h._addDoubleToInputStream(e, n, r);
    });
  }
  addFloatToStream(e, t, r) {
    f(this, t, (n) => {
      this.h._addFloatToInputStream(e, n, r);
    });
  }
  addIntToStream(e, t, r) {
    f(this, t, (n) => {
      this.h._addIntToInputStream(e, n, r);
    });
  }
  addUintToStream(e, t, r) {
    f(this, t, (n) => {
      this.h._addUintToInputStream(e, n, r);
    });
  }
  addStringToStream(e, t, r) {
    f(this, t, (n) => {
      f(this, e, (i) => {
        this.h._addStringToInputStream(i, n, r);
      });
    });
  }
  addStringRecordToStream(e, t, r) {
    f(this, t, (n) => {
      ir(this, Object.keys(e), (i) => {
        ir(this, Object.values(e), (o) => {
          this.h._addFlatHashMapToInputStream(i, o, Object.keys(e).length, n, r);
        });
      });
    });
  }
  addProtoToStream(e, t, r, n) {
    f(this, r, (i) => {
      f(this, t, (o) => {
        const s = this.h._malloc(e.length);
        this.h.HEAPU8.set(e, s), this.h._addProtoToInputStream(s, e.length, o, i, n), this.h._free(s);
      });
    });
  }
  addEmptyPacketToStream(e, t) {
    f(this, e, (r) => {
      this.h._addEmptyPacketToInputStream(r, t);
    });
  }
  addBoolVectorToStream(e, t, r) {
    f(this, t, (n) => {
      const i = this.h._allocateBoolVector(e.length);
      if (!i) throw Error("Unable to allocate new bool vector on heap.");
      for (const o of e) this.h._addBoolVectorEntry(i, o);
      this.h._addBoolVectorToInputStream(i, n, r);
    });
  }
  addDoubleVectorToStream(e, t, r) {
    f(this, t, (n) => {
      const i = this.h._allocateDoubleVector(e.length);
      if (!i) throw Error("Unable to allocate new double vector on heap.");
      for (const o of e) this.h._addDoubleVectorEntry(i, o);
      this.h._addDoubleVectorToInputStream(i, n, r);
    });
  }
  addFloatVectorToStream(e, t, r) {
    f(this, t, (n) => {
      const i = this.h._allocateFloatVector(e.length);
      if (!i) throw Error("Unable to allocate new float vector on heap.");
      for (const o of e) this.h._addFloatVectorEntry(i, o);
      this.h._addFloatVectorToInputStream(i, n, r);
    });
  }
  addIntVectorToStream(e, t, r) {
    f(this, t, (n) => {
      const i = this.h._allocateIntVector(e.length);
      if (!i) throw Error("Unable to allocate new int vector on heap.");
      for (const o of e) this.h._addIntVectorEntry(i, o);
      this.h._addIntVectorToInputStream(i, n, r);
    });
  }
  addUintVectorToStream(e, t, r) {
    f(this, t, (n) => {
      const i = this.h._allocateUintVector(e.length);
      if (!i) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const o of e) this.h._addUintVectorEntry(i, o);
      this.h._addUintVectorToInputStream(i, n, r);
    });
  }
  addStringVectorToStream(e, t, r) {
    f(this, t, (n) => {
      const i = this.h._allocateStringVector(e.length);
      if (!i) throw Error("Unable to allocate new string vector on heap.");
      for (const o of e) f(this, o, (s) => {
        this.h._addStringVectorEntry(i, s);
      });
      this.h._addStringVectorToInputStream(i, n, r);
    });
  }
  addBoolToInputSidePacket(e, t) {
    f(this, t, (r) => {
      this.h._addBoolToInputSidePacket(e, r);
    });
  }
  addDoubleToInputSidePacket(e, t) {
    f(this, t, (r) => {
      this.h._addDoubleToInputSidePacket(e, r);
    });
  }
  addFloatToInputSidePacket(e, t) {
    f(this, t, (r) => {
      this.h._addFloatToInputSidePacket(e, r);
    });
  }
  addIntToInputSidePacket(e, t) {
    f(this, t, (r) => {
      this.h._addIntToInputSidePacket(e, r);
    });
  }
  addUintToInputSidePacket(e, t) {
    f(this, t, (r) => {
      this.h._addUintToInputSidePacket(e, r);
    });
  }
  addStringToInputSidePacket(e, t) {
    f(this, t, (r) => {
      f(this, e, (n) => {
        this.h._addStringToInputSidePacket(n, r);
      });
    });
  }
  addProtoToInputSidePacket(e, t, r) {
    f(this, r, (n) => {
      f(this, t, (i) => {
        const o = this.h._malloc(e.length);
        this.h.HEAPU8.set(e, o), this.h._addProtoToInputSidePacket(o, e.length, i, n), this.h._free(o);
      });
    });
  }
  addBoolVectorToInputSidePacket(e, t) {
    f(this, t, (r) => {
      const n = this.h._allocateBoolVector(e.length);
      if (!n) throw Error("Unable to allocate new bool vector on heap.");
      for (const i of e) this.h._addBoolVectorEntry(n, i);
      this.h._addBoolVectorToInputSidePacket(n, r);
    });
  }
  addDoubleVectorToInputSidePacket(e, t) {
    f(this, t, (r) => {
      const n = this.h._allocateDoubleVector(e.length);
      if (!n) throw Error("Unable to allocate new double vector on heap.");
      for (const i of e) this.h._addDoubleVectorEntry(n, i);
      this.h._addDoubleVectorToInputSidePacket(n, r);
    });
  }
  addFloatVectorToInputSidePacket(e, t) {
    f(this, t, (r) => {
      const n = this.h._allocateFloatVector(e.length);
      if (!n) throw Error("Unable to allocate new float vector on heap.");
      for (const i of e) this.h._addFloatVectorEntry(n, i);
      this.h._addFloatVectorToInputSidePacket(n, r);
    });
  }
  addIntVectorToInputSidePacket(e, t) {
    f(this, t, (r) => {
      const n = this.h._allocateIntVector(e.length);
      if (!n) throw Error("Unable to allocate new int vector on heap.");
      for (const i of e) this.h._addIntVectorEntry(n, i);
      this.h._addIntVectorToInputSidePacket(n, r);
    });
  }
  addUintVectorToInputSidePacket(e, t) {
    f(this, t, (r) => {
      const n = this.h._allocateUintVector(e.length);
      if (!n) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const i of e) this.h._addUintVectorEntry(n, i);
      this.h._addUintVectorToInputSidePacket(n, r);
    });
  }
  addStringVectorToInputSidePacket(e, t) {
    f(this, t, (r) => {
      const n = this.h._allocateStringVector(e.length);
      if (!n) throw Error("Unable to allocate new string vector on heap.");
      for (const i of e) f(this, i, (o) => {
        this.h._addStringVectorEntry(n, o);
      });
      this.h._addStringVectorToInputSidePacket(n, r);
    });
  }
  attachBoolListener(e, t) {
    H(this, e, t), f(this, e, (r) => {
      this.h._attachBoolListener(r);
    });
  }
  attachBoolVectorListener(e, t) {
    X(this, e, t), f(this, e, (r) => {
      this.h._attachBoolVectorListener(r);
    });
  }
  attachIntListener(e, t) {
    H(this, e, t), f(this, e, (r) => {
      this.h._attachIntListener(r);
    });
  }
  attachIntVectorListener(e, t) {
    X(this, e, t), f(this, e, (r) => {
      this.h._attachIntVectorListener(r);
    });
  }
  attachUintListener(e, t) {
    H(this, e, t), f(this, e, (r) => {
      this.h._attachUintListener(r);
    });
  }
  attachUintVectorListener(e, t) {
    X(this, e, t), f(this, e, (r) => {
      this.h._attachUintVectorListener(r);
    });
  }
  attachDoubleListener(e, t) {
    H(this, e, t), f(this, e, (r) => {
      this.h._attachDoubleListener(r);
    });
  }
  attachDoubleVectorListener(e, t) {
    X(this, e, t), f(this, e, (r) => {
      this.h._attachDoubleVectorListener(r);
    });
  }
  attachFloatListener(e, t) {
    H(this, e, t), f(this, e, (r) => {
      this.h._attachFloatListener(r);
    });
  }
  attachFloatVectorListener(e, t) {
    X(this, e, t), f(this, e, (r) => {
      this.h._attachFloatVectorListener(r);
    });
  }
  attachStringListener(e, t) {
    H(this, e, t), f(this, e, (r) => {
      this.h._attachStringListener(r);
    });
  }
  attachStringVectorListener(e, t) {
    X(this, e, t), f(this, e, (r) => {
      this.h._attachStringVectorListener(r);
    });
  }
  attachProtoListener(e, t, r) {
    H(this, e, t), f(this, e, (n) => {
      this.h._attachProtoListener(n, r || !1);
    });
  }
  attachProtoVectorListener(e, t, r) {
    X(this, e, t), f(this, e, (n) => {
      this.h._attachProtoVectorListener(n, r || !1);
    });
  }
  attachAudioListener(e, t, r) {
    this.h._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), H(this, e, (n, i) => {
      n = new Float32Array(n.buffer, n.byteOffset, n.length / 4), t(n, i);
    }), f(this, e, (n) => {
      this.h._attachAudioListener(n, r || !1);
    });
  }
  finishProcessing() {
    this.h._waitUntilIdle();
  }
  closeGraph() {
    this.h._closeGraph(), this.h.simpleListeners = void 0, this.h.emptyPacketListeners = void 0;
  }
}, class extends or {
  X() {
    this.h._registerModelResourcesGraphService();
  }
});
var or;
async function qn(e, t) {
  const r = await (async (n, i, o) => {
    var s = E;
    if (n && await nr(n), !self.ModuleFactory || i && (await nr(i), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
    return self.Module && o && ((n = self.Module).locateFile = o.locateFile, o.mainScriptUrlOrBlob && (n.mainScriptUrlOrBlob = o.mainScriptUrlOrBlob)), o = await self.ModuleFactory(self.Module || o), self.ModuleFactory = self.Module = void 0, new s(o, null);
  })(e.wasmLoaderPath, e.assetLoaderPath, { locateFile: (n) => n.endsWith(".wasm") ? e.wasmBinaryPath.toString() : e.assetBinaryPath && n.endsWith(".data") ? e.assetBinaryPath.toString() : n });
  return await r.K(t), r;
}
async function nt(e, t) {
  return qn(e, t);
}
function sr(e) {
  try {
    const t = e.H.length;
    if (t === 1) throw Error(e.H[0].message);
    if (t > 1) throw Error("Encountered multiple errors: " + e.H.map((r) => r.message).join(", "));
  } finally {
    e.H = [];
  }
}
function de(e, t) {
  e.G = Math.max(e.G, t);
}
var ht = class {
  constructor(e) {
    this.i = e, this.H = [], this.G = 0, this.i.setAutoRenderToScreen(!1);
  }
  setGraph(e, t) {
    this.i.attachErrorListener((r, n) => {
      this.H.push(Error(n));
    }), this.i.X(), this.i.setGraph(e, t), sr(this);
  }
  finishProcessing() {
    this.i.finishProcessing(), sr(this);
  }
  close() {
    this.i.closeGraph();
  }
};
ht.prototype.close = ht.prototype.close;
var ft = class extends w {
  constructor(e) {
    super(e);
  }
};
function ar(e, t) {
  J(e, 1, t);
}
var Yn = class extends w {
  constructor() {
    super();
  }
}, Jn = [0, z, g, ct, -1, ee];
function Xn(e, t, r, n) {
  if (e.data !== void 0) {
    var i = new Uint8Array(e.data.buffer, t, r);
    return n === 1 && function(o, s, u) {
      o.i.push([s, u]), o.i.sort((a, l) => a[0] - l[0]), s = 0;
      for (const [a, l] of o.i) {
        const c = l;
        (u = a) <= s && (s = Math.max(s, u + c));
      }
      s === o.length && (o.data = void 0);
    }(e, t, r), i;
  }
}
class Zr {
  constructor(t) {
    this.i = [], this.data = t, this.length = t.length;
  }
}
var it = class {
  constructor(e, t, r) {
    this.i = e, this.j = t, this.l = r;
  }
  get size() {
    let e = 0;
    for (let t = 0; t < this.i.length; t++) e += this.i[t].length;
    return e;
  }
};
function ur(e) {
  if (e.i) try {
    e.h._free(e.j);
  } catch {
  } finally {
    e.i = !1;
  }
}
var lr = class {
  constructor(e, t) {
    this.h = e, this.l = t, this.j = this.h._malloc(t) >>> 0, this.o = this.h.HEAPU8, this.i = !!this.j;
  }
  get offset() {
    if (!this.i) throw Error("WasmFileReference has been freed.");
    return this.j;
  }
  get size() {
    if (!this.i) throw Error("WasmFileReference has been freed.");
    return this.l;
  }
  set(e, t) {
    this.o.set(e, this.j + (t ?? 0));
  }
}, Qr = class extends w {
  constructor() {
    super();
  }
};
Qr.prototype.i = Ke([0, O, 2, U, g, S]);
var Zn = class extends w {
  constructor() {
    super();
  }
}, Qn = class extends w {
  constructor() {
    super();
  }
}, ei = class extends w {
  constructor() {
    super();
  }
}, en = class extends w {
  constructor() {
    super();
  }
}, cr = [0, g, -6, 1, g, 1, [0, S, z, -2], [0, S, ct], z, -2, [0, S, -1, z, ct, ge, ee], 1, S, g, ee, -1, [0, z, g], S, -1], tn = [0, [4, 6], cr, g, 1, Vn, U, qr, Yr, [0, O, -2], ee, [0, [0, g, -1, B, [0, g, [0, g, -1], -1, [0, z, -1], S], S, -2, g, -1], [0, g, -1, S], cr, S, g]], hr = [0, B, [0, O, Rn, -1, z], tn, g];
en.prototype.i = Ke([0, O, 8, [0, S, -6], 1, g, 1, g, hr, [0, g, S, -3], 1, z, O, tn, hr, g, 5, z, Me, 1, Jn]);
var ti = class extends w {
  constructor() {
    super();
  }
}, rn = class extends w {
  constructor() {
    super();
  }
}, Re = [2, 4];
rn.prototype.i = Ke([0, Re, g, qr, g, V, [0, 1, O]]);
const ri = /* @__PURE__ */ function(e) {
  return class nn extends e {
    static async Y(r, n) {
      let i;
      n ||= await nn.O();
      const o = [];
      for (const s of r?.requiredFeatures ?? []) n.features.has(s) ? o.push(s) : console.warn(`WebGPU feature ${s} is not supported.`);
      r = { ...r, requiredFeatures: o };
      try {
        i = await n.requestDevice(r);
      } catch (s) {
        throw console.error("Unable to initialize WebGPU with the requested features."), s;
      }
      return n = await n.requestAdapterInfo(), i.adapterInfo = n, i;
    }
    static async O(r) {
      if (!(r = await navigator.gpu.requestAdapter(r))) throw Error("Unable to request adapter from navigator.gpu; Ensure WebGPU is enabled.");
      return r;
    }
    V(r) {
      if (n) typeof HTMLCanvasElement < "u" && n instanceof HTMLCanvasElement && (n.id = "canvas_webgpu");
      else var n = new OffscreenCanvas(1, 1);
      n.getContext("webgpu").configure({ device: r, format: navigator.gpu.getPreferredCanvasFormat() }), this.h.preinitializedWebGPUDevice = r;
    }
    S() {
      return this.h.ccall("closeGraph", "void", [], [], { async: !0 });
    }
  };
}(/* @__PURE__ */ function(e) {
  return class extends e {
    addStreamingReaderToInputSidePacket(t, r) {
      this.h.addStreamingReaderToInputSidePacket((n, i, o) => async function(s, u, a, l, c) {
        if (c === 2) return s.i = [], s.j = () => Promise.resolve(void 0), setTimeout(() => {
          s.l();
        }, 0), Promise.resolve(0);
        for (; s.size < a + l; ) {
          var h = await s.j();
          if (h === void 0) break;
          s.i.push(new Zr(h));
        }
        if (s.size < a + l) throw Error(`Data size is too small: ${s.size}, expected at least ${a + l}.`);
        h = u._malloc(l) >>> 0;
        let d = 0;
        for (let p = 0; p < s.i.length; p++) {
          const _ = s.i[p];
          if (a >= _.length) {
            a -= _.length;
            continue;
          }
          const A = Math.min(l, _.length - a);
          if ((a = Xn(_, a, A, c)) === void 0) throw Error("Data has already been released.");
          if (u.HEAPU8.set(a, h + d), a = 0, d += A, (l -= A) == 0) break;
        }
        if (l !== 0) throw Error("Data not found.");
        return Promise.resolve(h);
      }(t, this.h, n, i, o), r);
    }
  };
}(/* @__PURE__ */ function(e) {
  return class extends e {
    R(t, r) {
      f(this, "lora_model_ref_in", (n) => {
        this.h._addRawDataSpanToInputStream(t.offset, t.size, n, r);
      });
    }
  };
}(class extends Kn {
})));
class dt extends ri {
}
var on = class {
  constructor(e) {
    this.j = e, this.i = fr, fr++;
  }
}, fr = 0;
class ni {
  constructor() {
    let t, r;
    this.promise = new Promise((n, i) => {
      t = n, r = i;
    }), this.resolve = t, this.reject = r;
  }
}
async function Pe() {
  const e = await dt.O({ powerPreference: "high-performance" });
  var t = e.limits.maxBufferSize;
  if (e.limits.maxStorageBufferBindingSize < 524550144) throw Error(`The WebGPU device is unable to execute LLM tasks, because the required maxStorageBufferBindingSize is at least 524550144 but your device only supports maxStorageBufferBindingSize of ${t}`);
  if (t >= 786825216) t = 786825216;
  else {
    if (!(t >= 524550144)) throw Error(`The WebGPU device is unable to execute LLM tasks, because the required maxBufferSize is at least 524550144 but your device only supports maxBufferSize of ${t}`);
    t = 524550144;
  }
  t = { requiredFeatures: ["shader-f16"], requiredLimits: { maxStorageBufferBindingSize: 524550144, maxBufferSize: t } };
  const r = e.features.has("chromium-experimental-subgroups"), n = e.features.has("subgroups");
  if (r || n) {
    console.warn("Experimental Chromium WGSL subgroup support detected. Enabling this feature in the inference engine.");
    const i = ["shader-f16"];
    n && (i.push("subgroups"), e.features.has("subgroups-f16") && i.push("subgroups-f16")), r && i.push("chromium-experimental-subgroups"), t.requiredFeatures = i;
  }
  return dt.Y(t, e);
}
function ii(e) {
  const t = function(n) {
    const i = new Jr();
    m(i, 10, "text_in"), m(i, 10, "token_cost_in"), m(i, 10, "lora_model_id_to_apply_in"), m(i, 10, "lora_model_ref_in"), m(i, 10, "lora_model_id_to_load_in"), m(i, 16, "streaming_reader"), m(i, 15, "text_out"), m(i, 15, "text_end"), m(i, 15, "token_cost_out");
    var o = new C();
    P(o, 2, "TokenizerInputBuildCalculator"), m(o, 3, "PROMPT:text_in"), m(o, 3, "LORA_ID:lora_model_id_to_apply_in"), m(o, 4, "prompt"), W(i, o), P(o = new C(), 2, "ModelDataCalculator"), m(o, 6, "MODEL_DATA:__side_packet_1"), m(o, 6, "MODEL_TYPE:model_type"), m(o, 5, "READ_DATA_FN:streaming_reader"), m(o, 3, "LORA_MODEL_SPAN:lora_model_ref_in"), m(o, 3, "LORA_MODEL_ID:lora_model_id_to_load_in"), m(o, 4, "LORA_DATA:lora_model_data"), W(i, o), P(o = new C(), 2, "Gpt2UnicodeMappingCalculator"), m(o, 5, "MODEL_TYPE:model_type"), m(o, 6, "BYTES_TO_UNICODE_MAPPING:tokenizer_mapping"), W(i, o), P(o = new re(), 1, "type.googleapis.com/odml.infra.proto.TokenizerCalculatorOptions");
    var s, u = new rn(), a = Q(n.j, 2);
    D(u, 1, a), P(a = new ti(), 2, "spm_vocab_model"), a == null && (a = void 0);
    e: {
      var l = u.m, c = k(l);
      if (ae(c), a == null) {
        var h = Ct(l);
        if (Gt(h, l, c) !== 4) break e;
        h.set(Re, 0);
      } else {
        var d = Ct(h = l), p = Gt(d, h, c);
        p !== 4 && (p && (c = T(h, c, p)), d.set(Re, 4));
      }
      T(l, c, 4, a);
    }
    if (D(u, 3, 2), rt(o, u.i()), P(u = new C(), 2, "TokenizerCalculator"), me(u, 8, re, o), m(u, 5, "MODEL_DATA:__side_packet_1"), m(u, 3, "PROMPT_AND_INPUT_OPTIONS:prompt"), m(u, 5, "BYTES_TO_UNICODE_MAPPING:tokenizer_mapping"), m(u, 6, "PROCESSOR_GETTER:__input_side_1"), m(u, 4, "IDS_AND_INPUT_OPTIONS:__stream_0"), W(i, u), P(o = new re(), 1, "type.googleapis.com/odml.infra.proto.LlmGpuCalculatorOptions"), D(u = new en(), 12, 3), P(u, 1, "llm.tflite"), D(u, 14, 0), a = Q(n.j, 5), D(u, 22, a), a = ut(n.j, ft, 3), J(u, 31, a), F(a = new Zn(), 1, !0, !1), F(a, 2, !0, !1), F(a, 5, !0, !1), J(u, 10, a), p = n.j, l = Sn === void 0 ? 2 : 5, h = p.m, a = k(h), d = 2 & a ? 1 : l, l = Vr(h, a, 4), c = L(l), Mr(p, c, void 0)) {
      (4 & c || Object.isFrozen(l)) && (l = $(l), c = te(c, a), a = T(h, a, 4, l));
      let _ = p = 0;
      for (; p < l.length; p++) {
        const A = ue(l[p]);
        A != null && (l[_++] = A);
      }
      _ < p && (l.length = _), c = -4097 & (20 | (c = Cr(c, a))), v(l, c &= -8193), 2 & c && Object.freeze(l);
    }
    return d === 1 || d === 4 && 32 & c ? G(c) || (a = c, (c |= 2) !== a && v(l, c), Object.freeze(l)) : (p = d === 5 && (!!(32 & c) || G(c) || !!Ue?.get(l)), (d === 2 || p) && G(c) && (l = $(l), c = oe(c = te(c, a), a, !1), v(l, c), a = T(h, a, 4, l)), G(c) || (h = c, (c = oe(c, a, !1)) !== h && v(l, c)), p && (s = kr(l))), Gr(u, 29, s || l), s = new ei(), D(a = new Qn(), 1, 1), l = Q(n.j, 2), D(a, 2, l), J(s, 1, a), J(u, 20, s), rt(o, u.i()), P(s = new C(), 2, "LlmGpuCalculator"), me(s, 8, re, o), m(s, 3, "IDS_AND_INPUT_OPTIONS:__stream_0"), m(s, 3, "FINISH:finish"), m(s, 3, "LORA_DATA:lora_model_data"), m(s, 5, "MODEL_DATA:__side_packet_1"), m(s, 4, "DECODED_IDS:__stream_3"), m(s, 4, "OUTPUT_END:__stream_4"), P(o = new Zt(), 1, "FINISH"), F(o, 2, !0, !1), me(s, 13, Zt, o), W(i, s), P(s = new C(), 2, "IsPacketPresentCalculator"), m(s, 3, "__stream_4"), m(s, 4, "text_end"), W(i, s), P(s = new re(), 1, "type.googleapis.com/odml.infra.proto.DetokenizerCalculatorOptions"), o = new Qr(), n = Q(n.j, 5), D(o, 5, n), m(o, 4, "<eos>"), m(o, 4, "<|endoftext|>"), rt(s, o.i()), P(n = new C(), 2, "DetokenizerCalculator"), me(n, 8, re, s), m(n, 3, "IDS_AND_INPUT_OPTIONS:__stream_3"), m(n, 5, "PROCESSOR_GETTER:__input_side_1"), m(n, 5, "BYTES_TO_UNICODE_MAPPING:tokenizer_mapping"), m(n, 5, "MODEL_DATA:__side_packet_1"), m(n, 4, "FINISH_AND_INPUT_OPTIONS:finish"), m(n, 4, "WORDS:text_out"), W(i, n), P(n = new C(), 2, "TokenCostCalculator"), m(n, 3, "PROMPT:token_cost_in"), m(n, 5, "PROCESSOR_GETTER:__input_side_1"), m(n, 5, "BYTES_TO_UNICODE_MAPPING:tokenizer_mapping"), m(n, 4, "NUM_TOKENS:token_cost_out"), W(i, n), i;
  }(e);
  e.i.attachStringVectorListener("text_out", (n, i) => {
    n = function(o, s) {
      return o == null || o.length === 0 ? [] : o.map((u) => (u = (u = u.replaceAll("▁", " ")).replaceAll("<0x0A>", `
`), s && (u = u.trimStart()), u.split("\\[eod\\]", 1)[0]));
    }(n, e.D.length === 0), n.forEach((o, s) => {
      e.D[s].push(o);
    }), e.v && e.A.length === 0 && (e.F ? e.v(n, !1) : e.v(n[0], !1)), de(e, i);
  }), e.i.attachEmptyPacketListener("text_out", (n) => {
    de(e, n);
  }), e.i.attachBoolListener("text_end", (n, i) => {
    if (e.l = !1, de(e, i), pt(e), e.o && (e.o.resolve(e.D.map((o) => o.join(""))), e.o = void 0), e.v) if (e.F) {
      for (n = [], i = 0; i < Q(e.j, 5); i++) n.push("");
      e.v(n, !0);
    } else e.v("", !0);
    e.F = void 0;
  }), e.i.attachEmptyPacketListener("text_end", (n) => {
    e.l = !1, e.F = void 0, de(e, n), pt(e), e.o && (e.o.resolve(e.D.map((i) => i.join(""))), e.o = void 0);
  }), e.i.attachIntListener("token_cost_out", (n, i) => {
    e.N = n, de(e, i);
  }), e.J && e.i.addStreamingReaderToInputSidePacket(e.J, "streaming_reader");
  const r = t.i();
  return e.u?.removeEventListener("uncapturederror", e.I), e.i.S().then(() => {
    e.u?.addEventListener("uncapturederror", e.I), e.A.length = 0, e.setGraph(new Uint8Array(r), !0), e.finishProcessing();
  });
}
function pt(e) {
  if (e.A.length > 0) {
    const t = [...e.A];
    if (e.A.length = 0, !e.o) throw t;
    e.o.reject(t), e.o = void 0;
  }
}
function dr(e, t, r, n) {
  if (e.l) throw Error("Previous invocation or loading is still ongoing.");
  for (e.v = typeof r == "function" ? r : n, e.l = !0, e.D.length = 0, n = 0; n < Q(e.j, 5); n++) e.D[n] = [];
  if (n = e.G + 1, e.i.addStringToStream(t, "text_in", n), r instanceof on) {
    if (r.j !== e) throw e.l = !1, e.F = void 0, Error("The LoRA model was not loaded by this LLM Inference task.");
    e.i.addUintToStream(r.i, "lora_model_id_to_apply_in", n);
  } else e.i.addEmptyPacketToStream("lora_model_id_to_apply_in", n);
  return e.finishProcessing(), e.o = new ni(), e.o.promise;
}
var E = class extends ht {
  constructor(e, t) {
    if (super(new dt(e, t)), this.D = [], this.l = !1, this.A = [], this.I = (r) => {
      const n = (r = r.error).message.match(/exceeds the max buffer size limit \(([0-9]+)\)\./);
      n && Number(n[1]) > 524550144 ? r = Error(`Failed to run this LLM model, but you could try a smaller LLM model. WebGPU throws: "${r.message}"`) : r.message.match(/is larger than the maximum binding size/) && (r = Error(`Failed to run LLM inference, the supported max binding size is smaller than the required size. WebGPU throws: "${r.message}"`)), this.A.push(r);
    }, this.j = new Yn(), ar(this.j, new rr()), this.s = new ft(), J(this.j, 3, this.s), K(this.j, 2, Ee(512)), e = this.s, !Number.isFinite(2)) throw we("enum");
    F(e, 1, 2, 0), D(this.s, 2, 40), F(this.s, 3, Qe(1), 0), K(this.s, 5, at(0)), F(this.s, 4, Qe(0.8), 0), K(this.j, 5, Ee(1));
  }
  K(e) {
    if (this.l) throw Error("Cannot set options while loading or processing.");
    if (this.l = !0, e.baseOptions?.gpuOptions?.device && (this.u && this.u.removeEventListener("uncapturederror", this.I), this.u = e.baseOptions.gpuOptions.device, this.i.V(this.u), this.u.addEventListener("uncapturederror", this.I)), "maxTokens" in e && K(this.j, 2, Ee(e.maxTokens ?? 512)), "topK" in e && D(this.s, 2, e.topK ?? 40), "temperature" in e && F(this.s, 4, Qe(e.temperature ?? 0.8), 0), "randomSeed" in e && K(this.s, 5, at(e.randomSeed ?? 0)), "loraRanks" in e && function(i, o) {
      Gr(i, 4, o);
    }(this.j, e.loraRanks ?? []), "numResponses" in e) {
      var t = e.numResponses ?? 1;
      if (t < 1) throw Error("'numResponses' must be at least 1.");
      K(this.j, 5, Ee(t));
      var r = ut(this.j, ft, 3);
      t > 1 && r && (lt(ue(Rr(r, 2))) <= 1 || lt(function(i) {
        i = i.m;
        let o = k(i);
        const s = le(i, o, 4), u = Tr(s);
        return u != null && u !== s && T(i, o, 4, u), u;
      }(r)) <= 0) && console.warn("To generate multiple responses, it is expected topK > 1 and temperature > 0; otherwise, all the generated responses may be the same.");
    }
    let n;
    if (t = new Promise((i) => {
      n = i;
    }), e.baseOptions?.modelAssetPath || e.baseOptions?.modelAssetBuffer) {
      if (e.baseOptions.modelAssetPath && e.baseOptions.modelAssetBuffer) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
      r = !1, e.baseOptions.modelAssetPath ? this.J = function(i, o) {
        const s = fetch(i.toString()).then((u) => u?.body?.getReader());
        return new it([], async () => {
          let u;
          try {
            u = await s;
          } catch (c) {
            throw Error(`Error loading model from "${i.toString()}": ${c}`);
          }
          const { value: a, done: l } = await u.read();
          return l ? void 0 : a;
        }, o);
      }(e.baseOptions.modelAssetPath, n) : e.baseOptions.modelAssetBuffer instanceof Uint8Array ? (this.J = function(i, o) {
        return new it([new Zr(i)], () => Promise.resolve(void 0), o);
      }(e.baseOptions.modelAssetBuffer, n), r = !0) : e.baseOptions.modelAssetBuffer ? (this.J = function(i, o) {
        return new it([], async () => {
          const { value: s, done: u } = await i.read();
          return u ? void 0 : s;
        }, o);
      }(e.baseOptions.modelAssetBuffer, n), r = !0) : n(), r && (e.baseOptions.modelAssetBuffer = void 0);
    }
    return e = ii(this).then(() => {
    }), Promise.all([t, e]).then(() => {
      this.l = !1, pt(this);
    });
  }
  get baseOptions() {
    return ut(this.j, rr, 1);
  }
  set baseOptions(e) {
    ar(this.j, e);
  }
  T(e, t, r) {
    return Q(this.j, 5) > 1 && console.warn("'numResponses' is set larger than 1 and this function only returns the first response, so we recommend either using 'generateResponses()' to obtain multiple responses, or else setting 'numResponses' to 1 for better performance."), this.F = !1, dr(this, e, t, r).then((n) => n[0]);
  }
  U(e, t, r) {
    return this.F = !0, dr(this, e, t, r);
  }
  Z(e) {
    if (this.l) throw Error("Previous invocation or loading is still ongoing.");
    return this.l = !0, this.N = void 0, this.i.addStringToStream(e, "token_cost_in", this.G + 1), this.finishProcessing(), this.l = !1, this.N;
  }
  async W(e) {
    if (this.l) throw Error("Cannot load LoRA model while loading or processing.");
    if (this.l = !0, e instanceof Uint8Array) {
      var t = new lr(this.i.h, e.length);
      t.set(e), e = t;
    } else e = await async function(r, n) {
      var i = await fetch(n.toString());
      n = Number(i.headers.get("content-length")), r = new lr(r, n);
      let o = 0;
      for (i = i?.body?.getReader(); ; ) {
        const { value: s, done: u } = await i.read();
        if (u) break;
        r.set(s, o), o += s.byteLength;
      }
      if (n !== o) throw ur(r), Error(`File could not be fully loaded to memory, so was not retained. Loaded ${o}/${n} bytes before failure`);
      return r;
    }(this.i.h, e);
    return t = new on(this), this.i.R(e, this.G + 1), this.i.addUintToStream(t.i, "lora_model_id_to_load_in", this.G + 1), this.finishProcessing(), ur(e), this.l = !1, t;
  }
  close() {
    this.u?.removeEventListener("uncapturederror", this.I), super.close();
  }
};
E.prototype.loadLoraModel = E.prototype.W, E.prototype.sizeInTokens = E.prototype.Z, E.prototype.generateResponses = E.prototype.U, E.prototype.generateResponse = E.prototype.T, E.prototype.setOptions = E.prototype.K, E.createWebGpuDevice = Pe, E.createFromModelPath = async function(e, t) {
  return nt(e, t = { baseOptions: { gpuOptions: { device: await Pe() }, modelAssetPath: t } });
}, E.createFromModelBuffer = async function(e, t) {
  return nt(e, t = { baseOptions: { gpuOptions: { device: await Pe() }, modelAssetBuffer: t } });
}, E.createFromOptions = async function(e, t) {
  if (!t.baseOptions?.gpuOptions?.device) {
    const r = await Pe();
    t.baseOptions = t.baseOptions ?? {}, t.baseOptions.gpuOptions = t?.baseOptions?.gpuOptions ?? {}, t.baseOptions.gpuOptions.device = r;
  }
  return nt(e, t);
};
const It = (() => {
  if (typeof self > "u") return !1;
  if ("top" in self && self !== top) try {
    top.window.document._ = 0;
  } catch {
    return !1;
  }
  return "showOpenFilePicker" in self;
})(), oi = It ? Promise.resolve().then(function() {
  return li;
}) : Promise.resolve().then(function() {
  return mi;
});
async function si(...e) {
  return (await oi).default(...e);
}
It ? Promise.resolve().then(function() {
  return hi;
}) : Promise.resolve().then(function() {
  return _i;
});
It ? Promise.resolve().then(function() {
  return di;
}) : Promise.resolve().then(function() {
  return vi;
});
const ai = async (e) => {
  const t = await e.getFile();
  return t.handle = e, t;
};
var ui = async (e = [{}]) => {
  Array.isArray(e) || (e = [e]);
  const t = [];
  e.forEach((i, o) => {
    t[o] = { description: i.description || "Files", accept: {} }, i.mimeTypes ? i.mimeTypes.map((s) => {
      t[o].accept[s] = i.extensions || [];
    }) : t[o].accept["*/*"] = i.extensions || [];
  });
  const r = await window.showOpenFilePicker({ id: e[0].id, startIn: e[0].startIn, types: t, multiple: e[0].multiple || !1, excludeAcceptAllOption: e[0].excludeAcceptAllOption || !1 }), n = await Promise.all(r.map(ai));
  return e[0].multiple ? n : n[0];
}, li = { __proto__: null, default: ui };
function Ie(e) {
  function t(r) {
    if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object."));
    var n = r.done;
    return Promise.resolve(r.value).then(function(i) {
      return { value: i, done: n };
    });
  }
  return Ie = function(r) {
    this.s = r, this.n = r.next;
  }, Ie.prototype = { s: null, n: null, next: function() {
    return t(this.n.apply(this.s, arguments));
  }, return: function(r) {
    var n = this.s.return;
    return n === void 0 ? Promise.resolve({ value: r, done: !0 }) : t(n.apply(this.s, arguments));
  }, throw: function(r) {
    var n = this.s.return;
    return n === void 0 ? Promise.reject(r) : t(n.apply(this.s, arguments));
  } }, new Ie(e);
}
const sn = async (e, t, r = e.name, n) => {
  const i = [], o = [];
  var s, u = !1, a = !1;
  try {
    for (var l, c = function(h) {
      var d, p, _, A = 2;
      for (typeof Symbol < "u" && (p = Symbol.asyncIterator, _ = Symbol.iterator); A--; ) {
        if (p && (d = h[p]) != null) return d.call(h);
        if (_ && (d = h[_]) != null) return new Ie(d.call(h));
        p = "@@asyncIterator", _ = "@@iterator";
      }
      throw new TypeError("Object is not async iterable");
    }(e.values()); u = !(l = await c.next()).done; u = !1) {
      const h = l.value, d = `${r}/${h.name}`;
      h.kind === "file" ? o.push(h.getFile().then((p) => (p.directoryHandle = e, p.handle = h, Object.defineProperty(p, "webkitRelativePath", { configurable: !0, enumerable: !0, get: () => d })))) : h.kind !== "directory" || !t || n && n(h) || i.push(sn(h, t, d, n));
    }
  } catch (h) {
    a = !0, s = h;
  } finally {
    try {
      u && c.return != null && await c.return();
    } finally {
      if (a) throw s;
    }
  }
  return [...(await Promise.all(i)).flat(), ...await Promise.all(o)];
};
var ci = async (e = {}) => {
  e.recursive = e.recursive || !1, e.mode = e.mode || "read";
  const t = await window.showDirectoryPicker({ id: e.id, startIn: e.startIn, mode: e.mode });
  return (await (await t.values()).next()).done ? [t] : sn(t, e.recursive, void 0, e.skipDirectory);
}, hi = { __proto__: null, default: ci }, fi = async (e, t = [{}], r = null, n = !1, i = null) => {
  Array.isArray(t) || (t = [t]), t[0].fileName = t[0].fileName || "Untitled";
  const o = [];
  let s = null;
  if (e instanceof Blob && e.type ? s = e.type : e.headers && e.headers.get("content-type") && (s = e.headers.get("content-type")), t.forEach((l, c) => {
    o[c] = { description: l.description || "Files", accept: {} }, l.mimeTypes ? (c === 0 && s && l.mimeTypes.push(s), l.mimeTypes.map((h) => {
      o[c].accept[h] = l.extensions || [];
    })) : s ? o[c].accept[s] = l.extensions || [] : o[c].accept["*/*"] = l.extensions || [];
  }), r) try {
    await r.getFile();
  } catch (l) {
    if (r = null, n) throw l;
  }
  const u = r || await window.showSaveFilePicker({ suggestedName: t[0].fileName, id: t[0].id, startIn: t[0].startIn, types: o, excludeAcceptAllOption: t[0].excludeAcceptAllOption || !1 });
  !r && i && i(u);
  const a = await u.createWritable();
  return "stream" in e ? (await e.stream().pipeTo(a), u) : "body" in e ? (await e.body.pipeTo(a), u) : (await a.write(await e), await a.close(), u);
}, di = { __proto__: null, default: fi }, pi = async (e = [{}]) => (Array.isArray(e) || (e = [e]), new Promise((t, r) => {
  const n = document.createElement("input");
  n.type = "file";
  const i = [...e.map((a) => a.mimeTypes || []), ...e.map((a) => a.extensions || [])].join();
  n.multiple = e[0].multiple || !1, n.accept = i || "", n.style.display = "none", document.body.append(n);
  const o = (a) => {
    typeof s == "function" && s(), t(a);
  }, s = e[0].legacySetup && e[0].legacySetup(o, () => s(r), n), u = () => {
    window.removeEventListener("focus", u), n.remove();
  };
  n.addEventListener("click", () => {
    window.addEventListener("focus", u);
  }), n.addEventListener("change", () => {
    window.removeEventListener("focus", u), n.remove(), o(n.multiple ? Array.from(n.files) : n.files[0]);
  }), "showPicker" in HTMLInputElement.prototype ? n.showPicker() : n.click();
})), mi = { __proto__: null, default: pi }, gi = async (e = [{}]) => (Array.isArray(e) || (e = [e]), e[0].recursive = e[0].recursive || !1, new Promise((t, r) => {
  const n = document.createElement("input");
  n.type = "file", n.webkitdirectory = !0;
  const i = (s) => {
    typeof o == "function" && o(), t(s);
  }, o = e[0].legacySetup && e[0].legacySetup(i, () => o(r), n);
  n.addEventListener("change", () => {
    let s = Array.from(n.files);
    e[0].recursive ? e[0].recursive && e[0].skipDirectory && (s = s.filter((u) => u.webkitRelativePath.split("/").every((a) => !e[0].skipDirectory({ name: a, kind: "directory" })))) : s = s.filter((u) => u.webkitRelativePath.split("/").length === 2), i(s);
  }), "showPicker" in HTMLInputElement.prototype ? n.showPicker() : n.click();
})), _i = { __proto__: null, default: gi }, yi = async (e, t = {}) => {
  Array.isArray(t) && (t = t[0]);
  const r = document.createElement("a");
  let n = e;
  "body" in e && (n = await async function(s, u) {
    const a = s.getReader(), l = new ReadableStream({ start: (d) => async function p() {
      return a.read().then(({ done: _, value: A }) => {
        if (!_) return d.enqueue(A), p();
        d.close();
      });
    }() }), c = new Response(l), h = await c.blob();
    return a.releaseLock(), new Blob([h], { type: u });
  }(e.body, e.headers.get("content-type"))), r.download = t.fileName || "Untitled", r.href = URL.createObjectURL(await n);
  const i = () => {
    typeof o == "function" && o();
  }, o = t.legacySetup && t.legacySetup(i, () => o(), r);
  return r.addEventListener("click", () => {
    setTimeout(() => URL.revokeObjectURL(r.href), 3e4), i();
  }), r.click(), null;
}, vi = { __proto__: null, default: yi };
let an, un, ln, pr = 0, mr = 0;
const bi = async (e) => {
  pr === e.temperature && mr === e.topK || (pr = e.temperature, mr = e.topK, ln = await E.createFromOptions(un, {
    baseOptions: {
      modelAssetPath: an
    },
    topK: e.topK,
    temperature: e.temperature,
    randomSeed: Math.round(Math.random() * 1e3)
  }));
}, Ve = async () => {
  document.removeEventListener("click", Ve, { once: !0 }), document.removeEventListener("keydown", Ve, { once: !0 });
  const e = await si({
    extensions: [".bin"],
    mimeTypes: ["application/octet-stream"],
    description: "LLM model files"
  });
  an = URL.createObjectURL(e), un = await Z.forGenAiTasks("/mediapipe");
};
document.addEventListener("click", Ve, { once: !0 });
document.addEventListener("keydown", Ve, { once: !0 });
const wi = (e, t, r) => {
  const n = new AbortController(), i = t?.signal;
  i && i.addEventListener("abort", () => n.abort());
  let o = t?.history?.map((a) => {
    if (a.role === "system") {
      t.systemPrompt = `<start_of_turn>system
${a.content}<end_of_turn>`;
      return;
    }
    return `<start_of_turn>${a.role === "user" ? "user" : "model"}
${a.content}<end_of_turn>`;
  }) || [];
  o.length || o.push(`<start_of_turn>system
You are a helpful assistant<end_of_turn>`);
  let s = 0, u = "";
  return new ReadableStream({
    async start(a) {
      await bi(t), o.push(`<start_of_turn>user
${e}<end_of_turn>`), ln.generateResponse(
        o.join(`
`),
        (l, c) => {
          u += l, a.enqueue(l), c && (r({
            tokens: s,
            prompt: e,
            answer: u
          }), a.close());
        }
      );
    },
    cancel() {
      n.abort();
    }
  });
};
export {
  wi as default
};
