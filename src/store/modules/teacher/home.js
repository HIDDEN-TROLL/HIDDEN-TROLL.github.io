import { getHomepageData } from '@/api/teacher/home'

let fetchHomeDataPromise = null

export default {
  name: 'teacherHome',
  namespaced: true,
  state: {
    showBottomTabBar: true,
    homePageData: [],
  },
  mutations: {
    setIsShowBottomTabBar(state, isShow) {
      if (Array.isArray(state.homePageData) && state.homePageData.length <= 1) {
        state.showBottomTabBar = false
        return
      }
      state.showBottomTabBar = isShow
    },
    setHomePageData(state, data) {
      state.homePageData = data
    },
  },
  actions: {
    fetchHomeData({ commit }) {
      if (fetchHomeDataPromise === null) {
        fetchHomeDataPromise = getHomepageData()
          .then(response => {
            commit('setHomePageData', response.data.data)
          })
      }
      return fetchHomeDataPromise
    },
    getPageExtraData({ state }, pageTarget) {
      if (!Array.isArray(state.homePageData)) {
        return null
      }
      const data = state.homePageData.find(item => item.target === pageTarget)
      return data !== undefined && data.extra !== undefined ? data.extra : null
    },
  },
}
