import request from '@/utils/request'

//获取校区月总指数
export function CampusMonthindex(date) {
    return request({
        url: '/api/mobile/indexdetails/'+ date +'/monthIndex',
        method: 'get',

    })
}
// 获取教师月指数
export function TeacherMonthindex(date) {
        return request({
            url: '/api/mobile/indexdetails/'+ date +'/teacherMonthIndex',
            method: 'get',
        })
    }

// 获取教师月指数详情
export function TeacherMes(uid,date) {
        return request({
            url: '/api/mobile/indexdetails/'+ uid +'/'+ date +'/teacherIndexDetail',
            method: 'get',
        })
    }


//
