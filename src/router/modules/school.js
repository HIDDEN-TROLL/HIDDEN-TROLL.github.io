// 教师和校长端都有的路由
import EmptyRouterView from '@/components/common/empty-router-view'
import HomePage from '@/components/school/home/home-page'

export default [
  {
    name: 'School',
    path: '/School',
    redirect: {
      name: 'SchoolHomeIndex'
    },
    component: EmptyRouterView,
    children: [
      {
        name: 'SchoolHome',
        path: 'Home',
        redirect: {
          name: 'SchoolHomeIndex'
        },
        component: HomePage,
        meta: {
          title: '首页 - 管理中心',
          keepAlive: true,
        },
        children:[
          {
            name: 'SchoolHomeIndex',
            path: 'Index',
            component: () => import('@/components/school/home/index'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'SchoolHomeWorkbench',
            path: 'Workbench',
            component: () => import('@/components/school/home/workbench'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'SchoolHomeMy',
            path: 'My',
            component: () => import('@/components/school/home/my/index'),
            meta: {
              keepAlive: true
            },
          },

          { // 教师排行榜
            path: 'TeacherRankingList',
            component: EmptyRouterView,
            children: [
              {
                name: 'TeacherRankingList',
                path: '',
                component: () => import('@/components/school/teacher-ranking-list/index'),
                meta: {
                  title: '教师排行榜',
                  keepAlive: true
                }
              },
              {
                name: 'TeacherRankingListScoreDetails',
                path: 'ScoreDetails',
                component: () => import('@/components/school/teacher-ranking-list/score-details'),
                meta: {
                  title: '得分详情',
                  hideBottomTabBar: true,
                }
              },
            ]
          },
        ]
      },
      { // 班级管理
        path: 'ClassManage',
        component: EmptyRouterView,
        children: [
          {
            name: 'ClassManage',
            path: '',
            component: () => import('@/components/school/class-manage'),
          },
          {
            name: 'ClassManageDel',
            path: 'Del',
            component: () => import('@/components/school/class-manage/class-manage-del'),
          },
          {
            name: 'ClassManagePopups',
            path: 'Popups',
            component: () => import('@/components/school/class-manage/class-manage-popups'),
          },
          {
            name: 'ClassManageReplaceTeacher',
            path: 'ReplaceTeacher',
            component: () => import('@/components/school/class-manage/replace-teacher'),
          },
          {
            name: 'ClassManageAssociatedStudent',
            path: 'AssociatedStudent',
            component: () => import('@/components/school/class-manage/associated-student'),
          },
          {
            name: 'ClassManageClassDetail',
            path: 'ClassDetail',
            component: () => import('@/components/school/class-manage/school-class-detail'),
          },
          {
            name: 'ClassManageClassDetailBox',
            path: 'ClassDetailBox',
            component: () => import('@/components/school/class-manage/class-detail-box'),
          },
          {
            name: 'ClassManageDeleteStu',
            path: 'ClassDeleteStu',
            component: () => import('@/components/school/class-manage/class-delete-stu'),
          },
        ]
      },
      { // 教师管理
        path: 'TeacherManage',
        component: EmptyRouterView,
        children: [
          {
            name: 'TeacherManage',
            path: '',
            component: () => import('@/components/school/teacher-manage/teacher-list'),
          },
          {
            name: 'TeacherManageAdd',
            path: 'Add',
            component: () => import('@/components/school/teacher-manage/teacher-add'),
          },
          {
            name: 'TeacherManageDel',
            path: 'Del',
            component: () => import('@/components/school/teacher-manage/teacher-del'),
          },
          {
            name: 'TeacherManageMdf',
            path: 'Mdf',
            component: () => import('@/components/school/teacher-manage/teacher-mdf'),
          },
          {
            name: 'TeacherManageDetails',
            path: 'Details',
            component: () => import('@/components/school/teacher-manage/teacher-details'),
          },
        ]
      },
      { // 校长管理
        path: 'DirectorManage',
        component: EmptyRouterView,
        children: [
          {
            name: 'DirectorManage',
            path: '',
            component: () => import('@/components/school/director-manage/director-list'),
          },
          {
            name: 'DirectorManageAdd',
            path: 'Add',
            component: () => import('@/components/school/director-manage/director-add'),
          },
          {
            name: 'DirectorManageDel',
            path: 'Del',
            component: () => import('@/components/school/director-manage/director-del'),
          },
          {
            name: 'DirectorManageMdf',
            path: 'Mdf',
            component: () => import('@/components/school/director-manage/director-mdf'),
          },
          {
            name: 'DirectorManageDetails',
            path: 'Details',
            component: () => import('@/components/school/director-manage/director-details'),
          },
        ]
      },
      { // 学生管理
        path: 'StudentManage',
        component: EmptyRouterView,
        children: [
          {
            name: 'StudentManage',
            path: '',
            component: () => import('@/components/school/student-manage/student-list'),
          },
          {
            name: 'StudentManageAdd',
            path: 'Add',
            component: () => import('@/components/school/student-manage/student-add'),
          },
          {
            name: 'StudentManageDel',
            path: 'Del',
            component: () => import('@/components/school/student-manage/student-del'),
          },
          {
            name: 'StudentManageMdf',
            path: 'Mdf',
            component: () => import('@/components/school/student-manage/student-mdf'),
          },
          {
            name: 'StudentManageDetails',
            path: 'Details',
            component: () => import('@/components/school/student-manage/student-details'),
          },
        ]
      },
      { // 考勤时间管理
        path: 'AttendanceTimeManage',
        component: EmptyRouterView,
        children: [
          {
            name: 'AttendanceTimeManage',
            path: '',
            component: () => import('@/components/school/attendance-time-manage'),
          },
          {
            name: 'AttendanceTimeManageDel',
            path: 'Del',
            component: () => import('@/components/school/attendance-time-manage/attendance-del.vue'),
          },
          {
            name: 'AttendanceTimeManageUpdate',
            path: 'Update',
            component: () => import('@/components/school/attendance-time-manage/attendance-update.vue'),
          },


        ]
      },
      { // 学生成绩管理
        path: 'ScoreManage',
        component: EmptyRouterView,
        children: [
          {
            name: 'ScoreManage',
            path: '',
            component: () => import('@/components/school/score-manage/score-archives'),
          },
          {
            name: 'ScoreManageModifyGradePop',
            path: 'ModifyGradePop',
            component: () => import('@/components/school/score-manage/modify-grade-pop'),
          },
          {
            name: 'ScoreManageResultsHome',
            path: 'ResultsHome',
            component: () => import('@/components/school/score-manage/results-home'),
          },
          {
            name: 'ScoreManageEcharts',
            path: 'Echarts',
            component: () => import('@/components/school/score-manage/echarts'),
          },
          {
            name: 'ScoreManageReviseScore',
            path: 'ReviseScore',
            component: () => import('@/components/school/score-manage/revise-score'),
          },
          {
            name: 'ScoreManageUnitManage',
            path: 'UnitManage',
            component: () => import('@/components/school/score-manage/unit-management'),
          },{
            name: 'ChangeClassList',
            path: 'ChangeClassList',
            component: () => import('@/components/school/score-manage/class-list'),
          },{
            name: 'ChangeScore',
            path: 'ChangeScore',
            component: () => import('@/components/school/score-manage/change-score'),
          },

        ]
      },
      { // 未到学生
        name: 'UnsignedStatistical',
        path: 'UnsignedStatistical',
        component: () => import('@/components/school/attendance-unsigned-statistical'),
        meta: {
          title: '',
        }
      },
      { // 考勤报表

        path: 'AttendanceSheet',
        component: EmptyRouterView,
        children: [
          {
            name: 'AttendanceSheet',
            path: '',
            component: () => import('@/components/school/attendance-sheet'),
          },
          {
            name: 'AttendanceSheetStudentDetail',
            path: 'StudentDetail',
            component: () => import('@/components/school/attendance-sheet/student-detail')
          },
          {
            name: 'AttendanceSheetTeacherDetail',
            path: 'TeacherDetail',
            component: () => import('@/components/school/attendance-sheet/teacher-detail')
          },
          {
            name: 'AttendanceSheetStudentSignInPush',
            path: 'StudentSignInPush',
            component: () => import('@/components/school/attendance-sheet/student-signinpush')
          },
          {
            name: 'TeacherAttendanceSheet',
            path: 'TeacherAttendanceSheet',
            component: () => import('@/components/school/attendance-sheet/teacher-signin'),
          },
        ]
      },
      { // 考勤统计
        name: 'AttendanceStatistics',
        path: 'AttendanceStatistics',
        component: () => import('@/components/school/attendance-statistics'),
      },
      { // 午休用餐
        path: 'Lunch',
        component: EmptyRouterView,
        children: [
          {
            name: 'Lunch',
            path: '',
            component: () => import('@/components/school/lunch/index/index.vue'),
            meta: {
              title: '午休与用餐',
            }
          },
          {
            name: 'LunchHistory',
            path: 'history',
            component: () => import('@/components/school/lunch/history/index.vue'),
            meta: {
              title: '午休与用餐',
            }
          },

          { // 详情
            name: 'LunchDetails',
            path: 'Details',
            component: () => import('@/components/school/lunch/details/index'),
            meta: {
              title: '详情',
            }
          },
          { // 学生详情
            name: 'LunchDetailsStudent',
            path: 'Details/Student',
            component: () => import('@/components/school/lunch/details/student-details'),
            meta: {
              title: '学生详情',
            }
          },

          { // 管理状态
            name: 'LunchStatusManage',
            path: 'StatusManage',
            component: () => import('@/components/school/lunch/status-manage'),
            meta: {
              title: '管理状态',
            }
          },
          { // 新增状态
            name: 'LunchStatusManageCreate',
            path: 'StatusManage/Create',
            component: () => import('@/components/school/lunch/status-manage/create'),
            meta: {
              title: '新增状态',
            }
          },
          { // 修改状态
            name: 'LunchStatusManageModify',
            path: 'StatusManage/Modify',
            component: () => import('@/components/school/lunch/status-manage/modify'),
            meta: {
              title: '修改状态',
            }
          },
        ]
      },
      { // 停服
        name: 'StopService',
        path: 'StopService',
        component: () => import('@/components/school/intelligent-charging/stop-service'),
      },
      { // 匠托管
        name: 'Trusteeship',
        path: 'Trusteeship',
        redirect: {
          name: 'TrusteeshipShareOfficial'
        },
        component: EmptyRouterView,
        children: [
          {
            name: 'TrusteeshipShareOfficial',
            path: 'ShareOfficial',
            component: () => import('@/components/school/trusteeship/share-official'),
            meta: {
              title: '微官网'
            },
          },
          {
            name: 'TrusteeshipEditPage',
            path: 'EditPage',
            component: () => import('@/components/school/trusteeship/edit-page'),
            meta: {
              title: '编辑微官网',
              keepAlive: true,
            },
          },
          {
            name: 'TrusteeshipEditPageLocation',
            path: 'EditPage/Location',
            component: () => import('@/components/school/trusteeship/edit-page-location'),
            meta: {
              title: '选择地址 - 微官网'
            },
          },

          {
            name: 'TrusteeshipConsultation',
            path: 'Consultation',
            component: () => import('@/components/school/trusteeship/consultation'),
          },
          {
            name: 'TrusteeshipOfficialWebsite',
            path: 'OfficialWebsite',
            component: () => import('@/components/school/trusteeship/official-website'),
          },

        ]
      },
      {//社区
        path: 'Community',
        component: EmptyRouterView,
        children: [
          {
            name: 'Community',
            path: '',
            component: () => import('@/components/school/community/community-index'),
          },
          {
            name: 'CommunityAudit',
            path: 'Audit',
            component: () => import('@/components/school/community/audit'),
          },
          {
            name: 'CommunityTypeManagement',
            path: "TypeManagement",
            component: () => import('@/components/school/community/type-management'),
          },
          {
            name: 'CommunityAddManagement',
            path: "AddManagement",
            component: () => import('@/components/school/community/add-community'),
          },
          {
            name: 'CommunityPermissionsManagement',
            path: 'PermissionsManagement',
            component: () => import('@/components/school/community/permissions-management'),
          },
          {
            name: 'CommunityMyCommunity',
            path: 'MyCommunity',
            component: () => import('@/components/teacher/interactive-community/my-community'),
          },
          {
            name: 'CommunityReadDetail',
            path: 'ReadDetail',
            component: () => import('@/components/teacher/interactive-community/read-detail'),
          },
        ]
      },
      { // 月指数
        path: 'MonthlyIndex',
        component: EmptyRouterView,
        children: [
          {
            name: 'MonthlyIndex',
            path: '' ,
            component: () => import('@/components/school/monthly-index/monthly-index'),
          },
          {
            name: 'MonthlyIndexBriefing',
            path: 'Briefing',
            component: () => import('@/components/school/monthly-index/briefing'),
          },
        ]
      },
      { // 收费
        path: 'Charge',
        component: EmptyRouterView,
        children: [
          {
            name: 'Charge',
            path: '',
            component: () => import('@/components/school/intelligent-charging/index/index'),
            meta: {
              title: '收费名单',
            },
          },
          {
            name: 'ChargeFeedback',
            path: 'Feedback',
            component: () => import('@/components/school/intelligent-charging/feedback/index'),
            meta: {
              title: '提出异议',
            },
          },
          {
            name: 'ChargeFeedbackSubmit',
            path: 'Feedback/Submit',
            component: () => import('@/components/school/intelligent-charging/feedback/submit'),
            meta: {
              title: '确认提交异议',
            },
          },
          {
            name: 'ChargeConfirmBeforePay',
            path: 'Pay',
            component: () => import('@/components/school/intelligent-charging/pay/index'),
            meta: {
              title: '确认付费',
            },
          },
          {
            name: 'ChargeYearly',
            path: 'IndexYearly',
            component: () => import('@/components/school/intelligent-charging/index-yearly/index'),
            meta: {
              title: '年费收取通知',
            },
          },
        ]
      },
      { // 红花
        name: 'Safflower',
        path: 'Safflower',
        redirect: {
          name: 'SafflowerScore'
        },
        component: EmptyRouterView,
        children: [
          {
            name: 'SafflowerScore',
            path: 'Score',
            component: () => import('@/components/school/flower-management/safflower-score'),
          },
          {
            name: 'SafflowerMechanism',
            path: 'Mechanism',
            component: () => import('@/components/school/flower-management/safflower-mechanism'),
          },
          {
            name: 'SafflowerEvaluationManagement',
            path: 'EvaluationManagement',
            component: () => import('@/components/school/flower-management/evaluation-management'),
          },
          {
            name: 'SafflowerCommentaryTypes',
            path: 'CommentaryTypes',
            component: () => import('@/components/school/flower-management/commentary-types'),
          },
          {
            name: 'SafflowerShare',
            path: 'Share',
            component: () => import('@/components/school/flower-management/safflower-share'),
          },
          {
            name: 'SafflowerCommentLibrary',
            path: 'CommentLibrary',
            component: () => import('@/components/school/flower-management/comment-library'),
          },
          {
            name:'SafflowerFlowerArchives',
            path:'FlowerArchives',
            component:() => import('@/components/school/flower-management/flower-archives')
          },
          {
            name:'SafflowerArchivesDetail',
            path:'ArchivesDetail',
            component:() => import('@/components/school/flower-management/archives-detail')
          },
          {
            name:'SafflowerFlowerInitialValue',
            path:'FlowerInitialValue',
            component:() => import('@/components/school/flower-management/flower-initial-value')
          },
          {
            name:'SafflowerFlowerMall',
            path:'FlowerMall',
            component:() => import('@/components/school/flower-mall/flower-mall')
          },
          {//todo 红花兑奖区 需要移除 在校长端不存在
            name:'SafflowerFlowerPrizeArea',
            path:'FlowerPrizeArea',
            component:() => import('@/components/teacher/mall/exchange-prize')
          },
          {
            name:'SafflowerPrizeManagement',
            path:'PrizeManagement',
            component:() => import('@/components/school/flower-mall/prize-management')
          },
          {
            name:'SafflowerTicketRecord',
            path:'TicketRecord',
            component:() => import('@/components/school/flower-mall/ticket-record')
          },
          {
            name:'SafflowerAddGift',
            path:'AddGift',
            component:() => import('@/components/school/flower-mall/add-gift')
          },
          {
            name:'SafflowerModifyGift',
            path:'ModifyGift',
            component:() => import('@/components/school/flower-mall/modify-gift')
          },
          {
            name:'SafflowerFlowerReset',
            path:'FlowerReset',
            component:() => import('@/components/school/flower-mall/flower-reset')
          }
        ]
      },
        // 每日简报
      {
        name:'SchoolDailyBriefing',
        path:'SchoolDailyBriefing',
        component: EmptyRouterView,
        children:[
          {
            name: 'SchoolWorkSituation',
            path: 'SchoolWorkSituation',
            component: () => import('@/components/school/daily-briefing/work-situation'),
          },
          {
            name: 'SchoolOtherWork',
            path: 'SchoolOtherWork',
            component: () => import('@/components/school/daily-briefing/other-work'),

          },
        ]
      },
        // 积分修改
      {
        name:'IntegralModification',
        path:'IntegralModification',
        component: EmptyRouterView,
        children:[
          {
            name: 'IntegralIndex',
            path: 'IntegralIndex',
            component: () => import('@/components/school/Integral-modification/index'),

          },
        ]
      },
      {
        name:'Evaluation',
        path:'Evaluation',
        redirect: {
          name: 'EvaluationIndex'
        },
        component: EmptyRouterView,
        children:[
          {
            name: 'EvaluationIndex',
            path: 'Index',
            component: () => import('@/components/school/evaluation/index/index'),
            meta: {
              title: '综合评价'
            }
          },
          {
            name: 'EvaluationCommentTypes',
            path: 'CommentTypes',
            component: () => import('@/components/school/evaluation/comment-types/index'),
            meta: {
              title: '评语类型'
            }
          },
          {
            name: 'EvaluationCommentManage',
            path: 'CommentManage',
            component: () => import('@/components/school/evaluation/comment-manage/index'),
            meta: {
              title: '评语管理'
            }
          },
        ]
      },
      { // 摄像头直播
        path: 'WebcamLive',
        component: EmptyRouterView,
        children: [
          {
            name: 'WebcamLive',
            path: '',
            component: () => import('@/components/school/webcam-live/index.vue'),
            meta: {
              title: '监控',
            }
          },
        ]
      },
      { // 请假
        path: 'LeaveRecord',
        component: EmptyRouterView,
        children: [
          {
            name: 'LeaveRecord',
            path: '',
            component: () => import('@/components/school/attendance-leave/leave-record.vue'),
            meta: {
              title: '',
            }
          },
          {
            name: 'StudentLeaveRecord',
            path: 'StudentLeaveRecord',
            component: () => import('@/components/school/attendance-leave/student-record.vue'),
          },
        ]
      },
      { // 培训班
        path: 'trainingCourse',
        component: EmptyRouterView,
        children: [
          {
            name: 'trainingCourse',
            path: '',
            component: () => import('@/components/school/training-course/class-management.vue'),
            meta: {
              title: '培训班班级首页',
            }
          },
          {
            name: 'AddClass',
            path: 'AddClass',
            component: () => import('@/components/school/training-course/add-class.vue'),
            meta: {
              title: '',
            }
          },
          // 班级详情-课次
          {
            name: 'ClassDetails',
            path: 'ClassDetails',
            component: () => import('@/components/school/training-course/class-details.vue'),
            meta: {
              title: '',
            }
          },
          // 班级修改-课次
          {
            name: 'ChangeClass',
            path: 'ChangeClass',
            component: () => import('@/components/school/training-course/change-class.vue'),
            meta: {
              title: '',
            }
          },
          // 学生点名-课次
          {
            name: 'StudentSignIn',
            path: 'StudentSignIn',
            component: () => import('@/components/school/training-course/student-signin.vue'),
          },
          // 培训班-学生详情
          {
            name: 'TrainingStudentDetails',
            path: 'TrainingStudentDetails',
            component: () => import('@/components/school/training-course/student-details.vue'),
          },
          // 培训班-删除培训班
          {
            name: 'DeleteTraining',
            path: 'DeleteTraining',
            component: () => import('@/components/school/training-course/delete-class.vue'),
          },
          // 培训班-新学生入班
          {
            name: 'AddNewStudents',
            path: 'AddNewStudents',
            component: () => import('@/components/school/training-course/components/add-newstudents.vue'),
          },
          // 培训班-老学生退班
          {
            name: 'DeleteStudents',
            path: 'DeleteStudents',
            component: () => import('@/components/school/training-course/components/delete-students.vue'),
          },
          // 培训班-更换教师
          {
            name: 'ChangeTeachers',
            path: 'ChangeTeachers',
            component: () => import('@/components/school/training-course/components/change-teacher.vue'),
          },
        ]
      },
      { // 体温枪
        path: 'TemperatureGun',
        component: EmptyRouterView,
        children: [
          {
            name: 'StuTemperature',
            path: '',
            component: () => import('@/components/school/temperature-gun/index'),
            meta: {
              title: '',
            }
          },
          {
            name: 'TodayTemperature',
            path: 'TodayTemperature',
            component: () => import('@/components/school/temperature-gun/automatic-push/temperature-today'),
            meta: {
              title: '',
            }
          },
          {
            name: 'PersonalTemperature',
            path: 'PersonalTemperature',
            component: () => import('@/components/school/temperature-gun/automatic-push/personal-temperature'),
            meta: {
              title: '',
            }
          },
          {
            name: 'FeverAlarm',
            path: 'FeverAlarm',
            component: () => import('@/components/school/temperature-gun/fever-alarm'),
            meta: {
              title: '',
            }
          },
        ]
      },
      { // 课程商城
        path: 'CourseMall',
        redirect: {
          name: 'PurchaseHistory'
        },
        component: EmptyRouterView,
        children: [
          {
            name: 'PurchaseHistory',
            path: 'PurchaseHistory',
            component: () => import('@/components/school/course-mall/purchase-history'),
            meta: {
              title: '购买记录',
            }
          },
        ]
      },
    ]
  },

]
