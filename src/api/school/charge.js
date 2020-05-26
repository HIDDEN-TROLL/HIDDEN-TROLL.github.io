import request from '@/utils/request'

// 获取收费列表
export function getChargeList(params) {
  return request({
    url: `/api/common/school/charge`,
    method: 'get',
    params
  })
}

// 给某账单提交反馈
export function postFeedback(billId, content) {
  return request({
    url: `/api/common/school/charge/${billId}/feedback`,
    method: 'post',
    data: {
      content
    }
  })
}

// 获取最新的反馈结果
export function getLatestFeedback(billId) {
  return request({
    url: `/api/common/school/charge/${billId}/feedback/latest`,
    method: 'get',
  })
}

// 下单并获取订单内容(用于确认付款页面)
export function getOrder(billId) {
  return request({
    url: `/api/common/school/charge/${billId}/order`,
    method: 'get',
  })
}

// 下单并获取订单内容(用于确认付款页面)
export function confirmOrder(orderTid, sign, expired) {
  return request({
    url: `/api/wechat/pay/order/${orderTid}`,
    method: 'post',
    data: {
      sign, expired
    }
  })
}

// 获取有进行收费的月份
export function getAvailableChargeDates() {
  return request({
    url: `/api/common/school/charge/availableDates`,
    method: 'get',
  })
}

// 获取年费收费内容
export function getChargeContentYearly(params) {
  return request({
    url: `/api/common/school/charge/yearly`,
    method: 'get',
    params
  })
}
