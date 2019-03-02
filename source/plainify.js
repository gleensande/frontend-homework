'use strict';

/**
 * Создает plain-объект из объекта со вложенными свойствами
 *
 * @param {object} compl - объект со вложенными свойствами
 * @return {object} simp - plain-объект
 */
const plainify = (compl) => {
  if (!compl || typeof compl !== 'object') {
    return null;
  }

  let simp = processObj(compl, '');

  return simp;
}
  
/**
 * Рекурсивная функция, обрабатывающая один объект.
 * Записывает данные в переданную переменную.
 *
 * @param {object} compl - обрабатываемый в данный вызов объект
 * @param {string} prev - строка, к которой будут прибавлены названия полей
 * текущего объекта для перевода в plain-формат
 * @return {object} simp - plain-объект
 */
const processObj = (compl, prev) => {
  let simp = {};
  let complArr = Object.entries(compl);

  complArr.forEach( function(element) {
    let [prop, val] = element;

    if (typeof val === 'object') {
      simp = Object.assign(simp, processObj(val, prev + prop + '.'));
      return simp;
    }

    simp[prev + prop] = val;
  });

  return simp;
}
