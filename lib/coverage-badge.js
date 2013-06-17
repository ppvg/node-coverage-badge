var Badge = require('./Badge');

var coverageBadge = module.exports = function(coverage) {
  coverage = Math.floor(Number(coverage));
  var color = getColor(coverage);
  console.log(color);
  var badge = new Badge({
    box_color: color,
    box_text: coverage+'%',
    label_text: 'coverage',
  });
  return badge.stream();
};

var green = [81,163,81];
var yellow = [222,212,67];
var red = [162,62,63];

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
