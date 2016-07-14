const StuffConstants = require('./stuff_constants.js');

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
