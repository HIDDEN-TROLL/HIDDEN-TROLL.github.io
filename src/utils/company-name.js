import Vue from 'vue'
import { param2Obj, isEmpty } from '@/utils'

function getOfficialAccount() {
    const params = param2Obj(location.href)
    return params['i'] ? parseInt(params['i']) : 0
}

Vue.prototype.$companyName = (index = 0) => {
  const defaultMap = ['新师路', '新师路教育科技', '新师路教育科技有限公司']

  try {
    const data = JSON.parse(window.localStorage.companyName)
    return data.list[index] ? data.list[index] :
      (defaultMap[index] ? defaultMap[index] : defaultMap[0])
  } catch (e) {
    console.error(e)
  }
  return defaultMap[0]
}

export function setCompanyName(i = 0, list = []) {
  const data = {
    i,
    list
  }
  window.localStorage.companyName = JSON.stringify(data)
}

export function shouldUpdateCompanyName() {
  try {
    if (isEmpty(window.localStorage.companyName)) {
      return true
    }
    const data = JSON.parse(window.localStorage.companyName)
    return getOfficialAccount() !== parseInt(data.i)
  } catch (e) {
    console.error(e)
  }
  return true
}
