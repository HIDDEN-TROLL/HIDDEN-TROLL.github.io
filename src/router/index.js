import Vue from 'vue'
import Router from 'vue-router'

import common from './modules/common'
import school from './modules/school'
import teacher from './modules/teacher'
import parent from './modules/parent'
import newConcept from './modules/new-concept'
import Agent from './modules/agent'
import brand from './modules/brand'
import finance from './modules/finance'


Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    ...common,
    ...school,
    ...teacher,
    ...parent,
    ...newConcept,
    ...Agent,
    ...finance,
    ...brand,

    {
      path: '*',


      redirect:'/Teacher/Home/Index',

    },
  ]
})

// 自动设置网页标题
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title){
    document.title = to.meta.title
  } else if (Array.isArray(to.matched)) {
    const parentRoute = to.matched[to.matched.length - 2]
    if (parentRoute && parentRoute.meta && parentRoute.meta.title) {
      document.title = parentRoute.meta.title
    }
  }
  next()
})

export default router
