import request from '@/utils/request'

// 每日简报->教师端其他内容
export function ExchangePrizes(){
    return request({
        url: '/api/mobile/safflower/mall/student',
        method: 'get',

    })
}