import request from '@/utils/request'

// 购买记录
export function getPurchaseHistory(data) {
  return request({
    url: '/api/mobile/course/mall/purchase/history',
    method: 'get',
    params: data
  })
}
