import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'

import './assets/reset/reset.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Echarts from 'echarts'
import Calendar from 'vue-mobile-calendar'//日历
import VueLazyload from 'vue-lazyload'//懒加载
import VueTouch from 'vue-touch'//滑动组件

import { Dialog, Toast, Notify } from 'vant';
import { isEmpty, param2Obj } from './utils'
import { getToken, setToken } from '@/utils/auth'
import { setGlobalVar } from '@/utils/global-var'
import '@/utils/company-name'

Vue.config.productionTip = false;
Vue.prototype.echarts = Echarts;
Vue.prototype.isEmpty = isEmpty
Vue.use(VueAxios, axios);
Vue.use(Echarts);
Vue.use(VueLazyload);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Notify);
Vue.use(Calendar);//日历
Vue.use(VueTouch, {name: 'v-touch'})
Toast.allowMultiple(true)
Toast.setDefaultOptions({
  position: 'bottom'
})

;(function () {
  const instances = []
  Vue.prototype.$loading = function (message = '加载中...', duration = 5000, isFullscreen = false, otherOptions = {}) { // 默认加载中超时时间5秒; otherOptions 参数就得去看有赞的toast文档了
    const options = {
      type: 'loading',
      message,
      duration,
      mask: isFullscreen,
      position: 'middle',
    }
    const instance = Toast(Object.assign(options, otherOptions))
    instances.push(instance)
    return instance
  }
  Vue.prototype.$loadingHide = function (targetInstance) {
    let instance
    if (targetInstance) {
      instance = targetInstance
    } else {
      do {
        instance = instances.shift()
        if (instance && instance.value) {
          break
        }
      } while (instances.length > 0);
    }
    if (instance && instance.value) { // instance.value 为 true 时表示还未调用过clear方法
      instance.clear()
    }
  }
})()

// 加载Token
let token
let params = param2Obj(location.href)
if (params.token) {
  token = params.token
  setToken(token)
} else {
  token = getToken()
}
store.dispatch('SetToken', token)

store.dispatch('updateCompanyName')

const main = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

setGlobalVar('vue', main)
setGlobalVar('router', router)
setGlobalVar('store', store)

if (document.getElementById('skeleton')) {
  document.getElementById('skeleton').style.display = 'none'
}
// TODO 删除测试用的window对象
window.vue = main
window.R = router
window.S = store

export default main
