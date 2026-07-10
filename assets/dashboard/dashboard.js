function Lc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var vu = { exports: {} }, al = {}, gu = { exports: {} }, R = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jn = Symbol.for("react.element"), Rc = Symbol.for("react.portal"), Mc = Symbol.for("react.fragment"), Fc = Symbol.for("react.strict_mode"), Dc = Symbol.for("react.profiler"), Oc = Symbol.for("react.provider"), Ic = Symbol.for("react.context"), Uc = Symbol.for("react.forward_ref"), $c = Symbol.for("react.suspense"), Ac = Symbol.for("react.memo"), Bc = Symbol.for("react.lazy"), Yo = Symbol.iterator;
function Vc(e) {
  return e === null || typeof e != "object" ? null : (e = Yo && e[Yo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var yu = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, wu = Object.assign, xu = {};
function an(e, t, n) {
  this.props = e, this.context = t, this.refs = xu, this.updater = n || yu;
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
function Su() {
}
Su.prototype = an.prototype;
function Ji(e, t, n) {
  this.props = e, this.context = t, this.refs = xu, this.updater = n || yu;
}
var bi = Ji.prototype = new Su();
bi.constructor = Ji;
wu(bi, an.prototype);
bi.isPureReactComponent = !0;
var Xo = Array.isArray, ku = Object.prototype.hasOwnProperty, eo = { current: null }, Nu = { key: !0, ref: !0, __self: !0, __source: !0 };
function ju(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null)
    for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t)
      ku.call(t, r) && !Nu.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1)
    l.children = n;
  else if (1 < s) {
    for (var u = Array(s), c = 0; c < s; c++)
      u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps)
    for (r in s = e.defaultProps, s)
      l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: Jn, type: e, key: i, ref: o, props: l, _owner: eo.current };
}
function Hc(e, t) {
  return { $$typeof: Jn, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function to(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Jn;
}
function Qc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var qo = /\/+/g;
function Pl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Qc("" + e.key) : t.toString(36);
}
function Cr(e, t, n, r, l) {
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
          case Jn:
          case Rc:
            o = !0;
        }
    }
  if (o)
    return o = e, l = l(o), e = r === "" ? "." + Pl(o, 0) : r, Xo(l) ? (n = "", e != null && (n = e.replace(qo, "$&/") + "/"), Cr(l, t, n, "", function(c) {
      return c;
    })) : l != null && (to(l) && (l = Hc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(qo, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", Xo(e))
    for (var s = 0; s < e.length; s++) {
      i = e[s];
      var u = r + Pl(i, s);
      o += Cr(i, t, n, u, l);
    }
  else if (u = Vc(e), typeof u == "function")
    for (e = u.call(e), s = 0; !(i = e.next()).done; )
      i = i.value, u = r + Pl(i, s++), o += Cr(i, t, n, u, l);
  else if (i === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function or(e, t, n) {
  if (e == null)
    return e;
  var r = [], l = 0;
  return Cr(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function Wc(e) {
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
var ae = { current: null }, Er = { transition: null }, Gc = { ReactCurrentDispatcher: ae, ReactCurrentBatchConfig: Er, ReactCurrentOwner: eo };
R.Children = { map: or, forEach: function(e, t, n) {
  or(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return or(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return or(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!to(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
R.Component = an;
R.Fragment = Mc;
R.Profiler = Dc;
R.PureComponent = Ji;
R.StrictMode = Fc;
R.Suspense = $c;
R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Gc;
R.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = wu({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = eo.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps)
      var s = e.type.defaultProps;
    for (u in t)
      ku.call(t, u) && !Nu.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1)
    r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var c = 0; c < u; c++)
      s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: Jn, type: e.type, key: l, ref: i, props: r, _owner: o };
};
R.createContext = function(e) {
  return e = { $$typeof: Ic, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Oc, _context: e }, e.Consumer = e;
};
R.createElement = ju;
R.createFactory = function(e) {
  var t = ju.bind(null, e);
  return t.type = e, t;
};
R.createRef = function() {
  return { current: null };
};
R.forwardRef = function(e) {
  return { $$typeof: Uc, render: e };
};
R.isValidElement = to;
R.lazy = function(e) {
  return { $$typeof: Bc, _payload: { _status: -1, _result: e }, _init: Wc };
};
R.memo = function(e, t) {
  return { $$typeof: Ac, type: e, compare: t === void 0 ? null : t };
};
R.startTransition = function(e) {
  var t = Er.transition;
  Er.transition = {};
  try {
    e();
  } finally {
    Er.transition = t;
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
gu.exports = R;
var M = gu.exports;
const no = /* @__PURE__ */ Lc(M);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kc = M, Yc = Symbol.for("react.element"), Xc = Symbol.for("react.fragment"), qc = Object.prototype.hasOwnProperty, Zc = Kc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Jc = { key: !0, ref: !0, __self: !0, __source: !0 };
function Cu(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t)
    qc.call(t, r) && !Jc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t)
      l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Yc, type: e, key: i, ref: o, props: l, _owner: Zc.current };
}
al.Fragment = Xc;
al.jsx = Cu;
al.jsxs = Cu;
vu.exports = al;
var a = vu.exports, Fn = {}, Eu = { exports: {} }, xe = {}, _u = { exports: {} }, Pu = {};
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
        var W = L - 1 >>> 1, Z = C[W];
        if (0 < l(Z, z))
          C[W] = z, C[L] = Z, L = W;
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
        for (var W = 0, Z = C.length, lr = Z >>> 1; W < lr; ) {
          var xt = 2 * (W + 1) - 1, _l = C[xt], St = xt + 1, ir = C[St];
          if (0 > l(_l, L))
            St < Z && 0 > l(ir, _l) ? (C[W] = ir, C[St] = L, W = St) : (C[W] = _l, C[xt] = L, W = xt);
          else if (St < Z && 0 > l(ir, L))
            C[W] = ir, C[St] = L, W = St;
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
    var o = Date, s = o.now();
    e.unstable_now = function() {
      return o.now() - s;
    };
  }
  var u = [], c = [], p = 1, v = null, h = 3, w = !1, x = !1, S = !1, O = typeof setTimeout == "function" ? setTimeout : null, d = typeof clearTimeout == "function" ? clearTimeout : null, f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(C) {
    for (var z = n(c); z !== null; ) {
      if (z.callback === null)
        r(c);
      else if (z.startTime <= C)
        r(c), z.sortIndex = z.expirationTime, t(u, z);
      else
        break;
      z = n(c);
    }
  }
  function g(C) {
    if (S = !1, m(C), !x)
      if (n(u) !== null)
        x = !0, Cl(k);
      else {
        var z = n(c);
        z !== null && El(g, z.startTime - C);
      }
  }
  function k(C, z) {
    x = !1, S && (S = !1, d(P), P = -1), w = !0;
    var L = h;
    try {
      for (m(z), v = n(u); v !== null && (!(v.expirationTime > z) || C && !K()); ) {
        var W = v.callback;
        if (typeof W == "function") {
          v.callback = null, h = v.priorityLevel;
          var Z = W(v.expirationTime <= z);
          z = e.unstable_now(), typeof Z == "function" ? v.callback = Z : v === n(u) && r(u), m(z);
        } else
          r(u);
        v = n(u);
      }
      if (v !== null)
        var lr = !0;
      else {
        var xt = n(c);
        xt !== null && El(g, xt.startTime - z), lr = !1;
      }
      return lr;
    } finally {
      v = null, h = L, w = !1;
    }
  }
  var E = !1, _ = null, P = -1, j = 5, T = -1;
  function K() {
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
    var dn = new MessageChannel(), rr = dn.port2;
    dn.port1.onmessage = Je, be = function() {
      rr.postMessage(null);
    };
  } else
    be = function() {
      O(Je, 0);
    };
  function Cl(C) {
    _ = C, E || (E = !0, be());
  }
  function El(C, z) {
    P = O(function() {
      C(e.unstable_now());
    }, z);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(C) {
    C.callback = null;
  }, e.unstable_continueExecution = function() {
    x || w || (x = !0, Cl(k));
  }, e.unstable_forceFrameRate = function(C) {
    0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : j = 0 < C ? Math.floor(1e3 / C) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
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
        var Z = -1;
        break;
      case 2:
        Z = 250;
        break;
      case 5:
        Z = 1073741823;
        break;
      case 4:
        Z = 1e4;
        break;
      default:
        Z = 5e3;
    }
    return Z = L + Z, C = { id: p++, callback: z, priorityLevel: C, startTime: L, expirationTime: Z, sortIndex: -1 }, L > W ? (C.sortIndex = L, t(c, C), n(u) === null && C === n(c) && (S ? (d(P), P = -1) : S = !0, El(g, L - W))) : (C.sortIndex = Z, t(u, C), x || w || (x = !0, Cl(k))), C;
  }, e.unstable_shouldYield = K, e.unstable_wrapCallback = function(C) {
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
})(Pu);
_u.exports = Pu;
var bc = _u.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tu = M, we = bc;
function y(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var zu = /* @__PURE__ */ new Set(), Dn = {};
function Ft(e, t) {
  tn(e, t), tn(e + "Capture", t);
}
function tn(e, t) {
  for (Dn[e] = t, e = 0; e < t.length; e++)
    zu.add(t[e]);
}
var Ge = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), li = Object.prototype.hasOwnProperty, ef = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Zo = {}, Jo = {};
function tf(e) {
  return li.call(Jo, e) ? !0 : li.call(Zo, e) ? !1 : ef.test(e) ? Jo[e] = !0 : (Zo[e] = !0, !1);
}
function nf(e, t, n, r) {
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
function rf(e, t, n, r) {
  if (t === null || typeof t > "u" || nf(e, t, n, r))
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
var ro = /[\-:]([a-z])/g;
function lo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ro,
    lo
  );
  ne[t] = new ce(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ro, lo);
  ne[t] = new ce(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ro, lo);
  ne[t] = new ce(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ne[e] = new ce(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ne.xlinkHref = new ce("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ne[e] = new ce(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function io(e, t, n, r) {
  var l = ne.hasOwnProperty(t) ? ne[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (rf(t, n, l, r) && (n = null), r || l === null ? tf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var qe = Tu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, sr = Symbol.for("react.element"), It = Symbol.for("react.portal"), Ut = Symbol.for("react.fragment"), oo = Symbol.for("react.strict_mode"), ii = Symbol.for("react.profiler"), Lu = Symbol.for("react.provider"), Ru = Symbol.for("react.context"), so = Symbol.for("react.forward_ref"), oi = Symbol.for("react.suspense"), si = Symbol.for("react.suspense_list"), uo = Symbol.for("react.memo"), tt = Symbol.for("react.lazy"), Mu = Symbol.for("react.offscreen"), bo = Symbol.iterator;
function pn(e) {
  return e === null || typeof e != "object" ? null : (e = bo && e[bo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var H = Object.assign, Tl;
function Sn(e) {
  if (Tl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Tl = t && t[1] || "";
    }
  return `
` + Tl + e;
}
var zl = !1;
function Ll(e, t) {
  if (!e || zl)
    return "";
  zl = !0;
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
`), o = l.length - 1, s = i.length - 1; 1 <= o && 0 <= s && l[o] !== i[s]; )
        s--;
      for (; 1 <= o && 0 <= s; o--, s--)
        if (l[o] !== i[s]) {
          if (o !== 1 || s !== 1)
            do
              if (o--, s--, 0 > s || l[o] !== i[s]) {
                var u = `
` + l[o].replace(" at new ", " at ");
                return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
              }
            while (1 <= o && 0 <= s);
          break;
        }
    }
  } finally {
    zl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Sn(e) : "";
}
function lf(e) {
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
      return e = Ll(e.type, !1), e;
    case 11:
      return e = Ll(e.type.render, !1), e;
    case 1:
      return e = Ll(e.type, !0), e;
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
    case ii:
      return "Profiler";
    case oo:
      return "StrictMode";
    case oi:
      return "Suspense";
    case si:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Ru:
        return (e.displayName || "Context") + ".Consumer";
      case Lu:
        return (e._context.displayName || "Context") + ".Provider";
      case so:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case uo:
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
function of(e) {
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
      return t === oo ? "StrictMode" : "Mode";
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
function Fu(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function sf(e) {
  var t = Fu(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  e._valueTracker || (e._valueTracker = sf(e));
}
function Du(e) {
  if (!e)
    return !1;
  var t = e._valueTracker;
  if (!t)
    return !0;
  var n = t.getValue(), r = "";
  return e && (r = Fu(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ir(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ai(e, t) {
  var n = t.checked;
  return H({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function es(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = ht(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ou(e, t) {
  t = t.checked, t != null && io(e, "checked", t, !1);
}
function ci(e, t) {
  Ou(e, t);
  var n = ht(t.value), r = t.type;
  if (n != null)
    r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? fi(e, t.type, n) : t.hasOwnProperty("defaultValue") && fi(e, t.type, ht(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ts(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
      return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function fi(e, t, n) {
  (t !== "number" || Ir(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
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
function di(e, t) {
  if (t.dangerouslySetInnerHTML != null)
    throw Error(y(91));
  return H({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function ns(e, t) {
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
function Iu(e, t) {
  var n = ht(t.value), r = ht(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function rs(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Uu(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function pi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Uu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var ar, $u = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
    e.innerHTML = t;
  else {
    for (ar = ar || document.createElement("div"), ar.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ar.firstChild; e.firstChild; )
      e.removeChild(e.firstChild);
    for (; t.firstChild; )
      e.appendChild(t.firstChild);
  }
});
function On(e, t) {
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
}, uf = ["Webkit", "ms", "Moz", "O"];
Object.keys(Cn).forEach(function(e) {
  uf.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Cn[t] = Cn[e];
  });
});
function Au(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Cn.hasOwnProperty(e) && Cn[e] ? ("" + t).trim() : t + "px";
}
function Bu(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, l = Au(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
}
var af = H({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function mi(e, t) {
  if (t) {
    if (af[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
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
function hi(e, t) {
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
var vi = null;
function ao(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var gi = null, qt = null, Zt = null;
function ls(e) {
  if (e = tr(e)) {
    if (typeof gi != "function")
      throw Error(y(280));
    var t = e.stateNode;
    t && (t = ml(t), gi(e.stateNode, e.type, t));
  }
}
function Vu(e) {
  qt ? Zt ? Zt.push(e) : Zt = [e] : qt = e;
}
function Hu() {
  if (qt) {
    var e = qt, t = Zt;
    if (Zt = qt = null, ls(e), t)
      for (e = 0; e < t.length; e++)
        ls(t[e]);
  }
}
function Qu(e, t) {
  return e(t);
}
function Wu() {
}
var Rl = !1;
function Gu(e, t, n) {
  if (Rl)
    return e(t, n);
  Rl = !0;
  try {
    return Qu(e, t, n);
  } finally {
    Rl = !1, (qt !== null || Zt !== null) && (Wu(), Hu());
  }
}
function In(e, t) {
  var n = e.stateNode;
  if (n === null)
    return null;
  var r = ml(n);
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
var yi = !1;
if (Ge)
  try {
    var mn = {};
    Object.defineProperty(mn, "passive", { get: function() {
      yi = !0;
    } }), window.addEventListener("test", mn, mn), window.removeEventListener("test", mn, mn);
  } catch {
    yi = !1;
  }
function cf(e, t, n, r, l, i, o, s, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (p) {
    this.onError(p);
  }
}
var En = !1, Ur = null, $r = !1, wi = null, ff = { onError: function(e) {
  En = !0, Ur = e;
} };
function df(e, t, n, r, l, i, o, s, u) {
  En = !1, Ur = null, cf.apply(ff, arguments);
}
function pf(e, t, n, r, l, i, o, s, u) {
  if (df.apply(this, arguments), En) {
    if (En) {
      var c = Ur;
      En = !1, Ur = null;
    } else
      throw Error(y(198));
    $r || ($r = !0, wi = c);
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
function Ku(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
      return t.dehydrated;
  }
  return null;
}
function is(e) {
  if (Dt(e) !== e)
    throw Error(y(188));
}
function mf(e) {
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
          return is(l), e;
        if (i === r)
          return is(l), t;
        i = i.sibling;
      }
      throw Error(y(188));
    }
    if (n.return !== r.return)
      n = l, r = i;
    else {
      for (var o = !1, s = l.child; s; ) {
        if (s === n) {
          o = !0, n = l, r = i;
          break;
        }
        if (s === r) {
          o = !0, r = l, n = i;
          break;
        }
        s = s.sibling;
      }
      if (!o) {
        for (s = i.child; s; ) {
          if (s === n) {
            o = !0, n = i, r = l;
            break;
          }
          if (s === r) {
            o = !0, r = i, n = l;
            break;
          }
          s = s.sibling;
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
function Yu(e) {
  return e = mf(e), e !== null ? Xu(e) : null;
}
function Xu(e) {
  if (e.tag === 5 || e.tag === 6)
    return e;
  for (e = e.child; e !== null; ) {
    var t = Xu(e);
    if (t !== null)
      return t;
    e = e.sibling;
  }
  return null;
}
var qu = we.unstable_scheduleCallback, os = we.unstable_cancelCallback, hf = we.unstable_shouldYield, vf = we.unstable_requestPaint, G = we.unstable_now, gf = we.unstable_getCurrentPriorityLevel, co = we.unstable_ImmediatePriority, Zu = we.unstable_UserBlockingPriority, Ar = we.unstable_NormalPriority, yf = we.unstable_LowPriority, Ju = we.unstable_IdlePriority, cl = null, Ue = null;
function wf(e) {
  if (Ue && typeof Ue.onCommitFiberRoot == "function")
    try {
      Ue.onCommitFiberRoot(cl, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
}
var Re = Math.clz32 ? Math.clz32 : kf, xf = Math.log, Sf = Math.LN2;
function kf(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (xf(e) / Sf | 0) | 0;
}
var cr = 64, fr = 4194304;
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
function Br(e, t) {
  var n = e.pendingLanes;
  if (n === 0)
    return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var s = o & ~l;
    s !== 0 ? r = Nn(s) : (i &= o, i !== 0 && (r = Nn(i)));
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
function Nf(e, t) {
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
function jf(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - Re(i), s = 1 << o, u = l[o];
    u === -1 ? (!(s & n) || s & r) && (l[o] = Nf(s, t)) : u <= t && (e.expiredLanes |= s), i &= ~s;
  }
}
function xi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function bu() {
  var e = cr;
  return cr <<= 1, !(cr & 4194240) && (cr = 64), e;
}
function Ml(e) {
  for (var t = [], n = 0; 31 > n; n++)
    t.push(e);
  return t;
}
function bn(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Re(t), e[t] = n;
}
function Cf(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Re(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function fo(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Re(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var D = 0;
function ea(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var ta, po, na, ra, la, Si = !1, dr = [], st = null, ut = null, at = null, Un = /* @__PURE__ */ new Map(), $n = /* @__PURE__ */ new Map(), rt = [], Ef = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ss(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      st = null;
      break;
    case "dragenter":
    case "dragleave":
      ut = null;
      break;
    case "mouseover":
    case "mouseout":
      at = null;
      break;
    case "pointerover":
    case "pointerout":
      Un.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      $n.delete(t.pointerId);
  }
}
function hn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = tr(t), t !== null && po(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function _f(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return st = hn(st, e, t, n, r, l), !0;
    case "dragenter":
      return ut = hn(ut, e, t, n, r, l), !0;
    case "mouseover":
      return at = hn(at, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Un.set(i, hn(Un.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, $n.set(i, hn($n.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function ia(e) {
  var t = jt(e.target);
  if (t !== null) {
    var n = Dt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ku(n), t !== null) {
          e.blockedOn = t, la(e.priority, function() {
            na(n);
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
function _r(e) {
  if (e.blockedOn !== null)
    return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = ki(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      vi = r, n.target.dispatchEvent(r), vi = null;
    } else
      return t = tr(n), t !== null && po(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function us(e, t, n) {
  _r(e) && n.delete(t);
}
function Pf() {
  Si = !1, st !== null && _r(st) && (st = null), ut !== null && _r(ut) && (ut = null), at !== null && _r(at) && (at = null), Un.forEach(us), $n.forEach(us);
}
function vn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Si || (Si = !0, we.unstable_scheduleCallback(we.unstable_NormalPriority, Pf)));
}
function An(e) {
  function t(l) {
    return vn(l, e);
  }
  if (0 < dr.length) {
    vn(dr[0], e);
    for (var n = 1; n < dr.length; n++) {
      var r = dr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (st !== null && vn(st, e), ut !== null && vn(ut, e), at !== null && vn(at, e), Un.forEach(t), $n.forEach(t), n = 0; n < rt.length; n++)
    r = rt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < rt.length && (n = rt[0], n.blockedOn === null); )
    ia(n), n.blockedOn === null && rt.shift();
}
var Jt = qe.ReactCurrentBatchConfig, Vr = !0;
function Tf(e, t, n, r) {
  var l = D, i = Jt.transition;
  Jt.transition = null;
  try {
    D = 1, mo(e, t, n, r);
  } finally {
    D = l, Jt.transition = i;
  }
}
function zf(e, t, n, r) {
  var l = D, i = Jt.transition;
  Jt.transition = null;
  try {
    D = 4, mo(e, t, n, r);
  } finally {
    D = l, Jt.transition = i;
  }
}
function mo(e, t, n, r) {
  if (Vr) {
    var l = ki(e, t, n, r);
    if (l === null)
      Hl(e, t, r, Hr, n), ss(e, r);
    else if (_f(l, e, t, n, r))
      r.stopPropagation();
    else if (ss(e, r), t & 4 && -1 < Ef.indexOf(e)) {
      for (; l !== null; ) {
        var i = tr(l);
        if (i !== null && ta(i), i = ki(e, t, n, r), i === null && Hl(e, t, r, Hr, n), i === l)
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else
      Hl(e, t, r, null, n);
  }
}
var Hr = null;
function ki(e, t, n, r) {
  if (Hr = null, e = ao(r), e = jt(e), e !== null)
    if (t = Dt(e), t === null)
      e = null;
    else if (n = t.tag, n === 13) {
      if (e = Ku(t), e !== null)
        return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else
      t !== e && (e = null);
  return Hr = e, null;
}
function oa(e) {
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
      switch (gf()) {
        case co:
          return 1;
        case Zu:
          return 4;
        case Ar:
        case yf:
          return 16;
        case Ju:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var it = null, ho = null, Pr = null;
function sa() {
  if (Pr)
    return Pr;
  var e, t = ho, n = t.length, r, l = "value" in it ? it.value : it.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++)
    ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++)
    ;
  return Pr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Tr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function pr() {
  return !0;
}
function as() {
  return !1;
}
function Se(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var s in e)
      e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(i) : i[s]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? pr : as, this.isPropagationStopped = as, this;
  }
  return H(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = pr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = pr);
  }, persist: function() {
  }, isPersistent: pr }), t;
}
var cn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, vo = Se(cn), er = H({}, cn, { view: 0, detail: 0 }), Lf = Se(er), Fl, Dl, gn, fl = H({}, er, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: go, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== gn && (gn && e.type === "mousemove" ? (Fl = e.screenX - gn.screenX, Dl = e.screenY - gn.screenY) : Dl = Fl = 0, gn = e), Fl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Dl;
} }), cs = Se(fl), Rf = H({}, fl, { dataTransfer: 0 }), Mf = Se(Rf), Ff = H({}, er, { relatedTarget: 0 }), Ol = Se(Ff), Df = H({}, cn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Of = Se(Df), If = H({}, cn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Uf = Se(If), $f = H({}, cn, { data: 0 }), fs = Se($f), Af = {
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
}, Bf = {
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
}, Vf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Hf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Vf[e]) ? !!t[e] : !1;
}
function go() {
  return Hf;
}
var Qf = H({}, er, { key: function(e) {
  if (e.key) {
    var t = Af[e.key] || e.key;
    if (t !== "Unidentified")
      return t;
  }
  return e.type === "keypress" ? (e = Tr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Bf[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: go, charCode: function(e) {
  return e.type === "keypress" ? Tr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Tr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Wf = Se(Qf), Gf = H({}, fl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ds = Se(Gf), Kf = H({}, er, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: go }), Yf = Se(Kf), Xf = H({}, cn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), qf = Se(Xf), Zf = H({}, fl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Jf = Se(Zf), bf = [9, 13, 27, 32], yo = Ge && "CompositionEvent" in window, _n = null;
Ge && "documentMode" in document && (_n = document.documentMode);
var ed = Ge && "TextEvent" in window && !_n, ua = Ge && (!yo || _n && 8 < _n && 11 >= _n), ps = " ", ms = !1;
function aa(e, t) {
  switch (e) {
    case "keyup":
      return bf.indexOf(t.keyCode) !== -1;
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
function ca(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var $t = !1;
function td(e, t) {
  switch (e) {
    case "compositionend":
      return ca(t);
    case "keypress":
      return t.which !== 32 ? null : (ms = !0, ps);
    case "textInput":
      return e = t.data, e === ps && ms ? null : e;
    default:
      return null;
  }
}
function nd(e, t) {
  if ($t)
    return e === "compositionend" || !yo && aa(e, t) ? (e = sa(), Pr = ho = it = null, $t = !1, e) : null;
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
      return ua && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var rd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function hs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!rd[e.type] : t === "textarea";
}
function fa(e, t, n, r) {
  Vu(r), t = Qr(t, "onChange"), 0 < t.length && (n = new vo("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Pn = null, Bn = null;
function ld(e) {
  ka(e, 0);
}
function dl(e) {
  var t = Vt(e);
  if (Du(t))
    return e;
}
function id(e, t) {
  if (e === "change")
    return t;
}
var da = !1;
if (Ge) {
  var Il;
  if (Ge) {
    var Ul = "oninput" in document;
    if (!Ul) {
      var vs = document.createElement("div");
      vs.setAttribute("oninput", "return;"), Ul = typeof vs.oninput == "function";
    }
    Il = Ul;
  } else
    Il = !1;
  da = Il && (!document.documentMode || 9 < document.documentMode);
}
function gs() {
  Pn && (Pn.detachEvent("onpropertychange", pa), Bn = Pn = null);
}
function pa(e) {
  if (e.propertyName === "value" && dl(Bn)) {
    var t = [];
    fa(t, Bn, e, ao(e)), Gu(ld, t);
  }
}
function od(e, t, n) {
  e === "focusin" ? (gs(), Pn = t, Bn = n, Pn.attachEvent("onpropertychange", pa)) : e === "focusout" && gs();
}
function sd(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return dl(Bn);
}
function ud(e, t) {
  if (e === "click")
    return dl(t);
}
function ad(e, t) {
  if (e === "input" || e === "change")
    return dl(t);
}
function cd(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Fe = typeof Object.is == "function" ? Object.is : cd;
function Vn(e, t) {
  if (Fe(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!li.call(t, l) || !Fe(e[l], t[l]))
      return !1;
  }
  return !0;
}
function ys(e) {
  for (; e && e.firstChild; )
    e = e.firstChild;
  return e;
}
function ws(e, t) {
  var n = ys(e);
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
    n = ys(n);
  }
}
function ma(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ma(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function ha() {
  for (var e = window, t = Ir(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n)
      e = t.contentWindow;
    else
      break;
    t = Ir(e.document);
  }
  return t;
}
function wo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function fd(e) {
  var t = ha(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ma(n.ownerDocument.documentElement, n)) {
    if (r !== null && wo(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
        n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = ws(n, i);
        var o = ws(
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
var dd = Ge && "documentMode" in document && 11 >= document.documentMode, At = null, Ni = null, Tn = null, ji = !1;
function xs(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  ji || At == null || At !== Ir(r) || (r = At, "selectionStart" in r && wo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Tn && Vn(Tn, r) || (Tn = r, r = Qr(Ni, "onSelect"), 0 < r.length && (t = new vo("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = At)));
}
function mr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Bt = { animationend: mr("Animation", "AnimationEnd"), animationiteration: mr("Animation", "AnimationIteration"), animationstart: mr("Animation", "AnimationStart"), transitionend: mr("Transition", "TransitionEnd") }, $l = {}, va = {};
Ge && (va = document.createElement("div").style, "AnimationEvent" in window || (delete Bt.animationend.animation, delete Bt.animationiteration.animation, delete Bt.animationstart.animation), "TransitionEvent" in window || delete Bt.transitionend.transition);
function pl(e) {
  if ($l[e])
    return $l[e];
  if (!Bt[e])
    return e;
  var t = Bt[e], n;
  for (n in t)
    if (t.hasOwnProperty(n) && n in va)
      return $l[e] = t[n];
  return e;
}
var ga = pl("animationend"), ya = pl("animationiteration"), wa = pl("animationstart"), xa = pl("transitionend"), Sa = /* @__PURE__ */ new Map(), Ss = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function gt(e, t) {
  Sa.set(e, t), Ft(t, [e]);
}
for (var Al = 0; Al < Ss.length; Al++) {
  var Bl = Ss[Al], pd = Bl.toLowerCase(), md = Bl[0].toUpperCase() + Bl.slice(1);
  gt(pd, "on" + md);
}
gt(ga, "onAnimationEnd");
gt(ya, "onAnimationIteration");
gt(wa, "onAnimationStart");
gt("dblclick", "onDoubleClick");
gt("focusin", "onFocus");
gt("focusout", "onBlur");
gt(xa, "onTransitionEnd");
tn("onMouseEnter", ["mouseout", "mouseover"]);
tn("onMouseLeave", ["mouseout", "mouseover"]);
tn("onPointerEnter", ["pointerout", "pointerover"]);
tn("onPointerLeave", ["pointerout", "pointerover"]);
Ft("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ft("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ft("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ft("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ft("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ft("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var jn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), hd = new Set("cancel close invalid load scroll toggle".split(" ").concat(jn));
function ks(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, pf(r, t, void 0, e), e.currentTarget = null;
}
function ka(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var s = r[o], u = s.instance, c = s.currentTarget;
          if (s = s.listener, u !== i && l.isPropagationStopped())
            break e;
          ks(l, s, c), i = u;
        }
      else
        for (o = 0; o < r.length; o++) {
          if (s = r[o], u = s.instance, c = s.currentTarget, s = s.listener, u !== i && l.isPropagationStopped())
            break e;
          ks(l, s, c), i = u;
        }
    }
  }
  if ($r)
    throw e = wi, $r = !1, wi = null, e;
}
function U(e, t) {
  var n = t[Ti];
  n === void 0 && (n = t[Ti] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Na(t, e, 2, !1), n.add(r));
}
function Vl(e, t, n) {
  var r = 0;
  t && (r |= 4), Na(n, e, r, t);
}
var hr = "_reactListening" + Math.random().toString(36).slice(2);
function Hn(e) {
  if (!e[hr]) {
    e[hr] = !0, zu.forEach(function(n) {
      n !== "selectionchange" && (hd.has(n) || Vl(n, !1, e), Vl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[hr] || (t[hr] = !0, Vl("selectionchange", !1, t));
  }
}
function Na(e, t, n, r) {
  switch (oa(t)) {
    case 1:
      var l = Tf;
      break;
    case 4:
      l = zf;
      break;
    default:
      l = mo;
  }
  n = l.bind(null, t, n, e), l = void 0, !yi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Hl(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e:
      for (; ; ) {
        if (r === null)
          return;
        var o = r.tag;
        if (o === 3 || o === 4) {
          var s = r.stateNode.containerInfo;
          if (s === l || s.nodeType === 8 && s.parentNode === l)
            break;
          if (o === 4)
            for (o = r.return; o !== null; ) {
              var u = o.tag;
              if ((u === 3 || u === 4) && (u = o.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l))
                return;
              o = o.return;
            }
          for (; s !== null; ) {
            if (o = jt(s), o === null)
              return;
            if (u = o.tag, u === 5 || u === 6) {
              r = i = o;
              continue e;
            }
            s = s.parentNode;
          }
        }
        r = r.return;
      }
  Gu(function() {
    var c = i, p = ao(n), v = [];
    e: {
      var h = Sa.get(e);
      if (h !== void 0) {
        var w = vo, x = e;
        switch (e) {
          case "keypress":
            if (Tr(n) === 0)
              break e;
          case "keydown":
          case "keyup":
            w = Wf;
            break;
          case "focusin":
            x = "focus", w = Ol;
            break;
          case "focusout":
            x = "blur", w = Ol;
            break;
          case "beforeblur":
          case "afterblur":
            w = Ol;
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
            w = cs;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = Mf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = Yf;
            break;
          case ga:
          case ya:
          case wa:
            w = Of;
            break;
          case xa:
            w = qf;
            break;
          case "scroll":
            w = Lf;
            break;
          case "wheel":
            w = Jf;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = Uf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = ds;
        }
        var S = (t & 4) !== 0, O = !S && e === "scroll", d = S ? h !== null ? h + "Capture" : null : h;
        S = [];
        for (var f = c, m; f !== null; ) {
          m = f;
          var g = m.stateNode;
          if (m.tag === 5 && g !== null && (m = g, d !== null && (g = In(f, d), g != null && S.push(Qn(f, g, m)))), O)
            break;
          f = f.return;
        }
        0 < S.length && (h = new w(h, x, null, n, p), v.push({ event: h, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", h && n !== vi && (x = n.relatedTarget || n.fromElement) && (jt(x) || x[Ke]))
          break e;
        if ((w || h) && (h = p.window === p ? p : (h = p.ownerDocument) ? h.defaultView || h.parentWindow : window, w ? (x = n.relatedTarget || n.toElement, w = c, x = x ? jt(x) : null, x !== null && (O = Dt(x), x !== O || x.tag !== 5 && x.tag !== 6) && (x = null)) : (w = null, x = c), w !== x)) {
          if (S = cs, g = "onMouseLeave", d = "onMouseEnter", f = "mouse", (e === "pointerout" || e === "pointerover") && (S = ds, g = "onPointerLeave", d = "onPointerEnter", f = "pointer"), O = w == null ? h : Vt(w), m = x == null ? h : Vt(x), h = new S(g, f + "leave", w, n, p), h.target = O, h.relatedTarget = m, g = null, jt(p) === c && (S = new S(d, f + "enter", x, n, p), S.target = m, S.relatedTarget = O, g = S), O = g, w && x)
            t: {
              for (S = w, d = x, f = 0, m = S; m; m = Ot(m))
                f++;
              for (m = 0, g = d; g; g = Ot(g))
                m++;
              for (; 0 < f - m; )
                S = Ot(S), f--;
              for (; 0 < m - f; )
                d = Ot(d), m--;
              for (; f--; ) {
                if (S === d || d !== null && S === d.alternate)
                  break t;
                S = Ot(S), d = Ot(d);
              }
              S = null;
            }
          else
            S = null;
          w !== null && Ns(v, h, w, S, !1), x !== null && O !== null && Ns(v, O, x, S, !0);
        }
      }
      e: {
        if (h = c ? Vt(c) : window, w = h.nodeName && h.nodeName.toLowerCase(), w === "select" || w === "input" && h.type === "file")
          var k = id;
        else if (hs(h))
          if (da)
            k = ad;
          else {
            k = sd;
            var E = od;
          }
        else
          (w = h.nodeName) && w.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (k = ud);
        if (k && (k = k(e, c))) {
          fa(v, k, n, p);
          break e;
        }
        E && E(e, h, c), e === "focusout" && (E = h._wrapperState) && E.controlled && h.type === "number" && fi(h, "number", h.value);
      }
      switch (E = c ? Vt(c) : window, e) {
        case "focusin":
          (hs(E) || E.contentEditable === "true") && (At = E, Ni = c, Tn = null);
          break;
        case "focusout":
          Tn = Ni = At = null;
          break;
        case "mousedown":
          ji = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ji = !1, xs(v, n, p);
          break;
        case "selectionchange":
          if (dd)
            break;
        case "keydown":
        case "keyup":
          xs(v, n, p);
      }
      var _;
      if (yo)
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
        $t ? aa(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P && (ua && n.locale !== "ko" && ($t || P !== "onCompositionStart" ? P === "onCompositionEnd" && $t && (_ = sa()) : (it = p, ho = "value" in it ? it.value : it.textContent, $t = !0)), E = Qr(c, P), 0 < E.length && (P = new fs(P, e, null, n, p), v.push({ event: P, listeners: E }), _ ? P.data = _ : (_ = ca(n), _ !== null && (P.data = _)))), (_ = ed ? td(e, n) : nd(e, n)) && (c = Qr(c, "onBeforeInput"), 0 < c.length && (p = new fs("onBeforeInput", "beforeinput", null, n, p), v.push({ event: p, listeners: c }), p.data = _));
    }
    ka(v, t);
  });
}
function Qn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Qr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = In(e, n), i != null && r.unshift(Qn(e, i, l)), i = In(e, t), i != null && r.push(Qn(e, i, l))), e = e.return;
  }
  return r;
}
function Ot(e) {
  if (e === null)
    return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ns(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var s = n, u = s.alternate, c = s.stateNode;
    if (u !== null && u === r)
      break;
    s.tag === 5 && c !== null && (s = c, l ? (u = In(n, i), u != null && o.unshift(Qn(n, u, s))) : l || (u = In(n, i), u != null && o.push(Qn(n, u, s)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var vd = /\r\n?/g, gd = /\u0000|\uFFFD/g;
function js(e) {
  return (typeof e == "string" ? e : "" + e).replace(vd, `
`).replace(gd, "");
}
function vr(e, t, n) {
  if (t = js(t), js(e) !== t && n)
    throw Error(y(425));
}
function Wr() {
}
var Ci = null, Ei = null;
function _i(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Pi = typeof setTimeout == "function" ? setTimeout : void 0, yd = typeof clearTimeout == "function" ? clearTimeout : void 0, Cs = typeof Promise == "function" ? Promise : void 0, wd = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cs < "u" ? function(e) {
  return Cs.resolve(null).then(e).catch(xd);
} : Pi;
function xd(e) {
  setTimeout(function() {
    throw e;
  });
}
function Ql(e, t) {
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
function Es(e) {
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
var fn = Math.random().toString(36).slice(2), Ie = "__reactFiber$" + fn, Wn = "__reactProps$" + fn, Ke = "__reactContainer$" + fn, Ti = "__reactEvents$" + fn, Sd = "__reactListeners$" + fn, kd = "__reactHandles$" + fn;
function jt(e) {
  var t = e[Ie];
  if (t)
    return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ke] || n[Ie]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
        for (e = Es(e); e !== null; ) {
          if (n = e[Ie])
            return n;
          e = Es(e);
        }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function tr(e) {
  return e = e[Ie] || e[Ke], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Vt(e) {
  if (e.tag === 5 || e.tag === 6)
    return e.stateNode;
  throw Error(y(33));
}
function ml(e) {
  return e[Wn] || null;
}
var zi = [], Ht = -1;
function yt(e) {
  return { current: e };
}
function $(e) {
  0 > Ht || (e.current = zi[Ht], zi[Ht] = null, Ht--);
}
function I(e, t) {
  Ht++, zi[Ht] = e.current, e.current = t;
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
function Gr() {
  $(pe), $(oe);
}
function _s(e, t, n) {
  if (oe.current !== vt)
    throw Error(y(168));
  I(oe, t), I(pe, n);
}
function ja(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function")
    return n;
  r = r.getChildContext();
  for (var l in r)
    if (!(l in t))
      throw Error(y(108, of(e) || "Unknown", l));
  return H({}, n, r);
}
function Kr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vt, Tt = oe.current, I(oe, e), I(pe, pe.current), !0;
}
function Ps(e, t, n) {
  var r = e.stateNode;
  if (!r)
    throw Error(y(169));
  n ? (e = ja(e, t, Tt), r.__reactInternalMemoizedMergedChildContext = e, $(pe), $(oe), I(oe, e)) : $(pe), I(pe, n);
}
var Be = null, hl = !1, Wl = !1;
function Ca(e) {
  Be === null ? Be = [e] : Be.push(e);
}
function Nd(e) {
  hl = !0, Ca(e);
}
function wt() {
  if (!Wl && Be !== null) {
    Wl = !0;
    var e = 0, t = D;
    try {
      var n = Be;
      for (D = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Be = null, hl = !1;
    } catch (l) {
      throw Be !== null && (Be = Be.slice(e + 1)), qu(co, wt), l;
    } finally {
      D = t, Wl = !1;
    }
  }
  return null;
}
var Qt = [], Wt = 0, Yr = null, Xr = 0, ke = [], Ne = 0, zt = null, He = 1, Qe = "";
function kt(e, t) {
  Qt[Wt++] = Xr, Qt[Wt++] = Yr, Yr = e, Xr = t;
}
function Ea(e, t, n) {
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
function xo(e) {
  e.return !== null && (kt(e, 1), Ea(e, 1, 0));
}
function So(e) {
  for (; e === Yr; )
    Yr = Qt[--Wt], Qt[Wt] = null, Xr = Qt[--Wt], Qt[Wt] = null;
  for (; e === zt; )
    zt = ke[--Ne], ke[Ne] = null, Qe = ke[--Ne], ke[Ne] = null, He = ke[--Ne], ke[Ne] = null;
}
var ye = null, ge = null, A = !1, Le = null;
function _a(e, t) {
  var n = je(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ts(e, t) {
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
function Li(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ri(e) {
  if (A) {
    var t = ge;
    if (t) {
      var n = t;
      if (!Ts(e, t)) {
        if (Li(e))
          throw Error(y(418));
        t = ct(n.nextSibling);
        var r = ye;
        t && Ts(e, t) ? _a(r, n) : (e.flags = e.flags & -4097 | 2, A = !1, ye = e);
      }
    } else {
      if (Li(e))
        throw Error(y(418));
      e.flags = e.flags & -4097 | 2, A = !1, ye = e;
    }
  }
}
function zs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  ye = e;
}
function gr(e) {
  if (e !== ye)
    return !1;
  if (!A)
    return zs(e), A = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !_i(e.type, e.memoizedProps)), t && (t = ge)) {
    if (Li(e))
      throw Pa(), Error(y(418));
    for (; t; )
      _a(e, t), t = ct(t.nextSibling);
  }
  if (zs(e), e.tag === 13) {
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
function Pa() {
  for (var e = ge; e; )
    e = ct(e.nextSibling);
}
function rn() {
  ge = ye = null, A = !1;
}
function ko(e) {
  Le === null ? Le = [e] : Le.push(e);
}
var jd = qe.ReactCurrentBatchConfig;
function Te(e, t) {
  if (e && e.defaultProps) {
    t = H({}, t), e = e.defaultProps;
    for (var n in e)
      t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var qr = yt(null), Zr = null, Gt = null, No = null;
function jo() {
  No = Gt = Zr = null;
}
function Co(e) {
  var t = qr.current;
  $(qr), e._currentValue = t;
}
function Mi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
      break;
    e = e.return;
  }
}
function bt(e, t) {
  Zr = e, No = Gt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (de = !0), e.firstContext = null);
}
function Ee(e) {
  var t = e._currentValue;
  if (No !== e)
    if (e = { context: e, memoizedValue: t, next: null }, Gt === null) {
      if (Zr === null)
        throw Error(y(308));
      Gt = e, Zr.dependencies = { lanes: 0, firstContext: e };
    } else
      Gt = Gt.next = e;
  return t;
}
var Ct = null;
function Eo(e) {
  Ct === null ? Ct = [e] : Ct.push(e);
}
function Ta(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Eo(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ye(e, r);
}
function Ye(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var nt = !1;
function _o(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function za(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function We(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ft(e, t, n) {
  var r = e.updateQueue;
  if (r === null)
    return null;
  if (r = r.shared, F & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ye(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Eo(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ye(e, n);
}
function zr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, fo(e, n);
  }
}
function Ls(e, t) {
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
function Jr(e, t, n, r) {
  var l = e.updateQueue;
  nt = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var u = s, c = u.next;
    u.next = null, o === null ? i = c : o.next = c, o = u;
    var p = e.alternate;
    p !== null && (p = p.updateQueue, s = p.lastBaseUpdate, s !== o && (s === null ? p.firstBaseUpdate = c : s.next = c, p.lastBaseUpdate = u));
  }
  if (i !== null) {
    var v = l.baseState;
    o = 0, p = c = u = null, s = i;
    do {
      var h = s.lane, w = s.eventTime;
      if ((r & h) === h) {
        p !== null && (p = p.next = {
          eventTime: w,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var x = e, S = s;
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
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [s] : h.push(s));
      } else
        w = { eventTime: w, lane: h, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, p === null ? (c = p = w, u = v) : p = p.next = w, o |= h;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null)
          break;
        h = s, s = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (p === null && (u = v), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = p, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else
      i === null && (l.shared.lanes = 0);
    Rt |= o, e.lanes = o, e.memoizedState = v;
  }
}
function Rs(e, t, n) {
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
var La = new Tu.Component().refs;
function Fi(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : H({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var vl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Dt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ue(), l = pt(e), i = We(r, l);
  i.payload = t, n != null && (i.callback = n), t = ft(e, i, l), t !== null && (Me(t, e, l, r), zr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ue(), l = pt(e), i = We(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = ft(e, i, l), t !== null && (Me(t, e, l, r), zr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ue(), r = pt(e), l = We(n, r);
  l.tag = 2, t != null && (l.callback = t), t = ft(e, l, r), t !== null && (Me(t, e, r, n), zr(t, e, r));
} };
function Ms(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Vn(n, r) || !Vn(l, i) : !0;
}
function Ra(e, t, n) {
  var r = !1, l = vt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = Ee(i) : (l = me(t) ? Tt : oe.current, r = t.contextTypes, i = (r = r != null) ? nn(e, l) : vt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = vl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Fs(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && vl.enqueueReplaceState(t, t.state, null);
}
function Di(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = La, _o(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Ee(i) : (i = me(t) ? Tt : oe.current, l.context = nn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Fi(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && vl.enqueueReplaceState(l, l.state, null), Jr(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
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
        var s = l.refs;
        s === La && (s = l.refs = {}), o === null ? delete s[i] : s[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string")
      throw Error(y(284));
    if (!n._owner)
      throw Error(y(290, e));
  }
  return e;
}
function yr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(y(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ds(e) {
  var t = e._init;
  return t(e._payload);
}
function Ma(e) {
  function t(d, f) {
    if (e) {
      var m = d.deletions;
      m === null ? (d.deletions = [f], d.flags |= 16) : m.push(f);
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
  function i(d, f, m) {
    return d.index = m, e ? (m = d.alternate, m !== null ? (m = m.index, m < f ? (d.flags |= 2, f) : m) : (d.flags |= 2, f)) : (d.flags |= 1048576, f);
  }
  function o(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function s(d, f, m, g) {
    return f === null || f.tag !== 6 ? (f = Jl(m, d.mode, g), f.return = d, f) : (f = l(f, m), f.return = d, f);
  }
  function u(d, f, m, g) {
    var k = m.type;
    return k === Ut ? p(d, f, m.props.children, g, m.key) : f !== null && (f.elementType === k || typeof k == "object" && k !== null && k.$$typeof === tt && Ds(k) === f.type) ? (g = l(f, m.props), g.ref = yn(d, f, m), g.return = d, g) : (g = Or(m.type, m.key, m.props, null, d.mode, g), g.ref = yn(d, f, m), g.return = d, g);
  }
  function c(d, f, m, g) {
    return f === null || f.tag !== 4 || f.stateNode.containerInfo !== m.containerInfo || f.stateNode.implementation !== m.implementation ? (f = bl(m, d.mode, g), f.return = d, f) : (f = l(f, m.children || []), f.return = d, f);
  }
  function p(d, f, m, g, k) {
    return f === null || f.tag !== 7 ? (f = Pt(m, d.mode, g, k), f.return = d, f) : (f = l(f, m), f.return = d, f);
  }
  function v(d, f, m) {
    if (typeof f == "string" && f !== "" || typeof f == "number")
      return f = Jl("" + f, d.mode, m), f.return = d, f;
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case sr:
          return m = Or(f.type, f.key, f.props, null, d.mode, m), m.ref = yn(d, null, f), m.return = d, m;
        case It:
          return f = bl(f, d.mode, m), f.return = d, f;
        case tt:
          var g = f._init;
          return v(d, g(f._payload), m);
      }
      if (kn(f) || pn(f))
        return f = Pt(f, d.mode, m, null), f.return = d, f;
      yr(d, f);
    }
    return null;
  }
  function h(d, f, m, g) {
    var k = f !== null ? f.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number")
      return k !== null ? null : s(d, f, "" + m, g);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case sr:
          return m.key === k ? u(d, f, m, g) : null;
        case It:
          return m.key === k ? c(d, f, m, g) : null;
        case tt:
          return k = m._init, h(
            d,
            f,
            k(m._payload),
            g
          );
      }
      if (kn(m) || pn(m))
        return k !== null ? null : p(d, f, m, g, null);
      yr(d, m);
    }
    return null;
  }
  function w(d, f, m, g, k) {
    if (typeof g == "string" && g !== "" || typeof g == "number")
      return d = d.get(m) || null, s(f, d, "" + g, k);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case sr:
          return d = d.get(g.key === null ? m : g.key) || null, u(f, d, g, k);
        case It:
          return d = d.get(g.key === null ? m : g.key) || null, c(f, d, g, k);
        case tt:
          var E = g._init;
          return w(d, f, m, E(g._payload), k);
      }
      if (kn(g) || pn(g))
        return d = d.get(m) || null, p(f, d, g, k, null);
      yr(f, g);
    }
    return null;
  }
  function x(d, f, m, g) {
    for (var k = null, E = null, _ = f, P = f = 0, j = null; _ !== null && P < m.length; P++) {
      _.index > P ? (j = _, _ = null) : j = _.sibling;
      var T = h(d, _, m[P], g);
      if (T === null) {
        _ === null && (_ = j);
        break;
      }
      e && _ && T.alternate === null && t(d, _), f = i(T, f, P), E === null ? k = T : E.sibling = T, E = T, _ = j;
    }
    if (P === m.length)
      return n(d, _), A && kt(d, P), k;
    if (_ === null) {
      for (; P < m.length; P++)
        _ = v(d, m[P], g), _ !== null && (f = i(_, f, P), E === null ? k = _ : E.sibling = _, E = _);
      return A && kt(d, P), k;
    }
    for (_ = r(d, _); P < m.length; P++)
      j = w(_, d, P, m[P], g), j !== null && (e && j.alternate !== null && _.delete(j.key === null ? P : j.key), f = i(j, f, P), E === null ? k = j : E.sibling = j, E = j);
    return e && _.forEach(function(K) {
      return t(d, K);
    }), A && kt(d, P), k;
  }
  function S(d, f, m, g) {
    var k = pn(m);
    if (typeof k != "function")
      throw Error(y(150));
    if (m = k.call(m), m == null)
      throw Error(y(151));
    for (var E = k = null, _ = f, P = f = 0, j = null, T = m.next(); _ !== null && !T.done; P++, T = m.next()) {
      _.index > P ? (j = _, _ = null) : j = _.sibling;
      var K = h(d, _, T.value, g);
      if (K === null) {
        _ === null && (_ = j);
        break;
      }
      e && _ && K.alternate === null && t(d, _), f = i(K, f, P), E === null ? k = K : E.sibling = K, E = K, _ = j;
    }
    if (T.done)
      return n(
        d,
        _
      ), A && kt(d, P), k;
    if (_ === null) {
      for (; !T.done; P++, T = m.next())
        T = v(d, T.value, g), T !== null && (f = i(T, f, P), E === null ? k = T : E.sibling = T, E = T);
      return A && kt(d, P), k;
    }
    for (_ = r(d, _); !T.done; P++, T = m.next())
      T = w(_, d, P, T.value, g), T !== null && (e && T.alternate !== null && _.delete(T.key === null ? P : T.key), f = i(T, f, P), E === null ? k = T : E.sibling = T, E = T);
    return e && _.forEach(function(Je) {
      return t(d, Je);
    }), A && kt(d, P), k;
  }
  function O(d, f, m, g) {
    if (typeof m == "object" && m !== null && m.type === Ut && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case sr:
          e: {
            for (var k = m.key, E = f; E !== null; ) {
              if (E.key === k) {
                if (k = m.type, k === Ut) {
                  if (E.tag === 7) {
                    n(d, E.sibling), f = l(E, m.props.children), f.return = d, d = f;
                    break e;
                  }
                } else if (E.elementType === k || typeof k == "object" && k !== null && k.$$typeof === tt && Ds(k) === E.type) {
                  n(d, E.sibling), f = l(E, m.props), f.ref = yn(d, E, m), f.return = d, d = f;
                  break e;
                }
                n(d, E);
                break;
              } else
                t(d, E);
              E = E.sibling;
            }
            m.type === Ut ? (f = Pt(m.props.children, d.mode, g, m.key), f.return = d, d = f) : (g = Or(m.type, m.key, m.props, null, d.mode, g), g.ref = yn(d, f, m), g.return = d, d = g);
          }
          return o(d);
        case It:
          e: {
            for (E = m.key; f !== null; ) {
              if (f.key === E)
                if (f.tag === 4 && f.stateNode.containerInfo === m.containerInfo && f.stateNode.implementation === m.implementation) {
                  n(d, f.sibling), f = l(f, m.children || []), f.return = d, d = f;
                  break e;
                } else {
                  n(d, f);
                  break;
                }
              else
                t(d, f);
              f = f.sibling;
            }
            f = bl(m, d.mode, g), f.return = d, d = f;
          }
          return o(d);
        case tt:
          return E = m._init, O(d, f, E(m._payload), g);
      }
      if (kn(m))
        return x(d, f, m, g);
      if (pn(m))
        return S(d, f, m, g);
      yr(d, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, f !== null && f.tag === 6 ? (n(d, f.sibling), f = l(f, m), f.return = d, d = f) : (n(d, f), f = Jl(m, d.mode, g), f.return = d, d = f), o(d)) : n(d, f);
  }
  return O;
}
var ln = Ma(!0), Fa = Ma(!1), nr = {}, $e = yt(nr), Gn = yt(nr), Kn = yt(nr);
function Et(e) {
  if (e === nr)
    throw Error(y(174));
  return e;
}
function Po(e, t) {
  switch (I(Kn, t), I(Gn, e), I($e, nr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : pi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = pi(t, e);
  }
  $($e), I($e, t);
}
function on() {
  $($e), $(Gn), $(Kn);
}
function Da(e) {
  Et(Kn.current);
  var t = Et($e.current), n = pi(t, e.type);
  t !== n && (I(Gn, e), I($e, n));
}
function To(e) {
  Gn.current === e && ($($e), $(Gn));
}
var B = yt(0);
function br(e) {
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
var Gl = [];
function zo() {
  for (var e = 0; e < Gl.length; e++)
    Gl[e]._workInProgressVersionPrimary = null;
  Gl.length = 0;
}
var Lr = qe.ReactCurrentDispatcher, Kl = qe.ReactCurrentBatchConfig, Lt = 0, V = null, X = null, J = null, el = !1, zn = !1, Yn = 0, Cd = 0;
function re() {
  throw Error(y(321));
}
function Lo(e, t) {
  if (t === null)
    return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Fe(e[n], t[n]))
      return !1;
  return !0;
}
function Ro(e, t, n, r, l, i) {
  if (Lt = i, V = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Lr.current = e === null || e.memoizedState === null ? Td : zd, e = n(r, l), zn) {
    i = 0;
    do {
      if (zn = !1, Yn = 0, 25 <= i)
        throw Error(y(301));
      i += 1, J = X = null, t.updateQueue = null, Lr.current = Ld, e = n(r, l);
    } while (zn);
  }
  if (Lr.current = tl, t = X !== null && X.next !== null, Lt = 0, J = X = V = null, el = !1, t)
    throw Error(y(300));
  return e;
}
function Mo() {
  var e = Yn !== 0;
  return Yn = 0, e;
}
function Oe() {
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
function Xn(e, t) {
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
    var s = o = null, u = null, c = i;
    do {
      var p = c.lane;
      if ((Lt & p) === p)
        u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var v = {
          lane: p,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (s = u = v, o = r) : u = u.next = v, V.lanes |= p, Rt |= p;
      }
      c = c.next;
    } while (c !== null && c !== i);
    u === null ? o = r : u.next = s, Fe(r, t.memoizedState) || (de = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = u, n.lastRenderedState = r;
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
function Xl(e) {
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
    Fe(i, t.memoizedState) || (de = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function Oa() {
}
function Ia(e, t) {
  var n = V, r = _e(), l = t(), i = !Fe(r.memoizedState, l);
  if (i && (r.memoizedState = l, de = !0), r = r.queue, Fo(Aa.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || J !== null && J.memoizedState.tag & 1) {
    if (n.flags |= 2048, qn(9, $a.bind(null, n, r, l, t), void 0, null), b === null)
      throw Error(y(349));
    Lt & 30 || Ua(n, t, l);
  }
  return l;
}
function Ua(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = V.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, V.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function $a(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Ba(t) && Va(e);
}
function Aa(e, t, n) {
  return n(function() {
    Ba(t) && Va(e);
  });
}
function Ba(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Fe(e, n);
  } catch {
    return !0;
  }
}
function Va(e) {
  var t = Ye(e, 1);
  t !== null && Me(t, e, 1, -1);
}
function Os(e) {
  var t = Oe();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Xn, lastRenderedState: e }, t.queue = e, e = e.dispatch = Pd.bind(null, V, e), [t.memoizedState, e];
}
function qn(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = V.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, V.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ha() {
  return _e().memoizedState;
}
function Rr(e, t, n, r) {
  var l = Oe();
  V.flags |= e, l.memoizedState = qn(1 | t, n, void 0, r === void 0 ? null : r);
}
function gl(e, t, n, r) {
  var l = _e();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (X !== null) {
    var o = X.memoizedState;
    if (i = o.destroy, r !== null && Lo(r, o.deps)) {
      l.memoizedState = qn(t, n, i, r);
      return;
    }
  }
  V.flags |= e, l.memoizedState = qn(1 | t, n, i, r);
}
function Is(e, t) {
  return Rr(8390656, 8, e, t);
}
function Fo(e, t) {
  return gl(2048, 8, e, t);
}
function Qa(e, t) {
  return gl(4, 2, e, t);
}
function Wa(e, t) {
  return gl(4, 4, e, t);
}
function Ga(e, t) {
  if (typeof t == "function")
    return e = e(), t(e), function() {
      t(null);
    };
  if (t != null)
    return e = e(), t.current = e, function() {
      t.current = null;
    };
}
function Ka(e, t, n) {
  return n = n != null ? n.concat([e]) : null, gl(4, 4, Ga.bind(null, t, e), n);
}
function Do() {
}
function Ya(e, t) {
  var n = _e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Lo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Xa(e, t) {
  var n = _e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Lo(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function qa(e, t, n) {
  return Lt & 21 ? (Fe(n, t) || (n = bu(), V.lanes |= n, Rt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, de = !0), e.memoizedState = n);
}
function Ed(e, t) {
  var n = D;
  D = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Kl.transition;
  Kl.transition = {};
  try {
    e(!1), t();
  } finally {
    D = n, Kl.transition = r;
  }
}
function Za() {
  return _e().memoizedState;
}
function _d(e, t, n) {
  var r = pt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Ja(e))
    ba(t, n);
  else if (n = Ta(e, t, n, r), n !== null) {
    var l = ue();
    Me(n, e, r, l), ec(n, t, r);
  }
}
function Pd(e, t, n) {
  var r = pt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Ja(e))
    ba(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
      try {
        var o = t.lastRenderedState, s = i(o, n);
        if (l.hasEagerState = !0, l.eagerState = s, Fe(s, o)) {
          var u = t.interleaved;
          u === null ? (l.next = l, Eo(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
          return;
        }
      } catch {
      } finally {
      }
    n = Ta(e, t, l, r), n !== null && (l = ue(), Me(n, e, r, l), ec(n, t, r));
  }
}
function Ja(e) {
  var t = e.alternate;
  return e === V || t !== null && t === V;
}
function ba(e, t) {
  zn = el = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function ec(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, fo(e, n);
  }
}
var tl = { readContext: Ee, useCallback: re, useContext: re, useEffect: re, useImperativeHandle: re, useInsertionEffect: re, useLayoutEffect: re, useMemo: re, useReducer: re, useRef: re, useState: re, useDebugValue: re, useDeferredValue: re, useTransition: re, useMutableSource: re, useSyncExternalStore: re, useId: re, unstable_isNewReconciler: !1 }, Td = { readContext: Ee, useCallback: function(e, t) {
  return Oe().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Ee, useEffect: Is, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Rr(
    4194308,
    4,
    Ga.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Rr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Rr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Oe();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Oe();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = _d.bind(null, V, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Oe();
  return e = { current: e }, t.memoizedState = e;
}, useState: Os, useDebugValue: Do, useDeferredValue: function(e) {
  return Oe().memoizedState = e;
}, useTransition: function() {
  var e = Os(!1), t = e[0];
  return e = Ed.bind(null, e[1]), Oe().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = V, l = Oe();
  if (A) {
    if (n === void 0)
      throw Error(y(407));
    n = n();
  } else {
    if (n = t(), b === null)
      throw Error(y(349));
    Lt & 30 || Ua(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Is(Aa.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, qn(9, $a.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Oe(), t = b.identifierPrefix;
  if (A) {
    var n = Qe, r = He;
    n = (r & ~(1 << 32 - Re(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Yn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else
    n = Cd++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, zd = {
  readContext: Ee,
  useCallback: Ya,
  useContext: Ee,
  useEffect: Fo,
  useImperativeHandle: Ka,
  useInsertionEffect: Qa,
  useLayoutEffect: Wa,
  useMemo: Xa,
  useReducer: Yl,
  useRef: Ha,
  useState: function() {
    return Yl(Xn);
  },
  useDebugValue: Do,
  useDeferredValue: function(e) {
    var t = _e();
    return qa(t, X.memoizedState, e);
  },
  useTransition: function() {
    var e = Yl(Xn)[0], t = _e().memoizedState;
    return [e, t];
  },
  useMutableSource: Oa,
  useSyncExternalStore: Ia,
  useId: Za,
  unstable_isNewReconciler: !1
}, Ld = { readContext: Ee, useCallback: Ya, useContext: Ee, useEffect: Fo, useImperativeHandle: Ka, useInsertionEffect: Qa, useLayoutEffect: Wa, useMemo: Xa, useReducer: Xl, useRef: Ha, useState: function() {
  return Xl(Xn);
}, useDebugValue: Do, useDeferredValue: function(e) {
  var t = _e();
  return X === null ? t.memoizedState = e : qa(t, X.memoizedState, e);
}, useTransition: function() {
  var e = Xl(Xn)[0], t = _e().memoizedState;
  return [e, t];
}, useMutableSource: Oa, useSyncExternalStore: Ia, useId: Za, unstable_isNewReconciler: !1 };
function sn(e, t) {
  try {
    var n = "", r = t;
    do
      n += lf(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ql(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Oi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Rd = typeof WeakMap == "function" ? WeakMap : Map;
function tc(e, t, n) {
  n = We(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    rl || (rl = !0, Gi = r), Oi(e, t);
  }, n;
}
function nc(e, t, n) {
  n = We(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Oi(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Oi(e, t), typeof r != "function" && (dt === null ? dt = /* @__PURE__ */ new Set([this]) : dt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Us(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Rd();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else
    l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Gd.bind(null, e, t, n), t.then(e, e));
}
function $s(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function As(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = We(-1, 1), t.tag = 2, ft(n, t, 1))), n.lanes |= 1), e);
}
var Md = qe.ReactCurrentOwner, de = !1;
function se(e, t, n, r) {
  t.child = e === null ? Fa(t, null, n, r) : ln(t, e.child, n, r);
}
function Bs(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return bt(t, l), r = Ro(e, t, n, r, i, l), n = Mo(), e !== null && !de ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Xe(e, t, l)) : (A && n && xo(t), t.flags |= 1, se(e, t, r, l), t.child);
}
function Vs(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Ho(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, rc(e, t, i, r, l)) : (e = Or(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Vn, n(o, r) && e.ref === t.ref)
      return Xe(e, t, l);
  }
  return t.flags |= 1, e = mt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function rc(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Vn(i, r) && e.ref === t.ref)
      if (de = !1, t.pendingProps = r = i, (e.lanes & l) !== 0)
        e.flags & 131072 && (de = !0);
      else
        return t.lanes = e.lanes, Xe(e, t, l);
  }
  return Ii(e, t, n, r, l);
}
function lc(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, I(Yt, ve), ve |= n;
    else {
      if (!(n & 1073741824))
        return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, I(Yt, ve), ve |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, I(Yt, ve), ve |= r;
    }
  else
    i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, I(Yt, ve), ve |= r;
  return se(e, t, l, n), t.child;
}
function ic(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ii(e, t, n, r, l) {
  var i = me(n) ? Tt : oe.current;
  return i = nn(t, i), bt(t, l), n = Ro(e, t, n, r, i, l), r = Mo(), e !== null && !de ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Xe(e, t, l)) : (A && r && xo(t), t.flags |= 1, se(e, t, n, l), t.child);
}
function Hs(e, t, n, r, l) {
  if (me(n)) {
    var i = !0;
    Kr(t);
  } else
    i = !1;
  if (bt(t, l), t.stateNode === null)
    Mr(e, t), Ra(t, n, r), Di(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, s = t.memoizedProps;
    o.props = s;
    var u = o.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Ee(c) : (c = me(n) ? Tt : oe.current, c = nn(t, c));
    var p = n.getDerivedStateFromProps, v = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    v || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || u !== c) && Fs(t, o, r, c), nt = !1;
    var h = t.memoizedState;
    o.state = h, Jr(t, r, o, l), u = t.memoizedState, s !== r || h !== u || pe.current || nt ? (typeof p == "function" && (Fi(t, n, p, r), u = t.memoizedState), (s = nt || Ms(t, n, s, r, h, u, c)) ? (v || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), o.props = r, o.state = u, o.context = c, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, za(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : Te(t.type, s), o.props = c, v = t.pendingProps, h = o.context, u = n.contextType, typeof u == "object" && u !== null ? u = Ee(u) : (u = me(n) ? Tt : oe.current, u = nn(t, u));
    var w = n.getDerivedStateFromProps;
    (p = typeof w == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== v || h !== u) && Fs(t, o, r, u), nt = !1, h = t.memoizedState, o.state = h, Jr(t, r, o, l);
    var x = t.memoizedState;
    s !== v || h !== x || pe.current || nt ? (typeof w == "function" && (Fi(t, n, w, r), x = t.memoizedState), (c = nt || Ms(t, n, c, r, h, x, u) || !1) ? (p || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, x, u), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, x, u)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = x), o.props = r, o.state = x, o.context = u, r = c) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Ui(e, t, n, r, i, l);
}
function Ui(e, t, n, r, l, i) {
  ic(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o)
    return l && Ps(t, n, !1), Xe(e, t, i);
  r = t.stateNode, Md.current = t;
  var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = ln(t, e.child, null, i), t.child = ln(t, null, s, i)) : se(e, t, s, i), t.memoizedState = r.state, l && Ps(t, n, !0), t.child;
}
function oc(e) {
  var t = e.stateNode;
  t.pendingContext ? _s(e, t.pendingContext, t.pendingContext !== t.context) : t.context && _s(e, t.context, !1), Po(e, t.containerInfo);
}
function Qs(e, t, n, r, l) {
  return rn(), ko(l), t.flags |= 256, se(e, t, n, r), t.child;
}
var $i = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ai(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function sc(e, t, n) {
  var r = t.pendingProps, l = B.current, i = !1, o = (t.flags & 128) !== 0, s;
  if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), I(B, l & 1), e === null)
    return Ri(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = xl(o, r, 0, null), e = Pt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Ai(n), t.memoizedState = $i, e) : Oo(t, o));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null))
    return Fd(e, t, o, r, s, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, s = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = mt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? i = mt(s, i) : (i = Pt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Ai(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = $i, r;
  }
  return i = e.child, e = i.sibling, r = mt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Oo(e, t) {
  return t = xl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function wr(e, t, n, r) {
  return r !== null && ko(r), ln(t, e.child, null, n), e = Oo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Fd(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ql(Error(y(422))), wr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = xl({ mode: "visible", children: r.children }, l, 0, null), i = Pt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && ln(t, e.child, null, o), t.child.memoizedState = Ai(o), t.memoizedState = $i, i);
  if (!(t.mode & 1))
    return wr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r)
      var s = r.dgst;
    return r = s, i = Error(y(419)), r = ql(i, r, void 0), wr(e, t, o, r);
  }
  if (s = (o & e.childLanes) !== 0, de || s) {
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
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Ye(e, l), Me(r, e, l, -1));
    }
    return Vo(), r = ql(Error(y(421))), wr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Kd.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, ge = ct(l.nextSibling), ye = t, A = !0, Le = null, e !== null && (ke[Ne++] = He, ke[Ne++] = Qe, ke[Ne++] = zt, He = e.id, Qe = e.overflow, zt = t), t = Oo(t, r.children), t.flags |= 4096, t);
}
function Ws(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Mi(e.return, t, n);
}
function Zl(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function uc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (se(e, t, r.children, n), r = B.current, r & 2)
    r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128)
      e:
        for (e = t.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && Ws(e, n, t);
          else if (e.tag === 19)
            Ws(e, n, t);
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
  if (I(B, r), !(t.mode & 1))
    t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          e = n.alternate, e !== null && br(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Zl(t, !1, l, n, i);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && br(e) === null) {
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
function Mr(e, t) {
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
function Dd(e, t, n) {
  switch (t.tag) {
    case 3:
      oc(t), rn();
      break;
    case 5:
      Da(t);
      break;
    case 1:
      me(t.type) && Kr(t);
      break;
    case 4:
      Po(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      I(qr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (I(B, B.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? sc(e, t, n) : (I(B, B.current & 1), e = Xe(e, t, n), e !== null ? e.sibling : null);
      I(B, B.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r)
          return uc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), I(B, B.current), r)
        break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, lc(e, t, n);
  }
  return Xe(e, t, n);
}
var ac, Bi, cc, fc;
ac = function(e, t) {
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
Bi = function() {
};
cc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Et($e.current);
    var i = null;
    switch (n) {
      case "input":
        l = ai(e, l), r = ai(e, r), i = [];
        break;
      case "select":
        l = H({}, l, { value: void 0 }), r = H({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = di(e, l), r = di(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Wr);
    }
    mi(n, r);
    var o;
    n = null;
    for (c in l)
      if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
        if (c === "style") {
          var s = l[c];
          for (o in s)
            s.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
        } else
          c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Dn.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (s = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== s && (u != null || s != null))
        if (c === "style")
          if (s) {
            for (o in s)
              !s.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
            for (o in u)
              u.hasOwnProperty(o) && s[o] !== u[o] && (n || (n = {}), n[o] = u[o]);
          } else
            n || (i || (i = []), i.push(
              c,
              n
            )), n = u;
        else
          c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (i = i || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Dn.hasOwnProperty(c) ? (u != null && c === "onScroll" && U("scroll", e), i || s === u || (i = [])) : (i = i || []).push(c, u));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
fc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function wn(e, t) {
  if (!A)
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
function Od(e, t, n) {
  var r = t.pendingProps;
  switch (So(t), t.tag) {
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
      return me(t.type) && Gr(), le(t), null;
    case 3:
      return r = t.stateNode, on(), $(pe), $(oe), zo(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (gr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Le !== null && (Xi(Le), Le = null))), Bi(e, t), le(t), null;
    case 5:
      To(t);
      var l = Et(Kn.current);
      if (n = t.type, e !== null && t.stateNode != null)
        cc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null)
            throw Error(y(166));
          return le(t), null;
        }
        if (e = Et($e.current), gr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ie] = t, r[Wn] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              U("cancel", r), U("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              U("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < jn.length; l++)
                U(jn[l], r);
              break;
            case "source":
              U("error", r);
              break;
            case "img":
            case "image":
            case "link":
              U(
                "error",
                r
              ), U("load", r);
              break;
            case "details":
              U("toggle", r);
              break;
            case "input":
              es(r, i), U("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, U("invalid", r);
              break;
            case "textarea":
              ns(r, i), U("invalid", r);
          }
          mi(n, i), l = null;
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var s = i[o];
              o === "children" ? typeof s == "string" ? r.textContent !== s && (i.suppressHydrationWarning !== !0 && vr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (i.suppressHydrationWarning !== !0 && vr(
                r.textContent,
                s,
                e
              ), l = ["children", "" + s]) : Dn.hasOwnProperty(o) && s != null && o === "onScroll" && U("scroll", r);
            }
          switch (n) {
            case "input":
              ur(r), ts(r, i, !0);
              break;
            case "textarea":
              ur(r), rs(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Wr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Uu(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ie] = t, e[Wn] = r, ac(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = hi(n, r), n) {
              case "dialog":
                U("cancel", e), U("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                U("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < jn.length; l++)
                  U(jn[l], e);
                l = r;
                break;
              case "source":
                U("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                U(
                  "error",
                  e
                ), U("load", e), l = r;
                break;
              case "details":
                U("toggle", e), l = r;
                break;
              case "input":
                es(e, r), l = ai(e, r), U("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = H({}, r, { value: void 0 }), U("invalid", e);
                break;
              case "textarea":
                ns(e, r), l = di(e, r), U("invalid", e);
                break;
              default:
                l = r;
            }
            mi(n, l), s = l;
            for (i in s)
              if (s.hasOwnProperty(i)) {
                var u = s[i];
                i === "style" ? Bu(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && $u(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && On(e, u) : typeof u == "number" && On(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Dn.hasOwnProperty(i) ? u != null && i === "onScroll" && U("scroll", e) : u != null && io(e, i, u, o));
              }
            switch (n) {
              case "input":
                ur(e), ts(e, r, !1);
                break;
              case "textarea":
                ur(e), rs(e);
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
                typeof l.onClick == "function" && (e.onclick = Wr);
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
        fc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null)
          throw Error(y(166));
        if (n = Et(Kn.current), Et($e.current), gr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ie] = t, (i = r.nodeValue !== n) && (e = ye, e !== null))
            switch (e.tag) {
              case 3:
                vr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && vr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ie] = t, t.stateNode = r;
      }
      return le(t), null;
    case 13:
      if ($(B), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (A && ge !== null && t.mode & 1 && !(t.flags & 128))
          Pa(), rn(), t.flags |= 98560, i = !1;
        else if (i = gr(t), r !== null && r.dehydrated !== null) {
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
          Le !== null && (Xi(Le), Le = null), i = !0;
        if (!i)
          return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || B.current & 1 ? q === 0 && (q = 3) : Vo())), t.updateQueue !== null && (t.flags |= 4), le(t), null);
    case 4:
      return on(), Bi(e, t), e === null && Hn(t.stateNode.containerInfo), le(t), null;
    case 10:
      return Co(t.type._context), le(t), null;
    case 17:
      return me(t.type) && Gr(), le(t), null;
    case 19:
      if ($(B), i = t.memoizedState, i === null)
        return le(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null)
        if (r)
          wn(i, !1);
        else {
          if (q !== 0 || e !== null && e.flags & 128)
            for (e = t.child; e !== null; ) {
              if (o = br(e), o !== null) {
                for (t.flags |= 128, wn(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; )
                  i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
                return I(B, B.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null && G() > un && (t.flags |= 128, r = !0, wn(i, !1), t.lanes = 4194304);
        }
      else {
        if (!r)
          if (e = br(o), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), wn(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !A)
              return le(t), null;
          } else
            2 * G() - i.renderingStartTime > un && n !== 1073741824 && (t.flags |= 128, r = !0, wn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = G(), t.sibling = null, n = B.current, I(B, r ? n & 1 | 2 : n & 1), t) : (le(t), null);
    case 22:
    case 23:
      return Bo(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ve & 1073741824 && (le(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : le(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(y(156, t.tag));
}
function Id(e, t) {
  switch (So(t), t.tag) {
    case 1:
      return me(t.type) && Gr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return on(), $(pe), $(oe), zo(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return To(t), null;
    case 13:
      if ($(B), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(y(340));
        rn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return $(B), null;
    case 4:
      return on(), null;
    case 10:
      return Co(t.type._context), null;
    case 22:
    case 23:
      return Bo(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var xr = !1, ie = !1, Ud = typeof WeakSet == "function" ? WeakSet : Set, N = null;
function Kt(e, t) {
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
function Vi(e, t, n) {
  try {
    n();
  } catch (r) {
    Q(e, t, r);
  }
}
var Gs = !1;
function $d(e, t) {
  if (Ci = Vr, e = ha(), wo(e)) {
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
          var o = 0, s = -1, u = -1, c = 0, p = 0, v = e, h = null;
          t:
            for (; ; ) {
              for (var w; v !== n || l !== 0 && v.nodeType !== 3 || (s = o + l), v !== i || r !== 0 && v.nodeType !== 3 || (u = o + r), v.nodeType === 3 && (o += v.nodeValue.length), (w = v.firstChild) !== null; )
                h = v, v = w;
              for (; ; ) {
                if (v === e)
                  break t;
                if (h === n && ++c === l && (s = o), h === i && ++p === r && (u = o), (w = v.nextSibling) !== null)
                  break;
                v = h, h = v.parentNode;
              }
              v = w;
            }
          n = s === -1 || u === -1 ? null : { start: s, end: u };
        } else
          n = null;
      }
    n = n || { start: 0, end: 0 };
  } else
    n = null;
  for (Ei = { focusedElem: e, selectionRange: n }, Vr = !1, N = t; N !== null; )
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
                  var S = x.memoizedProps, O = x.memoizedState, d = t.stateNode, f = d.getSnapshotBeforeUpdate(t.elementType === t.type ? S : Te(t.type, S), O);
                  d.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var m = t.stateNode.containerInfo;
                m.nodeType === 1 ? m.textContent = "" : m.nodeType === 9 && m.documentElement && m.removeChild(m.documentElement);
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
  return x = Gs, Gs = !1, x;
}
function Ln(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Vi(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function yl(e, t) {
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
function Hi(e) {
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
function dc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, dc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ie], delete t[Wn], delete t[Ti], delete t[Sd], delete t[kd])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function pc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ks(e) {
  e:
    for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || pc(e.return))
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
function Qi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Wr));
  else if (r !== 4 && (e = e.child, e !== null))
    for (Qi(e, t, n), e = e.sibling; e !== null; )
      Qi(e, t, n), e = e.sibling;
}
function Wi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null))
    for (Wi(e, t, n), e = e.sibling; e !== null; )
      Wi(e, t, n), e = e.sibling;
}
var ee = null, ze = !1;
function et(e, t, n) {
  for (n = n.child; n !== null; )
    mc(e, t, n), n = n.sibling;
}
function mc(e, t, n) {
  if (Ue && typeof Ue.onCommitFiberUnmount == "function")
    try {
      Ue.onCommitFiberUnmount(cl, n);
    } catch {
    }
  switch (n.tag) {
    case 5:
      ie || Kt(n, t);
    case 6:
      var r = ee, l = ze;
      ee = null, et(e, t, n), ee = r, ze = l, ee !== null && (ze ? (e = ee, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ee.removeChild(n.stateNode));
      break;
    case 18:
      ee !== null && (ze ? (e = ee, n = n.stateNode, e.nodeType === 8 ? Ql(e.parentNode, n) : e.nodeType === 1 && Ql(e, n), An(e)) : Ql(ee, n.stateNode));
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
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Vi(n, t, o), l = l.next;
        } while (l !== r);
      }
      et(e, t, n);
      break;
    case 1:
      if (!ie && (Kt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
        try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (s) {
          Q(n, t, s);
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
function Ys(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Ud()), t.forEach(function(r) {
      var l = Yd.bind(null, e, r);
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
        var i = e, o = t, s = o;
        e:
          for (; s !== null; ) {
            switch (s.tag) {
              case 5:
                ee = s.stateNode, ze = !1;
                break e;
              case 3:
                ee = s.stateNode.containerInfo, ze = !0;
                break e;
              case 4:
                ee = s.stateNode.containerInfo, ze = !0;
                break e;
            }
            s = s.return;
          }
        if (ee === null)
          throw Error(y(160));
        mc(i, o, l), ee = null, ze = !1;
        var u = l.alternate;
        u !== null && (u.return = null), l.return = null;
      } catch (c) {
        Q(l, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; )
      hc(t, e), t = t.sibling;
}
function hc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Pe(t, e), De(e), r & 4) {
        try {
          Ln(3, e, e.return), yl(3, e);
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
      Pe(t, e), De(e), r & 512 && n !== null && Kt(n, n.return);
      break;
    case 5:
      if (Pe(t, e), De(e), r & 512 && n !== null && Kt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          On(l, "");
        } catch (S) {
          Q(e, e.return, S);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, s = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null)
          try {
            s === "input" && i.type === "radio" && i.name != null && Ou(l, i), hi(s, o);
            var c = hi(s, i);
            for (o = 0; o < u.length; o += 2) {
              var p = u[o], v = u[o + 1];
              p === "style" ? Bu(l, v) : p === "dangerouslySetInnerHTML" ? $u(l, v) : p === "children" ? On(l, v) : io(l, p, v, c);
            }
            switch (s) {
              case "input":
                ci(l, i);
                break;
              case "textarea":
                Iu(l, i);
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
            l[Wn] = i;
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
      Pe(t, e), De(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || ($o = G())), r & 4 && Ys(e);
      break;
    case 22:
      if (p = n !== null && n.memoizedState !== null, e.mode & 1 ? (ie = (c = ie) || p, Pe(t, e), ie = c) : Pe(t, e), De(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !p && e.mode & 1)
          for (N = e, p = e.child; p !== null; ) {
            for (v = N = p; N !== null; ) {
              switch (h = N, w = h.child, h.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ln(4, h, h.return);
                  break;
                case 1:
                  Kt(h, h.return);
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
                  Kt(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    qs(v);
                    continue;
                  }
              }
              w !== null ? (w.return = h, N = w) : qs(v);
            }
            p = p.sibling;
          }
        e:
          for (p = null, v = e; ; ) {
            if (v.tag === 5) {
              if (p === null) {
                p = v;
                try {
                  l = v.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (s = v.stateNode, u = v.memoizedProps.style, o = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = Au("display", o));
                } catch (S) {
                  Q(e, e.return, S);
                }
              }
            } else if (v.tag === 6) {
              if (p === null)
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
              p === v && (p = null), v = v.return;
            }
            p === v && (p = null), v.sibling.return = v.return, v = v.sibling;
          }
      }
      break;
    case 19:
      Pe(t, e), De(e), r & 4 && Ys(e);
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
          if (pc(n)) {
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
          r.flags & 32 && (On(l, ""), r.flags &= -33);
          var i = Ks(e);
          Wi(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, s = Ks(e);
          Qi(e, s, o);
          break;
        default:
          throw Error(y(161));
      }
    } catch (u) {
      Q(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Ad(e, t, n) {
  N = e, vc(e);
}
function vc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; N !== null; ) {
    var l = N, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || xr;
      if (!o) {
        var s = l.alternate, u = s !== null && s.memoizedState !== null || ie;
        s = xr;
        var c = ie;
        if (xr = o, (ie = u) && !c)
          for (N = l; N !== null; )
            o = N, u = o.child, o.tag === 22 && o.memoizedState !== null ? Zs(l) : u !== null ? (u.return = o, N = u) : Zs(l);
        for (; i !== null; )
          N = i, vc(i), i = i.sibling;
        N = l, xr = s, ie = c;
      }
      Xs(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? (i.return = l, N = i) : Xs(e);
  }
}
function Xs(e) {
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
              ie || yl(5, t);
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
              i !== null && Rs(t, i, r);
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
                Rs(t, o, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
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
                  var p = c.memoizedState;
                  if (p !== null) {
                    var v = p.dehydrated;
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
        ie || t.flags & 512 && Hi(t);
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
function qs(e) {
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
function Zs(e) {
  for (; N !== null; ) {
    var t = N;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            yl(4, t);
          } catch (u) {
            Q(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              Q(t, l, u);
            }
          }
          var i = t.return;
          try {
            Hi(t);
          } catch (u) {
            Q(t, i, u);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Hi(t);
          } catch (u) {
            Q(t, o, u);
          }
      }
    } catch (u) {
      Q(t, t.return, u);
    }
    if (t === e) {
      N = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, N = s;
      break;
    }
    N = t.return;
  }
}
var Bd = Math.ceil, nl = qe.ReactCurrentDispatcher, Io = qe.ReactCurrentOwner, Ce = qe.ReactCurrentBatchConfig, F = 0, b = null, Y = null, te = 0, ve = 0, Yt = yt(0), q = 0, Zn = null, Rt = 0, wl = 0, Uo = 0, Rn = null, fe = null, $o = 0, un = 1 / 0, Ae = null, rl = !1, Gi = null, dt = null, Sr = !1, ot = null, ll = 0, Mn = 0, Ki = null, Fr = -1, Dr = 0;
function ue() {
  return F & 6 ? G() : Fr !== -1 ? Fr : Fr = G();
}
function pt(e) {
  return e.mode & 1 ? F & 2 && te !== 0 ? te & -te : jd.transition !== null ? (Dr === 0 && (Dr = bu()), Dr) : (e = D, e !== 0 || (e = window.event, e = e === void 0 ? 16 : oa(e.type)), e) : 1;
}
function Me(e, t, n, r) {
  if (50 < Mn)
    throw Mn = 0, Ki = null, Error(y(185));
  bn(e, n, r), (!(F & 2) || e !== b) && (e === b && (!(F & 2) && (wl |= n), q === 4 && lt(e, te)), he(e, r), n === 1 && F === 0 && !(t.mode & 1) && (un = G() + 500, hl && wt()));
}
function he(e, t) {
  var n = e.callbackNode;
  jf(e, t);
  var r = Br(e, e === b ? te : 0);
  if (r === 0)
    n !== null && os(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && os(n), t === 1)
      e.tag === 0 ? Nd(Js.bind(null, e)) : Ca(Js.bind(null, e)), wd(function() {
        !(F & 6) && wt();
      }), n = null;
    else {
      switch (ea(r)) {
        case 1:
          n = co;
          break;
        case 4:
          n = Zu;
          break;
        case 16:
          n = Ar;
          break;
        case 536870912:
          n = Ju;
          break;
        default:
          n = Ar;
      }
      n = jc(n, gc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function gc(e, t) {
  if (Fr = -1, Dr = 0, F & 6)
    throw Error(y(327));
  var n = e.callbackNode;
  if (en() && e.callbackNode !== n)
    return null;
  var r = Br(e, e === b ? te : 0);
  if (r === 0)
    return null;
  if (r & 30 || r & e.expiredLanes || t)
    t = il(e, r);
  else {
    t = r;
    var l = F;
    F |= 2;
    var i = wc();
    (b !== e || te !== t) && (Ae = null, un = G() + 500, _t(e, t));
    do
      try {
        Qd();
        break;
      } catch (s) {
        yc(e, s);
      }
    while (!0);
    jo(), nl.current = i, F = l, Y !== null ? t = 0 : (b = null, te = 0, t = q);
  }
  if (t !== 0) {
    if (t === 2 && (l = xi(e), l !== 0 && (r = l, t = Yi(e, l))), t === 1)
      throw n = Zn, _t(e, 0), lt(e, r), he(e, G()), n;
    if (t === 6)
      lt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Vd(l) && (t = il(e, r), t === 2 && (i = xi(e), i !== 0 && (r = i, t = Yi(e, i))), t === 1))
        throw n = Zn, _t(e, 0), lt(e, r), he(e, G()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(y(345));
        case 2:
          Nt(e, fe, Ae);
          break;
        case 3:
          if (lt(e, r), (r & 130023424) === r && (t = $o + 500 - G(), 10 < t)) {
            if (Br(e, 0) !== 0)
              break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ue(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Pi(Nt.bind(null, e, fe, Ae), t);
            break;
          }
          Nt(e, fe, Ae);
          break;
        case 4:
          if (lt(e, r), (r & 4194240) === r)
            break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Re(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = G() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Bd(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Pi(Nt.bind(null, e, fe, Ae), r);
            break;
          }
          Nt(e, fe, Ae);
          break;
        case 5:
          Nt(e, fe, Ae);
          break;
        default:
          throw Error(y(329));
      }
    }
  }
  return he(e, G()), e.callbackNode === n ? gc.bind(null, e) : null;
}
function Yi(e, t) {
  var n = Rn;
  return e.current.memoizedState.isDehydrated && (_t(e, t).flags |= 256), e = il(e, t), e !== 2 && (t = fe, fe = n, t !== null && Xi(t)), e;
}
function Xi(e) {
  fe === null ? fe = e : fe.push.apply(fe, e);
}
function Vd(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r], i = l.getSnapshot;
          l = l.value;
          try {
            if (!Fe(i(), l))
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
  for (t &= ~Uo, t &= ~wl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Re(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Js(e) {
  if (F & 6)
    throw Error(y(327));
  en();
  var t = Br(e, 0);
  if (!(t & 1))
    return he(e, G()), null;
  var n = il(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = xi(e);
    r !== 0 && (t = r, n = Yi(e, r));
  }
  if (n === 1)
    throw n = Zn, _t(e, 0), lt(e, t), he(e, G()), n;
  if (n === 6)
    throw Error(y(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Nt(e, fe, Ae), he(e, G()), null;
}
function Ao(e, t) {
  var n = F;
  F |= 1;
  try {
    return e(t);
  } finally {
    F = n, F === 0 && (un = G() + 500, hl && wt());
  }
}
function Mt(e) {
  ot !== null && ot.tag === 0 && !(F & 6) && en();
  var t = F;
  F |= 1;
  var n = Ce.transition, r = D;
  try {
    if (Ce.transition = null, D = 1, e)
      return e();
  } finally {
    D = r, Ce.transition = n, F = t, !(F & 6) && wt();
  }
}
function Bo() {
  ve = Yt.current, $(Yt);
}
function _t(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, yd(n)), Y !== null)
    for (n = Y.return; n !== null; ) {
      var r = n;
      switch (So(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Gr();
          break;
        case 3:
          on(), $(pe), $(oe), zo();
          break;
        case 5:
          To(r);
          break;
        case 4:
          on();
          break;
        case 13:
          $(B);
          break;
        case 19:
          $(B);
          break;
        case 10:
          Co(r.type._context);
          break;
        case 22:
        case 23:
          Bo();
      }
      n = n.return;
    }
  if (b = e, Y = e = mt(e.current, null), te = ve = t, q = 0, Zn = null, Uo = wl = Rt = 0, fe = Rn = null, Ct !== null) {
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
function yc(e, t) {
  do {
    var n = Y;
    try {
      if (jo(), Lr.current = tl, el) {
        for (var r = V.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        el = !1;
      }
      if (Lt = 0, J = X = V = null, zn = !1, Yn = 0, Io.current = null, n === null || n.return === null) {
        q = 1, Zn = t, Y = null;
        break;
      }
      e: {
        var i = e, o = n.return, s = n, u = t;
        if (t = te, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, p = s, v = p.tag;
          if (!(p.mode & 1) && (v === 0 || v === 11 || v === 15)) {
            var h = p.alternate;
            h ? (p.updateQueue = h.updateQueue, p.memoizedState = h.memoizedState, p.lanes = h.lanes) : (p.updateQueue = null, p.memoizedState = null);
          }
          var w = $s(o);
          if (w !== null) {
            w.flags &= -257, As(w, o, s, i, t), w.mode & 1 && Us(i, c, t), t = w, u = c;
            var x = t.updateQueue;
            if (x === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(u), t.updateQueue = S;
            } else
              x.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Us(i, c, t), Vo();
              break e;
            }
            u = Error(y(426));
          }
        } else if (A && s.mode & 1) {
          var O = $s(o);
          if (O !== null) {
            !(O.flags & 65536) && (O.flags |= 256), As(O, o, s, i, t), ko(sn(u, s));
            break e;
          }
        }
        i = u = sn(u, s), q !== 4 && (q = 2), Rn === null ? Rn = [i] : Rn.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var d = tc(i, u, t);
              Ls(i, d);
              break e;
            case 1:
              s = u;
              var f = i.type, m = i.stateNode;
              if (!(i.flags & 128) && (typeof f.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (dt === null || !dt.has(m)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var g = nc(i, s, t);
                Ls(i, g);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Sc(n);
    } catch (k) {
      t = k, Y === n && n !== null && (Y = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function wc() {
  var e = nl.current;
  return nl.current = tl, e === null ? tl : e;
}
function Vo() {
  (q === 0 || q === 3 || q === 2) && (q = 4), b === null || !(Rt & 268435455) && !(wl & 268435455) || lt(b, te);
}
function il(e, t) {
  var n = F;
  F |= 2;
  var r = wc();
  (b !== e || te !== t) && (Ae = null, _t(e, t));
  do
    try {
      Hd();
      break;
    } catch (l) {
      yc(e, l);
    }
  while (!0);
  if (jo(), F = n, nl.current = r, Y !== null)
    throw Error(y(261));
  return b = null, te = 0, q;
}
function Hd() {
  for (; Y !== null; )
    xc(Y);
}
function Qd() {
  for (; Y !== null && !hf(); )
    xc(Y);
}
function xc(e) {
  var t = Nc(e.alternate, e, ve);
  e.memoizedProps = e.pendingProps, t === null ? Sc(e) : Y = t, Io.current = null;
}
function Sc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Id(n, t), n !== null) {
        n.flags &= 32767, Y = n;
        return;
      }
      if (e !== null)
        e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        q = 6, Y = null;
        return;
      }
    } else if (n = Od(n, t, ve), n !== null) {
      Y = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      Y = t;
      return;
    }
    Y = t = e;
  } while (t !== null);
  q === 0 && (q = 5);
}
function Nt(e, t, n) {
  var r = D, l = Ce.transition;
  try {
    Ce.transition = null, D = 1, Wd(e, t, n, r);
  } finally {
    Ce.transition = l, D = r;
  }
  return null;
}
function Wd(e, t, n, r) {
  do
    en();
  while (ot !== null);
  if (F & 6)
    throw Error(y(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null)
    return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current)
    throw Error(y(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Cf(e, i), e === b && (Y = b = null, te = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Sr || (Sr = !0, jc(Ar, function() {
    return en(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Ce.transition, Ce.transition = null;
    var o = D;
    D = 1;
    var s = F;
    F |= 4, Io.current = null, $d(e, n), hc(n, e), fd(Ei), Vr = !!Ci, Ei = Ci = null, e.current = n, Ad(n), vf(), F = s, D = o, Ce.transition = i;
  } else
    e.current = n;
  if (Sr && (Sr = !1, ot = e, ll = l), i = e.pendingLanes, i === 0 && (dt = null), wf(n.stateNode), he(e, G()), t !== null)
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (rl)
    throw rl = !1, e = Gi, Gi = null, e;
  return ll & 1 && e.tag !== 0 && en(), i = e.pendingLanes, i & 1 ? e === Ki ? Mn++ : (Mn = 0, Ki = e) : Mn = 0, wt(), null;
}
function en() {
  if (ot !== null) {
    var e = ea(ll), t = Ce.transition, n = D;
    try {
      if (Ce.transition = null, D = 16 > e ? 16 : e, ot === null)
        var r = !1;
      else {
        if (e = ot, ot = null, ll = 0, F & 6)
          throw Error(y(331));
        var l = F;
        for (F |= 4, N = e.current; N !== null; ) {
          var i = N, o = i.child;
          if (N.flags & 16) {
            var s = i.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var c = s[u];
                for (N = c; N !== null; ) {
                  var p = N;
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ln(8, p, i);
                  }
                  var v = p.child;
                  if (v !== null)
                    v.return = p, N = v;
                  else
                    for (; N !== null; ) {
                      p = N;
                      var h = p.sibling, w = p.return;
                      if (dc(p), p === c) {
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
                    var O = S.sibling;
                    S.sibling = null, S = O;
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
          var m = o.child;
          if (o.subtreeFlags & 2064 && m !== null)
            m.return = o, N = m;
          else
            e:
              for (o = f; N !== null; ) {
                if (s = N, s.flags & 2048)
                  try {
                    switch (s.tag) {
                      case 0:
                      case 11:
                      case 15:
                        yl(9, s);
                    }
                  } catch (k) {
                    Q(s, s.return, k);
                  }
                if (s === o) {
                  N = null;
                  break e;
                }
                var g = s.sibling;
                if (g !== null) {
                  g.return = s.return, N = g;
                  break e;
                }
                N = s.return;
              }
        }
        if (F = l, wt(), Ue && typeof Ue.onPostCommitFiberRoot == "function")
          try {
            Ue.onPostCommitFiberRoot(cl, e);
          } catch {
          }
        r = !0;
      }
      return r;
    } finally {
      D = n, Ce.transition = t;
    }
  }
  return !1;
}
function bs(e, t, n) {
  t = sn(n, t), t = tc(e, t, 1), e = ft(e, t, 1), t = ue(), e !== null && (bn(e, 1, t), he(e, t));
}
function Q(e, t, n) {
  if (e.tag === 3)
    bs(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        bs(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (dt === null || !dt.has(r))) {
          e = sn(n, e), e = nc(t, e, 1), t = ft(t, e, 1), e = ue(), t !== null && (bn(t, 1, e), he(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Gd(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ue(), e.pingedLanes |= e.suspendedLanes & n, b === e && (te & n) === n && (q === 4 || q === 3 && (te & 130023424) === te && 500 > G() - $o ? _t(e, 0) : Uo |= n), he(e, t);
}
function kc(e, t) {
  t === 0 && (e.mode & 1 ? (t = fr, fr <<= 1, !(fr & 130023424) && (fr = 4194304)) : t = 1);
  var n = ue();
  e = Ye(e, t), e !== null && (bn(e, t, n), he(e, n));
}
function Kd(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), kc(e, n);
}
function Yd(e, t) {
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
  r !== null && r.delete(t), kc(e, n);
}
var Nc;
Nc = function(e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || pe.current)
      de = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128))
        return de = !1, Dd(e, t, n);
      de = !!(e.flags & 131072);
    }
  else
    de = !1, A && t.flags & 1048576 && Ea(t, Xr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Mr(e, t), e = t.pendingProps;
      var l = nn(t, oe.current);
      bt(t, n), l = Ro(null, t, r, e, l, n);
      var i = Mo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, me(r) ? (i = !0, Kr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, _o(t), l.updater = vl, t.stateNode = l, l._reactInternals = t, Di(t, r, e, n), t = Ui(null, t, r, !0, i, n)) : (t.tag = 0, A && i && xo(t), se(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Mr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = qd(r), e = Te(r, e), l) {
          case 0:
            t = Ii(null, t, r, e, n);
            break e;
          case 1:
            t = Hs(null, t, r, e, n);
            break e;
          case 11:
            t = Bs(null, t, r, e, n);
            break e;
          case 14:
            t = Vs(null, t, r, Te(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Ii(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Hs(e, t, r, l, n);
    case 3:
      e: {
        if (oc(t), e === null)
          throw Error(y(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, za(e, t), Jr(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated)
          if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
            l = sn(Error(y(423)), t), t = Qs(e, t, r, n, l);
            break e;
          } else if (r !== l) {
            l = sn(Error(y(424)), t), t = Qs(e, t, r, n, l);
            break e;
          } else
            for (ge = ct(t.stateNode.containerInfo.firstChild), ye = t, A = !0, Le = null, n = Fa(t, null, r, n), t.child = n; n; )
              n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (rn(), r === l) {
            t = Xe(e, t, n);
            break e;
          }
          se(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Da(t), e === null && Ri(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, _i(r, l) ? o = null : i !== null && _i(r, i) && (t.flags |= 32), ic(e, t), se(e, t, o, n), t.child;
    case 6:
      return e === null && Ri(t), null;
    case 13:
      return sc(e, t, n);
    case 4:
      return Po(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ln(t, null, r, n) : se(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Bs(e, t, r, l, n);
    case 7:
      return se(e, t, t.pendingProps, n), t.child;
    case 8:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, I(qr, r._currentValue), r._currentValue = o, i !== null)
          if (Fe(i.value, o)) {
            if (i.children === l.children && !pe.current) {
              t = Xe(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var s = i.dependencies;
              if (s !== null) {
                o = i.child;
                for (var u = s.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (i.tag === 1) {
                      u = We(-1, n & -n), u.tag = 2;
                      var c = i.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var p = c.pending;
                        p === null ? u.next = u : (u.next = p.next, p.next = u), c.pending = u;
                      }
                    }
                    i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Mi(
                      i.return,
                      n,
                      t
                    ), s.lanes |= n;
                    break;
                  }
                  u = u.next;
                }
              } else if (i.tag === 10)
                o = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (o = i.return, o === null)
                  throw Error(y(341));
                o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Mi(o, n, t), o = i.sibling;
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
        se(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, bt(t, n), l = Ee(l), r = r(l), t.flags |= 1, se(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Te(r, t.pendingProps), l = Te(r.type, l), Vs(e, t, r, l, n);
    case 15:
      return rc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Mr(e, t), t.tag = 1, me(r) ? (e = !0, Kr(t)) : e = !1, bt(t, n), Ra(t, r, l), Di(t, r, l, n), Ui(null, t, r, !0, e, n);
    case 19:
      return uc(e, t, n);
    case 22:
      return lc(e, t, n);
  }
  throw Error(y(156, t.tag));
};
function jc(e, t) {
  return qu(e, t);
}
function Xd(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function je(e, t, n, r) {
  return new Xd(e, t, n, r);
}
function Ho(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function qd(e) {
  if (typeof e == "function")
    return Ho(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === so)
      return 11;
    if (e === uo)
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
    Ho(e) && (o = 1);
  else if (typeof e == "string")
    o = 5;
  else
    e:
      switch (e) {
        case Ut:
          return Pt(n.children, l, i, t);
        case oo:
          o = 8, l |= 8;
          break;
        case ii:
          return e = je(12, n, t, l | 2), e.elementType = ii, e.lanes = i, e;
        case oi:
          return e = je(13, n, t, l), e.elementType = oi, e.lanes = i, e;
        case si:
          return e = je(19, n, t, l), e.elementType = si, e.lanes = i, e;
        case Mu:
          return xl(n, l, i, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Lu:
                o = 10;
                break e;
              case Ru:
                o = 9;
                break e;
              case so:
                o = 11;
                break e;
              case uo:
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
function xl(e, t, n, r) {
  return e = je(22, e, r, t), e.elementType = Mu, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Jl(e, t, n) {
  return e = je(6, e, null, t), e.lanes = n, e;
}
function bl(e, t, n) {
  return t = je(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Zd(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ml(0), this.expirationTimes = Ml(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ml(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Qo(e, t, n, r, l, i, o, s, u) {
  return e = new Zd(e, t, n, s, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = je(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, _o(i), e;
}
function Jd(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: It, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Cc(e) {
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
      return ja(e, n, t);
  }
  return t;
}
function Ec(e, t, n, r, l, i, o, s, u) {
  return e = Qo(n, r, !0, e, l, i, o, s, u), e.context = Cc(null), n = e.current, r = ue(), l = pt(n), i = We(r, l), i.callback = t ?? null, ft(n, i, l), e.current.lanes = l, bn(e, l, r), he(e, r), e;
}
function Sl(e, t, n, r) {
  var l = t.current, i = ue(), o = pt(l);
  return n = Cc(n), t.context === null ? t.context = n : t.pendingContext = n, t = We(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ft(l, t, o), e !== null && (Me(e, l, o, i), zr(e, l, o)), o;
}
function ol(e) {
  if (e = e.current, !e.child)
    return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function eu(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Wo(e, t) {
  eu(e, t), (e = e.alternate) && eu(e, t);
}
function bd() {
  return null;
}
var _c = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Go(e) {
  this._internalRoot = e;
}
kl.prototype.render = Go.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null)
    throw Error(y(409));
  Sl(e, t, null, null);
};
kl.prototype.unmount = Go.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Mt(function() {
      Sl(null, e, null, null);
    }), t[Ke] = null;
  }
};
function kl(e) {
  this._internalRoot = e;
}
kl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = ra();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < rt.length && t !== 0 && t < rt[n].priority; n++)
      ;
    rt.splice(n, 0, e), n === 0 && ia(e);
  }
};
function Ko(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Nl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function tu() {
}
function ep(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = ol(o);
        i.call(c);
      };
    }
    var o = Ec(t, r, e, 0, null, !1, !1, "", tu);
    return e._reactRootContainer = o, e[Ke] = o.current, Hn(e.nodeType === 8 ? e.parentNode : e), Mt(), o;
  }
  for (; l = e.lastChild; )
    e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var c = ol(u);
      s.call(c);
    };
  }
  var u = Qo(e, 0, !1, null, null, !1, !1, "", tu);
  return e._reactRootContainer = u, e[Ke] = u.current, Hn(e.nodeType === 8 ? e.parentNode : e), Mt(function() {
    Sl(t, u, n, r);
  }), u;
}
function jl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var u = ol(o);
        s.call(u);
      };
    }
    Sl(t, o, e, l);
  } else
    o = ep(n, t, e, l, r);
  return ol(o);
}
ta = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Nn(t.pendingLanes);
        n !== 0 && (fo(t, n | 1), he(t, G()), !(F & 6) && (un = G() + 500, wt()));
      }
      break;
    case 13:
      Mt(function() {
        var r = Ye(e, 1);
        if (r !== null) {
          var l = ue();
          Me(r, e, 1, l);
        }
      }), Wo(e, 1);
  }
};
po = function(e) {
  if (e.tag === 13) {
    var t = Ye(e, 134217728);
    if (t !== null) {
      var n = ue();
      Me(t, e, 134217728, n);
    }
    Wo(e, 134217728);
  }
};
na = function(e) {
  if (e.tag === 13) {
    var t = pt(e), n = Ye(e, t);
    if (n !== null) {
      var r = ue();
      Me(n, e, t, r);
    }
    Wo(e, t);
  }
};
ra = function() {
  return D;
};
la = function(e, t) {
  var n = D;
  try {
    return D = e, t();
  } finally {
    D = n;
  }
};
gi = function(e, t, n) {
  switch (t) {
    case "input":
      if (ci(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; )
          n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = ml(r);
            if (!l)
              throw Error(y(90));
            Du(r), ci(r, l);
          }
        }
      }
      break;
    case "textarea":
      Iu(e, n);
      break;
    case "select":
      t = n.value, t != null && Xt(e, !!n.multiple, t, !1);
  }
};
Qu = Ao;
Wu = Mt;
var tp = { usingClientEntryPoint: !1, Events: [tr, Vt, ml, Vu, Hu, Ao] }, xn = { findFiberByHostInstance: jt, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, np = { bundleType: xn.bundleType, version: xn.version, rendererPackageName: xn.rendererPackageName, rendererConfig: xn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: qe.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Yu(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: xn.findFiberByHostInstance || bd, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var kr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!kr.isDisabled && kr.supportsFiber)
    try {
      cl = kr.inject(np), Ue = kr;
    } catch {
    }
}
xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tp;
xe.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ko(t))
    throw Error(y(200));
  return Jd(e, t, null, n);
};
xe.createRoot = function(e, t) {
  if (!Ko(e))
    throw Error(y(299));
  var n = !1, r = "", l = _c;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Qo(e, 1, !1, null, null, n, !1, r, l), e[Ke] = t.current, Hn(e.nodeType === 8 ? e.parentNode : e), new Go(t);
};
xe.findDOMNode = function(e) {
  if (e == null)
    return null;
  if (e.nodeType === 1)
    return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(y(188)) : (e = Object.keys(e).join(","), Error(y(268, e)));
  return e = Yu(t), e = e === null ? null : e.stateNode, e;
};
xe.flushSync = function(e) {
  return Mt(e);
};
xe.hydrate = function(e, t, n) {
  if (!Nl(t))
    throw Error(y(200));
  return jl(null, e, t, !0, n);
};
xe.hydrateRoot = function(e, t, n) {
  if (!Ko(e))
    throw Error(y(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = _c;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = Ec(t, null, e, 1, n ?? null, l, !1, i, o), e[Ke] = t.current, Hn(e), r)
    for (e = 0; e < r.length; e++)
      n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
        n,
        l
      );
  return new kl(t);
};
xe.render = function(e, t, n) {
  if (!Nl(t))
    throw Error(y(200));
  return jl(null, e, t, !1, n);
};
xe.unmountComponentAtNode = function(e) {
  if (!Nl(e))
    throw Error(y(40));
  return e._reactRootContainer ? (Mt(function() {
    jl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ke] = null;
    });
  }), !0) : !1;
};
xe.unstable_batchedUpdates = Ao;
xe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Nl(n))
    throw Error(y(200));
  if (e == null || e._reactInternals === void 0)
    throw Error(y(38));
  return jl(e, t, n, !1, r);
};
xe.version = "18.2.0-next-9e3b772b8-20220608";
function Pc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Pc);
    } catch (e) {
      console.error(e);
    }
}
Pc(), Eu.exports = xe;
var rp = Eu.exports, nu = rp;
Fn.createRoot = nu.createRoot, Fn.hydrateRoot = nu.hydrateRoot;
const ru = ["Tutti", "P", "D", "C", "A"], qi = {
  P: "Portiere",
  D: "Difensore",
  C: "Centrocampista",
  A: "Attaccante",
  U: "Altro"
}, lu = {
  P: 1,
  D: 2,
  C: 3,
  A: 4,
  U: 5
}, sl = {
  P: "lf-role-badge lf-role-badge--p",
  D: "lf-role-badge lf-role-badge--d",
  C: "lf-role-badge lf-role-badge--c",
  A: "lf-role-badge lf-role-badge--a",
  U: "lf-role-badge lf-role-badge--u"
}, Ze = (e) => ({
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
function lp({ size: e = 24, ...t }) {
  return /* @__PURE__ */ a.jsxs("svg", { ...Ze(e), ...t, children: [
    /* @__PURE__ */ a.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
    /* @__PURE__ */ a.jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
  ] });
}
function iu({ size: e = 20, ...t }) {
  return /* @__PURE__ */ a.jsxs("svg", { ...Ze(e), ...t, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ a.jsx("path", { d: "m21 21-4.3-4.3" })
  ] });
}
function ip({ size: e = 20, ...t }) {
  return /* @__PURE__ */ a.jsxs("svg", { ...Ze(e), ...t, children: [
    /* @__PURE__ */ a.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ a.jsx("path", { d: "m17 8 5 5" }),
    /* @__PURE__ */ a.jsx("path", { d: "m22 8-5 5" })
  ] });
}
function Tc({ size: e = 20, ...t }) {
  return /* @__PURE__ */ a.jsxs("svg", { ...Ze(e), ...t, children: [
    /* @__PURE__ */ a.jsx("path", { d: "M18 6 6 18" }),
    /* @__PURE__ */ a.jsx("path", { d: "m6 6 12 12" })
  ] });
}
function Ve({ size: e = 18, ...t }) {
  return /* @__PURE__ */ a.jsx("svg", { ...Ze(e), ...t, children: /* @__PURE__ */ a.jsx("path", { d: "m6 9 6 6 6-6" }) });
}
function op({ size: e = 16, ...t }) {
  return /* @__PURE__ */ a.jsx("svg", { ...Ze(e), ...t, children: /* @__PURE__ */ a.jsx("path", { d: "m18 15-6-6-6 6" }) });
}
function ul({ size: e = 24, ...t }) {
  return /* @__PURE__ */ a.jsx("svg", { ...Ze(e), ...t, children: /* @__PURE__ */ a.jsx("path", { d: "M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" }) });
}
function sp({ size: e = 18, ...t }) {
  return /* @__PURE__ */ a.jsxs("svg", { ...Ze(e), ...t, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "8", cy: "8", r: "6" }),
    /* @__PURE__ */ a.jsx("path", { d: "M18.1 8.4A6 6 0 1 1 8.4 18.1" }),
    /* @__PURE__ */ a.jsx("path", { d: "M6 8h4M8 6v4" })
  ] });
}
function up({ size: e = 18, ...t }) {
  return /* @__PURE__ */ a.jsxs("svg", { ...Ze(e), ...t, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 8v4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 16h.01" })
  ] });
}
function ap(e) {
  return e.split(/\s+-\s+/).map((t) => t.trim()).filter(Boolean);
}
function ou({ asset: e, expanded: t, onToggle: n }) {
  const r = ap(e.displayName);
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
function cp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function fp({ player: e }) {
  return /* @__PURE__ */ a.jsxs("div", { className: "tw-group tw-grid tw-grid-cols-12 tw-gap-4 tw-px-6 tw-py-4 tw-transition hover:tw-bg-slate-50", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "tw-col-span-4 tw-flex tw-min-w-0 tw-items-center tw-gap-3", children: [
      /* @__PURE__ */ a.jsx("div", { className: "lf-player-avatar", "aria-hidden": "true", children: cp(e.displayName) }),
      /* @__PURE__ */ a.jsxs("div", { className: "tw-min-w-0", children: [
        /* @__PURE__ */ a.jsxs("div", { className: `tw-truncate tw-font-semibold tw-transition group-hover:tw-text-[var(--primary)] ${e.active ? "tw-text-slate-900" : "tw-italic tw-text-slate-400"}`, children: [
          e.displayName,
          !e.active && " *"
        ] }),
        /* @__PURE__ */ a.jsx("div", { className: "tw-truncate tw-text-sm tw-text-slate-500", children: e.realTeam || "—" })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center", children: /* @__PURE__ */ a.jsx("span", { className: sl[e.role] ?? sl.U, children: qi[e.role] ?? "?" }) }),
    /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ a.jsx("span", { className: "tw-text-xl tw-font-black tw-text-slate-900", children: e.quotation || "—" }) }),
    /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ a.jsx("span", { className: e.purchasePrice ? "tw-text-lg tw-font-bold tw-text-[var(--primary)]" : "tw-text-slate-400", children: e.purchasePrice || "—" }) }),
    /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-min-w-0", children: /* @__PURE__ */ a.jsx("span", { className: `tw-truncate tw-text-sm ${e.ownerTag ? "tw-text-slate-600" : "tw-italic tw-text-slate-400"}`, children: e.ownerTag || "Svincolato" }) })
  ] });
}
function dp({
  teams: e,
  owners: t,
  currentRole: n,
  currentTeam: r,
  currentOwner: l,
  hasActiveFilters: i,
  onRoleChange: o,
  onTeamChange: s,
  onOwnerChange: u,
  onResetFilters: c
}) {
  return /* @__PURE__ */ a.jsxs("div", { className: "tw-mb-5 sm:tw-mb-6", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "tw-hidden tw-items-center tw-justify-between tw-gap-4 md:tw-flex", children: [
      /* @__PURE__ */ a.jsx("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: ru.map((p) => /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          onClick: () => o(p),
          className: `lf-role-pill ${n === p ? "lf-role-pill--active" : ""}`,
          children: p === "Tutti" ? "Tutti" : qi[p]
        },
        p
      )) }),
      /* @__PURE__ */ a.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ a.jsxs("label", { className: "lf-select-wrap", children: [
          /* @__PURE__ */ a.jsx("span", { "aria-hidden": "true", children: "🏟️" }),
          /* @__PURE__ */ a.jsxs("select", { value: r, onChange: (p) => s(p.target.value), "aria-label": "Filtra per squadra reale", children: [
            /* @__PURE__ */ a.jsx("option", { value: "Tutti", children: "Squadra" }),
            e.map((p) => /* @__PURE__ */ a.jsx("option", { value: p, children: p }, p))
          ] }),
          /* @__PURE__ */ a.jsx(Ve, { size: 14 })
        ] }),
        /* @__PURE__ */ a.jsxs("label", { className: "lf-select-wrap", children: [
          /* @__PURE__ */ a.jsx("span", { "aria-hidden": "true", children: "👤" }),
          /* @__PURE__ */ a.jsxs("select", { value: l, onChange: (p) => u(p.target.value), "aria-label": "Filtra per proprietario", children: [
            /* @__PURE__ */ a.jsx("option", { value: "Tutti", children: "Proprietario" }),
            t.map((p) => /* @__PURE__ */ a.jsx("option", { value: p, children: p }, p))
          ] }),
          /* @__PURE__ */ a.jsx(Ve, { size: 14 })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "lf-mobile-filters md:tw-hidden", children: [
      /* @__PURE__ */ a.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ a.jsx("span", { className: "lf-mobile-filter__label", children: "Ruolo" }),
        /* @__PURE__ */ a.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ a.jsx("select", { value: n, onChange: (p) => o(p.target.value), "aria-label": "Filtra per ruolo", children: ru.map((p) => /* @__PURE__ */ a.jsx("option", { value: p, children: p === "Tutti" ? "Tutti" : qi[p] }, p)) }),
          /* @__PURE__ */ a.jsx(Ve, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ a.jsx("span", { className: "lf-mobile-filter__label", children: "Squadra" }),
        /* @__PURE__ */ a.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ a.jsxs("select", { value: r, onChange: (p) => s(p.target.value), "aria-label": "Filtra per squadra reale", children: [
            /* @__PURE__ */ a.jsx("option", { value: "Tutti", children: "Tutte" }),
            e.map((p) => /* @__PURE__ */ a.jsx("option", { value: p, children: p }, p))
          ] }),
          /* @__PURE__ */ a.jsx(Ve, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ a.jsx("span", { className: "lf-mobile-filter__label", children: "Proprietario" }),
        /* @__PURE__ */ a.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ a.jsxs("select", { value: l, onChange: (p) => u(p.target.value), "aria-label": "Filtra per proprietario", children: [
            /* @__PURE__ */ a.jsx("option", { value: "Tutti", children: "Tutti" }),
            t.map((p) => /* @__PURE__ */ a.jsx("option", { value: p, children: p }, p))
          ] }),
          /* @__PURE__ */ a.jsx(Ve, { size: 14 })
        ] })
      ] })
    ] }),
    i && /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: c, className: "lf-mobile-reset md:tw-hidden", children: [
      /* @__PURE__ */ a.jsx(Tc, { size: 15 }),
      " Azzera filtri"
    ] })
  ] });
}
function ei({ active: e, direction: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ a.jsx(op, { size: 14 }) : /* @__PURE__ */ a.jsx(Ve, { size: 14 }) : null;
}
function pp({ sortKey: e, sortDirection: t, onSort: n }) {
  return /* @__PURE__ */ a.jsxs("div", { className: "tw-hidden tw-grid-cols-12 tw-gap-4 tw-border-b tw-border-slate-200 tw-bg-slate-50 tw-px-6 tw-py-4 tw-text-xs tw-font-bold tw-uppercase tw-tracking-wider tw-text-slate-500 md:tw-grid", children: [
    /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-4", children: "Giocatore" }),
    /* @__PURE__ */ a.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2", onClick: () => n("position"), children: [
      "Ruolo ",
      /* @__PURE__ */ a.jsx(ei, { active: e === "position", direction: t })
    ] }),
    /* @__PURE__ */ a.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2 tw-justify-center", onClick: () => n("quotation"), children: [
      "Quot. ",
      /* @__PURE__ */ a.jsx(ei, { active: e === "quotation", direction: t })
    ] }),
    /* @__PURE__ */ a.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2 tw-justify-center", onClick: () => n("purchasePrice"), children: [
      "Prezzo ",
      /* @__PURE__ */ a.jsx(ei, { active: e === "purchasePrice", direction: t })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "tw-col-span-2", children: "Proprietario" })
  ] });
}
function mp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function hp({ player: e }) {
  return /* @__PURE__ */ a.jsx("article", { className: "tw-p-3 tw-transition hover:tw-bg-slate-50", children: /* @__PURE__ */ a.jsxs("div", { className: "tw-flex tw-items-start tw-gap-3", children: [
    /* @__PURE__ */ a.jsx("div", { className: "lf-player-avatar lf-player-avatar--mobile", "aria-hidden": "true", children: mp(e.displayName) }),
    /* @__PURE__ */ a.jsxs("div", { className: "tw-min-w-0 tw-flex-1", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "tw-mb-1 tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ a.jsx("span", { className: sl[e.role] ?? sl.U, children: e.role || "?" }),
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
function su(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ø/g, "O").replace(/ø/g, "o").toLowerCase();
}
function uu(e) {
  return e.type === "goalkeeper_block" || e.role === "P" && /\s+-\s+/.test(e.displayName);
}
function vp({ assets: e }) {
  const [t, n] = M.useState(""), [r, l] = M.useState("Tutti"), [i, o] = M.useState("Tutti"), [s, u] = M.useState("Tutti"), [c, p] = M.useState(!1), [v, h] = M.useState("position"), [w, x] = M.useState("asc"), [S, O] = M.useState(/* @__PURE__ */ new Set()), d = M.useMemo(() => [...new Set(e.map((j) => j.realTeam).filter(Boolean))].sort((j, T) => j.localeCompare(T, "it")), [e]), f = M.useMemo(() => [...new Set(e.map((j) => j.ownerTag).filter(Boolean))].sort((j, T) => j.localeCompare(T, "it")), [e]), m = M.useMemo(() => {
    const j = su(t.trim());
    return e.filter((T) => !(j && !su(`${T.displayName} ${T.realTeam} ${T.ownerTag}`).includes(j) || c && !T.isFreeAgent || r !== "Tutti" && T.role !== r || i !== "Tutti" && T.realTeam !== i || s !== "Tutti" && T.ownerTag !== s));
  }, [e, s, r, t, c, i]), g = M.useMemo(() => [...m].sort((j, T) => {
    if (v === "position") {
      const Je = (lu[j.role] ?? 9) - (lu[T.role] ?? 9), be = w === "asc" ? Je : -Je;
      if (be !== 0)
        return be;
      const dn = j.realTeam.localeCompare(T.realTeam, "it");
      if (dn !== 0)
        return dn;
      const rr = T.quotation - j.quotation;
      return rr !== 0 ? rr : j.displayName.localeCompare(T.displayName, "it");
    }
    const K = (j[v] || 0) - (T[v] || 0);
    return w === "asc" ? K : -K;
  }), [m, w, v]), k = !!(t || r !== "Tutti" || i !== "Tutti" || s !== "Tutti" || c), E = () => {
    n(""), l("Tutti"), o("Tutti"), u("Tutti"), p(!1), h("position"), x("asc");
  }, _ = (j) => {
    if (v === j) {
      w === "desc" || h("position"), x("asc");
      return;
    }
    h(j), x("desc");
  }, P = (j) => {
    O((T) => {
      const K = new Set(T);
      return K.has(j) ? K.delete(j) : K.add(j), K;
    });
  };
  return /* @__PURE__ */ a.jsx("div", { className: "tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-7xl", children: [
    /* @__PURE__ */ a.jsx("div", { className: "tw-flex tw-justify-end tw-p-4 sm:tw-p-6 lg:tw-p-8", children: /* @__PURE__ */ a.jsxs("div", { className: "tw-flex tw-w-full tw-flex-wrap tw-items-stretch tw-gap-2 lg:tw-ml-auto lg:tw-w-auto lg:tw-justify-end", children: [
      /* @__PURE__ */ a.jsxs("label", { className: "lf-search tw-min-w-0 tw-flex-1 lg:tw-w-80 lg:tw-flex-none", children: [
        /* @__PURE__ */ a.jsx(iu, { size: 20 }),
        /* @__PURE__ */ a.jsx("input", { type: "search", placeholder: "Cerca giocatore...", value: t, onChange: (j) => n(j.target.value) })
      ] }),
      /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => p((j) => !j), className: `lf-action-button ${c ? "lf-action-button--active" : ""}`, title: "Mostra solo giocatori svincolati", children: [
        /* @__PURE__ */ a.jsx(ip, { size: 20 }),
        /* @__PURE__ */ a.jsx("span", { className: "tw-hidden sm:tw-inline", children: "Svincolati" })
      ] }),
      k && /* @__PURE__ */ a.jsx("button", { type: "button", onClick: E, className: "lf-reset-button tw-hidden md:tw-flex", title: "Azzera filtri", children: /* @__PURE__ */ a.jsx(Tc, { size: 20 }) })
    ] }) }),
    /* @__PURE__ */ a.jsxs("div", { className: "tw-px-3 sm:tw-px-6 lg:tw-px-8", children: [
      /* @__PURE__ */ a.jsx(
        dp,
        {
          teams: d,
          owners: f,
          currentRole: r,
          currentTeam: i,
          currentOwner: s,
          hasActiveFilters: k,
          onRoleChange: l,
          onTeamChange: o,
          onOwnerChange: u,
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
        /* @__PURE__ */ a.jsx(pp, { sortKey: v, sortDirection: w, onSort: _ }),
        /* @__PURE__ */ a.jsx("div", { className: "tw-hidden tw-divide-y tw-divide-slate-100 md:tw-block", children: g.map((j) => uu(j) ? /* @__PURE__ */ a.jsx(ou, { asset: j, expanded: S.has(j.assetCode), onToggle: () => P(j.assetCode) }, j.assetCode) : /* @__PURE__ */ a.jsx(fp, { player: j }, j.assetCode)) }),
        /* @__PURE__ */ a.jsx("div", { className: "tw-divide-y tw-divide-slate-100 md:tw-hidden", children: g.map((j) => uu(j) ? /* @__PURE__ */ a.jsx(ou, { asset: j, expanded: S.has(j.assetCode), onToggle: () => P(j.assetCode) }, j.assetCode) : /* @__PURE__ */ a.jsx(hp, { player: j }, j.assetCode)) }),
        g.length === 0 && /* @__PURE__ */ a.jsxs("div", { className: "tw-px-6 tw-py-14 tw-text-center", children: [
          /* @__PURE__ */ a.jsx(iu, { size: 34, className: "tw-mx-auto tw-mb-3 tw-text-slate-300" }),
          /* @__PURE__ */ a.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-slate-800", children: "Nessun giocatore trovato" }),
          /* @__PURE__ */ a.jsx("p", { className: "tw-mb-0 tw-mt-1 tw-text-sm tw-text-slate-500", children: "Prova a modificare i filtri di ricerca." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "tw-h-4 sm:tw-h-6" })
  ] }) });
}
function gp(e) {
  return e.map((t) => ({
    ...t,
    purchasePrice: t.purchasePrice ?? 0
  }));
}
function ti() {
  var e, t, n, r;
  return {
    state: ((t = (e = window.LineupLeagueData) == null ? void 0 : e.getState) == null ? void 0 : t.call(e)) ?? { status: "idle" },
    assets: gp(((r = (n = window.LineupLeagueData) == null ? void 0 : n.getAssets) == null ? void 0 : r.call(n)) ?? [])
  };
}
function zc() {
  var o;
  const e = M.useMemo(ti, []), [t, n] = M.useState(e.state), [r, l] = M.useState(e.assets), i = (o = window.LINEUP_FANTA) == null ? void 0 : o.league;
  return M.useEffect(() => {
    let s = !1, u = 0;
    const c = () => {
      if (s)
        return;
      const v = ti();
      n(v.state), l(v.assets), u += 1, v.state.status !== "ready" && u < 20 && window.setTimeout(c, 150);
    }, p = (v) => {
      if (v.detail.leagueId !== (i == null ? void 0 : i.id))
        return;
      const h = ti();
      n(h.state), l(h.assets);
    };
    return document.addEventListener("lineup:league-assets-ready", p), c(), () => {
      s = !0, document.removeEventListener("lineup:league-assets-ready", p);
    };
  }, [i == null ? void 0 : i.id]), { state: t, assets: r, league: i };
}
function yp() {
  const { state: e, assets: t } = zc();
  return e.status === "error" ? /* @__PURE__ */ a.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ a.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-red-600", children: "Errore nel caricamento del Listone" }),
    /* @__PURE__ */ a.jsx("p", { className: "tw-mb-0 tw-mt-2 tw-text-sm tw-text-slate-500", children: "Controlla il CSV della lega e ricarica la pagina." })
  ] }) }) : e.status !== "ready" ? /* @__PURE__ */ a.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ a.jsx("div", { className: "lf-spinner tw-mx-auto tw-mb-3" }),
    /* @__PURE__ */ a.jsx("p", { className: "tw-m-0 tw-text-sm tw-font-semibold tw-text-slate-500", children: "Caricamento del Listone…" })
  ] }) }) : /* @__PURE__ */ a.jsx(vp, { assets: t });
}
function wp(e) {
  return e.split(/\s+-\s+/).map((t) => t.trim()).filter(Boolean);
}
function xp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function Nr({ players: e, role: t, label: n }) {
  const [r, l] = M.useState(/* @__PURE__ */ new Set()), i = e.filter((s) => s.role === t).sort((s, u) => {
    const c = u.purchasePrice - s.purchasePrice;
    return c !== 0 ? c : s.displayName.localeCompare(u.displayName, "it");
  }), o = (s) => {
    l((u) => {
      const c = new Set(u);
      return c.has(s) ? c.delete(s) : c.add(s), c;
    });
  };
  return /* @__PURE__ */ a.jsxs("section", { className: "lf-squad-section", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-section__title", children: [
      n,
      t === "P" ? " (Blocchi)" : ""
    ] }),
    i.length === 0 ? /* @__PURE__ */ a.jsx("div", { className: "lf-squad-empty", children: "—" }) : /* @__PURE__ */ a.jsx("div", { className: "lf-squad-list", children: i.map((s) => {
      const u = t === "P" && (s.type === "goalkeeper_block" || /\s+-\s+/.test(s.displayName)), c = r.has(s.assetCode), p = u ? wp(s.displayName) : [], v = /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-item__left", children: [
          /* @__PURE__ */ a.jsx("div", { className: `lf-squad-avatar lf-squad-avatar--${t.toLowerCase()}`, "aria-hidden": "true", children: u ? /* @__PURE__ */ a.jsx(ul, { size: 17 }) : xp(s.displayName) }),
          /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-item__copy", children: [
            /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-item__name", children: [
              u ? `Blocco ${s.realTeam || s.displayName}` : s.displayName,
              !s.active && " *",
              u && /* @__PURE__ */ a.jsx(Ve, { size: 14, className: c ? "lf-chevron-open" : "" })
            ] }),
            /* @__PURE__ */ a.jsx("div", { className: "lf-squad-item__team", children: u ? `${p.length} portieri` : s.realTeam || "—" })
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-values", children: [
          /* @__PURE__ */ a.jsxs("span", { children: [
            /* @__PURE__ */ a.jsx("small", { children: "Q" }),
            /* @__PURE__ */ a.jsx("strong", { children: s.quotation || "—" })
          ] }),
          /* @__PURE__ */ a.jsxs("span", { children: [
            /* @__PURE__ */ a.jsx("small", { children: "P" }),
            /* @__PURE__ */ a.jsx("strong", { className: "lf-squad-price", children: s.purchasePrice || "—" })
          ] })
        ] })
      ] });
      return /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-item-wrap", children: [
        u ? /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "lf-squad-item lf-squad-item--clickable",
            onClick: () => o(s.assetCode),
            "aria-expanded": c,
            children: v
          }
        ) : /* @__PURE__ */ a.jsx("div", { className: "lf-squad-item", children: v }),
        u && c && /* @__PURE__ */ a.jsx("div", { className: "lf-squad-goalkeepers", children: p.map((h) => /* @__PURE__ */ a.jsxs("div", { className: "lf-squad-goalkeeper", children: [
          /* @__PURE__ */ a.jsx("div", { className: "lf-squad-goalkeeper__avatar", children: "P" }),
          /* @__PURE__ */ a.jsx("span", { children: h })
        ] }, h)) })
      ] }, s.assetCode);
    }) })
  ] });
}
const ni = { P: 2, D: 8, C: 8, A: 6 }, Sp = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 });
function kp({ team: e }) {
  const [t, n] = M.useState("ALL"), [r, l] = M.useState(!1), i = (u) => {
    n((c) => c === u ? "ALL" : u);
  }, o = !!(e.logoUrl && !r), s = e.credits === null ? "—" : Sp.format(e.credits);
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
            /* @__PURE__ */ a.jsx(sp, { size: 16 }),
            " ",
            s
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: `lf-team-status ${e.isComplete ? "lf-team-status--complete" : "lf-team-status--incomplete"}`, children: [
          e.isComplete ? /* @__PURE__ */ a.jsx(ul, { size: 13 }) : /* @__PURE__ */ a.jsx(up, { size: 13 }),
          e.isComplete ? "ROSA COMPLETA" : "INCOMPLETA"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "lf-team-role-filters", "aria-label": `Filtra la rosa di ${e.managerName} per ruolo`, children: Object.keys(ni).map((u) => {
      const c = e.roleCounts[u] === ni[u];
      return /* @__PURE__ */ a.jsxs(
        "button",
        {
          type: "button",
          onClick: () => i(u),
          className: `${t === u ? "is-active" : ""} ${c ? "is-complete" : ""}`,
          children: [
            u,
            ": ",
            e.roleCounts[u],
            "/",
            ni[u]
          ]
        },
        u
      );
    }) }),
    /* @__PURE__ */ a.jsx("div", { className: "lf-team-roster-frame", children: /* @__PURE__ */ a.jsxs("div", { className: "lf-team-roster", children: [
      (t === "ALL" || t === "P") && /* @__PURE__ */ a.jsx(Nr, { players: e.players, role: "P", label: "Portieri" }),
      (t === "ALL" || t === "D") && /* @__PURE__ */ a.jsx(Nr, { players: e.players, role: "D", label: "Difensori" }),
      (t === "ALL" || t === "C") && /* @__PURE__ */ a.jsx(Nr, { players: e.players, role: "C", label: "Centrocampisti" }),
      (t === "ALL" || t === "A") && /* @__PURE__ */ a.jsx(Nr, { players: e.players, role: "A", label: "Attaccanti" })
    ] }) })
  ] });
}
function ri(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Np(e) {
  if (typeof e == "number" && Number.isFinite(e))
    return e;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e.trim().replace(",", "."));
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function jp(e) {
  if (!ri(e))
    return {};
  const t = ri(e.teams) ? e.teams : e;
  return Object.entries(t).reduce((n, [r, l]) => {
    if (!ri(l))
      return n;
    const i = l, o = i.logoUrl ?? i.logo_url;
    return n[r] = {
      credits: Np(i.credits),
      logoUrl: typeof o == "string" ? o.trim() : ""
    }, n;
  }, {});
}
async function Cp(e, t) {
  if (!e)
    return {};
  const n = t || `/data/${encodeURIComponent(e)}/teams.json`, r = await fetch(n, { cache: "no-store" });
  if (r.status === 404)
    return {};
  if (!r.ok)
    throw new Error(`Impossibile caricare i profili rose: HTTP ${r.status}`);
  return jp(await r.json());
}
const au = { P: 2, D: 8, C: 8, A: 6 };
function Ep({ assets: e, leagueId: t, profilesUrl: n }) {
  const [r, l] = M.useState({});
  M.useEffect(() => {
    let o = !1;
    return Cp(t, n).then((s) => {
      o || l(s);
    }).catch((s) => {
      console.warn("Team profiles load error", s), o || l({});
    }), () => {
      o = !0;
    };
  }, [t, n]);
  const i = M.useMemo(() => {
    const o = /* @__PURE__ */ new Map();
    return e.forEach((u) => {
      if (u.isFreeAgent || !u.ownerTag)
        return;
      const c = u.ownerTag.trim();
      if (!c)
        return;
      const p = o.get(c) ?? [];
      p.push(u), o.set(c, p);
    }), [...o.entries()].map(([u, c]) => {
      const p = { P: 0, D: 0, C: 0, A: 0 };
      c.forEach((w) => {
        w.role in p && (p[w.role] += 1);
      });
      const v = Object.keys(au).every((w) => p[w] === au[w]), h = r[u];
      return {
        managerName: u,
        credits: (h == null ? void 0 : h.credits) ?? null,
        logoUrl: (h == null ? void 0 : h.logoUrl) ?? "",
        players: c,
        isComplete: v,
        roleCounts: p,
        totalPlayers: c.length
      };
    }).sort((u, c) => {
      const p = u.managerName.includes("-"), v = c.managerName.includes("-");
      return p !== v ? p ? 1 : -1 : u.managerName.localeCompare(c.managerName, "it");
    });
  }, [e, r]);
  return /* @__PURE__ */ a.jsx("div", { className: "tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7", children: /* @__PURE__ */ a.jsx("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-7xl", children: i.length > 0 ? /* @__PURE__ */ a.jsx("div", { className: "lf-teams-grid", children: i.map((o) => /* @__PURE__ */ a.jsx(kp, { team: o }, o.managerName)) }) : /* @__PURE__ */ a.jsxs("div", { className: "lf-teams-empty", children: [
    /* @__PURE__ */ a.jsx(lp, { size: 34 }),
    /* @__PURE__ */ a.jsx("h2", { children: "Nessuna rosa disponibile" }),
    /* @__PURE__ */ a.jsx("p", { children: "Nel CSV non risultano asset assegnati a un proprietario." })
  ] }) }) });
}
function _p() {
  var r;
  const { state: e, assets: t, league: n } = zc();
  return e.status === "error" ? /* @__PURE__ */ a.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ a.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-red-600", children: "Errore nel caricamento delle Rose" }),
    /* @__PURE__ */ a.jsx("p", { className: "tw-mb-0 tw-mt-2 tw-text-sm tw-text-slate-500", children: "Controlla il CSV della lega e ricarica la pagina." })
  ] }) }) : e.status !== "ready" ? /* @__PURE__ */ a.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ a.jsx("div", { className: "lf-spinner tw-mx-auto tw-mb-3" }),
    /* @__PURE__ */ a.jsx("p", { className: "tw-m-0 tw-text-sm tw-font-semibold tw-text-slate-500", children: "Caricamento delle Rose…" })
  ] }) }) : /* @__PURE__ */ a.jsx(Ep, { assets: t, leagueId: (n == null ? void 0 : n.id) ?? "", profilesUrl: (r = n == null ? void 0 : n.leagueData) == null ? void 0 : r.teamProfilesUrl });
}
function cu(e) {
  const t = [];
  let n = "", r = !1;
  for (let l = 0; l < e.length; l += 1) {
    const i = e[l];
    i === '"' ? r && e[l + 1] === '"' ? (n += '"', l += 1) : r = !r : i === "," && !r ? (t.push(n), n = "") : n += i;
  }
  return t.push(n), t.map((l) => l.trim());
}
function Zi(e) {
  const t = String(e ?? "").trim().replace(",", ".");
  if (!t)
    return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}
function jr(e) {
  const t = Zi(e);
  return t === null ? null : Math.trunc(t);
}
function Pp(e, t) {
  const n = String(e ?? "").replace(/^\uFEFF/, "").split(/\r?\n/).filter((s) => s.trim().length > 0);
  if (n.length === 0)
    return [];
  const r = cu(n[0]).map((s) => s.toLowerCase()), l = (s) => r.indexOf(s);
  if ([
    "real_round_number",
    "fantasy_matchday_number",
    "home_team",
    "away_team"
  ].some((s) => l(s) < 0))
    throw new Error("Il CSV Calendario non contiene tutte le colonne richieste.");
  const o = /* @__PURE__ */ new Map();
  for (const s of n.slice(1)) {
    const u = cu(s), c = jr(u[l("fantasy_matchday_number")]), p = jr(u[l("real_round_number")]), v = String(u[l("home_team")] ?? "").trim(), h = String(u[l("away_team")] ?? "").trim();
    if (c === null || p === null || !v || !h)
      continue;
    const w = {
      realRoundNumber: p,
      fantasyMatchdayNumber: c,
      status: "da_calcolare",
      homeTeam: v,
      awayTeam: h,
      homeTotal: Zi(u[l("home_total")]),
      awayTotal: Zi(u[l("away_total")]),
      homeGoals: jr(u[l("home_goals")]),
      awayGoals: jr(u[l("away_goals")]),
      note: String(u[l("note")] ?? "").trim()
    }, x = o.get(c) ?? [];
    x.push(w), o.set(c, x);
  }
  return Array.from(o.entries()).sort(([s], [u]) => s - u).map(([s, u]) => {
    var v;
    const p = u.length === t && u.every((h) => h.homeGoals !== null && h.awayGoals !== null) ? "calcolata" : "da_calcolare";
    return {
      fantasyMatchdayNumber: s,
      realRoundNumber: ((v = u[0]) == null ? void 0 : v.realRoundNumber) ?? s,
      status: p,
      matches: u.map((h) => ({ ...h, status: p }))
    };
  });
}
function fu(e) {
  return e === null ? "" : new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(e) ? 0 : 1
  }).format(e);
}
function du(e) {
  var r;
  const n = [...e].sort((l, i) => l.realRoundNumber - i.realRoundNumber || l.fantasyMatchdayNumber - i.fantasyMatchdayNumber), t = n.find((l) => l.status === "da_calcolare");
  return (t == null ? void 0 : t.realRoundNumber) ?? ((r = n[n.length - 1]) == null ? void 0 : r.realRoundNumber) ?? 0;
}
function Tp({
  competitionLabel: e,
  leagueName: t,
  matchdays: n,
  expectedMatches: r
}) {
  const l = M.useMemo(
    () => [...n].sort((d, f) => d.realRoundNumber - f.realRoundNumber || d.fantasyMatchdayNumber - f.fantasyMatchdayNumber),
    [n]
  ), [i, o] = M.useState(() => du(l));
  M.useEffect(() => {
    l.some((d) => d.realRoundNumber === i) || o(du(l));
  }, [l, i]);
  const s = M.useMemo(
    () => l.findIndex((d) => d.realRoundNumber === i),
    [l, i]
  ), u = s >= 0 ? l[s] : void 0;
  if (l.length === 0)
    return /* @__PURE__ */ a.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card lf-calendar-state", children: [
      /* @__PURE__ */ a.jsx("strong", { children: "Calendario non ancora disponibile" }),
      /* @__PURE__ */ a.jsxs("p", { children: [
        "La fonte di ",
        t,
        " non è stata ancora configurata."
      ] })
    ] }) });
  if (!u)
    return null;
  const c = u.matches.filter(
    (d) => d.homeGoals !== null && d.awayGoals !== null
  ).length;
  return /* @__PURE__ */ a.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card lf-calendar-card", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "lf-calendar-toolbar", children: [
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "lf-calendar-nav",
          onClick: () => o(l[s - 1].realRoundNumber),
          disabled: s <= 0,
          "aria-label": "Giornata precedente",
          children: "‹"
        }
      ),
      /* @__PURE__ */ a.jsxs("label", { className: "lf-calendar-select-wrap", children: [
        /* @__PURE__ */ a.jsxs("span", { children: [
          "Giornata ",
          e
        ] }),
        /* @__PURE__ */ a.jsx(
          "select",
          {
            value: u.realRoundNumber,
            onChange: (d) => o(Number(d.target.value)),
            children: l.map((d) => /* @__PURE__ */ a.jsx(
              "option",
              {
                value: d.realRoundNumber,
                children: d.realRoundNumber
              },
              `${d.realRoundNumber}-${d.fantasyMatchdayNumber}`
            ))
          }
        ),
        /* @__PURE__ */ a.jsxs("small", { children: [
          "Giornata Fanta ",
          u.fantasyMatchdayNumber
        ] })
      ] }),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "lf-calendar-nav",
          onClick: () => o(l[s + 1].realRoundNumber),
          disabled: s >= l.length - 1,
          "aria-label": "Giornata successiva",
          children: "›"
        }
      )
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "lf-calendar-summary", children: /* @__PURE__ */ a.jsxs("div", { className: "lf-calendar-status-wrap", children: [
      /* @__PURE__ */ a.jsx("span", { className: `lf-calendar-status lf-calendar-status--${u.status}`, children: u.status === "calcolata" ? "Calcolata" : "Da calcolare" }),
      /* @__PURE__ */ a.jsxs("small", { children: [
        c,
        "/",
        r,
        " risultati"
      ] })
    ] }) }),
    /* @__PURE__ */ a.jsx("div", { className: "lf-calendar-matches", children: u.matches.map((d, f) => {
      const m = d.homeGoals !== null && d.awayGoals !== null;
      return /* @__PURE__ */ a.jsxs(
        "article",
        {
          className: `lf-calendar-match${m ? "" : " is-pending"}`,
          children: [
            /* @__PURE__ */ a.jsxs("div", { className: "lf-calendar-team lf-calendar-team--home", children: [
              /* @__PURE__ */ a.jsx("strong", { children: d.homeTeam }),
              d.homeTotal !== null && /* @__PURE__ */ a.jsx("span", { children: fu(d.homeTotal) })
            ] }),
            /* @__PURE__ */ a.jsx(
              "div",
              {
                className: "lf-calendar-score",
                "aria-label": m ? `${d.homeGoals} a ${d.awayGoals}` : "Risultato non disponibile",
                children: m ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
                  /* @__PURE__ */ a.jsx("b", { children: d.homeGoals }),
                  /* @__PURE__ */ a.jsx("i", { children: "–" }),
                  /* @__PURE__ */ a.jsx("b", { children: d.awayGoals })
                ] }) : /* @__PURE__ */ a.jsx("em", { children: "–" })
              }
            ),
            /* @__PURE__ */ a.jsxs("div", { className: "lf-calendar-team lf-calendar-team--away", children: [
              /* @__PURE__ */ a.jsx("strong", { children: d.awayTeam }),
              d.awayTotal !== null && /* @__PURE__ */ a.jsx("span", { children: fu(d.awayTotal) })
            ] }),
            d.note && /* @__PURE__ */ a.jsx("p", { className: "lf-calendar-note", children: d.note })
          ]
        },
        `${u.fantasyMatchdayNumber}-${d.homeTeam}-${d.awayTeam}-${f}`
      );
    }) })
  ] }) });
}

function zp() {
  var v, h, w, x;
  const e = (v = window.LINEUP_FANTA) == null ? void 0 : v.league, t = ((h = e == null ? void 0 : e.leagueData) == null ? void 0 : h.calendarCsvUrl) ?? "", n = ((w = e == null ? void 0 : e.leagueData) == null ? void 0 : w.calendarExpectedMatches) ?? 4, r = ((x = e == null ? void 0 : e.leagueData) == null ? void 0 : x.calendarCompetitionLabel) ?? ((e == null ? void 0 : e.id) === "pd" ? "Liga" : "Premier League"), [l, i] = M.useState("loading"), [o, s] = M.useState([]), [u, c] = M.useState("");
  M.useEffect(() => {
    const S = new AbortController();
    async function O() {
      if (!t) {
        s([]), i("ready");
        return;
      }
      i("loading"), c("");
      try {
        const d = t.includes("?") ? "&" : "?", f = await fetch(
          `${t}${d}v=${Date.now()}`,
          { cache: "no-store", signal: S.signal }
        );
        if (!f.ok)
          throw new Error(`HTTP ${f.status}`);
        const m = await f.text(), g = Pp(m, n);
        s(g), i("ready");
      } catch (d) {
        if (S.signal.aborted)
          return;
        console.error("Calendar load error", d), c("Il Calendario non è disponibile. Controlla la fonte configurata e riprova."), i("error");
      }
    }
    return O(), () => S.abort();
  }, [t, n]);
  const p = M.useMemo(() => (e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.name) ?? "Lega", [e]);
  return l === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card lf-calendar-state", children: [
    /* @__PURE__ */ a.jsx("div", { className: "lf-spinner" }),
    /* @__PURE__ */ a.jsx("p", { children: "Caricamento del Calendario…" })
  ] }) }) : l === "error" ? /* @__PURE__ */ a.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ a.jsxs("section", { className: "lf-dashboard-card lf-calendar-state lf-calendar-state--error", children: [
    /* @__PURE__ */ a.jsx("strong", { children: "Errore nel caricamento" }),
    /* @__PURE__ */ a.jsx("p", { children: u })
  ] }) }) : /* @__PURE__ */ a.jsx(
    Tp,
    {
      competitionLabel: r,
      leagueName: p,
      matchdays: o,
      expectedMatches: n
    }
  );
}
const pu = document.getElementById("league-dashboard-root"), mu = document.getElementById("league-rose-root"), hu = document.getElementById("league-calendar-root");
pu && Fn.createRoot(pu).render(
  /* @__PURE__ */ a.jsx(no.StrictMode, { children: /* @__PURE__ */ a.jsx(yp, {}) })
);
mu && Fn.createRoot(mu).render(
  /* @__PURE__ */ a.jsx(no.StrictMode, { children: /* @__PURE__ */ a.jsx(_p, {}) })
);
hu && Fn.createRoot(hu).render(
  /* @__PURE__ */ a.jsx(no.StrictMode, { children: /* @__PURE__ */ a.jsx(zp, {}) })
);
