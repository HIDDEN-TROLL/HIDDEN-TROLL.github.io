<template>
  <div class="course-mall">

    <nav-bar
      class="header"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      right-text="筛选日期"
      @click-left="$router.back()"
      @click-right="$refs['date-filter'].show()" />

    <p class="info">
      <span class="date">{{ date }}</span>
      <span class="earn">共获利：{{ totalEarn }}</span>
    </p>

    <list
      class="content"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">

      <div
        v-for="(item, index) in list"
        :key="index"
        class="item">

        <p class="info">
          <span class="student-info">
            <span class="name">{{ item.studentName }}</span>
            <span class="gradeName">{{ item.gradeName }}</span>
            <span class="className">{{ item.className }}</span>
          </span>
          <span class="earn">获利：{{ item.earn }}</span>
        </p>
        <p class="desc">{{ item.desc }}</p>

      </div>
    </list>

    <date-filter-dialog ref="date-filter" @change="onDateFilterConfirm" />
  </div>
</template>

<script>
import { getPurchaseHistory } from '@/api/school/course-mall'
import { NavBar, List } from 'vant'
import dateFilterDialog from './components/date-filter-dialog'
import { formatDate } from '@/utils'

export default {
  name: 'CourseMallPurchaseHistory',
  components: {
    NavBar,
    List,
    dateFilterDialog,
  },
  data() {
    return {
      isActionSheetShow: false,
      loading: false,
      finished: false,
      requestParams: {
        nextId: 0,
      },
      list: [],
      date: '',
      totalEarn: '0元',
    }
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    onDateFilterConfirm(date) {
      if (Array.isArray(date)) {
        this.requestParams.startDate = date[0] instanceof Date ? formatDate(date[0]) : undefined
        this.requestParams.endDate = date[1] instanceof Date ? formatDate(date[1]) : undefined
      } else {
        const format = date instanceof Date ? formatDate(date) : formatDate(new Date())
        this.requestParams.startDate = format
        this.requestParams.endDate = format
      }
      this.list = []
      this.finished = false
      this.onLoad()
    },
    onLoad() {
      if (this.list.length > 0) {
        this.requestParams.nextId = this.list[this.list.length - 1].id
      } else {
        this.requestParams.nextId = 0
      }
      this.loading = true
      getPurchaseHistory(this.requestParams)
        .then(response => {
          if (response.data.meta.success) {
            this.date = response.data.data.date
            this.totalEarn = response.data.data.totalEarn
            const list = response.data.data.list
            if (Array.isArray(list) && list.length > 0) {
              this.list = this.list.concat(list)
            } else {
              this.finished = true
            }
          }
        })
        .catch(() => {
          this.finished = true
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style scoped lang="less">
.course-mall {
  font-size: .16rem;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header {
    flex-shrink: 0;
  }

  & > .info {
    display: flex;
    justify-content: space-between;
    border-bottom: .1rem solid #f2f2f2;
    padding: .1rem;

    .earn {
      font-size: 80%;
      color: #f66;
    }
  }

  .content {
    flex-grow: 1;
    overflow: scroll;

    .item {
      border: .01rem solid #ccc;
      border-radius: 0.1rem;
      box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.1);
      margin: .1rem;
      padding: .1rem 0.1rem;

      .info {
        display: flex;
        justify-content: space-between;
        margin-bottom: .1rem;

        .name {
          font-size: 105%;
          font-weight: bold;
        }
        .gradeName, .className {
          margin: 0 .1rem;
          color: #666;
        }
        .earn {
          font-size: 95%;
          color: #f66;
        }
      }

      .desc {
        color: #666;
      }
    }
  }

}
</style>
