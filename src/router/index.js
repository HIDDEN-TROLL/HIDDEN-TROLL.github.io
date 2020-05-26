import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './modules/home.js'
import VerificationPage from './modules/Login.js'

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history',
  routes: [
    ...Home,
    ...VerificationPage,
    {
      path: '*',
      redirect: '/Member/MemberTab/Homepage',
    },
  ]
})

// 自动设置网页标题
export default router
