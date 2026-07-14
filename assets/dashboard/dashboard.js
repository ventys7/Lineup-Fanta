var Bc = Object.defineProperty;
var Vc = (e, t, n) => t in e ? Bc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ur = (e, t, n) => (Vc(e, typeof t != "symbol" ? t + "" : t, n), n);
function Hc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Nu = { exports: {} }, hl = {}, Cu = { exports: {} }, F = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var er = Symbol.for("react.element"), Qc = Symbol.for("react.portal"), Wc = Symbol.for("react.fragment"), Kc = Symbol.for("react.strict_mode"), Gc = Symbol.for("react.profiler"), Yc = Symbol.for("react.provider"), Xc = Symbol.for("react.context"), qc = Symbol.for("react.forward_ref"), Zc = Symbol.for("react.suspense"), Jc = Symbol.for("react.memo"), bc = Symbol.for("react.lazy"), rs = Symbol.iterator;
function ef(e) {
  return e === null || typeof e != "object" ? null : (e = rs && e[rs] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Eu = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, _u = Object.assign, Pu = {};
function dn(e, t, n) {
  this.props = e, this.context = t, this.refs = Pu, this.updater = n || Eu;
}
dn.prototype.isReactComponent = {};
dn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
dn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Tu() {
}
Tu.prototype = dn.prototype;
function so(e, t, n) {
  this.props = e, this.context = t, this.refs = Pu, this.updater = n || Eu;
}
var uo = so.prototype = new Tu();
uo.constructor = so;
_u(uo, dn.prototype);
uo.isPureReactComponent = !0;
var ls = Array.isArray, zu = Object.prototype.hasOwnProperty, ao = { current: null }, Lu = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ru(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null)
    for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t)
      zu.call(t, r) && !Lu.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1)
    l.children = n;
  else if (1 < s) {
    for (var a = Array(s), c = 0; c < s; c++)
      a[c] = arguments[c + 2];
    l.children = a;
  }
  if (e && e.defaultProps)
    for (r in s = e.defaultProps, s)
      l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: er, type: e, key: i, ref: o, props: l, _owner: ao.current };
}
function tf(e, t) {
  return { $$typeof: er, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function co(e) {
  return typeof e == "object" && e !== null && e.$$typeof === er;
}
function nf(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var is = /\/+/g;
function Ml(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? nf("" + e.key) : t.toString(36);
}
function Tr(e, t, n, r, l) {
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
          case er:
          case Qc:
            o = !0;
        }
    }
  if (o)
    return o = e, l = l(o), e = r === "" ? "." + Ml(o, 0) : r, ls(l) ? (n = "", e != null && (n = e.replace(is, "$&/") + "/"), Tr(l, t, n, "", function(c) {
      return c;
    })) : l != null && (co(l) && (l = tf(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(is, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", ls(e))
    for (var s = 0; s < e.length; s++) {
      i = e[s];
      var a = r + Ml(i, s);
      o += Tr(i, t, n, a, l);
    }
  else if (a = ef(e), typeof a == "function")
    for (e = a.call(e), s = 0; !(i = e.next()).done; )
      i = i.value, a = r + Ml(i, s++), o += Tr(i, t, n, a, l);
  else if (i === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function ar(e, t, n) {
  if (e == null)
    return e;
  var r = [], l = 0;
  return Tr(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function rf(e) {
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
var ae = { current: null }, zr = { transition: null }, lf = { ReactCurrentDispatcher: ae, ReactCurrentBatchConfig: zr, ReactCurrentOwner: ao };
F.Children = { map: ar, forEach: function(e, t, n) {
  ar(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return ar(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return ar(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!co(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
F.Component = dn;
F.Fragment = Wc;
F.Profiler = Gc;
F.PureComponent = so;
F.StrictMode = Kc;
F.Suspense = Zc;
F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = lf;
F.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = _u({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = ao.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps)
      var s = e.type.defaultProps;
    for (a in t)
      zu.call(t, a) && !Lu.hasOwnProperty(a) && (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1)
    r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var c = 0; c < a; c++)
      s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: er, type: e.type, key: l, ref: i, props: r, _owner: o };
};
F.createContext = function(e) {
  return e = { $$typeof: Xc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Yc, _context: e }, e.Consumer = e;
};
F.createElement = Ru;
F.createFactory = function(e) {
  var t = Ru.bind(null, e);
  return t.type = e, t;
};
F.createRef = function() {
  return { current: null };
};
F.forwardRef = function(e) {
  return { $$typeof: qc, render: e };
};
F.isValidElement = co;
F.lazy = function(e) {
  return { $$typeof: bc, _payload: { _status: -1, _result: e }, _init: rf };
};
F.memo = function(e, t) {
  return { $$typeof: Jc, type: e, compare: t === void 0 ? null : t };
};
F.startTransition = function(e) {
  var t = zr.transition;
  zr.transition = {};
  try {
    e();
  } finally {
    zr.transition = t;
  }
};
F.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
F.useCallback = function(e, t) {
  return ae.current.useCallback(e, t);
};
F.useContext = function(e) {
  return ae.current.useContext(e);
};
F.useDebugValue = function() {
};
F.useDeferredValue = function(e) {
  return ae.current.useDeferredValue(e);
};
F.useEffect = function(e, t) {
  return ae.current.useEffect(e, t);
};
F.useId = function() {
  return ae.current.useId();
};
F.useImperativeHandle = function(e, t, n) {
  return ae.current.useImperativeHandle(e, t, n);
};
F.useInsertionEffect = function(e, t) {
  return ae.current.useInsertionEffect(e, t);
};
F.useLayoutEffect = function(e, t) {
  return ae.current.useLayoutEffect(e, t);
};
F.useMemo = function(e, t) {
  return ae.current.useMemo(e, t);
};
F.useReducer = function(e, t, n) {
  return ae.current.useReducer(e, t, n);
};
F.useRef = function(e) {
  return ae.current.useRef(e);
};
F.useState = function(e) {
  return ae.current.useState(e);
};
F.useSyncExternalStore = function(e, t, n) {
  return ae.current.useSyncExternalStore(e, t, n);
};
F.useTransition = function() {
  return ae.current.useTransition();
};
F.version = "18.2.0";
Cu.exports = F;
var D = Cu.exports;
const Du = /* @__PURE__ */ Hc(D);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var of = D, sf = Symbol.for("react.element"), uf = Symbol.for("react.fragment"), af = Object.prototype.hasOwnProperty, cf = of.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ff = { key: !0, ref: !0, __self: !0, __source: !0 };
function Fu(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t)
    af.call(t, r) && !ff.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t)
      l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: sf, type: e, key: i, ref: o, props: l, _owner: cf.current };
}
hl.Fragment = uf;
hl.jsx = Fu;
hl.jsxs = Fu;
Nu.exports = hl;
var u = Nu.exports, di = {}, Mu = { exports: {} }, Se = {}, Iu = { exports: {} }, Ou = {};
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
    var R = _.length;
    _.push(L);
    e:
      for (; 0 < R; ) {
        var W = R - 1 >>> 1, Z = _[W];
        if (0 < l(Z, L))
          _[W] = L, _[R] = Z, R = W;
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
    var L = _[0], R = _.pop();
    if (R !== L) {
      _[0] = R;
      e:
        for (var W = 0, Z = _.length, or = Z >>> 1; W < or; ) {
          var St = 2 * (W + 1) - 1, Fl = _[St], kt = St + 1, sr = _[kt];
          if (0 > l(Fl, R))
            kt < Z && 0 > l(sr, Fl) ? (_[W] = sr, _[kt] = R, W = kt) : (_[W] = Fl, _[St] = R, W = St);
          else if (kt < Z && 0 > l(sr, R))
            _[W] = sr, _[kt] = R, W = kt;
          else
            break e;
        }
    }
    return L;
  }
  function l(_, L) {
    var R = _.sortIndex - L.sortIndex;
    return R !== 0 ? R : _.id - L.id;
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
  var a = [], c = [], m = 1, h = null, v = 3, x = !1, g = !1, w = !1, z = typeof setTimeout == "function" ? setTimeout : null, d = typeof clearTimeout == "function" ? clearTimeout : null, f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(_) {
    for (var L = n(c); L !== null; ) {
      if (L.callback === null)
        r(c);
      else if (L.startTime <= _)
        r(c), L.sortIndex = L.expirationTime, t(a, L);
      else
        break;
      L = n(c);
    }
  }
  function y(_) {
    if (w = !1, p(_), !g)
      if (n(a) !== null)
        g = !0, Rl(k);
      else {
        var L = n(c);
        L !== null && Dl(y, L.startTime - _);
      }
  }
  function k(_, L) {
    g = !1, w && (w = !1, d(P), P = -1), x = !0;
    var R = v;
    try {
      for (p(L), h = n(a); h !== null && (!(h.expirationTime > L) || _ && !G()); ) {
        var W = h.callback;
        if (typeof W == "function") {
          h.callback = null, v = h.priorityLevel;
          var Z = W(h.expirationTime <= L);
          L = e.unstable_now(), typeof Z == "function" ? h.callback = Z : h === n(a) && r(a), p(L);
        } else
          r(a);
        h = n(a);
      }
      if (h !== null)
        var or = !0;
      else {
        var St = n(c);
        St !== null && Dl(y, St.startTime - L), or = !1;
      }
      return or;
    } finally {
      h = null, v = R, x = !1;
    }
  }
  var j = !1, E = null, P = -1, C = 5, T = -1;
  function G() {
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
        L ? et() : (j = !1, E = null);
      }
    } else
      j = !1;
  }
  var et;
  if (typeof f == "function")
    et = function() {
      f(be);
    };
  else if (typeof MessageChannel < "u") {
    var hn = new MessageChannel(), ir = hn.port2;
    hn.port1.onmessage = be, et = function() {
      ir.postMessage(null);
    };
  } else
    et = function() {
      z(be, 0);
    };
  function Rl(_) {
    E = _, j || (j = !0, et());
  }
  function Dl(_, L) {
    P = z(function() {
      _(e.unstable_now());
    }, L);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(_) {
    _.callback = null;
  }, e.unstable_continueExecution = function() {
    g || x || (g = !0, Rl(k));
  }, e.unstable_forceFrameRate = function(_) {
    0 > _ || 125 < _ ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : C = 0 < _ ? Math.floor(1e3 / _) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return v;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(a);
  }, e.unstable_next = function(_) {
    switch (v) {
      case 1:
      case 2:
      case 3:
        var L = 3;
        break;
      default:
        L = v;
    }
    var R = v;
    v = L;
    try {
      return _();
    } finally {
      v = R;
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
    var R = v;
    v = _;
    try {
      return L();
    } finally {
      v = R;
    }
  }, e.unstable_scheduleCallback = function(_, L, R) {
    var W = e.unstable_now();
    switch (typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? W + R : W) : R = W, _) {
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
    return Z = R + Z, _ = { id: m++, callback: L, priorityLevel: _, startTime: R, expirationTime: Z, sortIndex: -1 }, R > W ? (_.sortIndex = R, t(c, _), n(a) === null && _ === n(c) && (w ? (d(P), P = -1) : w = !0, Dl(y, R - W))) : (_.sortIndex = Z, t(a, _), g || x || (g = !0, Rl(k))), _;
  }, e.unstable_shouldYield = G, e.unstable_wrapCallback = function(_) {
    var L = v;
    return function() {
      var R = v;
      v = L;
      try {
        return _.apply(this, arguments);
      } finally {
        v = R;
      }
    };
  };
})(Ou);
Iu.exports = Ou;
var df = Iu.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $u = D, xe = df;
function S(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Au = /* @__PURE__ */ new Set(), On = {};
function It(e, t) {
  ln(e, t), ln(e + "Capture", t);
}
function ln(e, t) {
  for (On[e] = t, e = 0; e < t.length; e++)
    Au.add(t[e]);
}
var Ge = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), pi = Object.prototype.hasOwnProperty, pf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, os = {}, ss = {};
function mf(e) {
  return pi.call(ss, e) ? !0 : pi.call(os, e) ? !1 : pf.test(e) ? ss[e] = !0 : (os[e] = !0, !1);
}
function hf(e, t, n, r) {
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
function vf(e, t, n, r) {
  if (t === null || typeof t > "u" || hf(e, t, n, r))
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
var fo = /[\-:]([a-z])/g;
function po(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    fo,
    po
  );
  ne[t] = new ce(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(fo, po);
  ne[t] = new ce(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(fo, po);
  ne[t] = new ce(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ne[e] = new ce(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ne.xlinkHref = new ce("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ne[e] = new ce(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function mo(e, t, n, r) {
  var l = ne.hasOwnProperty(t) ? ne[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (vf(t, n, l, r) && (n = null), r || l === null ? mf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ze = $u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, cr = Symbol.for("react.element"), At = Symbol.for("react.portal"), Ut = Symbol.for("react.fragment"), ho = Symbol.for("react.strict_mode"), mi = Symbol.for("react.profiler"), Uu = Symbol.for("react.provider"), Bu = Symbol.for("react.context"), vo = Symbol.for("react.forward_ref"), hi = Symbol.for("react.suspense"), vi = Symbol.for("react.suspense_list"), go = Symbol.for("react.memo"), nt = Symbol.for("react.lazy"), Vu = Symbol.for("react.offscreen"), us = Symbol.iterator;
function vn(e) {
  return e === null || typeof e != "object" ? null : (e = us && e[us] || e["@@iterator"], typeof e == "function" ? e : null);
}
var H = Object.assign, Il;
function Nn(e) {
  if (Il === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Il = t && t[1] || "";
    }
  return `
` + Il + e;
}
var Ol = !1;
function $l(e, t) {
  if (!e || Ol)
    return "";
  Ol = !0;
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
                var a = `
` + l[o].replace(" at new ", " at ");
                return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a;
              }
            while (1 <= o && 0 <= s);
          break;
        }
    }
  } finally {
    Ol = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Nn(e) : "";
}
function gf(e) {
  switch (e.tag) {
    case 5:
      return Nn(e.type);
    case 16:
      return Nn("Lazy");
    case 13:
      return Nn("Suspense");
    case 19:
      return Nn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = $l(e.type, !1), e;
    case 11:
      return e = $l(e.type.render, !1), e;
    case 1:
      return e = $l(e.type, !0), e;
    default:
      return "";
  }
}
function gi(e) {
  if (e == null)
    return null;
  if (typeof e == "function")
    return e.displayName || e.name || null;
  if (typeof e == "string")
    return e;
  switch (e) {
    case Ut:
      return "Fragment";
    case At:
      return "Portal";
    case mi:
      return "Profiler";
    case ho:
      return "StrictMode";
    case hi:
      return "Suspense";
    case vi:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Bu:
        return (e.displayName || "Context") + ".Consumer";
      case Uu:
        return (e._context.displayName || "Context") + ".Provider";
      case vo:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case go:
        return t = e.displayName || null, t !== null ? t : gi(e.type) || "Memo";
      case nt:
        t = e._payload, e = e._init;
        try {
          return gi(e(t));
        } catch {
        }
    }
  return null;
}
function yf(e) {
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
      return gi(t);
    case 8:
      return t === ho ? "StrictMode" : "Mode";
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
function Hu(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function wf(e) {
  var t = Hu(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function fr(e) {
  e._valueTracker || (e._valueTracker = wf(e));
}
function Qu(e) {
  if (!e)
    return !1;
  var t = e._valueTracker;
  if (!t)
    return !0;
  var n = t.getValue(), r = "";
  return e && (r = Hu(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
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
function yi(e, t) {
  var n = t.checked;
  return H({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function as(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = vt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Wu(e, t) {
  t = t.checked, t != null && mo(e, "checked", t, !1);
}
function wi(e, t) {
  Wu(e, t);
  var n = vt(t.value), r = t.type;
  if (n != null)
    r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? xi(e, t.type, n) : t.hasOwnProperty("defaultValue") && xi(e, t.type, vt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function cs(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
      return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function xi(e, t, n) {
  (t !== "number" || Vr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Cn = Array.isArray;
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
function Si(e, t) {
  if (t.dangerouslySetInnerHTML != null)
    throw Error(S(91));
  return H({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function fs(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null)
        throw Error(S(92));
      if (Cn(n)) {
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
function Ku(e, t) {
  var n = vt(t.value), r = vt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ds(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Gu(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ki(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Gu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var dr, Yu = function(e) {
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
var Pn = {
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
}, xf = ["Webkit", "ms", "Moz", "O"];
Object.keys(Pn).forEach(function(e) {
  xf.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Pn[t] = Pn[e];
  });
});
function Xu(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Pn.hasOwnProperty(e) && Pn[e] ? ("" + t).trim() : t + "px";
}
function qu(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, l = Xu(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
}
var Sf = H({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ji(e, t) {
  if (t) {
    if (Sf[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
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
function Ni(e, t) {
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
var Ci = null;
function yo(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Ei = null, Jt = null, bt = null;
function ps(e) {
  if (e = rr(e)) {
    if (typeof Ei != "function")
      throw Error(S(280));
    var t = e.stateNode;
    t && (t = xl(t), Ei(e.stateNode, e.type, t));
  }
}
function Zu(e) {
  Jt ? bt ? bt.push(e) : bt = [e] : Jt = e;
}
function Ju() {
  if (Jt) {
    var e = Jt, t = bt;
    if (bt = Jt = null, ps(e), t)
      for (e = 0; e < t.length; e++)
        ps(t[e]);
  }
}
function bu(e, t) {
  return e(t);
}
function ea() {
}
var Al = !1;
function ta(e, t, n) {
  if (Al)
    return e(t, n);
  Al = !0;
  try {
    return bu(e, t, n);
  } finally {
    Al = !1, (Jt !== null || bt !== null) && (ea(), Ju());
  }
}
function An(e, t) {
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
var _i = !1;
if (Ge)
  try {
    var gn = {};
    Object.defineProperty(gn, "passive", { get: function() {
      _i = !0;
    } }), window.addEventListener("test", gn, gn), window.removeEventListener("test", gn, gn);
  } catch {
    _i = !1;
  }
function kf(e, t, n, r, l, i, o, s, a) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (m) {
    this.onError(m);
  }
}
var Tn = !1, Hr = null, Qr = !1, Pi = null, jf = { onError: function(e) {
  Tn = !0, Hr = e;
} };
function Nf(e, t, n, r, l, i, o, s, a) {
  Tn = !1, Hr = null, kf.apply(jf, arguments);
}
function Cf(e, t, n, r, l, i, o, s, a) {
  if (Nf.apply(this, arguments), Tn) {
    if (Tn) {
      var c = Hr;
      Tn = !1, Hr = null;
    } else
      throw Error(S(198));
    Qr || (Qr = !0, Pi = c);
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
function na(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
      return t.dehydrated;
  }
  return null;
}
function ms(e) {
  if (Ot(e) !== e)
    throw Error(S(188));
}
function Ef(e) {
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
          return ms(l), e;
        if (i === r)
          return ms(l), t;
        i = i.sibling;
      }
      throw Error(S(188));
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
function ra(e) {
  return e = Ef(e), e !== null ? la(e) : null;
}
function la(e) {
  if (e.tag === 5 || e.tag === 6)
    return e;
  for (e = e.child; e !== null; ) {
    var t = la(e);
    if (t !== null)
      return t;
    e = e.sibling;
  }
  return null;
}
var ia = xe.unstable_scheduleCallback, hs = xe.unstable_cancelCallback, _f = xe.unstable_shouldYield, Pf = xe.unstable_requestPaint, K = xe.unstable_now, Tf = xe.unstable_getCurrentPriorityLevel, wo = xe.unstable_ImmediatePriority, oa = xe.unstable_UserBlockingPriority, Wr = xe.unstable_NormalPriority, zf = xe.unstable_LowPriority, sa = xe.unstable_IdlePriority, vl = null, Ae = null;
function Lf(e) {
  if (Ae && typeof Ae.onCommitFiberRoot == "function")
    try {
      Ae.onCommitFiberRoot(vl, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
}
var De = Math.clz32 ? Math.clz32 : Ff, Rf = Math.log, Df = Math.LN2;
function Ff(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Rf(e) / Df | 0) | 0;
}
var pr = 64, mr = 4194304;
function En(e) {
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
function Kr(e, t) {
  var n = e.pendingLanes;
  if (n === 0)
    return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var s = o & ~l;
    s !== 0 ? r = En(s) : (i &= o, i !== 0 && (r = En(i)));
  } else
    o = n & ~l, o !== 0 ? r = En(o) : i !== 0 && (r = En(i));
  if (r === 0)
    return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0))
    return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
    for (e = e.entanglements, t &= r; 0 < t; )
      n = 31 - De(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Mf(e, t) {
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
function If(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - De(i), s = 1 << o, a = l[o];
    a === -1 ? (!(s & n) || s & r) && (l[o] = Mf(s, t)) : a <= t && (e.expiredLanes |= s), i &= ~s;
  }
}
function Ti(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function ua() {
  var e = pr;
  return pr <<= 1, !(pr & 4194240) && (pr = 64), e;
}
function Ul(e) {
  for (var t = [], n = 0; 31 > n; n++)
    t.push(e);
  return t;
}
function tr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - De(t), e[t] = n;
}
function Of(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - De(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function xo(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - De(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var I = 0;
function aa(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var ca, So, fa, da, pa, zi = !1, hr = [], ut = null, at = null, ct = null, Un = /* @__PURE__ */ new Map(), Bn = /* @__PURE__ */ new Map(), lt = [], $f = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function vs(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ut = null;
      break;
    case "dragenter":
    case "dragleave":
      at = null;
      break;
    case "mouseover":
    case "mouseout":
      ct = null;
      break;
    case "pointerover":
    case "pointerout":
      Un.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Bn.delete(t.pointerId);
  }
}
function yn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = rr(t), t !== null && So(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Af(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ut = yn(ut, e, t, n, r, l), !0;
    case "dragenter":
      return at = yn(at, e, t, n, r, l), !0;
    case "mouseover":
      return ct = yn(ct, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Un.set(i, yn(Un.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Bn.set(i, yn(Bn.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function ma(e) {
  var t = Et(e.target);
  if (t !== null) {
    var n = Ot(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = na(n), t !== null) {
          e.blockedOn = t, pa(e.priority, function() {
            fa(n);
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
    var n = Li(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Ci = r, n.target.dispatchEvent(r), Ci = null;
    } else
      return t = rr(n), t !== null && So(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function gs(e, t, n) {
  Lr(e) && n.delete(t);
}
function Uf() {
  zi = !1, ut !== null && Lr(ut) && (ut = null), at !== null && Lr(at) && (at = null), ct !== null && Lr(ct) && (ct = null), Un.forEach(gs), Bn.forEach(gs);
}
function wn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, zi || (zi = !0, xe.unstable_scheduleCallback(xe.unstable_NormalPriority, Uf)));
}
function Vn(e) {
  function t(l) {
    return wn(l, e);
  }
  if (0 < hr.length) {
    wn(hr[0], e);
    for (var n = 1; n < hr.length; n++) {
      var r = hr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ut !== null && wn(ut, e), at !== null && wn(at, e), ct !== null && wn(ct, e), Un.forEach(t), Bn.forEach(t), n = 0; n < lt.length; n++)
    r = lt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < lt.length && (n = lt[0], n.blockedOn === null); )
    ma(n), n.blockedOn === null && lt.shift();
}
var en = Ze.ReactCurrentBatchConfig, Gr = !0;
function Bf(e, t, n, r) {
  var l = I, i = en.transition;
  en.transition = null;
  try {
    I = 1, ko(e, t, n, r);
  } finally {
    I = l, en.transition = i;
  }
}
function Vf(e, t, n, r) {
  var l = I, i = en.transition;
  en.transition = null;
  try {
    I = 4, ko(e, t, n, r);
  } finally {
    I = l, en.transition = i;
  }
}
function ko(e, t, n, r) {
  if (Gr) {
    var l = Li(e, t, n, r);
    if (l === null)
      ql(e, t, r, Yr, n), vs(e, r);
    else if (Af(l, e, t, n, r))
      r.stopPropagation();
    else if (vs(e, r), t & 4 && -1 < $f.indexOf(e)) {
      for (; l !== null; ) {
        var i = rr(l);
        if (i !== null && ca(i), i = Li(e, t, n, r), i === null && ql(e, t, r, Yr, n), i === l)
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else
      ql(e, t, r, null, n);
  }
}
var Yr = null;
function Li(e, t, n, r) {
  if (Yr = null, e = yo(r), e = Et(e), e !== null)
    if (t = Ot(e), t === null)
      e = null;
    else if (n = t.tag, n === 13) {
      if (e = na(t), e !== null)
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
function ha(e) {
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
      switch (Tf()) {
        case wo:
          return 1;
        case oa:
          return 4;
        case Wr:
        case zf:
          return 16;
        case sa:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ot = null, jo = null, Rr = null;
function va() {
  if (Rr)
    return Rr;
  var e, t = jo, n = t.length, r, l = "value" in ot ? ot.value : ot.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++)
    ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++)
    ;
  return Rr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Dr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function vr() {
  return !0;
}
function ys() {
  return !1;
}
function ke(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var s in e)
      e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(i) : i[s]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? vr : ys, this.isPropagationStopped = ys, this;
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
var pn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, No = ke(pn), nr = H({}, pn, { view: 0, detail: 0 }), Hf = ke(nr), Bl, Vl, xn, gl = H({}, nr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Co, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== xn && (xn && e.type === "mousemove" ? (Bl = e.screenX - xn.screenX, Vl = e.screenY - xn.screenY) : Vl = Bl = 0, xn = e), Bl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Vl;
} }), ws = ke(gl), Qf = H({}, gl, { dataTransfer: 0 }), Wf = ke(Qf), Kf = H({}, nr, { relatedTarget: 0 }), Hl = ke(Kf), Gf = H({}, pn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Yf = ke(Gf), Xf = H({}, pn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), qf = ke(Xf), Zf = H({}, pn, { data: 0 }), xs = ke(Zf), Jf = {
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
}, bf = {
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
}, ed = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function td(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = ed[e]) ? !!t[e] : !1;
}
function Co() {
  return td;
}
var nd = H({}, nr, { key: function(e) {
  if (e.key) {
    var t = Jf[e.key] || e.key;
    if (t !== "Unidentified")
      return t;
  }
  return e.type === "keypress" ? (e = Dr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? bf[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Co, charCode: function(e) {
  return e.type === "keypress" ? Dr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Dr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), rd = ke(nd), ld = H({}, gl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ss = ke(ld), id = H({}, nr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Co }), od = ke(id), sd = H({}, pn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ud = ke(sd), ad = H({}, gl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), cd = ke(ad), fd = [9, 13, 27, 32], Eo = Ge && "CompositionEvent" in window, zn = null;
Ge && "documentMode" in document && (zn = document.documentMode);
var dd = Ge && "TextEvent" in window && !zn, ga = Ge && (!Eo || zn && 8 < zn && 11 >= zn), ks = " ", js = !1;
function ya(e, t) {
  switch (e) {
    case "keyup":
      return fd.indexOf(t.keyCode) !== -1;
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
function wa(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Bt = !1;
function pd(e, t) {
  switch (e) {
    case "compositionend":
      return wa(t);
    case "keypress":
      return t.which !== 32 ? null : (js = !0, ks);
    case "textInput":
      return e = t.data, e === ks && js ? null : e;
    default:
      return null;
  }
}
function md(e, t) {
  if (Bt)
    return e === "compositionend" || !Eo && ya(e, t) ? (e = va(), Rr = jo = ot = null, Bt = !1, e) : null;
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
      return ga && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var hd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Ns(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!hd[e.type] : t === "textarea";
}
function xa(e, t, n, r) {
  Zu(r), t = Xr(t, "onChange"), 0 < t.length && (n = new No("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Ln = null, Hn = null;
function vd(e) {
  La(e, 0);
}
function yl(e) {
  var t = Qt(e);
  if (Qu(t))
    return e;
}
function gd(e, t) {
  if (e === "change")
    return t;
}
var Sa = !1;
if (Ge) {
  var Ql;
  if (Ge) {
    var Wl = "oninput" in document;
    if (!Wl) {
      var Cs = document.createElement("div");
      Cs.setAttribute("oninput", "return;"), Wl = typeof Cs.oninput == "function";
    }
    Ql = Wl;
  } else
    Ql = !1;
  Sa = Ql && (!document.documentMode || 9 < document.documentMode);
}
function Es() {
  Ln && (Ln.detachEvent("onpropertychange", ka), Hn = Ln = null);
}
function ka(e) {
  if (e.propertyName === "value" && yl(Hn)) {
    var t = [];
    xa(t, Hn, e, yo(e)), ta(vd, t);
  }
}
function yd(e, t, n) {
  e === "focusin" ? (Es(), Ln = t, Hn = n, Ln.attachEvent("onpropertychange", ka)) : e === "focusout" && Es();
}
function wd(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return yl(Hn);
}
function xd(e, t) {
  if (e === "click")
    return yl(t);
}
function Sd(e, t) {
  if (e === "input" || e === "change")
    return yl(t);
}
function kd(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Me = typeof Object.is == "function" ? Object.is : kd;
function Qn(e, t) {
  if (Me(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!pi.call(t, l) || !Me(e[l], t[l]))
      return !1;
  }
  return !0;
}
function _s(e) {
  for (; e && e.firstChild; )
    e = e.firstChild;
  return e;
}
function Ps(e, t) {
  var n = _s(e);
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
    n = _s(n);
  }
}
function ja(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ja(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Na() {
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
function _o(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function jd(e) {
  var t = Na(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ja(n.ownerDocument.documentElement, n)) {
    if (r !== null && _o(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
        n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = Ps(n, i);
        var o = Ps(
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
var Nd = Ge && "documentMode" in document && 11 >= document.documentMode, Vt = null, Ri = null, Rn = null, Di = !1;
function Ts(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Di || Vt == null || Vt !== Vr(r) || (r = Vt, "selectionStart" in r && _o(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Rn && Qn(Rn, r) || (Rn = r, r = Xr(Ri, "onSelect"), 0 < r.length && (t = new No("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Vt)));
}
function gr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Ht = { animationend: gr("Animation", "AnimationEnd"), animationiteration: gr("Animation", "AnimationIteration"), animationstart: gr("Animation", "AnimationStart"), transitionend: gr("Transition", "TransitionEnd") }, Kl = {}, Ca = {};
Ge && (Ca = document.createElement("div").style, "AnimationEvent" in window || (delete Ht.animationend.animation, delete Ht.animationiteration.animation, delete Ht.animationstart.animation), "TransitionEvent" in window || delete Ht.transitionend.transition);
function wl(e) {
  if (Kl[e])
    return Kl[e];
  if (!Ht[e])
    return e;
  var t = Ht[e], n;
  for (n in t)
    if (t.hasOwnProperty(n) && n in Ca)
      return Kl[e] = t[n];
  return e;
}
var Ea = wl("animationend"), _a = wl("animationiteration"), Pa = wl("animationstart"), Ta = wl("transitionend"), za = /* @__PURE__ */ new Map(), zs = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function yt(e, t) {
  za.set(e, t), It(t, [e]);
}
for (var Gl = 0; Gl < zs.length; Gl++) {
  var Yl = zs[Gl], Cd = Yl.toLowerCase(), Ed = Yl[0].toUpperCase() + Yl.slice(1);
  yt(Cd, "on" + Ed);
}
yt(Ea, "onAnimationEnd");
yt(_a, "onAnimationIteration");
yt(Pa, "onAnimationStart");
yt("dblclick", "onDoubleClick");
yt("focusin", "onFocus");
yt("focusout", "onBlur");
yt(Ta, "onTransitionEnd");
ln("onMouseEnter", ["mouseout", "mouseover"]);
ln("onMouseLeave", ["mouseout", "mouseover"]);
ln("onPointerEnter", ["pointerout", "pointerover"]);
ln("onPointerLeave", ["pointerout", "pointerover"]);
It("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
It("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
It("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
It("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
It("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
It("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var _n = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), _d = new Set("cancel close invalid load scroll toggle".split(" ").concat(_n));
function Ls(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Cf(r, t, void 0, e), e.currentTarget = null;
}
function La(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var s = r[o], a = s.instance, c = s.currentTarget;
          if (s = s.listener, a !== i && l.isPropagationStopped())
            break e;
          Ls(l, s, c), i = a;
        }
      else
        for (o = 0; o < r.length; o++) {
          if (s = r[o], a = s.instance, c = s.currentTarget, s = s.listener, a !== i && l.isPropagationStopped())
            break e;
          Ls(l, s, c), i = a;
        }
    }
  }
  if (Qr)
    throw e = Pi, Qr = !1, Pi = null, e;
}
function $(e, t) {
  var n = t[$i];
  n === void 0 && (n = t[$i] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Ra(t, e, 2, !1), n.add(r));
}
function Xl(e, t, n) {
  var r = 0;
  t && (r |= 4), Ra(n, e, r, t);
}
var yr = "_reactListening" + Math.random().toString(36).slice(2);
function Wn(e) {
  if (!e[yr]) {
    e[yr] = !0, Au.forEach(function(n) {
      n !== "selectionchange" && (_d.has(n) || Xl(n, !1, e), Xl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[yr] || (t[yr] = !0, Xl("selectionchange", !1, t));
  }
}
function Ra(e, t, n, r) {
  switch (ha(t)) {
    case 1:
      var l = Bf;
      break;
    case 4:
      l = Vf;
      break;
    default:
      l = ko;
  }
  n = l.bind(null, t, n, e), l = void 0, !_i || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function ql(e, t, n, r, l) {
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
              var a = o.tag;
              if ((a === 3 || a === 4) && (a = o.stateNode.containerInfo, a === l || a.nodeType === 8 && a.parentNode === l))
                return;
              o = o.return;
            }
          for (; s !== null; ) {
            if (o = Et(s), o === null)
              return;
            if (a = o.tag, a === 5 || a === 6) {
              r = i = o;
              continue e;
            }
            s = s.parentNode;
          }
        }
        r = r.return;
      }
  ta(function() {
    var c = i, m = yo(n), h = [];
    e: {
      var v = za.get(e);
      if (v !== void 0) {
        var x = No, g = e;
        switch (e) {
          case "keypress":
            if (Dr(n) === 0)
              break e;
          case "keydown":
          case "keyup":
            x = rd;
            break;
          case "focusin":
            g = "focus", x = Hl;
            break;
          case "focusout":
            g = "blur", x = Hl;
            break;
          case "beforeblur":
          case "afterblur":
            x = Hl;
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
            x = ws;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = Wf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = od;
            break;
          case Ea:
          case _a:
          case Pa:
            x = Yf;
            break;
          case Ta:
            x = ud;
            break;
          case "scroll":
            x = Hf;
            break;
          case "wheel":
            x = cd;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = qf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = Ss;
        }
        var w = (t & 4) !== 0, z = !w && e === "scroll", d = w ? v !== null ? v + "Capture" : null : v;
        w = [];
        for (var f = c, p; f !== null; ) {
          p = f;
          var y = p.stateNode;
          if (p.tag === 5 && y !== null && (p = y, d !== null && (y = An(f, d), y != null && w.push(Kn(f, y, p)))), z)
            break;
          f = f.return;
        }
        0 < w.length && (v = new x(v, g, null, n, m), h.push({ event: v, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (v = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", v && n !== Ci && (g = n.relatedTarget || n.fromElement) && (Et(g) || g[Ye]))
          break e;
        if ((x || v) && (v = m.window === m ? m : (v = m.ownerDocument) ? v.defaultView || v.parentWindow : window, x ? (g = n.relatedTarget || n.toElement, x = c, g = g ? Et(g) : null, g !== null && (z = Ot(g), g !== z || g.tag !== 5 && g.tag !== 6) && (g = null)) : (x = null, g = c), x !== g)) {
          if (w = ws, y = "onMouseLeave", d = "onMouseEnter", f = "mouse", (e === "pointerout" || e === "pointerover") && (w = Ss, y = "onPointerLeave", d = "onPointerEnter", f = "pointer"), z = x == null ? v : Qt(x), p = g == null ? v : Qt(g), v = new w(y, f + "leave", x, n, m), v.target = z, v.relatedTarget = p, y = null, Et(m) === c && (w = new w(d, f + "enter", g, n, m), w.target = p, w.relatedTarget = z, y = w), z = y, x && g)
            t: {
              for (w = x, d = g, f = 0, p = w; p; p = $t(p))
                f++;
              for (p = 0, y = d; y; y = $t(y))
                p++;
              for (; 0 < f - p; )
                w = $t(w), f--;
              for (; 0 < p - f; )
                d = $t(d), p--;
              for (; f--; ) {
                if (w === d || d !== null && w === d.alternate)
                  break t;
                w = $t(w), d = $t(d);
              }
              w = null;
            }
          else
            w = null;
          x !== null && Rs(h, v, x, w, !1), g !== null && z !== null && Rs(h, z, g, w, !0);
        }
      }
      e: {
        if (v = c ? Qt(c) : window, x = v.nodeName && v.nodeName.toLowerCase(), x === "select" || x === "input" && v.type === "file")
          var k = gd;
        else if (Ns(v))
          if (Sa)
            k = Sd;
          else {
            k = wd;
            var j = yd;
          }
        else
          (x = v.nodeName) && x.toLowerCase() === "input" && (v.type === "checkbox" || v.type === "radio") && (k = xd);
        if (k && (k = k(e, c))) {
          xa(h, k, n, m);
          break e;
        }
        j && j(e, v, c), e === "focusout" && (j = v._wrapperState) && j.controlled && v.type === "number" && xi(v, "number", v.value);
      }
      switch (j = c ? Qt(c) : window, e) {
        case "focusin":
          (Ns(j) || j.contentEditable === "true") && (Vt = j, Ri = c, Rn = null);
          break;
        case "focusout":
          Rn = Ri = Vt = null;
          break;
        case "mousedown":
          Di = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Di = !1, Ts(h, n, m);
          break;
        case "selectionchange":
          if (Nd)
            break;
        case "keydown":
        case "keyup":
          Ts(h, n, m);
      }
      var E;
      if (Eo)
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
        Bt ? ya(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P && (ga && n.locale !== "ko" && (Bt || P !== "onCompositionStart" ? P === "onCompositionEnd" && Bt && (E = va()) : (ot = m, jo = "value" in ot ? ot.value : ot.textContent, Bt = !0)), j = Xr(c, P), 0 < j.length && (P = new xs(P, e, null, n, m), h.push({ event: P, listeners: j }), E ? P.data = E : (E = wa(n), E !== null && (P.data = E)))), (E = dd ? pd(e, n) : md(e, n)) && (c = Xr(c, "onBeforeInput"), 0 < c.length && (m = new xs("onBeforeInput", "beforeinput", null, n, m), h.push({ event: m, listeners: c }), m.data = E));
    }
    La(h, t);
  });
}
function Kn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Xr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = An(e, n), i != null && r.unshift(Kn(e, i, l)), i = An(e, t), i != null && r.push(Kn(e, i, l))), e = e.return;
  }
  return r;
}
function $t(e) {
  if (e === null)
    return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Rs(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var s = n, a = s.alternate, c = s.stateNode;
    if (a !== null && a === r)
      break;
    s.tag === 5 && c !== null && (s = c, l ? (a = An(n, i), a != null && o.unshift(Kn(n, a, s))) : l || (a = An(n, i), a != null && o.push(Kn(n, a, s)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var Pd = /\r\n?/g, Td = /\u0000|\uFFFD/g;
function Ds(e) {
  return (typeof e == "string" ? e : "" + e).replace(Pd, `
`).replace(Td, "");
}
function wr(e, t, n) {
  if (t = Ds(t), Ds(e) !== t && n)
    throw Error(S(425));
}
function qr() {
}
var Fi = null, Mi = null;
function Ii(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Oi = typeof setTimeout == "function" ? setTimeout : void 0, zd = typeof clearTimeout == "function" ? clearTimeout : void 0, Fs = typeof Promise == "function" ? Promise : void 0, Ld = typeof queueMicrotask == "function" ? queueMicrotask : typeof Fs < "u" ? function(e) {
  return Fs.resolve(null).then(e).catch(Rd);
} : Oi;
function Rd(e) {
  setTimeout(function() {
    throw e;
  });
}
function Zl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8)
      if (n = l.data, n === "/$") {
        if (r === 0) {
          e.removeChild(l), Vn(t);
          return;
        }
        r--;
      } else
        n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Vn(t);
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
function Ms(e) {
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
var mn = Math.random().toString(36).slice(2), $e = "__reactFiber$" + mn, Gn = "__reactProps$" + mn, Ye = "__reactContainer$" + mn, $i = "__reactEvents$" + mn, Dd = "__reactListeners$" + mn, Fd = "__reactHandles$" + mn;
function Et(e) {
  var t = e[$e];
  if (t)
    return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ye] || n[$e]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
        for (e = Ms(e); e !== null; ) {
          if (n = e[$e])
            return n;
          e = Ms(e);
        }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function rr(e) {
  return e = e[$e] || e[Ye], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Qt(e) {
  if (e.tag === 5 || e.tag === 6)
    return e.stateNode;
  throw Error(S(33));
}
function xl(e) {
  return e[Gn] || null;
}
var Ai = [], Wt = -1;
function wt(e) {
  return { current: e };
}
function A(e) {
  0 > Wt || (e.current = Ai[Wt], Ai[Wt] = null, Wt--);
}
function O(e, t) {
  Wt++, Ai[Wt] = e.current, e.current = t;
}
var gt = {}, oe = wt(gt), me = wt(!1), Lt = gt;
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
  A(me), A(oe);
}
function Is(e, t, n) {
  if (oe.current !== gt)
    throw Error(S(168));
  O(oe, t), O(me, n);
}
function Da(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function")
    return n;
  r = r.getChildContext();
  for (var l in r)
    if (!(l in t))
      throw Error(S(108, yf(e) || "Unknown", l));
  return H({}, n, r);
}
function Jr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || gt, Lt = oe.current, O(oe, e), O(me, me.current), !0;
}
function Os(e, t, n) {
  var r = e.stateNode;
  if (!r)
    throw Error(S(169));
  n ? (e = Da(e, t, Lt), r.__reactInternalMemoizedMergedChildContext = e, A(me), A(oe), O(oe, e)) : A(me), O(me, n);
}
var Ve = null, Sl = !1, Jl = !1;
function Fa(e) {
  Ve === null ? Ve = [e] : Ve.push(e);
}
function Md(e) {
  Sl = !0, Fa(e);
}
function xt() {
  if (!Jl && Ve !== null) {
    Jl = !0;
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
      throw Ve !== null && (Ve = Ve.slice(e + 1)), ia(wo, xt), l;
    } finally {
      I = t, Jl = !1;
    }
  }
  return null;
}
var Kt = [], Gt = 0, br = null, el = 0, je = [], Ne = 0, Rt = null, Qe = 1, We = "";
function Nt(e, t) {
  Kt[Gt++] = el, Kt[Gt++] = br, br = e, el = t;
}
function Ma(e, t, n) {
  je[Ne++] = Qe, je[Ne++] = We, je[Ne++] = Rt, Rt = e;
  var r = Qe;
  e = We;
  var l = 32 - De(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - De(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, Qe = 1 << 32 - De(t) + l | n << l | r, We = i + e;
  } else
    Qe = 1 << i | n << l | r, We = e;
}
function Po(e) {
  e.return !== null && (Nt(e, 1), Ma(e, 1, 0));
}
function To(e) {
  for (; e === br; )
    br = Kt[--Gt], Kt[Gt] = null, el = Kt[--Gt], Kt[Gt] = null;
  for (; e === Rt; )
    Rt = je[--Ne], je[Ne] = null, We = je[--Ne], je[Ne] = null, Qe = je[--Ne], je[Ne] = null;
}
var we = null, ye = null, U = !1, Re = null;
function Ia(e, t) {
  var n = Ce(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function $s(e, t) {
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
function Ui(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Bi(e) {
  if (U) {
    var t = ye;
    if (t) {
      var n = t;
      if (!$s(e, t)) {
        if (Ui(e))
          throw Error(S(418));
        t = ft(n.nextSibling);
        var r = we;
        t && $s(e, t) ? Ia(r, n) : (e.flags = e.flags & -4097 | 2, U = !1, we = e);
      }
    } else {
      if (Ui(e))
        throw Error(S(418));
      e.flags = e.flags & -4097 | 2, U = !1, we = e;
    }
  }
}
function As(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  we = e;
}
function xr(e) {
  if (e !== we)
    return !1;
  if (!U)
    return As(e), U = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ii(e.type, e.memoizedProps)), t && (t = ye)) {
    if (Ui(e))
      throw Oa(), Error(S(418));
    for (; t; )
      Ia(e, t), t = ft(t.nextSibling);
  }
  if (As(e), e.tag === 13) {
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
function Oa() {
  for (var e = ye; e; )
    e = ft(e.nextSibling);
}
function sn() {
  ye = we = null, U = !1;
}
function zo(e) {
  Re === null ? Re = [e] : Re.push(e);
}
var Id = Ze.ReactCurrentBatchConfig;
function ze(e, t) {
  if (e && e.defaultProps) {
    t = H({}, t), e = e.defaultProps;
    for (var n in e)
      t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var tl = wt(null), nl = null, Yt = null, Lo = null;
function Ro() {
  Lo = Yt = nl = null;
}
function Do(e) {
  var t = tl.current;
  A(tl), e._currentValue = t;
}
function Vi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
      break;
    e = e.return;
  }
}
function tn(e, t) {
  nl = e, Lo = Yt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (pe = !0), e.firstContext = null);
}
function _e(e) {
  var t = e._currentValue;
  if (Lo !== e)
    if (e = { context: e, memoizedValue: t, next: null }, Yt === null) {
      if (nl === null)
        throw Error(S(308));
      Yt = e, nl.dependencies = { lanes: 0, firstContext: e };
    } else
      Yt = Yt.next = e;
  return t;
}
var _t = null;
function Fo(e) {
  _t === null ? _t = [e] : _t.push(e);
}
function $a(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Fo(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Xe(e, r);
}
function Xe(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var rt = !1;
function Mo(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Aa(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ke(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function dt(e, t, n) {
  var r = e.updateQueue;
  if (r === null)
    return null;
  if (r = r.shared, M & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Xe(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Fo(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Xe(e, n);
}
function Fr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, xo(e, n);
  }
}
function Us(e, t) {
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
function rl(e, t, n, r) {
  var l = e.updateQueue;
  rt = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var a = s, c = a.next;
    a.next = null, o === null ? i = c : o.next = c, o = a;
    var m = e.alternate;
    m !== null && (m = m.updateQueue, s = m.lastBaseUpdate, s !== o && (s === null ? m.firstBaseUpdate = c : s.next = c, m.lastBaseUpdate = a));
  }
  if (i !== null) {
    var h = l.baseState;
    o = 0, m = c = a = null, s = i;
    do {
      var v = s.lane, x = s.eventTime;
      if ((r & v) === v) {
        m !== null && (m = m.next = {
          eventTime: x,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var g = e, w = s;
          switch (v = t, x = n, w.tag) {
            case 1:
              if (g = w.payload, typeof g == "function") {
                h = g.call(x, h, v);
                break e;
              }
              h = g;
              break e;
            case 3:
              g.flags = g.flags & -65537 | 128;
            case 0:
              if (g = w.payload, v = typeof g == "function" ? g.call(x, h, v) : g, v == null)
                break e;
              h = H({}, h, v);
              break e;
            case 2:
              rt = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, v = l.effects, v === null ? l.effects = [s] : v.push(s));
      } else
        x = { eventTime: x, lane: v, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, m === null ? (c = m = x, a = h) : m = m.next = x, o |= v;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null)
          break;
        v = s, s = v.next, v.next = null, l.lastBaseUpdate = v, l.shared.pending = null;
      }
    } while (!0);
    if (m === null && (a = h), l.baseState = a, l.firstBaseUpdate = c, l.lastBaseUpdate = m, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else
      i === null && (l.shared.lanes = 0);
    Ft |= o, e.lanes = o, e.memoizedState = h;
  }
}
function Bs(e, t, n) {
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
var Ua = new $u.Component().refs;
function Hi(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : H({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var kl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ot(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ue(), l = mt(e), i = Ke(r, l);
  i.payload = t, n != null && (i.callback = n), t = dt(e, i, l), t !== null && (Fe(t, e, l, r), Fr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ue(), l = mt(e), i = Ke(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = dt(e, i, l), t !== null && (Fe(t, e, l, r), Fr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ue(), r = mt(e), l = Ke(n, r);
  l.tag = 2, t != null && (l.callback = t), t = dt(e, l, r), t !== null && (Fe(t, e, r, n), Fr(t, e, r));
} };
function Vs(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Qn(n, r) || !Qn(l, i) : !0;
}
function Ba(e, t, n) {
  var r = !1, l = gt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = _e(i) : (l = he(t) ? Lt : oe.current, r = t.contextTypes, i = (r = r != null) ? on(e, l) : gt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = kl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Hs(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && kl.enqueueReplaceState(t, t.state, null);
}
function Qi(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = Ua, Mo(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = _e(i) : (i = he(t) ? Lt : oe.current, l.context = on(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Hi(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && kl.enqueueReplaceState(l, l.state, null), rl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Sn(e, t, n) {
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
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var s = l.refs;
        s === Ua && (s = l.refs = {}), o === null ? delete s[i] : s[i] = o;
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
function Qs(e) {
  var t = e._init;
  return t(e._payload);
}
function Va(e) {
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
    return d = ht(d, f), d.index = 0, d.sibling = null, d;
  }
  function i(d, f, p) {
    return d.index = p, e ? (p = d.alternate, p !== null ? (p = p.index, p < f ? (d.flags |= 2, f) : p) : (d.flags |= 2, f)) : (d.flags |= 1048576, f);
  }
  function o(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function s(d, f, p, y) {
    return f === null || f.tag !== 6 ? (f = ii(p, d.mode, y), f.return = d, f) : (f = l(f, p), f.return = d, f);
  }
  function a(d, f, p, y) {
    var k = p.type;
    return k === Ut ? m(d, f, p.props.children, y, p.key) : f !== null && (f.elementType === k || typeof k == "object" && k !== null && k.$$typeof === nt && Qs(k) === f.type) ? (y = l(f, p.props), y.ref = Sn(d, f, p), y.return = d, y) : (y = Ur(p.type, p.key, p.props, null, d.mode, y), y.ref = Sn(d, f, p), y.return = d, y);
  }
  function c(d, f, p, y) {
    return f === null || f.tag !== 4 || f.stateNode.containerInfo !== p.containerInfo || f.stateNode.implementation !== p.implementation ? (f = oi(p, d.mode, y), f.return = d, f) : (f = l(f, p.children || []), f.return = d, f);
  }
  function m(d, f, p, y, k) {
    return f === null || f.tag !== 7 ? (f = zt(p, d.mode, y, k), f.return = d, f) : (f = l(f, p), f.return = d, f);
  }
  function h(d, f, p) {
    if (typeof f == "string" && f !== "" || typeof f == "number")
      return f = ii("" + f, d.mode, p), f.return = d, f;
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case cr:
          return p = Ur(f.type, f.key, f.props, null, d.mode, p), p.ref = Sn(d, null, f), p.return = d, p;
        case At:
          return f = oi(f, d.mode, p), f.return = d, f;
        case nt:
          var y = f._init;
          return h(d, y(f._payload), p);
      }
      if (Cn(f) || vn(f))
        return f = zt(f, d.mode, p, null), f.return = d, f;
      Sr(d, f);
    }
    return null;
  }
  function v(d, f, p, y) {
    var k = f !== null ? f.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number")
      return k !== null ? null : s(d, f, "" + p, y);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case cr:
          return p.key === k ? a(d, f, p, y) : null;
        case At:
          return p.key === k ? c(d, f, p, y) : null;
        case nt:
          return k = p._init, v(
            d,
            f,
            k(p._payload),
            y
          );
      }
      if (Cn(p) || vn(p))
        return k !== null ? null : m(d, f, p, y, null);
      Sr(d, p);
    }
    return null;
  }
  function x(d, f, p, y, k) {
    if (typeof y == "string" && y !== "" || typeof y == "number")
      return d = d.get(p) || null, s(f, d, "" + y, k);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case cr:
          return d = d.get(y.key === null ? p : y.key) || null, a(f, d, y, k);
        case At:
          return d = d.get(y.key === null ? p : y.key) || null, c(f, d, y, k);
        case nt:
          var j = y._init;
          return x(d, f, p, j(y._payload), k);
      }
      if (Cn(y) || vn(y))
        return d = d.get(p) || null, m(f, d, y, k, null);
      Sr(f, y);
    }
    return null;
  }
  function g(d, f, p, y) {
    for (var k = null, j = null, E = f, P = f = 0, C = null; E !== null && P < p.length; P++) {
      E.index > P ? (C = E, E = null) : C = E.sibling;
      var T = v(d, E, p[P], y);
      if (T === null) {
        E === null && (E = C);
        break;
      }
      e && E && T.alternate === null && t(d, E), f = i(T, f, P), j === null ? k = T : j.sibling = T, j = T, E = C;
    }
    if (P === p.length)
      return n(d, E), U && Nt(d, P), k;
    if (E === null) {
      for (; P < p.length; P++)
        E = h(d, p[P], y), E !== null && (f = i(E, f, P), j === null ? k = E : j.sibling = E, j = E);
      return U && Nt(d, P), k;
    }
    for (E = r(d, E); P < p.length; P++)
      C = x(E, d, P, p[P], y), C !== null && (e && C.alternate !== null && E.delete(C.key === null ? P : C.key), f = i(C, f, P), j === null ? k = C : j.sibling = C, j = C);
    return e && E.forEach(function(G) {
      return t(d, G);
    }), U && Nt(d, P), k;
  }
  function w(d, f, p, y) {
    var k = vn(p);
    if (typeof k != "function")
      throw Error(S(150));
    if (p = k.call(p), p == null)
      throw Error(S(151));
    for (var j = k = null, E = f, P = f = 0, C = null, T = p.next(); E !== null && !T.done; P++, T = p.next()) {
      E.index > P ? (C = E, E = null) : C = E.sibling;
      var G = v(d, E, T.value, y);
      if (G === null) {
        E === null && (E = C);
        break;
      }
      e && E && G.alternate === null && t(d, E), f = i(G, f, P), j === null ? k = G : j.sibling = G, j = G, E = C;
    }
    if (T.done)
      return n(
        d,
        E
      ), U && Nt(d, P), k;
    if (E === null) {
      for (; !T.done; P++, T = p.next())
        T = h(d, T.value, y), T !== null && (f = i(T, f, P), j === null ? k = T : j.sibling = T, j = T);
      return U && Nt(d, P), k;
    }
    for (E = r(d, E); !T.done; P++, T = p.next())
      T = x(E, d, P, T.value, y), T !== null && (e && T.alternate !== null && E.delete(T.key === null ? P : T.key), f = i(T, f, P), j === null ? k = T : j.sibling = T, j = T);
    return e && E.forEach(function(be) {
      return t(d, be);
    }), U && Nt(d, P), k;
  }
  function z(d, f, p, y) {
    if (typeof p == "object" && p !== null && p.type === Ut && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case cr:
          e: {
            for (var k = p.key, j = f; j !== null; ) {
              if (j.key === k) {
                if (k = p.type, k === Ut) {
                  if (j.tag === 7) {
                    n(d, j.sibling), f = l(j, p.props.children), f.return = d, d = f;
                    break e;
                  }
                } else if (j.elementType === k || typeof k == "object" && k !== null && k.$$typeof === nt && Qs(k) === j.type) {
                  n(d, j.sibling), f = l(j, p.props), f.ref = Sn(d, j, p), f.return = d, d = f;
                  break e;
                }
                n(d, j);
                break;
              } else
                t(d, j);
              j = j.sibling;
            }
            p.type === Ut ? (f = zt(p.props.children, d.mode, y, p.key), f.return = d, d = f) : (y = Ur(p.type, p.key, p.props, null, d.mode, y), y.ref = Sn(d, f, p), y.return = d, d = y);
          }
          return o(d);
        case At:
          e: {
            for (j = p.key; f !== null; ) {
              if (f.key === j)
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
            f = oi(p, d.mode, y), f.return = d, d = f;
          }
          return o(d);
        case nt:
          return j = p._init, z(d, f, j(p._payload), y);
      }
      if (Cn(p))
        return g(d, f, p, y);
      if (vn(p))
        return w(d, f, p, y);
      Sr(d, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, f !== null && f.tag === 6 ? (n(d, f.sibling), f = l(f, p), f.return = d, d = f) : (n(d, f), f = ii(p, d.mode, y), f.return = d, d = f), o(d)) : n(d, f);
  }
  return z;
}
var un = Va(!0), Ha = Va(!1), lr = {}, Ue = wt(lr), Yn = wt(lr), Xn = wt(lr);
function Pt(e) {
  if (e === lr)
    throw Error(S(174));
  return e;
}
function Io(e, t) {
  switch (O(Xn, t), O(Yn, e), O(Ue, lr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ki(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ki(t, e);
  }
  A(Ue), O(Ue, t);
}
function an() {
  A(Ue), A(Yn), A(Xn);
}
function Qa(e) {
  Pt(Xn.current);
  var t = Pt(Ue.current), n = ki(t, e.type);
  t !== n && (O(Yn, e), O(Ue, n));
}
function Oo(e) {
  Yn.current === e && (A(Ue), A(Yn));
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
var bl = [];
function $o() {
  for (var e = 0; e < bl.length; e++)
    bl[e]._workInProgressVersionPrimary = null;
  bl.length = 0;
}
var Mr = Ze.ReactCurrentDispatcher, ei = Ze.ReactCurrentBatchConfig, Dt = 0, V = null, X = null, J = null, il = !1, Dn = !1, qn = 0, Od = 0;
function re() {
  throw Error(S(321));
}
function Ao(e, t) {
  if (t === null)
    return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Me(e[n], t[n]))
      return !1;
  return !0;
}
function Uo(e, t, n, r, l, i) {
  if (Dt = i, V = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Mr.current = e === null || e.memoizedState === null ? Bd : Vd, e = n(r, l), Dn) {
    i = 0;
    do {
      if (Dn = !1, qn = 0, 25 <= i)
        throw Error(S(301));
      i += 1, J = X = null, t.updateQueue = null, Mr.current = Hd, e = n(r, l);
    } while (Dn);
  }
  if (Mr.current = ol, t = X !== null && X.next !== null, Dt = 0, J = X = V = null, il = !1, t)
    throw Error(S(300));
  return e;
}
function Bo() {
  var e = qn !== 0;
  return qn = 0, e;
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
function Zn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ti(e) {
  var t = Pe(), n = t.queue;
  if (n === null)
    throw Error(S(311));
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
    var s = o = null, a = null, c = i;
    do {
      var m = c.lane;
      if ((Dt & m) === m)
        a !== null && (a = a.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var h = {
          lane: m,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        a === null ? (s = a = h, o = r) : a = a.next = h, V.lanes |= m, Ft |= m;
      }
      c = c.next;
    } while (c !== null && c !== i);
    a === null ? o = r : a.next = s, Me(r, t.memoizedState) || (pe = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = a, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, V.lanes |= i, Ft |= i, l = l.next;
    while (l !== e);
  } else
    l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ni(e) {
  var t = Pe(), n = t.queue;
  if (n === null)
    throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    Me(i, t.memoizedState) || (pe = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function Wa() {
}
function Ka(e, t) {
  var n = V, r = Pe(), l = t(), i = !Me(r.memoizedState, l);
  if (i && (r.memoizedState = l, pe = !0), r = r.queue, Vo(Xa.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || J !== null && J.memoizedState.tag & 1) {
    if (n.flags |= 2048, Jn(9, Ya.bind(null, n, r, l, t), void 0, null), b === null)
      throw Error(S(349));
    Dt & 30 || Ga(n, t, l);
  }
  return l;
}
function Ga(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = V.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, V.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Ya(e, t, n, r) {
  t.value = n, t.getSnapshot = r, qa(t) && Za(e);
}
function Xa(e, t, n) {
  return n(function() {
    qa(t) && Za(e);
  });
}
function qa(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Me(e, n);
  } catch {
    return !0;
  }
}
function Za(e) {
  var t = Xe(e, 1);
  t !== null && Fe(t, e, 1, -1);
}
function Ws(e) {
  var t = Oe();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Zn, lastRenderedState: e }, t.queue = e, e = e.dispatch = Ud.bind(null, V, e), [t.memoizedState, e];
}
function Jn(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = V.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, V.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ja() {
  return Pe().memoizedState;
}
function Ir(e, t, n, r) {
  var l = Oe();
  V.flags |= e, l.memoizedState = Jn(1 | t, n, void 0, r === void 0 ? null : r);
}
function jl(e, t, n, r) {
  var l = Pe();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (X !== null) {
    var o = X.memoizedState;
    if (i = o.destroy, r !== null && Ao(r, o.deps)) {
      l.memoizedState = Jn(t, n, i, r);
      return;
    }
  }
  V.flags |= e, l.memoizedState = Jn(1 | t, n, i, r);
}
function Ks(e, t) {
  return Ir(8390656, 8, e, t);
}
function Vo(e, t) {
  return jl(2048, 8, e, t);
}
function ba(e, t) {
  return jl(4, 2, e, t);
}
function ec(e, t) {
  return jl(4, 4, e, t);
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
  return n = n != null ? n.concat([e]) : null, jl(4, 4, tc.bind(null, t, e), n);
}
function Ho() {
}
function rc(e, t) {
  var n = Pe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ao(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function lc(e, t) {
  var n = Pe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ao(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function ic(e, t, n) {
  return Dt & 21 ? (Me(n, t) || (n = ua(), V.lanes |= n, Ft |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, pe = !0), e.memoizedState = n);
}
function $d(e, t) {
  var n = I;
  I = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = ei.transition;
  ei.transition = {};
  try {
    e(!1), t();
  } finally {
    I = n, ei.transition = r;
  }
}
function oc() {
  return Pe().memoizedState;
}
function Ad(e, t, n) {
  var r = mt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, sc(e))
    uc(t, n);
  else if (n = $a(e, t, n, r), n !== null) {
    var l = ue();
    Fe(n, e, r, l), ac(n, t, r);
  }
}
function Ud(e, t, n) {
  var r = mt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (sc(e))
    uc(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
      try {
        var o = t.lastRenderedState, s = i(o, n);
        if (l.hasEagerState = !0, l.eagerState = s, Me(s, o)) {
          var a = t.interleaved;
          a === null ? (l.next = l, Fo(t)) : (l.next = a.next, a.next = l), t.interleaved = l;
          return;
        }
      } catch {
      } finally {
      }
    n = $a(e, t, l, r), n !== null && (l = ue(), Fe(n, e, r, l), ac(n, t, r));
  }
}
function sc(e) {
  var t = e.alternate;
  return e === V || t !== null && t === V;
}
function uc(e, t) {
  Dn = il = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function ac(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, xo(e, n);
  }
}
var ol = { readContext: _e, useCallback: re, useContext: re, useEffect: re, useImperativeHandle: re, useInsertionEffect: re, useLayoutEffect: re, useMemo: re, useReducer: re, useRef: re, useState: re, useDebugValue: re, useDeferredValue: re, useTransition: re, useMutableSource: re, useSyncExternalStore: re, useId: re, unstable_isNewReconciler: !1 }, Bd = { readContext: _e, useCallback: function(e, t) {
  return Oe().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: _e, useEffect: Ks, useImperativeHandle: function(e, t, n) {
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
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Ad.bind(null, V, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Oe();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ws, useDebugValue: Ho, useDeferredValue: function(e) {
  return Oe().memoizedState = e;
}, useTransition: function() {
  var e = Ws(!1), t = e[0];
  return e = $d.bind(null, e[1]), Oe().memoizedState = e, [t, e];
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
    Dt & 30 || Ga(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Ks(Xa.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, Jn(9, Ya.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Oe(), t = b.identifierPrefix;
  if (U) {
    var n = We, r = Qe;
    n = (r & ~(1 << 32 - De(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = qn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else
    n = Od++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Vd = {
  readContext: _e,
  useCallback: rc,
  useContext: _e,
  useEffect: Vo,
  useImperativeHandle: nc,
  useInsertionEffect: ba,
  useLayoutEffect: ec,
  useMemo: lc,
  useReducer: ti,
  useRef: Ja,
  useState: function() {
    return ti(Zn);
  },
  useDebugValue: Ho,
  useDeferredValue: function(e) {
    var t = Pe();
    return ic(t, X.memoizedState, e);
  },
  useTransition: function() {
    var e = ti(Zn)[0], t = Pe().memoizedState;
    return [e, t];
  },
  useMutableSource: Wa,
  useSyncExternalStore: Ka,
  useId: oc,
  unstable_isNewReconciler: !1
}, Hd = { readContext: _e, useCallback: rc, useContext: _e, useEffect: Vo, useImperativeHandle: nc, useInsertionEffect: ba, useLayoutEffect: ec, useMemo: lc, useReducer: ni, useRef: Ja, useState: function() {
  return ni(Zn);
}, useDebugValue: Ho, useDeferredValue: function(e) {
  var t = Pe();
  return X === null ? t.memoizedState = e : ic(t, X.memoizedState, e);
}, useTransition: function() {
  var e = ni(Zn)[0], t = Pe().memoizedState;
  return [e, t];
}, useMutableSource: Wa, useSyncExternalStore: Ka, useId: oc, unstable_isNewReconciler: !1 };
function cn(e, t) {
  try {
    var n = "", r = t;
    do
      n += gf(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ri(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Wi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Qd = typeof WeakMap == "function" ? WeakMap : Map;
function cc(e, t, n) {
  n = Ke(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    ul || (ul = !0, to = r), Wi(e, t);
  }, n;
}
function fc(e, t, n) {
  n = Ke(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Wi(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Wi(e, t), typeof r != "function" && (pt === null ? pt = /* @__PURE__ */ new Set([this]) : pt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Gs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Qd();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else
    l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = lp.bind(null, e, t, n), t.then(e, e));
}
function Ys(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Xs(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ke(-1, 1), t.tag = 2, dt(n, t, 1))), n.lanes |= 1), e);
}
var Wd = Ze.ReactCurrentOwner, pe = !1;
function se(e, t, n, r) {
  t.child = e === null ? Ha(t, null, n, r) : un(t, e.child, n, r);
}
function qs(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return tn(t, l), r = Uo(e, t, n, r, i, l), n = Bo(), e !== null && !pe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qe(e, t, l)) : (U && n && Po(t), t.flags |= 1, se(e, t, r, l), t.child);
}
function Zs(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Zo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, dc(e, t, i, r, l)) : (e = Ur(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Qn, n(o, r) && e.ref === t.ref)
      return qe(e, t, l);
  }
  return t.flags |= 1, e = ht(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function dc(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Qn(i, r) && e.ref === t.ref)
      if (pe = !1, t.pendingProps = r = i, (e.lanes & l) !== 0)
        e.flags & 131072 && (pe = !0);
      else
        return t.lanes = e.lanes, qe(e, t, l);
  }
  return Ki(e, t, n, r, l);
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
  return se(e, t, l, n), t.child;
}
function mc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ki(e, t, n, r, l) {
  var i = he(n) ? Lt : oe.current;
  return i = on(t, i), tn(t, l), n = Uo(e, t, n, r, i, l), r = Bo(), e !== null && !pe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qe(e, t, l)) : (U && r && Po(t), t.flags |= 1, se(e, t, n, l), t.child);
}
function Js(e, t, n, r, l) {
  if (he(n)) {
    var i = !0;
    Jr(t);
  } else
    i = !1;
  if (tn(t, l), t.stateNode === null)
    Or(e, t), Ba(t, n, r), Qi(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, s = t.memoizedProps;
    o.props = s;
    var a = o.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = _e(c) : (c = he(n) ? Lt : oe.current, c = on(t, c));
    var m = n.getDerivedStateFromProps, h = typeof m == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    h || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || a !== c) && Hs(t, o, r, c), rt = !1;
    var v = t.memoizedState;
    o.state = v, rl(t, r, o, l), a = t.memoizedState, s !== r || v !== a || me.current || rt ? (typeof m == "function" && (Hi(t, n, m, r), a = t.memoizedState), (s = rt || Vs(t, n, s, r, v, a, c)) ? (h || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), o.props = r, o.state = a, o.context = c, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, Aa(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : ze(t.type, s), o.props = c, h = t.pendingProps, v = o.context, a = n.contextType, typeof a == "object" && a !== null ? a = _e(a) : (a = he(n) ? Lt : oe.current, a = on(t, a));
    var x = n.getDerivedStateFromProps;
    (m = typeof x == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== h || v !== a) && Hs(t, o, r, a), rt = !1, v = t.memoizedState, o.state = v, rl(t, r, o, l);
    var g = t.memoizedState;
    s !== h || v !== g || me.current || rt ? (typeof x == "function" && (Hi(t, n, x, r), g = t.memoizedState), (c = rt || Vs(t, n, c, r, v, g, a) || !1) ? (m || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, g, a), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, g, a)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && v === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = g), o.props = r, o.state = g, o.context = a, r = c) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && v === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Gi(e, t, n, r, i, l);
}
function Gi(e, t, n, r, l, i) {
  mc(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o)
    return l && Os(t, n, !1), qe(e, t, i);
  r = t.stateNode, Wd.current = t;
  var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = un(t, e.child, null, i), t.child = un(t, null, s, i)) : se(e, t, s, i), t.memoizedState = r.state, l && Os(t, n, !0), t.child;
}
function hc(e) {
  var t = e.stateNode;
  t.pendingContext ? Is(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Is(e, t.context, !1), Io(e, t.containerInfo);
}
function bs(e, t, n, r, l) {
  return sn(), zo(l), t.flags |= 256, se(e, t, n, r), t.child;
}
var Yi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Xi(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function vc(e, t, n) {
  var r = t.pendingProps, l = B.current, i = !1, o = (t.flags & 128) !== 0, s;
  if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), O(B, l & 1), e === null)
    return Bi(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = El(o, r, 0, null), e = zt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Xi(n), t.memoizedState = Yi, e) : Qo(t, o));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null))
    return Kd(e, t, o, r, s, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, s = l.sibling;
    var a = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = ht(l, a), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? i = ht(s, i) : (i = zt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Xi(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = Yi, r;
  }
  return i = e.child, e = i.sibling, r = ht(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Qo(e, t) {
  return t = El({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function kr(e, t, n, r) {
  return r !== null && zo(r), un(t, e.child, null, n), e = Qo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Kd(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ri(Error(S(422))), kr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = El({ mode: "visible", children: r.children }, l, 0, null), i = zt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && un(t, e.child, null, o), t.child.memoizedState = Xi(o), t.memoizedState = Yi, i);
  if (!(t.mode & 1))
    return kr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r)
      var s = r.dgst;
    return r = s, i = Error(S(419)), r = ri(i, r, void 0), kr(e, t, o, r);
  }
  if (s = (o & e.childLanes) !== 0, pe || s) {
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
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Xe(e, l), Fe(r, e, l, -1));
    }
    return qo(), r = ri(Error(S(421))), kr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = ip.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, ye = ft(l.nextSibling), we = t, U = !0, Re = null, e !== null && (je[Ne++] = Qe, je[Ne++] = We, je[Ne++] = Rt, Qe = e.id, We = e.overflow, Rt = t), t = Qo(t, r.children), t.flags |= 4096, t);
}
function eu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Vi(e.return, t, n);
}
function li(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function gc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (se(e, t, r.children, n), r = B.current, r & 2)
    r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128)
      e:
        for (e = t.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && eu(e, n, t);
          else if (e.tag === 19)
            eu(e, n, t);
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
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), li(t, !1, l, n, i);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && ll(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        li(t, !0, n, null, i);
        break;
      case "together":
        li(t, !1, null, null, void 0);
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
  if (e !== null && (t.dependencies = e.dependencies), Ft |= t.lanes, !(n & t.childLanes))
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
function Gd(e, t, n) {
  switch (t.tag) {
    case 3:
      hc(t), sn();
      break;
    case 5:
      Qa(t);
      break;
    case 1:
      he(t.type) && Jr(t);
      break;
    case 4:
      Io(t, t.stateNode.containerInfo);
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
var yc, qi, wc, xc;
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
qi = function() {
};
wc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Pt(Ue.current);
    var i = null;
    switch (n) {
      case "input":
        l = yi(e, l), r = yi(e, r), i = [];
        break;
      case "select":
        l = H({}, l, { value: void 0 }), r = H({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = Si(e, l), r = Si(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = qr);
    }
    ji(n, r);
    var o;
    n = null;
    for (c in l)
      if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
        if (c === "style") {
          var s = l[c];
          for (o in s)
            s.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
        } else
          c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (On.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in r) {
      var a = r[c];
      if (s = l != null ? l[c] : void 0, r.hasOwnProperty(c) && a !== s && (a != null || s != null))
        if (c === "style")
          if (s) {
            for (o in s)
              !s.hasOwnProperty(o) || a && a.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
            for (o in a)
              a.hasOwnProperty(o) && s[o] !== a[o] && (n || (n = {}), n[o] = a[o]);
          } else
            n || (i || (i = []), i.push(
              c,
              n
            )), n = a;
        else
          c === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, s = s ? s.__html : void 0, a != null && s !== a && (i = i || []).push(c, a)) : c === "children" ? typeof a != "string" && typeof a != "number" || (i = i || []).push(c, "" + a) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (On.hasOwnProperty(c) ? (a != null && c === "onScroll" && $("scroll", e), i || s === a || (i = [])) : (i = i || []).push(c, a));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
xc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function kn(e, t) {
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
function Yd(e, t, n) {
  var r = t.pendingProps;
  switch (To(t), t.tag) {
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
      return r = t.stateNode, an(), A(me), A(oe), $o(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (xr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Re !== null && (lo(Re), Re = null))), qi(e, t), le(t), null;
    case 5:
      Oo(t);
      var l = Pt(Xn.current);
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
          switch (r[$e] = t, r[Gn] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              $("cancel", r), $("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              $("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < _n.length; l++)
                $(_n[l], r);
              break;
            case "source":
              $("error", r);
              break;
            case "img":
            case "image":
            case "link":
              $(
                "error",
                r
              ), $("load", r);
              break;
            case "details":
              $("toggle", r);
              break;
            case "input":
              as(r, i), $("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, $("invalid", r);
              break;
            case "textarea":
              fs(r, i), $("invalid", r);
          }
          ji(n, i), l = null;
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var s = i[o];
              o === "children" ? typeof s == "string" ? r.textContent !== s && (i.suppressHydrationWarning !== !0 && wr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (i.suppressHydrationWarning !== !0 && wr(
                r.textContent,
                s,
                e
              ), l = ["children", "" + s]) : On.hasOwnProperty(o) && s != null && o === "onScroll" && $("scroll", r);
            }
          switch (n) {
            case "input":
              fr(r), cs(r, i, !0);
              break;
            case "textarea":
              fr(r), ds(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = qr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Gu(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[$e] = t, e[Gn] = r, yc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = Ni(n, r), n) {
              case "dialog":
                $("cancel", e), $("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                $("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < _n.length; l++)
                  $(_n[l], e);
                l = r;
                break;
              case "source":
                $("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                $(
                  "error",
                  e
                ), $("load", e), l = r;
                break;
              case "details":
                $("toggle", e), l = r;
                break;
              case "input":
                as(e, r), l = yi(e, r), $("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = H({}, r, { value: void 0 }), $("invalid", e);
                break;
              case "textarea":
                fs(e, r), l = Si(e, r), $("invalid", e);
                break;
              default:
                l = r;
            }
            ji(n, l), s = l;
            for (i in s)
              if (s.hasOwnProperty(i)) {
                var a = s[i];
                i === "style" ? qu(e, a) : i === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Yu(e, a)) : i === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && $n(e, a) : typeof a == "number" && $n(e, "" + a) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (On.hasOwnProperty(i) ? a != null && i === "onScroll" && $("scroll", e) : a != null && mo(e, i, a, o));
              }
            switch (n) {
              case "input":
                fr(e), cs(e, r, !1);
                break;
              case "textarea":
                fr(e), ds(e);
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
        if (n = Pt(Xn.current), Pt(Ue.current), xr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[$e] = t, (i = r.nodeValue !== n) && (e = we, e !== null))
            switch (e.tag) {
              case 3:
                wr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && wr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[$e] = t, t.stateNode = r;
      }
      return le(t), null;
    case 13:
      if (A(B), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (U && ye !== null && t.mode & 1 && !(t.flags & 128))
          Oa(), sn(), t.flags |= 98560, i = !1;
        else if (i = xr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i)
              throw Error(S(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i)
              throw Error(S(317));
            i[$e] = t;
          } else
            sn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          le(t), i = !1;
        } else
          Re !== null && (lo(Re), Re = null), i = !0;
        if (!i)
          return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || B.current & 1 ? q === 0 && (q = 3) : qo())), t.updateQueue !== null && (t.flags |= 4), le(t), null);
    case 4:
      return an(), qi(e, t), e === null && Wn(t.stateNode.containerInfo), le(t), null;
    case 10:
      return Do(t.type._context), le(t), null;
    case 17:
      return he(t.type) && Zr(), le(t), null;
    case 19:
      if (A(B), i = t.memoizedState, i === null)
        return le(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null)
        if (r)
          kn(i, !1);
        else {
          if (q !== 0 || e !== null && e.flags & 128)
            for (e = t.child; e !== null; ) {
              if (o = ll(e), o !== null) {
                for (t.flags |= 128, kn(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; )
                  i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
                return O(B, B.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null && K() > fn && (t.flags |= 128, r = !0, kn(i, !1), t.lanes = 4194304);
        }
      else {
        if (!r)
          if (e = ll(o), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), kn(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !U)
              return le(t), null;
          } else
            2 * K() - i.renderingStartTime > fn && n !== 1073741824 && (t.flags |= 128, r = !0, kn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = K(), t.sibling = null, n = B.current, O(B, r ? n & 1 | 2 : n & 1), t) : (le(t), null);
    case 22:
    case 23:
      return Xo(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ge & 1073741824 && (le(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : le(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(S(156, t.tag));
}
function Xd(e, t) {
  switch (To(t), t.tag) {
    case 1:
      return he(t.type) && Zr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return an(), A(me), A(oe), $o(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Oo(t), null;
    case 13:
      if (A(B), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(S(340));
        sn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return A(B), null;
    case 4:
      return an(), null;
    case 10:
      return Do(t.type._context), null;
    case 22:
    case 23:
      return Xo(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var jr = !1, ie = !1, qd = typeof WeakSet == "function" ? WeakSet : Set, N = null;
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
function Zi(e, t, n) {
  try {
    n();
  } catch (r) {
    Q(e, t, r);
  }
}
var tu = !1;
function Zd(e, t) {
  if (Fi = Gr, e = Na(), _o(e)) {
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
          var o = 0, s = -1, a = -1, c = 0, m = 0, h = e, v = null;
          t:
            for (; ; ) {
              for (var x; h !== n || l !== 0 && h.nodeType !== 3 || (s = o + l), h !== i || r !== 0 && h.nodeType !== 3 || (a = o + r), h.nodeType === 3 && (o += h.nodeValue.length), (x = h.firstChild) !== null; )
                v = h, h = x;
              for (; ; ) {
                if (h === e)
                  break t;
                if (v === n && ++c === l && (s = o), v === i && ++m === r && (a = o), (x = h.nextSibling) !== null)
                  break;
                h = v, v = h.parentNode;
              }
              h = x;
            }
          n = s === -1 || a === -1 ? null : { start: s, end: a };
        } else
          n = null;
      }
    n = n || { start: 0, end: 0 };
  } else
    n = null;
  for (Mi = { focusedElem: e, selectionRange: n }, Gr = !1, N = t; N !== null; )
    if (t = N, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
      e.return = t, N = e;
    else
      for (; N !== null; ) {
        t = N;
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
                  var w = g.memoizedProps, z = g.memoizedState, d = t.stateNode, f = d.getSnapshotBeforeUpdate(t.elementType === t.type ? w : ze(t.type, w), z);
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
                throw Error(S(163));
            }
        } catch (y) {
          Q(t, t.return, y);
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, N = e;
          break;
        }
        N = t.return;
      }
  return g = tu, tu = !1, g;
}
function Fn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Zi(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Nl(e, t) {
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
function Ji(e) {
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
  t !== null && (e.alternate = null, Sc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[$e], delete t[Gn], delete t[$i], delete t[Dd], delete t[Fd])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function kc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function nu(e) {
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
function bi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = qr));
  else if (r !== 4 && (e = e.child, e !== null))
    for (bi(e, t, n), e = e.sibling; e !== null; )
      bi(e, t, n), e = e.sibling;
}
function eo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null))
    for (eo(e, t, n), e = e.sibling; e !== null; )
      eo(e, t, n), e = e.sibling;
}
var ee = null, Le = !1;
function tt(e, t, n) {
  for (n = n.child; n !== null; )
    jc(e, t, n), n = n.sibling;
}
function jc(e, t, n) {
  if (Ae && typeof Ae.onCommitFiberUnmount == "function")
    try {
      Ae.onCommitFiberUnmount(vl, n);
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
      ee !== null && (Le ? (e = ee, n = n.stateNode, e.nodeType === 8 ? Zl(e.parentNode, n) : e.nodeType === 1 && Zl(e, n), Vn(e)) : Zl(ee, n.stateNode));
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
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Zi(n, t, o), l = l.next;
        } while (l !== r);
      }
      tt(e, t, n);
      break;
    case 1:
      if (!ie && (Xt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
        try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (s) {
          Q(n, t, s);
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
function ru(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new qd()), t.forEach(function(r) {
      var l = op.bind(null, e, r);
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
        var i = e, o = t, s = o;
        e:
          for (; s !== null; ) {
            switch (s.tag) {
              case 5:
                ee = s.stateNode, Le = !1;
                break e;
              case 3:
                ee = s.stateNode.containerInfo, Le = !0;
                break e;
              case 4:
                ee = s.stateNode.containerInfo, Le = !0;
                break e;
            }
            s = s.return;
          }
        if (ee === null)
          throw Error(S(160));
        jc(i, o, l), ee = null, Le = !1;
        var a = l.alternate;
        a !== null && (a.return = null), l.return = null;
      } catch (c) {
        Q(l, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; )
      Nc(t, e), t = t.sibling;
}
function Nc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Te(t, e), Ie(e), r & 4) {
        try {
          Fn(3, e, e.return), Nl(3, e);
        } catch (w) {
          Q(e, e.return, w);
        }
        try {
          Fn(5, e, e.return);
        } catch (w) {
          Q(e, e.return, w);
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
        } catch (w) {
          Q(e, e.return, w);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, s = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null)
          try {
            s === "input" && i.type === "radio" && i.name != null && Wu(l, i), Ni(s, o);
            var c = Ni(s, i);
            for (o = 0; o < a.length; o += 2) {
              var m = a[o], h = a[o + 1];
              m === "style" ? qu(l, h) : m === "dangerouslySetInnerHTML" ? Yu(l, h) : m === "children" ? $n(l, h) : mo(l, m, h, c);
            }
            switch (s) {
              case "input":
                wi(l, i);
                break;
              case "textarea":
                Ku(l, i);
                break;
              case "select":
                var v = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var x = i.value;
                x != null ? Zt(l, !!i.multiple, x, !1) : v !== !!i.multiple && (i.defaultValue != null ? Zt(
                  l,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                ) : Zt(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[Gn] = i;
          } catch (w) {
            Q(e, e.return, w);
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
        } catch (w) {
          Q(e, e.return, w);
        }
      }
      break;
    case 3:
      if (Te(t, e), Ie(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        try {
          Vn(t.containerInfo);
        } catch (w) {
          Q(e, e.return, w);
        }
      break;
    case 4:
      Te(t, e), Ie(e);
      break;
    case 13:
      Te(t, e), Ie(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Go = K())), r & 4 && ru(e);
      break;
    case 22:
      if (m = n !== null && n.memoizedState !== null, e.mode & 1 ? (ie = (c = ie) || m, Te(t, e), ie = c) : Te(t, e), Ie(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !m && e.mode & 1)
          for (N = e, m = e.child; m !== null; ) {
            for (h = N = m; N !== null; ) {
              switch (v = N, x = v.child, v.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Fn(4, v, v.return);
                  break;
                case 1:
                  Xt(v, v.return);
                  var g = v.stateNode;
                  if (typeof g.componentWillUnmount == "function") {
                    r = v, n = v.return;
                    try {
                      t = r, g.props = t.memoizedProps, g.state = t.memoizedState, g.componentWillUnmount();
                    } catch (w) {
                      Q(r, n, w);
                    }
                  }
                  break;
                case 5:
                  Xt(v, v.return);
                  break;
                case 22:
                  if (v.memoizedState !== null) {
                    iu(h);
                    continue;
                  }
              }
              x !== null ? (x.return = v, N = x) : iu(h);
            }
            m = m.sibling;
          }
        e:
          for (m = null, h = e; ; ) {
            if (h.tag === 5) {
              if (m === null) {
                m = h;
                try {
                  l = h.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (s = h.stateNode, a = h.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null, s.style.display = Xu("display", o));
                } catch (w) {
                  Q(e, e.return, w);
                }
              }
            } else if (h.tag === 6) {
              if (m === null)
                try {
                  h.stateNode.nodeValue = c ? "" : h.memoizedProps;
                } catch (w) {
                  Q(e, e.return, w);
                }
            } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === e) && h.child !== null) {
              h.child.return = h, h = h.child;
              continue;
            }
            if (h === e)
              break e;
            for (; h.sibling === null; ) {
              if (h.return === null || h.return === e)
                break e;
              m === h && (m = null), h = h.return;
            }
            m === h && (m = null), h.sibling.return = h.return, h = h.sibling;
          }
      }
      break;
    case 19:
      Te(t, e), Ie(e), r & 4 && ru(e);
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
          var i = nu(e);
          eo(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, s = nu(e);
          bi(e, s, o);
          break;
        default:
          throw Error(S(161));
      }
    } catch (a) {
      Q(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Jd(e, t, n) {
  N = e, Cc(e);
}
function Cc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; N !== null; ) {
    var l = N, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || jr;
      if (!o) {
        var s = l.alternate, a = s !== null && s.memoizedState !== null || ie;
        s = jr;
        var c = ie;
        if (jr = o, (ie = a) && !c)
          for (N = l; N !== null; )
            o = N, a = o.child, o.tag === 22 && o.memoizedState !== null ? ou(l) : a !== null ? (a.return = o, N = a) : ou(l);
        for (; i !== null; )
          N = i, Cc(i), i = i.sibling;
        N = l, jr = s, ie = c;
      }
      lu(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? (i.return = l, N = i) : lu(e);
  }
}
function lu(e) {
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
              ie || Nl(5, t);
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
              i !== null && Bs(t, i, r);
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
                Bs(t, o, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
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
                    var h = m.dehydrated;
                    h !== null && Vn(h);
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
        ie || t.flags & 512 && Ji(t);
      } catch (v) {
        Q(t, t.return, v);
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
function iu(e) {
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
function ou(e) {
  for (; N !== null; ) {
    var t = N;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Nl(4, t);
          } catch (a) {
            Q(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              Q(t, l, a);
            }
          }
          var i = t.return;
          try {
            Ji(t);
          } catch (a) {
            Q(t, i, a);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Ji(t);
          } catch (a) {
            Q(t, o, a);
          }
      }
    } catch (a) {
      Q(t, t.return, a);
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
var bd = Math.ceil, sl = Ze.ReactCurrentDispatcher, Wo = Ze.ReactCurrentOwner, Ee = Ze.ReactCurrentBatchConfig, M = 0, b = null, Y = null, te = 0, ge = 0, qt = wt(0), q = 0, bn = null, Ft = 0, Cl = 0, Ko = 0, Mn = null, de = null, Go = 0, fn = 1 / 0, Be = null, ul = !1, to = null, pt = null, Nr = !1, st = null, al = 0, In = 0, no = null, $r = -1, Ar = 0;
function ue() {
  return M & 6 ? K() : $r !== -1 ? $r : $r = K();
}
function mt(e) {
  return e.mode & 1 ? M & 2 && te !== 0 ? te & -te : Id.transition !== null ? (Ar === 0 && (Ar = ua()), Ar) : (e = I, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ha(e.type)), e) : 1;
}
function Fe(e, t, n, r) {
  if (50 < In)
    throw In = 0, no = null, Error(S(185));
  tr(e, n, r), (!(M & 2) || e !== b) && (e === b && (!(M & 2) && (Cl |= n), q === 4 && it(e, te)), ve(e, r), n === 1 && M === 0 && !(t.mode & 1) && (fn = K() + 500, Sl && xt()));
}
function ve(e, t) {
  var n = e.callbackNode;
  If(e, t);
  var r = Kr(e, e === b ? te : 0);
  if (r === 0)
    n !== null && hs(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && hs(n), t === 1)
      e.tag === 0 ? Md(su.bind(null, e)) : Fa(su.bind(null, e)), Ld(function() {
        !(M & 6) && xt();
      }), n = null;
    else {
      switch (aa(r)) {
        case 1:
          n = wo;
          break;
        case 4:
          n = oa;
          break;
        case 16:
          n = Wr;
          break;
        case 536870912:
          n = sa;
          break;
        default:
          n = Wr;
      }
      n = Dc(n, Ec.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Ec(e, t) {
  if ($r = -1, Ar = 0, M & 6)
    throw Error(S(327));
  var n = e.callbackNode;
  if (nn() && e.callbackNode !== n)
    return null;
  var r = Kr(e, e === b ? te : 0);
  if (r === 0)
    return null;
  if (r & 30 || r & e.expiredLanes || t)
    t = cl(e, r);
  else {
    t = r;
    var l = M;
    M |= 2;
    var i = Pc();
    (b !== e || te !== t) && (Be = null, fn = K() + 500, Tt(e, t));
    do
      try {
        np();
        break;
      } catch (s) {
        _c(e, s);
      }
    while (!0);
    Ro(), sl.current = i, M = l, Y !== null ? t = 0 : (b = null, te = 0, t = q);
  }
  if (t !== 0) {
    if (t === 2 && (l = Ti(e), l !== 0 && (r = l, t = ro(e, l))), t === 1)
      throw n = bn, Tt(e, 0), it(e, r), ve(e, K()), n;
    if (t === 6)
      it(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !ep(l) && (t = cl(e, r), t === 2 && (i = Ti(e), i !== 0 && (r = i, t = ro(e, i))), t === 1))
        throw n = bn, Tt(e, 0), it(e, r), ve(e, K()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(S(345));
        case 2:
          Ct(e, de, Be);
          break;
        case 3:
          if (it(e, r), (r & 130023424) === r && (t = Go + 500 - K(), 10 < t)) {
            if (Kr(e, 0) !== 0)
              break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ue(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Oi(Ct.bind(null, e, de, Be), t);
            break;
          }
          Ct(e, de, Be);
          break;
        case 4:
          if (it(e, r), (r & 4194240) === r)
            break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - De(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = K() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * bd(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Oi(Ct.bind(null, e, de, Be), r);
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
  return ve(e, K()), e.callbackNode === n ? Ec.bind(null, e) : null;
}
function ro(e, t) {
  var n = Mn;
  return e.current.memoizedState.isDehydrated && (Tt(e, t).flags |= 256), e = cl(e, t), e !== 2 && (t = de, de = n, t !== null && lo(t)), e;
}
function lo(e) {
  de === null ? de = e : de.push.apply(de, e);
}
function ep(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r], i = l.getSnapshot;
          l = l.value;
          try {
            if (!Me(i(), l))
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
  for (t &= ~Ko, t &= ~Cl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - De(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function su(e) {
  if (M & 6)
    throw Error(S(327));
  nn();
  var t = Kr(e, 0);
  if (!(t & 1))
    return ve(e, K()), null;
  var n = cl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ti(e);
    r !== 0 && (t = r, n = ro(e, r));
  }
  if (n === 1)
    throw n = bn, Tt(e, 0), it(e, t), ve(e, K()), n;
  if (n === 6)
    throw Error(S(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ct(e, de, Be), ve(e, K()), null;
}
function Yo(e, t) {
  var n = M;
  M |= 1;
  try {
    return e(t);
  } finally {
    M = n, M === 0 && (fn = K() + 500, Sl && xt());
  }
}
function Mt(e) {
  st !== null && st.tag === 0 && !(M & 6) && nn();
  var t = M;
  M |= 1;
  var n = Ee.transition, r = I;
  try {
    if (Ee.transition = null, I = 1, e)
      return e();
  } finally {
    I = r, Ee.transition = n, M = t, !(M & 6) && xt();
  }
}
function Xo() {
  ge = qt.current, A(qt);
}
function Tt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, zd(n)), Y !== null)
    for (n = Y.return; n !== null; ) {
      var r = n;
      switch (To(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Zr();
          break;
        case 3:
          an(), A(me), A(oe), $o();
          break;
        case 5:
          Oo(r);
          break;
        case 4:
          an();
          break;
        case 13:
          A(B);
          break;
        case 19:
          A(B);
          break;
        case 10:
          Do(r.type._context);
          break;
        case 22:
        case 23:
          Xo();
      }
      n = n.return;
    }
  if (b = e, Y = e = ht(e.current, null), te = ge = t, q = 0, bn = null, Ko = Cl = Ft = 0, de = Mn = null, _t !== null) {
    for (t = 0; t < _t.length; t++)
      if (n = _t[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var l = r.next, i = n.pending;
        if (i !== null) {
          var o = i.next;
          i.next = l, r.next = o;
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
      if (Ro(), Mr.current = ol, il) {
        for (var r = V.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        il = !1;
      }
      if (Dt = 0, J = X = V = null, Dn = !1, qn = 0, Wo.current = null, n === null || n.return === null) {
        q = 1, bn = t, Y = null;
        break;
      }
      e: {
        var i = e, o = n.return, s = n, a = t;
        if (t = te, s.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var c = a, m = s, h = m.tag;
          if (!(m.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var v = m.alternate;
            v ? (m.updateQueue = v.updateQueue, m.memoizedState = v.memoizedState, m.lanes = v.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var x = Ys(o);
          if (x !== null) {
            x.flags &= -257, Xs(x, o, s, i, t), x.mode & 1 && Gs(i, c, t), t = x, a = c;
            var g = t.updateQueue;
            if (g === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(a), t.updateQueue = w;
            } else
              g.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              Gs(i, c, t), qo();
              break e;
            }
            a = Error(S(426));
          }
        } else if (U && s.mode & 1) {
          var z = Ys(o);
          if (z !== null) {
            !(z.flags & 65536) && (z.flags |= 256), Xs(z, o, s, i, t), zo(cn(a, s));
            break e;
          }
        }
        i = a = cn(a, s), q !== 4 && (q = 2), Mn === null ? Mn = [i] : Mn.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var d = cc(i, a, t);
              Us(i, d);
              break e;
            case 1:
              s = a;
              var f = i.type, p = i.stateNode;
              if (!(i.flags & 128) && (typeof f.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (pt === null || !pt.has(p)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var y = fc(i, s, t);
                Us(i, y);
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
  var e = sl.current;
  return sl.current = ol, e === null ? ol : e;
}
function qo() {
  (q === 0 || q === 3 || q === 2) && (q = 4), b === null || !(Ft & 268435455) && !(Cl & 268435455) || it(b, te);
}
function cl(e, t) {
  var n = M;
  M |= 2;
  var r = Pc();
  (b !== e || te !== t) && (Be = null, Tt(e, t));
  do
    try {
      tp();
      break;
    } catch (l) {
      _c(e, l);
    }
  while (!0);
  if (Ro(), M = n, sl.current = r, Y !== null)
    throw Error(S(261));
  return b = null, te = 0, q;
}
function tp() {
  for (; Y !== null; )
    Tc(Y);
}
function np() {
  for (; Y !== null && !_f(); )
    Tc(Y);
}
function Tc(e) {
  var t = Rc(e.alternate, e, ge);
  e.memoizedProps = e.pendingProps, t === null ? zc(e) : Y = t, Wo.current = null;
}
function zc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Xd(n, t), n !== null) {
        n.flags &= 32767, Y = n;
        return;
      }
      if (e !== null)
        e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        q = 6, Y = null;
        return;
      }
    } else if (n = Yd(n, t, ge), n !== null) {
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
    Ee.transition = null, I = 1, rp(e, t, n, r);
  } finally {
    Ee.transition = l, I = r;
  }
  return null;
}
function rp(e, t, n, r) {
  do
    nn();
  while (st !== null);
  if (M & 6)
    throw Error(S(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null)
    return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current)
    throw Error(S(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Of(e, i), e === b && (Y = b = null, te = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Nr || (Nr = !0, Dc(Wr, function() {
    return nn(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Ee.transition, Ee.transition = null;
    var o = I;
    I = 1;
    var s = M;
    M |= 4, Wo.current = null, Zd(e, n), Nc(n, e), jd(Mi), Gr = !!Fi, Mi = Fi = null, e.current = n, Jd(n), Pf(), M = s, I = o, Ee.transition = i;
  } else
    e.current = n;
  if (Nr && (Nr = !1, st = e, al = l), i = e.pendingLanes, i === 0 && (pt = null), Lf(n.stateNode), ve(e, K()), t !== null)
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (ul)
    throw ul = !1, e = to, to = null, e;
  return al & 1 && e.tag !== 0 && nn(), i = e.pendingLanes, i & 1 ? e === no ? In++ : (In = 0, no = e) : In = 0, xt(), null;
}
function nn() {
  if (st !== null) {
    var e = aa(al), t = Ee.transition, n = I;
    try {
      if (Ee.transition = null, I = 16 > e ? 16 : e, st === null)
        var r = !1;
      else {
        if (e = st, st = null, al = 0, M & 6)
          throw Error(S(331));
        var l = M;
        for (M |= 4, N = e.current; N !== null; ) {
          var i = N, o = i.child;
          if (N.flags & 16) {
            var s = i.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var c = s[a];
                for (N = c; N !== null; ) {
                  var m = N;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Fn(8, m, i);
                  }
                  var h = m.child;
                  if (h !== null)
                    h.return = m, N = h;
                  else
                    for (; N !== null; ) {
                      m = N;
                      var v = m.sibling, x = m.return;
                      if (Sc(m), m === c) {
                        N = null;
                        break;
                      }
                      if (v !== null) {
                        v.return = x, N = v;
                        break;
                      }
                      N = x;
                    }
                }
              }
              var g = i.alternate;
              if (g !== null) {
                var w = g.child;
                if (w !== null) {
                  g.child = null;
                  do {
                    var z = w.sibling;
                    w.sibling = null, w = z;
                  } while (w !== null);
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
                      Fn(9, i, i.return);
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
                if (s = N, s.flags & 2048)
                  try {
                    switch (s.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Nl(9, s);
                    }
                  } catch (k) {
                    Q(s, s.return, k);
                  }
                if (s === o) {
                  N = null;
                  break e;
                }
                var y = s.sibling;
                if (y !== null) {
                  y.return = s.return, N = y;
                  break e;
                }
                N = s.return;
              }
        }
        if (M = l, xt(), Ae && typeof Ae.onPostCommitFiberRoot == "function")
          try {
            Ae.onPostCommitFiberRoot(vl, e);
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
function uu(e, t, n) {
  t = cn(n, t), t = cc(e, t, 1), e = dt(e, t, 1), t = ue(), e !== null && (tr(e, 1, t), ve(e, t));
}
function Q(e, t, n) {
  if (e.tag === 3)
    uu(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        uu(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (pt === null || !pt.has(r))) {
          e = cn(n, e), e = fc(t, e, 1), t = dt(t, e, 1), e = ue(), t !== null && (tr(t, 1, e), ve(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function lp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ue(), e.pingedLanes |= e.suspendedLanes & n, b === e && (te & n) === n && (q === 4 || q === 3 && (te & 130023424) === te && 500 > K() - Go ? Tt(e, 0) : Ko |= n), ve(e, t);
}
function Lc(e, t) {
  t === 0 && (e.mode & 1 ? (t = mr, mr <<= 1, !(mr & 130023424) && (mr = 4194304)) : t = 1);
  var n = ue();
  e = Xe(e, t), e !== null && (tr(e, t, n), ve(e, n));
}
function ip(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Lc(e, n);
}
function op(e, t) {
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
        return pe = !1, Gd(e, t, n);
      pe = !!(e.flags & 131072);
    }
  else
    pe = !1, U && t.flags & 1048576 && Ma(t, el, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Or(e, t), e = t.pendingProps;
      var l = on(t, oe.current);
      tn(t, n), l = Uo(null, t, r, e, l, n);
      var i = Bo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, he(r) ? (i = !0, Jr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Mo(t), l.updater = kl, t.stateNode = l, l._reactInternals = t, Qi(t, r, e, n), t = Gi(null, t, r, !0, i, n)) : (t.tag = 0, U && i && Po(t), se(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Or(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = up(r), e = ze(r, e), l) {
          case 0:
            t = Ki(null, t, r, e, n);
            break e;
          case 1:
            t = Js(null, t, r, e, n);
            break e;
          case 11:
            t = qs(null, t, r, e, n);
            break e;
          case 14:
            t = Zs(null, t, r, ze(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Ki(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Js(e, t, r, l, n);
    case 3:
      e: {
        if (hc(t), e === null)
          throw Error(S(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, Aa(e, t), rl(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated)
          if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
            l = cn(Error(S(423)), t), t = bs(e, t, r, n, l);
            break e;
          } else if (r !== l) {
            l = cn(Error(S(424)), t), t = bs(e, t, r, n, l);
            break e;
          } else
            for (ye = ft(t.stateNode.containerInfo.firstChild), we = t, U = !0, Re = null, n = Ha(t, null, r, n), t.child = n; n; )
              n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (sn(), r === l) {
            t = qe(e, t, n);
            break e;
          }
          se(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Qa(t), e === null && Bi(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, Ii(r, l) ? o = null : i !== null && Ii(r, i) && (t.flags |= 32), mc(e, t), se(e, t, o, n), t.child;
    case 6:
      return e === null && Bi(t), null;
    case 13:
      return vc(e, t, n);
    case 4:
      return Io(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = un(t, null, r, n) : se(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), qs(e, t, r, l, n);
    case 7:
      return se(e, t, t.pendingProps, n), t.child;
    case 8:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, O(tl, r._currentValue), r._currentValue = o, i !== null)
          if (Me(i.value, o)) {
            if (i.children === l.children && !me.current) {
              t = qe(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var s = i.dependencies;
              if (s !== null) {
                o = i.child;
                for (var a = s.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      a = Ke(-1, n & -n), a.tag = 2;
                      var c = i.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var m = c.pending;
                        m === null ? a.next = a : (a.next = m.next, m.next = a), c.pending = a;
                      }
                    }
                    i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), Vi(
                      i.return,
                      n,
                      t
                    ), s.lanes |= n;
                    break;
                  }
                  a = a.next;
                }
              } else if (i.tag === 10)
                o = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (o = i.return, o === null)
                  throw Error(S(341));
                o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Vi(o, n, t), o = i.sibling;
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
      return l = t.type, r = t.pendingProps.children, tn(t, n), l = _e(l), r = r(l), t.flags |= 1, se(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = ze(r, t.pendingProps), l = ze(r.type, l), Zs(e, t, r, l, n);
    case 15:
      return dc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Or(e, t), t.tag = 1, he(r) ? (e = !0, Jr(t)) : e = !1, tn(t, n), Ba(t, r, l), Qi(t, r, l, n), Gi(null, t, r, !0, e, n);
    case 19:
      return gc(e, t, n);
    case 22:
      return pc(e, t, n);
  }
  throw Error(S(156, t.tag));
};
function Dc(e, t) {
  return ia(e, t);
}
function sp(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ce(e, t, n, r) {
  return new sp(e, t, n, r);
}
function Zo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function up(e) {
  if (typeof e == "function")
    return Zo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === vo)
      return 11;
    if (e === go)
      return 14;
  }
  return 2;
}
function ht(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ce(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ur(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function")
    Zo(e) && (o = 1);
  else if (typeof e == "string")
    o = 5;
  else
    e:
      switch (e) {
        case Ut:
          return zt(n.children, l, i, t);
        case ho:
          o = 8, l |= 8;
          break;
        case mi:
          return e = Ce(12, n, t, l | 2), e.elementType = mi, e.lanes = i, e;
        case hi:
          return e = Ce(13, n, t, l), e.elementType = hi, e.lanes = i, e;
        case vi:
          return e = Ce(19, n, t, l), e.elementType = vi, e.lanes = i, e;
        case Vu:
          return El(n, l, i, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Uu:
                o = 10;
                break e;
              case Bu:
                o = 9;
                break e;
              case vo:
                o = 11;
                break e;
              case go:
                o = 14;
                break e;
              case nt:
                o = 16, r = null;
                break e;
            }
          throw Error(S(130, e == null ? e : typeof e, ""));
      }
  return t = Ce(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function zt(e, t, n, r) {
  return e = Ce(7, e, r, t), e.lanes = n, e;
}
function El(e, t, n, r) {
  return e = Ce(22, e, r, t), e.elementType = Vu, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ii(e, t, n) {
  return e = Ce(6, e, null, t), e.lanes = n, e;
}
function oi(e, t, n) {
  return t = Ce(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function ap(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ul(0), this.expirationTimes = Ul(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ul(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Jo(e, t, n, r, l, i, o, s, a) {
  return e = new ap(e, t, n, s, a), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Ce(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Mo(i), e;
}
function cp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: At, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Fc(e) {
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
      return Da(e, n, t);
  }
  return t;
}
function Mc(e, t, n, r, l, i, o, s, a) {
  return e = Jo(n, r, !0, e, l, i, o, s, a), e.context = Fc(null), n = e.current, r = ue(), l = mt(n), i = Ke(r, l), i.callback = t ?? null, dt(n, i, l), e.current.lanes = l, tr(e, l, r), ve(e, r), e;
}
function _l(e, t, n, r) {
  var l = t.current, i = ue(), o = mt(l);
  return n = Fc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ke(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = dt(l, t, o), e !== null && (Fe(e, l, o, i), Fr(e, l, o)), o;
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
function au(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function bo(e, t) {
  au(e, t), (e = e.alternate) && au(e, t);
}
function fp() {
  return null;
}
var Ic = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function es(e) {
  this._internalRoot = e;
}
Pl.prototype.render = es.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null)
    throw Error(S(409));
  _l(e, t, null, null);
};
Pl.prototype.unmount = es.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Mt(function() {
      _l(null, e, null, null);
    }), t[Ye] = null;
  }
};
function Pl(e) {
  this._internalRoot = e;
}
Pl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = da();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < lt.length && t !== 0 && t < lt[n].priority; n++)
      ;
    lt.splice(n, 0, e), n === 0 && ma(e);
  }
};
function ts(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Tl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function cu() {
}
function dp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = fl(o);
        i.call(c);
      };
    }
    var o = Mc(t, r, e, 0, null, !1, !1, "", cu);
    return e._reactRootContainer = o, e[Ye] = o.current, Wn(e.nodeType === 8 ? e.parentNode : e), Mt(), o;
  }
  for (; l = e.lastChild; )
    e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var c = fl(a);
      s.call(c);
    };
  }
  var a = Jo(e, 0, !1, null, null, !1, !1, "", cu);
  return e._reactRootContainer = a, e[Ye] = a.current, Wn(e.nodeType === 8 ? e.parentNode : e), Mt(function() {
    _l(t, a, n, r);
  }), a;
}
function zl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var a = fl(o);
        s.call(a);
      };
    }
    _l(t, o, e, l);
  } else
    o = dp(n, t, e, l, r);
  return fl(o);
}
ca = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = En(t.pendingLanes);
        n !== 0 && (xo(t, n | 1), ve(t, K()), !(M & 6) && (fn = K() + 500, xt()));
      }
      break;
    case 13:
      Mt(function() {
        var r = Xe(e, 1);
        if (r !== null) {
          var l = ue();
          Fe(r, e, 1, l);
        }
      }), bo(e, 1);
  }
};
So = function(e) {
  if (e.tag === 13) {
    var t = Xe(e, 134217728);
    if (t !== null) {
      var n = ue();
      Fe(t, e, 134217728, n);
    }
    bo(e, 134217728);
  }
};
fa = function(e) {
  if (e.tag === 13) {
    var t = mt(e), n = Xe(e, t);
    if (n !== null) {
      var r = ue();
      Fe(n, e, t, r);
    }
    bo(e, t);
  }
};
da = function() {
  return I;
};
pa = function(e, t) {
  var n = I;
  try {
    return I = e, t();
  } finally {
    I = n;
  }
};
Ei = function(e, t, n) {
  switch (t) {
    case "input":
      if (wi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; )
          n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = xl(r);
            if (!l)
              throw Error(S(90));
            Qu(r), wi(r, l);
          }
        }
      }
      break;
    case "textarea":
      Ku(e, n);
      break;
    case "select":
      t = n.value, t != null && Zt(e, !!n.multiple, t, !1);
  }
};
bu = Yo;
ea = Mt;
var pp = { usingClientEntryPoint: !1, Events: [rr, Qt, xl, Zu, Ju, Yo] }, jn = { findFiberByHostInstance: Et, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, mp = { bundleType: jn.bundleType, version: jn.version, rendererPackageName: jn.rendererPackageName, rendererConfig: jn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ze.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = ra(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: jn.findFiberByHostInstance || fp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Cr.isDisabled && Cr.supportsFiber)
    try {
      vl = Cr.inject(mp), Ae = Cr;
    } catch {
    }
}
Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = pp;
Se.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ts(t))
    throw Error(S(200));
  return cp(e, t, null, n);
};
Se.createRoot = function(e, t) {
  if (!ts(e))
    throw Error(S(299));
  var n = !1, r = "", l = Ic;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Jo(e, 1, !1, null, null, n, !1, r, l), e[Ye] = t.current, Wn(e.nodeType === 8 ? e.parentNode : e), new es(t);
};
Se.findDOMNode = function(e) {
  if (e == null)
    return null;
  if (e.nodeType === 1)
    return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(S(188)) : (e = Object.keys(e).join(","), Error(S(268, e)));
  return e = ra(t), e = e === null ? null : e.stateNode, e;
};
Se.flushSync = function(e) {
  return Mt(e);
};
Se.hydrate = function(e, t, n) {
  if (!Tl(t))
    throw Error(S(200));
  return zl(null, e, t, !0, n);
};
Se.hydrateRoot = function(e, t, n) {
  if (!ts(e))
    throw Error(S(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = Ic;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = Mc(t, null, e, 1, n ?? null, l, !1, i, o), e[Ye] = t.current, Wn(e), r)
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
  return e._reactRootContainer ? (Mt(function() {
    zl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ye] = null;
    });
  }), !0) : !1;
};
Se.unstable_batchedUpdates = Yo;
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
Oc(), Mu.exports = Se;
var hp = Mu.exports, fu = hp;
di.createRoot = fu.createRoot, di.hydrateRoot = fu.hydrateRoot;
const du = ["Tutti", "P", "D", "C", "A"], io = {
  P: "Portiere",
  D: "Difensore",
  C: "Centrocampista",
  A: "Attaccante",
  U: "Altro"
}, pu = {
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
function vp({ size: e = 24, ...t }) {
  return /* @__PURE__ */ u.jsxs("svg", { ...Je(e), ...t, children: [
    /* @__PURE__ */ u.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ u.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ u.jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
    /* @__PURE__ */ u.jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
  ] });
}
function mu({ size: e = 20, ...t }) {
  return /* @__PURE__ */ u.jsxs("svg", { ...Je(e), ...t, children: [
    /* @__PURE__ */ u.jsx("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ u.jsx("path", { d: "m21 21-4.3-4.3" })
  ] });
}
function gp({ size: e = 20, ...t }) {
  return /* @__PURE__ */ u.jsxs("svg", { ...Je(e), ...t, children: [
    /* @__PURE__ */ u.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ u.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ u.jsx("path", { d: "m17 8 5 5" }),
    /* @__PURE__ */ u.jsx("path", { d: "m22 8-5 5" })
  ] });
}
function $c({ size: e = 20, ...t }) {
  return /* @__PURE__ */ u.jsxs("svg", { ...Je(e), ...t, children: [
    /* @__PURE__ */ u.jsx("path", { d: "M18 6 6 18" }),
    /* @__PURE__ */ u.jsx("path", { d: "m6 6 12 12" })
  ] });
}
function He({ size: e = 18, ...t }) {
  return /* @__PURE__ */ u.jsx("svg", { ...Je(e), ...t, children: /* @__PURE__ */ u.jsx("path", { d: "m6 9 6 6 6-6" }) });
}
function yp({ size: e = 16, ...t }) {
  return /* @__PURE__ */ u.jsx("svg", { ...Je(e), ...t, children: /* @__PURE__ */ u.jsx("path", { d: "m18 15-6-6-6 6" }) });
}
function pl({ size: e = 24, ...t }) {
  return /* @__PURE__ */ u.jsx("svg", { ...Je(e), ...t, children: /* @__PURE__ */ u.jsx("path", { d: "M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" }) });
}
function wp({ size: e = 18, ...t }) {
  return /* @__PURE__ */ u.jsxs("svg", { ...Je(e), ...t, children: [
    /* @__PURE__ */ u.jsx("circle", { cx: "8", cy: "8", r: "6" }),
    /* @__PURE__ */ u.jsx("path", { d: "M18.1 8.4A6 6 0 1 1 8.4 18.1" }),
    /* @__PURE__ */ u.jsx("path", { d: "M6 8h4M8 6v4" })
  ] });
}
function xp({ size: e = 18, ...t }) {
  return /* @__PURE__ */ u.jsxs("svg", { ...Je(e), ...t, children: [
    /* @__PURE__ */ u.jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ u.jsx("path", { d: "M12 8v4" }),
    /* @__PURE__ */ u.jsx("path", { d: "M12 16h.01" })
  ] });
}
function Sp(e) {
  return e.split(/\s+-\s+/).map((t) => t.trim()).filter(Boolean);
}
function hu({ asset: e, expanded: t, onToggle: n }) {
  const r = Sp(e.displayName);
  return /* @__PURE__ */ u.jsxs("div", { children: [
    /* @__PURE__ */ u.jsxs("button", { type: "button", onClick: n, className: "tw-hidden tw-w-full tw-grid-cols-12 tw-gap-4 tw-px-6 tw-py-4 tw-text-left tw-transition hover:tw-bg-slate-50 md:tw-grid", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "tw-col-span-4 tw-flex tw-min-w-0 tw-items-center tw-gap-3", children: [
        /* @__PURE__ */ u.jsx("div", { className: "lf-player-avatar", children: /* @__PURE__ */ u.jsx(pl, { size: 22 }) }),
        /* @__PURE__ */ u.jsxs("div", { className: "tw-min-w-0", children: [
          /* @__PURE__ */ u.jsxs("div", { className: "tw-truncate tw-font-semibold tw-text-slate-900", children: [
            "Blocco ",
            e.realTeam || e.displayName
          ] }),
          /* @__PURE__ */ u.jsxs("div", { className: "tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-slate-500", children: [
            r.length,
            " portieri",
            /* @__PURE__ */ u.jsx(He, { size: 15, className: `tw-transition ${t ? "tw-rotate-180" : ""}` })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center", children: /* @__PURE__ */ u.jsx("span", { className: "lf-role-badge lf-role-badge--p", children: "Portiere" }) }),
      /* @__PURE__ */ u.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center tw-text-xl tw-font-black tw-text-slate-900", children: e.quotation || "—" }),
      /* @__PURE__ */ u.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center tw-text-lg tw-font-bold tw-text-[var(--primary)]", children: e.purchasePrice || "—" }),
      /* @__PURE__ */ u.jsx("div", { className: `tw-col-span-2 tw-flex tw-items-center tw-truncate tw-text-sm ${e.ownerTag ? "tw-text-slate-600" : "tw-italic tw-text-slate-400"}`, children: e.ownerTag || "Svincolato" })
    ] }),
    /* @__PURE__ */ u.jsxs("button", { type: "button", onClick: n, className: "tw-flex tw-w-full tw-items-start tw-gap-3 tw-p-3 tw-text-left tw-transition hover:tw-bg-slate-50 md:tw-hidden", children: [
      /* @__PURE__ */ u.jsx("div", { className: "lf-player-avatar lf-player-avatar--mobile", children: /* @__PURE__ */ u.jsx(pl, { size: 22 }) }),
      /* @__PURE__ */ u.jsxs("div", { className: "tw-min-w-0 tw-flex-1", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
          /* @__PURE__ */ u.jsx("span", { className: "lf-role-badge lf-role-badge--p", children: "P" }),
          /* @__PURE__ */ u.jsxs("strong", { className: "tw-truncate tw-text-slate-900", children: [
            "Blocco ",
            e.realTeam || e.displayName
          ] })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "tw-mt-1 tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-slate-500", children: [
          r.length,
          " portieri ",
          /* @__PURE__ */ u.jsx(He, { size: 14, className: `tw-transition ${t ? "tw-rotate-180" : ""}` })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-x-3 tw-gap-y-1 tw-text-xs", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            /* @__PURE__ */ u.jsx("span", { className: "tw-text-slate-400", children: "Quot:" }),
            " ",
            /* @__PURE__ */ u.jsx("strong", { children: e.quotation || "—" })
          ] }),
          /* @__PURE__ */ u.jsxs("span", { children: [
            /* @__PURE__ */ u.jsx("span", { className: "tw-text-slate-400", children: "Acq:" }),
            " ",
            /* @__PURE__ */ u.jsx("strong", { className: "tw-text-[var(--primary)]", children: e.purchasePrice || "—" })
          ] }),
          /* @__PURE__ */ u.jsxs("span", { className: "tw-truncate tw-text-slate-500", children: [
            "👤 ",
            e.ownerTag || "Svincolato"
          ] })
        ] })
      ] })
    ] }),
    t && /* @__PURE__ */ u.jsx("div", { className: "lf-block-expanded", children: r.map((l) => /* @__PURE__ */ u.jsxs("div", { className: "tw-flex tw-items-center tw-gap-3 tw-px-6 tw-py-3", children: [
      /* @__PURE__ */ u.jsx("div", { className: "lf-mini-avatar", children: "P" }),
      /* @__PURE__ */ u.jsxs("div", { className: "tw-min-w-0", children: [
        /* @__PURE__ */ u.jsx("div", { className: "tw-truncate tw-font-medium tw-text-slate-800", children: l }),
        /* @__PURE__ */ u.jsx("div", { className: "tw-text-xs tw-text-slate-500", children: e.realTeam || "Portiere" })
      ] })
    ] }, l)) })
  ] });
}
function kp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function jp({ player: e }) {
  return /* @__PURE__ */ u.jsxs("div", { className: "tw-group tw-grid tw-grid-cols-12 tw-gap-4 tw-px-6 tw-py-4 tw-transition hover:tw-bg-slate-50", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "tw-col-span-4 tw-flex tw-min-w-0 tw-items-center tw-gap-3", children: [
      /* @__PURE__ */ u.jsx("div", { className: "lf-player-avatar", "aria-hidden": "true", children: kp(e.displayName) }),
      /* @__PURE__ */ u.jsxs("div", { className: "tw-min-w-0", children: [
        /* @__PURE__ */ u.jsxs("div", { className: `tw-truncate tw-font-semibold tw-transition group-hover:tw-text-[var(--primary)] ${e.active ? "tw-text-slate-900" : "tw-italic tw-text-slate-400"}`, children: [
          e.displayName,
          !e.active && " *"
        ] }),
        /* @__PURE__ */ u.jsx("div", { className: "tw-truncate tw-text-sm tw-text-slate-500", children: e.realTeam || "—" })
      ] })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center", children: /* @__PURE__ */ u.jsx("span", { className: dl[e.role] ?? dl.U, children: io[e.role] ?? "?" }) }),
    /* @__PURE__ */ u.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ u.jsx("span", { className: "tw-text-xl tw-font-black tw-text-slate-900", children: e.quotation || "—" }) }),
    /* @__PURE__ */ u.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ u.jsx("span", { className: e.purchasePrice ? "tw-text-lg tw-font-bold tw-text-[var(--primary)]" : "tw-text-slate-400", children: e.purchasePrice || "—" }) }),
    /* @__PURE__ */ u.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-min-w-0", children: /* @__PURE__ */ u.jsx("span", { className: `tw-truncate tw-text-sm ${e.ownerTag ? "tw-text-slate-600" : "tw-italic tw-text-slate-400"}`, children: e.ownerTag || "Svincolato" }) })
  ] });
}
function Np({
  teams: e,
  owners: t,
  currentRole: n,
  currentTeam: r,
  currentOwner: l,
  hasActiveFilters: i,
  onRoleChange: o,
  onTeamChange: s,
  onOwnerChange: a,
  onResetFilters: c
}) {
  return /* @__PURE__ */ u.jsxs("div", { className: "tw-mb-5 sm:tw-mb-6", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "tw-hidden tw-items-center tw-justify-between tw-gap-4 md:tw-flex", children: [
      /* @__PURE__ */ u.jsx("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: du.map((m) => /* @__PURE__ */ u.jsx(
        "button",
        {
          type: "button",
          onClick: () => o(m),
          className: `lf-role-pill ${n === m ? "lf-role-pill--active" : ""}`,
          children: m === "Tutti" ? "Tutti" : io[m]
        },
        m
      )) }),
      /* @__PURE__ */ u.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ u.jsxs("label", { className: "lf-select-wrap", children: [
          /* @__PURE__ */ u.jsx("span", { "aria-hidden": "true", children: "🏟️" }),
          /* @__PURE__ */ u.jsxs("select", { value: r, onChange: (m) => s(m.target.value), "aria-label": "Filtra per squadra reale", children: [
            /* @__PURE__ */ u.jsx("option", { value: "Tutti", children: "Squadra" }),
            e.map((m) => /* @__PURE__ */ u.jsx("option", { value: m, children: m }, m))
          ] }),
          /* @__PURE__ */ u.jsx(He, { size: 14 })
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: "lf-select-wrap", children: [
          /* @__PURE__ */ u.jsx("span", { "aria-hidden": "true", children: "👤" }),
          /* @__PURE__ */ u.jsxs("select", { value: l, onChange: (m) => a(m.target.value), "aria-label": "Filtra per proprietario", children: [
            /* @__PURE__ */ u.jsx("option", { value: "Tutti", children: "Proprietario" }),
            t.map((m) => /* @__PURE__ */ u.jsx("option", { value: m, children: m }, m))
          ] }),
          /* @__PURE__ */ u.jsx(He, { size: 14 })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "lf-mobile-filters md:tw-hidden", children: [
      /* @__PURE__ */ u.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ u.jsx("span", { className: "lf-mobile-filter__label", children: "Ruolo" }),
        /* @__PURE__ */ u.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ u.jsx("select", { value: n, onChange: (m) => o(m.target.value), "aria-label": "Filtra per ruolo", children: du.map((m) => /* @__PURE__ */ u.jsx("option", { value: m, children: m === "Tutti" ? "Tutti" : io[m] }, m)) }),
          /* @__PURE__ */ u.jsx(He, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ u.jsx("span", { className: "lf-mobile-filter__label", children: "Squadra" }),
        /* @__PURE__ */ u.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ u.jsxs("select", { value: r, onChange: (m) => s(m.target.value), "aria-label": "Filtra per squadra reale", children: [
            /* @__PURE__ */ u.jsx("option", { value: "Tutti", children: "Tutte" }),
            e.map((m) => /* @__PURE__ */ u.jsx("option", { value: m, children: m }, m))
          ] }),
          /* @__PURE__ */ u.jsx(He, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ u.jsx("span", { className: "lf-mobile-filter__label", children: "Proprietario" }),
        /* @__PURE__ */ u.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ u.jsxs("select", { value: l, onChange: (m) => a(m.target.value), "aria-label": "Filtra per proprietario", children: [
            /* @__PURE__ */ u.jsx("option", { value: "Tutti", children: "Tutti" }),
            t.map((m) => /* @__PURE__ */ u.jsx("option", { value: m, children: m }, m))
          ] }),
          /* @__PURE__ */ u.jsx(He, { size: 14 })
        ] })
      ] })
    ] }),
    i && /* @__PURE__ */ u.jsxs("button", { type: "button", onClick: c, className: "lf-mobile-reset md:tw-hidden", children: [
      /* @__PURE__ */ u.jsx($c, { size: 15 }),
      " Azzera filtri"
    ] })
  ] });
}
function si({ active: e, direction: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ u.jsx(yp, { size: 14 }) : /* @__PURE__ */ u.jsx(He, { size: 14 }) : null;
}
function Cp({ sortKey: e, sortDirection: t, onSort: n }) {
  return /* @__PURE__ */ u.jsxs("div", { className: "tw-hidden tw-grid-cols-12 tw-gap-4 tw-border-b tw-border-slate-200 tw-bg-slate-50 tw-px-6 tw-py-4 tw-text-xs tw-font-bold tw-uppercase tw-tracking-wider tw-text-slate-500 md:tw-grid", children: [
    /* @__PURE__ */ u.jsx("div", { className: "tw-col-span-4", children: "Giocatore" }),
    /* @__PURE__ */ u.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2", onClick: () => n("position"), children: [
      "Ruolo ",
      /* @__PURE__ */ u.jsx(si, { active: e === "position", direction: t })
    ] }),
    /* @__PURE__ */ u.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2 tw-justify-center", onClick: () => n("quotation"), children: [
      "Quot. ",
      /* @__PURE__ */ u.jsx(si, { active: e === "quotation", direction: t })
    ] }),
    /* @__PURE__ */ u.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2 tw-justify-center", onClick: () => n("purchasePrice"), children: [
      "Prezzo ",
      /* @__PURE__ */ u.jsx(si, { active: e === "purchasePrice", direction: t })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "tw-col-span-2", children: "Proprietario" })
  ] });
}
function Ep(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function _p({ player: e }) {
  return /* @__PURE__ */ u.jsx("article", { className: "tw-p-3 tw-transition hover:tw-bg-slate-50", children: /* @__PURE__ */ u.jsxs("div", { className: "tw-flex tw-items-start tw-gap-3", children: [
    /* @__PURE__ */ u.jsx("div", { className: "lf-player-avatar lf-player-avatar--mobile", "aria-hidden": "true", children: Ep(e.displayName) }),
    /* @__PURE__ */ u.jsxs("div", { className: "tw-min-w-0 tw-flex-1", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "tw-mb-1 tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ u.jsx("span", { className: dl[e.role] ?? dl.U, children: e.role || "?" }),
        /* @__PURE__ */ u.jsxs("span", { className: `tw-truncate tw-font-semibold ${e.active ? "tw-text-slate-900" : "tw-italic tw-text-slate-400"}`, children: [
          e.displayName,
          !e.active && " *"
        ] })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: "tw-mb-2 tw-truncate tw-text-xs tw-text-slate-500", children: e.realTeam || "—" }),
      /* @__PURE__ */ u.jsxs("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-x-3 tw-gap-y-1 tw-text-xs", children: [
        /* @__PURE__ */ u.jsxs("span", { children: [
          /* @__PURE__ */ u.jsx("span", { className: "tw-text-slate-400", children: "Quot:" }),
          " ",
          /* @__PURE__ */ u.jsx("strong", { className: "tw-text-slate-900", children: e.quotation || "—" })
        ] }),
        /* @__PURE__ */ u.jsxs("span", { children: [
          /* @__PURE__ */ u.jsx("span", { className: "tw-text-slate-400", children: "Acq:" }),
          " ",
          /* @__PURE__ */ u.jsx("strong", { className: "tw-text-[var(--primary)]", children: e.purchasePrice || "—" })
        ] }),
        /* @__PURE__ */ u.jsxs("span", { className: `tw-max-w-full tw-truncate ${e.ownerTag ? "tw-text-slate-500" : "tw-italic tw-text-slate-400"}`, children: [
          "👤 ",
          e.ownerTag || "Svincolato"
        ] })
      ] })
    ] })
  ] }) });
}
function vu(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ø/g, "O").replace(/ø/g, "o").toLowerCase();
}
function gu(e) {
  return e.type === "goalkeeper_block" || e.role === "P" && /\s+-\s+/.test(e.displayName);
}
function Pp({ assets: e }) {
  const [t, n] = D.useState(""), [r, l] = D.useState("Tutti"), [i, o] = D.useState("Tutti"), [s, a] = D.useState("Tutti"), [c, m] = D.useState(!1), [h, v] = D.useState("position"), [x, g] = D.useState("asc"), [w, z] = D.useState(/* @__PURE__ */ new Set()), d = D.useMemo(() => [...new Set(e.map((C) => C.realTeam).filter(Boolean))].sort((C, T) => C.localeCompare(T, "it")), [e]), f = D.useMemo(() => [...new Set(e.map((C) => C.ownerTag).filter(Boolean))].sort((C, T) => C.localeCompare(T, "it")), [e]), p = D.useMemo(() => {
    const C = vu(t.trim());
    return e.filter((T) => !(C && !vu(`${T.displayName} ${T.realTeam} ${T.ownerTag}`).includes(C) || c && !T.isFreeAgent || r !== "Tutti" && T.role !== r || i !== "Tutti" && T.realTeam !== i || s !== "Tutti" && T.ownerTag !== s));
  }, [e, s, r, t, c, i]), y = D.useMemo(() => [...p].sort((C, T) => {
    if (h === "position") {
      const be = (pu[C.role] ?? 9) - (pu[T.role] ?? 9), et = x === "asc" ? be : -be;
      if (et !== 0)
        return et;
      const hn = C.realTeam.localeCompare(T.realTeam, "it");
      if (hn !== 0)
        return hn;
      const ir = T.quotation - C.quotation;
      return ir !== 0 ? ir : C.displayName.localeCompare(T.displayName, "it");
    }
    const G = (C[h] || 0) - (T[h] || 0);
    return x === "asc" ? G : -G;
  }), [p, x, h]), k = !!(t || r !== "Tutti" || i !== "Tutti" || s !== "Tutti" || c), j = () => {
    n(""), l("Tutti"), o("Tutti"), a("Tutti"), m(!1), v("position"), g("asc");
  }, E = (C) => {
    if (h === C) {
      x === "desc" || v("position"), g("asc");
      return;
    }
    v(C), g("desc");
  }, P = (C) => {
    z((T) => {
      const G = new Set(T);
      return G.has(C) ? G.delete(C) : G.add(C), G;
    });
  };
  return /* @__PURE__ */ u.jsx("div", { className: "tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7", children: /* @__PURE__ */ u.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-7xl", children: [
    /* @__PURE__ */ u.jsx("div", { className: "tw-flex tw-justify-end tw-p-4 sm:tw-p-6 lg:tw-p-8", children: /* @__PURE__ */ u.jsxs("div", { className: "tw-flex tw-w-full tw-flex-wrap tw-items-stretch tw-gap-2 lg:tw-ml-auto lg:tw-w-auto lg:tw-justify-end", children: [
      /* @__PURE__ */ u.jsxs("label", { className: "lf-search tw-min-w-0 tw-flex-1 lg:tw-w-80 lg:tw-flex-none", children: [
        /* @__PURE__ */ u.jsx(mu, { size: 20 }),
        /* @__PURE__ */ u.jsx("input", { type: "search", placeholder: "Cerca giocatore...", value: t, onChange: (C) => n(C.target.value) })
      ] }),
      /* @__PURE__ */ u.jsxs("button", { type: "button", onClick: () => m((C) => !C), className: `lf-action-button ${c ? "lf-action-button--active" : ""}`, title: "Mostra solo giocatori svincolati", children: [
        /* @__PURE__ */ u.jsx(gp, { size: 20 }),
        /* @__PURE__ */ u.jsx("span", { className: "tw-hidden sm:tw-inline", children: "Svincolati" })
      ] }),
      k && /* @__PURE__ */ u.jsx("button", { type: "button", onClick: j, className: "lf-reset-button tw-hidden md:tw-flex", title: "Azzera filtri", children: /* @__PURE__ */ u.jsx($c, { size: 20 }) })
    ] }) }),
    /* @__PURE__ */ u.jsxs("div", { className: "tw-px-3 sm:tw-px-6 lg:tw-px-8", children: [
      /* @__PURE__ */ u.jsx(
        Np,
        {
          teams: d,
          owners: f,
          currentRole: r,
          currentTeam: i,
          currentOwner: s,
          hasActiveFilters: k,
          onRoleChange: l,
          onTeamChange: o,
          onOwnerChange: a,
          onResetFilters: j
        }
      ),
      /* @__PURE__ */ u.jsxs("div", { className: "tw-mb-3 tw-flex tw-items-center tw-justify-between tw-text-xs tw-font-semibold tw-text-slate-500", children: [
        /* @__PURE__ */ u.jsxs("span", { children: [
          y.length,
          " risultati"
        ] }),
        y.length !== e.length && /* @__PURE__ */ u.jsxs("span", { children: [
          "su ",
          e.length
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "lf-list-table", children: [
        /* @__PURE__ */ u.jsx(Cp, { sortKey: h, sortDirection: x, onSort: E }),
        /* @__PURE__ */ u.jsx("div", { className: "tw-hidden tw-divide-y tw-divide-slate-100 md:tw-block", children: y.map((C) => gu(C) ? /* @__PURE__ */ u.jsx(hu, { asset: C, expanded: w.has(C.assetCode), onToggle: () => P(C.assetCode) }, C.assetCode) : /* @__PURE__ */ u.jsx(jp, { player: C }, C.assetCode)) }),
        /* @__PURE__ */ u.jsx("div", { className: "tw-divide-y tw-divide-slate-100 md:tw-hidden", children: y.map((C) => gu(C) ? /* @__PURE__ */ u.jsx(hu, { asset: C, expanded: w.has(C.assetCode), onToggle: () => P(C.assetCode) }, C.assetCode) : /* @__PURE__ */ u.jsx(_p, { player: C }, C.assetCode)) }),
        y.length === 0 && /* @__PURE__ */ u.jsxs("div", { className: "tw-px-6 tw-py-14 tw-text-center", children: [
          /* @__PURE__ */ u.jsx(mu, { size: 34, className: "tw-mx-auto tw-mb-3 tw-text-slate-300" }),
          /* @__PURE__ */ u.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-slate-800", children: "Nessun giocatore trovato" }),
          /* @__PURE__ */ u.jsx("p", { className: "tw-mb-0 tw-mt-1 tw-text-sm tw-text-slate-500", children: "Prova a modificare i filtri di ricerca." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "tw-h-4 sm:tw-h-6" })
  ] }) });
}
function Tp(e) {
  return e.map((t) => ({
    ...t,
    purchasePrice: t.purchasePrice ?? 0,
    managerCredits: t.managerCredits ?? null
  }));
}
function ui() {
  var e, t, n, r;
  return {
    state: ((t = (e = window.LineupLeagueData) == null ? void 0 : e.getState) == null ? void 0 : t.call(e)) ?? { status: "idle" },
    assets: Tp(((r = (n = window.LineupLeagueData) == null ? void 0 : n.getAssets) == null ? void 0 : r.call(n)) ?? [])
  };
}
function Ac() {
  var o;
  const e = D.useMemo(ui, []), [t, n] = D.useState(e.state), [r, l] = D.useState(e.assets), i = (o = window.LINEUP_FANTA) == null ? void 0 : o.league;
  return D.useEffect(() => {
    let s = !1, a = 0;
    const c = () => {
      if (s)
        return;
      const h = ui();
      n(h.state), l(h.assets), a += 1, h.state.status !== "ready" && a < 20 && window.setTimeout(c, 150);
    }, m = (h) => {
      if (h.detail.leagueId !== (i == null ? void 0 : i.id))
        return;
      const v = ui();
      n(v.state), l(v.assets);
    };
    return document.addEventListener("lineup:league-assets-ready", m), c(), () => {
      s = !0, document.removeEventListener("lineup:league-assets-ready", m);
    };
  }, [i == null ? void 0 : i.id]), { state: t, assets: r, league: i };
}
function zp() {
  const { state: e, assets: t } = Ac();
  return e.status === "error" ? /* @__PURE__ */ u.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ u.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ u.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-red-600", children: "Errore nel caricamento del Listone" }),
    /* @__PURE__ */ u.jsx("p", { className: "tw-mb-0 tw-mt-2 tw-text-sm tw-text-slate-500", children: "Controlla il CSV della lega e ricarica la pagina." })
  ] }) }) : e.status !== "ready" ? /* @__PURE__ */ u.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ u.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ u.jsx("div", { className: "lf-spinner tw-mx-auto tw-mb-3" }),
    /* @__PURE__ */ u.jsx("p", { className: "tw-m-0 tw-text-sm tw-font-semibold tw-text-slate-500", children: "Caricamento del Listone…" })
  ] }) }) : /* @__PURE__ */ u.jsx(Pp, { assets: t });
}
const Lp = "lineup:debug";
function yu() {
  try {
    return new URLSearchParams(window.location.search).get("debug") === "1";
  } catch {
    return !1;
  }
}
function Rp() {
  try {
    return yu() || window.localStorage.getItem(Lp) === "1";
  } catch {
    return yu();
  }
}
function Er(e, t, n, r) {
  if (e === "debug" && !Rp())
    return;
  const l = `[Lineup:${t}]`;
  r === void 0 ? console[e](l, n) : console[e](l, n, r);
}
function Ll(e) {
  return {
    debug: (t, n) => Er("debug", e, t, n),
    info: (t, n) => Er("info", e, t, n),
    warn: (t, n) => Er("warn", e, t, n),
    error: (t, n) => Er("error", e, t, n)
  };
}
function Dp(e) {
  return e.split(/\s+-\s+/).map((t) => t.trim()).filter(Boolean);
}
function Fp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function _r({ players: e, role: t, label: n }) {
  const [r, l] = D.useState(/* @__PURE__ */ new Set()), i = e.filter((s) => s.role === t).sort((s, a) => {
    const c = a.purchasePrice - s.purchasePrice;
    return c !== 0 ? c : s.displayName.localeCompare(a.displayName, "it");
  }), o = (s) => {
    l((a) => {
      const c = new Set(a);
      return c.has(s) ? c.delete(s) : c.add(s), c;
    });
  };
  return /* @__PURE__ */ u.jsxs("section", { className: "lf-squad-section", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "lf-squad-section__title", children: [
      n,
      t === "P" ? " (Blocchi)" : ""
    ] }),
    i.length === 0 ? /* @__PURE__ */ u.jsx("div", { className: "lf-squad-empty", children: "—" }) : /* @__PURE__ */ u.jsx("div", { className: "lf-squad-list", children: i.map((s) => {
      const a = t === "P" && (s.type === "goalkeeper_block" || /\s+-\s+/.test(s.displayName)), c = r.has(s.assetCode), m = a ? Dp(s.displayName) : [], h = /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs("div", { className: "lf-squad-item__left", children: [
          /* @__PURE__ */ u.jsx("div", { className: `lf-squad-avatar lf-squad-avatar--${t.toLowerCase()}`, "aria-hidden": "true", children: a ? /* @__PURE__ */ u.jsx(pl, { size: 17 }) : Fp(s.displayName) }),
          /* @__PURE__ */ u.jsxs("div", { className: "lf-squad-item__copy", children: [
            /* @__PURE__ */ u.jsxs("div", { className: "lf-squad-item__name", children: [
              a ? `Blocco ${s.realTeam || s.displayName}` : s.displayName,
              !s.active && " *",
              a && /* @__PURE__ */ u.jsx(He, { size: 14, className: c ? "lf-chevron-open" : "" })
            ] }),
            /* @__PURE__ */ u.jsx("div", { className: "lf-squad-item__team", children: a ? `${m.length} portieri` : s.realTeam || "—" })
          ] })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "lf-squad-values", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            /* @__PURE__ */ u.jsx("small", { children: "Q" }),
            /* @__PURE__ */ u.jsx("strong", { children: s.quotation || "—" })
          ] }),
          /* @__PURE__ */ u.jsxs("span", { children: [
            /* @__PURE__ */ u.jsx("small", { children: "P" }),
            /* @__PURE__ */ u.jsx("strong", { className: "lf-squad-price", children: s.purchasePrice || "—" })
          ] })
        ] })
      ] });
      return /* @__PURE__ */ u.jsxs("div", { className: "lf-squad-item-wrap", children: [
        a ? /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            className: "lf-squad-item lf-squad-item--clickable",
            onClick: () => o(s.assetCode),
            "aria-expanded": c,
            children: h
          }
        ) : /* @__PURE__ */ u.jsx("div", { className: "lf-squad-item", children: h }),
        a && c && /* @__PURE__ */ u.jsx("div", { className: "lf-squad-goalkeepers", children: m.map((v) => /* @__PURE__ */ u.jsxs("div", { className: "lf-squad-goalkeeper", children: [
          /* @__PURE__ */ u.jsx("div", { className: "lf-squad-goalkeeper__avatar", children: "P" }),
          /* @__PURE__ */ u.jsx("span", { children: v })
        ] }, v)) })
      ] }, s.assetCode);
    }) })
  ] });
}
const ai = { P: 2, D: 8, C: 8, A: 6 }, Mp = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 });
function Ip({ team: e }) {
  const [t, n] = D.useState("ALL"), [r, l] = D.useState(!1), i = (a) => {
    n((c) => c === a ? "ALL" : a);
  }, o = !!(e.logoUrl && !r), s = e.credits === null ? "—" : Mp.format(e.credits);
  return /* @__PURE__ */ u.jsxs("article", { className: "lf-team-card", children: [
    /* @__PURE__ */ u.jsxs("header", { className: "lf-team-card__header", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "lf-team-card__identity", children: [
        /* @__PURE__ */ u.jsx("div", { className: `lf-team-card__avatar ${o ? "has-logo" : ""}`, children: o ? /* @__PURE__ */ u.jsx(
          "img",
          {
            src: e.logoUrl,
            alt: `Logo di ${e.managerName}`,
            loading: "lazy",
            referrerPolicy: "no-referrer",
            onError: () => l(!0)
          }
        ) : e.managerName.charAt(0).toUpperCase() }),
        /* @__PURE__ */ u.jsxs("div", { className: "lf-team-card__copy", children: [
          /* @__PURE__ */ u.jsx("span", { className: "lf-team-card__eyebrow", children: "Allenatore" }),
          /* @__PURE__ */ u.jsx("h2", { title: e.managerName, children: e.managerName })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "lf-team-card__meta", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "lf-team-card__credits", children: [
          /* @__PURE__ */ u.jsx("span", { children: "Crediti" }),
          /* @__PURE__ */ u.jsxs("strong", { children: [
            /* @__PURE__ */ u.jsx(wp, { size: 16 }),
            " ",
            s
          ] })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: `lf-team-status ${e.isComplete ? "lf-team-status--complete" : "lf-team-status--incomplete"}`, children: [
          e.isComplete ? /* @__PURE__ */ u.jsx(pl, { size: 13 }) : /* @__PURE__ */ u.jsx(xp, { size: 13 }),
          e.isComplete ? "ROSA COMPLETA" : "INCOMPLETA"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "lf-team-role-filters", "aria-label": `Filtra la rosa di ${e.managerName} per ruolo`, children: Object.keys(ai).map((a) => {
      const c = e.roleCounts[a] === ai[a];
      return /* @__PURE__ */ u.jsxs(
        "button",
        {
          type: "button",
          onClick: () => i(a),
          className: `${t === a ? "is-active" : ""} ${c ? "is-complete" : ""}`,
          children: [
            a,
            ": ",
            e.roleCounts[a],
            "/",
            ai[a]
          ]
        },
        a
      );
    }) }),
    /* @__PURE__ */ u.jsx("div", { className: "lf-team-roster-frame", children: /* @__PURE__ */ u.jsxs("div", { className: "lf-team-roster", children: [
      (t === "ALL" || t === "P") && /* @__PURE__ */ u.jsx(_r, { players: e.players, role: "P", label: "Portieri" }),
      (t === "ALL" || t === "D") && /* @__PURE__ */ u.jsx(_r, { players: e.players, role: "D", label: "Difensori" }),
      (t === "ALL" || t === "C") && /* @__PURE__ */ u.jsx(_r, { players: e.players, role: "C", label: "Centrocampisti" }),
      (t === "ALL" || t === "A") && /* @__PURE__ */ u.jsx(_r, { players: e.players, role: "A", label: "Attaccanti" })
    ] }) })
  ] });
}
function ci(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Op(e) {
  if (typeof e == "number" && Number.isFinite(e))
    return e;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e.trim().replace(",", "."));
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function $p(e) {
  if (!ci(e))
    return {};
  const t = ci(e.teams) ? e.teams : e;
  return Object.entries(t).reduce((n, [r, l]) => {
    if (!ci(l))
      return n;
    const i = l, o = i.logoUrl ?? i.logo_url;
    return n[r] = {
      credits: Op(i.credits),
      logoUrl: typeof o == "string" ? o.trim() : ""
    }, n;
  }, {});
}
async function Ap(e, t) {
  if (!e)
    return {};
  const n = t || `/data/${encodeURIComponent(e)}/teams.json`, r = n.includes("?") ? "&" : "?", l = `${n}${r}_lf=${Date.now()}`, i = await fetch(l, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, max-age=0",
      Pragma: "no-cache"
    }
  });
  if (i.status === 404)
    return {};
  if (!i.ok)
    throw new Error(`Impossibile caricare i profili rose: HTTP ${i.status}`);
  return $p(await i.json());
}
class Up extends Error {
  constructor(n, r) {
    super(`HTTP ${n}: ${r}`);
    ur(this, "status");
    ur(this, "url");
    this.name = "HttpError", this.status = n, this.url = r;
  }
}
function Bp(e, t = "_lf") {
  const n = e.includes("?") ? "&" : "?";
  return `${e}${n}${encodeURIComponent(t)}=${Date.now()}`;
}
async function Vp(e, t) {
  const n = Bp(e), r = await fetch(n, {
    cache: "no-store",
    signal: t,
    headers: {
      "Cache-Control": "no-cache, no-store, max-age=0",
      Pragma: "no-cache"
    }
  });
  if (!r.ok)
    throw new Up(r.status, e);
  return r.text();
}
function Hp() {
  return document.documentElement.dataset.leagueSection ?? "formation";
}
function Uc(e, t = 3e4) {
  const [n, r] = D.useState(0);
  return D.useEffect(() => {
    const l = () => r((a) => a + 1), i = (a) => {
      const c = a.detail;
      (c == null ? void 0 : c.section) === e && l();
    }, o = () => {
      !document.hidden && Hp() === e && l();
    }, s = window.setInterval(o, t);
    return window.addEventListener("lineup:league-section-change", i), window.addEventListener("focus", o), document.addEventListener("visibilitychange", o), () => {
      window.clearInterval(s), window.removeEventListener("lineup:league-section-change", i), window.removeEventListener("focus", o), document.removeEventListener("visibilitychange", o);
    };
  }, [t, e]), n;
}
const wu = Vp, xu = { P: 2, D: 8, C: 8, A: 6 }, Qp = Ll("teams");
function Wp({ assets: e, leagueId: t, profilesUrl: n }) {
  const [r, l] = D.useState({}), i = Uc("rose");
  D.useEffect(() => {
    let s = !1;
    return Ap(t, n).then((a) => {
      s || l(a);
    }).catch((a) => {
      Qp.warn("profiles load failed", a), s || l({});
    }), () => {
      s = !0;
    };
  }, [t, n, i]);
  const o = D.useMemo(() => {
    const s = /* @__PURE__ */ new Map();
    return e.forEach((c) => {
      if (c.isFreeAgent || !c.ownerTag)
        return;
      const m = c.ownerTag.trim();
      if (!m)
        return;
      const h = s.get(m) ?? [];
      h.push(c), s.set(m, h);
    }), [...s.entries()].map(([c, m]) => {
      var w;
      const h = { P: 0, D: 0, C: 0, A: 0 };
      m.forEach((z) => {
        z.role in h && (h[z.role] += 1);
      });
      const v = Object.keys(xu).every((z) => h[z] === xu[z]), x = r[c], g = ((w = m.find((z) => z.managerCredits !== null)) == null ? void 0 : w.managerCredits) ?? null;
      return {
        managerName: c,
        credits: g ?? (x == null ? void 0 : x.credits) ?? null,
        logoUrl: (x == null ? void 0 : x.logoUrl) ?? "",
        players: m,
        isComplete: v,
        roleCounts: h,
        totalPlayers: m.length
      };
    }).sort((c, m) => {
      const h = c.managerName.includes("-"), v = m.managerName.includes("-");
      return h !== v ? h ? 1 : -1 : c.managerName.localeCompare(m.managerName, "it");
    });
  }, [e, r]);
  return /* @__PURE__ */ u.jsx("div", { className: "tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7", children: /* @__PURE__ */ u.jsx("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-7xl", children: o.length > 0 ? /* @__PURE__ */ u.jsx("div", { className: "lf-teams-grid", children: o.map((s) => /* @__PURE__ */ u.jsx(Ip, { team: s }, s.managerName)) }) : /* @__PURE__ */ u.jsxs("div", { className: "lf-teams-empty", children: [
    /* @__PURE__ */ u.jsx(vp, { size: 34 }),
    /* @__PURE__ */ u.jsx("h2", { children: "Nessuna rosa disponibile" }),
    /* @__PURE__ */ u.jsx("p", { children: "Nel CSV non risultano asset assegnati a un proprietario." })
  ] }) }) });
}
function Kp() {
  var r;
  const { state: e, assets: t, league: n } = Ac();
  return e.status === "error" ? /* @__PURE__ */ u.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ u.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ u.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-red-600", children: "Errore nel caricamento delle Rose" }),
    /* @__PURE__ */ u.jsx("p", { className: "tw-mb-0 tw-mt-2 tw-text-sm tw-text-slate-500", children: "Controlla il CSV della lega e ricarica la pagina." })
  ] }) }) : e.status !== "ready" ? /* @__PURE__ */ u.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ u.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ u.jsx("div", { className: "lf-spinner tw-mx-auto tw-mb-3" }),
    /* @__PURE__ */ u.jsx("p", { className: "tw-m-0 tw-text-sm tw-font-semibold tw-text-slate-500", children: "Caricamento delle Rose…" })
  ] }) }) : /* @__PURE__ */ u.jsx(Wp, { assets: t, leagueId: (n == null ? void 0 : n.id) ?? "", profilesUrl: (r = n == null ? void 0 : n.leagueData) == null ? void 0 : r.teamProfilesUrl });
}
function Gp(e) {
  const t = [];
  let n = [], r = "", l = !1;
  const i = String(e ?? "").replace(/^\uFEFF/, "");
  for (let o = 0; o < i.length; o += 1) {
    const s = i[o];
    if (s === '"') {
      l && i[o + 1] === '"' ? (r += '"', o += 1) : l = !l;
      continue;
    }
    if (s === "," && !l) {
      n.push(r.trim()), r = "";
      continue;
    }
    if ((s === `
` || s === "\r") && !l) {
      s === "\r" && i[o + 1] === `
` && (o += 1), n.push(r.trim()), n.some((a) => a.length > 0) && t.push(n), n = [], r = "";
      continue;
    }
    r += s;
  }
  return n.push(r.trim()), n.some((o) => o.length > 0) && t.push(n), t;
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
function jt(e) {
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
function Yp(e) {
  const t = Gp(e), n = [
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
    (g) => n.every((w) => fe(g, w) >= 0)
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
  }, o = [];
  for (const g of t.slice(r + 1)) {
    const w = String(g[i.name] ?? "").trim();
    if (g.map(rn).join("|").includes("classifica per fp"))
      break;
    if (!w)
      continue;
    const d = jt(g[i.points]), f = jt(g[i.wins]), p = jt(g[i.draws]), y = jt(g[i.losses]), k = jt(g[i.goalsFor]), j = jt(g[i.goalsAgainst]), E = jt(g[i.goalDifference]), P = Br(g[i.fantasyPoints]);
    d === null || f === null || p === null || y === null || k === null || j === null || P === null || o.push({
      team: w,
      points: d,
      wins: f,
      draws: p,
      losses: y,
      goalsFor: k,
      goalsAgainst: j,
      goalDifference: E ?? k - j,
      fantasyPoints: P,
      played: f + p + y
    });
  }
  const s = t.findIndex(
    (g) => g.some((w) => rn(w) === "classifica per fp")
  ), a = /* @__PURE__ */ new Map(), c = [];
  if (s >= 0) {
    const g = t.findIndex((w, z) => {
      if (z <= s)
        return !1;
      const d = w.map(rn);
      return d.filter((f) => f === "nome").length >= 2 && d.includes("fanta punti") && d.includes("penalita");
    });
    if (g >= 0) {
      const w = t[g], z = fe(w, "Nome"), d = fe(w, "Fanta Punti", z + 1), f = fe(w, "Nome", d + 1), p = fe(w, "Penalità", f + 1);
      for (const y of t.slice(g + 1)) {
        const k = String(y[z] ?? "").trim(), j = Br(y[d]);
        k && j !== null && c.push({ team: k, fantasyPoints: j });
        const E = String(y[f] ?? "").trim(), P = Br(y[p]);
        E && P !== null && P > 0 && a.set(Pr(E), P);
      }
    }
  }
  const m = o.map((g, w) => ({
    ...g,
    position: w + 1,
    penalty: a.get(Pr(g.team)) ?? 0
  })), h = new Map(
    m.map((g) => [Pr(g.team), g])
  ), x = (c.length > 0 ? c : m.map((g) => ({ team: g.team, fantasyPoints: g.fantasyPoints })).sort((g, w) => w.fantasyPoints - g.fantasyPoints)).map((g, w) => {
    var z;
    return {
      position: w + 1,
      team: g.team,
      fantasyPoints: g.fantasyPoints,
      leaguePosition: ((z = h.get(Pr(g.team))) == null ? void 0 : z.position) ?? null
    };
  });
  return { league: m, fantasy: x };
}
function oo(e) {
  return new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(e) ? 0 : 1
  }).format(e);
}
function Xp(e) {
  return e > 0 ? `+${e}` : String(e);
}
function Su({ team: e, penalty: t = 0 }) {
  const n = e.trim().charAt(0).toUpperCase() || "?";
  return /* @__PURE__ */ u.jsxs("div", { className: "lf-standings-team-cell", children: [
    /* @__PURE__ */ u.jsx("span", { className: "lf-standings-team-mark", "aria-hidden": "true", children: n }),
    /* @__PURE__ */ u.jsx("strong", { children: e }),
    t > 0 && /* @__PURE__ */ u.jsxs("span", { className: "lf-standings-penalty", title: `Penalizzazione di ${t} punti`, children: [
      "−",
      oo(t)
    ] })
  ] });
}
function qp(e, t) {
  return t ? [...e].sort((n, r) => (t.direction === "desc" ? r[t.key] - n[t.key] : n[t.key] - r[t.key]) || n.position - r.position) : e;
}
function ku({
  label: e,
  sortKey: t,
  sort: n,
  onSort: r
}) {
  const l = (n == null ? void 0 : n.key) === t, i = l ? n.direction === "desc" ? "descending" : "ascending" : "none", o = l ? n.direction === "desc" ? "decrescente" : "crescente" : "ordine classifica";
  return /* @__PURE__ */ u.jsx("th", { scope: "col", "aria-sort": i, className: l ? "is-sorted" : "", children: /* @__PURE__ */ u.jsxs(
    "button",
    {
      type: "button",
      className: "lf-standings-sort-button",
      onClick: () => r(t),
      title: `${e}: ${o}`,
      "aria-label": `Ordina ${e}. Stato attuale: ${o}.`,
      children: [
        /* @__PURE__ */ u.jsx("span", { children: e }),
        /* @__PURE__ */ u.jsx("span", { className: "lf-standings-sort-icon", "aria-hidden": "true", children: l ? n.direction === "desc" ? "↓" : "↑" : "↕" })
      ]
    }
  ) });
}
function Zp({ data: e, leagueName: t }) {
  const [n, r] = D.useState("league"), [l, i] = D.useState(null), o = D.useMemo(
    () => qp(e.league, l),
    [e.league, l]
  );
  function s(a) {
    i((c) => !c || c.key !== a ? { key: a, direction: "desc" } : c.direction === "desc" ? { key: a, direction: "asc" } : null);
  }
  return e.league.length === 0 ? /* @__PURE__ */ u.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ u.jsxs("section", { className: "lf-dashboard-card lf-standings-state", children: [
    /* @__PURE__ */ u.jsx("strong", { children: "Classifica non ancora disponibile" }),
    /* @__PURE__ */ u.jsxs("p", { children: [
      "La fonte di ",
      t,
      " non è stata ancora configurata."
    ] })
  ] }) }) : /* @__PURE__ */ u.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ u.jsxs("section", { className: "lf-dashboard-card lf-standings-card", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "lf-standings-toolbar", role: "tablist", "aria-label": "Tipo di classifica", children: [
      /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx(
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
    n === "league" ? /* @__PURE__ */ u.jsx("div", { className: "lf-standings-table-wrap", role: "region", "aria-label": "Classifica generale", tabIndex: 0, children: /* @__PURE__ */ u.jsxs("table", { className: "lf-standings-table", children: [
      /* @__PURE__ */ u.jsx("thead", { children: /* @__PURE__ */ u.jsxs("tr", { children: [
        /* @__PURE__ */ u.jsx("th", { className: "lf-standings-rank-col", scope: "col", children: "#" }),
        /* @__PURE__ */ u.jsx("th", { className: "lf-standings-team-col", scope: "col", children: "Squadra" }),
        /* @__PURE__ */ u.jsx("th", { className: "is-points", scope: "col", children: "Pt" }),
        /* @__PURE__ */ u.jsx("th", { scope: "col", children: "G" }),
        /* @__PURE__ */ u.jsx("th", { scope: "col", children: "V" }),
        /* @__PURE__ */ u.jsx("th", { scope: "col", children: "N" }),
        /* @__PURE__ */ u.jsx("th", { scope: "col", children: "P" }),
        /* @__PURE__ */ u.jsx(ku, { label: "GF", sortKey: "goalsFor", sort: l, onSort: s }),
        /* @__PURE__ */ u.jsx(ku, { label: "GS", sortKey: "goalsAgainst", sort: l, onSort: s }),
        /* @__PURE__ */ u.jsx("th", { scope: "col", children: "DR" }),
        /* @__PURE__ */ u.jsx("th", { scope: "col", children: "FP" })
      ] }) }),
      /* @__PURE__ */ u.jsx("tbody", { children: o.map((a, c) => {
        const m = l ? c + 1 : a.position;
        return /* @__PURE__ */ u.jsxs("tr", { className: m <= 3 ? `is-top-${m}` : "", children: [
          /* @__PURE__ */ u.jsx("td", { className: "lf-standings-rank-col", children: /* @__PURE__ */ u.jsx("b", { children: m }) }),
          /* @__PURE__ */ u.jsx("td", { className: "lf-standings-team-col", children: /* @__PURE__ */ u.jsx(Su, { team: a.team, penalty: a.penalty }) }),
          /* @__PURE__ */ u.jsx("td", { className: "is-points", children: /* @__PURE__ */ u.jsx("strong", { children: a.points }) }),
          /* @__PURE__ */ u.jsx("td", { children: a.played }),
          /* @__PURE__ */ u.jsx("td", { children: a.wins }),
          /* @__PURE__ */ u.jsx("td", { children: a.draws }),
          /* @__PURE__ */ u.jsx("td", { children: a.losses }),
          /* @__PURE__ */ u.jsx("td", { children: a.goalsFor }),
          /* @__PURE__ */ u.jsx("td", { children: a.goalsAgainst }),
          /* @__PURE__ */ u.jsx("td", { className: a.goalDifference > 0 ? "is-positive" : a.goalDifference < 0 ? "is-negative" : "", children: Xp(a.goalDifference) }),
          /* @__PURE__ */ u.jsx("td", { children: oo(a.fantasyPoints) })
        ] }, a.team);
      }) })
    ] }) }) : /* @__PURE__ */ u.jsx("div", { className: "lf-standings-fantasy-wrap", children: /* @__PURE__ */ u.jsxs("table", { className: "lf-standings-table lf-standings-table--fantasy", children: [
      /* @__PURE__ */ u.jsx("thead", { children: /* @__PURE__ */ u.jsxs("tr", { children: [
        /* @__PURE__ */ u.jsx("th", { scope: "col", children: "#" }),
        /* @__PURE__ */ u.jsx("th", { scope: "col", children: "Squadra" }),
        /* @__PURE__ */ u.jsx("th", { scope: "col", children: "Fanta punti" })
      ] }) }),
      /* @__PURE__ */ u.jsx("tbody", { children: e.fantasy.map((a) => /* @__PURE__ */ u.jsxs("tr", { className: a.position <= 3 ? `is-top-${a.position}` : "", children: [
        /* @__PURE__ */ u.jsx("td", { children: /* @__PURE__ */ u.jsx("b", { children: a.position }) }),
        /* @__PURE__ */ u.jsx("td", { children: /* @__PURE__ */ u.jsx(Su, { team: a.team }) }),
        /* @__PURE__ */ u.jsx("td", { className: "is-fantasy-points", children: /* @__PURE__ */ u.jsx("strong", { children: oo(a.fantasyPoints) }) })
      ] }, a.team)) })
    ] }) })
  ] }) });
}
const ju = { league: [], fantasy: [] }, fi = Ll("standings");
function Jp() {
  var x, g, w;
  const e = (x = window.LINEUP_FANTA) == null ? void 0 : x.league, t = ((g = e == null ? void 0 : e.leagueData) == null ? void 0 : g.standingsCsvUrl) ?? "", n = ((w = e == null ? void 0 : e.leagueData) == null ? void 0 : w.standingsFallbackUrl) ?? "", [r, l] = D.useState("loading"), [i, o] = D.useState(ju), [s, a] = D.useState(""), c = D.useRef(!1), m = D.useRef(""), h = Uc("classifica");
  D.useEffect(() => {
    const z = new AbortController();
    async function d() {
      if (!t) {
        o(ju), l("ready");
        return;
      }
      !c.current && l("loading"), a("");
      try {
        let p;
        try {
          p = await wu(t, z.signal);
        } catch (y) {
          if (!n || z.signal.aborted)
            throw y;
          fi.warn("primary source unavailable; using fallback", y), p = await wu(n, z.signal);
        }
        if (p !== m.current) {
          const y = Yp(p);
          if (y.league.length === 0 && c.current)
            throw new Error("Aggiornamento vuoto della Classifica");
          m.current = p, o(y);
        }
        c.current = !0, l("ready");
      } catch (p) {
        if (z.signal.aborted)
          return;
        if (fi.error("load failed", p), c.current) {
          fi.warn("refresh failed; keeping last valid standings");
          return;
        }
        a("La Classifica non è disponibile. Controlla la fonte configurata e riprova."), l("error");
      }
    }
    return d(), () => z.abort();
  }, [t, n, h]);
  const v = D.useMemo(() => (e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.name) ?? "Lega", [e]);
  return r === "loading" ? /* @__PURE__ */ u.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ u.jsxs("section", { className: "lf-dashboard-card lf-standings-state", children: [
    /* @__PURE__ */ u.jsx("div", { className: "lf-spinner" }),
    /* @__PURE__ */ u.jsx("p", { children: "Caricamento della Classifica…" })
  ] }) }) : r === "error" ? /* @__PURE__ */ u.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ u.jsxs("section", { className: "lf-dashboard-card lf-standings-state lf-standings-state--error", children: [
    /* @__PURE__ */ u.jsx("strong", { children: "Errore nel caricamento" }),
    /* @__PURE__ */ u.jsx("p", { children: s })
  ] }) }) : /* @__PURE__ */ u.jsx(Zp, { data: i, leagueName: v });
}
const bp = Ll("react-boundary");
class em extends Du.Component {
  constructor() {
    super(...arguments);
    ur(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    bp.error(`${this.props.name} crashed`, { error: n, componentStack: r.componentStack });
  }
  render() {
    return this.state.error ? /* @__PURE__ */ u.jsxs("section", { className: "lf-dashboard-card lf-runtime-error", role: "alert", children: [
      /* @__PURE__ */ u.jsx("strong", { children: "Questa sezione non è stata caricata." }),
      /* @__PURE__ */ u.jsxs("p", { children: [
        "Ricarica la pagina. Con ",
        /* @__PURE__ */ u.jsx("code", { children: "?debug=1" }),
        " trovi più dettagli nella console."
      ] }),
      /* @__PURE__ */ u.jsx("button", { type: "button", onClick: () => window.location.reload(), children: "Ricarica" })
    ] }) : this.props.children;
  }
}
const ml = Ll("bootstrap");
function ns(e, t, n) {
  const r = document.getElementById(e);
  if (!r) {
    ml.debug("root not present", { rootId: e, name: t });
    return;
  }
  di.createRoot(r).render(
    /* @__PURE__ */ u.jsx(Du.StrictMode, { children: /* @__PURE__ */ u.jsx(em, { name: t, children: n }) })
  ), ml.debug("mounted", { rootId: e, name: t });
}
window.addEventListener("error", (e) => {
  ml.error("unhandled window error", e.error ?? e.message);
});
window.addEventListener("unhandledrejection", (e) => {
  ml.error("unhandled promise rejection", e.reason);
});
ns("league-dashboard-root", "Listone", /* @__PURE__ */ u.jsx(zp, {}));
ns("league-rose-root", "Rose", /* @__PURE__ */ u.jsx(Kp, {}));
ns("league-standings-root", "Classifica", /* @__PURE__ */ u.jsx(Jp, {}));
