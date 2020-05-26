import request from '@/utils/request'

// 每日简报->家长端
export function PDailyBriefing(from,template_id){
    return request({
        url: '/api/mobile/briefing/parent/index',
        method: 'get',
        params: {
            from,template_id
        }
    })
}

// 点赞简报
export function Sendlike(date){
    return request({
        url: '/api/mobile/briefing/like',
        method: 'post',
        params: {
            date
        }
    })
}

// 每日简报->家长端-其他动态
export function POther(from,template_id){
    return request({
        url: '/api/mobile/briefing/parent/other',
        method: 'get',
        params: {
            from,template_id
        }
    })
}

// 每周简报->家长端-每周情况
export function PWeekBriefing(from,template_id){
    return request({
        url: '/api/mobile/weekBriefing/parent/index',
        method: 'get',
        params: {
            from,template_id
        }
    })
}

// 每周简报->家长端-提交服务评分
export function Submitscore(data){
    return request({
        url: '/api/mobile/weekBriefing/parent/score',
        method: 'post',
        params: data
    })

}

// 每周简报->家长端-评论
export function Addreview(safflowerId,content){
    return request({
        url: '/api/mobile/safflower/' + safflowerId + '/review',
        method: 'post',
        params: {content}
    })
}

//  每周简报-获取教师每周学生评价列表（手动推送）
export function StuList(){
    return request({
        url: '/api/mobile/weekBriefing/evaluation/student',
        method: 'get',
    })
}

//  每周简报-提交学生评价（自动推送/提交评价）
export function SendComment(stuId,comment){
    return request({
        url: '/api/mobile/weekBriefing/evaluation/add',
        method: 'post',
        params:{stuId,comment}
    })
}

// //  每周简报-学生评价历史记录（历史记录）
// export function HistoryList(year,week){
//     return request({
//         url: '/api/mobile/weekBriefing/evaluation/history',
//         method: 'get',
//         params:{year,week}
//     })
// }

//  每周简报-学生评价历史记录（历史记录）---新版
export function HistoryList(year,week){
    return request({
        url: '/api/mobile/weekBriefing/evaluation/students',
        method: 'get',
        params:{year,week}
    })
}
//  每周简报->教师端-学生简报详情
export function HistoryStuMes(stuId,weekId){
    return request({
        url: '/api/mobile/weekBriefing/evaluation/history',
        method: 'get',
        params:{stuId,weekId}
    })
}

//  每周简报-获取每周学生推送情况（自动推送）
export function GetStuStatus(year,week){
    return request({
        url: '/api/mobile/weekBriefing/automatic/student',
        method: 'get',
        params:{year,week}
    })
}

//  每周简报-获取学校周报推送方式
export function GetType(){
    return request({
        url: '/api/mobile/weekBriefing/evaluation/config',
        method: 'get',
    })
}

//  每周简报-修改学校周报推送方式
export function ChangeType(status){
    return request({
        url: '/api/mobile/weekBriefing/evaluation/config',
        method: 'post',
        params:{status}
    })
}

//  每周简报-推送学生每周周报
export function SendBriefing(){
    return request({
        url: '/api/mobile/weekBriefing/evaluation/send',
        method: 'post',
    })
}

//  每周简报-获取学生单篇评价
export function GetSends(stuId,time,chapter){
    return request({
        url: '/api/mobile/weekBriefing/evaluation/student/alone',
        method: 'get',
        params:{stuId,time,chapter}
    })
}

//  每周简报-获取学生单篇评价
export function GetParentsInformation(from,template_id){
    return request({
        url: '/api/mobile/feeReminder/parent',
        method: 'get',
        params: {
            from,template_id
        }
    })
}


