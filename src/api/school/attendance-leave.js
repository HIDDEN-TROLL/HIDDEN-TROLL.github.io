import request from '@/utils/request'



// 请假-获取所有班级学生列表
export function getLeaveCls() {
    return request({
        url: '/api/common/misc/student/class_student',
        method: 'get',
    })
}

// 请假-查询学生请假记录
export function getStuRecord(stuId,startDate,endDate) {
    return request({
        url: '/api/mobile/leave/studentDetailes',
        method: 'get',
        params:{
            stuId,startDate,endDate
        }
    })
}

// 请假-请假记录的日期查询
export function getLeaveMes(filterType,startDate,endDate) {
    return request({
        url: '/api/mobile/leave/dateList',
        method: 'get',
        params:{filterType,startDate,endDate}
    })
}


// 请假-提交请假
export function Leave(stuId,attendId,clsId,date) {
    return request({
        url: '/api/mobile/leave',
        method: 'post',
        params:{stuId,attendId,clsId,date}
    })
}






