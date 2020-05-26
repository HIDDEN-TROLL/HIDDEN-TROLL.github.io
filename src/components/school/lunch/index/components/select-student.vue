<template>
  <div class="lunch_select_student">

    <more-tabs class="scrollable" v-model="tabIndex" :list="classNameList" />

    <student-paginate
      v-for="(studentList, index) in studentList2dArray"
      :key="index"
      :index="index"
      v-show="tabIndex === index"
      :show="tabIndex === index"
      :student-list="studentList" />

  </div>
</template>
<script>
import moreTabs from '@/components/common/more-tabs.vue'
import studentPaginate from './student-paginate.vue'
import { mapState } from 'vuex'

export default {
  name: 'lunch_select_student',
  data() {
    return {
      tabIndex: 0,
    }
  },
  components: {
    moreTabs,
    studentPaginate,
  },
  computed: {
    ...mapState('lunch', [
      'classNameList',
      'studentList2dArray'
    ]),
  },
}
</script>
<style scoped lang="less">
.lunch_select_student {
  min-height: 10vh;
  background-color: #fff;
  margin-bottom: .12rem;
  flex-shrink: 0;
}
</style>
