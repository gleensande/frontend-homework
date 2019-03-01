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

  let simple = makePlain(complicated, '');

  return simple;
}

const makePlain = (compl, prev) => {
  let simp = {};

  /**
   * Рекурсивная функция, обрабатывающая один объект.
   * Записывает данные в переданную переменную.
   *
   * @param {object} compl - обрабатываемый в данный вызов объект
   * @param {string} prev - строка, к которой будут прибавлены названия полей
   * текущего объекта для перевода в plain-формат
   * @return {object} simple - plain-объект
   */
  const processObj = (compl, prev) => {
    let complArr = Object.entries(compl);

    complArr.forEach( function(element) {
      let [prop, val] = element;

      if (typeof val === 'object') {
        processObj(val, prev + prop + '.');
        return;
      }

      simp[prev + prop] = val;
    });
  }

  processObj(compl, prev);

  return simp;
}
