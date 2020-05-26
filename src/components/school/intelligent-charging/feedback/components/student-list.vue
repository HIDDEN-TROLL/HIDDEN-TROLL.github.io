<template>
  <div class="charge-feedback-student-list">
    <more-tabs class="class-tabs" v-model="currentClassIndex" :list="classNameList" size="small" />

    <div class="table-head">
      <van-row>
        <van-col @click.native="sort('name')" :class="{ currentSortColumn: sortColName === 'name' }" span="4">姓名</van-col>
        <van-col @click.native="sort('bindTime')" :class="{ currentSortColumn: sortColName === 'bindTime' }" span="8">绑定时间</van-col>
        <van-col @click.native="sort('unbindTime')" :class="{ currentSortColumn: sortColName === 'unbindTime' }" span="8">删除时间</van-col>
        <van-col span="4">选择</van-col>
      </van-row>
    </div>
    <van-list class="table-body" :finished="studentList.length > 10" finished-text="没有更多了">
      <div class="table-content">
        <van-row v-for="(student, index) in studentList" :key="index">
          <van-col span="4">{{ student.name }}</van-col>
          <van-col span="8">{{ student.bindTimeText }}</van-col>
          <van-col span="8">{{ student.unbindTimeText }}</van-col>
          <van-col span="4">
            <van-checkbox :value="$store.getters['charge/feedbackSelectStudentIdList'].includes(student.id)" @input="$store.commit('charge/feedbackSelectStudent', student)" checked-color="#3770fb" />
          </van-col>
        </van-row>
      </div>
    </van-list>
  </div>
</template>

<script>
import { Row, Col, List, Checkbox } from 'vant'
import moreTabs from '@/components/common/more-tabs'

export default {
  name: 'charge-feedback-student-list',
  components: {
    moreTabs,
    vanRow: Row,
    vanCol: Col,
    vanList: List,
    vanCheckbox: Checkbox,
  },
  props: {
    billData: {
      type: Object,
    },
  },
  data() {
    return {
      currentClassIndex: 0,

      sortColName: 'id',
      isDescSort: false,
    }
  },
  computed: {
    isMinimumAmount() {
      return this.billData.isMinimumAmount
    },
    classNameList() {
      return this.billData.classes.map(clazz => clazz.name)
    },
    timeColSpan() {
      return this.isMinimumAmount ? 8 : 6
    },
    studentList() {
      const list = this.billData.classes[this.currentClassIndex] && Array.isArray(this.billData.classes[this.currentClassIndex].students) ? this.billData.classes[this.currentClassIndex].students : []
      list.sort((student1, student2) => {
        if (student1[this.sortColName] === student2[this.sortColName]) {
          return 0
        }
        if (this.sortColName === 'name') {
          return student1[this.sortColName].localeCompare(student2[this.sortColName])
        }
        return student1[this.sortColName] - student2[this.sortColName]
      })
      if (this.isDescSort) {
        list.reverse()
      }
      return list
    },
  },
  methods: {
    sort(colName) {
      if (this.sortColName === colName) {
        this.isDescSort = !this.isDescSort
      } else {
        this.sortColName = colName
      }
    },
  },
};
</script>
<style scoped lang="less">
.charge-feedback-student-list {
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  .class-tabs, .table-head {
    flex-shrink: 0;
  }
  .table-body {
    flex-grow: 1;
    overflow: scroll;
  }

}

.class-list {
  padding: 0 0.16rem;
}

.table-head {
  padding: 0 0.1rem;
  font-size: 0.14rem;
  color: #666;
  line-height: 0.38rem;

  .currentSortColumn {
    color: #84C225;
  }

  .row {
    text-align: center;

    .col:first-child {
      text-align: left;
    }
  }
}

.table-content {
  padding: 0 0.1rem;
  font-size: 0.16rem;
  color: #999;
  line-height: 0.28rem;

  .van-row {
    margin: .1rem 0;
  }
}

</style>
