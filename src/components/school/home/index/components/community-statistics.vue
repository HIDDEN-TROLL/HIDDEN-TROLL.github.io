<template>
  <section class="widget">
    <p class="title">
      <span>{{ title }}</span>
      <span class="clickable" @click="$router.push({ name:'Community' })">
        进入社区 <van-icon name="arrow" />
      </span>
    </p>

    <div class="wrapper">
      <div class="left">
        <p>
          <span class="red">{{ extra.communityNumber }}</span>条
        </p>
        <p>{{ extra.timeRange ? extra.timeRange : '' }}已发动态</p>
      </div>
      <div class="right">
        <p>
          <span class="red">{{ extra.likeNumber }}</span>次
        </p>
        <p>{{ extra.timeRange ? extra.timeRange : '' }}获得{{ extra.parentNumber }}名家长点赞</p>
      </div>
    </div>

    <p v-show="isExpand" v-for="(teacher, index) in extra.teachers" :key="index" class="teacher">
      <span class="teacher_name">{{ teacher.name }}</span>
      <span class="send_number">发送{{ teacher.communityNumber }}条</span>
      <span>获{{ teacher.parentNumber }}名家长点赞{{ teacher.likeNumber }}次</span>
    </p>

    <p v-if="isShowTrigger" class="trigger clickable" @click="isExpand = !isExpand">
      <span>{{ isExpand ? '合起' : '展开' }}教师发布情况</span>
      <van-icon name="play" :class="{ rotate90: isExpand }" />
    </p>
  </section>
</template>

<script>
import { Icon } from 'vant'

export default {
  name: 'CommunityStatistics',
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
    isShowTrigger() {
      return Array.isArray(this.extra.teachers) && this.extra.teachers.length > 0
    },
  }
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
    margin: .2rem 0;
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;

    .left {
      border-right: .01rem solid #eee;
      box-sizing: border-box;
    }
    .left, .right {
      min-width: 50%;
      display: inline-flex;
      flex-direction: column;

      p {
        font-size:0.14rem;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:0.2rem;
        text-align: center;
        .red {
          font-size:0.17rem;
          font-weight:bold;
          color:rgba(216,0,0,1);
          line-height:0.24rem;
        }
      }
    }
  }

  .teacher {
    margin-left: .3rem;
    margin-right: .2rem;
    font-size:0.12rem;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:0.17rem;
    display: flex;

    & > span {
      word-break: break-all;
    }
    .teacher_name {
      font-size:0.14rem;
      color:rgba(102,102,102,1);
      line-height:0.2rem;
      width: 33%;
      flex-shrink: 0;
      margin-right: .1rem;
      min-width: .8rem;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .send_number {
      min-width: .8rem;
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
