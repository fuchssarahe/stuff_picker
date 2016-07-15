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
  let start = -41.5/180*Math.PI;
  this.ctx.fillStyle = 'white';
  this.ctx.beginPath();
  this.ctx.moveTo(430,70);
  this.ctx.lineTo(430,0);
  this.ctx.lineTo(500,70);
  this.ctx.closePath();
  this.ctx.fill();

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
};

Spinner.prototype.processClick = function (event) {
  if ( Math.sqrt( Math.pow((event.offsetX - this.size), 2) + Math.pow((event.offsetY - this.size), 2) ) < this.size) {
    this.spin();
  }
};

Spinner.prototype.spin = function () {
  const numRotations = Math.random()*15+115;
  let i = 0;
  const self = this;

  function setSpins() {
    if (i < numRotations) {
      setTimeout(() => {
        self.colors.unshift(self.colors.pop())
        self.render();
        setSpins();
      }, Math.pow(2.14, (i/20)))
    } else {
      self.picker.updateResults(self.ctx.fillStyle);
    }
    i++;
  }
  setSpins();
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
