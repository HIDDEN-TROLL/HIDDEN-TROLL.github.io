<template>
  <section class="widget">
    <p class="title">
      <span>{{ title }}</span>
      <span class="clickable" @click="$router.push({ name:'ScoreManage' })">
        查看详情 <van-icon name="arrow" />
      </span>
    </p>

    <p class="content">
      本月已录入
      <span class="blue">{{ extra.entryCount }}/{{ extra.stuCount }}</span>
      名学生
    </p>
  </section>
</template>

<script>
import { Icon } from 'vant'

export default {
  name: 'StudentScoreArchive',
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

  .content {
    font-size:0.14rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:0.2rem;
    margin: .15rem;
    .blue {
      color: #3770FB;
    }
  }
}

</style>
