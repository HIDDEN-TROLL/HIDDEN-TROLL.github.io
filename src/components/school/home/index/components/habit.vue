<template>
  <section class="widget">
    <p class="title">{{ title }}</p>

    <p class="info">
      已点评 <span class="blue">{{ extra.stuComplete }}/{{ extra.stuCount }}</span> 名学生
    </p>

    <div class="progress_wrap">
      <div class="progress_bar">
        <div class="finished" :style="computeProgressStyle"></div>
      </div>
      <span class="clickable" @click="$router.push({ name:'Evaluation' })">查看详情</span>
    </div>

    <div v-show="isExpand" v-for="(staff, index) in extra.staffList" :key="index" class="staff">
      <span class="staff_name">{{ staff.name }}</span>
      <span class="total_student">共{{ staff.stuCount }}名学生</span>
      <span class="not_complete">
        <span class="green">{{ staff.stuNotComplete }}</span> 名学生未记录
      </span>
    </div>


    <p v-if="isShowTrigger" class="trigger clickable" @click="isExpand = !isExpand">
      <span>{{ isExpand ? '合起' : '展开' }}教师进度</span>
      <van-icon name="play" :class="{ rotate90: isExpand }"/>
    </p>
  </section>
</template>

<script>
import { Icon } from 'vant'

export default {
  name: 'Habit',
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => {},
      type: Object,
    },
  },
  components: {
    vanIcon: Icon,
  },
  data() {
    return {
      isExpand: false,
    }
  },
  computed: {
    computeProgressStyle() {
      if (this.extra.stuCount <= 0) {
        return {
          width: '0%',
        }
      }
      const studentNumber = Math.max(this.extra.stuCount, 1)
      const studentComplete = this.extra.stuComplete
      const finishedPercentage = Math.min(100, Math.floor(studentComplete / studentNumber * 100))
      return {
        width: finishedPercentage + '%',
      }
    },
    isShowTrigger() {
      return Array.isArray(this.extra.staffList) && this.extra.staffList.length > 0
    },
  },
}
</script>

<style scoped lang="less">
.widget {
  border-bottom: .1rem solid #F3F7F8;

  .clickable:active {
    background: #eee;
  }

  & > .title {
    margin-top: .15rem;
    margin-left: .15rem;
    font-weight: bold;
    color: #333;
    line-height: 0.22rem;
    position: relative;
    padding: 0 .12rem;
    margin-bottom: .04rem;
    font-size: 0.16rem;
    display: flex;
    justify-content: space-between;

    &:before {
      content: '';
      width: 0.02rem;
      height: 0.16rem;
      background-color: #3770FB;
      border-radius: 10px;
      position: absolute;
      left: 0;
      margin-top: 0.03rem;
    }
  }

  .info {
    font-size:0.12rem;
    font-weight:400;
    color: #666;
    line-height:0.17rem;
    min-width: 1.4rem;
    margin-left: .3rem;
    margin-top: .2rem;

    .blue {
      color:rgba(55,112,251,1);
    }
  }

  .progress_wrap {
    margin-left: .3rem;
    margin-bottom: .2rem;
    font-size:0.12rem;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:0.14rem;
    display: flex;
    align-items: center;
    .progress_bar {
      width: 2.3rem;
      margin: .08rem .08rem .08rem 0;
      height: 0.1rem;
      background: rgba(239, 239, 239, 1);
      border-radius: 0.02rem;
      display: inline-block;

      .finished {
        height: 100%;
        background: rgba(55,112,251,1);
        border-radius: 0.02rem;
      }
    }
  }
  .staff {
    margin-left: .3rem;
    font-size:0.12rem;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:0.17rem;
    display: flex;

    & > span {
      word-break: break-all;
    }
    .staff_name {
      font-size:0.14rem;
      color:rgba(102,102,102,1);
      line-height:0.2rem;
      margin-right: .1rem;
    }
    .green {
      color:rgba(132,194,37,1);
    }
    .staff_name {
      min-width: 0.8rem;
      display: inline-block;
      width: 33%;
    }
    .total_student {
      min-width: 1rem;
      display: inline-block;
      width: 30%;
    }
  }

  .trigger {
    text-align: center;
    font-size: 0.12rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.17rem;
    padding: 0.1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .rotate90 {
      transform: rotate(-90deg);
    }
  }
}

</style>
