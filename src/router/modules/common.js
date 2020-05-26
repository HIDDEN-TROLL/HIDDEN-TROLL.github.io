import EmptyRouterView from '@/components/common/empty-router-view'

const route = [
  {
    name: 'SwitchAccount',
    path: 'SwitchAccount',
    component: () => import('@/components/common-page/switch-account/index'),
    meta: {
      title: '切换账号',
    }
  },
  { // 商城
    name: 'CommonMall',
    path: 'CommonMall',
    redirect: {
      name: 'CommonMallIndex'
    },
    component: EmptyRouterView,
    children: [
      {
        name: 'CommonMallIndex',
        path: 'CommonMallIndex',
        component: () => import('@/components/common-page/mall/index'),
        meta: {
          title: '新师路商城',
        }
      },
      {
        name: 'OrderRecord',
        path: 'OrderRecord',
        component: () => import('@/components/common-page/mall/index/order-record'),
        meta: {
          title: '新师路商城-记录',
        }
      },
      {
        name: 'GoodsDetail',
        path: 'GoodsDetail',
        component: () => import('@/components/common-page/mall/goods-detail'),
        meta: {
          title: '详情',
        }
      },
      {
        name: 'CommonMallConfirmBeforePay',
        path: 'Pay',
        component: () => import('@/components/common-page/mall/pay/index'),
        meta: {
          title: '确认购买',
        },
      },
      {
        name: 'LoadingStatus',
        path: 'LoadingStatus',
        component: () => import('@/components/common-page/mall/pay/Loading'),
        meta: {
          title: '查询订单状态',
        },
      },
      {
        name: 'SuccessfulPayment',
        path: 'SuccessfulPayment',
        component: () => import('@/components/common-page/mall/pay/success'),
        meta: {
          title: '订单状态',
        },
      },
      {
        name: 'MessagePush',
        path: 'MessagePush',
        component: () => import('@/components/common-page/mall/pay/message-push'),
        meta: {
          title: '商城消息推送',
        },
      },
    ]
  },
]

export default [
  {
    name: 'Common',
    path: '/Common',
    component: EmptyRouterView,
    children: [
      ...route
    ]
  },
]
