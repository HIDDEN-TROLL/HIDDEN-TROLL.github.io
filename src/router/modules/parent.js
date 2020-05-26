// 家长端专有的路由
import EmptyRouterView from '@/components/common/empty-router-view'
import HomePage from '@/components/parent/home/home-page'

export default [
  {
    name: 'Parent',
    path: '/Parent',
    redirect: {
      name: 'ParentHomeIndex'
    },
    component: EmptyRouterView,
    children: [
      {
        name: 'ParentHome',
        path: 'Home',
        redirect: {
          name: 'ParentHomeIndex'
        },
        component: HomePage,
        meta: {
          title: '首页 - 家长主页',
          keepAlive: true
        },
        children:[
          {
            name: 'ParentHomeIndex',
            path: 'Index',
            component: () => import('@/components/parent/home/index'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'ParentHomeHabit',
            path: 'Habit',
            component: () => import('@/components/parent/home/habit'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'ParentHomeScore',
            path: 'Score',
            component: () => import('@/components/parent/home/score'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'ParentHomeEducation',
            path: 'Education',
            component: () => import('@/components/parent/home/education'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'ParentHomeMy',
            path: 'My',
            component: () => import('@/components/parent/home/my/index'),
            meta: {
              keepAlive: true
            },
          },

          {
            name: 'HabitsPerformance',
            path: 'HabitsPerformance',
            component: () => import('@/components/parent/habits-performance/HabitsPerformance'),
            meta: {
              keepAlive: true
            },
          },
            // 家长红花商城
          {
            name: 'ParentFlowerMall',
            path: 'ParentFlowerMall',
            component: () => import('@/components/parent/habits-performance/parent-flowermall'),
          },

          // {
          //   name:'HabitsPerformance',
          //   path:'HabitsPerformance',
          //   component: EmptyRouterView,
          //   children:[
          //     {
          //       name: 'HabitsPerformance',
          //       path: '',
          //       component: () => import('@/components/parent/habits-performance/HabitsPerformance'),
          //     },
          //   ]
          // }
        ]
      },
      {
        name: 'ParentScore',
        path: 'ParentScore',
        component: EmptyRouterView,
        children: [
          {
            name: 'ParentScoreTask',
            path: 'Task',
            meta: {
              title: '家长积分规则',
            },
            component: () => import('@/components/parent/parent-score/task'),
          },
        ]
      },
      {
        name: 'ParentAttention',
        path: 'Attention',
        component: () => import('@/components/parent/attention'),
      },
      { // 家长 孩子个人信息
        path: 'Profile',
        component: EmptyRouterView,
        children:[
          {
            name: 'ParentProfile',
            path: 'Parent',
            component: () => import('@/components/parent/profile/parent'),
            meta: {
              title: '家长个人信息'
            },
          },

          {
            name: 'ChildProfile',
            path: 'Child',
            component: () => import('@/components/parent/profile/child'),
            meta: {
              title: '孩子个人信息'
            },
          },
          {
            name: 'ModifyChildProfile',
            path: 'Child/Modify',
            component: () => import('@/components/parent/profile/child-modify'),
            meta: {
              title: '修改孩子个人信息'
            },
          },

        ]
      },

      // 我的培训班
      {
        name: 'ParentTraining',
        path: 'ParentTraining',
        component: () => import('@/components/parent/home/training/index'),
      },
      { // 作业完成通知
        name: 'ParentHomework',
        path: 'Homework',
        component: () => import('@/components/parent/homework'),
      },
      { // 作业详情
        name: 'ParentHomeworkHistory',
        path: 'Homework/History',
        component: () => import('@/components/parent/homework/homework-detail'),
        meta: {
          title: '作业详情'
        },
      },
      { // 作业历史
        name: 'ParentHomeworkHistoryList',
        path: 'Homework/HistoryList',
        component: () => import('@/components/parent/homework/history'),
        meta: {
          title: '作业历史'
        },
      },
      { // 线上作业点评
        name: 'ParentHomeworkOnlineReview',
        path: 'Homework/HomeworkOnlineReview',
        component: () => import('@/components/parent/homework/homework-online-review'),
        meta: {
          title: '作业点评'
        },
      },


      { // 午休用餐
        path: 'Lunch',
        component: EmptyRouterView,
        children: [
          {
            name: 'ParentLunch',
            path: '',
            component: () => import('@/components/parent/lunch'),
            meta: {
              title: '午休与用餐'
            }
          },
        ]
      },
      { // 匠托管
        path: 'Trusteeship',
        component: EmptyRouterView,
        children: [
          {
            name: 'ParentTrusteeship',
            path: '',
            component: () => import('@/components/parent/trusteeship/homepage'),
          },
        ]
      },
      { // 红花
        name: 'ParentSafflower',
        path: 'Safflower',
        redirect: {
          name: 'SafflowerRanking'
        },
        component: EmptyRouterView,
        children: [
          {
            name: 'SafflowerRanking',
            path: 'Ranking',
            component: () => import('@/components/parent/safflower/ranking'),
          },
        ]
      },
      { // 社区
        path: 'Community',
        component: EmptyRouterView,
        children: [
          {
            name: 'ParentCommunity',
            path: '',
            component: () => import('@/components/parent/community'),
          },
          {
            name: 'CommunityMyCommunity',
            path: 'MyCommunity',
            component: () => import('@/components/teacher/interactive-community/my-community'),
          },
        ]
      },
      {
        // 红花商城
        path:'FlowerMall',
        component: EmptyRouterView,
        children: [
          {
            name: 'ParentFlowerMall',
            path: '',
            component: () => import('@/components/parent/mall/flower-mall'),
          },
        ]
      },
      {
        name:'ParentDailyBriefing',
        path:'ParentDailyBriefing',
        component: EmptyRouterView,
        children:[
          {
            name: 'ParentWorkSituation',
            path: 'ParentWorkSituation',
            component: () => import('@/components/parent/daily-briefing/work-situation'),
          },
          {
            name: 'ParentOtherWork',
            path: 'ParentOtherWork',
            component: () => import('@/components/parent/daily-briefing/week-briefing'),
          },
          {
            name: 'AutoModeOne',
            path: 'AutoModeOne',
            component: () => import('@/components/parent/daily-briefing/components/automatic-mode'),
          },
          {
            name: 'ManualMode',
            path: 'ManualMode',
            component: () => import('@/components/parent/daily-briefing/components/manual-mode'),
          },
          {
            name: 'History',
            path: 'History',
            component: () => import('@/components/parent/daily-briefing/components/history'),
          },  {
            name: 'HistoryWeekBriefing',
            path: 'HistoryWeekBriefing',
            component: () => import('@/components/parent/daily-briefing/components/history-weekbriefing'),
            meta: {
              keepAlive: true
            },
          }, {
            name: 'SwitchWeeklyReport',
            path: 'SwitchWeeklyReport',
            component: () => import('@/components/parent/daily-briefing/components/jump'),
          },
        ]
      },
      {
        name:'ParentTemperature',
        path:'ParentTemperature',
        component: EmptyRouterView,
        children:[
          {
            name: 'ParentTemperature',
            path: '',
            component: () => import('@/components/parent/temperature-gun/my-temperature'),
          }
          ]
      }



    ]
  },

]
