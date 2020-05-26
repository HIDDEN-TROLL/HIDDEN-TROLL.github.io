import request from '@/utils/request'

// 获取考勤类型和时间
export function getAttendanceType(params) {
  return request({
    url: `/api/common/manage/attendance/type`,
    method: 'get',
    params
  })
}

// 创建考勤类型
export function addAttendanceType(data) {
  return request({
    url: `/api/common/manage/attendance/type`,
    method: 'post',
    data
  })
}

// 更新考勤类型
export function updateAttendanceType(id, data) {
  return request({
    url: `/api/common/manage/attendance/type/${id}`,
    method: 'put',
    data
  })
}

// 更新考勤类型
export function deleteAttendanceType(id) {
  return request({
    url: `/api/common/manage/attendance/type/${id}`,
    method: 'delete',
  })
}

// 获取考勤类型的关联的学生
export function attendanceStudent(id, page, pageSize) {
  return request({
    url: `/api/common/manage/attendance/type/${id}/student`,
    method: 'get',
    params: {
      page, pageSize
    }
  })
}

// 获取教师考勤类型和时间
export function attendanceTeacher() {
  return request({
    url: '/api/common/manage/teacher/attendance/type',
    method: 'get',
  })
}

// 创建考勤类型教师考勤
export function createTeaAttendance(name,entryTimeStart,entryTimeEnd) {
  return request({
    url: '/api/common/manage/teacher/attendance/type',
    method: 'post',
    params:{name,entryTimeStart,entryTimeEnd}
  })
}
// 删除教师考勤
export function deleteTeaAttendance(id) {
  return request({
    url: `/api/common/manage/teacher/attendance/type/${id}`,
    method: 'delete',
  })
}
// 修改教师考勤
export function changeTeaAttendance(id,name,entryTimeStart,entryTimeEnd) {
  return request({
    url: `/api/common/manage/teacher/attendance/type/${id}`,
    method: 'put',
    params:{
      name,entryTimeStart,entryTimeEnd
    }
  })
}
