import request from '@/utils/request'

// 每日简报->校长端
export function SDailyBriefing(from,template_id){
    return request({
        url: '/api/mobile/briefing/school/index',
        method: 'get',
        params: {
            from,template_id
        }
    })
}


// 每日简报-> 校长端其他内容
export function SOther(from,template_id){
    return request({
        url: '/api/mobile/briefing/school/other',
        method: 'get',
        params:{
            from,template_id
        }
    })
}


