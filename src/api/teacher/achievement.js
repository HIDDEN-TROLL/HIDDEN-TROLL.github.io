import request from '@/utils/request'

const prefix = '/api/mobile/achievement'

export function getAchievement() {
  return request({
    url: prefix,
    method: 'get',
  })
}

export function getAchievementHistory(cancelTokenSource, params) {
  return request({
    url: prefix + '/history',
    method: 'get',
    params,
    cancelToken: cancelTokenSource.token,
  })
}

export function getAchievementRanking(cancelTokenSource, params) {
  return request({
    url: prefix + '/ranking',
    method: 'get',
    params,
    cancelToken: cancelTokenSource.token,
  })
}

export function getCumulativeEnergyScore(teacherId) {
  return request({
    url: prefix + `/cumulative_energy_score/${teacherId}`,
    method: 'get',
  })
}

export function postScore(data) {
  return request({
    url: prefix + '/score',
    method: 'post',
    data,
  })
}
