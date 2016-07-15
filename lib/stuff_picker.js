const Activity = require('./activity.js'),
      StuffConstants = require('./stuff_constants.js'),
      Spinner = require('./spinner.js');

const StuffPicker = function () {
  this.activities = StuffConstants.potentialActivities.map( (activity) => new Activity(activity));
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

  // // create header
  //   const header = document.createElement('header');
  //     header.className = 'header';
  //     header.innerHTML = "What are you in the mood to do tonight? Click the buttons below to set filters.";
  //     wrapper.appendChild(header);
  //

// create elements for filters
  const filters = document.createElement('aside');
  filters.className = 'filters'

  StuffConstants.activityAttributes.forEach( (property) => {
    let label = document.createElement('label');
      label.innerHTML = property;
      label.onclick = () => this.updateFilters(property, label.className === 'checked' ? 0 : 1);
    filters.appendChild(label);
  });
  wrapper.appendChild(filters);

const spinnerEl = document.createElement('section')
  spinnerEl.className = 'spinner';
// create canvas
  this.canvas = document.createElement('canvas');
    this.canvas.width = `${this.size}`;
    this.canvas.height = `${this.size}`;
    this.canvas.className = 'spinner'
    spinnerEl.appendChild(this.canvas);

// create spinner
  const spinner = new Spinner(this.canvas, this);
    spinner.render();
    this.canvas.onclick = (event) => spinner.processClick(event);

// render results
  const resultsEl = document.createElement('div');
    resultsEl.innerHTML = this.result;
    resultsEl.className = 'results';
    resultsEl.style = {background: this.color, color: 'black'};
    spinnerEl.appendChild(resultsEl);

  wrapper.appendChild(spinnerEl)
// insert into DOM
  const root = document.getElementById('root');
  if (root.firstChild) {
    root.replaceChild(wrapper, root.firstChild);
  } else {
    root.appendChild(wrapper);
  }
};

StuffPicker.prototype.renderFilters = function () {
  const wrapper = document.getElementById('wrapper')
  const filters = document.createElement('aside');
  filters.className = 'filters'

  StuffConstants.activityAttributes.forEach( (property) => {
    let label = document.createElement('label');
      label.innerHTML = property;
      if (this.options[property] === 1) {
        label.className = 'checked';
      }
      label.onclick = () => this.updateFilters(property, label.className === 'checked' ? 0 : 1);
    filters.appendChild(label);
  });
  wrapper.replaceChild(filters, wrapper.firstChild);
};

StuffPicker.prototype.renderResults = function () {
  const spinnerEl = document.getElementsByClassName('spinner')[0];

// render results
  const resultsEl = document.createElement('div');
    resultsEl.innerHTML = this.result;
    let classes = 'results';
    if (!this.result.match('picky')) {
      classes += ' results--filled'
    }
    resultsEl.className = classes;
    resultsEl.style.background =  this.color;
    resultsEl.style.color = 'white';
    resultsEl.onclick = () => {
      resultsEl.innerHTML = 'Redirecting...'
      resultsEl.style.background = 'lightgray';
      resultsEl.style.color = 'black';
      redirectToGoogleSearch(this);
    };


  spinnerEl.replaceChild(resultsEl, spinnerEl.lastChild);
};

StuffPicker.prototype.updateFilters = function (property, value) {
  this.options[property] = value;
  this.renderFilters();
};

StuffPicker.prototype.updateResults = function (color) {
  const newResult = this.random();
  if (newResult === undefined) {
    this.result = 'You\'re too picky! There isn\'t anything to do that meets your criteria!'
    this.color = 'white'
  } else {
    this.result = this.random();
    this.color = color;
  }
  this.renderResults();
};

StuffPicker.prototype.random = function () {
  const stuff = this.stuffToDo();
  const randomIdx = Math.round((stuff.length - 1) * Math.random())
  return stuff[randomIdx];
};


function redirectToGoogleSearch(picker) {
  if ('geolocation' in navigator) {
    const timeout = setTimeout(() => window.location = `http://google.com/search?q=` + picker.result, 8000)
    navigator.geolocation.getCurrentPosition( position => {
      clearTimeout(timeout);
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          const address = results[0].formatted_address;
          window.location = `http://google.com/search?q=${picker.result}+near+${address}`;
        } else {
          window.location = `http://google.com/search?q=` + picker.result;
        }
      });
    }, () => window.location = `http://google.com/search?q=` + picker.result)
  } else {
    window.location = `http://google.com/search?q=` + picker.result
  }
};

module.exports = StuffPicker;
