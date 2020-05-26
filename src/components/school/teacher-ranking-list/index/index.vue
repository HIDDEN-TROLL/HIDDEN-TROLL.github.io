<template>
  <div class="teacher_ranking_list with-tab-bar">

    <nav-bar
      class="header"
      :title="$route.meta.title" />

    <div v-if="isDataReady" class="content">
      <info @startGrade="startGrade"/>
      <rank @startGrade="startGrade" />
    </div>

    <grade-dialog ref="grade-dialog"/>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import info from './components/info.vue'
import rank from './components/rank.vue'
import gradeDialog from './components/grade-dialog'
import { mapActions, mapState } from 'vuex'
import storeModuleRegister from '@/utils/store-module-register'
import storeModule from '@/store/modules/school/teacher-ranking-list'


export default {
  name: 'TeacherRankingList',
  components: {
    NavBar,
    info,
    rank,
    gradeDialog,
  },
  beforeCreate() {
    storeModuleRegister(storeModule)
  },
  created() {
    const silence = this.isDataReady
    if (!silence) {
      this.$loading()
    }
    this.fetchData()
      .finally(() => {
        if (!silence) {
          this.$loadingHide()
        }
      })
  },
  computed: {
    ...mapState('teacherRankingList', [
      'isDataReady'
    ]),
  },
  methods: {
    ...mapActions('teacherRankingList', [
      'fetchData'
    ]),
    startGrade(teacher) {
      this.$refs['grade-dialog'].start(teacher)
    },
  },
}
</script>

<style scoped lang="less">
.teacher_ranking_list {
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
  }
}
</style>
