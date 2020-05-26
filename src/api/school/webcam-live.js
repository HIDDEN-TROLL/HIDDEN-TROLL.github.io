import request from '@/utils/request'

// 获取监控列表
export function getWebcamLiveList() {
  return request({
    url: '/api/mobile/webcam/list2',
    method: 'get',
  })
}

// 获取监控URL
export function getLiveUrl(cameraId) {
  return request({
    url: '/api/mobile/webcam/url',
    method: 'get',
    params: {
      cameraId
    }
  })
}
