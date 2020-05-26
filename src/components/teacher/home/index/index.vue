<template>
  <div class="teacher">
    <van-nav-bar class="header" :title="title" :border="false" />

    <div class="content" :class="{ 'gradient-background': !!schoolInfoExtra.headImg }">
      <img v-if="schoolInfoExtra.headImg" class="banner" :src="schoolInfoExtra.headImg" alt="banner" @click="onBannerClick" />

      <section class="part1">
        <p class="total_score_today">
          <span>
            <span class="number">{{ myScore.totalScoreToday }}</span> 分
          </span>
          <br>
          <span>今日获得</span>
        </p>

        <van-tabs v-model="tabIndex" type="card" class="tabs">
          <van-tab>
            <div class="title" slot="title">
              <span class="number">{{ myScore.energyScore }}分</span>
              <span class="desc">能量分</span>
            </div>
          </van-tab>
          <van-tab>
            <div class="title" slot="title">
              <span class="number">{{ myScore.jobScore }}分</span>
              <span class="desc">岗位分</span>
            </div>
          </van-tab>
          <van-tab>
            <div class="title" slot="title">
              <span class="number">{{ myScore.appraisalScore }}分</span>
              <span class="desc">评教分</span>
            </div>
          </van-tab>
        </van-tabs>

      </section>

      <energy-section v-if="isEnergyRendered" v-show="tabIndex === 0" />
      <job-section v-show="tabIndex === 1" />
      <appraisal-section v-if="isAppraisalRendered" v-show="tabIndex === 2" />

    </div>
  </div>
</template>

<script>
import { NavBar, Tabs, Tab } from 'vant'
import { mapActions } from 'vuex'
import jobSection from './job-section'
import energySection from './energy-section'
import appraisalSection from './appraisal-section'
import { handleRouteTarget } from '@/utils'

export default {
  name: 'TeacherHomeIndex',
  components: {
    vanNavBar: NavBar,
    vanTabs: Tabs,
    vanTab: Tab,

    jobSection,
    energySection,
    appraisalSection,
  },
  data() {
    return {
      tabIndex: 1,
      isEnergyRendered: false,
      isAppraisalRendered: false,

      data: [],
    }
  },
  watch: {
    tabIndex() {
      if (this.tabIndex === 0) {
        this.isEnergyRendered = true
      } else if (this.tabIndex === 2) {
        this.isAppraisalRendered = true
      }
    },
  },
  computed: {
    schoolInfoExtra() {
      if (Array.isArray(this.data)) {
        const schoolInfo = this.data.find(item => item.type === 'schoolInfo')
        return schoolInfo ? schoolInfo.extra : {}
      }
      return {}
    },
    title() {
      return this.schoolInfoExtra && this.schoolInfoExtra.schoolName ? this.schoolInfoExtra.schoolName : ''
    },
    myScore() {
      if (Array.isArray(this.data)) {
        const myScore = this.data.find(item => item.type === 'myScore')
        return myScore ? myScore.extra : {}
      }
      return {}
    },
  },
  async created() {
    // 确保第一步数据已获取完成, 才执行下面的代码
    await this.fetchHomeData()

    const data = await this.getPageExtraData('TeacherHomeIndex')
    if (data !== null) {
      this.data = data
    }
  },
  methods: {
    ...mapActions('teacherHome', [
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
.teacher {
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

    .part1 {
      border-bottom: .1rem solid #F3F7F8;
      flex-shrink: 0;

      .total_score_today {
        color:rgba(102,102,102,1);
        margin: .15rem 0;
        text-align: center;

        span:first-child {
          color:rgba(216,0,0,1);
          .number {
            font-size:0.26rem;
            font-weight:500;
            line-height:0.37rem;
          }
        }
      }

      .tabs {
        @height: .5rem;
        margin: .12rem 0;
        padding-top: @height;

        & /deep/ .van-tabs__wrap,
        /deep/ .van-tabs__nav--card {
          height: auto;
        }

        /deep/ .van-tab:not(:last-child) {
          border-right: .01rem solid #3770fb;
        }

        .title {
          padding: .05rem 0;

          .number {
            font-size: 0.16rem;
            font-weight: 500;
            line-height: 0.22rem;
          }

          .desc {
            font-size: 0.12rem;
            font-weight: 400;
            line-height: 0.16rem;
          }
        }

      }
    }

  }



}
</style>
