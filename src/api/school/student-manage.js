import request from '@/utils/request'

// 获取学生列表
export function getStudentList(params) {
  return request({
    url: `/api/common/manage/student`,
    method: 'get',
    params
  })
}

// 添加学生
export function addStudent(data) {
  return request({
    url: '/api/common/manage/student',
    method: 'post',
    data
  })
}

// 更新学生信息
export function updateStudent(id, data) {
  return request({
    url: `/api/common/manage/student/${id}`,
    method: 'put',
    data
  })
}

// 更新学生备注
export function updateStudentRemark(id, remark) {
  return request({
    url: `/api/common/manage/student/${id}/remark`,
    method: 'put',
    data: {
      remark
    }
  })
}

// 删除
export function deleteStudent(id) {
  return request({
    url: `/api/common/manage/student/${id}`,
    method: 'delete',
  })
}
//批量删除学生
export function batchDeleteStudent(data) {
  if (Array.isArray(data.list)) {
    const list = data.list.join(',')
    return request({
      url: `/api/common/manage/student`,
      method: 'delete',
      params: { list }
    })
  } else {
    return request({
      url: `/api/common/manage/student`,
      method: 'delete',
      data
    })
  }
}

// 查询学生个人信息
export function getStudentInfo(id) {
  return request({
    url: `/api/common/manage/student/${id}`,
    method: 'get',
  })
}

//获取所有未分班的学生
export function getDistributionStudentList() {
  return request({
    url: `/api/common/misc/school/student_not_in_class`,
    method: 'get'
  })
}

//获取学生的绑定二维码
export function getStudentBindQrcode(studentId) {
  return request({
    url: `/api/common/manage/student/${studentId}/bind/qrcode`,
    method: 'get'
  })
}

