function getTeacherHomeData(state, target, defaultReturn) {
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
    SET_TEACHER_HOME_PAGE_DATA: (state, data) => {
      state.homePageData = data
    },
  },

  actions: {
  },

  getters: {
    getTeacherHomeIndexData(state) {
      return getTeacherHomeData(state, 'TeacherHomeIndex', [])
    },
    getTeacherHomeWorkbenchData(state) {
      return getTeacherHomeData(state, 'TeacherHomeWorkbench', [])
    },
    getTeacherHomeSearchData(state) {
      return getTeacherHomeData(state, 'TeacherHomeSearch', [])
    },
    getTeacherHomeMyData(state) {
      return getTeacherHomeData(state, 'TeacherHomeMy', {})
    },
  }
}

export default teacher
