<template>
  <div class="container">
    <van-nav-bar
      :title="$route.meta.title"
      :left-text="!isFromTemplate ? '返回' : ''"
      :left-arrow="!isFromTemplate"
      :right-text="tabIndex === 1  ? '刷新'  : '' "
      class="header"
      @click-left="$router.back()"
      @click-right="ReSet()"
    />

    <div class="content">

      <van-tabs v-model="tabIndex" type="card" class="tabs">
        <van-tab title="待点评"/>
        <van-tab title="已点评"/>
      </van-tabs>

      <van-row class="filter" type="flex" justify="space-around">
        <van-col
          v-for="(item, key) in filter"
          :key="key"
          class="filter-item"
          span="6">
          <span class="hover" @click="filterCurrentState = key ; filterShow = true">
            {{ item.name | formatName }}
            <van-icon name="arrow-down" color="#69f"/>
          </span>
        </van-col>
      </van-row>
      <van-action-sheet
        v-model="filterShow"
        :actions="filterOptions[filterCurrentState] ? filterOptions[filterCurrentState] : []"
        cancel-text="取消"
        @select="onFilterActionSelect" />

      <pending-list v-show="tabIndex === 0" :filter="filter" :discipline="discipline" />
      <finish-list v-if="isSecondTabRendered" v-show="tabIndex === 1" :filter="filter" ref="reLoading"/>

    </div>

  </div>
</template>

<script>
import { NavBar, Tab, Tabs, Row, Col, Icon, Actionsheet } from 'vant';
import { getOnlineHomeworkReviewFilterOptions } from '@/api/teacher/homework'
import pendingList from './components/pending-list'
import finishList from './components/finish-list'
import { getParamFromUrlAndRoute } from '@/utils'

export default {
  name: 'TeacherHomeworkOnlineReview',
  components: {
    vanNavBar: NavBar,
    vanTab: Tab,
    vanTabs: Tabs,
    vanRow: Row,
    vanCol: Col,
    vanIcon: Icon,
    vanActionSheet: Actionsheet,
    pendingList,
    finishList,
  },
  filters: {
    formatName(name) {
      return name.replace('全部', '')
    },
  },
  data() {
    return {
      tabIndex: 0,
      isSecondTabRendered: false,
      isFromTemplate: false,
      templateId: 0,

      filterShow: false,
      filterCurrentState: null,
      filterOptions: {},
      discipline: [],
      filter: {
        'class': {
          name: '全部班级',
          value: 0,
        },
        'grade': {
          name: '全部年级',
          value: 0,
        },
        'subject': {
          name: '全部科目',
          value: 0,
        },
        'date': {
          name: '全部日期',
          value: 0,
        },
      },
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
    this.templateId = getParamFromUrlAndRoute('template_id', this.$router)
    this.isFromTemplate = this.templateId > 0

    const params = !this.isFromTemplate ? undefined : {
      from: 'template',
      template_id: this.templateId
    }
    this.$loading()
    getOnlineHomeworkReviewFilterOptions(params)
      .then(response => {
        if (response.data.meta.success) {
          this.filterOptions = this.genFilterOptions(response.data.data)
          this.discipline = response.data.data.discipline
      }
      })
      .finally(() => {
        this.$loadingHide()
      })
  },
  methods: {
    ReSet(){
      this.$refs.reLoading.reLoadingFun()
    },
    genFilterOptions(data) {
      const classOptions = data.class
      classOptions.unshift({
        name: '全部班级',
        value: 0,
      })

      const gradeOptions = ['全部', '一', '二', '三', '四', '五', '六'].map((p, index) => {
        return {
          name: p + '年级',
          value: index,
        }
      })
      gradeOptions.push({
        name: '初中',
        value: 7,
      })

      const subjectOptions = data.subjects
      subjectOptions.unshift({
        name: '全部科目',
        value: 0,
      })

      const dateOptions = ['全部日期', '今日提交', '昨日提交'].map((name, value) => {
        let date
        if (value === 1) {
          date = new Date()
        } else if (value === 2) {
          date = new Date()
          date.setDate(date.getDate() - 1)
        }
        return {
          name,
          value,
          date
        }
      })

      return {
        'class': classOptions,
        'grade': gradeOptions,
        'subject': subjectOptions,
        'date': dateOptions,
      }
    },
    onFilterActionSelect(action) {
      this.filter[this.filterCurrentState] = action
      this.filter = Object.assign({}, this.filter)
      this.filterShow = false
    },
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

    .filter {
      font-size: .14rem;
      color: #69f;
      margin-bottom: .12rem;
      flex-shrink: 0;

      .filter-item {
        text-align: center;

        .hover:active {
          opacity: .8;
          background: #e2e2e2;
        }
      }
    }
  }
}
</style>
