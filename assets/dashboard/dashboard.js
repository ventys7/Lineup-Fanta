function Bc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ca = { exports: {} }, ml = {}, Ea = { exports: {} }, M = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tr = Symbol.for("react.element"), Vc = Symbol.for("react.portal"), Hc = Symbol.for("react.fragment"), Qc = Symbol.for("react.strict_mode"), Wc = Symbol.for("react.profiler"), Gc = Symbol.for("react.provider"), Kc = Symbol.for("react.context"), Yc = Symbol.for("react.forward_ref"), Xc = Symbol.for("react.suspense"), qc = Symbol.for("react.memo"), Zc = Symbol.for("react.lazy"), bs = Symbol.iterator;
function Jc(e) {
  return e === null || typeof e != "object" ? null : (e = bs && e[bs] || e["@@iterator"], typeof e == "function" ? e : null);
}
var _a = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Pa = Object.assign, Ta = {};
function pn(e, t, n) {
  this.props = e, this.context = t, this.refs = Ta, this.updater = n || _a;
}
pn.prototype.isReactComponent = {};
pn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
pn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function za() {
}
za.prototype = pn.prototype;
function is(e, t, n) {
  this.props = e, this.context = t, this.refs = Ta, this.updater = n || _a;
}
var ss = is.prototype = new za();
ss.constructor = is;
Pa(ss, pn.prototype);
ss.isPureReactComponent = !0;
var eo = Array.isArray, La = Object.prototype.hasOwnProperty, os = { current: null }, Ra = { key: !0, ref: !0, __self: !0, __source: !0 };
function Fa(e, t, n) {
  var r, l = {}, i = null, s = null;
  if (t != null)
    for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (i = "" + t.key), t)
      La.call(t, r) && !Ra.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1)
    l.children = n;
  else if (1 < a) {
    for (var u = Array(a), c = 0; c < a; c++)
      u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps)
    for (r in a = e.defaultProps, a)
      l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: tr, type: e, key: i, ref: s, props: l, _owner: os.current };
}
function bc(e, t) {
  return { $$typeof: tr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function as(e) {
  return typeof e == "object" && e !== null && e.$$typeof === tr;
}
function ef(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var to = /\/+/g;
function Ml(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? ef("" + e.key) : t.toString(36);
}
function Tr(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var s = !1;
  if (e === null)
    s = !0;
  else
    switch (i) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case tr:
          case Vc:
            s = !0;
        }
    }
  if (s)
    return s = e, l = l(s), e = r === "" ? "." + Ml(s, 0) : r, eo(l) ? (n = "", e != null && (n = e.replace(to, "$&/") + "/"), Tr(l, t, n, "", function(c) {
      return c;
    })) : l != null && (as(l) && (l = bc(l, n + (!l.key || s && s.key === l.key ? "" : ("" + l.key).replace(to, "$&/") + "/") + e)), t.push(l)), 1;
  if (s = 0, r = r === "" ? "." : r + ":", eo(e))
    for (var a = 0; a < e.length; a++) {
      i = e[a];
      var u = r + Ml(i, a);
      s += Tr(i, t, n, u, l);
    }
  else if (u = Jc(e), typeof u == "function")
    for (e = u.call(e), a = 0; !(i = e.next()).done; )
      i = i.value, u = r + Ml(i, a++), s += Tr(i, t, n, u, l);
  else if (i === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function ur(e, t, n) {
  if (e == null)
    return e;
  var r = [], l = 0;
  return Tr(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function tf(e) {
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
var ue = { current: null }, zr = { transition: null }, nf = { ReactCurrentDispatcher: ue, ReactCurrentBatchConfig: zr, ReactCurrentOwner: os };
M.Children = { map: ur, forEach: function(e, t, n) {
  ur(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return ur(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return ur(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!as(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
M.Component = pn;
M.Fragment = Hc;
M.Profiler = Wc;
M.PureComponent = is;
M.StrictMode = Qc;
M.Suspense = Xc;
M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = nf;
M.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Pa({}, e.props), l = e.key, i = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, s = os.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps)
      var a = e.type.defaultProps;
    for (u in t)
      La.call(t, u) && !Ra.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1)
    r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var c = 0; c < u; c++)
      a[c] = arguments[c + 2];
    r.children = a;
  }
  return { $$typeof: tr, type: e.type, key: l, ref: i, props: r, _owner: s };
};
M.createContext = function(e) {
  return e = { $$typeof: Kc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Gc, _context: e }, e.Consumer = e;
};
M.createElement = Fa;
M.createFactory = function(e) {
  var t = Fa.bind(null, e);
  return t.type = e, t;
};
M.createRef = function() {
  return { current: null };
};
M.forwardRef = function(e) {
  return { $$typeof: Yc, render: e };
};
M.isValidElement = as;
M.lazy = function(e) {
  return { $$typeof: Zc, _payload: { _status: -1, _result: e }, _init: tf };
};
M.memo = function(e, t) {
  return { $$typeof: qc, type: e, compare: t === void 0 ? null : t };
};
M.startTransition = function(e) {
  var t = zr.transition;
  zr.transition = {};
  try {
    e();
  } finally {
    zr.transition = t;
  }
};
M.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
M.useCallback = function(e, t) {
  return ue.current.useCallback(e, t);
};
M.useContext = function(e) {
  return ue.current.useContext(e);
};
M.useDebugValue = function() {
};
M.useDeferredValue = function(e) {
  return ue.current.useDeferredValue(e);
};
M.useEffect = function(e, t) {
  return ue.current.useEffect(e, t);
};
M.useId = function() {
  return ue.current.useId();
};
M.useImperativeHandle = function(e, t, n) {
  return ue.current.useImperativeHandle(e, t, n);
};
M.useInsertionEffect = function(e, t) {
  return ue.current.useInsertionEffect(e, t);
};
M.useLayoutEffect = function(e, t) {
  return ue.current.useLayoutEffect(e, t);
};
M.useMemo = function(e, t) {
  return ue.current.useMemo(e, t);
};
M.useReducer = function(e, t, n) {
  return ue.current.useReducer(e, t, n);
};
M.useRef = function(e) {
  return ue.current.useRef(e);
};
M.useState = function(e) {
  return ue.current.useState(e);
};
M.useSyncExternalStore = function(e, t, n) {
  return ue.current.useSyncExternalStore(e, t, n);
};
M.useTransition = function() {
  return ue.current.useTransition();
};
M.version = "18.2.0";
Ea.exports = M;
var R = Ea.exports;
const hl = /* @__PURE__ */ Bc(R);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rf = R, lf = Symbol.for("react.element"), sf = Symbol.for("react.fragment"), of = Object.prototype.hasOwnProperty, af = rf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, uf = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ma(e, t, n) {
  var r, l = {}, i = null, s = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t)
    of.call(t, r) && !uf.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t)
      l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: lf, type: e, key: i, ref: s, props: l, _owner: af.current };
}
ml.Fragment = sf;
ml.jsx = Ma;
ml.jsxs = Ma;
Ca.exports = ml;
var o = Ca.exports, ln = {}, Da = { exports: {} }, Se = {}, Ia = { exports: {} }, Oa = {};
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
  function t(_, L) {
    var F = _.length;
    _.push(L);
    e:
      for (; 0 < F; ) {
        var W = F - 1 >>> 1, Z = _[W];
        if (0 < l(Z, L))
          _[W] = L, _[F] = Z, F = W;
        else
          break e;
      }
  }
  function n(_) {
    return _.length === 0 ? null : _[0];
  }
  function r(_) {
    if (_.length === 0)
      return null;
    var L = _[0], F = _.pop();
    if (F !== L) {
      _[0] = F;
      e:
        for (var W = 0, Z = _.length, or = Z >>> 1; W < or; ) {
          var St = 2 * (W + 1) - 1, Fl = _[St], kt = St + 1, ar = _[kt];
          if (0 > l(Fl, F))
            kt < Z && 0 > l(ar, Fl) ? (_[W] = ar, _[kt] = F, W = kt) : (_[W] = Fl, _[St] = F, W = St);
          else if (kt < Z && 0 > l(ar, F))
            _[W] = ar, _[kt] = F, W = kt;
          else
            break e;
        }
    }
    return L;
  }
  function l(_, L) {
    var F = _.sortIndex - L.sortIndex;
    return F !== 0 ? F : _.id - L.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var s = Date, a = s.now();
    e.unstable_now = function() {
      return s.now() - a;
    };
  }
  var u = [], c = [], d = 1, v = null, h = 3, w = !1, g = !1, x = !1, z = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(_) {
    for (var L = n(c); L !== null; ) {
      if (L.callback === null)
        r(c);
      else if (L.startTime <= _)
        r(c), L.sortIndex = L.expirationTime, t(u, L);
      else
        break;
      L = n(c);
    }
  }
  function y(_) {
    if (x = !1, m(_), !g)
      if (n(u) !== null)
        g = !0, Ll(k);
      else {
        var L = n(c);
        L !== null && Rl(y, L.startTime - _);
      }
  }
  function k(_, L) {
    g = !1, x && (x = !1, p(P), P = -1), w = !0;
    var F = h;
    try {
      for (m(L), v = n(u); v !== null && (!(v.expirationTime > L) || _ && !K()); ) {
        var W = v.callback;
        if (typeof W == "function") {
          v.callback = null, h = v.priorityLevel;
          var Z = W(v.expirationTime <= L);
          L = e.unstable_now(), typeof Z == "function" ? v.callback = Z : v === n(u) && r(u), m(L);
        } else
          r(u);
        v = n(u);
      }
      if (v !== null)
        var or = !0;
      else {
        var St = n(c);
        St !== null && Rl(y, St.startTime - L), or = !1;
      }
      return or;
    } finally {
      v = null, h = F, w = !1;
    }
  }
  var N = !1, E = null, P = -1, C = 5, T = -1;
  function K() {
    return !(e.unstable_now() - T < C);
  }
  function be() {
    if (E !== null) {
      var _ = e.unstable_now();
      T = _;
      var L = !0;
      try {
        L = E(!0, _);
      } finally {
        L ? et() : (N = !1, E = null);
      }
    } else
      N = !1;
  }
  var et;
  if (typeof f == "function")
    et = function() {
      f(be);
    };
  else if (typeof MessageChannel < "u") {
    var vn = new MessageChannel(), sr = vn.port2;
    vn.port1.onmessage = be, et = function() {
      sr.postMessage(null);
    };
  } else
    et = function() {
      z(be, 0);
    };
  function Ll(_) {
    E = _, N || (N = !0, et());
  }
  function Rl(_, L) {
    P = z(function() {
      _(e.unstable_now());
    }, L);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(_) {
    _.callback = null;
  }, e.unstable_continueExecution = function() {
    g || w || (g = !0, Ll(k));
  }, e.unstable_forceFrameRate = function(_) {
    0 > _ || 125 < _ ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : C = 0 < _ ? Math.floor(1e3 / _) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(_) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var L = 3;
        break;
      default:
        L = h;
    }
    var F = h;
    h = L;
    try {
      return _();
    } finally {
      h = F;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(_, L) {
    switch (_) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        _ = 3;
    }
    var F = h;
    h = _;
    try {
      return L();
    } finally {
      h = F;
    }
  }, e.unstable_scheduleCallback = function(_, L, F) {
    var W = e.unstable_now();
    switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? W + F : W) : F = W, _) {
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
    return Z = F + Z, _ = { id: d++, callback: L, priorityLevel: _, startTime: F, expirationTime: Z, sortIndex: -1 }, F > W ? (_.sortIndex = F, t(c, _), n(u) === null && _ === n(c) && (x ? (p(P), P = -1) : x = !0, Rl(y, F - W))) : (_.sortIndex = Z, t(u, _), g || w || (g = !0, Ll(k))), _;
  }, e.unstable_shouldYield = K, e.unstable_wrapCallback = function(_) {
    var L = h;
    return function() {
      var F = h;
      h = L;
      try {
        return _.apply(this, arguments);
      } finally {
        h = F;
      }
    };
  };
})(Oa);
Ia.exports = Oa;
var cf = Ia.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Aa = R, xe = cf;
function S(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var $a = /* @__PURE__ */ new Set(), An = {};
function It(e, t) {
  sn(e, t), sn(e + "Capture", t);
}
function sn(e, t) {
  for (An[e] = t, e = 0; e < t.length; e++)
    $a.add(t[e]);
}
var Ke = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ci = Object.prototype.hasOwnProperty, ff = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, no = {}, ro = {};
function df(e) {
  return ci.call(ro, e) ? !0 : ci.call(no, e) ? !1 : ff.test(e) ? ro[e] = !0 : (no[e] = !0, !1);
}
function pf(e, t, n, r) {
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
function mf(e, t, n, r) {
  if (t === null || typeof t > "u" || pf(e, t, n, r))
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
function ce(e, t, n, r, l, i, s) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = s;
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
var us = /[\-:]([a-z])/g;
function cs(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    us,
    cs
  );
  ne[t] = new ce(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(us, cs);
  ne[t] = new ce(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(us, cs);
  ne[t] = new ce(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ne[e] = new ce(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ne.xlinkHref = new ce("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ne[e] = new ce(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function fs(e, t, n, r) {
  var l = ne.hasOwnProperty(t) ? ne[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (mf(t, n, l, r) && (n = null), r || l === null ? df(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ze = Aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, cr = Symbol.for("react.element"), $t = Symbol.for("react.portal"), Ut = Symbol.for("react.fragment"), ds = Symbol.for("react.strict_mode"), fi = Symbol.for("react.profiler"), Ua = Symbol.for("react.provider"), Ba = Symbol.for("react.context"), ps = Symbol.for("react.forward_ref"), di = Symbol.for("react.suspense"), pi = Symbol.for("react.suspense_list"), ms = Symbol.for("react.memo"), nt = Symbol.for("react.lazy"), Va = Symbol.for("react.offscreen"), lo = Symbol.iterator;
function gn(e) {
  return e === null || typeof e != "object" ? null : (e = lo && e[lo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var H = Object.assign, Dl;
function Cn(e) {
  if (Dl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Dl = t && t[1] || "";
    }
  return `
` + Dl + e;
}
var Il = !1;
function Ol(e, t) {
  if (!e || Il)
    return "";
  Il = !0;
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
`), s = l.length - 1, a = i.length - 1; 1 <= s && 0 <= a && l[s] !== i[a]; )
        a--;
      for (; 1 <= s && 0 <= a; s--, a--)
        if (l[s] !== i[a]) {
          if (s !== 1 || a !== 1)
            do
              if (s--, a--, 0 > a || l[s] !== i[a]) {
                var u = `
` + l[s].replace(" at new ", " at ");
                return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
              }
            while (1 <= s && 0 <= a);
          break;
        }
    }
  } finally {
    Il = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Cn(e) : "";
}
function hf(e) {
  switch (e.tag) {
    case 5:
      return Cn(e.type);
    case 16:
      return Cn("Lazy");
    case 13:
      return Cn("Suspense");
    case 19:
      return Cn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ol(e.type, !1), e;
    case 11:
      return e = Ol(e.type.render, !1), e;
    case 1:
      return e = Ol(e.type, !0), e;
    default:
      return "";
  }
}
function mi(e) {
  if (e == null)
    return null;
  if (typeof e == "function")
    return e.displayName || e.name || null;
  if (typeof e == "string")
    return e;
  switch (e) {
    case Ut:
      return "Fragment";
    case $t:
      return "Portal";
    case fi:
      return "Profiler";
    case ds:
      return "StrictMode";
    case di:
      return "Suspense";
    case pi:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Ba:
        return (e.displayName || "Context") + ".Consumer";
      case Ua:
        return (e._context.displayName || "Context") + ".Provider";
      case ps:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case ms:
        return t = e.displayName || null, t !== null ? t : mi(e.type) || "Memo";
      case nt:
        t = e._payload, e = e._init;
        try {
          return mi(e(t));
        } catch {
        }
    }
  return null;
}
function vf(e) {
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
      return mi(t);
    case 8:
      return t === ds ? "StrictMode" : "Mode";
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
function vt(e) {
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
function Ha(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function gf(e) {
  var t = Ha(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(s) {
      r = "" + s, i.call(this, s);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(s) {
      r = "" + s;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function fr(e) {
  e._valueTracker || (e._valueTracker = gf(e));
}
function Qa(e) {
  if (!e)
    return !1;
  var t = e._valueTracker;
  if (!t)
    return !0;
  var n = t.getValue(), r = "";
  return e && (r = Ha(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Vr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function hi(e, t) {
  var n = t.checked;
  return H({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function io(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = vt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Wa(e, t) {
  t = t.checked, t != null && fs(e, "checked", t, !1);
}
function vi(e, t) {
  Wa(e, t);
  var n = vt(t.value), r = t.type;
  if (n != null)
    r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? gi(e, t.type, n) : t.hasOwnProperty("defaultValue") && gi(e, t.type, vt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function so(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
      return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function gi(e, t, n) {
  (t !== "number" || Vr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var En = Array.isArray;
function Zt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++)
      t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + vt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function yi(e, t) {
  if (t.dangerouslySetInnerHTML != null)
    throw Error(S(91));
  return H({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function oo(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null)
        throw Error(S(92));
      if (En(n)) {
        if (1 < n.length)
          throw Error(S(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: vt(n) };
}
function Ga(e, t) {
  var n = vt(t.value), r = vt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ao(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ka(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function wi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ka(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var dr, Ya = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
    e.innerHTML = t;
  else {
    for (dr = dr || document.createElement("div"), dr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = dr.firstChild; e.firstChild; )
      e.removeChild(e.firstChild);
    for (; t.firstChild; )
      e.appendChild(t.firstChild);
  }
});
function $n(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Tn = {
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
}, yf = ["Webkit", "ms", "Moz", "O"];
Object.keys(Tn).forEach(function(e) {
  yf.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Tn[t] = Tn[e];
  });
});
function Xa(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Tn.hasOwnProperty(e) && Tn[e] ? ("" + t).trim() : t + "px";
}
function qa(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, l = Xa(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
}
var wf = H({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function xi(e, t) {
  if (t) {
    if (wf[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(S(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null)
        throw Error(S(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
        throw Error(S(61));
    }
    if (t.style != null && typeof t.style != "object")
      throw Error(S(62));
  }
}
function Si(e, t) {
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
var ki = null;
function hs(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Ni = null, Jt = null, bt = null;
function uo(e) {
  if (e = lr(e)) {
    if (typeof Ni != "function")
      throw Error(S(280));
    var t = e.stateNode;
    t && (t = xl(t), Ni(e.stateNode, e.type, t));
  }
}
function Za(e) {
  Jt ? bt ? bt.push(e) : bt = [e] : Jt = e;
}
function Ja() {
  if (Jt) {
    var e = Jt, t = bt;
    if (bt = Jt = null, uo(e), t)
      for (e = 0; e < t.length; e++)
        uo(t[e]);
  }
}
function ba(e, t) {
  return e(t);
}
function eu() {
}
var Al = !1;
function tu(e, t, n) {
  if (Al)
    return e(t, n);
  Al = !0;
  try {
    return ba(e, t, n);
  } finally {
    Al = !1, (Jt !== null || bt !== null) && (eu(), Ja());
  }
}
function Un(e, t) {
  var n = e.stateNode;
  if (n === null)
    return null;
  var r = xl(n);
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
    throw Error(S(231, t, typeof n));
  return n;
}
var ji = !1;
if (Ke)
  try {
    var yn = {};
    Object.defineProperty(yn, "passive", { get: function() {
      ji = !0;
    } }), window.addEventListener("test", yn, yn), window.removeEventListener("test", yn, yn);
  } catch {
    ji = !1;
  }
function xf(e, t, n, r, l, i, s, a, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (d) {
    this.onError(d);
  }
}
var zn = !1, Hr = null, Qr = !1, Ci = null, Sf = { onError: function(e) {
  zn = !0, Hr = e;
} };
function kf(e, t, n, r, l, i, s, a, u) {
  zn = !1, Hr = null, xf.apply(Sf, arguments);
}
function Nf(e, t, n, r, l, i, s, a, u) {
  if (kf.apply(this, arguments), zn) {
    if (zn) {
      var c = Hr;
      zn = !1, Hr = null;
    } else
      throw Error(S(198));
    Qr || (Qr = !0, Ci = c);
  }
}
function Ot(e) {
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
function nu(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
      return t.dehydrated;
  }
  return null;
}
function co(e) {
  if (Ot(e) !== e)
    throw Error(S(188));
}
function jf(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Ot(e), t === null)
      throw Error(S(188));
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
          return co(l), e;
        if (i === r)
          return co(l), t;
        i = i.sibling;
      }
      throw Error(S(188));
    }
    if (n.return !== r.return)
      n = l, r = i;
    else {
      for (var s = !1, a = l.child; a; ) {
        if (a === n) {
          s = !0, n = l, r = i;
          break;
        }
        if (a === r) {
          s = !0, r = l, n = i;
          break;
        }
        a = a.sibling;
      }
      if (!s) {
        for (a = i.child; a; ) {
          if (a === n) {
            s = !0, n = i, r = l;
            break;
          }
          if (a === r) {
            s = !0, r = i, n = l;
            break;
          }
          a = a.sibling;
        }
        if (!s)
          throw Error(S(189));
      }
    }
    if (n.alternate !== r)
      throw Error(S(190));
  }
  if (n.tag !== 3)
    throw Error(S(188));
  return n.stateNode.current === n ? e : t;
}
function ru(e) {
  return e = jf(e), e !== null ? lu(e) : null;
}
function lu(e) {
  if (e.tag === 5 || e.tag === 6)
    return e;
  for (e = e.child; e !== null; ) {
    var t = lu(e);
    if (t !== null)
      return t;
    e = e.sibling;
  }
  return null;
}
var iu = xe.unstable_scheduleCallback, fo = xe.unstable_cancelCallback, Cf = xe.unstable_shouldYield, Ef = xe.unstable_requestPaint, G = xe.unstable_now, _f = xe.unstable_getCurrentPriorityLevel, vs = xe.unstable_ImmediatePriority, su = xe.unstable_UserBlockingPriority, Wr = xe.unstable_NormalPriority, Pf = xe.unstable_LowPriority, ou = xe.unstable_IdlePriority, vl = null, $e = null;
function Tf(e) {
  if ($e && typeof $e.onCommitFiberRoot == "function")
    try {
      $e.onCommitFiberRoot(vl, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
}
var Fe = Math.clz32 ? Math.clz32 : Rf, zf = Math.log, Lf = Math.LN2;
function Rf(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (zf(e) / Lf | 0) | 0;
}
var pr = 64, mr = 4194304;
function _n(e) {
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
function Gr(e, t) {
  var n = e.pendingLanes;
  if (n === 0)
    return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var a = s & ~l;
    a !== 0 ? r = _n(a) : (i &= s, i !== 0 && (r = _n(i)));
  } else
    s = n & ~l, s !== 0 ? r = _n(s) : i !== 0 && (r = _n(i));
  if (r === 0)
    return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0))
    return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
    for (e = e.entanglements, t &= r; 0 < t; )
      n = 31 - Fe(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Ff(e, t) {
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
function Mf(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var s = 31 - Fe(i), a = 1 << s, u = l[s];
    u === -1 ? (!(a & n) || a & r) && (l[s] = Ff(a, t)) : u <= t && (e.expiredLanes |= a), i &= ~a;
  }
}
function Ei(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function au() {
  var e = pr;
  return pr <<= 1, !(pr & 4194240) && (pr = 64), e;
}
function $l(e) {
  for (var t = [], n = 0; 31 > n; n++)
    t.push(e);
  return t;
}
function nr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Fe(t), e[t] = n;
}
function Df(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Fe(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function gs(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Fe(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var I = 0;
function uu(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var cu, ys, fu, du, pu, _i = !1, hr = [], at = null, ut = null, ct = null, Bn = /* @__PURE__ */ new Map(), Vn = /* @__PURE__ */ new Map(), lt = [], If = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function po(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      at = null;
      break;
    case "dragenter":
    case "dragleave":
      ut = null;
      break;
    case "mouseover":
    case "mouseout":
      ct = null;
      break;
    case "pointerover":
    case "pointerout":
      Bn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Vn.delete(t.pointerId);
  }
}
function wn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = lr(t), t !== null && ys(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Of(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return at = wn(at, e, t, n, r, l), !0;
    case "dragenter":
      return ut = wn(ut, e, t, n, r, l), !0;
    case "mouseover":
      return ct = wn(ct, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Bn.set(i, wn(Bn.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Vn.set(i, wn(Vn.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function mu(e) {
  var t = Et(e.target);
  if (t !== null) {
    var n = Ot(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = nu(n), t !== null) {
          e.blockedOn = t, pu(e.priority, function() {
            fu(n);
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
function Lr(e) {
  if (e.blockedOn !== null)
    return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Pi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ki = r, n.target.dispatchEvent(r), ki = null;
    } else
      return t = lr(n), t !== null && ys(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function mo(e, t, n) {
  Lr(e) && n.delete(t);
}
function Af() {
  _i = !1, at !== null && Lr(at) && (at = null), ut !== null && Lr(ut) && (ut = null), ct !== null && Lr(ct) && (ct = null), Bn.forEach(mo), Vn.forEach(mo);
}
function xn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, _i || (_i = !0, xe.unstable_scheduleCallback(xe.unstable_NormalPriority, Af)));
}
function Hn(e) {
  function t(l) {
    return xn(l, e);
  }
  if (0 < hr.length) {
    xn(hr[0], e);
    for (var n = 1; n < hr.length; n++) {
      var r = hr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (at !== null && xn(at, e), ut !== null && xn(ut, e), ct !== null && xn(ct, e), Bn.forEach(t), Vn.forEach(t), n = 0; n < lt.length; n++)
    r = lt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < lt.length && (n = lt[0], n.blockedOn === null); )
    mu(n), n.blockedOn === null && lt.shift();
}
var en = Ze.ReactCurrentBatchConfig, Kr = !0;
function $f(e, t, n, r) {
  var l = I, i = en.transition;
  en.transition = null;
  try {
    I = 1, ws(e, t, n, r);
  } finally {
    I = l, en.transition = i;
  }
}
function Uf(e, t, n, r) {
  var l = I, i = en.transition;
  en.transition = null;
  try {
    I = 4, ws(e, t, n, r);
  } finally {
    I = l, en.transition = i;
  }
}
function ws(e, t, n, r) {
  if (Kr) {
    var l = Pi(e, t, n, r);
    if (l === null)
      Xl(e, t, r, Yr, n), po(e, r);
    else if (Of(l, e, t, n, r))
      r.stopPropagation();
    else if (po(e, r), t & 4 && -1 < If.indexOf(e)) {
      for (; l !== null; ) {
        var i = lr(l);
        if (i !== null && cu(i), i = Pi(e, t, n, r), i === null && Xl(e, t, r, Yr, n), i === l)
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else
      Xl(e, t, r, null, n);
  }
}
var Yr = null;
function Pi(e, t, n, r) {
  if (Yr = null, e = hs(r), e = Et(e), e !== null)
    if (t = Ot(e), t === null)
      e = null;
    else if (n = t.tag, n === 13) {
      if (e = nu(t), e !== null)
        return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else
      t !== e && (e = null);
  return Yr = e, null;
}
function hu(e) {
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
      switch (_f()) {
        case vs:
          return 1;
        case su:
          return 4;
        case Wr:
        case Pf:
          return 16;
        case ou:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var st = null, xs = null, Rr = null;
function vu() {
  if (Rr)
    return Rr;
  var e, t = xs, n = t.length, r, l = "value" in st ? st.value : st.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++)
    ;
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === l[i - r]; r++)
    ;
  return Rr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Fr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function vr() {
  return !0;
}
function ho() {
  return !1;
}
function ke(e) {
  function t(n, r, l, i, s) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = s, this.currentTarget = null;
    for (var a in e)
      e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? vr : ho, this.isPropagationStopped = ho, this;
  }
  return H(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = vr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = vr);
  }, persist: function() {
  }, isPersistent: vr }), t;
}
var mn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Ss = ke(mn), rr = H({}, mn, { view: 0, detail: 0 }), Bf = ke(rr), Ul, Bl, Sn, gl = H({}, rr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ks, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Sn && (Sn && e.type === "mousemove" ? (Ul = e.screenX - Sn.screenX, Bl = e.screenY - Sn.screenY) : Bl = Ul = 0, Sn = e), Ul);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Bl;
} }), vo = ke(gl), Vf = H({}, gl, { dataTransfer: 0 }), Hf = ke(Vf), Qf = H({}, rr, { relatedTarget: 0 }), Vl = ke(Qf), Wf = H({}, mn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Gf = ke(Wf), Kf = H({}, mn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Yf = ke(Kf), Xf = H({}, mn, { data: 0 }), go = ke(Xf), qf = {
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
}, Zf = {
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
}, Jf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function bf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Jf[e]) ? !!t[e] : !1;
}
function ks() {
  return bf;
}
var ed = H({}, rr, { key: function(e) {
  if (e.key) {
    var t = qf[e.key] || e.key;
    if (t !== "Unidentified")
      return t;
  }
  return e.type === "keypress" ? (e = Fr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Zf[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ks, charCode: function(e) {
  return e.type === "keypress" ? Fr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Fr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), td = ke(ed), nd = H({}, gl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), yo = ke(nd), rd = H({}, rr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ks }), ld = ke(rd), id = H({}, mn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), sd = ke(id), od = H({}, gl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), ad = ke(od), ud = [9, 13, 27, 32], Ns = Ke && "CompositionEvent" in window, Ln = null;
Ke && "documentMode" in document && (Ln = document.documentMode);
var cd = Ke && "TextEvent" in window && !Ln, gu = Ke && (!Ns || Ln && 8 < Ln && 11 >= Ln), wo = " ", xo = !1;
function yu(e, t) {
  switch (e) {
    case "keyup":
      return ud.indexOf(t.keyCode) !== -1;
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
function wu(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Bt = !1;
function fd(e, t) {
  switch (e) {
    case "compositionend":
      return wu(t);
    case "keypress":
      return t.which !== 32 ? null : (xo = !0, wo);
    case "textInput":
      return e = t.data, e === wo && xo ? null : e;
    default:
      return null;
  }
}
function dd(e, t) {
  if (Bt)
    return e === "compositionend" || !Ns && yu(e, t) ? (e = vu(), Rr = xs = st = null, Bt = !1, e) : null;
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
      return gu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var pd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function So(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!pd[e.type] : t === "textarea";
}
function xu(e, t, n, r) {
  Za(r), t = Xr(t, "onChange"), 0 < t.length && (n = new Ss("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Rn = null, Qn = null;
function md(e) {
  Lu(e, 0);
}
function yl(e) {
  var t = Qt(e);
  if (Qa(t))
    return e;
}
function hd(e, t) {
  if (e === "change")
    return t;
}
var Su = !1;
if (Ke) {
  var Hl;
  if (Ke) {
    var Ql = "oninput" in document;
    if (!Ql) {
      var ko = document.createElement("div");
      ko.setAttribute("oninput", "return;"), Ql = typeof ko.oninput == "function";
    }
    Hl = Ql;
  } else
    Hl = !1;
  Su = Hl && (!document.documentMode || 9 < document.documentMode);
}
function No() {
  Rn && (Rn.detachEvent("onpropertychange", ku), Qn = Rn = null);
}
function ku(e) {
  if (e.propertyName === "value" && yl(Qn)) {
    var t = [];
    xu(t, Qn, e, hs(e)), tu(md, t);
  }
}
function vd(e, t, n) {
  e === "focusin" ? (No(), Rn = t, Qn = n, Rn.attachEvent("onpropertychange", ku)) : e === "focusout" && No();
}
function gd(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return yl(Qn);
}
function yd(e, t) {
  if (e === "click")
    return yl(t);
}
function wd(e, t) {
  if (e === "input" || e === "change")
    return yl(t);
}
function xd(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var De = typeof Object.is == "function" ? Object.is : xd;
function Wn(e, t) {
  if (De(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ci.call(t, l) || !De(e[l], t[l]))
      return !1;
  }
  return !0;
}
function jo(e) {
  for (; e && e.firstChild; )
    e = e.firstChild;
  return e;
}
function Co(e, t) {
  var n = jo(e);
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
    n = jo(n);
  }
}
function Nu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Nu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function ju() {
  for (var e = window, t = Vr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n)
      e = t.contentWindow;
    else
      break;
    t = Vr(e.document);
  }
  return t;
}
function js(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Sd(e) {
  var t = ju(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Nu(n.ownerDocument.documentElement, n)) {
    if (r !== null && js(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
        n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = Co(n, i);
        var s = Co(
          n,
          r
        );
        l && s && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; )
      e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var kd = Ke && "documentMode" in document && 11 >= document.documentMode, Vt = null, Ti = null, Fn = null, zi = !1;
function Eo(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  zi || Vt == null || Vt !== Vr(r) || (r = Vt, "selectionStart" in r && js(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Fn && Wn(Fn, r) || (Fn = r, r = Xr(Ti, "onSelect"), 0 < r.length && (t = new Ss("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Vt)));
}
function gr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Ht = { animationend: gr("Animation", "AnimationEnd"), animationiteration: gr("Animation", "AnimationIteration"), animationstart: gr("Animation", "AnimationStart"), transitionend: gr("Transition", "TransitionEnd") }, Wl = {}, Cu = {};
Ke && (Cu = document.createElement("div").style, "AnimationEvent" in window || (delete Ht.animationend.animation, delete Ht.animationiteration.animation, delete Ht.animationstart.animation), "TransitionEvent" in window || delete Ht.transitionend.transition);
function wl(e) {
  if (Wl[e])
    return Wl[e];
  if (!Ht[e])
    return e;
  var t = Ht[e], n;
  for (n in t)
    if (t.hasOwnProperty(n) && n in Cu)
      return Wl[e] = t[n];
  return e;
}
var Eu = wl("animationend"), _u = wl("animationiteration"), Pu = wl("animationstart"), Tu = wl("transitionend"), zu = /* @__PURE__ */ new Map(), _o = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function yt(e, t) {
  zu.set(e, t), It(t, [e]);
}
for (var Gl = 0; Gl < _o.length; Gl++) {
  var Kl = _o[Gl], Nd = Kl.toLowerCase(), jd = Kl[0].toUpperCase() + Kl.slice(1);
  yt(Nd, "on" + jd);
}
yt(Eu, "onAnimationEnd");
yt(_u, "onAnimationIteration");
yt(Pu, "onAnimationStart");
yt("dblclick", "onDoubleClick");
yt("focusin", "onFocus");
yt("focusout", "onBlur");
yt(Tu, "onTransitionEnd");
sn("onMouseEnter", ["mouseout", "mouseover"]);
sn("onMouseLeave", ["mouseout", "mouseover"]);
sn("onPointerEnter", ["pointerout", "pointerover"]);
sn("onPointerLeave", ["pointerout", "pointerover"]);
It("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
It("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
It("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
It("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
It("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
It("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Pn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Cd = new Set("cancel close invalid load scroll toggle".split(" ").concat(Pn));
function Po(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Nf(r, t, void 0, e), e.currentTarget = null;
}
function Lu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var a = r[s], u = a.instance, c = a.currentTarget;
          if (a = a.listener, u !== i && l.isPropagationStopped())
            break e;
          Po(l, a, c), i = u;
        }
      else
        for (s = 0; s < r.length; s++) {
          if (a = r[s], u = a.instance, c = a.currentTarget, a = a.listener, u !== i && l.isPropagationStopped())
            break e;
          Po(l, a, c), i = u;
        }
    }
  }
  if (Qr)
    throw e = Ci, Qr = !1, Ci = null, e;
}
function A(e, t) {
  var n = t[Di];
  n === void 0 && (n = t[Di] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Ru(t, e, 2, !1), n.add(r));
}
function Yl(e, t, n) {
  var r = 0;
  t && (r |= 4), Ru(n, e, r, t);
}
var yr = "_reactListening" + Math.random().toString(36).slice(2);
function Gn(e) {
  if (!e[yr]) {
    e[yr] = !0, $a.forEach(function(n) {
      n !== "selectionchange" && (Cd.has(n) || Yl(n, !1, e), Yl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[yr] || (t[yr] = !0, Yl("selectionchange", !1, t));
  }
}
function Ru(e, t, n, r) {
  switch (hu(t)) {
    case 1:
      var l = $f;
      break;
    case 4:
      l = Uf;
      break;
    default:
      l = ws;
  }
  n = l.bind(null, t, n, e), l = void 0, !ji || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Xl(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e:
      for (; ; ) {
        if (r === null)
          return;
        var s = r.tag;
        if (s === 3 || s === 4) {
          var a = r.stateNode.containerInfo;
          if (a === l || a.nodeType === 8 && a.parentNode === l)
            break;
          if (s === 4)
            for (s = r.return; s !== null; ) {
              var u = s.tag;
              if ((u === 3 || u === 4) && (u = s.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l))
                return;
              s = s.return;
            }
          for (; a !== null; ) {
            if (s = Et(a), s === null)
              return;
            if (u = s.tag, u === 5 || u === 6) {
              r = i = s;
              continue e;
            }
            a = a.parentNode;
          }
        }
        r = r.return;
      }
  tu(function() {
    var c = i, d = hs(n), v = [];
    e: {
      var h = zu.get(e);
      if (h !== void 0) {
        var w = Ss, g = e;
        switch (e) {
          case "keypress":
            if (Fr(n) === 0)
              break e;
          case "keydown":
          case "keyup":
            w = td;
            break;
          case "focusin":
            g = "focus", w = Vl;
            break;
          case "focusout":
            g = "blur", w = Vl;
            break;
          case "beforeblur":
          case "afterblur":
            w = Vl;
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
            w = vo;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = Hf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = ld;
            break;
          case Eu:
          case _u:
          case Pu:
            w = Gf;
            break;
          case Tu:
            w = sd;
            break;
          case "scroll":
            w = Bf;
            break;
          case "wheel":
            w = ad;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = Yf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = yo;
        }
        var x = (t & 4) !== 0, z = !x && e === "scroll", p = x ? h !== null ? h + "Capture" : null : h;
        x = [];
        for (var f = c, m; f !== null; ) {
          m = f;
          var y = m.stateNode;
          if (m.tag === 5 && y !== null && (m = y, p !== null && (y = Un(f, p), y != null && x.push(Kn(f, y, m)))), z)
            break;
          f = f.return;
        }
        0 < x.length && (h = new w(h, g, null, n, d), v.push({ event: h, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", h && n !== ki && (g = n.relatedTarget || n.fromElement) && (Et(g) || g[Ye]))
          break e;
        if ((w || h) && (h = d.window === d ? d : (h = d.ownerDocument) ? h.defaultView || h.parentWindow : window, w ? (g = n.relatedTarget || n.toElement, w = c, g = g ? Et(g) : null, g !== null && (z = Ot(g), g !== z || g.tag !== 5 && g.tag !== 6) && (g = null)) : (w = null, g = c), w !== g)) {
          if (x = vo, y = "onMouseLeave", p = "onMouseEnter", f = "mouse", (e === "pointerout" || e === "pointerover") && (x = yo, y = "onPointerLeave", p = "onPointerEnter", f = "pointer"), z = w == null ? h : Qt(w), m = g == null ? h : Qt(g), h = new x(y, f + "leave", w, n, d), h.target = z, h.relatedTarget = m, y = null, Et(d) === c && (x = new x(p, f + "enter", g, n, d), x.target = m, x.relatedTarget = z, y = x), z = y, w && g)
            t: {
              for (x = w, p = g, f = 0, m = x; m; m = At(m))
                f++;
              for (m = 0, y = p; y; y = At(y))
                m++;
              for (; 0 < f - m; )
                x = At(x), f--;
              for (; 0 < m - f; )
                p = At(p), m--;
              for (; f--; ) {
                if (x === p || p !== null && x === p.alternate)
                  break t;
                x = At(x), p = At(p);
              }
              x = null;
            }
          else
            x = null;
          w !== null && To(v, h, w, x, !1), g !== null && z !== null && To(v, z, g, x, !0);
        }
      }
      e: {
        if (h = c ? Qt(c) : window, w = h.nodeName && h.nodeName.toLowerCase(), w === "select" || w === "input" && h.type === "file")
          var k = hd;
        else if (So(h))
          if (Su)
            k = wd;
          else {
            k = gd;
            var N = vd;
          }
        else
          (w = h.nodeName) && w.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (k = yd);
        if (k && (k = k(e, c))) {
          xu(v, k, n, d);
          break e;
        }
        N && N(e, h, c), e === "focusout" && (N = h._wrapperState) && N.controlled && h.type === "number" && gi(h, "number", h.value);
      }
      switch (N = c ? Qt(c) : window, e) {
        case "focusin":
          (So(N) || N.contentEditable === "true") && (Vt = N, Ti = c, Fn = null);
          break;
        case "focusout":
          Fn = Ti = Vt = null;
          break;
        case "mousedown":
          zi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          zi = !1, Eo(v, n, d);
          break;
        case "selectionchange":
          if (kd)
            break;
        case "keydown":
        case "keyup":
          Eo(v, n, d);
      }
      var E;
      if (Ns)
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
        Bt ? yu(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P && (gu && n.locale !== "ko" && (Bt || P !== "onCompositionStart" ? P === "onCompositionEnd" && Bt && (E = vu()) : (st = d, xs = "value" in st ? st.value : st.textContent, Bt = !0)), N = Xr(c, P), 0 < N.length && (P = new go(P, e, null, n, d), v.push({ event: P, listeners: N }), E ? P.data = E : (E = wu(n), E !== null && (P.data = E)))), (E = cd ? fd(e, n) : dd(e, n)) && (c = Xr(c, "onBeforeInput"), 0 < c.length && (d = new go("onBeforeInput", "beforeinput", null, n, d), v.push({ event: d, listeners: c }), d.data = E));
    }
    Lu(v, t);
  });
}
function Kn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Xr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Un(e, n), i != null && r.unshift(Kn(e, i, l)), i = Un(e, t), i != null && r.push(Kn(e, i, l))), e = e.return;
  }
  return r;
}
function At(e) {
  if (e === null)
    return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function To(e, t, n, r, l) {
  for (var i = t._reactName, s = []; n !== null && n !== r; ) {
    var a = n, u = a.alternate, c = a.stateNode;
    if (u !== null && u === r)
      break;
    a.tag === 5 && c !== null && (a = c, l ? (u = Un(n, i), u != null && s.unshift(Kn(n, u, a))) : l || (u = Un(n, i), u != null && s.push(Kn(n, u, a)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var Ed = /\r\n?/g, _d = /\u0000|\uFFFD/g;
function zo(e) {
  return (typeof e == "string" ? e : "" + e).replace(Ed, `
`).replace(_d, "");
}
function wr(e, t, n) {
  if (t = zo(t), zo(e) !== t && n)
    throw Error(S(425));
}
function qr() {
}
var Li = null, Ri = null;
function Fi(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Mi = typeof setTimeout == "function" ? setTimeout : void 0, Pd = typeof clearTimeout == "function" ? clearTimeout : void 0, Lo = typeof Promise == "function" ? Promise : void 0, Td = typeof queueMicrotask == "function" ? queueMicrotask : typeof Lo < "u" ? function(e) {
  return Lo.resolve(null).then(e).catch(zd);
} : Mi;
function zd(e) {
  setTimeout(function() {
    throw e;
  });
}
function ql(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8)
      if (n = l.data, n === "/$") {
        if (r === 0) {
          e.removeChild(l), Hn(t);
          return;
        }
        r--;
      } else
        n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Hn(t);
}
function ft(e) {
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
function Ro(e) {
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
var hn = Math.random().toString(36).slice(2), Ae = "__reactFiber$" + hn, Yn = "__reactProps$" + hn, Ye = "__reactContainer$" + hn, Di = "__reactEvents$" + hn, Ld = "__reactListeners$" + hn, Rd = "__reactHandles$" + hn;
function Et(e) {
  var t = e[Ae];
  if (t)
    return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ye] || n[Ae]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
        for (e = Ro(e); e !== null; ) {
          if (n = e[Ae])
            return n;
          e = Ro(e);
        }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function lr(e) {
  return e = e[Ae] || e[Ye], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Qt(e) {
  if (e.tag === 5 || e.tag === 6)
    return e.stateNode;
  throw Error(S(33));
}
function xl(e) {
  return e[Yn] || null;
}
var Ii = [], Wt = -1;
function wt(e) {
  return { current: e };
}
function $(e) {
  0 > Wt || (e.current = Ii[Wt], Ii[Wt] = null, Wt--);
}
function O(e, t) {
  Wt++, Ii[Wt] = e.current, e.current = t;
}
var gt = {}, se = wt(gt), me = wt(!1), Lt = gt;
function on(e, t) {
  var n = e.type.contextTypes;
  if (!n)
    return gt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n)
    l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function he(e) {
  return e = e.childContextTypes, e != null;
}
function Zr() {
  $(me), $(se);
}
function Fo(e, t, n) {
  if (se.current !== gt)
    throw Error(S(168));
  O(se, t), O(me, n);
}
function Fu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function")
    return n;
  r = r.getChildContext();
  for (var l in r)
    if (!(l in t))
      throw Error(S(108, vf(e) || "Unknown", l));
  return H({}, n, r);
}
function Jr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || gt, Lt = se.current, O(se, e), O(me, me.current), !0;
}
function Mo(e, t, n) {
  var r = e.stateNode;
  if (!r)
    throw Error(S(169));
  n ? (e = Fu(e, t, Lt), r.__reactInternalMemoizedMergedChildContext = e, $(me), $(se), O(se, e)) : $(me), O(me, n);
}
var Ve = null, Sl = !1, Zl = !1;
function Mu(e) {
  Ve === null ? Ve = [e] : Ve.push(e);
}
function Fd(e) {
  Sl = !0, Mu(e);
}
function xt() {
  if (!Zl && Ve !== null) {
    Zl = !0;
    var e = 0, t = I;
    try {
      var n = Ve;
      for (I = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ve = null, Sl = !1;
    } catch (l) {
      throw Ve !== null && (Ve = Ve.slice(e + 1)), iu(vs, xt), l;
    } finally {
      I = t, Zl = !1;
    }
  }
  return null;
}
var Gt = [], Kt = 0, br = null, el = 0, Ne = [], je = 0, Rt = null, Qe = 1, We = "";
function jt(e, t) {
  Gt[Kt++] = el, Gt[Kt++] = br, br = e, el = t;
}
function Du(e, t, n) {
  Ne[je++] = Qe, Ne[je++] = We, Ne[je++] = Rt, Rt = e;
  var r = Qe;
  e = We;
  var l = 32 - Fe(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Fe(t) + l;
  if (30 < i) {
    var s = l - l % 5;
    i = (r & (1 << s) - 1).toString(32), r >>= s, l -= s, Qe = 1 << 32 - Fe(t) + l | n << l | r, We = i + e;
  } else
    Qe = 1 << i | n << l | r, We = e;
}
function Cs(e) {
  e.return !== null && (jt(e, 1), Du(e, 1, 0));
}
function Es(e) {
  for (; e === br; )
    br = Gt[--Kt], Gt[Kt] = null, el = Gt[--Kt], Gt[Kt] = null;
  for (; e === Rt; )
    Rt = Ne[--je], Ne[je] = null, We = Ne[--je], Ne[je] = null, Qe = Ne[--je], Ne[je] = null;
}
var we = null, ye = null, U = !1, Re = null;
function Iu(e, t) {
  var n = Ce(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Do(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, we = e, ye = ft(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, we = e, ye = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Rt !== null ? { id: Qe, overflow: We } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ce(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, we = e, ye = null, !0) : !1;
    default:
      return !1;
  }
}
function Oi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ai(e) {
  if (U) {
    var t = ye;
    if (t) {
      var n = t;
      if (!Do(e, t)) {
        if (Oi(e))
          throw Error(S(418));
        t = ft(n.nextSibling);
        var r = we;
        t && Do(e, t) ? Iu(r, n) : (e.flags = e.flags & -4097 | 2, U = !1, we = e);
      }
    } else {
      if (Oi(e))
        throw Error(S(418));
      e.flags = e.flags & -4097 | 2, U = !1, we = e;
    }
  }
}
function Io(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  we = e;
}
function xr(e) {
  if (e !== we)
    return !1;
  if (!U)
    return Io(e), U = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Fi(e.type, e.memoizedProps)), t && (t = ye)) {
    if (Oi(e))
      throw Ou(), Error(S(418));
    for (; t; )
      Iu(e, t), t = ft(t.nextSibling);
  }
  if (Io(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
      throw Error(S(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ye = ft(e.nextSibling);
              break e;
            }
            t--;
          } else
            n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      ye = null;
    }
  } else
    ye = we ? ft(e.stateNode.nextSibling) : null;
  return !0;
}
function Ou() {
  for (var e = ye; e; )
    e = ft(e.nextSibling);
}
function an() {
  ye = we = null, U = !1;
}
function _s(e) {
  Re === null ? Re = [e] : Re.push(e);
}
var Md = Ze.ReactCurrentBatchConfig;
function ze(e, t) {
  if (e && e.defaultProps) {
    t = H({}, t), e = e.defaultProps;
    for (var n in e)
      t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var tl = wt(null), nl = null, Yt = null, Ps = null;
function Ts() {
  Ps = Yt = nl = null;
}
function zs(e) {
  var t = tl.current;
  $(tl), e._currentValue = t;
}
function $i(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
      break;
    e = e.return;
  }
}
function tn(e, t) {
  nl = e, Ps = Yt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (pe = !0), e.firstContext = null);
}
function _e(e) {
  var t = e._currentValue;
  if (Ps !== e)
    if (e = { context: e, memoizedValue: t, next: null }, Yt === null) {
      if (nl === null)
        throw Error(S(308));
      Yt = e, nl.dependencies = { lanes: 0, firstContext: e };
    } else
      Yt = Yt.next = e;
  return t;
}
var _t = null;
function Ls(e) {
  _t === null ? _t = [e] : _t.push(e);
}
function Au(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Ls(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Xe(e, r);
}
function Xe(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var rt = !1;
function Rs(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function $u(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ge(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function dt(e, t, n) {
  var r = e.updateQueue;
  if (r === null)
    return null;
  if (r = r.shared, D & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Xe(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Ls(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Xe(e, n);
}
function Mr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, gs(e, n);
  }
}
function Oo(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var s = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? l = i = s : i = i.next = s, n = n.next;
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t;
    } else
      l = i = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function rl(e, t, n, r) {
  var l = e.updateQueue;
  rt = !1;
  var i = l.firstBaseUpdate, s = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a, c = u.next;
    u.next = null, s === null ? i = c : s.next = c, s = u;
    var d = e.alternate;
    d !== null && (d = d.updateQueue, a = d.lastBaseUpdate, a !== s && (a === null ? d.firstBaseUpdate = c : a.next = c, d.lastBaseUpdate = u));
  }
  if (i !== null) {
    var v = l.baseState;
    s = 0, d = c = u = null, a = i;
    do {
      var h = a.lane, w = a.eventTime;
      if ((r & h) === h) {
        d !== null && (d = d.next = {
          eventTime: w,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var g = e, x = a;
          switch (h = t, w = n, x.tag) {
            case 1:
              if (g = x.payload, typeof g == "function") {
                v = g.call(w, v, h);
                break e;
              }
              v = g;
              break e;
            case 3:
              g.flags = g.flags & -65537 | 128;
            case 0:
              if (g = x.payload, h = typeof g == "function" ? g.call(w, v, h) : g, h == null)
                break e;
              v = H({}, v, h);
              break e;
            case 2:
              rt = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [a] : h.push(a));
      } else
        w = { eventTime: w, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, d === null ? (c = d = w, u = v) : d = d.next = w, s |= h;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null)
          break;
        h = a, a = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (d === null && (u = v), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = d, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        s |= l.lane, l = l.next;
      while (l !== t);
    } else
      i === null && (l.shared.lanes = 0);
    Mt |= s, e.lanes = s, e.memoizedState = v;
  }
}
function Ao(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null)
    for (t = 0; t < e.length; t++) {
      var r = e[t], l = r.callback;
      if (l !== null) {
        if (r.callback = null, r = n, typeof l != "function")
          throw Error(S(191, l));
        l.call(r);
      }
    }
}
var Uu = new Aa.Component().refs;
function Ui(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : H({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var kl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ot(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ae(), l = mt(e), i = Ge(r, l);
  i.payload = t, n != null && (i.callback = n), t = dt(e, i, l), t !== null && (Me(t, e, l, r), Mr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ae(), l = mt(e), i = Ge(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = dt(e, i, l), t !== null && (Me(t, e, l, r), Mr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ae(), r = mt(e), l = Ge(n, r);
  l.tag = 2, t != null && (l.callback = t), t = dt(e, l, r), t !== null && (Me(t, e, r, n), Mr(t, e, r));
} };
function $o(e, t, n, r, l, i, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, s) : t.prototype && t.prototype.isPureReactComponent ? !Wn(n, r) || !Wn(l, i) : !0;
}
function Bu(e, t, n) {
  var r = !1, l = gt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = _e(i) : (l = he(t) ? Lt : se.current, r = t.contextTypes, i = (r = r != null) ? on(e, l) : gt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = kl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Uo(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && kl.enqueueReplaceState(t, t.state, null);
}
function Bi(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = Uu, Rs(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = _e(i) : (i = he(t) ? Lt : se.current, l.context = on(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Ui(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && kl.enqueueReplaceState(l, l.state, null), rl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function kn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1)
          throw Error(S(309));
        var r = n.stateNode;
      }
      if (!r)
        throw Error(S(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(s) {
        var a = l.refs;
        a === Uu && (a = l.refs = {}), s === null ? delete a[i] : a[i] = s;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string")
      throw Error(S(284));
    if (!n._owner)
      throw Error(S(290, e));
  }
  return e;
}
function Sr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(S(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Bo(e) {
  var t = e._init;
  return t(e._payload);
}
function Vu(e) {
  function t(p, f) {
    if (e) {
      var m = p.deletions;
      m === null ? (p.deletions = [f], p.flags |= 16) : m.push(f);
    }
  }
  function n(p, f) {
    if (!e)
      return null;
    for (; f !== null; )
      t(p, f), f = f.sibling;
    return null;
  }
  function r(p, f) {
    for (p = /* @__PURE__ */ new Map(); f !== null; )
      f.key !== null ? p.set(f.key, f) : p.set(f.index, f), f = f.sibling;
    return p;
  }
  function l(p, f) {
    return p = ht(p, f), p.index = 0, p.sibling = null, p;
  }
  function i(p, f, m) {
    return p.index = m, e ? (m = p.alternate, m !== null ? (m = m.index, m < f ? (p.flags |= 2, f) : m) : (p.flags |= 2, f)) : (p.flags |= 1048576, f);
  }
  function s(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function a(p, f, m, y) {
    return f === null || f.tag !== 6 ? (f = li(m, p.mode, y), f.return = p, f) : (f = l(f, m), f.return = p, f);
  }
  function u(p, f, m, y) {
    var k = m.type;
    return k === Ut ? d(p, f, m.props.children, y, m.key) : f !== null && (f.elementType === k || typeof k == "object" && k !== null && k.$$typeof === nt && Bo(k) === f.type) ? (y = l(f, m.props), y.ref = kn(p, f, m), y.return = p, y) : (y = Ur(m.type, m.key, m.props, null, p.mode, y), y.ref = kn(p, f, m), y.return = p, y);
  }
  function c(p, f, m, y) {
    return f === null || f.tag !== 4 || f.stateNode.containerInfo !== m.containerInfo || f.stateNode.implementation !== m.implementation ? (f = ii(m, p.mode, y), f.return = p, f) : (f = l(f, m.children || []), f.return = p, f);
  }
  function d(p, f, m, y, k) {
    return f === null || f.tag !== 7 ? (f = zt(m, p.mode, y, k), f.return = p, f) : (f = l(f, m), f.return = p, f);
  }
  function v(p, f, m) {
    if (typeof f == "string" && f !== "" || typeof f == "number")
      return f = li("" + f, p.mode, m), f.return = p, f;
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case cr:
          return m = Ur(f.type, f.key, f.props, null, p.mode, m), m.ref = kn(p, null, f), m.return = p, m;
        case $t:
          return f = ii(f, p.mode, m), f.return = p, f;
        case nt:
          var y = f._init;
          return v(p, y(f._payload), m);
      }
      if (En(f) || gn(f))
        return f = zt(f, p.mode, m, null), f.return = p, f;
      Sr(p, f);
    }
    return null;
  }
  function h(p, f, m, y) {
    var k = f !== null ? f.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number")
      return k !== null ? null : a(p, f, "" + m, y);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case cr:
          return m.key === k ? u(p, f, m, y) : null;
        case $t:
          return m.key === k ? c(p, f, m, y) : null;
        case nt:
          return k = m._init, h(
            p,
            f,
            k(m._payload),
            y
          );
      }
      if (En(m) || gn(m))
        return k !== null ? null : d(p, f, m, y, null);
      Sr(p, m);
    }
    return null;
  }
  function w(p, f, m, y, k) {
    if (typeof y == "string" && y !== "" || typeof y == "number")
      return p = p.get(m) || null, a(f, p, "" + y, k);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case cr:
          return p = p.get(y.key === null ? m : y.key) || null, u(f, p, y, k);
        case $t:
          return p = p.get(y.key === null ? m : y.key) || null, c(f, p, y, k);
        case nt:
          var N = y._init;
          return w(p, f, m, N(y._payload), k);
      }
      if (En(y) || gn(y))
        return p = p.get(m) || null, d(f, p, y, k, null);
      Sr(f, y);
    }
    return null;
  }
  function g(p, f, m, y) {
    for (var k = null, N = null, E = f, P = f = 0, C = null; E !== null && P < m.length; P++) {
      E.index > P ? (C = E, E = null) : C = E.sibling;
      var T = h(p, E, m[P], y);
      if (T === null) {
        E === null && (E = C);
        break;
      }
      e && E && T.alternate === null && t(p, E), f = i(T, f, P), N === null ? k = T : N.sibling = T, N = T, E = C;
    }
    if (P === m.length)
      return n(p, E), U && jt(p, P), k;
    if (E === null) {
      for (; P < m.length; P++)
        E = v(p, m[P], y), E !== null && (f = i(E, f, P), N === null ? k = E : N.sibling = E, N = E);
      return U && jt(p, P), k;
    }
    for (E = r(p, E); P < m.length; P++)
      C = w(E, p, P, m[P], y), C !== null && (e && C.alternate !== null && E.delete(C.key === null ? P : C.key), f = i(C, f, P), N === null ? k = C : N.sibling = C, N = C);
    return e && E.forEach(function(K) {
      return t(p, K);
    }), U && jt(p, P), k;
  }
  function x(p, f, m, y) {
    var k = gn(m);
    if (typeof k != "function")
      throw Error(S(150));
    if (m = k.call(m), m == null)
      throw Error(S(151));
    for (var N = k = null, E = f, P = f = 0, C = null, T = m.next(); E !== null && !T.done; P++, T = m.next()) {
      E.index > P ? (C = E, E = null) : C = E.sibling;
      var K = h(p, E, T.value, y);
      if (K === null) {
        E === null && (E = C);
        break;
      }
      e && E && K.alternate === null && t(p, E), f = i(K, f, P), N === null ? k = K : N.sibling = K, N = K, E = C;
    }
    if (T.done)
      return n(
        p,
        E
      ), U && jt(p, P), k;
    if (E === null) {
      for (; !T.done; P++, T = m.next())
        T = v(p, T.value, y), T !== null && (f = i(T, f, P), N === null ? k = T : N.sibling = T, N = T);
      return U && jt(p, P), k;
    }
    for (E = r(p, E); !T.done; P++, T = m.next())
      T = w(E, p, P, T.value, y), T !== null && (e && T.alternate !== null && E.delete(T.key === null ? P : T.key), f = i(T, f, P), N === null ? k = T : N.sibling = T, N = T);
    return e && E.forEach(function(be) {
      return t(p, be);
    }), U && jt(p, P), k;
  }
  function z(p, f, m, y) {
    if (typeof m == "object" && m !== null && m.type === Ut && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case cr:
          e: {
            for (var k = m.key, N = f; N !== null; ) {
              if (N.key === k) {
                if (k = m.type, k === Ut) {
                  if (N.tag === 7) {
                    n(p, N.sibling), f = l(N, m.props.children), f.return = p, p = f;
                    break e;
                  }
                } else if (N.elementType === k || typeof k == "object" && k !== null && k.$$typeof === nt && Bo(k) === N.type) {
                  n(p, N.sibling), f = l(N, m.props), f.ref = kn(p, N, m), f.return = p, p = f;
                  break e;
                }
                n(p, N);
                break;
              } else
                t(p, N);
              N = N.sibling;
            }
            m.type === Ut ? (f = zt(m.props.children, p.mode, y, m.key), f.return = p, p = f) : (y = Ur(m.type, m.key, m.props, null, p.mode, y), y.ref = kn(p, f, m), y.return = p, p = y);
          }
          return s(p);
        case $t:
          e: {
            for (N = m.key; f !== null; ) {
              if (f.key === N)
                if (f.tag === 4 && f.stateNode.containerInfo === m.containerInfo && f.stateNode.implementation === m.implementation) {
                  n(p, f.sibling), f = l(f, m.children || []), f.return = p, p = f;
                  break e;
                } else {
                  n(p, f);
                  break;
                }
              else
                t(p, f);
              f = f.sibling;
            }
            f = ii(m, p.mode, y), f.return = p, p = f;
          }
          return s(p);
        case nt:
          return N = m._init, z(p, f, N(m._payload), y);
      }
      if (En(m))
        return g(p, f, m, y);
      if (gn(m))
        return x(p, f, m, y);
      Sr(p, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, f !== null && f.tag === 6 ? (n(p, f.sibling), f = l(f, m), f.return = p, p = f) : (n(p, f), f = li(m, p.mode, y), f.return = p, p = f), s(p)) : n(p, f);
  }
  return z;
}
var un = Vu(!0), Hu = Vu(!1), ir = {}, Ue = wt(ir), Xn = wt(ir), qn = wt(ir);
function Pt(e) {
  if (e === ir)
    throw Error(S(174));
  return e;
}
function Fs(e, t) {
  switch (O(qn, t), O(Xn, e), O(Ue, ir), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : wi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = wi(t, e);
  }
  $(Ue), O(Ue, t);
}
function cn() {
  $(Ue), $(Xn), $(qn);
}
function Qu(e) {
  Pt(qn.current);
  var t = Pt(Ue.current), n = wi(t, e.type);
  t !== n && (O(Xn, e), O(Ue, n));
}
function Ms(e) {
  Xn.current === e && ($(Ue), $(Xn));
}
var B = wt(0);
function ll(e) {
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
var Jl = [];
function Ds() {
  for (var e = 0; e < Jl.length; e++)
    Jl[e]._workInProgressVersionPrimary = null;
  Jl.length = 0;
}
var Dr = Ze.ReactCurrentDispatcher, bl = Ze.ReactCurrentBatchConfig, Ft = 0, V = null, X = null, J = null, il = !1, Mn = !1, Zn = 0, Dd = 0;
function re() {
  throw Error(S(321));
}
function Is(e, t) {
  if (t === null)
    return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!De(e[n], t[n]))
      return !1;
  return !0;
}
function Os(e, t, n, r, l, i) {
  if (Ft = i, V = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Dr.current = e === null || e.memoizedState === null ? $d : Ud, e = n(r, l), Mn) {
    i = 0;
    do {
      if (Mn = !1, Zn = 0, 25 <= i)
        throw Error(S(301));
      i += 1, J = X = null, t.updateQueue = null, Dr.current = Bd, e = n(r, l);
    } while (Mn);
  }
  if (Dr.current = sl, t = X !== null && X.next !== null, Ft = 0, J = X = V = null, il = !1, t)
    throw Error(S(300));
  return e;
}
function As() {
  var e = Zn !== 0;
  return Zn = 0, e;
}
function Oe() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return J === null ? V.memoizedState = J = e : J = J.next = e, J;
}
function Pe() {
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
      throw Error(S(310));
    X = e, e = { memoizedState: X.memoizedState, baseState: X.baseState, baseQueue: X.baseQueue, queue: X.queue, next: null }, J === null ? V.memoizedState = J = e : J = J.next = e;
  }
  return J;
}
function Jn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ei(e) {
  var t = Pe(), n = t.queue;
  if (n === null)
    throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = X, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var s = l.next;
      l.next = i.next, i.next = s;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var a = s = null, u = null, c = i;
    do {
      var d = c.lane;
      if ((Ft & d) === d)
        u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var v = {
          lane: d,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (a = u = v, s = r) : u = u.next = v, V.lanes |= d, Mt |= d;
      }
      c = c.next;
    } while (c !== null && c !== i);
    u === null ? s = r : u.next = a, De(r, t.memoizedState) || (pe = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, V.lanes |= i, Mt |= i, l = l.next;
    while (l !== e);
  } else
    l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ti(e) {
  var t = Pe(), n = t.queue;
  if (n === null)
    throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var s = l = l.next;
    do
      i = e(i, s.action), s = s.next;
    while (s !== l);
    De(i, t.memoizedState) || (pe = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function Wu() {
}
function Gu(e, t) {
  var n = V, r = Pe(), l = t(), i = !De(r.memoizedState, l);
  if (i && (r.memoizedState = l, pe = !0), r = r.queue, $s(Xu.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || J !== null && J.memoizedState.tag & 1) {
    if (n.flags |= 2048, bn(9, Yu.bind(null, n, r, l, t), void 0, null), b === null)
      throw Error(S(349));
    Ft & 30 || Ku(n, t, l);
  }
  return l;
}
function Ku(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = V.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, V.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Yu(e, t, n, r) {
  t.value = n, t.getSnapshot = r, qu(t) && Zu(e);
}
function Xu(e, t, n) {
  return n(function() {
    qu(t) && Zu(e);
  });
}
function qu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !De(e, n);
  } catch {
    return !0;
  }
}
function Zu(e) {
  var t = Xe(e, 1);
  t !== null && Me(t, e, 1, -1);
}
function Vo(e) {
  var t = Oe();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Jn, lastRenderedState: e }, t.queue = e, e = e.dispatch = Ad.bind(null, V, e), [t.memoizedState, e];
}
function bn(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = V.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, V.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ju() {
  return Pe().memoizedState;
}
function Ir(e, t, n, r) {
  var l = Oe();
  V.flags |= e, l.memoizedState = bn(1 | t, n, void 0, r === void 0 ? null : r);
}
function Nl(e, t, n, r) {
  var l = Pe();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (X !== null) {
    var s = X.memoizedState;
    if (i = s.destroy, r !== null && Is(r, s.deps)) {
      l.memoizedState = bn(t, n, i, r);
      return;
    }
  }
  V.flags |= e, l.memoizedState = bn(1 | t, n, i, r);
}
function Ho(e, t) {
  return Ir(8390656, 8, e, t);
}
function $s(e, t) {
  return Nl(2048, 8, e, t);
}
function bu(e, t) {
  return Nl(4, 2, e, t);
}
function ec(e, t) {
  return Nl(4, 4, e, t);
}
function tc(e, t) {
  if (typeof t == "function")
    return e = e(), t(e), function() {
      t(null);
    };
  if (t != null)
    return e = e(), t.current = e, function() {
      t.current = null;
    };
}
function nc(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Nl(4, 4, tc.bind(null, t, e), n);
}
function Us() {
}
function rc(e, t) {
  var n = Pe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Is(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function lc(e, t) {
  var n = Pe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Is(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function ic(e, t, n) {
  return Ft & 21 ? (De(n, t) || (n = au(), V.lanes |= n, Mt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, pe = !0), e.memoizedState = n);
}
function Id(e, t) {
  var n = I;
  I = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = bl.transition;
  bl.transition = {};
  try {
    e(!1), t();
  } finally {
    I = n, bl.transition = r;
  }
}
function sc() {
  return Pe().memoizedState;
}
function Od(e, t, n) {
  var r = mt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, oc(e))
    ac(t, n);
  else if (n = Au(e, t, n, r), n !== null) {
    var l = ae();
    Me(n, e, r, l), uc(n, t, r);
  }
}
function Ad(e, t, n) {
  var r = mt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (oc(e))
    ac(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
      try {
        var s = t.lastRenderedState, a = i(s, n);
        if (l.hasEagerState = !0, l.eagerState = a, De(a, s)) {
          var u = t.interleaved;
          u === null ? (l.next = l, Ls(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
          return;
        }
      } catch {
      } finally {
      }
    n = Au(e, t, l, r), n !== null && (l = ae(), Me(n, e, r, l), uc(n, t, r));
  }
}
function oc(e) {
  var t = e.alternate;
  return e === V || t !== null && t === V;
}
function ac(e, t) {
  Mn = il = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function uc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, gs(e, n);
  }
}
var sl = { readContext: _e, useCallback: re, useContext: re, useEffect: re, useImperativeHandle: re, useInsertionEffect: re, useLayoutEffect: re, useMemo: re, useReducer: re, useRef: re, useState: re, useDebugValue: re, useDeferredValue: re, useTransition: re, useMutableSource: re, useSyncExternalStore: re, useId: re, unstable_isNewReconciler: !1 }, $d = { readContext: _e, useCallback: function(e, t) {
  return Oe().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: _e, useEffect: Ho, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ir(
    4194308,
    4,
    tc.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Ir(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Ir(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Oe();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Oe();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Od.bind(null, V, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Oe();
  return e = { current: e }, t.memoizedState = e;
}, useState: Vo, useDebugValue: Us, useDeferredValue: function(e) {
  return Oe().memoizedState = e;
}, useTransition: function() {
  var e = Vo(!1), t = e[0];
  return e = Id.bind(null, e[1]), Oe().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = V, l = Oe();
  if (U) {
    if (n === void 0)
      throw Error(S(407));
    n = n();
  } else {
    if (n = t(), b === null)
      throw Error(S(349));
    Ft & 30 || Ku(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Ho(Xu.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, bn(9, Yu.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Oe(), t = b.identifierPrefix;
  if (U) {
    var n = We, r = Qe;
    n = (r & ~(1 << 32 - Fe(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Zn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else
    n = Dd++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Ud = {
  readContext: _e,
  useCallback: rc,
  useContext: _e,
  useEffect: $s,
  useImperativeHandle: nc,
  useInsertionEffect: bu,
  useLayoutEffect: ec,
  useMemo: lc,
  useReducer: ei,
  useRef: Ju,
  useState: function() {
    return ei(Jn);
  },
  useDebugValue: Us,
  useDeferredValue: function(e) {
    var t = Pe();
    return ic(t, X.memoizedState, e);
  },
  useTransition: function() {
    var e = ei(Jn)[0], t = Pe().memoizedState;
    return [e, t];
  },
  useMutableSource: Wu,
  useSyncExternalStore: Gu,
  useId: sc,
  unstable_isNewReconciler: !1
}, Bd = { readContext: _e, useCallback: rc, useContext: _e, useEffect: $s, useImperativeHandle: nc, useInsertionEffect: bu, useLayoutEffect: ec, useMemo: lc, useReducer: ti, useRef: Ju, useState: function() {
  return ti(Jn);
}, useDebugValue: Us, useDeferredValue: function(e) {
  var t = Pe();
  return X === null ? t.memoizedState = e : ic(t, X.memoizedState, e);
}, useTransition: function() {
  var e = ti(Jn)[0], t = Pe().memoizedState;
  return [e, t];
}, useMutableSource: Wu, useSyncExternalStore: Gu, useId: sc, unstable_isNewReconciler: !1 };
function fn(e, t) {
  try {
    var n = "", r = t;
    do
      n += hf(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ni(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Vi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Vd = typeof WeakMap == "function" ? WeakMap : Map;
function cc(e, t, n) {
  n = Ge(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    al || (al = !0, Ji = r), Vi(e, t);
  }, n;
}
function fc(e, t, n) {
  n = Ge(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Vi(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Vi(e, t), typeof r != "function" && (pt === null ? pt = /* @__PURE__ */ new Set([this]) : pt.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function Qo(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Vd();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else
    l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = np.bind(null, e, t, n), t.then(e, e));
}
function Wo(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Go(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ge(-1, 1), t.tag = 2, dt(n, t, 1))), n.lanes |= 1), e);
}
var Hd = Ze.ReactCurrentOwner, pe = !1;
function oe(e, t, n, r) {
  t.child = e === null ? Hu(t, null, n, r) : un(t, e.child, n, r);
}
function Ko(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return tn(t, l), r = Os(e, t, n, r, i, l), n = As(), e !== null && !pe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qe(e, t, l)) : (U && n && Cs(t), t.flags |= 1, oe(e, t, r, l), t.child);
}
function Yo(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Ys(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, dc(e, t, i, r, l)) : (e = Ur(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var s = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Wn, n(s, r) && e.ref === t.ref)
      return qe(e, t, l);
  }
  return t.flags |= 1, e = ht(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function dc(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Wn(i, r) && e.ref === t.ref)
      if (pe = !1, t.pendingProps = r = i, (e.lanes & l) !== 0)
        e.flags & 131072 && (pe = !0);
      else
        return t.lanes = e.lanes, qe(e, t, l);
  }
  return Hi(e, t, n, r, l);
}
function pc(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, O(qt, ge), ge |= n;
    else {
      if (!(n & 1073741824))
        return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, O(qt, ge), ge |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, O(qt, ge), ge |= r;
    }
  else
    i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, O(qt, ge), ge |= r;
  return oe(e, t, l, n), t.child;
}
function mc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Hi(e, t, n, r, l) {
  var i = he(n) ? Lt : se.current;
  return i = on(t, i), tn(t, l), n = Os(e, t, n, r, i, l), r = As(), e !== null && !pe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qe(e, t, l)) : (U && r && Cs(t), t.flags |= 1, oe(e, t, n, l), t.child);
}
function Xo(e, t, n, r, l) {
  if (he(n)) {
    var i = !0;
    Jr(t);
  } else
    i = !1;
  if (tn(t, l), t.stateNode === null)
    Or(e, t), Bu(t, n, r), Bi(t, n, r, l), r = !0;
  else if (e === null) {
    var s = t.stateNode, a = t.memoizedProps;
    s.props = a;
    var u = s.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = _e(c) : (c = he(n) ? Lt : se.current, c = on(t, c));
    var d = n.getDerivedStateFromProps, v = typeof d == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    v || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== r || u !== c) && Uo(t, s, r, c), rt = !1;
    var h = t.memoizedState;
    s.state = h, rl(t, r, s, l), u = t.memoizedState, a !== r || h !== u || me.current || rt ? (typeof d == "function" && (Ui(t, n, d, r), u = t.memoizedState), (a = rt || $o(t, n, a, r, h, u, c)) ? (v || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), s.props = r, s.state = u, s.context = c, r = a) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    s = t.stateNode, $u(e, t), a = t.memoizedProps, c = t.type === t.elementType ? a : ze(t.type, a), s.props = c, v = t.pendingProps, h = s.context, u = n.contextType, typeof u == "object" && u !== null ? u = _e(u) : (u = he(n) ? Lt : se.current, u = on(t, u));
    var w = n.getDerivedStateFromProps;
    (d = typeof w == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== v || h !== u) && Uo(t, s, r, u), rt = !1, h = t.memoizedState, s.state = h, rl(t, r, s, l);
    var g = t.memoizedState;
    a !== v || h !== g || me.current || rt ? (typeof w == "function" && (Ui(t, n, w, r), g = t.memoizedState), (c = rt || $o(t, n, c, r, h, g, u) || !1) ? (d || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, g, u), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, g, u)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = g), s.props = r, s.state = g, s.context = u, r = c) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Qi(e, t, n, r, i, l);
}
function Qi(e, t, n, r, l, i) {
  mc(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s)
    return l && Mo(t, n, !1), qe(e, t, i);
  r = t.stateNode, Hd.current = t;
  var a = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && s ? (t.child = un(t, e.child, null, i), t.child = un(t, null, a, i)) : oe(e, t, a, i), t.memoizedState = r.state, l && Mo(t, n, !0), t.child;
}
function hc(e) {
  var t = e.stateNode;
  t.pendingContext ? Fo(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Fo(e, t.context, !1), Fs(e, t.containerInfo);
}
function qo(e, t, n, r, l) {
  return an(), _s(l), t.flags |= 256, oe(e, t, n, r), t.child;
}
var Wi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Gi(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function vc(e, t, n) {
  var r = t.pendingProps, l = B.current, i = !1, s = (t.flags & 128) !== 0, a;
  if ((a = s) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), O(B, l & 1), e === null)
    return Ai(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, s = { mode: "hidden", children: s }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = s) : i = El(s, r, 0, null), e = zt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Gi(n), t.memoizedState = Wi, e) : Bs(t, s));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null))
    return Qd(e, t, s, r, a, l, n);
  if (i) {
    i = r.fallback, s = t.mode, l = e.child, a = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(s & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = ht(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? i = ht(a, i) : (i = zt(i, s, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, s = e.child.memoizedState, s = s === null ? Gi(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, i.memoizedState = s, i.childLanes = e.childLanes & ~n, t.memoizedState = Wi, r;
  }
  return i = e.child, e = i.sibling, r = ht(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Bs(e, t) {
  return t = El({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function kr(e, t, n, r) {
  return r !== null && _s(r), un(t, e.child, null, n), e = Bs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Qd(e, t, n, r, l, i, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ni(Error(S(422))), kr(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = El({ mode: "visible", children: r.children }, l, 0, null), i = zt(i, l, s, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && un(t, e.child, null, s), t.child.memoizedState = Gi(s), t.memoizedState = Wi, i);
  if (!(t.mode & 1))
    return kr(e, t, s, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r)
      var a = r.dgst;
    return r = a, i = Error(S(419)), r = ni(i, r, void 0), kr(e, t, s, r);
  }
  if (a = (s & e.childLanes) !== 0, pe || a) {
    if (r = b, r !== null) {
      switch (s & -s) {
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
      l = l & (r.suspendedLanes | s) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Xe(e, l), Me(r, e, l, -1));
    }
    return Ks(), r = ni(Error(S(421))), kr(e, t, s, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = rp.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, ye = ft(l.nextSibling), we = t, U = !0, Re = null, e !== null && (Ne[je++] = Qe, Ne[je++] = We, Ne[je++] = Rt, Qe = e.id, We = e.overflow, Rt = t), t = Bs(t, r.children), t.flags |= 4096, t);
}
function Zo(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), $i(e.return, t, n);
}
function ri(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function gc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (oe(e, t, r.children, n), r = B.current, r & 2)
    r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128)
      e:
        for (e = t.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && Zo(e, n, t);
          else if (e.tag === 19)
            Zo(e, n, t);
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
  if (O(B, r), !(t.mode & 1))
    t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          e = n.alternate, e !== null && ll(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ri(t, !1, l, n, i);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && ll(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        ri(t, !0, n, null, i);
        break;
      case "together":
        ri(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Or(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function qe(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Mt |= t.lanes, !(n & t.childLanes))
    return null;
  if (e !== null && t.child !== e.child)
    throw Error(S(153));
  if (t.child !== null) {
    for (e = t.child, n = ht(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      e = e.sibling, n = n.sibling = ht(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Wd(e, t, n) {
  switch (t.tag) {
    case 3:
      hc(t), an();
      break;
    case 5:
      Qu(t);
      break;
    case 1:
      he(t.type) && Jr(t);
      break;
    case 4:
      Fs(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      O(tl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (O(B, B.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? vc(e, t, n) : (O(B, B.current & 1), e = qe(e, t, n), e !== null ? e.sibling : null);
      O(B, B.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r)
          return gc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), O(B, B.current), r)
        break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, pc(e, t, n);
  }
  return qe(e, t, n);
}
var yc, Ki, wc, xc;
yc = function(e, t) {
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
Ki = function() {
};
wc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Pt(Ue.current);
    var i = null;
    switch (n) {
      case "input":
        l = hi(e, l), r = hi(e, r), i = [];
        break;
      case "select":
        l = H({}, l, { value: void 0 }), r = H({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = yi(e, l), r = yi(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = qr);
    }
    xi(n, r);
    var s;
    n = null;
    for (c in l)
      if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
        if (c === "style") {
          var a = l[c];
          for (s in a)
            a.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
        } else
          c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (An.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (a = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== a && (u != null || a != null))
        if (c === "style")
          if (a) {
            for (s in a)
              !a.hasOwnProperty(s) || u && u.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
            for (s in u)
              u.hasOwnProperty(s) && a[s] !== u[s] && (n || (n = {}), n[s] = u[s]);
          } else
            n || (i || (i = []), i.push(
              c,
              n
            )), n = u;
        else
          c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, a = a ? a.__html : void 0, u != null && a !== u && (i = i || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (An.hasOwnProperty(c) ? (u != null && c === "onScroll" && A("scroll", e), i || a === u || (i = [])) : (i = i || []).push(c, u));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
xc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Nn(e, t) {
  if (!U)
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
function Gd(e, t, n) {
  var r = t.pendingProps;
  switch (Es(t), t.tag) {
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
      return he(t.type) && Zr(), le(t), null;
    case 3:
      return r = t.stateNode, cn(), $(me), $(se), Ds(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (xr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Re !== null && (ts(Re), Re = null))), Ki(e, t), le(t), null;
    case 5:
      Ms(t);
      var l = Pt(qn.current);
      if (n = t.type, e !== null && t.stateNode != null)
        wc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null)
            throw Error(S(166));
          return le(t), null;
        }
        if (e = Pt(Ue.current), xr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ae] = t, r[Yn] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              A("cancel", r), A("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              A("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Pn.length; l++)
                A(Pn[l], r);
              break;
            case "source":
              A("error", r);
              break;
            case "img":
            case "image":
            case "link":
              A(
                "error",
                r
              ), A("load", r);
              break;
            case "details":
              A("toggle", r);
              break;
            case "input":
              io(r, i), A("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, A("invalid", r);
              break;
            case "textarea":
              oo(r, i), A("invalid", r);
          }
          xi(n, i), l = null;
          for (var s in i)
            if (i.hasOwnProperty(s)) {
              var a = i[s];
              s === "children" ? typeof a == "string" ? r.textContent !== a && (i.suppressHydrationWarning !== !0 && wr(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && wr(
                r.textContent,
                a,
                e
              ), l = ["children", "" + a]) : An.hasOwnProperty(s) && a != null && s === "onScroll" && A("scroll", r);
            }
          switch (n) {
            case "input":
              fr(r), so(r, i, !0);
              break;
            case "textarea":
              fr(r), ao(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = qr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          s = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ka(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, { is: r.is }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[Ae] = t, e[Yn] = r, yc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = Si(n, r), n) {
              case "dialog":
                A("cancel", e), A("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                A("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Pn.length; l++)
                  A(Pn[l], e);
                l = r;
                break;
              case "source":
                A("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                A(
                  "error",
                  e
                ), A("load", e), l = r;
                break;
              case "details":
                A("toggle", e), l = r;
                break;
              case "input":
                io(e, r), l = hi(e, r), A("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = H({}, r, { value: void 0 }), A("invalid", e);
                break;
              case "textarea":
                oo(e, r), l = yi(e, r), A("invalid", e);
                break;
              default:
                l = r;
            }
            xi(n, l), a = l;
            for (i in a)
              if (a.hasOwnProperty(i)) {
                var u = a[i];
                i === "style" ? qa(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Ya(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && $n(e, u) : typeof u == "number" && $n(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (An.hasOwnProperty(i) ? u != null && i === "onScroll" && A("scroll", e) : u != null && fs(e, i, u, s));
              }
            switch (n) {
              case "input":
                fr(e), so(e, r, !1);
                break;
              case "textarea":
                fr(e), ao(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + vt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? Zt(e, !!r.multiple, i, !1) : r.defaultValue != null && Zt(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = qr);
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
        xc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null)
          throw Error(S(166));
        if (n = Pt(qn.current), Pt(Ue.current), xr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ae] = t, (i = r.nodeValue !== n) && (e = we, e !== null))
            switch (e.tag) {
              case 3:
                wr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && wr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ae] = t, t.stateNode = r;
      }
      return le(t), null;
    case 13:
      if ($(B), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (U && ye !== null && t.mode & 1 && !(t.flags & 128))
          Ou(), an(), t.flags |= 98560, i = !1;
        else if (i = xr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i)
              throw Error(S(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i)
              throw Error(S(317));
            i[Ae] = t;
          } else
            an(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          le(t), i = !1;
        } else
          Re !== null && (ts(Re), Re = null), i = !0;
        if (!i)
          return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || B.current & 1 ? q === 0 && (q = 3) : Ks())), t.updateQueue !== null && (t.flags |= 4), le(t), null);
    case 4:
      return cn(), Ki(e, t), e === null && Gn(t.stateNode.containerInfo), le(t), null;
    case 10:
      return zs(t.type._context), le(t), null;
    case 17:
      return he(t.type) && Zr(), le(t), null;
    case 19:
      if ($(B), i = t.memoizedState, i === null)
        return le(t), null;
      if (r = (t.flags & 128) !== 0, s = i.rendering, s === null)
        if (r)
          Nn(i, !1);
        else {
          if (q !== 0 || e !== null && e.flags & 128)
            for (e = t.child; e !== null; ) {
              if (s = ll(e), s !== null) {
                for (t.flags |= 128, Nn(i, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; )
                  i = n, e = r, i.flags &= 14680066, s = i.alternate, s === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = s.childLanes, i.lanes = s.lanes, i.child = s.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = s.memoizedProps, i.memoizedState = s.memoizedState, i.updateQueue = s.updateQueue, i.type = s.type, e = s.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
                return O(B, B.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null && G() > dn && (t.flags |= 128, r = !0, Nn(i, !1), t.lanes = 4194304);
        }
      else {
        if (!r)
          if (e = ll(s), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Nn(i, !0), i.tail === null && i.tailMode === "hidden" && !s.alternate && !U)
              return le(t), null;
          } else
            2 * G() - i.renderingStartTime > dn && n !== 1073741824 && (t.flags |= 128, r = !0, Nn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (s.sibling = t.child, t.child = s) : (n = i.last, n !== null ? n.sibling = s : t.child = s, i.last = s);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = G(), t.sibling = null, n = B.current, O(B, r ? n & 1 | 2 : n & 1), t) : (le(t), null);
    case 22:
    case 23:
      return Gs(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ge & 1073741824 && (le(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : le(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(S(156, t.tag));
}
function Kd(e, t) {
  switch (Es(t), t.tag) {
    case 1:
      return he(t.type) && Zr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return cn(), $(me), $(se), Ds(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Ms(t), null;
    case 13:
      if ($(B), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(S(340));
        an();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return $(B), null;
    case 4:
      return cn(), null;
    case 10:
      return zs(t.type._context), null;
    case 22:
    case 23:
      return Gs(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Nr = !1, ie = !1, Yd = typeof WeakSet == "function" ? WeakSet : Set, j = null;
function Xt(e, t) {
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
function Yi(e, t, n) {
  try {
    n();
  } catch (r) {
    Q(e, t, r);
  }
}
var Jo = !1;
function Xd(e, t) {
  if (Li = Kr, e = ju(), js(e)) {
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
          var s = 0, a = -1, u = -1, c = 0, d = 0, v = e, h = null;
          t:
            for (; ; ) {
              for (var w; v !== n || l !== 0 && v.nodeType !== 3 || (a = s + l), v !== i || r !== 0 && v.nodeType !== 3 || (u = s + r), v.nodeType === 3 && (s += v.nodeValue.length), (w = v.firstChild) !== null; )
                h = v, v = w;
              for (; ; ) {
                if (v === e)
                  break t;
                if (h === n && ++c === l && (a = s), h === i && ++d === r && (u = s), (w = v.nextSibling) !== null)
                  break;
                v = h, h = v.parentNode;
              }
              v = w;
            }
          n = a === -1 || u === -1 ? null : { start: a, end: u };
        } else
          n = null;
      }
    n = n || { start: 0, end: 0 };
  } else
    n = null;
  for (Ri = { focusedElem: e, selectionRange: n }, Kr = !1, j = t; j !== null; )
    if (t = j, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
      e.return = t, j = e;
    else
      for (; j !== null; ) {
        t = j;
        try {
          var g = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (g !== null) {
                  var x = g.memoizedProps, z = g.memoizedState, p = t.stateNode, f = p.getSnapshotBeforeUpdate(t.elementType === t.type ? x : ze(t.type, x), z);
                  p.__reactInternalSnapshotBeforeUpdate = f;
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
                throw Error(S(163));
            }
        } catch (y) {
          Q(t, t.return, y);
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, j = e;
          break;
        }
        j = t.return;
      }
  return g = Jo, Jo = !1, g;
}
function Dn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Yi(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function jl(e, t) {
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
function Xi(e) {
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
function Sc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Sc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ae], delete t[Yn], delete t[Di], delete t[Ld], delete t[Rd])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function kc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function bo(e) {
  e:
    for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || kc(e.return))
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
function qi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = qr));
  else if (r !== 4 && (e = e.child, e !== null))
    for (qi(e, t, n), e = e.sibling; e !== null; )
      qi(e, t, n), e = e.sibling;
}
function Zi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null))
    for (Zi(e, t, n), e = e.sibling; e !== null; )
      Zi(e, t, n), e = e.sibling;
}
var ee = null, Le = !1;
function tt(e, t, n) {
  for (n = n.child; n !== null; )
    Nc(e, t, n), n = n.sibling;
}
function Nc(e, t, n) {
  if ($e && typeof $e.onCommitFiberUnmount == "function")
    try {
      $e.onCommitFiberUnmount(vl, n);
    } catch {
    }
  switch (n.tag) {
    case 5:
      ie || Xt(n, t);
    case 6:
      var r = ee, l = Le;
      ee = null, tt(e, t, n), ee = r, Le = l, ee !== null && (Le ? (e = ee, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ee.removeChild(n.stateNode));
      break;
    case 18:
      ee !== null && (Le ? (e = ee, n = n.stateNode, e.nodeType === 8 ? ql(e.parentNode, n) : e.nodeType === 1 && ql(e, n), Hn(e)) : ql(ee, n.stateNode));
      break;
    case 4:
      r = ee, l = Le, ee = n.stateNode.containerInfo, Le = !0, tt(e, t, n), ee = r, Le = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ie && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, s = i.destroy;
          i = i.tag, s !== void 0 && (i & 2 || i & 4) && Yi(n, t, s), l = l.next;
        } while (l !== r);
      }
      tt(e, t, n);
      break;
    case 1:
      if (!ie && (Xt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
        try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (a) {
          Q(n, t, a);
        }
      tt(e, t, n);
      break;
    case 21:
      tt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ie = (r = ie) || n.memoizedState !== null, tt(e, t, n), ie = r) : tt(e, t, n);
      break;
    default:
      tt(e, t, n);
  }
}
function ea(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Yd()), t.forEach(function(r) {
      var l = lp.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Te(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e, s = t, a = s;
        e:
          for (; a !== null; ) {
            switch (a.tag) {
              case 5:
                ee = a.stateNode, Le = !1;
                break e;
              case 3:
                ee = a.stateNode.containerInfo, Le = !0;
                break e;
              case 4:
                ee = a.stateNode.containerInfo, Le = !0;
                break e;
            }
            a = a.return;
          }
        if (ee === null)
          throw Error(S(160));
        Nc(i, s, l), ee = null, Le = !1;
        var u = l.alternate;
        u !== null && (u.return = null), l.return = null;
      } catch (c) {
        Q(l, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; )
      jc(t, e), t = t.sibling;
}
function jc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Te(t, e), Ie(e), r & 4) {
        try {
          Dn(3, e, e.return), jl(3, e);
        } catch (x) {
          Q(e, e.return, x);
        }
        try {
          Dn(5, e, e.return);
        } catch (x) {
          Q(e, e.return, x);
        }
      }
      break;
    case 1:
      Te(t, e), Ie(e), r & 512 && n !== null && Xt(n, n.return);
      break;
    case 5:
      if (Te(t, e), Ie(e), r & 512 && n !== null && Xt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          $n(l, "");
        } catch (x) {
          Q(e, e.return, x);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, s = n !== null ? n.memoizedProps : i, a = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null)
          try {
            a === "input" && i.type === "radio" && i.name != null && Wa(l, i), Si(a, s);
            var c = Si(a, i);
            for (s = 0; s < u.length; s += 2) {
              var d = u[s], v = u[s + 1];
              d === "style" ? qa(l, v) : d === "dangerouslySetInnerHTML" ? Ya(l, v) : d === "children" ? $n(l, v) : fs(l, d, v, c);
            }
            switch (a) {
              case "input":
                vi(l, i);
                break;
              case "textarea":
                Ga(l, i);
                break;
              case "select":
                var h = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var w = i.value;
                w != null ? Zt(l, !!i.multiple, w, !1) : h !== !!i.multiple && (i.defaultValue != null ? Zt(
                  l,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                ) : Zt(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[Yn] = i;
          } catch (x) {
            Q(e, e.return, x);
          }
      }
      break;
    case 6:
      if (Te(t, e), Ie(e), r & 4) {
        if (e.stateNode === null)
          throw Error(S(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (x) {
          Q(e, e.return, x);
        }
      }
      break;
    case 3:
      if (Te(t, e), Ie(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        try {
          Hn(t.containerInfo);
        } catch (x) {
          Q(e, e.return, x);
        }
      break;
    case 4:
      Te(t, e), Ie(e);
      break;
    case 13:
      Te(t, e), Ie(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Qs = G())), r & 4 && ea(e);
      break;
    case 22:
      if (d = n !== null && n.memoizedState !== null, e.mode & 1 ? (ie = (c = ie) || d, Te(t, e), ie = c) : Te(t, e), Ie(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !d && e.mode & 1)
          for (j = e, d = e.child; d !== null; ) {
            for (v = j = d; j !== null; ) {
              switch (h = j, w = h.child, h.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Dn(4, h, h.return);
                  break;
                case 1:
                  Xt(h, h.return);
                  var g = h.stateNode;
                  if (typeof g.componentWillUnmount == "function") {
                    r = h, n = h.return;
                    try {
                      t = r, g.props = t.memoizedProps, g.state = t.memoizedState, g.componentWillUnmount();
                    } catch (x) {
                      Q(r, n, x);
                    }
                  }
                  break;
                case 5:
                  Xt(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    na(v);
                    continue;
                  }
              }
              w !== null ? (w.return = h, j = w) : na(v);
            }
            d = d.sibling;
          }
        e:
          for (d = null, v = e; ; ) {
            if (v.tag === 5) {
              if (d === null) {
                d = v;
                try {
                  l = v.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = v.stateNode, u = v.memoizedProps.style, s = u != null && u.hasOwnProperty("display") ? u.display : null, a.style.display = Xa("display", s));
                } catch (x) {
                  Q(e, e.return, x);
                }
              }
            } else if (v.tag === 6) {
              if (d === null)
                try {
                  v.stateNode.nodeValue = c ? "" : v.memoizedProps;
                } catch (x) {
                  Q(e, e.return, x);
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
              d === v && (d = null), v = v.return;
            }
            d === v && (d = null), v.sibling.return = v.return, v = v.sibling;
          }
      }
      break;
    case 19:
      Te(t, e), Ie(e), r & 4 && ea(e);
      break;
    case 21:
      break;
    default:
      Te(
        t,
        e
      ), Ie(e);
  }
}
function Ie(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (kc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(S(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && ($n(l, ""), r.flags &= -33);
          var i = bo(e);
          Zi(e, i, l);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo, a = bo(e);
          qi(e, a, s);
          break;
        default:
          throw Error(S(161));
      }
    } catch (u) {
      Q(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function qd(e, t, n) {
  j = e, Cc(e);
}
function Cc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; j !== null; ) {
    var l = j, i = l.child;
    if (l.tag === 22 && r) {
      var s = l.memoizedState !== null || Nr;
      if (!s) {
        var a = l.alternate, u = a !== null && a.memoizedState !== null || ie;
        a = Nr;
        var c = ie;
        if (Nr = s, (ie = u) && !c)
          for (j = l; j !== null; )
            s = j, u = s.child, s.tag === 22 && s.memoizedState !== null ? ra(l) : u !== null ? (u.return = s, j = u) : ra(l);
        for (; i !== null; )
          j = i, Cc(i), i = i.sibling;
        j = l, Nr = a, ie = c;
      }
      ta(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? (i.return = l, j = i) : ta(e);
  }
}
function ta(e) {
  for (; j !== null; ) {
    var t = j;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ie || jl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ie)
                if (n === null)
                  r.componentDidMount();
                else {
                  var l = t.elementType === t.type ? n.memoizedProps : ze(t.type, n.memoizedProps);
                  r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var i = t.updateQueue;
              i !== null && Ao(t, i, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (n = null, t.child !== null)
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Ao(t, s, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
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
                  var d = c.memoizedState;
                  if (d !== null) {
                    var v = d.dehydrated;
                    v !== null && Hn(v);
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
              throw Error(S(163));
          }
        ie || t.flags & 512 && Xi(t);
      } catch (h) {
        Q(t, t.return, h);
      }
    }
    if (t === e) {
      j = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, j = n;
      break;
    }
    j = t.return;
  }
}
function na(e) {
  for (; j !== null; ) {
    var t = j;
    if (t === e) {
      j = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, j = n;
      break;
    }
    j = t.return;
  }
}
function ra(e) {
  for (; j !== null; ) {
    var t = j;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            jl(4, t);
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
            Xi(t);
          } catch (u) {
            Q(t, i, u);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Xi(t);
          } catch (u) {
            Q(t, s, u);
          }
      }
    } catch (u) {
      Q(t, t.return, u);
    }
    if (t === e) {
      j = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, j = a;
      break;
    }
    j = t.return;
  }
}
var Zd = Math.ceil, ol = Ze.ReactCurrentDispatcher, Vs = Ze.ReactCurrentOwner, Ee = Ze.ReactCurrentBatchConfig, D = 0, b = null, Y = null, te = 0, ge = 0, qt = wt(0), q = 0, er = null, Mt = 0, Cl = 0, Hs = 0, In = null, de = null, Qs = 0, dn = 1 / 0, Be = null, al = !1, Ji = null, pt = null, jr = !1, ot = null, ul = 0, On = 0, bi = null, Ar = -1, $r = 0;
function ae() {
  return D & 6 ? G() : Ar !== -1 ? Ar : Ar = G();
}
function mt(e) {
  return e.mode & 1 ? D & 2 && te !== 0 ? te & -te : Md.transition !== null ? ($r === 0 && ($r = au()), $r) : (e = I, e !== 0 || (e = window.event, e = e === void 0 ? 16 : hu(e.type)), e) : 1;
}
function Me(e, t, n, r) {
  if (50 < On)
    throw On = 0, bi = null, Error(S(185));
  nr(e, n, r), (!(D & 2) || e !== b) && (e === b && (!(D & 2) && (Cl |= n), q === 4 && it(e, te)), ve(e, r), n === 1 && D === 0 && !(t.mode & 1) && (dn = G() + 500, Sl && xt()));
}
function ve(e, t) {
  var n = e.callbackNode;
  Mf(e, t);
  var r = Gr(e, e === b ? te : 0);
  if (r === 0)
    n !== null && fo(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && fo(n), t === 1)
      e.tag === 0 ? Fd(la.bind(null, e)) : Mu(la.bind(null, e)), Td(function() {
        !(D & 6) && xt();
      }), n = null;
    else {
      switch (uu(r)) {
        case 1:
          n = vs;
          break;
        case 4:
          n = su;
          break;
        case 16:
          n = Wr;
          break;
        case 536870912:
          n = ou;
          break;
        default:
          n = Wr;
      }
      n = Fc(n, Ec.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Ec(e, t) {
  if (Ar = -1, $r = 0, D & 6)
    throw Error(S(327));
  var n = e.callbackNode;
  if (nn() && e.callbackNode !== n)
    return null;
  var r = Gr(e, e === b ? te : 0);
  if (r === 0)
    return null;
  if (r & 30 || r & e.expiredLanes || t)
    t = cl(e, r);
  else {
    t = r;
    var l = D;
    D |= 2;
    var i = Pc();
    (b !== e || te !== t) && (Be = null, dn = G() + 500, Tt(e, t));
    do
      try {
        ep();
        break;
      } catch (a) {
        _c(e, a);
      }
    while (!0);
    Ts(), ol.current = i, D = l, Y !== null ? t = 0 : (b = null, te = 0, t = q);
  }
  if (t !== 0) {
    if (t === 2 && (l = Ei(e), l !== 0 && (r = l, t = es(e, l))), t === 1)
      throw n = er, Tt(e, 0), it(e, r), ve(e, G()), n;
    if (t === 6)
      it(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Jd(l) && (t = cl(e, r), t === 2 && (i = Ei(e), i !== 0 && (r = i, t = es(e, i))), t === 1))
        throw n = er, Tt(e, 0), it(e, r), ve(e, G()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(S(345));
        case 2:
          Ct(e, de, Be);
          break;
        case 3:
          if (it(e, r), (r & 130023424) === r && (t = Qs + 500 - G(), 10 < t)) {
            if (Gr(e, 0) !== 0)
              break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ae(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Mi(Ct.bind(null, e, de, Be), t);
            break;
          }
          Ct(e, de, Be);
          break;
        case 4:
          if (it(e, r), (r & 4194240) === r)
            break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var s = 31 - Fe(r);
            i = 1 << s, s = t[s], s > l && (l = s), r &= ~i;
          }
          if (r = l, r = G() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Zd(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Mi(Ct.bind(null, e, de, Be), r);
            break;
          }
          Ct(e, de, Be);
          break;
        case 5:
          Ct(e, de, Be);
          break;
        default:
          throw Error(S(329));
      }
    }
  }
  return ve(e, G()), e.callbackNode === n ? Ec.bind(null, e) : null;
}
function es(e, t) {
  var n = In;
  return e.current.memoizedState.isDehydrated && (Tt(e, t).flags |= 256), e = cl(e, t), e !== 2 && (t = de, de = n, t !== null && ts(t)), e;
}
function ts(e) {
  de === null ? de = e : de.push.apply(de, e);
}
function Jd(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r], i = l.getSnapshot;
          l = l.value;
          try {
            if (!De(i(), l))
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
function it(e, t) {
  for (t &= ~Hs, t &= ~Cl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Fe(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function la(e) {
  if (D & 6)
    throw Error(S(327));
  nn();
  var t = Gr(e, 0);
  if (!(t & 1))
    return ve(e, G()), null;
  var n = cl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ei(e);
    r !== 0 && (t = r, n = es(e, r));
  }
  if (n === 1)
    throw n = er, Tt(e, 0), it(e, t), ve(e, G()), n;
  if (n === 6)
    throw Error(S(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ct(e, de, Be), ve(e, G()), null;
}
function Ws(e, t) {
  var n = D;
  D |= 1;
  try {
    return e(t);
  } finally {
    D = n, D === 0 && (dn = G() + 500, Sl && xt());
  }
}
function Dt(e) {
  ot !== null && ot.tag === 0 && !(D & 6) && nn();
  var t = D;
  D |= 1;
  var n = Ee.transition, r = I;
  try {
    if (Ee.transition = null, I = 1, e)
      return e();
  } finally {
    I = r, Ee.transition = n, D = t, !(D & 6) && xt();
  }
}
function Gs() {
  ge = qt.current, $(qt);
}
function Tt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Pd(n)), Y !== null)
    for (n = Y.return; n !== null; ) {
      var r = n;
      switch (Es(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Zr();
          break;
        case 3:
          cn(), $(me), $(se), Ds();
          break;
        case 5:
          Ms(r);
          break;
        case 4:
          cn();
          break;
        case 13:
          $(B);
          break;
        case 19:
          $(B);
          break;
        case 10:
          zs(r.type._context);
          break;
        case 22:
        case 23:
          Gs();
      }
      n = n.return;
    }
  if (b = e, Y = e = ht(e.current, null), te = ge = t, q = 0, er = null, Hs = Cl = Mt = 0, de = In = null, _t !== null) {
    for (t = 0; t < _t.length; t++)
      if (n = _t[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var l = r.next, i = n.pending;
        if (i !== null) {
          var s = i.next;
          i.next = l, r.next = s;
        }
        n.pending = r;
      }
    _t = null;
  }
  return e;
}
function _c(e, t) {
  do {
    var n = Y;
    try {
      if (Ts(), Dr.current = sl, il) {
        for (var r = V.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        il = !1;
      }
      if (Ft = 0, J = X = V = null, Mn = !1, Zn = 0, Vs.current = null, n === null || n.return === null) {
        q = 1, er = t, Y = null;
        break;
      }
      e: {
        var i = e, s = n.return, a = n, u = t;
        if (t = te, a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, d = a, v = d.tag;
          if (!(d.mode & 1) && (v === 0 || v === 11 || v === 15)) {
            var h = d.alternate;
            h ? (d.updateQueue = h.updateQueue, d.memoizedState = h.memoizedState, d.lanes = h.lanes) : (d.updateQueue = null, d.memoizedState = null);
          }
          var w = Wo(s);
          if (w !== null) {
            w.flags &= -257, Go(w, s, a, i, t), w.mode & 1 && Qo(i, c, t), t = w, u = c;
            var g = t.updateQueue;
            if (g === null) {
              var x = /* @__PURE__ */ new Set();
              x.add(u), t.updateQueue = x;
            } else
              g.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Qo(i, c, t), Ks();
              break e;
            }
            u = Error(S(426));
          }
        } else if (U && a.mode & 1) {
          var z = Wo(s);
          if (z !== null) {
            !(z.flags & 65536) && (z.flags |= 256), Go(z, s, a, i, t), _s(fn(u, a));
            break e;
          }
        }
        i = u = fn(u, a), q !== 4 && (q = 2), In === null ? In = [i] : In.push(i), i = s;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var p = cc(i, u, t);
              Oo(i, p);
              break e;
            case 1:
              a = u;
              var f = i.type, m = i.stateNode;
              if (!(i.flags & 128) && (typeof f.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (pt === null || !pt.has(m)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var y = fc(i, a, t);
                Oo(i, y);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      zc(n);
    } catch (k) {
      t = k, Y === n && n !== null && (Y = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Pc() {
  var e = ol.current;
  return ol.current = sl, e === null ? sl : e;
}
function Ks() {
  (q === 0 || q === 3 || q === 2) && (q = 4), b === null || !(Mt & 268435455) && !(Cl & 268435455) || it(b, te);
}
function cl(e, t) {
  var n = D;
  D |= 2;
  var r = Pc();
  (b !== e || te !== t) && (Be = null, Tt(e, t));
  do
    try {
      bd();
      break;
    } catch (l) {
      _c(e, l);
    }
  while (!0);
  if (Ts(), D = n, ol.current = r, Y !== null)
    throw Error(S(261));
  return b = null, te = 0, q;
}
function bd() {
  for (; Y !== null; )
    Tc(Y);
}
function ep() {
  for (; Y !== null && !Cf(); )
    Tc(Y);
}
function Tc(e) {
  var t = Rc(e.alternate, e, ge);
  e.memoizedProps = e.pendingProps, t === null ? zc(e) : Y = t, Vs.current = null;
}
function zc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Kd(n, t), n !== null) {
        n.flags &= 32767, Y = n;
        return;
      }
      if (e !== null)
        e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        q = 6, Y = null;
        return;
      }
    } else if (n = Gd(n, t, ge), n !== null) {
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
function Ct(e, t, n) {
  var r = I, l = Ee.transition;
  try {
    Ee.transition = null, I = 1, tp(e, t, n, r);
  } finally {
    Ee.transition = l, I = r;
  }
  return null;
}
function tp(e, t, n, r) {
  do
    nn();
  while (ot !== null);
  if (D & 6)
    throw Error(S(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null)
    return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current)
    throw Error(S(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Df(e, i), e === b && (Y = b = null, te = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || jr || (jr = !0, Fc(Wr, function() {
    return nn(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Ee.transition, Ee.transition = null;
    var s = I;
    I = 1;
    var a = D;
    D |= 4, Vs.current = null, Xd(e, n), jc(n, e), Sd(Ri), Kr = !!Li, Ri = Li = null, e.current = n, qd(n), Ef(), D = a, I = s, Ee.transition = i;
  } else
    e.current = n;
  if (jr && (jr = !1, ot = e, ul = l), i = e.pendingLanes, i === 0 && (pt = null), Tf(n.stateNode), ve(e, G()), t !== null)
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (al)
    throw al = !1, e = Ji, Ji = null, e;
  return ul & 1 && e.tag !== 0 && nn(), i = e.pendingLanes, i & 1 ? e === bi ? On++ : (On = 0, bi = e) : On = 0, xt(), null;
}
function nn() {
  if (ot !== null) {
    var e = uu(ul), t = Ee.transition, n = I;
    try {
      if (Ee.transition = null, I = 16 > e ? 16 : e, ot === null)
        var r = !1;
      else {
        if (e = ot, ot = null, ul = 0, D & 6)
          throw Error(S(331));
        var l = D;
        for (D |= 4, j = e.current; j !== null; ) {
          var i = j, s = i.child;
          if (j.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var c = a[u];
                for (j = c; j !== null; ) {
                  var d = j;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Dn(8, d, i);
                  }
                  var v = d.child;
                  if (v !== null)
                    v.return = d, j = v;
                  else
                    for (; j !== null; ) {
                      d = j;
                      var h = d.sibling, w = d.return;
                      if (Sc(d), d === c) {
                        j = null;
                        break;
                      }
                      if (h !== null) {
                        h.return = w, j = h;
                        break;
                      }
                      j = w;
                    }
                }
              }
              var g = i.alternate;
              if (g !== null) {
                var x = g.child;
                if (x !== null) {
                  g.child = null;
                  do {
                    var z = x.sibling;
                    x.sibling = null, x = z;
                  } while (x !== null);
                }
              }
              j = i;
            }
          }
          if (i.subtreeFlags & 2064 && s !== null)
            s.return = i, j = s;
          else
            e:
              for (; j !== null; ) {
                if (i = j, i.flags & 2048)
                  switch (i.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Dn(9, i, i.return);
                  }
                var p = i.sibling;
                if (p !== null) {
                  p.return = i.return, j = p;
                  break e;
                }
                j = i.return;
              }
        }
        var f = e.current;
        for (j = f; j !== null; ) {
          s = j;
          var m = s.child;
          if (s.subtreeFlags & 2064 && m !== null)
            m.return = s, j = m;
          else
            e:
              for (s = f; j !== null; ) {
                if (a = j, a.flags & 2048)
                  try {
                    switch (a.tag) {
                      case 0:
                      case 11:
                      case 15:
                        jl(9, a);
                    }
                  } catch (k) {
                    Q(a, a.return, k);
                  }
                if (a === s) {
                  j = null;
                  break e;
                }
                var y = a.sibling;
                if (y !== null) {
                  y.return = a.return, j = y;
                  break e;
                }
                j = a.return;
              }
        }
        if (D = l, xt(), $e && typeof $e.onPostCommitFiberRoot == "function")
          try {
            $e.onPostCommitFiberRoot(vl, e);
          } catch {
          }
        r = !0;
      }
      return r;
    } finally {
      I = n, Ee.transition = t;
    }
  }
  return !1;
}
function ia(e, t, n) {
  t = fn(n, t), t = cc(e, t, 1), e = dt(e, t, 1), t = ae(), e !== null && (nr(e, 1, t), ve(e, t));
}
function Q(e, t, n) {
  if (e.tag === 3)
    ia(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ia(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (pt === null || !pt.has(r))) {
          e = fn(n, e), e = fc(t, e, 1), t = dt(t, e, 1), e = ae(), t !== null && (nr(t, 1, e), ve(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function np(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ae(), e.pingedLanes |= e.suspendedLanes & n, b === e && (te & n) === n && (q === 4 || q === 3 && (te & 130023424) === te && 500 > G() - Qs ? Tt(e, 0) : Hs |= n), ve(e, t);
}
function Lc(e, t) {
  t === 0 && (e.mode & 1 ? (t = mr, mr <<= 1, !(mr & 130023424) && (mr = 4194304)) : t = 1);
  var n = ae();
  e = Xe(e, t), e !== null && (nr(e, t, n), ve(e, n));
}
function rp(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Lc(e, n);
}
function lp(e, t) {
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
      throw Error(S(314));
  }
  r !== null && r.delete(t), Lc(e, n);
}
var Rc;
Rc = function(e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || me.current)
      pe = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128))
        return pe = !1, Wd(e, t, n);
      pe = !!(e.flags & 131072);
    }
  else
    pe = !1, U && t.flags & 1048576 && Du(t, el, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Or(e, t), e = t.pendingProps;
      var l = on(t, se.current);
      tn(t, n), l = Os(null, t, r, e, l, n);
      var i = As();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, he(r) ? (i = !0, Jr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Rs(t), l.updater = kl, t.stateNode = l, l._reactInternals = t, Bi(t, r, e, n), t = Qi(null, t, r, !0, i, n)) : (t.tag = 0, U && i && Cs(t), oe(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Or(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = sp(r), e = ze(r, e), l) {
          case 0:
            t = Hi(null, t, r, e, n);
            break e;
          case 1:
            t = Xo(null, t, r, e, n);
            break e;
          case 11:
            t = Ko(null, t, r, e, n);
            break e;
          case 14:
            t = Yo(null, t, r, ze(r.type, e), n);
            break e;
        }
        throw Error(S(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Hi(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Xo(e, t, r, l, n);
    case 3:
      e: {
        if (hc(t), e === null)
          throw Error(S(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, $u(e, t), rl(t, r, null, n);
        var s = t.memoizedState;
        if (r = s.element, i.isDehydrated)
          if (i = { element: r, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
            l = fn(Error(S(423)), t), t = qo(e, t, r, n, l);
            break e;
          } else if (r !== l) {
            l = fn(Error(S(424)), t), t = qo(e, t, r, n, l);
            break e;
          } else
            for (ye = ft(t.stateNode.containerInfo.firstChild), we = t, U = !0, Re = null, n = Hu(t, null, r, n), t.child = n; n; )
              n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (an(), r === l) {
            t = qe(e, t, n);
            break e;
          }
          oe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Qu(t), e === null && Ai(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, s = l.children, Fi(r, l) ? s = null : i !== null && Fi(r, i) && (t.flags |= 32), mc(e, t), oe(e, t, s, n), t.child;
    case 6:
      return e === null && Ai(t), null;
    case 13:
      return vc(e, t, n);
    case 4:
      return Fs(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = un(t, null, r, n) : oe(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Ko(e, t, r, l, n);
    case 7:
      return oe(e, t, t.pendingProps, n), t.child;
    case 8:
      return oe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return oe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, s = l.value, O(tl, r._currentValue), r._currentValue = s, i !== null)
          if (De(i.value, s)) {
            if (i.children === l.children && !me.current) {
              t = qe(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var a = i.dependencies;
              if (a !== null) {
                s = i.child;
                for (var u = a.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (i.tag === 1) {
                      u = Ge(-1, n & -n), u.tag = 2;
                      var c = i.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var d = c.pending;
                        d === null ? u.next = u : (u.next = d.next, d.next = u), c.pending = u;
                      }
                    }
                    i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), $i(
                      i.return,
                      n,
                      t
                    ), a.lanes |= n;
                    break;
                  }
                  u = u.next;
                }
              } else if (i.tag === 10)
                s = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (s = i.return, s === null)
                  throw Error(S(341));
                s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), $i(s, n, t), s = i.sibling;
              } else
                s = i.child;
              if (s !== null)
                s.return = i;
              else
                for (s = i; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (i = s.sibling, i !== null) {
                    i.return = s.return, s = i;
                    break;
                  }
                  s = s.return;
                }
              i = s;
            }
        oe(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, tn(t, n), l = _e(l), r = r(l), t.flags |= 1, oe(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = ze(r, t.pendingProps), l = ze(r.type, l), Yo(e, t, r, l, n);
    case 15:
      return dc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Or(e, t), t.tag = 1, he(r) ? (e = !0, Jr(t)) : e = !1, tn(t, n), Bu(t, r, l), Bi(t, r, l, n), Qi(null, t, r, !0, e, n);
    case 19:
      return gc(e, t, n);
    case 22:
      return pc(e, t, n);
  }
  throw Error(S(156, t.tag));
};
function Fc(e, t) {
  return iu(e, t);
}
function ip(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ce(e, t, n, r) {
  return new ip(e, t, n, r);
}
function Ys(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function sp(e) {
  if (typeof e == "function")
    return Ys(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ps)
      return 11;
    if (e === ms)
      return 14;
  }
  return 2;
}
function ht(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ce(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ur(e, t, n, r, l, i) {
  var s = 2;
  if (r = e, typeof e == "function")
    Ys(e) && (s = 1);
  else if (typeof e == "string")
    s = 5;
  else
    e:
      switch (e) {
        case Ut:
          return zt(n.children, l, i, t);
        case ds:
          s = 8, l |= 8;
          break;
        case fi:
          return e = Ce(12, n, t, l | 2), e.elementType = fi, e.lanes = i, e;
        case di:
          return e = Ce(13, n, t, l), e.elementType = di, e.lanes = i, e;
        case pi:
          return e = Ce(19, n, t, l), e.elementType = pi, e.lanes = i, e;
        case Va:
          return El(n, l, i, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Ua:
                s = 10;
                break e;
              case Ba:
                s = 9;
                break e;
              case ps:
                s = 11;
                break e;
              case ms:
                s = 14;
                break e;
              case nt:
                s = 16, r = null;
                break e;
            }
          throw Error(S(130, e == null ? e : typeof e, ""));
      }
  return t = Ce(s, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function zt(e, t, n, r) {
  return e = Ce(7, e, r, t), e.lanes = n, e;
}
function El(e, t, n, r) {
  return e = Ce(22, e, r, t), e.elementType = Va, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function li(e, t, n) {
  return e = Ce(6, e, null, t), e.lanes = n, e;
}
function ii(e, t, n) {
  return t = Ce(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function op(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = $l(0), this.expirationTimes = $l(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $l(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Xs(e, t, n, r, l, i, s, a, u) {
  return e = new op(e, t, n, a, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Ce(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Rs(i), e;
}
function ap(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: $t, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Mc(e) {
  if (!e)
    return gt;
  e = e._reactInternals;
  e: {
    if (Ot(e) !== e || e.tag !== 1)
      throw Error(S(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (he(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(S(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (he(n))
      return Fu(e, n, t);
  }
  return t;
}
function Dc(e, t, n, r, l, i, s, a, u) {
  return e = Xs(n, r, !0, e, l, i, s, a, u), e.context = Mc(null), n = e.current, r = ae(), l = mt(n), i = Ge(r, l), i.callback = t ?? null, dt(n, i, l), e.current.lanes = l, nr(e, l, r), ve(e, r), e;
}
function _l(e, t, n, r) {
  var l = t.current, i = ae(), s = mt(l);
  return n = Mc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ge(i, s), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = dt(l, t, s), e !== null && (Me(e, l, s, i), Mr(e, l, s)), s;
}
function fl(e) {
  if (e = e.current, !e.child)
    return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function sa(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function qs(e, t) {
  sa(e, t), (e = e.alternate) && sa(e, t);
}
function up() {
  return null;
}
var Ic = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Zs(e) {
  this._internalRoot = e;
}
Pl.prototype.render = Zs.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null)
    throw Error(S(409));
  _l(e, t, null, null);
};
Pl.prototype.unmount = Zs.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Dt(function() {
      _l(null, e, null, null);
    }), t[Ye] = null;
  }
};
function Pl(e) {
  this._internalRoot = e;
}
Pl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = du();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < lt.length && t !== 0 && t < lt[n].priority; n++)
      ;
    lt.splice(n, 0, e), n === 0 && mu(e);
  }
};
function Js(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Tl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function oa() {
}
function cp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = fl(s);
        i.call(c);
      };
    }
    var s = Dc(t, r, e, 0, null, !1, !1, "", oa);
    return e._reactRootContainer = s, e[Ye] = s.current, Gn(e.nodeType === 8 ? e.parentNode : e), Dt(), s;
  }
  for (; l = e.lastChild; )
    e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var c = fl(u);
      a.call(c);
    };
  }
  var u = Xs(e, 0, !1, null, null, !1, !1, "", oa);
  return e._reactRootContainer = u, e[Ye] = u.current, Gn(e.nodeType === 8 ? e.parentNode : e), Dt(function() {
    _l(t, u, n, r);
  }), u;
}
function zl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var s = i;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var u = fl(s);
        a.call(u);
      };
    }
    _l(t, s, e, l);
  } else
    s = cp(n, t, e, l, r);
  return fl(s);
}
cu = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = _n(t.pendingLanes);
        n !== 0 && (gs(t, n | 1), ve(t, G()), !(D & 6) && (dn = G() + 500, xt()));
      }
      break;
    case 13:
      Dt(function() {
        var r = Xe(e, 1);
        if (r !== null) {
          var l = ae();
          Me(r, e, 1, l);
        }
      }), qs(e, 1);
  }
};
ys = function(e) {
  if (e.tag === 13) {
    var t = Xe(e, 134217728);
    if (t !== null) {
      var n = ae();
      Me(t, e, 134217728, n);
    }
    qs(e, 134217728);
  }
};
fu = function(e) {
  if (e.tag === 13) {
    var t = mt(e), n = Xe(e, t);
    if (n !== null) {
      var r = ae();
      Me(n, e, t, r);
    }
    qs(e, t);
  }
};
du = function() {
  return I;
};
pu = function(e, t) {
  var n = I;
  try {
    return I = e, t();
  } finally {
    I = n;
  }
};
Ni = function(e, t, n) {
  switch (t) {
    case "input":
      if (vi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; )
          n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = xl(r);
            if (!l)
              throw Error(S(90));
            Qa(r), vi(r, l);
          }
        }
      }
      break;
    case "textarea":
      Ga(e, n);
      break;
    case "select":
      t = n.value, t != null && Zt(e, !!n.multiple, t, !1);
  }
};
ba = Ws;
eu = Dt;
var fp = { usingClientEntryPoint: !1, Events: [lr, Qt, xl, Za, Ja, Ws] }, jn = { findFiberByHostInstance: Et, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, dp = { bundleType: jn.bundleType, version: jn.version, rendererPackageName: jn.rendererPackageName, rendererConfig: jn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ze.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = ru(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: jn.findFiberByHostInstance || up, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Cr.isDisabled && Cr.supportsFiber)
    try {
      vl = Cr.inject(dp), $e = Cr;
    } catch {
    }
}
Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fp;
Se.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Js(t))
    throw Error(S(200));
  return ap(e, t, null, n);
};
Se.createRoot = function(e, t) {
  if (!Js(e))
    throw Error(S(299));
  var n = !1, r = "", l = Ic;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Xs(e, 1, !1, null, null, n, !1, r, l), e[Ye] = t.current, Gn(e.nodeType === 8 ? e.parentNode : e), new Zs(t);
};
Se.findDOMNode = function(e) {
  if (e == null)
    return null;
  if (e.nodeType === 1)
    return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(S(188)) : (e = Object.keys(e).join(","), Error(S(268, e)));
  return e = ru(t), e = e === null ? null : e.stateNode, e;
};
Se.flushSync = function(e) {
  return Dt(e);
};
Se.hydrate = function(e, t, n) {
  if (!Tl(t))
    throw Error(S(200));
  return zl(null, e, t, !0, n);
};
Se.hydrateRoot = function(e, t, n) {
  if (!Js(e))
    throw Error(S(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", s = Ic;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = Dc(t, null, e, 1, n ?? null, l, !1, i, s), e[Ye] = t.current, Gn(e), r)
    for (e = 0; e < r.length; e++)
      n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
        n,
        l
      );
  return new Pl(t);
};
Se.render = function(e, t, n) {
  if (!Tl(t))
    throw Error(S(200));
  return zl(null, e, t, !1, n);
};
Se.unmountComponentAtNode = function(e) {
  if (!Tl(e))
    throw Error(S(40));
  return e._reactRootContainer ? (Dt(function() {
    zl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ye] = null;
    });
  }), !0) : !1;
};
Se.unstable_batchedUpdates = Ws;
Se.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Tl(n))
    throw Error(S(200));
  if (e == null || e._reactInternals === void 0)
    throw Error(S(38));
  return zl(e, t, n, !1, r);
};
Se.version = "18.2.0-next-9e3b772b8-20220608";
function Oc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Oc);
    } catch (e) {
      console.error(e);
    }
}
Oc(), Da.exports = Se;
var pp = Da.exports, aa = pp;
ln.createRoot = aa.createRoot, ln.hydrateRoot = aa.hydrateRoot;
const ua = ["Tutti", "P", "D", "C", "A"], ns = {
  P: "Portiere",
  D: "Difensore",
  C: "Centrocampista",
  A: "Attaccante",
  U: "Altro"
}, ca = {
  P: 1,
  D: 2,
  C: 3,
  A: 4,
  U: 5
}, dl = {
  P: "lf-role-badge lf-role-badge--p",
  D: "lf-role-badge lf-role-badge--d",
  C: "lf-role-badge lf-role-badge--c",
  A: "lf-role-badge lf-role-badge--a",
  U: "lf-role-badge lf-role-badge--u"
}, Je = (e) => ({
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
function mp({ size: e = 24, ...t }) {
  return /* @__PURE__ */ o.jsxs("svg", { ...Je(e), ...t, children: [
    /* @__PURE__ */ o.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ o.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
    /* @__PURE__ */ o.jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
  ] });
}
function fa({ size: e = 20, ...t }) {
  return /* @__PURE__ */ o.jsxs("svg", { ...Je(e), ...t, children: [
    /* @__PURE__ */ o.jsx("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ o.jsx("path", { d: "m21 21-4.3-4.3" })
  ] });
}
function hp({ size: e = 20, ...t }) {
  return /* @__PURE__ */ o.jsxs("svg", { ...Je(e), ...t, children: [
    /* @__PURE__ */ o.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ o.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ o.jsx("path", { d: "m17 8 5 5" }),
    /* @__PURE__ */ o.jsx("path", { d: "m22 8-5 5" })
  ] });
}
function Ac({ size: e = 20, ...t }) {
  return /* @__PURE__ */ o.jsxs("svg", { ...Je(e), ...t, children: [
    /* @__PURE__ */ o.jsx("path", { d: "M18 6 6 18" }),
    /* @__PURE__ */ o.jsx("path", { d: "m6 6 12 12" })
  ] });
}
function He({ size: e = 18, ...t }) {
  return /* @__PURE__ */ o.jsx("svg", { ...Je(e), ...t, children: /* @__PURE__ */ o.jsx("path", { d: "m6 9 6 6 6-6" }) });
}
function vp({ size: e = 16, ...t }) {
  return /* @__PURE__ */ o.jsx("svg", { ...Je(e), ...t, children: /* @__PURE__ */ o.jsx("path", { d: "m18 15-6-6-6 6" }) });
}
function pl({ size: e = 24, ...t }) {
  return /* @__PURE__ */ o.jsx("svg", { ...Je(e), ...t, children: /* @__PURE__ */ o.jsx("path", { d: "M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" }) });
}
function gp({ size: e = 18, ...t }) {
  return /* @__PURE__ */ o.jsxs("svg", { ...Je(e), ...t, children: [
    /* @__PURE__ */ o.jsx("circle", { cx: "8", cy: "8", r: "6" }),
    /* @__PURE__ */ o.jsx("path", { d: "M18.1 8.4A6 6 0 1 1 8.4 18.1" }),
    /* @__PURE__ */ o.jsx("path", { d: "M6 8h4M8 6v4" })
  ] });
}
function yp({ size: e = 18, ...t }) {
  return /* @__PURE__ */ o.jsxs("svg", { ...Je(e), ...t, children: [
    /* @__PURE__ */ o.jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12 8v4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12 16h.01" })
  ] });
}
function wp(e) {
  return e.split(/\s+-\s+/).map((t) => t.trim()).filter(Boolean);
}
function da({ asset: e, expanded: t, onToggle: n }) {
  const r = wp(e.displayName);
  return /* @__PURE__ */ o.jsxs("div", { children: [
    /* @__PURE__ */ o.jsxs("button", { type: "button", onClick: n, className: "tw-hidden tw-w-full tw-grid-cols-12 tw-gap-4 tw-px-6 tw-py-4 tw-text-left tw-transition hover:tw-bg-slate-50 md:tw-grid", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "tw-col-span-4 tw-flex tw-min-w-0 tw-items-center tw-gap-3", children: [
        /* @__PURE__ */ o.jsx("div", { className: "lf-player-avatar", children: /* @__PURE__ */ o.jsx(pl, { size: 22 }) }),
        /* @__PURE__ */ o.jsxs("div", { className: "tw-min-w-0", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "tw-truncate tw-font-semibold tw-text-slate-900", children: [
            "Blocco ",
            e.realTeam || e.displayName
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-slate-500", children: [
            r.length,
            " portieri",
            /* @__PURE__ */ o.jsx(He, { size: 15, className: `tw-transition ${t ? "tw-rotate-180" : ""}` })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center", children: /* @__PURE__ */ o.jsx("span", { className: "lf-role-badge lf-role-badge--p", children: "Portiere" }) }),
      /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center tw-text-xl tw-font-black tw-text-slate-900", children: e.quotation || "—" }),
      /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center tw-text-lg tw-font-bold tw-text-[var(--primary)]", children: e.purchasePrice || "—" }),
      /* @__PURE__ */ o.jsx("div", { className: `tw-col-span-2 tw-flex tw-items-center tw-truncate tw-text-sm ${e.ownerTag ? "tw-text-slate-600" : "tw-italic tw-text-slate-400"}`, children: e.ownerTag || "Svincolato" })
    ] }),
    /* @__PURE__ */ o.jsxs("button", { type: "button", onClick: n, className: "tw-flex tw-w-full tw-items-start tw-gap-3 tw-p-3 tw-text-left tw-transition hover:tw-bg-slate-50 md:tw-hidden", children: [
      /* @__PURE__ */ o.jsx("div", { className: "lf-player-avatar lf-player-avatar--mobile", children: /* @__PURE__ */ o.jsx(pl, { size: 22 }) }),
      /* @__PURE__ */ o.jsxs("div", { className: "tw-min-w-0 tw-flex-1", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
          /* @__PURE__ */ o.jsx("span", { className: "lf-role-badge lf-role-badge--p", children: "P" }),
          /* @__PURE__ */ o.jsxs("strong", { className: "tw-truncate tw-text-slate-900", children: [
            "Blocco ",
            e.realTeam || e.displayName
          ] })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "tw-mt-1 tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-slate-500", children: [
          r.length,
          " portieri ",
          /* @__PURE__ */ o.jsx(He, { size: 14, className: `tw-transition ${t ? "tw-rotate-180" : ""}` })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-x-3 tw-gap-y-1 tw-text-xs", children: [
          /* @__PURE__ */ o.jsxs("span", { children: [
            /* @__PURE__ */ o.jsx("span", { className: "tw-text-slate-400", children: "Quot:" }),
            " ",
            /* @__PURE__ */ o.jsx("strong", { children: e.quotation || "—" })
          ] }),
          /* @__PURE__ */ o.jsxs("span", { children: [
            /* @__PURE__ */ o.jsx("span", { className: "tw-text-slate-400", children: "Acq:" }),
            " ",
            /* @__PURE__ */ o.jsx("strong", { className: "tw-text-[var(--primary)]", children: e.purchasePrice || "—" })
          ] }),
          /* @__PURE__ */ o.jsxs("span", { className: "tw-truncate tw-text-slate-500", children: [
            "👤 ",
            e.ownerTag || "Svincolato"
          ] })
        ] })
      ] })
    ] }),
    t && /* @__PURE__ */ o.jsx("div", { className: "lf-block-expanded", children: r.map((l) => /* @__PURE__ */ o.jsxs("div", { className: "tw-flex tw-items-center tw-gap-3 tw-px-6 tw-py-3", children: [
      /* @__PURE__ */ o.jsx("div", { className: "lf-mini-avatar", children: "P" }),
      /* @__PURE__ */ o.jsxs("div", { className: "tw-min-w-0", children: [
        /* @__PURE__ */ o.jsx("div", { className: "tw-truncate tw-font-medium tw-text-slate-800", children: l }),
        /* @__PURE__ */ o.jsx("div", { className: "tw-text-xs tw-text-slate-500", children: e.realTeam || "Portiere" })
      ] })
    ] }, l)) })
  ] });
}
function xp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function Sp({ player: e }) {
  return /* @__PURE__ */ o.jsxs("div", { className: "tw-group tw-grid tw-grid-cols-12 tw-gap-4 tw-px-6 tw-py-4 tw-transition hover:tw-bg-slate-50", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "tw-col-span-4 tw-flex tw-min-w-0 tw-items-center tw-gap-3", children: [
      /* @__PURE__ */ o.jsx("div", { className: "lf-player-avatar", "aria-hidden": "true", children: xp(e.displayName) }),
      /* @__PURE__ */ o.jsxs("div", { className: "tw-min-w-0", children: [
        /* @__PURE__ */ o.jsxs("div", { className: `tw-truncate tw-font-semibold tw-transition group-hover:tw-text-[var(--primary)] ${e.active ? "tw-text-slate-900" : "tw-italic tw-text-slate-400"}`, children: [
          e.displayName,
          !e.active && " *"
        ] }),
        /* @__PURE__ */ o.jsx("div", { className: "tw-truncate tw-text-sm tw-text-slate-500", children: e.realTeam || "—" })
      ] })
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center", children: /* @__PURE__ */ o.jsx("span", { className: dl[e.role] ?? dl.U, children: ns[e.role] ?? "?" }) }),
    /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ o.jsx("span", { className: "tw-text-xl tw-font-black tw-text-slate-900", children: e.quotation || "—" }) }),
    /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ o.jsx("span", { className: e.purchasePrice ? "tw-text-lg tw-font-bold tw-text-[var(--primary)]" : "tw-text-slate-400", children: e.purchasePrice || "—" }) }),
    /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-min-w-0", children: /* @__PURE__ */ o.jsx("span", { className: `tw-truncate tw-text-sm ${e.ownerTag ? "tw-text-slate-600" : "tw-italic tw-text-slate-400"}`, children: e.ownerTag || "Svincolato" }) })
  ] });
}
function kp({
  teams: e,
  owners: t,
  currentRole: n,
  currentTeam: r,
  currentOwner: l,
  hasActiveFilters: i,
  onRoleChange: s,
  onTeamChange: a,
  onOwnerChange: u,
  onResetFilters: c
}) {
  return /* @__PURE__ */ o.jsxs("div", { className: "tw-mb-5 sm:tw-mb-6", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "tw-hidden tw-items-center tw-justify-between tw-gap-4 md:tw-flex", children: [
      /* @__PURE__ */ o.jsx("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: ua.map((d) => /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          onClick: () => s(d),
          className: `lf-role-pill ${n === d ? "lf-role-pill--active" : ""}`,
          children: d === "Tutti" ? "Tutti" : ns[d]
        },
        d
      )) }),
      /* @__PURE__ */ o.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ o.jsxs("label", { className: "lf-select-wrap", children: [
          /* @__PURE__ */ o.jsx("span", { "aria-hidden": "true", children: "🏟️" }),
          /* @__PURE__ */ o.jsxs("select", { value: r, onChange: (d) => a(d.target.value), "aria-label": "Filtra per squadra reale", children: [
            /* @__PURE__ */ o.jsx("option", { value: "Tutti", children: "Squadra" }),
            e.map((d) => /* @__PURE__ */ o.jsx("option", { value: d, children: d }, d))
          ] }),
          /* @__PURE__ */ o.jsx(He, { size: 14 })
        ] }),
        /* @__PURE__ */ o.jsxs("label", { className: "lf-select-wrap", children: [
          /* @__PURE__ */ o.jsx("span", { "aria-hidden": "true", children: "👤" }),
          /* @__PURE__ */ o.jsxs("select", { value: l, onChange: (d) => u(d.target.value), "aria-label": "Filtra per proprietario", children: [
            /* @__PURE__ */ o.jsx("option", { value: "Tutti", children: "Proprietario" }),
            t.map((d) => /* @__PURE__ */ o.jsx("option", { value: d, children: d }, d))
          ] }),
          /* @__PURE__ */ o.jsx(He, { size: 14 })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "lf-mobile-filters md:tw-hidden", children: [
      /* @__PURE__ */ o.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ o.jsx("span", { className: "lf-mobile-filter__label", children: "Ruolo" }),
        /* @__PURE__ */ o.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ o.jsx("select", { value: n, onChange: (d) => s(d.target.value), "aria-label": "Filtra per ruolo", children: ua.map((d) => /* @__PURE__ */ o.jsx("option", { value: d, children: d === "Tutti" ? "Tutti" : ns[d] }, d)) }),
          /* @__PURE__ */ o.jsx(He, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ o.jsx("span", { className: "lf-mobile-filter__label", children: "Squadra" }),
        /* @__PURE__ */ o.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ o.jsxs("select", { value: r, onChange: (d) => a(d.target.value), "aria-label": "Filtra per squadra reale", children: [
            /* @__PURE__ */ o.jsx("option", { value: "Tutti", children: "Tutte" }),
            e.map((d) => /* @__PURE__ */ o.jsx("option", { value: d, children: d }, d))
          ] }),
          /* @__PURE__ */ o.jsx(He, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ o.jsx("span", { className: "lf-mobile-filter__label", children: "Proprietario" }),
        /* @__PURE__ */ o.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ o.jsxs("select", { value: l, onChange: (d) => u(d.target.value), "aria-label": "Filtra per proprietario", children: [
            /* @__PURE__ */ o.jsx("option", { value: "Tutti", children: "Tutti" }),
            t.map((d) => /* @__PURE__ */ o.jsx("option", { value: d, children: d }, d))
          ] }),
          /* @__PURE__ */ o.jsx(He, { size: 14 })
        ] })
      ] })
    ] }),
    i && /* @__PURE__ */ o.jsxs("button", { type: "button", onClick: c, className: "lf-mobile-reset md:tw-hidden", children: [
      /* @__PURE__ */ o.jsx(Ac, { size: 15 }),
      " Azzera filtri"
    ] })
  ] });
}
function si({ active: e, direction: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ o.jsx(vp, { size: 14 }) : /* @__PURE__ */ o.jsx(He, { size: 14 }) : null;
}
function Np({ sortKey: e, sortDirection: t, onSort: n }) {
  return /* @__PURE__ */ o.jsxs("div", { className: "tw-hidden tw-grid-cols-12 tw-gap-4 tw-border-b tw-border-slate-200 tw-bg-slate-50 tw-px-6 tw-py-4 tw-text-xs tw-font-bold tw-uppercase tw-tracking-wider tw-text-slate-500 md:tw-grid", children: [
    /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-4", children: "Giocatore" }),
    /* @__PURE__ */ o.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2", onClick: () => n("position"), children: [
      "Ruolo ",
      /* @__PURE__ */ o.jsx(si, { active: e === "position", direction: t })
    ] }),
    /* @__PURE__ */ o.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2 tw-justify-center", onClick: () => n("quotation"), children: [
      "Quot. ",
      /* @__PURE__ */ o.jsx(si, { active: e === "quotation", direction: t })
    ] }),
    /* @__PURE__ */ o.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2 tw-justify-center", onClick: () => n("purchasePrice"), children: [
      "Prezzo ",
      /* @__PURE__ */ o.jsx(si, { active: e === "purchasePrice", direction: t })
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2", children: "Proprietario" })
  ] });
}
function jp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function Cp({ player: e }) {
  return /* @__PURE__ */ o.jsx("article", { className: "tw-p-3 tw-transition hover:tw-bg-slate-50", children: /* @__PURE__ */ o.jsxs("div", { className: "tw-flex tw-items-start tw-gap-3", children: [
    /* @__PURE__ */ o.jsx("div", { className: "lf-player-avatar lf-player-avatar--mobile", "aria-hidden": "true", children: jp(e.displayName) }),
    /* @__PURE__ */ o.jsxs("div", { className: "tw-min-w-0 tw-flex-1", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "tw-mb-1 tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ o.jsx("span", { className: dl[e.role] ?? dl.U, children: e.role || "?" }),
        /* @__PURE__ */ o.jsxs("span", { className: `tw-truncate tw-font-semibold ${e.active ? "tw-text-slate-900" : "tw-italic tw-text-slate-400"}`, children: [
          e.displayName,
          !e.active && " *"
        ] })
      ] }),
      /* @__PURE__ */ o.jsx("div", { className: "tw-mb-2 tw-truncate tw-text-xs tw-text-slate-500", children: e.realTeam || "—" }),
      /* @__PURE__ */ o.jsxs("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-x-3 tw-gap-y-1 tw-text-xs", children: [
        /* @__PURE__ */ o.jsxs("span", { children: [
          /* @__PURE__ */ o.jsx("span", { className: "tw-text-slate-400", children: "Quot:" }),
          " ",
          /* @__PURE__ */ o.jsx("strong", { className: "tw-text-slate-900", children: e.quotation || "—" })
        ] }),
        /* @__PURE__ */ o.jsxs("span", { children: [
          /* @__PURE__ */ o.jsx("span", { className: "tw-text-slate-400", children: "Acq:" }),
          " ",
          /* @__PURE__ */ o.jsx("strong", { className: "tw-text-[var(--primary)]", children: e.purchasePrice || "—" })
        ] }),
        /* @__PURE__ */ o.jsxs("span", { className: `tw-max-w-full tw-truncate ${e.ownerTag ? "tw-text-slate-500" : "tw-italic tw-text-slate-400"}`, children: [
          "👤 ",
          e.ownerTag || "Svincolato"
        ] })
      ] })
    ] })
  ] }) });
}
function pa(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ø/g, "O").replace(/ø/g, "o").toLowerCase();
}
function ma(e) {
  return e.type === "goalkeeper_block" || e.role === "P" && /\s+-\s+/.test(e.displayName);
}
function Ep({ assets: e }) {
  const [t, n] = R.useState(""), [r, l] = R.useState("Tutti"), [i, s] = R.useState("Tutti"), [a, u] = R.useState("Tutti"), [c, d] = R.useState(!1), [v, h] = R.useState("position"), [w, g] = R.useState("asc"), [x, z] = R.useState(/* @__PURE__ */ new Set()), p = R.useMemo(() => [...new Set(e.map((C) => C.realTeam).filter(Boolean))].sort((C, T) => C.localeCompare(T, "it")), [e]), f = R.useMemo(() => [...new Set(e.map((C) => C.ownerTag).filter(Boolean))].sort((C, T) => C.localeCompare(T, "it")), [e]), m = R.useMemo(() => {
    const C = pa(t.trim());
    return e.filter((T) => !(C && !pa(`${T.displayName} ${T.realTeam} ${T.ownerTag}`).includes(C) || c && !T.isFreeAgent || r !== "Tutti" && T.role !== r || i !== "Tutti" && T.realTeam !== i || a !== "Tutti" && T.ownerTag !== a));
  }, [e, a, r, t, c, i]), y = R.useMemo(() => [...m].sort((C, T) => {
    if (v === "position") {
      const be = (ca[C.role] ?? 9) - (ca[T.role] ?? 9), et = w === "asc" ? be : -be;
      if (et !== 0)
        return et;
      const vn = C.realTeam.localeCompare(T.realTeam, "it");
      if (vn !== 0)
        return vn;
      const sr = T.quotation - C.quotation;
      return sr !== 0 ? sr : C.displayName.localeCompare(T.displayName, "it");
    }
    const K = (C[v] || 0) - (T[v] || 0);
    return w === "asc" ? K : -K;
  }), [m, w, v]), k = !!(t || r !== "Tutti" || i !== "Tutti" || a !== "Tutti" || c), N = () => {
    n(""), l("Tutti"), s("Tutti"), u("Tutti"), d(!1), h("position"), g("asc");
  }, E = (C) => {
    if (v === C) {
      w === "desc" || h("position"), g("asc");
      return;
    }
    h(C), g("desc");
  }, P = (C) => {
    z((T) => {
      const K = new Set(T);
      return K.has(C) ? K.delete(C) : K.add(C), K;
    });
  };
  return /* @__PURE__ */ o.jsx("div", { className: "tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-7xl", children: [
    /* @__PURE__ */ o.jsx("div", { className: "tw-flex tw-justify-end tw-p-4 sm:tw-p-6 lg:tw-p-8", children: /* @__PURE__ */ o.jsxs("div", { className: "tw-flex tw-w-full tw-flex-wrap tw-items-stretch tw-gap-2 lg:tw-ml-auto lg:tw-w-auto lg:tw-justify-end", children: [
      /* @__PURE__ */ o.jsxs("label", { className: "lf-search tw-min-w-0 tw-flex-1 lg:tw-w-80 lg:tw-flex-none", children: [
        /* @__PURE__ */ o.jsx(fa, { size: 20 }),
        /* @__PURE__ */ o.jsx("input", { type: "search", placeholder: "Cerca giocatore...", value: t, onChange: (C) => n(C.target.value) })
      ] }),
      /* @__PURE__ */ o.jsxs("button", { type: "button", onClick: () => d((C) => !C), className: `lf-action-button ${c ? "lf-action-button--active" : ""}`, title: "Mostra solo giocatori svincolati", children: [
        /* @__PURE__ */ o.jsx(hp, { size: 20 }),
        /* @__PURE__ */ o.jsx("span", { className: "tw-hidden sm:tw-inline", children: "Svincolati" })
      ] }),
      k && /* @__PURE__ */ o.jsx("button", { type: "button", onClick: N, className: "lf-reset-button tw-hidden md:tw-flex", title: "Azzera filtri", children: /* @__PURE__ */ o.jsx(Ac, { size: 20 }) })
    ] }) }),
    /* @__PURE__ */ o.jsxs("div", { className: "tw-px-3 sm:tw-px-6 lg:tw-px-8", children: [
      /* @__PURE__ */ o.jsx(
        kp,
        {
          teams: p,
          owners: f,
          currentRole: r,
          currentTeam: i,
          currentOwner: a,
          hasActiveFilters: k,
          onRoleChange: l,
          onTeamChange: s,
          onOwnerChange: u,
          onResetFilters: N
        }
      ),
      /* @__PURE__ */ o.jsxs("div", { className: "tw-mb-3 tw-flex tw-items-center tw-justify-between tw-text-xs tw-font-semibold tw-text-slate-500", children: [
        /* @__PURE__ */ o.jsxs("span", { children: [
          y.length,
          " risultati"
        ] }),
        y.length !== e.length && /* @__PURE__ */ o.jsxs("span", { children: [
          "su ",
          e.length
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "lf-list-table", children: [
        /* @__PURE__ */ o.jsx(Np, { sortKey: v, sortDirection: w, onSort: E }),
        /* @__PURE__ */ o.jsx("div", { className: "tw-hidden tw-divide-y tw-divide-slate-100 md:tw-block", children: y.map((C) => ma(C) ? /* @__PURE__ */ o.jsx(da, { asset: C, expanded: x.has(C.assetCode), onToggle: () => P(C.assetCode) }, C.assetCode) : /* @__PURE__ */ o.jsx(Sp, { player: C }, C.assetCode)) }),
        /* @__PURE__ */ o.jsx("div", { className: "tw-divide-y tw-divide-slate-100 md:tw-hidden", children: y.map((C) => ma(C) ? /* @__PURE__ */ o.jsx(da, { asset: C, expanded: x.has(C.assetCode), onToggle: () => P(C.assetCode) }, C.assetCode) : /* @__PURE__ */ o.jsx(Cp, { player: C }, C.assetCode)) }),
        y.length === 0 && /* @__PURE__ */ o.jsxs("div", { className: "tw-px-6 tw-py-14 tw-text-center", children: [
          /* @__PURE__ */ o.jsx(fa, { size: 34, className: "tw-mx-auto tw-mb-3 tw-text-slate-300" }),
          /* @__PURE__ */ o.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-slate-800", children: "Nessun giocatore trovato" }),
          /* @__PURE__ */ o.jsx("p", { className: "tw-mb-0 tw-mt-1 tw-text-sm tw-text-slate-500", children: "Prova a modificare i filtri di ricerca." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "tw-h-4 sm:tw-h-6" })
  ] }) });
}
function _p(e) {
  return e.map((t) => ({
    ...t,
    purchasePrice: t.purchasePrice ?? 0
  }));
}
function oi() {
  var e, t, n, r;
  return {
    state: ((t = (e = window.LineupLeagueData) == null ? void 0 : e.getState) == null ? void 0 : t.call(e)) ?? { status: "idle" },
    assets: _p(((r = (n = window.LineupLeagueData) == null ? void 0 : n.getAssets) == null ? void 0 : r.call(n)) ?? [])
  };
}
function $c() {
  var s;
  const e = R.useMemo(oi, []), [t, n] = R.useState(e.state), [r, l] = R.useState(e.assets), i = (s = window.LINEUP_FANTA) == null ? void 0 : s.league;
  return R.useEffect(() => {
    let a = !1, u = 0;
    const c = () => {
      if (a)
        return;
      const v = oi();
      n(v.state), l(v.assets), u += 1, v.state.status !== "ready" && u < 20 && window.setTimeout(c, 150);
    }, d = (v) => {
      if (v.detail.leagueId !== (i == null ? void 0 : i.id))
        return;
      const h = oi();
      n(h.state), l(h.assets);
    };
    return document.addEventListener("lineup:league-assets-ready", d), c(), () => {
      a = !0, document.removeEventListener("lineup:league-assets-ready", d);
    };
  }, [i == null ? void 0 : i.id]), { state: t, assets: r, league: i };
}
function Pp() {
  const { state: e, assets: t } = $c();
  return e.status === "error" ? /* @__PURE__ */ o.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ o.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-red-600", children: "Errore nel caricamento del Listone" }),
    /* @__PURE__ */ o.jsx("p", { className: "tw-mb-0 tw-mt-2 tw-text-sm tw-text-slate-500", children: "Controlla il CSV della lega e ricarica la pagina." })
  ] }) }) : e.status !== "ready" ? /* @__PURE__ */ o.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ o.jsx("div", { className: "lf-spinner tw-mx-auto tw-mb-3" }),
    /* @__PURE__ */ o.jsx("p", { className: "tw-m-0 tw-text-sm tw-font-semibold tw-text-slate-500", children: "Caricamento del Listone…" })
  ] }) }) : /* @__PURE__ */ o.jsx(Ep, { assets: t });
}
function Tp(e) {
  return e.split(/\s+-\s+/).map((t) => t.trim()).filter(Boolean);
}
function zp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function Er({ players: e, role: t, label: n }) {
  const [r, l] = R.useState(/* @__PURE__ */ new Set()), i = e.filter((a) => a.role === t).sort((a, u) => {
    const c = u.purchasePrice - a.purchasePrice;
    return c !== 0 ? c : a.displayName.localeCompare(u.displayName, "it");
  }), s = (a) => {
    l((u) => {
      const c = new Set(u);
      return c.has(a) ? c.delete(a) : c.add(a), c;
    });
  };
  return /* @__PURE__ */ o.jsxs("section", { className: "lf-squad-section", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "lf-squad-section__title", children: [
      n,
      t === "P" ? " (Blocchi)" : ""
    ] }),
    i.length === 0 ? /* @__PURE__ */ o.jsx("div", { className: "lf-squad-empty", children: "—" }) : /* @__PURE__ */ o.jsx("div", { className: "lf-squad-list", children: i.map((a) => {
      const u = t === "P" && (a.type === "goalkeeper_block" || /\s+-\s+/.test(a.displayName)), c = r.has(a.assetCode), d = u ? Tp(a.displayName) : [], v = /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
        /* @__PURE__ */ o.jsxs("div", { className: "lf-squad-item__left", children: [
          /* @__PURE__ */ o.jsx("div", { className: `lf-squad-avatar lf-squad-avatar--${t.toLowerCase()}`, "aria-hidden": "true", children: u ? /* @__PURE__ */ o.jsx(pl, { size: 17 }) : zp(a.displayName) }),
          /* @__PURE__ */ o.jsxs("div", { className: "lf-squad-item__copy", children: [
            /* @__PURE__ */ o.jsxs("div", { className: "lf-squad-item__name", children: [
              u ? `Blocco ${a.realTeam || a.displayName}` : a.displayName,
              !a.active && " *",
              u && /* @__PURE__ */ o.jsx(He, { size: 14, className: c ? "lf-chevron-open" : "" })
            ] }),
            /* @__PURE__ */ o.jsx("div", { className: "lf-squad-item__team", children: u ? `${d.length} portieri` : a.realTeam || "—" })
          ] })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "lf-squad-values", children: [
          /* @__PURE__ */ o.jsxs("span", { children: [
            /* @__PURE__ */ o.jsx("small", { children: "Q" }),
            /* @__PURE__ */ o.jsx("strong", { children: a.quotation || "—" })
          ] }),
          /* @__PURE__ */ o.jsxs("span", { children: [
            /* @__PURE__ */ o.jsx("small", { children: "P" }),
            /* @__PURE__ */ o.jsx("strong", { className: "lf-squad-price", children: a.purchasePrice || "—" })
          ] })
        ] })
      ] });
      return /* @__PURE__ */ o.jsxs("div", { className: "lf-squad-item-wrap", children: [
        u ? /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "lf-squad-item lf-squad-item--clickable",
            onClick: () => s(a.assetCode),
            "aria-expanded": c,
            children: v
          }
        ) : /* @__PURE__ */ o.jsx("div", { className: "lf-squad-item", children: v }),
        u && c && /* @__PURE__ */ o.jsx("div", { className: "lf-squad-goalkeepers", children: d.map((h) => /* @__PURE__ */ o.jsxs("div", { className: "lf-squad-goalkeeper", children: [
          /* @__PURE__ */ o.jsx("div", { className: "lf-squad-goalkeeper__avatar", children: "P" }),
          /* @__PURE__ */ o.jsx("span", { children: h })
        ] }, h)) })
      ] }, a.assetCode);
    }) })
  ] });
}
const ai = { P: 2, D: 8, C: 8, A: 6 }, Lp = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 });
function Rp({ team: e }) {
  const [t, n] = R.useState("ALL"), [r, l] = R.useState(!1), i = (u) => {
    n((c) => c === u ? "ALL" : u);
  }, s = !!(e.logoUrl && !r), a = e.credits === null ? "—" : Lp.format(e.credits);
  return /* @__PURE__ */ o.jsxs("article", { className: "lf-team-card", children: [
    /* @__PURE__ */ o.jsxs("header", { className: "lf-team-card__header", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "lf-team-card__identity", children: [
        /* @__PURE__ */ o.jsx("div", { className: `lf-team-card__avatar ${s ? "has-logo" : ""}`, children: s ? /* @__PURE__ */ o.jsx(
          "img",
          {
            src: e.logoUrl,
            alt: `Logo di ${e.managerName}`,
            loading: "lazy",
            referrerPolicy: "no-referrer",
            onError: () => l(!0)
          }
        ) : e.managerName.charAt(0).toUpperCase() }),
        /* @__PURE__ */ o.jsxs("div", { className: "lf-team-card__copy", children: [
          /* @__PURE__ */ o.jsx("span", { className: "lf-team-card__eyebrow", children: "Allenatore" }),
          /* @__PURE__ */ o.jsx("h2", { title: e.managerName, children: e.managerName })
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "lf-team-card__meta", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "lf-team-card__credits", children: [
          /* @__PURE__ */ o.jsx("span", { children: "Crediti" }),
          /* @__PURE__ */ o.jsxs("strong", { children: [
            /* @__PURE__ */ o.jsx(gp, { size: 16 }),
            " ",
            a
          ] })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: `lf-team-status ${e.isComplete ? "lf-team-status--complete" : "lf-team-status--incomplete"}`, children: [
          e.isComplete ? /* @__PURE__ */ o.jsx(pl, { size: 13 }) : /* @__PURE__ */ o.jsx(yp, { size: 13 }),
          e.isComplete ? "ROSA COMPLETA" : "INCOMPLETA"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "lf-team-role-filters", "aria-label": `Filtra la rosa di ${e.managerName} per ruolo`, children: Object.keys(ai).map((u) => {
      const c = e.roleCounts[u] === ai[u];
      return /* @__PURE__ */ o.jsxs(
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
            ai[u]
          ]
        },
        u
      );
    }) }),
    /* @__PURE__ */ o.jsx("div", { className: "lf-team-roster-frame", children: /* @__PURE__ */ o.jsxs("div", { className: "lf-team-roster", children: [
      (t === "ALL" || t === "P") && /* @__PURE__ */ o.jsx(Er, { players: e.players, role: "P", label: "Portieri" }),
      (t === "ALL" || t === "D") && /* @__PURE__ */ o.jsx(Er, { players: e.players, role: "D", label: "Difensori" }),
      (t === "ALL" || t === "C") && /* @__PURE__ */ o.jsx(Er, { players: e.players, role: "C", label: "Centrocampisti" }),
      (t === "ALL" || t === "A") && /* @__PURE__ */ o.jsx(Er, { players: e.players, role: "A", label: "Attaccanti" })
    ] }) })
  ] });
}
function ui(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Fp(e) {
  if (typeof e == "number" && Number.isFinite(e))
    return e;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e.trim().replace(",", "."));
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function Mp(e) {
  if (!ui(e))
    return {};
  const t = ui(e.teams) ? e.teams : e;
  return Object.entries(t).reduce((n, [r, l]) => {
    if (!ui(l))
      return n;
    const i = l, s = i.logoUrl ?? i.logo_url;
    return n[r] = {
      credits: Fp(i.credits),
      logoUrl: typeof s == "string" ? s.trim() : ""
    }, n;
  }, {});
}
async function Dp(e, t) {
  if (!e)
    return {};
  const n = t || `/data/${encodeURIComponent(e)}/teams.json`, r = await fetch(n, { cache: "no-store" });
  if (r.status === 404)
    return {};
  if (!r.ok)
    throw new Error(`Impossibile caricare i profili rose: HTTP ${r.status}`);
  return Mp(await r.json());
}
const ha = { P: 2, D: 8, C: 8, A: 6 };
function Ip({ assets: e, leagueId: t, profilesUrl: n }) {
  const [r, l] = R.useState({});
  R.useEffect(() => {
    let s = !1;
    return Dp(t, n).then((a) => {
      s || l(a);
    }).catch((a) => {
      console.warn("Team profiles load error", a), s || l({});
    }), () => {
      s = !0;
    };
  }, [t, n]);
  const i = R.useMemo(() => {
    const s = /* @__PURE__ */ new Map();
    return e.forEach((u) => {
      if (u.isFreeAgent || !u.ownerTag)
        return;
      const c = u.ownerTag.trim();
      if (!c)
        return;
      const d = s.get(c) ?? [];
      d.push(u), s.set(c, d);
    }), [...s.entries()].map(([u, c]) => {
      const d = { P: 0, D: 0, C: 0, A: 0 };
      c.forEach((w) => {
        w.role in d && (d[w.role] += 1);
      });
      const v = Object.keys(ha).every((w) => d[w] === ha[w]), h = r[u];
      return {
        managerName: u,
        credits: (h == null ? void 0 : h.credits) ?? null,
        logoUrl: (h == null ? void 0 : h.logoUrl) ?? "",
        players: c,
        isComplete: v,
        roleCounts: d,
        totalPlayers: c.length
      };
    }).sort((u, c) => {
      const d = u.managerName.includes("-"), v = c.managerName.includes("-");
      return d !== v ? d ? 1 : -1 : u.managerName.localeCompare(c.managerName, "it");
    });
  }, [e, r]);
  return /* @__PURE__ */ o.jsx("div", { className: "tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7", children: /* @__PURE__ */ o.jsx("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-7xl", children: i.length > 0 ? /* @__PURE__ */ o.jsx("div", { className: "lf-teams-grid", children: i.map((s) => /* @__PURE__ */ o.jsx(Rp, { team: s }, s.managerName)) }) : /* @__PURE__ */ o.jsxs("div", { className: "lf-teams-empty", children: [
    /* @__PURE__ */ o.jsx(mp, { size: 34 }),
    /* @__PURE__ */ o.jsx("h2", { children: "Nessuna rosa disponibile" }),
    /* @__PURE__ */ o.jsx("p", { children: "Nel CSV non risultano asset assegnati a un proprietario." })
  ] }) }) });
}
function Op() {
  var r;
  const { state: e, assets: t, league: n } = $c();
  return e.status === "error" ? /* @__PURE__ */ o.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ o.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-red-600", children: "Errore nel caricamento delle Rose" }),
    /* @__PURE__ */ o.jsx("p", { className: "tw-mb-0 tw-mt-2 tw-text-sm tw-text-slate-500", children: "Controlla il CSV della lega e ricarica la pagina." })
  ] }) }) : e.status !== "ready" ? /* @__PURE__ */ o.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ o.jsx("div", { className: "lf-spinner tw-mx-auto tw-mb-3" }),
    /* @__PURE__ */ o.jsx("p", { className: "tw-m-0 tw-text-sm tw-font-semibold tw-text-slate-500", children: "Caricamento delle Rose…" })
  ] }) }) : /* @__PURE__ */ o.jsx(Ip, { assets: t, leagueId: (n == null ? void 0 : n.id) ?? "", profilesUrl: (r = n == null ? void 0 : n.leagueData) == null ? void 0 : r.teamProfilesUrl });
}
function va(e) {
  const t = [];
  let n = "", r = !1;
  for (let l = 0; l < e.length; l += 1) {
    const i = e[l];
    i === '"' ? r && e[l + 1] === '"' ? (n += '"', l += 1) : r = !r : i === "," && !r ? (t.push(n), n = "") : n += i;
  }
  return t.push(n), t.map((l) => l.trim());
}
function rs(e) {
  const t = String(e ?? "").trim().replace(",", ".");
  if (!t)
    return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}
function _r(e) {
  const t = rs(e);
  return t === null ? null : Math.trunc(t);
}
function Ap(e, t) {
  const n = String(e ?? "").replace(/^\uFEFF/, "").split(/\r?\n/).filter((a) => a.trim().length > 0);
  if (n.length === 0)
    return [];
  const r = va(n[0]).map((a) => a.toLowerCase()), l = (a) => r.indexOf(a);
  if ([
    "real_round_number",
    "fantasy_matchday_number",
    "home_team",
    "away_team"
  ].some((a) => l(a) < 0))
    throw new Error("Il CSV Calendario non contiene tutte le colonne richieste.");
  const s = /* @__PURE__ */ new Map();
  for (const a of n.slice(1)) {
    const u = va(a), c = _r(u[l("fantasy_matchday_number")]), d = _r(u[l("real_round_number")]), v = String(u[l("home_team")] ?? "").trim(), h = String(u[l("away_team")] ?? "").trim();
    if (c === null || d === null || !v || !h)
      continue;
    const w = {
      realRoundNumber: d,
      fantasyMatchdayNumber: c,
      status: "da_calcolare",
      homeTeam: v,
      awayTeam: h,
      homeTotal: rs(u[l("home_total")]),
      awayTotal: rs(u[l("away_total")]),
      homeGoals: _r(u[l("home_goals")]),
      awayGoals: _r(u[l("away_goals")]),
      note: String(u[l("note")] ?? "").trim()
    }, g = s.get(c) ?? [];
    g.push(w), s.set(c, g);
  }
  return Array.from(s.entries()).map(([a, u]) => {
    var v;
    const d = u.length === t && u.every((h) => h.homeGoals !== null && h.awayGoals !== null) ? "calcolata" : "da_calcolare";
    return {
      fantasyMatchdayNumber: a,
      realRoundNumber: ((v = u[0]) == null ? void 0 : v.realRoundNumber) ?? a,
      status: d,
      matches: u.map((h) => ({ ...h, status: d }))
    };
  }).sort((a, u) => a.realRoundNumber - u.realRoundNumber || a.fantasyMatchdayNumber - u.fantasyMatchdayNumber);
}
function ga(e) {
  return e === null ? "" : new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(e) ? 0 : 1
  }).format(e);
}
function Uc(e) {
  return [...e].sort((t, n) => t.realRoundNumber - n.realRoundNumber || t.fantasyMatchdayNumber - n.fantasyMatchdayNumber);
}
function ya(e) {
  var r;
  const t = Uc(e), n = t.find((l) => l.status === "da_calcolare");
  return (n == null ? void 0 : n.realRoundNumber) ?? ((r = t[t.length - 1]) == null ? void 0 : r.realRoundNumber) ?? 0;
}
function $p({
  competitionLabel: e,
  leagueName: t,
  matchdays: n,
  expectedMatches: r
}) {
  const l = R.useMemo(() => Uc(n), [n]), [i, s] = R.useState(
    () => ya(l)
  );
  R.useEffect(() => {
    l.some(
      (d) => d.realRoundNumber === i
    ) || s(ya(l));
  }, [l, i]);
  const a = R.useMemo(
    () => l.findIndex(
      (d) => d.realRoundNumber === i
    ),
    [l, i]
  ), u = a >= 0 ? l[a] : void 0;
  if (l.length === 0)
    return /* @__PURE__ */ o.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-calendar-state", children: [
      /* @__PURE__ */ o.jsx("strong", { children: "Calendario non ancora disponibile" }),
      /* @__PURE__ */ o.jsxs("p", { children: [
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
  return /* @__PURE__ */ o.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-calendar-card", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "lf-calendar-toolbar", children: [
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "lf-calendar-nav",
          onClick: () => s(
            l[a - 1].realRoundNumber
          ),
          disabled: a <= 0,
          "aria-label": "Giornata precedente",
          children: "‹"
        }
      ),
      /* @__PURE__ */ o.jsxs("label", { className: "lf-calendar-select-wrap", children: [
        /* @__PURE__ */ o.jsxs("span", { children: [
          "Giornata ",
          e
        ] }),
        /* @__PURE__ */ o.jsx(
          "select",
          {
            value: u.realRoundNumber,
            onChange: (d) => s(Number(d.target.value)),
            children: l.map((d) => /* @__PURE__ */ o.jsx(
              "option",
              {
                value: d.realRoundNumber,
                children: d.realRoundNumber
              },
              `${d.realRoundNumber}-${d.fantasyMatchdayNumber}`
            ))
          }
        ),
        /* @__PURE__ */ o.jsxs("small", { children: [
          "Giornata Fanta ",
          u.fantasyMatchdayNumber
        ] })
      ] }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "lf-calendar-nav",
          onClick: () => s(
            l[a + 1].realRoundNumber
          ),
          disabled: a >= l.length - 1,
          "aria-label": "Giornata successiva",
          children: "›"
        }
      )
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "lf-calendar-summary", children: /* @__PURE__ */ o.jsxs("div", { className: "lf-calendar-status-wrap", children: [
      /* @__PURE__ */ o.jsx("span", { className: `lf-calendar-status lf-calendar-status--${u.status}`, children: u.status === "calcolata" ? "Calcolata" : "Da calcolare" }),
      /* @__PURE__ */ o.jsxs("small", { children: [
        c,
        "/",
        r,
        " risultati"
      ] })
    ] }) }),
    /* @__PURE__ */ o.jsx("div", { className: "lf-calendar-matches", children: u.matches.map((d, v) => {
      const h = d.homeGoals !== null && d.awayGoals !== null;
      return /* @__PURE__ */ o.jsxs(
        "article",
        {
          className: `lf-calendar-match${h ? "" : " is-pending"}`,
          children: [
            /* @__PURE__ */ o.jsxs("div", { className: "lf-calendar-team lf-calendar-team--home", children: [
              /* @__PURE__ */ o.jsx("strong", { children: d.homeTeam }),
              d.homeTotal !== null && /* @__PURE__ */ o.jsx("span", { children: ga(d.homeTotal) })
            ] }),
            /* @__PURE__ */ o.jsx(
              "div",
              {
                className: "lf-calendar-score",
                "aria-label": h ? `${d.homeGoals} a ${d.awayGoals}` : "Risultato non disponibile",
                children: h ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
                  /* @__PURE__ */ o.jsx("b", { children: d.homeGoals }),
                  /* @__PURE__ */ o.jsx("i", { children: "–" }),
                  /* @__PURE__ */ o.jsx("b", { children: d.awayGoals })
                ] }) : /* @__PURE__ */ o.jsx("em", { children: "–" })
              }
            ),
            /* @__PURE__ */ o.jsxs("div", { className: "lf-calendar-team lf-calendar-team--away", children: [
              /* @__PURE__ */ o.jsx("strong", { children: d.awayTeam }),
              d.awayTotal !== null && /* @__PURE__ */ o.jsx("span", { children: ga(d.awayTotal) })
            ] }),
            d.note && /* @__PURE__ */ o.jsx("p", { className: "lf-calendar-note", children: d.note })
          ]
        },
        `${u.fantasyMatchdayNumber}-${d.homeTeam}-${d.awayTeam}-${v}`
      );
    }) })
  ] }) });
}
function Up() {
  var v, h, w, g;
  const e = (v = window.LINEUP_FANTA) == null ? void 0 : v.league, t = ((h = e == null ? void 0 : e.leagueData) == null ? void 0 : h.calendarCsvUrl) ?? "", n = ((w = e == null ? void 0 : e.leagueData) == null ? void 0 : w.calendarExpectedMatches) ?? 4, r = ((g = e == null ? void 0 : e.leagueData) == null ? void 0 : g.calendarCompetitionLabel) ?? ((e == null ? void 0 : e.id) === "pd" ? "Liga" : "Premier League"), [l, i] = R.useState("loading"), [s, a] = R.useState([]), [u, c] = R.useState("");
  R.useEffect(() => {
    const x = new AbortController();
    async function z() {
      if (!t) {
        a([]), i("ready");
        return;
      }
      i("loading"), c("");
      try {
        const p = t.includes("?") ? "&" : "?", f = await fetch(
          `${t}${p}v=${Date.now()}`,
          { cache: "no-store", signal: x.signal }
        );
        if (!f.ok)
          throw new Error(`HTTP ${f.status}`);
        const m = await f.text(), y = Ap(m, n);
        a(y), i("ready");
      } catch (p) {
        if (x.signal.aborted)
          return;
        console.error("Calendar load error", p), c("Il Calendario non è disponibile. Controlla la fonte configurata e riprova."), i("error");
      }
    }
    return z(), () => x.abort();
  }, [t, n]);
  const d = R.useMemo(() => (e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.name) ?? "Lega", [e]);
  return l === "loading" ? /* @__PURE__ */ o.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-calendar-state", children: [
    /* @__PURE__ */ o.jsx("div", { className: "lf-spinner" }),
    /* @__PURE__ */ o.jsx("p", { children: "Caricamento del Calendario…" })
  ] }) }) : l === "error" ? /* @__PURE__ */ o.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-calendar-state lf-calendar-state--error", children: [
    /* @__PURE__ */ o.jsx("strong", { children: "Errore nel caricamento" }),
    /* @__PURE__ */ o.jsx("p", { children: u })
  ] }) }) : /* @__PURE__ */ o.jsx(
    $p,
    {
      competitionLabel: r,
      leagueName: d,
      matchdays: s,
      expectedMatches: n
    }
  );
}
function Bp(e) {
  const t = [];
  let n = [], r = "", l = !1;
  const i = String(e ?? "").replace(/^\uFEFF/, "");
  for (let s = 0; s < i.length; s += 1) {
    const a = i[s];
    if (a === '"') {
      l && i[s + 1] === '"' ? (r += '"', s += 1) : l = !l;
      continue;
    }
    if (a === "," && !l) {
      n.push(r.trim()), r = "";
      continue;
    }
    if ((a === `
` || a === "\r") && !l) {
      a === "\r" && i[s + 1] === `
` && (s += 1), n.push(r.trim()), n.some((u) => u.length > 0) && t.push(n), n = [], r = "";
      continue;
    }
    r += a;
  }
  return n.push(r.trim()), n.some((s) => s.length > 0) && t.push(n), t;
}
function rn(e) {
  return String(e ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}
function Pr(e) {
  return rn(e).replace(/[‐‑‒–—]/g, "-").replace(/\s*-\s*/g, "-").replace(/[^a-z0-9-]/g, "");
}
function Br(e) {
  const t = String(e ?? "").trim().replace(/\s+/g, "").replace(",", ".");
  if (!t)
    return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}
function Nt(e) {
  const t = Br(e);
  return t === null ? null : Math.trunc(t);
}
function fe(e, t, n = 0) {
  const r = rn(t);
  for (let l = n; l < e.length; l += 1)
    if (rn(e[l]) === r)
      return l;
  return -1;
}
function Vp(e) {
  const t = Bp(e), n = [
    "Nome",
    "Punti",
    "Vittorie",
    "Pareggi",
    "Sconfitte",
    "Gol Fatti",
    "Gol Subiti",
    "Differenza Reti",
    "Fanta Punti"
  ], r = t.findIndex(
    (g) => n.every((x) => fe(g, x) >= 0)
  );
  if (r < 0)
    throw new Error("Il CSV Classifica non contiene le colonne richieste.");
  const l = t[r], i = {
    name: fe(l, "Nome"),
    points: fe(l, "Punti"),
    wins: fe(l, "Vittorie"),
    draws: fe(l, "Pareggi"),
    losses: fe(l, "Sconfitte"),
    goalsFor: fe(l, "Gol Fatti"),
    goalsAgainst: fe(l, "Gol Subiti"),
    goalDifference: fe(l, "Differenza Reti"),
    fantasyPoints: fe(l, "Fanta Punti")
  }, s = [];
  for (const g of t.slice(r + 1)) {
    const x = String(g[i.name] ?? "").trim();
    if (g.map(rn).join("|").includes("classifica per fp"))
      break;
    if (!x)
      continue;
    const p = Nt(g[i.points]), f = Nt(g[i.wins]), m = Nt(g[i.draws]), y = Nt(g[i.losses]), k = Nt(g[i.goalsFor]), N = Nt(g[i.goalsAgainst]), E = Nt(g[i.goalDifference]), P = Br(g[i.fantasyPoints]);
    p === null || f === null || m === null || y === null || k === null || N === null || P === null || s.push({
      team: x,
      points: p,
      wins: f,
      draws: m,
      losses: y,
      goalsFor: k,
      goalsAgainst: N,
      goalDifference: E ?? k - N,
      fantasyPoints: P,
      played: f + m + y
    });
  }
  const a = t.findIndex(
    (g) => g.some((x) => rn(x) === "classifica per fp")
  ), u = /* @__PURE__ */ new Map(), c = [];
  if (a >= 0) {
    const g = t.findIndex((x, z) => {
      if (z <= a)
        return !1;
      const p = x.map(rn);
      return p.filter((f) => f === "nome").length >= 2 && p.includes("fanta punti") && p.includes("penalita");
    });
    if (g >= 0) {
      const x = t[g], z = fe(x, "Nome"), p = fe(x, "Fanta Punti", z + 1), f = fe(x, "Nome", p + 1), m = fe(x, "Penalità", f + 1);
      for (const y of t.slice(g + 1)) {
        const k = String(y[z] ?? "").trim(), N = Br(y[p]);
        k && N !== null && c.push({ team: k, fantasyPoints: N });
        const E = String(y[f] ?? "").trim(), P = Br(y[m]);
        E && P !== null && P > 0 && u.set(Pr(E), P);
      }
    }
  }
  const d = s.map((g, x) => ({
    ...g,
    position: x + 1,
    penalty: u.get(Pr(g.team)) ?? 0
  })), v = new Map(
    d.map((g) => [Pr(g.team), g])
  ), w = (c.length > 0 ? c : d.map((g) => ({ team: g.team, fantasyPoints: g.fantasyPoints })).sort((g, x) => x.fantasyPoints - g.fantasyPoints)).map((g, x) => {
    var z;
    return {
      position: x + 1,
      team: g.team,
      fantasyPoints: g.fantasyPoints,
      leaguePosition: ((z = v.get(Pr(g.team))) == null ? void 0 : z.position) ?? null
    };
  });
  return { league: d, fantasy: w };
}
function ls(e) {
  return new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(e) ? 0 : 1
  }).format(e);
}
function Hp(e) {
  return e > 0 ? `+${e}` : String(e);
}
function wa({ team: e, penalty: t = 0 }) {
  const n = e.trim().charAt(0).toUpperCase() || "?";
  return /* @__PURE__ */ o.jsxs("div", { className: "lf-standings-team-cell", children: [
    /* @__PURE__ */ o.jsx("span", { className: "lf-standings-team-mark", "aria-hidden": "true", children: n }),
    /* @__PURE__ */ o.jsx("strong", { children: e }),
    t > 0 && /* @__PURE__ */ o.jsxs("span", { className: "lf-standings-penalty", title: `Penalizzazione di ${t} punti`, children: [
      "−",
      ls(t)
    ] })
  ] });
}
function lfSortStandingsRows(e, t) {
  return t ? [...e].sort((n, r) => (t.direction === "desc" ? r[t.key] - n[t.key] : n[t.key] - r[t.key]) || n.position - r.position) : e;
}
function lfStandingsSortHeader({
  label: e,
  sortKey: t,
  sort: n,
  onSort: r
}) {
  const l = (n == null ? void 0 : n.key) === t, i = l ? n.direction === "desc" ? "descending" : "ascending" : "none", s = l ? n.direction === "desc" ? "decrescente" : "crescente" : "ordine classifica";
  return /* @__PURE__ */ o.jsx("th", { scope: "col", "aria-sort": i, className: l ? "is-sorted" : "", children: /* @__PURE__ */ o.jsxs(
    "button",
    {
      type: "button",
      className: "lf-standings-sort-button",
      onClick: () => r(t),
      title: `${e}: ${s}`,
      "aria-label": `Ordina ${e}. Stato attuale: ${s}.`,
      children: [
        /* @__PURE__ */ o.jsx("span", { children: e }),
        /* @__PURE__ */ o.jsx("span", { className: "lf-standings-sort-icon", "aria-hidden": "true", children: l ? n.direction === "desc" ? "↓" : "↑" : "↕" })
      ]
    }
  ) });
}
function Qp({ data: e, leagueName: t }) {
  const [n, r] = R.useState("league"), [l, i] = R.useState(null), s = R.useMemo(
    () => lfSortStandingsRows(e.league, l),
    [e.league, l]
  );
  function a(u) {
    i((c) => !c || c.key !== u ? { key: u, direction: "desc" } : c.direction === "desc" ? { key: u, direction: "asc" } : null);
  }
  return e.league.length === 0 ? /* @__PURE__ */ o.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-standings-state", children: [
    /* @__PURE__ */ o.jsx("strong", { children: "Classifica non ancora disponibile" }),
    /* @__PURE__ */ o.jsxs("p", { children: [
      "La fonte di ",
      t,
      " non è stata ancora configurata."
    ] })
  ] }) }) : /* @__PURE__ */ o.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-standings-card", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "lf-standings-toolbar", role: "tablist", "aria-label": "Tipo di classifica", children: [
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: n === "league" ? "is-active" : "",
          role: "tab",
          "aria-selected": n === "league",
          onClick: () => r("league"),
          children: "Classifica"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: n === "fantasy" ? "is-active" : "",
          role: "tab",
          "aria-selected": n === "fantasy",
          onClick: () => r("fantasy"),
          children: "Fanta punti"
        }
      )
    ] }),
    n === "league" ? /* @__PURE__ */ o.jsx("div", { className: "lf-standings-table-wrap", role: "region", "aria-label": "Classifica generale", tabIndex: 0, children: /* @__PURE__ */ o.jsxs("table", { className: "lf-standings-table", children: [
      /* @__PURE__ */ o.jsx("thead", { children: /* @__PURE__ */ o.jsxs("tr", { children: [
        /* @__PURE__ */ o.jsx("th", { className: "lf-standings-rank-col", scope: "col", children: "#" }),
        /* @__PURE__ */ o.jsx("th", { className: "lf-standings-team-col", scope: "col", children: "Squadra" }),
        /* @__PURE__ */ o.jsx("th", { className: "is-points", scope: "col", children: "Pt" }),
        /* @__PURE__ */ o.jsx("th", { scope: "col", children: "G" }),
        /* @__PURE__ */ o.jsx("th", { scope: "col", children: "V" }),
        /* @__PURE__ */ o.jsx("th", { scope: "col", children: "N" }),
        /* @__PURE__ */ o.jsx("th", { scope: "col", children: "P" }),
        /* @__PURE__ */ o.jsx(lfStandingsSortHeader, { label: "GF", sortKey: "goalsFor", sort: l, onSort: a }),
        /* @__PURE__ */ o.jsx(lfStandingsSortHeader, { label: "GS", sortKey: "goalsAgainst", sort: l, onSort: a }),
        /* @__PURE__ */ o.jsx("th", { scope: "col", children: "DR" }),
        /* @__PURE__ */ o.jsx("th", { scope: "col", children: "FP" })
      ] }) }),
      /* @__PURE__ */ o.jsx("tbody", { children: s.map((u, c) => {
        const d = l ? c + 1 : u.position;
        return /* @__PURE__ */ o.jsxs("tr", { className: d <= 3 ? `is-top-${d}` : "", children: [
          /* @__PURE__ */ o.jsx("td", { className: "lf-standings-rank-col", children: /* @__PURE__ */ o.jsx("b", { children: d }) }),
          /* @__PURE__ */ o.jsx("td", { className: "lf-standings-team-col", children: /* @__PURE__ */ o.jsx(wa, { team: u.team, penalty: u.penalty }) }),
          /* @__PURE__ */ o.jsx("td", { className: "is-points", children: /* @__PURE__ */ o.jsx("strong", { children: u.points }) }),
          /* @__PURE__ */ o.jsx("td", { children: u.played }),
          /* @__PURE__ */ o.jsx("td", { children: u.wins }),
          /* @__PURE__ */ o.jsx("td", { children: u.draws }),
          /* @__PURE__ */ o.jsx("td", { children: u.losses }),
          /* @__PURE__ */ o.jsx("td", { children: u.goalsFor }),
          /* @__PURE__ */ o.jsx("td", { children: u.goalsAgainst }),
          /* @__PURE__ */ o.jsx("td", { className: u.goalDifference > 0 ? "is-positive" : u.goalDifference < 0 ? "is-negative" : "", children: Hp(u.goalDifference) }),
          /* @__PURE__ */ o.jsx("td", { children: ls(u.fantasyPoints) })
        ] }, u.team);
      }) })
    ] }) }) : /* @__PURE__ */ o.jsx("div", { className: "lf-standings-fantasy-wrap", children: /* @__PURE__ */ o.jsxs("table", { className: "lf-standings-table lf-standings-table--fantasy", children: [
      /* @__PURE__ */ o.jsx("thead", { children: /* @__PURE__ */ o.jsxs("tr", { children: [
        /* @__PURE__ */ o.jsx("th", { scope: "col", children: "#" }),
        /* @__PURE__ */ o.jsx("th", { scope: "col", children: "Squadra" }),
        /* @__PURE__ */ o.jsx("th", { scope: "col", children: "Fanta punti" })
      ] }) }),
      /* @__PURE__ */ o.jsx("tbody", { children: e.fantasy.map((u) => /* @__PURE__ */ o.jsxs("tr", { className: u.position <= 3 ? `is-top-${u.position}` : "", children: [
        /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsx("b", { children: u.position }) }),
        /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsx(wa, { team: u.team }) }),
        /* @__PURE__ */ o.jsx("td", { className: "is-fantasy-points", children: /* @__PURE__ */ o.jsx("strong", { children: ls(u.fantasyPoints) }) })
      ] }, u.team)) })
    ] }) })
  ] }) });
}
const xa = { league: [], fantasy: [] };
function Wp() {
  var d, v, h;
  const e = (d = window.LINEUP_FANTA) == null ? void 0 : d.league, t = ((v = e == null ? void 0 : e.leagueData) == null ? void 0 : v.standingsCsvUrl) ?? "", n = ((h = e == null ? void 0 : e.leagueData) == null ? void 0 : h.standingsFallbackUrl) ?? "", [r, l] = R.useState("loading"), [i, s] = R.useState(xa), [a, u] = R.useState("");
  R.useEffect(() => {
    const w = new AbortController();
    async function g(z) {
      const p = z.includes("?") ? "&" : "?", f = await fetch(
        `${z}${p}v=${Date.now()}`,
        { cache: "no-store", signal: w.signal }
      );
      if (!f.ok)
        throw new Error(`HTTP ${f.status}`);
      return f.text();
    }
    async function x() {
      if (!t) {
        s(xa), l("ready");
        return;
      }
      l("loading"), u("");
      try {
        let z;
        try {
          z = await g(t);
        } catch (p) {
          if (!n || w.signal.aborted)
            throw p;
          console.warn("Standings primary source unavailable, using fallback", p), z = await g(n);
        }
        s(Vp(z)), l("ready");
      } catch (z) {
        if (w.signal.aborted)
          return;
        console.error("Standings load error", z), u("La Classifica non è disponibile. Controlla la fonte configurata e riprova."), l("error");
      }
    }
    return x(), () => w.abort();
  }, [t, n]);
  const c = R.useMemo(() => (e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.name) ?? "Lega", [e]);
  return r === "loading" ? /* @__PURE__ */ o.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-standings-state", children: [
    /* @__PURE__ */ o.jsx("div", { className: "lf-spinner" }),
    /* @__PURE__ */ o.jsx("p", { children: "Caricamento della Classifica…" })
  ] }) }) : r === "error" ? /* @__PURE__ */ o.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-standings-state lf-standings-state--error", children: [
    /* @__PURE__ */ o.jsx("strong", { children: "Errore nel caricamento" }),
    /* @__PURE__ */ o.jsx("p", { children: a })
  ] }) }) : /* @__PURE__ */ o.jsx(Qp, { data: i, leagueName: c });
}
const Sa = document.getElementById("league-dashboard-root"), ka = document.getElementById("league-rose-root"), Na = document.getElementById("league-calendar-root"), ja = document.getElementById("league-standings-root");
Sa && ln.createRoot(Sa).render(
  /* @__PURE__ */ o.jsx(hl.StrictMode, { children: /* @__PURE__ */ o.jsx(Pp, {}) })
);
ka && ln.createRoot(ka).render(
  /* @__PURE__ */ o.jsx(hl.StrictMode, { children: /* @__PURE__ */ o.jsx(Op, {}) })
);
Na && ln.createRoot(Na).render(
  /* @__PURE__ */ o.jsx(hl.StrictMode, { children: /* @__PURE__ */ o.jsx(Up, {}) })
);
ja && ln.createRoot(ja).render(
  /* @__PURE__ */ o.jsx(hl.StrictMode, { children: /* @__PURE__ */ o.jsx(Wp, {}) })
);
