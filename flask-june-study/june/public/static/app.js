Date.prototype.Format = function(fmt){ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //
    "d+" : this.getDate(),                    //
    "h+" : this.getHours(),                   //
    "m+" : this.getMinutes(),                 //
    "s+" : this.getSeconds(),                 //
    "q+" : Math.floor((this.getMonth()+3)/3), //
    "S"  : this.getMilliseconds()             //
  };   
    
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
            fmt = fmt.replace( RegExp.$1, (RegExp.$1.length==1) ?
                (o[k]) :
                (("00"+ o[k]).substr((""+ o[k]).length))
                );
  return fmt;   
}

function jstrace(obj) {
	if ((typeof console)=='undefined'){
		
	} else {
	    var dt=new Date();
	    // yyyy-MM-dd
		console.info("["+dt.Format('yyyyMMddhhmmss')+"]: "+obj);
	}
}

function require(e, t, n) {
	jstrace('require start:'+e+','+t+','+n);
    var i = require.resolve(e);
    if (null == i) {
        n = n || e;
        t = t || "root";
        var r = new Error('Failed to require "' + n + '" from "' + t + '"');
        r.path = n;
        r.parent = t;
        r.require = true;
        throw r;
    }
    var o = require.modules[i];
    if (!o._resolving && !o.exports) {
        var s = {};
        s.exports = {};
        s.client = s.component = true;
        o._resolving = true;
        jstrace('o.call');
        o.call(this, s.exports, require.relative(i), s);
        delete o._resolving;
        o.exports = s.exports;
    }
    jstrace('require end');
    return o.exports;
}

require.modules = {};

require.aliases = {};

require.resolve = function(e) {
    if (e.charAt(0) === "/") e = e.slice(1);
    var t = [ e, e + ".js", e + ".json", e + "/index.js", e + "/index.json" ];
    for (var n = 0; n < t.length; n++) {
        var e = t[n];
        if (require.modules.hasOwnProperty(e)) return e;
        if (require.aliases.hasOwnProperty(e)) return require.aliases[e];
    }
};

require.normalize = function(e, t) {
    var n = [];
    if ("." != t.charAt(0)) return t;
    e = e.split("/");
    t = t.split("/");
    for (var i = 0; i < t.length; ++i) {
        if (".." == t[i]) {
            e.pop();
        } else if ("." != t[i] && "" != t[i]) {
            n.push(t[i]);
        }
    }
    return e.concat(n).join("/");
};

require.register = function(e, t) {
    require.modules[e] = t;
};

require.alias = function(e, t) {
    if (!require.modules.hasOwnProperty(e)) {
        throw new Error('Failed to alias "' + e + '", it does not exist');
    }
    require.aliases[t] = e;
};

require.relative = function(e) {
    var t = require.normalize(e, "..");
    function n(e, t) {
        var n = e.length;
        while (n--) {
            if (e[n] === t) return n;
        }
        return -1;
    }
    function i(t) {
        var n = i.resolve(t);
        return require(n, e, t);
    }
    i.resolve = function(i) {
        var r = i.charAt(0);
        if ("/" == r) return i.slice(1);
        if ("." == r) return require.normalize(t, i);
        var o = e.split("/");
        var s = n(o, "deps") + 1;
        if (!s) s = 0;
        i = o.slice(0, s + 1).join("/") + "/deps/" + i;
        return i;
    };
    i.exists = function(e) {
        return require.modules.hasOwnProperty(i.resolve(e));
    };
    return i;
};

require.register("component-jquery/index.js", function(e, t, n) {
	// 
	jstrace('register:component-jquery/index.js:'+','+e+','+t+','+n);
    (function(e, t) {
        if (typeof n === "object" && typeof n.exports === "object") {
            n.exports = e.document ? t(e, true) : function(e) {
                if (!e.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return t(e);
            };
        } else {
            t(e);
        }
    })(typeof window !== "undefined" ? window : this, function(e, t) {
        var n = [];
        var i = n.slice;
        var r = n.concat;
        var o = n.push;
        var s = n.indexOf;
        var a = {};
        var l = a.toString;
        var u = a.hasOwnProperty;
        var f = {};
        var c = "1.11.1", d = function(e, t) {
            return new d.fn.init(e, t);
        }, p = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, h = /^-ms-/, m = /-([\da-z])/gi, g = function(e, t) {
            return t.toUpperCase();
        };
        d.fn = d.prototype = {
            jquery: c,
            constructor: d,
            selector: "",
            length: 0,
            toArray: function() {
                return i.call(this);
            },
            get: function(e) {
                return e != null ? e < 0 ? this[e + this.length] : this[e] : i.call(this);
            },
            pushStack: function(e) {
                var t = d.merge(this.constructor(), e);
                t.prevObject = this;
                t.context = this.context;
                return t;
            },
            each: function(e, t) {
                return d.each(this, e, t);
            },
            map: function(e) {
                return this.pushStack(d.map(this, function(t, n) {
                    return e.call(t, n, t);
                }));
            },
            slice: function() {
                return this.pushStack(i.apply(this, arguments));
            },
            first: function() {
                return this.eq(0);
            },
            last: function() {
                return this.eq(-1);
            },
            eq: function(e) {
                var t = this.length, n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [ this[n] ] : []);
            },
            end: function() {
                return this.prevObject || this.constructor(null);
            },
            push: o,
            sort: n.sort,
            splice: n.splice
        };
        d.extend = d.fn.extend = function() {
            var e, t, n, i, r, o, s = arguments[0] || {}, a = 1, l = arguments.length, u = false;
            if (typeof s === "boolean") {
                u = s;
                s = arguments[a] || {};
                a++;
            }
            if (typeof s !== "object" && !d.isFunction(s)) {
                s = {};
            }
            if (a === l) {
                s = this;
                a--;
            }
            for (;a < l; a++) {
                if ((r = arguments[a]) != null) {
                    for (i in r) {
                        e = s[i];
                        n = r[i];
                        if (s === n) {
                            continue;
                        }
                        if (u && n && (d.isPlainObject(n) || (t = d.isArray(n)))) {
                            if (t) {
                                t = false;
                                o = e && d.isArray(e) ? e : [];
                            } else {
                                o = e && d.isPlainObject(e) ? e : {};
                            }
                            s[i] = d.extend(u, o, n);
                        } else if (n !== undefined) {
                            s[i] = n;
                        }
                    }
                }
            }
            return s;
        };
        d.extend({
            expando: "jQuery" + (c + Math.random()).replace(/\D/g, ""),
            isReady: true,
            error: function(e) {
                throw new Error(e);
            },
            noop: function() {},
            isFunction: function(e) {
                return d.type(e) === "function";
            },
            isArray: Array.isArray || function(e) {
                return d.type(e) === "array";
            },
            isWindow: function(e) {
                return e != null && e == e.window;
            },
            isNumeric: function(e) {
                return !d.isArray(e) && e - parseFloat(e) >= 0;
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) {
                    return false;
                }
                return true;
            },
            isPlainObject: function(e) {
                var t;
                if (!e || d.type(e) !== "object" || e.nodeType || d.isWindow(e)) {
                    return false;
                }
                try {
                    if (e.constructor && !u.call(e, "constructor") && !u.call(e.constructor.prototype, "isPrototypeOf")) {
                        return false;
                    }
                } catch (n) {
                    return false;
                }
                if (f.ownLast) {
                    for (t in e) {
                        return u.call(e, t);
                    }
                }
                for (t in e) {}
                return t === undefined || u.call(e, t);
            },
            type: function(e) {
                if (e == null) {
                    return e + "";
                }
                return typeof e === "object" || typeof e === "function" ? a[l.call(e)] || "object" : typeof e;
            },
            globalEval: function(t) {
                if (t && d.trim(t)) {
                    (e.execScript || function(t) {
                        e["eval"].call(e, t);
                    })(t);
                }
            },
            camelCase: function(e) {
                return e.replace(h, "ms-").replace(m, g);
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
            },
            each: function(e, t, n) {
                var i, r = 0, o = e.length, s = v(e);
                if (n) {
                    if (s) {
                        for (;r < o; r++) {
                            i = t.apply(e[r], n);
                            if (i === false) {
                                break;
                            }
                        }
                    } else {
                        for (r in e) {
                            i = t.apply(e[r], n);
                            if (i === false) {
                                break;
                            }
                        }
                    }
                } else {
                    if (s) {
                        for (;r < o; r++) {
                            i = t.call(e[r], r, e[r]);
                            if (i === false) {
                                break;
                            }
                        }
                    } else {
                        for (r in e) {
                            i = t.call(e[r], r, e[r]);
                            if (i === false) {
                                break;
                            }
                        }
                    }
                }
                return e;
            },
            trim: function(e) {
                return e == null ? "" : (e + "").replace(p, "");
            },
            makeArray: function(e, t) {
                var n = t || [];
                if (e != null) {
                    if (v(Object(e))) {
                        d.merge(n, typeof e === "string" ? [ e ] : e);
                    } else {
                        o.call(n, e);
                    }
                }
                return n;
            },
            inArray: function(e, t, n) {
                var i;
                if (t) {
                    if (s) {
                        return s.call(t, e, n);
                    }
                    i = t.length;
                    n = n ? n < 0 ? Math.max(0, i + n) : n : 0;
                    for (;n < i; n++) {
                        if (n in t && t[n] === e) {
                            return n;
                        }
                    }
                }
                return -1;
            },
            merge: function(e, t) {
                var n = +t.length, i = 0, r = e.length;
                while (i < n) {
                    e[r++] = t[i++];
                }
                if (n !== n) {
                    while (t[i] !== undefined) {
                        e[r++] = t[i++];
                    }
                }
                e.length = r;
                return e;
            },
            grep: function(e, t, n) {
                var i, r = [], o = 0, s = e.length, a = !n;
                for (;o < s; o++) {
                    i = !t(e[o], o);
                    if (i !== a) {
                        r.push(e[o]);
                    }
                }
                return r;
            },
            map: function(e, t, n) {
                var i, o = 0, s = e.length, a = v(e), l = [];
                if (a) {
                    for (;o < s; o++) {
                        i = t(e[o], o, n);
                        if (i != null) {
                            l.push(i);
                        }
                    }
                } else {
                    for (o in e) {
                        i = t(e[o], o, n);
                        if (i != null) {
                            l.push(i);
                        }
                    }
                }
                return r.apply([], l);
            },
            guid: 1,
            proxy: function(e, t) {
                var n, r, o;
                if (typeof t === "string") {
                    o = e[t];
                    t = e;
                    e = o;
                }
                if (!d.isFunction(e)) {
                    return undefined;
                }
                n = i.call(arguments, 2);
                r = function() {
                    return e.apply(t || this, n.concat(i.call(arguments)));
                };
                r.guid = e.guid = e.guid || d.guid++;
                return r;
            },
            now: function() {
                return +new Date();
            },
            support: f
        });
        d.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            a["[object " + t + "]"] = t.toLowerCase();
        });
        function v(e) {
            var t = e.length, n = d.type(e);
            if (n === "function" || d.isWindow(e)) {
                return false;
            }
            if (e.nodeType === 1 && t) {
                return true;
            }
            return n === "array" || t === 0 || typeof t === "number" && t > 0 && t - 1 in e;
        }
        var y = function(e) {
            var t, n, i, r, o, s, a, l, u, f, c, d, p, h, m, g, v, y, b, x = "sizzle" + -new Date(), w = e.document, C = 0, T = 0, E = st(), k = st(), N = st(), $ = function(e, t) {
                if (e === t) {
                    c = true;
                }
                return 0;
            }, S = typeof undefined, j = 1 << 31, D = {}.hasOwnProperty, A = [], L = A.pop, q = A.push, H = A.push, F = A.slice, _ = A.indexOf || function(e) {
                var t = 0, n = this.length;
                for (;t < n; t++) {
                    if (this[t] === e) {
                        return t;
                    }
                }
                return -1;
            }, O = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", P = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", B = M.replace("w", "w#"), W = "\\[" + P + "*(" + M + ")(?:" + P + "*([*^$|!~]?=)" + P + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + B + "))|)" + P + "*\\]", R = ":(" + M + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|" + ".*" + ")\\)|)", I = new RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$", "g"), z = new RegExp("^" + P + "*," + P + "*"), U = new RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"), X = new RegExp("=" + P + "*([^\\]'\"]*?)" + P + "*\\]", "g"), V = new RegExp(R), J = new RegExp("^" + B + "$"), Y = {
                ID: new RegExp("^#(" + M + ")"),
                CLASS: new RegExp("^\\.(" + M + ")"),
                TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + W),
                PSEUDO: new RegExp("^" + R),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + O + ")$", "i"),
                needsContext: new RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)", "i")
            }, Q = /^(?:input|select|textarea|button)$/i, G = /^h\d$/i, K = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, et = /[+~]/, tt = /'|\\/g, nt = new RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)", "ig"), it = function(e, t, n) {
                var i = "0x" + t - 65536;
                return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, i & 1023 | 56320);
            };
            try {
                H.apply(A = F.call(w.childNodes), w.childNodes);
                A[w.childNodes.length].nodeType;
            } catch (rt) {
                H = {
                    apply: A.length ? function(e, t) {
                        q.apply(e, F.call(t));
                    } : function(e, t) {
                        var n = e.length, i = 0;
                        while (e[n++] = t[i++]) {}
                        e.length = n - 1;
                    }
                };
            }
            function ot(e, t, i, r) {
                var o, a, u, f, c, h, v, y, C, T;
                if ((t ? t.ownerDocument || t : w) !== p) {
                    d(t);
                }
                t = t || p;
                i = i || [];
                if (!e || typeof e !== "string") {
                    return i;
                }
                if ((f = t.nodeType) !== 1 && f !== 9) {
                    return [];
                }
                if (m && !r) {
                    if (o = Z.exec(e)) {
                        if (u = o[1]) {
                            if (f === 9) {
                                a = t.getElementById(u);
                                if (a && a.parentNode) {
                                    if (a.id === u) {
                                        i.push(a);
                                        return i;
                                    }
                                } else {
                                    return i;
                                }
                            } else {
                                if (t.ownerDocument && (a = t.ownerDocument.getElementById(u)) && b(t, a) && a.id === u) {
                                    i.push(a);
                                    return i;
                                }
                            }
                        } else if (o[2]) {
                            H.apply(i, t.getElementsByTagName(e));
                            return i;
                        } else if ((u = o[3]) && n.getElementsByClassName && t.getElementsByClassName) {
                            H.apply(i, t.getElementsByClassName(u));
                            return i;
                        }
                    }
                    if (n.qsa && (!g || !g.test(e))) {
                        y = v = x;
                        C = t;
                        T = f === 9 && e;
                        if (f === 1 && t.nodeName.toLowerCase() !== "object") {
                            h = s(e);
                            if (v = t.getAttribute("id")) {
                                y = v.replace(tt, "\\$&");
                            } else {
                                t.setAttribute("id", y);
                            }
                            y = "[id='" + y + "'] ";
                            c = h.length;
                            while (c--) {
                                h[c] = y + gt(h[c]);
                            }
                            C = et.test(e) && ht(t.parentNode) || t;
                            T = h.join(",");
                        }
                        if (T) {
                            try {
                                H.apply(i, C.querySelectorAll(T));
                                return i;
                            } catch (E) {} finally {
                                if (!v) {
                                    t.removeAttribute("id");
                                }
                            }
                        }
                    }
                }
                return l(e.replace(I, "$1"), t, i, r);
            }
            function st() {
                var e = [];
                function t(n, r) {
                    if (e.push(n + " ") > i.cacheLength) {
                        delete t[e.shift()];
                    }
                    return t[n + " "] = r;
                }
                return t;
            }
            function at(e) {
                e[x] = true;
                return e;
            }
            function lt(e) {
                var t = p.createElement("div");
                try {
                    return !!e(t);
                } catch (n) {
                    return false;
                } finally {
                    if (t.parentNode) {
                        t.parentNode.removeChild(t);
                    }
                    t = null;
                }
            }
            function ut(e, t) {
                var n = e.split("|"), r = e.length;
                while (r--) {
                    i.attrHandle[n[r]] = t;
                }
            }
            function ft(e, t) {
                var n = t && e, i = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || j) - (~e.sourceIndex || j);
                if (i) {
                    return i;
                }
                if (n) {
                    while (n = n.nextSibling) {
                        if (n === t) {
                            return -1;
                        }
                    }
                }
                return e ? 1 : -1;
            }
            function ct(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return n === "input" && t.type === e;
                };
            }
            function dt(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return (n === "input" || n === "button") && t.type === e;
                };
            }
            function pt(e) {
                return at(function(t) {
                    t = +t;
                    return at(function(n, i) {
                        var r, o = e([], n.length, t), s = o.length;
                        while (s--) {
                            if (n[r = o[s]]) {
                                n[r] = !(i[r] = n[r]);
                            }
                        }
                    });
                });
            }
            function ht(e) {
                return e && typeof e.getElementsByTagName !== S && e;
            }
            n = ot.support = {};
            o = ot.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? t.nodeName !== "HTML" : false;
            };
            d = ot.setDocument = function(e) {
                var t, r = e ? e.ownerDocument || e : w, s = r.defaultView;
                if (r === p || r.nodeType !== 9 || !r.documentElement) {
                    return p;
                }
                p = r;
                h = r.documentElement;
                m = !o(r);
                if (s && s !== s.top) {
                    if (s.addEventListener) {
                        s.addEventListener("unload", function() {
                            d();
                        }, false);
                    } else if (s.attachEvent) {
                        s.attachEvent("onunload", function() {
                            d();
                        });
                    }
                }
                n.attributes = lt(function(e) {
                    e.className = "i";
                    return !e.getAttribute("className");
                });
                n.getElementsByTagName = lt(function(e) {
                    e.appendChild(r.createComment(""));
                    return !e.getElementsByTagName("*").length;
                });
                n.getElementsByClassName = K.test(r.getElementsByClassName) && lt(function(e) {
                    e.innerHTML = "<div class='a'></div><div class='a i'></div>";
                    e.firstChild.className = "i";
                    return e.getElementsByClassName("i").length === 2;
                });
                n.getById = lt(function(e) {
                    h.appendChild(e).id = x;
                    return !r.getElementsByName || !r.getElementsByName(x).length;
                });
                if (n.getById) {
                    i.find["ID"] = function(e, t) {
                        if (typeof t.getElementById !== S && m) {
                            var n = t.getElementById(e);
                            return n && n.parentNode ? [ n ] : [];
                        }
                    };
                    i.filter["ID"] = function(e) {
                        var t = e.replace(nt, it);
                        return function(e) {
                            return e.getAttribute("id") === t;
                        };
                    };
                } else {
                    delete i.find["ID"];
                    i.filter["ID"] = function(e) {
                        var t = e.replace(nt, it);
                        return function(e) {
                            var n = typeof e.getAttributeNode !== S && e.getAttributeNode("id");
                            return n && n.value === t;
                        };
                    };
                }
                i.find["TAG"] = n.getElementsByTagName ? function(e, t) {
                    if (typeof t.getElementsByTagName !== S) {
                        return t.getElementsByTagName(e);
                    }
                } : function(e, t) {
                    var n, i = [], r = 0, o = t.getElementsByTagName(e);
                    if (e === "*") {
                        while (n = o[r++]) {
                            if (n.nodeType === 1) {
                                i.push(n);
                            }
                        }
                        return i;
                    }
                    return o;
                };
                i.find["CLASS"] = n.getElementsByClassName && function(e, t) {
                    if (typeof t.getElementsByClassName !== S && m) {
                        return t.getElementsByClassName(e);
                    }
                };
                v = [];
                g = [];
                if (n.qsa = K.test(r.querySelectorAll)) {
                    lt(function(e) {
                        e.innerHTML = "<select msallowclip=''><option selected=''></option></select>";
                        if (e.querySelectorAll("[msallowclip^='']").length) {
                            g.push("[*^$]=" + P + "*(?:''|\"\")");
                        }
                        if (!e.querySelectorAll("[selected]").length) {
                            g.push("\\[" + P + "*(?:value|" + O + ")");
                        }
                        if (!e.querySelectorAll(":checked").length) {
                            g.push(":checked");
                        }
                    });
                    lt(function(e) {
                        var t = r.createElement("input");
                        t.setAttribute("type", "hidden");
                        e.appendChild(t).setAttribute("name", "D");
                        if (e.querySelectorAll("[name=d]").length) {
                            g.push("name" + P + "*[*^$|!~]?=");
                        }
                        if (!e.querySelectorAll(":enabled").length) {
                            g.push(":enabled", ":disabled");
                        }
                        e.querySelectorAll("*,:x");
                        g.push(",.*:");
                    });
                }
                if (n.matchesSelector = K.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) {
                    lt(function(e) {
                        n.disconnectedMatch = y.call(e, "div");
                        y.call(e, "[s!='']:x");
                        v.push("!=", R);
                    });
                }
                g = g.length && new RegExp(g.join("|"));
                v = v.length && new RegExp(v.join("|"));
                t = K.test(h.compareDocumentPosition);
                b = t || K.test(h.contains) ? function(e, t) {
                    var n = e.nodeType === 9 ? e.documentElement : e, i = t && t.parentNode;
                    return e === i || !!(i && i.nodeType === 1 && (n.contains ? n.contains(i) : e.compareDocumentPosition && e.compareDocumentPosition(i) & 16));
                } : function(e, t) {
                    if (t) {
                        while (t = t.parentNode) {
                            if (t === e) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                $ = t ? function(e, t) {
                    if (e === t) {
                        c = true;
                        return 0;
                    }
                    var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    if (i) {
                        return i;
                    }
                    i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1;
                    if (i & 1 || !n.sortDetached && t.compareDocumentPosition(e) === i) {
                        if (e === r || e.ownerDocument === w && b(w, e)) {
                            return -1;
                        }
                        if (t === r || t.ownerDocument === w && b(w, t)) {
                            return 1;
                        }
                        return f ? _.call(f, e) - _.call(f, t) : 0;
                    }
                    return i & 4 ? -1 : 1;
                } : function(e, t) {
                    if (e === t) {
                        c = true;
                        return 0;
                    }
                    var n, i = 0, o = e.parentNode, s = t.parentNode, a = [ e ], l = [ t ];
                    if (!o || !s) {
                        return e === r ? -1 : t === r ? 1 : o ? -1 : s ? 1 : f ? _.call(f, e) - _.call(f, t) : 0;
                    } else if (o === s) {
                        return ft(e, t);
                    }
                    n = e;
                    while (n = n.parentNode) {
                        a.unshift(n);
                    }
                    n = t;
                    while (n = n.parentNode) {
                        l.unshift(n);
                    }
                    while (a[i] === l[i]) {
                        i++;
                    }
                    return i ? ft(a[i], l[i]) : a[i] === w ? -1 : l[i] === w ? 1 : 0;
                };
                return r;
            };
            ot.matches = function(e, t) {
                return ot(e, null, null, t);
            };
            ot.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== p) {
                    d(e);
                }
                t = t.replace(X, "='$1']");
                if (n.matchesSelector && m && (!v || !v.test(t)) && (!g || !g.test(t))) {
                    try {
                        var i = y.call(e, t);
                        if (i || n.disconnectedMatch || e.document && e.document.nodeType !== 11) {
                            return i;
                        }
                    } catch (r) {}
                }
                return ot(t, p, null, [ e ]).length > 0;
            };
            ot.contains = function(e, t) {
                if ((e.ownerDocument || e) !== p) {
                    d(e);
                }
                return b(e, t);
            };
            ot.attr = function(e, t) {
                if ((e.ownerDocument || e) !== p) {
                    d(e);
                }
                var r = i.attrHandle[t.toLowerCase()], o = r && D.call(i.attrHandle, t.toLowerCase()) ? r(e, t, !m) : undefined;
                return o !== undefined ? o : n.attributes || !m ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null;
            };
            ot.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e);
            };
            ot.uniqueSort = function(e) {
                var t, i = [], r = 0, o = 0;
                c = !n.detectDuplicates;
                f = !n.sortStable && e.slice(0);
                e.sort($);
                if (c) {
                    while (t = e[o++]) {
                        if (t === e[o]) {
                            r = i.push(o);
                        }
                    }
                    while (r--) {
                        e.splice(i[r], 1);
                    }
                }
                f = null;
                return e;
            };
            r = ot.getText = function(e) {
                var t, n = "", i = 0, o = e.nodeType;
                if (!o) {
                    while (t = e[i++]) {
                        n += r(t);
                    }
                } else if (o === 1 || o === 9 || o === 11) {
                    if (typeof e.textContent === "string") {
                        return e.textContent;
                    } else {
                        for (e = e.firstChild; e; e = e.nextSibling) {
                            n += r(e);
                        }
                    }
                } else if (o === 3 || o === 4) {
                    return e.nodeValue;
                }
                return n;
            };
            i = ot.selectors = {
                cacheLength: 50,
                createPseudo: at,
                match: Y,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: true
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: true
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        e[1] = e[1].replace(nt, it);
                        e[3] = (e[3] || e[4] || e[5] || "").replace(nt, it);
                        if (e[2] === "~=") {
                            e[3] = " " + e[3] + " ";
                        }
                        return e.slice(0, 4);
                    },
                    CHILD: function(e) {
                        e[1] = e[1].toLowerCase();
                        if (e[1].slice(0, 3) === "nth") {
                            if (!e[3]) {
                                ot.error(e[0]);
                            }
                            e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd"));
                            e[5] = +(e[7] + e[8] || e[3] === "odd");
                        } else if (e[3]) {
                            ot.error(e[0]);
                        }
                        return e;
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        if (Y["CHILD"].test(e[0])) {
                            return null;
                        }
                        if (e[3]) {
                            e[2] = e[4] || e[5] || "";
                        } else if (n && V.test(n) && (t = s(n, true)) && (t = n.indexOf(")", n.length - t) - n.length)) {
                            e[0] = e[0].slice(0, t);
                            e[2] = n.slice(0, t);
                        }
                        return e.slice(0, 3);
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(nt, it).toLowerCase();
                        return e === "*" ? function() {
                            return true;
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t;
                        };
                    },
                    CLASS: function(e) {
                        var t = E[e + " "];
                        return t || (t = new RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) && E(e, function(e) {
                            return t.test(typeof e.className === "string" && e.className || typeof e.getAttribute !== S && e.getAttribute("class") || "");
                        });
                    },
                    ATTR: function(e, t, n) {
                        return function(i) {
                            var r = ot.attr(i, e);
                            if (r == null) {
                                return t === "!=";
                            }
                            if (!t) {
                                return true;
                            }
                            r += "";
                            return t === "=" ? r === n : t === "!=" ? r !== n : t === "^=" ? n && r.indexOf(n) === 0 : t === "*=" ? n && r.indexOf(n) > -1 : t === "$=" ? n && r.slice(-n.length) === n : t === "~=" ? (" " + r + " ").indexOf(n) > -1 : t === "|=" ? r === n || r.slice(0, n.length + 1) === n + "-" : false;
                        };
                    },
                    CHILD: function(e, t, n, i, r) {
                        var o = e.slice(0, 3) !== "nth", s = e.slice(-4) !== "last", a = t === "of-type";
                        return i === 1 && r === 0 ? function(e) {
                            return !!e.parentNode;
                        } : function(t, n, l) {
                            var u, f, c, d, p, h, m = o !== s ? "nextSibling" : "previousSibling", g = t.parentNode, v = a && t.nodeName.toLowerCase(), y = !l && !a;
                            if (g) {
                                if (o) {
                                    while (m) {
                                        c = t;
                                        while (c = c[m]) {
                                            if (a ? c.nodeName.toLowerCase() === v : c.nodeType === 1) {
                                                return false;
                                            }
                                        }
                                        h = m = e === "only" && !h && "nextSibling";
                                    }
                                    return true;
                                }
                                h = [ s ? g.firstChild : g.lastChild ];
                                if (s && y) {
                                    f = g[x] || (g[x] = {});
                                    u = f[e] || [];
                                    p = u[0] === C && u[1];
                                    d = u[0] === C && u[2];
                                    c = p && g.childNodes[p];
                                    while (c = ++p && c && c[m] || (d = p = 0) || h.pop()) {
                                        if (c.nodeType === 1 && ++d && c === t) {
                                            f[e] = [ C, p, d ];
                                            break;
                                        }
                                    }
                                } else if (y && (u = (t[x] || (t[x] = {}))[e]) && u[0] === C) {
                                    d = u[1];
                                } else {
                                    while (c = ++p && c && c[m] || (d = p = 0) || h.pop()) {
                                        if ((a ? c.nodeName.toLowerCase() === v : c.nodeType === 1) && ++d) {
                                            if (y) {
                                                (c[x] || (c[x] = {}))[e] = [ C, d ];
                                            }
                                            if (c === t) {
                                                break;
                                            }
                                        }
                                    }
                                }
                                d -= r;
                                return d === i || d % i === 0 && d / i >= 0;
                            }
                        };
                    },
                    PSEUDO: function(e, t) {
                        var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || ot.error("unsupported pseudo: " + e);
                        if (r[x]) {
                            return r(t);
                        }
                        if (r.length > 1) {
                            n = [ e, e, "", t ];
                            return i.setFilters.hasOwnProperty(e.toLowerCase()) ? at(function(e, n) {
                                var i, o = r(e, t), s = o.length;
                                while (s--) {
                                    i = _.call(e, o[s]);
                                    e[i] = !(n[i] = o[s]);
                                }
                            }) : function(e) {
                                return r(e, 0, n);
                            };
                        }
                        return r;
                    }
                },
                pseudos: {
                    not: at(function(e) {
                        var t = [], n = [], i = a(e.replace(I, "$1"));
                        return i[x] ? at(function(e, t, n, r) {
                            var o, s = i(e, null, r, []), a = e.length;
                            while (a--) {
                                if (o = s[a]) {
                                    e[a] = !(t[a] = o);
                                }
                            }
                        }) : function(e, r, o) {
                            t[0] = e;
                            i(t, null, o, n);
                            return !n.pop();
                        };
                    }),
                    has: at(function(e) {
                        return function(t) {
                            return ot(e, t).length > 0;
                        };
                    }),
                    contains: at(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText || r(t)).indexOf(e) > -1;
                        };
                    }),
                    lang: at(function(e) {
                        if (!J.test(e || "")) {
                            ot.error("unsupported lang: " + e);
                        }
                        e = e.replace(nt, it).toLowerCase();
                        return function(t) {
                            var n;
                            do {
                                if (n = m ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) {
                                    n = n.toLowerCase();
                                    return n === e || n.indexOf(e + "-") === 0;
                                }
                            } while ((t = t.parentNode) && t.nodeType === 1);
                            return false;
                        };
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id;
                    },
                    root: function(e) {
                        return e === h;
                    },
                    focus: function(e) {
                        return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                    },
                    enabled: function(e) {
                        return e.disabled === false;
                    },
                    disabled: function(e) {
                        return e.disabled === true;
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return t === "input" && !!e.checked || t === "option" && !!e.selected;
                    },
                    selected: function(e) {
                        if (e.parentNode) {
                            e.parentNode.selectedIndex;
                        }
                        return e.selected === true;
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling) {
                            if (e.nodeType < 6) {
                                return false;
                            }
                        }
                        return true;
                    },
                    parent: function(e) {
                        return !i.pseudos["empty"](e);
                    },
                    header: function(e) {
                        return G.test(e.nodeName);
                    },
                    input: function(e) {
                        return Q.test(e.nodeName);
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return t === "input" && e.type === "button" || t === "button";
                    },
                    text: function(e) {
                        var t;
                        return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === "text");
                    },
                    first: pt(function() {
                        return [ 0 ];
                    }),
                    last: pt(function(e, t) {
                        return [ t - 1 ];
                    }),
                    eq: pt(function(e, t, n) {
                        return [ n < 0 ? n + t : n ];
                    }),
                    even: pt(function(e, t) {
                        var n = 0;
                        for (;n < t; n += 2) {
                            e.push(n);
                        }
                        return e;
                    }),
                    odd: pt(function(e, t) {
                        var n = 1;
                        for (;n < t; n += 2) {
                            e.push(n);
                        }
                        return e;
                    }),
                    lt: pt(function(e, t, n) {
                        var i = n < 0 ? n + t : n;
                        for (;--i >= 0; ) {
                            e.push(i);
                        }
                        return e;
                    }),
                    gt: pt(function(e, t, n) {
                        var i = n < 0 ? n + t : n;
                        for (;++i < t; ) {
                            e.push(i);
                        }
                        return e;
                    })
                }
            };
            i.pseudos["nth"] = i.pseudos["eq"];
            for (t in {
                radio: true,
                checkbox: true,
                file: true,
                password: true,
                image: true
            }) {
                i.pseudos[t] = ct(t);
            }
            for (t in {
                submit: true,
                reset: true
            }) {
                i.pseudos[t] = dt(t);
            }
            function mt() {}
            mt.prototype = i.filters = i.pseudos;
            i.setFilters = new mt();
            s = ot.tokenize = function(e, t) {
                var n, r, o, s, a, l, u, f = k[e + " "];
                if (f) {
                    return t ? 0 : f.slice(0);
                }
                a = e;
                l = [];
                u = i.preFilter;
                while (a) {
                    if (!n || (r = z.exec(a))) {
                        if (r) {
                            a = a.slice(r[0].length) || a;
                        }
                        l.push(o = []);
                    }
                    n = false;
                    if (r = U.exec(a)) {
                        n = r.shift();
                        o.push({
                            value: n,
                            type: r[0].replace(I, " ")
                        });
                        a = a.slice(n.length);
                    }
                    for (s in i.filter) {
                        if ((r = Y[s].exec(a)) && (!u[s] || (r = u[s](r)))) {
                            n = r.shift();
                            o.push({
                                value: n,
                                type: s,
                                matches: r
                            });
                            a = a.slice(n.length);
                        }
                    }
                    if (!n) {
                        break;
                    }
                }
                return t ? a.length : a ? ot.error(e) : k(e, l).slice(0);
            };
            function gt(e) {
                var t = 0, n = e.length, i = "";
                for (;t < n; t++) {
                    i += e[t].value;
                }
                return i;
            }
            function vt(e, t, n) {
                var i = t.dir, r = n && i === "parentNode", o = T++;
                return t.first ? function(t, n, o) {
                    while (t = t[i]) {
                        if (t.nodeType === 1 || r) {
                            return e(t, n, o);
                        }
                    }
                } : function(t, n, s) {
                    var a, l, u = [ C, o ];
                    if (s) {
                        while (t = t[i]) {
                            if (t.nodeType === 1 || r) {
                                if (e(t, n, s)) {
                                    return true;
                                }
                            }
                        }
                    } else {
                        while (t = t[i]) {
                            if (t.nodeType === 1 || r) {
                                l = t[x] || (t[x] = {});
                                if ((a = l[i]) && a[0] === C && a[1] === o) {
                                    return u[2] = a[2];
                                } else {
                                    l[i] = u;
                                    if (u[2] = e(t, n, s)) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                };
            }
            function yt(e) {
                return e.length > 1 ? function(t, n, i) {
                    var r = e.length;
                    while (r--) {
                        if (!e[r](t, n, i)) {
                            return false;
                        }
                    }
                    return true;
                } : e[0];
            }
            function bt(e, t, n) {
                var i = 0, r = t.length;
                for (;i < r; i++) {
                    ot(e, t[i], n);
                }
                return n;
            }
            function xt(e, t, n, i, r) {
                var o, s = [], a = 0, l = e.length, u = t != null;
                for (;a < l; a++) {
                    if (o = e[a]) {
                        if (!n || n(o, i, r)) {
                            s.push(o);
                            if (u) {
                                t.push(a);
                            }
                        }
                    }
                }
                return s;
            }
            function wt(e, t, n, i, r, o) {
                if (i && !i[x]) {
                    i = wt(i);
                }
                if (r && !r[x]) {
                    r = wt(r, o);
                }
                return at(function(o, s, a, l) {
                    var u, f, c, d = [], p = [], h = s.length, m = o || bt(t || "*", a.nodeType ? [ a ] : a, []), g = e && (o || !t) ? xt(m, d, e, a, l) : m, v = n ? r || (o ? e : h || i) ? [] : s : g;
                    if (n) {
                        n(g, v, a, l);
                    }
                    if (i) {
                        u = xt(v, p);
                        i(u, [], a, l);
                        f = u.length;
                        while (f--) {
                            if (c = u[f]) {
                                v[p[f]] = !(g[p[f]] = c);
                            }
                        }
                    }
                    if (o) {
                        if (r || e) {
                            if (r) {
                                u = [];
                                f = v.length;
                                while (f--) {
                                    if (c = v[f]) {
                                        u.push(g[f] = c);
                                    }
                                }
                                r(null, v = [], u, l);
                            }
                            f = v.length;
                            while (f--) {
                                if ((c = v[f]) && (u = r ? _.call(o, c) : d[f]) > -1) {
                                    o[u] = !(s[u] = c);
                                }
                            }
                        }
                    } else {
                        v = xt(v === s ? v.splice(h, v.length) : v);
                        if (r) {
                            r(null, s, v, l);
                        } else {
                            H.apply(s, v);
                        }
                    }
                });
            }
            function Ct(e) {
                var t, n, r, o = e.length, s = i.relative[e[0].type], a = s || i.relative[" "], l = s ? 1 : 0, f = vt(function(e) {
                    return e === t;
                }, a, true), c = vt(function(e) {
                    return _.call(t, e) > -1;
                }, a, true), d = [ function(e, n, i) {
                    return !s && (i || n !== u) || ((t = n).nodeType ? f(e, n, i) : c(e, n, i));
                } ];
                for (;l < o; l++) {
                    if (n = i.relative[e[l].type]) {
                        d = [ vt(yt(d), n) ];
                    } else {
                        n = i.filter[e[l].type].apply(null, e[l].matches);
                        if (n[x]) {
                            r = ++l;
                            for (;r < o; r++) {
                                if (i.relative[e[r].type]) {
                                    break;
                                }
                            }
                            return wt(l > 1 && yt(d), l > 1 && gt(e.slice(0, l - 1).concat({
                                value: e[l - 2].type === " " ? "*" : ""
                            })).replace(I, "$1"), n, l < r && Ct(e.slice(l, r)), r < o && Ct(e = e.slice(r)), r < o && gt(e));
                        }
                        d.push(n);
                    }
                }
                return yt(d);
            }
            function Tt(e, t) {
                var n = t.length > 0, r = e.length > 0, o = function(o, s, a, l, f) {
                    var c, d, h, m = 0, g = "0", v = o && [], y = [], b = u, x = o || r && i.find["TAG"]("*", f), w = C += b == null ? 1 : Math.random() || .1, T = x.length;
                    if (f) {
                        u = s !== p && s;
                    }
                    for (;g !== T && (c = x[g]) != null; g++) {
                        if (r && c) {
                            d = 0;
                            while (h = e[d++]) {
                                if (h(c, s, a)) {
                                    l.push(c);
                                    break;
                                }
                            }
                            if (f) {
                                C = w;
                            }
                        }
                        if (n) {
                            if (c = !h && c) {
                                m--;
                            }
                            if (o) {
                                v.push(c);
                            }
                        }
                    }
                    m += g;
                    if (n && g !== m) {
                        d = 0;
                        while (h = t[d++]) {
                            h(v, y, s, a);
                        }
                        if (o) {
                            if (m > 0) {
                                while (g--) {
                                    if (!(v[g] || y[g])) {
                                        y[g] = L.call(l);
                                    }
                                }
                            }
                            y = xt(y);
                        }
                        H.apply(l, y);
                        if (f && !o && y.length > 0 && m + t.length > 1) {
                            ot.uniqueSort(l);
                        }
                    }
                    if (f) {
                        C = w;
                        u = b;
                    }
                    return v;
                };
                return n ? at(o) : o;
            }
            a = ot.compile = function(e, t) {
                var n, i = [], r = [], o = N[e + " "];
                if (!o) {
                    if (!t) {
                        t = s(e);
                    }
                    n = t.length;
                    while (n--) {
                        o = Ct(t[n]);
                        if (o[x]) {
                            i.push(o);
                        } else {
                            r.push(o);
                        }
                    }
                    o = N(e, Tt(r, i));
                    o.selector = e;
                }
                return o;
            };
            l = ot.select = function(e, t, r, o) {
                var l, u, f, c, d, p = typeof e === "function" && e, h = !o && s(e = p.selector || e);
                r = r || [];
                if (h.length === 1) {
                    u = h[0] = h[0].slice(0);
                    if (u.length > 2 && (f = u[0]).type === "ID" && n.getById && t.nodeType === 9 && m && i.relative[u[1].type]) {
                        t = (i.find["ID"](f.matches[0].replace(nt, it), t) || [])[0];
                        if (!t) {
                            return r;
                        } else if (p) {
                            t = t.parentNode;
                        }
                        e = e.slice(u.shift().value.length);
                    }
                    l = Y["needsContext"].test(e) ? 0 : u.length;
                    while (l--) {
                        f = u[l];
                        if (i.relative[c = f.type]) {
                            break;
                        }
                        if (d = i.find[c]) {
                            if (o = d(f.matches[0].replace(nt, it), et.test(u[0].type) && ht(t.parentNode) || t)) {
                                u.splice(l, 1);
                                e = o.length && gt(u);
                                if (!e) {
                                    H.apply(r, o);
                                    return r;
                                }
                                break;
                            }
                        }
                    }
                }
                (p || a(e, h))(o, t, !m, r, et.test(e) && ht(t.parentNode) || t);
                return r;
            };
            n.sortStable = x.split("").sort($).join("") === x;
            n.detectDuplicates = !!c;
            d();
            n.sortDetached = lt(function(e) {
                return e.compareDocumentPosition(p.createElement("div")) & 1;
            });
            if (!lt(function(e) {
                e.innerHTML = "<a href='#'></a>";
                return e.firstChild.getAttribute("href") === "#";
            })) {
                ut("type|href|height|width", function(e, t, n) {
                    if (!n) {
                        return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2);
                    }
                });
            }
            if (!n.attributes || !lt(function(e) {
                e.innerHTML = "<input/>";
                e.firstChild.setAttribute("value", "");
                return e.firstChild.getAttribute("value") === "";
            })) {
                ut("value", function(e, t, n) {
                    if (!n && e.nodeName.toLowerCase() === "input") {
                        return e.defaultValue;
                    }
                });
            }
            if (!lt(function(e) {
                return e.getAttribute("disabled") == null;
            })) {
                ut(O, function(e, t, n) {
                    var i;
                    if (!n) {
                        return e[t] === true ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
                    }
                });
            }
            return ot;
        }(e);
        d.find = y;
        d.expr = y.selectors;
        d.expr[":"] = d.expr.pseudos;
        d.unique = y.uniqueSort;
        d.text = y.getText;
        d.isXMLDoc = y.isXML;
        d.contains = y.contains;
        var b = d.expr.match.needsContext;
        var x = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
        var w = /^.[^:#\[\.,]*$/;
        function C(e, t, n) {
            if (d.isFunction(t)) {
                return d.grep(e, function(e, i) {
                    return !!t.call(e, i, e) !== n;
                });
            }
            if (t.nodeType) {
                return d.grep(e, function(e) {
                    return e === t !== n;
                });
            }
            if (typeof t === "string") {
                if (w.test(t)) {
                    return d.filter(t, e, n);
                }
                t = d.filter(t, e);
            }
            return d.grep(e, function(e) {
                return d.inArray(e, t) >= 0 !== n;
            });
        }
        d.filter = function(e, t, n) {
            var i = t[0];
            if (n) {
                e = ":not(" + e + ")";
            }
            return t.length === 1 && i.nodeType === 1 ? d.find.matchesSelector(i, e) ? [ i ] : [] : d.find.matches(e, d.grep(t, function(e) {
                return e.nodeType === 1;
            }));
        };
        d.fn.extend({
            find: function(e) {
                var t, n = [], i = this, r = i.length;
                if (typeof e !== "string") {
                    return this.pushStack(d(e).filter(function() {
                        for (t = 0; t < r; t++) {
                            if (d.contains(i[t], this)) {
                                return true;
                            }
                        }
                    }));
                }
                for (t = 0; t < r; t++) {
                    d.find(e, i[t], n);
                }
                n = this.pushStack(r > 1 ? d.unique(n) : n);
                n.selector = this.selector ? this.selector + " " + e : e;
                return n;
            },
            filter: function(e) {
                return this.pushStack(C(this, e || [], false));
            },
            not: function(e) {
                return this.pushStack(C(this, e || [], true));
            },
            is: function(e) {
                return !!C(this, typeof e === "string" && b.test(e) ? d(e) : e || [], false).length;
            }
        });
        var T, E = e.document, k = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, N = d.fn.init = function(e, t) {
            var n, i;
            if (!e) {
                return this;
            }
            if (typeof e === "string") {
                if (e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3) {
                    n = [ null, e, null ];
                } else {
                    n = k.exec(e);
                }
                if (n && (n[1] || !t)) {
                    if (n[1]) {
                        t = t instanceof d ? t[0] : t;
                        d.merge(this, d.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : E, true));
                        if (x.test(n[1]) && d.isPlainObject(t)) {
                            for (n in t) {
                                if (d.isFunction(this[n])) {
                                    this[n](t[n]);
                                } else {
                                    this.attr(n, t[n]);
                                }
                            }
                        }
                        return this;
                    } else {
                        i = E.getElementById(n[2]);
                        if (i && i.parentNode) {
                            if (i.id !== n[2]) {
                                return T.find(e);
                            }
                            this.length = 1;
                            this[0] = i;
                        }
                        this.context = E;
                        this.selector = e;
                        return this;
                    }
                } else if (!t || t.jquery) {
                    return (t || T).find(e);
                } else {
                    return this.constructor(t).find(e);
                }
            } else if (e.nodeType) {
                this.context = this[0] = e;
                this.length = 1;
                return this;
            } else if (d.isFunction(e)) {
                return typeof T.ready !== "undefined" ? T.ready(e) : e(d);
            }
            if (e.selector !== undefined) {
                this.selector = e.selector;
                this.context = e.context;
            }
            return d.makeArray(e, this);
        };
        N.prototype = d.fn;
        T = d(E);
        var $ = /^(?:parents|prev(?:Until|All))/, S = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
        d.extend({
            dir: function(e, t, n) {
                var i = [], r = e[t];
                while (r && r.nodeType !== 9 && (n === undefined || r.nodeType !== 1 || !d(r).is(n))) {
                    if (r.nodeType === 1) {
                        i.push(r);
                    }
                    r = r[t];
                }
                return i;
            },
            sibling: function(e, t) {
                var n = [];
                for (;e; e = e.nextSibling) {
                    if (e.nodeType === 1 && e !== t) {
                        n.push(e);
                    }
                }
                return n;
            }
        });
        d.fn.extend({
            has: function(e) {
                var t, n = d(e, this), i = n.length;
                return this.filter(function() {
                    for (t = 0; t < i; t++) {
                        if (d.contains(this, n[t])) {
                            return true;
                        }
                    }
                });
            },
            closest: function(e, t) {
                var n, i = 0, r = this.length, o = [], s = b.test(e) || typeof e !== "string" ? d(e, t || this.context) : 0;
                for (;i < r; i++) {
                    for (n = this[i]; n && n !== t; n = n.parentNode) {
                        if (n.nodeType < 11 && (s ? s.index(n) > -1 : n.nodeType === 1 && d.find.matchesSelector(n, e))) {
                            o.push(n);
                            break;
                        }
                    }
                }
                return this.pushStack(o.length > 1 ? d.unique(o) : o);
            },
            index: function(e) {
                if (!e) {
                    return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                }
                if (typeof e === "string") {
                    return d.inArray(this[0], d(e));
                }
                return d.inArray(e.jquery ? e[0] : e, this);
            },
            add: function(e, t) {
                return this.pushStack(d.unique(d.merge(this.get(), d(e, t))));
            },
            addBack: function(e) {
                return this.add(e == null ? this.prevObject : this.prevObject.filter(e));
            }
        });
        function j(e, t) {
            do {
                e = e[t];
            } while (e && e.nodeType !== 1);
            return e;
        }
        d.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && t.nodeType !== 11 ? t : null;
            },
            parents: function(e) {
                return d.dir(e, "parentNode");
            },
            parentsUntil: function(e, t, n) {
                return d.dir(e, "parentNode", n);
            },
            next: function(e) {
                return j(e, "nextSibling");
            },
            prev: function(e) {
                return j(e, "previousSibling");
            },
            nextAll: function(e) {
                return d.dir(e, "nextSibling");
            },
            prevAll: function(e) {
                return d.dir(e, "previousSibling");
            },
            nextUntil: function(e, t, n) {
                return d.dir(e, "nextSibling", n);
            },
            prevUntil: function(e, t, n) {
                return d.dir(e, "previousSibling", n);
            },
            siblings: function(e) {
                return d.sibling((e.parentNode || {}).firstChild, e);
            },
            children: function(e) {
                return d.sibling(e.firstChild);
            },
            contents: function(e) {
                return d.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : d.merge([], e.childNodes);
            }
        }, function(e, t) {
            d.fn[e] = function(n, i) {
                var r = d.map(this, t, n);
                if (e.slice(-5) !== "Until") {
                    i = n;
                }
                if (i && typeof i === "string") {
                    r = d.filter(i, r);
                }
                if (this.length > 1) {
                    if (!S[e]) {
                        r = d.unique(r);
                    }
                    if ($.test(e)) {
                        r = r.reverse();
                    }
                }
                return this.pushStack(r);
            };
        });
        var D = /\S+/g;
        var A = {};
        function L(e) {
            var t = A[e] = {};
            d.each(e.match(D) || [], function(e, n) {
                t[n] = true;
            });
            return t;
        }
        d.Callbacks = function(e) {
            e = typeof e === "string" ? A[e] || L(e) : d.extend({}, e);
            var t, n, i, r, o, s, a = [], l = !e.once && [], u = function(c) {
                n = e.memory && c;
                i = true;
                o = s || 0;
                s = 0;
                r = a.length;
                t = true;
                for (;a && o < r; o++) {
                    if (a[o].apply(c[0], c[1]) === false && e.stopOnFalse) {
                        n = false;
                        break;
                    }
                }
                t = false;
                if (a) {
                    if (l) {
                        if (l.length) {
                            u(l.shift());
                        }
                    } else if (n) {
                        a = [];
                    } else {
                        f.disable();
                    }
                }
            }, f = {
                add: function() {
                    if (a) {
                        var i = a.length;
                        (function o(t) {
                            d.each(t, function(t, n) {
                                var i = d.type(n);
                                if (i === "function") {
                                    if (!e.unique || !f.has(n)) {
                                        a.push(n);
                                    }
                                } else if (n && n.length && i !== "string") {
                                    o(n);
                                }
                            });
                        })(arguments);
                        if (t) {
                            r = a.length;
                        } else if (n) {
                            s = i;
                            u(n);
                        }
                    }
                    return this;
                },
                remove: function() {
                    if (a) {
                        d.each(arguments, function(e, n) {
                            var i;
                            while ((i = d.inArray(n, a, i)) > -1) {
                                a.splice(i, 1);
                                if (t) {
                                    if (i <= r) {
                                        r--;
                                    }
                                    if (i <= o) {
                                        o--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                has: function(e) {
                    return e ? d.inArray(e, a) > -1 : !!(a && a.length);
                },
                empty: function() {
                    a = [];
                    r = 0;
                    return this;
                },
                disable: function() {
                    a = l = n = undefined;
                    return this;
                },
                disabled: function() {
                    return !a;
                },
                lock: function() {
                    l = undefined;
                    if (!n) {
                        f.disable();
                    }
                    return this;
                },
                locked: function() {
                    return !l;
                },
                fireWith: function(e, n) {
                    if (a && (!i || l)) {
                        n = n || [];
                        n = [ e, n.slice ? n.slice() : n ];
                        if (t) {
                            l.push(n);
                        } else {
                            u(n);
                        }
                    }
                    return this;
                },
                fire: function() {
                    f.fireWith(this, arguments);
                    return this;
                },
                fired: function() {
                    return !!i;
                }
            };
            return f;
        };
        d.extend({
            Deferred: function(e) {
                var t = [ [ "resolve", "done", d.Callbacks("once memory"), "resolved" ], [ "reject", "fail", d.Callbacks("once memory"), "rejected" ], [ "notify", "progress", d.Callbacks("memory") ] ], n = "pending", i = {
                    state: function() {
                        return n;
                    },
                    always: function() {
                        r.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function() {
                        var e = arguments;
                        return d.Deferred(function(n) {
                            d.each(t, function(t, o) {
                                var s = d.isFunction(e[t]) && e[t];
                                r[o[1]](function() {
                                    var e = s && s.apply(this, arguments);
                                    if (e && d.isFunction(e.promise)) {
                                        e.promise().done(n.resolve).fail(n.reject).progress(n.notify);
                                    } else {
                                        n[o[0] + "With"](this === i ? n.promise() : this, s ? [ e ] : arguments);
                                    }
                                });
                            });
                            e = null;
                        }).promise();
                    },
                    promise: function(e) {
                        return e != null ? d.extend(e, i) : i;
                    }
                }, r = {};
                i.pipe = i.then;
                d.each(t, function(e, o) {
                    var s = o[2], a = o[3];
                    i[o[1]] = s.add;
                    if (a) {
                        s.add(function() {
                            n = a;
                        }, t[e ^ 1][2].disable, t[2][2].lock);
                    }
                    r[o[0]] = function() {
                        r[o[0] + "With"](this === r ? i : this, arguments);
                        return this;
                    };
                    r[o[0] + "With"] = s.fireWith;
                });
                i.promise(r);
                if (e) {
                    e.call(r, r);
                }
                return r;
            },
            when: function(e) {
                var t = 0, n = i.call(arguments), r = n.length, o = r !== 1 || e && d.isFunction(e.promise) ? r : 0, s = o === 1 ? e : d.Deferred(), a = function(e, t, n) {
                    return function(r) {
                        t[e] = this;
                        n[e] = arguments.length > 1 ? i.call(arguments) : r;
                        if (n === l) {
                            s.notifyWith(t, n);
                        } else if (!--o) {
                            s.resolveWith(t, n);
                        }
                    };
                }, l, u, f;
                if (r > 1) {
                    l = new Array(r);
                    u = new Array(r);
                    f = new Array(r);
                    for (;t < r; t++) {
                        if (n[t] && d.isFunction(n[t].promise)) {
                            n[t].promise().done(a(t, f, n)).fail(s.reject).progress(a(t, u, l));
                        } else {
                            --o;
                        }
                    }
                }
                if (!o) {
                    s.resolveWith(f, n);
                }
                return s.promise();
            }
        });
        var q;
        d.fn.ready = function(e) {
            d.ready.promise().done(e);
            return this;
        };
        d.extend({
            isReady: false,
            readyWait: 1,
            holdReady: function(e) {
                if (e) {
                    d.readyWait++;
                } else {
                    d.ready(true);
                }
            },
            ready: function(e) {
                if (e === true ? --d.readyWait : d.isReady) {
                    return;
                }
                if (!E.body) {
                    return setTimeout(d.ready);
                }
                d.isReady = true;
                if (e !== true && --d.readyWait > 0) {
                    return;
                }
                q.resolveWith(E, [ d ]);
                if (d.fn.triggerHandler) {
                    d(E).triggerHandler("ready");
                    d(E).off("ready");
                }
            }
        });
        function H() {
            if (E.addEventListener) {
                E.removeEventListener("DOMContentLoaded", F, false);
                e.removeEventListener("load", F, false);
            } else {
                E.detachEvent("onreadystatechange", F);
                e.detachEvent("onload", F);
            }
        }
        function F() {
            if (E.addEventListener || event.type === "load" || E.readyState === "complete") {
                H();
                d.ready();
            }
        }
        d.ready.promise = function(t) {
            if (!q) {
                q = d.Deferred();
                if (E.readyState === "complete") {
                    setTimeout(d.ready);
                } else if (E.addEventListener) {
                    E.addEventListener("DOMContentLoaded", F, false);
                    e.addEventListener("load", F, false);
                } else {
                    E.attachEvent("onreadystatechange", F);
                    e.attachEvent("onload", F);
                    var n = false;
                    try {
                        n = e.frameElement == null && E.documentElement;
                    } catch (i) {}
                    if (n && n.doScroll) {
                        (function r() {
                            if (!d.isReady) {
                                try {
                                    n.doScroll("left");
                                } catch (e) {
                                    return setTimeout(r, 50);
                                }
                                H();
                                d.ready();
                            }
                        })();
                    }
                }
            }
            return q.promise(t);
        };
        var _ = typeof undefined;
        var O;
        for (O in d(f)) {
            break;
        }
        f.ownLast = O !== "0";
        f.inlineBlockNeedsLayout = false;
        d(function() {
            var e, t, n, i;
            n = E.getElementsByTagName("body")[0];
            if (!n || !n.style) {
                return;
            }
            t = E.createElement("div");
            i = E.createElement("div");
            i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            n.appendChild(i).appendChild(t);
            if (typeof t.style.zoom !== _) {
                t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
                f.inlineBlockNeedsLayout = e = t.offsetWidth === 3;
                if (e) {
                    n.style.zoom = 1;
                }
            }
            n.removeChild(i);
        });
        (function() {
            var e = E.createElement("div");
            if (f.deleteExpando == null) {
                f.deleteExpando = true;
                try {
                    delete e.test;
                } catch (t) {
                    f.deleteExpando = false;
                }
            }
            e = null;
        })();
        d.acceptData = function(e) {
            var t = d.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
            return n !== 1 && n !== 9 ? false : !t || t !== true && e.getAttribute("classid") === t;
        };
        var P = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, M = /([A-Z])/g;
        function B(e, t, n) {
            if (n === undefined && e.nodeType === 1) {
                var i = "data-" + t.replace(M, "-$1").toLowerCase();
                n = e.getAttribute(i);
                if (typeof n === "string") {
                    try {
                        n = n === "true" ? true : n === "false" ? false : n === "null" ? null : +n + "" === n ? +n : P.test(n) ? d.parseJSON(n) : n;
                    } catch (r) {}
                    d.data(e, t, n);
                } else {
                    n = undefined;
                }
            }
            return n;
        }
        function W(e) {
            var t;
            for (t in e) {
                if (t === "data" && d.isEmptyObject(e[t])) {
                    continue;
                }
                if (t !== "toJSON") {
                    return false;
                }
            }
            return true;
        }
        function R(e, t, i, r) {
            if (!d.acceptData(e)) {
                return;
            }
            var o, s, a = d.expando, l = e.nodeType, u = l ? d.cache : e, f = l ? e[a] : e[a] && a;
            if ((!f || !u[f] || !r && !u[f].data) && i === undefined && typeof t === "string") {
                return;
            }
            if (!f) {
                if (l) {
                    f = e[a] = n.pop() || d.guid++;
                } else {
                    f = a;
                }
            }
            if (!u[f]) {
                u[f] = l ? {} : {
                    toJSON: d.noop
                };
            }
            if (typeof t === "object" || typeof t === "function") {
                if (r) {
                    u[f] = d.extend(u[f], t);
                } else {
                    u[f].data = d.extend(u[f].data, t);
                }
            }
            s = u[f];
            if (!r) {
                if (!s.data) {
                    s.data = {};
                }
                s = s.data;
            }
            if (i !== undefined) {
                s[d.camelCase(t)] = i;
            }
            if (typeof t === "string") {
                o = s[t];
                if (o == null) {
                    o = s[d.camelCase(t)];
                }
            } else {
                o = s;
            }
            return o;
        }
        function I(e, t, n) {
            if (!d.acceptData(e)) {
                return;
            }
            var i, r, o = e.nodeType, s = o ? d.cache : e, a = o ? e[d.expando] : d.expando;
            if (!s[a]) {
                return;
            }
            if (t) {
                i = n ? s[a] : s[a].data;
                if (i) {
                    if (!d.isArray(t)) {
                        if (t in i) {
                            t = [ t ];
                        } else {
                            t = d.camelCase(t);
                            if (t in i) {
                                t = [ t ];
                            } else {
                                t = t.split(" ");
                            }
                        }
                    } else {
                        t = t.concat(d.map(t, d.camelCase));
                    }
                    r = t.length;
                    while (r--) {
                        delete i[t[r]];
                    }
                    if (n ? !W(i) : !d.isEmptyObject(i)) {
                        return;
                    }
                }
            }
            if (!n) {
                delete s[a].data;
                if (!W(s[a])) {
                    return;
                }
            }
            if (o) {
                d.cleanData([ e ], true);
            } else if (f.deleteExpando || s != s.window) {
                delete s[a];
            } else {
                s[a] = null;
            }
        }
        d.extend({
            cache: {},
            noData: {
                "applet ": true,
                "embed ": true,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(e) {
                e = e.nodeType ? d.cache[e[d.expando]] : e[d.expando];
                return !!e && !W(e);
            },
            data: function(e, t, n) {
                return R(e, t, n);
            },
            removeData: function(e, t) {
                return I(e, t);
            },
            _data: function(e, t, n) {
                return R(e, t, n, true);
            },
            _removeData: function(e, t) {
                return I(e, t, true);
            }
        });
        d.fn.extend({
            data: function(e, t) {
                var n, i, r, o = this[0], s = o && o.attributes;
                if (e === undefined) {
                    if (this.length) {
                        r = d.data(o);
                        if (o.nodeType === 1 && !d._data(o, "parsedAttrs")) {
                            n = s.length;
                            while (n--) {
                                if (s[n]) {
                                    i = s[n].name;
                                    if (i.indexOf("data-") === 0) {
                                        i = d.camelCase(i.slice(5));
                                        B(o, i, r[i]);
                                    }
                                }
                            }
                            d._data(o, "parsedAttrs", true);
                        }
                    }
                    return r;
                }
                if (typeof e === "object") {
                    return this.each(function() {
                        d.data(this, e);
                    });
                }
                return arguments.length > 1 ? this.each(function() {
                    d.data(this, e, t);
                }) : o ? B(o, e, d.data(o, e)) : undefined;
            },
            removeData: function(e) {
                return this.each(function() {
                    d.removeData(this, e);
                });
            }
        });
        d.extend({
            queue: function(e, t, n) {
                var i;
                if (e) {
                    t = (t || "fx") + "queue";
                    i = d._data(e, t);
                    if (n) {
                        if (!i || d.isArray(n)) {
                            i = d._data(e, t, d.makeArray(n));
                        } else {
                            i.push(n);
                        }
                    }
                    return i || [];
                }
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = d.queue(e, t), i = n.length, r = n.shift(), o = d._queueHooks(e, t), s = function() {
                    d.dequeue(e, t);
                };
                if (r === "inprogress") {
                    r = n.shift();
                    i--;
                }
                if (r) {
                    if (t === "fx") {
                        n.unshift("inprogress");
                    }
                    delete o.stop;
                    r.call(e, s, o);
                }
                if (!i && o) {
                    o.empty.fire();
                }
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return d._data(e, n) || d._data(e, n, {
                    empty: d.Callbacks("once memory").add(function() {
                        d._removeData(e, t + "queue");
                        d._removeData(e, n);
                    })
                });
            }
        });
        d.fn.extend({
            queue: function(e, t) {
                var n = 2;
                if (typeof e !== "string") {
                    t = e;
                    e = "fx";
                    n--;
                }
                if (arguments.length < n) {
                    return d.queue(this[0], e);
                }
                return t === undefined ? this : this.each(function() {
                    var n = d.queue(this, e, t);
                    d._queueHooks(this, e);
                    if (e === "fx" && n[0] !== "inprogress") {
                        d.dequeue(this, e);
                    }
                });
            },
            dequeue: function(e) {
                return this.each(function() {
                    d.dequeue(this, e);
                });
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", []);
            },
            promise: function(e, t) {
                var n, i = 1, r = d.Deferred(), o = this, s = this.length, a = function() {
                    if (!--i) {
                        r.resolveWith(o, [ o ]);
                    }
                };
                if (typeof e !== "string") {
                    t = e;
                    e = undefined;
                }
                e = e || "fx";
                while (s--) {
                    n = d._data(o[s], e + "queueHooks");
                    if (n && n.empty) {
                        i++;
                        n.empty.add(a);
                    }
                }
                a();
                return r.promise(t);
            }
        });
        var z = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
        var U = [ "Top", "Right", "Bottom", "Left" ];
        var X = function(e, t) {
            e = t || e;
            return d.css(e, "display") === "none" || !d.contains(e.ownerDocument, e);
        };
        var V = d.access = function(e, t, n, i, r, o, s) {
            var a = 0, l = e.length, u = n == null;
            if (d.type(n) === "object") {
                r = true;
                for (a in n) {
                    d.access(e, t, a, n[a], true, o, s);
                }
            } else if (i !== undefined) {
                r = true;
                if (!d.isFunction(i)) {
                    s = true;
                }
                if (u) {
                    if (s) {
                        t.call(e, i);
                        t = null;
                    } else {
                        u = t;
                        t = function(e, t, n) {
                            return u.call(d(e), n);
                        };
                    }
                }
                if (t) {
                    for (;a < l; a++) {
                        t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
                    }
                }
            }
            return r ? e : u ? t.call(e) : l ? t(e[0], n) : o;
        };
        var J = /^(?:checkbox|radio)$/i;
        (function() {
            var e = E.createElement("input"), t = E.createElement("div"), n = E.createDocumentFragment();
            t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
            f.leadingWhitespace = t.firstChild.nodeType === 3;
            f.tbody = !t.getElementsByTagName("tbody").length;
            f.htmlSerialize = !!t.getElementsByTagName("link").length;
            f.html5Clone = E.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
            e.type = "checkbox";
            e.checked = true;
            n.appendChild(e);
            f.appendChecked = e.checked;
            t.innerHTML = "<textarea>x</textarea>";
            f.noCloneChecked = !!t.cloneNode(true).lastChild.defaultValue;
            n.appendChild(t);
            t.innerHTML = "<input type='radio' checked='checked' name='t'/>";
            f.checkClone = t.cloneNode(true).cloneNode(true).lastChild.checked;
            f.noCloneEvent = true;
            if (t.attachEvent) {
                t.attachEvent("onclick", function() {
                    f.noCloneEvent = false;
                });
                t.cloneNode(true).click();
            }
            if (f.deleteExpando == null) {
                f.deleteExpando = true;
                try {
                    delete t.test;
                } catch (i) {
                    f.deleteExpando = false;
                }
            }
        })();
        (function() {
            var t, n, i = E.createElement("div");
            for (t in {
                submit: true,
                change: true,
                focusin: true
            }) {
                n = "on" + t;
                if (!(f[t + "Bubbles"] = n in e)) {
                    i.setAttribute(n, "t");
                    f[t + "Bubbles"] = i.attributes[n].expando === false;
                }
            }
            i = null;
        })();
        var Y = /^(?:input|select|textarea)$/i, Q = /^key/, G = /^(?:mouse|pointer|contextmenu)|click/, K = /^(?:focusinfocus|focusoutblur)$/, Z = /^([^.]*)(?:\.(.+)|)$/;
        function et() {
            return true;
        }
        function tt() {
            return false;
        }
        function nt() {
            try {
                return E.activeElement;
            } catch (e) {}
        }
        d.event = {
            global: {},
            add: function(e, t, n, i, r) {
                var o, s, a, l, u, f, c, p, h, m, g, v = d._data(e);
                if (!v) {
                    return;
                }
                if (n.handler) {
                    l = n;
                    n = l.handler;
                    r = l.selector;
                }
                if (!n.guid) {
                    n.guid = d.guid++;
                }
                if (!(s = v.events)) {
                    s = v.events = {};
                }
                // zhoufan
                if (!(f = v.handle)) {
                    f = v.handle = function(e) {
                    	jstrace('v.handle');
                        return typeof d !== _ && (!e || d.event.triggered !== e.type) ? d.event.dispatch.apply(f.elem, arguments) : undefined;
                    };
                    f.elem = e;
                }
                t = (t || "").match(D) || [ "" ];
                a = t.length;
                while (a--) {
                    o = Z.exec(t[a]) || [];
                    h = g = o[1];
                    m = (o[2] || "").split(".").sort();
                    if (!h) {
                        continue;
                    }
                    u = d.event.special[h] || {};
                    h = (r ? u.delegateType : u.bindType) || h;
                    u = d.event.special[h] || {};
                    c = d.extend({
                        type: h,
                        origType: g,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && d.expr.match.needsContext.test(r),
                        namespace: m.join(".")
                    }, l);
                    if (!(p = s[h])) {
                        p = s[h] = [];
                        p.delegateCount = 0;
                        if (!u.setup || u.setup.call(e, i, m, f) === false) {
                            if (e.addEventListener) {
                                e.addEventListener(h, f, false);
                            } else if (e.attachEvent) {
                                e.attachEvent("on" + h, f);
                            }
                        }
                    }
                    if (u.add) {
                        u.add.call(e, c);
                        if (!c.handler.guid) {
                            c.handler.guid = n.guid;
                        }
                    }
                    if (r) {
                        p.splice(p.delegateCount++, 0, c);
                    } else {
                        p.push(c);
                    }
                    d.event.global[h] = true;
                }
                e = null;
            },
            remove: function(e, t, n, i, r) {
                var o, s, a, l, u, f, c, p, h, m, g, v = d.hasData(e) && d._data(e);
                if (!v || !(f = v.events)) {
                    return;
                }
                t = (t || "").match(D) || [ "" ];
                u = t.length;
                while (u--) {
                    a = Z.exec(t[u]) || [];
                    h = g = a[1];
                    m = (a[2] || "").split(".").sort();
                    if (!h) {
                        for (h in f) {
                            d.event.remove(e, h + t[u], n, i, true);
                        }
                        continue;
                    }
                    c = d.event.special[h] || {};
                    h = (i ? c.delegateType : c.bindType) || h;
                    p = f[h] || [];
                    a = a[2] && new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)");
                    l = o = p.length;
                    while (o--) {
                        s = p[o];
                        if ((r || g === s.origType) && (!n || n.guid === s.guid) && (!a || a.test(s.namespace)) && (!i || i === s.selector || i === "**" && s.selector)) {
                            p.splice(o, 1);
                            if (s.selector) {
                                p.delegateCount--;
                            }
                            if (c.remove) {
                                c.remove.call(e, s);
                            }
                        }
                    }
                    if (l && !p.length) {
                        if (!c.teardown || c.teardown.call(e, m, v.handle) === false) {
                            d.removeEvent(e, h, v.handle);
                        }
                        delete f[h];
                    }
                }
                if (d.isEmptyObject(f)) {
                    delete v.handle;
                    d._removeData(e, "events");
                }
            },
            trigger: function(t, n, i, r) {
                var o, s, a, l, f, c, p, h = [ i || E ], m = u.call(t, "type") ? t.type : t, g = u.call(t, "namespace") ? t.namespace.split(".") : [];
                a = c = i = i || E;
                if (i.nodeType === 3 || i.nodeType === 8) {
                    return;
                }
                if (K.test(m + d.event.triggered)) {
                    return;
                }
                if (m.indexOf(".") >= 0) {
                    g = m.split(".");
                    m = g.shift();
                    g.sort();
                }
                s = m.indexOf(":") < 0 && "on" + m;
                t = t[d.expando] ? t : new d.Event(m, typeof t === "object" && t);
                t.isTrigger = r ? 2 : 3;
                t.namespace = g.join(".");
                t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                t.result = undefined;
                if (!t.target) {
                    t.target = i;
                }
                n = n == null ? [ t ] : d.makeArray(n, [ t ]);
                f = d.event.special[m] || {};
                if (!r && f.trigger && f.trigger.apply(i, n) === false) {
                    return;
                }
                if (!r && !f.noBubble && !d.isWindow(i)) {
                    l = f.delegateType || m;
                    if (!K.test(l + m)) {
                        a = a.parentNode;
                    }
                    for (;a; a = a.parentNode) {
                        h.push(a);
                        c = a;
                    }
                    if (c === (i.ownerDocument || E)) {
                        h.push(c.defaultView || c.parentWindow || e);
                    }
                }
                p = 0;
                while ((a = h[p++]) && !t.isPropagationStopped()) {
                    t.type = p > 1 ? l : f.bindType || m;
                    o = (d._data(a, "events") || {})[t.type] && d._data(a, "handle");
                    if (o) {
                        o.apply(a, n);
                    }
                    o = s && a[s];
                    if (o && o.apply && d.acceptData(a)) {
                        t.result = o.apply(a, n);
                        if (t.result === false) {
                            t.preventDefault();
                        }
                    }
                }
                t.type = m;
                if (!r && !t.isDefaultPrevented()) {
                    if ((!f._default || f._default.apply(h.pop(), n) === false) && d.acceptData(i)) {
                        if (s && i[m] && !d.isWindow(i)) {
                            c = i[s];
                            if (c) {
                                i[s] = null;
                            }
                            d.event.triggered = m;
                            try {
                                i[m]();
                            } catch (v) {}
                            d.event.triggered = undefined;
                            if (c) {
                                i[s] = c;
                            }
                        }
                    }
                }
                return t.result;
            },
            dispatch: function(e) {
                e = d.event.fix(e);
                var t, n, r, o, s, a = [], l = i.call(arguments), u = (d._data(this, "events") || {})[e.type] || [], f = d.event.special[e.type] || {};
                l[0] = e;
                e.delegateTarget = this;
                if (f.preDispatch && f.preDispatch.call(this, e) === false) {
                    return;
                }
                a = d.event.handlers.call(this, e, u);
                t = 0;
                while ((o = a[t++]) && !e.isPropagationStopped()) {
                    e.currentTarget = o.elem;
                    s = 0;
                    while ((r = o.handlers[s++]) && !e.isImmediatePropagationStopped()) {
                        if (!e.namespace_re || e.namespace_re.test(r.namespace)) {
                            e.handleObj = r;
                            e.data = r.data;
                            n = ((d.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l);
                            if (n !== undefined) {
                                if ((e.result = n) === false) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }
                        }
                    }
                }
                if (f.postDispatch) {
                    f.postDispatch.call(this, e);
                }
                return e.result;
            },
            handlers: function(e, t) {
                var n, i, r, o, s = [], a = t.delegateCount, l = e.target;
                if (a && l.nodeType && (!e.button || e.type !== "click")) {
                    for (;l != this; l = l.parentNode || this) {
                        if (l.nodeType === 1 && (l.disabled !== true || e.type !== "click")) {
                            r = [];
                            for (o = 0; o < a; o++) {
                                i = t[o];
                                n = i.selector + " ";
                                if (r[n] === undefined) {
                                    r[n] = i.needsContext ? d(n, this).index(l) >= 0 : d.find(n, this, null, [ l ]).length;
                                }
                                if (r[n]) {
                                    r.push(i);
                                }
                            }
                            if (r.length) {
                                s.push({
                                    elem: l,
                                    handlers: r
                                });
                            }
                        }
                    }
                }
                if (a < t.length) {
                    s.push({
                        elem: this,
                        handlers: t.slice(a)
                    });
                }
                return s;
            },
            fix: function(e) {
                if (e[d.expando]) {
                    return e;
                }
                var t, n, i, r = e.type, o = e, s = this.fixHooks[r];
                if (!s) {
                    this.fixHooks[r] = s = G.test(r) ? this.mouseHooks : Q.test(r) ? this.keyHooks : {};
                }
                i = s.props ? this.props.concat(s.props) : this.props;
                e = new d.Event(o);
                t = i.length;
                while (t--) {
                    n = i[t];
                    e[n] = o[n];
                }
                if (!e.target) {
                    e.target = o.srcElement || E;
                }
                if (e.target.nodeType === 3) {
                    e.target = e.target.parentNode;
                }
                e.metaKey = !!e.metaKey;
                return s.filter ? s.filter(e, o) : e;
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    if (e.which == null) {
                        e.which = t.charCode != null ? t.charCode : t.keyCode;
                    }
                    return e;
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, t) {
                    var n, i, r, o = t.button, s = t.fromElement;
                    if (e.pageX == null && t.clientX != null) {
                        i = e.target.ownerDocument || E;
                        r = i.documentElement;
                        n = i.body;
                        e.pageX = t.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0);
                        e.pageY = t.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0);
                    }
                    if (!e.relatedTarget && s) {
                        e.relatedTarget = s === e.target ? t.toElement : s;
                    }
                    if (!e.which && o !== undefined) {
                        e.which = o & 1 ? 1 : o & 2 ? 3 : o & 4 ? 2 : 0;
                    }
                    return e;
                }
            },
            special: {
                load: {
                    noBubble: true
                },
                focus: {
                    trigger: function() {
                        if (this !== nt() && this.focus) {
                            try {
                                this.focus();
                                return false;
                            } catch (e) {}
                        }
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === nt() && this.blur) {
                            this.blur();
                            return false;
                        }
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if (d.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                            this.click();
                            return false;
                        }
                    },
                    _default: function(e) {
                        return d.nodeName(e.target, "a");
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        if (e.result !== undefined && e.originalEvent) {
                            e.originalEvent.returnValue = e.result;
                        }
                    }
                }
            },
            simulate: function(e, t, n, i) {
                var r = d.extend(new d.Event(), n, {
                    type: e,
                    isSimulated: true,
                    originalEvent: {}
                });
                if (i) {
                    d.event.trigger(r, null, t);
                } else {
                    d.event.dispatch.call(t, r);
                }
                if (r.isDefaultPrevented()) {
                    n.preventDefault();
                }
            }
        };
        d.removeEvent = E.removeEventListener ? function(e, t, n) {
            if (e.removeEventListener) {
                e.removeEventListener(t, n, false);
            }
        } : function(e, t, n) {
            var i = "on" + t;
            if (e.detachEvent) {
                if (typeof e[i] === _) {
                    e[i] = null;
                }
                e.detachEvent(i, n);
            }
        };
        d.Event = function(e, t) {
            if (!(this instanceof d.Event)) {
                return new d.Event(e, t);
            }
            if (e && e.type) {
                this.originalEvent = e;
                this.type = e.type;
                this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && e.returnValue === false ? et : tt;
            } else {
                this.type = e;
            }
            if (t) {
                d.extend(this, t);
            }
            this.timeStamp = e && e.timeStamp || d.now();
            this[d.expando] = true;
        };
        d.Event.prototype = {
            isDefaultPrevented: tt,
            isPropagationStopped: tt,
            isImmediatePropagationStopped: tt,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = et;
                if (!e) {
                    return;
                }
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = et;
                if (!e) {
                    return;
                }
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                e.cancelBubble = true;
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = et;
                if (e && e.stopImmediatePropagation) {
                    e.stopImmediatePropagation();
                }
                this.stopPropagation();
            }
        };
        d.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            d.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, i = this, r = e.relatedTarget, o = e.handleObj;
                    if (!r || r !== i && !d.contains(i, r)) {
                        e.type = o.origType;
                        n = o.handler.apply(this, arguments);
                        e.type = t;
                    }
                    return n;
                }
            };
        });
        if (!f.submitBubbles) {
            d.event.special.submit = {
                setup: function() {
                    if (d.nodeName(this, "form")) {
                        return false;
                    }
                    d.event.add(this, "click._submit keypress._submit", function(e) {
                        var t = e.target, n = d.nodeName(t, "input") || d.nodeName(t, "button") ? t.form : undefined;
                        if (n && !d._data(n, "submitBubbles")) {
                            d.event.add(n, "submit._submit", function(e) {
                                e._submit_bubble = true;
                            });
                            d._data(n, "submitBubbles", true);
                        }
                    });
                },
                postDispatch: function(e) {
                    if (e._submit_bubble) {
                        delete e._submit_bubble;
                        if (this.parentNode && !e.isTrigger) {
                            d.event.simulate("submit", this.parentNode, e, true);
                        }
                    }
                },
                teardown: function() {
                    if (d.nodeName(this, "form")) {
                        return false;
                    }
                    d.event.remove(this, "._submit");
                }
            };
        }
        if (!f.changeBubbles) {
            d.event.special.change = {
                setup: function() {
                    if (Y.test(this.nodeName)) {
                        if (this.type === "checkbox" || this.type === "radio") {
                            d.event.add(this, "propertychange._change", function(e) {
                                if (e.originalEvent.propertyName === "checked") {
                                    this._just_changed = true;
                                }
                            });
                            d.event.add(this, "click._change", function(e) {
                                if (this._just_changed && !e.isTrigger) {
                                    this._just_changed = false;
                                }
                                d.event.simulate("change", this, e, true);
                            });
                        }
                        return false;
                    }
                    d.event.add(this, "beforeactivate._change", function(e) {
                        var t = e.target;
                        if (Y.test(t.nodeName) && !d._data(t, "changeBubbles")) {
                            d.event.add(t, "change._change", function(e) {
                                if (this.parentNode && !e.isSimulated && !e.isTrigger) {
                                    d.event.simulate("change", this.parentNode, e, true);
                                }
                            });
                            d._data(t, "changeBubbles", true);
                        }
                    });
                },
                handle: function(e) {
                    var t = e.target;
                    if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") {
                        return e.handleObj.handler.apply(this, arguments);
                    }
                },
                teardown: function() {
                    d.event.remove(this, "._change");
                    return !Y.test(this.nodeName);
                }
            };
        }
        if (!f.focusinBubbles) {
            d.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, t) {
                var n = function(e) {
                    d.event.simulate(t, e.target, d.event.fix(e), true);
                };
                d.event.special[t] = {
                    setup: function() {
                        var i = this.ownerDocument || this, r = d._data(i, t);
                        if (!r) {
                            i.addEventListener(e, n, true);
                        }
                        d._data(i, t, (r || 0) + 1);
                    },
                    teardown: function() {
                        var i = this.ownerDocument || this, r = d._data(i, t) - 1;
                        if (!r) {
                            i.removeEventListener(e, n, true);
                            d._removeData(i, t);
                        } else {
                            d._data(i, t, r);
                        }
                    }
                };
            });
        }
        d.fn.extend({
            on: function(e, t, n, i, r) {
                var o, s;
                if (typeof e === "object") {
                    if (typeof t !== "string") {
                        n = n || t;
                        t = undefined;
                    }
                    for (o in e) {
                        this.on(o, t, n, e[o], r);
                    }
                    return this;
                }
                if (n == null && i == null) {
                    i = t;
                    n = t = undefined;
                } else if (i == null) {
                    if (typeof t === "string") {
                        i = n;
                        n = undefined;
                    } else {
                        i = n;
                        n = t;
                        t = undefined;
                    }
                }
                if (i === false) {
                    i = tt;
                } else if (!i) {
                    return this;
                }
                if (r === 1) {
                    s = i;
                    i = function(e) {
                        d().off(e);
                        return s.apply(this, arguments);
                    };
                    i.guid = s.guid || (s.guid = d.guid++);
                }
                return this.each(function() {
                    d.event.add(this, e, i, n, t);
                });
            },
            one: function(e, t, n, i) {
                return this.on(e, t, n, i, 1);
            },
            off: function(e, t, n) {
                var i, r;
                if (e && e.preventDefault && e.handleObj) {
                    i = e.handleObj;
                    d(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler);
                    return this;
                }
                if (typeof e === "object") {
                    for (r in e) {
                        this.off(r, t, e[r]);
                    }
                    return this;
                }
                if (t === false || typeof t === "function") {
                    n = t;
                    t = undefined;
                }
                if (n === false) {
                    n = tt;
                }
                return this.each(function() {
                    d.event.remove(this, e, n, t);
                });
            },
            trigger: function(e, t) {
                return this.each(function() {
                    d.event.trigger(e, t, this);
                });
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n) {
                    return d.event.trigger(e, t, n, true);
                }
            }
        });
        function it(e) {
            var t = rt.split("|"), n = e.createDocumentFragment();
            if (n.createElement) {
                while (t.length) {
                    n.createElement(t.pop());
                }
            }
            return n;
        }
        var rt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", ot = / jQuery\d+="(?:null|\d+)"/g, st = new RegExp("<(?:" + rt + ")[\\s/>]", "i"), at = /^\s+/, lt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ut = /<([\w:]+)/, ft = /<tbody/i, ct = /<|&#?\w+;/, dt = /<(?:script|style|link)/i, pt = /checked\s*(?:[^=]|=\s*.checked.)/i, ht = /^$|\/(?:java|ecma)script/i, mt = /^true\/(.*)/, gt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, vt = {
            option: [ 1, "<select multiple='multiple'>", "</select>" ],
            legend: [ 1, "<fieldset>", "</fieldset>" ],
            area: [ 1, "<map>", "</map>" ],
            param: [ 1, "<object>", "</object>" ],
            thead: [ 1, "<table>", "</table>" ],
            tr: [ 2, "<table><tbody>", "</tbody></table>" ],
            col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
            td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
            _default: f.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
        }, yt = it(E), bt = yt.appendChild(E.createElement("div"));
        vt.optgroup = vt.option;
        vt.tbody = vt.tfoot = vt.colgroup = vt.caption = vt.thead;
        vt.th = vt.td;
        function xt(e, t) {
            var n, i, r = 0, o = typeof e.getElementsByTagName !== _ ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== _ ? e.querySelectorAll(t || "*") : undefined;
            if (!o) {
                for (o = [], n = e.childNodes || e; (i = n[r]) != null; r++) {
                    if (!t || d.nodeName(i, t)) {
                        o.push(i);
                    } else {
                        d.merge(o, xt(i, t));
                    }
                }
            }
            return t === undefined || t && d.nodeName(e, t) ? d.merge([ e ], o) : o;
        }
        function wt(e) {
            if (J.test(e.type)) {
                e.defaultChecked = e.checked;
            }
        }
        function Ct(e, t) {
            return d.nodeName(e, "table") && d.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
        }
        function Tt(e) {
            e.type = (d.find.attr(e, "type") !== null) + "/" + e.type;
            return e;
        }
        function Et(e) {
            var t = mt.exec(e.type);
            if (t) {
                e.type = t[1];
            } else {
                e.removeAttribute("type");
            }
            return e;
        }
        function kt(e, t) {
            var n, i = 0;
            for (;(n = e[i]) != null; i++) {
                d._data(n, "globalEval", !t || d._data(t[i], "globalEval"));
            }
        }
        function Nt(e, t) {
            if (t.nodeType !== 1 || !d.hasData(e)) {
                return;
            }
            var n, i, r, o = d._data(e), s = d._data(t, o), a = o.events;
            if (a) {
                delete s.handle;
                s.events = {};
                for (n in a) {
                    for (i = 0, r = a[n].length; i < r; i++) {
                        d.event.add(t, n, a[n][i]);
                    }
                }
            }
            if (s.data) {
                s.data = d.extend({}, s.data);
            }
        }
        function $t(e, t) {
            var n, i, r;
            if (t.nodeType !== 1) {
                return;
            }
            n = t.nodeName.toLowerCase();
            if (!f.noCloneEvent && t[d.expando]) {
                r = d._data(t);
                for (i in r.events) {
                    d.removeEvent(t, i, r.handle);
                }
                t.removeAttribute(d.expando);
            }
            if (n === "script" && t.text !== e.text) {
                Tt(t).text = e.text;
                Et(t);
            } else if (n === "object") {
                if (t.parentNode) {
                    t.outerHTML = e.outerHTML;
                }
                if (f.html5Clone && (e.innerHTML && !d.trim(t.innerHTML))) {
                    t.innerHTML = e.innerHTML;
                }
            } else if (n === "input" && J.test(e.type)) {
                t.defaultChecked = t.checked = e.checked;
                if (t.value !== e.value) {
                    t.value = e.value;
                }
            } else if (n === "option") {
                t.defaultSelected = t.selected = e.defaultSelected;
            } else if (n === "input" || n === "textarea") {
                t.defaultValue = e.defaultValue;
            }
        }
        d.extend({
            clone: function(e, t, n) {
                var i, r, o, s, a, l = d.contains(e.ownerDocument, e);
                if (f.html5Clone || d.isXMLDoc(e) || !st.test("<" + e.nodeName + ">")) {
                    o = e.cloneNode(true);
                } else {
                    bt.innerHTML = e.outerHTML;
                    bt.removeChild(o = bt.firstChild);
                }
                if ((!f.noCloneEvent || !f.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !d.isXMLDoc(e)) {
                    i = xt(o);
                    a = xt(e);
                    for (s = 0; (r = a[s]) != null; ++s) {
                        if (i[s]) {
                            $t(r, i[s]);
                        }
                    }
                }
                if (t) {
                    if (n) {
                        a = a || xt(e);
                        i = i || xt(o);
                        for (s = 0; (r = a[s]) != null; s++) {
                            Nt(r, i[s]);
                        }
                    } else {
                        Nt(e, o);
                    }
                }
                i = xt(o, "script");
                if (i.length > 0) {
                    kt(i, !l && xt(e, "script"));
                }
                i = a = r = null;
                return o;
            },
            buildFragment: function(e, t, n, i) {
                var r, o, s, a, l, u, c, p = e.length, h = it(t), m = [], g = 0;
                for (;g < p; g++) {
                    o = e[g];
                    if (o || o === 0) {
                        if (d.type(o) === "object") {
                            d.merge(m, o.nodeType ? [ o ] : o);
                        } else if (!ct.test(o)) {
                            m.push(t.createTextNode(o));
                        } else {
                            a = a || h.appendChild(t.createElement("div"));
                            l = (ut.exec(o) || [ "", "" ])[1].toLowerCase();
                            c = vt[l] || vt._default;
                            a.innerHTML = c[1] + o.replace(lt, "<$1></$2>") + c[2];
                            r = c[0];
                            while (r--) {
                                a = a.lastChild;
                            }
                            if (!f.leadingWhitespace && at.test(o)) {
                                m.push(t.createTextNode(at.exec(o)[0]));
                            }
                            if (!f.tbody) {
                                o = l === "table" && !ft.test(o) ? a.firstChild : c[1] === "<table>" && !ft.test(o) ? a : 0;
                                r = o && o.childNodes.length;
                                while (r--) {
                                    if (d.nodeName(u = o.childNodes[r], "tbody") && !u.childNodes.length) {
                                        o.removeChild(u);
                                    }
                                }
                            }
                            d.merge(m, a.childNodes);
                            a.textContent = "";
                            while (a.firstChild) {
                                a.removeChild(a.firstChild);
                            }
                            a = h.lastChild;
                        }
                    }
                }
                if (a) {
                    h.removeChild(a);
                }
                if (!f.appendChecked) {
                    d.grep(xt(m, "input"), wt);
                }
                g = 0;
                while (o = m[g++]) {
                    if (i && d.inArray(o, i) !== -1) {
                        continue;
                    }
                    s = d.contains(o.ownerDocument, o);
                    a = xt(h.appendChild(o), "script");
                    if (s) {
                        kt(a);
                    }
                    if (n) {
                        r = 0;
                        while (o = a[r++]) {
                            if (ht.test(o.type || "")) {
                                n.push(o);
                            }
                        }
                    }
                }
                a = null;
                return h;
            },
            cleanData: function(e, t) {
                var i, r, o, s, a = 0, l = d.expando, u = d.cache, c = f.deleteExpando, p = d.event.special;
                for (;(i = e[a]) != null; a++) {
                    if (t || d.acceptData(i)) {
                        o = i[l];
                        s = o && u[o];
                        if (s) {
                            if (s.events) {
                                for (r in s.events) {
                                    if (p[r]) {
                                        d.event.remove(i, r);
                                    } else {
                                        d.removeEvent(i, r, s.handle);
                                    }
                                }
                            }
                            if (u[o]) {
                                delete u[o];
                                if (c) {
                                    delete i[l];
                                } else if (typeof i.removeAttribute !== _) {
                                    i.removeAttribute(l);
                                } else {
                                    i[l] = null;
                                }
                                n.push(o);
                            }
                        }
                    }
                }
            }
        });
        d.fn.extend({
            text: function(e) {
                return V(this, function(e) {
                    return e === undefined ? d.text(this) : this.empty().append((this[0] && this[0].ownerDocument || E).createTextNode(e));
                }, null, e, arguments.length);
            },
            append: function() {
                return this.domManip(arguments, function(e) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = Ct(this, e);
                        t.appendChild(e);
                    }
                });
            },
            prepend: function() {
                return this.domManip(arguments, function(e) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = Ct(this, e);
                        t.insertBefore(e, t.firstChild);
                    }
                });
            },
            before: function() {
                return this.domManip(arguments, function(e) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(e, this);
                    }
                });
            },
            after: function() {
                return this.domManip(arguments, function(e) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(e, this.nextSibling);
                    }
                });
            },
            remove: function(e, t) {
                var n, i = e ? d.filter(e, this) : this, r = 0;
                for (;(n = i[r]) != null; r++) {
                    if (!t && n.nodeType === 1) {
                        d.cleanData(xt(n));
                    }
                    if (n.parentNode) {
                        if (t && d.contains(n.ownerDocument, n)) {
                            kt(xt(n, "script"));
                        }
                        n.parentNode.removeChild(n);
                    }
                }
                return this;
            },
            empty: function() {
                var e, t = 0;
                for (;(e = this[t]) != null; t++) {
                    if (e.nodeType === 1) {
                        d.cleanData(xt(e, false));
                    }
                    while (e.firstChild) {
                        e.removeChild(e.firstChild);
                    }
                    if (e.options && d.nodeName(e, "select")) {
                        e.options.length = 0;
                    }
                }
                return this;
            },
            clone: function(e, t) {
                e = e == null ? false : e;
                t = t == null ? e : t;
                return this.map(function() {
                    return d.clone(this, e, t);
                });
            },
            html: function(e) {
                return V(this, function(e) {
                    var t = this[0] || {}, n = 0, i = this.length;
                    if (e === undefined) {
                        return t.nodeType === 1 ? t.innerHTML.replace(ot, "") : undefined;
                    }
                    if (typeof e === "string" && !dt.test(e) && (f.htmlSerialize || !st.test(e)) && (f.leadingWhitespace || !at.test(e)) && !vt[(ut.exec(e) || [ "", "" ])[1].toLowerCase()]) {
                        e = e.replace(lt, "<$1></$2>");
                        try {
                            for (;n < i; n++) {
                                t = this[n] || {};
                                if (t.nodeType === 1) {
                                    d.cleanData(xt(t, false));
                                    t.innerHTML = e;
                                }
                            }
                            t = 0;
                        } catch (r) {}
                    }
                    if (t) {
                        this.empty().append(e);
                    }
                }, null, e, arguments.length);
            },
            replaceWith: function() {
                var e = arguments[0];
                this.domManip(arguments, function(t) {
                    e = this.parentNode;
                    d.cleanData(xt(this));
                    if (e) {
                        e.replaceChild(t, this);
                    }
                });
                return e && (e.length || e.nodeType) ? this : this.remove();
            },
            detach: function(e) {
                return this.remove(e, true);
            },
            domManip: function(e, t) {
                e = r.apply([], e);
                var n, i, o, s, a, l, u = 0, c = this.length, p = this, h = c - 1, m = e[0], g = d.isFunction(m);
                if (g || c > 1 && typeof m === "string" && !f.checkClone && pt.test(m)) {
                    return this.each(function(n) {
                        var i = p.eq(n);
                        if (g) {
                            e[0] = m.call(this, n, i.html());
                        }
                        i.domManip(e, t);
                    });
                }
                if (c) {
                    l = d.buildFragment(e, this[0].ownerDocument, false, this);
                    n = l.firstChild;
                    if (l.childNodes.length === 1) {
                        l = n;
                    }
                    if (n) {
                        s = d.map(xt(l, "script"), Tt);
                        o = s.length;
                        for (;u < c; u++) {
                            i = l;
                            if (u !== h) {
                                i = d.clone(i, true, true);
                                if (o) {
                                    d.merge(s, xt(i, "script"));
                                }
                            }
                            t.call(this[u], i, u);
                        }
                        if (o) {
                            a = s[s.length - 1].ownerDocument;
                            d.map(s, Et);
                            for (u = 0; u < o; u++) {
                                i = s[u];
                                if (ht.test(i.type || "") && !d._data(i, "globalEval") && d.contains(a, i)) {
                                    if (i.src) {
                                        if (d._evalUrl) {
                                            d._evalUrl(i.src);
                                        }
                                    } else {
                                        d.globalEval((i.text || i.textContent || i.innerHTML || "").replace(gt, ""));
                                    }
                                }
                            }
                        }
                        l = n = null;
                    }
                }
                return this;
            }
        });
        d.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            d.fn[e] = function(e) {
                var n, i = 0, r = [], s = d(e), a = s.length - 1;
                for (;i <= a; i++) {
                    n = i === a ? this : this.clone(true);
                    d(s[i])[t](n);
                    o.apply(r, n.get());
                }
                return this.pushStack(r);
            };
        });
        var St, jt = {};
        function Dt(t, n) {
            var i, r = d(n.createElement(t)).appendTo(n.body), o = e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(r[0])) ? i.display : d.css(r[0], "display");
            r.detach();
            return o;
        }
        function At(e) {
            var t = E, n = jt[e];
            if (!n) {
                n = Dt(e, t);
                if (n === "none" || !n) {
                    St = (St || d("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement);
                    t = (St[0].contentWindow || St[0].contentDocument).document;
                    t.write();
                    t.close();
                    n = Dt(e, t);
                    St.detach();
                }
                jt[e] = n;
            }
            return n;
        }
        (function() {
            var e;
            f.shrinkWrapBlocks = function() {
                if (e != null) {
                    return e;
                }
                e = false;
                var t, n, i;
                n = E.getElementsByTagName("body")[0];
                if (!n || !n.style) {
                    return;
                }
                t = E.createElement("div");
                i = E.createElement("div");
                i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
                n.appendChild(i).appendChild(t);
                if (typeof t.style.zoom !== _) {
                    t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;" + "padding:1px;width:1px;zoom:1";
                    t.appendChild(E.createElement("div")).style.width = "5px";
                    e = t.offsetWidth !== 3;
                }
                n.removeChild(i);
                return e;
            };
        })();
        var Lt = /^margin/;
        var qt = new RegExp("^(" + z + ")(?!px)[a-z%]+$", "i");
        var Ht, Ft, _t = /^(top|right|bottom|left)$/;
        if (e.getComputedStyle) {
            Ht = function(e) {
                return e.ownerDocument.defaultView.getComputedStyle(e, null);
            };
            Ft = function(e, t, n) {
                var i, r, o, s, a = e.style;
                n = n || Ht(e);
                s = n ? n.getPropertyValue(t) || n[t] : undefined;
                if (n) {
                    if (s === "" && !d.contains(e.ownerDocument, e)) {
                        s = d.style(e, t);
                    }
                    if (qt.test(s) && Lt.test(t)) {
                        i = a.width;
                        r = a.minWidth;
                        o = a.maxWidth;
                        a.minWidth = a.maxWidth = a.width = s;
                        s = n.width;
                        a.width = i;
                        a.minWidth = r;
                        a.maxWidth = o;
                    }
                }
                return s === undefined ? s : s + "";
            };
        } else if (E.documentElement.currentStyle) {
            Ht = function(e) {
                return e.currentStyle;
            };
            Ft = function(e, t, n) {
                var i, r, o, s, a = e.style;
                n = n || Ht(e);
                s = n ? n[t] : undefined;
                if (s == null && a && a[t]) {
                    s = a[t];
                }
                if (qt.test(s) && !_t.test(t)) {
                    i = a.left;
                    r = e.runtimeStyle;
                    o = r && r.left;
                    if (o) {
                        r.left = e.currentStyle.left;
                    }
                    a.left = t === "fontSize" ? "1em" : s;
                    s = a.pixelLeft + "px";
                    a.left = i;
                    if (o) {
                        r.left = o;
                    }
                }
                return s === undefined ? s : s + "" || "auto";
            };
        }
        function Ot(e, t) {
            return {
                get: function() {
                    var n = e();
                    if (n == null) {
                        return;
                    }
                    if (n) {
                        delete this.get;
                        return;
                    }
                    return (this.get = t).apply(this, arguments);
                }
            };
        }
        (function() {
            var t, n, i, r, o, s, a;
            t = E.createElement("div");
            t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
            i = t.getElementsByTagName("a")[0];
            n = i && i.style;
            if (!n) {
                return;
            }
            n.cssText = "float:left;opacity:.5";
            f.opacity = n.opacity === "0.5";
            f.cssFloat = !!n.cssFloat;
            t.style.backgroundClip = "content-box";
            t.cloneNode(true).style.backgroundClip = "";
            f.clearCloneStyle = t.style.backgroundClip === "content-box";
            f.boxSizing = n.boxSizing === "" || n.MozBoxSizing === "" || n.WebkitBoxSizing === "";
            d.extend(f, {
                reliableHiddenOffsets: function() {
                    if (s == null) {
                        l();
                    }
                    return s;
                },
                boxSizingReliable: function() {
                    if (o == null) {
                        l();
                    }
                    return o;
                },
                pixelPosition: function() {
                    if (r == null) {
                        l();
                    }
                    return r;
                },
                reliableMarginRight: function() {
                    if (a == null) {
                        l();
                    }
                    return a;
                }
            });
            function l() {
                var t, n, i, l;
                n = E.getElementsByTagName("body")[0];
                if (!n || !n.style) {
                    return;
                }
                t = E.createElement("div");
                i = E.createElement("div");
                i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
                n.appendChild(i).appendChild(t);
                t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
                r = o = false;
                a = true;
                if (e.getComputedStyle) {
                    r = (e.getComputedStyle(t, null) || {}).top !== "1%";
                    o = (e.getComputedStyle(t, null) || {
                        width: "4px"
                    }).width === "4px";
                    l = t.appendChild(E.createElement("div"));
                    l.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                    l.style.marginRight = l.style.width = "0";
                    t.style.width = "1px";
                    a = !parseFloat((e.getComputedStyle(l, null) || {}).marginRight);
                }
                t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                l = t.getElementsByTagName("td");
                l[0].style.cssText = "margin:0;border:0;padding:0;display:none";
                s = l[0].offsetHeight === 0;
                if (s) {
                    l[0].style.display = "";
                    l[1].style.display = "none";
                    s = l[0].offsetHeight === 0;
                }
                n.removeChild(i);
            }
        })();
        d.swap = function(e, t, n, i) {
            var r, o, s = {};
            for (o in t) {
                s[o] = e.style[o];
                e.style[o] = t[o];
            }
            r = n.apply(e, i || []);
            for (o in t) {
                e.style[o] = s[o];
            }
            return r;
        };
        var Pt = /alpha\([^)]*\)/i, Mt = /opacity\s*=\s*([^)]*)/, Bt = /^(none|table(?!-c[ea]).+)/, Wt = new RegExp("^(" + z + ")(.*)$", "i"), Rt = new RegExp("^([+-])=(" + z + ")", "i"), It = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, zt = {
            letterSpacing: "0",
            fontWeight: "400"
        }, Ut = [ "Webkit", "O", "Moz", "ms" ];
        function Xt(e, t) {
            if (t in e) {
                return t;
            }
            var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = Ut.length;
            while (r--) {
                t = Ut[r] + n;
                if (t in e) {
                    return t;
                }
            }
            return i;
        }
        function Vt(e, t) {
            var n, i, r, o = [], s = 0, a = e.length;
            for (;s < a; s++) {
                i = e[s];
                if (!i.style) {
                    continue;
                }
                o[s] = d._data(i, "olddisplay");
                n = i.style.display;
                if (t) {
                    if (!o[s] && n === "none") {
                        i.style.display = "";
                    }
                    if (i.style.display === "" && X(i)) {
                        o[s] = d._data(i, "olddisplay", At(i.nodeName));
                    }
                } else {
                    r = X(i);
                    if (n && n !== "none" || !r) {
                        d._data(i, "olddisplay", r ? n : d.css(i, "display"));
                    }
                }
            }
            for (s = 0; s < a; s++) {
                i = e[s];
                if (!i.style) {
                    continue;
                }
                if (!t || i.style.display === "none" || i.style.display === "") {
                    i.style.display = t ? o[s] || "" : "none";
                }
            }
            return e;
        }
        function Jt(e, t, n) {
            var i = Wt.exec(t);
            return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t;
        }
        function Yt(e, t, n, i, r) {
            var o = n === (i ? "border" : "content") ? 4 : t === "width" ? 1 : 0, s = 0;
            for (;o < 4; o += 2) {
                if (n === "margin") {
                    s += d.css(e, n + U[o], true, r);
                }
                if (i) {
                    if (n === "content") {
                        s -= d.css(e, "padding" + U[o], true, r);
                    }
                    if (n !== "margin") {
                        s -= d.css(e, "border" + U[o] + "Width", true, r);
                    }
                } else {
                    s += d.css(e, "padding" + U[o], true, r);
                    if (n !== "padding") {
                        s += d.css(e, "border" + U[o] + "Width", true, r);
                    }
                }
            }
            return s;
        }
        function Qt(e, t, n) {
            var i = true, r = t === "width" ? e.offsetWidth : e.offsetHeight, o = Ht(e), s = f.boxSizing && d.css(e, "boxSizing", false, o) === "border-box";
            if (r <= 0 || r == null) {
                r = Ft(e, t, o);
                if (r < 0 || r == null) {
                    r = e.style[t];
                }
                if (qt.test(r)) {
                    return r;
                }
                i = s && (f.boxSizingReliable() || r === e.style[t]);
                r = parseFloat(r) || 0;
            }
            return r + Yt(e, t, n || (s ? "border" : "content"), i, o) + "px";
        }
        d.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = Ft(e, "opacity");
                            return n === "" ? "1" : n;
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: true,
                fillOpacity: true,
                flexGrow: true,
                flexShrink: true,
                fontWeight: true,
                lineHeight: true,
                opacity: true,
                order: true,
                orphans: true,
                widows: true,
                zIndex: true,
                zoom: true
            },
            cssProps: {
                "float": f.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(e, t, n, i) {
                if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) {
                    return;
                }
                var r, o, s, a = d.camelCase(t), l = e.style;
                t = d.cssProps[a] || (d.cssProps[a] = Xt(l, a));
                s = d.cssHooks[t] || d.cssHooks[a];
                if (n !== undefined) {
                    o = typeof n;
                    if (o === "string" && (r = Rt.exec(n))) {
                        n = (r[1] + 1) * r[2] + parseFloat(d.css(e, t));
                        o = "number";
                    }
                    if (n == null || n !== n) {
                        return;
                    }
                    if (o === "number" && !d.cssNumber[a]) {
                        n += "px";
                    }
                    if (!f.clearCloneStyle && n === "" && t.indexOf("background") === 0) {
                        l[t] = "inherit";
                    }
                    if (!s || !("set" in s) || (n = s.set(e, n, i)) !== undefined) {
                        try {
                            l[t] = n;
                        } catch (u) {}
                    }
                } else {
                    if (s && "get" in s && (r = s.get(e, false, i)) !== undefined) {
                        return r;
                    }
                    return l[t];
                }
            },
            css: function(e, t, n, i) {
                var r, o, s, a = d.camelCase(t);
                t = d.cssProps[a] || (d.cssProps[a] = Xt(e.style, a));
                s = d.cssHooks[t] || d.cssHooks[a];
                if (s && "get" in s) {
                    o = s.get(e, true, n);
                }
                if (o === undefined) {
                    o = Ft(e, t, i);
                }
                if (o === "normal" && t in zt) {
                    o = zt[t];
                }
                if (n === "" || n) {
                    r = parseFloat(o);
                    return n === true || d.isNumeric(r) ? r || 0 : o;
                }
                return o;
            }
        });
        d.each([ "height", "width" ], function(e, t) {
            d.cssHooks[t] = {
                get: function(e, n, i) {
                    if (n) {
                        return Bt.test(d.css(e, "display")) && e.offsetWidth === 0 ? d.swap(e, It, function() {
                            return Qt(e, t, i);
                        }) : Qt(e, t, i);
                    }
                },
                set: function(e, n, i) {
                    var r = i && Ht(e);
                    return Jt(e, n, i ? Yt(e, t, i, f.boxSizing && d.css(e, "boxSizing", false, r) === "border-box", r) : 0);
                }
            };
        });
        if (!f.opacity) {
            d.cssHooks.opacity = {
                get: function(e, t) {
                    return Mt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
                },
                set: function(e, t) {
                    var n = e.style, i = e.currentStyle, r = d.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "", o = i && i.filter || n.filter || "";
                    n.zoom = 1;
                    if ((t >= 1 || t === "") && d.trim(o.replace(Pt, "")) === "" && n.removeAttribute) {
                        n.removeAttribute("filter");
                        if (t === "" || i && !i.filter) {
                            return;
                        }
                    }
                    n.filter = Pt.test(o) ? o.replace(Pt, r) : o + " " + r;
                }
            };
        }
        d.cssHooks.marginRight = Ot(f.reliableMarginRight, function(e, t) {
            if (t) {
                return d.swap(e, {
                    display: "inline-block"
                }, Ft, [ e, "marginRight" ]);
            }
        });
        d.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            d.cssHooks[e + t] = {
                expand: function(n) {
                    var i = 0, r = {}, o = typeof n === "string" ? n.split(" ") : [ n ];
                    for (;i < 4; i++) {
                        r[e + U[i] + t] = o[i] || o[i - 2] || o[0];
                    }
                    return r;
                }
            };
            if (!Lt.test(e)) {
                d.cssHooks[e + t].set = Jt;
            }
        });
        d.fn.extend({
            css: function(e, t) {
                return V(this, function(e, t, n) {
                    var i, r, o = {}, s = 0;
                    if (d.isArray(t)) {
                        i = Ht(e);
                        r = t.length;
                        for (;s < r; s++) {
                            o[t[s]] = d.css(e, t[s], false, i);
                        }
                        return o;
                    }
                    return n !== undefined ? d.style(e, t, n) : d.css(e, t);
                }, e, t, arguments.length > 1);
            },
            show: function() {
                return Vt(this, true);
            },
            hide: function() {
                return Vt(this);
            },
            toggle: function(e) {
                if (typeof e === "boolean") {
                    return e ? this.show() : this.hide();
                }
                return this.each(function() {
                    if (X(this)) {
                        d(this).show();
                    } else {
                        d(this).hide();
                    }
                });
            }
        });
        function Gt(e, t, n, i, r) {
            return new Gt.prototype.init(e, t, n, i, r);
        }
        d.Tween = Gt;
        Gt.prototype = {
            constructor: Gt,
            init: function(e, t, n, i, r, o) {
                this.elem = e;
                this.prop = n;
                this.easing = r || "swing";
                this.options = t;
                this.start = this.now = this.cur();
                this.end = i;
                this.unit = o || (d.cssNumber[n] ? "" : "px");
            },
            cur: function() {
                var e = Gt.propHooks[this.prop];
                return e && e.get ? e.get(this) : Gt.propHooks._default.get(this);
            },
            run: function(e) {
                var t, n = Gt.propHooks[this.prop];
                if (this.options.duration) {
                    this.pos = t = d.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration);
                } else {
                    this.pos = t = e;
                }
                this.now = (this.end - this.start) * t + this.start;
                if (this.options.step) {
                    this.options.step.call(this.elem, this.now, this);
                }
                if (n && n.set) {
                    n.set(this);
                } else {
                    Gt.propHooks._default.set(this);
                }
                return this;
            }
        };
        Gt.prototype.init.prototype = Gt.prototype;
        Gt.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    if (e.elem[e.prop] != null && (!e.elem.style || e.elem.style[e.prop] == null)) {
                        return e.elem[e.prop];
                    }
                    t = d.css(e.elem, e.prop, "");
                    return !t || t === "auto" ? 0 : t;
                },
                set: function(e) {
                    if (d.fx.step[e.prop]) {
                        d.fx.step[e.prop](e);
                    } else if (e.elem.style && (e.elem.style[d.cssProps[e.prop]] != null || d.cssHooks[e.prop])) {
                        d.style(e.elem, e.prop, e.now + e.unit);
                    } else {
                        e.elem[e.prop] = e.now;
                    }
                }
            }
        };
        Gt.propHooks.scrollTop = Gt.propHooks.scrollLeft = {
            set: function(e) {
                if (e.elem.nodeType && e.elem.parentNode) {
                    e.elem[e.prop] = e.now;
                }
            }
        };
        d.easing = {
            linear: function(e) {
                return e;
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2;
            }
        };
        d.fx = Gt.prototype.init;
        d.fx.step = {};
        var Kt, Zt, en = /^(?:toggle|show|hide)$/, tn = new RegExp("^(?:([+-])=|)(" + z + ")([a-z%]*)$", "i"), nn = /queueHooks$/, rn = [ un ], on = {
            "*": [ function(e, t) {
                var n = this.createTween(e, t), i = n.cur(), r = tn.exec(t), o = r && r[3] || (d.cssNumber[e] ? "" : "px"), s = (d.cssNumber[e] || o !== "px" && +i) && tn.exec(d.css(n.elem, e)), a = 1, l = 20;
                if (s && s[3] !== o) {
                    o = o || s[3];
                    r = r || [];
                    s = +i || 1;
                    do {
                        a = a || ".5";
                        s = s / a;
                        d.style(n.elem, e, s + o);
                    } while (a !== (a = n.cur() / i) && a !== 1 && --l);
                }
                if (r) {
                    s = n.start = +s || +i || 0;
                    n.unit = o;
                    n.end = r[1] ? s + (r[1] + 1) * r[2] : +r[2];
                }
                return n;
            } ]
        };
        function sn() {
            setTimeout(function() {
                Kt = undefined;
            });
            return Kt = d.now();
        }
        function an(e, t) {
            var n, i = {
                height: e
            }, r = 0;
            t = t ? 1 : 0;
            for (;r < 4; r += 2 - t) {
                n = U[r];
                i["margin" + n] = i["padding" + n] = e;
            }
            if (t) {
                i.opacity = i.width = e;
            }
            return i;
        }
        function ln(e, t, n) {
            var i, r = (on[t] || []).concat(on["*"]), o = 0, s = r.length;
            for (;o < s; o++) {
                if (i = r[o].call(n, t, e)) {
                    return i;
                }
            }
        }
        function un(e, t, n) {
            var i, r, o, s, a, l, u, c, p = this, h = {}, m = e.style, g = e.nodeType && X(e), v = d._data(e, "fxshow");
            if (!n.queue) {
                a = d._queueHooks(e, "fx");
                if (a.unqueued == null) {
                    a.unqueued = 0;
                    l = a.empty.fire;
                    a.empty.fire = function() {
                        if (!a.unqueued) {
                            l();
                        }
                    };
                }
                a.unqueued++;
                p.always(function() {
                    p.always(function() {
                        a.unqueued--;
                        if (!d.queue(e, "fx").length) {
                            a.empty.fire();
                        }
                    });
                });
            }
            if (e.nodeType === 1 && ("height" in t || "width" in t)) {
                n.overflow = [ m.overflow, m.overflowX, m.overflowY ];
                u = d.css(e, "display");
                c = u === "none" ? d._data(e, "olddisplay") || At(e.nodeName) : u;
                if (c === "inline" && d.css(e, "float") === "none") {
                    if (!f.inlineBlockNeedsLayout || At(e.nodeName) === "inline") {
                        m.display = "inline-block";
                    } else {
                        m.zoom = 1;
                    }
                }
            }
            if (n.overflow) {
                m.overflow = "hidden";
                if (!f.shrinkWrapBlocks()) {
                    p.always(function() {
                        m.overflow = n.overflow[0];
                        m.overflowX = n.overflow[1];
                        m.overflowY = n.overflow[2];
                    });
                }
            }
            for (i in t) {
                r = t[i];
                if (en.exec(r)) {
                    delete t[i];
                    o = o || r === "toggle";
                    if (r === (g ? "hide" : "show")) {
                        if (r === "show" && v && v[i] !== undefined) {
                            g = true;
                        } else {
                            continue;
                        }
                    }
                    h[i] = v && v[i] || d.style(e, i);
                } else {
                    u = undefined;
                }
            }
            if (!d.isEmptyObject(h)) {
                if (v) {
                    if ("hidden" in v) {
                        g = v.hidden;
                    }
                } else {
                    v = d._data(e, "fxshow", {});
                }
                if (o) {
                    v.hidden = !g;
                }
                if (g) {
                    d(e).show();
                } else {
                    p.done(function() {
                        d(e).hide();
                    });
                }
                p.done(function() {
                    var t;
                    d._removeData(e, "fxshow");
                    for (t in h) {
                        d.style(e, t, h[t]);
                    }
                });
                for (i in h) {
                    s = ln(g ? v[i] : 0, i, p);
                    if (!(i in v)) {
                        v[i] = s.start;
                        if (g) {
                            s.end = s.start;
                            s.start = i === "width" || i === "height" ? 1 : 0;
                        }
                    }
                }
            } else if ((u === "none" ? At(e.nodeName) : u) === "inline") {
                m.display = u;
            }
        }
        function fn(e, t) {
            var n, i, r, o, s;
            for (n in e) {
                i = d.camelCase(n);
                r = t[i];
                o = e[n];
                if (d.isArray(o)) {
                    r = o[1];
                    o = e[n] = o[0];
                }
                if (n !== i) {
                    e[i] = o;
                    delete e[n];
                }
                s = d.cssHooks[i];
                if (s && "expand" in s) {
                    o = s.expand(o);
                    delete e[i];
                    for (n in o) {
                        if (!(n in e)) {
                            e[n] = o[n];
                            t[n] = r;
                        }
                    }
                } else {
                    t[i] = r;
                }
            }
        }
        function cn(e, t, n) {
            var i, r, o = 0, s = rn.length, a = d.Deferred().always(function() {
                delete l.elem;
            }), l = function() {
                if (r) {
                    return false;
                }
                var t = Kt || sn(), n = Math.max(0, u.startTime + u.duration - t), i = n / u.duration || 0, o = 1 - i, s = 0, l = u.tweens.length;
                for (;s < l; s++) {
                    u.tweens[s].run(o);
                }
                a.notifyWith(e, [ u, o, n ]);
                if (o < 1 && l) {
                    return n;
                } else {
                    a.resolveWith(e, [ u ]);
                    return false;
                }
            }, u = a.promise({
                elem: e,
                props: d.extend({}, t),
                opts: d.extend(true, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Kt || sn(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var i = d.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                    u.tweens.push(i);
                    return i;
                },
                stop: function(t) {
                    var n = 0, i = t ? u.tweens.length : 0;
                    if (r) {
                        return this;
                    }
                    r = true;
                    for (;n < i; n++) {
                        u.tweens[n].run(1);
                    }
                    if (t) {
                        a.resolveWith(e, [ u, t ]);
                    } else {
                        a.rejectWith(e, [ u, t ]);
                    }
                    return this;
                }
            }), f = u.props;
            fn(f, u.opts.specialEasing);
            for (;o < s; o++) {
                i = rn[o].call(u, e, f, u.opts);
                if (i) {
                    return i;
                }
            }
            d.map(f, ln, u);
            if (d.isFunction(u.opts.start)) {
                u.opts.start.call(e, u);
            }
            d.fx.timer(d.extend(l, {
                elem: e,
                anim: u,
                queue: u.opts.queue
            }));
            return u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always);
        }
        d.Animation = d.extend(cn, {
            tweener: function(e, t) {
                if (d.isFunction(e)) {
                    t = e;
                    e = [ "*" ];
                } else {
                    e = e.split(" ");
                }
                var n, i = 0, r = e.length;
                for (;i < r; i++) {
                    n = e[i];
                    on[n] = on[n] || [];
                    on[n].unshift(t);
                }
            },
            prefilter: function(e, t) {
                if (t) {
                    rn.unshift(e);
                } else {
                    rn.push(e);
                }
            }
        });
        d.speed = function(e, t, n) {
            var i = e && typeof e === "object" ? d.extend({}, e) : {
                complete: n || !n && t || d.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !d.isFunction(t) && t
            };
            i.duration = d.fx.off ? 0 : typeof i.duration === "number" ? i.duration : i.duration in d.fx.speeds ? d.fx.speeds[i.duration] : d.fx.speeds._default;
            if (i.queue == null || i.queue === true) {
                i.queue = "fx";
            }
            i.old = i.complete;
            i.complete = function() {
                if (d.isFunction(i.old)) {
                    i.old.call(this);
                }
                if (i.queue) {
                    d.dequeue(this, i.queue);
                }
            };
            return i;
        };
        d.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(X).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i);
            },
            animate: function(e, t, n, i) {
                var r = d.isEmptyObject(e), o = d.speed(t, n, i), s = function() {
                    var t = cn(this, d.extend({}, e), o);
                    if (r || d._data(this, "finish")) {
                        t.stop(true);
                    }
                };
                s.finish = s;
                return r || o.queue === false ? this.each(s) : this.queue(o.queue, s);
            },
            stop: function(e, t, n) {
                var i = function(e) {
                    var t = e.stop;
                    delete e.stop;
                    t(n);
                };
                if (typeof e !== "string") {
                    n = t;
                    t = e;
                    e = undefined;
                }
                if (t && e !== false) {
                    this.queue(e || "fx", []);
                }
                return this.each(function() {
                    var t = true, r = e != null && e + "queueHooks", o = d.timers, s = d._data(this);
                    if (r) {
                        if (s[r] && s[r].stop) {
                            i(s[r]);
                        }
                    } else {
                        for (r in s) {
                            if (s[r] && s[r].stop && nn.test(r)) {
                                i(s[r]);
                            }
                        }
                    }
                    for (r = o.length; r--; ) {
                        if (o[r].elem === this && (e == null || o[r].queue === e)) {
                            o[r].anim.stop(n);
                            t = false;
                            o.splice(r, 1);
                        }
                    }
                    if (t || !n) {
                        d.dequeue(this, e);
                    }
                });
            },
            finish: function(e) {
                if (e !== false) {
                    e = e || "fx";
                }
                return this.each(function() {
                    var t, n = d._data(this), i = n[e + "queue"], r = n[e + "queueHooks"], o = d.timers, s = i ? i.length : 0;
                    n.finish = true;
                    d.queue(this, e, []);
                    if (r && r.stop) {
                        r.stop.call(this, true);
                    }
                    for (t = o.length; t--; ) {
                        if (o[t].elem === this && o[t].queue === e) {
                            o[t].anim.stop(true);
                            o.splice(t, 1);
                        }
                    }
                    for (t = 0; t < s; t++) {
                        if (i[t] && i[t].finish) {
                            i[t].finish.call(this);
                        }
                    }
                    delete n.finish;
                });
            }
        });
        d.each([ "toggle", "show", "hide" ], function(e, t) {
            var n = d.fn[t];
            d.fn[t] = function(e, i, r) {
                return e == null || typeof e === "boolean" ? n.apply(this, arguments) : this.animate(an(t, true), e, i, r);
            };
        });
        d.each({
            slideDown: an("show"),
            slideUp: an("hide"),
            slideToggle: an("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            d.fn[e] = function(e, n, i) {
                return this.animate(t, e, n, i);
            };
        });
        d.timers = [];
        d.fx.tick = function() {
            var e, t = d.timers, n = 0;
            Kt = d.now();
            for (;n < t.length; n++) {
                e = t[n];
                if (!e() && t[n] === e) {
                    t.splice(n--, 1);
                }
            }
            if (!t.length) {
                d.fx.stop();
            }
            Kt = undefined;
        };
        d.fx.timer = function(e) {
            d.timers.push(e);
            if (e()) {
                d.fx.start();
            } else {
                d.timers.pop();
            }
        };
        d.fx.interval = 13;
        d.fx.start = function() {
            if (!Zt) {
                Zt = setInterval(d.fx.tick, d.fx.interval);
            }
        };
        d.fx.stop = function() {
            clearInterval(Zt);
            Zt = null;
        };
        d.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        };
        d.fn.delay = function(e, t) {
            e = d.fx ? d.fx.speeds[e] || e : e;
            t = t || "fx";
            return this.queue(t, function(t, n) {
                var i = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(i);
                };
            });
        };
        (function() {
            var e, t, n, i, r;
            t = E.createElement("div");
            t.setAttribute("className", "t");
            t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
            i = t.getElementsByTagName("a")[0];
            n = E.createElement("select");
            r = n.appendChild(E.createElement("option"));
            e = t.getElementsByTagName("input")[0];
            i.style.cssText = "top:1px";
            f.getSetAttribute = t.className !== "t";
            f.style = /top/.test(i.getAttribute("style"));
            f.hrefNormalized = i.getAttribute("href") === "/a";
            f.checkOn = !!e.value;
            f.optSelected = r.selected;
            f.enctype = !!E.createElement("form").enctype;
            n.disabled = true;
            f.optDisabled = !r.disabled;
            e = E.createElement("input");
            e.setAttribute("value", "");
            f.input = e.getAttribute("value") === "";
            e.value = "t";
            e.setAttribute("type", "radio");
            f.radioValue = e.value === "t";
        })();
        var dn = /\r/g;
        d.fn.extend({
            val: function(e) {
                var t, n, i, r = this[0];
                if (!arguments.length) {
                    if (r) {
                        t = d.valHooks[r.type] || d.valHooks[r.nodeName.toLowerCase()];
                        if (t && "get" in t && (n = t.get(r, "value")) !== undefined) {
                            return n;
                        }
                        n = r.value;
                        return typeof n === "string" ? n.replace(dn, "") : n == null ? "" : n;
                    }
                    return;
                }
                i = d.isFunction(e);
                return this.each(function(n) {
                    var r;
                    if (this.nodeType !== 1) {
                        return;
                    }
                    if (i) {
                        r = e.call(this, n, d(this).val());
                    } else {
                        r = e;
                    }
                    if (r == null) {
                        r = "";
                    } else if (typeof r === "number") {
                        r += "";
                    } else if (d.isArray(r)) {
                        r = d.map(r, function(e) {
                            return e == null ? "" : e + "";
                        });
                    }
                    t = d.valHooks[this.type] || d.valHooks[this.nodeName.toLowerCase()];
                    if (!t || !("set" in t) || t.set(this, r, "value") === undefined) {
                        this.value = r;
                    }
                });
            }
        });
        d.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = d.find.attr(e, "value");
                        return t != null ? t : d.trim(d.text(e));
                    }
                },
                select: {
                    get: function(e) {
                        var t, n, i = e.options, r = e.selectedIndex, o = e.type === "select-one" || r < 0, s = o ? null : [], a = o ? r + 1 : i.length, l = r < 0 ? a : o ? r : 0;
                        for (;l < a; l++) {
                            n = i[l];
                            if ((n.selected || l === r) && (f.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !d.nodeName(n.parentNode, "optgroup"))) {
                                t = d(n).val();
                                if (o) {
                                    return t;
                                }
                                s.push(t);
                            }
                        }
                        return s;
                    },
                    set: function(e, t) {
                        var n, i, r = e.options, o = d.makeArray(t), s = r.length;
                        while (s--) {
                            i = r[s];
                            if (d.inArray(d.valHooks.option.get(i), o) >= 0) {
                                try {
                                    i.selected = n = true;
                                } catch (a) {
                                    i.scrollHeight;
                                }
                            } else {
                                i.selected = false;
                            }
                        }
                        if (!n) {
                            e.selectedIndex = -1;
                        }
                        return r;
                    }
                }
            }
        });
        d.each([ "radio", "checkbox" ], function() {
            d.valHooks[this] = {
                set: function(e, t) {
                    if (d.isArray(t)) {
                        return e.checked = d.inArray(d(e).val(), t) >= 0;
                    }
                }
            };
            if (!f.checkOn) {
                d.valHooks[this].get = function(e) {
                    return e.getAttribute("value") === null ? "on" : e.value;
                };
            }
        });
        var pn, hn, mn = d.expr.attrHandle, gn = /^(?:checked|selected)$/i, vn = f.getSetAttribute, yn = f.input;
        d.fn.extend({
            attr: function(e, t) {
                return V(this, d.attr, e, t, arguments.length > 1);
            },
            removeAttr: function(e) {
                return this.each(function() {
                    d.removeAttr(this, e);
                });
            }
        });
        d.extend({
            attr: function(e, t, n) {
                var i, r, o = e.nodeType;
                if (!e || o === 3 || o === 8 || o === 2) {
                    return;
                }
                if (typeof e.getAttribute === _) {
                    return d.prop(e, t, n);
                }
                if (o !== 1 || !d.isXMLDoc(e)) {
                    t = t.toLowerCase();
                    i = d.attrHooks[t] || (d.expr.match.bool.test(t) ? hn : pn);
                }
                if (n !== undefined) {
                    if (n === null) {
                        d.removeAttr(e, t);
                    } else if (i && "set" in i && (r = i.set(e, n, t)) !== undefined) {
                        return r;
                    } else {
                        e.setAttribute(t, n + "");
                        return n;
                    }
                } else if (i && "get" in i && (r = i.get(e, t)) !== null) {
                    return r;
                } else {
                    r = d.find.attr(e, t);
                    return r == null ? undefined : r;
                }
            },
            removeAttr: function(e, t) {
                var n, i, r = 0, o = t && t.match(D);
                if (o && e.nodeType === 1) {
                    while (n = o[r++]) {
                        i = d.propFix[n] || n;
                        if (d.expr.match.bool.test(n)) {
                            if (yn && vn || !gn.test(n)) {
                                e[i] = false;
                            } else {
                                e[d.camelCase("default-" + n)] = e[i] = false;
                            }
                        } else {
                            d.attr(e, n, "");
                        }
                        e.removeAttribute(vn ? n : i);
                    }
                }
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!f.radioValue && t === "radio" && d.nodeName(e, "input")) {
                            var n = e.value;
                            e.setAttribute("type", t);
                            if (n) {
                                e.value = n;
                            }
                            return t;
                        }
                    }
                }
            }
        });
        hn = {
            set: function(e, t, n) {
                if (t === false) {
                    d.removeAttr(e, n);
                } else if (yn && vn || !gn.test(n)) {
                    e.setAttribute(!vn && d.propFix[n] || n, n);
                } else {
                    e[d.camelCase("default-" + n)] = e[n] = true;
                }
                return n;
            }
        };
        d.each(d.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = mn[t] || d.find.attr;
            mn[t] = yn && vn || !gn.test(t) ? function(e, t, i) {
                var r, o;
                if (!i) {
                    o = mn[t];
                    mn[t] = r;
                    r = n(e, t, i) != null ? t.toLowerCase() : null;
                    mn[t] = o;
                }
                return r;
            } : function(e, t, n) {
                if (!n) {
                    return e[d.camelCase("default-" + t)] ? t.toLowerCase() : null;
                }
            };
        });
        if (!yn || !vn) {
            d.attrHooks.value = {
                set: function(e, t, n) {
                    if (d.nodeName(e, "input")) {
                        e.defaultValue = t;
                    } else {
                        return pn && pn.set(e, t, n);
                    }
                }
            };
        }
        if (!vn) {
            pn = {
                set: function(e, t, n) {
                    var i = e.getAttributeNode(n);
                    if (!i) {
                        e.setAttributeNode(i = e.ownerDocument.createAttribute(n));
                    }
                    i.value = t += "";
                    if (n === "value" || t === e.getAttribute(n)) {
                        return t;
                    }
                }
            };
            mn.id = mn.name = mn.coords = function(e, t, n) {
                var i;
                if (!n) {
                    return (i = e.getAttributeNode(t)) && i.value !== "" ? i.value : null;
                }
            };
            d.valHooks.button = {
                get: function(e, t) {
                    var n = e.getAttributeNode(t);
                    if (n && n.specified) {
                        return n.value;
                    }
                },
                set: pn.set
            };
            d.attrHooks.contenteditable = {
                set: function(e, t, n) {
                    pn.set(e, t === "" ? false : t, n);
                }
            };
            d.each([ "width", "height" ], function(e, t) {
                d.attrHooks[t] = {
                    set: function(e, n) {
                        if (n === "") {
                            e.setAttribute(t, "auto");
                            return n;
                        }
                    }
                };
            });
        }
        if (!f.style) {
            d.attrHooks.style = {
                get: function(e) {
                    return e.style.cssText || undefined;
                },
                set: function(e, t) {
                    return e.style.cssText = t + "";
                }
            };
        }
        var bn = /^(?:input|select|textarea|button|object)$/i, xn = /^(?:a|area)$/i;
        d.fn.extend({
            prop: function(e, t) {
                return V(this, d.prop, e, t, arguments.length > 1);
            },
            removeProp: function(e) {
                e = d.propFix[e] || e;
                return this.each(function() {
                    try {
                        this[e] = undefined;
                        delete this[e];
                    } catch (t) {}
                });
            }
        });
        d.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(e, t, n) {
                var i, r, o, s = e.nodeType;
                if (!e || s === 3 || s === 8 || s === 2) {
                    return;
                }
                o = s !== 1 || !d.isXMLDoc(e);
                if (o) {
                    t = d.propFix[t] || t;
                    r = d.propHooks[t];
                }
                if (n !== undefined) {
                    return r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : e[t] = n;
                } else {
                    return r && "get" in r && (i = r.get(e, t)) !== null ? i : e[t];
                }
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = d.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : bn.test(e.nodeName) || xn.test(e.nodeName) && e.href ? 0 : -1;
                    }
                }
            }
        });
        if (!f.hrefNormalized) {
            d.each([ "href", "src" ], function(e, t) {
                d.propHooks[t] = {
                    get: function(e) {
                        return e.getAttribute(t, 4);
                    }
                };
            });
        }
        if (!f.optSelected) {
            d.propHooks.selected = {
                get: function(e) {
                    var t = e.parentNode;
                    if (t) {
                        t.selectedIndex;
                        if (t.parentNode) {
                            t.parentNode.selectedIndex;
                        }
                    }
                    return null;
                }
            };
        }
        d.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
            d.propFix[this.toLowerCase()] = this;
        });
        if (!f.enctype) {
            d.propFix.enctype = "encoding";
        }
        var wn = /[\t\r\n\f]/g;
        d.fn.extend({
            addClass: function(e) {
                var t, n, i, r, o, s, a = 0, l = this.length, u = typeof e === "string" && e;
                if (d.isFunction(e)) {
                    return this.each(function(t) {
                        d(this).addClass(e.call(this, t, this.className));
                    });
                }
                if (u) {
                    t = (e || "").match(D) || [];
                    for (;a < l; a++) {
                        n = this[a];
                        i = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(wn, " ") : " ");
                        if (i) {
                            o = 0;
                            while (r = t[o++]) {
                                if (i.indexOf(" " + r + " ") < 0) {
                                    i += r + " ";
                                }
                            }
                            s = d.trim(i);
                            if (n.className !== s) {
                                n.className = s;
                            }
                        }
                    }
                }
                return this;
            },
            removeClass: function(e) {
                var t, n, i, r, o, s, a = 0, l = this.length, u = arguments.length === 0 || typeof e === "string" && e;
                if (d.isFunction(e)) {
                    return this.each(function(t) {
                        d(this).removeClass(e.call(this, t, this.className));
                    });
                }
                if (u) {
                    t = (e || "").match(D) || [];
                    for (;a < l; a++) {
                        n = this[a];
                        i = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(wn, " ") : "");
                        if (i) {
                            o = 0;
                            while (r = t[o++]) {
                                while (i.indexOf(" " + r + " ") >= 0) {
                                    i = i.replace(" " + r + " ", " ");
                                }
                            }
                            s = e ? d.trim(i) : "";
                            if (n.className !== s) {
                                n.className = s;
                            }
                        }
                    }
                }
                return this;
            },
            toggleClass: function(e, t) {
                var n = typeof e;
                if (typeof t === "boolean" && n === "string") {
                    return t ? this.addClass(e) : this.removeClass(e);
                }
                if (d.isFunction(e)) {
                    return this.each(function(n) {
                        d(this).toggleClass(e.call(this, n, this.className, t), t);
                    });
                }
                return this.each(function() {
                    if (n === "string") {
                        var t, i = 0, r = d(this), o = e.match(D) || [];
                        while (t = o[i++]) {
                            if (r.hasClass(t)) {
                                r.removeClass(t);
                            } else {
                                r.addClass(t);
                            }
                        }
                    } else if (n === _ || n === "boolean") {
                        if (this.className) {
                            d._data(this, "__className__", this.className);
                        }
                        this.className = this.className || e === false ? "" : d._data(this, "__className__") || "";
                    }
                });
            },
            hasClass: function(e) {
                var t = " " + e + " ", n = 0, i = this.length;
                for (;n < i; n++) {
                    if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(wn, " ").indexOf(t) >= 0) {
                        return true;
                    }
                }
                return false;
            }
        });
        d.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(e, t) {
            d.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
            };
        });
        d.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e);
            },
            bind: function(e, t, n) {
                return this.on(e, null, t, n);
            },
            unbind: function(e, t) {
                return this.off(e, null, t);
            },
            delegate: function(e, t, n, i) {
                return this.on(t, e, n, i);
            },
            undelegate: function(e, t, n) {
                return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n);
            }
        });
        var Cn = d.now();
        var Tn = /\?/;
        var En = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        d.parseJSON = function(t) {
            if (e.JSON && e.JSON.parse) {
                return e.JSON.parse(t + "");
            }
            var n, i = null, r = d.trim(t + "");
            return r && !d.trim(r.replace(En, function(e, t, r, o) {
                if (n && t) {
                    i = 0;
                }
                if (i === 0) {
                    return e;
                }
                n = r || t;
                i += !o - !r;
                return "";
            })) ? Function("return " + r)() : d.error("Invalid JSON: " + t);
        };
        d.parseXML = function(t) {
            var n, i;
            if (!t || typeof t !== "string") {
                return null;
            }
            try {
                if (e.DOMParser) {
                    i = new DOMParser();
                    n = i.parseFromString(t, "text/xml");
                } else {
                    n = new ActiveXObject("Microsoft.XMLDOM");
                    n.async = "false";
                    n.loadXML(t);
                }
            } catch (r) {
                n = undefined;
            }
            if (!n || !n.documentElement || n.getElementsByTagName("parsererror").length) {
                d.error("Invalid XML: " + t);
            }
            return n;
        };
        var kn, Nn, $n = /#.*$/, Sn = /([?&])_=[^&]*/, jn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Dn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, An = /^(?:GET|HEAD)$/, Ln = /^\/\//, qn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Hn = {}, Fn = {}, _n = "*/".concat("*");
        try {
            Nn = location.href;
        } catch (On) {
            Nn = E.createElement("a");
            Nn.href = "";
            Nn = Nn.href;
        }
        kn = qn.exec(Nn.toLowerCase()) || [];
        function Pn(e) {
            return function(t, n) {
                if (typeof t !== "string") {
                    n = t;
                    t = "*";
                }
                var i, r = 0, o = t.toLowerCase().match(D) || [];
                if (d.isFunction(n)) {
                    while (i = o[r++]) {
                        if (i.charAt(0) === "+") {
                            i = i.slice(1) || "*";
                            (e[i] = e[i] || []).unshift(n);
                        } else {
                            (e[i] = e[i] || []).push(n);
                        }
                    }
                }
            };
        }
        function Mn(e, t, n, i) {
            var r = {}, o = e === Fn;
            function s(a) {
                var l;
                r[a] = true;
                d.each(e[a] || [], function(e, a) {
                    var u = a(t, n, i);
                    if (typeof u === "string" && !o && !r[u]) {
                        t.dataTypes.unshift(u);
                        s(u);
                        return false;
                    } else if (o) {
                        return !(l = u);
                    }
                });
                return l;
            }
            return s(t.dataTypes[0]) || !r["*"] && s("*");
        }
        function Bn(e, t) {
            var n, i, r = d.ajaxSettings.flatOptions || {};
            for (i in t) {
                if (t[i] !== undefined) {
                    (r[i] ? e : n || (n = {}))[i] = t[i];
                }
            }
            if (n) {
                d.extend(true, e, n);
            }
            return e;
        }
        function Wn(e, t, n) {
            var i, r, o, s, a = e.contents, l = e.dataTypes;
            while (l[0] === "*") {
                l.shift();
                if (r === undefined) {
                    r = e.mimeType || t.getResponseHeader("Content-Type");
                }
            }
            if (r) {
                for (s in a) {
                    if (a[s] && a[s].test(r)) {
                        l.unshift(s);
                        break;
                    }
                }
            }
            if (l[0] in n) {
                o = l[0];
            } else {
                for (s in n) {
                    if (!l[0] || e.converters[s + " " + l[0]]) {
                        o = s;
                        break;
                    }
                    if (!i) {
                        i = s;
                    }
                }
                o = o || i;
            }
            if (o) {
                if (o !== l[0]) {
                    l.unshift(o);
                }
                return n[o];
            }
        }
        function Rn(e, t, n, i) {
            var r, o, s, a, l, u = {}, f = e.dataTypes.slice();
            if (f[1]) {
                for (s in e.converters) {
                    u[s.toLowerCase()] = e.converters[s];
                }
            }
            o = f.shift();
            while (o) {
                if (e.responseFields[o]) {
                    n[e.responseFields[o]] = t;
                }
                if (!l && i && e.dataFilter) {
                    t = e.dataFilter(t, e.dataType);
                }
                l = o;
                o = f.shift();
                if (o) {
                    if (o === "*") {
                        o = l;
                    } else if (l !== "*" && l !== o) {
                        s = u[l + " " + o] || u["* " + o];
                        if (!s) {
                            for (r in u) {
                                a = r.split(" ");
                                if (a[1] === o) {
                                    s = u[l + " " + a[0]] || u["* " + a[0]];
                                    if (s) {
                                        if (s === true) {
                                            s = u[r];
                                        } else if (u[r] !== true) {
                                            o = a[0];
                                            f.unshift(a[1]);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        if (s !== true) {
                            if (s && e["throws"]) {
                                t = s(t);
                            } else {
                                try {
                                    t = s(t);
                                } catch (c) {
                                    return {
                                        state: "parsererror",
                                        error: s ? c : "No conversion from " + l + " to " + o
                                    };
                                }
                            }
                        }
                    }
                }
            }
            return {
                state: "success",
                data: t
            };
        }
        d.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Nn,
                type: "GET",
                isLocal: Dn.test(kn[1]),
                global: true,
                processData: true,
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": _n,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": true,
                    "text json": d.parseJSON,
                    "text xml": d.parseXML
                },
                flatOptions: {
                    url: true,
                    context: true
                }
            },
            ajaxSetup: function(e, t) {
                return t ? Bn(Bn(e, d.ajaxSettings), t) : Bn(d.ajaxSettings, e);
            },
            ajaxPrefilter: Pn(Hn),
            ajaxTransport: Pn(Fn),
            ajax: function(e, t) {
                if (typeof e === "object") {
                    t = e;
                    e = undefined;
                }
                t = t || {};
                var n, i, r, o, s, a, l, u, f = d.ajaxSetup({}, t), c = f.context || f, p = f.context && (c.nodeType || c.jquery) ? d(c) : d.event, h = d.Deferred(), m = d.Callbacks("once memory"), g = f.statusCode || {}, v = {}, y = {}, b = 0, x = "canceled", w = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (b === 2) {
                            if (!u) {
                                u = {};
                                while (t = jn.exec(o)) {
                                    u[t[1].toLowerCase()] = t[2];
                                }
                            }
                            t = u[e.toLowerCase()];
                        }
                        return t == null ? null : t;
                    },
                    getAllResponseHeaders: function() {
                        return b === 2 ? o : null;
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        if (!b) {
                            e = y[n] = y[n] || e;
                            v[e] = t;
                        }
                        return this;
                    },
                    overrideMimeType: function(e) {
                        if (!b) {
                            f.mimeType = e;
                        }
                        return this;
                    },
                    statusCode: function(e) {
                        var t;
                        if (e) {
                            if (b < 2) {
                                for (t in e) {
                                    g[t] = [ g[t], e[t] ];
                                }
                            } else {
                                w.always(e[w.status]);
                            }
                        }
                        return this;
                    },
                    abort: function(e) {
                        var t = e || x;
                        if (l) {
                            l.abort(t);
                        }
                        T(0, t);
                        return this;
                    }
                };
                h.promise(w).complete = m.add;
                w.success = w.done;
                w.error = w.fail;
                f.url = ((e || f.url || Nn) + "").replace($n, "").replace(Ln, kn[1] + "//");
                f.type = t.method || t.type || f.method || f.type;
                f.dataTypes = d.trim(f.dataType || "*").toLowerCase().match(D) || [ "" ];
                if (f.crossDomain == null) {
                    n = qn.exec(f.url.toLowerCase());
                    f.crossDomain = !!(n && (n[1] !== kn[1] || n[2] !== kn[2] || (n[3] || (n[1] === "http:" ? "80" : "443")) !== (kn[3] || (kn[1] === "http:" ? "80" : "443"))));
                }
                if (f.data && f.processData && typeof f.data !== "string") {
                    f.data = d.param(f.data, f.traditional);
                }
                Mn(Hn, f, t, w);
                if (b === 2) {
                    return w;
                }
                a = f.global;
                if (a && d.active++ === 0) {
                    d.event.trigger("ajaxStart");
                }
                f.type = f.type.toUpperCase();
                f.hasContent = !An.test(f.type);
                r = f.url;
                if (!f.hasContent) {
                    if (f.data) {
                        r = f.url += (Tn.test(r) ? "&" : "?") + f.data;
                        delete f.data;
                    }
                    if (f.cache === false) {
                        f.url = Sn.test(r) ? r.replace(Sn, "$1_=" + Cn++) : r + (Tn.test(r) ? "&" : "?") + "_=" + Cn++;
                    }
                }
                if (f.ifModified) {
                    if (d.lastModified[r]) {
                        w.setRequestHeader("If-Modified-Since", d.lastModified[r]);
                    }
                    if (d.etag[r]) {
                        w.setRequestHeader("If-None-Match", d.etag[r]);
                    }
                }
                if (f.data && f.hasContent && f.contentType !== false || t.contentType) {
                    w.setRequestHeader("Content-Type", f.contentType);
                }
                w.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + (f.dataTypes[0] !== "*" ? ", " + _n + "; q=0.01" : "") : f.accepts["*"]);
                for (i in f.headers) {
                    w.setRequestHeader(i, f.headers[i]);
                }
                if (f.beforeSend && (f.beforeSend.call(c, w, f) === false || b === 2)) {
                    return w.abort();
                }
                x = "abort";
                for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                    w[i](f[i]);
                }
                l = Mn(Fn, f, t, w);
                if (!l) {
                    T(-1, "No Transport");
                } else {
                    w.readyState = 1;
                    if (a) {
                        p.trigger("ajaxSend", [ w, f ]);
                    }
                    if (f.async && f.timeout > 0) {
                        s = setTimeout(function() {
                            w.abort("timeout");
                        }, f.timeout);
                    }
                    try {
                        b = 1;
                        l.send(v, T);
                    } catch (C) {
                        if (b < 2) {
                            T(-1, C);
                        } else {
                            throw C;
                        }
                    }
                }
                function T(e, t, n, i) {
                    var u, v, y, x, C, T = t;
                    if (b === 2) {
                        return;
                    }
                    b = 2;
                    if (s) {
                        clearTimeout(s);
                    }
                    l = undefined;
                    o = i || "";
                    w.readyState = e > 0 ? 4 : 0;
                    u = e >= 200 && e < 300 || e === 304;
                    if (n) {
                        x = Wn(f, w, n);
                    }
                    x = Rn(f, x, w, u);
                    if (u) {
                        if (f.ifModified) {
                            C = w.getResponseHeader("Last-Modified");
                            if (C) {
                                d.lastModified[r] = C;
                            }
                            C = w.getResponseHeader("etag");
                            if (C) {
                                d.etag[r] = C;
                            }
                        }
                        if (e === 204 || f.type === "HEAD") {
                            T = "nocontent";
                        } else if (e === 304) {
                            T = "notmodified";
                        } else {
                            T = x.state;
                            v = x.data;
                            y = x.error;
                            u = !y;
                        }
                    } else {
                        y = T;
                        if (e || !T) {
                            T = "error";
                            if (e < 0) {
                                e = 0;
                            }
                        }
                    }
                    w.status = e;
                    w.statusText = (t || T) + "";
                    if (u) {
                        h.resolveWith(c, [ v, T, w ]);
                    } else {
                        h.rejectWith(c, [ w, T, y ]);
                    }
                    w.statusCode(g);
                    g = undefined;
                    if (a) {
                        p.trigger(u ? "ajaxSuccess" : "ajaxError", [ w, f, u ? v : y ]);
                    }
                    m.fireWith(c, [ w, T ]);
                    if (a) {
                        p.trigger("ajaxComplete", [ w, f ]);
                        if (!--d.active) {
                            d.event.trigger("ajaxStop");
                        }
                    }
                }
                return w;
            },
            getJSON: function(e, t, n) {
                return d.get(e, t, n, "json");
            },
            getScript: function(e, t) {
                return d.get(e, undefined, t, "script");
            }
        });
        d.each([ "get", "post" ], function(e, t) {
            d[t] = function(e, n, i, r) {
                if (d.isFunction(n)) {
                    r = r || i;
                    i = n;
                    n = undefined;
                }
                return d.ajax({
                    url: e,
                    type: t,
                    dataType: r,
                    data: n,
                    success: i
                });
            };
        });
        d.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
            d.fn[t] = function(e) {
                return this.on(t, e);
            };
        });
        d._evalUrl = function(e) {
            return d.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: false,
                global: false,
                "throws": true
            });
        };
        d.fn.extend({
            wrapAll: function(e) {
                if (d.isFunction(e)) {
                    return this.each(function(t) {
                        d(this).wrapAll(e.call(this, t));
                    });
                }
                if (this[0]) {
                    var t = d(e, this[0].ownerDocument).eq(0).clone(true);
                    if (this[0].parentNode) {
                        t.insertBefore(this[0]);
                    }
                    t.map(function() {
                        var e = this;
                        while (e.firstChild && e.firstChild.nodeType === 1) {
                            e = e.firstChild;
                        }
                        return e;
                    }).append(this);
                }
                return this;
            },
            wrapInner: function(e) {
                if (d.isFunction(e)) {
                    return this.each(function(t) {
                        d(this).wrapInner(e.call(this, t));
                    });
                }
                return this.each(function() {
                    var t = d(this), n = t.contents();
                    if (n.length) {
                        n.wrapAll(e);
                    } else {
                        t.append(e);
                    }
                });
            },
            wrap: function(e) {
                var t = d.isFunction(e);
                return this.each(function(n) {
                    d(this).wrapAll(t ? e.call(this, n) : e);
                });
            },
            unwrap: function() {
                return this.parent().each(function() {
                    if (!d.nodeName(this, "body")) {
                        d(this).replaceWith(this.childNodes);
                    }
                }).end();
            }
        });
        d.expr.filters.hidden = function(e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !f.reliableHiddenOffsets() && (e.style && e.style.display || d.css(e, "display")) === "none";
        };
        d.expr.filters.visible = function(e) {
            return !d.expr.filters.hidden(e);
        };
        var In = /%20/g, zn = /\[\]$/, Un = /\r?\n/g, Xn = /^(?:submit|button|image|reset|file)$/i, Vn = /^(?:input|select|textarea|keygen)/i;
        function Jn(e, t, n, i) {
            var r;
            if (d.isArray(t)) {
                d.each(t, function(t, r) {
                    if (n || zn.test(e)) {
                        i(e, r);
                    } else {
                        Jn(e + "[" + (typeof r === "object" ? t : "") + "]", r, n, i);
                    }
                });
            } else if (!n && d.type(t) === "object") {
                for (r in t) {
                    Jn(e + "[" + r + "]", t[r], n, i);
                }
            } else {
                i(e, t);
            }
        }
        d.param = function(e, t) {
            var n, i = [], r = function(e, t) {
                t = d.isFunction(t) ? t() : t == null ? "" : t;
                i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
            };
            if (t === undefined) {
                t = d.ajaxSettings && d.ajaxSettings.traditional;
            }
            if (d.isArray(e) || e.jquery && !d.isPlainObject(e)) {
                d.each(e, function() {
                    r(this.name, this.value);
                });
            } else {
                for (n in e) {
                    Jn(n, e[n], t, r);
                }
            }
            return i.join("&").replace(In, "+");
        };
        d.fn.extend({
            serialize: function() {
                return d.param(this.serializeArray());
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = d.prop(this, "elements");
                    return e ? d.makeArray(e) : this;
                }).filter(function() {
                    var e = this.type;
                    return this.name && !d(this).is(":disabled") && Vn.test(this.nodeName) && !Xn.test(e) && (this.checked || !J.test(e));
                }).map(function(e, t) {
                    var n = d(this).val();
                    return n == null ? null : d.isArray(n) ? d.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Un, "\r\n")
                        };
                    }) : {
                        name: t.name,
                        value: n.replace(Un, "\r\n")
                    };
                }).get();
            }
        });
        d.ajaxSettings.xhr = e.ActiveXObject !== undefined ? function() {
            return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Kn() || Zn();
        } : Kn;
        var Yn = 0, Qn = {}, Gn = d.ajaxSettings.xhr();
        if (e.ActiveXObject) {
            d(e).on("unload", function() {
                for (var e in Qn) {
                    Qn[e](undefined, true);
                }
            });
        }
        f.cors = !!Gn && "withCredentials" in Gn;
        Gn = f.ajax = !!Gn;
        if (Gn) {
            d.ajaxTransport(function(e) {
                if (!e.crossDomain || f.cors) {
                    var t;
                    return {
                        send: function(n, i) {
                            var r, o = e.xhr(), s = ++Yn;
                            o.open(e.type, e.url, e.async, e.username, e.password);
                            if (e.xhrFields) {
                                for (r in e.xhrFields) {
                                    o[r] = e.xhrFields[r];
                                }
                            }
                            if (e.mimeType && o.overrideMimeType) {
                                o.overrideMimeType(e.mimeType);
                            }
                            if (!e.crossDomain && !n["X-Requested-With"]) {
                                n["X-Requested-With"] = "XMLHttpRequest";
                            }
                            for (r in n) {
                                if (n[r] !== undefined) {
                                    o.setRequestHeader(r, n[r] + "");
                                }
                            }
                            o.send(e.hasContent && e.data || null);
                            t = function(n, r) {
                                var a, l, u;
                                if (t && (r || o.readyState === 4)) {
                                    delete Qn[s];
                                    t = undefined;
                                    o.onreadystatechange = d.noop;
                                    if (r) {
                                        if (o.readyState !== 4) {
                                            o.abort();
                                        }
                                    } else {
                                        u = {};
                                        a = o.status;
                                        if (typeof o.responseText === "string") {
                                            u.text = o.responseText;
                                        }
                                        try {
                                            l = o.statusText;
                                        } catch (f) {
                                            l = "";
                                        }
                                        if (!a && e.isLocal && !e.crossDomain) {
                                            a = u.text ? 200 : 404;
                                        } else if (a === 1223) {
                                            a = 204;
                                        }
                                    }
                                }
                                if (u) {
                                    i(a, l, u, o.getAllResponseHeaders());
                                }
                            };
                            if (!e.async) {
                                t();
                            } else if (o.readyState === 4) {
                                setTimeout(t);
                            } else {
                                o.onreadystatechange = Qn[s] = t;
                            }
                        },
                        abort: function() {
                            if (t) {
                                t(undefined, true);
                            }
                        }
                    };
                }
            });
        }
        function Kn() {
            try {
                return new e.XMLHttpRequest();
            } catch (t) {}
        }
        function Zn() {
            try {
                return new e.ActiveXObject("Microsoft.XMLHTTP");
            } catch (t) {}
        }
        d.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(e) {
                    d.globalEval(e);
                    return e;
                }
            }
        });
        d.ajaxPrefilter("script", function(e) {
            if (e.cache === undefined) {
                e.cache = false;
            }
            if (e.crossDomain) {
                e.type = "GET";
                e.global = false;
            }
        });
        d.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var t, n = E.head || d("head")[0] || E.documentElement;
                return {
                    send: function(i, r) {
                        t = E.createElement("script");
                        t.async = true;
                        if (e.scriptCharset) {
                            t.charset = e.scriptCharset;
                        }
                        t.src = e.url;
                        t.onload = t.onreadystatechange = function(e, n) {
                            if (n || !t.readyState || /loaded|complete/.test(t.readyState)) {
                                t.onload = t.onreadystatechange = null;
                                if (t.parentNode) {
                                    t.parentNode.removeChild(t);
                                }
                                t = null;
                                if (!n) {
                                    r(200, "success");
                                }
                            }
                        };
                        n.insertBefore(t, n.firstChild);
                    },
                    abort: function() {
                        if (t) {
                            t.onload(undefined, true);
                        }
                    }
                };
            }
        });
        var ei = [], ti = /(=)\?(?=&|$)|\?\?/;
        d.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = ei.pop() || d.expando + "_" + Cn++;
                this[e] = true;
                return e;
            }
        });
        d.ajaxPrefilter("json jsonp", function(t, n, i) {
            var r, o, s, a = t.jsonp !== false && (ti.test(t.url) ? "url" : typeof t.data === "string" && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && ti.test(t.data) && "data");
            if (a || t.dataTypes[0] === "jsonp") {
                r = t.jsonpCallback = d.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback;
                if (a) {
                    t[a] = t[a].replace(ti, "$1" + r);
                } else if (t.jsonp !== false) {
                    t.url += (Tn.test(t.url) ? "&" : "?") + t.jsonp + "=" + r;
                }
                t.converters["script json"] = function() {
                    if (!s) {
                        d.error(r + " was not called");
                    }
                    return s[0];
                };
                t.dataTypes[0] = "json";
                o = e[r];
                e[r] = function() {
                    s = arguments;
                };
                i.always(function() {
                    e[r] = o;
                    if (t[r]) {
                        t.jsonpCallback = n.jsonpCallback;
                        ei.push(r);
                    }
                    if (s && d.isFunction(o)) {
                        o(s[0]);
                    }
                    s = o = undefined;
                });
                return "script";
            }
        });
        d.parseHTML = function(e, t, n) {
            if (!e || typeof e !== "string") {
                return null;
            }
            if (typeof t === "boolean") {
                n = t;
                t = false;
            }
            t = t || E;
            var i = x.exec(e), r = !n && [];
            if (i) {
                return [ t.createElement(i[1]) ];
            }
            i = d.buildFragment([ e ], t, r);
            if (r && r.length) {
                d(r).remove();
            }
            return d.merge([], i.childNodes);
        };
        var ni = d.fn.load;
        d.fn.load = function(e, t, n) {
            if (typeof e !== "string" && ni) {
                return ni.apply(this, arguments);
            }
            var i, r, o, s = this, a = e.indexOf(" ");
            if (a >= 0) {
                i = d.trim(e.slice(a, e.length));
                e = e.slice(0, a);
            }
            if (d.isFunction(t)) {
                n = t;
                t = undefined;
            } else if (t && typeof t === "object") {
                o = "POST";
            }
            if (s.length > 0) {
                d.ajax({
                    url: e,
                    type: o,
                    dataType: "html",
                    data: t
                }).done(function(e) {
                    r = arguments;
                    s.html(i ? d("<div>").append(d.parseHTML(e)).find(i) : e);
                }).complete(n && function(e, t) {
                    s.each(n, r || [ e.responseText, t, e ]);
                });
            }
            return this;
        };
        d.expr.filters.animated = function(e) {
            return d.grep(d.timers, function(t) {
                return e === t.elem;
            }).length;
        };
        var ii = e.document.documentElement;
        function ri(e) {
            return d.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : false;
        }
        d.offset = {
            setOffset: function(e, t, n) {
                var i, r, o, s, a, l, u, f = d.css(e, "position"), c = d(e), p = {};
                if (f === "static") {
                    e.style.position = "relative";
                }
                a = c.offset();
                o = d.css(e, "top");
                l = d.css(e, "left");
                u = (f === "absolute" || f === "fixed") && d.inArray("auto", [ o, l ]) > -1;
                if (u) {
                    i = c.position();
                    s = i.top;
                    r = i.left;
                } else {
                    s = parseFloat(o) || 0;
                    r = parseFloat(l) || 0;
                }
                if (d.isFunction(t)) {
                    t = t.call(e, n, a);
                }
                if (t.top != null) {
                    p.top = t.top - a.top + s;
                }
                if (t.left != null) {
                    p.left = t.left - a.left + r;
                }
                if ("using" in t) {
                    t.using.call(e, p);
                } else {
                    c.css(p);
                }
            }
        };
        d.fn.extend({
            offset: function(e) {
                if (arguments.length) {
                    return e === undefined ? this : this.each(function(t) {
                        d.offset.setOffset(this, e, t);
                    });
                }
                var t, n, i = {
                    top: 0,
                    left: 0
                }, r = this[0], o = r && r.ownerDocument;
                if (!o) {
                    return;
                }
                t = o.documentElement;
                if (!d.contains(t, r)) {
                    return i;
                }
                if (typeof r.getBoundingClientRect !== _) {
                    i = r.getBoundingClientRect();
                }
                n = ri(o);
                return {
                    top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                    left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                };
            },
            position: function() {
                if (!this[0]) {
                    return;
                }
                var e, t, n = {
                    top: 0,
                    left: 0
                }, i = this[0];
                if (d.css(i, "position") === "fixed") {
                    t = i.getBoundingClientRect();
                } else {
                    e = this.offsetParent();
                    t = this.offset();
                    if (!d.nodeName(e[0], "html")) {
                        n = e.offset();
                    }
                    n.top += d.css(e[0], "borderTopWidth", true);
                    n.left += d.css(e[0], "borderLeftWidth", true);
                }
                return {
                    top: t.top - n.top - d.css(i, "marginTop", true),
                    left: t.left - n.left - d.css(i, "marginLeft", true)
                };
            },
            offsetParent: function() {
                return this.map(function() {
                    var e = this.offsetParent || ii;
                    while (e && (!d.nodeName(e, "html") && d.css(e, "position") === "static")) {
                        e = e.offsetParent;
                    }
                    return e || ii;
                });
            }
        });
        d.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var n = /Y/.test(t);
            d.fn[e] = function(i) {
                return V(this, function(e, i, r) {
                    var o = ri(e);
                    if (r === undefined) {
                        return o ? t in o ? o[t] : o.document.documentElement[i] : e[i];
                    }
                    if (o) {
                        o.scrollTo(!n ? r : d(o).scrollLeft(), n ? r : d(o).scrollTop());
                    } else {
                        e[i] = r;
                    }
                }, e, i, arguments.length, null);
            };
        });
        d.each([ "top", "left" ], function(e, t) {
            d.cssHooks[t] = Ot(f.pixelPosition, function(e, n) {
                if (n) {
                    n = Ft(e, t);
                    return qt.test(n) ? d(e).position()[t] + "px" : n;
                }
            });
        });
        d.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            d.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, i) {
                d.fn[i] = function(i, r) {
                    var o = arguments.length && (n || typeof i !== "boolean"), s = n || (i === true || r === true ? "margin" : "border");
                    return V(this, function(t, n, i) {
                        var r;
                        if (d.isWindow(t)) {
                            return t.document.documentElement["client" + e];
                        }
                        if (t.nodeType === 9) {
                            r = t.documentElement;
                            return Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e]);
                        }
                        return i === undefined ? d.css(t, n, s) : d.style(t, n, i, s);
                    }, t, o ? i : undefined, o, null);
                };
            });
        });
        d.fn.size = function() {
            return this.length;
        };
        d.fn.andSelf = d.fn.addBack;
        if (typeof define === "function" && define.amd) {
            define("jquery", [], function() {
                return d;
            });
        }
        var oi = e.jQuery, si = e.$;
        d.noConflict = function(t) {
            if (e.$ === d) {
                e.$ = si;
            }
            if (t && e.jQuery === d) {
                e.jQuery = oi;
            }
            return d;
        };
        if (typeof t === _) {
            e.jQuery = e.$ = d;
        }
        return d;
    });
});

require.register("lepture-bootstrap/index.js", function(e, t, n) {
    var i = t("jquery");
    if (typeof i === "undefined") {
        throw new Error("Bootstrap requires jQuery");
    }
    +function(e) {
        "use strict";
        function t() {
            var e = document.createElement("bootstrap");
            var t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var n in t) {
                if (e.style[n] !== undefined) {
                    return {
                        end: t[n]
                    };
                }
            }
        }
        e.fn.emulateTransitionEnd = function(t) {
            var n = false, i = this;
            e(this).one(e.support.transition.end, function() {
                n = true;
            });
            var r = function() {
                if (!n) e(i).trigger(e.support.transition.end);
            };
            setTimeout(r, t);
            return this;
        };
        e(function() {
            e.support.transition = t();
        });
    }(i);
    +function(e) {
        "use strict";
        var t = '[data-dismiss="alert"]';
        var n = function(n) {
            e(n).on("click", t, this.close);
        };
        n.prototype.close = function(t) {
            var n = e(this);
            var i = n.attr("data-target");
            if (!i) {
                i = n.attr("href");
                i = i && i.replace(/.*(?=#[^\s]*$)/, "");
            }
            var r = e(i);
            if (t) t.preventDefault();
            if (!r.length) {
                r = n.hasClass("alert") ? n : n.parent();
            }
            r.trigger(t = e.Event("close.bs.alert"));
            if (t.isDefaultPrevented()) return;
            r.removeClass("in");
            function o() {
                r.trigger("closed.bs.alert").remove();
            }
            e.support.transition && r.hasClass("fade") ? r.one(e.support.transition.end, o).emulateTransitionEnd(150) : o();
        };
        var i = e.fn.alert;
        e.fn.alert = function(t) {
            return this.each(function() {
                var i = e(this);
                var r = i.data("bs.alert");
                if (!r) i.data("bs.alert", r = new n(this));
                if (typeof t == "string") r[t].call(i);
            });
        };
        e.fn.alert.Constructor = n;
        e.fn.alert.noConflict = function() {
            e.fn.alert = i;
            return this;
        };
        e(document).on("click.bs.alert.data-api", t, n.prototype.close);
    }(i);
    +function(e) {
        "use strict";
        var t = function(n, i) {
            this.$element = e(n);
            this.options = e.extend({}, t.DEFAULTS, i);
        };
        t.DEFAULTS = {
            loadingText: "loading..."
        };
        t.prototype.setState = function(e) {
            var t = "disabled";
            var n = this.$element;
            var i = n.is("input") ? "val" : "html";
            var r = n.data();
            e = e + "Text";
            if (!r.resetText) n.data("resetText", n[i]());
            n[i](r[e] || this.options[e]);
            setTimeout(function() {
                e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t);
            }, 0);
        };
        t.prototype.toggle = function() {
            var e = this.$element.closest('[data-toggle="buttons"]');
            var t = true;
            if (e.length) {
                var n = this.$element.find("input");
                if (n.prop("type") === "radio") {
                    if (n.prop("checked") && this.$element.hasClass("active")) t = false; else e.find(".active").removeClass("active");
                }
                if (t) n.prop("checked", !this.$element.hasClass("active")).trigger("change");
            }
            if (t) this.$element.toggleClass("active");
        };
        var n = e.fn.button;
        e.fn.button = function(n) {
            return this.each(function() {
                var i = e(this);
                var r = i.data("bs.button");
                var o = typeof n == "object" && n;
                if (!r) i.data("bs.button", r = new t(this, o));
                if (n == "toggle") r.toggle(); else if (n) r.setState(n);
            });
        };
        e.fn.button.Constructor = t;
        e.fn.button.noConflict = function() {
            e.fn.button = n;
            return this;
        };
        e(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(t) {
            var n = e(t.target);
            if (!n.hasClass("btn")) n = n.closest(".btn");
            n.button("toggle");
            t.preventDefault();
        });
    }(i);
    +function(e) {
        "use strict";
        var t = function(t, n) {
            this.$element = e(t);
            this.$indicators = this.$element.find(".carousel-indicators");
            this.options = n;
            this.paused = this.sliding = this.interval = this.$active = this.$items = null;
            this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this));
        };
        t.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: true
        };
        t.prototype.cycle = function(t) {
            t || (this.paused = false);
            this.interval && clearInterval(this.interval);
            this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval));
            return this;
        };
        t.prototype.getActiveIndex = function() {
            this.$active = this.$element.find(".item.active");
            this.$items = this.$active.parent().children();
            return this.$items.index(this.$active);
        };
        t.prototype.to = function(t) {
            var n = this;
            var i = this.getActiveIndex();
            if (t > this.$items.length - 1 || t < 0) return;
            if (this.sliding) return this.$element.one("slid", function() {
                n.to(t);
            });
            if (i == t) return this.pause().cycle();
            return this.slide(t > i ? "next" : "prev", e(this.$items[t]));
        };
        t.prototype.pause = function(t) {
            t || (this.paused = true);
            if (this.$element.find(".next, .prev").length && e.support.transition.end) {
                this.$element.trigger(e.support.transition.end);
                this.cycle(true);
            }
            this.interval = clearInterval(this.interval);
            return this;
        };
        t.prototype.next = function() {
            if (this.sliding) return;
            return this.slide("next");
        };
        t.prototype.prev = function() {
            if (this.sliding) return;
            return this.slide("prev");
        };
        t.prototype.slide = function(t, n) {
            var i = this.$element.find(".item.active");
            var r = n || i[t]();
            var o = this.interval;
            var s = t == "next" ? "left" : "right";
            var a = t == "next" ? "first" : "last";
            var l = this;
            if (!r.length) {
                if (!this.options.wrap) return;
                r = this.$element.find(".item")[a]();
            }
            this.sliding = true;
            o && this.pause();
            var u = e.Event("slide.bs.carousel", {
                relatedTarget: r[0],
                direction: s
            });
            if (r.hasClass("active")) return;
            if (this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                this.$element.one("slid", function() {
                    var t = e(l.$indicators.children()[l.getActiveIndex()]);
                    t && t.addClass("active");
                });
            }
            if (e.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(u);
                if (u.isDefaultPrevented()) return;
                r.addClass(t);
                r[0].offsetWidth;
                i.addClass(s);
                r.addClass(s);
                i.one(e.support.transition.end, function() {
                    r.removeClass([ t, s ].join(" ")).addClass("active");
                    i.removeClass([ "active", s ].join(" "));
                    l.sliding = false;
                    setTimeout(function() {
                        l.$element.trigger("slid");
                    }, 0);
                }).emulateTransitionEnd(600);
            } else {
                this.$element.trigger(u);
                if (u.isDefaultPrevented()) return;
                i.removeClass("active");
                r.addClass("active");
                this.sliding = false;
                this.$element.trigger("slid");
            }
            o && this.cycle();
            return this;
        };
        var n = e.fn.carousel;
        e.fn.carousel = function(n) {
            return this.each(function() {
                var i = e(this);
                var r = i.data("bs.carousel");
                var o = e.extend({}, t.DEFAULTS, i.data(), typeof n == "object" && n);
                var s = typeof n == "string" ? n : o.slide;
                if (!r) i.data("bs.carousel", r = new t(this, o));
                if (typeof n == "number") r.to(n); else if (s) r[s](); else if (o.interval) r.pause().cycle();
            });
        };
        e.fn.carousel.Constructor = t;
        e.fn.carousel.noConflict = function() {
            e.fn.carousel = n;
            return this;
        };
        e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
            var n = e(this), i;
            var r = e(n.attr("data-target") || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
            var o = e.extend({}, r.data(), n.data());
            var s = n.attr("data-slide-to");
            if (s) o.interval = false;
            r.carousel(o);
            if (s = n.attr("data-slide-to")) {
                r.data("bs.carousel").to(s);
            }
            t.preventDefault();
        });
        e(window).on("load", function() {
            e('[data-ride="carousel"]').each(function() {
                var t = e(this);
                t.carousel(t.data());
            });
        });
    }(i);
    +function(e) {
        "use strict";
        var t = function(n, i) {
            this.$element = e(n);
            this.options = e.extend({}, t.DEFAULTS, i);
            this.transitioning = null;
            if (this.options.parent) this.$parent = e(this.options.parent);
            if (this.options.toggle) this.toggle();
        };
        t.DEFAULTS = {
            toggle: true
        };
        t.prototype.dimension = function() {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height";
        };
        t.prototype.show = function() {
            if (this.transitioning || this.$element.hasClass("in")) return;
            var t = e.Event("show.bs.collapse");
            this.$element.trigger(t);
            if (t.isDefaultPrevented()) return;
            var n = this.$parent && this.$parent.find("> .panel > .in");
            if (n && n.length) {
                var i = n.data("bs.collapse");
                if (i && i.transitioning) return;
                n.collapse("hide");
                i || n.data("bs.collapse", null);
            }
            var r = this.dimension();
            this.$element.removeClass("collapse").addClass("collapsing")[r](0);
            this.transitioning = 1;
            var o = function() {
                this.$element.removeClass("collapsing").addClass("in")[r]("auto");
                this.transitioning = 0;
                this.$element.trigger("shown.bs.collapse");
            };
            if (!e.support.transition) return o.call(this);
            var s = e.camelCase([ "scroll", r ].join("-"));
            this.$element.one(e.support.transition.end, e.proxy(o, this)).emulateTransitionEnd(350)[r](this.$element[0][s]);
        };
        t.prototype.hide = function() {
            if (this.transitioning || !this.$element.hasClass("in")) return;
            var t = e.Event("hide.bs.collapse");
            this.$element.trigger(t);
            if (t.isDefaultPrevented()) return;
            var n = this.dimension();
            this.$element[n](this.$element[n]())[0].offsetHeight;
            this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");
            this.transitioning = 1;
            var i = function() {
                this.transitioning = 0;
                this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse");
            };
            if (!e.support.transition) return i.call(this);
            this.$element[n](0).one(e.support.transition.end, e.proxy(i, this)).emulateTransitionEnd(350);
        };
        t.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]();
        };
        var n = e.fn.collapse;
        e.fn.collapse = function(n) {
            return this.each(function() {
                var i = e(this);
                var r = i.data("bs.collapse");
                var o = e.extend({}, t.DEFAULTS, i.data(), typeof n == "object" && n);
                if (!r) i.data("bs.collapse", r = new t(this, o));
                if (typeof n == "string") r[n]();
            });
        };
        e.fn.collapse.Constructor = t;
        e.fn.collapse.noConflict = function() {
            e.fn.collapse = n;
            return this;
        };
        e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(t) {
            var n = e(this), i;
            var r = n.attr("data-target") || t.preventDefault() || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
            var o = e(r);
            var s = o.data("bs.collapse");
            var a = s ? "toggle" : n.data();
            var l = n.attr("data-parent");
            var u = l && e(l);
            if (!s || !s.transitioning) {
                if (u) u.find('[data-toggle=collapse][data-parent="' + l + '"]').not(n).addClass("collapsed");
                n[o.hasClass("in") ? "addClass" : "removeClass"]("collapsed");
            }
            o.collapse(a);
        });
    }(i);
    +function(e) {
        "use strict";
        var t = ".dropdown-backdrop";
        var n = "[data-toggle=dropdown]";
        var i = function(t) {
            var n = e(t).on("click.bs.dropdown", this.toggle);
        };
        i.prototype.toggle = function(t) {
            var n = e(this);
            if (n.is(".disabled, :disabled")) return;
            var i = o(n);
            var s = i.hasClass("open");
            r();
            if (!s) {
                if ("ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length) {
                    e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", r);
                }
                i.trigger(t = e.Event("show.bs.dropdown"));
                if (t.isDefaultPrevented()) return;
                i.toggleClass("open").trigger("shown.bs.dropdown");
                n.focus();
            }
            return false;
        };
        i.prototype.keydown = function(t) {
            if (!/(38|40|27)/.test(t.keyCode)) return;
            var i = e(this);
            t.preventDefault();
            t.stopPropagation();
            if (i.is(".disabled, :disabled")) return;
            var r = o(i);
            var s = r.hasClass("open");
            if (!s || s && t.keyCode == 27) {
                if (t.which == 27) r.find(n).focus();
                return i.click();
            }
            var a = e("[role=menu] li:not(.divider):visible a", r);
            if (!a.length) return;
            var l = a.index(a.filter(":focus"));
            if (t.keyCode == 38 && l > 0) l--;
            if (t.keyCode == 40 && l < a.length - 1) l++;
            if (!~l) l = 0;
            a.eq(l).focus();
        };
        function r() {
            e(t).remove();
            e(n).each(function(t) {
                var n = o(e(this));
                if (!n.hasClass("open")) return;
                n.trigger(t = e.Event("hide.bs.dropdown"));
                if (t.isDefaultPrevented()) return;
                n.removeClass("open").trigger("hidden.bs.dropdown");
            });
        }
        function o(t) {
            var n = t.attr("data-target");
            if (!n) {
                n = t.attr("href");
                n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "");
            }
            var i = n && e(n);
            return i && i.length ? i : t.parent();
        }
        var s = e.fn.dropdown;
        e.fn.dropdown = function(t) {
            return this.each(function() {
                var n = e(this);
                var r = n.data("dropdown");
                if (!r) n.data("dropdown", r = new i(this));
                if (typeof t == "string") r[t].call(n);
            });
        };
        e.fn.dropdown.Constructor = i;
        e.fn.dropdown.noConflict = function() {
            e.fn.dropdown = s;
            return this;
        };
        e(document).on("click.bs.dropdown.data-api", r).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
            e.stopPropagation();
        }).on("click.bs.dropdown.data-api", n, i.prototype.toggle).on("keydown.bs.dropdown.data-api", n + ", [role=menu]", i.prototype.keydown);
    }(i);
    +function(e) {
        "use strict";
        var t = function(t, n) {
            this.options = n;
            this.$element = e(t);
            this.$backdrop = this.isShown = null;
            if (this.options.remote) this.$element.load(this.options.remote);
        };
        t.DEFAULTS = {
            backdrop: true,
            keyboard: true,
            show: true
        };
        t.prototype.toggle = function(e) {
            return this[!this.isShown ? "show" : "hide"](e);
        };
        t.prototype.show = function(t) {
            var n = this;
            var i = e.Event("show.bs.modal", {
                relatedTarget: t
            });
            this.$element.trigger(i);
            if (this.isShown || i.isDefaultPrevented()) return;
            this.isShown = true;
            this.escape();
            this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this));
            this.backdrop(function() {
                var i = e.support.transition && n.$element.hasClass("fade");
                if (!n.$element.parent().length) {
                    n.$element.appendTo(document.body);
                }
                n.$element.show();
                if (i) {
                    n.$element[0].offsetWidth;
                }
                n.$element.addClass("in").attr("aria-hidden", false);
                n.enforceFocus();
                var r = e.Event("shown.bs.modal", {
                    relatedTarget: t
                });
                i ? n.$element.find(".modal-dialog").one(e.support.transition.end, function() {
                    n.$element.focus().trigger(r);
                }).emulateTransitionEnd(300) : n.$element.focus().trigger(r);
            });
        };
        t.prototype.hide = function(t) {
            if (t) t.preventDefault();
            t = e.Event("hide.bs.modal");
            this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented()) return;
            this.isShown = false;
            this.escape();
            e(document).off("focusin.bs.modal");
            this.$element.removeClass("in").attr("aria-hidden", true).off("click.dismiss.modal");
            e.support.transition && this.$element.hasClass("fade") ? this.$element.one(e.support.transition.end, e.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal();
        };
        t.prototype.enforceFocus = function() {
            e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(e) {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.focus();
                }
            }, this));
        };
        t.prototype.escape = function() {
            if (this.isShown && this.options.keyboard) {
                this.$element.on("keyup.dismiss.bs.modal", e.proxy(function(e) {
                    e.which == 27 && this.hide();
                }, this));
            } else if (!this.isShown) {
                this.$element.off("keyup.dismiss.bs.modal");
            }
        };
        t.prototype.hideModal = function() {
            var e = this;
            this.$element.hide();
            this.backdrop(function() {
                e.removeBackdrop();
                e.$element.trigger("hidden.bs.modal");
            });
        };
        t.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null;
        };
        t.prototype.backdrop = function(t) {
            var n = this;
            var i = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var r = e.support.transition && i;
                this.$backdrop = e('<div class="modal-backdrop ' + i + '" />').appendTo(document.body);
                this.$element.on("click.dismiss.modal", e.proxy(function(e) {
                    if (e.target !== e.currentTarget) return;
                    this.options.backdrop == "static" ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this);
                }, this));
                if (r) this.$backdrop[0].offsetWidth;
                this.$backdrop.addClass("in");
                if (!t) return;
                r ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t();
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t();
            } else if (t) {
                t();
            }
        };
        var n = e.fn.modal;
        e.fn.modal = function(n, i) {
            return this.each(function() {
                var r = e(this);
                var o = r.data("bs.modal");
                var s = e.extend({}, t.DEFAULTS, r.data(), typeof n == "object" && n);
                if (!o) r.data("bs.modal", o = new t(this, s));
                if (typeof n == "string") o[n](i); else if (s.show) o.show(i);
            });
        };
        e.fn.modal.Constructor = t;
        e.fn.modal.noConflict = function() {
            e.fn.modal = n;
            return this;
        };
        e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
            var n = e(this);
            var i = n.attr("href");
            var r = e(n.attr("data-target") || i && i.replace(/.*(?=#[^\s]+$)/, ""));
            var o = r.data("modal") ? "toggle" : e.extend({
                remote: !/#/.test(i) && i
            }, r.data(), n.data());
            t.preventDefault();
            r.modal(o, this).one("hide", function() {
                n.is(":visible") && n.focus();
            });
        });
        e(document).on("show.bs.modal", ".modal", function() {
            e(document.body).addClass("modal-open");
        }).on("hidden.bs.modal", ".modal", function() {
            e(document.body).removeClass("modal-open");
        });
    }(i);
    +function(e) {
        "use strict";
        var t = function(e, t) {
            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
            this.init("tooltip", e, t);
        };
        t.DEFAULTS = {
            animation: true,
            placement: "top",
            selector: false,
            template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: false,
            container: false
        };
        t.prototype.init = function(t, n, i) {
            this.enabled = true;
            this.type = t;
            this.$element = e(n);
            this.options = this.getOptions(i);
            var r = this.options.trigger.split(" ");
            for (var o = r.length; o--; ) {
                var s = r[o];
                if (s == "click") {
                    this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
                } else if (s != "manual") {
                    var a = s == "hover" ? "mouseenter" : "focus";
                    var l = s == "hover" ? "mouseleave" : "blur";
                    this.$element.on(a + "." + this.type, this.options.selector, e.proxy(this.enter, this));
                    this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this));
                }
            }
            this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle();
        };
        t.prototype.getDefaults = function() {
            return t.DEFAULTS;
        };
        t.prototype.getOptions = function(t) {
            t = e.extend({}, this.getDefaults(), this.$element.data(), t);
            if (t.delay && typeof t.delay == "number") {
                t.delay = {
                    show: t.delay,
                    hide: t.delay
                };
            }
            return t;
        };
        t.prototype.getDelegateOptions = function() {
            var t = {};
            var n = this.getDefaults();
            this._options && e.each(this._options, function(e, i) {
                if (n[e] != i) t[e] = i;
            });
            return t;
        };
        t.prototype.enter = function(t) {
            var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
            clearTimeout(n.timeout);
            n.hoverState = "in";
            if (!n.options.delay || !n.options.delay.show) return n.show();
            n.timeout = setTimeout(function() {
                if (n.hoverState == "in") n.show();
            }, n.options.delay.show);
        };
        t.prototype.leave = function(t) {
            var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
            clearTimeout(n.timeout);
            n.hoverState = "out";
            if (!n.options.delay || !n.options.delay.hide) return n.hide();
            n.timeout = setTimeout(function() {
                if (n.hoverState == "out") n.hide();
            }, n.options.delay.hide);
        };
        t.prototype.show = function() {
            var t = e.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(t);
                if (t.isDefaultPrevented()) return;
                var n = this.tip();
                this.setContent();
                if (this.options.animation) n.addClass("fade");
                var i = typeof this.options.placement == "function" ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement;
                var r = /\s?auto?\s?/i;
                var o = r.test(i);
                if (o) i = i.replace(r, "") || "top";
                n.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(i);
                this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
                var s = this.getPosition();
                var a = n[0].offsetWidth;
                var l = n[0].offsetHeight;
                if (o) {
                    var u = this.$element.parent();
                    var f = i;
                    var c = document.documentElement.scrollTop || document.body.scrollTop;
                    var d = this.options.container == "body" ? window.innerWidth : u.outerWidth();
                    var p = this.options.container == "body" ? window.innerHeight : u.outerHeight();
                    var h = this.options.container == "body" ? 0 : u.offset().left;
                    i = i == "bottom" && s.top + s.height + l - c > p ? "top" : i == "top" && s.top - c - l < 0 ? "bottom" : i == "right" && s.right + a > d ? "left" : i == "left" && s.left - a < h ? "right" : i;
                    n.removeClass(f).addClass(i);
                }
                var m = this.getCalculatedOffset(i, s, a, l);
                this.applyPlacement(m, i);
                this.$element.trigger("shown.bs." + this.type);
            }
        };
        t.prototype.applyPlacement = function(e, t) {
            var n;
            var i = this.tip();
            var r = i[0].offsetWidth;
            var o = i[0].offsetHeight;
            var s = parseInt(i.css("margin-top"), 10);
            var a = parseInt(i.css("margin-left"), 10);
            if (isNaN(s)) s = 0;
            if (isNaN(a)) a = 0;
            e.top = e.top + s;
            e.left = e.left + a;
            i.offset(e).addClass("in");
            var l = i[0].offsetWidth;
            var u = i[0].offsetHeight;
            if (t == "top" && u != o) {
                n = true;
                e.top = e.top + o - u;
            }
            if (/bottom|top/.test(t)) {
                var f = 0;
                if (e.left < 0) {
                    f = e.left * -2;
                    e.left = 0;
                    i.offset(e);
                    l = i[0].offsetWidth;
                    u = i[0].offsetHeight;
                }
                this.replaceArrow(f - r + l, l, "left");
            } else {
                this.replaceArrow(u - o, u, "top");
            }
            if (n) i.offset(e);
        };
        t.prototype.replaceArrow = function(e, t, n) {
            this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "");
        };
        t.prototype.setContent = function() {
            var e = this.tip();
            var t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t);
            e.removeClass("fade in top bottom left right");
        };
        t.prototype.hide = function() {
            var t = this;
            var n = this.tip();
            var i = e.Event("hide.bs." + this.type);
            function r() {
                if (t.hoverState != "in") n.detach();
            }
            this.$element.trigger(i);
            if (i.isDefaultPrevented()) return;
            n.removeClass("in");
            e.support.transition && this.$tip.hasClass("fade") ? n.one(e.support.transition.end, r).emulateTransitionEnd(150) : r();
            this.$element.trigger("hidden.bs." + this.type);
            return this;
        };
        t.prototype.fixTitle = function() {
            var e = this.$element;
            if (e.attr("title") || typeof e.attr("data-original-title") != "string") {
                e.attr("data-original-title", e.attr("title") || "").attr("title", "");
            }
        };
        t.prototype.hasContent = function() {
            return this.getTitle();
        };
        t.prototype.getPosition = function() {
            var t = this.$element[0];
            return e.extend({}, typeof t.getBoundingClientRect == "function" ? t.getBoundingClientRect() : {
                width: t.offsetWidth,
                height: t.offsetHeight
            }, this.$element.offset());
        };
        t.prototype.getCalculatedOffset = function(e, t, n, i) {
            return e == "bottom" ? {
                top: t.top + t.height,
                left: t.left + t.width / 2 - n / 2
            } : e == "top" ? {
                top: t.top - i,
                left: t.left + t.width / 2 - n / 2
            } : e == "left" ? {
                top: t.top + t.height / 2 - i / 2,
                left: t.left - n
            } : {
                top: t.top + t.height / 2 - i / 2,
                left: t.left + t.width
            };
        };
        t.prototype.getTitle = function() {
            var e;
            var t = this.$element;
            var n = this.options;
            e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title);
            return e;
        };
        t.prototype.tip = function() {
            return this.$tip = this.$tip || e(this.options.template);
        };
        t.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
        };
        t.prototype.validate = function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        };
        t.prototype.enable = function() {
            this.enabled = true;
        };
        t.prototype.disable = function() {
            this.enabled = false;
        };
        t.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled;
        };
        t.prototype.toggle = function(t) {
            var n = t ? e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
            n.tip().hasClass("in") ? n.leave(n) : n.enter(n);
        };
        t.prototype.destroy = function() {
            this.hide().$element.off("." + this.type).removeData("bs." + this.type);
        };
        var n = e.fn.tooltip;
        e.fn.tooltip = function(n) {
            return this.each(function() {
                var i = e(this);
                var r = i.data("bs.tooltip");
                var o = typeof n == "object" && n;
                if (!r) i.data("bs.tooltip", r = new t(this, o));
                if (typeof n == "string") r[n]();
            });
        };
        e.fn.tooltip.Constructor = t;
        e.fn.tooltip.noConflict = function() {
            e.fn.tooltip = n;
            return this;
        };
    }(i);
    +function(e) {
        "use strict";
        var t = function(e, t) {
            this.init("popover", e, t);
        };
        if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
        t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        });
        t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype);
        t.prototype.constructor = t;
        t.prototype.getDefaults = function() {
            return t.DEFAULTS;
        };
        t.prototype.setContent = function() {
            var e = this.tip();
            var t = this.getTitle();
            var n = this.getContent();
            e.find(".popover-title")[this.options.html ? "html" : "text"](t);
            e.find(".popover-content")[this.options.html ? "html" : "text"](n);
            e.removeClass("fade top bottom left right in");
            if (!e.find(".popover-title").html()) e.find(".popover-title").hide();
        };
        t.prototype.hasContent = function() {
            return this.getTitle() || this.getContent();
        };
        t.prototype.getContent = function() {
            var e = this.$element;
            var t = this.options;
            return e.attr("data-content") || (typeof t.content == "function" ? t.content.call(e[0]) : t.content);
        };
        t.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".arrow");
        };
        t.prototype.tip = function() {
            if (!this.$tip) this.$tip = e(this.options.template);
            return this.$tip;
        };
        var n = e.fn.popover;
        e.fn.popover = function(n) {
            return this.each(function() {
                var i = e(this);
                var r = i.data("bs.popover");
                var o = typeof n == "object" && n;
                if (!r) i.data("bs.popover", r = new t(this, o));
                if (typeof n == "string") r[n]();
            });
        };
        e.fn.popover.Constructor = t;
        e.fn.popover.noConflict = function() {
            e.fn.popover = n;
            return this;
        };
    }(i);
    +function(e) {
        "use strict";
        function t(n, i) {
            var r;
            var o = e.proxy(this.process, this);
            this.$element = e(n).is("body") ? e(window) : e(n);
            this.$body = e("body");
            this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", o);
            this.options = e.extend({}, t.DEFAULTS, i);
            this.selector = (this.options.target || (r = e(n).attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a";
            this.offsets = e([]);
            this.targets = e([]);
            this.activeTarget = null;
            this.refresh();
            this.process();
        }
        t.DEFAULTS = {
            offset: 10
        };
        t.prototype.refresh = function() {
            var t = this.$element[0] == window ? "offset" : "position";
            this.offsets = e([]);
            this.targets = e([]);
            var n = this;
            var i = this.$body.find(this.selector).map(function() {
                var i = e(this);
                var r = i.data("target") || i.attr("href");
                var o = /^#\w/.test(r) && e(r);
                return o && o.length && [ [ o[t]().top + (!e.isWindow(n.$scrollElement.get(0)) && n.$scrollElement.scrollTop()), r ] ] || null;
            }).sort(function(e, t) {
                return e[0] - t[0];
            }).each(function() {
                n.offsets.push(this[0]);
                n.targets.push(this[1]);
            });
        };
        t.prototype.process = function() {
            var e = this.$scrollElement.scrollTop() + this.options.offset;
            var t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight;
            var n = t - this.$scrollElement.height();
            var i = this.offsets;
            var r = this.targets;
            var o = this.activeTarget;
            var s;
            if (e >= n) {
                return o != (s = r.last()[0]) && this.activate(s);
            }
            for (s = i.length; s--; ) {
                o != r[s] && e >= i[s] && (!i[s + 1] || e <= i[s + 1]) && this.activate(r[s]);
            }
        };
        t.prototype.activate = function(t) {
            this.activeTarget = t;
            e(this.selector).parents(".active").removeClass("active");
            var n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]';
            var i = e(n).parents("li").addClass("active");
            if (i.parent(".dropdown-menu").length) {
                i = i.closest("li.dropdown").addClass("active");
            }
            i.trigger("activate");
        };
        var n = e.fn.scrollspy;
        e.fn.scrollspy = function(n) {
            return this.each(function() {
                var i = e(this);
                var r = i.data("bs.scrollspy");
                var o = typeof n == "object" && n;
                if (!r) i.data("bs.scrollspy", r = new t(this, o));
                if (typeof n == "string") r[n]();
            });
        };
        e.fn.scrollspy.Constructor = t;
        e.fn.scrollspy.noConflict = function() {
            e.fn.scrollspy = n;
            return this;
        };
        e(window).on("load", function() {
            e('[data-spy="scroll"]').each(function() {
                var t = e(this);
                t.scrollspy(t.data());
            });
        });
    }(i);
    +function(e) {
        "use strict";
        var t = function(t) {
            this.element = e(t);
        };
        t.prototype.show = function() {
            var t = this.element;
            var n = t.closest("ul:not(.dropdown-menu)");
            var i = t.data("target");
            if (!i) {
                i = t.attr("href");
                i = i && i.replace(/.*(?=#[^\s]*$)/, "");
            }
            if (t.parent("li").hasClass("active")) return;
            var r = n.find(".active:last a")[0];
            var o = e.Event("show.bs.tab", {
                relatedTarget: r
            });
            t.trigger(o);
            if (o.isDefaultPrevented()) return;
            var s = e(i);
            this.activate(t.parent("li"), n);
            this.activate(s, s.parent(), function() {
                t.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: r
                });
            });
        };
        t.prototype.activate = function(t, n, i) {
            var r = n.find("> .active");
            var o = i && e.support.transition && r.hasClass("fade");
            function s() {
                r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
                t.addClass("active");
                if (o) {
                    t[0].offsetWidth;
                    t.addClass("in");
                } else {
                    t.removeClass("fade");
                }
                if (t.parent(".dropdown-menu")) {
                    t.closest("li.dropdown").addClass("active");
                }
                i && i();
            }
            o ? r.one(e.support.transition.end, s).emulateTransitionEnd(150) : s();
            r.removeClass("in");
        };
        var n = e.fn.tab;
        e.fn.tab = function(n) {
            return this.each(function() {
                var i = e(this);
                var r = i.data("bs.tab");
                if (!r) i.data("bs.tab", r = new t(this));
                if (typeof n == "string") r[n]();
            });
        };
        e.fn.tab.Constructor = t;
        e.fn.tab.noConflict = function() {
            e.fn.tab = n;
            return this;
        };
        e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
            t.preventDefault();
            e(this).tab("show");
        });
    }(i);
    +function(e) {
        "use strict";
        var t = function(n, i) {
            this.options = e.extend({}, t.DEFAULTS, i);
            this.$window = e(window).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this));
            this.$element = e(n);
            this.affixed = this.unpin = null;
            this.checkPosition();
        };
        t.RESET = "affix affix-top affix-bottom";
        t.DEFAULTS = {
            offset: 0
        };
        t.prototype.checkPositionWithEventLoop = function() {
            setTimeout(e.proxy(this.checkPosition, this), 1);
        };
        t.prototype.checkPosition = function() {
            if (!this.$element.is(":visible")) return;
            var n = e(document).height();
            var i = this.$window.scrollTop();
            var r = this.$element.offset();
            var o = this.options.offset;
            var s = o.top;
            var a = o.bottom;
            if (typeof o != "object") a = s = o;
            if (typeof s == "function") s = o.top();
            if (typeof a == "function") a = o.bottom();
            var l = this.unpin != null && i + this.unpin <= r.top ? false : a != null && r.top + this.$element.height() >= n - a ? "bottom" : s != null && i <= s ? "top" : false;
            if (this.affixed === l) return;
            if (this.unpin) this.$element.css("top", "");
            this.affixed = l;
            this.unpin = l == "bottom" ? r.top - i : null;
            this.$element.removeClass(t.RESET).addClass("affix" + (l ? "-" + l : ""));
            if (l == "bottom") {
                this.$element.offset({
                    top: document.body.offsetHeight - a - this.$element.height()
                });
            }
        };
        var n = e.fn.affix;
        e.fn.affix = function(n) {
            return this.each(function() {
                var i = e(this);
                var r = i.data("bs.affix");
                var o = typeof n == "object" && n;
                if (!r) i.data("bs.affix", r = new t(this, o));
                if (typeof n == "string") r[n]();
            });
        };
        e.fn.affix.Constructor = t;
        e.fn.affix.noConflict = function() {
            e.fn.affix = n;
            return this;
        };
        e(window).on("load", function() {
            e('[data-spy="affix"]').each(function() {
                var t = e(this);
                var n = t.data();
                n.offset = n.offset || {};
                if (n.offsetBottom) n.offset.bottom = n.offsetBottom;
                if (n.offsetTop) n.offset.top = n.offsetTop;
                t.affix(n);
            });
        });
    }(i);
    n.exports = i;
});

require.register("june/index.js", function(e, t, n) {
    t("bootstrap");
    var i = t("jquery");
    e.jQuery = i;
    i(".comment .delete").on("click", function() {
        var e = i(this);
        var t = e.attr("href").slice(1);
        var n = location.pathname + "/reply?reply=" + t;
        i.ajax({
            url: n,
            method: "DELETE",
            success: function() {
                e.parentsUntil(".comment").parent().fadeOut();
            }
        });
        return false;
    });
    i(".comment .reply").on("click", function() {
        var e = i(this);
        var t = e.attr("href").slice(1);
        var n = i(".comment-form textarea");
        var r = n.val();
        r += "@" + t;
        n.val(r);
        n.focus();
        return false;
    });
    i(".preview-button").on("click", function() {
        var e = i(i(this).data("target"));
        var t = i("#preview-area");
        if (e.hasClass("hide")) {
            e.removeClass("hide");
            t.hide();
            return false;
        }
        if (!t.length) {
            t = i("<div>").attr("id", "preview-area");
            e.after(t);
        }
        i.post("/markdown", {
            content: e.val()
        }, function(n) {
            t.html(n);
            t.show();
            e.addClass("hide");
        });
        return false;
    });
    i(".like-topic").on("click", function() {
        var e = i(this);
        var t = location.pathname + "/like";
        e.find(".glyphicon").toggleClass("glyphicon-heart").toggleClass("glyphicon-heart-empty");
        i.ajax({
            url: t,
            method: "POST",
            success: function(t) {
                if (t.action === "cancel") {
                    e.find(".glyphicon").removeClass("glyphicon-heart").addClass("glyphicon-heart-empty");
                } else {
                    e.find(".glyphicon").removeClass("glyphicon-heart-empty").addClass("glyphicon-heart");
                }
            }
        });
        return false;
    });
});

require.register("june/boot.js", function(e, t, n) {});

require.alias("component-jquery/index.js", "june/deps/jquery/index.js");

require.alias("component-jquery/index.js", "june/deps/jquery/index.js");

require.alias("component-jquery/index.js", "jquery/index.js");

require.alias("component-jquery/index.js", "component-jquery/index.js");

require.alias("lepture-bootstrap/index.js", "june/deps/bootstrap/index.js");

require.alias("lepture-bootstrap/index.js", "bootstrap/index.js");

require.alias("component-jquery/index.js", "lepture-bootstrap/deps/jquery/index.js");

require.alias("component-jquery/index.js", "lepture-bootstrap/deps/jquery/index.js");

require.alias("component-jquery/index.js", "component-jquery/index.js");