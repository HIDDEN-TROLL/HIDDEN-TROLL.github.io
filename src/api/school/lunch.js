import request from '@/utils/request'

// 午休与用餐-教师/校长端
export function getSiestaData() {
  return request({
    url: `/api/common/siesta`,
    method: 'get',
  })
}

// 提交学生午休与用餐表示
export function submit(data) {
  return request({
    url: `/api/common/siesta`,
    method: 'post',
    data
  })
}

// 新增评语
export function createComment(type, comment) {
  return request({
    url: `/api/common/siesta/comment`,
    method: 'post',
    data: {
      type, comment,
    }
  })
}

// 修改评语
export function modifyComment(commentId, type, comment) {
  return request({
    url: `/api/common/siesta/comment`,
    method: 'put',
    data: {
      commentId, type, comment,
    }
  })
}

// 历史记录
export function getHistory(clsId, date) {
  return request({
    url: `/api/common/siesta/history`,
    method: 'get',
    params: {
      clsId, date
    }
  })
}


// 午休用餐修改状态的排序
export function Changestatus(data) {
  return request({
    url: `/api/common/siesta/comment/sort`,
    method: 'post',
    data
  })
}

///



// 获取状态管理
export function getStatusList() {
  return request({
    url: `/api/common/siesta/commentManage`,
    method: 'get',
  })
}

// 新增状态
export function createStatus(type, category, comment) {
  return request({
    url: `/api/common/siesta/comment`,
    method: 'post',
    data: {
      type, category, comment,
    }
  })
}

// 修改状态
export function modifyStatus(commentId, type, category, comment) {
  return request({
    url: `/api/common/siesta/comment`,
    method: 'put',
    data: {
      commentId, type, category, comment,
    }
  })
}

// 删除状态
export function deleteStatus(commentId) {
  return request({
    url: `/api/common/siesta/${commentId}/comment`,
    method: 'delete',
  })
}

// 获取详情
export function getLunchDetails() {
  return request({
    url: `/api/common/siesta/detaile`,
    method: 'get',
  })
}

// 获取学生的午休与用餐详情
export function getStudentLunchDetails(stuId, date) {
  return request({
    url: `/api/common/siesta/student/detaile`,
    method: 'get',
    params: {
      stuId, date
    }
  })
}
