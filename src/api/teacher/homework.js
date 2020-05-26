import request from '@/utils/request'

export function homeworkNotice() {
  return request({
    url: `api/mobile/work`,
    method: 'get'
  })
}

//提交作业通知
 export function submitNotice(data) {
   return request({
     url: `api/mobile/work`,
     method: 'post',
     data
   })
 }

 // 获取评语
export function commentsList() {
  return request({
    url: `api/mobile/work/comment`,
    method: 'get'
  })
}

// 新增评语
export function addCommentsConfirm(data) {
  return request({
    url: `/api/mobile/work/comment`,
    method: 'post',
    data
  })
}
// 修改评语
export function modifyCommentsSub(id, data) {
  return request({
    url: `/api/mobile/work/${id}/comment`,
    method: 'put',
    data
  })
}
//删除评语
export function deleteCommentsSub(id) {
  return request({
    url: `/api/mobile/work/${id}/comment`,
    method: 'delete'
  })
}

// 确定录入作业
export function confirmRecordHomework(data) {
  return request({
    url: `/api/mobile/work`,
    method: 'post',
    data
  })
}
//获取 某个日期下的 历史作业记录
export function dateHistoryHomework(date) {
  return request({
    url: `api/mobile/work/${date}/history`,
    method: 'get'
  })
}
//查询详情
export function detailInfo(id, date) {
  return request({
    url: `api/mobile/work/${id}/${date}/detail`,
    method: 'get'
  })
}

// 新版-作业通知
export function getHomeworkNoticeData() {
  return request({
    url: `/api/mobile/work/index`,
    method: 'get'
  })
}

// 新版-提交作业通知
export function postHomeworkNoticeData(data) {
  return request({
    url: `/api/mobile/work/add`,
    method: 'post',
    data,
  })
}

// 新版-历史作业通知
export function getHomeworkNoticeHistory(clsId, date) {
  return request({
    url: `/api/mobile/work/${clsId}/historyNew`,
    method: 'get',
    params: {
      clsId, date
    },
  })
}

// 获取作业流程
export function getHomeworkProcess() {
  return request({
    url: '/api/mobile/wontEducation/homeworkProcess',
    method: 'get',
  })
}

// 获取作业流程-开始时间结束时间
export function getHomeworkProcessTime() {
  return request({
    url: '/api/mobile/wontEducation',
    method: 'get',
  })
}


// 获取线上作业点评待点评列表
export function getOnlineHomeworkReviewPendingList(params) {
  return request({
    url: '/api/mobile/online/homework/forReview',
    method: 'get',
    params
  })
}

// 获取线上作业点评已点评列表
export function getOnlineHomeworkReviewFinishList(params) {
  return request({
    url: '/api/mobile/online/homework/hasReview',
    method: 'get',
    params
  })
}

// 获取线上作业点评过滤选项
export function getOnlineHomeworkReviewFilterOptions(params) {
  return request({
    url: '/api/mobile/online/homework/collection',
    method: 'get',
    params
  })
}

// 提交线上作业点评
export function submitOnlineHomeworkReview(workId,data) {
  return request({
    url: `/api/mobile/online/homework/${workId}`,
    method: 'post',
    data
  })
}
