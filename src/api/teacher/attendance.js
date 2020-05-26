import request from "@/utils/request";

// 教师考勤报表
export function Report(date){
    return request({
        url: '/api/common/attendance/teacher/report',
        method: 'get',
        params:{
            date
        }
    })
}

// 获取某个教师的考勤记录
export function TeacherReport(queryData){
    return request({
        url: '/api/common/attendance/teacher/record',
        method: 'get',
        params: queryData
    })
}
