var Badge = require('./Badge');
var path = require('path');

var coverageBadge = module.exports = function(coverage) {
  coverage = Math.floor(Number(coverage));
  var badge = new Badge({
    box_color: getColor(coverage),
    box_text: coverage+'%',
    label_text: 'coverage',
    height: 18,
    width: 96,
    box_width: 38,
    rounding: 0,
    padding: 0,
    label_font: '7pt DejaVu Sans',
    box_font: 'bold 7pt DejaVu Sans'
  });
  return badge.stream();
};

var green = [147,188,59];
var yellow = [166,157,0];
var red = [189,0,2];

function getColor(coverage) {
  var ratio = coverage/100;
  if (coverage > 90)
    return mixColors(yellow, green, (coverage-90)/10);
  if (coverage > 80)
    return mixColors(red, yellow, (coverage-80)/10);
  return createColor(red);
}

function mixColors(from, to, ratio) {
  var result = [], i;
  for (i=0; i<3; i++)
    result[i] = Math.round(from[i] + (ratio * (to[i]-from[i])));
  return createColor(result);
}

function createColor(values) {
  return 'rgba('+values[0]+','+values[1]+','+values[2]+',1)'
}
