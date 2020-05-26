<template>
  <section class="statistics_info">
    <div v-for="(item, index) in extra" :key="index" class="part">
      <p class="title">{{ item.title }}</p>
      <p class="content">{{ item.content }}</p>
      <p class="action">
        <button class="button" :class="{ hide: !item.target }" @click="handleRouteTarget(item.target)">查看</button>
      </p>
    </div>
  </section>
</template>

<script>
import { handleRouteTarget } from '@/utils'

export default {
  name: 'StatisticsInfo',
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => [],
      type: Array,
    },
  },
  methods: {
    handleRouteTarget(target) {
      handleRouteTarget(this.$router, target)
    }
  }
}
</script>

<style scoped lang="less">
.statistics_info {
  padding: .15rem 0;
  border-bottom: .1rem solid #F3F7F8;
  display: flex;
  flex-wrap: nowrap;
  overflow: scroll;

  .part {
    min-width: 50%;
    flex-shrink: 0;

    &:not(:last-of-type) {
      border-right: .02rem solid #F2F2F2;
      box-sizing: border-box;
    }
    p {
      text-align: center;
      font-size:0.14rem;
      line-height:0.2rem;
      white-space: pre;
    }
    .title {
      font-size:0.14rem;
      font-weight:700;
      color:rgba(51,51,51,1);
      margin-bottom: .2rem;
    }
    .content {
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:0.2rem;
    }
    .action {
      .button {
        margin-top: .1rem;
        background:rgba(255,255,255,1);
        border-radius:0.03rem;
        border:0.01rem solid rgba(132,194,37,1);
        color: rgba(132,194,37,1);
        font-size:0.12rem;
        font-weight:400;
        line-height:0.17rem;
        &:active {
          color: #fff;
          background: rgba(132,194,37,1);
        }
        &.hide {
          display: none;
        }
      }
    }
  }
}
</style>
