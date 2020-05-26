import request from '@/utils/request'


// 培训班-获取培训班级列表
export function getTrainingList(filterType) {
    return request({
        url: '/api/mobile/training/classs',
        method: 'get',
        params:{
            filterType
        }
    })
}
// 培训班-获取培训班分班信息
export function getTraniningNumber() {
    return request({
        url: '/api/mobile/training/classs/info',
        method: 'get',
    })
}
// 培训班-新增培训班级列表
export function addTrainingList(data) {
    return request({
        url: '/api/mobile/training/classs',
        method: 'post',
        data
    })
}
// 培训班-获取培训班级详情
export function getTrainingClass(id) {
    return request({
        url: `/api/mobile/training/classs/${id}`,
        method: 'get',
    })
}
// 培训班-修改班级
export function changeTraining(id,data) {
    return request({
        url: `/api/mobile/training/classs/${id}`,
        method: 'put',
        data
    })
}
// 培训班-删除班级
export function deleteClass(id) {
    return request({
        url: `/api/mobile/training/classs/${id}`,
        method: 'delete',
    })
}
// 培训班-班级排序
export function changeClassSort(data) {
    return request({
        url: `/api/common/manage/class/sort`,
        method: 'post',
        data
    })
}
// 培训班-班级排课详情
export function getClassMes(year,month,id) {
    return request({
        url: `/api/mobile/training/arranging/${id}`,
        method: 'get',
        params:{year,month}
    })
}
// 培训班-新学生入班
export function getClassStu(data) {
    return request({
        url: `/api/common/manage/student`,
        method: 'get',
        params:data
    })
}
// 培训班-学生点名列表
export function getSigninList(id,arrangingId) {
    return request({
        url: `/api/mobile/training/rollcall/${id}`,
        method: 'get',
        params:{arrangingId}
    })
}


// 培训班-学生详情-学生考勤详情
export function getStuAttendance(clsId,stuId,data) {
    return request({
        url: `/api/mobile/training/student/attendance/${clsId}/${stuId}`,
        method: 'get',
        params:data
    })
}
// 培训班-学生详情-学生课评详情
export function getStuComment(clsId,stuId,data) {
    return request({
        url: `/api/mobile/training/student/comment/${clsId}/${stuId}`,
        method: 'get',
        params:data
    })
}
// 培训班-学生点名-获取评语列表
export function getCommentList() {
    return request({
        url: `/api/mobile/training/comment`,
        method: 'get',
    })
}
// 培训班-学生点名-提交学生课评
export function sendStuCom(data) {
    return request({
        url: `/api/mobile/training/student/comment`,
        method: 'post',
        data
    })
}
// 培训班-学生点名-入班
export function NewTrainingStudents(class_id,data) {
    return request({
        url: `/api/common/manage/class/${class_id}/student`,
        method: 'put',
        data
    })
}
// // 培训班-老学生退班
// export function DeleteTraining(class_id,student_id) {
//     return request({
//         url: `/api/common/manage/class/${class_id}/student/${student_id}`,
//         method: 'delete',
//     })
// }

// 培训班-新老学生退班
export function DeleteTraining(id,data) {
    return request({
        url: `/api/mobile/training/student/remove/${id}`,
        method: 'post',
        data
    })
}

// 培训班-未分班学生列表（培训班）
export function getUnallocatedStu(id) {
    return request({
        url: `/api/mobile/training/student_not_in_class/${id}`,
        method: 'get',
    })
}

// 培训班-家长端-查询学生培训班详情
export function getParentTraining(filterType) {
    return request({
        url: `/api/mobile/training/student/class`,
        method: 'get',
        params:{
            filterType
        }
    })
}
// 培训班-调课
export function changeClassDate(id,arrangingId,date) {
    return request({
        url: `/api/mobile/training/transfer/${id}/${arrangingId}`,
        method: 'put',
        params:{date}
    })
}

// 培训班-调课
export function endCourse(id) {
    return request({
        url: `/api/mobile/training/overdue/${id}`,
        method: 'put',
    })
}

// // 培训班-修改教师
// export function DeleteTraining(id,data) {
//     return request({
//         url: `/api/mobile/training/student/remove/${id}`,
//         method: 'post',
//         data
//     })
// }