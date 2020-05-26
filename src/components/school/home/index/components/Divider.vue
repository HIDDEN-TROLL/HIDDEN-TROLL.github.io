<template>
  <div class="divider">{{ extra.text }}</div>
</template>

<script>
export default {
  name: 'Divider',
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => [],
      type: Object,
    },
  },
}
</script>

<style scoped lang="less">
.divider {
  display: flex;
  align-items: center;
  padding: 16px 0;
  color: #969799;
  font-size: 14px;
  line-height: 24px;
  border-color: #96979985;
  border-style: solid;
  border-width: 0;
  background: #f3f7f8;

  &:before {
    margin-right: 16px;
  }
  &:after {
    margin-left: 16px;
  }
  &:before, &:after {
    display: block;
    flex: 1;
    box-sizing: border-box;
    height: 1px;
    border-color: inherit;
    border-style: inherit;
    border-width: 1px 0 0;
    content: '';
    transform: scaleY(0.5);
  }
}
</style>
