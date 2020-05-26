import request from '@/utils/request'

// 获取考勤统计
export function getAttendanceStatistics(data) {
  return request({
    url: '/api/common/attendance/statistics',
    method: 'get',
    params:data
  })
}
// 获取某个月有考勤数据的日期
export function getAttendanceDate(data) {
  return request({
    url: '/api/common/attendance/statistics/dates',
    method: 'get',
    params:data
  })
}
