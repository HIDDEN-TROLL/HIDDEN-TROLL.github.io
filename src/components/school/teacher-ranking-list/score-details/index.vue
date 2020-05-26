<template>
  <section class="teacher_ranking_list_score_details">

    <nav-bar
      class="header"
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"/>

    <van-tabs v-model="tabIndex" type="card" class="tabs">
      <van-tab>
        <div class="title" slot="title">
          <span class="number">{{ scores.jobScores }}</span>
          <span class="desc">本月岗位分</span>
        </div>
      </van-tab>
      <van-tab>
        <div class="title" slot="title">
          <span class="number">{{ scores.energyScores }}</span>
          <span class="desc">本月能量分</span>
        </div>
      </van-tab>
      <van-tab>
        <div class="title" slot="title">
          <span class="number">{{ scores.appraisalScores }}</span>
          <span class="desc">本月评教分</span>
        </div>
      </van-tab>
    </van-tabs>

    <div class="content">
      <job-score-content v-if="isFirstTabRendered" v-show="tabIndex === 0" :teacher-id="teacherId" @passScoreData="receiveScoreData"/>
      <energy-score-content v-if="isSecondTabRendered" v-show="tabIndex === 1" :teacher-id="teacherId" />
      <appraisal-score-content v-if="isThirdTabRendered" v-show="tabIndex === 2" :teacher-id="teacherId" />
    </div>

  </section>
</template>

<script>
import { NavBar, Tabs, Tab } from 'vant'
import jobScoreContent from './components/content-job-score'
import energyScoreContent from './components/content-energy-score'
import appraisalScoreContent from './components/content-appraisal-score'

export default {
  name: 'TeacherRankingListScoreDetails',
  components: {
    NavBar,
    vanTabs: Tabs,
    vanTab: Tab,
    jobScoreContent,
    energyScoreContent,
    appraisalScoreContent,
  },
  mounted() {
    if (!this.$route.params.teacher) {
      this.$router.back()
      return
    }
    this.isFirstTabRendered = true
  },
  data() {
    return {
      tabIndex: 0,
      isFirstTabRendered: false,
      isSecondTabRendered: false,
      isThirdTabRendered: false,
      scores: {
        jobScores: 0,
        energyScores: 0,
        appraisalScores: 0,
      },
    }
  },
  computed: {
    teacher() {
      return this.$route.params.teacher ? this.$route.params.teacher : {}
    },
    title() {
      return (this.teacher.name ? this.teacher.name : '') + '得分详情'
    },
    teacherId() {
      return this.teacher.teacherId
    },
  },
  watch: {
    tabIndex() {
      if (this.tabIndex === 1) {
        this.isSecondTabRendered = true
      } else if (this.tabIndex === 2) {
        this.isThirdTabRendered = true
      }
    },
  },
  methods: {
    receiveScoreData(scores) {
      this.scores.jobScores = scores.jobScores
      this.scores.energyScores = scores.energyScores
      this.scores.appraisalScores = scores.appraisalScores
    },
  },
}
</script>

<style scoped lang="less">
.teacher_ranking_list_score_details {
  font-size: .16rem;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header {
    flex-shrink: 0;
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

  .content {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;
  }
}
</style>
