<template>
  <div class="school">
    <van-nav-bar class="header" :title="title" :border="false" />

    <div class="content" :class="{ 'gradient-background': !!schoolInfoExtra.headImg }">
      <img v-if="schoolInfoExtra.headImg" class="banner" :src="schoolInfoExtra.headImg" alt="banner" @click="onBannerClick" />

      <div class="part1">

        <van-loading v-show="loading" class="loading" />

        <component
          v-for="(item, index) in topPartWidgets"
          :key="index"
          :is="item.type"
          :title="item.name"
          :extra="item.extra" />

      </div>

      <van-tabs v-model="tabIndex" type="card" class="tabs">
        <van-tab title="今日工作进度" />
        <van-tab title="其他工作情况" />
      </van-tabs>

      <working-panel v-show="tabIndex === 0" :index="0" />
      <working-panel v-if="isSecondTabRendered" v-show="tabIndex === 1" :index="1" />
    </div>

  </div>
</template>

<script>
import { NavBar, Tabs, Tab, Loading } from 'vant'
import { mapActions } from 'vuex'
import StatisticsInfo from './components/statistics-info'
import ChargeInfo from './components/charge-info'
import workingPanel from './working-panel'
import { handleRouteTarget } from '@/utils'

export default {
  name: 'SchoolHomeIndex',
  components: {
    vanNavBar: NavBar,
    vanTabs: Tabs,
    vanTab: Tab,
    vanLoading: Loading,

    StatisticsInfo,
    ChargeInfo,

    workingPanel,
  },
  data() {
    return {
      loading: false,
      tabIndex: 0,
      isSecondTabRendered: false,

      data: [],
    }
  },
  watch: {
    tabIndex() {
      if (this.tabIndex === 1) {
        this.isSecondTabRendered = true
      }
    },
  },
  computed: {
    schoolInfoExtra() {
      if (Array.isArray(this.data)) {
        const schoolInfo = this.data.find(item => item.type === 'SchoolInfo')
        return schoolInfo ? schoolInfo.extra : {}
      }
      return {}
    },
    title() {
      return this.schoolInfoExtra && this.schoolInfoExtra.schoolName ? this.schoolInfoExtra.schoolName : ''
    },
    availableComponents() {
      return Object.keys(this.$options.components)
    },
    topPartWidgets() {
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

    const data = await this.getPageExtraData('SchoolHomeIndex')
    if (data !== null) {
      this.data = data
    }

    this.loading = false
  },
  methods: {
    ...mapActions('schoolHome', [
      'fetchHomeData',
      'getPageExtraData',
    ]),
    onBannerClick() {
      const target = this.schoolInfoExtra.bannerTarget
      const isReplace = !!this.schoolInfoExtra.isReplace
      if (target) {
        handleRouteTarget(this.$router, target, isReplace)
      }
    }
  },
}
</script>

<style scoped lang="less">
.school {
  font-size: .16rem;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;

  .header {
    flex-shrink: 0;
  }


  .content {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;

    &.gradient-background {
      background: url('~@/assets/img/parents/index/bg.png') no-repeat local 0 0;
      background-size: 100% 2.4rem;
    }

    .banner {
      width: 100%;
      max-height: 2rem;
      padding: 0 .13rem;
      box-sizing: border-box;
      margin: .2rem 0;
    }

    .loading {
      margin: .15rem auto;
    }

    .tabs {
      margin: .12rem 0;
    }
  }
}
</style>
