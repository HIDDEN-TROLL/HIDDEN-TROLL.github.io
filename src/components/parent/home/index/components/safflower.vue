<template>
  <div class="content">
    <span>今日获得</span>
    <icon class="icon" name="icon-honghua" />
    <span class="safflower">+{{ extra.award }}</span>
  </div>
</template>

<script>
import icon from '@/components/common/icon'
export default {
  name: 'Safflower',
  components: {
    icon,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => {
      },
      type: Object,
    },
  },
}
</script>

<style scoped lang="less">
.content {
  background-color: #fff;
  border-bottom: .1rem solid #F3F7F8;
  padding: .2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    color: #D80000;
    margin-left: .25rem;
    margin-right: .07rem;
  }
  .safflower {
    color:#D80000;
    font-size:0.26rem;
    font-weight:500;
    line-height:0.37rem;
  }
}
</style>
