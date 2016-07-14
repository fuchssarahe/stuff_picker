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
