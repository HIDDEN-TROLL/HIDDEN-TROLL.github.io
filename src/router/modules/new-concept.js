// 新师路专有的路由
import EmptyRouterView from '@/components/common/empty-router-view'

export default [
  {
    name: 'NewConcept',
    path: '/NewConcept',
    redirect: {
      name: 'NewConceptIndex'
    },
    component: EmptyRouterView,
    children: [
      {
        name: 'NewConceptIndex',
        path: 'DataStatistics',
        component: () => import('@/components/new-concept/data-statistics'),
      },
    ]
  }
]
