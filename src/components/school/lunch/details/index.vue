<template>
  <div class="lunch-details">
    <div class="header">
      <nav-bar
        :title="$route.meta.title"
        left-text="返回"
        left-arrow
        @click-left="$router.back()" />

      <more-tabs v-model="classSwitcherIndex" :list="classNameList" />
    </div>

    <div v-if="data !== undefined" class="area">
      <no-data v-show="isEmpty(studentList)" />
      <router-link
        v-show="!isEmpty(studentList)"
        v-for="(student, index) in studentList"
        :key="index"
        class="item"
        :to="{ name: 'LunchDetailsStudent', params: { student_id: student.stuId, student_name: student.stuName } }">
        <div class="left">
          <span>{{ student.stuName }}</span>
        </div>
        <div class="center">
          <span>本月午休表现: {{ student.siestaNum }}条数据</span>
          <span>本月用餐情况: {{ student.diningNum }}条数据</span>
        </div>
        <span class="right arrow fa fa-chevron-right"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { NavBar, Row, Col } from 'vant';
import moreTabs from '@/components/common/more-tabs';
import noData from '@/components/common/no-data';
import { getLunchDetails } from '@/api/school/lunch'

export default {
  name: 'LunchDetails',
  components: {
    NavBar,
    moreTabs,
    noData,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  data() {
    return {
      data: undefined,
      classSwitcherIndex: 0,
    }
  },
  computed: {
    classNameList() {
      if (!Array.isArray(this.data)) {
        return []
      }
      return this.data.map(clazz => clazz.clsName)
    },
    studentList () {
      if (!Array.isArray(this.data) || !this.data[this.classSwitcherIndex] || !Array.isArray(this.data[this.classSwitcherIndex].stuList)) {
        return []
      }
      return this.data[this.classSwitcherIndex].stuList
    }
  },
  mounted() {
    this.$loading();
    getLunchDetails()
      .then(response => {
        if (response.data.meta.success) {
          this.data = response.data.data
        }
      })
      .finally(() => { this.$loadingHide() })
  },
}
</script>

<style scoped lang="less">
.lunch-details {
  height: 100vh;
  position: relative;
  padding-top: 90px;
  background: #fff;
  font-size: .16rem;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
}

.area {
  height: 100%;
  z-index: 2;
  background: #fff;
  .item {
    margin: .16rem;
    padding: .16rem;
    border: 1px solid #333;
    display: flex;
    border-radius: 8px;
    color: #333;
    text-decoration: none;

    .left {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-width: 0.6rem;
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
      font-size: .24rem;
      color: #999;
      margin-left: .36rem;
    }

  }
}
</style>
