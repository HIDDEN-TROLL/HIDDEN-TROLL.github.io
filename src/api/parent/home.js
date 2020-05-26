import request from '@/utils/request'
import { loginStatisticsParams } from '@/utils/operatingStatistical'

export function getHomepageData(params = {}) {
  return request({
    url: '/api/mobile/home/student',
    method: 'get',
    params: Object.assign(params, loginStatisticsParams())
  })
}

export function getEducationPageData() {
  return request({
    url: '/api/common/student/home/education',
    method: 'get'
  })
}

export function getMyPageData() {
  return request({
    url: '/api/common/student/home/my',
    method: 'get'
  })
}


export function getParentInfo() {
  return request({
    url: '/api/common/student/info',
    method: 'get'
  })
}

export function getStudentBindQrcode() {
  return request({
    url: '/api/common/student/qrcode/bind',
    method: 'get'
  })
}

export function getAttentionBasic() {
  return request({
    url: '/api/common/student/attention/basic',
    method: 'get'
  })
}

export function getAttention(year, month) {
  return request({
    url: '/api/common/student/attention',
    method: 'get',
    params: {
      year, month
    }
  })
}

export function getHabit() {
  return request({
    url: '/api/common/student/home/habit',
    method: 'get'
  })
}

//
export function getChildInfo() {
  return request({
    url: '/api/mobile/home/student/my',
    method: 'get',
  })
}

export function getParentProfile() {
  return request({
    url: '/api/mobile/home/student/my/parent/profile',
    method: 'get',
  })
}

export function updateParentProfile(data) {
  return request({
    url: '/api/mobile/home/student/my/parent/profile',
    method: 'put',
    data
  })
}

export function getParentScore() {
  return request({
    url: '/api/mobile/home/student/my/parent/score',
    method: 'get',
  })
}

export function getParentScoreRank(year, month) {
  return request({
    url: '/api/mobile/home/student/my/parent/score/rank',
    method: 'get',
    params: { year, month }
  })
}

export function getParentScoreTask() {
  return request({
    url: '/api/mobile/home/student/my/parent/score/task',
    method: 'get',
  })
}
