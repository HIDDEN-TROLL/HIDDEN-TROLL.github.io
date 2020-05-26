import request from '@/utils/request'

// 每日简报->教师端其他内容
export function OtherWork(from,template_id){
    return request({
        url: '/api/mobile/briefing/staff/other',
        method: 'get',
        params:{
            from,template_id
        }
    })
}

// 每日简报->教师端
export function WorkSituation(from,template_id){
    return request({
        url: '/api/mobile/briefing/staff/index',
        method: 'get',
        params:{
            from,template_id
        }
    })
}
