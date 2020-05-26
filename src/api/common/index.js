import request from '@/utils/request'

export function getAccountList(all) {
  return request({
    url: '/api/common/account',
    method: 'get',
    params: {
      all: all ? 1 : 0
    }
  })
}

export function switchAccount(data) {
  return request({
    url: '/api/common/account',
    method: 'post',
    data
  })
}

export function getUploadOssUrl(fileType, functionType, numbers) {
  return request({
    url: '/api/common/misc/oss/url',
    method: 'get',
    params: {
      fileType, functionType, numbers
    }
  })
}

// 获取临时的草稿oss地址, 有效期3天
export function getShortTermSignedOssUrl(objectKeys) {
  return request({
    url: '/api/common/misc/oss/short_term_signed_url',
    method: 'post',
    data: {
      objectKeys
    }
  })
}

// 获取当前学校的所有班级的基本信息
export function getAllClass(all, params = {}) {
  return request({
    url: '/api/common/misc/school/all_class',
    method: 'get',
    params: Object.assign({
      all: all ? 1 : 0
    }, params)
  })
}

// 获取当前学校的所有年级
export function getAllGrade() {
  return request({
    url: '/api/common/misc/school/all_grade',
    method: 'get',
  })
}

// 获取当前学校所在公众号的公司名
export function getCompanyName() {
  return request({
    url: '/api/common/misc/company/name',
    method: 'get',
  })
}
