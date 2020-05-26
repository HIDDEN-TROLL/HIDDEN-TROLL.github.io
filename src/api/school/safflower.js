import request from '@/utils/request'

export function getSafflowerRank(type,data) {
  return request({
    url: `/api/mobile/safflower/rank/${type}`,
    method: 'get',
    params:data
  })
}

export function getSafflowerScore() {
  return request({
    url: `/api/mobile/safflower`,
    method: 'get'
  })
}

export function getSelectComment(id) {
  return request({
    url: `/api/mobile/safflower/${id}/clsComment`,
    method: 'get'
  })
}

export function addComment(data) {
  return request({
    url: `/api/mobile/safflower/comment`,
    method: 'post',
    data
  })
}

// 提交红花评分
export function submitSafflowerSwath(data) {
  return request({
    url: `/api/mobile/safflower`,
    method: 'post',
    data
  })
}

// 根据评语id查询指定评语
export function selectFixedCommment(id) {
  return request({
    url: `/api/mobile/safflower/${id}/comment`,
    method: 'get',
  })
}

// 删除评语
export function deleteComment(id) {
  return request({
    url: `/api/mobile/safflower/${id}/comment`,
    method: 'delete',
  })
}

// 修改评语
export function updateComment(id, data) {
  return request({
    url: `/api/mobile/safflower/${id}/comment`,
    method: 'put',
    data
  })
}

// 获取评语类型
export function selectCategory() {
  return request({
    url: `/api/mobile/safflower/category`,
    method: 'get',
  })
}

// 修改评语类型名称
export function modifyCommentName(id, data) {
  return request({
    url: `/api/mobile/safflower/${id}/category`,
    method: 'put',
    data
  })
}

// 提交评语类型的排序
export function commentTypeSort(data) {
  return request({
    url: `/api/mobile/safflower/category/sort`,
    method: 'put',
    data
  })
}

// 获取评语模板接口
export function selectCommentLibrary() {
  return request({
    url: `/api/mobile/safflower/comment/template`,
    method: 'get',
  })
}

// 导入评语
export function importComment(id, data) {
  return request({
    url: `/api/mobile/safflower/import/${id}/template`,
    method: 'post',
    data
  })
}

// 红花档案
export function flowerArchives() {
  return request({
    url:`/api/mobile/safflower/record`,
    method:'get'
  })
}

// 红花档案 回复
export function simpleReply(id, data) {
  return request({
    url:`/api/mobile/safflower/${id}/reply`,
    method:'post',
    data
  })
}

// 学生成长分析
export function studentGrowthAnay(id) {
  return request({
    url:`/api/mobile/safflower/student/${id}/growth`,
    method:'get',
  })
}

// 月份图表分析
export function monthEchartsAnay(id, date) {
  return request({
    url:`/api/mobile/safflower/student/${id}/${date}/monthChart`,
    method:'get',
  })
}

// 待我回复列表
export function waitReplyList(id, page) {
  return request({
    url:`/api/mobile/safflower/record/${id}/details/${page}`,
    method:'get'
  })
}

// 获取校区红花初始值
export function selectSafflowerInitial() {
  return request({
    url:`/api/mobile/safflower/safflowerInitial`,
    method:'get'
  })
}

// 设置红花初始值
export function setSafflowerInitial(data) {
  return request({
    url:`/api/mobile/safflower/storeSafflowerInitial`,
    method:'post',
    data
  })
}

// 生成学生分享数据
export function studentsShareD() {
  return request({
    url:`/api/mobile/safflower/share`,
    method:'get'
  })
}

// 获取学生成长分享数据
export function operateShareD(data) {
  return request({
    url:`/api/mobile/safflower/share/type`,
    method:'post',
    data
  })
}
// 获取JSSDK配置
export function wxJssdk() {
  return request({
    url:`/api/wechat/jssdk`,
    method:'get'
  })
}

// 红花商城
export function flowerMall() {
  return request({
    url:`/api/mobile/safflower/mall`,
    method:'get'
  })
}

// 查询商品兑奖记录
export function exchangeRecord(id, beginTime, endTime) {
  let url = (!beginTime || !endTime) ? `api/mobile/safflower/mall/convertRecord/${id}` : `api/mobile/safflower/mall/convertRecord/${id}/${beginTime}/${endTime}`
  return request({
    url:url,
    method:'get'
  })
}

// 红花管理 新增商品
export function addGift(data) {
  return request({
    url:`/api/mobile/safflower/mall`,
    method:'post',
    data
  })
}

// 商品上传
/*export function getUploadOssUrl(fileType, functionType, numbers) {
  return request({
    url: `/api/common/misc/oss/url`,
    method: 'get',
    params: {
      fileType, functionType, numbers
    }
  })
}*/

// 查询指定商品
export function selectGift(id) {
  return request({
    url:`/api/mobile/safflower/${id}/mall`,
    method:'get'
  })
}

// 修改商品
export function modifyGiftInfo(id, data) {
  return request({
    url:`/api/mobile/safflower/${id}/mall`,
    method:'post',
    data
  })
}

// 删除商品
export function deleteGiftInfo(id) {
  return request({
    url:`/api/mobile/safflower/${id}/mall`,
    method:'delete',
  })
}

// 红花清零
export function flowerReset(data) {
  return request({
    url:`/api/mobile/safflower/empty`,
    method:'post',
    data
  })
}




// 2.0+ 习惯点评

// 新版习惯点评评语
export function getEvaluationComment() {
  return request({
    url:`/api/mobile/safflower/wontComment`,
    method:'get',
  })
}

// 新版习惯点评评语
export function submitEvaluation(data) {
  return request({
    url:`/api/mobile/safflower/add`,
    method:'post',
    data
  })
}


// 撤销兑换物品
export function revokeExchange(id) {
  return request({
    url:`/api/mobile/safflower/mall/revokeExchange/${id}`,
    method:'get',

  })
}













