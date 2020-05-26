<template>
  <div class="container">
    <van-nav-bar
      :title="$route.meta.title"
      :left-text="!isFromTemplate ? '返回' : ''"
      :left-arrow="!isFromTemplate"
      class="header"
      @click-left="$router.back()"
    />

    <div class="content">

      <van-tabs v-model="tabIndex" type="card" class="tabs">
        <van-tab title="上传作业" />
        <van-tab title="历史记录" />
      </van-tabs>

      <homework-upload v-show="tabIndex === 0" />
      <homework-upload-history v-if="isSecondTabRendered" v-show="tabIndex === 1" />

    </div>

  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant';
import homeworkUpload from './components/homework-upload'
import homeworkUploadHistory from './components/homework-upload-history'
import { getParamFromUrlAndRoute } from '@/utils'

export default {
  name: 'ParentHomeworkOnlineReview',
  components: {
    vanNavBar: NavBar,
    vanTab: Tab,
    vanTabs: Tabs,
    homeworkUpload,
    homeworkUploadHistory
  },
  data() {
    return {
      tabIndex: 0,
      isSecondTabRendered: false,

      isFromTemplate: false,
    }
  },
  watch: {
    tabIndex() {
      if (this.tabIndex === 1) {
        this.isSecondTabRendered = true
      }
    },
  },
  created() {
    this.isFromTemplate = getParamFromUrlAndRoute('template_id', this.$router) > 0
    if (this.isFromTemplate) {
      this.tabIndex = 1
    }
  },
}
</script>

<style scoped lang="less">
.container {
  font-size: .16rem;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header {
    flex-shrink: 0;
  }


  .content {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;

    .loading {
      margin: .15rem auto;
    }

    .tabs {
      margin: .12rem 0;
    }
  }
}
</style>
