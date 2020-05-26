import request from '@/utils/request'

export function flowerMall() {
  return request({
    url: '/api/mobile/safflower/mall',
    method: 'get'
  })
}