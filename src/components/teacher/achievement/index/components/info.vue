<template>
  <div class="info">
    <div class="personal_info">
      <img :src="data.image" alt="头像" class="image" />
      <br>
      <span class="name">{{ data.name }}</span>
    </div>

    <div class="statistics_wrapper">

      <ul class="statistics" :class="{ to_left: statisticsToRight }">

        <li class="item total_score">
          <p class="bigger number red">{{ data.totalScore }}</p>
          <p class="name">
            <icon class="icon red" name="icon-xin" /> 本月总分
          </p>
        </li>

        <li class="item ranking">
          <p class="number">
            <span v-if="data.ranking > 0" class="bigger number red">{{ data.ranking }} </span>
            <span v-else class="number error_data">无排名</span>
            <icon v-if="data.rankingStatus === 1" class="icon red" name="icon-jiantou-chaoguocopy"/>
            <icon v-if="data.rankingStatus === 2" class="icon green" name="icon-jiantou-lahoucopy" />
          </p>
          <p class="name">
            <icon class="icon blue" name="icon-paiming" /> 本月排名
          </p>
        </li>

      </ul>

      <ul class="statistics second" :class="{ to_right: !statisticsToRight }">

        <li class="item job_score">
          <p class="number blue">{{ data.jobScore }}</p>
          <p class="name">本月岗位分</p>
        </li>

        <li class="item energy_score">
          <p class="number blue">{{ data.energyScore }}</p>
          <p class="name">本月能量分</p>
        </li>

        <li class="item appraisal_score">
          <p class="number blue">{{ data.appraisalScore }}</p>
          <p class="name">本月评教分</p>
        </li>

      </ul>


      <div v-show="statisticsToRight" class="trigger to_left_trigger" @click="statisticsToRight = false">
        <van-icon name="arrow-left" />
      </div>
      <div v-show="!statisticsToRight" class="trigger to_right_trigger" @click="statisticsToRight = true">
        <van-icon name="arrow" />
      </div>

    </div>

    <router-link class="history_link" :to="{ name: 'TeacherAchievementHistory' }">查看得分详情</router-link>
    <p class="tip">您今天剩余能量分：<span class="red">{{ data.remainEnergyScore >= 0 ? data.remainEnergyScore : 0 }}</span>分</p>
    <p class="tip">点击「<span class="green">评分</span>」为其他老师的工作表现打分吧</p>

  </div>
</template>

<script>
import icon from '@/components/common/icon'
import { mapState } from 'vuex'
import { Icon } from 'vant'

export default {
  name: 'TeacherAchievementInfo',
  components: {
    icon,
    vanIcon: Icon,
  },
  data() {
    return {
      statisticsToRight: false,
    }
  },
  computed: {
    ...mapState('achievement', [
      'data'
    ]),
  },
};
</script>

<style scoped lang="less">
.info {
  border-bottom: 0.1rem solid #F3F7F8;
  background-color: #fff;

  .personal_info {
    margin-top: .5rem;
    text-align: center;
    position: relative;
    .image {
      width: .5rem;
      height: .5rem;
      background:rgba(217,183,118,1);
      border:0.01rem solid rgba(153,153,153,1);
      border-radius: 50%;
    }
    .name {
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:0.22rem;
      margin: .1rem 0;
      display: inline-block;
    }
  }

  .statistics_wrapper {
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    position: relative;

    .trigger {
      position: absolute;
      font-size: .25rem;
      display: flex;
      align-items: center;
      height: 100%;
      color: #84C225;
      &:active {
        background: #eee;
      }

      &.to_left_trigger {
        left: 0;
      }
      &.to_right_trigger {
        right: 0;
      }
    }

    .statistics {
      display: flex;
      flex-wrap: nowrap;
      flex-grow: 1;
      flex-basis: 100%;
      flex-shrink: 0;
      width: 100%;
      box-sizing: border-box;
      transition: transform .4s;
      padding: .2rem 0;
      transform: translateX(0) translateZ(0);
      justify-content: center;
      align-items: center;

      &.to_left {
        transform: translateX(-100vw) translateZ(0);
      }

      &.second {
        transform: translateX(-100%) translateZ(0);
        &.to_right {
          transform: translateX(100vw) translateZ(0);
        }
      }

      .item {
        flex-shrink: 0;
        width: 33.3%;
        flex-basis: 33.3%;
        text-align: center;
      }

      .total_score, .ranking {
        width: 40%;
        flex-basis: 40%;
      }

      .number  {
        font-size:0.26rem;
        font-weight:500;
        line-height:0.37rem;
        &.bigger {
          font-size:0.28rem;
        }
        &.red {
          color:rgba(216,0,0,1);
        }
        &.blue {
          color:#3770fb;
        }
        &.error_data {
          font-size:0.16rem;
        }
      }
      .icon {
        &.red {
          color:rgba(216,0,0,1);
        }
        &.blue {
          color:#3770fb;
        }
        &.green {
          color:#84C225;
        }
      }
      .name {
        font-size:0.14rem;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem;
      }
    }
  }

  .history_link {
    display: block;
    text-align: center;
    padding-top: .1rem;
    margin: 0 .15rem .2rem;
    border-top: 0.02rem solid #eee;
    font-size:0.14rem;
    font-weight:400;
    color:#84C225;
    line-height:0.2rem;
  }
  .tip {
    font-size:0.14rem;
    font-weight:400;
    color:#666;
    line-height:0.2rem;
    margin: .1rem .15rem;

    .red {
      color: #D80000;
    }
    .green {
      color:#84C225;
    }
  }
}
</style>
