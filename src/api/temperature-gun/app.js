import request from '@/utils/request'

// 获取今日体温
export function getStudentList(classId) {
    return request({
        url: `/api/mobile/body-temperature`,
        method: 'get',
        params: {
            classId
        }
    })
}

// 提交学生体温
export function submitBodyTemperature(data) {
    return request({
        url: `/api/mobile/body-temperature`,
        method: 'post',
        data
    })
}

// 历史记录
export function getHistory(params) {
    return request({
        url: `/api/mobile/body-temperature/history`,
        method: 'get',
        params
    })
}


// TODO 每周简报-获取教师每周学生评价列表（手动推送）
export function StuList(){
    return request({
        url: '/api/mobile/weekBriefing/evaluation/student',
        method: 'get',
    })
}

// 获取班级列表
export function selectClassList(page, pageSize) {
    return request({
        url: '/api/common/manage/class',
        method: 'get',
        params: {
            page, pageSize
        }
    })
}

// 今日体温-new
export function GetClassTemperature(classId){
    return request({
        url: '/api/mobile/app/temperature',
        method: 'get',
        params:{
            classId
        }
    })
}

// 历史体温
export function History(data){
    return request({
        url: '/api/mobile/app/temperature/history',
        method: 'get',
        params:data
    })
}
// 提交体温
export function UploadTemperature(data){
    return request({
        url: '/api/mobile/app/temperature',
        method: 'post',
        // params:{stuId,temperature}
        // params:{temperatures}
        data
    })
}
// 学生个人体温详情
export function StuPerTemperature(data){
    return request({
        url: '/api/mobile/app/temperature/details',
        method: 'get',
        params:data
    })
}
