<template>
  <div class="rank">

    <div class="tips">
      <p class="tip">您今天剩余能量分：<span class="red">{{ data.remainEnergyScore >= 0 ? data.remainEnergyScore : 0 }}</span>分</p>
      <p class="tip">点击「<span class="green">评分</span>」为其他老师的工作表现打分吧</p>
    </div>


    <date-range-picker class="date_picker" :start-date="startDate" :end-date="endDate" @change="onDateRangeChange"/>

    <p class="head">
      <span>当前名次</span>
      <span class="switch_rank_options" @click="isActionSheetShow = true">
        <span>
          当前{{ currentRankTypeName }}<van-icon class="icon" name="exchange"/>
        </span>
      </span>
    </p>

    <ul class="ranking_list">
      <li v-show="loading">
        <van-loading class="loading"/>
      </li>
      <li v-for="teacher in remainingRankingList" :key="teacher.teacherId" class="teacher">
        <div class="left">
          <span class="ranking">
            <img v-if="teacher.ranking === 1" src="@/assets/img/first.png" alt="">
            <img v-else-if="teacher.ranking === 2" src="@/assets/img/second.png" alt="">
            <img v-else-if="teacher.ranking === 3" src="@/assets/img/third.png" alt="">
            <span v-else>{{ teacher.ranking }}</span>
          </span>
          <img :src="teacher.image" alt="" class="image" :class="{ hide: isEmpty(teacher.image) }">
          <span class="name text">{{teacher.name }}</span>
        </div>

        <div class="right">
          <span class="score text">{{ teacher.score }}</span>
          <button class="action" @click="$emit('startGrade', teacher)">评分</button>
          <router-link class="action" :to="{ name: 'TeacherRankingListScoreDetails', params: { teacher } }">详情</router-link>
        </div>
      </li>
    </ul>

    <Actionsheet
      class="action_sheet"
      v-model="isActionSheetShow"
      :actions="actionSheetActions"
      get-container="#app"
      cancel-text="取消"
      @select="onActionSheetSelect"/>


  </div>
</template>

<script>
import dateRangePicker from '@/components/common/date-range-picker'
import { Actionsheet, Icon, Loading } from 'vant'
import { mapState, mapActions } from 'vuex'

function getStartOfMonth() {
  const date = new Date()
  date.setDate(1)
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  return date
}

export default {
  name: 'TeacherAchievementRank',
  components: {
    dateRangePicker,
    Actionsheet,
    vanIcon: Icon,
    vanLoading: Loading,
  },
  data() {
    return {
      startDate: getStartOfMonth(),
      endDate: new Date(),

      isActionSheetShow: false,
      loading: false,
    }
  },
  computed: {
    ...mapState('teacherRankingList', [
      'data',
      'currentRankType',
      'rankingList',
      'rankTypeOptions',
    ]),
    remainingRankingList() {
      return this.rankingList.slice(3)
    },
    actionSheetActions() {
      return this.rankTypeOptions.map((item) => {
        item.className = item.value === this.currentRankType ? 'active' : 'non-active'
        return item
      })
    },
    currentRankTypeName() {
      const option = this.rankTypeOptions.find(option => option.value === this.currentRankType)
      return option ? option.name : ''
    },
  },
  methods: {
    ...mapActions('teacherRankingList', [
      'fetchRankingList',
    ]),
    onDateRangeChange([startDate, endDate]) {
      this.startDate = startDate
      this.endDate = endDate
      this.updateRankingList()
    },
    onActionSheetSelect(item) {
      this.isActionSheetShow = false

      const value = item.value
      if (value !== this.currentRankType) {
        this.updateRankingList(value)
      }
    },
    updateRankingList(rankType = this.currentRankType) {
      this.loading = true
      this.fetchRankingList({
        rankType,
        startDate: this.startDate,
        endDate: this.endDate,
      })
        .then(() => {
          this.loading = false
        })
        .catch(e => {
          if (!e || e.message !== 'cancel') {
            this.loading = false
            console.error(e)
            this.$toast('发生错误')
          }
        })
    },
  },
};
</script>

<style scoped lang="less">
.rank {
  background-color: #fff;

  .tips {
    padding-top: .2rem;
    padding-bottom: .17rem;
    padding-left: .15rem;
    .tip {
      font-size:0.14rem;
      font-weight:400;
      color:#666;
      line-height:0.2rem;

      .red {
        color: #D80000;
      }
      .green {
        color:#84C225;
      }
    }
  }


  .tips, .date_picker, .head {
    margin: 0 .15rem;
    border-bottom: .02rem solid #eee;
  }

  .head {
    padding: .12rem 0;
    font-size: 0.14rem;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 0.2rem;

    & > span {
      width: 50%;
      text-align: center;
      display: inline-block;
    }

    .switch_rank_options {
      width: 50%;
      text-align: left;

      span:active {
        background-color: #eee;
      }

      .icon {
        transform: rotate(90deg);
      }
    }
  }

  .ranking_list {
    padding: 0 .15rem;

    .loading {
      margin: .2rem auto;
    }

    .teacher {
      display: flex;
      align-items: center;
      padding: .08rem .1rem;
      overflow: hidden;

      &:not(:last-child) {
        border-bottom: .02rem solid #eee;
      }

      .left, .right {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
      }

      .left {
        width: 50%;
        overflow: scroll;
      }

      .right {
        width: 50%;
      }

      .ranking {
        flex-shrink: 0;
        width: .25rem;
        height: .25rem;
        display: inline-block;

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

      .image {
        flex-shrink: 0;
        width: .32rem;
        height: .32rem;
        margin: 0 .08rem;
        border-radius: 50%;
        &.hide {
          visibility: hidden;
        }
      }

      .text {
        font-size: 0.14rem;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 0.2rem;
        flex-shrink: 0;
        word-wrap: break-word;
        word-break: break-all;
        flex-grow: 1;
      }

      .name.my_self {
        color: #333;
      }

      .score {
        text-align: center;
      }

      .action {
        flex-shrink: 0;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.03rem;
        border: 0.01rem solid rgba(132, 194, 37, 1);
        padding: 0 .1rem;
        margin: 0;
        font-size: 0.12rem;
        font-weight: 400;
        color: rgba(132, 194, 37, 1);
        line-height: 0.2rem;
        &:not(:last-child) {
          margin-right: .05rem;
        }
        &.hide {
          visibility: hidden;
        }

        &:active {
          background: rgba(132, 194, 37, 1);
          color: #fff;
        }
      }
    }
  }


}

.action_sheet {
  .active {
    color: #fff;
    background: #3770fb;
  }
}
</style>
