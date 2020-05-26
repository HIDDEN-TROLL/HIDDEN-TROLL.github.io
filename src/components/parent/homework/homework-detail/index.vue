<template>
  <section>
    <van-nav-bar
      :title="$route.meta.title"
      :left-text="!isFromTemplate ? '返回' : ''"
      :left-arrow="!isFromTemplate"
      right-text="查看更多记录"
      right-arrow
      :z-index="100"
      class="header"
      fixed
      @click-left="$router.back()"
      @click-right="$router.push({ name:'ParentHomeworkHistoryList' })" />

    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="finishedText"
      style="margin-top: 46px; background: #f1f1f1"
      @load="onLoad">

      <student-item
        v-for="(item, index) in data"
        :key="index"
        :data="item" />

    </van-list>
  </section>
</template>

<script>
import { NavBar, List } from 'vant'
import { getParamFromUrlAndRoute, isEmpty } from '@/utils'
import { getHomeworkDetail } from '@/api/parent/homework'
import studentItem from './components/student-item.vue'

export default {
  name: 'ParentHomeworkHistoryDetail',
  components: {
    vanNavBar: NavBar,
    vanList: List,
    studentItem,
  },
  data() {
    return {
      loading: false,
      finished: false,
      finishedText: '',
      emptyText: '老师还没有给孩子提交过作业',

      data: [],

      isFromTemplate: false,
      templateId: 0,
    }
  },
  created() {
    const templateId = getParamFromUrlAndRoute('template_id', this.$router)
    if (templateId) {
      this.isFromTemplate = true
      this.templateId = templateId
    }
  },
  methods: {
    onLoad() {
      this.loading = true
      getHomeworkDetail(this.templateId)
        .then(response => {
          if (response.data.meta.success) {
            if (!isEmpty(response.data.data)) {
              this.data = this.data.concat(response.data.data)
            }

            this.finished = true
            if (isEmpty(this.data)) {
              this.finishedText = this.emptyText
            }
          }
        })
        .catch(() => {
          if (isEmpty(this.data)) {
            this.finished = true
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

  }
}
</script>
