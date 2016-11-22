/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<9
	// For `typeof node.method` instead of `node.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.9.1",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support, all, a,
		input, select, fragment,
		opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
		checkOn: !!input.value,

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: document.compatMode === "CSS1Compat",

		// Will be defined later
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})();

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, ret,
		internalKey = jQuery.expando,
		getByName = typeof name === "string",

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			elem[ internalKey ] = id = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		cache[ id ] = {};

		// Avoids exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		if ( !isNode ) {
			cache[ id ].toJSON = jQuery.noop;
		}
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( getByName ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var i, l, thisCache,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			for ( i = 0, l = name.length; i < l; i++ ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				// Try to fetch any internally stored data first
				return elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
			}

			this.each(function() {
				jQuery.data( this, key, value );
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		hooks.cur = fn;
		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var ret, hooks, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, notxml, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && notxml && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && notxml && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			// In IE9+, Flash objects don't have .getAttribute (#12945)
			// Support: IE9+
			if ( typeof elem.getAttribute !== core_strundefined ) {
				ret =  elem.getAttribute( name );
			}

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( rboolean.test( name ) ) {
					// Set corresponding property to false for boolean attributes
					// Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
					if ( !getSetAttribute && ruseDefault.test( name ) ) {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					} else {
						elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		var
			// Use .prop to determine if this attribute is understood as boolean
			prop = jQuery.prop( elem, name ),

			// Fetch it accordingly
			attr = typeof prop === "boolean" && elem.getAttribute( name ),
			detail = typeof prop === "boolean" ?

				getSetInput && getSetAttribute ?
					attr != null :
					// oldIE fabricates an empty string for missing boolean attributes
					// and conflates checked/selected into attroperties
					ruseDefault.test( name ) ?
						elem[ jQuery.camelCase( "default-" + name ) ] :
						!!attr :

				// fetch an attribute node for properties not recognized as boolean
				elem.getAttributeNode( name );

		return detail && detail.value !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// fix oldIE value attroperty
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return jQuery.nodeName( elem, "input" ) ?

				// Ignore the value *property* by using defaultValue
				elem.defaultValue :

				ret && ret.specified ? ret.value : undefined;
		},
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ( name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret == null ? undefined : ret;
			}
		});
	});

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		event.isTrigger = true;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur != this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			}
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== document.activeElement && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === document.activeElement && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === core_strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var i,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	hasDuplicate,
	outermostContext,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsXML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,
	sortOrder,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	support = {},
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Array methods
	arr = [],
	pop = arr.pop,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},


	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rsibling = /[\x20\t\r\n\f]*[+~]/,

	rnative = /^[^{]+\{\s*\[native code/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,
	rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
	funescape = function( _, escaped ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		return high !== high ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Use a stripped-down slice if we can't use a native one
try {
	slice.call( preferredDoc.documentElement.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		while ( (elem = this[i++]) ) {
			results.push( elem );
		}
		return results;
	};
}

/**
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {
	return rnative.test( fn + "" );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var cache,
		keys = [];

	return (cache = function( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	});
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return fn( div );
	} catch (e) {
		return false;
	} finally {
		// release memory in IE
		div = null;
	}
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !documentIsXML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getByClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && !rbuggyQSA.test(selector) ) {
			old = true;
			nid = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results, slice.call( newContext.querySelectorAll(
						newSelector
					), 0 ) );
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsXML = isXML( doc );

	// Check if getElementsByTagName("*") returns only elements
	support.tagNameNoComments = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if attributes should be retrieved by attribute nodes
	support.attributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	});

	// Check if getElementsByClassName can be trusted
	support.getByClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	});

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	support.getByName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = doc.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			doc.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			doc.getElementsByName( expando + 0 ).length;
		support.getIdNotName = !doc.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

	// IE6/7 return modified attributes
	Expr.attrHandle = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}) ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		};

	// ID find and filter
	if ( support.getIdNotName ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );

				return m ?
					m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
						[m] :
						undefined :
					[];
			}
		};
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.tagNameNoComments ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Name
	Expr.find["NAME"] = support.getByName && function( tag, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};

	// Class
	Expr.find["CLASS"] = support.getByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && !documentIsXML ) {
			return context.getElementsByClassName( className );
		}
	};

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21),
	// no need to also add to buggyMatches since matches checks buggyQSA
	// A support test would require too much code (would include document ready)
	rbuggyQSA = [ ":focus" ];

	if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE8 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<input type='hidden' i=''/>";
			if ( div.querySelectorAll("[i^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = isNative( (matches = docElem.matchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.webkitMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = new RegExp( rbuggyMatches.join("|") );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		var compare;

		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b )) ) {
			if ( compare & 1 || a.parentNode && a.parentNode.nodeType === 11 ) {
				if ( a === doc || contains( preferredDoc, a ) ) {
					return -1;
				}
				if ( b === doc || contains( preferredDoc, b ) ) {
					return 1;
				}
				return 0;
			}
			return compare & 4 ? -1 : 1;
		}

		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	// Always assume the presence of duplicates if sort doesn't
	// pass them to our comparison function (as in Google Chrome).
	hasDuplicate = false;
	[0, 0].sort( sortOrder );
	support.detectDuplicates = hasDuplicate;

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	// rbuggyQSA always contains :focus, so no need for an existence check
	if ( support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr) ) {
		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	var val;

	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( !documentIsXML ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( documentIsXML || support.attributes ) {
		return elem.getAttribute( name );
	}
	return ( (val = elem.getAttributeNode( name )) || elem.getAttribute( name ) ) && elem[ name ] === true ?
		name :
		val && val.specified ? val.value : null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		i = 1,
		j = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && ( ~b.sourceIndex || MAX_NEGATIVE ) - ( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[4] ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}

			nodeName = nodeName.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifider
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsXML ?
						elem.getAttribute("xml:lang") || elem.getAttribute("lang") :
						elem.lang) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector( tokens.slice( 0, i - 1 ) ).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !documentIsXML &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( runescape, funescape ), context )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		documentIsXML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Easy API for creating new setFilters
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Initialize with the default document
setDocument();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, ret, self,
			len = this.length;

		if ( typeof selector !== "string" ) {
			self = this;
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		ret = [];
		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, this[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = ( this.selector ? this.selector + " " : "" ) + selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true) );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length > 0 ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		var isFunc = jQuery.isFunction( value );

		// Make sure that the elements are removed from the DOM before they are inserted
		// this can help fix replacing a parent with child elements
		if ( !isFunc && typeof value !== "string" ) {
			value = jQuery( value ).not( this ).detach();
		}

		return this.domManip( [ value ], true, function( elem ) {
			var next = this.nextSibling,
				parent = this.parentNode;

			if ( parent ) {
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		});
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, table ? self.html() : undefined );
				}
				self.domManip( args, table, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						node,
						i
					);
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery.ajax({
									url: node.src,
									type: "GET",
									dataType: "script",
									async: false,
									global: false,
									"throws": true
								});
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	var attr = elem.getAttributeNode("type");
	elem.type = ( attr && attr.specified ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== core_strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	}
});
var iframe, getStyles, curCSS,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var len, styles,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		var bool = typeof state === "boolean";

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.hover = function( fnOver, fnOut ) {
	return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
};
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
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
			text: "responseText"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 ) {
					isSuccess = true;
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					isSuccess = true;
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	}
});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {
	var conv2, current, conv, tmp,
		converters = {},
		i = 0,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ];

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, responseHeaders, statusText, responses;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var value, name, index, easing, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/*jshint validthis:true */
	var prop, index, length,
		value, dataShow, toggle,
		tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
				doAnimation.finish = function() {
					anim.stop( true );
				};
				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.cur && hooks.cur.finish ) {
				hooks.cur.finish.call( this );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.documentElement;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.documentElement;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// })();
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );

/*
 * jQuery Format Plugin v1.2
 * http://www.asual.com/jquery/format/
 *
 * Copyright (c) 2009-2011 Rostislav Hristov
 * Uses code by Matt Kruse
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2011-11-24 19:45:33 +0200 (Thu, 24 Nov 2011)
 */
(function ($) {

    $.format = (function () {
        
        var UNDEFINED = 'undefined',
            TRUE = true,
            FALSE = false,
            _locale = {
                date: {
                    format: 'MMM dd, yyyy h:mm:ss a',
                    monthsFull: ['January','February','March','April','May','June','July','August','September','October','November','December'],
                    monthsShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                    daysFull: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                    daysShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
                    shortDateFormat: 'M/d/yyyy h:mm a',
                    longDateFormat: 'EEEE, MMMM dd, yyyy h:mm:ss a'
                },
                number: {
                    format: '#,##0.0#',
                    groupingSeparator: ',',
                    decimalSeparator: '.'
                }
            };
       
        return {
            
            locale: function(value) {
                a = {a: 6};
                if (value) {
                    for (var p in value) {
                        for (var v in value[p]) {
                            _locale[p][v] = value[p][v];
                        }
                    }
                }
                return _locale;
            },
            
            date: function(value, format) {

                var i = 0,
                    j = 0,
                    l = 0,
                    c = '',
                    token = '',
                    x,
                    y;
                
                if (typeof value == 'string') {
                    
                    var getNumber = function (str, p, minlength, maxlength) {
                        for (var x = maxlength; x >= minlength; x--) {
                            var token = str.substring(p, p + x);
                            if (token.length >= minlength && (new RegExp(/^\d+$/)).test(token)) {
                                return token;
                            }
                        }
                        return null;
                    };
                    
                    if (typeof format == UNDEFINED) {
                        format = _locale.date.format;
                    }
                    
                    var _strict = false,
                        pos = 0,
                        now = new Date(),
                        year = now.getYear(),
                        month = now.getMonth() + 1,
                        date = 1,
                        hh = now.getHours(),
                        mm = now.getMinutes(),
                        ss = now.getSeconds(),
                        SSS = now.getMilliseconds(),
                        ampm = '',
                        monthName,
                        dayName;
                    
                    while (i < format.length) {
                        token = '';
                        c = format.charAt(i);
                        while ((format.charAt(i) == c) && (i < format.length)) {
                            token += format.charAt(i++);
                        }
                        if (token.indexOf('MMMM') > - 1 && token.length > 4) {
                            token = 'MMMM';
                        }
                        if (token.indexOf('EEEE') > - 1 && token.length > 4) {
                            token = 'EEEE';
                        }
                        if (token == 'yyyy' || token == 'yy' || token == 'y') {
                            if (token == 'yyyy') { 
                                x = 4; 
                                y = 4;
                            }
                            if (token == 'yy') {
                                x = 2;
                                y = 2;
                            }
                            if (token == 'y') {
                                x = 2;
                                y = 4;
                            }
                            year = getNumber(value, pos, x, y);
                            if (year === null) {
                                return 0;
                            }
                            pos += year.length;
                            if (year.length == 2) {
                                year = parseInt(year, 10);
                                if (year > 70) {
                                    year = 1900 + year;
                                } else {
                                    year = 2000 + year;
                                }
                            }
                        } else if (token == 'MMMM'){
                            month = 0;
                            for (j = 0, l = _locale.date.monthsFull.length; j < l; j++) {
                                monthName = _locale.date.monthsFull[j];
                                if (value.substring(pos, pos + monthName.length).toLowerCase() == monthName.toLowerCase()) {
                                    month = j + 1;
                                    pos += monthName.length;
                                    break;
                                }
                            }
                            if ((month < 1) || (month > 12)){
                                return 0;
                            }
                        } else if (token == 'MMM'){
                            month = 0;
                            for (j = 0, l = _locale.date.monthsShort.length; j < l; j++) {
                                monthName = _locale.date.monthsShort[j];
                                if (value.substring(pos, pos + monthName.length).toLowerCase() == monthName.toLowerCase()) {
                                    month = j + 1;
                                    pos += monthName.length;
                                    break;
                                }
                            }
                            if ((month < 1) || (month > 12)){
                                return 0;
                            }
                        } else if (token == 'EEEE'){
                            for (j = 0, l = _locale.date.daysFull.length; j < l; j++) {
                                dayName = _locale.date.daysFull[j];
                                if (value.substring(pos, pos + dayName.length).toLowerCase() == dayName.toLowerCase()) {
                                    pos += dayName.length;
                                    break;
                                }
                            }        
                        } else if (token == 'EEE'){
                            for (j = 0, l =_locale.date.daysShort.length; j < l; j++) {
                                dayName = _locale.date.daysShort[j];
                                if (value.substring(pos, pos + dayName.length).toLowerCase() == dayName.toLowerCase()) {
                                    pos += dayName.length;
                                    break;
                                }
                            }
                        } else if (token == 'MM' || token == 'M') {
                            month = getNumber(value, pos, _strict ? token.length : 1, 2);
                            if (month === null || (month < 1) || (month > 12)){
                                return 0;
                            }
                            pos += month.length;
                        } else if (token == 'dd' || token == 'd') {
                            date = getNumber(value, pos, _strict ? token.length : 1, 2);
                            if (date === null || (date < 1) || (date > 31)){
                                return 0;
                            }
                            pos += date.length;
                        } else if (token == 'hh' || token == 'h') {
                            hh = getNumber(value, pos, _strict ? token.length : 1, 2);
                            if (hh === null || (hh < 1) || (hh > 12)) {
                                return 0;
                            }
                            pos += hh.length;
                        } else if (token == 'HH' || token == 'H') {
                            hh = getNumber(value, pos, _strict ? token.length : 1, 2);
                            if(hh === null || (hh < 0) || (hh > 23)){
                                return 0;
                            }
                            pos += hh.length;
                        } else if (token == 'KK' || token == 'K') {
                            hh = getNumber(value, pos, _strict ? token.length : 1, 2);
                            if (hh === null || (hh < 0) || (hh > 11)){
                                return 0;
                            }
                            pos += hh.length;
                        } else if (token == 'kk' || token == 'k') {
                            hh = getNumber(value, pos, _strict ? token.length : 1, 2);
                            if (hh === null || (hh < 1) || (hh > 24)){
                                return 0;
                            }
                            pos += hh.length;
                            hh--;
                        } else if (token == 'mm' || token == 'm') {
                            mm = getNumber(value, pos, _strict ? token.length : 1, 2);
                            if (mm === null || (mm < 0) || ( mm > 59)) {
                                return 0;
                            }
                            pos += mm.length;
                        } else if (token == 'ss' || token == 's') {
                            ss = getNumber(value, pos, _strict ? token.length : 1, 2);
                            if (ss === null || (ss < 0) || (ss > 59)){
                                return 0;
                            }
                            pos += ss.length;
                        } else if (token == 'SSS' || token == 'SS' || token == 'S') {
                            SSS = getNumber(value, pos, _strict ? token.length : 1, 3);
                            if (SSS === null || (SSS < 0) || (SSS > 999)){
                                return 0;
                            }
                            pos += SSS.length;
                        } else if (token == 'a') {
                            var ap = value.substring(pos, pos + 2).toLowerCase();
                            if (ap == 'am') {
                                ampm = 'AM';
                            } else if (ap == 'pm') {
                                ampm = 'PM';
                            } else {
                                return 0;
                            }
                            pos += 2;
                        } else {
                            if (token != value.substring(pos, pos + token.length)) {
                                return 0;
                            } else {
                                pos += token.length;
                            }
                        }
                    }
                    if (pos != value.length) {
                        return 0;
                    }
                    if (month == 2) {
                        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
                            if (date > 29) { 
                                return 0;
                            }
                        } else {
                            if (date > 28) {
                                return 0; 
                            } 
                        }
                    }
                    if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
                        if (date > 30) {
                            return 0;
                        }
                    }
                    if (hh < 12 && ampm == 'PM') {
                        hh = hh - 0 + 12;
                    } else if (hh > 11 && ampm == 'AM') {
                        hh -= 12;
                    }
                    
                    return (new Date(year, month - 1, date, hh, mm, ss, SSS));                    
                    
                } else {
                    
                    var formatNumber = function (n, s) {
                        if (typeof s == UNDEFINED || s == 2) {
                          return (n >= 0 && n < 10 ? '0' : '') + n;
                        } else {
                            if (n >= 0 && n < 10) {
                               return '00' + n; 
                            }
                            if (n >= 10 && n <100) {
                               return '0' + n;
                            }
                            return n;
                        }
                    };
                    
                    if (typeof format == UNDEFINED) {
                        format = _locale.date.format;
                    }
                    
                    y = value.getYear();
                    if (y < 1000) {
                        y = String(y + 1900);
                    }
                    
                    var M = value.getMonth() + 1,
                        d = value.getDate(),
                        E = value.getDay(),
                        H = value.getHours(),
                        m = value.getMinutes(),
                        s = value.getSeconds(),
                        S = value.getMilliseconds();

                    value = {
                        y: y,
                        yyyy: y,
                        yy: String(y).substring(2, 4),
                        M: M,
                        MM: formatNumber(M),
                        MMM: _locale.date.monthsShort[M-1],
                        MMMM: _locale.date.monthsFull[M-1],
                        d: d,
                        dd: formatNumber(d),
                        EEE: _locale.date.daysShort[E],
                        EEEE: _locale.date.daysFull[E],
                        H: H,
                        HH: formatNumber(H)
                    };
                    
                    if (H === 0) {
                        value.h = 12;
                    } else if (H > 12) {
                        value.h = H - 12;
                    } else {
                        value.h = H;
                    }
                    
                    value.hh = formatNumber(value.h);
                    value.k = H !== 0 ? H : 24;
                    value.kk = formatNumber(value.k);
                    
                    if (H > 11) {
                        value.K = H - 12;
                    } else {
                        value.K = H;
                    }
                    
                    value.KK = formatNumber(value.K);
                    
                    if (H > 11) {
                        value.a = 'PM';
                    } else {
                        value.a = 'AM';
                    }
                    
                    value.m = m;
                    value.mm = formatNumber(m);
                    value.s = s;
                    value.ss = formatNumber(s);
                    value.S = S;
                    value.SS = formatNumber(S);
                    value.SSS = formatNumber(S, 3);
                
                    var result = '';
                        
                    i = 0;
                    c = '';
                    token = '';
                    s = false;
                    
                    while (i < format.length) {
                        token = '';   
                        c = format.charAt(i);
                        if (c == '\'') {
                            i++;
                            if (format.charAt(i) == c) {
                                result = result + c;
                                i++;
                            } else {
                                s = !s;
                            }
                        } else {
                            while (format.charAt(i) == c) {
                                token += format.charAt(i++);
                            }
                            if (token.indexOf('MMMM') != -1 && token.length > 4) {
                                token = 'MMMM';
                            }
                            if (token.indexOf('EEEE') != -1 && token.length > 4) {
                                token = 'EEEE';
                            }
                            if (typeof value[token] != UNDEFINED && !s) {
                                result = result + value[token];
                            } else {
                                result = result + token;
                            }
                        }
                    }
                    return result;                    
                }
            },
            
            number: function(value, format) {

                var groupingSeparator,
                    groupingIndex,
                    decimalSeparator,
                    decimalIndex,
                    roundFactor,
                    result,
                    i;
                
                if (typeof value == 'string') {
                    
                    groupingSeparator = _locale.number.groupingSeparator;
                    decimalSeparator = _locale.number.decimalSeparator;
                    decimalIndex = value.indexOf(decimalSeparator);
                    
                    roundFactor = 1;
                
                    if (decimalIndex != -1) {
                        roundFactor = Math.pow(10, value.length - decimalIndex - 1);
                    }
                    
                    value = value.replace(new RegExp('[' + groupingSeparator + ']', 'g'), '');
                    value = value.replace(new RegExp('[' + decimalSeparator + ']'), '.');
                    
                    return Math.round(value*roundFactor)/roundFactor;                    
                    
                } else {
                    
                    if (typeof format == UNDEFINED || format.length < 1) {
                        format = _locale.number.format;
                    }
                    
                    groupingSeparator = ',';
                    groupingIndex = format.lastIndexOf(groupingSeparator);
                    decimalSeparator = '.';
                    decimalIndex = format.indexOf(decimalSeparator);
                    
                    var integer = '',
                        fraction = '',
                        negative = value < 0,
                        minFraction = format.substr(decimalIndex + 1).replace(/#/g, '').length,
                        maxFraction = format.substr(decimalIndex + 1).length,
                        powFraction = 10;
                        
                    value = Math.abs(value);
        
                    if (decimalIndex != -1) {
                        fraction = _locale.number.decimalSeparator;
                        if (maxFraction > 0) {
                            roundFactor = 1000;
                            powFraction = Math.pow(powFraction, maxFraction);
                            var tempRound = Math.round(parseInt(value * powFraction * roundFactor - 
                                        Math.round(value) * powFraction * roundFactor, 10) / roundFactor),
                                tempFraction = String(tempRound < 0 ? Math.round(parseInt(value * powFraction * roundFactor - 
                                        parseInt(value, 10) * powFraction * roundFactor, 10) / roundFactor) : tempRound),
                                parts = value.toString().split('.');
                            if (typeof parts[1] != UNDEFINED) {
                                for (i = 0; i < maxFraction; i++) {
                                    if (parts[1].substr(i, 1) == '0' && i < maxFraction - 1 && (tempFraction.length != maxFraction || tempFraction.substr(0, 1) == '0')) {
                                        tempFraction = '0' + tempFraction;
                                    } else {
                                        break;
                                    }
                                }
                            }
                            for (i = 0; i < (maxFraction - fraction.length); i++) {
                                tempFraction += '0';
                            }
                            var symbol, 
                                formattedFraction = '';
                            for (i = 0; i < tempFraction.length; i++) {
                                symbol = tempFraction.substr(i, 1);
                                if (i >= minFraction && symbol == '0' && /^0*$/.test(tempFraction.substr(i+1))) {
                                    break;
                                }
                                formattedFraction += symbol;
                            }
                            fraction += formattedFraction;
                        }
                        if (fraction == _locale.number.decimalSeparator) {
                            fraction = '';
                        }
                    }
                    
                    if (decimalIndex !== 0) {
                        if (fraction != '') {
                            integer = String(parseInt(Math.round(value * powFraction) / powFraction, 10));
                        } else {
                            integer = String(Math.round(value));
                        }
                        var grouping = _locale.number.groupingSeparator,
                            groupingSize = 0;
                        if (groupingIndex != -1) {
                            if (decimalIndex != -1) {
                                groupingSize = decimalIndex - groupingIndex;
                            } else {
                                groupingSize = format.length - groupingIndex;
                            }
                            groupingSize--;
                        }
                        if (groupingSize > 0) {
                            var count = 0, 
                                formattedInteger = '';
                            i = integer.length;
                            while (i--) {
                                if (count !== 0 && count % groupingSize === 0) {
                                    formattedInteger = grouping + formattedInteger;    
                                }
                                formattedInteger = integer.substr(i, 1) + formattedInteger;
                                count++;
                            }
                            integer = formattedInteger;
                        }
                        var maxInteger;
                        if (decimalIndex != -1) {
                            maxInteger = format.substr(0, decimalIndex).replace(new RegExp('#|' + grouping, 'g'), '').length;
                        } else {
                            maxInteger = format.replace(new RegExp('#|' + grouping, 'g'), '').length;                
                        }
                        var tempInteger = integer.length;
                        for (i = tempInteger; i < maxInteger; i++) {
                            integer = '0' + integer;
                        }                
                    }
                    result = integer + fraction;
                    return (negative ? '-' : '') + result;                    
                }
            }
        };        
    })();
   
}(jQuery));
/*
    json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '2.3.0'

!function(root, String){
  'use strict';

  // Defining helper functions.

  var nativeTrim = String.prototype.trim;
  var nativeTrimRight = String.prototype.trimRight;
  var nativeTrimLeft = String.prototype.trimLeft;

  var parseNumber = function(source) { return source * 1 || 0; };

  var strRepeat = function(str, qty){
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  };

  var slice = [].slice;

  var defaultToWhiteSpace = function(characters) {
    if (characters == null)
      return '\\s';
    else if (characters.source)
      return characters.source;
    else
      return '[' + _s.escapeRegExp(characters) + ']';
  };

  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
  };

  var reversedEscapeChars = {};
  for(var key in escapeChars) reversedEscapeChars[escapeChars[key]] = key;
  reversedEscapeChars["'"] = '#39';

  // sprintf() for JavaScript 0.7-beta1
  // http://www.diveintojavascript.com/projects/javascript-sprintf
  //
  // Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
  // All rights reserved.

  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    var str_repeat = strRepeat;

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          } else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
          }
          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw new Error('[_.sprintf] huh?');
                }
              }
            }
            else {
              throw new Error('[_.sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw new Error('[_.sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();



  // Defining underscore.string

  var _s = {

    VERSION: '2.3.0',

    isBlank: function(str){
      if (str == null) str = '';
      return (/^\s*$/).test(str);
    },

    stripTags: function(str){
      if (str == null) return '';
      return String(str).replace(/<\/?[^>]+>/g, '');
    },

    capitalize : function(str){
      str = str == null ? '' : String(str);
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    chop: function(str, step){
      if (str == null) return [];
      str = String(str);
      step = ~~step;
      return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
    },

    clean: function(str){
      return _s.strip(str).replace(/\s+/g, ' ');
    },

    count: function(str, substr){
      if (str == null || substr == null) return 0;

      str = String(str);
      substr = String(substr);

      var count = 0,
        pos = 0,
        length = substr.length;

      while (true) {
        pos = str.indexOf(substr, pos);
        if (pos === -1) break;
        count++;
        pos += length;
      }

      return count;
    },

    chars: function(str) {
      if (str == null) return [];
      return String(str).split('');
    },

    swapCase: function(str) {
      if (str == null) return '';
      return String(str).replace(/\S/g, function(c){
        return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
      });
    },

    escapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; });
    },

    unescapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/\&([^;]+);/g, function(entity, entityCode){
        var match;

        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      });
    },

    escapeRegExp: function(str){
      if (str == null) return '';
      return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    },

    splice: function(str, i, howmany, substr){
      var arr = _s.chars(str);
      arr.splice(~~i, ~~howmany, substr);
      return arr.join('');
    },

    insert: function(str, i, substr){
      return _s.splice(str, i, 0, substr);
    },

    include: function(str, needle){
      if (needle === '') return true;
      if (str == null) return false;
      return String(str).indexOf(needle) !== -1;
    },

    join: function() {
      var args = slice.call(arguments),
        separator = args.shift();

      if (separator == null) separator = '';

      return args.join(separator);
    },

    lines: function(str) {
      if (str == null) return [];
      return String(str).split("\n");
    },

    reverse: function(str){
      return _s.chars(str).reverse().join('');
    },

    startsWith: function(str, starts){
      if (starts === '') return true;
      if (str == null || starts == null) return false;
      str = String(str); starts = String(starts);
      return str.length >= starts.length && str.slice(0, starts.length) === starts;
    },

    endsWith: function(str, ends){
      if (ends === '') return true;
      if (str == null || ends == null) return false;
      str = String(str); ends = String(ends);
      return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
    },

    succ: function(str){
      if (str == null) return '';
      str = String(str);
      return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length-1) + 1);
    },

    titleize: function(str){
      if (str == null) return '';
      return String(str).replace(/(?:^|\s)\S/g, function(c){ return c.toUpperCase(); });
    },

    camelize: function(str){
      return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, c){ return c.toUpperCase(); });
    },

    underscored: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    },

    dasherize: function(str){
      return _s.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    },

    classify: function(str){
      return _s.titleize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, '');
    },

    humanize: function(str){
      return _s.capitalize(_s.underscored(str).replace(/_id$/,'').replace(/_/g, ' '));
    },

    trim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrim) return nativeTrim.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
    },

    ltrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('^' + characters + '+'), '');
    },

    rtrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp(characters + '+$'), '');
    },

    truncate: function(str, length, truncateStr){
      if (str == null) return '';
      str = String(str); truncateStr = truncateStr || '...';
      length = ~~length;
      return str.length > length ? str.slice(0, length) + truncateStr : str;
    },

    /**
     * _s.prune: a more elegant version of truncate
     * prune extra chars, never leaving a half-chopped word.
     * @author github.com/rwz
     */
    prune: function(str, length, pruneStr){
      if (str == null) return '';

      str = String(str); length = ~~length;
      pruneStr = pruneStr != null ? String(pruneStr) : '...';

      if (str.length <= length) return str;

      var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
        template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

      if (template.slice(template.length-2).match(/\w\w/))
        template = template.replace(/\s*\S+$/, '');
      else
        template = _s.rtrim(template.slice(0, template.length-1));

      return (template+pruneStr).length > str.length ? str : str.slice(0, template.length)+pruneStr;
    },

    words: function(str, delimiter) {
      if (_s.isBlank(str)) return [];
      return _s.trim(str, delimiter).split(delimiter || /\s+/);
    },

    pad: function(str, length, padStr, type) {
      str = str == null ? '' : String(str);
      length = ~~length;

      var padlen  = 0;

      if (!padStr)
        padStr = ' ';
      else if (padStr.length > 1)
        padStr = padStr.charAt(0);

      switch(type) {
        case 'right':
          padlen = length - str.length;
          return str + strRepeat(padStr, padlen);
        case 'both':
          padlen = length - str.length;
          return strRepeat(padStr, Math.ceil(padlen/2)) + str
                  + strRepeat(padStr, Math.floor(padlen/2));
        default: // 'left'
          padlen = length - str.length;
          return strRepeat(padStr, padlen) + str;
        }
    },

    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },

    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'right');
    },

    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'both');
    },

    sprintf: sprintf,

    vsprintf: function(fmt, argv){
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },

    toNumber: function(str, decimals) {
      if (!str) return 0;
      str = _s.trim(str);
      if (!str.match(/^-?\d+(?:\.\d+)?$/)) return NaN;
      return parseNumber(parseNumber(str).toFixed(~~decimals));
    },

    numberFormat : function(number, dec, dsep, tsep) {
      if (isNaN(number) || number == null) return '';

      number = number.toFixed(~~dec);
      tsep = typeof tsep == 'string' ? tsep : ',';

      var parts = number.split('.'), fnums = parts[0],
        decimals = parts[1] ? (dsep || '.') + parts[1] : '';

      return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
    },

    strRight: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strRightBack: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.lastIndexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strLeft: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    strLeftBack: function(str, sep){
      if (str == null) return '';
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = str.lastIndexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    toSentence: function(array, separator, lastSeparator, serial) {
      separator = separator || ', '
      lastSeparator = lastSeparator || ' and '
      var a = array.slice(), lastMember = a.pop();

      if (array.length > 2 && serial) lastSeparator = _s.rtrim(separator) + lastSeparator;

      return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
    },

    toSentenceSerial: function() {
      var args = slice.call(arguments);
      args[3] = true;
      return _s.toSentence.apply(_s, args);
    },

    slugify: function(str) {
      if (str == null) return '';

      var from  = "Д…Г ГЎГ¤ГўГЈГҐГ¦Д‡Д™ГЁГ©Г«ГЄГ¬Г­ГЇГ®Е‚Е„ГІГіГ¶ГґГµГёЕ›Г№ГєГјГ»Г±Г§ЕјЕє",
          to    = "aaaaaaaaceeeeeiiiilnoooooosuuuunczz",
          regex = new RegExp(defaultToWhiteSpace(from), 'g');

      str = String(str).toLowerCase().replace(regex, function(c){
        var index = from.indexOf(c);
        return to.charAt(index) || '-';
      });

      return _s.dasherize(str.replace(/[^\w\s-]/g, ''));
    },

    surround: function(str, wrapper) {
      return [wrapper, str, wrapper].join('');
    },

    quote: function(str) {
      return _s.surround(str, '"');
    },

    exports: function() {
      var result = {};

      for (var prop in this) {
        if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse)$/)) continue;
        result[prop] = this[prop];
      }

      return result;
    },

    repeat: function(str, qty, separator){
      if (str == null) return '';

      qty = ~~qty;

      // using faster implementation if separator is not needed;
      if (separator == null) return strRepeat(String(str), qty);

      // this one is about 300x slower in Google Chrome
      for (var repeat = []; qty > 0; repeat[--qty] = str) {}
      return repeat.join(separator);
    },

    naturalCmp: function(str1, str2){
      if (str1 == str2) return 0;
      if (!str1) return -1;
      if (!str2) return 1;

      var cmpRegex = /(\.\d+)|(\d+)|(\D+)/g,
        tokens1 = String(str1).toLowerCase().match(cmpRegex),
        tokens2 = String(str2).toLowerCase().match(cmpRegex),
        count = Math.min(tokens1.length, tokens2.length);

      for(var i = 0; i < count; i++) {
        var a = tokens1[i], b = tokens2[i];

        if (a !== b){
          var num1 = parseInt(a, 10);
          if (!isNaN(num1)){
            var num2 = parseInt(b, 10);
            if (!isNaN(num2) && num1 - num2)
              return num1 - num2;
          }
          return a < b ? -1 : 1;
        }
      }

      if (tokens1.length === tokens2.length)
        return tokens1.length - tokens2.length;

      return str1 < str2 ? -1 : 1;
    },

    levenshtein: function(str1, str2) {
      if (str1 == null && str2 == null) return 0;
      if (str1 == null) return String(str2).length;
      if (str2 == null) return String(str1).length;

      str1 = String(str1); str2 = String(str2);

      var current = [], prev, value;

      for (var i = 0; i <= str2.length; i++)
        for (var j = 0; j <= str1.length; j++) {
          if (i && j)
            if (str1.charAt(j - 1) === str2.charAt(i - 1))
              value = prev;
            else
              value = Math.min(current[j], current[j - 1], prev) + 1;
          else
            value = i + j;

          prev = current[j];
          current[j] = value;
        }

      return current.pop();
    }
  };

  // Aliases

  _s.strip    = _s.trim;
  _s.lstrip   = _s.ltrim;
  _s.rstrip   = _s.rtrim;
  _s.center   = _s.lrpad;
  _s.rjust    = _s.lpad;
  _s.ljust    = _s.rpad;
  _s.contains = _s.include;
  _s.q        = _s.quote;

  // Exporting

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      module.exports = _s;

    exports._s = _s;
  }

  // Register as a named module with AMD.
  if (typeof define === 'function' && define.amd)
    define('underscore.string', [], function(){ return _s; });


  // Integrate with Underscore.js if defined
  // or create our own underscore object.
  root._ = root._ || {};
  root._.string = root._.str = _s;
}(this, String);

//     Backbone.js 0.9.10

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to array methods.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.10';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
    } else if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
    } else {
      return true;
    }
  };

  // Optimized internal dispatch function for triggering events. Tries to
  // keep the usual cases speedy (most Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length;
    switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
    return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
    return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
    return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
    return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind one or more space separated events, or an events map,
    // to a `callback` function. Passing `"all"` will bind the callback to
    // all events fired.
    on: function(name, callback, context) {
      if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
      this._events || (this._events = {});
      var list = this._events[name] || (this._events[name] = []);
      list.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind events to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      this.on(name, once, context);
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var list, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (list = this._events[name]) {
          events = [];
          if (callback || context) {
            for (j = 0, k = list.length; j < k; j++) {
              ev = list[j];
              if ((callback && callback !== ev.callback &&
                               callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                events.push(ev);
              }
            }
          }
          this._events[name] = events;
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // An inversion-of-control version of `on`. Tell *this* object to listen to
    // an event in another object ... keeping track of what it's listening to.
    listenTo: function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      obj.on(name, typeof name === 'object' ? this : callback, this);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return;
      if (obj) {
        obj.off(name, typeof name === 'object' ? this : callback, this);
        if (!name && !callback) delete listeners[obj._listenerId];
      } else {
        if (typeof name === 'object') callback = this;
        for (var id in listeners) {
          listeners[id].off(name, callback, this);
        }
        this._listeners = {};
      }
      return this;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    var attrs = attributes || {};
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options && options.collection) this.collection = options.collection;
    if (options && options.parse) attrs = this.parse(attrs, options) || {};
    if (defaults = _.result(this, 'defaults')) {
      attrs = _.defaults({}, attrs, defaults);
    }
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // ----------------------------------------------------------------------

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = true;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // ---------------------------------------------------------------------

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, success, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // If we're not waiting and attributes exist, save acts as `set(attr).save(null, opts)`.
      if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;

      options = _.extend({validate: true}, options);

      // Do not persist invalid models.
      if (!this._validate(attrs, options)) return false;

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      success = options.success;
      options.success = function(model, resp, options) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
      };

      // Finish configuring and sending the Ajax request.
      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(model, resp, options) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
      };

      if (this.isNew()) {
        options.success(this, null, options);
        return false;
      }

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return !this.validate || !this.validate(this.attributes, options);
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire a general
    // `"error"` event and call the error callback, if specified.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, options || {});
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this.models = [];
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, model, attrs, existing, doSort, add, at, sort, sortAttr;
      add = [];
      at = options.at;
      sort = this.comparator && (at == null) && options.sort != false;
      sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        if (!(model = this._prepareModel(attrs = models[i], options))) {
          this.trigger('invalid', this, attrs, options);
          continue;
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(model)) {
          if (options.merge) {
            existing.set(attrs === model ? model.attributes : attrs, options);
            if (sort && !doSort && existing.hasChanged(sortAttr)) doSort = true;
          }
          continue;
        }

        // This is a new model, push it to the `add` list.
        add.push(model);

        // Listen to added models' events, and index models for lookup by
        // `id` and by `cid`.
        model.on('all', this._onModelEvent, this);
        this._byId[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (add.length) {
        if (sort) doSort = true;
        this.length += add.length;
        if (at != null) {
          splice.apply(this.models, [at, 0].concat(add));
        } else {
          push.apply(this.models, add);
        }
      }

      // Silently sort the collection if appropriate.
      if (doSort) this.sort({silent: true});

      if (options.silent) return this;

      // Trigger `add` events.
      for (i = 0, l = add.length; i < l; i++) {
        (model = add[i]).trigger('add', model, this, options);
      }

      // Trigger `sort` if the collection was sorted.
      if (doSort) this.trigger('sort', this, options);

      return this;
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: this.length}, options));
      return model;
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function(begin, end) {
      return this.models.slice(begin, end);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      this._idAttr || (this._idAttr = this.model.prototype.idAttribute);
      return this._byId[obj.id || obj.cid || obj[this._idAttr] || obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of `filter`.
    where: function(attrs) {
      if (_.isEmpty(attrs)) return [];
      return this.filter(function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) {
        throw new Error('Cannot sort a set without a comparator');
      }
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Smartly update a collection with a change set of models, adding,
    // removing, and merging as necessary.
    update: function(models, options) {
      options = _.extend({add: true, merge: true, remove: true}, options);
      if (options.parse) models = this.parse(models, options);
      var model, i, l, existing;
      var add = [], remove = [], modelMap = {};

      // Allow a single model (or no argument) to be passed.
      if (!_.isArray(models)) models = models ? [models] : [];

      // Proxy to `add` for this case, no need to iterate...
      if (options.add && !options.remove) return this.add(models, options);

      // Determine which models to add and merge, and which to remove.
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i];
        existing = this.get(model);
        if (options.remove && existing) modelMap[existing.cid] = true;
        if ((options.add && !existing) || (options.merge && existing)) {
          add.push(model);
        }
      }
      if (options.remove) {
        for (i = 0, l = this.models.length; i < l; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) remove.push(model);
        }
      }

      // Remove models (if applicable) before we add and merge the rest.
      if (remove.length) this.remove(remove, options);
      if (add.length) this.add(add, options);
      return this;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      options || (options = {});
      if (options.parse) models = this.parse(models, options);
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models.slice();
      this._reset();
      if (models) this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `update: true` is passed, the response
    // data will be passed through the `update` method instead of `reset`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      options.success = function(collection, resp, options) {
        var method = options.update ? 'update' : 'reset';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function() {
      this.length = 0;
      this.models.length = 0;
      this._byId  = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options || (options = {});
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model._validate(attrs, options)) return false;
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    },

    sortedIndex: function (model, value, context) {
      value || (value = this.comparator);
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _.sortedIndex(this.models, model, iterator, context);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf',
    'isEmpty', 'chain'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        this.trigger('route', name, args);
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional){
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        this.location.replace(this.root + this.location.search + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      fragment = this.getFragment(fragment || '');
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      var url = this.root + fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Method "' + events[key] + '" does not exist');
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, _.result(this, 'options'), options);
      _.extend(this, _.pick(options, viewOptions));
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    var success = options.success;
    options.success = function(resp) {
      if (success) success(model, resp, options);
      model.trigger('sync', model, resp, options);
    };

    var error = options.error;
    options.error = function(xhr) {
      if (error) error(model, xhr, options);
      model.trigger('error', model, xhr, options);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);

var cj = {};

cj.VERSION = "coreJS v.0.2.0";
cj.TEST_MODE = false;

cj.events = {
	global_click: 'click:body',
	change: 'change'
};

cj.loadContent = function (container, contentPath, callback) {
	container.load(contentPath, callback)
};

cj.stopSelect = function () {
	window.event.cancelBubble = true;
	window.event.returnValue = false;
	return false;
};

cj.bodyClick = function () {
	if (this.trigger)
		this.trigger(cj.events.global_click);
};

cj.getObjectsByPropertyValue = function (obj, key, val) {
	var objects = [];
	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) continue;
		if (typeof obj[i] == 'object') {
			objects = objects.concat(cj.getObjectsByPropertyValue(obj[i], key, val));
		} else if (i == key && obj[key] == val) {
			objects.push(obj);
		}
	}
	return objects;
};

cj.getFirstObjectByPropertyValue = function (obj, key, val) {
	return cj.getObjectsByPropertyValue(obj, key, val)[0];
};

cj.round2 = function (num) {
	return Math.round(num * 100) / 100;
}

cj.printObject = function (obj) {
	var output = '';
	for (var property in obj) {
		if (typeof obj[property] != 'function')
			output += property + ': ' + obj[property] + '; ';
	}
	return output;
}

if (window._ && window.Backbone)
	_.extend(cj, Backbone.Events);

$.format.locale({number: {groupingSeparator: ' '}});
/*!
 * Cross-Browser Split 1.1.1
 */

var split;

// Avoid running twice; that would break the `nativeSplit` reference
split = split || function (undef) {

	var nativeSplit = String.prototype.split,
		compliantExecNpcg = /()??/.exec("")[1] === undef, // NPCG: nonparticipating capturing group
		self;

	self = function (str, separator, limit) {
		// If `separator` is not a regex, use `nativeSplit`
		if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
			return nativeSplit.call(str, separator, limit);
		}
		var output = [],
			flags = (separator.ignoreCase ? "i" : "") +
				(separator.multiline ? "m" : "") +
				(separator.extended ? "x" : "") + // Proposed for ES6
				(separator.sticky ? "y" : ""), // Firefox 3+
			lastLastIndex = 0,
		// Make `global` and avoid `lastIndex` issues by working with a copy
			separator = new RegExp(separator.source, flags + "g"),
			separator2, match, lastIndex, lastLength;
		str += ""; // Type-convert
		if (!compliantExecNpcg) {
			// Doesn't need flags gy, but they don't hurt
			separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
		}
		/* Values for `limit`, per the spec:
		 * If undefined: 4294967295 // Math.pow(2, 32) - 1
		 * If 0, Infinity, or NaN: 0
		 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
		 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
		 * If other: Type-convert, then use the above rules
		 */
		limit = limit === undef ?
			-1 >>> 0 : // Math.pow(2, 32) - 1
			limit >>> 0; // ToUint32(limit)
		while (match = separator.exec(str)) {
			// `separator.lastIndex` is not reliable cross-browser
			lastIndex = match.index + match[0].length;
			if (lastIndex > lastLastIndex) {
				output.push(str.slice(lastLastIndex, match.index));
				// Fix browsers whose `exec` methods don't consistently return `undefined` for
				// nonparticipating capturing groups
				if (!compliantExecNpcg && match.length > 1) {
					match[0].replace(separator2, function () {
						for (var i = 1; i < arguments.length - 2; i++) {
							if (arguments[i] === undef) {
								match[i] = undef;
							}
						}
					});
				}
				if (match.length > 1 && match.index < str.length) {
					Array.prototype.push.apply(output, match.slice(1));
				}
				lastLength = match[0].length;
				lastLastIndex = lastIndex;
				if (output.length >= limit) {
					break;
				}
			}
			if (separator.lastIndex === match.index) {
				separator.lastIndex++; // Avoid an infinite loop
			}
		}
		if (lastLastIndex === str.length) {
			if (lastLength || !separator.test("")) {
				output.push("");
			}
		} else {
			output.push(str.slice(lastLastIndex));
		}
		return output.length > limit ? output.slice(0, limit) : output;
	};

	// For convenience
	String.prototype.split = function (separator, limit) {
		return self(this, separator, limit);
	};

	return self;

}();




// commission utils
cj.commission = {};

cj.commission.CommissionUtils = {
	getCommisSumm: function (value, profiles) {

		if (!profiles || isNaN(value) || (value == 0)) {
			return 0;
		}

		for (var i = 0; i < profiles.length; i++) {
			var profile = profiles[i];

			if ((isNaN(profile.from) || value >= profile.from) && (isNaN(profile.to) || value <= profile.to)) {
				var tempSum = isNaN(profile.percent) ? 0 : (value * (profile.percent / 100));

				if (!isNaN(profile.fix)) {
					tempSum += profile.fix
				}
				if (!isNaN(profile.min) && (tempSum < profile.min) && (profile.min > 0)) {
					return profile.min
				}
				if (!isNaN(profile.max) && (tempSum > profile.max) && (profile.max > 0)) {
					return profile.max
				}
				return tempSum
			}
		}
		return 0
	},
	commissionSumCalcReverse: function (summ, comissionProf) {
		for (var i = 0; i < comissionProf.length; i++) {

			var profile = comissionProf[i];
			var from = profile.from;
			var to = profile.to;

			//Если не задан начальный порог, определяем его
			if (isNaN(from)) {
				from = 0;
			}
			//Если не задан конечный порог, определяем его
			if (isNaN(to)) {
				to = Number.MAX_VALUE;
			}

			var commission;

			if (isNaN(profile.percent)) {
				commission = 0;
			}
			else {
				//Рассчёт комиссии
				commission = (summ * profile.percent / 100) / (1 - profile.percent / 100);
			}

			//Прибавление фиксированной суммы
			if (!isNaN(profile.fix)) {
				commission += profile.fix;
			}

			//Минимальное значение комиссии
			if (!isNaN(profile.min) && commission < profile.min) {
				commission = profile.min;
			}

			//Максимальное значение комиссии
			if (!isNaN(profile.max) && commission > profile.max) {
				commission = profile.max;
			}

			var summAndCommission = summ + commission;
			//Если вычисленное значение суммы с комиссией входит в нужный диапазон – возвращаем комиссию
			if ((summAndCommission >= from) && (summAndCommission <= to)) {
				return commission;
			}

		}
		return 0;
	},
	convert: function (obj) {
		var result = {};
		if (!obj) {
			return result
		}

		if (obj.max_commission) {
			result.max = Number(obj.max_commission)
		}
		if (obj.min_commission) {
			result.min = Number(obj.min_commission)
		}
		if (obj.fix_commission) {
			result.fix = Number(obj.fix_commission)
		}
		if (obj.commission) {
			result.percent = Number(obj.commission)
		}
		if (obj.commision) {
			result.percent = Number(obj.commision)
		}
		return result
	}
};

cj.commission.ComissionProfile = function (from, to, percent, min, max, fix, isDefaultProfile) {
	this.isDefaultProfile = !!isDefaultProfile;
	this.from = from;
	this.to = to;
	this.percent = percent;
	this.min = min;
	this.max = max;
	this.fix = fix;

	this.goodFor = function (sum) {
		return sum >= this.from && sum <= this.to;
	};

	this.countCommis = function (toSum) {
		if (this.goodFor(toSum)) {
			var s = 0;
			if (!isNaN(this.percent)) s = toSum * this.percent / 100;
			if (!isNaN(this.fix)) s += this.fix;
			if (!isNaN(this.min) && s < this.min) s = this.min;
			if (!isNaN(this.max) && s > this.max) s = this.max;
			return s;
		}
		return 0;
	};

	this.hasMin = function () {
		return this.min;
	};

	this.hasMax = function () {
		return this.max;
	};

	this.hasFix = function () {
		return this.fix;
	};

	this.hasMinOrMax = function () {
		return this.hasMax() || this.hasMin();
	};

	this.hasMinAndMax = function () {
		return this.hasMin() && this.hasMax()
	};

	this.hasPercent = function () {
		return this.percent;
	};

	this.isZero = function () {
		return !(this.percent || this.fix);
	};

	this.fromOrZero = function () {
		return this.from ? this.from : 0;
	};

	this.getToOrMaxSum = function (maxSum) {
		return this.to ? this.to : maxSum;
	}
};

cj.commission.ComissionInfo = function () {
	this.stringFactory = new cj.commission.CommStringFactory();
	this.humanReadableProfilesLines = function () {
		var self = this;
		return _.map(this.profiles, function (itm /*ComissionProfile*/) {
			return self.stringFactory.make(itm).join(": ");
		});
	};

	this.profilesAndCommissions = function () {
		var self = this;
		return _.map(this.profiles, function (itm /*ComissionProfile*/) {
			return self.stringFactory.make(itm);
		});
	};

	this.humanReadableProfilesString = function () {
		return this.humanReadableProfilesLines.join("\n");
	};
};

cj.commission.CommStringFactory = function () {
	this.MAX_SUM = 14999;
	this.currency = 'руб.';
	this.make = function (prof) {
		var res = ["", ""];
		if (prof.isDefaultProfile) {
			res[0] = "комиссия по умолчанию";
			res[1] = prof.percent + " %";
		} else {
			res[0] = 'от ' + prof.fromOrZero() + ' до ' + prof.getToOrMaxSum(this.MAX_SUM) + ' ' + this.currency;

			if (prof.isZero())
				res[1] = '0 %';
			else if (prof.percent) {
				res[1] = prof.percent + ' %';
				if (prof.hasFix())
					res[1] += ' + ' + prof.fix + ' ' + this.currency;
			}
			else
				res[1] = prof.fix + ' ' + this.currency;
			if (prof.hasMinOrMax())
				res[1] += ', но ';
			if (prof.hasMin())
				res[1] += 'не меньше ' + prof.min + ' ' + this.currency;
			if (prof.hasMinAndMax())
				res[1] += ', и ';
			if (prof.hasMax())
				res[1] += 'не больше ' + prof.max + ' ' + this.currency;
		}
		return res;
	}
};

cj.commission.CommissionProfilesParser = {

	parseCurrentProfile: function (cms/*XML*/) {
		var res; //ComissionProfile;
		if (cms.getElementsByTagName("profile").length)
			res = this.getProf(cms.getElementsByTagName("profile")[0]);
		else if (cms.getElementsByTagName("def").length)
			res = new cj.commission.ComissionProfile(
				0,
				Number.POSITIVE_INFINITY,
				Number(cms.getElementsByTagName("def")[0].toString()),
				Number.NaN,
				Number.NaN,
				Number.NaN,
				true);
		return res;
	},

	getProf: function (itm /*XML*/) {// ComissionProfile
		return new cj.commission.ComissionProfile(
			this.getValueOrNaN(itm.getAttribute("from")),
			this.getValueOrNaN(itm.getAttribute("to")),
			this.getValueOrNaN(itm.getAttribute("percent")),
			this.getValueOrNaN(itm.getAttribute("min")),
			this.getValueOrNaN(itm.getAttribute("max")),
			this.getValueOrNaN(itm.getAttribute("fix"))
		);
	},

	parse: function (cms /*XML*/) {//ComissionInfo
		var _comProf = [];
		var fix = Number.NaN;
		var cInfo = new cj.commission.ComissionInfo();
		cInfo.prvId = cms.getAttribute("id").toString();
		for (var i = 0; i < cms.childNodes.length; i++) {
			var itm = cms.childNodes[i];
			switch (itm.nodeName.toString()) {
				case "def":
					fix = Number(itm.childNodes[0].nodeValue);
					break;
				case "profile":
					_comProf.push(this.getProf(itm));
					break;
			}
		}

		if (!isNaN(fix) || _comProf.length == 0)
			_comProf.push(
				new cj.commission.ComissionProfile(
					0,
					Number.POSITIVE_INFINITY,
					isNaN(fix) ? 0 : fix,
					Number.NaN,
					Number.NaN,
					Number.NaN,
					true
				)
			);
		cInfo.profiles = _comProf;
		return cInfo;
	},

	getValueOrNaN: function (x/*String*/) {//Number
		if (x)
			return x.length ? Number(x) : Number.NaN;
		return  Number.NaN
	}
};
cj.log = {};

cj.LOG_ENABLED = false;
cj.log.isVisible = false;

cj.log.$log = jQuery("#log");

cj.log.show = function () {
	cj.log.$log.css("display", "block");
	cj.log.isVisible = true;
};
cj.log.hide = function () {
	cj.log.$log.css("display", "none");
	cj.log.isVisible = false;
};

cj.log.init = function () {
	$(document.body).attr('tabIndex', 1).on('keyup', function (e) {
		if (e.keyCode.toString() == "76") { //log
			cj.log.isVisible ? cj.log.hide() : cj.log.show();
		}
		if (e.keyCode.toString() == "67") { //clear
			cj.log.clear();
		}
	});
};

cj.log.l = function (text) {
	if (cj.LOG_ENABLED) {
		this.$log.prepend(text + "<br/>");
	}
};
cj.log.clear = function () {
	this.$log.text('')
};
/**
 * Public API
 * cj.session.set("name", "value", isGlobal=false)
 * cj.session.get("name", isGlobal=false)
 * cj.session.remove("name", isGlobal=false)
 */
cj.USE_JS_SESSION = false;

cj.session = {

	js_session:{},

	isNoU:function (value) {
		return (value == undefined || value == null);
	},

	sizeOf:function (obj) {
		var counter = 0;
		if (!this.isNoU(obj)) {
			for (var f in obj) {
				if (obj.hasOwnProperty(f)) {
					counter++;
				}
			}
		}
		return counter;
	},


	isString:function (o) {
		return $.type(o) === "string"
	},

	serialize:function (o) {
		var sResult = "";
		switch ($.type(o)) {
			case "array":
				sResult = "["
				for (var i = 0; i < o.length; i++) {
					sResult += this.serialize(o[i]) + ",";
				}
				if (sResult.length > 1) {
					sResult = sResult.substr(0, sResult.length - 1);
				}
				sResult += "]";
				return sResult;
				break;
			case "string":
				return "\"" + o.replace(/\\/g, "\\\\").replace(new RegExp("\"", "g"), "\\\"") + "\"";
				break;
			case "number":
			case "boolean":
				return o.toString();
				break;
			case "date":
				return "new Date(\"" + o.toString() + "\")";
				break;
			default:
				sResult = "{";

				for (var field in o) {
					if (o.hasOwnProperty(field) && o[field] &&
						o != this[field] && !($.type(o[field]) === "function")) {
						sResult += "\"" + field + "\" : " + this.serialize(o[field]) + ",";
					}
				}
				if (sResult.length > 1) {
					sResult = sResult.substr(0, sResult.length - 1);
				}

				sResult += "}";
				return sResult;
				break;
		}
	},

	deserialize:function (sSerializedObj) {
		if (this.isNoU(sSerializedObj) ||
			!(this.isString(sSerializedObj) &&
				sSerializedObj.length)) {
			return null;
		}
		var o = null;
		try {
			eval("o = (" + sSerializedObj + ")");
		}
		catch (e) {
			return null;
		}
		return o;
	},

	set:function (sName, sValue) {

		if (!this.isNoU(sName) && this.isString(sName)) {
			if (cj.USE_JS_SESSION) {
				this.js_session[escape(sName)] = sValue;
				return
			}

			if (this.isNoU(sValue) || !this.isString(sValue)) {
				sValue = "null";
			}
			var oStorage = this.deserialize(window.name);
			if (this.isNoU(oStorage)) {
				oStorage = {};
			}
			oStorage[escape(sName)] = sValue;
			window.name = this.serialize(oStorage);
		}
	},

	remove:function (sName) {
		if (cj.USE_JS_SESSION && !this.isNoU(sName) && this.isString(sName)) {
			delete this.js_session[escape(sName)];
			return
		}
		var oStorage = this.deserialize(window.name);
		if (!this.isNoU(oStorage)) {
			if (!this.isNoU(sName) && this.isString(sName)) {
				delete oStorage[escape(sName)];
				if (this.sizeOf(oStorage)) {
					window.name = this.serialize(oStorage);
				}
				else {
					window.name = "";
				}
			}
		}
	},

	get:function (sName) {
		if (cj.USE_JS_SESSION && !this.isNoU(sName) && this.isString(sName)) {
			return this.js_session[escape(sName)];
		}
		var sResult = null;
		var oStorage = this.deserialize(window.name);
		if (!this.isNoU(oStorage)) {
			if (!this.isNoU(sName) && this.isString(sName)) {
				sName = escape(sName);
				if (!this.isNoU(oStorage[sName]) && this.isString(oStorage[sName])) {
					sResult = oStorage[sName];
				}
			}
		}
		return sResult;
	},

	clear:function () {
		this.js_session = {};
		window.name = "";
	},

	show:function () {
		var sResult = "Session info:\n\n";
		if (cj.USE_JS_SESSION) {
			for (var f in this.js_session) {
				if (this.js_session.hasOwnProperty(f)) {
					sResult += f + ": " + this.js_session[f] + "\n\n";
				}
			}
		} else {
			var oStorage = this.deserialize(window.name);
			if (!this.isNoU(oStorage)) {
				for (var f in oStorage) {
					if (oStorage.hasOwnProperty(f)) {
						sResult += f + ": " + oStorage[f] + "\n\n";
					}
				}
			}
		}
		alert(sResult);
	}
};

if (window.waitsForSession) {
	for (var i = 0; i < window.waitsForSession.length; i++) {
		cj.session.set(window.waitsForSession[i].key, window.waitsForSession[i].value)
	}
}


cj.maratl = {
	TEST_MODE_ON: function () { //stub
	},
	onResponse: function (key, value) {
		cj.log.l(_.escape(key + "=" + value + " <--"));
		this.trigger(cj.maratl.events.response, key, value);
	},
	send: function (key, value) {
		cj.log.l(_.escape("--> " + key + "=" + value));

		if (cj.maratl.TEST_MODE)
			cj.maratl.emulator.processCommand(key, value);
		else
			terminal.processCommand(key, value);
	},
	log: function (text) {
		cj.maratl.send("WriteToLog", text);
	},

	sendRequest: function (request) {
		this.send('JSONCommands', this._stringify(request))
	},

	/**
	 * РЎРїР»РёС‚РёС‚ РѕР±СЉРµРєС‚ РІ СЃС‚СЂРѕРєСѓ
	 * @param  {Object} object РћР±СЉРµРєС‚ СЃ РєРѕРјР°РЅРґР°РјРё
	 * @return {String}        РЎС‚СЂРѕРєР° РґР»СЏ РїРµСЂРµРґР°С‡Рё РІ maratl
	 */
	_stringify: function (object) {
		// TODO: РќР°Р№С‚Рё Р±РѕР»РµРµ РёР·СЏС‰РЅС‹Рµ РјРµС‚РѕРґС‹
		var result = ''
		var commands = object.split("&");
		for (var i = 0; i < commands.length; i++) {
			var command = commands[i].split("=")
			var key = command[0].replace(/"/g, "'");
			var value = command[1].replace(/"/g, "'");
			result += '"' + key + '":"' + value + '"';
			if (i < commands.length - 1) {
				result += ',';
			}
		}
		return '{' + result + '}';
	},

	events: {
		response: 'response'
	},

	secureLog: function (unsecureText, replacement) {
		this.send("WriteToLog", cj.SECURE_MARATL_LOGGING ? replacement : unsecureText);
	}
};
_.extend(cj.maratl, Backbone.Events);


if (window.waitsForMaratl) {
	for (var i = 0; i < window.waitsForMaratl.length; i++) {
		cj.maratl.onResponse(window.waitsForMaratl[i].key, window.waitsForMaratl[i].value)
	}
}

cj.statistics = {
	enterTime:null,
	_phone:"",
	_sum:"",

	init:function () {
		var t = cj.session.get("startUpTime");
		if (!t || t == "null") {
			this.enterTime = new Date().getTime();
			cj.session.set("startUpTime", this.enterTime.toString())
		} else {
			this.enterTime = Number(t)
		}

		this.value = cj.session.get("statistics") || "";
	},

	append:function (eventCode) {
		if (!eventCode)
			return;
		var currentTime = new Date().getTime();
		var millisSinceStartUp = Math.floor((currentTime - this.enterTime) / 1000);
		if (this.value == "") {
			this.value += eventCode + ":" + millisSinceStartUp.toString(32);
		} else {
			this.value += "|" + eventCode + ":" + millisSinceStartUp.toString(32);
		}
		cj.session.set("statistics", this.value)
	},

	phone:function (val) {
		if (val)
			this._phone = val;
		return this._phone
	},

	sum:function (val) {
		if (val)
			this._sum = val;
		return this._sum
	}
};
cj.statistics.init();


cj.timeout = {
	_current: -1,
	DEFAULT_TIMEOUT: 180000,
	clickResetEnabled: true,
	events: {
		timeout: 'timeout'
	},
	reset: function (time) {
		cj.timeout.turnOff();

		var t = (Number(time) || cj.timeout.DEFAULT_TIMEOUT);
		cj.timeout._current = setTimeout(function () {
			cj.timeout.trigger(cj.timeout.events.timeout);
		}, t);
	},
	turnOff: function () {
		if (!(cj.timeout._current == -1)) {
			clearTimeout(cj.timeout._current);
		}
	}
};
cj.on(cj.events.global_click, function () {
	if (cj.timeout.clickResetEnabled)
		cj.timeout.reset()
});

_.extend(cj.timeout, Backbone.Events);

//dependency: jQuery;
cj.phoneCapacity = {
	_u:"",
	_uE:"",
	_loaded:false,
	_error:false,

	_data:null,

	load:function (url, urlError) {
		var self = this;
		this._u = url || "../phones.txt";
		this._uE = urlError || "../phones_er.txt";
		$.ajax(
			{
				url:this._u,
				dataType:'text',
				data:{},
				success:function (data) {
					self.parse(data);
					self._loaded = true;
				},
				error:function () {
					self.loadError()
				}
			}
		)
	},

	loadError:function () {
		var self = this;
		$.ajax(
			{
				url:this._uE,
				dataType:'text',
				data:{},
				success:function (data) {
					self.parse(data);
					self._loaded = true;
				},
				error:function () {
					self._error = true;
				}
			}
		)
	},

	parse:function (data) {
		this._data = _.map(_.filter(data.split("|"), function (str) {
			return str.length > 0;
		}), function (str) {
			return _.map(str.split(","), function (str) {
				return Number(str)
			});
		})
	},

	prvId:function (phone) {
		for (var i = 0; i < this._data.length; i++) {
			var p = this._data[i];
			if (p[0] <= phone && p[1] >= phone)
				return p[2];
		}
		return -1;
	}
};

cj.phoneCapacity.load();
cj.views = {
	mixins:{},
	events:{
		action:"action",
		popup:"popup",
		preloader:"preloader",
		click:"click"
	}
};


cj.maratl.codes = {};

(function (c) {
	//responses
	c.PrtStatus = "PrtStatus";
	c.TermID = "TermID";
	c.StartParam = "StartParam";
	c.Balance = "Balance";
	c.PrvAllow = "PrvAllow";
	c.PrvDenied = "PrvDenied";
	c.ValOn = "ValOn";
	c.MinCash = "MinCash";
	c.MinCashResult = "MinCashResult";
	c.MaxCash = "MaxCash";
	c.ValOff = "ValOff";
	c.ValTimeout = "ValTimeout";
	c.ValAlert = "ValAlert";
	c.PaySumm = "PaySumm";
	c.PaySumm2 = "PaySumm2";
	c.CashSumm = "CashSumm";
	c.CommProfileLine = "CommProfileLine";
	c.CommProfileLine2 = "CommProfileLine2";
	c.CommisSumm = "CommisSumm";
	c.CommisSumm2 = "CommisSumm2";
	c.FiscalReceipt = "FiscalReceipt";
	c.PaySuccess = "PaySuccess";

	//requests
	c.GetTermID = "GetTermID";
	c.GetBalance = "GetBalance";
	c.GetCommis = "GetCommis";
	c.GetStartParam = "GetStartParam";
	c.GetPrtStatus = "GetPrtStatus"
	c.Validator = "Validator"
	c.CreatePay = "CreatePay"

})(cj.maratl.codes);

cj.maratl.payments = {};

cj.maratl.payments.PaymentBase = Backbone.Model.extend({

	_valOnProperties: null,
	_valAlertProperties: null,
	_collectingValOn: false,
	_collectingValAlert: false,

	isValidatorOn: false,

	defaults: {
	},

	initialize: function (payment_options) {
		for (var key in payment_options) {
			if (payment_options[key].value) {
				this.set(key, payment_options[key].value)
			}
			else if (payment_options[key].key) {
				this.set(key, cj.session.get(payment_options[key].key))
			}
		}
	},

	destroy: function () {
		cj.maratl.off(cj.maratl.events.response, this.onMaratlResponse, this)
	},

	startCollectingValOn: function () {
		this._collectingValOn = true;
		this._valOnProperties = {};
	},

	stopCollectingValOn: function () {
		this._collectingValOn = false;
		this.trigger('validator:on', this._valOnProperties);
	},

	startCollectingValAlert: function () {
		this._collectingValAlert = true;
		this._valAlertProperties = {};
		_.delay(this.stopCollectingValAlert, 1000, this)
	},
	stopCollectingValAlert: function (self) {
		self._collectingValAlert = false;
		self.trigger('validator:alert', self._valAlertProperties);
	},

	onMaratlResponse: function (key, value) {
		var c = cj.maratl.codes;
		switch (key) {
			case c.ValOn:
				this.isValidatorOn = true;
			case c.MinCash:
			case c.MaxCash:
				if (!this._collectingValOn)
					this.startCollectingValOn();
				this._valOnProperties[key] = value;
				if (_.size(this._valOnProperties) >= 3) {
					this.stopCollectingValOn();
				}
				return true;
			case c.ValOff:
				if (value == "true")
					this.isValidatorOn = false;
				this.trigger('validator:off', {ValOff: value});
				return;
			case c.ValTimeout:
				this.trigger('validator:timeout', {ValTimeout: value});
				return;
			case c.MinCashResult:
				this.trigger('validator:min_cash_result', {MinCashResult: value});
				return;
			case c.ValAlert:
			case c.PaySumm:
			case c.PaySumm2:
			case c.CashSumm:
			case c.CommProfileLine:
			case c.CommProfileLine2:
			case c.CommisSumm:
			case c.CommisSumm2:
				if (!this._collectingValAlert)
					this.startCollectingValAlert();
				this._valAlertProperties[key] = value;
				return true;
			case c.FiscalReceipt:
				this.trigger('receipt', {FiscalReceipt: value});
				return true;
			case c.PaySuccess:
				this.trigger('paysuccess', {PaySuccess: value});
				return true;
		}
	},
	start: function (additionalParams) {

		cj.maratl.on(cj.maratl.events.response, this.onMaratlResponse, this);
		cj.log.l("-----------subscription");

		var req = this.request(additionalParams);
		cj.maratl.sendRequest(req);
		_.delay(this.turnValidatorOn, 500);
	},


	sendExtras: function (additionalParams) {
		var req = this.prepareParams(additionalParams);
		cj.maratl.sendRequest(req);
	},

	turnValidatorOn: function () {
		cj.maratl.send(cj.maratl.codes.Validator, "on")
	},
	turnValidatorOff: function () {
		cj.maratl.send(cj.maratl.codes.Validator, "off")
	},
	createPay: function () {
		cj.maratl.send(cj.maratl.codes.CreatePay, "true")
	},
	prepareParams: function (obj) {
		var k = []
		for (var key in obj) {
			k.push(key + "=" + obj[key]);
		}
		return k.join("&");
	}
});

cj.maratl.payments.OneProvider = cj.maratl.payments.PaymentBase.extend({

	request: function (additionalParams) {
		return "AccNum=" + this.get("AccNum") +
			"&PrvId=" + this.get("PrvId") +
			"&PrvName=" + this.get("PrvName") +
			"&GetMinCash=" + this.get("MinCashLimit") +
			"&_extra_ev_scode=" + this.get("_extra_ev_scode") +
			"&_extra_comment=" + this.get("_extra_comment") +
			"&_extra_ev_trm_id=" + this.get("_extra_ev_trm_id") +
			"&" + this.prepareParams(additionalParams)
	}
})

cj.maratl.payments.Change = cj.maratl.payments.PaymentBase.extend({

	request: function (additionalParams) {
		return "AccNum=" + this.get("AccNum") +
			"&PrvId=" + this.get("PrvId") +
			"&PrvName=" + this.get("PrvName") +
			"&_extra_fixed_int_summ=" + this.get("_extra_fixed_int_summ") +
			"&MinCashLimit=" + this.get("_extra_fixed_int_summ") +
			"&PrvId2=" + this.get("PrvId2") +
			"&AccNum2=" + this.get("AccNum2") +
			"&MinCashLimit2=" + this.get("MinCashLimit2") +
			"&" + this.prepareParams(additionalParams)
	}
})
cj.maratl.onlines = {};

cj.maratl.onlines.XMLRequest = function (request) {
	this._text = request;

	this.toString = function () {
		return this._text;
	}
};

cj.maratl.onlines.XMLResponse = function (data) {
	this._data = data;

	this.findInNode = function (node, tag) {
		for (var i = 0; i < node.childNodes.length; i++) {
			if (node.childNodes[i].nodeName == tag)
				return node.childNodes[i];
		}
		for (var i = 0; i < node.childNodes.length; i++) {
			if (node.childNodes[i].nodeName != '#text') {
				var r = this.findInNode(node.childNodes[i], tag);
				if (r)
					return r;
			}
		}
		return null
	};

	this.find = function (tag) {
		return this.findInNode(this._data, tag);
	};
	this.findValue = function (tag) {
		return this.text(this.findInNode(this._data, tag));
	};

	this.text = function (node) {
		var r = this.findInNode(node, '#text');
		return r.nodeValue;
	};

	this.resultCode = function () {
		return this.findValue("result-code");
	};

	this.connectionFail = function () {
		return (this.resultCode() == "600");
	};
};

/**
 *
 * @param request XMLRequest
 * @param startImmediately Boolean
 */
cj.maratl.onlines.XMLOnline = function (request, startImmediately) {

	this._triedFirst = false;
	this._urlsTried = -1;
	this._request = request;

	this.status = 'initial';

	this._timers = {};
	this._urls = ['https://w.qiwi.ru/term2/xmlutf.jsp', 'https://service1.osmp.ru/mylk/xmlutf.jsp', 'https://service2.osmp.ru/mylk/xmlutf.jsp'];

	this.processXMLDoc = function (data) {
		this.response = new cj.maratl.onlines.XMLResponse(data);
		this.trigger('response', this.response);
	};

	this.timerOff = function (id) {
		clearTimeout(id);
		this._timers[id].isOn = 0;
	};

	this.timerOn = function (callback, time) {
		var o = {id: 0, callback: callback, isOn: 1};
		o.id = setTimeout(function () {
			o.callback();
		}, time);
		this._timers[o.id] = o;
		return o.id;
	};

	this.success = function (data) {
		cj.maratl.secureLog("response: " + data, "XML Request: SUCCESS");
		var d = '<?xml version="1.0" encoding="utf-8" ?>' + data;
		var xml = new ActiveXObject("Microsoft.XMLDOM");
		xml.async = false;
		xml.loadXML(d);
		var self = this;
		setTimeout(function () {
			self.processXMLDoc(xml);
			self.status = 'success';
		}, 100);
	};

	this.fail = function (data) {
		cj.maratl.secureLog("response: " + data, "XML Request: FAILED");
		var self = this;
		if (!this._triedFirst) {
			this._triedFirst = true;
			this._urlsTried--;
		}
		if (this._urlsTried == 2) {
			this.status = 'timeout';
			this.trigger('timeout');
		}
		else
			setTimeout(function () {
				self.start();
			}, 300)
	};

	this.start = function (timeout) {
		//alert(this._request.toString());
		var self = this;

		this.status = 'started';

		cj.timeout.reset();
		var t = this._triedFirst ? timeout || 30000 : 5000;

		var timerId = this.timerOn(function () {
			if (this.isOn == 1) {
				cj.timeout.reset();
				xhr.abort();
			}
		}, t);

		var xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
		var obj = {xhr: xhr, id: timerId, callback: function () {
			//alert(xhr.readyState + " " + xhr.status);
			if (self._timers[this.id].isOn == 1)
				if (xhr.readyState == 4) {
					cj.timeout.reset();
					self.timerOff(this.id);
					if (xhr.status == 200) {
						self.success(xhr.responseText)
					} else {
						self.fail("xhr.readyState = " + xhr.readyState + "; xhr.status = " + xhr.status);
					}
				}
		}};
		xhr.onreadystatechange = function () {
			obj.callback();
		};
		this._urlsTried++;
		var url = this._urls[this._urlsTried] || this._urls[0];
		cj.maratl.secureLog("url: " + url + ", request: " + this._request.toString(), "XML Request: STARTED");
		xhr.open("POST", url, true);
		xhr.send(this._request.toString());
	};

	if (startImmediately)
		this.start()
};

_.extend(cj.maratl.onlines.XMLOnline.prototype, Backbone.Events);
cj.maratl.onlines.ERROR_CODES = [
	[0, 'OK'],
	[1, 'Провайдер временно недоступен'],
	[2, 'Превышено число попыток'],
	[3, 'Техническая ошибка, нельзя отправить запрос провайдеру'],
	[4, 'Неверный формат счета/телефона'],
	[5, 'Номер не принадлежит оператору'],
	[6, 'Прием платежа запрещен, обратитесь в банк'],
	[7, 'Прием платежа запрещен, обратитесь к оператору'],
	[8, 'Прием платежа запрещен по техническим причинам'],
	[9, 'Timeout от провайдера'],
	[10, 'Дублирование платежа'],
	[12, 'Платеж не подтвержен клиентом'],
	[13, 'Сервер занят, повторите запрос через минуту'],
	[15, 'Истекло время ожидания платежа в очереди на отправку провайдеру'],
	[16, 'Превышен суточный лимит'],
	[20, 'Ошибка банка'],
	[71, 'Домашний оператор не может принять платеж'],
	[72, 'ЛС платежной системы не доступен'],
	[73, 'Домашний оператор не доступен'],
	[74, 'ПЦ не может принимать платежи'],
	[75, 'Провайдер не идентифицировал ПЦ'],
	[76, 'Платеж запрещен провайдером'],
	[77, 'Прием платежа запрещен провайдером'],
	[78, 'Провайдер не может провести платеж'],
	[79, 'Счет абонента не активен'],
	[80, 'VIP счет. Прием платежа запрешен.'],
	[81, 'Не найдено описание клиента'],
	[82, 'Провайдер запретип прием платежа ПЦ'],
	[83, 'В настоящее время прием платежа невозможен'],
	[84, 'Номер не принадлежит оператору.'],
	[85, 'Отмена платежа невозможна'],
	[86, 'Не определено состояние платежа'],
	[90, 'Проведение платежа не окончено'],
	[100, 'Ошибка сервера - JSP Error'],
	[101, 'Нет такого файла для загрузки'],
	[110, 'Ошибка сервера - PL/SQL Error'],
	[115, 'PL/SQL - ошибка при создании запроса МТС'],
	[116, 'Истекло время ожидания (Технические проблемы в МТС)'],
	[130, 'Работа с данным провайдером не реализована'],
	[133, 'Нет прав на прием платежей'],
	[134, 'Нет прав кассира'],
	[135, 'Нельзя списывать с чужого счета'],
	[140, 'Прием платежа невозможен из-за технического сбоя. Повторите позже'],
	[141, 'Ошибка при отправке платежа в МТС'],
	[142, 'Платеж отменен в МТС'],
	[150, 'Ошибка авторизации'],
	[155, 'Прием платежа для данного провайдера запрещен'],
	[200, 'JSP - неверное значение R'],
	[201, 'Слишком много запросов с терминала, обождите!!'],
	[202, 'Ошибка данных запроса'],
	[203, 'Транзакция не найдена в базе данных'],
	[209, 'Ошибка авторизации'],
	[210, 'Нет такой транзакции в базе'],
	[211, 'Неверный статус транзакции'],
	[212, 'Не задана сумма платежа (или лимит терминала)'],
	[213, 'Не задана сумма списания'],
	[215, 'Транзакция с таким номером уже есть в базе'],
	[216, 'Ошибка при сохранении транзакции на сервере'],
	[220, 'Недостаток средств у агента'],
	[221, 'Недостаточно средств на счете в банке'],
	[222, 'Ошибка при запроса баланса в БелБанке'],
	[223, 'Не заведен номер счета в БелБанке в системе'],
	[230, 'Ошибка при отправке запроса в МегаФон'],
	[231, 'Неизвестная ошибка БиЛайн'],
	[232, 'Не авторизовано Билайном'],
	[233, 'Повторный платеж в течении часа'],
	[234, 'Не прошло в Билайне'],
	[235, 'Ошибка Корбины'],
	[236, 'Договор с БиЛайн не зарегистрирован'],
	[237, 'Нет связи с Билайном'],
	[238, 'Номер телефона находится в неактивном состоянии'],
	[239, 'Некоммерческий клиент'],
	[240, 'Не проведена'],
	[241, 'Сумма слишком мала'],
	[242, 'Сумма слишком велика'],
	[243, 'Невозможно проверить состояние счета'],
	[244, 'Терминал не зарегистрирован у оператора'],
	[245, 'Неверный тип терминала'],
	[246, 'Неверный PIN-код'],
	[247, 'Ошибка при отправке запроса в Индиго'],
	[249, 'Номер Матрикс Мобайл'],
	[250, 'Ошибка Матрикса'],
	[251, 'Отказ от Матрикса'],
	[252, 'Необходима повторная регистрация'],
	[260, 'Сонет: ошибка сервера'],
	[261, 'Сонет: ошибка связи'],
	[262, 'Сонет: отказ'],
	[270, 'Ошибка от провайдера'],
	[271, 'Ошибка в ответе провайдера'],
	[272, 'Временно нет связи с провайдером'],
	[274, 'Сумма платежа должна быть целым числом'],
	[275, 'Некорректная сумма платежа'],
	[276, 'Коррекция! НЕ ПЕРЕПРОВОДИТЬ!'],
	[278, 'Превышение максимального периода'],
	[280, 'Недостаток средств у агента выше'],
	[290, 'Ошибка блокировки баланса для списания средств'],
	[296, 'Неверный владелец'],
	[297, 'Неправильный код подтверждения'],
	[298, 'Агента не существует в системе'],
	[299, 'Агент уже зарегистрирован'],
	[300, 'Другая (неизвестная) ошибка провайдера'],
	[301, 'Плохой код подтверждения'],
	[302, 'Плохой пароль'],
	[303, 'Неверный номер телефона'],
	[304, 'Неверный номер карты'],
	[305, 'Пользователь с другим номером карты зарегистрирован'],
	[306, 'Неправильный код дилера'],
	[307, 'Неправильный код точки приема'],
	[308, 'Неправильный код оператора'],
	[309, 'Неправильный формат кода сессии'],
	[310, 'Неправильная ЭЦП'],
	[311, 'Неправильный формат документа'],
	[312, 'Сессия с таким номером не существует'],
	[313, 'Запрос сделан с другого IP'],
	[314, 'Не прошел CyberCheck (списание средств со счета дилера)'],
	[315, 'Не было запроса из банка на создание агента'],
	[316, 'Блокировка на 24 часа'],
	[317, 'SMS с PIN-кодом уже было отослано'],
	[318, 'Пользователь с таким номером не зарегистрирован'],
	[319, 'Нет прав у агента'],
	[330, 'Ошибка шифрования'],
	[331, 'Нет задолжности за ЖКУ'],
	[332, 'Пользователь отменил звонком'],
	[333, 'Пользователь не ответил на звонок'],
	[334, 'Не найден PIN'],
	[335, 'Нельзя без пинкода заходить в кабинет'],
	[336, 'PIN выслан'],
	[337, 'Неверный формат PIN-кода'],
	[338, 'На данном терминале услуга Личный Кабинет отключена. Воспользуйтесь другим терминалом.'],
	[339, 'Не пройден IP-фильтр'],
	[340, 'Не подтвердили платежом из ОСМП'],
	[341, 'Отменено СБ'],
	[342, 'Неправильная станция'],
	[343, 'Нет поездов'],
	[344, 'Нет подтверждения'],
	[345, 'Отменено службой безопасности'],
	[346, 'Ошибка ufs'],
	[347, 'Ошибка concert.ru'],
	[348, 'Ошибка суммы заказа'],
	[349, 'Требуется PIN-код для входа'],
	[350, 'Неверный магазин'],
	[351, 'Истек скрок действия карточки'],
	[352, 'Пользователь уже есть в системе'],
	[353, 'Метод авторизации отключен'],
	[354, 'Текст не соответствует изображению'],
	[355, 'Бесплатное восстановление пароля доступно только 1 раз в день'],
	[364, 'Отменен касиром'],
	[365, 'Отменен при сверке'],
	[366, 'Уже запланирован со счета Билайн'],
	[367, 'Звонок не состоялся'],
	[368, 'Сервис временно не доступен'],
	[402, 'Отказ в предоставлении услуги абоненту'],
	[403, 'Уведомление об истечении timeOut при покупке и резервировании'],
	[406, 'Явный отказ абонента от покупки'],
	[407, 'Уведомление о недостаточности средств у абонента'],
	[408, 'Отмена транзакции по причине появления новой'],
	[410, 'Превышение максимального значения таймаута при резервировании'],
	[411, 'Запрос на завершение резервирования уже отработан'],
	[412, 'Запрос на завершение покупки уже отработан'],
	[421, 'Ошибка при получении информации об абоненте на биллинге'],
	[450, 'Не пройден фрод-контроль по максимальной сумме покупки'],
	[451, 'Не пройден фрод-контроль по сумме платежей за настроенное количество суток'],
	[452, 'Не пройден фрод-контроль по количеству транзакций за настроенное количество суток'],
	[453, 'Не пройден фрод-контроль по минимальному количеству времени между транзакциями'],
	[454, 'Не пройден фрод-контроль по трансфер-балансу'],
	[455, 'Не пройден фрод-контроль по минимальному неснижаемому остатку на счете Абонента'],
	[461, 'Истечение тайм-аута, данное на подтверждение покупки Абонентом'],
	[471, 'Неустановленная ошибка при списании денег с основного баланса'],
	[472, 'На основном балансе Абонента недостаточно средств для списания'],
	[473, 'На специальном авансовом счете Абонента недостаточно средств, а списание с основного счета невозможно'],
	[490, 'Лимит количества СМС от пользователя'],
	[500, 'По техническим причинам данная операция не может быть выполнена. Для осуществления платежа обратитесь, пожалуйста, в свой обслуживающий банк'],
	[501, 'Истек срок действия ключа отправителя'],
	[502, 'Ключ отправителя не зарегистрирован'],
	[503, 'Ключ отправителя блокирован'],
	[504, 'ЭЦП плательщика неверна'],
	[505, 'Ключ плательщика блокирован'],
	[506, 'Неверный логин/пароль при подключении к серверу'],
	[507, 'ЭЦП отправителя неверна'],
	[509, 'По техническим причинам данная операция не может быть выполнена. Для осуществления платежа обратитесь, пожалуйста, в свой обслуживающий банк'],
	[510, 'Необрабатываемый тип сообщения'],
	[511, 'Неверный тип документа'],
	[512, 'Неверный тип платежа'],
	[519, 'Пополнение валютных счетов и карт запрещено'],
	[520, 'Неверный БИК плательщика'],
	[521, 'Неверный счет или БИК плательщика'],
	[522, 'Неверный номер или срок действия карты получателя'],
	[523, 'Неверный ИНН плательщика'],
	[524, 'Неверный идентификатор плательщика'],
	[525, 'Счет плательщика блокирован'],
	[526, 'Карта плательщика блокирована'],
	[527, 'Ошибка в сроке действия карты получателя'],
	[528, 'Истек срок действия карты получателя'],
	[529, 'Неверный номер договора плательщика'],
	[530, 'Отсутствует ФИО,  дата и или дата рождения получателя'],
	[531, 'Отсутствует или неверный номер терминала'],
	[532, 'Отсутствует aдрес терминала'],
	[533, 'Отсутствует или неверный номер агента терминала'],
	[534, 'Отсутствует наименование агента терминала'],
	[535, 'Отсутствует код платежной системы'],
	[536, 'Отсутствует внутренний номер платежа'],
	[537, 'Неверный формат поля дата рождения'],
	[538, 'Неверный формат поля дата учета платежа'],
	[539, 'Не заполнено поле  oper_type'],
	[540, 'Неверный БИК получателя'],
	[541, 'Неверно указауказаны реквизиты платежа. Пожалуйста, проверьте введенные данные или обратитесь за уточнением реквизитов в свой обслуживающий банк'],
	[542, 'Неверный номер карты получателя'],
	[543, 'Неверный ИНН получателя'],
	[544, 'Неверный Идентификатор получателя'],
	[545, 'Счет получателя блокирован'],
	[546, 'Карта получателя блокирована'],
	[547, 'Ошибка в сроке действия карты получателя'],
	[548, 'Истек срок действия карты получателя'],
	[549, 'Неверный номер договора получателя'],
	[550, 'Неверное ФИО получателя'],
	[551, 'Сумма слишком мала'],
	[552, 'Сумма слишком велика/Превышен лимит платежей в день'],
	[553, 'Неверный формат поля сумма платежа'],
	[554, 'Неверный формат поля комиссия'],
	[555, 'Сумма комиссии больше суммы платежа'],
	[556, 'Превышен суточный лимит суммы платежей на один номер счета/карты/договора'],
	[557, 'Сумма платежа = 0'],
	[558, 'Превышен установленный лимит по сумме'],
	[559, 'Невозможно идентифицировать получателя платежа'],
	[560, 'Отвергнут оператором банка отправителя'],
	[561, 'Отвергнут оператором банка получателя'],
	[569, 'Неверный формат поля Дата налогового платежа'],
	[571, 'Неверный номер счета/договора получателя'],
	[572, 'Неверный тип платежа'],
	[573, 'Не заполнено или ошибочно значение поля КПП'],
	[574, 'Не заполнено или ошибочно значение поля КБК'],
	[575, 'Не заполнено или ошибочно значение поля ОКАТО'],
	[576, 'Не заполнено или ошибочно значение поля Основание платежа'],
	[577, 'Не заполнено или ошибочно значение поля Налоговый период'],
	[578, 'Не заполнено или ошибочно значение поля Тип налогового платежа'],
	[579, 'Не заполнено или ошибочно значение поля Статус налогового органа'],
	[580, 'Не заполнено назначение платежа'],
	[581, 'Платеж невозможно отменить'],
	[589, 'Платеж принят на исполнение. Ожидается подтверждение'],
	[590, 'Платеж принят на обработку'],
	[591, 'Платеж не возможно отменить'],
	[592, 'Истек срок действия подарочного сертификата'],
	[599, 'Помещен в архив'],
	[600, 'Не удалось установить соединение. Попробуйте повторить попытку позже.'],
	[650, 'Номер кошелька не принадлежит оператору, с баланса которого производится оплата'],
	[651, 'Платеж отменен в Мегафоне'],
	[652, 'Платёж отменён по инициативе абонента'],
	[653, 'Оферта не подтверждена'],
	[654, 'Профиль абонента блокирован'],
	[655, 'Профиль абонента не найден'],
	[656, 'Услуга для Вас недоступна. При возникновении вопросов обратитесь в службу сервиса по телефону 0500 (звонок бесплатный)'],
	[657, 'Ошибка при проверке платежеспособности в банке'],
	[658, 'Ошибка при запросе баланса у оператора'],
	[659, 'Ошибка при запросе информации о клиенте у оператора'],
	[660, 'Не удалось произвести списание средств со счета абонента у оператора'],
	[661, 'Номер не поддерживается оператором'],
	[662, 'Приём платежей приостановлен по техническим причинам'],
	[663, 'В структуре меню получателей платежей произошли изменения. Пожалуйста, попробуйте найти нужного получателя через пункт "Оплата услуг"'],
	[664, 'Платёж отменён по истечении времени ожидания подтверждения абонентом'],
	[665, 'Не удовлетворены ограничения на платёж'],
	[666, 'Вам запрещено использование услуги. Пожалуйста, обратитесь в информационно-справочную службу Мегафон по телефону 0500 (звонок бесплатный)'],
	[667, 'Отказано в списании средств со счета абонента у оператора'],
	[668, 'Не активирована услуга "Возврат средств на счет ПЦ"'],
	[700, 'Превышен лимит на операции'],
	[750, 'Базовый платеж отменен'],
	[751, 'Оплата со счета МТС с вашего номера недоступна'],
	[752, 'Одновременно можно проводить только 1 платеж со счета МТС'],
	[753, 'Неверный источник платежа'],
	[754, 'Система приема платежей в МТС временно не доступна. Пожалуйста, повторите платеж позже.'],
	[755, 'Перевод на эту карту невозможен'],
	[756, 'Превышен суточный лимит по количеству платежей'],
	[757, 'Превышен установленный лимит по количеству платежей'],
	[758, 'В ФИО плательщика недопустимые символы'],
	[759, 'Возврат по этой карте невозможен'],
	[760, 'CVV2 не заполнен либо введен неверно'],
	[761, 'Превышен установленный лимит по сумме от 1 отправителя'],
	[762, 'Превышен установленный лимит по сумме на 1 получателя'],
	[763, 'Превышен суточный лимит по количеству платежей от 1 отправителя'],
	[764, 'Превышен суточный лимит по количеству платежей на 1 получателя'],
	[765, 'Превышен установленный лимит по количеству платежей на 1 получателя'],
	[766, 'Превышен установленный лимит по количеству платежей от 1 отправителя'],
	[767, 'Превышен суточный лимит по сумме на 1 отправителя'],
	[768, 'Превышен суточный лимит по сумме на 1 получателя'],
	[769, 'Оплата с банковской карты недоступна при данном типе входа'],
	[770, 'Процессинг банка эмитента карты недоступен. Попробуйте выполнить операцию позднее'],
	[771, 'Отправка реквизитов карты доступна только 1 раз в день.'],
	[772, 'Устаревшая версия клиентского приложения'],
	[773, 'Принято неправильно зашифрованное сообщение.'],
	[774, 'Персона временно заблокирована'],
	[775, 'Ошибка при регистрации терминала'],
	[776, 'Ошибка допинформации платежа'],
	[777, 'Невозможно выполнить операцию. Одноразовый пароль.'],
	[778, 'Невозможно выполнить операцию. Неодноразовый пароль.'],
	[779, 'Персона временно заблокирована. 10 неудачных попыток пароля.'],
	[780, 'Проведение платежа запрещено СБ'],
	[781, 'Одинаковые номера терминальной транзакции в пакете'],
	[782, 'Превышена максимальная сумма оплаты для терминала'],
	[783, 'Недопустимая дополнительная комиссия'],
	[784, 'Обработано РИК'],
	[785, 'Обрабатывается РИК'],
	[786, 'Документ проверен ОСМП'],
	[787, 'Невозможно отправить в РИК'],
	[788, 'Платеж на шлюз без комиссии ОСМП'],
	[789, 'Ошибка при блокировке баланса'],
	[790, 'Запрещенный запрос'],
	[791, 'Платеж обработан банком'],
	[792, 'Ошибка обработки платежа банком'],
	[793, 'Отсутствуют необходимые данные для обработки платежа'],
	[794, 'Невозможно отправить платеж в банк'],
	[795, 'Платеж обрабатывается банком без проверки статуса'],
	[796, 'Обрабатывается банком'],
	[797, 'Платёж отменён'],
	[798, 'Платёж отменён через отдел отмен'],
	[799, 'Нет подтверждения от Мегафона'],
	[800, 'Номер постановления не найден'],
	[801, 'Для указанных ИНН и ОКАТО не найдены реквизиты платежа'],
	[802, 'Игра не найдена'],
	[803, 'Не удалось сверить стоимость билета'],
	[804, 'Не удалось купить билет'],
	[805, 'Код подтверждения не применим для этой карты'],
	[806, 'Превышено количество попыток ввода информации по данному платежу'],
	[807, 'Номер брони не найден.'],
	[808, 'Невозможно оплатить бронь, стоимость которой указана не в рублях.'],
	[809, 'Нет подтверждения от Банка'],
	[810, 'Оплата принята Аэрофлотом, однако билет не был выпущен. Обратитесь в отделение Аэрофлота.'],
	[811, 'Уже есть активная карта'],
	[812, 'Нельзя получить данные документа по этому платежу'],
	[813, 'По данному платежу документ еще не создан. Попробуйте запросить его позднее.'],
	[814, 'Не заполнен или неверен номер(формат) телефона получателя'],
	[815, 'Нет подтверждения платежа от МТС.'],
	[816, 'Не удалось получить адрес для подтверждения платежа в банке (ошибка банка).'],
	[817, 'Ваш заказ не может быть оплачен. Обратитесь в службу бронирования ОАО "Аэрофлот"'],
	[818, 'Время оплаты заказа истекло. Обратитесь в службу бронирования ОАО "Аэрофлот"'],
	[819, 'Истекло время жизни счета'],
	[850, 'Платеж с использованием заемных средств не найден или отменен'],
	[851, 'Пополнение отменено, т.к. платеж не прошел'],
	[860, 'Требуется пароль'],
	[861, 'Неверный код активации'],
	[862, 'Истек срок действия авторизации'],
	[863, 'Исчерпано количество попыток ввода кода активации'],
	[864, 'Не найден курс для указанной валюты.'],
	[888, 'Ведутся технические работы, повторите запрос позже'],
	[889, 'Перевод не существует'],
	[890, 'Неверный старый пароль'],
	[891, 'Код активирован отправителем'],
	[892, 'Токен не активен'],
	[893, 'Перевод просрочен'],
	[895, 'Код отсутствует или уже активирован'],
	[896, 'Карта уже активирована'],
	[897, 'Не заполнено кодовое слово'],
	[900, 'Исчерпано количество попыток ввода подтверждающего кода'],
	[901, 'Истек срок действия подтверждающего кода'],
	[902, 'Не удалось инициировать оплату с подтвеждением по SMS'],
	[903, 'Неверный код подтверждения платежа'],
	[904, 'Код для пересылки недействителен'],
	[905, 'Пожалуйста, дождитесь СМС сообщения'],
	[906, 'Токен заблокирован'],
	[907, 'Приложение не зарегистрировано'],
	[908, 'Приложение заблокировано'],
	[909, 'Неверный токен авторизации'],
	[1000, 'Неверный код авторизации'],
	[1004, 'Не удалось создать баланс в выбранной валюте']
];

cj.maratl.onlines.STATUS_CODES = [
	[3, "Ждем платежа из банка"],
	[5, "Ждем подтверждения по СМС для пользователя ЛК"],
	[6, "Ждем платежа из ОСМП"],
	[9, "Ждем звонка SIP"],
	[10, "Не обработана"],
	[20, "Отправлен запрос провайдеру"],
	[25, "Авторизуется"],
	[27, "Ждет авторизации"],
	[28, "Ждет авторизации"],
	[30, "Авторизована"],
	[31, "Поставлена на перенос"],
	[32, "Перенесена"],
	[35, "Разрешение от 2-го провайдера"],
	[40, "Отправлено разрешение на терм."],
	[45, "Оплачено, деньги не списаны"],
	[48, "Проходит финансовый контроль"],
	[49, "Проходит финансовый контроль"],
	[50, "Проводится"],
	[51, "Проведена(51)"],
	[52, "Отправлен оператору"],
	[55, "Чек есть но нет авторизации..."],
	[56, "Пришла R=2, когда в базе ничего не было"],
	[57, "Ждет проведения"],
	[58, "Перепроведение"],
	[59, "Принята к оплате"],
	[60, "Проведена"],
	[61, "Проведена"],
	[65, "Отправлен пров-ру, неавторизован"],
	[66, "Отправлен провайдеру, было 56"],
	[67, "Отправлен провайдеру, было ??"],
	[120, "Не проходит проверки у нас"],
	[125, "Не смогли отправить провайдеру"],
	[130, "Отказ от провайдера"],
	[140, "Не смогли отправить разр. не терм."],
	[148, "Не проведена (Фин.контроль)"],
	[149, "Не проведена (Фин.контроль)"],
	[150, "Не проведена"],
	[151, "Ошибка авторизации"],
	[152, "Ошибка авторизации из 52"],
	[155, "Отправили откат провайдеру"],
	[160, "Не проведена"],
	[161, "Не проведена (присвоено вручную)"],
	[166, "Отменена в VISA"]
];

cj.maratl.onlines.getErrorForStatus = function (code) {
	for (var i = 0; i < cj.maratl.onlines.STATUS_CODES.length; i++)
		if (cj.maratl.onlines.STATUS_CODES[i][0] == code)
			return cj.maratl.onlines.STATUS_CODES[i][1];
	return null;
}

cj.maratl.onlines.getErrorForCode = function (code) {
	for (var i = 0; i < cj.maratl.onlines.ERROR_CODES.length; i++)
		if (cj.maratl.onlines.ERROR_CODES[i][0] == code)
			return cj.maratl.onlines.ERROR_CODES[i][1];
	return null;
};
cj.views.AbstractView = Backbone.View.extend({
	$el:null,
	_model:null,

	initialize:function (options) {
		this.$el = options.el;
		this._model = options.model;
	},

	isVisible:function () {
		return this.$el && !(this.$el.hasClass("hidden"));
	},

	isEnabled:function () {
		return this.$el && (!(this.$el.hasClass("disabled")));
	},

	hide:function () {
		this.$el && this.$el.addClass("hidden")
	},

	show:function () {
		this.$el && this.$el.removeClass("hidden")
	},

	enable:function () {
		this.$el && this.$el.removeClass("disabled")
	},

	disable:function () {
		this.$el && this.$el.addClass("disabled")
	},

	prepareOptions:function (options) {
		var res = options;
		if (res == undefined) {
			res = {}
		}
		res.context = this;
		return res;
	},

	showPopup:function (options) {
		options = this.prepareOptions(options);
		options.state = 'show';
		this.trigger(cj.views.events.popup, options)
	},

	hidePopup:function (options) {
		options = this.prepareOptions(options);
		options.state = 'hide';
		this.trigger(cj.views.events.popup, options)
	},

	showPreloader:function (options) {
		options = this.prepareOptions(options);
		options.state = 'show';
		options.text = options.text || this.model.get('preloader_text');
		this.trigger(cj.views.events.preloader, options)
	},

	stopPreloader:function (options) {
		options = this.prepareOptions(options);
		options.state = 'stop';
		this.trigger(cj.views.events.preloader, options)
	},

	hidePreloader:function (options) {
		options = this.prepareOptions(options);
		options.state = 'hide';
		this.trigger(cj.views.events.preloader, options)
	},

	clear:function () {
	},

	destroy:function () {
		this.clear();

		if (this.$el) {
			this.$el.off();
			this.$el = null;
		}
		if (this._model) {
			this._model = null;
		}
	}

});

cj.views.StatisticsView = cj.views.AbstractView.extend({

	GetDateTimeString: function () {
		var dat = new Date(),
			sMonth = (1 + dat.getMonth()).toString(),
			sDate = dat.getDate().toString(),
			sHours = dat.getHours().toString(),
			sMinutes = dat.getMinutes().toString(),
			sSeconds = dat.getSeconds().toString();

		if (sMonth.length == 1) sMonth = '0' + sMonth;
		if (sDate.length == 1) sDate = '0' + sDate;
		if (sHours.length == 1) sHours = '0' + sHours;
		if (sMinutes.length == 1) sMinutes = '0' + sMinutes;
		if (sSeconds.length == 1) sSeconds = '0' + sSeconds;

		return dat.getFullYear() + "-" + sMonth + "-" + sDate + " " + sHours + ":" + sMinutes + ":" + sSeconds;
	},

	initialize: function (options) {
		if (cj.session.get("timeout_exit") == "true")
			cj.statistics.append("X1"); //timeout
		else
			cj.statistics.append("X0"); //user

		$("#_extra_MGT_date").val(this.GetDateTimeString());
		$("#_extra_MGT_path").val(cj.statistics.value);
		$("#_extra_MGT_sum").val(cj.session.get("payed_summ") || "0");
		$("#_extra_MGT_phone").val(cj.session.get("phone"));
		$("#_extra_MGT_ver").val(cj.APP_VERSION);
		$("#_extra_MGT_qk_id").val(cj.session.get('startParams') ? cj.session.get('startParams').prvId : "");

		$("#ff").submit();
	}
})
cj.views.TextField = cj.views.AbstractView.extend({
	_text:"",
	_maxChars:Number.MAX_VALUE,
	_textContainer:null,

	initialize:function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		if (options.maxChars)
			this._maxChars = options.maxChars;
		var container = this.$el.find(".text-container");
		this._textContainer = container[0] ? container : $('<div class="text-container"></div>').appendTo(this.$el);
	},

	render:function () {
		this.$el.on('mousedown', {self:this}, this.onClick);
		return this;
	},

	onClick:function (e) {
		e.data.self.performClick();
	},

	text:function (value) {
		if ((value || value == "") && value != this._text && value.length <= this._maxChars) {
			this._text = value.toString();
			this._textContainer.html(value)
		}
		return this._text
	},

	appendText:function (text) {
		if (!text)
			return;
		text = text.toString();
		if ((this._text.length + text.length) <= this._maxChars)
			this.text(this._text + text);
	},

	erase:function () {
		if (this._text.length)
			this.text(this._text.substr(0, this._text.length - 1))
	},

	performClick:function () {
		this.trigger(cj.views.events.click);
	},

	clear:function () {
		if (this.$el)
			this.$el.off();
	},
	destroy:function () {
		cj.views.AbstractView.prototype.destroy.call(this);

		this._textContainer && (this._textContainer = null);
	}
});

cj.Masker = {
	charsUsed: -1,
	demask: function (value, mask) {
		return cj.Masker.demaskWithPreparedMask(value, cj.Masker.prepareMask(mask))
	},
	demaskWithPreparedMask: function (value, preparedMask) {
		var res = "";
		var charsSkipped = 0;
		for (var i = 0; i < preparedMask.length; i++) {
			var el = preparedMask[i];
			if (el.charAt(0) == '$') {
				var n = Number(el.substr(2));
				res += value.substr(charsSkipped, n);
				charsSkipped += n;
			} else {
				charsSkipped += el.length;
			}
		}
		return res;
	},
	format: function (value, mask) {
		return cj.Masker.formatWithPreparedMask(value, cj.Masker.prepareMask(mask))
	},
	formatWithPreparedMask: function (value, preparedMask) {
		var res = "";
		cj.Masker.charsUsed = 0;
		for (var i = 0; i < preparedMask.length; i++) {
			if (preparedMask[i].charAt(0) == "$") {

				if (cj.Masker.charsUsed >= value.length) {
					cj.Masker.charsUsed = -1;
					return res;
				}
				var curValue = value.substr(cj.Masker.charsUsed);
				var count = Number(preparedMask[i].substr(2));

				if (curValue.length < count) {
					res += curValue;
					cj.Masker.charsUsed = -1;
					return res;
				} else {
					res += curValue.substr(0, count);
					cj.Masker.charsUsed += count;
				}
			} else
				res += preparedMask[i]
		}
		return res
	},
	prepareMask: function (maskText) {
		var arr = maskText.split(/(\\[dw]\{\d+\})/);
		arr[0] = arr[0].replace("^", "");
		arr[arr.length - 1] = arr[arr.length - 1].replace("$", "");
		return _.map(arr, function (item) {
			return /(\\[dw]\{\d+\})/.test(item) ? item.replace(/\\([dw])\{(\d+)\}/, "$$$1$2") : item;
		})
	}
};

cj.views.MaskedTextField = cj.views.TextField.extend({

	_value: "",
	_mask: null,
	_maskParts: [],

	initialize: function (options) {
		cj.views.TextField.prototype.initialize.call(this, options);
		this._disableMask = !!options.disableMask;
		this._mask = options.mask;
		this._maskParts = cj.Masker.prepareMask(this._mask);
		cj.log.l(this._maskParts.join(","))
	},

	text: function (value) {
		if (value || value == "")
			throw new Error("MaskedTextField text should be set via 'value' function");
		return this._text
	},

	value: function (value) {
		if ((value || value == "") && value.length <= this._maxChars) {
			this._value = value.toString();
			this._text = this._disableMask ? this._value : this.format(this._value);
			this._textContainer.html(this._text);
		}
		return this._value
	},

	appendText: function (value) {
		if (value && (this._value.length + value.length) <= this._maxChars)
			this.value(this._value + value);
	},

	erase: function () {
		if (this._value.length)
			this.value(this._value.substr(0, this._value.length - 1))
	},

	mask: function (value) {
		if (value) {
			this.value("");
			this._mask = value;
			this._maskParts = cj.Masker.prepareMask(this._mask);
		}
		return this._mask;
	},

	format: function (value) {
		var res = cj.Masker.formatWithPreparedMask(value, this._maskParts);
		if (cj.Masker.charsUsed > 0)
			this._value = this._value.substr(0, cj.Masker.charsUsed);
		return res;
	}
});

cj.views.MultiTextField = cj.views.AbstractView.extend({

	_tfs: null,
	_masks: null,
	_splitters: null,
	_activeField: null,

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);

		this.prepareMasks(options.mask);
		this.prepareFields(this._masks.length);
		this.setActiveField(this._tfs[0]);
	},

	prepareFields: function (count) {
		this._tfs = [];
		var self = this;
		var totalLen = 0;
		_(count).times(function (n) {
			var $t = $('<div id="textfield-' + (n + 1) + '"></div>');
			this.$el.append($t);

			var maxLen = Number(this._masks[n].replace(/\\([dw])\{(\d+)\}/, "$2"));
			totalLen += maxLen + 1.33;

			var tf = new cj.views.MaskedTextField({el: $t, mask: this._masks[n]});
			this._tfs.push(tf);
			tf.on('click', function () {
				if (self._activeField != this) {
					self.setActiveField(this)
				}
			});
			tf.maxChars = maxLen;

			//disable fix IE//
			tf.def_cl = "textfield-length-" + maxLen;
			$t.addClass(tf.def_cl);
			tf.disable = function () {
				this.$el.removeClass(this.def_cl);
				this.$el.addClass(this.def_cl + "-disabled");
			}
			tf.enable = function () {
				this.$el.removeClass(this.def_cl + "-disabled");
				this.$el.addClass(this.def_cl);
			}
			//disable fix IE//

			cj.views.mixins.CombinedTextField.apply(tf);
			tf.render();
			if (n < count - 1) {
				this.$el.append($('<div id="splitter-' + (n + 1) + '">' + this._splitters[n] + '</div>'))
				totalLen += this._splitters[n].length;
			}
		}, self);

		this.$el.addClass('multi-textfield-length-' + Math.ceil(totalLen));
	},

	prepareMasks: function (mask) {
		var arr = mask.split(/(\\[dw]\{\d+\})/);
		if (_.first(arr) == "^")
			arr = _.rest(arr);
		if (_.last(arr) == "$")
			arr = _.initial(arr);

		var is_mask = function (val, index) {
			return (index % 2) == 0;
		};
		this._masks = _(arr).filter(is_mask);
		this._splitters = _(arr).reject(is_mask);
	},

	setActiveField: function (field) {
		this._activeField = field;
		this._activeField.enable();
		_(this._tfs).each(function (val) {
			if (val != this._activeField)
				val.disable();
		}, this);
	},

	text: function (value) {
		if (value)
			throw new Error("MultiTextField text should be set via 'value' function");
		return this.getText();
	},

	getText: function () {
		var res = "";
		_(this._tfs.length).times(function (n) {
			res += this._tfs[n].text();
			if (n < this._tfs.length - 1)
				res += this._splitters[n]
		}, this);
		return res;
	},

	value: function (value) {
		if ((value || value == "")) {
			var part = 0, start = 0;
			_(value.length).times(function (n) {
				if (part >= this._splitters.length)
					return;
				if (value.charAt(n) == this._splitters[part]) {
					this._tfs[part].value(cj.Masker.demaskWithPreparedMask(value.substr(start, n - start), this._tfs[part]._maskParts))
					start = n + 1;
					part++;
					if (part == this._splitters.length)
						this._tfs[part].value(cj.Masker.demaskWithPreparedMask(value.substr(start, value.length - start), this._tfs[part]._maskParts))
				}
			}, this);
		}
		return this.getText();
	},

	erase: function () {
		if (this._activeField.value() == "") {
			var i = _(this._tfs).indexOf(this._activeField);
			if (i != 0)
				this.setActiveField(this._tfs[i - 1])
		}
		this._activeField.erase();
	},

	appendText: function (val) {
		this._activeField.appendText(val);
		if (this._activeField.value().length == this._activeField.maxChars) {
			var i = _(this._tfs).indexOf(this._activeField);
			if (i != this._tfs.length - 1)
				this.setActiveField(this._tfs[i + 1])
		}
	}

});

cj.views.MonthDateTextField = cj.views.MaskedTextField.extend({


	initialize:function (options) {
		cj.views.MaskedTextField.prototype.initialize.call(this, options);
	},

	value:function (value) {
		if ((value || value == "")) {

			if (value.length == 1 && Number(value) > 1)
				cj.views.MaskedTextField.prototype.value.call(this, "0" + value);
			else
				cj.views.MaskedTextField.prototype.value.call(this, value);

			this._textContainer.html(this._text);
		}
		return this._value;
	},

	destroy:function () {
		cj.views.MaskedTextField.prototype.destroy.call(this);
	}
});

cj.views.ExpirationDateTextField = cj.views.MaskedTextField.extend({

	_textContainer2:null,

	initialize:function (options) {
		cj.views.MaskedTextField.prototype.initialize.call(this, options);
		this._textContainer2 = this.$el.find(".text-container-2");
	},

	value:function (value) {
		if ((value || value == "")) {

			if (value.length == 1 && Number(value) > 1)
				cj.views.MaskedTextField.prototype.value.call(this, "0" + value);
			else
				cj.views.MaskedTextField.prototype.value.call(this, value);

			this._textContainer.html(this._text.substr(0, 2));
			this._textContainer2.html(this._text.substr(2));
		}
		return this._value;
	},

	destroy:function () {
		cj.views.MaskedTextField.prototype.destroy.call(this);
		this._textContainer2 && (this._textContainer2 = null);
	}
});

cj.views.DatePeriodMultiField = cj.views.AbstractView.extend({

	_tf1: null,
	_tf2: null,
	_activeField: null,

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);

		this.prepareFields();
		this.setActiveField(this._tf1);
	},

	getTF: function (n) {
		var self = this;
		var tf = new cj.views.MonthDateTextField({el: $("#textfield-" + n), mask: "\\d{2}/\\d{4}"});
		cj.views.mixins.TextFieldWithPlaceholder.apply(tf);
		tf.on('click', function () {
			if (self._activeField != this) {
				self.setActiveField(this)
			}
		});
		tf.maxChars = 6;
		cj.views.mixins.CombinedTextField.apply(tf);
		tf.render();
		return tf;
	},
	prepareFields: function () {
		this._tf1 = this.getTF(1);
		this._tf2 = this.getTF(2);
	},

	setActiveField: function (field) {
		this._tf1.disable();
		this._tf2.disable();
		this._activeField = field;
		this._activeField.enable();
	},

	value: function () {
		return this.value1() + this.value2();
	},
	text: function () {
		return this.text1() + "-" + this.text2();
	},

	text1: function (value) {
		if (value)
			throw new Error("MultiTextField text should be set via 'value' function");
		return this._tf1.text();
	},
	text2: function (value) {
		if (value)
			throw new Error("MultiTextField text should be set via 'value' function");
		return this._tf2.text();
	},

	value1: function (value) {
		return this._tf1.value(value);
	},
	value2: function (value) {
		return this._tf2.value(value);
	},

	erase: function () {
		if (this._activeField.value() == "" && this._activeField == this._tf2) {
			this.setActiveField(this._tf1)
		}
		this._activeField.erase();
	},

	appendText: function (val) {
		this._activeField.appendText(val);
		if (this._activeField.value().length == this._activeField.maxChars && this._activeField == this._tf1) {
			this.setActiveField(this._tf2)
		}
	}

});

cj.views.FullDateTextField = cj.views.MaskedTextField.extend({

	_textContainer2:null,
	_textContainer3:null,

	initialize:function (options) {
		cj.views.MaskedTextField.prototype.initialize.call(this, options);
		this._textContainer2 = this.$el.find(".text-container-2");
		this._textContainer3 = this.$el.find(".text-container-3");
	},

	value:function (value) {
		if ((value || value == "")) {
			if (value.length == 1 && Number(value) > 3)
				cj.views.MaskedTextField.prototype.value.call(this, "0" + value);
			else if (this._value.length == 2 && value.length == 3 && Number(value.charAt(2)) > 1)
				cj.views.MaskedTextField.prototype.value.call(this, value.substr(0, 2) + "0" + value.charAt(2));
			else
				cj.views.MaskedTextField.prototype.value.call(this, value);

			this._textContainer.html(this._text.substr(0, 2));
			this._textContainer2.html(this._text.substr(2, 2));
			this._textContainer3.html(this._text.substr(4));
		}
		return this._value;
	},

	destroy:function () {
		cj.views.MaskedTextField.prototype.destroy.call(this);

		this._textContainer2 && (this._textContainer2 = null);
		this._textContainer3 && (this._textContainer3 = null);
	}
});

cj.views.PasswordTextField = cj.views.MaskedTextField.extend({

	initialize:function (options) {
		cj.views.MaskedTextField.prototype.initialize.call(this, _.extend(options, {mask:"^\\d{" + (options.model.get('maxChars') || 10) + "}$"}));
	},

	value:function (value) {
		if ((value || value == "") && value != this._value && value.length <= this._maxChars) {
			this._value = value.toString();
			this._text = this.format(this._value).replace(/./g, "*");
			this._textContainer.html(this._text);
		}
		return this._value
	}
});

cj.views.mixins.CombinedTextField = {
	apply:function (view) {
		view.$el.prepend('<div class="tf-l"></div><div class="tf-c"></div><div class="tf-r"></div>');
	}
};

cj.views.mixins.TextFieldWithPlaceholder = {
	apply: function (view) {
		var slash = view.$el.find(".slash");

		var placeholder = view.$el.find(".placeholder");
		var oldFunction;
		if (view.value) {
			oldFunction = view.value;
			view.value = function (val) {
				var res = oldFunction.call(view, val);
				slash.removeClass("hidden");
				view.text() ? placeholder.addClass("hidden") : placeholder.removeClass("hidden");
				return res;
			}
		} else {
			oldFunction = view.text;
			view.text = function (val) {
				var res = oldFunction.call(view, val);
				slash.removeClass("hidden");
				res ? placeholder.addClass("hidden") : placeholder.removeClass("hidden");
				return res;
			}
		}
	}
};

cj.views.PreloaderView = cj.views.AbstractView.extend({

	_preloaderText: null,
	_points: 1,
	_preloaderAnimation: null,
	_preloaderStep: 0,
	_animInterval: -1,
	_text: "",

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);

		this._text = options.text;
		(this._preloaderText = this.$el.find(".preloader-text")).html(this._text);
		this._preloaderAnimation = this.$el.find(".preloader-animation");
	},

	render: function () {
		var self = this;

		this._preloaderStep = 0;
		this._points = 1;
		this._animInterval = setInterval(function () {
			self.processPreloader()
		}, 100);
	},

	stop: function () {
		clearInterval(this._animInterval);
	},

	processPreloader: function () {
		var text = this._text;
		var p;

		if (this._preloaderStep % 10 == 0) {
			switch (this._points) {
				case 1:
					p = ".";
					this._points++;
					break;
				case  2:
					p = "..";
					this._points++;
					break;
				case 3:
					p = "...";
					this._points = 1;
					break;

			}
			if (this._preloaderText)
				this._preloaderText.html(text + p)
		}

		//.........
		var n = (this._preloaderStep % 16) + 1;
		if (n != 1)
			this._preloaderAnimation && this._preloaderAnimation.css("background-image", "url('../img/ui/corejs/loader/l" + n.toString() + ".jpg')");
		else
			this._preloaderAnimation && this._preloaderAnimation.css("background-image", "none");

		this._preloaderStep++;
	},

	clear: function () {
		this.stop();
	},
	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this);

		this._preloaderText && (this._preloaderText = null);
		this._preloaderAnimation && (this._preloaderAnimation = null);
	}
});
cj.views.CashBlockView = cj.views.AbstractView.extend({

	_label: null,
	_value: null,
	_comment: null,

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		this._label = this.$el.find(".label");
		this._value = this.$el.find(".value");
		this._comment = this.$el.find(".comment");
	},

	value: function (val) {
		if (val)
			this._value.html('<span>' + val + '</span> руб.');
		else if (val == "")
			this._value.html("");
		return this._value.html();
	},

	label: function (val) {
		if (val || val == "")
			this._label.html(val);
		return this._label.html();
	},

	comment: function (val) {
		if (val || val == "")
			this._comment.html(val);
		return this._comment.html();
	},

	clearText: function(){
		this.value("");
		this.comment("");
		this.label("");
	},
	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this);
		this._comment && (this._comment = null);
		this._label && (this._label = null);
		this._value && (this._value = null);
	}
});
cj.views.CommissionInfoView = cj.views.AbstractView.extend({

	_profiles: null,
	_profStrings: null,
	_container: null,

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		this._profiles = options.profiles.profilesAndCommissions();
		this._profStrings = [];
		this._container = this.$el.find('table');
		cj.maratl.on('response', this.onMaratlResponse, this);

		this.fillContainer();
	},

	fillContainer: function () {
		for (var i = 0; i < this._profiles.length; i++) {
			var prof = this._profiles[i];
			this._profStrings.push($('<tr class="commission-profile"><td>' + prof[0] + '</td><td>' + prof[1] + '</td></tr>').appendTo(this._container));
		}
	},

	setProfile: function (index) {
		_.each(this._profStrings, function (item) {
			item.addClass('commission-profile');
			item.removeClass('active-commission-profile');
		});
		this._profStrings[index - 1].removeClass("commission-profile");
		this._profStrings[index - 1].addClass("active-commission-profile");
	},

	onMaratlResponse: function (key, val) {
		if (key == 'CashSumm') {
			this._hasCash = (Number(val) > 0);
		}
		if (key == 'CommProfileLine' && this._hasCash) {
			this.setProfile(Number(val));
		}
	},

	label: function (val) {
		if (val || val == "")
			this._label.html(val);
		return this._label.html();
	},

	comment: function (val) {
		if (val || val == "")
			this._comment.html(val);
		return this._comment.html();
	},

	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this);
		cj.maratl.off('response', this.onMaratlResponse, this);
	}
});
cj.views.Button = cj.views.AbstractView.extend({
	_$content: null,
	_$shadow: null,
	_content: null,
	_code: null,
	_isSlow: false,
	_timeout: 400,


	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		this._$content = this.$el.find(".button-content");
		this._code = this.$el.data('code');

		if (!this._$content.length && options.AUTO_CONTENT) {
			this._$content = $('<div class="button-content"></div>');
			this.$el.prepend(this._$content);
		}
		if (options.isSlow)
			this._isSlow = true;
		this._$shadow = this.$el.find(".button-shadow");
		if (options.content)
			this.content(options.content);
		if (options.code)
			this.code(options.code);
		if (options.timeout)
			this._timeout = options.timeout
	},

	render: function () {
		this.$el.on('mousedown', {self: this}, this.onMouseDown);
		return this;
	},

	onMouseDown: function (e) {
		if (e.data.self.isEnabled())
			e.data.self.performClick()
	},

	code: function (link) {
		if (link && link.toString()) {
			this._code = link.toString();
			this.$el.data('code', link.toString());
		}
		return this._code;
	},

	content: function (value) {
		if (value) {
			this._content = value;
			this._$content.html(value);
			this._$shadow.html(value);
		}
		return this._content;
	},

	performClick: function () {
		if (!this.$el) return;
		var self = this;
		if (this._isSlow && this.$el.hasClass("pressed"))
			return;
		this.$el.addClass("pressed");
		setTimeout(function () {
			self.release();
		}, this._timeout);
	},

	release: function () {
		this.$el && this.$el.removeClass("pressed");
		this.trigger(cj.views.events.click, this.code());
	},

	clear: function () {
		if (this.$el) {
			this.$el.off();
			this.$el.removeData();
		}
	},

	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this);
		this._$content && (this._$content = null);
		this._$shadow && (this._$shadow = null);
	}
});

cj.views.PhoneTextField = cj.views.MaskedTextField.extend({

	initialize:function (options) {
		cj.views.MaskedTextField.prototype.initialize.call(this, _.extend(options, {mask:"^8(\\d{3})\\d{3}-\\d{2}-\\d{2}$"}));
	},

	text:function (value) {
		if (value)
			throw new Error("PhoneField text should be set via 'value' function");
		return this._text
	},

	value:function (value) {
		if ((value || value == "") && value != this._value && value.length <= this._maxChars) {
			var v = (value == '89' || value == '79') ? '9' : value.toString();
			this._value = v.toString();
			this._text = this.format(this._value);
			this._textContainer.html(this._text)
		}
		return this._value
	}

});

cj.views.Numpad = cj.views.AbstractView.extend({

	_keys:null,

	initialize:function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
	},

	render:function () {
		this.clear();
		var self = this;
		this._keys = _.map([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "dot"], function (value) {
			var b = new cj.views.Button({el:self.$el.find("#key-" + value)});
			b.render();
			b.on(cj.views.events.click, self.onKey, self);
			return b;
		})
	},

	onKey:function (code) {
		this.trigger(cj.views.events.click, code);
	},

	clear:function () {
		if (this._keys) {
			_.each(this._keys, function (item) {
				item.clear();
				item.off();
			})
		}
	},
	destroy:function () {
		cj.views.AbstractView.prototype.destroy.call(this);

		if (this._keys) {
			_.each(this._keys, function (item) {
				item.destroy();
			})
			this._keys = null;
		}
	}
});

cj.views.Keyboard = cj.views.AbstractView.extend({

	_keys: null,
	_layout: null,
	_isShifted: true,

	_pushedStateTime: 400,

	_lang: 0,
	_languages: ["рус", "eng"],

	_space: null,
	_shift: null,
	_langSwitch: null,

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		this._keys = [];
		if (options.pushedStateTime)
			this._pushedStateTime = options.pushedStateTime;
		if (options.layout)
			this._layout = options.layout;
		else
			this._layout = cj.views.Keyboard.DEFAULT_LAYOUT;
		if (options.languages)
			this._languages = options.languages;
		else
			this._languages = ["рус", "eng"];

		this._lang = 0;
	},

	createKeys: function () {
		for (var i = 0; i < 5; i++) {
			this._keys[i] = [];
			for (var j = 0; j < 13; j++) {
				var $k = this.$el.find('#key-' + i + '-' + j);
				var key = this.currentLayout()[i][j];
				if ($k.length) {
					var k = new cj.views.Button({el: $k, content: key.toUpperCase(), code: key.toUpperCase(), timeout: this._pushedStateTime, AUTO_CONTENT: true});
					k.render();
					k.on(cj.views.events.click, this.onKey, this);
					this._keys[i][j] = k;
				}
			}
		}
	},

	onKey: function (code) {
		this.trigger(cj.views.events.click, code);
		this.updateKeys();
	},

	onShift: function (code) {
		this._isShifted = !this._isShifted;
		this.updateKeys();
	},

	onLangSwitch: function (code) {
		this.switchLang();
		this.updateKeys();
	},

	createSpace: function () {
		var $k = this.$el.find('#key-space');
		(this._space = new cj.views.Button({el: $k, code: " ", timeout: this._pushedStateTime, AUTO_CONTENT: true})).render();
		this._space.on(cj.views.events.click, this.onKey, this);
	},

	createShift: function () {
		var $k = this.$el.find('#key-shift');
		(this._shift = new cj.views.Button({el: $k, content: "Shift", timeout: this._pushedStateTime, AUTO_CONTENT: true})).render();
		this._shift.on(cj.views.events.click, this.onShift, this);
	},

	createLangSwitch: function () {
		var $k = this.$el.find('#key-langswitch');
		(this._langSwitch = new cj.views.Button({el: $k, content: this._languages[this.nextLang()].toUpperCase(), timeout: this._pushedStateTime, AUTO_CONTENT: true})).render();
		this._langSwitch.on(cj.views.events.click, this.onLangSwitch, this);
	},

	render: function () {
		this.clear();
		this.createKeys();
		this.createSpace();
		this.createShift();
		this.createLangSwitch();
	},

	currentLayout: function () {
		return this._layout[this._languages[this._lang]];
	},

	isShifted: function (value) {
		if (this._isShifted == !!value)
			return;
		this._isShifted = !!value;
		this.updateKeys();
	},

	nextLang: function () {
		return (this._lang < this._languages.length - 1) ? this._lang + 1 : 0;
	},

	switchLang: function () {
		this._lang = this.nextLang();
		this._langSwitch.content(this._languages[this.nextLang()].toUpperCase());
	},

	updateKeys: function () {
		this.eachKey(this.updateK);
	},

	updateK: function (key, row, column) {
		var c = this._layout[this._languages[this._lang]][row][column];
		c = this._isShifted ? c.toUpperCase() : c.toLowerCase();
		key.code(c);
		key.content(c);
	},

	eachKey: function (closure) {
		if (this._keys && closure) {
			for (var i = 0; i < this._keys.length; i++) {
				var row = this._keys[i];
				for (var j = 0; j < row.length; j++) {
					closure.call(this, this._keys[i][j], i, j)
				}
			}
		}
	},

	clear: function () {
		if (this._keys)
			for (var i = 0; i < 5; i++) {
				for (var j = 0; j < 13; j++) {
					var item;
					if (this._keys[i] && (item = this._keys[i][j])) {
						item.clear();
						item.off();
					}
				}
			}
		if (this._space) {
			this._space.clear();
			this._space.off();
		}
		if (this._shift) {
			this._shift.clear();
			this._shift.off();
		}
		if (this._langSwitch) {
			this._langSwitch.clear();
			this._langSwitch.off();
		}
	},
	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this);

		if (this._keys) {
			for (var i = 0; i < 5; i++) {
				for (var j = 0; j < 13; j++) {
					var item;
					if (item = this._keys[i][j]) {
						item.destroy();
					}
				}
			}
			this._keys = null;
		}
		if (this._space) {
			this._space.destroy();
			this._space = null;
		}
		if (this._shift) {
			this._shift.destroy();
			this._shift = null;
		}
		if (this._langSwitch) {
			this._langSwitch.destroy();
			this._langSwitch = null;
		}
	}
}, {
	DEFAULT_LAYOUT: {
		"рус": [
			['ё', '!', '\"', '№', ';', '%', '?', '*', '(', ')'],
			['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
			['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
			['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '-'],
			['.', '/']
		],
		eng: [
			['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
			['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
			['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '\''],
			['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '-', '_'],
			['.', '/']
		]}
});

cj.views.ToggleButton = cj.views.Button.extend({

	_isOn:false,

	toggleOn:function (cl) {
		this._isOn = true;
		this.$el.addClass(cl || "toggled");
	},

	toggleOff:function (cl) {
		this._isOn = false;
		this.$el.removeClass(cl || "toggled");
	},

	isOn:function () {
		return this._isOn
	}

});

cj.views.RadioGroupView = cj.views.AbstractView.extend({

	_CL:"toggled",
	_buttons:null,
	_selectedButton:null,
	_selectedButtonIndex:-1,

	initialize:function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		var self = this;
		this._buttons = _.map(options.elements, function (item) {
			var b = new cj.views.ToggleButton({el:$(item), isSlow:true, timeout:100});
			b.on('click', self.onChange, self);
			return b;
		});
		if (options.toggleClass)
			this._CL = options.toggleClass
	},

	onChange:function (code) {
		for (var i = 0; i < this._buttons.length; i++) {
			var b = this._buttons[i];
			if (b.code() == code) {
				this.select(i);
				return;
			}
		}
	},
	select:function (index) {
		for (var i = 0; i < this._buttons.length; i++) {
			var b = this._buttons[i];
			if (i == index) {
				b.toggleOn(this._CL);
				this._selectedButton = b;
				this._selectedButtonIndex = i;
			} else {
				b.toggleOff(this._CL);
			}
		}
		this.trigger('change', this._selectedButtonIndex, this._selectedButton.code())
	},

	deselect:function () {
		this._selectedButton.toggleOff(this._CL);
		this._selectedButton = null;
		this._selectedButtonIndex = -1;
		this.trigger('change', this._selectedButtonIndex)
	},

	selectedButtonIndex:function (i) {
		if ((i != -1 ) && (i == 0 || i)) {
			this.select(i);
		} else if (i == -1) {
			this.deselect();
		}
		return this._selectedButtonIndex;
	},

	render:function () {
		_.each(this._buttons, function (item) {
			item.render();
		})
	},

	clear:function () {
		if (this._buttons)
			_.each(this._buttons, function (item) {
				item.clear();
				item.off();
			})
	},
	destroy:function () {
		cj.views.AbstractView.prototype.destroy.call(this);

		if (this._buttons) {
			_.each(this._buttons, function (item) {
				item.destroy();
			})
			this._buttons = null;
		}
	}
});
var simplex = {};
simplex.validations = {
	ExpirationDate: function (str) {
		var s = (str.length == 3) ? "0" + str : str;
		var d = new Date("20" + s.substr(2), Number(s.substr(0, 2)) - 1, 1);
		var delta = d.getFullYear() - new Date().getFullYear();
		return (delta > 0 && delta <= 5) || (delta == 0 && d.getMonth() >= new Date().getMonth());
	},
	BirthDate: function (str) {
		var s = (str.length == 7) ? "0" + str : str;
		var year = Number(s.substr(4));
		if (year < 1938 || year > 2000)
			return false;
		var month = Number(s.substr(2, 2));
		if (month > 12 || month < 1)
			return false;
		var day = Number(s.substr(0, 2));
		if (day > 31 || day < 1)
			return false;

		switch (month) {
			case 2:
				if (day > 29 || ((year % 4) && day > 28))
					return false;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				if (day > 30)
					return false;
		}
		return true;
	}

};
simplex.ConfigParser = {

	isLoaded: false,
	_loaded: {},
	config: null,

	load: function (id) {
		var self = this;
		this.isLoaded = false;
		var script = document.getElementById('provider-config');
		var closure = function () {
			if (self.isLoaded == true) {
				return;
			}
				
			self.isLoaded = true;
			if (!window.UIProvider) {
				self.trigger('no_config');
			} else {
				self._loaded[id] = self.parse(UIProvider);

				// Проверка конфига
				if(self._loaded[id]) {
					self.trigger('loaded', id, self._loaded[id]);
				} else {
					self.trigger('no_config');
				}

				window.UIProvider = null;
			}
		};
		script.onreadystatechange = function () {
			if ((this.readyState == 'complete' || this.readyState == 'loaded')) {
				closure();
			}
		};
		script.onload = closure;
		script.src = '../config/' + id + '.js';
	},

	parse: function (data) {
		this.config = {
			_all: data,
			id: data.id,
			longName: data.lName,
			shortName: data.sName,
			minSumProv: data.minSum,
			maxSumProv: data.maxSum,
			logo: cj.getFirstObjectByPropertyValue(data.__objects, "type", "standard").img
		};
		this.config.params = this.parseParams(data.__objects);
		this.config.pages = this.parsePages(data.__objects);
		return this.config
	},
	parseParams: function (obj) {
		var res = {
			operType: "0",
			prtAccount: "Номер счета"
		};
		var params = cj.getFirstObjectByPropertyValue(obj, "__type", "constParams").__objects;
		for (var i = 0; i < params.length; i++) {
			var p = params[i];
			switch (p.name) {
				case "oper_type":
					res.operType = p.value;
					break;
				case "prv_name":
					res.PrvName = p.value;
					cj.session.set("PrvName", p.value);
					break;
				case "_receipt_prt_account":
					res.prtAccount = p.value;
					break;
				case "allowParticalPayment":
					// Разрешается ли проводить платёж на неполную сумму
					res.allowParticalPayment = (p.value == 'true')
					break;
				case "helperClass":
					// Класс помощника для разделения
					res.helper = simplex.helpers[p.value]
					break;
				case "selectElementHeaderText":
					// Заголовок на странице выбора счётчика/квитанции
					res.selectElementHeaderText = p.value
					break;
				case "selectElementCommentText":
					// Комментарий на странице выбора счётчика/квитанции
					res.selectElementCommentText = p.value
					break;
				case "real_prv_id":
					cj.session.get('startParams').prvId = p.value;
					cj.session.set('PrvId', p.value);
					break;
			}
		}

		// Проверка правильности конфигурации
		if(!res.helper){
			res = null;
		}

		return res;
	},
	parseTickets: function (p) {
		this.config.tickets = [];
		var tickets = cj.getFirstObjectByPropertyValue(p.__objects, "__type", "controls").__objects;
		for (var i = 0; i < tickets.length; i++) {
			var c = tickets[i];

			if (c.type == "disp_button") {
				this.config.tickets.push({
					order: c.orderId,
					visible: c.visible == "true",
					regexp: c.regexp,
					mask: c.mask,
					summ: null,
					id: null,
					text: null,
					account: null,
					receivedValue: false,
					dispName: c.disp_name,
					extraName: c.name.split("-")[0],
					type: c.disp_type,
					accountDispName: cj.getFirstObjectByPropertyValue(tickets, "group_id", c.disp_name).disp_name
				})
			}
		}
		this.config.tickets = _.sortBy(this.config.tickets, function (item) {
			return Number(item.dispName);
		});
	},
	parseCounters: function (p) {
		this.config.counters = [];
		var counters = cj.getFirstObjectByPropertyValue(p.__objects, "__type", "controls").__objects;
		for (var i = 0; i < counters.length; i++) {
			var c = counters[i];
			this.config.counters.push({
				order: c.orderId,
				visible: c.visible == "true",
				regexp: c.regexp,
				mask: c.mask,
				value: null,
				receivedValue: false,
				isReadOnly: c.show_cond == "RO",
				name: c.header,
				category: c.disp_desc,
				dispName: c.disp_name,
				extraName: c.name,
				type: c.disp_type
			})
		}
		this.config.counters = _.sortBy(this.config.counters, function (item) {
			return Number(item.order);
		});
	},
	parsePages: function (obj) {
		var res = {};
		var pages = cj.getFirstObjectByPropertyValue(obj, "__type", "pages").__objects;
		var def_oper_type = this.config.params.operType;
		for (var i = 0; i < pages.length; i++) {
			var p = pages[i];
			var oper_type = cj.getFirstObjectByPropertyValue(p, "name", "oper_type");

			if (p.pageFile == "Confirm") {
				this.parseCounters(p);
				continue;
			}
			
			if (p.pageFile == "TicketsConfirm") {
				this.parseTickets(p);
				continue;
			}

			var keys;
			if (p.orderId == "1") {
				keys = ["operation"]
			} else if (oper_type) {
				keys = oper_type.disp_desc.split(',');
			} else if (def_oper_type) {
				keys = [def_oper_type];
			} else {
				alert("Ошибка заведения! Для страницы не задан oper_type, oper_type по умолчанию также отсутствует.")
			}
			var input = cj.getFirstObjectByPropertyValue(p, "type", "text_input");
			var validations = cj.getFirstObjectByPropertyValue(p, "name", "validations");
			_.each(keys, function (key) {
				if (!res[key])
					res[key] = [];
				res[key].push({
					title: p.title,
					order: p.orderId,
					layout: p.pageFile,
					fieldName: input ? input.name : null,
					fieldLabel: input ? input.header : null,
					paymentName: input ? input.disp_desc : null,
					mask: input ? input.mask : null,
					regexp: input ? input.regexp : null,
					validationRules: validations ? _.map(validations.disp_desc.split(","), _.str.trim) : [],
					errorMessage: input ? input.errMess : null,
					buttons: (p.pageFile != "Buttons") ? null :
						_.map(
							_.filter(p.__objects[0].__objects,
								function (val) {
									return val.type == "button"
								}),
							function (b) {
								return {
									order: b.orderId,
									paramName: b.altName,
									paramValue: b[b.altName],
									text: b.disp_desc
								}
							})
				});
			})
		}
		_.each(res, function (arr, key) {
			res[key] = _.sortBy(arr, function (item) {
				return Number(item.order);
			})
		});
		return res;
	},

	clear: function () {
		this._loaded = {};
		this.isLoaded = false;
		delete window.UIProvider;
	}
}
;
_.extend(simplex.ConfigParser, Backbone.Events);
simplex.StartParamParser = {
	parse: function (str) {
		cj.session.set("PrvId", str);
		return {prvId: str}
	}
};
simplex.ProviderInfoRequest = {

	TIMEOUT: 5000,
	SUCCESS: 'success',
	DENIED: 'denied',
	_timeout: null,
	commProfBasket: null,


	load: function(prvId) {

		var self = this;

		cj.maratl.on(cj.maratl.events.response, this._onMaratlResponse, this);
		this._timeout = setTimeout(function() {
			self.trigger('failure');
			self._reset();
		}, this.TIMEOUT);
		cj.maratl.sendRequest('GetBasketCommPrv=' + prvId);
	},

	_onMaratlResponse: function(key, value) {
		if(key == 'BasketCommPrvRet') {
			switch(value) {
				case 'ok':
					if (commProfBasket)	this.trigger('success', commProfBasket);
					break;
				case 'denied':
				default:
					this.trigger('failure', this.DENIED);
					this._reset();
			}
		}
		else if (key == 'CommProfBasket') {
			var tmp, xml, nodeNumber = 0;
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( value , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( value );
				nodeNumber += 1;
			}
			commProfBasket = cj.commission.CommissionProfilesParser.parse(xml.childNodes[nodeNumber]);
		}
	},

	_reset: function() {
		this._timeout && clearTimeout(this._timeout);
		this._timeout = 0;
		cj.maratl.off(cj.maratl.events.response, this._onMaratlResponse, this);
	}
}

_.extend(simplex.ProviderInfoRequest, Backbone.Events);
simplex.NavGenerator = function (config, startParams) {

	this.prepareNavigationBase = function () {
		var r = [];
		if (this._config.params.operType == "0")
			r.push(this._config.pages["operation"][0]);
		return r;
	};

	this.update = function () {
		cj.session.set("combo_page", this.currentPageIndex);
		var oper_type = cj.session.get('oper_type');
		var currentNav = (oper_type ? this._navigationBase.concat(this._config.pages[oper_type]) : this._navigationBase);
		this.currentPage = currentNav[this.currentPageIndex];
	};

	this._config = config;
	this._startParams = startParams;
	this.currentPageIndex = 0;
	this._navigationBase = this.prepareNavigationBase();

	var cp = cj.session.get("combo_page");
	if (cp) {
		this.currentPageIndex = Number(cp)
	}
	this.update();


	this.hasPrev = function () {
		return this.currentPageIndex > 0
	};

	this.hasNext = function () {
		var oper_type = cj.session.get('oper_type');
		var nav_length = (oper_type ? this._navigationBase.length + this._config.pages[oper_type].length : this._navigationBase.length);
		return (this.currentPageIndex < nav_length - 1);
	};
	this.next = function () {
		if (this.hasNext()) {
			this.currentPageIndex++;
			this.update();
		}
	};

	this.prev = function () {
		if (this.hasPrev()) {
			this.currentPageIndex--;
			this.update();
		}
	};
};

simplex.clearFields = function () {
	cj.session.remove('fields_account');
	cj.session.remove('fields_mfo');
	cj.session.remove('fields_bdate');
	cj.session.remove('fields_fname');
	cj.session.remove('fields_mname');
	cj.session.remove('fields_lname');
	cj.session.remove('fields_bplace');
	cj.session.remove('fields_exp_date');
	cj.session.remove("summ");

	cj.session.remove('fav_to_change');
	cj.session.remove('selected_fav');
	cj.session.remove('go_to_favourites');
}
simplex.helpers = {}

// ERITz
simplex.helpers.TicketsHelper = {

	getView: function(name, options) {
		switch(name){
			case 'select':
				return new cj.views.TicketsView(options)
			break
		}
	},

	onSuccessOnline: function(context){
		cj.session.set("address", context._onlineStatus.disps["disp1"]);

		_.each(cj.session.get("config").tickets, function (item) {
			if (item.receivedValue == true) {
				item.receivedValue = false;
			}
		});

		_.each(cj.session.get("config").tickets, function (item) {
			if (context._onlineStatus.disps[item.dispName]) {
				item.receivedValue = true;
				item.value = context._onlineStatus.disps[item.dispName].split("\n");
				(item.summ = Number(_.str.trim(item.value[1])));
				(item.id = _.str.trim(item.value[0]));
				(item.text = _.str.trim(item.value[2]));
				item.account = context._onlineStatus.disps[item.accountDispName];
			}
		});
		context.hidePreloader();
		context.navigateNext();
	},

	onFailureOnline: function(context, key){
		context.hidePreloader();
		context.showPopup({
			"title": "Ошибка",
			"message": key.toString() == "7" ?
				"Все квитанции уже оплачены." : cj.maratl.onlines.getErrorForCode(Number(key)),
			"closeButtonText": "OK"
		})
	},

	addParams: function(context, params){
		params["_extra_account1"] = cj.session.get("activeId");
		params["_extra_account2"] = cj.session.get("activeAccount");

		var counters = cj.session.get("config").counters;
		_.each(counters, function (item) {
			if (item.type.indexOf("extra") >= 0) {
				if (item.isSubmitted) {
					params["_extra_" + item.extraName] = item.value;
				}
			}
		});

		return params;
	},

	getCashSum: function(context, params) {
		return Number(cj.session.get("activeSumm"));
	},

	addConfirmationLines: function(context) {
		context.addLine("Адрес", cj.session.get("address"));
	},

	/**
	 * Возвращает квитанции
	 * @return {Object} Квитанции
	 */
	getSelectors: function() {
		return cj.session.get("config").tickets;
	}
}

// Simplex
simplex.helpers.CountersHelper = {

	getView: function(name, options) {
		switch(name){
			case 'select':
				return new cj.views.CountersView(options)
			break
		}
	},

	onSuccessOnline: function(context){
		var overSum = false, zeroSum = false;
		var anyVisible = false;

		_.each(cj.session.get("config").counters, function (item) {
			if (item.receivedValue == true) {
				item.receivedValue = false;
			}
		});

		_.each(cj.session.get("config").counters, function (item) {
			if (context._onlineStatus.disps[item.dispName]) {
				item.isSubmitted = false;
				item.receivedValue = true;
				item.prevValue = item.value = context._onlineStatus.disps[item.dispName];
				if (item.visible)
					anyVisible = true;
				if ((item.type.indexOf("fixedsum") >= 0) && Number(item.value) > Number(cj.session.get("max_pay_amount")))
					overSum = true;
				if ((item.type.indexOf("fixedsum") >= 0) && Number(item.value) == 0)
					zeroSum = true
			}
		});

		context.hidePreloader();
		if (overSum) {
			var m = Number(cj.session.get("max_pay_amount"));
			context.showPopup({
				"title": "Ошибка",
				"message": "Ваша задолженность превышает " + m + " рублей. Данный платеж не может быть проведен через" + (m < 15000 ? " этот" : "") + " терминал.",
				"closeButtonText": "OK",
				closeButtonCallback: function () {
					context.trigger(cj.views.events.action, "fail")
				}})
		} else if (zeroSum) {
			context.showPopup({
				"title": "Внимание",
				"message": "У вас нет задолженности.",
				"closeButtonText": "OK"})
		} else {
			cj.session.set('no_counters', !anyVisible);
			context.navigateNext();
		}
	},

	onFailureOnline: function(context, key){
		context.hidePreloader();
		context.showPopup({
			"title": "Ошибка",
			"message": key.toString() == "242" ?
				"Ваша задолженность превышает 15 000 рублей. Данный платеж не может быть проведен через терминал." :
				cj.maratl.onlines.getErrorForCode(Number(key)),
			"closeButtonText": "OK"
		})
	},

	addParams: function(context, params){
		return params;
	},

	getCashSum: function(context, params){
		var counters = cj.session.get("config").counters;
		var summCounter = _.findWhere(counters, {type: "fixedsum"});
		return summCounter ? Number(summCounter.value) : 0;
	},

	addConfirmationLines: function(context){
		var counters = cj.session.get("config").counters;
		_.each(counters, function (item) {
			if (!item.visible) {
				if (item.type.indexOf("fixedsum") >= 0)
					context.addBoldLine(item.name, item.value)
				else
					context.addLine(item.name, item.value)
			}
		})
	},

	/**
	 * Возвращает счётчики
	 * @return {Object} счётчики
	 */
	getSelectors: function() {
		return cj.session.get("config").counters;
	}

}

simplex.layouts = {
	_markup:{}
};

simplex.layouts.LayoutManager = function (el, page, model) {

	this.$el = el;
	this._page = page;
	this._model = model;
	this.layout = null;
	_.extend(this, Backbone.Events);

	this.loadLayout = function () {
		var name = this._page.layout;

		if (!simplex.layouts._markup[name]) {
			var self = this;
			$.ajax(
				{
					url:'pages/layouts/' + name + '.html',
					dataType:'html',
					data:{},
					success:function (data) {
						simplex.layouts._markup[name] = data;
						self.applyLayout(data);
					}
				}
			)
		} else {
			this.applyLayout(simplex.layouts._markup[name])
		}
	};
	this.applyLayout = function (html) {
		this.$el.html(html);
		this.layout = new simplex.layouts[this._page.layout]({el:this.$el, model:this._model, page:this._page});
		this.layout.render();
		this.layout.on('action', function (a) {
			this.trigger('action', a)
		}, this);
		this.layout.on('update', function () {
			this.trigger('update')
		}, this);
		this.layout.on('next', function () {
			this.trigger('next')
		}, this)
		this.trigger('update');
	};
	this.preValidate = function () {
		return this.layout.preValidate()
	};
	this.validate = function () {
		return this.layout.validate()
	};
	this.submit = function () {
		this.layout.submit();
	};
	this.render = function () {
		this.loadLayout();
	};
	this.destroy = function () {
		this.$el.empty();
		this.layout.off();
		this.layout.destroy();
	}
};


simplex.layouts.AbstractLayout = cj.views.AbstractView.extend({

	_page:null,

	initialize:function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		this._page = options.page;
	},

	validate:function () {
		return true
	},

	preValidate:function () {
		return true
	},

	submit:function () {
	}

});
simplex.layouts.FieldLayoutBase = simplex.layouts.AbstractLayout.extend({

	_field: null,

	initialize: function (options) {
		simplex.layouts.AbstractLayout.prototype.initialize.call(this, options);
		this._field = new cj.views.MaskedTextField({el: this.$el.find("#textfield"), mask: this._page.mask});
		cj.views.mixins.CombinedTextField.apply(this._field);
	},

	render: function () {
		this._field.value("");

		var val = cj.session.get("fields_" + this._page.fieldName);
		if (val && val != "null")
			this.value(val);

		$('#comment').empty();
	},

	value: function (value) {
		if (value || value == "") {
			this._field.value(value);
			this.update();
		}
		return this._field.value()
	},

	update: function () {
		this.trigger('update');
	},

	preValidate: function () {
		return new RegExp(this._page.regexp).test(this.value());
	},

	validate: function () {
		//todo: clear up
		for (var i = 0; i < this._page.validationRules.length; i++) {
			var rule = simplex.validations[this._page.validationRules[i]];
			if (!rule)
				return false;
		}
		return true;
	},

	clear: function () {
		if (this._field)
			this._field.clear();
	},

	submit: function () {
		cj.session.set("fields_" + this._page.fieldName, this.value());
		cj.session.set("fields_" + this._page.fieldName + "_formatted", this._field.text())
	},

	destroy: function () {
		simplex.layouts.AbstractLayout.prototype.destroy.call(this);
		if (this._field)
			this._field.destroy();
	}
});
simplex.layouts.Account = simplex.layouts.FieldLayoutBase.extend({

	_numpad: null,
	_eraseButton: null,

	initialize: function (options) {
		simplex.layouts.FieldLayoutBase.prototype.initialize.call(this, options);
		this._numpad = new cj.views.Numpad({el: this.$el.find(".numpad")});
		this._eraseButton = new cj.views.Button({el: this.$el.find("#erase")})
	},

	render: function () {
		simplex.layouts.FieldLayoutBase.prototype.render.call(this);

		this._numpad.render();
		this._numpad.on(cj.views.events.click, this.onNumpad, this);

		this._eraseButton.render();
		this._eraseButton.on(cj.views.events.click, this.onErase, this);
	},

	onErase: function () {
		this._field.erase();
		this.update()
	},

	onNumpad: function (code) {
		this._field.appendText(code.toString());
		this.update()
	},

	submit: function () {
		simplex.layouts.FieldLayoutBase.prototype.submit.call(this);
		cj.session.set("fields_" + this._page.fieldName + "_extra", this._page.keepFieldMask ? this._field.text() : this.value());
	},

	destroy: function () {
		simplex.layouts.FieldLayoutBase.prototype.destroy.call(this);
		if (this._numpad) {
			this._numpad.off();
			this._numpad.destroy();
		}
		if (this._eraseButton) {
			this._eraseButton.off();
			this._eraseButton.destroy();
		}
	}
});
simplex.layouts.Period = simplex.layouts.Account.extend({

	initialize: function (options) {
		simplex.layouts.Account.prototype.initialize.call(this, options);
		this._field = new cj.views.DatePeriodMultiField({el: this.$el.find("#dateperiod-textfield"), mask: this._page.mask});
	},

	render: function () {
		simplex.layouts.Account.prototype.render.call(this)
		var val = cj.session.get("fields_period_start");
		if (val && val != "null")
			this._field.value1(val);
		val = cj.session.get("fields_period_end");
		if (val && val != "null")
			this._field.value2(val);
	},

	preValidate: function () {
		if (simplex.layouts.Account.prototype.preValidate.call(this)) {
			return this.testPeriod();
		}
		return false;
	},

	testPeriod: function () {
		var m1 = Number(this._field.value1().substr(0, 2));
		var y1 = Number(this._field.value1().substr(2));
		var m2 = Number(this._field.value2().substr(0, 2));
		var y2 = Number(this._field.value2().substr(2));
		return m1 > 0 &&
			m1 < 13 &&
			m2 > 0 &&
			m2 < 13 &&
			((y1 < y2) || (y1 == y2 && m1 < m2));
	},

	submit: function () {
		simplex.layouts.Account.prototype.submit.call(this);
		cj.session.set("fields_period_start", this._field.value1().toString());
		cj.session.set("fields_period_end", this._field.value2().toString());

	}
});
simplex.layouts.ExpirationDate = simplex.layouts.FieldLayoutBase.extend({

	_numpad: null,
	_eraseButton: null,

	initialize: function (options) {
		simplex.layouts.FieldLayoutBase.prototype.initialize.call(this, options);
		this._field.destroy();
		this._field = new cj.views.ExpirationDateTextField({el: this.$el.find("#textfield"), mask: this._page.mask});
		cj.views.mixins.TextFieldWithPlaceholder.apply(this._field);

		this._numpad = new cj.views.Numpad({el: this.$el.find(".numpad")});
		this._eraseButton = new cj.views.Button({el: this.$el.find("#erase")})
	},

	onErase: function () {
		this._field.erase();
		this.update()
	},

	onNumpad: function (code) {
		this._field.appendText(code.toString());
		this.update()
	},

	render: function () {
		simplex.layouts.FieldLayoutBase.prototype.render.call(this);

		this._numpad.on(cj.views.events.click, this.onNumpad, this);
		this._numpad.render();

		this._eraseButton.on(cj.views.events.click, this.onErase, this);
		this._eraseButton.render();
	},

	destroy: function () {
		simplex.layouts.FieldLayoutBase.prototype.destroy.call(this);
		if (this._numpad) {
			this._numpad.off();
			this._numpad.destroy();
		}
		if (this._eraseButton) {
			this._eraseButton.off();
			this._eraseButton.destroy();
		}
	},
	submit: function () {
		simplex.layouts.FieldLayoutBase.prototype.submit.call(this);
		cj.session.set("fields_" + this._page.fieldName + "_formatted", this._field.text().substr(0, 2) + "." + this._field.text().substr(2));
		cj.session.set("fields_" + this._page.fieldName + "_formatted_for_online", this._field.text().substr(2) + "." + this._field.text().substr(0, 2) + ".01");
	}
});
simplex.layouts.Buttons = simplex.layouts.AbstractLayout.extend({

	_buttons: [],
	_fields: [],
	_offertusButton: null,

	initialize: function (options) {
		simplex.layouts.AbstractLayout.prototype.initialize.call(this, options);

		var self = this;
		_.each(this._page.buttons, function (item) {
			var i = Number(item.order) - 1;
			self._buttons[i] = new cj.views.Button({el: self.$el.find("#button-" + item.order), content: '<div class="wrap">' + item.text + '</div><div class="openm"></div>'});
			self._buttons[i].code(i.toString());
			self._fields[i] = item
		});
		cj.session.remove(self._fields[0].paramName);

		this.clearSession();

		this._offertusButton = new cj.views.Button({
			el: this.$el.find('#offertus-button')
		});
	},

	clearSession: function () {
		cj.session.remove("fields_nticket");
		cj.session.remove("fields_account");
		cj.session.remove("fields_rzek");
		cj.session.remove("fields_startdate_enddate");
	},

	render: function () {
		var self = this;
		_.each(this._buttons, function (button) {
			button.render();
			button.show();
			button.on(cj.views.events.click, self.onButton, self)
		});

		this._offertusButton.on(cj.views.events.click, this.onOffertusButton, this);
		this._offertusButton.render();
	},

	onOffertusButton: function () {
		this.trigger(cj.views.events.action, 'offertus')
	},

	onButton: function (code) {
		var i = Number(code);
		if (cj.session.get(this._fields[i].paramName) != this._fields[i].paramValue) {
			simplex.clearFields();
		}
		cj.session.set(this._fields[i].paramName, this._fields[i].paramValue);
		this._fieldName = this._fields[i].paramName;
		this._value = this._fields[i].paramValue;
		this.trigger('next');
	},

	destroy: function () {
		simplex.layouts.AbstractLayout.prototype.destroy.call(this);
		if (this._buttons) {
			_.each(this._buttons, function (button) {
				button.off();
				button.destroy();
			})
			this._buttons = null;
		}
	},

	preValidate: function () {
		return true;
	},

	validate: function () {
		return true;
	},

	submit: function () {
	}
});
cj.views.CheckStatusView = cj.views.AbstractView.extend({

	DELAY: 3000,

	_startParamParser: null,

	_pulseTimes: 0,
	_timeout: -1,
	_res: {},

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		this._startParamParser = simplex.StartParamParser;
		// cj.log.show();
	},

	render: function () {

		this.clear();

		this.showPreloader({content: "start"});

		$("#info-plate").hide();

		this.startOperations();
	},

	showFailPopup: function (popup, code) {
		var self = this;
		this.stop();
		this.showPopup(_.extend(popup, {closeButtonCallback: function () {
			self.trigger(cj.views.events.action, "fail")
		}}))
		cj.statistics.append(code);
	},

	pulse: function () {
		if (this._pulseTimes > Number(this.model.get("min_show_time")))
			if (this.check())
				return;

		this._pulseTimes++;
		if (this._pulseTimes >= 6) {
			this.showFailPopup(this.model.get("connection-popup"), "E0");
		}

		cj.maratl.send("WriteToLog", "Вход в приложение : " + cj.APP_VERSION);
		var p;
		if (p = this.model.get("prv_id")){
			cj.maratl.send("PrvId", p)
		}
		cj.maratl.send("GetMaxSummByPrv", p);
		cj.maratl.send("GetTermID", "true");
		cj.maratl.send("GetBalance", "true");
		cj.maratl.send("GetCommis", "true");
		cj.maratl.send("GetStartParam", "true");
		cj.maratl.send("GetPrtStatus", "true");
	},

	startOperations: function () {

		cj.maratl.on('response', this.onMaratlResponse, this);
		var self = this;
		this._timeout = setInterval(function () {
			self.pulse();
		}, 1000);

		this.pulse();
	},

	onMaratlResponse: function (key, value) {
		var codes = cj.maratl.codes;
		if (key.toLowerCase() == "getmaxsummbyprv") {
			this._res["max_pay_amount"] = (value == "0" ? "15000" : value.toString());
			return;
		}
		if (key.toLowerCase() == "commprof") {
			if (!cj.session.get('commission_profiles')) {
				var tmp, xml, nodeNumber = 0;
				if ( window.DOMParser ) { // Standard
					tmp = new DOMParser();
					xml = tmp.parseFromString( value , "text/xml" );
				} else { // IE
					xml = new ActiveXObject( "Microsoft.XMLDOM" );
					xml.async = "false";
					xml.loadXML( value );
					nodeNumber += 1;
				}
				var cp = cj.commission.CommissionProfilesParser.parse(xml.childNodes[nodeNumber]);
				cj.session.set('commission_profiles', cp);
			}
			return;
		}
		if (key.toLowerCase() == "balance") {
			this._res["TermBalance"] = value;
			return;
		}
		if (key.toLowerCase() == "startparam") {
			var sp = this._startParamParser.parse(value);
			if (sp) {
				this._res.startParams = sp;
				cj.session.set('startParams', sp);
			} else {
				this.showFailPopup(this.model.get("provider-popup"), "E0");
			}
		}

		this._res[key] = value;
		if (key == codes.PrtStatus && value.toLowerCase() == "error" && (this.model.get("need_printer") == "true")) {
			this.showFailPopup(this.model.get("printer-popup"), "E2");
		}
		if (key == codes.PrvDenied && value == "true") {
			this.showFailPopup(this.model.get("provider-popup"), "E0");
		}
		this.check();
	},

	check: function () {
		var t = this.model.get('min_show_time');
		if (t && Number(t) > this._pulseTimes)
			return false;

		var r;
		var self = this;
		if (r = this.status()) {
			this.stop();
			simplex.ConfigParser.on("no_config", function () {
				simplex.ConfigParser.off();
				self.showFailPopup(self.model.get('provider-popup'), "E0");
			});
			simplex.ConfigParser.on("loaded", function (id, data) {
				simplex.ConfigParser.off();
				
				self._res.config = data;
				$('#provider-logo img').attr("src", "../img/ui_item/" + data.logo).removeClass("hidden");

				// Показывать ли попап после проверки статуса
				if(self._res.config.params.allowParticalPayment){
					// Скрываем попап, переходим на следующую страницу
					self.hidePreloader();
					self.trigger(cj.views.events.action, 'submitted', self._res);
					self.trigger(cj.views.events.action, 'success');
				} else {
					// Показываем попап, ждём 3 секунды и переходим на следующий экран
					$("#info-plate").show();
					var interval = setInterval(function(){
						self.hidePreloader();
						self.trigger(cj.views.events.action, 'submitted', self._res);
						self.trigger(cj.views.events.action, 'success');
					}, self.DELAY)
				}

			});
			simplex.ConfigParser.load(this._res.startParams.prvId);

		}
		return r;
	},

	status: function () {
		var codes = cj.maratl.codes, r = this._res;
		if (!r[codes.TermID])
			return false;
		if (!r['max_pay_amount'])
			return false;
		if (this.model.get("prv_id") && !r[codes.PrvAllow])
			return false;
		if (!r[codes.PrtStatus])
			return false;
		return true;
	},

	stop: function () {
		clearInterval(this._timeout);
		cj.maratl.off('response', this.onMaratlResponse, this);
	},


	clear: function () {
		this.stop();
	}

});
cj.views.OffertusView = cj.views.AbstractView.extend({

	_leftButton:null,
	_rightButton:null,

	path:null,

	_current:null,
	_total:null,
	_pages:null,

	$container:null,
	$content:null,
	$number:null,
	$text:null,

	initialize:function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);

		this.path = this._model.get('url')

		this._leftButton = new cj.views.Button({
			el:this.$el.find("#left-button")
		})
		this._rightButton = new cj.views.Button({
			el:this.$el.find("#right-button")
		})

		this.$container = this.$el.find('#offertus-container')
		this.$content = this.$el.find('#offertus-content')
		this.$number = this.$el.find('#offertus-pagenumber')
	},

	render:function () {
		this.clear();

		var self = this

		$.ajax({
			url:self.path,
			success:function (data) {

				self.$text = $(data)
				self._current = 0
				self._pages = self.$text.find('.page')
				self._total = self._pages.length

				self.showPage(self._current)
			},
			error:function (xhr, ajaxOptions, thrownError) {
				self.showPopup(self.model.get('load_error_popup'))
			}
		})


		$('#header, #path-header').addClass("hidden");

		this._leftButton.render();
		this._leftButton.on(cj.views.events.click, this.prev, this);

		this._rightButton.render();
		this._rightButton.on(cj.views.events.click, this.next, this);
	},

	clear:function () {
		$('#header, #path-header').removeClass("hidden");
		if (this._leftButton) {
			this._leftButton.off();
			this._leftButton.clear();
		}
		if (this._rightButton) {
			this._rightButton.off();
			this._rightButton.clear();
		}
	},

	destroy:function () {
		cj.views.AbstractView.prototype.destroy.call(this);

		if (this._leftButton) {
			this._leftButton.destroy();
			this._leftButton = null;
		}
		if (this._rightButton) {
			this._rightButton.destroy();
			this._rightButton = null;
		}

		this.$container && (this.$container = null);
		this.$content && (this.$content = null);
		this.$number && (this.$number = null);
		this.$text && (this.$text = null);
	},

	prev:function () {
		if (this._current - 1 >= 0) {
			cj.log.l('prev')
			this.showPage(this._current - 1)
		}
	},
	next:function () {
		if (this._current + 1 < this._total) {
			cj.log.l('next')
			this.showPage(this._current + 1)
		}
	},
	showPage:function (number) {
		this._current = number
		if (this._current) {
			this.$container.addClass('nested')
		}
		else {
			this.$container.removeClass('nested')
		}
		this.$number.html((this._current + 1) + ' / ' + this._total)
		this.$content.html(this._pages[this._current])
	}
});
cj.views.PhoneEnterView = cj.views.AbstractView.extend({

	_nextButton: null,
	_numpad: null,
	_field: null,
	_backspaceButton: null,

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		this._nextButton = options.nextButton;

		this._field = new cj.views.PhoneTextField({
			el: this.$el.find('#textfield'),
			maxChars: Number(this._model.get('maxChars')) || 10
		});
		cj.views.mixins.CombinedTextField.apply(this._field);

		this._backspaceButton = new cj.views.Button({
			el: this.$el.find('#erase')
		});
		this._numpad = new cj.views.Numpad({
			el: this.$el.find('.numpad')
		});
	},

	render: function () {
		this.clear();

		var self = this;

		this._nextButton.on(cj.views.events.click, this.onNextButton, this);
		this._nextButton.hide();

		this._backspaceButton.on(cj.views.events.click, this.onErase, this);
		this._backspaceButton.render();

		this._numpad.on(cj.views.events.click, this.onNumpad, this);
		this._numpad.render();

		var phone = cj.session.get('phone');
		if (phone) {
			setTimeout(function () {
				self._field.value(phone);
				self.update()
			}, 200)
		}
	},

	onNumpad: function (code) {
		this._field.appendText(code.toString());
		this.update()
	},

	onErase: function () {
		this._field.erase();
		this.update()
	},

	onNextButton: function () {
		var prvId = cj.phoneCapacity.prvId(this._field.value());
		if (prvId == -1) {
			var template = this.model.get("wrong_number_popup").message;
			this.showPopup(_.extend(this.model.get("wrong_number_popup"), {
				message: _.template(template)({
					phone: this._field.text()
				})
			}));
			this.update();
			return
		}

		cj.session.set("PrvId2", ((cj.session.get("change_option") == "wallet") ? "7406" : prvId.toString()));
		cj.session.set("AccNum2", (this._field.value()));

		cj.session.set("phone", this._field.value());
		cj.session.set("phone_formatted", this._field.text());
		this.trigger(cj.views.events.action, "submitted");
	},

	update: function () {
		if (this._field.value().length == 10) {
			this._nextButton.show()
		} else {
			this._nextButton.hide()
		}
	},

	clear: function () {
		this._backspaceButton && this._backspaceButton.off() && this._backspaceButton.clear();
		this._offertusButton && this._offertusButton.off() && this._offertusButton.clear();
		this._numpad && this._numpad.off() && this._numpad.clear();
		this._nextButton && this._nextButton.off()
	},

	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this);

		if (this._backspaceButton) {
			this._backspaceButton.destroy();
			this._backspaceButton = null;
		}
		if (this._offertusButton) {
			this._offertusButton.destroy();
			this._offertusButton = null;
		}
		if (this._numpad) {
			this._numpad.destroy();
			this._numpad = null;
		}
		if (this._field) {
			this._field.destroy();
			this._field = null;
		}
		if (this._nextButton) {
			this._nextButton = null;
		}
	}
});
cj.views.ConfirmationView = cj.views.AbstractView.extend({

	$table: null,
	config: null,
	template: '<tr id="card-number"><td class="key"><%-key%></td><td class="value"><%-value%></td></tr>',

	_nextButton: null,

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		this.$table = $(this.el).find('table');
		this.config = cj.session.get('config');
		this._nextButton = options.nextButton;
		this._nextButton.off();
		this._nextButton.on('click', this.nextPage, this);
		this._nextButton.show();
	},

	render: function () {
		var self = this;
		var op_type = cj.session.get("oper_type");
		if (this.config.pages.operation) {
			var butPage = this.config.pages.operation[0];
			var op_str = _.findWhere(butPage.buttons, {paramValue: op_type}).text;
			this.addLine('Тип оплаты', op_str);
		}

		var pages = this.config.pages[op_type];
		for (var i = 0; i < pages.length; i++) {
			var p = pages[i];
			this.addLine(p.fieldLabel, cj.session.get("fields_" + p.fieldName + "_formatted"));
		}

		this.config.params.helper.addConfirmationLines(this);

	},

	addLine: function (key, value) {
		var html = $(_(this.template).template({key: key, value: value}));
		this.$table.append(html)
	},
	addBoldLine: function (key, value) {
		var html = $(_(this.template).template({key: key, value: value}));
		html.find(".value").css("font-weight", "bold");
		this.$table.append(html)
	},

	nextPage: function () {
		this.trigger(cj.views.events.action, cj.session.get("no_counters") ? "no_counters" : "counters")
	},

	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this);
		if (this.$table){
			this.$table = null;
		}
			
	}

});
cj.views.CounterEditorView = simplex.layouts.Account.extend({

	_okButton: null,
	_cancelButton: null,
	_counter: null,

	initialize: function (options) {
		simplex.layouts.Account.prototype.initialize.call(this, _.extend(options, {
			page: {
				fieldName: "Счетчик",
				regexp: "^\\d{1,13}\\.?\\d{0,2}$",
				mask: "^\\w{16}$",
				validationRules: []
			}
		}));
		this._okButton = new cj.views.Button({el: this.$el.find("#ok")});
		this._cancelButton = new cj.views.Button({el: this.$el.find("#cancel")})
	},

	render: function () {
		simplex.layouts.Account.prototype.render.call(this);
		this.update();
		this._okButton.on('click', this.onOkButtonClick, this);
		this._okButton.render();
		this._cancelButton.on('click', this.onCancelButtonClick, this);
		this._cancelButton.render();
	},

	setCounter: function (counter) {
		this._counter = counter;
		this._page.fieldName = counter.name;
		this._page.regexp = counter.regexp;
		this._field.mask(this._page.mask = counter.mask);
		this._field.value("");
		this.update();
		this.$el.find("h2").html(counter.name);
		this.$el.find(".prevCounter").html("Предыдущие показания счетчика: " + counter.prevValue);
	},

	onOkButtonClick: function () {
		this.submit();
	},

	onCancelButtonClick: function () {
		this.trigger("close")
	},

	update: function () {
		simplex.layouts.Account.prototype.update.call(this);
		if (this.preValidate())
			this._okButton.show();
		else
			this._okButton.hide();
	},

	submit: function () {
		this._counter.value = this.value();
		this._counter.isSubmitted = true;
		this.trigger("submit");
	},

	destroy: function () {
		simplex.layouts.Account.prototype.destroy.call(this);
		if (this._okButton) {
			this._okButton.off();
			this._okButton.destroy();
		}
		if (this._cancelButton) {
			this._cancelButton.off();
			this._cancelButton.destroy();
		}
	}
});
cj.views.CountersView = cj.views.AbstractView.extend({

	_nextButton: null,
	_prevButton: null,

	_containers: null,
	_instances: null,
	_ribbon: null,
	_page: 0,
	_counterEditor: null,

	_nextPressed: false,
	//View

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		this.$el.find("#CountersView").removeClass('hidden')
		this.$el.find("#counterEditor").removeClass('hidden')

		this._nextButton = options.nextButton;
		this._prevButton = options.prevButton;

		var self = this;
		this._containers = [];
		_.times(16, function (index) {
			self._containers.push(self.$el.find("#b-" + index));
		});
		this._counterEditor = new cj.views.CounterEditorView({
			el: $("#counterEditor")
		});
		this._counterEditor.on("submit", this.onCounterEditorSubmit, this);
		this._counterEditor.on("close", this.onCounterEditorClose, this);
		this._counterEditor.render();
		this._counterEditor.$el.detach();
		this.prepareInstances();
		this.prepareRibbon();
		this.submitEntered();
	},


	getColorByCategory: function (cat) {
		if (cat.toLocaleLowerCase().indexOf("холодная вода") != -1)
			return "blue";
		if (cat.toLocaleLowerCase().indexOf("горячая вода") != -1)
			return "orange";
		if ((cat.toLocaleLowerCase().indexOf("электроэнергия") != -1)
			|| (cat.toLocaleLowerCase().indexOf("электричество") != -1))
			return "violet";
		if (cat.toLocaleLowerCase().indexOf("газ") != -1)
			return "aqua";
		if (cat.toLocaleLowerCase().indexOf("отопление") != -1)
			return "green";
		return "grey";
	},

	prepareInstances: function () {
		var self = this
		var res = {};
		res.forward = new cj.views.Button({el: $("<div id='counters-forward'><div class='button-content'><div class='arrow'></div><p class='more'>Eще 13</p></div></div>")});
		res.forward.on('click', function () {
			this.fillPage(this._page + 1);
		}, this);
		res.forward.render();
		res.back = new cj.views.Button({el: $("<div id='counters-back'><div class='button-content'><div class='arrow'></div><p class='more'>Eще 13</p></div></div>")});
		res.back.on('click', function () {
			this.fillPage(this._page - 1);
		}, this);
		res.back.render();

		res.categories = [];

		var counters = cj.session.get("config").counters;
		_.each(counters, function (item, index) {
			var cat = $.trim(item.category);
			if (!cat)
				return;
			if (item.isReadOnly)
				return;
			if (!item.receivedValue)
				return;
			if (!res[cat]) {
				res.categories.push(cat);
				res[cat] = [];
			}
			var color = self.getColorByCategory(cat);
			var b = new cj.views.Button({
				el: $("<div id='counter-" + color + "-" + index + "'></div>"),
				content: "<div class='tick'></div><div class='green-tick hidden'></div><p class='counter-name'>" + item.name + "</p><p class='counter-val'>" + item.value + "</p><p class='counter-change'><strong>Изменить</strong></p>",
				AUTO_CONTENT: true
			});
			b.on('click', self.onCounterClick);
			b.render();
			b.counter = item;
			b.counterEditor = self._counterEditor;

			res[cat].push(b);

		});
		this._instances = res;
	},

	prepareRibbon: function () {
		this._ribbon = [];
		var all = 0, catI = 0;
		var self = this;

		var addToRibbon = function (but, no_check) {
			self._ribbon.push(but);
			all++;
			if (!no_check) {
				if (all % 16 == 15) {
					self._ribbon.push(self._instances.forward);
					self._ribbon.push(self._instances.back);
					all += 2;
				}
			}
		};

		while (catI < this._instances.categories.length) {
			var cat = this._instances.categories[catI];
			for (var couI = 0; couI < this._instances[cat].length; couI++) {
				addToRibbon(this._instances[cat][couI],
					(catI == this._instances.categories.length - 1) && (couI == this._instances[cat].length - 1));
			}
			catI++;
		}
	},

	submitEntered: function () {
		var self = this;
		var counters = cj.session.get("config").counters;
		_.each(counters, function (item, index) {
			if (item.isSubmitted)
				self.refreshCounter(item)
		});

	},

	onCounterClick: function () {
		this.counterEditor.setCounter(this.counter);
		$("#top-content").append(this.counterEditor.$el)
	},

	onCounterEditorSubmit: function () {
		this.refreshCounter(this._counterEditor._counter);
		this._counterEditor.$el.detach();
	},

	onCounterEditorClose: function () {
		this._counterEditor.$el.detach();
	},

	refreshCounter: function (counter) {
		var self = this;
		var ok = true;
		_.each(this._instances.categories, function (cat) {
			_.each(self._instances[cat], function (inst) {
				if (!inst.counter.isSubmitted)
					ok = false;
				if (inst.counter == counter) {
					inst.$el.attr('id', inst.$el.attr('id').replace(/counter-red-(\d+)/, "counter-" + self.getColorByCategory(cat) + "-$1"));
					inst.$el.find(".counter-val").html(counter.value);
					inst.$el.find(".tick").addClass("hidden");
					inst.$el.find(".green-tick").removeClass("hidden");
					inst.$el.css("color", "#2266bb")
				}
			})
		});
		if (ok) {
			$("#alert").addClass("invisible");
		}
	},

	fillPage: function (n) {
		this._page = n;
		_.each(this._containers, function (item) {
			item.children().detach();
		});
		for (var i = n * 16; (i < (n + 1) * 16) && (i < this._ribbon.length); i++) {
			if (this._ribbon[i] == this._instances.back) {
				this._instances.back.$el.find(".more").html("Еще " + this.getCountersBefore(i))
				/////////////////
				if (this._nextPressed) {
					var backred = false;
					for (var j = (n - 1) * 16; (j >= 0) && j < n * 16; j++) {
						if (this._ribbon[j].counter && !this._ribbon[j].counter.isSubmitted) {
							this._instances.back.$el.attr("id", "counters-red-back");
							backred = true;
							break;
						}
					}
					if (!backred)
						this._instances.back.$el.attr("id", "counters-back");
				}
				/////////////////
			}
			if (this._ribbon[i] == this._instances.forward) {
				this._instances.forward.$el.find(".more").html("Еще " + this.getCountersAfter(i))
				/////////////////
				if (this._nextPressed) {
					var forwardred = false;
					for (var j = (n + 1) * 16; (j < this._ribbon.length) && j < (n + 2) * 16; j++) {
						if (this._ribbon[j].counter && !this._ribbon[j].counter.isSubmitted) {
							this._instances.forward.$el.attr("id", "counters-red-forward");
							forwardred = true;
							break;
						}
					}
					if (!forwardred)
						this._instances.forward.$el.attr("id", "counters-forward");
				}
				/////////////////
			}
			this._containers[i - n * 16].append(this._ribbon[i].$el);
		}
		if ((n + 1) * 16 >= this._ribbon.length)
			this._nextButton.show();
		else
			this._nextButton.hide();
	},

	getCountersBefore: function (i) {
		var res = 0;
		for (var j = i - 1; j >= 0; j--) {
			if ((this._ribbon[j] != this._instances.back) && (this._ribbon[j] != this._instances.forward)) {
				res++;
			}
		}
		return res;
	},

	getCountersAfter: function (i) {
		var res = 0;
		for (var j = i + 1; j < this._ribbon.length; j++) {
			if ((this._ribbon[j] != this._instances.back) && (this._ribbon[j] != this._instances.forward)) {
				res++;
			}
		}
		return res;
	},

	render: function () {
		this.clear();
		this._nextButton.on(cj.views.events.click, this.onNextButton, this);
		this._prevButton.on(cj.views.events.click, this.onPrevButton, this);
		this._prevButton.show();
		this.fillPage(0);
	},

	onPrevButton: function () {
		if (this._page > 0)
			this.fillPage(this._page - 1);
		else
			this.trigger(cj.views.events.action, "back")
	},

	onNextButton: function () {
		this._nextPressed = true;
		var self = this;
		var ok = true;
		_.each(this._instances.categories, function (item) {
			_.each(self._instances[item], function (inst) {
				if (!inst.counter.isSubmitted) {
					ok = false;
					inst.$el.attr('id', inst.$el.attr('id').replace(/counter-(\w+)-(\d+)/, "counter-red-$2"))
				}
			})
		});
		if (!ok) {
			$("#alert").removeClass("invisible");
			this.fillPage(this._page)
		}
		else {
			this.trigger(cj.views.events.action, 'submitted');
		}
			
	},

	clear: function () {
		this._nextButton && this._nextButton.off()
	},

	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this);
		if (this._nextButton) {
			this._nextButton = null;
		}
	}
})
;
cj.views.TicketsView = cj.views.AbstractView.extend({

	_leftButton: null,
	_rightButton: null,

	_current: 0,
	_total: 0,
	_pages: null,
	_buttons: null,
	_rg: null,

	$container: null,
	$content: null,

	_tickets: null,

	_nextButton: null,

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		this.$el.find("#TicketsView").removeClass('hidden')

		var config = cj.session.get('config')

		this._tickets = _.filter(config.tickets, function (item) {
			return item.receivedValue;
		});

		this._leftButton = new cj.views.Button({
			el: this.$el.find("#left-button")
		});
		this._rightButton = new cj.views.Button({
			el: this.$el.find("#right-button")
		});

		this.$container = this.$el.find('#tickets-container');
		this.$content = this.$el.find('#tickets-content');

		(this._nextButton = options.nextButton).hide();
		this._nextButton.off();
	},

	render: function () {
		this.clear();

		this.addTickets();

		this._leftButton.render();
		this._leftButton.on(cj.views.events.click, this.prev, this);

		this._rightButton.render();
		this._rightButton.on(cj.views.events.click, this.next, this);

		this._nextButton.on('click', this.onNextButton, this)
	},

	onNextButton: function () {
		if (Number(this._currentTicket.summ) > Number(cj.session.get("max_pay_amount"))) {
			this.showPopup({
				"title": "Ошибка",
				"message": "Задолженность по квитанции превышает " + cj.session.get("max_pay_amount") + " рублей. Платеж не может быть совершен на терминале.",
				"closeButtonText": "OK"
			});
			return;
		}
		this.fillSessionFromTicket(this._currentTicket);
		this.trigger("action", "submitted");
	},

	addTickets: function () {
		for (var i = 0; i < this._tickets.length; i++) {
			if (this._tickets[i].receivedValue)
				this.addTicket(this._tickets[i]);
		}
		this.renderTickets();
		this._total = this._pages.length;
		this.showPage(0);
	},

	addTicket: function (fav) {
		if (!this._pages)
			this._pages = [];
		if (!this._pages.length || _.last(this._pages).elements.length == 4)
			this._pages.push({elements: []});
		_.last(this._pages).elements.push(fav);
	},

	renderTickets: function () {
		this._buttons = [];
		for (var i = 0; i < this._pages.length; i++) {
			var page = $('<div class="page"></div>');
			for (var j = 0; j < this._pages[i].elements.length; j++) {
				var id = (i * 4 + j + 1);
				var tick = this._pages[i].elements[j];
				var s = $('<div class="element"><div id="ticket-' + id +
					'" data-code="' + id + '" class="gray-button-big"><div class="button-ico"></div><div class="button-content">' +
					'<p class="condensed-title">№ ' + tick.id + "</p>" +
					'<p class="condensed-font">' + tick.text + "</p>" +
					'<p class="price">' + $.format.number(Number(tick.summ), "##,###.00") + " р.</p>" +

					'</div></div></div>');

				page.append(s)
			}
			this.$content.append(page);
		}
		this._rg = new cj.views.RadioGroupView({el: this.$content, elements: this.$content.find("div[id|='ticket']"), toggleClass: "pressed"});
		this._rg.render();
		this._rg.on('change', this.onRGChange, this)
	},

	onRGChange: function (index, code) {
		this._currentTicket = this._tickets[index];
		this._nextButton.show();
	},

	fillSessionFromTicket: function (ticket) {
		cj.session.set("activeSumm", ticket.summ)
		cj.session.set("activeId", ticket.id)
		cj.session.set("activeText", ticket.text)
		cj.session.set("activeAccount", ticket.account)
	},

	clear: function () {
		if (this._rg) {
			this._rg.off();
			this._rg.clear();
		}
		_.each(this._buttons, function (b) {
			b.off();
			b.clear();
		});
		if (this._leftButton) {
			this._leftButton.off();
			this._leftButton.clear();
		}
		if (this._rightButton) {
			this._rightButton.off();
			this._rightButton.clear();
		}
	},

	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this);
		if (this._rg) {
			this._rg.destroy();
			this._rg = null;
		}
		_.each(this._buttons, function (b) {
			b.destroy();
		});
		this._buttons && (this._buttons = null);

		if (this._leftButton) {
			this._leftButton.destroy();
			this._leftButton = null;
		}
		if (this._rightButton) {
			this._rightButton.destroy();
			this._rightButton = null;
		}
		this.$content && (this.$content = null);
		this.$container && (this.$container = null);
	},

	prev: function () {
		if (this._current - 1 >= 0) {
			this.showPage(this._current - 1)
		}
	},

	next: function () {
		if (this._current + 1 < this._total) {
			this.showPage(this._current + 1)
		}
	},

	showPage: function (number) {
		this._current = number;
		this.$content.animate({marginLeft: (-number * 1000).toString()});
		number ? this._leftButton.show() : this._leftButton.hide();
		(number == this._total - 1) ? this._rightButton.hide() : this._rightButton.show();
	}
});
cj.views.SelectView = cj.views.AbstractView.extend({

	_delegate: null,

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options)

		var self = this
		var config = cj.session.get('config')

		this._delegate = config.params.helper.getView('select', options)

		// Трансляция событий
		this._delegate.on(cj.views.events.popup, function(data){
			self.trigger(cj.views.events.popup, data)
		})
		this._delegate.on(cj.views.events.action, function(data){
			self.trigger(cj.views.events.action, data)
		})

		// Заголовок и комментарии из конфига
		$("#header").html(config.params.selectElementHeaderText)
		$("#comment").html(config.params.selectElementCommentText)
	},

	render: function () {
		this._delegate.render()
	},

	clear: function () {
		this._delegate.clear()
	},

	destroy: function () {
		this._delegate.off()
		this._delegate.destroy()
		cj.views.AbstractView.prototype.destroy.call(this)
	}

});
cj.views.ChangeOptionsView = cj.views.AbstractView.extend({

	mobileButton: null,
	walletButton: null,

	_prevButton: null,

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		this.mobileButton = new cj.views.Button({
			el: this.$el.find('#mobile-button')
		});
		this.walletButton = new cj.views.Button({
			el: this.$el.find('#wallet-button')
		});
		this._prevButton = options.prevButton;
		this._prevButton.off();
		this._prevButton.on('click', this.prevPage, this);
		this._prevButton.show();
	},

	render: function () {
		this.clear();

		this.mobileButton.on(cj.views.events.click, this.onMobileButton, this);
		this.mobileButton.render();

		this.walletButton.on(cj.views.events.click, this.onWalletButton, this);
		this.walletButton.render();

	},

	onWalletButton: function () {
		cj.session.set('change_option', 'wallet');
		this.trigger(cj.views.events.action, 'wallet');
	},

	onMobileButton: function () {
		cj.session.set('change_option', 'mobile');
		this.trigger(cj.views.events.action, 'mobile');
	},

	prevPage: function () {
		this.trigger(cj.views.events.action, cj.session.get("no_counters") ? "no_counters" : "counters");
	},

	clear: function () {
		this.mobileButton && this.mobileButton.off() && this.mobileButton.clear();
		this.walletButton && this.walletButton.off() && this.walletButton.clear();
	},

	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this);

		if (this.mobileButton) {
			this.mobileButton.destroy();
			this.mobileButton = null;
		}
		if (this.walletButton) {
			this.walletButton.destroy();
			this.walletButton = null;
		}
	}

})
;
cj.views.ShadowView = cj.views.AbstractView.extend({

	_prvId: null,
	_title: null,
	_message: null,


	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);
		cj.log.clear();

		this._prvId = cj.session.get("PrvId2");
		this._title = this._model.get('load_error_popup').title;
		this._message = this._model.get('load_error_popup').message;
	},

	render: function () {
		this.clear();

		this.showPreloader('');

		var self = this;

		simplex.ProviderInfoRequest.on('success', function(data) {
			simplex.ProviderInfoRequest.off();

			self.hidePreloader();

			// Запись в сессию минимальной суммы на сдачу
			var result = {"minCash2": data.profiles[0].min || 0};
			self.trigger(cj.views.events.action, 'submitted', result);
			
		});
		simplex.ProviderInfoRequest.on('failure', function(data) {
			simplex.ProviderInfoRequest.off();
			self.hidePreloader();

			// Увдомеление и переход назад
			self.showPopup({
				"title": self._title,
				"message": self._message,
				"closeButtonText": "Назад",
				closeButtonCallback: function () {
					self.trigger(cj.views.events.action, 'failure');
				}
			});
		});
		simplex.ProviderInfoRequest.load(this._prvId);

	},

	clear: function () {
		this.hidePreloader();
	},

	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this)
	}

})

cj.views.CashPaymentView = cj.views.AbstractView.extend({

	_payment: null,

	_top: null,
	_more: null,
	_provider: null,
	_terminalComissionBlock: null,
	_change: null,
	_lowCashWarning: null,
	_commissionInfo: null,

	_failCount: 3,
	_paymentInProcess: false,

	_summ: 0,
	_minCash: 0,
	_minCash2: 0,
	_maxCash: 0,
	_cashSumm: 0,
	_terminalCommission: 0,
	_paySumm: 0,
	_paySumm2: 0,
	_commisSumm2: 0,

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);

		console.clear();

		this._config = cj.session.get('config');
		this._summ = this._config.params.helper.getCashSum(this);
		cj.session.set("_extra_fixed_int_summ", this._summ);

		this._minCash = cj.round2(Number(this._summ));
		this._minCash2 = Number(cj.session.get('minCash2'));
		this._maxCash = Number(cj.session.get('max_pay_amount'));


		var self = this;
		this._nextButton = options.nextButton;

		this._payment = new cj.maratl.payments.Change(this._model.get("payment_options"));

		this._payment.on('validator:on', this.onValidatorOn, this);
		this._payment.on('validator:alert', this.onValidatorAlert, this);
		this._payment.on('validator:timeout', this.onValidatorTimeout, this);
		this._payment.on('paysuccess', this.onPaySuccess, this);
		this._payment.on('receipt', this.onFiscalReceipt, this);
		this._payment.set('MinCashLimit', this._minCash);
		this._payment.set('MinCashLimit2', this._minCash2);

		this._top = new cj.views.CashBlockView({el: this.$el.find("#top")});
		this._more = new cj.views.CashBlockView({el: this.$el.find("#more")});
		this._provider = new cj.views.CashBlockView({el: this.$el.find("#provider")});
		this._terminalComissionBlock = new cj.views.CashBlockView({el: this.$el.find("#terminal-commission")});
		this._change = new cj.views.CashBlockView({el: this.$el.find("#change")});
		this._changeComission = new cj.views.CashBlockView({el: this.$el.find("#change-commission")});

		this._lowCashWarning = this.$el.find(".cash-warning");

		//timeout
		cj.timeout.off();
		cj.timeout.clickResetEnabled = false;
		cj.timeout.reset(150000);
		cj.timeout.on('timeout', function () {
			if (self._payment.isValidatorOn) {
				self._payment.on('validator:off', self.onValidatorOff_Timeout, self);
				self._payment.turnValidatorOff();
			} else {
				self.onValidatorTimeout(null);
			}
		});

		// Скрываем попап, если разрешено частичное погашение задолженности
		if (this._config.params.allowParticalPayment) {
			$("#alert").hide();
		}
	},

	render: function () {
		this.clear();

		this._nextButton.on('click', this.onNextButton, this);

		this._top.label("Внесите деньги");
		this._top.value("");
		this._top.comment("Вносимая сумма должна быть не менее 1 и не более " + $.format.number(isNaN(this._maxCash) ? 0 : this._maxCash, "##,###.00") + " руб.");

		this._more.label("К оплате: ");
		this._more.value($.format.number(isNaN(this._minCash) ? 0 : this._minCash, "##,###.00"));
		this._more.comment("");

		this._provider.label("Сумма платежа к зачислению");
		this._provider.value("0.00");
		this._provider.comment("");

		//this._terminalComissionBlock.label("");
		this._terminalComissionBlock.value("0.00");
		//this._terminalComissionBlock.comment("");

		this._change.label("Автомат сдачи не выдает");
		this._change.value("");
		this._change.comment("Сдача будет полностью зачислена на " + ((cj.session.get('change_option') == "mobile") ? "баланс вашего мобильного телефона " : "ваш Visa QIWI Wallet № ") + cj.session.get('phone'));

		this._changeComission.label("");
		this._changeComission.value("");
		this._changeComission.comment("");

		var params = {
			"_extra_comment": cj.APP_VERSION
		};

		var oper_type = cj.session.get('oper_type');
		_.each(this._config.pages[oper_type], function (item) {
			if (item.fieldName == "startdate_enddate") {
				params["_extra_start_date"] = cj.session.get("fields_period_start");
				params["_extra_end_date"] = cj.session.get("fields_period_end");
			} else if (item.fieldName == "account") {
			} else if (item.fieldName == "period") {
				params["_extra_" + item.fieldName] = cj.session.get("fields_" + item.fieldName + "_formatted_for_online");
			} else {
				params["_extra_" + item.fieldName] = cj.session.get("fields_" + item.fieldName);
			}
		});

		params = this._config.params.helper.addParams(this, params);

		this._payment.start(params);
	},

	formatDate: function (d) {
		var res = (d.getMonth() + 1).toString() + "." + d.getFullYear();
		return res.length == 6 ? ("0" + res) : res
	},

	clear: function () {
		this.hidePreloader();
		if (this._nextButton){
			this._nextButton.off('click', this.onNextButton, this);
		}
	},

	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this);
		if (this._payment) {
			this._payment.destroy();
		}
		if (this._commissionInfo){
			this._commissionInfo.destroy();
		}
	},
	getOptions: function (options) {
		var s = "";
		for (var key in options) {
			s += key + "=" + options[key] + "\r\n";
		}
		return s;
	},

	onValidatorOn: function (options) {
		this._minCash = options.MinCash || this._minCash;

		if (options.ValOn && options.ValOn == "false") {
			this.trigger('action', 'validator_error');
			return;
		}

		this._top.label("Внесенная сумма");
		this._top.value("0.00");
		this._top.comment("Вносимая сумма должна быть не менее " + $.format.number(Number(this._minCash), "##,###") + " и не более " + $.format.number(isNaN(this._maxCash) ? 0 : this._maxCash, "##,###.00") + " руб.");

		this._more.label("Внесите еще: ");
		var v = (Number(this._minCash) - Number(this._cashSumm));
		this._more.value($.format.number(isNaN(v) ? 0 : v, "##,###.00"));

		this._provider.value("0.00");
		this._provider.comment("");

		this._nextButton.show();
	},

	onValidatorOff_Timeout: function (options) {
		if (options.ValOff == "true") {
			this.onValidatorTimeout(null);
		}
		this._payment.off('validator:off', this.onValidatorOff_Timeout, this);
	},

	onValidatorOff: function (options) {
		if (options.ValOff == "true") {
			this._paymentInProcess = true;
			this._payment.createPay();
		}
		this._payment.off('validator:off', this.onValidatorOff, this);
	},

	onValidatorOff_ZeroCash: function (options) {
		if (options.ValOff == "true") {
			this.trigger('action', 'zero_cash');
		}
		this._payment.off('validator:off', this.onValidatorOff_ZeroCash, this);
	},

	onValidatorAlert: function (options) {
		cj.timeout.reset(150000);

		if (options.CashSumm && Number(options.CashSumm) > 0) {

			this._cashSumm = Number(options.CashSumm);
			cj.session.set('payed_summ', this._cashSumm);
			this._top.value($.format.number(this._cashSumm, "##,###.00"));
			var toMore = Number(this._minCash) - Number(this._cashSumm);
			this._more.value($.format.number(toMore >= 0 ? toMore : 0, "##,###.00"));
			this.hideWarning();
		}

		this._terminalComissionBlock.label("Терминальная комиссия");
		this._terminalComissionBlock.value("0.00");
		if ((options.CommisSumm > 0) && (this._cashSumm > 0)) {
			this._terminalCommission = options.CommisSumm;
			this._terminalComissionBlock.value($.format.number(this._terminalCommission, "##,###.00"));
		}

		if (options.PaySumm) {
			this._paySumm = Number(options.PaySumm);
		}

		if (Number(options.PaySumm2) > 0) {
			this._more.clearText();
			this._change.label("Сдача");
			this._change.value($.format.number(Number(options.PaySumm2), "##,###.00"));
		}

		if (Number(options.CommisSumm2) > 0) {
			this._changeComission.label("Комиссия на сдачу");
			this._changeComission.value($.format.number(Number(options.CommisSumm2), "##,###.00"));
		}

		this._provider.value($.format.number(Number(this._paySumm), "##,###.00"));

		// Печать чека
		if (this._cashSumm > 0) {
			if(this._config.params.allowParticalPayment){
				// Если разрешена оплата частичной суммы
				this.printTheBill();

			} else {
				// Если запрещена оплата частичной суммы
				// Почему-то это неправильно
				// if (this._paySumm >= this._minCash) {
				// А правильно это
				if (this._cashSumm >= this._minCash) {
					this.printTheBill();
				} else {
					this.printFailBill();
				}
					
			}
		} else {
			this.printFailBill();
		}

	},
	printFailBill: function () {
		var params = {};
		params['_receipt_prt_account'] = this._config.params.prtAccount;
		if (!this._config.params.allowParticalPayment) {
			params['_receipt_'] = "Внесена сумма, недостаточная для погашения задолженности. Платеж проведен не будет. Обращайтесь в тех. поддержку по телефонам, указанным на чеке.";
		}
		this._payment.sendExtras(params);
	},

	printTheBill: function () {

		var last_name = "";
		var params = {};
		params['_receipt_prt_account'] = this._config.params.prtAccount;
		params['_receipt_'] = " ";
		params['_receipt_Заявка на оплату товаров/услуг'] = this._config.longName;

		_.each(this._config.pages[cj.session.get('oper_type')], function (item) {
			params["_receipt_" + item.fieldLabel] = cj.session.get('fields_' + item.fieldName + "_formatted");
			last_name = item.fieldLabel;
		});
		params["_receipt_" + last_name] += "\n";



		_.each(this._config.params.helper.getSelectors(), function (item) {
			if (!item.category && item.type.indexOf("receipt") >= 0) {
				if(item.name && item.value) {
					params["_receipt_" + item.name] = item.value;
					last_name = item.name;
				}
				if(!item.name && item.value) {
					params["_receipt_Квитанция"] = item.value;
				}
			}
		});
		params["_receipt_" + last_name] += "\n";



		_.each(this._config.params.helper.getSelectors(), function (item) {
			if (item.category && item.isSubmitted && item.type.indexOf("receipt") >= 0) {
				params["_receipt_" + item.name] = item.value;
				last_name = item.name;
			}
		});
		params["_receipt_" + last_name] += "\n";

		// Засылаем поля чека по очереди
		for(var key in params) {
			cj.maratl.send(key, params[key]);
		}

	},

	onPaySuccess: function (options) {

		cj.session.set('sum_to_provider', this._paySumm.toString());
		cj.log.l("pay success");

		this.trigger("action", this._cashSumm >= this._minCash ? 'success' : 'fail');
	},

	onFiscalReceipt: function (options) {

		if (options.FiscalReceipt.toLowerCase() == "wait") {
			cj.timeout.reset();
			this.showPreloader();
		} else {
			cj.session.set("fiscal_receipt", options.FiscalReceipt);
		}
	},

	onValidatorTimeout: function (options) {
		var self = this;
		if (this._cashSumm == 0) {
			setTimeout(function () {
				self.trigger('action', 'validator_timeout');
			}, 100);
		} else {
			this._paymentInProcess = true;
			this._payment.createPay();
		}
	},

	onNextButton: function () {

		if (!this._nextButton || !this._nextButton.isVisible()){
			return;
		}
		if (this._payment._collectingValAlert) {
			if (!this._timeoutNext) {
				this._timeoutNext = true;
				setTimeout(this.onNextButton, 1000);
			}
			return
		}
		this._timeoutNext = false;
		if (this._cashSumm < this._minCash) {
			this.showWarning();
		}
		// Если наличных не внесено
		if (this._cashSumm == 0) {
			if (this._payment.isValidatorOn) {
				if(this._failCount) {
					// Показываем предупреждение и уменьшаем счётчик
					this.showWarning();
					this._failCount--;
				} else {
					// Выключаем купюроприёмник
					this._payment.on('validator:off', this.onValidatorOff_ZeroCash, this);
					this._payment.turnValidatorOff();
				}
			}
			return;
		}
		if (!this._paymentInProcess) {
			this._payment.on('validator:off', this.onValidatorOff, this);
			this._payment.turnValidatorOff();
		}
	},

	showWarning: function () {
		this._lowCashWarning.removeClass("hidden");
	},

	hideWarning: function () {
		this._failCount = 3;
		this._lowCashWarning.addClass("hidden");
	},

	update: function () {
	}

});
;
cj.views.ComboView = cj.views.AbstractView.extend({

	_nextButton: null,
	_prevButton: null,
	_exitButton: null,

	_navGenerator: null,
	_currentPageInstance: null,

	_startParams: null,
	_config: null,

	_layoutManager: null,

	_onlineStatus: null,

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options);

		this._nextButton = options.nextButton;
		this._prevButton = options.prevButton;
		this._exitButton = options.exitButton;
		this._header = $("#header");

		this._config = cj.session.get('config');
		this._startParams = cj.session.get('startParams');

		this.buttonsOff();
		this.buttonsOn();

		if (this._config.params.operType != "0"){
			this.operationType(this._config.params.operType);
		}

		this._navGenerator = new simplex.NavGenerator(this._config, this._startParams);
	},

	buttonsOff: function () {
		this._nextButton.off();
		this._prevButton.off();
	},
	buttonsOn: function () {
		this._prevButton.on('click', this.prevPage, this);
		this._nextButton.on('click', this.nextPage, this);
	},

	prevPage: function () {
		if (this._navGenerator.hasPrev()) {
			this._navGenerator.prev();
			this.render();
		}
	},
	nextPage: function () {
		var self = this;
		if (!this._layoutManager.validate() || !this._layoutManager.preValidate()) {
			self.showPopup({
				title: 'Ошибка!',
				message: self._navGenerator.currentPage.errorMessage
			});
			return;
		}
		this._layoutManager.submit();

		//cj.session.show();
		if (this._navGenerator.hasNext()) {
			this._navGenerator.next();
			this.render();
		} else {
			this.performOnline();
		}
	},

	performOnline: function () {

		this.showPreloader();
		this._onlineStatus = {disps: {}, hasAny: false, timeout: -1};

		_.each(cj.session.get("config").counters, function (item) {
			item.value = null;
			item.receivedValue = false;
		});

		cj.maratl.on('response', this.onMaratlResponse, this);
		cj.maratl.sendRequest(
			"PrvId=" + cj.session.get("startParams").prvId +
				"&PrvName=" + cj.session.get("PrvName") +
				"&AccNum=" + cj.session.get("fields_account") +
				"&_extra_INFO_REQUEST=true" +
				"&SetFakeEmbedMode=true" +
				this.addParams() + "&CreateOnlinePay=true");

	},
	addParams: function () {
		var res = "", oper_type = cj.session.get('oper_type');
		_.each(cj.session.get('config').pages[oper_type], function (item) {
			if (item.fieldName == "startdate_enddate") {
				res += "&_extra_start_date=" + cj.session.get("fields_period_start") +
					"&_extra_end_date=" + cj.session.get("fields_period_end");
			} else if (item.fieldName == "account") {
			} else if (item.fieldName == "period") {
				res += "&_extra_" + item.fieldName + "=" + cj.session.get("fields_" + item.fieldName + "_formatted_for_online");
			} else {
				res += "&_extra_" + item.fieldName + "=" + cj.session.get("fields_" + item.fieldName);
			}
		});
		return res;
	},

	onMaratlResponse: function (key, val) {
		if (key == 'AccDenied' || key == 'PrvDenied') {
			this.onError(key);
		}
		if (key == "OnlineRequest") {
			if (val != 0) {
				this.onError(val);
			}
		}
		if (key.indexOf("disp") == 0) {
			this.processDisp(key, val)
		}
	},
	
	processDisp: function (key, val) {
		cj.log.l('processDisp');
		cj.log.l('key=' + key + ' val=' + val);
		val = val.replace(/\n$/g, '');
		val = val.replace(/\r$/g, '');
		cj.log.l('val=' + val);

		var self = this;
		if (!this._onlineStatus.hasAny) {
			this._onlineStatus.hasAny = true;
			this._onlineStatus.timeout = setTimeout(function () {
				self.onSuccess();
			}, 5000);
		}
		this._onlineStatus.disps[key] = val;
	},

	onSuccess: function () {
		this._config.params.helper.onSuccessOnline(this)
	},

	onError: function (key) {
		this._config.params.helper.onFailureOnline(this, key)
	},

	navigateNext: function () {
		this.trigger(cj.views.events.action, 'submitted');
	},

	operationType: function (val) {
		if (val || val == 0 || val == "")
			cj.session.set('oper_type', val.toString());
		return cj.session.get('oper_type');
	},

	render: function () {
		var self = this;
		this.clear();

		var ph = $("#path-header");
		ph.html(this._config.longName);

		this._nextButton.hide();
		this._navGenerator.currentPageIndex ? this._prevButton.show() : this._prevButton.hide();

		this._layoutManager = new simplex.layouts.LayoutManager(this.$el.find("#ComboView"), this._navGenerator.currentPage, this._model);
		this._layoutManager.on('update', function () {
			this.preValidate() ? self._nextButton.show() : self._nextButton.hide();
			if (self._navGenerator.currentPage.layout == "Buttons")
				self._nextButton.hide()
		});
		this._layoutManager.on('next', function () {
			self.nextPage();
		});
		this._layoutManager.on('action', function (a) {
			self.trigger('action', a);
		});
		cj.statistics.append(window.COREJS_APP_INSTANCE._current_page_code + "." + self._navGenerator.currentPage.order);
		this._layoutManager.render();
		this._header.html(this._navGenerator.currentPage.title);

	},

	clear: function () {
		if (this._layoutManager) {
			this._layoutManager.off();
			this._layoutManager.destroy();
			this._layoutManager = null;
		}
		if (this._header)
			this._header.empty();
	},

	destroy: function () {
		cj.views.AbstractView.prototype.destroy.call(this);
		if (this._nextButton)
			this._nextButton = null;
		if (this._prevButton)
			this._prevButton = null;
		if (this._exitButton)
			this._exitButton = null;
	}
})
;

cj.views.FinalView = cj.views.AbstractView.extend({

	initialize: function (options) {
		cj.views.AbstractView.prototype.initialize.call(this, options)

		if (cj.session.get('payment_method') == 'cash') {
			var v = cj.session.get("fiscal_receipt");
			if (v && v.toLowerCase() == "false") {
				this.$el.find(".fiscal").removeClass("hidden")
			}
		}
	}
});
var pages_cache = {};

var Page = Backbone.Model.extend({

	defaults: {
		header: "",
		path: "",
		id: "",
		file_name: "",
		template_name: "",
		container_class: "",
		prev_page: "none",
		next_page: "none",
		exit_page: "stat",
		content: "",
		type: "content"
	},

	fetch: function () {
		var mod = this;
		if (mod.get("type") == "content") {
			$.ajax(
				{
					url: 'pages/' + mod.id + '.html',
					dataType: 'html',
					data: {}
				}
			).done(function (data) {
					mod.set({"content": data, "loaded": true});
				})
		}
		//else if (this.get("type") == "template") {
		//	mod.set({"content":Handlebars.templates[mod.get("template_name")](mod.attributes), "loaded":true})
		//}
	},

	initialize: function () {
		this.set("loaded", false);
		this.fetch();
	}

});

var AppView = Backbone.View.extend({
	el: $('#content-wrapper'),
	$wrapper: $('#wrapper'),
	$header: $('#header'),
	$path: $('#path-header'),
	$comment: $('#comment'),

	$popup: null,
	$popupButtons: null,
	$popupLightbox: $("#popup-lightbox"),
	$preloader: null,

	_current_view: null,

	initialize: function () {
		(this.exit = new cj.views.Button({el: $('#exit'), isSlow: true})).render();
		(this.prev = new cj.views.Button({el: $('#prev'), isSlow: true})).render();
		(this.next = new cj.views.Button({el: $('#next'), isSlow: true})).render();

		this.setButtonEvents();
		$('#version').html(cj.APP_VERSION);
	},

	addHeaders: function () {
		var h = this.model.get("header");
		if (h)
			this.$header.html(h);

		var p = this.model.get("path");
		if (p)
			this.$path.html(p);

		var c = this.model.get("comment");
		if (c)
			this.$comment.html(c);
	},

	setButtonEvents: function () {
		this.prev.off();
		this.next.off();
		this.exit.off();
		this.prev.on(cj.views.events.click, function (page) {
			if (this.model.get("prev_page") != "none")
				this.trigger(cj.events.change, page);
		}, this);
		this.next.on(cj.views.events.click, function (page) {
			if (this.model.get("next_page") != "none")
				this.trigger(cj.events.change, page);
		}, this);
		this.exit.on(cj.views.events.click, function (page) {
			this.trigger(cj.events.change, page);
		}, this);
	},

	updateNavButton: function (button, property) {
		if (this.model.get(property) != "none") {
			button.show();
			if (this.model.get(property) == "last")
				button.code(cj.session.get("last_page"));
			else
				button.code(this.model.get(property));

		} else {
			button.hide();
		}
	},

	updateClasses: function () {
		if (this.model.get("container_class")) {
			this.$el.addClass(this.model.get("container_class"));
		}
		if (this.model.get("wrapper_class")) {
			this.$wrapper.addClass(this.model.get("wrapper_class"));
		}
	},

	applyView: function () {
		if (this.model.get("class")) {
			this._current_view = new cj.views[this.model.get("class")]({
				el: this.$el,
				model: this.model,
				nextButton: this.next,
				prevButton: this.prev,
				exitButton: this.exit
			});

			this._current_view.on(cj.views.events.action, this.onAction, this);
			this._current_view.on(cj.views.events.popup, this.popupAction, this);
			this._current_view.on(cj.views.events.preloader, this.preloaderAction, this);
			this._current_view.render();
		}
	},

	onAction: function (action, data) {
		if (action == 'submitted') {
			for (var key in data) {
				cj.session.set(key, data[key])
			}
		}
		//cj.session.show();

		var events = this.model.get("nav_events");
		if (events && events[action]) {
			this.trigger(cj.events.change, events[action]);
		}
	},

	popupAction: function (data) {
		switch (data.state) {
			case 'show':
				this.showPopup(data);
				break;
			case 'hide':
				this.hidePopup(data);
		}
	},
	preloaderAction: function (data) {
		switch (data.state) {
			case 'show':
				this.showPreloader(data);
				break;
			case 'stop':
				this.stopPreloader(data);
				break;
			case 'hide':
				this.hidePreloader(data);
		}
	},

	showPopup: function (popupOptions) {
		var self = this;
		var name = popupOptions.content ? '#popup-' + popupOptions.content : "#default-popup";
		if (this.$popup = $(name)) {

			this.$popup.find('.title').text(popupOptions.title || "");
			this.$popup.find('.message').text(popupOptions.message || "");

			// default buttons
			this.$popupButtons = [];
			var $b;
			if ($b = this.$popup.find(name + '-close-button')) {
				var b = new cj.views.Button({el: $b});
				b.on(cj.views.events.click, self.hidePopup, self).render();
				b.content(popupOptions.closeButtonText || "Назад");
				if (popupOptions.closeButtonCallback)
					b.on(cj.views.events.click, popupOptions.closeButtonCallback, popupOptions.context);
				this.$popupButtons.push(b);
			}

			// custom buttons
			_(popupOptions.buttons).each(function (value, key) {
				if ($b = self.$popup.find(name + "-" + key + '-button')) {
					var b = new cj.views.Button({el: $b});
					b.on(cj.views.events.click, popupOptions.context[value], popupOptions.context).render();
					self.$popupButtons.push(b);
				}
			});

			this.$popup.show()
			this.$popupLightbox.show()
		}
	},

	hidePopup: function (popupOptions) {
		if (this.$popup) {
			this.$popup.hide();
			this.$popupLightbox.hide();
			_(this.$popupButtons).each(function (b) {
				b.off();
				b.destroy();
			});
			this.$popupButtons = null;
		}
	},

	showPreloader: function (options) {
		var name = options.content ? '#preloader-' + options.content : "#default-preloader";
		if (this.$preloader = $(name)) {
			(this.$preloader = new cj.views.PreloaderView({el: this.$preloader, text: options.text})).render();
			this.$preloader.show()
		}
	},

	hidePreloader: function (options) {
		if (this.$preloader) {
			this.$preloader.stop();
			this.$preloader.hide();
			this.$preloader.destroy();
			this.$preloader = null;
		}
	},

	stopPreloader: function (options) {
		if (this.$preloader) {
			this.$preloader.stop();
		}
	},

	render: function () {
		this.clear();
		var self = this;
		if (!this.model.get("loaded"))
			return this;

		this.addHeaders();

		this.updateNavButton(this.prev, "prev_page");
		this.updateNavButton(this.next, "next_page");
		this.updateNavButton(this.exit, "exit_page");
		this.setButtonEvents();

		this.updateClasses();

		this.$el.html(this.model.get("content"));

		cj.timeout.off();
		cj.timeout.reset(this.model.get("timeout"));
		cj.timeout.clickResetEnabled = true;
		cj.timeout.on(cj.timeout.events.timeout, function () {
			cj.session.set('timeout_exit', 'true');
			self.trigger(cj.events.change, cj.TIMEOUT_PAGE);
		});

		this.applyView();
		return this;
	},

	clear: function () {
		this.$el.empty();
		this.$el.removeClass();
		this.$wrapper.removeClass();

		if (this._current_view) {
			this._current_view.destroy();
			this._current_view.off();
			this._current_view = null;
		}
	},

	destroy: function () {
		this.clear();
		this.next.off();
		this.next.destroy();
		this.prev.off();
		this.prev.destroy();
		this.exit.off();
		this.exit.destroy();
		this.$preloader.off();
		this.$preloader.destroy();
		this.$el = null;
	},

	setModel: function (model) {
		if (this.model)
			this.model.off();
		this.model = model;
		this.listenToModelChange()
	},

	listenToModelChange: function () {
		this.model.on(cj.events.change, this.render, this)
	}

});

var App = Backbone.Router.extend({
	_appView: null,
	_pages: null,
	_current_page_code: "",
	_current_page_content: "",
	_start_page: "1",

	initialize: function (options) {
		var t = this;
		var flag = false;
		var script = document.getElementById('app-config');
		var closure = function () {
			if (flag == true)
				return;
			flag = true;
			cj.APP_VERSION = APP_CONFIG.options.version;
			cj.APP_VERSION_SHORT = APP_CONFIG.options.shortVersion;
			cj.TIMEOUT_PAGE = APP_CONFIG.options.timeout_page;
			cj.LOG_ENABLED = APP_CONFIG.options.log == "true";
			cj.USE_JS_SESSION = APP_CONFIG.options.single_page_app == "true";
			cj.SECURE_MARATL_LOGGING = !(APP_CONFIG.options.disable_secure_maratl_logging == "true");
			if (APP_CONFIG.options.test_mode == "true")
				cj.maratl.TEST_MODE_ON();
			if (APP_CONFIG.options.start_page)
				t._start_page = APP_CONFIG.options.start_page;

			for (var prop in APP_CONFIG.session) {
				cj.session.set(prop, APP_CONFIG.session[prop]);
			}

			t._pages = APP_CONFIG.pages;
			for (var ch in t._pages) {
				t._pages[ch].id = ch
			}
			t._appView = new AppView();
			t._appView.on(cj.events.change, function (page) {
				t.page.apply(t, [page])
			});
			t.microsite()
		};
		script.onreadystatechange = function () {
			if ((this.readyState == 'complete' || this.readyState == 'loaded')) {
				closure();
			}
		};
		script.onload = closure;
		script.src = 'config.js';
		script = null;
	},

	microsite: function () {
		this.page(this._start_page);
	},

	page: function (code) {
		if (this._pages[code]) {
			if (this._current_page_code && this._pages[this._current_page_code].prev_target == "true")
				cj.session.set("last_page", this._current_page_code);
			this._current_page_code = code;
			this.renderView()
		} else {
			this.destroy();
			document.location = code;
		}
	},

	destroy: function () {
		if (this._appView) {
			this._appView.destroy();
			this._appView.off();
			this._appView = null;
		}
		cj.maratl.off();
		cj.timeout.off();
	},

	renderView: function () {
		var code = this._current_page_code;
		cj.statistics.append(code);

		this._current_page_content = pages_cache[code] || (pages_cache[code] = new Page(this.getOptions(code)));
		this._appView.setModel(this._current_page_content);
		this._appView.render()
	},

	getOptions: function (code) {
		return this._pages[code];
	}
});


if (!window.console) {
	window.console = {
		log: function (value) {
			cj.log.l(value)
		},
		clear: function () {
			cj.log.clear()
		},
		show: function () {
			cj.log.show()
		},
		hide: function () {
			cj.log.hide()
		}
	}
}
else {
	window.console.clear = function () {
		cj.log.clear()
	}
}

