<template>

  <div class="father">
    <div class="son" v-for="(item, index) in foodList" :key="index">
      <img :src="item.imgUrl" alt="" />
      <div class="foodname"><span>{{item.name}}</span></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'food-type-list',
  props: {
    foodList: {
      required: true,
      type: Array,
    },
  },
}
</script>

<style scoped lang="less">
.topimg {
}

</style>
