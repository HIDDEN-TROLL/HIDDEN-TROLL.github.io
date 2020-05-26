// 新师路专有的路由
import EmptyRouterView from '@/components/common/empty-router-view'

export default [
    {
        name: 'Operate',
        path: '/Operate',
        redirect: {
            name: 'Operate'
        },
        component: EmptyRouterView,
        children: [
            {
                name: 'OperateList',
                path: 'OperateList',
                component: () => import('@/components/operate/operate-list'),
            },
            {
                name: 'IncomeList',
                path: 'IncomeList',
                component: () => import('@/components/operate/income-list'),
            },
        ]
    }
]
