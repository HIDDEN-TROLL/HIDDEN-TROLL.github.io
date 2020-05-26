import request from '@/utils/request'

// 提交 兑换商品
export function exchangePrize(data) {
  return request({
    url: '/api/mobile/safflower/mall/exchange',
    method: 'post',
    data
  })
}

// 红花商城
export function flowerMall() {
  return request({
    url: '/api/mobile/safflower/mall',
    method: 'get'
  })
}

// 红花商城 学生列表
export function flowerStudent() {
  return request({
    url: '/api/mobile/safflower/mall/student',
    method: 'get'
  })
}