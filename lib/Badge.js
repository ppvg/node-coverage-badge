var Canvas = require('canvas');

var Badge = module.exports = function(config) {
  parseConfig(config, this);
  this.canvas = new Canvas(this.width, this.height);
  this.drawBase();
  this.drawBox();
  this.setTextProperties();
  this.drawBoxText();
  this.drawLabel();
}

Badge.prototype.stream = function() {
  return this.canvas.pngStream();
};


Badge.prototype.drawBase = function() {
  this.context = this.canvas.getContext('2d');
  this.context.fillStyle = this.bg_color;
  this.roundedRectangle(0, 0, this.width, this.height, this.rounding);
  this.context.fill();
};

Badge.prototype.drawBox = function() {
  this.context = this.canvas.getContext('2d');
  this.context.fillStyle = this.box_color;
  this.roundedRectangle(this.padding, this.padding, this.box_width, this.height-(2*this.padding), this.rounding);
  this.context.fill();
};

Badge.prototype.drawLabel = function() {
  var x = ((this.width-this.box_width-2*this.padding) / 2) + this.box_width + this.padding;
  var y = this.height/2;
  this.drawText(this.label_text, x, y, this.text_color, this.label_font);
}

Badge.prototype.drawBoxText = function() {
  var x = (this.box_width/2) + this.padding;
  var y = this.height/2;
  this.drawText(this.box_text, x+1, y+1, this.shadow_color, this.box_font);
  this.drawText(this.box_text, x, y, this.text_color, this.box_font);
};

Badge.prototype.drawText = function(text, x, y, color, font) {
  this.context = this.canvas.getContext('2d');
  this.setTextProperties()
  this.context.fillStyle = color;
  this.context.font = font;
  this.context.fillText(text, x, y);
};

Badge.prototype.setTextProperties = function() {
  this.context.shadowColor = this.shadow_color;
  this.context.textAlign = 'center';
  this.context.textBaseline = 'middle';
};

Badge.prototype.roundedRectangle = function(x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.context.beginPath();
  this.context.moveTo(x+r, y);
  this.context.arcTo(x+w, y,   x+w, y+h, r);
  this.context.arcTo(x+w, y+h, x, y+h, r);
  this.context.arcTo(x, y+h, x, y, r);
  this.context.arcTo(x, y, x+w, y, r);
  this.context.closePath();
};

function parseConfig(source, target) {
  var defaults = {
    width: 105,
    height: 23,
    rounding: 3,
    padding: 2,
    box_width: 45,
    bg_color: 'rgba(87,87,87,1)',
    box_color: 'rgba(81,163,81,1)', // green
    text_color: 'rgba(255,255,255,1)', // white
    shadow_color: 'rgba(0,0,0,0.9)', // black
    label_font: 'bold 10px Helvetica',
    box_font: 'bold 12px Helvetica',
    box_text: '',
    label_text: ''
  };
  for (var key in defaults) {
    target[key] = source[key] || defaults[key];
  }
}
