'use strict';

/**
 * Создает plain-объект из объекта со вложенными свойствами
 *
 * @param {object} complicated - объект со вложенными свойствами
 * @return {object} simple - plain-объект
 */
const plainify = function plainify(complicated) {
  if (typeof(complicated) !== 'object' || complicated === null) {
    return null;
  }

  let simple = {};
  processObj(complicated, '', simple);

  return simple;
}

/**
 * Рекурсивная функция, обрабатывающая один объект.
 * Записывает данные в переданную переменную.
 *
 * @param {object} obj - обрабатываемый в данный вызов объект
 * @param {string} prev - строка, к которой будут прибавлены названия полей
 * текущего объекта для перевода в plain-формат
 * @param {object} simp - внешний объект, в который записывается plain
 */
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

/**
 * Функция, записывающая ключ и значение в указанный объект
 *
 * @param {string} property - ключ
 * @param {string} value - значение
 * @param {object} simple - объект для записи
 */
let processPair = (property, value, simp) => simp[property] = value;
