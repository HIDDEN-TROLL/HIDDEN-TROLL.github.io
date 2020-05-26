import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomePage from '../../components/router/empty-router-view.vue'

Vue.use(VueRouter)

export default [
    {
        path: '/Login',
        name: 'VerificationPage',
        component: () => import('../../views/Verification/Register.vue'),
        meta: {
            title: '登录注册',
        },
    },
]
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}