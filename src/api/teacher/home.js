import request from '@/utils/request'
import { loginStatisticsParams } from '@/utils/operatingStatistical'

export function getHomepageData() {
  return request({
    url: '/api/mobile/home/teacher',
    method: 'get',
    params: loginStatisticsParams()
  })
}

export function getIndexJobTodayWorking() {
  return request({
    url: '/api/mobile/home/teacher/index/job/today_working',
    method: 'get'
  })
}

export function getIndexJobTodayWorkingStudeyManage() {
  return request({
    url: '/api/mobile/home/teacher/index/job/today_working_study_manage',
    method: 'get'
  })
}

// export function getIndexJobOtherWorking() {
//   return request({
//     url: '/api/mobile/home/teacher/index/job/other_working',
//     method: 'get'
//   })
// }

export function getIndexJobOtherTask() {
  return request({
    url: '/api/mobile/home/teacher/index/job/other_task',
    method: 'get'
  })
}

export function getIndexEnergy() {
  return request({
    url: '/api/mobile/home/teacher/index/energy',
    method: 'get'
  })
}

export function getIndexAppraisal() {
  return request({
    url: '/api/mobile/home/teacher/index/appraisal',
    method: 'get'
  })
}



export function getWorkbenchPageData() {
  return request({
    url: '/api/mobile/home/teacher/workbench',
    method: 'get'
  })
}

export function getSearchPageData() {
  return request({
    url: '/api/mobile/home/teacher/search',
    method: 'get'
  })
}

export function getMyPageData() {
  return request({
    url: '/api/mobile/home/teacher/my',
    method: 'get'
  })
}

export function updateProfile(data) {
  return request({
    url: '/api/mobile/home/teacher/my/profile',
    method: 'post',
    data
  })
}
