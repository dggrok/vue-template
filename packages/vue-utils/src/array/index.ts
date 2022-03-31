import { objectEqual } from "../object";

/**
 * 根据name对数组进行去重
 * @param arr 需要去重的数组
 * @param name 依据的属性值
 */
export function filterByName(arr:[], name:string) {
  const result:any = [];
  for (let i = 0; i < arr.length; i++) {
    const compareName = arr[i];
    if (i === 0) {
      result.push(compareName);
    } else {
      const filterData = result.filter(function(item:any) {
        return item[name] === compareName[name];
      });
      if (filterData.length === 0) {
        result.push(compareName);
      }
    }
  }
  return result;
}

/**
 *
 * @desc 判断两个数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 */
export function arrayEqual (arr1: any[], arr2: any[]): boolean {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;
  // 目前项目中大部分情况都是纯对象数组，不会太会出现混用，所以只判断首项是否为对象
  if (arr1.length > 0 && Object.prototype.toString.call(arr1[0]) === '[object Object]') {
    for (let i = 0; i < arr1.length; ++i) {
      if (!objectEqual(arr1[i], arr2[i])) return false;
    }
    return true;
  }
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

/**
 * @desc 根据key获取对应的value
 * @param arr [list,key] 要转换的键值对列表 key 具体的key值
 * @param key
 * @returns string key对应的value值
 */
export function findValueByKey (arr:any = [], key) {
  let value = '';
  arr.forEach((item) => {
    if (String(item.key) === String(key)) {
      value = item.val;
    }
  });
  return value;
}
