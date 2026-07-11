var Sd = Object.defineProperty;
var Nd = (e, t, n) => t in e ? Sd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var hr = (e, t, n) => (Nd(e, typeof t != "symbol" ? t + "" : t, n), n);
function jd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ba = { exports: {} }, Tl = {}, eu = { exports: {} }, D = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var or = Symbol.for("react.element"), kd = Symbol.for("react.portal"), Cd = Symbol.for("react.fragment"), Ed = Symbol.for("react.strict_mode"), _d = Symbol.for("react.profiler"), Td = Symbol.for("react.provider"), Pd = Symbol.for("react.context"), Ld = Symbol.for("react.forward_ref"), zd = Symbol.for("react.suspense"), Rd = Symbol.for("react.memo"), Md = Symbol.for("react.lazy"), xo = Symbol.iterator;
function Dd(e) {
  return e === null || typeof e != "object" ? null : (e = xo && e[xo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var tu = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, nu = Object.assign, ru = {};
function yn(e, t, n) {
  this.props = e, this.context = t, this.refs = ru, this.updater = n || tu;
}
yn.prototype.isReactComponent = {};
yn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
yn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function lu() {
}
lu.prototype = yn.prototype;
function Ns(e, t, n) {
  this.props = e, this.context = t, this.refs = ru, this.updater = n || tu;
}
var js = Ns.prototype = new lu();
js.constructor = Ns;
nu(js, yn.prototype);
js.isPureReactComponent = !0;
var So = Array.isArray, iu = Object.prototype.hasOwnProperty, ks = { current: null }, su = { key: !0, ref: !0, __self: !0, __source: !0 };
function ou(e, t, n) {
  var r, l = {}, i = null, s = null;
  if (t != null)
    for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (i = "" + t.key), t)
      iu.call(t, r) && !su.hasOwnProperty(r) && (l[r] = t[r]);
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
  return { $$typeof: or, type: e, key: i, ref: s, props: l, _owner: ks.current };
}
function Id(e, t) {
  return { $$typeof: or, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Cs(e) {
  return typeof e == "object" && e !== null && e.$$typeof === or;
}
function Fd(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var No = /\/+/g;
function Gl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Fd("" + e.key) : t.toString(36);
}
function Br(e, t, n, r, l) {
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
          case or:
          case kd:
            s = !0;
        }
    }
  if (s)
    return s = e, l = l(s), e = r === "" ? "." + Gl(s, 0) : r, So(l) ? (n = "", e != null && (n = e.replace(No, "$&/") + "/"), Br(l, t, n, "", function(c) {
      return c;
    })) : l != null && (Cs(l) && (l = Id(l, n + (!l.key || s && s.key === l.key ? "" : ("" + l.key).replace(No, "$&/") + "/") + e)), t.push(l)), 1;
  if (s = 0, r = r === "" ? "." : r + ":", So(e))
    for (var a = 0; a < e.length; a++) {
      i = e[a];
      var u = r + Gl(i, a);
      s += Br(i, t, n, u, l);
    }
  else if (u = Dd(e), typeof u == "function")
    for (e = u.call(e), a = 0; !(i = e.next()).done; )
      i = i.value, u = r + Gl(i, a++), s += Br(i, t, n, u, l);
  else if (i === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function vr(e, t, n) {
  if (e == null)
    return e;
  var r = [], l = 0;
  return Br(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function Od(e) {
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
var fe = { current: null }, Hr = { transition: null }, $d = { ReactCurrentDispatcher: fe, ReactCurrentBatchConfig: Hr, ReactCurrentOwner: ks };
D.Children = { map: vr, forEach: function(e, t, n) {
  vr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return vr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return vr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Cs(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
D.Component = yn;
D.Fragment = Cd;
D.Profiler = _d;
D.PureComponent = Ns;
D.StrictMode = Ed;
D.Suspense = zd;
D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $d;
D.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = nu({}, e.props), l = e.key, i = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, s = ks.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps)
      var a = e.type.defaultProps;
    for (u in t)
      iu.call(t, u) && !su.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
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
  return { $$typeof: or, type: e.type, key: l, ref: i, props: r, _owner: s };
};
D.createContext = function(e) {
  return e = { $$typeof: Pd, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Td, _context: e }, e.Consumer = e;
};
D.createElement = ou;
D.createFactory = function(e) {
  var t = ou.bind(null, e);
  return t.type = e, t;
};
D.createRef = function() {
  return { current: null };
};
D.forwardRef = function(e) {
  return { $$typeof: Ld, render: e };
};
D.isValidElement = Cs;
D.lazy = function(e) {
  return { $$typeof: Md, _payload: { _status: -1, _result: e }, _init: Od };
};
D.memo = function(e, t) {
  return { $$typeof: Rd, type: e, compare: t === void 0 ? null : t };
};
D.startTransition = function(e) {
  var t = Hr.transition;
  Hr.transition = {};
  try {
    e();
  } finally {
    Hr.transition = t;
  }
};
D.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
D.useCallback = function(e, t) {
  return fe.current.useCallback(e, t);
};
D.useContext = function(e) {
  return fe.current.useContext(e);
};
D.useDebugValue = function() {
};
D.useDeferredValue = function(e) {
  return fe.current.useDeferredValue(e);
};
D.useEffect = function(e, t) {
  return fe.current.useEffect(e, t);
};
D.useId = function() {
  return fe.current.useId();
};
D.useImperativeHandle = function(e, t, n) {
  return fe.current.useImperativeHandle(e, t, n);
};
D.useInsertionEffect = function(e, t) {
  return fe.current.useInsertionEffect(e, t);
};
D.useLayoutEffect = function(e, t) {
  return fe.current.useLayoutEffect(e, t);
};
D.useMemo = function(e, t) {
  return fe.current.useMemo(e, t);
};
D.useReducer = function(e, t, n) {
  return fe.current.useReducer(e, t, n);
};
D.useRef = function(e) {
  return fe.current.useRef(e);
};
D.useState = function(e) {
  return fe.current.useState(e);
};
D.useSyncExternalStore = function(e, t, n) {
  return fe.current.useSyncExternalStore(e, t, n);
};
D.useTransition = function() {
  return fe.current.useTransition();
};
D.version = "18.2.0";
eu.exports = D;
var L = eu.exports;
const au = /* @__PURE__ */ jd(L);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ad = L, Ud = Symbol.for("react.element"), Bd = Symbol.for("react.fragment"), Hd = Object.prototype.hasOwnProperty, Vd = Ad.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Wd = { key: !0, ref: !0, __self: !0, __source: !0 };
function uu(e, t, n) {
  var r, l = {}, i = null, s = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t)
    Hd.call(t, r) && !Wd.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t)
      l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Ud, type: e, key: i, ref: s, props: l, _owner: Vd.current };
}
Tl.Fragment = Bd;
Tl.jsx = uu;
Tl.jsxs = uu;
ba.exports = Tl;
var o = ba.exports, ki = {}, cu = { exports: {} }, Ce = {}, du = { exports: {} }, fu = {};
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
  function t(P, R) {
    var M = P.length;
    P.push(R);
    e:
      for (; 0 < M; ) {
        var K = M - 1 >>> 1, J = P[K];
        if (0 < l(J, R))
          P[K] = R, P[M] = J, M = K;
        else
          break e;
      }
  }
  function n(P) {
    return P.length === 0 ? null : P[0];
  }
  function r(P) {
    if (P.length === 0)
      return null;
    var R = P[0], M = P.pop();
    if (M !== R) {
      P[0] = M;
      e:
        for (var K = 0, J = P.length, pr = J >>> 1; K < pr; ) {
          var Ct = 2 * (K + 1) - 1, Ql = P[Ct], Et = Ct + 1, mr = P[Et];
          if (0 > l(Ql, M))
            Et < J && 0 > l(mr, Ql) ? (P[K] = mr, P[Et] = M, K = Et) : (P[K] = Ql, P[Ct] = M, K = Ct);
          else if (Et < J && 0 > l(mr, M))
            P[K] = mr, P[Et] = M, K = Et;
          else
            break e;
        }
    }
    return R;
  }
  function l(P, R) {
    var M = P.sortIndex - R.sortIndex;
    return M !== 0 ? M : P.id - R.id;
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
  var u = [], c = [], f = 1, h = null, v = 3, x = !1, g = !1, w = !1, j = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(P) {
    for (var R = n(c); R !== null; ) {
      if (R.callback === null)
        r(c);
      else if (R.startTime <= P)
        r(c), R.sortIndex = R.expirationTime, t(u, R);
      else
        break;
      R = n(c);
    }
  }
  function y(P) {
    if (w = !1, m(P), !g)
      if (n(u) !== null)
        g = !0, ue(N);
      else {
        var R = n(c);
        R !== null && fr(y, R.startTime - P);
      }
  }
  function N(P, R) {
    g = !1, w && (w = !1, p(_), _ = -1), x = !0;
    var M = v;
    try {
      for (m(R), h = n(u); h !== null && (!(h.expirationTime > R) || P && !O()); ) {
        var K = h.callback;
        if (typeof K == "function") {
          h.callback = null, v = h.priorityLevel;
          var J = K(h.expirationTime <= R);
          R = e.unstable_now(), typeof J == "function" ? h.callback = J : h === n(u) && r(u), m(R);
        } else
          r(u);
        h = n(u);
      }
      if (h !== null)
        var pr = !0;
      else {
        var Ct = n(c);
        Ct !== null && fr(y, Ct.startTime - R), pr = !1;
      }
      return pr;
    } finally {
      h = null, v = M, x = !1;
    }
  }
  var k = !1, E = null, _ = -1, C = 5, z = -1;
  function O() {
    return !(e.unstable_now() - z < C);
  }
  function Ue() {
    if (E !== null) {
      var P = e.unstable_now();
      z = P;
      var R = !0;
      try {
        R = E(!0, P);
      } finally {
        R ? Ge() : (k = !1, E = null);
      }
    } else
      k = !1;
  }
  var Ge;
  if (typeof d == "function")
    Ge = function() {
      d(Ue);
    };
  else if (typeof MessageChannel < "u") {
    var xe = new MessageChannel(), Vt = xe.port2;
    xe.port1.onmessage = Ue, Ge = function() {
      Vt.postMessage(null);
    };
  } else
    Ge = function() {
      j(Ue, 0);
    };
  function ue(P) {
    E = P, k || (k = !0, Ge());
  }
  function fr(P, R) {
    _ = j(function() {
      P(e.unstable_now());
    }, R);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(P) {
    P.callback = null;
  }, e.unstable_continueExecution = function() {
    g || x || (g = !0, ue(N));
  }, e.unstable_forceFrameRate = function(P) {
    0 > P || 125 < P ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : C = 0 < P ? Math.floor(1e3 / P) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return v;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(P) {
    switch (v) {
      case 1:
      case 2:
      case 3:
        var R = 3;
        break;
      default:
        R = v;
    }
    var M = v;
    v = R;
    try {
      return P();
    } finally {
      v = M;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(P, R) {
    switch (P) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        P = 3;
    }
    var M = v;
    v = P;
    try {
      return R();
    } finally {
      v = M;
    }
  }, e.unstable_scheduleCallback = function(P, R, M) {
    var K = e.unstable_now();
    switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? K + M : K) : M = K, P) {
      case 1:
        var J = -1;
        break;
      case 2:
        J = 250;
        break;
      case 5:
        J = 1073741823;
        break;
      case 4:
        J = 1e4;
        break;
      default:
        J = 5e3;
    }
    return J = M + J, P = { id: f++, callback: R, priorityLevel: P, startTime: M, expirationTime: J, sortIndex: -1 }, M > K ? (P.sortIndex = M, t(c, P), n(u) === null && P === n(c) && (w ? (p(_), _ = -1) : w = !0, fr(y, M - K))) : (P.sortIndex = J, t(u, P), g || x || (g = !0, ue(N))), P;
  }, e.unstable_shouldYield = O, e.unstable_wrapCallback = function(P) {
    var R = v;
    return function() {
      var M = v;
      v = R;
      try {
        return P.apply(this, arguments);
      } finally {
        v = M;
      }
    };
  };
})(fu);
du.exports = fu;
var Qd = du.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pu = L, ke = Qd;
function S(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var mu = /* @__PURE__ */ new Set(), Vn = {};
function Ut(e, t) {
  dn(e, t), dn(e + "Capture", t);
}
function dn(e, t) {
  for (Vn[e] = t, e = 0; e < t.length; e++)
    mu.add(t[e]);
}
var be = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ci = Object.prototype.hasOwnProperty, Gd = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, jo = {}, ko = {};
function Kd(e) {
  return Ci.call(ko, e) ? !0 : Ci.call(jo, e) ? !1 : Gd.test(e) ? ko[e] = !0 : (jo[e] = !0, !1);
}
function Yd(e, t, n, r) {
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
function Xd(e, t, n, r) {
  if (t === null || typeof t > "u" || Yd(e, t, n, r))
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
function pe(e, t, n, r, l, i, s) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = s;
}
var le = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  le[e] = new pe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  le[t] = new pe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  le[e] = new pe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  le[e] = new pe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  le[e] = new pe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  le[e] = new pe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  le[e] = new pe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  le[e] = new pe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  le[e] = new pe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Es = /[\-:]([a-z])/g;
function _s(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Es,
    _s
  );
  le[t] = new pe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Es, _s);
  le[t] = new pe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Es, _s);
  le[t] = new pe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  le[e] = new pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
le.xlinkHref = new pe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  le[e] = new pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ts(e, t, n, r) {
  var l = le.hasOwnProperty(t) ? le[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Xd(t, n, l, r) && (n = null), r || l === null ? Kd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var rt = pu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, gr = Symbol.for("react.element"), Qt = Symbol.for("react.portal"), Gt = Symbol.for("react.fragment"), Ps = Symbol.for("react.strict_mode"), Ei = Symbol.for("react.profiler"), hu = Symbol.for("react.provider"), vu = Symbol.for("react.context"), Ls = Symbol.for("react.forward_ref"), _i = Symbol.for("react.suspense"), Ti = Symbol.for("react.suspense_list"), zs = Symbol.for("react.memo"), st = Symbol.for("react.lazy"), gu = Symbol.for("react.offscreen"), Co = Symbol.iterator;
function Sn(e) {
  return e === null || typeof e != "object" ? null : (e = Co && e[Co] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Q = Object.assign, Kl;
function Pn(e) {
  if (Kl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Kl = t && t[1] || "";
    }
  return `
` + Kl + e;
}
var Yl = !1;
function Xl(e, t) {
  if (!e || Yl)
    return "";
  Yl = !0;
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
    Yl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Pn(e) : "";
}
function qd(e) {
  switch (e.tag) {
    case 5:
      return Pn(e.type);
    case 16:
      return Pn("Lazy");
    case 13:
      return Pn("Suspense");
    case 19:
      return Pn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Xl(e.type, !1), e;
    case 11:
      return e = Xl(e.type.render, !1), e;
    case 1:
      return e = Xl(e.type, !0), e;
    default:
      return "";
  }
}
function Pi(e) {
  if (e == null)
    return null;
  if (typeof e == "function")
    return e.displayName || e.name || null;
  if (typeof e == "string")
    return e;
  switch (e) {
    case Gt:
      return "Fragment";
    case Qt:
      return "Portal";
    case Ei:
      return "Profiler";
    case Ps:
      return "StrictMode";
    case _i:
      return "Suspense";
    case Ti:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case vu:
        return (e.displayName || "Context") + ".Consumer";
      case hu:
        return (e._context.displayName || "Context") + ".Provider";
      case Ls:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case zs:
        return t = e.displayName || null, t !== null ? t : Pi(e.type) || "Memo";
      case st:
        t = e._payload, e = e._init;
        try {
          return Pi(e(t));
        } catch {
        }
    }
  return null;
}
function Zd(e) {
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
      return Pi(t);
    case 8:
      return t === Ps ? "StrictMode" : "Mode";
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
function xt(e) {
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
function yu(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Jd(e) {
  var t = yu(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function yr(e) {
  e._valueTracker || (e._valueTracker = Jd(e));
}
function wu(e) {
  if (!e)
    return !1;
  var t = e._valueTracker;
  if (!t)
    return !0;
  var n = t.getValue(), r = "";
  return e && (r = yu(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function el(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Li(e, t) {
  var n = t.checked;
  return Q({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Eo(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = xt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function xu(e, t) {
  t = t.checked, t != null && Ts(e, "checked", t, !1);
}
function zi(e, t) {
  xu(e, t);
  var n = xt(t.value), r = t.type;
  if (n != null)
    r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Ri(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ri(e, t.type, xt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function _o(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
      return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Ri(e, t, n) {
  (t !== "number" || el(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ln = Array.isArray;
function rn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++)
      t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + xt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Mi(e, t) {
  if (t.dangerouslySetInnerHTML != null)
    throw Error(S(91));
  return Q({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function To(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null)
        throw Error(S(92));
      if (Ln(n)) {
        if (1 < n.length)
          throw Error(S(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: xt(n) };
}
function Su(e, t) {
  var n = xt(t.value), r = xt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Po(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Nu(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Di(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Nu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var wr, ju = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
    e.innerHTML = t;
  else {
    for (wr = wr || document.createElement("div"), wr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = wr.firstChild; e.firstChild; )
      e.removeChild(e.firstChild);
    for (; t.firstChild; )
      e.appendChild(t.firstChild);
  }
});
function Wn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Mn = {
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
}, bd = ["Webkit", "ms", "Moz", "O"];
Object.keys(Mn).forEach(function(e) {
  bd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Mn[t] = Mn[e];
  });
});
function ku(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Mn.hasOwnProperty(e) && Mn[e] ? ("" + t).trim() : t + "px";
}
function Cu(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, l = ku(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
}
var ef = Q({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Ii(e, t) {
  if (t) {
    if (ef[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
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
function Fi(e, t) {
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
var Oi = null;
function Rs(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var $i = null, ln = null, sn = null;
function Lo(e) {
  if (e = cr(e)) {
    if (typeof $i != "function")
      throw Error(S(280));
    var t = e.stateNode;
    t && (t = Ml(t), $i(e.stateNode, e.type, t));
  }
}
function Eu(e) {
  ln ? sn ? sn.push(e) : sn = [e] : ln = e;
}
function _u() {
  if (ln) {
    var e = ln, t = sn;
    if (sn = ln = null, Lo(e), t)
      for (e = 0; e < t.length; e++)
        Lo(t[e]);
  }
}
function Tu(e, t) {
  return e(t);
}
function Pu() {
}
var ql = !1;
function Lu(e, t, n) {
  if (ql)
    return e(t, n);
  ql = !0;
  try {
    return Tu(e, t, n);
  } finally {
    ql = !1, (ln !== null || sn !== null) && (Pu(), _u());
  }
}
function Qn(e, t) {
  var n = e.stateNode;
  if (n === null)
    return null;
  var r = Ml(n);
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
var Ai = !1;
if (be)
  try {
    var Nn = {};
    Object.defineProperty(Nn, "passive", { get: function() {
      Ai = !0;
    } }), window.addEventListener("test", Nn, Nn), window.removeEventListener("test", Nn, Nn);
  } catch {
    Ai = !1;
  }
function tf(e, t, n, r, l, i, s, a, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (f) {
    this.onError(f);
  }
}
var Dn = !1, tl = null, nl = !1, Ui = null, nf = { onError: function(e) {
  Dn = !0, tl = e;
} };
function rf(e, t, n, r, l, i, s, a, u) {
  Dn = !1, tl = null, tf.apply(nf, arguments);
}
function lf(e, t, n, r, l, i, s, a, u) {
  if (rf.apply(this, arguments), Dn) {
    if (Dn) {
      var c = tl;
      Dn = !1, tl = null;
    } else
      throw Error(S(198));
    nl || (nl = !0, Ui = c);
  }
}
function Bt(e) {
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
function zu(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
      return t.dehydrated;
  }
  return null;
}
function zo(e) {
  if (Bt(e) !== e)
    throw Error(S(188));
}
function sf(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Bt(e), t === null)
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
          return zo(l), e;
        if (i === r)
          return zo(l), t;
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
function Ru(e) {
  return e = sf(e), e !== null ? Mu(e) : null;
}
function Mu(e) {
  if (e.tag === 5 || e.tag === 6)
    return e;
  for (e = e.child; e !== null; ) {
    var t = Mu(e);
    if (t !== null)
      return t;
    e = e.sibling;
  }
  return null;
}
var Du = ke.unstable_scheduleCallback, Ro = ke.unstable_cancelCallback, of = ke.unstable_shouldYield, af = ke.unstable_requestPaint, Y = ke.unstable_now, uf = ke.unstable_getCurrentPriorityLevel, Ms = ke.unstable_ImmediatePriority, Iu = ke.unstable_UserBlockingPriority, rl = ke.unstable_NormalPriority, cf = ke.unstable_LowPriority, Fu = ke.unstable_IdlePriority, Pl = null, We = null;
function df(e) {
  if (We && typeof We.onCommitFiberRoot == "function")
    try {
      We.onCommitFiberRoot(Pl, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
}
var Oe = Math.clz32 ? Math.clz32 : mf, ff = Math.log, pf = Math.LN2;
function mf(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (ff(e) / pf | 0) | 0;
}
var xr = 64, Sr = 4194304;
function zn(e) {
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
function ll(e, t) {
  var n = e.pendingLanes;
  if (n === 0)
    return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var a = s & ~l;
    a !== 0 ? r = zn(a) : (i &= s, i !== 0 && (r = zn(i)));
  } else
    s = n & ~l, s !== 0 ? r = zn(s) : i !== 0 && (r = zn(i));
  if (r === 0)
    return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0))
    return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
    for (e = e.entanglements, t &= r; 0 < t; )
      n = 31 - Oe(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function hf(e, t) {
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
function vf(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var s = 31 - Oe(i), a = 1 << s, u = l[s];
    u === -1 ? (!(a & n) || a & r) && (l[s] = hf(a, t)) : u <= t && (e.expiredLanes |= a), i &= ~a;
  }
}
function Bi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ou() {
  var e = xr;
  return xr <<= 1, !(xr & 4194240) && (xr = 64), e;
}
function Zl(e) {
  for (var t = [], n = 0; 31 > n; n++)
    t.push(e);
  return t;
}
function ar(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Oe(t), e[t] = n;
}
function gf(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Oe(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function Ds(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Oe(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var F = 0;
function $u(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Au, Is, Uu, Bu, Hu, Hi = !1, Nr = [], ft = null, pt = null, mt = null, Gn = /* @__PURE__ */ new Map(), Kn = /* @__PURE__ */ new Map(), at = [], yf = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Mo(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ft = null;
      break;
    case "dragenter":
    case "dragleave":
      pt = null;
      break;
    case "mouseover":
    case "mouseout":
      mt = null;
      break;
    case "pointerover":
    case "pointerout":
      Gn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Kn.delete(t.pointerId);
  }
}
function jn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = cr(t), t !== null && Is(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function wf(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ft = jn(ft, e, t, n, r, l), !0;
    case "dragenter":
      return pt = jn(pt, e, t, n, r, l), !0;
    case "mouseover":
      return mt = jn(mt, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Gn.set(i, jn(Gn.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Kn.set(i, jn(Kn.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Vu(e) {
  var t = Lt(e.target);
  if (t !== null) {
    var n = Bt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = zu(n), t !== null) {
          e.blockedOn = t, Hu(e.priority, function() {
            Uu(n);
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
function Vr(e) {
  if (e.blockedOn !== null)
    return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Vi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Oi = r, n.target.dispatchEvent(r), Oi = null;
    } else
      return t = cr(n), t !== null && Is(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Do(e, t, n) {
  Vr(e) && n.delete(t);
}
function xf() {
  Hi = !1, ft !== null && Vr(ft) && (ft = null), pt !== null && Vr(pt) && (pt = null), mt !== null && Vr(mt) && (mt = null), Gn.forEach(Do), Kn.forEach(Do);
}
function kn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Hi || (Hi = !0, ke.unstable_scheduleCallback(ke.unstable_NormalPriority, xf)));
}
function Yn(e) {
  function t(l) {
    return kn(l, e);
  }
  if (0 < Nr.length) {
    kn(Nr[0], e);
    for (var n = 1; n < Nr.length; n++) {
      var r = Nr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ft !== null && kn(ft, e), pt !== null && kn(pt, e), mt !== null && kn(mt, e), Gn.forEach(t), Kn.forEach(t), n = 0; n < at.length; n++)
    r = at[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < at.length && (n = at[0], n.blockedOn === null); )
    Vu(n), n.blockedOn === null && at.shift();
}
var on = rt.ReactCurrentBatchConfig, il = !0;
function Sf(e, t, n, r) {
  var l = F, i = on.transition;
  on.transition = null;
  try {
    F = 1, Fs(e, t, n, r);
  } finally {
    F = l, on.transition = i;
  }
}
function Nf(e, t, n, r) {
  var l = F, i = on.transition;
  on.transition = null;
  try {
    F = 4, Fs(e, t, n, r);
  } finally {
    F = l, on.transition = i;
  }
}
function Fs(e, t, n, r) {
  if (il) {
    var l = Vi(e, t, n, r);
    if (l === null)
      oi(e, t, r, sl, n), Mo(e, r);
    else if (wf(l, e, t, n, r))
      r.stopPropagation();
    else if (Mo(e, r), t & 4 && -1 < yf.indexOf(e)) {
      for (; l !== null; ) {
        var i = cr(l);
        if (i !== null && Au(i), i = Vi(e, t, n, r), i === null && oi(e, t, r, sl, n), i === l)
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else
      oi(e, t, r, null, n);
  }
}
var sl = null;
function Vi(e, t, n, r) {
  if (sl = null, e = Rs(r), e = Lt(e), e !== null)
    if (t = Bt(e), t === null)
      e = null;
    else if (n = t.tag, n === 13) {
      if (e = zu(t), e !== null)
        return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else
      t !== e && (e = null);
  return sl = e, null;
}
function Wu(e) {
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
      switch (uf()) {
        case Ms:
          return 1;
        case Iu:
          return 4;
        case rl:
        case cf:
          return 16;
        case Fu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ct = null, Os = null, Wr = null;
function Qu() {
  if (Wr)
    return Wr;
  var e, t = Os, n = t.length, r, l = "value" in ct ? ct.value : ct.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++)
    ;
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === l[i - r]; r++)
    ;
  return Wr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Qr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function jr() {
  return !0;
}
function Io() {
  return !1;
}
function Ee(e) {
  function t(n, r, l, i, s) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = s, this.currentTarget = null;
    for (var a in e)
      e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? jr : Io, this.isPropagationStopped = Io, this;
  }
  return Q(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = jr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = jr);
  }, persist: function() {
  }, isPersistent: jr }), t;
}
var wn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, $s = Ee(wn), ur = Q({}, wn, { view: 0, detail: 0 }), jf = Ee(ur), Jl, bl, Cn, Ll = Q({}, ur, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: As, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Cn && (Cn && e.type === "mousemove" ? (Jl = e.screenX - Cn.screenX, bl = e.screenY - Cn.screenY) : bl = Jl = 0, Cn = e), Jl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : bl;
} }), Fo = Ee(Ll), kf = Q({}, Ll, { dataTransfer: 0 }), Cf = Ee(kf), Ef = Q({}, ur, { relatedTarget: 0 }), ei = Ee(Ef), _f = Q({}, wn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Tf = Ee(_f), Pf = Q({}, wn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Lf = Ee(Pf), zf = Q({}, wn, { data: 0 }), Oo = Ee(zf), Rf = {
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
}, Mf = {
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
}, Df = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function If(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Df[e]) ? !!t[e] : !1;
}
function As() {
  return If;
}
var Ff = Q({}, ur, { key: function(e) {
  if (e.key) {
    var t = Rf[e.key] || e.key;
    if (t !== "Unidentified")
      return t;
  }
  return e.type === "keypress" ? (e = Qr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Mf[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: As, charCode: function(e) {
  return e.type === "keypress" ? Qr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Qr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Of = Ee(Ff), $f = Q({}, Ll, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), $o = Ee($f), Af = Q({}, ur, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: As }), Uf = Ee(Af), Bf = Q({}, wn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Hf = Ee(Bf), Vf = Q({}, Ll, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Wf = Ee(Vf), Qf = [9, 13, 27, 32], Us = be && "CompositionEvent" in window, In = null;
be && "documentMode" in document && (In = document.documentMode);
var Gf = be && "TextEvent" in window && !In, Gu = be && (!Us || In && 8 < In && 11 >= In), Ao = " ", Uo = !1;
function Ku(e, t) {
  switch (e) {
    case "keyup":
      return Qf.indexOf(t.keyCode) !== -1;
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
function Yu(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Kt = !1;
function Kf(e, t) {
  switch (e) {
    case "compositionend":
      return Yu(t);
    case "keypress":
      return t.which !== 32 ? null : (Uo = !0, Ao);
    case "textInput":
      return e = t.data, e === Ao && Uo ? null : e;
    default:
      return null;
  }
}
function Yf(e, t) {
  if (Kt)
    return e === "compositionend" || !Us && Ku(e, t) ? (e = Qu(), Wr = Os = ct = null, Kt = !1, e) : null;
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
      return Gu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Xf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Bo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Xf[e.type] : t === "textarea";
}
function Xu(e, t, n, r) {
  Eu(r), t = ol(t, "onChange"), 0 < t.length && (n = new $s("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Fn = null, Xn = null;
function qf(e) {
  sc(e, 0);
}
function zl(e) {
  var t = qt(e);
  if (wu(t))
    return e;
}
function Zf(e, t) {
  if (e === "change")
    return t;
}
var qu = !1;
if (be) {
  var ti;
  if (be) {
    var ni = "oninput" in document;
    if (!ni) {
      var Ho = document.createElement("div");
      Ho.setAttribute("oninput", "return;"), ni = typeof Ho.oninput == "function";
    }
    ti = ni;
  } else
    ti = !1;
  qu = ti && (!document.documentMode || 9 < document.documentMode);
}
function Vo() {
  Fn && (Fn.detachEvent("onpropertychange", Zu), Xn = Fn = null);
}
function Zu(e) {
  if (e.propertyName === "value" && zl(Xn)) {
    var t = [];
    Xu(t, Xn, e, Rs(e)), Lu(qf, t);
  }
}
function Jf(e, t, n) {
  e === "focusin" ? (Vo(), Fn = t, Xn = n, Fn.attachEvent("onpropertychange", Zu)) : e === "focusout" && Vo();
}
function bf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return zl(Xn);
}
function ep(e, t) {
  if (e === "click")
    return zl(t);
}
function tp(e, t) {
  if (e === "input" || e === "change")
    return zl(t);
}
function np(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ae = typeof Object.is == "function" ? Object.is : np;
function qn(e, t) {
  if (Ae(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Ci.call(t, l) || !Ae(e[l], t[l]))
      return !1;
  }
  return !0;
}
function Wo(e) {
  for (; e && e.firstChild; )
    e = e.firstChild;
  return e;
}
function Qo(e, t) {
  var n = Wo(e);
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
    n = Wo(n);
  }
}
function Ju(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ju(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function bu() {
  for (var e = window, t = el(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n)
      e = t.contentWindow;
    else
      break;
    t = el(e.document);
  }
  return t;
}
function Bs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function rp(e) {
  var t = bu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Ju(n.ownerDocument.documentElement, n)) {
    if (r !== null && Bs(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
        n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = Qo(n, i);
        var s = Qo(
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
var lp = be && "documentMode" in document && 11 >= document.documentMode, Yt = null, Wi = null, On = null, Qi = !1;
function Go(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Qi || Yt == null || Yt !== el(r) || (r = Yt, "selectionStart" in r && Bs(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), On && qn(On, r) || (On = r, r = ol(Wi, "onSelect"), 0 < r.length && (t = new $s("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Yt)));
}
function kr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Xt = { animationend: kr("Animation", "AnimationEnd"), animationiteration: kr("Animation", "AnimationIteration"), animationstart: kr("Animation", "AnimationStart"), transitionend: kr("Transition", "TransitionEnd") }, ri = {}, ec = {};
be && (ec = document.createElement("div").style, "AnimationEvent" in window || (delete Xt.animationend.animation, delete Xt.animationiteration.animation, delete Xt.animationstart.animation), "TransitionEvent" in window || delete Xt.transitionend.transition);
function Rl(e) {
  if (ri[e])
    return ri[e];
  if (!Xt[e])
    return e;
  var t = Xt[e], n;
  for (n in t)
    if (t.hasOwnProperty(n) && n in ec)
      return ri[e] = t[n];
  return e;
}
var tc = Rl("animationend"), nc = Rl("animationiteration"), rc = Rl("animationstart"), lc = Rl("transitionend"), ic = /* @__PURE__ */ new Map(), Ko = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Nt(e, t) {
  ic.set(e, t), Ut(t, [e]);
}
for (var li = 0; li < Ko.length; li++) {
  var ii = Ko[li], ip = ii.toLowerCase(), sp = ii[0].toUpperCase() + ii.slice(1);
  Nt(ip, "on" + sp);
}
Nt(tc, "onAnimationEnd");
Nt(nc, "onAnimationIteration");
Nt(rc, "onAnimationStart");
Nt("dblclick", "onDoubleClick");
Nt("focusin", "onFocus");
Nt("focusout", "onBlur");
Nt(lc, "onTransitionEnd");
dn("onMouseEnter", ["mouseout", "mouseover"]);
dn("onMouseLeave", ["mouseout", "mouseover"]);
dn("onPointerEnter", ["pointerout", "pointerover"]);
dn("onPointerLeave", ["pointerout", "pointerover"]);
Ut("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ut("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ut("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ut("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ut("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ut("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Rn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), op = new Set("cancel close invalid load scroll toggle".split(" ").concat(Rn));
function Yo(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, lf(r, t, void 0, e), e.currentTarget = null;
}
function sc(e, t) {
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
          Yo(l, a, c), i = u;
        }
      else
        for (s = 0; s < r.length; s++) {
          if (a = r[s], u = a.instance, c = a.currentTarget, a = a.listener, u !== i && l.isPropagationStopped())
            break e;
          Yo(l, a, c), i = u;
        }
    }
  }
  if (nl)
    throw e = Ui, nl = !1, Ui = null, e;
}
function A(e, t) {
  var n = t[qi];
  n === void 0 && (n = t[qi] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (oc(t, e, 2, !1), n.add(r));
}
function si(e, t, n) {
  var r = 0;
  t && (r |= 4), oc(n, e, r, t);
}
var Cr = "_reactListening" + Math.random().toString(36).slice(2);
function Zn(e) {
  if (!e[Cr]) {
    e[Cr] = !0, mu.forEach(function(n) {
      n !== "selectionchange" && (op.has(n) || si(n, !1, e), si(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Cr] || (t[Cr] = !0, si("selectionchange", !1, t));
  }
}
function oc(e, t, n, r) {
  switch (Wu(t)) {
    case 1:
      var l = Sf;
      break;
    case 4:
      l = Nf;
      break;
    default:
      l = Fs;
  }
  n = l.bind(null, t, n, e), l = void 0, !Ai || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function oi(e, t, n, r, l) {
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
            if (s = Lt(a), s === null)
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
  Lu(function() {
    var c = i, f = Rs(n), h = [];
    e: {
      var v = ic.get(e);
      if (v !== void 0) {
        var x = $s, g = e;
        switch (e) {
          case "keypress":
            if (Qr(n) === 0)
              break e;
          case "keydown":
          case "keyup":
            x = Of;
            break;
          case "focusin":
            g = "focus", x = ei;
            break;
          case "focusout":
            g = "blur", x = ei;
            break;
          case "beforeblur":
          case "afterblur":
            x = ei;
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
            x = Fo;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = Cf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = Uf;
            break;
          case tc:
          case nc:
          case rc:
            x = Tf;
            break;
          case lc:
            x = Hf;
            break;
          case "scroll":
            x = jf;
            break;
          case "wheel":
            x = Wf;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = Lf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = $o;
        }
        var w = (t & 4) !== 0, j = !w && e === "scroll", p = w ? v !== null ? v + "Capture" : null : v;
        w = [];
        for (var d = c, m; d !== null; ) {
          m = d;
          var y = m.stateNode;
          if (m.tag === 5 && y !== null && (m = y, p !== null && (y = Qn(d, p), y != null && w.push(Jn(d, y, m)))), j)
            break;
          d = d.return;
        }
        0 < w.length && (v = new x(v, g, null, n, f), h.push({ event: v, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (v = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", v && n !== Oi && (g = n.relatedTarget || n.fromElement) && (Lt(g) || g[et]))
          break e;
        if ((x || v) && (v = f.window === f ? f : (v = f.ownerDocument) ? v.defaultView || v.parentWindow : window, x ? (g = n.relatedTarget || n.toElement, x = c, g = g ? Lt(g) : null, g !== null && (j = Bt(g), g !== j || g.tag !== 5 && g.tag !== 6) && (g = null)) : (x = null, g = c), x !== g)) {
          if (w = Fo, y = "onMouseLeave", p = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (w = $o, y = "onPointerLeave", p = "onPointerEnter", d = "pointer"), j = x == null ? v : qt(x), m = g == null ? v : qt(g), v = new w(y, d + "leave", x, n, f), v.target = j, v.relatedTarget = m, y = null, Lt(f) === c && (w = new w(p, d + "enter", g, n, f), w.target = m, w.relatedTarget = j, y = w), j = y, x && g)
            t: {
              for (w = x, p = g, d = 0, m = w; m; m = Wt(m))
                d++;
              for (m = 0, y = p; y; y = Wt(y))
                m++;
              for (; 0 < d - m; )
                w = Wt(w), d--;
              for (; 0 < m - d; )
                p = Wt(p), m--;
              for (; d--; ) {
                if (w === p || p !== null && w === p.alternate)
                  break t;
                w = Wt(w), p = Wt(p);
              }
              w = null;
            }
          else
            w = null;
          x !== null && Xo(h, v, x, w, !1), g !== null && j !== null && Xo(h, j, g, w, !0);
        }
      }
      e: {
        if (v = c ? qt(c) : window, x = v.nodeName && v.nodeName.toLowerCase(), x === "select" || x === "input" && v.type === "file")
          var N = Zf;
        else if (Bo(v))
          if (qu)
            N = tp;
          else {
            N = bf;
            var k = Jf;
          }
        else
          (x = v.nodeName) && x.toLowerCase() === "input" && (v.type === "checkbox" || v.type === "radio") && (N = ep);
        if (N && (N = N(e, c))) {
          Xu(h, N, n, f);
          break e;
        }
        k && k(e, v, c), e === "focusout" && (k = v._wrapperState) && k.controlled && v.type === "number" && Ri(v, "number", v.value);
      }
      switch (k = c ? qt(c) : window, e) {
        case "focusin":
          (Bo(k) || k.contentEditable === "true") && (Yt = k, Wi = c, On = null);
          break;
        case "focusout":
          On = Wi = Yt = null;
          break;
        case "mousedown":
          Qi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Qi = !1, Go(h, n, f);
          break;
        case "selectionchange":
          if (lp)
            break;
        case "keydown":
        case "keyup":
          Go(h, n, f);
      }
      var E;
      if (Us)
        e: {
          switch (e) {
            case "compositionstart":
              var _ = "onCompositionStart";
              break e;
            case "compositionend":
              _ = "onCompositionEnd";
              break e;
            case "compositionupdate":
              _ = "onCompositionUpdate";
              break e;
          }
          _ = void 0;
        }
      else
        Kt ? Ku(e, n) && (_ = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (_ = "onCompositionStart");
      _ && (Gu && n.locale !== "ko" && (Kt || _ !== "onCompositionStart" ? _ === "onCompositionEnd" && Kt && (E = Qu()) : (ct = f, Os = "value" in ct ? ct.value : ct.textContent, Kt = !0)), k = ol(c, _), 0 < k.length && (_ = new Oo(_, e, null, n, f), h.push({ event: _, listeners: k }), E ? _.data = E : (E = Yu(n), E !== null && (_.data = E)))), (E = Gf ? Kf(e, n) : Yf(e, n)) && (c = ol(c, "onBeforeInput"), 0 < c.length && (f = new Oo("onBeforeInput", "beforeinput", null, n, f), h.push({ event: f, listeners: c }), f.data = E));
    }
    sc(h, t);
  });
}
function Jn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ol(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Qn(e, n), i != null && r.unshift(Jn(e, i, l)), i = Qn(e, t), i != null && r.push(Jn(e, i, l))), e = e.return;
  }
  return r;
}
function Wt(e) {
  if (e === null)
    return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Xo(e, t, n, r, l) {
  for (var i = t._reactName, s = []; n !== null && n !== r; ) {
    var a = n, u = a.alternate, c = a.stateNode;
    if (u !== null && u === r)
      break;
    a.tag === 5 && c !== null && (a = c, l ? (u = Qn(n, i), u != null && s.unshift(Jn(n, u, a))) : l || (u = Qn(n, i), u != null && s.push(Jn(n, u, a)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var ap = /\r\n?/g, up = /\u0000|\uFFFD/g;
function qo(e) {
  return (typeof e == "string" ? e : "" + e).replace(ap, `
`).replace(up, "");
}
function Er(e, t, n) {
  if (t = qo(t), qo(e) !== t && n)
    throw Error(S(425));
}
function al() {
}
var Gi = null, Ki = null;
function Yi(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Xi = typeof setTimeout == "function" ? setTimeout : void 0, cp = typeof clearTimeout == "function" ? clearTimeout : void 0, Zo = typeof Promise == "function" ? Promise : void 0, dp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zo < "u" ? function(e) {
  return Zo.resolve(null).then(e).catch(fp);
} : Xi;
function fp(e) {
  setTimeout(function() {
    throw e;
  });
}
function ai(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8)
      if (n = l.data, n === "/$") {
        if (r === 0) {
          e.removeChild(l), Yn(t);
          return;
        }
        r--;
      } else
        n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Yn(t);
}
function ht(e) {
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
function Jo(e) {
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
var xn = Math.random().toString(36).slice(2), Ve = "__reactFiber$" + xn, bn = "__reactProps$" + xn, et = "__reactContainer$" + xn, qi = "__reactEvents$" + xn, pp = "__reactListeners$" + xn, mp = "__reactHandles$" + xn;
function Lt(e) {
  var t = e[Ve];
  if (t)
    return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[et] || n[Ve]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
        for (e = Jo(e); e !== null; ) {
          if (n = e[Ve])
            return n;
          e = Jo(e);
        }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function cr(e) {
  return e = e[Ve] || e[et], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function qt(e) {
  if (e.tag === 5 || e.tag === 6)
    return e.stateNode;
  throw Error(S(33));
}
function Ml(e) {
  return e[bn] || null;
}
var Zi = [], Zt = -1;
function jt(e) {
  return { current: e };
}
function U(e) {
  0 > Zt || (e.current = Zi[Zt], Zi[Zt] = null, Zt--);
}
function $(e, t) {
  Zt++, Zi[Zt] = e.current, e.current = t;
}
var St = {}, ae = jt(St), ge = jt(!1), It = St;
function fn(e, t) {
  var n = e.type.contextTypes;
  if (!n)
    return St;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n)
    l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ye(e) {
  return e = e.childContextTypes, e != null;
}
function ul() {
  U(ge), U(ae);
}
function bo(e, t, n) {
  if (ae.current !== St)
    throw Error(S(168));
  $(ae, t), $(ge, n);
}
function ac(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function")
    return n;
  r = r.getChildContext();
  for (var l in r)
    if (!(l in t))
      throw Error(S(108, Zd(e) || "Unknown", l));
  return Q({}, n, r);
}
function cl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || St, It = ae.current, $(ae, e), $(ge, ge.current), !0;
}
function ea(e, t, n) {
  var r = e.stateNode;
  if (!r)
    throw Error(S(169));
  n ? (e = ac(e, t, It), r.__reactInternalMemoizedMergedChildContext = e, U(ge), U(ae), $(ae, e)) : U(ge), $(ge, n);
}
var Ye = null, Dl = !1, ui = !1;
function uc(e) {
  Ye === null ? Ye = [e] : Ye.push(e);
}
function hp(e) {
  Dl = !0, uc(e);
}
function kt() {
  if (!ui && Ye !== null) {
    ui = !0;
    var e = 0, t = F;
    try {
      var n = Ye;
      for (F = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ye = null, Dl = !1;
    } catch (l) {
      throw Ye !== null && (Ye = Ye.slice(e + 1)), Du(Ms, kt), l;
    } finally {
      F = t, ui = !1;
    }
  }
  return null;
}
var Jt = [], bt = 0, dl = null, fl = 0, _e = [], Te = 0, Ft = null, qe = 1, Ze = "";
function Tt(e, t) {
  Jt[bt++] = fl, Jt[bt++] = dl, dl = e, fl = t;
}
function cc(e, t, n) {
  _e[Te++] = qe, _e[Te++] = Ze, _e[Te++] = Ft, Ft = e;
  var r = qe;
  e = Ze;
  var l = 32 - Oe(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Oe(t) + l;
  if (30 < i) {
    var s = l - l % 5;
    i = (r & (1 << s) - 1).toString(32), r >>= s, l -= s, qe = 1 << 32 - Oe(t) + l | n << l | r, Ze = i + e;
  } else
    qe = 1 << i | n << l | r, Ze = e;
}
function Hs(e) {
  e.return !== null && (Tt(e, 1), cc(e, 1, 0));
}
function Vs(e) {
  for (; e === dl; )
    dl = Jt[--bt], Jt[bt] = null, fl = Jt[--bt], Jt[bt] = null;
  for (; e === Ft; )
    Ft = _e[--Te], _e[Te] = null, Ze = _e[--Te], _e[Te] = null, qe = _e[--Te], _e[Te] = null;
}
var je = null, Ne = null, B = !1, Fe = null;
function dc(e, t) {
  var n = Pe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function ta(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, je = e, Ne = ht(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, je = e, Ne = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ft !== null ? { id: qe, overflow: Ze } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Pe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, je = e, Ne = null, !0) : !1;
    default:
      return !1;
  }
}
function Ji(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function bi(e) {
  if (B) {
    var t = Ne;
    if (t) {
      var n = t;
      if (!ta(e, t)) {
        if (Ji(e))
          throw Error(S(418));
        t = ht(n.nextSibling);
        var r = je;
        t && ta(e, t) ? dc(r, n) : (e.flags = e.flags & -4097 | 2, B = !1, je = e);
      }
    } else {
      if (Ji(e))
        throw Error(S(418));
      e.flags = e.flags & -4097 | 2, B = !1, je = e;
    }
  }
}
function na(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  je = e;
}
function _r(e) {
  if (e !== je)
    return !1;
  if (!B)
    return na(e), B = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Yi(e.type, e.memoizedProps)), t && (t = Ne)) {
    if (Ji(e))
      throw fc(), Error(S(418));
    for (; t; )
      dc(e, t), t = ht(t.nextSibling);
  }
  if (na(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
      throw Error(S(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ne = ht(e.nextSibling);
              break e;
            }
            t--;
          } else
            n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Ne = null;
    }
  } else
    Ne = je ? ht(e.stateNode.nextSibling) : null;
  return !0;
}
function fc() {
  for (var e = Ne; e; )
    e = ht(e.nextSibling);
}
function pn() {
  Ne = je = null, B = !1;
}
function Ws(e) {
  Fe === null ? Fe = [e] : Fe.push(e);
}
var vp = rt.ReactCurrentBatchConfig;
function De(e, t) {
  if (e && e.defaultProps) {
    t = Q({}, t), e = e.defaultProps;
    for (var n in e)
      t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var pl = jt(null), ml = null, en = null, Qs = null;
function Gs() {
  Qs = en = ml = null;
}
function Ks(e) {
  var t = pl.current;
  U(pl), e._currentValue = t;
}
function es(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
      break;
    e = e.return;
  }
}
function an(e, t) {
  ml = e, Qs = en = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ve = !0), e.firstContext = null);
}
function ze(e) {
  var t = e._currentValue;
  if (Qs !== e)
    if (e = { context: e, memoizedValue: t, next: null }, en === null) {
      if (ml === null)
        throw Error(S(308));
      en = e, ml.dependencies = { lanes: 0, firstContext: e };
    } else
      en = en.next = e;
  return t;
}
var zt = null;
function Ys(e) {
  zt === null ? zt = [e] : zt.push(e);
}
function pc(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Ys(t)) : (n.next = l.next, l.next = n), t.interleaved = n, tt(e, r);
}
function tt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var ot = !1;
function Xs(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function mc(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Je(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function vt(e, t, n) {
  var r = e.updateQueue;
  if (r === null)
    return null;
  if (r = r.shared, I & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, tt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Ys(r)) : (t.next = l.next, l.next = t), r.interleaved = t, tt(e, n);
}
function Gr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Ds(e, n);
  }
}
function ra(e, t) {
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
function hl(e, t, n, r) {
  var l = e.updateQueue;
  ot = !1;
  var i = l.firstBaseUpdate, s = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a, c = u.next;
    u.next = null, s === null ? i = c : s.next = c, s = u;
    var f = e.alternate;
    f !== null && (f = f.updateQueue, a = f.lastBaseUpdate, a !== s && (a === null ? f.firstBaseUpdate = c : a.next = c, f.lastBaseUpdate = u));
  }
  if (i !== null) {
    var h = l.baseState;
    s = 0, f = c = u = null, a = i;
    do {
      var v = a.lane, x = a.eventTime;
      if ((r & v) === v) {
        f !== null && (f = f.next = {
          eventTime: x,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var g = e, w = a;
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
              h = Q({}, h, v);
              break e;
            case 2:
              ot = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, v = l.effects, v === null ? l.effects = [a] : v.push(a));
      } else
        x = { eventTime: x, lane: v, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, f === null ? (c = f = x, u = h) : f = f.next = x, s |= v;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null)
          break;
        v = a, a = v.next, v.next = null, l.lastBaseUpdate = v, l.shared.pending = null;
      }
    } while (!0);
    if (f === null && (u = h), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = f, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        s |= l.lane, l = l.next;
      while (l !== t);
    } else
      i === null && (l.shared.lanes = 0);
    $t |= s, e.lanes = s, e.memoizedState = h;
  }
}
function la(e, t, n) {
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
var hc = new pu.Component().refs;
function ts(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Q({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Il = { isMounted: function(e) {
  return (e = e._reactInternals) ? Bt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = de(), l = yt(e), i = Je(r, l);
  i.payload = t, n != null && (i.callback = n), t = vt(e, i, l), t !== null && ($e(t, e, l, r), Gr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = de(), l = yt(e), i = Je(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = vt(e, i, l), t !== null && ($e(t, e, l, r), Gr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = de(), r = yt(e), l = Je(n, r);
  l.tag = 2, t != null && (l.callback = t), t = vt(e, l, r), t !== null && ($e(t, e, r, n), Gr(t, e, r));
} };
function ia(e, t, n, r, l, i, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, s) : t.prototype && t.prototype.isPureReactComponent ? !qn(n, r) || !qn(l, i) : !0;
}
function vc(e, t, n) {
  var r = !1, l = St, i = t.contextType;
  return typeof i == "object" && i !== null ? i = ze(i) : (l = ye(t) ? It : ae.current, r = t.contextTypes, i = (r = r != null) ? fn(e, l) : St), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Il, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function sa(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Il.enqueueReplaceState(t, t.state, null);
}
function ns(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = hc, Xs(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = ze(i) : (i = ye(t) ? It : ae.current, l.context = fn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (ts(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Il.enqueueReplaceState(l, l.state, null), hl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function En(e, t, n) {
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
        a === hc && (a = l.refs = {}), s === null ? delete a[i] : a[i] = s;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string")
      throw Error(S(284));
    if (!n._owner)
      throw Error(S(290, e));
  }
  return e;
}
function Tr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(S(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function oa(e) {
  var t = e._init;
  return t(e._payload);
}
function gc(e) {
  function t(p, d) {
    if (e) {
      var m = p.deletions;
      m === null ? (p.deletions = [d], p.flags |= 16) : m.push(d);
    }
  }
  function n(p, d) {
    if (!e)
      return null;
    for (; d !== null; )
      t(p, d), d = d.sibling;
    return null;
  }
  function r(p, d) {
    for (p = /* @__PURE__ */ new Map(); d !== null; )
      d.key !== null ? p.set(d.key, d) : p.set(d.index, d), d = d.sibling;
    return p;
  }
  function l(p, d) {
    return p = wt(p, d), p.index = 0, p.sibling = null, p;
  }
  function i(p, d, m) {
    return p.index = m, e ? (m = p.alternate, m !== null ? (m = m.index, m < d ? (p.flags |= 2, d) : m) : (p.flags |= 2, d)) : (p.flags |= 1048576, d);
  }
  function s(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function a(p, d, m, y) {
    return d === null || d.tag !== 6 ? (d = vi(m, p.mode, y), d.return = p, d) : (d = l(d, m), d.return = p, d);
  }
  function u(p, d, m, y) {
    var N = m.type;
    return N === Gt ? f(p, d, m.props.children, y, m.key) : d !== null && (d.elementType === N || typeof N == "object" && N !== null && N.$$typeof === st && oa(N) === d.type) ? (y = l(d, m.props), y.ref = En(p, d, m), y.return = p, y) : (y = Jr(m.type, m.key, m.props, null, p.mode, y), y.ref = En(p, d, m), y.return = p, y);
  }
  function c(p, d, m, y) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== m.containerInfo || d.stateNode.implementation !== m.implementation ? (d = gi(m, p.mode, y), d.return = p, d) : (d = l(d, m.children || []), d.return = p, d);
  }
  function f(p, d, m, y, N) {
    return d === null || d.tag !== 7 ? (d = Dt(m, p.mode, y, N), d.return = p, d) : (d = l(d, m), d.return = p, d);
  }
  function h(p, d, m) {
    if (typeof d == "string" && d !== "" || typeof d == "number")
      return d = vi("" + d, p.mode, m), d.return = p, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case gr:
          return m = Jr(d.type, d.key, d.props, null, p.mode, m), m.ref = En(p, null, d), m.return = p, m;
        case Qt:
          return d = gi(d, p.mode, m), d.return = p, d;
        case st:
          var y = d._init;
          return h(p, y(d._payload), m);
      }
      if (Ln(d) || Sn(d))
        return d = Dt(d, p.mode, m, null), d.return = p, d;
      Tr(p, d);
    }
    return null;
  }
  function v(p, d, m, y) {
    var N = d !== null ? d.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number")
      return N !== null ? null : a(p, d, "" + m, y);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case gr:
          return m.key === N ? u(p, d, m, y) : null;
        case Qt:
          return m.key === N ? c(p, d, m, y) : null;
        case st:
          return N = m._init, v(
            p,
            d,
            N(m._payload),
            y
          );
      }
      if (Ln(m) || Sn(m))
        return N !== null ? null : f(p, d, m, y, null);
      Tr(p, m);
    }
    return null;
  }
  function x(p, d, m, y, N) {
    if (typeof y == "string" && y !== "" || typeof y == "number")
      return p = p.get(m) || null, a(d, p, "" + y, N);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case gr:
          return p = p.get(y.key === null ? m : y.key) || null, u(d, p, y, N);
        case Qt:
          return p = p.get(y.key === null ? m : y.key) || null, c(d, p, y, N);
        case st:
          var k = y._init;
          return x(p, d, m, k(y._payload), N);
      }
      if (Ln(y) || Sn(y))
        return p = p.get(m) || null, f(d, p, y, N, null);
      Tr(d, y);
    }
    return null;
  }
  function g(p, d, m, y) {
    for (var N = null, k = null, E = d, _ = d = 0, C = null; E !== null && _ < m.length; _++) {
      E.index > _ ? (C = E, E = null) : C = E.sibling;
      var z = v(p, E, m[_], y);
      if (z === null) {
        E === null && (E = C);
        break;
      }
      e && E && z.alternate === null && t(p, E), d = i(z, d, _), k === null ? N = z : k.sibling = z, k = z, E = C;
    }
    if (_ === m.length)
      return n(p, E), B && Tt(p, _), N;
    if (E === null) {
      for (; _ < m.length; _++)
        E = h(p, m[_], y), E !== null && (d = i(E, d, _), k === null ? N = E : k.sibling = E, k = E);
      return B && Tt(p, _), N;
    }
    for (E = r(p, E); _ < m.length; _++)
      C = x(E, p, _, m[_], y), C !== null && (e && C.alternate !== null && E.delete(C.key === null ? _ : C.key), d = i(C, d, _), k === null ? N = C : k.sibling = C, k = C);
    return e && E.forEach(function(O) {
      return t(p, O);
    }), B && Tt(p, _), N;
  }
  function w(p, d, m, y) {
    var N = Sn(m);
    if (typeof N != "function")
      throw Error(S(150));
    if (m = N.call(m), m == null)
      throw Error(S(151));
    for (var k = N = null, E = d, _ = d = 0, C = null, z = m.next(); E !== null && !z.done; _++, z = m.next()) {
      E.index > _ ? (C = E, E = null) : C = E.sibling;
      var O = v(p, E, z.value, y);
      if (O === null) {
        E === null && (E = C);
        break;
      }
      e && E && O.alternate === null && t(p, E), d = i(O, d, _), k === null ? N = O : k.sibling = O, k = O, E = C;
    }
    if (z.done)
      return n(
        p,
        E
      ), B && Tt(p, _), N;
    if (E === null) {
      for (; !z.done; _++, z = m.next())
        z = h(p, z.value, y), z !== null && (d = i(z, d, _), k === null ? N = z : k.sibling = z, k = z);
      return B && Tt(p, _), N;
    }
    for (E = r(p, E); !z.done; _++, z = m.next())
      z = x(E, p, _, z.value, y), z !== null && (e && z.alternate !== null && E.delete(z.key === null ? _ : z.key), d = i(z, d, _), k === null ? N = z : k.sibling = z, k = z);
    return e && E.forEach(function(Ue) {
      return t(p, Ue);
    }), B && Tt(p, _), N;
  }
  function j(p, d, m, y) {
    if (typeof m == "object" && m !== null && m.type === Gt && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case gr:
          e: {
            for (var N = m.key, k = d; k !== null; ) {
              if (k.key === N) {
                if (N = m.type, N === Gt) {
                  if (k.tag === 7) {
                    n(p, k.sibling), d = l(k, m.props.children), d.return = p, p = d;
                    break e;
                  }
                } else if (k.elementType === N || typeof N == "object" && N !== null && N.$$typeof === st && oa(N) === k.type) {
                  n(p, k.sibling), d = l(k, m.props), d.ref = En(p, k, m), d.return = p, p = d;
                  break e;
                }
                n(p, k);
                break;
              } else
                t(p, k);
              k = k.sibling;
            }
            m.type === Gt ? (d = Dt(m.props.children, p.mode, y, m.key), d.return = p, p = d) : (y = Jr(m.type, m.key, m.props, null, p.mode, y), y.ref = En(p, d, m), y.return = p, p = y);
          }
          return s(p);
        case Qt:
          e: {
            for (k = m.key; d !== null; ) {
              if (d.key === k)
                if (d.tag === 4 && d.stateNode.containerInfo === m.containerInfo && d.stateNode.implementation === m.implementation) {
                  n(p, d.sibling), d = l(d, m.children || []), d.return = p, p = d;
                  break e;
                } else {
                  n(p, d);
                  break;
                }
              else
                t(p, d);
              d = d.sibling;
            }
            d = gi(m, p.mode, y), d.return = p, p = d;
          }
          return s(p);
        case st:
          return k = m._init, j(p, d, k(m._payload), y);
      }
      if (Ln(m))
        return g(p, d, m, y);
      if (Sn(m))
        return w(p, d, m, y);
      Tr(p, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, d !== null && d.tag === 6 ? (n(p, d.sibling), d = l(d, m), d.return = p, p = d) : (n(p, d), d = vi(m, p.mode, y), d.return = p, p = d), s(p)) : n(p, d);
  }
  return j;
}
var mn = gc(!0), yc = gc(!1), dr = {}, Qe = jt(dr), er = jt(dr), tr = jt(dr);
function Rt(e) {
  if (e === dr)
    throw Error(S(174));
  return e;
}
function qs(e, t) {
  switch ($(tr, t), $(er, e), $(Qe, dr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Di(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Di(t, e);
  }
  U(Qe), $(Qe, t);
}
function hn() {
  U(Qe), U(er), U(tr);
}
function wc(e) {
  Rt(tr.current);
  var t = Rt(Qe.current), n = Di(t, e.type);
  t !== n && ($(er, e), $(Qe, n));
}
function Zs(e) {
  er.current === e && (U(Qe), U(er));
}
var H = jt(0);
function vl(e) {
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
var ci = [];
function Js() {
  for (var e = 0; e < ci.length; e++)
    ci[e]._workInProgressVersionPrimary = null;
  ci.length = 0;
}
var Kr = rt.ReactCurrentDispatcher, di = rt.ReactCurrentBatchConfig, Ot = 0, W = null, q = null, b = null, gl = !1, $n = !1, nr = 0, gp = 0;
function ie() {
  throw Error(S(321));
}
function bs(e, t) {
  if (t === null)
    return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Ae(e[n], t[n]))
      return !1;
  return !0;
}
function eo(e, t, n, r, l, i) {
  if (Ot = i, W = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Kr.current = e === null || e.memoizedState === null ? Sp : Np, e = n(r, l), $n) {
    i = 0;
    do {
      if ($n = !1, nr = 0, 25 <= i)
        throw Error(S(301));
      i += 1, b = q = null, t.updateQueue = null, Kr.current = jp, e = n(r, l);
    } while ($n);
  }
  if (Kr.current = yl, t = q !== null && q.next !== null, Ot = 0, b = q = W = null, gl = !1, t)
    throw Error(S(300));
  return e;
}
function to() {
  var e = nr !== 0;
  return nr = 0, e;
}
function He() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return b === null ? W.memoizedState = b = e : b = b.next = e, b;
}
function Re() {
  if (q === null) {
    var e = W.alternate;
    e = e !== null ? e.memoizedState : null;
  } else
    e = q.next;
  var t = b === null ? W.memoizedState : b.next;
  if (t !== null)
    b = t, q = e;
  else {
    if (e === null)
      throw Error(S(310));
    q = e, e = { memoizedState: q.memoizedState, baseState: q.baseState, baseQueue: q.baseQueue, queue: q.queue, next: null }, b === null ? W.memoizedState = b = e : b = b.next = e;
  }
  return b;
}
function rr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function fi(e) {
  var t = Re(), n = t.queue;
  if (n === null)
    throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = q, l = r.baseQueue, i = n.pending;
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
      var f = c.lane;
      if ((Ot & f) === f)
        u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var h = {
          lane: f,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (a = u = h, s = r) : u = u.next = h, W.lanes |= f, $t |= f;
      }
      c = c.next;
    } while (c !== null && c !== i);
    u === null ? s = r : u.next = a, Ae(r, t.memoizedState) || (ve = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, W.lanes |= i, $t |= i, l = l.next;
    while (l !== e);
  } else
    l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function pi(e) {
  var t = Re(), n = t.queue;
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
    Ae(i, t.memoizedState) || (ve = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function xc() {
}
function Sc(e, t) {
  var n = W, r = Re(), l = t(), i = !Ae(r.memoizedState, l);
  if (i && (r.memoizedState = l, ve = !0), r = r.queue, no(kc.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || b !== null && b.memoizedState.tag & 1) {
    if (n.flags |= 2048, lr(9, jc.bind(null, n, r, l, t), void 0, null), ee === null)
      throw Error(S(349));
    Ot & 30 || Nc(n, t, l);
  }
  return l;
}
function Nc(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = W.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, W.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function jc(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Cc(t) && Ec(e);
}
function kc(e, t, n) {
  return n(function() {
    Cc(t) && Ec(e);
  });
}
function Cc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ae(e, n);
  } catch {
    return !0;
  }
}
function Ec(e) {
  var t = tt(e, 1);
  t !== null && $e(t, e, 1, -1);
}
function aa(e) {
  var t = He();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: rr, lastRenderedState: e }, t.queue = e, e = e.dispatch = xp.bind(null, W, e), [t.memoizedState, e];
}
function lr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = W.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, W.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function _c() {
  return Re().memoizedState;
}
function Yr(e, t, n, r) {
  var l = He();
  W.flags |= e, l.memoizedState = lr(1 | t, n, void 0, r === void 0 ? null : r);
}
function Fl(e, t, n, r) {
  var l = Re();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (q !== null) {
    var s = q.memoizedState;
    if (i = s.destroy, r !== null && bs(r, s.deps)) {
      l.memoizedState = lr(t, n, i, r);
      return;
    }
  }
  W.flags |= e, l.memoizedState = lr(1 | t, n, i, r);
}
function ua(e, t) {
  return Yr(8390656, 8, e, t);
}
function no(e, t) {
  return Fl(2048, 8, e, t);
}
function Tc(e, t) {
  return Fl(4, 2, e, t);
}
function Pc(e, t) {
  return Fl(4, 4, e, t);
}
function Lc(e, t) {
  if (typeof t == "function")
    return e = e(), t(e), function() {
      t(null);
    };
  if (t != null)
    return e = e(), t.current = e, function() {
      t.current = null;
    };
}
function zc(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Fl(4, 4, Lc.bind(null, t, e), n);
}
function ro() {
}
function Rc(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && bs(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Mc(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && bs(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Dc(e, t, n) {
  return Ot & 21 ? (Ae(n, t) || (n = Ou(), W.lanes |= n, $t |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ve = !0), e.memoizedState = n);
}
function yp(e, t) {
  var n = F;
  F = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = di.transition;
  di.transition = {};
  try {
    e(!1), t();
  } finally {
    F = n, di.transition = r;
  }
}
function Ic() {
  return Re().memoizedState;
}
function wp(e, t, n) {
  var r = yt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Fc(e))
    Oc(t, n);
  else if (n = pc(e, t, n, r), n !== null) {
    var l = de();
    $e(n, e, r, l), $c(n, t, r);
  }
}
function xp(e, t, n) {
  var r = yt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Fc(e))
    Oc(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
      try {
        var s = t.lastRenderedState, a = i(s, n);
        if (l.hasEagerState = !0, l.eagerState = a, Ae(a, s)) {
          var u = t.interleaved;
          u === null ? (l.next = l, Ys(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
          return;
        }
      } catch {
      } finally {
      }
    n = pc(e, t, l, r), n !== null && (l = de(), $e(n, e, r, l), $c(n, t, r));
  }
}
function Fc(e) {
  var t = e.alternate;
  return e === W || t !== null && t === W;
}
function Oc(e, t) {
  $n = gl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function $c(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Ds(e, n);
  }
}
var yl = { readContext: ze, useCallback: ie, useContext: ie, useEffect: ie, useImperativeHandle: ie, useInsertionEffect: ie, useLayoutEffect: ie, useMemo: ie, useReducer: ie, useRef: ie, useState: ie, useDebugValue: ie, useDeferredValue: ie, useTransition: ie, useMutableSource: ie, useSyncExternalStore: ie, useId: ie, unstable_isNewReconciler: !1 }, Sp = { readContext: ze, useCallback: function(e, t) {
  return He().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ze, useEffect: ua, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Yr(
    4194308,
    4,
    Lc.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Yr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Yr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = He();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = He();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = wp.bind(null, W, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = He();
  return e = { current: e }, t.memoizedState = e;
}, useState: aa, useDebugValue: ro, useDeferredValue: function(e) {
  return He().memoizedState = e;
}, useTransition: function() {
  var e = aa(!1), t = e[0];
  return e = yp.bind(null, e[1]), He().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = W, l = He();
  if (B) {
    if (n === void 0)
      throw Error(S(407));
    n = n();
  } else {
    if (n = t(), ee === null)
      throw Error(S(349));
    Ot & 30 || Nc(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, ua(kc.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, lr(9, jc.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = He(), t = ee.identifierPrefix;
  if (B) {
    var n = Ze, r = qe;
    n = (r & ~(1 << 32 - Oe(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = nr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else
    n = gp++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Np = {
  readContext: ze,
  useCallback: Rc,
  useContext: ze,
  useEffect: no,
  useImperativeHandle: zc,
  useInsertionEffect: Tc,
  useLayoutEffect: Pc,
  useMemo: Mc,
  useReducer: fi,
  useRef: _c,
  useState: function() {
    return fi(rr);
  },
  useDebugValue: ro,
  useDeferredValue: function(e) {
    var t = Re();
    return Dc(t, q.memoizedState, e);
  },
  useTransition: function() {
    var e = fi(rr)[0], t = Re().memoizedState;
    return [e, t];
  },
  useMutableSource: xc,
  useSyncExternalStore: Sc,
  useId: Ic,
  unstable_isNewReconciler: !1
}, jp = { readContext: ze, useCallback: Rc, useContext: ze, useEffect: no, useImperativeHandle: zc, useInsertionEffect: Tc, useLayoutEffect: Pc, useMemo: Mc, useReducer: pi, useRef: _c, useState: function() {
  return pi(rr);
}, useDebugValue: ro, useDeferredValue: function(e) {
  var t = Re();
  return q === null ? t.memoizedState = e : Dc(t, q.memoizedState, e);
}, useTransition: function() {
  var e = pi(rr)[0], t = Re().memoizedState;
  return [e, t];
}, useMutableSource: xc, useSyncExternalStore: Sc, useId: Ic, unstable_isNewReconciler: !1 };
function vn(e, t) {
  try {
    var n = "", r = t;
    do
      n += qd(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function mi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function rs(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var kp = typeof WeakMap == "function" ? WeakMap : Map;
function Ac(e, t, n) {
  n = Je(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    xl || (xl = !0, ps = r), rs(e, t);
  }, n;
}
function Uc(e, t, n) {
  n = Je(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      rs(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    rs(e, t), typeof r != "function" && (gt === null ? gt = /* @__PURE__ */ new Set([this]) : gt.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function ca(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new kp();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else
    l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = $p.bind(null, e, t, n), t.then(e, e));
}
function da(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function fa(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Je(-1, 1), t.tag = 2, vt(n, t, 1))), n.lanes |= 1), e);
}
var Cp = rt.ReactCurrentOwner, ve = !1;
function ce(e, t, n, r) {
  t.child = e === null ? yc(t, null, n, r) : mn(t, e.child, n, r);
}
function pa(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return an(t, l), r = eo(e, t, n, r, i, l), n = to(), e !== null && !ve ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, nt(e, t, l)) : (B && n && Hs(t), t.flags |= 1, ce(e, t, r, l), t.child);
}
function ma(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !fo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Bc(e, t, i, r, l)) : (e = Jr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var s = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : qn, n(s, r) && e.ref === t.ref)
      return nt(e, t, l);
  }
  return t.flags |= 1, e = wt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Bc(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (qn(i, r) && e.ref === t.ref)
      if (ve = !1, t.pendingProps = r = i, (e.lanes & l) !== 0)
        e.flags & 131072 && (ve = !0);
      else
        return t.lanes = e.lanes, nt(e, t, l);
  }
  return ls(e, t, n, r, l);
}
function Hc(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, $(nn, Se), Se |= n;
    else {
      if (!(n & 1073741824))
        return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, $(nn, Se), Se |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, $(nn, Se), Se |= r;
    }
  else
    i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, $(nn, Se), Se |= r;
  return ce(e, t, l, n), t.child;
}
function Vc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function ls(e, t, n, r, l) {
  var i = ye(n) ? It : ae.current;
  return i = fn(t, i), an(t, l), n = eo(e, t, n, r, i, l), r = to(), e !== null && !ve ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, nt(e, t, l)) : (B && r && Hs(t), t.flags |= 1, ce(e, t, n, l), t.child);
}
function ha(e, t, n, r, l) {
  if (ye(n)) {
    var i = !0;
    cl(t);
  } else
    i = !1;
  if (an(t, l), t.stateNode === null)
    Xr(e, t), vc(t, n, r), ns(t, n, r, l), r = !0;
  else if (e === null) {
    var s = t.stateNode, a = t.memoizedProps;
    s.props = a;
    var u = s.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = ze(c) : (c = ye(n) ? It : ae.current, c = fn(t, c));
    var f = n.getDerivedStateFromProps, h = typeof f == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    h || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== r || u !== c) && sa(t, s, r, c), ot = !1;
    var v = t.memoizedState;
    s.state = v, hl(t, r, s, l), u = t.memoizedState, a !== r || v !== u || ge.current || ot ? (typeof f == "function" && (ts(t, n, f, r), u = t.memoizedState), (a = ot || ia(t, n, a, r, v, u, c)) ? (h || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), s.props = r, s.state = u, s.context = c, r = a) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    s = t.stateNode, mc(e, t), a = t.memoizedProps, c = t.type === t.elementType ? a : De(t.type, a), s.props = c, h = t.pendingProps, v = s.context, u = n.contextType, typeof u == "object" && u !== null ? u = ze(u) : (u = ye(n) ? It : ae.current, u = fn(t, u));
    var x = n.getDerivedStateFromProps;
    (f = typeof x == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== h || v !== u) && sa(t, s, r, u), ot = !1, v = t.memoizedState, s.state = v, hl(t, r, s, l);
    var g = t.memoizedState;
    a !== h || v !== g || ge.current || ot ? (typeof x == "function" && (ts(t, n, x, r), g = t.memoizedState), (c = ot || ia(t, n, c, r, v, g, u) || !1) ? (f || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, g, u), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, g, u)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && v === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = g), s.props = r, s.state = g, s.context = u, r = c) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && v === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return is(e, t, n, r, i, l);
}
function is(e, t, n, r, l, i) {
  Vc(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s)
    return l && ea(t, n, !1), nt(e, t, i);
  r = t.stateNode, Cp.current = t;
  var a = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && s ? (t.child = mn(t, e.child, null, i), t.child = mn(t, null, a, i)) : ce(e, t, a, i), t.memoizedState = r.state, l && ea(t, n, !0), t.child;
}
function Wc(e) {
  var t = e.stateNode;
  t.pendingContext ? bo(e, t.pendingContext, t.pendingContext !== t.context) : t.context && bo(e, t.context, !1), qs(e, t.containerInfo);
}
function va(e, t, n, r, l) {
  return pn(), Ws(l), t.flags |= 256, ce(e, t, n, r), t.child;
}
var ss = { dehydrated: null, treeContext: null, retryLane: 0 };
function os(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Qc(e, t, n) {
  var r = t.pendingProps, l = H.current, i = !1, s = (t.flags & 128) !== 0, a;
  if ((a = s) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), $(H, l & 1), e === null)
    return bi(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, s = { mode: "hidden", children: s }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = s) : i = Al(s, r, 0, null), e = Dt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = os(n), t.memoizedState = ss, e) : lo(t, s));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null))
    return Ep(e, t, s, r, a, l, n);
  if (i) {
    i = r.fallback, s = t.mode, l = e.child, a = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(s & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = wt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? i = wt(a, i) : (i = Dt(i, s, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, s = e.child.memoizedState, s = s === null ? os(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, i.memoizedState = s, i.childLanes = e.childLanes & ~n, t.memoizedState = ss, r;
  }
  return i = e.child, e = i.sibling, r = wt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function lo(e, t) {
  return t = Al({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Pr(e, t, n, r) {
  return r !== null && Ws(r), mn(t, e.child, null, n), e = lo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Ep(e, t, n, r, l, i, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = mi(Error(S(422))), Pr(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = Al({ mode: "visible", children: r.children }, l, 0, null), i = Dt(i, l, s, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && mn(t, e.child, null, s), t.child.memoizedState = os(s), t.memoizedState = ss, i);
  if (!(t.mode & 1))
    return Pr(e, t, s, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r)
      var a = r.dgst;
    return r = a, i = Error(S(419)), r = mi(i, r, void 0), Pr(e, t, s, r);
  }
  if (a = (s & e.childLanes) !== 0, ve || a) {
    if (r = ee, r !== null) {
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
      l = l & (r.suspendedLanes | s) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, tt(e, l), $e(r, e, l, -1));
    }
    return co(), r = mi(Error(S(421))), Pr(e, t, s, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Ap.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, Ne = ht(l.nextSibling), je = t, B = !0, Fe = null, e !== null && (_e[Te++] = qe, _e[Te++] = Ze, _e[Te++] = Ft, qe = e.id, Ze = e.overflow, Ft = t), t = lo(t, r.children), t.flags |= 4096, t);
}
function ga(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), es(e.return, t, n);
}
function hi(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function Gc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (ce(e, t, r.children, n), r = H.current, r & 2)
    r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128)
      e:
        for (e = t.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && ga(e, n, t);
          else if (e.tag === 19)
            ga(e, n, t);
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
  if ($(H, r), !(t.mode & 1))
    t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          e = n.alternate, e !== null && vl(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), hi(t, !1, l, n, i);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && vl(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        hi(t, !0, n, null, i);
        break;
      case "together":
        hi(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Xr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function nt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), $t |= t.lanes, !(n & t.childLanes))
    return null;
  if (e !== null && t.child !== e.child)
    throw Error(S(153));
  if (t.child !== null) {
    for (e = t.child, n = wt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      e = e.sibling, n = n.sibling = wt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function _p(e, t, n) {
  switch (t.tag) {
    case 3:
      Wc(t), pn();
      break;
    case 5:
      wc(t);
      break;
    case 1:
      ye(t.type) && cl(t);
      break;
    case 4:
      qs(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      $(pl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? ($(H, H.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Qc(e, t, n) : ($(H, H.current & 1), e = nt(e, t, n), e !== null ? e.sibling : null);
      $(H, H.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r)
          return Gc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), $(H, H.current), r)
        break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Hc(e, t, n);
  }
  return nt(e, t, n);
}
var Kc, as, Yc, Xc;
Kc = function(e, t) {
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
as = function() {
};
Yc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Rt(Qe.current);
    var i = null;
    switch (n) {
      case "input":
        l = Li(e, l), r = Li(e, r), i = [];
        break;
      case "select":
        l = Q({}, l, { value: void 0 }), r = Q({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = Mi(e, l), r = Mi(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = al);
    }
    Ii(n, r);
    var s;
    n = null;
    for (c in l)
      if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
        if (c === "style") {
          var a = l[c];
          for (s in a)
            a.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
        } else
          c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Vn.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
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
          c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, a = a ? a.__html : void 0, u != null && a !== u && (i = i || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Vn.hasOwnProperty(c) ? (u != null && c === "onScroll" && A("scroll", e), i || a === u || (i = [])) : (i = i || []).push(c, u));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
Xc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function _n(e, t) {
  if (!B)
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
function se(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else
    for (l = e.child; l !== null; )
      n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Tp(e, t, n) {
  var r = t.pendingProps;
  switch (Vs(t), t.tag) {
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
      return se(t), null;
    case 1:
      return ye(t.type) && ul(), se(t), null;
    case 3:
      return r = t.stateNode, hn(), U(ge), U(ae), Js(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (_r(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Fe !== null && (vs(Fe), Fe = null))), as(e, t), se(t), null;
    case 5:
      Zs(t);
      var l = Rt(tr.current);
      if (n = t.type, e !== null && t.stateNode != null)
        Yc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null)
            throw Error(S(166));
          return se(t), null;
        }
        if (e = Rt(Qe.current), _r(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ve] = t, r[bn] = i, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < Rn.length; l++)
                A(Rn[l], r);
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
              Eo(r, i), A("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, A("invalid", r);
              break;
            case "textarea":
              To(r, i), A("invalid", r);
          }
          Ii(n, i), l = null;
          for (var s in i)
            if (i.hasOwnProperty(s)) {
              var a = i[s];
              s === "children" ? typeof a == "string" ? r.textContent !== a && (i.suppressHydrationWarning !== !0 && Er(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && Er(
                r.textContent,
                a,
                e
              ), l = ["children", "" + a]) : Vn.hasOwnProperty(s) && a != null && s === "onScroll" && A("scroll", r);
            }
          switch (n) {
            case "input":
              yr(r), _o(r, i, !0);
              break;
            case "textarea":
              yr(r), Po(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = al);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          s = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Nu(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, { is: r.is }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[Ve] = t, e[bn] = r, Kc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = Fi(n, r), n) {
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
                for (l = 0; l < Rn.length; l++)
                  A(Rn[l], e);
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
                Eo(e, r), l = Li(e, r), A("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Q({}, r, { value: void 0 }), A("invalid", e);
                break;
              case "textarea":
                To(e, r), l = Mi(e, r), A("invalid", e);
                break;
              default:
                l = r;
            }
            Ii(n, l), a = l;
            for (i in a)
              if (a.hasOwnProperty(i)) {
                var u = a[i];
                i === "style" ? Cu(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && ju(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Wn(e, u) : typeof u == "number" && Wn(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Vn.hasOwnProperty(i) ? u != null && i === "onScroll" && A("scroll", e) : u != null && Ts(e, i, u, s));
              }
            switch (n) {
              case "input":
                yr(e), _o(e, r, !1);
                break;
              case "textarea":
                yr(e), Po(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + xt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? rn(e, !!r.multiple, i, !1) : r.defaultValue != null && rn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = al);
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
      return se(t), null;
    case 6:
      if (e && t.stateNode != null)
        Xc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null)
          throw Error(S(166));
        if (n = Rt(tr.current), Rt(Qe.current), _r(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ve] = t, (i = r.nodeValue !== n) && (e = je, e !== null))
            switch (e.tag) {
              case 3:
                Er(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Er(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ve] = t, t.stateNode = r;
      }
      return se(t), null;
    case 13:
      if (U(H), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (B && Ne !== null && t.mode & 1 && !(t.flags & 128))
          fc(), pn(), t.flags |= 98560, i = !1;
        else if (i = _r(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i)
              throw Error(S(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i)
              throw Error(S(317));
            i[Ve] = t;
          } else
            pn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          se(t), i = !1;
        } else
          Fe !== null && (vs(Fe), Fe = null), i = !0;
        if (!i)
          return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || H.current & 1 ? Z === 0 && (Z = 3) : co())), t.updateQueue !== null && (t.flags |= 4), se(t), null);
    case 4:
      return hn(), as(e, t), e === null && Zn(t.stateNode.containerInfo), se(t), null;
    case 10:
      return Ks(t.type._context), se(t), null;
    case 17:
      return ye(t.type) && ul(), se(t), null;
    case 19:
      if (U(H), i = t.memoizedState, i === null)
        return se(t), null;
      if (r = (t.flags & 128) !== 0, s = i.rendering, s === null)
        if (r)
          _n(i, !1);
        else {
          if (Z !== 0 || e !== null && e.flags & 128)
            for (e = t.child; e !== null; ) {
              if (s = vl(e), s !== null) {
                for (t.flags |= 128, _n(i, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; )
                  i = n, e = r, i.flags &= 14680066, s = i.alternate, s === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = s.childLanes, i.lanes = s.lanes, i.child = s.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = s.memoizedProps, i.memoizedState = s.memoizedState, i.updateQueue = s.updateQueue, i.type = s.type, e = s.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
                return $(H, H.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null && Y() > gn && (t.flags |= 128, r = !0, _n(i, !1), t.lanes = 4194304);
        }
      else {
        if (!r)
          if (e = vl(s), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), _n(i, !0), i.tail === null && i.tailMode === "hidden" && !s.alternate && !B)
              return se(t), null;
          } else
            2 * Y() - i.renderingStartTime > gn && n !== 1073741824 && (t.flags |= 128, r = !0, _n(i, !1), t.lanes = 4194304);
        i.isBackwards ? (s.sibling = t.child, t.child = s) : (n = i.last, n !== null ? n.sibling = s : t.child = s, i.last = s);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Y(), t.sibling = null, n = H.current, $(H, r ? n & 1 | 2 : n & 1), t) : (se(t), null);
    case 22:
    case 23:
      return uo(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Se & 1073741824 && (se(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : se(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(S(156, t.tag));
}
function Pp(e, t) {
  switch (Vs(t), t.tag) {
    case 1:
      return ye(t.type) && ul(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return hn(), U(ge), U(ae), Js(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Zs(t), null;
    case 13:
      if (U(H), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(S(340));
        pn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return U(H), null;
    case 4:
      return hn(), null;
    case 10:
      return Ks(t.type._context), null;
    case 22:
    case 23:
      return uo(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Lr = !1, oe = !1, Lp = typeof WeakSet == "function" ? WeakSet : Set, T = null;
function tn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        G(e, t, r);
      }
    else
      n.current = null;
}
function us(e, t, n) {
  try {
    n();
  } catch (r) {
    G(e, t, r);
  }
}
var ya = !1;
function zp(e, t) {
  if (Gi = il, e = bu(), Bs(e)) {
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
          var s = 0, a = -1, u = -1, c = 0, f = 0, h = e, v = null;
          t:
            for (; ; ) {
              for (var x; h !== n || l !== 0 && h.nodeType !== 3 || (a = s + l), h !== i || r !== 0 && h.nodeType !== 3 || (u = s + r), h.nodeType === 3 && (s += h.nodeValue.length), (x = h.firstChild) !== null; )
                v = h, h = x;
              for (; ; ) {
                if (h === e)
                  break t;
                if (v === n && ++c === l && (a = s), v === i && ++f === r && (u = s), (x = h.nextSibling) !== null)
                  break;
                h = v, v = h.parentNode;
              }
              h = x;
            }
          n = a === -1 || u === -1 ? null : { start: a, end: u };
        } else
          n = null;
      }
    n = n || { start: 0, end: 0 };
  } else
    n = null;
  for (Ki = { focusedElem: e, selectionRange: n }, il = !1, T = t; T !== null; )
    if (t = T, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
      e.return = t, T = e;
    else
      for (; T !== null; ) {
        t = T;
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
                  var w = g.memoizedProps, j = g.memoizedState, p = t.stateNode, d = p.getSnapshotBeforeUpdate(t.elementType === t.type ? w : De(t.type, w), j);
                  p.__reactInternalSnapshotBeforeUpdate = d;
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
          G(t, t.return, y);
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, T = e;
          break;
        }
        T = t.return;
      }
  return g = ya, ya = !1, g;
}
function An(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && us(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Ol(e, t) {
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
function cs(e) {
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
function qc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, qc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ve], delete t[bn], delete t[qi], delete t[pp], delete t[mp])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Zc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function wa(e) {
  e:
    for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Zc(e.return))
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
function ds(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = al));
  else if (r !== 4 && (e = e.child, e !== null))
    for (ds(e, t, n), e = e.sibling; e !== null; )
      ds(e, t, n), e = e.sibling;
}
function fs(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null))
    for (fs(e, t, n), e = e.sibling; e !== null; )
      fs(e, t, n), e = e.sibling;
}
var te = null, Ie = !1;
function it(e, t, n) {
  for (n = n.child; n !== null; )
    Jc(e, t, n), n = n.sibling;
}
function Jc(e, t, n) {
  if (We && typeof We.onCommitFiberUnmount == "function")
    try {
      We.onCommitFiberUnmount(Pl, n);
    } catch {
    }
  switch (n.tag) {
    case 5:
      oe || tn(n, t);
    case 6:
      var r = te, l = Ie;
      te = null, it(e, t, n), te = r, Ie = l, te !== null && (Ie ? (e = te, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : te.removeChild(n.stateNode));
      break;
    case 18:
      te !== null && (Ie ? (e = te, n = n.stateNode, e.nodeType === 8 ? ai(e.parentNode, n) : e.nodeType === 1 && ai(e, n), Yn(e)) : ai(te, n.stateNode));
      break;
    case 4:
      r = te, l = Ie, te = n.stateNode.containerInfo, Ie = !0, it(e, t, n), te = r, Ie = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!oe && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, s = i.destroy;
          i = i.tag, s !== void 0 && (i & 2 || i & 4) && us(n, t, s), l = l.next;
        } while (l !== r);
      }
      it(e, t, n);
      break;
    case 1:
      if (!oe && (tn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
        try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (a) {
          G(n, t, a);
        }
      it(e, t, n);
      break;
    case 21:
      it(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (oe = (r = oe) || n.memoizedState !== null, it(e, t, n), oe = r) : it(e, t, n);
      break;
    default:
      it(e, t, n);
  }
}
function xa(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Lp()), t.forEach(function(r) {
      var l = Up.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Me(e, t) {
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
                te = a.stateNode, Ie = !1;
                break e;
              case 3:
                te = a.stateNode.containerInfo, Ie = !0;
                break e;
              case 4:
                te = a.stateNode.containerInfo, Ie = !0;
                break e;
            }
            a = a.return;
          }
        if (te === null)
          throw Error(S(160));
        Jc(i, s, l), te = null, Ie = !1;
        var u = l.alternate;
        u !== null && (u.return = null), l.return = null;
      } catch (c) {
        G(l, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; )
      bc(t, e), t = t.sibling;
}
function bc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Me(t, e), Be(e), r & 4) {
        try {
          An(3, e, e.return), Ol(3, e);
        } catch (w) {
          G(e, e.return, w);
        }
        try {
          An(5, e, e.return);
        } catch (w) {
          G(e, e.return, w);
        }
      }
      break;
    case 1:
      Me(t, e), Be(e), r & 512 && n !== null && tn(n, n.return);
      break;
    case 5:
      if (Me(t, e), Be(e), r & 512 && n !== null && tn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Wn(l, "");
        } catch (w) {
          G(e, e.return, w);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, s = n !== null ? n.memoizedProps : i, a = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null)
          try {
            a === "input" && i.type === "radio" && i.name != null && xu(l, i), Fi(a, s);
            var c = Fi(a, i);
            for (s = 0; s < u.length; s += 2) {
              var f = u[s], h = u[s + 1];
              f === "style" ? Cu(l, h) : f === "dangerouslySetInnerHTML" ? ju(l, h) : f === "children" ? Wn(l, h) : Ts(l, f, h, c);
            }
            switch (a) {
              case "input":
                zi(l, i);
                break;
              case "textarea":
                Su(l, i);
                break;
              case "select":
                var v = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var x = i.value;
                x != null ? rn(l, !!i.multiple, x, !1) : v !== !!i.multiple && (i.defaultValue != null ? rn(
                  l,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                ) : rn(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[bn] = i;
          } catch (w) {
            G(e, e.return, w);
          }
      }
      break;
    case 6:
      if (Me(t, e), Be(e), r & 4) {
        if (e.stateNode === null)
          throw Error(S(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (w) {
          G(e, e.return, w);
        }
      }
      break;
    case 3:
      if (Me(t, e), Be(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        try {
          Yn(t.containerInfo);
        } catch (w) {
          G(e, e.return, w);
        }
      break;
    case 4:
      Me(t, e), Be(e);
      break;
    case 13:
      Me(t, e), Be(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (oo = Y())), r & 4 && xa(e);
      break;
    case 22:
      if (f = n !== null && n.memoizedState !== null, e.mode & 1 ? (oe = (c = oe) || f, Me(t, e), oe = c) : Me(t, e), Be(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !f && e.mode & 1)
          for (T = e, f = e.child; f !== null; ) {
            for (h = T = f; T !== null; ) {
              switch (v = T, x = v.child, v.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  An(4, v, v.return);
                  break;
                case 1:
                  tn(v, v.return);
                  var g = v.stateNode;
                  if (typeof g.componentWillUnmount == "function") {
                    r = v, n = v.return;
                    try {
                      t = r, g.props = t.memoizedProps, g.state = t.memoizedState, g.componentWillUnmount();
                    } catch (w) {
                      G(r, n, w);
                    }
                  }
                  break;
                case 5:
                  tn(v, v.return);
                  break;
                case 22:
                  if (v.memoizedState !== null) {
                    Na(h);
                    continue;
                  }
              }
              x !== null ? (x.return = v, T = x) : Na(h);
            }
            f = f.sibling;
          }
        e:
          for (f = null, h = e; ; ) {
            if (h.tag === 5) {
              if (f === null) {
                f = h;
                try {
                  l = h.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = h.stateNode, u = h.memoizedProps.style, s = u != null && u.hasOwnProperty("display") ? u.display : null, a.style.display = ku("display", s));
                } catch (w) {
                  G(e, e.return, w);
                }
              }
            } else if (h.tag === 6) {
              if (f === null)
                try {
                  h.stateNode.nodeValue = c ? "" : h.memoizedProps;
                } catch (w) {
                  G(e, e.return, w);
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
              f === h && (f = null), h = h.return;
            }
            f === h && (f = null), h.sibling.return = h.return, h = h.sibling;
          }
      }
      break;
    case 19:
      Me(t, e), Be(e), r & 4 && xa(e);
      break;
    case 21:
      break;
    default:
      Me(
        t,
        e
      ), Be(e);
  }
}
function Be(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Zc(n)) {
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
          r.flags & 32 && (Wn(l, ""), r.flags &= -33);
          var i = wa(e);
          fs(e, i, l);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo, a = wa(e);
          ds(e, a, s);
          break;
        default:
          throw Error(S(161));
      }
    } catch (u) {
      G(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Rp(e, t, n) {
  T = e, ed(e);
}
function ed(e, t, n) {
  for (var r = (e.mode & 1) !== 0; T !== null; ) {
    var l = T, i = l.child;
    if (l.tag === 22 && r) {
      var s = l.memoizedState !== null || Lr;
      if (!s) {
        var a = l.alternate, u = a !== null && a.memoizedState !== null || oe;
        a = Lr;
        var c = oe;
        if (Lr = s, (oe = u) && !c)
          for (T = l; T !== null; )
            s = T, u = s.child, s.tag === 22 && s.memoizedState !== null ? ja(l) : u !== null ? (u.return = s, T = u) : ja(l);
        for (; i !== null; )
          T = i, ed(i), i = i.sibling;
        T = l, Lr = a, oe = c;
      }
      Sa(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? (i.return = l, T = i) : Sa(e);
  }
}
function Sa(e) {
  for (; T !== null; ) {
    var t = T;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              oe || Ol(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !oe)
                if (n === null)
                  r.componentDidMount();
                else {
                  var l = t.elementType === t.type ? n.memoizedProps : De(t.type, n.memoizedProps);
                  r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var i = t.updateQueue;
              i !== null && la(t, i, r);
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
                la(t, s, n);
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
                  var f = c.memoizedState;
                  if (f !== null) {
                    var h = f.dehydrated;
                    h !== null && Yn(h);
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
        oe || t.flags & 512 && cs(t);
      } catch (v) {
        G(t, t.return, v);
      }
    }
    if (t === e) {
      T = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, T = n;
      break;
    }
    T = t.return;
  }
}
function Na(e) {
  for (; T !== null; ) {
    var t = T;
    if (t === e) {
      T = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, T = n;
      break;
    }
    T = t.return;
  }
}
function ja(e) {
  for (; T !== null; ) {
    var t = T;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ol(4, t);
          } catch (u) {
            G(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              G(t, l, u);
            }
          }
          var i = t.return;
          try {
            cs(t);
          } catch (u) {
            G(t, i, u);
          }
          break;
        case 5:
          var s = t.return;
          try {
            cs(t);
          } catch (u) {
            G(t, s, u);
          }
      }
    } catch (u) {
      G(t, t.return, u);
    }
    if (t === e) {
      T = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, T = a;
      break;
    }
    T = t.return;
  }
}
var Mp = Math.ceil, wl = rt.ReactCurrentDispatcher, io = rt.ReactCurrentOwner, Le = rt.ReactCurrentBatchConfig, I = 0, ee = null, X = null, re = 0, Se = 0, nn = jt(0), Z = 0, ir = null, $t = 0, $l = 0, so = 0, Un = null, he = null, oo = 0, gn = 1 / 0, Ke = null, xl = !1, ps = null, gt = null, zr = !1, dt = null, Sl = 0, Bn = 0, ms = null, qr = -1, Zr = 0;
function de() {
  return I & 6 ? Y() : qr !== -1 ? qr : qr = Y();
}
function yt(e) {
  return e.mode & 1 ? I & 2 && re !== 0 ? re & -re : vp.transition !== null ? (Zr === 0 && (Zr = Ou()), Zr) : (e = F, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Wu(e.type)), e) : 1;
}
function $e(e, t, n, r) {
  if (50 < Bn)
    throw Bn = 0, ms = null, Error(S(185));
  ar(e, n, r), (!(I & 2) || e !== ee) && (e === ee && (!(I & 2) && ($l |= n), Z === 4 && ut(e, re)), we(e, r), n === 1 && I === 0 && !(t.mode & 1) && (gn = Y() + 500, Dl && kt()));
}
function we(e, t) {
  var n = e.callbackNode;
  vf(e, t);
  var r = ll(e, e === ee ? re : 0);
  if (r === 0)
    n !== null && Ro(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Ro(n), t === 1)
      e.tag === 0 ? hp(ka.bind(null, e)) : uc(ka.bind(null, e)), dp(function() {
        !(I & 6) && kt();
      }), n = null;
    else {
      switch ($u(r)) {
        case 1:
          n = Ms;
          break;
        case 4:
          n = Iu;
          break;
        case 16:
          n = rl;
          break;
        case 536870912:
          n = Fu;
          break;
        default:
          n = rl;
      }
      n = ad(n, td.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function td(e, t) {
  if (qr = -1, Zr = 0, I & 6)
    throw Error(S(327));
  var n = e.callbackNode;
  if (un() && e.callbackNode !== n)
    return null;
  var r = ll(e, e === ee ? re : 0);
  if (r === 0)
    return null;
  if (r & 30 || r & e.expiredLanes || t)
    t = Nl(e, r);
  else {
    t = r;
    var l = I;
    I |= 2;
    var i = rd();
    (ee !== e || re !== t) && (Ke = null, gn = Y() + 500, Mt(e, t));
    do
      try {
        Fp();
        break;
      } catch (a) {
        nd(e, a);
      }
    while (!0);
    Gs(), wl.current = i, I = l, X !== null ? t = 0 : (ee = null, re = 0, t = Z);
  }
  if (t !== 0) {
    if (t === 2 && (l = Bi(e), l !== 0 && (r = l, t = hs(e, l))), t === 1)
      throw n = ir, Mt(e, 0), ut(e, r), we(e, Y()), n;
    if (t === 6)
      ut(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Dp(l) && (t = Nl(e, r), t === 2 && (i = Bi(e), i !== 0 && (r = i, t = hs(e, i))), t === 1))
        throw n = ir, Mt(e, 0), ut(e, r), we(e, Y()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(S(345));
        case 2:
          Pt(e, he, Ke);
          break;
        case 3:
          if (ut(e, r), (r & 130023424) === r && (t = oo + 500 - Y(), 10 < t)) {
            if (ll(e, 0) !== 0)
              break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              de(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Xi(Pt.bind(null, e, he, Ke), t);
            break;
          }
          Pt(e, he, Ke);
          break;
        case 4:
          if (ut(e, r), (r & 4194240) === r)
            break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var s = 31 - Oe(r);
            i = 1 << s, s = t[s], s > l && (l = s), r &= ~i;
          }
          if (r = l, r = Y() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Mp(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Xi(Pt.bind(null, e, he, Ke), r);
            break;
          }
          Pt(e, he, Ke);
          break;
        case 5:
          Pt(e, he, Ke);
          break;
        default:
          throw Error(S(329));
      }
    }
  }
  return we(e, Y()), e.callbackNode === n ? td.bind(null, e) : null;
}
function hs(e, t) {
  var n = Un;
  return e.current.memoizedState.isDehydrated && (Mt(e, t).flags |= 256), e = Nl(e, t), e !== 2 && (t = he, he = n, t !== null && vs(t)), e;
}
function vs(e) {
  he === null ? he = e : he.push.apply(he, e);
}
function Dp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r], i = l.getSnapshot;
          l = l.value;
          try {
            if (!Ae(i(), l))
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
function ut(e, t) {
  for (t &= ~so, t &= ~$l, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Oe(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ka(e) {
  if (I & 6)
    throw Error(S(327));
  un();
  var t = ll(e, 0);
  if (!(t & 1))
    return we(e, Y()), null;
  var n = Nl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Bi(e);
    r !== 0 && (t = r, n = hs(e, r));
  }
  if (n === 1)
    throw n = ir, Mt(e, 0), ut(e, t), we(e, Y()), n;
  if (n === 6)
    throw Error(S(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Pt(e, he, Ke), we(e, Y()), null;
}
function ao(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    I = n, I === 0 && (gn = Y() + 500, Dl && kt());
  }
}
function At(e) {
  dt !== null && dt.tag === 0 && !(I & 6) && un();
  var t = I;
  I |= 1;
  var n = Le.transition, r = F;
  try {
    if (Le.transition = null, F = 1, e)
      return e();
  } finally {
    F = r, Le.transition = n, I = t, !(I & 6) && kt();
  }
}
function uo() {
  Se = nn.current, U(nn);
}
function Mt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, cp(n)), X !== null)
    for (n = X.return; n !== null; ) {
      var r = n;
      switch (Vs(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && ul();
          break;
        case 3:
          hn(), U(ge), U(ae), Js();
          break;
        case 5:
          Zs(r);
          break;
        case 4:
          hn();
          break;
        case 13:
          U(H);
          break;
        case 19:
          U(H);
          break;
        case 10:
          Ks(r.type._context);
          break;
        case 22:
        case 23:
          uo();
      }
      n = n.return;
    }
  if (ee = e, X = e = wt(e.current, null), re = Se = t, Z = 0, ir = null, so = $l = $t = 0, he = Un = null, zt !== null) {
    for (t = 0; t < zt.length; t++)
      if (n = zt[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var l = r.next, i = n.pending;
        if (i !== null) {
          var s = i.next;
          i.next = l, r.next = s;
        }
        n.pending = r;
      }
    zt = null;
  }
  return e;
}
function nd(e, t) {
  do {
    var n = X;
    try {
      if (Gs(), Kr.current = yl, gl) {
        for (var r = W.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        gl = !1;
      }
      if (Ot = 0, b = q = W = null, $n = !1, nr = 0, io.current = null, n === null || n.return === null) {
        Z = 1, ir = t, X = null;
        break;
      }
      e: {
        var i = e, s = n.return, a = n, u = t;
        if (t = re, a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, f = a, h = f.tag;
          if (!(f.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var v = f.alternate;
            v ? (f.updateQueue = v.updateQueue, f.memoizedState = v.memoizedState, f.lanes = v.lanes) : (f.updateQueue = null, f.memoizedState = null);
          }
          var x = da(s);
          if (x !== null) {
            x.flags &= -257, fa(x, s, a, i, t), x.mode & 1 && ca(i, c, t), t = x, u = c;
            var g = t.updateQueue;
            if (g === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(u), t.updateQueue = w;
            } else
              g.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              ca(i, c, t), co();
              break e;
            }
            u = Error(S(426));
          }
        } else if (B && a.mode & 1) {
          var j = da(s);
          if (j !== null) {
            !(j.flags & 65536) && (j.flags |= 256), fa(j, s, a, i, t), Ws(vn(u, a));
            break e;
          }
        }
        i = u = vn(u, a), Z !== 4 && (Z = 2), Un === null ? Un = [i] : Un.push(i), i = s;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var p = Ac(i, u, t);
              ra(i, p);
              break e;
            case 1:
              a = u;
              var d = i.type, m = i.stateNode;
              if (!(i.flags & 128) && (typeof d.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (gt === null || !gt.has(m)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var y = Uc(i, a, t);
                ra(i, y);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      id(n);
    } catch (N) {
      t = N, X === n && n !== null && (X = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function rd() {
  var e = wl.current;
  return wl.current = yl, e === null ? yl : e;
}
function co() {
  (Z === 0 || Z === 3 || Z === 2) && (Z = 4), ee === null || !($t & 268435455) && !($l & 268435455) || ut(ee, re);
}
function Nl(e, t) {
  var n = I;
  I |= 2;
  var r = rd();
  (ee !== e || re !== t) && (Ke = null, Mt(e, t));
  do
    try {
      Ip();
      break;
    } catch (l) {
      nd(e, l);
    }
  while (!0);
  if (Gs(), I = n, wl.current = r, X !== null)
    throw Error(S(261));
  return ee = null, re = 0, Z;
}
function Ip() {
  for (; X !== null; )
    ld(X);
}
function Fp() {
  for (; X !== null && !of(); )
    ld(X);
}
function ld(e) {
  var t = od(e.alternate, e, Se);
  e.memoizedProps = e.pendingProps, t === null ? id(e) : X = t, io.current = null;
}
function id(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Pp(n, t), n !== null) {
        n.flags &= 32767, X = n;
        return;
      }
      if (e !== null)
        e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Z = 6, X = null;
        return;
      }
    } else if (n = Tp(n, t, Se), n !== null) {
      X = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      X = t;
      return;
    }
    X = t = e;
  } while (t !== null);
  Z === 0 && (Z = 5);
}
function Pt(e, t, n) {
  var r = F, l = Le.transition;
  try {
    Le.transition = null, F = 1, Op(e, t, n, r);
  } finally {
    Le.transition = l, F = r;
  }
  return null;
}
function Op(e, t, n, r) {
  do
    un();
  while (dt !== null);
  if (I & 6)
    throw Error(S(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null)
    return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current)
    throw Error(S(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (gf(e, i), e === ee && (X = ee = null, re = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || zr || (zr = !0, ad(rl, function() {
    return un(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Le.transition, Le.transition = null;
    var s = F;
    F = 1;
    var a = I;
    I |= 4, io.current = null, zp(e, n), bc(n, e), rp(Ki), il = !!Gi, Ki = Gi = null, e.current = n, Rp(n), af(), I = a, F = s, Le.transition = i;
  } else
    e.current = n;
  if (zr && (zr = !1, dt = e, Sl = l), i = e.pendingLanes, i === 0 && (gt = null), df(n.stateNode), we(e, Y()), t !== null)
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (xl)
    throw xl = !1, e = ps, ps = null, e;
  return Sl & 1 && e.tag !== 0 && un(), i = e.pendingLanes, i & 1 ? e === ms ? Bn++ : (Bn = 0, ms = e) : Bn = 0, kt(), null;
}
function un() {
  if (dt !== null) {
    var e = $u(Sl), t = Le.transition, n = F;
    try {
      if (Le.transition = null, F = 16 > e ? 16 : e, dt === null)
        var r = !1;
      else {
        if (e = dt, dt = null, Sl = 0, I & 6)
          throw Error(S(331));
        var l = I;
        for (I |= 4, T = e.current; T !== null; ) {
          var i = T, s = i.child;
          if (T.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var c = a[u];
                for (T = c; T !== null; ) {
                  var f = T;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      An(8, f, i);
                  }
                  var h = f.child;
                  if (h !== null)
                    h.return = f, T = h;
                  else
                    for (; T !== null; ) {
                      f = T;
                      var v = f.sibling, x = f.return;
                      if (qc(f), f === c) {
                        T = null;
                        break;
                      }
                      if (v !== null) {
                        v.return = x, T = v;
                        break;
                      }
                      T = x;
                    }
                }
              }
              var g = i.alternate;
              if (g !== null) {
                var w = g.child;
                if (w !== null) {
                  g.child = null;
                  do {
                    var j = w.sibling;
                    w.sibling = null, w = j;
                  } while (w !== null);
                }
              }
              T = i;
            }
          }
          if (i.subtreeFlags & 2064 && s !== null)
            s.return = i, T = s;
          else
            e:
              for (; T !== null; ) {
                if (i = T, i.flags & 2048)
                  switch (i.tag) {
                    case 0:
                    case 11:
                    case 15:
                      An(9, i, i.return);
                  }
                var p = i.sibling;
                if (p !== null) {
                  p.return = i.return, T = p;
                  break e;
                }
                T = i.return;
              }
        }
        var d = e.current;
        for (T = d; T !== null; ) {
          s = T;
          var m = s.child;
          if (s.subtreeFlags & 2064 && m !== null)
            m.return = s, T = m;
          else
            e:
              for (s = d; T !== null; ) {
                if (a = T, a.flags & 2048)
                  try {
                    switch (a.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ol(9, a);
                    }
                  } catch (N) {
                    G(a, a.return, N);
                  }
                if (a === s) {
                  T = null;
                  break e;
                }
                var y = a.sibling;
                if (y !== null) {
                  y.return = a.return, T = y;
                  break e;
                }
                T = a.return;
              }
        }
        if (I = l, kt(), We && typeof We.onPostCommitFiberRoot == "function")
          try {
            We.onPostCommitFiberRoot(Pl, e);
          } catch {
          }
        r = !0;
      }
      return r;
    } finally {
      F = n, Le.transition = t;
    }
  }
  return !1;
}
function Ca(e, t, n) {
  t = vn(n, t), t = Ac(e, t, 1), e = vt(e, t, 1), t = de(), e !== null && (ar(e, 1, t), we(e, t));
}
function G(e, t, n) {
  if (e.tag === 3)
    Ca(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Ca(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (gt === null || !gt.has(r))) {
          e = vn(n, e), e = Uc(t, e, 1), t = vt(t, e, 1), e = de(), t !== null && (ar(t, 1, e), we(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function $p(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = de(), e.pingedLanes |= e.suspendedLanes & n, ee === e && (re & n) === n && (Z === 4 || Z === 3 && (re & 130023424) === re && 500 > Y() - oo ? Mt(e, 0) : so |= n), we(e, t);
}
function sd(e, t) {
  t === 0 && (e.mode & 1 ? (t = Sr, Sr <<= 1, !(Sr & 130023424) && (Sr = 4194304)) : t = 1);
  var n = de();
  e = tt(e, t), e !== null && (ar(e, t, n), we(e, n));
}
function Ap(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), sd(e, n);
}
function Up(e, t) {
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
  r !== null && r.delete(t), sd(e, n);
}
var od;
od = function(e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || ge.current)
      ve = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128))
        return ve = !1, _p(e, t, n);
      ve = !!(e.flags & 131072);
    }
  else
    ve = !1, B && t.flags & 1048576 && cc(t, fl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Xr(e, t), e = t.pendingProps;
      var l = fn(t, ae.current);
      an(t, n), l = eo(null, t, r, e, l, n);
      var i = to();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ye(r) ? (i = !0, cl(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Xs(t), l.updater = Il, t.stateNode = l, l._reactInternals = t, ns(t, r, e, n), t = is(null, t, r, !0, i, n)) : (t.tag = 0, B && i && Hs(t), ce(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Xr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Hp(r), e = De(r, e), l) {
          case 0:
            t = ls(null, t, r, e, n);
            break e;
          case 1:
            t = ha(null, t, r, e, n);
            break e;
          case 11:
            t = pa(null, t, r, e, n);
            break e;
          case 14:
            t = ma(null, t, r, De(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), ls(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), ha(e, t, r, l, n);
    case 3:
      e: {
        if (Wc(t), e === null)
          throw Error(S(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, mc(e, t), hl(t, r, null, n);
        var s = t.memoizedState;
        if (r = s.element, i.isDehydrated)
          if (i = { element: r, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
            l = vn(Error(S(423)), t), t = va(e, t, r, n, l);
            break e;
          } else if (r !== l) {
            l = vn(Error(S(424)), t), t = va(e, t, r, n, l);
            break e;
          } else
            for (Ne = ht(t.stateNode.containerInfo.firstChild), je = t, B = !0, Fe = null, n = yc(t, null, r, n), t.child = n; n; )
              n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (pn(), r === l) {
            t = nt(e, t, n);
            break e;
          }
          ce(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return wc(t), e === null && bi(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, s = l.children, Yi(r, l) ? s = null : i !== null && Yi(r, i) && (t.flags |= 32), Vc(e, t), ce(e, t, s, n), t.child;
    case 6:
      return e === null && bi(t), null;
    case 13:
      return Qc(e, t, n);
    case 4:
      return qs(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = mn(t, null, r, n) : ce(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), pa(e, t, r, l, n);
    case 7:
      return ce(e, t, t.pendingProps, n), t.child;
    case 8:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, s = l.value, $(pl, r._currentValue), r._currentValue = s, i !== null)
          if (Ae(i.value, s)) {
            if (i.children === l.children && !ge.current) {
              t = nt(e, t, n);
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
                      u = Je(-1, n & -n), u.tag = 2;
                      var c = i.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var f = c.pending;
                        f === null ? u.next = u : (u.next = f.next, f.next = u), c.pending = u;
                      }
                    }
                    i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), es(
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
                s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), es(s, n, t), s = i.sibling;
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
        ce(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, an(t, n), l = ze(l), r = r(l), t.flags |= 1, ce(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = De(r, t.pendingProps), l = De(r.type, l), ma(e, t, r, l, n);
    case 15:
      return Bc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), Xr(e, t), t.tag = 1, ye(r) ? (e = !0, cl(t)) : e = !1, an(t, n), vc(t, r, l), ns(t, r, l, n), is(null, t, r, !0, e, n);
    case 19:
      return Gc(e, t, n);
    case 22:
      return Hc(e, t, n);
  }
  throw Error(S(156, t.tag));
};
function ad(e, t) {
  return Du(e, t);
}
function Bp(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Pe(e, t, n, r) {
  return new Bp(e, t, n, r);
}
function fo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Hp(e) {
  if (typeof e == "function")
    return fo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Ls)
      return 11;
    if (e === zs)
      return 14;
  }
  return 2;
}
function wt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Pe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Jr(e, t, n, r, l, i) {
  var s = 2;
  if (r = e, typeof e == "function")
    fo(e) && (s = 1);
  else if (typeof e == "string")
    s = 5;
  else
    e:
      switch (e) {
        case Gt:
          return Dt(n.children, l, i, t);
        case Ps:
          s = 8, l |= 8;
          break;
        case Ei:
          return e = Pe(12, n, t, l | 2), e.elementType = Ei, e.lanes = i, e;
        case _i:
          return e = Pe(13, n, t, l), e.elementType = _i, e.lanes = i, e;
        case Ti:
          return e = Pe(19, n, t, l), e.elementType = Ti, e.lanes = i, e;
        case gu:
          return Al(n, l, i, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case hu:
                s = 10;
                break e;
              case vu:
                s = 9;
                break e;
              case Ls:
                s = 11;
                break e;
              case zs:
                s = 14;
                break e;
              case st:
                s = 16, r = null;
                break e;
            }
          throw Error(S(130, e == null ? e : typeof e, ""));
      }
  return t = Pe(s, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Dt(e, t, n, r) {
  return e = Pe(7, e, r, t), e.lanes = n, e;
}
function Al(e, t, n, r) {
  return e = Pe(22, e, r, t), e.elementType = gu, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function vi(e, t, n) {
  return e = Pe(6, e, null, t), e.lanes = n, e;
}
function gi(e, t, n) {
  return t = Pe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Vp(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Zl(0), this.expirationTimes = Zl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Zl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function po(e, t, n, r, l, i, s, a, u) {
  return e = new Vp(e, t, n, a, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Pe(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Xs(i), e;
}
function Wp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Qt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function ud(e) {
  if (!e)
    return St;
  e = e._reactInternals;
  e: {
    if (Bt(e) !== e || e.tag !== 1)
      throw Error(S(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ye(t.type)) {
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
    if (ye(n))
      return ac(e, n, t);
  }
  return t;
}
function cd(e, t, n, r, l, i, s, a, u) {
  return e = po(n, r, !0, e, l, i, s, a, u), e.context = ud(null), n = e.current, r = de(), l = yt(n), i = Je(r, l), i.callback = t ?? null, vt(n, i, l), e.current.lanes = l, ar(e, l, r), we(e, r), e;
}
function Ul(e, t, n, r) {
  var l = t.current, i = de(), s = yt(l);
  return n = ud(n), t.context === null ? t.context = n : t.pendingContext = n, t = Je(i, s), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = vt(l, t, s), e !== null && ($e(e, l, s, i), Gr(e, l, s)), s;
}
function jl(e) {
  if (e = e.current, !e.child)
    return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ea(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function mo(e, t) {
  Ea(e, t), (e = e.alternate) && Ea(e, t);
}
function Qp() {
  return null;
}
var dd = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function ho(e) {
  this._internalRoot = e;
}
Bl.prototype.render = ho.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null)
    throw Error(S(409));
  Ul(e, t, null, null);
};
Bl.prototype.unmount = ho.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    At(function() {
      Ul(null, e, null, null);
    }), t[et] = null;
  }
};
function Bl(e) {
  this._internalRoot = e;
}
Bl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Bu();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < at.length && t !== 0 && t < at[n].priority; n++)
      ;
    at.splice(n, 0, e), n === 0 && Vu(e);
  }
};
function vo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Hl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function _a() {
}
function Gp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = jl(s);
        i.call(c);
      };
    }
    var s = cd(t, r, e, 0, null, !1, !1, "", _a);
    return e._reactRootContainer = s, e[et] = s.current, Zn(e.nodeType === 8 ? e.parentNode : e), At(), s;
  }
  for (; l = e.lastChild; )
    e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var c = jl(u);
      a.call(c);
    };
  }
  var u = po(e, 0, !1, null, null, !1, !1, "", _a);
  return e._reactRootContainer = u, e[et] = u.current, Zn(e.nodeType === 8 ? e.parentNode : e), At(function() {
    Ul(t, u, n, r);
  }), u;
}
function Vl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var s = i;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var u = jl(s);
        a.call(u);
      };
    }
    Ul(t, s, e, l);
  } else
    s = Gp(n, t, e, l, r);
  return jl(s);
}
Au = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = zn(t.pendingLanes);
        n !== 0 && (Ds(t, n | 1), we(t, Y()), !(I & 6) && (gn = Y() + 500, kt()));
      }
      break;
    case 13:
      At(function() {
        var r = tt(e, 1);
        if (r !== null) {
          var l = de();
          $e(r, e, 1, l);
        }
      }), mo(e, 1);
  }
};
Is = function(e) {
  if (e.tag === 13) {
    var t = tt(e, 134217728);
    if (t !== null) {
      var n = de();
      $e(t, e, 134217728, n);
    }
    mo(e, 134217728);
  }
};
Uu = function(e) {
  if (e.tag === 13) {
    var t = yt(e), n = tt(e, t);
    if (n !== null) {
      var r = de();
      $e(n, e, t, r);
    }
    mo(e, t);
  }
};
Bu = function() {
  return F;
};
Hu = function(e, t) {
  var n = F;
  try {
    return F = e, t();
  } finally {
    F = n;
  }
};
$i = function(e, t, n) {
  switch (t) {
    case "input":
      if (zi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; )
          n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Ml(r);
            if (!l)
              throw Error(S(90));
            wu(r), zi(r, l);
          }
        }
      }
      break;
    case "textarea":
      Su(e, n);
      break;
    case "select":
      t = n.value, t != null && rn(e, !!n.multiple, t, !1);
  }
};
Tu = ao;
Pu = At;
var Kp = { usingClientEntryPoint: !1, Events: [cr, qt, Ml, Eu, _u, ao] }, Tn = { findFiberByHostInstance: Lt, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, Yp = { bundleType: Tn.bundleType, version: Tn.version, rendererPackageName: Tn.rendererPackageName, rendererConfig: Tn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: rt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ru(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Tn.findFiberByHostInstance || Qp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Rr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Rr.isDisabled && Rr.supportsFiber)
    try {
      Pl = Rr.inject(Yp), We = Rr;
    } catch {
    }
}
Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Kp;
Ce.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!vo(t))
    throw Error(S(200));
  return Wp(e, t, null, n);
};
Ce.createRoot = function(e, t) {
  if (!vo(e))
    throw Error(S(299));
  var n = !1, r = "", l = dd;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = po(e, 1, !1, null, null, n, !1, r, l), e[et] = t.current, Zn(e.nodeType === 8 ? e.parentNode : e), new ho(t);
};
Ce.findDOMNode = function(e) {
  if (e == null)
    return null;
  if (e.nodeType === 1)
    return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(S(188)) : (e = Object.keys(e).join(","), Error(S(268, e)));
  return e = Ru(t), e = e === null ? null : e.stateNode, e;
};
Ce.flushSync = function(e) {
  return At(e);
};
Ce.hydrate = function(e, t, n) {
  if (!Hl(t))
    throw Error(S(200));
  return Vl(null, e, t, !0, n);
};
Ce.hydrateRoot = function(e, t, n) {
  if (!vo(e))
    throw Error(S(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", s = dd;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = cd(t, null, e, 1, n ?? null, l, !1, i, s), e[et] = t.current, Zn(e), r)
    for (e = 0; e < r.length; e++)
      n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
        n,
        l
      );
  return new Bl(t);
};
Ce.render = function(e, t, n) {
  if (!Hl(t))
    throw Error(S(200));
  return Vl(null, e, t, !1, n);
};
Ce.unmountComponentAtNode = function(e) {
  if (!Hl(e))
    throw Error(S(40));
  return e._reactRootContainer ? (At(function() {
    Vl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[et] = null;
    });
  }), !0) : !1;
};
Ce.unstable_batchedUpdates = ao;
Ce.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Hl(n))
    throw Error(S(200));
  if (e == null || e._reactInternals === void 0)
    throw Error(S(38));
  return Vl(e, t, n, !1, r);
};
Ce.version = "18.2.0-next-9e3b772b8-20220608";
function fd() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(fd);
    } catch (e) {
      console.error(e);
    }
}
fd(), cu.exports = Ce;
var Xp = cu.exports, Ta = Xp;
ki.createRoot = Ta.createRoot, ki.hydrateRoot = Ta.hydrateRoot;
const Pa = ["Tutti", "P", "D", "C", "A"], gs = {
  P: "Portiere",
  D: "Difensore",
  C: "Centrocampista",
  A: "Attaccante",
  U: "Altro"
}, La = {
  P: 1,
  D: 2,
  C: 3,
  A: 4,
  U: 5
}, kl = {
  P: "lf-role-badge lf-role-badge--p",
  D: "lf-role-badge lf-role-badge--d",
  C: "lf-role-badge lf-role-badge--c",
  A: "lf-role-badge lf-role-badge--a",
  U: "lf-role-badge lf-role-badge--u"
}, lt = (e) => ({
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
function qp({ size: e = 24, ...t }) {
  return /* @__PURE__ */ o.jsxs("svg", { ...lt(e), ...t, children: [
    /* @__PURE__ */ o.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ o.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
    /* @__PURE__ */ o.jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
  ] });
}
function za({ size: e = 20, ...t }) {
  return /* @__PURE__ */ o.jsxs("svg", { ...lt(e), ...t, children: [
    /* @__PURE__ */ o.jsx("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ o.jsx("path", { d: "m21 21-4.3-4.3" })
  ] });
}
function Zp({ size: e = 20, ...t }) {
  return /* @__PURE__ */ o.jsxs("svg", { ...lt(e), ...t, children: [
    /* @__PURE__ */ o.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ o.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ o.jsx("path", { d: "m17 8 5 5" }),
    /* @__PURE__ */ o.jsx("path", { d: "m22 8-5 5" })
  ] });
}
function pd({ size: e = 20, ...t }) {
  return /* @__PURE__ */ o.jsxs("svg", { ...lt(e), ...t, children: [
    /* @__PURE__ */ o.jsx("path", { d: "M18 6 6 18" }),
    /* @__PURE__ */ o.jsx("path", { d: "m6 6 12 12" })
  ] });
}
function Xe({ size: e = 18, ...t }) {
  return /* @__PURE__ */ o.jsx("svg", { ...lt(e), ...t, children: /* @__PURE__ */ o.jsx("path", { d: "m6 9 6 6 6-6" }) });
}
function Jp({ size: e = 16, ...t }) {
  return /* @__PURE__ */ o.jsx("svg", { ...lt(e), ...t, children: /* @__PURE__ */ o.jsx("path", { d: "m18 15-6-6-6 6" }) });
}
function Cl({ size: e = 24, ...t }) {
  return /* @__PURE__ */ o.jsx("svg", { ...lt(e), ...t, children: /* @__PURE__ */ o.jsx("path", { d: "M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" }) });
}
function bp({ size: e = 18, ...t }) {
  return /* @__PURE__ */ o.jsxs("svg", { ...lt(e), ...t, children: [
    /* @__PURE__ */ o.jsx("circle", { cx: "8", cy: "8", r: "6" }),
    /* @__PURE__ */ o.jsx("path", { d: "M18.1 8.4A6 6 0 1 1 8.4 18.1" }),
    /* @__PURE__ */ o.jsx("path", { d: "M6 8h4M8 6v4" })
  ] });
}
function em({ size: e = 18, ...t }) {
  return /* @__PURE__ */ o.jsxs("svg", { ...lt(e), ...t, children: [
    /* @__PURE__ */ o.jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12 8v4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12 16h.01" })
  ] });
}
function tm(e) {
  return e.split(/\s+-\s+/).map((t) => t.trim()).filter(Boolean);
}
function Ra({ asset: e, expanded: t, onToggle: n }) {
  const r = tm(e.displayName);
  return /* @__PURE__ */ o.jsxs("div", { children: [
    /* @__PURE__ */ o.jsxs("button", { type: "button", onClick: n, className: "tw-hidden tw-w-full tw-grid-cols-12 tw-gap-4 tw-px-6 tw-py-4 tw-text-left tw-transition hover:tw-bg-slate-50 md:tw-grid", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "tw-col-span-4 tw-flex tw-min-w-0 tw-items-center tw-gap-3", children: [
        /* @__PURE__ */ o.jsx("div", { className: "lf-player-avatar", children: /* @__PURE__ */ o.jsx(Cl, { size: 22 }) }),
        /* @__PURE__ */ o.jsxs("div", { className: "tw-min-w-0", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "tw-truncate tw-font-semibold tw-text-slate-900", children: [
            "Blocco ",
            e.realTeam || e.displayName
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-slate-500", children: [
            r.length,
            " portieri",
            /* @__PURE__ */ o.jsx(Xe, { size: 15, className: `tw-transition ${t ? "tw-rotate-180" : ""}` })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center", children: /* @__PURE__ */ o.jsx("span", { className: "lf-role-badge lf-role-badge--p", children: "Portiere" }) }),
      /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center tw-text-xl tw-font-black tw-text-slate-900", children: e.quotation || "—" }),
      /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center tw-text-lg tw-font-bold tw-text-[var(--primary)]", children: e.purchasePrice || "—" }),
      /* @__PURE__ */ o.jsx("div", { className: `tw-col-span-2 tw-flex tw-items-center tw-truncate tw-text-sm ${e.ownerTag ? "tw-text-slate-600" : "tw-italic tw-text-slate-400"}`, children: e.ownerTag || "Svincolato" })
    ] }),
    /* @__PURE__ */ o.jsxs("button", { type: "button", onClick: n, className: "tw-flex tw-w-full tw-items-start tw-gap-3 tw-p-3 tw-text-left tw-transition hover:tw-bg-slate-50 md:tw-hidden", children: [
      /* @__PURE__ */ o.jsx("div", { className: "lf-player-avatar lf-player-avatar--mobile", children: /* @__PURE__ */ o.jsx(Cl, { size: 22 }) }),
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
          /* @__PURE__ */ o.jsx(Xe, { size: 14, className: `tw-transition ${t ? "tw-rotate-180" : ""}` })
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
function nm(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function rm({ player: e }) {
  return /* @__PURE__ */ o.jsxs("div", { className: "tw-group tw-grid tw-grid-cols-12 tw-gap-4 tw-px-6 tw-py-4 tw-transition hover:tw-bg-slate-50", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "tw-col-span-4 tw-flex tw-min-w-0 tw-items-center tw-gap-3", children: [
      /* @__PURE__ */ o.jsx("div", { className: "lf-player-avatar", "aria-hidden": "true", children: nm(e.displayName) }),
      /* @__PURE__ */ o.jsxs("div", { className: "tw-min-w-0", children: [
        /* @__PURE__ */ o.jsxs("div", { className: `tw-truncate tw-font-semibold tw-transition group-hover:tw-text-[var(--primary)] ${e.active ? "tw-text-slate-900" : "tw-italic tw-text-slate-400"}`, children: [
          e.displayName,
          !e.active && " *"
        ] }),
        /* @__PURE__ */ o.jsx("div", { className: "tw-truncate tw-text-sm tw-text-slate-500", children: e.realTeam || "—" })
      ] })
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center", children: /* @__PURE__ */ o.jsx("span", { className: kl[e.role] ?? kl.U, children: gs[e.role] ?? "?" }) }),
    /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ o.jsx("span", { className: "tw-text-xl tw-font-black tw-text-slate-900", children: e.quotation || "—" }) }),
    /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ o.jsx("span", { className: e.purchasePrice ? "tw-text-lg tw-font-bold tw-text-[var(--primary)]" : "tw-text-slate-400", children: e.purchasePrice || "—" }) }),
    /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-min-w-0", children: /* @__PURE__ */ o.jsx("span", { className: `tw-truncate tw-text-sm ${e.ownerTag ? "tw-text-slate-600" : "tw-italic tw-text-slate-400"}`, children: e.ownerTag || "Svincolato" }) })
  ] });
}
function lm({
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
      /* @__PURE__ */ o.jsx("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Pa.map((f) => /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          onClick: () => s(f),
          className: `lf-role-pill ${n === f ? "lf-role-pill--active" : ""}`,
          children: f === "Tutti" ? "Tutti" : gs[f]
        },
        f
      )) }),
      /* @__PURE__ */ o.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ o.jsxs("label", { className: "lf-select-wrap", children: [
          /* @__PURE__ */ o.jsx("span", { "aria-hidden": "true", children: "🏟️" }),
          /* @__PURE__ */ o.jsxs("select", { value: r, onChange: (f) => a(f.target.value), "aria-label": "Filtra per squadra reale", children: [
            /* @__PURE__ */ o.jsx("option", { value: "Tutti", children: "Squadra" }),
            e.map((f) => /* @__PURE__ */ o.jsx("option", { value: f, children: f }, f))
          ] }),
          /* @__PURE__ */ o.jsx(Xe, { size: 14 })
        ] }),
        /* @__PURE__ */ o.jsxs("label", { className: "lf-select-wrap", children: [
          /* @__PURE__ */ o.jsx("span", { "aria-hidden": "true", children: "👤" }),
          /* @__PURE__ */ o.jsxs("select", { value: l, onChange: (f) => u(f.target.value), "aria-label": "Filtra per proprietario", children: [
            /* @__PURE__ */ o.jsx("option", { value: "Tutti", children: "Proprietario" }),
            t.map((f) => /* @__PURE__ */ o.jsx("option", { value: f, children: f }, f))
          ] }),
          /* @__PURE__ */ o.jsx(Xe, { size: 14 })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "lf-mobile-filters md:tw-hidden", children: [
      /* @__PURE__ */ o.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ o.jsx("span", { className: "lf-mobile-filter__label", children: "Ruolo" }),
        /* @__PURE__ */ o.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ o.jsx("select", { value: n, onChange: (f) => s(f.target.value), "aria-label": "Filtra per ruolo", children: Pa.map((f) => /* @__PURE__ */ o.jsx("option", { value: f, children: f === "Tutti" ? "Tutti" : gs[f] }, f)) }),
          /* @__PURE__ */ o.jsx(Xe, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ o.jsx("span", { className: "lf-mobile-filter__label", children: "Squadra" }),
        /* @__PURE__ */ o.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ o.jsxs("select", { value: r, onChange: (f) => a(f.target.value), "aria-label": "Filtra per squadra reale", children: [
            /* @__PURE__ */ o.jsx("option", { value: "Tutti", children: "Tutte" }),
            e.map((f) => /* @__PURE__ */ o.jsx("option", { value: f, children: f }, f))
          ] }),
          /* @__PURE__ */ o.jsx(Xe, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ o.jsx("span", { className: "lf-mobile-filter__label", children: "Proprietario" }),
        /* @__PURE__ */ o.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ o.jsxs("select", { value: l, onChange: (f) => u(f.target.value), "aria-label": "Filtra per proprietario", children: [
            /* @__PURE__ */ o.jsx("option", { value: "Tutti", children: "Tutti" }),
            t.map((f) => /* @__PURE__ */ o.jsx("option", { value: f, children: f }, f))
          ] }),
          /* @__PURE__ */ o.jsx(Xe, { size: 14 })
        ] })
      ] })
    ] }),
    i && /* @__PURE__ */ o.jsxs("button", { type: "button", onClick: c, className: "lf-mobile-reset md:tw-hidden", children: [
      /* @__PURE__ */ o.jsx(pd, { size: 15 }),
      " Azzera filtri"
    ] })
  ] });
}
function yi({ active: e, direction: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ o.jsx(Jp, { size: 14 }) : /* @__PURE__ */ o.jsx(Xe, { size: 14 }) : null;
}
function im({ sortKey: e, sortDirection: t, onSort: n }) {
  return /* @__PURE__ */ o.jsxs("div", { className: "tw-hidden tw-grid-cols-12 tw-gap-4 tw-border-b tw-border-slate-200 tw-bg-slate-50 tw-px-6 tw-py-4 tw-text-xs tw-font-bold tw-uppercase tw-tracking-wider tw-text-slate-500 md:tw-grid", children: [
    /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-4", children: "Giocatore" }),
    /* @__PURE__ */ o.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2", onClick: () => n("position"), children: [
      "Ruolo ",
      /* @__PURE__ */ o.jsx(yi, { active: e === "position", direction: t })
    ] }),
    /* @__PURE__ */ o.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2 tw-justify-center", onClick: () => n("quotation"), children: [
      "Quot. ",
      /* @__PURE__ */ o.jsx(yi, { active: e === "quotation", direction: t })
    ] }),
    /* @__PURE__ */ o.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2 tw-justify-center", onClick: () => n("purchasePrice"), children: [
      "Prezzo ",
      /* @__PURE__ */ o.jsx(yi, { active: e === "purchasePrice", direction: t })
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "tw-col-span-2", children: "Proprietario" })
  ] });
}
function sm(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function om({ player: e }) {
  return /* @__PURE__ */ o.jsx("article", { className: "tw-p-3 tw-transition hover:tw-bg-slate-50", children: /* @__PURE__ */ o.jsxs("div", { className: "tw-flex tw-items-start tw-gap-3", children: [
    /* @__PURE__ */ o.jsx("div", { className: "lf-player-avatar lf-player-avatar--mobile", "aria-hidden": "true", children: sm(e.displayName) }),
    /* @__PURE__ */ o.jsxs("div", { className: "tw-min-w-0 tw-flex-1", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "tw-mb-1 tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ o.jsx("span", { className: kl[e.role] ?? kl.U, children: e.role || "?" }),
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
function Ma(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ø/g, "O").replace(/ø/g, "o").toLowerCase();
}
function Da(e) {
  return e.type === "goalkeeper_block" || e.role === "P" && /\s+-\s+/.test(e.displayName);
}
function am({ assets: e }) {
  const [t, n] = L.useState(""), [r, l] = L.useState("Tutti"), [i, s] = L.useState("Tutti"), [a, u] = L.useState("Tutti"), [c, f] = L.useState(!1), [h, v] = L.useState("position"), [x, g] = L.useState("asc"), [w, j] = L.useState(/* @__PURE__ */ new Set()), p = L.useMemo(() => [...new Set(e.map((C) => C.realTeam).filter(Boolean))].sort((C, z) => C.localeCompare(z, "it")), [e]), d = L.useMemo(() => [...new Set(e.map((C) => C.ownerTag).filter(Boolean))].sort((C, z) => C.localeCompare(z, "it")), [e]), m = L.useMemo(() => {
    const C = Ma(t.trim());
    return e.filter((z) => !(C && !Ma(`${z.displayName} ${z.realTeam} ${z.ownerTag}`).includes(C) || c && !z.isFreeAgent || r !== "Tutti" && z.role !== r || i !== "Tutti" && z.realTeam !== i || a !== "Tutti" && z.ownerTag !== a));
  }, [e, a, r, t, c, i]), y = L.useMemo(() => [...m].sort((C, z) => {
    if (h === "position") {
      const Ue = (La[C.role] ?? 9) - (La[z.role] ?? 9), Ge = x === "asc" ? Ue : -Ue;
      if (Ge !== 0)
        return Ge;
      const xe = C.realTeam.localeCompare(z.realTeam, "it");
      if (xe !== 0)
        return xe;
      const Vt = z.quotation - C.quotation;
      return Vt !== 0 ? Vt : C.displayName.localeCompare(z.displayName, "it");
    }
    const O = (C[h] || 0) - (z[h] || 0);
    return x === "asc" ? O : -O;
  }), [m, x, h]), N = !!(t || r !== "Tutti" || i !== "Tutti" || a !== "Tutti" || c), k = () => {
    n(""), l("Tutti"), s("Tutti"), u("Tutti"), f(!1), v("position"), g("asc");
  }, E = (C) => {
    if (h === C) {
      x === "desc" || v("position"), g("asc");
      return;
    }
    v(C), g("desc");
  }, _ = (C) => {
    j((z) => {
      const O = new Set(z);
      return O.has(C) ? O.delete(C) : O.add(C), O;
    });
  };
  return /* @__PURE__ */ o.jsx("div", { className: "tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-7xl", children: [
    /* @__PURE__ */ o.jsx("div", { className: "tw-flex tw-justify-end tw-p-4 sm:tw-p-6 lg:tw-p-8", children: /* @__PURE__ */ o.jsxs("div", { className: "tw-flex tw-w-full tw-flex-wrap tw-items-stretch tw-gap-2 lg:tw-ml-auto lg:tw-w-auto lg:tw-justify-end", children: [
      /* @__PURE__ */ o.jsxs("label", { className: "lf-search tw-min-w-0 tw-flex-1 lg:tw-w-80 lg:tw-flex-none", children: [
        /* @__PURE__ */ o.jsx(za, { size: 20 }),
        /* @__PURE__ */ o.jsx("input", { type: "search", placeholder: "Cerca giocatore...", value: t, onChange: (C) => n(C.target.value) })
      ] }),
      /* @__PURE__ */ o.jsxs("button", { type: "button", onClick: () => f((C) => !C), className: `lf-action-button ${c ? "lf-action-button--active" : ""}`, title: "Mostra solo giocatori svincolati", children: [
        /* @__PURE__ */ o.jsx(Zp, { size: 20 }),
        /* @__PURE__ */ o.jsx("span", { className: "tw-hidden sm:tw-inline", children: "Svincolati" })
      ] }),
      N && /* @__PURE__ */ o.jsx("button", { type: "button", onClick: k, className: "lf-reset-button tw-hidden md:tw-flex", title: "Azzera filtri", children: /* @__PURE__ */ o.jsx(pd, { size: 20 }) })
    ] }) }),
    /* @__PURE__ */ o.jsxs("div", { className: "tw-px-3 sm:tw-px-6 lg:tw-px-8", children: [
      /* @__PURE__ */ o.jsx(
        lm,
        {
          teams: p,
          owners: d,
          currentRole: r,
          currentTeam: i,
          currentOwner: a,
          hasActiveFilters: N,
          onRoleChange: l,
          onTeamChange: s,
          onOwnerChange: u,
          onResetFilters: k
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
        /* @__PURE__ */ o.jsx(im, { sortKey: h, sortDirection: x, onSort: E }),
        /* @__PURE__ */ o.jsx("div", { className: "tw-hidden tw-divide-y tw-divide-slate-100 md:tw-block", children: y.map((C) => Da(C) ? /* @__PURE__ */ o.jsx(Ra, { asset: C, expanded: w.has(C.assetCode), onToggle: () => _(C.assetCode) }, C.assetCode) : /* @__PURE__ */ o.jsx(rm, { player: C }, C.assetCode)) }),
        /* @__PURE__ */ o.jsx("div", { className: "tw-divide-y tw-divide-slate-100 md:tw-hidden", children: y.map((C) => Da(C) ? /* @__PURE__ */ o.jsx(Ra, { asset: C, expanded: w.has(C.assetCode), onToggle: () => _(C.assetCode) }, C.assetCode) : /* @__PURE__ */ o.jsx(om, { player: C }, C.assetCode)) }),
        y.length === 0 && /* @__PURE__ */ o.jsxs("div", { className: "tw-px-6 tw-py-14 tw-text-center", children: [
          /* @__PURE__ */ o.jsx(za, { size: 34, className: "tw-mx-auto tw-mb-3 tw-text-slate-300" }),
          /* @__PURE__ */ o.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-slate-800", children: "Nessun giocatore trovato" }),
          /* @__PURE__ */ o.jsx("p", { className: "tw-mb-0 tw-mt-1 tw-text-sm tw-text-slate-500", children: "Prova a modificare i filtri di ricerca." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "tw-h-4 sm:tw-h-6" })
  ] }) });
}
function um(e) {
  return e.map((t) => ({
    ...t,
    purchasePrice: t.purchasePrice ?? 0,
    managerCredits: t.managerCredits ?? null
  }));
}
function wi() {
  var e, t, n, r;
  return {
    state: ((t = (e = window.LineupLeagueData) == null ? void 0 : e.getState) == null ? void 0 : t.call(e)) ?? { status: "idle" },
    assets: um(((r = (n = window.LineupLeagueData) == null ? void 0 : n.getAssets) == null ? void 0 : r.call(n)) ?? [])
  };
}
function go() {
  var s;
  const e = L.useMemo(wi, []), [t, n] = L.useState(e.state), [r, l] = L.useState(e.assets), i = (s = window.LINEUP_FANTA) == null ? void 0 : s.league;
  return L.useEffect(() => {
    let a = !1, u = 0;
    const c = () => {
      if (a)
        return;
      const h = wi();
      n(h.state), l(h.assets), u += 1, h.state.status !== "ready" && u < 20 && window.setTimeout(c, 150);
    }, f = (h) => {
      if (h.detail.leagueId !== (i == null ? void 0 : i.id))
        return;
      const v = wi();
      n(v.state), l(v.assets);
    };
    return document.addEventListener("lineup:league-assets-ready", f), c(), () => {
      a = !0, document.removeEventListener("lineup:league-assets-ready", f);
    };
  }, [i == null ? void 0 : i.id]), { state: t, assets: r, league: i };
}
function cm() {
  const { state: e, assets: t } = go();
  return e.status === "error" ? /* @__PURE__ */ o.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ o.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-red-600", children: "Errore nel caricamento del Listone" }),
    /* @__PURE__ */ o.jsx("p", { className: "tw-mb-0 tw-mt-2 tw-text-sm tw-text-slate-500", children: "Controlla il CSV della lega e ricarica la pagina." })
  ] }) }) : e.status !== "ready" ? /* @__PURE__ */ o.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ o.jsx("div", { className: "lf-spinner tw-mx-auto tw-mb-3" }),
    /* @__PURE__ */ o.jsx("p", { className: "tw-m-0 tw-text-sm tw-font-semibold tw-text-slate-500", children: "Caricamento del Listone…" })
  ] }) }) : /* @__PURE__ */ o.jsx(am, { assets: t });
}
const dm = "lineup:debug";
function Ia() {
  try {
    return new URLSearchParams(window.location.search).get("debug") === "1";
  } catch {
    return !1;
  }
}
function fm() {
  try {
    return Ia() || window.localStorage.getItem(dm) === "1";
  } catch {
    return Ia();
  }
}
function Mr(e, t, n, r) {
  if (e === "debug" && !fm())
    return;
  const l = `[Lineup:${t}]`;
  r === void 0 ? console[e](l, n) : console[e](l, n, r);
}
function Ht(e) {
  return {
    debug: (t, n) => Mr("debug", e, t, n),
    info: (t, n) => Mr("info", e, t, n),
    warn: (t, n) => Mr("warn", e, t, n),
    error: (t, n) => Mr("error", e, t, n)
  };
}
function pm(e) {
  return e.split(/\s+-\s+/).map((t) => t.trim()).filter(Boolean);
}
function mm(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function Dr({ players: e, role: t, label: n }) {
  const [r, l] = L.useState(/* @__PURE__ */ new Set()), i = e.filter((a) => a.role === t).sort((a, u) => {
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
      const u = t === "P" && (a.type === "goalkeeper_block" || /\s+-\s+/.test(a.displayName)), c = r.has(a.assetCode), f = u ? pm(a.displayName) : [], h = /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
        /* @__PURE__ */ o.jsxs("div", { className: "lf-squad-item__left", children: [
          /* @__PURE__ */ o.jsx("div", { className: `lf-squad-avatar lf-squad-avatar--${t.toLowerCase()}`, "aria-hidden": "true", children: u ? /* @__PURE__ */ o.jsx(Cl, { size: 17 }) : mm(a.displayName) }),
          /* @__PURE__ */ o.jsxs("div", { className: "lf-squad-item__copy", children: [
            /* @__PURE__ */ o.jsxs("div", { className: "lf-squad-item__name", children: [
              u ? `Blocco ${a.realTeam || a.displayName}` : a.displayName,
              !a.active && " *",
              u && /* @__PURE__ */ o.jsx(Xe, { size: 14, className: c ? "lf-chevron-open" : "" })
            ] }),
            /* @__PURE__ */ o.jsx("div", { className: "lf-squad-item__team", children: u ? `${f.length} portieri` : a.realTeam || "—" })
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
            children: h
          }
        ) : /* @__PURE__ */ o.jsx("div", { className: "lf-squad-item", children: h }),
        u && c && /* @__PURE__ */ o.jsx("div", { className: "lf-squad-goalkeepers", children: f.map((v) => /* @__PURE__ */ o.jsxs("div", { className: "lf-squad-goalkeeper", children: [
          /* @__PURE__ */ o.jsx("div", { className: "lf-squad-goalkeeper__avatar", children: "P" }),
          /* @__PURE__ */ o.jsx("span", { children: v })
        ] }, v)) })
      ] }, a.assetCode);
    }) })
  ] });
}
const xi = { P: 2, D: 8, C: 8, A: 6 }, hm = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 });
function vm({ team: e }) {
  const [t, n] = L.useState("ALL"), [r, l] = L.useState(!1), i = (u) => {
    n((c) => c === u ? "ALL" : u);
  }, s = !!(e.logoUrl && !r), a = e.credits === null ? "—" : hm.format(e.credits);
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
            /* @__PURE__ */ o.jsx(bp, { size: 16 }),
            " ",
            a
          ] })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: `lf-team-status ${e.isComplete ? "lf-team-status--complete" : "lf-team-status--incomplete"}`, children: [
          e.isComplete ? /* @__PURE__ */ o.jsx(Cl, { size: 13 }) : /* @__PURE__ */ o.jsx(em, { size: 13 }),
          e.isComplete ? "ROSA COMPLETA" : "INCOMPLETA"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "lf-team-role-filters", "aria-label": `Filtra la rosa di ${e.managerName} per ruolo`, children: Object.keys(xi).map((u) => {
      const c = e.roleCounts[u] === xi[u];
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
            xi[u]
          ]
        },
        u
      );
    }) }),
    /* @__PURE__ */ o.jsx("div", { className: "lf-team-roster-frame", children: /* @__PURE__ */ o.jsxs("div", { className: "lf-team-roster", children: [
      (t === "ALL" || t === "P") && /* @__PURE__ */ o.jsx(Dr, { players: e.players, role: "P", label: "Portieri" }),
      (t === "ALL" || t === "D") && /* @__PURE__ */ o.jsx(Dr, { players: e.players, role: "D", label: "Difensori" }),
      (t === "ALL" || t === "C") && /* @__PURE__ */ o.jsx(Dr, { players: e.players, role: "C", label: "Centrocampisti" }),
      (t === "ALL" || t === "A") && /* @__PURE__ */ o.jsx(Dr, { players: e.players, role: "A", label: "Attaccanti" })
    ] }) })
  ] });
}
function Si(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function gm(e) {
  if (typeof e == "number" && Number.isFinite(e))
    return e;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e.trim().replace(",", "."));
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function ym(e) {
  if (!Si(e))
    return {};
  const t = Si(e.teams) ? e.teams : e;
  return Object.entries(t).reduce((n, [r, l]) => {
    if (!Si(l))
      return n;
    const i = l, s = i.logoUrl ?? i.logo_url;
    return n[r] = {
      credits: gm(i.credits),
      logoUrl: typeof s == "string" ? s.trim() : ""
    }, n;
  }, {});
}
async function wm(e, t) {
  if (!e)
    return {};
  const n = t || `/api/league-data?league=${encodeURIComponent(e)}&resource=teams`, r = n.includes("?") ? "&" : "?", l = `${n}${r}_lf=${Date.now()}`, i = await fetch(l, {
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
  return ym(await i.json());
}
class md extends Error {
  constructor(n, r) {
    super(`HTTP ${n}: ${r}`);
    hr(this, "status");
    hr(this, "url");
    this.name = "HttpError", this.status = n, this.url = r;
  }
}
function hd(e, t = "_lf") {
  const n = e.includes("?") ? "&" : "?";
  return `${e}${n}${encodeURIComponent(t)}=${Date.now()}`;
}
async function xm(e, t) {
  const n = hd(e), r = await fetch(n, {
    cache: "no-store",
    signal: t,
    headers: {
      "Cache-Control": "no-cache, no-store, max-age=0",
      Pragma: "no-cache"
    }
  });
  if (!r.ok)
    throw new md(r.status, e);
  return r.text();
}
async function Fa(e, t) {
  const n = await fetch(hd(e), {
    cache: "no-store",
    signal: t,
    headers: {
      "Cache-Control": "no-cache, no-store, max-age=0",
      Pragma: "no-cache"
    }
  });
  if (!n.ok)
    throw new md(n.status, e);
  return n.json();
}
function Sm() {
  return document.documentElement.dataset.leagueSection ?? "formation";
}
function yo(e, t = 3e4) {
  const [n, r] = L.useState(0);
  return L.useEffect(() => {
    const l = () => r((u) => u + 1), i = (u) => {
      const c = u.detail;
      (c == null ? void 0 : c.section) === e && l();
    }, s = () => {
      !document.hidden && Sm() === e && l();
    }, a = window.setInterval(s, t);
    return window.addEventListener("lineup:league-section-change", i), window.addEventListener("focus", s), document.addEventListener("visibilitychange", s), () => {
      window.clearInterval(a), window.removeEventListener("lineup:league-section-change", i), window.removeEventListener("focus", s), document.removeEventListener("visibilitychange", s);
    };
  }, [t, e]), n;
}
const Hn = xm, Oa = { P: 2, D: 8, C: 8, A: 6 }, Nm = Ht("teams");
function jm({ assets: e, leagueId: t, profilesUrl: n }) {
  const [r, l] = L.useState({}), i = yo("rose");
  L.useEffect(() => {
    let a = !1;
    return wm(t, n).then((u) => {
      a || l(u);
    }).catch((u) => {
      Nm.warn("profiles load failed", u), a || l({});
    }), () => {
      a = !0;
    };
  }, [t, n, i]);
  const s = L.useMemo(() => {
    const a = /* @__PURE__ */ new Map();
    return e.forEach((c) => {
      if (c.isFreeAgent || !c.ownerTag)
        return;
      const f = c.ownerTag.trim();
      if (!f)
        return;
      const h = a.get(f) ?? [];
      h.push(c), a.set(f, h);
    }), [...a.entries()].map(([c, f]) => {
      var w;
      const h = { P: 0, D: 0, C: 0, A: 0 };
      f.forEach((j) => {
        j.role in h && (h[j.role] += 1);
      });
      const v = Object.keys(Oa).every((j) => h[j] === Oa[j]), x = r[c], g = ((w = f.find((j) => j.managerCredits !== null)) == null ? void 0 : w.managerCredits) ?? null;
      return {
        managerName: c,
        credits: g ?? (x == null ? void 0 : x.credits) ?? null,
        logoUrl: (x == null ? void 0 : x.logoUrl) ?? "",
        players: f,
        isComplete: v,
        roleCounts: h,
        totalPlayers: f.length
      };
    }).sort((c, f) => {
      const h = c.managerName.includes("-"), v = f.managerName.includes("-");
      return h !== v ? h ? 1 : -1 : c.managerName.localeCompare(f.managerName, "it");
    });
  }, [e, r]);
  return /* @__PURE__ */ o.jsx("div", { className: "tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7", children: /* @__PURE__ */ o.jsx("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-7xl", children: s.length > 0 ? /* @__PURE__ */ o.jsx("div", { className: "lf-teams-grid", children: s.map((a) => /* @__PURE__ */ o.jsx(vm, { team: a }, a.managerName)) }) : /* @__PURE__ */ o.jsxs("div", { className: "lf-teams-empty", children: [
    /* @__PURE__ */ o.jsx(qp, { size: 34 }),
    /* @__PURE__ */ o.jsx("h2", { children: "Nessuna rosa disponibile" }),
    /* @__PURE__ */ o.jsx("p", { children: "Nel CSV non risultano asset assegnati a un proprietario." })
  ] }) }) });
}
function km() {
  var r;
  const { state: e, assets: t, league: n } = go();
  return e.status === "error" ? /* @__PURE__ */ o.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ o.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-red-600", children: "Errore nel caricamento delle Rose" }),
    /* @__PURE__ */ o.jsx("p", { className: "tw-mb-0 tw-mt-2 tw-text-sm tw-text-slate-500", children: "Controlla il CSV della lega e ricarica la pagina." })
  ] }) }) : e.status !== "ready" ? /* @__PURE__ */ o.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ o.jsx("div", { className: "lf-spinner tw-mx-auto tw-mb-3" }),
    /* @__PURE__ */ o.jsx("p", { className: "tw-m-0 tw-text-sm tw-font-semibold tw-text-slate-500", children: "Caricamento delle Rose…" })
  ] }) }) : /* @__PURE__ */ o.jsx(jm, { assets: t, leagueId: (n == null ? void 0 : n.id) ?? "", profilesUrl: (r = n == null ? void 0 : n.leagueData) == null ? void 0 : r.teamProfilesUrl });
}
function vd(e) {
  const t = String(e ?? "").trim().toLowerCase().replace(/^\[|\]$/g, "");
  return t === "localhost" || t === "127.0.0.1" || t === "0.0.0.0" || t === "::1" || t.endsWith(".local") ? !0 : /^10\./.test(t) || /^192\.168\./.test(t) || /^172\.(1[6-9]|2\d|3[01])\./.test(t) || /^169\.254\./.test(t);
}
function V(e) {
  return String(e ?? "").replace(/[\u200d\ufe0e\ufe0f\u20e3]/g, "").replace(/[\u{1f1e6}-\u{1f1ff}]/gu, "").replace(/[\u{1f3fb}-\u{1f3ff}]/gu, "").replace(new RegExp("\\p{Extended_Pictographic}", "gu"), "").replace(/\s+/g, " ").trim();
}
function ne(e) {
  return V(e).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "").trim();
}
function sr(e) {
  return V(e).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, "").split(/[^a-z0-9]+/).filter(Boolean);
}
function Ir(e) {
  return [...new Set(e.filter(Boolean))];
}
function Fr(e) {
  return e.map((t) => t[0] ?? "").join("");
}
function gd(e) {
  const t = V(e).trim(), n = ne(t);
  return /^[A-Z0-9.\s-]{2,6}$/.test(t) && n.length >= 2 && n.length <= 6;
}
function wo(e) {
  const t = sr(e);
  if (t.length < 2 || t[0].length !== 1)
    return null;
  const n = t.slice(1).join("");
  return n.length < 3 ? null : { initial: t[0], surname: n };
}
function Cm(e, t) {
  if (!e || !t)
    return 0;
  if (e === t)
    return 1;
  if (e.length < 2 || t.length < 2)
    return 0;
  const n = /* @__PURE__ */ new Map();
  for (let l = 0; l < e.length - 1; l += 1) {
    const i = e.slice(l, l + 2);
    n.set(i, (n.get(i) ?? 0) + 1);
  }
  let r = 0;
  for (let l = 0; l < t.length - 1; l += 1) {
    const i = t.slice(l, l + 2), s = n.get(i) ?? 0;
    s > 0 && (r += 1, n.set(i, s - 1));
  }
  return 2 * r / (e.length + t.length - 2);
}
function yd(e) {
  const t = Ir([
    V(e.displayName),
    V(e.docsName),
    V(e.assetCode)
  ]), n = e.type === "goalkeeper_block" ? e.displayName.split(/\s+-\s+/).map(V).filter(Boolean) : [], r = Ir([...t, ...n]), l = r.map(sr).filter((a) => a.length > 0), i = Ir(l.flatMap((a) => {
    const u = [Fr(a)];
    for (let c = 2; c <= Math.min(4, a.length); c += 1)
      u.push(Fr(a.slice(-c)));
    return u;
  })), s = Ir(l.flatMap((a) => a.length >= 2 ? [Fr(a.slice(-2)), Fr(a)] : []));
  return {
    asset: e,
    aliases: r,
    aliasTokens: l,
    initials: i,
    compoundInitials: s,
    goalkeeperParts: n
  };
}
function Em(e, t) {
  const n = ne(e);
  return n ? t.filter((r) => r.active && !r.isFreeAgent && ne(r.ownerTag) === n).map(yd) : [];
}
function _m(e) {
  const t = /* @__PURE__ */ new Set();
  return e.filter((n) => {
    const r = [
      ne(n.assetCode),
      ne(n.displayName),
      ne(n.docsName),
      ne(n.role),
      ne(n.realTeam)
    ].join("|");
    return !r.replace(/\|/g, "") || t.has(r) ? !1 : (t.add(r), !0);
  }).map(yd);
}
const Tm = Object.freeze({
  mgw: ["gibbswhite", "morgangibbswhite"],
  dcl: ["calvertlewin", "dominiccalvertlewin"],
  taa: ["alexanderarnold", "trentalexanderarnold"],
  awb: ["wanbissaka", "aaronwanbissaka"],
  jwp: ["wardprowse", "jameswardprowse"],
  cho: ["hudsonodoi", "callumhudsonodoi"],
  esr: ["smithrowe", "emilesmithrowe"],
  kdb: ["debruyne", "kevindebruyne"],
  rlc: ["loftuscheek", "rubenloftuscheek"]
});
function Pm(e, t, n = null) {
  const r = ne(e), l = sr(e);
  if (!r)
    return 0;
  const i = gd(e), s = wo(e);
  let a = 0;
  return t.aliases.forEach((u, c) => {
    var w;
    const f = ne(u), h = t.aliasTokens[c] ?? sr(u);
    if (!f)
      return;
    if (s) {
      const j = ((w = h[0]) == null ? void 0 : w[0]) ?? "", p = h.slice(1).join(""), d = h[h.length - 1] ?? "", m = String(t.asset.role ?? "").toUpperCase(), y = !n || m === n;
      h.length >= 2 && j === s.initial && (p === s.surname || d === s.surname) && (a = Math.max(a, 99)), h.length === 1 && h[0] === s.surname && n && y && (a = Math.max(a, 99));
    }
    r === f && (a = Math.max(a, 100)), r.length >= 4 && f.startsWith(r) && (a = Math.max(a, 92 - Math.min(8, f.length - r.length))), f.length >= 4 && r.startsWith(f) && (a = Math.max(a, 88 - Math.min(8, r.length - f.length))), h.some((j) => j === r) && (a = Math.max(a, 89));
    const v = h[h.length - 1] ?? "";
    r.length >= 3 && v.startsWith(r) && (a = Math.max(a, 88 - Math.min(8, v.length - r.length)));
    const x = l[l.length - 1] ?? "";
    x.length >= 3 && h.includes(x) && (a = Math.max(a, 87));
    const g = Cm(r, f);
    g >= 0.72 && (a = Math.max(a, 68 + Math.round(g * 20)));
  }), i && ((Tm[r] ?? []).some((c) => t.aliases.some((f) => {
    const h = ne(f);
    return h === c || h.endsWith(c) || c.endsWith(h);
  })) && (a = Math.max(a, 100)), t.initials.includes(r) && (a = Math.max(a, 99)), t.compoundInitials.forEach((c) => {
    c.length >= 2 && r.length > c.length && r.endsWith(c) && (a = Math.max(a, 98));
  })), a;
}
function $a(e, t, n, r = null) {
  const l = r ? String(r).toUpperCase() : "";
  return t.filter((i) => !l || String(i.asset.role ?? "").toUpperCase() === l).map((i) => ({
    candidate: i,
    score: Pm(e, i, r)
  })).filter(({ score: i }) => i >= n).sort((i, s) => s.score - i.score);
}
function Aa(e, t) {
  const n = e[0], r = e[1];
  return !n || r && n.score - r.score < t ? null : n;
}
const Lm = Ht("resolver");
function Ua(e) {
  const t = V(e);
  return {
    matched: !1,
    originalName: t,
    displayName: t,
    role: "",
    realTeam: "",
    assetCode: "",
    confidence: 0
  };
}
function zm(e, t) {
  const { asset: n, goalkeeperParts: r } = t.candidate, l = n.type === "goalkeeper_block" && r.some((u) => ne(u) === ne(e)), i = wo(e), s = sr(n.displayName), a = !!(i && s.length === 1 && s[0] === i.surname);
  return {
    matched: !0,
    originalName: e,
    displayName: V(
      l || a ? e : n.displayName
    ),
    role: V(n.role),
    realTeam: V(n.realTeam || (l ? n.displayName : "")),
    assetCode: n.assetCode,
    confidence: t.score
  };
}
function Ba(e, t) {
  const n = gd(e), r = !!wo(e);
  return t ? {
    minimum: r ? 98 : n ? 97 : 96,
    margin: r ? 3 : 2
  } : {
    minimum: r ? 95 : n ? 96 : 84,
    margin: r ? 3 : n ? 2 : 4
  };
}
function Rm(e) {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = _m(e);
  function l(i) {
    const s = ne(i);
    return t.has(s) || t.set(s, Em(i, e)), t.get(s) ?? [];
  }
  return function(s, a, u = null) {
    const c = V(a), f = [
      ne(s),
      ne(c),
      u ?? ""
    ].join("|"), h = n.get(f);
    if (h)
      return h;
    if (!c) {
      const p = Ua(c);
      return n.set(f, p), p;
    }
    const v = Ba(c, !1), x = Aa(
      $a(
        c,
        l(s),
        v.minimum,
        u
      ),
      v.margin
    ), g = Ba(c, !0), w = x ?? Aa(
      $a(
        c,
        r,
        g.minimum,
        u
      ),
      g.margin
    ), j = w ? zm(c, w) : Ua(c);
    return n.set(f, j), Lm.debug(j.matched ? "resolved" : "unresolved", {
      ownerName: s,
      playerName: c,
      roleHint: u,
      result: j
    }), j;
  };
}
function Ha(e) {
  const t = [];
  let n = "", r = !1;
  for (let l = 0; l < e.length; l += 1) {
    const i = e[l];
    i === '"' ? r && e[l + 1] === '"' ? (n += '"', l += 1) : r = !r : i === "," && !r ? (t.push(n), n = "") : n += i;
  }
  return t.push(n), t.map((l) => l.trim());
}
function ys(e) {
  const t = String(e ?? "").trim().replace(",", ".");
  if (!t)
    return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}
function Or(e) {
  const t = ys(e);
  return t === null ? null : Math.trunc(t);
}
function Mm(e, t) {
  const n = String(e ?? "").replace(/^\uFEFF/, "").split(/\r?\n/).filter((a) => a.trim().length > 0);
  if (n.length === 0)
    return [];
  const r = Ha(n[0]).map((a) => a.toLowerCase()), l = (a) => r.indexOf(a);
  if ([
    "real_round_number",
    "fantasy_matchday_number",
    "home_team",
    "away_team"
  ].some((a) => l(a) < 0))
    throw new Error("Il CSV Calendario non contiene tutte le colonne richieste.");
  const s = /* @__PURE__ */ new Map();
  for (const a of n.slice(1)) {
    const u = Ha(a), c = Or(u[l("fantasy_matchday_number")]), f = Or(u[l("real_round_number")]), h = String(u[l("home_team")] ?? "").trim(), v = String(u[l("away_team")] ?? "").trim();
    if (c === null || f === null || !h || !v)
      continue;
    const x = {
      realRoundNumber: f,
      fantasyMatchdayNumber: c,
      status: "da_calcolare",
      homeTeam: h,
      awayTeam: v,
      homeTotal: ys(u[l("home_total")]),
      awayTotal: ys(u[l("away_total")]),
      homeGoals: Or(u[l("home_goals")]),
      awayGoals: Or(u[l("away_goals")]),
      note: String(u[l("note")] ?? "").trim()
    }, g = s.get(c) ?? [];
    g.push(x), s.set(c, g);
  }
  return Array.from(s.entries()).map(([a, u]) => {
    var h;
    const f = u.length === t && u.every((v) => v.homeGoals !== null && v.awayGoals !== null) ? "calcolata" : "da_calcolare";
    return {
      fantasyMatchdayNumber: a,
      realRoundNumber: ((h = u[0]) == null ? void 0 : h.realRoundNumber) ?? a,
      status: f,
      matches: u.map((v) => ({ ...v, status: f }))
    };
  }).sort((a, u) => a.realRoundNumber - u.realRoundNumber || a.fantasyMatchdayNumber - u.fantasyMatchdayNumber);
}
function El(e) {
  return e === null ? "" : new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(e) ? 0 : 1
  }).format(e);
}
function Dm({
  match: e,
  index: t,
  fantasyMatchdayNumber: n,
  interactive: r,
  onSelect: l
}) {
  const i = e.homeGoals !== null && e.awayGoals !== null, s = () => l({
    index: t,
    homeTeam: e.homeTeam,
    awayTeam: e.awayTeam,
    homeGoals: e.homeGoals,
    awayGoals: e.awayGoals
  });
  return /* @__PURE__ */ o.jsxs(
    "article",
    {
      className: `lf-calendar-match${i ? "" : " is-pending"}${r ? " is-clickable" : ""}`,
      role: r ? "button" : void 0,
      tabIndex: r ? 0 : void 0,
      "aria-label": r ? `Apri formazioni di ${e.homeTeam} contro ${e.awayTeam}` : void 0,
      onClick: r ? s : void 0,
      onKeyDown: r ? (a) => {
        (a.key === "Enter" || a.key === " ") && (a.preventDefault(), s());
      } : void 0,
      children: [
        /* @__PURE__ */ o.jsxs("div", { className: "lf-calendar-team lf-calendar-team--home", children: [
          /* @__PURE__ */ o.jsx("strong", { children: e.homeTeam }),
          e.homeTotal !== null && /* @__PURE__ */ o.jsx("span", { children: El(e.homeTotal) })
        ] }),
        /* @__PURE__ */ o.jsx(
          "div",
          {
            className: "lf-calendar-score",
            "aria-label": i ? `${e.homeGoals} a ${e.awayGoals}` : "Risultato non disponibile",
            children: i ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
              /* @__PURE__ */ o.jsx("b", { children: e.homeGoals }),
              /* @__PURE__ */ o.jsx("i", { children: "–" }),
              /* @__PURE__ */ o.jsx("b", { children: e.awayGoals })
            ] }) : /* @__PURE__ */ o.jsx("em", { children: "–" })
          }
        ),
        /* @__PURE__ */ o.jsxs("div", { className: "lf-calendar-team lf-calendar-team--away", children: [
          /* @__PURE__ */ o.jsx("strong", { children: e.awayTeam }),
          e.awayTotal !== null && /* @__PURE__ */ o.jsx("span", { children: El(e.awayTotal) })
        ] }),
        e.note && /* @__PURE__ */ o.jsx("p", { className: "lf-calendar-note", children: e.note })
      ]
    },
    `${n}-${e.homeTeam}-${e.awayTeam}-${t}`
  );
}
function Im({
  competitionLabel: e,
  matchdays: t,
  selectedIndex: n,
  selected: r,
  onSelect: l
}) {
  return /* @__PURE__ */ o.jsxs("div", { className: "lf-calendar-toolbar", children: [
    /* @__PURE__ */ o.jsx(
      "button",
      {
        type: "button",
        className: "lf-calendar-nav",
        onClick: () => l(t[n - 1].realRoundNumber),
        disabled: n <= 0,
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
          value: r.realRoundNumber,
          onChange: (i) => l(Number(i.target.value)),
          children: t.map((i) => /* @__PURE__ */ o.jsx(
            "option",
            {
              value: i.realRoundNumber,
              children: i.realRoundNumber
            },
            `${i.realRoundNumber}-${i.fantasyMatchdayNumber}`
          ))
        }
      ),
      /* @__PURE__ */ o.jsxs("small", { children: [
        "Giornata Fanta ",
        r.fantasyMatchdayNumber
      ] })
    ] }),
    /* @__PURE__ */ o.jsx(
      "button",
      {
        type: "button",
        className: "lf-calendar-nav",
        onClick: () => l(t[n + 1].realRoundNumber),
        disabled: n >= t.length - 1,
        "aria-label": "Giornata successiva",
        children: "›"
      }
    )
  ] });
}
function Fm(e) {
  const t = L.useRef(null);
  return L.useEffect(() => {
    var a;
    const n = window.scrollY, r = window.matchMedia("(max-width: 767px)").matches, l = document.activeElement instanceof HTMLElement ? document.activeElement : null, i = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width
    };
    document.body.style.overflow = "hidden", r && (document.body.style.position = "fixed", document.body.style.top = `-${n}px`, document.body.style.width = "100%"), (a = t.current) == null || a.focus({ preventScroll: !0 });
    const s = (u) => {
      u.key === "Escape" && e();
    };
    return window.addEventListener("keydown", s), () => {
      document.body.style.overflow = i.overflow, document.body.style.position = i.position, document.body.style.top = i.top, document.body.style.width = i.width, r && window.scrollTo(0, n), window.removeEventListener("keydown", s), l == null || l.focus({ preventScroll: !0 });
    };
  }, [e]), t;
}
const Om = Object.freeze([
  { sourceIndex: 0, roleHint: "P", row: 1, column: "2 / 4" },
  { sourceIndex: 1, roleHint: "P", row: 1, column: "4 / 6" },
  { sourceIndex: 2, roleHint: "D", row: 2, column: "1 / 3" },
  { sourceIndex: 5, roleHint: "C", row: 2, column: "3 / 5" },
  { sourceIndex: 8, roleHint: "A", row: 2, column: "5 / 7" },
  { sourceIndex: 3, roleHint: "D", row: 3, column: "1 / 3" },
  { sourceIndex: 6, roleHint: "C", row: 3, column: "3 / 5" },
  { sourceIndex: 9, roleHint: "A", row: 3, column: "5 / 7" },
  { sourceIndex: 4, roleHint: "D", row: 4, column: "1 / 3" },
  { sourceIndex: 7, roleHint: "C", row: 4, column: "3 / 5" },
  { sourceIndex: 10, roleHint: "A", row: 4, column: "5 / 7" }
]), $m = ["343", "352", "433", "442", "451", "532", "541"];
function Am(e) {
  return [
    "P",
    ...Array(Number(e[0])).fill("D"),
    ...Array(Number(e[1])).fill("C"),
    ...Array(Number(e[2])).fill("A")
  ];
}
function Um(e, t) {
  const n = e.starters.map((l, i) => {
    var a;
    if (i === 0)
      return ["P"];
    const s = String(
      ((a = l.identity) == null ? void 0 : a.role) || t(e.team, l.name || l.raw).role || ""
    ).toUpperCase();
    return ["D", "C", "A"].includes(s) ? [s] : ["D", "C", "A"];
  }), r = $m.map(Am).filter((l) => l.length === e.starters.length).filter((l) => l.every((i, s) => n[s].includes(i)));
  return r.length === 0 ? e.starters.map((l, i) => i === 0 ? "P" : null) : e.starters.map((l, i) => new Set(r.map((a) => a[i])).size === 1 ? r[0][i] : null);
}
function ws({
  fallbackName: e,
  resolved: t,
  captain: n = !1,
  switchType: r = null
}) {
  const l = t.displayName || e, i = r === "plus" ? "Switch+" : r === "base" ? "Switch" : "";
  return /* @__PURE__ */ o.jsxs("div", { className: `lf-match-detail-player__identity${t.matched && t.role ? " has-role" : ""}`, children: [
    /* @__PURE__ */ o.jsxs("span", { className: "lf-match-detail-player__headline", children: [
      t.matched && t.role && /* @__PURE__ */ o.jsx("em", { className: "lf-match-detail-role", "data-role": t.role.toLowerCase(), children: t.role }),
      /* @__PURE__ */ o.jsx(
        "span",
        {
          className: "lf-match-detail-player__name",
          title: t.matched && t.originalName !== l ? `Nel documento: ${t.originalName}` : void 0,
          children: l
        }
      ),
      n && /* @__PURE__ */ o.jsx("small", { className: "is-captain", children: "C" }),
      i && /* @__PURE__ */ o.jsx("small", { className: `is-switch is-${r}`, children: i })
    ] }),
    t.matched && t.realTeam && /* @__PURE__ */ o.jsx("span", { className: "lf-match-detail-player__team", children: t.realTeam })
  ] });
}
function xs(e, t, n) {
  return !e || !e.displayName && !e.role && !e.realTeam ? n : {
    matched: !!(e.matched || e.displayName || e.role),
    originalName: t,
    displayName: e.displayName || t,
    role: e.role || n.role || "",
    realTeam: e.realTeam || n.realTeam || "",
    assetCode: e.assetCode || n.assetCode || "",
    confidence: e.confidence ?? 1
  };
}
function Bm({
  player: e,
  ownerName: t,
  resolvePlayer: n,
  slot: r
}) {
  const l = xs(e.identity, e.name || e.raw, n(
    t,
    e.name || e.raw,
    r.roleHint
  ));
  return /* @__PURE__ */ o.jsx(
    "li",
    {
      className: e.switchType ? `is-switch-${e.switchType}` : void 0,
      style: { gridRow: r.row, gridColumn: r.column },
      "data-role-slot": r.roleHint ?? void 0,
      children: /* @__PURE__ */ o.jsx(
        ws,
        {
          fallbackName: e.name || e.raw,
          resolved: l,
          captain: e.captain,
          switchType: e.switchType
        }
      )
    }
  );
}
function Hm({
  player: e,
  ownerName: t,
  resolvePlayer: n,
  roleHint: r = null
}) {
  const l = xs(e.identity, e.name || e.raw, n(t, e.name || e.raw, r)), i = e.replacement ? xs(e.replacement.identity, e.replacement.name, n(t, e.replacement.name, r)) : null, s = e.switchType ? ` is-switch-${e.switchType}` : "";
  return /* @__PURE__ */ o.jsxs("li", { className: `lf-match-detail-player${e.replacement ? " has-replacement" : ""}${s}`, children: [
    /* @__PURE__ */ o.jsxs("div", { className: "lf-match-detail-player__main", children: [
      /* @__PURE__ */ o.jsx(
        ws,
        {
          fallbackName: e.name || e.raw,
          resolved: l,
          captain: e.captain,
          switchType: e.switchType
        }
      ),
      /* @__PURE__ */ o.jsx("b", { className: e.vote === null ? "is-missing" : "", children: e.displayVote ?? e.status ?? "–" })
    ] }),
    e.replacement && i && /* @__PURE__ */ o.jsxs("div", { className: "lf-match-detail-replacement", children: [
      /* @__PURE__ */ o.jsx("span", { className: "lf-match-detail-replacement__label", children: "Entra" }),
      /* @__PURE__ */ o.jsx(
        ws,
        {
          fallbackName: e.replacement.name,
          resolved: i
        }
      ),
      /* @__PURE__ */ o.jsx("b", { children: e.replacement.displayVote ?? "–" })
    ] })
  ] });
}
function Va({
  side: e,
  team: t,
  resolvePlayer: n
}) {
  const r = L.useMemo(
    () => Um(t, n),
    [n, t]
  );
  return /* @__PURE__ */ o.jsxs("section", { className: `lf-match-detail-team is-${e}`, children: [
    /* @__PURE__ */ o.jsxs("header", { children: [
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx("h3", { children: t.team }),
        t.alias && t.alias !== t.team && /* @__PURE__ */ o.jsxs("small", { children: [
          "Nel documento: ",
          t.alias
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "lf-match-detail-total", children: [
        /* @__PURE__ */ o.jsx("span", { children: "Totale" }),
        /* @__PURE__ */ o.jsx("strong", { children: t.total === null ? "–" : El(t.total) }),
        t.playersCount !== null && /* @__PURE__ */ o.jsxs("small", { children: [
          t.playersCount,
          " giocatori"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "lf-match-detail-section", children: [
      /* @__PURE__ */ o.jsx("h4", { children: "Titolari" }),
      t.starters.length > 0 ? /* @__PURE__ */ o.jsx("ol", { className: "lf-match-detail-players", children: t.starters.map((l, i) => /* @__PURE__ */ o.jsx(
        Hm,
        {
          player: l,
          ownerName: t.team,
          resolvePlayer: n,
          roleHint: r[i]
        },
        `${l.raw}-${i}`
      )) }) : /* @__PURE__ */ o.jsx("p", { className: "lf-match-detail-empty", children: "Formazione non ancora inserita." })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "lf-match-detail-section lf-match-detail-section--bench", children: [
      /* @__PURE__ */ o.jsx("h4", { children: "A disposizione" }),
      t.bench.length > 0 ? /* @__PURE__ */ o.jsx("ul", { className: "lf-match-detail-bench", children: Om.map((l) => {
        const i = t.bench[l.sourceIndex];
        return i ? /* @__PURE__ */ o.jsx(
          Bm,
          {
            player: i,
            ownerName: t.team,
            resolvePlayer: n,
            slot: l
          },
          `${i.raw}-${l.sourceIndex}`
        ) : null;
      }) }) : /* @__PURE__ */ o.jsx("p", { className: "lf-match-detail-empty", children: "Panchina non ancora inserita." })
    ] })
  ] });
}
function Vm({
  detail: e,
  error: t,
  loading: n,
  onClose: r,
  resolvePlayer: l,
  homeGoals: i,
  awayGoals: s
}) {
  const [a, u] = L.useState("home"), c = Fm(r);
  L.useEffect(() => {
    u("home");
  }, [e == null ? void 0 : e.fantasyMatchdayNumber, e == null ? void 0 : e.matchup.homeTeam, e == null ? void 0 : e.matchup.awayTeam]);
  const f = (h) => {
    if (!e)
      return null;
    const v = e.matchup[h], x = h === "home" ? e.matchup.homeTeam : e.matchup.awayTeam;
    return /* @__PURE__ */ o.jsxs(
      "button",
      {
        type: "button",
        role: "tab",
        "aria-selected": a === h,
        className: a === h ? "is-active" : "",
        onClick: () => u(h),
        children: [
          /* @__PURE__ */ o.jsx("span", { className: "lf-match-detail-mobile-tabs__coach", children: x }),
          /* @__PURE__ */ o.jsxs("span", { className: "lf-match-detail-mobile-tabs__summary", children: [
            /* @__PURE__ */ o.jsx("strong", { children: v.total === null ? "–" : El(v.total) }),
            v.playersCount !== null && /* @__PURE__ */ o.jsxs("small", { children: [
              "(",
              v.playersCount,
              ")"
            ] })
          ] })
        ]
      }
    );
  };
  return /* @__PURE__ */ o.jsx(
    "div",
    {
      className: "lf-match-detail-backdrop",
      role: "presentation",
      onMouseDown: (h) => {
        h.target === h.currentTarget && r();
      },
      children: /* @__PURE__ */ o.jsxs(
        "section",
        {
          className: "lf-match-detail-modal",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Dettaglio scontro",
          children: [
            /* @__PURE__ */ o.jsx("header", { className: "lf-match-detail-modal__header", children: /* @__PURE__ */ o.jsx(
              "button",
              {
                ref: c,
                type: "button",
                onClick: r,
                "aria-label": "Chiudi confronto",
                children: "×"
              }
            ) }),
            /* @__PURE__ */ o.jsxs("div", { className: "lf-match-detail-modal__body", children: [
              /* @__PURE__ */ o.jsxs("div", { className: `lf-match-detail-sticky${!n && e ? " has-tabs" : ""}`, children: [
                /* @__PURE__ */ o.jsx(
                  "div",
                  {
                    className: "lf-match-detail-result",
                    "aria-label": i !== null && s !== null ? `Risultato ${i} a ${s}` : "Risultato non disponibile",
                    children: i !== null && s !== null ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
                      /* @__PURE__ */ o.jsx("b", { children: i }),
                      /* @__PURE__ */ o.jsx("span", { children: "–" }),
                      /* @__PURE__ */ o.jsx("b", { children: s })
                    ] }) : /* @__PURE__ */ o.jsx("b", { children: "–" })
                  }
                ),
                !n && e && /* @__PURE__ */ o.jsxs(
                  "div",
                  {
                    className: "lf-match-detail-mobile-tabs",
                    role: "tablist",
                    "aria-label": "Scegli la formazione",
                    children: [
                      f("home"),
                      f("away")
                    ]
                  }
                )
              ] }),
              n && /* @__PURE__ */ o.jsxs("div", { className: "lf-match-detail-state", children: [
                /* @__PURE__ */ o.jsx("div", { className: "lf-spinner" }),
                /* @__PURE__ */ o.jsx("p", { children: "Caricamento di formazioni, voti e sostituzioni…" })
              ] }),
              !n && t && /* @__PURE__ */ o.jsxs("div", { className: "lf-match-detail-state is-error", children: [
                /* @__PURE__ */ o.jsx("strong", { children: "Confronto non disponibile" }),
                /* @__PURE__ */ o.jsx("p", { children: t })
              ] }),
              !n && e && /* @__PURE__ */ o.jsxs("div", { className: `lf-match-detail-grid is-mobile-${a}`, children: [
                /* @__PURE__ */ o.jsx(Va, { side: "home", team: e.matchup.home, resolvePlayer: l }),
                /* @__PURE__ */ o.jsx(Va, { side: "away", team: e.matchup.away, resolvePlayer: l })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function $r(e) {
  return ne(e);
}
function Wa(e, t) {
  if (!e || typeof e != "object")
    return;
  const n = e;
  return {
    matched: !!n.matched,
    displayName: V(n.displayName ?? t),
    role: String(n.role ?? "").trim().toUpperCase(),
    realTeam: V(n.realTeam ?? ""),
    assetCode: String(n.assetCode ?? "").trim(),
    confidence: typeof n.confidence == "number" ? n.confidence : void 0,
    source: typeof n.source == "string" ? n.source : void 0
  };
}
function Qa(e) {
  if (typeof e == "string") {
    const i = V(e), s = i.match(/\(s(\+)?\)/i), a = s ? s[1] ? "plus" : "base" : null, u = i.replace(/\(s\+?\)/gi, "").trim();
    return {
      raw: i,
      name: u,
      vote: null,
      displayVote: null,
      status: null,
      captain: !1,
      switchPlayer: !!a,
      switchType: a
    };
  }
  const t = e && typeof e == "object" ? e : {}, n = !!t.switchPlayer, r = t.switchType === "plus" ? "plus" : t.switchType === "base" || n ? "base" : null, l = t.replacement ? {
    name: V(t.replacement.name),
    vote: t.replacement.vote ?? null,
    displayVote: t.replacement.displayVote ?? null,
    snapshotKey: t.replacement.snapshotKey,
    identity: Wa(t.replacement.identity, t.replacement.name)
  } : void 0;
  return {
    raw: V(t.raw ?? t.name ?? ""),
    name: V(t.name ?? t.raw ?? ""),
    vote: t.vote ?? null,
    displayVote: t.displayVote ?? null,
    status: t.status ?? null,
    captain: !!t.captain,
    switchPlayer: !!r,
    switchType: r,
    snapshotKey: t.snapshotKey,
    identity: Wa(t.identity, t.name ?? t.raw ?? ""),
    ...l ? { replacement: l } : {}
  };
}
function Ga(e) {
  return {
    team: V((e == null ? void 0 : e.team) ?? ""),
    alias: V((e == null ? void 0 : e.alias) ?? ""),
    starters: Array.isArray(e == null ? void 0 : e.starters) ? e.starters.map(Qa) : [],
    total: (e == null ? void 0 : e.total) ?? null,
    playersCount: (e == null ? void 0 : e.playersCount) ?? null,
    bench: Array.isArray(e == null ? void 0 : e.bench) ? e.bench.map(Qa) : []
  };
}
function Wm(e) {
  return {
    homeTeam: V((e == null ? void 0 : e.homeTeam) ?? ""),
    awayTeam: V((e == null ? void 0 : e.awayTeam) ?? ""),
    home: Ga(e == null ? void 0 : e.home),
    away: Ga(e == null ? void 0 : e.away)
  };
}
function Ka(e) {
  return {
    title: V((e == null ? void 0 : e.title) ?? "Giornata"),
    sourceUrl: (e == null ? void 0 : e.sourceUrl) ?? "",
    fantasyMatchdayNumber: (e == null ? void 0 : e.fantasyMatchdayNumber) ?? 0,
    matchup: Wm(e == null ? void 0 : e.matchup)
  };
}
function Qm(e, t, n, r) {
  const l = $r(n), i = $r(r);
  return e.matches.find((a) => $r(a.homeTeam) === l && $r(a.awayTeam) === i) ?? e.matches[t] ?? null;
}
async function Gm(e) {
  const t = new URLSearchParams({
    league: e.leagueId,
    day: String(e.fantasyMatchdayNumber),
    match: String(e.matchIndex),
    home: e.homeTeam,
    away: e.awayTeam,
    v: String(Date.now())
  });
  try {
    const n = await Fa(
      `/api/matchday?${t.toString()}`,
      e.signal
    );
    return Ka(n);
  } catch (n) {
    if (e.signal.aborted || !vd(window.location.hostname))
      throw n;
    const r = `/data/${e.leagueId}/matchdays/${e.fantasyMatchdayNumber}.json`, l = await Fa(
      r,
      e.signal
    ), i = Qm(
      l,
      e.matchIndex,
      e.homeTeam,
      e.awayTeam
    );
    if (!i)
      throw n;
    return Ka({
      title: l.title,
      sourceUrl: l.sourceUrl,
      fantasyMatchdayNumber: l.fantasyMatchdayNumber,
      matchup: i
    });
  }
}
const Ni = Ht("matchday-detail");
function Km(e) {
  const [t, n] = L.useState("idle"), [r, l] = L.useState(null), [i, s] = L.useState(""), a = L.useRef(null), u = L.useRef("");
  L.useEffect(() => {
    const { selectedMatch: f, selectedMatchday: h, selectedLink: v } = e;
    if (!f || !h || !v)
      return;
    const x = [
      e.leagueId,
      h.fantasyMatchdayNumber,
      f.index,
      f.homeTeam,
      f.awayTeam,
      v.url
    ].join(":"), g = a.current !== x, w = new AbortController();
    return g && (n("loading"), l(null), s("")), Gm({
      leagueId: e.leagueId,
      fantasyMatchdayNumber: h.fantasyMatchdayNumber,
      matchIndex: f.index,
      homeTeam: f.homeTeam,
      awayTeam: f.awayTeam,
      signal: w.signal
    }).then((j) => {
      if (w.signal.aborted)
        return;
      a.current = x;
      const p = JSON.stringify(j), d = u.current !== p;
      d && (u.current = p, l(j)), s(""), n("ready"), Ni.debug("loaded", { key: x, changed: d });
    }).catch((j) => {
      if (!w.signal.aborted) {
        if (Ni.error("load failed", j), !g) {
          Ni.warn("refresh failed; keeping last valid detail");
          return;
        }
        s(
          "Il documento esiste, ma il dettaglio non è stato letto correttamente."
        ), n("error");
      }
    }), () => w.abort();
  }, [
    e.leagueId,
    e.refreshToken,
    e.selectedLink,
    e.selectedMatch,
    e.selectedMatchday
  ]);
  function c() {
    a.current = null, u.current = "", n("idle"), l(null), s("");
  }
  return { status: t, detail: r, error: i, reset: c };
}
function wd(e) {
  return [...e].sort((t, n) => t.realRoundNumber - n.realRoundNumber || t.fantasyMatchdayNumber - n.fantasyMatchdayNumber);
}
function Ya(e, t) {
  var l, i;
  const n = wd(e), r = t === null ? void 0 : n.find((s) => s.fantasyMatchdayNumber === t);
  return r ? r.realRoundNumber : ((l = n.find((s) => s.status === "da_calcolare")) == null ? void 0 : l.realRoundNumber) ?? ((i = n[n.length - 1]) == null ? void 0 : i.realRoundNumber) ?? 0;
}
function Ym({
  competitionLabel: e,
  leagueId: t,
  leagueName: n,
  matchdays: r,
  registry: l,
  assets: i,
  detailRefreshToken: s
}) {
  const a = L.useMemo(() => Rm(i), [i]), u = L.useMemo(() => wd(r), [r]), [c, f] = L.useState(
    () => Ya(u, l.activeFantasyMatchday)
  ), [h, v] = L.useState(null), x = L.useRef(void 0);
  L.useEffect(() => {
    const m = x.current !== l.activeFantasyMatchday;
    x.current = l.activeFantasyMatchday;
    const y = l.activeFantasyMatchday === null ? void 0 : u.find((N) => N.fantasyMatchdayNumber === l.activeFantasyMatchday);
    if (m && y) {
      f(y.realRoundNumber);
      return;
    }
    f((N) => u.some((k) => k.realRoundNumber === N) ? N : Ya(u, l.activeFantasyMatchday));
  }, [u, l.activeFantasyMatchday]);
  const g = L.useMemo(
    () => u.findIndex((m) => m.realRoundNumber === c),
    [u, c]
  ), w = g >= 0 ? u[g] : void 0, j = w ? l.matchdays.get(w.fantasyMatchdayNumber) : void 0, p = Km({
    leagueId: t,
    selectedMatch: h,
    selectedMatchday: w,
    selectedLink: j,
    refreshToken: s
  });
  function d() {
    v(null), p.reset();
  }
  return u.length === 0 ? /* @__PURE__ */ o.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-calendar-state", children: [
    /* @__PURE__ */ o.jsx("strong", { children: "Calendario non ancora disponibile" }),
    /* @__PURE__ */ o.jsxs("p", { children: [
      "La fonte di ",
      n,
      " non è stata ancora configurata."
    ] })
  ] }) }) : w ? /* @__PURE__ */ o.jsxs("div", { className: "lf-calendar-shell", children: [
    /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-calendar-card", children: [
      /* @__PURE__ */ o.jsx(
        Im,
        {
          competitionLabel: e,
          matchdays: u,
          selectedIndex: g,
          selected: w,
          onSelect: f
        }
      ),
      /* @__PURE__ */ o.jsx("div", { className: "lf-calendar-summary", children: /* @__PURE__ */ o.jsx("div", { className: "lf-calendar-status-wrap", children: /* @__PURE__ */ o.jsx("span", { className: `lf-calendar-status lf-calendar-status--${w.status}`, children: w.status === "calcolata" ? "Calcolata" : "Da calcolare" }) }) }),
      /* @__PURE__ */ o.jsx("div", { className: "lf-calendar-matches", children: w.matches.map((m, y) => /* @__PURE__ */ o.jsx(
        Dm,
        {
          match: m,
          index: y,
          fantasyMatchdayNumber: w.fantasyMatchdayNumber,
          interactive: !!j,
          onSelect: v
        },
        `${w.fantasyMatchdayNumber}-${m.homeTeam}-${m.awayTeam}-${y}`
      )) }),
      j && /* @__PURE__ */ o.jsxs("div", { className: "lf-calendar-source-link-wrap", children: [
        /* @__PURE__ */ o.jsx("span", { children: "Clicca uno scontro per vedere formazioni, voti e sostituzioni." }),
        /* @__PURE__ */ o.jsxs("a", { href: j.url, target: "_blank", rel: "noopener noreferrer", children: [
          "Documento completo",
          /* @__PURE__ */ o.jsx("span", { "aria-hidden": "true", children: "↗" })
        ] })
      ] })
    ] }),
    h && j && /* @__PURE__ */ o.jsx(
      Vm,
      {
        detail: p.detail,
        error: p.error,
        loading: p.status === "loading",
        resolvePlayer: a,
        homeGoals: h.homeGoals,
        awayGoals: h.awayGoals,
        onClose: d
      }
    )
  ] }) : null;
}
function xd(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Xm(e) {
  const t = e.trim();
  return t.startsWith("https://") || t.startsWith("http://") || t.startsWith("/");
}
function qm(e) {
  if (!xd(e))
    return /* @__PURE__ */ new Map();
  const t = /* @__PURE__ */ new Map();
  for (const [n, r] of Object.entries(e)) {
    const l = Number(n);
    if (!Number.isInteger(l) || l <= 0)
      continue;
    const i = typeof r == "string" ? r.trim() : String((r == null ? void 0 : r.url) ?? "").trim();
    if (!i || !Xm(i))
      continue;
    const s = typeof r == "object" && r !== null ? String(r.label ?? "").trim() : "";
    t.set(l, {
      fantasyMatchdayNumber: l,
      url: i,
      label: s || "Apri documento originale"
    });
  }
  return t;
}
function Zm(e, t) {
  const n = JSON.parse(String(e ?? "{}")), r = n == null ? void 0 : n[t];
  if (!xd(r))
    return { activeFantasyMatchday: null, matchdays: /* @__PURE__ */ new Map() };
  const l = r, i = Object.prototype.hasOwnProperty.call(l, "matchdays") || Object.prototype.hasOwnProperty.call(l, "activeFantasyMatchday"), s = Number(l.activeFantasyMatchday);
  return {
    activeFantasyMatchday: Number.isInteger(s) && s > 0 ? s : null,
    matchdays: qm(i ? l.matchdays : r)
  };
}
const Ar = Ht("calendar"), Xa = {
  activeFantasyMatchday: null,
  matchdays: /* @__PURE__ */ new Map()
};
function Jm() {
  var N, k, E, _, C, z;
  const { assets: e } = go(), t = (N = window.LINEUP_FANTA) == null ? void 0 : N.league, n = (t == null ? void 0 : t.id) ?? "fp", r = ((k = t == null ? void 0 : t.leagueData) == null ? void 0 : k.calendarCsvUrl) ?? "", l = ((E = t == null ? void 0 : t.leagueData) == null ? void 0 : E.calendarDocUrl) ?? "", i = ((_ = t == null ? void 0 : t.leagueData) == null ? void 0 : _.calendarExpectedMatches) ?? 4, s = ((C = t == null ? void 0 : t.leagueData) == null ? void 0 : C.matchdayLinksUrl) ?? `/api/league-data?league=${encodeURIComponent(n)}&resource=matchdays`, a = ((z = t == null ? void 0 : t.leagueData) == null ? void 0 : z.calendarCompetitionLabel) ?? (n === "pd" ? "Liga" : "Premier League"), [u, c] = L.useState("loading"), [f, h] = L.useState([]), [v, x] = L.useState(Xa), [g, w] = L.useState(""), j = L.useRef(!1), p = L.useRef(""), d = L.useRef(""), m = yo("calendario");
  L.useEffect(() => {
    const O = new AbortController();
    async function Ue() {
      if (!l && !r) {
        h([]), x(Xa), c("ready");
        return;
      }
      !j.current && c("loading"), w("");
      try {
        let xe;
        const Vt = `/api/calendar?league=${encodeURIComponent(n)}`;
        try {
          xe = await Hn(Vt, O.signal);
        } catch (ue) {
          if (!vd(window.location.hostname) || !r || O.signal.aborted)
            throw ue;
          Ar.warn("live API unavailable; using local snapshot", ue), xe = await Hn(r, O.signal);
        }
        if (xe !== p.current) {
          const ue = Mm(xe, i);
          if (ue.length === 0 && j.current)
            throw new Error("Aggiornamento vuoto del Calendario");
          p.current = xe, h(ue);
        }
        try {
          const ue = await Hn(s, O.signal);
          ue !== d.current && (d.current = ue, x(Zm(ue, n)));
        } catch (ue) {
          if (O.signal.aborted)
            return;
          Ar.warn("matchday registry unavailable", ue);
        }
        j.current = !0, c("ready");
      } catch (xe) {
        if (O.signal.aborted)
          return;
        if (Ar.error("load failed", xe), j.current) {
          Ar.warn("refresh failed; keeping last valid calendar");
          return;
        }
        w("Il Calendario non è disponibile. Controlla la fonte configurata e riprova."), c("error");
      }
    }
    return Ue(), () => O.abort();
  }, [l, r, i, n, s, m]);
  const y = L.useMemo(() => (t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.name) ?? "Lega", [t]);
  return u === "loading" ? /* @__PURE__ */ o.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-calendar-state", children: [
    /* @__PURE__ */ o.jsx("div", { className: "lf-spinner" }),
    /* @__PURE__ */ o.jsx("p", { children: "Caricamento del Calendario…" })
  ] }) }) : u === "error" ? /* @__PURE__ */ o.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-calendar-state lf-calendar-state--error", children: [
    /* @__PURE__ */ o.jsx("strong", { children: "Errore nel caricamento" }),
    /* @__PURE__ */ o.jsx("p", { children: g })
  ] }) }) : /* @__PURE__ */ o.jsx(
    Ym,
    {
      competitionLabel: a,
      leagueId: n,
      leagueName: y,
      matchdays: f,
      registry: v,
      assets: e,
      detailRefreshToken: m
    }
  );
}
function bm(e) {
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
function cn(e) {
  return String(e ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}
function Ur(e) {
  return cn(e).replace(/[‐‑‒–—]/g, "-").replace(/\s*-\s*/g, "-").replace(/[^a-z0-9-]/g, "");
}
function br(e) {
  const t = String(e ?? "").trim().replace(/\s+/g, "").replace(",", ".");
  if (!t)
    return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}
function _t(e) {
  const t = br(e);
  return t === null ? null : Math.trunc(t);
}
function me(e, t, n = 0) {
  const r = cn(t);
  for (let l = n; l < e.length; l += 1)
    if (cn(e[l]) === r)
      return l;
  return -1;
}
function eh(e) {
  const t = bm(e), n = [
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
    (g) => n.every((w) => me(g, w) >= 0)
  );
  if (r < 0)
    throw new Error("Il CSV Classifica non contiene le colonne richieste.");
  const l = t[r], i = {
    name: me(l, "Nome"),
    points: me(l, "Punti"),
    wins: me(l, "Vittorie"),
    draws: me(l, "Pareggi"),
    losses: me(l, "Sconfitte"),
    goalsFor: me(l, "Gol Fatti"),
    goalsAgainst: me(l, "Gol Subiti"),
    goalDifference: me(l, "Differenza Reti"),
    fantasyPoints: me(l, "Fanta Punti")
  }, s = [];
  for (const g of t.slice(r + 1)) {
    const w = String(g[i.name] ?? "").trim();
    if (g.map(cn).join("|").includes("classifica per fp"))
      break;
    if (!w)
      continue;
    const p = _t(g[i.points]), d = _t(g[i.wins]), m = _t(g[i.draws]), y = _t(g[i.losses]), N = _t(g[i.goalsFor]), k = _t(g[i.goalsAgainst]), E = _t(g[i.goalDifference]), _ = br(g[i.fantasyPoints]);
    p === null || d === null || m === null || y === null || N === null || k === null || _ === null || s.push({
      team: w,
      points: p,
      wins: d,
      draws: m,
      losses: y,
      goalsFor: N,
      goalsAgainst: k,
      goalDifference: E ?? N - k,
      fantasyPoints: _,
      played: d + m + y
    });
  }
  const a = t.findIndex(
    (g) => g.some((w) => cn(w) === "classifica per fp")
  ), u = /* @__PURE__ */ new Map(), c = [];
  if (a >= 0) {
    const g = t.findIndex((w, j) => {
      if (j <= a)
        return !1;
      const p = w.map(cn);
      return p.filter((d) => d === "nome").length >= 2 && p.includes("fanta punti") && p.includes("penalita");
    });
    if (g >= 0) {
      const w = t[g], j = me(w, "Nome"), p = me(w, "Fanta Punti", j + 1), d = me(w, "Nome", p + 1), m = me(w, "Penalità", d + 1);
      for (const y of t.slice(g + 1)) {
        const N = String(y[j] ?? "").trim(), k = br(y[p]);
        N && k !== null && c.push({ team: N, fantasyPoints: k });
        const E = String(y[d] ?? "").trim(), _ = br(y[m]);
        E && _ !== null && _ > 0 && u.set(Ur(E), _);
      }
    }
  }
  const f = s.map((g, w) => ({
    ...g,
    position: w + 1,
    penalty: u.get(Ur(g.team)) ?? 0
  })), h = new Map(
    f.map((g) => [Ur(g.team), g])
  ), x = (c.length > 0 ? c : f.map((g) => ({ team: g.team, fantasyPoints: g.fantasyPoints })).sort((g, w) => w.fantasyPoints - g.fantasyPoints)).map((g, w) => {
    var j;
    return {
      position: w + 1,
      team: g.team,
      fantasyPoints: g.fantasyPoints,
      leaguePosition: ((j = h.get(Ur(g.team))) == null ? void 0 : j.position) ?? null
    };
  });
  return { league: f, fantasy: x };
}
function Ss(e) {
  return new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(e) ? 0 : 1
  }).format(e);
}
function th(e) {
  return e > 0 ? `+${e}` : String(e);
}
function qa({ team: e, penalty: t = 0 }) {
  const n = e.trim().charAt(0).toUpperCase() || "?";
  return /* @__PURE__ */ o.jsxs("div", { className: "lf-standings-team-cell", children: [
    /* @__PURE__ */ o.jsx("span", { className: "lf-standings-team-mark", "aria-hidden": "true", children: n }),
    /* @__PURE__ */ o.jsx("strong", { children: e }),
    t > 0 && /* @__PURE__ */ o.jsxs("span", { className: "lf-standings-penalty", title: `Penalizzazione di ${t} punti`, children: [
      "−",
      Ss(t)
    ] })
  ] });
}
function nh(e, t) {
  return t ? [...e].sort((n, r) => (t.direction === "desc" ? r[t.key] - n[t.key] : n[t.key] - r[t.key]) || n.position - r.position) : e;
}
function Za({
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
function rh({ data: e, leagueName: t }) {
  const [n, r] = L.useState("league"), [l, i] = L.useState(null), s = L.useMemo(
    () => nh(e.league, l),
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
        /* @__PURE__ */ o.jsx(Za, { label: "GF", sortKey: "goalsFor", sort: l, onSort: a }),
        /* @__PURE__ */ o.jsx(Za, { label: "GS", sortKey: "goalsAgainst", sort: l, onSort: a }),
        /* @__PURE__ */ o.jsx("th", { scope: "col", children: "DR" }),
        /* @__PURE__ */ o.jsx("th", { scope: "col", children: "FP" })
      ] }) }),
      /* @__PURE__ */ o.jsx("tbody", { children: s.map((u, c) => {
        const f = l ? c + 1 : u.position;
        return /* @__PURE__ */ o.jsxs("tr", { className: f <= 3 ? `is-top-${f}` : "", children: [
          /* @__PURE__ */ o.jsx("td", { className: "lf-standings-rank-col", children: /* @__PURE__ */ o.jsx("b", { children: f }) }),
          /* @__PURE__ */ o.jsx("td", { className: "lf-standings-team-col", children: /* @__PURE__ */ o.jsx(qa, { team: u.team, penalty: u.penalty }) }),
          /* @__PURE__ */ o.jsx("td", { className: "is-points", children: /* @__PURE__ */ o.jsx("strong", { children: u.points }) }),
          /* @__PURE__ */ o.jsx("td", { children: u.played }),
          /* @__PURE__ */ o.jsx("td", { children: u.wins }),
          /* @__PURE__ */ o.jsx("td", { children: u.draws }),
          /* @__PURE__ */ o.jsx("td", { children: u.losses }),
          /* @__PURE__ */ o.jsx("td", { children: u.goalsFor }),
          /* @__PURE__ */ o.jsx("td", { children: u.goalsAgainst }),
          /* @__PURE__ */ o.jsx("td", { className: u.goalDifference > 0 ? "is-positive" : u.goalDifference < 0 ? "is-negative" : "", children: th(u.goalDifference) }),
          /* @__PURE__ */ o.jsx("td", { children: Ss(u.fantasyPoints) })
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
        /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsx(qa, { team: u.team }) }),
        /* @__PURE__ */ o.jsx("td", { className: "is-fantasy-points", children: /* @__PURE__ */ o.jsx("strong", { children: Ss(u.fantasyPoints) }) })
      ] }, u.team)) })
    ] }) })
  ] }) });
}
const Ja = { league: [], fantasy: [] }, ji = Ht("standings");
function lh() {
  var x, g, w;
  const e = (x = window.LINEUP_FANTA) == null ? void 0 : x.league, t = ((g = e == null ? void 0 : e.leagueData) == null ? void 0 : g.standingsCsvUrl) ?? "", n = ((w = e == null ? void 0 : e.leagueData) == null ? void 0 : w.standingsFallbackUrl) ?? "", [r, l] = L.useState("loading"), [i, s] = L.useState(Ja), [a, u] = L.useState(""), c = L.useRef(!1), f = L.useRef(""), h = yo("classifica");
  L.useEffect(() => {
    const j = new AbortController();
    async function p() {
      if (!t) {
        s(Ja), l("ready");
        return;
      }
      !c.current && l("loading"), u("");
      try {
        let m;
        try {
          m = await Hn(t, j.signal);
        } catch (y) {
          if (!n || j.signal.aborted)
            throw y;
          ji.warn("primary source unavailable; using fallback", y), m = await Hn(n, j.signal);
        }
        if (m !== f.current) {
          const y = eh(m);
          if (y.league.length === 0 && c.current)
            throw new Error("Aggiornamento vuoto della Classifica");
          f.current = m, s(y);
        }
        c.current = !0, l("ready");
      } catch (m) {
        if (j.signal.aborted)
          return;
        if (ji.error("load failed", m), c.current) {
          ji.warn("refresh failed; keeping last valid standings");
          return;
        }
        u("La Classifica non è disponibile. Controlla la fonte configurata e riprova."), l("error");
      }
    }
    return p(), () => j.abort();
  }, [t, n, h]);
  const v = L.useMemo(() => (e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.name) ?? "Lega", [e]);
  return r === "loading" ? /* @__PURE__ */ o.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-standings-state", children: [
    /* @__PURE__ */ o.jsx("div", { className: "lf-spinner" }),
    /* @__PURE__ */ o.jsx("p", { children: "Caricamento della Classifica…" })
  ] }) }) : r === "error" ? /* @__PURE__ */ o.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-standings-state lf-standings-state--error", children: [
    /* @__PURE__ */ o.jsx("strong", { children: "Errore nel caricamento" }),
    /* @__PURE__ */ o.jsx("p", { children: a })
  ] }) }) : /* @__PURE__ */ o.jsx(rh, { data: i, leagueName: v });
}
const ih = Ht("react-boundary");
class sh extends au.Component {
  constructor() {
    super(...arguments);
    hr(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    ih.error(`${this.props.name} crashed`, { error: n, componentStack: r.componentStack });
  }
  render() {
    return this.state.error ? /* @__PURE__ */ o.jsxs("section", { className: "lf-dashboard-card lf-runtime-error", role: "alert", children: [
      /* @__PURE__ */ o.jsx("strong", { children: "Questa sezione non è stata caricata." }),
      /* @__PURE__ */ o.jsxs("p", { children: [
        "Ricarica la pagina. Con ",
        /* @__PURE__ */ o.jsx("code", { children: "?debug=1" }),
        " trovi più dettagli nella console."
      ] }),
      /* @__PURE__ */ o.jsx("button", { type: "button", onClick: () => window.location.reload(), children: "Ricarica" })
    ] }) : this.props.children;
  }
}
const _l = Ht("bootstrap");
function Wl(e, t, n) {
  const r = document.getElementById(e);
  if (!r) {
    _l.debug("root not present", { rootId: e, name: t });
    return;
  }
  ki.createRoot(r).render(
    /* @__PURE__ */ o.jsx(au.StrictMode, { children: /* @__PURE__ */ o.jsx(sh, { name: t, children: n }) })
  ), _l.debug("mounted", { rootId: e, name: t });
}
window.addEventListener("error", (e) => {
  _l.error("unhandled window error", e.error ?? e.message);
});
window.addEventListener("unhandledrejection", (e) => {
  _l.error("unhandled promise rejection", e.reason);
});
Wl("league-dashboard-root", "Listone", /* @__PURE__ */ o.jsx(cm, {}));
Wl("league-rose-root", "Rose", /* @__PURE__ */ o.jsx(km, {}));
Wl("league-calendar-root", "Calendario", /* @__PURE__ */ o.jsx(Jm, {}));
Wl("league-standings-root", "Classifica", /* @__PURE__ */ o.jsx(lh, {}));
