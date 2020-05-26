import request from '@/utils/request'

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
export function classList(params) {
  return request({
    url: '/api/common/manage/class',
    method: 'get',
    params
  })
}

// 添加班级列表
export function addClass(data) {
  return request({
    url: '/api/common/manage/class',
    method: 'post',
    data
  })
}

// 更新班级列表
export function updateClass(id, data) {
  return request({
    url: '/api/common/manage/class/' + id,
    method: 'put',
    data
  })
}

// 获取班级详情
export function selectClassDetail(id) {
  return request({
    url: `/api/common/manage/class/${id}`,
    method: 'get',
  })
}

// 删除班级
export function deleteClass(id) {
  return request({
    url: `/api/common/manage/class/${id}`,
    method: 'delete',
  })
}

// 班级管理 获取班级一些统计信息
export function classStatisticalInfo() {
  return request({
    url: '/api/common/manage/class/info',
    method: 'get',
  })
}

// 将学生分配到某个班级内
export function distriStudent(id, data) {
  return request({
    url: `/api/common/manage/class/${id}/add_student`,
    method: 'put',
    data
  })
}

// 获取当前学校所有未分班的学生
export function divideClass() {
  return request({
    url: `/api/common/misc/school/student_not_in_class`,
    method: 'get',
  })
}

// 分配教师到这个班级
export function replaceTeacher(id, data) {
  return request({
    url: `/api/common/manage/class/${id}/teacher`,
    method: 'put',
    data
  })
}

// 更新排序
export function updateSort(list) {
  return request({
    url: '/api/common/manage/class/sort',
    method: 'post',
    data: {
      list
    }
  })
}


// 新老学生退班
export function DeleteClassStu(class_id,student_id) {
  return request({
    url: `/api/common/manage/class/${class_id}/student/${student_id}`,
    method: 'delete',
  })
}
