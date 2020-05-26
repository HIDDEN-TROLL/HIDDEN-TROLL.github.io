<template>
  <section class="student_score_manage">
    <p class="title">
      <span>{{ title }}</span>
      <router-link class="clickable action" :to="{ name: 'ScoreManageResultsHome' }">去录入 &gt;</router-link>
    </p>
    <p class="content">
      <span>{{ extra.content }}</span>
      <span class="score">+{{ extra.worth }}</span>
    </p>
  </section>
</template>

<script>
export default {
  name: 'StudentScoreManage',
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
  methods: {
  },
}
</script>

<style scoped lang="less">
.student_score_manage {
  border-bottom: .02rem solid #eee;
  margin: 0 .15rem;
  padding-top: .1rem;
  padding-bottom: .15rem;

  .title {
    font-weight: 500;
    color: #333;
    line-height: 0.2rem;
    position: relative;
    padding: 0 .12rem;
    margin-bottom: .04rem;
    font-size: .14rem;
    display: flex;
    justify-content: space-between;

    &:before {
      content: '';
      width: 0.02rem;
      height: 0.14rem;
      background-color: #3770FB;
      border-radius: 10px;
      position: absolute;
      left: 0;
      margin-top: 0.03rem;
    }

    .clickable:active {
      background: #eee;
    }
    .action {
      font-size:0.14rem;
      font-weight:400;
      color:#84c225;
      line-height:0.17rem;
    }
  }

  .content {
    margin-left: .08rem;
    font-size:0.12rem;
    color:rgba(102,102,102,1);
    line-height:0.17rem;

    .score {
      margin-left: .3rem;
      font-size:0.2rem;
      color:rgba(216,0,0,1);
      line-height:0.28rem;
    }
  }

}
</style>
