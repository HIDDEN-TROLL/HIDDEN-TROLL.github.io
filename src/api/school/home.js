import request from '@/utils/request'
import { loginStatisticsParams } from '@/utils/operatingStatistical'

export function getHomepageData() {
  return request({
    url: '/api/mobile/home/director',
    method: 'get',
    params: loginStatisticsParams()
  })
}

export function getIndexPageTodayWorking() {
  return request({
    url: '/api/mobile/home/director/index/today_working',
    method: 'get'
  })
}

export function getIndexPageOtherWorking() {
  return request({
    url: '/api/mobile/home/director/index/other_working',
    method: 'get'
  })
}

export function getAttendanceWidgetDetail() {
  return request({
    url: '/api/mobile/home/director/index/attendance_teacher_detail',
    method: 'get'
  })
}


export function getWorkbenchPageData() {
  return request({
    url: '/api/mobile/home/director/workbench',
    method: 'get'
  })
}

export function getSearchPageData() {
  return request({
    url: '/api/mobile/home/director/search',
    method: 'get'
  })
}

export function getMyPageData() {
  return request({
    url: '/api/mobile/home/director/my',
    method: 'get'
  })
}

export function updateProfile(data) {
  return request({
    url: '/api/mobile/home/director/my/profile',
    method: 'post',
    data
  })
}
