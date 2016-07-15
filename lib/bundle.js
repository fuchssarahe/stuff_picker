/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var StuffPicker = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./stuff_picker.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	document.addEventListener('DOMContentLoaded', function () {
	    var picker = new StuffPicker();
	    picker.firstRender();
	});
	
	function prompt(window, pref, message, _callback) {
	    var branch = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	
	    if (branch.getPrefType(pref) === branch.PREF_STRING) {
	        switch (branch.getCharPref(pref)) {
	            case "always":
	                return _callback(true);
	            case "never":
	                return _callback(false);
	        }
	    }
	
	    var done = false;
	
	    function remember(value, result) {
	        return function () {
	            done = true;
	            branch.setCharPref(pref, value);
	            _callback(result);
	        };
	    }
	
	    var self = window.PopupNotifications.show(window.gBrowser.selectedBrowser, "geolocation", message, "geo-notification-icon", {
	        label: "Share Location",
	        accessKey: "S",
	        callback: function callback(notification) {
	            done = true;
	            _callback(true);
	        }
	    }, [{
	        label: "Always Share",
	        accessKey: "A",
	        callback: remember("always", true)
	    }, {
	        label: "Never Share",
	        accessKey: "N",
	        callback: remember("never", false)
	    }], {
	        eventCallback: function eventCallback(event) {
	            if (event === "dismissed") {
	                if (!done) _callback(false);
	                done = true;
	                window.PopupNotifications.remove(self);
	            }
	        },
	        persistWhileVisible: true
	    });
	}
	// prompt(window,
	//        "extensions.foo-addon.allowGeolocation",
	//        "Foo Add-on wants to know your location.",
	//        function callback(allowed) { alert(allowed); });
	
	// A picker has filters and a spinner.
	// The spinner is re-created each time the filters change.
	// The spinner is thrown into a re-render loop each time the spinner is clicked.
	
	// How are results generated and displayed?
	// spinner will generate a color, and send that back to the picker
	// the picker will update the results section to display a random suggestion on the selected color background

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map