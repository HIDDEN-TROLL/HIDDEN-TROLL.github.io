// 代理用户专有的路由
import EmptyRouterView from '@/components/common/empty-router-view'

export default [
  {
    name: 'Agent',
    path: '/Agent',
    redirect: {
      name: 'AgentIndex',
    },
    component: EmptyRouterView,
    children: [
      {
        name: 'AgentIndex',
        path: 'DataStatistics',
        component: () => import('@/components/agent/data-statistics'),
      },
    ],
  },
]
