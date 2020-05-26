<template>
  <section>
    <van-nav-bar
      :title="$route.meta.title"
      :left-text="!isFromTemplate ? '返回' : ''"
      :left-arrow="!isFromTemplate"
      :z-index="100"
      :right-text="'筛选日期' + (dataFilterName ? `：${dataFilterName}` : '')"
      class="header"
      fixed
      @click-left="$router.back()"
      @click-right="isDateFilterShow = true" />

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

    <date-filter
      :show="isDateFilterShow"
      @confirm="onDateFilterChange"
      @cancel="isDateFilterShow = false" />
  </section>
</template>

<script>
import { NavBar, List } from 'vant'
import { getParamFromUrlAndRoute, isEmpty } from '@/utils'
import { getHomeworkHistory } from '@/api/parent/homework'
import studentItem from './components/student-item.vue'
import dateFilter from './components/date-filter.vue'

export default {
  name: 'ParentHomeworkHistory',
  components: {
    vanNavBar: NavBar,
    vanList: List,
    studentItem,
    dateFilter,
  },
  data() {
    return {
      loading: false,
      finished: false,

      isDateFilterShow: false,
      dataFilterName: '',
      dateStart: null,
      dateEnd: null,
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
  computed: {
    nextId() {
      return Array.isArray(this.data) && this.data.length > 0 ? this.data[this.data.length-1].id : 0
    },
    finishedText() {
      if (this.finished && isEmpty(this.data)) {
        if (this.dataFilterName) {
          return '该时间范围内老师没有给孩子提交过作业'
        } else {
          return '老师还没有给孩子提交过作业'
        }
      }
      return '没有更多了'
    },
  },
  methods: {
    onLoad() {
      this.loading = true
      getHomeworkHistory(this.nextId, this.dateStart, this.dateEnd, this.templateId)
        .then(response => {
          if (response.data.meta.success) {
            if (isEmpty(response.data.data)) {
              this.finished = true
            } else {
              this.data = this.data.concat(response.data.data)
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
    onDateFilterChange(data) {
      const [dateStart, dateEnd] = data.range
      this.isDateFilterShow = false
      this.dateStart = dateStart
      this.dateEnd = dateEnd
      this.dataFilterName = data.rangeName
      this.data = []
      this.finished = false
      this.onLoad()
    }
  }
}
</script>
