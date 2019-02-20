'use strict';

/**
 * Создает plain-объект из объекта со вложенными свойствами
 *
 * @param {object} complicated - объект со вложенными свойствами
 * @return {object} simple - plain-объект
 */
const plainify = (complicated) => {
  if (!complicated || typeof complicated !== 'object') {
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
 * @param {object} compl - обрабатываемый в данный вызов объект
 * @param {string} prev - строка, к которой будут прибавлены названия полей
 * текущего объекта для перевода в plain-формат
 * @param {object} simp - внешний объект, в который записывается plain
 */
const processObj = (compl, prev, simp) => {
  for (let prop in compl) {
    let val = compl[prop];

    if (typeof val !== 'object') {
      simp[prev + prop] = val;
    } else {
      processObj(val, prev + prop + '.', simp);
    }
  }
}
