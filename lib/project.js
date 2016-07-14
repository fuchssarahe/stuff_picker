const StuffPicker = require('./stuff_picker.js');

document.addEventListener('DOMContentLoaded', function () {
  const picker = new StuffPicker();
  picker.firstRender();
});


// A picker has filters and a spinner.
// The spinner is re-created each time the filters change.
// The spinner is thrown into a re-render loop each time the spinner is clicked.

// How are results generated and displayed?
//
