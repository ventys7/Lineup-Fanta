function dd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ka = { exports: {} }, kl = {}, Ya = { exports: {} }, F = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ar = Symbol.for("react.element"), fd = Symbol.for("react.portal"), pd = Symbol.for("react.fragment"), md = Symbol.for("react.strict_mode"), hd = Symbol.for("react.profiler"), vd = Symbol.for("react.provider"), gd = Symbol.for("react.context"), yd = Symbol.for("react.forward_ref"), wd = Symbol.for("react.suspense"), xd = Symbol.for("react.memo"), Sd = Symbol.for("react.lazy"), ps = Symbol.iterator;
function Nd(e) {
  return e === null || typeof e != "object" ? null : (e = ps && e[ps] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Xa = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, qa = Object.assign, Za = {};
function yn(e, t, n) {
  this.props = e, this.context = t, this.refs = Za, this.updater = n || Xa;
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
function Ja() {
}
Ja.prototype = yn.prototype;
function vo(e, t, n) {
  this.props = e, this.context = t, this.refs = Za, this.updater = n || Xa;
}
var go = vo.prototype = new Ja();
go.constructor = vo;
qa(go, yn.prototype);
go.isPureReactComponent = !0;
var ms = Array.isArray, ba = Object.prototype.hasOwnProperty, yo = { current: null }, eu = { key: !0, ref: !0, __self: !0, __source: !0 };
function tu(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null)
    for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t)
      ba.call(t, r) && !eu.hasOwnProperty(r) && (l[r] = t[r]);
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
  return { $$typeof: ar, type: e, key: i, ref: o, props: l, _owner: yo.current };
}
function jd(e, t) {
  return { $$typeof: ar, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function wo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ar;
}
function kd(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var hs = /\/+/g;
function Vl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? kd("" + e.key) : t.toString(36);
}
function $r(e, t, n, r, l) {
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
          case ar:
          case fd:
            o = !0;
        }
    }
  if (o)
    return o = e, l = l(o), e = r === "" ? "." + Vl(o, 0) : r, ms(l) ? (n = "", e != null && (n = e.replace(hs, "$&/") + "/"), $r(l, t, n, "", function(c) {
      return c;
    })) : l != null && (wo(l) && (l = jd(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(hs, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", ms(e))
    for (var a = 0; a < e.length; a++) {
      i = e[a];
      var u = r + Vl(i, a);
      o += $r(i, t, n, u, l);
    }
  else if (u = Nd(e), typeof u == "function")
    for (e = u.call(e), a = 0; !(i = e.next()).done; )
      i = i.value, u = r + Vl(i, a++), o += $r(i, t, n, u, l);
  else if (i === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function vr(e, t, n) {
  if (e == null)
    return e;
  var r = [], l = 0;
  return $r(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function Cd(e) {
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
var he = { current: null }, Ur = { transition: null }, Ed = { ReactCurrentDispatcher: he, ReactCurrentBatchConfig: Ur, ReactCurrentOwner: yo };
F.Children = { map: vr, forEach: function(e, t, n) {
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
  if (!wo(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
F.Component = yn;
F.Fragment = pd;
F.Profiler = hd;
F.PureComponent = vo;
F.StrictMode = md;
F.Suspense = wd;
F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ed;
F.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = qa({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = yo.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps)
      var a = e.type.defaultProps;
    for (u in t)
      ba.call(t, u) && !eu.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
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
  return { $$typeof: ar, type: e.type, key: l, ref: i, props: r, _owner: o };
};
F.createContext = function(e) {
  return e = { $$typeof: gd, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: vd, _context: e }, e.Consumer = e;
};
F.createElement = tu;
F.createFactory = function(e) {
  var t = tu.bind(null, e);
  return t.type = e, t;
};
F.createRef = function() {
  return { current: null };
};
F.forwardRef = function(e) {
  return { $$typeof: yd, render: e };
};
F.isValidElement = wo;
F.lazy = function(e) {
  return { $$typeof: Sd, _payload: { _status: -1, _result: e }, _init: Cd };
};
F.memo = function(e, t) {
  return { $$typeof: xd, type: e, compare: t === void 0 ? null : t };
};
F.startTransition = function(e) {
  var t = Ur.transition;
  Ur.transition = {};
  try {
    e();
  } finally {
    Ur.transition = t;
  }
};
F.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
F.useCallback = function(e, t) {
  return he.current.useCallback(e, t);
};
F.useContext = function(e) {
  return he.current.useContext(e);
};
F.useDebugValue = function() {
};
F.useDeferredValue = function(e) {
  return he.current.useDeferredValue(e);
};
F.useEffect = function(e, t) {
  return he.current.useEffect(e, t);
};
F.useId = function() {
  return he.current.useId();
};
F.useImperativeHandle = function(e, t, n) {
  return he.current.useImperativeHandle(e, t, n);
};
F.useInsertionEffect = function(e, t) {
  return he.current.useInsertionEffect(e, t);
};
F.useLayoutEffect = function(e, t) {
  return he.current.useLayoutEffect(e, t);
};
F.useMemo = function(e, t) {
  return he.current.useMemo(e, t);
};
F.useReducer = function(e, t, n) {
  return he.current.useReducer(e, t, n);
};
F.useRef = function(e) {
  return he.current.useRef(e);
};
F.useState = function(e) {
  return he.current.useState(e);
};
F.useSyncExternalStore = function(e, t, n) {
  return he.current.useSyncExternalStore(e, t, n);
};
F.useTransition = function() {
  return he.current.useTransition();
};
F.version = "18.2.0";
Ya.exports = F;
var z = Ya.exports;
const Cl = /* @__PURE__ */ dd(z);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _d = z, Td = Symbol.for("react.element"), Pd = Symbol.for("react.fragment"), zd = Object.prototype.hasOwnProperty, Ld = _d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Md = { key: !0, ref: !0, __self: !0, __source: !0 };
function nu(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t)
    zd.call(t, r) && !Md.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t)
      l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Td, type: e, key: i, ref: o, props: l, _owner: Ld.current };
}
kl.Fragment = Pd;
kl.jsx = nu;
kl.jsxs = nu;
Ka.exports = kl;
var s = Ka.exports, cn = {}, ru = { exports: {} }, _e = {}, lu = { exports: {} }, iu = {};
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
  function t(P, M) {
    var D = P.length;
    P.push(M);
    e:
      for (; 0 < D; ) {
        var X = D - 1 >>> 1, te = P[X];
        if (0 < l(te, M))
          P[X] = M, P[D] = te, D = X;
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
    var M = P[0], D = P.pop();
    if (D !== M) {
      P[0] = D;
      e:
        for (var X = 0, te = P.length, mr = te >>> 1; X < mr; ) {
          var Ct = 2 * (X + 1) - 1, Bl = P[Ct], Et = Ct + 1, hr = P[Et];
          if (0 > l(Bl, D))
            Et < te && 0 > l(hr, Bl) ? (P[X] = hr, P[Et] = D, X = Et) : (P[X] = Bl, P[Ct] = D, X = Ct);
          else if (Et < te && 0 > l(hr, D))
            P[X] = hr, P[Et] = D, X = Et;
          else
            break e;
        }
    }
    return M;
  }
  function l(P, M) {
    var D = P.sortIndex - M.sortIndex;
    return D !== 0 ? D : P.id - M.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var o = Date, a = o.now();
    e.unstable_now = function() {
      return o.now() - a;
    };
  }
  var u = [], c = [], f = 1, h = null, v = 3, x = !1, g = !1, w = !1, L = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(P) {
    for (var M = n(c); M !== null; ) {
      if (M.callback === null)
        r(c);
      else if (M.startTime <= P)
        r(c), M.sortIndex = M.expirationTime, t(u, M);
      else
        break;
      M = n(c);
    }
  }
  function y(P) {
    if (w = !1, m(P), !g)
      if (n(u) !== null)
        g = !0, fe(j);
      else {
        var M = n(c);
        M !== null && pr(y, M.startTime - P);
      }
  }
  function j(P, M) {
    g = !1, w && (w = !1, p(k), k = -1), x = !0;
    var D = v;
    try {
      for (m(M), h = n(u); h !== null && (!(h.expirationTime > M) || P && !R()); ) {
        var X = h.callback;
        if (typeof X == "function") {
          h.callback = null, v = h.priorityLevel;
          var te = X(h.expirationTime <= M);
          M = e.unstable_now(), typeof te == "function" ? h.callback = te : h === n(u) && r(u), m(M);
        } else
          r(u);
        h = n(u);
      }
      if (h !== null)
        var mr = !0;
      else {
        var Ct = n(c);
        Ct !== null && pr(y, Ct.startTime - M), mr = !1;
      }
      return mr;
    } finally {
      h = null, v = D, x = !1;
    }
  }
  var E = !1, _ = null, k = -1, C = 5, S = -1;
  function R() {
    return !(e.unstable_now() - S < C);
  }
  function B() {
    if (_ !== null) {
      var P = e.unstable_now();
      S = P;
      var M = !0;
      try {
        M = _(!0, P);
      } finally {
        M ? H() : (E = !1, _ = null);
      }
    } else
      E = !1;
  }
  var H;
  if (typeof d == "function")
    H = function() {
      d(B);
    };
  else if (typeof MessageChannel < "u") {
    var Z = new MessageChannel(), Vt = Z.port2;
    Z.port1.onmessage = B, H = function() {
      Vt.postMessage(null);
    };
  } else
    H = function() {
      L(B, 0);
    };
  function fe(P) {
    _ = P, E || (E = !0, H());
  }
  function pr(P, M) {
    k = L(function() {
      P(e.unstable_now());
    }, M);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(P) {
    P.callback = null;
  }, e.unstable_continueExecution = function() {
    g || x || (g = !0, fe(j));
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
        var M = 3;
        break;
      default:
        M = v;
    }
    var D = v;
    v = M;
    try {
      return P();
    } finally {
      v = D;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(P, M) {
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
    var D = v;
    v = P;
    try {
      return M();
    } finally {
      v = D;
    }
  }, e.unstable_scheduleCallback = function(P, M, D) {
    var X = e.unstable_now();
    switch (typeof D == "object" && D !== null ? (D = D.delay, D = typeof D == "number" && 0 < D ? X + D : X) : D = X, P) {
      case 1:
        var te = -1;
        break;
      case 2:
        te = 250;
        break;
      case 5:
        te = 1073741823;
        break;
      case 4:
        te = 1e4;
        break;
      default:
        te = 5e3;
    }
    return te = D + te, P = { id: f++, callback: M, priorityLevel: P, startTime: D, expirationTime: te, sortIndex: -1 }, D > X ? (P.sortIndex = D, t(c, P), n(u) === null && P === n(c) && (w ? (p(k), k = -1) : w = !0, pr(y, D - X))) : (P.sortIndex = te, t(u, P), g || x || (g = !0, fe(j))), P;
  }, e.unstable_shouldYield = R, e.unstable_wrapCallback = function(P) {
    var M = v;
    return function() {
      var D = v;
      v = M;
      try {
        return P.apply(this, arguments);
      } finally {
        v = D;
      }
    };
  };
})(iu);
lu.exports = iu;
var Rd = lu.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ou = z, Ee = Rd;
function N(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var su = /* @__PURE__ */ new Set(), Hn = {};
function Ut(e, t) {
  dn(e, t), dn(e + "Capture", t);
}
function dn(e, t) {
  for (Hn[e] = t, e = 0; e < t.length; e++)
    su.add(t[e]);
}
var be = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), wi = Object.prototype.hasOwnProperty, Dd = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, vs = {}, gs = {};
function Fd(e) {
  return wi.call(gs, e) ? !0 : wi.call(vs, e) ? !1 : Dd.test(e) ? gs[e] = !0 : (vs[e] = !0, !1);
}
function Id(e, t, n, r) {
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
function Od(e, t, n, r) {
  if (t === null || typeof t > "u" || Id(e, t, n, r))
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
function ve(e, t, n, r, l, i, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o;
}
var oe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  oe[e] = new ve(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  oe[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  oe[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  oe[e] = new ve(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  oe[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  oe[e] = new ve(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  oe[e] = new ve(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  oe[e] = new ve(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  oe[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var xo = /[\-:]([a-z])/g;
function So(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    xo,
    So
  );
  oe[t] = new ve(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(xo, So);
  oe[t] = new ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(xo, So);
  oe[t] = new ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  oe[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
oe.xlinkHref = new ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  oe[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function No(e, t, n, r) {
  var l = oe.hasOwnProperty(t) ? oe[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Od(t, n, l, r) && (n = null), r || l === null ? Fd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var rt = ou.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, gr = Symbol.for("react.element"), Wt = Symbol.for("react.portal"), Qt = Symbol.for("react.fragment"), jo = Symbol.for("react.strict_mode"), xi = Symbol.for("react.profiler"), au = Symbol.for("react.provider"), uu = Symbol.for("react.context"), ko = Symbol.for("react.forward_ref"), Si = Symbol.for("react.suspense"), Ni = Symbol.for("react.suspense_list"), Co = Symbol.for("react.memo"), ot = Symbol.for("react.lazy"), cu = Symbol.for("react.offscreen"), ys = Symbol.iterator;
function Sn(e) {
  return e === null || typeof e != "object" ? null : (e = ys && e[ys] || e["@@iterator"], typeof e == "function" ? e : null);
}
var G = Object.assign, Hl;
function Pn(e) {
  if (Hl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Hl = t && t[1] || "";
    }
  return `
` + Hl + e;
}
var Wl = !1;
function Ql(e, t) {
  if (!e || Wl)
    return "";
  Wl = !0;
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
`), o = l.length - 1, a = i.length - 1; 1 <= o && 0 <= a && l[o] !== i[a]; )
        a--;
      for (; 1 <= o && 0 <= a; o--, a--)
        if (l[o] !== i[a]) {
          if (o !== 1 || a !== 1)
            do
              if (o--, a--, 0 > a || l[o] !== i[a]) {
                var u = `
` + l[o].replace(" at new ", " at ");
                return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
              }
            while (1 <= o && 0 <= a);
          break;
        }
    }
  } finally {
    Wl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Pn(e) : "";
}
function Ad(e) {
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
      return e = Ql(e.type, !1), e;
    case 11:
      return e = Ql(e.type.render, !1), e;
    case 1:
      return e = Ql(e.type, !0), e;
    default:
      return "";
  }
}
function ji(e) {
  if (e == null)
    return null;
  if (typeof e == "function")
    return e.displayName || e.name || null;
  if (typeof e == "string")
    return e;
  switch (e) {
    case Qt:
      return "Fragment";
    case Wt:
      return "Portal";
    case xi:
      return "Profiler";
    case jo:
      return "StrictMode";
    case Si:
      return "Suspense";
    case Ni:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case uu:
        return (e.displayName || "Context") + ".Consumer";
      case au:
        return (e._context.displayName || "Context") + ".Provider";
      case ko:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Co:
        return t = e.displayName || null, t !== null ? t : ji(e.type) || "Memo";
      case ot:
        t = e._payload, e = e._init;
        try {
          return ji(e(t));
        } catch {
        }
    }
  return null;
}
function $d(e) {
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
      return ji(t);
    case 8:
      return t === jo ? "StrictMode" : "Mode";
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
function du(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Ud(e) {
  var t = du(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function yr(e) {
  e._valueTracker || (e._valueTracker = Ud(e));
}
function fu(e) {
  if (!e)
    return !1;
  var t = e._valueTracker;
  if (!t)
    return !0;
  var n = t.getValue(), r = "";
  return e && (r = du(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Jr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ki(e, t) {
  var n = t.checked;
  return G({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function ws(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = xt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function pu(e, t) {
  t = t.checked, t != null && No(e, "checked", t, !1);
}
function Ci(e, t) {
  pu(e, t);
  var n = xt(t.value), r = t.type;
  if (n != null)
    r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Ei(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ei(e, t.type, xt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function xs(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
      return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Ei(e, t, n) {
  (t !== "number" || Jr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var zn = Array.isArray;
function nn(e, t, n, r) {
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
function _i(e, t) {
  if (t.dangerouslySetInnerHTML != null)
    throw Error(N(91));
  return G({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Ss(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null)
        throw Error(N(92));
      if (zn(n)) {
        if (1 < n.length)
          throw Error(N(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: xt(n) };
}
function mu(e, t) {
  var n = xt(t.value), r = xt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Ns(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function hu(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ti(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? hu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var wr, vu = function(e) {
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
var Rn = {
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
}, Bd = ["Webkit", "ms", "Moz", "O"];
Object.keys(Rn).forEach(function(e) {
  Bd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Rn[t] = Rn[e];
  });
});
function gu(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Rn.hasOwnProperty(e) && Rn[e] ? ("" + t).trim() : t + "px";
}
function yu(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, l = gu(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
}
var Vd = G({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Pi(e, t) {
  if (t) {
    if (Vd[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null)
        throw Error(N(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
        throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object")
      throw Error(N(62));
  }
}
function zi(e, t) {
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
var Li = null;
function Eo(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Mi = null, rn = null, ln = null;
function js(e) {
  if (e = dr(e)) {
    if (typeof Mi != "function")
      throw Error(N(280));
    var t = e.stateNode;
    t && (t = zl(t), Mi(e.stateNode, e.type, t));
  }
}
function wu(e) {
  rn ? ln ? ln.push(e) : ln = [e] : rn = e;
}
function xu() {
  if (rn) {
    var e = rn, t = ln;
    if (ln = rn = null, js(e), t)
      for (e = 0; e < t.length; e++)
        js(t[e]);
  }
}
function Su(e, t) {
  return e(t);
}
function Nu() {
}
var Gl = !1;
function ju(e, t, n) {
  if (Gl)
    return e(t, n);
  Gl = !0;
  try {
    return Su(e, t, n);
  } finally {
    Gl = !1, (rn !== null || ln !== null) && (Nu(), xu());
  }
}
function Qn(e, t) {
  var n = e.stateNode;
  if (n === null)
    return null;
  var r = zl(n);
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
    throw Error(N(231, t, typeof n));
  return n;
}
var Ri = !1;
if (be)
  try {
    var Nn = {};
    Object.defineProperty(Nn, "passive", { get: function() {
      Ri = !0;
    } }), window.addEventListener("test", Nn, Nn), window.removeEventListener("test", Nn, Nn);
  } catch {
    Ri = !1;
  }
function Hd(e, t, n, r, l, i, o, a, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (f) {
    this.onError(f);
  }
}
var Dn = !1, br = null, el = !1, Di = null, Wd = { onError: function(e) {
  Dn = !0, br = e;
} };
function Qd(e, t, n, r, l, i, o, a, u) {
  Dn = !1, br = null, Hd.apply(Wd, arguments);
}
function Gd(e, t, n, r, l, i, o, a, u) {
  if (Qd.apply(this, arguments), Dn) {
    if (Dn) {
      var c = br;
      Dn = !1, br = null;
    } else
      throw Error(N(198));
    el || (el = !0, Di = c);
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
function ku(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
      return t.dehydrated;
  }
  return null;
}
function ks(e) {
  if (Bt(e) !== e)
    throw Error(N(188));
}
function Kd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Bt(e), t === null)
      throw Error(N(188));
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
          return ks(l), e;
        if (i === r)
          return ks(l), t;
        i = i.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return)
      n = l, r = i;
    else {
      for (var o = !1, a = l.child; a; ) {
        if (a === n) {
          o = !0, n = l, r = i;
          break;
        }
        if (a === r) {
          o = !0, r = l, n = i;
          break;
        }
        a = a.sibling;
      }
      if (!o) {
        for (a = i.child; a; ) {
          if (a === n) {
            o = !0, n = i, r = l;
            break;
          }
          if (a === r) {
            o = !0, r = i, n = l;
            break;
          }
          a = a.sibling;
        }
        if (!o)
          throw Error(N(189));
      }
    }
    if (n.alternate !== r)
      throw Error(N(190));
  }
  if (n.tag !== 3)
    throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function Cu(e) {
  return e = Kd(e), e !== null ? Eu(e) : null;
}
function Eu(e) {
  if (e.tag === 5 || e.tag === 6)
    return e;
  for (e = e.child; e !== null; ) {
    var t = Eu(e);
    if (t !== null)
      return t;
    e = e.sibling;
  }
  return null;
}
var _u = Ee.unstable_scheduleCallback, Cs = Ee.unstable_cancelCallback, Yd = Ee.unstable_shouldYield, Xd = Ee.unstable_requestPaint, q = Ee.unstable_now, qd = Ee.unstable_getCurrentPriorityLevel, _o = Ee.unstable_ImmediatePriority, Tu = Ee.unstable_UserBlockingPriority, tl = Ee.unstable_NormalPriority, Zd = Ee.unstable_LowPriority, Pu = Ee.unstable_IdlePriority, El = null, Qe = null;
function Jd(e) {
  if (Qe && typeof Qe.onCommitFiberRoot == "function")
    try {
      Qe.onCommitFiberRoot(El, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
}
var $e = Math.clz32 ? Math.clz32 : tf, bd = Math.log, ef = Math.LN2;
function tf(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (bd(e) / ef | 0) | 0;
}
var xr = 64, Sr = 4194304;
function Ln(e) {
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
function nl(e, t) {
  var n = e.pendingLanes;
  if (n === 0)
    return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var a = o & ~l;
    a !== 0 ? r = Ln(a) : (i &= o, i !== 0 && (r = Ln(i)));
  } else
    o = n & ~l, o !== 0 ? r = Ln(o) : i !== 0 && (r = Ln(i));
  if (r === 0)
    return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0))
    return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
    for (e = e.entanglements, t &= r; 0 < t; )
      n = 31 - $e(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function nf(e, t) {
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
function rf(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - $e(i), a = 1 << o, u = l[o];
    u === -1 ? (!(a & n) || a & r) && (l[o] = nf(a, t)) : u <= t && (e.expiredLanes |= a), i &= ~a;
  }
}
function Fi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function zu() {
  var e = xr;
  return xr <<= 1, !(xr & 4194240) && (xr = 64), e;
}
function Kl(e) {
  for (var t = [], n = 0; 31 > n; n++)
    t.push(e);
  return t;
}
function ur(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - $e(t), e[t] = n;
}
function lf(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - $e(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function To(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - $e(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var O = 0;
function Lu(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Mu, Po, Ru, Du, Fu, Ii = !1, Nr = [], ft = null, pt = null, mt = null, Gn = /* @__PURE__ */ new Map(), Kn = /* @__PURE__ */ new Map(), at = [], of = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Es(e, t) {
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
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = dr(t), t !== null && Po(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function sf(e, t, n, r, l) {
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
function Iu(e) {
  var t = zt(e.target);
  if (t !== null) {
    var n = Bt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = ku(n), t !== null) {
          e.blockedOn = t, Fu(e.priority, function() {
            Ru(n);
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
function Br(e) {
  if (e.blockedOn !== null)
    return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Oi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Li = r, n.target.dispatchEvent(r), Li = null;
    } else
      return t = dr(n), t !== null && Po(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function _s(e, t, n) {
  Br(e) && n.delete(t);
}
function af() {
  Ii = !1, ft !== null && Br(ft) && (ft = null), pt !== null && Br(pt) && (pt = null), mt !== null && Br(mt) && (mt = null), Gn.forEach(_s), Kn.forEach(_s);
}
function kn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Ii || (Ii = !0, Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority, af)));
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
    Iu(n), n.blockedOn === null && at.shift();
}
var on = rt.ReactCurrentBatchConfig, rl = !0;
function uf(e, t, n, r) {
  var l = O, i = on.transition;
  on.transition = null;
  try {
    O = 1, zo(e, t, n, r);
  } finally {
    O = l, on.transition = i;
  }
}
function cf(e, t, n, r) {
  var l = O, i = on.transition;
  on.transition = null;
  try {
    O = 4, zo(e, t, n, r);
  } finally {
    O = l, on.transition = i;
  }
}
function zo(e, t, n, r) {
  if (rl) {
    var l = Oi(e, t, n, r);
    if (l === null)
      ri(e, t, r, ll, n), Es(e, r);
    else if (sf(l, e, t, n, r))
      r.stopPropagation();
    else if (Es(e, r), t & 4 && -1 < of.indexOf(e)) {
      for (; l !== null; ) {
        var i = dr(l);
        if (i !== null && Mu(i), i = Oi(e, t, n, r), i === null && ri(e, t, r, ll, n), i === l)
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else
      ri(e, t, r, null, n);
  }
}
var ll = null;
function Oi(e, t, n, r) {
  if (ll = null, e = Eo(r), e = zt(e), e !== null)
    if (t = Bt(e), t === null)
      e = null;
    else if (n = t.tag, n === 13) {
      if (e = ku(t), e !== null)
        return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else
      t !== e && (e = null);
  return ll = e, null;
}
function Ou(e) {
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
      switch (qd()) {
        case _o:
          return 1;
        case Tu:
          return 4;
        case tl:
        case Zd:
          return 16;
        case Pu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ct = null, Lo = null, Vr = null;
function Au() {
  if (Vr)
    return Vr;
  var e, t = Lo, n = t.length, r, l = "value" in ct ? ct.value : ct.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++)
    ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++)
    ;
  return Vr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Hr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function jr() {
  return !0;
}
function Ts() {
  return !1;
}
function Te(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var a in e)
      e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? jr : Ts, this.isPropagationStopped = Ts, this;
  }
  return G(t.prototype, { preventDefault: function() {
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
}, defaultPrevented: 0, isTrusted: 0 }, Mo = Te(wn), cr = G({}, wn, { view: 0, detail: 0 }), df = Te(cr), Yl, Xl, Cn, _l = G({}, cr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ro, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Cn && (Cn && e.type === "mousemove" ? (Yl = e.screenX - Cn.screenX, Xl = e.screenY - Cn.screenY) : Xl = Yl = 0, Cn = e), Yl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Xl;
} }), Ps = Te(_l), ff = G({}, _l, { dataTransfer: 0 }), pf = Te(ff), mf = G({}, cr, { relatedTarget: 0 }), ql = Te(mf), hf = G({}, wn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), vf = Te(hf), gf = G({}, wn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), yf = Te(gf), wf = G({}, wn, { data: 0 }), zs = Te(wf), xf = {
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
}, Sf = {
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
}, Nf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function jf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Nf[e]) ? !!t[e] : !1;
}
function Ro() {
  return jf;
}
var kf = G({}, cr, { key: function(e) {
  if (e.key) {
    var t = xf[e.key] || e.key;
    if (t !== "Unidentified")
      return t;
  }
  return e.type === "keypress" ? (e = Hr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Sf[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ro, charCode: function(e) {
  return e.type === "keypress" ? Hr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Hr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Cf = Te(kf), Ef = G({}, _l, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ls = Te(Ef), _f = G({}, cr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ro }), Tf = Te(_f), Pf = G({}, wn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), zf = Te(Pf), Lf = G({}, _l, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Mf = Te(Lf), Rf = [9, 13, 27, 32], Do = be && "CompositionEvent" in window, Fn = null;
be && "documentMode" in document && (Fn = document.documentMode);
var Df = be && "TextEvent" in window && !Fn, $u = be && (!Do || Fn && 8 < Fn && 11 >= Fn), Ms = " ", Rs = !1;
function Uu(e, t) {
  switch (e) {
    case "keyup":
      return Rf.indexOf(t.keyCode) !== -1;
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
function Bu(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Gt = !1;
function Ff(e, t) {
  switch (e) {
    case "compositionend":
      return Bu(t);
    case "keypress":
      return t.which !== 32 ? null : (Rs = !0, Ms);
    case "textInput":
      return e = t.data, e === Ms && Rs ? null : e;
    default:
      return null;
  }
}
function If(e, t) {
  if (Gt)
    return e === "compositionend" || !Do && Uu(e, t) ? (e = Au(), Vr = Lo = ct = null, Gt = !1, e) : null;
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
      return $u && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Of = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Ds(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Of[e.type] : t === "textarea";
}
function Vu(e, t, n, r) {
  wu(r), t = il(t, "onChange"), 0 < t.length && (n = new Mo("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var In = null, Xn = null;
function Af(e) {
  bu(e, 0);
}
function Tl(e) {
  var t = Xt(e);
  if (fu(t))
    return e;
}
function $f(e, t) {
  if (e === "change")
    return t;
}
var Hu = !1;
if (be) {
  var Zl;
  if (be) {
    var Jl = "oninput" in document;
    if (!Jl) {
      var Fs = document.createElement("div");
      Fs.setAttribute("oninput", "return;"), Jl = typeof Fs.oninput == "function";
    }
    Zl = Jl;
  } else
    Zl = !1;
  Hu = Zl && (!document.documentMode || 9 < document.documentMode);
}
function Is() {
  In && (In.detachEvent("onpropertychange", Wu), Xn = In = null);
}
function Wu(e) {
  if (e.propertyName === "value" && Tl(Xn)) {
    var t = [];
    Vu(t, Xn, e, Eo(e)), ju(Af, t);
  }
}
function Uf(e, t, n) {
  e === "focusin" ? (Is(), In = t, Xn = n, In.attachEvent("onpropertychange", Wu)) : e === "focusout" && Is();
}
function Bf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Tl(Xn);
}
function Vf(e, t) {
  if (e === "click")
    return Tl(t);
}
function Hf(e, t) {
  if (e === "input" || e === "change")
    return Tl(t);
}
function Wf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Be = typeof Object.is == "function" ? Object.is : Wf;
function qn(e, t) {
  if (Be(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!wi.call(t, l) || !Be(e[l], t[l]))
      return !1;
  }
  return !0;
}
function Os(e) {
  for (; e && e.firstChild; )
    e = e.firstChild;
  return e;
}
function As(e, t) {
  var n = Os(e);
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
    n = Os(n);
  }
}
function Qu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Qu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Gu() {
  for (var e = window, t = Jr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n)
      e = t.contentWindow;
    else
      break;
    t = Jr(e.document);
  }
  return t;
}
function Fo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Qf(e) {
  var t = Gu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Qu(n.ownerDocument.documentElement, n)) {
    if (r !== null && Fo(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
        n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = As(n, i);
        var o = As(
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
var Gf = be && "documentMode" in document && 11 >= document.documentMode, Kt = null, Ai = null, On = null, $i = !1;
function $s(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  $i || Kt == null || Kt !== Jr(r) || (r = Kt, "selectionStart" in r && Fo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), On && qn(On, r) || (On = r, r = il(Ai, "onSelect"), 0 < r.length && (t = new Mo("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Kt)));
}
function kr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Yt = { animationend: kr("Animation", "AnimationEnd"), animationiteration: kr("Animation", "AnimationIteration"), animationstart: kr("Animation", "AnimationStart"), transitionend: kr("Transition", "TransitionEnd") }, bl = {}, Ku = {};
be && (Ku = document.createElement("div").style, "AnimationEvent" in window || (delete Yt.animationend.animation, delete Yt.animationiteration.animation, delete Yt.animationstart.animation), "TransitionEvent" in window || delete Yt.transitionend.transition);
function Pl(e) {
  if (bl[e])
    return bl[e];
  if (!Yt[e])
    return e;
  var t = Yt[e], n;
  for (n in t)
    if (t.hasOwnProperty(n) && n in Ku)
      return bl[e] = t[n];
  return e;
}
var Yu = Pl("animationend"), Xu = Pl("animationiteration"), qu = Pl("animationstart"), Zu = Pl("transitionend"), Ju = /* @__PURE__ */ new Map(), Us = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Nt(e, t) {
  Ju.set(e, t), Ut(t, [e]);
}
for (var ei = 0; ei < Us.length; ei++) {
  var ti = Us[ei], Kf = ti.toLowerCase(), Yf = ti[0].toUpperCase() + ti.slice(1);
  Nt(Kf, "on" + Yf);
}
Nt(Yu, "onAnimationEnd");
Nt(Xu, "onAnimationIteration");
Nt(qu, "onAnimationStart");
Nt("dblclick", "onDoubleClick");
Nt("focusin", "onFocus");
Nt("focusout", "onBlur");
Nt(Zu, "onTransitionEnd");
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
var Mn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Xf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Mn));
function Bs(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Gd(r, t, void 0, e), e.currentTarget = null;
}
function bu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var a = r[o], u = a.instance, c = a.currentTarget;
          if (a = a.listener, u !== i && l.isPropagationStopped())
            break e;
          Bs(l, a, c), i = u;
        }
      else
        for (o = 0; o < r.length; o++) {
          if (a = r[o], u = a.instance, c = a.currentTarget, a = a.listener, u !== i && l.isPropagationStopped())
            break e;
          Bs(l, a, c), i = u;
        }
    }
  }
  if (el)
    throw e = Di, el = !1, Di = null, e;
}
function $(e, t) {
  var n = t[Wi];
  n === void 0 && (n = t[Wi] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (ec(t, e, 2, !1), n.add(r));
}
function ni(e, t, n) {
  var r = 0;
  t && (r |= 4), ec(n, e, r, t);
}
var Cr = "_reactListening" + Math.random().toString(36).slice(2);
function Zn(e) {
  if (!e[Cr]) {
    e[Cr] = !0, su.forEach(function(n) {
      n !== "selectionchange" && (Xf.has(n) || ni(n, !1, e), ni(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Cr] || (t[Cr] = !0, ni("selectionchange", !1, t));
  }
}
function ec(e, t, n, r) {
  switch (Ou(t)) {
    case 1:
      var l = uf;
      break;
    case 4:
      l = cf;
      break;
    default:
      l = zo;
  }
  n = l.bind(null, t, n, e), l = void 0, !Ri || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function ri(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e:
      for (; ; ) {
        if (r === null)
          return;
        var o = r.tag;
        if (o === 3 || o === 4) {
          var a = r.stateNode.containerInfo;
          if (a === l || a.nodeType === 8 && a.parentNode === l)
            break;
          if (o === 4)
            for (o = r.return; o !== null; ) {
              var u = o.tag;
              if ((u === 3 || u === 4) && (u = o.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l))
                return;
              o = o.return;
            }
          for (; a !== null; ) {
            if (o = zt(a), o === null)
              return;
            if (u = o.tag, u === 5 || u === 6) {
              r = i = o;
              continue e;
            }
            a = a.parentNode;
          }
        }
        r = r.return;
      }
  ju(function() {
    var c = i, f = Eo(n), h = [];
    e: {
      var v = Ju.get(e);
      if (v !== void 0) {
        var x = Mo, g = e;
        switch (e) {
          case "keypress":
            if (Hr(n) === 0)
              break e;
          case "keydown":
          case "keyup":
            x = Cf;
            break;
          case "focusin":
            g = "focus", x = ql;
            break;
          case "focusout":
            g = "blur", x = ql;
            break;
          case "beforeblur":
          case "afterblur":
            x = ql;
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
            x = Ps;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = pf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = Tf;
            break;
          case Yu:
          case Xu:
          case qu:
            x = vf;
            break;
          case Zu:
            x = zf;
            break;
          case "scroll":
            x = df;
            break;
          case "wheel":
            x = Mf;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = yf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = Ls;
        }
        var w = (t & 4) !== 0, L = !w && e === "scroll", p = w ? v !== null ? v + "Capture" : null : v;
        w = [];
        for (var d = c, m; d !== null; ) {
          m = d;
          var y = m.stateNode;
          if (m.tag === 5 && y !== null && (m = y, p !== null && (y = Qn(d, p), y != null && w.push(Jn(d, y, m)))), L)
            break;
          d = d.return;
        }
        0 < w.length && (v = new x(v, g, null, n, f), h.push({ event: v, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (v = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", v && n !== Li && (g = n.relatedTarget || n.fromElement) && (zt(g) || g[et]))
          break e;
        if ((x || v) && (v = f.window === f ? f : (v = f.ownerDocument) ? v.defaultView || v.parentWindow : window, x ? (g = n.relatedTarget || n.toElement, x = c, g = g ? zt(g) : null, g !== null && (L = Bt(g), g !== L || g.tag !== 5 && g.tag !== 6) && (g = null)) : (x = null, g = c), x !== g)) {
          if (w = Ps, y = "onMouseLeave", p = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (w = Ls, y = "onPointerLeave", p = "onPointerEnter", d = "pointer"), L = x == null ? v : Xt(x), m = g == null ? v : Xt(g), v = new w(y, d + "leave", x, n, f), v.target = L, v.relatedTarget = m, y = null, zt(f) === c && (w = new w(p, d + "enter", g, n, f), w.target = m, w.relatedTarget = L, y = w), L = y, x && g)
            t: {
              for (w = x, p = g, d = 0, m = w; m; m = Ht(m))
                d++;
              for (m = 0, y = p; y; y = Ht(y))
                m++;
              for (; 0 < d - m; )
                w = Ht(w), d--;
              for (; 0 < m - d; )
                p = Ht(p), m--;
              for (; d--; ) {
                if (w === p || p !== null && w === p.alternate)
                  break t;
                w = Ht(w), p = Ht(p);
              }
              w = null;
            }
          else
            w = null;
          x !== null && Vs(h, v, x, w, !1), g !== null && L !== null && Vs(h, L, g, w, !0);
        }
      }
      e: {
        if (v = c ? Xt(c) : window, x = v.nodeName && v.nodeName.toLowerCase(), x === "select" || x === "input" && v.type === "file")
          var j = $f;
        else if (Ds(v))
          if (Hu)
            j = Hf;
          else {
            j = Bf;
            var E = Uf;
          }
        else
          (x = v.nodeName) && x.toLowerCase() === "input" && (v.type === "checkbox" || v.type === "radio") && (j = Vf);
        if (j && (j = j(e, c))) {
          Vu(h, j, n, f);
          break e;
        }
        E && E(e, v, c), e === "focusout" && (E = v._wrapperState) && E.controlled && v.type === "number" && Ei(v, "number", v.value);
      }
      switch (E = c ? Xt(c) : window, e) {
        case "focusin":
          (Ds(E) || E.contentEditable === "true") && (Kt = E, Ai = c, On = null);
          break;
        case "focusout":
          On = Ai = Kt = null;
          break;
        case "mousedown":
          $i = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          $i = !1, $s(h, n, f);
          break;
        case "selectionchange":
          if (Gf)
            break;
        case "keydown":
        case "keyup":
          $s(h, n, f);
      }
      var _;
      if (Do)
        e: {
          switch (e) {
            case "compositionstart":
              var k = "onCompositionStart";
              break e;
            case "compositionend":
              k = "onCompositionEnd";
              break e;
            case "compositionupdate":
              k = "onCompositionUpdate";
              break e;
          }
          k = void 0;
        }
      else
        Gt ? Uu(e, n) && (k = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (k = "onCompositionStart");
      k && ($u && n.locale !== "ko" && (Gt || k !== "onCompositionStart" ? k === "onCompositionEnd" && Gt && (_ = Au()) : (ct = f, Lo = "value" in ct ? ct.value : ct.textContent, Gt = !0)), E = il(c, k), 0 < E.length && (k = new zs(k, e, null, n, f), h.push({ event: k, listeners: E }), _ ? k.data = _ : (_ = Bu(n), _ !== null && (k.data = _)))), (_ = Df ? Ff(e, n) : If(e, n)) && (c = il(c, "onBeforeInput"), 0 < c.length && (f = new zs("onBeforeInput", "beforeinput", null, n, f), h.push({ event: f, listeners: c }), f.data = _));
    }
    bu(h, t);
  });
}
function Jn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function il(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Qn(e, n), i != null && r.unshift(Jn(e, i, l)), i = Qn(e, t), i != null && r.push(Jn(e, i, l))), e = e.return;
  }
  return r;
}
function Ht(e) {
  if (e === null)
    return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Vs(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var a = n, u = a.alternate, c = a.stateNode;
    if (u !== null && u === r)
      break;
    a.tag === 5 && c !== null && (a = c, l ? (u = Qn(n, i), u != null && o.unshift(Jn(n, u, a))) : l || (u = Qn(n, i), u != null && o.push(Jn(n, u, a)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var qf = /\r\n?/g, Zf = /\u0000|\uFFFD/g;
function Hs(e) {
  return (typeof e == "string" ? e : "" + e).replace(qf, `
`).replace(Zf, "");
}
function Er(e, t, n) {
  if (t = Hs(t), Hs(e) !== t && n)
    throw Error(N(425));
}
function ol() {
}
var Ui = null, Bi = null;
function Vi(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Hi = typeof setTimeout == "function" ? setTimeout : void 0, Jf = typeof clearTimeout == "function" ? clearTimeout : void 0, Ws = typeof Promise == "function" ? Promise : void 0, bf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ws < "u" ? function(e) {
  return Ws.resolve(null).then(e).catch(ep);
} : Hi;
function ep(e) {
  setTimeout(function() {
    throw e;
  });
}
function li(e, t) {
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
function Qs(e) {
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
var xn = Math.random().toString(36).slice(2), We = "__reactFiber$" + xn, bn = "__reactProps$" + xn, et = "__reactContainer$" + xn, Wi = "__reactEvents$" + xn, tp = "__reactListeners$" + xn, np = "__reactHandles$" + xn;
function zt(e) {
  var t = e[We];
  if (t)
    return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[et] || n[We]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
        for (e = Qs(e); e !== null; ) {
          if (n = e[We])
            return n;
          e = Qs(e);
        }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function dr(e) {
  return e = e[We] || e[et], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Xt(e) {
  if (e.tag === 5 || e.tag === 6)
    return e.stateNode;
  throw Error(N(33));
}
function zl(e) {
  return e[bn] || null;
}
var Qi = [], qt = -1;
function jt(e) {
  return { current: e };
}
function U(e) {
  0 > qt || (e.current = Qi[qt], Qi[qt] = null, qt--);
}
function A(e, t) {
  qt++, Qi[qt] = e.current, e.current = t;
}
var St = {}, de = jt(St), xe = jt(!1), Ft = St;
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
function Se(e) {
  return e = e.childContextTypes, e != null;
}
function sl() {
  U(xe), U(de);
}
function Gs(e, t, n) {
  if (de.current !== St)
    throw Error(N(168));
  A(de, t), A(xe, n);
}
function tc(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function")
    return n;
  r = r.getChildContext();
  for (var l in r)
    if (!(l in t))
      throw Error(N(108, $d(e) || "Unknown", l));
  return G({}, n, r);
}
function al(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || St, Ft = de.current, A(de, e), A(xe, xe.current), !0;
}
function Ks(e, t, n) {
  var r = e.stateNode;
  if (!r)
    throw Error(N(169));
  n ? (e = tc(e, t, Ft), r.__reactInternalMemoizedMergedChildContext = e, U(xe), U(de), A(de, e)) : U(xe), A(xe, n);
}
var Ye = null, Ll = !1, ii = !1;
function nc(e) {
  Ye === null ? Ye = [e] : Ye.push(e);
}
function rp(e) {
  Ll = !0, nc(e);
}
function kt() {
  if (!ii && Ye !== null) {
    ii = !0;
    var e = 0, t = O;
    try {
      var n = Ye;
      for (O = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ye = null, Ll = !1;
    } catch (l) {
      throw Ye !== null && (Ye = Ye.slice(e + 1)), _u(_o, kt), l;
    } finally {
      O = t, ii = !1;
    }
  }
  return null;
}
var Zt = [], Jt = 0, ul = null, cl = 0, Pe = [], ze = 0, It = null, qe = 1, Ze = "";
function Tt(e, t) {
  Zt[Jt++] = cl, Zt[Jt++] = ul, ul = e, cl = t;
}
function rc(e, t, n) {
  Pe[ze++] = qe, Pe[ze++] = Ze, Pe[ze++] = It, It = e;
  var r = qe;
  e = Ze;
  var l = 32 - $e(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - $e(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, qe = 1 << 32 - $e(t) + l | n << l | r, Ze = i + e;
  } else
    qe = 1 << i | n << l | r, Ze = e;
}
function Io(e) {
  e.return !== null && (Tt(e, 1), rc(e, 1, 0));
}
function Oo(e) {
  for (; e === ul; )
    ul = Zt[--Jt], Zt[Jt] = null, cl = Zt[--Jt], Zt[Jt] = null;
  for (; e === It; )
    It = Pe[--ze], Pe[ze] = null, Ze = Pe[--ze], Pe[ze] = null, qe = Pe[--ze], Pe[ze] = null;
}
var Ce = null, ke = null, V = !1, Ae = null;
function lc(e, t) {
  var n = Le(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ys(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ce = e, ke = ht(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ce = e, ke = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = It !== null ? { id: qe, overflow: Ze } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Le(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ce = e, ke = null, !0) : !1;
    default:
      return !1;
  }
}
function Gi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ki(e) {
  if (V) {
    var t = ke;
    if (t) {
      var n = t;
      if (!Ys(e, t)) {
        if (Gi(e))
          throw Error(N(418));
        t = ht(n.nextSibling);
        var r = Ce;
        t && Ys(e, t) ? lc(r, n) : (e.flags = e.flags & -4097 | 2, V = !1, Ce = e);
      }
    } else {
      if (Gi(e))
        throw Error(N(418));
      e.flags = e.flags & -4097 | 2, V = !1, Ce = e;
    }
  }
}
function Xs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ce = e;
}
function _r(e) {
  if (e !== Ce)
    return !1;
  if (!V)
    return Xs(e), V = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Vi(e.type, e.memoizedProps)), t && (t = ke)) {
    if (Gi(e))
      throw ic(), Error(N(418));
    for (; t; )
      lc(e, t), t = ht(t.nextSibling);
  }
  if (Xs(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
      throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ke = ht(e.nextSibling);
              break e;
            }
            t--;
          } else
            n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      ke = null;
    }
  } else
    ke = Ce ? ht(e.stateNode.nextSibling) : null;
  return !0;
}
function ic() {
  for (var e = ke; e; )
    e = ht(e.nextSibling);
}
function pn() {
  ke = Ce = null, V = !1;
}
function Ao(e) {
  Ae === null ? Ae = [e] : Ae.push(e);
}
var lp = rt.ReactCurrentBatchConfig;
function Ie(e, t) {
  if (e && e.defaultProps) {
    t = G({}, t), e = e.defaultProps;
    for (var n in e)
      t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var dl = jt(null), fl = null, bt = null, $o = null;
function Uo() {
  $o = bt = fl = null;
}
function Bo(e) {
  var t = dl.current;
  U(dl), e._currentValue = t;
}
function Yi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
      break;
    e = e.return;
  }
}
function sn(e, t) {
  fl = e, $o = bt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (we = !0), e.firstContext = null);
}
function Re(e) {
  var t = e._currentValue;
  if ($o !== e)
    if (e = { context: e, memoizedValue: t, next: null }, bt === null) {
      if (fl === null)
        throw Error(N(308));
      bt = e, fl.dependencies = { lanes: 0, firstContext: e };
    } else
      bt = bt.next = e;
  return t;
}
var Lt = null;
function Vo(e) {
  Lt === null ? Lt = [e] : Lt.push(e);
}
function oc(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Vo(t)) : (n.next = l.next, l.next = n), t.interleaved = n, tt(e, r);
}
function tt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var st = !1;
function Ho(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function sc(e, t) {
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
  return l = r.interleaved, l === null ? (t.next = t, Vo(r)) : (t.next = l.next, l.next = t), r.interleaved = t, tt(e, n);
}
function Wr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, To(e, n);
  }
}
function qs(e, t) {
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
function pl(e, t, n, r) {
  var l = e.updateQueue;
  st = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a, c = u.next;
    u.next = null, o === null ? i = c : o.next = c, o = u;
    var f = e.alternate;
    f !== null && (f = f.updateQueue, a = f.lastBaseUpdate, a !== o && (a === null ? f.firstBaseUpdate = c : a.next = c, f.lastBaseUpdate = u));
  }
  if (i !== null) {
    var h = l.baseState;
    o = 0, f = c = u = null, a = i;
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
              h = G({}, h, v);
              break e;
            case 2:
              st = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, v = l.effects, v === null ? l.effects = [a] : v.push(a));
      } else
        x = { eventTime: x, lane: v, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, f === null ? (c = f = x, u = h) : f = f.next = x, o |= v;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null)
          break;
        v = a, a = v.next, v.next = null, l.lastBaseUpdate = v, l.shared.pending = null;
      }
    } while (!0);
    if (f === null && (u = h), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = f, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else
      i === null && (l.shared.lanes = 0);
    At |= o, e.lanes = o, e.memoizedState = h;
  }
}
function Zs(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null)
    for (t = 0; t < e.length; t++) {
      var r = e[t], l = r.callback;
      if (l !== null) {
        if (r.callback = null, r = n, typeof l != "function")
          throw Error(N(191, l));
        l.call(r);
      }
    }
}
var ac = new ou.Component().refs;
function Xi(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : G({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Ml = { isMounted: function(e) {
  return (e = e._reactInternals) ? Bt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = me(), l = yt(e), i = Je(r, l);
  i.payload = t, n != null && (i.callback = n), t = vt(e, i, l), t !== null && (Ue(t, e, l, r), Wr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = me(), l = yt(e), i = Je(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = vt(e, i, l), t !== null && (Ue(t, e, l, r), Wr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = me(), r = yt(e), l = Je(n, r);
  l.tag = 2, t != null && (l.callback = t), t = vt(e, l, r), t !== null && (Ue(t, e, r, n), Wr(t, e, r));
} };
function Js(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !qn(n, r) || !qn(l, i) : !0;
}
function uc(e, t, n) {
  var r = !1, l = St, i = t.contextType;
  return typeof i == "object" && i !== null ? i = Re(i) : (l = Se(t) ? Ft : de.current, r = t.contextTypes, i = (r = r != null) ? fn(e, l) : St), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Ml, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function bs(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ml.enqueueReplaceState(t, t.state, null);
}
function qi(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = ac, Ho(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Re(i) : (i = Se(t) ? Ft : de.current, l.context = fn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Xi(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Ml.enqueueReplaceState(l, l.state, null), pl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function En(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1)
          throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r)
        throw Error(N(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var a = l.refs;
        a === ac && (a = l.refs = {}), o === null ? delete a[i] : a[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string")
      throw Error(N(284));
    if (!n._owner)
      throw Error(N(290, e));
  }
  return e;
}
function Tr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(N(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function ea(e) {
  var t = e._init;
  return t(e._payload);
}
function cc(e) {
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
  function o(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function a(p, d, m, y) {
    return d === null || d.tag !== 6 ? (d = fi(m, p.mode, y), d.return = p, d) : (d = l(d, m), d.return = p, d);
  }
  function u(p, d, m, y) {
    var j = m.type;
    return j === Qt ? f(p, d, m.props.children, y, m.key) : d !== null && (d.elementType === j || typeof j == "object" && j !== null && j.$$typeof === ot && ea(j) === d.type) ? (y = l(d, m.props), y.ref = En(p, d, m), y.return = p, y) : (y = qr(m.type, m.key, m.props, null, p.mode, y), y.ref = En(p, d, m), y.return = p, y);
  }
  function c(p, d, m, y) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== m.containerInfo || d.stateNode.implementation !== m.implementation ? (d = pi(m, p.mode, y), d.return = p, d) : (d = l(d, m.children || []), d.return = p, d);
  }
  function f(p, d, m, y, j) {
    return d === null || d.tag !== 7 ? (d = Dt(m, p.mode, y, j), d.return = p, d) : (d = l(d, m), d.return = p, d);
  }
  function h(p, d, m) {
    if (typeof d == "string" && d !== "" || typeof d == "number")
      return d = fi("" + d, p.mode, m), d.return = p, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case gr:
          return m = qr(d.type, d.key, d.props, null, p.mode, m), m.ref = En(p, null, d), m.return = p, m;
        case Wt:
          return d = pi(d, p.mode, m), d.return = p, d;
        case ot:
          var y = d._init;
          return h(p, y(d._payload), m);
      }
      if (zn(d) || Sn(d))
        return d = Dt(d, p.mode, m, null), d.return = p, d;
      Tr(p, d);
    }
    return null;
  }
  function v(p, d, m, y) {
    var j = d !== null ? d.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number")
      return j !== null ? null : a(p, d, "" + m, y);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case gr:
          return m.key === j ? u(p, d, m, y) : null;
        case Wt:
          return m.key === j ? c(p, d, m, y) : null;
        case ot:
          return j = m._init, v(
            p,
            d,
            j(m._payload),
            y
          );
      }
      if (zn(m) || Sn(m))
        return j !== null ? null : f(p, d, m, y, null);
      Tr(p, m);
    }
    return null;
  }
  function x(p, d, m, y, j) {
    if (typeof y == "string" && y !== "" || typeof y == "number")
      return p = p.get(m) || null, a(d, p, "" + y, j);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case gr:
          return p = p.get(y.key === null ? m : y.key) || null, u(d, p, y, j);
        case Wt:
          return p = p.get(y.key === null ? m : y.key) || null, c(d, p, y, j);
        case ot:
          var E = y._init;
          return x(p, d, m, E(y._payload), j);
      }
      if (zn(y) || Sn(y))
        return p = p.get(m) || null, f(d, p, y, j, null);
      Tr(d, y);
    }
    return null;
  }
  function g(p, d, m, y) {
    for (var j = null, E = null, _ = d, k = d = 0, C = null; _ !== null && k < m.length; k++) {
      _.index > k ? (C = _, _ = null) : C = _.sibling;
      var S = v(p, _, m[k], y);
      if (S === null) {
        _ === null && (_ = C);
        break;
      }
      e && _ && S.alternate === null && t(p, _), d = i(S, d, k), E === null ? j = S : E.sibling = S, E = S, _ = C;
    }
    if (k === m.length)
      return n(p, _), V && Tt(p, k), j;
    if (_ === null) {
      for (; k < m.length; k++)
        _ = h(p, m[k], y), _ !== null && (d = i(_, d, k), E === null ? j = _ : E.sibling = _, E = _);
      return V && Tt(p, k), j;
    }
    for (_ = r(p, _); k < m.length; k++)
      C = x(_, p, k, m[k], y), C !== null && (e && C.alternate !== null && _.delete(C.key === null ? k : C.key), d = i(C, d, k), E === null ? j = C : E.sibling = C, E = C);
    return e && _.forEach(function(R) {
      return t(p, R);
    }), V && Tt(p, k), j;
  }
  function w(p, d, m, y) {
    var j = Sn(m);
    if (typeof j != "function")
      throw Error(N(150));
    if (m = j.call(m), m == null)
      throw Error(N(151));
    for (var E = j = null, _ = d, k = d = 0, C = null, S = m.next(); _ !== null && !S.done; k++, S = m.next()) {
      _.index > k ? (C = _, _ = null) : C = _.sibling;
      var R = v(p, _, S.value, y);
      if (R === null) {
        _ === null && (_ = C);
        break;
      }
      e && _ && R.alternate === null && t(p, _), d = i(R, d, k), E === null ? j = R : E.sibling = R, E = R, _ = C;
    }
    if (S.done)
      return n(
        p,
        _
      ), V && Tt(p, k), j;
    if (_ === null) {
      for (; !S.done; k++, S = m.next())
        S = h(p, S.value, y), S !== null && (d = i(S, d, k), E === null ? j = S : E.sibling = S, E = S);
      return V && Tt(p, k), j;
    }
    for (_ = r(p, _); !S.done; k++, S = m.next())
      S = x(_, p, k, S.value, y), S !== null && (e && S.alternate !== null && _.delete(S.key === null ? k : S.key), d = i(S, d, k), E === null ? j = S : E.sibling = S, E = S);
    return e && _.forEach(function(B) {
      return t(p, B);
    }), V && Tt(p, k), j;
  }
  function L(p, d, m, y) {
    if (typeof m == "object" && m !== null && m.type === Qt && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case gr:
          e: {
            for (var j = m.key, E = d; E !== null; ) {
              if (E.key === j) {
                if (j = m.type, j === Qt) {
                  if (E.tag === 7) {
                    n(p, E.sibling), d = l(E, m.props.children), d.return = p, p = d;
                    break e;
                  }
                } else if (E.elementType === j || typeof j == "object" && j !== null && j.$$typeof === ot && ea(j) === E.type) {
                  n(p, E.sibling), d = l(E, m.props), d.ref = En(p, E, m), d.return = p, p = d;
                  break e;
                }
                n(p, E);
                break;
              } else
                t(p, E);
              E = E.sibling;
            }
            m.type === Qt ? (d = Dt(m.props.children, p.mode, y, m.key), d.return = p, p = d) : (y = qr(m.type, m.key, m.props, null, p.mode, y), y.ref = En(p, d, m), y.return = p, p = y);
          }
          return o(p);
        case Wt:
          e: {
            for (E = m.key; d !== null; ) {
              if (d.key === E)
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
            d = pi(m, p.mode, y), d.return = p, p = d;
          }
          return o(p);
        case ot:
          return E = m._init, L(p, d, E(m._payload), y);
      }
      if (zn(m))
        return g(p, d, m, y);
      if (Sn(m))
        return w(p, d, m, y);
      Tr(p, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, d !== null && d.tag === 6 ? (n(p, d.sibling), d = l(d, m), d.return = p, p = d) : (n(p, d), d = fi(m, p.mode, y), d.return = p, p = d), o(p)) : n(p, d);
  }
  return L;
}
var mn = cc(!0), dc = cc(!1), fr = {}, Ge = jt(fr), er = jt(fr), tr = jt(fr);
function Mt(e) {
  if (e === fr)
    throw Error(N(174));
  return e;
}
function Wo(e, t) {
  switch (A(tr, t), A(er, e), A(Ge, fr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ti(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Ti(t, e);
  }
  U(Ge), A(Ge, t);
}
function hn() {
  U(Ge), U(er), U(tr);
}
function fc(e) {
  Mt(tr.current);
  var t = Mt(Ge.current), n = Ti(t, e.type);
  t !== n && (A(er, e), A(Ge, n));
}
function Qo(e) {
  er.current === e && (U(Ge), U(er));
}
var W = jt(0);
function ml(e) {
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
var oi = [];
function Go() {
  for (var e = 0; e < oi.length; e++)
    oi[e]._workInProgressVersionPrimary = null;
  oi.length = 0;
}
var Qr = rt.ReactCurrentDispatcher, si = rt.ReactCurrentBatchConfig, Ot = 0, Q = null, b = null, ne = null, hl = !1, An = !1, nr = 0, ip = 0;
function se() {
  throw Error(N(321));
}
function Ko(e, t) {
  if (t === null)
    return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Be(e[n], t[n]))
      return !1;
  return !0;
}
function Yo(e, t, n, r, l, i) {
  if (Ot = i, Q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Qr.current = e === null || e.memoizedState === null ? up : cp, e = n(r, l), An) {
    i = 0;
    do {
      if (An = !1, nr = 0, 25 <= i)
        throw Error(N(301));
      i += 1, ne = b = null, t.updateQueue = null, Qr.current = dp, e = n(r, l);
    } while (An);
  }
  if (Qr.current = vl, t = b !== null && b.next !== null, Ot = 0, ne = b = Q = null, hl = !1, t)
    throw Error(N(300));
  return e;
}
function Xo() {
  var e = nr !== 0;
  return nr = 0, e;
}
function He() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ne === null ? Q.memoizedState = ne = e : ne = ne.next = e, ne;
}
function De() {
  if (b === null) {
    var e = Q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else
    e = b.next;
  var t = ne === null ? Q.memoizedState : ne.next;
  if (t !== null)
    ne = t, b = e;
  else {
    if (e === null)
      throw Error(N(310));
    b = e, e = { memoizedState: b.memoizedState, baseState: b.baseState, baseQueue: b.baseQueue, queue: b.queue, next: null }, ne === null ? Q.memoizedState = ne = e : ne = ne.next = e;
  }
  return ne;
}
function rr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ai(e) {
  var t = De(), n = t.queue;
  if (n === null)
    throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = b, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var a = o = null, u = null, c = i;
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
        u === null ? (a = u = h, o = r) : u = u.next = h, Q.lanes |= f, At |= f;
      }
      c = c.next;
    } while (c !== null && c !== i);
    u === null ? o = r : u.next = a, Be(r, t.memoizedState) || (we = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, Q.lanes |= i, At |= i, l = l.next;
    while (l !== e);
  } else
    l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ui(e) {
  var t = De(), n = t.queue;
  if (n === null)
    throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    Be(i, t.memoizedState) || (we = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function pc() {
}
function mc(e, t) {
  var n = Q, r = De(), l = t(), i = !Be(r.memoizedState, l);
  if (i && (r.memoizedState = l, we = !0), r = r.queue, qo(gc.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || ne !== null && ne.memoizedState.tag & 1) {
    if (n.flags |= 2048, lr(9, vc.bind(null, n, r, l, t), void 0, null), re === null)
      throw Error(N(349));
    Ot & 30 || hc(n, t, l);
  }
  return l;
}
function hc(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function vc(e, t, n, r) {
  t.value = n, t.getSnapshot = r, yc(t) && wc(e);
}
function gc(e, t, n) {
  return n(function() {
    yc(t) && wc(e);
  });
}
function yc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Be(e, n);
  } catch {
    return !0;
  }
}
function wc(e) {
  var t = tt(e, 1);
  t !== null && Ue(t, e, 1, -1);
}
function ta(e) {
  var t = He();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: rr, lastRenderedState: e }, t.queue = e, e = e.dispatch = ap.bind(null, Q, e), [t.memoizedState, e];
}
function lr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function xc() {
  return De().memoizedState;
}
function Gr(e, t, n, r) {
  var l = He();
  Q.flags |= e, l.memoizedState = lr(1 | t, n, void 0, r === void 0 ? null : r);
}
function Rl(e, t, n, r) {
  var l = De();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (b !== null) {
    var o = b.memoizedState;
    if (i = o.destroy, r !== null && Ko(r, o.deps)) {
      l.memoizedState = lr(t, n, i, r);
      return;
    }
  }
  Q.flags |= e, l.memoizedState = lr(1 | t, n, i, r);
}
function na(e, t) {
  return Gr(8390656, 8, e, t);
}
function qo(e, t) {
  return Rl(2048, 8, e, t);
}
function Sc(e, t) {
  return Rl(4, 2, e, t);
}
function Nc(e, t) {
  return Rl(4, 4, e, t);
}
function jc(e, t) {
  if (typeof t == "function")
    return e = e(), t(e), function() {
      t(null);
    };
  if (t != null)
    return e = e(), t.current = e, function() {
      t.current = null;
    };
}
function kc(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Rl(4, 4, jc.bind(null, t, e), n);
}
function Zo() {
}
function Cc(e, t) {
  var n = De();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ko(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Ec(e, t) {
  var n = De();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ko(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function _c(e, t, n) {
  return Ot & 21 ? (Be(n, t) || (n = zu(), Q.lanes |= n, At |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, we = !0), e.memoizedState = n);
}
function op(e, t) {
  var n = O;
  O = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = si.transition;
  si.transition = {};
  try {
    e(!1), t();
  } finally {
    O = n, si.transition = r;
  }
}
function Tc() {
  return De().memoizedState;
}
function sp(e, t, n) {
  var r = yt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Pc(e))
    zc(t, n);
  else if (n = oc(e, t, n, r), n !== null) {
    var l = me();
    Ue(n, e, r, l), Lc(n, t, r);
  }
}
function ap(e, t, n) {
  var r = yt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Pc(e))
    zc(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
      try {
        var o = t.lastRenderedState, a = i(o, n);
        if (l.hasEagerState = !0, l.eagerState = a, Be(a, o)) {
          var u = t.interleaved;
          u === null ? (l.next = l, Vo(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
          return;
        }
      } catch {
      } finally {
      }
    n = oc(e, t, l, r), n !== null && (l = me(), Ue(n, e, r, l), Lc(n, t, r));
  }
}
function Pc(e) {
  var t = e.alternate;
  return e === Q || t !== null && t === Q;
}
function zc(e, t) {
  An = hl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Lc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, To(e, n);
  }
}
var vl = { readContext: Re, useCallback: se, useContext: se, useEffect: se, useImperativeHandle: se, useInsertionEffect: se, useLayoutEffect: se, useMemo: se, useReducer: se, useRef: se, useState: se, useDebugValue: se, useDeferredValue: se, useTransition: se, useMutableSource: se, useSyncExternalStore: se, useId: se, unstable_isNewReconciler: !1 }, up = { readContext: Re, useCallback: function(e, t) {
  return He().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Re, useEffect: na, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Gr(
    4194308,
    4,
    jc.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Gr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Gr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = He();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = He();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = sp.bind(null, Q, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = He();
  return e = { current: e }, t.memoizedState = e;
}, useState: ta, useDebugValue: Zo, useDeferredValue: function(e) {
  return He().memoizedState = e;
}, useTransition: function() {
  var e = ta(!1), t = e[0];
  return e = op.bind(null, e[1]), He().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Q, l = He();
  if (V) {
    if (n === void 0)
      throw Error(N(407));
    n = n();
  } else {
    if (n = t(), re === null)
      throw Error(N(349));
    Ot & 30 || hc(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, na(gc.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, lr(9, vc.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = He(), t = re.identifierPrefix;
  if (V) {
    var n = Ze, r = qe;
    n = (r & ~(1 << 32 - $e(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = nr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else
    n = ip++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, cp = {
  readContext: Re,
  useCallback: Cc,
  useContext: Re,
  useEffect: qo,
  useImperativeHandle: kc,
  useInsertionEffect: Sc,
  useLayoutEffect: Nc,
  useMemo: Ec,
  useReducer: ai,
  useRef: xc,
  useState: function() {
    return ai(rr);
  },
  useDebugValue: Zo,
  useDeferredValue: function(e) {
    var t = De();
    return _c(t, b.memoizedState, e);
  },
  useTransition: function() {
    var e = ai(rr)[0], t = De().memoizedState;
    return [e, t];
  },
  useMutableSource: pc,
  useSyncExternalStore: mc,
  useId: Tc,
  unstable_isNewReconciler: !1
}, dp = { readContext: Re, useCallback: Cc, useContext: Re, useEffect: qo, useImperativeHandle: kc, useInsertionEffect: Sc, useLayoutEffect: Nc, useMemo: Ec, useReducer: ui, useRef: xc, useState: function() {
  return ui(rr);
}, useDebugValue: Zo, useDeferredValue: function(e) {
  var t = De();
  return b === null ? t.memoizedState = e : _c(t, b.memoizedState, e);
}, useTransition: function() {
  var e = ui(rr)[0], t = De().memoizedState;
  return [e, t];
}, useMutableSource: pc, useSyncExternalStore: mc, useId: Tc, unstable_isNewReconciler: !1 };
function vn(e, t) {
  try {
    var n = "", r = t;
    do
      n += Ad(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ci(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Zi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var fp = typeof WeakMap == "function" ? WeakMap : Map;
function Mc(e, t, n) {
  n = Je(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    yl || (yl = !0, so = r), Zi(e, t);
  }, n;
}
function Rc(e, t, n) {
  n = Je(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Zi(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Zi(e, t), typeof r != "function" && (gt === null ? gt = /* @__PURE__ */ new Set([this]) : gt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function ra(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new fp();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else
    l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Ep.bind(null, e, t, n), t.then(e, e));
}
function la(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ia(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Je(-1, 1), t.tag = 2, vt(n, t, 1))), n.lanes |= 1), e);
}
var pp = rt.ReactCurrentOwner, we = !1;
function pe(e, t, n, r) {
  t.child = e === null ? dc(t, null, n, r) : mn(t, e.child, n, r);
}
function oa(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return sn(t, l), r = Yo(e, t, n, r, i, l), n = Xo(), e !== null && !we ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, nt(e, t, l)) : (V && n && Io(t), t.flags |= 1, pe(e, t, r, l), t.child);
}
function sa(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !is(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Dc(e, t, i, r, l)) : (e = qr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : qn, n(o, r) && e.ref === t.ref)
      return nt(e, t, l);
  }
  return t.flags |= 1, e = wt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Dc(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (qn(i, r) && e.ref === t.ref)
      if (we = !1, t.pendingProps = r = i, (e.lanes & l) !== 0)
        e.flags & 131072 && (we = !0);
      else
        return t.lanes = e.lanes, nt(e, t, l);
  }
  return Ji(e, t, n, r, l);
}
function Fc(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, A(tn, je), je |= n;
    else {
      if (!(n & 1073741824))
        return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, A(tn, je), je |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, A(tn, je), je |= r;
    }
  else
    i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, A(tn, je), je |= r;
  return pe(e, t, l, n), t.child;
}
function Ic(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ji(e, t, n, r, l) {
  var i = Se(n) ? Ft : de.current;
  return i = fn(t, i), sn(t, l), n = Yo(e, t, n, r, i, l), r = Xo(), e !== null && !we ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, nt(e, t, l)) : (V && r && Io(t), t.flags |= 1, pe(e, t, n, l), t.child);
}
function aa(e, t, n, r, l) {
  if (Se(n)) {
    var i = !0;
    al(t);
  } else
    i = !1;
  if (sn(t, l), t.stateNode === null)
    Kr(e, t), uc(t, n, r), qi(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, a = t.memoizedProps;
    o.props = a;
    var u = o.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Re(c) : (c = Se(n) ? Ft : de.current, c = fn(t, c));
    var f = n.getDerivedStateFromProps, h = typeof f == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    h || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== r || u !== c) && bs(t, o, r, c), st = !1;
    var v = t.memoizedState;
    o.state = v, pl(t, r, o, l), u = t.memoizedState, a !== r || v !== u || xe.current || st ? (typeof f == "function" && (Xi(t, n, f, r), u = t.memoizedState), (a = st || Js(t, n, a, r, v, u, c)) ? (h || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), o.props = r, o.state = u, o.context = c, r = a) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, sc(e, t), a = t.memoizedProps, c = t.type === t.elementType ? a : Ie(t.type, a), o.props = c, h = t.pendingProps, v = o.context, u = n.contextType, typeof u == "object" && u !== null ? u = Re(u) : (u = Se(n) ? Ft : de.current, u = fn(t, u));
    var x = n.getDerivedStateFromProps;
    (f = typeof x == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== h || v !== u) && bs(t, o, r, u), st = !1, v = t.memoizedState, o.state = v, pl(t, r, o, l);
    var g = t.memoizedState;
    a !== h || v !== g || xe.current || st ? (typeof x == "function" && (Xi(t, n, x, r), g = t.memoizedState), (c = st || Js(t, n, c, r, v, g, u) || !1) ? (f || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, g, u), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, g, u)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && v === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = g), o.props = r, o.state = g, o.context = u, r = c) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && v === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return bi(e, t, n, r, i, l);
}
function bi(e, t, n, r, l, i) {
  Ic(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o)
    return l && Ks(t, n, !1), nt(e, t, i);
  r = t.stateNode, pp.current = t;
  var a = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = mn(t, e.child, null, i), t.child = mn(t, null, a, i)) : pe(e, t, a, i), t.memoizedState = r.state, l && Ks(t, n, !0), t.child;
}
function Oc(e) {
  var t = e.stateNode;
  t.pendingContext ? Gs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Gs(e, t.context, !1), Wo(e, t.containerInfo);
}
function ua(e, t, n, r, l) {
  return pn(), Ao(l), t.flags |= 256, pe(e, t, n, r), t.child;
}
var eo = { dehydrated: null, treeContext: null, retryLane: 0 };
function to(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ac(e, t, n) {
  var r = t.pendingProps, l = W.current, i = !1, o = (t.flags & 128) !== 0, a;
  if ((a = o) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), A(W, l & 1), e === null)
    return Ki(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = Il(o, r, 0, null), e = Dt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = to(n), t.memoizedState = eo, e) : Jo(t, o));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null))
    return mp(e, t, o, r, a, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, a = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = wt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? i = wt(a, i) : (i = Dt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? to(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = eo, r;
  }
  return i = e.child, e = i.sibling, r = wt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Jo(e, t) {
  return t = Il({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Pr(e, t, n, r) {
  return r !== null && Ao(r), mn(t, e.child, null, n), e = Jo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function mp(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ci(Error(N(422))), Pr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = Il({ mode: "visible", children: r.children }, l, 0, null), i = Dt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && mn(t, e.child, null, o), t.child.memoizedState = to(o), t.memoizedState = eo, i);
  if (!(t.mode & 1))
    return Pr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r)
      var a = r.dgst;
    return r = a, i = Error(N(419)), r = ci(i, r, void 0), Pr(e, t, o, r);
  }
  if (a = (o & e.childLanes) !== 0, we || a) {
    if (r = re, r !== null) {
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
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, tt(e, l), Ue(r, e, l, -1));
    }
    return ls(), r = ci(Error(N(421))), Pr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = _p.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, ke = ht(l.nextSibling), Ce = t, V = !0, Ae = null, e !== null && (Pe[ze++] = qe, Pe[ze++] = Ze, Pe[ze++] = It, qe = e.id, Ze = e.overflow, It = t), t = Jo(t, r.children), t.flags |= 4096, t);
}
function ca(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Yi(e.return, t, n);
}
function di(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function $c(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (pe(e, t, r.children, n), r = W.current, r & 2)
    r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128)
      e:
        for (e = t.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && ca(e, n, t);
          else if (e.tag === 19)
            ca(e, n, t);
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
  if (A(W, r), !(t.mode & 1))
    t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          e = n.alternate, e !== null && ml(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), di(t, !1, l, n, i);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && ml(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        di(t, !0, n, null, i);
        break;
      case "together":
        di(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Kr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function nt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), At |= t.lanes, !(n & t.childLanes))
    return null;
  if (e !== null && t.child !== e.child)
    throw Error(N(153));
  if (t.child !== null) {
    for (e = t.child, n = wt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      e = e.sibling, n = n.sibling = wt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function hp(e, t, n) {
  switch (t.tag) {
    case 3:
      Oc(t), pn();
      break;
    case 5:
      fc(t);
      break;
    case 1:
      Se(t.type) && al(t);
      break;
    case 4:
      Wo(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      A(dl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (A(W, W.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ac(e, t, n) : (A(W, W.current & 1), e = nt(e, t, n), e !== null ? e.sibling : null);
      A(W, W.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r)
          return $c(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), A(W, W.current), r)
        break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Fc(e, t, n);
  }
  return nt(e, t, n);
}
var Uc, no, Bc, Vc;
Uc = function(e, t) {
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
no = function() {
};
Bc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Mt(Ge.current);
    var i = null;
    switch (n) {
      case "input":
        l = ki(e, l), r = ki(e, r), i = [];
        break;
      case "select":
        l = G({}, l, { value: void 0 }), r = G({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = _i(e, l), r = _i(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ol);
    }
    Pi(n, r);
    var o;
    n = null;
    for (c in l)
      if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
        if (c === "style") {
          var a = l[c];
          for (o in a)
            a.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
        } else
          c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Hn.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (a = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== a && (u != null || a != null))
        if (c === "style")
          if (a) {
            for (o in a)
              !a.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
            for (o in u)
              u.hasOwnProperty(o) && a[o] !== u[o] && (n || (n = {}), n[o] = u[o]);
          } else
            n || (i || (i = []), i.push(
              c,
              n
            )), n = u;
        else
          c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, a = a ? a.__html : void 0, u != null && a !== u && (i = i || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Hn.hasOwnProperty(c) ? (u != null && c === "onScroll" && $("scroll", e), i || a === u || (i = [])) : (i = i || []).push(c, u));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
Vc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function _n(e, t) {
  if (!V)
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
function ae(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else
    for (l = e.child; l !== null; )
      n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function vp(e, t, n) {
  var r = t.pendingProps;
  switch (Oo(t), t.tag) {
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
      return ae(t), null;
    case 1:
      return Se(t.type) && sl(), ae(t), null;
    case 3:
      return r = t.stateNode, hn(), U(xe), U(de), Go(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (_r(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ae !== null && (co(Ae), Ae = null))), no(e, t), ae(t), null;
    case 5:
      Qo(t);
      var l = Mt(tr.current);
      if (n = t.type, e !== null && t.stateNode != null)
        Bc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null)
            throw Error(N(166));
          return ae(t), null;
        }
        if (e = Mt(Ge.current), _r(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[We] = t, r[bn] = i, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < Mn.length; l++)
                $(Mn[l], r);
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
              ws(r, i), $("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, $("invalid", r);
              break;
            case "textarea":
              Ss(r, i), $("invalid", r);
          }
          Pi(n, i), l = null;
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var a = i[o];
              o === "children" ? typeof a == "string" ? r.textContent !== a && (i.suppressHydrationWarning !== !0 && Er(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && Er(
                r.textContent,
                a,
                e
              ), l = ["children", "" + a]) : Hn.hasOwnProperty(o) && a != null && o === "onScroll" && $("scroll", r);
            }
          switch (n) {
            case "input":
              yr(r), xs(r, i, !0);
              break;
            case "textarea":
              yr(r), Ns(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = ol);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = hu(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[We] = t, e[bn] = r, Uc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = zi(n, r), n) {
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
                for (l = 0; l < Mn.length; l++)
                  $(Mn[l], e);
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
                ws(e, r), l = ki(e, r), $("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = G({}, r, { value: void 0 }), $("invalid", e);
                break;
              case "textarea":
                Ss(e, r), l = _i(e, r), $("invalid", e);
                break;
              default:
                l = r;
            }
            Pi(n, l), a = l;
            for (i in a)
              if (a.hasOwnProperty(i)) {
                var u = a[i];
                i === "style" ? yu(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && vu(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Wn(e, u) : typeof u == "number" && Wn(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Hn.hasOwnProperty(i) ? u != null && i === "onScroll" && $("scroll", e) : u != null && No(e, i, u, o));
              }
            switch (n) {
              case "input":
                yr(e), xs(e, r, !1);
                break;
              case "textarea":
                yr(e), Ns(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + xt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? nn(e, !!r.multiple, i, !1) : r.defaultValue != null && nn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = ol);
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
      return ae(t), null;
    case 6:
      if (e && t.stateNode != null)
        Vc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null)
          throw Error(N(166));
        if (n = Mt(tr.current), Mt(Ge.current), _r(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[We] = t, (i = r.nodeValue !== n) && (e = Ce, e !== null))
            switch (e.tag) {
              case 3:
                Er(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Er(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[We] = t, t.stateNode = r;
      }
      return ae(t), null;
    case 13:
      if (U(W), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (V && ke !== null && t.mode & 1 && !(t.flags & 128))
          ic(), pn(), t.flags |= 98560, i = !1;
        else if (i = _r(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i)
              throw Error(N(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i)
              throw Error(N(317));
            i[We] = t;
          } else
            pn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ae(t), i = !1;
        } else
          Ae !== null && (co(Ae), Ae = null), i = !0;
        if (!i)
          return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || W.current & 1 ? ee === 0 && (ee = 3) : ls())), t.updateQueue !== null && (t.flags |= 4), ae(t), null);
    case 4:
      return hn(), no(e, t), e === null && Zn(t.stateNode.containerInfo), ae(t), null;
    case 10:
      return Bo(t.type._context), ae(t), null;
    case 17:
      return Se(t.type) && sl(), ae(t), null;
    case 19:
      if (U(W), i = t.memoizedState, i === null)
        return ae(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null)
        if (r)
          _n(i, !1);
        else {
          if (ee !== 0 || e !== null && e.flags & 128)
            for (e = t.child; e !== null; ) {
              if (o = ml(e), o !== null) {
                for (t.flags |= 128, _n(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; )
                  i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
                return A(W, W.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null && q() > gn && (t.flags |= 128, r = !0, _n(i, !1), t.lanes = 4194304);
        }
      else {
        if (!r)
          if (e = ml(o), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), _n(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !V)
              return ae(t), null;
          } else
            2 * q() - i.renderingStartTime > gn && n !== 1073741824 && (t.flags |= 128, r = !0, _n(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = q(), t.sibling = null, n = W.current, A(W, r ? n & 1 | 2 : n & 1), t) : (ae(t), null);
    case 22:
    case 23:
      return rs(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? je & 1073741824 && (ae(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ae(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function gp(e, t) {
  switch (Oo(t), t.tag) {
    case 1:
      return Se(t.type) && sl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return hn(), U(xe), U(de), Go(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Qo(t), null;
    case 13:
      if (U(W), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(N(340));
        pn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return U(W), null;
    case 4:
      return hn(), null;
    case 10:
      return Bo(t.type._context), null;
    case 22:
    case 23:
      return rs(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var zr = !1, ue = !1, yp = typeof WeakSet == "function" ? WeakSet : Set, T = null;
function en(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        K(e, t, r);
      }
    else
      n.current = null;
}
function ro(e, t, n) {
  try {
    n();
  } catch (r) {
    K(e, t, r);
  }
}
var da = !1;
function wp(e, t) {
  if (Ui = rl, e = Gu(), Fo(e)) {
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
          var o = 0, a = -1, u = -1, c = 0, f = 0, h = e, v = null;
          t:
            for (; ; ) {
              for (var x; h !== n || l !== 0 && h.nodeType !== 3 || (a = o + l), h !== i || r !== 0 && h.nodeType !== 3 || (u = o + r), h.nodeType === 3 && (o += h.nodeValue.length), (x = h.firstChild) !== null; )
                v = h, h = x;
              for (; ; ) {
                if (h === e)
                  break t;
                if (v === n && ++c === l && (a = o), v === i && ++f === r && (u = o), (x = h.nextSibling) !== null)
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
  for (Bi = { focusedElem: e, selectionRange: n }, rl = !1, T = t; T !== null; )
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
                  var w = g.memoizedProps, L = g.memoizedState, p = t.stateNode, d = p.getSnapshotBeforeUpdate(t.elementType === t.type ? w : Ie(t.type, w), L);
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
                throw Error(N(163));
            }
        } catch (y) {
          K(t, t.return, y);
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, T = e;
          break;
        }
        T = t.return;
      }
  return g = da, da = !1, g;
}
function $n(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && ro(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Dl(e, t) {
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
function lo(e) {
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
function Hc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Hc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[We], delete t[bn], delete t[Wi], delete t[tp], delete t[np])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Wc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function fa(e) {
  e:
    for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Wc(e.return))
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
function io(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ol));
  else if (r !== 4 && (e = e.child, e !== null))
    for (io(e, t, n), e = e.sibling; e !== null; )
      io(e, t, n), e = e.sibling;
}
function oo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null))
    for (oo(e, t, n), e = e.sibling; e !== null; )
      oo(e, t, n), e = e.sibling;
}
var le = null, Oe = !1;
function it(e, t, n) {
  for (n = n.child; n !== null; )
    Qc(e, t, n), n = n.sibling;
}
function Qc(e, t, n) {
  if (Qe && typeof Qe.onCommitFiberUnmount == "function")
    try {
      Qe.onCommitFiberUnmount(El, n);
    } catch {
    }
  switch (n.tag) {
    case 5:
      ue || en(n, t);
    case 6:
      var r = le, l = Oe;
      le = null, it(e, t, n), le = r, Oe = l, le !== null && (Oe ? (e = le, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : le.removeChild(n.stateNode));
      break;
    case 18:
      le !== null && (Oe ? (e = le, n = n.stateNode, e.nodeType === 8 ? li(e.parentNode, n) : e.nodeType === 1 && li(e, n), Yn(e)) : li(le, n.stateNode));
      break;
    case 4:
      r = le, l = Oe, le = n.stateNode.containerInfo, Oe = !0, it(e, t, n), le = r, Oe = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ue && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && ro(n, t, o), l = l.next;
        } while (l !== r);
      }
      it(e, t, n);
      break;
    case 1:
      if (!ue && (en(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
        try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (a) {
          K(n, t, a);
        }
      it(e, t, n);
      break;
    case 21:
      it(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ue = (r = ue) || n.memoizedState !== null, it(e, t, n), ue = r) : it(e, t, n);
      break;
    default:
      it(e, t, n);
  }
}
function pa(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new yp()), t.forEach(function(r) {
      var l = Tp.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Fe(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e, o = t, a = o;
        e:
          for (; a !== null; ) {
            switch (a.tag) {
              case 5:
                le = a.stateNode, Oe = !1;
                break e;
              case 3:
                le = a.stateNode.containerInfo, Oe = !0;
                break e;
              case 4:
                le = a.stateNode.containerInfo, Oe = !0;
                break e;
            }
            a = a.return;
          }
        if (le === null)
          throw Error(N(160));
        Qc(i, o, l), le = null, Oe = !1;
        var u = l.alternate;
        u !== null && (u.return = null), l.return = null;
      } catch (c) {
        K(l, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; )
      Gc(t, e), t = t.sibling;
}
function Gc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Fe(t, e), Ve(e), r & 4) {
        try {
          $n(3, e, e.return), Dl(3, e);
        } catch (w) {
          K(e, e.return, w);
        }
        try {
          $n(5, e, e.return);
        } catch (w) {
          K(e, e.return, w);
        }
      }
      break;
    case 1:
      Fe(t, e), Ve(e), r & 512 && n !== null && en(n, n.return);
      break;
    case 5:
      if (Fe(t, e), Ve(e), r & 512 && n !== null && en(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Wn(l, "");
        } catch (w) {
          K(e, e.return, w);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, a = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null)
          try {
            a === "input" && i.type === "radio" && i.name != null && pu(l, i), zi(a, o);
            var c = zi(a, i);
            for (o = 0; o < u.length; o += 2) {
              var f = u[o], h = u[o + 1];
              f === "style" ? yu(l, h) : f === "dangerouslySetInnerHTML" ? vu(l, h) : f === "children" ? Wn(l, h) : No(l, f, h, c);
            }
            switch (a) {
              case "input":
                Ci(l, i);
                break;
              case "textarea":
                mu(l, i);
                break;
              case "select":
                var v = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var x = i.value;
                x != null ? nn(l, !!i.multiple, x, !1) : v !== !!i.multiple && (i.defaultValue != null ? nn(
                  l,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                ) : nn(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[bn] = i;
          } catch (w) {
            K(e, e.return, w);
          }
      }
      break;
    case 6:
      if (Fe(t, e), Ve(e), r & 4) {
        if (e.stateNode === null)
          throw Error(N(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (w) {
          K(e, e.return, w);
        }
      }
      break;
    case 3:
      if (Fe(t, e), Ve(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        try {
          Yn(t.containerInfo);
        } catch (w) {
          K(e, e.return, w);
        }
      break;
    case 4:
      Fe(t, e), Ve(e);
      break;
    case 13:
      Fe(t, e), Ve(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (ts = q())), r & 4 && pa(e);
      break;
    case 22:
      if (f = n !== null && n.memoizedState !== null, e.mode & 1 ? (ue = (c = ue) || f, Fe(t, e), ue = c) : Fe(t, e), Ve(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !f && e.mode & 1)
          for (T = e, f = e.child; f !== null; ) {
            for (h = T = f; T !== null; ) {
              switch (v = T, x = v.child, v.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  $n(4, v, v.return);
                  break;
                case 1:
                  en(v, v.return);
                  var g = v.stateNode;
                  if (typeof g.componentWillUnmount == "function") {
                    r = v, n = v.return;
                    try {
                      t = r, g.props = t.memoizedProps, g.state = t.memoizedState, g.componentWillUnmount();
                    } catch (w) {
                      K(r, n, w);
                    }
                  }
                  break;
                case 5:
                  en(v, v.return);
                  break;
                case 22:
                  if (v.memoizedState !== null) {
                    ha(h);
                    continue;
                  }
              }
              x !== null ? (x.return = v, T = x) : ha(h);
            }
            f = f.sibling;
          }
        e:
          for (f = null, h = e; ; ) {
            if (h.tag === 5) {
              if (f === null) {
                f = h;
                try {
                  l = h.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = h.stateNode, u = h.memoizedProps.style, o = u != null && u.hasOwnProperty("display") ? u.display : null, a.style.display = gu("display", o));
                } catch (w) {
                  K(e, e.return, w);
                }
              }
            } else if (h.tag === 6) {
              if (f === null)
                try {
                  h.stateNode.nodeValue = c ? "" : h.memoizedProps;
                } catch (w) {
                  K(e, e.return, w);
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
      Fe(t, e), Ve(e), r & 4 && pa(e);
      break;
    case 21:
      break;
    default:
      Fe(
        t,
        e
      ), Ve(e);
  }
}
function Ve(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Wc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(N(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Wn(l, ""), r.flags &= -33);
          var i = fa(e);
          oo(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, a = fa(e);
          io(e, a, o);
          break;
        default:
          throw Error(N(161));
      }
    } catch (u) {
      K(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function xp(e, t, n) {
  T = e, Kc(e);
}
function Kc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; T !== null; ) {
    var l = T, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || zr;
      if (!o) {
        var a = l.alternate, u = a !== null && a.memoizedState !== null || ue;
        a = zr;
        var c = ue;
        if (zr = o, (ue = u) && !c)
          for (T = l; T !== null; )
            o = T, u = o.child, o.tag === 22 && o.memoizedState !== null ? va(l) : u !== null ? (u.return = o, T = u) : va(l);
        for (; i !== null; )
          T = i, Kc(i), i = i.sibling;
        T = l, zr = a, ue = c;
      }
      ma(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? (i.return = l, T = i) : ma(e);
  }
}
function ma(e) {
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
              ue || Dl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ue)
                if (n === null)
                  r.componentDidMount();
                else {
                  var l = t.elementType === t.type ? n.memoizedProps : Ie(t.type, n.memoizedProps);
                  r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var i = t.updateQueue;
              i !== null && Zs(t, i, r);
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
                Zs(t, o, n);
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
              throw Error(N(163));
          }
        ue || t.flags & 512 && lo(t);
      } catch (v) {
        K(t, t.return, v);
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
function ha(e) {
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
function va(e) {
  for (; T !== null; ) {
    var t = T;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Dl(4, t);
          } catch (u) {
            K(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              K(t, l, u);
            }
          }
          var i = t.return;
          try {
            lo(t);
          } catch (u) {
            K(t, i, u);
          }
          break;
        case 5:
          var o = t.return;
          try {
            lo(t);
          } catch (u) {
            K(t, o, u);
          }
      }
    } catch (u) {
      K(t, t.return, u);
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
var Sp = Math.ceil, gl = rt.ReactCurrentDispatcher, bo = rt.ReactCurrentOwner, Me = rt.ReactCurrentBatchConfig, I = 0, re = null, J = null, ie = 0, je = 0, tn = jt(0), ee = 0, ir = null, At = 0, Fl = 0, es = 0, Un = null, ye = null, ts = 0, gn = 1 / 0, Ke = null, yl = !1, so = null, gt = null, Lr = !1, dt = null, wl = 0, Bn = 0, ao = null, Yr = -1, Xr = 0;
function me() {
  return I & 6 ? q() : Yr !== -1 ? Yr : Yr = q();
}
function yt(e) {
  return e.mode & 1 ? I & 2 && ie !== 0 ? ie & -ie : lp.transition !== null ? (Xr === 0 && (Xr = zu()), Xr) : (e = O, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ou(e.type)), e) : 1;
}
function Ue(e, t, n, r) {
  if (50 < Bn)
    throw Bn = 0, ao = null, Error(N(185));
  ur(e, n, r), (!(I & 2) || e !== re) && (e === re && (!(I & 2) && (Fl |= n), ee === 4 && ut(e, ie)), Ne(e, r), n === 1 && I === 0 && !(t.mode & 1) && (gn = q() + 500, Ll && kt()));
}
function Ne(e, t) {
  var n = e.callbackNode;
  rf(e, t);
  var r = nl(e, e === re ? ie : 0);
  if (r === 0)
    n !== null && Cs(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Cs(n), t === 1)
      e.tag === 0 ? rp(ga.bind(null, e)) : nc(ga.bind(null, e)), bf(function() {
        !(I & 6) && kt();
      }), n = null;
    else {
      switch (Lu(r)) {
        case 1:
          n = _o;
          break;
        case 4:
          n = Tu;
          break;
        case 16:
          n = tl;
          break;
        case 536870912:
          n = Pu;
          break;
        default:
          n = tl;
      }
      n = td(n, Yc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Yc(e, t) {
  if (Yr = -1, Xr = 0, I & 6)
    throw Error(N(327));
  var n = e.callbackNode;
  if (an() && e.callbackNode !== n)
    return null;
  var r = nl(e, e === re ? ie : 0);
  if (r === 0)
    return null;
  if (r & 30 || r & e.expiredLanes || t)
    t = xl(e, r);
  else {
    t = r;
    var l = I;
    I |= 2;
    var i = qc();
    (re !== e || ie !== t) && (Ke = null, gn = q() + 500, Rt(e, t));
    do
      try {
        kp();
        break;
      } catch (a) {
        Xc(e, a);
      }
    while (!0);
    Uo(), gl.current = i, I = l, J !== null ? t = 0 : (re = null, ie = 0, t = ee);
  }
  if (t !== 0) {
    if (t === 2 && (l = Fi(e), l !== 0 && (r = l, t = uo(e, l))), t === 1)
      throw n = ir, Rt(e, 0), ut(e, r), Ne(e, q()), n;
    if (t === 6)
      ut(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Np(l) && (t = xl(e, r), t === 2 && (i = Fi(e), i !== 0 && (r = i, t = uo(e, i))), t === 1))
        throw n = ir, Rt(e, 0), ut(e, r), Ne(e, q()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          Pt(e, ye, Ke);
          break;
        case 3:
          if (ut(e, r), (r & 130023424) === r && (t = ts + 500 - q(), 10 < t)) {
            if (nl(e, 0) !== 0)
              break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              me(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Hi(Pt.bind(null, e, ye, Ke), t);
            break;
          }
          Pt(e, ye, Ke);
          break;
        case 4:
          if (ut(e, r), (r & 4194240) === r)
            break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - $e(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = q() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Sp(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Hi(Pt.bind(null, e, ye, Ke), r);
            break;
          }
          Pt(e, ye, Ke);
          break;
        case 5:
          Pt(e, ye, Ke);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return Ne(e, q()), e.callbackNode === n ? Yc.bind(null, e) : null;
}
function uo(e, t) {
  var n = Un;
  return e.current.memoizedState.isDehydrated && (Rt(e, t).flags |= 256), e = xl(e, t), e !== 2 && (t = ye, ye = n, t !== null && co(t)), e;
}
function co(e) {
  ye === null ? ye = e : ye.push.apply(ye, e);
}
function Np(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r], i = l.getSnapshot;
          l = l.value;
          try {
            if (!Be(i(), l))
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
  for (t &= ~es, t &= ~Fl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - $e(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ga(e) {
  if (I & 6)
    throw Error(N(327));
  an();
  var t = nl(e, 0);
  if (!(t & 1))
    return Ne(e, q()), null;
  var n = xl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Fi(e);
    r !== 0 && (t = r, n = uo(e, r));
  }
  if (n === 1)
    throw n = ir, Rt(e, 0), ut(e, t), Ne(e, q()), n;
  if (n === 6)
    throw Error(N(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Pt(e, ye, Ke), Ne(e, q()), null;
}
function ns(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    I = n, I === 0 && (gn = q() + 500, Ll && kt());
  }
}
function $t(e) {
  dt !== null && dt.tag === 0 && !(I & 6) && an();
  var t = I;
  I |= 1;
  var n = Me.transition, r = O;
  try {
    if (Me.transition = null, O = 1, e)
      return e();
  } finally {
    O = r, Me.transition = n, I = t, !(I & 6) && kt();
  }
}
function rs() {
  je = tn.current, U(tn);
}
function Rt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Jf(n)), J !== null)
    for (n = J.return; n !== null; ) {
      var r = n;
      switch (Oo(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && sl();
          break;
        case 3:
          hn(), U(xe), U(de), Go();
          break;
        case 5:
          Qo(r);
          break;
        case 4:
          hn();
          break;
        case 13:
          U(W);
          break;
        case 19:
          U(W);
          break;
        case 10:
          Bo(r.type._context);
          break;
        case 22:
        case 23:
          rs();
      }
      n = n.return;
    }
  if (re = e, J = e = wt(e.current, null), ie = je = t, ee = 0, ir = null, es = Fl = At = 0, ye = Un = null, Lt !== null) {
    for (t = 0; t < Lt.length; t++)
      if (n = Lt[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var l = r.next, i = n.pending;
        if (i !== null) {
          var o = i.next;
          i.next = l, r.next = o;
        }
        n.pending = r;
      }
    Lt = null;
  }
  return e;
}
function Xc(e, t) {
  do {
    var n = J;
    try {
      if (Uo(), Qr.current = vl, hl) {
        for (var r = Q.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        hl = !1;
      }
      if (Ot = 0, ne = b = Q = null, An = !1, nr = 0, bo.current = null, n === null || n.return === null) {
        ee = 1, ir = t, J = null;
        break;
      }
      e: {
        var i = e, o = n.return, a = n, u = t;
        if (t = ie, a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, f = a, h = f.tag;
          if (!(f.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var v = f.alternate;
            v ? (f.updateQueue = v.updateQueue, f.memoizedState = v.memoizedState, f.lanes = v.lanes) : (f.updateQueue = null, f.memoizedState = null);
          }
          var x = la(o);
          if (x !== null) {
            x.flags &= -257, ia(x, o, a, i, t), x.mode & 1 && ra(i, c, t), t = x, u = c;
            var g = t.updateQueue;
            if (g === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(u), t.updateQueue = w;
            } else
              g.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              ra(i, c, t), ls();
              break e;
            }
            u = Error(N(426));
          }
        } else if (V && a.mode & 1) {
          var L = la(o);
          if (L !== null) {
            !(L.flags & 65536) && (L.flags |= 256), ia(L, o, a, i, t), Ao(vn(u, a));
            break e;
          }
        }
        i = u = vn(u, a), ee !== 4 && (ee = 2), Un === null ? Un = [i] : Un.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var p = Mc(i, u, t);
              qs(i, p);
              break e;
            case 1:
              a = u;
              var d = i.type, m = i.stateNode;
              if (!(i.flags & 128) && (typeof d.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (gt === null || !gt.has(m)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var y = Rc(i, a, t);
                qs(i, y);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Jc(n);
    } catch (j) {
      t = j, J === n && n !== null && (J = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function qc() {
  var e = gl.current;
  return gl.current = vl, e === null ? vl : e;
}
function ls() {
  (ee === 0 || ee === 3 || ee === 2) && (ee = 4), re === null || !(At & 268435455) && !(Fl & 268435455) || ut(re, ie);
}
function xl(e, t) {
  var n = I;
  I |= 2;
  var r = qc();
  (re !== e || ie !== t) && (Ke = null, Rt(e, t));
  do
    try {
      jp();
      break;
    } catch (l) {
      Xc(e, l);
    }
  while (!0);
  if (Uo(), I = n, gl.current = r, J !== null)
    throw Error(N(261));
  return re = null, ie = 0, ee;
}
function jp() {
  for (; J !== null; )
    Zc(J);
}
function kp() {
  for (; J !== null && !Yd(); )
    Zc(J);
}
function Zc(e) {
  var t = ed(e.alternate, e, je);
  e.memoizedProps = e.pendingProps, t === null ? Jc(e) : J = t, bo.current = null;
}
function Jc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = gp(n, t), n !== null) {
        n.flags &= 32767, J = n;
        return;
      }
      if (e !== null)
        e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ee = 6, J = null;
        return;
      }
    } else if (n = vp(n, t, je), n !== null) {
      J = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      J = t;
      return;
    }
    J = t = e;
  } while (t !== null);
  ee === 0 && (ee = 5);
}
function Pt(e, t, n) {
  var r = O, l = Me.transition;
  try {
    Me.transition = null, O = 1, Cp(e, t, n, r);
  } finally {
    Me.transition = l, O = r;
  }
  return null;
}
function Cp(e, t, n, r) {
  do
    an();
  while (dt !== null);
  if (I & 6)
    throw Error(N(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null)
    return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current)
    throw Error(N(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (lf(e, i), e === re && (J = re = null, ie = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Lr || (Lr = !0, td(tl, function() {
    return an(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Me.transition, Me.transition = null;
    var o = O;
    O = 1;
    var a = I;
    I |= 4, bo.current = null, wp(e, n), Gc(n, e), Qf(Bi), rl = !!Ui, Bi = Ui = null, e.current = n, xp(n), Xd(), I = a, O = o, Me.transition = i;
  } else
    e.current = n;
  if (Lr && (Lr = !1, dt = e, wl = l), i = e.pendingLanes, i === 0 && (gt = null), Jd(n.stateNode), Ne(e, q()), t !== null)
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (yl)
    throw yl = !1, e = so, so = null, e;
  return wl & 1 && e.tag !== 0 && an(), i = e.pendingLanes, i & 1 ? e === ao ? Bn++ : (Bn = 0, ao = e) : Bn = 0, kt(), null;
}
function an() {
  if (dt !== null) {
    var e = Lu(wl), t = Me.transition, n = O;
    try {
      if (Me.transition = null, O = 16 > e ? 16 : e, dt === null)
        var r = !1;
      else {
        if (e = dt, dt = null, wl = 0, I & 6)
          throw Error(N(331));
        var l = I;
        for (I |= 4, T = e.current; T !== null; ) {
          var i = T, o = i.child;
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
                      $n(8, f, i);
                  }
                  var h = f.child;
                  if (h !== null)
                    h.return = f, T = h;
                  else
                    for (; T !== null; ) {
                      f = T;
                      var v = f.sibling, x = f.return;
                      if (Hc(f), f === c) {
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
                    var L = w.sibling;
                    w.sibling = null, w = L;
                  } while (w !== null);
                }
              }
              T = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null)
            o.return = i, T = o;
          else
            e:
              for (; T !== null; ) {
                if (i = T, i.flags & 2048)
                  switch (i.tag) {
                    case 0:
                    case 11:
                    case 15:
                      $n(9, i, i.return);
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
          o = T;
          var m = o.child;
          if (o.subtreeFlags & 2064 && m !== null)
            m.return = o, T = m;
          else
            e:
              for (o = d; T !== null; ) {
                if (a = T, a.flags & 2048)
                  try {
                    switch (a.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Dl(9, a);
                    }
                  } catch (j) {
                    K(a, a.return, j);
                  }
                if (a === o) {
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
        if (I = l, kt(), Qe && typeof Qe.onPostCommitFiberRoot == "function")
          try {
            Qe.onPostCommitFiberRoot(El, e);
          } catch {
          }
        r = !0;
      }
      return r;
    } finally {
      O = n, Me.transition = t;
    }
  }
  return !1;
}
function ya(e, t, n) {
  t = vn(n, t), t = Mc(e, t, 1), e = vt(e, t, 1), t = me(), e !== null && (ur(e, 1, t), Ne(e, t));
}
function K(e, t, n) {
  if (e.tag === 3)
    ya(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ya(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (gt === null || !gt.has(r))) {
          e = vn(n, e), e = Rc(t, e, 1), t = vt(t, e, 1), e = me(), t !== null && (ur(t, 1, e), Ne(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Ep(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = me(), e.pingedLanes |= e.suspendedLanes & n, re === e && (ie & n) === n && (ee === 4 || ee === 3 && (ie & 130023424) === ie && 500 > q() - ts ? Rt(e, 0) : es |= n), Ne(e, t);
}
function bc(e, t) {
  t === 0 && (e.mode & 1 ? (t = Sr, Sr <<= 1, !(Sr & 130023424) && (Sr = 4194304)) : t = 1);
  var n = me();
  e = tt(e, t), e !== null && (ur(e, t, n), Ne(e, n));
}
function _p(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), bc(e, n);
}
function Tp(e, t) {
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
      throw Error(N(314));
  }
  r !== null && r.delete(t), bc(e, n);
}
var ed;
ed = function(e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || xe.current)
      we = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128))
        return we = !1, hp(e, t, n);
      we = !!(e.flags & 131072);
    }
  else
    we = !1, V && t.flags & 1048576 && rc(t, cl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Kr(e, t), e = t.pendingProps;
      var l = fn(t, de.current);
      sn(t, n), l = Yo(null, t, r, e, l, n);
      var i = Xo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Se(r) ? (i = !0, al(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Ho(t), l.updater = Ml, t.stateNode = l, l._reactInternals = t, qi(t, r, e, n), t = bi(null, t, r, !0, i, n)) : (t.tag = 0, V && i && Io(t), pe(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Kr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = zp(r), e = Ie(r, e), l) {
          case 0:
            t = Ji(null, t, r, e, n);
            break e;
          case 1:
            t = aa(null, t, r, e, n);
            break e;
          case 11:
            t = oa(null, t, r, e, n);
            break e;
          case 14:
            t = sa(null, t, r, Ie(r.type, e), n);
            break e;
        }
        throw Error(N(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ie(r, l), Ji(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ie(r, l), aa(e, t, r, l, n);
    case 3:
      e: {
        if (Oc(t), e === null)
          throw Error(N(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, sc(e, t), pl(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated)
          if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
            l = vn(Error(N(423)), t), t = ua(e, t, r, n, l);
            break e;
          } else if (r !== l) {
            l = vn(Error(N(424)), t), t = ua(e, t, r, n, l);
            break e;
          } else
            for (ke = ht(t.stateNode.containerInfo.firstChild), Ce = t, V = !0, Ae = null, n = dc(t, null, r, n), t.child = n; n; )
              n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (pn(), r === l) {
            t = nt(e, t, n);
            break e;
          }
          pe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return fc(t), e === null && Ki(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, Vi(r, l) ? o = null : i !== null && Vi(r, i) && (t.flags |= 32), Ic(e, t), pe(e, t, o, n), t.child;
    case 6:
      return e === null && Ki(t), null;
    case 13:
      return Ac(e, t, n);
    case 4:
      return Wo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = mn(t, null, r, n) : pe(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ie(r, l), oa(e, t, r, l, n);
    case 7:
      return pe(e, t, t.pendingProps, n), t.child;
    case 8:
      return pe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return pe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, A(dl, r._currentValue), r._currentValue = o, i !== null)
          if (Be(i.value, o)) {
            if (i.children === l.children && !xe.current) {
              t = nt(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var a = i.dependencies;
              if (a !== null) {
                o = i.child;
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
                    i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Yi(
                      i.return,
                      n,
                      t
                    ), a.lanes |= n;
                    break;
                  }
                  u = u.next;
                }
              } else if (i.tag === 10)
                o = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (o = i.return, o === null)
                  throw Error(N(341));
                o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Yi(o, n, t), o = i.sibling;
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
        pe(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, sn(t, n), l = Re(l), r = r(l), t.flags |= 1, pe(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Ie(r, t.pendingProps), l = Ie(r.type, l), sa(e, t, r, l, n);
    case 15:
      return Dc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ie(r, l), Kr(e, t), t.tag = 1, Se(r) ? (e = !0, al(t)) : e = !1, sn(t, n), uc(t, r, l), qi(t, r, l, n), bi(null, t, r, !0, e, n);
    case 19:
      return $c(e, t, n);
    case 22:
      return Fc(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function td(e, t) {
  return _u(e, t);
}
function Pp(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Le(e, t, n, r) {
  return new Pp(e, t, n, r);
}
function is(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function zp(e) {
  if (typeof e == "function")
    return is(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ko)
      return 11;
    if (e === Co)
      return 14;
  }
  return 2;
}
function wt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Le(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function qr(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function")
    is(e) && (o = 1);
  else if (typeof e == "string")
    o = 5;
  else
    e:
      switch (e) {
        case Qt:
          return Dt(n.children, l, i, t);
        case jo:
          o = 8, l |= 8;
          break;
        case xi:
          return e = Le(12, n, t, l | 2), e.elementType = xi, e.lanes = i, e;
        case Si:
          return e = Le(13, n, t, l), e.elementType = Si, e.lanes = i, e;
        case Ni:
          return e = Le(19, n, t, l), e.elementType = Ni, e.lanes = i, e;
        case cu:
          return Il(n, l, i, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case au:
                o = 10;
                break e;
              case uu:
                o = 9;
                break e;
              case ko:
                o = 11;
                break e;
              case Co:
                o = 14;
                break e;
              case ot:
                o = 16, r = null;
                break e;
            }
          throw Error(N(130, e == null ? e : typeof e, ""));
      }
  return t = Le(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Dt(e, t, n, r) {
  return e = Le(7, e, r, t), e.lanes = n, e;
}
function Il(e, t, n, r) {
  return e = Le(22, e, r, t), e.elementType = cu, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function fi(e, t, n) {
  return e = Le(6, e, null, t), e.lanes = n, e;
}
function pi(e, t, n) {
  return t = Le(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Lp(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Kl(0), this.expirationTimes = Kl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Kl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function os(e, t, n, r, l, i, o, a, u) {
  return e = new Lp(e, t, n, a, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Le(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ho(i), e;
}
function Mp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Wt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function nd(e) {
  if (!e)
    return St;
  e = e._reactInternals;
  e: {
    if (Bt(e) !== e || e.tag !== 1)
      throw Error(N(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Se(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(N(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Se(n))
      return tc(e, n, t);
  }
  return t;
}
function rd(e, t, n, r, l, i, o, a, u) {
  return e = os(n, r, !0, e, l, i, o, a, u), e.context = nd(null), n = e.current, r = me(), l = yt(n), i = Je(r, l), i.callback = t ?? null, vt(n, i, l), e.current.lanes = l, ur(e, l, r), Ne(e, r), e;
}
function Ol(e, t, n, r) {
  var l = t.current, i = me(), o = yt(l);
  return n = nd(n), t.context === null ? t.context = n : t.pendingContext = n, t = Je(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = vt(l, t, o), e !== null && (Ue(e, l, o, i), Wr(e, l, o)), o;
}
function Sl(e) {
  if (e = e.current, !e.child)
    return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function wa(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function ss(e, t) {
  wa(e, t), (e = e.alternate) && wa(e, t);
}
function Rp() {
  return null;
}
var ld = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function as(e) {
  this._internalRoot = e;
}
Al.prototype.render = as.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null)
    throw Error(N(409));
  Ol(e, t, null, null);
};
Al.prototype.unmount = as.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    $t(function() {
      Ol(null, e, null, null);
    }), t[et] = null;
  }
};
function Al(e) {
  this._internalRoot = e;
}
Al.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Du();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < at.length && t !== 0 && t < at[n].priority; n++)
      ;
    at.splice(n, 0, e), n === 0 && Iu(e);
  }
};
function us(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function $l(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function xa() {
}
function Dp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = Sl(o);
        i.call(c);
      };
    }
    var o = rd(t, r, e, 0, null, !1, !1, "", xa);
    return e._reactRootContainer = o, e[et] = o.current, Zn(e.nodeType === 8 ? e.parentNode : e), $t(), o;
  }
  for (; l = e.lastChild; )
    e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var c = Sl(u);
      a.call(c);
    };
  }
  var u = os(e, 0, !1, null, null, !1, !1, "", xa);
  return e._reactRootContainer = u, e[et] = u.current, Zn(e.nodeType === 8 ? e.parentNode : e), $t(function() {
    Ol(t, u, n, r);
  }), u;
}
function Ul(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var u = Sl(o);
        a.call(u);
      };
    }
    Ol(t, o, e, l);
  } else
    o = Dp(n, t, e, l, r);
  return Sl(o);
}
Mu = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Ln(t.pendingLanes);
        n !== 0 && (To(t, n | 1), Ne(t, q()), !(I & 6) && (gn = q() + 500, kt()));
      }
      break;
    case 13:
      $t(function() {
        var r = tt(e, 1);
        if (r !== null) {
          var l = me();
          Ue(r, e, 1, l);
        }
      }), ss(e, 1);
  }
};
Po = function(e) {
  if (e.tag === 13) {
    var t = tt(e, 134217728);
    if (t !== null) {
      var n = me();
      Ue(t, e, 134217728, n);
    }
    ss(e, 134217728);
  }
};
Ru = function(e) {
  if (e.tag === 13) {
    var t = yt(e), n = tt(e, t);
    if (n !== null) {
      var r = me();
      Ue(n, e, t, r);
    }
    ss(e, t);
  }
};
Du = function() {
  return O;
};
Fu = function(e, t) {
  var n = O;
  try {
    return O = e, t();
  } finally {
    O = n;
  }
};
Mi = function(e, t, n) {
  switch (t) {
    case "input":
      if (Ci(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; )
          n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = zl(r);
            if (!l)
              throw Error(N(90));
            fu(r), Ci(r, l);
          }
        }
      }
      break;
    case "textarea":
      mu(e, n);
      break;
    case "select":
      t = n.value, t != null && nn(e, !!n.multiple, t, !1);
  }
};
Su = ns;
Nu = $t;
var Fp = { usingClientEntryPoint: !1, Events: [dr, Xt, zl, wu, xu, ns] }, Tn = { findFiberByHostInstance: zt, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, Ip = { bundleType: Tn.bundleType, version: Tn.version, rendererPackageName: Tn.rendererPackageName, rendererConfig: Tn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: rt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Cu(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Tn.findFiberByHostInstance || Rp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Mr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Mr.isDisabled && Mr.supportsFiber)
    try {
      El = Mr.inject(Ip), Qe = Mr;
    } catch {
    }
}
_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Fp;
_e.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!us(t))
    throw Error(N(200));
  return Mp(e, t, null, n);
};
_e.createRoot = function(e, t) {
  if (!us(e))
    throw Error(N(299));
  var n = !1, r = "", l = ld;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = os(e, 1, !1, null, null, n, !1, r, l), e[et] = t.current, Zn(e.nodeType === 8 ? e.parentNode : e), new as(t);
};
_e.findDOMNode = function(e) {
  if (e == null)
    return null;
  if (e.nodeType === 1)
    return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(N(188)) : (e = Object.keys(e).join(","), Error(N(268, e)));
  return e = Cu(t), e = e === null ? null : e.stateNode, e;
};
_e.flushSync = function(e) {
  return $t(e);
};
_e.hydrate = function(e, t, n) {
  if (!$l(t))
    throw Error(N(200));
  return Ul(null, e, t, !0, n);
};
_e.hydrateRoot = function(e, t, n) {
  if (!us(e))
    throw Error(N(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = ld;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = rd(t, null, e, 1, n ?? null, l, !1, i, o), e[et] = t.current, Zn(e), r)
    for (e = 0; e < r.length; e++)
      n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
        n,
        l
      );
  return new Al(t);
};
_e.render = function(e, t, n) {
  if (!$l(t))
    throw Error(N(200));
  return Ul(null, e, t, !1, n);
};
_e.unmountComponentAtNode = function(e) {
  if (!$l(e))
    throw Error(N(40));
  return e._reactRootContainer ? ($t(function() {
    Ul(null, null, e, !1, function() {
      e._reactRootContainer = null, e[et] = null;
    });
  }), !0) : !1;
};
_e.unstable_batchedUpdates = ns;
_e.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!$l(n))
    throw Error(N(200));
  if (e == null || e._reactInternals === void 0)
    throw Error(N(38));
  return Ul(e, t, n, !1, r);
};
_e.version = "18.2.0-next-9e3b772b8-20220608";
function id() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(id);
    } catch (e) {
      console.error(e);
    }
}
id(), ru.exports = _e;
var Op = ru.exports, Sa = Op;
cn.createRoot = Sa.createRoot, cn.hydrateRoot = Sa.hydrateRoot;
const Na = ["Tutti", "P", "D", "C", "A"], fo = {
  P: "Portiere",
  D: "Difensore",
  C: "Centrocampista",
  A: "Attaccante",
  U: "Altro"
}, ja = {
  P: 1,
  D: 2,
  C: 3,
  A: 4,
  U: 5
}, Nl = {
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
function Ap({ size: e = 24, ...t }) {
  return /* @__PURE__ */ s.jsxs("svg", { ...lt(e), ...t, children: [
    /* @__PURE__ */ s.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ s.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ s.jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
    /* @__PURE__ */ s.jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
  ] });
}
function ka({ size: e = 20, ...t }) {
  return /* @__PURE__ */ s.jsxs("svg", { ...lt(e), ...t, children: [
    /* @__PURE__ */ s.jsx("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ s.jsx("path", { d: "m21 21-4.3-4.3" })
  ] });
}
function $p({ size: e = 20, ...t }) {
  return /* @__PURE__ */ s.jsxs("svg", { ...lt(e), ...t, children: [
    /* @__PURE__ */ s.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ s.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ s.jsx("path", { d: "m17 8 5 5" }),
    /* @__PURE__ */ s.jsx("path", { d: "m22 8-5 5" })
  ] });
}
function od({ size: e = 20, ...t }) {
  return /* @__PURE__ */ s.jsxs("svg", { ...lt(e), ...t, children: [
    /* @__PURE__ */ s.jsx("path", { d: "M18 6 6 18" }),
    /* @__PURE__ */ s.jsx("path", { d: "m6 6 12 12" })
  ] });
}
function Xe({ size: e = 18, ...t }) {
  return /* @__PURE__ */ s.jsx("svg", { ...lt(e), ...t, children: /* @__PURE__ */ s.jsx("path", { d: "m6 9 6 6 6-6" }) });
}
function Up({ size: e = 16, ...t }) {
  return /* @__PURE__ */ s.jsx("svg", { ...lt(e), ...t, children: /* @__PURE__ */ s.jsx("path", { d: "m18 15-6-6-6 6" }) });
}
function jl({ size: e = 24, ...t }) {
  return /* @__PURE__ */ s.jsx("svg", { ...lt(e), ...t, children: /* @__PURE__ */ s.jsx("path", { d: "M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" }) });
}
function Bp({ size: e = 18, ...t }) {
  return /* @__PURE__ */ s.jsxs("svg", { ...lt(e), ...t, children: [
    /* @__PURE__ */ s.jsx("circle", { cx: "8", cy: "8", r: "6" }),
    /* @__PURE__ */ s.jsx("path", { d: "M18.1 8.4A6 6 0 1 1 8.4 18.1" }),
    /* @__PURE__ */ s.jsx("path", { d: "M6 8h4M8 6v4" })
  ] });
}
function Vp({ size: e = 18, ...t }) {
  return /* @__PURE__ */ s.jsxs("svg", { ...lt(e), ...t, children: [
    /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ s.jsx("path", { d: "M12 8v4" }),
    /* @__PURE__ */ s.jsx("path", { d: "M12 16h.01" })
  ] });
}
function Hp(e) {
  return e.split(/\s+-\s+/).map((t) => t.trim()).filter(Boolean);
}
function Ca({ asset: e, expanded: t, onToggle: n }) {
  const r = Hp(e.displayName);
  return /* @__PURE__ */ s.jsxs("div", { children: [
    /* @__PURE__ */ s.jsxs("button", { type: "button", onClick: n, className: "tw-hidden tw-w-full tw-grid-cols-12 tw-gap-4 tw-px-6 tw-py-4 tw-text-left tw-transition hover:tw-bg-slate-50 md:tw-grid", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tw-col-span-4 tw-flex tw-min-w-0 tw-items-center tw-gap-3", children: [
        /* @__PURE__ */ s.jsx("div", { className: "lf-player-avatar", children: /* @__PURE__ */ s.jsx(jl, { size: 22 }) }),
        /* @__PURE__ */ s.jsxs("div", { className: "tw-min-w-0", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "tw-truncate tw-font-semibold tw-text-slate-900", children: [
            "Blocco ",
            e.realTeam || e.displayName
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-slate-500", children: [
            r.length,
            " portieri",
            /* @__PURE__ */ s.jsx(Xe, { size: 15, className: `tw-transition ${t ? "tw-rotate-180" : ""}` })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center", children: /* @__PURE__ */ s.jsx("span", { className: "lf-role-badge lf-role-badge--p", children: "Portiere" }) }),
      /* @__PURE__ */ s.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center tw-text-xl tw-font-black tw-text-slate-900", children: e.quotation || "—" }),
      /* @__PURE__ */ s.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center tw-text-lg tw-font-bold tw-text-[var(--primary)]", children: e.purchasePrice || "—" }),
      /* @__PURE__ */ s.jsx("div", { className: `tw-col-span-2 tw-flex tw-items-center tw-truncate tw-text-sm ${e.ownerTag ? "tw-text-slate-600" : "tw-italic tw-text-slate-400"}`, children: e.ownerTag || "Svincolato" })
    ] }),
    /* @__PURE__ */ s.jsxs("button", { type: "button", onClick: n, className: "tw-flex tw-w-full tw-items-start tw-gap-3 tw-p-3 tw-text-left tw-transition hover:tw-bg-slate-50 md:tw-hidden", children: [
      /* @__PURE__ */ s.jsx("div", { className: "lf-player-avatar lf-player-avatar--mobile", children: /* @__PURE__ */ s.jsx(jl, { size: 22 }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "tw-min-w-0 tw-flex-1", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
          /* @__PURE__ */ s.jsx("span", { className: "lf-role-badge lf-role-badge--p", children: "P" }),
          /* @__PURE__ */ s.jsxs("strong", { className: "tw-truncate tw-text-slate-900", children: [
            "Blocco ",
            e.realTeam || e.displayName
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "tw-mt-1 tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-slate-500", children: [
          r.length,
          " portieri ",
          /* @__PURE__ */ s.jsx(Xe, { size: 14, className: `tw-transition ${t ? "tw-rotate-180" : ""}` })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-x-3 tw-gap-y-1 tw-text-xs", children: [
          /* @__PURE__ */ s.jsxs("span", { children: [
            /* @__PURE__ */ s.jsx("span", { className: "tw-text-slate-400", children: "Quot:" }),
            " ",
            /* @__PURE__ */ s.jsx("strong", { children: e.quotation || "—" })
          ] }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            /* @__PURE__ */ s.jsx("span", { className: "tw-text-slate-400", children: "Acq:" }),
            " ",
            /* @__PURE__ */ s.jsx("strong", { className: "tw-text-[var(--primary)]", children: e.purchasePrice || "—" })
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "tw-truncate tw-text-slate-500", children: [
            "👤 ",
            e.ownerTag || "Svincolato"
          ] })
        ] })
      ] })
    ] }),
    t && /* @__PURE__ */ s.jsx("div", { className: "lf-block-expanded", children: r.map((l) => /* @__PURE__ */ s.jsxs("div", { className: "tw-flex tw-items-center tw-gap-3 tw-px-6 tw-py-3", children: [
      /* @__PURE__ */ s.jsx("div", { className: "lf-mini-avatar", children: "P" }),
      /* @__PURE__ */ s.jsxs("div", { className: "tw-min-w-0", children: [
        /* @__PURE__ */ s.jsx("div", { className: "tw-truncate tw-font-medium tw-text-slate-800", children: l }),
        /* @__PURE__ */ s.jsx("div", { className: "tw-text-xs tw-text-slate-500", children: e.realTeam || "Portiere" })
      ] })
    ] }, l)) })
  ] });
}
function Wp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function Qp({ player: e }) {
  return /* @__PURE__ */ s.jsxs("div", { className: "tw-group tw-grid tw-grid-cols-12 tw-gap-4 tw-px-6 tw-py-4 tw-transition hover:tw-bg-slate-50", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "tw-col-span-4 tw-flex tw-min-w-0 tw-items-center tw-gap-3", children: [
      /* @__PURE__ */ s.jsx("div", { className: "lf-player-avatar", "aria-hidden": "true", children: Wp(e.displayName) }),
      /* @__PURE__ */ s.jsxs("div", { className: "tw-min-w-0", children: [
        /* @__PURE__ */ s.jsxs("div", { className: `tw-truncate tw-font-semibold tw-transition group-hover:tw-text-[var(--primary)] ${e.active ? "tw-text-slate-900" : "tw-italic tw-text-slate-400"}`, children: [
          e.displayName,
          !e.active && " *"
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "tw-truncate tw-text-sm tw-text-slate-500", children: e.realTeam || "—" })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center", children: /* @__PURE__ */ s.jsx("span", { className: Nl[e.role] ?? Nl.U, children: fo[e.role] ?? "?" }) }),
    /* @__PURE__ */ s.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ s.jsx("span", { className: "tw-text-xl tw-font-black tw-text-slate-900", children: e.quotation || "—" }) }),
    /* @__PURE__ */ s.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ s.jsx("span", { className: e.purchasePrice ? "tw-text-lg tw-font-bold tw-text-[var(--primary)]" : "tw-text-slate-400", children: e.purchasePrice || "—" }) }),
    /* @__PURE__ */ s.jsx("div", { className: "tw-col-span-2 tw-flex tw-items-center tw-min-w-0", children: /* @__PURE__ */ s.jsx("span", { className: `tw-truncate tw-text-sm ${e.ownerTag ? "tw-text-slate-600" : "tw-italic tw-text-slate-400"}`, children: e.ownerTag || "Svincolato" }) })
  ] });
}
function Gp({
  teams: e,
  owners: t,
  currentRole: n,
  currentTeam: r,
  currentOwner: l,
  hasActiveFilters: i,
  onRoleChange: o,
  onTeamChange: a,
  onOwnerChange: u,
  onResetFilters: c
}) {
  return /* @__PURE__ */ s.jsxs("div", { className: "tw-mb-5 sm:tw-mb-6", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "tw-hidden tw-items-center tw-justify-between tw-gap-4 md:tw-flex", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Na.map((f) => /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          onClick: () => o(f),
          className: `lf-role-pill ${n === f ? "lf-role-pill--active" : ""}`,
          children: f === "Tutti" ? "Tutti" : fo[f]
        },
        f
      )) }),
      /* @__PURE__ */ s.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ s.jsxs("label", { className: "lf-select-wrap", children: [
          /* @__PURE__ */ s.jsx("span", { "aria-hidden": "true", children: "🏟️" }),
          /* @__PURE__ */ s.jsxs("select", { value: r, onChange: (f) => a(f.target.value), "aria-label": "Filtra per squadra reale", children: [
            /* @__PURE__ */ s.jsx("option", { value: "Tutti", children: "Squadra" }),
            e.map((f) => /* @__PURE__ */ s.jsx("option", { value: f, children: f }, f))
          ] }),
          /* @__PURE__ */ s.jsx(Xe, { size: 14 })
        ] }),
        /* @__PURE__ */ s.jsxs("label", { className: "lf-select-wrap", children: [
          /* @__PURE__ */ s.jsx("span", { "aria-hidden": "true", children: "👤" }),
          /* @__PURE__ */ s.jsxs("select", { value: l, onChange: (f) => u(f.target.value), "aria-label": "Filtra per proprietario", children: [
            /* @__PURE__ */ s.jsx("option", { value: "Tutti", children: "Proprietario" }),
            t.map((f) => /* @__PURE__ */ s.jsx("option", { value: f, children: f }, f))
          ] }),
          /* @__PURE__ */ s.jsx(Xe, { size: 14 })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "lf-mobile-filters md:tw-hidden", children: [
      /* @__PURE__ */ s.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ s.jsx("span", { className: "lf-mobile-filter__label", children: "Ruolo" }),
        /* @__PURE__ */ s.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ s.jsx("select", { value: n, onChange: (f) => o(f.target.value), "aria-label": "Filtra per ruolo", children: Na.map((f) => /* @__PURE__ */ s.jsx("option", { value: f, children: f === "Tutti" ? "Tutti" : fo[f] }, f)) }),
          /* @__PURE__ */ s.jsx(Xe, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ s.jsx("span", { className: "lf-mobile-filter__label", children: "Squadra" }),
        /* @__PURE__ */ s.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ s.jsxs("select", { value: r, onChange: (f) => a(f.target.value), "aria-label": "Filtra per squadra reale", children: [
            /* @__PURE__ */ s.jsx("option", { value: "Tutti", children: "Tutte" }),
            e.map((f) => /* @__PURE__ */ s.jsx("option", { value: f, children: f }, f))
          ] }),
          /* @__PURE__ */ s.jsx(Xe, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("label", { className: "lf-mobile-filter", children: [
        /* @__PURE__ */ s.jsx("span", { className: "lf-mobile-filter__label", children: "Proprietario" }),
        /* @__PURE__ */ s.jsxs("span", { className: "lf-mobile-filter__control", children: [
          /* @__PURE__ */ s.jsxs("select", { value: l, onChange: (f) => u(f.target.value), "aria-label": "Filtra per proprietario", children: [
            /* @__PURE__ */ s.jsx("option", { value: "Tutti", children: "Tutti" }),
            t.map((f) => /* @__PURE__ */ s.jsx("option", { value: f, children: f }, f))
          ] }),
          /* @__PURE__ */ s.jsx(Xe, { size: 14 })
        ] })
      ] })
    ] }),
    i && /* @__PURE__ */ s.jsxs("button", { type: "button", onClick: c, className: "lf-mobile-reset md:tw-hidden", children: [
      /* @__PURE__ */ s.jsx(od, { size: 15 }),
      " Azzera filtri"
    ] })
  ] });
}
function mi({ active: e, direction: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ s.jsx(Up, { size: 14 }) : /* @__PURE__ */ s.jsx(Xe, { size: 14 }) : null;
}
function Kp({ sortKey: e, sortDirection: t, onSort: n }) {
  return /* @__PURE__ */ s.jsxs("div", { className: "tw-hidden tw-grid-cols-12 tw-gap-4 tw-border-b tw-border-slate-200 tw-bg-slate-50 tw-px-6 tw-py-4 tw-text-xs tw-font-bold tw-uppercase tw-tracking-wider tw-text-slate-500 md:tw-grid", children: [
    /* @__PURE__ */ s.jsx("div", { className: "tw-col-span-4", children: "Giocatore" }),
    /* @__PURE__ */ s.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2", onClick: () => n("position"), children: [
      "Ruolo ",
      /* @__PURE__ */ s.jsx(mi, { active: e === "position", direction: t })
    ] }),
    /* @__PURE__ */ s.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2 tw-justify-center", onClick: () => n("quotation"), children: [
      "Quot. ",
      /* @__PURE__ */ s.jsx(mi, { active: e === "quotation", direction: t })
    ] }),
    /* @__PURE__ */ s.jsxs("button", { type: "button", className: "lf-sort tw-col-span-2 tw-justify-center", onClick: () => n("purchasePrice"), children: [
      "Prezzo ",
      /* @__PURE__ */ s.jsx(mi, { active: e === "purchasePrice", direction: t })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "tw-col-span-2", children: "Proprietario" })
  ] });
}
function Yp(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function Xp({ player: e }) {
  return /* @__PURE__ */ s.jsx("article", { className: "tw-p-3 tw-transition hover:tw-bg-slate-50", children: /* @__PURE__ */ s.jsxs("div", { className: "tw-flex tw-items-start tw-gap-3", children: [
    /* @__PURE__ */ s.jsx("div", { className: "lf-player-avatar lf-player-avatar--mobile", "aria-hidden": "true", children: Yp(e.displayName) }),
    /* @__PURE__ */ s.jsxs("div", { className: "tw-min-w-0 tw-flex-1", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tw-mb-1 tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ s.jsx("span", { className: Nl[e.role] ?? Nl.U, children: e.role || "?" }),
        /* @__PURE__ */ s.jsxs("span", { className: `tw-truncate tw-font-semibold ${e.active ? "tw-text-slate-900" : "tw-italic tw-text-slate-400"}`, children: [
          e.displayName,
          !e.active && " *"
        ] })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tw-mb-2 tw-truncate tw-text-xs tw-text-slate-500", children: e.realTeam || "—" }),
      /* @__PURE__ */ s.jsxs("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-x-3 tw-gap-y-1 tw-text-xs", children: [
        /* @__PURE__ */ s.jsxs("span", { children: [
          /* @__PURE__ */ s.jsx("span", { className: "tw-text-slate-400", children: "Quot:" }),
          " ",
          /* @__PURE__ */ s.jsx("strong", { className: "tw-text-slate-900", children: e.quotation || "—" })
        ] }),
        /* @__PURE__ */ s.jsxs("span", { children: [
          /* @__PURE__ */ s.jsx("span", { className: "tw-text-slate-400", children: "Acq:" }),
          " ",
          /* @__PURE__ */ s.jsx("strong", { className: "tw-text-[var(--primary)]", children: e.purchasePrice || "—" })
        ] }),
        /* @__PURE__ */ s.jsxs("span", { className: `tw-max-w-full tw-truncate ${e.ownerTag ? "tw-text-slate-500" : "tw-italic tw-text-slate-400"}`, children: [
          "👤 ",
          e.ownerTag || "Svincolato"
        ] })
      ] })
    ] })
  ] }) });
}
function Ea(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ø/g, "O").replace(/ø/g, "o").toLowerCase();
}
function _a(e) {
  return e.type === "goalkeeper_block" || e.role === "P" && /\s+-\s+/.test(e.displayName);
}
function qp({ assets: e }) {
  const [t, n] = z.useState(""), [r, l] = z.useState("Tutti"), [i, o] = z.useState("Tutti"), [a, u] = z.useState("Tutti"), [c, f] = z.useState(!1), [h, v] = z.useState("position"), [x, g] = z.useState("asc"), [w, L] = z.useState(/* @__PURE__ */ new Set()), p = z.useMemo(() => [...new Set(e.map((C) => C.realTeam).filter(Boolean))].sort((C, S) => C.localeCompare(S, "it")), [e]), d = z.useMemo(() => [...new Set(e.map((C) => C.ownerTag).filter(Boolean))].sort((C, S) => C.localeCompare(S, "it")), [e]), m = z.useMemo(() => {
    const C = Ea(t.trim());
    return e.filter((S) => !(C && !Ea(`${S.displayName} ${S.realTeam} ${S.ownerTag}`).includes(C) || c && !S.isFreeAgent || r !== "Tutti" && S.role !== r || i !== "Tutti" && S.realTeam !== i || a !== "Tutti" && S.ownerTag !== a));
  }, [e, a, r, t, c, i]), y = z.useMemo(() => [...m].sort((C, S) => {
    if (h === "position") {
      const B = (ja[C.role] ?? 9) - (ja[S.role] ?? 9), H = x === "asc" ? B : -B;
      if (H !== 0)
        return H;
      const Z = C.realTeam.localeCompare(S.realTeam, "it");
      if (Z !== 0)
        return Z;
      const Vt = S.quotation - C.quotation;
      return Vt !== 0 ? Vt : C.displayName.localeCompare(S.displayName, "it");
    }
    const R = (C[h] || 0) - (S[h] || 0);
    return x === "asc" ? R : -R;
  }), [m, x, h]), j = !!(t || r !== "Tutti" || i !== "Tutti" || a !== "Tutti" || c), E = () => {
    n(""), l("Tutti"), o("Tutti"), u("Tutti"), f(!1), v("position"), g("asc");
  }, _ = (C) => {
    if (h === C) {
      x === "desc" || v("position"), g("asc");
      return;
    }
    v(C), g("desc");
  }, k = (C) => {
    L((S) => {
      const R = new Set(S);
      return R.has(C) ? R.delete(C) : R.add(C), R;
    });
  };
  return /* @__PURE__ */ s.jsx("div", { className: "tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7", children: /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-7xl", children: [
    /* @__PURE__ */ s.jsx("div", { className: "tw-flex tw-justify-end tw-p-4 sm:tw-p-6 lg:tw-p-8", children: /* @__PURE__ */ s.jsxs("div", { className: "tw-flex tw-w-full tw-flex-wrap tw-items-stretch tw-gap-2 lg:tw-ml-auto lg:tw-w-auto lg:tw-justify-end", children: [
      /* @__PURE__ */ s.jsxs("label", { className: "lf-search tw-min-w-0 tw-flex-1 lg:tw-w-80 lg:tw-flex-none", children: [
        /* @__PURE__ */ s.jsx(ka, { size: 20 }),
        /* @__PURE__ */ s.jsx("input", { type: "search", placeholder: "Cerca giocatore...", value: t, onChange: (C) => n(C.target.value) })
      ] }),
      /* @__PURE__ */ s.jsxs("button", { type: "button", onClick: () => f((C) => !C), className: `lf-action-button ${c ? "lf-action-button--active" : ""}`, title: "Mostra solo giocatori svincolati", children: [
        /* @__PURE__ */ s.jsx($p, { size: 20 }),
        /* @__PURE__ */ s.jsx("span", { className: "tw-hidden sm:tw-inline", children: "Svincolati" })
      ] }),
      j && /* @__PURE__ */ s.jsx("button", { type: "button", onClick: E, className: "lf-reset-button tw-hidden md:tw-flex", title: "Azzera filtri", children: /* @__PURE__ */ s.jsx(od, { size: 20 }) })
    ] }) }),
    /* @__PURE__ */ s.jsxs("div", { className: "tw-px-3 sm:tw-px-6 lg:tw-px-8", children: [
      /* @__PURE__ */ s.jsx(
        Gp,
        {
          teams: p,
          owners: d,
          currentRole: r,
          currentTeam: i,
          currentOwner: a,
          hasActiveFilters: j,
          onRoleChange: l,
          onTeamChange: o,
          onOwnerChange: u,
          onResetFilters: E
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "tw-mb-3 tw-flex tw-items-center tw-justify-between tw-text-xs tw-font-semibold tw-text-slate-500", children: [
        /* @__PURE__ */ s.jsxs("span", { children: [
          y.length,
          " risultati"
        ] }),
        y.length !== e.length && /* @__PURE__ */ s.jsxs("span", { children: [
          "su ",
          e.length
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "lf-list-table", children: [
        /* @__PURE__ */ s.jsx(Kp, { sortKey: h, sortDirection: x, onSort: _ }),
        /* @__PURE__ */ s.jsx("div", { className: "tw-hidden tw-divide-y tw-divide-slate-100 md:tw-block", children: y.map((C) => _a(C) ? /* @__PURE__ */ s.jsx(Ca, { asset: C, expanded: w.has(C.assetCode), onToggle: () => k(C.assetCode) }, C.assetCode) : /* @__PURE__ */ s.jsx(Qp, { player: C }, C.assetCode)) }),
        /* @__PURE__ */ s.jsx("div", { className: "tw-divide-y tw-divide-slate-100 md:tw-hidden", children: y.map((C) => _a(C) ? /* @__PURE__ */ s.jsx(Ca, { asset: C, expanded: w.has(C.assetCode), onToggle: () => k(C.assetCode) }, C.assetCode) : /* @__PURE__ */ s.jsx(Xp, { player: C }, C.assetCode)) }),
        y.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "tw-px-6 tw-py-14 tw-text-center", children: [
          /* @__PURE__ */ s.jsx(ka, { size: 34, className: "tw-mx-auto tw-mb-3 tw-text-slate-300" }),
          /* @__PURE__ */ s.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-slate-800", children: "Nessun giocatore trovato" }),
          /* @__PURE__ */ s.jsx("p", { className: "tw-mb-0 tw-mt-1 tw-text-sm tw-text-slate-500", children: "Prova a modificare i filtri di ricerca." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "tw-h-4 sm:tw-h-6" })
  ] }) });
}
function Zp(e) {
  return e.map((t) => ({
    ...t,
    purchasePrice: t.purchasePrice ?? 0,
    managerCredits: t.managerCredits ?? null
  }));
}
function hi() {
  var e, t, n, r;
  return {
    state: ((t = (e = window.LineupLeagueData) == null ? void 0 : e.getState) == null ? void 0 : t.call(e)) ?? { status: "idle" },
    assets: Zp(((r = (n = window.LineupLeagueData) == null ? void 0 : n.getAssets) == null ? void 0 : r.call(n)) ?? [])
  };
}
function cs() {
  var o;
  const e = z.useMemo(hi, []), [t, n] = z.useState(e.state), [r, l] = z.useState(e.assets), i = (o = window.LINEUP_FANTA) == null ? void 0 : o.league;
  return z.useEffect(() => {
    let a = !1, u = 0;
    const c = () => {
      if (a)
        return;
      const h = hi();
      n(h.state), l(h.assets), u += 1, h.state.status !== "ready" && u < 20 && window.setTimeout(c, 150);
    }, f = (h) => {
      if (h.detail.leagueId !== (i == null ? void 0 : i.id))
        return;
      const v = hi();
      n(v.state), l(v.assets);
    };
    return document.addEventListener("lineup:league-assets-ready", f), c(), () => {
      a = !0, document.removeEventListener("lineup:league-assets-ready", f);
    };
  }, [i == null ? void 0 : i.id]), { state: t, assets: r, league: i };
}
function Jp() {
  const { state: e, assets: t } = cs();
  return e.status === "error" ? /* @__PURE__ */ s.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ s.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-red-600", children: "Errore nel caricamento del Listone" }),
    /* @__PURE__ */ s.jsx("p", { className: "tw-mb-0 tw-mt-2 tw-text-sm tw-text-slate-500", children: "Controlla il CSV della lega e ricarica la pagina." })
  ] }) }) : e.status !== "ready" ? /* @__PURE__ */ s.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ s.jsx("div", { className: "lf-spinner tw-mx-auto tw-mb-3" }),
    /* @__PURE__ */ s.jsx("p", { className: "tw-m-0 tw-text-sm tw-font-semibold tw-text-slate-500", children: "Caricamento del Listone…" })
  ] }) }) : /* @__PURE__ */ s.jsx(qp, { assets: t });
}
function bp(e) {
  return e.split(/\s+-\s+/).map((t) => t.trim()).filter(Boolean);
}
function em(e) {
  return e.split(/\s+/).filter(Boolean).slice(0, 2).map((t) => {
    var n;
    return (n = t[0]) == null ? void 0 : n.toUpperCase();
  }).join("") || "?";
}
function Rr({ players: e, role: t, label: n }) {
  const [r, l] = z.useState(/* @__PURE__ */ new Set()), i = e.filter((a) => a.role === t).sort((a, u) => {
    const c = u.purchasePrice - a.purchasePrice;
    return c !== 0 ? c : a.displayName.localeCompare(u.displayName, "it");
  }), o = (a) => {
    l((u) => {
      const c = new Set(u);
      return c.has(a) ? c.delete(a) : c.add(a), c;
    });
  };
  return /* @__PURE__ */ s.jsxs("section", { className: "lf-squad-section", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "lf-squad-section__title", children: [
      n,
      t === "P" ? " (Blocchi)" : ""
    ] }),
    i.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "lf-squad-empty", children: "—" }) : /* @__PURE__ */ s.jsx("div", { className: "lf-squad-list", children: i.map((a) => {
      const u = t === "P" && (a.type === "goalkeeper_block" || /\s+-\s+/.test(a.displayName)), c = r.has(a.assetCode), f = u ? bp(a.displayName) : [], h = /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsxs("div", { className: "lf-squad-item__left", children: [
          /* @__PURE__ */ s.jsx("div", { className: `lf-squad-avatar lf-squad-avatar--${t.toLowerCase()}`, "aria-hidden": "true", children: u ? /* @__PURE__ */ s.jsx(jl, { size: 17 }) : em(a.displayName) }),
          /* @__PURE__ */ s.jsxs("div", { className: "lf-squad-item__copy", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "lf-squad-item__name", children: [
              u ? `Blocco ${a.realTeam || a.displayName}` : a.displayName,
              !a.active && " *",
              u && /* @__PURE__ */ s.jsx(Xe, { size: 14, className: c ? "lf-chevron-open" : "" })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "lf-squad-item__team", children: u ? `${f.length} portieri` : a.realTeam || "—" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "lf-squad-values", children: [
          /* @__PURE__ */ s.jsxs("span", { children: [
            /* @__PURE__ */ s.jsx("small", { children: "Q" }),
            /* @__PURE__ */ s.jsx("strong", { children: a.quotation || "—" })
          ] }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            /* @__PURE__ */ s.jsx("small", { children: "P" }),
            /* @__PURE__ */ s.jsx("strong", { className: "lf-squad-price", children: a.purchasePrice || "—" })
          ] })
        ] })
      ] });
      return /* @__PURE__ */ s.jsxs("div", { className: "lf-squad-item-wrap", children: [
        u ? /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "lf-squad-item lf-squad-item--clickable",
            onClick: () => o(a.assetCode),
            "aria-expanded": c,
            children: h
          }
        ) : /* @__PURE__ */ s.jsx("div", { className: "lf-squad-item", children: h }),
        u && c && /* @__PURE__ */ s.jsx("div", { className: "lf-squad-goalkeepers", children: f.map((v) => /* @__PURE__ */ s.jsxs("div", { className: "lf-squad-goalkeeper", children: [
          /* @__PURE__ */ s.jsx("div", { className: "lf-squad-goalkeeper__avatar", children: "P" }),
          /* @__PURE__ */ s.jsx("span", { children: v })
        ] }, v)) })
      ] }, a.assetCode);
    }) })
  ] });
}
const vi = { P: 2, D: 8, C: 8, A: 6 }, tm = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 });
function nm({ team: e }) {
  const [t, n] = z.useState("ALL"), [r, l] = z.useState(!1), i = (u) => {
    n((c) => c === u ? "ALL" : u);
  }, o = !!(e.logoUrl && !r), a = e.credits === null ? "—" : tm.format(e.credits);
  return /* @__PURE__ */ s.jsxs("article", { className: "lf-team-card", children: [
    /* @__PURE__ */ s.jsxs("header", { className: "lf-team-card__header", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "lf-team-card__identity", children: [
        /* @__PURE__ */ s.jsx("div", { className: `lf-team-card__avatar ${o ? "has-logo" : ""}`, children: o ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: e.logoUrl,
            alt: `Logo di ${e.managerName}`,
            loading: "lazy",
            referrerPolicy: "no-referrer",
            onError: () => l(!0)
          }
        ) : e.managerName.charAt(0).toUpperCase() }),
        /* @__PURE__ */ s.jsxs("div", { className: "lf-team-card__copy", children: [
          /* @__PURE__ */ s.jsx("span", { className: "lf-team-card__eyebrow", children: "Allenatore" }),
          /* @__PURE__ */ s.jsx("h2", { title: e.managerName, children: e.managerName })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "lf-team-card__meta", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "lf-team-card__credits", children: [
          /* @__PURE__ */ s.jsx("span", { children: "Crediti" }),
          /* @__PURE__ */ s.jsxs("strong", { children: [
            /* @__PURE__ */ s.jsx(Bp, { size: 16 }),
            " ",
            a
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: `lf-team-status ${e.isComplete ? "lf-team-status--complete" : "lf-team-status--incomplete"}`, children: [
          e.isComplete ? /* @__PURE__ */ s.jsx(jl, { size: 13 }) : /* @__PURE__ */ s.jsx(Vp, { size: 13 }),
          e.isComplete ? "ROSA COMPLETA" : "INCOMPLETA"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "lf-team-role-filters", "aria-label": `Filtra la rosa di ${e.managerName} per ruolo`, children: Object.keys(vi).map((u) => {
      const c = e.roleCounts[u] === vi[u];
      return /* @__PURE__ */ s.jsxs(
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
            vi[u]
          ]
        },
        u
      );
    }) }),
    /* @__PURE__ */ s.jsx("div", { className: "lf-team-roster-frame", children: /* @__PURE__ */ s.jsxs("div", { className: "lf-team-roster", children: [
      (t === "ALL" || t === "P") && /* @__PURE__ */ s.jsx(Rr, { players: e.players, role: "P", label: "Portieri" }),
      (t === "ALL" || t === "D") && /* @__PURE__ */ s.jsx(Rr, { players: e.players, role: "D", label: "Difensori" }),
      (t === "ALL" || t === "C") && /* @__PURE__ */ s.jsx(Rr, { players: e.players, role: "C", label: "Centrocampisti" }),
      (t === "ALL" || t === "A") && /* @__PURE__ */ s.jsx(Rr, { players: e.players, role: "A", label: "Attaccanti" })
    ] }) })
  ] });
}
function gi(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function rm(e) {
  if (typeof e == "number" && Number.isFinite(e))
    return e;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e.trim().replace(",", "."));
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function lm(e) {
  if (!gi(e))
    return {};
  const t = gi(e.teams) ? e.teams : e;
  return Object.entries(t).reduce((n, [r, l]) => {
    if (!gi(l))
      return n;
    const i = l, o = i.logoUrl ?? i.logo_url;
    return n[r] = {
      credits: rm(i.credits),
      logoUrl: typeof o == "string" ? o.trim() : ""
    }, n;
  }, {});
}
async function im(e, t) {
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
  return lm(await i.json());
}
function yi() {
  return document.documentElement.dataset.leagueSection ?? "formation";
}
function ds(e, t = 3e4) {
  const [n, r] = z.useState(0);
  return z.useEffect(() => {
    const l = () => r((c) => c + 1), i = (c) => {
      const f = c.detail;
      (f == null ? void 0 : f.section) === e && l();
    }, o = () => {
      yi() === e && l();
    }, a = () => {
      !document.hidden && yi() === e && l();
    }, u = window.setInterval(() => {
      !document.hidden && yi() === e && l();
    }, t);
    return window.addEventListener("lineup:league-section-change", i), window.addEventListener("focus", o), document.addEventListener("visibilitychange", a), () => {
      window.clearInterval(u), window.removeEventListener("lineup:league-section-change", i), window.removeEventListener("focus", o), document.removeEventListener("visibilitychange", a);
    };
  }, [t, e]), n;
}
async function Vn(e, t) {
  const n = e.includes("?") ? "&" : "?", r = await fetch(`${e}${n}_lf=${Date.now()}`, {
    cache: "no-store",
    signal: t,
    headers: {
      "Cache-Control": "no-cache, no-store, max-age=0",
      Pragma: "no-cache"
    }
  });
  if (!r.ok)
    throw new Error(`HTTP ${r.status}`);
  return r.text();
}
const Ta = { P: 2, D: 8, C: 8, A: 6 };
function om({ assets: e, leagueId: t, profilesUrl: n }) {
  const [r, l] = z.useState({}), i = ds("rose");
  z.useEffect(() => {
    let a = !1;
    return im(t, n).then((u) => {
      a || l(u);
    }).catch((u) => {
      console.warn("Team profiles load error", u), a || l({});
    }), () => {
      a = !0;
    };
  }, [t, n, i]);
  const o = z.useMemo(() => {
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
      f.forEach((L) => {
        L.role in h && (h[L.role] += 1);
      });
      const v = Object.keys(Ta).every((L) => h[L] === Ta[L]), x = r[c], g = ((w = f.find((L) => L.managerCredits !== null)) == null ? void 0 : w.managerCredits) ?? null;
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
  return /* @__PURE__ */ s.jsx("div", { className: "tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7", children: /* @__PURE__ */ s.jsx("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-7xl", children: o.length > 0 ? /* @__PURE__ */ s.jsx("div", { className: "lf-teams-grid", children: o.map((a) => /* @__PURE__ */ s.jsx(nm, { team: a }, a.managerName)) }) : /* @__PURE__ */ s.jsxs("div", { className: "lf-teams-empty", children: [
    /* @__PURE__ */ s.jsx(Ap, { size: 34 }),
    /* @__PURE__ */ s.jsx("h2", { children: "Nessuna rosa disponibile" }),
    /* @__PURE__ */ s.jsx("p", { children: "Nel CSV non risultano asset assegnati a un proprietario." })
  ] }) }) });
}
function sm() {
  var r;
  const { state: e, assets: t, league: n } = cs();
  return e.status === "error" ? /* @__PURE__ */ s.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ s.jsx("h2", { className: "tw-m-0 tw-text-lg tw-font-bold tw-text-red-600", children: "Errore nel caricamento delle Rose" }),
    /* @__PURE__ */ s.jsx("p", { className: "tw-mb-0 tw-mt-2 tw-text-sm tw-text-slate-500", children: "Controlla il CSV della lega e ricarica la pagina." })
  ] }) }) : e.status !== "ready" ? /* @__PURE__ */ s.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card tw-mx-auto tw-max-w-4xl tw-p-7 tw-text-center", children: [
    /* @__PURE__ */ s.jsx("div", { className: "lf-spinner tw-mx-auto tw-mb-3" }),
    /* @__PURE__ */ s.jsx("p", { className: "tw-m-0 tw-text-sm tw-font-semibold tw-text-slate-500", children: "Caricamento delle Rose…" })
  ] }) }) : /* @__PURE__ */ s.jsx(om, { assets: t, leagueId: (n == null ? void 0 : n.id) ?? "", profilesUrl: (r = n == null ? void 0 : n.leagueData) == null ? void 0 : r.teamProfilesUrl });
}
function Pa(e) {
  const t = [];
  let n = "", r = !1;
  for (let l = 0; l < e.length; l += 1) {
    const i = e[l];
    i === '"' ? r && e[l + 1] === '"' ? (n += '"', l += 1) : r = !r : i === "," && !r ? (t.push(n), n = "") : n += i;
  }
  return t.push(n), t.map((l) => l.trim());
}
function po(e) {
  const t = String(e ?? "").trim().replace(",", ".");
  if (!t)
    return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}
function Dr(e) {
  const t = po(e);
  return t === null ? null : Math.trunc(t);
}
function am(e, t) {
  const n = String(e ?? "").replace(/^\uFEFF/, "").split(/\r?\n/).filter((a) => a.trim().length > 0);
  if (n.length === 0)
    return [];
  const r = Pa(n[0]).map((a) => a.toLowerCase()), l = (a) => r.indexOf(a);
  if ([
    "real_round_number",
    "fantasy_matchday_number",
    "home_team",
    "away_team"
  ].some((a) => l(a) < 0))
    throw new Error("Il CSV Calendario non contiene tutte le colonne richieste.");
  const o = /* @__PURE__ */ new Map();
  for (const a of n.slice(1)) {
    const u = Pa(a), c = Dr(u[l("fantasy_matchday_number")]), f = Dr(u[l("real_round_number")]), h = String(u[l("home_team")] ?? "").trim(), v = String(u[l("away_team")] ?? "").trim();
    if (c === null || f === null || !h || !v)
      continue;
    const x = {
      realRoundNumber: f,
      fantasyMatchdayNumber: c,
      status: "da_calcolare",
      homeTeam: h,
      awayTeam: v,
      homeTotal: po(u[l("home_total")]),
      awayTotal: po(u[l("away_total")]),
      homeGoals: Dr(u[l("home_goals")]),
      awayGoals: Dr(u[l("away_goals")]),
      note: String(u[l("note")] ?? "").trim()
    }, g = o.get(c) ?? [];
    g.push(x), o.set(c, g);
  }
  return Array.from(o.entries()).map(([a, u]) => {
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
function or(e) {
  return e === null ? "" : new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(e) ? 0 : 1
  }).format(e);
}
const um = Object.freeze({
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
function Y(e) {
  return String(e ?? "").replace(/[\u200d\ufe0e\ufe0f\u20e3]/g, "").replace(/[\u{1f1e6}-\u{1f1ff}]/gu, "").replace(/[\u{1f3fb}-\u{1f3ff}]/gu, "").replace(new RegExp("\\p{Extended_Pictographic}", "gu"), "").replace(/\s+/g, " ").trim();
}
function ce(e) {
  return Y(e).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "").trim();
}
function sr(e) {
  return Y(e).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, "").split(/[^a-z0-9]+/).filter(Boolean);
}
function Fr(e) {
  return e.map((t) => t[0] ?? "").join("");
}
function Ir(e) {
  return [...new Set(e.filter(Boolean))];
}
function sd(e) {
  const t = Y(e).trim(), n = ce(t);
  return /^[A-Z0-9.\s-]{2,6}$/.test(t) && n.length >= 2 && n.length <= 6;
}
function fs(e) {
  const t = sr(e);
  if (t.length < 2 || t[0].length !== 1)
    return null;
  const n = t.slice(1).join("");
  return n.length < 3 ? null : {
    initial: t[0],
    surname: n
  };
}
function cm(e, t) {
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
    const i = t.slice(l, l + 2), o = n.get(i) ?? 0;
    o > 0 && (r += 1, n.set(i, o - 1));
  }
  return 2 * r / (e.length + t.length - 2);
}
function ad(e) {
  const t = Ir([
    Y(e.displayName),
    Y(e.docsName),
    Y(e.assetCode)
  ]), n = e.type === "goalkeeper_block" ? e.displayName.split(/\s+-\s+/).map(Y).filter(Boolean) : [], r = Ir([...t, ...n]), l = r.map(sr).filter((a) => a.length > 0), i = Ir(l.flatMap((a) => {
    const u = [Fr(a)];
    for (let c = 2; c <= Math.min(4, a.length); c += 1)
      u.push(Fr(a.slice(-c)));
    return u;
  })), o = Ir(l.flatMap((a) => a.length >= 2 ? [Fr(a.slice(-2)), Fr(a)] : []));
  return {
    asset: e,
    aliases: r,
    aliasTokens: l,
    initials: i,
    compoundInitials: o,
    goalkeeperParts: n
  };
}
function dm(e, t, n = null) {
  const r = ce(e), l = sr(e);
  if (!r)
    return 0;
  const i = sd(e), o = fs(e);
  let a = 0;
  return t.aliases.forEach((u, c) => {
    var g;
    const f = ce(u), h = t.aliasTokens[c] ?? sr(u);
    if (!f)
      return;
    if (o) {
      const w = ((g = h[0]) == null ? void 0 : g[0]) ?? "", L = h.slice(1).join(""), p = h[h.length - 1] ?? "", d = String(t.asset.role ?? "").toUpperCase(), m = !n || d === n;
      h.length >= 2 && w === o.initial && (L === o.surname || p === o.surname) && (a = Math.max(a, 99)), h.length === 1 && h[0] === o.surname && n && m && (a = Math.max(a, 99));
    }
    r === f && (a = Math.max(a, 100)), r.length >= 4 && f.startsWith(r) && (a = Math.max(a, 92 - Math.min(8, f.length - r.length))), f.length >= 4 && r.startsWith(f) && (a = Math.max(a, 88 - Math.min(8, r.length - f.length))), h.some((w) => w === r) && (a = Math.max(a, 89));
    const v = h.length ? h[h.length - 1] : "";
    if (r.length >= 3 && v.startsWith(r) && (a = Math.max(a, 88 - Math.min(8, v.length - r.length))), l.length > 0) {
      const w = l[l.length - 1] ?? "";
      w.length >= 3 && h.includes(w) && (a = Math.max(a, 87));
    }
    const x = cm(r, f);
    x >= 0.72 && (a = Math.max(a, 68 + Math.round(x * 20)));
  }), i && ((um[r] ?? []).some((c) => t.aliases.some((f) => {
    const h = ce(f);
    return h === c || h.endsWith(c) || c.endsWith(h);
  })) && (a = Math.max(a, 100)), t.initials.forEach((c) => {
    c && r === c && (a = Math.max(a, 99));
  }), t.compoundInitials.forEach((c) => {
    c.length < 2 || r.length > c.length && r.endsWith(c) && (a = Math.max(a, 98));
  })), a;
}
function fm(e, t) {
  const n = ce(e);
  return n ? t.filter((r) => r.active && !r.isFreeAgent && ce(r.ownerTag) === n).map(ad) : [];
}
function pm(e) {
  const t = /* @__PURE__ */ new Set();
  return e.filter((n) => {
    const r = [
      ce(n.assetCode),
      ce(n.displayName),
      ce(n.docsName),
      ce(n.role),
      ce(n.realTeam)
    ].join("|");
    return !r.replace(/\|/g, "") || t.has(r) ? !1 : (t.add(r), !0);
  }).map(ad);
}
function za(e, t, n, r = null) {
  const l = r ? String(r).toUpperCase() : "";
  return t.filter((i) => !l || String(i.asset.role ?? "").toUpperCase() === l).map((i) => ({
    candidate: i,
    score: dm(e, i, r)
  })).filter(({ score: i }) => i >= n).sort((i, o) => o.score - i.score);
}
function La(e, t) {
  const n = e[0], r = e[1];
  return !n || r && n.score - r.score < t ? null : n;
}
function Ma(e) {
  const t = Y(e);
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
function Ra(e, t) {
  const { asset: n, goalkeeperParts: r } = t.candidate, l = n.type === "goalkeeper_block" && r.some((u) => ce(u) === ce(e)), i = fs(e), o = sr(n.displayName), a = !!(i && o.length === 1 && o[0] === i.surname);
  return {
    matched: !0,
    originalName: e,
    displayName: Y(
      l || a ? e : n.displayName
    ),
    role: Y(n.role),
    realTeam: Y(n.realTeam || (l ? n.displayName : "")),
    assetCode: n.assetCode,
    confidence: t.score
  };
}
function mm(e) {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = pm(e);
  function l(o) {
    const a = ce(o);
    return t.has(a) || t.set(a, fm(o, e)), t.get(a) ?? [];
  }
  function i(o, a) {
    return n.set(o, a), a;
  }
  return function(a, u, c = null) {
    const f = Y(u), h = [
      ce(a),
      ce(f),
      c ?? ""
    ].join("|"), v = n.get(h);
    if (v)
      return v;
    if (!f)
      return i(h, Ma(f));
    const x = sd(f), g = fs(f), w = g ? 95 : x ? 96 : 84, L = g ? 3 : x ? 2 : 4, p = La(
      za(f, l(a), w, c),
      L
    );
    if (p)
      return i(h, Ra(f, p));
    const d = g ? 98 : x ? 97 : 96, m = g ? 3 : 2, y = La(
      za(f, r, d, c),
      m
    );
    return i(
      h,
      y ? Ra(f, y) : Ma(f)
    );
  };
}
function hm(e) {
  const t = String(e ?? "").trim().toLowerCase().replace(/^\[|\]$/g, "");
  return t === "localhost" || t === "127.0.0.1" || t === "0.0.0.0" || t === "::1" || t.endsWith(".local") ? !0 : /^10\./.test(t) || /^192\.168\./.test(t) || /^172\.(1[6-9]|2\d|3[01])\./.test(t) || /^169\.254\./.test(t);
}
function Or(e) {
  return Y(e).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "").trim();
}
function Da(e) {
  if (typeof e == "string") {
    const i = Y(e), o = i.match(/\(s(\+)?\)/i), a = o ? o[1] ? "plus" : "base" : null, u = i.replace(/\(s\+?\)/gi, "").trim();
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
    name: Y(t.replacement.name),
    vote: t.replacement.vote ?? null,
    displayVote: t.replacement.displayVote ?? null
  } : void 0;
  return {
    raw: Y(t.raw ?? t.name ?? ""),
    name: Y(t.name ?? t.raw ?? ""),
    vote: t.vote ?? null,
    displayVote: t.displayVote ?? null,
    status: t.status ?? null,
    captain: !!t.captain,
    switchPlayer: !!r,
    switchType: r,
    ...l ? { replacement: l } : {}
  };
}
function Fa(e) {
  return {
    team: Y((e == null ? void 0 : e.team) ?? ""),
    alias: Y((e == null ? void 0 : e.alias) ?? ""),
    starters: Array.isArray(e == null ? void 0 : e.starters) ? e.starters.map(Da) : [],
    total: (e == null ? void 0 : e.total) ?? null,
    playersCount: (e == null ? void 0 : e.playersCount) ?? null,
    bench: Array.isArray(e == null ? void 0 : e.bench) ? e.bench.map(Da) : []
  };
}
function vm(e) {
  return {
    homeTeam: Y((e == null ? void 0 : e.homeTeam) ?? ""),
    awayTeam: Y((e == null ? void 0 : e.awayTeam) ?? ""),
    home: Fa(e == null ? void 0 : e.home),
    away: Fa(e == null ? void 0 : e.away)
  };
}
function Ia(e) {
  return {
    title: Y((e == null ? void 0 : e.title) ?? "Giornata"),
    sourceUrl: (e == null ? void 0 : e.sourceUrl) ?? "",
    fantasyMatchdayNumber: (e == null ? void 0 : e.fantasyMatchdayNumber) ?? 0,
    matchup: vm(e == null ? void 0 : e.matchup)
  };
}
function gm(e, t, n, r) {
  const l = Or(n), i = Or(r);
  return e.matches.find((a) => Or(a.homeTeam) === l && Or(a.awayTeam) === i) ?? e.matches[t] ?? null;
}
async function ym(e) {
  const t = new URLSearchParams({
    league: e.leagueId,
    day: String(e.fantasyMatchdayNumber),
    match: String(e.matchIndex),
    home: e.homeTeam,
    away: e.awayTeam,
    v: String(Date.now())
  });
  try {
    const n = await fetch(`/api/matchday?${t.toString()}`, {
      cache: "no-store",
      signal: e.signal
    });
    if (!n.ok)
      throw new Error(`HTTP ${n.status}`);
    return Ia(await n.json());
  } catch (n) {
    if (e.signal.aborted || !hm(window.location.hostname))
      throw n;
    const l = `/data/${e.leagueId}/matchdays/${e.fantasyMatchdayNumber}.json?v=${Date.now()}`, i = await fetch(l, {
      cache: "no-store",
      signal: e.signal
    });
    if (!i.ok)
      throw n;
    const o = await i.json(), a = gm(
      o,
      e.matchIndex,
      e.homeTeam,
      e.awayTeam
    );
    if (!a)
      throw n;
    return Ia({
      title: o.title,
      sourceUrl: o.sourceUrl,
      fantasyMatchdayNumber: o.fantasyMatchdayNumber,
      matchup: a
    });
  }
}
const wm = [
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
], xm = ["343", "352", "433", "442", "451", "532", "541"];
function Sm(e) {
  return [
    "P",
    ...Array(Number(e[0])).fill("D"),
    ...Array(Number(e[1])).fill("C"),
    ...Array(Number(e[2])).fill("A")
  ];
}
function Nm(e, t) {
  const n = e.starters.map((l, i) => {
    if (i === 0)
      return ["P"];
    const o = t(e.team, l.name || l.raw), a = String(o.role ?? "").toUpperCase();
    return ["D", "C", "A"].includes(a) ? [a] : ["D", "C", "A"];
  }), r = xm.map(Sm).filter((l) => l.length === e.starters.length).filter((l) => l.every((i, o) => n[o].length === 0 || n[o].includes(i)));
  return r.length === 0 ? e.starters.map((l, i) => i === 0 ? "P" : null) : e.starters.map((l, i) => new Set(r.map((a) => a[i])).size === 1 ? r[0][i] : null);
}
function ud(e) {
  return [...e].sort((t, n) => t.realRoundNumber - n.realRoundNumber || t.fantasyMatchdayNumber - n.fantasyMatchdayNumber);
}
function Oa(e, t) {
  var i;
  const n = ud(e), r = t === null ? void 0 : n.find(
    (o) => o.fantasyMatchdayNumber === t
  );
  if (r)
    return r.realRoundNumber;
  const l = n.find(
    (o) => o.status === "da_calcolare"
  );
  return (l == null ? void 0 : l.realRoundNumber) ?? ((i = n[n.length - 1]) == null ? void 0 : i.realRoundNumber) ?? 0;
}
function mo({
  fallbackName: e,
  resolved: t,
  captain: n = !1,
  switchType: r = null
}) {
  const l = t.displayName || e, i = r === "plus" ? "Switch+" : r === "base" ? "Switch" : "";
  return /* @__PURE__ */ s.jsxs("div", { className: `lf-match-detail-player__identity${t.matched && t.role ? " has-role" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("span", { className: "lf-match-detail-player__headline", children: [
      t.matched && t.role && /* @__PURE__ */ s.jsx("em", { className: "lf-match-detail-role", "data-role": t.role.toLowerCase(), children: t.role }),
      /* @__PURE__ */ s.jsx(
        "span",
        {
          className: "lf-match-detail-player__name",
          title: t.matched && t.originalName !== l ? `Nel documento: ${t.originalName}` : void 0,
          children: l
        }
      ),
      n && /* @__PURE__ */ s.jsx("small", { className: "is-captain", children: "C" }),
      i && /* @__PURE__ */ s.jsx("small", { className: `is-switch is-${r}`, children: i })
    ] }),
    t.matched && t.realTeam && /* @__PURE__ */ s.jsx("span", { className: "lf-match-detail-player__team", children: t.realTeam })
  ] });
}
function jm({
  player: e,
  ownerName: t,
  resolvePlayer: n,
  roleHint: r = null
}) {
  const l = n(t, e.name || e.raw, r), i = e.replacement ? n(t, e.replacement.name, r) : null, o = e.switchType ? ` is-switch-${e.switchType}` : "";
  return /* @__PURE__ */ s.jsxs("li", { className: `lf-match-detail-player${e.replacement ? " has-replacement" : ""}${o}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "lf-match-detail-player__main", children: [
      /* @__PURE__ */ s.jsx(
        mo,
        {
          fallbackName: e.name || e.raw,
          resolved: l,
          captain: e.captain,
          switchType: e.switchType
        }
      ),
      /* @__PURE__ */ s.jsx("b", { className: e.vote === null ? "is-missing" : "", children: e.displayVote ?? e.status ?? "–" })
    ] }),
    e.replacement && i && /* @__PURE__ */ s.jsxs("div", { className: "lf-match-detail-replacement", children: [
      /* @__PURE__ */ s.jsx("span", { className: "lf-match-detail-replacement__label", children: "Entra" }),
      /* @__PURE__ */ s.jsx(
        mo,
        {
          fallbackName: e.replacement.name,
          resolved: i
        }
      ),
      /* @__PURE__ */ s.jsx("b", { children: e.replacement.displayVote ?? "–" })
    ] })
  ] });
}
function km({
  player: e,
  ownerName: t,
  resolvePlayer: n,
  roleHint: r = null,
  row: l,
  column: i
}) {
  const o = n(t, e.name || e.raw, r);
  return /* @__PURE__ */ s.jsx(
    "li",
    {
      className: e.switchType ? `is-switch-${e.switchType}` : void 0,
      style: { gridRow: l, gridColumn: i },
      "data-role-slot": r ?? void 0,
      children: /* @__PURE__ */ s.jsx(
        mo,
        {
          fallbackName: e.name || e.raw,
          resolved: o,
          captain: e.captain,
          switchType: e.switchType
        }
      )
    }
  );
}
function Aa({
  side: e,
  team: t,
  resolvePlayer: n
}) {
  const r = z.useMemo(
    () => Nm(t, n),
    [n, t]
  );
  return /* @__PURE__ */ s.jsxs("section", { className: `lf-match-detail-team is-${e}`, children: [
    /* @__PURE__ */ s.jsxs("header", { children: [
      /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsx("h3", { children: t.team }),
        t.alias && t.alias !== t.team && /* @__PURE__ */ s.jsxs("small", { children: [
          "Nel documento: ",
          t.alias
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "lf-match-detail-total", children: [
        /* @__PURE__ */ s.jsx("span", { children: "Totale" }),
        /* @__PURE__ */ s.jsx("strong", { children: t.total === null ? "–" : or(t.total) }),
        t.playersCount !== null && /* @__PURE__ */ s.jsxs("small", { children: [
          t.playersCount,
          " giocatori"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "lf-match-detail-section", children: [
      /* @__PURE__ */ s.jsx("h4", { children: "Titolari" }),
      t.starters.length > 0 ? /* @__PURE__ */ s.jsx("ol", { className: "lf-match-detail-players", children: t.starters.map((l, i) => /* @__PURE__ */ s.jsx(
        jm,
        {
          player: l,
          ownerName: t.team,
          resolvePlayer: n,
          roleHint: r[i]
        },
        `${l.raw}-${i}`
      )) }) : /* @__PURE__ */ s.jsx("p", { className: "lf-match-detail-empty", children: "Formazione non ancora inserita." })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "lf-match-detail-section lf-match-detail-section--bench", children: [
      /* @__PURE__ */ s.jsx("h4", { children: "A disposizione" }),
      t.bench.length > 0 ? /* @__PURE__ */ s.jsx("ul", { className: "lf-match-detail-bench", children: wm.map((l) => {
        const i = t.bench[l.sourceIndex];
        return i ? /* @__PURE__ */ s.jsx(
          km,
          {
            player: i,
            ownerName: t.team,
            resolvePlayer: n,
            roleHint: l.roleHint,
            row: l.row,
            column: l.column
          },
          `${i.raw}-${l.sourceIndex}`
        ) : null;
      }) }) : /* @__PURE__ */ s.jsx("p", { className: "lf-match-detail-empty", children: "Panchina non ancora inserita." })
    ] })
  ] });
}
function Cm({
  detail: e,
  error: t,
  loading: n,
  onClose: r,
  resolvePlayer: l,
  homeGoals: i,
  awayGoals: o
}) {
  const [a, u] = z.useState("home");
  return z.useEffect(() => {
    u("home");
  }, [e == null ? void 0 : e.fantasyMatchdayNumber, e == null ? void 0 : e.matchup.homeTeam, e == null ? void 0 : e.matchup.awayTeam]), z.useEffect(() => {
    const c = window.scrollY, f = window.matchMedia("(max-width: 767px)").matches, h = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width
    };
    document.body.style.overflow = "hidden", f && (document.body.style.position = "fixed", document.body.style.top = `-${c}px`, document.body.style.width = "100%");
    function v(x) {
      x.key === "Escape" && r();
    }
    return window.addEventListener("keydown", v), () => {
      document.body.style.overflow = h.overflow, document.body.style.position = h.position, document.body.style.top = h.top, document.body.style.width = h.width, f && window.scrollTo(0, c), window.removeEventListener("keydown", v);
    };
  }, [r]), /* @__PURE__ */ s.jsx(
    "div",
    {
      className: "lf-match-detail-backdrop",
      role: "presentation",
      onMouseDown: (c) => {
        c.target === c.currentTarget && r();
      },
      children: /* @__PURE__ */ s.jsxs(
        "section",
        {
          className: "lf-match-detail-modal",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Dettaglio scontro",
          children: [
            /* @__PURE__ */ s.jsx("header", { className: "lf-match-detail-modal__header", children: /* @__PURE__ */ s.jsx("button", { type: "button", onClick: r, "aria-label": "Chiudi confronto", children: "×" }) }),
            /* @__PURE__ */ s.jsxs("div", { className: "lf-match-detail-modal__body", children: [
              /* @__PURE__ */ s.jsxs("div", { className: `lf-match-detail-sticky${!n && e ? " has-tabs" : ""}`, children: [
                /* @__PURE__ */ s.jsx(
                  "div",
                  {
                    className: "lf-match-detail-result",
                    "aria-label": i !== null && o !== null ? `Risultato ${i} a ${o}` : "Risultato non disponibile",
                    children: i !== null && o !== null ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                      /* @__PURE__ */ s.jsx("b", { children: i }),
                      /* @__PURE__ */ s.jsx("span", { children: "–" }),
                      /* @__PURE__ */ s.jsx("b", { children: o })
                    ] }) : /* @__PURE__ */ s.jsx("b", { children: "–" })
                  }
                ),
                !n && e && /* @__PURE__ */ s.jsxs("div", { className: "lf-match-detail-mobile-tabs", role: "tablist", "aria-label": "Scegli la formazione", children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      role: "tab",
                      "aria-selected": a === "home",
                      className: a === "home" ? "is-active" : "",
                      onClick: () => u("home"),
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "lf-match-detail-mobile-tabs__coach", children: e.matchup.homeTeam }),
                        /* @__PURE__ */ s.jsxs("span", { className: "lf-match-detail-mobile-tabs__summary", children: [
                          /* @__PURE__ */ s.jsx("strong", { children: e.matchup.home.total === null ? "–" : or(e.matchup.home.total) }),
                          e.matchup.home.playersCount !== null && /* @__PURE__ */ s.jsxs("small", { children: [
                            "(",
                            e.matchup.home.playersCount,
                            ")"
                          ] })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      role: "tab",
                      "aria-selected": a === "away",
                      className: a === "away" ? "is-active" : "",
                      onClick: () => u("away"),
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "lf-match-detail-mobile-tabs__coach", children: e.matchup.awayTeam }),
                        /* @__PURE__ */ s.jsxs("span", { className: "lf-match-detail-mobile-tabs__summary", children: [
                          /* @__PURE__ */ s.jsx("strong", { children: e.matchup.away.total === null ? "–" : or(e.matchup.away.total) }),
                          e.matchup.away.playersCount !== null && /* @__PURE__ */ s.jsxs("small", { children: [
                            "(",
                            e.matchup.away.playersCount,
                            ")"
                          ] })
                        ] })
                      ]
                    }
                  )
                ] })
              ] }),
              n && /* @__PURE__ */ s.jsxs("div", { className: "lf-match-detail-state", children: [
                /* @__PURE__ */ s.jsx("div", { className: "lf-spinner" }),
                /* @__PURE__ */ s.jsx("p", { children: "Caricamento di formazioni, voti e sostituzioni…" })
              ] }),
              !n && t && /* @__PURE__ */ s.jsxs("div", { className: "lf-match-detail-state is-error", children: [
                /* @__PURE__ */ s.jsx("strong", { children: "Confronto non disponibile" }),
                /* @__PURE__ */ s.jsx("p", { children: t })
              ] }),
              !n && e && /* @__PURE__ */ s.jsxs("div", { className: `lf-match-detail-grid is-mobile-${a}`, children: [
                /* @__PURE__ */ s.jsx(Aa, { side: "home", team: e.matchup.home, resolvePlayer: l }),
                /* @__PURE__ */ s.jsx(Aa, { side: "away", team: e.matchup.away, resolvePlayer: l })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function Em({
  competitionLabel: e,
  leagueId: t,
  leagueName: n,
  matchdays: r,
  expectedMatches: l,
  registry: i,
  assets: o,
  detailRefreshToken: a
}) {
  const u = z.useMemo(() => mm(o), [o]), c = z.useMemo(() => ud(r), [r]), [f, h] = z.useState(
    () => Oa(c, i.activeFantasyMatchday)
  ), [v, x] = z.useState(null), [g, w] = z.useState("idle"), [L, p] = z.useState(null), [d, m] = z.useState(""), y = z.useRef(void 0), j = z.useRef(null), E = z.useRef("");
  z.useEffect(() => {
    const S = y.current !== i.activeFantasyMatchday;
    y.current = i.activeFantasyMatchday;
    const R = i.activeFantasyMatchday === null ? void 0 : c.find(
      (B) => B.fantasyMatchdayNumber === i.activeFantasyMatchday
    );
    if (S && R) {
      h(R.realRoundNumber);
      return;
    }
    h((B) => c.some(
      (H) => H.realRoundNumber === B
    ) ? B : Oa(c, i.activeFantasyMatchday));
  }, [c, i.activeFantasyMatchday]);
  const _ = z.useMemo(
    () => c.findIndex(
      (S) => S.realRoundNumber === f
    ),
    [c, f]
  ), k = _ >= 0 ? c[_] : void 0, C = k ? i.matchdays.get(k.fantasyMatchdayNumber) : void 0;
  return z.useEffect(() => {
    if (!v || !k || !C)
      return;
    const S = [
      t,
      k.fantasyMatchdayNumber,
      v.index,
      v.homeTeam,
      v.awayTeam
    ].join(":"), R = j.current !== S, B = new AbortController();
    return R && (w("loading"), p(null), m("")), ym({
      leagueId: t,
      fantasyMatchdayNumber: k.fantasyMatchdayNumber,
      matchIndex: v.index,
      homeTeam: v.homeTeam,
      awayTeam: v.awayTeam,
      signal: B.signal
    }).then((H) => {
      if (B.signal.aborted)
        return;
      j.current = S;
      const Z = JSON.stringify(H);
      E.current !== Z && (E.current = Z, p(H)), m(""), w("ready");
    }).catch((H) => {
      if (!B.signal.aborted) {
        if (console.error("Matchday detail load error", H), !R) {
          console.warn("Aggiornamento interno dello scontro non riuscito: mantengo gli ultimi dati validi.");
          return;
        }
        m(
          "Il documento esiste, ma il dettaglio non è stato letto correttamente. Puoi comunque aprire l’originale."
        ), w("error");
      }
    }), () => B.abort();
  }, [a, t, k, C, v]), c.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card lf-calendar-state", children: [
    /* @__PURE__ */ s.jsx("strong", { children: "Calendario non ancora disponibile" }),
    /* @__PURE__ */ s.jsxs("p", { children: [
      "La fonte di ",
      n,
      " non è stata ancora configurata."
    ] })
  ] }) }) : k ? /* @__PURE__ */ s.jsxs("div", { className: "lf-calendar-shell", children: [
    /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card lf-calendar-card", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "lf-calendar-toolbar", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "lf-calendar-nav",
            onClick: () => h(
              c[_ - 1].realRoundNumber
            ),
            disabled: _ <= 0,
            "aria-label": "Giornata precedente",
            children: "‹"
          }
        ),
        /* @__PURE__ */ s.jsxs("label", { className: "lf-calendar-select-wrap", children: [
          /* @__PURE__ */ s.jsxs("span", { children: [
            "Giornata ",
            e
          ] }),
          /* @__PURE__ */ s.jsx(
            "select",
            {
              value: k.realRoundNumber,
              onChange: (S) => h(Number(S.target.value)),
              children: c.map((S) => /* @__PURE__ */ s.jsx(
                "option",
                {
                  value: S.realRoundNumber,
                  children: S.realRoundNumber
                },
                `${S.realRoundNumber}-${S.fantasyMatchdayNumber}`
              ))
            }
          ),
          /* @__PURE__ */ s.jsxs("small", { children: [
            "Giornata Fanta ",
            k.fantasyMatchdayNumber
          ] })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "lf-calendar-nav",
            onClick: () => h(
              c[_ + 1].realRoundNumber
            ),
            disabled: _ >= c.length - 1,
            "aria-label": "Giornata successiva",
            children: "›"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "lf-calendar-summary", children: /* @__PURE__ */ s.jsx("div", { className: "lf-calendar-status-wrap", children: /* @__PURE__ */ s.jsx("span", { className: `lf-calendar-status lf-calendar-status--${k.status}`, children: k.status === "calcolata" ? "Calcolata" : "Da calcolare" }) }) }),
      /* @__PURE__ */ s.jsx("div", { className: "lf-calendar-matches", children: k.matches.map((S, R) => {
        const B = S.homeGoals !== null && S.awayGoals !== null, H = !!C;
        return /* @__PURE__ */ s.jsxs(
          "article",
          {
            className: `lf-calendar-match${B ? "" : " is-pending"}${H ? " is-clickable" : ""}`,
            role: H ? "button" : void 0,
            tabIndex: H ? 0 : void 0,
            "aria-label": H ? `Apri formazioni di ${S.homeTeam} contro ${S.awayTeam}` : void 0,
            onClick: H ? () => x({
              index: R,
              homeTeam: S.homeTeam,
              awayTeam: S.awayTeam,
              homeGoals: S.homeGoals,
              awayGoals: S.awayGoals
            }) : void 0,
            onKeyDown: H ? (Z) => {
              (Z.key === "Enter" || Z.key === " ") && (Z.preventDefault(), x({
                index: R,
                homeTeam: S.homeTeam,
                awayTeam: S.awayTeam,
                homeGoals: S.homeGoals,
                awayGoals: S.awayGoals
              }));
            } : void 0,
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "lf-calendar-team lf-calendar-team--home", children: [
                /* @__PURE__ */ s.jsx("strong", { children: S.homeTeam }),
                S.homeTotal !== null && /* @__PURE__ */ s.jsx("span", { children: or(S.homeTotal) })
              ] }),
              /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "lf-calendar-score",
                  "aria-label": B ? `${S.homeGoals} a ${S.awayGoals}` : "Risultato non disponibile",
                  children: B ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                    /* @__PURE__ */ s.jsx("b", { children: S.homeGoals }),
                    /* @__PURE__ */ s.jsx("i", { children: "–" }),
                    /* @__PURE__ */ s.jsx("b", { children: S.awayGoals })
                  ] }) : /* @__PURE__ */ s.jsx("em", { children: "–" })
                }
              ),
              /* @__PURE__ */ s.jsxs("div", { className: "lf-calendar-team lf-calendar-team--away", children: [
                /* @__PURE__ */ s.jsx("strong", { children: S.awayTeam }),
                S.awayTotal !== null && /* @__PURE__ */ s.jsx("span", { children: or(S.awayTotal) })
              ] }),
              S.note && /* @__PURE__ */ s.jsx("p", { className: "lf-calendar-note", children: S.note })
            ]
          },
          `${k.fantasyMatchdayNumber}-${S.homeTeam}-${S.awayTeam}-${R}`
        );
      }) }),
      C && /* @__PURE__ */ s.jsxs("div", { className: "lf-calendar-source-link-wrap", children: [
        /* @__PURE__ */ s.jsx("span", { children: "Clicca uno scontro per vedere formazioni, voti e sostituzioni." }),
        /* @__PURE__ */ s.jsxs("a", { href: C.url, target: "_blank", rel: "noopener noreferrer", children: [
          "Documento completo",
          /* @__PURE__ */ s.jsx("span", { "aria-hidden": "true", children: "↗" })
        ] })
      ] })
    ] }),
    v && C && /* @__PURE__ */ s.jsx(
      Cm,
      {
        detail: L,
        error: d,
        loading: g === "loading",
        resolvePlayer: u,
        homeGoals: v.homeGoals,
        awayGoals: v.awayGoals,
        onClose: () => {
          j.current = null, E.current = "", x(null), p(null), w("idle"), m("");
        }
      }
    )
  ] }) : null;
}
function cd(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function _m(e) {
  const t = e.trim();
  return t.startsWith("https://") || t.startsWith("http://") || t.startsWith("/");
}
function Tm(e) {
  if (!cd(e))
    return /* @__PURE__ */ new Map();
  const t = /* @__PURE__ */ new Map();
  for (const [n, r] of Object.entries(e)) {
    const l = Number(n);
    if (!Number.isInteger(l) || l <= 0)
      continue;
    const i = typeof r == "string" ? r.trim() : String((r == null ? void 0 : r.url) ?? "").trim();
    if (!i || !_m(i))
      continue;
    const o = typeof r == "object" && r !== null ? String(r.label ?? "").trim() : "";
    t.set(l, {
      fantasyMatchdayNumber: l,
      url: i,
      label: o || "Apri documento originale"
    });
  }
  return t;
}
function Pm(e, t) {
  const n = JSON.parse(String(e ?? "{}")), r = n == null ? void 0 : n[t];
  if (!cd(r))
    return { activeFantasyMatchday: null, matchdays: /* @__PURE__ */ new Map() };
  const l = r, i = Object.prototype.hasOwnProperty.call(l, "matchdays") || Object.prototype.hasOwnProperty.call(l, "activeFantasyMatchday"), o = Number(l.activeFantasyMatchday);
  return {
    activeFantasyMatchday: Number.isInteger(o) && o > 0 ? o : null,
    matchdays: Tm(i ? l.matchdays : r)
  };
}
function zm(e) {
  const t = String(e ?? "").trim().toLowerCase().replace(/^\[|\]$/g, "");
  return t === "localhost" || t === "127.0.0.1" || t === "0.0.0.0" || t === "::1" || t.endsWith(".local") ? !0 : /^10\./.test(t) || /^192\.168\./.test(t) || /^172\.(1[6-9]|2\d|3[01])\./.test(t) || /^169\.254\./.test(t);
}
const $a = {
  activeFantasyMatchday: null,
  matchdays: /* @__PURE__ */ new Map()
};
function Lm() {
  var j, E, _, k, C, S;
  const { assets: e } = cs(), t = (j = window.LINEUP_FANTA) == null ? void 0 : j.league, n = (t == null ? void 0 : t.id) ?? "fp", r = ((E = t == null ? void 0 : t.leagueData) == null ? void 0 : E.calendarCsvUrl) ?? "", l = ((_ = t == null ? void 0 : t.leagueData) == null ? void 0 : _.calendarDocUrl) ?? "", i = ((k = t == null ? void 0 : t.leagueData) == null ? void 0 : k.calendarExpectedMatches) ?? 4, o = ((C = t == null ? void 0 : t.leagueData) == null ? void 0 : C.matchdayLinksUrl) ?? "/data/matchday-links.json", a = ((S = t == null ? void 0 : t.leagueData) == null ? void 0 : S.calendarCompetitionLabel) ?? (n === "pd" ? "Liga" : "Premier League"), [u, c] = z.useState("loading"), [f, h] = z.useState([]), [v, x] = z.useState($a), [g, w] = z.useState(""), L = z.useRef(!1), p = z.useRef(""), d = z.useRef(""), m = ds("calendario");
  z.useEffect(() => {
    const R = new AbortController();
    async function B() {
      if (!l && !r) {
        h([]), x($a), c("ready");
        return;
      }
      !L.current && c("loading"), w("");
      try {
        let Z;
        const Vt = `/api/calendar?league=${encodeURIComponent(n)}`;
        try {
          Z = await Vn(Vt, R.signal);
        } catch (fe) {
          if (!zm(window.location.hostname) || !r || R.signal.aborted)
            throw fe;
          console.warn("Calendar live API unavailable in local preview, using local snapshot", fe), Z = await Vn(r, R.signal);
        }
        if (Z !== p.current) {
          const fe = am(Z, i);
          if (fe.length === 0 && L.current)
            throw new Error("Aggiornamento vuoto del Calendario");
          p.current = Z, h(fe);
        }
        try {
          const fe = await Vn(o, R.signal);
          fe !== d.current && (d.current = fe, x(Pm(fe, n)));
        } catch (fe) {
          if (R.signal.aborted)
            return;
          console.warn("Matchday registry unavailable in Calendar", fe);
        }
        L.current = !0, c("ready");
      } catch (Z) {
        if (R.signal.aborted)
          return;
        if (console.error("Calendar load error", Z), L.current) {
          console.warn("Aggiornamento interno del Calendario non riuscito: mantengo gli ultimi dati validi.");
          return;
        }
        w("Il Calendario non è disponibile. Controlla la fonte configurata e riprova."), c("error");
      }
    }
    return B(), () => R.abort();
  }, [l, r, i, n, o, m]);
  const y = z.useMemo(() => (t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.name) ?? "Lega", [t]);
  return u === "loading" ? /* @__PURE__ */ s.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card lf-calendar-state", children: [
    /* @__PURE__ */ s.jsx("div", { className: "lf-spinner" }),
    /* @__PURE__ */ s.jsx("p", { children: "Caricamento del Calendario…" })
  ] }) }) : u === "error" ? /* @__PURE__ */ s.jsx("div", { className: "lf-calendar-shell", children: /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card lf-calendar-state lf-calendar-state--error", children: [
    /* @__PURE__ */ s.jsx("strong", { children: "Errore nel caricamento" }),
    /* @__PURE__ */ s.jsx("p", { children: g })
  ] }) }) : /* @__PURE__ */ s.jsx(
    Em,
    {
      competitionLabel: a,
      leagueId: n,
      leagueName: y,
      matchdays: f,
      expectedMatches: i,
      registry: v,
      assets: e,
      detailRefreshToken: m
    }
  );
}
function Mm(e) {
  const t = [];
  let n = [], r = "", l = !1;
  const i = String(e ?? "").replace(/^\uFEFF/, "");
  for (let o = 0; o < i.length; o += 1) {
    const a = i[o];
    if (a === '"') {
      l && i[o + 1] === '"' ? (r += '"', o += 1) : l = !l;
      continue;
    }
    if (a === "," && !l) {
      n.push(r.trim()), r = "";
      continue;
    }
    if ((a === `
` || a === "\r") && !l) {
      a === "\r" && i[o + 1] === `
` && (o += 1), n.push(r.trim()), n.some((u) => u.length > 0) && t.push(n), n = [], r = "";
      continue;
    }
    r += a;
  }
  return n.push(r.trim()), n.some((o) => o.length > 0) && t.push(n), t;
}
function un(e) {
  return String(e ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}
function Ar(e) {
  return un(e).replace(/[‐‑‒–—]/g, "-").replace(/\s*-\s*/g, "-").replace(/[^a-z0-9-]/g, "");
}
function Zr(e) {
  const t = String(e ?? "").trim().replace(/\s+/g, "").replace(",", ".");
  if (!t)
    return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}
function _t(e) {
  const t = Zr(e);
  return t === null ? null : Math.trunc(t);
}
function ge(e, t, n = 0) {
  const r = un(t);
  for (let l = n; l < e.length; l += 1)
    if (un(e[l]) === r)
      return l;
  return -1;
}
function Rm(e) {
  const t = Mm(e), n = [
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
    (g) => n.every((w) => ge(g, w) >= 0)
  );
  if (r < 0)
    throw new Error("Il CSV Classifica non contiene le colonne richieste.");
  const l = t[r], i = {
    name: ge(l, "Nome"),
    points: ge(l, "Punti"),
    wins: ge(l, "Vittorie"),
    draws: ge(l, "Pareggi"),
    losses: ge(l, "Sconfitte"),
    goalsFor: ge(l, "Gol Fatti"),
    goalsAgainst: ge(l, "Gol Subiti"),
    goalDifference: ge(l, "Differenza Reti"),
    fantasyPoints: ge(l, "Fanta Punti")
  }, o = [];
  for (const g of t.slice(r + 1)) {
    const w = String(g[i.name] ?? "").trim();
    if (g.map(un).join("|").includes("classifica per fp"))
      break;
    if (!w)
      continue;
    const p = _t(g[i.points]), d = _t(g[i.wins]), m = _t(g[i.draws]), y = _t(g[i.losses]), j = _t(g[i.goalsFor]), E = _t(g[i.goalsAgainst]), _ = _t(g[i.goalDifference]), k = Zr(g[i.fantasyPoints]);
    p === null || d === null || m === null || y === null || j === null || E === null || k === null || o.push({
      team: w,
      points: p,
      wins: d,
      draws: m,
      losses: y,
      goalsFor: j,
      goalsAgainst: E,
      goalDifference: _ ?? j - E,
      fantasyPoints: k,
      played: d + m + y
    });
  }
  const a = t.findIndex(
    (g) => g.some((w) => un(w) === "classifica per fp")
  ), u = /* @__PURE__ */ new Map(), c = [];
  if (a >= 0) {
    const g = t.findIndex((w, L) => {
      if (L <= a)
        return !1;
      const p = w.map(un);
      return p.filter((d) => d === "nome").length >= 2 && p.includes("fanta punti") && p.includes("penalita");
    });
    if (g >= 0) {
      const w = t[g], L = ge(w, "Nome"), p = ge(w, "Fanta Punti", L + 1), d = ge(w, "Nome", p + 1), m = ge(w, "Penalità", d + 1);
      for (const y of t.slice(g + 1)) {
        const j = String(y[L] ?? "").trim(), E = Zr(y[p]);
        j && E !== null && c.push({ team: j, fantasyPoints: E });
        const _ = String(y[d] ?? "").trim(), k = Zr(y[m]);
        _ && k !== null && k > 0 && u.set(Ar(_), k);
      }
    }
  }
  const f = o.map((g, w) => ({
    ...g,
    position: w + 1,
    penalty: u.get(Ar(g.team)) ?? 0
  })), h = new Map(
    f.map((g) => [Ar(g.team), g])
  ), x = (c.length > 0 ? c : f.map((g) => ({ team: g.team, fantasyPoints: g.fantasyPoints })).sort((g, w) => w.fantasyPoints - g.fantasyPoints)).map((g, w) => {
    var L;
    return {
      position: w + 1,
      team: g.team,
      fantasyPoints: g.fantasyPoints,
      leaguePosition: ((L = h.get(Ar(g.team))) == null ? void 0 : L.position) ?? null
    };
  });
  return { league: f, fantasy: x };
}
function ho(e) {
  return new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(e) ? 0 : 1
  }).format(e);
}
function Dm(e) {
  return e > 0 ? `+${e}` : String(e);
}
function Ua({ team: e, penalty: t = 0 }) {
  const n = e.trim().charAt(0).toUpperCase() || "?";
  return /* @__PURE__ */ s.jsxs("div", { className: "lf-standings-team-cell", children: [
    /* @__PURE__ */ s.jsx("span", { className: "lf-standings-team-mark", "aria-hidden": "true", children: n }),
    /* @__PURE__ */ s.jsx("strong", { children: e }),
    t > 0 && /* @__PURE__ */ s.jsxs("span", { className: "lf-standings-penalty", title: `Penalizzazione di ${t} punti`, children: [
      "−",
      ho(t)
    ] })
  ] });
}
function Fm(e, t) {
  return t ? [...e].sort((n, r) => (t.direction === "desc" ? r[t.key] - n[t.key] : n[t.key] - r[t.key]) || n.position - r.position) : e;
}
function Ba({
  label: e,
  sortKey: t,
  sort: n,
  onSort: r
}) {
  const l = (n == null ? void 0 : n.key) === t, i = l ? n.direction === "desc" ? "descending" : "ascending" : "none", o = l ? n.direction === "desc" ? "decrescente" : "crescente" : "ordine classifica";
  return /* @__PURE__ */ s.jsx("th", { scope: "col", "aria-sort": i, className: l ? "is-sorted" : "", children: /* @__PURE__ */ s.jsxs(
    "button",
    {
      type: "button",
      className: "lf-standings-sort-button",
      onClick: () => r(t),
      title: `${e}: ${o}`,
      "aria-label": `Ordina ${e}. Stato attuale: ${o}.`,
      children: [
        /* @__PURE__ */ s.jsx("span", { children: e }),
        /* @__PURE__ */ s.jsx("span", { className: "lf-standings-sort-icon", "aria-hidden": "true", children: l ? n.direction === "desc" ? "↓" : "↑" : "↕" })
      ]
    }
  ) });
}
function Im({ data: e, leagueName: t }) {
  const [n, r] = z.useState("league"), [l, i] = z.useState(null), o = z.useMemo(
    () => Fm(e.league, l),
    [e.league, l]
  );
  function a(u) {
    i((c) => !c || c.key !== u ? { key: u, direction: "desc" } : c.direction === "desc" ? { key: u, direction: "asc" } : null);
  }
  return e.league.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card lf-standings-state", children: [
    /* @__PURE__ */ s.jsx("strong", { children: "Classifica non ancora disponibile" }),
    /* @__PURE__ */ s.jsxs("p", { children: [
      "La fonte di ",
      t,
      " non è stata ancora configurata."
    ] })
  ] }) }) : /* @__PURE__ */ s.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card lf-standings-card", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "lf-standings-toolbar", role: "tablist", "aria-label": "Tipo di classifica", children: [
      /* @__PURE__ */ s.jsx(
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
      /* @__PURE__ */ s.jsx(
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
    n === "league" ? /* @__PURE__ */ s.jsx("div", { className: "lf-standings-table-wrap", role: "region", "aria-label": "Classifica generale", tabIndex: 0, children: /* @__PURE__ */ s.jsxs("table", { className: "lf-standings-table", children: [
      /* @__PURE__ */ s.jsx("thead", { children: /* @__PURE__ */ s.jsxs("tr", { children: [
        /* @__PURE__ */ s.jsx("th", { className: "lf-standings-rank-col", scope: "col", children: "#" }),
        /* @__PURE__ */ s.jsx("th", { className: "lf-standings-team-col", scope: "col", children: "Squadra" }),
        /* @__PURE__ */ s.jsx("th", { className: "is-points", scope: "col", children: "Pt" }),
        /* @__PURE__ */ s.jsx("th", { scope: "col", children: "G" }),
        /* @__PURE__ */ s.jsx("th", { scope: "col", children: "V" }),
        /* @__PURE__ */ s.jsx("th", { scope: "col", children: "N" }),
        /* @__PURE__ */ s.jsx("th", { scope: "col", children: "P" }),
        /* @__PURE__ */ s.jsx(Ba, { label: "GF", sortKey: "goalsFor", sort: l, onSort: a }),
        /* @__PURE__ */ s.jsx(Ba, { label: "GS", sortKey: "goalsAgainst", sort: l, onSort: a }),
        /* @__PURE__ */ s.jsx("th", { scope: "col", children: "DR" }),
        /* @__PURE__ */ s.jsx("th", { scope: "col", children: "FP" })
      ] }) }),
      /* @__PURE__ */ s.jsx("tbody", { children: o.map((u, c) => {
        const f = l ? c + 1 : u.position;
        return /* @__PURE__ */ s.jsxs("tr", { className: f <= 3 ? `is-top-${f}` : "", children: [
          /* @__PURE__ */ s.jsx("td", { className: "lf-standings-rank-col", children: /* @__PURE__ */ s.jsx("b", { children: f }) }),
          /* @__PURE__ */ s.jsx("td", { className: "lf-standings-team-col", children: /* @__PURE__ */ s.jsx(Ua, { team: u.team, penalty: u.penalty }) }),
          /* @__PURE__ */ s.jsx("td", { className: "is-points", children: /* @__PURE__ */ s.jsx("strong", { children: u.points }) }),
          /* @__PURE__ */ s.jsx("td", { children: u.played }),
          /* @__PURE__ */ s.jsx("td", { children: u.wins }),
          /* @__PURE__ */ s.jsx("td", { children: u.draws }),
          /* @__PURE__ */ s.jsx("td", { children: u.losses }),
          /* @__PURE__ */ s.jsx("td", { children: u.goalsFor }),
          /* @__PURE__ */ s.jsx("td", { children: u.goalsAgainst }),
          /* @__PURE__ */ s.jsx("td", { className: u.goalDifference > 0 ? "is-positive" : u.goalDifference < 0 ? "is-negative" : "", children: Dm(u.goalDifference) }),
          /* @__PURE__ */ s.jsx("td", { children: ho(u.fantasyPoints) })
        ] }, u.team);
      }) })
    ] }) }) : /* @__PURE__ */ s.jsx("div", { className: "lf-standings-fantasy-wrap", children: /* @__PURE__ */ s.jsxs("table", { className: "lf-standings-table lf-standings-table--fantasy", children: [
      /* @__PURE__ */ s.jsx("thead", { children: /* @__PURE__ */ s.jsxs("tr", { children: [
        /* @__PURE__ */ s.jsx("th", { scope: "col", children: "#" }),
        /* @__PURE__ */ s.jsx("th", { scope: "col", children: "Squadra" }),
        /* @__PURE__ */ s.jsx("th", { scope: "col", children: "Fanta punti" })
      ] }) }),
      /* @__PURE__ */ s.jsx("tbody", { children: e.fantasy.map((u) => /* @__PURE__ */ s.jsxs("tr", { className: u.position <= 3 ? `is-top-${u.position}` : "", children: [
        /* @__PURE__ */ s.jsx("td", { children: /* @__PURE__ */ s.jsx("b", { children: u.position }) }),
        /* @__PURE__ */ s.jsx("td", { children: /* @__PURE__ */ s.jsx(Ua, { team: u.team }) }),
        /* @__PURE__ */ s.jsx("td", { className: "is-fantasy-points", children: /* @__PURE__ */ s.jsx("strong", { children: ho(u.fantasyPoints) }) })
      ] }, u.team)) })
    ] }) })
  ] }) });
}
const Va = { league: [], fantasy: [] };
function Om() {
  var v, x, g;
  const e = (v = window.LINEUP_FANTA) == null ? void 0 : v.league, t = ((x = e == null ? void 0 : e.leagueData) == null ? void 0 : x.standingsCsvUrl) ?? "", n = ((g = e == null ? void 0 : e.leagueData) == null ? void 0 : g.standingsFallbackUrl) ?? "", [r, l] = z.useState("loading"), [i, o] = z.useState(Va), [a, u] = z.useState(""), c = z.useRef(!1), f = ds("classifica");
  z.useEffect(() => {
    const w = new AbortController();
    async function L() {
      if (!t) {
        o(Va), l("ready");
        return;
      }
      !c.current && l("loading"), u("");
      try {
        let d;
        try {
          d = await Vn(t, w.signal);
        } catch (y) {
          if (!n || w.signal.aborted)
            throw y;
          console.warn("Standings primary source unavailable, using fallback", y), d = await Vn(n, w.signal);
        }
        const m = Rm(d);
        if (m.league.length === 0 && c.current)
          throw new Error("Aggiornamento vuoto della Classifica");
        o(m), c.current = !0, l("ready");
      } catch (d) {
        if (w.signal.aborted)
          return;
        if (console.error("Standings load error", d), c.current) {
          console.warn("Aggiornamento interno della Classifica non riuscito: mantengo gli ultimi dati validi.");
          return;
        }
        u("La Classifica non è disponibile. Controlla la fonte configurata e riprova."), l("error");
      }
    }
    return L(), () => w.abort();
  }, [t, n, f]);
  const h = z.useMemo(() => (e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.name) ?? "Lega", [e]);
  return r === "loading" ? /* @__PURE__ */ s.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card lf-standings-state", children: [
    /* @__PURE__ */ s.jsx("div", { className: "lf-spinner" }),
    /* @__PURE__ */ s.jsx("p", { children: "Caricamento della Classifica…" })
  ] }) }) : r === "error" ? /* @__PURE__ */ s.jsx("div", { className: "lf-standings-shell", children: /* @__PURE__ */ s.jsxs("section", { className: "lf-dashboard-card lf-standings-state lf-standings-state--error", children: [
    /* @__PURE__ */ s.jsx("strong", { children: "Errore nel caricamento" }),
    /* @__PURE__ */ s.jsx("p", { children: a })
  ] }) }) : /* @__PURE__ */ s.jsx(Im, { data: i, leagueName: h });
}
const Ha = document.getElementById("league-dashboard-root"), Wa = document.getElementById("league-rose-root"), Qa = document.getElementById("league-calendar-root"), Ga = document.getElementById("league-standings-root");
Ha && cn.createRoot(Ha).render(
  /* @__PURE__ */ s.jsx(Cl.StrictMode, { children: /* @__PURE__ */ s.jsx(Jp, {}) })
);
Wa && cn.createRoot(Wa).render(
  /* @__PURE__ */ s.jsx(Cl.StrictMode, { children: /* @__PURE__ */ s.jsx(sm, {}) })
);
Qa && cn.createRoot(Qa).render(
  /* @__PURE__ */ s.jsx(Cl.StrictMode, { children: /* @__PURE__ */ s.jsx(Lm, {}) })
);
Ga && cn.createRoot(Ga).render(
  /* @__PURE__ */ s.jsx(Cl.StrictMode, { children: /* @__PURE__ */ s.jsx(Om, {}) })
);
