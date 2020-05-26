<template>
  <section class="widget">
    <p class="title">{{ title }}</p>

    <div class="wrapper">
      <div class="left">
        <p class="name">生日建档</p>
        <p>
          共完成 {{ extra.finished }}/{{ extra.total }} 名学生建档
        </p>
        <!-- TODO -->
        <span class="clickable">
          查看详情 <van-icon name="arrow" />
        </span>
      </div>
      <div class="right">
        <p class="name">生日记录</p>
        <p>
          本月{{ extra.birthdayNumberThisMonth }}名学生生日
        </p>
        <!-- TODO -->
        <span class="clickable">
          查看详情 <van-icon name="arrow" />
        </span>
      </div>
    </div>

  </section>
</template>

<script>
import { Icon } from 'vant'

export default {
  name: 'StudentBirthdayArchive',
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

  .wrapper {
    margin: .2rem 0;
    padding: 0 .15rem;
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;

    .left {
      border-right: .01rem solid #eee;
      box-sizing: border-box;
    }
    .right {
      padding-left: .15rem;
    }

    .left, .right {
      min-width: 50%;
      display: inline-flex;
      flex-direction: column;

      .name {
        font-size:0.14rem;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:0.2rem;
      }
      p {
        font-size:0.14rem;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:0.2rem;
        margin: .02rem 0;
      }
      .clickable{
        font-size:0.12rem;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.17rem;
      }
    }
  }
}

</style>
