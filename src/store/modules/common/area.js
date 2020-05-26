import { getPath, getNextLevelList } from '@/api/common/area'

function formatData(list) {
  return list.map(item => {
    return {
      value: item.id,
      label: item.name,
    }
  })
}

function isNeedLoad(list, areaIdPath) {
  if (areaIdPath === 0 || (areaIdPath.length === 1 && areaIdPath[0] === 0)) {
    return true
  }
  if (areaIdPath.length > 2) { // 只要省市区
    return false
  }

  const level = findLevel(list, areaIdPath)
  if (level !== undefined && level.children !== undefined && level.children.length > 0) {
    return false
  }

  return true
}

function findLevel(list, areaIdPath) {
  areaIdPath = Array.from(areaIdPath)
  let areaId = areaIdPath.shift()
  let level = list.find(p => p.value === areaId)
  const length = areaIdPath.length
  for (let i = 0; i < length; i++) {
    areaId = areaIdPath.shift()
    level = level.children.find(p => p.value === areaId)
  }
  return level
}

const area = {
  name: 'area',
  namespaced: true,
  state: {
    loading: false,
    list: [],
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },
    updateList(state, [areaIdPath, list]) {
      if (!Array.isArray(list) || list.length === 0) {
        return
      }

      list = formatData(list)

      if (areaIdPath === 0 || areaIdPath.length === 1) {
        list = list.map(item => {
          item.children = []
          return item
        })
      }

      if (areaIdPath === 0 || (areaIdPath.length === 1 && areaIdPath[0] === 0)) {
        state.list = list
        return
      }

      const level = findLevel(state.list, areaIdPath)
      // console.log(level, state.list, areaIdPath)
      level.children = list
    },
  },
  actions: {
    async LoadNextLevel({ commit, state }, areaIdPath) {
      // console.log(areaIdPath)
      if (!Array.isArray(areaIdPath)) {
        areaIdPath = Number.isInteger(areaIdPath) ? [areaIdPath] : [0]
      } else if (areaIdPath.length === 0) {
        areaIdPath.push(0)
      }

      if ((areaIdPath === 0 || (areaIdPath.length === 1 && areaIdPath[0] === 0)) && state.list.length > 0) {
        return Promise.resolve()
      }
      if (!isNeedLoad(state.list, areaIdPath)) {
        return Promise.resolve()
      }

      const targetAreaId = areaIdPath[areaIdPath.length - 1]
      commit('setLoading', true)
      return getNextLevelList(targetAreaId)
        .then(response => {
          const list = response.data.meta.success ? response.data.data : []
          commit('updateList', [areaIdPath, list])
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async GetAreaIdPath({ dispatch, commit }, areaId) {
      commit('setLoading', true)
      const response = await getPath(areaId)
      commit('setLoading', false)
      const idPath = response.data.meta.success ? response.data.data.idPath : []
      await dispatch('CheckAreaListLoaded', idPath)
      return idPath
    },
    async CheckAreaListLoaded({ dispatch }, idPath) {
      if (!Array.isArray(idPath) || idPath.length === 0) {
        return Promise.resolve()
      }

      for (let length = 1; length < idPath.length + 1; length++) {
        await dispatch('LoadNextLevel', idPath.slice(0, length))
      }
      return Promise.resolve()
    },

  },
}

export default area
