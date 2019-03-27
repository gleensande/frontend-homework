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

  return processObj(compl, '');
}
  
/**
 * Рекурсивная функция, обрабатывающая один объект.
 * Возвращает plain-объект.
 *
 * @param {object} compl - обрабатываемый в данный вызов объект
 * @param {string} prev - строка, к которой будут прибавлены названия полей
 * текущего объекта для перевода в plain-формат
 * @return {object} simp - plain-объект
 */
const processObj = (compl, prev) => {
  const complArr = Object.entries(compl);

  return complArr.reduce( ((acc, curr) => {
    const [prop, val] = curr;

    if (typeof val === 'object') {
      return Object.assign(acc, processObj(val, prev + prop + '.'));
    }

    acc[prev + prop] = val;
    return acc;
  }), {});
}
