<template>
  <section class="widget">
    <p class="title">
      <span>{{ title }}</span>
      <span class="clickable" @click="$router.push({ name:'Lunch' })">
        查看详情 <van-icon name="arrow" />
      </span>
    </p>

    <ul class="wrapper">
      <li class="category" v-for="category in data" :key="category.key">
        <p class="name">{{ category.name }}</p>

        <p class="info">
          <span class="blue">{{ category.stuComplete }}/{{ category.stuCount }}</span> 名学生
        </p>
        <div class="progress_bar">
          <div class="finished" :style="computeProgressStyle(category)"></div>
        </div>

        <div v-show="isExpand" v-for="(teacher, index) in category.staffList" :key="index" class="detail">
          <p class="teacher_name">{{ teacher.name }}</p>
          <p class="info">
            <span class="green">{{ teacher.stuComplete }}/{{ teacher.stuCount }}</span> 名学生
          </p>
        </div>

      </li>
    </ul>

    <p v-if="isShowTrigger" class="trigger clickable" @click="isExpand = !isExpand">
      <span>{{ isExpand ? '合起' : '展开' }}教师进度</span>
      <van-icon name="play" :class="{ rotate90: isExpand }"/>
    </p>
  </section>
</template>

<script>
import { Icon } from 'vant'

export default {
  name: 'Siesta',
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
    data() {
      const list = [
        ['siesta', '午休情况'],
        ['lunch', '午餐情况'],
        ['dinner', '晚餐情况'],
      ]
      return list.map(([key, name]) => {
        return Object.assign(
          { key, name, },
          this.extra[key] ? this.extra[key] : {}
        )
      })
    },
    isShowTrigger() {
      return !this.data.every(category =>
        !Array.isArray(category.staffList) || category.staffList.length === 0
      )
    },
  },
  methods: {
    computeProgressStyle(category) {
      if (category.stuCount <= 0) {
        return {
          width: '0%',
        }
      }
      const studentNumber = Math.max(category.stuCount, 1)
      const studentComplete = category.stuComplete
      const finishedPercentage = Math.min(100, Math.floor(studentComplete / studentNumber * 100))
      return {
        width: finishedPercentage + '%',
      }
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

    .clickable {
      display: inline-flex;
      align-items: center;
      font-size:0.12rem;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:0.17rem;
    }
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

  .wrapper {
    margin-bottom: .15rem;
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;

    .category {
      min-width: 33%;
      /*margin-left: .12rem;*/
      /*padding-right: .12rem;*/
      display: inline-flex;
      flex-direction: column;

      &:not(:last-child) {
        border-right: .01rem solid #eee;
      }

      /*&:first-child {*/
        /*margin-left: .25rem;*/
      /*}*/

      /*&:last-child {*/
        /*padding-right: .25rem;*/
      /*}*/

      .name {
        font-size: 0.14rem;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 0.2rem;
        margin: .1rem 0;
        text-align: center;
        flex-shrink: 0;
      }

      .info {
        font-size:0.12rem;
        font-weight:400;
        color: #666;
        line-height:0.17rem;
        min-width: .8rem;
        text-align: center;
        .blue {
          color:rgba(55,112,251,1);
        }
        .green {
          color: #84C225;
        }
      }

      .progress_bar {
        width: .8rem;
        margin: .08rem auto;
        height: 0.1rem;
        background: rgba(239, 239, 239, 1);
        border-radius: 0.02rem;

        .finished {
          height: 100%;
          background: rgba(55,112,251,1);
          border-radius: 0.02rem;
        }
      }


      .detail {
        font-weight: 400;
        min-width: .8rem;
        margin: .08rem auto;

        .info {
          margin: 0;
        }
        .teacher_name {
          font-size: 0.14rem;
          color: rgba(102, 102, 102, 1);
          line-height: 0.2rem;
        }
      }
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
