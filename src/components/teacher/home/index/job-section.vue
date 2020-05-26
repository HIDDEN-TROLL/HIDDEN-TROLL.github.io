<template>
  <section class="job_section">

    <p class="section_title">今日工作</p>

    <van-tabs v-model="tabIndex" type="card" class="tabs">
      <van-tab title="生活管理" />
      <van-tab title="学习管理" />
    </van-tabs>

    <section v-show="tabIndex === 0" class="today_working">
      <van-loading v-show="todayWorkingDataLoading" class="loading" />

      <component
        v-for="(item, index) in todayWorkingWidgets"
        :key="index"
        :is="item.type"
        :title="item.name"
        :extra="item.extra" />

    </section>

    <section v-if="isSecondTabRendered" v-show="tabIndex === 1"  class="study_manage">
      <van-loading v-show="studyManageDataLoading" class="loading" />

      <component
        v-for="(item, index) in studyManageWidgets"
        :key="index"
        :is="item.type"
        :title="item.name"
        :extra="item.extra" />

    </section>

  </section>
</template>

<script>
import { Loading, Tabs, Tab } from 'vant'
import { getIndexJobTodayWorking, getIndexJobTodayWorkingStudeyManage } from '@/api/teacher/home'
import Attendance from './components/attendance'
import TaskList from './components/task-list'
import Community from './components/community'
import StudentScoreManage from './components/student-score-manage'
import StudentBirthdayArchive from './components/student-birthday-archive'
import Divider from '@/components/school/home/index/components/Divider'

export default {
  name: 'TeacherHomeJobSection',
  components: {
    vanTabs: Tabs,
    vanTab: Tab,
    vanLoading :Loading,

    Attendance,
    TaskList,
    Community,
    StudentBirthdayArchive,

    StudentScoreManage,
    Divider,

  },
  data() {
    return {
      tabIndex: 0,
      isSecondTabRendered: false,
      todayWorkingDataLoading: true,
      todayWorkingData: [],
      studyManageDataLoading: true,
      studyManageData: [],
    }
  },
  watch: {
    tabIndex() {
      if (this.tabIndex === 1 && !this.isSecondTabRendered) {
        this.isSecondTabRendered = true

        this.studyManageDataLoading = true
        getIndexJobTodayWorkingStudeyManage()
          .then(response => {
            if (response.data.meta.success) {
              this.studyManageData = response.data.data
            }
          })
          .finally(() => {
            this.studyManageDataLoading = false
          })
      }
    },
  },
  created() {
    this.todayWorkingDataLoading = true
    getIndexJobTodayWorking()
      .then(response => {
        if (response.data.meta.success) {
          this.todayWorkingData = response.data.data
        }
      })
      .finally(() => {
        this.todayWorkingDataLoading = false
      })
  },
  computed: {
    availableComponents() {
      return Object.keys(this.$options.components)
    },
    todayWorkingWidgets() {
      return this.todayWorkingData.filter(item => {
        item.type = item.type.substring(0, 1).toUpperCase() + item.type.substring(1)
        return this.availableComponents.includes(item.type)
      })
    },
    studyManageWidgets() {
      return this.studyManageData.filter(item => {
        item.type = item.type.substring(0, 1).toUpperCase() + item.type.substring(1)
        return this.availableComponents.includes(item.type)
      })
    },

  },
}
</script>

<style scoped lang="less">
.job_section {
  .loading {
    margin: .15rem auto;
  }
  .section_title {
    height:0.4rem;
    font-size:0.14rem;
    color:rgba(132,194,37,1);
    line-height:0.4rem;
    text-align: center;
  }
  .tabs {
    margin: .12rem 0;
  }
  .other_working {
    .section_title {
      padding: 0 .15rem;
      height:0.4rem;
      line-height:0.4rem;
      font-size:0.14rem;
      color:rgba(132,194,37,1);
      display: flex;
      justify-content: space-between;

      button {
        font-size:0.12rem;
        color:rgba(153,153,153,1);
        padding: 0;
        margin: 0;
        border: 0;
        background: transparent;
        &:active {
          background-color: #eee;
        }
      }
    }
  }
}
</style>
