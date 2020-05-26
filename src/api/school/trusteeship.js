import request from '@/utils/request'

// 获取机构列表
export function getSchoolList() {
  return request({
    url: `/api/mobile/website/schoolList`,
    method: 'get',
  })
}

// 获取微官网首页 数据
export function getSchoolWebsite(schId) {
  return request({
    url: '/api/mobile/website' + (schId ? '/' + schId : ''),
    method: 'get',
  })
}

// 提交微官网编辑数据
export function submitEditWebsite(schId, data) {
  if (schId) {
    data.schId = schId
  }
  return request({
    url: `/api/mobile/website`,
    method: 'post',
    data
  })
}

// 更新微官网编辑数据
export function updateEditWebsite(schId, data) {
  return request({
    url: `/api/mobile/website/${schId}`,
    method: 'put',
    data
  })
}

export function getShareData(schId) {
  return request({
    url: `/api/mobile/website/shareImage/${schId}`,
    method: 'get',
  })
}
