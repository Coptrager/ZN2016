"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(_x26, _x27, _x28) { var _again = true; _function: while (_again) { var object = _x26, property = _x27, receiver = _x28; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x26 = parent; _x27 = property; _x28 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND", f);
			}var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
				var n = t[o][1][e];return s(n ? n : e);
			}, l, l.exports, e, t, n, r);
		}return n[o].exports;
	}var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
})({ 1: [function (require, module, exports) {
		var process = module.exports = {};var queue = [];var draining = false;function drainQueue() {
			if (draining) {
				return;
			}draining = true;var currentQueue;var len = queue.length;while (len) {
				currentQueue = queue;queue = [];var i = -1;while (++i < len) {
					currentQueue[i]();
				}len = queue.length;
			}draining = false;
		}process.nextTick = function (fun) {
			queue.push(fun);if (!draining) {
				setTimeout(drainQueue, 0);
			}
		};process.title = "browser";process.browser = true;process.env = {};process.argv = [];process.version = "";process.versions = {};function noop() {}process.on = noop;process.addListener = noop;process.once = noop;process.off = noop;process.removeListener = noop;process.removeAllListeners = noop;process.emit = noop;process.binding = function (name) {
			throw new Error("process.binding is not supported");
		};process.cwd = function () {
			return "/";
		};process.chdir = function (dir) {
			throw new Error("process.chdir is not supported");
		};process.umask = function () {
			return 0;
		};
	}, {}], 2: [function (require, module, exports) {
		(function (global) {
			"use strict";require("core-js/shim");require("regenerator/runtime");if (global._babelPolyfill) {
				throw new Error("only one instance of babel/polyfill is allowed");
			}global._babelPolyfill = true;
		}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	}, { "core-js/shim": 91, "regenerator/runtime": 92 }], 3: [function (require, module, exports) {
		var $ = require("./$");module.exports = function (IS_INCLUDES) {
			return function ($this, el, fromIndex) {
				var O = $.toObject($this),
				    length = $.toLength(O.length),
				    index = $.toIndex(fromIndex, length),
				    value;if (IS_INCLUDES && el != el) while (length > index) {
					value = O[index++];if (value != value) return true;
				} else for (; length > index; index++) if (IS_INCLUDES || index in O) {
					if (O[index] === el) return IS_INCLUDES || index;
				}return !IS_INCLUDES && -1;
			};
		};
	}, { "./$": 24 }], 4: [function (require, module, exports) {
		var $ = require("./$"),
		    ctx = require("./$.ctx");module.exports = function (TYPE) {
			var IS_MAP = TYPE == 1,
			    IS_FILTER = TYPE == 2,
			    IS_SOME = TYPE == 3,
			    IS_EVERY = TYPE == 4,
			    IS_FIND_INDEX = TYPE == 6,
			    NO_HOLES = TYPE == 5 || IS_FIND_INDEX;return function ($this, callbackfn, that) {
				var O = Object($.assertDefined($this)),
				    self = $.ES5Object(O),
				    f = ctx(callbackfn, that, 3),
				    length = $.toLength(self.length),
				    index = 0,
				    result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined,
				    val,
				    res;for (; length > index; index++) if (NO_HOLES || index in self) {
					val = self[index];res = f(val, index, O);if (TYPE) {
						if (IS_MAP) result[index] = res;else if (res) switch (TYPE) {case 3:
								return true;case 5:
								return val;case 6:
								return index;case 2:
								result.push(val);} else if (IS_EVERY) return false;
					}
				}return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
			};
		};
	}, { "./$": 24, "./$.ctx": 12 }], 5: [function (require, module, exports) {
		var $ = require("./$");function assert(condition, msg1, msg2) {
			if (!condition) throw TypeError(msg2 ? msg1 + msg2 : msg1);
		}assert.def = $.assertDefined;assert.fn = function (it) {
			if (!$.isFunction(it)) throw TypeError(it + " is not a function!");return it;
		};assert.obj = function (it) {
			if (!$.isObject(it)) throw TypeError(it + " is not an object!");return it;
		};assert.inst = function (it, Constructor, name) {
			if (!(it instanceof Constructor)) throw TypeError(name + ": use the 'new' operator!");return it;
		};module.exports = assert;
	}, { "./$": 24 }], 6: [function (require, module, exports) {
		var $ = require("./$"),
		    enumKeys = require("./$.enum-keys");module.exports = Object.assign || function assign(target, source) {
			var T = Object($.assertDefined(target)),
			    l = arguments.length,
			    i = 1;while (l > i) {
				var S = $.ES5Object(arguments[i++]),
				    keys = enumKeys(S),
				    length = keys.length,
				    j = 0,
				    key;while (length > j) T[key = keys[j++]] = S[key];
			}return T;
		};
	}, { "./$": 24, "./$.enum-keys": 15 }], 7: [function (require, module, exports) {
		var $ = require("./$"),
		    TAG = require("./$.wks")("toStringTag"),
		    toString = ({}).toString;function cof(it) {
			return toString.call(it).slice(8, -1);
		}cof.classof = function (it) {
			var O, T;return it == undefined ? it === undefined ? "Undefined" : "Null" : typeof (T = (O = Object(it))[TAG]) == "string" ? T : cof(O);
		};cof.set = function (it, tag, stat) {
			if (it && !$.has(it = stat ? it : it.prototype, TAG)) $.hide(it, TAG, tag);
		};module.exports = cof;
	}, { "./$": 24, "./$.wks": 42 }], 8: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    ctx = require("./$.ctx"),
		    safe = require("./$.uid").safe,
		    assert = require("./$.assert"),
		    forOf = require("./$.for-of"),
		    step = require("./$.iter").step,
		    $has = $.has,
		    set = $.set,
		    isObject = $.isObject,
		    hide = $.hide,
		    isExtensible = Object.isExtensible || isObject,
		    ID = safe("id"),
		    O1 = safe("O1"),
		    LAST = safe("last"),
		    FIRST = safe("first"),
		    ITER = safe("iter"),
		    SIZE = $.DESC ? safe("size") : "size",
		    id = 0;function fastKey(it, create) {
			if (!isObject(it)) return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;if (!$has(it, ID)) {
				if (!isExtensible(it)) return "F";if (!create) return "E";hide(it, ID, ++id);
			}return "O" + it[ID];
		}function getEntry(that, key) {
			var index = fastKey(key),
			    entry;if (index !== "F") return that[O1][index];for (entry = that[FIRST]; entry; entry = entry.n) {
				if (entry.k == key) return entry;
			}
		}module.exports = { getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
				var C = wrapper(function (that, iterable) {
					assert.inst(that, C, NAME);set(that, O1, $.create(null));set(that, SIZE, 0);set(that, LAST, undefined);set(that, FIRST, undefined);if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
				});require("./$.mix")(C.prototype, { clear: function clear() {
						for (var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n) {
							entry.r = true;if (entry.p) entry.p = entry.p.n = undefined;delete data[entry.i];
						}that[FIRST] = that[LAST] = undefined;that[SIZE] = 0;
					}, "delete": function _delete(key) {
						var that = this,
						    entry = getEntry(that, key);if (entry) {
							var next = entry.n,
							    prev = entry.p;delete that[O1][entry.i];entry.r = true;if (prev) prev.n = next;if (next) next.p = prev;if (that[FIRST] == entry) that[FIRST] = next;if (that[LAST] == entry) that[LAST] = prev;that[SIZE]--;
						}return !!entry;
					}, forEach: function forEach(callbackfn) {
						var f = ctx(callbackfn, arguments[1], 3),
						    entry;while (entry = entry ? entry.n : this[FIRST]) {
							f(entry.v, entry.k, this);while (entry && entry.r) entry = entry.p;
						}
					}, has: function has(key) {
						return !!getEntry(this, key);
					} });if ($.DESC) $.setDesc(C.prototype, "size", { get: function get() {
						return assert.def(this[SIZE]);
					} });return C;
			}, def: function def(that, key, value) {
				var entry = getEntry(that, key),
				    prev,
				    index;if (entry) {
					entry.v = value;
				} else {
					that[LAST] = entry = { i: index = fastKey(key, true), k: key, v: value, p: prev = that[LAST], n: undefined, r: false };if (!that[FIRST]) that[FIRST] = entry;if (prev) prev.n = entry;that[SIZE]++;if (index !== "F") that[O1][index] = entry;
				}return that;
			}, getEntry: getEntry, setIter: function setIter(C, NAME, IS_MAP) {
				require("./$.iter-define")(C, NAME, function (iterated, kind) {
					set(this, ITER, { o: iterated, k: kind });
				}, function () {
					var iter = this[ITER],
					    kind = iter.k,
					    entry = iter.l;while (entry && entry.r) entry = entry.p;if (!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])) {
						iter.o = undefined;return step(1);
					}if (kind == "keys") return step(0, entry.k);if (kind == "values") return step(0, entry.v);return step(0, [entry.k, entry.v]);
				}, IS_MAP ? "entries" : "values", !IS_MAP, true);
			} };
	}, { "./$": 24, "./$.assert": 5, "./$.ctx": 12, "./$.for-of": 16, "./$.iter": 23, "./$.iter-define": 21, "./$.mix": 26, "./$.uid": 40 }], 9: [function (require, module, exports) {
		var $def = require("./$.def"),
		    forOf = require("./$.for-of");module.exports = function (NAME) {
			$def($def.P, NAME, { toJSON: function toJSON() {
					var arr = [];forOf(this, false, arr.push, arr);return arr;
				} });
		};
	}, { "./$.def": 13, "./$.for-of": 16 }], 10: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    safe = require("./$.uid").safe,
		    assert = require("./$.assert"),
		    forOf = require("./$.for-of"),
		    $has = $.has,
		    isObject = $.isObject,
		    hide = $.hide,
		    isExtensible = Object.isExtensible || isObject,
		    id = 0,
		    ID = safe("id"),
		    WEAK = safe("weak"),
		    LEAK = safe("leak"),
		    method = require("./$.array-methods"),
		    find = method(5),
		    findIndex = method(6);function findFrozen(store, key) {
			return find(store.array, function (it) {
				return it[0] === key;
			});
		}function leakStore(that) {
			return that[LEAK] || hide(that, LEAK, { array: [], get: function get(key) {
					var entry = findFrozen(this, key);if (entry) return entry[1];
				}, has: function has(key) {
					return !!findFrozen(this, key);
				}, set: function set(key, value) {
					var entry = findFrozen(this, key);if (entry) entry[1] = value;else this.array.push([key, value]);
				}, "delete": function _delete(key) {
					var index = findIndex(this.array, function (it) {
						return it[0] === key;
					});if (~index) this.array.splice(index, 1);return !! ~index;
				} })[LEAK];
		}module.exports = { getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
				var C = wrapper(function (that, iterable) {
					$.set(assert.inst(that, C, NAME), ID, id++);if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
				});require("./$.mix")(C.prototype, { "delete": function _delete(key) {
						if (!isObject(key)) return false;if (!isExtensible(key)) return leakStore(this)["delete"](key);return $has(key, WEAK) && $has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
					}, has: function has(key) {
						if (!isObject(key)) return false;if (!isExtensible(key)) return leakStore(this).has(key);return $has(key, WEAK) && $has(key[WEAK], this[ID]);
					} });return C;
			}, def: function def(that, key, value) {
				if (!isExtensible(assert.obj(key))) {
					leakStore(that).set(key, value);
				} else {
					$has(key, WEAK) || hide(key, WEAK, {});key[WEAK][that[ID]] = value;
				}return that;
			}, leakStore: leakStore, WEAK: WEAK, ID: ID };
	}, { "./$": 24, "./$.array-methods": 4, "./$.assert": 5, "./$.for-of": 16, "./$.mix": 26, "./$.uid": 40 }], 11: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    $def = require("./$.def"),
		    BUGGY = require("./$.iter").BUGGY,
		    forOf = require("./$.for-of"),
		    species = require("./$.species"),
		    assertInstance = require("./$.assert").inst;module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
			var Base = $.g[NAME],
			    C = Base,
			    ADDER = IS_MAP ? "set" : "add",
			    proto = C && C.prototype,
			    O = {};function fixMethod(KEY) {
				var fn = proto[KEY];require("./$.redef")(proto, KEY, KEY == "delete" ? function (a) {
					return fn.call(this, a === 0 ? 0 : a);
				} : KEY == "has" ? function has(a) {
					return fn.call(this, a === 0 ? 0 : a);
				} : KEY == "get" ? function get(a) {
					return fn.call(this, a === 0 ? 0 : a);
				} : KEY == "add" ? function add(a) {
					fn.call(this, a === 0 ? 0 : a);return this;
				} : function set(a, b) {
					fn.call(this, a === 0 ? 0 : a, b);return this;
				});
			}if (!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)) {
				C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);require("./$.mix")(C.prototype, methods);
			} else {
				var inst = new C(),
				    chain = inst[ADDER](IS_WEAK ? {} : -0, 1),
				    buggyZero;if (!require("./$.iter-detect")(function (iter) {
					new C(iter);
				})) {
					C = wrapper(function (target, iterable) {
						assertInstance(target, C, NAME);var that = new Base();if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);return that;
					});C.prototype = proto;proto.constructor = C;
				}IS_WEAK || inst.forEach(function (val, key) {
					buggyZero = 1 / key === -Infinity;
				});if (buggyZero) {
					fixMethod("delete");fixMethod("has");IS_MAP && fixMethod("get");
				}if (buggyZero || chain !== inst) fixMethod(ADDER);
			}require("./$.cof").set(C, NAME);O[NAME] = C;$def($def.G + $def.W + $def.F * (C != Base), O);species(C);species($.core[NAME]);if (!IS_WEAK) common.setIter(C, NAME, IS_MAP);return C;
		};
	}, { "./$": 24, "./$.assert": 5, "./$.cof": 7, "./$.def": 13, "./$.for-of": 16, "./$.iter": 23, "./$.iter-detect": 22, "./$.mix": 26, "./$.redef": 29, "./$.species": 34 }], 12: [function (require, module, exports) {
		var assertFunction = require("./$.assert").fn;module.exports = function (fn, that, length) {
			assertFunction(fn);if (~length && that === undefined) return fn;switch (length) {case 1:
					return function (a) {
						return fn.call(that, a);
					};case 2:
					return function (a, b) {
						return fn.call(that, a, b);
					};case 3:
					return function (a, b, c) {
						return fn.call(that, a, b, c);
					};}return function () {
				return fn.apply(that, arguments);
			};
		};
	}, { "./$.assert": 5 }], 13: [function (require, module, exports) {
		var $ = require("./$"),
		    global = $.g,
		    core = $.core,
		    isFunction = $.isFunction,
		    $redef = require("./$.redef");function ctx(fn, that) {
			return function () {
				return fn.apply(that, arguments);
			};
		}global.core = core;$def.F = 1;$def.G = 2;$def.S = 4;$def.P = 8;$def.B = 16;$def.W = 32;function $def(type, name, source) {
			var key,
			    own,
			    out,
			    exp,
			    isGlobal = type & $def.G,
			    isProto = type & $def.P,
			    target = isGlobal ? global : type & $def.S ? global[name] : (global[name] || {}).prototype,
			    exports = isGlobal ? core : core[name] || (core[name] = {});if (isGlobal) source = name;for (key in source) {
				own = !(type & $def.F) && target && key in target;out = (own ? target : source)[key];if (type & $def.B && own) exp = ctx(out, global);else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;if (target && !own) $redef(target, key, out);if (exports[key] != out) $.hide(exports, key, exp);if (isProto) (exports.prototype || (exports.prototype = {}))[key] = out;
			}
		}module.exports = $def;
	}, { "./$": 24, "./$.redef": 29 }], 14: [function (require, module, exports) {
		var $ = require("./$"),
		    document = $.g.document,
		    isObject = $.isObject,
		    is = isObject(document) && isObject(document.createElement);module.exports = function (it) {
			return is ? document.createElement(it) : {};
		};
	}, { "./$": 24 }], 15: [function (require, module, exports) {
		var $ = require("./$");module.exports = function (it) {
			var keys = $.getKeys(it),
			    getDesc = $.getDesc,
			    getSymbols = $.getSymbols;if (getSymbols) $.each.call(getSymbols(it), function (key) {
				if (getDesc(it, key).enumerable) keys.push(key);
			});return keys;
		};
	}, { "./$": 24 }], 16: [function (require, module, exports) {
		var ctx = require("./$.ctx"),
		    get = require("./$.iter").get,
		    call = require("./$.iter-call");module.exports = function (iterable, entries, fn, that) {
			var iterator = get(iterable),
			    f = ctx(fn, that, entries ? 2 : 1),
			    step;while (!(step = iterator.next()).done) {
				if (call(iterator, f, step.value, entries) === false) {
					return call.close(iterator);
				}
			}
		};
	}, { "./$.ctx": 12, "./$.iter": 23, "./$.iter-call": 20 }], 17: [function (require, module, exports) {
		module.exports = function ($) {
			$.FW = true;$.path = $.g;return $;
		};
	}, {}], 18: [function (require, module, exports) {
		var $ = require("./$"),
		    toString = ({}).toString,
		    getNames = $.getNames;var windowNames = typeof window == "object" && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];function getWindowNames(it) {
			try {
				return getNames(it);
			} catch (e) {
				return windowNames.slice();
			}
		}module.exports.get = function getOwnPropertyNames(it) {
			if (windowNames && toString.call(it) == "[object Window]") return getWindowNames(it);return getNames($.toObject(it));
		};
	}, { "./$": 24 }], 19: [function (require, module, exports) {
		module.exports = function (fn, args, that) {
			var un = that === undefined;switch (args.length) {case 0:
					return un ? fn() : fn.call(that);case 1:
					return un ? fn(args[0]) : fn.call(that, args[0]);case 2:
					return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);case 3:
					return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);case 4:
					return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);case 5:
					return un ? fn(args[0], args[1], args[2], args[3], args[4]) : fn.call(that, args[0], args[1], args[2], args[3], args[4]);}return fn.apply(that, args);
		};
	}, {}], 20: [function (require, module, exports) {
		var assertObject = require("./$.assert").obj;function close(iterator) {
			var ret = iterator["return"];if (ret !== undefined) assertObject(ret.call(iterator));
		}function call(iterator, fn, value, entries) {
			try {
				return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
			} catch (e) {
				close(iterator);throw e;
			}
		}call.close = close;module.exports = call;
	}, { "./$.assert": 5 }], 21: [function (require, module, exports) {
		var $def = require("./$.def"),
		    $redef = require("./$.redef"),
		    $ = require("./$"),
		    cof = require("./$.cof"),
		    $iter = require("./$.iter"),
		    SYMBOL_ITERATOR = require("./$.wks")("iterator"),
		    FF_ITERATOR = "@@iterator",
		    KEYS = "keys",
		    VALUES = "values",
		    Iterators = $iter.Iterators;module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE) {
			$iter.create(Constructor, NAME, next);function createMethod(kind) {
				function $$(that) {
					return new Constructor(that, kind);
				}switch (kind) {case KEYS:
						return function keys() {
							return $$(this);
						};case VALUES:
						return function values() {
							return $$(this);
						};}return function entries() {
					return $$(this);
				};
			}var TAG = NAME + " Iterator",
			    proto = Base.prototype,
			    _native = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
			    _default = _native || createMethod(DEFAULT),
			    methods,
			    key;if (_native) {
				var IteratorPrototype = $.getProto(_default.call(new Base()));cof.set(IteratorPrototype, TAG, true);if ($.FW && $.has(proto, FF_ITERATOR)) $iter.set(IteratorPrototype, $.that);
			}if ($.FW || FORCE) $iter.set(proto, _default);Iterators[NAME] = _default;Iterators[TAG] = $.that;if (DEFAULT) {
				methods = { keys: IS_SET ? _default : createMethod(KEYS), values: DEFAULT == VALUES ? _default : createMethod(VALUES), entries: DEFAULT != VALUES ? _default : createMethod("entries") };if (FORCE) for (key in methods) {
					if (!(key in proto)) $redef(proto, key, methods[key]);
				} else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
			}
		};
	}, { "./$": 24, "./$.cof": 7, "./$.def": 13, "./$.iter": 23, "./$.redef": 29, "./$.wks": 42 }], 22: [function (require, module, exports) {
		var SYMBOL_ITERATOR = require("./$.wks")("iterator"),
		    SAFE_CLOSING = false;try {
			var riter = [7][SYMBOL_ITERATOR]();riter["return"] = function () {
				SAFE_CLOSING = true;
			};Array.from(riter, function () {
				throw 2;
			});
		} catch (e) {}module.exports = function (exec) {
			if (!SAFE_CLOSING) return false;var safe = false;try {
				var arr = [7],
				    iter = arr[SYMBOL_ITERATOR]();iter.next = function () {
					safe = true;
				};arr[SYMBOL_ITERATOR] = function () {
					return iter;
				};exec(arr);
			} catch (e) {}return safe;
		};
	}, { "./$.wks": 42 }], 23: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    cof = require("./$.cof"),
		    classof = cof.classof,
		    assert = require("./$.assert"),
		    assertObject = assert.obj,
		    SYMBOL_ITERATOR = require("./$.wks")("iterator"),
		    FF_ITERATOR = "@@iterator",
		    Iterators = require("./$.shared")("iterators"),
		    IteratorPrototype = {};setIterator(IteratorPrototype, $.that);function setIterator(O, value) {
			$.hide(O, SYMBOL_ITERATOR, value);if (FF_ITERATOR in []) $.hide(O, FF_ITERATOR, value);
		}module.exports = { BUGGY: "keys" in [] && !("next" in [].keys()), Iterators: Iterators, step: function step(done, value) {
				return { value: value, done: !!done };
			}, is: function is(it) {
				var O = Object(it),
				    Symbol = $.g.Symbol;return (Symbol && Symbol.iterator || FF_ITERATOR) in O || SYMBOL_ITERATOR in O || $.has(Iterators, classof(O));
			}, get: function get(it) {
				var Symbol = $.g.Symbol,
				    getIter;if (it != undefined) {
					getIter = it[Symbol && Symbol.iterator || FF_ITERATOR] || it[SYMBOL_ITERATOR] || Iterators[classof(it)];
				}assert($.isFunction(getIter), it, " is not iterable!");return assertObject(getIter.call(it));
			}, set: setIterator, create: function create(Constructor, NAME, next, proto) {
				Constructor.prototype = $.create(proto || IteratorPrototype, { next: $.desc(1, next) });cof.set(Constructor, NAME + " Iterator");
			} };
	}, { "./$": 24, "./$.assert": 5, "./$.cof": 7, "./$.shared": 33, "./$.wks": 42 }], 24: [function (require, module, exports) {
		"use strict";var global = typeof self != "undefined" ? self : Function("return this")(),
		    core = {},
		    defineProperty = Object.defineProperty,
		    hasOwnProperty = ({}).hasOwnProperty,
		    ceil = Math.ceil,
		    floor = Math.floor,
		    max = Math.max,
		    min = Math.min;var DESC = !!(function () {
			try {
				return defineProperty({}, "a", { get: function get() {
						return 2;
					} }).a == 2;
			} catch (e) {}
		})();var hide = createDefiner(1);function toInteger(it) {
			return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
		}function desc(bitmap, value) {
			return { enumerable: !(bitmap & 1), configurable: !(bitmap & 2), writable: !(bitmap & 4), value: value };
		}function simpleSet(object, key, value) {
			object[key] = value;return object;
		}function createDefiner(bitmap) {
			return DESC ? function (object, key, value) {
				return $.setDesc(object, key, desc(bitmap, value));
			} : simpleSet;
		}function isObject(it) {
			return it !== null && (typeof it == "object" || typeof it == "function");
		}function isFunction(it) {
			return typeof it == "function";
		}function assertDefined(it) {
			if (it == undefined) throw TypeError("Can't call method on  " + it);return it;
		}var $ = module.exports = require("./$.fw")({ g: global, core: core, html: global.document && document.documentElement, isObject: isObject, isFunction: isFunction, that: function that() {
				return this;
			}, toInteger: toInteger, toLength: function toLength(it) {
				return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
			}, toIndex: function toIndex(index, length) {
				index = toInteger(index);return index < 0 ? max(index + length, 0) : min(index, length);
			}, has: function has(it, key) {
				return hasOwnProperty.call(it, key);
			}, create: Object.create, getProto: Object.getPrototypeOf, DESC: DESC, desc: desc, getDesc: Object.getOwnPropertyDescriptor, setDesc: defineProperty, setDescs: Object.defineProperties, getKeys: Object.keys, getNames: Object.getOwnPropertyNames, getSymbols: Object.getOwnPropertySymbols, assertDefined: assertDefined, ES5Object: Object, toObject: function toObject(it) {
				return $.ES5Object(assertDefined(it));
			}, hide: hide, def: createDefiner(0), set: global.Symbol ? simpleSet : hide, each: [].forEach });if (typeof __e != "undefined") __e = core;if (typeof __g != "undefined") __g = global;
	}, { "./$.fw": 17 }], 25: [function (require, module, exports) {
		var $ = require("./$");module.exports = function (object, el) {
			var O = $.toObject(object),
			    keys = $.getKeys(O),
			    length = keys.length,
			    index = 0,
			    key;while (length > index) if (O[key = keys[index++]] === el) return key;
		};
	}, { "./$": 24 }], 26: [function (require, module, exports) {
		var $redef = require("./$.redef");module.exports = function (target, src) {
			for (var key in src) $redef(target, key, src[key]);return target;
		};
	}, { "./$.redef": 29 }], 27: [function (require, module, exports) {
		var $ = require("./$"),
		    assertObject = require("./$.assert").obj;module.exports = function ownKeys(it) {
			assertObject(it);var keys = $.getNames(it),
			    getSymbols = $.getSymbols;return getSymbols ? keys.concat(getSymbols(it)) : keys;
		};
	}, { "./$": 24, "./$.assert": 5 }], 28: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    invoke = require("./$.invoke"),
		    assertFunction = require("./$.assert").fn;module.exports = function () {
			var fn = assertFunction(this),
			    length = arguments.length,
			    pargs = Array(length),
			    i = 0,
			    _ = $.path._,
			    holder = false;while (length > i) if ((pargs[i] = arguments[i++]) === _) holder = true;return function () {
				var that = this,
				    _length = arguments.length,
				    j = 0,
				    k = 0,
				    args;if (!holder && !_length) return invoke(fn, pargs, that);args = pargs.slice();if (holder) for (; length > j; j++) if (args[j] === _) args[j] = arguments[k++];while (_length > k) args.push(arguments[k++]);return invoke(fn, args, that);
			};
		};
	}, { "./$": 24, "./$.assert": 5, "./$.invoke": 19 }], 29: [function (require, module, exports) {
		var $ = require("./$"),
		    tpl = String(({}).hasOwnProperty),
		    SRC = require("./$.uid").safe("src"),
		    _toString = Function.toString;function $redef(O, key, val, safe) {
			if ($.isFunction(val)) {
				var base = O[key];$.hide(val, SRC, base ? String(base) : tpl.replace(/hasOwnProperty/, String(key)));if (!("name" in val)) val.name = key;
			}if (O === $.g) {
				O[key] = val;
			} else {
				if (!safe) delete O[key];$.hide(O, key, val);
			}
		}$redef(Function.prototype, "toString", function toString() {
			return $.has(this, SRC) ? this[SRC] : _toString.call(this);
		});$.core.inspectSource = function (it) {
			return _toString.call(it);
		};module.exports = $redef;
	}, { "./$": 24, "./$.uid": 40 }], 30: [function (require, module, exports) {
		"use strict";module.exports = function (regExp, replace, isStatic) {
			var replacer = replace === Object(replace) ? function (part) {
				return replace[part];
			} : replace;return function (it) {
				return String(isStatic ? it : this).replace(regExp, replacer);
			};
		};
	}, {}], 31: [function (require, module, exports) {
		module.exports = Object.is || function is(x, y) {
			return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
		};
	}, {}], 32: [function (require, module, exports) {
		var $ = require("./$"),
		    assert = require("./$.assert");function check(O, proto) {
			assert.obj(O);assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
		}module.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? (function (buggy, set) {
				try {
					set = require("./$.ctx")(Function.call, $.getDesc(Object.prototype, "__proto__").set, 2);set({}, []);
				} catch (e) {
					buggy = true;
				}return function setPrototypeOf(O, proto) {
					check(O, proto);if (buggy) O.__proto__ = proto;else set(O, proto);return O;
				};
			})() : undefined), check: check };
	}, { "./$": 24, "./$.assert": 5, "./$.ctx": 12 }], 33: [function (require, module, exports) {
		var $ = require("./$"),
		    SHARED = "__core-js_shared__",
		    store = $.g[SHARED] || ($.g[SHARED] = {});module.exports = function (key) {
			return store[key] || (store[key] = {});
		};
	}, { "./$": 24 }], 34: [function (require, module, exports) {
		var $ = require("./$"),
		    SPECIES = require("./$.wks")("species");module.exports = function (C) {
			if ($.DESC && !(SPECIES in C)) $.setDesc(C, SPECIES, { configurable: true, get: $.that });
		};
	}, { "./$": 24, "./$.wks": 42 }], 35: [function (require, module, exports) {
		var $ = require("./$");module.exports = function (TO_STRING) {
			return function (that, pos) {
				var s = String($.assertDefined(that)),
				    i = $.toInteger(pos),
				    l = s.length,
				    a,
				    b;if (i < 0 || i >= l) return TO_STRING ? "" : undefined;a = s.charCodeAt(i);return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
			};
		};
	}, { "./$": 24 }], 36: [function (require, module, exports) {
		var $ = require("./$"),
		    repeat = require("./$.string-repeat");module.exports = function (that, minLength, fillChar, left) {
			var S = String($.assertDefined(that));if (minLength === undefined) return S;var intMinLength = $.toInteger(minLength);var fillLen = intMinLength - S.length;if (fillLen < 0 || fillLen === Infinity) {
				throw new RangeError("Cannot satisfy string length " + minLength + " for string: " + S);
			}var sFillStr = fillChar === undefined ? " " : String(fillChar);var sFillVal = repeat.call(sFillStr, Math.ceil(fillLen / sFillStr.length));if (sFillVal.length > fillLen) sFillVal = left ? sFillVal.slice(sFillVal.length - fillLen) : sFillVal.slice(0, fillLen);return left ? sFillVal.concat(S) : S.concat(sFillVal);
		};
	}, { "./$": 24, "./$.string-repeat": 37 }], 37: [function (require, module, exports) {
		"use strict";var $ = require("./$");module.exports = function repeat(count) {
			var str = String($.assertDefined(this)),
			    res = "",
			    n = $.toInteger(count);if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;return res;
		};
	}, { "./$": 24 }], 38: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    ctx = require("./$.ctx"),
		    cof = require("./$.cof"),
		    invoke = require("./$.invoke"),
		    cel = require("./$.dom-create"),
		    global = $.g,
		    isFunction = $.isFunction,
		    html = $.html,
		    process = global.process,
		    setTask = global.setImmediate,
		    clearTask = global.clearImmediate,
		    MessageChannel = global.MessageChannel,
		    counter = 0,
		    queue = {},
		    ONREADYSTATECHANGE = "onreadystatechange",
		    defer,
		    channel,
		    port;function run() {
			var id = +this;if ($.has(queue, id)) {
				var fn = queue[id];delete queue[id];fn();
			}
		}function listner(event) {
			run.call(event.data);
		}if (!isFunction(setTask) || !isFunction(clearTask)) {
			setTask = function (fn) {
				var args = [],
				    i = 1;while (arguments.length > i) args.push(arguments[i++]);queue[++counter] = function () {
					invoke(isFunction(fn) ? fn : Function(fn), args);
				};defer(counter);return counter;
			};clearTask = function (id) {
				delete queue[id];
			};if (cof(process) == "process") {
				defer = function (id) {
					process.nextTick(ctx(run, id, 1));
				};
			} else if (global.addEventListener && isFunction(global.postMessage) && !global.importScripts) {
				defer = function (id) {
					global.postMessage(id, "*");
				};global.addEventListener("message", listner, false);
			} else if (isFunction(MessageChannel)) {
				channel = new MessageChannel();port = channel.port2;channel.port1.onmessage = listner;defer = ctx(port.postMessage, port, 1);
			} else if (ONREADYSTATECHANGE in cel("script")) {
				defer = function (id) {
					html.appendChild(cel("script"))[ONREADYSTATECHANGE] = function () {
						html.removeChild(this);run.call(id);
					};
				};
			} else {
				defer = function (id) {
					setTimeout(ctx(run, id, 1), 0);
				};
			}
		}module.exports = { set: setTask, clear: clearTask };
	}, { "./$": 24, "./$.cof": 7, "./$.ctx": 12, "./$.dom-create": 14, "./$.invoke": 19 }], 39: [function (require, module, exports) {
		module.exports = function (exec) {
			try {
				exec();return false;
			} catch (e) {
				return true;
			}
		};
	}, {}], 40: [function (require, module, exports) {
		var sid = 0;function uid(key) {
			return "Symbol(".concat(key === undefined ? "" : key, ")_", (++sid + Math.random()).toString(36));
		}uid.safe = require("./$").g.Symbol || uid;module.exports = uid;
	}, { "./$": 24 }], 41: [function (require, module, exports) {
		var UNSCOPABLES = require("./$.wks")("unscopables");if (!(UNSCOPABLES in [])) require("./$").hide(Array.prototype, UNSCOPABLES, {});module.exports = function (key) {
			[][UNSCOPABLES][key] = true;
		};
	}, { "./$": 24, "./$.wks": 42 }], 42: [function (require, module, exports) {
		var global = require("./$").g,
		    store = require("./$.shared")("wks");module.exports = function (name) {
			return store[name] || (store[name] = global.Symbol && global.Symbol[name] || require("./$.uid").safe("Symbol." + name));
		};
	}, { "./$": 24, "./$.shared": 33, "./$.uid": 40 }], 43: [function (require, module, exports) {
		var $ = require("./$"),
		    cel = require("./$.dom-create"),
		    cof = require("./$.cof"),
		    $def = require("./$.def"),
		    invoke = require("./$.invoke"),
		    arrayMethod = require("./$.array-methods"),
		    IE_PROTO = require("./$.uid").safe("__proto__"),
		    assert = require("./$.assert"),
		    assertObject = assert.obj,
		    ObjectProto = Object.prototype,
		    html = $.html,
		    A = [],
		    _slice = A.slice,
		    _join = A.join,
		    classof = cof.classof,
		    has = $.has,
		    defineProperty = $.setDesc,
		    getOwnDescriptor = $.getDesc,
		    defineProperties = $.setDescs,
		    isFunction = $.isFunction,
		    isObject = $.isObject,
		    toObject = $.toObject,
		    toLength = $.toLength,
		    toIndex = $.toIndex,
		    IE8_DOM_DEFINE = false,
		    $indexOf = require("./$.array-includes")(false),
		    $forEach = arrayMethod(0),
		    $map = arrayMethod(1),
		    $filter = arrayMethod(2),
		    $some = arrayMethod(3),
		    $every = arrayMethod(4);if (!$.DESC) {
			try {
				IE8_DOM_DEFINE = defineProperty(cel("div"), "x", { get: function get() {
						return 8;
					} }).x == 8;
			} catch (e) {}$.setDesc = function (O, P, Attributes) {
				if (IE8_DOM_DEFINE) try {
					return defineProperty(O, P, Attributes);
				} catch (e) {}if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");if ("value" in Attributes) assertObject(O)[P] = Attributes.value;return O;
			};$.getDesc = function (O, P) {
				if (IE8_DOM_DEFINE) try {
					return getOwnDescriptor(O, P);
				} catch (e) {}if (has(O, P)) return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
			};$.setDescs = defineProperties = function (O, Properties) {
				assertObject(O);var keys = $.getKeys(Properties),
				    length = keys.length,
				    i = 0,
				    P;while (length > i) $.setDesc(O, P = keys[i++], Properties[P]);return O;
			};
		}$def($def.S + $def.F * !$.DESC, "Object", { getOwnPropertyDescriptor: $.getDesc, defineProperty: $.setDesc, defineProperties: defineProperties });var keys1 = ("constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable," + "toLocaleString,toString,valueOf").split(","),
		    keys2 = keys1.concat("length", "prototype"),
		    keysLen1 = keys1.length;var _createDict = function createDict() {
			var iframe = cel("iframe"),
			    i = keysLen1,
			    gt = ">",
			    iframeDocument;iframe.style.display = "none";html.appendChild(iframe);iframe.src = "javascript:";iframeDocument = iframe.contentWindow.document;iframeDocument.open();iframeDocument.write("<script>document.F=Object</script" + gt);iframeDocument.close();_createDict = iframeDocument.F;while (i--) delete _createDict.prototype[keys1[i]];return _createDict();
		};function createGetKeys(names, length) {
			return function (object) {
				var O = toObject(object),
				    i = 0,
				    result = [],
				    key;for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);while (length > i) if (has(O, key = names[i++])) {
					~$indexOf(result, key) || result.push(key);
				}return result;
			};
		}function Empty() {}$def($def.S, "Object", { getPrototypeOf: $.getProto = $.getProto || function (O) {
				O = Object(assert.def(O));if (has(O, IE_PROTO)) return O[IE_PROTO];if (isFunction(O.constructor) && O instanceof O.constructor) {
					return O.constructor.prototype;
				}return O instanceof Object ? ObjectProto : null;
			}, getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true), create: $.create = $.create || function (O, Properties) {
				var result;if (O !== null) {
					Empty.prototype = assertObject(O);result = new Empty();Empty.prototype = null;result[IE_PROTO] = O;
				} else result = _createDict();return Properties === undefined ? result : defineProperties(result, Properties);
			}, keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false), seal: function seal(it) {
				return it;
			}, freeze: function freeze(it) {
				return it;
			}, preventExtensions: function preventExtensions(it) {
				return it;
			}, isSealed: function isSealed(it) {
				return !isObject(it);
			}, isFrozen: function isFrozen(it) {
				return !isObject(it);
			}, isExtensible: function isExtensible(it) {
				return isObject(it);
			} });$def($def.P, "Function", { bind: function bind(that) {
				var fn = assert.fn(this),
				    partArgs = _slice.call(arguments, 1);function bound() {
					var args = partArgs.concat(_slice.call(arguments)),
					    constr = this instanceof bound,
					    ctx = constr ? $.create(fn.prototype) : that,
					    result = invoke(fn, args, ctx);return constr ? ctx : result;
				}if (fn.prototype) bound.prototype = fn.prototype;return bound;
			} });if (!(0 in Object("z") && "z"[0] == "z")) {
			$.ES5Object = function (it) {
				return cof(it) == "String" ? it.split("") : Object(it);
			};
		}var buggySlice = true;try {
			if (html) _slice.call(html);buggySlice = false;
		} catch (e) {}$def($def.P + $def.F * buggySlice, "Array", { slice: function slice(begin, end) {
				var len = toLength(this.length),
				    klass = cof(this);end = end === undefined ? len : end;if (klass == "Array") return _slice.call(this, begin, end);var start = toIndex(begin, len),
				    upTo = toIndex(end, len),
				    size = toLength(upTo - start),
				    cloned = Array(size),
				    i = 0;for (; i < size; i++) cloned[i] = klass == "String" ? this.charAt(start + i) : this[start + i];return cloned;
			} });$def($def.P + $def.F * ($.ES5Object != Object), "Array", { join: function join() {
				return _join.apply($.ES5Object(this), arguments);
			} });$def($def.S, "Array", { isArray: function isArray(arg) {
				return cof(arg) == "Array";
			} });function createArrayReduce(isRight) {
			return function (callbackfn, memo) {
				assert.fn(callbackfn);var O = toObject(this),
				    length = toLength(O.length),
				    index = isRight ? length - 1 : 0,
				    i = isRight ? -1 : 1;
				if (arguments.length < 2) for (;;) {
					if (index in O) {
						memo = O[index];index += i;break;
					}index += i;assert(isRight ? index >= 0 : length > index, "Reduce of empty array with no initial value");
				}for (; isRight ? index >= 0 : length > index; index += i) if (index in O) {
					memo = callbackfn(memo, O[index], index, this);
				}return memo;
			};
		}$def($def.P, "Array", { forEach: $.each = $.each || function forEach(callbackfn) {
				return $forEach(this, callbackfn, arguments[1]);
			}, map: function map(callbackfn) {
				return $map(this, callbackfn, arguments[1]);
			}, filter: function filter(callbackfn) {
				return $filter(this, callbackfn, arguments[1]);
			}, some: function some(callbackfn) {
				return $some(this, callbackfn, arguments[1]);
			}, every: function every(callbackfn) {
				return $every(this, callbackfn, arguments[1]);
			}, reduce: createArrayReduce(false), reduceRight: createArrayReduce(true), indexOf: function indexOf(el) {
				return $indexOf(this, el, arguments[1]);
			}, lastIndexOf: function lastIndexOf(el, fromIndex) {
				var O = toObject(this),
				    length = toLength(O.length),
				    index = length - 1;if (arguments.length > 1) index = Math.min(index, $.toInteger(fromIndex));if (index < 0) index = toLength(length + index);for (; index >= 0; index--) if (index in O) if (O[index] === el) return index;return -1;
			} });$def($def.P, "String", { trim: require("./$.replacer")(/^\s*([\s\S]*\S)?\s*$/, "$1") });$def($def.S, "Date", { now: function now() {
				return +new Date();
			} });function lz(num) {
			return num > 9 ? num : "0" + num;
		}var date = new Date(-5e13 - 1),
		    brokenDate = !(date.toISOString && date.toISOString() == "0385-07-25T07:06:39.999Z" && require("./$.throws")(function () {
			new Date(NaN).toISOString();
		}));$def($def.P + $def.F * brokenDate, "Date", { toISOString: function toISOString() {
				if (!isFinite(this)) throw RangeError("Invalid time value");var d = this,
				    y = d.getUTCFullYear(),
				    m = d.getUTCMilliseconds(),
				    s = y < 0 ? "-" : y > 9999 ? "+" : "";return s + ("00000" + Math.abs(y)).slice(s ? -6 : -4) + "-" + lz(d.getUTCMonth() + 1) + "-" + lz(d.getUTCDate()) + "T" + lz(d.getUTCHours()) + ":" + lz(d.getUTCMinutes()) + ":" + lz(d.getUTCSeconds()) + "." + (m > 99 ? m : "0" + lz(m)) + "Z";
			} });if (classof((function () {
			return arguments;
		})()) == "Object") cof.classof = function (it) {
			var tag = classof(it);return tag == "Object" && isFunction(it.callee) ? "Arguments" : tag;
		};
	}, { "./$": 24, "./$.array-includes": 3, "./$.array-methods": 4, "./$.assert": 5, "./$.cof": 7, "./$.def": 13, "./$.dom-create": 14, "./$.invoke": 19, "./$.replacer": 30, "./$.throws": 39, "./$.uid": 40 }], 44: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    $def = require("./$.def"),
		    toIndex = $.toIndex;$def($def.P, "Array", { copyWithin: function copyWithin(target, start) {
				var O = Object($.assertDefined(this)),
				    len = $.toLength(O.length),
				    to = toIndex(target, len),
				    from = toIndex(start, len),
				    end = arguments[2],
				    fin = end === undefined ? len : toIndex(end, len),
				    count = Math.min(fin - from, len - to),
				    inc = 1;if (from < to && to < from + count) {
					inc = -1;from = from + count - 1;to = to + count - 1;
				}while (count-- > 0) {
					if (from in O) O[to] = O[from];else delete O[to];to += inc;from += inc;
				}return O;
			} });require("./$.unscope")("copyWithin");
	}, { "./$": 24, "./$.def": 13, "./$.unscope": 41 }], 45: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    $def = require("./$.def"),
		    toIndex = $.toIndex;$def($def.P, "Array", { fill: function fill(value) {
				var O = Object($.assertDefined(this)),
				    length = $.toLength(O.length),
				    index = toIndex(arguments[1], length),
				    end = arguments[2],
				    endPos = end === undefined ? length : toIndex(end, length);while (endPos > index) O[index++] = value;return O;
			} });require("./$.unscope")("fill");
	}, { "./$": 24, "./$.def": 13, "./$.unscope": 41 }], 46: [function (require, module, exports) {
		"use strict";var KEY = "findIndex",
		    $def = require("./$.def"),
		    forced = true,
		    $find = require("./$.array-methods")(6);if (KEY in []) Array(1)[KEY](function () {
			forced = false;
		});$def($def.P + $def.F * forced, "Array", { findIndex: function findIndex(callbackfn) {
				return $find(this, callbackfn, arguments[1]);
			} });require("./$.unscope")(KEY);
	}, { "./$.array-methods": 4, "./$.def": 13, "./$.unscope": 41 }], 47: [function (require, module, exports) {
		"use strict";var KEY = "find",
		    $def = require("./$.def"),
		    forced = true,
		    $find = require("./$.array-methods")(5);if (KEY in []) Array(1)[KEY](function () {
			forced = false;
		});$def($def.P + $def.F * forced, "Array", { find: function find(callbackfn) {
				return $find(this, callbackfn, arguments[1]);
			} });require("./$.unscope")(KEY);
	}, { "./$.array-methods": 4, "./$.def": 13, "./$.unscope": 41 }], 48: [function (require, module, exports) {
		var $ = require("./$"),
		    ctx = require("./$.ctx"),
		    $def = require("./$.def"),
		    $iter = require("./$.iter"),
		    call = require("./$.iter-call");$def($def.S + $def.F * !require("./$.iter-detect")(function (iter) {
			Array.from(iter);
		}), "Array", { from: function from(arrayLike) {
				var O = Object($.assertDefined(arrayLike)),
				    mapfn = arguments[1],
				    mapping = mapfn !== undefined,
				    f = mapping ? ctx(mapfn, arguments[2], 2) : undefined,
				    index = 0,
				    length,
				    result,
				    step,
				    iterator;if ($iter.is(O)) {
					iterator = $iter.get(O);result = new (typeof this == "function" ? this : Array)();for (; !(step = iterator.next()).done; index++) {
						result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
					}
				} else {
					result = new (typeof this == "function" ? this : Array)(length = $.toLength(O.length));for (; length > index; index++) {
						result[index] = mapping ? f(O[index], index) : O[index];
					}
				}result.length = index;return result;
			} });
	}, { "./$": 24, "./$.ctx": 12, "./$.def": 13, "./$.iter": 23, "./$.iter-call": 20, "./$.iter-detect": 22 }], 49: [function (require, module, exports) {
		var $ = require("./$"),
		    setUnscope = require("./$.unscope"),
		    ITER = require("./$.uid").safe("iter"),
		    $iter = require("./$.iter"),
		    step = $iter.step,
		    Iterators = $iter.Iterators;require("./$.iter-define")(Array, "Array", function (iterated, kind) {
			$.set(this, ITER, { o: $.toObject(iterated), i: 0, k: kind });
		}, function () {
			var iter = this[ITER],
			    O = iter.o,
			    kind = iter.k,
			    index = iter.i++;if (!O || index >= O.length) {
				iter.o = undefined;return step(1);
			}if (kind == "keys") return step(0, index);if (kind == "values") return step(0, O[index]);return step(0, [index, O[index]]);
		}, "values");Iterators.Arguments = Iterators.Array;setUnscope("keys");setUnscope("values");setUnscope("entries");
	}, { "./$": 24, "./$.iter": 23, "./$.iter-define": 21, "./$.uid": 40, "./$.unscope": 41 }], 50: [function (require, module, exports) {
		var $def = require("./$.def");$def($def.S, "Array", { of: function of() {
				var index = 0,
				    length = arguments.length,
				    result = new (typeof this == "function" ? this : Array)(length);while (length > index) result[index] = arguments[index++];result.length = length;return result;
			} });
	}, { "./$.def": 13 }], 51: [function (require, module, exports) {
		require("./$.species")(Array);
	}, { "./$.species": 34 }], 52: [function (require, module, exports) {
		var $ = require("./$"),
		    HAS_INSTANCE = require("./$.wks")("hasInstance"),
		    FunctionProto = Function.prototype;if (!(HAS_INSTANCE in FunctionProto)) $.setDesc(FunctionProto, HAS_INSTANCE, { value: function value(O) {
				if (!$.isFunction(this) || !$.isObject(O)) return false;if (!$.isObject(this.prototype)) return O instanceof this;while (O = $.getProto(O)) if (this.prototype === O) return true;return false;
			} });
	}, { "./$": 24, "./$.wks": 42 }], 53: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    NAME = "name",
		    setDesc = $.setDesc,
		    FunctionProto = Function.prototype;NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, { configurable: true, get: function get() {
				var match = String(this).match(/^\s*function ([^ (]*)/),
				    name = match ? match[1] : "";$.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));return name;
			}, set: function set(value) {
				$.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
			} });
	}, { "./$": 24 }], 54: [function (require, module, exports) {
		"use strict";var strong = require("./$.collection-strong");require("./$.collection")("Map", function (get) {
			return function Map() {
				return get(this, arguments[0]);
			};
		}, { get: function get(key) {
				var entry = strong.getEntry(this, key);return entry && entry.v;
			}, set: function set(key, value) {
				return strong.def(this, key === 0 ? 0 : key, value);
			} }, strong, true);
	}, { "./$.collection": 11, "./$.collection-strong": 8 }], 55: [function (require, module, exports) {
		var Infinity = 1 / 0,
		    $def = require("./$.def"),
		    E = Math.E,
		    pow = Math.pow,
		    abs = Math.abs,
		    exp = Math.exp,
		    log = Math.log,
		    sqrt = Math.sqrt,
		    ceil = Math.ceil,
		    floor = Math.floor,
		    EPSILON = pow(2, -52),
		    EPSILON32 = pow(2, -23),
		    MAX32 = pow(2, 127) * (2 - EPSILON32),
		    MIN32 = pow(2, -126);function roundTiesToEven(n) {
			return n + 1 / EPSILON - 1 / EPSILON;
		}function sign(x) {
			return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
		}function asinh(x) {
			return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
		}function expm1(x) {
			return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
		}$def($def.S, "Math", { acosh: function acosh(x) {
				return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
			}, asinh: asinh, atanh: function atanh(x) {
				return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
			}, cbrt: function cbrt(x) {
				return sign(x = +x) * pow(abs(x), 1 / 3);
			}, clz32: function clz32(x) {
				return (x >>>= 0) ? 31 - floor(log(x + .5) * Math.LOG2E) : 32;
			}, cosh: function cosh(x) {
				return (exp(x = +x) + exp(-x)) / 2;
			}, expm1: expm1, fround: function fround(x) {
				var $abs = abs(x),
				    $sign = sign(x),
				    a,
				    result;if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;a = (1 + EPSILON32 / EPSILON) * $abs;result = a - (a - $abs);if (result > MAX32 || result != result) return $sign * Infinity;return $sign * result;
			}, hypot: function hypot(value1, value2) {
				var sum = 0,
				    i = 0,
				    len = arguments.length,
				    larg = 0,
				    arg,
				    div;while (i < len) {
					arg = abs(arguments[i++]);if (larg < arg) {
						div = larg / arg;sum = sum * div * div + 1;larg = arg;
					} else if (arg > 0) {
						div = arg / larg;sum += div * div;
					} else sum += arg;
				}return larg === Infinity ? Infinity : larg * sqrt(sum);
			}, imul: function imul(x, y) {
				var UInt16 = 65535,
				    xn = +x,
				    yn = +y,
				    xl = UInt16 & xn,
				    yl = UInt16 & yn;return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
			}, log1p: function log1p(x) {
				return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
			}, log10: function log10(x) {
				return log(x) / Math.LN10;
			}, log2: function log2(x) {
				return log(x) / Math.LN2;
			}, sign: sign, sinh: function sinh(x) {
				return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
			}, tanh: function tanh(x) {
				var a = expm1(x = +x),
				    b = expm1(-x);return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
			}, trunc: function trunc(it) {
				return (it > 0 ? floor : ceil)(it);
			} });
	}, { "./$.def": 13 }], 56: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    isObject = $.isObject,
		    isFunction = $.isFunction,
		    NUMBER = "Number",
		    $Number = $.g[NUMBER],
		    Base = $Number,
		    proto = $Number.prototype;function toPrimitive(it) {
			var fn, val;if (isFunction(fn = it.valueOf) && !isObject(val = fn.call(it))) return val;if (isFunction(fn = it.toString) && !isObject(val = fn.call(it))) return val;throw TypeError("Can't convert object to number");
		}function toNumber(it) {
			if (isObject(it)) it = toPrimitive(it);if (typeof it == "string" && it.length > 2 && it.charCodeAt(0) == 48) {
				var binary = false;switch (it.charCodeAt(1)) {case 66:case 98:
						binary = true;case 79:case 111:
						return parseInt(it.slice(2), binary ? 2 : 8);}
			}return +it;
		}if ($.FW && !($Number("0o1") && $Number("0b1"))) {
			$Number = function Number(it) {
				return this instanceof $Number ? new Base(toNumber(it)) : toNumber(it);
			};$.each.call($.DESC ? $.getNames(Base) : ("MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY," + "EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER," + "MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger").split(","), function (key) {
				if ($.has(Base, key) && !$.has($Number, key)) {
					$.setDesc($Number, key, $.getDesc(Base, key));
				}
			});$Number.prototype = proto;proto.constructor = $Number;require("./$.redef")($.g, NUMBER, $Number);
		}
	}, { "./$": 24, "./$.redef": 29 }], 57: [function (require, module, exports) {
		var $ = require("./$"),
		    $def = require("./$.def"),
		    abs = Math.abs,
		    floor = Math.floor,
		    _isFinite = $.g.isFinite,
		    MAX_SAFE_INTEGER = 9007199254740991;function isInteger(it) {
			return !$.isObject(it) && _isFinite(it) && floor(it) === it;
		}$def($def.S, "Number", { EPSILON: Math.pow(2, -52), isFinite: function isFinite(it) {
				return typeof it == "number" && _isFinite(it);
			}, isInteger: isInteger, isNaN: function isNaN(number) {
				return number != number;
			}, isSafeInteger: function isSafeInteger(number) {
				return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
			}, MAX_SAFE_INTEGER: MAX_SAFE_INTEGER, MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER, parseFloat: parseFloat, parseInt: parseInt });
	}, { "./$": 24, "./$.def": 13 }], 58: [function (require, module, exports) {
		var $def = require("./$.def");$def($def.S, "Object", { assign: require("./$.assign") });
	}, { "./$.assign": 6, "./$.def": 13 }], 59: [function (require, module, exports) {
		var $def = require("./$.def");$def($def.S, "Object", { is: require("./$.same") });
	}, { "./$.def": 13, "./$.same": 31 }], 60: [function (require, module, exports) {
		var $def = require("./$.def");$def($def.S, "Object", { setPrototypeOf: require("./$.set-proto").set });
	}, { "./$.def": 13, "./$.set-proto": 32 }], 61: [function (require, module, exports) {
		var $ = require("./$"),
		    $def = require("./$.def"),
		    isObject = $.isObject,
		    toObject = $.toObject;$.each.call(("freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible," + "getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames").split(","), function (KEY, ID) {
			var fn = ($.core.Object || {})[KEY] || Object[KEY],
			    forced = 0,
			    method = {};method[KEY] = ID == 0 ? function freeze(it) {
				return isObject(it) ? fn(it) : it;
			} : ID == 1 ? function seal(it) {
				return isObject(it) ? fn(it) : it;
			} : ID == 2 ? function preventExtensions(it) {
				return isObject(it) ? fn(it) : it;
			} : ID == 3 ? function isFrozen(it) {
				return isObject(it) ? fn(it) : true;
			} : ID == 4 ? function isSealed(it) {
				return isObject(it) ? fn(it) : true;
			} : ID == 5 ? function isExtensible(it) {
				return isObject(it) ? fn(it) : false;
			} : ID == 6 ? function getOwnPropertyDescriptor(it, key) {
				return fn(toObject(it), key);
			} : ID == 7 ? function getPrototypeOf(it) {
				return fn(Object($.assertDefined(it)));
			} : ID == 8 ? function keys(it) {
				return fn(toObject(it));
			} : require("./$.get-names").get;try {
				fn("z");
			} catch (e) {
				forced = 1;
			}$def($def.S + $def.F * forced, "Object", method);
		});
	}, { "./$": 24, "./$.def": 13, "./$.get-names": 18 }], 62: [function (require, module, exports) {
		"use strict";var cof = require("./$.cof"),
		    tmp = {};tmp[require("./$.wks")("toStringTag")] = "z";if (require("./$").FW && cof(tmp) != "z") {
			require("./$.redef")(Object.prototype, "toString", function toString() {
				return "[object " + cof.classof(this) + "]";
			}, true);
		}
	}, { "./$": 24, "./$.cof": 7, "./$.redef": 29, "./$.wks": 42 }], 63: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    ctx = require("./$.ctx"),
		    cof = require("./$.cof"),
		    $def = require("./$.def"),
		    assert = require("./$.assert"),
		    forOf = require("./$.for-of"),
		    setProto = require("./$.set-proto").set,
		    same = require("./$.same"),
		    species = require("./$.species"),
		    SPECIES = require("./$.wks")("species"),
		    RECORD = require("./$.uid").safe("record"),
		    PROMISE = "Promise",
		    global = $.g,
		    process = global.process,
		    isNode = cof(process) == "process",
		    asap = process && process.nextTick || require("./$.task").set,
		    P = global[PROMISE],
		    isFunction = $.isFunction,
		    isObject = $.isObject,
		    assertFunction = assert.fn,
		    assertObject = assert.obj,
		    Wrapper;function testResolve(sub) {
			var test = new P(function () {});if (sub) test.constructor = Object;return P.resolve(test) === test;
		}var useNative = (function () {
			var works = false;function P2(x) {
				var self = new P(x);setProto(self, P2.prototype);return self;
			}try {
				works = isFunction(P) && isFunction(P.resolve) && testResolve();setProto(P2, P);P2.prototype = $.create(P.prototype, { constructor: { value: P2 } });if (!(P2.resolve(5).then(function () {}) instanceof P2)) {
					works = false;
				}if (works && $.DESC) {
					var thenableThenGotten = false;P.resolve($.setDesc({}, "then", { get: function get() {
							thenableThenGotten = true;
						} }));works = thenableThenGotten;
				}
			} catch (e) {
				works = false;
			}return works;
		})();function isPromise(it) {
			return isObject(it) && (useNative ? cof.classof(it) == "Promise" : RECORD in it);
		}function sameConstructor(a, b) {
			if (!$.FW && a === P && b === Wrapper) return true;return same(a, b);
		}function getConstructor(C) {
			var S = assertObject(C)[SPECIES];return S != undefined ? S : C;
		}function isThenable(it) {
			var then;if (isObject(it)) then = it.then;return isFunction(then) ? then : false;
		}function notify(record) {
			var chain = record.c;if (chain.length) asap.call(global, function () {
				var value = record.v,
				    ok = record.s == 1,
				    i = 0;function run(react) {
					var cb = ok ? react.ok : react.fail,
					    ret,
					    then;try {
						if (cb) {
							if (!ok) record.h = true;ret = cb === true ? value : cb(value);if (ret === react.P) {
								react.rej(TypeError("Promise-chain cycle"));
							} else if (then = isThenable(ret)) {
								then.call(ret, react.res, react.rej);
							} else react.res(ret);
						} else react.rej(value);
					} catch (err) {
						react.rej(err);
					}
				}while (chain.length > i) run(chain[i++]);chain.length = 0;
			});
		}function isUnhandled(promise) {
			var record = promise[RECORD],
			    chain = record.a || record.c,
			    i = 0,
			    react;if (record.h) return false;while (chain.length > i) {
				react = chain[i++];if (react.fail || !isUnhandled(react.P)) return false;
			}return true;
		}function $reject(value) {
			var record = this,
			    promise;if (record.d) return;record.d = true;record = record.r || record;record.v = value;record.s = 2;record.a = record.c.slice();setTimeout(function () {
				asap.call(global, function () {
					if (isUnhandled(promise = record.p)) {
						if (isNode) {
							process.emit("unhandledRejection", value, promise);
						} else if (global.console && console.error) {
							console.error("Unhandled promise rejection", value);
						}
					}record.a = undefined;
				});
			}, 1);notify(record);
		}function $resolve(value) {
			var record = this,
			    then;if (record.d) return;record.d = true;record = record.r || record;try {
				if (then = isThenable(value)) {
					asap.call(global, function () {
						var wrapper = { r: record, d: false };try {
							then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
						} catch (e) {
							$reject.call(wrapper, e);
						}
					});
				} else {
					record.v = value;record.s = 1;notify(record);
				}
			} catch (e) {
				$reject.call({ r: record, d: false }, e);
			}
		}if (!useNative) {
			P = function Promise(executor) {
				assertFunction(executor);var record = { p: assert.inst(this, P, PROMISE), c: [], a: undefined, s: 0, d: false, v: undefined, h: false };$.hide(this, RECORD, record);try {
					executor(ctx($resolve, record, 1), ctx($reject, record, 1));
				} catch (err) {
					$reject.call(record, err);
				}
			};require("./$.mix")(P.prototype, { then: function then(onFulfilled, onRejected) {
					var S = assertObject(assertObject(this).constructor)[SPECIES];var react = { ok: isFunction(onFulfilled) ? onFulfilled : true, fail: isFunction(onRejected) ? onRejected : false };var promise = react.P = new (S != undefined ? S : P)(function (res, rej) {
						react.res = assertFunction(res);react.rej = assertFunction(rej);
					});var record = this[RECORD];record.c.push(react);if (record.a) record.a.push(react);if (record.s) notify(record);return promise;
				}, "catch": function _catch(onRejected) {
					return this.then(undefined, onRejected);
				} });
		}$def($def.G + $def.W + $def.F * !useNative, { Promise: P });cof.set(P, PROMISE);species(P);species(Wrapper = $.core[PROMISE]);$def($def.S + $def.F * !useNative, PROMISE, { reject: function reject(r) {
				return new (getConstructor(this))(function (res, rej) {
					rej(r);
				});
			} });$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, { resolve: function resolve(x) {
				return isPromise(x) && sameConstructor(x.constructor, this) ? x : new this(function (res) {
					res(x);
				});
			} });$def($def.S + $def.F * !(useNative && require("./$.iter-detect")(function (iter) {
			P.all(iter)["catch"](function () {});
		})), PROMISE, { all: function all(iterable) {
				var C = getConstructor(this),
				    values = [];return new C(function (res, rej) {
					forOf(iterable, false, values.push, values);var remaining = values.length,
					    results = Array(remaining);if (remaining) $.each.call(values, function (promise, index) {
						C.resolve(promise).then(function (value) {
							results[index] = value;--remaining || res(results);
						}, rej);
					});else res(results);
				});
			}, race: function race(iterable) {
				var C = getConstructor(this);return new C(function (res, rej) {
					forOf(iterable, false, function (promise) {
						C.resolve(promise).then(res, rej);
					});
				});
			} });
	}, { "./$": 24, "./$.assert": 5, "./$.cof": 7, "./$.ctx": 12, "./$.def": 13, "./$.for-of": 16, "./$.iter-detect": 22, "./$.mix": 26, "./$.same": 31, "./$.set-proto": 32, "./$.species": 34, "./$.task": 38, "./$.uid": 40, "./$.wks": 42 }], 64: [function (require, module, exports) {
		var $ = require("./$"),
		    $def = require("./$.def"),
		    setProto = require("./$.set-proto"),
		    $iter = require("./$.iter"),
		    ITERATOR = require("./$.wks")("iterator"),
		    ITER = require("./$.uid").safe("iter"),
		    step = $iter.step,
		    assert = require("./$.assert"),
		    isObject = $.isObject,
		    getProto = $.getProto,
		    $Reflect = $.g.Reflect,
		    _apply = Function.apply,
		    assertObject = assert.obj,
		    _isExtensible = Object.isExtensible || isObject,
		    _preventExtensions = Object.preventExtensions,
		    buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));function Enumerate(iterated) {
			$.set(this, ITER, { o: iterated, k: undefined, i: 0 });
		}$iter.create(Enumerate, "Object", function () {
			var iter = this[ITER],
			    keys = iter.k,
			    key;if (keys == undefined) {
				iter.k = keys = [];for (key in iter.o) keys.push(key);
			}do {
				if (iter.i >= keys.length) return step(1);
			} while (!((key = keys[iter.i++]) in iter.o));return step(0, key);
		});var reflect = { apply: function apply(target, thisArgument, argumentsList) {
				return _apply.call(target, thisArgument, argumentsList);
			}, construct: function construct(target, argumentsList) {
				var proto = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype,
				    instance = $.create(isObject(proto) ? proto : Object.prototype),
				    result = _apply.call(target, instance, argumentsList);return isObject(result) ? result : instance;
			}, defineProperty: function defineProperty(target, propertyKey, attributes) {
				assertObject(target);try {
					$.setDesc(target, propertyKey, attributes);return true;
				} catch (e) {
					return false;
				}
			}, deleteProperty: function deleteProperty(target, propertyKey) {
				var desc = $.getDesc(assertObject(target), propertyKey);return desc && !desc.configurable ? false : delete target[propertyKey];
			}, get: function get(_x29, _x30) {
				var _arguments2 = arguments;
				var _again2 = true;

				_function2: while (_again2) {
					var target = _x29,
					    propertyKey = _x30;
					_again2 = false;
					var receiver = _arguments2.length < 3 ? target : _arguments2[2],
					    desc = $.getDesc(assertObject(target), propertyKey),
					    proto;if (desc) return $.has(desc, "value") ? desc.value : desc.get === undefined ? undefined : desc.get.call(receiver);if (isObject(proto = getProto(target))) {
						_arguments2 = [_x29 = proto, _x30 = propertyKey, receiver];
						_again2 = true;
						receiver = desc = proto = undefined;
						continue _function2;
					} else {
						return undefined;
					}
				}
			}, getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
				return $.getDesc(assertObject(target), propertyKey);
			}, getPrototypeOf: function getPrototypeOf(target) {
				return getProto(assertObject(target));
			}, has: function has(target, propertyKey) {
				return propertyKey in target;
			}, isExtensible: function isExtensible(target) {
				return _isExtensible(assertObject(target));
			}, ownKeys: require("./$.own-keys"), preventExtensions: function preventExtensions(target) {
				assertObject(target);try {
					if (_preventExtensions) _preventExtensions(target);return true;
				} catch (e) {
					return false;
				}
			}, set: function set(_x31, _x32, _x33) {
				var _arguments3 = arguments;
				var _again3 = true;

				_function3: while (_again3) {
					var target = _x31,
					    propertyKey = _x32,
					    V = _x33;
					_again3 = false;
					var receiver = _arguments3.length < 4 ? target : _arguments3[3],
					    ownDesc = $.getDesc(assertObject(target), propertyKey),
					    existingDescriptor,
					    proto;if (!ownDesc) {
						if (isObject(proto = getProto(target))) {
							_arguments3 = [_x31 = proto, _x32 = propertyKey, _x33 = V, receiver];
							_again3 = true;
							receiver = ownDesc = existingDescriptor = proto = undefined;
							continue _function3;
						}ownDesc = $.desc(0);
					}if ($.has(ownDesc, "value")) {
						if (ownDesc.writable === false || !isObject(receiver)) return false;existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);existingDescriptor.value = V;$.setDesc(receiver, propertyKey, existingDescriptor);return true;
					}return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
				}
			} };if (setProto) reflect.setPrototypeOf = function setPrototypeOf(target, proto) {
			setProto.check(target, proto);try {
				setProto.set(target, proto);return true;
			} catch (e) {
				return false;
			}
		};$def($def.G, { Reflect: {} });$def($def.S + $def.F * buggyEnumerate, "Reflect", { enumerate: function enumerate(target) {
				return new Enumerate(assertObject(target));
			} });$def($def.S, "Reflect", reflect);
	}, { "./$": 24, "./$.assert": 5, "./$.def": 13, "./$.iter": 23, "./$.own-keys": 27, "./$.set-proto": 32, "./$.uid": 40, "./$.wks": 42 }], 65: [function (require, module, exports) {
		var $ = require("./$"),
		    cof = require("./$.cof"),
		    $RegExp = $.g.RegExp,
		    Base = $RegExp,
		    proto = $RegExp.prototype,
		    re = /a/g,
		    CORRECT_NEW = new $RegExp(re) !== re,
		    ALLOWS_RE_WITH_FLAGS = (function () {
			try {
				return $RegExp(re, "i") == "/a/i";
			} catch (e) {}
		})();if ($.FW && $.DESC) {
			if (!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS) {
				$RegExp = function RegExp(pattern, flags) {
					var patternIsRegExp = cof(pattern) == "RegExp",
					    flagsIsUndefined = flags === undefined;if (!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined) return pattern;return CORRECT_NEW ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags) : new Base(patternIsRegExp ? pattern.source : pattern, patternIsRegExp && flagsIsUndefined ? pattern.flags : flags);
				};$.each.call($.getNames(Base), function (key) {
					key in $RegExp || $.setDesc($RegExp, key, { configurable: true, get: function get() {
							return Base[key];
						}, set: function set(it) {
							Base[key] = it;
						} });
				});proto.constructor = $RegExp;$RegExp.prototype = proto;require("./$.redef")($.g, "RegExp", $RegExp);
			}if (/./g.flags != "g") $.setDesc(proto, "flags", { configurable: true, get: require("./$.replacer")(/^.*\/(\w*)$/, "$1") });
		}require("./$.species")($RegExp);
	}, { "./$": 24, "./$.cof": 7, "./$.redef": 29, "./$.replacer": 30, "./$.species": 34 }], 66: [function (require, module, exports) {
		"use strict";var strong = require("./$.collection-strong");require("./$.collection")("Set", function (get) {
			return function Set() {
				return get(this, arguments[0]);
			};
		}, { add: function add(value) {
				return strong.def(this, value = value === 0 ? 0 : value, value);
			} }, strong);
	}, { "./$.collection": 11, "./$.collection-strong": 8 }], 67: [function (require, module, exports) {
		"use strict";var $def = require("./$.def"),
		    $at = require("./$.string-at")(false);$def($def.P, "String", { codePointAt: function codePointAt(pos) {
				return $at(this, pos);
			} });
	}, { "./$.def": 13, "./$.string-at": 35 }], 68: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    cof = require("./$.cof"),
		    $def = require("./$.def"),
		    toLength = $.toLength;$def($def.P + $def.F * !require("./$.throws")(function () {
			"q".endsWith(/./);
		}), "String", { endsWith: function endsWith(searchString) {
				if (cof(searchString) == "RegExp") throw TypeError();var that = String($.assertDefined(this)),
				    endPosition = arguments[1],
				    len = toLength(that.length),
				    end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);searchString += "";return that.slice(end - searchString.length, end) === searchString;
			} });
	}, { "./$": 24, "./$.cof": 7, "./$.def": 13, "./$.throws": 39 }], 69: [function (require, module, exports) {
		var $def = require("./$.def"),
		    toIndex = require("./$").toIndex,
		    fromCharCode = String.fromCharCode,
		    $fromCodePoint = String.fromCodePoint;$def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), "String", { fromCodePoint: function fromCodePoint(x) {
				var res = [],
				    len = arguments.length,
				    i = 0,
				    code;while (len > i) {
					code = +arguments[i++];if (toIndex(code, 1114111) !== code) throw RangeError(code + " is not a valid code point");res.push(code < 65536 ? fromCharCode(code) : fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320));
				}return res.join("");
			} });
	}, { "./$": 24, "./$.def": 13 }], 70: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    cof = require("./$.cof"),
		    $def = require("./$.def");$def($def.P, "String", { includes: function includes(searchString) {
				if (cof(searchString) == "RegExp") throw TypeError();return !! ~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
			} });
	}, { "./$": 24, "./$.cof": 7, "./$.def": 13 }], 71: [function (require, module, exports) {
		var set = require("./$").set,
		    $at = require("./$.string-at")(true),
		    ITER = require("./$.uid").safe("iter"),
		    $iter = require("./$.iter"),
		    step = $iter.step;require("./$.iter-define")(String, "String", function (iterated) {
			set(this, ITER, { o: String(iterated), i: 0 });
		}, function () {
			var iter = this[ITER],
			    O = iter.o,
			    index = iter.i,
			    point;if (index >= O.length) return step(1);point = $at(O, index);iter.i += point.length;return step(0, point);
		});
	}, { "./$": 24, "./$.iter": 23, "./$.iter-define": 21, "./$.string-at": 35, "./$.uid": 40 }], 72: [function (require, module, exports) {
		var $ = require("./$"),
		    $def = require("./$.def");$def($def.S, "String", { raw: function raw(callSite) {
				var tpl = $.toObject(callSite.raw),
				    len = $.toLength(tpl.length),
				    sln = arguments.length,
				    res = [],
				    i = 0;while (len > i) {
					res.push(String(tpl[i++]));if (i < sln) res.push(String(arguments[i]));
				}return res.join("");
			} });
	}, { "./$": 24, "./$.def": 13 }], 73: [function (require, module, exports) {
		var $def = require("./$.def");$def($def.P, "String", { repeat: require("./$.string-repeat") });
	}, { "./$.def": 13, "./$.string-repeat": 37 }], 74: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    cof = require("./$.cof"),
		    $def = require("./$.def");$def($def.P + $def.F * !require("./$.throws")(function () {
			"q".startsWith(/./);
		}), "String", { startsWith: function startsWith(searchString) {
				if (cof(searchString) == "RegExp") throw TypeError();var that = String($.assertDefined(this)),
				    index = $.toLength(Math.min(arguments[1], that.length));searchString += "";return that.slice(index, index + searchString.length) === searchString;
			} });
	}, { "./$": 24, "./$.cof": 7, "./$.def": 13, "./$.throws": 39 }], 75: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    setTag = require("./$.cof").set,
		    uid = require("./$.uid"),
		    shared = require("./$.shared"),
		    $def = require("./$.def"),
		    $redef = require("./$.redef"),
		    keyOf = require("./$.keyof"),
		    enumKeys = require("./$.enum-keys"),
		    assertObject = require("./$.assert").obj,
		    ObjectProto = Object.prototype,
		    DESC = $.DESC,
		    has = $.has,
		    $create = $.create,
		    getDesc = $.getDesc,
		    setDesc = $.setDesc,
		    desc = $.desc,
		    $names = require("./$.get-names"),
		    getNames = $names.get,
		    toObject = $.toObject,
		    $Symbol = $.g.Symbol,
		    setter = false,
		    TAG = uid("tag"),
		    HIDDEN = uid("hidden"),
		    _propertyIsEnumerable = ({}).propertyIsEnumerable,
		    SymbolRegistry = shared("symbol-registry"),
		    AllSymbols = shared("symbols"),
		    useNative = $.isFunction($Symbol);var setSymbolDesc = DESC ? (function () {
			try {
				return $create(setDesc({}, HIDDEN, { get: function get() {
						return setDesc(this, HIDDEN, { value: false })[HIDDEN];
					} }))[HIDDEN] || setDesc;
			} catch (e) {
				return function (it, key, D) {
					var protoDesc = getDesc(ObjectProto, key);if (protoDesc) delete ObjectProto[key];setDesc(it, key, D);if (protoDesc && it !== ObjectProto) setDesc(ObjectProto, key, protoDesc);
				};
			}
		})() : setDesc;function wrap(tag) {
			var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);DESC && setter && setSymbolDesc(ObjectProto, tag, { configurable: true, set: function set(value) {
					if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;setSymbolDesc(this, tag, desc(1, value));
				} });return sym;
		}function defineProperty(it, key, D) {
			if (D && has(AllSymbols, key)) {
				if (!D.enumerable) {
					if (!has(it, HIDDEN)) setDesc(it, HIDDEN, desc(1, {}));it[HIDDEN][key] = true;
				} else {
					if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;D = $create(D, { enumerable: desc(0, false) });
				}return setSymbolDesc(it, key, D);
			}return setDesc(it, key, D);
		}function defineProperties(it, P) {
			assertObject(it);var keys = enumKeys(P = toObject(P)),
			    i = 0,
			    l = keys.length,
			    key;while (l > i) defineProperty(it, key = keys[i++], P[key]);return it;
		}function create(it, P) {
			return P === undefined ? $create(it) : defineProperties($create(it), P);
		}function propertyIsEnumerable(key) {
			var E = _propertyIsEnumerable.call(this, key);return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
		}function getOwnPropertyDescriptor(it, key) {
			var D = getDesc(it = toObject(it), key);if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;return D;
		}function getOwnPropertyNames(it) {
			var names = getNames(toObject(it)),
			    result = [],
			    i = 0,
			    key;while (names.length > i) if (!has(AllSymbols, key = names[i++]) && key != HIDDEN) result.push(key);return result;
		}function getOwnPropertySymbols(it) {
			var names = getNames(toObject(it)),
			    result = [],
			    i = 0,
			    key;while (names.length > i) if (has(AllSymbols, key = names[i++])) result.push(AllSymbols[key]);return result;
		}if (!useNative) {
			$Symbol = function Symbol() {
				if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor");return wrap(uid(arguments[0]));
			};$redef($Symbol.prototype, "toString", function () {
				return this[TAG];
			});$.create = create;$.setDesc = defineProperty;$.getDesc = getOwnPropertyDescriptor;$.setDescs = defineProperties;$.getNames = $names.get = getOwnPropertyNames;$.getSymbols = getOwnPropertySymbols;if ($.DESC && $.FW) $redef(ObjectProto, "propertyIsEnumerable", propertyIsEnumerable, true);
		}var symbolStatics = { "for": function _for(key) {
				return has(SymbolRegistry, key += "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
			}, keyFor: function keyFor(key) {
				return keyOf(SymbolRegistry, key);
			}, useSetter: function useSetter() {
				setter = true;
			}, useSimple: function useSimple() {
				setter = false;
			} };$.each.call(("hasInstance,isConcatSpreadable,iterator,match,replace,search," + "species,split,toPrimitive,toStringTag,unscopables").split(","), function (it) {
			var sym = require("./$.wks")(it);symbolStatics[it] = useNative ? sym : wrap(sym);
		});setter = true;$def($def.G + $def.W, { Symbol: $Symbol });$def($def.S, "Symbol", symbolStatics);$def($def.S + $def.F * !useNative, "Object", { create: create, defineProperty: defineProperty, defineProperties: defineProperties, getOwnPropertyDescriptor: getOwnPropertyDescriptor, getOwnPropertyNames: getOwnPropertyNames, getOwnPropertySymbols: getOwnPropertySymbols });setTag($Symbol, "Symbol");setTag(Math, "Math", true);setTag($.g.JSON, "JSON", true);
	}, { "./$": 24, "./$.assert": 5, "./$.cof": 7, "./$.def": 13, "./$.enum-keys": 15, "./$.get-names": 18, "./$.keyof": 25, "./$.redef": 29, "./$.shared": 33, "./$.uid": 40, "./$.wks": 42 }], 76: [function (require, module, exports) {
		"use strict";var $ = require("./$"),
		    weak = require("./$.collection-weak"),
		    leakStore = weak.leakStore,
		    ID = weak.ID,
		    WEAK = weak.WEAK,
		    has = $.has,
		    isObject = $.isObject,
		    isExtensible = Object.isExtensible || isObject,
		    tmp = {};var $WeakMap = require("./$.collection")("WeakMap", function (get) {
			return function WeakMap() {
				return get(this, arguments[0]);
			};
		}, { get: function get(key) {
				if (isObject(key)) {
					if (!isExtensible(key)) return leakStore(this).get(key);if (has(key, WEAK)) return key[WEAK][this[ID]];
				}
			}, set: function set(key, value) {
				return weak.def(this, key, value);
			} }, weak, true, true);if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
			$.each.call(["delete", "has", "get", "set"], function (key) {
				var proto = $WeakMap.prototype,
				    method = proto[key];require("./$.redef")(proto, key, function (a, b) {
					if (isObject(a) && !isExtensible(a)) {
						var result = leakStore(this)[key](a, b);
						return key == "set" ? this : result;
					}return method.call(this, a, b);
				});
			});
		}
	}, { "./$": 24, "./$.collection": 11, "./$.collection-weak": 10, "./$.redef": 29 }], 77: [function (require, module, exports) {
		"use strict";var weak = require("./$.collection-weak");require("./$.collection")("WeakSet", function (get) {
			return function WeakSet() {
				return get(this, arguments[0]);
			};
		}, { add: function add(value) {
				return weak.def(this, value, true);
			} }, weak, false, true);
	}, { "./$.collection": 11, "./$.collection-weak": 10 }], 78: [function (require, module, exports) {
		"use strict";var $def = require("./$.def"),
		    $includes = require("./$.array-includes")(true);$def($def.P, "Array", { includes: function includes(el) {
				return $includes(this, el, arguments[1]);
			} });require("./$.unscope")("includes");
	}, { "./$.array-includes": 3, "./$.def": 13, "./$.unscope": 41 }], 79: [function (require, module, exports) {
		require("./$.collection-to-json")("Map");
	}, { "./$.collection-to-json": 9 }], 80: [function (require, module, exports) {
		var $ = require("./$"),
		    $def = require("./$.def"),
		    ownKeys = require("./$.own-keys");$def($def.S, "Object", { getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
				var O = $.toObject(object),
				    result = {};$.each.call(ownKeys(O), function (key) {
					$.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
				});return result;
			} });
	}, { "./$": 24, "./$.def": 13, "./$.own-keys": 27 }], 81: [function (require, module, exports) {
		var $ = require("./$"),
		    $def = require("./$.def");function createObjectToArray(isEntries) {
			return function (object) {
				var O = $.toObject(object),
				    keys = $.getKeys(O),
				    length = keys.length,
				    i = 0,
				    result = Array(length),
				    key;if (isEntries) while (length > i) result[i] = [key = keys[i++], O[key]];else while (length > i) result[i] = O[keys[i++]];return result;
			};
		}$def($def.S, "Object", { values: createObjectToArray(false), entries: createObjectToArray(true) });
	}, { "./$": 24, "./$.def": 13 }], 82: [function (require, module, exports) {
		var $def = require("./$.def");$def($def.S, "RegExp", { escape: require("./$.replacer")(/[\\^$*+?.()|[\]{}]/g, "\\$&", true) });
	}, { "./$.def": 13, "./$.replacer": 30 }], 83: [function (require, module, exports) {
		require("./$.collection-to-json")("Set");
	}, { "./$.collection-to-json": 9 }], 84: [function (require, module, exports) {
		"use strict";var $def = require("./$.def"),
		    $at = require("./$.string-at")(true);$def($def.P, "String", { at: function at(pos) {
				return $at(this, pos);
			} });
	}, { "./$.def": 13, "./$.string-at": 35 }], 85: [function (require, module, exports) {
		"use strict";var $def = require("./$.def"),
		    $pad = require("./$.string-pad");$def($def.P, "String", { lpad: function lpad(n) {
				return $pad(this, n, arguments[1], true);
			} });
	}, { "./$.def": 13, "./$.string-pad": 36 }], 86: [function (require, module, exports) {
		"use strict";var $def = require("./$.def"),
		    $pad = require("./$.string-pad");$def($def.P, "String", { rpad: function rpad(n) {
				return $pad(this, n, arguments[1], false);
			} });
	}, { "./$.def": 13, "./$.string-pad": 36 }], 87: [function (require, module, exports) {
		var $ = require("./$"),
		    $def = require("./$.def"),
		    $Array = $.core.Array || Array,
		    statics = {};function setStatics(keys, length) {
			$.each.call(keys.split(","), function (key) {
				if (length == undefined && key in $Array) statics[key] = $Array[key];else if (key in []) statics[key] = require("./$.ctx")(Function.call, [][key], length);
			});
		}setStatics("pop,reverse,shift,keys,values,entries", 1);setStatics("indexOf,every,some,forEach,map,filter,find,findIndex,includes", 3);setStatics("join,slice,concat,push,splice,unshift,sort,lastIndexOf," + "reduce,reduceRight,copyWithin,fill,turn");$def($def.S, "Array", statics);
	}, { "./$": 24, "./$.ctx": 12, "./$.def": 13 }], 88: [function (require, module, exports) {
		require("./es6.array.iterator");var $ = require("./$"),
		    Iterators = require("./$.iter").Iterators,
		    ITERATOR = require("./$.wks")("iterator"),
		    ArrayValues = Iterators.Array,
		    NL = $.g.NodeList,
		    HTC = $.g.HTMLCollection,
		    NLProto = NL && NL.prototype,
		    HTCProto = HTC && HTC.prototype;if ($.FW) {
			if (NL && !(ITERATOR in NLProto)) $.hide(NLProto, ITERATOR, ArrayValues);if (HTC && !(ITERATOR in HTCProto)) $.hide(HTCProto, ITERATOR, ArrayValues);
		}Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;
	}, { "./$": 24, "./$.iter": 23, "./$.wks": 42, "./es6.array.iterator": 49 }], 89: [function (require, module, exports) {
		var $def = require("./$.def"),
		    $task = require("./$.task");$def($def.G + $def.B, { setImmediate: $task.set, clearImmediate: $task.clear });
	}, { "./$.def": 13, "./$.task": 38 }], 90: [function (require, module, exports) {
		var $ = require("./$"),
		    $def = require("./$.def"),
		    invoke = require("./$.invoke"),
		    partial = require("./$.partial"),
		    navigator = $.g.navigator,
		    MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent);function wrap(set) {
			return MSIE ? function (fn, time) {
				return set(invoke(partial, [].slice.call(arguments, 2), $.isFunction(fn) ? fn : Function(fn)), time);
			} : set;
		}$def($def.G + $def.B + $def.F * MSIE, { setTimeout: wrap($.g.setTimeout), setInterval: wrap($.g.setInterval) });
	}, { "./$": 24, "./$.def": 13, "./$.invoke": 19, "./$.partial": 28 }], 91: [function (require, module, exports) {
		require("./modules/es5");require("./modules/es6.symbol");require("./modules/es6.object.assign");require("./modules/es6.object.is");require("./modules/es6.object.set-prototype-of");require("./modules/es6.object.to-string");require("./modules/es6.object.statics-accept-primitives");require("./modules/es6.function.name");require("./modules/es6.function.has-instance");require("./modules/es6.number.constructor");require("./modules/es6.number.statics");require("./modules/es6.math");require("./modules/es6.string.from-code-point");require("./modules/es6.string.raw");require("./modules/es6.string.iterator");require("./modules/es6.string.code-point-at");require("./modules/es6.string.ends-with");require("./modules/es6.string.includes");require("./modules/es6.string.repeat");require("./modules/es6.string.starts-with");require("./modules/es6.array.from");require("./modules/es6.array.of");require("./modules/es6.array.iterator");require("./modules/es6.array.species");require("./modules/es6.array.copy-within");require("./modules/es6.array.fill");require("./modules/es6.array.find");require("./modules/es6.array.find-index");require("./modules/es6.regexp");require("./modules/es6.promise");require("./modules/es6.map");require("./modules/es6.set");require("./modules/es6.weak-map");require("./modules/es6.weak-set");require("./modules/es6.reflect");require("./modules/es7.array.includes");require("./modules/es7.string.at");require("./modules/es7.string.lpad");require("./modules/es7.string.rpad");require("./modules/es7.regexp.escape");require("./modules/es7.object.get-own-property-descriptors");require("./modules/es7.object.to-array");require("./modules/es7.map.to-json");require("./modules/es7.set.to-json");require("./modules/js.array.statics");require("./modules/web.timers");require("./modules/web.immediate");require("./modules/web.dom.iterable");module.exports = require("./modules/$").core;
	}, { "./modules/$": 24, "./modules/es5": 43, "./modules/es6.array.copy-within": 44, "./modules/es6.array.fill": 45, "./modules/es6.array.find": 47, "./modules/es6.array.find-index": 46, "./modules/es6.array.from": 48, "./modules/es6.array.iterator": 49, "./modules/es6.array.of": 50, "./modules/es6.array.species": 51, "./modules/es6.function.has-instance": 52, "./modules/es6.function.name": 53, "./modules/es6.map": 54, "./modules/es6.math": 55, "./modules/es6.number.constructor": 56, "./modules/es6.number.statics": 57, "./modules/es6.object.assign": 58, "./modules/es6.object.is": 59, "./modules/es6.object.set-prototype-of": 60, "./modules/es6.object.statics-accept-primitives": 61, "./modules/es6.object.to-string": 62, "./modules/es6.promise": 63, "./modules/es6.reflect": 64, "./modules/es6.regexp": 65, "./modules/es6.set": 66, "./modules/es6.string.code-point-at": 67, "./modules/es6.string.ends-with": 68, "./modules/es6.string.from-code-point": 69, "./modules/es6.string.includes": 70, "./modules/es6.string.iterator": 71, "./modules/es6.string.raw": 72, "./modules/es6.string.repeat": 73, "./modules/es6.string.starts-with": 74, "./modules/es6.symbol": 75, "./modules/es6.weak-map": 76, "./modules/es6.weak-set": 77, "./modules/es7.array.includes": 78, "./modules/es7.map.to-json": 79, "./modules/es7.object.get-own-property-descriptors": 80, "./modules/es7.object.to-array": 81, "./modules/es7.regexp.escape": 82, "./modules/es7.set.to-json": 83, "./modules/es7.string.at": 84, "./modules/es7.string.lpad": 85, "./modules/es7.string.rpad": 86, "./modules/js.array.statics": 87, "./modules/web.dom.iterable": 88, "./modules/web.immediate": 89, "./modules/web.timers": 90 }], 92: [function (require, module, exports) {
		(function (process, global) {
			!(function (global) {
				"use strict";var hasOwn = Object.prototype.hasOwnProperty;var undefined;var iteratorSymbol = typeof Symbol === "function" && Symbol.iterator || "@@iterator";var inModule = typeof module === "object";var runtime = global.regeneratorRuntime;if (runtime) {
					if (inModule) {
						module.exports = runtime;
					}return;
				}runtime = global.regeneratorRuntime = inModule ? module.exports : {};function wrap(innerFn, outerFn, self, tryLocsList) {
					var generator = Object.create((outerFn || Generator).prototype);generator._invoke = makeInvokeMethod(innerFn, self || null, new Context(tryLocsList || []));return generator;
				}runtime.wrap = wrap;function tryCatch(fn, obj, arg) {
					try {
						return { type: "normal", arg: fn.call(obj, arg) };
					} catch (err) {
						return { type: "throw", arg: err };
					}
				}var GenStateSuspendedStart = "suspendedStart";var GenStateSuspendedYield = "suspendedYield";var GenStateExecuting = "executing";var GenStateCompleted = "completed";var ContinueSentinel = {};function Generator() {}function GeneratorFunction() {}function GeneratorFunctionPrototype() {}var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;GeneratorFunctionPrototype.constructor = GeneratorFunction;GeneratorFunction.displayName = "GeneratorFunction";function defineIteratorMethods(prototype) {
					["next", "throw", "return"].forEach(function (method) {
						prototype[method] = function (arg) {
							return this._invoke(method, arg);
						};
					});
				}runtime.isGeneratorFunction = function (genFun) {
					var ctor = typeof genFun === "function" && genFun.constructor;return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
				};runtime.mark = function (genFun) {
					genFun.__proto__ = GeneratorFunctionPrototype;genFun.prototype = Object.create(Gp);return genFun;
				};runtime.awrap = function (arg) {
					return new AwaitArgument(arg);
				};function AwaitArgument(arg) {
					this.arg = arg;
				}function AsyncIterator(generator) {
					function invoke(method, arg) {
						var result = generator[method](arg);var value = result.value;return value instanceof AwaitArgument ? Promise.resolve(value.arg).then(invokeNext, invokeThrow) : Promise.resolve(value).then(function (unwrapped) {
							result.value = unwrapped;return result;
						});
					}if (typeof process === "object" && process.domain) {
						invoke = process.domain.bind(invoke);
					}var invokeNext = invoke.bind(generator, "next");var invokeThrow = invoke.bind(generator, "throw");var invokeReturn = invoke.bind(generator, "return");var previousPromise;function enqueue(method, arg) {
						var enqueueResult = previousPromise ? previousPromise.then(function () {
							return invoke(method, arg);
						}) : new Promise(function (resolve) {
							resolve(invoke(method, arg));
						});previousPromise = enqueueResult["catch"](function (ignored) {});return enqueueResult;
					}this._invoke = enqueue;
				}defineIteratorMethods(AsyncIterator.prototype);runtime.async = function (innerFn, outerFn, self, tryLocsList) {
					var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
						return result.done ? result.value : iter.next();
					});
				};function makeInvokeMethod(innerFn, self, context) {
					var state = GenStateSuspendedStart;return function invoke(method, arg) {
						if (state === GenStateExecuting) {
							throw new Error("Generator is already running");
						}if (state === GenStateCompleted) {
							if (method === "throw") {
								throw arg;
							}return doneResult();
						}while (true) {
							var delegate = context.delegate;if (delegate) {
								if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
									context.delegate = null;var returnMethod = delegate.iterator["return"];if (returnMethod) {
										var record = tryCatch(returnMethod, delegate.iterator, arg);if (record.type === "throw") {
											method = "throw";arg = record.arg;continue;
										}
									}if (method === "return") {
										continue;
									}
								}var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);if (record.type === "throw") {
									context.delegate = null;method = "throw";arg = record.arg;continue;
								}method = "next";arg = undefined;var info = record.arg;if (info.done) {
									context[delegate.resultName] = info.value;context.next = delegate.nextLoc;
								} else {
									state = GenStateSuspendedYield;return info;
								}context.delegate = null;
							}if (method === "next") {
								if (state === GenStateSuspendedYield) {
									context.sent = arg;
								} else {
									context.sent = undefined;
								}
							} else if (method === "throw") {
								if (state === GenStateSuspendedStart) {
									state = GenStateCompleted;throw arg;
								}if (context.dispatchException(arg)) {
									method = "next";arg = undefined;
								}
							} else if (method === "return") {
								context.abrupt("return", arg);
							}state = GenStateExecuting;var record = tryCatch(innerFn, self, context);if (record.type === "normal") {
								state = context.done ? GenStateCompleted : GenStateSuspendedYield;var info = { value: record.arg, done: context.done };if (record.arg === ContinueSentinel) {
									if (context.delegate && method === "next") {
										arg = undefined;
									}
								} else {
									return info;
								}
							} else if (record.type === "throw") {
								state = GenStateCompleted;method = "throw";arg = record.arg;
							}
						}
					};
				}defineIteratorMethods(Gp);Gp[iteratorSymbol] = function () {
					return this;
				};Gp.toString = function () {
					return "[object Generator]";
				};function pushTryEntry(locs) {
					var entry = { tryLoc: locs[0] };if (1 in locs) {
						entry.catchLoc = locs[1];
					}if (2 in locs) {
						entry.finallyLoc = locs[2];entry.afterLoc = locs[3];
					}this.tryEntries.push(entry);
				}function resetTryEntry(entry) {
					var record = entry.completion || {};record.type = "normal";delete record.arg;entry.completion = record;
				}function Context(tryLocsList) {
					this.tryEntries = [{ tryLoc: "root" }];tryLocsList.forEach(pushTryEntry, this);this.reset(true);
				}runtime.keys = function (object) {
					var keys = [];for (var key in object) {
						keys.push(key);
					}keys.reverse();return function next() {
						while (keys.length) {
							var key = keys.pop();if (key in object) {
								next.value = key;next.done = false;return next;
							}
						}next.done = true;return next;
					};
				};function values(iterable) {
					if (iterable) {
						var iteratorMethod = iterable[iteratorSymbol];if (iteratorMethod) {
							return iteratorMethod.call(iterable);
						}if (typeof iterable.next === "function") {
							return iterable;
						}if (!isNaN(iterable.length)) {
							var i = -1,
							    next = function next() {
								while (++i < iterable.length) {
									if (hasOwn.call(iterable, i)) {
										next.value = iterable[i];next.done = false;return next;
									}
								}next.value = undefined;next.done = true;return next;
							};return next.next = next;
						}
					}return { next: doneResult };
				}runtime.values = values;function doneResult() {
					return { value: undefined, done: true };
				}Context.prototype = { constructor: Context, reset: function reset(skipTempReset) {
						this.prev = 0;this.next = 0;this.sent = undefined;this.done = false;this.delegate = null;this.tryEntries.forEach(resetTryEntry);if (!skipTempReset) {
							for (var name in this) {
								if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
									this[name] = undefined;
								}
							}
						}
					}, stop: function stop() {
						this.done = true;var rootEntry = this.tryEntries[0];var rootRecord = rootEntry.completion;if (rootRecord.type === "throw") {
							throw rootRecord.arg;
						}return this.rval;
					}, dispatchException: function dispatchException(exception) {
						if (this.done) {
							throw exception;
						}var context = this;function handle(loc, caught) {
							record.type = "throw";record.arg = exception;context.next = loc;return !!caught;
						}for (var i = this.tryEntries.length - 1; i >= 0; --i) {
							var entry = this.tryEntries[i];var record = entry.completion;if (entry.tryLoc === "root") {
								return handle("end");
							}if (entry.tryLoc <= this.prev) {
								var hasCatch = hasOwn.call(entry, "catchLoc");var hasFinally = hasOwn.call(entry, "finallyLoc");if (hasCatch && hasFinally) {
									if (this.prev < entry.catchLoc) {
										return handle(entry.catchLoc, true);
									} else if (this.prev < entry.finallyLoc) {
										return handle(entry.finallyLoc);
									}
								} else if (hasCatch) {
									if (this.prev < entry.catchLoc) {
										return handle(entry.catchLoc, true);
									}
								} else if (hasFinally) {
									if (this.prev < entry.finallyLoc) {
										return handle(entry.finallyLoc);
									}
								} else {
									throw new Error("try statement without catch or finally");
								}
							}
						}
					}, abrupt: function abrupt(type, arg) {
						for (var i = this.tryEntries.length - 1; i >= 0; --i) {
							var entry = this.tryEntries[i];if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
								var finallyEntry = entry;break;
							}
						}if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
							finallyEntry = null;
						}var record = finallyEntry ? finallyEntry.completion : {};record.type = type;record.arg = arg;if (finallyEntry) {
							this.next = finallyEntry.finallyLoc;
						} else {
							this.complete(record);
						}return ContinueSentinel;
					}, complete: function complete(record, afterLoc) {
						if (record.type === "throw") {
							throw record.arg;
						}if (record.type === "break" || record.type === "continue") {
							this.next = record.arg;
						} else if (record.type === "return") {
							this.rval = record.arg;this.next = "end";
						} else if (record.type === "normal" && afterLoc) {
							this.next = afterLoc;
						}
					}, finish: function finish(finallyLoc) {
						for (var i = this.tryEntries.length - 1; i >= 0; --i) {
							var entry = this.tryEntries[i];if (entry.finallyLoc === finallyLoc) {
								this.complete(entry.completion, entry.afterLoc);resetTryEntry(entry);return ContinueSentinel;
							}
						}
					}, "catch": function _catch(tryLoc) {
						for (var i = this.tryEntries.length - 1; i >= 0; --i) {
							var entry = this.tryEntries[i];if (entry.tryLoc === tryLoc) {
								var record = entry.completion;if (record.type === "throw") {
									var thrown = record.arg;resetTryEntry(entry);
								}return thrown;
							}
						}throw new Error("illegal catch attempt");
					}, delegateYield: function delegateYield(iterable, resultName, nextLoc) {
						this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc };return ContinueSentinel;
					} };
			})(typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : this);
		}).call(this, require("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	}, { _process: 1 }] }, {}, [2]);

// Released under MIT license
// Copyright (c) 2009-2010 Dominic Baggott
// Copyright (c) 2009-2010 Ash Berlin
// Copyright (c) 2011 Christoph Dorn <christoph@christophdorn.com> (http://www.christophdorn.com)

/*jshint browser:true, devel:true */

(function (expose) {

	/**
  *  class Markdown
  *
  *  Markdown processing in Javascript done right. We have very particular views
  *  on what constitutes 'right' which include:
  *
  *  - produces well-formed HTML (this means that em and strong nesting is
  *    important)
  *
  *  - has an intermediate representation to allow processing of parsed data (We
  *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).
  *
  *  - is easily extensible to add new dialects without having to rewrite the
  *    entire parsing mechanics
  *
  *  - has a good test suite
  *
  *  This implementation fulfills all of these (except that the test suite could
  *  do with expanding to automatically run all the fixtures from other Markdown
  *  implementations.)
  *
  *  ##### Intermediate Representation
  *
  *  *TODO* Talk about this :) Its JsonML, but document the node names we use.
  *
  *  [JsonML]: http://jsonml.org/ "JSON Markup Language"
  **/
	var Markdown = expose.Markdown = function (dialect) {
		switch (typeof dialect) {
			case "undefined":
				this.dialect = Markdown.dialects.Gruber;
				break;
			case "object":
				this.dialect = dialect;
				break;
			default:
				if (dialect in Markdown.dialects) {
					this.dialect = Markdown.dialects[dialect];
				} else {
					throw new Error("Unknown Markdown dialect '" + String(dialect) + "'");
				}
				break;
		}
		this.em_state = [];
		this.strong_state = [];
		this.debug_indent = "";
	};

	/**
  *  parse( markdown, [dialect] ) -> JsonML
  *  - markdown (String): markdown string to parse
  *  - dialect (String | Dialect): the dialect to use, defaults to gruber
  *
  *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.
  **/
	expose.parse = function (source, dialect) {
		// dialect will default if undefined
		var md = new Markdown(dialect);
		return md.toTree(source);
	};

	/**
  *  toHTML( markdown, [dialect]  ) -> String
  *  toHTML( md_tree ) -> String
  *  - markdown (String): markdown string to parse
  *  - md_tree (Markdown.JsonML): parsed markdown tree
  *
  *  Take markdown (either as a string or as a JsonML tree) and run it through
  *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.
  **/
	expose.toHTML = function toHTML(source, dialect, options) {
		var input = expose.toHTMLTree(source, dialect, options);

		return expose.renderJsonML(input);
	};

	/**
  *  toHTMLTree( markdown, [dialect] ) -> JsonML
  *  toHTMLTree( md_tree ) -> JsonML
  *  - markdown (String): markdown string to parse
  *  - dialect (String | Dialect): the dialect to use, defaults to gruber
  *  - md_tree (Markdown.JsonML): parsed markdown tree
  *
  *  Turn markdown into HTML, represented as a JsonML tree. If a string is given
  *  to this function, it is first parsed into a markdown tree by calling
  *  [[parse]].
  **/
	expose.toHTMLTree = function toHTMLTree(input, dialect, options) {
		// convert string input to an MD tree
		if (typeof input === "string") input = this.parse(input, dialect);

		// Now convert the MD tree to an HTML tree

		// remove references from the tree
		var attrs = extract_attr(input),
		    refs = {};

		if (attrs && attrs.references) {
			refs = attrs.references;
		}

		var html = convert_tree_to_html(input, refs, options);
		merge_text_nodes(html);
		return html;
	};

	// For Spidermonkey based engines
	function mk_block_toSource() {
		return "Markdown.mk_block( " + uneval(this.toString()) + ", " + uneval(this.trailing) + ", " + uneval(this.lineNumber) + " )";
	}

	// node
	function mk_block_inspect() {
		var util = require("util");
		return "Markdown.mk_block( " + util.inspect(this.toString()) + ", " + util.inspect(this.trailing) + ", " + util.inspect(this.lineNumber) + " )";
	}

	var mk_block = Markdown.mk_block = function (block, trail, line) {
		// Be helpful for default case in tests.
		if (arguments.length == 1) trail = "\n\n";

		var s = new String(block);
		s.trailing = trail;
		// To make it clear its not just a string
		s.inspect = mk_block_inspect;
		s.toSource = mk_block_toSource;

		if (line != undefined) s.lineNumber = line;

		return s;
	};

	function count_lines(str) {
		var n = 0,
		    i = -1;
		while ((i = str.indexOf("\n", i + 1)) !== -1) n++;
		return n;
	}

	// Internal - split source into rough blocks
	Markdown.prototype.split_blocks = function splitBlocks(input, startLine) {
		input = input.replace(/(\r\n|\n|\r)/g, "\n");
		// [\s\S] matches _anything_ (newline or space)
		// [^] is equivalent but doesn't work in IEs.
		var re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
		    blocks = [],
		    m;

		var line_no = 1;

		if ((m = /^(\s*\n)/.exec(input)) != null) {
			// skip (but count) leading blank lines
			line_no += count_lines(m[0]);
			re.lastIndex = m[0].length;
		}

		while ((m = re.exec(input)) !== null) {
			if (m[2] == "\n#") {
				m[2] = "\n";
				re.lastIndex--;
			}
			blocks.push(mk_block(m[1], m[2], line_no));
			line_no += count_lines(m[0]);
		}

		return blocks;
	};

	/**
  *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]
  *  - block (String): the block to process
  *  - next (Array): the following blocks
  *
  * Process `block` and return an array of JsonML nodes representing `block`.
  *
  * It does this by asking each block level function in the dialect to process
  * the block until one can. Succesful handling is indicated by returning an
  * array (with zero or more JsonML nodes), failure by a false value.
  *
  * Blocks handlers are responsible for calling [[Markdown#processInline]]
  * themselves as appropriate.
  *
  * If the blocks were split incorrectly or adjacent blocks need collapsing you
  * can adjust `next` in place using shift/splice etc.
  *
  * If any of this default behaviour is not right for the dialect, you can
  * define a `__call__` method on the dialect that will get invoked to handle
  * the block processing.
  */
	Markdown.prototype.processBlock = function processBlock(block, next) {
		var cbs = this.dialect.block,
		    ord = cbs.__order__;

		if ("__call__" in cbs) {
			return cbs.__call__.call(this, block, next);
		}

		for (var i = 0; i < ord.length; i++) {
			//D:this.debug( "Testing", ord[i] );
			var res = cbs[ord[i]].call(this, block, next);
			if (res) {
				//D:this.debug("  matched");
				if (!isArray(res) || res.length > 0 && !isArray(res[0])) this.debug(ord[i], "didn't return a proper array");
				//D:this.debug( "" );
				return res;
			}
		}

		// Uhoh! no match! Should we throw an error?
		return [];
	};

	Markdown.prototype.processInline = function processInline(block) {
		return this.dialect.inline.__call__.call(this, String(block));
	};

	/**
  *  Markdown#toTree( source ) -> JsonML
  *  - source (String): markdown source to parse
  *
  *  Parse `source` into a JsonML tree representing the markdown document.
  **/
	// custom_tree means set this.tree to `custom_tree` and restore old value on return
	Markdown.prototype.toTree = function toTree(source, custom_root) {
		var blocks = source instanceof Array ? source : this.split_blocks(source);

		// Make tree a member variable so its easier to mess with in extensions
		var old_tree = this.tree;
		try {
			this.tree = custom_root || this.tree || ["markdown"];

			blocks: while (blocks.length) {
				var b = this.processBlock(blocks.shift(), blocks);

				// Reference blocks and the like won't return any content
				if (!b.length) continue blocks;

				this.tree.push.apply(this.tree, b);
			}
			return this.tree;
		} finally {
			if (custom_root) {
				this.tree = old_tree;
			}
		}
	};

	// Noop by default
	Markdown.prototype.debug = function () {
		var args = Array.prototype.slice.call(arguments);
		args.unshift(this.debug_indent);
		if (typeof print !== "undefined") print.apply(print, args);
		if (typeof console !== "undefined" && typeof console.log !== "undefined") console.log.apply(null, args);
	};

	Markdown.prototype.loop_re_over_block = function (re, block, cb) {
		// Dont use /g regexps with this
		var m,
		    b = block.valueOf();

		while (b.length && (m = re.exec(b)) != null) {
			b = b.substr(m[0].length);
			cb.call(this, m);
		}
		return b;
	};

	/**
  * Markdown.dialects
  *
  * Namespace of built-in dialects.
  **/
	Markdown.dialects = {};

	/**
  * Markdown.dialects.Gruber
  *
  * The default dialect that follows the rules set out by John Gruber's
  * markdown.pl as closely as possible. Well actually we follow the behaviour of
  * that script which in some places is not exactly what the syntax web page
  * says.
  **/
	Markdown.dialects.Gruber = {
		block: {
			atxHeader: function atxHeader(block, next) {
				var m = block.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);

				if (!m) return undefined;

				var header = ["header", { level: m[1].length }];
				Array.prototype.push.apply(header, this.processInline(m[2]));

				if (m[0].length < block.length) next.unshift(mk_block(block.substr(m[0].length), block.trailing, block.lineNumber + 2));

				return [header];
			},

			setextHeader: function setextHeader(block, next) {
				var m = block.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);

				if (!m) return undefined;

				var level = m[2] === "=" ? 1 : 2;
				var header = ["header", { level: level }, m[1]];

				if (m[0].length < block.length) next.unshift(mk_block(block.substr(m[0].length), block.trailing, block.lineNumber + 2));

				return [header];
			},

			code: function code(block, next) {
				// |    Foo
				// |bar
				// should be a code block followed by a paragraph. Fun
				//
				// There might also be adjacent code block to merge.

				var ret = [],
				    re = /^(?: {0,3}\t| {4})(.*)\n?/,
				    lines;

				// 4 spaces + content
				if (!block.match(re)) return undefined;

				block_search: do {
					// Now pull out the rest of the lines
					var b = this.loop_re_over_block(re, block.valueOf(), function (m) {
						ret.push(m[1]);
					});

					if (b.length) {
						// Case alluded to in first comment. push it back on as a new block
						next.unshift(mk_block(b, block.trailing));
						break block_search;
					} else if (next.length) {
						// Check the next block - it might be code too
						if (!next[0].match(re)) break block_search;

						// Pull how how many blanks lines follow - minus two to account for .join
						ret.push(block.trailing.replace(/[^\n]/g, "").substring(2));

						block = next.shift();
					} else {
						break block_search;
					}
				} while (true);

				return [["code_block", ret.join("\n")]];
			},

			horizRule: function horizRule(block, next) {
				// this needs to find any hr in the block to handle abutting blocks
				var m = block.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);

				if (!m) {
					return undefined;
				}

				var jsonml = [["hr"]];

				// if there's a leading abutting block, process it
				if (m[1]) {
					jsonml.unshift.apply(jsonml, this.processBlock(m[1], []));
				}

				// if there's a trailing abutting block, stick it into next
				if (m[3]) {
					next.unshift(mk_block(m[3]));
				}

				return jsonml;
			},

			// There are two types of lists. Tight and loose. Tight lists have no whitespace
			// between the items (and result in text just in the <li>) and loose lists,
			// which have an empty line between list items, resulting in (one or more)
			// paragraphs inside the <li>.
			//
			// There are all sorts weird edge cases about the original markdown.pl's
			// handling of lists:
			//
			// * Nested lists are supposed to be indented by four chars per level. But
			//   if they aren't, you can get a nested list by indenting by less than
			//   four so long as the indent doesn't match an indent of an existing list
			//   item in the 'nest stack'.
			//
			// * The type of the list (bullet or number) is controlled just by the
			//    first item at the indent. Subsequent changes are ignored unless they
			//    are for nested lists
			//
			lists: (function () {
				// Use a closure to hide a few variables.
				var any_list = "[*+-]|\\d+\\.",
				    bullet_list = /[*+-]/,
				    number_list = /\d+\./,
				   
				// Capture leading indent as it matters for determining nested lists.
				is_list_re = new RegExp("^( {0,3})(" + any_list + ")[ \t]+"),
				    indent_re = "(?: {0,3}\\t| {4})";

				// TODO: Cache this regexp for certain depths.
				// Create a regexp suitable for matching an li for a given stack depth
				function regex_for_depth(depth) {

					return new RegExp(
					// m[1] = indent, m[2] = list_type
					"(?:^(" + indent_re + "{0," + depth + "} {0,3})(" + any_list + ")\\s+)|" +
					// m[3] = cont
					"(^" + indent_re + "{0," + (depth - 1) + "}[ ]{0,4})");
				}

				function expand_tab(input) {
					return input.replace(/ {0,3}\t/g, "    ");
				}

				// Add inline content `inline` to `li`. inline comes from processInline
				// so is an array of content
				function add(li, loose, inline, nl) {
					if (loose) {
						li.push(["para"].concat(inline));
						return;
					}
					// Hmmm, should this be any block level element or just paras?
					var add_to = li[li.length - 1] instanceof Array && li[li.length - 1][0] == "para" ? li[li.length - 1] : li;

					// If there is already some content in this list, add the new line in
					if (nl && li.length > 1) inline.unshift(nl);

					for (var i = 0; i < inline.length; i++) {
						var what = inline[i],
						    is_str = typeof what == "string";
						if (is_str && add_to.length > 1 && typeof add_to[add_to.length - 1] == "string") {
							add_to[add_to.length - 1] += what;
						} else {
							add_to.push(what);
						}
					}
				}

				// contained means have an indent greater than the current one. On
				// *every* line in the block
				function get_contained_blocks(depth, blocks) {

					var re = new RegExp("^(" + indent_re + "{" + depth + "}.*?\\n?)*$"),
					    replace = new RegExp("^" + indent_re + "{" + depth + "}", "gm"),
					    ret = [];

					while (blocks.length > 0) {
						if (re.exec(blocks[0])) {
							var b = blocks.shift(),
							   
							// Now remove that indent
							x = b.replace(replace, "");

							ret.push(mk_block(x, b.trailing, b.lineNumber));
						} else {
							break;
						}
					}
					return ret;
				}

				// passed to stack.forEach to turn list items up the stack into paras
				function paragraphify(s, i, stack) {
					var list = s.list;
					var last_li = list[list.length - 1];

					if (last_li[1] instanceof Array && last_li[1][0] == "para") {
						return;
					}
					if (i + 1 == stack.length) {
						// Last stack frame
						// Keep the same array, but replace the contents
						last_li.push(["para"].concat(last_li.splice(1, last_li.length - 1)));
					} else {
						var sublist = last_li.pop();
						last_li.push(["para"].concat(last_li.splice(1, last_li.length - 1)), sublist);
					}
				}

				// The matcher function
				return function (block, next) {
					var m = block.match(is_list_re);
					if (!m) return undefined;

					function make_list(m) {
						var list = bullet_list.exec(m[2]) ? ["bulletlist"] : ["numberlist"];

						stack.push({ list: list, indent: m[1] });
						return list;
					}

					var stack = [],
					    // Stack of lists for nesting.
					list = make_list(m),
					    last_li,
					    loose = false,
					    ret = [stack[0].list],
					    i;

					// Loop to search over block looking for inner block elements and loose lists
					loose_search: while (true) {
						// Split into lines preserving new lines at end of line
						var lines = block.split(/(?=\n)/);

						// We have to grab all lines for a li and call processInline on them
						// once as there are some inline things that can span lines.
						var li_accumulate = "";

						// Loop over the lines in this block looking for tight lists.
						tight_search: for (var line_no = 0; line_no < lines.length; line_no++) {
							var nl = "",
							    l = lines[line_no].replace(/^\n/, function (n) {
								nl = n;
								return "";
							});

							// TODO: really should cache this
							var line_re = regex_for_depth(stack.length);

							m = l.match(line_re);
							//print( "line:", uneval(l), "\nline match:", uneval(m) );

							// We have a list item
							if (m[1] !== undefined) {
								// Process the previous list item, if any
								if (li_accumulate.length) {
									add(last_li, loose, this.processInline(li_accumulate), nl);
									// Loose mode will have been dealt with. Reset it
									loose = false;
									li_accumulate = "";
								}

								m[1] = expand_tab(m[1]);
								var wanted_depth = Math.floor(m[1].length / 4) + 1;
								//print( "want:", wanted_depth, "stack:", stack.length);
								if (wanted_depth > stack.length) {
									// Deep enough for a nested list outright
									//print ( "new nested list" );
									list = make_list(m);
									last_li.push(list);
									last_li = list[1] = ["listitem"];
								} else {
									// We aren't deep enough to be strictly a new level. This is
									// where Md.pl goes nuts. If the indent matches a level in the
									// stack, put it there, else put it one deeper then the
									// wanted_depth deserves.
									var found = false;
									for (i = 0; i < stack.length; i++) {
										if (stack[i].indent != m[1]) continue;
										list = stack[i].list;
										stack.splice(i + 1, stack.length - (i + 1));
										found = true;
										break;
									}

									if (!found) {
										//print("not found. l:", uneval(l));
										wanted_depth++;
										if (wanted_depth <= stack.length) {
											stack.splice(wanted_depth, stack.length - wanted_depth);
											//print("Desired depth now", wanted_depth, "stack:", stack.length);
											list = stack[wanted_depth - 1].list;
											//print("list:", uneval(list) );
										} else {
												//print ("made new stack for messy indent");
												list = make_list(m);
												last_li.push(list);
											}
									}

									//print( uneval(list), "last", list === stack[stack.length-1].list );
									last_li = ["listitem"];
									list.push(last_li);
								} // end depth of shenegains
								nl = "";
							}

							// Add content
							if (l.length > m[0].length) {
								li_accumulate += nl + l.substr(m[0].length);
							}
						} // tight_search

						if (li_accumulate.length) {
							add(last_li, loose, this.processInline(li_accumulate), nl);
							// Loose mode will have been dealt with. Reset it
							loose = false;
							li_accumulate = "";
						}

						// Look at the next block - we might have a loose list. Or an extra
						// paragraph for the current li
						var contained = get_contained_blocks(stack.length, next);

						// Deal with code blocks or properly nested lists
						if (contained.length > 0) {
							// Make sure all listitems up the stack are paragraphs
							forEach(stack, paragraphify, this);

							last_li.push.apply(last_li, this.toTree(contained, []));
						}

						var next_block = next[0] && next[0].valueOf() || "";

						if (next_block.match(is_list_re) || next_block.match(/^ /)) {
							block = next.shift();

							// Check for an HR following a list: features/lists/hr_abutting
							var hr = this.dialect.block.horizRule(block, next);

							if (hr) {
								ret.push.apply(ret, hr);
								break;
							}

							// Make sure all listitems up the stack are paragraphs
							forEach(stack, paragraphify, this);

							loose = true;
							continue loose_search;
						}
						break;
					} // loose_search

					return ret;
				};
			})(),

			blockquote: function blockquote(block, next) {
				if (!block.match(/^>/m)) return undefined;

				var jsonml = [];

				// separate out the leading abutting block, if any. I.e. in this case:
				//
				//  a
				//  > b
				//
				if (block[0] != ">") {
					var lines = block.split(/\n/),
					    prev = [],
					    line_no = block.lineNumber;

					// keep shifting lines until you find a crotchet
					while (lines.length && lines[0][0] != ">") {
						prev.push(lines.shift());
						line_no++;
					}

					var abutting = mk_block(prev.join("\n"), "\n", block.lineNumber);
					jsonml.push.apply(jsonml, this.processBlock(abutting, []));
					// reassemble new block of just block quotes!
					block = mk_block(lines.join("\n"), block.trailing, line_no);
				}

				// if the next block is also a blockquote merge it in
				while (next.length && next[0][0] == ">") {
					var b = next.shift();
					block = mk_block(block + block.trailing + b, b.trailing, block.lineNumber);
				}

				// Strip off the leading "> " and re-process as a block.
				var input = block.replace(/^> ?/gm, ""),
				    old_tree = this.tree,
				    processedBlock = this.toTree(input, ["blockquote"]),
				    attr = extract_attr(processedBlock);

				// If any link references were found get rid of them
				if (attr && attr.references) {
					delete attr.references;
					// And then remove the attribute object if it's empty
					if (isEmpty(attr)) {
						processedBlock.splice(1, 1);
					}
				}

				jsonml.push(processedBlock);
				return jsonml;
			},

			referenceDefn: function referenceDefn(block, next) {
				var re = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
				// interesting matches are [ , ref_id, url, , title, title ]

				if (!block.match(re)) return undefined;

				// make an attribute node if it doesn't exist
				if (!extract_attr(this.tree)) {
					this.tree.splice(1, 0, {});
				}

				var attrs = extract_attr(this.tree);

				// make a references hash if it doesn't exist
				if (attrs.references === undefined) {
					attrs.references = {};
				}

				var b = this.loop_re_over_block(re, block, function (m) {

					if (m[2] && m[2][0] == "<" && m[2][m[2].length - 1] == ">") m[2] = m[2].substring(1, m[2].length - 1);

					var ref = attrs.references[m[1].toLowerCase()] = {
						href: m[2]
					};

					if (m[4] !== undefined) ref.title = m[4];else if (m[5] !== undefined) ref.title = m[5];
				});

				if (b.length) next.unshift(mk_block(b, block.trailing));

				return [];
			},

			para: function para(block, next) {
				// everything's a para!
				return [["para"].concat(this.processInline(block))];
			}
		}
	};

	Markdown.dialects.Gruber.inline = {

		__oneElement__: function oneElement(text, patterns_or_re, previous_nodes) {
			var m,
			    res,
			    lastIndex = 0;

			patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
			var re = new RegExp("([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")");

			m = re.exec(text);
			if (!m) {
				// Just boring text
				return [text.length, text];
			} else if (m[1]) {
				// Some un-interesting text matched. Return that first
				return [m[1].length, m[1]];
			}

			var res;
			if (m[2] in this.dialect.inline) {
				res = this.dialect.inline[m[2]].call(this, text.substr(m.index), m, previous_nodes || []);
			}
			// Default for now to make dev easier. just slurp special and output it.
			res = res || [m[2].length, m[2]];
			return res;
		},

		__call__: function inline(text, patterns) {

			var out = [],
			    res;

			function add(x) {
				//D:self.debug("  adding output", uneval(x));
				if (typeof x == "string" && typeof out[out.length - 1] == "string") out[out.length - 1] += x;else out.push(x);
			}

			while (text.length > 0) {
				res = this.dialect.inline.__oneElement__.call(this, text, patterns, out);
				text = text.substr(res.shift());
				forEach(res, add);
			}

			return out;
		},

		// These characters are intersting elsewhere, so have rules for them so that
		// chunks of plain text blocks don't include them
		"]": function _() {},
		"}": function _() {},

		__escape__: /^\\[\\`\*_{}\[\]()#\+.!\-]/,

		"\\": function escaped(text) {
			// [ length of input processed, node/children to add... ]
			// Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
			if (this.dialect.inline.__escape__.exec(text)) return [2, text.charAt(1)];else
				// Not an esacpe
				return [1, "\\"];
		},

		"![": function image(text) {

			// Unlike images, alt text is plain text only. no other elements are
			// allowed in there

			// ![Alt text](/path/to/img.jpg "Optional title")
			//      1          2            3       4         <--- captures
			var m = text.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);

			if (m) {
				if (m[2] && m[2][0] == "<" && m[2][m[2].length - 1] == ">") m[2] = m[2].substring(1, m[2].length - 1);

				m[2] = this.dialect.inline.__call__.call(this, m[2], /\\/)[0];

				var attrs = { alt: m[1], href: m[2] || "" };
				if (m[4] !== undefined) attrs.title = m[4];

				return [m[0].length, ["img", attrs]];
			}

			// ![Alt text][id]
			m = text.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/);

			if (m) {
				// We can't check if the reference is known here as it likely wont be
				// found till after. Check it in md tree->hmtl tree conversion
				return [m[0].length, ["img_ref", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] }]];
			}

			// Just consume the '!['
			return [2, "!["];
		},

		"[": function link(text) {

			var orig = String(text);
			// Inline content is possible inside `link text`
			var res = Markdown.DialectHelpers.inline_until_char.call(this, text.substr(1), "]");

			// No closing ']' found. Just consume the [
			if (!res) return [1, "["];

			var consumed = 1 + res[0],
			    children = res[1],
			    link,
			    attrs;

			// At this point the first [...] has been parsed. See what follows to find
			// out which kind of link we are (reference or direct url)
			text = text.substr(consumed);

			// [link text](/path/to/img.jpg "Optional title")
			//                 1            2       3         <--- captures
			// This will capture up to the last paren in the block. We then pull
			// back based on if there a matching ones in the url
			//    ([here](/url/(test))
			// The parens have to be balanced
			var m = text.match(/^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);
			if (m) {
				var url = m[1];
				consumed += m[0].length;

				if (url && url[0] == "<" && url[url.length - 1] == ">") url = url.substring(1, url.length - 1);

				// If there is a title we don't have to worry about parens in the url
				if (!m[3]) {
					var open_parens = 1; // One open that isn't in the capture
					for (var len = 0; len < url.length; len++) {
						switch (url[len]) {
							case "(":
								open_parens++;
								break;
							case ")":
								if (--open_parens == 0) {
									consumed -= url.length - len;
									url = url.substring(0, len);
								}
								break;
						}
					}
				}

				// Process escapes only
				url = this.dialect.inline.__call__.call(this, url, /\\/)[0];

				attrs = { href: url || "" };
				if (m[3] !== undefined) attrs.title = m[3];

				link = ["link", attrs].concat(children);
				return [consumed, link];
			}

			// [Alt text][id]
			// [Alt text] [id]
			m = text.match(/^\s*\[(.*?)\]/);

			if (m) {

				consumed += m[0].length;

				// [links][] uses links as its reference
				attrs = { ref: (m[1] || String(children)).toLowerCase(), original: orig.substr(0, consumed) };

				link = ["link_ref", attrs].concat(children);

				// We can't check if the reference is known here as it likely wont be
				// found till after. Check it in md tree->hmtl tree conversion.
				// Store the original so that conversion can revert if the ref isn't found.
				return [consumed, link];
			}

			// [id]
			// Only if id is plain (no formatting.)
			if (children.length == 1 && typeof children[0] == "string") {

				attrs = { ref: children[0].toLowerCase(), original: orig.substr(0, consumed) };
				link = ["link_ref", attrs, children[0]];
				return [consumed, link];
			}

			// Just consume the "["
			return [1, "["];
		},

		"<": function autoLink(text) {
			var m;

			if ((m = text.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/)) != null) {
				if (m[3]) {
					return [m[0].length, ["link", { href: "mailto:" + m[3] }, m[3]]];
				} else if (m[2] == "mailto") {
					return [m[0].length, ["link", { href: m[1] }, m[1].substr("mailto:".length)]];
				} else return [m[0].length, ["link", { href: m[1] }, m[1]]];
			}

			return [1, "<"];
		},

		"`": function inlineCode(text) {
			// Inline code block. as many backticks as you like to start it
			// Always skip over the opening ticks.
			var m = text.match(/(`+)(([\s\S]*?)\1)/);

			if (m && m[2]) return [m[1].length + m[2].length, ["inlinecode", m[3]]];else {
				// TODO: No matching end code found - warn!
				return [1, "`"];
			}
		},

		"  \n": function lineBreak(text) {
			return [3, ["linebreak"]];
		}

	};

	// Meta Helper/generator method for em and strong handling
	function strong_em(tag, md) {

		var state_slot = tag + "_state",
		    other_slot = tag == "strong" ? "em_state" : "strong_state";

		function CloseTag(len) {
			this.len_after = len;
			this.name = "close_" + md;
		}

		return function (text, orig_match) {

			if (this[state_slot][0] == md) {
				// Most recent em is of this type
				//D:this.debug("closing", md);
				this[state_slot].shift();

				// "Consume" everything to go back to the recrusion in the else-block below
				return [text.length, new CloseTag(text.length - md.length)];
			} else {
				// Store a clone of the em/strong states
				var other = this[other_slot].slice(),
				    state = this[state_slot].slice();

				this[state_slot].unshift(md);

				//D:this.debug_indent += "  ";

				// Recurse
				var res = this.processInline(text.substr(md.length));
				//D:this.debug_indent = this.debug_indent.substr(2);

				var last = res[res.length - 1];

				//D:this.debug("processInline from", tag + ": ", uneval( res ) );

				var check = this[state_slot].shift();
				if (last instanceof CloseTag) {
					res.pop();
					// We matched! Huzzah.
					var consumed = text.length - last.len_after;
					return [consumed, [tag].concat(res)];
				} else {
					// Restore the state of the other kind. We might have mistakenly closed it.
					this[other_slot] = other;
					this[state_slot] = state;

					// We can't reuse the processed result as it could have wrong parsing contexts in it.
					return [md.length, md];
				}
			}
		}; // End returned function
	}

	Markdown.dialects.Gruber.inline["**"] = strong_em("strong", "**");
	Markdown.dialects.Gruber.inline["__"] = strong_em("strong", "__");
	Markdown.dialects.Gruber.inline["*"] = strong_em("em", "*");
	Markdown.dialects.Gruber.inline["_"] = strong_em("em", "_");

	// Build default order from insertion order.
	Markdown.buildBlockOrder = function (d) {
		var ord = [];
		for (var i in d) {
			if (i == "__order__" || i == "__call__") continue;
			ord.push(i);
		}
		d.__order__ = ord;
	};

	// Build patterns for inline matcher
	Markdown.buildInlinePatterns = function (d) {
		var patterns = [];

		for (var i in d) {
			// __foo__ is reserved and not a pattern
			if (i.match(/^__.*__$/)) continue;
			var l = i.replace(/([\\.*+?|()\[\]{}])/g, "\\$1").replace(/\n/, "\\n");
			patterns.push(i.length == 1 ? l : "(?:" + l + ")");
		}

		patterns = patterns.join("|");
		d.__patterns__ = patterns;
		//print("patterns:", uneval( patterns ) );

		var fn = d.__call__;
		d.__call__ = function (text, pattern) {
			if (pattern != undefined) {
				return fn.call(this, text, pattern);
			} else {
				return fn.call(this, text, patterns);
			}
		};
	};

	Markdown.DialectHelpers = {};
	Markdown.DialectHelpers.inline_until_char = function (text, want) {
		var consumed = 0,
		    nodes = [];

		while (true) {
			if (text.charAt(consumed) == want) {
				// Found the character we were looking for
				consumed++;
				return [consumed, nodes];
			}

			if (consumed >= text.length) {
				// No closing char found. Abort.
				return null;
			}

			var res = this.dialect.inline.__oneElement__.call(this, text.substr(consumed));
			consumed += res[0];
			// Add any returned nodes.
			nodes.push.apply(nodes, res.slice(1));
		}
	};

	// Helper function to make sub-classing a dialect easier
	Markdown.subclassDialect = function (d) {
		function Block() {}

		Block.prototype = d.block;
		function Inline() {}

		Inline.prototype = d.inline;

		return { block: new Block(), inline: new Inline() };
	};

	Markdown.buildBlockOrder(Markdown.dialects.Gruber.block);
	Markdown.buildInlinePatterns(Markdown.dialects.Gruber.inline);

	Markdown.dialects.Maruku = Markdown.subclassDialect(Markdown.dialects.Gruber);

	Markdown.dialects.Maruku.processMetaHash = function processMetaHash(meta_string) {
		var meta = split_meta_hash(meta_string),
		    attr = {};

		for (var i = 0; i < meta.length; ++i) {
			// id: #foo
			if (/^#/.test(meta[i])) {
				attr.id = meta[i].substring(1);
			}
			// class: .foo
			else if (/^\./.test(meta[i])) {
					// if class already exists, append the new one
					if (attr["class"]) {
						attr["class"] = attr["class"] + meta[i].replace(/./, " ");
					} else {
						attr["class"] = meta[i].substring(1);
					}
				}
				// attribute: foo=bar
				else if (/\=/.test(meta[i])) {
						var s = meta[i].split(/\=/);
						attr[s[0]] = s[1];
					}
		}

		return attr;
	};

	function split_meta_hash(meta_string) {
		var meta = meta_string.split(""),
		    parts = [""],
		    in_quotes = false;

		while (meta.length) {
			var letter = meta.shift();
			switch (letter) {
				case " ":
					// if we're in a quoted section, keep it
					if (in_quotes) {
						parts[parts.length - 1] += letter;
					}
					// otherwise make a new part
					else {
							parts.push("");
						}
					break;
				case "'":
				case '"':
					// reverse the quotes and move straight on
					in_quotes = !in_quotes;
					break;
				case "\\":
					// shift off the next letter to be used straight away.
					// it was escaped so we'll keep it whatever it is
					letter = meta.shift();
				default:
					parts[parts.length - 1] += letter;
					break;
			}
		}

		return parts;
	}

	Markdown.dialects.Maruku.block.document_meta = function document_meta(block, next) {
		// we're only interested in the first block
		if (block.lineNumber > 1) return undefined;

		// document_meta blocks consist of one or more lines of `Key: Value\n`
		if (!block.match(/^(?:\w+:.*\n)*\w+:.*$/)) return undefined;

		// make an attribute node if it doesn't exist
		if (!extract_attr(this.tree)) {
			this.tree.splice(1, 0, {});
		}

		var pairs = block.split(/\n/);
		for (var p in pairs) {
			var m = pairs[p].match(/(\w+):\s*(.*)$/),
			    key = m[1].toLowerCase(),
			    value = m[2];

			this.tree[1][key] = value;
		}

		// document_meta produces no content!
		return [];
	};

	Markdown.dialects.Maruku.block.block_meta = function block_meta(block, next) {
		// check if the last line of the block is an meta hash
		var m = block.match(/(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/);
		if (!m) return undefined;

		// process the meta hash
		var attr = this.dialect.processMetaHash(m[2]);

		var hash;

		// if we matched ^ then we need to apply meta to the previous block
		if (m[1] === "") {
			var node = this.tree[this.tree.length - 1];
			hash = extract_attr(node);

			// if the node is a string (rather than JsonML), bail
			if (typeof node === "string") return undefined;

			// create the attribute hash if it doesn't exist
			if (!hash) {
				hash = {};
				node.splice(1, 0, hash);
			}

			// add the attributes in
			for (var a in attr) {
				hash[a] = attr[a];
			}

			// return nothing so the meta hash is removed
			return [];
		}

		// pull the meta hash off the block and process what's left
		var b = block.replace(/\n.*$/, ""),
		    result = this.processBlock(b, []);

		// get or make the attributes hash
		hash = extract_attr(result[0]);
		if (!hash) {
			hash = {};
			result[0].splice(1, 0, hash);
		}

		// attach the attributes to the block
		for (var a in attr) {
			hash[a] = attr[a];
		}

		return result;
	};

	Markdown.dialects.Maruku.block.definition_list = function definition_list(block, next) {
		// one or more terms followed by one or more definitions, in a single block
		var tight = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
		    list = ["dl"],
		    i,
		    m;

		// see if we're dealing with a tight or loose block
		if (m = block.match(tight)) {
			// pull subsequent tight DL blocks out of `next`
			var blocks = [block];
			while (next.length && tight.exec(next[0])) {
				blocks.push(next.shift());
			}

			for (var b = 0; b < blocks.length; ++b) {
				var m = blocks[b].match(tight),
				    terms = m[1].replace(/\n$/, "").split(/\n/),
				    defns = m[2].split(/\n:\s+/);

				// print( uneval( m ) );

				for (i = 0; i < terms.length; ++i) {
					list.push(["dt", terms[i]]);
				}

				for (i = 0; i < defns.length; ++i) {
					// run inline processing over the definition
					list.push(["dd"].concat(this.processInline(defns[i].replace(/(\n)\s+/, "$1"))));
				}
			}
		} else {
			return undefined;
		}

		return [list];
	};

	// splits on unescaped instances of @ch. If @ch is not a character the result
	// can be unpredictable

	Markdown.dialects.Maruku.block.table = function table(block, next) {

		var _split_on_unescaped = function _split_on_unescaped(s, ch) {
			ch = ch || '\\s';
			if (ch.match(/^[\\|\[\]{}?*.+^$]$/)) {
				ch = '\\' + ch;
			}
			var res = [],
			    r = new RegExp('^((?:\\\\.|[^\\\\' + ch + '])*)' + ch + '(.*)'),
			    m;
			while (m = s.match(r)) {
				res.push(m[1]);
				s = m[2];
			}
			res.push(s);
			return res;
		};

		var leading_pipe = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,
		   
		// find at least an unescaped pipe in each line
		no_leading_pipe = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/,
		    i,
		    m;
		if (m = block.match(leading_pipe)) {
			// remove leading pipes in contents
			// (header and horizontal rule already have the leading pipe left out)
			m[3] = m[3].replace(/^\s*\|/gm, '');
		} else if (!(m = block.match(no_leading_pipe))) {
			return undefined;
		}

		var table = ["table", ["thead", ["tr"]], ["tbody"]];

		// remove trailing pipes, then split on pipes
		// (no escaped pipes are allowed in horizontal rule)
		m[2] = m[2].replace(/\|\s*$/, '').split('|');

		// process alignment
		var html_attrs = [];
		forEach(m[2], function (s) {
			if (s.match(/^\s*-+:\s*$/)) html_attrs.push({ align: "right" });else if (s.match(/^\s*:-+\s*$/)) html_attrs.push({ align: "left" });else if (s.match(/^\s*:-+:\s*$/)) html_attrs.push({ align: "center" });else html_attrs.push({});
		});

		// now for the header, avoid escaped pipes
		m[1] = _split_on_unescaped(m[1].replace(/\|\s*$/, ''), '|');
		for (i = 0; i < m[1].length; i++) {
			table[1][1].push(['th', html_attrs[i] || {}].concat(this.processInline(m[1][i].trim())));
		}

		// now for body contents
		forEach(m[3].replace(/\|\s*$/mg, '').split('\n'), function (row) {
			var html_row = ['tr'];
			row = _split_on_unescaped(row, '|');
			for (i = 0; i < row.length; i++) {
				html_row.push(['td', html_attrs[i] || {}].concat(this.processInline(row[i].trim())));
			}
			table[2].push(html_row);
		}, this);

		return [table];
	};

	Markdown.dialects.Maruku.inline["{:"] = function inline_meta(text, matches, out) {
		if (!out.length) {
			return [2, "{:"];
		}

		// get the preceeding element
		var before = out[out.length - 1];

		if (typeof before === "string") {
			return [2, "{:"];
		}

		// match a meta hash
		var m = text.match(/^\{:\s*((?:\\\}|[^\}])*)\s*\}/);

		// no match, false alarm
		if (!m) {
			return [2, "{:"];
		}

		// attach the attributes to the preceeding element
		var meta = this.dialect.processMetaHash(m[1]),
		    attr = extract_attr(before);

		if (!attr) {
			attr = {};
			before.splice(1, 0, attr);
		}

		for (var k in meta) {
			attr[k] = meta[k];
		}

		// cut out the string and replace it with nothing
		return [m[0].length, ""];
	};

	Markdown.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/;

	Markdown.buildBlockOrder(Markdown.dialects.Maruku.block);
	Markdown.buildInlinePatterns(Markdown.dialects.Maruku.inline);

	var isArray = Array.isArray || function (obj) {
		return Object.prototype.toString.call(obj) == "[object Array]";
	};

	var forEach;
	// Don't mess with Array.prototype. Its not friendly
	if (Array.prototype.forEach) {
		forEach = function (arr, cb, thisp) {
			return arr.forEach(cb, thisp);
		};
	} else {
		forEach = function (arr, cb, thisp) {
			for (var i = 0; i < arr.length; i++) {
				cb.call(thisp || arr, arr[i], i, arr);
			}
		};
	}

	var isEmpty = function isEmpty(obj) {
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) {
				return false;
			}
		}

		return true;
	};

	function extract_attr(jsonml) {
		return isArray(jsonml) && jsonml.length > 1 && typeof jsonml[1] === "object" && !isArray(jsonml[1]) ? jsonml[1] : undefined;
	}

	/**
  *  renderJsonML( jsonml[, options] ) -> String
  *  - jsonml (Array): JsonML array to render to XML
  *  - options (Object): options
  *
  *  Converts the given JsonML into well-formed XML.
  *
  *  The options currently understood are:
  *
  *  - root (Boolean): wether or not the root node should be included in the
  *    output, or just its children. The default `false` is to not include the
  *    root itself.
  */
	expose.renderJsonML = function (jsonml, options) {
		options = options || {};
		// include the root element in the rendered output?
		options.root = options.root || false;

		var content = [];

		if (options.root) {
			content.push(render_tree(jsonml));
		} else {
			jsonml.shift(); // get rid of the tag
			if (jsonml.length && typeof jsonml[0] === "object" && !(jsonml[0] instanceof Array)) {
				jsonml.shift(); // get rid of the attributes
			}

			while (jsonml.length) {
				content.push(render_tree(jsonml.shift()));
			}
		}

		return content.join("\n\n");
	};

	function escapeHTML(text) {
		return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
	}

	function render_tree(jsonml) {
		// basic case
		if (typeof jsonml === "string") {
			return escapeHTML(jsonml);
		}

		var tag = jsonml.shift(),
		    attributes = {},
		    content = [];

		if (jsonml.length && typeof jsonml[0] === "object" && !(jsonml[0] instanceof Array)) {
			attributes = jsonml.shift();
		}

		while (jsonml.length) {
			content.push(render_tree(jsonml.shift()));
		}

		var tag_attrs = "";
		for (var a in attributes) {
			tag_attrs += " " + a + '="' + escapeHTML(attributes[a]) + '"';
		}

		// be careful about adding whitespace here for inline elements
		if (tag == "img" || tag == "br" || tag == "hr") {
			return "<" + tag + tag_attrs + "/>";
		} else {
			return "<" + tag + tag_attrs + ">" + content.join("") + "</" + tag + ">";
		}
	}

	function convert_tree_to_html(tree, references, options) {
		var i;
		options = options || {};

		// shallow clone
		var jsonml = tree.slice(0);

		if (typeof options.preprocessTreeNode === "function") {
			jsonml = options.preprocessTreeNode(jsonml, references);
		}

		// Clone attributes if they exist
		var attrs = extract_attr(jsonml);
		if (attrs) {
			jsonml[1] = {};
			for (i in attrs) {
				jsonml[1][i] = attrs[i];
			}
			attrs = jsonml[1];
		}

		// basic case
		if (typeof jsonml === "string") {
			return jsonml;
		}

		// convert this node
		switch (jsonml[0]) {
			case "header":
				jsonml[0] = "h" + jsonml[1].level;
				delete jsonml[1].level;
				break;
			case "bulletlist":
				jsonml[0] = "ul";
				break;
			case "numberlist":
				jsonml[0] = "ol";
				break;
			case "listitem":
				jsonml[0] = "li";
				break;
			case "para":
				jsonml[0] = "p";
				break;
			case "markdown":
				jsonml[0] = "html";
				if (attrs) delete attrs.references;
				break;
			case "code_block":
				jsonml[0] = "pre";
				i = attrs ? 2 : 1;
				var code = ["code"];
				code.push.apply(code, jsonml.splice(i, jsonml.length - i));
				jsonml[i] = code;
				break;
			case "inlinecode":
				jsonml[0] = "code";
				break;
			case "img":
				jsonml[1].src = jsonml[1].href;
				delete jsonml[1].href;
				break;
			case "linebreak":
				jsonml[0] = "br";
				break;
			case "link":
				jsonml[0] = "a";
				break;
			case "link_ref":
				jsonml[0] = "a";

				// grab this ref and clean up the attribute node
				var ref = references[attrs.ref];

				// if the reference exists, make the link
				if (ref) {
					delete attrs.ref;

					// add in the href and title, if present
					attrs.href = ref.href;
					if (ref.title) {
						attrs.title = ref.title;
					}

					// get rid of the unneeded original text
					delete attrs.original;
				}
				// the reference doesn't exist, so revert to plain text
				else {
						return attrs.original;
					}
				break;
			case "img_ref":
				jsonml[0] = "img";

				// grab this ref and clean up the attribute node
				var ref = references[attrs.ref];

				// if the reference exists, make the link
				if (ref) {
					delete attrs.ref;

					// add in the href and title, if present
					attrs.src = ref.href;
					if (ref.title) {
						attrs.title = ref.title;
					}

					// get rid of the unneeded original text
					delete attrs.original;
				}
				// the reference doesn't exist, so revert to plain text
				else {
						return attrs.original;
					}
				break;
		}

		// convert all the children
		i = 1;

		// deal with the attribute node, if it exists
		if (attrs) {
			// if there are keys, skip over it
			for (var key in jsonml[1]) {
				i = 2;
				break;
			}
			// if there aren't, remove it
			if (i === 1) {
				jsonml.splice(i, 1);
			}
		}

		for (; i < jsonml.length; ++i) {
			jsonml[i] = convert_tree_to_html(jsonml[i], references, options);
		}

		return jsonml;
	}

	// merges adjacent text nodes into a single node
	function merge_text_nodes(jsonml) {
		// skip the tag name and attribute hash
		var i = extract_attr(jsonml) ? 2 : 1;

		while (i < jsonml.length) {
			// if it's a string check the next item too
			if (typeof jsonml[i] === "string") {
				if (i + 1 < jsonml.length && typeof jsonml[i + 1] === "string") {
					// merge the second string into the first and remove it
					jsonml[i] += jsonml.splice(i + 1, 1)[0];
				} else {
					++i;
				}
			}
			// if it's not a string recurse
			else {
					merge_text_nodes(jsonml[i]);
					++i;
				}
		}
	}
})((function () {
	if (typeof exports === "undefined") {
		window.markdown = {};
		return window.markdown;
	} else {
		return exports;
	}
})());

var cj = {
	APP: null,
	EXTERNAL: null,
	// utils
	DOM: null,
	events: {},
	OOP: {},
	XML: {},
	// maratl
	acceptor: null,
	maratl: null,
	XMLRequest: null,
	phoneCapacity: null,
	// helpers
	commission: {},
	configParser: null,
	favs: {},
	mask: {},
	session: null,
	stat: null,
	timeout: null,
	// views
	views: {},
	sinap: null,
	layouts: {
		_markup: {}
	},
	layoutManager: null
};
cj.sinap = {
	Request: null,
	Form: null,

	Container: null,
	receipt: {},
	terms: {},
	miscInfo: {},

	elements: {
		fields: {}
	},
	conditions: {},
	validators: {},
	predicates: {},
	widgets: {},
	pages: {},

	semantics: {
		lastName: 'LastName',
		firstName: 'FirstName',
		middleName: 'MiddleName',
		birthDate: 'BirthDate',
		email: 'Email'
	},

	layouts: {
		NONE: 'None',
		WELCOME: 'Welcome',
		INFO: 'Info',
		NUMERIC: 'Numeric',
		BUTTONS: 'Buttons',
		LIST: 'List',
		QWERTY: 'Qwerty',
		MULTI_ACCOUNT: 'MultiAccount',
		FULL_DATE: 'FullDate',
		EXPIRATION_DATE: 'ExpirationDate',
		MULTI: 'MultiField'
	}
};
var K = null;
var S = null;

cj.bodyClick = function () {
	if (cj.timeout.clickResetEnabled) cj.timeout.reset();
};
var K = {
	NAV: {
		CHECKSTATUS: 'CheckStatus',
		CALCULATOR: 'Calculator',
		OFERTA_SELECTION: 'OffertusSelection',
		OFERTA: 'Offertus',
		PHONE: 'PhoneEnter',
		PIN: 'PinEnter',
		SUMM: 'SummEnter',
		CONFIRMATION: 'Confirmation',
		PAYMENT_OPTIONS: 'PaymentMethod',
		CHANGE_OPTIONS: 'ChangeOptions',
		PAY_SUMM_OPTIONS: 'PaySummOptions',
		CASH: 'CashPayment',
		BALANCE: 'BalancePayment',
		FORM: 'FormContainer',
		FAVOURITES: 'Favourites',
		SMS_CONFIRMATION: 'SmsConfirmation',
		PAY_NOT_CONFIRMED: 'PaymentNotConfirmed',
		EXIT: 'Exit',

		PREVIOUS: 'previousPage',
		NEXT: 'nextPage',
		EXIT_PAGE: 'exitPage',

		NONE: 'None'
	},
	MARATL: {
		NET: {
			SEND_MAIL: 'network.sendMail',
			REQUEST: 'network.proxy',
			RESPONSE: 'network.proxy'
		},
		REQ: {
			JSON: 'JSONCommands',

			TERMINAL_ID: 'GetTermID',
			TERMINAL_INFO: 'GetTermInfo',
			BALANCE: 'GetBalance',
			START_PARAM: 'GetStartParam',
			PRINTER_STATUS: 'GetPrtStatus',
			MAX_CASH_LIMIT: 'MaxCashLimit',
			MIN_CASH_LIMIT: 'MinCashLimit',
			PROVIDER_BY_PHONE: 'getProviderByPhone',
			CURRENT_PAYMENT_DATA: 'GetCurrentPaymentData',
			PROVIDER_ALLOWED: 'PrvId',
			COMMISSION: 'GetCommis',
			COMMISSION_PROFILE: 'GetCommissionsInfo',
			COMMISSION_CHANGE_PROFILE: 'GetCommissionsInfo2',
			CHANGE_PROVIDER_ALLOWED: 'PrvId2',
			REVERSE_ROUNDED_SUMM: 'GetReverseRoundedSummFrom',
			REVERSE_COMMISSION: 'GetReverseCommissFrom',
			FORBIDDEN_BANKNOTES: 'system.getforbiddenbanknotes',
			DEFICIENT_AMOUNT: 'GetDeficientAmount',
			REVERSE_OPTIONS: {
				PROVIDER_ID: 'prvId',
				SUM: 'summ'
			},
			MAXSUM_BY_PROVIDER: 'GetMaxSummByPrv',

			SINAP: 'sinap.getqdproviders',
			SINAP_ONLINE: 'sinap.request'
		},
		RESP: {
			JSON: 'response',

			TERMINAL_ID: 'TermID',
			TERMINAL_INFO: 'TermInfo',
			BALANCE: 'Balance',
			START_PARAM: 'StartParam',
			PRINTER_STATUS: 'PrtStatus',

			MIN_CASH: 'MinCash',
			MAX_CASH: 'MaxCash',
			MIN_CASH_RESULT: 'MinCashResult',
			MAXSUM_BY_PROVIDER: 'GetMaxSummByPrv',

			PAY_SUMM: 'PaySumm',
			CHANGE_PAY_SUMM: 'PaySumm2',
			CASH_SUMM: 'CashSumm',
			COMMPROFILE: 'CommProfileLine',
			CHANGE_COMMPROFILE: 'CommProfileLine2',
			COMMISSION: 'CommisSumm',
			CHANGE_COMMISSION: 'CommisSumm2',
			CURRENT_PAYMENT_DATA: 'GetCurrentPaymentData',
			COIN_PROFILE: 'NominalCommProfile',
			COIN_COMMISSION: 'NominalCommissionInfo',

			PROVIDER_ALLOWED: 'PrvAllow',
			PROVIDER_DENIED: 'PrvDenied',
			ACCOUNT_DENIED: 'AccDenied',
			PROVIDER_BY_PHONE: 'getProviderByPhone',
			CHANGE_PROVIDER_ALLOWED: 'Prv2Allow',
			CHANGE_PROVIDER_DENIED: 'Prv2Denied',
			COMMISSION_PROFILE: 'CommissionsInfo',
			COMMISSION_CHANGE_PROFILE: 'CommissionsInfo2',
			REVERSE_COMMISSION: 'ReverseCommissFromResult',
			REVERSE_ROUNDED_SUMM: 'ReverseRoundedSummFromResult',
			DEIFICIENT_AMOUNT: 'DeficientAmount',

			VALIDATOR_ON: 'ValOn',
			VALIDATOR_OFF: 'ValOff',
			VALIDATOR_TIMEOUT: 'ValTimeout',
			VALIDATOR_ALERT: 'ValAlert',

			FISCAL: 'FiscalReceipt',
			SUCCESSFUL_PAY: 'PaySuccess',

			SINAP: 'sinap.QDProviders',
			SINAP_ONLINE: 'sinap.response'
		},
		SET: {
			VALIDATOR: 'Validator',
			CREATE_PAY: 'CreatePay',
			FAKE_EMBED_MODE: 'SetFakeEmbedMode',
			UNDERPAID_FLAG: '_extra_lk_underpaid'
		},
		QD_PAYMENT: {
			ACCOUNT: 'AccNum',
			PROVIDER_ID: 'PrvId',
			PROVIDER_NAME: 'PrvName',
			ACCOUNT_MASK: 'AccountMask',
			CHANGE_NUMBER: 'AccNum2',
			CHANGE_PROVIDER_ID: 'PrvId2',
			CHANGE_PROVIDER_NAME: 'PrvName2',
			CHANGE_ACCOUNT_MASK: 'AccountMask2',

			END_RECEIPT_DATA: 'PrintCheck',

			EXTRA: {
				SCODE: '_extra_ev_scode',
				GLUED_FIELDS: '_extra_ev_account0',
				COMMENT: '_extra_comment',
				TERMINAL_ID: '_extra_ev_trm_id',
				SUM: '_extra_fixed_int_summ'
			}
		},
		DEPRECATED_STATISTICS: {
			PROJECT_NUMBER: '_extra_MGT_project_number',
			NO_PRINT: '_extra_no_print_check',
			FAKE_PROVIDER: '_extra_fake_provider',
			QD_ID: '_extra_MGT_qk_id',
			SUM: '_extra_MGT_sum'
		},
		STATISTICS: 'statistics.action'
	},
	CLICK: 'click',
	STAT: {
		TYPES: {
			INITIALIZATION: 'start',
			PAGE_SHOWN: 'show',
			ONLINE_ACTION: 'request',
			ERROR: 'error',
			PAGE_DATA: 'data',
			CLICK: 'click',
			NAVIGATE: 'navigate',
			VALIDATION: 'validation',
			POPUP_SHOWN: 'popup',
			MONEY_INSERTED: 'note',
			MONEY_PAYED: 'money',
			EXIT: 'exit',
			INTERNAL_ERROR: 'stat_error',
			EXCEPTION: 'exception',
			ACTION: 'action',
			UNKNOWN: 'undefined'
		},
		UNDEFINED_PAGE_DATA: 'undefined',
		INTERNAL_ERRORS: {
			INVALID_PAGE: 102,
			INVALID_TYPE: 103,
			UNDEFINED_TYPE: 104,
			INITIALIZATION: 180,
			POPUP: {
				UNDEFINED_TYPE: 110,
				INVALID_TYPE: 111
			},
			VALIDATION: {
				UNDEFINED_TYPE: 120,
				INVALID_RESULT_CODE: 121
			},
			ONLINE: {
				INVALID_TYPE: 130,
				UNDEFINED_RESULT_CODE: 131
			},
			CLICK: {
				UNDEFINED_TYPE: 140,
				INVALID_TYPE: 141,

				INVALID_BUTTON_TYPE: 143,
				UNDEFINED_BUTTON_TYPE: 142,
				UNDEFINED_SUGGEST_TYPE: 144
			},
			NAVIGATE: {
				UNDEFINED_TYPE: 150,
				INVALID_TYPE: 151
			},
			MONEY: {
				INVALID_DATA_INSERTED: 160,
				INVALID_DATA_PAYED: 161,
				CASH_NAN: 162,
				PROVIDER_NAN: 163,
				CHANGE_NAN: 164,
				INVALID_DATA_UNKNOWN: 165
			},
			EXIT: {
				UNDEFINED_EXIT_CODE: 170,
				INVALID_EXIT_CODE: 171
			},
			UNDEFINED_ERROR: 101
		},
		ERRORS: {
			JS: {
				ON: {
					PAY: 211,
					ONLINE: 212
				},
				SET: {
					NULL_TEXT: 223
				},
				XML: {
					NODE_NOT_FOUND: 231,
					INVALID: 233
				},
				OBJECT_NULL: {
					ASSIGN: 241,
					EACH: 242,
					MAP: 243,
					REDUCE: 244,
					FILTER: 245,
					CONTAINS: 246,
					BYPROP: 247,
					CONTAINS_STRING: 248
				},
				OBJECT: {
					EACH_FUNC: 251,
					MAP_FUNC: 252,
					REDUCE_FUNC: 253,
					FILTER_FUNC: 254,
					REDUCE_NULL_INIT: 255
				}
			},
			MARATL: {
				PROVIDER_DENIED: 313,
				NO_CONFIG_OBJECT: 314,
				NO_CONFIG_FILE: 315,
				NO_CONFIG_STORAGE: 316,
				PRINTER: 317
			},
			SINAP: {
				INIT: {
					NO_COMMAND: 411,
					NOT_JSON: 412,
					NO_CONFIG: 413,
					ID_MISMATCH: 414,
					PARSING: 415
				},
				ELEMENTS: {
					NO_FIELD: 420,
					RADIO_BUTTONS: 421,
					UNKNOWN_KEYBOARD: 422,
					UNKNOWN_WIDGET: 423,
					NO_CURRENT_FIELD: 424,
					MULTIFIELDS: 425
				},
				TERMS: {
					NO_TYPE: 430,
					INVALID_TYPE: 431,
					INVALID_TERM: 432,
					NO_QW: 433,
					NO_QD: 434,

					INVALID_MONEY: 441,
					INVALID_IDENTIFICATION: 442,
					INVALID_LIMIT: 443,
					INVALID_LIMITS: 444,
					INVALID_COMMISSION_RANGE: 445,
					INVALID_COMMISSIONS: 446,
					NO_CONSTRAINT_TYPE: 447,
					INVALID_CONSTRAINT_TYPE: 448,
					INVALID_CONSTRAINT_FIXED: 449
				},
				RECEIPT: {},
				PARSING: {
					NO_ELEMENT: 451,
					INVALID_DEPENDENCY: 452,
					NO_VALIDATOR: 453,
					INVALID_VALIDATOR: 454,
					NO_PREDICATE_TYPE: 455,
					INVALID_PREDICATE_TYPE: 456,
					INVALID_CONDITION_TYPE: 457,
					NO_WIDGET_TYPE: 458,
					INVALID_WIDGET_TYPE: 459
				}
			},
			USER: {
				BALANCE: {
					ONLINE: {
						FAIL: 611,
						TIMEOUT: 612,
						UNDEFINED: 613,
						CANCELLED: 614,
						INCORRECT: 615
					},
					USSD: {
						TIMEOUT: 641,
						UNDEFINED: 642,
						FAIL: 643,
						CANCELLED: 644,
						INCORRECT: 645
					},
					SMS: {
						TIMEOUT: 651,
						FAIL: 653,
						RESEND: {
							TIMEOUT: 656,
							FAIL: 658
						}
					}
				},
				CASH: {
					FAIL: 621,
					UNDEFINED: 623,
					INCORRECT: 625
				},
				FAVOURITES: {
					ERROR: 631
				},
				VALIDATIONS: {
					FAIL: 661
				},
				FORM: {
					FAIL: 671
				}
			}
		},
		SHOW: {
			MAIN: 'index',
			SECOND: 'main',
			CATEGORY: 'category',
			SEARCH: 'search',
			PAYMENT_DATA: 'input',
			PHONE_NUMBER: 'cellular',
			CHANGE: 'change',
			CHARITY: 'charity',
			CHARITY_PHONE: 'charity_phone_number',
			CONFIRM_ADD_PROVIDER: 'confirm_add_provider',
			// ..и много других, не используемых в этом ролике.
			// А дальше используемые:
			CHECK_STATUS: 'app_start',
			CALCULATOR: 'calculator',
			OFERTA_SELECT: 'oferta_select',
			OFERTA: 'oferta',
			PHONE: 'phone',
			PIN: 'pin',
			SUMM: 'summ',
			VALIDATION: 'validate',
			PAYMENT_METHOD: 'pay_method',
			PAY_SUM_OPTIONS: 'pay_summ_options',
			CHANGE_TYPE: 'change_type',
			FORM_CONTAINER: 'field',
			FAVOURITES: 'favourites',
			PAYMENT_CASH: 'pay',
			PAYMENT_BALANCE: 'pay_balance',
			SMS_CONFIRMATION: 'sms',
			PAYMENT_NOT_CONFIRMED: 'pay_not_confirmed',
			STATISTICS: 'exit',

			INVALID: 'invalid'
		},
		VALIDATION: {
			UNDEFINED: 101,
			USER: {
				PHONE: {
					NUMBER: 221
				},
				PIN: {
					NUMBER: 231,
					RESTORE: 232
				}
			},
			PAY: {
				BALANCE: {
					WITHOUT_USSD: 311,
					WITH_USSD: 312
				},
				CASH: {
					CREATE: 321,
					SUCCESS: 322
				}
			}
		},
		CLICK: {
			TYPES: {
				BUTTON: 'button',
				SUGGEST: 'suggest'
			},
			BUTTON: {
				ERASE: 'erase',
				ERASE_ALL: 'erase_all',

				RESTORE_PIN: 'restore_pin',
				RESEND_SMS: 'resend_sms',
				CHANGE_PIN: 'change_pin',
				INFO: 'info',

				NEXT_LIST: 'next_list',
				PREVIOUS_LIST: 'prev_list',
				POPUP: {
					OK: 'popup_ok',
					YES: 'popup_yes',
					NO: 'popup_no'
				},
				UNDEFINED: 'undefined'
			}
		},
		NAVIGATE: {
			NEXT: 'next',
			PREVIOUS: 'prev',
			EXIT: 'exit',
			WELCOME: {
				CALCULATOR: 'calculator',
				OFERTA: 'oferta',
				ALREADY_PAID: 'paid'
			},
			PAYMENT: {
				CASH: 'cash',
				BALANCE: 'balance'
			},
			CHANGE: {
				WALLET: 'wallet',
				BANK: 'bank',
				MOBILE: 'mobile'
			},
			UNDEFINED: 'undefined'
		},
		POPUP: {
			INFO: 'info',
			QUESTION: 'question',
			ERROR: 'error',
			ADVERTISEMENT: 'ad',
			UNDEFINED: 'undefined'
		},
		EXIT: {
			REGULAR: 'user',
			TIMEOUT: 'timeout',
			EXCEPTION: 'exception',
			PASSPORT: 'identification',
			FAVOURITES: 'favourites',
			UNDEFINED: 'undefined'
		}
	},
	SESSION: {
		CONFIG: 'config',
		FORM: 'form',
		IDENTIFICATION: 'ident_xml',
		FAVOURITE_SELECTED: 'selected_fav',
		FAVOURITE_CHANGING: 'fav_to_change',
		FAVOURITE_ADDING: 'fav_adding',
		FAVOURITE_CONFIRMATION: 'fav_confirmation',
		SINAP_RECEIPT: 'sinap.receipt',
		INITIAL_FORM: 'initial_form_flag',

		TERMINAL: {
			ID: 'TermID',
			BALANCE: 'TermBalance',
			PRINTER_STATUS: 'PrtStatus',
			MAX_SUM: 'max_pay_amount',
			SUPPORT_PHONE: 'general_phone'
		},
		PROVIDER: {
			NAME: 'PrvName', // не менять, статика в конфиге
			CONFIG_QD_ID: 'storageID',
			QD_ID: 'PrvId', // не менять, статика в конфиге
			QW_ID: 'qkPrvId',
			MAX_SUM: 'max_summ_by_prv'
		},
		CHANGE_PROVIDER: {
			ID: 'PrvId2',
			NAME: 'PrvName2'
		},
		USER: {
			PHONE: {
				NUMBER: 'phone',
				PROVIDER: 'phone_prvId',
				PIN: 'pin'
			},
			WALLET_BALANCE: 'wallet_balance',
			CARD_EMITENT: 'vpp_emitent',
			FAVOURITE_LIST: 'FAVLIST_'
		},
		PAYMENT: {
			CHANGE_TYPE: 'change_option',
			METHOD: 'payment_method',

			QIWI_COMMISSION: 'qw_commission',
			AGENT_COMMISSION: 'agent_commission',
			TOTAL_COMMISSION: 'total_commission',
			CHANGE_COMMISSION: 'CommisSumm2',

			USER_SUM: 'summ',
			GROSS_SUM: 'gross_summ',
			TOTAL_SUM: 'final_summ',

			TOTAL_INSERTED: 'to_wallet',
			PROVIDER_SUM: 'to_provider',
			CHANGE_SUM: 'PaySumm2'
		},
		OFERTA: {
			LABEL: 'oferta_label',
			URL: 'oferta_url'
		},
		FAVOURITES_USED: 'go_to_favourites',

		OPERATION_TYPE: 'oper_type',

		SPECIAL_FORM_DIRECTION: 'form_direction',
		TRANSACTION_ID: 'transaction_id',
		PAYMENT_ID: 'payment_id'
	},
	PAYMENT: {
		CASH: 'cash',
		BALANCE: 'wallet'
	},
	CHANGE: {
		PHONE: 'phone',
		WALLET: 'wallet',
		BANK: 'bank'
	},
	FIELDS: {
		WELCOME: 'welcome',
		WELCOME_MAGIC: 'd2VsY29tZQ==',
		HIDDEN: 'hidden',

		ACCOUNT: 'account',
		SUM: 'sum',
		ACCOUNT_TYPE: 'account_type',
		OPERATION_TYPE: 'oper_type'
	},
	OPERATION_TYPES: {
		1: 'Пополнение счета',
		2: 'Погашение кредита',
		3: 'Пополнение карты'
	},
	VIEW: {
		WINDOW_STATE: {
			SHOW: 'show',
			HIDE: 'hide'
		}
	},
	RUB_CURRENCY_CODE: '643'
};
Promise.timeout = function (fn) {
	var interval = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	return new Promise(function (resolve) {
		return interval ? setTimeout(function () {
			return resolve(fn());
		}, interval) : resolve(fn());
	});
};
Promise.loop = function (fn) {
	return fn instanceof Array ? fn.forEach(function (f) {
		return Promise.loop(f);
	}) : (function loop() {
		return new Promise(fn).then(loop, function (reason) {
			return Promise.reject(reason);
		});
	})();
};
cj.nullOrUndefined = function () {
	for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
		rest[_key] = arguments[_key];
	}

	return rest.filter(function (item) {
		return item === null || item === undefined;
	}).length > 0;
};
cj.correctNumbers = function () {
	for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		rest[_key2] = arguments[_key2];
	}

	return rest.filter(function (num) {
		return isNaN(Number(num)) || Number(num) === Number.POSITIVE_INFINITY || Number(num) === Number.NEGATIVE_INFINITY;
	}).length === 0;
};
cj.round2 = function (num) {
	var to2 = function to2(num) {
		return Math.round(num * 100) / 100;
	};
	return num - to2(num) > 0.0049 ? to2(num + 0.01) : to2(num);
};
cj.unescape = function (string) {
	if (string === null) return '';
	var map = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#x2F;': '/' };
	return ('' + string).replace(new RegExp("(" + Object.keys(map).join('|') + ")", 'g'), function (match) {
		return map[match];
	});
};
cj.toSum = function (num) {
	num = Number(num);
	if (isNaN(num)) return 'NaN';
	var rounded = cj.round2(Math.abs(num));
	return (num >= 0 ? '' : '-') + Math.trunc(rounded).toString().split('').map(function (d, i, a) {
		return (a.length - i) % 3 === 0 && i !== 0 ? " " + d : d;
	}, '').join('') + (rounded.toString().split('.')[1] ? "." + (rounded.toString().split('.')[1] + '0').slice(0, 2) : '');
};
cj.DOM = {
	HIDDEN: 'hidden',
	DISABLED: 'disabled',

	classRegexp: function classRegexp(className, global) {
		return new RegExp('(\\s|^)' + className + '(\\s|$)', 'i' + (global ? 'g' : ''));
	},
	byId: function byId(selector) {
		return document.getElementById(selector);
	},
	create: function create(tag) {
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
		return options.reduce(function (elem, value, name) {
			switch (name) {
				case 'children':
					value.filter(function (a) {
						return a;
					}).forEach(function (child) {
						return elem.appendChild(child);
					});
					break;
				case 'text':
					elem.appendChild(document.createTextNode(value));
					break;
				default:
					elem.setAttribute(name, value);
			}
			return elem;
		}, document.createElement(tag));
	},
	hasClass: function hasClass(element, className) {
		return element && element.className && this.classRegexp(className, false).test(element.className);
	},
	addClass: function addClass(element, className) {
		if (element && !this.hasClass(element, className)) element.className = element.className ? element.className + " " + className : className;
		return element;
	},
	removeClass: function removeClass(element, className) {
		if (element && !className) {
			element.className = '';
			return element;
		}
		if (element && element.className) element.className = element.className.replace(this.classRegexp(className, true), '$1$2');
		return element;
	},
	show: function show(element) {
		this.removeClass(element, this.HIDDEN);
	},
	hide: function hide(element) {
		this.addClass(element, this.HIDDEN);
	},
	childrenByClass: function childrenByClass(element, className, first) {
		var _this = this;

		if (!element || !element.childNodes || !className) return [];
		return Array.prototype.slice.call(element.childNodes).filter(function (node) {
			return _this.hasClass(node, className);
		}).slice(0, first ? 1 : undefined);
	},
	firstChildByClass: function firstChildByClass(element, className) {
		return this.childrenByClass(element, className, true)[0];
	},
	findByClass: function findByClass(element, className) {
		if (!element || !className) return [];
		return Array.prototype.slice.call(element.querySelectorAll('.' + className));
	},
	firstChildByClassDeep: function firstChildByClassDeep(element, className) {
		return this.findByClass(element, className)[0];
	},

	//-- Sinaper specified work --//

	ELEMS: {
		$root: document.getElementById('main'),
		$header: document.getElementById('header'),
		$comment: document.getElementById('comment'),
		$subtitle: document.getElementById('subtitle')
	},
	subHeader: function subHeader(value) {
		if (!value) return this.ELEMS.$subtitle.innerHTML;
		return this.ELEMS.$subtitle.innerHTML = value || '';
	},
	header: function header() {
		var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

		this.ELEMS.$header.className = (value.length <= 30 ? 'big' : value.length <= 40 ? 'medium' : value.length <= 50 ? 'small' : 'tiny') + "-header-size";
		return this.ELEMS.$header.innerHTML = value;
	},
	headerComment: function headerComment() {
		var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

		this.ELEMS.$comment.className = (value.length <= 60 ? 'big' : value.length <= 80 ? 'medium' : 'small') + "-comment-size";
		return this.ELEMS.$comment.innerHTML = value;
	},
	addRootClass: function addRootClass() {
		var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
		this.addClass(this.ELEMS.$root, value);
	},
	removeAllRootClasses: function removeAllRootClasses() {
		this.removeClass(this.ELEMS.$root);
	}
};
Object.defineProperties(Object.prototype, {
	assign: {
		value: function assign() {
			var _this2 = this;

			if (cj.nullOrUndefined(this)) cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT_NULL.ASSIGN }, true);

			for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				rest[_key3] = arguments[_key3];
			}

			rest.forEach(function (obj) {
				if (obj) obj.forEach(function (item, key) {
					return _this2[key] = item;
				});
			});
			return this;
		}
	},

	forEach: {
		value: function forEach(callback, thisArg) {
			var _this3 = this;

			if (cj.nullOrUndefined(this)) cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT_NULL.EACH }, true);
			if (typeof callback !== 'function') cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT.EACH_FUNC }, true);
			Object.keys(this).forEach(function (key) {
				return callback.call(thisArg || _this3, _this3[key], key, _this3);
			});
			return this;
		}
	},

	map: {
		value: function map(callback, thisArg) {
			var _this4 = this;

			if (cj.nullOrUndefined(this)) cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT_NULL.MAP }, true);
			if (typeof callback !== 'function') cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT.MAP_FUNC }, true);
			var o = {};
			Object.keys(this).forEach(function (key) {
				return o[key] = callback.call(thisArg || _this4, _this4[key], key, _this4);
			});
			return o;
		}
	},

	reduce: {
		value: function reduce(callback, initial, thisArg) {
			var _this5 = this;

			if (cj.nullOrUndefined(this)) cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT_NULL.REDUCE }, true);
			if (typeof callback !== 'function') cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT.REDUCE_FUNC }, true);
			if (!initial && Object.keys(this).length === 0) cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT.REDUCE_NULL_INIT }, true);
			Object.keys(this).forEach(function (key) {
				return initial = callback.call(thisArg || _this5, initial, _this5[key], key, _this5);
			});
			return initial;
		}
	},

	filter: {
		value: function filter(callback, thisArg) {
			var _this6 = this;

			if (cj.nullOrUndefined(this)) cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT_NULL.FILTER }, true);
			if (typeof callback !== 'function') cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT.FILTER_FUNC }, true);
			var o = {};
			Object.keys(this).forEach(function (key) {
				if (callback.call(thisArg || _this6, _this6[key], key, _this6)) o[key] = _this6[key];
			});
			return o;
		}
	},

	contains: {
		value: function contains(target, thisArg) {
			if (cj.nullOrUndefined(this)) cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT_NULL.CONTAINS }, true);
			return Object.keys(this.filter(function (value) {
				return value === target;
			}, thisArg)).length > 0;
		}
	},

	byProp: {
		value: function byProp(keyToFind, valueToFind) {
			if (cj.nullOrUndefined(this)) cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT_NULL.BYPROP }, true);
			return this.reduce(function (memo, value, key, obj) {
				if (typeof value === 'object') return memo.concat(value.byProp(keyToFind, valueToFind));else if (keyToFind === key && value === valueToFind) return memo.concat(obj);
				return memo;
			}, []);
		}
	},

	firstByProp: {
		value: function firstByProp(keyToFind, valueToFind) {
			return this.byProp(keyToFind, valueToFind)[0];
		}
	},

	containsString: {
		value: function containsString(target) {
			if (cj.nullOrUndefined(this)) cj.statistics.error({ type: K.STAT.ERRORS.JS.OBJECT_NULL.CONTAINS_STRING }, true);
			return Object.keys(this.filter(function (item) {
				return typeof item === 'object' && item !== null && item.containsString(target) || item === target;
			})).length > 0;
		}
	}
});
var _fetch = function _fetch(filename, options) {
	return new Promise(function (resolve, reject) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		if (options) options.forEach(function (item, key) {
			return script[key] = item;
		});
		script.onload = function () {
			resolve("Script " + filename + " successfully loaded");
			script.onload = script.onerror = null;
		};
		script.onerror = function () {
			reject("Rejected to load: " + filename);
			script.onload = script.onerror = null;
		};
		script.src = filename;
		document.getElementsByTagName('head')[0].appendChild(script);
	});
};

_fetch.get = function (filename) {
	var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var method = _ref2.method;
	var headers = _ref2.headers;
	var content = _ref2.content;
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		if (headers) headers.forEach(function (header) {
			return xhr.setRequestHeader(header.name, header.text);
		});
		xhr.open(method || 'GET', filename, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200 || xhr.status === 0) resolve(xhr.responseText);
				xhr.onreadystatechange = null;
				reject("Error loading " + filename + " with status " + xhr.status);
			}
		};
		xhr.send(content || false);
	});
};
cj.XML = (function () {
	function _class(data) {
		_classCallCheck(this, _class);

		this.data = data instanceof Node ? data : cj.XML.parse(data);
		this.text = data instanceof Node ? new XMLSerializer().serializeToString(data) : data;
	}

	_createClass(_class, [{
		key: "find",
		value: function find(tag) {
			return cj.XML.findInNode(this.data, tag);
		}
	}, {
		key: "findValue",
		value: function findValue(tag) {
			return cj.XML.findText(cj.XML.findInNode(this.data, tag));
		}
	}, {
		key: "resultCode",
		value: function resultCode() {
			return this.findValue('result-code');
		}
	}, {
		key: "message",
		value: function message() {
			return this.find('result-code').getAttribute('message') || 'Неизвестная ошибка XML-запроса';
		}
	}, {
		key: "ident",
		value: function ident() {
			return this.find('indent');
		}
	}], [{
		key: "parse",
		value: function parse(data) {
			var xml;
			if (!data || typeof data !== 'string') return null;
			xml = new DOMParser().parseFromString(data, 'text/xml');
			if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) cj.statistics.error({ type: K.STAT.ERRORS.JS.XML.INVALID }, true);
			return xml;
		}
	}, {
		key: "findInNode",
		value: function findInNode(parentNode, tag) {
			try {
				return Array.prototype.slice.call(parentNode.childNodes).filter(function (node) {
					return node.nodeName === tag;
				})[0] || Array.prototype.slice.call(parentNode.childNodes).filter(function (node) {
					return node.nodeName !== '#text';
				}).map(function (node) {
					return cj.XML.findInNode(node, tag);
				}).filter(function (node) {
					return !!node;
				})[0];
			} catch (e) {
				return null;
			}
		}
	}, {
		key: "findInNodeByAttribute",
		value: function findInNodeByAttribute(parentNode, attrName, attrValue) {
			return Array.prototype.filter.call(parentNode.childNodes, function (node) {
				return node.nodeName !== '#text' && node.getAttribute(attrName) === attrValue;
			})[0] || null;
		}
	}, {
		key: "findText",
		value: function findText(node) {
			try {
				return cj.XML.findInNode(node, '#text').nodeValue;
			} catch (e) {
				return null;
			}
		}
	}]);

	return _class;
})();
cj.acceptor = (function () {
	function _class2(withChange) {
		_classCallCheck(this, _class2);

		this.change = !!withChange;
		this.status = this.STATUS.OFF;
	}

	_createClass(_class2, [{
		key: "begin",
		value: function begin(sum) {
			var _this7 = this;

			this.status = this.STATUS.TURNING_ON;
			return cj.maratl.send(cj.maratl.REQUEST, this._request(sum), K.MARATL.RESP.VALIDATOR_ON, [K.MARATL.RESP.MIN_CASH, K.MARATL.RESP.MAX_CASH, K.MARATL.RESP.ACCOUNT_DENIED, K.MARATL.RESP.COIN_PROFILE]).then(function (res) {
				if (res[K.MARATL.RESP.ACCOUNT_DENIED] === 'true') return Promise.reject('Прием платежа запрещен.');
				if (res[K.MARATL.RESP.VALIDATOR_ON] === 'false') return Promise.reject('Ошибка оборудования.');
				_this7.status = _this7.STATUS.ON;
				return Promise.resolve(res);
			})["catch"](function (err) {
				return Promise.reject(typeof err === 'string' ? err : 'Техническая ошибка.');
			});
		}
	}, {
		key: "checkTimeout",
		value: function checkTimeout() {
			var _this8 = this;

			return cj.maratl.wait(K.MARATL.RESP.VALIDATOR_TIMEOUT, cj.timeout.PAYMENT_TIMEOUT).then(function (res) {
				if (_this8.status === _this8.STATUS.OFF) return Promise.resolve();
				if (res[K.MARATL.RESP.VALIDATOR_TIMEOUT] !== 'true') return _this8.checkTimeout();
				_this8.status = _this8.STATUS.OFF;
				return Promise.resolve();
			});
		}
	}, {
		key: "update",
		value: function update(_ref3) {
			var onCash = _ref3.onCash;
			var onPaySum = _ref3.onPaySum;
			var onCommission = _ref3.onCommission;
			var onChangePaySum = _ref3.onChangePaySum;
			var onChangeCommission = _ref3.onChangeCommission;
			var onCoinCommission = _ref3.onCoinCommission;
			var onCommissionProfile = _ref3.onCommissionProfile;

			var timeout = cj.timeout.PAYMENT_TIMEOUT; // TODO: discuss
			Promise.loop([function (resolve) {
				return cj.maratl.wait(K.MARATL.RESP.CASH_SUMM, timeout).then(function (_ref4) {
					var cash = _ref4[K.MARATL.RESP.CASH_SUMM];
					return resolve(onCash(Number(cash)));
				});
			}, function (resolve) {
				return cj.maratl.wait(K.MARATL.RESP.PAY_SUMM, timeout).then(function (_ref5) {
					var payed = _ref5[K.MARATL.RESP.PAY_SUMM];
					return resolve(onPaySum(Number(payed)));
				});
			}, function (resolve) {
				return cj.maratl.wait(K.MARATL.RESP.COMMISSION, timeout).then(function (_ref6) {
					var commission = _ref6[K.MARATL.RESP.COMMISSION];
					return resolve(onCommission(Number(commission)));
				});
			}, function (resolve) {
				return cj.maratl.wait(K.MARATL.RESP.CHANGE_PAY_SUMM, timeout).then(function (_ref7) {
					var changePayed = _ref7[K.MARATL.RESP.CHANGE_PAY_SUMM];
					return resolve(onChangePaySum(Number(changePayed)));
				});
			}, function (resolve) {
				return cj.maratl.wait(K.MARATL.RESP.CHANGE_COMMISSION, timeout).then(function (_ref8) {
					var changeCommission = _ref8[K.MARATL.RESP.CHANGE_COMMISSION];
					return resolve(onChangeCommission(Number(changeCommission)));
				});
			}, function (resolve) {
				return cj.maratl.wait(K.MARATL.RESP.COIN_COMMISSION, timeout).then(function (_ref9) {
					var coinCommission = _ref9[K.MARATL.RESP.COIN_COMMISSION];
					return resolve(onCoinCommission(coinCommission));
				});
			}, function (resolve) {
				return cj.maratl.wait(K.MARATL.RESP.COMMPROFILE, timeout).then(function (_ref10) {
					var commissionProfile = _ref10[K.MARATL.RESP.COMMPROFILE];
					return resolve(onCommissionProfile(Number(commissionProfile)));
				});
			}]);
		}
	}, {
		key: "pay",
		value: function pay() {
			var _this9 = this;

			return cj.maratl.send(K.MARATL.SET.CREATE_PAY, null, K.MARATL.RESP.SUCCESSFUL_PAY, null, cj.timeout.ONLINE_TIMEOUT).then(function () {
				_this9.status = _this9.STATUS.OFF;
				return cj.maratl.send(K.MARATL.REQ.CURRENT_PAYMENT_DATA, null, K.MARATL.RESP.CURRENT_PAYMENT_DATA, null, cj.timeout.ONLINE_TIMEOUT);
			}).then(function (res) {
				S.set(K.SESSION.TRANSACTION_ID, res[K.MARATL.RESP.CURRENT_PAYMENT_DATA]);
				return _this9.end(true);
			});
		}
	}, {
		key: "end",
		value: function end(forced) {
			var _this10 = this;

			if (this.status === this.STATUS.TURNING_OFF) return Promise.timeout(function () {
				return forced ? _this10.end(forced) : _this10.status === _this10.STATUS.OFF ? Promise.resolve(true) : Promise.reject();
			}, 500);
			if (this.status === this.STATUS.OFF) return Promise.resolve(true);
			this.status = this.STATUS.TURNING_OFF;
			return cj.maratl.send(K.MARATL.SET.VALIDATOR, 'off', K.MARATL.RESP.VALIDATOR_OFF).then(function (_ref11) {
				var result = _ref11[K.MARATL.RESP.VALIDATOR_OFF];

				if (_this10.status === _this10.STATUS.OFF) return Promise.resolve(true);
				result = result === 'true';
				if (forced && !result) return _this10.end(forced);
				_this10.status = result ? _this10.STATUS.OFF : _this10.STATUS.ON;
				return result ? Promise.resolve(result) : Promise.reject(result);
			});
		}
	}, {
		key: "_request",
		value: function _request(sum) {
			var _S$form$values$assign, _K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$REQ$MAX_CASH_LIMIT$K$MARATL$REQ$MIN_CASH_LIMIT$assign, _ref, _assign$assign$assign;

			var extra = undefined;
			switch (S.scenario()) {
				case cj.sinap.terms.TYPE.QW_OFFLINE:
					extra = _defineProperty({}, K.MARATL.QD_PAYMENT.EXTRA.GLUED_FIELDS, S.form.values.assign((_S$form$values$assign = {
						id: S.qw(),
						acc: S.form.get(K.FIELDS.ACCOUNT)
					}, _defineProperty(_S$form$values$assign, K.FIELDS.SUM, S.get(K.SESSION.PAYMENT.USER_SUM) || S.sum.fixed() || '15000'), _defineProperty(_S$form$values$assign, "trm_id", S.get(K.SESSION.TERMINAL.ID)), _defineProperty(_S$form$values$assign, 'client-software', cj.APP.version), _S$form$values$assign)).reduce(function (memo, item, name) {
						if (name === K.FIELDS.ACCOUNT) return memo;
						return "" + memo + name + ":" + item + ";";
					}, ''));
					break;
				case cj.sinap.terms.TYPE.QD:
					extra = _defineProperty({}, K.MARATL.REQ.JSON, JSON.stringify(S.form.values.reduce(function (obj, value, name) {
						if (name !== K.FIELDS.ACCOUNT) obj["_extra_" + name] = value;
						return obj;
					}, {})));
					break;
				case cj.sinap.terms.TYPE.QW_ONLINE:
				//fall-through
				default:
					extra = _defineProperty({}, K.MARATL.QD_PAYMENT.EXTRA.SCODE, S.get(K.SESSION.TRANSACTION_ID));
			}

			return (_K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$REQ$MAX_CASH_LIMIT$K$MARATL$REQ$MIN_CASH_LIMIT$assign = {}, _defineProperty(_K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$REQ$MAX_CASH_LIMIT$K$MARATL$REQ$MIN_CASH_LIMIT$assign, K.MARATL.QD_PAYMENT.ACCOUNT, S.scenario() === cj.sinap.terms.TYPE.QD ? S.form.get(K.FIELDS.ACCOUNT) : S.phone()), _defineProperty(_K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$REQ$MAX_CASH_LIMIT$K$MARATL$REQ$MIN_CASH_LIMIT$assign, K.MARATL.QD_PAYMENT.ACCOUNT_MASK, 'NNNNNNNNNN'), _defineProperty(_K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$REQ$MAX_CASH_LIMIT$K$MARATL$REQ$MIN_CASH_LIMIT$assign, K.MARATL.QD_PAYMENT.PROVIDER_ID, S.qd()), _defineProperty(_K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$REQ$MAX_CASH_LIMIT$K$MARATL$REQ$MIN_CASH_LIMIT$assign, K.MARATL.QD_PAYMENT.PROVIDER_NAME, S.scenario() === cj.sinap.terms.TYPE.QD ? S.shortName() : S.VQW_NAME), _defineProperty(_K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$REQ$MAX_CASH_LIMIT$K$MARATL$REQ$MIN_CASH_LIMIT$assign, K.MARATL.REQ.MAX_CASH_LIMIT, S.limits.maxTerminal()), _defineProperty(_K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$REQ$MAX_CASH_LIMIT$K$MARATL$REQ$MIN_CASH_LIMIT$assign, K.MARATL.REQ.MIN_CASH_LIMIT, sum), _K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$REQ$MAX_CASH_LIMIT$K$MARATL$REQ$MIN_CASH_LIMIT$assign).assign(!this.change ? {} : (_ref = {}, _defineProperty(_ref, K.MARATL.QD_PAYMENT.CHANGE_PROVIDER_ID, S.get(K.SESSION.CHANGE_PROVIDER.ID)), _defineProperty(_ref, K.MARATL.QD_PAYMENT.CHANGE_NUMBER, S.phone()), _defineProperty(_ref, K.MARATL.QD_PAYMENT.CHANGE_ACCOUNT_MASK, 'NNNNNNNNNN'), _defineProperty(_ref, K.MARATL.QD_PAYMENT.CHANGE_PROVIDER_NAME, S.get(K.SESSION.CHANGE_PROVIDER.NAME)), _defineProperty(_ref, K.MARATL.QD_PAYMENT.EXTRA.SUM, sum), _ref)).assign(extra).assign((_assign$assign$assign = {}, _defineProperty(_assign$assign$assign, K.MARATL.QD_PAYMENT.EXTRA.COMMENT, cj.XMLRequest.escape("Оплата [" + S.shortName() + "] " + cj.APP.version)), _defineProperty(_assign$assign$assign, K.MARATL.QD_PAYMENT.EXTRA.TERMINAL_ID, S.get(K.SESSION.TERMINAL.ID)), _defineProperty(_assign$assign$assign, K.MARATL.SET.VALIDATOR, 'on'), _assign$assign$assign));
		}
	}, {
		key: "STATUS",
		get: function get() {
			return {
				ON: 'on',
				OFF: 'off',
				READY: 'on',
				TURNING_ON: 'collect_on',
				TURNING_OFF: 'collect_off'
			};
		}
	}, {
		key: "status",
		get: function get() {
			return this._status;
		},
		set: function set(v) {
			if (this.STATUS.contains(v)) this._status = v;
			return this.status;
		}
	}]);

	return _class2;
})();
cj.XMLRequest = (function () {
	function _class3(request) {
		var _ref12 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		var url = _ref12.url;
		var headers = _ref12.headers;
		var maxTries = arguments.length <= 2 || arguments[2] === undefined ? 3 : arguments[2];

		_classCallCheck(this, _class3);

		this.request = request;
		this.requestType = this.request.replace(/[\s\S]*.*<request-type>/m, '').replace(/<\/request-type>.*[\s\S]*/, '');
		this.maxTries = maxTries;
		this.urlsTried = 0;
		this.urls = url;
		this.headers = headers;
	}

	_createClass(_class3, [{
		key: "start",
		value: function start() {
			var _this11 = this;

			cj.timeout.reset();
			return cj.maratl.send(K.MARATL.NET.REQUEST, JSON.stringify({
				url: this.urls[this.urlsTried % this.urls.length],
				request: this.request.replace(/[\n\r\t]/g, ''),
				headers: this.headers || {}
			}), K.MARATL.NET.RESPONSE, null, cj.timeout.ONLINE_TIMEOUT).then(function (_ref13) {
				var result = _ref13[K.MARATL.NET.RESPONSE];

				var _JSON$parse = JSON.parse(result.replace(/<\?xml version=.* encoding=.*\?>/g, ''));

				var response = _JSON$parse.response;
				var code = _JSON$parse['result-code'];

				if (code === 600) return Promise.reject(600);
				if (code !== 0) return Promise.reject(-1);
				_this11.response = new cj.XML(response);
				if (_this11.response.resultCode() === '600') return ++_this11.urlsTried < _this11.maxTries ? Promise.timeout(function () {
					return _this11.start().then(function (result) {
						return result.data;
					});
				}, cj.timeout.RETRY_TIMEOUT) : Promise.reject(600);else if (_this11.response.resultCode() === null) return Promise.reject(-1);else return Promise.resolve(_this11.response);
			}).then(function (resp) {
				cj.statistics.online({
					type: _this11.requestType,
					result: resp.resultCode() || 'Неизвестная ошибка онлайн-запроса.'
				});
				return Promise.resolve({
					code: Number(resp.resultCode()),
					message: resp.message(),
					data: resp
				});
			}, function (rej) {
				cj.statistics.online({
					type: _this11.requestType,
					result: rej
				});
				if (rej === 600) return Promise.reject('Превышено время ожидания ответа от сервера. Повторите попытку позднее.');else if (rej === -1) return Promise.reject('Произошла техническая ошибка. Повторите попытку позднее.');else return Promise.reject(rej);
			});
		}
	}, {
		key: "urls",
		get: function get() {
			return this._urls || ['https://w.qiwi.com/xml/xmlutf.jsp', 'https://service1.osmp.ru/wallet/xmlutf.jsp', 'https://service2.osmp.ru/wallet/xmlutf.jsp'];
		},
		set: function set(url) {
			if (url) this._urls = [url];
		}
	}], [{
		key: "error",
		value: function error(code) {
			return cj.APP.xmlCodes.filter(function (error) {
				return error[0] === code;
			}).map(function (error) {
				return error[1];
			})[0] || null;
		}
	}, {
		key: "escape",
		value: function escape(s) {
			return s && s.toString().replace(/"/g, "'").replace(/[&%]/g, '') || '';
		}
	}, {
		key: "generateTransaction",
		value: function generateTransaction() {
			var now = new Date();
			var trans = Number((now.getTime() - now.getTimezoneOffset() * 60000).toString().substr(-12, 11));
			S.set(K.SESSION.PAYMENT_ID, trans);
			S.set(K.SESSION.TRANSACTION_ID, trans - 1);
		}
	}, {
		key: "REQUEST",
		value: function REQUEST(req) {
			var additional = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

			var _ref14 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

			var pin = _ref14.pin;
			var phone = _ref14.phone;
			var std = _ref14.std;
			var terminal = _ref14.terminal;

			return "\n\t\t<request>\n\t\t\t<request-type>" + req + "</request-type>\n\t\t\t<extra name=\"client-software\">" + cj.APP.version + "</extra>\n\t\t\t" + additional + "\n\t\t\t" + (pin ? "<extra name=\"mylk-pin\">" + S.pin() + "</extra>" : '') + "\n\t\t\t" + (phone ? "<terminal-id>7" + S.phone() + "</terminal-id>" : '') + "\n\t\t\t" + (terminal ? "<extra name=\"terminal\">" + S.terminalID() + "</extra>" : '') + "\n\t\t\t" + (std ? "<extra name=\"std\">" + (Number(new Date().getTime().toString().substr(0, 10)) ^ Number(1115666665)) + "</extra>" : '') + "\n\t\t</request>";
		}
	}, {
		key: "ADD_FAVOURITE",
		value: function ADD_FAVOURITE(id) {
			return cj.XMLRequest.REQUEST('add-ab-item', "\n\t\t<item-list>\n\t\t\t<item>\n\t\t\t\t<title>Платеж " + cj.XMLRequest.escape(S.shortName()) + "</title>\n\t\t\t\t<id>" + id + "</id>\n\t\t\t\t<prv>" + S.qw(true) + "</prv>\n\t\t\t\t<account>" + (S.form.get(K.FIELDS.ACCOUNT) || '') + "</account>\n\t\t\t\t<amount>" + S.get(K.SESSION.PAYMENT.USER_SUM) + "</amount>\n\t\t\t\t<from-cur>" + K.RUB_CURRENCY_CODE + "</from-cur>\n\t\t\t\t<to-cur>" + K.RUB_CURRENCY_CODE + "</to-cur>\n\t\t\t\t" + S.form.fields.map(function (item) {
				return item.name === K.FIELDS.ACCOUNT ? '' : "<extra name=\"" + item.name + "\">" + cj.XMLRequest.escape(item.value) + "</extra>";
			}).join('') + "\n\t\t\t</item>\n\t\t</item-list>", { pin: true, phone: true, std: true });
		}
	}, {
		key: "FAVOURITES_LIST",
		value: function FAVOURITES_LIST() {
			return cj.XMLRequest.REQUEST('get-ab', '', { pin: true, phone: true, std: true });
		}
	}, {
		key: "REMOVE_FAVOURITE",
		value: function REMOVE_FAVOURITE(item) {
			return cj.XMLRequest.REQUEST('del-ab-item', "\n\t\t\t<item-list>\n\t\t\t\t<item>" + item + "</item>\n\t\t\t</item-list>\n\t\t\t<extra name=\"page\">0</extra>", { pin: true, phone: true, std: true });
		}
	}, {
		key: "CHECK_PHONE",
		value: function CHECK_PHONE() {
			return "<request>\n\t\t<request-type>bean</request-type>\n\t\t" + cj.XMLRequest.REQUEST('get-identification-status-terminal', "<extra name=\"phone\">7" + S.phone() + "</extra>", { terminal: true }) + "\n\t\t" + cj.XMLRequest.REQUEST('check-user-terminal', "<extra name=\"phone\">7" + S.phone() + "</extra>\n\t\t\t<extra name=\"cur\">1</extra>\n\t\t\t<extra name=\"ccy\">" + K.RUB_CURRENCY_CODE + "</extra>\n\t\t\t<extra name=\"check_pin\">1</extra>", { terminal: true }) + "\n\t\t</request>";
		}
	}, {
		key: "CHECK_PIN",
		value: function CHECK_PIN() {
			return cj.XMLRequest.REQUEST('ping', '', { pin: true, phone: true });
		}
	}, {
		key: "RESTORE_PIN",
		value: function RESTORE_PIN() {
			return cj.XMLRequest.REQUEST('send-pin', '', { phone: true });
		}
	}, {
		key: "CHANGE_PIN",
		value: function CHANGE_PIN(pin) {
			return cj.XMLRequest.REQUEST('change-pin', "\n\t\t\t<pin>" + pin + "</pin>\n\t\t\t<trm-id>" + S.terminalID() + "</trm-id>", { phone: true, pin: true });
		}
	}, {
		key: "REGISTER",
		value: function REGISTER() {
			return cj.XMLRequest.REQUEST('add-new-mylk', "\n\t\t\t<trm-id>" + S.terminalID() + "</trm-id>\n\t\t\t<extra name=\"phone\">7" + S.phone() + "</extra>");
		}
	}]);

	return _class3;
})();
cj.maratl = new ((function () {
	function _class4() {
		_classCallCheck(this, _class4);

		this.events = [];
	}

	_createClass(_class4, [{
		key: "process",
		value: function process(key, value) {
			if (!window.terminal || !window.terminal.processcommand) return;
			window.terminal.processcommand(key, value);
		}

		/**
   * Terminal send promise.
   *
   * @param {key} Key to send to maratl. If value will be key-value array/object/string
   * key must be terminal.REQUEST.
   * @param {value} Value to send to maratl. If key is terminal.REQUEST then value
   * can be string/array/object.
   * @param {waiting} Key or array of keys to be fulfilled from maratl response,
   * alternatives should be divided by |. Promise is fulfilled (and therefore resolved)
   * when all waiting keys are received.
   * @param {optional} Optional. Key or array of keys to optionally wait from maratl.
   * They will be also included in promise when resolved and have 500ms timeout if all
   * waiting keys are recieved and optional are not.
   * @param {maximumTimeout} Optional. Value indicating number of milliseconds to wait
   * until promise is rejected if not fulfilled. Default value is 5000.
   */
	}, {
		key: "wait",
		value: function wait(waiting, maximumTimeout) {
			return this.send(null, null, waiting, null, maximumTimeout);
		}
	}, {
		key: "send",
		value: function send(key, value, waiting, optional) {
			var _this12 = this;

			var maximumTimeout = arguments.length <= 4 || arguments[4] === undefined ? 5000 : arguments[4];

			var p = Promise.resolve();

			if (!value) value = this.defaultValue;
			if (key === this.REQUEST) return this._massiveSend(value, waiting, optional, maximumTimeout);
			if (waiting || optional) {
				waiting = this._responseParser(waiting || undefined);
				optional = this._responseParser(optional || undefined);

				p = new Promise(function (resolve, reject) {
					var result = {},
					    timeoutId;
					var onResp = function onResp(rKey, rValue) {
						var off = function off(action) {
							_this12.off(onResp);
							action(result);
						};
						var chop = function chop(waitKeyArray, i, arr) {
							return waitKeyArray.indexOf(rKey.toLowerCase()) !== -1 ? true | arr.splice(i, 1) : false;
						};

						if (!rKey) return;
						rValue = cj.nullOrUndefined(rValue) ? '' : rValue;

						if (waiting.filter(chop).length > 0 || optional.filter(chop).length > 0) result[rKey] = rValue;

						clearTimeout(timeoutId);
						timeoutId = setTimeout(function () {
							return off(reject);
						}, maximumTimeout);

						if (waiting.length === 0) {
							clearTimeout(timeoutId);
							optional.length === 0 ? off(resolve) : setTimeout(function () {
								return off(resolve);
							}, _this12.OPTIONAL_TIMEOUT);
						}
					};
					_this12.on(onResp);
				});
			}
			if (!!key) this.process(key.toString(), value.toString());

			return p;
		}
	}, {
		key: "log",
		value: function log(text) {
			return this.send('WriteToLog', text);
		}
	}, {
		key: "on",
		value: function on(cb) {
			return this.events.push(cb);
		}
	}, {
		key: "off",
		value: function off(cb) {
			this.events = this.events.filter(function (i) {
				return i !== cb;
			});
		}
	}, {
		key: "receive",
		value: function receive(key, value) {
			this.events.forEach(function (cb) {
				return cb(key, value);
			});
		}
	}, {
		key: "_responseParser",
		value: function _responseParser() {
			var array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
			return (array instanceof Array ? array : [array]).map(function (item) {
				return item.split('|').map(function (subitem) {
					return subitem.toLowerCase();
				});
			}).filter(function (item) {
				return !!item;
			});
		}

		/**
   * Massive recieve/send format.
   *
   * @param {array[..].values} Values to send/recieve in maratl.
   * @example String format.
   * 'pin=666&phone=79175309764'
   * @example Array format.
   * [{
  		name: 'pin',
  		value: '666'
  	}, {
  		name: 'phone',
  		value: '79175309764'
  	}]
   * @example Object format.
   * {
  		pin: '666',
  		phone: '79175309764'
  	}
   */
	}, {
		key: "_massiveSend",
		value: function _massiveSend(request, waiting, optional, maximumTimeout) {
			var _this13 = this;

			if (request === null) return Promise.reject('Empty request');else if (typeof request === 'string') request = request.split('&').map(function (command) {
				return command.split('=');
			}).map(function (arr) {
				return { name: arr[0], value: arr[1] };
			});else if (request.length !== +request.length) request = request.reduce(function (memo, value, name) {
				memo.push({ name: name, value: value });
				return memo;
			}, []);
			request = request.map(function (item, index) {
				return _this13.send.apply(_this13, [item.name, item.value || _this13.defaultValue].concat(index === 0 ? [waiting, optional, maximumTimeout] : []));
			});
			return request[0];
		}
	}, {
		key: "REQUEST",
		get: function get() {
			return 'maratl_request';
		}
	}, {
		key: "TIMEOUT",
		get: function get() {
			return 5000;
		}
	}, {
		key: "OPTIONAL_TIMEOUT",
		get: function get() {
			return 50;
		}
	}, {
		key: "defaultValue",
		get: function get() {
			return true;
		}
	}]);

	return _class4;
})())();

var Autocomplete = (function () {
	function Autocomplete(path) {
		var _ref15 = arguments.length <= 1 || arguments[1] === undefined ? { caseSensitive: false, length: 10, minChars: 2 } : arguments[1];

		var caseSensitive = _ref15.caseSensitive;
		var length = _ref15.length;
		var minChars = _ref15.minChars;

		_classCallCheck(this, Autocomplete);

		this.path = "../res/" + path;
		this.caseSensitive = caseSensitive;
		this._length = length;
		this.minChars = minChars;
	}

	_createClass(Autocomplete, [{
		key: "load",
		value: function load() {
			var _this14 = this;

			return _fetch.get(this.path).then(function (data) {
				return _this14.dictionary = data.replace(/\r/g, '').split('\n');
			});
		}
	}, {
		key: "apply",
		value: function apply(value) {
			var _this15 = this;

			if (!this.dictionary || !value || !value.length || value.length < this.minChars) return [];
			return this.dictionary.reduce(function (memo, word) {
				if (memo.length <= _this15._length && ~(_this15.caseSensitive ? word : word.toLowerCase()).indexOf(_this15.caseSensitive ? value : value.toLowerCase())) memo.push(word);
				return memo;
			}, []);
		}
	}, {
		key: "length",
		set: function set(value) {
			this._length = value;
		}
	}]);

	return Autocomplete;
})();

cj.commission.ParseJSON = function (json) {
	if (!json || !json.commissionInfo) return null;
	return new cj.commission.Commissions({ ranges: json.commissionInfo.map(function (commission) {
			return {
				bound: commission.fromAmount || 0,
				rate: commission.commissionPercent,
				fixed: commission.commissionFix,
				max: commission.commissionMax === 'inf' ? null : commission.commissionMax,
				min: commission.commissionMin,
				upperBound: commission.toAmount === 'inf' ? null : commission.toAmount
			};
		}) }, true);
};

cj.commission.Commission = (function () {
	function _class5(_ref16) {
		var bound = _ref16.bound;
		var rate = _ref16.rate;
		var fixed = _ref16.fixed;
		var max = _ref16.max;
		var min = _ref16.min;

		_classCallCheck(this, _class5);

		if (!cj.correctNumbers(bound, rate)) cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.INVALID_COMMISSION_RANGE });
		this.bound = Number(bound) || 0;
		this.rate = Number(rate) || 0;
		this.fixed = Number(fixed) || 0;
		this.min = Number(min) || 0;
		this.max = Number(max) || Number.MAX_VALUE;
		if (this.max < this.min) this.max = this.min;
	}

	_createClass(_class5, [{
		key: "commission",
		value: function commission() {
			var sum = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			if (sum < this.bound) return null;
			return Math.min(Math.max(this.fixed + sum * this.rate, this.min), this.max);
		}
	}, {
		key: "reverse",
		value: function reverse() {
			var sum = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var com = Math.min(Math.max(sum - (sum - this.fixed) / (1 + this.rate), this.min), this.max);
			if (Math.max(sum - com, 0) < this.bound) return null;
			return com;
		}
	}, {
		key: "applicability",
		get: function get() {
			return "Для любых сумм";
		}
	}, {
		key: "comment",
		get: function get() {
			var s = '';
			if (this.fixed) s += this.fixed + " " + S.RUB_SUFFIX;
			if (this.fixed && this.rate !== 0) s += ' + ';
			if (!this.fixed || this.rate !== 0) s += cj.round2(this.rate * 100) + "%";
			if (this.min) s += ", но не менее " + cj.toSum(this.min) + " " + S.RUB_SUFFIX;
			if (this.max !== Number.MAX_VALUE) s += (this.min ? ' и не' : ', но') + " не более " + cj.toSum(this.max) + " " + S.RUB_SUFFIX;
			return s;
		}
	}], [{
		key: "html",
		value: function html(comms, _ref17) {
			var _ref172 = _slicedToArray(_ref17, 2);

			var sum = _ref172[0];
			var commission = _ref172[1];

			if (!comms || !comms.ranges) return '';
			return "<table>\n\t\t\t<tr>\n\t\t\t\t<th>" + sum + "</th>\n\t\t\t\t<th>" + commission + "</th>\n\t\t\t</tr>\n\t\t\t" + comms.ranges.reduce(function (html, p) {
				return html + "\n\t\t\t\t<tr>\n\t\t\t\t\t<td>" + p.applicability + "</td>\n\t\t\t\t\t<td>" + p.comment + "</td>\n\t\t\t\t</tr>";
			}, "") + "\n\t\t</table>";
		}
	}]);

	return _class5;
})();

cj.commission.AgentCommission = (function (_cj$commission$Commission) {
	_inherits(_class6, _cj$commission$Commission);

	function _class6(_ref18) {
		var bound = _ref18.bound;
		var upperBound = _ref18.upperBound;
		var rate = _ref18.rate;
		var fixed = _ref18.fixed;
		var max = _ref18.max;
		var min = _ref18.min;

		_classCallCheck(this, _class6);

		_get(Object.getPrototypeOf(_class6.prototype), "constructor", this).call(this, { bound: bound, rate: rate / 100, fixed: fixed, max: max, min: min });
		this.isDefault = !upperBound && !this.bound && !this.fixed && !this.min && this.max === Number.MAX_VALUE && cj.correctNumbers(this.rate);
		this.upperBound = Number(upperBound) || 15000;
	}

	_createClass(_class6, [{
		key: "commission",
		value: function commission() {
			var sum = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			if (sum > this.upperBound) return null;
			return _get(Object.getPrototypeOf(_class6.prototype), "commission", this).call(this, sum);
		}
	}, {
		key: "reverse",
		value: function reverse() {
			var sum = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var com = _get(Object.getPrototypeOf(_class6.prototype), "reverse", this).call(this, sum);
			if (com === null || Math.max(sum - com, 0) > this.upperBound) return null;
			return com;
		}
	}, {
		key: "applicability",
		get: function get() {
			return this.isDefault ? "Другие условия" : (this.upperBound === 15000 ? "от " + this.bound : this.bound + " - " + this.upperBound) + "\n\t\t\t\t\t" + S.RUB_SUFFIX;
		}
	}]);

	return _class6;
})(cj.commission.Commission);

cj.commission.Commissions = (function () {
	function _class7(_ref19, isAgent) {
		var ranges = _ref19.ranges;

		_classCallCheck(this, _class7);

		if (!ranges) cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.INVALID_COMMISSIONS });
		if (isAgent) this.ranges = (ranges || []).map(function (r) {
			return new cj.commission.AgentCommission(r);
		});else this.ranges = (ranges || []).map(function (r) {
			return new cj.commission.Commission(r);
		}).sort(function (a, b) {
			return a.bound - b.bound;
		});
		if (this.ranges.length === 0) this.ranges.push(new cj.commission.Commission());
	}

	_createClass(_class7, [{
		key: "forward",
		value: function forward(sum) {
			return cj.round2(this.ranges.map(function (r) {
				return r.commission(sum);
			}).filter(function (r) {
				return cj.correctNumbers(r);
			})[0]);
		}
	}, {
		key: "forwardWithSum",
		value: function forwardWithSum(sum) {
			return cj.round2(this.forward(sum) + sum);
		}
	}, {
		key: "reverse",
		value: function reverse(sum) {
			return cj.round2(this.ranges.map(function (r) {
				return r.reverse(sum);
			}).filter(function (r) {
				return cj.correctNumbers(r);
			})[0]);
		}
	}, {
		key: "comment",
		get: function get() {
			return this.ranges.map(function (r) {
				return r.comment;
			})[0];
		}
	}, {
		key: "length",
		get: function get() {
			return this.ranges.length;
		}
	}]);

	return _class7;
})();
cj.configParser = {
	load: function load(id) {
		return _fetch("../config/" + id + ".js", { charset: 'windows-1251' }).then(function () {
			return window.UIProvider ? Promise.resolve({
				id: UIProvider.id,
				longName: UIProvider.lName,
				shortName: UIProvider.sName,
				logo: UIProvider.__objects.firstByProp('type', 'standard').img,
				ad1: cj.configParser.parseAdBlock(cj.configParser.getParam(UIProvider, 'ad_block_1')),
				ad2: cj.configParser.parseAdBlock(cj.configParser.getParam(UIProvider, 'ad_block_2')),
				ad3: cj.configParser.parseAdBlock(cj.configParser.getParam(UIProvider, 'ad_block_3'))
			}) : Promise.reject(K.STAT.ERRORS.MARATL.NO_CONFIG_OBJECT);
		}, function (reject) {
			return Promise.reject(K.STAT.ERRORS.MARATL.NO_CONFIG_FILE);
		});
	},

	getParam: function getParam(data, name) {
		data = data.__objects && data.__objects.firstByProp('__type', 'constParams');
		data = data.__objects && data.__objects.firstByProp('name', name);
		return data && data.value || null;
	},

	parseAdBlock: function parseAdBlock(value) {
		if (!value) return '';
		var sp = value.split('|');
		if (sp.length > 1) {
			var ds = sp[0];
			return new Date('20' + ds.substr(6), Number(ds.substr(3, 2)) - 1, Number(ds.substr(0, 2))) > new Date() ? cj.unescape(sp[1]) : '';
		} else return cj.unescape(value);
	}
};
cj.favs = {
	parse: function parse(xml) {
		var list;
		if (!(list = xml.data.getElementsByTagName('book-list')[0])) return null;
		return S.set(K.SESSION.USER.FAVOURITE_LIST + S.phone(), Array.prototype.filter.call(list.children, function (xItem) {
			return xItem.nodeName === 'book-item' && xItem.getElementsByTagName('prv-id')[0].childNodes[0].nodeValue.toString() === S.qw(true).toString();
		}).map(function (xItem) {
			return {
				id: xItem.getElementsByTagName('id')[0].childNodes[0].nodeValue,
				account: xItem.getElementsByTagName(K.FIELDS.ACCOUNT)[0].childNodes[0].nodeValue,
				amount: xItem.getElementsByTagName('amount')[0].childNodes[0].nodeValue,
				extras: xItem.getElementsByTagName('extra').reduce(function (memo, item) {
					memo[item.getAttribute('name')] = item.childNodes.length ? item.childNodes[0].nodeValue : '';
					return memo;
				}, {})
			};
		}));
	},
	fill: function fill(fav) {
		return new Promise(function (resolve, reject) {
			var form = S.form;
			form.clear();
			while (true) {
				var f = form.currentField();

				if (f.type === cj.sinap.elements.TYPE.REFERENCE) {
					S.set(K.SESSION.FAVOURITE_CHANGING, fav);
					f.isFirst = true;
					break;
				}
				var val = fav.extras[f.name] || fav[f.name];
				if (f.name === K.FIELDS.WELCOME) val = f.value;
				f.value = null;
				if (cj.nullOrUndefined(val) && f.title !== K.FIELDS.WELCOME_MAGIC) return reject('Поле не найдено в избранном.');
				if (f.mask) {
					var masked = cj.mask.mask(val.replace(/\s/g, ''), f.mask);
					if (masked.remainedMask !== '' && masked.remainedMask.charAt(0) !== '?') return reject('Ошибка наложения маски.');
				}
				f.value = f.mask ? masked.maskedValue : val;
				f.submit();
				form.refresh();
				if (form.hasNextField()) form.goToNextField();else break;
			}
			S.set(K.SESSION.PAYMENT.USER_SUM, fav.amount);
			resolve();
		});
	},
	clear: function clear() {
		S.form.clear();
		S.remove(K.SESSION.PAYMENT.USER_SUM);
		S.remove(K.SESSION.FAVOURITE_ADDING);
		S.remove(K.SESSION.FAVOURITE_CHANGING);
		S.remove(K.SESSION.FAVOURITE_SELECTED);
		S.remove(K.SESSION.FAVOURITES_USED);
	},
	save: function save(view, skipIdentification) {
		return new Promise(function (resolve) {
			if (!skipIdentification) cj.favs.id();
			view.showPreloader();
			var exit = function exit() {
				return resolve(view.hidePreloader());
			};
			if (S.scenario() !== cj.sinap.terms.TYPE.QW_ONLINE) return exit();

			var performOnline = function performOnline(id) {
				return new cj.XMLRequest(cj.XMLRequest.ADD_FAVOURITE(id.toString() || '0'), undefined, 1).start().then(exit)["catch"](exit);
			};

			var fav;
			if (fav = S.get(K.SESSION.FAVOURITE_CHANGING)) return performOnline(fav.id);else if (S.get(K.SESSION.FAVOURITE_SELECTED)) return exit();else return (S.get(K.SESSION.USER.FAVOURITE_LIST + S.phone()) || [{ account: null }]).filter(function (item) {
				return S.form.get(K.FIELDS.ACCOUNT) === item.account;
			}).length > 0 ? exit() : performOnline(0);
		});
	},
	id: function id() {
		var ident = {
			phone: S.phone(),
			account: S.form.get(K.FIELDS.ACCOUNT),
			terminalID: S.terminalID(),
			transactionCode: S.paymentMethod() === K.PAYMENT.CASH ? S.get(K.SESSION.TRANSACTION_ID) : undefined,
			paymentMethod: S.paymentMethod(),
			transactionDate: new Date().toLocaleFormat('%d.%m.%Y'),
			user_profile: S.get(K.SESSION.IDENTIFICATION),
			title: 'Платеж отправлен',
			description: (S.terms().deadline ? S.terms().deadline + '\n\n' : '') + (S.scenario() === cj.sinap.terms.TYPE.QW_ONLINE ? 'Данные, которые вы заполнили, сохранены.\nДля быстрой оплаты используйте\n«Повторить платеж»' : ''),
			showECheck: true,
			eCheck: S.form.receipt.html,
			login0: S.pin()
		};
		if (S.scenario() === cj.sinap.terms.TYPE.QD) delete ident.phone;
		if (!(S.terms().identification && S.terms().identification.required)) delete ident.user_profile;
		if (!S.pin() || S.pin() === '666') delete ident.login0;
		storage.set('ident_adv_counter', ident);
	}
};
cj.mask = {
	DAY: 'D',
	MONTH: 'M',
	YEAR: 'y',
	DIGIT: 'd',
	LETTER: 'w',
	ANY: '*',
	OPTIONAL_SECTION_START: '?',
	isSymbol: function isSymbol(symbol) {
		return [cj.mask.DAY, cj.mask.MONTH, cj.mask.YEAR, cj.mask.DIGIT, cj.mask.LETTER, cj.mask.ANY].indexOf(symbol) !== -1;
	},
	displayCharForMask: function displayCharForMask(char) {
		switch (char) {
			case cj.mask.DIGIT:
			case cj.mask.LETTER:
			case cj.mask.ANY:
				return 'X';
			case cj.mask.DAY:
				return 'Д';
			case cj.mask.MONTH:
				return 'М';
			case cj.mask.YEAR:
				return 'Г';
		}
		return char;
	}
};

cj.mask.mask = function (value, maskText) {
	// TODO: переписать
	var result = {
		maskedValue: '',
		maskedChars: 0,
		remainedMask: maskText
	};
	if (!value) return result;
	var maskIndex = 0,
	    valueIndex = 0,
	    optionalSection = false;
	for (; maskIndex < maskText.length && valueIndex < value.length; maskIndex++) {
		var maskSym = maskText.charAt(maskIndex);
		switch (maskSym) {
			case cj.mask.DIGIT:
			case cj.mask.LETTER:
			case cj.mask.YEAR:
			case cj.mask.DAY:
			case cj.mask.MONTH:
			case cj.mask.ANY:
				result.maskedValue += value.charAt(valueIndex++);
				result.maskedChars++;
				break;
			case cj.mask.OPTIONAL_SECTION_START:
				optionalSection = true;
				break;
			default:
				result.maskedValue += maskSym;
				result.maskedChars++;
		}
	}
	result.remainedMask = maskText.substr(maskIndex);
	if (result.maskedChars < value.length) result.remainedMask = '-' + (value.length - result.maskedChars);
	if (optionalSection) result.remainedMask = '?' + result.remainedMask;
	return result;
};

cj.mask.demask = function () {
	var maskedValue = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	var maskText = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	var result = {
		value: '',
		remainedMask: ''
	};
	var maskIndex = 0,
	    optionalSection = false;

	for (; maskIndex < maskText.length && maskedValue && maskIndex < maskedValue.length + (optionalSection ? 1 : 0); maskIndex++) {
		var maskSym = maskText.charAt(maskIndex);
		switch (maskSym) {
			case cj.mask.DIGIT:
			case cj.mask.LETTER:
			case cj.mask.YEAR:
			case cj.mask.DAY:
			case cj.mask.MONTH:
			case cj.mask.ANY:
				result.value += maskedValue.charAt(maskIndex - (optionalSection ? 1 : 0));
				break;
			case cj.mask.OPTIONAL_SECTION_START:
				optionalSection = true;
				break;
		}
	}
	result.remainedMask = maskText.substr(maskIndex);
	if (optionalSection) result.remainedMask = '?' + result.remainedMask;
	return result;
};

cj.mask.Mask = (function () {
	function _class8(maskText) {
		_classCallCheck(this, _class8);

		this.maskText = maskText;
	}

	_createClass(_class8, [{
		key: "setPureValue",
		value: function setPureValue(value) {
			if (value === this.value) return;

			this.value = value;
			var result = cj.mask.mask(this.value, this.maskText);
			this.maskedValue = result.maskedValue;
			this.maskedChars = result.maskedChars;
			this.remainedMask = result.remainedMask;
		}
	}, {
		key: "nextEditableChar",
		value: function nextEditableChar() {
			return this.remainedMask.split('').filter(cj.mask.isSymbol)[0];
		}
	}, {
		key: "remainedChars",
		value: function remainedChars() {
			return this.remainedMask.length;
		}
	}]);

	return _class8;
})();

var S = cj.session = Object.defineProperties({

	VQW_ID: '7406',
	VQW_NAME: 'Visa QIWI Wallet',
	RUB_SUFFIX: 'руб.',

	session: {},

	/* -------------- COMMON -------------- */
	set: function set(key, value) {
		return this.session[key] = value;
	},
	get: function get(key) {
		return this.session[key];
	},
	remove: function remove(key) {
		delete this.session[key];
	},
	clear: function clear() {
		this.session = {};
	},
	_prop: function _prop(key, val) {
		if (val || val === '') S.set(key, val);else if (val === null) S.remove(key);
		return S.get(key);
	},
	/* ----------- UIProvider Config ----------- */
	config: function config(val) {
		return S._prop(K.SESSION.CONFIG, val);
	},
	longName: function longName() {
		return S.config() ? S.config().longName : '';
	},
	shortName: function shortName() {
		return S.config() ? S.config().shortName : '';
	},

	terms: function terms(needFirst) {
		var f = S.form;
		return f && f.terms(needFirst);
	},
	qw: function qw(needFirst) {
		var t = S.terms(needFirst);
		return t && t.qw;
	},
	qd: function qd(forcedStorage) {
		if (forcedStorage) return storage.get('provider');
		var t = S.terms();
		return t ? t.qd : storage.get('provider');
	},
	scenario: function scenario() {
		var t = S.terms();
		return t && t.type;
	},
	commission: function commission(needFirst) {
		return S.terms(needFirst).commission || {
			forwardWithSum: function forwardWithSum(sum) {
				return sum;
			},
			reverse: function reverse() {
				return 0;
			},
			forward: function forward() {
				return 0;
			}
		};
	},
	sum: {
		available: function available() {
			return !!S.terms().sumConstraint;
		},
		fixed: function fixed() {
			var opts = S.terms().sumConstraint;
			return opts ? opts.fixed ? opts.fixed.amount : null : null;
		},
		suggested: function suggested() {
			var opts = S.terms().sumConstraint;
			return opts ? opts.suggested ? opts.suggested.amount : null : null;
		}
	},
	limits: {
		minProvider: function minProvider() {
			var common = S.terms().limits && S.terms().limits.forCurrency(K.RUB_CURRENCY_CODE) && S.terms().limits.forCurrency(K.RUB_CURRENCY_CODE).min;
			var constraint = S.terms().sumConstraint && S.terms().sumConstraint.limit && S.terms().sumConstraint.limit.min;
			return cj.correctNumbers(constraint || common) ? constraint || common : null;
		},
		maxProvider: function maxProvider() {
			var common = S.terms().limits && S.terms().limits.forCurrency(K.RUB_CURRENCY_CODE) && S.terms().limits.forCurrency(K.RUB_CURRENCY_CODE).max;
			var constraint = S.terms().sumConstraint && S.terms().sumConstraint.limit && S.terms().sumConstraint.limit.max;
			return cj.correctNumbers(constraint || common) ? constraint || common : null;
		},
		maxTerminal: function maxTerminal() {
			return Number(S.get(K.SESSION.PROVIDER.MAX_SUM)) || Number.MAX_VALUE;
		}
	},
	/* ----------- Payment session data ----------- */
	// TODO: Пересмотреть changeOption, сделать его "пустым" и не пустым, найти все зависимости от него.
	changeOption: function changeOption(val) {
		if (K.CHANGE.contains(val) || val === '') S.set(K.SESSION.PAYMENT.CHANGE_TYPE, val);
		return S.get(K.SESSION.PAYMENT.CHANGE_TYPE);
	},
	paymentMethod: function paymentMethod(val) {
		return S._prop(K.SESSION.PAYMENT.METHOD, val);
	},
	/* -------------- Phone & Pin -------------- */
	phone: function phone(val) {
		return S._prop(K.SESSION.USER.PHONE.NUMBER, val);
	},
	phoneFormatted: function phoneFormatted() {
		try {
			return S.phone().replace(/^(\d{3})(\d{3})(\d{2})(\d{2})/, '+7($1)$2-$3-$4');
		} catch (e) {
			return '';
		}
	},
	pin: function pin(val) {
		return S._prop(K.SESSION.USER.PHONE.PIN, val);
	},
	/* -------------- Other -------------- */
	terminalID: function terminalID(val) {
		return S._prop(K.SESSION.TERMINAL.ID, val);
	},
	walletBalance: function walletBalance(val) {
		return Number(S._prop(K.SESSION.USER.WALLET_BALANCE, val));
	}
}, {
	form: { /* ------------ SINAP Config -------------- */

		get: function get() {
			return S.get(K.SESSION.FORM);
		},
		set: function set(val) {
			S.set(K.SESSION.FORM, val);
		},
		configurable: true,
		enumerable: true
	}
});

if (window.waitsForSession) Array.prototype.slice.call(window.waitsForSession).forEach(function (value) {
	return S.set(val.key, val.value);
});
cj.statistics = {

	_appId: 30075,
	_start: new Date().toLocaleFormat('%d.%m.%Y %H:%M:%S'),
	_test: false,

	_send: function _send(type, data) {
		var obj,
		    page = cj.APP.pageName;
		data = data ? data.map(function (item) {
			return item.toString();
		}) : {};

		// Проверка типа страницы
		if (page === K.STAT.SHOW.FORM_CONTAINER) page = cj.APP._fieldName;else if (!K.STAT.SHOW.containsString(page)) {
			this._report(K.STAT.INTERNAL_ERRORS.INVALID_PAGE);
			page = K.STAT.SHOW.INVALID;
		}

		// Проверка типа статистики
		if (!type) this._report(K.STAT.INTERNAL_ERRORS.UNDEFINED_TYPE);
		if (!K.STAT.TYPES.containsString(type)) {
			this._report(K.STAT.INTERNAL_ERRORS.INVALID_TYPE);
			type = K.STAT.TYPES.UNKNOWN;
		}

		data.app_name = cj.APP.version.split(' ')[0];
		data.app_version = cj.APP.version.split(' ')[1];
		// Собираем объект
		obj = {
			type: type,
			page: page,
			date: new Date().toLocaleFormat('%d.%m.%Y %H:%M:%S'),
			data: data
		};
		cj.maratl.send(K.MARATL.STATISTICS, JSON.stringify(obj));
	},

	_report: function _report(error) {
		debugger;
		console.log("Internal error: " + error);
		return;
		// TODO: Подумать, нужно ли отсылать статистику по внутренним ошибкам
		cj.maratl.send(K.MARATL.STATISTICS, JSON.stringify({
			type: K.STAT.TYPES.INTERNAL_ERROR,
			page: cj && cj.APP && cj.APP.pageName || null,
			date: new Date().toLocaleFormat('%d.%m.%Y %H:%M:%S'),
			data: {
				code: error,
				app_name: cj.APP.version.split(' ')[0],
				app_version: cj.APP.version.split(' ')[1]
			}
		}));
	},

	init: function init() {
		if (!(this._appId && this._start && cj.APP.version && S.qd())) this._report(K.STAT.INTERNAL_ERRORS.INITIALIZATION);
		var o = {
			provider: S.qd(true),
			qw_provider: S.qw()
		};
		if (!o.qw_provider) delete o.qw_provider;
		this._send(K.STAT.TYPES.INITIALIZATION, o);
	},

	page: function page(data) {
		if (data === K.NAV.FORM) return;
		this._send(K.STAT.TYPES.PAGE_SHOWN);
	},

	page_data: function page_data(data) {
		if (!this._test) {
			if (data.fields) data = data.fields;else if (data.sum) data = { sum: data.sum };else if (data.phone) data = { phone: data.phone };else if (data.trm_txn_id) data = { trm_txn_id: data.trm_txn_id };else data = K.STAT.UNDEFINED_PAGE_DATA;
		}
		this._send(K.STAT.TYPES.PAGE_DATA, data);
	},

	online: function online(_ref20) {
		var type = _ref20.type;
		var result = _ref20.result;

		if (cj.nullOrUndefined(type)) this._report(K.STAT.INTERNAL_ERRORS.ONLINE.INVALID_TYPE);
		if (!cj.nullOrUndefined(type) && cj.nullOrUndefined(result)) this._report(K.STAT.INTERNAL_ERRORS.ONLINE.UNDEFINED_RESULT_CODE);

		this._send(K.STAT.TYPES.ONLINE_ACTION, _defineProperty({}, type, result));
	},

	error: function error(_ref21, exit) {
		var type = _ref21.type;
		var message = _ref21.message;
		var code = _ref21.onlineCode;

		debugger;
		if (!K.STAT.ERRORS.containsString(type)) this._report(K.STAT.INTERNAL_ERRORS.UNDEFINED_ERROR);
		var data = { type: type, code: code, message: cj.APP.errorCodes[Number(type)] || 'Недокументированная ошибка.' };
		if (!data.code) delete data.code;
		this._send(K.STAT.TYPES.ERROR, data);
		if (exit) if (cj.APP.appView && cj.APP.appView._currentPage) cj.APP.appView._currentPage.showPopup(cj.views.PopupView.errorPopup({
			title: 'Техническая ошибка',
			message: 'Невозможно совершить платеж на этом терминале'
		})).then(function () {
			return cj.APP.appView._currentPage.changePage(K.NAV.EXIT);
		});else throw new Error(type);
	},

	validation: function validation(data) {
		if (!this._test) {
			data = {
				type: data.type,
				result: data.result
			};
			if (!K.STAT.VALIDATION.containsString(data.type)) {
				this._report(K.STAT.INTERNAL_ERRORS.VALIDATION.UNDEFINED_TYPE);
				data.type = K.STAT.VALIDATION.UNDEFINED;
				delete data.result;
			} else if (isNaN(Number(data.result))) {
				this._report(K.STAT.INTERNAL_ERRORS.VALIDATION.INVALID_RESULT_CODE);
				data.result = -1;
			}
		}
		this._send(K.STAT.TYPES.VALIDATION, data);
	},

	navigate: function navigate(data) {
		if (!this._test) {
			data = {
				type: data.type
			};
			if (!data.type) {
				this._report(K.STAT.INTERNAL_ERRORS.NAVIGATE.UNDEFINED_TYPE);
				data.type = K.STAT.NAVIGATE.UNDEFINED;
			}
			if (!K.STAT.NAVIGATE.containsString(data.type)) {
				this._report(K.STAT.INTERNAL_ERRORS.NAVIGATE.INVALID_TYPE);
				data.type = K.STAT.NAVIGATE.UNDEFINED;
			}
		}
		this._send(K.STAT.TYPES.NAVIGATE, data);
	},

	click: function click(_ref22) {
		var type = _ref22.type;
		var value = _ref22.value;

		if (!this._test) {
			if (!type) {
				this._report(K.STAT.INTERNAL_ERRORS.CLICK.UNDEFINED_TYPE);
				type = K.STAT.CLICK.BUTTON.UNDEFINED;
			}
			if (!K.STAT.CLICK.TYPES.containsString(type)) {
				this._report(K.STAT.INTERNAL_ERRORS.CLICK.INVALID_TYPE);
				type = K.STAT.CLICK.BUTTON.UNDEFINED;
			}
			if (!value) {
				value = K.STAT.CLICK.BUTTON.UNDEFINED;
				this._report(K.STAT.INTERNAL_ERRORS.CLICK.UNDEFINED_BUTTON_TYPE);
			}
			if (type === K.STAT.CLICK.TYPES.BUTTON && !K.STAT.CLICK.BUTTON.containsString(value)) {
				value = K.STAT.CLICK.BUTTON.UNDEFINED;
				this._report(K.STAT.INTERNAL_ERRORS.CLICK.INVALID_BUTTON_TYPE);
			}
		}
		this._send(K.STAT.TYPES.CLICK, _defineProperty({}, type, value));
	},

	popup: function popup(data) {
		if (!this._test) {
			data = {
				type: data.type
			};
			if (!data.type) {
				this._report(K.STAT.INTERNAL_ERRORS.POPUP.UNDEFINED_TYPE);
				data.type = K.STAT.POPUP.UNDEFINED;
			}
			if (!K.STAT.POPUP.containsString(data.type)) {
				data.type = K.STAT.POPUP.UNDEFINED;
				this._report(K.STAT.INTERNAL_ERRORS.POPUP.INVALID_TYPE);
			}
		}
		this._send(K.STAT.TYPES.POPUP_SHOWN, data);
	},

	money: function money(data) {
		if (!this._test) {
			if (!cj.nullOrUndefined(data.value)) {
				if (!cj.correctNumbers(data.value)) this._report(K.STAT.INTERNAL_ERRORS.MONEY.INVALID_DATA_INSERTED);
				this._send(K.STAT.TYPES.MONEY_INSERTED, {
					value: Number(data.value) || 0
				});
			} else if (!cj.nullOrUndefined(data.to_provider, data.to_change, data.cash)) {
				if (!cj.correctNumbers(data.cash, data.to_provider, data.to_change)) {
					if (!cj.correctNumbers(data.cash)) this._report(K.STAT.INTERNAL_ERRORS.MONEY.CASH_NAN);
					if (!cj.correctNumbers(data.to_provider)) this._report(K.STAT.INTERNAL_ERRORS.MONEY.PROVIDER_NAN);
					if (!cj.correctNumbers(data.to_change)) this._report(K.STAT.INTERNAL_ERRORS.MONEY.CHANGE_NAN);
					this._report(K.STAT.INTERNAL_ERRORS.MONEY.INVALID_DATA_PAYED);
				}
				this._send(K.STAT.TYPES.MONEY_PAYED, {
					cash: Number(data.cash) || 0,
					to_provider: Number(data.to_provider) || 0,
					to_change: Number(data.to_change) || 0
				});
			} else this._report(K.STAT.INTERNAL_ERRORS.MONEY.INVALID_DATA_UNKNOWN);
			return;
		}
		this._send(K.STAT.TYPES.MONEY_PAYED, {
			value: Number(data.value) || 0,
			cash: Number(data.cash) || 0,
			to_provider: Number(data.to_provider) || 0,
			to_change: Number(data.to_change) || 0
		});
	},

	exit: function exit(data) {
		if (!data.type) {
			this._report(K.STAT.INTERNAL_ERRORS.EXIT.UNDEFINED_EXIT_CODE);
			data.type = K.STAT.EXIT.UNDEFINED;
		}
		if (!this._test) {
			data = {
				type: data.type
			};
			if (!K.STAT.EXIT.containsString(data.type)) {
				this._report(K.STAT.INTERNAL_ERRORS.EXIT.INVALID_EXIT_CODE);
				data.type = K.STAT.EXIT.UNDEFINED;
			}
		}
		this._send(K.STAT.TYPES.EXIT, data);
	}
};
cj.timeout = {
	DEFAULT_TIMEOUT: 2 * 60 * 1000,
	ONLINE_TIMEOUT: 1.5 * 60 * 1000,
	RETRY_TIMEOUT: 5 * 1000,
	PAYMENT_TIMEOUT: 10 * 60 * 1000,
	clickResetEnabled: true,
	current: -1,
	events: [],
	reset: function reset(time) {
		var _this16 = this;

		this.turnOff();
		this._current = setTimeout(function () {
			return cj.maratl.emulator ? null : _this16.trigger();
		}, Number(time) || cj.timeout.DEFAULT_TIMEOUT);
		return this;
	},
	turnOff: function turnOff() {
		if (this._current !== -1) clearTimeout(this._current);
	},
	trigger: function trigger() {
		this.events.forEach(function (cb) {
			return cb();
		});return this;
	},
	on: function on(callback) {
		this.events.push(callback);return this;
	},
	off: function off() {
		this.events = [];return this;
	}
};
cj.sinap.Form = (function () {
	function _class9(container, receipt, miscInfo) {
		_classCallCheck(this, _class9);

		this._currentFieldIndex = 0;
		this._container = container;
		this.receipt = receipt;
		this.miscInfo = miscInfo;
		this.refresh();
	}

	_createClass(_class9, [{
		key: "refresh",
		value: function refresh() {
			this._currentEditableFieldSet = [];
			this.collectFields(this._container, true);
		}
	}, {
		key: "collectFields",
		value: function collectFields(container, initial) {
			var _this17 = this;

			var elements = container.elements;
			// Случай, когда нет отображаемых элементов, но есть профиль комиссии или чека
			// TODO: По уму сделай!
			if (initial && container.terms) this._defaultTerms = container.terms;
			if (!elements) {
				var el = this._currentEditableFieldSet.pop();
				if (container.terms) el._terms = container.terms;
				this._currentEditableFieldSet.push(el);
				return;
			}
			elements.forEach(function (el) {
				if (!initial) el._terms = container.terms || null;
				switch (el.type) {
					case cj.sinap.elements.TYPE.FIELD:
						_this17._currentEditableFieldSet.push(el);
						break;
					case cj.sinap.elements.TYPE.REFERENCE:
						if (el.isActivated && !el.container.elements) if (el.container.terms) el._terms = el.container.terms;
						_this17._currentEditableFieldSet.push(el);
						if (el.isActivated) _this17.collectFields(el.container);
						break;
					case cj.sinap.elements.TYPE.DEPENDENCY:
						if (el.result(_this17.fields)) _this17.collectFields(el.container);
				}
			});
		}
	}, {
		key: "updateOnline",
		value: function updateOnline() {
			var _this18 = this;

			return new cj.sinap.Request("refs/" + this.currentField().id + "/containers", 'POST', this.currentField().params(this.values)).then(function (response) {
				var res;
				try {
					return (res = new cj.sinap.Container(response)) ? Promise.resolve(_this18.currentField().container = res) : Promise.reject('Контейнер отсутствует');
				} catch (e) {
					return Promise.reject('Техническая ошибка');
				}
			})["catch"](function (_ref23) {
				var message = _ref23.message;
				var code = _ref23.code;

				cj.statistics.error({ type: K.STAT.ERRORS.USER.FORM.FAIL, onlineCode: code });
				return Promise.reject(message);
			});
		}
	}, {
		key: "fieldWithName",
		value: function fieldWithName(fieldName) {
			return this._currentEditableFieldSet.filter(function (item) {
				return item.type === cj.sinap.elements.TYPE.FIELD && item.name === fieldName;
			})[0];
		}
	}, {
		key: "update",
		value: function update(fieldname, value) {
			var f;
			return (f = this.fieldWithName(fieldname)) ? f.value = value : null;
		}
	}, {
		key: "get",
		value: function get(fieldname) {
			var f;
			return (f = this.fieldWithName(fieldname)) ? f.value : null;
		}
	}, {
		key: "clear",
		value: function clear() {
			this.fields.forEach(function (field) {
				return field.value = null;
			});
			this.refresh();
			this._currentFieldIndex = 0;
		}
	}, {
		key: "unsubmitAllFields",
		value: function unsubmitAllFields() {
			// Единственное место где это вызывается - при изменении формы
			// Поэтому позволим себе вольность и не будем разсабмичивать сгенерированное поле избранного,
			// а также поле с типом аккаунта (почему? исторически, но тут есть догадка:
			// пользователь выбирал "пополнение карты" или "пополнение счета" на экране избранного и вряд ли он хочет менять тип платежа).
			this._currentEditableFieldSet.forEach(function (field) {
				if (field.name === K.FIELDS.ACCOUNT_TYPE || field.title === K.FIELDS.WELCOME_MAGIC) return;
				if (field.type === cj.sinap.elements.TYPE.FIELD) field.unsubmit();else field.container = null;
			});
			this.refresh();
			this._currentFieldIndex = this._currentEditableFieldSet.map(function (field, index) {
				return field.type === cj.sinap.elements.TYPE.FIELD && !field.submitted || field.type === cj.sinap.elements.TYPE.REFERENCE && !field.isActivated ? index : null;
			}).filter(function (index) {
				return index !== null;
			})[0];
		}
	}, {
		key: "currentField",
		value: function currentField() {
			return this._currentEditableFieldSet[this._currentFieldIndex];
		}
	}, {
		key: "currentMainField",
		value: function currentMainField() {
			var _this19 = this;

			return this._currentEditableFieldSet.filter(function (f) {
				return f.subfields && f.subfields.indexOf(_this19.currentField()) !== -1;
			})[0] || this.currentField();
		}
	}, {
		key: "terms",
		value: function terms(needFirst) {
			return [this._defaultTerms].concat(this._currentEditableFieldSet.filter(function (field) {
				return field._terms;
			}).map(function (field) {
				return field._terms;
			}))[needFirst ? 'concat' : 'reverse']()[0] || null;
		}
	}, {
		key: "hasPreviousField",
		value: function hasPreviousField() {
			return this._currentFieldIndex > 0;
		}
	}, {
		key: "hasNextField",
		value: function hasNextField() {
			return this._currentFieldIndex < this._currentEditableFieldSet.length - 1;
		}
	}, {
		key: "goToNextField",
		value: function goToNextField() {
			this._currentFieldIndex++;
		}
	}, {
		key: "goToPreviousField",
		value: function goToPreviousField() {
			this._currentFieldIndex--;
		}
	}, {
		key: "layoutForField",
		value: function layoutForField(field) {
			if (!field || field.type !== cj.sinap.elements.TYPE.FIELD || field.hidden) return cj.sinap.layouts.NONE;
			return field.layout;
		}
	}, {
		key: "currentFieldLayout",
		value: function currentFieldLayout() {
			return this.layoutForField(this.currentField());
		}
	}, {
		key: "currentFieldIsFirst",
		value: function currentFieldIsFirst(hiddenWelcome) {
			var _this20 = this;

			return this._currentEditableFieldSet.filter(function (item, index) {
				return index < _this20._currentFieldIndex;
			}).filter(function (item) {
				var layout = _this20.layoutForField(item);
				return !(layout === cj.sinap.layouts.NONE || hiddenWelcome && layout === cj.sinap.layouts.WELCOME);
			}).length === 0;
		}
	}, {
		key: "currentFieldIndex",
		get: function get() {
			return this._currentFieldIndex;
		}
	}, {
		key: "values",
		get: function get() {
			return this.fields.filter(function (field) {
				return field.submitted;
			}).reduce(function (res, field) {
				res[field.name] = field.value;
				return res;
			}, {});
		}
	}, {
		key: "fields",
		get: function get() {
			return this._currentEditableFieldSet.filter(function (item) {
				return item.type === cj.sinap.elements.TYPE.FIELD && item.title !== K.FIELDS.WELCOME_MAGIC;
			});
		}
	}]);

	return _class9;
})();
cj.sinap.Request = (function () {
	function _class10(tailURL, method, data) {
		var _this21 = this;

		_classCallCheck(this, _class10);

		// ultra костыль
		if (data && data.fields) data.assign({
			sum: data.sum || {
				amount: '0',
				currency: K.RUB_CURRENCY_CODE
			},
			id: data.id || '-1',
			source: data.source || K.PAYMENT.CASH
		});
		this._command = tailURL.split('/').pop();
		var request = {
			path: tailURL,
			method: method || 'GET',
			headers: (function () {
				var f = _this21._command === 'validations';
				return {
					'Authorization': 'Kiosk ' + btoa([S.terminalID(), '7' + (f ? '1115666665' : S.phone()), f ? '5689' : S.pin()].join(':')),
					'User-Agent': cj.APP.version,
					'Content-Type': 'application/json'
				};
			})(),
			request: data || null
		};
		if (!request.request) delete request.request;
		return cj.maratl.send(K.MARATL.REQ.SINAP_ONLINE, JSON.stringify(request), K.MARATL.RESP.SINAP_ONLINE, null, cj.timeout.ONLINE_TIMEOUT).then(function (_ref24) {
			var _ref24$K$MARATL$RESP$SINAP_ONLINE = _ref24[K.MARATL.RESP.SINAP_ONLINE];
			var data = _ref24$K$MARATL$RESP$SINAP_ONLINE === undefined ? { 'result-code': 600 } : _ref24$K$MARATL$RESP$SINAP_ONLINE;

			try {
				var _JSON$parse2 = JSON.parse(data);

				var _JSON$parse2$response = _JSON$parse2.response;
				var response = _JSON$parse2$response === undefined ? {} : _JSON$parse2$response;
				var transport = _JSON$parse2.transporterrorcode;
				var result = _JSON$parse2['result-code'];
				var http = _JSON$parse2.httperrorcode;

				cj.statistics.online({
					type: _this21._command,
					result: result
				});
				switch (transport) {
					case 0:
						switch (http) {
							case 0:
							// fall-through
							case 200:
								if (!response.code && !response.message) return Promise.resolve(response);
							// fall-through
							default:
								return Promise.reject({
									code: response.code || http || -1,
									title: 'Ошибка',
									message: response.message || 'Техническая ошибка.'
								});
						}
					default:
						return Promise.reject({
							code: 600,
							title: 'Ошибка сети',
							message: 'Превышено время ожидания ответа от сервера. Повторите попытку позднее.'
						});
				}
			} catch (e) {
				return Promise.reject({
					code: -1,
					message: 'Произошла техническая ошибка. Повторите попытку позднее.'
				});
			}
		});
	}

	return _class10;
})();

cj.sinap.conditions.Parse = function (_ref25) {
	var type = _ref25.type;
	var field = _ref25.field;
	var predicate = _ref25.predicate;
	var conditions = _ref25.conditions;

	if (!type) cj.statistics.error('New error', true);
	switch (type) {
		case cj.sinap.conditions.TYPE.PREDICATE:
			return new cj.sinap.conditions.PredicateCondition({ field: field, predicate: predicate });
		case cj.sinap.conditions.TYPE.VALIDITY:
			return new cj.sinap.conditions.ValidityCondition({ field: field });
		case cj.sinap.conditions.TYPE.AND:
			return new cj.sinap.conditions.AndCondition({ conditions: conditions });
	}
	cj.statistics.error({ type: K.STAT.ERRORS.SINAP.PARSING.INVALID_CONDITION_TYPE }, true);
};

cj.sinap.conditions.TYPE = {
	VALIDITY: 'validity',
	PREDICATE: 'predicate',
	AND: 'and'
};

cj.sinap.conditions.ValidityCondition = (function () {
	function _class11(_ref26) {
		var field = _ref26.field;

		_classCallCheck(this, _class11);

		if (!field) cj.statistics.error('New error', true);
		this.field = field.toString();
	}

	_createClass(_class11, [{
		key: "getField",
		value: function getField() {
			var _this22 = this;

			var fields = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

			return fields.filter(function (field) {
				return field.name === _this22.field;
			})[0];
		}
	}, {
		key: "result",
		value: function result(fields) {
			var f = this.getField(fields);
			return f && f.submitted && f.valid;
		}
	}]);

	return _class11;
})();

cj.sinap.conditions.PredicateCondition = (function (_cj$sinap$conditions$ValidityCondition) {
	_inherits(_class12, _cj$sinap$conditions$ValidityCondition);

	function _class12(_ref27) {
		var field = _ref27.field;
		var predicate = _ref27.predicate;

		_classCallCheck(this, _class12);

		_get(Object.getPrototypeOf(_class12.prototype), "constructor", this).call(this, { field: field });
		if (!predicate) cj.statistics.error('New error', true);
		this.predicate = cj.sinap.predicates.Parse(predicate);
	}

	_createClass(_class12, [{
		key: "result",
		value: function result(fields) {
			var f = this.getField(fields);
			return f && f.submitted && this.predicate.execute(f.value);
		}
	}]);

	return _class12;
})(cj.sinap.conditions.ValidityCondition);

cj.sinap.conditions.AndCondition = (function () {
	function _class13(_ref28) {
		var conditions = _ref28.conditions;

		_classCallCheck(this, _class13);

		if (!conditions || !(conditions instanceof Array)) cj.statistics.error('New error', true);
		this.conditions = conditions.map(function (item) {
			return cj.sinap.conditions.Parse(item);
		});
	}

	_createClass(_class13, [{
		key: "result",
		value: function result(fields) {
			return !this.conditions.filter(function (c) {
				return !c.result(fields);
			}).length;
		}
	}]);

	return _class13;
})();
cj.sinap.elements.Parse = function (element, isWelcome) {
	if (!element) return cj.statistics.error({ type: K.STAT.ERRORS.SINAP.PARSING.NO_ELEMENT }, true);
	switch (element.type) {
		case cj.sinap.elements.TYPE.FIELD:
			return cj.sinap.elements.Field(element, isWelcome);
		case cj.sinap.elements.TYPE.DEPENDENCY:
			return new cj.sinap.elements.Dependency(element);
		case cj.sinap.elements.TYPE.REFERENCE:
			return new cj.sinap.elements.Reference(element);
	}
	return cj.statistics.error('New error', true);
};

cj.sinap.elements.TYPE = {
	FIELD: 'field',
	DEPENDENCY: 'dependency',
	REFERENCE: 'ref'
};

cj.sinap.elements.Dependency = (function () {
	function _class14(_ref29) {
		var condition = _ref29.condition;
		var content = _ref29.content;

		_classCallCheck(this, _class14);

		if (!condition || !content) return cj.statistics.error('New error', true);
		this.condition = cj.sinap.conditions.Parse(condition);
		this.container = new cj.sinap.Container(content);
	}

	_createClass(_class14, [{
		key: "result",
		value: function result(fields) {
			return this.condition.result(fields);
		}
	}, {
		key: "type",
		get: function get() {
			return cj.sinap.elements.TYPE.DEPENDENCY;
		}
	}]);

	return _class14;
})();

cj.sinap.elements.Reference = (function () {
	function _class15(_ref30) {
		var id = _ref30.id;
		var title = _ref30.title;
		var message = _ref30.message;
		var params = _ref30.params;

		_classCallCheck(this, _class15);

		if (!id || !title || !message || !params) return cj.statistics.error('New error', true);
		this.id = id;
		this.title = title;
		this.params = params;
		this.container = null;

		this.isFirst = false;
	}

	_createClass(_class15, [{
		key: "type",
		get: function get() {
			return cj.sinap.elements.TYPE.REFERENCE;
		}
	}, {
		key: "params",
		get: function get() {
			var _this23 = this;

			return function (values) {
				return _this23._params.reduce(function (obj, fieldName) {
					obj[fieldName] = values[fieldName];
					return obj;
				}, {});
			};
		},
		set: function set(params) {
			this._params = params.map(function (param) {
				return param.field;
			});
		}
	}, {
		key: "isActivated",
		get: function get() {
			return !!this.container;
		}
	}]);

	return _class15;
})();

cj.sinap.elements.Field = function (config, welcome) {
	if (welcome) return new cj.sinap.elements.fields.WelcomeField(config);
	if (!config.name) return cj.statistics.error('New error', true);
	if (!config.view) return new cj.sinap.elements.fields.HiddenField(config);
	switch (config.view.widget.type) {
		case cj.sinap.widgets.TYPE.INFO:
			return new cj.sinap.elements.fields.ConstField(config);
		case cj.sinap.widgets.TYPE.RADIO:
		case cj.sinap.widgets.TYPE.LIST:
			return new cj.sinap.elements.fields.ChoiceField(config);
		case cj.sinap.widgets.TYPE.SWITCH:
			return new cj.sinap.elements.fields.SwitchField(config);
		case cj.sinap.widgets.TYPE.TEXT:
		case cj.sinap.widgets.TYPE.MASKED:
		case cj.sinap.widgets.TYPE.EXPIRATION_DATE:
		case cj.sinap.widgets.TYPE.DATE:
			return new cj.sinap.elements.fields[config.subfields ? 'MultiField' : 'RegularField'](config);
	}
	return cj.statistics.error('New error', true);
};
cj.sinap.elements.fields.Base = (function () {
	function _class16(_ref31) {
		var name = _ref31.name;
		var hidden = _ref31.hidden;

		_classCallCheck(this, _class16);

		if (!name) cj.statistics.error('New error', true);
		this._name = name;
		this._hidden = hidden;
	}

	_createClass(_class16, [{
		key: "submit",
		value: function submit() {
			this.submitted = true;
		}
	}, {
		key: "unsubmit",
		value: function unsubmit() {
			this.submitted = false;
		}

		// Заглушка для маски
	}, {
		key: "suggests",

		// Семантики
		value: function suggests() {
			return [];
		}
	}, {
		key: "type",
		get: function get() {
			return cj.sinap.elements.TYPE.FIELD;
		}
	}, {
		key: "name",
		get: function get() {
			return this._name;
		}
	}, {
		key: "value",
		get: function get() {
			return this._value;
		},
		set: function set(v) {
			this.unsubmit();
			if (!v) return this._value = null;
			return this._value = v.toString().replace(/=|&|<|>|"|'/g, '');
		}
	}, {
		key: "securedValue",
		get: function get() {
			return this.value;
		}
	}, {
		key: "maskedValue",
		get: function get() {
			return this.value;
		}
	}, {
		key: "restoredValue",
		get: function get() {
			return this.value;
		}
	}, {
		key: "mask",
		get: function get() {
			return null;
		}

		// Заглушки для view-типов
	}, {
		key: "info",
		get: function get() {
			return '';
		}
	}, {
		key: "title",
		get: function get() {
			return '';
		}
	}, {
		key: "prompt",
		get: function get() {
			return '';
		}
	}, {
		key: "sideInfo",
		get: function get() {
			return '';
		}

		// Заглушки для валидации
	}, {
		key: "valid",
		get: function get() {
			return true;
		}
	}, {
		key: "errorMessage",
		get: function get() {
			return 'Ошибка данных';
		}

		// Заглушка для лэйаута
	}, {
		key: "layout",
		get: function get() {
			return this._hidden ? cj.sinap.layouts.NONE : null;
		}
	}, {
		key: "hidden",
		get: function get() {
			return this._hidden;
		}

		// Костыль для групп полей
	}, {
		key: "displayable",
		get: function get() {
			return [cj.sinap.layouts.NONE, cj.sinap.layouts.BUTTONS, cj.sinap.layouts.WELCOME].indexOf(this.layout) === -1;
		}
	}], [{
		key: "secure",
		value: function secure(v) {
			// TODO: less hardcode, more formatter.
			var lengthWithoutSpaces = v.replace(/ /g, '').length;
			var maskLeft = lengthWithoutSpaces - Math.floor(lengthWithoutSpaces / 4) * 2;
			var symbolsParsed = 0;
			return v.split('').map(function (char) {
				return char !== ' ' && ++symbolsParsed && symbolsParsed > Math.floor(lengthWithoutSpaces / 4) && maskLeft ? maskLeft-- && 'X' : char;
			}).join('');
		}
	}]);

	return _class16;
})();
cj.sinap.elements.fields.Viewable = (function (_cj$sinap$elements$fields$Base) {
	_inherits(_class17, _cj$sinap$elements$fields$Base);

	function _class17(_ref32) {
		var name = _ref32.name;
		var hidden = _ref32.hidden;
		var view = _ref32.view;
		var hideFromConfirmationScreen = _ref32.hideFromConfirmationScreen;

		_classCallCheck(this, _class17);

		_get(Object.getPrototypeOf(_class17.prototype), "constructor", this).call(this, { name: name, hidden: hidden });
		if (!view) cj.statistics.error('New error', true);
		if (cj.nullOrUndefined(view.title) || !view.widget) cj.statistics.error('New error', true);
		this._title = (view.title || '').toString();
		this._info = (view.info || '').toString();
		this._sideInfo = (view.sideInfo || '').toString();
		this._prompt = (view.prompt || '').toString();
		this._hidden = this._hidden === undefined ? !!view.hidden : this._hidden;
		this.hideOnConfirm = hideFromConfirmationScreen === 'true' || hideFromConfirmationScreen === true || false;
	}

	_createClass(_class17, [{
		key: "value",
		get: function get() {
			return this.widget.prepare(_get(Object.getPrototypeOf(_class17.prototype), "value", this));
		},
		set: function set(v) {
			return _set(Object.getPrototypeOf(_class17.prototype), "value", v, this);
		}
	}, {
		key: "securedValue",
		get: function get() {
			return this.widget.displayValue(this.value);
		}
	}, {
		key: "restoredValue",
		get: function get() {
			return this.widget.restore(this.value);
		}
	}, {
		key: "info",
		get: function get() {
			return this._info;
		}
	}, {
		key: "groupTitle",
		get: function get() {
			return this._groupTitle || '';
		}
	}, {
		key: "title",
		get: function get() {
			return this._title;
		}
	}, {
		key: "prompt",
		get: function get() {
			return this._prompt;
		}
	}, {
		key: "sideInfo",
		get: function get() {
			return this._sideInfo;
		}
	}]);

	return _class17;
})(cj.sinap.elements.fields.Base);
cj.sinap.elements.fields.SwitchField = (function (_cj$sinap$elements$fields$Viewable) {
	_inherits(_class18, _cj$sinap$elements$fields$Viewable);

	function _class18(_ref33) {
		var name = _ref33.name;
		var hidden = _ref33.hidden;
		var view = _ref33.view;

		_classCallCheck(this, _class18);

		_get(Object.getPrototypeOf(_class18.prototype), "constructor", this).call(this, { name: name, hidden: hidden, view: view, hideFromConfirmationScreen: true });
		if (!view || !view.widget) cj.statistics.error('New error', true);
		this.widget = new cj.sinap.widgets.SwitchWidget(view.widget);
		this["switch"]();
	}

	_createClass(_class18, [{
		key: "switch",
		value: function _switch() {
			this._value = this._value === this.widget.offValue ? this.widget.onValue : this.widget.offValue;
			return this.isOn();
		}
	}, {
		key: "isOn",
		value: function isOn() {
			return this._value === this.widget.onValue;
		}
	}, {
		key: "layout",
		get: function get() {
			return _get(Object.getPrototypeOf(_class18.prototype), "layout", this) || cj.sinap.layouts.NONE;
		}
	}]);

	return _class18;
})(cj.sinap.elements.fields.Viewable);
cj.sinap.elements.fields.ChoiceField = (function (_cj$sinap$elements$fields$Viewable2) {
	_inherits(_class19, _cj$sinap$elements$fields$Viewable2);

	function _class19(_ref34) {
		var name = _ref34.name;
		var hidden = _ref34.hidden;
		var view = _ref34.view;
		var hideFromConfirmationScreen = _ref34.hideFromConfirmationScreen;
		var groupTitle = _ref34.groupTitle;
		var subfields = _ref34.subfields;

		_classCallCheck(this, _class19);

		_get(Object.getPrototypeOf(_class19.prototype), "constructor", this).call(this, { name: name, hidden: hidden, view: view, hideFromConfirmationScreen: hideFromConfirmationScreen });
		if (!view) return cj.statistics.error('New error', true);
		this._switches = subfields && subfields.slice(1) || [];
		this._groupTitle = groupTitle || null;
		this.widget = view.widget.type === cj.sinap.widgets.TYPE.RADIO && !view.widget.expansion ? new cj.sinap.widgets.RadioWidget({
			choices: view.widget.choices,
			expansion: view.widget.expansion
		}) : new cj.sinap.widgets.ListWidget({ choices: view.widget.choices });
	}

	_createClass(_class19, [{
		key: "switches",
		get: function get() {
			return this._switches.filter(function (field) {
				return S.form.fieldWithName(field) instanceof cj.sinap.elements.fields.SwitchField;
			});
		}
	}, {
		key: "layout",
		get: function get() {
			if (_get(Object.getPrototypeOf(_class19.prototype), "layout", this)) return _get(Object.getPrototypeOf(_class19.prototype), "layout", this);
			switch (this.widget.type) {
				case cj.sinap.widgets.TYPE.RADIO:
					return cj.sinap.layouts.BUTTONS;
				case cj.sinap.widgets.TYPE.LIST:
					return cj.sinap.layouts.LIST;
			}
			return cj.statistics.error('New error', true);
		}
	}]);

	return _class19;
})(cj.sinap.elements.fields.Viewable);
cj.sinap.elements.fields.WelcomeField = (function (_cj$sinap$elements$fields$ChoiceField) {
	_inherits(_class20, _cj$sinap$elements$fields$ChoiceField);

	function _class20(_ref35) {
		var name = _ref35.name;
		var hidden = _ref35.hidden;
		var view = _ref35.view;
		var hideFromConfirmationScreen = _ref35.hideFromConfirmationScreen;

		_classCallCheck(this, _class20);

		_get(Object.getPrototypeOf(_class20.prototype), "constructor", this).call(this, { name: name || K.FIELDS.WELCOME, hidden: hidden, view: view || {
				widget: {
					choices: [{
						title: name || 'Новый платеж',
						// Когда-нибудь обязательно возникнет вопрос - почему 6? Смотри scss на предмет класса account-type-{num},
						// причем num = ((field.value <= 5) ? field.value : other)
						// Для класса account-type-other на кнопке картинка листика! :)
						value: '6'
					}]
				},
				title: K.FIELDS.WELCOME_MAGIC
			}, hideFromConfirmationScreen: hideFromConfirmationScreen });
	}

	_createClass(_class20, [{
		key: "layout",
		get: function get() {
			return cj.sinap.layouts.WELCOME;
		}
	}]);

	return _class20;
})(cj.sinap.elements.fields.ChoiceField);
cj.sinap.elements.fields.ConstField = (function (_cj$sinap$elements$fields$Viewable3) {
	_inherits(_class21, _cj$sinap$elements$fields$Viewable3);

	function _class21(_ref36) {
		var name = _ref36.name;
		var value = _ref36.value;
		var hidden = _ref36.hidden;
		var view = _ref36.view;
		var hideFromConfirmationScreen = _ref36.hideFromConfirmationScreen;
		var subfields = _ref36.subfields;
		var groupTitle = _ref36.groupTitle;

		_classCallCheck(this, _class21);

		_get(Object.getPrototypeOf(_class21.prototype), "constructor", this).call(this, { name: name, hidden: hidden, view: view, hideFromConfirmationScreen: hideFromConfirmationScreen });
		this._fields = subfields || null;
		this._groupTitle = groupTitle || null;
		this._value = value;
		this.widget = new cj.sinap.widgets.InfoWidget(view.widget);
	}

	_createClass(_class21, [{
		key: "fields",
		get: function get() {
			return this._fields ? this._fields.map(function (name) {
				return S.form.fieldWithName(name);
			}) : [this];
		}
	}, {
		key: "switches",
		get: function get() {
			return this.fields.filter(function (field) {
				return field instanceof cj.sinap.elements.fields.SwitchField;
			}).map(function (field) {
				return field.name;
			});
		}
	}, {
		key: "subfields",
		get: function get() {
			return this.fields.filter(function (f, i) {
				return i !== 0;
			});
		}
	}, {
		key: "layout",
		get: function get() {
			return _get(Object.getPrototypeOf(_class21.prototype), "layout", this) || cj.sinap.layouts.INFO;
		}
	}, {
		key: "value",
		get: function get() {
			return _get(Object.getPrototypeOf(_class21.prototype), "value", this);
		},
		set: function set(v) {
			this.unsubmit();
			return this._value;
		}
	}, {
		key: "displayable",
		get: function get() {
			return true;
		}
	}, {
		key: "info",
		get: function get() {
			return this.fields.map(function (f) {
				return f._info;
			}).join('\n\n');
		}
	}]);

	return _class21;
})(cj.sinap.elements.fields.Viewable);
cj.sinap.elements.fields.RegularField = (function (_cj$sinap$elements$fields$Viewable4) {
	_inherits(_class22, _cj$sinap$elements$fields$Viewable4);

	function _class22(_ref37) {
		var name = _ref37.name;
		var value = _ref37.value;
		var hidden = _ref37.hidden;
		var view = _ref37.view;
		var validator = _ref37.validator;
		var sensitiveData = _ref37.sensitiveData;
		var semantics = _ref37.semantics;
		var hideFromConfirmationScreen = _ref37.hideFromConfirmationScreen;

		_classCallCheck(this, _class22);

		_get(Object.getPrototypeOf(_class22.prototype), "constructor", this).call(this, { name: name, hidden: hidden, view: view, hideFromConfirmationScreen: hideFromConfirmationScreen });
		this.defaultValue = value || null;
		this.sensitive = sensitiveData === 'true' || sensitiveData === true || false;
		this.validator = cj.sinap.validators.Parse(validator);
		switch (semantics && semantics.type) {
			case cj.sinap.semantics.firstName:
				this.autocomplete = new Autocomplete('names_first.txt');
				break;
			case cj.sinap.semantics.middleName:
				this.autocomplete = new Autocomplete('names_middle.txt');
				break;
			case cj.sinap.semantics.lastName:
				this.autocomplete = new Autocomplete('names_second.txt');
				break;
			case cj.sinap.semantics.email:
				view && view.widget && (view.widget.keyboard = cj.sinap.widgets.KEYBOARD_TYPE.EMAIL);
				break;
		}
		if (this.autocomplete) this.autocomplete.load();
		switch (view.widget.type) {
			case cj.sinap.widgets.TYPE.TEXT:
				this.widget = view.widget.mask ? new cj.sinap.widgets.MaskedWidget({
					mask: view.widget.mask,
					keyboard: view.widget.keyboard,
					stripStaticSymbols: view.widget.stripStaticSymbols
				}) : new cj.sinap.widgets.TextWidget({
					keyboard: view.widget.keyboard
				});
				break;
			case cj.sinap.widgets.TYPE.DATE:
				this.widget = new cj.sinap.widgets.FullDateWidget({ format: view.widget.format });
				break;
			case cj.sinap.widgets.TYPE.EXPIRATION_DATE:
				this.widget = new cj.sinap.widgets.ExpirationDateWidget({ format: view.widget.format });
				break;
			default:
				cj.statistics.error('New error', true);
		}
	}

	_createClass(_class22, [{
		key: "suggests",
		value: function suggests(v) {
			return this.autocomplete && this.autocomplete.apply(v) || _get(Object.getPrototypeOf(_class22.prototype), "suggests", this).call(this, v);
		}
	}, {
		key: "layout",
		get: function get() {
			if (_get(Object.getPrototypeOf(_class22.prototype), "layout", this)) return _get(Object.getPrototypeOf(_class22.prototype), "layout", this);
			switch (this.widget.type) {
				case cj.sinap.widgets.TYPE.TEXT:
				case cj.sinap.widgets.TYPE.MASKED:
					if (!this.mask) return cj.sinap.layouts.QWERTY;
					switch (this.widget.keyboard) {
						case cj.sinap.widgets.KEYBOARD_TYPE.NUMERIC:
							return cj.sinap.layouts.NUMERIC;
						case cj.sinap.widgets.KEYBOARD_TYPE.QWERTY:
						case cj.sinap.widgets.KEYBOARD_TYPE.EMAIL:
							return cj.sinap.layouts.QWERTY;
						default:
							return cj.statistics.error({ type: K.STAT.ERRORS.SINAP.UNKNOWN_KEYBOARD }, true);
					}
				case cj.sinap.widgets.TYPE.DATE:
				case cj.sinap.widgets.TYPE.EXPIRATION_DATE:
					return cj.sinap.layouts.NUMERIC;
			}
			cj.statistics.error('New error', true);
		}
	}, {
		key: "value",
		get: function get() {
			return _get(Object.getPrototypeOf(_class22.prototype), "value", this);
		},
		set: function set(v) {
			return _set(Object.getPrototypeOf(_class22.prototype), "value", v || this.defaultValue, this);
		}
	}, {
		key: "maskedValue",
		get: function get() {
			return this.value;
		}
	}, {
		key: "securedValue",
		get: function get() {
			return this.sensitive ? cj.sinap.elements.fields.Base.secure(_get(Object.getPrototypeOf(_class22.prototype), "securedValue", this)) : _get(Object.getPrototypeOf(_class22.prototype), "securedValue", this);
		}
	}, {
		key: "valid",
		get: function get() {
			return this.validator.validate(this.value);
		}
	}, {
		key: "errorMessage",
		get: function get() {
			return validator.message || _get(Object.getPrototypeOf(_class22.prototype), "errorMessage", this);
		}
	}, {
		key: "mask",
		get: function get() {
			return this.widget.mask;
		}
	}]);

	return _class22;
})(cj.sinap.elements.fields.Viewable);
cj.sinap.elements.fields.MultiField = (function (_cj$sinap$elements$fields$RegularField) {
	_inherits(_class23, _cj$sinap$elements$fields$RegularField);

	function _class23(config) {
		_classCallCheck(this, _class23);

		_get(Object.getPrototypeOf(_class23.prototype), "constructor", this).call(this, config);
		this._subfields = config.subfields || [];
		this._groupTitle = config.groupTitle || '';
		this.focusedIndex = 0;
	}

	_createClass(_class23, [{
		key: "submit",
		value: function submit() {
			this.submitted = true;
			this.subfields.forEach(function (field) {
				return field.submit();
			});
		}
	}, {
		key: "unsubmit",
		value: function unsubmit() {
			this.submitted = false;
			this.subfields.forEach(function (field) {
				return field.unsubmit();
			});
		}
	}, {
		key: "layout",
		get: function get() {
			return cj.sinap.layouts.MULTI;
		}
	}, {
		key: "fields",
		get: function get() {
			return this._subfields.map(function (name) {
				return S.form.fieldWithName(name);
			});
		}
	}, {
		key: "subfields",
		get: function get() {
			return this.fields.filter(function (f, i) {
				return i !== 0;
			});
		}
	}, {
		key: "focus",
		get: function get() {
			return this.fields[this.focusedIndex];
		},
		set: function set(name) {
			var index = this._subfields.indexOf(name);
			this.focusIndex = index !== -1 ? index : this.focusIndex;
			return this.focus;
		}
	}, {
		key: "focusIndex",
		get: function get() {
			return this.focusedIndex;
		},
		set: function set(index) {
			return this.focusedIndex = index >= this._subfields.length ? this.focusedIndex : index;
		}
	}, {
		key: "valid",
		get: function get() {
			return this.validator.validate(this.value) && this.subfields.filter(function (field) {
				return !field.valid;
			}).length === 0;
		}
	}, {
		key: "info",
		get: function get() {
			return _get(Object.getPrototypeOf(_class23.prototype), "info", this) + '\n\n' + this.subfields.map(function (f) {
				return f.info;
			}).join('\n\n');
		}
	}]);

	return _class23;
})(cj.sinap.elements.fields.RegularField);
cj.sinap.elements.fields.HiddenField = (function (_cj$sinap$elements$fields$Base2) {
	_inherits(_class24, _cj$sinap$elements$fields$Base2);

	function _class24(_ref38) {
		var name = _ref38.name;
		var value = _ref38.value;

		_classCallCheck(this, _class24);

		_get(Object.getPrototypeOf(_class24.prototype), "constructor", this).call(this, { name: name, hidden: true });
		this._value = value;
	}

	_createClass(_class24, [{
		key: "value",
		get: function get() {
			return _get(Object.getPrototypeOf(_class24.prototype), "value", this);
		},
		set: function set(v) {
			this.unsubmit();
			return this._value;
		}
	}]);

	return _class24;
})(cj.sinap.elements.fields.Base);
cj.sinap.predicates.Parse = function (_ref39) {
	var type = _ref39.type;
	var pattern = _ref39.pattern;
	var field = _ref39.field;
	var subpredicates = _ref39.subpredicates;

	if (!type) cj.statistics.error('New error', true);
	switch (type) {
		case cj.sinap.predicates.TYPE.REGEXP:
			return new cj.sinap.predicates.RegexpPredicate({ pattern: pattern });
		case cj.sinap.predicates.TYPE.BIK_KEYING:
			return new cj.sinap.predicates.BIKKeyingPredicate({ field: field });
		case cj.sinap.predicates.TYPE.AND:
			return new cj.sinap.predicates.LogicalAndPredicate({ subpredicates: subpredicates });
	}
	cj.statistics.error('New error', true);
};

cj.sinap.predicates.TYPE = {
	REGEXP: 'regex',
	AND: 'and',
	BIK_KEYING: 'bikKeying'
};

cj.sinap.predicates.RegexpPredicate = (function () {
	function _class25(_ref40) {
		var pattern = _ref40.pattern;

		_classCallCheck(this, _class25);

		if (!pattern) cj.statistics.error('New error', true);
		this.regexp = new RegExp(pattern);
	}

	_createClass(_class25, [{
		key: "execute",
		value: function execute(value) {
			return !cj.nullOrUndefined(value) && this.regexp.test(value);
		}
	}, {
		key: "type",
		get: function get() {
			return cj.sinap.predicates.TYPE.REGEXP;
		}
	}]);

	return _class25;
})();

cj.sinap.predicates.BIKKeyingPredicate = (function () {
	function _class26(_ref41) {
		var field = _ref41.field;

		_classCallCheck(this, _class26);

		if (!field) cj.statistics.error('New error', true);
		this.field = field.toString();
	}

	_createClass(_class26, [{
		key: "execute",
		value: function execute(account) {
			//TODO: resolve issue with predicates that need to access other form fields
			var bik = S.form.get(this.field) || '';
			if (!account || !bik) return false;
			var s = 7 * bik.charAt(6) + 1 * bik.charAt(7) + 3 * bik.charAt(8) + 7 * account.charAt(0) + 1 * account.charAt(1) + 3 * account.charAt(2) + 7 * account.charAt(3) + 1 * account.charAt(4) + 3 * account.charAt(5) + 7 * account.charAt(6) + 1 * account.charAt(7) + 7 * account.charAt(9) + 1 * account.charAt(10) + 3 * account.charAt(11) + 7 * account.charAt(12) + 1 * account.charAt(13) + 3 * account.charAt(14) + 7 * account.charAt(15) + 1 * account.charAt(16) + 3 * account.charAt(17) + 7 * account.charAt(18) + 1 * account.charAt(19);
			s = s % 10 * 3 % 10;
			return s === Number(account.charAt(8));
		}
	}, {
		key: "type",
		get: function get() {
			return cj.sinap.predicates.TYPE.BIK_KEYING;
		}
	}]);

	return _class26;
})();

cj.sinap.predicates.LogicalAndPredicate = (function () {
	function _class27(_ref42) {
		var subpredicates = _ref42.subpredicates;

		_classCallCheck(this, _class27);

		if (!subpredicates || !(subpredicates instanceof Array)) cj.statistics.error('New error', true);
		this.subpredicates = subpredicates.map(function (item) {
			return cj.sinap.predicates.Parse(item);
		});
	}

	_createClass(_class27, [{
		key: "execute",
		value: function execute(value) {
			return !this.subpredicates.filter(function (p) {
				return !p.execute(value);
			}).length > 0;
		}
	}, {
		key: "type",
		get: function get() {
			return cj.sinap.predicates.TYPE.AND;
		}
	}]);

	return _class27;
})();
cj.sinap.validators.Parse = function (_ref43) {
	var type = _ref43.type;
	var message = _ref43.message;
	var predicate = _ref43.predicate;

	if (!type) cj.statistics.error('New error', true);
	if (type === cj.sinap.validators.TYPE.PREDICATE) return new cj.sinap.validators.PredicateValidator({ message: message, predicate: predicate });
	cj.statistics.error({ type: K.STAT.ERRORS.SINAP.PARSING.INVALID_VALIDATOR }, true);
};

cj.sinap.validators.TYPE = {
	PREDICATE: 'predicate'
};

cj.sinap.validators.PredicateValidator = (function () {
	function _class28(_ref44) {
		var message = _ref44.message;
		var predicate = _ref44.predicate;

		_classCallCheck(this, _class28);

		if (cj.nullOrUndefined(message) || !predicate) cj.statistics.error('New error', true);
		this.message = message.toString() || '';
		this.predicate = cj.sinap.predicates.Parse(predicate);
	}

	_createClass(_class28, [{
		key: "validate",
		value: function validate(value) {
			return this.predicate.execute(value);
		}
	}, {
		key: "type",
		get: function get() {
			return cj.sinap.validators.TYPE.PREDICATE;
		}
	}]);

	return _class28;
})();
cj.sinap.widgets.TYPE = {
	INFO: 'info',
	RADIO: 'radio',
	LIST: 'list',
	SWITCH: 'switch',

	TEXT: 'text',
	MASKED: 'masked',
	EXPIRATION_DATE: 'expiryDate',
	DATE: 'date',

	MULTI: 'multifield'
};

cj.sinap.widgets.KEYBOARD_TYPE = {
	QWERTY: 'qwerty',
	NUMERIC: 'numeric',
	EMAIL: 'email'
};

cj.sinap.widgets.Base = (function () {
	function _class29() {
		_classCallCheck(this, _class29);
	}

	_createClass(_class29, [{
		key: "displayValue",
		value: function displayValue(v) {
			return v;
		}
	}, {
		key: "prepare",
		value: function prepare(v) {
			return v || '';
		}
	}, {
		key: "restore",
		value: function restore(v) {
			return v || '';
		}
	}, {
		key: "type",
		get: function get() {
			return 'widget';
		}
	}, {
		key: "keyboard",
		get: function get() {
			return null;
		}
	}, {
		key: "mask",
		get: function get() {
			return this._mask || null;
		}
	}]);

	return _class29;
})();
cj.sinap.widgets.InfoWidget = (function (_cj$sinap$widgets$Base) {
	_inherits(_class30, _cj$sinap$widgets$Base);

	function _class30() {
		_classCallCheck(this, _class30);

		_get(Object.getPrototypeOf(_class30.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class30, [{
		key: "type",
		get: function get() {
			return cj.sinap.widgets.TYPE.INFO;
		}
	}]);

	return _class30;
})(cj.sinap.widgets.Base);
cj.sinap.widgets.TextWidget = (function (_cj$sinap$widgets$Base2) {
	_inherits(_class31, _cj$sinap$widgets$Base2);

	function _class31(_ref45) {
		var keyboard = _ref45.keyboard;

		_classCallCheck(this, _class31);

		_get(Object.getPrototypeOf(_class31.prototype), "constructor", this).call(this);
		this._keyboard = keyboard || cj.sinap.widgets.KEYBOARD_TYPE.QWERTY;
	}

	_createClass(_class31, [{
		key: "type",
		get: function get() {
			return cj.sinap.widgets.TYPE.TEXT;
		}
	}, {
		key: "keyboard",
		get: function get() {
			return this._keyboard;
		}
	}]);

	return _class31;
})(cj.sinap.widgets.Base);
cj.sinap.widgets.RadioWidget = (function (_cj$sinap$widgets$Base3) {
	_inherits(_class32, _cj$sinap$widgets$Base3);

	function _class32(_ref46) {
		var choices = _ref46.choices;

		_classCallCheck(this, _class32);

		_get(Object.getPrototypeOf(_class32.prototype), "constructor", this).call(this);
		this.choices = choices;
	}

	_createClass(_class32, [{
		key: "displayValue",
		value: function displayValue(v) {
			return (this.choices.filter(function (choice) {
				return v === choice.value;
			})[0] || { title: '' }).title;
		}
	}, {
		key: "type",
		get: function get() {
			return cj.sinap.widgets.TYPE.RADIO;
		}
	}]);

	return _class32;
})(cj.sinap.widgets.Base);
cj.sinap.widgets.ListWidget = (function (_cj$sinap$widgets$RadioWidget) {
	_inherits(_class33, _cj$sinap$widgets$RadioWidget);

	function _class33() {
		_classCallCheck(this, _class33);

		_get(Object.getPrototypeOf(_class33.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class33, [{
		key: "type",
		get: function get() {
			return cj.sinap.widgets.TYPE.LIST;
		}
	}]);

	return _class33;
})(cj.sinap.widgets.RadioWidget);
cj.sinap.widgets.SwitchWidget = (function (_cj$sinap$widgets$Base4) {
	_inherits(_class34, _cj$sinap$widgets$Base4);

	function _class34(_ref47) {
		var onValue = _ref47.onValue;
		var offValue = _ref47.offValue;

		_classCallCheck(this, _class34);

		_get(Object.getPrototypeOf(_class34.prototype), "constructor", this).call(this);
		this.onValue = onValue || true;
		this.offValue = offValue || false;
	}

	_createClass(_class34, [{
		key: "type",
		get: function get() {
			return cj.sinap.widgets.TYPE.SWITCH;
		}
	}]);

	return _class34;
})(cj.sinap.widgets.Base);
cj.sinap.widgets.MaskedWidget = (function (_cj$sinap$widgets$TextWidget) {
	_inherits(_class35, _cj$sinap$widgets$TextWidget);

	function _class35(_ref48) {
		var mask = _ref48.mask;
		var keyboard = _ref48.keyboard;
		var stripStaticSymbols = _ref48.stripStaticSymbols;

		_classCallCheck(this, _class35);

		_get(Object.getPrototypeOf(_class35.prototype), "constructor", this).call(this, { keyboard: keyboard });
		this._mask = mask.toString() || '';
		if (this._mask.indexOf('?') !== -1) this._mask = '?' + this._mask.replace('?', '');
		this._keyboard = keyboard || cj.sinap.widgets.KEYBOARD_TYPE.QWERTY;
		this.strip = stripStaticSymbols === 'true' || stripStaticSymbols === true || false;
	}

	_createClass(_class35, [{
		key: "prepare",
		value: function prepare(v) {
			return (this.strip ? cj.mask.demask(v, this._mask).value : v) || '';
		}
	}, {
		key: "type",
		get: function get() {
			return cj.sinap.widgets.TYPE.MASKED;
		}
	}]);

	return _class35;
})(cj.sinap.widgets.TextWidget);
cj.sinap.widgets.FullDateWidget = (function (_cj$sinap$widgets$Base5) {
	_inherits(_class36, _cj$sinap$widgets$Base5);

	function _class36(_ref49) {
		var format = _ref49.format;

		_classCallCheck(this, _class36);

		_get(Object.getPrototypeOf(_class36.prototype), "constructor", this).call(this);
		this._mask = format.toString().replace(/d/g, 'D') || 'DD.MM.yyyy';
	}

	_createClass(_class36, [{
		key: "type",
		get: function get() {
			return cj.sinap.widgets.TYPE.DATE;
		}
	}, {
		key: "keyboard",
		get: function get() {
			return cj.sinap.widgets.KEYBOARD_TYPE.NUMERIC;
		}
	}]);

	return _class36;
})(cj.sinap.widgets.Base);
cj.sinap.widgets.ExpirationDateWidget = (function (_cj$sinap$widgets$FullDateWidget) {
	_inherits(_class37, _cj$sinap$widgets$FullDateWidget);

	function _class37(_ref50) {
		var format = _ref50.format;

		_classCallCheck(this, _class37);

		_get(Object.getPrototypeOf(_class37.prototype), "constructor", this).call(this, { format: 'MM/yy' });
	}

	_createClass(_class37, [{
		key: "prepare",
		value: function prepare(v) {
			return (v || '').replace(/\//g, '');
		}
	}, {
		key: "restore",
		value: function restore(v) {
			if (!v || v === '') return '';
			v = v.replace(/\//g, '');
			return v.slice(0, 2) + '/' + v.slice(2);
		}
	}, {
		key: "displayValue",
		value: function displayValue(v) {
			return this.restore(v);
		}
	}, {
		key: "type",
		get: function get() {
			return cj.sinap.widgets.TYPE.EXPIRATION_DATE;
		}
	}]);

	return _class37;
})(cj.sinap.widgets.FullDateWidget);
cj.sinap.Container = (function () {
	function _class38(_ref51) {
		var terms = _ref51.terms;
		var elements = _ref51.elements;
		var fieldGroups = _ref51.fieldGroups;

		_classCallCheck(this, _class38);

		this._terms = terms ? cj.sinap.terms.Parse(terms) : null;
		this.fieldGroups = fieldGroups || [];
		this.fieldGroups.forEach(function (group) {
			var elementNames = elements.map(function (item) {
				return item.name;
			});

			var _group$fields$sort = group.fields.sort(function (a, b) {
				try {
					if (elements[elementNames.indexOf(a)].view.widget.type === 'switch') return 1;
				} catch (e) {}
				try {
					if (elements[elementNames.indexOf(b)].view.widget.type === 'switch') return -1;
				} catch (e) {}
				return 0;
			});

			var _group$fields$sort2 = _toArray(_group$fields$sort);

			var head = _group$fields$sort2[0];

			var tails = _group$fields$sort2.slice(1);

			var index = elementNames.indexOf(head);
			if (index !== -1) {
				elements[index].subfields = group.fields;
				elements[index].groupTitle = group.title;
			}
			tails.forEach(function (name) {
				if ((index = elementNames.indexOf(name)) !== -1) elements[index].hidden = true;
			});
			if (elements[elementNames.indexOf(head)] instanceof cj.sinap.elements.fields.ChoiceField && !(elements[elementNames.indexOf(tails[0])] instanceof cj.sinap.elements.fields.SwitchField)) cj.statistics.error('Subfield for choice field is not switch!', true);
		});
		if (!elements || !elements instanceof Array) return this._elements = null;
		if (S.get(K.SESSION.INITIAL_FORM) && terms && this._terms.type === cj.sinap.terms.TYPE.QW_ONLINE) {
			if (!elements[0].view || elements[0].view.widget.type !== cj.sinap.widgets.TYPE.RADIO) {
				var titled = elements.filter(function (el) {
					return el.view && el.view.title;
				});
				elements.unshift({
					name: titled.length ? titled[0].view.title : null,
					type: cj.sinap.elements.TYPE.FIELD,
					initial: true
				});
			} else if (elements[0].type === cj.sinap.elements.TYPE.FIELD) elements[0].initial = true;
		}
		S.remove(K.SESSION.INITIAL_FORM);
		this._elements = elements.map(function (item) {
			return cj.sinap.elements.Parse(item, item.initial === true);
		});
	}

	_createClass(_class38, [{
		key: "terms",
		get: function get() {
			return this._terms;
		}
	}, {
		key: "elements",
		get: function get() {
			return this._elements;
		}
	}, {
		key: "groups",
		get: function get() {
			return this.fieldGroups;
		}
	}]);

	return _class38;
})();
cj.sinap.miscInfo.MiscInfo = (function () {
	function _class39(items) {
		_classCallCheck(this, _class39);

		this.items = [];
		if (items) this.items = items.map(function (item) {
			return new cj.sinap.miscInfo.Item(item);
		});
	}

	_createClass(_class39, [{
		key: "getItemByType",
		value: function getItemByType(type) {
			return this.items.filter(function (item) {
				return item.type == type;
			}).reduce(function (obj, item) {
				return item.value;
			}, '');
		}
	}, {
		key: "authSideInfo",
		get: function get() {
			return this.getItemByType('KioskAuthenticationScreen');
		}
	}]);

	return _class39;
})();

cj.sinap.miscInfo.Item = (function () {
	function _class40(_ref52) {
		var type = _ref52.type;
		var value = _ref52.value;

		_classCallCheck(this, _class40);

		if (!type || !value) cj.statistics.error('New error', true);
		this.type = type;
		this.value = value;
	}

	return _class40;
})();
cj.sinap.receipt.Receipt = (function () {
	function _class41(_ref53) {
		var items = _ref53.items;

		_classCallCheck(this, _class41);

		if (!items) return this.items = null;
		this.items = items.map(function (item) {
			return new cj.sinap.receipt.Item(item);
		});
	}

	_createClass(_class41, [{
		key: "receipt",
		get: function get() {
			return this.items ? this.items.map(function (item) {
				return item.res(S.form);
			}).filter(function (item) {
				return item.title && item.value;
			}) : [];
		}
	}, {
		key: "maratl",
		get: function get() {
			return this.receipt.reduce(function (obj, item) {
				obj['_receipt_' + item.title.replace(/\s/g, '+')] = item.value.replace(/\s/g, '+');
				return obj;
			}, {});
		}
	}, {
		key: "html",
		get: function get() {
			var receipt = this.receipt,
			    html = '',
			    change = {
				commission: Number(S.get(K.SESSION.PAYMENT.CHANGE_COMMISSION)),
				sum: Number(S.get(K.SESSION.PAYMENT.CHANGE_SUM)),
				provider: S.get(K.SESSION.CHANGE_PROVIDER.NAME)
			},
			    after = (Number(S.get(K.SESSION.PAYMENT.CHANGE_SUM)) ? [{
				title: 'Зачисление сдачи на',
				value: change.provider
			}, {
				title: 'Принято:',
				value: cj.toSum(change.sum + change.commission) + ' ' + S.RUB_SUFFIX
			}, {
				title: 'Комиссия:',
				value: cj.toSum(change.commission) + ' ' + S.RUB_SUFFIX
			}, {
				title: 'Зачислено:',
				value: cj.toSum(change.sum) + ' ' + S.RUB_SUFFIX
			}] : []).concat([{
				title: 'Справочная служба QIWI',
				value: S.get(K.SESSION.TERMINAL.SUPPORT_PHONE) || ''
			}]),
			    before = [{
				title: S.form.fieldWithName(K.FIELDS.ACCOUNT).title,
				value: S.form.get(K.FIELDS.ACCOUNT),
				condition: S.scenario() === cj.sinap.terms.TYPE.QD
			}, {
				title: 'Номер телефона/счета:',
				value: S.phoneFormatted(),
				condition: S.scenario() !== cj.sinap.terms.TYPE.QD
			}, {
				title: 'Номер терминала:',
				value: S.terminalID()
			}, {
				title: 'Дата платежа:',
				value: new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
			}, {
				title: 'Код операции:',
				value: S.get(K.SESSION.TRANSACTION_ID),
				condition: S.paymentMethod() === K.PAYMENT.CASH
			}];

			if (receipt && receipt.length > 0) {
				before.forEach(function (item) {
					return html += item.condition === undefined || item.condition === true ? item.title + " " + item.value + "<br>" : '';
				});
				html += '<hr>';
				receipt.forEach(function (item) {
					return html += "<br>" + item.title + ": " + item.value + "<br><hr>";
				});
				html += '<br>';
				after.forEach(function (item) {
					return html += item.condition === undefined || item.condition === true ? item.title + " " + item.value + "<br>" : '';
				});
			}
			return html.replace(/<hr>/g, '**************************************').replace(/<br>/g, '\n');
		}
	}]);

	return _class41;
})();

cj.sinap.receipt.Item = (function () {
	function _class42(_ref54) {
		var type = _ref54.type;
		var title = _ref54.title;
		var value = _ref54.value;

		_classCallCheck(this, _class42);

		if (!title || !value) cj.statistics.error('New error', true);
		switch (type) {
			case 'TitleValueItem':
				this.title = new cj.sinap.receipt.Element(title);
				this.value = new cj.sinap.receipt.Element(value);
				break;
			default:
				break;
		}
	}

	_createClass(_class42, [{
		key: "res",
		value: function res(context) {
			return {
				title: this.title.res(context),
				value: this.value.res(context)
			};
		}
	}]);

	return _class42;
})();

cj.sinap.receipt.Element = (function () {
	function _class43(config) {
		_classCallCheck(this, _class43);

		this.f = this.getFunction(config) || function () {
			return config.value || null;
		};
	}

	_createClass(_class43, [{
		key: "getFunction",
		value: function getFunction(_ref55) {
			var type = _ref55.type;
			var value = _ref55.value;
			var field = _ref55.field;
			var items = _ref55.items;

			switch (type) {
				case 'StaticSource':
					return function () {
						return value;
					};
				case 'NewLineSource':
					return function () {
						return '<br>';
					};
				case 'FieldValueSource':
					return function (context) {
						if (!context) return null;
						var f = context.fieldWithName(field);
						return f && (f.securedValue || '');
					};
				case 'FieldTitleSource':
					return function (context) {
						if (!context) return null;
						var f = context.fieldWithName(field);
						return f && (f.title || '');
					};
				case 'PaymentDateSource':
					return function () {
						return new Date().toLocaleFormat('%d.%m.%Y %H:%M:%S');
					};
				case 'NetSumSource':
					return function () {
						return cj.toSum(S.get(K.SESSION.PAYMENT.PROVIDER_SUM)) + ' ' + S.RUB_SUFFIX;
					};
				case 'GrossSumSource':
					return function () {
						return cj.toSum(S.get(K.SESSION.PAYMENT.GROSS_SUM)) + ' ' + S.RUB_SUFFIX;
					};
				case 'CommissionSumSource':
					return function () {
						return cj.toSum(S.get(K.SESSION.PAYMENT.QIWI_COMMISSION)) + ' ' + S.RUB_SUFFIX;
					};
				case 'DeviceIdSource':
					return function () {
						return S.get(K.SESSION.TERMINAL.ID);
					};
				case 'ServiceNameSource':
					return function () {
						return S.shortName();
					};
				case 'CompoundSource':
					return items.map(function (subitem) {
						return new cj.sinap.receipt.Element(subitem);
					});
			}
		}
	}, {
		key: "res",
		value: function res(context) {
			if (this.f instanceof Array) return this.f.reduce(function (memo, item) {
				return memo + (item.res(context) || ' ');
			}, '');
			return this.f(context);
		}
	}]);

	return _class43;
})();
cj.sinap.terms.Parse = function (config) {
	if (!config.type) return cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.NO_TYPE }, true);
	switch (config.type) {
		case cj.sinap.terms.TYPE.QD:
			return new cj.sinap.terms.QDTerm(config);
		case cj.sinap.terms.TYPE.QW_OFFLINE:
			return new cj.sinap.terms.OfflineQWTerm(config);
		case cj.sinap.terms.TYPE.QW_ONLINE:
			return new cj.sinap.terms.OnlineQWTerm(config);
	}
	return cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.INVALID_TYPE }, true);
};

cj.sinap.terms.TYPE = {
	QD: 'DefaultQDTerms',
	QW_ONLINE: 'OnlineQWTransitTerms',
	QW_OFFLINE: 'OfflineQWTransitTerms'
};

cj.sinap.terms.CONSTRAINT_TYPE = {
	FIXED: 'FixedSumConstraint',
	EDITABLE: 'EditableSumConstraint'
};

cj.sinap.terms.Money = (function () {
	function _class44(_ref56) {
		var currency = _ref56.currency;
		var amount = _ref56.amount;

		_classCallCheck(this, _class44);

		if (!cj.correctNumbers(currency, amount)) cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.INVALID_MONEY });
		this.currency = (currency || '').toString() || K.RUB_CURRENCY_CODE;
		this.amount = Number(amount) || 0;
	}

	return _class44;
})();

cj.sinap.terms.Identification = (function () {
	function _class45(_ref57) {
		var required = _ref57.required;

		_classCallCheck(this, _class45);

		if (cj.nullOrUndefined(required)) cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.INVALID_IDENTIFICATION });
		this.required = required === 'true' || required === true || false;
	}

	return _class45;
})();

cj.sinap.terms.Limit = (function () {
	function _class46() {
		var _ref58 = arguments.length <= 0 || arguments[0] === undefined ? {
			currency: K.RUB_CURRENCY_CODE,
			min: 0,
			max: Number.MAX_VALUE
		} : arguments[0];

		var currency = _ref58.currency;
		var min = _ref58.min;
		var max = _ref58.max;

		_classCallCheck(this, _class46);

		if (!cj.correctNumbers(currency, min, max)) cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.INVALID_LIMIT });
		this.currency = (currency || '').toString() || K.RUB_CURRENCY_CODE;
		this.min = Number(min) || 0;
		this.max = Number(max) || Number.MAX_VALUE;
	}

	_createClass(_class46, [{
		key: "isValid",
		value: function isValid() {
			var sum = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			return sum >= this.min && sum <= this.max;
		}
	}]);

	return _class46;
})();

cj.sinap.terms.SumConstraintLimit = (function (_cj$sinap$terms$Limit) {
	_inherits(_class47, _cj$sinap$terms$Limit);

	function _class47(_ref59) {
		var min = _ref59.min;
		var max = _ref59.max;
		var currency = _ref59.currency;

		_classCallCheck(this, _class47);

		_get(Object.getPrototypeOf(_class47.prototype), "constructor", this).call(this, {
			min: min || 0,
			max: max || Number.MAX_VALUE,
			currency: currency
		});
	}

	return _class47;
})(cj.sinap.terms.Limit);

cj.sinap.terms.Limits = (function () {
	function _class48(limits) {
		_classCallCheck(this, _class48);

		if (!limits) cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.INVALID_LIMITS });
		this.limits = (limits || []).map(function (l) {
			return new cj.sinap.terms.Limit(l);
		});
	}

	_createClass(_class48, [{
		key: "forCurrency",
		value: function forCurrency() {
			var currency = arguments.length <= 0 || arguments[0] === undefined ? K.RUB_CURRENCY_CODE : arguments[0];
			return this.limits.find(function (l) {
				return l.currency === currency;
			});
		}
	}]);

	return _class48;
})();

cj.sinap.terms.SumConstraint = (function () {
	function _class49(_ref60) {
		var type = _ref60.type;
		var sum = _ref60.sum;
		var suggestedSum = _ref60.suggestedSum;
		var limit = _ref60.limit;

		_classCallCheck(this, _class49);

		if (!type) cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.NO_CONSTRAINT_TYPE });
		if (type === cj.sinap.terms.CONSTRAINT_TYPE.FIXED) {
			if (!sum) cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.INVALID_CONSTRAINT_FIXED }, true);
			this.fixed = new cj.sinap.terms.Money(sum);
			this.limit = new cj.sinap.terms.SumConstraintLimit({ min: sum.amount, max: sum.amount, currency: sum.currency });
		} else if (type === cj.sinap.terms.CONSTRAINT_TYPE.EDITABLE) {
			this.suggested = suggestedSum && new cj.sinap.terms.Money(suggestedSum) || null;
			this.limit = limit && new cj.sinap.terms.SumConstraintLimit(limit) || null;
		} else cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.INVALID_CONSTRAINT_TYPE }, true);
	}

	return _class49;
})();

cj.sinap.terms.QDTerm = (function () {
	function _class50(_ref61) {
		var qd = _ref61.qd;
		var sumConstraint = _ref61.sumConstraint;

		_classCallCheck(this, _class50);

		if (!qd) return cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.NO_QD }, true);
		this.qd = qd;
		this.sumConstraint = sumConstraint ? new cj.sinap.terms.SumConstraint(sumConstraint) : null;
	}

	_createClass(_class50, [{
		key: "type",
		get: function get() {
			return cj.sinap.terms.TYPE.QD;
		}
	}]);

	return _class50;
})();

cj.sinap.terms.OfflineQWTerm = (function (_cj$sinap$terms$QDTerm) {
	_inherits(_class51, _cj$sinap$terms$QDTerm);

	function _class51(_ref62) {
		var qd = _ref62.qd;
		var qw = _ref62.qw;
		var commission = _ref62.commission;
		var limits = _ref62.limits;
		var description = _ref62.description;
		var overpayment = _ref62.overpayment;
		var underpayment = _ref62.underpayment;
		var identification = _ref62.identification;
		var deadline = _ref62.deadline;
		var sumConstraint = _ref62.sumConstraint;

		_classCallCheck(this, _class51);

		if (!qw) return cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.NO_QW }, true);
		_get(Object.getPrototypeOf(_class51.prototype), "constructor", this).call(this, { qd: qd, sumConstraint: sumConstraint });
		if (cj.nullOrUndefined(commission, limits, description, overpayment, underpayment, identification)) return cj.statistics.error({ type: K.STAT.ERRORS.SINAP.TERMS.INVALID_TERM });
		this.qw = Number(qw) || null;
		this.commission = new cj.commission.Commissions(commission);
		this.limits = new cj.sinap.terms.Limits(limits);
		this.description = (description || '').toString();
		this.overpayment = overpayment && overpayment.toString() === 'true' || false;
		this.underpayment = underpayment && underpayment.toString() === 'true' || false;
		this.identification = new cj.sinap.terms.Identification(identification);
		this.deadline = (deadline || '').toString();
	}

	_createClass(_class51, [{
		key: "type",
		get: function get() {
			return cj.sinap.terms.TYPE.QW_OFFLINE;
		}
	}]);

	return _class51;
})(cj.sinap.terms.QDTerm);

cj.sinap.terms.OnlineQWTerm = (function (_cj$sinap$terms$OfflineQWTerm) {
	_inherits(_class52, _cj$sinap$terms$OfflineQWTerm);

	function _class52() {
		_classCallCheck(this, _class52);

		_get(Object.getPrototypeOf(_class52.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class52, [{
		key: "type",
		get: function get() {
			return cj.sinap.terms.TYPE.QW_ONLINE;
		}
	}]);

	return _class52;
})(cj.sinap.terms.OfflineQWTerm);
cj.views.AbstractView = (function () {
	function _class53(_ref63) {
		var el = _ref63.el;
		var model = _ref63.model;
		var parent = _ref63.parent;

		_classCallCheck(this, _class53);

		this.$el = el;
		this.model = model;
		this.parent = parent;
		this._children = [];
		this._events = [];
	}

	_createClass(_class53, [{
		key: "render",
		value: function render() {
			return this;
		}
	}, {
		key: "hide",
		value: function hide() {
			this.$el && cj.DOM.hide(this.$el);return this;
		}
	}, {
		key: "show",
		value: function show() {
			this.$el && cj.DOM.show(this.$el);return this;
		}
	}, {
		key: "addClass",
		value: function addClass(className) {
			this.$el && cj.DOM.addClass(this.$el, className);return this;
		}
	}, {
		key: "removeClass",
		value: function removeClass(className) {
			this.$el && cj.DOM.removeClass(this.$el, className);return this;
		}
	}, {
		key: "enable",
		value: function enable() {
			this.$el && cj.DOM.removeClass(this.$el, cj.DOM.DISABLED);return this;
		}
	}, {
		key: "disable",
		value: function disable() {
			this.$el && cj.DOM.addClass(this.$el, cj.DOM.DISABLED);return this;
		}
	}, {
		key: "showPopup",
		value: function showPopup(options) {
			cj.statistics.popup({
				type: options.type,
				data: options.message
			});
			return this.parent.showPopup(options);
		}
	}, {
		key: "hidePopup",
		value: function hidePopup(options) {
			this.parent.hidePopup(options);return this;
		}
	}, {
		key: "showPreloader",
		value: function showPreloader(options, ad) {
			this.parent.showPreloader(typeof options === 'string' ? { header: options } : options || {}, ad);return this;
		}
	}, {
		key: "hidePreloader",
		value: function hidePreloader() {
			this.parent.hidePreloader();return this;
		}
	}, {
		key: "showSideInfo",
		value: function showSideInfo(options) {
			this.parent.showSideInfo(options);return this;
		}
	}, {
		key: "hideSideInfo",
		value: function hideSideInfo() {
			this.parent.hideSideInfo();return this;
		}
	}, {
		key: "changePage",
		value: function changePage(page, additional) {
			this.parent.changePage(page, additional);return this;
		}
	}, {
		key: "addAsChildTo",
		value: function addAsChildTo(obj) {
			obj._children.push(this);return this;
		}
	}, {
		key: "clearChildren",
		value: function clearChildren() {
			//this._nextButton && this._nextButton.off();
			//this._prevButton && this._prevButton.off();
			this._children.forEach(function (child) {
				if (child.clean) child.clean();
				if (child.off) child.off();
			});
			return this;
		}
	}, {
		key: "destroyChildren",
		value: function destroyChildren() {
			//this._nextButton && (this._nextButton = null);
			//this._prevButton && (this._prevButton = null);
			this._children.forEach(function (child, i, parent) {
				if (child.destroy) child.destroy();
				parent[i] = null;
			});
			return this;
		}
	}, {
		key: "clear",
		value: function clear() {
			this.$el && (this.$el.onmousedown = null);
			return this.clearChildren();
		}
	}, {
		key: "destroy",
		value: function destroy() {
			var _this24 = this;

			this.clear();
			this.filter(function (item, key) {
				return key.indexOf('$') === 1;
			}).forEach(function (key) {
				return _this24[key] = null;
			});
			this.destroyChildren();
			this.$el = null;
			this.model = null;
		}
	}, {
		key: "on",
		value: function on(callback) {
			this._events.push(callback);return this;
		}
	}, {
		key: "trigger",
		value: function trigger() {
			var _this25 = this;

			for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				rest[_key4] = arguments[_key4];
			}

			this._events.forEach(function (cb) {
				return cb.apply(_this25, rest);
			});return this;
		}
	}, {
		key: "off",
		value: function off(callback) {
			if (!callback) this._events = [];
			this._events = this._events.filter(function (cb) {
				return cb !== callback;
			});
			return this;
		}
	}, {
		key: "isVisible",
		get: function get() {
			return this.$el && !cj.DOM.hasClass(this.$el, cj.DOM.HIDDEN);
		}
	}, {
		key: "isEnabled",
		get: function get() {
			return this.$el && !cj.DOM.hasClass(this.$el, cj.DOM.DISABLED);
		}
	}]);

	return _class53;
})();
cj.layouts.AbstractLayout = (function (_cj$views$AbstractView) {
	_inherits(_class54, _cj$views$AbstractView);

	function _class54(options) {
		_classCallCheck(this, _class54);

		_get(Object.getPrototypeOf(_class54.prototype), "constructor", this).call(this, options);
		if (!options.field) cj.statistics.error({ type: K.STAT.ERRORS.SINAP.ELEMENTS.NO_FIELD }, true);
		this._field = options.field;
		this.renderInfo(markdown.toHTML(this._field.info || ''));
	}

	_createClass(_class54, [{
		key: "renderInfo",
		value: function renderInfo(data, additionalPopupData) {
			var _this26 = this;

			if (!data) return;
			new cj.views.Button({
				el: cj.DOM.byId('info-button')
			}).render().show().on(function () {
				cj.statistics.click({
					type: K.STAT.CLICK.TYPES.BUTTON,
					value: K.STAT.CLICK.BUTTON.INFO
				});
				_this26.showPopup(cj.views.PopupView.messagePopup(({
					message: data,
					cssClass: 'markdown-info-popup',
					button: 'Продолжить'
				}).assign(additionalPopupData)));
			});
		}
	}, {
		key: "validate",
		value: function validate() {
			return this._field.valid ? Promise.resolve() : Promise.reject(this._field.errorMessage);
		}
	}, {
		key: "submit",
		value: function submit() {
			return this._field.submit();
		}
	}]);

	return _class54;
})(cj.views.AbstractView);
cj.layouts.FieldLayoutBase = (function (_cj$layouts$AbstractLayout) {
	_inherits(_class55, _cj$layouts$AbstractLayout);

	function _class55(options) {
		var _this27 = this;

		_classCallCheck(this, _class55);

		_get(Object.getPrototypeOf(_class55.prototype), "constructor", this).call(this, options);
		this._update = options.update;
		this._textfield = new cj.views.TextField({
			el: cj.DOM.byId('textfield'),
			mask: this._field.mask || null,
			update: function update() {
				return _this27.update(true);
			},
			suggest: function suggest(v) {
				return _this27._field.suggests(v);
			},
			fieldName: this._field.name
		});
	}

	_createClass(_class55, [{
		key: "render",
		value: function render() {
			this._textfield.render().addAsChildTo(this);

			var val = this._field.restoredValue;
			this._textfield.value(this._field.mask && !this._field.widget.strip ? cj.mask.demask(val, this._field.mask).value : val, true) && this.update();

			cj.DOM.headerComment(this._field.name === 'mfo' || this._field.name === K.FIELDS.ACCOUNT ? "Максимальная сумма платежа с учетом комиссии составляет " + cj.toSum(S.limits.maxTerminal()) + " " + S.RUB_SUFFIX : '');
			return this;
		}
	}, {
		key: "value",
		value: function value(_value) {
			this._textfield.value(_value) && this.update();
			return this._textfield.value();
		}
	}, {
		key: "update",
		value: function update() {
			this._field.value = this._textfield.text();
			this._update();
		}
	}]);

	return _class55;
})(cj.layouts.AbstractLayout);
cj.LayoutManager = (function (_cj$views$AbstractView2) {
	_inherits(_class56, _cj$views$AbstractView2);

	function _class56(options) {
		_classCallCheck(this, _class56);

		_get(Object.getPrototypeOf(_class56.prototype), "constructor", this).call(this, options);
		this._field = options.field;
		this._layoutName = options.layoutName;
	}

	_createClass(_class56, [{
		key: "validate",
		value: function validate() {
			return this.layout.validate();
		}
	}, {
		key: "submit",
		value: function submit() {
			this.layout.submit();
		}
	}, {
		key: "update",
		value: function update() {
			this._field.valid && [cj.sinap.layouts.WELCOME, cj.sinap.layouts.LIST, cj.sinap.layouts.BUTTONS].indexOf(this._layoutName) === -1 ? this.parent.next.show() : this.parent.next.hide();
		}
	}, {
		key: "render",
		value: function render() {
			var _this28 = this;

			Promise.resolve(cj.layouts._markup[this._layoutName] || _fetch.get("templates/layouts/" + this._layoutName + ".html")).then(function (data) {
				_this28.$el.innerHTML = data;
				_this28.layout = new cj.layouts[_this28._layoutName]({
					el: _this28.$el,
					model: _this28.model,
					field: _this28._field,
					parent: _this28.parent,
					update: _this28.update
				});
				_this28.layout.render().addAsChildTo(_this28); // TODO: убрать зависимость render от присваивания this.layout
				_this28.update();
			});
			return this;
		}
	}]);

	return _class56;
})(cj.views.AbstractView);
cj.views.FormContainerView = (function (_cj$views$AbstractView3) {
	_inherits(_class57, _cj$views$AbstractView3);

	function _class57(options) {
		_classCallCheck(this, _class57);

		_get(Object.getPrototypeOf(_class57.prototype), "constructor", this).call(this, options);

		this._nextButton = options.nextButton;
		this._prevButton = options.prevButton;

		this._form = S.form;

		if (options.direction) S.set(K.SESSION.SPECIAL_FORM_DIRECTION, options.direction);else if (this._form.currentField().type === cj.sinap.elements.TYPE.REFERENCE && !this._form.hasNextField() && this._form.currentField().container) {
			S.set(K.SESSION.SPECIAL_FORM_DIRECTION, K.NAV.PREVIOUS);
		}
		this._adsShown = false;
	}

	_createClass(_class57, [{
		key: "prevPage",
		value: function prevPage() {
			if (S.get(K.SESSION.FAVOURITE_CHANGING) && this._form.currentFieldIsFirst(true) || S.get(K.SESSION.FAVOURITE_ADDING) && this._form.currentField().isFirst) {
				S.set(K.SESSION.FAVOURITE_CONFIRMATION, true);
				S.set(K.SESSION.FAVOURITE_SELECTED, S.get(K.SESSION.FAVOURITE_CHANGING));
				S.remove(K.SESSION.FAVOURITE_CHANGING);
				cj.favs.fill(S.get(K.SESSION.FAVOURITE_SELECTED));
				this.changePage(K.NAV.CONFIRMATION);
				return;
			}
			if (this._form.hasPreviousField()) {
				this._form.goToPreviousField();
				this.render(K.NAV.PREVIOUS);
			}
		}
	}, {
		key: "nextPage",
		value: function nextPage() {
			var _this29 = this;

			this._layoutManager.validate().then(function () {
				_this29.hidePreloader();
				_this29._layoutManager.submit();
				_this29.goNextAfterSubmit();
			});
		}

		// TODO: goNext: rail it on promises.
	}, {
		key: "goNextAfterSubmit",
		value: function goNextAfterSubmit() {
			var _this30 = this;

			var curField = this._form.currentField();
			if (curField.title && (curField.type === cj.sinap.elements.TYPE.FIELD || curField.type === cj.sinap.elements.TYPE.DEPENDENCY)) cj.statistics.page_data({
				fields: _defineProperty({}, curField.name, curField.securedValue)
			});
			//TODO: form can be refreshed only in several cases, but now for simplicity it refreshes on every submit
			this._form.refresh();

			if (this._form.hasNextField()) {
				this._form.goToNextField();
				this.render(K.NAV.NEXT);
			} else return this.showPreloader('Проверка данных').constructor.performOnline().then(function () {
				_this30.hidePreloader();
				if (S.sum.fixed()) S.set(K.SESSION.PAYMENT.USER_SUM, S.sum.fixed());
				if (S.get(K.SESSION.FAVOURITE_CHANGING)) {
					if (S.terms().overpayment) return _this30.changePage(K.NAV.PAY_SUMM_OPTIONS);else return _this30.changePage(K.NAV.SUMM);
				}
				if (S.scenario() === cj.sinap.terms.TYPE.QD && !S.sum.available()) return _this30.changePage(K.NAV.CONFIRMATION);else return _this30.changePage(K.NAV.PHONE);
			}, function (_ref64) {
				var message = _ref64.message;
				var code = _ref64.code;

				while (_this30._form.currentFieldIndex !== 0 && _this30._form.currentFieldLayout() === cj.sinap.layouts.NONE) {
					_this30._form.goToPreviousField();
				}
				cj.statistics.error({ type: K.STAT.ERRORS.USER.VALIDATIONS.FAIL, onlineCode: code });
				return Promise.reject(message);
			})["catch"](function (message) {
				return _this30.hidePreloader().showPopup(cj.views.PopupView.errorPopup(message));
			});
		}
	}, {
		key: "render",

		/**
   * Renders current field, passing by hidden fields (layout === NONE)
   * @param direction Navigation direction, determines what to do if current field is hidden. Possible values are K.NAV.NEXT and K.NAV.PREVIOUS
   */
		value: function render(direction) {
			direction = direction || S.get(K.SESSION.SPECIAL_FORM_DIRECTION) || K.NAV.NEXT;
			S.remove(K.SESSION.SPECIAL_FORM_DIRECTION);

			if (S.get(K.SESSION.FAVOURITE_CHANGING) && this._form.currentField().name === K.FIELDS.WELCOME) {
				this._form.currentField().submit();
				this._form.goToNextField();
				this.render(K.NAV.NEXT);
			}

			this.hidePreloader();
			this._field = this._form.currentField();

			if (!this._field) cj.statistics.error({ type: K.STAT.ERRORS.SINAP.NO_CURRENT_FIELD }, true);
			if (this._field.type === cj.sinap.elements.TYPE.REFERENCE) {
				this.renderReference(direction);
				return;
			}
			if (this._form.currentFieldLayout() === cj.sinap.layouts.NONE) {
				this.renderHiddenField(direction);
				return;
			}
			var fav, val;
			if ((fav = S.get(K.SESSION.FAVOURITE_CHANGING)) && (val = fav.extras[this._field.name] || fav[this._field.name])) this._field.value = this._field.mask ? cj.mask.mask(val.replace(/\s/g, ''), this._field.mask).maskedValue : val;
			this.renderField();
			return this;
		}
	}, {
		key: "renderReference",
		value: function renderReference(direction) {
			var _this31 = this;

			if (direction === K.NAV.NEXT) {
				if (!this._field.isActivated) this.showPreloader('Проверка данных')._form.updateOnline().then(function () {
					return _this31.render(K.NAV.NEXT);
				}, function (message) {
					return _this31.hidePreloader().showPopup(cj.views.PopupView.errorPopup(message)).then(function () {
						return _this31.prevPage();
					});
				});else this.goNextAfterSubmit();
			} else {
				this._field.container = null;
				this.prevPage();
			}
		}
	}, {
		key: "renderHiddenField",
		value: function renderHiddenField(direction) {
			//hidden field
			if (direction === K.NAV.NEXT) {
				this._field.submit();
				this.goNextAfterSubmit();
			} else {
				this._field.unsubmit();
				this.prevPage();
			}
		}
	}, {
		key: "renderField",
		value: function renderField() {
			var _this32 = this;

			this.clear();

			this._prevButton.off().on(function () {
				return _this32.prevPage();
			});
			this._nextButton.off().on(function () {
				return _this32.nextPage();
			});

			this._field.unsubmit();
			this._nextButton.hide();

			!this._form.currentFieldIsFirst() || cj.EXTERNAL ? this._prevButton.show() : this._prevButton.hide();
			this._layoutManager = new cj.LayoutManager({
				el: cj.DOM.byId('v-form-container'),
				field: this._field,
				layoutName: this._form.currentFieldLayout(),
				model: this.model,
				parent: this.parent,
				container: this
			});
			this._layoutManager // Так нужно чтобы установить this._layoutManager
			.render().addAsChildTo(this);

			cj.DOM.header(this._field.groupTitle || this._field.prompt || this._field.title || 'Выберите способ оплаты');
			cj.DOM.addRootClass('g-' + this._form.currentFieldLayout().toLowerCase());

			if (this._form.currentField().fields && this._form.currentField().fields.length > 1) cj.APP._fieldName = this._form.currentMainField().fields.map(function (f) {
				return f.title ? f.name : K.FIELDS.HIDDEN;
			}).join('&');else if (this._form.currentField().switches && this._form.currentField().switches.length > 0) cj.APP._fieldName = [this._form.currentField().name].concat(this._form.currentField().switches).join('&');else if (this._form.currentFieldIsFirst() && S.scenario() === cj.sinap.terms.TYPE.QW_ONLINE) cj.APP._fieldName = K.FIELDS.WELCOME;else if (this._form.currentField().title) cj.APP._fieldName = this._form.currentField().name;else cj.APP._fieldName = K.FIELDS.HIDDEN;

			if (cj.APP._fieldName !== K.FIELDS.HIDDEN) cj.statistics.page();

			if (this._field.name === K.FIELDS.ACCOUNT && !this._adsShown) {
				this._adsShown = true;
				this.parent.showAds();
			}

			if (this._field.sideInfo) {
				this.showSideInfo({ text: this._field.sideInfo });
			} else {
				this.hideSideInfo();
			}
		}
	}, {
		key: "update",
		value: function update() {
			this._field.valid && [cj.sinap.layouts.WELCOME, cj.sinap.layouts.LIST, cj.sinap.layouts.BUTTONS].indexOf(this._form.currentFieldLayout()) === -1 ? this._nextButton.show() : this._nextButton.hide();
		}
	}, {
		key: "clear",
		value: function clear() {
			_get(Object.getPrototypeOf(_class57.prototype), "clear", this).call(this);
			cj.DOM.header('');
			cj.DOM.removeAllRootClasses();
		}
	}, {
		key: "destroy",
		value: function destroy() {
			_get(Object.getPrototypeOf(_class57.prototype), "destroy", this).call(this);
			this._nextButton = null;
			this._prevButton = null;
		}
	}], [{
		key: "performOnline",
		value: function performOnline() {
			return S.scenario() === cj.sinap.terms.TYPE.QD ? Promise.resolve() : new cj.sinap.Request("terms/" + S.qw() + "/validations", 'POST', { fields: S.form.values }).then(function () {
				return Promise.resolve();
			});
		}
	}]);

	return _class57;
})(cj.views.AbstractView);

cj.views.AnimatedTextFieldElement = (function (_cj$views$AbstractView4) {
	_inherits(_class58, _cj$views$AbstractView4);

	function _class58(options) {
		_classCallCheck(this, _class58);

		_get(Object.getPrototypeOf(_class58.prototype), "constructor", this).call(this, options);
		this._visualMask = cj.mask.displayCharForMask(options.mask);
		this._defaultText = options.text;
		this.$text = cj.DOM.firstChildByClassDeep(this.$el, 'text') || this.$el.appendChild(cj.DOM.create('span', { "class": 'text' }));
		this.$mask = cj.DOM.firstChildByClassDeep(this.$el, 'mask') || this.$el.appendChild(cj.DOM.create('span', { "class": 'mask' }));
		switch (this._visualMask) {
			case '':
				this._widthMask = 'X';
				cj.DOM.hide(this.$mask);
				break;
			case ' ':
				this._visualMask = this._widthMask = '&nbsp;';
				cj.DOM.hide(this.$mask);
				break;
			case options.mask:
				this._widthMask = this._visualMask;
				break;
			default:
				this._widthMask = 'X';
				break;
		}
		this.mask(this._visualMask);
		this.text(this._defaultText);
	}

	_createClass(_class58, [{
		key: "text",
		value: function text(value, timeout) {
			var _this33 = this;

			if (!(value || value === '')) return this._text;
			clearTimeout(this._textTimer);
			if (Number(timeout)) return this._textTimer = setTimeout(function () {
				return _this33.text(value);
			}, Number(timeout));
			this._text = value;
			this._inProgress = false;
			this.$text.innerHTML = this._text;
		}
	}, {
		key: "mask",
		value: function mask(value, timeout) {
			var _this34 = this;

			if (!(value || value === '')) return this._visualMask;
			clearTimeout(this._maskTimer);
			if (Number(timeout)) return this._maskTimer = setTimeout(function () {
				return _this34.mask(value);
			}, Number(timeout));
			this.$mask.innerHTML = value;
		}
	}, {
		key: "activate",
		value: function activate(char) {
			cj.DOM.addClass(this.$el, 'active');
			// Этот вызов помогает пододвигать "лишние" элементы в поле на нужную высоту
			this.mask(this._widthMask /*, this._visualMask === this._widthMask ? 0 : 200*/);
			this.text(char.toString());
		}
	}, {
		key: "deactivate",
		value: function deactivate() {
			if (this._inProgress) return;
			this._inProgress = true;
			cj.DOM.removeClass(this.$el, 'active');
			// А этот восстанавливает ширину в поле после стирания "лишних" элементов
			this.mask(this._visualMask, this._visualMask === '' ? 200 : 0);
			this.text(this._defaultText, 200);
			// Что за магические 200?
			// Ищи значение времени анимации при .animated-textfield .animated-element .animated-element-mask,.animated-textfield .animated-element .animated-element-text в core_css
		}
	}]);

	return _class58;
})(cj.views.AbstractView);
cj.views.Button = (function (_cj$views$AbstractView5) {
	_inherits(_class59, _cj$views$AbstractView5);

	function _class59(options) {
		_classCallCheck(this, _class59);

		_get(Object.getPrototypeOf(_class59.prototype), "constructor", this).call(this, options);
		this.$content = cj.DOM.firstChildByClass(this.$el, 'button-content');
		this._code = this.$el ? this.$el.getAttribute('data-code') : '';
		this._content = options.content || (this.$content ? '' : this.$el.innerHTML);
		if (!this.$content && this.$el) {
			this.$content = cj.DOM.create('div', { "class": 'button-content' });
			this.$el.innerHTML = '';
			this.$el.insertBefore(this.$content, this.$el.firstChild);
		}
		this.content(this._content);
		if (options.code) this.code(options.code);
		this.pushed = false;
	}

	_createClass(_class59, [{
		key: "render",
		value: function render() {
			var _this35 = this;

			this.$el.onmousedown = function () {
				if (!_this35.isEnabled || !_this35.isVisible || !_this35.$el) return;
				_this35.pushed = true;
				document.onmouseup = function () {
					_this35.pushed = false;
					document.onmouseup = null;
				};
				_this35.$el.onmouseup = function () {
					if (!_this35.pushed) return;
					_this35.trigger(_this35.code());
				};
			};
			return this;
		}
	}, {
		key: "code",
		value: function code(link) {
			return this._code = link && link.toString() || this._code;
		}
	}, {
		key: "content",
		value: function content(value) {
			if (value) {
				this._content = value;
				this.$content && (this.$content.innerHTML = value);
			}
			return this._content;
		}
	}, {
		key: "clear",
		value: function clear() {
			if (this.$el) this.$el.onmousedown = null;
		}
	}, {
		key: "pushed",
		get: function get() {
			return this._pushed;
		},
		set: function set(bool) {
			this._pushed = bool;
			if (bool && !cj.DOM.hasClass(this.$el, 'pushed')) this.addClass('pushed');
			if (!bool && cj.DOM.hasClass(this.$el, 'pushed')) this.removeClass('pushed');
		}
	}]);

	return _class59;
})(cj.views.AbstractView);

cj.views.SwitchButton = (function (_cj$views$Button) {
	_inherits(_class60, _cj$views$Button);

	function _class60(options) {
		var _this36 = this;

		_classCallCheck(this, _class60);

		_get(Object.getPrototypeOf(_class60.prototype), "constructor", this).call(this, options.assign({
			el: options.parentElement.appendChild(cj.DOM.create('div', { "class": "switch-button" + (options.upper ? ' upper' : '') })),
			content: "<img/><div>" + S.form.fieldWithName(options.fieldName).title + "</div>",
			code: options.fieldName
		}));
		this._field = S.form.fieldWithName(this._code);
		if (this._field.isOn()) this.addClass('active');
		this.on(function () {
			return _this36._field["switch"]() ? _this36.addClass('active') : _this36.removeClass('active');
		});
	}

	return _class60;
})(cj.views.Button);
cj.views.CashBlockView = (function (_cj$views$AbstractView6) {
	_inherits(_class61, _cj$views$AbstractView6);

	function _class61(options) {
		_classCallCheck(this, _class61);

		_get(Object.getPrototypeOf(_class61.prototype), "constructor", this).call(this, options);
		this.$label = cj.DOM.firstChildByClass(this.$el, 'label');
		this.$value = cj.DOM.firstChildByClass(this.$el, 'value');
		this.$warning = cj.DOM.firstChildByClass(cj.DOM.firstChildByClass(this.$el, 'warning-bubble'), 'cash-to-insert');
	}

	_createClass(_class61, [{
		key: "value",
		value: function value(val, noCurrency) {
			return this.setter(this.$value, (val || val === 0) && "<span>" + cj.toSum(val) + "</span>" + (noCurrency ? '' : ' ' + S.RUB_SUFFIX));
		}
	}, {
		key: "label",
		value: function label(val) {
			return this.setter(this.$label, val);
		}
	}, {
		key: "warning",
		value: function warning(val) {
			return this.setter(this.$warning, val);
		}
	}, {
		key: "setter",
		value: function setter(element, value) {
			if (!element) return '';
			if (value || value === '' || value === 0) element.innerHTML = value;
			return element.innerHTML;
		}
	}]);

	return _class61;
})(cj.views.AbstractView);
cj.views.GroupView = (function (_cj$views$AbstractView7) {
	_inherits(_class62, _cj$views$AbstractView7);

	function _class62(options) {
		_classCallCheck(this, _class62);

		_get(Object.getPrototypeOf(_class62.prototype), "constructor", this).call(this, options);
		this._buttons = options.elements.map(function (item) {
			return new cj.views.Button({ el: item, timeout: 100 });
		});
	}

	_createClass(_class62, [{
		key: "render",
		value: function render() {
			var _this37 = this;

			this._buttons.forEach(function (item, index) {
				return item.render().on(function (code) {
					return _this37.trigger(index, code);
				}).addAsChildTo(_this37);
			});
			return this;
		}
	}]);

	return _class62;
})(cj.views.AbstractView);
cj.views.Keyboard = (function (_cj$views$AbstractView8) {
	_inherits(_class63, _cj$views$AbstractView8);

	function _class63(options) {
		var _this38 = this;

		_classCallCheck(this, _class63);

		_get(Object.getPrototypeOf(_class63.prototype), "constructor", this).call(this, options);
		this._keys = [];

		this._layouts = {
			'рус': {
				map: [['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'], ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'], ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ё']],
				example: 'абв',
				options: {
					isLanguage: true
				}
			},
			eng: {
				map: [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['z', 'x', 'c', 'v', 'b', 'n', 'm']],
				example: 'abc',
				options: {
					isLanguage: true
				}
			},
			sym: {
				map: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '@', '-'], ['#', '%', '$', '+', '(', ')', '*', ':'], [';', '_', '/', ',', '.', '!', '?']],
				example: '123',
				options: {
					shift: false
				}
			},
			email: {
				map: [['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '_', '@'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '.'], ['z', 'x', 'c', 'v', 'b', 'n', 'm', '-']],
				example: '@bc',
				options: {
					shift: false,
					space: false,
					symbols: false,
					eraseAll: false,
					langSwitch: false
				}
			}
		};
		this._layout = options.layout || 'рус';

		this.$el.innerHTML = '';
		var $rows = [0, 1, 2, 3].map(function (rowNum) {
			return _this38.$el.appendChild(cj.DOM.create('table', {
				"class": "keyboard-row row-" + rowNum,
				children: [cj.DOM.create('tr', {
					children: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (button) {
						return _this38.generateButton("key key-" + button);
					})
				})]
			}));
		}).map(function (table) {
			return table.firstChild;
		});
		this.$space = $rows[3].appendChild(this.generateButton('key space')).firstChild;
		this.$eraseAll = $rows[3].appendChild(this.generateButton('key special erase-all')).firstChild;
		this.$langSwitch = $rows[3].insertBefore(this.generateButton('key special'), $rows[3].firstChild).firstChild;
		this.$symbols = $rows[3].insertBefore(this.generateButton('key special'), $rows[3].firstChild).firstChild;
		this.$shift = $rows[2].insertBefore(this.generateButton('key special'), $rows[2].firstChild).firstChild;
		this.$rows = $rows.map(function (row) {
			return Array.prototype.slice.apply(row.children).filter(function (item) {
				return cj.DOM.hasClass(item.firstChild, 'key-\\d\\d?');
			});
		});
	}

	_createClass(_class63, [{
		key: "generateButton",
		value: function generateButton(className) {
			return cj.DOM.create('td', { children: [cj.DOM.create('div', { "class": className })] });
		}
	}, {
		key: "showSymbols",
		value: function showSymbols() {
			if (this._layout === 'sym') return;
			this._symSwitch.trigger();
		}
	}, {
		key: "showLetters",
		value: function showLetters() {
			if (this._layout !== 'sym') return;
			this._langSwitch.trigger();
		}
	}, {
		key: "updateKeys",
		value: function updateKeys() {
			var _this39 = this;

			this._keys.forEach(function (row, i) {
				return row.forEach(function (key, j) {
					var c = (_this39.currentLayout().map[i] || [])[j];
					key.removeClass('pushed');
					if (c) {
						c = _this39._isShifted ? c.toUpperCase() : c.toLowerCase();
						key.code(c);
						key.content(_this39._layout === 'email' ? c.toUpperCase() : c);
						cj.DOM.show(key.$el.parentNode);
					} else cj.DOM.hide(key.$el.parentNode);
				});
			});
			this.currentLayout().options.shift === undefined || this.currentLayout().options.shift === true ? cj.DOM.show(this._shift.$el.parentNode) : cj.DOM.hide(this._shift.$el.parentNode);
			this.currentLayout().options.space === undefined || this.currentLayout().options.space === true ? cj.DOM.show(this._space.$el.parentNode) : cj.DOM.hide(this._space.$el.parentNode);
			(this.currentLayout().options.symbols === undefined || this.currentLayout().options.symbols === true) && this._layout !== 'sym' ? cj.DOM.show(this._symSwitch.$el.parentNode) : cj.DOM.hide(this._symSwitch.$el.parentNode);
			this.currentLayout().options.eraseAll === undefined || this.currentLayout().options.eraseAll === true ? cj.DOM.show(this._eraseAllButton.$el.parentNode) : cj.DOM.hide(this._eraseAllButton.$el.parentNode);
			(this.currentLayout().options.isLanguage === undefined || this.currentLayout().options.isLanguage === false) && this.currentLayout().options.langSwitch === false ? cj.DOM.hide(this._langSwitch.$el.parentNode) : cj.DOM.show(this._langSwitch.$el.parentNode);
		}
	}, {
		key: "render",
		value: function render() {
			var _this40 = this;

			this.clear();
			this._keys = this.$rows.map(function (row) {
				return row.map(function ($key) {
					return new cj.views.Button({ el: $key.firstChild }).render().on(function (code) {
						return _this40.trigger(code);
					}).addAsChildTo(_this40);
				});
			});
			this._space = new cj.views.Button({
				el: this.$space,
				content: '&nbsp;'
			}).render().on(function () {
				return _this40.trigger(' ');
			}).addAsChildTo(this);
			this._shift = new cj.views.Button({ el: this.$shift }).render().on(function (code) {
				return _this40.setShift(!_this40._isShifted);
			}).addAsChildTo(this);
			this._langSwitch = new cj.views.Button({
				el: this.$langSwitch,
				content: this.nextLang().toUpperCase()
			}).render().on(function () {
				cj.DOM.show(_this40._symSwitch.$el.parentNode);
				// HACK
				_this40._layout = _this40._layout === 'sym' ? _this40._langSwitch._content.toLowerCase() : _this40.nextLang();
				_this40._langSwitch.content(_this40.nextLang().toUpperCase());
				_this40.setShift(_this40._isShifted);
				_this40.updateKeys();
			}).addAsChildTo(this);
			this._symSwitch = new cj.views.Button({
				el: this.$symbols,
				content: '123'
			}).render().on(function () {
				_this40._langSwitch.content(_this40._layout.toUpperCase());
				_this40._layout = 'sym';
				_this40.updateKeys();
				cj.DOM.hide(_this40._symSwitch.$el.parentNode);
			}).addAsChildTo(this);
			this._eraseAllButton = new cj.views.Button({
				el: this.$eraseAll,
				content: 'СТЕРЕТЬ ВСЕ'
			}).render().on(function () {
				cj.statistics.click({
					type: K.STAT.CLICK.TYPES.BUTTON,
					value: K.STAT.CLICK.BUTTON.ERASE_ALL
				});
				_this40.trigger('clear');
			}).addAsChildTo(this);
			this.setShift(true);
			return this;
		}
	}, {
		key: "currentLayout",
		value: function currentLayout() {
			return this._layouts[this._layout];
		}
	}, {
		key: "setShift",
		value: function setShift(value) {
			if (this._layout === 'email') value = false;
			this._shift.content(!!value ? this.currentLayout().example.toLowerCase() : this.currentLayout().example.toUpperCase());
			if (this._isShifted === !!value) return;
			this._isShifted = !!value;
			this.updateKeys();
		}
	}, {
		key: "nextLang",
		value: function nextLang() {
			var langs = this._layouts.map(function (layout, name) {
				return layout.options.isLanguage ? name : null;
			}).filter(function (a) {
				return a;
			}).reduce(function (memo, item) {
				memo.push(item);
				return memo;
			}, []);
			var langIndex = langs.indexOf(this._layout);
			return langIndex < langs.length - 1 ? langs[langIndex + 1] : langs[0];
		}
	}]);

	return _class63;
})(cj.views.AbstractView);

cj.views.Numpad = (function (_cj$views$AbstractView9) {
	_inherits(_class64, _cj$views$AbstractView9);

	function _class64(options) {
		_classCallCheck(this, _class64);

		_get(Object.getPrototypeOf(_class64.prototype), "constructor", this).call(this, options);
		this.$el.innerHTML = '';
		this.$el.appendChild(cj.DOM.create('table', {
			children: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0].concat(options.withPoint ? ['.'] : [])].map(function (row) {
				return cj.DOM.create('tr', {
					children: row.map(function (key) {
						return cj.DOM.create('td', {
							children: [cj.DOM.create('div', {
								id: "key-" + (cj.correctNumbers(key) ? key : 'point'),
								'data-code': key,
								text: key
							})],
							colspan: 4 - row.length
						});
					})
				});
			})
		}));
	}

	_createClass(_class64, [{
		key: "render",
		value: function render() {
			var _this41 = this;

			this.clear()._keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].concat(cj.DOM.byId('key-point') ? ['point'] : []).map(function (val) {
				return new cj.views.Button({ el: cj.DOM.byId('key-' + val) }).render().on(function (code) {
					return _this41.trigger(code);
				}).addAsChildTo(_this41);
			});
			return this;
		}
	}]);

	return _class64;
})(cj.views.AbstractView);

cj.views.PopupView = (function (_cj$views$AbstractView10) {
	_inherits(_class65, _cj$views$AbstractView10);

	function _class65(options) {
		var _this42 = this;

		_classCallCheck(this, _class65);

		//TODO: refactor
		_get(Object.getPrototypeOf(_class65.prototype), "constructor", this).call(this, options);

		this._title = options.title || '';
		this._message = options.message || '';
		this._type = options.type;
		this._buttonsConfig = options.buttons;
		this._hide = options.hide;

		this.$el.className = 'popup hidden ' + (options.cssClass ? options.cssClass : '');

		var $container = cj.DOM.firstChildByClass(this.$el, 'popup-container');
		this.$buttonsContainer = cj.DOM.firstChildByClass($container, 'popup-buttons-container');

		this.$title = cj.DOM.firstChildByClass($container, 'title');
		this.$title && (this.$title.innerHTML = this._title);

		this.$message = cj.DOM.firstChildByClass($container, 'message');
		this.$message && (this.$message.innerHTML = this._message);

		this.$buttonsContainer.className = 'popup-buttons-container';
		this._buttons = cj.DOM.findByClass(this.$buttonsContainer, 'popup-button').filter(function (item, index) {
			return _this42._buttonsConfig[index] ? cj.DOM.show(item) | true : cj.DOM.hide(item) & false;
		}).map(function (item, index) {
			item.className = 'popup-button';
			cj.DOM.addClass(item, _this42._buttonsConfig[index]["class"]);
			return new cj.views.Button({
				el: item,
				content: _this42._buttonsConfig[index].html,
				code: index.toString()
			});
		});
		cj.DOM.addClass(this.$buttonsContainer, 'n' + this._buttons.length);
	}

	_createClass(_class65, [{
		key: "render",
		value: function render(resolve) {
			var _this43 = this;

			this._buttons.forEach(function (button) {
				return button.render().on(function (code) {
					cj.statistics.click({
						type: K.STAT.CLICK.TYPES.BUTTON,
						value: _this43._type !== K.STAT.POPUP.QUESTION ? K.STAT.CLICK.BUTTON.POPUP.OK : _this43._buttonsConfig[code].type
					});
					_this43._hide();
					resolve(_this43._buttonsConfig[code].type || 'ok');
					//if (this._buttonsConfig[code].type !== K.STAT.CLICK.BUTTON.POPUP.NO;
				}).addAsChildTo(_this43);
			});
			return this;
		}
	}, {
		key: "message",
		value: function message(val) {
			if (val || val === '') {
				this._message = val;
				this.$message && (this.$message.innerHTML = this._message);
			}
		}
	}, {
		key: "title",
		value: function title(val) {
			if (val || val === '') {
				this._title = val;
				this.$title && (this.$title.innerHTML = this._title);
			}
		}
	}], [{
		key: "messagePopup",
		value: function messagePopup(config) {
			return {
				title: config.title || '',
				message: (typeof config === 'string' ? config : config.message) || '',
				type: K.STAT.POPUP.INFO,
				buttons: config.buttons || [{
					html: config.button || 'OK',
					"class": 'regular-button'
				}],
				cssClass: config.cssClass || ''
			};
		}
	}, {
		key: "errorPopup",
		value: function errorPopup(config) {
			return cj.views.PopupView.messagePopup(config).assign({
				title: config.title || 'Ошибка!',
				message: (typeof config === 'string' ? config : config.message) || 'Неизвестная ошибка приложения.',
				type: K.STAT.POPUP.ERROR,
				cssClass: config.cssClass || 'error'
			});
		}
	}, {
		key: "questionPopup",
		value: function questionPopup(config) {
			return cj.views.PopupView.messagePopup(config).assign({
				type: K.STAT.POPUP.QUESTION,
				buttons: [{
					html: (typeof config.no === 'string' ? config.no : config.no.html) || 'Нет',
					"class": config.no && config.no["class"] || 'regular-button',
					type: K.STAT.CLICK.BUTTON.POPUP.NO
				}, {
					html: (typeof config.yes === 'string' ? config.yes : config.yes.html) || 'Да',
					"class": config.yes && config.yes["class"] || 'primary-button',
					type: K.STAT.CLICK.BUTTON.POPUP.YES
				}]
			});
		}
	}]);

	return _class65;
})(cj.views.AbstractView);
cj.views.PreloaderView = (function (_cj$views$AbstractView11) {
	_inherits(_class66, _cj$views$AbstractView11);

	function _class66(options, ad) {
		_classCallCheck(this, _class66);

		_get(Object.getPrototypeOf(_class66.prototype), "constructor", this).call(this, options);

		this.$box = cj.DOM.firstChildByClass(cj.DOM.firstChildByClass(this.$el, 'preloader'), 'preloader-message-box');
		this.$logo = cj.DOM.firstChildByClass(this.$box, 'preloader-logo');
		this.$header = cj.DOM.firstChildByClass(this.$box, 'preloader-header');
		this.$text = cj.DOM.firstChildByClass(this.$box, 'preloader-message');

		this.$ad = cj.DOM.byId('ad-preloader');
		if (ad) {
			this.$ad.innerHTML = '';
			this.$ad.appendChild(cj.DOM.create('img', { src: ad }));
			cj.DOM.show(this.$ad);
		} else cj.DOM.hide(this.$ad);
	}

	_createClass(_class66, [{
		key: "render",
		value: function render(_ref65) {
			var _ref65$header = _ref65.header;
			var header = _ref65$header === undefined ? 'Загрузка данных' : _ref65$header;
			var _ref65$text = _ref65.text;
			var text = _ref65$text === undefined ? 'Подождите, пожалуйста.' : _ref65$text;
			var _ref65$logo = _ref65.logo;
			var logo = _ref65$logo === undefined ? '../img/ui/corejs/logos/qiwi_big.png' : _ref65$logo;

			this.setValue(this.$header, header);
			this.setValue(this.$text, text);
			this.setValue(this.$logo, logo, 'src');
			return this;
		}
	}, {
		key: "setValue",
		value: function setValue(element, value, customProp) {
			if ((value || value === '') && element) element[customProp || 'innerHTML'] = value;
			return this;
		}
	}]);

	return _class66;
})(cj.views.AbstractView);
cj.views.SideInfoView = (function (_cj$views$AbstractView12) {
	_inherits(_class67, _cj$views$AbstractView12);

	function _class67(options) {
		_classCallCheck(this, _class67);

		_get(Object.getPrototypeOf(_class67.prototype), "constructor", this).call(this, options);
		this.$info = cj.DOM.byId('side-info');
	}

	_createClass(_class67, [{
		key: "render",
		value: function render(_ref66) {
			var _this44 = this;

			var text = _ref66.text;

			this.$info.innerHTML = text;
			cj.DOM.removeClass(this.$info, 'default');
			setTimeout(function () {
				return cj.DOM.removeClass(_this44.$info, 'moved');
			}, 100);
			return this;
		}
	}, {
		key: "hide",
		value: function hide() {
			this.$info.innerHTML = '';
			cj.DOM.addClass(this.$info, 'default');
			cj.DOM.addClass(this.$info, 'moved');
			return this;
		}
	}]);

	return _class67;
})(cj.views.AbstractView);
cj.views.TextField = (function (_cj$views$AbstractView13) {
	_inherits(_class68, _cj$views$AbstractView13);

	/* Textfield (временная версия)
  * -- Нет ничего более постоянного чем временное.
  * maxChars - максимальное количество символов в поле, дальше просто не вбивается и не записывается
  * $el - DOM-элемент с классом textfield
  * title - заголовок, если есть.
  * mask - маска, если поле маскированное
  * className - дополнительный класс для textfield (например, little-text)
  * suggestFn - функция возврата suggest'ов
  * eraseText - текст на кнопке "стереть"
  * update - ссылка на фукцию из родительского объекта, которая вызывает при стирании текста
  */

	function _class68(_ref67) {
		var maxChars = _ref67.maxChars;
		var mask = _ref67.mask;
		var fieldName = _ref67.fieldName;
		var suggest = _ref67.suggest;
		var el = _ref67.el;
		var _ref67$title = _ref67.title;
		var title = _ref67$title === undefined ? '' : _ref67$title;
		var _ref67$update = _ref67.update;
		var update = _ref67$update === undefined ? function () {} : _ref67$update;
		var _ref67$eraseText = _ref67.eraseText;
		var eraseText = _ref67$eraseText === undefined ? 'Стереть' : _ref67$eraseText;

		_classCallCheck(this, _class68);

		_get(Object.getPrototypeOf(_class68.prototype), "constructor", this).call(this, { el: el });
		this.maxChars = maxChars || Number.MAX_VALUE;
		this._update = update;
		this._fieldName = fieldName;
		this._suggest = suggest || null;
		this.$el.innerHTML = '';
		var $eraseButton;

		this.$el.appendChild(this.$title = cj.DOM.create('div', { "class": 'title', text: title }));
		this.$el.appendChild(this.$field = cj.DOM.create('div', { "class": 'field' }));
		this.$field.appendChild(this.$suggests = cj.DOM.create('div', { "class": 'suggests hidden' }));
		this.$field.appendChild(this.$textContainer = cj.DOM.create('div', { "class": 'text-container' }));

		if (mask) {
			var $mask;
			this.$textContainer.appendChild($mask = cj.DOM.create('div', { "class": 'masked' }));
			this._mask = new cj.mask.Mask(mask);
			var optional = this._mask.maskText.split('').filter(function (c) {
				return c === cj.mask.OPTIONAL_SECTION_START;
			}).length > 0;
			this._elements = this._mask.maskText.split('').map(function (c) {
				return new cj.views.AnimatedTextFieldElement({
					el: $mask.appendChild(cj.DOM.create('div', { "class": 'element' })),
					text: optional ? '' : '-',
					mask: optional ? '' : c
				});
			});
		} else this.$textContainer.appendChild(this.$text = cj.DOM.create('div', { "class": 'text' }));

		this.$textContainer.appendChild($eraseButton = cj.DOM.create('div', { "class": 'erase-button' }));
		if (eraseText.length < 2) {
			$eraseButton.style.width = '60px';
			cj.DOM.addClass($eraseButton, 'big-text');
		}
		this.eraseButton = new cj.views.Button({
			el: $eraseButton,
			content: eraseText
		});
		this._text = this._value = '';
	}

	_createClass(_class68, [{
		key: "render",
		value: function render() {
			var _this45 = this;

			this.$el.onmousedown = function () {
				return _this45.trigger();
			};
			this.eraseButton.on(function () {
				cj.statistics.click({
					type: K.STAT.CLICK.TYPES.BUTTON,
					value: K.STAT.CLICK.BUTTON.ERASE
				});
				_this45.erase();
				_this45._update();
			}).render().addAsChildTo(this);
			return this;
		}
	}, {
		key: "text",
		value: function text(value) {
			if (value || value === '') {
				// TODO: убрать разные text-value сеттеры
				this._text = value.toString();
				this.$text.innerHTML = this._text;
			}
			return this._text || '';
		}
	}, {
		key: "value",
		value: function value(_value2, noSuggests) {
			var _this46 = this;

			if ((_value2 || _value2 === '') && _value2.toString().length <= this.maxChars) {
				if (this._mask) {
					this._value = _value2.toString();
					this._mask.setPureValue(this._value);
					if (this._mask.maskedChars < this._value.length) this._value = this._value.substr(0, this._mask.maskedChars);
					this._text = this._mask.maskedValue;
					this._elements.forEach(function (elem, index) {
						return _this46._text.charAt(index) ? elem.activate(_this46._text.charAt(index)) : elem.deactivate();
					});
				} else {
					this._text = this._value = _value2.toString();
					this.$text.innerHTML = this._text;
				}
				if (this._suggest && !noSuggests) this.showSuggests(this._suggest(this._value));
			}
			return this._value;
		}
	}, {
		key: "showSuggests",
		value: function showSuggests(suggests) {
			var _this47 = this;

			this.hideSuggests();
			if (!suggests || suggests.length === 0) return;
			suggests.filter(function (s, i) {
				return i < 3;
			}).forEach(function (suggest) {
				var $s = cj.DOM.create('div', {
					children: [cj.DOM.create('span', { text: suggest.replace(new RegExp(_this47._value + ".*", 'i'), '') }), cj.DOM.create('span', { text: suggest.replace(new RegExp(".*(" + _this47._value + ").*", 'i'), '$1'), "class": 'highlight' }), cj.DOM.create('span', { text: suggest.replace(new RegExp(".*" + _this47._value, 'i'), '') })]
				});
				$s.onmousedown = function () {
					cj.statistics.click({
						type: K.STAT.CLICK.TYPES.SUGGEST,
						value: _this47._fieldName
					});
					_this47.value(suggest);
					_this47._update();
					_this47.hideSuggests();
				};
				_this47.$suggests.appendChild($s);
			});
			cj.DOM.addClass(this.$title, 'suggests');
			cj.DOM.show(this.$suggests);
		}
	}, {
		key: "hideSuggests",
		value: function hideSuggests() {
			Array.prototype.slice.apply(this.$suggests.childNodes).forEach(function ($s) {
				return $s.onmousedown = null;
			});
			this.$suggests.innerHTML = '';
			cj.DOM.removeClass(this.$title, 'suggests');
			cj.DOM.hide(this.$suggests);
		}
	}, {
		key: "appendText",
		value: function appendText(value) {
			// Проверяет только на то что value имеется и меньше maxChars
			if (value && (!this._value || this._value.length + value.length <= this.maxChars)) this.value(this._value + value);
		}
	}, {
		key: "erase",
		value: function erase() {
			if (this._value.length) this.value(this._value.substr(0, this._value.length - 1));
		}
	}, {
		key: "currentMaskSymbol",
		value: function currentMaskSymbol() {
			if (!this._mask || !this._mask.remainedChars()) return null;
			return this._mask.nextEditableChar();
		}
	}, {
		key: "isUpperCase",
		value: function isUpperCase() {
			var v = this.value();
			return v.length === 0 || [' ', '.', '-', '!'].indexOf(v.charAt(v.length - 1)) !== -1;
		}
	}]);

	return _class68;
})(cj.views.AbstractView);
cj.layouts.Numeric = (function (_cj$layouts$FieldLayoutBase) {
	_inherits(_class69, _cj$layouts$FieldLayoutBase);

	function _class69(options) {
		_classCallCheck(this, _class69);

		_get(Object.getPrototypeOf(_class69.prototype), "constructor", this).call(this, options);
		this._numpad = new cj.views.Numpad({ el: cj.DOM.byId('numpad') });
	}

	_createClass(_class69, [{
		key: "render",
		value: function render() {
			var _this48 = this;

			_get(Object.getPrototypeOf(_class69.prototype), "render", this).call(this);
			this._numpad.render().on(function (code) {
				_this48._textfield.appendText(code.toString());
				_this48.update();
			}).addAsChildTo(this);
			return this;
		}
	}]);

	return _class69;
})(cj.layouts.FieldLayoutBase);
cj.layouts.Buttons = (function (_cj$layouts$AbstractLayout2) {
	_inherits(_class70, _cj$layouts$AbstractLayout2);

	function _class70(options) {
		var _this49 = this;

		_classCallCheck(this, _class70);

		_get(Object.getPrototypeOf(_class70.prototype), "constructor", this).call(this, options);

		if (this._field.widget) this._choices = this._field.widget.choices;else this._choices = [{
			value: this._field.value,
			title: this._field.name
		}];
		this._buttons = this._choices.map(function (item, index) {
			return new cj.views.Button({
				el: cj.DOM.byId('option-button-' + (index + (options.startButtonIndex || 0))),
				content: "<div class=\"header\">" + item.title + "</div>",
				code: index.toString()
			}).addAsChildTo(_this49);
		});
		this._switches = this._field.switches.map(function (item) {
			return new cj.views.SwitchButton({
				parentElement: cj.DOM.byId('layout-buttons-container'),
				fieldName: item
			}).addAsChildTo(_this49);
		});
		this._field.value = null;
	}

	_createClass(_class70, [{
		key: "render",
		value: function render() {
			var _this50 = this;

			if (this._buttons.length > 4) return cj.statistics.error({ type: K.STAT.ERRORS.SINAP.ELEMENTS.RADIO_BUTTONS }, true);
			this._buttons.forEach(function (button) {
				return button.render().show().on(function (code) {
					_this50._buttons.forEach(function (button) {
						return button.off();
					});
					_this50._field.value = _this50._choices[Number(code)].value;
					_this50.parent.next.trigger();
				});
			});
			if (this._buttons.length < 3) cj.DOM.addClass(cj.DOM.firstChildByClass(cj.DOM.byId('layout-buttons-container'), 'button-row'), 'vertical');
			this._switches.forEach(function (button) {
				return button.render().show();
			});
			cj.DOM.headerComment('');
			return this;
		}
	}]);

	return _class70;
})(cj.layouts.AbstractLayout);
cj.layouts.Info = (function (_cj$layouts$AbstractLayout3) {
	_inherits(_class71, _cj$layouts$AbstractLayout3);

	function _class71(options) {
		var _this51 = this;

		_classCallCheck(this, _class71);

		_get(Object.getPrototypeOf(_class71.prototype), "constructor", this).call(this, options);

		this.$table = cj.DOM.firstChildByClassDeep(this.$el, 'table');
		this._lines = 0;
		this._field.fields.filter(function (field) {
			return !(field instanceof cj.sinap.elements.fields.SwitchField);
		}).forEach(function (f) {
			return _this51.addLine(f.title, f.value);
		});
		if (this._lines >= 4) cj.DOM.addClass(this.$table, 'little');
		if (this._lines >= 8) cj.DOM.addClass(this.$table, 'compact');
		cj.DOM.header(this._field.groupTitle || 'Информация');
		cj.DOM.headerComment(' ');
	}

	_createClass(_class71, [{
		key: "render",
		value: function render() {
			var _this52 = this;

			this._field.switches.map(function (item) {
				return new cj.views.SwitchButton({
					parentElement: cj.DOM.byId('v-form-container'),
					fieldName: item
				}).render().show().addAsChildTo(_this52).addClass('relative');
			});
			return this;
		}
	}, {
		key: "addLine",
		value: function addLine(key, value) {
			if (cj.nullOrUndefined(value) || value === '') return;
			var r = cj.DOM.create('tr');
			r.appendChild(cj.DOM.create('td', { "class": 'key', children: [cj.DOM.create('div', { text: cj.unescape(key) })] }));
			r.appendChild(cj.DOM.create('td', { "class": 'value', children: [cj.DOM.create('div', { text: cj.unescape(value) })] }));
			this.$table.tBodies[0].appendChild(r);
			this._lines++;
		}
	}]);

	return _class71;
})(cj.layouts.AbstractLayout);
cj.layouts.List = (function (_cj$layouts$AbstractLayout4) {
	_inherits(_class72, _cj$layouts$AbstractLayout4);

	function _class72(options) {
		_classCallCheck(this, _class72);

		_get(Object.getPrototypeOf(_class72.prototype), "constructor", this).call(this, options);

		this._choices = this._field.widget.choices;

		this._prevPage = new cj.views.Button({ el: cj.DOM.byId('prev-page-button') });
		this._nextPage = new cj.views.Button({ el: cj.DOM.byId('next-page-button') });

		this.$content = cj.DOM.byId('list-content');

		this._current = 0;
		this._choicesPerPage = 8;
		this._columnsPerPage = 2;
	}

	_createClass(_class72, [{
		key: "render",
		value: function render() {
			var _this53 = this;

			if (this._choices.length > this._choicesPerPage) {
				this._prevPage.render().show().on(function () {
					if (_this53._current - 1 >= 0) {
						_this53.showItem(_this53._current - 1);
						cj.statistics.click({
							type: K.STAT.CLICK.TYPES.BUTTON,
							value: K.STAT.CLICK.BUTTON.PREVIOUS_LIST
						});
					}
				}).addAsChildTo(this);
				this._nextPage.render().show().on(function () {
					if (_this53._current * _this53._choicesPerPage + 1 <= _this53._choices.length - _this53._choicesPerPage) {
						_this53.showItem(_this53._current + 1);
						cj.statistics.click({
							type: K.STAT.CLICK.TYPES.BUTTON,
							value: K.STAT.CLICK.BUTTON.NEXT_LIST
						});
					}
				}).addAsChildTo(this);
			} else {
				this._prevPage.hide();
				this._nextPage.hide();
			}

			cj.DOM.headerComment(' ');
			this.renderChoices();
			this.showItem(0);
			this._field.switches.map(function (item) {
				return new cj.views.SwitchButton({
					parentElement: cj.DOM.byId('v-form-container'),
					fieldName: item,
					upper: true
				}).render().show().addAsChildTo(_this53);
			});
			return this;
		}
	}, {
		key: "renderChoices",
		value: function renderChoices() {
			var _this54 = this;

			this.$content.innerHTML = this._choices.map(function (choice, index) {
				choice = "\n\t\t\t\t<div data-code=\"" + index + "\" class=\"button\">\n\t\t\t\t\t<div class=\"button-content\">" + choice.title + "</div>\n\t\t\t\t</div>";

				if (index % _this54._columnsPerPage === 0) choice = "<div class=\"element\">" + choice;
				if (index % _this54._columnsPerPage === _this54._columnsPerPage - 1 || index === _this54._choices.length - 1) choice += '</div>';

				if (index % _this54._choicesPerPage === 0) choice = "<div class=\"page\">" + choice;
				if (index % _this54._choicesPerPage === _this54._choicesPerPage - 1 || index === _this54._choices.length - 1) choice += '</div>';

				return choice;
			}).join('');
			this._rg = new cj.views.GroupView({
				el: this.$content,
				elements: cj.DOM.findByClass(this.$content, 'element').reduce(function (memo, element) {
					return memo.concat(cj.DOM.childrenByClass(element, 'button'));
				}, []),
				toggleClass: 'pressed'
			}).render().on(function (index, code) {
				_this54._field.value = _this54._choices[Number(code)].value;
				_this54.parent.next.trigger();
			}).addAsChildTo(this);
		}
	}, {
		key: "showItem",
		value: function showItem(number) {
			this._current = number;
			this.$content.style.marginLeft = (-number * 860).toString() + 'px';
			number ? this._prevPage.enable() : this._prevPage.disable();
			number * this._choicesPerPage >= this._choices.length - this._choicesPerPage ? this._nextPage.disable() : this._nextPage.enable();
		}
	}]);

	return _class72;
})(cj.layouts.AbstractLayout);
cj.layouts.MultiField = (function (_cj$layouts$AbstractLayout5) {
	_inherits(_class73, _cj$layouts$AbstractLayout5);

	function _class73(options) {
		var _this55 = this;

		_classCallCheck(this, _class73);

		_get(Object.getPrototypeOf(_class73.prototype), "constructor", this).call(this, options);
		this._update = options.update;
		this._numpad = new cj.views.Numpad({
			el: cj.DOM.byId('numpad')
		});
		this._keyboard = new cj.views.Keyboard({
			el: cj.DOM.byId('keyboard'),
			pushedStateTime: 200
		});
		// TODO: устранить с помощью CSS данное ограничение.
		if (this._field.fields.length > 3) return cj.statistics.error({ type: K.STAT.ERRORS.SINAP.ELEMENTS.MULTIFIELDS }, true);
		this._fieldViews = (this._fields = this._field.fields).map(function (field) {
			return new cj.views.TextField({
				el: cj.DOM.byId('textfields').appendChild(cj.DOM.create('div', { "class": 'textfield little-text' })),
				mask: field.mask || null,
				eraseText: 'х',
				title: field.title,
				update: function update() {
					return _this55.update();
				},
				suggest: function suggest(v) {
					return field.suggests(v);
				},
				fieldName: field.name
			});
		});
	}

	_createClass(_class73, [{
		key: "render",
		value: function render() {
			var _this56 = this;

			this._fieldViews.forEach(function (field, index) {
				field.on(function () {
					return _this56.changeFocusTo(index);
				}).render().addAsChildTo(_this56);
				cj.DOM.addClass(field.$field, 'inactive');
			});
			this._fields.forEach(function (field, index) {
				var val = field.restoredValue;
				_this56.value(field.mask ? cj.mask.demask(val, field.mask).value : val, index);
			});
			this._keyboard.on(function (code) {
				if (code === 'clear') _this56._fieldViews[_this56._field.focusIndex].value('');else _this56._fieldViews[_this56._field.focusIndex].appendText(code.toString());
				_this56.update();
			}).render().addAsChildTo(this);
			this._numpad.on(function (code) {
				_this56._fieldViews[_this56._field.focusIndex].appendText(code.toString());
				_this56.update();
			}).render().addAsChildTo(this);
			this.changeFocusTo(1);
			this.changeFocusTo(0); // hack: чтобы проскочить проверку на фокусировку в уже сфокусированный индекс.
			return this;
		}
	}, {
		key: "value",
		value: function value(_value3) {
			var index = arguments.length <= 1 || arguments[1] === undefined ? this._field.focusIndex : arguments[1];

			this._fieldViews[index].value(_value3, true);
			return this._fieldViews[index].value();
		}
	}, {
		key: "changeFocusTo",
		value: function changeFocusTo(index) {
			if (this._fieldViews.length <= index || index === this._field.focusIndex) return;
			cj.DOM.addClass(this._fieldViews[this._field.focusIndex].$field, 'inactive');
			this._fieldViews[this._field.focusIndex].hideSuggests();
			cj.DOM.removeClass(this._fieldViews[index].$field, 'inactive');
			this._field.focusIndex = index;
			this.update();
		}
	}, {
		key: "update",
		value: function update() {
			switch (this._fields[this._field.focusIndex].widget.keyboard) {
				case cj.sinap.widgets.KEYBOARD_TYPE.EMAIL:
					this._keyboard.updateKeys(this._keyboard._layout = 'email');
				case cj.sinap.widgets.KEYBOARD_TYPE.QWERTY:
					this._keyboard.setShift(this._fieldViews[this._field.focusIndex].isUpperCase());
					if (this._fieldViews[this._field.focusIndex].currentMaskSymbol()) {
						if (this._keyboard._keys.length) {
							switch (this._fieldViews[this._field.focusIndex].currentMaskSymbol()) {
								case cj.mask.DIGIT:
									this._keyboard.showSymbols();
									break;
								case cj.mask.LETTER:
									this._keyboard.showLetters();
									break;
							}
							this._keyboard.setShift(true);
						}
					}
					this._keyboard.show();
					this._numpad.hide();
					break;
				case cj.sinap.widgets.KEYBOARD_TYPE.NUMERIC:
					this._numpad.show();
					this._keyboard.hide();
					break;
				default:
					this._numpad.hide();
					this._keyboard.hide();
			}
			this._fields[this._field.focusIndex].value = this._fieldViews[this._field.focusIndex].text();
			this._update();
		}
	}]);

	return _class73;
})(cj.layouts.AbstractLayout);
cj.layouts.Qwerty = (function (_cj$layouts$FieldLayoutBase2) {
	_inherits(_class74, _cj$layouts$FieldLayoutBase2);

	function _class74(options) {
		_classCallCheck(this, _class74);

		_get(Object.getPrototypeOf(_class74.prototype), "constructor", this).call(this, options);
		this._keyboard = new cj.views.Keyboard({
			el: cj.DOM.byId('keyboard'),
			pushedStateTime: 200,
			layout: this._field.widget.keyboard === cj.sinap.widgets.KEYBOARD_TYPE.EMAIL ? 'email' : null
		});
	}

	_createClass(_class74, [{
		key: "render",
		value: function render() {
			var _this57 = this;

			_get(Object.getPrototypeOf(_class74.prototype), "render", this).call(this);
			this._keyboard.on(function (code) {
				if (code === 'clear') _this57._textfield.value('');else _this57._textfield.appendText(code.toString());
				_this57.update(true);
			}).render().addAsChildTo(this);
			this.update(true);
			return this;
		}
	}, {
		key: "update",
		value: function update(withShift) {
			if (withShift) this._keyboard.setShift(this._textfield.isUpperCase());
			if (this._textfield.currentMaskSymbol()) {
				if (this._keyboard._keys.length) {
					switch (this._textfield.currentMaskSymbol()) {
						case cj.mask.DIGIT:
							this._keyboard.showSymbols();
							break;
						case cj.mask.LETTER:
							this._keyboard.showLetters();
							break;
					}
					this._keyboard.setShift(true);
				}
			}
			_get(Object.getPrototypeOf(_class74.prototype), "update", this).call(this);
		}
	}]);

	return _class74;
})(cj.layouts.FieldLayoutBase);

cj.layouts.Welcome = (function (_cj$layouts$Buttons) {
	_inherits(_class75, _cj$layouts$Buttons);

	function _class75(options) {
		var _this58 = this;

		_classCallCheck(this, _class75);

		options.startButtonIndex = 1;
		_get(Object.getPrototypeOf(_class75.prototype), "constructor", this).call(this, options);
		this._choices.forEach(function (item, index) {
			return _this58._buttons[index].addClass('account-type-' + (item.value <= 5 ? item.value : 'other'));
		});
		this._favButton = new cj.views.Button({
			el: cj.DOM.byId('option-button-0'),
			content: '<div class="header">Повторить платеж </div><div class="comment">Загрузите реквизиты вашего<br/>предыдущего платежа</div>'
		});
		this._favButton.addClass('favourites-button');
		this._calcButton = new cj.views.Button({ el: cj.DOM.firstChildByClassDeep(this.$el, 'reference') });

		S.remove(K.SESSION.FAVOURITES_USED);
	}

	_createClass(_class75, [{
		key: "render",
		value: function render() {
			var _this59 = this;

			_get(Object.getPrototypeOf(_class75.prototype), "render", this).call(this);

			if (this._favButton) this._favButton.on(function () {
				S.set(K.SESSION.FAVOURITES_USED, true);
				_this59.changePage(K.NAV.PHONE);
			}).show().render().addAsChildTo(this);

			if (S.commission().ranges) this._calcButton.on(function () {
				return _this59.changePage(K.NAV.CALCULATOR);
			}).show().render().addAsChildTo(this);

			if (this._buttons.length === 2) cj.DOM.removeClass(cj.DOM.firstChildByClass(cj.DOM.byId('layout-buttons-container'), 'button-row'), 'vertical');

			var message = cj.DOM.firstChildByClassDeep(this.$el, 'calc-message');
			if (S.commission(true).comment) {
				cj.DOM.firstChildByClassDeep(message, 'commission').innerHTML = S.commission(true).comment;
				if (S.terms(true).deadline) cj.DOM.firstChildByClassDeep(message, 'time').innerHTML = S.terms(true).deadline;
			} else cj.DOM.hide(message);

			_get(Object.getPrototypeOf(_class75.prototype), "renderInfo", this).call(this, S.terms().description, { cssClass: 'terms-info-popup' });
			return this;
		}
	}]);

	return _class75;
})(cj.layouts.Buttons);
cj.views.BalancePaymentView = (function (_cj$views$AbstractView14) {
	_inherits(_class76, _cj$views$AbstractView14);

	function _class76(options) {
		_classCallCheck(this, _class76);

		_get(Object.getPrototypeOf(_class76.prototype), "constructor", this).call(this, options);
		this._nextButton = options.nextButton.show();
		S.set(K.SESSION.PAYMENT.PROVIDER_SUM, this._userSum = Number(S.get(K.SESSION.PAYMENT.USER_SUM)));
		S.set(K.SESSION.PAYMENT.QIWI_COMMISSION, this._commission = S.commission().forward(this._userSum));
		S.set(K.SESSION.PAYMENT.GROSS_SUM, this._fullSum = cj.round2(this._userSum + this._commission));
	}

	_createClass(_class76, [{
		key: "render",
		value: function render() {
			var _this60 = this;

			this.clear();

			this._nextButton.on(function () {
				_this60.showPreloader('Отправка платежа');
				cj.XMLRequest.generateTransaction();
				return new cj.sinap.Request("terms/" + S.qw() + "/payments", 'POST', {
					id: S.get(K.SESSION.PAYMENT_ID).toString(),
					fields: S.form.values.assign({ terminal_prefer_sms_to_ussd: 'true' }),
					sum: {
						amount: S.get(K.SESSION.PAYMENT.USER_SUM).toString(),
						currency: K.RUB_CURRENCY_CODE
					},
					source: "account_" + K.RUB_CURRENCY_CODE
				}).then(function (response) {
					_this60.hidePreloader();
					if (!response.transaction || !response.transaction.state) {
						cj.statistics.error({ type: K.STAT.ERRORS.USER.BALANCE.ONLINE.UNDEFINED });
						return Promise.resolve(K.NAV.PAY_NOT_CONFIRMED);
					}
					switch (response.transaction.state.code) {
						case 'Accepted':
							cj.statistics.validation({
								type: K.STAT.VALIDATION.PAY.BALANCE.WITHOUT_USSD,
								result: 0
							});
							return _this60.constructor.onSuccess(_this60); // TODO: remove this misconpection
						case 'AwaitingSMSConfirmation':
							return Promise.resolve(K.NAV.SMS_CONFIRMATION);
						case 'Canceled':
							cj.statistics.error({ type: K.STAT.ERRORS.USER.BALANCE.ONLINE.CANCELLED });
							return Promise.resolve(K.NAV.PAY_NOT_CONFIRMED);
						default:
							cj.statistics.error({ type: K.STAT.ERRORS.USER.BALANCE.ONLINE.INCORRECT });
							return Promise.resolve(K.NAV.PAY_NOT_CONFIRMED);
					}
				}, function (_ref68) {
					var code = _ref68.code;
					var message = _ref68.message;

					cj.statistics.error({ type: K.STAT.ERRORS.USER.BALANCE.ONLINE.FAIL, onlineCode: code });
					return _this60.hidePreloader().showPopup(cj.views.PopupView.errorPopup(message)).then(function () {
						return Promise.reject();
					});
				}).then(function (page) {
					return _this60.changePage(page, { exitType: K.STAT.EXIT.PASSPORT });
				});
			}).content('ОПЛАТИТЬ');
			this._nextButton.addClass('pay-button');

			this.setValue('sum-val', this._fullSum);
			this.setValue('to-provider-val', this._userSum);
			this.setValue('commission-val', this._commission);
			return this;
		}
	}, {
		key: "clear",
		value: function clear() {
			if (this._nextButton) {
				this._nextButton.off().content('ДАЛЕЕ');
				cj.DOM.removeClass(this._nextButton.$el, 'pay-button');
			}
		}
	}, {
		key: "setValue",
		value: function setValue(id, value) {
			var el = cj.DOM.byId(id);
			if (value || value === '' || value === 0) el.innerHTML = cj.toSum(value);
			return el.innerHTML;
		}
	}], [{
		key: "onSuccess",
		value: function onSuccess(view) {
			var _K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$assign;

			cj.maratl.send(cj.maratl.REQUEST, (_K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$assign = {}, _defineProperty(_K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$assign, K.MARATL.QD_PAYMENT.ACCOUNT, S.phone()), _defineProperty(_K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$assign, K.MARATL.QD_PAYMENT.PROVIDER_ID, S.qd()), _defineProperty(_K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$assign, K.MARATL.QD_PAYMENT.PROVIDER_NAME, S.scenario() === cj.sinap.terms.TYPE.QD ? S.shortName() : S.VQW_NAME), _defineProperty(_K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$assign, K.MARATL.QD_PAYMENT.ACCOUNT_MASK, 'NNNNNNNNNN'), _K$MARATL$QD_PAYMENT$ACCOUNT$K$MARATL$QD_PAYMENT$PROVIDER_ID$K$MARATL$QD_PAYMENT$PROVIDER_NAME$K$MARATL$QD_PAYMENT$ACCOUNT_MASK$assign).assign(S.form.receipt.maratl, _defineProperty({}, K.MARATL.QD_PAYMENT.END_RECEIPT_DATA, true)));
			return Promise.timeout(function () {
				return cj.favs.save(view);
			}, 500).then(function () {
				return Promise.resolve(K.NAV.EXIT);
			});
		}
	}]);

	return _class76;
})(cj.views.AbstractView);
cj.views.CalculatorView = (function (_cj$views$AbstractView15) {
	_inherits(_class77, _cj$views$AbstractView15);

	function _class77() {
		_classCallCheck(this, _class77);

		_get(Object.getPrototypeOf(_class77.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class77, [{
		key: "render",
		value: function render() {
			var _this61 = this;

			this.clear();

			this._numpad = new cj.views.Numpad({
				el: cj.DOM.byId('numpad'),
				withPoint: true
			}).on(function (code) {
				_this61._textField.appendText(code.toString());
				_this61.update();
			}).render().addAsChildTo(this);

			this._textField = new cj.views.TextField({
				el: cj.DOM.byId('rub-field'),
				update: function update() {
					return _this61.update();
				}
			}).render().addAsChildTo(this);

			var infoBlock = cj.DOM.byId('sum-info-block');
			this.$finalSummLabel = infoBlock.querySelector('#to-insert-info-item span');
			this.$commissionLabel = infoBlock.querySelector('#commission-info-item span');
			this.update();

			if (S.commission().comment) cj.DOM.byId('calc-comission-sheet').innerHTML = "Комиссия " + S.commission().comment + "<br/><br/>" + (S.terms().deadline || '');else cj.DOM.hide(cj.DOM.byId('calc-comission-sheet'));

			setTimeout(function () {
				return cj.DOM.removeClass(cj.DOM.byId('calc-comission-sheet'), 'moved');
			}, 100);
			return this;
		}
	}, {
		key: "update",
		value: function update() {
			var _JSON$stringify,
			    _this62 = this;

			var sum = parseFloat(cj.views.SummEnterView._formatString(this._textField) || 0);
			this._providerCommission = S.commission().forward(sum);
			this._fullSum = S.commission().forwardWithSum(sum);

			var reverseOptions = JSON.stringify((_JSON$stringify = {}, _defineProperty(_JSON$stringify, K.MARATL.REQ.REVERSE_OPTIONS.PROVIDER_ID, S.qd()), _defineProperty(_JSON$stringify, K.MARATL.REQ.REVERSE_OPTIONS.SUM, Number(this._fullSum)), _JSON$stringify));
			cj.maratl.send(K.MARATL.REQ.REVERSE_ROUNDED_SUMM, reverseOptions, K.MARATL.RESP.REVERSE_ROUNDED_SUMM).then(function (res) {
				return _this62.$finalSummLabel.innerHTML = res[K.MARATL.RESP.REVERSE_ROUNDED_SUMM] + " " + S.RUB_SUFFIX;
			});
			cj.maratl.send(K.MARATL.REQ.REVERSE_COMMISSION, reverseOptions, K.MARATL.RESP.REVERSE_COMMISSION).then(function (res) {
				return _this62.$commissionLabel.innerHTML = cj.toSum(Number(res[K.MARATL.RESP.REVERSE_COMMISSION]) + _this62._providerCommission) + " " + S.RUB_SUFFIX;
			});
		}
	}]);

	return _class77;
})(cj.views.AbstractView);
cj.views.CashPaymentView = (function (_cj$views$AbstractView16) {
	_inherits(_class78, _cj$views$AbstractView16);

	function _class78(options) {
		var _this63 = this;

		_classCallCheck(this, _class78);

		_get(Object.getPrototypeOf(_class78.prototype), "constructor", this).call(this, options);
		this._userSum = S.get(K.SESSION.PAYMENT.USER_SUM) || 0;
		this._minGrossSum = S.commission().forwardWithSum(S.limits.minProvider() || 1);
		this._grossSum = S.phone() && S.changeOption() === K.CHANGE.BANK ? this._minGrossSum : S.commission().forwardWithSum(this._userSum);

		this._nextButton = options.nextButton;
		this._exitButton = options.exitButton;

		this.acceptor = new cj.acceptor(S.phone() && S.changeOption() !== K.CHANGE.BANK);

		this._cashBlock = new cj.views.CashBlockView({ el: cj.DOM.byId('cash-block') });
		this._toProviderBlock = new cj.views.CashBlockView({ el: cj.DOM.byId('to-provider-block') });
		this._commissionBlock = new cj.views.CashBlockView({ el: cj.DOM.byId('commission-block') });
		this._changeBlock = new cj.views.CashBlockView({ el: cj.DOM.byId('change-block') }).hide();
		this._changeCommissionBlock = new cj.views.CashBlockView({ el: cj.DOM.byId('change-commission-block') }).hide();

		this._cashBlock.value(0);
		this._cashBlock.label('Внесено');
		this._toProviderBlock.label('К зачислению');
		this._commissionBlock.label('Комиссия');
		this._changeBlock.label('Сдача');
		this._changeCommissionBlock.label('Комиссия на сдачу');

		this._commissionsButton = new cj.views.Button({ el: cj.DOM.firstChildByClass(cj.DOM.byId('v-cash-payment'), 'commission-button') });
		cj.maratl.send(K.MARATL.REQ.FORBIDDEN_BANKNOTES, null, K.MARATL.REQ.FORBIDDEN_BANKNOTES).then(function (res) {
			_this63._forbidden = JSON.parse(res[K.MARATL.REQ.FORBIDDEN_BANKNOTES]).filter(function (b) {
				return b.currency.toString() === K.RUB_CURRENCY_CODE;
			}).map(function (b) {
				return b.value.toString();
			});
		});
		cj.maratl.send(K.MARATL.REQ.COMMISSION_PROFILE, null, K.MARATL.RESP.COMMISSION_PROFILE).then(function (_ref69) {
			var value = _ref69[K.MARATL.RESP.COMMISSION_PROFILE];

			_this63._profiles = cj.commission.ParseJSON(JSON.parse(value).filter(function (item) {
				return item.providerId == S.qd();
			})[0]);
			_this63._changeProfiles = cj.commission.ParseJSON(JSON.parse(value).filter(function (item) {
				return item.providerId == Number(S.get(K.SESSION.CHANGE_PROVIDER.ID));
			})[0]);
			if (S.scenario() === cj.sinap.terms.TYPE.QD && _this63._profiles.length > 0) {
				if (_this63._profiles.length === 1 && _this63._profiles.ranges[0].isDefault) _this63._commissionBlock.label("Комиссия " + cj.round2(_this63._profiles.ranges[0].rate * 100) + "%");else cj.DOM.show(cj.DOM.firstChildByClass(cj.DOM.byId('v-cash-payment'), 'commission-container'));
				_this63.highlightLine();
			}
		});

		cj.timeout.clickResetEnabled = false;
		cj.timeout.off().reset(cj.timeout.PAYMENT_TIMEOUT).on(function () {
			return _this63._cashSumm ? _this63.createPay() : _this63.acceptor.end(true).then(function () {
				return _this63.changePage(K.NAV.EXIT, { exitType: K.STAT.EXIT.TIMEOUT });
			});
		});
	}

	_createClass(_class78, [{
		key: "highlightLine",
		value: function highlightLine(i) {
			if (this._cashSumm <= 0 && i !== undefined) return;
			cj.DOM.firstChildByClass(cj.DOM.firstChildByClass(cj.DOM.byId('v-cash-payment'), 'commission-container'), 'blocks').innerHTML = this._profiles.ranges.reduce(function (str, profile, index) {
				if (index >= (i || 0)) str += "<div class=\"block " + (index === (i || 0) && i !== undefined ? 'selected' : '') + "\">\n\t\t\t\t\t\t\t<div class=\"label\">" + profile.applicability + "</div>\n\t\t\t\t\t\t\t<div class=\"value\">" + profile.comment + "</div>\n\t\t\t\t\t\t</div>";
				return str;
			}, '');
		}
	}, {
		key: "render",
		value: function render() {
			var _this64 = this;

			this.clear();
			if (S.scenario() !== cj.sinap.terms.TYPE.QD && S.limits.minProvider() === null) return this.showPopup(cj.views.PopupView.errorPopup({
				title: 'Техническая ошибка',
				message: 'Не заданы ограничения суммы провайдера'
			})).then(function () {
				return _this64.changePage(K.NAV.EXIT);
			});

			this._nextButton.on(function () {
				if (!_this64._nextButton || !_this64._nextButton.isVisible) return;
				if (!_this64._paymentInProcess) {
					if (_this64._paySumm <= _this64._minGrossSum || !(_this64.isUnderpayAvailable() || _this64.isEnough())) cj.maratl.send(K.MARATL.REQ.DEFICIENT_AMOUNT, null, K.MARATL.RESP.DEIFICIENT_AMOUNT).then(function (_ref70) {
						var value = _ref70[K.MARATL.RESP.DEIFICIENT_AMOUNT];

						_this64._cashBlock.warning(value.split(', ')[1]);
						if (value.split(', ')[1] > 0) _this64._cashBlock.addClass('warning');
					});else if (_this64.isUnderpayAvailable() && !_this64.isEnough()) return _this64.showPopup(cj.views.PopupView.questionPopup({
						title: 'Вы внесли не всю сумму',
						message: 'Вы действительно хотите отправить платеж?',
						no: 'Не отправлять',
						yes: {
							html: "Отправить</br>" + cj.toSum(_this64._paySumm - _this64._providerCommission) + " " + S.RUB_SUFFIX,
							"class": 'primary-button underpay'
						}
					})).then(function (type) {
						return type === K.STAT.CLICK.BUTTON.POPUP.NO ? null : _this64.createPay();
					});
					_this64.acceptor.end().then(function (res) {
						return res ? _this64.createPay() : null;
					});
				}
			}).show().disable().content('ОПЛАТИТЬ');
			this._nextButton.addClass('pay-button');

			this._exitButton.off().on(function () {
				_this64._exitButton.off().hide();
				if (!_this64._cashSumm) _this64.acceptor.end().then(function () {
					return _this64.changePage(K.NAV.EXIT);
				});
			});

			if (S.phone() && S.changeOption() !== K.CHANGE.BANK) {
				this._changeBlock.show();
				this._changeCommissionBlock.show();
			}
			this._commissionsButton.on(function () {
				var extraString = Math.max((_this64._profiles ? _this64._profiles.length + 2 : 0) + (_this64._changeProfiles ? _this64._changeProfiles.length + 2 : 0) + (S.commission().ranges ? 3 : 0) - 17, 0);
				_this64.showPopup(cj.views.PopupView.messagePopup({
					title: 'Все условия комиссии',
					message: "<div id=\"" + (extraString ? 'animate-popup' : '') + "\">" + cj.commission.Commission.html(S.commission(), ['Сумма платежа', 'Комиссия Банка']) + cj.commission.Commission.html(_this64._profiles, ['Сумма платежа', S.scenario() === cj.sinap.terms.TYPE.QD ? 'Комиссия на платеж' : 'Комиссия при оплате наличными']) + cj.commission.Commission.html(_this64._changeProfiles, ['Сумма сдачи', 'Комиссия на сдачу']) + '</div>',
					button: 'НАЗАД'
				}));
				if (extraString) cj.DOM.byId('animate-popup').style.animationDuration = extraString / 3;
			}).render().show();

			this.showPreloader('Подготовка платежа');

			this.acceptor.begin(this._grossSum).then(function (options) {
				_this64.hidePreloader();
				var percent = 0;
				if (options[K.MARATL.RESP.MIN_CASH] && options[K.MARATL.RESP.MAX_CASH]) cj.DOM.headerComment("Можно внести не меньше " + cj.toSum(Number(options[K.MARATL.RESP.MIN_CASH]) || 1) + " и не больше " + cj.toSum(options[K.MARATL.RESP.MAX_CASH]) + " " + S.RUB_SUFFIX + (_this64._forbidden.length > 0 ? "</br>Не принимаются купюр" + (_this64._forbidden.length === 1 ? 'а' : 'ы') + " " + _this64._forbidden.join(', ') + " " + S.RUB_SUFFIX : ''));
				if (options[K.MARATL.RESP.COIN_PROFILE] && S.scenario() === cj.sinap.terms.TYPE.QD) {
					percent = Number(options[K.MARATL.RESP.COIN_PROFILE].split('|')[0].split(';')[2].split('_')[1]) || 0;
					if (percent !== 0) {
						cj.DOM.show(cj.DOM.firstChildByClass(cj.DOM.byId('v-cash-payment'), 'commission-container'));
						cj.DOM.show(cj.DOM.firstChildByClass(cj.DOM.firstChildByClass(cj.DOM.byId('v-cash-payment'), 'commission-container'), 'coin-block'));
						cj.DOM.firstChildByClass(cj.DOM.firstChildByClass(cj.DOM.firstChildByClass(cj.DOM.byId('v-cash-payment'), 'commission-container'), 'coin-block'), 'label').innerHTML = "Комиссия на монеты " + Number(options[K.MARATL.RESP.COIN_PROFILE].split('|')[0].split(';')[2].split('_')[1]) + "%";
					}
				}
			})["catch"](function (message) {
				_this64.hidePreloader().showPopup(cj.views.PopupView.errorPopup({
					message: 'Пожалуйста, воспользуйтесь другим терминалом.',
					title: message
				})).then(function () {
					return _this64.changePage(K.NAV.EXIT);
				});
			}).then(function (dead) {
				return dead ? Promise.reject('Ошибка оборудования') : _this64.acceptor.update({
					onCash: function onCash(cash) {
						cj.timeout.reset(cj.timeout.PAYMENT_TIMEOUT);
						if (!cash) return;
						cj.statistics.money({ value: cash - (_this64._cashSumm || 0) });
						_this64.hidePopup();
						cj.DOM.removeClass(_this64._cashBlock.$el, 'warning');
						_this64._nextButton.enable();
						_this64._exitButton.hide();
						_this64._cashBlock.value(S.set(K.SESSION.PAYMENT.TOTAL_INSERTED, _this64._cashSumm = cash));
					},
					onPaySum: function onPaySum(payed) {
						if (_this64._cashSumm > 0 && payed >= 0) _this64._paySumm = payed;
						_this64._providerCommission = S.changeOption() === K.CHANGE.BANK || S.terms().underpayment && !_this64.isEnough() ? S.commission().reverse(Math.max(_this64._paySumm, _this64._minGrossSum)) : S.commission().forward(_this64._userSum);
						_this64._toProviderBlock.value(Math.max(_this64._paySumm - _this64._providerCommission, 0));
					},
					onCommission: function onCommission(commission) {
						return _this64._cashSumm > 0 ? _this64._commissionBlock.value((_this64._agentCommission = Math.max(commission, 0)) + _this64._providerCommission) : null;
					},
					onChangePaySum: function onChangePaySum(payed) {
						return _this64._cashSumm > 0 && payed >= 0 ? _this64._changeBlock.value(S.set(K.SESSION.PAYMENT.CHANGE_SUM, payed)) : null;
					},
					onChangeCommission: function onChangeCommission(commission) {
						return _this64._cashSumm > 0 && S.get(K.SESSION.PAYMENT.CHANGE_SUM) > 0 ? _this64._changeCommissionBlock.value(S.set(K.SESSION.PAYMENT.CHANGE_COMMISSION, commission)) : null;
					},
					onCoinCommission: function onCoinCommission(commission) {
						if (commission) {
							var coinCommission = Number(commission.split('|').reduce(function (memo, row) {
								memo[row.split(':')[0]] = row.split(':')[1];
								return memo;
							}, {}).TotalCommAmount);
							if (coinCommission) cj.DOM.firstChildByClass(cj.DOM.firstChildByClass(cj.DOM.firstChildByClass(cj.DOM.byId('v-cash-payment'), 'commission-container'), 'coin-block'), 'value').innerHTML = coinCommission + " " + S.RUB_SUFFIX;
						}
					},
					onCommissionProfile: function onCommissionProfile(profile) {
						return profile ? _this64.highlightLine(profile - 1) : null;
					}
				}) & 0;
			})["catch"](function () {
				return cj.timeout.trigger();
			});
			this.acceptor.checkTimeout().then(function () {
				return _this64.createPay();
			});

			if (cj.maratl.emulator) {
				cj.DOM.byId('logo').onmouseup = function () {
					return cj.maratl.emulator.sendMoney(10);
				};
				cj.DOM.ELEMS.$subtitle.onmouseup = function () {
					return cj.maratl.emulator.sendMoney(100);
				};
				cj.DOM.ELEMS.$header.onmouseup = function () {
					return cj.maratl.emulator.sendMoney(500);
				};
				cj.DOM.ELEMS.$comment.onmouseup = function () {
					return cj.maratl.emulator.sendMoney(1000);
				};
			}
			return this;
		}
	}, {
		key: "createPay",
		value: function createPay() {
			var _this65 = this;

			if (this._paymentInProcess) return;
			this.showPreloader('Завершение платежа');
			S.set(K.SESSION.PAYMENT.GROSS_SUM, this._paySumm);
			S.set(K.SESSION.PAYMENT.QIWI_COMMISSION, S.commission().reverse(this._paySumm));
			S.set(K.SESSION.PAYMENT.PROVIDER_SUM, this._paySumm - S.get(K.SESSION.PAYMENT.QIWI_COMMISSION));
			var success = this.isEnough() || this.isUnderpayAvailable();
			cj.maratl.send(cj.maratl.REQUEST, _defineProperty({}, '_receipt_prt_top_msg', success ? 'Спасибо!' : "Внесенная сумма недостаточна для проведения платежа.<br>Все деньги останутся на вашем " + S.VQW_NAME + ".").assign(success ? S.form.receipt.maratl : null));

			cj.statistics.money({
				cash: S.get(K.SESSION.PAYMENT.TOTAL_INSERTED),
				to_provider: this._paySumm,
				to_change: S.get(K.SESSION.PAYMENT.CHANGE_SUM) || 0
			});
			this._paymentInProcess = true;
			if (!this.isEnough() && this.isUnderpayAvailable()) cj.maratl.send(K.MARATL.SET.UNDERPAID_FLAG);
			this.acceptor.pay().then(function () {
				cj.statistics.validation({
					type: K.STAT.VALIDATION.PAY.CASH.SUCCESS,
					result: !success
				});
				cj.favs.save(_this65, !success).then(function () {
					return _this65.changePage(success ? K.NAV.EXIT : K.NAV.PAY_NOT_CONFIRMED, { exitType: K.STAT.EXIT.PASSPORT });
				});
			})["catch"](function () {
				return _this65.changePage(K.NAV.PAY_NOT_CONFIRMED);
			});
		}
	}, {
		key: "isEnough",
		value: function isEnough() {
			return this._paySumm >= this._grossSum;
		}
	}, {
		key: "isUnderpayAvailable",
		value: function isUnderpayAvailable() {
			return S.terms().underpayment && this._paySumm > this._minGrossSum;
		}
	}]);

	return _class78;
})(cj.views.AbstractView);
cj.views.ChangeOptionsView = (function (_cj$views$AbstractView17) {
	_inherits(_class79, _cj$views$AbstractView17);

	function _class79(options) {
		var _this66 = this;

		_classCallCheck(this, _class79);

		_get(Object.getPrototypeOf(_class79.prototype), "constructor", this).call(this, options);
		this.mobileButton = new cj.views.Button({
			el: cj.DOM.byId('mobile-button')
		}).disable().addAsChildTo(this);
		this.walletButton = new cj.views.Button({
			el: cj.DOM.byId('wallet-button')
		}).disable().addAsChildTo(this);

		cj.DOM.byId('change-cellular-number').innerHTML = S.phoneFormatted();

		this.prevButton = options.prevButton.show();
		this.testProvider(S.VQW_ID).then(function (_ref71) {
			var result = _ref71[K.MARATL.RESP.CHANGE_PROVIDER_ALLOWED];

			if (result) _this66.walletButton.enable();
			return S.get(K.SESSION.USER.PHONE.PROVIDER) !== -1 ? _this66.testProvider(S.get(K.SESSION.USER.PHONE.PROVIDER)) : Promise.resolve();
		}).then(function (_ref72) {
			var result = _ref72[K.MARATL.RESP.CHANGE_PROVIDER_ALLOWED];
			return result === 'true' ? _this66.mobileButton.enable() : null;
		});
	}

	_createClass(_class79, [{
		key: "testProvider",
		value: function testProvider(id) {
			return cj.maratl.send(K.MARATL.REQ.CHANGE_PROVIDER_ALLOWED, id, K.MARATL.RESP.CHANGE_PROVIDER_ALLOWED + "|" + K.MARATL.RESP.CHANGE_PROVIDER_DENIED);
		}
	}, {
		key: "render",
		value: function render() {
			var _this67 = this;

			this.clear();
			this.mobileButton.on(function () {
				S.changeOption(K.CHANGE.PHONE);
				S.set(K.SESSION.CHANGE_PROVIDER.ID, S.get(K.SESSION.USER.PHONE.PROVIDER));
				S.set(K.SESSION.CHANGE_PROVIDER.NAME, 'Мобильный телефон');
				_this67.performOnline();
			}).render();
			this.walletButton.on(function () {
				S.changeOption(K.CHANGE.WALLET);
				S.set(K.SESSION.CHANGE_PROVIDER.ID, S.VQW_ID);
				S.set(K.SESSION.CHANGE_PROVIDER.NAME, S.VQW_NAME);
				_this67.performOnline();
			}).render();
			this.prevButton.on(function () {
				if (!(S.walletBalance() && S.walletBalance() >= (S.sum.fixed() || Number(S.get(K.SESSION.PAYMENT.TOTAL_SUM)))) || S.scenario() !== cj.sinap.terms.TYPE.QW_ONLINE) _this67.changePage(K.NAV.CONFIRMATION);else _this67.changePage(K.NAV.PAYMENT_OPTIONS);
			});
			return this;
		}
	}, {
		key: "performOnline",
		value: function performOnline() {
			var _this68 = this;

			this.showPreloader().constructor.performPayment().then(function () {
				return _this68.changePage(K.NAV.CASH);
			}, function (message) {
				return _this68.hidePreloader().showPopup(cj.views.PopupView.errorPopup(message));
			});
		}
	}], [{
		key: "performPayment",
		value: function performPayment() {
			cj.maratl.send(K.MARATL.REQ.CHANGE_PROVIDER_ALLOWED, S.get(K.SESSION.CHANGE_PROVIDER.ID));
			cj.XMLRequest.generateTransaction();
			return S.scenario() === cj.sinap.terms.TYPE.QW_ONLINE ? new cj.sinap.Request("terms/" + S.qw() + "/payments", 'POST', {
				id: S.get(K.SESSION.PAYMENT_ID).toString(),
				fields: S.form.values,
				sum: {
					amount: S.get(K.SESSION.PAYMENT.USER_SUM).toString(),
					currency: K.RUB_CURRENCY_CODE
				},
				source: K.PAYMENT.CASH
			}).then(function (response) {
				if (!response.transaction || !response.transaction.state) return Promise.reject(K.STAT.ERRORS.USER.CASH.UNDEFINED);
				switch (response.transaction.state.code) {
					case 'Accepted':
						cj.statistics.validation({
							type: K.STAT.VALIDATION.PAY.CASH.CREATE,
							result: 0
						});
						return Promise.resolve();
					default:
						return Promise.reject(K.STAT.ERRORS.USER.CASH.INCORRECT);
				}
			})["catch"](function (_ref73) {
				var code = _ref73.code;
				var message = _ref73.message;

				cj.statistics.error({ type: K.STAT.ERRORS.USER.CASH.FAIL, onlineCode: code });
				return Promise.reject(message);
			}) : Promise.resolve();
		}
	}]);

	return _class79;
})(cj.views.AbstractView);
cj.views.CheckStatusView = (function (_cj$views$AbstractView18) {
	_inherits(_class80, _cj$views$AbstractView18);

	function _class80() {
		_classCallCheck(this, _class80);

		_get(Object.getPrototypeOf(_class80.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class80, [{
		key: "render",
		value: function render() {
			var _this69 = this;

			cj.DOM.firstChildByClassDeep(this.$el, 'preloader-header').innerHTML = 'Загрузка';
			cj.DOM.show(cj.DOM.byId('navigation'));
			cj.DOM.show(cj.DOM.byId('logo-badge'));
			cj.maratl.log("Вход в приложение: " + cj.APP.version).then(function () {
				return cj.maratl.send(K.MARATL.SET.FAKE_EMBED_MODE);
			}).then(function () {
				return cj.maratl.send(K.MARATL.REQ.TERMINAL_ID, null, K.MARATL.RESP.TERMINAL_ID);
			}).then(function (response) {
				S.terminalID(response[K.MARATL.RESP.TERMINAL_ID]);
				return cj.maratl.send(K.MARATL.REQ.TERMINAL_INFO, null, K.MARATL.RESP.TERMINAL_INFO);
			}).then(function (_ref74) {
				var info = _ref74[K.MARATL.RESP.TERMINAL_INFO];

				cj.XML.parse(/<\?xml/.test(info) ? info : '<?xml version="1.0"?>' + info).documentElement.childNodes.forEach(function (item) {
					if (item.nodeName.toString() === 'osmp-general-phone') S.set(K.SESSION.TERMINAL.SUPPORT_PHONE, item.childNodes[0].nodeValue);
				});
				return cj.maratl.send(K.MARATL.REQ.PRINTER_STATUS, null, K.MARATL.RESP.PRINTER_STATUS);
			}).then(function (_ref75) {
				var status = _ref75[K.MARATL.RESP.PRINTER_STATUS];

				S.set(K.SESSION.TERMINAL.PRINTER_STATUS, status);
				if (status.toLowerCase() !== 'ok') cj.statistics.error({ type: K.STAT.ERRORS.MARATL.PRINTER });
				if (!S.qd()) return Promise.reject(K.STAT.ERRORS.MARATL.NO_CONFIG_STORAGE);
				return cj.configParser.load(S.qd());
			}).then(function (config) {
				if (!config) return;
				S.config(config);
				cj.DOM.byId('logo').style.background = "url(../img/ui_item/" + S.config().logo + ") center center no-repeat";
				return cj.maratl.send(K.MARATL.REQ.MAXSUM_BY_PROVIDER, S.qd(), K.MARATL.RESP.MAXSUM_BY_PROVIDER);
			}).then(function (response) {
				S.set(K.SESSION.PROVIDER.MAX_SUM, response[K.MARATL.RESP.MAXSUM_BY_PROVIDER]);
				return cj.maratl.send(K.MARATL.REQ.PROVIDER_ALLOWED, S.qd(), K.MARATL.RESP.PROVIDER_ALLOWED + "|" + K.MARATL.RESP.PROVIDER_DENIED);
			}).then(function (_ref76) {
				var allowed = _ref76[K.MARATL.RESP.PROVIDER_ALLOWED];
				return allowed === 'true' ? cj.maratl.send(K.MARATL.REQ.SINAP, JSON.stringify([S.qd()]), K.MARATL.RESP.SINAP) : Promise.reject(K.STAT.ERRORS.MARATL.PROVIDER_DENIED);
			}).then(function (_ref77) {
				var config = _ref77[K.MARATL.RESP.SINAP];

				try {
					var data = JSON.parse(config)[S.qd(true)];
				} catch (e) {
					return Promise.reject(K.STAT.ERRORS.SINAP.INIT.NOT_JSON);
				}
				if (!data) return Promise.reject(K.STAT.ERRORS.SINAP.INIT.NO_CONFIG);
				if (data === 'not found') return Promise.reject(K.STAT.ERRORS.SINAP.INIT.NO_COMMAND);
				if (data.id !== S.qd(true)) return Promise.reject(K.STAT.ERRORS.SINAP.INIT.ID_MISMATCH);
				try {
					S.set(K.SESSION.INITIAL_FORM, true);
					S.form = new cj.sinap.Form(new cj.sinap.Container(data.content), new cj.sinap.receipt.Receipt(data.receipt), new cj.sinap.miscInfo.MiscInfo(data.miscInfo));
					cj.DOM.addClass(cj.DOM.byId('logo-badge'), 'active');
					cj.statistics.init();
					cj.EXTERNAL ? _this69.externalFavMode() : _this69.changePage(K.NAV.FORM);
				} catch (e) {
					return Promise.reject(K.STAT.ERRORS.SINAP.INIT.PARSING);
				}
			})["catch"](function (reject) {
				_this69.showPopup(cj.views.PopupView.errorPopup({
					title: 'Техническая ошибка',
					message: cj.APP.errorCodes[reject] || 'Невозможно совершить платеж на этом терминале'
				})).then(function () {
					return _this69.changePage(K.NAV.EXIT);
				});
				cj.statistics.error({ type: reject });
			});
			return this;
		}
	}, {
		key: "externalFavMode",
		value: function externalFavMode() {
			var _this70 = this;

			S.phone(cj.EXTERNAL.login);
			S.pin(cj.EXTERNAL.p);
			S.walletBalance(Number(cj.EXTERNAL.balance));
			S.set(K.SESSION.USER.PHONE.PROVIDER, Number(cj.EXTERNAL.phonePrvId));

			var e;
			if ((e = new cj.XML(cj.EXTERNAL.ident)).ident()) S.set(K.SESSION.IDENTIFICATION, cj.EXTERNAL.ident.replace(/\n/g, ''));
			cj.favs.fill(cj.EXTERNAL.session).then(function () {
				S.set(K.SESSION.FAVOURITE_CONFIRMATION, true);
				_this70.changePage(K.NAV.CONFIRMATION);
			}, function (message) {
				if (typeof message !== 'string') return Promise.reject();
				return _this70.showPopup(cj.views.PopupView.questionPopup({
					title: 'Ошибка',
					message: 'Условия проведения платежа изменились. Вы можете отредактировать запись на www.qiwi.com или удалить запись сейчас.',
					no: 'Выход',
					yes: 'Удалить'
				})).then(function (type) {
					if (type === K.STAT.CLICK.BUTTON.POPUP.NO) return Promise.resolve({ code: -1 });
					_this70.showPreloader('Удаляем избранный платеж');
					return new cj.XMLRequest(cj.XMLRequest.REMOVE_FAVOURITE(cj.EXTERNAL.session.id)).start();
				}).then(function (_ref78) {
					var code = _ref78.code;

					switch (code) {
						case 0:
							return _this70.hidePreloader().showPopup(cj.views.PopupView.messagePopup('Запись удалена.')).then(function () {
								return Promise.resolve();
							});
							break;
						case -1:
							return Promise.resolve();
						default:
							return Promise.reject();
					}
				})["catch"](function () {
					return _this70.hidePreloader().showPopup(cj.views.PopupView.errorPopup('Произошла техническая ошибка'));
				}).then(function () {
					return _this70.changePage(K.NAV.EXIT, { exitType: K.STAT.EXIT.FAVOURITES });
				});
			});
		}
	}]);

	return _class80;
})(cj.views.AbstractView);
cj.views.ConfirmationView = (function (_cj$views$AbstractView19) {
	_inherits(_class81, _cj$views$AbstractView19);

	function _class81(options) {
		_classCallCheck(this, _class81);

		_get(Object.getPrototypeOf(_class81.prototype), "constructor", this).call(this, options);
		this.$table = cj.DOM.firstChildByClassDeep(this.$el, 'table');
		this._nextButton = options.nextButton.show();
		this._prevButton = options.prevButton.show();
		if (!S.get(K.SESSION.USER.FAVOURITE_LIST + S.phone()) && S.scenario() === cj.sinap.terms.TYPE.QW_ONLINE) new cj.XMLRequest(cj.XMLRequest.FAVOURITES_LIST()).start().then(function (_ref79) {
			var code = _ref79.code;
			var data = _ref79.data;
			return code === 0 ? cj.favs.parse(data) : null;
		});
		this._ofertaButton = new cj.views.Button({ el: cj.DOM.firstChildByClassDeep(this.$el, 'reference') });
	}

	_createClass(_class81, [{
		key: "hideOferta",
		value: function hideOferta() {
			var container = cj.DOM.byId('v-confirmation');
			cj.DOM.hide(cj.DOM.firstChildByClass(container, 'license'));
			cj.DOM.hide(cj.DOM.firstChildByClass(container, 'oferta-message'));
		}
	}, {
		key: "showOferta",
		value: function showOferta() {
			var container = cj.DOM.byId('v-confirmation');
			cj.DOM.show(cj.DOM.firstChildByClass(container, 'license'));
			cj.DOM.show(cj.DOM.firstChildByClass(container, 'oferta-message'));
		}
	}, {
		key: "render",
		value: function render() {
			var _this71 = this;

			cj.maratl.send(K.MARATL.REQ.PROVIDER_ALLOWED, S.qd());
			var form = S.form;
			this.addLine('Тип операции', K.OPERATION_TYPES[form.get(K.FIELDS.OPERATION_TYPE)]);
			this.addLine('Ваш телефон', S.phoneFormatted());
			if (!S.get(K.SESSION.FAVOURITE_CONFIRMATION) && S.changeOption() !== K.CHANGE.BANK && S.sum.available()) this.addLine('Сумма', cj.toSum(S.get(K.SESSION.PAYMENT.USER_SUM)) + ' ' + S.RUB_SUFFIX);

			this._linesCount = 0;
			form.fields.filter(function (item) {
				return item.submitted && item.displayable && !item.hideOnConfirm;
			}).forEach(function (item) {
				return item.layout === cj.sinap.layouts.MULTI ? _this71.addLine(item.groupTitle, item.fields.filter(function (field) {
					return !field.hideOnConfirm;
				}).map(function (field) {
					return field.widget.displayValue(field.value);
				}).join(' ')) : _this71.addLine(item.title, item.widget.displayValue(item.value));
			});
			if (this._linesCount >= 8) cj.DOM.addClass(this.$table, 'compact');

			this._nextButton.on(function () {
				_this71.showPreloader('Проверка данных');
				if (S.get(K.SESSION.FAVOURITE_CONFIRMATION)) {
					if (form.currentField().type === cj.sinap.elements.TYPE.REFERENCE) {
						_this71.modifyForm();
						S.set(K.SESSION.FAVOURITE_ADDING, true);
					} else return cj.views.FormContainerView.performOnline().then(function () {
						return _this71.changePage(S.terms().overpayment ? K.NAV.PAY_SUMM_OPTIONS : K.NAV.SUMM);
					}, function (_ref80) {
						var message = _ref80.message;
						var code = _ref80.code;

						cj.statistics.error({ type: K.STAT.ERRORS.USER.VALIDATIONS.FAIL, onlineCode: code });
						return _this71.hidePreloader().showPopup(cj.views.PopupView.errorPopup(message));
					});
				} else {
					if (S.changeOption() === K.CHANGE.BANK) {
						S.set(K.SESSION.PAYMENT.USER_SUM, S.limits.maxTerminal() - S.commission().reverse(S.limits.maxTerminal()));
						cj.views.ChangeOptionsView.performPayment().then(function () {
							return Promise.resolve(_this71.changePage(K.NAV.CASH));
						}, function (message) {
							return Promise.resolve(_this71.hidePreloader().showPopup(cj.views.PopupView.errorPopup(message)));
						}).then(function () {
							return S.set(K.SESSION.PAYMENT.USER_SUM, 0);
						});
					} else if (S.walletBalance() >= (S.sum.fixed() || Number(S.get(K.SESSION.PAYMENT.TOTAL_SUM))) && S.scenario() === cj.sinap.terms.TYPE.QW_ONLINE) _this71.changePage(K.NAV.PAYMENT_OPTIONS);else if (S.phone() && S.sum.available()) _this71.changePage(K.NAV.CHANGE_OPTIONS);else {
						S.changeOption(K.CHANGE.BANK);
						_this71.changePage(K.NAV.CASH);
					}
				}
			});
			this._prevButton.on(function () {
				if (S.get(K.SESSION.FAVOURITE_CONFIRMATION)) {
					if (cj.EXTERNAL) return _this71.changePage(K.NAV.EXIT, { exitType: K.STAT.EXIT.FAVOURITES });else if (S.get(K.SESSION.FAVOURITE_SELECTED)) return _this71.changePage(K.NAV.FAVOURITES);
				} else {
					if (!S.sum.fixed()) {
						if (S.terms().overpayment) return _this71.changePage(S.changeOption() === K.CHANGE.BANK ? K.NAV.PAY_SUMM_OPTIONS : K.NAV.SUMM);
						if (!S.sum.available()) return _this71.changePage(K.NAV.FORM, { direction: K.NAV.PREVIOUS });
						if (S.changeOption() !== K.CHANGE.BANK) return _this71.changePage(K.NAV.SUMM);
						S.changeOption('');
						return _this71.changePage(K.NAV.PAY_SUMM_OPTIONS);
					} else if (S.get(K.SESSION.FAVOURITE_CHANGING)) return _this71.changePage(K.NAV.FORM, { direction: K.NAV.PREVIOUS });
					return _this71.changePage(K.NAV.PHONE);
				}
			});
			if (S.get(K.SESSION.FAVOURITE_CONFIRMATION)) {
				new cj.views.Button({ el: cj.DOM.byId('change-button') }).on(function () {
					form.unsubmitAllFields();
					_this71.modifyForm();
					S.remove(K.SESSION.FAVOURITE_ADDING);
				}).show().render().addAsChildTo(this);
				this.hideOferta();
			}
			this._ofertaButton.on(function () {
				return _this71.changePage(K.NAV.OFERTA);
			}).show().render().addAsChildTo(this);
			return this;
		}
	}, {
		key: "modifyForm",
		value: function modifyForm() {
			S.set(K.SESSION.FAVOURITE_CHANGING, cj.EXTERNAL ? cj.EXTERNAL.session : S.get(K.SESSION.FAVOURITE_SELECTED));
			S.remove(K.SESSION.FAVOURITE_SELECTED);
			this.changePage(K.NAV.FORM);
		}
	}, {
		key: "addLine",
		value: function addLine(key, value) {
			if (cj.nullOrUndefined(value) || value === '') return;
			var r = cj.DOM.create('tr');
			r.appendChild(cj.DOM.create('td', { "class": 'key', children: [cj.DOM.create('div', { text: cj.unescape(key) })] }));
			r.appendChild(cj.DOM.create('td', { "class": 'value', children: [cj.DOM.create('div', { text: cj.unescape(value) })] }));
			this.$table.tBodies[0].appendChild(r);
			this._linesCount++;
		}
	}]);

	return _class81;
})(cj.views.AbstractView);
cj.views.FavouritesView = (function (_cj$views$AbstractView20) {
	_inherits(_class82, _cj$views$AbstractView20);

	function _class82(options) {
		_classCallCheck(this, _class82);

		_get(Object.getPrototypeOf(_class82.prototype), "constructor", this).call(this, options);

		this._prevFav = new cj.views.Button({ el: cj.DOM.byId('prev-fav-button') });
		this._nextFav = new cj.views.Button({ el: cj.DOM.byId('next-fav-button') });

		this.$content = cj.DOM.byId('favourites-content');
		options.nextButton.off().hide();
		cj.favs.clear();
		this._current = 0;
	}

	_createClass(_class82, [{
		key: "render",
		value: function render() {
			var _this72 = this;

			this.clear();

			this.performOnline().then(function (favs) {
				if (!favs || !favs.length) return Promise.reject({
					title: 'Внимание!',
					message: 'Вы еще не платили!',
					cssClass: 'warning'
				});
				_this72.hidePreloader();
				cj.DOM.headerComment(' ');
				_this72.renderFavs(favs);
				_this72.showItem(0, favs.length);

				_this72._prevFav.render().on(function () {
					cj.statistics.click({
						type: K.STAT.CLICK.TYPES.BUTTON,
						value: K.STAT.CLICK.BUTTON.PREVIOUS_LIST
					});
					if (_this72._current - 1 >= 0) _this72.showItem(_this72._current - 1, favs.length);
				}).addAsChildTo(_this72);

				_this72._nextFav.render().on(function () {
					cj.statistics.click({
						type: K.STAT.CLICK.TYPES.BUTTON,
						value: K.STAT.CLICK.BUTTON.NEXT_LIST
					});
					if (_this72._current * 4 + 1 <= favs.length - 4) _this72.showItem(_this72._current + 1, favs.length);
				}).addAsChildTo(_this72);
			})["catch"](function (msg) {
				return _this72.hidePreloader().showPopup(cj.views.PopupView.errorPopup(msg)).then(function () {
					return _this72.changePage(K.NAV.FORM, { direction: K.NAV.PREVIOUS });
				});
			});
			return this;
		}
	}, {
		key: "performOnline",
		value: function performOnline() {
			if (S.get(K.SESSION.USER.FAVOURITE_LIST + S.phone())) return Promise.resolve(S.get(K.SESSION.USER.FAVOURITE_LIST + S.phone()));
			this.showPreloader('Загрузка платежей');
			return new cj.XMLRequest(cj.XMLRequest.FAVOURITES_LIST()).start().then(function (_ref81) {
				var code = _ref81.code;
				var message = _ref81.message;
				var data = _ref81.data;

				switch (code) {
					case 0:
						return Promise.resolve(cj.favs.parse(data));
					default:
						cj.statistics.error({ type: K.STAT.ERRORS.USER.FAVOURITES.ERROR });
						return Promise.reject(cj.XMLRequest.error(code) || message);
				}
			});
		}
	}, {
		key: "renderFavs",
		value: function renderFavs(favs) {
			var _this73 = this;

			this.$content.innerHTML = favs.reduce(function (memo, fav, index) {
				if (index % 4 === 0) memo += "<div class=\"page\">";
				var accountField, typeId, operationId, type, operation, account;
				accountField = S.form.fields.filter(function (field) {
					return field.displayable;
				})[0];
				typeId = Number(favs[index].extras[K.FIELDS.ACCOUNT_TYPE]);
				operationId = Number(favs[index].extras[K.FIELDS.OPERATION_TYPE]);

				type = typeId ? ['Карта', 'Cчет', 'Договор'][typeId - 1] || 'Счет' : accountField && accountField.title || '';
				account = typeId ? cj.sinap.elements.fields.Base.secure(favs[index][K.FIELDS.ACCOUNT]) : '<br/>' + ((accountField || {}).name === K.FIELDS.ACCOUNT ? favs[index][K.FIELDS.ACCOUNT] : favs[index].extras[(accountField || {}).name]);
				operation = operationId ? '<br/><i>' + K.OPERATION_TYPES[operationId] + '</i>' : '';
				memo += "\n\t\t\t<div class=\"element\">\n\t\t\t\t<div id=\"acc-radio-" + (index + 1) + "\" data-code=\"" + (index + 1) + "\" class=\"button\">\n\t\t\t\t\t<div class=\"button-content\">\n\t\t\t\t\t\t" + type + ": <strong>" + account + "</strong>\n\t\t\t\t\t\t" + operation + "\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>";
				if (index % 4 === 4 - 1 || index === favs.length - 1) memo += '</div>';
				return memo;
			}, '');
			this._rg = new cj.views.GroupView({
				el: this.$content,
				elements: cj.DOM.findByClass(this.$content, 'element').map(function (element) {
					return cj.DOM.firstChildByClass(element, 'button');
				}),
				toggleClass: 'pressed'
			}).render().on(function (index) {
				var fav = favs[index];
				cj.favs.fill(fav).then(function () {
					S.set(K.SESSION.FAVOURITE_CONFIRMATION, true);
					S.set(K.SESSION.FAVOURITE_SELECTED, fav);
					_this73.changePage(K.NAV.CONFIRMATION);
				}, function (message) {
					S.form.clear();
					if (typeof message !== 'string') return Promise.reject();
					return _this73.showPopup(cj.views.PopupView.questionPopup({
						title: 'Ошибка',
						message: 'Условия проведения платежа изменились. Вы можете отредактировать запись на www.qiwi.com или удалить запись сейчас.',
						no: 'Отмена',
						yes: 'Удалить'
					})).then(function (type) {
						if (type === K.STAT.CLICK.BUTTON.POPUP.NO) return Promise.resolve({ code: -1 });
						_this73.showPreloader('Удаляем избранный платеж');
						return new cj.XMLRequest(cj.XMLRequest.REMOVE_FAVOURITE(fav.id)).start();
					}).then(function (_ref82) {
						var code = _ref82.code;

						switch (code) {
							case 0:
								return _this73.hidePreloader().showPopup(cj.views.PopupView.messagePopup('Запись удалена.')).then(function () {
									S.set(K.SESSION.USER.FAVOURITE_LIST + S.phone(), S.get(K.SESSION.USER.FAVOURITE_LIST + S.phone()).filter(function (f) {
										return f.id !== fav.id;
									}));
									_this73.render();
								});
								break;
							case -1:
								return Promise.resolve();
							default:
								return Promise.reject();
						}
					});
				})["catch"](function () {
					return _this73.hidePreloader().showPopup(cj.views.PopupView.errorPopup('Произошла техническая ошибка'));
				});
			}).addAsChildTo(this);
		}
	}, {
		key: "showItem",
		value: function showItem(number, total) {
			this._current = number;
			this.$content.style.marginLeft = (-number * 570).toString() + 'px';

			this._prevFav.content("<div class=\"header\">ПРЕДЫДУЩИЕ</div><div class=\"comment\">пролистано " + this._current * 4 + "</div>");
			this._nextFav.content("<div class=\"header\">ЕЩЕ ПЛАТЕЖИ</div><div class=\"comment\">осталось " + (total - this._current * 4 - 4) + "</div>");
			number ? this._prevFav.show() : this._prevFav.hide();
			number * 4 >= total - 4 ? this._nextFav.hide() : this._nextFav.show();
		}
	}]);

	return _class82;
})(cj.views.AbstractView);
cj.views.OffertusView = (function (_cj$views$AbstractView21) {
	_inherits(_class83, _cj$views$AbstractView21);

	_createClass(_class83, [{
		key: "CONTENT_HEIGHT",
		get: function get() {
			return 630;
		}
	}]);

	function _class83(options) {
		_classCallCheck(this, _class83);

		_get(Object.getPrototypeOf(_class83.prototype), "constructor", this).call(this, options);
		this._leftButton = new cj.views.Button({ el: cj.DOM.byId('left-button') });
		this._rightButton = new cj.views.Button({ el: cj.DOM.byId('right-button') });
		this.$content = cj.DOM.byId('offertus-content');
	}

	_createClass(_class83, [{
		key: "render",
		value: function render() {
			var _this74 = this;

			this.clear();

			this.showPreloader();
			(S.scenario() === cj.sinap.terms.TYPE.QD ? _fetch.get('../params.json').then(function (data) {
				var _JSON$parse3 = JSON.parse(data);

				var info = _JSON$parse3.info;

				_this74._template = info;
				return ["../pages/resourses/" + info['offer-type'] + ".html"];
			}) : Promise.resolve(['../QK_oferta_erk_vqw.xml', '../QK_oferta_full.xml', '../QK_oferta_bank.xml'])).then(function (paths) {
				return Promise.all(paths.map(function (p) {
					return _fetch.get(p);
				}));
			}).then(function (data) {
				if (!data.length) return Promise.reject("Length is zero");
				cj.DOM.hide(_this74.$content);

				_this74.$content.innerHTML = data.map(S.scenario() === cj.sinap.terms.TYPE.QD ? function (d) {
					return d.replace(/#(aof-.*)\s/g, function (match, variable) {
						return _this74._template[variable];
					}).replace(/\n/g, '<br>');
				} : function (d) {
					return cj.XML.findInNodeByAttribute(cj.XML.findInNode(cj.XML.parse(d), 'root'), 'name', 'qiwi').firstChild.nodeValue.replace(/<\/?font.*>/g, '');
				}).join('<hr>');
				cj.DOM.show(_this74.$content);
				_this74._pages = Math.ceil((_this74.$content.lastChild.offsetTop || _this74.$content.lastElementChild.offsetTop || 1) / _this74.CONTENT_HEIGHT);
				_this74.showPage();
			})["catch"](function () {
				return _this74.showPopup(cj.views.PopupView.errorPopup("Невозможно загрузить текстовые данные")).then(function () {
					return _this74.changePage(K.NAV.CONFIRMATION);
				});
			}).then(function () {
				return _this74.hidePreloader();
			});

			this._leftButton.render().on(function () {
				if (_this74._current > 1) {
					_this74.showPage(_this74._current - 1);
					cj.statistics.click({
						type: K.STAT.CLICK.TYPES.BUTTON,
						value: K.STAT.CLICK.BUTTON.PREVIOUS_LIST
					});
				}
			}).addAsChildTo(this);
			this._rightButton.render().on(function () {
				if (_this74._current < _this74._pages) {
					_this74.showPage(_this74._current + 1);
					cj.statistics.click({
						type: K.STAT.CLICK.TYPES.BUTTON,
						value: K.STAT.CLICK.BUTTON.NEXT_LIST
					});
				}
			}).addAsChildTo(this);
			return this;
		}
	}, {
		key: "showPage",
		value: function showPage() {
			var number = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

			this._current = number;
			cj.DOM.subHeader(this._current + "-я страница из " + this._pages);
			this.$content.style.marginTop = -(this.CONTENT_HEIGHT * (this._current - 1)) + 'px';
			this._current === 1 ? this._leftButton.disable() : this._leftButton.enable();
			this._current === this._pages ? this._rightButton.disable() : this._rightButton.enable();
		}
	}]);

	return _class83;
})(cj.views.AbstractView);
cj.views.PaymentMethodView = (function (_cj$views$AbstractView22) {
	_inherits(_class84, _cj$views$AbstractView22);

	function _class84(options) {
		_classCallCheck(this, _class84);

		_get(Object.getPrototypeOf(_class84.prototype), "constructor", this).call(this, options);
		this.cashButton = new cj.views.Button({
			el: cj.DOM.byId('cash-button')
		});
		this.balanceButton = new cj.views.Button({
			el: cj.DOM.byId('balance-button')
		});
		this.prevButton = options.prevButton.show();
		this.balanceButton.$el.querySelector('.comment').innerHTML = "На вашем счету " + cj.toSum(S.walletBalance()) + " " + S.RUB_SUFFIX;
	}

	_createClass(_class84, [{
		key: "render",
		value: function render() {
			var _this75 = this;

			this.clear();

			this.cashButton.on(function () {
				S.paymentMethod(K.PAYMENT.CASH);
				_this75.changePage(K.NAV.CHANGE_OPTIONS);
			}).render().addAsChildTo(this);

			if (S.pin() === '666') this.balanceButton.disable().render().addAsChildTo(this);else this.balanceButton.on(function () {
				S.paymentMethod(K.PAYMENT.BALANCE);
				_this75.changePage(K.NAV.BALANCE);
			}).render().addAsChildTo(this);

			this.prevButton.on(function () {
				return _this75.changePage(K.NAV.CONFIRMATION);
			});
			return this;
		}
	}]);

	return _class84;
})(cj.views.AbstractView);
cj.views.PaymentNotConfirmedView = (function (_cj$views$AbstractView23) {
	_inherits(_class85, _cj$views$AbstractView23);

	function _class85() {
		_classCallCheck(this, _class85);

		_get(Object.getPrototypeOf(_class85.prototype), "constructor", this).apply(this, arguments);
	}

	return _class85;
})(cj.views.AbstractView);
cj.views.PaySummOptionsView = (function (_cj$views$AbstractView24) {
	_inherits(_class86, _cj$views$AbstractView24);

	function _class86(options) {
		_classCallCheck(this, _class86);

		_get(Object.getPrototypeOf(_class86.prototype), "constructor", this).call(this, options);
		this.fullSummButton = new cj.views.Button({
			el: cj.DOM.byId('full-summ-button')
		});
		this.fixedSummButton = new cj.views.Button({
			el: cj.DOM.byId('fixed-summ-button')
		});
		this.prevButton = options.prevButton.show();
	}

	_createClass(_class86, [{
		key: "render",
		value: function render() {
			var _this76 = this;

			this.clear();

			this.fullSummButton.on(function () {
				S.changeOption(K.CHANGE.BANK);
				S.set(K.SESSION.PAYMENT.USER_SUM, 0);
				S.remove(K.SESSION.FAVOURITE_CONFIRMATION);
				_this76.changePage(K.NAV.CONFIRMATION);
			}).render().addAsChildTo(this);
			this.fixedSummButton.on(function () {
				return _this76.changePage(S.get(K.SESSION.FAVOURITES_USED) ? K.NAV.FAVOURITES : K.NAV.SUMM);
			}).render().addAsChildTo(this);

			this.prevButton.on(function () {
				S.set(K.SESSION.FAVOURITE_CONFIRMATION, true);
				if (S.get(K.SESSION.FAVOURITE_CHANGING)) _this76.changePage(K.NAV.FORM, { direction: K.NAV.PREVIOUS });else if (S.get(K.SESSION.FAVOURITE_SELECTED) || cj.EXTERNAL) _this76.changePage(K.NAV.CONFIRMATION);else if (S.scenario === cj.sinap.terms.TYPE.QD) _this76.changePage(K.NAV.FORM, { direction: K.NAV.PREVIOUS });else _this76.changePage(K.NAV.PHONE);
			});

			return this;
		}
	}]);

	return _class86;
})(cj.views.AbstractView);
cj.views.PhoneEnterView = (function (_cj$views$AbstractView25) {
	_inherits(_class87, _cj$views$AbstractView25);

	function _class87(options) {
		var _this77 = this;

		_classCallCheck(this, _class87);

		_get(Object.getPrototypeOf(_class87.prototype), "constructor", this).call(this, options);
		this._nextButton = options.nextButton;
		this._prevButton = options.prevButton;
		this._field = new cj.views.TextField({
			el: cj.DOM.byId('textfield'),
			mask: '+7(ddd)-ddd-dd-dd',
			maxChars: 10,
			update: function update() {
				return _this77.update();
			}
		});
		this._numpad = new cj.views.Numpad({ el: cj.DOM.byId('numpad') });
	}

	_createClass(_class87, [{
		key: "render",
		value: function render() {
			var _this78 = this;

			this.clear();

			this._nextButton.on(function () {
				cj.statistics.page_data({
					phone: _this78._field.value()
				});
				_this78.showPreloader({
					header: 'Проверка номера',
					text: 'Пожалуйста, подождите, пока введенный вами номер пройдет проверку.'
				});
				cj.maratl.send(K.MARATL.REQ.PROVIDER_BY_PHONE, _this78._field.value(), K.MARATL.RESP.PROVIDER_BY_PHONE, null, cj.timeout.ONLINE_TIMEOUT).then(function (resp) {
					try {
						var json = JSON.parse(resp[K.MARATL.RESP.PROVIDER_BY_PHONE]);
					} catch (e) {
						return Promise.reject('Ошибка обработки данных по номерным емкостям.');
					}
					if (!cj.correctNumbers(json.result)) json.result = 600;
					cj.statistics.validation({
						type: K.STAT.VALIDATION.USER.PHONE.NUMBER,
						result: Number(json.result) === 0 || Number(json.result) === 155 ? 0 : 1
					});
					return Number(json.result) === 0 || Number(json.result) === 155 ? Promise.resolve(Number(json.result) === 155 ? -1 : json.providerId) : Promise.reject(cj.XMLRequest.error(Number(json.result)) || json['result-description'] || 'Неизвестная ошибка онлайн-проверки телефона.');
				}).then(function (prvId) {
					S.set(K.SESSION.USER.PHONE.PROVIDER, prvId);
					S.phone(_this78._field.value());
					S.phoneFormatted();
					return _this78.performOnline();
				}).then(function (toPin) {
					if (toPin) return _this78.changePage(K.NAV.PIN);
					S.pin('666');
					S.walletBalance(0);
					if (S.terms().overpayment) return _this78.changePage(K.NAV.PAY_SUMM_OPTIONS);else if (!S.sum.fixed() && S.sum.available()) return _this78.changePage(K.NAV.SUMM);else return _this78.changePage(K.NAV.CONFIRMATION);
				})["catch"](function (message) {
					return message ? _this78.hidePreloader().showPopup(cj.views.PopupView.errorPopup(message)) : null;
				});
			}).hide();

			this._prevButton.on(function () {
				S.set(K.SESSION.SPECIAL_FORM_DIRECTION, K.NAV.PREVIOUS);
				_this78.changePage(K.NAV.FORM, { direction: K.NAV.PREVIOUS });
			}).show();

			this._field.render().addAsChildTo(this);

			this._numpad.on(function (code) {
				_this78._field.appendText(code.toString());
				_this78.update();
			}).render().addAsChildTo(this);

			if (this._field.value(S.phone() || '')) this.update();

			if (S.form.miscInfo.authSideInfo) this.showSideInfo({ text: S.form.miscInfo.authSideInfo });
			return this;
		}
	}, {
		key: "performOnline",
		value: function performOnline() {
			var _this79 = this;

			if (S.scenario() === cj.sinap.terms.TYPE.QD) return Promise.resolve();
			var idRequired = S.terms().identification && S.terms().identification.required;
			this.showPreloader({
				header: 'Проверка номера',
				text: idRequired ? 'Запрос статуса идентификации' : 'Пожалуйста, подождите, пока введенный вами номер пройдет проверку.'
			});
			return new cj.XMLRequest(cj.XMLRequest.CHECK_PHONE(), {
				headers: { 'X-Proxy-Url': 'qw_internal_xml' },
				url: 'https://facecontrol.qiwi.com/proxy'
			}).start().then(function (data) {
				if (idRequired) _this79.showPreloader({
					header: 'Проверка номера',
					text: 'Ваш статус идентификации позволяет совершить платеж.'
				});
				return Promise.timeout(function () {
					return data;
				}, idRequired ? 1000 : 0);
			}).then(function (_ref83) {
				var code = _ref83.code;
				var message = _ref83.message;
				var data = _ref83.data;

				if (code === 0) {
					S.set(K.SESSION.IDENTIFICATION, data.text);
					var phoneResponse = new cj.XML(data.find('response').children[2]);
					var identificationResponse = new cj.XML(data.find('response').children[1]);
					if (identificationResponse.resultCode() !== '0') // Identification status response
						return Promise.reject(cj.XMLRequest.error(identificationResponse.resultCode()) || identificationResponse.message());
					if (phoneResponse.resultCode() !== '0') return Promise.reject(cj.XMLRequest.error(phoneResponse.resultCode()) || phoneResponse.message());
					if (S.scenario() === cj.sinap.terms.TYPE.QW_OFFLINE && !S.get(K.SESSION.FAVOURITES_USED)) return Promise.resolve();
					if (S.get(K.SESSION.FAVOURITES_USED)) {
						if (phoneResponse.findValue('pin') === '1') return Promise.resolve(true);
						// Нужен ли здесь этот фейк-пин?
						S.pin('666');
						return _this79.hidePreloader().showPopup(cj.views.PopupView.questionPopup({
							title: 'Получите PIN-код!',
							message: "С помощью PIN-кода вы получаете доступ к сохраненным платежам и оплате с баланса. Выслать на " + S.phoneFormatted() + "?",
							yes: 'Выслать',
							no: 'Отмена'
						})).then(function (type) {
							if (type === K.STAT.CLICK.BUTTON.POPUP.NO) return Promise.reject();
							_this79.showPreloader('Отправка PIN-кода');
							return new cj.XMLRequest(cj.XMLRequest.REGISTER()).start();
						}).then(function (_ref84) {
							var code = _ref84.code;
							var message = _ref84.message;

							if (code === 0) return _this79.hidePreloader().showPopup(cj.views.PopupView.messagePopup({
								title: 'Вы зарегистрированы!',
								message: 'На ваш телефон было отправлено SMS-сообщение.'
							}));else return Promise.reject(cj.XMLRequest.error(code) || message);
						}, function (msg) {
							return Promise.reject(msg);
						});
					} else return Promise.resolve(phoneResponse.findValue('exist') === '1' && phoneResponse.findValue('pin') === '1');
				} else return Promise.reject(cj.XMLRequest.error(code) || message);
			});
		}
	}, {
		key: "update",
		value: function update() {
			this._field.value().length === 10 ? this._nextButton.show() : this._nextButton.hide();
		}
	}, {
		key: "clear",
		value: function clear() {
			this._nextButton && this._nextButton.off();
			this._prevButton && this._prevButton.off();
		}
	}, {
		key: "destroy",
		value: function destroy() {
			_get(Object.getPrototypeOf(_class87.prototype), "destroy", this).call(this);
			this._nextButton = null;
			this._prevButton = null;
		}
	}]);

	return _class87;
})(cj.views.AbstractView);
cj.views.PinEnterView = (function (_cj$views$AbstractView26) {
	_inherits(_class88, _cj$views$AbstractView26);

	function _class88(options) {
		var _this80 = this;

		_classCallCheck(this, _class88);

		_get(Object.getPrototypeOf(_class88.prototype), "constructor", this).call(this, options);
		this._nextButton = options.nextButton;
		this._prevButton = options.prevButton;
		this._field = new cj.views.TextField({
			el: cj.DOM.byId('textfield'),
			maxChars: 10,
			update: function update() {
				return _this80.update();
			}
		});
		this._numpad = new cj.views.Numpad({ el: cj.DOM.byId('numpad') });
		this._restorePinButton = new cj.views.Button({
			el: cj.DOM.byId('restore-pin-button')
		});
	}

	_createClass(_class88, [{
		key: "render",
		value: function render() {
			var _this81 = this;

			this._field.render().addAsChildTo(this).value('');

			this._nextButton.off().on(function () {
				S.pin(_this81._field.value());
				_this81._field.value('');
				_this81.update();
				_this81.performOnline().then(function (page) {
					_this81.hidePreloader();
					return (_this81._pinChanged ? _this81.showPopup(cj.views.PopupView.questionPopup({
						title: '',
						message: "Вы можете поменять PIN-код на более удобный.",
						no: 'Нет, спасибо',
						yes: 'Поменять'
					})) : Promise.resolve(K.STAT.CLICK.BUTTON.POPUP.NO)).then(function (type) {
						if (type === K.STAT.CLICK.BUTTON.POPUP.NO) return Promise.resolve();
						cj.statistics.click({
							type: K.STAT.CLICK.TYPES.BUTTON,
							value: K.STAT.CLICK.BUTTON.CHANGE_PIN
						});
						return _this81.changePin();
					}).then(function (extraPage) {
						return _this81.changePage(extraPage || page);
					});
				})["catch"](function (msg) {
					return _this81.hidePreloader().showPopup(cj.views.PopupView.errorPopup(msg));
				});
			}).hide();

			this._numpad.on(function (code) {
				_this81._field.appendText(code.toString());
				_this81.update();
			}).render().addAsChildTo(this);

			this._restorePinButton.on(function () {
				cj.statistics.click({
					type: K.STAT.CLICK.TYPES.BUTTON,
					value: K.STAT.CLICK.BUTTON.RESTORE_PIN
				});
				_this81.showPopup(cj.views.PopupView.questionPopup({
					title: 'Отправить SMS с новым PIN-кодом?',
					message: "Если у вас есть " + S.VQW_NAME + ", то его PIN-код тоже изменится.",
					no: 'Не отправлять',
					yes: 'Отправить'
				})).then(function (type) {
					return type !== K.STAT.CLICK.BUTTON.POPUP.NO ? _this81.restorePIN() : null;
				});
			}).render().addAsChildTo(this);

			return this;
		}
	}, {
		key: "restorePIN",
		value: function restorePIN() {
			var _this82 = this;

			this.showPreloader('Отправка PIN-кода');
			new cj.XMLRequest(cj.XMLRequest.RESTORE_PIN()).start().then(function (_ref85) {
				var code = _ref85.code;
				var message = _ref85.message;

				_this82.hidePreloader();
				cj.statistics.validation({
					type: K.STAT.VALIDATION.USER.PIN.RESTORE,
					result: code
				});
				if (code === 0) {
					_this82._restorePinButton.hide();
					return _this82.showPopup(cj.views.PopupView.messagePopup({
						message: 'Новый PIN-код отправлен вам в SMS-сообщении.',
						title: 'Ваш PIN-код изменен!'
					})).then(function () {
						return _this82._pinChanged = true;
					});
				} else return _this82.showPopup(cj.views.PopupView.errorPopup({
					title: 'Внимание',
					message: (cj.XMLRequest.error(code) || message) + '<br/><br/><span style="font-size: 36px;">Если вы забыли PIN-код, отправьте SMS с текстом PIN на номер 7494.<br/>Стоимость SMS по тарифу вашего оператора.</span>',
					cssClass: 'warning'
				}));
			})["catch"](function (msg) {
				return _this82.hidePreloader().showPopup(cj.views.PopupView.errorPopup(msg));
			});
		}
	}, {
		key: "isSecurePin",
		value: function isSecurePin(pin) {
			var fails = [function (pin) {
				return (/(\d)\1{3}/.test(pin)
				);
			}, function (pin) {
				return (/0[0-9]{3}/.test(pin)
				);
			}, function (pin) {
				return (/(?:0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)|9(?=0)){3}/.test(pin)
				);
			}];
			return fails.filter(function (test) {
				return test(pin);
			}).length === 0;
		}
	}, {
		key: "changePin",
		value: function changePin() {
			var _this83 = this;

			return new Promise(function (resolve, reject) {
				_this83._field.value('');
				_this83._field.maxChars = 4;
				_this83.update();
				cj.DOM.header("Придумайте новый PIN-код");
				cj.DOM.headerComment("");
				_this83._prevButton.off().on(function () {
					return resolve(K.NAV.PIN);
				});
				_this83._nextButton.off().on(function () {
					var firstPin = _this83._field.value();
					if (!_this83.isSecurePin(firstPin)) return _this83.showPopup(cj.views.PopupView.errorPopup({
						title: 'Этот PIN-код недостаточно надежный',
						message: 'Придумайте PIN-код, где нет:</br>- 0 в начале</br>- одинаковых цифр</br>- цифр, идущих по порядку (например, 2345)',
						cssClass: 'error limited-center'
					})).then(function () {
						return _this83.changePin().then(resolve, reject);
					});
					_this83._field.value('');
					_this83.update();
					cj.DOM.header("Повторите PIN-код");
					_this83._prevButton.off().on(function () {
						return _this83.changePin().then(resolve, reject);
					});
					_this83._nextButton.off().on(function () {
						if (firstPin !== _this83._field.value()) return _this83.showPopup(cj.views.PopupView.errorPopup("Введенные PIN-коды не совпадают")).then(function () {
							return _this83._field.value('');
						});
						_this83.showPreloader('Изменение PIN-кода');
						new cj.XMLRequest(cj.XMLRequest.CHANGE_PIN(firstPin)).start().then(function (_ref86) {
							var code = _ref86.code;
							var message = _ref86.message;

							if (code !== 0) return Promise.reject(message);
							S.pin(firstPin);
							_this83.showPopup(cj.views.PopupView.messagePopup('Ваш PIN-код изменен!')).then(function () {
								return resolve();
							});
						})["catch"](function (msg) {
							return _this83.showPopup(cj.views.PopupView.errorPopup(msg));
						}).then(function () {
							return _this83.hidePreloader();
						});
					});
				});
			});
		}
	}, {
		key: "performOnline",
		value: function performOnline() {
			var _this84 = this;

			this.showPreloader({
				header: 'Проверка PIN-кода',
				text: 'Пожалуйста, подождите, пока проверяется PIN-код.'
			});
			return new cj.XMLRequest(cj.XMLRequest.CHECK_PIN()).start().then(function (_ref87) {
				var code = _ref87.code;
				var message = _ref87.message;
				var data = _ref87.data;

				if (code === 0) {
					cj.statistics.validation({
						type: K.STAT.VALIDATION.USER.PIN.NUMBER,
						result: 0
					});
					var xItem = cj.XML.findInNodeByAttribute(data.find('balances'), 'code', K.RUB_CURRENCY_CODE);
					S.walletBalance(xItem ? Number(cj.XML.findText(xItem)) : '0');

					if (S.get(K.SESSION.FAVOURITES_USED)) return Promise.resolve(K.NAV.FAVOURITES);else if (S.terms().overpayment) return Promise.resolve(K.NAV.PAY_SUMM_OPTIONS);else if (!S.sum.fixed() && S.sum.available()) return Promise.resolve(K.NAV.SUMM);else return Promise.resolve(K.NAV.CONFIRMATION);
				} else {
					_this84._field.value('');
					cj.statistics.validation({
						type: K.STAT.VALIDATION.USER.PIN.NUMBER,
						result: 1
					});
					return Promise.reject(cj.XMLRequest.error(code) || message);
				}
			});
		}
	}, {
		key: "update",
		value: function update() {
			this._field.value().length >= 4 ? this._nextButton.show() : this._nextButton.hide();
			this._field.text(this._field.value().replace(/./g, "●"));
		}
	}, {
		key: "destroy",
		value: function destroy() {
			_get(Object.getPrototypeOf(_class88.prototype), "destroy", this).call(this);
			this._nextButton = null;
		}
	}]);

	return _class88;
})(cj.views.AbstractView);
cj.views.SmsConfirmationView = (function (_cj$views$AbstractView27) {
	_inherits(_class89, _cj$views$AbstractView27);

	function _class89(options) {
		var _this85 = this;

		_classCallCheck(this, _class89);

		_get(Object.getPrototypeOf(_class89.prototype), "constructor", this).call(this, options);
		this._nextButton = options.nextButton;
		this._prevButton = options.prevButton;
		this._field = new cj.views.TextField({
			el: cj.DOM.byId('textfield'),
			maxChars: this._maxSymbols,
			update: function update() {
				return _this85.update();
			}
		});
		this._numpad = new cj.views.Numpad({ el: cj.DOM.byId('numpad') });
		this._resendSmsButton = new cj.views.Button({
			el: cj.DOM.byId('resend-sms-button')
		});
		this._readyToSend = false;
		this._tries = 0;
		this._maxRetries = 2;
		this._smsTimeout = 20 * 1000;
		this._minSymbols = 4;
		this._maxSymbols = 8;
	}

	_createClass(_class89, [{
		key: "render",
		value: function render() {
			var _this86 = this;

			this.clear();
			this._field.render().addAsChildTo(this).text('');
			this._tries = 0;

			this._nextButton.on(function () {
				if (_this86._tries >= _this86._maxRetries) _this86.showPopup(cj.views.PopupView.errorPopup({
					message: 'Исчерпан лимит ввода кода подтверждения. Повторите платеж заново.',
					button: 'Назад'
				})).then(function () {
					return _this86._prevButton.trigger(_this86.model[K.NAV.PREVIOUS]);
				});else {
					_this86.showPreloader('Проверка SMS-кода');
					return new cj.sinap.Request("payments/" + S.get(K.SESSION.PAYMENT_ID).toString() + "/confirm", 'POST', {
						smsCode: _this86._field.text()
					})["catch"](function (_ref88) {
						var message = _ref88.message;
						var code = _ref88.code;

						cj.statistics.error({ type: K.STAT.ERRORS.USER.BALANCE.SMS.FAIL, onlineCode: code });
						return Promise.reject(message);
					}).then(function () {
						return cj.views.BalancePaymentView.onSuccess(_this86);
					})["catch"](function (message) {
						return Promise.reject(_this86.hidePreloader().showPopup(cj.views.PopupView.errorPopup(message)));
					}).then(function () {
						return _this86.changePage(K.NAV.EXIT, { exitType: K.STAT.EXIT.PASSPORT });
					});
				}
			}).hide();

			this._numpad.on(function (code) {
				_this86._field.appendText(code.toString());
				_this86.update();
			}).render().addAsChildTo(this);

			this._resendSmsButton.on(function () {
				cj.statistics.click({
					type: K.STAT.CLICK.TYPES.BUTTON,
					value: K.STAT.CLICK.BUTTON.RESEND_SMS
				});
				if (!_this86._readyToSend) return _this86.showPopup(cj.views.PopupView.errorPopup("Повторный запрос кода возможен не чаще, чем один раз в " + _this86._smsTimeout / 1000 + " секунд.")).then(function () {
					return _this86._prevButton.trigger(_this86.model[K.NAV.PREVIOUS]);
				});
				_this86.showPreloader('Отправка SMS-кода');
				new cj.sinap.Request("payments/" + S.get(K.SESSION.PAYMENT_ID).toString() + "/resendConfirmationSMS", 'POST', {
					id: S.get(K.SESSION.PAYMENT_ID).toString()
				}).then(function () {
					_this86.hidePreloader().showPopup(cj.views.PopupView.messagePopup({
						title: 'Код выслан повторно.',
						message: 'Повторите попытку ввода.'
					}));

					_this86._readyToSend = false;
					setTimeout(function () {
						return _this86._readyToSend = true;
					}, _this86._smsTimeout);
				})["catch"](function (_ref89) {
					var code = _ref89.code;
					var message = _ref89.message;

					cj.statistics.error({ type: K.STAT.ERRORS.USER.BALANCE.SMS.RESEND.FAIL, onlineCode: code });
					_this86.hidePreloader().showPopup(cj.views.PopupView.errorPopup(message));
				});
			}).render().addAsChildTo(this);

			setTimeout(function () {
				return _this86._readyToSend = true;
			}, this._smsTimeout);
			return this;
		}
	}, {
		key: "update",
		value: function update() {
			this._field.text().length >= this._minSymbols ? this._nextButton.show() : this._nextButton.hide();
		}
	}]);

	return _class89;
})(cj.views.AbstractView);
cj.views.StatisticsView = (function (_cj$views$AbstractView28) {
	_inherits(_class90, _cj$views$AbstractView28);

	function _class90(options) {
		var _cj$maratl$send;

		_classCallCheck(this, _class90);

		_get(Object.getPrototypeOf(_class90.prototype), "constructor", this).call(this, options);
		cj.DOM.headerComment('');

		this.exitType = options.exitType || K.STAT.EXIT.REGULAR;
		if (S.get(K.SESSION.TRANSACTION_ID)) cj.statistics.page_data({ trm_txn_id: S.get(K.SESSION.TRANSACTION_ID) });
		cj.statistics.exit({ type: this.exitType });

		if (this.exitType === K.STAT.EXIT.FAVOURITES) {
			storage.set('button_id', S.qd(true));
			var l, p, pr;
			if ((l = S.phone()) && (p = S.pin()) && (pr = S.get(K.SESSION.USER.PHONE.PROVIDER))) {
				storage.set('login', l.toString());
				storage.set('login0', p.toString());
				storage.set('phone_prv_id', pr.toString());
				storage.set('ident', cj.EXTERNAL.ident);
				storage.set('mode', cj.EXTERNAL.mode);
			}
			localStorage.interfaceStartParams = '#change_type#{ "page": "provider", "id": "13752"}';
			localStorage.go_to_index = "true";
		}

		cj.maratl.send(cj.maratl.REQUEST, (_cj$maratl$send = {}, _defineProperty(_cj$maratl$send, K.MARATL.QD_PAYMENT.PROVIDER_ID, '323'), _defineProperty(_cj$maratl$send, K.MARATL.QD_PAYMENT.ACCOUNT, '0000000000'), _defineProperty(_cj$maratl$send, K.MARATL.DEPRECATED_STATISTICS.PROJECT_NUMBER, '30036'), _defineProperty(_cj$maratl$send, K.MARATL.DEPRECATED_STATISTICS.NO_PRINT, true), _defineProperty(_cj$maratl$send, K.MARATL.DEPRECATED_STATISTICS.FAKE_PROVIDER, true), _defineProperty(_cj$maratl$send, K.MARATL.DEPRECATED_STATISTICS.QD_ID, S.qd(true)), _defineProperty(_cj$maratl$send, K.MARATL.DEPRECATED_STATISTICS.SUM, S.get(K.SESSION.PAYMENT.TOTAL_INSERTED) || '0'), _defineProperty(_cj$maratl$send, K.MARATL.SET.CREATE_PAY, true), _cj$maratl$send));
	}

	_createClass(_class90, [{
		key: "render",
		value: function render() {
			var _this87 = this;

			var finalExitTimeout = 500 /* 1 * 1000 */;
			this.showPreloader({
				header: 'Выход из приложения',
				text: 'Пожалуйста, подождите, пока приложение завершает свою работу.'
			});
			Promise.timeout(function () {
				_this87.hidePreloader();
				if (!cj.maratl.emulator) {
					cj.APP.destroy();
					document.location = _this87.exitType === K.STAT.EXIT.PASSPORT ? '../core/index.html?ereceipt' : '../index.html';
				}
			}, finalExitTimeout);
			return this;
		}
	}]);

	return _class90;
})(cj.views.AbstractView);
cj.views.SummEnterView = (function (_cj$views$AbstractView29) {
	_inherits(_class91, _cj$views$AbstractView29);

	function _class91(options) {
		_classCallCheck(this, _class91);

		_get(Object.getPrototypeOf(_class91.prototype), "constructor", this).call(this, options);
		this._nextButton = options.nextButton;
		this._prevButton = options.prevButton.show();
	}

	_createClass(_class91, [{
		key: "isSumValid",
		value: function isSumValid(sum, totalSum) {
			if (totalSum && totalSum > S.limits.maxTerminal()) return Promise.reject("Максимальная сумма платежа на данном терминале составляет " + S.limits.maxTerminal() + " " + S.RUB_SUFFIX);
			if (sum > (S.limits.maxProvider() || 15000)) return Promise.reject("Максимальная сумма платежа по данному провайдеру составляет " + (S.limits.maxProvider() || 15000) + " " + S.RUB_SUFFIX);
			if (sum < (S.limits.minProvider() || 1)) return Promise.reject("Минимальная сумма платежа по данному провайдеру составляет " + (S.limits.minProvider() || 1) + " " + S.RUB_SUFFIX);
			return Promise.resolve();
		}
	}, {
		key: "render",
		value: function render() {
			var _this88 = this;

			this.clear();
			this.showPreloader();

			this._nextButton.off().on(function () {
				return S.scenario() !== cj.sinap.terms.TYPE.QD && (S.limits.maxProvider() === null || S.limits.minProvider() === null) ? _this88.showPopup(cj.views.PopupView.errorPopup({
					title: 'Техническая ошибка',
					message: 'Не заданы ограничения суммы провайдера'
				})).then(function () {
					return _this88.changePage(K.NAV.EXIT);
				}) : _this88.isSumValid(_this88._userSum, _this88._fullSumm).then(function () {
					cj.statistics.page_data({ sum: _this88._userSum });
					S.set(K.SESSION.PAYMENT.USER_SUM, _this88._userSum);
					S.set(K.SESSION.PAYMENT.GROSS_SUM, _this88._userSum + _this88._providerCommission);
					S.set(K.SESSION.PAYMENT.TOTAL_SUM, _this88._fullSumm);
					S.remove(K.SESSION.FAVOURITE_CONFIRMATION);
					_this88.changePage(K.NAV.CONFIRMATION);
				})["catch"](function (message) {
					return _this88.showPopup(cj.views.PopupView.errorPopup(message)).then(function () {
						return S.sum.fixed() ? _this88._prevButton.trigger() : null;
					});
				});
			});

			this._prevButton.off().on(function () {
				S.set(K.SESSION.FAVOURITE_CONFIRMATION, true);
				if (S.terms().overpayment) _this88.changePage(K.NAV.PAY_SUMM_OPTIONS);else if (S.get(K.SESSION.FAVOURITE_CHANGING)) _this88.changePage(K.NAV.FORM, { direction: K.NAV.PREVIOUS });else if (S.get(K.SESSION.FAVOURITE_SELECTED) || cj.EXTERNAL) _this88.changePage(K.NAV.CONFIRMATION);else if (S.scenario() === cj.sinap.terms.TYPE.QD && !S.sum.available()) _this88.changePage(K.NAV.FORM, { direction: K.NAV.PREVIOUS });else _this88.changePage(K.NAV.PHONE);
			});

			this._numpad = new cj.views.Numpad({
				el: cj.DOM.byId('numpad'),
				withPoint: true
			}).on(function (code) {
				_this88._textField.appendText(code.toString());
				_this88.update();
			}).render().addAsChildTo(this);
			this._textField = new cj.views.TextField({
				el: cj.DOM.byId('rub-field'),
				update: function update() {
					return _this88.update();
				}
			}).render().addAsChildTo(this);

			var infoBlock = cj.DOM.byId('sum-info-block');
			this.$finalSummLabel = infoBlock.querySelector('#to-insert-info-item span');
			this.$commissionLabel = infoBlock.querySelector('#commission-info-item span');

			this._userSum = S.sum.fixed() || this.hidePreloader() && S.get(K.SESSION.PAYMENT.USER_SUM);
			this._textField.value(this._userSum ? Number(this._userSum).toString() : S.sum.suggested() || '');
			this.update();

			this.renderInfo(S.terms().description);

			if (S.commission().comment) this.showSideInfo({ text: "Комиссия " + S.commission().comment + "<br/><br/>" + (S.terms().deadline || '') });

			return this;
		}
	}, {
		key: "renderInfo",
		value: function renderInfo(description) {
			var _this89 = this;

			if (!description) return;
			new cj.views.Button({ el: cj.DOM.byId('info-button') }).render().on(function () {
				return _this89.showPopup(cj.views.PopupView.messagePopup({
					message: description,
					cssClass: 'terms-info-popup',
					title: 'Информация',
					button: 'Продолжить'
				}));
			}).show();
		}
	}, {
		key: "update",
		value: function update() {
			var _this90 = this;

			var data = this.constructor._formatString(this._textField);
			S.set(K.SESSION.PAYMENT.USER_SUM, this._userSum = parseFloat(data || 0));
			data ? this._nextButton.show() : this._nextButton.hide();

			if (this._userSum <= 0) {
				this._fullSumm = 0;
				this.$finalSummLabel.innerHTML = "0 " + S.RUB_SUFFIX;
				this.$commissionLabel.innerHTML = "0 " + S.RUB_SUFFIX;
				return;
			}

			this._providerCommission = S.commission().forward(this._userSum);
			cj.maratl.send(K.MARATL.REQ.REVERSE_COMMISSION, JSON.stringify({
				prvId: S.qd(),
				summ: cj.round2(this._userSum + this._providerCommission)
			}), K.MARATL.RESP.REVERSE_COMMISSION).then(function (_ref90) {
				var value = _ref90[K.MARATL.RESP.REVERSE_COMMISSION];

				if (_this90._userSum <= 0) return;
				_this90._fullSumm = cj.round2(_this90._userSum + _this90._providerCommission + cj.round2(Number(value)));
				if (S.sum.fixed()) return _this90.hidePreloader() && _this90._nextButton.trigger();
				_this90.$finalSummLabel.innerHTML = (_this90._fullSumm ? cj.toSum(_this90._fullSumm) : '0') + ' ' + S.RUB_SUFFIX;
				_this90.$commissionLabel.innerHTML = cj.toSum(cj.round2(_this90._providerCommission + Number(value))) + ' ' + S.RUB_SUFFIX;
			});
		}
	}], [{
		key: "_formatString",
		value: function _formatString(textfield) {
			var val = textfield.value().split('.');
			val[1] = val[1] !== undefined ? "." + val[1].substring(0, 2) : '';
			val[0] = val[0] && val[0].length > 0 ? val[0].replace(/^0+/, '').substring(0, 5) : '';
			textfield.value("" + val[0] + val[1]);
			var textArr = textfield.text().replace(/\s/g, '').split('.');
			var rub = (textArr[0] || '').substring(0, 5);
			var kop = textArr.length > 1 ? textArr[1].substring(0, 2) || '' : null;

			textfield.text((rub ? cj.toSum(rub) : textArr.length > 1 ? '0' : '') + (kop === null ? '' : '.' + kop));
			return (parseInt(rub, 10) || 0) + (kop ? parseInt(kop, 10) / (kop.length === 1 ? 10 : 100) : 0);
		}
	}]);

	return _class91;
})(cj.views.AbstractView);

var AppView = (function () {
	function AppView(changePageCallback, startPage) {
		_classCallCheck(this, AppView);

		this.exit = new cj.views.Button({
			el: cj.DOM.byId('exit-button'),
			content: 'На главную'
		}).render();
		this.prev = new cj.views.Button({
			el: cj.DOM.byId('prev-button'),
			content: 'Назад'
		}).render();
		this.next = new cj.views.Button({
			el: cj.DOM.byId('next-button'),
			content: 'Далее'
		}).render();
		this.$el = cj.DOM.byId('content-wrapper');
		this.changePage = changePageCallback;
		this.setButtonEvents();
		cj.DOM.byId('version').innerHTML = cj.APP.version;
		this.changePage(startPage);
	}

	_createClass(AppView, [{
		key: "addHeaders",
		value: function addHeaders() {
			cj.DOM.header(this.model.header || '');
			cj.DOM.subHeader(this.model.path || S.longName());
			cj.DOM.headerComment(this.model.comment);
		}
	}, {
		key: "setButtonEvents",
		value: function setButtonEvents() {
			var _this91 = this;

			this.prev.off().on(function (page) {
				if (_this91.model[K.NAV.PREVIOUS] !== K.NAV.NONE && !(_this91.$preloader && _this91.$preloader.isVisible) && !_this91.$popup) _this91.changePage(page);
			});
			this.next.off().on(function (page) {
				if (_this91.model[K.NAV.NEXT] !== K.NAV.NONE && !(_this91.$preloader && _this91.$preloader.isVisible) && !_this91.$popup) _this91.changePage(page);
			});
			this.exit.off().on(function (page) {
				if (_this91.model.skipExitConfirmation || _this91.$exitPopup || _this91.model.id === K.NAV.FORM && S.form.currentFieldIndex === 0) _this91.changePage(page);else _this91.showButtonExitConfirmation();
			});
		}
	}, {
		key: "updateNavButton",
		value: function updateNavButton(button, property) {
			if (this.model[property] !== K.NAV.NONE) button.show().code(this.model[property]);else button.hide();
		}
	}, {
		key: "updateClasses",
		value: function updateClasses() {
			cj.DOM.removeAllRootClasses();
			if (this.model && this.model.containerClass) cj.DOM.addRootClass(this.model.containerClass);
		}
	}, {
		key: "showAds",
		value: function showAds() {
			var s,
			    resultText = '';
			[1, 2, 3].forEach(function (n) {
				if (s = S.config()["ad" + n]) resultText += resultText ? "<br/><br/>" + s : s;
			});
			if (resultText) this.showPopup({
				title: '',
				type: K.STAT.POPUP.ADVERTISEMENT,
				message: "<div class=\"ad_block\">" + resultText + "</div>"
			});
		}
	}, {
		key: "showPopup",
		value: function showPopup(popupOptions) {
			var _this92 = this;

			return new Promise(function (resolve, reject) {
				var el;
				if (el = cj.DOM.byId(popupOptions.content ? "popup-" + popupOptions.content : 'default-popup')) {
					_this92.$popup = new cj.views.PopupView(({ el: el, hide: function hide() {
							return _this92.hidePopup();
						} }).assign(popupOptions)).show().render(resolve, reject);
				}
			});
		}
	}, {
		key: "hidePopup",
		value: function hidePopup() {
			if (this.$exitPopup) this.hideExitPopup();else if (this.$popup) {
				this.$popup.hide().destroy();
				this.$popup = null;
			}
		}
	}, {
		key: "showPreloader",
		value: function showPreloader(options, ad) {
			var $elem = cj.DOM.byId('preloader');
			if (this.$preloader) this.$preloader.render(options);else if ($elem) this.$preloader = new cj.views.PreloaderView({ el: $elem }, ad).render(options).show();
		}
	}, {
		key: "showSideInfo",
		value: function showSideInfo(options) {
			var $elem = cj.DOM.byId('side-info');
			if (this.$sideInfo) this.$sideInfo.render(options);else if ($elem) this.$sideInfo = new cj.views.SideInfoView({ el: $elem }).render(options).show();
		}
	}, {
		key: "hideSideInfo",
		value: function hideSideInfo() {
			if (this.$sideInfo) {
				this.$sideInfo.hide().destroy();
				this.$sideInfo = null;
			}
		}
	}, {
		key: "hidePreloader",
		value: function hidePreloader() {
			if (this.$preloader) {
				this.$preloader.hide().destroy();
				this.$preloader = null;
			}
		}
	}, {
		key: "render",
		value: function render(model, additional) {
			var _this93 = this;

			this.model = model;
			this.clear();

			this.addHeaders();

			this.updateNavButton(this.prev, K.NAV.PREVIOUS);
			this.updateNavButton(this.next, K.NAV.NEXT);
			this.updateNavButton(this.exit, K.NAV.EXIT_PAGE);
			this.setButtonEvents();

			this.updateClasses();

			this.$el.innerHTML = this.model.content;

			cj.timeout.off().on(function () {
				return _this93.model.skipExitConfirmation || _this93.$exitPopup ? _this93.exitOnTimeout() : _this93.showTimeoutExitConfirmation();
			}).reset(this.model.timeout);
			cj.timeout.clickResetEnabled = true;

			if (this.model.viewClass) {
				(this._currentPage = new cj.views[this.model.viewClass](({
					el: this.$el,
					model: this.model,
					parent: this,
					nextButton: this.next,
					prevButton: this.prev,
					exitButton: this.exit
				}).assign(additional))).hidePreloader().hidePopup().render();
			}
			return this;
		}
	}, {
		key: "exitOnTimeout",
		value: function exitOnTimeout() {
			this.hidePopup();
			clearInterval(this._exitPopupInterval);
			this.changePage(K.NAV.EXIT, { exitType: K.STAT.EXIT.TIMEOUT });
		}
	}, {
		key: "hideExitPopup",
		value: function hideExitPopup() {
			cj.timeout.reset();
			this.$exitPopup.hide().destroy();
			this.$exitPopup = null;
		}
	}, {
		key: "showTimeoutExitConfirmation",
		value: function showTimeoutExitConfirmation() {
			var _this94 = this;

			var el;
			var i = 10;
			if (el = cj.DOM.byId('exit-popup')) {
				this.$exitPopup = new cj.views.PopupView(cj.views.PopupView.messagePopup({
					title: "Выход через <span>" + i + "</span> секунд",
					message: '',
					cssClass: 'warning timeout',
					button: 'Отмена'
				}).assign({ el: el, hide: function hide() {
						return _this94.hidePopup();
					} })).show().render(function () {
					return clearInterval(_this94._exitPopupInterval);
				});
			}
			var varySecondsWord = function varySecondsWord(n) {
				return n === 4 || n === 3 || n === 2 ? 'секунды' : n === 1 ? 'секунду' : 'секунд';
			};
			this._exitPopupInterval = setInterval(function () {
				return --i <= 0 ? _this94.exitOnTimeout() : _this94.$exitPopup.title("Выход через <span>" + i + "</span> " + varySecondsWord(i));
			}, 1000);
		}
	}, {
		key: "showButtonExitConfirmation",
		value: function showButtonExitConfirmation() {
			var _this95 = this;

			var el;
			if (el = cj.DOM.byId('exit-popup')) {
				this.$exitPopup = new cj.views.PopupView(cj.views.PopupView.questionPopup({
					title: 'Вы уверены, что хотите выйти?',
					message: '',
					cssClass: 'warning',
					yes: {
						html: 'Выйти',
						"class": 'regular-button'
					},
					no: {
						html: 'Остаться',
						"class": 'primary-button'
					}
				}).assign({ el: el, hide: function hide() {
						return _this95.hidePopup();
					} })).show().render(function (type) {
					return type === K.STAT.CLICK.BUTTON.POPUP.NO ? null : _this95.changePage(_this95.exit.code());
				});
			}
		}
	}, {
		key: "clear",
		value: function clear() {
			cj.DOM.removeClass(this.$el);
			this.hideSideInfo();
			if (this._currentPage) {
				this._currentPage.destroy();
				this._currentPage.off();
				this._currentPage = null;
			}
			this.$el.innerHTML = '';
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.clear();
			this.next.off().destroy();
			this.prev.off().destroy();
			this.exit.off().destroy();
			if (this.$preloader) this.$preloader.off().destroy();
			this.$el = null;
		}
	}]);

	return AppView;
})();

var App = (function () {
	function App() {
		var _this96 = this;

		_classCallCheck(this, App);

		_fetch.get('../params.json').then(function (data) {
			try {
				var _JSON$parse4 = JSON.parse(data.replace(/\/\/.*/g, ''));

				var version = _JSON$parse4.info['terminal-type'];

				if (cj.maratl.emulator) version = cj.maratl.emulator.version;
				if (version === '19') {
					var css = document.getElementsByTagName('link')[0];
					css.setAttribute('href', css.getAttribute('href').replace('classic', 'light'));
				}
				_this96.terminalVersion = version;
			} catch (e) {}
			return _fetch.get('config/xmlCodes.json');
		}).then(function (data) {
			_this96.xmlCodes = JSON.parse(data.replace(/\/\/.*/g, ''));
			return _fetch.get('config/errorCodes.json');
		}).then(function (data) {
			_this96.errorCodes = JSON.parse(data.replace(/\/\/.*/g, ''));
			return _fetch.get('config/validationCodes.json');
		}).then(function (data) {
			_this96.validationCodes = JSON.parse(data.replace(/\/\/.*/g, ''));
			return _fetch.get('config/config.json');
		}).then(function (data) {
			var config = JSON.parse(data);
			config.pages.forEach(function (item, key, obj) {
				return obj[key].id = key;
			});

			_this96.version = config.version;
			_this96.pageName = '';
			_this96.cache = {};
			_this96.appView = new AppView(function (name, additional) {
				var page;
				if (page = config.pages[name]) {
					_this96.pageName = page.name;
					_this96.getPage(name, page).then(function (model) {
						return _this96.appView.render(model, additional);
					});
					cj.statistics.page(name);
				} else {
					_this96.destroy();
					document.location = name;
				}
			}, config.startPage);
		}, function (reject) {
			cj.maratl.log("Startup fail: " + reject);
			throw new Error();
		});
	}

	_createClass(App, [{
		key: "getPage",
		value: function getPage(name, config) {
			if (this.cache[config.viewClass]) return Promise.resolve(this.cache[config.viewClass]);
			this.cache[config.viewClass] = new Page(({ name: name, config: config }).assign(config));
			return this.cache[config.viewClass].fetch();
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.appView.destroy();
			cj.maratl.off();
			cj.timeout.off();
			document.body.onclick = null;
			document.body.onselectstart = null;
			document.body.onkeyup = null;
		}
	}]);

	return App;
})();

var Page = (function () {
	function Page(options) {
		_classCallCheck(this, Page);

		this[K.NAV.NEXT] = options[K.NAV.NEXT] || K.NAV.NONE;
		this[K.NAV.PREVIOUS] = options[K.NAV.PREVIOUS] || K.NAV.NONE;
		this[K.NAV.EXIT_PAGE] = options[K.NAV.EXIT_PAGE] || K.NAV.EXIT;
		this.assign(options);
	}

	_createClass(Page, [{
		key: "fetch",
		value: function fetch() {
			var _this97 = this;

			return _fetch.get("templates/" + this.viewClass + ".html").then(function (data) {
				_this97.content = data;
				return Promise.resolve(_this97);
			});
		}
	}]);

	return Page;
})();