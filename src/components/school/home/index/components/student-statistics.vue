<template>
  <section class="widget">
    <p class="title">{{ title }}</p>

    <p class="content">
      校区本月共有
      <span class="blue">{{ extra.total }}</span>
      名学生
    </p>
    <p class="info">
      <span>
        新增
        <span class="blue">{{ extra.increaseThisMonth }}</span>
        名学生
      </span>
      <span>
        减少
        <span class="blue">{{ extra.decreaseThisMonth }}</span>
        名学生
      </span>
      <span>
        净增学生数
        <span class="blue">{{ extra.netIncreaseThisMonth }}</span>
        名
      </span>
    </p>
  </section>
</template>

<script>
export default {
  name: 'StudentStatistics',
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
}
</script>

<style scoped lang="less">
.widget {
  border-bottom: .1rem solid #F3F7F8;

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

  .blue {
    color: #3770FB;
  }
  .content {
    font-size:0.14rem;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height:0.2rem;
    margin: .15rem;
    text-align: center;
  }
  .info {
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
    margin: .15rem;
    font-size:0.14rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:0.2rem;
    & > span {
      text-align: center;
      min-width: 33%;
      display: inline-block;
      white-space: nowrap;
      /*margin-right: .1rem;*/
    }
  }
}

</style>
