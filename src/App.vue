<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
@import '~vant/lib/index.css';
@import "assets/vant.style.less";
/*@import "./assets/style.css";*/

/*暂时不使用 font awesome 的字体, 后面需要再取消注释*/
/*@import "assets/font-awesome/css/font-awesome.min.css";*/

/*统一用iconfont.cn来生成字体图标*/
@import "assets/iconfont/iconfont.css";

#app {
  width: 100%;
  font-family: 'PingFangSC-Regular', 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
  color: #2c3e50;
}

.icon-first {
  font-size: 0.24rem;
  color: red;
}
.no-scrollbar::-webkit-scrollbar{
  width: 0;
  height: 0;
}

</style>
