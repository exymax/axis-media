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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(3);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(23);

var Particles = __webpack_require__(25);


var delayClassToggle = function delayClassToggle(selector, delay) {
    var elementCollection = document.querySelectorAll(selector);
    setTimeout(function () {
        [].forEach.call(elementCollection, function (element) {
            element.classList.add('active');
        });
    }, delay);
};

document.addEventListener('DOMContentLoaded', function () {
    delayClassToggle('#border-animation-svg', 0);
    delayClassToggle('.border-line', 100);
    delayClassToggle('#name-container', 50);
    delayClassToggle('#name', 400);
    delayClassToggle('#directions', 500);
    delayClassToggle('#header', 300);

    // Particles.init({
    //     selector: '#particles',
    //     "particles": {
    //         "number": {
    //             "value": 355,
    //             "density": {
    //                 "enable": true,
    //                 "value_area": 789.1476416322727
    //             }
    //         },
    //         "color": {
    //             "value": "#ffffff"
    //         },
    //         "shape": {
    //             "type": "circle",
    //             "stroke": {
    //                 "width": 0,
    //                 "color": "#000000"
    //             },
    //             "polygon": {
    //                 "nb_sides": 5
    //             }
    //         },
    //         "opacity": {
    //             "value": 0.48927153781200905,
    //             "random": false,
    //             "anim": {
    //                 "enable": true,
    //                 "speed": 0.2,
    //                 "opacity_min": 0,
    //                 "sync": false
    //             }
    //         },
    //         "size": {
    //             "value": 2,
    //             "random": true,
    //             "anim": {
    //                 "enable": true,
    //                 "speed": 2,
    //                 "size_min": 0,
    //                 "sync": false
    //             }
    //         },
    //         "line_linked": {
    //             "enable": false,
    //             "distance": 150,
    //             "color": "#ffffff",
    //             "opacity": 0.4,
    //             "width": 1
    //         },
    //         "move": {
    //             "enable": true,
    //             "speed": 0.2,
    //             "direction": "none",
    //             "random": true,
    //             "straight": false,
    //             "out_mode": "out",
    //             "bounce": false,
    //             "attract": {
    //                 "enable": false,
    //                 "rotateX": 600,
    //                 "rotateY": 1200
    //             }
    //         }
    //     },
    //     "interactivity": {
    //         "detect_on": "canvas",
    //         "events": {
    //             "onhover": {
    //                 "enable": true,
    //                 "mode": "bubble"
    //             },
    //             "onclick": {
    //                 "enable": true,
    //                 "mode": "push"
    //             },
    //             "resize": true
    //         },
    //         "modes": {
    //             "grab": {
    //                 "distance": 400,
    //                 "line_linked": {
    //                     "opacity": 1
    //                 }
    //             },
    //             "bubble": {
    //                 "distance": 83.91608391608392,
    //                 "size": 1,
    //                 "duration": 3,
    //                 "opacity": 1,
    //                 "speed": 3
    //             },
    //             "repulse": {
    //                 "distance": 200,
    //                 "duration": 0.4
    //             },
    //             "push": {
    //                 "particles_nb": 4
    //             },
    //             "remove": {
    //                 "particles_nb": 2
    //             }
    //         }
    //     },
    //     "retina_detect": true
    // });
});

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/less-loader/dist/cjs.js!./new.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/less-loader/dist/cjs.js!./new.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body {\n  padding: 0;\n  margin: 0;\n  background-color: #f5f5f5;\n}\n.centered-absolute {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n#container {\n  font-family: 'Roboto', sans-serif;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 100%;\n  height: 100%;\n}\n#container #header-container {\n  position: absolute;\n  padding: 0 40px;\n  left: 0;\n  top: 0;\n  width: calc(100% - 80px);\n  height: 80px;\n  overflow: hidden;\n}\n#container #header-container #header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  position: relative;\n  width: 100%;\n  height: 80px;\n  transform: translateY(90px);\n}\n#container #header-container #header.active {\n  transition: all 0.8s 0.8s;\n  transform: translateY(0);\n}\n#container #header-container #header #hamburger-menu {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n#container #header-container #header #hamburger-menu #menu-toggle {\n  cursor: pointer;\n  width: 20px;\n  height: 30px;\n}\n#container #header-container #header #hamburger-menu #company-name {\n  margin-left: 20px;\n  color: #2c3e50;\n  font-weight: bold;\n}\n#container #header-container #header #switch-language {\n  overflow: hidden;\n  display: flex;\n  flex-direction: row;\n  background-color: #fff;\n  border-radius: 40px;\n}\n#container #header-container #header #switch-language .language {\n  cursor: pointer;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  color: #2c3e50;\n  padding: 5px 12px;\n  transition: all 0.2s 0.2s;\n}\n#container #header-container #header #switch-language .language:hover {\n  background-color: #e6e6e6;\n}\n#container #header-container #header #switch-language .language.ru .name {\n  margin-right: 5px;\n}\n#container #header-container #header #switch-language .language.en img {\n  margin-left: 5px;\n}\n#container #header-container #header #switch-language .language:first-child {\n  border-right: 1px solid #f5f5f5;\n}\n#container #header-container #header #switch-language .language img {\n  width: 35px;\n}\n#container #header-container #header #switch-language .language .name {\n  font-size: 13px;\n  margin-left: 5px;\n}\n#container #border-animation-svg {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 350px;\n  height: 90px;\n  transition: all 0.7s 0.7s;\n}\n#container #border-animation-svg.active {\n  top: 45%;\n}\n#container #border-animation-svg line.top {\n  transform: translate(-380px, 0);\n}\n#container #border-animation-svg line.left {\n  transform: translate(0, -120px);\n}\n#container #border-animation-svg line.bottom {\n  transform: translate(380px, 0);\n}\n#container #border-animation-svg line.right {\n  transform: translate(0, 120px);\n}\n#container #border-animation-svg line.top.active {\n  transform: translate(0, 0);\n}\n#container #border-animation-svg line.left.active {\n  transform: translate(0, 0);\n}\n#container #border-animation-svg line.bottom.active {\n  transform: translate(0, 0);\n}\n#container #border-animation-svg line.right.active {\n  transform: translate(0, 0);\n}\n#container #border-animation-svg line {\n  stroke: #2c3e50;\n  stroke-width: 3px;\n  opacity: 0;\n  transition: all 0.7s 0.7s;\n}\n#container #border-animation-svg line.active {\n  opacity: 1;\n}\n#container #name-container {\n  overflow: hidden;\n  width: auto;\n  height: 35px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: none;\n}\n#container #name-container.active {\n  transition: all 0.7s 0.7s;\n  display: block;\n  top: 45%;\n}\n#container #name-container #name {\n  transition: all 0.5s 0.5s;\n  transform: translateY(50px);\n  color: #2c3e50;\n  font-size: 30px;\n}\n#container #name-container #name.active {\n  transform: translateY(-2px);\n}\n#container #name-container #name img {\n  position: relative;\n  transform: translateY(5px);\n  width: 28px;\n  height: 28px;\n}\n#container #directions-container {\n  position: absolute;\n  bottom: 5px;\n  left: 50%;\n  transform: translateX(-50%);\n  height: 100px;\n  overflow: hidden;\n}\n#container #directions-container #directions {\n  position: relative;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  transform: translateY(120px);\n}\n#container #directions-container #directions.active {\n  transition: all 0.8s 0.8s;\n  transform: translateY(0);\n}\n#container #directions-container #directions .direction {\n  cursor: pointer;\n  margin: 0 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-width: 100px;\n  text-align: center;\n  font-size: 15px;\n  color: #2c3e50;\n}\n#container #directions-container #directions .direction img {\n  width: 36px;\n  height: 36px;\n}\n#container #directions-container #directions .direction .name {\n  margin-top: 8px;\n}\n#container #particles {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: transparent;\n  z-index: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * A lightweight, dependency-free and responsive javascript plugin for particle backgrounds.
 * 
 * @author Marc Bruederlin <hello@marcbruederlin.com>
 * @version 2.0.2
 * @license MIT
 * @see https://github.com/marcbruederlin/particles.js
 */
var Particles=function(t,e){"use strict";var o,i={};return o=function(){function t(){var t=this;t.defaults={responsive:null,selector:null,maxParticles:100,sizeVariations:3,speed:.5,color:"#000000",minDistance:120,connectParticles:!1},t.element=null,t.context=null,t.ratio=null,t.breakpoints=[],t.activeBreakpoint=null,t.breakpointSettings=[],t.originalSettings=null,t.storage=[]}return t}(),o.prototype.init=function(t){var e=this;e.options=e._extend(e.defaults,t),e.options.color=t.color?e._hex2rgb(t.color):e._hex2rgb(e.defaults.color),e.originalSettings=JSON.parse(JSON.stringify(e.options)),e._initializeCanvas(),e._initializeEvents(),e._registerBreakpoints(),e._checkResponsive(),e._initializeStorage(),e._animate()},o.prototype._initializeCanvas=function(){var o,i,n=this;return n.options.selector?(n.element=e.querySelector(n.options.selector),n.context=n.element.getContext("2d"),o=t.devicePixelRatio||1,i=n.context.webkitBackingStorePixelRatio||n.context.mozBackingStorePixelRatio||n.context.msBackingStorePixelRatio||n.context.oBackingStorePixelRatio||n.context.backingStorePixelRatio||1,n.ratio=o/i,n.element.width=t.innerWidth*n.ratio,n.element.height=t.innerHeight*n.ratio,n.element.style.width="100%",n.element.style.height="100%",void n.context.scale(n.ratio,n.ratio)):(console.warn("particles.js: No selector specified! Check https://github.com/marcbruederlin/particles.js#options"),!1)},o.prototype._initializeEvents=function(){var e=this;t.addEventListener("resize",e._resize.bind(e),!1)},o.prototype._initializeStorage=function(){var t=this;t.storage=[];for(var e=t.options.maxParticles;e--;)t.storage.push(new i(t.context,t.options))},o.prototype._registerBreakpoints=function(){var t,e,o,i=this,n=i.options.responsive||null;if("object"==typeof n&&null!==n&&n.length){for(t in n)if(o=i.breakpoints.length-1,e=n[t].breakpoint,n.hasOwnProperty(t)){for(n[t].options.color&&(n[t].options.color=i._hex2rgb(n[t].options.color));o>=0;)i.breakpoints[o]&&i.breakpoints[o]===e&&i.breakpoints.splice(o,1),o--;i.breakpoints.push(e),i.breakpointSettings[e]=n[t].options}i.breakpoints.sort(function(t,e){return e-t})}},o.prototype._checkResponsive=function(){var e,o=this,i=!1,n=t.innerWidth;if(o.options.responsive&&o.options.responsive.length&&null!==o.options.responsive){i=null;for(e in o.breakpoints)o.breakpoints.hasOwnProperty(e)&&n<=o.breakpoints[e]&&(i=o.breakpoints[e]);null!==i?(o.activeBreakpoint=i,o.options=o._extend(o.options,o.breakpointSettings[i])):null!==o.activeBreakpoint&&(o.activeBreakpoint=null,i=null,o.options=o._extend(o.options,o.originalSettings))}},o.prototype._refresh=function(){var t=this;t._initializeStorage(),t._update()},o.prototype._resize=function(){var e=this;e.element.width=t.innerWidth*e.ratio,e.element.height=t.innerHeight*e.ratio,e.context.scale(e.ratio,e.ratio),clearTimeout(e.windowDelay),e.windowDelay=t.setTimeout(function(){e._checkResponsive(),e._refresh()},50)},o.prototype._animate=function(){var e=this;e._draw(),t.requestAnimFrame(e._animate.bind(e))},o.prototype._draw=function(){var t=this;t.context.clearRect(0,0,t.element.width,t.element.height);for(var e=t.storage.length;e--;){var o=t.storage[e];o._draw()}t._update()},o.prototype._update=function(){for(var e=this,o=e.storage.length;o--;){var i=e.storage[o];if(i.x+=i.vx,i.y+=i.vy,i.x+i.radius>t.innerWidth?i.x=i.radius:i.x-i.radius<0&&(i.x=t.innerWidth-i.radius),i.y+i.radius>t.innerHeight?i.y=i.radius:i.y-i.radius<0&&(i.y=t.innerHeight-i.radius),e.options.connectParticles)for(var n=o+1;n<e.storage.length;n++){var r=e.storage[n];e._calculateDistance(i,r)}}},o.prototype._calculateDistance=function(t,e){var o,i=this,n=t.x-e.x,r=t.y-e.y;o=Math.sqrt(n*n+r*r),o<=i.options.minDistance&&(i.context.beginPath(),i.context.strokeStyle="rgba("+i.options.color.r+", "+i.options.color.g+", "+i.options.color.b+", "+(1.2-o/i.options.minDistance)+")",i.context.moveTo(t.x,t.y),i.context.lineTo(e.x,e.y),i.context.stroke(),i.context.closePath())},o.prototype._extend=function(t,e){return Object.keys(e).forEach(function(o){t[o]=e[o]}),t},o.prototype._hex2rgb=function(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null},i=function(e,o){var i=this;i.context=e,i.options=o,i.x=Math.random()*t.innerWidth,i.y=Math.random()*t.innerHeight,i.vx=Math.random()*i.options.speed*2-i.options.speed,i.vy=Math.random()*i.options.speed*2-i.options.speed,i.radius=Math.random()*Math.random()*i.options.sizeVariations,i._draw()},i.prototype._draw=function(){var t=this;t.context.fillStyle="rgb("+t.options.color.r+", "+t.options.color.g+", "+t.options.color.b+")",t.context.beginPath(),t.context.arc(t.x,t.y,t.radius,0,2*Math.PI,!1),t.context.fill()},t.requestAnimFrame=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(e){t.setTimeout(e,1e3/60)}}(),new o}(window,document);!function(){"use strict"; true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return Particles}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof module&&module.exports?module.exports=Particles:window.Particles=Particles}();

/***/ }),

/***/ 3:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })

/******/ });