'use strict';

const plainify = function plainify(complicated) {
  let simple = {};
  processObj(complicated, '', simple);

  return simple;
}

function processObj(obj, prev, simp) {
  for (let prop in obj) {
    let val = obj[prop];

    if (typeof(val) !== 'object') {
      processPair(prev + prop, val, simp);
    } else {
      processObj(val, prev + prop + '.', simp);
    }
  }
}

let processPair = (property, value, simp) => simp[property] = value;
