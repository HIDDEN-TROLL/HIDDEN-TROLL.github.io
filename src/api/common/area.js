import request from '@/utils/request'

const prefix = 'api/common/misc/area'

export function getPath(areaId) {
  return request({
    url: prefix + '/path',
    method: 'get',
    params: {
      id: areaId
    }
  })
}

export function getNextLevelList(areaId) {
  return request({
    url: prefix + '/' + areaId,
    method: 'get',
  })
}
