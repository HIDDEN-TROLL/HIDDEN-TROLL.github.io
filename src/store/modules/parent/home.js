import { getHomepageData } from '@/api/parent/home'
import { getParamFromUrlAndRoute } from '@/utils'

let fetchHomeDataPromise = null

export default {
  name: 'parentHome',
  namespaced: true,
  state: {
    showBottomTabBar: true,
    homePageData: [],
  },
  mutations: {
    setIsShowBottomTabBar(state, isShow) {
      state.showBottomTabBar = isShow
    },
    setHomePageData(state, data) {
      state.homePageData = data
    },
  },
  actions: {
    fetchHomeData({ commit }) {
      if (fetchHomeDataPromise === null) {
        const params = {}
        const templateId = getParamFromUrlAndRoute('template_id')
        if (templateId) {
          params.from = 'template'
          params.template_id = templateId
        }
        fetchHomeDataPromise = getHomepageData(params)
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
