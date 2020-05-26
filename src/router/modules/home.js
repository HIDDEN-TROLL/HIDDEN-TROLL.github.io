import Vue from 'vue'
import VueRouter from 'vue-router'
import EmptyRouterView from '../../components/router/empty-router-view.vue'
import HomepageTab from '../../components/router/App.vue'

Vue.use(VueRouter)

export default [
    {
        name: 'Member',
        path: '/Member',
        component: EmptyRouterView,
        children: [
            {
                name: 'MemberTab',
                path: 'MemberTab',
                component: HomepageTab,
                meta: {
                    title: '首页',
                    keepAlive: true
                },
                children: [
                    {
                        name: 'Homepage',
                        path: 'Homepage',
                        component: () => import('../../views/Homepage/Index.vue'),
                        meta: {title: '首页',},
                    },
                    {
                        name: 'Function',
                        path: 'Function',
                        component: () => import('../../views/Collection/Index.vue'),
                        meta: {title: '收藏',},

                    },
                    {
                        name: 'Message',
                        path: 'Message',
                        component: () => import('../../views/Message/Index.vue'),
                        meta: {
                            title: '消息',

                        }
                    },
                    {
                        name: 'Person',
                        path: 'Person',
                        component: () => import('../../views/ParamsAndQuery/getParamsOrQuery.vue'),
                        meta: {
                            title: '个人',

                        }
                    },
                ]
            },
            {
                name: 'MemberKKP',
                path: 'MemberKKP',
                component: EmptyRouterView,
                meta: {
                    title: '首页',
                    keepAlive: true
                },
                children: [
                    {
                        name: 'TypeList',
                        path: 'TypeList',
                        component: () => import('../../views/Homepage/components/test.vue'),
                    }
                ]
            },
        ]
    },


]
// const VueRouterPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (to) {
//     return VueRouterPush.call(this, to).catch(err => err)
// }