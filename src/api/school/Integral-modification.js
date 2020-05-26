import request from '@/utils/request'

// 积分修改->学生小红花
export function StuFlower(){
    return request({
        url: '/api/mobile/integral/safflower',
        method: 'get',

    })
}

// 积分修改->学生小红花->奖惩小红花数量
export function ChangeFlower(type,behaviors){
    return request({
        url: '/api/mobile/integral/behavior',
        method: 'post',
        traditional:true,
        data:{type,behaviors},
    })
}

// 积分修改->学生小红花->习惯评语
export function Changecomment(id,number){
    return request({
        url: '/api/mobile/integral/comment',
        method: 'post',
        params:{id,number}
    })
}

// 积分修改->学生小红花->成绩管理
export function ChangeScore(data){
    return request({
        url: '/api/mobile/integral/score',
        method: 'post',
        params:data
    })
}

// 积分修改->家长积分
export function ParentP(){
    return request({
        url: '/api/mobile/integral/parent',
        method: 'get',

    })
}

// 积分修改->家长积分/修改
export function ChangeParentP(data){
    return request({
        url: '/api/mobile/integral/attention',
        method: 'post',
        params:data
    })
}

// 积分修改->教师成就值
export function TeacherTask(){
    return request({
        url: '/api/mobile/integral/staffTask',
        method: 'get',

    })
}

// 积分修改->教师成就值/修改
export function ChangeTeacherTask(data){
    return request({
        url: '/api/mobile/integral/task',
        method: 'post',
        params:data
    })
}



// 积分修改->教师成就值/修改
export function DeleteScore(id){
    return request({
        url: `api/mobile/integral/score/${id}`,
        method: 'delete',
        params:{id}
    })
}


