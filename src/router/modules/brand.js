// 品牌用户专有的路由
import EmptyRouterView from '@/components/common/empty-router-view'

export default [
  {
    name: 'Brand',
    path: '/Brand',
    redirect: {
      name: 'BrandIndex',
    },
    component: EmptyRouterView,
    children: [
      {
        name: 'BrandIndex',
        path: 'DataStatistics',
        component: () => import('@/components/brand/data-statistics'),
      },
      {
        name: 'BrandPrincipalManagement',
        path: 'PrincipalManagement',
        component: () => import('@/components/brand/principal-management'),
      },
    ],
  },
]
