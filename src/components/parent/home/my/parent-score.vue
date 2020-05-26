<template>
  <div class="parent_score">

    <button class="parent_account_info" @click="$router.push({ name: 'ParentProfile' })">
      <icon class="left-icon" name="icon-gerenxinxi" />
      <span class="text">家长个人信息</span>
      <van-icon class="right-icon" name="arrow" />
    </button>

    <van-loading v-show="loading" class="loading" size="40px" />

    <div v-if="data !== null" class="parents_score">
      <p class="title">家长积分</p>
      <div class="content">
        <div class="parents">
          <p v-for="parent in data.parents" :key="parent.id" class="parent">
            <img class="parent_image" :src="parent.image" alt="" />
            <span class="parent_name">{{ parent.name }}</span>
            <span class="parent_number">{{ parent.score }}</span>
          </p>
        </div>
        <div class="score">
          <span class="score_number">{{ data.statistics.totalScore }}</span>
          <span class="score_title">
            <icon class="score_icon" name="icon-xin" />家长积分
          </span>
        </div>
        <div class="ranking">
          <span class="ranking_number">{{ data.statistics.ranking }}</span>
          <icon class="ranking_status" :class="{ hide: data.statistics.rankingStatus === 0 }" :name=" data.statistics.rankingStatus === 1 ? 'icon-jiantou-chaoguocopy' : 'icon-jiantou-lahoucopy' " />
          <span class="ranking_title">
            <icon class="ranking_icon" name="icon-paiming" />本月排行
          </span>
        </div>
      </div>
    </div>

    <div v-if="data !== null" class="ranking_list">
      <datepicker class="datepicker" textFormat="Y年m月份" @change="onDateChange" />
      <van-loading v-show="rankingListLoading" class="loading" size="40px" />
      <p v-if="isEmpty(rankingList)" class="no_data">无数据</p>
      <p v-for="student in rankingList" :key="student.studentId" class="student_item">
        <span class="student_ranking">
          <img v-if="student.ranking === 1" src="@/assets/img/first.png" alt="">
          <img v-else-if="student.ranking === 2" src="@/assets/img/second.png" alt="">
          <img v-else-if="student.ranking === 3" src="@/assets/img/third.png" alt="">
          <span v-else>{{ student.ranking }}</span>
        </span>
        <img class="student_image" :src="student.image" alt="" />
        <span class="student_name">{{ student.name }}</span>
        <span class="student_score">{{ student.score }}</span>
      </p>
    </div>

    <div class="score_rule">
      <p class="first">
        <span class="title">关于家长积分</span>
        <router-link class="how_to_earn" :to="{ name: 'ParentScoreTask' }">
          <van-icon name="question" /> 如何获得家长积分
        </router-link>
      </p>

      <p class="content">为让家长更清晰、实时地了解孩子在我们机构的表现，同时提高我们的服务质量，请您监督我们的教学服务工作，并提出宝贵的意见，特推出“家长积分”</p>
      <p class="content">1个家长积分等同于1朵小红花，可帮助您的孩子在“红花礼品商城”兑换礼品哦~</p>
    </div>
  </div>
</template>

<script>
import { Loading, Icon } from 'vant'
import icon from '@/components/common/icon'
import datepicker from '@/components/common/datepicker'
import { getParentScore, getParentScoreRank } from '@/api/parent/home'
import { date as phpFunctionDate } from '@/utils'

export default {
  name: 'parent_score',
  components: {
    vanLoading: Loading,
    vanIcon: Icon,
    icon,
    datepicker,
  },
  data() {
    return {
      loading: true,
      data: null,

      rankingListLoading: false,
      rankingListDateString: '',
      rankingListData: {},
    }
  },
  async created() {
    this.rankingListDateString = phpFunctionDate('Y-m', new Date())

    this.loading = true
    const response = await getParentScore()
    if (response.data.meta.success) {
      this.data = response.data.data
      this.rankingListData[this.rankingListDateString] = this.data.rank
    }
    this.loading = false
  },
  computed: {
    rankingList() {
      return this.rankingListData[this.rankingListDateString] ? this.rankingListData[this.rankingListDateString] : []
    },
  },
  methods: {
    async onDateChange(date) {
      const dateString = phpFunctionDate('Y-m', date)
      if (this.rankingListData[dateString]) {
        this.rankingListDateString = dateString
        return
      }

      this.rankingListLoading = true
      const response = await this.fetchRankingList(date)
      if (response.data.meta.success) {
        this.rankingListData[dateString] = response.data.data
      }
      this.rankingListDateString = dateString
      this.rankingListLoading = false
    },
    async fetchRankingList(date) {
      return await getParentScoreRank(date.getFullYear(), date.getMonth() + 1)
    },
  }

}
</script>




<style scoped lang="less">
.parent_score {
  font-size: .16rem;
  display: flex;
  flex-direction: column;

  .loading {
    margin: .12rem auto;
  }

  .parent_account_info {
    margin: 0 .17rem;
    padding: .14rem 0;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    border-bottom: .02rem solid #eee;
    /*width: 100%;*/
    background: transparent;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 0.14rem;
    color: #666;
    align-self: stretch;
    flex-shrink: 0;

    &:active {
      background-color: #eee;
    }
    .left-icon {
      color: #3770fb;
      margin-left: .18rem;
      margin-right: .13rem;
      font-size: .18rem;
    }
    .text {
      flex-grow: 1;
      text-align: left;
    }
    .right-icon {
      margin-right: 0.03rem;
      color: #999;
      font-size: .16rem;
    }
  }

  .parents_score {
    padding: 0 .17rem;
    border-bottom: 0.1rem solid #F3F7F8;

    .title {
      color: #333;
      line-height: 0.22rem;
      position: relative;
      padding: 0.12rem 0.08rem;
      font-size:.16rem;
      font-weight:500;
      &:before {
        content: '';
        width: 0.02rem;
        height: 0.14rem;
        background-color: #3770FB;
        border-radius: 10px;
        position: absolute;
        left: 0;
        margin-top: 0.04rem;
      }
    }

    .content {
      margin: .12rem 0;
      display: flex;

      .score, .ranking {
        flex-basis: 32%;
      }

      .parents {
        flex-basis: 36%;
        border-right: 0.01rem solid #F1F1F1;
        padding: 0.03rem 0;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .parent {
          display: flex;
          align-items: center;
          margin-right: 0.02rem;
          min-width: 80%;

          &:not(:last-of-type) {
            margin-bottom: 0.13rem;
          }
          .parent_image {
            width: .2rem;
            height: .2rem;
            margin-right: 0.04rem;
          }
          .parent_name {
            margin-right: 0.04rem;
            font-size:0.12rem;
            font-weight:400;
            color:#666;
            line-height:0.2rem;
            word-break: break-all;
          }
          .parent_number {
            font-size:0.14rem;
            font-weight:400;
            color:#D80000;
            line-height:0.2rem;
            flex-grow: 1;
            text-align: right;
          }

        }
      }

      .score {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .score_number {
          font-size:0.3rem;
          font-weight:500;
          color:#D80000;
          line-height:0.37rem;
          margin-bottom: 0.24rem;
        }
        .score_title {
          font-size:0.14rem;
          font-weight:400;
          color:#666;
          line-height:0.2rem;

          .score_icon {
            color:#D80000;
            font-size:0.16rem;
            margin-right: 0.05rem;
          }
        }
      }

      .ranking {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .ranking_number {
          font-size:0.3rem;
          font-weight:500;
          color:#D80000;
          line-height:0.37rem;
        }
        .ranking_status {
          color:#D80000;
          font-size:0.16rem;
          margin-top: 0.01rem;
          margin-bottom: 0.07rem;
          &.hide {
            opacity: 0;
          }
        }
        .ranking_title {
          font-size:0.14rem;
          font-weight:400;
          color:#666;
          line-height:0.2rem;
          .ranking_icon {
            color: #3770FB;
            font-size:0.16rem;
            margin-right: 0.05rem;
          }
        }
      }
    }

  }

  .ranking_list {
    padding: .16rem .17rem;
    border-bottom: 0.1rem solid #F3F7F8;

    .datepicker {
      border-bottom: 0.02rem solid #eee;
    }
    .no_data {
      padding: 0.1rem 0;
      text-align: center;
      font-size: .16rem;
      color: #666;
    }
    .student_item{
      padding: .1rem 0;
      display: flex;
      align-items: center;

      &:not(:last-of-type) {
        border-bottom: 0.02rem solid #eee;
      }

      .student_ranking {
        flex-shrink: 0;
        width: .25rem;
        height: .25rem;
        display: inline-block;
        margin: 0 .1rem;

        img {
          width: 100%;
          height: 100%;
        }

        span {
          display: inline-block;
          width: 100%;
          height: 100%;
          text-align: center;
          font-size: 0.16rem;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          line-height: 0.22rem;
        }
      }
      .student_image {
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
      }
      .student_name {
        margin-left: .13rem;
        flex-grow: 1;
        font-size:0.14rem;
        font-weight:400;
        color:#666;
        line-height:0.2rem;
      }
      .student_score {
        margin-right: .5rem;
        font-size:0.14rem;
        font-weight:400;
        color:#666;
        line-height:0.2rem;
      }
    }
  }

  .score_rule {
    padding: .12rem .16rem;
    .first {
      display: flex;
      justify-content: space-between;
      margin-bottom: .22rem;
      font-size:0.14rem;
      font-weight:600;
      color:#333;
      line-height:0.2rem;

      .how_to_earn {
        color: #3770FB;
        font-size:0.12rem;
        font-weight:500;
      }
    }
    .content {
      font-size:0.14rem;
      font-weight:400;
      color:#666;
      line-height:0.2rem;
      margin-bottom: .1rem;
    }
  }
}
</style>

