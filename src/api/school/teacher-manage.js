import request from '@/utils/request'

// 获取教师列表
export function getTeacherList(params) {
  return request({
    url: `/api/common/manage/teacher`,
    method: 'get',
    params
  })
}

// 添加教师
export function addTeacher(data) {
  return request({
    url: '/api/common/manage/teacher',
    method: 'post',
    data
  })
}

// 更新教师信息
export function updateTeacher(id, data) {
  return request({
    url: `/api/common/manage/teacher/${id}`,
    method: 'put',
    data
  })
}

//获取教师的绑定二维码
export function getTeacherBindQrcode(teacherId) {
  return request({
    url: `/api/common/manage/teacher/${teacherId}/bind/qrcode`,
    method: 'get'
  })
}

// 删除
export function deleteTeacher(id) {
  return request({
    url: `/api/common/manage/teacher/${id}`,
    method: 'delete',
  })
}
//批量删除教师
export function bacthDeleteTeacher(data) {
  if (Array.isArray(data.list)) {
    const list = data.list.join(',')
    return request({
      url: `/api/common/manage/teacher`,
      method: 'delete',
      params: { list }
    })
  } else {
    return request({
      url: `/api/common/manage/teacher`,
      method: 'delete',
      data
    })
  }
}

// 查询教师个人信息
export function getTeacherInfo(id) {
  return request({
    url: `/api/common/manage/teacher/${id}`,
    method: 'get',
  })
}

// 获取未分配主教师列表
export function getDistributionTeacherList() {
  return request({
    url: `/api/common/misc/school/teacher_not_assigned_main_class`,
    method: 'get'
  })
}
