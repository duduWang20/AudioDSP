/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
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

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
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

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
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
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

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
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

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

	// Support: Android<4.1, IE<9
	trim: function( text ) {
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
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
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
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
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
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
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
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
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
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

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
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
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
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
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
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

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

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
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
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
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
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
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

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
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

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
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

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
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

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
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

	return doc;
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

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

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
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
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

	attrHandle: {},

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
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

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
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

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

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
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
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
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
							idx = indexOf( seed, matched[i] );
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
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
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
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

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
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
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
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
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

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
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
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
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
};

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
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

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
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
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

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
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
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

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
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
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
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
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
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
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

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
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
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
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
					// Intentionally let the error be thrown if parseHTML is not present
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
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
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

jQuery.fn.extend({
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

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
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
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

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

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
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
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
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
				firingLength = 0;
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
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
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
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
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
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
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


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
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
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

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


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

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

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

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
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
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
	if ( typeof name === "string" ) {

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

	var thisCache, i,
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

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
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
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
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
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
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

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


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

		while ( i-- ) {
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
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
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
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
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
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

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
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
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
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

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

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
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
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

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
			args = slice.call( arguments ),
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

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

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
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
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
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
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
			{
				type: type,
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
			if ( typeof elem[ name ] === strundefined ) {
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
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

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
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
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
if ( !support.submitBubbles ) {

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
if ( !support.changeBubbles ) {

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
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
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
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
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
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
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
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
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
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
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

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
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
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

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
		if ( !support.appendChecked ) {
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
			deleteExpando = support.deleteExpando,
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

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

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

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

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

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
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

					callback.call( this[i], node, i );
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
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
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
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

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

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

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

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
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
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

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
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
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
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

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
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

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

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
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

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
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
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
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
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
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

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

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

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
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
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


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

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

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

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

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
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
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
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

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

	jQuery.map( props, createTween, animation );

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

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
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

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

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

jQuery.timers = [];
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
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
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


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
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
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
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
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
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
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
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
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
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
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
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
	}
});

// Hook for boolean attributes
boolHook = {
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

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
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
	nodeHook = {
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
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
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




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
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
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
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
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
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
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
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
			classes = ( value || "" ).match( rnotwhite ) || [];

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

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

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

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

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
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
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
	}
});




// Return jQuery for attributes-only inclusion


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

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
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
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
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
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

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
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
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
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
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

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
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

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
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
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
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
		}
	}

	return { state: "success", data: response };
}

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
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

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
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
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
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

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
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
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

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

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
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
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

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
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


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
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
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

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

// Serialize an array of form elements or a set of
// key/values into a query string
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

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
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
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
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

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
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
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
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
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
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




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
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

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
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
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

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
	offset: function( options ) {
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
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
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
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
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

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
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


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

/*
 * @script: shared/gnav/clientlibs/js/gnav.js
 * @author: sunier 10/2/2018
 */
if (typeof DEBUG === "undefined" ) {
    var DEBUG = (location.href.indexOf("DEBUG=true")) > 0 ? true : false;
}

if (DEBUG) {
    console.log("[INFO] Loaded script: /components/shared/gnav/clientlibs/js/gnav.js");
}

// find LiveEngage links
function findContactElements () {
    var contactElements = [];
    $('a[href*="contact.html"]:not(.Gnav-submenu-cta)').each( function(i, link) {
        contactElements.push(link);
    });
    $('a[href*="contact/support.html"]').each( function(i, link) {
        contactElements.push(link);
    });
    $('a[href*="chat-console.html"]').each( function(i, link) {
        contactElements.push(link);
    });

    return contactElements;
}

// add disabled attribute to all elements with contact or support links
function disableContactElements () {
    var contactElements = findContactElements();
    for (var i=0; i<contactElements.length; i++) {
        $(contactElements[i]).attr('disabled', 'disabled')
    }
}

// function to enable live person chat through link attributes
function enableLP() {
    var contactElements = findContactElements();
    try {
        for (var i=0; i<contactElements.length; i++) {
            $(contactElements[i]).removeAttr('disabled');
            $(contactElements[i]).removeAttr('data-feds-action');
        }
    } catch (err) {
        if (DEBUG) console.log("[ERROR] " + err.message);
    }
}

// function to enable liveEngage chat through link attributes
function enableLE() {
    var contactElements = findContactElements();
    try {
        for (var i=0; i<contactElements.length; i++) {
            $(contactElements[i]).attr('data-feds-action', 'open-jarvis-chat');
            $(contactElements[i]).removeAttr('disabled');
        }
    } catch (err) {
        if (DEBUG) console.log("[ERROR] " + err.message);
    }
}

$(document).ready(function () {
    //
});

/**
 *  Shared Clientlibs files for buy now button login on templates.
 *
 *  Include
 *  shared.buy-button in the embed for clientlibs
 *
 *  and Include
 *  document.addEventListener("DOMContentLoaded", function() {
            buyButton.init(document.location.href);
        });
 *
 *  In the page init function for the specific template
 *
 @Script: /apps/help/components/product-hub/clientlibs/js/product-hub.js
 */

var buyButton = (function(){

    var _forbiddenBuyPaths = [];

    if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
            'use strict';
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }

    function _checkIfBuyButtonAllowed(pageUrl){
        for(var i = 0; i < _forbiddenBuyPaths.length; i++){
            if(pageUrl.includes(_forbiddenBuyPaths[i])){
                return false;
            }
        }
        return true;
    }

    function _init(pageUrl){
        var event = new Event("show-buy-now-subnav");
        document.dispatchEvent(event);
    }

    return {
        init: _init,
        checkIfBuyButtonAllowed: _checkIfBuyButtonAllowed
    }
})();
if (typeof DEBUG === "undefined" ) {
    var DEBUG = (location.href.indexOf("debug=true")) > 0 ? true : false;
}


var searchAccessibility  = ( function() {
    if (DEBUG) console.log("[INFO] search accessibility script loaded.");
    // local variables
    var defaultQuery = "";

    function _init() {
       bindUI();
    }


    function bindUI() {
        if (DEBUG) console.log("[INFO] In function  bindUI().");
        setClickEvents();
    }

    function setDefaultQuery(q) {
        defaultQuery = q;
    }

    function setAutocompleteMode() {
        $("ul.uss-box-suggestions li a[role='menuitem']").keydown(function(e) {
            $(this).attr("aria-selected","true");
            // up arrow
            if (e.which == 38) {
                // if first on the auto suggestions list
                if($(this).parent('li').prev('li').length == 0) {
                    $("input#uss-search-input:text").focus().select();
                    $("#uss-search-input").val(defaultQuery);
                }
                else {
                    $("#uss-search-input").val($("ul.uss-box-suggestions li a[aria-selected='true']").parent().prev().find("a").text());
                    $("ul.uss-box-suggestions li a[aria-selected='true']").parent().prev().find("a").focus();

                }
                $(this).attr("aria-selected","false");
                e.preventDefault();
            // down arrow
            }else if (e.which == 40) {
                if(!$(this).parent('li').next('li').length == 0) {
                    $("#uss-search-input").val($("ul.uss-box-suggestions li a[aria-selected='true']").parent().next().find("a").text());
                    $("ul.uss-box-suggestions li a[aria-selected='true']").parent().next().find("a").focus();
                    $(this).attr("aria-selected","false");
                    e.preventDefault();
                }
            // tab key
            }else if (e.which == 9) {
                if($(this).parent('li').next('li').length == 0) {
                    // shift tab
                    if(e.shiftKey) {
                        $("#uss-search-input").val($("ul.uss-box-suggestions li a[aria-selected='true']").parent().prev().find("a").text());
                        $("ul.uss-box-suggestions li a[aria-selected='true']").parent().next().find("a").focus();
                    } else { // leave search field
                        $("ul.uss-box-suggestions.uss-box-hasSuggestion").hide();
                        $(".grid-container").parent().next().find("a:first").focus();
                    }
                } else if($(this).parent('li').prev('li').length == 0 && e.shiftKey){
                    $("#uss-search-input").val(defaultQuery);
                } else {
                     if(e.shiftKey) {
                        $("#uss-search-input").val($("ul.uss-box-suggestions li a[aria-selected='true']").parent().prev().find("a").text());
                     } else {
                        $("#uss-search-input").val($("ul.uss-box-suggestions li a[aria-selected='true']").parent().next().find("a").text());
                     }
                }
                $(this).attr("aria-selected","false");
            }
        });

        $("input#uss-search-input").keydown(function(e) {
            // check for suggestions existing
            if($("ul.uss-box-suggestions").length) {
                // down arrow
                if (e.which ==40 || e.which == 9) {
                    e.preventDefault();
                    $("li.uss-box-suggestion:first a").focus();
                    $("#uss-search-input").val($("li.uss-box-suggestion:first a").text());
                } else if(e.which == 9 && e.shiftKey) {
                    // tab up to subnav
                    $("ul.uss-box-suggestions.uss-box-hasSuggestion").hide();
                }
            }
        });

        $("input#uss-search-input").focus(function(){
            $("ul.uss-box-suggestions.uss-box-hasSuggestion").show();
        });
    }


    // add click events to tabs  anchor links
    function setClickEvents(e) {
        $("li.uss-box-suggestion.uss-omnibox-selectable").click(function(){
            if (DEBUG) console.log("[INFO] In function  setTabClickEvents().");

            // reset tabs aria attributes
            $("li.uss-box-suggestion.uss-omnibox-selectable a']").attr("aria-selected","false");
            $(this).attr("aria-selected","true");

            // reset tabpanels aria attributes
            var tabpanid= $(this).attr("aria-controls"); // find tabpanel this tab controls
            var tabpan = $("#"+tabpanid);
            $("ul.uss-box-suggestions']").attr("aria-hidden","true");
            tabpan.attr("aria-hidden","false");

            $(this).focus();
        });

    }

    /**
     * Return public methods
     */
    return {
        setAutocompleteMode : setAutocompleteMode,
        setDefaultQuery : setDefaultQuery,
        init: _init
    }

})();
// End searchAccessibility



$(document).ready(function() {
    searchAccessibility.init();
});
/**
 * @ScriptName: shared/search/clientlibs/js/shared/search.js
 * @CreatedBy:  @cmiqueo on 4/14/2017
 */

if (DEBUG) console.log("[INFO] Script loaded: shared/search/clientlibs/js/shared/search.js");

function getExternalLoadBalancer() {
 if(window.location.hostname.indexOf("dev02") > -1 ){
  return "https://helpx.dev02.adobe.com";
 }
 else if (window.location.hostname.indexOf("dev") > -1 ){
  return "https://helpx.dev.adobe.com";
 }
  else if (window.location.hostname.indexOf("qa02") > -1 ){
  return "https://helpx.qa02.adobe.com";
 }
 else if (window.location.hostname.indexOf("qa") > -1 ){
  return "https://helpx.qa.adobe.com";
 }
 else if (window.location.hostname.indexOf("stage") > -1 ){
  return "https://helpx.stage.adobe.com";
 }
 else {
  return "https://helpx.adobe.com";
 }
}

function getFolderLocale() {
    var geoArray=["africa","ap","at","au","be_en","be_fr","be_nl","bg","br","ca","ca_fr","ch_de","ch_fr","ch_it","cis","cn","cy_en","cz","de","dk","eeurope","ee","en","es","fi","fr","gr_en","hk_en","hk_zh","hr","hu","ie","il_en","il_he","in","it","jp","kr","la","lt","lu_de","lu_en","lu_fr","lv","mena_ar","mena_en","mena_fr","mt","mx","nl","no","nz","pl","pt","ro","ru","rs","si","se","sea","sk","tr","tw","ua","uk"];
    var folderLocale = "/";
    $.each(geoArray,function() {
        if((window.location.pathname).indexOf('/'+this+'/') > -1){
            folderLocale =  '/'+this+'/';
            return false;
        }
    });
    return folderLocale;
}


/*
 @Script: /apps/help/components/shared/search/clientlibs/js/usse.js
 @Author: cshiau @ 7/23/2018
*/

// remove autocomplete dropdown if click out of drop down
$(document).click(function(e) {
    if (!$(e.target).closest(".UssSearchInterface").length) {
        $(".uss-box-suggestions").hide();
    } else if($('.search-input-field').val().length) {
        $(".uss-box-suggestions").show();
    }
});

$(document).ready(function(e){
    $(".UssSearchInterface section.UssSearchInterface .UssOmnibox").on("click", function(e) {
        if ($(e.target).closest(".uss-box-suggestion").length) {
		    getRedirectSearchUrl($(e.target).closest(".uss-box-suggestion a").text());
        }
    });

    $("#uss-submit-button").on("click", function(e) {
        getRedirectSearchUrl($("#uss-search-input").val());
    });

    $("#uss-search-input").keyup(function(e){
        if(e.keyCode == 13) {
            getRedirectSearchUrl($("#uss-search-input").val());
    	}
    });
});

function getRedirectSearchUrl(query) {
	if (query && query.trim()) {
		var primaryProductName = $('meta[name="primaryProductName"]').attr('content');

        // Temp code block. The following conditional supports AB test for search v2 vs v3.
        // If this flag is defined and true, then target has chosen this user to test v3 (by calling the flipSearchComponent below)
        if(shouldTestSearchV3()){
            getRedirectSearchUrlV3(query, primaryProductName);
            return;
        }
        // End temp code block.

		var facet = "";
		if (typeof primaryProductName !== 'undefined' ) {
		    facet = "&facets_fields="
                + encodeURIComponent("[\"applicable_products\"]")
                + "&post_facet_filters="
                + encodeURIComponent(JSON.stringify({applicable_products: [primaryProductName]}));
		}
		document.location.href = usseRedirectUrl + "?q=" + query + facet;
    }
}

////////////
// Temp code for AB test of search V2 vs V3

function shouldTestSearchV3() {
    //var localeLower = (document.head.querySelector("[http-equiv~=Content-Locale][content]").content).toLowerCase();
    //return (localeLower === 'en_us' || localeLower === 'en_ca' || localeLower === 'en_gb' || localeLower === 'en_au');
    return false;
}

function getRedirectSearchUrlV3(query, primaryProductName) {
    // As this is a temp AB test, we're doing a hardcoded replace for the search-results app URL.
    // Once AB test is over, revisit where we are setting window.usseRedirectUrl (so it's set to the new v3 URL).
    var usseV3RedirectUrl = usseRedirectUrl.replace('search-results.html', 'search.html');
    usseV3RedirectUrl = window.location.origin + usseV3RedirectUrl; // srpUrlMaker expects an absolute URL

    // The formTargetUrl function accepts 2 arguments: srpUrl (string - required), and urlParams (object - optional)
    var urlParams = {q: query};
    if (primaryProductName) {
        urlParams.filters = {products: [primaryProductName]}
    }
    var srpUrl = window.helpxTools.srpUrlMaker.formTargetUrl(usseV3RedirectUrl, urlParams);
    document.location.href = srpUrl;
}
// end temp code block
////////////


function ussWithFocus() {
    var searchBox = document.querySelector(".UssSearchInterface");
    searchBox.classList.add("uss-search-box-with-focus");
}

function ussWithoutFocus() {
    var searchBox = document.querySelector(".UssSearchInterface");
    searchBox.classList.remove("uss-search-box-with-focus");
}

function validateAutocompleteLocales() {
    // returns true if page locale matches api validated locale
    var locales = usseAutocompleteLocales.split(",");
    var flag = false;
    locales.forEach(function(locale) {
        if(AdobeLearn.Locale["pageLocale"].indexOf(locale) !== -1) {
            flag = true;
        }
    });
    return flag;
}

function submitAutoCompleteQuery() {
    // only call api if locale is valid from config
    if(validateAutocompleteLocales()) {
        // get string of current query
        var query = document.getElementById("uss-search-input").value;
        if(query.length == 0) {
            clearSearchBox();
        }
        if(query.length > 0) {
            searchAccessibility.setDefaultQuery(query);
            var searchBox = document.querySelector(".UssOmnibox");
            searchBox.classList.add("uss-box-notEmpty");
            query = encodeURIComponent(query);
            var url = usseEndpoint + "?q[text]=" + query + '&q[locale]='  + AdobeLearn.Locale["pageLocale"] + "&scope=adobe_com";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                headers: {
                    'x-api-key': usseApiKey,
                    'Content-Type': 'application/json'
                },
                 success : function(data) {
                   // called after the ajax has returned successful response
                   populateSuggestions(data); // alerts the response
                 },
                error: function(e){
                   // console.log(e);
                },
            });

        } else {
            $(".uss-box-suggestions").remove();
        }
    }
}

function clearSearchBox() {
    var searchBox = document.querySelector(".UssOmnibox");
    searchBox.classList.remove("uss-box-notEmpty");
    $(".uss-box-suggestions").remove();
    $('.search-input-field').val('');
    $('.query-box-clear').hide();
}

function populateSuggestions(autoCompleteQuery) {
    var completedSuggestions = "";
    if(autoCompleteQuery.suggested_completions.length > 0) {
        $(".uss-box-suggestion").remove();
        var optionsToDisplay = Math.min(autoCompleteQuery.suggested_completions.length, 5);
        for(var i=0; i < optionsToDisplay; i++) {
            completedSuggestions += '<li class="uss-box-suggestion uss-omnibox-selectable"><a role="menuitem" aria-selected="false" href="#">'
            + autoCompleteQuery.suggested_completions[i].name + '</a></li>';
        }
        if($(".uss-box-suggestions").length == 0) {
            var suggestionsWrapper = '<ul class="uss-box-suggestions uss-box-hasSuggestion" aria-hidden="false">' + completedSuggestions + '</ul>';
            $(".UssOmnibox").append(suggestionsWrapper);
        } else {
            $(".uss-box-suggestions").append(completedSuggestions);
        }
        searchAccessibility.setAutocompleteMode();
    } else {
        $(".uss-box-suggestions").remove();
    }
}

window.helpxTools = window.helpxTools || {
    analytics: {onReady: function() {
        console.warn('Analytics is not ready.');
    }}
};

helpxTools.analytics.setPageLoadInfo = function() {
    helpxTools.analytics.setPageInfo();
    helpxTools.analytics.setUserInfo();
    helpxTools.analytics.setFeedbackInfo();
    helpxTools.analytics.setHelpxInfo();
}

helpxTools.analytics.setPageInfo = function() {
    digitalData._set('digitalData.page.pageInfo.language', helpxTools.analytics.getLanguageInfo());
    digitalData._set('digitalData.page.pageInfo.pageName', window.helpxTools.analytics.helpers.getPageName());
    digitalData._set('digitalData.page.pageInfo.siteSection', 'Support & Learning');
    digitalData._set('digitalData.page.pageInfo.template', AdobeLearn.Config['pageTemplate']);
}

helpxTools.analytics.setUserInfo = function() {
    if (typeof adobeIMS === "undefined") return;
    // Once IMS is ready, check if the user is signed in, and set to digitalData
    digitalData._set('digitalData.user.userInfo.entitlementStatus', 'unknown');
    digitalData._set('digitalData.user.userInfo.loginStatus', "NotSignedIn");
    adobeIMS.addEventListener('ready', function(){
        if(typeof adobeIMS.isSignedInUser() !== 'undefined') {
            digitalData._set('digitalData.user.userInfo.entitlementStatus', window.helpxTools.analytics.helpers.getEntitlementStatus(adobeIMS.getUserProfile()));
            digitalData._set('digitalData.user.userInfo.loginStatus', "SignedIn");
            digitalData._set('digitalData.user.userInfo.userId', adobeIMS._profile.userId.split('@')[0]);
        }
    });
}

helpxTools.analytics.setFeedbackInfo = function() {
    // Feedback info must be present at pageload, then updated later when user interacts with the Feedback component.
    var isFeedbackBadgeShown = 'False';
    if(document.querySelector('#feedbackPod')) isFeedbackBadgeShown = 'True';
    digitalData._set('digitalData.feedback.feedbackInfo.isFeedbackBadgeShown', isFeedbackBadgeShown);
    digitalData._set('digitalData.feedback.feedbackInfo.verbatimText', '');
}

helpxTools.analytics.setHelpxInfo = function() {
    digitalData._set('digitalData.helpx.topicTags', $("meta[name='topicTags']").attr("content") || '');
    digitalData._set('digitalData.helpx.contentType', $("meta[name='content-type']").attr("content") || '');
    digitalData._set('digitalData.helpx.pageCreatedAt', $("meta[name='pageCreatedAt']").attr("content") || '');
    digitalData._set('digitalData.helpx.translated', helpxTools.analytics.getTranslatedMeta());
    digitalData._set('digitalData.helpx.learningApproach', $("meta[name='learningApproach']").attr("content") || '');
    digitalData._set('digitalData.helpx.publishDate', $("meta[name='publishDate']").attr("content") || '');
    digitalData._set('digitalData.helpx.contentStrategy', $("meta[name='contentStrategy']").attr("content") || '');
    digitalData._set('digitalData.helpx.selfHelpProduct', $("meta[name='primaryProduct']").attr("content") || '');
}

helpxTools.analytics.getTranslatedMeta = function() {
    const translatedStatus = $("meta[name='translated']").attr("content") || '';
    const pageCreatedAt = $("meta[name='pageCreatedAt']").attr("content") || '';
    var status = '';
    if (translatedStatus === 'true') {
        status = 'Translated';
    } else if (translatedStatus === 'false') {
        status = 'Untranslated';
        if (pageCreatedAt.indexOf('content/help/en') === -1 && pageCreatedAt !== 'en') { // if page is not created under en node
            status = 'Original';
        }
    }
    return status;
}

helpxTools.analytics.getLanguageInfo = function() {
    var pageLocale = '';
    if (AdobeLearn.Locale['pageLocale']) {
        const divideLocale = AdobeLearn.Locale["pageLocale"].split('_');
        const regionName = divideLocale[1].toUpperCase();
        pageLocale = ''.concat(divideLocale[0], '-').concat(regionName);
    }
    return pageLocale;
}

helpxTools.analytics.callAnalyticsTracking = function(eventType) {
    if (typeof _satellite === 'undefined') return;
    _satellite.track(eventType, { digitalData: digitalData._snapshot() });
}

helpxTools.analytics.onReady(function () {
    // Adobe launch JS is ready, execute page load analytics.
    helpxTools.analytics.setPageLoadInfo();
});

// @Script: /apps/help/components/shared/feedback/clientlibs/js/feedback.js
// @Author: cmiqueo @ 9/16/2014
// @desc:   javascript code for component: feedback

var feedbackFlag;

/* Setting support-page variables specific to feedback badge */
var ua = navigator.userAgent.toLowerCase();
var feedbackUsedFlag = false;
var urlMatch = /(https?:\/\/)([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*))(index.html)?(\?\S+)?(\#\S+)?/;
var adobeMatch = /(https?:\/\/)([-\w\.]+)+(\.adobe\.com)/;
var adobeLocaleMatch = /^\/(africa|at|au|be_en|be_fr|be_nl|bg|br|ca|ca_fr|ch_de|ch_fr|ch_it|cn|cy_en|cz|de|dk|ee|es|fi|fr|gr_en|hk_en|hk_zh|hr|hu|ie|il_en|il_he|in|it|jp|kr|la|lt|lu_de|lu_en|lu_fr|lv|mena_ar|mena_en|mena_fr|mt|mx|nl|no|nz|pl|pt|ro|rs|ru|se|sea|si|sk|tr|tw|ua|uk)\/.+/;
var cqLocaleMatch = /^\/content\/help\/(africa|at|au|be_en|be_fr|be_nl|bg|br|ca|ca_fr|ch_de|ch_fr|ch_it|cn|cy_en|cz|de|dk|ee|es|fi|fr|gr_en|hk_en|hk_zh|hr|hu|ie|il_en|il_he|in|it|jp|kr|la|lt|lu_de|lu_en|lu_fr|lv|mena_ar|mena_en|mena_fr|mt|mx|nl|no|nz|pl|pt|ro|rs|ru|se|sea|si|sk|tr|tw|ua|uk)\/.+/;
var omtrLocale = "en";
if (adobeLocaleMatch.test(location.pathname)) {
    var matchArray = adobeLocaleMatch.exec(location.pathname).slice();
    omtrLocale = matchArray[1];
    if ( typeof(matchArray[1]) != 'undefined') {
        omtrLocale = matchArray[1];
    }
}
else if (cqLocaleMatch.test(location.pathname)) {
    var matchArray = cqLocaleMatch.exec(location.pathname).slice();
    omtrLocale = matchArray[1];
    if ( typeof(matchArray[1]) != 'undefined') {
        omtrLocale = matchArray[1];
    }
}

//Hide Feedback Badge if it doesnt have the following locales
$(document).ready(function(){
    // animate badge
    var feedbackLocales = "en, ja, jp, fr, de, it, sv, es, nl, da, pt, no, nb, fi";
    if(feedbackLocales.indexOf( AdobeLearn.Locale["customPageLanguage"]) == -1) {
        $("#helpful-pod, #feedbackPod").hide();

    }
    $('#feedbackPod #submitButton, #feedbackPod #noCommentButton').click(function() {
        $('#feedbackPod').fadeOut('slow');
    })
    if(isDesktop && $('#feedbackPod').length) {
        absoluteFeedback();
        fixedFeedback();
    }
});

$(document).on('scroll', function() {
    if(isDesktop && $('#feedbackPod').length) {
        absoluteFeedback();
        fixedFeedback();
    }
});

$(window).resize(function() {
    if(isDesktop && $('#feedbackPod').length) {
        absoluteFeedback();
        fixedFeedback();
    }
});

var lastFocused = null;

function addFocusToFeedbackBadgeTextArea(){
    document.getElementById("feedbacktext").focus();
};

// Show feedback form
function showForm(isHelpful) {
    lastFocused = document.activeElement;
    if (DEBUG) { console.log("isHelpful:" + isHelpful) };
    $("#feedbacktext").val("");
    $('#helpfulspan,#radioyes,#radiono,#yesspan,#nospan').addClass('hidden');
    $('#helpful').show();
    $('#helpful').css('display','inline-table');
    $('#helpful').removeClass('collapsed');
    $('#helpful').addClass('expanded');
    $('.radiobuttons').hide();
    $('#helpful-pod').css('padding', '0');
    if($('#helpful').html()!="") {
        if((typeof ie === 'undefined' || ie > 10) && (isPhone() || isTablet())) {
            $('#helpful').css('opacity','1');
            $('#helpful').css('width','370px');
            $('#helpful').css('height','255px');
            $("#helpful").hide().fadeIn(800);
        } else {
            $('#helpful').css('opacity','1');
            $('#helpful').css('width','370px');
            $('#helpful').css('height','230px');
            $("#helpful").hide().fadeIn(800);
        }
    }
    $('#helpful-pod').css('opacity', '1').addClass('no-padding');
    $('#feedbackPod').addClass('no-padding');
    $('#fold').css('background-image', 'url(/content/dam/help/clientlibs/images/fold-gray.png)');

    // Add scroll function for Support Hub 2 because sticky tabs are overlaying the feedback badge's form
    if ( $('.support-hub-two').length ) {
        if ( $('#feedbackPod').length ) {
            $("html, body").animate({
                scrollTop: $('#feedbackPod #helpful').offset().top - $('.tabs-container-tablist.container').outerHeight()
            }, 500);
        }
    }

    // support-hub-2 accessibility
    if (typeof isHelpful === "undefined") {
        var radioButton = digitalData._get('digitalData.page.pageInfo.pageName');
        radioButton +=  document.getElementById("radioyes").checked ? ":Ratings-Helpful(yes)" : ":Ratings-Helpful(no)";
        var feedbackOptions = document.getElementById("radioyes").checked ? "feedbackYes" : "feedbackNo";
    } else {
        var radioButton = digitalData._get('digitalData.page.pageInfo.pageName');
        radioButton += (isHelpful === 'yes') ? ":Ratings-Helpful(yes)" : ":Ratings-Helpful(no)";
        var feedbackOptions = (isHelpful == "yes") ? "feedbackYes" : "feedbackNo";
        feedbackFlag = (isHelpful == "yes") ? "yes" : "no";
    }
    if (DEBUG) {console.log("feedbackOptions: " + feedbackOptions)};
    if (!$("body").hasClass('cq-wcm-edit')) {
        // setting analytics for clicking feedback radio buttons
        digitalData._set('digitalData.primaryEvent.eventInfo.eventName', radioButton);
        digitalData._set('digitalData.primaryEvent.eventInfo.eventAction', feedbackOptions);
        helpxTools.analytics.callAnalyticsTracking('event');
    }
    addFocusToFeedbackBadgeTextArea();
}

// User submits feedback text analytics datalayer
var submitFeedbackForm = function(isHelpful) {
    // support-hub-2 accessibility
    if (typeof feedbackFlag === "undefined") {
        var radioButton = digitalData._get('digitalData.page.pageInfo.pageName');
        radioButton += document.getElementById("radioyes").checked ? ":Comments – Helpful (yes rating)" : ":Comments – Helpful (no rating)";
        var feedbackHelpful = document.getElementById("radioyes").checked ? "feedbackSubmitYes" : "feedbackSubmitNo";
    }else {
        var radioButton = digitalData._get('digitalData.page.pageInfo.pageName');
        radioButton += (feedbackFlag == "yes") ? ":Comments – Helpful (yes rating)" : ":Comments – Helpful (no rating)";
        var feedbackHelpful = (feedbackFlag == "yes") ? "feedbackSubmitYes" : "feedbackSubmitNo";
    }


    var feedbackText = document.getElementById("feedbacktext").value.trim();
    if(feedbackText.length > 0 || !$("body").hasClass('cq-wcm-edit')) {
        // setting analytics for submitting feedback form
        digitalData._set('digitalData.primaryEvent.eventInfo.eventName', radioButton);
        digitalData._set('digitalData.primaryEvent.eventInfo.eventAction', feedbackHelpful);
        digitalData._set('digitalData.feedback.feedbackInfo.verbatimText', feedbackText);
        helpxTools.analytics.callAnalyticsTracking('event');
    }
    $("#feedbackPod").fadeOut();
}

//on load, on resize
var absoluteFeedback=function() {
    var feedback = $('#feedbackPod');
    var footer = $('.article-footer');
    if (footer.length > 0 ) {
        var footerGrid = $('.article-footer > .container');
        var feedbackTop = feedback.offset().top;
        var footerTop = footer.offset().top + 107;
        if(feedbackTop > footerTop){
            feedback.addClass('absolute');
            if($('html').attr('dir') != "rtl") {
                feedback.css('right', -(footer.width() - footerGrid.width())/2) ;
            }
            else {
                feedback.css('left', -(footer.width() - footerGrid.width())/2) ;
            }
        }
        if(feedback.hasClass('absolute')) {
            if($('html').attr('dir') != "rtl") {
                feedback.css('right', -(footer.width() - footerGrid.width())/2) ;
            }
            else {
                feedback.css('left', -(footer.width() - footerGrid.width())/2) ;
            }
        }
    }
}

var fixedFeedback=function() {
    var feedback = $('#feedbackPod');
    var feedbackBottom = feedback.offset().top + feedback.height();
    var windowBottom = $(window).scrollTop() + $(window).height();
    if(feedbackBottom > windowBottom){
        feedback.removeClass('absolute');
        if($('html').attr('dir') != "rtl") {
            feedback.css('right', 0) ;
        }
        else {
            feedback.css('left', 0) ;
        }
    }
}

var hideFeedbackForm=function() {
    $('#helpful').hide();
    setFeedBackFlag(true);
}

var setFeedBackFlag=function(flag) {
    feedbackUsedFlag = flag;
    $('.productdetail-footer').hide();
    $('.app-detail').css({'border-bottom':''});
}

$('#noCommentButton').on('click', function(e) {
    $("#feedbackPod").fadeOut();
});

//Use JS media query to detect device and take corresponding action in JS
var isPhone = function() {
    if (window.matchMedia("only screen and (min-width: 320px) and (max-width: 580px)").matches) {
        return true;
    } else {
        return false;
    }
}

var isTablet = function() {
    if (window.matchMedia("only screen and (max-width: 800px) and (min-width: 580px)").matches) {
        return true;
    } else {
        return false;
    }
}

var isLaptop = function() {
    if (window.matchMedia("only screen and (min-width: 800px) and (max-width: 4400px)").matches) {
        return true;
    } else {
        return false;
    }
}

var isDesktop = function() {
    if (window.matchMedia("only screen and (min-width: 1025px)").matches) {
        return true;
    } else {
        return false;
    }
}

/**
 * Created by sanrai on 5/16/17.
 */

/**
 *  Module that handles all helpx-specific generic methods on the client side.
 *
 *  @module helpxUtils
 *  @class helperMethods
 *  @static
 */

var helpxUtils = helpxUtils || {};

/**
 * Gets the query Parameters Of the Current Page
 */

helpxUtils.getQueryStringParameter = function(key){
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
};

helpxUtils.emptyElement = function(el){
    return !$.trim(el.html())
};

/**
 * Method works for all sling selectors we use on helpx.
 *
 * Method written based off Official Sling Resource Resolution Spec.
 *
 * Sling Resource Spec can be seen here:
 * https://sling.apache.org/documentation/the-sling-engine/url-decomposition.html
 *
 * Not all possible paths defined by Sling are supported in this method, but the following (below) are.
 *
 * Paths that are supported:
 * /a/b
 * /a/b.html
 * /a/b.s1.html
 * /a/b.s1.s2.html
 * /a/b/c/d
 * /a/b./c/d
 * /a/b.html/c/d
 * /a/b.s1.html/c/d
 * /a/b.s1.s2.html/c/d
 * /a/b/c/d.s.txt
 *
 *
 * @param pathname
 * @returns {string}
 * @method getSlingSelectors
 */

helpxUtils.getSlingSelectors = function(pathname) {
    var pathParts = pathname.split('.');
    var selectorString = pathParts.slice(1, pathParts.length - 1).join('.');

    return selectorString;
};

helpxUtils.hasSlingSelectors = function(pathname){
    var slingSelectors = helpxUtils.getSlingSelectors(pathname);
    if (slingSelectors === "") {
        return false
    } else {
        return true;
    }
};

/**
 * Created by sanrai on 5/15/17.
 */
var helpxUtils = helpxUtils || {};

helpxUtils.loaders = (function(){

    function _loadScript( url, callback ) {
        var script = document.createElement( "script" );
        script.type = "text/javascript";
        if(script.readyState) {  //IE
            script.onreadystatechange = function() {
                if ( script.readyState === "loaded" || script.readyState === "complete" ) {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function() {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName( "head" )[0].appendChild( script );
    }

    return {
        loadScript: _loadScript
    };
})();
var helpxUtils = helpxUtils || {};

helpxUtils.domManipulation = (function(){

    function _insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    return {
        insertAfter: _insertAfter
    };
})();
/**
 * Created by sanrai on 5/16/17.
 */

/**
 *  Module that handles all helpx-specific i18n code on the client side.
 *
 *  @module helpxUtils
 *  @class i18n
 *  @static
 */

var helpxUtils = helpxUtils || {};

helpxUtils.i18n = (function(){

    /**
     * SUSI only supports 34 locales, so this is an internal mapping that we are using to map our 61 locales to their 34.
     * This mapping currently matches adobe.com
     *
     * @property _helpxToSusiMapping
     * @type Object
     */

    var _helpxToSusiMapping = {
        "en_US" : "en_US",
        "en_ZA" : "en_US",
        "de_AT": "de_DE",
        "en_AU": "en_US",
        "en_BE": "en_US",
        "fr_BE": "fr_FR",
        "nl_BE": "nl_NL",
        "bg_BG": "bg_BG",
        "pt_BR": "pt_BR",
        "en_CA": "en_US",
        "fr_CA": "fr_CA",
        "de_CH": "de_DE",
        "fr_CH": "fr_FR",
        "it_CH": "it_IT",
        "zh_CN": "zh_CN",
        "en_CY": "en_US",
        "cs_CZ": "cs_CZ",
        "de_DE": "de_DE",
        "da_DK": "da_DK",
        "et_EE": "et_EE",
        "es_ES": "es_ES",
        "fi_FI": "fi_FI",
        "fr_FR": "fr_FR",
        "en_GR": "en_US",
        "en_HK": "en_US",
        "zh_HK": "zh_CN",
        "hr_HR": "hr_HR",
        "hu_HU": "hu_HU",
        "en_IE": "en_US",
        "en_IL": "en_IL",
        "he_IL": "en_US",
        "en_IN": "en_US",
        "it_IT": "it_IT",
        "ja_JP": "ja_JP",
        "ko_KR": "ko_KR",
        "es_LA": "es_LA",
        "lt_LT": "lt_LT",
        "de_LU": "de_DE",
        "en_LU": "en_US",
        "fr_LU": "fr_FR",
        "lv_LV": "lv_LV",
        "ar_MENA": "en_US",
        "en_MENA": "en_US",
        "fr_MENA": "fr_FR",
        "en_MT": "en_US",
        "es_MX": "es_MX",
        "nl_NL": "nl_NL",
        "nb_NO": "nb_NO",
        "en_NZ": "en_US",
        "pl_PL": "pl_PL",
        "pt_PT": "pt_BR",
        "ro_RO": "ro_RO",
        "sr_RS": "sr_RS",
        "ru_RU": "ru_RU",
        "sv_SE": "sv_SE",
        "en_SEA": "en_US",
        "sl_SI": "sl_SI",
        "sk_SK": "sk_SK",
        "tr_TR": "tr_TR",
        "zh_TW": "zh_TW",
        "uk_UA": "uk_UA",
        "en_GB": "en_GB"
    };

    /**
     * Checks whether the current jcrLanguage is supported by SUSI
     *
     * If so, return that jcrLang. Otherwise, return predetermined fallback as defined by Jeri Halpine
     * and Craig Goodman
     *
     * @method _getSusiLocale
     * @return Boolean {Boolean}
     * @param jcrLang
     */

    function _getSusiLocale(jcrLang) {
        if(jcrLang in _helpxToSusiMapping) {
            return _helpxToSusiMapping[jcrLang];
        }
        return jcrLang;
    }

    return {
        getSusiLocale: _getSusiLocale
    };
})();
var helpxUtils = helpxUtils || {};

helpxUtils.obj = (function(){
    var stringConstructor = "test".constructor, arrayConstructor = [].constructor, objectConstructor = {}.constructor;

    var _whatIsIt = function(object){
        try {
            if (object === null) {
                return "null";
            }
            else if (object === undefined) {
                return "undefined";
            }
            else if (object.constructor === stringConstructor) {
                return "String";
            }
            else if (object.constructor === arrayConstructor) {
                return "Array";
            }
            else if (object.constructor === objectConstructor) {
                return "Object";
            }
            else {
                return "don't know";
            }
        }catch(err){
            return "don't know";
        }
    };

    var _isBoolean = function(object){
        return (typeof object === 'boolean');
    };

    var _isArray = function(object){
        if(_whatIsIt(object) === "Array"){
            return true;
        } else {
            return false;
        }
    };

    var _isString = function(object){
        if(_whatIsIt(object) === "String"){
            return true;
        } else {
            return false;
        }
    };

    var _isNull = function(object){
        if(_whatIsIt(object) === "null"){
            return true;
        } else {
            return false;
        }
    };

    var _isUndefined = function(object){
        if(_whatIsIt(object) === "undefined"){
            return true;
        } else {
            return false;
        }
    };

    var _isObject = function(object){
        if(_whatIsIt(object) === "Object"){
            return true;
        } else {
            return false;
        }
    };

    var _isEmptyObject =  function(obj){
        if(!_isObject(obj)){
            return false
        }
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true && JSON.stringify(obj) === JSON.stringify({});
    };

    var _isUsable = function(obj, properties) {
        if(!_isObject(obj)){
            return false;
        }
        if(!_isArray(properties)){
            return false;
        }

        for (var i = 0; i < properties.length; i++) {
            if (!obj.hasOwnProperty(properties[i]) || !(_isString(obj[properties[i]]))) {
                return false;
            }
        }
        return true;
    };

    var _cloneObject = function (objectToClone){
        // Clone object deep versus shallow reference
        var newObject = jQuery.extend(true, {}, objectToClone);
        return newObject;
    };

    return {
        isBoolean: _isBoolean,
        isArray: _isArray,
        isString: _isString,
        isNull: _isNull,
        isUndefined: _isUndefined,
        isObject: _isObject,
        isEmptyObject: _isEmptyObject,
        isUsable: _isUsable,
        cloneObject : _cloneObject,
        whatIsIt: _whatIsIt
    }
})();
var helpxUtils = helpxUtils || {};

helpxUtils.Logger = (function(){

    /**
     * Code to handle environments where the console is not defined
     * */
    var _noOp = function(){}; // no-op function
    window.console = window.console || { error: _noOp, warn: _noOp, info: _noOp, log: _noOp, debug: _noOp };

    /**
     *  Helper method to get queryParameters from URL
     */
    function _getQueryParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    /**
     * Internal variable that represent the different levels of logging available.
     *
     * If value set to false, then logs will NOT write to that level of logging.
     *
     * These values default to false, and are overridden by the Query Parameters passed into the page
     *
     * @property _logLevel
     * @type Object
     */

    var _logLevel = {
        error: false,
        warn: false,
        info: false,
        log: false,
        debug: false
    };

    /**
     *  Method that takes in levels received by query parameter and sets what logging Levels should be outputted
     *
     *	Arguments
     *  None
     *
     *  Return value
     *  None
     *
     *  @method _log
     *  @return void
     */

    function setLogLevel(level){
        for (var key in _logLevel){
            if(key === level) {
                _logLevel[key] = true;
            }
        }
    }

    /**
     *  Helpx specific override of console.log
     *
     *	Arguments
     *  None
     *
     *  Return value
     *  None
     *
     *  @method _log
     *  @return void
     */
    function _log(msg) {
        if(_logLevel.log){
            console.log(msg);
        }
    }

    /**
     *  Helpx specific override of console.warn
     *
     *	Arguments
     *  None
     *
     *  Return value
     *  None
     *
     *  @method _warn
     *  @return void
     */

    function _warn(msg) {
        if(_logLevel.warn){
            console.warn(msg);
        }
    }

    /**
     *  Helpx specific override of console.info
     *
     *	Arguments
     *  None
     *
     *  Return value
     *  None
     *
     *  @method _info
     *  @return void
     */
    function _info(msg) {
        if(_logLevel.warn){
            console.warn(msg);
        }
    }
    /**
     *  Helpx specific override of console.debug
     *
     *	Arguments
     *  None
     *
     *  Return value
     *  None
     *
     *  @method _debug
     *  @return void
     */
    function _debug(msg) {
        if(_logLevel.debug){
            console.debug(msg);
        }
    }


    function _error(msg){
        if(_logLevel.error){
            console.error(msg);
        }
    }

    /**
     *  Init method
     *  (1) Checks what query parameters were passed into the page in the form:
     *
     *  ?logLevel=error,warn,info,log,debug (to have all logging show)
     *  or ?logLevel=log to just show things that were logged to console.log
     *
     *  Since this module initializes itself, you can now use
     *  Logger.log instead of console.log, Logger.error instead of console.error, etc.
     *
     *	Arguments
     *  None
     *
     *  Return value
     *  None
     *
     *  @method init
     *  @return void
     */
    function _init(){
        var logLevel = _getQueryParameterByName("logLevel");
        if(logLevel !== null){
            logLevel.split(',').forEach(setLogLevel);
        }
    }

    return {
        log: _log,
        warn: _warn,
        debug: _debug,
        info: _info,
        error: _error,
        init: _init
    }
})();

helpxUtils.Logger.init();
var Ingest =
    /******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/ 		if(installedModules[moduleId]) {
            /******/ 			return installedModules[moduleId].exports;
            /******/ 		}
        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = installedModules[moduleId] = {
            /******/ 			i: moduleId,
            /******/ 			l: false,
            /******/ 			exports: {}
            /******/ 		};
        /******/
        /******/ 		// Execute the module function
        /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Flag the module as loaded
        /******/ 		module.l = true;
        /******/
        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
        /******/ 		if(!__webpack_require__.o(exports, name)) {
            /******/ 			Object.defineProperty(exports, name, {
                /******/ 				configurable: false,
                /******/ 				enumerable: true,
                /******/ 				get: getter
                /******/ 			});
            /******/ 		}
        /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
        /******/ 		var getter = module && module.__esModule ?
            /******/ 			function getDefault() { return module['default']; } :
            /******/ 			function getModuleExports() { return module; };
        /******/ 		__webpack_require__.d(getter, 'a', getter);
        /******/ 		return getter;
        /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 0);
    /******/ })
/************************************************************************/
/******/ ([
    /* 0 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
        /* WEBPACK VAR INJECTION */(function(global) {/*************************************************************************
         *
         * ADOBE CONFIDENTIAL
         * ___________________
         *
         * Copyright 2017 Adobe Systems Incorporated
         * All Rights Reserved.
         *
         * NOTICE: All information contained herein is, and remains
         * the property of Adobe Systems Incorporated and its suppliers,
         * if any. The intellectual and technical concepts contained
         * herein are proprietary to Adobe Systems Incorporated and its
         * suppliers and are protected by trade secret or copyright law.
         * Dissemination of this information or reproduction of this material
         * is strictly forbidden unless prior written permission is obtained
         * from Adobe Systems Incorporated.
         **************************************************************************/
            /*jslint node: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, unparam: true */
            /*global nodeRequire, module, require, console, window, XMLHttpRequest */



            /**
             Utility functions
             **/

            function isNodeJS() {
                var requireType = typeof global; // Avoid JSLint warning
                /* istanbul ignore next */
                return requireType !== 'undefined' && global.Buffer;
            }

            function generateGUID() {
                var s4 = function () {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                };
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            }

            function truncateEventQueue(queue, maxLength) {
                var truncatedQueue = queue;
                if (queue && queue.length > maxLength && maxLength > 0) {
                    var startIndex = queue.length - maxLength;
                    truncatedQueue = queue.slice(startIndex, queue.length);
                }
                return truncatedQueue;
            }

            function pad(n, length) {
                var str = n.toString();
                if (str.length < length) {
                    var padding = [];
                    padding.length = length - str.length + 1;
                    str = padding.join('0') + str;
                }
                return str;
            }

            function extend(dest, from) {
                var props = Object.getOwnPropertyNames(from);

                props.forEach(function (name) {
                    if (typeof from[name] === 'object') {
                        if (typeof dest[name] !== 'object') {
                            dest[name] = {};
                        }
                        extend(dest[name], from[name]);
                    } else {
                        var destination = Object.getOwnPropertyDescriptor(from, name);
                        Object.defineProperty(dest, name, destination);
                    }
                });

                return dest;
            }

            function consumeStream(stream) {
                var noOp = function () {return; };
                stream.on('data', noOp);
                stream.on('end', noOp);
            }

            function notifyCallbacks(callbacks, err, numSentEvents) {
                callbacks.forEach(function (callback) {
                    // Call each callback in a timeout, so if there's an exception in one callback it doesn't affect any others
                    setTimeout(function () {
                        callback(err, numSentEvents);
                    });
                });
            }


            /**
             Constants
             **/

            var LOG_PREFIX = 'Ingest :: ';
            var ANALYTICS_HOST = {
                prod:   'cc-api-data.adobe.io',
                stage:  'cc-api-data-stage.adobe.io',
                dev:    'cc-api-data-dev.adobe.io'
            };
            var INGEST_PATH = '/ingest';
            var RETRY_RANDOM_SECONDS = 10;

// Settable options, with their default values
            var DEFAULT_OPTIONS = {
                ENVIRONMENT: 'prod',
                ALLOW_NO_TOKEN: false,
                ANALYTICS_INGEST_TYPE: 'dunamis',
                ANALYTICS_MAX_QUEUED_EVENTS: 50,
                ANALYTICS_DEBOUNCE: 10000,
                ANALYTICS_API_KEY: null,
                ANALYTICS_X_PRODUCT: null,
                ANALYTICS_X_PRODUCT_LOCATION: undefined,
                ANALYTICS_PROJECT: null,
                ANALYTICS_USER_REGION: 'UNKNOWN',
                TIMESTAMP_PROPERTY_NAME: 'event.dts_end'
            };
            var REQUIRED_OPTIONS = [
                'ANALYTICS_API_KEY',
                'ANALYTICS_X_PRODUCT',
                'ANALYTICS_PROJECT',
            ];


            /**
             Ingest Class
             **/

// Constructor
            function Ingest(dependencies, options) {
                var that = this;
                dependencies = dependencies || {};
                options = options || {};

                var throwError = function (message) {
                    that._log(message);
                    throw new Error('ERROR: ' + message);
                };

                // Internal state
                this._queuedEvents = [];
                this._queuedCallbacks = [];
                this._lastSendTime = 0;
                this._isEnabled = false; // Sending analytics is disabled by default

                // Configure dependencies
                this._dependencies = extend({}, dependencies);
                if (!dependencies.getAccessToken || typeof dependencies.getAccessToken !== 'function') {
                    throwError('Missing dependency: getAccessToken');
                }

                // Configure options
                this._options = {};
                Object.keys(DEFAULT_OPTIONS).forEach(function (key) {
                    this._options[key] = options[key] || DEFAULT_OPTIONS[key];
                }, this);

                // Make sure required options have been passed in
                REQUIRED_OPTIONS.forEach(function (option) {
                    if (!this._options[option]) {
                        throwError('Missing option: ' + option);
                    }
                }, this);
            }

            Ingest.prototype._log = function (message) {
                var doLog = this._dependencies.log
                if (doLog) {
                    doLog(LOG_PREFIX + message);
                }
            };

            Ingest.prototype._getAgent = function (url, callback) {
                if (this._dependencies.getAgent) {
                    this._dependencies.getAgent(url, callback);
                    return;
                }
                callback(null, {});
            };

            Ingest.prototype._getAccessToken = function (callback) {
                this._dependencies.getAccessToken(callback);
            };

            Ingest.prototype._clearAccessToken = function () {
                if (this._dependencies.clearAccessToken) {
                    this._dependencies.clearAccessToken();
                }
            };

            Ingest.prototype._getEnvironment = function () {
                return ANALYTICS_HOST[this._options.ENVIRONMENT] ? this._options.ENVIRONMENT : 'prod';
            };

            Ingest.prototype._getAnalyticsHost = function () {
                return ANALYTICS_HOST[this._getEnvironment()];
            };

            Ingest.prototype._formatTimestamp = function (date) {
                // Corresponds to moment format string 'YYYY-MM-DDTHH:mm:ss.SSSZZ'
                var YYYY = date.getFullYear();
                var MM = pad(date.getMonth() + 1, 2); // Month is 0-11
                var DD = pad(date.getDate(), 2);
                var HH = pad(date.getHours(), 2);
                var mm = pad(date.getMinutes(), 2);
                var ss = pad(date.getSeconds(), 2);
                var SSS = pad(date.getMilliseconds(), 3);

                var offset = date.getTimezoneOffset();
                var sign = offset < 0 ? '+' : '-'; // Sign is inverted
                var hours = Math.floor(Math.abs(offset) / 60);
                var mins = Math.abs(offset) % 60;
                var ZZ = sign + pad(hours, 2) + pad(mins, 2);

                return YYYY + '-' + MM + '-' + DD + 'T' + HH + ':' + mm + ':' + ss + '.' + SSS + ZZ;
            };

            Ingest.prototype._updateDebounce = function (headers) {
                var retryAfterHeader = headers && (headers['retry-after'] || headers['Retry-After']);
                var retryAfter = 0;

                if (retryAfterHeader) {
                    var retryTime;
                    try {
                        // First, try to parse it as a number (retry time in seconds)
                        retryTime = parseInt(retryAfterHeader, 10);
                    } catch (ignore) {
                    }

                    if (retryTime) {
                        retryAfter = Math.max(0, retryTime);
                    } else {
                        // If that fails, try to parse it as a date
                        var retryDate = Date.parse(retryAfterHeader);
                        if (retryDate) {
                            // Need to add a randomised element to ensure requests don't all come back at the same time
                            var now = new Date().valueOf();
                            var retrySeconds = Math.max(0, retryDate - now) / 1000;
                            var retryRandom = Math.floor(Math.random() * RETRY_RANDOM_SECONDS);
                            retryAfter = retrySeconds + retryRandom;
                        }
                    }
                }

                this._options.ANALYTICS_DEBOUNCE = Math.max(retryAfter * 1000, this._options.ANALYTICS_DEBOUNCE);
            };

            Ingest.prototype._queueEvent = function (event) {
                if (this._queuedEvents.length >= this._options.ANALYTICS_MAX_QUEUED_EVENTS) {
                    this._queuedEvents.shift();
                }
                this._queuedEvents.push(event);
            };

            Ingest.prototype._requeueEvents = function (failedEvents) {
                // If we failed sending events, add them back to the beginning of the queue - but make sure it doesn't go over the maximum length
                this._queuedEvents = failedEvents.concat(this._queuedEvents);
                this._queuedEvents = truncateEventQueue(this._queuedEvents, this._options.ANALYTICS_MAX_QUEUED_EVENTS);
            };

            Ingest.prototype._sendAnalytics = function (sendImmediately, callback, retryAttemps) {
                var that = this;
                retryAttemps = retryAttemps || 0;

                if (callback) {
                    this._queuedCallbacks.push(callback);
                }

                if (!this._isEnabled || this._queuedEvents.length === 0) {
                    var callbacks = this._queuedCallbacks;
                    this._queuedCallbacks = [];
                    if (!this._isEnabled) {
                        notifyCallbacks(callbacks, new Error('Analytics Disabled'));
                    } else {
                        notifyCallbacks(callbacks, null, 0);
                    }
                    return;
                }
                var debounce = this._options.ANALYTICS_DEBOUNCE;

                if (sendImmediately) {
                    // Clear any timeout, and set the debounce to zero, to force an immediate send
                    debounce = 0;
                    clearTimeout(this._pendingSendAnalyticsTimeout);
                    this._pendingSendAnalyticsTimeout = undefined;
                }

                if (this._sendingEvents || this._pendingSendAnalyticsTimeout) {
                    this._log('Queued ' + this._queuedEvents.length + ' events to be sent.');
                    // We're in the middle of sending analytics already
                    // This will automatically kick off another send afterwards, so no need to do anything
                    return;
                }

                var currentTime = new Date().valueOf();
                if (currentTime - this._lastSendTime < debounce) {
                    // Throttle analytics, so we don't send too often - this allows us to batch up analytics
                    this._pendingSendAnalyticsTimeout = setTimeout(function () {
                        that._pendingSendAnalyticsTimeout = undefined;
                        that._sendAnalytics();
                    }, debounce);
                    return;
                }

                this._lastSendTime = currentTime;
                // The queued events are now going to be sent
                this._sendingEvents = this._queuedEvents;
                this._sendingCallbacks = this._queuedCallbacks;
                this._queuedEvents = [];
                this._queuedCallbacks = [];

                var requestId = generateGUID();
                var logPrefix = '[' + requestId + '] ';
                var ingestData = {
                    events: this._sendingEvents
                };

                // This gets called when finished, whether we got a response or failed with an error
                var onFinished = function (err) {
                    var numNewEvents = that._queuedEvents.length;
                    var numSentEvents = that._sendingEvents.length;
                    if (err) {
                        that._requeueEvents(that._sendingEvents);
                        that._log(logPrefix + 'Error sending ' + numSentEvents + ' events: ' + err);
                    } else {
                        that._log(logPrefix + 'Success sending ' + numSentEvents + ' events: ' + JSON.stringify(that._sendingEvents));
                    }
                    delete that._sendingEvents;

                    var sendingCallbacks = that._sendingCallbacks;
                    delete that._sendingCallbacks;
                    if (err) {
                        notifyCallbacks(sendingCallbacks, err);
                    } else {
                        notifyCallbacks(sendingCallbacks, null, numSentEvents);
                    }

                    // If there were any new events while sending the last batch, trigger another send.
                    // Note: This doesn't auto-trigger a retry if we failed, and there were no new events.
                    if (numNewEvents > 0) {
                        that._sendAnalytics();
                    }
                };

                // This gets called when we get an actual response from the server
                var handleResponse = function (statusCode, headers) {
                    that._updateDebounce(headers);

                    if (statusCode === 401 && retryAttemps === 0) {
                        that._clearAccessToken();

                        that._requeueEvents(that._sendingEvents);
                        delete that._sendingEvents;

                        that._queuedCallbacks = that._sendingCallbacks.concat(that._queuedCallbacks);
                        delete that._sendingCallbacks;

                        // Retry one more time
                        that._log(logPrefix + 'Access token is expired. Retry one more time.');
                        that._sendAnalytics(true, undefined, retryAttemps + 1);
                        return;
                    }
                    if (statusCode !== 200) {
                        onFinished(new Error('Unexpected Response: ' + statusCode));
                        return;
                    }
                    onFinished();
                };

                this._getAccessToken(function (err, token) {
                    if (err) {
                        onFinished(err);
                        return;
                    }
                    if ((!token || token.length === 0) && !that._options.ALLOW_NO_TOKEN) {
                        onFinished(new Error('No access token'));
                        return;
                    }

                    var urlBase = 'https://' + that._getAnalyticsHost();
                    that._log(logPrefix + 'Sending analytics to ' + urlBase + INGEST_PATH);
                    if (isNodeJS()) {
                        var reqHeaders = {
                            'x-api-key'         : that._options.ANALYTICS_API_KEY,
                            'X-Product'         : that._options.ANALYTICS_X_PRODUCT,
                            'X-Request-Id'      : requestId,
                            'Content-Type'      : 'application/json'
                        };
                        if (token) {
                            reqHeaders.Authorization = 'Bearer ' + token;
                        }
                        var requestOptions = {
                            hostname: that._getAnalyticsHost(),
                            port: 443,
                            path: INGEST_PATH,
                            method: 'POST',
                            headers: reqHeaders
                        };
                        if (that._options.ANALYTICS_X_PRODUCT_LOCATION) {
                            requestOptions.headers['X-Product-Location'] = that._options.ANALYTICS_X_PRODUCT_LOCATION;
                        }

                        that._getAgent(urlBase, function (err, proxyOptions) {
                            if (proxyOptions && proxyOptions.agent) {
                                requestOptions.agent = proxyOptions && proxyOptions.agent;
                            } else {
                                extend(requestOptions, proxyOptions || {});
                            }

                            var https = nodeRequire('https');
                            var req = https.request(requestOptions, function (response) {
                                if (response) {
                                    // Need to consume the response data, otherwise the connection resource will never be released.
                                    consumeStream(response);
                                }
                                var statusCode = response && response.statusCode;
                                var headers = response && response.headers;
                                handleResponse(statusCode, headers);
                            });
                            // Use req.once, rather than req.on (avoids hanging onto the resource in case of error)
                            req.once('error', function (err) {
                                onFinished(err);
                            });

                            req.end(JSON.stringify(ingestData));
                        });

                    } else {
                        // Browser
                        var requestBody = JSON.stringify(ingestData);
                        var sendIngestRequest = function (body) {
                            // Send the request
                            var xhr = new XMLHttpRequest();
                            xhr.onreadystatechange = function () {
                                if (this.readyState === 4) {
                                    var headers = xhr.getAllResponseHeaders();
                                    handleResponse(this.status, headers);
                                }
                            };
                            xhr.onerror = function (error) {
                                onFinished(new Error(error));
                            };
                            xhr.open('POST', urlBase + INGEST_PATH, true);
                            xhr.setRequestHeader('x-api-key',           that._options.ANALYTICS_API_KEY);
                            xhr.setRequestHeader('x-user-region',       that._options.ANALYTICS_USER_REGION);
                            xhr.setRequestHeader('Content-Type',        'application/json');
                            if (token) {
                                xhr.setRequestHeader('Authorization',       'Bearer ' + token);
                            }
                            xhr.setRequestHeader('X-Product',           that._options.ANALYTICS_X_PRODUCT);
                            xhr.setRequestHeader('X-Product-Location',  that._options.ANALYTICS_X_PRODUCT_LOCATION);
                            xhr.setRequestHeader('X-Request-Id',        requestId);
                            xhr.send(body);
                        };
                        sendIngestRequest(requestBody);
                    }
                });
            };


            /**
             Public APIs
             **/

            /**
             * Configure whether analytics is enabled or not. Note: By default, analytics are disabled, so you need to
             * explicitly call `ingest.enable(true)` to enable sending analytics.
             *
             * When sending analytics is disabled, events are still queued up, so they can be sent when it's reenabled.
             *
             * @param {Boolean} isEnabled Whether to enable or disable sending analytics.
             *
             * @memberof Ingest
             */
            Ingest.prototype.enable = function (isEnabled) {
                this._isEnabled = isEnabled;
                if (isEnabled) {
                    // If we enable analytics, trigger flushing any queued events
                    this._sendAnalytics(true);
                }
            };

            /**
             * Post an analytics event to ingest.
             *
             * @param {Object} payload Ingest payload to be sent
             * @param {Function} [callback] If supplied, called when the event has been posted (or failed)
             *
             * @memberof Ingest
             */
            Ingest.prototype.postEvent = function (payload, callback) {
                var timestamp = this._formatTimestamp(new Date());
                payload[this._options.TIMESTAMP_PROPERTY_NAME] = timestamp;

                var event = {
                    time: timestamp,
                    project: this._options.ANALYTICS_PROJECT,
                    environment: this._getEnvironment(),
                    ingesttype: this._options.ANALYTICS_INGEST_TYPE,
                    data: payload
                };
                this._queueEvent(event);
                this._sendAnalytics(false, callback);
            };

            /**
             * Flush the analytics (trigger sending any queued analytics to the server)
             *
             * @param {Boolean} immediate Flush event immediately or not
             * @param {Function} [callback] If supplied, called when the flush has finished (or failed)
             *
             * @memberof Ingest
             */
            Ingest.prototype.flush = function (sendImmediately, callback) {
                this._sendAnalytics(sendImmediately, callback);
            };

            module.exports = Ingest

            /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

        /***/ }),
    /* 1 */
    /***/ (function(module, exports) {

        var g;

// This works in non-strict mode
        g = (function() {
            return this;
        })();

        try {
            // This works if eval is allowed (see CSP)
            g = g || Function("return this")() || (1,eval)("this");
        } catch(e) {
            // This works if the window reference is available
            if(typeof window === "object")
                g = window;
        }

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

        module.exports = g;


        /***/ })
    /******/ ]);
//# sourceMappingURL=ingest.js.map
/**
 * @Script: /apps/help/components/step/clientlibs/js/step.js
 * @Author: sunier @ 3/28/2018
 */

$(function() {
    if (DEBUG) {
        console.log("[INFO] Loaded script: /components/step/clientlibs/js/step.js");
    }
});
// scriptname: shared/accordion/accordion-container/clientlibs-article-3/js/accordion.js

var helpx = helpx || {};

helpx.accordion = (function() {
    function _init() {
        _accordionAccessibility();
        _addBullets();
        _expandAccordion();
        _bindUI();

        // speak!
        if(DEBUG) {console.log('%c[INFO] HELPX COMPONENT LOADED > helpx.accordion ', 'background:#bb00bb;color:#eee')}
    }

    /**
     * Expand accordion if needed
     */
    function _accordionAccessibility() {
        var containerIndex = 1;
        $('.accordion-container:not(.section)').each(function() {
            var containerId = 'accordion-container-' + containerIndex;
            $(this).attr('id', containerId);
            var itemIndex = 1;
            $(this).children().children('.accordion-item').each(function() {
                $(this).children('.accordion-item-title').find('button.accordion-trigger').attr('aria-controls', containerId + '-content-' + itemIndex).attr('id', containerId + '-trigger-' + itemIndex);
                $(this).children('.accordion-item-content').attr('aria-labelledby', containerId + '-trigger-' + itemIndex).attr('id', containerId + '-content-' + itemIndex);
                itemIndex++;
            });
            containerIndex++;
        });
        $('.flattened-accordion .accordion-trigger').attr('aria-expanded', 'true').attr('aria-disabled', 'true');
    }

    /**
     * Expand accordion if needed
     */
    function _expandAccordion() {
        $('.accordion-container.expanded-by-default .accordion-item').each(function () {
            $(this).addClass("open");
            $(this).children('.accordion-item-title').find('.accordion-icon').addClass('opened');
            $(this).children('.accordion-item-title').find('button.accordion-trigger').attr('aria-expanded', 'true');
        });
    }

    /**
     * Add spans for bullet icons
     */
    function _addBullets() {
        $('.accordion-item-title button.accordion-trigger').each(function () {
            $(this).prepend('<span class="accordion-icon"></span>');
        });
    }

    /**
     * Bind onClick event listeners to accordion headings
     */
    function _bindUI() {
        $('.accordion-item-title button.accordion-trigger').click(function () {
            if (typeof(CQ) === "undefined") {  // prevent toggle in authoring
                //prevent default toggle effect of accordion items when "flattened-accordion" is enabled for cloud-hub/product-hub
                if (!$(this).parent().parents().hasClass('flattened-accordion')) {
                    var item = $(this).parent().parent();
                    item.toggleClass("open");
                    // expand or collapse this section
                    var content = item.children('.accordion-item-content');
                    if ($(content).is(':visible')) {
                        $(this).attr('aria-expanded', 'false');
                        $(content).slideToggle("100");
                        item.children('.accordion-item-title').find('.accordion-icon').removeClass('opened');
                    } else {
                        $(this).attr('aria-expanded', 'true');
                        $(content).slideToggle("100");
                        item.children('.accordion-item-title').find('.accordion-icon').addClass('opened');
                    }
                }
            }
        });
    }

    /**
     * Public APIs
     */
    return {
        init: _init
    };

})();

// init accordion component
$(document).ready(function() {
    helpx.accordion.init();
});


/**
 * @Script: /apps/help/components/procedure/clientlibs/js/procedure.js
 * @Author: sunier @ 3/28/2018
 */

$(function() {
    if (DEBUG) {
        console.log("[INFO] Loaded script: /components/procedure/clientlibs/js/procedure.js");
    }
    /*$(document).ready(function () {
        console.log("hello");
    });
    console.log("sup");
    var cQWidth = $(“.cq-editrollover-insert-container”).width();
    $(“.cq-editrollover-insert-container”).css(‘width’,cQWidth - 1);*/

});
/*!
 * XRegExp 3.0.0
 * <http://xregexp.com/>
 * Steven Levithan (c) 2007-2015 MIT License
 */

/**
 * XRegExp provides augmented, extensible regular expressions. You get additional regex syntax and
 * flags, beyond what browsers support natively. XRegExp is also a regex utility belt with tools to
 * make your client-side grepping simpler and more powerful, while freeing you from related
 * cross-browser inconsistencies.
 */
var XRegExp = (function(undefined) {
    'use strict';

/* ==============================
 * Private variables
 * ============================== */

    var // Internal reference to the `XRegExp` object
        self,
        // Property name used for extended regex instance data
        REGEX_DATA = 'xregexp',
        // Optional features that can be installed and uninstalled
        features = {
            astral: false,
            natives: false
        },
        // Native methods to use and restore ('native' is an ES3 reserved keyword)
        nativ = {
            exec: RegExp.prototype.exec,
            test: RegExp.prototype.test,
            match: String.prototype.match,
            replace: String.prototype.replace,
            split: String.prototype.split
        },
        // Storage for fixed/extended native methods
        fixed = {},
        // Storage for regexes cached by `XRegExp.cache`
        regexCache = {},
        // Storage for pattern details cached by the `XRegExp` constructor
        patternCache = {},
        // Storage for regex syntax tokens added internally or by `XRegExp.addToken`
        tokens = [],
        // Token scopes
        defaultScope = 'default',
        classScope = 'class',
        // Regexes that match native regex syntax, including octals
        nativeTokens = {
            // Any native multicharacter token in default scope, or any single character
            'default': /\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??|[\s\S]/,
            // Any native multicharacter token in character class scope, or any single character
            'class': /\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|[\s\S]/
        },
        // Any backreference or dollar-prefixed character in replacement strings
        replacementToken = /\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g,
        // Check for correct `exec` handling of nonparticipating capturing groups
        correctExecNpcg = nativ.exec.call(/()??/, '')[1] === undefined,
        // Check for ES6 `u` flag support
        hasNativeU = (function() {
            var isSupported = true;
            try {
                new RegExp('', 'u');
            } catch (exception) {
                isSupported = false;
            }
            return isSupported;
        }()),
        // Check for ES6 `y` flag support
        hasNativeY = (function() {
            var isSupported = true;
            try {
                new RegExp('', 'y');
            } catch (exception) {
                isSupported = false;
            }
            return isSupported;
        }()),
        // Check for ES6 `flags` prop support
        hasFlagsProp = /a/.flags !== undefined,
        // Tracker for known flags, including addon flags
        registeredFlags = {
            g: true,
            i: true,
            m: true,
            u: hasNativeU,
            y: hasNativeY
        },
        // Shortcut to `Object.prototype.toString`
        toString = {}.toString,
        // Shortcut to `XRegExp.addToken`
        add;

/* ==============================
 * Private functions
 * ============================== */

/**
 * Attaches extended data and `XRegExp.prototype` properties to a regex object.
 *
 * @private
 * @param {RegExp} regex Regex to augment.
 * @param {Array} captureNames Array with capture names, or `null`.
 * @param {String} xSource XRegExp pattern used to generate `regex`, or `null` if N/A.
 * @param {String} xFlags XRegExp flags used to generate `regex`, or `null` if N/A.
 * @param {Boolean} [isInternalOnly=false] Whether the regex will be used only for internal
 *   operations, and never exposed to users. For internal-only regexes, we can improve perf by
 *   skipping some operations like attaching `XRegExp.prototype` properties.
 * @returns {RegExp} Augmented regex.
 */
    function augment(regex, captureNames, xSource, xFlags, isInternalOnly) {
        var p;

        regex[REGEX_DATA] = {
            captureNames: captureNames
        };

        if (isInternalOnly) {
            return regex;
        }

        // Can't auto-inherit these since the XRegExp constructor returns a nonprimitive value
        if (regex.__proto__) {
            regex.__proto__ = self.prototype;
        } else {
            for (p in self.prototype) {
                // A `self.prototype.hasOwnProperty(p)` check wouldn't be worth it here, since this
                // is performance sensitive, and enumerable `Object.prototype` or `RegExp.prototype`
                // extensions exist on `regex.prototype` anyway
                regex[p] = self.prototype[p];
            }
        }

        regex[REGEX_DATA].source = xSource;
        // Emulate the ES6 `flags` prop by ensuring flags are in alphabetical order
        regex[REGEX_DATA].flags = xFlags ? xFlags.split('').sort().join('') : xFlags;

        return regex;
    }

/**
 * Removes any duplicate characters from the provided string.
 *
 * @private
 * @param {String} str String to remove duplicate characters from.
 * @returns {String} String with any duplicate characters removed.
 */
    function clipDuplicates(str) {
        return nativ.replace.call(str, /([\s\S])(?=[\s\S]*\1)/g, '');
    }

/**
 * Copies a regex object while preserving extended data and augmenting with `XRegExp.prototype`
 * properties. The copy has a fresh `lastIndex` property (set to zero). Allows adding and removing
 * flags g and y while copying the regex.
 *
 * @private
 * @param {RegExp} regex Regex to copy.
 * @param {Object} [options] Options object with optional properties:
 *   <li>`addG` {Boolean} Add flag g while copying the regex.
 *   <li>`addY` {Boolean} Add flag y while copying the regex.
 *   <li>`removeG` {Boolean} Remove flag g while copying the regex.
 *   <li>`removeY` {Boolean} Remove flag y while copying the regex.
 *   <li>`isInternalOnly` {Boolean} Whether the copied regex will be used only for internal
 *     operations, and never exposed to users. For internal-only regexes, we can improve perf by
 *     skipping some operations like attaching `XRegExp.prototype` properties.
 * @returns {RegExp} Copy of the provided regex, possibly with modified flags.
 */
    function copyRegex(regex, options) {
        if (!self.isRegExp(regex)) {
            throw new TypeError('Type RegExp expected');
        }

        var xData = regex[REGEX_DATA] || {},
            flags = getNativeFlags(regex),
            flagsToAdd = '',
            flagsToRemove = '',
            xregexpSource = null,
            xregexpFlags = null;

        options = options || {};

        if (options.removeG) {flagsToRemove += 'g';}
        if (options.removeY) {flagsToRemove += 'y';}
        if (flagsToRemove) {
            flags = nativ.replace.call(flags, new RegExp('[' + flagsToRemove + ']+', 'g'), '');
        }

        if (options.addG) {flagsToAdd += 'g';}
        if (options.addY) {flagsToAdd += 'y';}
        if (flagsToAdd) {
            flags = clipDuplicates(flags + flagsToAdd);
        }

        if (!options.isInternalOnly) {
            if (xData.source !== undefined) {
                xregexpSource = xData.source;
            }
            // null or undefined; don't want to add to `flags` if the previous value was null, since
            // that indicates we're not tracking original precompilation flags
            if (xData.flags != null) {
                // Flags are only added for non-internal regexes by `XRegExp.globalize`. Flags are
                // never removed for non-internal regexes, so don't need to handle it
                xregexpFlags = flagsToAdd ? clipDuplicates(xData.flags + flagsToAdd) : xData.flags;
            }
        }

        // Augment with `XRegExp.prototype` properties, but use the native `RegExp` constructor to
        // avoid searching for special tokens. That would be wrong for regexes constructed by
        // `RegExp`, and unnecessary for regexes constructed by `XRegExp` because the regex has
        // already undergone the translation to native regex syntax
        regex = augment(
            new RegExp(regex.source, flags),
            hasNamedCapture(regex) ? xData.captureNames.slice(0) : null,
            xregexpSource,
            xregexpFlags,
            options.isInternalOnly
        );

        return regex;
    }

/**
 * Converts hexadecimal to decimal.
 *
 * @private
 * @param {String} hex
 * @returns {Number}
 */
    function dec(hex) {
        return parseInt(hex, 16);
    }

/**
 * Returns native `RegExp` flags used by a regex object.
 *
 * @private
 * @param {RegExp} regex Regex to check.
 * @returns {String} Native flags in use.
 */
    function getNativeFlags(regex) {
        return hasFlagsProp ?
            regex.flags :
            // Explicitly using `RegExp.prototype.toString` (rather than e.g. `String` or
            // concatenation with an empty string) allows this to continue working predictably when
            // `XRegExp.proptotype.toString` is overriden
            nativ.exec.call(/\/([a-z]*)$/i, RegExp.prototype.toString.call(regex))[1];
    }

/**
 * Determines whether a regex has extended instance data used to track capture names.
 *
 * @private
 * @param {RegExp} regex Regex to check.
 * @returns {Boolean} Whether the regex uses named capture.
 */
    function hasNamedCapture(regex) {
        return !!(regex[REGEX_DATA] && regex[REGEX_DATA].captureNames);
    }

/**
 * Converts decimal to hexadecimal.
 *
 * @private
 * @param {Number|String} dec
 * @returns {String}
 */
    function hex(dec) {
        return parseInt(dec, 10).toString(16);
    }

/**
 * Returns the first index at which a given value can be found in an array.
 *
 * @private
 * @param {Array} array Array to search.
 * @param {*} value Value to locate in the array.
 * @returns {Number} Zero-based index at which the item is found, or -1.
 */
    function indexOf(array, value) {
        var len = array.length, i;

        for (i = 0; i < len; ++i) {
            if (array[i] === value) {
                return i;
            }
        }

        return -1;
    }

/**
 * Determines whether a value is of the specified type, by resolving its internal [[Class]].
 *
 * @private
 * @param {*} value Object to check.
 * @param {String} type Type to check for, in TitleCase.
 * @returns {Boolean} Whether the object matches the type.
 */
    function isType(value, type) {
        return toString.call(value) === '[object ' + type + ']';
    }

/**
 * Checks whether the next nonignorable token after the specified position is a quantifier.
 *
 * @private
 * @param {String} pattern Pattern to search within.
 * @param {Number} pos Index in `pattern` to search at.
 * @param {String} flags Flags used by the pattern.
 * @returns {Boolean} Whether the next token is a quantifier.
 */
    function isQuantifierNext(pattern, pos, flags) {
        return nativ.test.call(
            flags.indexOf('x') > -1 ?
                // Ignore any leading whitespace, line comments, and inline comments
                /^(?:\s+|#.*|\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/ :
                // Ignore any leading inline comments
                /^(?:\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/,
            pattern.slice(pos)
        );
    }

/**
 * Pads the provided string with as many leading zeros as needed to get to length 4. Used to produce
 * fixed-length hexadecimal values.
 *
 * @private
 * @param {String} str
 * @returns {String}
 */
    function pad4(str) {
        while (str.length < 4) {
            str = '0' + str;
        }
        return str;
    }

/**
 * Checks for flag-related errors, and strips/applies flags in a leading mode modifier. Offloads
 * the flag preparation logic from the `XRegExp` constructor.
 *
 * @private
 * @param {String} pattern Regex pattern, possibly with a leading mode modifier.
 * @param {String} flags Any combination of flags.
 * @returns {Object} Object with properties `pattern` and `flags`.
 */
    function prepareFlags(pattern, flags) {
        var i;

        // Recent browsers throw on duplicate flags, so copy this behavior for nonnative flags
        if (clipDuplicates(flags) !== flags) {
            throw new SyntaxError('Invalid duplicate regex flag ' + flags);
        }

        // Strip and apply a leading mode modifier with any combination of flags except g or y
        pattern = nativ.replace.call(pattern, /^\(\?([\w$]+)\)/, function($0, $1) {
            if (nativ.test.call(/[gy]/, $1)) {
                throw new SyntaxError('Cannot use flag g or y in mode modifier ' + $0);
            }
            // Allow duplicate flags within the mode modifier
            flags = clipDuplicates(flags + $1);
            return '';
        });

        // Throw on unknown native or nonnative flags
        for (i = 0; i < flags.length; ++i) {
            if (!registeredFlags[flags.charAt(i)]) {
                throw new SyntaxError('Unknown regex flag ' + flags.charAt(i));
            }
        }

        return {
            pattern: pattern,
            flags: flags
        };
    }

/**
 * Prepares an options object from the given value.
 *
 * @private
 * @param {String|Object} value Value to convert to an options object.
 * @returns {Object} Options object.
 */
    function prepareOptions(value) {
        var options = {};

        if (isType(value, 'String')) {
            self.forEach(value, /[^\s,]+/, function(match) {
                options[match] = true;
            });

            return options;
        }

        return value;
    }

/**
 * Registers a flag so it doesn't throw an 'unknown flag' error.
 *
 * @private
 * @param {String} flag Single-character flag to register.
 */
    function registerFlag(flag) {
        if (!/^[\w$]$/.test(flag)) {
            throw new Error('Flag must be a single character A-Za-z0-9_$');
        }

        registeredFlags[flag] = true;
    }

/**
 * Runs built-in and custom regex syntax tokens in reverse insertion order at the specified
 * position, until a match is found.
 *
 * @private
 * @param {String} pattern Original pattern from which an XRegExp object is being built.
 * @param {String} flags Flags being used to construct the regex.
 * @param {Number} pos Position to search for tokens within `pattern`.
 * @param {Number} scope Regex scope to apply: 'default' or 'class'.
 * @param {Object} context Context object to use for token handler functions.
 * @returns {Object} Object with properties `matchLength`, `output`, and `reparse`; or `null`.
 */
    function runTokens(pattern, flags, pos, scope, context) {
        var i = tokens.length,
            leadChar = pattern.charAt(pos),
            result = null,
            match,
            t;

        // Run in reverse insertion order
        while (i--) {
            t = tokens[i];
            if (
                (t.leadChar && t.leadChar !== leadChar) ||
                (t.scope !== scope && t.scope !== 'all') ||
                (t.flag && flags.indexOf(t.flag) === -1)
            ) {
                continue;
            }

            match = self.exec(pattern, t.regex, pos, 'sticky');
            if (match) {
                result = {
                    matchLength: match[0].length,
                    output: t.handler.call(context, match, scope, flags),
                    reparse: t.reparse
                };
                // Finished with token tests
                break;
            }
        }

        return result;
    }

/**
 * Enables or disables implicit astral mode opt-in. When enabled, flag A is automatically added to
 * all new regexes created by XRegExp. This causes an error to be thrown when creating regexes if
 * the Unicode Base addon is not available, since flag A is registered by that addon.
 *
 * @private
 * @param {Boolean} on `true` to enable; `false` to disable.
 */
    function setAstral(on) {
        features.astral = on;
    }

/**
 * Enables or disables native method overrides.
 *
 * @private
 * @param {Boolean} on `true` to enable; `false` to disable.
 */
    function setNatives(on) {
        RegExp.prototype.exec = (on ? fixed : nativ).exec;
        RegExp.prototype.test = (on ? fixed : nativ).test;
        String.prototype.match = (on ? fixed : nativ).match;
        String.prototype.replace = (on ? fixed : nativ).replace;
        String.prototype.split = (on ? fixed : nativ).split;

        features.natives = on;
    }

/**
 * Returns the object, or throws an error if it is `null` or `undefined`. This is used to follow
 * the ES5 abstract operation `ToObject`.
 *
 * @private
 * @param {*} value Object to check and return.
 * @returns {*} The provided object.
 */
    function toObject(value) {
        // null or undefined
        if (value == null) {
            throw new TypeError('Cannot convert null or undefined to object');
        }

        return value;
    }

/* ==============================
 * Constructor
 * ============================== */

/**
 * Creates an extended regular expression object for matching text with a pattern. Differs from a
 * native regular expression in that additional syntax and flags are supported. The returned object
 * is in fact a native `RegExp` and works with all native methods.
 *
 * @class XRegExp
 * @constructor
 * @param {String|RegExp} pattern Regex pattern string, or an existing regex object to copy.
 * @param {String} [flags] Any combination of flags.
 *   Native flags:
 *     <li>`g` - global
 *     <li>`i` - ignore case
 *     <li>`m` - multiline anchors
 *     <li>`u` - unicode (ES6)
 *     <li>`y` - sticky (Firefox 3+, ES6)
 *   Additional XRegExp flags:
 *     <li>`n` - explicit capture
 *     <li>`s` - dot matches all (aka singleline)
 *     <li>`x` - free-spacing and line comments (aka extended)
 *     <li>`A` - astral (requires the Unicode Base addon)
 *   Flags cannot be provided when constructing one `RegExp` from another.
 * @returns {RegExp} Extended regular expression object.
 * @example
 *
 * // With named capture and flag x
 * XRegExp('(?<year>  [0-9]{4} ) -?  # year  \n\
 *          (?<month> [0-9]{2} ) -?  # month \n\
 *          (?<day>   [0-9]{2} )     # day   ', 'x');
 *
 * // Providing a regex object copies it. Native regexes are recompiled using native (not XRegExp)
 * // syntax. Copies maintain extended data, are augmented with `XRegExp.prototype` properties, and
 * // have fresh `lastIndex` properties (set to zero).
 * XRegExp(/regex/);
 */
    self = function(pattern, flags) {
        var context = {
                hasNamedCapture: false,
                captureNames: []
            },
            scope = defaultScope,
            output = '',
            pos = 0,
            result,
            token,
            generated,
            appliedPattern,
            appliedFlags;

        if (self.isRegExp(pattern)) {
            if (flags !== undefined) {
                throw new TypeError('Cannot supply flags when copying a RegExp');
            }
            return copyRegex(pattern);
        }

        // Copy the argument behavior of `RegExp`
        pattern = pattern === undefined ? '' : String(pattern);
        flags = flags === undefined ? '' : String(flags);

        if (self.isInstalled('astral') && flags.indexOf('A') === -1) {
            // This causes an error to be thrown if the Unicode Base addon is not available
            flags += 'A';
        }

        if (!patternCache[pattern]) {
            patternCache[pattern] = {};
        }

        if (!patternCache[pattern][flags]) {
            // Check for flag-related errors, and strip/apply flags in a leading mode modifier
            result = prepareFlags(pattern, flags);
            appliedPattern = result.pattern;
            appliedFlags = result.flags;

            // Use XRegExp's tokens to translate the pattern to a native regex pattern.
            // `appliedPattern.length` may change on each iteration if tokens use `reparse`
            while (pos < appliedPattern.length) {
                do {
                    // Check for custom tokens at the current position
                    result = runTokens(appliedPattern, appliedFlags, pos, scope, context);
                    // If the matched token used the `reparse` option, splice its output into the
                    // pattern before running tokens again at the same position
                    if (result && result.reparse) {
                        appliedPattern = appliedPattern.slice(0, pos) +
                            result.output +
                            appliedPattern.slice(pos + result.matchLength);
                    }
                } while (result && result.reparse);

                if (result) {
                    output += result.output;
                    pos += (result.matchLength || 1);
                } else {
                    // Get the native token at the current position
                    token = self.exec(appliedPattern, nativeTokens[scope], pos, 'sticky')[0];
                    output += token;
                    pos += token.length;
                    if (token === '[' && scope === defaultScope) {
                        scope = classScope;
                    } else if (token === ']' && scope === classScope) {
                        scope = defaultScope;
                    }
                }
            }

            patternCache[pattern][flags] = {
                // Cleanup token cruft: repeated `(?:)(?:)` and leading/trailing `(?:)`
                pattern: nativ.replace.call(output, /\(\?:\)(?=\(\?:\))|^\(\?:\)|\(\?:\)$/g, ''),
                // Strip all but native flags
                flags: nativ.replace.call(appliedFlags, /[^gimuy]+/g, ''),
                // `context.captureNames` has an item for each capturing group, even if unnamed
                captures: context.hasNamedCapture ? context.captureNames : null
            };
        }

        generated = patternCache[pattern][flags];
        return augment(
            new RegExp(generated.pattern, generated.flags),
            generated.captures,
            pattern,
            flags
        );
    };

// Add `RegExp.prototype` to the prototype chain
    self.prototype = new RegExp();

/* ==============================
 * Public properties
 * ============================== */

/**
 * The XRegExp version number.
 *
 * @static
 * @memberOf XRegExp
 * @type String
 */
    self.version = '3.0.0';

/* ==============================
 * Public methods
 * ============================== */

/**
 * Extends XRegExp syntax and allows custom flags. This is used internally and can be used to
 * create XRegExp addons. If more than one token can match the same string, the last added wins.
 *
 * @memberOf XRegExp
 * @param {RegExp} regex Regex object that matches the new token.
 * @param {Function} handler Function that returns a new pattern string (using native regex syntax)
 *   to replace the matched token within all future XRegExp regexes. Has access to persistent
 *   properties of the regex being built, through `this`. Invoked with three arguments:
 *   <li>The match array, with named backreference properties.
 *   <li>The regex scope where the match was found: 'default' or 'class'.
 *   <li>The flags used by the regex, including any flags in a leading mode modifier.
 *   The handler function becomes part of the XRegExp construction process, so be careful not to
 *   construct XRegExps within the function or you will trigger infinite recursion.
 * @param {Object} [options] Options object with optional properties:
 *   <li>`scope` {String} Scope where the token applies: 'default', 'class', or 'all'.
 *   <li>`flag` {String} Single-character flag that triggers the token. This also registers the
 *     flag, which prevents XRegExp from throwing an 'unknown flag' error when the flag is used.
 *   <li>`optionalFlags` {String} Any custom flags checked for within the token `handler` that are
 *     not required to trigger the token. This registers the flags, to prevent XRegExp from
 *     throwing an 'unknown flag' error when any of the flags are used.
 *   <li>`reparse` {Boolean} Whether the `handler` function's output should not be treated as
 *     final, and instead be reparseable by other tokens (including the current token). Allows
 *     token chaining or deferring.
 *   <li>`leadChar` {String} Single character that occurs at the beginning of any successful match
 *     of the token (not always applicable). This doesn't change the behavior of the token unless
 *     you provide an erroneous value. However, providing it can increase the token's performance.
 * @example
 *
 * // Basic usage: Add \a for the ALERT control code
 * XRegExp.addToken(
 *   /\\a/,
 *   function() {return '\\x07';},
 *   {scope: 'all'}
 * );
 * XRegExp('\\a[\\a-\\n]+').test('\x07\n\x07'); // -> true
 *
 * // Add the U (ungreedy) flag from PCRE and RE2, which reverses greedy and lazy quantifiers
 * XRegExp.addToken(
 *   /([?*+]|{\d+(?:,\d*)?})(\??)/,
 *   function(match) {return match[1] + (match[2] ? '' : '?');},
 *   {flag: 'U'}
 * );
 * XRegExp('a+', 'U').exec('aaa')[0]; // -> 'a'
 * XRegExp('a+?', 'U').exec('aaa')[0]; // -> 'aaa'
 */
    self.addToken = function(regex, handler, options) {
        options = options || {};
        var optionalFlags = options.optionalFlags, i;

        if (options.flag) {
            registerFlag(options.flag);
        }

        if (optionalFlags) {
            optionalFlags = nativ.split.call(optionalFlags, '');
            for (i = 0; i < optionalFlags.length; ++i) {
                registerFlag(optionalFlags[i]);
            }
        }

        // Add to the private list of syntax tokens
        tokens.push({
            regex: copyRegex(regex, {
                addG: true,
                addY: hasNativeY,
                isInternalOnly: true
            }),
            handler: handler,
            scope: options.scope || defaultScope,
            flag: options.flag,
            reparse: options.reparse,
            leadChar: options.leadChar
        });

        // Reset the pattern cache used by the `XRegExp` constructor, since the same pattern and
        // flags might now produce different results
        self.cache.flush('patterns');
    };

/**
 * Caches and returns the result of calling `XRegExp(pattern, flags)`. On any subsequent call with
 * the same pattern and flag combination, the cached copy of the regex is returned.
 *
 * @memberOf XRegExp
 * @param {String} pattern Regex pattern string.
 * @param {String} [flags] Any combination of XRegExp flags.
 * @returns {RegExp} Cached XRegExp object.
 * @example
 *
 * while (match = XRegExp.cache('.', 'gs').exec(str)) {
 *   // The regex is compiled once only
 * }
 */
    self.cache = function(pattern, flags) {
        if (!regexCache[pattern]) {
            regexCache[pattern] = {};
        }
        return regexCache[pattern][flags] || (
            regexCache[pattern][flags] = self(pattern, flags)
        );
    };

// Intentionally undocumented
    self.cache.flush = function(cacheName) {
        if (cacheName === 'patterns') {
            // Flush the pattern cache used by the `XRegExp` constructor
            patternCache = {};
        } else {
            // Flush the regex cache populated by `XRegExp.cache`
            regexCache = {};
        }
    };

/**
 * Escapes any regular expression metacharacters, for use when matching literal strings. The result
 * can safely be used at any point within a regex that uses any flags.
 *
 * @memberOf XRegExp
 * @param {String} str String to escape.
 * @returns {String} String with regex metacharacters escaped.
 * @example
 *
 * XRegExp.escape('Escaped? <.>');
 * // -> 'Escaped\?\ <\.>'
 */
    self.escape = function(str) {
        return nativ.replace.call(toObject(str), /[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };

/**
 * Executes a regex search in a specified string. Returns a match array or `null`. If the provided
 * regex uses named capture, named backreference properties are included on the match array.
 * Optional `pos` and `sticky` arguments specify the search start position, and whether the match
 * must start at the specified position only. The `lastIndex` property of the provided regex is not
 * used, but is updated for compatibility. Also fixes browser bugs compared to the native
 * `RegExp.prototype.exec` and can be used reliably cross-browser.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {Number} [pos=0] Zero-based index at which to start the search.
 * @param {Boolean|String} [sticky=false] Whether the match must start at the specified position
 *   only. The string `'sticky'` is accepted as an alternative to `true`.
 * @returns {Array} Match array with named backreference properties, or `null`.
 * @example
 *
 * // Basic use, with named backreference
 * var match = XRegExp.exec('U+2620', XRegExp('U\\+(?<hex>[0-9A-F]{4})'));
 * match.hex; // -> '2620'
 *
 * // With pos and sticky, in a loop
 * var pos = 2, result = [], match;
 * while (match = XRegExp.exec('<1><2><3><4>5<6>', /<(\d)>/, pos, 'sticky')) {
 *   result.push(match[1]);
 *   pos = match.index + match[0].length;
 * }
 * // result -> ['2', '3', '4']
 */
    self.exec = function(str, regex, pos, sticky) {
        var cacheKey = 'g',
            addY = false,
            match,
            r2;

        addY = hasNativeY && !!(sticky || (regex.sticky && sticky !== false));
        if (addY) {
            cacheKey += 'y';
        }

        regex[REGEX_DATA] = regex[REGEX_DATA] || {};

        // Shares cached copies with `XRegExp.match`/`replace`
        r2 = regex[REGEX_DATA][cacheKey] || (
            regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
                addG: true,
                addY: addY,
                removeY: sticky === false,
                isInternalOnly: true
            })
        );

        r2.lastIndex = pos = pos || 0;

        // Fixed `exec` required for `lastIndex` fix, named backreferences, etc.
        match = fixed.exec.call(r2, str);

        if (sticky && match && match.index !== pos) {
            match = null;
        }

        if (regex.global) {
            regex.lastIndex = match ? r2.lastIndex : 0;
        }

        return match;
    };

/**
 * Executes a provided function once per regex match.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {Function} callback Function to execute for each match. Invoked with four arguments:
 *   <li>The match array, with named backreference properties.
 *   <li>The zero-based match index.
 *   <li>The string being traversed.
 *   <li>The regex object being used to traverse the string.
 * @example
 *
 * // Extracts every other digit from a string
 * XRegExp.forEach('1a2345', /\d/, function(match, i) {
 *   if (i % 2) this.push(+match[0]);
 * }, []);
 * // -> [2, 4]
 */
    self.forEach = function(str, regex, callback) {
        var pos = 0,
            i = -1,
            match;

        while ((match = self.exec(str, regex, pos))) {
            // Because `regex` is provided to `callback`, the function could use the deprecated/
            // nonstandard `RegExp.prototype.compile` to mutate the regex. However, since
            // `XRegExp.exec` doesn't use `lastIndex` to set the search position, this can't lead
            // to an infinite loop, at least. Actually, because of the way `XRegExp.exec` caches
            // globalized versions of regexes, mutating the regex will not have any effect on the
            // iteration or matched strings, which is a nice side effect that brings extra safety
            callback(match, ++i, str, regex);

            pos = match.index + (match[0].length || 1);
        }
    };

/**
 * Copies a regex object and adds flag `g`. The copy maintains extended data, is augmented with
 * `XRegExp.prototype` properties, and has a fresh `lastIndex` property (set to zero). Native
 * regexes are not recompiled using XRegExp syntax.
 *
 * @memberOf XRegExp
 * @param {RegExp} regex Regex to globalize.
 * @returns {RegExp} Copy of the provided regex with flag `g` added.
 * @example
 *
 * var globalCopy = XRegExp.globalize(/regex/);
 * globalCopy.global; // -> true
 */
    self.globalize = function(regex) {
        return copyRegex(regex, {addG: true});
    };

/**
 * Installs optional features according to the specified options. Can be undone using
 * {@link #XRegExp.uninstall}.
 *
 * @memberOf XRegExp
 * @param {Object|String} options Options object or string.
 * @example
 *
 * // With an options object
 * XRegExp.install({
 *   // Enables support for astral code points in Unicode addons (implicitly sets flag A)
 *   astral: true,
 *
 *   // Overrides native regex methods with fixed/extended versions that support named
 *   // backreferences and fix numerous cross-browser bugs
 *   natives: true
 * });
 *
 * // With an options string
 * XRegExp.install('astral natives');
 */
    self.install = function(options) {
        options = prepareOptions(options);

        if (!features.astral && options.astral) {
            setAstral(true);
        }

        if (!features.natives && options.natives) {
            setNatives(true);
        }
    };

/**
 * Checks whether an individual optional feature is installed.
 *
 * @memberOf XRegExp
 * @param {String} feature Name of the feature to check. One of:
 *   <li>`natives`
 *   <li>`astral`
 * @returns {Boolean} Whether the feature is installed.
 * @example
 *
 * XRegExp.isInstalled('natives');
 */
    self.isInstalled = function(feature) {
        return !!(features[feature]);
    };

/**
 * Returns `true` if an object is a regex; `false` if it isn't. This works correctly for regexes
 * created in another frame, when `instanceof` and `constructor` checks would fail.
 *
 * @memberOf XRegExp
 * @param {*} value Object to check.
 * @returns {Boolean} Whether the object is a `RegExp` object.
 * @example
 *
 * XRegExp.isRegExp('string'); // -> false
 * XRegExp.isRegExp(/regex/i); // -> true
 * XRegExp.isRegExp(RegExp('^', 'm')); // -> true
 * XRegExp.isRegExp(XRegExp('(?s).')); // -> true
 */
    self.isRegExp = function(value) {
        return toString.call(value) === '[object RegExp]';
        //return isType(value, 'RegExp');
    };

/**
 * Returns the first matched string, or in global mode, an array containing all matched strings.
 * This is essentially a more convenient re-implementation of `String.prototype.match` that gives
 * the result types you actually want (string instead of `exec`-style array in match-first mode,
 * and an empty array instead of `null` when no matches are found in match-all mode). It also lets
 * you override flag g and ignore `lastIndex`, and fixes browser bugs.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {String} [scope='one'] Use 'one' to return the first match as a string. Use 'all' to
 *   return an array of all matched strings. If not explicitly specified and `regex` uses flag g,
 *   `scope` is 'all'.
 * @returns {String|Array} In match-first mode: First match as a string, or `null`. In match-all
 *   mode: Array of all matched strings, or an empty array.
 * @example
 *
 * // Match first
 * XRegExp.match('abc', /\w/); // -> 'a'
 * XRegExp.match('abc', /\w/g, 'one'); // -> 'a'
 * XRegExp.match('abc', /x/g, 'one'); // -> null
 *
 * // Match all
 * XRegExp.match('abc', /\w/g); // -> ['a', 'b', 'c']
 * XRegExp.match('abc', /\w/, 'all'); // -> ['a', 'b', 'c']
 * XRegExp.match('abc', /x/, 'all'); // -> []
 */
    self.match = function(str, regex, scope) {
        var global = (regex.global && scope !== 'one') || scope === 'all',
            cacheKey = ((global ? 'g' : '') + (regex.sticky ? 'y' : '')) || 'noGY',
            result,
            r2;

        regex[REGEX_DATA] = regex[REGEX_DATA] || {};

        // Shares cached copies with `XRegExp.exec`/`replace`
        r2 = regex[REGEX_DATA][cacheKey] || (
            regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
                addG: !!global,
                addY: !!regex.sticky,
                removeG: scope === 'one',
                isInternalOnly: true
            })
        );

        result = nativ.match.call(toObject(str), r2);

        if (regex.global) {
            regex.lastIndex = (
                (scope === 'one' && result) ?
                    // Can't use `r2.lastIndex` since `r2` is nonglobal in this case
                    (result.index + result[0].length) : 0
            );
        }

        return global ? (result || []) : (result && result[0]);
    };

/**
 * Retrieves the matches from searching a string using a chain of regexes that successively search
 * within previous matches. The provided `chain` array can contain regexes and objects with `regex`
 * and `backref` properties. When a backreference is specified, the named or numbered backreference
 * is passed forward to the next regex or returned.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {Array} chain Regexes that each search for matches within preceding results.
 * @returns {Array} Matches by the last regex in the chain, or an empty array.
 * @example
 *
 * // Basic usage; matches numbers within <b> tags
 * XRegExp.matchChain('1 <b>2</b> 3 <b>4 a 56</b>', [
 *   XRegExp('(?is)<b>.*?</b>'),
 *   /\d+/
 * ]);
 * // -> ['2', '4', '56']
 *
 * // Passing forward and returning specific backreferences
 * html = '<a href="http://xregexp.com/api/">XRegExp</a>\
 *         <a href="http://www.google.com/">Google</a>';
 * XRegExp.matchChain(html, [
 *   {regex: /<a href="([^"]+)">/i, backref: 1},
 *   {regex: XRegExp('(?i)^https?://(?<domain>[^/?#]+)'), backref: 'domain'}
 * ]);
 * // -> ['xregexp.com', 'www.google.com']
 */
    self.matchChain = function(str, chain) {
        return (function recurseChain(values, level) {
            var item = chain[level].regex ? chain[level] : {regex: chain[level]},
                matches = [],
                addMatch = function(match) {
                    if (item.backref) {
                        /* Safari 4.0.5 (but not 5.0.5+) inappropriately uses sparse arrays to hold
                         * the `undefined`s for backreferences to nonparticipating capturing
                         * groups. In such cases, a `hasOwnProperty` or `in` check on its own would
                         * inappropriately throw the exception, so also check if the backreference
                         * is a number that is within the bounds of the array.
                         */
                        if (!(match.hasOwnProperty(item.backref) || +item.backref < match.length)) {
                            throw new ReferenceError('Backreference to undefined group: ' + item.backref);
                        }

                        matches.push(match[item.backref] || '');
                    } else {
                        matches.push(match[0]);
                    }
                },
                i;

            for (i = 0; i < values.length; ++i) {
                self.forEach(values[i], item.regex, addMatch);
            }

            return ((level === chain.length - 1) || !matches.length) ?
                matches :
                recurseChain(matches, level + 1);
        }([str], 0));
    };

/**
 * Returns a new string with one or all matches of a pattern replaced. The pattern can be a string
 * or regex, and the replacement can be a string or a function to be called for each match. To
 * perform a global search and replace, use the optional `scope` argument or include flag g if using
 * a regex. Replacement strings can use `${n}` for named and numbered backreferences. Replacement
 * functions can use named backreferences via `arguments[0].name`. Also fixes browser bugs compared
 * to the native `String.prototype.replace` and can be used reliably cross-browser.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp|String} search Search pattern to be replaced.
 * @param {String|Function} replacement Replacement string or a function invoked to create it.
 *   Replacement strings can include special replacement syntax:
 *     <li>$$ - Inserts a literal $ character.
 *     <li>$&, $0 - Inserts the matched substring.
 *     <li>$` - Inserts the string that precedes the matched substring (left context).
 *     <li>$' - Inserts the string that follows the matched substring (right context).
 *     <li>$n, $nn - Where n/nn are digits referencing an existent capturing group, inserts
 *       backreference n/nn.
 *     <li>${n} - Where n is a name or any number of digits that reference an existent capturing
 *       group, inserts backreference n.
 *   Replacement functions are invoked with three or more arguments:
 *     <li>The matched substring (corresponds to $& above). Named backreferences are accessible as
 *       properties of this first argument.
 *     <li>0..n arguments, one for each backreference (corresponding to $1, $2, etc. above).
 *     <li>The zero-based index of the match within the total search string.
 *     <li>The total string being searched.
 * @param {String} [scope='one'] Use 'one' to replace the first match only, or 'all'. If not
 *   explicitly specified and using a regex with flag g, `scope` is 'all'.
 * @returns {String} New string with one or all matches replaced.
 * @example
 *
 * // Regex search, using named backreferences in replacement string
 * var name = XRegExp('(?<first>\\w+) (?<last>\\w+)');
 * XRegExp.replace('John Smith', name, '${last}, ${first}');
 * // -> 'Smith, John'
 *
 * // Regex search, using named backreferences in replacement function
 * XRegExp.replace('John Smith', name, function(match) {
 *   return match.last + ', ' + match.first;
 * });
 * // -> 'Smith, John'
 *
 * // String search, with replace-all
 * XRegExp.replace('RegExp builds RegExps', 'RegExp', 'XRegExp', 'all');
 * // -> 'XRegExp builds XRegExps'
 */
    self.replace = function(str, search, replacement, scope) {
        var isRegex = self.isRegExp(search),
            global = (search.global && scope !== 'one') || scope === 'all',
            cacheKey = ((global ? 'g' : '') + (search.sticky ? 'y' : '')) || 'noGY',
            s2 = search,
            result;

        if (isRegex) {
            search[REGEX_DATA] = search[REGEX_DATA] || {};

            // Shares cached copies with `XRegExp.exec`/`match`. Since a copy is used, `search`'s
            // `lastIndex` isn't updated *during* replacement iterations
            s2 = search[REGEX_DATA][cacheKey] || (
                search[REGEX_DATA][cacheKey] = copyRegex(search, {
                    addG: !!global,
                    addY: !!search.sticky,
                    removeG: scope === 'one',
                    isInternalOnly: true
                })
            );
        } else if (global) {
            s2 = new RegExp(self.escape(String(search)), 'g');
        }

        // Fixed `replace` required for named backreferences, etc.
        result = fixed.replace.call(toObject(str), s2, replacement);

        if (isRegex && search.global) {
            // Fixes IE, Safari bug (last tested IE 9, Safari 5.1)
            search.lastIndex = 0;
        }

        return result;
    };

/**
 * Performs batch processing of string replacements. Used like {@link #XRegExp.replace}, but
 * accepts an array of replacement details. Later replacements operate on the output of earlier
 * replacements. Replacement details are accepted as an array with a regex or string to search for,
 * the replacement string or function, and an optional scope of 'one' or 'all'. Uses the XRegExp
 * replacement text syntax, which supports named backreference properties via `${name}`.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {Array} replacements Array of replacement detail arrays.
 * @returns {String} New string with all replacements.
 * @example
 *
 * str = XRegExp.replaceEach(str, [
 *   [XRegExp('(?<name>a)'), 'z${name}'],
 *   [/b/gi, 'y'],
 *   [/c/g, 'x', 'one'], // scope 'one' overrides /g
 *   [/d/, 'w', 'all'],  // scope 'all' overrides lack of /g
 *   ['e', 'v', 'all'],  // scope 'all' allows replace-all for strings
 *   [/f/g, function($0) {
 *     return $0.toUpperCase();
 *   }]
 * ]);
 */
    self.replaceEach = function(str, replacements) {
        var i, r;

        for (i = 0; i < replacements.length; ++i) {
            r = replacements[i];
            str = self.replace(str, r[0], r[1], r[2]);
        }

        return str;
    };

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 *
 * @memberOf XRegExp
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * XRegExp.split('a b c', ' ');
 * // -> ['a', 'b', 'c']
 *
 * // With limit
 * XRegExp.split('a b c', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * XRegExp.split('..word1..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', '..']
 */
    self.split = function(str, separator, limit) {
        return fixed.split.call(toObject(str), separator, limit);
    };

/**
 * Executes a regex search in a specified string. Returns `true` or `false`. Optional `pos` and
 * `sticky` arguments specify the search start position, and whether the match must start at the
 * specified position only. The `lastIndex` property of the provided regex is not used, but is
 * updated for compatibility. Also fixes browser bugs compared to the native
 * `RegExp.prototype.test` and can be used reliably cross-browser.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {Number} [pos=0] Zero-based index at which to start the search.
 * @param {Boolean|String} [sticky=false] Whether the match must start at the specified position
 *   only. The string `'sticky'` is accepted as an alternative to `true`.
 * @returns {Boolean} Whether the regex matched the provided value.
 * @example
 *
 * // Basic use
 * XRegExp.test('abc', /c/); // -> true
 *
 * // With pos and sticky
 * XRegExp.test('abc', /c/, 0, 'sticky'); // -> false
 */
    self.test = function(str, regex, pos, sticky) {
        // Do this the easy way :-)
        return !!self.exec(str, regex, pos, sticky);
    };

/**
 * Uninstalls optional features according to the specified options. All optional features start out
 * uninstalled, so this is used to undo the actions of {@link #XRegExp.install}.
 *
 * @memberOf XRegExp
 * @param {Object|String} options Options object or string.
 * @example
 *
 * // With an options object
 * XRegExp.uninstall({
 *   // Disables support for astral code points in Unicode addons
 *   astral: true,
 *
 *   // Restores native regex methods
 *   natives: true
 * });
 *
 * // With an options string
 * XRegExp.uninstall('astral natives');
 */
    self.uninstall = function(options) {
        options = prepareOptions(options);

        if (features.astral && options.astral) {
            setAstral(false);
        }

        if (features.natives && options.natives) {
            setNatives(false);
        }
    };

/**
 * Returns an XRegExp object that is the union of the given patterns. Patterns can be provided as
 * regex objects or strings. Metacharacters are escaped in patterns provided as strings.
 * Backreferences in provided regex objects are automatically renumbered to work correctly within
 * the larger combined pattern. Native flags used by provided regexes are ignored in favor of the
 * `flags` argument.
 *
 * @memberOf XRegExp
 * @param {Array} patterns Regexes and strings to combine.
 * @param {String} [flags] Any combination of XRegExp flags.
 * @returns {RegExp} Union of the provided regexes and strings.
 * @example
 *
 * XRegExp.union(['a+b*c', /(dogs)\1/, /(cats)\1/], 'i');
 * // -> /a\+b\*c|(dogs)\1|(cats)\2/i
 */
    self.union = function(patterns, flags) {
        var parts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,
            output = [],
            numCaptures = 0,
            numPriorCaptures,
            captureNames,
            pattern,
            rewrite = function(match, paren, backref) {
                var name = captureNames[numCaptures - numPriorCaptures];

                // Capturing group
                if (paren) {
                    ++numCaptures;
                    // If the current capture has a name, preserve the name
                    if (name) {
                        return '(?<' + name + '>';
                    }
                // Backreference
                } else if (backref) {
                    // Rewrite the backreference
                    return '\\' + (+backref + numPriorCaptures);
                }

                return match;
            },
            i;

        if (!(isType(patterns, 'Array') && patterns.length)) {
            throw new TypeError('Must provide a nonempty array of patterns to merge');
        }

        for (i = 0; i < patterns.length; ++i) {
            pattern = patterns[i];

            if (self.isRegExp(pattern)) {
                numPriorCaptures = numCaptures;
                captureNames = (pattern[REGEX_DATA] && pattern[REGEX_DATA].captureNames) || [];

                // Rewrite backreferences. Passing to XRegExp dies on octals and ensures patterns
                // are independently valid; helps keep this simple. Named captures are put back
                output.push(nativ.replace.call(self(pattern.source).source, parts, rewrite));
            } else {
                output.push(self.escape(pattern));
            }
        }

        return self(output.join('|'), flags);
    };

/* ==============================
 * Fixed/extended native methods
 * ============================== */

/**
 * Adds named capture support (with backreferences returned as `result.name`), and fixes browser
 * bugs in the native `RegExp.prototype.exec`. Calling `XRegExp.install('natives')` uses this to
 * override the native method. Use via `XRegExp.exec` without overriding natives.
 *
 * @private
 * @param {String} str String to search.
 * @returns {Array} Match array with named backreference properties, or `null`.
 */
    fixed.exec = function(str) {
        var origLastIndex = this.lastIndex,
            match = nativ.exec.apply(this, arguments),
            name,
            r2,
            i;

        if (match) {
            // Fix browsers whose `exec` methods don't return `undefined` for nonparticipating
            // capturing groups. This fixes IE 5.5-8, but not IE 9's quirks mode or emulation of
            // older IEs. IE 9 in standards mode follows the spec
            if (!correctExecNpcg && match.length > 1 && indexOf(match, '') > -1) {
                r2 = copyRegex(this, {
                    removeG: true,
                    isInternalOnly: true
                });
                // Using `str.slice(match.index)` rather than `match[0]` in case lookahead allowed
                // matching due to characters outside the match
                nativ.replace.call(String(str).slice(match.index), r2, function() {
                    var len = arguments.length, i;
                    // Skip index 0 and the last 2
                    for (i = 1; i < len - 2; ++i) {
                        if (arguments[i] === undefined) {
                            match[i] = undefined;
                        }
                    }
                });
            }

            // Attach named capture properties
            if (this[REGEX_DATA] && this[REGEX_DATA].captureNames) {
                // Skip index 0
                for (i = 1; i < match.length; ++i) {
                    name = this[REGEX_DATA].captureNames[i - 1];
                    if (name) {
                        match[name] = match[i];
                    }
                }
            }

            // Fix browsers that increment `lastIndex` after zero-length matches
            if (this.global && !match[0].length && (this.lastIndex > match.index)) {
                this.lastIndex = match.index;
            }
        }

        if (!this.global) {
            // Fixes IE, Opera bug (last tested IE 9, Opera 11.6)
            this.lastIndex = origLastIndex;
        }

        return match;
    };

/**
 * Fixes browser bugs in the native `RegExp.prototype.test`. Calling `XRegExp.install('natives')`
 * uses this to override the native method.
 *
 * @private
 * @param {String} str String to search.
 * @returns {Boolean} Whether the regex matched the provided value.
 */
    fixed.test = function(str) {
        // Do this the easy way :-)
        return !!fixed.exec.call(this, str);
    };

/**
 * Adds named capture support (with backreferences returned as `result.name`), and fixes browser
 * bugs in the native `String.prototype.match`. Calling `XRegExp.install('natives')` uses this to
 * override the native method.
 *
 * @private
 * @param {RegExp|*} regex Regex to search with. If not a regex object, it is passed to `RegExp`.
 * @returns {Array} If `regex` uses flag g, an array of match strings or `null`. Without flag g,
 *   the result of calling `regex.exec(this)`.
 */
    fixed.match = function(regex) {
        var result;

        if (!self.isRegExp(regex)) {
            // Use the native `RegExp` rather than `XRegExp`
            regex = new RegExp(regex);
        } else if (regex.global) {
            result = nativ.match.apply(this, arguments);
            // Fixes IE bug
            regex.lastIndex = 0;

            return result;
        }

        return fixed.exec.call(regex, toObject(this));
    };

/**
 * Adds support for `${n}` tokens for named and numbered backreferences in replacement text, and
 * provides named backreferences to replacement functions as `arguments[0].name`. Also fixes browser
 * bugs in replacement text syntax when performing a replacement using a nonregex search value, and
 * the value of a replacement regex's `lastIndex` property during replacement iterations and upon
 * completion. Calling `XRegExp.install('natives')` uses this to override the native method. Note
 * that this doesn't support SpiderMonkey's proprietary third (`flags`) argument. Use via
 * `XRegExp.replace` without overriding natives.
 *
 * @private
 * @param {RegExp|String} search Search pattern to be replaced.
 * @param {String|Function} replacement Replacement string or a function invoked to create it.
 * @returns {String} New string with one or all matches replaced.
 */
    fixed.replace = function(search, replacement) {
        var isRegex = self.isRegExp(search),
            origLastIndex,
            captureNames,
            result;

        if (isRegex) {
            if (search[REGEX_DATA]) {
                captureNames = search[REGEX_DATA].captureNames;
            }
            // Only needed if `search` is nonglobal
            origLastIndex = search.lastIndex;
        } else {
            search += ''; // Type-convert
        }

        // Don't use `typeof`; some older browsers return 'function' for regex objects
        if (isType(replacement, 'Function')) {
            // Stringifying `this` fixes a bug in IE < 9 where the last argument in replacement
            // functions isn't type-converted to a string
            result = nativ.replace.call(String(this), search, function() {
                var args = arguments, i;
                if (captureNames) {
                    // Change the `arguments[0]` string primitive to a `String` object that can
                    // store properties. This really does need to use `String` as a constructor
                    args[0] = new String(args[0]);
                    // Store named backreferences on the first argument
                    for (i = 0; i < captureNames.length; ++i) {
                        if (captureNames[i]) {
                            args[0][captureNames[i]] = args[i + 1];
                        }
                    }
                }
                // Update `lastIndex` before calling `replacement`. Fixes IE, Chrome, Firefox,
                // Safari bug (last tested IE 9, Chrome 17, Firefox 11, Safari 5.1)
                if (isRegex && search.global) {
                    search.lastIndex = args[args.length - 2] + args[0].length;
                }
                // ES6 specs the context for replacement functions as `undefined`
                return replacement.apply(undefined, args);
            });
        } else {
            // Ensure that the last value of `args` will be a string when given nonstring `this`,
            // while still throwing on null or undefined context
            result = nativ.replace.call(this == null ? this : String(this), search, function() {
                // Keep this function's `arguments` available through closure
                var args = arguments;
                return nativ.replace.call(String(replacement), replacementToken, function($0, $1, $2) {
                    var n;
                    // Named or numbered backreference with curly braces
                    if ($1) {
                        // XRegExp behavior for `${n}`:
                        // 1. Backreference to numbered capture, if `n` is an integer. Use `0` for
                        //    for the entire match. Any number of leading zeros may be used.
                        // 2. Backreference to named capture `n`, if it exists and is not an
                        //    integer overridden by numbered capture. In practice, this does not
                        //    overlap with numbered capture since XRegExp does not allow named
                        //    capture to use a bare integer as the name.
                        // 3. If the name or number does not refer to an existing capturing group,
                        //    it's an error.
                        n = +$1; // Type-convert; drop leading zeros
                        if (n <= args.length - 3) {
                            return args[n] || '';
                        }
                        // Groups with the same name is an error, else would need `lastIndexOf`
                        n = captureNames ? indexOf(captureNames, $1) : -1;
                        if (n < 0) {
                            throw new SyntaxError('Backreference to undefined group ' + $0);
                        }
                        return args[n + 1] || '';
                    }
                    // Else, special variable or numbered backreference without curly braces
                    if ($2 === '$') { // $$
                        return '$';
                    }
                    if ($2 === '&' || +$2 === 0) { // $&, $0 (not followed by 1-9), $00
                        return args[0];
                    }
                    if ($2 === '`') { // $` (left context)
                        return args[args.length - 1].slice(0, args[args.length - 2]);
                    }
                    if ($2 === "'") { // $' (right context)
                        return args[args.length - 1].slice(args[args.length - 2] + args[0].length);
                    }
                    // Else, numbered backreference without curly braces
                    $2 = +$2; // Type-convert; drop leading zero
                    // XRegExp behavior for `$n` and `$nn`:
                    // - Backrefs end after 1 or 2 digits. Use `${..}` for more digits.
                    // - `$1` is an error if no capturing groups.
                    // - `$10` is an error if less than 10 capturing groups. Use `${1}0` instead.
                    // - `$01` is `$1` if at least one capturing group, else it's an error.
                    // - `$0` (not followed by 1-9) and `$00` are the entire match.
                    // Native behavior, for comparison:
                    // - Backrefs end after 1 or 2 digits. Cannot reference capturing group 100+.
                    // - `$1` is a literal `$1` if no capturing groups.
                    // - `$10` is `$1` followed by a literal `0` if less than 10 capturing groups.
                    // - `$01` is `$1` if at least one capturing group, else it's a literal `$01`.
                    // - `$0` is a literal `$0`.
                    if (!isNaN($2)) {
                        if ($2 > args.length - 3) {
                            throw new SyntaxError('Backreference to undefined group ' + $0);
                        }
                        return args[$2] || '';
                    }
                    // `$` followed by an unsupported char is an error, unlike native JS
                    throw new SyntaxError('Invalid token ' + $0);
                });
            });
        }

        if (isRegex) {
            if (search.global) {
                // Fixes IE, Safari bug (last tested IE 9, Safari 5.1)
                search.lastIndex = 0;
            } else {
                // Fixes IE, Opera bug (last tested IE 9, Opera 11.6)
                search.lastIndex = origLastIndex;
            }
        }

        return result;
    };

/**
 * Fixes browser bugs in the native `String.prototype.split`. Calling `XRegExp.install('natives')`
 * uses this to override the native method. Use via `XRegExp.split` without overriding natives.
 *
 * @private
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 */
    fixed.split = function(separator, limit) {
        if (!self.isRegExp(separator)) {
            // Browsers handle nonregex split correctly, so use the faster native method
            return nativ.split.apply(this, arguments);
        }

        var str = String(this),
            output = [],
            origLastIndex = separator.lastIndex,
            lastLastIndex = 0,
            lastLength;

        // Values for `limit`, per the spec:
        // If undefined: pow(2,32) - 1
        // If 0, Infinity, or NaN: 0
        // If positive number: limit = floor(limit); if (limit >= pow(2,32)) limit -= pow(2,32);
        // If negative number: pow(2,32) - floor(abs(limit))
        // If other: Type-convert, then use the above rules
        // This line fails in very strange ways for some values of `limit` in Opera 10.5-10.63,
        // unless Opera Dragonfly is open (go figure). It works in at least Opera 9.5-10.1 and 11+
        limit = (limit === undefined ? -1 : limit) >>> 0;

        self.forEach(str, separator, function(match) {
            // This condition is not the same as `if (match[0].length)`
            if ((match.index + match[0].length) > lastLastIndex) {
                output.push(str.slice(lastLastIndex, match.index));
                if (match.length > 1 && match.index < str.length) {
                    Array.prototype.push.apply(output, match.slice(1));
                }
                lastLength = match[0].length;
                lastLastIndex = match.index + lastLength;
            }
        });

        if (lastLastIndex === str.length) {
            if (!nativ.test.call(separator, '') || lastLength) {
                output.push('');
            }
        } else {
            output.push(str.slice(lastLastIndex));
        }

        separator.lastIndex = origLastIndex;
        return output.length > limit ? output.slice(0, limit) : output;
    };

/* ==============================
 * Built-in syntax/flag tokens
 * ============================== */

    add = self.addToken;

/*
 * Letter escapes that natively match literal characters: `\a`, `\A`, etc. These should be
 * SyntaxErrors but are allowed in web reality. XRegExp makes them errors for cross-browser
 * consistency and to reserve their syntax, but lets them be superseded by addons.
 */
    add(
        /\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4}|{[\dA-Fa-f]+})|x(?![\dA-Fa-f]{2}))/,
        function(match, scope) {
            // \B is allowed in default scope only
            if (match[1] === 'B' && scope === defaultScope) {
                return match[0];
            }
            throw new SyntaxError('Invalid escape ' + match[0]);
        },
        {
            scope: 'all',
            leadChar: '\\'
        }
    );

/*
 * Unicode code point escape with curly braces: `\u{N..}`. `N..` is any one or more digit
 * hexadecimal number from 0-10FFFF, and can include leading zeros. Requires the native ES6 `u` flag
 * to support code points greater than U+FFFF. Avoids converting code points above U+FFFF to
 * surrogate pairs (which could be done without flag `u`), since that could lead to broken behavior
 * if you follow a `\u{N..}` token that references a code point above U+FFFF with a quantifier, or
 * if you use the same in a character class.
 */
    add(
        /\\u{([\dA-Fa-f]+)}/,
        function(match, scope, flags) {
            var code = dec(match[1]);
            if (code > 0x10FFFF) {
                throw new SyntaxError('Invalid Unicode code point ' + match[0]);
            }
            if (code <= 0xFFFF) {
                // Converting to \uNNNN avoids needing to escape the literal character and keep it
                // separate from preceding tokens
                return '\\u' + pad4(hex(code));
            }
            // If `code` is between 0xFFFF and 0x10FFFF, require and defer to native handling
            if (hasNativeU && flags.indexOf('u') > -1) {
                return match[0];
            }
            throw new SyntaxError('Cannot use Unicode code point above \\u{FFFF} without flag u');
        },
        {
            scope: 'all',
            leadChar: '\\'
        }
    );

/*
 * Empty character class: `[]` or `[^]`. This fixes a critical cross-browser syntax inconsistency.
 * Unless this is standardized (per the ES spec), regex syntax can't be accurately parsed because
 * character class endings can't be determined.
 */
    add(
        /\[(\^?)]/,
        function(match) {
            // For cross-browser compatibility with ES3, convert [] to \b\B and [^] to [\s\S].
            // (?!) should work like \b\B, but is unreliable in some versions of Firefox
            return match[1] ? '[\\s\\S]' : '\\b\\B';
        },
        {leadChar: '['}
    );

/*
 * Comment pattern: `(?# )`. Inline comments are an alternative to the line comments allowed in
 * free-spacing mode (flag x).
 */
    add(
        /\(\?#[^)]*\)/,
        function(match, scope, flags) {
            // Keep tokens separated unless the following token is a quantifier
            return isQuantifierNext(match.input, match.index + match[0].length, flags) ?
                '' : '(?:)';
        },
        {leadChar: '('}
    );

/*
 * Whitespace and line comments, in free-spacing mode (aka extended mode, flag x) only.
 */
    add(
        /\s+|#.*/,
        function(match, scope, flags) {
            // Keep tokens separated unless the following token is a quantifier
            return isQuantifierNext(match.input, match.index + match[0].length, flags) ?
                '' : '(?:)';
        },
        {flag: 'x'}
    );

/*
 * Dot, in dotall mode (aka singleline mode, flag s) only.
 */
    add(
        /\./,
        function() {
            return '[\\s\\S]';
        },
        {
            flag: 's',
            leadChar: '.'
        }
    );

/*
 * Named backreference: `\k<name>`. Backreference names can use the characters A-Z, a-z, 0-9, _,
 * and $ only. Also allows numbered backreferences as `\k<n>`.
 */
    add(
        /\\k<([\w$]+)>/,
        function(match) {
            // Groups with the same name is an error, else would need `lastIndexOf`
            var index = isNaN(match[1]) ? (indexOf(this.captureNames, match[1]) + 1) : +match[1],
                endIndex = match.index + match[0].length;
            if (!index || index > this.captureNames.length) {
                throw new SyntaxError('Backreference to undefined group ' + match[0]);
            }
            // Keep backreferences separate from subsequent literal numbers
            return '\\' + index + (
                endIndex === match.input.length || isNaN(match.input.charAt(endIndex)) ?
                    '' : '(?:)'
            );
        },
        {leadChar: '\\'}
    );

/*
 * Numbered backreference or octal, plus any following digits: `\0`, `\11`, etc. Octals except `\0`
 * not followed by 0-9 and backreferences to unopened capture groups throw an error. Other matches
 * are returned unaltered. IE < 9 doesn't support backreferences above `\99` in regex syntax.
 */
    add(
        /\\(\d+)/,
        function(match, scope) {
            if (
                !(
                    scope === defaultScope &&
                    /^[1-9]/.test(match[1]) &&
                    +match[1] <= this.captureNames.length
                ) &&
                match[1] !== '0'
            ) {
                throw new SyntaxError('Cannot use octal escape or backreference to undefined group ' +
                    match[0]);
            }
            return match[0];
        },
        {
            scope: 'all',
            leadChar: '\\'
        }
    );

/*
 * Named capturing group; match the opening delimiter only: `(?<name>`. Capture names can use the
 * characters A-Z, a-z, 0-9, _, and $ only. Names can't be integers. Supports Python-style
 * `(?P<name>` as an alternate syntax to avoid issues in some older versions of Opera which natively
 * supported the Python-style syntax. Otherwise, XRegExp might treat numbered backreferences to
 * Python-style named capture as octals.
 */
    add(
        /\(\?P?<([\w$]+)>/,
        function(match) {
            // Disallow bare integers as names because named backreferences are added to match
            // arrays and therefore numeric properties may lead to incorrect lookups
            if (!isNaN(match[1])) {
                throw new SyntaxError('Cannot use integer as capture name ' + match[0]);
            }
            if (match[1] === 'length' || match[1] === '__proto__') {
                throw new SyntaxError('Cannot use reserved word as capture name ' + match[0]);
            }
            if (indexOf(this.captureNames, match[1]) > -1) {
                throw new SyntaxError('Cannot use same name for multiple groups ' + match[0]);
            }
            this.captureNames.push(match[1]);
            this.hasNamedCapture = true;
            return '(';
        },
        {leadChar: '('}
    );

/*
 * Capturing group; match the opening parenthesis only. Required for support of named capturing
 * groups. Also adds explicit capture mode (flag n).
 */
    add(
        /\((?!\?)/,
        function(match, scope, flags) {
            if (flags.indexOf('n') > -1) {
                return '(?:';
            }
            this.captureNames.push(null);
            return '(';
        },
        {
            optionalFlags: 'n',
            leadChar: '('
        }
    );

/* ==============================
 * Expose XRegExp
 * ============================== */

    return self;

}());

//
// Begin anonymous function. This is used to contain local scope variables without polutting global scope.
//
if (typeof(SyntaxHighlighter) == 'undefined') var SyntaxHighlighter = function() {

// CommonJS
if (typeof(require) != 'undefined' && typeof(XRegExp) == 'undefined')
{
	XRegExp = require('xregexp').XRegExp;
}

// Shortcut object which will be assigned to the SyntaxHighlighter variable.
// This is a shorthand for local reference in order to avoid long namespace
// references to SyntaxHighlighter.whatever...
var sh = {
	defaults : {
		/** Additional CSS class names to be added to highlighter elements. */
		'class-name' : '',

		/** First line number. */
		'first-line' : 1,

		/**
		 * Pads line numbers. Possible values are:
		 *
		 *   false - don't pad line numbers.
		 *   true  - automaticaly pad numbers with minimum required number of leading zeroes.
		 *   [int] - length up to which pad line numbers.
		 */
		'pad-line-numbers' : false,

		/** Lines to highlight. */
		'highlight' : null,

		/** Title to be displayed above the code block. */
		'title' : null,

		/** Enables or disables smart tabs. */
		'smart-tabs' : true,

		/** Gets or sets tab size. */
		'tab-size' : 4,

		/** Enables or disables gutter. */
		'gutter' : true,

		/** Enables or disables toolbar. */
		'toolbar' : true,

		/** Enables quick code copy and paste from double click. */
		'quick-code' : true,

		/** Forces code view to be collapsed. */
		'collapse' : false,

		/** Enables or disables automatic links. */
		'auto-links' : true,

		/** Gets or sets light mode. Equavalent to turning off gutter and toolbar. */
		'light' : false,

		'unindent' : true,

		'html-script' : false
	},

	config : {
		space : '&nbsp;',

		/** Enables use of <SCRIPT type="syntaxhighlighter" /> tags. */
		useScriptTags : true,

		/** Blogger mode flag. */
		bloggerMode : false,

		stripBrs : false,

		/** Name of the tag that SyntaxHighlighter will automatically look for. */
		tagName : 'pre',

		strings : {
			expandSource : 'expand source',
			help : '?',
			alert: 'SyntaxHighlighter\n\n',
			noBrush : 'Can\'t find brush for: ',
			brushNotHtmlScript : 'Brush wasn\'t configured for html-script option: ',

			// this is populated by the build script
			aboutDialog : '<%- about %>'
		}
	},

	/** Internal 'global' variables. */
	vars : {
		discoveredBrushes : null,
		highlighters : {}
	},

	/** This object is populated by user included external brush files. */
	brushes : {},

	/** Common regular expressions. */
	regexLib : {
		multiLineCComments			: XRegExp('/\\*.*?\\*/', 'gs'),
		singleLineCComments			: /\/\/.*$/gm,
		singleLinePerlComments		: /#.*$/gm,
		doubleQuotedString			: /"([^\\"\n]|\\.)*"/g,
		singleQuotedString			: /'([^\\'\n]|\\.)*'/g,
		multiLineDoubleQuotedString	: XRegExp('"([^\\\\"]|\\\\.)*"', 'gs'),
		multiLineSingleQuotedString	: XRegExp("'([^\\\\']|\\\\.)*'", 'gs'),
		xmlComments					: XRegExp('(&lt;|<)!--.*?--(&gt;|>)', 'gs'),
		url							: /\w+:\/\/[\w-.\/?%&=:@;#]*/g,
		phpScriptTags 				: { left: /(&lt;|<)\?(?:=|php)?/g, right: /\?(&gt;|>)/g, 'eof' : true },
		aspScriptTags				: { left: /(&lt;|<)%=?/g, right: /%(&gt;|>)/g },
		scriptScriptTags			: { left: /(&lt;|<)\s*script.*?(&gt;|>)/gi, right: /(&lt;|<)\/\s*script\s*(&gt;|>)/gi }
	},

	toolbar: {
		/**
		 * Generates HTML markup for the toolbar.
		 * @param {Highlighter} highlighter Highlighter instance.
		 * @return {String} Returns HTML markup.
		 */
		getHtml: function(highlighter)
		{
			var html = '<div class="toolbar">',
				items = sh.toolbar.items,
				list = items.list
				;

			function defaultGetHtml(highlighter, name)
			{
				return sh.toolbar.getButtonHtml(highlighter, name, sh.config.strings[name]);
			}

			for (var i = 0, l = list.length; i < l; i++)
			{
				html += (items[list[i]].getHtml || defaultGetHtml)(highlighter, list[i]);
			}

			html += '</div>';

			return html;
		},

		/**
		 * Generates HTML markup for a regular button in the toolbar.
		 * @param {Highlighter} highlighter Highlighter instance.
		 * @param {String} commandName		Command name that would be executed.
		 * @param {String} label			Label text to display.
		 * @return {String}					Returns HTML markup.
		 */
		getButtonHtml: function(highlighter, commandName, label)
		{
			commandName = escapeHtml(commandName);

			return '<span><a href="#" class="toolbar_item'
				+ ' command_' + commandName
				+ ' ' + commandName
				+ '">' + escapeHtml(label) + '</a></span>'
				;
		},

		/**
		 * Event handler for a toolbar anchor.
		 */
		handler: function(e)
		{
			var target = e.target,
				className = target.className || ''
				;

			function getValue(name)
			{
				var r = new RegExp(name + '_(\\w+)'),
					match = r.exec(className)
					;

				return match ? match[1] : null;
			}

			var highlighter = getHighlighterById(findParentElement(target, '.syntaxhighlighter').id),
				commandName = getValue('command')
				;

			// execute the toolbar command
			if (highlighter && commandName)
				sh.toolbar.items[commandName].execute(highlighter);

			// disable default A click behaviour
			e.preventDefault();
		},

		/** Collection of toolbar items. */
		items : {
			// Ordered lis of items in the toolbar. Can't expect `for (var n in items)` to be consistent.
			list: ['expandSource', 'help'],

			expandSource: {
				getHtml: function(highlighter)
				{
					if (highlighter.getParam('collapse') != true)
						return '';

					var title = highlighter.getParam('title');
					return sh.toolbar.getButtonHtml(highlighter, 'expandSource', title ? title : sh.config.strings.expandSource);
				},

				execute: function(highlighter)
				{
					var div = getHighlighterDivById(highlighter.id);
					removeClass(div, 'collapsed');
				}
			},

			/** Command to display the about dialog window. */
			help: {
				execute: function(highlighter)
				{
					var wnd = popup('', '_blank', 500, 250, 'scrollbars=0'),
						doc = wnd.document
						;

					doc.write(sh.config.strings.aboutDialog);
					doc.close();
					wnd.focus();
				}
			}
		}
	},

	/**
	 * Finds all elements on the page which should be processes by SyntaxHighlighter.
	 *
	 * @param {Object} globalParams		Optional parameters which override element's
	 * 									parameters. Only used if element is specified.
	 *
	 * @param {Object} element	Optional element to highlight. If none is
	 * 							provided, all elements in the current document
	 * 							are returned which qualify.
	 *
	 * @return {Array}	Returns list of <code>{ target: DOMElement, params: Object }</code> objects.
	 */
	findElements: function(globalParams, element)
	{
		var elements = element ? [element] : toArray(document.getElementsByTagName(sh.config.tagName)),
			conf = sh.config,
			result = []
			;

		// support for <SCRIPT TYPE="syntaxhighlighter" /> feature
		if (conf.useScriptTags)
			elements = elements.concat(getSyntaxHighlighterScriptTags());

		if (elements.length === 0)
			return result;

		for (var i = 0, l = elements.length; i < l; i++)
		{
			var item = {
				target: elements[i],
				// local params take precedence over globals
				params: merge(globalParams, parseParams(elements[i].className))
			};

			if (item.params['brush'] == null)
				continue;

			result.push(item);
		}

		return result;
	},

	/**
	 * Shorthand to highlight all elements on the page that are marked as
	 * SyntaxHighlighter source code.
	 *
	 * @param {Object} globalParams		Optional parameters which override element's
	 * 									parameters. Only used if element is specified.
	 *
	 * @param {Object} element	Optional element to highlight. If none is
	 * 							provided, all elements in the current document
	 * 							are highlighted.
	 */
	highlight: function(globalParams, element)
	{
		var elements = this.findElements(globalParams, element),
			propertyName = 'innerHTML',
			highlighter = null,
			conf = sh.config
			;

		if (elements.length === 0)
			return;

		for (var i = 0, l = elements.length; i < l; i++)
		{
			var element = elements[i],
				target = element.target,
				params = element.params,
				brushName = params.brush,
				code
				;

			if (brushName == null)
				continue;

			// Instantiate a brush
			if (params['html-script'] == 'true' || sh.defaults['html-script'] == true)
			{
				highlighter = new sh.HtmlScript(brushName);
				brushName = 'htmlscript';
			}
			else
			{
				var brush = findBrush(brushName);

				if (brush)
					highlighter = new brush();
				else
					continue;
			}

			code = target[propertyName];

			// remove CDATA from <SCRIPT/> tags if it's present
			if (conf.useScriptTags)
				code = stripCData(code);

			// Inject title if the attribute is present
			if ((target.title || '') != '')
				params.title = target.title;

			params['brush'] = brushName;
			highlighter.init(params);
			element = highlighter.getDiv(code);

			// carry over ID
			if ((target.id || '') != '')
				element.id = target.id;

			target.parentNode.replaceChild(element, target);
		}
	},

	/**
	 * Main entry point for the SyntaxHighlighter.
	 * @param {Object} params Optional params to apply to all highlighted elements.
	 */
	all: function(params)
	{
		attachEvent(
			window,
			'load',
			function() { sh.highlight(params); }
		);
	}
}; // end of sh

function escapeHtml(html)
{
	return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML.replace(/"/g, '&quot;');
};

/**
 * Checks if target DOM elements has specified CSS class.
 * @param {DOMElement} target Target DOM element to check.
 * @param {String} className Name of the CSS class to check for.
 * @return {Boolean} Returns true if class name is present, false otherwise.
 */
function hasClass(target, className)
{
	return target.className.indexOf(className) != -1;
};

/**
 * Adds CSS class name to the target DOM element.
 * @param {DOMElement} target Target DOM element.
 * @param {String} className New CSS class to add.
 */
function addClass(target, className)
{
	if (!hasClass(target, className))
		target.className += ' ' + className;
};

/**
 * Removes CSS class name from the target DOM element.
 * @param {DOMElement} target Target DOM element.
 * @param {String} className CSS class to remove.
 */
function removeClass(target, className)
{
	target.className = target.className.replace(className, '');
};

/**
 * Converts the source to array object. Mostly used for function arguments and
 * lists returned by getElementsByTagName() which aren't Array objects.
 * @param {List} source Source list.
 * @return {Array} Returns array.
 */
function toArray(source)
{
	var result = [];

	for (var i = 0, l = source.length; i < l; i++)
		result.push(source[i]);

	return result;
};

/**
 * Splits block of text into lines.
 * @param {String} block Block of text.
 * @return {Array} Returns array of lines.
 */
function splitLines(block)
{
	return block.split(/\r?\n/);
}

/**
 * Generates HTML ID for the highlighter.
 * @param {String} highlighterId Highlighter ID.
 * @return {String} Returns HTML ID.
 */
function getHighlighterId(id)
{
	var prefix = 'highlighter_';
	return id.indexOf(prefix) == 0 ? id : prefix + id;
};

/**
 * Finds Highlighter instance by ID.
 * @param {String} highlighterId Highlighter ID.
 * @return {Highlighter} Returns instance of the highlighter.
 */
function getHighlighterById(id)
{
	return sh.vars.highlighters[getHighlighterId(id)];
};

/**
 * Finds highlighter's DIV container.
 * @param {String} highlighterId Highlighter ID.
 * @return {Element} Returns highlighter's DIV element.
 */
function getHighlighterDivById(id)
{
	return document.getElementById(getHighlighterId(id));
};

/**
 * Stores highlighter so that getHighlighterById() can do its thing. Each
 * highlighter must call this method to preserve itself.
 * @param {Highilghter} highlighter Highlighter instance.
 */
function storeHighlighter(highlighter)
{
	sh.vars.highlighters[getHighlighterId(highlighter.id)] = highlighter;
};

/**
 * Looks for a child or parent node which has specified classname.
 * Equivalent to jQuery's $(container).find(".className")
 * @param {Element} target Target element.
 * @param {String} search Class name or node name to look for.
 * @param {Boolean} reverse If set to true, will go up the node tree instead of down.
 * @return {Element} Returns found child or parent element on null.
 */
function findElement(target, search, reverse /* optional */)
{
	if (target == null)
		return null;

	var nodes			= reverse != true ? target.childNodes : [ target.parentNode ],
		propertyToFind	= { '#' : 'id', '.' : 'className' }[search.substr(0, 1)] || 'nodeName',
		expectedValue,
		found
		;

	expectedValue = propertyToFind != 'nodeName'
		? search.substr(1)
		: search.toUpperCase()
		;

	// main return of the found node
	if ((target[propertyToFind] || '').indexOf(expectedValue) != -1)
		return target;

	for (var i = 0, l = nodes.length; nodes && i < l && found == null; i++)
		found = findElement(nodes[i], search, reverse);

	return found;
};

/**
 * Looks for a parent node which has specified classname.
 * This is an alias to <code>findElement(container, className, true)</code>.
 * @param {Element} target Target element.
 * @param {String} className Class name to look for.
 * @return {Element} Returns found parent element on null.
 */
function findParentElement(target, className)
{
	return findElement(target, className, true);
};

/**
 * Finds an index of element in the array.
 * @ignore
 * @param {Object} searchElement
 * @param {Number} fromIndex
 * @return {Number} Returns index of element if found; -1 otherwise.
 */
function indexOf(array, searchElement, fromIndex)
{
	fromIndex = Math.max(fromIndex || 0, 0);

	for (var i = fromIndex, l = array.length; i < l; i++)
		if(array[i] == searchElement)
			return i;

	return -1;
};

/**
 * Generates a unique element ID.
 */
function guid(prefix)
{
	return (prefix || '') + Math.round(Math.random() * 1000000).toString();
};

/**
 * Merges two objects. Values from obj2 override values in obj1.
 * Function is NOT recursive and works only for one dimensional objects.
 * @param {Object} obj1 First object.
 * @param {Object} obj2 Second object.
 * @return {Object} Returns combination of both objects.
 */
function merge(obj1, obj2)
{
	var result = {}, name;

	for (name in obj1)
		result[name] = obj1[name];

	for (name in obj2)
		result[name] = obj2[name];

	return result;
};

/**
 * Attempts to convert string to boolean.
 * @param {String} value Input string.
 * @return {Boolean} Returns true if input was "true", false if input was "false" and value otherwise.
 */
function toBoolean(value)
{
	var result = { "true" : true, "false" : false }[value];
	return result == null ? value : result;
};

/**
 * Opens up a centered popup window.
 * @param {String} url		URL to open in the window.
 * @param {String} name		Popup name.
 * @param {int} width		Popup width.
 * @param {int} height		Popup height.
 * @param {String} options	window.open() options.
 * @return {Window}			Returns window instance.
 */
function popup(url, name, width, height, options)
{
	var x = (screen.width - width) / 2,
		y = (screen.height - height) / 2
		;

	options +=	', left=' + x +
				', top=' + y +
				', width=' + width +
				', height=' + height
		;
	options = options.replace(/^,/, '');

	var win = window.open(url, name, options);
	win.focus();
	return win;
};

/**
 * Adds event handler to the target object.
 * @param {Object} obj		Target object.
 * @param {String} type		Name of the event.
 * @param {Function} func	Handling function.
 */
function attachEvent(obj, type, func, scope)
{
	function handler(e)
	{
		e = e || window.event;

		if (!e.target)
		{
			e.target = e.srcElement;
			e.preventDefault = function()
			{
				this.returnValue = false;
			};
		}

		func.call(scope || window, e);
	};

	if (obj.attachEvent)
	{
		obj.attachEvent('on' + type, handler);
	}
	else
	{
		obj.addEventListener(type, handler, false);
	}
};

/**
 * Displays an alert.
 * @param {String} str String to display.
 */
function alert(str)
{
	window.alert(sh.config.strings.alert + str);
};

/**
 * Finds a brush by its alias.
 *
 * @param {String} alias		Brush alias.
 * @param {Boolean} showAlert	Suppresses the alert if false.
 * @return {Brush}				Returns bursh constructor if found, null otherwise.
 */
function findBrush(alias, showAlert)
{
	var brushes = sh.vars.discoveredBrushes,
		result = null
		;

	if (brushes == null)
	{
		brushes = {};

		// Find all brushes
		for (var brush in sh.brushes)
		{
			var info = sh.brushes[brush],
				aliases = info.aliases
				;

			if (aliases == null)
				continue;

			// keep the brush name
			info.brushName = brush.toLowerCase();

			for (var i = 0, l = aliases.length; i < l; i++)
				brushes[aliases[i]] = brush;
		}

		sh.vars.discoveredBrushes = brushes;
	}

	result = sh.brushes[brushes[alias]];

	if (result == null && showAlert)
		alert(sh.config.strings.noBrush + alias);

	return result;
};

/**
 * Executes a callback on each line and replaces each line with result from the callback.
 * @param {Object} str			Input string.
 * @param {Object} callback		Callback function taking one string argument and returning a string.
 */
function eachLine(str, callback)
{
	var lines = splitLines(str);

	for (var i = 0, l = lines.length; i < l; i++)
		lines[i] = callback(lines[i], i);

	// include \r to enable copy-paste on windows (ie8) without getting everything on one line
	return lines.join('\r\n');
};

/**
 * This is a special trim which only removes first and last empty lines
 * and doesn't affect valid leading space on the first line.
 *
 * @param {String} str   Input string
 * @return {String}      Returns string without empty first and last lines.
 */
function trimFirstAndLastLines(str)
{
	return str.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g, '');
};

/**
 * Parses key/value pairs into hash object.
 *
 * Understands the following formats:
 * - name: word;
 * - name: [word, word];
 * - name: "string";
 * - name: 'string';
 *
 * For example:
 *   name1: value; name2: [value, value]; name3: 'value'
 *
 * @param {String} str    Input string.
 * @return {Object}       Returns deserialized object.
 */
function parseParams(str)
{
	var match,
		result = {},
		arrayRegex = XRegExp("^\\[(?<values>(.*?))\\]$"),
		pos = 0,
		regex = XRegExp(
			"(?<name>[\\w-]+)" +
			"\\s*:\\s*" +
			"(?<value>" +
				"[\\w%#-]+|" +		// word
				"\\[.*?\\]|" +		// [] array
				'".*?"|' +			// "" string
				"'.*?'" +			// '' string
			")\\s*;?",
			"g"
		)
		;

	while ((match = XRegExp.exec(str, regex, pos)) != null)
	{
		var value = match.value
			.replace(/^['"]|['"]$/g, '') // strip quotes from end of strings
			;

		// try to parse array value
		if (value != null && arrayRegex.test(value))
		{
			var m = XRegExp.exec(value, arrayRegex);
			value = m.values.length > 0 ? m.values.split(/\s*,\s*/) : [];
		}

		result[match.name] = value;
		pos = match.index + match[0].length;
	}

	return result;
};

/**
 * Wraps each line of the string into <code/> tag with given style applied to it.
 *
 * @param {String} str   Input string.
 * @param {String} css   Style name to apply to the string.
 * @return {String}      Returns input string with each line surrounded by <span/> tag.
 */
function wrapLinesWithCode(str, css)
{
	if (str == null || str.length == 0 || str == '\n')
		return str;

	str = str.replace(/</g, '&lt;');

	// Replace two or more sequential spaces with &nbsp; leaving last space untouched.
	str = str.replace(/ {2,}/g, function(m)
	{
		var spaces = '';

		for (var i = 0, l = m.length; i < l - 1; i++)
			spaces += sh.config.space;

		return spaces + ' ';
	});

	// Split each line and apply <span class="...">...</span> to them so that
	// leading spaces aren't included.
	if (css != null)
		str = eachLine(str, function(line)
		{
			if (line.length == 0)
				return '';

			var spaces = '';

			line = line.replace(/^(&nbsp;| )+/, function(s)
			{
				spaces = s;
				return '';
			});

			if (line.length == 0)
				return spaces;

			return spaces + '<code class="' + css + '">' + line + '</code>';
		});

	return str;
};

/**
 * Pads number with zeros until it's length is the same as given length.
 *
 * @param {Number} number	Number to pad.
 * @param {Number} length	Max string length with.
 * @return {String}			Returns a string padded with proper amount of '0'.
 */
function padNumber(number, length)
{
	var result = number.toString();

	while (result.length < length)
		result = '0' + result;

	return result;
};

/**
 * Replaces tabs with spaces.
 *
 * @param {String} code		Source code.
 * @param {Number} tabSize	Size of the tab.
 * @return {String}			Returns code with all tabs replaces by spaces.
 */
function processTabs(code, tabSize)
{
	var tab = '';

	for (var i = 0; i < tabSize; i++)
		tab += ' ';

	return code.replace(/\t/g, tab);
};

/**
 * Replaces tabs with smart spaces.
 *
 * @param {String} code    Code to fix the tabs in.
 * @param {Number} tabSize Number of spaces in a column.
 * @return {String}        Returns code with all tabs replaces with roper amount of spaces.
 */
function processSmartTabs(code, tabSize)
{
	var lines = splitLines(code),
		tab = '\t',
		spaces = ''
		;

	// Create a string with 1000 spaces to copy spaces from...
	// It's assumed that there would be no indentation longer than that.
	for (var i = 0; i < 50; i++)
		spaces += '                    '; // 20 spaces * 50

	// This function inserts specified amount of spaces in the string
	// where a tab is while removing that given tab.
	function insertSpaces(line, pos, count)
	{
		return line.substr(0, pos)
			+ spaces.substr(0, count)
			+ line.substr(pos + 1, line.length) // pos + 1 will get rid of the tab
			;
	};

	// Go through all the lines and do the 'smart tabs' magic.
	code = eachLine(code, function(line)
	{
		if (line.indexOf(tab) == -1)
			return line;

		var pos = 0;

		while ((pos = line.indexOf(tab)) != -1)
		{
			// This is pretty much all there is to the 'smart tabs' logic.
			// Based on the position within the line and size of a tab,
			// calculate the amount of spaces we need to insert.
			var spaces = tabSize - pos % tabSize;
			line = insertSpaces(line, pos, spaces);
		}

		return line;
	});

	return code;
};

/**
 * Performs various string fixes based on configuration.
 */
function fixInputString(str)
{
	var br = /<br\s*\/?>|&lt;br\s*\/?&gt;/gi;

	if (sh.config.bloggerMode == true)
		str = str.replace(br, '\n');

	if (sh.config.stripBrs == true)
		str = str.replace(br, '');

	return str;
};

/**
 * Removes all white space at the begining and end of a string.
 *
 * @param {String} str   String to trim.
 * @return {String}      Returns string without leading and following white space characters.
 */
function trim(str)
{
	return str.replace(/^\s+|\s+$/g, '');
};

/**
 * Unindents a block of text by the lowest common indent amount.
 * @param {String} str   Text to unindent.
 * @return {String}      Returns unindented text block.
 */
function unindent(str)
{
	var lines = splitLines(fixInputString(str)),
		indents = new Array(),
		regex = /^\s*/,
		min = 1000
		;

	// go through every line and check for common number of indents
	for (var i = 0, l = lines.length; i < l && min > 0; i++)
	{
		var line = lines[i];

		if (trim(line).length == 0)
			continue;

		var matches = regex.exec(line);

		// In the event that just one line doesn't have leading white space
		// we can't unindent anything, so bail completely.
		if (matches == null)
			return str;

		min = Math.min(matches[0].length, min);
	}

	// trim minimum common number of white space from the begining of every line
	if (min > 0)
		for (var i = 0, l = lines.length; i < l; i++)
			lines[i] = lines[i].substr(min);

	return lines.join('\n');
};

/**
 * Callback method for Array.sort() which sorts matches by
 * index position and then by length.
 *
 * @param {Match} m1	Left object.
 * @param {Match} m2    Right object.
 * @return {Number}     Returns -1, 0 or -1 as a comparison result.
 */
function matchesSortCallback(m1, m2)
{
	// sort matches by index first
	if(m1.index < m2.index)
		return -1;
	else if(m1.index > m2.index)
		return 1;
	else
	{
		// if index is the same, sort by length
		if(m1.length < m2.length)
			return -1;
		else if(m1.length > m2.length)
			return 1;
	}

	return 0;
};

/**
 * Executes given regular expression on provided code and returns all
 * matches that are found.
 *
 * @param {String} code    Code to execute regular expression on.
 * @param {Object} regex   Regular expression item info from <code>regexList</code> collection.
 * @return {Array}         Returns a list of Match objects.
 */
function getMatches(code, regexInfo)
{
	function defaultAdd(match, regexInfo)
	{
		return match[0];
	};

	var index = 0,
		match = null,
		matches = [],
		func = regexInfo.func ? regexInfo.func : defaultAdd
		pos = 0
		;

	while((match = XRegExp.exec(code, regexInfo.regex, pos)) != null)
	{
		var resultMatch = func(match, regexInfo);

		if (typeof(resultMatch) == 'string')
			resultMatch = [new sh.Match(resultMatch, match.index, regexInfo.css)];

		matches = matches.concat(resultMatch);
		pos = match.index + match[0].length;
	}

	return matches;
};

/**
 * Turns all URLs in the code into <a/> tags.
 * @param {String} code Input code.
 * @return {String} Returns code with </a> tags.
 */
function processUrls(code)
{
	var gt = /(.*)((&gt;|&lt;).*)/;

	return code.replace(sh.regexLib.url, function(m)
	{
		var suffix = '',
			match = null
			;

		// We include &lt; and &gt; in the URL for the common cases like <http://google.com>
		// The problem is that they get transformed into &lt;http://google.com&gt;
		// Where as &gt; easily looks like part of the URL string.

		if (match = gt.exec(m))
		{
			m = match[1];
			suffix = match[2];
		}

		return '<a href="' + m + '">' + m + '</a>' + suffix;
	});
};

/**
 * Finds all <SCRIPT TYPE="syntaxhighlighter" /> elementss.
 * @return {Array} Returns array of all found SyntaxHighlighter tags.
 */
function getSyntaxHighlighterScriptTags()
{
	var tags = document.getElementsByTagName('script'),
		result = []
		;

	for (var i = 0, l = tags.length; i < l; i++)
		if (tags[i].type == 'syntaxhighlighter')
			result.push(tags[i]);

	return result;
};

/**
 * Strips <![CDATA[]]> from <SCRIPT /> content because it should be used
 * there in most cases for XHTML compliance.
 * @param {String} original	Input code.
 * @return {String} Returns code without leading <![CDATA[]]> tags.
 */
function stripCData(original)
{
	var left = '<![CDATA[',
		right = ']]>',
		// for some reason IE inserts some leading blanks here
		copy = trim(original),
		changed = false,
		leftLength = left.length,
		rightLength = right.length
		;

	if (copy.indexOf(left) == 0)
	{
		copy = copy.substring(leftLength);
		changed = true;
	}

	var copyLength = copy.length;

	if (copy.indexOf(right) == copyLength - rightLength)
	{
		copy = copy.substring(0, copyLength - rightLength);
		changed = true;
	}

	return changed ? copy : original;
};


/**
 * Quick code mouse double click handler.
 */
function quickCodeHandler(e)
{
	var target = e.target,
		highlighterDiv = findParentElement(target, '.syntaxhighlighter'),
		container = findParentElement(target, '.container'),
		textarea = document.createElement('textarea'),
		highlighter
		;

	if (!container || !highlighterDiv || findElement(container, 'textarea'))
		return;

	highlighter = getHighlighterById(highlighterDiv.id);

	// add source class name
	addClass(highlighterDiv, 'source');

	// Have to go over each line and grab it's text, can't just do it on the
	// container because Firefox loses all \n where as Webkit doesn't.
	var lines = container.childNodes,
		code = []
		;

	for (var i = 0, l = lines.length; i < l; i++)
		code.push(lines[i].innerText || lines[i].textContent);

	// using \r instead of \r or \r\n makes this work equally well on IE, FF and Webkit
	code = code.join('\r');

    // For Webkit browsers, replace nbsp with a breaking space
    code = code.replace(/\u00a0/g, " ");

	// inject <textarea/> tag
	textarea.appendChild(document.createTextNode(code));
	container.appendChild(textarea);

	// preselect all text
	textarea.focus();
	textarea.select();

	// set up handler for lost focus
	attachEvent(textarea, 'blur', function(e)
	{
		textarea.parentNode.removeChild(textarea);
		removeClass(highlighterDiv, 'source');
	});
};

/**
 * Match object.
 */
sh.Match = function(value, index, css)
{
	this.value = value;
	this.index = index;
	this.length = value.length;
	this.css = css;
	this.brushName = null;
};

sh.Match.prototype.toString = function()
{
	return this.value;
};

/**
 * Simulates HTML code with a scripting language embedded.
 *
 * @param {String} scriptBrushName Brush name of the scripting language.
 */
sh.HtmlScript = function(scriptBrushName)
{
	var brushClass = findBrush(scriptBrushName),
		scriptBrush,
		xmlBrush = new sh.brushes.Xml(),
		bracketsRegex = null,
		ref = this,
		methodsToExpose = 'getDiv getHtml init'.split(' ')
		;

	if (brushClass == null)
		return;

	scriptBrush = new brushClass();

	for(var i = 0, l = methodsToExpose.length; i < l; i++)
		// make a closure so we don't lose the name after i changes
		(function() {
			var name = methodsToExpose[i];

			ref[name] = function()
			{
				return xmlBrush[name].apply(xmlBrush, arguments);
			};
		})();

	if (scriptBrush.htmlScript == null)
	{
		alert(sh.config.strings.brushNotHtmlScript + scriptBrushName);
		return;
	}

	xmlBrush.regexList.push(
		{ regex: scriptBrush.htmlScript.code, func: process }
	);

	function offsetMatches(matches, offset)
	{
		for (var j = 0, l = matches.length; j < l; j++)
			matches[j].index += offset;
	}

	function process(match, info)
	{
		var code = match.code,
			matches = [],
			regexList = scriptBrush.regexList,
			offset = match.index + match.left.length,
			htmlScript = scriptBrush.htmlScript,
			result
			;

		// add all matches from the code
		for (var i = 0, l = regexList.length; i < l; i++)
		{
			result = getMatches(code, regexList[i]);
			offsetMatches(result, offset);
			matches = matches.concat(result);
		}

		// add left script bracket
		if (htmlScript.left != null && match.left != null)
		{
			result = getMatches(match.left, htmlScript.left);
			offsetMatches(result, match.index);
			matches = matches.concat(result);
		}

		// add right script bracket
		if (htmlScript.right != null && match.right != null)
		{
			result = getMatches(match.right, htmlScript.right);
			offsetMatches(result, match.index + match[0].lastIndexOf(match.right));
			matches = matches.concat(result);
		}

		for (var j = 0, l = matches.length; j < l; j++)
			matches[j].brushName = brushClass.brushName;

		return matches;
	}
};

/**
 * Main Highlither class.
 * @constructor
 */
sh.Highlighter = function()
{
	// not putting any code in here because of the prototype inheritance
};

sh.Highlighter.prototype = {
	/**
	 * Returns value of the parameter passed to the highlighter.
	 * @param {String} name				Name of the parameter.
	 * @param {Object} defaultValue		Default value.
	 * @return {Object}					Returns found value or default value otherwise.
	 */
	getParam: function(name, defaultValue)
	{
		var result = this.params[name];
		return toBoolean(result == null ? defaultValue : result);
	},

	/**
	 * Shortcut to document.createElement().
	 * @param {String} name		Name of the element to create (DIV, A, etc).
	 * @return {HTMLElement}	Returns new HTML element.
	 */
	create: function(name)
	{
		return document.createElement(name);
	},

	/**
	 * Applies all regular expression to the code and stores all found
	 * matches in the `this.matches` array.
	 * @param {Array} regexList		List of regular expressions.
	 * @param {String} code			Source code.
	 * @return {Array}				Returns list of matches.
	 */
	findMatches: function(regexList, code)
	{
		var result = [];

		if (regexList != null)
			for (var i = 0, l = regexList.length; i < l; i++)
				// BUG: length returns len+1 for array if methods added to prototype chain (oising@gmail.com)
				if (typeof (regexList[i]) == "object")
					result = result.concat(getMatches(code, regexList[i]));

		// sort and remove nested the matches
		return this.removeNestedMatches(result.sort(matchesSortCallback));
	},

	/**
	 * Checks to see if any of the matches are inside of other matches.
	 * This process would get rid of highligted strings inside comments,
	 * keywords inside strings and so on.
	 */
	removeNestedMatches: function(matches)
	{
		// Optimized by Jose Prado (http://joseprado.com)
		for (var i = 0, l = matches.length; i < l; i++)
		{
			if (matches[i] === null)
				continue;

			var itemI = matches[i],
				itemIEndPos = itemI.index + itemI.length
				;

			for (var j = i + 1, l = matches.length; j < l && matches[i] !== null; j++)
			{
				var itemJ = matches[j];

				if (itemJ === null)
					continue;
				else if (itemJ.index > itemIEndPos)
					break;
				else if (itemJ.index == itemI.index && itemJ.length > itemI.length)
					matches[i] = null;
				else if (itemJ.index >= itemI.index && itemJ.index < itemIEndPos)
					matches[j] = null;
			}
		}

		return matches;
	},

	/**
	 * Creates an array containing integer line numbers starting from the 'first-line' param.
	 * @return {Array} Returns array of integers.
	 */
	figureOutLineNumbers: function(code)
	{
		var lines = [],
			firstLine = parseInt(this.getParam('first-line'))
			;

		eachLine(code, function(line, index)
		{
			lines.push(index + firstLine);
		});

		return lines;
	},

	/**
	 * Determines if specified line number is in the highlighted list.
	 */
	isLineHighlighted: function(lineNumber)
	{
		var list = this.getParam('highlight', []);

		if (typeof(list) != 'object' && list.push == null)
			list = [ list ];

		return indexOf(list, lineNumber.toString()) != -1;
	},

	/**
	 * Generates HTML markup for a single line of code while determining alternating line style.
	 * @param {Integer} lineNumber	Line number.
	 * @param {String} code Line	HTML markup.
	 * @return {String}				Returns HTML markup.
	 */
	getLineHtml: function(lineIndex, lineNumber, code)
	{
		var classes = [
			'line',
			'number' + lineNumber,
			'index' + lineIndex,
			'alt' + (lineNumber % 2 == 0 ? 1 : 2).toString()
		];

		if (this.isLineHighlighted(lineNumber))
		 	classes.push('highlighted');

		if (lineNumber == 0)
			classes.push('break');

		return '<div class="' + classes.join(' ') + '">' + code + '</div>';
	},

	/**
	 * Generates HTML markup for line number column.
	 * @param {String} code			Complete code HTML markup.
	 * @param {Array} lineNumbers	Calculated line numbers.
	 * @return {String}				Returns HTML markup.
	 */
	getLineNumbersHtml: function(code, lineNumbers)
	{
		var html = '',
			count = splitLines(code).length,
			firstLine = parseInt(this.getParam('first-line')),
			pad = this.getParam('pad-line-numbers')
			;

		if (pad == true)
			pad = (firstLine + count - 1).toString().length;
		else if (isNaN(pad) == true)
			pad = 0;

		for (var i = 0; i < count; i++)
		{
			var lineNumber = lineNumbers ? lineNumbers[i] : firstLine + i,
				code = lineNumber == 0 ? sh.config.space : padNumber(lineNumber, pad)
				;

			html += this.getLineHtml(i, lineNumber, code);
		}

		return html;
	},

	/**
	 * Splits block of text into individual DIV lines.
	 * @param {String} code			Code to highlight.
	 * @param {Array} lineNumbers	Calculated line numbers.
	 * @return {String}				Returns highlighted code in HTML form.
	 */
	getCodeLinesHtml: function(html, lineNumbers)
	{
		html = trim(html);

		var lines = splitLines(html),
			padLength = this.getParam('pad-line-numbers'),
			firstLine = parseInt(this.getParam('first-line')),
			html = '',
			brushName = this.getParam('brush')
			;

		for (var i = 0, l = lines.length; i < l; i++)
		{
			var line = lines[i],
				indent = /^(&nbsp;|\s)+/.exec(line),
				spaces = null,
				lineNumber = lineNumbers ? lineNumbers[i] : firstLine + i;
				;

			if (indent != null)
			{
				spaces = indent[0].toString();
				line = line.substr(spaces.length);
				spaces = spaces.replace(' ', sh.config.space);
			}

			line = trim(line);

			if (line.length == 0)
				line = sh.config.space;

			html += this.getLineHtml(
				i,
				lineNumber,
				(spaces != null ? '<code class="' + brushName + ' spaces">' + spaces + '</code>' : '') + line
			);
		}

		return html;
	},

	/**
	 * Returns HTML for the table title or empty string if title is null.
	 */
	getTitleHtml: function(title)
	{
		return title ? '<caption>' + escapeHtml(title) + '</caption>' : '';
	},

	/**
	 * Finds all matches in the source code.
	 * @param {String} code		Source code to process matches in.
	 * @param {Array} matches	Discovered regex matches.
	 * @return {String} Returns formatted HTML with processed mathes.
	 */
	getMatchesHtml: function(code, matches)
	{
		var pos = 0,
			result = '',
			brushName = this.getParam('brush', '')
			;

		function getBrushNameCss(match)
		{
			var result = match ? (match.brushName || brushName) : brushName;
			return result ? result + ' ' : '';
		};

		// Finally, go through the final list of matches and pull the all
		// together adding everything in between that isn't a match.
		for (var i = 0, l = matches.length; i < l; i++)
		{
			var match = matches[i],
				matchBrushName
				;

			if (match === null || match.length === 0)
				continue;

			matchBrushName = getBrushNameCss(match);

			result += wrapLinesWithCode(code.substr(pos, match.index - pos), matchBrushName + 'plain')
					+ wrapLinesWithCode(match.value, matchBrushName + match.css)
					;

			pos = match.index + match.length + (match.offset || 0);
		}

		// don't forget to add whatever's remaining in the string
		result += wrapLinesWithCode(code.substr(pos), getBrushNameCss() + 'plain');

		return result;
	},

	/**
	 * Generates HTML markup for the whole syntax highlighter.
	 * @param {String} code Source code.
	 * @return {String} Returns HTML markup.
	 */
	getHtml: function(code)
	{
		var html = '',
			classes = [ 'syntaxhighlighter' ],
			tabSize,
			matches,
			lineNumbers
			;

		// process light mode
		if (this.getParam('light') == true)
			this.params.toolbar = this.params.gutter = false;

		className = 'syntaxhighlighter';

		if (this.getParam('collapse') == true)
			classes.push('collapsed');

		if ((gutter = this.getParam('gutter')) == false)
			classes.push('nogutter');

		// add custom user style name
		classes.push(this.getParam('class-name'));

		// add brush alias to the class name for custom CSS
		classes.push(this.getParam('brush'));

		code = trimFirstAndLastLines(code)
			.replace(/\r/g, ' ') // IE lets these buggers through
			;

		tabSize = this.getParam('tab-size');

		// replace tabs with spaces
		code = this.getParam('smart-tabs') == true
			? processSmartTabs(code, tabSize)
			: processTabs(code, tabSize)
			;

		// unindent code by the common indentation
		if (this.getParam('unindent'))
			code = unindent(code);

		if (gutter)
			lineNumbers = this.figureOutLineNumbers(code);

		// find matches in the code using brushes regex list
		matches = this.findMatches(this.regexList, code);
		// processes found matches into the html
		html = this.getMatchesHtml(code, matches);
		// finally, split all lines so that they wrap well
		html = this.getCodeLinesHtml(html, lineNumbers);

		// finally, process the links
		if (this.getParam('auto-links'))
			html = processUrls(html);

		if (typeof(navigator) != 'undefined' && navigator.userAgent && navigator.userAgent.match(/MSIE/))
			classes.push('ie');

		html =
			'<div id="' + getHighlighterId(this.id) + '" class="' + escapeHtml(classes.join(' ')) + '">'
				+ (this.getParam('toolbar') ? sh.toolbar.getHtml(this) : '')
				+ '<table border="0" cellpadding="0" cellspacing="0">'
					+ this.getTitleHtml(this.getParam('title'))
					+ '<tbody>'
						+ '<tr>'
							+ (gutter ? '<td class="gutter">' + this.getLineNumbersHtml(code) + '</td>' : '')
							+ '<td class="code">'
								+ '<div class="container">'
									+ html
								+ '</div>'
							+ '</td>'
						+ '</tr>'
					+ '</tbody>'
				+ '</table>'
			+ '</div>'
			;

		return html;
	},

	/**
	 * Highlights the code and returns complete HTML.
	 * @param {String} code     Code to highlight.
	 * @return {Element}        Returns container DIV element with all markup.
	 */
	getDiv: function(code)
	{
		if (code === null)
			code = '';

		this.code = code;

		var div = this.create('div');

		// create main HTML
		div.innerHTML = this.getHtml(code);

		// set up click handlers
		if (this.getParam('toolbar'))
			attachEvent(findElement(div, '.toolbar'), 'click', sh.toolbar.handler);

		if (this.getParam('quick-code'))
			attachEvent(findElement(div, '.code'), 'dblclick', quickCodeHandler);

		return div;
	},

	/**
	 * Initializes the highlighter/brush.
	 *
	 * Constructor isn't used for initialization so that nothing executes during necessary
	 * `new SyntaxHighlighter.Highlighter()` call when setting up brush inheritence.
	 *
	 * @param {Hash} params Highlighter parameters.
	 */
	init: function(params)
	{
		this.id = guid();

		// register this instance in the highlighters list
		storeHighlighter(this);

		// local params take precedence over defaults
		this.params = merge(sh.defaults, params || {})

		// process light mode
		if (this.getParam('light') == true)
			this.params.toolbar = this.params.gutter = false;
	},

	/**
	 * Converts space separated list of keywords into a regular expression string.
	 * @param {String} str    Space separated keywords.
	 * @return {String}       Returns regular expression string.
	 */
	getKeywords: function(str)
	{
		str = str
			.replace(/^\s+|\s+$/g, '')
			.replace(/\s+/g, '|')
			;

		return '\\b(?:' + str + ')\\b';
	},

	/**
	 * Makes a brush compatible with the `html-script` functionality.
	 * @param {Object} regexGroup Object containing `left` and `right` regular expressions.
	 */
	forHtmlScript: function(regexGroup)
	{
		var regex = { 'end' : regexGroup.right.source };

		if(regexGroup.eof)
			regex.end = "(?:(?:" + regex.end + ")|$)";

		this.htmlScript = {
			left : { regex: regexGroup.left, css: 'script' },
			right : { regex: regexGroup.right, css: 'script' },
			code : XRegExp(
				"(?<left>" + regexGroup.left.source + ")" +
				"(?<code>.*?)" +
				"(?<right>" + regex.end + ")",
				"sgi"
				)
		};
	}
}; // end of Highlighter

return sh;
}(); // end of anonymous function

// CommonJS
typeof(exports) != 'undefined' ? exports.SyntaxHighlighter = SyntaxHighlighter : null;

(function() {

var sh = SyntaxHighlighter;

/**
 * Provides functionality to dynamically load only the brushes that a needed to render the current page.
 *
 * There are two syntaxes that autoload understands. For example:
 *
 * SyntaxHighlighter.autoloader(
 *     [ 'applescript',          'Scripts/shBrushAppleScript.js' ],
 *     [ 'actionscript3', 'as3', 'Scripts/shBrushAS3.js' ]
 * );
 *
 * or a more easily comprehendable one:
 *
 * SyntaxHighlighter.autoloader(
 *     'applescript       Scripts/shBrushAppleScript.js',
 *     'actionscript3 as3 Scripts/shBrushAS3.js'
 * );
 */
sh.autoloader = function()
{
	var list = arguments,
		elements = sh.findElements(),
		brushes = {},
		scripts = {},
		all = SyntaxHighlighter.all,
		allCalled = false,
		allParams = null,
		i
		;

	SyntaxHighlighter.all = function(params)
	{
		allParams = params;
		allCalled = true;
	};

	function addBrush(aliases, url)
	{
		for (var i = 0; i < aliases.length; i++)
			brushes[aliases[i]] = url;
	};

	function getAliases(item)
	{
		return item.pop
			? item
			: item.split(/\s+/)
			;
	}

	// create table of aliases and script urls
	for (i = 0; i < list.length; i++)
	{
		var aliases = getAliases(list[i]),
			url = aliases.pop()
			;

		addBrush(aliases, url);
	}

	// dynamically add <script /> tags to the document body
	for (i = 0; i < elements.length; i++)
	{
		var url = brushes[elements[i].params.brush];

		if(url && scripts[url] === undefined)
		{
			if(elements[i].params['html-script'] === 'true')
			{
				if(scripts[brushes['xml']] === undefined) {
					loadScript(brushes['xml']);
					scripts[url] = false;
				}
			}

			scripts[url] = false;
			loadScript(url);
		}
	}

	function loadScript(url)
	{
		var script = document.createElement('script'),
			done = false
			;

		script.src = url;
		script.type = 'text/javascript';
		script.language = 'javascript';
		script.onload = script.onreadystatechange = function()
		{
			if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'))
			{
				done = true;
				scripts[url] = true;
				checkAll();

				// Handle memory leak in IE
				script.onload = script.onreadystatechange = null;
				script.parentNode.removeChild(script);
			}
		};

		// sync way of adding script tags to the page
		document.body.appendChild(script);
	};

	function checkAll()
	{
		for(var url in scripts)
			if (scripts[url] == false)
				return;

		if (allCalled)
			SyntaxHighlighter.highlight(allParams);
	};
};

})();

;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		// Created by Peter Atoria @ http://iAtoria.com
	
		var inits 	 =  'class interface function package';
	
		var keywords =	'-Infinity ...rest Array as AS3 Boolean break case catch const continue Date decodeURI ' + 
						'decodeURIComponent default delete do dynamic each else encodeURI encodeURIComponent escape ' + 
						'extends false final finally flash_proxy for get if implements import in include Infinity ' + 
						'instanceof int internal is isFinite isNaN isXMLName label namespace NaN native new null ' + 
						'Null Number Object object_proxy override parseFloat parseInt private protected public ' + 
						'return set static String super switch this throw true try typeof uint undefined unescape ' + 
						'use void while with'
						;
	
		this.regexList = [
			{ regex: SyntaxHighlighter.regexLib.singleLineCComments,	css: 'comments' },		// one line comments
			{ regex: SyntaxHighlighter.regexLib.multiLineCComments,		css: 'comments' },		// multiline comments
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },		// double quoted strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },		// single quoted strings
			{ regex: /\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,				css: 'value' },			// numbers
			{ regex: new RegExp(this.getKeywords(inits), 'gm'),			css: 'color3' },		// initializations
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),		css: 'keyword' },		// keywords
			{ regex: new RegExp('var', 'gm'),							css: 'variable' },		// variable
			{ regex: new RegExp('trace', 'gm'),							css: 'color1' }			// trace
			];
	
		this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['actionscript3', 'as3'];

	SyntaxHighlighter.brushes.AS3 = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		function hereDocProcess(match, regexInfo)
		{
			var constructor = SyntaxHighlighter.Match,
				result = []
				;
			if (match.here_doc != null)
				result.push(new constructor(match.here_doc, match.index + match[0].indexOf(match.here_doc), 'string'));

			if (match.full_tag != null)
				result.push(new constructor(match.full_tag, match.index, 'preprocessor'));

			if (match.end_tag != null)
				result.push(new constructor(match.end_tag, match.index + match[0].lastIndexOf(match.end_tag), 'preprocessor'));
			return result;
		}
		var keywords =	'if fi then elif else for do done until while break continue case esac function return in eq ne ge le';
		var commands =  'alias apropos awk basename base64 bash bc bg builtin bzip2 cal cat cd cfdisk chgrp chmod chown chroot' +
						'cksum clear cmp comm command cp cron crontab crypt csplit cut date dc dd ddrescue declare df ' +
						'diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval ' +
						'exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format ' +
						'free fsck ftp gawk gcc gdb getconf getopts grep groups gzip hash head history hostname id ifconfig ' +
						'import install join kill less let ln local locate logname logout look lpc lpr lprint ' +
						'lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools ' +
						'mv nasm nc ndisasm netstat nice nl nohup nslookup objdump od open op passwd paste pathchk ping popd pr printcap ' +
						'printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice ' +
						'remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown ' +
						'sleep sort source split ssh strace strings su sudo sum symlink sync tail tar tee test time ' +
						'times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias ' +
						'uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir ' +
						'vi watch wc whereis which who whoami Wget xargs xxd yes chsh'
						;

		this.regexList = [
			{ regex: /^#!.*$/gm,											css: 'preprocessor bold' },
			{ regex: /\/[\w-\/]+/gm,										css: 'plain' },
			{ regex: SyntaxHighlighter.regexLib.singleLinePerlComments,		css: 'comments' },		// one line comments
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,			css: 'string' },		// double quoted strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,			css: 'string' },		// single quoted strings
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),			css: 'keyword' },		// keywords
			{ regex: new RegExp(this.getKeywords(commands), 'gm'),			css: 'functions' },		// commands
			{ regex: new XRegExp("(?<full_tag>(&lt;|<){2}(?<tag>\\w+)) .*$(?<here_doc>[\\s\\S]*)(?<end_tag>^\\k<tag>$)",'gm'),	func: hereDocProcess }
			];
	}

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['bash', 'shell', 'sh'];

	SyntaxHighlighter.brushes.Bash = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		// Contributed by Jen
		// http://www.jensbits.com/2009/05/14/coldfusion-brush-for-syntaxhighlighter-plus
	
		var funcs	=	'Abs ACos AddSOAPRequestHeader AddSOAPResponseHeader AjaxLink AjaxOnLoad ArrayAppend ArrayAvg ArrayClear ArrayDeleteAt ' + 
						'ArrayInsertAt ArrayIsDefined ArrayIsEmpty ArrayLen ArrayMax ArrayMin ArraySet ArraySort ArraySum ArraySwap ArrayToList ' + 
						'Asc ASin Atn BinaryDecode BinaryEncode BitAnd BitMaskClear BitMaskRead BitMaskSet BitNot BitOr BitSHLN BitSHRN BitXor ' + 
						'Ceiling CharsetDecode CharsetEncode Chr CJustify Compare CompareNoCase Cos CreateDate CreateDateTime CreateObject ' + 
						'CreateODBCDate CreateODBCDateTime CreateODBCTime CreateTime CreateTimeSpan CreateUUID DateAdd DateCompare DateConvert ' + 
						'DateDiff DateFormat DatePart Day DayOfWeek DayOfWeekAsString DayOfYear DaysInMonth DaysInYear DE DecimalFormat DecrementValue ' + 
						'Decrypt DecryptBinary DeleteClientVariable DeserializeJSON DirectoryExists DollarFormat DotNetToCFType Duplicate Encrypt ' + 
						'EncryptBinary Evaluate Exp ExpandPath FileClose FileCopy FileDelete FileExists FileIsEOF FileMove FileOpen FileRead ' + 
						'FileReadBinary FileReadLine FileSetAccessMode FileSetAttribute FileSetLastModified FileWrite Find FindNoCase FindOneOf ' + 
						'FirstDayOfMonth Fix FormatBaseN GenerateSecretKey GetAuthUser GetBaseTagData GetBaseTagList GetBaseTemplatePath ' + 
						'GetClientVariablesList GetComponentMetaData GetContextRoot GetCurrentTemplatePath GetDirectoryFromPath GetEncoding ' + 
						'GetException GetFileFromPath GetFileInfo GetFunctionList GetGatewayHelper GetHttpRequestData GetHttpTimeString ' + 
						'GetK2ServerDocCount GetK2ServerDocCountLimit GetLocale GetLocaleDisplayName GetLocalHostIP GetMetaData GetMetricData ' + 
						'GetPageContext GetPrinterInfo GetProfileSections GetProfileString GetReadableImageFormats GetSOAPRequest GetSOAPRequestHeader ' + 
						'GetSOAPResponse GetSOAPResponseHeader GetTempDirectory GetTempFile GetTemplatePath GetTickCount GetTimeZoneInfo GetToken ' + 
						'GetUserRoles GetWriteableImageFormats Hash Hour HTMLCodeFormat HTMLEditFormat IIf ImageAddBorder ImageBlur ImageClearRect ' + 
						'ImageCopy ImageCrop ImageDrawArc ImageDrawBeveledRect ImageDrawCubicCurve ImageDrawLine ImageDrawLines ImageDrawOval ' + 
						'ImageDrawPoint ImageDrawQuadraticCurve ImageDrawRect ImageDrawRoundRect ImageDrawText ImageFlip ImageGetBlob ImageGetBufferedImage ' + 
						'ImageGetEXIFTag ImageGetHeight ImageGetIPTCTag ImageGetWidth ImageGrayscale ImageInfo ImageNegative ImageNew ImageOverlay ImagePaste ' + 
						'ImageRead ImageReadBase64 ImageResize ImageRotate ImageRotateDrawingAxis ImageScaleToFit ImageSetAntialiasing ImageSetBackgroundColor ' + 
						'ImageSetDrawingColor ImageSetDrawingStroke ImageSetDrawingTransparency ImageSharpen ImageShear ImageShearDrawingAxis ImageTranslate ' + 
						'ImageTranslateDrawingAxis ImageWrite ImageWriteBase64 ImageXORDrawingMode IncrementValue InputBaseN Insert Int IsArray IsBinary ' + 
						'IsBoolean IsCustomFunction IsDate IsDDX IsDebugMode IsDefined IsImage IsImageFile IsInstanceOf IsJSON IsLeapYear IsLocalHost ' + 
						'IsNumeric IsNumericDate IsObject IsPDFFile IsPDFObject IsQuery IsSimpleValue IsSOAPRequest IsStruct IsUserInAnyRole IsUserInRole ' + 
						'IsUserLoggedIn IsValid IsWDDX IsXML IsXmlAttribute IsXmlDoc IsXmlElem IsXmlNode IsXmlRoot JavaCast JSStringFormat LCase Left Len ' + 
						'ListAppend ListChangeDelims ListContains ListContainsNoCase ListDeleteAt ListFind ListFindNoCase ListFirst ListGetAt ListInsertAt ' + 
						'ListLast ListLen ListPrepend ListQualify ListRest ListSetAt ListSort ListToArray ListValueCount ListValueCountNoCase LJustify Log ' + 
						'Log10 LSCurrencyFormat LSDateFormat LSEuroCurrencyFormat LSIsCurrency LSIsDate LSIsNumeric LSNumberFormat LSParseCurrency LSParseDateTime ' + 
						'LSParseEuroCurrency LSParseNumber LSTimeFormat LTrim Max Mid Min Minute Month MonthAsString Now NumberFormat ParagraphFormat ParseDateTime ' + 
						'Pi PrecisionEvaluate PreserveSingleQuotes Quarter QueryAddColumn QueryAddRow QueryConvertForGrid QueryNew QuerySetCell QuotedValueList Rand ' + 
						'Randomize RandRange REFind REFindNoCase ReleaseComObject REMatch REMatchNoCase RemoveChars RepeatString Replace ReplaceList ReplaceNoCase ' + 
						'REReplace REReplaceNoCase Reverse Right RJustify Round RTrim Second SendGatewayMessage SerializeJSON SetEncoding SetLocale SetProfileString ' + 
						'SetVariable Sgn Sin Sleep SpanExcluding SpanIncluding Sqr StripCR StructAppend StructClear StructCopy StructCount StructDelete StructFind ' + 
						'StructFindKey StructFindValue StructGet StructInsert StructIsEmpty StructKeyArray StructKeyExists StructKeyList StructKeyList StructNew ' + 
						'StructSort StructUpdate Tan TimeFormat ToBase64 ToBinary ToScript ToString Trim UCase URLDecode URLEncodedFormat URLSessionFormat Val ' + 
						'ValueList VerifyClient Week Wrap Wrap WriteOutput XmlChildPos XmlElemNew XmlFormat XmlGetNodeType XmlNew XmlParse XmlSearch XmlTransform ' + 
						'XmlValidate Year YesNoFormat';

		var keywords =	'cfabort cfajaximport cfajaxproxy cfapplet cfapplication cfargument cfassociate cfbreak cfcache cfcalendar ' + 
						'cfcase cfcatch cfchart cfchartdata cfchartseries cfcol cfcollection cfcomponent cfcontent cfcookie cfdbinfo ' + 
						'cfdefaultcase cfdirectory cfdiv cfdocument cfdocumentitem cfdocumentsection cfdump cfelse cfelseif cferror ' + 
						'cfexchangecalendar cfexchangeconnection cfexchangecontact cfexchangefilter cfexchangemail cfexchangetask ' + 
						'cfexecute cfexit cffeed cffile cfflush cfform cfformgroup cfformitem cfftp cffunction cfgrid cfgridcolumn ' + 
						'cfgridrow cfgridupdate cfheader cfhtmlhead cfhttp cfhttpparam cfif cfimage cfimport cfinclude cfindex ' + 
						'cfinput cfinsert cfinterface cfinvoke cfinvokeargument cflayout cflayoutarea cfldap cflocation cflock cflog ' + 
						'cflogin cfloginuser cflogout cfloop cfmail cfmailparam cfmailpart cfmenu cfmenuitem cfmodule cfNTauthenticate ' + 
						'cfobject cfobjectcache cfoutput cfparam cfpdf cfpdfform cfpdfformparam cfpdfparam cfpdfsubform cfpod cfpop ' + 
						'cfpresentation cfpresentationslide cfpresenter cfprint cfprocessingdirective cfprocparam cfprocresult ' + 
						'cfproperty cfquery cfqueryparam cfregistry cfreport cfreportparam cfrethrow cfreturn cfsavecontent cfschedule ' + 
						'cfscript cfsearch cfselect cfset cfsetting cfsilent cfslider cfsprydataset cfstoredproc cfswitch cftable ' + 
						'cftextarea cfthread cfthrow cftimer cftooltip cftrace cftransaction cftree cftreeitem cftry cfupdate cfwddx ' + 
						'cfwindow cfxml cfzip cfzipparam';

		var operators =	'all and any between cross in join like not null or outer some';

		this.regexList = [
			{ regex: new RegExp('--(.*)$', 'gm'),						css: 'comments' },  // one line and multiline comments
			{ regex: SyntaxHighlighter.regexLib.xmlComments,			css: 'comments' },    // single quoted strings
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },    // double quoted strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },    // single quoted strings
			{ regex: new RegExp(this.getKeywords(funcs), 'gmi'),		css: 'functions' }, // functions
			{ regex: new RegExp(this.getKeywords(operators), 'gmi'),	css: 'color1' },    // operators and such
			{ regex: new RegExp(this.getKeywords(keywords), 'gmi'),		css: 'keyword' }    // keyword
			];
	}

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['coldfusion','cf'];
	
	SyntaxHighlighter.brushes.ColdFusion = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		// Copyright 2006 Shin, YoungJin
	
		var datatypes =	'ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR ' +
						'DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH ' +
						'HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP ' +
						'HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY ' +
						'HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT ' +
						'HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE ' +
						'LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF ' +
						'LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR ' +
						'LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR ' +
						'PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT ' +
						'PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 ' +
						'POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR ' +
						'PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 ' +
						'PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT ' +
						'SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG ' +
						'ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM ' +
						'char char16_t char32_t bool short int __int32 __int64 __int8 __int16 long float double __wchar_t ' +
						'clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS ' +
						'FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t ' +
						'__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t ' +
						'jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler ' +
						'sig_atomic_t size_t _stat __stat64 _stati64 terminate_function ' +
						'time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf ' +
						'va_list wchar_t wctrans_t wctype_t wint_t signed';

		var keywords =	'alignas alignof auto break case catch class const constexpr decltype __finally __exception __try ' +
						'const_cast continue private public protected __declspec ' +
						'default delete deprecated dllexport dllimport do dynamic_cast ' +
						'else enum explicit extern if for friend goto inline ' +
						'mutable naked namespace new noinline noreturn nothrow noexcept nullptr ' +
						'ref register reinterpret_cast return selectany ' +
						'sizeof static static_cast static_assert struct switch template this ' +
						'thread thread_local throw true false try typedef typeid typename union ' +
						'using uuid virtual void volatile whcar_t while';
					
		var functions =	'assert isalnum isalpha iscntrl isdigit isgraph islower isprint' +
						'ispunct isspace isupper isxdigit tolower toupper errno localeconv ' +
						'setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod ' +
						'frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf ' +
						'longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start ' +
						'clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen ' +
						'fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell ' +
						'fwrite getc getchar gets perror printf putc putchar puts remove ' +
						'rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam ' +
						'ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol ' +
						'bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs ' +
						'mbtowc qsort rand realloc srand strtod strtol strtoul system ' +
						'wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr ' +
						'strcmp strcoll strcpy strcspn strerror strlen strncat strncmp ' +
						'strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime ' +
						'clock ctime difftime gmtime localtime mktime strftime time';

		this.regexList = [
			{ regex: SyntaxHighlighter.regexLib.singleLineCComments,	css: 'comments' },			// one line comments
			{ regex: SyntaxHighlighter.regexLib.multiLineCComments,		css: 'comments' },			// multiline comments
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },			// strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },			// strings
			{ regex: /^ *#.*/gm,										css: 'preprocessor' },
			{ regex: new RegExp(this.getKeywords(datatypes), 'gm'),		css: 'color1 bold' },
			{ regex: new RegExp(this.getKeywords(functions), 'gm'),		css: 'functions bold' },
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),		css: 'keyword bold' }
			];
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['cpp', 'cc', 'c++', 'c', 'h', 'hpp', 'h++'];

	SyntaxHighlighter.brushes.Cpp = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		function getKeywordsCSS(str)
		{
			return '\\b([a-z_]|)' + str.replace(/ /g, '(?=:)\\b|\\b([a-z_\\*]|\\*|)') + '(?=:)\\b';
		};
	
		function getValuesCSS(str)
		{
			return '\\b' + str.replace(/ /g, '(?!-)(?!:)\\b|\\b()') + '\:\\b';
		};

		var keywords =	'ascent azimuth background-attachment background-color background-image background-position ' +
						'background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top ' +
						'border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color ' +
						'border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width ' +
						'border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color ' +
						'content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display ' +
						'elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font ' +
						'height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top ' +
						'margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans ' +
						'outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page ' +
						'page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position ' +
						'quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress ' +
						'table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em ' +
						'vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index';

		var values =	'above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder '+
						'both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed '+
						'continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double '+
						'embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia '+
						'gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic '+
						'justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha '+
						'lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower '+
						'navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset '+
						'outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side '+
						'rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow '+
						'small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize '+
						'table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal '+
						'text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin '+
						'upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow';

		var fonts =		'[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif';
	
		this.regexList = [
			{ regex: SyntaxHighlighter.regexLib.multiLineCComments,		css: 'comments' },	// multiline comments
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },	// double quoted strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },	// single quoted strings
			{ regex: /\#[a-fA-F0-9]{3,6}/g,								css: 'value' },		// html colors
			{ regex: /(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,				css: 'value' },		// sizes
			{ regex: /!important/g,										css: 'color3' },	// !important
			{ regex: new RegExp(getKeywordsCSS(keywords), 'gm'),		css: 'keyword' },	// keywords
			{ regex: new RegExp(getValuesCSS(values), 'g'),				css: 'value' },		// values
			{ regex: new RegExp(this.getKeywords(fonts), 'g'),			css: 'color1' }		// fonts
			];

		this.forHtmlScript({ 
			left: /(&lt;|<)\s*style.*?(&gt;|>)/gi, 
			right: /(&lt;|<)\/\s*style\s*(&gt;|>)/gi 
			});
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['css'];

	SyntaxHighlighter.brushes.CSS = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		var keywords =	'abstract assert boolean break byte case catch char class const ' +
						'continue default do double else enum extends ' +
						'false final finally float for goto if implements import ' +
						'instanceof int interface long native new null ' +
						'package private protected public return ' +
						'short static strictfp super switch synchronized this throw throws true ' +
						'transient try void volatile while';

		this.regexList = [
			{ regex: SyntaxHighlighter.regexLib.singleLineCComments,	css: 'comments' },		// one line comments
			{ regex: /\/\*([^\*][\s\S]*?)?\*\//gm,						css: 'comments' },	 	// multiline comments
			{ regex: /\/\*(?!\*\/)\*[\s\S]*?\*\//gm,					css: 'preprocessor' },	// documentation comments
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },		// strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },		// strings
			{ regex: /\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,				css: 'value' },			// numbers
			{ regex: /(?!\@interface\b)\@[\$\w]+\b/g,					css: 'color1' },		// annotation @anno
			{ regex: /\@interface\b/g,									css: 'color2' },		// @interface keyword
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),		css: 'keyword' }		// java keyword
			];

		this.forHtmlScript({
			left	: /(&lt;|<)%[@!=]?/g, 
			right	: /%(&gt;|>)/g 
		});
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['java'];

	SyntaxHighlighter.brushes.Java = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		var keywords =	'break case catch class continue ' +
				'default delete do else enum export extends false  ' +
				'for function if implements import in instanceof ' +
				'interface let new null package private protected ' +
				'static return super switch ' +
				'this throw true try typeof var while with yield';

		var r = SyntaxHighlighter.regexLib;
		
		this.regexList = [
			{ regex: r.multiLineDoubleQuotedString,					css: 'string' },			// double quoted strings
			{ regex: r.multiLineSingleQuotedString,					css: 'string' },			// single quoted strings
			{ regex: r.singleLineCComments,							css: 'comments' },			// one line comments
			{ regex: r.multiLineCComments,							css: 'comments' },			// multiline comments
			{ regex: /\s*#.*/gm,									css: 'preprocessor' },		// preprocessor tags like #region and #endregion
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),	css: 'keyword' }			// keywords
			];
	
		this.forHtmlScript(r.scriptScriptTags);
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['js', 'jscript', 'javascript', 'json'];

	SyntaxHighlighter.brushes.JScript = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		function process(match, regexInfo)
		{
			var constructor = SyntaxHighlighter.Match,
				code = match[0],
				tag = XRegExp.exec(code, XRegExp('(&lt;|<)[\\s\\/\\?!]*(?<name>[:\\w-\\.]+)', 'xg')),
				result = []
				;

			if (match.attributes != null)
			{
				var attributes,
					pos = 0,
					regex = XRegExp('(?<name> [\\w:.-]+)' +
									'\\s*=\\s*' +
									'(?<value> ".*?"|\'.*?\'|\\w+)',
									'xg');

				while ((attributes = XRegExp.exec(code, regex, pos)) != null)
				{
					result.push(new constructor(attributes.name, match.index + attributes.index, 'color1'));
					result.push(new constructor(attributes.value, match.index + attributes.index + attributes[0].indexOf(attributes.value), 'string'));
					pos = attributes.index + attributes[0].length;
				}
			}

			if (tag != null)
				result.push(
					new constructor(tag.name, match.index + tag[0].indexOf(tag.name), 'keyword')
				);

			return result;
		}

		this.regexList = [
			{ regex: XRegExp('(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)', 'gm'),			css: 'color2' },	// <![ ... [ ... ]]>
			{ regex: SyntaxHighlighter.regexLib.xmlComments,												css: 'comments' },	// <!-- ... -->
			{ regex: XRegExp('(&lt;|<)[\\s\\/\\?!]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)', 'sg'), func: process }
		];
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['mxml'];

	SyntaxHighlighter.brushes.Mxml = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		var funcs	=	'abs acos acosh addcslashes addslashes ' +
						'array_change_key_case array_chunk array_combine array_count_values array_diff '+
						'array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill '+
						'array_filter array_flip array_intersect array_intersect_assoc array_intersect_key '+
						'array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map '+
						'array_merge array_merge_recursive array_multisort array_pad array_pop array_product '+
						'array_push array_rand array_reduce array_reverse array_search array_shift '+
						'array_slice array_splice array_sum array_udiff array_udiff_assoc '+
						'array_udiff_uassoc array_uintersect array_uintersect_assoc '+
						'array_uintersect_uassoc array_unique array_unshift array_values array_walk '+
						'array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert '+
						'basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress '+
						'bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir '+
						'checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists '+
						'closedir closelog copy cos cosh count count_chars date decbin dechex decoct '+
						'deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log '+
						'error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded '+
						'feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents '+
						'fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype '+
						'floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf '+
						'fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname '+
						'gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt '+
						'getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext '+
						'gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set '+
						'interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double '+
						'is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long '+
						'is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault '+
						'is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br '+
						'parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir '+
						'round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split '+
						'str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes '+
						'stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk '+
						'strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime '+
						'strtoupper strtr strval substr substr_compare';

		var keywords =	'abstract and array as break case catch cfunction class clone const continue declare default die do ' +
						'else elseif enddeclare endfor endforeach endif endswitch endwhile extends final finally for foreach ' +
						'function global goto if implements include include_once interface instanceof insteadof namespace new ' +
						'old_function or private protected public return require require_once static switch ' +
						'trait throw try use var while xor yield ';
		
		var constants	= '__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__';

		this.regexList = [
			{ regex: SyntaxHighlighter.regexLib.singleLineCComments,	css: 'comments' },			// one line comments
			{ regex: SyntaxHighlighter.regexLib.multiLineCComments,		css: 'comments' },			// multiline comments
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },			// double quoted strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },			// single quoted strings
			{ regex: /\$\w+/g,											css: 'variable' },			// variables
			{ regex: new RegExp(this.getKeywords(funcs), 'gmi'),		css: 'functions' },			// common functions
			{ regex: new RegExp(this.getKeywords(constants), 'gmi'),	css: 'constants' },			// constants
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),		css: 'keyword' }			// keyword
			];

		this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['php'];

	SyntaxHighlighter.brushes.Php = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['text', 'plain'];

	SyntaxHighlighter.brushes.Plain = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		var funcs	=	'abs avg case cast coalesce convert count current_timestamp ' +
						'current_user day isnull left lower month nullif replace right ' +
						'session_user space substring sum system_user upper user year';

		var keywords =	'absolute action add after alter as asc at authorization begin bigint ' +
						'binary bit by cascade char character check checkpoint close collate ' +
						'column commit committed connect connection constraint contains continue ' +
						'create cube current current_date current_time cursor database date ' +
						'deallocate dec decimal declare default delete desc distinct double drop ' +
						'dynamic else end end-exec escape except exec execute false fetch first ' +
						'float for force foreign forward free from full function global goto grant ' +
						'group grouping having hour ignore index inner insensitive insert instead ' +
						'int integer intersect into is isolation key last level load local max min ' +
						'minute modify move name national nchar next no numeric of off on only ' +
						'open option order out output partial password precision prepare primary ' +
						'prior privileges procedure public read real references relative repeatable ' +
						'restrict return returns revoke rollback rollup rows rule schema scroll ' +
						'second section select sequence serializable set size smallint static ' +
						'statistics table temp temporary then time timestamp to top transaction ' +
						'translation trigger true truncate uncommitted union unique update values ' +
						'varchar varying view when where with work';

		var operators =	'all and any between cross in join like not null or outer some';

		this.regexList = [
			{ regex: /--(.*)$/gm,                                               css: 'comments' },   // one line comments
			{ regex: /\/\*([^\*][\s\S]*?)?\*\//gm,                              css: 'comments' },   // multi line comments
			{ regex: SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,    css: 'string' },     // double quoted strings
			{ regex: SyntaxHighlighter.regexLib.multiLineSingleQuotedString,    css: 'string' },     // single quoted strings
			{ regex: new RegExp(this.getKeywords(funcs), 'gmi'),                css: 'color2' },     // functions
			{ regex: new RegExp(this.getKeywords(operators), 'gmi'),            css: 'color1' },     // operators and such
			{ regex: new RegExp(this.getKeywords(keywords), 'gmi'),             css: 'keyword' }     // keyword
			];
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['sql'];

	SyntaxHighlighter.brushes.Sql = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();


;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		function process(match, regexInfo)
		{
			var constructor = SyntaxHighlighter.Match,
				code = match[0],
				tag = XRegExp.exec(code, XRegExp('(&lt;|<)[\\s\\/\\?!]*(?<name>[:\\w-\\.]+)', 'xg')),
				result = []
				;

			if (match.attributes != null)
			{
				var attributes,
					pos = 0,
					regex = XRegExp('(?<name> [\\w:.-]+)' +
									'\\s*=\\s*' +
									'(?<value> ".*?"|\'.*?\'|\\w+)',
									'xg');

				while ((attributes = XRegExp.exec(code, regex, pos)) != null)
				{
					result.push(new constructor(attributes.name, match.index + attributes.index, 'color1'));
					result.push(new constructor(attributes.value, match.index + attributes.index + attributes[0].indexOf(attributes.value), 'string'));
					pos = attributes.index + attributes[0].length;
				}
			}

			if (tag != null)
				result.push(
					new constructor(tag.name, match.index + tag[0].indexOf(tag.name), 'keyword')
				);

			return result;
		}

		this.regexList = [
			{ regex: XRegExp('(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)', 'gm'),			css: 'color2' },	// <![ ... [ ... ]]>
			{ regex: SyntaxHighlighter.regexLib.xmlComments,												css: 'comments' },	// <!-- ... -->
			{ regex: XRegExp('(&lt;|<)[\\s\\/\\?!]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)', 'sg'), func: process }
		];
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['xml', 'xhtml', 'xslt', 'html', 'plist'];

	SyntaxHighlighter.brushes.Xml = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

/* Syntax Settings */

SyntaxHighlighter.defaults['toolbar'] = false;
SyntaxHighlighter.defaults['smart-tabs'] = false;
SyntaxHighlighter.config.stripBrs = true;
SyntaxHighlighter.all();
/*
 * /help/components/ccl/before-and-after/clientlibs/js/before-and-after.js
 */


$(window).load(function(){
	if(!$(".twentytwenty-container").hasClass("no-twenty-twenty-js")) {
	    $(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({default_offset_pct: 0.5});
	    $(".twentytwenty-container[data-orientation='vertical']").twentytwenty({default_offset_pct: 0.5, orientation: 'vertical'});
	}
});
// jquery.event.move
//
// 1.3.6
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.

//console.log("loading event.move.js");


(function (module) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], module);
    } else {
        // Browser globals
        module(jQuery);
    }
})(function(jQuery, undefined){

    var // Number of pixels a pressed pointer travels before movestart
    // event is fired.
        threshold = 6,

        add = jQuery.event.add,

        remove = jQuery.event.remove,

    // Just sugar, so we can have arguments in the same order as
    // add and remove.
        trigger = function(node, type, data) {
            jQuery.event.trigger(type, data, node);
        },

    // Shim for requestAnimationFrame, falling back to timer. See:
    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        requestFrame = (function(){
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(fn, element){
                    return window.setTimeout(function(){
                        fn();
                    }, 25);
                }
            );
        })(),

        ignoreTags = {
            textarea: true,
            input: true,
            select: true,
            button: true
        },

        mouseevents = {
            move: 'mousemove',
            cancel: 'mouseup dragstart',
            end: 'mouseup'
        },

        touchevents = {
            move: 'touchmove',
            cancel: 'touchend',
            end: 'touchend'
        };


    // Constructors

    function Timer(fn){
        var callback = fn,
            active = false,
            running = false;

        function trigger(time) {
            if (active){
                callback();
                requestFrame(trigger);
                running = true;
                active = false;
            }
            else {
                running = false;
            }
        }

        this.kick = function(fn) {
            active = true;
            if (!running) { trigger(); }
        };

        this.end = function(fn) {
            var cb = callback;

            if (!fn) { return; }

            // If the timer is not running, simply call the end callback.
            if (!running) {
                fn();
            }
            // If the timer is running, and has been kicked lately, then
            // queue up the current callback and the end callback, otherwise
            // just the end callback.
            else {
                callback = active ?
                    function(){ cb(); fn(); } :
                    fn ;

                active = true;
            }
        };
    }


    // Functions

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    function preventDefault(e) {
        e.preventDefault();
    }

    function preventIgnoreTags(e) {
        // Don't prevent interaction with form elements.
        if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

        e.preventDefault();
    }

    function isLeftButton(e) {
        // Ignore mousedowns on any button other than the left (or primary)
        // mouse button, or when a modifier key is pressed.
        return (e.which === 1 && !e.ctrlKey && !e.altKey);
    }

    function identifiedTouch(touchList, id) {
        var i, l;

        if (touchList.identifiedTouch) {
            return touchList.identifiedTouch(id);
        }

        // touchList.identifiedTouch() does not exist in
        // webkit yetâ€¦ we must do the search ourselves...

        i = -1;
        l = touchList.length;

        while (++i < l) {
            if (touchList[i].identifier === id) {
                return touchList[i];
            }
        }
    }

    function changedTouch(e, event) {
        var touch = identifiedTouch(e.changedTouches, event.identifier);

        // This isn't the touch you're looking for.
        if (!touch) { return; }

        // Chrome Android (at least) includes touches that have not
        // changed in e.changedTouches. That's a bit annoying. Check
        // that this touch has changed.
        if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

        return touch;
    }


    // Handlers that decide when the first movestart is triggered

    function mousedown(e){
        var data;

        if (!isLeftButton(e)) { return; }

        data = {
            target: e.target,
            startX: e.pageX,
            startY: e.pageY,
            timeStamp: e.timeStamp
        };

        add(document, mouseevents.move, mousemove, data);
        add(document, mouseevents.cancel, mouseend, data);
    }

    function mousemove(e){
        var data = e.data;

        checkThreshold(e, data, e, removeMouse);
    }

    function mouseend(e) {
        removeMouse();
    }

    function removeMouse() {
        remove(document, mouseevents.move, mousemove);
        remove(document, mouseevents.cancel, mouseend);
    }

    function touchstart(e) {
        var touch, template;

        // Don't get in the way of interaction with form elements.
        if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

        touch = e.changedTouches[0];

        // iOS live updates the touch objects whereas Android gives us copies.
        // That means we can't trust the touchstart object to stay the same,
        // so we must copy the data. This object acts as a template for
        // movestart, move and moveend event objects.
        template = {
            target: touch.target,
            startX: touch.pageX,
            startY: touch.pageY,
            timeStamp: e.timeStamp,
            identifier: touch.identifier
        };

        // Use the touch identifier as a namespace, so that we can later
        // remove handlers pertaining only to this touch.
        add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
        add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
    }

    function touchmove(e){
        var data = e.data,
            touch = changedTouch(e, data);

        if (!touch) { return; }

        checkThreshold(e, data, touch, removeTouch);
    }

    function touchend(e) {
        var template = e.data,
            touch = identifiedTouch(e.changedTouches, template.identifier);

        if (!touch) { return; }

        removeTouch(template.identifier);
    }

    function removeTouch(identifier) {
        remove(document, '.' + identifier, touchmove);
        remove(document, '.' + identifier, touchend);
    }


    // Logic for deciding when to trigger a movestart.

    function checkThreshold(e, template, touch, fn) {
        var distX = touch.pageX - template.startX,
            distY = touch.pageY - template.startY;

        // Do nothing if the threshold has not been crossed.
        if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

        triggerStart(e, template, touch, distX, distY, fn);
    }

    function handled() {
        // this._handled should return false once, and after return true.
        this._handled = returnTrue;
        return false;
    }

    function flagAsHandled(e) {
        e._handled();
    }

    function triggerStart(e, template, touch, distX, distY, fn) {
        var node = template.target,
            touches, time;

        touches = e.targetTouches;
        time = e.timeStamp - template.timeStamp;

        // Create a movestart object with some special properties that
        // are passed only to the movestart handlers.
        template.type = 'movestart';
        template.distX = distX;
        template.distY = distY;
        template.deltaX = distX;
        template.deltaY = distY;
        template.pageX = touch.pageX;
        template.pageY = touch.pageY;
        template.velocityX = distX / time;
        template.velocityY = distY / time;
        template.targetTouches = touches;
        template.finger = touches ?
            touches.length :
            1 ;

        // The _handled method is fired to tell the default movestart
        // handler that one of the move events is bound.
        template._handled = handled;

        // Pass the touchmove event so it can be prevented if or when
        // movestart is handled.
        template._preventTouchmoveDefault = function() {
            e.preventDefault();
        };

        // Trigger the movestart event.
        trigger(template.target, template);

        // Unbind handlers that tracked the touch or mouse up till now.
        fn(template.identifier);
    }


    // Handlers that control what happens following a movestart

    function activeMousemove(e) {
        var timer = e.data.timer;

        e.data.touch = e;
        e.data.timeStamp = e.timeStamp;
        timer.kick();
    }

    function activeMouseend(e) {
        var event = e.data.event,
            timer = e.data.timer;

        removeActiveMouse();

        endEvent(event, timer, function() {
            // Unbind the click suppressor, waiting until after mouseup
            // has been handled.
            setTimeout(function(){
                remove(event.target, 'click', returnFalse);
            }, 0);
        });
    }

    function removeActiveMouse(event) {
        remove(document, mouseevents.move, activeMousemove);
        remove(document, mouseevents.end, activeMouseend);
    }

    function activeTouchmove(e) {
        var event = e.data.event,
            timer = e.data.timer,
            touch = changedTouch(e, event);

        if (!touch) { return; }

        // Stop the interface from gesturing
        e.preventDefault();

        event.targetTouches = e.targetTouches;
        e.data.touch = touch;
        e.data.timeStamp = e.timeStamp;
        timer.kick();
    }

    function activeTouchend(e) {
        var event = e.data.event,
            timer = e.data.timer,
            touch = identifiedTouch(e.changedTouches, event.identifier);

        // This isn't the touch you're looking for.
        if (!touch) { return; }

        removeActiveTouch(event);
        endEvent(event, timer);
    }

    function removeActiveTouch(event) {
        remove(document, '.' + event.identifier, activeTouchmove);
        remove(document, '.' + event.identifier, activeTouchend);
    }


    // Logic for triggering move and moveend events

    function updateEvent(event, touch, timeStamp, timer) {
        var time = timeStamp - event.timeStamp;

        event.type = 'move';
        event.distX =  touch.pageX - event.startX;
        event.distY =  touch.pageY - event.startY;
        event.deltaX = touch.pageX - event.pageX;
        event.deltaY = touch.pageY - event.pageY;

        // Average the velocity of the last few events using a decay
        // curve to even out spurious jumps in values.
        event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
        event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
        event.pageX =  touch.pageX;
        event.pageY =  touch.pageY;
    }

    function endEvent(event, timer, fn) {
        timer.end(function(){
            event.type = 'moveend';

            trigger(event.target, event);

            return fn && fn();
        });
    }


    // jQuery special event definition

    function setup(data, namespaces, eventHandle) {
        // Stop the node from being dragged
        //add(this, 'dragstart.move drag.move', preventDefault);

        // Prevent text selection and touch interface scrolling
        //add(this, 'mousedown.move', preventIgnoreTags);

        // Tell movestart default handler that we've handled this
        add(this, 'movestart.move', flagAsHandled);

        // Don't bind to the DOM. For speed.
        return true;
    }

    function teardown(namespaces) {
        remove(this, 'dragstart drag', preventDefault);
        remove(this, 'mousedown touchstart', preventIgnoreTags);
        remove(this, 'movestart', flagAsHandled);

        // Don't bind to the DOM. For speed.
        return true;
    }

    function addMethod(handleObj) {
        // We're not interested in preventing defaults for handlers that
        // come from internal move or moveend bindings
        if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
            return;
        }

        // Stop the node from being dragged
        add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);

        // Prevent text selection and touch interface scrolling
        add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
    }

    function removeMethod(handleObj) {
        if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
            return;
        }

        remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
        remove(this, 'mousedown.' + handleObj.guid);
    }

    jQuery.event.special.movestart = {
        setup: setup,
        teardown: teardown,
        add: addMethod,
        remove: removeMethod,

        _default: function(e) {
            var event, data;

            // If no move events were bound to any ancestors of this
            // target, high tail it out of here.
            if (!e._handled()) { return; }

            function update(time) {
                updateEvent(event, data.touch, data.timeStamp);
                trigger(e.target, event);
            }

            event = {
                target: e.target,
                startX: e.startX,
                startY: e.startY,
                pageX: e.pageX,
                pageY: e.pageY,
                distX: e.distX,
                distY: e.distY,
                deltaX: e.deltaX,
                deltaY: e.deltaY,
                velocityX: e.velocityX,
                velocityY: e.velocityY,
                timeStamp: e.timeStamp,
                identifier: e.identifier,
                targetTouches: e.targetTouches,
                finger: e.finger
            };

            data = {
                event: event,
                timer: new Timer(update),
                touch: undefined,
                timeStamp: undefined
            };

            if (e.identifier === undefined) {
                // We're dealing with a mouse
                // Stop clicks from propagating during a move
                add(e.target, 'click', returnFalse);
                add(document, mouseevents.move, activeMousemove, data);
                add(document, mouseevents.end, activeMouseend, data);
            }
            else {
                // We're dealing with a touch. Stop touchmove doing
                // anything defaulty.
                e._preventTouchmoveDefault();
                add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
                add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
            }
        }
    };

    jQuery.event.special.move = {
        setup: function() {
            // Bind a noop to movestart. Why? It's the movestart
            // setup that decides whether other move events are fired.
            add(this, 'movestart.move', jQuery.noop);
        },

        teardown: function() {
            remove(this, 'movestart.move', jQuery.noop);
        }
    };

    jQuery.event.special.moveend = {
        setup: function() {
            // Bind a noop to movestart. Why? It's the movestart
            // setup that decides whether other move events are fired.
            add(this, 'movestart.moveend', jQuery.noop);
        },

        teardown: function() {
            remove(this, 'movestart.moveend', jQuery.noop);
        }
    };

    add(document, 'mousedown.move', mousedown);
    add(document, 'touchstart.move', touchstart);

    // Make jQuery copy touch event properties over to the jQuery event
    // object, if they are not already listed. But only do the ones we
    // really need. IE7/8 do not have Array#indexOf(), but nor do they
    // have touch events, so let's assume we can ignore them.
    if (typeof Array.prototype.indexOf === 'function') {
        (function(jQuery, undefined){
            var props = ["changedTouches", "targetTouches"],
                l = props.length;

            while (l--) {
                if (jQuery.event.props.indexOf(props[l]) === -1) {
                    jQuery.event.props.push(props[l]);
                }
            }
        })(jQuery);
    };
});
//console.log("loading twentytwenty.js");
(function($){
    $.fn.twentytwenty = function(options) {
        var options = $.extend({default_offset_pct: 0.5, orientation: 'horizontal'}, options);
        //var options = $.extend({default_offset_pct: 0.5, orientation: 'vertical'}, options);

        return this.each(function() {

            var sliderPct = options.default_offset_pct;
            var container = $(this);
            var sliderOrientation = options.orientation;
            var beforeDirection = (sliderOrientation === 'vertical') ? 'down' : 'left';
            var afterDirection = (sliderOrientation === 'vertical') ? 'up' : 'right';
            if($('html').attr('dir') == 'rtl') {
                if(beforeDirection == 'left') {
                    beforeDirection = 'right';
                }
                if(afterDirection == 'right') {
                    afterDirection = 'left';
                }
            }

            container.wrap("<div class='twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
            container.append("<div class='twentytwenty-overlay'></div>");
            var beforeImg = container.find("img:first");
            var afterImg = container.find("img:last");
            container.append("<div class='twentytwenty-handle'></div>");
            var slider = container.find(".twentytwenty-handle");
            slider.append("<span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
            slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");
            container.addClass("twentytwenty-container");
            beforeImg.addClass("twentytwenty-before");
            afterImg.addClass("twentytwenty-after");

            var overlay = container.find(".twentytwenty-overlay");
            overlay.append("<div class='twentytwenty-before-label'></div>");
            overlay.append("<div class='twentytwenty-after-label'></div>");

            var calcOffset = function(dimensionPct) {
                var w = beforeImg.width();
                var h = beforeImg.height();
                return {
                    w: w+"px",
                    h: h+"px",
                    cw: (dimensionPct*w)+"px",
                    ch: (dimensionPct*h)+"px"
                };
            };

            var adjustContainer = function(offset) {
                if (sliderOrientation === 'vertical') {
                    beforeImg.css("clip", "rect(0,"+offset.w+","+offset.ch+",0)");
                }
                else {
                    beforeImg.css("clip", "rect(0,"+offset.cw+","+offset.h+",0)");
                }
                container.css("height", offset.h);
            };

            var adjustSlider = function(pct) {
                var offset = calcOffset(pct);
                slider.css((sliderOrientation==="vertical") ? "top" : "left", (sliderOrientation==="vertical") ? offset.ch : offset.cw);
                if($('html').attr('dir') == 'rtl') {
                    if(sliderOrientation !== "vertical") {
                        slider.css('left', 'auto');
                        slider.css('right', offset.cw);
                    }
                }
                adjustContainer(offset);
            }

            $(window).on("resize.twentytwenty", function(e) {
                adjustSlider(sliderPct);
            });

            var offsetX = 0;
            var offsetY = 0;
            var imgWidth = 0;
            var imgHeight = 0;

            slider.on("movestart", function(e) {
                if (((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) && sliderOrientation !== 'vertical') {
                    e.preventDefault();
                }
                else if (((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) && sliderOrientation === 'vertical') {
                    e.preventDefault();
                }
                container.addClass("active");
                offsetX = container.offset().left;
                if($('html').attr('dir') == 'rtl') {
                    offsetX = container.offset().left + container.width() - beforeImg.width();
                }
                offsetY = container.offset().top;
                imgWidth = beforeImg.width();
                imgHeight = beforeImg.height();
            });

            slider.on("moveend", function(e) {
                container.removeClass("active");
            });

            slider.on("move", function(e) {
                if (container.hasClass("active")) {
                    sliderPct = (sliderOrientation === 'vertical') ? (e.pageY-offsetY)/imgHeight : (e.pageX-offsetX)/imgWidth;
                    if($('html').attr('dir') == 'rtl') {
                        if(sliderOrientation !== 'vertical') {
                            sliderPct = 1 - sliderPct;
                        }
                    }
                    if (sliderPct < 0) {
                        sliderPct = 0;
                    }
                    if (sliderPct > 1) {
                        sliderPct = 1;
                    }
                    adjustSlider(sliderPct);
                }
            });

            container.find("img").on("mousedown", function(event) {
                event.preventDefault();
            });

            $(window).trigger("resize.twentytwenty");
        });
    };

})(jQuery);
var videoWidth;
var videoHeight;

$(function() {
    if (DEBUG) console.log("[INFO] Document loaded @ /help/components/article-3/video/clientlibs/js/video.js" );
    resizeVideo();

    $('.video-trigger').click(function(e) {
        e.preventDefault();
        var videoSource = $(this).prev().attr("src");
        var videoTitle = $(this).next().html();
        var videoDesc = $(this).next().next().html();
        playVideo(videoSource, videoTitle, videoDesc);
        //return false;
    });

});

$(window).resize(function() {
    resizeVideo();
    if($(".video-popup")) {
        resizePopupVideo();
    }
});

function resizeVideo() {
    if (DEBUG) console.log("[INFO] resizeVideo()" );
    videoWidth = $('#main-content').width();

    // check if video is in accordion item, if yes then get correct width
    if ( $('.video.parbase.section').closest('.accordion-item').length > 0 ) {
        videoWidth = $('.video.parbase.section').closest('.accordion-item').width() - parseInt($(".accordion-item-content").css("padding-left"));
    }

    videoHeight = videoWidth * .562;
    $("iframe.article-video").each(function() {
        $(this).attr("width", videoWidth).attr("height", videoHeight );
    });
    $(".video-trigger").each(function() {
        $(this).css({width:videoWidth,height:videoHeight});
    });
}

function resizePopupVideo() {
    var maxWidth =   $(document).width() - 50;
    var maxHeight = maxWidth * .562;
    if ( $('document').width() < videoWidth ) {
        $('iframe.video-popup-iframe').css({"max-width":maxWidth, "max-height": maxHeight} );
    }
}

function playVideo(s,t,d) {
    var urlParamDelimiter = (s.indexOf('?') > 0) ? '&' : '?';
    var isAdobeTvParam = (s.indexOf('//tv.adobe.com') >= 0) ? '&poststate=true' : '';

    $("body").append('<div class="video-shade" onclick="closeVideo()"></div>' +
        '<div class="video-popup"><div class="video-popup-close" onclick="closeVideo()"><span>X</span></div>' +
        '<div class="iframe-container">' +
        '<iframe class="video-popup-iframe" src="' + s + urlParamDelimiter + 'autoplay=1' + isAdobeTvParam + '" scrolling="no" allowfullscreen width="' + videoWidth + '" height="' + videoHeight + '"></iframe>' +
        '</div>' +
        '<div class="video-popup-title">' + t + '</div>' +
        '<div class="video-popup-description">' + d + '</div>' +
        '</div>');
    $('.video-popup-description').css("max-width", videoWidth);
}

function closeVideo() {
    $( ".video-popup" ).remove();
    $( ".video-shade" ).remove();
}

$(document).ready(function(){
    var Content = $("select.filter-select").closest(".filter-section.section");
    var Class = $("select.filter-select").val();
/*
        $(Content).find(".section.filter-content").hide();
        $(Content).find(".section.filter-content").each(function(){
                if ($(this).children("div.filter-content").hasClass(Class)) {
                    $(this).show();
                };
            });
*/
    $("select.filter-select").change(function(){
        var secContent = $(this).closest(".filter-section.section");
        var className = $(this).val();
        $(secContent).find(".section.filter-content").hide();
        $(secContent).find(".section.filter-content").each(function(){
            if ($(this).children("div.filter-content").hasClass(className)) {
                $(this).show();
            };
        });
        trackCustomLink("OnClick_Filter_" + className);
    });
});

$(document).ready(function() {
    $('.download-section.section .download-section').each( function() {
        if(!$(this).find('.docsShow .download-link-container').length) {
            $(this).addClass('hidden');
        }
    });
});

/*
 @Script: /apps/help/components/pages/article-3/clientlibs/js/article-3.js
 @Author: cmiqueo @ 9/16/2014
 */
 var DEBUG = (location.href.indexOf("debug=true")) > 0 ? true : false;

 $(document).ready(function() {

    // resize large images
    $("img").each(function () {
        if ($(this).is(':visible') && $(this).parent().width() > 0 && $(this).width() > $(this).parent().width()) {
            $(this).css("width", $(this).parent().width());
        }
    });

    //remove border from the fist heading when there is no page properties
    if ( $.trim( $('.page-description').html() ).length == 0 ) {
        var firstHeader = $('h2')[0];
        //$(".page-description").hide();
        $(firstHeader).addClass("first-heading");
    }

    // on mobile move search input below header
    if ($(window).width() < 768) {
        var toTop =  $("#title-bar").height() + 15;
        $('.support-search').css({top: toTop});
    }

    //show version component if more than 1 version exists
    if ($(".aem-link").length > 0) {
        var path = $(".aem-link").attr("href");
        var link = window.location.protocol + "//" + window.location.host + path;
        $.ajax({
            url: link,
            data: "json",
            complete: function (xhr) {
                if (xhr.status === 200) {
                    $(".aem-version").show();
                } else if (xhr.status === 404) {
                    // Don't remove links on client-side anymore
                   // $(".aem-link").remove();
               }
           }
       });
    }

    if (($(".aem-ver1").length > 0) || ($(".aem-ver2").length > 0) || ($(".aem-ver3").length > 0) || ($(".aem-ver4").length > 0)) {
        $(".aem-version").show();
    }

    // add template class to body
    try {
        var template = AdobeLearn.Config["pageTemplate"].substr(AdobeLearn.Config["pageTemplate"].lastIndexOf("/") + 1);
        $("body").addClass(template);
    } catch(e){}


    /**
     * Add "mobile" class to body element in tablets and phones
     */
     (function() {
        var isMobileDevice = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
        if(isMobileDevice){
            document.body.classList.add("mobile");
        }
    })();

 }); // End document.ready


 $(window).resize(function() {
    if (AdobeLearn.Config["pageTemplate"] == 'help/components/pages/article-3') {
        var sidebarLeft = parseFloat($('#main-content').width() + 40 + $('#main-content').offset().left + ($('#main-content').width() / 9));
        if ($('html').attr('dir') == "rtl") {
            sidebarLeft = parseFloat($('.article-content').offset().left);
        }
        var sidebarWidth = parseFloat($('.article-content').width() / 4);

        if ($("body").hasClass('fixed-sidebar')) {
            $('#sidebar').css({left: sidebarLeft, width: sidebarWidth});
        }

        if ($(window).width() < 768) {
            var toTop =  $("#title-bar").height() + 15;
            $('.support-search').css({top: toTop});
        }

    }
}); // End window.resize




// namespace
var adobe = window.adobe || (window.adobe = {});
if(typeof adobe.fn === 'undefined') {
    adobe.fn = {};
}




//  Data for site catalyst
var productCount = 0;
var omtrProductList = "";
var omtrTagList = "";
var omtrContentType = "";
var metaElements = document.all ?
document.all.tags('meta') :
document.getElementsByTagName ?
document.getElementsByTagName ('meta') : new Array();

for (var m = 0; m < metaElements.length; m++) {
    if (metaElements[m].name == "product") {
        productCount++;
        if (omtrProductList.length > 0) {
            omtrProductList = omtrProductList + ", ";
        }
        omtrProductList = omtrProductList + metaElements[m].content.toLowerCase();
    }
    if (metaElements[m].name == "tag") {
        if (omtrTagList.length > 0) {
            omtrTagList = omtrTagList + ": ";
        }
        omtrTagList = omtrTagList + metaElements[m].content.toLowerCase();
    }
    if (metaElements[m].name == "content-type") {
        omtrContentType = metaElements[m].content.toLowerCase();
    }
}




// From headoverride.jsp

var urlMatch = /(https?:\/\/)([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*))(index.html)?(\?\S+)?(\#\S+)?/;
var adobeMatch = /(https?:\/\/)([-\w\.]+)+(\.adobe\.com)/;
var adobeLocaleMatch = /^\/(africa|at|au|be_en|be_fr|be_nl|bg|br|ca|ca_fr|ch_de|ch_fr|ch_it|cn|cy_en|cz|de|dk|ee|es|fi|fr|gr_en|hk_en|hk_zh|hr|hu|ie|il_en|il_he|in|it|jp|kr|la|lt|lu_de|lu_en|lu_fr|lv|mena_ar|mena_en|mena_fr|mt|mx|nl|no|nz|pl|pt|ro|rs|ru|se|sea|si|sk|tr|tw|ua|uk)\/.+/;
var cqLocaleMatch = /^\/content\/help\/(ae|africa|at|au|be_en|be_fr|be_nl|bg|br|ca|ca_fr|ch_de|ch_fr|ch_it|cn|cy_en|cz|de|dk|ee|es|fi|fr|gr_en|hk_en|hk_zh|hr|hu|ie|il|il_en|in|it|jp|kr|la|lt|lu_de|lu_en|lu_fr|lv|mena_en|mena_fr|mt|mx|nl|no|nz|pl|pt|ro|rs|ru|se|sea|si|sk|tr|tw|ua|uk)\/.+/;
var omtrLocale = "en";
if (adobeLocaleMatch.test(location.pathname)) {
    var matchArray = adobeLocaleMatch.exec(location.pathname).slice();
    omtrLocale = matchArray[1];
    if ( typeof(matchArray[1]) != 'undefined') {
        omtrLocale = matchArray[1];
    }
}
else if (cqLocaleMatch.test(location.pathname)) {
    var matchArray = cqLocaleMatch.exec(location.pathname).slice();
    omtrLocale = matchArray[1];
    if ( typeof(matchArray[1]) != 'undefined') {
        omtrLocale = matchArray[1];
    }
}




// Form helppage.js

// include the css for the new global nav
var adobeGnavInjectCSS = true;

// userAgent
var ua = navigator.userAgent.toLowerCase();

// variables for localization
if(typeof(adobe) == "undefined") {
    var adobe = {
        Idiom: {
            Localize: function(param) {
                return param;
            }
        }
    }
}else {
    adobe.Idiom = {
        Localize: function(param) {
            return param;
        }
    }
}



// OMT data
var productCount = 0;
var omtrProductList = "";
var metaElements = document.all ?
document.all.tags('meta') : document.getElementsByTagName ?
document.getElementsByTagName ('meta') : new Array();
for (var m = 0; m < metaElements.length; m++) {
    if (metaElements[m].name == "product") {
        productCount++;
        if (omtrProductList.length > 0) {
            omtrProductList = omtrProductList + ", ";
        }
        omtrProductList = omtrProductList + metaElements[m].content;
    }
    else if (metaElements[m].name == "docid") {
        docid = metaElements[m].content;
    }
}

globalBackToTop = function () {
    jQuery('html, body').animate({
        scrollTop: 0
    }, 500);
    return false;
}

/**
 * @method formatOs
 * @description Formats the OS name according to Flash team specs
 *
 * @returns {String} OS name
 */
 function formatOs() {
    var name;

    if (typeof(platform) != null && typeof(platform.os) != null) {
        var os = platform.os;
        if (typeof(os.family) != null || typeof(os.version) != null) {
            if (/^Win/i.test(os.family)) {
                name = 'Windows ' + os.version;
            } else {
                name = (os.family === 'OS X' ? 'Mac OSX' : os.toString());
            }
        } else {
            name = os.toString();
        }
    }

    return name;
}


// anchor link functions
$("#main-content a").on("click", function(e) {
    var targetLink = this.hash;
    var link = this.href.replace(targetLink,"");
    var currentPath = window.location.href.replace(window.location.hash,"");
    var targetY;
    if (link.indexOf(currentPath) > -1) {
        e.preventDefault();
        targetY = getElementOffsetTop(targetLink);
        linkScroll(targetY);
        updateHashUrl(targetLink);
    }
});

$(".tocH2 a").click( function(e) {
    e.preventDefault();
    var targetLink = $(this).attr("href");
    var targetY = getElementOffsetTop(targetLink);
    linkScroll(targetY);
    updateHashUrl(targetLink);
});

function linkScrollOnLoad() {
     // deep linking
     if (location.hash) {
        setTimeout(function () {
            try {
                var targetLink = location.hash.substring(0);
                var targetY = getElementOffsetTop(targetLink);
                linkScroll(targetY);
                // updateHashUrl(targetLink);
            }catch (e) {
                // statements to handle any exceptions
                //logMyErrors(e); // pass exception object to error handler
            }
        }, 300)
    }
}

function getElementOffsetTop(targetLink) {
    var targetY;
    var headingOffset = 0;
    var a = window.scrollY;
    var titleBarHeight = $('#page-header #title-bar').outerHeight();
    var userGuideNavBand = $('.userguide-outer-nav-container');
    var headerHeight = $('#AdobePrimaryNav').outerHeight() + $('#AdobeSecondaryNav').outerHeight();
    if (document.getElementsByName(targetLink.substr(1)).length > 0 ) {
        if($(document.getElementsByName(targetLink.substr(1))[0]).prop("tagName").toLowerCase() != "h2") {
            headingOffset = 50;
        }
        targetY = document.getElementsByName(targetLink.substr(1))[0].offsetTop  - titleBarHeight - headingOffset;
    } else {
        if($(targetLink).offset() != null) {
            if($(targetLink).prop("tagName").toLowerCase() != "h2") {
                headingOffset = 50;
            }
            targetY = $(targetLink).offset().top - titleBarHeight - headingOffset;
        }
    }
    //adjust anchor link position for mobile header
    if (!($('body').hasClass('fixed-title')) && $(window).width() < 768) {
        targetY -= headerHeight;
    }
    //adjust link position for user guide articles
    if ($(userGuideNavBand).length > 0) {
        targetY -= userGuideNavBand.outerHeight();
        if (a < headerHeight ) {
            targetY -= titleBarHeight;
        }
    }
    return targetY;
}

//deep linking
function linkScroll(y) {

    //scroll animation
    $('html, body').animate({
        scrollTop: y
    }, 300);

    return false;
}

function updateHashUrl(target) {
    if(window.history && window.history.pushState) {
        history.pushState(null, null, target);
    }
    else {
        location.hash = target;
    }
}

$(window).load(function() {
    linkScrollOnLoad();
});

$(window).on('popstate', function() {
    linkScrollOnLoad();
});

/*
 // @Script: /apps/help/components/footer/clientlibs/js/footer.js
 // @Author: cmiqueo @ 10/9/2014
 // @description: Extracted from dotcom compressed.js
 */

var jaaulde = window.jaaulde || {};
jaaulde.utils = jaaulde.utils || {};
jaaulde.utils.cookies = (function() {
    var resolveOptions, assembleOptionsString, parseCookies, constructor, defaultOptions = {
        expiresAt: null,
        path: '/',
        domain: null,
        secure: false
    };
    resolveOptions = function(options) {
        var returnValue, expireDate;
        if (typeof options !== 'object' || options === null) {
            returnValue = defaultOptions;
        } else {
            returnValue = {
                expiresAt: defaultOptions.expiresAt,
                path: defaultOptions.path,
                domain: defaultOptions.domain,
                secure: defaultOptions.secure
            };
            if (typeof options.expiresAt === 'object' && options.expiresAt instanceof Date) {
                returnValue.expiresAt = options.expiresAt;
            } else if (typeof options.hoursToLive === 'number' && options.hoursToLive !== 0) {
                expireDate = new Date();
                expireDate.setTime(expireDate.getTime() + (options.hoursToLive * 60 * 60 * 1000));
                returnValue.expiresAt = expireDate;
            }
            if (typeof options.path === 'string' && options.path !== '') {
                returnValue.path = options.path;
            }
            if (typeof options.domain === 'string' && options.domain !== '') {
                returnValue.domain = options.domain;
            }
            if (options.secure === true) {
                returnValue.secure = options.secure;
            }
        }
        return returnValue;
    };
    assembleOptionsString = function(options) {
        options = resolveOptions(options);
        return ((typeof options.expiresAt === 'object' && options.expiresAt instanceof Date ? '; expires=' + options.expiresAt.toGMTString() : '') + '; path=' + options.path + (typeof options.domain === 'string' ? '; domain=' + options.domain : '') + (options.secure === true ? '; secure' : ''));
    };
    parseCookies = function() {
        var cookies = {},
            i, pair, name, value, separated = document.cookie.split(';'),
            unparsedValue;
        for (i = 0; i < separated.length; i = i + 1) {
            pair = separated[i].split('=');
            name = pair[0].replace(/^\s*/, '').replace(/\s*$/, '');
            try {
                value = decodeURIComponent(pair[1]);
            } catch (e1) {
                value = pair[1];
            }
            if (typeof JSON === 'object' && JSON !== null && typeof JSON.parse === 'function') {
                try {
                    unparsedValue = value;
                    value = JSON.parse(value);
                } catch (e2) {
                    value = unparsedValue;
                }
            }
            cookies[name] = value;
        }
        return cookies;
    };
    constructor = function() {};
    constructor.prototype.get = function(cookieName) {
        var returnValue, item, cookies = parseCookies();
        if (typeof cookieName === 'string') {
            returnValue = (typeof cookies[cookieName] !== 'undefined') ? cookies[cookieName] : null;
        } else if (typeof cookieName === 'object' && cookieName !== null) {
            returnValue = {};
            for (item in cookieName) {
                if (typeof cookies[cookieName[item]] !== 'undefined') {
                    returnValue[cookieName[item]] = cookies[cookieName[item]];
                } else {
                    returnValue[cookieName[item]] = null;
                }
            }
        } else {
            returnValue = cookies;
        }
        return returnValue;
    };
    constructor.prototype.filter = function(cookieNameRegExp) {
        var cookieName, returnValue = {},
            cookies = parseCookies();
        if (typeof cookieNameRegExp === 'string') {
            cookieNameRegExp = new RegExp(cookieNameRegExp);
        }
        for (cookieName in cookies) {
            if (cookieName.match(cookieNameRegExp)) {
                returnValue[cookieName] = cookies[cookieName];
            }
        }
        return returnValue;
    };
    constructor.prototype.set = function(cookieName, value, options) {
        if (typeof options !== 'object' || options === null) {
            options = {};
        }
        if (typeof value === 'undefined' || value === null) {
            value = '';
            options.hoursToLive = -8760;
        } else if (typeof value !== 'string') {
            if (typeof JSON === 'object' && JSON !== null && typeof JSON.stringify === 'function') {
                value = JSON.stringify(value);
            } else {
                throw new Error('cookies.set() received non-string value and could not serialize.');
            }
        }
        var optionsString = assembleOptionsString(options);
        document.cookie = cookieName + '=' + encodeURIComponent(value) + optionsString;
    };
    constructor.prototype.del = function(cookieName, options) {
        var allCookies = {},
            name;
        if (typeof options !== 'object' || options === null) {
            options = {};
        }
        if (typeof cookieName === 'boolean' && cookieName === true) {
            allCookies = this.get();
        } else if (typeof cookieName === 'string') {
            allCookies[cookieName] = true;
        }
        for (name in allCookies) {
            if (typeof name === 'string' && name !== '') {
                this.set(name, null, options);
            }
        }
    };
    constructor.prototype.test = function() {
        var returnValue = false,
            testName = 'cT',
            testValue = 'data';
        this.set(testName, testValue);
        if (this.get(testName) === testValue) {
            this.del(testName);
            returnValue = true;
        }
        return returnValue;
    };
    constructor.prototype.setOptions = function(options) {
        if (typeof options !== 'object') {
            options = null;
        }
        defaultOptions = resolveOptions(options);
    };
    return new constructor();
})();





URLParser = (function() {
    var pageURL = window.location.toString();
    var urlArray = new Array();
    var pathArray = new Array();
    urlArray = pageURL.split('//');
    pathArray = urlArray[1].split('/');
    var subDomain = pathArray[0].split('.')[0];
    var locale = pathArray[1];
    locale = ((locale.length == 2) || (locale == "ca_fr") || (locale == "africa") || (locale == "be_en") || (locale == "be_fr") || (locale == "be_nl") || (locale == "eeurope") || (locale == "il_en") || (locale == "il_he") || (locale == "lu_de") || (locale == "lu_en") || (locale == "lu_fr") || (locale == "mena_ar") || (locale == "mena_fr") || (locale == "ch_de") || (locale == "ch_fr") || (locale == "ch_it") || (locale == "hk_zh") || (locale == "hk_en") || (locale == "sea")) ? locale : "en_us";
    if (locale == "en_us") {
        pathArray.splice(1, 0, locale);
    }
    var siteLevel = pathArray[2];
    var siteSection = pathArray[3];
    var productName = (siteLevel == "products") ? product = pathArray[3] : "";
    var siteSubSection = pathArray[4];
    var productSection = (siteLevel == "products") ? product = pathArray[4] : "";
    var productSubSection = (siteLevel == "products") ? product = pathArray[5] : "";
    var fileName;
    $.each(pathArray, function(part) {});
    return {
        "url": window.location,
        "path": window.location.pathname,
        "protocol": window.location.protocol,
        "hash": window.location.hash,
        "subDomain": subDomain,
        "host": pathArray[0],
        "locale": locale,
        "siteLevel": siteLevel,
        "siteSection": siteSection,
        "productName": productName,
        "siteSubSection": siteSubSection,
        "productSection": productSection,
        "productSubSection": productSubSection,
        "fileName": fileName
    };
})();


var droidDeviceProfile = {
    id: "Motorola Droid",
    frag: /droid build/
};
var nexusDeviceProfile = {
    id: "Google Nexus One",
    frag: /Android 2/i
};
var palmPreDeviceProfile = {
    id: "Palm Pre",
    frag: /525.27.1 pre/i
};
var genericAndroid2DeviceProfile = {
    id: "Generic Android 2 device",
    frag: /Android 2/i
};
var genericAndroid1DeviceProfile = {
    id: "Generic Android 1 device",
    frag: /Android 1/i
};
var genericWebOSDeviceProfile = {
    id: "genericWebOS Device",
    frag: /webos/i
};
var win311DeviceProfile = {
    id: "Windows 3.11",
    frag: /win16/i
};
var win95ADeviceProfile = {
    id: "Windows 95",
    frag: /windows 95/i
};
var win95BDeviceProfile = {
    id: "Windows 95",
    frag: /win95/i
};
var win95CDeviceProfile = {
    id: "Windows 95",
    frag: /win_95/i
};
var win2000ADeviceProfile = {
    id: "Windows 2000",
    frag: /windows 2000/i
};
var win2000BDeviceProfile = {
    id: "Windows 2000",
    frag: /windows nt 5.0/i
};
var winServer2003DeviceProfile = {
    id: "Windows Server 2003",
    frag: /windows nt 5.2/i
};
var winNT40ADeviceProfile = {
    id: "Windows NT 4.0",
    frag: /windows nt 4.0/i
};
var winNT40BDeviceProfile = {
    id: "Windows NT 4.0",
    frag: /winnt/i
};
var winNT40CDeviceProfile = {
    id: "Windows NT 4.0",
    frag: /windows nt/i
};
var winmeDeviceProfile = {
    id: "Windows ME",
    frag: /windows me/i
};
var openBSDDeviceProfile = {
    id: "OpenBSD",
    frag: /openbsd/i
};
var sunOSDeviceProfile = {
    id: "Sun OS",
    frag: /sunos/i
};
var linuxADeviceProfile = {
    id: "Linux",
    frag: /linux/i
};
var linuxBDeviceProfile = {
    id: "Linux",
    frag: /x11/i
};
var QNXDeviceProfile = {
    id: "QNX",
    frag: /qnx/i
};
var beosDeviceProfile = {
    id: "BeOS",
    frag: /beos/i
};
var os2DeviceProfile = {
    id: "OS2",
    frag: /OS\/2/i
};
var winxpDeviceProfile = {
    id: "Windows XP",
    frag: /windows xp/i
};
var winxp2DeviceProfile = {
    id: "Windows XP",
    frag: /windows nt 5.1/i
};
var win7ADeviceProfile = {
    id: "Windows 7",
    frag: /windows nt 6.1/i
};
var win7BDeviceProfile = {
    id: "Windows 7",
    frag: /windows nt 7.01/i
};
var winvistaDeviceProfile = {
    id: "Windows Vista",
    frag: /windows nt 6.0/i
};
var macosx106DeviceProfile = {
    id: "Snow Leopard",
    frag: /mac os x 10.6/i
};
var macosx105DeviceProfile = {
    id: "Leopard",
    frag: /mac os x 10.5/i
};
var macosA = {
    id: "Mac OS",
    frag: /mac_powerpc/i
};
var macosB = {
    id: "Mac OS",
    frag: /macintosh/i
};
var androidOSFamily = {
    id: "Android OS",
    frag: /android /i,
    devices: [droidDeviceProfile, nexusDeviceProfile, genericAndroid1DeviceProfile, genericAndroid2DeviceProfile]
};
var webOSFamily = {
    id: "webOS",
    frag: /webOS\/1.3.5/i,
    devices: [palmPreDeviceProfile, genericWebOSDeviceProfile]
};
var macOSFamily = {
    id: "Mac OS",
    frag: /mac os/i,
    devices: [macosx105DeviceProfile, macosx106DeviceProfile, macosA, macosB]
};
var winOSFamily = {
    id: "Windows",
    frag: /windows/i,
    devices: [winxpDeviceProfile, winxp2DeviceProfile, win7ADeviceProfile, win7BDeviceProfile, winvistaDeviceProfile, win311DeviceProfile, win95ADeviceProfile, win95BDeviceProfile, win95CDeviceProfile, winServer2003DeviceProfile, winNT40ADeviceProfile, winNT40BDeviceProfile, winNT40CDeviceProfile, winmeDeviceProfile]
};
var linuxOSFamily = {
    id: "Linux",
    frag: /linux/i,
    devices: [openBSDDeviceProfile, sunOSDeviceProfile, linuxADeviceProfile, linuxBDeviceProfile, QNXDeviceProfile, beosDeviceProfile, os2DeviceProfile]
};
var desktopDeviceCategory = {
    id: "Desktop",
    osFamilies: [macOSFamily, winOSFamily, linuxOSFamily]
};
var mobileDeviceCategory = {
    id: "Mobile",
    osFamilies: [androidOSFamily, webOSFamily]
};
var unknownDeviceCategory = {
    id: "Unidentified Platform"
};
var categories = [mobileDeviceCategory, desktopDeviceCategory];

function identifyDevice(d, ua) {
    if (ua.search(d.frag) > -1) {
        return {
            device: d.id
        };
    } else
        return null;
}

function identifyOS(os, ua) {
    var deviceInfo = null;
    var olen = os.devices.length;
    for (var k = 0; k < olen; k++) {
        deviceInfo = identifyDevice(os.devices[k], ua);
        if (deviceInfo != null) break;
    }
    if (deviceInfo != null) deviceInfo.os = os.id;
    return deviceInfo;
}

function identifyCategory(cat, ua) {
    var osInfo = null;
    var jlen = cat.osFamilies.length;
    for (var j = 0; j < jlen; j++) {
        osInfo = identifyOS(cat.osFamilies[j], ua);
        if (osInfo != null) break;
    }
    if (osInfo != null) osInfo.category = cat.id;
    return osInfo;
}

function identifyCategories(cats, ua) {
    var categoryInfo = null;
    var clen = cats.length;
    for (var i = 0; i < clen; i++) {
        categoryInfo = identifyCategory(cats[i], ua);
        if (categoryInfo != null) break;
    }
    if (!categoryInfo) categoryInfo = {};
    if (!categoryInfo.device) categoryInfo.device = 'unknown';
    if (!categoryInfo.os) categoryInfo.os = 'unknown';
    if (!categoryInfo.category) categoryInfo.category = unknownDeviceCategory.id;
    return categoryInfo;
}

function getCategoriesInfo() {
    return identifyCategories(categories, navigator.userAgent.toLowerCase());
}
var info = getCategoriesInfo();

function displayCategoriesInfo() {
    alert('isDesktop:' + isDesktop() + ', os:' + info.os + ', device:' + info.device);
}

function isDroid() {
    return (info.device == droidDeviceProfile.id);
}

function isNexus() {
    return (info.device == nexusDeviceProfile.id);
}

function isDesktop() {
    return (info.category == desktopDeviceCategory.id);
}

function isLinuxDesktop() {
    return (info.os == linuxOSFamily.id);
}

function isWinDesktop() {
    return (info.os == winOSFamily.id);
}

function isMacDesktop() {
    return (info.os == macOSFamily.id);
}

function simulateDroid() {
    info.device = droidDeviceProfile.id;
    info.category = mobileDeviceCategory.id;
    info.os = androidOSFamily.id;
};





adobe.fn.initGlobalFooter = function() {

    $.cookies = jaaulde.utils.cookies;


    //var countryCode = $.cookie('international');
    var countryCode = $.cookies.get('international');
    if (countryCode) {
        $('#sfRegionSet').show();
        $('#sfRegion').hide();
    } else {
        $('#sfRegionSet').hide();
        $('#sfRegion').show();
    }
    if (isDesktop()) {
        $('#RegionPanel').bind("clickoutside focusout", function() {
            $('#RegionPanel').hide();
        });
        $('#sfRegion, #sfRegionChange, #sfRegionClose').bind("click", function() {
            $('#RegionPanel').toggle();
            if ($('#SiteHeader') != null) {
                $('#WelcomePanel').hide();
                $('#WelcomePanelShadow').hide();
            }
            return false;
        });
    }
}


adobe.fn.evidon = function(trigger) {
    var evidonID = $('#' + trigger),
        d = document,
        pixel, page_id, URL_SCHEME = (d.location.protocol == 'https:' ? 'https' : 'http'),
        CDN_URL = (URL_SCHEME == 'https' ? 'https://info.evidon.com/c/betrad/pub/' : 'http://cdn.betrad.com/pub/');
    if ((evidonID != null) && (hideEvidon != true) && isDesktop()) {
        evidonID.show();
        if ((URLParser.host == "www.adobe.com") || (URLParser.host == "adobe.com") || (URLParser.host == "get.adobe.com" || (URLParser.host == "get2.adobe.com") || (URLParser.host == "get3.adobe.com")) || (URLParser.host == "kb2.adobe.com") || (URLParser.host == "community.adobe.com") || (URLParser.host == "helpx.adobe.com") || (URLParser.host == "store1.adobe.com") || (URLParser.host == "store2.adobe.com") || (URLParser.host == "store3.adobe.com")) {
            if (URLParser.locale == "de") {
                page_id = "322";
            } else if (URLParser.locale == "fr") {
                page_id = "324";
            } else if (URLParser.locale == "uk") {
                page_id = "323";
            } else if (URLParser.locale == "se") {
                page_id = "1013";
            } else if (URLParser.locale == "at") {
                page_id = "1012";
            } else if (URLParser.locale == "ch_de") {
                page_id = "1010";
            } else if (URLParser.locale == "ch_fr") {
                page_id = "1009";
            } else if (URLParser.locale == "ch_it") {
                page_id = "1011";
            } else {
                page_id = "86";
            }
        } else {
            if (URLParser.locale == "de") {
                page_id = "327";
            } else if (URLParser.locale == "fr") {
                page_id = "326";
            } else if (URLParser.locale == "uk") {
                page_id = "328";
            } else if (URLParser.locale == "se") {
                page_id = "1024";
            } else if (URLParser.locale == "at") {
                page_id = "1021";
            } else if (URLParser.locale == "ch_de") {
                page_id = "1020";
            } else if (URLParser.locale == "ch_fr") {
                page_id = "1022";
            } else if (URLParser.locale == "ch_it") {
                page_id = "1023";
            } else {
                page_id = "126";
            }
        }
        evidonID.bind('click', function(e) {
            e.preventDefault();
            var link = this;

            function appendScript(url, callback) {
                var head = d.getElementsByTagName('head')[0] || d.documentElement,
                    loaded = false,
                    script = d.createElement('script');

                function onload() {
                    script.onload = script.onreadystatechange = null;
                    head.removeChild(script);
                    callback();
                }
                script.src = url;
                script.onreadystatechange = function() {
                    if (!loaded && (this.readyState == 'loaded' || this.readyState == 'complete')) {
                        loaded = true;
                        onload();
                    }
                };
                script.onload = onload;
                head.insertBefore(script, head.firstChild);
            }
            appendScript(URL_SCHEME + '://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js', function() {
                appendScript(CDN_URL + 'pub1.js', function() {
                    BAPW.i(link, {
                        pid: page_id,
                        ocid: 414
                    }, false);
                });
            });
        });
        pixel = d.createElement('img');
        pixel.src = URL_SCHEME + '://l.betrad.com/pub/p.gif?pid=' + page_id + '&ocid=' + '414' + '&ii=1&r=' + Math.random();
        pixel.height = '1';
        pixel.width = '1';
        pixel.className = 'SiteFooterEvidonPixel';
        d.body.appendChild(pixel);
    }
}


//Override changeRegionFooter function from compressed.js
adobe.fn.changeRegionFooter = function (regioncode){
    if($.string(regioncode).startsWith('be_')){
        //if(regioncode.indexOf('be_') == 0){
        $.cookies.set('international',regioncode,{
            domain:'adobe.com',hoursToLive:8760
        });
        $.cookies.set('storeregion','be',{
            domain:'adobe.com',hoursToLive:8760
        });
    }
    else if($.string(regioncode).startsWith('ca')){
        $.cookies.set('international',regioncode,{
            domain:'adobe.com',hoursToLive:8760
        });
        $.cookies.set('storeregion','ca',{
            domain:'adobe.com',hoursToLive:8760
        });
    }
    else if($.string(regioncode).startsWith('eeur')){
        $.cookies.set('international',regioncode,{
            domain:'adobe.com',hoursToLive:8760
        });
        $.cookies.set('storeregion','eu',{
            domain:'adobe.com',hoursToLive:8760
        });
    }
    else if($.string(regioncode).startsWith('hk_')){
        $.cookies.set('international',regioncode,{
            domain:'adobe.com',hoursToLive:8760
        });
        $.cookies.set('storeregion','cn',{
            domain:'adobe.com',hoursToLive:8760
        });
    }
    else if($.string(regioncode).startsWith('lu_')){
        $.cookies.set('international',regioncode,{
            domain:'adobe.com',hoursToLive:8760
        });
        $.cookies.set('storeregion','lu',{
            domain:'adobe.com',hoursToLive:8760
        });
    }
    else if($.string(regioncode).startsWith('uk')){
        $.cookies.set('international',regioncode,{
            domain:'adobe.com',hoursToLive:8760
        });
        $.cookies.set('storeregion','gb',{
            domain:'adobe.com',hoursToLive:8760
        });
    }
    else{
        $.cookies.set('international',regioncode,{
            domain:'adobe.com',hoursToLive:8760
        });
        $.cookies.set('storeregion',regioncode,{
            domain:'adobe.com',hoursToLive:8760
        });
    }
    var currUrl=window.location.pathname+window.location.search;
    if($.string(currUrl).startsWith('/content/dotcom/')){
        currUrl=currUrl.replace('/content/dotcom/','/');
    }
    else if($.string(currUrl).startsWith('/content/help/')){
        currUrl=currUrl.replace('/content/help/','/');
    }
    if($.string(currUrl).startsWith('/en/')){
        currUrl=currUrl.replace('/en/','/');
    }
    var newUrl = currUrl;
    var fallbackNewUrl = null;
    var geoArray=["africa","ap","at","au","be_en","be_fr","be_nl","bg","br","ca","ca_fr","ch_de","ch_fr","ch_it","cn","cz","de","dk","eeurope","ee","en","es","fi","fr","hk_en","hk_zh","hr","hu","ie","il_en","il_he","in","it","jp","kr","la","lt","lu_de","lu_en","lu_fr","lv","mena_ar","mena_en","mena_fr","mx","nl","no","nz","pl","pt","ro","ru","si","se","sea","sk","tr","tw","ua","uk","cy_en","gr_en","mt"];
    $.each(geoArray,function(){
        if($.string(currUrl).startsWith('/'+this+'/')){
            currUrl=currUrl.replace('/'+this+'/','/');
            return false;
        }
    });
    if(regioncode!='us'){
        newUrl="/"+regioncode+currUrl;
    }
    else{
        newUrl=currUrl;
    }
    // Set up fallback rules for locales that don't typically contain content on helpx
    if (fallbackLocales[regioncode] != undefined) {
        fallbackNewUrl = newUrl.replace("/" + regioncode + "/","/" + fallbackLocales[regioncode] + "/");
    }
    changeRegionRedirect(newUrl, fallbackNewUrl);
}

function clearDocRegionCookie() {
    var d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = "international=; path=" + document.location.pathname + "; domain=.adobe.com; " + expires;
}


//Note that browsers usually follow 301 redirects and return the 200 status that's eventually found
//Checking the status from the ajax call, especially on Windows, doesn't work
function changeRegionRedirect(url, fallbackUrl) {
    if ((url != null) && (url.length > 0) && (url.indexOf(document.location.pathname) != 0)) {

        $.ajax({
            type: 'HEAD',
            url: url,
            //(response codes 200 - 299)
            success: function() {
                window.location.replace(url);
            },
            //(response codes 400 - 499)
            error: function() {

                if ((fallbackUrl != null) && (fallbackUrl.length > 0) && (fallbackUrl.indexOf(document.location.pathname) != 0)) {
                    $.ajax({
                        type: 'HEAD',
                        url: fallbackUrl,
                        //(response codes 200 - 299)
                        success: function() {window.location.replace(fallbackUrl);},
                        //(response codes 400 - 499)
                        error: function() {clearDocRegionCookie();}
                    });
                }
                else {
                    clearDocRegionCookie();
                }
            }
        });
    }
}

//Note that browsers usually follow 301 redirects and return the 200 status that's eventually found
//Checking the status from the ajax call, especially on Windows, doesn't work
function mtRedirect(url, fallbackUrl) {
    //console.log("DEBUG: mtRedirect() Begin");
    if ((url != null) && (url.length > 0) && (url.indexOf(document.location.pathname) != 0)) {
        $.ajax({
            type: 'HEAD',
            url: url,
            success: function() {   //(response codes 200 - 299)
                //console.log("DEBUG: mtRedirect() Success");
                $.cookies.set('mtRedirectCheck', document.location.pathname, {hoursToLive: 720});
                window.location.replace(url);
            },
            error: function() {   //(response codes 400 - 499)
                //console.log("DEBUG: mtRedirect() ERROR");
                doRunMT();
            }
        });
    }
    //console.log("DEBUG: mtRedirect() End");
}


// Geo-routing code based upon the international cookie
var locales = {"africa":true,"at":true,"au":true,"be_en":true,"be_fr":true,"be_nl":true,"bg":true,"br":true,"ca":true,"ca_fr":true,"ch_de":true,"ch_fr":true,"ch_it":true,"cn":true,"cz":true,"de":true,"dk":true,"ee":true,"eeurope":true,"us":true,"es":true,"fi":true,"fr":true,"hk_en":true,"hk_zh":true,"hr":true,"hu":true,"ie":true,"il_en":true,"il_he":true,"in":true,"it":true,"kr":true,"la":true,"lt":true,"lu_de":true,"lu_en":true,"lu_fr":true,"lv":true,"mena_ar":true,"mena_en":true,"mena_fr":true,"mx":true,"nl":true,"no":true,"nz":true,"pl":true,"pt":true,"ro":true,"rs":true,"ru":true,"se":true,"sea":true,"si":true,"sk":true,"tr":true,"tw":true,"ua":true,"uk":true,"jp":true};
var fallbackLocales = {"hk_zh":"tw","sea":"uk","ap":"uk","eeurope":"uk","mena_en":"uk","africa":"uk","il_en":"uk","au":"uk","be_en":"uk","ca":"uk","hk_en":"uk","in":"uk","ie":"uk","lu_en":"uk","nz":"uk","ca_fr":"fr","mena_fr":"fr","be_fr":"fr","ch_fr":"fr","lu_fr":"fr","at":"de","ch_de":"de","lu_de":"de","ch_it":"it","la":"es","mx":"es"};
var tokens = document.location.pathname.split('/');
var locale = ((tokens.length < 2) || ((locales[tokens[1]] == undefined) && tokens[1]!='content')) ? 'us' : tokens[1];
var geoCook = 'international=';
var cookies = document.cookie.split(';');
for(var i=0;i < cookies.length;i++) {
    var c = cookies[i];
    if ((c.indexOf(geoCook) >= 0) && !(locale=='content') ){
        var preferredLocale = c.substring(c.indexOf(geoCook) + geoCook.length,c.length);
        if ((preferredLocale != locale)&&(locales[preferredLocale])){
            var url = document.location.pathname + document.location.search;
            var fallbackUrl = null;
            if (locale == 'us'){
                url = '/' + preferredLocale + url;
            } else {
                var suffix = url.substring(locale.length + 1);
                if ((suffix == null) || (suffix == ""))
                {
                    suffix = "/";
                }
                if (preferredLocale != 'us'){
                    url = '/' + preferredLocale + suffix;
                } else {
                    url = suffix;
                }
            }
            // Set up fallback rules for locales that don't typically contain content on helpx
            if (fallbackLocales[preferredLocale] != undefined && fallbackLocales[preferredLocale] != locale){
                fallbackUrl = url.replace("/" + preferredLocale + "/","/" + fallbackLocales[preferredLocale] + "/");
            }
            //changeRegionRedirect(url, fallbackUrl);
        }
    }
}











/* ************************************************ */
(function($) {
    $.extend({
        __stringPrototype: function(str) {
            var splitCheck = ("a b".split(/\w/)[0] == " ");

            function makeRegExpGlobal(p) {
                if (!p.source) {
                    return p;
                }
                var mods = "g" + ((p.ignoreCase) ? "i" : "") + ((p.multiline) ? "m" : "");
                return new RegExp(p.source, mods);
            }
            this.str = str;
            this.JSONFilter = /^\/\*-secure-([\s\S]*)\*\/\s*$/;
            this.ScriptFragment = '<script[^>]*>([\\S\\s]*?)<\/script>';
            this.specialChar = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '\\': '\\\\'
            };
            this.blank = function(s) {
                return /^\s*$/.test(this.s(s) || ' ');
            };
            this.camelize = function(s) {
                var a = this.s(s).split('-'),
                    i;
                s = [a[0]];
                for (i = 1; i < a.length; i++) {
                    s.push(a[i].charAt(0).toUpperCase() + a[i].substring(1));
                }
                this.str = s.join('');
                return this;
            };
            this.capitalize = function(s) {
                s = this.s(s);
                this.str = s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
                return this;
            };
            this.dasherize = function(s) {
                this.str = this.s(s).split('_').join('-');
                return this;
            };
            this.empty = function(s) {
                return (s) ? (s == '') : (this.str == '');
            };
            this.endsWith = function(pattern, s) {
                s = this.s(s);
                var d = s.length - pattern.length;
                return d >= 0 && s.lastIndexOf(pattern) === d;
            };
            this.escapeHTML = function(s) {
                this.str = this.s(s).split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;');
                return this;
            };
            this.evalJSON = function(sanitize, s) {
                s = this.s(s);
                var json = this.unfilterJSON(false, s).str;
                try {
                    if (!sanitize || this.isJSON(json)) {
                        return eval('(' + json + ')');
                    }
                } catch (e) {}
                throw new SyntaxError('Badly formed JSON string: ' + s);
            };
            this.evalScripts = function(s) {
                var scriptTags = this.extractScripts(this.s(s)),
                    results = [];
                if (scriptTags.length > 0) {
                    for (var i = 0; i < scriptTags.length; i++) {
                        results.push(eval(scriptTags[i]));
                    }
                }
                return results;
            };
            this.extractScripts = function(s) {
                var matchAll = new RegExp(this.ScriptFragment, 'img'),
                    matchOne = new RegExp(this.ScriptFragment, 'im'),
                    scriptMatches = this.s(s).match(matchAll) || [],
                    scriptTags = [];
                if (scriptMatches.length > 0) {
                    for (var i = 0; i < scriptMatches.length; i++) {
                        scriptTags.push(scriptMatches[i].match(matchOne)[1] || '');
                    }
                }
                return scriptTags;
            };
            this.gsub = function(pattern, replacement, s) {
                s = this.s(s);
                if ($.isFunction(replacement)) {
                    var match = s.match(makeRegExpGlobal(pattern));
                    if (match == null) {
                        return this;
                    }
                    s = this.sub(pattern, replacement, match.length, s).str;
                } else {
                    s = s.split(pattern).join(replacement);
                }
                this.str = s;
                return this;
            };
            this.include = function(pattern, s) {
                return this.s(s).indexOf(pattern) > -1;
            };
            this.inspect = function(useDoubleQuotes, s) {
                s = this.s(s);
                var specialChar = this.specialChar,
                    escapedString = this.gsub(/[\x00-\x1f\\]/, function(match) {
                        var character = specialChar[match[0]];
                        return character ? character : '\\u00' + match[0].charCodeAt().toPaddedString(2, 16);
                    }, s).str;
                this.str = (useDoubleQuotes) ? '"' + escapedString.replace(/"/g, '\\"') + '"' : "'" + escapedString.replace(/'/g, '\\\'') + "'";
                return this;
            };
            this.interpolate = function(obj, pattern, s) {
                s = this.s(s);
                if (!pattern) {
                    pattern = /(^|.|\r|\n)(\#\{\s*(\w+)\s*\})/;
                }
                var count = 0,
                    length = s.length,
                    match;
                while (pattern.match(s) && count++ < length) {
                    match = pattern.exec(s);
                    s = this.gsub(match[2], obj[match[3]], s).str;
                }
                this.str = s;
                return this;
            };
            this.isJSON = function(s) {
                s = this.s(s);
                if (this.blank(s)) {
                    return false;
                }
                s = s.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
                return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(s);
            };
            this.scan = function(pattern, replacement, s) {
                s = this.s(s);
                this.gsub(pattern, replacement, s).str = s;
                return this;
            };
            this.startsWith = function(pattern, s) {
                return this.s(s).indexOf(pattern) === 0;
            };
            this.strip = function(s) {
                this.str = $.trim(this.s(s));
                return this;
            };
            this.stripScripts = function(s) {
                this.str = this.s(s).replace(new RegExp(this.ScriptFragment, 'img'), '');
                return this;
            };
            this.stripTags = function(s) {
                this.str = this.s(s).replace(/<\/?[^>]+>/gi, '');
                return this;
            };
            this.sub = function(pattern, replacement, count, s) {
                s = this.s(s);
                count = (!count) ? 1 : count;
                if (count < 0 || isNaN(count)) {
                    return this;
                }
                pattern = makeRegExpGlobal(pattern);
                var sarray = s.split(pattern),
                    matches = s.match(pattern);
                if (splitCheck && typeof(pattern) == "object") {
                    if (count == matches.length) ++count;
                    if (s.indexOf(matches[0]) == 0) sarray.unshift("");
                    if (s.lastIndexOf(matches[matches.length - 1]) == s.length - matches[matches.length - 1].length) sarray.push("");
                }
                s = sarray[0];
                for (var i = 1; i < sarray.length; i++) {
                    if (i <= count) {
                        if ($.isFunction(replacement)) {
                            s += replacement(matches[i - 1] || matches) + sarray[i];
                        } else {
                            s += replacement + sarray[i];
                        }
                    } else {
                        s += (matches[i - 1] || matches) + sarray[i];
                    }
                }
                this.str = s;
                return this;
            };
            this.succ = function(s) {
                s = this.s(s);
                this.str = s.slice(0, s.length - 1) + String.fromCharCode(s.charCodeAt(s.length - 1) + 1);
                return this;
            };
            this.times = function(count, s) {
                this.str = count < 1 ? "" : (new Array(count + 1)).join(this.s(s));
                return this;
            };
            this.toJSON = function(s) {
                return this.inspect(true, this.s(s));
            };
            this.toQueryParams = function(separator, s) {
                s = this.s(s);
                var paramsList = s.substring(s.indexOf('?') + 1).split('#')[0].split(separator || '&'),
                    params = {},
                    i, key, value, pair;
                for (i = 0; i < paramsList.length; i++) {
                    pair = paramsList[i].split('=');
                    key = decodeURIComponent(pair[0]);
                    value = (pair[1]) ? decodeURIComponent(pair[1]) : undefined;
                    if (params[key]) {
                        if (typeof params[key] == "string") {
                            params[key] = [params[key]];
                        }
                        params[key].push(value);
                    } else {
                        params[key] = value;
                    }
                }
                return params;
            };
            this.truncate = function(length, truncation, s) {
                s = this.s(s);
                length = length || 30;
                truncation = (!truncation) ? '...' : truncation;
                s = (s.length > length) ? s.slice(0, length - truncation.length) + truncation : String(s);
                this.str = s;
                return this;
            };
            this.underscore = function(s) {
                this.gsub(/[A-Z]/, function(m) {
                    return "_" + m.toLowerCase();
                }, this.s(s));
                if (this.str.substring(0, 1) == "_") {
                    this.str = this.str.substring(1);
                }
                return this;
            };
            this.unescapeHTML = function(s) {
                this.str = this.stripTags(this.s(s)).str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                return this;
            };
            this.unfilterJSON = function(filter, s) {
                s = this.s(s);
                filter = filter || this.JSONFilter;
                var filtered = s.match(filter);
                this.str = (filtered !== null) ? filtered[1] : s;
                return this;
            };
            this.value = function() {
                return this.str;
            };
            this.s = function(s) {
                return (s) ? s : this.str;
            };
        },
        string: function(str) {
            if (str === String.prototype) {
                $.extend(String.prototype, new $.__stringPrototype());
            } else {
                return new $.__stringPrototype(str);
            }
        }
    });
    $.__stringPrototype.parseQuery = $.__stringPrototype.toQueryParams;
})(jQuery);

/**
 @Script: /apps/help/components/pages/article-3/clientlibs/js/sticky-titlebar.js
 @Author: cmiqueo @ 8/18/2016
 */


 $(document).ready(function() {
    // sticky search
    $('.back-to-search').click(function() {
        $('html,body').animate({
            scrollTop:0
        },300, function() {
            // Animation complete.
            $('body').removeClass('mobile-scroll');
            $('#search-support, #search .search-input-field').focus();
        });
    });

    $('.hx-back-to-top').click(function() {
        $('body').removeClass('mobile-scroll');
    })
});
// Make sticky titlebar
$(window).resize(function() {
    stickHeader();
});
// Make sticky titlebar
$(window).scroll(function() {
    stickHeader();
});

function stickHeader() {
    var scrollTop = $(this).scrollTop();
    var titleBarHeight = $('#page-header #title-bar').outerHeight();
    var userGuideNavBand = $('.userguide-outer-nav-container');
    var totalHeight = titleBarHeight;

    var headerHeight = $('#AdobePrimaryNav').height() + $('#AdobeSecondaryNav').height();

    if (scrollTop > headerHeight ) {
        $('body').addClass('mobile-scroll');
        $('body').addClass('fixed-title');
        if(!$('body').hasClass('linkfree')) {
            $('body > article').css('margin-top', totalHeight);
        }
        if($(userGuideNavBand).length > 0) {
            $(userGuideNavBand).css('top', titleBarHeight);
        }
    } else {
        $('body').removeClass('fixed-title');
        $('body').removeClass('mobile-scroll');
        $('.article-content').css({"padding-top":"0"});
        if(!$('body').hasClass('linkfree') && !$('body').hasClass('ug-selector')) {
            if (window.outerWidth <= 767) {
                $('body > article').css('margin-top', 100);
            }
            else {
                $('body > article').css('margin-top', 0);
            }
        }
    }
}
/**
 @Script: /apps/help/components/pages/article-3/clientlibs/js/sticky-sidebar.js
 @Author: cmiqueo @ 8/18/2016
 */

// Make sticky sidebar
$(window).scroll(function() {
    if($('#sidebar').length === 0){
        /**
         * @srai: Article 3 is being inherited from a lot of templates, not all of which have a sidebar.
         * Therefore don't try to execute sidebar code if a sidebar doesn't exist on the page.
         * For templates that have a sidebar, then this code won't affect them and allow the clientlibs
         * for article 3 to be shared without writing template specific code.
         **/
         return;
     }
    //Only apply function when scrolling vertically. This fixes bug on Safari where user can scroll horizontally.
    var currentLeft = $(this).scrollLeft();
    if(currentLeft == 0) {
        var scrollTop = $(this).scrollTop();
        var sidebarLeft = parseFloat($('#sidebar').offset().left);
        var sidebarTop = $('#title-bar').height() + 20;
        var userGuideNavBand = $('.userguide-outer-nav-container');

        if ($(".article-header-bar-container").length > 0) {
            var paddingTop = $(".article-header-bar-container").offset().top - $(window).scrollTop();
            if (paddingTop > 0) {
                sidebarTop = sidebarTop + paddingTop;
            }
        }
        var sidebarWidth = $('.article-content').width() / 4;
        var sidebarHeight = $(window).height() - $('#title-bar').height() - 20;
        var titlebarTop = 0;
        if($('#title-bar').length) {
            titlebarTop = parseFloat($('#title-bar').offset().top);
        }
        var totalFooterHeight = 0;
        var footerPosition = 0;
        if($('body .article-footer').length) {
            footerPosition = $('body .article-footer').offset().top;
        }
        if($('body').hasClass('linkfree')) {
            footerPosition = $('body > footer > .linkfree').offset().top;
        }
        var scrollBottom = $(window).scrollTop() + $(window).height();

        if($(userGuideNavBand).length > 0) {
            sidebarTop += userGuideNavBand.outerHeight();
        }

        if (scrollTop >= titlebarTop ) {
            if ( $(window).width() > 767) {
                $('body').addClass('fixed-sidebar');

                var dynamicSidebarBottomPosition = scrollBottom - footerPosition;

                $('#sidebar').css({
                    top: sidebarTop,
                    left: sidebarLeft,
                    width: sidebarWidth,
                    "bottom": dynamicSidebarBottomPosition,
                    "max-height": sidebarHeight
                });
                //$('.back-to-search').addClass('active-search');
            }
        } else {
            $('body').removeClass('fixed-sidebar');
            $('#sidebar').removeAttr("style");
        }
    }
});

var article3Analytics = (function () {

    /* Public Methods */
    setPageLoadInfo = function(data) {
        digitalData._set('digitalData.primaryEvent.eventInfo.eventAction', 'pageload');
        // check if error page
        var errorPageSelector = document.querySelector('head link[rel="canonical"][href$="404.html"]');
        if (errorPageSelector !== null) {
            if (errorPageSelector.href === 'https://helpx.adobe.com/404.html') {
                digitalData._set('digitalData.page.pageInfo.type', 'errorPage');
            }
        }
        callAnalyticsTracking('state');
    },

    setLinkTrackingInfo = function(data) {
        digitalData._set('digitalData.primaryEvent.eventInfo.eventName', 'Helpx:' + data.text().trim());
        digitalData._set('digitalData.primaryEvent.eventInfo.eventAction', 'linkClick');
        digitalData._set('digitalData.linkTracking.linkInfo.sectionHeading', 'more like this');
        digitalData._set('digitalData.linkTracking.linkInfo.linkUrl', data.context.href);
        digitalData._set('digitalData.linkTracking.linkInfo.linkAction', 'newPage');
        callAnalyticsTracking('event');
    },

    callAnalyticsTracking = function(eventType) {
        if (typeof _satellite === 'undefined') return;
        _satellite.track(eventType, { digitalData: digitalData._snapshot() });
    }

    return  {
        setPageLoadInfo : setPageLoadInfo,
        setLinkTrackingInfo: setLinkTrackingInfo,
        callAnalyticsTracking : callAnalyticsTracking
    }
})();

/**
 * Article3 + CCL analytics
 * Created by cshiau on 10/01/19.
 */
 helpxTools.analytics.onReady(function () {

     article3Analytics.setPageLoadInfo();

     // Click on subnav tab
     $('.Subnav-menu').on('click', function(e) {
         e.stopImmediatePropagation(); // to stop firing trigger twice from bubbling
         if (typeof _satellite === 'undefined') return;
         var linkPosition = 0;
         var linkUrl = '';
         // subnav main menu
         if ($(e.target).attr('class') == 'Subnav-menu-label') {
             for (var i = 0; i < $('a.Subnav-menu-label').length; i++) {
                 if (e.target.innerText.trim() == $('a.Subnav-menu-label')[i].title) {
                     linkPosition = i + 1;
                     linkUrl = $('a.Subnav-menu-label')[i].href;
                 }
             }
         }
         // if target has subnav open parent
         if ($(e.target).attr('class') == ('Subnav-submenu-title' || 'Subnav-submenu-item') || $(e.target).attr('class') == 'Subnav-submenu-link') {
             var subLinkPosition = 0;
             for (var i = 0; i < $('a.Subnav-menu-label').length; i++) {
                 if ($(".Subnav-menu-item.has-submenu.is-open").text().split(/\s+/)[1] == $('a.Subnav-menu-label')[i].title) {
                     linkPosition = i + 1;
                 }
             }
             for (var i = 0; i < $('a.Subnav-submenu-link').length; i++) {
                 if (e.target.innerText.trim() == $('a.Subnav-submenu-link')[i].innerText.trim()) {
                     subLinkPosition = i + 1;
                     linkUrl = $('a.Subnav-submenu-link')[i].href;
                 }
             }
             linkPosition = linkPosition + '.' + subLinkPosition;
         }
         digitalData._set('digitalData.primaryEvent.eventInfo.eventName', 'Helpx:' + e.target.innerText.trim());
         digitalData._set('digitalData.primaryEvent.eventInfo.eventAction', 'subNavClick');
         digitalData._set('digitalData.linkTracking.linkInfo.sectionHeading', 'menu');
         digitalData._set('digitalData.linkTracking.linkInfo.linkPosition', linkPosition);
         digitalData._set('digitalData.linkTracking.linkInfo.linkUrl', linkUrl);
         digitalData._set('digitalData.linkTracking.linkInfo.linkAction', 'newPage');
         digitalData._set('digitalData.linkTracking.linkInfo.placeHolder', 'header');
         article3Analytics.callAnalyticsTracking('event');
     });

     // Click on subnav cta button
     $('.Subnav-menu-buttons').on('click', function(e) {
         e.stopImmediatePropagation(); // to stop firing trigger twice from bubbling
         if (typeof _satellite === 'undefined') return;
         var linkPosition = '';
         var linkUrl = '';
         // button tracking
         for (var i = 0; i < $('a.Subnav-menu-button').length; i++) {
             if (e.target.innerText.trim() == $('a.Subnav-menu-button')[i].title) {
                 linkPosition = $('a.Subnav-menu-label').length + i + 1;
                 linkUrl = $('a.Subnav-menu-button')[i].href;
             }
         }

         digitalData._set('digitalData.primaryEvent.eventInfo.eventName', 'Helpx:' + e.target.innerText);
         digitalData._set('digitalData.primaryEvent.eventInfo.eventAction', 'subNavClick');
         digitalData._set('digitalData.linkTracking.linkInfo.sectionHeading', 'menu');
         digitalData._set('digitalData.linkTracking.linkInfo.linkPosition', linkPosition);
         digitalData._set('digitalData.linkTracking.linkInfo.linkUrl', linkUrl);
         digitalData._set('digitalData.linkTracking.linkInfo.linkAction', 'newPage');
         digitalData._set('digitalData.linkTracking.linkInfo.placeHolder', 'header');
         article3Analytics.callAnalyticsTracking('event');
     });

      // Click on any links
     $('.related-links a').on('click', function(e) {
         e.stopImmediatePropagation(); // to stop firing trigger twice from bubbling
         article3Analytics.setLinkTrackingInfo($(this));
     });
 });

/**
 @Script: /apps/help/components/pages/article-3/clientlibs/js/ug-nav.js
 @Author: sin07606 10/28/2016
 */

 var aria = aria || {};

 aria.ListboxButton = function (button, listbox) {
 	this.button = button;
 	this.listbox = listbox;
 	this.registerEvents();
 };

 aria.ListboxButton.prototype.registerEvents = function () {
 	this.button.addEventListener('click', this.showListbox.bind(this));
 	this.button.addEventListener('keyup', this.checkShow.bind(this));
 	this.listbox.listboxNode.addEventListener('blur', this.hideListbox.bind(this));
 	this.listbox.listboxNode.addEventListener('keydown', this.checkHide.bind(this));
 	this.listbox.setHandleFocusChange(this.onFocusChange.bind(this));
 };

 aria.ListboxButton.prototype.checkShow = function (evt) {
 	var key = evt.which || evt.keyCode;

 	switch (key) {
 		case aria.KeyCode.UP:
 		case aria.KeyCode.DOWN:
 		evt.preventDefault();
 		this.showListbox();
 		this.listbox.checkKeyPress(evt);
 		break;
 	}
 };

 aria.ListboxButton.prototype.checkHide = function (evt) {
 	var key = evt.which || evt.keyCode;

 	switch (key) {
 		case aria.KeyCode.RETURN:
 		case aria.KeyCode.ESC:
 		evt.preventDefault();
 		this.hideListbox();
 		this.button.focus();
 		break;
 	}
 };

 aria.ListboxButton.prototype.showListbox = function () {
 	aria.Utils.removeClass(this.listbox.listboxNode, 'hidden');
 	this.button.setAttribute('aria-expanded', 'true');
 	this.listbox.listboxNode.focus();
 };

 aria.ListboxButton.prototype.hideListbox = function () {
 	aria.Utils.addClass(this.listbox.listboxNode, 'hidden');
 	this.button.removeAttribute('aria-expanded');
 };

 aria.ListboxButton.prototype.onFocusChange = function (focusedItem) {
 	this.button.innerText = focusedItem.innerText;
 };

/**
 * @constructor
 *
 * @desc
 *  Listbox object representing the state and interactions for a listbox widget
 *
 * @param listboxNode
 *  The DOM node pointing to the listbox
 */
 aria.Listbox = function (listboxNode) {
 	this.listboxNode = listboxNode;
 	this.activeDescendant = this.listboxNode.getAttribute('aria-activedescendant');
 	this.multiselectable = this.listboxNode.hasAttribute('aria-multiselectable');
 	this.moveUpDownEnabled = false;
 	this.siblingList = null;
 	this.upButton = null;
 	this.downButton = null;
 	this.moveButton = null;
 	this.keysSoFar = '';
 	this.handleFocusChange = function () {};
 	this.handleItemChange = function (event, items) {};
 	this.registerEvents();
 };

/**
 * @desc
 *  Register events for the listbox interactions
 */
 aria.Listbox.prototype.registerEvents = function () {
 	this.listboxNode.addEventListener('focus', this.setupFocus.bind(this));
 	this.listboxNode.addEventListener('keydown', this.checkKeyPress.bind(this));
 	this.listboxNode.addEventListener('click', this.checkClickItem.bind(this));
 };

/**
 * @desc
 *  If there is no activeDescendant, focus on the first option
 */
 aria.Listbox.prototype.setupFocus = function () {
 	if (this.activeDescendant) {
 		return;
 	}

 	this.focusFirstItem();
 };

/**
 * @desc
 *  Focus on the first option
 */
 aria.Listbox.prototype.focusFirstItem = function () {
 	var firstItem;

 	firstItem = this.listboxNode.querySelector('[role="option"]');

 	if (firstItem) {
 		this.focusItem(firstItem);
 	}
 };

/**
 * @desc
 *  Focus on the last option
 */
 aria.Listbox.prototype.focusLastItem = function () {
 	var itemList = this.listboxNode.querySelectorAll('[role="option"]');

 	if (itemList.length) {
 		this.focusItem(itemList[itemList.length - 1]);
 	}
 };

/**
 * @desc
 *  Handle various keyboard controls; UP/DOWN will shift focus; SPACE selects
 *  an item.
 *
 * @param evt
 *  The keydown event object
 */
 aria.Listbox.prototype.checkKeyPress = function (evt) {
 	var key = evt.which || evt.keyCode;
 	var nextItem = document.getElementById(this.activeDescendant);

 	if (!nextItem) {
 		return;
 	}

 	switch (key) {
 		case aria.KeyCode.PAGE_UP:
 		case aria.KeyCode.PAGE_DOWN:
 		if (this.moveUpDownEnabled) {
 			evt.preventDefault();

 			if (key === aria.KeyCode.PAGE_UP) {
 				this.moveUpItems();
 			}
 			else {
 				this.moveDownItems();
 			}
 		}

 		break;
 		case aria.KeyCode.UP:
 		case aria.KeyCode.DOWN:
 		evt.preventDefault();

 		if (this.moveUpDownEnabled && evt.altKey) {
 			if (key === aria.KeyCode.UP) {
 				this.moveUpItems();
 			}
 			else {
 				this.moveDownItems();
 			}
 			return;
 		}

 		if (key === aria.KeyCode.UP) {
 			nextItem = nextItem.previousElementSibling;
 		}
 		else {
 			nextItem = nextItem.nextElementSibling;
 		}

 		if (nextItem) {
 			this.focusItem(nextItem);
 		}

 		break;
 		case aria.KeyCode.HOME:
 		evt.preventDefault();
 		this.focusFirstItem();
 		break;
 		case aria.KeyCode.END:
 		evt.preventDefault();
 		this.focusLastItem();
 		break;
 		case aria.KeyCode.SPACE:
 		evt.preventDefault();
 		this.toggleSelectItem(nextItem);
 		break;
 		case aria.KeyCode.BACKSPACE:
 		case aria.KeyCode.DELETE:
 		case aria.KeyCode.RETURN:
 		if (!this.moveButton) {
 			return;
 		}

 		var keyshortcuts = this.moveButton.getAttribute('aria-keyshortcuts');
 		if (key === aria.KeyCode.RETURN && keyshortcuts.indexOf('Enter') === -1) {
 			return;
 		}
 		if (
 			(key === aria.KeyCode.BACKSPACE || key === aria.KeyCode.DELETE) &&
 			keyshortcuts.indexOf('Delete') === -1
 			) {
 			return;
 	}

 	evt.preventDefault();

 	var nextUnselected = nextItem.nextElementSibling;
 	while (nextUnselected) {
 		if (nextUnselected.getAttribute('aria-selected') != 'true') {
 			break;
 		}
 		nextUnselected = nextUnselected.nextElementSibling;
 	}
 	if (!nextUnselected) {
 		nextUnselected = nextItem.previousElementSibling;
 		while (nextUnselected) {
 			if (nextUnselected.getAttribute('aria-selected') != 'true') {
 				break;
 			}
 			nextUnselected = nextUnselected.previousElementSibling;
 		}
 	}

 	this.moveItems();

 	if (!this.activeDescendant && nextUnselected) {
 		this.focusItem(nextUnselected);
 	}
 	break;
 	default:
 	var itemToFocus = this.findItemToFocus(key);
 	if (itemToFocus) {
 		this.focusItem(itemToFocus);
 	}
 	break;
 }
};

aria.Listbox.prototype.findItemToFocus = function (key) {
	var itemList = this.listboxNode.querySelectorAll('[role="option"]');
	var character = String.fromCharCode(key);

	if (!this.keysSoFar) {
		for (var i = 0; i < itemList.length; i++) {
			if (itemList[i].getAttribute('id') == this.activeDescendant) {
				this.searchIndex = i;
			}
		}
	}
	this.keysSoFar += character;
	this.clearKeysSoFarAfterDelay();

	var nextMatch = this.findMatchInRange(
		itemList,
		this.searchIndex + 1,
		itemList.length
		);
	if (!nextMatch) {
		nextMatch = this.findMatchInRange(
			itemList,
			0,
			this.searchIndex
			);
	}
	return nextMatch;
};

aria.Listbox.prototype.clearKeysSoFarAfterDelay = function () {
	if (this.keyClear) {
		clearTimeout(this.keyClear);
		this.keyClear = null;
	}
	this.keyClear = setTimeout((function () {
		this.keysSoFar = '';
		this.keyClear = null;
	}).bind(this), 500);
};

aria.Listbox.prototype.findMatchInRange = function (list, startIndex, endIndex) {
  // Find the first item starting with the keysSoFar substring, searching in
  // the specified range of items
  for (var n = startIndex; n < endIndex; n++) {
  	var label = list[n].innerText;
  	if (label && label.toUpperCase().indexOf(this.keysSoFar) === 0) {
  		return list[n];
  	}
  }
  return null;
};

/**
 * @desc
 *  Check if an item is clicked on. If so, focus on it and select it.
 *
 * @param evt
 *  The click event object
 */
 aria.Listbox.prototype.checkClickItem = function (evt) {
 	if (evt.target.getAttribute('role') === 'option') {
 		this.focusItem(evt.target);
 		this.toggleSelectItem(evt.target);
 	}
 };

/**
 * @desc
 *  Toggle the aria-selected value
 *
 * @param element
 *  The element to select
 */
 aria.Listbox.prototype.toggleSelectItem = function (element) {
 	if (this.multiselectable) {
 		element.setAttribute(
 			'aria-selected',
 			element.getAttribute('aria-selected') === 'true' ? 'false' : 'true'
 			);

 		if (this.moveButton) {
 			if (this.listboxNode.querySelector('[aria-selected="true"]')) {
 				this.moveButton.setAttribute('aria-disabled', 'false');
 			}
 			else {
 				this.moveButton.setAttribute('aria-disabled', 'true');
 			}
 		}
 	}
 };

/**
 * @desc
 *  Defocus the specified item
 *
 * @param element
 *  The element to defocus
 */
 aria.Listbox.prototype.defocusItem = function (element) {
 	if (!element) {
 		return;
 	}
 	if (!this.multiselectable) {
 		element.removeAttribute('aria-selected');
 	}
 	aria.Utils.removeClass(element, 'focused');
 };

/**
 * @desc
 *  Focus on the specified item
 *
 * @param element
 *  The element to focus
 */
 aria.Listbox.prototype.focusItem = function (element) {
 	this.defocusItem(document.getElementById(this.activeDescendant));
 	if (!this.multiselectable) {
 		element.setAttribute('aria-selected', 'true');
 	}
 	aria.Utils.addClass(element, 'focused');
 	this.listboxNode.setAttribute('aria-activedescendant', element.id);
 	this.activeDescendant = element.id;

 	if (this.listboxNode.scrollHeight > this.listboxNode.clientHeight) {
 		var scrollBottom = this.listboxNode.clientHeight + this.listboxNode.scrollTop;
 		var elementBottom = element.offsetTop + element.offsetHeight;
 		if (elementBottom > scrollBottom) {
 			this.listboxNode.scrollTop = elementBottom - this.listboxNode.clientHeight;
 		}
 		else if (element.offsetTop < this.listboxNode.scrollTop) {
 			this.listboxNode.scrollTop = element.offsetTop;
 		}
 	}

 	if (!this.multiselectable && this.moveButton) {
 		this.moveButton.setAttribute('aria-disabled', false);
 	}

 	this.checkUpDownButtons();
 	this.handleFocusChange(element);
 };

/**
 * @desc
 *  Enable/disable the up/down arrows based on the activeDescendant.
 */
 aria.Listbox.prototype.checkUpDownButtons = function () {
 	var activeElement = document.getElementById(this.activeDescendant);

 	if (!this.moveUpDownEnabled) {
 		return false;
 	}

 	if (!activeElement) {
 		this.upButton.setAttribute('aria-disabled', 'true');
 		this.downButton.setAttribute('aria-disabled', 'true');
 		return;
 	}

 	if (this.upButton) {
 		if (activeElement.previousElementSibling) {
 			this.upButton.setAttribute('aria-disabled', false);
 		}
 		else {
 			this.upButton.setAttribute('aria-disabled', 'true');
 		}
 	}

 	if (this.downButton) {
 		if (activeElement.nextElementSibling) {
 			this.downButton.setAttribute('aria-disabled', false);
 		}
 		else {
 			this.downButton.setAttribute('aria-disabled', 'true');
 		}
 	}
 };

/**
 * @desc
 *  Add the specified items to the listbox. Assumes items are valid options.
 *
 * @param items
 *  An array of items to add to the listbox
 */
 aria.Listbox.prototype.addItems = function (items) {
 	if (!items || !items.length) {
 		return false;
 	}

 	items.forEach((function (item) {
 		this.defocusItem(item);
 		this.toggleSelectItem(item);
 		this.listboxNode.append(item);
 	}).bind(this));

 	if (!this.activeDescendant) {
 		this.focusItem(items[0]);
 	}

 	this.handleItemChange('added', items);
 };

/**
 * @desc
 *  Remove all of the selected items from the listbox; Removes the focused items
 *  in a single select listbox and the items with aria-selected in a multi
 *  select listbox.
 *
 * @returns items
 *  An array of items that were removed from the listbox
 */
 aria.Listbox.prototype.deleteItems = function () {
 	var itemsToDelete;

 	if (this.multiselectable) {
 		itemsToDelete = this.listboxNode.querySelectorAll('[aria-selected="true"]');
 	}
 	else if (this.activeDescendant) {
 		itemsToDelete = [ document.getElementById(this.activeDescendant) ];
 	}

 	if (!itemsToDelete || !itemsToDelete.length) {
 		return [];
 	}

 	itemsToDelete.forEach((function (item) {
 		item.remove();

 		if (item.id === this.activeDescendant) {
 			this.clearActiveDescendant();
 		}
 	}).bind(this));

 	this.handleItemChange('removed', itemsToDelete);

 	return itemsToDelete;
 };

 aria.Listbox.prototype.clearActiveDescendant = function () {
 	this.activeDescendant = null;
 	this.listboxNode.setAttribute('aria-activedescendant', null);

 	if (this.moveButton) {
 		this.moveButton.setAttribute('aria-disabled', 'true');
 	}

 	this.checkUpDownButtons();
 };

/**
 * @desc
 *  Shifts the currently focused item up on the list. No shifting occurs if the
 *  item is already at the top of the list.
 */
 aria.Listbox.prototype.moveUpItems = function () {
 	var previousItem;

 	if (!this.activeDescendant) {
 		return;
 	}

 	currentItem = document.getElementById(this.activeDescendant);
 	previousItem = currentItem.previousElementSibling;

 	if (previousItem) {
 		this.listboxNode.insertBefore(currentItem, previousItem);
 		this.handleItemChange('moved_up', [ currentItem ]);
 	}

 	this.checkUpDownButtons();
 };

/**
 * @desc
 *  Shifts the currently focused item down on the list. No shifting occurs if
 *  the item is already at the end of the list.
 */
 aria.Listbox.prototype.moveDownItems = function () {
 	var nextItem;

 	if (!this.activeDescendant) {
 		return;
 	}

 	currentItem = document.getElementById(this.activeDescendant);
 	nextItem = currentItem.nextElementSibling;

 	if (nextItem) {
 		this.listboxNode.insertBefore(nextItem, currentItem);
 		this.handleItemChange('moved_down', [ currentItem ]);
 	}

 	this.checkUpDownButtons();
 };

/**
 * @desc
 *  Delete the currently selected items and add them to the sibling list.
 */
 aria.Listbox.prototype.moveItems = function () {
 	if (!this.siblingList) {
 		return;
 	}

 	var itemsToMove = this.deleteItems();
 	this.siblingList.addItems(itemsToMove);
 };

/**
 * @desc
 *  Enable Up/Down controls to shift items up and down.
 *
 * @param upButton
 *   Up button to trigger up shift
 *
 * @param downButton
 *   Down button to trigger down shift
 */
 aria.Listbox.prototype.enableMoveUpDown = function (upButton, downButton) {
 	this.moveUpDownEnabled = true;
 	this.upButton = upButton;
 	this.downButton = downButton;
 	upButton.addEventListener('click', this.moveUpItems.bind(this));
 	downButton.addEventListener('click', this.moveDownItems.bind(this));
 };

/**
 * @desc
 *  Enable Move controls. Moving removes selected items from the current
 *  list and adds them to the sibling list.
 *
 * @param button
 *   Move button to trigger delete
 *
 * @param siblingList
 *   Listbox to move items to
 */
 aria.Listbox.prototype.setupMove = function (button, siblingList) {
 	this.siblingList = siblingList;
 	this.moveButton = button;
 	button.addEventListener('click', this.moveItems.bind(this));
 };

 aria.Listbox.prototype.setHandleItemChange = function (handlerFn) {
 	this.handleItemChange = handlerFn;
 };

 aria.Listbox.prototype.setHandleFocusChange = function (focusChangeHandler) {
 	this.handleFocusChange = focusChangeHandler;
 };

/**
 * @desc
 *  Key code constants
 */
 aria.KeyCode = {
 	BACKSPACE: 8,
 	TAB: 9,
 	RETURN: 13,
 	ESC: 27,
 	SPACE: 32,
 	PAGE_UP: 33,
 	PAGE_DOWN: 34,
 	END: 35,
 	HOME: 36,
 	LEFT: 37,
 	UP: 38,
 	RIGHT: 39,
 	DOWN: 40,
 	DELETE: 46
 };

 aria.Utils = aria.Utils || {};

// Polyfill src https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
aria.Utils.matches = function (element, selector) {
	if (!Element.prototype.matches) {
		Element.prototype.matches =
		Element.prototype.matchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector ||
		Element.prototype.oMatchesSelector ||
		Element.prototype.webkitMatchesSelector ||
		function (s) {
			var matches = element.parentNode.querySelectorAll(s);
			var i = matches.length;
			while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
		};
	}

	return element.matches(selector);
};

aria.Utils.remove = function (item) {
	if (item.remove && typeof item.remove === 'function') {
		return item.remove();
	}
	if (item.parentNode &&
		item.parentNode.removeChild &&
		typeof item.parentNode.removeChild === 'function') {
		return item.parentNode.removeChild(item);
}
return false;
};

aria.Utils.isFocusable = function (element) {
	if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
		return true;
	}

	if (element.disabled) {
		return false;
	}

	switch (element.nodeName) {
		case 'A':
		return !!element.href && element.rel != 'ignore';
		case 'INPUT':
		return element.type != 'hidden' && element.type != 'file';
		case 'BUTTON':
		case 'SELECT':
		case 'TEXTAREA':
		return true;
		default:
		return false;
	}
};

aria.Utils.getAncestorBySelector = function (element, selector) {
	if (!aria.Utils.matches(element, selector + ' ' + element.tagName)) {
    // Element is not inside an element that matches selector
    return null;
}

  // Move up the DOM tree until a parent matching the selector is found
  var currentNode = element;
  var ancestor = null;
  while (ancestor === null) {
  	if (aria.Utils.matches(currentNode.parentNode, selector)) {
  		ancestor = currentNode.parentNode;
  	}
  	else {
  		currentNode = currentNode.parentNode;
  	}
  }

  return ancestor;
};

aria.Utils.hasClass = function (element, className) {
	return (new RegExp('(\\s|^)' + className + '(\\s|$)')).test(element.className);
};

aria.Utils.addClass = function (element, className) {
	if (!aria.Utils.hasClass(element, className)) {
		element.className += ' ' + className;
	}
};

aria.Utils.removeClass = function (element, className) {
	var classRegex = new RegExp('(\\s|^)' + className + '(\\s|$)');
	element.className = element.className.replace(classRegex, ' ').trim();
};

aria.Utils.bindMethods = function (object /* , ...methodNames */) {
	var methodNames = Array.prototype.slice.call(arguments, 1);
	methodNames.forEach(function (method) {
		object[method] = object[method].bind(object);
	});
};

if (window.location.href.indexOf(".ug.html") == -1) {
	window.addEventListener('load', function () {
		if($('.userguide-outer-nav-container').length) {
			var button = document.getElementById('article-ug-nav-button');
			var exListbox = new aria.Listbox(document.getElementById('article-ug-nav-options-list'));
			var listboxButton = new aria.ListboxButton(button, exListbox);
		}
	});

	$(document).ready( function() {
		//set var for user guide link
		var strUserGuideLink = $('.select-article-container').attr('data-user-guide-link');
		//set height of drop down equal to window's height
		dropDownResize();
		mobileDropdownCheck();
		//reset height of drop down equal to window's height when user resizes window
		$(window).on('resize', function(){
			dropDownResize();
			mobileDropdownCheck();
			ugNavBandTopPosition($('.select-article'));
		});

		// Remove userguide band drop down when body click
		// $('html').click(function(e) {                    
		// 	// If the target is NOT any clickable element within the UG nav band,
		// 	if( !$(e.target).is('#article-ug-nav-button, #article-ug-nav-button .drop-arrow, .current-article') ) {
		// 		if($('.select-article.checked').length > 0) {
		// 			$('.select-article').removeClass('checked');
		// 		}
		// 	}
		// });

		// $('.select-article-container #article-ug-nav-button').click(function() {
		// 	$(this).closest('.select-article').toggleClass('checked');
		// });

		$('.select-article-container').on('click', '.option label', function() {
			var url = $(this).attr('data-url');
			window.location.href = url;
		});

		if(pathToMoreHelp.length > 0){
			$.ajax({
				url: pathToMoreHelp, 
				dataType:"json",
				success: function (data) {
					var dataString = JSON.stringify(data);
					if(/^[\],:{}\s]*$/.test(dataString.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
						if (typeof data.MoreHelpJson != typeof undefined) {
							if(typeof data.MoreHelpJson.title != typeof undefined){
								if(isValidTopicTitle(data)){
									getTopicTitle(data);
								}
							}
							if(typeof data.MoreHelpJson.ArticleList != typeof undefined){
								var optionCounter = 1;
								var strBackToTopics = $('.select-article-container').attr('data-back-to-topic');
								var topicLink = strUserGuideLink + '?topic=' + pathToMoreHelp;
								var dropDownList = '<li id="ug-nav-article-0" class="option back-to-topic" role="option"><label data-url="' + topicLink  + '">' + 
								'<div class="label">' + strBackToTopics + '</div>' +
								'</label>' + 
								'</li>';
								$('.userguide-outer-nav-container .select-article .options').append(dropDownList);
								$('.userguide-outer-nav-container .container .current-article').attr('href', topicLink);
								$.each(data.MoreHelpJson.ArticleList, function(key,value) {
									buildDropDownList(value, optionCounter);
									optionCounter++;
								});
								$('.userguide-outer-nav-container').css('display', 'block');
								var event = new Event('user-guide-band-loaded');
								document.dispatchEvent(event);
							}
						}
					}else{
						$('.userguide-outer-nav-container').remove();
					}
				},
				error: function() {
					$('.userguide-outer-nav-container').remove();
				}
			});
		}else{
			$('.userguide-outer-nav-container').remove();
		}

		$('.userguide-outer-nav-container .container .current-article').click(function(e) {
			$(this).closest('.container').toggleClass('active');
			$(this).closest('.container').find('#article-ug-nav-button').click();
			ugNavBandTopPosition($(this).closest('.container').find('.select-article'));
		});

		//View Model isn't adding the link directly to href, so we are using jQuery to append the url taken from data attribute which contains the URL for user guide.
		if($('.userguide-outer-nav-container a.breadcrumb-ug-link').length > 0){
			$('.userguide-outer-nav-container a.breadcrumb-ug-link').attr('href', strUserGuideLink);
		}
	})

	function mobileDropdownCheck() {
		var currentArticle = $('.userguide-outer-nav-container .container .current-article');
		if ($('.breadcrumb-ug-link .product-name').css('display') == "none") {
			if(currentArticle.length) {
				$(currentArticle).click(function(e) {
					e.preventDefault();
				});
				currentArticle.attr('tabindex', '-1');
			}
		}
		else {
			currentArticle.removeAttr('tabindex');
		}
	}
	function buildDropDownList(valueObject, optionCounter){
		if(isValidTitle(valueObject) && isValidArticlePath(valueObject)){
			var pageTitle = $('.page-title').html();
			var dropDownList = '';

			if(valueObject.title == pageTitle){
				dropDownList += '<li id="ug-nav-article-' + optionCounter + '" class="option current-page" role="option">';
			}else{
				dropDownList += '<li id="ug-nav-article-' + optionCounter + '" class="option" role="option">';
			}

			dropDownList+=
			'<label data-url="' + valueObject.article_path + '.html">' + 
			'<div class="label">' + valueObject.title + '</div>' +
			'</label>' + 
			'</li>';
			$('.userguide-outer-nav-container .select-article .options').append(dropDownList);
		}
	}

	function getTopicTitle(valueObject){
		var topicTitle = valueObject.MoreHelpJson.title;
		if(topicTitle){
			$('.article-container .current-article').html(topicTitle);
		}
	}

	function dropDownResize(){
		var windowHeight = $(window).innerHeight();
		var globalNavContainerHeight = $('header #page-header .globalnav-container').outerHeight();
		var titleBarHeight = $('header #page-header #title-bar').outerHeight();
		var navBandHeight = $('.userguide-outer-nav-container').outerHeight() - 1; //1px from border
		var calculatedListHeight = windowHeight - globalNavContainerHeight - titleBarHeight - navBandHeight;
		var windowWidth = $(window).innerWidth();
		$('.userguide-outer-nav-container .select-article-container').css('max-height', calculatedListHeight);
		$('.userguide-outer-nav-container .select-article-container').css('width', windowWidth);
	}


	function isValidTopicTitle(data){
		if(data.MoreHelpJson.title.length > 0){
			return true;
		}
		return false;
	}

	function isValidTitle(valueObject){
		if(valueObject.title.length > 0){
			return true;
		}
		return false;
	}

	function isValidArticlePath(valueObject){
		if(valueObject.article_path.length > 0){
			return true;
		}
		return false;
	}

	function ugNavBandTopPosition(element) {
		var navBandHeight = $('.userguide-outer-nav-container').outerHeight() - 53; //2px from border
		$(element).find('.options').css('top', navBandHeight);
	}
}


aria.ListboxButton.prototype.checkHide = function (evt) {
	var key = evt.which || evt.keyCode;

	switch (key) {
		case aria.KeyCode.RETURN:
		var url = $('#article-ug-nav-options-list .option[aria-selected="true"] label').attr('data-url');
		window.location.href = url;
		case aria.KeyCode.ESC:
		evt.preventDefault();
		this.hideListbox();
		this.button.focus();
		break;
	}
};
/*
 * @Script: /apps/help/components/pages/article-3/clientlibs/js/publish-date.js
 * @Author: sin07606 2/8/2017
 * @desc:   javascript code for publish date on article sidebars
 */

 $(document).ready(function() {
 	var publishDate = $("head").find("meta[name='publishDate']").attr("content");
 	var publishLabel = $(".publish-label").attr('data-last-published');
 	if(typeof publishDate != typeof undefined) {
	 	var formattedDate = _formatDate(publishDate);
	 	$(".article-publish-date").find("span.publish-date").text(formattedDate);
	 	$(".article-publish-date").find("label.publish-label").text(publishLabel);
	 }else {
	 	$(".article-publish-date").remove();
	 }
});

var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
function _formatDate(dateString) {
	var date = new Date(dateString);
	var formatedDateString = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
	// In the helpx environment format the date with respect to Locale
	try {
		if (typeof AdobeLearn.Config.isHelpx !== 'undefined') {
			if (AdobeLearn.Config.isHelpx == 'true') {
	            // Get page locale object
	            var pageLocale = AdobeLearn.Locale.pageLocale;
	            // Format the locale for use in toLocaleDateString method
	            var dateLocale = pageLocale.replace('_', "-");
	            // Set the option on how to display the date
	            var options = {year: 'numeric', month: 'long', day: 'numeric' };
	            formatedDateString = date.toLocaleDateString(dateLocale,options);
	        }
	    }
	}catch (e) {}
	return formatedDateString;
}

/*!
 * Platform.js <https://github.com/bestiejs/platform.js/blob/master/platform.js>
 * Copyright 2014-2016 Benjamin Tan <https://demoneaux.github.io/>
 * Copyright 2011-2013 John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <https://mths.be/mit>
 */
;(function() {
  'use strict';

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as a reference to the global object. */
  var root = (objectTypes[typeof window] && window) || this;

  /** Backup possible global object. */
  var oldRoot = root;

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /**
   * Used as the maximum length of an array-like object.
   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /** Regular expression to detect Opera. */
  var reOpera = /\bOpera/;

  /** Possible global object. */
  var thisBinding = this;

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to check for own properties of an object. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to resolve the internal `[[Class]]` of values. */
  var toString = objectProto.toString;

  /*--------------------------------------------------------------------------*/

  /**
   * Capitalizes a string value.
   *
   * @private
   * @param {string} string The string to capitalize.
   * @returns {string} The capitalized string.
   */
  function capitalize(string) {
    string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * A utility function to clean up the OS name.
   *
   * @private
   * @param {string} os The OS name to clean up.
   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
   * @param {string} [label] A label for the OS.
   */
  function cleanupOS(os, pattern, label) {
    // Platform tokens are defined at:
    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    var data = {
      '10.0': '10',
      '6.4':  '10 Technical Preview',
      '6.3':  '8.1',
      '6.2':  '8',
      '6.1':  'Server 2008 R2 / 7',
      '6.0':  'Server 2008 / Vista',
      '5.2':  'Server 2003 / XP 64-bit',
      '5.1':  'XP',
      '5.01': '2000 SP1',
      '5.0':  '2000',
      '4.0':  'NT',
      '4.90': 'ME'
    };
    // Detect Windows version from platform tokens.
    if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&
        (data = data[/[\d.]+$/.exec(os)])) {
      os = 'Windows ' + data;
    }
    // Correct character case and cleanup string.
    os = String(os);

    if (pattern && label) {
      os = os.replace(RegExp(pattern, 'i'), label);
    }

    os = format(
      os.replace(/ ce$/i, ' CE')
        .replace(/\bhpw/i, 'web')
        .replace(/\bMacintosh\b/, 'Mac OS')
        .replace(/_PowerPC\b/i, ' OS')
        .replace(/\b(OS X) [^ \d]+/i, '$1')
        .replace(/\bMac (OS X)\b/, '$1')
        .replace(/\/(\d)/, ' $1')
        .replace(/_/g, '.')
        .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
        .replace(/\bx86\.64\b/gi, 'x86_64')
        .replace(/\b(Windows Phone) OS\b/, '$1')
        .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
        .split(' on ')[0]
    );

    return os;
  }

  /**
   * An iteration utility for arrays and objects.
   *
   * @private
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   */
  function each(object, callback) {
    var index = -1,
        length = object ? object.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        callback(object[index], index, object);
      }
    } else {
      forOwn(object, callback);
    }
  }

  /**
   * Trim and conditionally capitalize string values.
   *
   * @private
   * @param {string} string The string to format.
   * @returns {string} The formatted string.
   */
  function format(string) {
    string = trim(string);
    return /^(?:webOS|i(?:OS|P))/.test(string)
      ? string
      : capitalize(string);
  }

  /**
   * Iterates over an object's own properties, executing the `callback` for each.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   */
  function forOwn(object, callback) {
    for (var key in object) {
      if (hasOwnProperty.call(object, key)) {
        callback(object[key], key, object);
      }
    }
  }

  /**
   * Gets the internal `[[Class]]` of a value.
   *
   * @private
   * @param {*} value The value.
   * @returns {string} The `[[Class]]`.
   */
  function getClassOf(value) {
    return value == null
      ? capitalize(value)
      : toString.call(value).slice(8, -1);
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of "object", "function", or "unknown".
   *
   * @private
   * @param {*} object The owner of the property.
   * @param {string} property The property to check.
   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */
  function isHostType(object, property) {
    var type = object != null ? typeof object[property] : 'number';
    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
      (type == 'object' ? !!object[property] : true);
  }

  /**
   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
   *
   * @private
   * @param {string} string The string to qualify.
   * @returns {string} The qualified string.
   */
  function qualify(string) {
    return String(string).replace(/([ -])(?!$)/g, '$1?');
  }

  /**
   * A bare-bones `Array#reduce` like utility function.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {*} The accumulated result.
   */
  function reduce(array, callback) {
    var accumulator = null;
    each(array, function(value, index) {
      accumulator = callback(accumulator, value, index, array);
    });
    return accumulator;
  }

  /**
   * Removes leading and trailing whitespace from a string.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} The trimmed string.
   */
  function trim(string) {
    return String(string).replace(/^ +| +$/g, '');
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a new platform object.
   *
   * @memberOf platform
   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
   *  context object.
   * @returns {Object} A platform object.
   */
  function parse(ua) {

    /** The environment context object. */
    var context = root;

    /** Used to flag when a custom context is provided. */
    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';

    // Juggle arguments.
    if (isCustomContext) {
      context = ua;
      ua = null;
    }

    /** Browser navigator object. */
    var nav = context.navigator || {};

    /** Browser user agent string. */
    var userAgent = nav.userAgent || '';

    ua || (ua = userAgent);

    /** Used to flag when `thisBinding` is the [ModuleScope]. */
    var isModuleScope = isCustomContext || thisBinding == oldRoot;

    /** Used to detect if browser is like Chrome. */
    var likeChrome = isCustomContext
      ? !!nav.likeChrome
      : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());

    /** Internal `[[Class]]` value shortcuts. */
    var objectClass = 'Object',
        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
        enviroClass = isCustomContext ? objectClass : 'Environment',
        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';

    /** Detect Java environments. */
    var java = /\bJava/.test(javaClass) && context.java;

    /** Detect Rhino. */
    var rhino = java && getClassOf(context.environment) == enviroClass;

    /** A character to represent alpha. */
    var alpha = java ? 'a' : '\u03b1';

    /** A character to represent beta. */
    var beta = java ? 'b' : '\u03b2';

    /** Browser document object. */
    var doc = context.document || {};

    /**
     * Detect Opera browser (Presto-based).
     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
     */
    var opera = context.operamini || context.opera;

    /** Opera `[[Class]]`. */
    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
      ? operaClass
      : (opera = null);

    /*------------------------------------------------------------------------*/

    /** Temporary variable used over the script's lifetime. */
    var data;

    /** The CPU architecture. */
    var arch = ua;

    /** Platform description array. */
    var description = [];

    /** Platform alpha/beta indicator. */
    var prerelease = null;

    /** A flag to indicate that environment features should be used to resolve the platform. */
    var useFeatures = ua == userAgent;

    /** The browser/environment version. */
    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();

    /** A flag to indicate if the OS ends with "/ Version" */
    var isSpecialCasedOS;

    /* Detectable layout engines (order is important). */
    var layout = getLayout([
      { 'label': 'EdgeHTML', 'pattern': 'Edge' },
      'Trident',
      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
      'iCab',
      'Presto',
      'NetFront',
      'Tasman',
      'KHTML',
      'Gecko'
    ]);

    /* Detectable browser names (order is important). */
    var name = getName([
      'Adobe AIR',
      'Arora',
      'Avant Browser',
      'Breach',
      'Camino',
      'Electron',
      'Epiphany',
      'Fennec',
      'Flock',
      'Galeon',
      'GreenBrowser',
      'iCab',
      'Iceweasel',
      'K-Meleon',
      'Konqueror',
      'Lunascape',
      'Maxthon',
      { 'label': 'Microsoft Edge', 'pattern': 'Edge' },
      'Midori',
      'Nook Browser',
      'PaleMoon',
      'PhantomJS',
      'Raven',
      'Rekonq',
      'RockMelt',
      { 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },
      'SeaMonkey',
      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Sleipnir',
      'SlimBrowser',
      { 'label': 'SRWare Iron', 'pattern': 'Iron' },
      'Sunrise',
      'Swiftfox',
      'Waterfox',
      'WebPositive',
      'Opera Mini',
      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
      'Opera',
      { 'label': 'Opera', 'pattern': 'OPR' },
      'Chrome',
      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
      { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },
      { 'label': 'IE', 'pattern': 'IEMobile' },
      { 'label': 'IE', 'pattern': 'MSIE' },
      'Safari'
    ]);

    /* Detectable products (order is important). */
    var product = getProduct([
      { 'label': 'BlackBerry', 'pattern': 'BB10' },
      'BlackBerry',
      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
      { 'label': 'Galaxy S5', 'pattern': 'SM-G900' },
      { 'label': 'Galaxy S6', 'pattern': 'SM-G920' },
      { 'label': 'Galaxy S6 Edge', 'pattern': 'SM-G925' },
      { 'label': 'Galaxy S7', 'pattern': 'SM-G930' },
      { 'label': 'Galaxy S7 Edge', 'pattern': 'SM-G935' },
      'Google TV',
      'Lumia',
      'iPad',
      'iPod',
      'iPhone',
      'Kindle',
      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Nexus',
      'Nook',
      'PlayBook',
      'PlayStation Vita',
      'PlayStation',
      'TouchPad',
      'Transformer',
      { 'label': 'Wii U', 'pattern': 'WiiU' },
      'Wii',
      'Xbox One',
      { 'label': 'Xbox 360', 'pattern': 'Xbox' },
      'Xoom'
    ]);

    /* Detectable manufacturers. */
    var manufacturer = getManufacturer({
      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
      'Archos': {},
      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
      'Asus': { 'Transformer': 1 },
      'Barnes & Noble': { 'Nook': 1 },
      'BlackBerry': { 'PlayBook': 1 },
      'Google': { 'Google TV': 1, 'Nexus': 1 },
      'HP': { 'TouchPad': 1 },
      'HTC': {},
      'LG': {},
      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
      'Motorola': { 'Xoom': 1 },
      'Nintendo': { 'Wii U': 1,  'Wii': 1 },
      'Nokia': { 'Lumia': 1 },
      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
      'Sony': { 'PlayStation': 1, 'PlayStation Vita': 1 }
    });

    /* Detectable operating systems (order is important). */
    var os = getOS([
      'Windows Phone',
      'Android',
      'CentOS',
      { 'label': 'Chrome OS', 'pattern': 'CrOS' },
      'Debian',
      'Fedora',
      'FreeBSD',
      'Gentoo',
      'Haiku',
      'Kubuntu',
      'Linux Mint',
      'OpenBSD',
      'Red Hat',
      'SuSE',
      'Ubuntu',
      'Xubuntu',
      'Cygwin',
      'Symbian OS',
      'hpwOS',
      'webOS ',
      'webOS',
      'Tablet OS',
      'Tizen',
      'Linux',
      'Mac OS X',
      'Macintosh',
      'Mac',
      'Windows 98;',
      'Windows '
    ]);

    /*------------------------------------------------------------------------*/

    /**
     * Picks the layout engine from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected layout engine.
     */
    function getLayout(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the manufacturer from an array of guesses.
     *
     * @private
     * @param {Array} guesses An object of guesses.
     * @returns {null|string} The detected manufacturer.
     */
    function getManufacturer(guesses) {
      return reduce(guesses, function(result, value, key) {
        // Lookup the manufacturer by product or scan the UA for the manufacturer.
        return result || (
          value[product] ||
          value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
          RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
        ) && key;
      });
    }

    /**
     * Picks the browser name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected browser name.
     */
    function getName(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the OS name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected OS name.
     */
    function getOS(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
            )) {
          result = cleanupOS(result, pattern, guess.label || guess);
        }
        return result;
      });
    }

    /**
     * Picks the product name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected product name.
     */
    function getProduct(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
            )) {
          // Split by forward slash and append product version if needed.
          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
            result[0] += ' ' + result[1];
          }
          // Correct character case and cleanup string.
          guess = guess.label || guess;
          result = format(result[0]
            .replace(RegExp(pattern, 'i'), guess)
            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
            .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
        }
        return result;
      });
    }

    /**
     * Resolves the version using an array of UA patterns.
     *
     * @private
     * @param {Array} patterns An array of UA patterns.
     * @returns {null|string} The detected version.
     */
    function getVersion(patterns) {
      return reduce(patterns, function(result, pattern) {
        return result || (RegExp(pattern +
          '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
      });
    }

    /**
     * Returns `platform.description` when the platform object is coerced to a string.
     *
     * @name toString
     * @memberOf platform
     * @returns {string} Returns `platform.description` if available, else an empty string.
     */
    function toStringPlatform() {
      return this.description || '';
    }

    /*------------------------------------------------------------------------*/

    // Convert layout to an array so we can add extra details.
    layout && (layout = [layout]);

    // Detect product names that contain their manufacturer's name.
    if (manufacturer && !product) {
      product = getProduct([manufacturer]);
    }
    // Clean up Google TV.
    if ((data = /\bGoogle TV\b/.exec(product))) {
      product = data[0];
    }
    // Detect simulators.
    if (/\bSimulator\b/i.test(ua)) {
      product = (product ? product + ' ' : '') + 'Simulator';
    }
    // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.
    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
      description.push('running in Turbo/Uncompressed mode');
    }
    // Detect IE Mobile 11.
    if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
      data = parse(ua.replace(/like iPhone OS/, ''));
      manufacturer = data.manufacturer;
      product = data.product;
    }
    // Detect iOS.
    else if (/^iP/.test(product)) {
      name || (name = 'Safari');
      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
        ? ' ' + data[1].replace(/_/g, '.')
        : '');
    }
    // Detect Kubuntu.
    else if (name == 'Konqueror' && !/buntu/i.test(os)) {
      os = 'Kubuntu';
    }
    // Detect Android browsers.
    else if ((manufacturer && manufacturer != 'Google' &&
        ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) ||
        (/\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua))) {
      name = 'Android Browser';
      os = /\bAndroid\b/.test(os) ? os : 'Android';
    }
    // Detect Silk desktop/accelerated modes.
    else if (name == 'Silk') {
      if (!/\bMobi/i.test(ua)) {
        os = 'Android';
        description.unshift('desktop mode');
      }
      if (/Accelerated *= *true/i.test(ua)) {
        description.unshift('accelerated');
      }
    }
    // Detect PaleMoon identifying as Firefox.
    else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
      description.push('identifying as Firefox ' + data[1]);
    }
    // Detect Firefox OS and products running Firefox.
    else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
      os || (os = 'Firefox OS');
      product || (product = data[1]);
    }
    // Detect false positives for Firefox/Safari.
    else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
      // Escape the `/` for Firefox 1.
      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
        // Clear name of false positives.
        name = null;
      }
      // Reassign a generic name.
      if ((data = product || manufacturer || os) &&
          (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
      }
    }
    // Add Chrome version to description for Electron.
    else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
      description.push('Chromium ' + data);
    }
    // Detect non-Opera (Presto-based) versions (order is important).
    if (!version) {
      version = getVersion([
        '(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))',
        'Version',
        qualify(name),
        '(?:Firefox|Minefield|NetFront)'
      ]);
    }
    // Detect stubborn layout engines.
    if ((data =
          layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||
          /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
          /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||
          !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||
          layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront'
        )) {
      layout = [data];
    }
    // Detect Windows Phone 7 desktop mode.
    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
      name += ' Mobile';
      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
      description.unshift('desktop mode');
    }
    // Detect Windows Phone 8.x desktop mode.
    else if (/\bWPDesktop\b/i.test(ua)) {
      name = 'IE Mobile';
      os = 'Windows Phone 8.x';
      description.unshift('desktop mode');
      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
    }
    // Detect IE 11 identifying as other browsers.
    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
      if (name) {
        description.push('identifying as ' + name + (version ? ' ' + version : ''));
      }
      name = 'IE';
      version = data[1];
    }
    // Leverage environment features.
    if (useFeatures) {
      // Detect server-side environments.
      // Rhino has a global function while others have a global object.
      if (isHostType(context, 'global')) {
        if (java) {
          data = java.lang.System;
          arch = data.getProperty('os.arch');
          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
        }
        if (isModuleScope && isHostType(context, 'system') && (data = [context.system])[0]) {
          os || (os = data[0].os || null);
          try {
            data[1] = context.require('ringo/engine').version;
            version = data[1].join('.');
            name = 'RingoJS';
          } catch(e) {
            if (data[0].global.system == context.system) {
              name = 'Narwhal';
            }
          }
        }
        else if (
          typeof context.process == 'object' && !context.process.browser &&
          (data = context.process)
        ) {
          if (typeof data.versions == 'object') {
            if (typeof data.versions.electron == 'string') {
              description.push('Node ' + data.versions.node);
              name = 'Electron';
              version = data.versions.electron;
            } else if (typeof data.versions.nw == 'string') {
              description.push('Chromium ' + version, 'Node ' + data.versions.node);
              name = 'NW.js';
              version = data.versions.nw;
            }
          } else {
            name = 'Node.js';
            arch = data.arch;
            os = data.platform;
            version = /[\d.]+/.exec(data.version)[0];
          }
        }
        else if (rhino) {
          name = 'Rhino';
        }
      }
      // Detect Adobe AIR.
      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
        name = 'Adobe AIR';
        os = data.flash.system.Capabilities.os;
      }
      // Detect PhantomJS.
      else if (getClassOf((data = context.phantom)) == phantomClass) {
        name = 'PhantomJS';
        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
      }
      // Detect IE compatibility modes.
      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
        // We're in compatibility mode when the Trident version + 4 doesn't
        // equal the document mode.
        version = [version, doc.documentMode];
        if ((data = +data[1] + 4) != version[1]) {
          description.push('IE ' + version[1] + ' mode');
          layout && (layout[1] = '');
          version[1] = data;
        }
        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
      }
      // Detect IE 11 masking as other browsers.
      else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
        description.push('masking as ' + name + ' ' + version);
        name = 'IE';
        version = '11.0';
        layout = ['Trident'];
        os = 'Windows';
      }
      os = os && format(os);
    }
    // Detect prerelease phases.
    if (version && (data =
          /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
          /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
          /\bMinefield\b/i.test(ua) && 'a'
        )) {
      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
      version = version.replace(RegExp(data + '\\+?$'), '') +
        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
    }
    // Detect Firefox Mobile.
    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {
      name = 'Firefox Mobile';
    }
    // Obscure Maxthon's unreliable version.
    else if (name == 'Maxthon' && version) {
      version = version.replace(/\.[\d.]+/, '.x');
    }
    // Detect Xbox 360 and Xbox One.
    else if (/\bXbox\b/i.test(product)) {
      if (product == 'Xbox 360') {
        os = null;
      }
      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
        description.unshift('mobile mode');
      }
    }
    // Add mobile postfix.
    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
        (os == 'Windows CE' || /Mobi/i.test(ua))) {
      name += ' Mobile';
    }
    // Detect IE platform preview.
    else if (name == 'IE' && useFeatures) {
      try {
        if (context.external === null) {
          description.unshift('platform preview');
        }
      } catch(e) {
        description.unshift('embedded');
      }
    }
    // Detect BlackBerry OS version.
    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
          (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
          version
        )) {
      data = [data, /BB10/.test(ua)];
      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
      version = null;
    }
    // Detect Opera identifying/masking itself as another browser.
    // http://www.opera.com/support/kb/view/843/
    else if (this != forOwn && product != 'Wii' && (
          (useFeatures && opera) ||
          (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
          (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
          (name == 'IE' && (
            (os && !/^Win/.test(os) && version > 5.5) ||
            /\bWindows XP\b/.test(os) && version > 8 ||
            version == 8 && !/\bTrident\b/.test(ua)
          ))
        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
      // When "identifying", the UA contains both Opera and the other browser's name.
      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
      if (reOpera.test(name)) {
        if (/\bIE\b/.test(data) && os == 'Mac OS') {
          os = null;
        }
        data = 'identify' + data;
      }
      // When "masking", the UA contains only the other browser's name.
      else {
        data = 'mask' + data;
        if (operaClass) {
          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
        } else {
          name = 'Opera';
        }
        if (/\bIE\b/.test(data)) {
          os = null;
        }
        if (!useFeatures) {
          version = null;
        }
      }
      layout = ['Presto'];
      description.push(data);
    }
    // Detect WebKit Nightly and approximate Chrome/Safari versions.
    if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
      // Correct build number for numeric comparison.
      // (e.g. "532.5" becomes "532.05")
      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
      // Nightly builds are postfixed with a "+".
      if (name == 'Safari' && data[1].slice(-1) == '+') {
        name = 'WebKit Nightly';
        prerelease = 'alpha';
        version = data[1].slice(0, -1);
      }
      // Clear incorrect browser versions.
      else if (version == data[1] ||
          version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
        version = null;
      }
      // Use the full Chrome version when available.
      data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
      // Detect Blink layout engine.
      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
        layout = ['Blink'];
      }
      // Detect JavaScriptCore.
      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
      if (!useFeatures || (!likeChrome && !data[1])) {
        layout && (layout[1] = 'like Safari');
        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');
      } else {
        layout && (layout[1] = 'like Chrome');
        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
      }
      // Add the postfix of ".x" or "+" for approximate versions.
      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
      // Obscure version for some Safari 1-2 releases.
      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
        version = data;
      }
    }
    // Detect Opera desktop modes.
    if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {
      name += ' ';
      description.unshift('desktop mode');
      if (data == 'zvav') {
        name += 'Mini';
        version = null;
      } else {
        name += 'Mobile';
      }
      os = os.replace(RegExp(' *' + data + '$'), '');
    }
    // Detect Chrome desktop mode.
    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
      description.unshift('desktop mode');
      name = 'Chrome Mobile';
      version = null;

      if (/\bOS X\b/.test(os)) {
        manufacturer = 'Apple';
        os = 'iOS 4.3+';
      } else {
        os = null;
      }
    }
    // Strip incorrect OS versions.
    if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
        ua.indexOf('/' + data + '-') > -1) {
      os = trim(os.replace(data, ''));
    }
    // Add layout engine.
    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
        /Browser|Lunascape|Maxthon/.test(name) ||
        name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) ||
        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(name) && layout[1])) {
      // Don't add layout details to description if they are falsey.
      (data = layout[layout.length - 1]) && description.push(data);
    }
    // Combine contextual information.
    if (description.length) {
      description = ['(' + description.join('; ') + ')'];
    }
    // Append manufacturer to description.
    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
      description.push('on ' + manufacturer);
    }
    // Append product to description.
    if (product) {
      description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
    }
    // Parse the OS into an object.
    if (os) {
      data = / ([\d.+]+)$/.exec(os);
      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
      os = {
        'architecture': 32,
        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
        'version': data ? data[1] : null,
        'toString': function() {
          var version = this.version;
          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
        }
      };
    }
    // Add browser/OS architecture.
    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
      if (os) {
        os.architecture = 64;
        os.family = os.family.replace(RegExp(' *' + data), '');
      }
      if (
          name && (/\bWOW64\b/i.test(ua) ||
          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
      ) {
        description.unshift('32-bit');
      }
    }
    // Chrome 39 and above on OS X is always 64-bit.
    else if (
        os && /^OS X/.test(os.family) &&
        name == 'Chrome' && parseFloat(version) >= 39
    ) {
      os.architecture = 64;
    }

    ua || (ua = null);

    /*------------------------------------------------------------------------*/

    /**
     * The platform object.
     *
     * @name platform
     * @type Object
     */
    var platform = {};

    /**
     * The platform description.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.description = ua;

    /**
     * The name of the browser's layout engine.
     *
     * The list of common layout engines include:
     * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.layout = layout && layout[0];

    /**
     * The name of the product's manufacturer.
     *
     * The list of manufacturers include:
     * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
     * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
     * "Nokia", "Samsung" and "Sony"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.manufacturer = manufacturer;

    /**
     * The name of the browser/environment.
     *
     * The list of common browser names include:
     * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
     * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
     * "Opera Mini" and "Opera"
     *
     * Mobile versions of some browsers have "Mobile" appended to their name:
     * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.name = name;

    /**
     * The alpha/beta release indicator.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.prerelease = prerelease;

    /**
     * The name of the product hosting the browser.
     *
     * The list of common products include:
     *
     * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
     * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.product = product;

    /**
     * The browser's user agent string.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.ua = ua;

    /**
     * The browser/environment version.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.version = name && version;

    /**
     * The name of the operating system.
     *
     * @memberOf platform
     * @type Object
     */
    platform.os = os || {

      /**
       * The CPU architecture the OS is built for.
       *
       * @memberOf platform.os
       * @type number|null
       */
      'architecture': null,

      /**
       * The family of the OS.
       *
       * Common values include:
       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
       * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
       * "Android", "iOS" and "Windows Phone"
       *
       * @memberOf platform.os
       * @type string|null
       */
      'family': null,

      /**
       * The version of the OS.
       *
       * @memberOf platform.os
       * @type string|null
       */
      'version': null,

      /**
       * Returns the OS string.
       *
       * @memberOf platform.os
       * @returns {string} The OS string.
       */
      'toString': function() { return 'null'; }
    };

    platform.parse = parse;
    platform.toString = toStringPlatform;

    if (platform.version) {
      description.unshift(version);
    }
    if (platform.name) {
      description.unshift(name);
    }
    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
      description.push(product ? '(' + os + ')' : 'on ' + os);
    }
    if (description.length) {
      platform.description = description.join(' ');
    }
    return platform;
  }

  /*--------------------------------------------------------------------------*/

  // Export platform.
  var platform = parse();

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose platform on the global object to prevent errors when platform is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.platform = platform;

    // Define as an anonymous module so platform can be aliased through path mapping.
    define(function() {
      return platform;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for CommonJS support.
    forOwn(platform, function(value, key) {
      freeExports[key] = value;
    });
  }
  else {
    // Export to the global object.
    root.platform = platform;
  }
}.call(this));

var authenticateByEmail = (function(){

    /**
     * Takes an email domain (e.g. 'adobe.com') and a list of comma separated values of domains (e.g. 'adobe.com, 'apple.com',
     * 'google.com'), and checks if the email domain is a substring of the list of all allowed domains.
     *
     * If it this, then that email address is allowed to view the page.
     *
     *	Arguments
     *  String
     *
     *  Return value
     *  String
     *
     *  @method _getDomain
     *  @return String
     */
    var _isEmailAllowed = function(emailDomain, allowedDomains){
        if(allowedDomains.indexOf(emailDomain) > -1){
            return true;
        } else {
            return false;
        }
    };

    /**
     * Takes an email address string (e.g. sanrai@adobe.com) and will return the domain of that email address (e.g. 'adobe.com')
     *
     *	Arguments
     *  String
     *
     *  Return value
     *  String
     *
     *  @method _getDomain
     *  @return String
     */
    var _getDomain = function(emailAddress){
        var _domain = emailAddress.substring(emailAddress.lastIndexOf("@") +1);
        return _domain;
    };


    /**
     * Takes an email address (e.g. 'sanrai@adobe.com') and a list of comma separated values of domains (e.g. 'adobe.com, 'apple.com',
     * 'google.com'), and returns whether or not that email address is permitted to view the page.
     *
     *	Arguments
     *  String, String
     *
     *  Return value
     *  Boolean
     *
     *  @method _isAllowed
     *  @return Boolean
     */
    var _isAllowed = function(emailAddress, allowedDomains){
        var _emailAddress = emailAddress.toLowerCase();
        var _emailDomain = _getDomain(_emailAddress);
        var _allowedDomains = allowedDomains.toLowerCase();

        if(_isEmailAllowed(_emailDomain, _allowedDomains)){
            return true;
        } else {
            return false;
        }
    };

    return {
        getDomain: _getDomain,
        isEmailAllowed: _isEmailAllowed,
        isAllowed: _isAllowed
    }
})();
var page = (function(){

    /**
     * Internal variable to represent the default redirect page if user is not authenticated to view the page by email
     *
     * Defaults to the support-hub
     *
     * @property _redirectPage
     * @type String
     * @default "support.html"
     */
    var _redirectPage = "support.html";

    /**
     * Converts the redirect page into a redirect URL that is appropriate for all the different helpx domains
     *
     *	Arguments
     *  String
     *
     *  Return value
     *  String
     *
     *  @method _getDomain
     *  @return String
     */
    var _getRedirectUrl = function(){
        var redirectUrl = window.location.origin + AdobeLearn.Locale["relativePath"] + _redirectPage;
        return redirectUrl;
    };

    /**
     *  _showPrivateFeaturePack checks whether the user is signed in or not. If not signed in, redirect to sign in page.
     *  If signed in, wait for the adobeIMS on profile method to determine whether to redirect the user or not.
     *	Arguments
     *  None
     *
     *  Return value
     *  None
     *
     *  @method _showPrivateFeaturePack
     *  @return void
     */
    var _showPrivateBetaOrFeaturePack = function(privateBeta, privateFeaturePack, admittedDomains){
		if (privateBeta) {
			adobeIMS.addEventListener("ready", function(){
				if(typeof adobeIMS.isSignedInUser() === 'undefined') {
					adobeIMS.signIn();
				}
				else {
					$( "body" ).removeClass( "private" );
					try {
						resizeVideo();
					} catch(e) {}
				}
			});
		}
		if (privateFeaturePack) {
			adobeIMS.addEventListener("ready", function(){
				if(typeof adobeIMS.isSignedInUser() === 'undefined') {
					adobeIMS.signIn();
				}
			});
			adobeIMS.addEventListener("profile", function(){
				/* This event also fires on user sign out */
				var userAllowed = false;
				try {
					admittedDomains = admittedDomains.toLowerCase() + ",@adobe.com";
				    $.each(admittedDomains.split(","), function( index, value ) {
				    	var currentDomain = value.trim();
				        if (currentDomain.length > 1 && adobeIMS._profile.email.toLowerCase().indexOf(currentDomain) > -1) {
				            userAllowed = true;
				        }
				    });
				} catch(e){}
				if(userAllowed){
					$( "body" ).removeClass( "private" );
					try {
						resizeVideo();
					} catch(e) {}
				}
				else {
					window.location = _getRedirectUrl();
				}
			});
		}
    };

    var _init = function(){
        /**
         * Initialize the buyButton
         */
        if (typeof(buyButton) != "undefined") {
			document.addEventListener("DOMContentLoaded", function() {
				buyButton.init(document.location.href);
			});
        }
    };

    return {
        init: _init,
        getRedirectUrl :_getRedirectUrl,
        showPrivateBetaOrFeaturePack: _showPrivateBetaOrFeaturePack
    }

})();

page.init();
(function () {
    function flattenLinks() {
        var links = document.links;
        var sites = [
            "forums.adobe.com",
            "community.adobe.com",
            "facebook.com",
            "twitter.com",
            "instagram.com",
            "google.com",
            "dropbox.com",
            "youtube.com",
            "whatsapp.com",
            "drive.google.com",
            "linkedin.com",
            "behance.net"
        ];

        for (var i = 0; i < links.length; i++) {
            for (var j = 0; j < sites.length; j++) {
                if (links[i].href.indexOf(sites[j]) > -1) {
                    if (DEBUG) console.log('Flattened link: ', links[i].href);
                    links[i].setAttribute('style', 'color:inherit;text-decoration:inherit!important;cursor:auto');
                    links[i].setAttribute('href', '#');
                    links[i].setAttribute('onclick', 'return false');
                }
            }
        }
    }

    var isChinese = document.getElementsByTagName("body")[0].classList.contains('locale_zh_CN');
    if (isChinese) {
        // document.addEventListener("dexter:globalNavReady", flattenLinks());
        document.addEventListener('DOMContentLoaded', flattenLinks());
    }
})();

/*
 * File: iframeResizer.contentWindow.js
 * Desc: Include this file in any page being loaded into an iframe
 *       to force the iframe to resize to the content size.
 * Requires: iframeResizer.js on host page.
 * Doc: https://github.com/davidjbradshaw/iframe-resizer
 * Author: David J. Bradshaw - dave@bradshaw.net
 * Contributor: Jure Mav - jure.mav@gmail.com
 * Contributor: Ian Caunce - ian@hallnet.co.uk
 */


;(function(undefined) {
	'use strict';

	if(typeof window === 'undefined') return; // don't run for server side render

	var
		autoResize            = true,
		base                  = 10,
		bodyBackground        = '',
		bodyMargin            = 0,
		bodyMarginStr         = '',
		bodyObserver          = null,
		bodyPadding           = '',
		calculateWidth        = false,
		doubleEventList       = {'resize':1,'click':1},
		eventCancelTimer      = 128,
		firstRun              = true,
		height                = 1,
		heightCalcModeDefault = 'bodyOffset',
		heightCalcMode        = heightCalcModeDefault,
		initLock              = true,
		initMsg               = '',
		inPageLinks           = {},
		interval              = 32,
		intervalTimer         = null,
		logging               = false,
		msgID                 = '[iFrameSizer]',  //Must match host page msg ID
		msgIdLen              = msgID.length,
		myID                  = '',
		observer              = null,
		resetRequiredMethods  = {max:1,min:1,bodyScroll:1,documentElementScroll:1},
		resizeFrom            = 'child',
		sendPermit            = true,
		target                = window.parent,
		targetOriginDefault   = '*',
		tolerance             = 0,
		triggerLocked         = false,
		triggerLockedTimer    = null,
		throttledTimer        = 16,
		width                 = 1,
		widthCalcModeDefault  = 'scroll',
		widthCalcMode         = widthCalcModeDefault,
		win                   = window,
		messageCallback       = function(){ warn('MessageCallback function not defined'); },
		readyCallback         = function(){},
		pageInfoCallback      = function(){},
		customCalcMethods     = {
			height: function(){
				warn('Custom height calculation function not defined');
				return document.documentElement.offsetHeight;
			},
			width: function(){
				warn('Custom width calculation function not defined');
				return document.body.scrollWidth;
			}
		},
		eventHandlersByName   = {};


	function addEventListener(el,evt,func){
		/* istanbul ignore else */ // Not testable in phantonJS
		if ('addEventListener' in window){
			el.addEventListener(evt,func, false);
		} else if ('attachEvent' in window){ //IE
			el.attachEvent('on'+evt,func);
		}
	}

	function removeEventListener(el,evt,func){
		/* istanbul ignore else */ // Not testable in phantonJS
		if ('removeEventListener' in window){
			el.removeEventListener(evt,func, false);
		} else if ('detachEvent' in window){ //IE
			el.detachEvent('on'+evt,func);
		}
	}

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	//Based on underscore.js
	function throttle(func) {
		var
			context, args, result,
			timeout = null,
			previous = 0,
			later = function() {
				previous = getNow();
				timeout = null;
				result = func.apply(context, args);
				if (!timeout) {
					context = args = null;
				}
			};

		return function() {
			var now = getNow();

			if (!previous) {
				previous = now;
			}

			var remaining = throttledTimer - (now - previous);

			context = this;
			args = arguments;

			if (remaining <= 0 || remaining > throttledTimer) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}

				previous = now;
				result = func.apply(context, args);

				if (!timeout) {
					context = args = null;
				}

			} else if (!timeout) {
				timeout = setTimeout(later, remaining);
			}

			return result;
		};
	}

	var getNow = Date.now || function() {
		/* istanbul ignore next */ // Not testable in PhantonJS
		return new Date().getTime();
	};

	function formatLogMsg(msg){
		return msgID + '[' + myID + ']' + ' ' + msg;
	}

	function log(msg){
		if (logging && ('object' === typeof window.console)){
			console.log(formatLogMsg(msg));
		}
	}

	function warn(msg){
		if ('object' === typeof window.console){
			console.warn(formatLogMsg(msg));
		}
	}


	function init(){
		readDataFromParent();
		log('Initialising iFrame ('+location.href+')');
		readDataFromPage();
		setMargin();
		setBodyStyle('background',bodyBackground);
		setBodyStyle('padding',bodyPadding);
		injectClearFixIntoBodyElement();
		checkHeightMode();
		checkWidthMode();
		stopInfiniteResizingOfIFrame();
		setupPublicMethods();
		startEventListeners();
		inPageLinks = setupInPageLinks();
		sendSize('init','Init message from host page');
		readyCallback();
	}

	function readDataFromParent(){

		function strBool(str){
			return 'true' === str ? true : false;
		}

		var data = initMsg.substr(msgIdLen).split(':');

		myID               = data[0];
		bodyMargin         = (undefined !== data[1]) ? Number(data[1])   : bodyMargin; //For V1 compatibility
		calculateWidth     = (undefined !== data[2]) ? strBool(data[2])  : calculateWidth;
		logging            = (undefined !== data[3]) ? strBool(data[3])  : logging;
		interval           = (undefined !== data[4]) ? Number(data[4])   : interval;
		autoResize         = (undefined !== data[6]) ? strBool(data[6])  : autoResize;
		bodyMarginStr      = data[7];
		heightCalcMode     = (undefined !== data[8]) ? data[8]           : heightCalcMode;
		bodyBackground     = data[9];
		bodyPadding        = data[10];
		tolerance          = (undefined !== data[11]) ? Number(data[11]) : tolerance;
		inPageLinks.enable = (undefined !== data[12]) ? strBool(data[12]): false;
		resizeFrom         = (undefined !== data[13]) ? data[13]         : resizeFrom;
		widthCalcMode      = (undefined !== data[14]) ? data[14]         : widthCalcMode;
	}

	function readDataFromPage(){
		function readData(){
			var data = window.iFrameResizer;

			log('Reading data from page: ' + JSON.stringify(data));

			messageCallback     = ('messageCallback'         in data) ? data.messageCallback         : messageCallback;
			readyCallback       = ('readyCallback'           in data) ? data.readyCallback           : readyCallback;
			targetOriginDefault = ('targetOrigin'            in data) ? data.targetOrigin            : targetOriginDefault;
			heightCalcMode      = ('heightCalculationMethod' in data) ? data.heightCalculationMethod : heightCalcMode;
			widthCalcMode       = ('widthCalculationMethod'  in data) ? data.widthCalculationMethod  : widthCalcMode;
		}

		function setupCustomCalcMethods(calcMode, calcFunc){
			if ('function' === typeof calcMode) {
				log('Setup custom ' + calcFunc + 'CalcMethod');
				customCalcMethods[calcFunc] = calcMode;
				calcMode = 'custom';
			}

			return calcMode;
		}

		if(('iFrameResizer' in window) && (Object === window.iFrameResizer.constructor)) {
			readData();
			heightCalcMode = setupCustomCalcMethods(heightCalcMode, 'height');
			widthCalcMode  = setupCustomCalcMethods(widthCalcMode,  'width');
		}

		log('TargetOrigin for parent set to: ' + targetOriginDefault);
	}


	function chkCSS(attr,value){
		if (-1 !== value.indexOf('-')){
			warn('Negative CSS value ignored for '+attr);
			value='';
		}
		return value;
	}

	function setBodyStyle(attr,value){
		if ((undefined !== value) && ('' !== value) && ('null' !== value)){
			document.body.style[attr] = value;
			log('Body '+attr+' set to "'+value+'"');
		}
	}

	function setMargin(){
		//If called via V1 script, convert bodyMargin from int to str
		if (undefined === bodyMarginStr){
			bodyMarginStr = bodyMargin+'px';
		}

		setBodyStyle('margin',chkCSS('margin',bodyMarginStr));
	}

	function stopInfiniteResizingOfIFrame(){
		document.documentElement.style.height = '';
		document.body.style.height = '';
		log('HTML & body height set to "auto"');
	}


	function manageTriggerEvent(options){

		var listener = {
			add:    function(eventName){
				function handleEvent(){
					sendSize(options.eventName,options.eventType);
				}

				eventHandlersByName[eventName] = handleEvent;

				addEventListener(window,eventName,handleEvent);
			},
			remove: function(eventName){
				var handleEvent = eventHandlersByName[eventName];
				delete eventHandlersByName[eventName];

				removeEventListener(window,eventName,handleEvent);
			}
		};

		if(options.eventNames && Array.prototype.map){
			options.eventName = options.eventNames[0];
			options.eventNames.map(listener[options.method]);
		} else {
			listener[options.method](options.eventName);
		}

		log(capitalizeFirstLetter(options.method) + ' event listener: ' + options.eventType);
	}

	function manageEventListeners(method){
		manageTriggerEvent({method:method, eventType: 'Animation Start',           eventNames: ['animationstart','webkitAnimationStart'] });
		manageTriggerEvent({method:method, eventType: 'Animation Iteration',       eventNames: ['animationiteration','webkitAnimationIteration'] });
		manageTriggerEvent({method:method, eventType: 'Animation End',             eventNames: ['animationend','webkitAnimationEnd'] });
		manageTriggerEvent({method:method, eventType: 'Input',                     eventName:  'input' });
		manageTriggerEvent({method:method, eventType: 'Mouse Up',                  eventName:  'mouseup' });
		manageTriggerEvent({method:method, eventType: 'Mouse Down',                eventName:  'mousedown' });
		manageTriggerEvent({method:method, eventType: 'Orientation Change',        eventName:  'orientationchange' });
		manageTriggerEvent({method:method, eventType: 'Print',                     eventName:  ['afterprint', 'beforeprint'] });
		manageTriggerEvent({method:method, eventType: 'Ready State Change',        eventName:  'readystatechange' });
		manageTriggerEvent({method:method, eventType: 'Touch Start',               eventName:  'touchstart' });
		manageTriggerEvent({method:method, eventType: 'Touch End',                 eventName:  'touchend' });
		manageTriggerEvent({method:method, eventType: 'Touch Cancel',              eventName:  'touchcancel' });
		manageTriggerEvent({method:method, eventType: 'Transition Start',          eventNames: ['transitionstart','webkitTransitionStart','MSTransitionStart','oTransitionStart','otransitionstart'] });
		manageTriggerEvent({method:method, eventType: 'Transition Iteration',      eventNames: ['transitioniteration','webkitTransitionIteration','MSTransitionIteration','oTransitionIteration','otransitioniteration'] });
		manageTriggerEvent({method:method, eventType: 'Transition End',            eventNames: ['transitionend','webkitTransitionEnd','MSTransitionEnd','oTransitionEnd','otransitionend'] });
		if('child' === resizeFrom){
			manageTriggerEvent({method:method, eventType: 'IFrame Resized',        eventName:  'resize' });
		}
	}

	function checkCalcMode(calcMode,calcModeDefault,modes,type){
		if (calcModeDefault !== calcMode){
			if (!(calcMode in modes)){
				warn(calcMode + ' is not a valid option for '+type+'CalculationMethod.');
				calcMode=calcModeDefault;
			}
			log(type+' calculation method set to "'+calcMode+'"');
		}

		return calcMode;
	}

	function checkHeightMode(){
		heightCalcMode = checkCalcMode(heightCalcMode,heightCalcModeDefault,getHeight,'height');
	}

	function checkWidthMode(){
		widthCalcMode = checkCalcMode(widthCalcMode,widthCalcModeDefault,getWidth,'width');
	}

	function startEventListeners(){
		if ( true === autoResize ) {
			manageEventListeners('add');
			setupMutationObserver();
		}
		else {
			log('Auto Resize disabled');
		}
	}

	function stopMsgsToParent(){
		log('Disable outgoing messages');
		sendPermit = false;
	}

	function removeMsgListener(){
		log('Remove event listener: Message');
		removeEventListener(window, 'message', receiver);
	}

	function disconnectMutationObserver(){
		if (null !== bodyObserver){
			/* istanbul ignore next */ // Not testable in PhantonJS
			bodyObserver.disconnect();
		}
	}

	function stopEventListeners(){
		manageEventListeners('remove');
		disconnectMutationObserver();
		clearInterval(intervalTimer);
	}

	function teardown(){
		stopMsgsToParent();
		removeMsgListener();
		if (true === autoResize) stopEventListeners();
	}

	function injectClearFixIntoBodyElement(){
		var clearFix = document.createElement('div');
		clearFix.style.clear   = 'both';
		clearFix.style.display = 'block'; //Guard against this having been globally redefined in CSS.
		document.body.appendChild(clearFix);
	}

	function setupInPageLinks(){

		function getPagePosition (){
			return {
				x: (window.pageXOffset !== undefined) ? window.pageXOffset : document.documentElement.scrollLeft,
				y: (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop
			};
		}

		function getElementPosition(el){
			var
				elPosition   = el.getBoundingClientRect(),
				pagePosition = getPagePosition();

			return {
				x: parseInt(elPosition.left,10) + parseInt(pagePosition.x,10),
				y: parseInt(elPosition.top,10)  + parseInt(pagePosition.y,10)
			};
		}

		function findTarget(location){
			function jumpToTarget(target){
				var jumpPosition = getElementPosition(target);

				log('Moving to in page link (#'+hash+') at x: '+jumpPosition.x+' y: '+jumpPosition.y);
				sendMsg(jumpPosition.y, jumpPosition.x, 'scrollToOffset'); // X&Y reversed at sendMsg uses height/width
			}

			var
				hash     = location.split('#')[1] || location, //Remove # if present
				hashData = decodeURIComponent(hash),
				target   = document.getElementById(hashData) || document.getElementsByName(hashData)[0];

			if (undefined !== target){
				jumpToTarget(target);
			} else {
				log('In page link (#' + hash + ') not found in iFrame, so sending to parent');
				sendMsg(0,0,'inPageLink','#'+hash);
			}
		}

		function checkLocationHash(){
			if ('' !== location.hash && '#' !== location.hash){
				findTarget(location.href);
			}
		}

		function bindAnchors(){
			function setupLink(el){
				function linkClicked(e){
					e.preventDefault();

					/*jshint validthis:true */
					findTarget(this.getAttribute('href'));
				}

				if ('#' !== el.getAttribute('href')){
					addEventListener(el,'click',linkClicked);
				}
			}

			Array.prototype.forEach.call( document.querySelectorAll( 'a[href^="#"]' ), setupLink );
		}

		function bindLocationHash(){
			addEventListener(window,'hashchange',checkLocationHash);
		}

		function initCheck(){ //check if page loaded with location hash after init resize
			setTimeout(checkLocationHash,eventCancelTimer);
		}

		function enableInPageLinks(){
			/* istanbul ignore else */ // Not testable in phantonJS
			if(Array.prototype.forEach && document.querySelectorAll){
				log('Setting up location.hash handlers');
				bindAnchors();
				bindLocationHash();
				initCheck();
			} else {
				warn('In page linking not fully supported in this browser! (See README.md for IE8 workaround)');
			}
		}

		if(inPageLinks.enable){
			enableInPageLinks();
		} else {
			log('In page linking not enabled');
		}

		return {
			findTarget:findTarget
		};
	}

	function setupPublicMethods(){
		log('Enable public methods');

		win.parentIFrame = {

			autoResize: function autoResizeF(resize){
				if (true === resize && false === autoResize) {
					autoResize=true;
					startEventListeners();
					//sendSize('autoResize','Auto Resize enabled');
				} else if (false === resize && true === autoResize) {
					autoResize=false;
					stopEventListeners();
				}

				return autoResize;
			},

			close: function closeF(){
				sendMsg(0,0,'close');
				teardown();
			},

			getId: function getIdF(){
				return myID;
			},

			getPageInfo: function getPageInfoF(callback){
				if ('function' === typeof callback){
					pageInfoCallback = callback;
					sendMsg(0,0,'pageInfo');
				} else {
					pageInfoCallback = function(){};
					sendMsg(0,0,'pageInfoStop');
				}
			},

			moveToAnchor: function moveToAnchorF(hash){
				inPageLinks.findTarget(hash);
			},

			reset: function resetF(){
				resetIFrame('parentIFrame.reset');
			},

			scrollTo: function scrollToF(x,y){
				sendMsg(y,x,'scrollTo'); // X&Y reversed at sendMsg uses height/width
			},

			scrollToOffset: function scrollToF(x,y){
				sendMsg(y,x,'scrollToOffset'); // X&Y reversed at sendMsg uses height/width
			},

			sendMessage: function sendMessageF(msg,targetOrigin){
				sendMsg(0,0,'message',JSON.stringify(msg),targetOrigin);
			},

			setHeightCalculationMethod: function setHeightCalculationMethodF(heightCalculationMethod){
				heightCalcMode = heightCalculationMethod;
				checkHeightMode();
			},

			setWidthCalculationMethod: function setWidthCalculationMethodF(widthCalculationMethod){
				widthCalcMode = widthCalculationMethod;
				checkWidthMode();
			},

			setTargetOrigin: function setTargetOriginF(targetOrigin){
				log('Set targetOrigin: '+targetOrigin);
				targetOriginDefault = targetOrigin;
			},

			size: function sizeF(customHeight, customWidth){
				var valString = ''+(customHeight?customHeight:'')+(customWidth?','+customWidth:'');
				//lockTrigger();
				sendSize('size','parentIFrame.size('+valString+')', customHeight, customWidth);
			}
		};
	}

	function initInterval(){
		if ( 0 !== interval ){
			log('setInterval: '+interval+'ms');
			intervalTimer = setInterval(function(){
				sendSize('interval','setInterval: '+interval);
			},Math.abs(interval));
		}
	}

	/* istanbul ignore next */  //Not testable in PhantomJS
	function setupBodyMutationObserver(){
		function addImageLoadListners(mutation) {
			function addImageLoadListener(element){
				if (false === element.complete) {
					log('Attach listeners to ' + element.src);
					element.addEventListener('load', imageLoaded, false);
					element.addEventListener('error', imageError, false);
					elements.push(element);
				}
			}

			if (mutation.type === 'attributes' && mutation.attributeName === 'src'){
				addImageLoadListener(mutation.target);
			} else if (mutation.type === 'childList'){
				Array.prototype.forEach.call(
					mutation.target.querySelectorAll('img'),
					addImageLoadListener
				);
			}
		}

		function removeFromArray(element){
			elements.splice(elements.indexOf(element),1);
		}

		function removeImageLoadListener(element){
			log('Remove listeners from ' + element.src);
			element.removeEventListener('load', imageLoaded, false);
			element.removeEventListener('error', imageError, false);
			removeFromArray(element);
		}

		function imageEventTriggered(event,type,typeDesc){
			removeImageLoadListener(event.target);
			sendSize(type, typeDesc + ': ' + event.target.src, undefined, undefined);
		}

		function imageLoaded(event) {
			imageEventTriggered(event,'imageLoad','Image loaded');
		}

		function imageError(event) {
			imageEventTriggered(event,'imageLoadFailed','Image load failed');
		}

		function mutationObserved(mutations) {
			sendSize('mutationObserver','mutationObserver: ' + mutations[0].target + ' ' + mutations[0].type);

			//Deal with WebKit asyncing image loading when tags are injected into the page
			mutations.forEach(addImageLoadListners);
		}

		function createMutationObserver(){
			var
				target = document.querySelector('body'),

				config = {
					attributes            : true,
					attributeOldValue     : false,
					characterData         : true,
					characterDataOldValue : false,
					childList             : true,
					subtree               : true
				};

			observer = new MutationObserver(mutationObserved);

			log('Create body MutationObserver');
			observer.observe(target, config);

			return observer;
		}

		var
			elements         = [],
			MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
			observer         = createMutationObserver();

		return {
			disconnect: function (){
				if ('disconnect' in observer){
					log('Disconnect body MutationObserver');
					observer.disconnect();
					elements.forEach(removeImageLoadListener);
				}
			}
		};
	}

	function setupMutationObserver(){
		var	forceIntervalTimer = 0 > interval;

		/* istanbul ignore if */ // Not testable in PhantomJS
		if (window.MutationObserver || window.WebKitMutationObserver){
			if (forceIntervalTimer) {
				initInterval();
			} else {
				bodyObserver = setupBodyMutationObserver();
			}
		} else {
			log('MutationObserver not supported in this browser!');
			initInterval();
		}
	}


	// document.documentElement.offsetHeight is not reliable, so
	// we have to jump through hoops to get a better value.
	function getComputedStyle(prop,el) {
		/* istanbul ignore next */  //Not testable in PhantomJS
		function convertUnitsToPxForIE8(value) {
			var PIXEL = /^\d+(px)?$/i;

			if (PIXEL.test(value)) {
				return parseInt(value,base);
			}

			var
				style = el.style.left,
				runtimeStyle = el.runtimeStyle.left;

			el.runtimeStyle.left = el.currentStyle.left;
			el.style.left = value || 0;
			value = el.style.pixelLeft;
			el.style.left = style;
			el.runtimeStyle.left = runtimeStyle;

			return value;
		}

		var retVal = 0;
		el =  el || document.body;

		/* istanbul ignore else */ // Not testable in phantonJS
		if (('defaultView' in document) && ('getComputedStyle' in document.defaultView)) {
			retVal = document.defaultView.getComputedStyle(el, null);
			retVal = (null !== retVal) ? retVal[prop] : 0;
		} else {//IE8
			retVal =  convertUnitsToPxForIE8(el.currentStyle[prop]);
		}

		return parseInt(retVal,base);
	}

	function chkEventThottle(timer){
		if(timer > throttledTimer/2){
			throttledTimer = 2*timer;
			log('Event throttle increased to ' + throttledTimer + 'ms');
		}
	}

	//Idea from https://github.com/guardian/iframe-messenger
	function getMaxElement(side,elements) {
		var
			elementsLength = elements.length,
			elVal          = 0,
			maxVal         = 0,
			Side           = capitalizeFirstLetter(side),
			timer          = getNow();

		for (var i = 0; i < elementsLength; i++) {
			elVal = elements[i].getBoundingClientRect()[side] + getComputedStyle('margin'+Side,elements[i]);
			if (elVal > maxVal) {
				maxVal = elVal;
			}
		}

		timer = getNow() - timer;

		log('Parsed '+elementsLength+' HTML elements');
		log('Element position calculated in ' + timer + 'ms');

		chkEventThottle(timer);

		return maxVal;
	}

	function getAllMeasurements(dimention){
		return [
			dimention.bodyOffset(),
			dimention.bodyScroll(),
			dimention.documentElementOffset(),
			dimention.documentElementScroll()
		];
	}

	function getTaggedElements(side,tag){
		function noTaggedElementsFound(){
			warn('No tagged elements ('+tag+') found on page');
			return document.querySelectorAll('body *');
		}

		var elements = document.querySelectorAll('['+tag+']');

		if (0 === elements.length) noTaggedElementsFound();

		return getMaxElement(side,elements);
	}

	function getAllElements(){
		return document.querySelectorAll('body *');
	}

	var
		getHeight = {
			bodyOffset: function getBodyOffsetHeight(){
				return  document.body.offsetHeight + getComputedStyle('marginTop') + getComputedStyle('marginBottom');
			},

			offset: function(){
				return getHeight.bodyOffset(); //Backwards compatability
			},

			bodyScroll: function getBodyScrollHeight(){
				return document.body.scrollHeight;
			},

			custom: function getCustomWidth(){
				return customCalcMethods.height();
			},

			documentElementOffset: function getDEOffsetHeight(){
				return document.documentElement.offsetHeight;
			},

			documentElementScroll: function getDEScrollHeight(){
				return document.documentElement.scrollHeight;
			},

			max: function getMaxHeight(){
				return Math.max.apply(null,getAllMeasurements(getHeight));
			},

			min: function getMinHeight(){
				return Math.min.apply(null,getAllMeasurements(getHeight));
			},

			grow: function growHeight(){
				return getHeight.max(); //Run max without the forced downsizing
			},

			lowestElement: function getBestHeight(){
				return Math.max(getHeight.bodyOffset(), getMaxElement('bottom',getAllElements()));
			},

			taggedElement: function getTaggedElementsHeight(){
				return getTaggedElements('bottom','data-iframe-height');
			}
		},

		getWidth = {
			bodyScroll: function getBodyScrollWidth(){
				return document.body.scrollWidth;
			},

			bodyOffset: function getBodyOffsetWidth(){
				return document.body.offsetWidth;
			},

			custom: function getCustomWidth(){
				return customCalcMethods.width();
			},

			documentElementScroll: function getDEScrollWidth(){
				return document.documentElement.scrollWidth;
			},

			documentElementOffset: function getDEOffsetWidth(){
				return document.documentElement.offsetWidth;
			},

			scroll: function getMaxWidth(){
				return Math.max(getWidth.bodyScroll(), getWidth.documentElementScroll());
			},

			max: function getMaxWidth(){
				return Math.max.apply(null,getAllMeasurements(getWidth));
			},

			min: function getMinWidth(){
				return Math.min.apply(null,getAllMeasurements(getWidth));
			},

			rightMostElement: function rightMostElement(){
				return getMaxElement('right', getAllElements());
			},

			taggedElement: function getTaggedElementsWidth(){
				return getTaggedElements('right', 'data-iframe-width');
			}
		};


	function sizeIFrame(triggerEvent, triggerEventDesc, customHeight, customWidth){

		function resizeIFrame(){
			height = currentHeight;
			width  = currentWidth;

			sendMsg(height,width,triggerEvent);
		}

		function isSizeChangeDetected(){
			function checkTolarance(a,b){
				var retVal = Math.abs(a-b) <= tolerance;
				return !retVal;
			}

			currentHeight = (undefined !== customHeight)  ? customHeight : getHeight[heightCalcMode]();
			currentWidth  = (undefined !== customWidth )  ? customWidth  : getWidth[widthCalcMode]();

			return	checkTolarance(height,currentHeight) || (calculateWidth && checkTolarance(width,currentWidth));
		}

		function isForceResizableEvent(){
			return !(triggerEvent in {'init':1,'interval':1,'size':1});
		}

		function isForceResizableCalcMode(){
			return (heightCalcMode in resetRequiredMethods) || (calculateWidth && widthCalcMode in resetRequiredMethods);
		}

		function logIgnored(){
			log('No change in size detected');
		}

		function checkDownSizing(){
			if (isForceResizableEvent() && isForceResizableCalcMode()){
				resetIFrame(triggerEventDesc);
			} else if (!(triggerEvent in {'interval':1})){
				logIgnored();
			}
		}

		var	currentHeight,currentWidth;

		if (isSizeChangeDetected() || 'init' === triggerEvent){
			lockTrigger();
			resizeIFrame();
		} else {
			checkDownSizing();
		}
	}

	var sizeIFrameThrottled = throttle(sizeIFrame);

	function sendSize(triggerEvent, triggerEventDesc, customHeight, customWidth){
		function recordTrigger(){
			if (!(triggerEvent in {'reset':1,'resetPage':1,'init':1})){
				log( 'Trigger event: ' + triggerEventDesc );
			}
		}

		function isDoubleFiredEvent(){
			return  triggerLocked && (triggerEvent in doubleEventList);
		}

		if (!isDoubleFiredEvent()){
			recordTrigger();
			sizeIFrameThrottled(triggerEvent, triggerEventDesc, customHeight, customWidth);
		} else {
			log('Trigger event cancelled: '+triggerEvent);
		}
	}

	function lockTrigger(){
		if (!triggerLocked){
			triggerLocked = true;
			log('Trigger event lock on');
		}
		clearTimeout(triggerLockedTimer);
		triggerLockedTimer = setTimeout(function(){
			triggerLocked = false;
			log('Trigger event lock off');
			log('--');
		},eventCancelTimer);
	}

	function triggerReset(triggerEvent){
		height = getHeight[heightCalcMode]();
		width  = getWidth[widthCalcMode]();

		sendMsg(height,width,triggerEvent);
	}

	function resetIFrame(triggerEventDesc){
		var hcm = heightCalcMode;
		heightCalcMode = heightCalcModeDefault;

		log('Reset trigger event: ' + triggerEventDesc);
		lockTrigger();
		triggerReset('reset');

		heightCalcMode = hcm;
	}

	function sendMsg(height,width,triggerEvent,msg,targetOrigin){
		function setTargetOrigin(){
			if (undefined === targetOrigin){
				targetOrigin = targetOriginDefault;
			} else {
				log('Message targetOrigin: '+targetOrigin);
			}
		}

		function sendToParent(){
			var
				size  = height + ':' + width,
				message = myID + ':' +  size + ':' + triggerEvent + (undefined !== msg ? ':' + msg : '');

			log('Sending message to host page (' + message + ')');
			target.postMessage( msgID + message, targetOrigin);
		}

		if(true === sendPermit){
			setTargetOrigin();
			sendToParent();
		}
	}

	function receiver(event) {
		var processRequestFromParent = {
			init: function initFromParent(){
				function fireInit(){
					initMsg = event.data;
					target  = event.source;

					init();
					firstRun = false;
					setTimeout(function(){ initLock = false;},eventCancelTimer);
				}

				if (document.body){
					fireInit();
				} else {
					log('Waiting for page ready');
					addEventListener(window,'readystatechange',processRequestFromParent.initFromParent);
				}
			},

			reset: function resetFromParent(){
				if (!initLock){
					log('Page size reset by host page');
					triggerReset('resetPage');
				} else {
					log('Page reset ignored by init');
				}
			},

			resize: function resizeFromParent(){
				sendSize('resizeParent','Parent window requested size check');
			},

			moveToAnchor: function moveToAnchorF(){
				inPageLinks.findTarget(getData());
			},
			inPageLink: function inPageLinkF() {this.moveToAnchor();}, //Backward compatability

			pageInfo: function pageInfoFromParent(){
				var msgBody = getData();
				log('PageInfoFromParent called from parent: ' + msgBody );
				pageInfoCallback(JSON.parse(msgBody));
				log(' --');
			},

			message: function messageFromParent(){
				var msgBody = getData();

				log('MessageCallback called from parent: ' + msgBody );
				messageCallback(JSON.parse(msgBody));
				log(' --');
			}
		};

		function isMessageForUs(){
			return msgID === (''+event.data).substr(0,msgIdLen); //''+ Protects against non-string messages
		}

		function getMessageType(){
			return event.data.split(']')[1].split(':')[0];
		}

		function getData(){
			return event.data.substr(event.data.indexOf(':')+1);
		}

		function isMiddleTier(){
			return !(typeof module !== 'undefined' && module.exports) && ('iFrameResize' in window);
		}

		function isInitMsg(){
			//Test if this message is from a child below us. This is an ugly test, however, updating
			//the message format would break backwards compatibity.
			return event.data.split(':')[2] in {'true':1,'false':1};
		}

		function callFromParent(){
			var messageType = getMessageType();

			if (messageType in processRequestFromParent){
				processRequestFromParent[messageType]();
			} else if (!isMiddleTier() && !isInitMsg()){
				warn('Unexpected message ('+event.data+')');
			}
		}

		function processMessage(){
			if (false === firstRun) {
				callFromParent();
			} else if (isInitMsg()) {
				processRequestFromParent.init();
			} else {
				log('Ignored message of type "' + getMessageType() + '". Received before initialization.');
			}
		}

		if (isMessageForUs()){
			processMessage();
		}
	}

	//Normally the parent kicks things off when it detects the iFrame has loaded.
	//If this script is async-loaded, then tell parent page to retry init.
	function chkLateLoaded(){
		if('loading' !== document.readyState){
			window.parent.postMessage('[iFrameResizerChild]Ready','*');
		}
	}

	addEventListener(window, 'message', receiver);
	chkLateLoaded();

	

})();

if (window.location.href.indexOf(".ug.html") > -1) {
    $(window).load(function() {
        var ugLinks = [];
        $('a[target^="_self"]').removeAttr('target');
        $('a:not([target])[href^="http:"]').attr('target', '_blank');
        $('a:not([target])[href^="https:"]').attr('target', '_blank');
        $('a:not([target])[href^="//"]').attr('target', '_blank');
        var ugLinks = [];
        $('a:not([target]):not([href^="//"]):not([href^="http:"]):not([href^="https:"]):not([href^="#"])[href*=".html"]').each( function(i, link) {
            ugLinks.push(link);
        });
        try {
            for (var i=0; i<ugLinks.length; i++) {
                $(ugLinks[i]).attr('href', $(ugLinks[i]).attr('href').replace(/\.html/, '.ug.html'));
                ugLinks[i].addEventListener('click', function (e) {
                   if (e.target.pathname) {
                       e.preventDefault();
                        var msg = {};
                        if (!e.target.href.includes('#')) {
                            msg = JSON.stringify( {'event':"iframeLinkClicked",
                                                       'href': e.target.pathname,
                                                       'title': e.target.innerHTML} );
                        } else {
                            var link = e.target.pathname;
                            link += '#';
                            link += e.target.href.split('#')[1];
                            msg = JSON.stringify( {'event':"iframeLinkClicked",
                                                       'href': link,
                                                       'title': e.target.innerHTML} );
                        }
                        window.parent.postMessage(msg, window.parent.location);
                   }
                })
            }
        } catch (err) {
            if (DEBUG) console.log("[ERROR] " + err.message);
        }

        var relatedLinks = [];
        $('a[data-related-link="true"]').each( function (i, link) {
            relatedLinks.push(link);
        });
        try {
            for (var i=0; i<relatedLinks.length; i++) {
                relatedLinks[i].addEventListener('click', function (e) {
                    var msg = JSON.stringify(  {'event': "relatedLinkClicked",
                                                'href': e.target.pathname,
                                                'title': e.target.innerHTML,
                                                'target': e.target.target }  );
                    window.parent.postMessage(msg, window.parent.location);
                });
            }
        } catch (err) {
            if (DEBUG) console.log("[ERROR] " + err.message);
        }


        var msg = JSON.stringify( {'event':"iframeIsLoaded", 'href': document.location.pathname, 'title': $('meta[name=title]').attr("content")} );
        window.parent.postMessage(msg, window.parent.location);
    });
}
