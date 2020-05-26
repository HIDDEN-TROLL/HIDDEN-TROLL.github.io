import request from '@/utils/request'

// 返回成绩首页返回的下拉框内容
export function getCollection() {
  return request({
    url: `/api/mobile/score/collection`,
    method: 'get',
  })
}

// 返回成绩首页学生列表 clsId班级id
export function getScoreStudent(clsId) {
  return request({
    url: `/api/mobile/score/${clsId}`,
    method: 'get',
  })
}

// 获取学生最后一次录入的成绩 termValue:学期 stuId:学生id
export function getLastScore(termValue, stuId) {
  return request({
    url: `/api/mobile/score/student/${termValue}/${stuId}/lastScore`,
    method: 'get',
  })
}
//删除单元
export function deleteUnit(params) {
  return request({
    url: `/api/mobile/score/unit/${params.unitId}`,
    method: 'delete',
    params: params
  })
}
// 修改单元 unitId:单元Id
export function mdfUnit(params) {
  return request({
    url: `/api/mobile/score/unit/${params.unitId}`,
    method: 'put',
    params: params
  })
}
// 获取单元列表
export function getUnit() {
  return request({
    url: `/api/mobile/score/unit`,
    method: 'get',
  })
}
//新增单元 name:单元名称
export function postUnit(params) {
  return request({
    url: `/api/mobile/score/unit`,
    method: 'post',
    params: params
  })
}
// 获取学生档案列表 clsId:班级id subject:	查看科目（默认科目第一个）
export function getScoreRecord(clsId, subject) {
  return request({
    url: `/api/mobile/score/${clsId}/${subject}/record`,
    method: 'get',
  })
}
// 获取学生成绩详情 stuId:学生id subject:	课程id,1语文2数学3英语
export function getScoreDetails(stuId, subject, templateId=undefined) {
  const params = {}
  if (templateId) {
    params.from = 'template'
    params.template_id = templateId
  }
  return request({
    url: `/api/mobile/score/student/${stuId}/${subject}/details`,
    method: 'get',
    params
  })
}

// 修改红花机制的设置
// params{ mainSwitch:	总开关1打开2关闭（关闭时下列参数都不需要）,
//        progressScore:{
//                    progressSwitch:	进步红花奖励开关1打开2关闭（关闭时不需要下列参数）,
//                             value: 	进步奖励红花数
//                       },
//           reachScore:{
//                     reachSwitch: 	成绩达到分数红花红花开关1打开2关闭（关闭时不需要下列参数）,
//                           value: 	进步奖励红花数,
//                             cls:  {
//                                     clsId:	班级id
//                                     score: 需要达到的成绩
//                                    }
//                       },
//
//      }
export function putMechanisms(params) {
  return request({
    url: `/api/mobile/score/mechanisms`,
    method: 'put',
    params: params
  })
}

//获取红花机制
export function getMechanisms() {
  return request({
    url: `/api/mobile/score/mechanisms`,
    method: 'get',
  })
}

//修改成绩
// params:{scoreId:	成绩id,subjectValue:科目id,unitId:单元id,score:分数}
export function putStudentScores(params) {
  return request({
    url: `/api/mobile/score/student/${params.scoreId}/edit`,
    method: 'put',
    params: params
  })
}

//修改成绩
// params:{stuIds:学生id,termValue:	学期值,subjectValue:科目值,unitValue:单元值,scores:学生的成绩(成绩的下标对于学生id的下标)，如学生数组[1,2]，成绩数组[100,20]，则id1的学生成绩是100，id2的学生成绩是20}
export function postStudentScores(params) {
  return request({
    url: `/api/mobile/score`,
    method: 'post',
    params: params
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

// 获取修改分数所有班级学生列表
export function changescoreClass() {
  return request({
    url: '/api/common/misc/student/class_student',
    method: 'get',
  })
}

// 获取学生的成绩列表
export function getStudentScore(stuId,filterType,startDate,endDate) {
  return request({
    url: `/api/mobile/score/student/${stuId}/scores`,
    method: 'get',
    params:{
      filterType,startDate,endDate
    }
  })
}

// 删除学生成绩
export function deleteScore(scoreId) {
  return request({
    url: `/api/mobile/score/student/${scoreId}/delete`,
    method: 'delete',
  })
}
// 修改学生成绩
export function changeScore(scoreId,termValue,subjectValue,unitValue,score) {
  return request({
    url: `/api/mobile/score/student/${scoreId}/edit`,
    method: 'put',
    params:{
      termValue,subjectValue,unitValue,score
    }
  })
}
