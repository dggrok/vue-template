/**
 * 判断数据类型
 * 'Array' | 'Number' | 'Object' | 'Undefined' | 'Null' | 'String' | 'Symbol' | 'BigInt' | 'Date' | 'Function' | 'Boolean'
 */
export const checkType = data => {
  const type = Object.prototype.toString.call(data);
  return type.substring(8, type.length - 1);
}

// 获取操作项
export const getOperationColumnsByRowData = (list, rowData) => {
  return list.filter(({ access, show }) => {
    if (checkType(show) === 'Boolean') {
      return show && access !== false;
    }
    if (checkType(show) === 'Object') {
      const result = [];
      const showObj = show;
      Object.keys(showObj).forEach(key => {
        const value = showObj[key];
        if (checkType(value) === 'Array') {
          if (checkType(rowData[key]) === 'Array') {
            let isIncludes = false;
            rowData[key].forEach(d => {
              if (value.includes(d)) {
                isIncludes = true;
              }
            });
            if (isIncludes) {
              result.push(true);
            } else {
              result.push(false);
            }
          } else if (value.includes(rowData[key])) {
            result.push(true);
          } else {
            result.push(false);
          }
        } else if (rowData[key] !== value) {
          result.push(false);
        } else {
          result.push(true);
        }
      });
      return access !== false && result.filter(res => !res).length === 0;
    }
    return access !== false;
  })
}
