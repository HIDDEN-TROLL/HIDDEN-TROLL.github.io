import request from '@/utils/request'

// 社区 社区首页（家长端） get
export function selectCommunityList(page, type, templateId){
  const params = {
    page, type
  }
  if (templateId) {
    params.from = 'template'
    params.template_id = templateId
  }
  return request({
    url: '/api/mobile/community/communityParent',
    method: 'get',
    params
  })
}
