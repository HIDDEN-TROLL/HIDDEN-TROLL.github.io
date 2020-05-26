import request from '@/utils/request'



// 获取班级列表
export function selectClassList(page, pageSize) {
    return request({
      url: '/api/common/manage/class',
      method: 'get',
      params: {
        page, pageSize
      }
    })
  }
  // 获取班考勤报表
export function getSheetData(parameter) {
  return request({
    url: '/api/common/attendance/report',
    method: 'get',
    params:parameter
  })
}

// 获取学生的考勤记录
export function getStudentAttendance(data) {
  return request({
    // url: '/api/mobile/app/attendance/student/record',
    url: '/api/common/attendance/student/record',
    method: 'get',
    params:data
  })
}

// 获取某个学生的打卡考勤信息
export function getStudentSignInPush(from,template_id) {
  return request({
    url: '/api/common/attendance/student/details',
    method: 'get',
    params: {
      from,template_id
    }
  })
}





