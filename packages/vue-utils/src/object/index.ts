/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 * @return {Any}
 */
export function deepClone(values:any) {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (values === null || typeof values !== "object") return values;

  // Handle Date
  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  }

  // Handle Array
  if (values instanceof Array) {
    copy = [];
    let i = 0; const len = values.length;
    for (; i < len; i++) {
      copy[i] = deepClone(values[i]);
    }
    return copy;
  }

  // Handle Object
  if (values instanceof Object) {
    copy = {};
    for (const attr in values) {
      if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy values! Its type isn't supported.");
}

/**
 *
 * @desc 判断对象是否相等
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 */
export function objectEqual(obj1: { [key: string]: any }, obj2: { [key: string]: any }): boolean {
  if (obj1 === obj2) return true;

  const props1 = Object.getOwnPropertyNames(obj1);
  const props2 = Object.getOwnPropertyNames(obj2);
  if (props1.length !== props2.length) return false;

  for (let i = 0; i < props1.length; i++) {
    const propName = props1[i];
    const itemA = obj1[propName];
    const itemB = obj2[propName];
    if (!props2.hasOwnProperty(propName)) return false;
    if (
      Object.prototype.toString.call(itemA) === '[object Object]' &&
      Object.prototype.toString.call(itemB) === '[object Object]'
    ) {
      if (!objectEqual(itemA, itemB)) return false;
    } else if (itemA !== itemB) {
      return false;
    }
  }
  return true;
}
