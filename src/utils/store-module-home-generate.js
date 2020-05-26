import { isEmpty } from '@/utils'

function getHomeData(state, target, defaultReturn) {
  if (!Array.isArray(state.homePageData)) {
    return defaultReturn
  }
  const data = state.homePageData.find(item => item.target === target)
  return data !== undefined && data.extra !== undefined ? data.extra : defaultReturn
}

function updatePageExtraData(state, target, data) {
  if (!Array.isArray(state.homePageData)) {
    return
  }
  const targetPage = state.homePageData.find(item => item.target === target)
  if (targetPage !== undefined) {
    targetPage.extra = data
  }
}

function fetchAsyncPageData(state, commit, fetchMethod, mutationName) {
  state.loading = true
  return fetchMethod()
    .then(response => {
      if (response.data.meta.success) {
        commit(mutationName, response.data.data)
      }
    })
    .finally(() => {
      state.loading = false
    })
}

// restAsyncPageDataFetchMethods = [
//    {
//      target: 'TeacherHomeWorkbench',
//      fetchMethod: Function,
//      actionName: '',
//      getterName: '',
//    }
// ]
export default function (homePageDataFetchMethods, restAsyncPageDataFetchMethods) {
  let getHomepageDataPromise = undefined

  this.namespaced = true

  this.state = {
    loading: false,
    homePageData: [],
  }

  this.mutations = {
    SET_HOME_PAGE_DATA: (state, data) => {
      state.homePageData = data
    },
  }

  this.actions = {
    fetchHomeData({ state, commit }) {
      if (getHomepageDataPromise === undefined) {
        state.loading = true
        getHomepageDataPromise = homePageDataFetchMethods()
          .then(response => {
            commit('SET_HOME_PAGE_DATA', response.data.data)
          })
          .finally(() => {
            state.loading = false
          })
      }
      return getHomepageDataPromise
    },
  }


  this.getters = {
    isLoadingData(state) {
      return state.loading
    },
  }

  restAsyncPageDataFetchMethods.forEach(item => {

    item.mutationName = 'SET_' + item.target.toUpperCase() + '_PAGE_DATA'
    this.mutations[item.mutationName] = (state, data) => {
      updatePageExtraData(state, item.target, data)
    }

    if (item.actionName) {
      this.actions[item.actionName] = (context) => {
        return context.dispatch('fetchHomeData')
          .finally(() => {
            if (isEmpty(context.getters[item.getterName])) {
              fetchAsyncPageData(context.state, context.commit, item.fetchMethod, item.mutationName)
            }
          })
      }
    }

    if (item.getterName) {
      this.getters[item.getterName] = (state) => {
        return getHomeData(state, item.target, [])
      }
    }

  })
}
