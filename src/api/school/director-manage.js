import request from '@/utils/request'

// 获取校长列表
export function getDirectorList(params) {
  return request({
    url: `/api/common/manage/director`,
    method: 'get',
    params
  })
}

// 添加校长
export function addDirector(data) {
  return request({
    url: '/api/common/manage/director',
    method: 'post',
    data
  })
}

// 更新校长信息
export function updateDirector(id, data) {
  return request({
    url: `/api/common/manage/director/${id}`,
    method: 'put',
    data
  })
}

//获取校长的绑定二维码
export function getDirectorBindQrcode(directorId) {
  return request({
    url: `/api/common/manage/director/${directorId}/bind/qrcode`,
    method: 'get'
  })
}

// 删除
export function deleteDirector(id) {
  return request({
    url: `/api/common/manage/director/${id}`,
    method: 'delete',
  })
}
//批量删除 校长
export function batchDeleteDirector(data) {
  if (Array.isArray(data.list)) {
    const list = data.list.join(',')
    return request({
      url: `/api/common/manage/director`,
      method: 'delete',
      params: { list }
    })
  } else {
    return request({
      url: `/api/common/manage/director`,
      method: 'delete',
      data
    })
  }
}

// 查询校长个人信息
export function getDirectorInfo(id) {
  return request({
    url: `/api/common/manage/director/${id}`,
    method: 'get',
  })
}
