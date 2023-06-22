var j = Object.defineProperty;
var x = (t, e, r) => e in t ? j(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var b = (t, e, r) => (x(t, typeof e != "symbol" ? e + "" : e, r), r);
const C = {
  stringify: (t) => t,
  parse: (t) => t
}, T = {
  stringify: (t) => `${t}`,
  parse: (t) => parseFloat(t)
}, V = {
  stringify: (t) => t ? "true" : "false",
  parse: (t) => /^[ty1-9]/i.test(t)
}, N = {
  stringify: (t) => t.name,
  parse: (t, e) => {
    const r = (() => {
      if (typeof window < "u" && t in window)
        return window[t];
      if (typeof global < "u" && t in global)
        return global[t];
    })();
    return typeof r == "function" ? r.bind(e) : void 0;
  }
}, P = {
  stringify: (t) => JSON.stringify(t),
  parse: (t) => JSON.parse(t)
}, w = {
  string: C,
  number: T,
  boolean: V,
  function: N,
  json: P
}, A = Symbol.for("r2wc.render"), h = Symbol.for("r2wc.connected"), p = Symbol.for("r2wc.context"), i = Symbol.for("r2wc.props");
function z(t, e, r) {
  var $, k, O;
  e.props || (e.props = t.propTypes ? Object.keys(t.propTypes) : []);
  const d = (Array.isArray(e.props) ? e.props.slice() : Object.keys(e.props)).filter((s) => s !== "container"), f = {}, g = {}, m = {};
  for (const s of d) {
    f[s] = Array.isArray(e.props) ? "string" : e.props[s];
    const u = J(s);
    g[s] = u, m[u] = s;
  }
  class S extends HTMLElement {
    constructor() {
      super();
      b(this, $, !0);
      b(this, k);
      b(this, O, {});
      b(this, "container");
      e.shadow ? this.container = this.attachShadow({
        mode: e.shadow
      }) : this.container = this, this[i].container = this.container;
      for (const c of d) {
        const l = g[c], n = this.getAttribute(l), o = f[c], a = w[o];
        n && (a != null && a.parse) && (this[i][c] = a.parse(n, this));
      }
    }
    static get observedAttributes() {
      return Object.keys(m);
    }
    connectedCallback() {
      this[h] = !0, this[A]();
    }
    disconnectedCallback() {
      this[h] = !1, this[p] && r.unmount(this[p]), delete this[p];
      delete this[p];
    }
    attributeChangedCallback(c, l, n) {
      const o = m[c], a = f[o], y = w[a];
      o in f && (y != null && y.parse) && (this[i][o] = y.parse(n, this), this[A]());
    }
    [($ = h, k = p, O = i, A)]() {
      this[h] && (this[p] ? r.update(this[p], this[i]) : this[p] = r.mount(
        this.container,
        t,
        this[i]
      ));
    }
  }
  for (const s of d) {
    const u = g[s], c = f[s];
    Object.defineProperty(S.prototype, s, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[i][s];
      },
      set(l) {
        this[i][s] = l;
        const n = w[c];
        if (n != null && n.stringify) {
          const o = n.stringify(l);
          this.getAttribute(u) !== o && this.setAttribute(u, o);
        }
      }
    });
  }
  return S;
}
function J(t = "") {
  return t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
export {
  z as default
};
