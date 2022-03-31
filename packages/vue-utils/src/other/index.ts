/**
 * @desc 判断对象是否为空
 * @param {obj}
 * @return {boolean}
 */
export const isObjectEmpty = (obj:any): boolean => obj && Object.keys(obj).length === 0;

/**
 * @desc 判断数组是否为空
 * @param {arr}
 * @return {boolean}
 */
export const isArrayEmpty = (arr:any[]): boolean => Array.isArray(arr) && !arr.length;

/**
 * @desc 判断时间是否为周末
 * @param {date}
 * @return {boolean}
 */
export const isWeekday = (d:Date): boolean => d.getDay() % 6 !== 0;
