import request from '@/utils/request'

//web端-新师路运营统计
export function operatelist(data) {
    return request({
        url: '/api/web/operate/statistics',
        method: 'get',
        params:data
    })
}


//分组管理
export function GroupManagement() {
    return request({
        url: '/api/web/operate/group',
        method: 'get',
    })
}


//分组管理
export function reportList(data) {
    return request({
        url: '/api/web/operate/report',
        method: 'get',
        params:data
    })
}

//收入统计
export function RevenueStatistics(data) {
    return request({
        url: '/api/mobile/newConceptRole/finance/revenue_and_expense_statistics',
        method: 'get',
        params:data
    })
}

