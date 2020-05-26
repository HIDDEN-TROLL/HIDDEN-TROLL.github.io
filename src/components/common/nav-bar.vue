<template>
    <div class="go-back">
        <van-nav-bar fixed :title="title" :left-text="leftText" :right-text="rightText" :left-arrow="leftArrow" @click-left="getBack" @click-right="unitManagement" />
    </div>
</template>
<script>
import { NavBar } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    title: {
      type: String
    },
    rightText: {
      type: String
    },
    leftArrow: {
      type: Boolean,
      default: true,
    },
    leftText: {
      type: String
    },

    id:{
        type: String
    }//预留口子
  },
  data() {
    return {};
  },
  methods: {
    getBack() {
      this.$router.go(-1);
    },
    unitManagement() {
      //  根据rightText 进行判断和跳转
        console.log(1)
    }
  }
};
</script>
<style lang="less">
.go-back {
  .van-nav-bar {
    z-index: 999 !important;
    background-color: #3770fb;
    font-size: 0.16rem;
    .van-nav-bar__text {
      color: #fff;
      font-size: 0.16rem;
    }
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon-arrow-left:before {
      color: #fff;
    }
  }
}
</style>

