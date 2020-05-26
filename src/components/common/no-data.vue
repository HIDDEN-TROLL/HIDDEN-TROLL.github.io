<template>
  <p class="no-data" :style="{ color, background }" v-html="text"></p>
</template>
<script>
export default {
  name: 'no-data',
  props: {
    text: {
      type: String,
      default: '暂无数据'
    },
    color: {
      type: String,
      default: '#666'
    },
    background: {
      type: String,
      default: '#fff'
    },
  },
}
</script>
<style scoped>
.no-data {
  padding: 2rem 0;
  text-align: center;
  font-size: .16rem;
}
</style>

