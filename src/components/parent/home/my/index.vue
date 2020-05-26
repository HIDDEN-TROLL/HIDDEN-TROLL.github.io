<template>
  <div class="parent_home_my">
    <van-nav-bar
      title="我的"
      right-text="切换"
      @click-right="$router.push({ name: 'SwitchAccount' })" />

    <van-tabs v-model="tabIndex" class="tabs" type="card" @change="onTabChange">
      <van-tab title="家长积分" />
      <van-tab title="我的孩子" />
    </van-tabs>

    <parent-score class="content parent-score" v-show="tabIndex === 0" />
    <my-child class="content my-child" v-if="isMyChildRendered" v-show="tabIndex === 1" />
  </div>
</template>

<script>
import { NavBar, Tabs, Tab } from 'vant';
import parentScore from './parent-score'
import myChild from './my-child'

export default {
  name: 'parent_home_my',
  components: {
    vanNavBar: NavBar,
    vanTabs: Tabs,
    vanTab: Tab,
    parentScore,
    myChild,
  },
  data() {
    return {
      tabIndex: 0,
      isMyChildRendered: false,
    }
  },
  methods: {
    onTabChange(index) {
      if (index === 1) {
        this.isMyChildRendered = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.parent_home_my {
  height: 100vh;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #fff;

  .tabs {
    margin: .12rem 0;
  }
  .content {
    flex-grow: 1;
    overflow-y: scroll;
  }
}
</style>
