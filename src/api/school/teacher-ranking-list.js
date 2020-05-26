import request from '@/utils/request'

const prefix = '/api/mobile/teacher_ranking'

export function getTeacherRankingList() {
  return request({
    url: prefix,
    method: 'get',
  })
}

export function getJobScoreDetailsLineChart(teacherId) {
  return request({
    url: prefix + '/detail/job/lineChart',
    method: 'get',
    params: {
      teacherId
    }
  })
}

export function getJobScoreDetailsTimeLine(teacherId, page) {
  return request({
    url: prefix + '/detail/job/timeLine',
    method: 'get',
    params: {
      teacherId, page
    }
  })
}


export function getEnergyScoreDetailsLineChart(teacherId, type) {
  return request({
    url: prefix + '/detail/energy/lineChart',
    method: 'get',
    params: {
      teacherId, type
    }
  })
}

export function getEnergyScoreDetailsTimeLine(teacherId, type, page) {
  return request({
    url: prefix + '/detail/energy/timeLine',
    method: 'get',
    params: {
      teacherId, type, page
    }
  })
}

export function getAppraisalScoreDetailsLineChart(teacherId) {
  return request({
    url: prefix + '/detail/appraisal/lineChart',
    method: 'get',
    params: {
      teacherId
    }
  })
}

export function getAppraisalScoreDetailsTimeLine(teacherId, page) {
  return request({
    url: prefix + '/detail/appraisal/timeLine',
    method: 'get',
    params: {
      teacherId, page
    }
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
