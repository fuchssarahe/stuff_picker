const Activity = require('./activity.js'),
      StuffConstants = require('./stuff_constants.js'),
      Spinner = require('./spinner.js');

const StuffPicker = function () {
  this.activities = StuffConstants.potentialActivities.map( (activity) => new Activity(activity));
  this.nothingToDo = false;
  this.options = {};
  this.result = 'click the spinner to decide what to do tonight;<br/>click the mood buttons to filter your options';
  this.result = ''
  this.color = 'white';
  this.size = 350;
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
  const wrapper = document.createElement('main');
    wrapper.className = 'wrapper';
    wrapper.id = 'wrapper';

  const columnWrapper = document.createElement('div')
    columnWrapper.className = 'column'
// create header
  const header = document.createElement('header')
    header.className = 'item__header column__item';
    header.innerHTML = 'So... Whatcha wanna do tonight?';
    columnWrapper.appendChild(header);

// create elements for filters
  const filters = document.createElement('aside');
    filters.className = 'item__filters column__item'
  const filterHeader = document.createElement('header');
    filterHeader.innerHTML = 'Mood&nbspFilters';
    filters.appendChild(filterHeader);

  const filterCount = document.createElement('div');
    filterCount.innerHTML = 'there are ' + this.stuffToDo().length + ' potential options.';
    filterCount.className = 'filters__counter'
    filters.appendChild(filterCount);

  StuffConstants.activityAttributes.forEach( (property) => {
    let label = document.createElement('label');
      label.className = 'filters__filter'
      label.innerHTML = property;
      label.onclick = () => this.updateFilters(property, label.className.includes('filters__filter--checked') ? 0 : 1);
    filters.appendChild(label);
  });

  columnWrapper.appendChild(filters);
  wrapper.appendChild(columnWrapper);

const spinnerEl = document.createElement('section');
  spinnerEl.className = 'item__spinner column__item';

  const instructions = document.createElement('header');
    instructions.innerHTML = 'click the spinner to decide what to do tonight;<br/>click the mood buttons to filter your options';
    spinnerEl.appendChild(instructions);

// render results
  const resultsEl = document.createElement('div');
    resultsEl.innerHTML = this.result;
    resultsEl.className = 'item__results';
    resultsEl.style = {background: this.color, color: 'black'};
    spinnerEl.appendChild(resultsEl);

// create canvas
  this.canvas = document.createElement('canvas');
    this.canvas.width = `${this.size}`;
    this.canvas.height = `${this.size}`;
    this.canvas.className = 'item__spinner'
    spinnerEl.appendChild(this.canvas);

// create spinner
  const spinner = new Spinner(this.canvas, this);
    spinner.render();
    this.canvas.onclick = (event) => spinner.processClick(event);

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
  const columnWrapper = document.getElementsByClassName('column')[0]
  const filters = document.createElement('aside');
  filters.className = 'item__filters column__item'

  const filterHeader = document.createElement('header');
    filterHeader.innerHTML = 'Mood&nbspFilters';
    filters.appendChild(filterHeader);

  const filterCount = document.createElement('div');
    filterCount.innerHTML = 'there are ' + this.stuffToDo().length + ' potential options.';
    filterCount.className = 'filters__counter'
    filters.appendChild(filterCount);

  StuffConstants.activityAttributes.forEach( (property) => {
    let label = document.createElement('label');
      label.className = 'filters__filter'
      label.innerHTML = property;
      if (this.options[property] === 1) {
        label.className += ' filters__filter--checked';
      } else {
        label.className = 'filters__filter'
      }
      label.onclick = () => this.updateFilters(property, label.className.includes('filters__filter--checked') ? 0 : 1);
    filters.appendChild(label);
  });

  columnWrapper.replaceChild(filters, document.getElementsByClassName('item__filters')[0]);
};

StuffPicker.prototype.renderResults = function () {
  const spinnerEl = document.getElementsByClassName('item__spinner')[0];

// render results
  const resultsEl = document.createElement('div');
    resultsEl.innerHTML = this.result;
    let classes = 'item__results';

    resultsEl.style.background = 'black';
    resultsEl.style.color = 'white';

    if (!this.result.match('picky')) {
      resultsEl.style.background =  this.color;
      resultsEl.style.color = 'white';
      classes += ' item__results--filled'
      resultsEl.onclick = () => {
        resultsEl.innerHTML = 'Redirecting...'
        resultsEl.style.background = 'lightgray';
        resultsEl.style.color = 'black';
        redirectToGoogleSearch(this);
      };
    }
    resultsEl.className = classes;


  spinnerEl.replaceChild(resultsEl, document.getElementsByClassName('item__results')[0]);
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
