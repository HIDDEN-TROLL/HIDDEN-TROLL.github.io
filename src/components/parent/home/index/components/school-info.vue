<template>
  <div class="school-info">
    <img class="banner" :src="extra.headImg" alt="banner" @click="onBannerClick" />

    <p class="title">{{ extra.studentName }} 今日动态</p>
  </div>
</template>

<script>
import { handleRouteTarget } from '@/utils'

export default {
  name: 'SchoolInfo',
  props: {
    extra: {
      default: () => {
      },
      type: Object,
    },
  },
  methods: {
    onBannerClick() {
      const target = this.extra.bannerTarget
      const isReplace = !!this.extra.isReplace
      if (target) {
        handleRouteTarget(this.$router, target, isReplace)
      }
    }
  }
}
</script>

<style scoped lang="less">
.school-info {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;

  .notice {
    text-align: center;
    margin-bottom: .1rem;
    height: 0.2rem;
    font-size: 0.14rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.2rem;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.51) 0%,
      rgba(255, 255, 255, 1) 26%,
      rgba(255, 255, 255, 1) 77%,
      rgba(255, 255, 255, 0.5) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .banner {
    width: 100%;
    max-height: 2rem;
    padding: 0 .13rem;
    box-sizing: border-box;
    margin: .2rem 0;
  }

  .title {
    font-size: 0.14rem;
    font-weight: 400;
    color: rgba(132,194,37,1);
    line-height: 0.2rem;
    background: #fff;
    text-align: center;
    padding: .09rem 0;
    border-bottom: .1rem solid #F3F7F8;
    border-top: .1rem solid #F3F7F8;
  }
}
</style>
