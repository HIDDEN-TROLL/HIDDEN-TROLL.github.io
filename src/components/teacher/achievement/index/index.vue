<template>
  <div class="achievement">

    <nav-bar
      class="header"
      :title="$route.meta.title" />

    <div v-if="isDataReady" class="content">
      <info />
      <rank />
    </div>

  </div>
</template>

<script>
import { NavBar } from 'vant'
import info from './components/info.vue'
import rank from './components/rank.vue'
import { mapActions, mapState } from 'vuex'
import storeModuleRegister from '@/utils/store-module-register'
import storeModule from '@/store/modules/teacher/achievement'

export default {
  name: 'TeacherAchievement',
  components: {
    NavBar,
    info,
    rank,
  },
  beforeCreate() {
    storeModuleRegister(storeModule)
  },
  created() {
    this.$loading()
    this.fetchData()
      .finally(() => {
        this.$loadingHide()
      })
  },
  computed: {
    ...mapState('achievement', [
      'isDataReady'
    ]),
  },
  methods: {
    ...mapActions('achievement', [
      'fetchData'
    ]),
  },
};
</script>

<style scoped lang="less">
.achievement {
  font-size: .16rem;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;

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
