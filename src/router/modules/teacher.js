// 教师端专有的路由
import EmptyRouterView from '@/components/common/empty-router-view'
import HomePage from '@/components/teacher/home/home-page'

export default [
  {
    name: 'Teacher',
    path: '/Teacher',
    redirect: {
      name: 'TeacherHomeIndex'
    },
    component: EmptyRouterView,
    children: [
      {
        name: 'TeacherHome',
        path: 'Home',
        redirect: {
          name: 'TeacherHomeIndex'
        },
        component: HomePage,
        meta: {
          title: '首页 - 教师中心',
          keepAlive: true
        },
        children:[
          {
            name: 'TeacherHomeIndex',
            path: 'Index',
            component: () => import('@/components/teacher/home/index'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'TeacherHomeIndexOtherTask',
            path: 'Index/OtherTask',
            component: () => import('@/components/teacher/home/index/other-task'),
            meta: {
              title: '其他加分任务',
              hideBottomTabBar: true,
            },
          },

          {
            name: 'TeacherHomeWorkbench',
            path: 'Workbench',
            component: () => import('@/components/teacher/home/workbench'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'TeacherHomeMy',
            path: 'My',
            component: () => import('@/components/teacher/home/my/index'),
            meta: {
              keepAlive: true
            },
          },


          { // 教师成就值
            path: 'Achievement',
            component: EmptyRouterView,
            children:[
              {
                name: 'TeacherAchievement',
                path: '',
                component: () => import('@/components/teacher/achievement/index'),
                meta: {
                  title: '我的成就值',
                  keepAlive: true
                },
              },
              {
                name: 'TeacherAchievementHistory',
                path: 'History',
                component: () => import('@/components/teacher/achievement/history'),
                meta: {
                  title: '得分详情',
                  hideBottomTabBar: true,
                },
              },
            ],
          },
        ]
      },
      {
        name: 'TeacherHomework',
        path: 'Homework',
        redirect: {
          name: 'TeacherHomeworkManage'
        },
        component: EmptyRouterView,
        meta: {
          keepAlive: true
        },
        children:[
          {
            name: 'TeacherHomeworkManage',
            path: 'Manage',
            component: () => import('@/components/teacher/homework/manage'),
            meta: {
              title: '作业管理'
            },
          },
          {
            name: 'TeacherHomeworkManageHistory',
            path: 'Manage/History',
            component: () => import('@/components/teacher/homework/manage-history'),
            meta: {
              title: '历史记录'
            },
          },
          {
            name: 'TeacherHomeworkQuickNotice',
            path: 'QuickNotice',
            component: () => import('@/components/teacher/homework/quick-notice'),
            meta: {
              title: '一键通知'
            },
          },
          {
            name: 'HomeworkProcess',
            path: 'HomeworkProcess',
            component: () => import('@/components/teacher/homework/homework-process/start-homework'),
            meta: {
              title: '作业流程',
              keepAlive: true // 需要被缓存
            },
            mode: 'history',
          },
          {
            name: 'TeacherHomeworkOnlineReview',
            path: 'HomeworkOnlineReview',
            component: () => import('@/components/teacher/homework/homework-online-review'),
            meta: {
              title: '点评线上作业',
            },
          },
          // {
          //   name: 'TeacherHomeworkUnread',
          //   path: 'Unread',
          //   component: () => import('@/components/teacher/homework/unread'),
          // },
          // {
          //   name: 'TeacherHomeworkComment',
          //   path: 'Comment',
          //   component: () => import('@/components/teacher/homework/comment'),
          // },
          // {
          //   name: 'TeacherHomeworkHistory',
          //   path: 'History',
          //   component: () => import('@/components/teacher/homework/history-record'),
          // }
        ]
      },
      {
        name: 'TeacherCommunity',
        path: 'Community',
        redirect: {
          name: 'TeacherCommunityIndex'
        },
        component: EmptyRouterView,
        children: [
          {
            name: 'TeacherCommunityIndex',
            path: '',
            component: () => import('@/components/teacher/interactive-community/community-index'),
          },
          {
            name: 'TeacherCommunityWaitAudit',
            path: 'WaitAudit',
            component: () => import('@/components/teacher/interactive-community/wait-audit'),
          },
          {
            name: 'TeacherCommunityAddCommunity',
            path: 'AddCommunity',
            component: () => import('@/components/teacher/interactive-community/add-community'),
          },
          {
            name: 'TeacherCommunityRecording',
            path: 'Recording',
            component: () => import('@/components/common/webrtc-recording'),
          },
          {
            name: 'TeacherCommunityModifyCommunity',
            path: 'ModifyCommunity',
            component: () => import('@/components/teacher/interactive-community/modify-community'),
          },
          {
            name: 'CommunityReadDetail',
            path: 'ReadDetail',
            component: () => import('@/components/teacher/interactive-community/read-detail'),
          },
          {
            name: 'TeacherCommunityMyCommunity',
            path: '/MyCommunity',
            component: () => import('@/components/teacher/interactive-community/my-community'),
          },
        ]
      },
      {
        name:'TeacherMall',
        path:'Mall',
        component: EmptyRouterView,
        children:[
          {
            name: 'TeacherMallExchangePrize',
            path: 'ExchangePrize',
            component: () => import('@/components/teacher/mall/exchange-prize'),
          },
          {
            name: 'TeacherMallFlowerMall',
            path: 'FlowerMall',
            component: () => import('@/components/teacher/mall/flower-mall'),
          },
          {
            name: 'TeacherMallFlowerExchange',
            path: 'FlowerExchange',
            component: () => import('@/components/teacher/mall/flower-exchange'),
          }
        ]
      },
      {
        name:'TeacherDailyBriefing',
        path:'DailyBriefing',
        component: EmptyRouterView,
        children:[
          {
            name: 'WorkSituation',
            path: 'WorkSituation',
            component: () => import('@/components/teacher/daily-briefing/work-situation'),
          },
          {
            name: 'OtherWork',
            path: 'OtherWork',
            component: () => import('@/components/teacher/daily-briefing/other-work'),

          },
        ]
      },
      {
        name:'Exchangeprizes',
        path:'Exchangeprizes',
        component: EmptyRouterView,
        children:[
          {
            name: 'Exchangeprizes',
            path: '',
            component: () => import('@/components/teacher/exchange-prizes/exchange-prizes'),
          },
        ]
      },
        // 缴费提醒
      {
        name:'PaymentReminder',
        path:'PaymentReminder',
        component: EmptyRouterView,
        children:[
          {
            name: 'PaymentSlip',
            path: '',
            component: () => import('@/components/teacher/payment-reminder/home'),
            meat:{
              keepAlive: true
            }
          },
          // 缴费历史记录
          {
            name: 'PaymentRecord',
            path: 'PaymentRecord',
            component: () => import('@/components/teacher/payment-reminder/payment-record'),
            meat:{
              keepAlive: true
            }
          },
          // 缴费历史记录-学生缴费详情记录
          {
            name: 'StudentDetails',
            path: 'StudentDetails',
            component: () => import('@/components/teacher/payment-reminder/student-details'),
          },
          // 缴费-家长提醒
          {
            name: 'ParentInformation',
            path: 'ParentInformation',
            component: () => import('@/components/teacher/payment-reminder/parent-information'),
          },
        ]
      },
    ]
  },

]
