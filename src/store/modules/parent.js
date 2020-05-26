function getHomeData(state, target, defaultReturn) {
  if (!Array.isArray(state.homePageData)) {
    return defaultReturn
  }
  const data = state.homePageData.find(item => item.target === target)
  return data !== undefined && data.extra !== undefined ? data.extra : defaultReturn
}

const teacher = {
  state: {
    homePageData: []
  },

  mutations: {
    SET_PARENT_HOME_PAGE_DATA: (state, data) => {
      state.homePageData = data
    },
  },

  actions: {
  },

  getters: {
    getParentHomeIndexData(state) {
      return getHomeData(state, 'ParentHomeIndex', [])
    },
    getParentHomeEducationData(state) {
      return getHomeData(state, 'ParentHomeEducation', [])
    },
    getParentHomeMyData(state) {
      return getHomeData(state, 'ParentHomeMy', {})
    },
  }
}

export default teacher
