interface RegFn{
  // eslint-disable-next-line no-unused-vars
  (_: undefined, value: string, callback: (error?: Error) => void): void
}

/**
 * @msg: 身份证号码校验
 * @param { String } idNumberString 入参修改
 * @return { boolean } 如果输出为True则校验通过，如果为False则校验不通过
 */
export const checkIdNumber = (idNumberString: string): boolean | undefined => {
  const reg = /(^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
  if (!reg.test(idNumberString)) {
    return false;
  }
  let month = '';
  let day = '';
  let year = '';
  if (idNumberString.length === 18) {
    month = idNumberString.substring(10, 12);
    day = idNumberString.substring(12, 14);
    year = idNumberString.substring(6, 10);
  } else if (idNumberString.length === 15) {
    month = idNumberString.substring(8, 10);
    day = idNumberString.substring(10, 12);
    year = idNumberString.substring(6, 8);
  }
  return checkMonthDay(year, month, day);
}

function checkMonthDay(year: string | number, month: string | number, day: string | number) { // 检测年月日
  year = Number(year);
  if (year < 100) {
    year += 1900;
  }
  month = Number(month);
  day = Number(day);
  switch (month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12: // 31天的月
      return day < 32;
    case 4: case 6: case 9: case 11: // 30天的月
      return day < 31;
    case 2:
      const flag = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0; // 2月分闰年和非闰年
      if (flag) {
        return day < 30;
      } else {
        return day < 29;
      }
  }
}

/**
 *  @msg: form手机号校验
 *
 */
export const isPhone: RegFn = function (_, value, callback) {
  const reg = /^[1](([3]|[4]|[5]|[6]|[7]|[8]|[9])[0-9])[0-9]{8}$/g;

  if (!value) {
    return callback(new Error('请输入手机号码'))
  } else if (!reg.test(value)) {
    return callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

/**
 *  @msg: form邮箱校验
 *
 */
export const isEmail: RegFn = function (_, value, callback) {
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]+$/

  if (!reg.test(value)) {
    return callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}

/**
 *  @msg: form十六进制颜色校验
 *
 */
export const isColor: RegFn = function (_, value, callback) {
  const reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

  if (!reg.test(value)) {
    return callback(new Error('请输入16进制颜色色值'))
  } else {
    callback()
  }
}

/**
 * @msg: 手机号校验
 * @param { String } phoneString 入参修改
 * @return { boolean } 如果输出为True则校验通过，如果为False则校验不通过
 */

export const phoneReg = (phoneString: string) => {
  let phoneFlag = false
  const reg = /^[1](([3]|[4]|[5]|[6]|[7]|[8]|[9])[0-9])[0-9]{8}$/g;
  if (reg.test(phoneString)) {
    phoneFlag = true
  }
  return phoneFlag
}

/**
 * @msg: 手机号和固话校验
 * @param { String } phoneString 入参修改
 * @return { boolean } 如果输出为True则校验通过，如果为False则校验不通过
 */

export const phoneAndTelReg = (phoneString: string) => {
  let phoneFlag = false
  const reg = /^[1](([3]|[4]|[5]|[6]|[7]|[8]|[9])[0-9])[0-9]{8}$/g;
  // let telReg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}/g;
  const telReg = /(^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}-))?(1[358]\d{9})$)/g;
  if (reg.test(phoneString) || telReg.test(phoneString)) {
    phoneFlag = true
  }
  return phoneFlag
}

/**
 * @msg: 手机号和固话校验 '-'选填
 * @param { String } phoneString 电话号
 * @return { boolean } 如果输出为True则校验通过，如果为False则校验不通过
 */
export const phoneAndTelReg2 = (phoneString: string) => {
  let phoneFlag = false
  const reg = /^[1](([3]|[4]|[5]|[6]|[7]|[8]|[9])[0-9])[0-9]{8}$/g;
  const telReg = /(^(0[0-9]{2,3}(-)?)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}-))?(1[358]\d{9})$)/g;
  if (reg.test(phoneString) || telReg.test(phoneString)) {
    phoneFlag = true
  }
  return phoneFlag
}

/**
 * @msg: 数字和中横线 '-'在中间选填
 * @param { String } phoneString 电话号
 * @return { boolean } 如果输出为True则校验通过，如果为False则校验不通过
 */
export const phoneReg2 = (phoneString: string) => {
  let phoneFlag = false
  const reg = /^[0-9]{1,}-[0-9]{1,}$|^[0-9]{1,}$/g
  if (reg.test(phoneString)) {
    phoneFlag = true
  }
  return phoneFlag
}

/**
 * @msg: 固定电话效验 可填写多个'-'
 * @param { String } phoneString 电话号
 * @return { boolean } 如果输出为True则校验通过，如果为False则校验不通过
 */
export const fixedLineTelephone = (phoneString: string) => {
  let phoneFlag = false
  const reg = /^([0-9]+.-\d+)*$/g
  const rex = /^\d+$/g
  if (reg.test(phoneString) || rex.test(phoneString)) {
    phoneFlag = true
  }
  return phoneFlag
}

/**
 * @msg: 密码校验
 * @param { String } passString 入参修改
 * @return { boolean } 如果输出为True则校验通过，如果为False则校验不通过
 */

export const passReg = (passString: string) => {
  let passFlag = false
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/g
  if (reg.test(passString)) {
    passFlag = true
  }
  return passFlag
}

/**
 * @msg: 正整数校验
 * @param { String } integerString
 * @return { boolean } 如果输出为True则校验通过，如果为False则校验不通过
 */

export const singlessIntegerReg = (integerString: string) => {
  let singlessFlag = false
  const reg = /[1-9]\d*/g
  if (reg.test(integerString)) {
    singlessFlag = true
  }

  return singlessFlag
}

/**
 * @msg: 邮箱验证
 * @param { String } emailString
 * @return { boolean }
 */

export const emailReg = (emailString: string) => {
  let emailFlag = false
  // let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,6}$/
  // let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]+$/
  if (reg.test(emailString)) {
    emailFlag = true
  }

  return emailFlag
}

/**
 * @msg: 中文校验
 * @param { String } chineseString
 * @return { boolean }
 */

export const chineseReg = (chineseString: string) => {
  let chineseFlag = false
  const reg = /[\u4e00-\u9fa5]+/g
  if (reg.test(chineseString)) {
    chineseFlag = true
  }

  return chineseFlag
}

/**
 * @msg: 金额校验
 * @param { String } moneyString
 * @return { boolean }
 */

export const moneyReg = (moneyString: string) => {
  let flag = false
  const reg = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/
  if (reg.test(moneyString)) {
    flag = true
  }
  return flag
}

/**
  * @msg: 年月日校验 YYYY-MM-DD
  * @param { String } dataString
  * @return { boolean }
  */

export const dataReg = (dataString: string) => {
  let dataFlag = false
  const reg = /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/g
  if (reg.test(dataString)) {
    dataFlag = true
  }

  return dataFlag
}

/**
  * @msg: 校验时分秒 HH: mm: ss
  * @param { String } timeString
  * @return { boolean }
  */

export const timeReg = (timeString: string) => {
  let timeFlag = false
  const reg = /([01]?\d|2[0-3]):[0-5]?\d:[0-5]?\d/g
  if (reg.test(timeString)) {
    timeFlag = true
  }

  return timeFlag
}

/**
   * @msg: 检验年月日时分秒 YYYY-MM-DD HH: mm: ss
   * @param { String } dataTimeString
   * @return { boolean }
   */

export const dataTimeReg = (dataTimeString: string) => {
  let dataTimeFlag = false
  const reg = /^([1-2]{1}\d{3})\-(([0]{1}[1-9]{1})|([1]{1}[0-2]{1}))\-(([0]{1}[1-9]{1})|([1-2]{1}\d{1})|([3]{1}[0-1]{1}))\s(([0-1]{1}\d{1})|([2]{1}[0-3]))\:([0-5]{1}\d{1})\:([0-5]{1}\d{1})$/g
  if (reg.test(dataTimeString)) {
    dataTimeFlag = true
  }

  return dataTimeFlag
}

export const httpReg = (httpss: string) => {
  let httpRegFlag = false
  const reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/
  if (reg.test(httpss)) {
    httpRegFlag = true
  }

  return httpRegFlag
}

/**
 * @msg: 身份证号码年月提取
 * @param { String } idNumberString 入参修改
 * @return { yyyy-mm-dd }
 */
export const getYearsByIdNumber = (idNumberString: string) => {
  const reg = /(^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
  if (!reg.test(idNumberString)) {
    return false;
  }
  let month = '';
  let day = '';
  let year = '';
  if (idNumberString.length === 18) {
    month = idNumberString.substring(10, 12);
    day = idNumberString.substring(12, 14);
    year = idNumberString.substring(6, 10);
  } else if (idNumberString.length === 15) {
    month = idNumberString.substring(8, 10);
    day = idNumberString.substring(10, 12);
    year = idNumberString.substring(6, 8);
  }
  const result = year.toString() + '-' + month.toString() + '-' + day.toString();
  return result;
}

/**
 * @msg: 身份证号码性别提取
 * @param { String } idNumberString 入参修改
 * @return { 0/1 男/女}
 */
export const getSexByIdNumber = (idNumberString: string): number | boolean => {
  const reg = /(^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
  if (!reg.test(idNumberString)) {
    return false;
  }
  let sex: number;
  let result;
  if (idNumberString.length === 18) {
    sex = Number(idNumberString.charAt(16))
    result = sex % 2 === 0 ? 1 : 0
  } else {
    sex = Number(idNumberString.charAt(14))
    result = sex % 2 === 0 ? 1 : 0
  }
  return result;
}

/**
 * @msg: 获取年龄
 * @param { birthDate } 出生日期 yyyy-mm-dd
 * @return number
 */
export const getAgeByBirth = (birthDate: string) => {
  let result: string | number = ''
  const nowYear = new Date().getFullYear();
  const nowMonth = new Date().getMonth() + 1;
  const nowDay = new Date().getDate()
  const birthYear = birthDate.substring(0, 4)
  const birthMonth = birthDate.substring(5, 7)
  const birthDay = birthDate.substring(8, 10)
  if (parseInt(birthMonth) < nowMonth) {
    result = nowYear - Number(birthYear)
  } else if (parseInt(birthMonth) === nowMonth && parseInt(birthDay) <= nowDay) {
    result = nowYear - Number(birthYear)
  } else {
    result = nowYear - Number(birthYear) - 1
  }
  return result;
}

/**
 * @msg: 通过时间获取试用期结束时间
 * @param {startTime} 试用期开始时间yyyy-mm-dd
 * @param {month} 往后月份 number
 * @return result yyyy-mm-dd
 */
export const getEndDate = (startTime: string, month: number) => {
  const date = new Date(startTime)
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  let Y1: number, M1: number, D1: number
  if (M + month > 12) {
    Y1 = Y + 1
    M1 = M + month - 12
  } else {
    Y1 = Y
    M1 = M + month
  }
  if (D === 1) {
    if (M1 === 1) {
      M1 = 12
      Y1 = Y1 - 1
    } else {
      M1 = M1 - 1
    }
  }
  const newDay = new Date(Y1, M1, 0).getDate(); // 获取新得到的月有多少日
  if (D === 1 || D > newDay) {
    D1 = newDay
  } else {
    D1 = D - 1
  }
  return Y1 + (M1 < 10 ? "-0" : "-") + M1 + (D1 < 10 ? "-0" : "-") + D1;
}

/**
 * @msg: 通过合同开始时间计算结束时间
 * @param {startTime} 试用期开始时间yyyy-mm-dd
 * @param {year} 几年 number
 * @return result yyyy-mm-dd
 */
export const getContractEndDate = (startTime: string, year: number) => {
  let endTime = new Date(startTime);
  endTime.setFullYear(endTime.getFullYear() + year);
  endTime.setDate(endTime.getDate() - 1);
  endTime = new Date(endTime);
  const Y1 = endTime.getFullYear();
  const M1 = endTime.getMonth() + 1;
  const D1 = endTime.getDate();
  return Y1 + (M1 < 10 ? "-0" : "-") + M1 + (D1 < 10 ? "-0" : "-") + D1;
}

/**
 * @msg: QQ效验
 * @param { String } qqString
 * @return { boolean }
 */

export const qqReg = (qqString: string) => {
  let qqFlag = false
  const reg = /^[1-9]\d{4,10}$/ // 第一个数字1-9 后面4-10
  if (reg.test(qqString)) {
    qqFlag = true
  }

  return qqFlag
}
