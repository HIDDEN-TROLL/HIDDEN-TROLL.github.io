import request from '@/utils/request'

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
    data,
  })
}

export function getChildProfile() {
  return request({
    url: '/api/mobile/home/student/my/child/profile',
    method: 'get',
  })
}

export function updateChildProfile(data) {
  return request({
    url: '/api/mobile/home/student/my/child/profile',
    method: 'put',
    data,
  })
}
