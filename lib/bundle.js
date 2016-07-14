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

	const StuffPicker = __webpack_require__(1);
	
	document.addEventListener('DOMContentLoaded', function () {
	  const picker = new StuffPicker();
	  picker.firstRender();
	});
	
	
	// A picker has filters and a spinner.
	// The spinner is re-created each time the filters change.
	// The spinner is thrown into a re-render loop each time the spinner is clicked.
	
	// How are results generated and displayed?
	//


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Activity = __webpack_require__(2),
	      StuffConstants = __webpack_require__(3),
	      Spinner = __webpack_require__(4);
	
	const StuffPicker = function () {
	  this.activities = StuffConstants.potentialActivities.map( (activity) => new Activity(activity));
	  this.nothingToDo = false;
	  this.options = {};
	  this.result = 'Click the spinner to decide what to do tonight!';
	  this.color = 'white';
	  this.size = 500;
	};
	
	
	StuffPicker.prototype.stuffToDo = function () {
	  const stuffToDo = [];
	  this.activities.forEach( (activity) => {
	    if (activity.meetsUserCriteria(this.options)) {
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
	  const wrapper = document.createElement('article');
	    wrapper.className = 'wrapper';
	    wrapper.id = 'wrapper';
	
	// create elements for filters
	  const filters = document.createElement('section');
	  filters.className = 'filters'
	  StuffConstants.activityAttributes.forEach( (property) => {
	    let label = document.createElement('label');
	      label.innerHTML = property;
	    const checkbox = document.createElement('input');
	      checkbox.type = 'checkbox';
	      checkbox.onclick = () => this.updateOptions(property, checkbox.checked === true ? 1 : 0);
	    label.appendChild(checkbox);
	    filters.appendChild(label);
	  });
	  wrapper.appendChild(filters);
	
	// create canvas
	  this.canvas = document.createElement('canvas');
	    this.canvas.width = `${this.size}`;
	    this.canvas.height = `${this.size}`;
	    this.canvas.className = 'spinner'
	    wrapper.appendChild(this.canvas);
	
	// create spinner
	  const spinner = new Spinner(this.canvas, this);
	    spinner.render();
	    this.canvas.onclick = (event) => spinner.processClick(event);
	
	// render results
	  const resultsEl = document.createElement('section');
	    resultsEl.innerHTML = this.result;
	    resultsEl.className = 'results';
	    resultsEl.style = {background: this.color, color: 'black'};
	    wrapper.appendChild(resultsEl);
	
	// insert into DOM
	  const root = document.getElementById('root');
	  if (root.firstChild) {
	    root.replaceChild(wrapper, root.firstChild);
	  } else {
	    root.appendChild(wrapper);
	  }
	};
	
	
	StuffPicker.prototype.rerender = function () {
	  const wrapper = document.getElementById('wrapper');
	
	// create spinner
	  const spinner = new Spinner(this.canvas, this);
	    spinner.render();
	    this.canvas.onclick = (event) => spinner.processClick(event);
	
	// render results
	  const resultsEl = document.createElement('section');
	    resultsEl.innerHTML = this.result;
	    resultsEl.className = 'results';
	    resultsEl.style = {background: this.color, color: 'black'};
	
	  wrapper.replaceChild(resultsEl, wrapper.lastChild);
	};
	
	
	StuffPicker.prototype.updateOptions = function (property, value) {
	  this.options[property] = value;
	};
	
	StuffPicker.prototype.updateResults = function (color) {
	  this.result = this.random();
	  this.color = color;
	  this.rerender();
	};
	
	StuffPicker.prototype.random = function () {
	  const stuff = this.stuffToDo();
	  const randomIdx = Math.round((stuff.length - 1) * Math.random())
	  return stuff[randomIdx];
	};
	
	module.exports = StuffPicker;


/***/ },
/* 2 */
/***/ function(module, exports) {

	const Activity = function (options) {
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
	
	Activity.prototype.meetsUserCriteria = function (options = {}) {
	  let meetsCritera = true;
	
	  Object.keys(options).forEach( (option) => {
	    if (options[option] === 0) { return }
	
	    if ( this[option] !== options[option] && this[option] !== 0 ) {
	      meetsCritera = false;
	    }
	  })
	  return meetsCritera;
	};
	
	module.exports = Activity;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Constants = {
	  activityAttributes: [ 'social', 'lazy', 'food', 'alcohol', 'loud', 'thinking', 'free', 'physical' ],
	  potentialActivities: [
	    { name: 'Netflix night',
	      social: 0,
	      lazy: 1,
	      food: -1,
	      alcohol: 0,
	      loud: -1,
	      thinking: -1,
	      free: 1,
	      physical: -1
	      },
	    { name: 'Netflix night with takeout',
	      social: 0,
	      lazy: 1,
	      food: 1,
	      alcohol: 0,
	      loud: -1,
	      thinking: -1,
	      free: 1,
	      physical: -1
	      },
	    { name: 'go dancing',
	      social: 1,
	      lazy: -1,
	      food: 0,
	      alcohol: 1,
	      loud: 1,
	      physical: 1,
	      thinking: -1,
	      free: 0
	      },
	    { name: 'go bar hopping',
	      social: 1,
	      lazy: -1,
	      food: 0,
	      alcohol: 1,
	      loud: 1,
	      physical: 1,
	      thinking: -1,
	      free: -1
	      },
	    { name: 'play sports',
	      social: 1,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: 1,
	      physical: 1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'go to a local fair/festival',
	      social: 0,
	      lazy: -1,
	      food: 0,
	      alcohol: 0,
	      loud: 1,
	      physical: 0,
	      thinking: -1,
	      free: 0
	      },
	    { name: 'go to the museum',
	      social: 0,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: 0,
	      thinking: 1,
	      free: 0
	      },
	    { name: 'see a play/musical',
	      social: 0,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: 0,
	      free: -1
	      },
	    { name: 'see to a movie in theatres',
	      social: 0,
	      lazy: 1,
	      food: 1,
	      alcohol: -1,
	      loud: 1,
	      physical: 0,
	      thinking: -1,
	      free: -1
	      },
	    { name: 'see a live stand-up comedian',
	      social: 0,
	      lazy: -1,
	      food: 0,
	      alcohol: 1,
	      loud: -1,
	      physical: -1,
	      thinking: -1,
	      free: -1
	      },
	    { name: 'walk in the park',
	      social: 0,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: 1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'go hiking',
	      social: 0,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: 1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'learn a language',
	      social: -1,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: 1,
	      free: 1
	      },
	    { name: 'play with your pet',
	      social: -1,
	      lazy: 0,
	      food: -1,
	      alcohol: -1,
	      loud: 1,
	      physical: 1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'eat out',
	      social: 0,
	      lazy: 0,
	      food: 1,
	      alcohol: 0,
	      loud: 0,
	      physical: 0,
	      thinking: -1,
	      free: -1
	      },
	    { name: 'go bowling',
	      social: 1,
	      lazy: -1,
	      food: 0,
	      alcohol: 0,
	      loud: 1,
	      physical: 1,
	      thinking: -1,
	      free: -1
	      },
	    { name: 'bake/cook',
	      social: -1,
	      lazy: -1,
	      food: 1,
	      alcohol: -1,
	      loud: 0,
	      physical: 1,
	      thinking: 0,
	      free: 1
	      },
	    { name: 'head to a farmer\'s market',
	      social: 0,
	      lazy: -1,
	      food: 1,
	      alcohol: -1,
	      loud: 0,
	      physical: 1,
	      thinking: -1,
	      free: -1
	      },
	    { name: 'build a website',
	      social: -1,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: 0,
	      physical: -1,
	      thinking: 1,
	      free: 1
	      },
	    { name: 'take a scenic drive',
	      social: 0,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'go to goodwill',
	      social: 0,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: 1,
	      thinking: -1,
	      free: 0
	      },
	    { name: 'go shopping',
	      social: 0,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: 1,
	      physical: 1,
	      thinking: -1,
	      free: 0
	      },
	    { name: 'get a massage',
	      social: 0,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: -1,
	      free: -1
	      },
	    { name: 'browse the internet',
	      social: 0,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'paint your nails',
	      social: -1,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'clean the bathroom',
	      social: -1,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: 1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'vacuum',
	      social: -1,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: 1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'knit',
	      social: -1,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'sew a blanket',
	      social: -1,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'scuplt with clay',
	      social: -1,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'play an instrument',
	      social: 0,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: 1,
	      physical: 1,
	      thinking: 1,
	      free: 1
	      },
	    { name: 'play frisbee',
	      social: 1,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: 1,
	      physical: 1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'set up a scavenger hunt',
	      social: 1,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: 1,
	      physical: 1,
	      thinking: 1,
	      free: 0
	      },
	    { name: 'marathon the harry potter movies',
	      social: 1,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: 1,
	      physical: -1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'play DnD',
	      social: 1,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: 1,
	      free: 1
	      },
	    { name: 'play videogames',
	      social: 0,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: 1,
	      free: 1
	      },
	    { name: 'order take-out',
	      social: 0,
	      lazy: 1,
	      food: 1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: -1,
	      free: -1
	      },
	    { name: 'stare at the ceiling',
	      social: 0,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'stalk people on facebook',
	      social: -1,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'design your ideal dwelling',
	      social: 0,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: 1,
	      free: 1
	      },
	    { name: 'buy and eat candy',
	      social: 0,
	      lazy: -1,
	      food: 1,
	      alcohol: -1,
	      loud: 0,
	      physical: -1,
	      thinking: -1,
	      free: -1
	      },
	    { name: 'go for a run',
	      social: 0,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: 0,
	      physical: 1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'hit the gym',
	      social: 0,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: 1,
	      physical: 1,
	      thinking: -1,
	      free: -1
	      },
	    { name: 'read a book',
	      social: 0,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: 1,
	      free: 1
	      },
	    { name: 'take a shower',
	      social: -1,
	      lazy: 1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: -1,
	      free: 1
	      },
	    { name: 'make a list of all the stuff you have to do',
	      social: -1,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: 1,
	      free: 1
	      },
	    { name: 'run errands',
	      social: -1,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: 1,
	      physical: 1,
	      thinking: 1,
	      free: -1
	      },
	    { name: 'design a roller coaster',
	      social: 0,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: -1,
	      thinking: 1,
	      free: 1
	      },
	    { name: 'go to a theme park',
	      social: 1,
	      lazy: -1,
	      food: 0,
	      alcohol: 0,
	      loud: 1,
	      physical: 1,
	      thinking: -1,
	      free: -1
	      },
	    { name: 'take photos',
	      social: 1,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: 0,
	      physical: 1,
	      thinking: 1,
	      free: 1
	      },
	    { name: 'learn how to make jam',
	      social: 0,
	      lazy: -1,
	      food: 1,
	      alcohol: -1,
	      loud: 0,
	      physical: 1,
	      thinking: 1,
	      free: -1
	      },
	    { name: 'have a picnic in the park',
	      social: 1,
	      lazy: 1,
	      food: 1,
	      alcohol: 0,
	      loud: -1,
	      physical: 1,
	      thinking: -1,
	      free: -1
	      },
	    { name: 'buy and drop off items for a food drive',
	      social: -1,
	      lazy: -1,
	      food: -1,
	      alcohol: -1,
	      loud: -1,
	      physical: 1,
	      thinking: -1,
	      free: -1
	      }
	    ]
	  }
	
	  module.exports = Constants;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const StuffConstants = __webpack_require__(3);
	
	const Spinner = function (canvas, picker) {
	  this.canvas = canvas;
	  this.picker = picker;
	  this.stuffToDo = picker.stuffToDo();
	  this.ctx = canvas.getContext('2d');
	  this.size = picker.size / 2;
	  this.colors = createRandomColors(this.stuffToDo.length);
	};
	
	Spinner.prototype.render = function () {
	  let start = 0;
	  const angle = Math.PI*2 / this.stuffToDo.length
	
	  this.stuffToDo.forEach( (name, idx) => {
	    this.ctx.fillStyle = this.colors[idx];
	
	    this.ctx.beginPath();
	    this.ctx.moveTo(this.size, this.size);
	    this.ctx.arc(this.size, this.size, this.size, start, start + angle, false);
	    this.ctx.lineTo(this.size, this.size);
	
	    this.ctx.fill();
	
	    start += angle;
	
	  });
	
	  return this.canvas;
	};
	
	Spinner.prototype.processClick = function (event) {
	  console.log(event);
	  if ( Math.sqrt( Math.pow((event.offsetX - this.size), 2) + Math.pow((event.offsetY - this.size), 2) ) < this.size) {
	    this.spin();
	    this.render();
	    this.picker.updateResults('green')
	  }
	};
	
	Spinner.prototype.spin = function () {
	  this.colors.unshift(this.colors.pop());
	};
	
	
	function createRandomColors(num) {
	  const colors = [];
	  for (let i = 0; i < num; i++) {
	    colors.push(randomColor());
	  }
	  return colors;
	};
	
	function randomColor() {
	  let r = 255*Math.random()|0,
	      g = 255*Math.random()|0,
	      b = 255*Math.random()|0;
	  return 'rgb(' + r + ',' + g + ',' + b + ')';
	};
	
	module.exports = Spinner;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map