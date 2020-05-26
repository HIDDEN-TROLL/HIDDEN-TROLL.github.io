import request from '@/utils/request'

// 获取今日未签到的学生
export function unsignedStudent(attendanceTypeId, classId, grade, type, params = {}) {
  return request({
    url: `/api/common/attendance/unsigned`,
    method: 'get',
    params: Object.assign({
      attendanceTypeId, classId, grade, type
    }, params)
  })
}

// 执行签到
export function signed(data) {
  return request({
    url: `/api/common/attendance/signin`,
    method: 'post',
    data
  })
}
