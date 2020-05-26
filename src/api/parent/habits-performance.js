import request from '@/utils/request'

// 习惯表现->家长端
export function PwontBehavior(){
    return request({
        url: '/api/mobile/safflower/wontBehavior/index',
        method: 'get',

    })
}

// 新版家长端->红花排行
export function PFlowerRank(type,data){
    return request({
        url: '/api/mobile/safflower/wontBehavior/rank/' + type + '',
        method: 'get',
        params:data
    })
}
// 新版家长端->红花排行榜查询月有数据的日期
export function PMonthFlowerRank(){
    return request({
        url: '/api/mobile/safflower/getRecordDate',
        method: 'get',

    })
}
// 新版家长端->红花排行
export function NewMonthRank(type,year,month){
    return request({
        url: 'api/mobile/safflower/rank/'+ type +'',
        method: 'get',
        params:{type,year,month}

    })
}