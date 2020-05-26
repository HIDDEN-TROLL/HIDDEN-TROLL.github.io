<template>
  <div class="score">
    <div class="go-back">
      <van-nav-bar title="孩子成绩"/>
    </div>

    <van-tabs v-model="tabIndex" type="card" class="tabs" @change="onTabChange">
      <van-tab title="语文">
      </van-tab>
      <van-tab title="数学">

      </van-tab>
      <van-tab title="英语">
      </van-tab>
    </van-tabs>

    <template
      v-for="(subject, index) in subjectList" >

      <score-content
        :key="subject"
        class="content"
        :subject="subject"
        v-if="renderedSubjectList.includes(subject)"
        v-show="tabIndex === index"
      />

    </template>


    <!--<score-content class="content" :subject="1"/>-->
    <!--<score-content class="content" :subject="2"/>-->
    <!--<score-content class="content" :subject="3"/>-->
  </div>
</template>
<script>
import { NavBar, Tabs, Tab } from 'vant'
import scoreContent from './components/content'

export default {
  name: 'ParentHomeScore',
  components: {
    vanNavBar: NavBar,
    vanTabs: Tabs,
    vanTab: Tab,
    scoreContent,
  },
  data() {
    return {
      tabIndex: 0,
      subjectList: [1, 2, 3],
      renderedSubjectList: [1],
    }
  },
  methods: {
    onTabChange(index) {
      const subject = index + 1
      if (!this.renderedSubjectList.includes(subject)) {
        this.renderedSubjectList.push(subject)
      }
    }
  }
}
</script>

<style scoped lang="less">
.score {
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
