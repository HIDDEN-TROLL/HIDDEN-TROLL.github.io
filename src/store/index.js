import Vue from 'vue'
import Vuex from 'vuex'

import UserFunction from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    UserFunction,
  },
})

export default store
