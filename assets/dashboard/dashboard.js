function Ec(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var cs = { exports: {} }, sl = {}, fs = { exports: {} }, R = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qn = Symbol.for("react.element"), _c = Symbol.for("react.portal"), Pc = Symbol.for("react.fragment"), Tc = Symbol.for("react.strict_mode"), zc = Symbol.for("react.profiler"), Lc = Symbol.for("react.provider"), Rc = Symbol.for("react.context"), Mc = Symbol.for("react.forward_ref"), Oc = Symbol.for("react.suspense"), Dc = Symbol.for("react.memo"), Fc = Symbol.for("react.lazy"), Ko = Symbol.iterator;
function Ic(e) {
  return e === null || typeof e != "object" ? null : (e = Ko && e[Ko] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ds = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ps = Object.assign, ms = {};
function an(e, t, n) {
  this.props = e, this.context = t, this.refs = ms, this.updater = n || ds;
}
an.prototype.isReactComponent = {};
an.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
an.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function hs() {
}
hs.prototype = an.prototype;
function qi(e, t, n) {
  this.props = e, this.context = t, this.refs = ms, this.updater = n || ds;
}
var Ji = qi.prototype = new hs();
Ji.constructor = qi;
ps(Ji, an.prototype);
Ji.isPureReactComponent = !0;
var Yo = Array.isArray, vs = Object.prototype.hasOwnProperty, bi = { current: null }, gs = { key: !0, ref: !0, __self: !0, __source: !0 };
function ys(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null)
    for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t)
      vs.call(t, r) && !gs.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1)
    l.children = n;
  else if (1 < u) {
    for (var s = Array(u), c = 0; c < u; c++)
      s[c] = arguments[c + 2];
    l.children = s;
  }
  if (e && e.defaultProps)
    for (r in u = e.defaultProps, u)
      l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: qn, type: e, key: i, ref: o, props: l, _owner: bi.current };
}
function Uc(e, t) {
  return { $$typeof: qn, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function eo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === qn;
}
function Ac(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Go = /\/+/g;
function _l(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Ac("" + e.key) : t.toString(36);
}
function Nr(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null)
    o = !0;
  else
    switch (i) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case qn:
          case _c:
            o = !0;
        }
    }
  if (o)
    return o = e, l = l(o), e = r === "" ? "." + _l(o, 0) : r, Yo(l) ? (n = "", e != null && (n = e.replace(Go, "$&/") + "/"), Nr(l, t, n, "", function(c) {
      return c;
    })) : l != null && (eo(l) && (l = Uc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Go, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", Yo(e))
    for (var u = 0; u < e.length; u++) {
      i = e[u];
      var s = r + _l(i, u);
      o += Nr(i, t, n, s, l);
    }
  else if (s = Ic(e), typeof s == "function")
    for (e = s.call(e), u = 0; !(i = e.next()).done; )
      i = i.value, s = r + _l(i, u++), o += Nr(i, t, n, s, l);
  else if (i === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function ir(e, t, n) {
  if (e == null)
    return e;
  var r = [], l = 0;
  return Nr(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function $c(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1)
    return e._result.default;
  throw e._result;
}
var ae = { current: null }, jr = { transition: null }, Bc = { ReactCurrentDispatcher: ae, ReactCurrentBatchConfig: jr, ReactCurrentOwner: bi };
R.Children = { map: ir, forEach: function(e, t, n) {
  ir(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return ir(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return ir(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!eo(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
R.Component = an;
R.Fragment = Pc;
R.Profiler = zc;
R.PureComponent = qi;
R.StrictMode = Tc;
R.Suspense = Oc;
R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bc;
R.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ps({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = bi.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps)
      var u = e.type.defaultProps;
    for (s in t)
      vs.call(t, s) && !gs.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1)
    r.children = n;
  else if (1 < s) {
    u = Array(s);
    for (var c = 0; c < s; c++)
      u[c] = arguments[c + 2];
    r.children = u;
  }
  return { $$typeof: qn, type: e.type, key: l, ref: i, props: r, _owner: o };
};
R.createContext = function(e) {
  return e = { $$typeof: Rc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Lc, _context: e }, e.Consumer = e;
};
R.createElement = ys;
R.createFactory = function(e) {
  var t = ys.bind(null, e);
  return t.type = e, t;
};
R.createRef = function() {
  return { current: null };
};
R.forwardRef = function(e) {
  return { $$typeof: Mc, render: e };
};
R.isValidElement = eo;
R.lazy = function(e) {
  return { $$typeof: Fc, _payload: { _status: -1, _result: e }, _init: $c };
};
R.memo = function(e, t) {
  return { $$typeof: Dc, type: e, compare: t === void 0 ? null : t };
};
R.startTransition = function(e) {
  var t = jr.transition;
  jr.transition = {};
  try {
    e();
  } finally {
    jr.transition = t;
  }
};
R.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
R.useCallback = function(e, t) {
  return ae.current.useCallback(e, t);
};
R.useContext = function(e) {
  return ae.current.useContext(e);
};
R.useDebugValue = function() {
};
R.useDeferredValue = function(e) {
  return ae.current.useDeferredValue(e);
};
R.useEffect = function(e, t) {
  return ae.current.useEffect(e, t);
};
R.useId = function() {
  return ae.current.useId();
};
R.useImperativeHandle = function(e, t, n) {
  return ae.current.useImperativeHandle(e, t, n);
};
R.useInsertionEffect = function(e, t) {
  return ae.current.useInsertionEffect(e, t);
};
R.useLayoutEffect = function(e, t) {
  return ae.current.useLayoutEffect(e, t);
};
R.useMemo = function(e, t) {
  return ae.current.useMemo(e, t);
};
R.useReducer = function(e, t, n) {
  return ae.current.useReducer(e, t, n);
};
R.useRef = function(e) {
  return ae.current.useRef(e);
};
R.useState = function(e) {
  return ae.current.useState(e);
};
R.useSyncExternalStore = function(e, t, n) {
  return ae.current.useSyncExternalStore(e, t, n);
};
R.useTransition = function() {
  return ae.current.useTransition();
};
R.version = "18.2.0";
fs.exports = R;
var U = fs.exports;
const ws = /* @__PURE__ */ Ec(U);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vc = U, Hc = Symbol.for("react.element"), Qc = Symbol.for("react.fragment"), Wc = Object.prototype.hasOwnProperty, Kc = Vc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Yc = { key: !0, ref: !0, __self: !0, __source: !0 };
function xs(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t)
    Wc.call(t, r) && !Yc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t)
      l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Hc, type: e, key: i, ref: o, props: l, _owner: Kc.current };
}
sl.Fragment = Qc;
sl.jsx = xs;
sl.jsxs = xs;
cs.exports = sl;
var a = cs.exports, Dr = {}, Ss = { exports: {} }, xe = {}, ks = { exports: {} }, Ns = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(C, z) {
    var L = C.length;
    C.push(z);
    e:
      for (; 0 < L; ) {
        var W = L - 1 >>> 1, q = C[W];
        if (0 < l(q, z))
          C[W] = z, C[L] = q, L = W;
        else
          break e;
      }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function r(C) {
    if (C.length === 0)
      return null;
    var z = C[0], L = C.pop();
    if (L !== z) {
      C[0] = L;
      e:
        for (var W = 0, q = C.length, rr = q >>> 1; W < rr; ) {
          var xt = 2 * (W + 1) - 1, El = C[xt], St = xt + 1, lr = C[St];
          if (0 > l(El, L))
            St < q && 0 > l(lr, El) ? (C[W] = lr, C[St] = L, W = St) : (C[W] = El, C[xt] = L, W = xt);
          else if (St < q && 0 > l(lr, L))
            C[W] = lr, C[St] = L, W = St;
          else
            break e;
        }
    }
    return z;
  }
  function l(C, z) {
    var L = C.sortIndex - z.sortIndex;
    return L !== 0 ? L : C.id - z.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var o = Date, u = o.now();
    e.unstable_now = function() {
      return o.now() - u;
    };
  }
  var s = [], c = [], m = 1, v = null, h = 3, w = !1, x = !1, S = !1, D = typeof setTimeout == "function" ? setTimeout : null, d = typeof clearTimeout == "function" ? clearTimeout : null, f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(C) {
    for (var z = n(c); z !== null; ) {
      if (z.callback === null)
        r(c);
      else if (z.startTime <= C)
        r(c), z.sortIndex = z.expirationTime, t(s, z);
      else
        break;
      z = n(c);
    }
  }
  function g(C) {
    if (S = !1, p(C), !x)
      if (n(s) !== null)
        x = !0, jl(k);
      else {
        var z = n(c);
        z !== null && Cl(g, z.startTime - C);
      }
  }
  function k(C, z) {
    x = !1, S && (S = !1, d(P), P = -1), w = !0;
    var L = h;
    try {
      for (p(z), v = n(s); v !== null && (!(v.expirationTime > z) || C && !Y()); ) {
        var W = v.callback;
        if (typeof W == "function") {
          v.callback = null, h = v.priorityLevel;
          var q = W(v.expirationTime <= z);
          z = e.unstable_now(), typeof q == "function" ? v.callback = q : v === n(s) && r(s), p(z);
        } else
          r(s);
        v = n(s);
      }
      if (v !== null)
        var rr = !0;
      else {
        var xt = n(c);
        xt !== null && Cl(g, xt.startTime - z), rr = !1;
      }
      return rr;
    } finally {
      v = null, h = L, w = !1;
    }
  }
  var E = !1, _ = null, P = -1, j = 5, T = -1;
  function Y() {
    return !(e.unstable_now() - T < j);
  }
  function Je() {
    if (_ !== null) {
      var C = e.unstable_now();
      T = C;
      var z = !0;
      try {
        z = _(!0, C);
      } finally {
        z ? be() : (E = !1, _ = null);
      }
    } else
      E = !1;
  }
  var be;
  if (typeof f == "function")
    be = function() {
      f(Je);
    };
  else if (typeof MessageChannel < "u") {
    var dn = new MessageChannel(), nr = dn.port2;
    dn.port1.onmessage = Je, be = function() {
      nr.postMessage(null);
    };
  } else
    be = function() {
      D(Je, 0);
    };
  function jl(C) {
    _ = C, E || (E = !0, be());
  }
  function Cl(C, z) {
    P = D(function() {
      C(e.unstable_now());
    }, z);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(C) {
    C.callback = null;
  }, e.unstable_continueExecution = function() {
    x || w || (x = !0, jl(k));
  }, e.unstable_forceFrameRate = function(C) {
    0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : j = 0 < C ? Math.floor(1e3 / C) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(C) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var z = 3;
        break;
      default:
        z = h;
    }
    var L = h;
    h = z;
    try {
      return C();
    } finally {
      h = L;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(C, z) {
    switch (C) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        C = 3;
    }
    var L = h;
    h = C;
    try {
      return z();
    } finally {
      h = L;
    }
  }, e.unstable_scheduleCallback = function(C, z, L) {
    var W = e.unstable_now();
    switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? W + L : W) : L = W, C) {
      case 1:
        var q = -1;
        break;
      case 2:
        q = 250;
        break;
      case 5:
        q = 1073741823;
        break;
      case 4:
        q = 1e4;
        break;
      default:
        q = 5e3;
    }
    return q = L + q, C = { id: m++, callback: z, priorityLevel: C, startTime: L, expirationTime: q, sortIndex: -1 }, L > W ? (C.sortIndex = L, t(c, C), n(s) === null && C === n(c) && (S ? (d(P), P = -1) : S = !0, Cl(g, L - W))) : (C.sortIndex = q, t(s, C), x || w || (x = !0, jl(k))), C;
  }, e.unstable_shouldYield = Y, e.unstable_wrapCallback = function(C) {
    var z = h;
    return function() {
      var L = h;
      h = z;
      try {
        return C.apply(this, arguments);
      } finally {
        h = L;
      }
    };
  };
})(Ns);
ks.exports = Ns;
var Gc = ks.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var js = U, we = Gc;
function y(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Cs = /* @__PURE__ */ new Set(), On = {};
function Ot(e, t) {
  tn(e, t), tn(e + "Capture", t);
}
function tn(e, t) {
  for (On[e] = t, e = 0; e < t.length; e++)
    Cs.add(t[e]);
}
var Ke = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ri = Object.prototype.hasOwnProperty, Xc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Xo = {}, Zo = {};
function Zc(e) {
  return ri.call(Zo, e) ? !0 : ri.call(Xo, e) ? !1 : Xc.test(e) ? Zo[e] = !0 : (Xo[e] = !0, !1);
}
function qc(e, t, n, r) {
  if (n !== null && n.type === 0)
    return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Jc(e, t, n, r) {
  if (t === null || typeof t > "u" || qc(e, t, n, r))
    return !0;
  if (r)
    return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function ce(e, t, n, r, l, i, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o;
}
var ne = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ne[e] = new ce(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ne[t] = new ce(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ne[e] = new ce(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ne[e] = new ce(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ne[e] = new ce(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ne[e] = new ce(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ne[e] = new ce(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ne[e] = new ce(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ne[e] = new ce(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var to = /[\-:]([a-z])/g;
function no(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    to,
    no
  );
  ne[t] = new ce(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(to, no);
  ne[t] = new ce(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(to, no);
  ne[t] = new ce(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ne[e] = new ce(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ne.xlinkHref = new ce("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ne[e] = new ce(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ro(e, t, n, r) {
  var l = ne.hasOwnProperty(t) ? ne[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Jc(t, n, l, r) && (n = null), r || l === null ? Zc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ze = js.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, or = Symbol.for("react.element"), It = Symbol.for("react.portal"), Ut = Symbol.for("react.fragment"), lo = Symbol.for("react.strict_mode"), li = Symbol.for("react.profiler"), Es = Symbol.for("react.provider"), _s = Symbol.for("react.context"), io = Symbol.for("react.forward_ref"), ii = Symbol.for("react.suspense"), oi = Symbol.for("react.suspense_list"), oo = Symbol.for("react.memo"), tt = Symbol.for("react.lazy"), Ps = Symbol.for("react.offscreen"), qo = Symbol.iterator;
function pn(e) {
  return e === null || typeof e != "object" ? null : (e = qo && e[qo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var H = Object.assign, Pl;
function Sn(e) {
  if (Pl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Pl = t && t[1] || "";
    }
  return `
` + Pl + e;
}
var Tl = !1;
function zl(e, t) {
  if (!e || Tl)
    return "";
  Tl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (c) {
          var r = c;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (c) {
          r = c;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (var l = c.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, u = i.length - 1; 1 <= o && 0 <= u && l[o] !== i[u]; )
        u--;
      for (; 1 <= o && 0 <= u; o--, u--)
        if (l[o] !== i[u]) {
          if (o !== 1 || u !== 1)
            do
              if (o--, u--, 0 > u || l[o] !== i[u]) {
                var s = `
` + l[o].replace(" at new ", " at ");
                return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
              }
            while (1 <= o && 0 <= u);
          break;
        }
    }
  } finally {
    Tl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Sn(e) : "";
}
function bc(e) {
  switch (e.tag) {
    case 5:
      return Sn(e.type);
    case 16:
      return Sn("Lazy");
    case 13:
      return Sn("Suspense");
    case 19:
      return Sn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = zl(e.type, !1), e;
    case 11:
      return e = zl(e.type.render, !1), e;
    case 1:
      return e = zl(e.type, !0), e;
    default:
      return "";
  }
}
function ui(e) {
  if (e == null)
    return null;
  if (typeof e == "function")
    return e.displayName || e.name || null;
  if (typeof e == "string")
    return e;
  switch (e) {
    case Ut:
      return "Fragment";
    case It:
      return "Portal";
    case li:
      return "Profiler";
    case lo:
      return "StrictMode";
    case ii:
      return "Suspense";
    case oi:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case _s:
        return (e.displayName || "Context") + ".Consumer";
      case Es:
        return (e._context.displayName || "Context") + ".Provider";
      case io:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case oo:
        return t = e.displayName || null, t !== null ? t : ui(e.type) || "Memo";
      case tt:
        t = e._payload, e = e._init;
        try {
          return ui(e(t));
        } catch {
        }
    }
  return null;
}
function ef(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return ui(t);
    case 8:
      return t === lo ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
  }
  return null;
}
function ht(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Ts(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function tf(e) {
  var t = Ts(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(o) {
      r = "" + o, i.call(this, o);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(o) {
      r = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function ur(e) {
  e._valueTracker || (e._valueTracker = tf(e));
}
function zs(e) {
  if (!e)
    return !1;
  var t = e._valueTracker;
  if (!t)
    return !0;
  var n = t.getValue(), r = "";
  return e && (r = Ts(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Fr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function si(e, t) {
  var n = t.checked;
  return H({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Jo(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = ht(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ls(e, t) {
  t = t.checked, t != null && ro(e, "checked", t, !1);
}
function ai(e, t) {
  Ls(e, t);
  var n = ht(t.value), r = t.type;
  if (n != null)
    r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? ci(e, t.type, n) : t.hasOwnProperty("defaultValue") && ci(e, t.type, ht(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function bo(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
      return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function ci(e, t, n) {
  (t !== "number" || Fr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var kn = Array.isArray;
function Xt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++)
      t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + ht(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function fi(e, t) {
  if (t.dangerouslySetInnerHTML != null)
    throw Error(y(91));
  return H({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function eu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null)
        throw Error(y(92));
      if (kn(n)) {
        if (1 < n.length)
          throw Error(y(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: ht(n) };
}
function Rs(e, t) {
  var n = ht(t.value), r = ht(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function tu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ms(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function di(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ms(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var sr, Os = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
    e.innerHTML = t;
  else {
    for (sr = sr || document.createElement("div"), sr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = sr.firstChild; e.firstChild; )
      e.removeChild(e.firstChild);
    for (; t.firstChild; )
      e.appendChild(t.firstChild);
  }
});
function Dn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Cn = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, nf = ["Webkit", "ms", "Moz", "O"];
Object.keys(Cn).forEach(function(e) {
  nf.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Cn[t] = Cn[e];
  });
});
function Ds(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Cn.hasOwnProperty(e) && Cn[e] ? ("" + t).trim() : t + "px";
}
function Fs(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, l = Ds(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
}
var rf = H({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function pi(e, t) {
  if (t) {
    if (rf[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(y(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null)
        throw Error(y(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
        throw Error(y(61));
    }
    if (t.style != null && typeof t.style != "object")
      throw Error(y(62));
  }
}
function mi(e, t) {
  if (e.indexOf("-") === -1)
    return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var hi = null;
function uo(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var vi = null, Zt = null, qt = null;
function nu(e) {
  if (e = er(e)) {
    if (typeof vi != "function")
      throw Error(y(280));
    var t = e.stateNode;
    t && (t = pl(t), vi(e.stateNode, e.type, t));
  }
}
function Is(e) {
  Zt ? qt ? qt.push(e) : qt = [e] : Zt = e;
}
function Us() {
  if (Zt) {
    var e = Zt, t = qt;
    if (qt = Zt = null, nu(e), t)
      for (e = 0; e < t.length; e++)
        nu(t[e]);
  }
}
function As(e, t) {
  return e(t);
}
function $s() {
}
var Ll = !1;
function Bs(e, t, n) {
  if (Ll)
    return e(t, n);
  Ll = !0;
  try {
    return As(e, t, n);
  } finally {
    Ll = !1, (Zt !== null || qt !== null) && ($s(), Us());
  }
}
function Fn(e, t) {
  var n = e.stateNode;
  if (n === null)
    return null;
  var r = pl(n);
  if (r === null)
    return null;
  n = r[t];
  e:
    switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
  if (e)
    return null;
  if (n && typeof n != "function")
    throw Error(y(231, t, typeof n));
  return n;
}
var gi = !1;
if (Ke)
  try {
    var mn = {};
    Object.defineProperty(mn, "passive", { get: function() {
      gi = !0;
    } }), window.addEventListener("test", mn, mn), window.removeEventListener("test", mn, mn);
  } catch {
    gi = !1;
  }
function lf(e, t, n, r, l, i, o, u, s) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (m) {
    this.onError(m);
  }
}
var En = !1, Ir = null, Ur = !1, yi = null, of = { onError: function(e) {
  En = !0, Ir = e;
} };
function uf(e, t, n, r, l, i, o, u, s) {
  En = !1, Ir = null, lf.apply(of, arguments);
}
function sf(e, t, n, r, l, i, o, u, s) {
  if (uf.apply(this, arguments), En) {
    if (En) {
      var c = Ir;
      En = !1, Ir = null;
    } else
      throw Error(y(198));
    Ur || (Ur = !0, yi = c);
  }
}
function Dt(e) {
  var t = e, n = e;
  if (e.alternate)
    for (; t.return; )
      t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Vs(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
      return t.dehydrated;
  }
  return null;
}
function ru(e) {
  if (Dt(e) !== e)
    throw Error(y(188));
}
function af(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Dt(e), t === null)
      throw Error(y(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null)
      break;
    var i = l.alternate;
    if (i === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n)
          return ru(l), e;
        if (i === r)
          return ru(l), t;
        i = i.sibling;
      }
      throw Error(y(188));
    }
    if (n.return !== r.return)
      n = l, r = i;
    else {
      for (var o = !1, u = l.child; u; ) {
        if (u === n) {
          o = !0, n = l, r = i;
          break;
        }
        if (u === r) {
          o = !0, r = l, n = i;
          break;
        }
        u = u.sibling;
      }
      if (!o) {
        for (u = i.child; u; ) {
          if (u === n) {
            o = !0, n = i, r = l;
            break;
          }
          if (u === r) {
            o = !0, r = i, n = l;
            break;
          }
          u = u.sibling;
        }
        if (!o)
          throw Error(y(189));
      }
    }
    if (n.alternate !== r)
      throw Error(y(190));
  }
  if (n.tag !== 3)
    throw Error(y(188));
  return n.stateNode.current === n ? e : t;
}
function Hs(e) {
  return e = af(e), e !== null ? Qs(e) : null;
}
function Qs(e) {
  if (e.tag === 5 || e.tag === 6)
    return e;
  for (e = e.child; e !== null; ) {
    var t = Qs(e);
    if (t !== null)
      return t;
    e = e.sibling;
  }
  return null;
}
var Ws = we.unstable_scheduleCallback, lu = we.unstable_cancelCallback, cf = we.unstable_shouldYield, ff = we.unstable_requestPaint, K = we.unstable_now, df = we.unstable_getCurrentPriorityLevel, so = we.unstable_ImmediatePriority, Ks = we.unstable_UserBlockingPriority, Ar = we.unstable_NormalPriority, pf = we.unstable_LowPriority, Ys = we.unstable_IdlePriority, al = null, Ue = null;
function mf(e) {
  if (Ue && typeof Ue.onCommitFiberRoot == "function")
    try {
      Ue.onCommitFiberRoot(al, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
}
var Re = Math.clz32 ? Math.clz32 : gf, hf = Math.log, vf = Math.LN2;
function gf(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (hf(e) / vf | 0) | 0;
}
var ar = 64, cr = 4194304;
function Nn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function $r(e, t) {
  var n = e.pendingLanes;
  if (n === 0)
    return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var u = o & ~l;
    u !== 0 ? r = Nn(u) : (i &= o, i !== 0 && (r = Nn(i)));
  } else
    o = n & ~l, o !== 0 ? r = Nn(o) : i !== 0 && (r = Nn(i));
  if (r === 0)
    return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0))
    return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
    for (e = e.entanglements, t &= r; 0 < t; )
      n = 31 - Re(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function yf(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wf(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - Re(i), u = 1 << o, s = l[o];
    s === -1 ? (!(u & n) || u & r) && (l[o] = yf(u, t)) : s <= t && (e.expiredLanes |= u), i &= ~u;
  }
}
function wi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Gs() {
  var e = ar;
  return ar <<= 1, !(ar & 4194240) && (ar = 64), e;
}
function Rl(e) {
  for (var t = [], n = 0; 31 > n; n++)
    t.push(e);
  return t;
}
function Jn(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Re(t), e[t] = n;
}
function xf(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Re(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function ao(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Re(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var O = 0;
function Xs(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Zs, co, qs, Js, bs, xi = !1, fr = [], ut = null, st = null, at = null, In = /* @__PURE__ */ new Map(), Un = /* @__PURE__ */ new Map(), rt = [], Sf = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function iu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ut = null;
      break;
    case "dragenter":
    case "dragleave":
      st = null;
      break;
    case "mouseover":
    case "mouseout":
      at = null;
      break;
    case "pointerover":
    case "pointerout":
      In.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Un.delete(t.pointerId);
  }
}
function hn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = er(t), t !== null && co(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function kf(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ut = hn(ut, e, t, n, r, l), !0;
    case "dragenter":
      return st = hn(st, e, t, n, r, l), !0;
    case "mouseover":
      return at = hn(at, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return In.set(i, hn(In.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Un.set(i, hn(Un.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function ea(e) {
  var t = jt(e.target);
  if (t !== null) {
    var n = Dt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Vs(n), t !== null) {
          e.blockedOn = t, bs(e.priority, function() {
            qs(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Cr(e) {
  if (e.blockedOn !== null)
    return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Si(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      hi = r, n.target.dispatchEvent(r), hi = null;
    } else
      return t = er(n), t !== null && co(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function ou(e, t, n) {
  Cr(e) && n.delete(t);
}
function Nf() {
  xi = !1, ut !== null && Cr(ut) && (ut = null), st !== null && Cr(st) && (st = null), at !== null && Cr(at) && (at = null), In.forEach(ou), Un.forEach(ou);
}
function vn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, xi || (xi = !0, we.unstable_scheduleCallback(we.unstable_NormalPriority, Nf)));
}
function An(e) {
  function t(l) {
    return vn(l, e);
  }
  if (0 < fr.length) {
    vn(fr[0], e);
    for (var n = 1; n < fr.length; n++) {
      var r = fr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ut !== null && vn(ut, e), st !== null && vn(st, e), at !== null && vn(at, e), In.forEach(t), Un.forEach(t), n = 0; n < rt.length; n++)
    r = rt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < rt.length && (n = rt[0], n.blockedOn === null); )
    ea(n), n.blockedOn === null && rt.shift();
}
var Jt = Ze.ReactCurrentBatchConfig, Br = !0;
function jf(e, t, n, r) {
  var l = O, i = Jt.transition;
  Jt.transition = null;
  try {
    O = 1, fo(e, t, n, r);
  } finally {
    O = l, Jt.transition = i;
  }
}
function Cf(e, t, n, r) {
  var l = O, i = Jt.transition;
  Jt.transition = null;
  try {
    O = 4, fo(e, t, n, r);
  } finally {
    O = l, Jt.transition = i;
  }
}
function fo(e, t, n, r) {
  if (Br) {
    var l = Si(e, t, n, r);
    if (l === null)
      Vl(e, t, r, Vr, n), iu(e, r);
    else if (kf(l, e, t, n, r))
      r.stopPropagation();
    else if (iu(e, r), t & 4 && -1 < Sf.indexOf(e)) {
      for (; l !== null; ) {
        var i = er(l);
        if (i !== null && Zs(i), i = Si(e, t, n, r), i === null && Vl(e, t, r, Vr, n), i === l)
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else
      Vl(e, t, r, null, n);
  }
}
var Vr = null;
function Si(e, t, n, r) {
  if (Vr = null, e = uo(r), e = jt(e), e !== null)
    if (t = Dt(e), t === null)
      e = null;
    else if (n = t.tag, n === 13) {
      if (e = Vs(t), e !== null)
        return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else
      t !== e && (e = null);
  return Vr = e, null;
}
function ta(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (df()) {
        case so:
          return 1;
        case Ks:
          return 4;
        case Ar:
        case pf:
          return 16;
        case Ys:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var it = null, po = null, Er = null;
function na() {
  if (Er)
    return Er;
  var e, t = po, n = t.length, r, l = "value" in it ? it.value : it.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++)
    ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++)
    ;
  return Er = l.slice(e, 1 < r ? 1 - r : void 0);
}
function _r(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function dr() {
  return !0;
}
function uu() {
  return !1;
}
function Se(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var u in e)
      e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(i) : i[u]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? dr : uu, this.isPropagationStopped = uu, this;
  }
  return H(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = dr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = dr);
  }, persist: function() {
  }, isPersistent: dr }), t;
}
var cn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, mo = Se(cn), bn = H({}, cn, { view: 0, detail: 0 }), Ef = Se(bn), Ml, Ol, gn, cl = H({}, bn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ho, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== gn && (gn && e.type === "mousemove" ? (Ml = e.screenX - gn.screenX, Ol = e.screenY - gn.screenY) : Ol = Ml = 0, gn = e), Ml);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ol;
} }), su = Se(cl), _f = H({}, cl, { dataTransfer: 0 }), Pf = Se(_f), Tf = H({}, bn, { relatedTarget: 0 }), Dl = Se(Tf), zf = H({}, cn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Lf = Se(zf), Rf = H({}, cn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Mf = Se(Rf), Of = H({}, cn, { data: 0 }), au = Se(Of), Df = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Ff = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, If = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Uf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = If[e]) ? !!t[e] : !1;
}
function ho() {
  return Uf;
}
var Af = H({}, bn, { key: function(e) {
  if (e.key) {
    var t = Df[e.key] || e.key;
    if (t !== "Unidentified")
      return t;
  }
  return e.type === "keypress" ? (e = _r(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Ff[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ho, charCode: function(e) {
  return e.type === "keypress" ? _r(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? _r(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), $f = Se(Af), Bf = H({}, cl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), cu = Se(Bf), Vf = H({}, bn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ho }), Hf = Se(Vf), Qf = H({}, cn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Wf = Se(Qf), Kf = H({}, cl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Yf = Se(Kf), Gf = [9, 13, 27, 32], vo = Ke && "CompositionEvent" in window, _n = null;
Ke && "documentMode" in document && (_n = document.documentMode);
var Xf = Ke && "TextEvent" in window && !_n, ra = Ke && (!vo || _n && 8 < _n && 11 >= _n), fu = " ", du = !1;
function la(e, t) {
  switch (e) {
    case "keyup":
      return Gf.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function ia(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var At = !1;
function Zf(e, t) {
  switch (e) {
    case "compositionend":
      return ia(t);
    case "keypress":
      return t.which !== 32 ? null : (du = !0, fu);
    case "textInput":
      return e = t.data, e === fu && du ? null : e;
    default:
      return null;
  }
}
function qf(e, t) {
  if (At)
    return e === "compositionend" || !vo && la(e, t) ? (e = na(), Er = po = it = null, At = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length)
          return t.char;
        if (t.which)
          return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return ra && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Jf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function pu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Jf[e.type] : t === "textarea";
}
function oa(e, t, n, r) {
  Is(r), t = Hr(t, "onChange"), 0 < t.length && (n = new mo("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Pn = null, $n = null;
function bf(e) {
  ga(e, 0);
}
function fl(e) {
  var t = Vt(e);
  if (zs(t))
    return e;
}
function ed(e, t) {
  if (e === "change")
    return t;
}
var ua = !1;
if (Ke) {
  var Fl;
  if (Ke) {
    var Il = "oninput" in document;
    if (!Il) {
      var mu = document.createElement("div");
      mu.setAttribute("oninput", "return;"), Il = typeof mu.oninput == "function";
    }
    Fl = Il;
  } else
    Fl = !1;
  ua = Fl && (!document.documentMode || 9 < document.documentMode);
}
function hu() {
  Pn && (Pn.detachEvent("onpropertychange", sa), $n = Pn = null);
}
function sa(e) {
  if (e.propertyName === "value" && fl($n)) {
    var t = [];
    oa(t, $n, e, uo(e)), Bs(bf, t);
  }
}
function td(e, t, n) {
  e === "focusin" ? (hu(), Pn = t, $n = n, Pn.attachEvent("onpropertychange", sa)) : e === "focusout" && hu();
}
function nd(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return fl($n);
}
function rd(e, t) {
  if (e === "click")
    return fl(t);
}
function ld(e, t) {
  if (e === "input" || e === "change")
    return fl(t);
}
function id(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Oe = typeof Object.is == "function" ? Object.is : id;
function Bn(e, t) {
  if (Oe(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ri.call(t, l) || !Oe(e[l], t[l]))
      return !1;
  }
  return !0;
}
function vu(e) {
  for (; e && e.firstChild; )
    e = e.firstChild;
  return e;
}
function gu(e, t) {
  var n = vu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t)
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = vu(n);
  }
}
function aa(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? aa(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function ca() {
  for (var e = window, t = Fr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n)
      e = t.contentWindow;
    else
      break;
    t = Fr(e.document);
  }
  return t;
}
function go(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function od(e) {
  var t = ca(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && aa(n.ownerDocument.documentElement, n)) {
    if (r !== null && go(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
        n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = gu(n, i);
        var o = gu(
          n,
          r
        );
        l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; )
      e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var ud = Ke && "documentMode" in document && 11 >= document.documentMode, $t = null, ki = null, Tn = null, Ni = !1;
function yu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ni || $t == null || $t !== Fr(r) || (r = $t, "selectionStart" in r && go(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Tn && Bn(Tn, r) || (Tn = r, r = Hr(ki, "onSelect"), 0 < r.length && (t = new mo("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = $t)));
}
function pr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Bt = { animationend: pr("Animation", "AnimationEnd"), animationiteration: pr("Animation", "AnimationIteration"), animationstart: pr("Animation", "AnimationStart"), transitionend: pr("Transition", "TransitionEnd") }, Ul = {}, fa = {};
Ke && (fa = document.createElement("div").style, "AnimationEvent" in window || (delete Bt.animationend.animation, delete Bt.animationiteration.animation, delete Bt.animationstart.animation), "TransitionEvent" in window || delete Bt.transitionend.transition);
function dl(e) {
  if (Ul[e])
    return Ul[e];
  if (!Bt[e])
    return e;
  var t = Bt[e], n;
  for (n in t)
    if (t.hasOwnProperty(n) && n in fa)
      return Ul[e] = t[n];
  return e;
}
var da = dl("animationend"), pa = dl("animationiteration"), ma = dl("animationstart"), ha = dl("transitionend"), va = /* @__PURE__ */ new Map(), wu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function gt(e, t) {
  va.set(e, t), Ot(t, [e]);
}
for (var Al = 0; Al < wu.length; Al++) {
  var $l = wu[Al], sd = $l.toLowerCase(), ad = $l[0].toUpperCase() + $l.slice(1);
  gt(sd, "on" + ad);
}
gt(da, "onAnimationEnd");
gt(pa, "onAnimationIteration");
gt(ma, "onAnimationStart");
gt("dblclick", "onDoubleClick");
gt("focusin", "onFocus");
gt("focusout", "onBlur");
gt(ha, "onTransitionEnd");
tn("onMouseEnter", ["mouseout", "mouseover"]);
tn("onMouseLeave", ["mouseout", "mouseover"]);
tn("onPointerEnter", ["pointerout", "pointerover"]);
tn("onPointerLeave", ["pointerout", "pointerover"]);
Ot("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ot("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ot("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ot("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ot("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ot("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var jn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), cd = new Set("cancel close invalid load scroll toggle".split(" ").concat(jn));
function xu(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, sf(r, t, void 0, e), e.currentTarget = null;
}
function ga(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var u = r[o], s = u.instance, c = u.currentTarget;
          if (u = u.listener, s !== i && l.isPropagationStopped())
            break e;
          xu(l, u, c), i = s;
        }
      else
        for (o = 0; o < r.length; o++) {
          if (u = r[o], s = u.instance, c = u.currentTarget, u = u.listener, s !== i && l.isPropagationStopped())
            break e;
          xu(l, u, c), i = s;
        }
    }
  }
  if (Ur)
    throw e = yi, Ur = !1, yi = null, e;
}
function I(e, t) {
  var n = t[Pi];
  n === void 0 && (n = t[Pi] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (ya(t, e, 2, !1), n.add(r));
}
function Bl(e, t, n) {
  var r = 0;
  t && (r |= 4), ya(n, e, r, t);
}
var mr = "_reactListening" + Math.random().toString(36).slice(2);
function Vn(e) {
  if (!e[mr]) {
    e[mr] = !0, Cs.forEach(function(n) {
      n !== "selectionchange" && (cd.has(n) || Bl(n, !1, e), Bl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[mr] || (t[mr] = !0, Bl("selectionchange", !1, t));
  }
}
function ya(e, t, n, r) {
  switch (ta(t)) {
    case 1:
      var l = jf;
      break;
    case 4:
      l = Cf;
      break;
    default:
      l = fo;
  }
  n = l.bind(null, t, n, e), l = void 0, !gi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Vl(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e:
      for (; ; ) {
        if (r === null)
          return;
        var o = r.tag;
        if (o === 3 || o === 4) {
          var u = r.stateNode.containerInfo;
          if (u === l || u.nodeType === 8 && u.parentNode === l)
            break;
          if (o === 4)
            for (o = r.return; o !== null; ) {
              var s = o.tag;
              if ((s === 3 || s === 4) && (s = o.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l))
                return;
              o = o.return;
            }
          for (; u !== null; ) {
            if (o = jt(u), o === null)
              return;
            if (s = o.tag, s === 5 || s === 6) {
              r = i = o;
              continue e;
            }
            u = u.parentNode;
          }
        }
        r = r.return;
      }
  Bs(function() {
    var c = i, m = uo(n), v = [];
    e: {
      var h = va.get(e);
      if (h !== void 0) {
        var w = mo, x = e;
        switch (e) {
          case "keypress":
            if (_r(n) === 0)
              break e;
          case "keydown":
          case "keyup":
            w = $f;
            break;
          case "focusin":
            x = "focus", w = Dl;
            break;
          case "focusout":
            x = "blur", w = Dl;
            break;
          case "beforeblur":
          case "afterblur":
            w = Dl;
            break;
          case "click":
            if (n.button === 2)
              break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            w = su;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = Pf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = Hf;
            break;
          case da:
          case pa:
          case ma:
            w = Lf;
            break;
          case ha:
            w = Wf;
            break;
          case "scroll":
            w = Ef;
            break;
          case "wheel":
            w = Yf;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = Mf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = cu;
        }
        var S = (t & 4) !== 0, D = !S && e === "scroll", d = S ? h !== null ? h + "Capture" : null : h;
        S = [];
        for (var f = c, p; f !== null; ) {
          p = f;
          var g = p.stateNode;
          if (p.tag === 5 && g !== null && (p = g, d !== null && (g = Fn(f, d), g != null && S.push(Hn(f, g, p)))), D)
            break;
          f = f.return;
        }
        0 < S.length && (h = new w(h, x, null, n, m), v.push({ event: h, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", h && n !== hi && (x = n.relatedTarget || n.fromElement) && (jt(x) || x[Ye]))
          break e;
        if ((w || h) && (h = m.window === m ? m : (h = m.ownerDocument) ? h.defaultView || h.parentWindow : window, w ? (x = n.relatedTarget || n.toElement, w = c, x = x ? jt(x) : null, x !== null && (D = Dt(x), x !== D || x.tag !== 5 && x.tag !== 6) && (x = null)) : (w = null, x = c), w !== x)) {
          if (S = su, g = "onMouseLeave", d = "onMouseEnter", f = "mouse", (e === "pointerout" || e === "pointerover") && (S = cu, g = "onPointerLeave", d = "onPointerEnter", f = "pointer"), D = w == null ? h : Vt(w), p = x == null ? h : Vt(x), h = new S(g, f + "leave", w, n, m), h.target = D, h.relatedTarget = p, g = null, jt(m) === c && (S = new S(d, f + "enter", x, n, m), S.target = p, S.relatedTarget = D, g = S), D = g, w && x)
            t: {
              for (S = w, d = x, f = 0, p = S; p; p = Ft(p))
                f++;
              for (p = 0, g = d; g; g = Ft(g))
                p++;
              for (; 0 < f - p; )
                S = Ft(S), f--;
              for (; 0 < p - f; )
                d = Ft(d), p--;
              for (; f--; ) {
                if (S === d || d !== null && S === d.alternate)
                  break t;
                S = Ft(S), d = Ft(d);
              }
              S = null;
            }
          else
            S = null;
          w !== null && Su(v, h, w, S, !1), x !== null && D !== null && Su(v, D, x, S, !0);
        }
      }
      e: {
        if (h = c ? Vt(c) : window, w = h.nodeName && h.nodeName.toLowerCase(), w === "select" || w === "input" && h.type === "file")
          var k = ed;
        else if (pu(h))
          if (ua)
            k = ld;
          else {
            k = nd;
            var E = td;
          }
        else
          (w = h.nodeName) && w.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (k = rd);
        if (k && (k = k(e, c))) {
          oa(v, k, n, m);
          break e;
        }
        E && E(e, h, c), e === "focusout" && (E = h._wrapperState) && E.controlled && h.type === "number" && ci(h, "number", h.value);
      }
      switch (E = c ? Vt(c) : window, e) {
        case "focusin":
          (pu(E) || E.contentEditable === "true") && ($t = E, ki = c, Tn = null);
          break;
        case "focusout":
          Tn = ki = $t = null;
          break;
        case "mousedown":
          Ni = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ni = !1, yu(v, n, m);
          break;
        case "selectionchange":
          if (ud)
            break;
        case "keydown":
        case "keyup":
          yu(v, n, m);
      }
      var _;
      if (vo)
        e: {
          switch (e) {
            case "compositionstart":
              var P = "onCompositionStart";
              break e;
            case "compositionend":
              P = "onCompositionEnd";
              break e;
            case "compositionupdate":
              P = "onCompositionUpdate";
              break e;
          }
          P = void 0;
        }
      else
        At ? la(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P && (ra && n.locale !== "ko" && (At || P !== "onCompositionStart" ? P === "onCompositionEnd" && At && (_ = na()) : (it = m, po = "value" in it ? it.value : it.textContent, At = !0)), E = Hr(c, P), 0 < E.length && (P = new au(P, e, null, n, m), v.push({ event: P, listeners: E }), _ ? P.data = _ : (_ = ia(n), _ !== null && (P.data = _)))), (_ = Xf ? Zf(e, n) : qf(e, n)) && (c = Hr(c, "onBeforeInput"), 0 < c.length && (m = new au("onBeforeInput", "beforeinput", null, n, m), v.push({ event: m, listeners: c }), m.data = _));
    }
    ga(v, t);
  });
}
function Hn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Hr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Fn(e, n), i != null && r.unshift(Hn(e, i, l)), i = Fn(e, t), i != null && r.push(Hn(e, i, l))), e = e.return;
  }
  return r;
}
function Ft(e) {
  if (e === null)
    return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Su(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var u = n, s = u.alternate, c = u.stateNode;
    if (s !== null && s === r)
      break;
    u.tag === 5 && c !== null && (u = c, l ? (s = Fn(n, i), s != null && o.unshift(Hn(n, s, u))) : l || (s = Fn(n, i), s != null && o.push(Hn(n, s, u)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var fd = /\r\n?/g, dd = /\u0000|\uFFFD/g;
function ku(e) {
  return (typeof e == "string" ? e : "" + e).replace(fd, `
`).replace(dd, "");
}
function hr(e, t, n) {
  if (t = ku(t), ku(e) !== t && n)
    throw Error(y(425));
}
function Qr() {
}
var ji = null, Ci = null;
function Ei(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var _i = typeof setTimeout == "function" ? setTimeout : void 0, pd = typeof clearTimeout == "function" ? clearTimeout : void 0, Nu = typeof Promise == "function" ? Promise : void 0, md = typeof queueMicrotask == "function" ? queueMicrotask : typeof Nu < "u" ? function(e) {
  return Nu.resolve(null).then(e).catch(hd);
} : _i;
function hd(e) {
  setTimeout(function() {
    throw e;
  });
}
function Hl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8)
      if (n = l.data, n === "/$") {
        if (r === 0) {
          e.removeChild(l), An(t);
          return;
        }
        r--;
      } else
        n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  An(t);
}
function ct(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3)
      break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?")
        break;
      if (t === "/$")
        return null;
    }
  }
  return e;
}
function ju(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0)
          return e;
        t--;
      } else
        n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var fn = Math.random().toString(36).slice(2), Ie = "__reactFiber$" + fn, Qn = "__reactProps$" + fn, Ye = "__reactContainer$" + fn, Pi = "__reactEvents$" + fn, vd = "__reactListeners$" + fn, gd = "__reactHandles$" + fn;
function jt(e) {
  var t = e[Ie];
  if (t)
    return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ye] || n[Ie]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
        for (e = ju(e); e !== null; ) {
          if (n = e[Ie])
            return n;
          e = ju(e);
        }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function er(e) {
  return e = e[Ie] || e[Ye], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Vt(e) {
  if (e.tag === 5 || e.tag === 6)
    return e.stateNode;
  throw Error(y(33));
}
function pl(e) {
  return e[Qn] || null;
}
var Ti = [], Ht = -1;
function yt(e) {
  return { current: e };
}
function A(e) {
  0 > Ht || (e.current = Ti[Ht], Ti[Ht] = null, Ht--);
}
function F(e, t) {
  Ht++, Ti[Ht] = e.current, e.current = t;
}
var vt = {}, oe = yt(vt), pe = yt(!1), Tt = vt;
function nn(e, t) {
  var n = e.type.contextTypes;
  if (!n)
    return vt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n)
    l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function me(e) {
  return e = e.childContextTypes, e != null;
}
function Wr() {
  A(pe), A(oe);
}
function Cu(e, t, n) {
  if (oe.current !== vt)
    throw Error(y(168));
  F(oe, t), F(pe, n);
}
function wa(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function")
    return n;
  r = r.getChildContext();
  for (var l in r)
    if (!(l in t))
      throw Error(y(108, ef(e) || "Unknown", l));
  return H({}, n, r);
}
function Kr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vt, Tt = oe.current, F(oe, e), F(pe, pe.current), !0;
}
function Eu(e, t, n) {
  var r = e.stateNode;
  if (!r)
    throw Error(y(169));
  n ? (e = wa(e, t, Tt), r.__reactInternalMemoizedMergedChildContext = e, A(pe), A(oe), F(oe, e)) : A(pe), F(pe, n);
}
var Be = null, ml = !1, Ql = !1;
function xa(e) {
  Be === null ? Be = [e] : Be.push(e);
}
function yd(e) {
  ml = !0, xa(e);
}
function wt() {
  if (!Ql && Be !== null) {
    Ql = !0;
    var e = 0, t = O;
    try {
      var n = Be;
      for (O = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Be = null, ml = !1;
    } catch (l) {
      throw Be !== null && (Be = Be.slice(e + 1)), Ws(so, wt), l;
    } finally {
      O = t, Ql = !1;
    }
  }
  return null;
}
var Qt = [], Wt = 0, Yr = null, Gr = 0, ke = [], Ne = 0, zt = null, He = 1, Qe = "";
function kt(e, t) {
  Qt[Wt++] = Gr, Qt[Wt++] = Yr, Yr = e, Gr = t;
}
function Sa(e, t, n) {
  ke[Ne++] = He, ke[Ne++] = Qe, ke[Ne++] = zt, zt = e;
  var r = He;
  e = Qe;
  var l = 32 - Re(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Re(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, He = 1 << 32 - Re(t) + l | n << l | r, Qe = i + e;
  } else
    He = 1 << i | n << l | r, Qe = e;
}
function yo(e) {
  e.return !== null && (kt(e, 1), Sa(e, 1, 0));
}
function wo(e) {
  for (; e === Yr; )
    Yr = Qt[--Wt], Qt[Wt] = null, Gr = Qt[--Wt], Qt[Wt] = null;
  for (; e === zt; )
    zt = ke[--Ne], ke[Ne] = null, Qe = ke[--Ne], ke[Ne] = null, He = ke[--Ne], ke[Ne] = null;
}
var ye = null, ge = null, $ = !1, Le = null;
function ka(e, t) {
  var n = je(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function _u(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ye = e, ge = ct(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ye = e, ge = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = zt !== null ? { id: He, overflow: Qe } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = je(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ye = e, ge = null, !0) : !1;
    default:
      return !1;
  }
}
function zi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Li(e) {
  if ($) {
    var t = ge;
    if (t) {
      var n = t;
      if (!_u(e, t)) {
        if (zi(e))
          throw Error(y(418));
        t = ct(n.nextSibling);
        var r = ye;
        t && _u(e, t) ? ka(r, n) : (e.flags = e.flags & -4097 | 2, $ = !1, ye = e);
      }
    } else {
      if (zi(e))
        throw Error(y(418));
      e.flags = e.flags & -4097 | 2, $ = !1, ye = e;
    }
  }
}
function Pu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  ye = e;
}
function vr(e) {
  if (e !== ye)
    return !1;
  if (!$)
    return Pu(e), $ = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ei(e.type, e.memoizedProps)), t && (t = ge)) {
    if (zi(e))
      throw Na(), Error(y(418));
    for (; t; )
      ka(e, t), t = ct(t.nextSibling);
  }
  if (Pu(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
      throw Error(y(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ge = ct(e.nextSibling);
              break e;
            }
            t--;
          } else
            n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      ge = null;
    }
  } else
    ge = ye ? ct(e.stateNode.nextSibling) : null;
  return !0;
}
function Na() {
  for (var e = ge; e; )
    e = ct(e.nextSibling);
}
function rn() {
  ge = ye = null, $ = !1;
}
function xo(e) {
  Le === null ? Le = [e] : Le.push(e);
}
var wd = Ze.ReactCurrentBatchConfig;
function Te(e, t) {
  if (e && e.defaultProps) {
    t = H({}, t), e = e.defaultProps;
    for (var n in e)
      t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var Xr = yt(null), Zr = null, Kt = null, So = null;
function ko() {
  So = Kt = Zr = null;
}
function No(e) {
  var t = Xr.current;
  A(Xr), e._currentValue = t;
}
function Ri(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
      break;
    e = e.return;
  }
}
function bt(e, t) {
  Zr = e, So = Kt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (de = !0), e.firstContext = null);
}
function Ee(e) {
  var t = e._currentValue;
  if (So !== e)
    if (e = { context: e, memoizedValue: t, next: null }, Kt === null) {
      if (Zr === null)
        throw Error(y(308));
      Kt = e, Zr.dependencies = { lanes: 0, firstContext: e };
    } else
      Kt = Kt.next = e;
  return t;
}
var Ct = null;
function jo(e) {
  Ct === null ? Ct = [e] : Ct.push(e);
}
function ja(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, jo(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ge(e, r);
}
function Ge(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var nt = !1;
function Co(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Ca(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function We(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ft(e, t, n) {
  var r = e.updateQueue;
  if (r === null)
    return null;
  if (r = r.shared, M & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ge(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, jo(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ge(e, n);
}
function Pr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ao(e, n);
  }
}
function Tu(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? l = i = o : i = i.next = o, n = n.next;
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t;
    } else
      l = i = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function qr(e, t, n, r) {
  var l = e.updateQueue;
  nt = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var s = u, c = s.next;
    s.next = null, o === null ? i = c : o.next = c, o = s;
    var m = e.alternate;
    m !== null && (m = m.updateQueue, u = m.lastBaseUpdate, u !== o && (u === null ? m.firstBaseUpdate = c : u.next = c, m.lastBaseUpdate = s));
  }
  if (i !== null) {
    var v = l.baseState;
    o = 0, m = c = s = null, u = i;
    do {
      var h = u.lane, w = u.eventTime;
      if ((r & h) === h) {
        m !== null && (m = m.next = {
          eventTime: w,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var x = e, S = u;
          switch (h = t, w = n, S.tag) {
            case 1:
              if (x = S.payload, typeof x == "function") {
                v = x.call(w, v, h);
                break e;
              }
              v = x;
              break e;
            case 3:
              x.flags = x.flags & -65537 | 128;
            case 0:
              if (x = S.payload, h = typeof x == "function" ? x.call(w, v, h) : x, h == null)
                break e;
              v = H({}, v, h);
              break e;
            case 2:
              nt = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [u] : h.push(u));
      } else
        w = { eventTime: w, lane: h, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, m === null ? (c = m = w, s = v) : m = m.next = w, o |= h;
      if (u = u.next, u === null) {
        if (u = l.shared.pending, u === null)
          break;
        h = u, u = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (m === null && (s = v), l.baseState = s, l.firstBaseUpdate = c, l.lastBaseUpdate = m, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else
      i === null && (l.shared.lanes = 0);
    Rt |= o, e.lanes = o, e.memoizedState = v;
  }
}
function zu(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null)
    for (t = 0; t < e.length; t++) {
      var r = e[t], l = r.callback;
      if (l !== null) {
        if (r.callback = null, r = n, typeof l != "function")
          throw Error(y(191, l));
        l.call(r);
      }
    }
}
var Ea = new js.Component().refs;
function Mi(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : H({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var hl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Dt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = se(), l = pt(e), i = We(r, l);
  i.payload = t, n != null && (i.callback = n), t = ft(e, i, l), t !== null && (Me(t, e, l, r), Pr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = se(), l = pt(e), i = We(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = ft(e, i, l), t !== null && (Me(t, e, l, r), Pr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = se(), r = pt(e), l = We(n, r);
  l.tag = 2, t != null && (l.callback = t), t = ft(e, l, r), t !== null && (Me(t, e, r, n), Pr(t, e, r));
} };
function Lu(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Bn(n, r) || !Bn(l, i) : !0;
}
function _a(e, t, n) {
  var r = !1, l = vt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = Ee(i) : (l = me(t) ? Tt : oe.current, r = t.contextTypes, i = (r = r != null) ? nn(e, l) : vt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = hl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Ru(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && hl.enqueueReplaceState(t, t.state, null);
}
function Oi(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = Ea, Co(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Ee(i) : (i = me(t) ? Tt : oe.current, l.context = nn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Mi(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && hl.enqueueReplaceState(l, l.state, null), qr(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function yn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1)
          throw Error(y(309));
        var r = n.stateNode;
      }
      if (!r)
        throw Error(y(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var u = l.refs;
        u === Ea && (u = l.refs = {}), o === null ? delete u[i] : u[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string")
      throw Error(y(284));
    if (!n._owner)
      throw Error(y(290, e));
  }
  return e;
}
function gr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(y(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Mu(e) {
  var t = e._init;
  return t(e._payload);
}
function Pa(e) {
  function t(d, f) {
    if (e) {
      var p = d.deletions;
      p === null ? (d.deletions = [f], d.flags |= 16) : p.push(f);
    }
  }
  function n(d, f) {
    if (!e)
      return null;
    for (; f !== null; )
      t(d, f), f = f.sibling;
    return null;
  }
  function r(d, f) {
    for (d = /* @__PURE__ */ new Map(); f !== null; )
      f.key !== null ? d.set(f.key, f) : d.set(f.index, f), f = f.sibling;
    return d;
  }
  function l(d, f) {
    return d = mt(d, f), d.index = 0, d.sibling = null, d;
  }
  function i(d, f, p) {
    return d.index = p, e ? (p = d.alternate, p !== null ? (p = p.index, p < f ? (d.flags |= 2, f) : p) : (d.flags |= 2, f)) : (d.flags |= 1048576, f);
  }
  function o(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function u(d, f, p, g) {
    return f === null || f.tag !== 6 ? (f = ql(p, d.mode, g), f.return = d, f) : (f = l(f, p), f.return = d, f);
  }
  function s(d, f, p, g) {
    var k = p.type;
    return k === Ut ? m(d, f, p.props.children, g, p.key) : f !== null && (f.elementType === k || typeof k == "object" && k !== null && k.$$typeof === tt && Mu(k) === f.type) ? (g = l(f, p.props), g.ref = yn(d, f, p), g.return = d, g) : (g = Or(p.type, p.key, p.props, null, d.mode, g), g.ref = yn(d, f, p), g.return = d, g);
  }
  function c(d, f, p, g) {
    return f === null || f.tag !== 4 || f.stateNode.containerInfo !== p.containerInfo || f.stateNode.implementation !== p.implementation ? (f = Jl(p, d.mode, g), f.return = d, f) : (f = l(f, p.children || []), f.return = d, f);
  }
  function m(d, f, p, g, k) {
    return f === null || f.tag !== 7 ? (f = Pt(p, d.mode, g, k), f.return = d, f) : (f = l(f, p), f.return = d, f);
  }
  function v(d, f, p) {
    if (typeof f == "string" && f !== "" || typeof f == "number")
      return f = ql("" + f, d.mode, p), f.return = d, f;
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case or:
          return p = Or(f.type, f.key, f.props, null, d.mode, p), p.ref = yn(d, null, f), p.return = d, p;
        case It:
          return f = Jl(f, d.mode, p), f.return = d, f;
        case tt:
          var g = f._init;
          return v(d, g(f._payload), p);
      }
      if (kn(f) || pn(f))
        return f = Pt(f, d.mode, p, null), f.return = d, f;
      gr(d, f);
    }
    return null;
  }
  function h(d, f, p, g) {
    var k = f !== null ? f.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number")
      return k !== null ? null : u(d, f, "" + p, g);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case or:
          return p.key === k ? s(d, f, p, g) : null;
        case It:
          return p.key === k ? c(d, f, p, g) : null;
        case tt:
          return k = p._init, h(
            d,
            f,
            k(p._payload),
            g
          );
      }
      if (kn(p) || pn(p))
        return k !== null ? null : m(d, f, p, g, null);
      gr(d, p);
    }
    return null;
  }
  function w(d, f, p, g, k) {
    if (typeof g == "string" && g !== "" || typeof g == "number")
      return d = d.get(p) || null, u(f, d, "" + g, k);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case or:
          return d = d.get(g.key === null ? p : g.key) || null, s(f, d, g, k);
        case It:
          return d = d.get(g.key === null ? p : g.key) || null, c(f, d, g, k);
        case tt:
          var E = g._init;
          return w(d, f, p, E(g._payload), k);
      }
      if (kn(g) || pn(g))
        return d = d.get(p) || null, m(f, d, g, k, null);
      gr(f, g);
    }
    return null;
  }
  function x(d, f, p, g) {
    for (var k = null, E = null, _ = f, P = f = 0, j = null; _ !== null && P < p.length; P++) {
      _.index > P ? (j = _, _ = null) : j = _.sibling;
      var T = h(d, _, p[P], g);
      if (T === null) {
        _ === null && (_ = j);
        break;
      }
      e && _ && T.alternate === null && t(d, _), f = i(T, f, P), E === null ? k = T : E.sibling = T, E = T, _ = j;
    }
    if (P === p.length)
      return n(d, _), $ && kt(d, P), k;
    if (_ === null) {
      for (; P < p.length; P++)
        _ = v(d, p[P], g), _ !== null && (f = i(_, f, P), E === null ? k = _ : E.sibling = _, E = _);
      return $ && kt(d, P), k;
    }
    for (_ = r(d, _); P < p.length; P++)
      j = w(_, d, P, p[P], g), j !== null && (e && j.alternate !== null && _.delete(j.key === null ? P : j.key), f = i(j, f, P), E === null ? k = j : E.sibling = j, E = j);
    return e && _.forEach(function(Y) {
      return t(d, Y);
    }), $ && kt(d, P), k;
  }
  function S(d, f, p, g) {
    var k = pn(p);
    if (typeof k != "function")
      throw Error(y(150));
    if (p = k.call(p), p == null)
      throw Error(y(151));
    for (var E = k = null, _ = f, P = f = 0, j = null, T = p.next(); _ !== null && !T.done; P++, T = p.next()) {
      _.index > P ? (j = _, _ = null) : j = _.sibling;
      var Y = h(d, _, T.value, g);
      if (Y === null) {
        _ === null && (_ = j);
        break;
      }
      e && _ && Y.alternate === null && t(d, _), f = i(Y, f, P), E === null ? k = Y : E.sibling = Y, E = Y, _ = j;
    }
    if (T.done)
      return n(
        d,
        _
      ), $ && kt(d, P), k;
    if (_ === null) {
      for (; !T.done; P++, T = p.next())
        T = v(d, T.value, g), T !== null && (f = i(T, f, P), E === null ? k = T : E.sibling = T, E = T);
      return $ && kt(d, P), k;
    }
    for (_ = r(d, _); !T.done; P++, T = p.next())
      T = w(_, d, P, T.value, g), T !== null && (e && T.alternate !== null && _.delete(T.key === null ? P : T.key), f = i(T, f, P), E === null ? k = T : E.sibling = T, E = T);
    return e && _.forEach(function(Je) {
      return t(d, Je);
    }), $ && kt(d, P), k;
  }
  function D(d, f, p, g) {
    if (typeof p == "object" && p !== null && p.type === Ut && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case or:
          e: {
            for (var k = p.key, E = f; E !== null; ) {
              if (E.key === k) {
                if (k = p.type, k === Ut) {
                  if (E.tag === 7) {
                    n(d, E.sibling), f = l(E, p.props.children), f.return = d, d = f;
                    break e;
                  }
                } else if (E.elementType === k || typeof k == "object" && k !== null && k.$$typeof === tt && Mu(k) === E.type) {
                  n(d, E.sibling), f = l(E, p.props), f.ref = yn(d, E, p), f.return = d, d = f;
                  break e;
                }
                n(d, E);
                break;
              } else
                t(d, E);
              E = E.sibling;
            }
            p.type === Ut ? (f = Pt(p.props.children, d.mode, g, p.key), f.return = d, d = f) : (g = Or(p.type, p.key, p.props, null, d.mode, g), g.ref = yn(d, f, p), g.return = d, d = g);
          }
          return o(d);
        case It:
          e: {
            for (E = p.key; f !== null; ) {
              if (f.key === E)
                if (f.tag === 4 && f.stateNode.containerInfo === p.containerInfo && f.stateNode.implementation === p.implementation) {
                  n(d, f.sibling), f = l(f, p.children || []), f.return = d, d = f;
                  break e;
                } else {
                  n(d, f);
                  break;
                }
              else
                t(d, f);
              f = f.sibling;
            }
            f = Jl(p, d.mode, g), f.return = d, d = f;
          }
          return o(d);
        case tt:
          return E = p._init, D(d, f, E(p._payload), g);
      }
      if (kn(p))
        return x(d, f, p, g);
      if (pn(p))
        return S(d, f, p, g);
      gr(d, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, f !== null && f.tag === 6 ? (n(d, f.sibling), f = l(f, p), f.return = d, d = f) : (n(d, f), f = ql(p, d.mode, g), f.return = d, d = f), o(d)) : n(d, f);
  }
  return D;
}
var ln = Pa(!0), Ta = Pa(!1), tr = {}, Ae = yt(tr), Wn = yt(tr), Kn = yt(tr);
function Et(e) {
  if (e === tr)
    throw Error(y(174));
  return e;
}
function Eo(e, t) {
  switch (F(Kn, t), F(Wn, e), F(Ae, tr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : di(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = di(t, e);
  }
  A(Ae), F(Ae, t);
}
function on() {
  A(Ae), A(Wn), A(Kn);
}
function za(e) {
  Et(Kn.current);
  var t = Et(Ae.current), n = di(t, e.type);
  t !== n && (F(Wn, e), F(Ae, n));
}
function _o(e) {
  Wn.current === e && (A(Ae), A(Wn));
}
var B = yt(0);
function Jr(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!"))
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128)
        return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e)
      break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e)
        return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var Wl = [];
function Po() {
  for (var e = 0; e < Wl.length; e++)
    Wl[e]._workInProgressVersionPrimary = null;
  Wl.length = 0;
}
var Tr = Ze.ReactCurrentDispatcher, Kl = Ze.ReactCurrentBatchConfig, Lt = 0, V = null, X = null, J = null, br = !1, zn = !1, Yn = 0, xd = 0;
function re() {
  throw Error(y(321));
}
function To(e, t) {
  if (t === null)
    return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Oe(e[n], t[n]))
      return !1;
  return !0;
}
function zo(e, t, n, r, l, i) {
  if (Lt = i, V = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Tr.current = e === null || e.memoizedState === null ? jd : Cd, e = n(r, l), zn) {
    i = 0;
    do {
      if (zn = !1, Yn = 0, 25 <= i)
        throw Error(y(301));
      i += 1, J = X = null, t.updateQueue = null, Tr.current = Ed, e = n(r, l);
    } while (zn);
  }
  if (Tr.current = el, t = X !== null && X.next !== null, Lt = 0, J = X = V = null, br = !1, t)
    throw Error(y(300));
  return e;
}
function Lo() {
  var e = Yn !== 0;
  return Yn = 0, e;
}
function Fe() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return J === null ? V.memoizedState = J = e : J = J.next = e, J;
}
function _e() {
  if (X === null) {
    var e = V.alternate;
    e = e !== null ? e.memoizedState : null;
  } else
    e = X.next;
  var t = J === null ? V.memoizedState : J.next;
  if (t !== null)
    J = t, X = e;
  else {
    if (e === null)
      throw Error(y(310));
    X = e, e = { memoizedState: X.memoizedState, baseState: X.baseState, baseQueue: X.baseQueue, queue: X.queue, next: null }, J === null ? V.memoizedState = J = e : J = J.next = e;
  }
  return J;
}
function Gn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Yl(e) {
  var t = _e(), n = t.queue;
  if (n === null)
    throw Error(y(311));
  n.lastRenderedReducer = e;
  var r = X, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var u = o = null, s = null, c = i;
    do {
      var m = c.lane;
      if ((Lt & m) === m)
        s !== null && (s = s.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var v = {
          lane: m,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        s === null ? (u = s = v, o = r) : s = s.next = v, V.lanes |= m, Rt |= m;
      }
      c = c.next;
    } while (c !== null && c !== i);
    s === null ? o = r : s.next = u, Oe(r, t.memoizedState) || (de = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, V.lanes |= i, Rt |= i, l = l.next;
    while (l !== e);
  } else
    l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Gl(e) {
  var t = _e(), n = t.queue;
  if (n === null)
    throw Error(y(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    Oe(i, t.memoizedState) || (de = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function La() {
}
function Ra(e, t) {
  var n = V, r = _e(), l = t(), i = !Oe(r.memoizedState, l);
  if (i && (r.memoizedState = l, de = !0), r = r.queue, Ro(Da.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || J !== null && J.memoizedState.tag & 1) {
    if (n.flags |= 2048, Xn(9, Oa.bind(null, n, r, l, t), void 0, null), b === null)
      throw Error(y(349));
    Lt & 30 || Ma(n, t, l);
  }
  return l;
}
function Ma(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = V.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, V.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Oa(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Fa(t) && Ia(e);
}
function Da(e, t, n) {
  return n(function() {
    Fa(t) && Ia(e);
  });
}
function Fa(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Oe(e, n);
  } catch {
    return !0;
  }
}
function Ia(e) {
  var t = Ge(e, 1);
  t !== null && Me(t, e, 1, -1);
}
function Ou(e) {
  var t = Fe();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Gn, lastRenderedState: e }, t.queue = e, e = e.dispatch = Nd.bind(null, V, e), [t.memoizedState, e];
}
function Xn(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = V.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, V.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ua() {
  return _e().memoizedState;
}
function zr(e, t, n, r) {
  var l = Fe();
  V.flags |= e, l.memoizedState = Xn(1 | t, n, void 0, r === void 0 ? null : r);
}
function vl(e, t, n, r) {
  var l = _e();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (X !== null) {
    var o = X.memoizedState;
    if (i = o.destroy, r !== null && To(r, o.deps)) {
      l.memoizedState = Xn(t, n, i, r);
      return;
    }
  }
  V.flags |= e, l.memoizedState = Xn(1 | t, n, i, r);
}
function Du(e, t) {
  return zr(8390656, 8, e, t);
}
function Ro(e, t) {
  return vl(2048, 8, e, t);
}
function Aa(e, t) {
  return vl(4, 2, e, t);
}
function $a(e, t) {
  return vl(4, 4, e, t);
}
function Ba(e, t) {
  if (typeof t == "function")
    return e = e(), t(e), function() {
      t(null);
    };
  if (t != null)
    return e = e(), t.current = e, function() {
      t.current = null;
    };
}
function Va(e, t, n) {
  return n = n != null ? n.concat([e]) : null, vl(4, 4, Ba.bind(null, t, e), n);
}
function Mo() {
}
function Ha(e, t) {
  var n = _e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && To(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Qa(e, t) {
  var n = _e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && To(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Wa(e, t, n) {
  return Lt & 21 ? (Oe(n, t) || (n = Gs(), V.lanes |= n, Rt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, de = !0), e.memoizedState = n);
}
function Sd(e, t) {
  var n = O;
  O = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Kl.transition;
  Kl.transition = {};
  try {
    e(!1), t();
  } finally {
    O = n, Kl.transition = r;
  }
}
function Ka() {
  return _e().memoizedState;
}
function kd(e, t, n) {
  var r = pt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Ya(e))
    Ga(t, n);
  else if (n = ja(e, t, n, r), n !== null) {
    var l = se();
    Me(n, e, r, l), Xa(n, t, r);
  }
}
function Nd(e, t, n) {
  var r = pt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Ya(e))
    Ga(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
      try {
        var o = t.lastRenderedState, u = i(o, n);
        if (l.hasEagerState = !0, l.eagerState = u, Oe(u, o)) {
          var s = t.interleaved;
          s === null ? (l.next = l, jo(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
          return;
        }
      } catch {
      } finally {
      }
    n = ja(e, t, l, r), n !== null && (l = se(), Me(n, e, r, l), Xa(n, t, r));
  }
}
function Ya(e) {
  var t = e.alternate;
  return e === V || t !== null && t === V;
}
function Ga(e, t) {
  zn = br = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Xa(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ao(e, n);
  }
}
var el = { readContext: Ee, useCallback: re, useContext: re, useEffect: re, useImperativeHandle: re, useInsertionEffect: re, useLayoutEffect: re, useMemo: re, useReducer: re, useRef: re, useState: re, useDebugValue: re, useDeferredValue: re, useTransition: re, useMutableSource: re, useSyncExternalStore: re, useId: re, unstable_isNewReconciler: !1 }, jd = { readContext: Ee, useCallback: function(e, t) {
  return Fe().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Ee, useEffect: Du, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, zr(
    4194308,
    4,
    Ba.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return zr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return zr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Fe();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Fe();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = kd.bind(null, V, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Fe();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ou, useDebugValue: Mo, useDeferredValue: function(e) {
  return Fe().memoizedState = e;
}, useTransition: function() {
  var e = Ou(!1), t = e[0];
  return e = Sd.bind(null, e[1]), Fe().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = V, l = Fe();
  if ($) {
    if (n === void 0)
      throw Error(y(407));
    n = n();
  } else {
    if (n = t(), b === null)
      throw Error(y(349));
    Lt & 30 || Ma(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Du(Da.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, Xn(9, Oa.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Fe(), t = b.identifierPrefix;
  if ($) {
    var n = Qe, r = He;
    n = (r & ~(1 << 32 - Re(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Yn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else
    n = xd++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Cd = {
  readContext: Ee,
  useCallback: Ha,
  useContext: Ee,
  useEffect: Ro,
  useImperativeHandle: Va,
  useInsertionEffect: Aa,
  useLayoutEffect: $a,
  useMemo: Qa,
  useReducer: Yl,
  useRef: Ua,
  useState: function() {
    return Yl(Gn);
  },
  useDebugValue: Mo,
  useDeferredValue: function(e) {
    var t = _e();
    return Wa(t, X.memoizedState, e);
  },
  useTransition: function() {
    var e = Yl(Gn)[0], t = _e().memoizedState;
    return [e, t];
  },
  useMutableSource: La,
  useSyncExternalStore: Ra,
  useId: Ka,
  unstable_isNewReconciler: !1
}, Ed = { readContext: Ee, useCallback: Ha, useContext: Ee, useEffect: Ro, useImperativeHandle: Va, useInsertionEffect: Aa, useLayoutEffect: $a, useMemo: Qa, useReducer: Gl, useRef: Ua, useState: function() {
  return Gl(Gn);
}, useDebugValue: Mo, useDeferredValue: function(e) {
  var t = _e();
  return X === null ? t.memoizedState = e : Wa(t, X.memoizedState, e);
}, useTransition: function() {
  var e = Gl(Gn)[0], t = _e().memoizedState;
  return [e, t];
}, useMutableSource: La, useSyncExternalStore: Ra, useId: Ka, unstable_isNewReconciler: !1 };
function un(e, t) {
  try {
    var n = "", r = t;
    do
      n += bc(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Xl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Di(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var _d = typeof WeakMap == "function" ? WeakMap : Map;
function Za(e, t, n) {
  n = We(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    nl || (nl = !0, Wi = r), Di(e, t);
  }, n;
}
function qa(e, t, n) {
  n = We(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Di(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Di(e, t), typeof r != "function" && (dt === null ? dt = /* @__PURE__ */ new Set([this]) : dt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Fu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new _d();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else
    l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Bd.bind(null, e, t, n), t.then(e, e));
}
function Iu(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Uu(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = We(-1, 1), t.tag = 2, ft(n, t, 1))), n.lanes |= 1), e);
}
var Pd = Ze.ReactCurrentOwner, de = !1;
function ue(e, t, n, r) {
  t.child = e === null ? Ta(t, null, n, r) : ln(t, e.child, n, r);
}
function Au(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return bt(t, l), r = zo(e, t, n, r, i, l), n = Lo(), e !== null && !de ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Xe(e, t, l)) : ($ && n && yo(t), t.flags |= 1, ue(e, t, r, l), t.child);
}
function $u(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Bo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Ja(e, t, i, r, l)) : (e = Or(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Bn, n(o, r) && e.ref === t.ref)
      return Xe(e, t, l);
  }
  return t.flags |= 1, e = mt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Ja(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Bn(i, r) && e.ref === t.ref)
      if (de = !1, t.pendingProps = r = i, (e.lanes & l) !== 0)
        e.flags & 131072 && (de = !0);
      else
        return t.lanes = e.lanes, Xe(e, t, l);
  }
  return Fi(e, t, n, r, l);
}
function ba(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, F(Gt, ve), ve |= n;
    else {
      if (!(n & 1073741824))
        return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, F(Gt, ve), ve |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, F(Gt, ve), ve |= r;
    }
  else
    i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, F(Gt, ve), ve |= r;
  return ue(e, t, l, n), t.child;
}
function ec(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Fi(e, t, n, r, l) {
  var i = me(n) ? Tt : oe.current;
  return i = nn(t, i), bt(t, l), n = zo(e, t, n, r, i, l), r = Lo(), e !== null && !de ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Xe(e, t, l)) : ($ && r && yo(t), t.flags |= 1, ue(e, t, n, l), t.child);
}
function Bu(e, t, n, r, l) {
  if (me(n)) {
    var i = !0;
    Kr(t);
  } else
    i = !1;
  if (bt(t, l), t.stateNode === null)
    Lr(e, t), _a(t, n, r), Oi(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, u = t.memoizedProps;
    o.props = u;
    var s = o.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Ee(c) : (c = me(n) ? Tt : oe.current, c = nn(t, c));
    var m = n.getDerivedStateFromProps, v = typeof m == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    v || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== r || s !== c) && Ru(t, o, r, c), nt = !1;
    var h = t.memoizedState;
    o.state = h, qr(t, r, o, l), s = t.memoizedState, u !== r || h !== s || pe.current || nt ? (typeof m == "function" && (Mi(t, n, m, r), s = t.memoizedState), (u = nt || Lu(t, n, u, r, h, s, c)) ? (v || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), o.props = r, o.state = s, o.context = c, r = u) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, Ca(e, t), u = t.memoizedProps, c = t.type === t.elementType ? u : Te(t.type, u), o.props = c, v = t.pendingProps, h = o.context, s = n.contextType, typeof s == "object" && s !== null ? s = Ee(s) : (s = me(n) ? Tt : oe.current, s = nn(t, s));
    var w = n.getDerivedStateFromProps;
    (m = typeof w == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== v || h !== s) && Ru(t, o, r, s), nt = !1, h = t.memoizedState, o.state = h, qr(t, r, o, l);
    var x = t.memoizedState;
    u !== v || h !== x || pe.current || nt ? (typeof w == "function" && (Mi(t, n, w, r), x = t.memoizedState), (c = nt || Lu(t, n, c, r, h, x, s) || !1) ? (m || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, x, s), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, x, s)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = x), o.props = r, o.state = x, o.context = s, r = c) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Ii(e, t, n, r, i, l);
}
function Ii(e, t, n, r, l, i) {
  ec(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o)
    return l && Eu(t, n, !1), Xe(e, t, i);
  r = t.stateNode, Pd.current = t;
  var u = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = ln(t, e.child, null, i), t.child = ln(t, null, u, i)) : ue(e, t, u, i), t.memoizedState = r.state, l && Eu(t, n, !0), t.child;
}
function tc(e) {
  var t = e.stateNode;
  t.pendingContext ? Cu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Cu(e, t.context, !1), Eo(e, t.containerInfo);
}
function Vu(e, t, n, r, l) {
  return rn(), xo(l), t.flags |= 256, ue(e, t, n, r), t.child;
}
var Ui = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ai(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function nc(e, t, n) {
  var r = t.pendingProps, l = B.current, i = !1, o = (t.flags & 128) !== 0, u;
  if ((u = o) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), F(B, l & 1), e === null)
    return Li(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = wl(o, r, 0, null), e = Pt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Ai(n), t.memoizedState = Ui, e) : Oo(t, o));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null))
    return Td(e, t, o, r, u, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, u = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = mt(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? i = mt(u, i) : (i = Pt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Ai(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = Ui, r;
  }
  return i = e.child, e = i.sibling, r = mt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Oo(e, t) {
  return t = wl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function yr(e, t, n, r) {
  return r !== null && xo(r), ln(t, e.child, null, n), e = Oo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Td(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Xl(Error(y(422))), yr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = wl({ mode: "visible", children: r.children }, l, 0, null), i = Pt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && ln(t, e.child, null, o), t.child.memoizedState = Ai(o), t.memoizedState = Ui, i);
  if (!(t.mode & 1))
    return yr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r)
      var u = r.dgst;
    return r = u, i = Error(y(419)), r = Xl(i, r, void 0), yr(e, t, o, r);
  }
  if (u = (o & e.childLanes) !== 0, de || u) {
    if (r = b, r !== null) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Ge(e, l), Me(r, e, l, -1));
    }
    return $o(), r = Xl(Error(y(421))), yr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Vd.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, ge = ct(l.nextSibling), ye = t, $ = !0, Le = null, e !== null && (ke[Ne++] = He, ke[Ne++] = Qe, ke[Ne++] = zt, He = e.id, Qe = e.overflow, zt = t), t = Oo(t, r.children), t.flags |= 4096, t);
}
function Hu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ri(e.return, t, n);
}
function Zl(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function rc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (ue(e, t, r.children, n), r = B.current, r & 2)
    r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128)
      e:
        for (e = t.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && Hu(e, n, t);
          else if (e.tag === 19)
            Hu(e, n, t);
          else if (e.child !== null) {
            e.child.return = e, e = e.child;
            continue;
          }
          if (e === t)
            break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t)
              break e;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
    r &= 1;
  }
  if (F(B, r), !(t.mode & 1))
    t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          e = n.alternate, e !== null && Jr(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Zl(t, !1, l, n, i);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && Jr(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        Zl(t, !0, n, null, i);
        break;
      case "together":
        Zl(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Lr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Xe(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Rt |= t.lanes, !(n & t.childLanes))
    return null;
  if (e !== null && t.child !== e.child)
    throw Error(y(153));
  if (t.child !== null) {
    for (e = t.child, n = mt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      e = e.sibling, n = n.sibling = mt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function zd(e, t, n) {
  switch (t.tag) {
    case 3:
      tc(t), rn();
      break;
    case 5:
      za(t);
      break;
    case 1:
      me(t.type) && Kr(t);
      break;
    case 4:
      Eo(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      F(Xr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (F(B, B.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? nc(e, t, n) : (F(B, B.current & 1), e = Xe(e, t, n), e !== null ? e.sibling : null);
      F(B, B.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r)
          return rc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), F(B, B.current), r)
        break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, ba(e, t, n);
  }
  return Xe(e, t, n);
}
var lc, $i, ic, oc;
lc = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6)
      e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t)
      break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t)
        return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
$i = function() {
};
ic = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Et(Ae.current);
    var i = null;
    switch (n) {
      case "input":
        l = si(e, l), r = si(e, r), i = [];
        break;
      case "select":
        l = H({}, l, { value: void 0 }), r = H({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = fi(e, l), r = fi(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Qr);
    }
    pi(n, r);
    var o;
    n = null;
    for (c in l)
      if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
        if (c === "style") {
          var u = l[c];
          for (o in u)
            u.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
        } else
          c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (On.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in r) {
      var s = r[c];
      if (u = l != null ? l[c] : void 0, r.hasOwnProperty(c) && s !== u && (s != null || u != null))
        if (c === "style")
          if (u) {
            for (o in u)
              !u.hasOwnProperty(o) || s && s.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
            for (o in s)
              s.hasOwnProperty(o) && u[o] !== s[o] && (n || (n = {}), n[o] = s[o]);
          } else
            n || (i || (i = []), i.push(
              c,
              n
            )), n = s;
        else
          c === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (i = i || []).push(c, s)) : c === "children" ? typeof s != "string" && typeof s != "number" || (i = i || []).push(c, "" + s) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (On.hasOwnProperty(c) ? (s != null && c === "onScroll" && I("scroll", e), i || u === s || (i = [])) : (i = i || []).push(c, s));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
oc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function wn(e, t) {
  if (!$)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), n = n.sibling;
        r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
    }
}
function le(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else
    for (l = e.child; l !== null; )
      n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Ld(e, t, n) {
  var r = t.pendingProps;
  switch (wo(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return le(t), null;
    case 1:
      return me(t.type) && Wr(), le(t), null;
    case 3:
      return r = t.stateNode, on(), A(pe), A(oe), Po(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (vr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Le !== null && (Gi(Le), Le = null))), $i(e, t), le(t), null;
    case 5:
      _o(t);
      var l = Et(Kn.current);
      if (n = t.type, e !== null && t.stateNode != null)
        ic(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null)
            throw Error(y(166));
          return le(t), null;
        }
        if (e = Et(Ae.current), vr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ie] = t, r[Qn] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              I("cancel", r), I("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              I("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < jn.length; l++)
                I(jn[l], r);
              break;
            case "source":
              I("error", r);
              break;
            case "img":
            case "image":
            case "link":
              I(
                "error",
                r
              ), I("load", r);
              break;
            case "details":
              I("toggle", r);
              break;
            case "input":
              Jo(r, i), I("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, I("invalid", r);
              break;
            case "textarea":
              eu(r, i), I("invalid", r);
          }
          pi(n, i), l = null;
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var u = i[o];
              o === "children" ? typeof u == "string" ? r.textContent !== u && (i.suppressHydrationWarning !== !0 && hr(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (i.suppressHydrationWarning !== !0 && hr(
                r.textContent,
                u,
                e
              ), l = ["children", "" + u]) : On.hasOwnProperty(o) && u != null && o === "onScroll" && I("scroll", r);
            }
          switch (n) {
            case "input":
              ur(r), bo(r, i, !0);
              break;
            case "textarea":
              ur(r), tu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Qr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ms(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ie] = t, e[Qn] = r, lc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = mi(n, r), n) {
              case "dialog":
                I("cancel", e), I("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                I("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < jn.length; l++)
                  I(jn[l], e);
                l = r;
                break;
              case "source":
                I("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                I(
                  "error",
                  e
                ), I("load", e), l = r;
                break;
              case "details":
                I("toggle", e), l = r;
                break;
              case "input":
                Jo(e, r), l = si(e, r), I("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = H({}, r, { value: void 0 }), I("invalid", e);
                break;
              case "textarea":
                eu(e, r), l = fi(e, r), I("invalid", e);
                break;
              default:
                l = r;
            }
            pi(n, l), u = l;
            for (i in u)
              if (u.hasOwnProperty(i)) {
                var s = u[i];
                i === "style" ? Fs(e, s) : i === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Os(e, s)) : i === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Dn(e, s) : typeof s == "number" && Dn(e, "" + s) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (On.hasOwnProperty(i) ? s != null && i === "onScroll" && I("scroll", e) : s != null && ro(e, i, s, o));
              }
            switch (n) {
              case "input":
                ur(e), bo(e, r, !1);
                break;
              case "textarea":
                ur(e), tu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + ht(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? Xt(e, !!r.multiple, i, !1) : r.defaultValue != null && Xt(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Qr);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return le(t), null;
    case 6:
      if (e && t.stateNode != null)
        oc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null)
          throw Error(y(166));
        if (n = Et(Kn.current), Et(Ae.current), vr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ie] = t, (i = r.nodeValue !== n) && (e = ye, e !== null))
            switch (e.tag) {
              case 3:
                hr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && hr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ie] = t, t.stateNode = r;
      }
      return le(t), null;
    case 13:
      if (A(B), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if ($ && ge !== null && t.mode & 1 && !(t.flags & 128))
          Na(), rn(), t.flags |= 98560, i = !1;
        else if (i = vr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i)
              throw Error(y(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i)
              throw Error(y(317));
            i[Ie] = t;
          } else
            rn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          le(t), i = !1;
        } else
          Le !== null && (Gi(Le), Le = null), i = !0;
        if (!i)
          return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || B.current & 1 ? Z === 0 && (Z = 3) : $o())), t.updateQueue !== null && (t.flags |= 4), le(t), null);
    case 4:
      return on(), $i(e, t), e === null && Vn(t.stateNode.containerInfo), le(t), null;
    case 10:
      return No(t.type._context), le(t), null;
    case 17:
      return me(t.type) && Wr(), le(t), null;
    case 19:
      if (A(B), i = t.memoizedState, i === null)
        return le(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null)
        if (r)
          wn(i, !1);
        else {
          if (Z !== 0 || e !== null && e.flags & 128)
            for (e = t.child; e !== null; ) {
              if (o = Jr(e), o !== null) {
                for (t.flags |= 128, wn(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; )
                  i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
                return F(B, B.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null && K() > sn && (t.flags |= 128, r = !0, wn(i, !1), t.lanes = 4194304);
        }
      else {
        if (!r)
          if (e = Jr(o), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), wn(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !$)
              return le(t), null;
          } else
            2 * K() - i.renderingStartTime > sn && n !== 1073741824 && (t.flags |= 128, r = !0, wn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = K(), t.sibling = null, n = B.current, F(B, r ? n & 1 | 2 : n & 1), t) : (le(t), null);
    case 22:
    case 23:
      return Ao(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ve & 1073741824 && (le(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : le(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(y(156, t.tag));
}
function Rd(e, t) {
  switch (wo(t), t.tag) {
    case 1:
      return me(t.type) && Wr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return on(), A(pe), A(oe), Po(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return _o(t), null;
    case 13:
      if (A(B), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(y(340));
        rn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return A(B), null;
    case 4:
      return on(), null;
    case 10:
      return No(t.type._context), null;
    case 22:
    case 23:
      return Ao(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var wr = !1, ie = !1, Md = typeof WeakSet == "function" ? WeakSet : Set, N = null;
function Yt(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Q(e, t, r);
      }
    else
      n.current = null;
}
function Bi(e, t, n) {
  try {
    n();
  } catch (r) {
    Q(e, t, r);
  }
}
var Qu = !1;
function Od(e, t) {
  if (ji = Br, e = ca(), go(e)) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset, i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var o = 0, u = -1, s = -1, c = 0, m = 0, v = e, h = null;
          t:
            for (; ; ) {
              for (var w; v !== n || l !== 0 && v.nodeType !== 3 || (u = o + l), v !== i || r !== 0 && v.nodeType !== 3 || (s = o + r), v.nodeType === 3 && (o += v.nodeValue.length), (w = v.firstChild) !== null; )
                h = v, v = w;
              for (; ; ) {
                if (v === e)
                  break t;
                if (h === n && ++c === l && (u = o), h === i && ++m === r && (s = o), (w = v.nextSibling) !== null)
                  break;
                v = h, h = v.parentNode;
              }
              v = w;
            }
          n = u === -1 || s === -1 ? null : { start: u, end: s };
        } else
          n = null;
      }
    n = n || { start: 0, end: 0 };
  } else
    n = null;
  for (Ci = { focusedElem: e, selectionRange: n }, Br = !1, N = t; N !== null; )
    if (t = N, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
      e.return = t, N = e;
    else
      for (; N !== null; ) {
        t = N;
        try {
          var x = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (x !== null) {
                  var S = x.memoizedProps, D = x.memoizedState, d = t.stateNode, f = d.getSnapshotBeforeUpdate(t.elementType === t.type ? S : Te(t.type, S), D);
                  d.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var p = t.stateNode.containerInfo;
                p.nodeType === 1 ? p.textContent = "" : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(y(163));
            }
        } catch (g) {
          Q(t, t.return, g);
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, N = e;
          break;
        }
        N = t.return;
      }
  return x = Qu, Qu = !1, x;
}
function Ln(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Bi(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function gl(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Vi(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function uc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, uc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ie], delete t[Qn], delete t[Pi], delete t[vd], delete t[gd])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function sc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Wu(e) {
  e:
    for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || sc(e.return))
          return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2))
        return e.stateNode;
    }
}
function Hi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Qr));
  else if (r !== 4 && (e = e.child, e !== null))
    for (Hi(e, t, n), e = e.sibling; e !== null; )
      Hi(e, t, n), e = e.sibling;
}
function Qi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null))
    for (Qi(e, t, n), e = e.sibling; e !== null; )
      Qi(e, t, n), e = e.sibling;
}
var ee = null, ze = !1;
function et(e, t, n) {
  for (n = n.child; n !== null; )
    ac(e, t, n), n = n.sibling;
}
function ac(e, t, n) {
  if (Ue && typeof Ue.onCommitFiberUnmount == "function")
    try {
      Ue.onCommitFiberUnmount(al, n);
    } catch {
    }
  switch (n.tag) {
    case 5:
      ie || Yt(n, t);
    case 6:
      var r = ee, l = ze;
      ee = null, et(e, t, n), ee = r, ze = l, ee !== null && (ze ? (e = ee, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ee.removeChild(n.stateNode));
      break;
    case 18:
      ee !== null && (ze ? (e = ee, n = n.stateNode, e.nodeType === 8 ? Hl(e.parentNode, n) : e.nodeType === 1 && Hl(e, n), An(e)) : Hl(ee, n.stateNode));
      break;
    case 4:
      r = ee, l = ze, ee = n.stateNode.containerInfo, ze = !0, et(e, t, n), ee = r, ze = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ie && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Bi(n, t, o), l = l.next;
        } while (l !== r);
      }
      et(e, t, n);
      break;
    case 1:
      if (!ie && (Yt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
        try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (u) {
          Q(n, t, u);
        }
      et(e, t, n);
      break;
    case 21:
      et(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ie = (r = ie) || n.memoizedState !== null, et(e, t, n), ie = r) : et(e, t, n);
      break;
    default:
      et(e, t, n);
  }
}
function Ku(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Md()), t.forEach(function(r) {
      var l = Hd.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Pe(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e, o = t, u = o;
        e:
          for (; u !== null; ) {
            switch (u.tag) {
              case 5:
                ee = u.stateNode, ze = !1;
                break e;
              case 3:
                ee = u.stateNode.containerInfo, ze = !0;
                break e;
              case 4:
                ee = u.stateNode.containerInfo, ze = !0;
                break e;
            }
            u = u.return;
          }
        if (ee === null)
          throw Error(y(160));
        ac(i, o, l), ee = null, ze = !1;
        var s = l.alternate;
        s !== null && (s.return = null), l.return = null;
      } catch (c) {
        Q(l, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; )
      cc(t, e), t = t.sibling;
}
function cc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Pe(t, e), De(e), r & 4) {
        try {
          Ln(3, e, e.return), gl(3, e);
        } catch (S) {
          Q(e, e.return, S);
        }
        try {
          Ln(5, e, e.return);
        } catch (S) {
          Q(e, e.return, S);
        }
      }
      break;
    case 1:
      Pe(t, e), De(e), r & 512 && n !== null && Yt(n, n.return);
      break;
    case 5:
      if (Pe(t, e), De(e), r & 512 && n !== null && Yt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Dn(l, "");
        } catch (S) {
          Q(e, e.return, S);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, u = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null)
          try {
            u === "input" && i.type === "radio" && i.name != null && Ls(l, i), mi(u, o);
            var c = mi(u, i);
            for (o = 0; o < s.length; o += 2) {
              var m = s[o], v = s[o + 1];
              m === "style" ? Fs(l, v) : m === "dangerouslySetInnerHTML" ? Os(l, v) : m === "children" ? Dn(l, v) : ro(l, m, v, c);
            }
            switch (u) {
              case "input":
                ai(l, i);
                break;
              case "textarea":
                Rs(l, i);
                break;
              case "select":
                var h = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var w = i.value;
                w != null ? Xt(l, !!i.multiple, w, !1) : h !== !!i.multiple && (i.defaultValue != null ? Xt(
                  l,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                ) : Xt(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[Qn] = i;
          } catch (S) {
            Q(e, e.return, S);
          }
      }
      break;
    case 6:
      if (Pe(t, e), De(e), r & 4) {
        if (e.stateNode === null)
          throw Error(y(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (S) {
          Q(e, e.return, S);
        }
      }
      break;
    case 3:
      if (Pe(t, e), De(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        try {
          An(t.containerInfo);
        } catch (S) {
          Q(e, e.return, S);
        }
      break;
    case 4:
      Pe(t, e), De(e);
      break;
    case 13:
      Pe(t, e), De(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Io = K())), r & 4 && Ku(e);
      break;
    case 22:
      if (m = n !== null && n.memoizedState !== null, e.mode & 1 ? (ie = (c = ie) || m, Pe(t, e), ie = c) : Pe(t, e), De(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !m && e.mode & 1)
          for (N = e, m = e.child; m !== null; ) {
            for (v = N = m; N !== null; ) {
              switch (h = N, w = h.child, h.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ln(4, h, h.return);
                  break;
                case 1:
                  Yt(h, h.return);
                  var x = h.stateNode;
                  if (typeof x.componentWillUnmount == "function") {
                    r = h, n = h.return;
                    try {
                      t = r, x.props = t.memoizedProps, x.state = t.memoizedState, x.componentWillUnmount();
                    } catch (S) {
                      Q(r, n, S);
                    }
                  }
                  break;
                case 5:
                  Yt(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    Gu(v);
                    continue;
                  }
              }
              w !== null ? (w.return = h, N = w) : Gu(v);
            }
            m = m.sibling;
          }
        e:
          for (m = null, v = e; ; ) {
            if (v.tag === 5) {
              if (m === null) {
                m = v;
                try {
                  l = v.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (u = v.stateNode, s = v.memoizedProps.style, o = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = Ds("display", o));
                } catch (S) {
                  Q(e, e.return, S);
                }
              }
            } else if (v.tag === 6) {
              if (m === null)
                try {
                  v.stateNode.nodeValue = c ? "" : v.memoizedProps;
                } catch (S) {
                  Q(e, e.return, S);
                }
            } else if ((v.tag !== 22 && v.tag !== 23 || v.memoizedState === null || v === e) && v.child !== null) {
              v.child.return = v, v = v.child;
              continue;
            }
            if (v === e)
              break e;
            for (; v.sibling === null; ) {
              if (v.return === null || v.return === e)
                break e;
              m === v && (m = null), v = v.return;
            }
            m === v && (m = null), v.sibling.return = v.return, v = v.sibling;
          }
      }
      break;
    case 19:
      Pe(t, e), De(e), r & 4 && Ku(e);
      break;
    case 21:
      break;
    default:
      Pe(
        t,
        e
      ), De(e);
  }
}
function De(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (sc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(y(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Dn(l, ""), r.flags &= -33);
          var i = Wu(e);
          Qi(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, u = Wu(e);
          Hi(e, u, o);
          break;
        default:
          throw Error(y(161));
      }
    } catch (s) {
      Q(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Dd(e, t, n) {
  N = e, fc(e);
}
function fc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; N !== null; ) {
    var l = N, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || wr;
      if (!o) {
        var u = l.alternate, s = u !== null && u.memoizedState !== null || ie;
        u = wr;
        var c = ie;
        if (wr = o, (ie = s) && !c)
          for (N = l; N !== null; )
            o = N, s = o.child, o.tag === 22 && o.memoizedState !== null ? Xu(l) : s !== null ? (s.return = o, N = s) : Xu(l);
        for (; i !== null; )
          N = i, fc(i), i = i.sibling;
        N = l, wr = u, ie = c;
      }
      Yu(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? (i.return = l, N = i) : Yu(e);
  }
}
function Yu(e) {
  for (; N !== null; ) {
    var t = N;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ie || gl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ie)
                if (n === null)
                  r.componentDidMount();
                else {
                  var l = t.elementType === t.type ? n.memoizedProps : Te(t.type, n.memoizedProps);
                  r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var i = t.updateQueue;
              i !== null && zu(t, i, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (n = null, t.child !== null)
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                zu(t, o, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && n.focus();
                    break;
                  case "img":
                    s.src && (n.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var c = t.alternate;
                if (c !== null) {
                  var m = c.memoizedState;
                  if (m !== null) {
                    var v = m.dehydrated;
                    v !== null && An(v);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(y(163));
          }
        ie || t.flags & 512 && Vi(t);
      } catch (h) {
        Q(t, t.return, h);
      }
    }
    if (t === e) {
      N = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, N = n;
      break;
    }
    N = t.return;
  }
}
function Gu(e) {
  for (; N !== null; ) {
    var t = N;
    if (t === e) {
      N = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, N = n;
      break;
    }
    N = t.return;
  }
}
function Xu(e) {
  for (; N !== null; ) {
    var t = N;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            gl(4, t);
          } catch (s) {
            Q(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              Q(t, l, s);
            }
          }
          var i = t.return;
          try {
            Vi(t);
          } catch (s) {
            Q(t, i, s);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Vi(t);
          } catch (s) {
            Q(t, o, s);
          }
      }
    } catch (s) {
      Q(t, t.return, s);
    }
    if (t === e) {
      N = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      u.return = t.return, N = u;
      break;
    }
    N = t.return;
  }
}
var Fd = Math.ceil, tl = Ze.ReactCurrentDispatcher, Do = Ze.ReactCurrentOwner, Ce = Ze.ReactCurrentBatchConfig, M = 0, b = null, G = null, te = 0, ve = 0, Gt = yt(0), Z = 0, Zn = null, Rt = 0, yl = 0, Fo = 0, Rn = null, fe = null, Io = 0, sn = 1 / 0, $e = null, nl = !1, Wi = null, dt = null, xr = !1, ot = null, rl = 0, Mn = 0, Ki = null, Rr = -1, Mr = 0;
function se() {
  return M & 6 ? K() : Rr !== -1 ? Rr : Rr = K();
}
function pt(e) {
  return e.mode & 1 ? M & 2 && te !== 0 ? te & -te : wd.transition !== null ? (Mr === 0 && (Mr = Gs()), Mr) : (e = O, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ta(e.type)), e) : 1;
}
function Me(e, t, n, r) {
  if (50 < Mn)
    throw Mn = 0, Ki = null, Error(y(185));
  Jn(e, n, r), (!(M & 2) || e !== b) && (e === b && (!(M & 2) && (yl |= n), Z === 4 && lt(e, te)), he(e, r), n === 1 && M === 0 && !(t.mode & 1) && (sn = K() + 500, ml && wt()));
}
function he(e, t) {
  var n = e.callbackNode;
  wf(e, t);
  var r = $r(e, e === b ? te : 0);
  if (r === 0)
    n !== null && lu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && lu(n), t === 1)
      e.tag === 0 ? yd(Zu.bind(null, e)) : xa(Zu.bind(null, e)), md(function() {
        !(M & 6) && wt();
      }), n = null;
    else {
      switch (Xs(r)) {
        case 1:
          n = so;
          break;
        case 4:
          n = Ks;
          break;
        case 16:
          n = Ar;
          break;
        case 536870912:
          n = Ys;
          break;
        default:
          n = Ar;
      }
      n = wc(n, dc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function dc(e, t) {
  if (Rr = -1, Mr = 0, M & 6)
    throw Error(y(327));
  var n = e.callbackNode;
  if (en() && e.callbackNode !== n)
    return null;
  var r = $r(e, e === b ? te : 0);
  if (r === 0)
    return null;
  if (r & 30 || r & e.expiredLanes || t)
    t = ll(e, r);
  else {
    t = r;
    var l = M;
    M |= 2;
    var i = mc();
    (b !== e || te !== t) && ($e = null, sn = K() + 500, _t(e, t));
    do
      try {
        Ad();
        break;
      } catch (u) {
        pc(e, u);
      }
    while (!0);
    ko(), tl.current = i, M = l, G !== null ? t = 0 : (b = null, te = 0, t = Z);
  }
  if (t !== 0) {
    if (t === 2 && (l = wi(e), l !== 0 && (r = l, t = Yi(e, l))), t === 1)
      throw n = Zn, _t(e, 0), lt(e, r), he(e, K()), n;
    if (t === 6)
      lt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Id(l) && (t = ll(e, r), t === 2 && (i = wi(e), i !== 0 && (r = i, t = Yi(e, i))), t === 1))
        throw n = Zn, _t(e, 0), lt(e, r), he(e, K()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(y(345));
        case 2:
          Nt(e, fe, $e);
          break;
        case 3:
          if (lt(e, r), (r & 130023424) === r && (t = Io + 500 - K(), 10 < t)) {
            if ($r(e, 0) !== 0)
              break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              se(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = _i(Nt.bind(null, e, fe, $e), t);
            break;
          }
          Nt(e, fe, $e);
          break;
        case 4:
          if (lt(e, r), (r & 4194240) === r)
            break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Re(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = K() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Fd(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = _i(Nt.bind(null, e, fe, $e), r);
            break;
          }
          Nt(e, fe, $e);
          break;
        case 5:
          Nt(e, fe, $e);
          break;
        default:
          throw Error(y(329));
      }
    }
  }
  return he(e, K()), e.callbackNode === n ? dc.bind(null, e) : null;
}
function Yi(e, t) {
  var n = Rn;
  return e.current.memoizedState.isDehydrated && (_t(e, t).flags |= 256), e = ll(e, t), e !== 2 && (t = fe, fe = n, t !== null && Gi(t)), e;
}
function Gi(e) {
  fe === null ? fe = e : fe.push.apply(fe, e);
}
function Id(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r], i = l.getSnapshot;
          l = l.value;
          try {
            if (!Oe(i(), l))
              return !1;
          } catch {
            return !1;
          }
        }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null)
      n.return = t, t = n;
    else {
      if (t === e)
        break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e)
          return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function lt(e, t) {
  for (t &= ~Fo, t &= ~yl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Re(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Zu(e) {
  if (M & 6)
    throw Error(y(327));
  en();
  var t = $r(e, 0);
  if (!(t & 1))
    return he(e, K()), null;
  var n = ll(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = wi(e);
    r !== 0 && (t = r, n = Yi(e, r));
  }
  if (n === 1)
    throw n = Zn, _t(e, 0), lt(e, t), he(e, K()), n;
  if (n === 6)
    throw Error(y(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Nt(e, fe, $e), he(e, K()), null;
}
function Uo(e, t) {
  var n = M;
  M |= 1;
  try {
    return e(t);
  } finally {
    M = n, M === 0 && (sn = K() + 500, ml && wt());
  }
}
function Mt(e) {
  ot !== null && ot.tag === 0 && !(M & 6) && en();
  var t = M;
  M |= 1;
  var n = Ce.transition, r = O;
  try {
    if (Ce.transition = null, O = 1, e)
      return e();
  } finally {
    O = r, Ce.transition = n, M = t, !(M & 6) && wt();
  }
}
function Ao() {
  ve = Gt.current, A(Gt);
}
function _t(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, pd(n)), G !== null)
    for (n = G.return; n !== null; ) {
      var r = n;
      switch (wo(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Wr();
          break;
        case 3:
          on(), A(pe), A(oe), Po();
          break;
        case 5:
          _o(r);
          break;
        case 4:
          on();
          break;
        case 13:
          A(B);
          break;
        case 19:
          A(B);
          break;
        case 10:
          No(r.type._context);
          break;
        case 22:
        case 23:
          Ao();
      }
      n = n.return;
    }
  if (b = e, G = e = mt(e.current, null), te = ve = t, Z = 0, Zn = null, Fo = yl = Rt = 0, fe = Rn = null, Ct !== null) {
    for (t = 0; t < Ct.length; t++)
      if (n = Ct[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var l = r.next, i = n.pending;
        if (i !== null) {
          var o = i.next;
          i.next = l, r.next = o;
        }
        n.pending = r;
      }
    Ct = null;
  }
  return e;
}
function pc(e, t) {
  do {
    var n = G;
    try {
      if (ko(), Tr.current = el, br) {
        for (var r = V.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        br = !1;
      }
      if (Lt = 0, J = X = V = null, zn = !1, Yn = 0, Do.current = null, n === null || n.return === null) {
        Z = 1, Zn = t, G = null;
        break;
      }
      e: {
        var i = e, o = n.return, u = n, s = t;
        if (t = te, u.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var c = s, m = u, v = m.tag;
          if (!(m.mode & 1) && (v === 0 || v === 11 || v === 15)) {
            var h = m.alternate;
            h ? (m.updateQueue = h.updateQueue, m.memoizedState = h.memoizedState, m.lanes = h.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var w = Iu(o);
          if (w !== null) {
            w.flags &= -257, Uu(w, o, u, i, t), w.mode & 1 && Fu(i, c, t), t = w, s = c;
            var x = t.updateQueue;
            if (x === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(s), t.updateQueue = S;
            } else
              x.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Fu(i, c, t), $o();
              break e;
            }
            s = Error(y(426));
          }
        } else if ($ && u.mode & 1) {
          var D = Iu(o);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), Uu(D, o, u, i, t), xo(un(s, u));
            break e;
          }
        }
        i = s = un(s, u), Z !== 4 && (Z = 2), Rn === null ? Rn = [i] : Rn.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var d = Za(i, s, t);
              Tu(i, d);
              break e;
            case 1:
              u = s;
              var f = i.type, p = i.stateNode;
              if (!(i.flags & 128) && (typeof f.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (dt === null || !dt.has(p)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var g = qa(i, u, t);
                Tu(i, g);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      vc(n);
    } catch (k) {
      t = k, G === n && n !== null && (G = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function mc() {
  var e = tl.current;
  return tl.current = el, e === null ? el : e;
}
function $o() {
  (Z === 0 || Z === 3 || Z === 2) && (Z = 4), b === null || !(Rt & 268435455) && !(yl & 268435455) || lt(b, te);
}
function ll(e, t) {
  var n = M;
  M |= 2;
  var r = mc();
  (b !== e || te !== t) && ($e = null, _t(e, t));
  do
    try {
      Ud();
      break;
    } catch (l) {
      pc(e, l);
    }
  while (!0);
  if (ko(), M = n, tl.current = r, G !== null)
    throw Error(y(261));
  return b = null, te = 0, Z;
}
function Ud() {
  for (; G !== null; )
    hc(G);
}
function Ad() {
  for (; G !== null && !cf(); )
    hc(G);
}
function hc(e) {
  var t = yc(e.alternate, e, ve);
  e.memoizedProps = e.pendingProps, t === null ? vc(e) : G = t, Do.current = null;
}
function vc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Rd(n, t), n !== null) {
        n.flags &= 32767, G = n;
        return;
      }
      if (e !== null)
        e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Z = 6, G = null;
        return;
      }
    } else if (n = Ld(n, t, ve), n !== null) {
      G = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      G = t;
      return;
    }
    G = t = e;
  } while (t !== null);
  Z === 0 && (Z = 5);
}
function Nt(e, t, n) {
  var r = O, l = Ce.transition;
  try {
    Ce.transition = null, O = 1, $d(e, t, n, r);
  } finally {
    Ce.transition = l, O = r;
  }
  return null;
}
function $d(e, t, n, r) {
  do
    en();
  while (ot !== null);
  if (M & 6)
    throw Error(y(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null)
    return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current)
    throw Error(y(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (xf(e, i), e === b && (G = b = null, te = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || xr || (xr = !0, wc(Ar, function() {
    return en(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Ce.transition, Ce.transition = null;
    var o = O;
    O = 1;
    var u = M;
    M |= 4, Do.current = null, Od(e, n), cc(n, e), od(Ci), Br = !!ji, Ci = ji = null, e.current = n, Dd(n), ff(), M = u, O = o, Ce.transition = i;
  } else
    e.current = n;
  if (xr && (xr = !1, ot = e, rl = l), i = e.pendingLanes, i === 0 && (dt = null), mf(n.stateNode), he(e, K()), t !== null)
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (nl)
    throw nl = !1, e = Wi, Wi = null, e;
  return rl & 1 && e.tag !== 0 && en(), i = e.pendingLanes, i & 1 ? e === Ki ? Mn++ : (Mn = 0, Ki = e) : Mn = 0, wt(), null;
}
function en() {
  if (ot !== null) {
    var e = Xs(rl), t = Ce.transition, n = O;
    try {
      if (Ce.transition = null, O = 16 > e ? 16 : e, ot === null)
        var r = !1;
      else {
        if (e = ot, ot = null, rl = 0, M & 6)
          throw Error(y(331));
        var l = M;
        for (M |= 4, N = e.current; N !== null; ) {
          var i = N, o = i.child;
          if (N.flags & 16) {
            var u = i.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var c = u[s];
                for (N = c; N !== null; ) {
                  var m = N;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ln(8, m, i);
                  }
                  var v = m.child;
                  if (v !== null)
                    v.return = m, N = v;
                  else
                    for (; N !== null; ) {
                      m = N;
                      var h = m.sibling, w = m.return;
                      if (uc(m), m === c) {
                        N = null;
                        break;
                      }
                      if (h !== null) {
                        h.return = w, N = h;
                        break;
                      }
                      N = w;
                    }
                }
              }
              var x = i.alternate;
              if (x !== null) {
                var S = x.child;
                if (S !== null) {
                  x.child = null;
                  do {
                    var D = S.sibling;
                    S.sibling = null, S = D;
                  } while (S !== null);
                }
              }
              N = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null)
            o.return = i, N = o;
          else
            e:
              for (; N !== null; ) {
                if (i = N, i.flags & 2048)
                  switch (i.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ln(9, i, i.return);
                  }
                var d = i.sibling;
                if (d !== null) {
                  d.return = i.return, N = d;
                  break e;
                }
                N = i.return;
              }
        }
        var f = e.current;
        for (N = f; N !== null; ) {
          o = N;
          var p = o.child;
          if (o.subtreeFlags & 2064 && p !== null)
            p.return = o, N = p;
          else
            e:
              for (o = f; N !== null; ) {
                if (u = N, u.flags & 2048)
                  try {
                    switch (u.tag) {
                      case 0:
                      case 11:
                      case 15:
                        gl(9, u);
                    }
                  } catch (k) {
                    Q(u, u.return, k);
                  }
                if (u === o) {
                  N = null;
                  break e;
                }
                var g = u.sibling;
                if (g !== null) {
                  g.return = u.return, N = g;
                  break e;
                }
                N = u.return;
              }
        }
        if (M = l, wt(), Ue && typeof Ue.onPostCommitFiberRoot == "function")
          try {
            Ue.onPostCommitFiberRoot(al, e);
          } catch {
          }
        r = !0;
      }
      return r;
    } finally {
      O = n, Ce.transition = t;
    }
  }
  return !1;
}
function qu(e, t, n) {
  t = un(n, t), t = Za(e, t, 1), e = ft(e, t, 1), t = se(), e !== null && (Jn(e, 1, t), he(e, t));
}
function Q(e, t, n) {
  if (e.tag === 3)
    qu(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        qu(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (dt === null || !dt.has(r))) {
          e = un(n, e), e = qa(t, e, 1), t = ft(t, e, 1), e = se(), t !== null && (Jn(t, 1, e), he(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Bd(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = se(), e.pingedLanes |= e.suspendedLanes & n, b === e && (te & n) === n && (Z === 4 || Z === 3 && (te & 130023424) === te && 500 > K() - Io ? _t(e, 0) : Fo |= n), he(e, t);
}
function gc(e, t) {
  t === 0 && (e.mode & 1 ? (t = cr, cr <<= 1, !(cr & 130023424) && (cr = 4194304)) : t = 1);
  var n = se();
  e = Ge(e, t), e !== null && (Jn(e, t, n), he(e, n));
}
function Vd(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), gc(e, n);
}
function Hd(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(y(314));
  }
  r !== null && r.delete(t), gc(e, n);
}
var yc;
yc = function(e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || pe.current)
      de = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128))
        return de = !1, zd(e, t, n);
      de = !!(e.flags & 131072);
    }
  else
    de = !1, $ && t.flags & 1048576 && Sa(t, Gr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Lr(e, t), e = t.pendingProps;
      var l = nn(t, oe.current);
      bt(t, n), l = zo(null, t, r, e, l, n);
      var i = Lo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, me(r) ? (i = !0, Kr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Co(t), l.updater = hl, t.stateNode = l, l._reactInternals = t, Oi(t, r, e, n), t = Ii(null, t, r, !0, i, n)) : (t.tag = 0, $ && i && yo(t), ue(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Lr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Wd(r), e = Te(r, e), l) {
          case 0:
            t = Fi(null, t, r, e, n);
            break e;
          case 1:
            t = Bu(null, t, r, e, n);
            break e;
          case 11:
            t = Au(null, t, r, e, n);
            break e;
          case 14:
            t = $u(null, t, r, Te(r.type, e), n);
            break e;
        }
        throw Error(y(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Fi(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Bu(e, t, r, l, n);
    case 3:
      e: {
        if (tc(t), e === null)
          throw Error(y(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, Ca(e, t), qr(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated)
          if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
            l = un(Error(y(423)), t), t = Vu(e, t, r, n, l);
            break e;
          } else if (r !== l) {
            l = un(Error(y(424)), t), t = Vu(e, t, r, n, l);
            break e;
          } else
            for (ge = ct(t.stateNode.containerInfo.firstChild), ye = t, $ = !0, Le = null, n = Ta(t, null, r, n), t.child = n; n; )
              n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (rn(), r === l) {
            t = Xe(e, t, n);
            break e;
          }
          ue(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return za(t), e === null && Li(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, Ei(r, l) ? o = null : i !== null && Ei(r, i) && (t.flags |= 32), ec(e, t), ue(e, t, o, n), t.child;
    case 6:
      return e === null && Li(t), null;
    case 13:
      return nc(e, t, n);
    case 4:
      return Eo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ln(t, null, r, n) : ue(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Au(e, t, r, l, n);
    case 7:
      return ue(e, t, t.pendingProps, n), t.child;
    case 8:
      return ue(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ue(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, F(Xr, r._currentValue), r._currentValue = o, i !== null)
          if (Oe(i.value, o)) {
            if (i.children === l.children && !pe.current) {
              t = Xe(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var u = i.dependencies;
              if (u !== null) {
                o = i.child;
                for (var s = u.firstContext; s !== null; ) {
                  if (s.context === r) {
                    if (i.tag === 1) {
                      s = We(-1, n & -n), s.tag = 2;
                      var c = i.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var m = c.pending;
                        m === null ? s.next = s : (s.next = m.next, m.next = s), c.pending = s;
                      }
                    }
                    i.lanes |= n, s = i.alternate, s !== null && (s.lanes |= n), Ri(
                      i.return,
                      n,
                      t
                    ), u.lanes |= n;
                    break;
                  }
                  s = s.next;
                }
              } else if (i.tag === 10)
                o = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (o = i.return, o === null)
                  throw Error(y(341));
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Ri(o, n, t), o = i.sibling;
              } else
                o = i.child;
              if (o !== null)
                o.return = i;
              else
                for (o = i; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (i = o.sibling, i !== null) {
                    i.return = o.return, o = i;
                    break;
                  }
                  o = o.return;
                }
              i = o;
            }
        ue(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, bt(t, n), l = Ee(l), r = r(l), t.flags |= 1, ue(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Te(r, t.pendingProps), l = Te(r.type, l), $u(e, t, r, l, n);
    case 15:
      return Ja(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Lr(e, t), t.tag = 1, me(r) ? (e = !0, Kr(t)) : e = !1, bt(t, n), _a(t, r, l), Oi(t, r, l, n), Ii(null, t, r, !0, e, n);
    case 19:
      return rc(e, t, n);
    case 22:
      return ba(e, t, n);
  }
  throw Error(y(156, t.tag));
};
function wc(e, t) {
  return Ws(e, t);
}
function Qd(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function je(e, t, n, r) {
  return new Qd(e, t, n, r);
}
function Bo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Wd(e) {
  if (typeof e == "function")
    return Bo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === io)
      return 11;
    if (e === oo)
      return 14;
  }
  return 2;
}
function mt(e, t) {
  var n = e.alternate;
  return n === null ? (n = je(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Or(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function")
    Bo(e) && (o = 1);
  else if (typeof e == "string")
    o = 5;
  else
    e:
      switch (e) {
        case Ut:
          return Pt(n.children, l, i, t);
        case lo:
          o = 8, l |= 8;
          break;
        case li:
          return e = je(12, n, t, l | 2), e.elementType = li, e.lanes = i, e;
        case ii:
          return e = je(13, n, t, l), e.elementType = ii, e.lanes = i, e;
        case oi:
          return e = je(19, n, t, l), e.elementType = oi, e.lanes = i, e;
        case Ps:
          return wl(n, l, i, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Es:
                o = 10;
                break e;
              case _s:
                o = 9;
                break e;
              case io:
                o = 11;
                break e;
              case oo:
                o = 14;
                break e;
              case tt:
                o = 16, r = null;
                break e;
            }
          throw Error(y(130, e == null ? e : typeof e, ""));
      }
  return t = je(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Pt(e, t, n, r) {
  return e = je(7, e, r, t), e.lanes = n, e;
}
function wl(e, t, n, r) {
  return e = je(22, e, r, t), e.elementType = Ps, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ql(e, t, n) {
  return e = je(6, e, null, t), e.lanes = n, e;
}
function Jl(e, t, n) {
  return t = je(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Kd(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Rl(0), this.expirationTimes = Rl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Rl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Vo(e, t, n, r, l, i, o, u, s) {
  return e = new Kd(e, t, n, u, s), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = je(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Co(i), e;
}
function Yd(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: It, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function xc(e) {
  if (!e)
    return vt;
  e = e._reactInternals;
  e: {
    if (Dt(e) !== e || e.tag !== 1)
      throw Error(y(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (me(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(y(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (me(n))
      return wa(e, n, t);
  }
  return t;
}
function Sc(e, t, n, r, l, i, o, u, s) {
  return e = Vo(n, r, !0, e, l, i, o, u, s), e.context = xc(null), n = e.current, r = se(), l = pt(n), i = We(r, l), i.callback = t ?? null, ft(n, i, l), e.current.lanes = l, Jn(e, l, r), he(e, r), e;
}
function xl(e, t, n, r) {
  var l = t.current, i = se(), o = pt(l);
  return n = xc(n), t.context === null ? t.context = n : t.pendingContext = n, t = We(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ft(l, t, o), e !== null && (Me(e, l, o, i), Pr(e, l, o)), o;
}
function il(e) {
  if (e = e.current, !e.child)
    return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ju(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ho(e, t) {
  Ju(e, t), (e = e.alternate) && Ju(e, t);
}
function Gd() {
  return null;
}
var kc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Qo(e) {
  this._internalRoot = e;
}
Sl.prototype.render = Qo.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null)
    throw Error(y(409));
  xl(e, t, null, null);
};
Sl.prototype.unmount = Qo.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Mt(function() {
      xl(null, e, null, null);
    }), t[Ye] = null;
  }
};
function Sl(e) {
  this._internalRoot = e;
}
Sl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Js();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < rt.length && t !== 0 && t < rt[n].priority; n++)
      ;
    rt.splice(n, 0, e), n === 0 && ea(e);
  }
};
function Wo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function kl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function bu() {
}
function Xd(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = il(o);
        i.call(c);
      };
    }
    var o = Sc(t, r, e, 0, null, !1, !1, "", bu);
    return e._reactRootContainer = o, e[Ye] = o.current, Vn(e.nodeType === 8 ? e.parentNode : e), Mt(), o;
  }
  for (; l = e.lastChild; )
    e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var c = il(s);
      u.call(c);
    };
  }
  var s = Vo(e, 0, !1, null, null, !1, !1, "", bu);
  return e._reactRootContainer = s, e[Ye] = s.current, Vn(e.nodeType === 8 ? e.parentNode : e), Mt(function() {
    xl(t, s, n, r);
  }), s;
}
function Nl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var u = l;
      l = function() {
        var s = il(o);
        u.call(s);
      };
    }
    xl(t, o, e, l);
  } else
    o = Xd(n, t, e, l, r);
  return il(o);
}
Zs = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Nn(t.pendingLanes);
        n !== 0 && (ao(t, n | 1), he(t, K()), !(M & 6) && (sn = K() + 500, wt()));
      }
      break;
    case 13:
      Mt(function() {
        var r = Ge(e, 1);
        if (r !== null) {
          var l = se();
          Me(r, e, 1, l);
        }
      }), Ho(e, 1);
  }
};
co = function(e) {
  if (e.tag === 13) {
    var t = Ge(e, 134217728);
    if (t !== null) {
      var n = se();
      Me(t, e, 134217728, n);
    }
    Ho(e, 134217728);
  }
};
qs = function(e) {
  if (e.tag === 13) {
    var t = pt(e), n = Ge(e, t);
    if (n !== null) {
      var r = se();
      Me(n, e, t, r);
    }
    Ho(e, t);
  }
};
Js = function() {
  return O;
};
bs = function(e, t) {
  var n = O;
  try {
    return O = e, t();
  } finally {
    O = n;
  }
};
vi = function(e, t, n) {
  switch (t) {
    case "input":
      if (ai(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; )
          n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = pl(r);
            if (!l)
              throw Error(y(90));
            zs(r), ai(r, l);
          }
        }
      }
      break;
    case "textarea":
      Rs(e, n);
      break;
    case "select":
      t = n.value, t != null && Xt(e, !!n.multiple, t, !1);
  }
};
As = Uo;
$s = Mt;
var Zd = { usingClientEntryPoint: !1, Events: [er, Vt, pl, Is, Us, Uo] }, xn = { findFiberByHostInstance: jt, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, qd = { bundleType: xn.bundleType, version: xn.version, rendererPackageName: xn.rendererPackageName, rendererConfig: xn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ze.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Hs(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: xn.findFiberByHostInstance || Gd, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Sr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Sr.isDisabled && Sr.supportsFiber)
    try {
      al = Sr.inject(qd), Ue = Sr;
    } catch {
    }
}
xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Zd;
xe.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Wo(t))
    throw Error(y(200));
  return Yd(e, t, null, n);
};
xe.createRoot = function(e, t) {
  if (!Wo(e))
    throw Error(y(299));
  var n = !1, r = "", l = kc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Vo(e, 1, !1, null, null, n, !1, r, l), e[Ye] = t.current, Vn(e.nodeType === 8 ? e.parentNode : e), new Qo(t);
};
xe.findDOMNode = function(e) {
  if (e == null)
    return null;
  if (e.nodeType === 1)
    return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(y(188)) : (e = Object.keys(e).join(","), Error(y(268, e)));
  return e = Hs(t), e = e === null ? null : e.stateNode, e;
};
xe.flushSync = function(e) {
  return Mt(e);
};
xe.hydrate = function(e, t, n) {
  if (!kl(t))
    throw Error(y(200));
  return Nl(null, e, t, !0, n);
};
xe.hydrateRoot = function(e, t, n) {
  if (!Wo(e))
    throw Error(y(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = kc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = Sc(t, null, e, 1, n ?? null, l, !1, i, o), e[Ye] = t.current, Vn(e), r)
    for (e = 0; e < r.length; e++)
      n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
        n,
        l
      );
  return new Sl(t);
};
xe.render = function(e, t, n) {
  if (!kl(t))
    throw Error(y(200));
  return Nl(null, e, t, !1, n);
};
xe.unmountComponentAtNode = function(e) {
  if (!kl(e))
    throw Error(y(40));
  return e._reactRootContainer ? (Mt(function() {
    Nl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ye] = null;
    });
  }), !0) : !1;
};
xe.unstable_batchedUpdates = Uo;
xe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!kl(n))
    throw Error(y(200));
  if (e == null || e._reactInternals === void 0)
    throw Error(y(38));
  return Nl(e, t, n, !1, r);
};
xe.version = "18.2.0-next-9e3b772b8-20220608";
function Nc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Nc);
    } catch (e) {
      console.error(e);
    }
}
Nc(), Ss.exports = xe;
var Jd = Ss.exports, es = Jd;
Dr.createRoot = es.createRoot, Dr.hydrateRoot = es.hydrateRoot;
const ts = ["Tutti", "P", "D", "C", "A"], Xi = {
  P: "Portiere",
  D: "Difensore",
  C: "Centrocampista",
  A: "Attaccante",
  U: "Altro"
}, ns = {
  P: 1,
  D: 2,
  C: 3,
  A: 4,
  U: 5
}, ol = {
  P: "lf-role-badge lf-role-badge--p",
  D: "lf-role-badge lf-role-badge--d",
  C: "lf-role-badge lf-role-badge--c",
  A: "lf-role-badge lf-role-badge--a",
  U: "lf-role-badge lf-role-badge--u"
}, qe = (e) => ({
  width: e,
  height: e,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": !0
});
function Zi({ size: e = 24, ...t }) {
  return /* @__PURE__ */ a.jsxs("svg", { ...qe(e), ...t, children: [
    /* @__PURE__ */ a.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
    /* @__PURE__ */ a.jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
  ] });
}
function rs({ size: e = 20, ...t }) {
  return /* @__PURE__ */ a.jsxs("svg", { ...qe(e), ...t, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ a.jsx("path", { d: "m21 21-4.3-4.3" })
  ] });
}
function bd({ size: e = 20, ...t }) {
  return /* @__PURE__ */ a.jsxs("svg", { ...qe(e), ...t, children: [
    /* @__PURE__ */ a.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ a.jsx("path", { d: "m17 8 5 5" }),
    /* @__PURE__ */ a.jsx("path", { d: "m22 8-5 5" })
  ] });
}
function jc({ size: e = 20, ...t }) {
  return /* @__PURE__ */ a.jsxs("svg", { ...qe(e), ...t, children: [
    /* @__PURE__ */ a.jsx("path", { d: "M18 6 6 18" }),
    /* @__PURE__ */ a.jsx("path", { d: "m6 6 12 12" })
  ] });
}
function Ve({ size: e = 18, ...t }) {
  return /* @__PURE__ */ a.jsx("svg", { ...qe(e), ...t, children: /* @__PURE__ */ a.jsx("path", { d: "m6 9 6 6 6-6" }) });
}
function ep({ size: e = 16, ...t }) {
  return /* @__PURE__ */ a.jsx("svg", { ...qe(e), ...t, children: /* @__PURE__ */ a.jsx("path", { d: "m18 15-6-6-6 6" }) });
}
function ul({ size: e = 24, ...t }) {
  return /* @__PURE__ */ a.jsx("svg", { ...qe(e), ...t, children: /* @__PURE__ */ a.jsx("path", { d: "M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" }) });
}
function tp({ size: e = 18, ...t }) {
  return /* @__PURE__ */ a.jsxs("svg", { ...qe(e), ...t, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "8", cy: "8", r: "6" }),
    /* @__PURE__ */ a.jsx("path", { d: "M18.1 8.4A6 6 0 1 1 8.4 18.1" }),
    /* @__PURE__ */ a.jsx("path", { d: "M6 8h4M8 6v4" })
  ] });
}
function np({ size: e = 18, ...t }) {
  return /* @__PURE__ */ a.jsxs("svg", { ...qe(e), ...t, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 8v4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 16h.01" })
  ] });
}
function rp(e) {
  return e.split(/\s+-\s+/).map((t) => t.trim()).filter(Boolean);
}
function ls({ asset: e, expanded: t, onToggle: n }) {
  const r = rp(e.displayName);
  return /* @__PURE__ */ a.jsxs("div", { children: [
    /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: n, className: "tw-hidden tw-w-full tw-grid-cols-12 tw-gap-4 tw-px-6 tw-py-4 tw-text-left tw-transition hover:tw-bg-slate-50 md:tw-grid", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "tw-col-span-4 tw-flex tw-min-w-0 tw-items-center tw-gap-3", children: [
        /* @__PURE__ */ a.jsx("div", { className: "lf-player-avatar", children: /* @__PURE__ */ a.jsx(ul, { size: 22 }) }),
        /* @__PURE__ */ a.jsxs("div", { className: "tw-min-w-0", children: [
          /* @__PURE__ */ a.jsxs("div", { className: "tw-truncate tw-font-semibold tw-text-slate-900", children: [
            "Blocco ",
            e.realTeam || e.displayName
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-slate-500", children: [
            r.length,
            " portieri",
            /* @__PURE__ */ a.jsx(Ve, { size: 15, className: `tw-transition ${t ? "tw-rotate-180" : ""}` })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center", children: /* @__PURE__ */ a.jsx("span", { className: "lf-role-badge lf-role-badge--p", children: "Portiere" }) }),
      /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center tw-text-xl tw-font-black tw-text-slate-900", children: e.quotation || "—" }),
      /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center tw-text-lg tw-font-bold tw-text-[var(--primary)]", children: e.purchasePrice || "—" }),
      /* @__PURE__ */ a.jsx("div", { className: `tw-col-span-2 tw-flex tw-items-center tw-truncate tw-text-sm ${e.ownerTag ? "tw-text-slate-600" : "tw-italic tw-text-slate-400"}`, children: e.ownerTag || "Svincolato" })
    ] }),
    /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: n, className: "tw-flex tw-w-full tw-items-start tw-gap-3 tw-p-3 tw-text-left tw-transition hover:tw-bg-slate-50 md:tw-hidden", children: [
      /* @__PURE__ */ a.jsx("div", { className: "lf-player-avatar lf-player-avatar--mobile", children: /* @__PURE__ */ a.jsx(ul, { size: 22 }) }),
      /* @__PURE__ */ a.jsxs("div", { className: "tw-min-w-0 tw-flex-1", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
          /* @__PURE__ */ a.jsx("span", { className: "lf-role-badge lf-role-badge--p", children: "P" }),
          /* @__PURE__ */ a.jsxs("strong", { className: "tw-truncate tw-text-slate-900", children: [
            "Blocco ",
            e.realTeam || e.displayName
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "tw-mt-1 tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-slate-500", children: [
          r.length,
          " portieri ",
          /* @__PURE__ */ a.jsx(Ve, { size: 14, className: `tw-transition ${t ? "tw-rotate-180" : ""}` })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-x-3 tw-gap-y-1 tw-text-xs", children: [
          /* @__PURE__ */ a.jsxs("span", { children: [
            /* @__PURE__ */ a.jsx("span", { className: "tw-text-slate-400", children: "Quot:" }),
            " ",
            /* @__PURE__ */ a.jsx("strong", { children: e.quotation || "—" })
          ] }),
          /* @__PURE__ */ a.jsxs("span", { children: [
            /* @__PURE__ */ a.jsx("span", { className: "tw-text-slate-400", children: "Acq:" }),
            " ",
            /* @__PURE__ */ a.jsx("strong", { className: "tw-text-[var(--primary)]", children: e.purchasePrice || "—" })
          ] }),
          /* @__PURE__ */ a.jsxs("span", { className: "tw-truncate tw-text-slate-500", children: [
            "👤 ",
            e.ownerTag || "Svincolato"
          ] })
        ] })
      ] })
    ] }),
    t && /* @__PURE__ */ a.jsx("div", { className: "lf-block-expanded", children: r.map((l) => /* @__PURE__ */ a.jsxs("div", { className: "tw-flex tw-items-center tw-gap-3 tw-px-6 tw-py-3", children: [
      /* @__PURE__ */ a.jsx("div", { className: "lf-mini-avatar", children: "P" }),
      /* @__PURE__ */ a.jsxs("div", { className: "tw-min-w-0", children: [
        /* @__PURE__ */ a.jsx("div", { className: "tw-truncate tw-font-medium tw-text-slate-800", children: l }),
        /* @__PURE__ */ a.jsx("div", { className: "tw-text-xs tw-text-slate-500", children: e.realTeam || "Portiere" })
      ] })
    ] }, l)) })
  ] });
}
function lp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function ip({ player: e }) {
  return /* @__PURE__ */ a.jsxs("div", { className: "tw-group tw-grid tw-grid-cols-12 tw-gap-4 tw-px-6 tw-py-4 tw-transition hover:tw-bg-slate-50", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "tw-col-span-4 tw-flex tw-min-w-0 tw-items-center tw-gap-3", children: [
      /* @__PURE__ */ a.jsx("div", { className: "lf-player-avatar", "aria-hidden": "true", children: lp(e.displayName) }),
      /* @__PURE__ */ a.jsxs("div", { className: "tw-min-w-0", children: [
        /* @__PURE__ */ a.jsxs("div", { className: `tw-truncate tw-font-semibold tw-transition group-hover:tw-text-[var(--primary)] ${e.active ? "tw-text-slate-900" : "tw-italic tw-text-slate-400"}`, children: [
          e.displayName,
          !e.active && " *"
        ] }),
        /* @__PURE__ */ a.jsx("div", { className: "tw-truncate tw-text-sm tw-text-slate-500", children: e.realTeam || "—" })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center", children: /* @__PURE__ */ a.jsx("span", { className: ol[e.role] ?? ol.U, children: Xi[e.role] ?? "?" }) }),
    /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ a.jsx("span", { className: "tw-text-xl tw-font-black tw-text-slate-900", children: e.quotation || "—" }) }),
    /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ a.jsx("span", { className: e.purchasePrice ? "tw-text-lg tw-font-bold tw-text-[var(--primary)]" : "tw-text-slate-400", children: e.purchasePrice || "—" }) }),
    /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-min-w-0", children: /* @__PURE__ */ a.jsx("span", { className: `tw-truncate tw-text-sm ${e.ownerTag ? "tw-text-slate-600" : "tw-italic tw-text-slate-400"}`, children: e.ownerTag || "Svincolato" }) })
  ] });
}
function op({
  teams: e,
  owners: t,
  currentRole: n,
  currentTeam: r,
  currentOwner: l,
  hasActiveFilters: i,
  onRoleChange: o,
  onTeamChange: u,
  onOwnerChange: s,
  onResetFilters: c
}) {
  return /* @__PURE__ */ a.jsxs("div", { className: "tw-mb-5 sm:tw-mb-6", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "tw-hidden tw-items-center tw-justify-between tw-gap-4 md:tw-flex", children: [
      /* @__PURE__ */ a.jsx("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: ts.map((m) => /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          onClick: () => o(m),
          className: `lf-role-pill ${n === m ? "lf-role-pill--active" : ""}`,
          children: m === "Tutti" ? "Tutti" : Xi[m]
        },
        m
      )) }),
      /* @__PURE__ */ a.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ a.jsxs("label", { className: "lf-select-wrap", children: [
          /* @__PURE__ */ a.jsx("span", { "aria-hidden": "true", children: "🏟️" }),
          /* @__PURE__ */ a.jsxs("select", { value: r, onChange: (m) => u(m.target.value), "aria-label": "Filtra per squadra reale", children: [
            /* @__PURE__ */ a.jsx("option", { value: "Tutti", children: "Squadra" }),
            e.map((m) => /* @__PURE__ */ a.jsx("option", { value: m, children: m }, m))
          ] }),
          /* @__PURE__ */ a.jsx(Ve, { size: 14 })
        ] }),
        /* @__PURE__ */ a.jsxs("label", { className: "lf-select-wrap", children: [
          /* @__PURE__ */ a.jsx("span", { "aria-hidden": "true", children: "👤" }),
          /* @__PURE__ */ a.jsxs("select", { value: l, onChange: (m) => s(m.target.value), "aria-label": "Filtra per proprietario", children: [
            /* @__PURE__ */ a.jsx("option", { value: "Tutti", children: "Proprietario" }),
            t.map((m) => /* @__PURE__ */ a.jsx("option", { value: m, children: m }, m))
          ] }),
          /* @__PURE__ */ a.jsx(Ve, { size: 14 })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "lf-mobile-filters md:tw-hidden", children: [
      /* @__PURE__ */ a.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ a.jsx("span", { className: "lf-mobile-filter__label", children: "Ruolo" }),
        /* @__PURE__ */ a.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ a.jsx("select", { value: n, onChange: (m) => o(m.target.value), "aria-label": "Filtra per ruolo", children: ts.map((m) => /* @__PURE__ */ a.jsx("option", { value: m, children: m === "Tutti" ? "Tutti" : Xi[m] }, m)) }),
          /* @__PURE__ */ a.jsx(Ve, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ a.jsx("span", { className: "lf-mobile-filter__label", children: "Squadra" }),
        /* @__PURE__ */ a.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ a.jsxs("select", { value: r, onChange: (m) => u(m.target.value), "aria-label": "Filtra per squadra reale", children: [
            /* @__PURE__ */ a.jsx("option", { value: "Tutti", children: "Tutte" }),
            e.map((m) => /* @__PURE__ */ a.jsx("option", { value: m, children: m }, m))
          ] }),
          /* @__PURE__ */ a.jsx(Ve, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ a.jsx("span", { className: "lf-mobile-filter__label", children: "Proprietario" }),
        /* @__PURE__ */ a.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ a.jsxs("select", { value: l, onChange: (m) => s(m.target.value), "aria-label": "Filtra per proprietario", children: [
            /* @__PURE__ */ a.jsx("option", { value: "Tutti", children: "Tutti" }),
            t.map((m) => /* @__PURE__ */ a.jsx("option", { value: m, children: m }, m))
          ] }),
          /* @__PURE__ */ a.jsx(Ve, { size: 14 })
        ] })
      ] })
    ] }),
    i && /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: c, className: "lf-mobile-reset md:tw-hidden", children: [
      /* @__PURE__ */ a.jsx(jc, { size: 15 }),
      " Azzera filtri"
    ] })
  ] });
}
function bl({ active: e, direction: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ a.jsx(ep, { size: 14 }) : /* @__PURE__ */ a.jsx(Ve, { size: 14 }) : null;
}
function up({ sortKey: e, sortDirection: t, onSort: n }) {
  return /* @__PURE__ */ a.jsxs("div", { className: "tw-hidden tw-grid-cols-12 tw-gap-4 tw-border-b tw-border-slate-200 tw-bg-slate-50 tw-px-6 tw-py-4 tw-text-xs tw-font-bold tw-uppercase tw-tracking-wider tw-text-slate-500 md:tw-grid", children: [
    /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-4", children: "Giocatore" }),
    /* @__PURE__ */ a.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2", onClick: () => n("position"), children: [
      "Ruolo ",
      /* @__PURE__ */ a.jsx(bl, { active: e === "position", direction: t })
    ] }),
    /* @__PURE__ */ a.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2 tw-justify-center", onClick: () => n("quotation"), children: [
      "Quot. ",
      /* @__PURE__ */ a.jsx(bl, { active: e === "quotation", direction: t })
    ] }),
    /* @__PURE__ */ a.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2 tw-justify-center", onClick: () => n("purchasePrice"), children: [
      "Prezzo ",
      /* @__PURE__ */ a.jsx(bl, { active: e === "purchasePrice", direction: t })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2", children: "Proprietario" })
  ] });
}
function sp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function ap({ player: e }) {
  return /* @__PURE__ */ a.jsx("article", { className: "tw-p-3 tw-transition hover:tw-bg-slate-50", children: /* @__PURE__ */ a.jsxs("div", { className: "tw-flex tw-items-start tw-gap-3", children: [
    /* @__PURE__ */ a.jsx("div", { className: "lf-player-avatar lf-player-avatar--mobile", "aria-hidden": "true", children: sp(e.displayName) }),
    /* @__PURE__ */ a.jsxs("div", { className: "tw-min-w-0 tw-flex-1", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "tw-mb-1 tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ a.jsx("span", { className: ol[e.role] ?? ol.U, children: e.role || "?" }),
        /* @__PURE__ */ a.jsxs("span", { className: `tw-truncate tw-font-semibold ${e.active ? "tw-text-slate-900" : "tw-italic tw-text-slate-400"}`, children: [
          e.displayName,
          !e.active && " *"
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "tw-mb-2 tw-truncate tw-text-xs tw-text-slate-500", children: e.realTeam || "—" }),
      /* @__PURE__ */ a.jsxs("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-x-3 tw-gap-y-1 tw-text-xs", children: [
        /* @__PURE__ */ a.jsxs("span", { children: [
          /* @__PURE__ */ a.jsx("span", { className: "tw-text-slate-400", children: "Quot:" }),
          " ",
          /* @__PURE__ */ a.jsx("strong", { className: "tw-text-slate-900", children: e.quotation || "—" })
        ] }),
        /* @__PURE__ */ a.jsxs("span", { children: [
          /* @__PURE__ */ a.jsx("span", { className: "tw-text-slate-400", children: "Acq:" }),
          " ",
          /* @__PURE__ */ a.jsx("strong", { className: "tw-text-[var(--primary)]", children: e.purchasePrice || "—" })
        ] }),
        /* @__PURE__ */ a.jsxs("span", { className: `tw-max-w-full tw-truncate ${e.ownerTag ? "tw-text-slate-500" : "tw-italic tw-text-slate-400"}`, children: [
          "👤 ",
          e.ownerTag || "Svincolato"
        ] })
      ] })
    ] })
  ] }) });
}
function is(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ø/g, "O").replace(/ø/g, "o").toLowerCase();
}
function os(e) {
  return e.type === "goalkeeper_block" || e.role === "P" && /\s+-\s+/.test(e.displayName);
}
function cp({ assets: e }) {
  const [t, n] = U.useState(""), [r, l] = U.useState("Tutti"), [i, o] = U.useState("Tutti"), [u, s] = U.useState("Tutti"), [c, m] = U.useState(!1), [v, h] = U.useState("position"), [w, x] = U.useState("asc"), [S, D] = U.useState(/* @__PURE__ */ new Set()), d = U.useMemo(() => [...new Set(e.map((j) => j.realTeam).filter(Boolean))].sort((j, T) => j.localeCompare(T, "it")), [e]), f = U.useMemo(() => [...new Set(e.map((j) => j.ownerTag).filter(Boolean))].sort((j, T) => j.localeCompare(T, "it")), [e]), p = U.useMemo(() => {
    const j = is(t.trim());
    return e.filter((T) => !(j && !is(`${T.displayName} ${T.realTeam} ${T.ownerTag}`).includes(j) || c && !T.isFreeAgent || r !== "Tutti" && T.role !== r || i !== "Tutti" && T.realTeam !== i || u !== "Tutti" && T.ownerTag !== u));
  }, [e, u, r, t, c, i]), g = U.useMemo(() => [...p].sort((j, T) => {
    if (v === "position") {
      const Je = (ns[j.role] ?? 9) - (ns[T.role] ?? 9), be = w === "asc" ? Je : -Je;
      if (be !== 0)
        return be;
      const dn = j.realTeam.localeCompare(T.realTeam, "it");
      if (dn !== 0)
        return dn;
      const nr = T.quotation - j.quotation;
      return nr !== 0 ? nr : j.displayName.localeCompare(T.displayName, "it");
    }
    const Y = (j[v] || 0) - (T[v] || 0);
    return w === "asc" ? Y : -Y;
  }), [p, w, v]), k = !!(t || r !== "Tutti" || i !== "Tutti" || u !== "Tutti" || c), E = () => {
    n(""), l("Tutti"), o("Tutti"), s("Tutti"), m(!1), h("position"), x("asc");
  }, _ = (j) => {
    if (v === j) {
      w === "desc" || h("position"), x("asc");
      return;
    }
    h(j), x("desc");
  }, P = (j) => {
    D((T) => {
      const Y = new Set(T);
      return Y.has(j) ? Y.delete(j) : Y.add(j), Y;
    });
  };
  return /* @__PURE__ */ a.jsx("div", { className: "tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-7xl", children: [
    /* @__PURE__ */ a.jsx("div", { className: "tw-flex tw-justify-end tw-p-4 sm:tw-p-6 lg:tw-p-8", children: /* @__PURE__ */ a.jsxs("div", { className: "tw-flex tw-w-full tw-flex-wrap tw-items-stretch tw-gap-2 lg:tw-ml-auto lg:tw-w-auto lg:tw-justify-end", children: [
        /* @__PURE__ */ a.jsxs("label", { className: "lf-search tw-min-w-0 tw-flex-1 lg:tw-w-80 lg:tw-flex-none", children: [
          /* @__PURE__ */ a.jsx(rs, { size: 20 }),
          /* @__PURE__ */ a.jsx("input", { type: "search", placeholder: "Cerca giocatore...", value: t, onChange: (j) => n(j.target.value) })
        ] }),
        /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => m((j) => !j), className: `lf-action-button ${c ? "lf-action-button--active" : ""}`, title: "Mostra solo giocatori svincolati", children: [
          /* @__PURE__ */ a.jsx(bd, { size: 20 }),
          /* @__PURE__ */ a.jsx("span", { className: "tw-hidden sm:tw-inline", children: "Svincolati" })
        ] }),
        k && /* @__PURE__ */ a.jsx("button", { type: "button", onClick: E, className: "lf-reset-button tw-hidden md:tw-flex", title: "Azzera filtri", children: /* @__PURE__ */ a.jsx(jc, { size: 20 }) })
      ] }) }),
    /* @__PURE__ */ a.jsxs("div", { className: "tw-px-3 sm:tw-px-6 lg:tw-px-8", children: [
      /* @__PURE__ */ a.jsx(
        op,
        {
          teams: d,
          owners: f,
          currentRole: r,
          currentTeam: i,
          currentOwner: u,
          hasActiveFilters: k,
          onRoleChange: l,
          onTeamChange: o,
          onOwnerChange: s,
          onResetFilters: E
        }
      ),
      /* @__PURE__ */ a.jsxs("div", { className: "tw-mb-3 tw-flex tw-items-center tw-justify-between tw-text-xs tw-font-semibold tw-text-slate-500", children: [
        /* @__PURE__ */ a.jsxs("span", { children: [
          g.length,
          " risultati"
        ] }),
        g.length !== e.length && /* @__PURE__ */ a.jsxs("span", { children: [
          "su ",
          e.length
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "lf-list-table", children: [
        /* @__PURE__ */ a.jsx(up, { sortKey: v, sortDirection: w, onSort: _ }),
        /* @__PURE__ */ a.jsx("div", { className: "tw-hidden tw-divide-y tw-divide-slate-100 md:tw-block", children: g.map((j) => os(j) ? /* @__PURE__ */ a.jsx(ls, { asset: j, expanded: S.has(j.assetCode), onToggle: () => P(j.assetCode) }, j.assetCode) : /* @__PURE__ */ a.jsx(ip, { player: j }, j.assetCode)) }),
        /* @__PURE__ */ a.jsx("div", { className: "tw-divide-y tw-divide-slate-100 md:tw-hidden", children: g.map((j) => os(j) ? /* @__PURE__ */ a.jsx(ls, { asset: j, expanded: S.has(j.assetCode), onToggle: () => P(j.assetCode) }, j.assetCode) : /* @__PURE__ */ a.jsx(ap, { player: j }, j.assetCode)) }),
        g.length === 0 && /* @__PURE__ */ a.jsxs("div", { className: "tw-px-6 tw-py-14 tw-text-center", children: [
          /* @__PURE__ */ a.jsx(rs, { size: 34, className: "tw-mx-auto tw-mb-3 tw-text-slate-300" }),
          /* @__PURE__ */ a.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-slate-800", children: "Nessun giocatore trovato" }),
          /* @__PURE__ */ a.jsx("p", { className: "tw-mb-0 tw-mt-1 tw-text-sm tw-text-slate-500", children: "Prova a modificare i filtri di ricerca." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "tw-h-4 sm:tw-h-6" })
  ] }) });
}
function fp(e) {
  return e.map((t) => ({
    ...t,
    purchasePrice: t.purchasePrice ?? 0
  }));
}
function ei() {
  var e, t, n, r;
  return {
    state: ((t = (e = window.LineupLeagueData) == null ? void 0 : e.getState) == null ? void 0 : t.call(e)) ?? { status: "idle" },
    assets: fp(((r = (n = window.LineupLeagueData) == null ? void 0 : n.getAssets) == null ? void 0 : r.call(n)) ?? [])
  };
}
function Cc() {
  var o;
  const e = U.useMemo(ei, []), [t, n] = U.useState(e.state), [r, l] = U.useState(e.assets), i = (o = window.LINEUP_FANTA) == null ? void 0 : o.league;
  return U.useEffect(() => {
    let u = !1, s = 0;
    const c = () => {
      if (u)
        return;
      const v = ei();
      n(v.state), l(v.assets), s += 1, v.state.status !== "ready" && s < 20 && window.setTimeout(c, 150);
    }, m = (v) => {
      if (v.detail.leagueId !== (i == null ? void 0 : i.id))
        return;
      const h = ei();
      n(h.state), l(h.assets);
    };
    return document.addEventListener("lineup:league-assets-ready", m), c(), () => {
      u = !0, document.removeEventListener("lineup:league-assets-ready", m);
    };
  }, [i == null ? void 0 : i.id]), { state: t, assets: r, league: i };
}
function dp() {
  const { state: e, assets: t } = Cc();
  return e.status === "error" ? /* @__PURE__ */ a.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ a.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-red-600", children: "Errore nel caricamento del Listone" }),
    /* @__PURE__ */ a.jsx("p", { className: "tw-mb-0 tw-mt-2 tw-text-sm tw-text-slate-500", children: "Controlla il CSV della lega e ricarica la pagina." })
  ] }) }) : e.status !== "ready" ? /* @__PURE__ */ a.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ a.jsx("div", { className: "lf-spinner tw-mx-auto tw-mb-3" }),
    /* @__PURE__ */ a.jsx("p", { className: "tw-m-0 tw-text-sm tw-font-semibold tw-text-slate-500", children: "Caricamento del Listone…" })
  ] }) }) : /* @__PURE__ */ a.jsx(cp, { assets: t });
}
function pp(e) {
  return e.split(/\s+-\s+/).map((t) => t.trim()).filter(Boolean);
}
function mp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function kr({ players: e, role: t, label: n }) {
  const [r, l] = U.useState(/* @__PURE__ */ new Set()), i = e.filter((u) => u.role === t).sort((u, s) => {
    const c = s.purchasePrice - u.purchasePrice;
    return c !== 0 ? c : u.displayName.localeCompare(s.displayName, "it");
  }), o = (u) => {
    l((s) => {
      const c = new Set(s);
      return c.has(u) ? c.delete(u) : c.add(u), c;
    });
  };
  return /* @__PURE__ */ a.jsxs("section", { className: "lf-squad-section", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-section__title", children: [
      n,
      t === "P" ? " (Blocchi)" : ""
    ] }),
    i.length === 0 ? /* @__PURE__ */ a.jsx("div", { className: "lf-squad-empty", children: "—" }) : /* @__PURE__ */ a.jsx("div", { className: "lf-squad-list", children: i.map((u) => {
      const s = t === "P" && (u.type === "goalkeeper_block" || /\s+-\s+/.test(u.displayName)), c = r.has(u.assetCode), m = s ? pp(u.displayName) : [], v = /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-item__left", children: [
          /* @__PURE__ */ a.jsx("div", { className: `lf-squad-avatar lf-squad-avatar--${t.toLowerCase()}`, "aria-hidden": "true", children: s ? /* @__PURE__ */ a.jsx(ul, { size: 17 }) : mp(u.displayName) }),
          /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-item__copy", children: [
            /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-item__name", children: [
              s ? `Blocco ${u.realTeam || u.displayName}` : u.displayName,
              !u.active && " *",
              s && /* @__PURE__ */ a.jsx(Ve, { size: 14, className: c ? "lf-chevron-open" : "" })
            ] }),
            /* @__PURE__ */ a.jsx("div", { className: "lf-squad-item__team", children: s ? `${m.length} portieri` : u.realTeam || "—" })
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-values", children: [
          /* @__PURE__ */ a.jsxs("span", { children: [
            /* @__PURE__ */ a.jsx("small", { children: "Q" }),
            /* @__PURE__ */ a.jsx("strong", { children: u.quotation || "—" })
          ] }),
          /* @__PURE__ */ a.jsxs("span", { children: [
            /* @__PURE__ */ a.jsx("small", { children: "P" }),
            /* @__PURE__ */ a.jsx("strong", { className: "lf-squad-price", children: u.purchasePrice || "—" })
          ] })
        ] })
      ] });
      return /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-item-wrap", children: [
        s ? /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "lf-squad-item lf-squad-item--clickable",
            onClick: () => o(u.assetCode),
            "aria-expanded": c,
            children: v
          }
        ) : /* @__PURE__ */ a.jsx("div", { className: "lf-squad-item", children: v }),
        s && c && /* @__PURE__ */ a.jsx("div", { className: "lf-squad-goalkeepers", children: m.map((h) => /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-goalkeeper", children: [
          /* @__PURE__ */ a.jsx("div", { className: "lf-squad-goalkeeper__avatar", children: "P" }),
          /* @__PURE__ */ a.jsx("span", { children: h })
        ] }, h)) })
      ] }, u.assetCode);
    }) })
  ] });
}
const ti = { P: 2, D: 8, C: 8, A: 6 }, hp = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 });
function vp({ team: e }) {
  const [t, n] = U.useState("ALL"), [r, l] = U.useState(!1), i = (s) => {
    n((c) => c === s ? "ALL" : s);
  }, o = !!(e.logoUrl && !r), u = e.credits === null ? "—" : hp.format(e.credits);
  return /* @__PURE__ */ a.jsxs("article", { className: "lf-team-card", children: [
    /* @__PURE__ */ a.jsxs("header", { className: "lf-team-card__header", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "lf-team-card__identity", children: [
        /* @__PURE__ */ a.jsx("div", { className: `lf-team-card__avatar ${o ? "has-logo" : ""}`, children: o ? /* @__PURE__ */ a.jsx(
          "img",
          {
            src: e.logoUrl,
            alt: `Logo di ${e.managerName}`,
            loading: "lazy",
            referrerPolicy: "no-referrer",
            onError: () => l(!0)
          }
        ) : e.managerName.charAt(0).toUpperCase() }),
        /* @__PURE__ */ a.jsxs("div", { className: "lf-team-card__copy", children: [
          /* @__PURE__ */ a.jsx("span", { className: "lf-team-card__eyebrow", children: "Allenatore" }),
          /* @__PURE__ */ a.jsx("h2", { title: e.managerName, children: e.managerName })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "lf-team-card__meta", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "lf-team-card__credits", children: [
          /* @__PURE__ */ a.jsx("span", { children: "Crediti" }),
          /* @__PURE__ */ a.jsxs("strong", { children: [
            /* @__PURE__ */ a.jsx(tp, { size: 16 }),
            " ",
            u
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: `lf-team-status ${e.isComplete ? "lf-team-status--complete" : "lf-team-status--incomplete"}`, children: [
          e.isComplete ? /* @__PURE__ */ a.jsx(ul, { size: 13 }) : /* @__PURE__ */ a.jsx(np, { size: 13 }),
          e.isComplete ? "ROSA COMPLETA" : "INCOMPLETA"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "lf-team-role-filters", "aria-label": `Filtra la rosa di ${e.managerName} per ruolo`, children: Object.keys(ti).map((s) => {
      const c = e.roleCounts[s] === ti[s];
      return /* @__PURE__ */ a.jsxs(
        "button",
        {
          type: "button",
          onClick: () => i(s),
          className: `${t === s ? "is-active" : ""} ${c ? "is-complete" : ""}`,
          children: [
            s,
            ": ",
            e.roleCounts[s],
            "/",
            ti[s]
          ]
        },
        s
      );
    }) }),
    /* @__PURE__ */ a.jsx("div", { className: "lf-team-roster-frame", children: /* @__PURE__ */ a.jsxs("div", { className: "lf-team-roster", children: [
      (t === "ALL" || t === "P") && /* @__PURE__ */ a.jsx(kr, { players: e.players, role: "P", label: "Portieri" }),
      (t === "ALL" || t === "D") && /* @__PURE__ */ a.jsx(kr, { players: e.players, role: "D", label: "Difensori" }),
      (t === "ALL" || t === "C") && /* @__PURE__ */ a.jsx(kr, { players: e.players, role: "C", label: "Centrocampisti" }),
      (t === "ALL" || t === "A") && /* @__PURE__ */ a.jsx(kr, { players: e.players, role: "A", label: "Attaccanti" })
    ] }) })
  ] });
}
function ni(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function gp(e) {
  if (typeof e == "number" && Number.isFinite(e))
    return e;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e.trim().replace(",", "."));
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function yp(e) {
  if (!ni(e))
    return {};
  const t = ni(e.teams) ? e.teams : e;
  return Object.entries(t).reduce((n, [r, l]) => {
    if (!ni(l))
      return n;
    const i = l, o = i.logoUrl ?? i.logo_url;
    return n[r] = {
      credits: gp(i.credits),
      logoUrl: typeof o == "string" ? o.trim() : ""
    }, n;
  }, {});
}
async function wp(e, t) {
  if (!e)
    return {};
  const n = t || `/data/${encodeURIComponent(e)}/teams.json`, r = await fetch(n, { cache: "no-store" });
  if (r.status === 404)
    return {};
  if (!r.ok)
    throw new Error(`Impossibile caricare i profili rose: HTTP ${r.status}`);
  return yp(await r.json());
}
const us = { P: 2, D: 8, C: 8, A: 6 };
function xp({ assets: e, leagueId: t, profilesUrl: n }) {
  const [r, l] = U.useState({});
  U.useEffect(() => {
    let o = !1;
    return wp(t, n).then((u) => {
      o || l(u);
    }).catch((u) => {
      console.warn("Team profiles load error", u), o || l({});
    }), () => {
      o = !0;
    };
  }, [t, n]);
  const i = U.useMemo(() => {
    const o = /* @__PURE__ */ new Map();
    return e.forEach((s) => {
      if (s.isFreeAgent || !s.ownerTag)
        return;
      const c = s.ownerTag.trim();
      if (!c)
        return;
      const m = o.get(c) ?? [];
      m.push(s), o.set(c, m);
    }), [...o.entries()].map(([s, c]) => {
      const m = { P: 0, D: 0, C: 0, A: 0 };
      c.forEach((w) => {
        w.role in m && (m[w.role] += 1);
      });
      const v = Object.keys(us).every((w) => m[w] === us[w]), h = r[s];
      return {
        managerName: s,
        credits: (h == null ? void 0 : h.credits) ?? null,
        logoUrl: (h == null ? void 0 : h.logoUrl) ?? "",
        players: c,
        isComplete: v,
        roleCounts: m,
        totalPlayers: c.length
      };
    }).sort((s, c) => {
      const m = s.managerName.includes("-"), v = c.managerName.includes("-");
      return m !== v ? m ? 1 : -1 : s.managerName.localeCompare(c.managerName, "it");
    });
  }, [e, r]);
  return /* @__PURE__ */ a.jsx("div", { className: "tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-7xl", children: [
    i.length > 0 ? /* @__PURE__ */ a.jsx("div", { className: "lf-teams-grid", children: i.map((o) => /* @__PURE__ */ a.jsx(vp, { team: o }, o.managerName)) }) : /* @__PURE__ */ a.jsxs("div", { className: "lf-teams-empty", children: [
      /* @__PURE__ */ a.jsx(Zi, { size: 34 }),
      /* @__PURE__ */ a.jsx("h2", { children: "Nessuna rosa disponibile" }),
      /* @__PURE__ */ a.jsx("p", { children: "Nel CSV non risultano asset assegnati a un proprietario." })
    ] })
  ] }) });
}
function Sp() {
  var r;
  const { state: e, assets: t, league: n } = Cc();
  return e.status === "error" ? /* @__PURE__ */ a.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ a.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-red-600", children: "Errore nel caricamento delle Rose" }),
    /* @__PURE__ */ a.jsx("p", { className: "tw-mb-0 tw-mt-2 tw-text-sm tw-text-slate-500", children: "Controlla il CSV della lega e ricarica la pagina." })
  ] }) }) : e.status !== "ready" ? /* @__PURE__ */ a.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ a.jsx("div", { className: "lf-spinner tw-mx-auto tw-mb-3" }),
    /* @__PURE__ */ a.jsx("p", { className: "tw-m-0 tw-text-sm tw-font-semibold tw-text-slate-500", children: "Caricamento delle Rose…" })
  ] }) }) : /* @__PURE__ */ a.jsx(xp, { assets: t, leagueId: (n == null ? void 0 : n.id) ?? "", profilesUrl: (r = n == null ? void 0 : n.leagueData) == null ? void 0 : r.teamProfilesUrl });
}
const ss = document.getElementById("league-dashboard-root"), as = document.getElementById("league-rose-root");
ss && Dr.createRoot(ss).render(
  /* @__PURE__ */ a.jsx(ws.StrictMode, { children: /* @__PURE__ */ a.jsx(dp, {}) })
);
as && Dr.createRoot(as).render(
  /* @__PURE__ */ a.jsx(ws.StrictMode, { children: /* @__PURE__ */ a.jsx(Sp, {}) })
);
