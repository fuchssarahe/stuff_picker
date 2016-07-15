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
	
	var StuffPicker = __webpack_require__(1);
	
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Activity = __webpack_require__(2),
	    StuffConstants = __webpack_require__(3),
	    Spinner = __webpack_require__(4);
	
	var StuffPicker = function StuffPicker() {
	  this.activities = StuffConstants.potentialActivities.map(function (activity) {
	    return new Activity(activity);
	  });
	  this.nothingToDo = false;
	  this.options = {};
	  this.result = 'Click the spinner to decide what to do tonight! Click the mood buttons to filter your options.';
	  this.color = 'white';
	  this.size = 600;
	  if (window.innerWidth < 200) {
	    this.size = 100;
	  } else if (window.innerWidth < 350) {
	    this.size = 200;
	  } else if (window.innerWidth < 600) {
	    this.size = 350;
	  }
	};
	
	StuffPicker.prototype.stuffToDo = function () {
	  var _this = this;
	
	  var stuffToDo = [];
	  this.activities.forEach(function (activity) {
	    if (activity.meetsUserCriteria(_this.options)) {
	      stuffToDo.push(activity.name);
	    }
	  });
	
	  if (stuffToDo[0] === undefined) {
	    this.nothingToDo = true;
	  } else {
	    this.nothingToDo = false;
	  }
	  return stuffToDo;
	};
	
	StuffPicker.prototype.firstRender = function () {
	  var _this2 = this;
	
	  var wrapper = document.createElement('article');
	  wrapper.className = 'wrapper';
	  wrapper.id = 'wrapper';
	
	  // // create header
	  //   const header = document.createElement('header');
	  //     header.className = 'header';
	  //     header.innerHTML = "What are you in the mood to do tonight? Click the buttons below to set filters.";
	  //     wrapper.appendChild(header);
	  //
	
	  // create elements for filters
	  var filters = document.createElement('aside');
	  filters.className = 'filters';
	
	  StuffConstants.activityAttributes.forEach(function (property) {
	    var label = document.createElement('label');
	    label.innerHTML = property;
	    label.onclick = function () {
	      return _this2.updateFilters(property, label.className === 'checked' ? 0 : 1);
	    };
	    filters.appendChild(label);
	  });
	  wrapper.appendChild(filters);
	
	  var spinnerEl = document.createElement('section');
	  spinnerEl.className = 'spinner';
	  // create canvas
	  this.canvas = document.createElement('canvas');
	  this.canvas.width = '' + this.size;
	  this.canvas.height = '' + this.size;
	  this.canvas.className = 'spinner';
	  spinnerEl.appendChild(this.canvas);
	
	  // create spinner
	  var spinner = new Spinner(this.canvas, this);
	  spinner.render();
	  this.canvas.onclick = function (event) {
	    return spinner.processClick(event);
	  };
	
	  // render results
	  var resultsEl = document.createElement('div');
	  resultsEl.innerHTML = this.result;
	  resultsEl.className = 'results';
	  resultsEl.style = { background: this.color, color: 'black' };
	  spinnerEl.appendChild(resultsEl);
	
	  wrapper.appendChild(spinnerEl);
	  // insert into DOM
	  var root = document.getElementById('root');
	  if (root.firstChild) {
	    root.replaceChild(wrapper, root.firstChild);
	  } else {
	    root.appendChild(wrapper);
	  }
	};
	
	StuffPicker.prototype.renderFilters = function () {
	  var _this3 = this;
	
	  var wrapper = document.getElementById('wrapper');
	  var filters = document.createElement('aside');
	  filters.className = 'filters';
	
	  StuffConstants.activityAttributes.forEach(function (property) {
	    var label = document.createElement('label');
	    label.innerHTML = property;
	    if (_this3.options[property] === 1) {
	      label.className = 'checked';
	    }
	    label.onclick = function () {
	      return _this3.updateFilters(property, label.className === 'checked' ? 0 : 1);
	    };
	    filters.appendChild(label);
	  });
	  wrapper.replaceChild(filters, wrapper.firstChild);
	};
	
	StuffPicker.prototype.renderResults = function () {
	  var _this4 = this;
	
	  var spinnerEl = document.getElementsByClassName('spinner')[0];
	
	  // render results
	  var resultsEl = document.createElement('div');
	  resultsEl.innerHTML = this.result;
	  var classes = 'results';
	  if (!this.result.match('picky')) {
	    classes += ' results--filled';
	  }
	  resultsEl.className = classes;
	  resultsEl.style.background = this.color;
	  resultsEl.style.color = 'black';
	  resultsEl.onclick = function () {
	    resultsEl.innerHTML = 'Redirecting...';
	    resultsEl.style.background = 'lightgray';
	    redirectToGoogleSearch(_this4);
	  };
	
	  spinnerEl.replaceChild(resultsEl, spinnerEl.lastChild);
	};
	
	StuffPicker.prototype.updateFilters = function (property, value) {
	  this.options[property] = value;
	  this.renderFilters();
	};
	
	StuffPicker.prototype.updateResults = function (color) {
	  var newResult = this.random();
	  if (newResult === undefined) {
	    this.result = 'You\'re too picky! There isn\'t anything to do that meets your criteria!';
	    this.color = 'white';
	  } else {
	    this.result = this.random();
	    this.color = color;
	  }
	  this.renderResults();
	};
	
	StuffPicker.prototype.random = function () {
	  var stuff = this.stuffToDo();
	  var randomIdx = Math.round((stuff.length - 1) * Math.random());
	  return stuff[randomIdx];
	};
	
	function redirectToGoogleSearch(picker) {
	  if ('geolocation' in navigator) {
	    navigator.geolocation.getCurrentPosition(function (position) {
	      var geocoder = new google.maps.Geocoder();
	      var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
	        if (status == google.maps.GeocoderStatus.OK) {
	          var address = results[0].formatted_address;
	          window.location = 'http://google.com/?q=' + picker.result.split(' ').join('+') + '+near+' + address.split(' ').join('+');
	        } else {
	          window.location = 'http://google.com/?q=' + picker.result;
	        }
	      });
	    });
	  } else {
	    window.location = 'http://google.com/?q=' + picker.result;
	  }
	};
	
	module.exports = StuffPicker;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var Activity = function Activity(options) {
	  this.name = options.name;
	  this.social = options.social;
	  this.lazy = options.lazy;
	  this.food = options.food;
	  this.alcohol = options.alcohol;
	  this.loud = options.loud;
	  this.thinking = options.thinking;
	  this.free = options.free;
	  this.physical = options.physical;
	};
	
	Activity.prototype.meetsUserCriteria = function () {
	  var _this = this;
	
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var meetsCritera = true;
	
	  Object.keys(options).forEach(function (option) {
	    if (options[option] === 0) {
	      return;
	    }
	
	    if (_this[option] !== options[option] && _this[option] !== 0) {
	      meetsCritera = false;
	    }
	  });
	  return meetsCritera;
	};
	
	module.exports = Activity;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var Constants = {
	  activityAttributes: ['social', 'lazy', 'food', 'alcohol', 'loud', 'thinking', 'free', 'physical'],
	  potentialActivities: [{ name: 'Netflix night',
	    social: 0,
	    lazy: 1,
	    food: -1,
	    alcohol: 0,
	    loud: -1,
	    thinking: -1,
	    free: 1,
	    physical: -1
	  }, { name: 'Netflix night with takeout',
	    social: 0,
	    lazy: 1,
	    food: 1,
	    alcohol: 0,
	    loud: -1,
	    thinking: -1,
	    free: -1,
	    physical: -1
	  }, { name: 'go dancing',
	    social: 1,
	    lazy: -1,
	    food: 0,
	    alcohol: 1,
	    loud: 1,
	    physical: 1,
	    thinking: -1,
	    free: 0
	  }, { name: 'go bar hopping',
	    social: 1,
	    lazy: -1,
	    food: 0,
	    alcohol: 1,
	    loud: 1,
	    physical: 1,
	    thinking: -1,
	    free: -1
	  }, { name: 'play sports',
	    social: 1,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: 1,
	    physical: 1,
	    thinking: -1,
	    free: 1
	  }, { name: 'go to a local fair/festival',
	    social: 0,
	    lazy: -1,
	    food: 0,
	    alcohol: 0,
	    loud: 1,
	    physical: 0,
	    thinking: -1,
	    free: 0
	  }, { name: 'go to the museum',
	    social: 0,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: 0,
	    thinking: 1,
	    free: 0
	  }, { name: 'see a play/musical',
	    social: 0,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: 0,
	    free: -1
	  }, { name: 'see a movie in theatres',
	    social: 0,
	    lazy: 1,
	    food: 1,
	    alcohol: -1,
	    loud: 1,
	    physical: 0,
	    thinking: -1,
	    free: -1
	  }, { name: 'see a live stand-up comedian',
	    social: 0,
	    lazy: -1,
	    food: 0,
	    alcohol: 1,
	    loud: -1,
	    physical: -1,
	    thinking: -1,
	    free: -1
	  }, { name: 'walk in the park',
	    social: 0,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: 1,
	    thinking: -1,
	    free: 1
	  }, { name: 'go hiking',
	    social: 0,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: 1,
	    thinking: -1,
	    free: 1
	  }, { name: 'learn a language',
	    social: -1,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: 1,
	    free: 1
	  }, { name: 'play with your pet',
	    social: -1,
	    lazy: 0,
	    food: -1,
	    alcohol: -1,
	    loud: 1,
	    physical: 1,
	    thinking: -1,
	    free: 1
	  }, { name: 'eat out',
	    social: 0,
	    lazy: 0,
	    food: 1,
	    alcohol: 0,
	    loud: 0,
	    physical: 0,
	    thinking: -1,
	    free: -1
	  }, { name: 'go bowling',
	    social: 1,
	    lazy: -1,
	    food: 0,
	    alcohol: 0,
	    loud: 1,
	    physical: 1,
	    thinking: -1,
	    free: -1
	  }, { name: 'bake/cook',
	    social: -1,
	    lazy: -1,
	    food: 1,
	    alcohol: -1,
	    loud: 0,
	    physical: 1,
	    thinking: 0,
	    free: 1
	  }, { name: 'head to a farmer\'s market',
	    social: 0,
	    lazy: -1,
	    food: 1,
	    alcohol: -1,
	    loud: 0,
	    physical: 1,
	    thinking: -1,
	    free: -1
	  }, { name: 'build a website',
	    social: -1,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: 0,
	    physical: -1,
	    thinking: 1,
	    free: 1
	  }, { name: 'take a scenic drive',
	    social: 0,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: -1,
	    free: 1
	  }, { name: 'go to goodwill',
	    social: 0,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: 1,
	    thinking: -1,
	    free: 0
	  }, { name: 'go shopping',
	    social: 0,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: 1,
	    physical: 1,
	    thinking: -1,
	    free: 0
	  }, { name: 'get a massage',
	    social: 0,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: -1,
	    free: -1
	  }, { name: 'browse the internet',
	    social: 0,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: -1,
	    free: 1
	  }, { name: 'paint your nails',
	    social: -1,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: -1,
	    free: 1
	  }, { name: 'clean the bathroom',
	    social: -1,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: 1,
	    thinking: -1,
	    free: 1
	  }, { name: 'vacuum',
	    social: -1,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: 1,
	    thinking: -1,
	    free: 1
	  }, { name: 'knit',
	    social: -1,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: -1,
	    free: 1
	  }, { name: 'sew a blanket',
	    social: -1,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: -1,
	    free: 1
	  }, { name: 'scuplt with clay',
	    social: -1,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: -1,
	    free: 1
	  }, { name: 'play an instrument',
	    social: 0,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: 1,
	    physical: 1,
	    thinking: 1,
	    free: 1
	  }, { name: 'play frisbee',
	    social: 1,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: 1,
	    physical: 1,
	    thinking: -1,
	    free: 1
	  }, { name: 'set up a scavenger hunt',
	    social: 1,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: 1,
	    physical: 1,
	    thinking: 1,
	    free: 0
	  }, { name: 'marathon the harry potter movies',
	    social: 1,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: 1,
	    physical: -1,
	    thinking: -1,
	    free: 1
	  }, { name: 'play DnD',
	    social: 1,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: 1,
	    free: 1
	  }, { name: 'play videogames',
	    social: 0,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: 1,
	    free: 1
	  }, { name: 'order take-out',
	    social: 0,
	    lazy: 1,
	    food: 1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: -1,
	    free: -1
	  }, { name: 'stare at the ceiling',
	    social: 0,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: -1,
	    free: 1
	  }, { name: 'stalk people on facebook',
	    social: -1,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: -1,
	    free: 1
	  }, { name: 'design your ideal dwelling',
	    social: 0,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: 1,
	    free: 1
	  }, { name: 'buy and eat candy',
	    social: 0,
	    lazy: -1,
	    food: 1,
	    alcohol: -1,
	    loud: 0,
	    physical: -1,
	    thinking: -1,
	    free: -1
	  }, { name: 'go for a run',
	    social: 0,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: 0,
	    physical: 1,
	    thinking: -1,
	    free: 1
	  }, { name: 'hit the gym',
	    social: 0,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: 1,
	    physical: 1,
	    thinking: -1,
	    free: -1
	  }, { name: 'read a book',
	    social: 0,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: 1,
	    free: 1
	  }, { name: 'take a shower',
	    social: -1,
	    lazy: 1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: -1,
	    free: 1
	  }, { name: 'make a list of all the stuff you have to do',
	    social: -1,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: 1,
	    free: 1
	  }, { name: 'run errands',
	    social: -1,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: 1,
	    physical: 1,
	    thinking: 1,
	    free: -1
	  }, { name: 'design a roller coaster',
	    social: 0,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: -1,
	    thinking: 1,
	    free: 1
	  }, { name: 'go to a theme park',
	    social: 1,
	    lazy: -1,
	    food: 0,
	    alcohol: 0,
	    loud: 1,
	    physical: 1,
	    thinking: -1,
	    free: -1
	  }, { name: 'take photos',
	    social: 1,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: 0,
	    physical: 1,
	    thinking: 1,
	    free: 1
	  }, { name: 'learn how to make jam',
	    social: 0,
	    lazy: -1,
	    food: 1,
	    alcohol: -1,
	    loud: -1,
	    physical: 1,
	    thinking: 1,
	    free: -1
	  }, { name: 'have a picnic in the park',
	    social: 1,
	    lazy: 1,
	    food: 1,
	    alcohol: 0,
	    loud: -1,
	    physical: 1,
	    thinking: -1,
	    free: -1
	  }, { name: 'buy and drop off items for a food drive',
	    social: -1,
	    lazy: -1,
	    food: -1,
	    alcohol: -1,
	    loud: -1,
	    physical: 1,
	    thinking: -1,
	    free: -1
	  }, { name: 'invite a friend over and ask them to bring beer',
	    social: 1,
	    lazy: 1,
	    food: -1,
	    alcohol: 1,
	    loud: 0,
	    physical: -1,
	    thinking: -1,
	    free: 1
	  }]
	};
	
	module.exports = Constants;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var StuffConstants = __webpack_require__(3);
	
	var Spinner = function Spinner(canvas, picker) {
	  this.canvas = canvas;
	  this.picker = picker;
	  this.stuffToDo = picker.stuffToDo();
	  this.ctx = canvas.getContext('2d');
	  this.size = picker.size / 2;
	  this.colors = createRandomColors(30);
	  this.isSpinning = false;
	};
	
	Spinner.prototype.render = function () {
	  var _this = this;
	
	  var start = -39 / 180 * Math.PI;
	  this.ctx.fillStyle = 'white';
	  this.ctx.beginPath();
	  var pointerSize = this.size / 3.5;
	  this.ctx.moveTo(this.size * 2 - pointerSize, pointerSize);
	  this.ctx.lineTo(this.size * 2 - pointerSize, 0);
	  this.ctx.lineTo(this.size * 2, pointerSize);
	  this.ctx.closePath();
	  this.ctx.fill();
	
	  var angle = Math.PI * 2 / 30;
	
	  this.colors.forEach(function (name, idx) {
	    _this.ctx.fillStyle = _this.colors[idx];
	
	    _this.ctx.beginPath();
	    _this.ctx.moveTo(_this.size, _this.size);
	    _this.ctx.arc(_this.size, _this.size, _this.size, start, start + angle, false);
	    _this.ctx.lineTo(_this.size, _this.size);
	    _this.ctx.fill();
	
	    start += angle;
	  });
	};
	
	Spinner.prototype.processClick = function (event) {
	  if (this.isSpinning === false) {
	    if (Math.sqrt(Math.pow(event.offsetX - this.size, 2) + Math.pow(event.offsetY - this.size, 2)) < this.size) {
	      this.isSpinning = true;
	      this.spin();
	    }
	  }
	};
	
	Spinner.prototype.spin = function () {
	  var numRotations = Math.random() * 15 + 115;
	  var i = 0;
	  var self = this;
	
	  function setSpins() {
	    if (i < numRotations) {
	      setTimeout(function () {
	        self.colors.unshift(self.colors.pop());
	        self.render();
	        setSpins();
	      }, Math.pow(2.14, i / 20));
	    } else {
	      self.picker.updateResults(self.ctx.fillStyle);
	      self.isSpinning = false;
	    }
	    i++;
	  }
	  setSpins();
	};
	
	function createRandomColors(num) {
	  var colors = [];
	  for (var i = 0; i < num; i++) {
	    colors.push(randomColor());
	  }
	  return colors;
	};
	
	function randomColor() {
	  var r = 0,
	      g = 255 * Math.random() | 0,
	      b = 255 * Math.random() | 0;
	  return 'rgb(' + r + ',' + g + ',' + b + ')';
	};
	
	module.exports = Spinner;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map