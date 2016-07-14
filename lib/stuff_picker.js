const Activity = require('./activity.js'),
      StuffConstants = require('./stuff_constants.js'),
      Spinner = require('./spinner.js');

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
// 'about to crete new spinner'
//   const spinner = new Spinner(this.canvas, this);
//     spinner.render();
//     this.canvas.onclick = (event) => spinner.processClick(event);

// render results
  const resultsEl = document.createElement('section');
    resultsEl.innerHTML = this.result;
    resultsEl.className = 'results';
    resultsEl.style.background =  this.color;
    resultsEl.style.color = 'black';

  wrapper.replaceChild(resultsEl, wrapper.lastChild);
};


StuffPicker.prototype.updateOptions = function (property, value) {
  this.options[property] = value;
};

StuffPicker.prototype.updateResults = function (color) {
  const newResult = this.random();
  if (newResult === undefined) {
    this.result = 'You\'re too picky! There isn\'t anything to do that meets your criteria!'
  } else {
    this.result = this.random();
  }
  this.color = color;
  this.rerender();
};

StuffPicker.prototype.random = function () {
  const stuff = this.stuffToDo();
  const randomIdx = Math.round((stuff.length - 1) * Math.random())
  return stuff[randomIdx];
};

module.exports = StuffPicker;
