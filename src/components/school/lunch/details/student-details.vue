<template>
  <div class="student_details">
    <div class="header">
      <nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="$router.back()" />

      <datepicker textFormat="Y年m月" @change="fetchData"/>
    </div>

    <div v-if="data !== undefined" class="content">
      <div class="title">午休状况</div>
      <c-table :data="data" property="status"/>
      <div class="title">午休纪律</div>
      <c-table :data="data" property="discipline"/>

      <div class="title">用餐表现</div>
      <c-table :data="data" property="behave"/>
      <div class="title">用餐时间</div>
      <c-table :data="data" property="time"/>
    </div>
  </div>
</template>

<script>

import { NavBar } from 'vant'
import datepicker from '@/components/common/datepicker'
import cTable from './table.vue'
import { isEmpty, date } from '@/utils'
import { getStudentLunchDetails } from '@/api/school/lunch'

export default {
  name: 'LunchDetailsStudent',
  components: {
    NavBar,
    datepicker,
    cTable,
  },
  data() {
    return {
      title: '学生详情',
      stuId: 0,
      data: undefined
    }
  },
  mounted() {
    this.stuId = parseInt(this.$route.params.student_id)
    const stuName = this.$route.params.student_name
    if (!isEmpty(stuName)) {
      this.title = stuName
    }
    if (isEmpty(this.stuId)) {
      this.$toast('参数错误')
      this.$router.back()
      return
    }
    this.fetchData()
  },
  methods: {
    fetchData(targetDate = new Date()) {
      const dateString = date('Y-m', targetDate)

      this.$loading()
      getStudentLunchDetails(this.stuId, dateString)
        .then(response => {
          if (response.data.meta.success) {
            this.data = response.data.data
          }
        })
        .finally(() => { this.$loadingHide() })
    }
  }
}
</script>

<style scoped lang="less">
.student_details {
  height: 100vh;
  position: relative;
  padding-top: 1rem;
  background: #fff;
  color: #666;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.area {
  height: 100%;
  /*position: relative;*/
  z-index: 2;
  background: #fff;

  .item {
    margin: .4rem;
    padding: .4rem;
    border: 1px solid #333;
    display: flex;
    border-radius: .3rem;
    color: #000;

    .left {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-width: 1.5rem;
    }

    .center {
      display: inline-flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: center;
      align-items: center;
    }

    .right {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 0.6rem;
      color: #999;
      margin-left: .9rem;
    }

  }
}

.content {
  margin: 0 .16rem;
}

.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: .6rem;
  background: #f2f2f2;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .add_comment {
    width: 50%;
  }
}
.title{
  padding-left: .08rem;
  margin: .16rem 0;
  border-left: solid 0.16rem;
  font-size: .16rem;

  &:first-child {
    margin-top: 0;
  }
}
</style>
