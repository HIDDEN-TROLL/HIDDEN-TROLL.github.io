import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import jquery from 'jquery'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'csshake'

import bootstrap from 'bootstrap'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Vuex,
  jquery,
  bootstrap,
  render: h => h(App)
}).$mount('#app')

// // 加载Token
// let token
// let params = param2Obj(location.href)
// if (params.token) {
//   token = params.token
//   setToken(token)
// } else {
//   token = getToken()
// }
// store.dispatch('SetToken', token)