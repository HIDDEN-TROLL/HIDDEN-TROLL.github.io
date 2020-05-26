<template>
  <div class="homework_manage_history">

    <nav-bar
      class="header"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      right-text="一键通知"
      @click-left="$router.back()"
      @click-right="$router.push({ name: 'TeacherHomeworkQuickNotice' })" />

    <more-tabs class="class_tabs" v-model="classIndex" :list="classNameList" />

    <datepicker class="datepicker" text-format="Y-m-d" :mode="1" @change="onDateChange" />

    <div class="history">
      <div v-if="loading" class="loading_warp">
        <loading class="loading" size="40px"/>
      </div>
      <p v-else-if="history.length === 0" class="no_data" >暂无记录</p>

      <student-item
        v-for="(item, index) in history"
        :key="index"
        :data="item" />
    </div>


  </div>
</template>

<script>
import { NavBar, Loading } from 'vant';
import moreTabs from '@/components/common/more-tabs.vue'
import datepicker from '@/components/common/datepicker.vue'
import studentItem from './components/student-item.vue'
import { getHomeworkNoticeHistory } from '@/api/teacher/homework'
import { getAllClass } from '@/api/common'
import { date } from '@/utils'

export default {
  name: 'TeacherHomeworkManageHistory',
  components: {
    NavBar,
    Loading,
    moreTabs,
    datepicker,
    studentItem,
  },
  data() {
    return {
      loading: true,
      classIndex: 0,
      classList: [],
      date: date('Y-m-d', new Date()),
      data: {},
    }
  },
  computed: {
    classId() {
      if (this.classList[this.classIndex]) {
        return this.classList[this.classIndex].id
      }
      return 0
    },
    classNameList() {
      return this.classList.map(clazz => clazz.name)
    },
    history() {
      if (this.data[this.date] && this.data[this.date][this.classId]) {
        return this.data[this.date][this.classId]
      }
      return []
    },
  },
  mounted() {
    this.$loading()
    getAllClass()
      .then(response => {
        if (response.data.meta.success) {
          this.classList = response.data.data
          this.fetchHistory()
        }
      })
      .finally(() => {
        this.$loadingHide()
      })
  },
  watch: {
    classIndex() {
      this.fetchHistory()
    }
  },
  methods: {
    onDateChange(newDate) {
      this.date = date('Y-m-d', newDate)
      this.fetchHistory()
    },
    fetchHistory() {
      if (this.history.length > 0) {
        return
      }
      this.loading = true
      getHomeworkNoticeHistory(this.classId, this.date)
        .then(response => {
          if (response.data.meta.success) {
            if (this.data[this.date] === undefined) {
              this.$set(this.data, this.date, {
                [this.classId]: response.data.data
              })
            } else {
              this.$set(this.data[this.date], this.classId, response.data.data)
            }
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style scoped lang="less">
.homework_manage_history {
  font-size: 0;
  background-color: #f3f7f8;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    flex-shrink: 0;
  }

  .class_tabs, .datepicker {
    flex-shrink: 0;
    background-color: #fff;
  }
  .datepicker {
    margin-bottom: .12rem;
  }

  .history {
    flex-grow: 1;
    overflow: scroll;
    background-color: #fff;

    .loading_warp {
      height: 100%;
      padding: .4rem 0;

      .loading {
        margin: 0 auto;
      }
    }

    .no_data {
      height: 100%;
      padding: .4rem 0;
      text-align: center;
      font-size: .16rem;
    }
  }
}
</style>

