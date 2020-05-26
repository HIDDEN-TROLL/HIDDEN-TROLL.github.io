import { isNumeric } from './index'

function getBoolean(key, defaultValue) {
  if (localStorage[key] === 1 || localStorage[key] === '1') {
    return true
  } else if (localStorage[key] === 0 || localStorage[key] === '0') {
    return false
  } else {
    return defaultValue
  }
}

function setBoolean(key, value) {
  localStorage[key] = value ? 1 : 0
}

export function getConfig(key, defaultValue, availableValueCandidates = undefined) {
  let value = localStorage[key]
  if (isNumeric(value)) {
    value = parseFloat(value)
  }
  if (availableValueCandidates && Array.isArray(availableValueCandidates) && availableValueCandidates.includes(value)) {
    return value
  }
  return defaultValue
}

export function setConfig(key, value) {
  localStorage[key] = value
}

// 今日考勤的默认显示类型
export const ConfigKey_attendanceUnSignedStatisticalShowType = 'attendanceUnSignedStatisticalShowType'



export function getIsShowGradeName(defaultValue = true) {
  return getBoolean('isShowGradeName', defaultValue)
}

export function setIsShowGradeName(value) {
  return setBoolean('isShowGradeName', value)
}

// 作业管理的作业详情输入框
export function getIsShowHomeworkContentTextArea(defaultValue = false) {
  return getBoolean('isShowHomeworkContentTextArea', defaultValue)
}

export function setIsShowHomeworkContentTextArea(value) {
  return setBoolean('isShowHomeworkContentTextArea', value)
}
