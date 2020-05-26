<template>
  <div class="parent">
    <component
      v-for="(item, index) in data"
      :key="index"
      :is="item.type"
      :title="item.name"
      :extra="item.extra" />
  </div>
</template>

<script>
import SchoolInfo from './components/school-info'
import Attendance from './components/attendance'
import Safflower from './components/safflower'
import Siesta from './components/siesta'
import Homework from './components/homework'
import Habit from './components/habit'
import Training from './components/training'
import Divider from '@/components/school/home/index/components/Divider'

import { mapActions } from 'vuex'

export default {
  name: 'ParentHomeIndex',
  components: {
    SchoolInfo,
    Attendance,
    Safflower,
    Siesta,
    Homework,
    Habit,
    Training,
    Divider,
  },
  data() {
    return {
      data: [],
    }
  },
  async created() {
    // 确保第一步数据已获取完成, 才执行下面的代码
    await this.fetchHomeData()

    const data = await this.getPageExtraData('ParentHomeIndex')
    if (data !== null) {
      const availableComponents = Object.keys(this.$options.components)
      this.data = data.filter(item => {
        item.type = item.type.substring(0, 1).toUpperCase() + item.type.substring(1)
        return availableComponents.includes(item.type)
      })
    }
  },
  methods: {
    ...mapActions('parentHome', [
      'fetchHomeData',
      'getPageExtraData',
    ]),
  },
}
</script>

<style scoped lang="less">
.parent {
  padding-bottom: 50px;
  font-size: .16rem;
  width: 100%;
  min-height: 100vh;
  background: url('~@/assets/img/parents/index/bg.png') no-repeat 0 0;
  background-size: contain;
  overflow: hidden;
  box-sizing: border-box;

  .content:last-child {
    border-bottom: 0;
  }
}
</style>
