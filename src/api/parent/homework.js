import request from '@/utils/request'

export function stuHomework(page) {
  return request({
    url: `api/mobile/work/stuWork/${page}`,
    method: 'get'
  })
}

export function getHomeworkDetail(templateId) {
  const params = {}
  if (templateId) {
    params.from = 'template'
    params.template_id = templateId
  }
  return request({
    url: '/api/mobile/work/studentHomeworkHistory',
    params
  })
}

export function getHomeworkHistory(nextId, dateStart, dateEnd, templateId) {
  const params = {
    nextId
  }
  if (dateStart) {
    params['dateStart'] = dateStart
  }
  if (dateEnd) {
    params['dateEnd'] = dateEnd
  }
  if (templateId) {
    params.from = 'template'
    params.template_id = templateId
  }
  return request({
    url: '/api/mobile/work/studentHomeworkHistoryList',
    params
  })
}

export function submitHomeworkOnlineReviewImages(data) {
  return request({
    url: '/api/mobile/online/homework',
    method: 'post',
    data
  })
}

export function getHomeworkOnlineReviewHistory(params) {
  return request({
    url: '/api/mobile/online/homework/history',
    method: 'get',
    params
  })
}
