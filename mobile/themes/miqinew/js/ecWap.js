/*! jQuery v2.0.0 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
 */
(function (e, undefined) {
    var t, n, r = typeof undefined, i = e.location, o = e.document, s = o.documentElement, a = e.jQuery, u = e.$,
        l = {}, c = [], f = "2.0.0", p = c.concat, h = c.push, d = c.slice, g = c.indexOf, m = l.toString,
        y = l.hasOwnProperty, v = f.trim, x = function (e, n) {
            return new x.fn.init(e, n, t)
        }, b = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, w = /\S+/g, T = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, k = /^-ms-/, N = /-([\da-z])/gi, E = function (e, t) {
            return t.toUpperCase()
        }, S = function () {
            o.removeEventListener("DOMContentLoaded", S, !1), e.removeEventListener("load", S, !1), x.ready()
        };
    x.fn = x.prototype = {
        jquery: f, constructor: x, init: function (e, t, n) {
            var r, i;
            if (!e)return this;
            if ("string" == typeof e) {
                if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : T.exec(e), !r || !r[1] && t)return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof x ? t[0] : t, x.merge(this, x.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : o, !0)), C.test(r[1]) && x.isPlainObject(t))for (r in t)x.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return i = o.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = o, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? n.ready(e) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), x.makeArray(e, this))
        }, selector: "", length: 0, toArray: function () {
            return d.call(this)
        }, get: function (e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        }, pushStack: function (e) {
            var t = x.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e, t) {
            return x.each(this, e, t)
        }, ready: function (e) {
            return x.ready.promise().done(e), this
        }, slice: function () {
            return this.pushStack(d.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        }, map: function (e) {
            return this.pushStack(x.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: h, sort: [].sort, splice: [].splice
    }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function () {
        var e, t, n, r, i, o, s = arguments[0] || {}, a = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof s && (l = s, s = arguments[1] || {}, a = 2), "object" == typeof s || x.isFunction(s) || (s = {}), u === a && (s = this, --a); u > a; a++)if (null != (e = arguments[a]))for (t in e)n = s[t], r = e[t], s !== r && (l && r && (x.isPlainObject(r) || (i = x.isArray(r))) ? (i ? (i = !1, o = n && x.isArray(n) ? n : []) : o = n && x.isPlainObject(n) ? n : {}, s[t] = x.extend(l, o, r)) : r !== undefined && (s[t] = r));
        return s
    }, x.extend({
        expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""), noConflict: function (t) {
            return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = a), x
        }, isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? x.readyWait++ : x.ready(!0)
        }, ready: function (e) {
            (e === !0 ? --x.readyWait : x.isReady) || (x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(o, [x]), x.fn.trigger && x(o).trigger("ready").off("ready")))
        }, isFunction: function (e) {
            return "function" === x.type(e)
        }, isArray: Array.isArray, isWindow: function (e) {
            return null != e && e === e.window
        }, isNumeric: function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[m.call(e)] || "object" : typeof e
        }, isPlainObject: function (e) {
            if ("object" !== x.type(e) || e.nodeType || x.isWindow(e))return !1;
            try {
                if (e.constructor && !y.call(e.constructor.prototype, "isPrototypeOf"))return !1
            } catch (t) {
                return !1
            }
            return !0
        }, isEmptyObject: function (e) {
            var t;
            for (t in e)return !1;
            return !0
        }, error: function (e) {
            throw Error(e)
        }, parseHTML: function (e, t, n) {
            if (!e || "string" != typeof e)return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || o;
            var r = C.exec(e), i = !n && [];
            return r ? [t.createElement(r[1])] : (r = x.buildFragment([e], t, i), i && x(i).remove(), x.merge([], r.childNodes))
        }, parseJSON: JSON.parse, parseXML: function (e) {
            var t, n;
            if (!e || "string" != typeof e)return null;
            try {
                n = new DOMParser, t = n.parseFromString(e, "text/xml")
            } catch (r) {
                t = undefined
            }
            return (!t || t.getElementsByTagName("parsererror").length) && x.error("Invalid XML: " + e), t
        }, noop: function () {
        }, globalEval: function (e) {
            var t, n = eval;
            e = x.trim(e), e && (1 === e.indexOf("use strict") ? (t = o.createElement("script"), t.text = e, o.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        }, camelCase: function (e) {
            return e.replace(k, "ms-").replace(N, E)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t, n) {
            var r, i = 0, o = e.length, s = j(e);
            if (n) {
                if (s) {
                    for (; o > i; i++)if (r = t.apply(e[i], n), r === !1)break
                } else for (i in e)if (r = t.apply(e[i], n), r === !1)break
            } else if (s) {
                for (; o > i; i++)if (r = t.call(e[i], i, e[i]), r === !1)break
            } else for (i in e)if (r = t.call(e[i], i, e[i]), r === !1)break;
            return e
        }, trim: function (e) {
            return null == e ? "" : v.call(e)
        }, makeArray: function (e, t) {
            var n = t || [];
            return null != e && (j(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : h.call(n, e)), n
        }, inArray: function (e, t, n) {
            return null == t ? -1 : g.call(t, e, n)
        }, merge: function (e, t) {
            var n = t.length, r = e.length, i = 0;
            if ("number" == typeof n)for (; n > i; i++)e[r++] = t[i]; else while (t[i] !== undefined)e[r++] = t[i++];
            return e.length = r, e
        }, grep: function (e, t, n) {
            var r, i = [], o = 0, s = e.length;
            for (n = !!n; s > o; o++)r = !!t(e[o], o), n !== r && i.push(e[o]);
            return i
        }, map: function (e, t, n) {
            var r, i = 0, o = e.length, s = j(e), a = [];
            if (s)for (; o > i; i++)r = t(e[i], i, n), null != r && (a[a.length] = r); else for (i in e)r = t(e[i], i, n), null != r && (a[a.length] = r);
            return p.apply([], a)
        }, guid: 1, proxy: function (e, t) {
            var n, r, i;
            return "string" == typeof t && (n = e[t], t = e, e = n), x.isFunction(e) ? (r = d.call(arguments, 2), i = function () {
                return e.apply(t || this, r.concat(d.call(arguments)))
            }, i.guid = e.guid = e.guid || x.guid++, i) : undefined
        }, access: function (e, t, n, r, i, o, s) {
            var a = 0, u = e.length, l = null == n;
            if ("object" === x.type(n)) {
                i = !0;
                for (a in n)x.access(e, t, a, n[a], !0, o, s)
            } else if (r !== undefined && (i = !0, x.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
                    return l.call(x(e), n)
                })), t))for (; u > a; a++)t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        }, now: Date.now, swap: function (e, t, n, r) {
            var i, o, s = {};
            for (o in t)s[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t)e.style[o] = s[o];
            return i
        }
    }), x.ready.promise = function (t) {
        return n || (n = x.Deferred(), "complete" === o.readyState ? setTimeout(x.ready) : (o.addEventListener("DOMContentLoaded", S, !1), e.addEventListener("load", S, !1))), n.promise(t)
    }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        l["[object " + t + "]"] = t.toLowerCase()
    });
    function j(e) {
        var t = e.length, n = x.type(e);
        return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    t = x(o), function (e, undefined) {
        var t, n, r, i, o, s, a, u, l, c, f, p, h, d, g, m, y = "sizzle" + -new Date, v = e.document, b = {}, w = 0,
            T = 0, C = ot(), k = ot(), N = ot(), E = !1, S = function () {
                return 0
            }, j = typeof undefined, D = 1 << 31, A = [], L = A.pop, q = A.push, H = A.push, O = A.slice,
            F = A.indexOf || function (e) {
                    var t = 0, n = this.length;
                    for (; n > t; t++)if (this[t] === e)return t;
                    return -1
                },
            P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            R = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", W = M.replace("w", "w#"),
            $ = "\\[" + R + "*(" + M + ")" + R + "*(?:([*^$|!~]?=)" + R + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + W + ")|)|)" + R + "*\\]",
            B = ":(" + M + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + $.replace(3, 8) + ")*)|.*)\\)|)",
            I = RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"), z = RegExp("^" + R + "*," + R + "*"),
            _ = RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"), X = RegExp(R + "*[+~]"),
            U = RegExp("=" + R + "*([^\\]'\"]*)" + R + "*\\]", "g"), Y = RegExp(B), V = RegExp("^" + W + "$"), G = {
                ID: RegExp("^#(" + M + ")"),
                CLASS: RegExp("^\\.(" + M + ")"),
                TAG: RegExp("^(" + M.replace("w", "w*") + ")"),
                ATTR: RegExp("^" + $),
                PSEUDO: RegExp("^" + B),
                CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
                "boolean": RegExp("^(?:" + P + ")$", "i"),
                needsContext: RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i")
            }, J = /^[^{]+\{\s*\[native \w/, Q = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            K = /^(?:input|select|textarea|button)$/i, Z = /^h\d$/i, et = /'|\\/g,
            tt = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, nt = function (e, t) {
                var n = "0x" + t - 65536;
                return n !== n ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n)
            };
        try {
            H.apply(A = O.call(v.childNodes), v.childNodes), A[v.childNodes.length].nodeType
        } catch (rt) {
            H = {
                apply: A.length ? function (e, t) {
                    q.apply(e, O.call(t))
                } : function (e, t) {
                    var n = e.length, r = 0;
                    while (e[n++] = t[r++]);
                    e.length = n - 1
                }
            }
        }
        function it(e) {
            return J.test(e + "")
        }

        function ot() {
            var e, t = [];
            return e = function (n, i) {
                return t.push(n += " ") > r.cacheLength && delete e[t.shift()], e[n] = i
            }
        }

        function st(e) {
            return e[y] = !0, e
        }

        function at(e) {
            var t = c.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function ut(e, t, n, r) {
            var i, o, s, a, u, f, d, g, x, w;
            if ((t ? t.ownerDocument || t : v) !== c && l(t), t = t || c, n = n || [], !e || "string" != typeof e)return n;
            if (1 !== (a = t.nodeType) && 9 !== a)return [];
            if (p && !r) {
                if (i = Q.exec(e))if (s = i[1]) {
                    if (9 === a) {
                        if (o = t.getElementById(s), !o || !o.parentNode)return n;
                        if (o.id === s)return n.push(o), n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(s)) && m(t, o) && o.id === s)return n.push(o), n
                } else {
                    if (i[2])return H.apply(n, t.getElementsByTagName(e)), n;
                    if ((s = i[3]) && b.getElementsByClassName && t.getElementsByClassName)return H.apply(n, t.getElementsByClassName(s)), n
                }
                if (b.qsa && (!h || !h.test(e))) {
                    if (g = d = y, x = t, w = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
                        f = gt(e), (d = t.getAttribute("id")) ? g = d.replace(et, "\\$&") : t.setAttribute("id", g), g = "[id='" + g + "'] ", u = f.length;
                        while (u--)f[u] = g + mt(f[u]);
                        x = X.test(e) && t.parentNode || t, w = f.join(",")
                    }
                    if (w)try {
                        return H.apply(n, x.querySelectorAll(w)), n
                    } catch (T) {
                    } finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return kt(e.replace(I, "$1"), t, n, r)
        }

        o = ut.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, l = ut.setDocument = function (e) {
            var t = e ? e.ownerDocument || e : v;
            return t !== c && 9 === t.nodeType && t.documentElement ? (c = t, f = t.documentElement, p = !o(t), b.getElementsByTagName = at(function (e) {
                return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
            }), b.attributes = at(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), b.getElementsByClassName = at(function (e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
            }), b.sortDetached = at(function (e) {
                return 1 & e.compareDocumentPosition(c.createElement("div"))
            }), b.getById = at(function (e) {
                return f.appendChild(e).id = y, !t.getElementsByName || !t.getElementsByName(y).length
            }), b.getById ? (r.find.ID = function (e, t) {
                if (typeof t.getElementById !== j && p) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, r.filter.ID = function (e) {
                var t = e.replace(tt, nt);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (r.find.ID = function (e, t) {
                if (typeof t.getElementById !== j && p) {
                    var n = t.getElementById(e);
                    return n ? n.id === e || typeof n.getAttributeNode !== j && n.getAttributeNode("id").value === e ? [n] : undefined : []
                }
            }, r.filter.ID = function (e) {
                var t = e.replace(tt, nt);
                return function (e) {
                    var n = typeof e.getAttributeNode !== j && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), r.find.TAG = b.getElementsByTagName ? function (e, t) {
                return typeof t.getElementsByTagName !== j ? t.getElementsByTagName(e) : undefined
            } : function (e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    while (n = o[i++])1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, r.find.CLASS = b.getElementsByClassName && function (e, t) {
                    return typeof t.getElementsByClassName !== j && p ? t.getElementsByClassName(e) : undefined
                }, d = [], h = [], (b.qsa = it(t.querySelectorAll)) && (at(function (e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || h.push("\\[" + R + "*(?:value|" + P + ")"), e.querySelectorAll(":checked").length || h.push(":checked")
            }), at(function (e) {
                var t = c.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && h.push("[*^$]=" + R + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || h.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), h.push(",.*:")
            })), (b.matchesSelector = it(g = f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && at(function (e) {
                b.disconnectedMatch = g.call(e, "div"), g.call(e, "[s!='']:x"), d.push("!=", B)
            }), h = h.length && RegExp(h.join("|")), d = d.length && RegExp(d.join("|")), m = it(f.contains) || f.compareDocumentPosition ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function (e, t) {
                if (t)while (t = t.parentNode)if (t === e)return !0;
                return !1
            }, S = f.compareDocumentPosition ? function (e, n) {
                if (e === n)return E = !0, 0;
                var r = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
                return r ? 1 & r || !b.sortDetached && n.compareDocumentPosition(e) === r ? e === t || m(v, e) ? -1 : n === t || m(v, n) ? 1 : u ? F.call(u, e) - F.call(u, n) : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
            } : function (e, n) {
                var r, i = 0, o = e.parentNode, s = n.parentNode, a = [e], l = [n];
                if (e === n)return E = !0, 0;
                if (!o || !s)return e === t ? -1 : n === t ? 1 : o ? -1 : s ? 1 : u ? F.call(u, e) - F.call(u, n) : 0;
                if (o === s)return lt(e, n);
                r = e;
                while (r = r.parentNode)a.unshift(r);
                r = n;
                while (r = r.parentNode)l.unshift(r);
                while (a[i] === l[i])i++;
                return i ? lt(a[i], l[i]) : a[i] === v ? -1 : l[i] === v ? 1 : 0
            }, c) : c
        }, ut.matches = function (e, t) {
            return ut(e, null, null, t)
        }, ut.matchesSelector = function (e, t) {
            if ((e.ownerDocument || e) !== c && l(e), t = t.replace(U, "='$1']"), !(!b.matchesSelector || !p || d && d.test(t) || h && h.test(t)))try {
                var n = g.call(e, t);
                if (n || b.disconnectedMatch || e.document && 11 !== e.document.nodeType)return n
            } catch (r) {
            }
            return ut(t, c, null, [e]).length > 0
        }, ut.contains = function (e, t) {
            return (e.ownerDocument || e) !== c && l(e), m(e, t)
        }, ut.attr = function (e, t) {
            (e.ownerDocument || e) !== c && l(e);
            var n = r.attrHandle[t.toLowerCase()], i = n && n(e, t, !p);
            return i === undefined ? b.attributes || !p ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null : i
        }, ut.error = function (e) {
            throw Error("Syntax error, unrecognized expression: " + e)
        }, ut.uniqueSort = function (e) {
            var t, n = [], r = 0, i = 0;
            if (E = !b.detectDuplicates, u = !b.sortStable && e.slice(0), e.sort(S), E) {
                while (t = e[i++])t === e[i] && (r = n.push(i));
                while (r--)e.splice(n[r], 1)
            }
            return e
        };
        function lt(e, t) {
            var n = t && e, r = n && (~t.sourceIndex || D) - (~e.sourceIndex || D);
            if (r)return r;
            if (n)while (n = n.nextSibling)if (n === t)return -1;
            return e ? 1 : -1
        }

        function ct(e, t, n) {
            var r;
            return n ? undefined : (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null
        }

        function ft(e, t, n) {
            var r;
            return n ? undefined : r = e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }

        function pt(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function ht(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function dt(e) {
            return st(function (t) {
                return t = +t, st(function (n, r) {
                    var i, o = e([], n.length, t), s = o.length;
                    while (s--)n[i = o[s]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        i = ut.getText = function (e) {
            var t, n = "", r = 0, o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent)return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += i(e)
                } else if (3 === o || 4 === o)return e.nodeValue
            } else for (; t = e[r]; r++)n += i(t);
            return n
        }, r = ut.selectors = {
            cacheLength: 50,
            createPseudo: st,
            match: G,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(tt, nt), e[3] = (e[4] || e[5] || "").replace(tt, nt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ut.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ut.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[5] && e[2];
                    return G.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && Y.test(n) && (t = gt(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(tt, nt).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = C[e + " "];
                    return t || (t = RegExp("(^|" + R + ")" + e + "(" + R + "|$)")) && C(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "")
                        })
                }, ATTR: function (e, t, n) {
                    return function (r) {
                        var i = ut.attr(r, e);
                        return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                }, CHILD: function (e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3), s = "last" !== e.slice(-4), a = "of-type" === t;
                    return 1 === r && 0 === i ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, u) {
                        var l, c, f, p, h, d, g = o !== s ? "nextSibling" : "previousSibling", m = t.parentNode,
                            v = a && t.nodeName.toLowerCase(), x = !u && !a;
                        if (m) {
                            if (o) {
                                while (g) {
                                    f = t;
                                    while (f = f[g])if (a ? f.nodeName.toLowerCase() === v : 1 === f.nodeType)return !1;
                                    d = g = "only" === e && !d && "nextSibling"
                                }
                                return !0
                            }
                            if (d = [s ? m.firstChild : m.lastChild], s && x) {
                                c = m[y] || (m[y] = {}), l = c[e] || [], h = l[0] === w && l[1], p = l[0] === w && l[2], f = h && m.childNodes[h];
                                while (f = ++h && f && f[g] || (p = h = 0) || d.pop())if (1 === f.nodeType && ++p && f === t) {
                                    c[e] = [w, h, p];
                                    break
                                }
                            } else if (x && (l = (t[y] || (t[y] = {}))[e]) && l[0] === w) p = l[1]; else while (f = ++h && f && f[g] || (p = h = 0) || d.pop())if ((a ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) && ++p && (x && ((f[y] || (f[y] = {}))[e] = [w, p]), f === t))break;
                            return p -= i, p === r || 0 === p % r && p / r >= 0
                        }
                    }
                }, PSEUDO: function (e, t) {
                    var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || ut.error("unsupported pseudo: " + e);
                    return i[y] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? st(function (e, n) {
                        var r, o = i(e, t), s = o.length;
                        while (s--)r = F.call(e, o[s]), e[r] = !(n[r] = o[s])
                    }) : function (e) {
                        return i(e, 0, n)
                    }) : i
                }
            },
            pseudos: {
                not: st(function (e) {
                    var t = [], n = [], r = s(e.replace(I, "$1"));
                    return r[y] ? st(function (e, t, n, i) {
                        var o, s = r(e, null, i, []), a = e.length;
                        while (a--)(o = s[a]) && (e[a] = !(t[a] = o))
                    }) : function (e, i, o) {
                        return t[0] = e, r(t, null, o, n), !n.pop()
                    }
                }), has: st(function (e) {
                    return function (t) {
                        return ut(e, t).length > 0
                    }
                }), contains: st(function (e) {
                    return function (t) {
                        return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                    }
                }), lang: st(function (e) {
                    return V.test(e || "") || ut.error("unsupported lang: " + e), e = e.replace(tt, nt).toLowerCase(), function (t) {
                        var n;
                        do if (n = p ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === f
                }, focus: function (e) {
                    return e === c.activeElement && (!c.hasFocus || c.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return e.disabled === !1
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType)return !1;
                    return !0
                }, parent: function (e) {
                    return !r.pseudos.empty(e)
                }, header: function (e) {
                    return Z.test(e.nodeName)
                }, input: function (e) {
                    return K.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                }, first: dt(function () {
                    return [0]
                }), last: dt(function (e, t) {
                    return [t - 1]
                }), eq: dt(function (e, t, n) {
                    return [0 > n ? n + t : n]
                }), even: dt(function (e, t) {
                    var n = 0;
                    for (; t > n; n += 2)e.push(n);
                    return e
                }), odd: dt(function (e, t) {
                    var n = 1;
                    for (; t > n; n += 2)e.push(n);
                    return e
                }), lt: dt(function (e, t, n) {
                    var r = 0 > n ? n + t : n;
                    for (; --r >= 0;)e.push(r);
                    return e
                }), gt: dt(function (e, t, n) {
                    var r = 0 > n ? n + t : n;
                    for (; t > ++r;)e.push(r);
                    return e
                })
            }
        };
        for (t in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})r.pseudos[t] = pt(t);
        for (t in{submit: !0, reset: !0})r.pseudos[t] = ht(t);
        function gt(e, t) {
            var n, i, o, s, a, u, l, c = k[e + " "];
            if (c)return t ? 0 : c.slice(0);
            a = e, u = [], l = r.preFilter;
            while (a) {
                (!n || (i = z.exec(a))) && (i && (a = a.slice(i[0].length) || a), u.push(o = [])), n = !1, (i = _.exec(a)) && (n = i.shift(), o.push({
                    value: n,
                    type: i[0].replace(I, " ")
                }), a = a.slice(n.length));
                for (s in r.filter)!(i = G[s].exec(a)) || l[s] && !(i = l[s](i)) || (n = i.shift(), o.push({
                    value: n,
                    type: s,
                    matches: i
                }), a = a.slice(n.length));
                if (!n)break
            }
            return t ? a.length : a ? ut.error(e) : k(e, u).slice(0)
        }

        function mt(e) {
            var t = 0, n = e.length, r = "";
            for (; n > t; t++)r += e[t].value;
            return r
        }

        function yt(e, t, r) {
            var i = t.dir, o = r && "parentNode" === i, s = T++;
            return t.first ? function (t, n, r) {
                while (t = t[i])if (1 === t.nodeType || o)return e(t, n, r)
            } : function (t, r, a) {
                var u, l, c, f = w + " " + s;
                if (a) {
                    while (t = t[i])if ((1 === t.nodeType || o) && e(t, r, a))return !0
                } else while (t = t[i])if (1 === t.nodeType || o)if (c = t[y] || (t[y] = {}), (l = c[i]) && l[0] === f) {
                    if ((u = l[1]) === !0 || u === n)return u === !0
                } else if (l = c[i] = [f], l[1] = e(t, r, a) || n, l[1] === !0)return !0
            }
        }

        function vt(e) {
            return e.length > 1 ? function (t, n, r) {
                var i = e.length;
                while (i--)if (!e[i](t, n, r))return !1;
                return !0
            } : e[0]
        }

        function xt(e, t, n, r, i) {
            var o, s = [], a = 0, u = e.length, l = null != t;
            for (; u > a; a++)(o = e[a]) && (!n || n(o, r, i)) && (s.push(o), l && t.push(a));
            return s
        }

        function bt(e, t, n, r, i, o) {
            return r && !r[y] && (r = bt(r)), i && !i[y] && (i = bt(i, o)), st(function (o, s, a, u) {
                var l, c, f, p = [], h = [], d = s.length, g = o || Ct(t || "*", a.nodeType ? [a] : a, []),
                    m = !e || !o && t ? g : xt(g, p, e, a, u), y = n ? i || (o ? e : d || r) ? [] : s : m;
                if (n && n(m, y, a, u), r) {
                    l = xt(y, h), r(l, [], a, u), c = l.length;
                    while (c--)(f = l[c]) && (y[h[c]] = !(m[h[c]] = f))
                }
                if (o) {
                    if (i || e) {
                        if (i) {
                            l = [], c = y.length;
                            while (c--)(f = y[c]) && l.push(m[c] = f);
                            i(null, y = [], l, u)
                        }
                        c = y.length;
                        while (c--)(f = y[c]) && (l = i ? F.call(o, f) : p[c]) > -1 && (o[l] = !(s[l] = f))
                    }
                } else y = xt(y === s ? y.splice(d, y.length) : y), i ? i(null, s, y, u) : H.apply(s, y)
            })
        }

        function wt(e) {
            var t, n, i, o = e.length, s = r.relative[e[0].type], u = s || r.relative[" "], l = s ? 1 : 0,
                c = yt(function (e) {
                    return e === t
                }, u, !0), f = yt(function (e) {
                    return F.call(t, e) > -1
                }, u, !0), p = [function (e, n, r) {
                    return !s && (r || n !== a) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r))
                }];
            for (; o > l; l++)if (n = r.relative[e[l].type]) p = [yt(vt(p), n)]; else {
                if (n = r.filter[e[l].type].apply(null, e[l].matches), n[y]) {
                    for (i = ++l; o > i; i++)if (r.relative[e[i].type])break;
                    return bt(l > 1 && vt(p), l > 1 && mt(e.slice(0, l - 1)).replace(I, "$1"), n, i > l && wt(e.slice(l, i)), o > i && wt(e = e.slice(i)), o > i && mt(e))
                }
                p.push(n)
            }
            return vt(p)
        }

        function Tt(e, t) {
            var i = 0, o = t.length > 0, s = e.length > 0, u = function (u, l, f, p, h) {
                var d, g, m, y = [], v = 0, x = "0", b = u && [], T = null != h, C = a,
                    k = u || s && r.find.TAG("*", h && l.parentNode || l), N = w += null == C ? 1 : Math.random() || .1;
                for (T && (a = l !== c && l, n = i); null != (d = k[x]); x++) {
                    if (s && d) {
                        g = 0;
                        while (m = e[g++])if (m(d, l, f)) {
                            p.push(d);
                            break
                        }
                        T && (w = N, n = ++i)
                    }
                    o && ((d = !m && d) && v--, u && b.push(d))
                }
                if (v += x, o && x !== v) {
                    g = 0;
                    while (m = t[g++])m(b, y, l, f);
                    if (u) {
                        if (v > 0)while (x--)b[x] || y[x] || (y[x] = L.call(p));
                        y = xt(y)
                    }
                    H.apply(p, y), T && !u && y.length > 0 && v + t.length > 1 && ut.uniqueSort(p)
                }
                return T && (w = N, a = C), b
            };
            return o ? st(u) : u
        }

        s = ut.compile = function (e, t) {
            var n, r = [], i = [], o = N[e + " "];
            if (!o) {
                t || (t = gt(e)), n = t.length;
                while (n--)o = wt(t[n]), o[y] ? r.push(o) : i.push(o);
                o = N(e, Tt(i, r))
            }
            return o
        };
        function Ct(e, t, n) {
            var r = 0, i = t.length;
            for (; i > r; r++)ut(e, t[r], n);
            return n
        }

        function kt(e, t, n, i) {
            var o, a, u, l, c, f = gt(e);
            if (!i && 1 === f.length) {
                if (a = f[0] = f[0].slice(0), a.length > 2 && "ID" === (u = a[0]).type && 9 === t.nodeType && p && r.relative[a[1].type]) {
                    if (t = (r.find.ID(u.matches[0].replace(tt, nt), t) || [])[0], !t)return n;
                    e = e.slice(a.shift().value.length)
                }
                o = G.needsContext.test(e) ? 0 : a.length;
                while (o--) {
                    if (u = a[o], r.relative[l = u.type])break;
                    if ((c = r.find[l]) && (i = c(u.matches[0].replace(tt, nt), X.test(a[0].type) && t.parentNode || t))) {
                        if (a.splice(o, 1), e = i.length && mt(a), !e)return H.apply(n, i), n;
                        break
                    }
                }
            }
            return s(e, f)(i, t, !p, n, X.test(e)), n
        }

        r.pseudos.nth = r.pseudos.eq;
        function Nt() {
        }

        Nt.prototype = r.filters = r.pseudos, r.setFilters = new Nt, b.sortStable = y.split("").sort(S).join("") === y, l(), [0, 0].sort(S), b.detectDuplicates = E, at(function (e) {
            if (e.innerHTML = "<a href='#'></a>", "#" !== e.firstChild.getAttribute("href")) {
                var t = "type|href|height|width".split("|"), n = t.length;
                while (n--)r.attrHandle[t[n]] = ft
            }
        }), at(function (e) {
            if (null != e.getAttribute("disabled")) {
                var t = P.split("|"), n = t.length;
                while (n--)r.attrHandle[t[n]] = ct
            }
        }), x.find = ut, x.expr = ut.selectors, x.expr[":"] = x.expr.pseudos, x.unique = ut.uniqueSort, x.text = ut.getText, x.isXMLDoc = ut.isXML, x.contains = ut.contains
    }(e);
    var D = {};

    function A(e) {
        var t = D[e] = {};
        return x.each(e.match(w) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    x.Callbacks = function (e) {
        e = "string" == typeof e ? D[e] || A(e) : x.extend({}, e);
        var t, n, r, i, o, s, a = [], u = !e.once && [], l = function (f) {
            for (t = e.memory && f, n = !0, s = i || 0, i = 0, o = a.length, r = !0; a && o > s; s++)if (a[s].apply(f[0], f[1]) === !1 && e.stopOnFalse) {
                t = !1;
                break
            }
            r = !1, a && (u ? u.length && l(u.shift()) : t ? a = [] : c.disable())
        }, c = {
            add: function () {
                if (a) {
                    var n = a.length;
                    (function s(t) {
                        x.each(t, function (t, n) {
                            var r = x.type(n);
                            "function" === r ? e.unique && c.has(n) || a.push(n) : n && n.length && "string" !== r && s(n)
                        })
                    })(arguments), r ? o = a.length : t && (i = n, l(t))
                }
                return this
            }, remove: function () {
                return a && x.each(arguments, function (e, t) {
                    var n;
                    while ((n = x.inArray(t, a, n)) > -1)a.splice(n, 1), r && (o >= n && o--, s >= n && s--)
                }), this
            }, has: function (e) {
                return e ? x.inArray(e, a) > -1 : !(!a || !a.length)
            }, empty: function () {
                return a = [], o = 0, this
            }, disable: function () {
                return a = u = t = undefined, this
            }, disabled: function () {
                return !a
            }, lock: function () {
                return u = undefined, t || c.disable(), this
            }, locked: function () {
                return !u
            }, fireWith: function (e, t) {
                return t = t || [], t = [e, t.slice ? t.slice() : t], !a || n && !u || (r ? u.push(t) : l(t)), this
            }, fire: function () {
                return c.fireWith(this, arguments), this
            }, fired: function () {
                return !!n
            }
        };
        return c
    }, x.extend({
        Deferred: function (e) {
            var t = [["resolve", "done", x.Callbacks("once memory"), "resolved"], ["reject", "fail", x.Callbacks("once memory"), "rejected"], ["notify", "progress", x.Callbacks("memory")]],
                n = "pending", r = {
                    state: function () {
                        return n
                    }, always: function () {
                        return i.done(arguments).fail(arguments), this
                    }, then: function () {
                        var e = arguments;
                        return x.Deferred(function (n) {
                            x.each(t, function (t, o) {
                                var s = o[0], a = x.isFunction(e[t]) && e[t];
                                i[o[1]](function () {
                                    var e = a && a.apply(this, arguments);
                                    e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    }, promise: function (e) {
                        return null != e ? x.extend(e, r) : r
                    }
                }, i = {};
            return r.pipe = r.then, x.each(t, function (e, o) {
                var s = o[2], a = o[3];
                r[o[1]] = s.add, a && s.add(function () {
                    n = a
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = s.fireWith
            }), r.promise(i), e && e.call(i, i), i
        }, when: function (e) {
            var t = 0, n = d.call(arguments), r = n.length, i = 1 !== r || e && x.isFunction(e.promise) ? r : 0,
                o = 1 === i ? e : x.Deferred(), s = function (e, t, n) {
                    return function (r) {
                        t[e] = this, n[e] = arguments.length > 1 ? d.call(arguments) : r, n === a ? o.notifyWith(t, n) : --i || o.resolveWith(t, n)
                    }
                }, a, u, l;
            if (r > 1)for (a = Array(r), u = Array(r), l = Array(r); r > t; t++)n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(s(t, l, n)).fail(o.reject).progress(s(t, u, a)) : --i;
            return i || o.resolveWith(l, n), o.promise()
        }
    }), x.support = function (t) {
        var n = o.createElement("input"), r = o.createDocumentFragment(), i = o.createElement("div"),
            s = o.createElement("select"), a = s.appendChild(o.createElement("option"));
        return n.type ? (n.type = "checkbox", t.checkOn = "" !== n.value, t.optSelected = a.selected, t.reliableMarginRight = !0, t.boxSizingReliable = !0, t.pixelPosition = !1, n.checked = !0, t.noCloneChecked = n.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !a.disabled, n = o.createElement("input"), n.value = "t", n.type = "radio", t.radioValue = "t" === n.value, n.setAttribute("checked", "t"), n.setAttribute("name", "t"), r.appendChild(n), t.checkClone = r.cloneNode(!0).cloneNode(!0).lastChild.checked, t.focusinBubbles = "onfocusin" in e, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === i.style.backgroundClip, x(function () {
            var n, r,
                s = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
                a = o.getElementsByTagName("body")[0];
            a && (n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(i), i.innerHTML = "", i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", x.swap(a, null != a.style.zoom ? {zoom: 1} : {}, function () {
                t.boxSizing = 4 === i.offsetWidth
            }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {width: "4px"}).width, r = i.appendChild(o.createElement("div")), r.style.cssText = i.style.cssText = s, r.style.marginRight = r.style.width = "0", i.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), a.removeChild(n))
        }), t) : t
    }({});
    var L, q, H = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, O = /([A-Z])/g;

    function F() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function () {
                return {}
            }
        }), this.expando = x.expando + Math.random()
    }

    F.uid = 1, F.accepts = function (e) {
        return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0
    }, F.prototype = {
        key: function (e) {
            if (!F.accepts(e))return 0;
            var t = {}, n = e[this.expando];
            if (!n) {
                n = F.uid++;
                try {
                    t[this.expando] = {value: n}, Object.defineProperties(e, t)
                } catch (r) {
                    t[this.expando] = n, x.extend(e, t)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        }, set: function (e, t, n) {
            var r, i = this.key(e), o = this.cache[i];
            if ("string" == typeof t) o[t] = n; else if (x.isEmptyObject(o)) this.cache[i] = t; else for (r in t)o[r] = t[r]
        }, get: function (e, t) {
            var n = this.cache[this.key(e)];
            return t === undefined ? n : n[t]
        }, access: function (e, t, n) {
            return t === undefined || t && "string" == typeof t && n === undefined ? this.get(e, t) : (this.set(e, t, n), n !== undefined ? n : t)
        }, remove: function (e, t) {
            var n, r, i = this.key(e), o = this.cache[i];
            if (t === undefined) this.cache[i] = {}; else {
                x.isArray(t) ? r = t.concat(t.map(x.camelCase)) : t in o ? r = [t] : (r = x.camelCase(t), r = r in o ? [r] : r.match(w) || []), n = r.length;
                while (n--)delete o[r[n]]
            }
        }, hasData: function (e) {
            return !x.isEmptyObject(this.cache[e[this.expando]] || {})
        }, discard: function (e) {
            delete this.cache[this.key(e)]
        }
    }, L = new F, q = new F, x.extend({
        acceptData: F.accepts, hasData: function (e) {
            return L.hasData(e) || q.hasData(e)
        }, data: function (e, t, n) {
            return L.access(e, t, n)
        }, removeData: function (e, t) {
            L.remove(e, t)
        }, _data: function (e, t, n) {
            return q.access(e, t, n)
        }, _removeData: function (e, t) {
            q.remove(e, t)
        }
    }), x.fn.extend({
        data: function (e, t) {
            var n, r, i = this[0], o = 0, s = null;
            if (e === undefined) {
                if (this.length && (s = L.get(i), 1 === i.nodeType && !q.get(i, "hasDataAttrs"))) {
                    for (n = i.attributes; n.length > o; o++)r = n[o].name, 0 === r.indexOf("data-") && (r = x.camelCase(r.substring(5)), P(i, r, s[r]));
                    q.set(i, "hasDataAttrs", !0)
                }
                return s
            }
            return "object" == typeof e ? this.each(function () {
                L.set(this, e)
            }) : x.access(this, function (t) {
                var n, r = x.camelCase(e);
                if (i && t === undefined) {
                    if (n = L.get(i, e), n !== undefined)return n;
                    if (n = L.get(i, r), n !== undefined)return n;
                    if (n = P(i, r, undefined), n !== undefined)return n
                } else this.each(function () {
                    var n = L.get(this, r);
                    L.set(this, r, t), -1 !== e.indexOf("-") && n !== undefined && L.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        }, removeData: function (e) {
            return this.each(function () {
                L.remove(this, e)
            })
        }
    });
    function P(e, t, n) {
        var r;
        if (n === undefined && 1 === e.nodeType)if (r = "data-" + t.replace(O, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
            try {
                n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : H.test(n) ? JSON.parse(n) : n
            } catch (i) {
            }
            L.set(e, t, n)
        } else n = undefined;
        return n
    }

    x.extend({
        queue: function (e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = q.get(e, t), n && (!r || x.isArray(n) ? r = q.access(e, t, x.makeArray(n)) : r.push(n)), r || []) : undefined
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = x.queue(e, t), r = n.length, i = n.shift(), o = x._queueHooks(e, t), s = function () {
                x.dequeue(e, t)
            };
            "inprogress" === i && (i = n.shift(), r--), o.cur = i, i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return q.get(e, n) || q.access(e, n, {
                    empty: x.Callbacks("once memory").add(function () {
                        q.remove(e, [t + "queue", n])
                    })
                })
        }
    }), x.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), n > arguments.length ? x.queue(this[0], e) : t === undefined ? this : this.each(function () {
                var n = x.queue(this, e, t);
                x._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && x.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                x.dequeue(this, e)
            })
        }, delay: function (e, t) {
            return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
                var r = setTimeout(t, e);
                n.stop = function () {
                    clearTimeout(r)
                }
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, r = 1, i = x.Deferred(), o = this, s = this.length, a = function () {
                --r || i.resolveWith(o, [o])
            };
            "string" != typeof e && (t = e, e = undefined), e = e || "fx";
            while (s--)n = q.get(o[s], e + "queueHooks"), n && n.empty && (r++, n.empty.add(a));
            return a(), i.promise(t)
        }
    });
    var R, M, W = /[\t\r\n]/g, $ = /\r/g, B = /^(?:input|select|textarea|button)$/i;
    x.fn.extend({
        attr: function (e, t) {
            return x.access(this, x.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                x.removeAttr(this, e)
            })
        }, prop: function (e, t) {
            return x.access(this, x.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return this.each(function () {
                delete this[x.propFix[e] || e]
            })
        }, addClass: function (e) {
            var t, n, r, i, o, s = 0, a = this.length, u = "string" == typeof e && e;
            if (x.isFunction(e))return this.each(function (t) {
                x(this).addClass(e.call(this, t, this.className))
            });
            if (u)for (t = (e || "").match(w) || []; a > s; s++)if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : " ")) {
                o = 0;
                while (i = t[o++])0 > r.indexOf(" " + i + " ") && (r += i + " ");
                n.className = x.trim(r)
            }
            return this
        }, removeClass: function (e) {
            var t, n, r, i, o, s = 0, a = this.length, u = 0 === arguments.length || "string" == typeof e && e;
            if (x.isFunction(e))return this.each(function (t) {
                x(this).removeClass(e.call(this, t, this.className))
            });
            if (u)for (t = (e || "").match(w) || []; a > s; s++)if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : "")) {
                o = 0;
                while (i = t[o++])while (r.indexOf(" " + i + " ") >= 0)r = r.replace(" " + i + " ", " ");
                n.className = e ? x.trim(r) : ""
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e, i = "boolean" == typeof t;
            return x.isFunction(e) ? this.each(function (n) {
                x(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function () {
                if ("string" === n) {
                    var o, s = 0, a = x(this), u = t, l = e.match(w) || [];
                    while (o = l[s++])u = i ? u : !a.hasClass(o), a[u ? "addClass" : "removeClass"](o)
                } else(n === r || "boolean" === n) && (this.className && q.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : q.get(this, "__className__") || "")
            })
        }, hasClass: function (e) {
            var t = " " + e + " ", n = 0, r = this.length;
            for (; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(W, " ").indexOf(t) >= 0)return !0;
            return !1
        }, val: function (e) {
            var t, n, r, i = this[0];
            {
                if (arguments.length)return r = x.isFunction(e), this.each(function (n) {
                    var i, o = x(this);
                    1 === this.nodeType && (i = r ? e.call(this, n, o.val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : x.isArray(i) && (i = x.map(i, function (e) {
                            return null == e ? "" : e + ""
                        })), t = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], t && "set" in t && t.set(this, i, "value") !== undefined || (this.value = i))
                });
                if (i)return t = x.valHooks[i.type] || x.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, "string" == typeof n ? n.replace($, "") : null == n ? "" : n)
            }
        }
    }), x.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            }, select: {
                get: function (e) {
                    var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i,
                        s = o ? null : [], a = o ? i + 1 : r.length, u = 0 > i ? a : o ? i : 0;
                    for (; a > u; u++)if (n = r[u], !(!n.selected && u !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) {
                        if (t = x(n).val(), o)return t;
                        s.push(t)
                    }
                    return s
                }, set: function (e, t) {
                    var n, r, i = e.options, o = x.makeArray(t), s = i.length;
                    while (s--)r = i[s], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }, attr: function (e, t, n) {
            var i, o, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s)return typeof e.getAttribute === r ? x.prop(e, t, n) : (1 === s && x.isXMLDoc(e) || (t = t.toLowerCase(), i = x.attrHooks[t] || (x.expr.match.boolean.test(t) ? M : R)), n === undefined ? i && "get" in i && null !== (o = i.get(e, t)) ? o : (o = x.find.attr(e, t), null == o ? undefined : o) : null !== n ? i && "set" in i && (o = i.set(e, n, t)) !== undefined ? o : (e.setAttribute(t, n + ""), n) : (x.removeAttr(e, t), undefined))
        }, removeAttr: function (e, t) {
            var n, r, i = 0, o = t && t.match(w);
            if (o && 1 === e.nodeType)while (n = o[i++])r = x.propFix[n] || n, x.expr.match.boolean.test(n) && (e[r] = !1), e.removeAttribute(n)
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }, propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
            var r, i, o, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s)return o = 1 !== s || !x.isXMLDoc(e), o && (t = x.propFix[t] || t, i = x.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    return e.hasAttribute("tabindex") || B.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), M = {
        set: function (e, t, n) {
            return t === !1 ? x.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, x.each(x.expr.match.boolean.source.match(/\w+/g), function (e, t) {
        var n = x.expr.attrHandle[t] || x.find.attr;
        x.expr.attrHandle[t] = function (e, t, r) {
            var i = x.expr.attrHandle[t],
                o = r ? undefined : (x.expr.attrHandle[t] = undefined) != n(e, t, r) ? t.toLowerCase() : null;
            return x.expr.attrHandle[t] = i, o
        }
    }), x.support.optSelected || (x.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        x.propFix[this.toLowerCase()] = this
    }), x.each(["radio", "checkbox"], function () {
        x.valHooks[this] = {
            set: function (e, t) {
                return x.isArray(t) ? e.checked = x.inArray(x(e).val(), t) >= 0 : undefined
            }
        }, x.support.checkOn || (x.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var I = /^key/, z = /^(?:mouse|contextmenu)|click/, _ = /^(?:focusinfocus|focusoutblur)$/,
        X = /^([^.]*)(?:\.(.+)|)$/;

    function U() {
        return !0
    }

    function Y() {
        return !1
    }

    function V() {
        try {
            return o.activeElement
        } catch (e) {
        }
    }

    x.event = {
        global: {},
        add: function (e, t, n, i, o) {
            var s, a, u, l, c, f, p, h, d, g, m, y = q.get(e);
            if (y) {
                n.handler && (s = n, n = s.handler, o = s.selector), n.guid || (n.guid = x.guid++), (l = y.events) || (l = y.events = {}), (a = y.handle) || (a = y.handle = function (e) {
                    return typeof x === r || e && x.event.triggered === e.type ? undefined : x.event.dispatch.apply(a.elem, arguments)
                }, a.elem = e), t = (t || "").match(w) || [""], c = t.length;
                while (c--)u = X.exec(t[c]) || [], d = m = u[1], g = (u[2] || "").split(".").sort(), d && (p = x.event.special[d] || {}, d = (o ? p.delegateType : p.bindType) || d, p = x.event.special[d] || {}, f = x.extend({
                    type: d,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && x.expr.match.needsContext.test(o),
                    namespace: g.join(".")
                }, s), (h = l[d]) || (h = l[d] = [], h.delegateCount = 0, p.setup && p.setup.call(e, i, g, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), p.add && (p.add.call(e, f), f.handler.guid || (f.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, f) : h.push(f), x.event.global[d] = !0);
                e = null
            }
        },
        remove: function (e, t, n, r, i) {
            var o, s, a, u, l, c, f, p, h, d, g, m = q.hasData(e) && q.get(e);
            if (m && (u = m.events)) {
                t = (t || "").match(w) || [""], l = t.length;
                while (l--)if (a = X.exec(t[l]) || [], h = g = a[1], d = (a[2] || "").split(".").sort(), h) {
                    f = x.event.special[h] || {}, h = (r ? f.delegateType : f.bindType) || h, p = u[h] || [], a = a[2] && RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = p.length;
                    while (o--)c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                    s && !p.length && (f.teardown && f.teardown.call(e, d, m.handle) !== !1 || x.removeEvent(e, h, m.handle), delete u[h])
                } else for (h in u)x.event.remove(e, h + t[l], n, r, !0);
                x.isEmptyObject(u) && (delete m.handle, q.remove(e, "events"))
            }
        },
        trigger: function (t, n, r, i) {
            var s, a, u, l, c, f, p, h = [r || o], d = y.call(t, "type") ? t.type : t,
                g = y.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = u = r = r || o, 3 !== r.nodeType && 8 !== r.nodeType && !_.test(d + x.event.triggered) && (d.indexOf(".") >= 0 && (g = d.split("."), d = g.shift(), g.sort()), c = 0 > d.indexOf(":") && "on" + d, t = t[x.expando] ? t : new x.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = g.join("."), t.namespace_re = t.namespace ? RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = undefined, t.target || (t.target = r), n = null == n ? [t] : x.makeArray(n, [t]), p = x.event.special[d] || {}, i || !p.trigger || p.trigger.apply(r, n) !== !1)) {
                if (!i && !p.noBubble && !x.isWindow(r)) {
                    for (l = p.delegateType || d, _.test(l + d) || (a = a.parentNode); a; a = a.parentNode)h.push(a), u = a;
                    u === (r.ownerDocument || o) && h.push(u.defaultView || u.parentWindow || e)
                }
                s = 0;
                while ((a = h[s++]) && !t.isPropagationStopped())t.type = s > 1 ? l : p.bindType || d, f = (q.get(a, "events") || {})[t.type] && q.get(a, "handle"), f && f.apply(a, n), f = c && a[c], f && x.acceptData(a) && f.apply && f.apply(a, n) === !1 && t.preventDefault();
                return t.type = d, i || t.isDefaultPrevented() || p._default && p._default.apply(h.pop(), n) !== !1 || !x.acceptData(r) || c && x.isFunction(r[d]) && !x.isWindow(r) && (u = r[c], u && (r[c] = null), x.event.triggered = d, r[d](), x.event.triggered = undefined, u && (r[c] = u)), t.result
            }
        },
        dispatch: function (e) {
            e = x.event.fix(e);
            var t, n, r, i, o, s = [], a = d.call(arguments), u = (q.get(this, "events") || {})[e.type] || [],
                l = x.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                s = x.event.handlers.call(this, e, u), t = 0;
                while ((i = s[t++]) && !e.isPropagationStopped()) {
                    e.currentTarget = i.elem, n = 0;
                    while ((o = i.handlers[n++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((x.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()))
                }
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var n, r, i, o, s = [], a = t.delegateCount, u = e.target;
            if (a && u.nodeType && (!e.button || "click" !== e.type))for (; u !== this; u = u.parentNode || this)if (u.disabled !== !0 || "click" !== e.type) {
                for (r = [], n = 0; a > n; n++)o = t[n], i = o.selector + " ", r[i] === undefined && (r[i] = o.needsContext ? x(i, this).index(u) >= 0 : x.find(i, this, null, [u]).length), r[i] && r.push(o);
                r.length && s.push({elem: u, handlers: r})
            }
            return t.length > a && s.push({elem: this, handlers: t.slice(a)}), s
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, r, i, s = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || o, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || s === undefined || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
            }
        },
        fix: function (e) {
            if (e[x.expando])return e;
            var t, n, r, i = e.type, o = e, s = this.fixHooks[i];
            s || (this.fixHooks[i] = s = z.test(i) ? this.mouseHooks : I.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new x.Event(o), t = r.length;
            while (t--)n = r[t], e[n] = o[n];
            return 3 === e.target.nodeType && (e.target = e.target.parentNode), s.filter ? s.filter(e, o) : e
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    return this !== V() && this.focus ? (this.focus(), !1) : undefined
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === V() && this.blur ? (this.blur(), !1) : undefined
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return "checkbox" === this.type && this.click && x.nodeName(this, "input") ? (this.click(), !1) : undefined
                }, _default: function (e) {
                    return x.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    e.result !== undefined && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n, r) {
            var i = x.extend(new x.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
            r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, x.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, x.Event = function (e, t) {
        return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? U : Y) : this.type = e, t && x.extend(this, t), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, undefined) : new x.Event(e, t)
    }, x.Event.prototype = {
        isDefaultPrevented: Y,
        isPropagationStopped: Y,
        isImmediatePropagationStopped: Y,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = U, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = U, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = U, this.stopPropagation()
        }
    }, x.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
        x.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n, r = this, i = e.relatedTarget, o = e.handleObj;
                return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), x.support.focusinBubbles || x.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = 0, r = function (e) {
            x.event.simulate(t, e.target, x.event.fix(e), !0)
        };
        x.event.special[t] = {
            setup: function () {
                0 === n++ && o.addEventListener(e, r, !0)
            }, teardown: function () {
                0 === --n && o.removeEventListener(e, r, !0)
            }
        }
    }), x.fn.extend({
        on: function (e, t, n, r, i) {
            var o, s;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = undefined);
                for (s in e)this.on(s, t, n, e[s], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = undefined) : null == r && ("string" == typeof t ? (r = n, n = undefined) : (r = n, n = t, t = undefined)), r === !1) r = Y; else if (!r)return this;
            return 1 === i && (o = r, r = function (e) {
                return x().off(e), o.apply(this, arguments)
            }, r.guid = o.guid || (o.guid = x.guid++)), this.each(function () {
                x.event.add(this, e, r, n, t)
            })
        }, one: function (e, t, n, r) {
            return this.on(e, t, n, r, 1)
        }, off: function (e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)return r = e.handleObj, x(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e)this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = undefined), n === !1 && (n = Y), this.each(function () {
                x.event.remove(this, e, n, t)
            })
        }, trigger: function (e, t) {
            return this.each(function () {
                x.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var n = this[0];
            return n ? x.event.trigger(e, t, n, !0) : undefined
        }
    });
    var G = /^.[^:#\[\.,]*$/, J = x.expr.match.needsContext, Q = {children: !0, contents: !0, next: !0, prev: !0};
    x.fn.extend({
        find: function (e) {
            var t, n, r, i = this.length;
            if ("string" != typeof e)return t = this, this.pushStack(x(e).filter(function () {
                for (r = 0; i > r; r++)if (x.contains(t[r], this))return !0
            }));
            for (n = [], r = 0; i > r; r++)x.find(e, this[r], n);
            return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = (this.selector ? this.selector + " " : "") + e, n
        }, has: function (e) {
            var t = x(e, this), n = t.length;
            return this.filter(function () {
                var e = 0;
                for (; n > e; e++)if (x.contains(this, t[e]))return !0
            })
        }, not: function (e) {
            return this.pushStack(Z(this, e || [], !0))
        }, filter: function (e) {
            return this.pushStack(Z(this, e || [], !1))
        }, is: function (e) {
            return !!e && ("string" == typeof e ? J.test(e) ? x(e, this.context).index(this[0]) >= 0 : x.filter(e, this).length > 0 : this.filter(e).length > 0)
        }, closest: function (e, t) {
            var n, r = 0, i = this.length, o = [], s = J.test(e) || "string" != typeof e ? x(e, t || this.context) : 0;
            for (; i > r; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (11 > n.nodeType && (s ? s.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
                n = o.push(n);
                break
            }
            return this.pushStack(o.length > 1 ? x.unique(o) : o)
        }, index: function (e) {
            return e ? "string" == typeof e ? g.call(x(e), this[0]) : g.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [e] : e), r = x.merge(this.get(), n);
            return this.pushStack(x.unique(r))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    });
    function K(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType);
        return e
    }

    x.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return x.dir(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return x.dir(e, "parentNode", n)
        }, next: function (e) {
            return K(e, "nextSibling")
        }, prev: function (e) {
            return K(e, "previousSibling")
        }, nextAll: function (e) {
            return x.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return x.dir(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return x.dir(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return x.dir(e, "previousSibling", n)
        }, siblings: function (e) {
            return x.sibling((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return x.sibling(e.firstChild)
        }, contents: function (e) {
            return x.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : x.merge([], e.childNodes)
        }
    }, function (e, t) {
        x.fn[e] = function (n, r) {
            var i = x.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (Q[e] || x.unique(i), "p" === e[0] && i.reverse()), this.pushStack(i)
        }
    }), x.extend({
        filter: function (e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function (e) {
                return 1 === e.nodeType
            }))
        }, dir: function (e, t, n) {
            var r = [], i = n !== undefined;
            while ((e = e[t]) && 9 !== e.nodeType)if (1 === e.nodeType) {
                if (i && x(e).is(n))break;
                r.push(e)
            }
            return r
        }, sibling: function (e, t) {
            var n = [];
            for (; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    function Z(e, t, n) {
        if (x.isFunction(t))return x.grep(e, function (e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType)return x.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (G.test(t))return x.filter(t, e, n);
            t = x.filter(t, e)
        }
        return x.grep(e, function (e) {
            return g.call(t, e) >= 0 !== n
        })
    }

    var et = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, tt = /<([\w:]+)/,
        nt = /<|&#?\w+;/, rt = /<(?:script|style|link)/i, it = /^(?:checkbox|radio)$/i,
        ot = /checked\s*(?:[^=]|=\s*.checked.)/i, st = /^$|\/(?:java|ecma)script/i, at = /^true\/(.*)/,
        ut = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, lt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    lt.optgroup = lt.option, lt.tbody = lt.tfoot = lt.colgroup = lt.caption = lt.col = lt.thead, lt.th = lt.td, x.fn.extend({
        text: function (e) {
            return x.access(this, function (e) {
                return e === undefined ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e))
            }, null, e, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = ct(this, e);
                    t.appendChild(e)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = ct(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, remove: function (e, t) {
            var n, r = e ? x.filter(e, this) : this, i = 0;
            for (; null != (n = r[i]); i++)t || 1 !== n.nodeType || x.cleanData(gt(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && ht(gt(n, "script")), n.parentNode.removeChild(n));
            return this
        }, empty: function () {
            var e, t = 0;
            for (; null != (e = this[t]); t++)1 === e.nodeType && (x.cleanData(gt(e, !1)), e.textContent = "");
            return this
        }, clone: function (e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                return x.clone(this, e, t)
            })
        }, html: function (e) {
            return x.access(this, function (e) {
                var t = this[0] || {}, n = 0, r = this.length;
                if (e === undefined && 1 === t.nodeType)return t.innerHTML;
                if ("string" == typeof e && !rt.test(e) && !lt[(tt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(et, "<$1></$2>");
                    try {
                        for (; r > n; n++)t = this[n] || {}, 1 === t.nodeType && (x.cleanData(gt(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = x.map(this, function (e) {
                return [e.nextSibling, e.parentNode]
            }), t = 0;
            return this.domManip(arguments, function (n) {
                var r = e[t++], i = e[t++];
                i && (x(this).remove(), i.insertBefore(n, r))
            }, !0), t ? this : this.remove()
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (e, t, n) {
            e = p.apply([], e);
            var r, i, o, s, a, u, l = 0, c = this.length, f = this, h = c - 1, d = e[0], g = x.isFunction(d);
            if (g || !(1 >= c || "string" != typeof d || x.support.checkClone) && ot.test(d))return this.each(function (r) {
                var i = f.eq(r);
                g && (e[0] = d.call(this, r, i.html())), i.domManip(e, t, n)
            });
            if (c && (r = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = r.firstChild, 1 === r.childNodes.length && (r = i), i)) {
                for (o = x.map(gt(r, "script"), ft), s = o.length; c > l; l++)a = r, l !== h && (a = x.clone(a, !0, !0), s && x.merge(o, gt(a, "script"))), t.call(this[l], a, l);
                if (s)for (u = o[o.length - 1].ownerDocument, x.map(o, pt), l = 0; s > l; l++)a = o[l], st.test(a.type || "") && !q.access(a, "globalEval") && x.contains(u, a) && (a.src ? x._evalUrl(a.src) : x.globalEval(a.textContent.replace(ut, "")))
            }
            return this
        }
    }), x.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        x.fn[e] = function (e) {
            var n, r = [], i = x(e), o = i.length - 1, s = 0;
            for (; o >= s; s++)n = s === o ? this : this.clone(!0), x(i[s])[t](n), h.apply(r, n.get());
            return this.pushStack(r)
        }
    }), x.extend({
        clone: function (e, t, n) {
            var r, i, o, s, a = e.cloneNode(!0), u = x.contains(e.ownerDocument, e);
            if (!(x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e)))for (s = gt(a), o = gt(e), r = 0, i = o.length; i > r; r++)mt(o[r], s[r]);
            if (t)if (n)for (o = o || gt(e), s = s || gt(a), r = 0, i = o.length; i > r; r++)dt(o[r], s[r]); else dt(e, a);
            return s = gt(a, "script"), s.length > 0 && ht(s, !u && gt(e, "script")), a
        }, buildFragment: function (e, t, n, r) {
            var i, o, s, a, u, l, c = 0, f = e.length, p = t.createDocumentFragment(), h = [];
            for (; f > c; c++)if (i = e[c], i || 0 === i)if ("object" === x.type(i)) x.merge(h, i.nodeType ? [i] : i); else if (nt.test(i)) {
                o = o || p.appendChild(t.createElement("div")), s = (tt.exec(i) || ["", ""])[1].toLowerCase(), a = lt[s] || lt._default, o.innerHTML = a[1] + i.replace(et, "<$1></$2>") + a[2], l = a[0];
                while (l--)o = o.firstChild;
                x.merge(h, o.childNodes), o = p.firstChild, o.textContent = ""
            } else h.push(t.createTextNode(i));
            p.textContent = "", c = 0;
            while (i = h[c++])if ((!r || -1 === x.inArray(i, r)) && (u = x.contains(i.ownerDocument, i), o = gt(p.appendChild(i), "script"), u && ht(o), n)) {
                l = 0;
                while (i = o[l++])st.test(i.type || "") && n.push(i)
            }
            return p
        }, cleanData: function (e) {
            var t, n, r, i = e.length, o = 0, s = x.event.special;
            for (; i > o; o++) {
                if (n = e[o], x.acceptData(n) && (t = q.access(n)))for (r in t.events)s[r] ? x.event.remove(n, r) : x.removeEvent(n, r, t.handle);
                L.discard(n), q.discard(n)
            }
        }, _evalUrl: function (e) {
            return x.ajax({url: e, type: "GET", dataType: "text", async: !1, global: !1, success: x.globalEval})
        }
    });
    function ct(e, t) {
        return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function ft(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function pt(e) {
        var t = at.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function ht(e, t) {
        var n = e.length, r = 0;
        for (; n > r; r++)q.set(e[r], "globalEval", !t || q.get(t[r], "globalEval"))
    }

    function dt(e, t) {
        var n, r, i, o, s, a, u, l;
        if (1 === t.nodeType) {
            if (q.hasData(e) && (o = q.access(e), s = x.extend({}, o), l = o.events, q.set(t, s), l)) {
                delete s.handle, s.events = {};
                for (i in l)for (n = 0, r = l[i].length; r > n; n++)x.event.add(t, i, l[i][n])
            }
            L.hasData(e) && (a = L.access(e), u = x.extend({}, a), L.set(t, u))
        }
    }

    function gt(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return t === undefined || t && x.nodeName(e, t) ? x.merge([e], n) : n
    }

    function mt(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && it.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }

    x.fn.extend({
        wrapAll: function (e) {
            var t;
            return x.isFunction(e) ? this.each(function (t) {
                x(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = x(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                var e = this;
                while (e.firstElementChild)e = e.firstElementChild;
                return e
            }).append(this)), this)
        }, wrapInner: function (e) {
            return x.isFunction(e) ? this.each(function (t) {
                x(this).wrapInner(e.call(this, t))
            }) : this.each(function () {
                var t = x(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = x.isFunction(e);
            return this.each(function (n) {
                x(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                x.nodeName(this, "body") || x(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var yt, vt, xt = /^(none|table(?!-c[ea]).+)/, bt = /^margin/, wt = RegExp("^(" + b + ")(.*)$", "i"),
        Tt = RegExp("^(" + b + ")(?!px)[a-z%]+$", "i"), Ct = RegExp("^([+-])=(" + b + ")", "i"), kt = {BODY: "block"},
        Nt = {position: "absolute", visibility: "hidden", display: "block"}, Et = {letterSpacing: 0, fontWeight: 400},
        St = ["Top", "Right", "Bottom", "Left"], jt = ["Webkit", "O", "Moz", "ms"];

    function Dt(e, t) {
        if (t in e)return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = jt.length;
        while (i--)if (t = jt[i] + n, t in e)return t;
        return r
    }

    function At(e, t) {
        return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e)
    }

    function Lt(t) {
        return e.getComputedStyle(t, null)
    }

    function qt(e, t) {
        var n, r, i, o = [], s = 0, a = e.length;
        for (; a > s; s++)r = e[s], r.style && (o[s] = q.get(r, "olddisplay"), n = r.style.display, t ? (o[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && At(r) && (o[s] = q.access(r, "olddisplay", Pt(r.nodeName)))) : o[s] || (i = At(r), (n && "none" !== n || !i) && q.set(r, "olddisplay", i ? n : x.css(r, "display"))));
        for (s = 0; a > s; s++)r = e[s], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[s] || "" : "none"));
        return e
    }

    x.fn.extend({
        css: function (e, t) {
            return x.access(this, function (e, t, n) {
                var r, i, o = {}, s = 0;
                if (x.isArray(t)) {
                    for (r = Lt(e), i = t.length; i > s; s++)o[t[s]] = x.css(e, t[s], !1, r);
                    return o
                }
                return n !== undefined ? x.style(e, t, n) : x.css(e, t)
            }, e, t, arguments.length > 1)
        }, show: function () {
            return qt(this, !0)
        }, hide: function () {
            return qt(this)
        }, toggle: function (e) {
            var t = "boolean" == typeof e;
            return this.each(function () {
                (t ? e : At(this)) ? x(this).show() : x(this).hide()
            })
        }
    }), x.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = yt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": "cssFloat"},
        style: function (e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, s, a = x.camelCase(t), u = e.style;
                return t = x.cssProps[a] || (x.cssProps[a] = Dt(u, a)), s = x.cssHooks[t] || x.cssHooks[a], n === undefined ? s && "get" in s && (i = s.get(e, !1, r)) !== undefined ? i : u[t] : (o = typeof n, "string" === o && (i = Ct.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(x.css(e, t)), o = "number"), null == n || "number" === o && isNaN(n) || ("number" !== o || x.cssNumber[a] || (n += "px"), x.support.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && (n = s.set(e, n, r)) === undefined || (u[t] = n)), undefined)
            }
        },
        css: function (e, t, n, r) {
            var i, o, s, a = x.camelCase(t);
            return t = x.cssProps[a] || (x.cssProps[a] = Dt(e.style, a)), s = x.cssHooks[t] || x.cssHooks[a], s && "get" in s && (i = s.get(e, !0, n)), i === undefined && (i = yt(e, t, r)), "normal" === i && t in Et && (i = Et[t]), "" === n || n ? (o = parseFloat(i), n === !0 || x.isNumeric(o) ? o || 0 : i) : i
        }
    }), yt = function (e, t, n) {
        var r, i, o, s = n || Lt(e), a = s ? s.getPropertyValue(t) || s[t] : undefined, u = e.style;
        return s && ("" !== a || x.contains(e.ownerDocument, e) || (a = x.style(e, t)), Tt.test(a) && bt.test(t) && (r = u.width, i = u.minWidth, o = u.maxWidth, u.minWidth = u.maxWidth = u.width = a, a = s.width, u.width = r, u.minWidth = i, u.maxWidth = o)), a
    };
    function Ht(e, t, n) {
        var r = wt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function Ot(e, t, n, r, i) {
        var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0;
        for (; 4 > o; o += 2)"margin" === n && (s += x.css(e, n + St[o], !0, i)), r ? ("content" === n && (s -= x.css(e, "padding" + St[o], !0, i)), "margin" !== n && (s -= x.css(e, "border" + St[o] + "Width", !0, i))) : (s += x.css(e, "padding" + St[o], !0, i), "padding" !== n && (s += x.css(e, "border" + St[o] + "Width", !0, i)));
        return s
    }

    function Ft(e, t, n) {
        var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = Lt(e),
            s = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = yt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Tt.test(i))return i;
            r = s && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + Ot(e, t, n || (s ? "border" : "content"), r, o) + "px"
    }

    function Pt(e) {
        var t = o, n = kt[e];
        return n || (n = Rt(e, t), "none" !== n && n || (vt = (vt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (vt[0].contentWindow || vt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = Rt(e, t), vt.detach()), kt[e] = n), n
    }

    function Rt(e, t) {
        var n = x(t.createElement(e)).appendTo(t.body), r = x.css(n[0], "display");
        return n.remove(), r
    }

    x.each(["height", "width"], function (e, t) {
        x.cssHooks[t] = {
            get: function (e, n, r) {
                return n ? 0 === e.offsetWidth && xt.test(x.css(e, "display")) ? x.swap(e, Nt, function () {
                    return Ft(e, t, r)
                }) : Ft(e, t, r) : undefined
            }, set: function (e, n, r) {
                var i = r && Lt(e);
                return Ht(e, n, r ? Ot(e, t, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), x(function () {
        x.support.reliableMarginRight || (x.cssHooks.marginRight = {
            get: function (e, t) {
                return t ? x.swap(e, {display: "inline-block"}, yt, [e, "marginRight"]) : undefined
            }
        }), !x.support.pixelPosition && x.fn.position && x.each(["top", "left"], function (e, t) {
            x.cssHooks[t] = {
                get: function (e, n) {
                    return n ? (n = yt(e, t), Tt.test(n) ? x(e).position()[t] + "px" : n) : undefined
                }
            }
        })
    }), x.expr && x.expr.filters && (x.expr.filters.hidden = function (e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight
    }, x.expr.filters.visible = function (e) {
        return !x.expr.filters.hidden(e)
    }), x.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        x.cssHooks[e + t] = {
            expand: function (n) {
                var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n];
                for (; 4 > r; r++)i[e + St[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, bt.test(e) || (x.cssHooks[e + t].set = Ht)
    });
    var Mt = /%20/g, Wt = /\[\]$/, $t = /\r?\n/g, Bt = /^(?:submit|button|image|reset|file)$/i,
        It = /^(?:input|select|textarea|keygen)/i;
    x.fn.extend({
        serialize: function () {
            return x.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = x.prop(this, "elements");
                return e ? x.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !x(this).is(":disabled") && It.test(this.nodeName) && !Bt.test(e) && (this.checked || !it.test(e))
            }).map(function (e, t) {
                var n = x(this).val();
                return null == n ? null : x.isArray(n) ? x.map(n, function (e) {
                    return {name: t.name, value: e.replace($t, "\r\n")}
                }) : {name: t.name, value: n.replace($t, "\r\n")}
            }).get()
        }
    }), x.param = function (e, t) {
        var n, r = [], i = function (e, t) {
            t = x.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (t === undefined && (t = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function () {
            i(this.name, this.value)
        }); else for (n in e)zt(n, e[n], t, i);
        return r.join("&").replace(Mt, "+")
    };
    function zt(e, t, n, r) {
        var i;
        if (x.isArray(t)) x.each(t, function (t, i) {
            n || Wt.test(e) ? r(e, i) : zt(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        }); else if (n || "object" !== x.type(t)) r(e, t); else for (i in t)zt(e + "[" + i + "]", t[i], n, r)
    }

    x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        x.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), x.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }, bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var _t, Xt, Ut = x.now(), Yt = /\?/, Vt = /#.*$/, Gt = /([?&])_=[^&]*/, Jt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Qt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Kt = /^(?:GET|HEAD)$/, Zt = /^\/\//,
        en = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, tn = x.fn.load, nn = {}, rn = {}, on = "*/".concat("*");
    try {
        Xt = i.href
    } catch (sn) {
        Xt = o.createElement("a"), Xt.href = "", Xt = Xt.href
    }
    _t = en.exec(Xt.toLowerCase()) || [];
    function an(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0, o = t.toLowerCase().match(w) || [];
            if (x.isFunction(n))while (r = o[i++])"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function un(e, t, n, r) {
        var i = {}, o = e === rn;

        function s(a) {
            var u;
            return i[a] = !0, x.each(e[a] || [], function (e, a) {
                var l = a(t, n, r);
                return "string" != typeof l || o || i[l] ? o ? !(u = l) : undefined : (t.dataTypes.unshift(l), s(l), !1)
            }), u
        }

        return s(t.dataTypes[0]) || !i["*"] && s("*")
    }

    function ln(e, t) {
        var n, r, i = x.ajaxSettings.flatOptions || {};
        for (n in t)t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && x.extend(!0, e, r), e
    }

    x.fn.load = function (e, t, n) {
        if ("string" != typeof e && tn)return tn.apply(this, arguments);
        var r, i, o, s = this, a = e.indexOf(" ");
        return a >= 0 && (r = e.slice(a), e = e.slice(0, a)), x.isFunction(t) ? (n = t, t = undefined) : t && "object" == typeof t && (i = "POST"), s.length > 0 && x.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t
        }).done(function (e) {
            o = arguments, s.html(r ? x("<div>").append(x.parseHTML(e)).find(r) : e)
        }).complete(n && function (e, t) {
                s.each(n, o || [e.responseText, t, e])
            }), this
    }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        x.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), x.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Xt,
            type: "GET",
            isLocal: Qt.test(_t[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": on,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": x.parseJSON, "text xml": x.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? ln(ln(e, x.ajaxSettings), t) : ln(x.ajaxSettings, e)
        },
        ajaxPrefilter: an(nn),
        ajaxTransport: an(rn),
        ajax: function (e, t) {
            "object" == typeof e && (t = e, e = undefined), t = t || {};
            var n, r, i, o, s, a, u, l, c = x.ajaxSetup({}, t), f = c.context || c,
                p = c.context && (f.nodeType || f.jquery) ? x(f) : x.event, h = x.Deferred(),
                d = x.Callbacks("once memory"), g = c.statusCode || {}, m = {}, y = {}, v = 0, b = "canceled", T = {
                    readyState: 0, getResponseHeader: function (e) {
                        var t;
                        if (2 === v) {
                            if (!o) {
                                o = {};
                                while (t = Jt.exec(i))o[t[1].toLowerCase()] = t[2]
                            }
                            t = o[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    }, getAllResponseHeaders: function () {
                        return 2 === v ? i : null
                    }, setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return v || (e = y[n] = y[n] || e, m[e] = t), this
                    }, overrideMimeType: function (e) {
                        return v || (c.mimeType = e), this
                    }, statusCode: function (e) {
                        var t;
                        if (e)if (2 > v)for (t in e)g[t] = [g[t], e[t]]; else T.always(e[T.status]);
                        return this
                    }, abort: function (e) {
                        var t = e || b;
                        return n && n.abort(t), k(0, t), this
                    }
                };
            if (h.promise(T).complete = d.add, T.success = T.done, T.error = T.fail, c.url = ((e || c.url || Xt) + "").replace(Vt, "").replace(Zt, _t[1] + "//"), c.type = t.method || t.type || c.method || c.type, c.dataTypes = x.trim(c.dataType || "*").toLowerCase().match(w) || [""], null == c.crossDomain && (a = en.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === _t[1] && a[2] === _t[2] && (a[3] || ("http:" === a[1] ? "80" : "443")) === (_t[3] || ("http:" === _t[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = x.param(c.data, c.traditional)), un(nn, c, t, T), 2 === v)return T;
            u = c.global, u && 0 === x.active++ && x.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !Kt.test(c.type), r = c.url, c.hasContent || (c.data && (r = c.url += (Yt.test(r) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = Gt.test(r) ? r.replace(Gt, "$1_=" + Ut++) : r + (Yt.test(r) ? "&" : "?") + "_=" + Ut++)), c.ifModified && (x.lastModified[r] && T.setRequestHeader("If-Modified-Since", x.lastModified[r]), x.etag[r] && T.setRequestHeader("If-None-Match", x.etag[r])), (c.data && c.hasContent && c.contentType !== !1 || t.contentType) && T.setRequestHeader("Content-Type", c.contentType), T.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + on + "; q=0.01" : "") : c.accepts["*"]);
            for (l in c.headers)T.setRequestHeader(l, c.headers[l]);
            if (c.beforeSend && (c.beforeSend.call(f, T, c) === !1 || 2 === v))return T.abort();
            b = "abort";
            for (l in{success: 1, error: 1, complete: 1})T[l](c[l]);
            if (n = un(rn, c, t, T)) {
                T.readyState = 1, u && p.trigger("ajaxSend", [T, c]), c.async && c.timeout > 0 && (s = setTimeout(function () {
                    T.abort("timeout")
                }, c.timeout));
                try {
                    v = 1, n.send(m, k)
                } catch (C) {
                    if (!(2 > v))throw C;
                    k(-1, C)
                }
            } else k(-1, "No Transport");
            function k(e, t, o, a) {
                var l, m, y, b, w, C = t;
                2 !== v && (v = 2, s && clearTimeout(s), n = undefined, i = a || "", T.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, o && (b = cn(c, T, o)), b = fn(c, b, T, l), l ? (c.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (x.lastModified[r] = w), w = T.getResponseHeader("etag"), w && (x.etag[r] = w)), 204 === e ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = b.state, m = b.data, y = b.error, l = !y)) : (y = C, (e || !C) && (C = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (t || C) + "", l ? h.resolveWith(f, [m, C, T]) : h.rejectWith(f, [T, C, y]), T.statusCode(g), g = undefined, u && p.trigger(l ? "ajaxSuccess" : "ajaxError", [T, c, l ? m : y]), d.fireWith(f, [T, C]), u && (p.trigger("ajaxComplete", [T, c]), --x.active || x.event.trigger("ajaxStop")))
            }

            return T
        },
        getJSON: function (e, t, n) {
            return x.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return x.get(e, undefined, t, "script")
        }
    }), x.each(["get", "post"], function (e, t) {
        x[t] = function (e, n, r, i) {
            return x.isFunction(n) && (i = i || r, r = n, n = undefined), x.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    });
    function cn(e, t, n) {
        var r, i, o, s, a = e.contents, u = e.dataTypes;
        while ("*" === u[0])u.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)for (i in a)if (a[i] && a[i].test(r)) {
            u.unshift(i);
            break
        }
        if (u[0] in n) o = u[0]; else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                s || (s = i)
            }
            o = o || s
        }
        return o ? (o !== u[0] && u.unshift(o), n[o]) : undefined
    }

    function fn(e, t, n, r) {
        var i, o, s, a, u, l = {}, c = e.dataTypes.slice();
        if (c[1])for (s in e.converters)l[s.toLowerCase()] = e.converters[s];
        o = c.shift();
        while (o)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())if ("*" === o) o = u; else if ("*" !== u && u !== o) {
            if (s = l[u + " " + o] || l["* " + o], !s)for (i in l)if (a = i.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                s === !0 ? s = l[i] : l[i] !== !0 && (o = a[0], c.unshift(a[1]));
                break
            }
            if (s !== !0)if (s && e["throws"]) t = s(t); else try {
                t = s(t)
            } catch (f) {
                return {state: "parsererror", error: s ? f : "No conversion from " + u + " to " + o}
            }
        }
        return {state: "success", data: t}
    }

    x.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (e) {
                return x.globalEval(e), e
            }
        }
    }), x.ajaxPrefilter("script", function (e) {
        e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), x.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function (r, i) {
                    t = x("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function (e) {
                        t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                    }), o.head.appendChild(t[0])
                }, abort: function () {
                    n && n()
                }
            }
        }
    });
    var pn = [], hn = /(=)\?(?=&|$)|\?\?/;
    x.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = pn.pop() || x.expando + "_" + Ut++;
            return this[e] = !0, e
        }
    }), x.ajaxPrefilter("json jsonp", function (t, n, r) {
        var i, o, s,
            a = t.jsonp !== !1 && (hn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && hn.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = x.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(hn, "$1" + i) : t.jsonp !== !1 && (t.url += (Yt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
            return s || x.error(i + " was not called"), s[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
            s = arguments
        }, r.always(function () {
            e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, pn.push(i)), s && x.isFunction(o) && o(s[0]), s = o = undefined
        }), "script") : undefined
    }), x.ajaxSettings.xhr = function () {
        try {
            return new XMLHttpRequest
        } catch (e) {
        }
    };
    var dn = x.ajaxSettings.xhr(), gn = {0: 200, 1223: 204}, mn = 0, yn = {};
    e.ActiveXObject && x(e).on("unload", function () {
        for (var e in yn)yn[e]();
        yn = undefined
    }), x.support.cors = !!dn && "withCredentials" in dn, x.support.ajax = dn = !!dn, x.ajaxTransport(function (e) {
        var t;
        return x.support.cors || dn && !e.crossDomain ? {
            send: function (n, r) {
                var i, o, s = e.xhr();
                if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (i in e.xhrFields)s[i] = e.xhrFields[i];
                e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n)s.setRequestHeader(i, n[i]);
                t = function (e) {
                    return function () {
                        t && (delete yn[o], t = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? r(s.status || 404, s.statusText) : r(gn[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {text: s.responseText} : undefined, s.getAllResponseHeaders()))
                    }
                }, s.onload = t(), s.onerror = t("error"), t = yn[o = mn++] = t("abort"), s.send(e.hasContent && e.data || null)
            }, abort: function () {
                t && t()
            }
        } : undefined
    });
    var vn, xn, bn = /^(?:toggle|show|hide)$/, wn = RegExp("^(?:([+-])=|)(" + b + ")([a-z%]*)$", "i"),
        Tn = /queueHooks$/, Cn = [Dn], kn = {
            "*": [function (e, t) {
                var n, r, i = this.createTween(e, t), o = wn.exec(t), s = i.cur(), a = +s || 0, u = 1, l = 20;
                if (o) {
                    if (n = +o[2], r = o[3] || (x.cssNumber[e] ? "" : "px"), "px" !== r && a) {
                        a = x.css(i.elem, e, !0) || n || 1;
                        do u = u || ".5", a /= u, x.style(i.elem, e, a + r); while (u !== (u = i.cur() / s) && 1 !== u && --l)
                    }
                    i.unit = r, i.start = a, i.end = o[1] ? a + (o[1] + 1) * n : n
                }
                return i
            }]
        };

    function Nn() {
        return setTimeout(function () {
            vn = undefined
        }), vn = x.now()
    }

    function En(e, t) {
        x.each(t, function (t, n) {
            var r = (kn[t] || []).concat(kn["*"]), i = 0, o = r.length;
            for (; o > i; i++)if (r[i].call(e, t, n))return
        })
    }

    function Sn(e, t, n) {
        var r, i, o = 0, s = Cn.length, a = x.Deferred().always(function () {
            delete u.elem
        }), u = function () {
            if (i)return !1;
            var t = vn || Nn(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r,
                s = 0, u = l.tweens.length;
            for (; u > s; s++)l.tweens[s].run(o);
            return a.notifyWith(e, [l, o, n]), 1 > o && u ? n : (a.resolveWith(e, [l]), !1)
        }, l = a.promise({
            elem: e,
            props: x.extend({}, t),
            opts: x.extend(!0, {specialEasing: {}}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: vn || Nn(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var r = x.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(r), r
            },
            stop: function (t) {
                var n = 0, r = t ? l.tweens.length : 0;
                if (i)return this;
                for (i = !0; r > n; n++)l.tweens[n].run(1);
                return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this
            }
        }), c = l.props;
        for (jn(c, l.opts.specialEasing); s > o; o++)if (r = Cn[o].call(l, e, c, l.opts))return r;
        return En(l, c), x.isFunction(l.opts.start) && l.opts.start.call(e, l), x.fx.timer(x.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function jn(e, t) {
        var n, r, i, o, s;
        for (n in e)if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), s = x.cssHooks[r], s && "expand" in s) {
            o = s.expand(o), delete e[r];
            for (n in o)n in e || (e[n] = o[n], t[n] = i)
        } else t[r] = i
    }

    x.Animation = x.extend(Sn, {
        tweener: function (e, t) {
            x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n, r = 0, i = e.length;
            for (; i > r; r++)n = e[r], kn[n] = kn[n] || [], kn[n].unshift(t)
        }, prefilter: function (e, t) {
            t ? Cn.unshift(e) : Cn.push(e)
        }
    });
    function Dn(e, t, n) {
        var r, i, o, s, a, u, l, c, f, p = this, h = e.style, d = {}, g = [], m = e.nodeType && At(e);
        n.queue || (c = x._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, f = c.empty.fire, c.empty.fire = function () {
            c.unqueued || f()
        }), c.unqueued++, p.always(function () {
            p.always(function () {
                c.unqueued--, x.queue(e, "fx").length || c.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
            h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
        })), a = q.get(e, "fxshow");
        for (r in t)if (o = t[r], bn.exec(o)) {
            if (delete t[r], u = u || "toggle" === o, o === (m ? "hide" : "show")) {
                if ("show" !== o || a === undefined || a[r] === undefined)continue;
                m = !0
            }
            g.push(r)
        }
        if (s = g.length) {
            a = q.get(e, "fxshow") || q.access(e, "fxshow", {}), "hidden" in a && (m = a.hidden), u && (a.hidden = !m), m ? x(e).show() : p.done(function () {
                x(e).hide()
            }), p.done(function () {
                var t;
                q.remove(e, "fxshow");
                for (t in d)x.style(e, t, d[t])
            });
            for (r = 0; s > r; r++)i = g[r], l = p.createTween(i, m ? a[i] : 0), d[i] = a[i] || x.style(e, i), i in a || (a[i] = l.start, m && (l.end = l.start, l.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function An(e, t, n, r, i) {
        return new An.prototype.init(e, t, n, r, i)
    }

    x.Tween = An, An.prototype = {
        constructor: An, init: function (e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = An.propHooks[this.prop];
            return e && e.get ? e.get(this) : An.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = An.propHooks[this.prop];
            return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : An.propHooks._default.set(this), this
        }
    }, An.prototype.init.prototype = An.prototype, An.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            }, set: function (e) {
                x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, An.propHooks.scrollTop = An.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, x.each(["toggle", "show", "hide"], function (e, t) {
        var n = x.fn[t];
        x.fn[t] = function (e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(Ln(t, !0), e, r, i)
        }
    }), x.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(At).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
        }, animate: function (e, t, n, r) {
            var i = x.isEmptyObject(e), o = x.speed(t, n, r), s = function () {
                var t = Sn(this, x.extend({}, e), o);
                s.finish = function () {
                    t.stop(!0)
                }, (i || q.get(this, "finish")) && t.stop(!0)
            };
            return s.finish = s, i || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
        }, stop: function (e, t, n) {
            var r = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, i = null != e && e + "queueHooks", o = x.timers, s = q.get(this);
                if (i) s[i] && s[i].stop && r(s[i]); else for (i in s)s[i] && s[i].stop && Tn.test(i) && r(s[i]);
                for (i = o.length; i--;)o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                (t || !n) && x.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = q.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = x.timers, s = r ? r.length : 0;
                for (n.finish = !0, x.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; s > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    });
    function Ln(e, t) {
        var n, r = {height: e}, i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t)n = St[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    x.each({
        slideDown: Ln("show"),
        slideUp: Ln("hide"),
        slideToggle: Ln("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        x.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), x.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? x.extend({}, e) : {
            complete: n || !n && t || x.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !x.isFunction(t) && t
        };
        return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue)
        }, r
    }, x.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, x.timers = [], x.fx = An.prototype.init, x.fx.tick = function () {
        var e, t = x.timers, n = 0;
        for (vn = x.now(); t.length > n; n++)e = t[n], e() || t[n] !== e || t.splice(n--, 1);
        t.length || x.fx.stop(), vn = undefined
    }, x.fx.timer = function (e) {
        e() && x.timers.push(e) && x.fx.start()
    }, x.fx.interval = 13, x.fx.start = function () {
        xn || (xn = setInterval(x.fx.tick, x.fx.interval))
    }, x.fx.stop = function () {
        clearInterval(xn), xn = null
    }, x.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function (e) {
        return x.grep(x.timers, function (t) {
            return e === t.elem
        }).length
    }), x.fn.offset = function (e) {
        if (arguments.length)return e === undefined ? this : this.each(function (t) {
            x.offset.setOffset(this, e, t)
        });
        var t, n, i = this[0], o = {top: 0, left: 0}, s = i && i.ownerDocument;
        if (s)return t = s.documentElement, x.contains(t, i) ? (typeof i.getBoundingClientRect !== r && (o = i.getBoundingClientRect()), n = qn(s), {
            top: o.top + n.pageYOffset - t.clientTop,
            left: o.left + n.pageXOffset - t.clientLeft
        }) : o
    }, x.offset = {
        setOffset: function (e, t, n) {
            var r, i, o, s, a, u, l, c = x.css(e, "position"), f = x(e), p = {};
            "static" === c && (e.style.position = "relative"), a = f.offset(), o = x.css(e, "top"), u = x.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = f.position(), s = r.top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), x.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (p.top = t.top - a.top + s), null != t.left && (p.left = t.left - a.left + i), "using" in t ? t.using.call(e, p) : f.css(p)
        }
    }, x.fn.extend({
        position: function () {
            if (this[0]) {
                var e, t, n = this[0], r = {top: 0, left: 0};
                return "fixed" === x.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0], "html") || (r = e.offset()), r.top += x.css(e[0], "borderTopWidth", !0), r.left += x.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - r.top - x.css(n, "marginTop", !0),
                    left: t.left - r.left - x.css(n, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                var e = this.offsetParent || s;
                while (e && !x.nodeName(e, "html") && "static" === x.css(e, "position"))e = e.offsetParent;
                return e || s
            })
        }
    }), x.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (t, n) {
        var r = "pageYOffset" === n;
        x.fn[t] = function (i) {
            return x.access(this, function (t, i, o) {
                var s = qn(t);
                return o === undefined ? s ? s[n] : t[i] : (s ? s.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o, undefined)
            }, t, i, arguments.length, null)
        }
    });
    function qn(e) {
        return x.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    x.each({Height: "height", Width: "width"}, function (e, t) {
        x.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
            x.fn[r] = function (r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                    s = n || (r === !0 || i === !0 ? "margin" : "border");
                return x.access(this, function (t, n, r) {
                    var i;
                    return x.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? x.css(t, n, s) : x.style(t, n, r, s)
                }, t, o ? r : undefined, o, null)
            }
        })
    }), x.fn.size = function () {
        return this.length
    }, x.fn.andSelf = x.fn.addBack, "object" == typeof module && "object" == typeof module.exports ? module.exports = x : "function" == typeof define && define.amd && define("jquery", [], function () {
            return x
        }), "object" == typeof e && "object" == typeof e.document && (e.jQuery = e.$ = x)
})(window);
/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function () {
    function a(a) {
        return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y)
    }

    function b(a) {
        return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }

    function c(c, d) {
        function e(a) {
            return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a
        }

        function f(b) {
            var c = m;
            if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function () {
                        return m++, "$line=" + m + ";"
                    })), 0 === b.indexOf("=")) {
                var e = l && !/^=[=#]/.test(b);
                if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
                    var f = b.replace(/\s*\([^\)]+\)/, "");
                    n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")")
                } else b = "$string(" + b + ")";
                b = s[1] + b + s[2]
            }
            return g && (b = "$line=" + c + ";" + b), r(a(b), function (a) {
                if (a && !p[a]) {
                    var b;
                    b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a, w += a + "=" + b + ",", p[a] = !0
                }
            }), b + "\n"
        }

        var g = d.debug, h = d.openTag, i = d.closeTag, j = d.parser, k = d.compress, l = d.escape, m = 1,
            p = {$data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1}, q = "".trim,
            s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
            t = q ? "$out+=text;return $out;" : "$out.push(text);",
            u = "function(){var text=''.concat.apply('',arguments);" + t + "}",
            v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}",
            w = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : ""), x = s[0],
            y = "return new String(" + s[3] + ");";
        r(c.split(h), function (a) {
            a = a.split(i);
            var b = a[0], c = a[1];
            1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)))
        });
        var z = w + x + y;
        g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var A = new Function("$data", "$filename", z);
            return A.prototype = n, A
        } catch (a) {
            throw a.temp = "function anonymous($data,$filename) {" + z + "}", a
        }
    }

    var d = function (a, b) {
        return "string" == typeof b ? q(b, {filename: a}) : g(a, b)
    };
    d.version = "3.0.0", d.config = function (a, b) {
        e[a] = b
    };
    var e = d.defaults = {openTag: "<%", closeTag: "%>", escape: !0, cache: !0, compress: !1, parser: null},
        f = d.cache = {};
    d.render = function (a, b) {
        return q(a)(b)
    };
    var g = d.renderFile = function (a, b) {
        var c = d.get(a) || p({filename: a, name: "Render Error", message: "Template not found"});
        return b ? c(b) : c
    };
    d.get = function (a) {
        var b;
        if (f[a]) b = f[a]; else if ("object" == typeof document) {
            var c = document.getElementById(a);
            if (c) {
                var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");
                b = q(d, {filename: a})
            }
        }
        return b
    };
    var h = function (a, b) {
        return "string" != typeof a && (b = typeof a, "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a
    }, i = {"<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;"}, j = function (a) {
        return i[a]
    }, k = function (a) {
        return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j)
    }, l = Array.isArray || function (a) {
            return "[object Array]" === {}.toString.call(a)
        }, m = function (a, b) {
        var c, d;
        if (l(a))for (c = 0, d = a.length; c < d; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
    }, n = d.utils = {$helpers: {}, $include: g, $string: h, $escape: k, $each: m};
    d.helper = function (a, b) {
        o[a] = b
    };
    var o = d.helpers = n.$helpers;
    d.onerror = function (a) {
        var b = "Template Error\n\n";
        for (var c in a)b += "<" + c + ">\n" + a[c] + "\n\n";
        "object" == typeof console && console.error(b)
    };
    var p = function (a) {
            return d.onerror(a), function () {
                return "{Template Error}"
            }
        }, q = d.compile = function (a, b) {
            function d(c) {
                try {
                    return new i(c, h) + ""
                } catch (d) {
                    return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c))
                }
            }

            b = b || {};
            for (var g in e)void 0 === b[g] && (b[g] = e[g]);
            var h = b.filename;
            try {
                var i = c(a, b)
            } catch (a) {
                return a.filename = h || "anonymous", a.name = "Syntax Error", p(a)
            }
            return d.prototype = i.prototype, d.toString = function () {
                return i.toString()
            }, h && b.cache && (f[h] = d), d
        }, r = n.$each,
        s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
        t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
        u = /[^\w$]+/g, v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
        w = /^\d[^,]*|,\d[^,]*/g, x = /^,+|,+$/g, y = /^$|,+/;
    e.openTag = "@@", e.closeTag = "$$";
    var z = function (a, b) {
        var c = b.split(":"), d = c.shift(), e = c.join(":") || "";
        return e && (e = ", " + e), "$helpers." + d + "(" + a + e + ")"
    };
    e.parser = function (a, b) {
        a = a.replace(/^\s/, "");
        var c = a.split(" "), e = c.shift(), f = c.join(" ");
        switch (e) {
            case"if":
                a = "if(" + f + "){";
                break;
            case"else":
                c = "if" === c.shift() ? " if(" + c.join(" ") + ")" : "", a = "}else" + c + "{";
                break;
            case"/if":
                a = "}";
                break;
            case"each":
                var g = c[0] || "$data", h = c[1] || "as", i = c[2] || "$value", j = c[3] || "$index", k = i + "," + j;
                "as" !== h && (g = "[]"), a = "$each(" + g + ",function(" + k + "){";
                break;
            case"/each":
                a = "});";
                break;
            case"echo":
                a = "print(" + f + ");";
                break;
            case"print":
            case"include":
                a = e + "(" + c.join(",") + ");";
                break;
            default:
                if (/^\s*\|\s*[\w\$]/.test(f)) {
                    var l = !0;
                    0 === a.indexOf("#") && (a = a.substr(1), l = !1);
                    for (var m = 0, n = a.split("|"), o = n.length, p = n[m++]; m < o; m++)p = z(p, n[m]);
                    a = (l ? "=" : "=#") + p
                } else a = d.helpers[e] ? "=#" + e + "(" + c.join(",") + ");" : "=" + a
        }
        return a
    }, "object" == typeof exports && "undefined" != typeof module ? module.exports = d : "function" == typeof define ? define(function () {
        return d
    }) : this.template = d
}();
/*! LazyLoadImg */
!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.LazyLoadImg = e()
}(this, function () {
    "use strict";
    var t = function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = t.getBoundingClientRect(),
            n = t.offsetWidth, i = t.offsetHeight, r = window.innerWidth, a = window.innerHeight,
            s = !(o.right - e.left <= 0 && o.left + n - e.left <= 0 || o.left + e.right >= r && o.right + e.right >= n + r),
            c = !(o.bottom - e.top <= 0 && o.top + i - e.top <= 0 || o.top + e.bottom >= a && o.bottom + e.bottom >= i + a);
        return 0 !== t.width && 0 !== t.height && s && c
    }, e = document.createElement("canvas");
    e.getContext("2d").globalAlpha = 0;
    var o = {}, n = function (t, n, i) {
        if (o[t])return o[t];
        e.width = n, e.height = i;
        var r = e.toDataURL("image/png");
        return o[t] = r, r
    }, i = function (t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }, r = function () {
        function t(t, e) {
            for (var o = 0; o < e.length; o++) {
                var n = e[o];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }
        }

        return function (e, o, n) {
            return o && t(e.prototype, o), n && t(e, n), e
        }
    }(), a = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var o = arguments[e];
                for (var n in o)Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n])
            }
            return t
        }, s = window, c = function () {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            i(this, e), this.options = {
                el: document.querySelector("body"),
                mode: "default",
                time: 300,
                done: !0,
                diy: {backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center"},
                position: {top: 0, right: 0, bottom: 0, left: 0},
                before: function (t) {
                },
                success: function (t) {
                },
                error: function (t) {
                }
            }, t.position = a({}, this.options.position, t.position), t.diy = a({}, this.options.diy, t.diy), a(this.options, t), this._timer = !0, this.start()
        }

        return r(e, [{
            key: "start", value: function () {
                var e = this, o = this.options;
                clearTimeout(this._timer), this._timer && (this._timer = setTimeout(function () {
                    var n = Array.prototype.slice.apply(o.el.querySelectorAll("[data-src]"));
                    !n.length && o.done ? clearTimeout(e._timer) : n.forEach(function (n) {
                        !n.dataset.LazyLoadImgState && t(n, o.position) && e.loadImg(n)
                    }), e.start()
                }, o.time))
            }
        }, {
            key: "loadImg", value: function (t) {
                var e = this, o = this.options;
                t.dataset.LazyLoadImgState = "start", o.before.call(this, t);
                var i = new s.Image;
                i.src = t.dataset.src, i.addEventListener("load", function () {
                    return "diy" === o.mode ? (t.src = n(t.src, t.width, t.height), o.diy.backgroundImage = "url(" + i.src + ")", a(t.style, o.diy)) : t.src = i.src, delete t.dataset.src, t.dataset.LazyLoadImgState = "success", o.success.call(e, t)
                }, !1), i.addEventListener("error", function () {
                    delete t.dataset.src, t.dataset.LazyLoadImgState = "error", o.error.call(e, t)
                }, !1)
            }
        }, {
            key: "destroy", value: function () {
                delete this._timer
            }
        }]), e
    }();
    return c
});
/*Swipe*/
window.ecWap || (window.ecWap = {});
!function () {
    "use strict";
    function e(e) {
        e.fn.swiper = function (a) {
            var r;
            return e(this).each(function () {
                var e = new t(this, a);
                r || (r = e)
            }), r
        }
    }

    var a, t = function (e, i) {
        function s(e) {
            return Math.floor(e)
        }

        function n() {
            b.autoplayTimeoutId = setTimeout(function () {
                b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? i.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b))
            }, b.params.autoplay)
        }

        function o(e, t) {
            var r = a(e.target);
            if (!r.is(t))if ("string" == typeof t) r = r.parents(t); else if (t.nodeType) {
                var i;
                return r.parents().each(function (e, a) {
                    a === t && (i = t)
                }), i ? t : void 0
            }
            if (0 !== r.length)return r[0]
        }

        function l(e, a) {
            a = a || {};
            var t = window.MutationObserver || window.WebkitMutationObserver, r = new t(function (e) {
                e.forEach(function (e) {
                    b.onResize(!0), b.emit("onObserverUpdate", b, e)
                })
            });
            r.observe(e, {
                attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
                childList: "undefined" == typeof a.childList ? !0 : a.childList,
                characterData: "undefined" == typeof a.characterData ? !0 : a.characterData
            }), b.observers.push(r)
        }

        function p(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === a || !b.isHorizontal() && 40 === a))return !1;
            if (!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === a || !b.isHorizontal() && 38 === a))return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (b.container.parents(".swiper-slide").length > 0 && 0 === b.container.parents(".swiper-slide-active").length)return;
                    var r = {left: window.pageXOffset, top: window.pageYOffset}, i = window.innerWidth,
                        s = window.innerHeight, n = b.container.offset();
                    b.rtl && (n.left = n.left - b.container[0].scrollLeft);
                    for (var o = [[n.left, n.top], [n.left + b.width, n.top], [n.left, n.top + b.height], [n.left + b.width, n.top + b.height]], l = 0; l < o.length; l++) {
                        var p = o[l];
                        p[0] >= r.left && p[0] <= r.left + i && p[1] >= r.top && p[1] <= r.top + s && (t = !0)
                    }
                    if (!t)return
                }
                b.isHorizontal() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !b.rtl || 37 === a && b.rtl) && b.slideNext(), (37 === a && !b.rtl || 39 === a && b.rtl) && b.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && b.slideNext(), 38 === a && b.slidePrev())
            }
        }

        function d(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = b.mousewheel.event, t = 0, r = b.rtl ? -1 : 1;
            if ("mousewheel" === a)if (b.params.mousewheelForceToAxis)if (b.isHorizontal()) {
                if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)))return;
                t = e.wheelDeltaX * r
            } else {
                if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)))return;
                t = e.wheelDeltaY
            } else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * r : -e.wheelDeltaY; else if ("DOMMouseScroll" === a) t = -e.detail; else if ("wheel" === a)if (b.params.mousewheelForceToAxis)if (b.isHorizontal()) {
                if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY)))return;
                t = -e.deltaX * r
            } else {
                if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX)))return;
                t = -e.deltaY
            } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * r : -e.deltaY;
            if (0 !== t) {
                if (b.params.mousewheelInvert && (t = -t), b.params.freeMode) {
                    var i = b.getWrapperTranslate() + t * b.params.mousewheelSensitivity, s = b.isBeginning,
                        n = b.isEnd;
                    if (i >= b.minTranslate() && (i = b.minTranslate()), i <= b.maxTranslate() && (i = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(i), b.updateProgress(), b.updateActiveIndex(), (!s && b.isBeginning || !n && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function () {
                            b.slideReset()
                        }, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), 0 === i || i === b.maxTranslate())return
                } else {
                    if ((new window.Date).getTime() - b.mousewheel.lastScrollTime > 60)if (0 > t)if (b.isEnd && !b.params.loop || b.animating) {
                        if (b.params.mousewheelReleaseOnEdges)return !0
                    } else b.slideNext(); else if (b.isBeginning && !b.params.loop || b.animating) {
                        if (b.params.mousewheelReleaseOnEdges)return !0
                    } else b.slidePrev();
                    b.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return b.params.autoplay && b.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }
        }

        function u(e, t) {
            e = a(e);
            var r, i, s, n = b.rtl ? -1 : 1;
            r = e.attr("data-swiper-parallax") || "0", i = e.attr("data-swiper-parallax-x"), s = e.attr("data-swiper-parallax-y"), i || s ? (i = i || "0", s = s || "0") : b.isHorizontal() ? (i = r, s = "0") : (s = r, i = "0"), i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t * n + "%" : i * t * n + "px", s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t + "%" : s * t + "px", e.transform("translate3d(" + i + ", " + s + ",0px)")
        }

        function c(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }

        if (!(this instanceof t))return new t(e, i);
        var m = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0},
            flip: {slideShadows: !0, limitRotation: !0},
            cube: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94},
            fade: {crossFade: !1},
            parallax: !1,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            hashnav: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationCurrentClass: "swiper-pagination-current",
            paginationTotalClass: "swiper-pagination-total",
            paginationHiddenClass: "swiper-pagination-hidden",
            paginationProgressbarClass: "swiper-pagination-progressbar",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        }, h = i && i.virtualTranslate;
        i = i || {};
        var f = {};
        for (var g in i)if ("object" != typeof i[g] || null === i[g] || (i[g].nodeType || i[g] === window || i[g] === document || "undefined" != typeof r && i[g] instanceof r || "undefined" != typeof jQuery && i[g] instanceof jQuery)) f[g] = i[g]; else {
            f[g] = {};
            for (var v in i[g])f[g][v] = i[g][v]
        }
        for (var w in m)if ("undefined" == typeof i[w]) i[w] = m[w]; else if ("object" == typeof i[w])for (var y in m[w])"undefined" == typeof i[w][y] && (i[w][y] = m[w][y]);
        var b = this;
        if (b.params = i, b.originalParams = f, b.classNames = [], "undefined" != typeof a && "undefined" != typeof r && (a = r), ("undefined" != typeof a || (a = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r)) && (b.$ = a, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function () {
                if (!b.params.breakpoints)return !1;
                var e, a = !1, t = [];
                for (e in b.params.breakpoints)b.params.breakpoints.hasOwnProperty(e) && t.push(e);
                t.sort(function (e, a) {
                    return parseInt(e, 10) > parseInt(a, 10)
                });
                for (var r = 0; r < t.length; r++)e = t[r], e >= window.innerWidth && !a && (a = e);
                return a || "max"
            }, b.setBreakpoint = function () {
                var e = b.getActiveBreakpoint();
                if (e && b.currentBreakpoint !== e) {
                    var a = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
                        t = b.params.loop && a.slidesPerView !== b.params.slidesPerView;
                    for (var r in a)b.params[r] = a[r];
                    b.currentBreakpoint = e, t && b.destroyLoop && b.reLoop(!0)
                }
            }, b.params.breakpoints && b.setBreakpoint(), b.container = a(e), 0 !== b.container.length)) {
            if (b.container.length > 1) {
                var x = [];
                return b.container.each(function () {
                    x.push(new t(this, i))
                }), x
            }
            b.container[0].swiper = b, b.container.data("swiper", b), b.classNames.push("swiper-container-" + b.params.direction), b.params.freeMode && b.classNames.push("swiper-container-free-mode"), b.support.flexbox || (b.classNames.push("swiper-container-no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push("swiper-container-autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(b.params.effect) >= 0 && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push("swiper-container-3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push("swiper-container-" + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1), ("fade" === b.params.effect || "flip" === b.params.effect) && (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, "undefined" == typeof h && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = a(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && b.paginationContainer.length > 1 && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass("swiper-pagination-clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass("swiper-pagination-" + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = a(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && b.nextButton.length > 1 && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = a(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && b.prevButton.length > 1 && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function () {
                return "horizontal" === b.params.direction
            }, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push("swiper-container-rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), b.params.slidesPerColumn > 1 && b.classNames.push("swiper-container-multirow"), b.device.android && b.classNames.push("swiper-container-android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function () {
                b.params.allowSwipeToNext = !1
            }, b.lockSwipeToPrev = function () {
                b.params.allowSwipeToPrev = !1
            }, b.lockSwipes = function () {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1
            }, b.unlockSwipeToNext = function () {
                b.params.allowSwipeToNext = !0
            }, b.unlockSwipeToPrev = function () {
                b.params.allowSwipeToPrev = !0
            }, b.unlockSwipes = function () {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0
            }, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab"), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function (e, a, t, r, i) {
                function s() {
                    i && i()
                }

                var n;
                e.complete && r ? s() : a ? (n = new window.Image, n.onload = s, n.onerror = s, t && (n.srcset = t), a && (n.src = a)) : s()
            }, b.preloadImages = function () {
                function e() {
                    "undefined" != typeof b && null !== b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)))
                }

                b.imagesToLoad = b.container.find("img");
                for (var a = 0; a < b.imagesToLoad.length; a++)b.loadImage(b.imagesToLoad[a], b.imagesToLoad[a].currentSrc || b.imagesToLoad[a].getAttribute("src"), b.imagesToLoad[a].srcset || b.imagesToLoad[a].getAttribute("srcset"), !0, e)
            }, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function () {
                return "undefined" != typeof b.autoplayTimeoutId ? !1 : b.params.autoplay ? b.autoplaying ? !1 : (b.autoplaying = !0, b.emit("onAutoplayStart", b), void n()) : !1
            }, b.stopAutoplay = function (e) {
                b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b))
            }, b.pauseAutoplay = function (e) {
                b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, n()) : b.wrapper.transitionEnd(function () {
                    b && (b.autoplayPaused = !1, b.autoplaying ? n() : b.stopAutoplay())
                }))
            }, b.minTranslate = function () {
                return -b.snapGrid[0]
            }, b.maxTranslate = function () {
                return -b.snapGrid[b.snapGrid.length - 1]
            }, b.updateAutoHeight = function () {
                var e = b.slides.eq(b.activeIndex)[0];
                if ("undefined" != typeof e) {
                    var a = e.offsetHeight;
                    a && b.wrapper.css("height", a + "px")
                }
            }, b.updateContainerSize = function () {
                var e, a;
                e = "undefined" != typeof b.params.width ? b.params.width : b.container[0].clientWidth, a = "undefined" != typeof b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === a && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), a = a - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = a, b.size = b.isHorizontal() ? b.width : b.height)
            }, b.updateSlidesSize = function () {
                b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];
                var e, a = b.params.spaceBetween, t = -b.params.slidesOffsetBefore, r = 0, i = 0;
                if ("undefined" != typeof b.size) {
                    "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * b.size), b.virtualSize = -a, b.rtl ? b.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : b.slides.css({marginRight: "", marginBottom: ""});
                    var n;
                    b.params.slidesPerColumn > 1 && (n = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (n = Math.max(n, b.params.slidesPerView * b.params.slidesPerColumn)));
                    var o, l = b.params.slidesPerColumn, p = n / l,
                        d = p - (b.params.slidesPerColumn * p - b.slides.length);
                    for (e = 0; e < b.slides.length; e++) {
                        o = 0;
                        var u = b.slides.eq(e);
                        if (b.params.slidesPerColumn > 1) {
                            var c, m, h;
                            "column" === b.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > d || m === d && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * n / l, u.css({
                                "-webkit-box-ordinal-group": c,
                                "-moz-box-ordinal-group": c,
                                "-ms-flex-order": c,
                                "-webkit-order": c,
                                order: c
                            })) : (h = Math.floor(e / p), m = e - h * p), u.css({"margin-top": 0 !== h && b.params.spaceBetween && b.params.spaceBetween + "px"}).attr("data-swiper-column", m).attr("data-swiper-row", h)
                        }
                        "none" !== u.css("display") && ("auto" === b.params.slidesPerView ? (o = b.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), b.params.roundLengths && (o = s(o))) : (o = (b.size - (b.params.slidesPerView - 1) * a) / b.params.slidesPerView, b.params.roundLengths && (o = s(o)), b.isHorizontal() ? b.slides[e].style.width = o + "px" : b.slides[e].style.height = o + "px"), b.slides[e].swiperSlideSize = o, b.slidesSizesGrid.push(o), b.params.centeredSlides ? (t = t + o / 2 + r / 2 + a, 0 === e && (t = t - b.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t)) : (i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t), t = t + o + a), b.virtualSize += o + a, r = o, i++)
                    }
                    b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;
                    var f;
                    if (b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}), (!b.support.flexbox || b.params.setWrapperSize) && (b.isHorizontal() ? b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}) : b.wrapper.css({height: b.virtualSize + b.params.spaceBetween + "px"})), b.params.slidesPerColumn > 1 && (b.virtualSize = (o + b.params.spaceBetween) * n, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}), b.params.centeredSlides)) {
                        for (f = [], e = 0; e < b.snapGrid.length; e++)b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && f.push(b.snapGrid[e]);
                        b.snapGrid = f
                    }
                    if (!b.params.centeredSlides) {
                        for (f = [], e = 0; e < b.snapGrid.length; e++)b.snapGrid[e] <= b.virtualSize - b.size && f.push(b.snapGrid[e]);
                        b.snapGrid = f, Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) > 1 && b.snapGrid.push(b.virtualSize - b.size)
                    }
                    0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({marginLeft: a + "px"}) : b.slides.css({marginRight: a + "px"}) : b.slides.css({marginBottom: a + "px"})), b.params.watchSlidesProgress && b.updateSlidesOffset()
                }
            }, b.updateSlidesOffset = function () {
                for (var e = 0; e < b.slides.length; e++)b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop
            }, b.updateSlidesProgress = function (e) {
                if ("undefined" == typeof e && (e = b.translate || 0), 0 !== b.slides.length) {
                    "undefined" == typeof b.slides[0].swiperSlideOffset && b.updateSlidesOffset();
                    var a = -e;
                    b.rtl && (a = e), b.slides.removeClass(b.params.slideVisibleClass);
                    for (var t = 0; t < b.slides.length; t++) {
                        var r = b.slides[t],
                            i = (a - r.swiperSlideOffset) / (r.swiperSlideSize + b.params.spaceBetween);
                        if (b.params.watchSlidesVisibility) {
                            var s = -(a - r.swiperSlideOffset), n = s + b.slidesSizesGrid[t],
                                o = s >= 0 && s < b.size || n > 0 && n <= b.size || 0 >= s && n >= b.size;
                            o && b.slides.eq(t).addClass(b.params.slideVisibleClass)
                        }
                        r.progress = b.rtl ? -i : i
                    }
                }
            }, b.updateProgress = function (e) {
                "undefined" == typeof e && (e = b.translate || 0);
                var a = b.maxTranslate() - b.minTranslate(), t = b.isBeginning, r = b.isEnd;
                0 === a ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / a, b.isBeginning = b.progress <= 0, b.isEnd = b.progress >= 1), b.isBeginning && !t && b.emit("onReachBeginning", b), b.isEnd && !r && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress)
            }, b.updateActiveIndex = function () {
                var e, a, t, r = b.rtl ? b.translate : -b.translate;
                for (a = 0; a < b.slidesGrid.length; a++)"undefined" != typeof b.slidesGrid[a + 1] ? r >= b.slidesGrid[a] && r < b.slidesGrid[a + 1] - (b.slidesGrid[a + 1] - b.slidesGrid[a]) / 2 ? e = a : r >= b.slidesGrid[a] && r < b.slidesGrid[a + 1] && (e = a + 1) : r >= b.slidesGrid[a] && (e = a);
                (0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / b.params.slidesPerGroup), t >= b.snapGrid.length && (t = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = t, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses())
            }, b.updateClasses = function () {
                b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass);
                var e = b.slides.eq(b.activeIndex);
                e.addClass(b.params.slideActiveClass);
                var t = e.next("." + b.params.slideClass).addClass(b.params.slideNextClass);
                b.params.loop && 0 === t.length && b.slides.eq(0).addClass(b.params.slideNextClass);
                var r = e.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);
                if (b.params.loop && 0 === r.length && b.slides.eq(-1).addClass(b.params.slidePrevClass), b.paginationContainer && b.paginationContainer.length > 0) {
                    var i,
                        s = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;
                    if (b.params.loop ? (i = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup), i > b.slides.length - 1 - 2 * b.loopedSlides && (i -= b.slides.length - 2 * b.loopedSlides), i > s - 1 && (i -= s), 0 > i && "bullets" !== b.params.paginationType && (i = s + i)) : i = "undefined" != typeof b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && b.bullets.length > 0 && (b.bullets.removeClass(b.params.bulletActiveClass), b.paginationContainer.length > 1 ? b.bullets.each(function () {
                            a(this).index() === i && a(this).addClass(b.params.bulletActiveClass)
                        }) : b.bullets.eq(i).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(i + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(s)), "progress" === b.params.paginationType) {
                        var n = (i + 1) / s, o = n, l = 1;
                        b.isHorizontal() || (l = n, o = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")").transition(b.params.speed)
                    }
                    "custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, i + 1, s)), b.emit("onPaginationRendered", b, b.paginationContainer[0]))
                }
                b.params.loop || (b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))))
            }, b.updatePagination = function () {
                if (b.params.pagination && b.paginationContainer && b.paginationContainer.length > 0) {
                    var e = "";
                    if ("bullets" === b.params.paginationType) {
                        for (var a = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, t = 0; a > t; t++)e += b.params.paginationBulletRender ? b.params.paginationBulletRender(t, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
                        b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination()
                    }
                    "fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0])
                }
            }, b.update = function (e) {
                function a() {
                    r = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(r), b.updateActiveIndex(), b.updateClasses()
                }

                if (b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e) {
                    var t, r;
                    b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (a(), b.params.autoHeight && b.updateAutoHeight()) : (t = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0), t || a())
                } else b.params.autoHeight && b.updateAutoHeight()
            }, b.onResize = function (e) {
                b.params.breakpoints && b.setBreakpoint();
                var a = b.params.allowSwipeToPrev, t = b.params.allowSwipeToNext;
                b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);
                var r = !1;
                if (b.params.freeMode) {
                    var i = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
                    b.setWrapperTranslate(i), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight()
                } else b.updateClasses(), r = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);
                b.params.lazyLoading && !r && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = a, b.params.allowSwipeToNext = t
            };
            var T = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? T = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (T = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), b.touchEvents = {
                start: b.support.touch || !b.params.simulateTouch ? "touchstart" : T[0],
                move: b.support.touch || !b.params.simulateTouch ? "touchmove" : T[1],
                end: b.support.touch || !b.params.simulateTouch ? "touchend" : T[2]
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function (e) {
                var a = e ? "off" : "on", t = e ? "removeEventListener" : "addEventListener",
                    r = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
                    s = b.support.touch ? r : document, n = b.params.nested ? !0 : !1;
                b.browser.ie ? (r[t](b.touchEvents.start, b.onTouchStart, !1), s[t](b.touchEvents.move, b.onTouchMove, n), s[t](b.touchEvents.end, b.onTouchEnd, !1)) : (b.support.touch && (r[t](b.touchEvents.start, b.onTouchStart, !1), r[t](b.touchEvents.move, b.onTouchMove, n), r[t](b.touchEvents.end, b.onTouchEnd, !1)), !i.simulateTouch || b.device.ios || b.device.android || (r[t]("mousedown", b.onTouchStart, !1), document[t]("mousemove", b.onTouchMove, n), document[t]("mouseup", b.onTouchEnd, !1))), window[t]("resize", b.onResize), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.nextButton[a]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[a]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.prevButton[a]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[a]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[a]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[a]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && r[t]("click", b.preventClicks, !0)
            }, b.attachEvents = function () {
                b.initEvents()
            }, b.detachEvents = function () {
                b.initEvents(!0)
            }, b.allowClick = !0, b.preventClicks = function (e) {
                b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, b.onClickNext = function (e) {
                e.preventDefault(), (!b.isEnd || b.params.loop) && b.slideNext()
            }, b.onClickPrev = function (e) {
                e.preventDefault(), (!b.isBeginning || b.params.loop) && b.slidePrev()
            }, b.onClickIndex = function (e) {
                e.preventDefault();
                var t = a(this).index() * b.params.slidesPerGroup;
                b.params.loop && (t += b.loopedSlides), b.slideTo(t)
            }, b.updateClickedSlide = function (e) {
                var t = o(e, "." + b.params.slideClass), r = !1;
                if (t)for (var i = 0; i < b.slides.length; i++)b.slides[i] === t && (r = !0);
                if (!t || !r)return b.clickedSlide = void 0, void(b.clickedIndex = void 0);
                if (b.clickedSlide = t, b.clickedIndex = a(t).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
                    var s, n = b.clickedIndex;
                    if (b.params.loop) {
                        if (b.animating)return;
                        s = a(b.clickedSlide).attr("data-swiper-slide-index"), b.params.centeredSlides ? n < b.loopedSlides - b.params.slidesPerView / 2 || n > b.slides.length - b.loopedSlides + b.params.slidesPerView / 2 ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                            b.slideTo(n)
                        }, 0)) : b.slideTo(n) : n > b.slides.length - b.params.slidesPerView ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                            b.slideTo(n)
                        }, 0)) : b.slideTo(n)
                    } else b.slideTo(n)
                }
            };
            var S, C, z, M, E, P, k, I, L, B, D = "input, select, textarea, button", H = Date.now(), A = [];
            b.animating = !1, b.touches = {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0};
            var G, O;
            if (b.onTouchStart = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), G = "touchstart" === e.type, G || !("which" in e) || 3 !== e.which) {
                        if (b.params.noSwiping && o(e, "." + b.params.noSwipingClass))return void(b.allowClick = !0);
                        if (!b.params.swipeHandler || o(e, b.params.swipeHandler)) {
                            var t = b.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                                r = b.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                            if (!(b.device.ios && b.params.iOSEdgeSwipeDetection && t <= b.params.iOSEdgeSwipeThreshold)) {
                                if (S = !0, C = !1, z = !0, E = void 0, O = void 0, b.touches.startX = t, b.touches.startY = r, M = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, b.params.threshold > 0 && (I = !1), "touchstart" !== e.type) {
                                    var i = !0;
                                    a(e.target).is(D) && (i = !1), document.activeElement && a(document.activeElement).is(D) && document.activeElement.blur(), i && e.preventDefault()
                                }
                                b.emit("onTouchStart", b, e)
                            }
                        }
                    }
                }, b.onTouchMove = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), !G || "mousemove" !== e.type) {
                        if (e.preventedByNestedSwiper)return b.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(b.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
                        if (b.params.onlyExternal)return b.allowClick = !1, void(S && (b.touches.startX = b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.startY = b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, M = Date.now()));
                        if (G && document.activeElement && e.target === document.activeElement && a(e.target).is(D))return C = !0, void(b.allowClick = !1);
                        if (z && b.emit("onTouchMove", b, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof E) {
                                var t = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI;
                                E = b.isHorizontal() ? t > b.params.touchAngle : 90 - t > b.params.touchAngle
                            }
                            if (E && b.emit("onTouchMoveOpposite", b, e), "undefined" == typeof O && b.browser.ieTouch && (b.touches.currentX !== b.touches.startX || b.touches.currentY !== b.touches.startY) && (O = !0), S) {
                                if (E)return void(S = !1);
                                if (O || !b.browser.ieTouch) {
                                    b.allowClick = !1, b.emit("onSliderMove", b, e), e.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && e.stopPropagation(), C || (i.loop && b.fixLoop(), k = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), B = !1, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grabbing", b.container[0].style.cursor = "-moz-grabbin", b.container[0].style.cursor = "grabbing")), C = !0;
                                    var r = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
                                    r *= b.params.touchRatio, b.rtl && (r = -r), b.swipeDirection = r > 0 ? "prev" : "next", P = r + k;
                                    var s = !0;
                                    if (r > 0 && P > b.minTranslate() ? (s = !1, b.params.resistance && (P = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + k + r, b.params.resistanceRatio))) : 0 > r && P < b.maxTranslate() && (s = !1, b.params.resistance && (P = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - k - r, b.params.resistanceRatio))),
                                        s && (e.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && k > P && (P = k), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && P > k && (P = k), b.params.followFinger) {
                                        if (b.params.threshold > 0) {
                                            if (!(Math.abs(r) > b.params.threshold || I))return void(P = k);
                                            if (!I)return I = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, P = k, void(b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY)
                                        }
                                        (b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === A.length && A.push({
                                            position: b.touches[b.isHorizontal() ? "startX" : "startY"],
                                            time: M
                                        }), A.push({
                                            position: b.touches[b.isHorizontal() ? "currentX" : "currentY"],
                                            time: (new window.Date).getTime()
                                        })), b.updateProgress(P), b.setWrapperTranslate(P)
                                    }
                                }
                            }
                        }
                    }
                }, b.onTouchEnd = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), z && b.emit("onTouchEnd", b, e), z = !1, S) {
                        b.params.grabCursor && C && S && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab");
                        var t = Date.now(), r = t - M;
                        if (b.allowClick && (b.updateClickedSlide(e), b.emit("onTap", b, e), 300 > r && t - H > 300 && (L && clearTimeout(L), L = setTimeout(function () {
                                b && (b.params.paginationHide && b.paginationContainer.length > 0 && !a(e.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, e))
                            }, 300)), 300 > r && 300 > t - H && (L && clearTimeout(L), b.emit("onDoubleTap", b, e))), H = Date.now(), setTimeout(function () {
                                b && (b.allowClick = !0)
                            }, 0), !S || !C || !b.swipeDirection || 0 === b.touches.diff || P === k)return void(S = C = !1);
                        S = C = !1;
                        var i;
                        if (i = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -P, b.params.freeMode) {
                            if (i < -b.minTranslate())return void b.slideTo(b.activeIndex);
                            if (i > -b.maxTranslate())return void(b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));
                            if (b.params.freeModeMomentum) {
                                if (A.length > 1) {
                                    var s = A.pop(), n = A.pop(), o = s.position - n.position, l = s.time - n.time;
                                    b.velocity = o / l, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (l > 150 || (new window.Date).getTime() - s.time > 300) && (b.velocity = 0)
                                } else b.velocity = 0;
                                A.length = 0;
                                var p = 1e3 * b.params.freeModeMomentumRatio, d = b.velocity * p, u = b.translate + d;
                                b.rtl && (u = -u);
                                var c, m = !1, h = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;
                                if (u < b.maxTranslate()) b.params.freeModeMomentumBounce ? (u + b.maxTranslate() < -h && (u = b.maxTranslate() - h), c = b.maxTranslate(), m = !0, B = !0) : u = b.maxTranslate(); else if (u > b.minTranslate()) b.params.freeModeMomentumBounce ? (u - b.minTranslate() > h && (u = b.minTranslate() + h), c = b.minTranslate(), m = !0, B = !0) : u = b.minTranslate(); else if (b.params.freeModeSticky) {
                                    var f, g = 0;
                                    for (g = 0; g < b.snapGrid.length; g += 1)if (b.snapGrid[g] > -u) {
                                        f = g;
                                        break
                                    }
                                    u = Math.abs(b.snapGrid[f] - u) < Math.abs(b.snapGrid[f - 1] - u) || "next" === b.swipeDirection ? b.snapGrid[f] : b.snapGrid[f - 1], b.rtl || (u = -u)
                                }
                                if (0 !== b.velocity) p = b.rtl ? Math.abs((-u - b.translate) / b.velocity) : Math.abs((u - b.translate) / b.velocity); else if (b.params.freeModeSticky)return void b.slideReset();
                                b.params.freeModeMomentumBounce && m ? (b.updateProgress(c), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function () {
                                    b && B && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(c), b.wrapper.transitionEnd(function () {
                                        b && b.onTransitionEnd()
                                    }))
                                })) : b.velocity ? (b.updateProgress(u), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                                    b && b.onTransitionEnd()
                                }))) : b.updateProgress(u), b.updateActiveIndex()
                            }
                            return void((!b.params.freeModeMomentum || r >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()))
                        }
                        var v, w = 0, y = b.slidesSizesGrid[0];
                        for (v = 0; v < b.slidesGrid.length; v += b.params.slidesPerGroup)"undefined" != typeof b.slidesGrid[v + b.params.slidesPerGroup] ? i >= b.slidesGrid[v] && i < b.slidesGrid[v + b.params.slidesPerGroup] && (w = v, y = b.slidesGrid[v + b.params.slidesPerGroup] - b.slidesGrid[v]) : i >= b.slidesGrid[v] && (w = v, y = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
                        var x = (i - b.slidesGrid[w]) / y;
                        if (r > b.params.longSwipesMs) {
                            if (!b.params.longSwipes)return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && (x >= b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w)), "prev" === b.swipeDirection && (x > 1 - b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w))
                        } else {
                            if (!b.params.shortSwipes)return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && b.slideTo(w + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(w)
                        }
                    }
                }, b._slideTo = function (e, a) {
                    return b.slideTo(e, a, !0, !0)
                }, b.slideTo = function (e, a, t, r) {
                    "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);
                    var i = -b.snapGrid[b.snapIndex];
                    b.params.autoplay && b.autoplaying && (r || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(a) : b.stopAutoplay()), b.updateProgress(i);
                    for (var s = 0; s < b.slidesGrid.length; s++)-Math.floor(100 * i) >= Math.floor(100 * b.slidesGrid[s]) && (e = s);
                    return !b.params.allowSwipeToNext && i < b.translate && i < b.minTranslate() ? !1 : !b.params.allowSwipeToPrev && i > b.translate && i > b.maxTranslate() && (b.activeIndex || 0) !== e ? !1 : ("undefined" == typeof a && (a = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.rtl && -i === b.translate || !b.rtl && i === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(i), !1) : (b.updateClasses(), b.onTransitionStart(t), 0 === a ? (b.setWrapperTranslate(i), b.setWrapperTransition(0), b.onTransitionEnd(t)) : (b.setWrapperTranslate(i), b.setWrapperTransition(a), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                        b && b.onTransitionEnd(t)
                    }))), !0))
                }, b.onTransitionStart = function (e) {
                    "undefined" == typeof e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)))
                }, b.onTransitionEnd = function (e) {
                    b.animating = !1, b.setWrapperTransition(0), "undefined" == typeof e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.hashnav && b.hashnav && b.hashnav.setHash()
                }, b.slideNext = function (e, a, t) {
                    if (b.params.loop) {
                        if (b.animating)return !1;
                        b.fixLoop();
                        b.container[0].clientLeft;
                        return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t)
                    }
                    return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t)
                }, b._slideNext = function (e) {
                    return b.slideNext(!0, e, !0)
                }, b.slidePrev = function (e, a, t) {
                    if (b.params.loop) {
                        if (b.animating)return !1;
                        b.fixLoop();
                        b.container[0].clientLeft;
                        return b.slideTo(b.activeIndex - 1, a, e, t)
                    }
                    return b.slideTo(b.activeIndex - 1, a, e, t)
                }, b._slidePrev = function (e) {
                    return b.slidePrev(!0, e, !0)
                }, b.slideReset = function (e, a, t) {
                    return b.slideTo(b.activeIndex, a, e)
                }, b.setWrapperTransition = function (e, a) {
                    b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, a), b.emit("onSetTransition", b, e)
                }, b.setWrapperTranslate = function (e, a, t) {
                    var r = 0, i = 0, n = 0;
                    b.isHorizontal() ? r = b.rtl ? -e : e : i = e, b.params.roundLengths && (r = s(r), i = s(i)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + r + "px, " + i + "px, " + n + "px)") : b.wrapper.transform("translate(" + r + "px, " + i + "px)")), b.translate = b.isHorizontal() ? r : i;
                    var o, l = b.maxTranslate() - b.minTranslate();
                    o = 0 === l ? 0 : (e - b.minTranslate()) / l, o !== b.progress && b.updateProgress(e), a && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, t), b.emit("onSetTranslate", b, b.translate)
                }, b.getTranslate = function (e, a) {
                    var t, r, i, s;
                    return "undefined" == typeof a && (a = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (i = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (r = i.transform || i.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map(function (e) {
                        return e.replace(",", ".")
                    }).join(", ")), s = new window.WebKitCSSMatrix("none" === r ? "" : r)) : (s = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = s.toString().split(",")), "x" === a && (r = window.WebKitCSSMatrix ? s.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (r = window.WebKitCSSMatrix ? s.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), b.rtl && r && (r = -r), r || 0)
                }, b.getWrapperTranslate = function (e) {
                    return "undefined" == typeof e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e)
                }, b.observers = [], b.initObservers = function () {
                    if (b.params.observeParents)for (var e = b.container.parents(), a = 0; a < e.length; a++)l(e[a]);
                    l(b.container[0], {childList: !1}), l(b.wrapper[0], {attributes: !1})
                }, b.disconnectObservers = function () {
                    for (var e = 0; e < b.observers.length; e++)b.observers[e].disconnect();
                    b.observers = []
                }, b.createLoop = function () {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
                    var e = b.wrapper.children("." + b.params.slideClass);
                    "auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = e.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > e.length && (b.loopedSlides = e.length);
                    var t, r = [], i = [];
                    for (e.each(function (t, s) {
                        var n = a(this);
                        t < b.loopedSlides && i.push(s), t < e.length && t >= e.length - b.loopedSlides && r.push(s), n.attr("data-swiper-slide-index", t)
                    }), t = 0; t < i.length; t++)b.wrapper.append(a(i[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
                    for (t = r.length - 1; t >= 0; t--)b.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass))
                }, b.destroyLoop = function () {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index")
                }, b.reLoop = function (e) {
                    var a = b.activeIndex - b.loopedSlides;
                    b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(a + b.loopedSlides, 0, !1)
                }, b.fixLoop = function () {
                    var e;
                    b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0))
                }, b.appendSlide = function (e) {
                    if (b.params.loop && b.destroyLoop(), "object" == typeof e && e.length)for (var a = 0; a < e.length; a++)e[a] && b.wrapper.append(e[a]); else b.wrapper.append(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0)
                }, b.prependSlide = function (e) {
                    b.params.loop && b.destroyLoop();
                    var a = b.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var t = 0; t < e.length; t++)e[t] && b.wrapper.prepend(e[t]);
                        a = b.activeIndex + e.length
                    } else b.wrapper.prepend(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(a, 0, !1)
                }, b.removeSlide = function (e) {
                    b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));
                    var a, t = b.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var r = 0; r < e.length; r++)a = e[r], b.slides[a] && b.slides.eq(a).remove(), t > a && t--;
                        t = Math.max(t, 0)
                    } else a = e, b.slides[a] && b.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(t + b.loopedSlides, 0, !1) : b.slideTo(t, 0, !1)
                }, b.removeAllSlides = function () {
                    for (var e = [], a = 0; a < b.slides.length; a++)e.push(a);
                    b.removeSlide(e)
                }, b.effects = {
                    fade: {
                        setTranslate: function () {
                            for (var e = 0; e < b.slides.length; e++) {
                                var a = b.slides.eq(e), t = a[0].swiperSlideOffset, r = -t;
                                b.params.virtualTranslate || (r -= b.translate);
                                var i = 0;
                                b.isHorizontal() || (i = r, r = 0);
                                var s = b.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                                a.css({opacity: s}).transform("translate3d(" + r + "px, " + i + "px, 0px)")
                            }
                        }, setTransition: function (e) {
                            if (b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
                                var a = !1;
                                b.slides.transitionEnd(function () {
                                    if (!a && b) {
                                        a = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++)b.wrapper.trigger(e[t])
                                    }
                                })
                            }
                        }
                    }, flip: {
                        setTranslate: function () {
                            for (var e = 0; e < b.slides.length; e++) {
                                var t = b.slides.eq(e), r = t[0].progress;
                                b.params.flip.limitRotation && (r = Math.max(Math.min(t[0].progress, 1), -1));
                                var i = t[0].swiperSlideOffset, s = -180 * r, n = s, o = 0, l = -i, p = 0;
                                if (b.isHorizontal() ? b.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(r)) + b.slides.length, b.params.flip.slideShadows) {
                                    var d = b.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                                        u = b.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                                    0 === d.length && (d = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-r, 0)), u.length && (u[0].style.opacity = Math.max(r, 0))
                                }
                                t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                            }
                        }, setTransition: function (e) {
                            if (b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.virtualTranslate && 0 !== e) {
                                var t = !1;
                                b.slides.eq(b.activeIndex).transitionEnd(function () {
                                    if (!t && b && a(this).hasClass(b.params.slideActiveClass)) {
                                        t = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], r = 0; r < e.length; r++)b.wrapper.trigger(e[r])
                                    }
                                })
                            }
                        }
                    }, cube: {
                        setTranslate: function () {
                            var e, t = 0;
                            b.params.cube.shadow && (b.isHorizontal() ? (e = b.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(e)), e.css({height: b.width + "px"})) : (e = b.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.container.append(e))));
                            for (var r = 0; r < b.slides.length; r++) {
                                var i = b.slides.eq(r), s = 90 * r, n = Math.floor(s / 360);
                                b.rtl && (s = -s, n = Math.floor(-s / 360));
                                var o = Math.max(Math.min(i[0].progress, 1), -1), l = 0, p = 0, d = 0;
                                r % 4 === 0 ? (l = 4 * -n * b.size, d = 0) : (r - 1) % 4 === 0 ? (l = 0, d = 4 * -n * b.size) : (r - 2) % 4 === 0 ? (l = b.size + 4 * n * b.size, d = b.size) : (r - 3) % 4 === 0 && (l = -b.size, d = 3 * b.size + 4 * b.size * n), b.rtl && (l = -l), b.isHorizontal() || (p = l, l = 0);
                                var u = "rotateX(" + (b.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (b.isHorizontal() ? s : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
                                if (1 >= o && o > -1 && (t = 90 * r + 90 * o, b.rtl && (t = 90 * -r - 90 * o)), i.transform(u), b.params.cube.slideShadows) {
                                    var c = b.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                                        m = b.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                                    0 === c.length && (c = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), i.append(c)), 0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0))
                                }
                            }
                            if (b.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-moz-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-ms-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "transform-origin": "50% 50% -" + b.size / 2 + "px"
                                }), b.params.cube.shadow)if (b.isHorizontal()) e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")"); else {
                                var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                    f = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                                    g = b.params.cube.shadowScale, v = b.params.cube.shadowScale / f,
                                    w = b.params.cube.shadowOffset;
                                e.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (b.height / 2 + w) + "px, " + -b.height / 2 / v + "px) rotateX(-90deg)")
                            }
                            var y = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;
                            b.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (b.isHorizontal() ? 0 : t) + "deg) rotateY(" + (b.isHorizontal() ? -t : 0) + "deg)")
                        }, setTransition: function (e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e)
                        }
                    }, coverflow: {
                        setTranslate: function () {
                            for (var e = b.translate, t = b.isHorizontal() ? -e + b.width / 2 : -e + b.height / 2, r = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, i = b.params.coverflow.depth, s = 0, n = b.slides.length; n > s; s++) {
                                var o = b.slides.eq(s), l = b.slidesSizesGrid[s], p = o[0].swiperSlideOffset,
                                    d = (t - p - l / 2) / l * b.params.coverflow.modifier,
                                    u = b.isHorizontal() ? r * d : 0, c = b.isHorizontal() ? 0 : r * d,
                                    m = -i * Math.abs(d), h = b.isHorizontal() ? 0 : b.params.coverflow.stretch * d,
                                    f = b.isHorizontal() ? b.params.coverflow.stretch * d : 0;
                                Math.abs(f) < .001 && (f = 0), Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);
                                var g = "translate3d(" + f + "px," + h + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";
                                if (o.transform(g), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, b.params.coverflow.slideShadows) {
                                    var v = b.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                                        w = b.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                    0 === v.length && (v = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0)
                                }
                            }
                            if (b.browser.ie) {
                                var y = b.wrapper[0].style;
                                y.perspectiveOrigin = t + "px 50%"
                            }
                        }, setTransition: function (e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, b.lazy = {
                    initialImageLoaded: !1, loadImageInSlide: function (e, t) {
                        if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== b.slides.length)) {
                            var r = b.slides.eq(e),
                                i = r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                            !r.hasClass("swiper-lazy") || r.hasClass("swiper-lazy-loaded") || r.hasClass("swiper-lazy-loading") || (i = i.add(r[0])), 0 !== i.length && i.each(function () {
                                var e = a(this);
                                e.addClass("swiper-lazy-loading");
                                var i = e.attr("data-background"), s = e.attr("data-src"), n = e.attr("data-srcset");
                                b.loadImage(e[0], s || i, n, !1, function () {
                                    if (i ? (e.css("background-image", 'url("' + i + '")'), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")), s && (e.attr("src", s), e.removeAttr("data-src"))), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), r.find(".swiper-lazy-preloader, .preloader").remove(), b.params.loop && t) {
                                        var a = r.attr("data-swiper-slide-index");
                                        if (r.hasClass(b.params.slideDuplicateClass)) {
                                            var o = b.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + b.params.slideDuplicateClass + ")");
                                            b.lazy.loadImageInSlide(o.index(), !1)
                                        } else {
                                            var l = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');
                                            b.lazy.loadImageInSlide(l.index(), !1)
                                        }
                                    }
                                    b.emit("onLazyImageReady", b, r[0], e[0])
                                }), b.emit("onLazyImageLoad", b, r[0], e[0])
                            })
                        }
                    }, load: function () {
                        var e;
                        if (b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function () {
                            b.lazy.loadImageInSlide(a(this).index())
                        }); else if (b.params.slidesPerView > 1)for (e = b.activeIndex; e < b.activeIndex + b.params.slidesPerView; e++)b.slides[e] && b.lazy.loadImageInSlide(e); else b.lazy.loadImageInSlide(b.activeIndex);
                        if (b.params.lazyLoadingInPrevNext)if (b.params.slidesPerView > 1 || b.params.lazyLoadingInPrevNextAmount && b.params.lazyLoadingInPrevNextAmount > 1) {
                            var t = b.params.lazyLoadingInPrevNextAmount, r = b.params.slidesPerView,
                                i = Math.min(b.activeIndex + r + Math.max(t, r), b.slides.length),
                                s = Math.max(b.activeIndex - Math.max(r, t), 0);
                            for (e = b.activeIndex + b.params.slidesPerView; i > e; e++)b.slides[e] && b.lazy.loadImageInSlide(e);
                            for (e = s; e < b.activeIndex; e++)b.slides[e] && b.lazy.loadImageInSlide(e)
                        } else {
                            var n = b.wrapper.children("." + b.params.slideNextClass);
                            n.length > 0 && b.lazy.loadImageInSlide(n.index());
                            var o = b.wrapper.children("." + b.params.slidePrevClass);
                            o.length > 0 && b.lazy.loadImageInSlide(o.index())
                        }
                    }, onTransitionStart: function () {
                        b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load()
                    }, onTransitionEnd: function () {
                        b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load()
                    }
                }, b.scrollbar = {
                    isTouched: !1, setDragPosition: function (e) {
                        var a = b.scrollbar,
                            t = b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                            r = t - a.track.offset()[b.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                            i = -b.minTranslate() * a.moveDivider, s = -b.maxTranslate() * a.moveDivider;
                        i > r ? r = i : r > s && (r = s), r = -r / a.moveDivider, b.updateProgress(r), b.setWrapperTranslate(r, !0)
                    }, dragStart: function (e) {
                        var a = b.scrollbar;
                        a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), b.params.scrollbarHide && a.track.css("opacity", 1), b.wrapper.transition(100), a.drag.transition(100), b.emit("onScrollbarDragStart", b)
                    }, dragMove: function (e) {
                        var a = b.scrollbar;
                        a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), b.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), b.emit("onScrollbarDragMove", b))
                    }, dragEnd: function (e) {
                        var a = b.scrollbar;
                        a.isTouched && (a.isTouched = !1, b.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function () {
                            a.track.css("opacity", 0), a.track.transition(400)
                        }, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset())
                    }, enableDraggable: function () {
                        var e = b.scrollbar, t = b.support.touch ? e.track : document;
                        a(e.track).on(b.touchEvents.start, e.dragStart), a(t).on(b.touchEvents.move, e.dragMove), a(t).on(b.touchEvents.end, e.dragEnd)
                    }, disableDraggable: function () {
                        var e = b.scrollbar, t = b.support.touch ? e.track : document;
                        a(e.track).off(b.touchEvents.start, e.dragStart), a(t).off(b.touchEvents.move, e.dragMove), a(t).off(b.touchEvents.end, e.dragEnd)
                    }, set: function () {
                        if (b.params.scrollbar) {
                            var e = b.scrollbar;
                            e.track = a(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && e.track.length > 1 && 1 === b.container.find(b.params.scrollbar).length && (e.track = b.container.find(b.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = b.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = b.size / b.virtualSize, e.moveDivider = e.divider * (e.trackSize / b.size), e.dragSize = e.trackSize * e.divider, b.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", b.params.scrollbarHide && (e.track[0].style.opacity = 0)
                        }
                    }, setTranslate: function () {
                        if (b.params.scrollbar) {
                            var e, a = b.scrollbar, t = (b.translate || 0, a.dragSize);
                            e = (a.trackSize - a.dragSize) * b.progress, b.rtl && b.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (b.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), b.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
                                a.track[0].style.opacity = 0, a.track.transition(400)
                            }, 1e3))
                        }
                    }, setTransition: function (e) {
                        b.params.scrollbar && b.scrollbar.drag.transition(e)
                    }
                }, b.controller = {
                    LinearSpline: function (e, a) {
                        this.x = e, this.y = a, this.lastIndex = e.length - 1;
                        var t, r;
                        this.x.length;
                        this.interpolate = function (e) {
                            return e ? (r = i(this.x, e), t = r - 1, (e - this.x[t]) * (this.y[r] - this.y[t]) / (this.x[r] - this.x[t]) + this.y[t]) : 0
                        };
                        var i = function () {
                            var e, a, t;
                            return function (r, i) {
                                for (a = -1, e = r.length; e - a > 1;)r[t = e + a >> 1] <= i ? a = t : e = t;
                                return e
                            }
                        }()
                    }, getInterpolateFunction: function (e) {
                        b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid))
                    }, setTranslate: function (e, a) {
                        function r(a) {
                            e = a.rtl && "horizontal" === a.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(a), s = -b.controller.spline.interpolate(-e)), s && "container" !== b.params.controlBy || (i = (a.maxTranslate() - a.minTranslate()) / (b.maxTranslate() - b.minTranslate()), s = (e - b.minTranslate()) * i + a.minTranslate()), b.params.controlInverse && (s = a.maxTranslate() - s), a.updateProgress(s), a.setWrapperTranslate(s, !1, b), a.updateActiveIndex()
                        }

                        var i, s, n = b.params.control;
                        if (b.isArray(n))for (var o = 0; o < n.length; o++)n[o] !== a && n[o] instanceof t && r(n[o]); else n instanceof t && a !== n && r(n)
                    }, setTransition: function (e, a) {
                        function r(a) {
                            a.setWrapperTransition(e, b), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
                                s && (a.params.loop && "slide" === b.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                            }))
                        }

                        var i, s = b.params.control;
                        if (b.isArray(s))for (i = 0; i < s.length; i++)s[i] !== a && s[i] instanceof t && r(s[i]); else s instanceof t && a !== s && r(s)
                    }
                }, b.hashnav = {
                    init: function () {
                        if (b.params.hashnav) {
                            b.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e)for (var a = 0, t = 0, r = b.slides.length; r > t; t++) {
                                var i = b.slides.eq(t), s = i.attr("data-hash");
                                if (s === e && !i.hasClass(b.params.slideDuplicateClass)) {
                                    var n = i.index();
                                    b.slideTo(n, a, b.params.runCallbacksOnInit, !0)
                                }
                            }
                        }
                    }, setHash: function () {
                        b.hashnav.initialized && b.params.hashnav && (document.location.hash = b.slides.eq(b.activeIndex).attr("data-hash") || "")
                    }
                }, b.disableKeyboardControl = function () {
                    b.params.keyboardControl = !1, a(document).off("keydown", p)
                }, b.enableKeyboardControl = function () {
                    b.params.keyboardControl = !0, a(document).on("keydown", p)
                }, b.mousewheel = {
                    event: !1,
                    lastScrollTime: (new window.Date).getTime()
                }, b.params.mousewheelControl) {
                try {
                    new window.WheelEvent("wheel"), b.mousewheel.event = "wheel"
                } catch (N) {
                    (window.WheelEvent || b.container[0] && "wheel" in b.container[0]) && (b.mousewheel.event = "wheel")
                }
                !b.mousewheel.event && window.WheelEvent, b.mousewheel.event || void 0 === document.onmousewheel || (b.mousewheel.event = "mousewheel"), b.mousewheel.event || (b.mousewheel.event = "DOMMouseScroll")
            }
            b.disableMousewheelControl = function () {
                return b.mousewheel.event ? (b.container.off(b.mousewheel.event, d), !0) : !1
            }, b.enableMousewheelControl = function () {
                return b.mousewheel.event ? (b.container.on(b.mousewheel.event, d), !0) : !1
            }, b.parallax = {
                setTranslate: function () {
                    b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        u(this, b.progress)
                    }), b.slides.each(function () {
                        var e = a(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            var a = Math.min(Math.max(e[0].progress, -1), 1);
                            u(this, a)
                        })
                    })
                }, setTransition: function (e) {
                    "undefined" == typeof e && (e = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        var t = a(this), r = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (r = 0), t.transition(r)
                    })
                }
            }, b._plugins = [];
            for (var R in b.plugins) {
                var W = b.plugins[R](b, b.params[R]);
                W && b._plugins.push(W)
            }
            return b.callPlugins = function (e) {
                for (var a = 0; a < b._plugins.length; a++)e in b._plugins[a] && b._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, b.emitterEventListeners = {}, b.emit = function (e) {
                b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (b.emitterEventListeners[e])for (a = 0; a < b.emitterEventListeners[e].length; a++)b.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, b.on = function (e, a) {
                return e = c(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(a), b
            }, b.off = function (e, a) {
                var t;
                if (e = c(e), "undefined" == typeof a)return b.emitterEventListeners[e] = [], b;
                if (b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
                    for (t = 0; t < b.emitterEventListeners[e].length; t++)b.emitterEventListeners[e][t] === a && b.emitterEventListeners[e].splice(t, 1);
                    return b
                }
            }, b.once = function (e, a) {
                e = c(e);
                var t = function () {
                    a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, t)
                };
                return b.on(e, t), b
            }, b.a11y = {
                makeFocusable: function (e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function (e, a) {
                    return e.attr("role", a), e
                },
                addLabel: function (e, a) {
                    return e.attr("aria-label", a), e
                },
                disable: function (e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function (e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function (e) {
                    13 === e.keyCode && (a(e.target).is(b.params.nextButton) ? (b.onClickNext(e), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : a(e.target).is(b.params.prevButton) && (b.onClickPrev(e), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), a(e.target).is("." + b.params.bulletClass) && a(e.target)[0].click())
                },
                liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function (e) {
                    var a = b.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e))
                },
                init: function () {
                    b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), a(b.container).append(b.a11y.liveRegion)
                },
                initPagination: function () {
                    b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function () {
                        var e = a(this);
                        b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
                    })
                },
                destroy: function () {
                    b.a11y.liveRegion && b.a11y.liveRegion.length > 0 && b.a11y.liveRegion.remove()
                }
            }, b.init = function () {
                b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(),
                b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b)
            }, b.cleanupStyles = function () {
                b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && a(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && a(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"))
            }, b.destroy = function (e, a) {
                b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), a && b.cleanupStyles(), b.disconnectObservers(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.emit("onDestroy"), e !== !1 && (b = null)
            }, b.init(), b
        }
    };
    t.prototype = {
        isSafari: function () {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function (e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
        },
        device: function () {
            var e = navigator.userAgent, a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/), r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                i = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return {ios: t || i || r, android: a}
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function () {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(), flexbox: function () {
                for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)if (a[t] in e)return !0
            }(), observer: function () {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }()
        },
        plugins: {}
    };
    for (var r = (function () {
        var e = function (e) {
            var a = this, t = 0;
            for (t = 0; t < e.length; t++)a[t] = e[t];
            return a.length = e.length, this
        }, a = function (a, t) {
            var r = [], i = 0;
            if (a && !t && a instanceof e)return a;
            if (a)if ("string" == typeof a) {
                var s, n, o = a.trim();
                if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                    var l = "div";
                    for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = a, i = 0; i < n.childNodes.length; i++)r.push(n.childNodes[i])
                } else for (s = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [document.getElementById(a.split("#")[1])], i = 0; i < s.length; i++)s[i] && r.push(s[i])
            } else if (a.nodeType || a === window || a === document) r.push(a); else if (a.length > 0 && a[0].nodeType)for (i = 0; i < a.length; i++)r.push(a[i]);
            return new e(r)
        };
        return e.prototype = {
            addClass: function (e) {
                if ("undefined" == typeof e)return this;
                for (var a = e.split(" "), t = 0; t < a.length; t++)for (var r = 0; r < this.length; r++)this[r].classList.add(a[t]);
                return this
            }, removeClass: function (e) {
                for (var a = e.split(" "), t = 0; t < a.length; t++)for (var r = 0; r < this.length; r++)this[r].classList.remove(a[t]);
                return this
            }, hasClass: function (e) {
                return this[0] ? this[0].classList.contains(e) : !1
            }, toggleClass: function (e) {
                for (var a = e.split(" "), t = 0; t < a.length; t++)for (var r = 0; r < this.length; r++)this[r].classList.toggle(a[t]);
                return this
            }, attr: function (e, a) {
                if (1 === arguments.length && "string" == typeof e)return this[0] ? this[0].getAttribute(e) : void 0;
                for (var t = 0; t < this.length; t++)if (2 === arguments.length) this[t].setAttribute(e, a); else for (var r in e)this[t][r] = e[r], this[t].setAttribute(r, e[r]);
                return this
            }, removeAttr: function (e) {
                for (var a = 0; a < this.length; a++)this[a].removeAttribute(e);
                return this
            }, data: function (e, a) {
                if ("undefined" != typeof a) {
                    for (var t = 0; t < this.length; t++) {
                        var r = this[t];
                        r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}), r.dom7ElementDataStorage[e] = a
                    }
                    return this
                }
                if (this[0]) {
                    var i = this[0].getAttribute("data-" + e);
                    return i ? i : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
                }
            }, transform: function (e) {
                for (var a = 0; a < this.length; a++) {
                    var t = this[a].style;
                    t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
                }
                return this
            }, transition: function (e) {
                "string" != typeof e && (e += "ms");
                for (var a = 0; a < this.length; a++) {
                    var t = this[a].style;
                    t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
                }
                return this
            }, on: function (e, t, r, i) {
                function s(e) {
                    var i = e.target;
                    if (a(i).is(t)) r.call(i, e); else for (var s = a(i).parents(), n = 0; n < s.length; n++)a(s[n]).is(t) && r.call(s[n], e)
                }

                var n, o, l = e.split(" ");
                for (n = 0; n < this.length; n++)if ("function" == typeof t || t === !1)for ("function" == typeof t && (r = arguments[1], i = arguments[2] || !1), o = 0; o < l.length; o++)this[n].addEventListener(l[o], r, i); else for (o = 0; o < l.length; o++)this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({
                    listener: r,
                    liveListener: s
                }), this[n].addEventListener(l[o], s, i);
                return this
            }, off: function (e, a, t, r) {
                for (var i = e.split(" "), s = 0; s < i.length; s++)for (var n = 0; n < this.length; n++)if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], r = arguments[2] || !1), this[n].removeEventListener(i[s], t, r); else if (this[n].dom7LiveListeners)for (var o = 0; o < this[n].dom7LiveListeners.length; o++)this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(i[s], this[n].dom7LiveListeners[o].liveListener, r);
                return this
            }, once: function (e, a, t, r) {
                function i(n) {
                    t(n), s.off(e, a, i, r)
                }

                var s = this;
                "function" == typeof a && (a = !1, t = arguments[1], r = arguments[2]), s.on(e, a, i, r)
            }, trigger: function (e, a) {
                for (var t = 0; t < this.length; t++) {
                    var r;
                    try {
                        r = new window.CustomEvent(e, {detail: a, bubbles: !0, cancelable: !0})
                    } catch (i) {
                        r = document.createEvent("Event"), r.initEvent(e, !0, !0), r.detail = a
                    }
                    this[t].dispatchEvent(r)
                }
                return this
            }, transitionEnd: function (e) {
                function a(s) {
                    if (s.target === this)for (e.call(this, s), t = 0; t < r.length; t++)i.off(r[t], a)
                }

                var t,
                    r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                    i = this;
                if (e)for (t = 0; t < r.length; t++)i.on(r[t], a);
                return this
            }, width: function () {
                return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
            }, outerWidth: function (e) {
                return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
            }, height: function () {
                return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
            }, outerHeight: function (e) {
                return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
            }, offset: function () {
                if (this.length > 0) {
                    var e = this[0], a = e.getBoundingClientRect(), t = document.body,
                        r = e.clientTop || t.clientTop || 0, i = e.clientLeft || t.clientLeft || 0,
                        s = window.pageYOffset || e.scrollTop, n = window.pageXOffset || e.scrollLeft;
                    return {top: a.top + s - r, left: a.left + n - i}
                }
                return null
            }, css: function (e, a) {
                var t;
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (t = 0; t < this.length; t++)for (var r in e)this[t].style[r] = e[r];
                        return this
                    }
                    if (this[0])return window.getComputedStyle(this[0], null).getPropertyValue(e)
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (t = 0; t < this.length; t++)this[t].style[e] = a;
                    return this
                }
                return this
            }, each: function (e) {
                for (var a = 0; a < this.length; a++)e.call(this[a], a, this[a]);
                return this
            }, html: function (e) {
                if ("undefined" == typeof e)return this[0] ? this[0].innerHTML : void 0;
                for (var a = 0; a < this.length; a++)this[a].innerHTML = e;
                return this
            }, text: function (e) {
                if ("undefined" == typeof e)return this[0] ? this[0].textContent.trim() : null;
                for (var a = 0; a < this.length; a++)this[a].textContent = e;
                return this
            }, is: function (t) {
                if (!this[0])return !1;
                var r, i;
                if ("string" == typeof t) {
                    var s = this[0];
                    if (s === document)return t === document;
                    if (s === window)return t === window;
                    if (s.matches)return s.matches(t);
                    if (s.webkitMatchesSelector)return s.webkitMatchesSelector(t);
                    if (s.mozMatchesSelector)return s.mozMatchesSelector(t);
                    if (s.msMatchesSelector)return s.msMatchesSelector(t);
                    for (r = a(t), i = 0; i < r.length; i++)if (r[i] === this[0])return !0;
                    return !1
                }
                if (t === document)return this[0] === document;
                if (t === window)return this[0] === window;
                if (t.nodeType || t instanceof e) {
                    for (r = t.nodeType ? [t] : t, i = 0; i < r.length; i++)if (r[i] === this[0])return !0;
                    return !1
                }
                return !1
            }, index: function () {
                if (this[0]) {
                    for (var e = this[0], a = 0; null !== (e = e.previousSibling);)1 === e.nodeType && a++;
                    return a
                }
            }, eq: function (a) {
                if ("undefined" == typeof a)return this;
                var t, r = this.length;
                return a > r - 1 ? new e([]) : 0 > a ? (t = r + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]])
            }, append: function (a) {
                var t, r;
                for (t = 0; t < this.length; t++)if ("string" == typeof a) {
                    var i = document.createElement("div");
                    for (i.innerHTML = a; i.firstChild;)this[t].appendChild(i.firstChild)
                } else if (a instanceof e)for (r = 0; r < a.length; r++)this[t].appendChild(a[r]); else this[t].appendChild(a);
                return this
            }, prepend: function (a) {
                var t, r;
                for (t = 0; t < this.length; t++)if ("string" == typeof a) {
                    var i = document.createElement("div");
                    for (i.innerHTML = a, r = i.childNodes.length - 1; r >= 0; r--)this[t].insertBefore(i.childNodes[r], this[t].childNodes[0])
                } else if (a instanceof e)for (r = 0; r < a.length; r++)this[t].insertBefore(a[r], this[t].childNodes[0]); else this[t].insertBefore(a, this[t].childNodes[0]);
                return this
            }, insertBefore: function (e) {
                for (var t = a(e), r = 0; r < this.length; r++)if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0]); else if (t.length > 1)for (var i = 0; i < t.length; i++)t[i].parentNode.insertBefore(this[r].cloneNode(!0), t[i])
            }, insertAfter: function (e) {
                for (var t = a(e), r = 0; r < this.length; r++)if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0].nextSibling); else if (t.length > 1)for (var i = 0; i < t.length; i++)t[i].parentNode.insertBefore(this[r].cloneNode(!0), t[i].nextSibling)
            }, next: function (t) {
                return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
            }, nextAll: function (t) {
                var r = [], i = this[0];
                if (!i)return new e([]);
                for (; i.nextElementSibling;) {
                    var s = i.nextElementSibling;
                    t ? a(s).is(t) && r.push(s) : r.push(s), i = s
                }
                return new e(r)
            }, prev: function (t) {
                return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
            }, prevAll: function (t) {
                var r = [], i = this[0];
                if (!i)return new e([]);
                for (; i.previousElementSibling;) {
                    var s = i.previousElementSibling;
                    t ? a(s).is(t) && r.push(s) : r.push(s), i = s
                }
                return new e(r)
            }, parent: function (e) {
                for (var t = [], r = 0; r < this.length; r++)e ? a(this[r].parentNode).is(e) && t.push(this[r].parentNode) : t.push(this[r].parentNode);
                return a(a.unique(t))
            }, parents: function (e) {
                for (var t = [], r = 0; r < this.length; r++)for (var i = this[r].parentNode; i;)e ? a(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
                return a(a.unique(t))
            }, find: function (a) {
                for (var t = [], r = 0; r < this.length; r++)for (var i = this[r].querySelectorAll(a), s = 0; s < i.length; s++)t.push(i[s]);
                return new e(t)
            }, children: function (t) {
                for (var r = [], i = 0; i < this.length; i++)for (var s = this[i].childNodes, n = 0; n < s.length; n++)t ? 1 === s[n].nodeType && a(s[n]).is(t) && r.push(s[n]) : 1 === s[n].nodeType && r.push(s[n]);
                return new e(a.unique(r))
            }, remove: function () {
                for (var e = 0; e < this.length; e++)this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this
            }, add: function () {
                var e, t, r = this;
                for (e = 0; e < arguments.length; e++) {
                    var i = a(arguments[e]);
                    for (t = 0; t < i.length; t++)r[r.length] = i[t], r.length++
                }
                return r
            }
        }, a.fn = e.prototype, a.unique = function (e) {
            for (var a = [], t = 0; t < e.length; t++)-1 === a.indexOf(e[t]) && a.push(e[t]);
            return a
        }, a
    }()), i = ["jQuery", "Zepto", "Dom7"], s = 0; s < i.length; s++)window[i[s]] && e(window[i[s]]);
    var n;
    n = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r, n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function (e) {
        function a(s) {
            if (s.target === this)for (e.call(this, s), t = 0; t < r.length; t++)i.off(r[t], a)
        }

        var t, r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            i = this;
        if (e)for (t = 0; t < r.length; t++)i.on(r[t], a);
        return this
    }), "transform" in n.fn || (n.fn.transform = function (e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
        }
        return this
    }), "transition" in n.fn || (n.fn.transition = function (e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
        }
        return this
    })), window.Swiper = t
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
        "use strict";
        return window.Swiper
    });
ecWap.debug = true;
var gid = function (a) {
    return document.getElementById(a)
};
Date.prototype.format = function (f) {
    var g = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    var h = {"0": "\u65e5", "1": "\u4e00", "2": "\u4e8c", "3": "\u4e09", "4": "\u56db", "5": "\u4e94", "6": "\u516d"};
    if (/(y+)/.test(f)) {
        f = f.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(f)) {
        f = f.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + h[this.getDay() + ""])
    }
    for (var e in g) {
        if (new RegExp("(" + e + ")").test(f)) {
            f = f.replace(RegExp.$1, (RegExp.$1.length == 1) ? (g[e]) : (("00" + g[e]).substr(("" + g[e]).length)))
        }
    }
    return f
};
String.prototype.parseDate = function (m) {
    var c = {
        "\\.": {v: "\\."},
        "\\?": {v: "\\?"},
        "M+": {v: "(0[1-9]|1[0-2]|[1-9])", k: "MM"},
        "d+": {v: "(3[01]|[12][0-9]|0[1-9]|[1-9])", k: "dd"},
        "y+": {v: "(\\d{4})", k: "yyyy"},
        "H+": {v: "(2[0-3]|[01][0-9]|[0-9])", k: "HH"},
        "m+": {v: "([0-5][0-9]|[0-9])", k: "mm"},
        "s+": {v: "([0-5][0-9]|[0-9])", k: "ss"},
        S: {v: "(\\d+)", k: "S"}
    };
    var j = [];
    var e = m;
    var b;
    var g;
    for (var f in c) {
        if ((b = m.search(new RegExp("(" + f + ")"))) != -1) {
            g = c[f];
            e = e.replace(RegExp.$1, g.v);
            if (g.k) {
                j.push({n: g.k, order: b});
            }
        }
    }
    j.sort(function (i, d) {
        return i.order - d.order;
    });
    g = {};
    for (var h = 0; h < j.length; h++) {
        g[j[h].n] = h + 1;
    }
    var a = this.match(new RegExp(e));
    if (!a) {
        throw "Invalid String for parse to Date!";
    }
    var l = new Date();
    if (g.yyyy) {
        l.setFullYear(a[g.yyyy]);
    }
    if (g.dd) {
        var n = a[g.dd];
        l.setDate(n);
        l.setDate(n);
    } else {
        l.setDate(1);
        l.setDate(1);
    }
    if (g.MM) {
        l.setMonth(a[g.MM] - 1);
    }
    if (g.HH) {
        l.setHours(a[g.HH]);
    } else {
        l.setHours(0);
    }
    if (g.mm) {
        l.setMinutes(a[g.mm]);
    } else {
        l.setMinutes(0);
    }
    if (g.ss) {
        l.setSeconds(a[g.ss]);
    } else {
        l.setSeconds(0);
    }
    if (g.S) {
        l.setMilliseconds(a[g.S]);
    } else {
        l.setMilliseconds(0);
    }
    return l;
};
ecWap.pkg = function (f, n, o) {
    var q, p, r;
    if (arguments.length == 3) {
        q = f;
        p = n;
        r = o
    } else {
        q = window;
        p = f;
        r = n
    }
    if (!p || !p.length) {
        return null
    }
    var a = p.split(".");
    for (var c = q, e = 0; e < a.length - 1; e++) {
        c[a[e]] || (c[a[e]] = {});
        c = c[a[e]]
    }
    c = (c[a[a.length - 1]] = r || c[a[a.length - 1]] || {});
    return c
};
ecWap.ajax = function (a) {
    var b = $.extend(a, {});
    $.ajax({
        type: b.type || "GET",
        dataType: b.dataType || "json",
        url: b.url,
        data: b.data,
        timeout: b.timeout || 5000,
        success: function (c) {
            b.successFunction(c)
        },
        error: function (c, f) {
            if (f === "timeout" && typeof(b.timeoutFunction) == "function") {
                b.timeoutFunction()
            } else {
                if (typeof(b.errorFunction) == "function") {
                    b.errorFunction()
                }
            }
        }
    })
};
ecWap.cookie = {
    get: function (a) {
        var f = null;
        if (document.cookie && document.cookie != "") {
            var d = document.cookie.split(";");
            for (var c = 0; c < d.length; c++) {
                var b = (d[c] || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
                if (b.substring(0, a.length + 1) == (a + "=")) {
                    var e = function (j) {
                        j = j.replace(/\+/g, " ");
                        var h = '()<>@,;:\\"/[]?={}';
                        for (var g = 0; g < h.length; g++) {
                            if (j.indexOf(h.charAt(g)) != -1) {
                                if (j.startWith('"')) {
                                    j = j.substring(1);
                                }
                                if (j.endWith('"')) {
                                    j = j.substring(0, j.length - 1);
                                }
                                break;
                            }
                        }
                        return decodeURIComponent(j);
                    };
                    f = e(b.substring(a.length + 1));
                    break;
                }
            }
        }
        return f;
    }, set: function (d, f, c) {
        c = c || {};
        if (f === null) {
            f = "";
            c.expires = -1;
        }
        var a = "";
        if (c.expires && (typeof c.expires == "number" || c.expires.toUTCString)) {
            var b;
            if (typeof c.expires == "number") {
                b = new Date();
                b.setTime(b.getTime() + (c.expires * 24 * 60 * 60 * 1000));
            } else {
                b = c.expires;
            }
            a = "; expires=" + b.toUTCString();
        }
        var h = "; path=" + (c.path || "/");
        var e = c.domain ? "; domain=" + (c.domain) : "";
        var g = c.secure ? "; secure" : "";
        document.cookie = [d, "=", encodeURIComponent(f), a, h, e, g].join("");
    }, remove: function (a) {
        this.set(a, null);
    }
};
ecWap.escapeHtml = function (a) {
    if (typeof(a) != "string") {
        return a;
    }
    if (ol.util.isEmpty(a)) {
        return "";
    }
    a = a.replaceAll("&", "&amp;");
    a = a.replaceAll('"', "&quot;");
    a = a.replaceAll(" ", "&nbsp;");
    a = a.replaceAll("<", "&lt;");
    a = a.replaceAll(">", "&gt;");
    a = a.replaceAll("'", "&#039;");
    a = a.replaceAll("\r\n", "<br/>");
    a = a.replaceAll("\n", "<br/>");
    a = a.replaceAll("\r", "<br/>");
    return a;
};
ecWap.unescapeHtml = function (a) {
    if (typeof(a) != "string") {
        return a;
    }
    if (ol.util.isEmpty(a)) {
        return "";
    }
    a = a.replaceAll("&quot;", '"');
    a = a.replaceAll("&nbsp;", " ");
    a = a.replaceAll("&lt;", "<");
    a = a.replaceAll("&gt;", ">");
    a = a.replaceAll("&#039;", "'");
    a = a.replaceAll("<br>", "\n");
    a = a.replaceAll("<br/>", "\n");
    a = a.replaceAll("&#61;", "=");
    a = a.replaceAll("&amp;", "&");
    return a;
};
/*Utils*/
window.Utils || (window.Utils = {});
window._gaq = window._gaq || [];
var _hmt = _hmt || [];
var _paq = _paq || [];
Utils.report = {
 shoppingCart: function (i) {
        var i = i || {}, f = i.opertype, g = i.skuIds || [], a = i.bundlerIds || [];
        var c = function (m, j, k) {
            if (!m) {
                opertye = "1"
            }
            if (undefined != j && null != j && j.length > 0) {
                j = $.map(j, function (n) {
                    return "1_" + n
                })
            }
            if (undefined != k && null != k && k.length > 0) {
                k = $.map(k, function (n) {
                    return "0_" + n
                })
            }
            var l = j.concat(k);
            return (m + "," + l.join(":"))
        };
        if (undefined != f && null != f) {
            var e = c(f, g, a);
            var d = /^\d+$/;
            var b = Utils.url.getQueryStr("wi");
            var h = Utils.url.getQueryStr("cid");
            if (h.length >= 0 && h.lenght <= 11 && d.test(h)) {
                Utils.cookie.set("cps_id", h, {expires: 1, path: "/", domain: ".vmall.com"});
                Utils.cookie.set("cps_wi", null, {expires: 1, path: "/", domain: ".vmall.com"});
                Utils.cookie.set("cps_direct", "1", {expires: "10", domain: ".vmall.com"});
                if (b.length > 0 && b.length < 200) {
                    Utils.cookie.set("cps_wi", null, {expires: 1, domain: ".vmall.com"})
                }
            }
            _paq.push(["setSiteId", (Utils.url.getHost() || "m.vmall.com")]);
            _paq.push(["setTrackerUrl", "https://datacollect.vmall.com:18443/webv1"]);
            _paq.push(["setCustomVariable", 10, "cart", e, "page"]);
            _paq.push(["setCustomVariable", 10, "uid", ((ecWap.account ? ecWap.account.id : "") || ""), "visit"]);
            _paq.push(["trackGoal", 1]);
            Utils.cookie.remove("cps_direct")
        }
    }
};
Utils.cookie = {
    get: function (c) {
        var g = null;
        if (document.cookie && document.cookie != "") {
            var d = document.cookie.split(";");
            for (var a = 0; a < d.length; a++) {
                var b = (d[a] || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
                if (b.substring(0, c.length + 1) == (c + "=")) {
                    var h = function (e) {
                        e = e.replace(/\+/g, " ");
                        var f = '()<>@,;:\\"/[]?={}';
                        for (var i = 0; i < f.length; i++) {
                            if (e.indexOf(f.charAt(i)) != -1) {
                                if (e.startWith('"')) {
                                    e = e.substring(1)
                                }
                                if (e.endWith('"')) {
                                    e = e.substring(0, e.length - 1)
                                }
                                break
                            }
                        }
                        return decodeURIComponent(e)
                    };
                    g = h(b.substring(c.length + 1));
                    break
                }
            }
        }
        return g
    }, set: function (d, h, i) {
        i = i || {};
        if (h === null) {
            h = "";
            i.expires = -1
        }
        var a = "";
        if (i.expires && (typeof i.expires == "number" || i.expires.toUTCString)) {
            var b;
            if (typeof i.expires == "number") {
                b = new Date();
                b.setTime(b.getTime() + (i.expires * 24 * 60 * 60 * 1000))
            } else {
                b = i.expires
            }
            a = "; expires=" + b.toUTCString()
        }
        var g = "; path=" + (i.path || "/");
        var e = i.domain ? "; domain=" + (i.domain) : "";
        var f = i.secure ? "; secure=" : "";
        document.cookie = [d, "=", encodeURIComponent(h), a, g, e, f].join("")
    }, remove: function (a) {
        this.set(a, null)
    }
};
var _window = $(window), _binded = false,
    _doc = document.compatMode == "CSS1Compat" ? document.documentElement : document.body, _scrollTopSrart = 0,
    _scrollTopEnd = 0, _clientHeight, _imgList = [], _timer;
Utils.image = {
    bind: function () {
        var a = function () {
            clearTimeout(_timer);
            _timer = setTimeout(function () {
                _scrollTopSrart = _window.scrollTop();
                _scrollTopEnd = _scrollTopSrart + _clientHeight;
                var c;
                for (var d = 0; d < _imgList.length; d++) {
                    c = _imgList[d];
                    if (Utils.image.render(c)) {
                        _imgList.splice(d, 1);
                        d--
                    }
                }
                if (!_imgList || _imgList.length == 0) {
                    _window.unbind("scroll", a);
                    _window.unbind("resize", b)
                }
            }, 100)
        }, b = function (c) {
            _clientHeight = _doc.clientHeight
        };
        _window.bind("scroll", a);
        _window.bind("resize", b);
        _clientHeight = _doc.clientHeight;
        _scrollTopSrart = _window.scrollTop();
        _scrollTopEnd = _scrollTopSrart + _clientHeight
    }, render: function (b) {
        var c = b.offset().top, a = c + b.height();
        if ((c >= _scrollTopSrart && c <= _scrollTopEnd) || (a >= _scrollTopSrart && a <= _scrollTopEnd)) {
            b.attr("src", b.attr("p-img"));
            b.removeAttr("data-lazy-src").removeAttr("p-img");
            return true
        }
        return false
    }, lazyLoad: function (a) {
        if (!_binded) {
            Utils.image.bind();
            _binded = true
        }
        $(a).each(function () {
            if (this.tagName != "IMG") {
                return
            }
            var b = $(this);
            if (b.attr("data-lazy-src")) {
                if (!Utils.image.render(b)) {
                    b.attr("src", imagePath + "mask.png");
                    _imgList.push(b)
                }
            }
        })
    }
};
var _window2 = $(window), _binded2 = false,
    _doc2 = document.compatMode == "CSS1Compat" ? document.documentElement : document.body, _scrollTopSrart2 = 0,
    _scrollTopEnd2 = 0, _clientHeight2, _imgList2 = [], _timer2;
Utils.imagelazy = {
    bind: function () {
        var e = function () {
            clearTimeout(_timer2), _timer2 = setTimeout(function () {
                _scrollTopSrart2 = _window2.scrollTop(), _scrollTopEnd2 = _scrollTopSrart2 + _clientHeight2;
                for (var i, n = 0; n < _imgList2.length; n++) {
                    i = _imgList2[n], Utils.imagelazy.render(i) && (_imgList2.splice(n, 1), n--)
                }
                _imgList2 && 0 != _imgList2.length || (_window2.unbind("scroll", e), _window2.unbind("resize", t))
            }, 100)
        }, t = function (e) {
            _clientHeight2 = _doc2.clientHeight
        };
        _window2.bind("scroll", e), _window2.bind("resize", t), _clientHeight2 = _doc2.clientHeight, _scrollTopSrart2 = _window2.scrollTop(), _scrollTopEnd2 = _scrollTopSrart2 + _clientHeight2
    }, render: function (e) {
        var t = e.offset().top, i = t + e.height();
        return (t >= _scrollTopSrart2 && t <= _scrollTopEnd2 || i >= _scrollTopSrart2 && i <= _scrollTopEnd2) && (e.attr("src", e.attr("data-lazy-src")), e.removeAttr("data-lazy-src"), !0)
    }, lazyLoad: function (e) {
        _binded2 || (Utils.imagelazy.bind(), _binded2 = !0), $(e).each(function () {
            if ("IMG" == this.tagName) {
                var e = $(this);
                e.attr("data-lazy-src") && (Utils.imagelazy.render(e) || (e.attr("src", imagePath + "mask.png"), _imgList2.push(e)))
            }
        })
    }
};
Utils.url = {
    getHost: function () {
        return document.location.hostname
    }, getPath: function () {
        return document.location.pathname
    }, getQueryStr: function (b) {
        var a = window.location.search.match(new RegExp("[?&]" + b + "=([^&]+)", "i"));
        if (a == null || a.length < 1) {
            return ""
        }
        return a[1]
    }
};
Utils.dom = {
    addScriptTag: function (src) {
        if (!src) {
            return
        } else {
            0[(document.getElementsByTagName("head")[0] || body).appendChild(document.createElement("script")).src = src]
        }
    }
};
Utils.pkg = function (j, i, h) {
    var d, g, b;
    if (arguments.length == 3) {
        d = j;
        g = i;
        b = h
    } else {
        d = window;
        g = j;
        b = i
    }
    if (!g || !g.length) {
        return null
    }
    var m = g.split(".");
    for (var l = d, k = 0; k < m.length - 1; k++) {
        l[m[k]] || (l[m[k]] = {});
        l = l[m[k]]
    }
    l = (l[m[m.length - 1]] = b || l[m[m.length - 1]] || {});
    return l
};
//弹出窗
ecWap.box = function (context, options) {
    var _doc = document.compatMode == 'CSS1Compat' ? document.documentElement : document.body,
        _docWH = {
            height: Math.max(_doc.scrollHeight, _doc.clientHeight || 0) - 1,
            width: ((Math.max(_doc.scrollWidth, _doc.clientWidth || 0) + 'px') || "100%")
        },
        _opt = options || {},
        _defaultOpt = {
            "className": "ecWap-box",
            "id": "0",
            "width": 90, //注意，这里默认用百分比，也可以用固定宽度px
            "height": 120,
            "ishtml": false, //弹出框内容是否为html内容
            "button": true, //是否显示按钮，默认为显示
            "isconfirm": false, //是否为确认框
            "showTitle": true,
            "position": "center", //默认居中 top，bottom
            "title": "提示",
            "cancel_txt": "取消",
            "ok_txt": "确定"
        };
    //_scrollTop = _window.scrollTop();
    _opt = $.extend(_defaultOpt, _opt);

    if (!_opt.ishtml) {
        context = '<article class="ecWap-dialog-content">' + context + '</article>';
    }
    var html = '<div class="ecWap-mask" id="ecWap-box-bg-' + _opt.id + '" style="height:' + _docWH.height + 'px; width:' + _docWH.width + ';position: absolute; left:0; top:0; z-index:999"></div>'
        + '<article class="' + _opt.className + '" id="ecWap-box-' + _opt.id + '" style="position:fixed;left:50%; z-index:1000">'
        + '<header class="ecWap-box-header' + (!_opt.showTitle ? ' hide' : '') + '">'
        + '<span class="ecWap-box-title">' + (_opt.title) + '</span>'
        + '<a href="javascript:;" class="ecWap-box-close box-close">关闭</a>'
        + '</header>'
        + '<section class="ecWap-box-content">' + context + '</section>'
        + '<footer class="ecWap-box-footer' + ((!_opt.button) ? " hide" : "") + '">'
        + ((_opt.isconfirm) ? '<a href="javascript:;" class="ecWap-box-cancel box-cancel">' + (_opt.cancel_txt) + '</a>' : '')
        + '<a href="javascript:;" class="ecWap-box-ok box-ok"';
    if (_opt.OKFunction) {
        html = html + 'onclick="' + _opt.OKFunction + '"';
    }
    html = html + '>' + (_opt.ok_txt) + '</a>'
        + '</footer>'
        + '</article>';


    //关闭窗口
    ecWap.box.close = function () {
        $('#ecWap-box-bg-' + _opt.id + ', #ecWap-box-' + _opt.id).remove();
        setTimeout(function () {
            $('body').removeClass('active-hide');
        }, 500);
    };
    //定位和重置窗口大小
    ecWap.box.resize = function () {
        var $mask = $('#ecWap-box-bg-' + _opt.id),
            $box = $('#ecWap-box-' + _opt.id),
            _window = $(window),
            _windowH = _window.height(),
            _windowW = _window.width(),
            _top = (_windowH - $box.height()) / 2,
            width = (_opt.width < 100) ? _windowW * (_opt.width * 0.01) : _opt.width;
        $mask.width(_windowW);

        switch (_opt.position) {
            case "center":
            default:
                $box.css({"top": _top + "px", "width": width + "px", "margin-left": "-" + (width / 2) + "px"});
                break;
            case "bottom":
                $box.css({"bottom": 0, "width": width + "px", "margin-left": "-" + (width / 2) + "px"});
                break;
        }
    };
    if (gid('ecWap-box-bg-' + _opt.id)) {
        ecWap.box.close();
    }
    $('body').append(html).addClass('active-hide');

    //定位和设置窗口大小
    ecWap.box.resize();

    $('#ecWap-box-' + _opt.id + ' .box-ok').click(function () {
        if (_opt.onok) {
            _opt.onok(ecWap.box);
        } else {
            ecWap.box.close();
        }
    });
    $('#ecWap-box-' + _opt.id + ' .box-cancel').click(function () {
        if (_opt.oncanel) {
            _opt.oncanel(ecWap.box);
        } else {
            ecWap.box.close();
        }
    });
    $('#ecWap-box-' + _opt.id + ' .box-close').click(function () {
        if (_opt.close) {
            _opt.close(ecWap.box);
        } else {
            ecWap.box.close();
        }
    });


    $(window).resize(ecWap.box.resize);

};

/**
 * 通用从下到上滑动弹框
 * @param context{string} 弹框内容
 * @param options{object} 参数对象
 * @author zhaiyu
 * @return object 弹框对象
 */
ecWap.slideBox = function (context, options) {
    var _doc = document.compatMode == 'CSS1Compat' ? document.documentElement : document.body,
        _docWH = {
            height: Math.max(_doc.scrollHeight, _doc.clientHeight || 0) - 1,
            width: ((Math.max(_doc.scrollWidth, _doc.clientWidth || 0) + 'px') || "100%")
        },
        _opt = options || {},
        _defaultOpt = {
            "className": "ecWap-box-em ecWap-box-lower",
            "id": "0",
            "width": 100, //注意，这里默认用百分比，也可以用固定宽度px
            "height": $(window).height() * 0.4,
            "ishtml": false, //弹出框内容是否为html内容
            "button": true, //是否显示按钮，默认为显示
            "isconfirm": false, //是否为确认框
            "showTitle": true,
            "showClose": true,
            "contentStyle": {}
        };
    _opt = $.extend(_defaultOpt, _opt);
    var mask = null,
        box = null,
        _html = '',
        _window = $(window),
        _windowH = _window.height(),
        _windowW = _window.width();
    var obj = {
        inited: false
    };
    obj.initHTML = function () {
        if (!_opt.ishtml) {
            context = '<article class="ecWap-dialog-content">' + context + '</article>';
        }
        _html = '<div class="ecWap-mask" id="ecWap-box-bg-' + _opt.id + '" style="height:' + _docWH.height + 'px; width:' + _docWH.width + ';position: absolute; left:0; top:0; z-index:990;display:none;"></div>'
            + '<article class="' + _opt.className + '" id="ecWap-box-' + _opt.id + '" style="position:fixed;left:0;width:100%; z-index:991;display:none;">'
            + '<header class="ecWap-box-header' + (!_opt.showTitle ? ' hide' : '') + '">'
            + '<span class="ecWap-box-title">' + ((_opt.title) ? _opt.title : '提示') + '</span>'
            + '<a href="javascript:;" style="z-index:990" class="j_boxclose ecWap-box-close box-close' + (!_opt.showClose ? ' hide' : '') + '">关闭</a></header>' + '<section class="ecWap-box-content">' + context + '</section>'
            + '<footer class="ecWap-box-footer' + ((!_opt.button) ? " hide" : "") + '">' + ((_opt.isconfirm) ? '<a href="javascript:;" class="ecWap-box-cancel box-cancel">' + ((_opt.cancel_txt) ? _opt.cancel_txt : '取消') + '</a>' : '')
            + '<a href="javascript:;" class="ecWap-box-ok box-ok"';
        if (_opt.OKFunction) {
            _html = _html + 'onclick="' + _opt.OKFunction + '"';
        }
        _html = _html + '>' + ((_opt.ok_txt) ? _opt.ok_txt : '确定') + '</a></footer></article>';
    }
    obj.registerEvents = function () {
        box.find('.box-ok').on('click', function () {
            if (_opt.onok) {
                _opt.onok(obj);
            } else {
                obj.close();
            }
        });
        box.find('.box-cancel').on('click', function () {
            if (_opt.oncanel) {
                _opt.oncanel(obj);
            } else {
                obj.close();
            }
        });
        box.find('.box-close').on('click', function () {
            if (_opt.close) {
                _opt.close(obj);
            } else {
                obj.close();
            }
        });
    }
    obj.close = function () {
        var _doc = document.compatMode == 'CSS1Compat' ? document.documentElement : document.body;
        //$("html,body,.ecWap-mask").css({'height':'auto','overflow':'auto'});
        $(".ecWap-mask").css({'height': 'auto', 'overflow': 'auto'});
        mask.hide();
        box.slideUp(250, function () {
        });
    };
    obj.show = function () {
        var _doc = document.compatMode == 'CSS1Compat' ? document.documentElement : document.body;
        //$("html,body,.ecWap-mask").css({"height":$(window).height()+"px","overflow-y":"hidden"});
        $(".ecWap-mask").css({'height': _doc.scrollHeight + 'px'});
        mask.show();
        box.show();
    }
    obj.slideshow = function () {
        var _doc = document.compatMode == 'CSS1Compat' ? document.documentElement : document.body;
        //$("html,body,.ecWap-mask").css({"height":$(window).height()+"px","overflow-y":"hidden"});
        $(".ecWap-mask").css({'height': _doc.scrollHeight + 'px'});
        mask.show();
        box.slideDown(250, function () {
        });
    }
    obj.resize = function () {
        mask.width(_windowW);
        box.css({
            "top": "auto",
            "height": _opt.height + "px"
        });
        box.find(".ecWap-box-content").css(_opt.contentStyle);
    };
    obj.init = function () {
        if (!obj.inited) {
            $('#ecWap-box-bg-' + _opt.id).remove();
            $('#ecWap-box-' + _opt.id).remove();
            obj.initHTML();
            $('body').append(_html);
            mask = $('#ecWap-box-bg-' + _opt.id);
            obj.box = box = $('#ecWap-box-' + _opt.id);
            obj.registerEvents();
            obj.resize();
            obj.inited = true;
        }
    }
    obj.getBox = function () {
        return obj.box;
    }
    obj.init();
    return obj;
};

ecWap.Countdown = function (start, nowTime, obj) {
    $obj = $("#" + obj);
    var startTime = new Date(start),
        time = startTime.format('MM月dd日 HH:mm');
    if (((startTime.getTime() - nowTime) / 1000) > 1) {
        var sectimeold = Math.floor((startTime.getTime() - nowTime) / 1000);
        var dayold = Math.floor(sectimeold / (24 * 60 * 60));
        var hoursold = Math.floor(sectimeold / (60 * 60));
        var minsold = Math.floor((sectimeold - hoursold * 60 * 60) / 60);
        var seconds = sectimeold - hoursold * 60 * 60 - minsold * 60;
        $obj.find("#start").html(time);
        //$obj.find("#day").html(dayold);
        $obj.find("#hour").html(hoursold);
        $obj.find("#minutes").html(minsold);
        $obj.find("#seconds").html(seconds);
        return true;
    } else {
        return false;
    }

};


/**
 * 显示倒计时（24小时以内展示），
 * longtime　剩下时长
 * obj　显示对象
 */
ecWap.showcutdownTime = function (longtime, obj) {
    $obj = $("#" + obj);
    if (longtime > 1000) {
        var sectimeold = Math.floor(longtime / 1000);
        var hoursold = Math.floor(sectimeold / (60 * 60));
        var minsold = Math.floor((sectimeold - hoursold * 60 * 60) / 60);
        var seconds = sectimeold - hoursold * 60 * 60 - minsold * 60;
        $obj.find("#hours").html(hoursold);
        $obj.find("#minutes").html(minsold);
        $obj.find("#seconds").html(seconds);
        return true;
    } else {
        return false;
    }
};
/**
 功能：toast提示
 入参：str:提示语，options：{"toastID":"checkValueToast","time": 3000}
 出参：none
 作者：张鹏飞
 */
ecWap.toast = function (str, options) {
    var _opt = options || {},
        _defaultOpt = {
            "toastID": "checkValueToast",
            "time": 3000//单位为毫秒
        };
    _opt = $.extend(_defaultOpt, _opt);

    if ($("#" + _opt.toastID).length == 0) {
        $('<div class="toast" id="' + _opt.toastID + '" style="display:none"></div>').appendTo("body");
    }
    $("#" + _opt.toastID).text(str || '系统繁忙').show().fadeOut(3000);
};

/**
 功能：抢购倒计时
 入参：start 开始时间，nowTime 当前时间 obj dom id
 出参：none
 作者：张鹏飞
 */
ecWap.CountdownForRush = function (start, nowTime, obj) {
    $obj = $("#" + obj);
    var startTime = new Date(start);
    if (((startTime.getTime() - nowTime) / 1000) > 0) {
        var sectimeold = Math.floor((startTime.getTime() - nowTime) / 1000);
        var dayold = Math.floor(sectimeold / (24 * 60 * 60));
        var hoursold = Math.floor((sectimeold) / (60 * 60));//天数转化成了小时
        var minsold = Math.floor((sectimeold - hoursold * 60 * 60) / 60);
        var seconds = sectimeold - hoursold * 60 * 60 - minsold * 60;
        // $obj.find("#day").html(dayold);
        $obj.find("#hour").html(hoursold);
        $obj.find("#minutes").html(minsold);
        $obj.find("#seconds").html(seconds);
        return true;
    } else {
        return false;
    }
};

/**
 功能：拉起键盘并防止遮挡
 入参：obj jquery对象
 出参：none
 作者：zhaiyu
 */
ecWap.pullUpKeyboard = function (obj, winHeight) {
    if (winHeight > 0) {
        //页面高度变化控制
        $(window).resize(function () {
            var thisHeight = $(this).height();
            if (winHeight - thisHeight < 50) {
                obj.blur();
            }
        });
        //所有input被聚焦，拉起键盘并滚动页面到input位置
        obj.on('focus', function (e) {
            var me = $(this);
            setTimeout(function () {
                /* $("html,body").animate({
                 scrollTop: me.offset().top - 100
                 }, 500);*/
                $("html,body").scrollTop(me.offset().top - 100);
            }, 500);
        });
    }
}

/**
 功能：获取ur上某个属性值
 入参：string 参数名
 出参：参数值
 作者：zhaiyu
 */
ecWap.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}

/**
 * 通用列表加载方法
 * @param {Object} 参数对象
 * @return {function} 回调函数
 * @author zhaiyu
 */
ecWap.listload = function (obj, callback) {
    var opt = $.extend({
        lastItemHandle: '.j_list:last-child',
        loadurl: "",
        params: null,
        wrapHandle: '#listbox',
        loading: null,//加载提示框对象
        stop: false,
        scrollObj: window,
        event: 'sroll'
    }, obj || {});
    var win = $(opt.scrollObj);
    var wrapbox = $(opt.wrapHandle);
    var stop = opt.stop;
    var o = {
        /**
         * @method 获取列表容器对象
         * @public
         */
        getDatabox: function () {
            return wrapbox;
        },
        /**
         * @method 设置获取数据参数
         * @public
         * @param {object} 参数对象
         */
        setParams: function (obj) {
            opt.params = obj;
        },
        /** @method 设置获取数据参数 */
        getParams: function () {
            return opt.params;
        },
        /** @method 设置可用数据
         *  @public
         *  @param {object} 对象
         */
        setData: function (d) {
            o.data = d;
        },
        /** @method 获取可用数据 */
        getData: function () {
            return o.data
        },
        setStop: function (v /*Boolean*/) {
            stop = v;
        },
        /** @method 加载数据
         *  @public
         */
        loadData: function () {
            if (opt.loadurl) {
                var p = o.getParams();
                if (opt.loading) opt.loading.show();
                $.getJSON(opt.loadurl, p, function (data) {
                    o.setData(data);
                    if ($.isFunction(callback)) callback(data);
                    opt.loading.hide();
                });
            }
        },
        init: function () {
            if (opt.event == 'scroll') {
                win.on('scroll', function () {
                    //手机端滚动到底部加载height=device-height;
                    if (!stop && $(opt.lastItemHandle).is(':visible') && (win.scrollTop() + win.height() >= $(document).height()) && opt.loadurl) {
                        o.setStop(true);
                        var p = o.getParams();
                        if (opt.loading) opt.loading.show();
                        $.getJSON(opt.loadurl, p, function (data) {
                            o.setData(data);
                            if ($.isFunction(callback)) callback(data);
                            opt.loading.hide();
                        });
                    }
                });
            }
        }
    }
    o.init();
    return o;
}

/**
 * 通用loading对象
 * @param {Object} 参数对象
 * @return {Object} 返回一个公有对象
 * @author zhaiyu
 */
ecWap.loading = function (obj) {
    var opt = $.extend({
        icon: true,
        content: "",
        loadingStyle: {},
        loadingClass: "",
        iconClass: "",
        iconStyle: {},
        textStyle: {
            "text-align": "center",
            "display": "block"
        },
        textClass: ""
    }, obj || {});
    var randomStr = Math.round(Math.random() * 1e6 + 1) + "",
        _content = opt.content;
    var o = {
        /** 初始化 */
        init: function () {
            o.initHtml();
            o.initUI();
        },
        /** 初始化html*/
        initHtml: function () {
            if (!o.html) {
                o.html = $('<section class="j_loader' + randomStr + ' system-loading" id="j_loader' + randomStr + '"><div class="j_loadermain loading"><span class="j_icon icon-loading-big"></span><span class="j_content"></span></div></section>');
            }
            if (_content) {
                o.html.find('.j_content').html(_content);
            }
            return o.html;
        },
        /** 设置样式*/
        initUI: function () {
            if (!opt.icon) {
                o.html.find('.j_icon').hide();
            }
            o.html.find('.j_loadermain').css(opt.loadingStyle).addClass(opt.loadingClass);
            o.html.find('.j_content').css(opt.textStyle).addClass(opt.textClass);

            o.html.find('.j_icon').css(opt.iconStyle).addClass(opt.iconClass);
            $('body').append(o.html.hide());
        },
        /**
         * 设置文本内容
         * @param {string} 文本
         */
        setContent: function (s) {
            o.html.find('.j_content').text(s);
            return o;
        },
        /** loading图标隐藏 */
        showIcon: function (v) {
            if (!v) {
                o.html.find('.j_icon').hide();
            } else {
                o.html.find('.j_icon').show();
            }
            return o;
        },
        /** loading显示 */
        show: function (delay) {
            o.html.show();
            if (delay > 0) {
                setTimeout(function () {
                    o.html.hide();
                }, delay);
            }
            return o;
        },
        /** loading隐藏 */
        hide: function () {
            o.html.hide();
            return o;
        },
        getHtml: function () {
            return o.html;
        }
    };

    o.init();
    return o;
};