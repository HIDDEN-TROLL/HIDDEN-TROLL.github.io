<template>
  <ul class="school-info">
    <li
      class="list"
      style="text-align: left;"
    >{{ extra.schoolName }}：{{ extra.notice ? extra.notice : '暂无数据' }}</li>
  </ul>
</template>

<script>
export default {
  name: 'SchoolInfo',
  props: {
    extra: {
      default: () => {},
      type: Object
    }
  }
}
</script>

<style scoped lang="less">
.school-info {
  height: 0.2rem;
  width: 100%;
  margin: 0.14rem auto 0.12rem;
  padding: 0 0.13rem;
  overflow: hidden;
  box-sizing: border-box;
  .list {
    width: 3.35rem;
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
}
</style>
