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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Error parsing C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-plugin-transform-strict-mode\\package.json: Unexpected end of JSON input (While processing preset: \"C:\\\\Users\\\\090907\\\\Documents\\\\work\\\\basic-cms\\\\node_modules\\\\babel-preset-env\\\\lib\\\\index.js\")\n    at JSON.parse (<anonymous>)\n    at readPackage (module.js:105:52)\n    at tryPackage (module.js:115:13)\n    at Function.Module._findPath (module.js:197:20)\n    at Function.Module._resolveFilename (module.js:483:25)\n    at Function.Module._load (module.js:437:25)\n    at Module.require (module.js:513:17)\n    at require (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\v8-compile-cache\\v8-compile-cache.js:159:20)\n    at Object.<anonymous> (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-plugin-transform-es2015-modules-commonjs\\lib\\index.js:583:39)\n    at Module._compile (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\v8-compile-cache\\v8-compile-cache.js:178:30)\n    at Object.Module._extensions..js (module.js:580:10)\n    at Module.load (module.js:503:32)\n    at tryModuleLoad (module.js:466:12)\n    at Function.Module._load (module.js:458:3)\n    at Module.require (module.js:513:17)\n    at require (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\v8-compile-cache\\v8-compile-cache.js:159:20)\n    at buildPreset (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-preset-env\\lib\\index.js:183:33)\n    at C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:317:46\n    at Array.map (native)\n    at OptionManager.resolvePresets (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:275:20)\n    at OptionManager.mergePresets (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:264:10)\n    at OptionManager.mergeOptions (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:249:14)\n    at OptionManager.init (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:368:12)\n    at File.initOptions (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-core\\lib\\transformation\\file\\index.js:212:65)\n    at new File (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-core\\lib\\transformation\\file\\index.js:135:24)\n    at Pipeline.transform (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-core\\lib\\transformation\\pipeline.js:46:16)\n    at transpile (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-loader\\lib\\index.js:50:20)\n    at Object.module.exports (C:\\Users\\090907\\Documents\\work\\basic-cms\\node_modules\\babel-loader\\lib\\index.js:173:20)");

/***/ })
/******/ ]);
//# sourceMappingURL=App.bundle.js.map