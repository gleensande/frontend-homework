'use strict';

const plainify = function plainify(complicated) {
  var simple = {};
  processObj(complicated, '', simple);

  return simple;
}

function processObj(obj, prev, simp) {
  for (var prop in obj) {
    var val = obj[prop];

    if (typeof(val) !== 'object') {
      processPair(prev + prop, val, simp);
    } else {
      processObj(val, prev + prop + '.', simp);
    }
  }
}

let processPair = (property, value, simp) => simp[property] = value;
