import request from '@/utils/request'

// 审核列表
export function dynamicAudit(){
  return request({
    url: '/api/mobile/community/myCheck',
    method: 'get',
  })
}
