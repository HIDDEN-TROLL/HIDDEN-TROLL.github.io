<template>
  <section>
    <van-loading v-show="loading" class="loading" />

    <component
      v-for="(item, index) in widgets"
      :key="index"
      :is="item.type"
      :title="item.name"
      :extra="item.extra" />

  </section>
</template>

<script>
import { Loading } from 'vant'

import Attendance from './components/attendance'
import Siesta from './components/siesta'
import Homework from './components/homework'
import Habit from './components/habit'
import Divider from './components/Divider'

import CommunityStatistics from './components/community-statistics'
import StudentBirthdayArchive from './components/student-birthday-archive'
import StudentScoreArchive from './components/student-score-archive'
import StudentStatistics from './components/student-statistics'

import { getIndexPageTodayWorking, getIndexPageOtherWorking } from '@/api/school/home'
import { mapActions } from 'vuex'

export default {
  name: 'SchoolHomeIndexWorkingPanel',
  props: {
    index: {
      type: Number,
      default: 0,
    }
  },
  components: {
    vanLoading: Loading,

    Attendance,
    Siesta,
    Homework,
    Habit,
    Divider,

    CommunityStatistics,
    StudentBirthdayArchive,
    StudentScoreArchive,
    StudentStatistics,
  },
  data() {
    return {
      loading: false,
      data: [],
    }
  },
  computed: {
    availableComponents() {
      return Object.keys(this.$options.components)
    },
    widgets() {
      return this.data.filter(item => {
        item.type = item.type.substring(0, 1).toUpperCase() + item.type.substring(1)
        return this.availableComponents.includes(item.type)
      })
    },
  },
  async created() {
    this.loading = true

    // 确保第一步数据已获取完成, 才执行下面的代码
    await this.fetchHomeData()

    try {
      const response = this.index === 0 ? await getIndexPageTodayWorking() : await getIndexPageOtherWorking()
      if (response.data.meta.success) {
        this.data = response.data.data
      }
    }catch (e) {
      console.error(e)
    }

    this.loading = false
  },
  methods: {
    ...mapActions('schoolHome', [
      'fetchHomeData',
    ]),
  },
}
</script>

<style scoped lang="less">
.loading {
  margin: .15rem auto;
}
.widget:last-child {
  border-bottom: 0;
}
</style>
