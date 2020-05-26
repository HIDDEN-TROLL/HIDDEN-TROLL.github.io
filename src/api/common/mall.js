import request from '@/utils/request'

// 获取商城首页
export function getMallIndex(data) {
  return request({
    url: '/api/mobile/course/mall',
    method: 'get',
    params: data
  })
}

// 获取商城列表
export function getGoodsList(data) {
  return request({
    url: '/api/mobile/course/mall/list',
    method: 'get',
    params: data
  })
}

// 获取详情
export function getGoodsDetail(data) {
  return request({
    url: '/api/mobile/course/mall/detail/' + data.id,
    method: 'get',
    params: data
  })
}

// 获取订单
export function getGoodsOrder(goodsId) {
  return request({
    url: '/api/mobile/course/mall/detail/' + goodsId + '/order',
    method: 'get'
  })
}

// 确认提交订单
export function confirmGoodsOrder(goodsId) {
  return request({
    url: '/api/mobile/course/mall/order',
    method: 'post',
    data: {
      goodsId
    }
  })
}

// 新的接口=======================

// 获取商城列表
export function getList(categoryId) {
  return request({
    url: '/api/mobile/system/mall/list',
    method: 'get',
    params: {categoryId}
  })
}
// 课程详情
export function getdetailList(id,data) {
  return request({
    url: `/api/mobile/system/mall/detail/${id}`,
    method: 'get',
    params: data

  })
}
// 提交课程购买记录
export function placeOrder(data) {
  return request({
    url: `/api/mobile/system/mall`,
    method: 'post',
    data: data
  })
}
// 购买记录
export function orderRecord(nextId) {
  return request({
    url: '/api/mobile/system/mall/record',
    method: 'get',
    params: {nextId}
  })
}
// 轮播图
export function carouselList(categoryId) {
  return request({
    url: `/api/mobile/system/mall/carousel`,
    method: 'get',
    params: {categoryId}
  })
}
// 获取订单支付状态和信息
export function orderStatus(recordId) {
  return request({
    url: '/api/mobile/system/mall/order',
    method: 'get',
    params: {recordId}
  })
}

// 课程商城消息推送
export function template(from,template_id) {
  return request({
    url: `/api/mobile/system/mall/template`,
    method: 'get',
    params: {from,template_id}
  })
}
// 获取订单支付状态
export function getStatus(order) {
  return request({
    url: '/api/mobile/system/mall/pay/statuss',
    method: 'post',
    params: {order}
  })
}
