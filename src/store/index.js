import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import app from './modules/app'
import user from './modules/user'

import schoolHome from './modules/school/home'
import teacherHome from './modules/teacher/home'

import trusteeship from './modules/school/trusteeship'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    schoolHome,
    teacherHome,

    trusteeship,
  },
  getters
})

export default store
