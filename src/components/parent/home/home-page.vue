<template>
  <div>
    <keep-alive>
      <router-view :class="{ avoid_covered: !isFromTemplate && showBottomTabBar }"/>
    </keep-alive>
    <van-tab-bar v-model="active" v-show="!isFromTemplate && showBottomTabBar" :z-index="100">
      <van-tab-bar-item
        v-for="(item, index) in data"
        :key="index"
        @click="go(item)">

        <icon slot="icon" :name="item.icon" :color="active === index ? '#1989fa' : 'gray'"/>
        {{ item.name }}

      </van-tab-bar-item>
    </van-tab-bar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
import { getParamFromUrlAndRoute, handleRouteTarget } from '@/utils'
import icon from '@/components/common/icon'
import { ROLE_TYPE_PARENT } from '@/utils/constant'
import { mapActions, mapState, mapMutations } from 'vuex'
import storeModuleRegister from '@/utils/store-module-register'
import storeModule from '@/store/modules/parent/home'

let isFirstRun = true
let isCheckedCorrectRoute = false

export default {
  name: 'ParentHome',
  components: {
    vanTabBar: Tabbar,
    vanTabBarItem: TabbarItem,
    icon,
  },
  data() {
    return {
      active: 0,
      isFromTemplate: false,
    }
  },
  computed: {
    ...mapState('parentHome', {
      data: 'homePageData',
      showBottomTabBar: 'showBottomTabBar',
    }),
  },
  beforeCreate() {
    storeModuleRegister(storeModule)
  },
  created() {
    const templateId = getParamFromUrlAndRoute('template_id', this.$router)
    this.isFromTemplate = templateId > 0

    this.$loading()
    this.fetchHomeData()
      .finally(() => {
        this.updateActive(this.$route)
        this.checkIsHideBottomTabBar(this.$route)
        if (!isCheckedCorrectRoute) {
          isCheckedCorrectRoute = true
          this.checkCorrectRoute()
        }
        this.$loadingHide()
      })

    // 设置当前是家长端
    this.$store.commit('UPDATE_ROLE_TYPE', ROLE_TYPE_PARENT)

    if (isFirstRun) {
      this.$router.afterEach(to => {
        this.updateActive(to)
        this.checkIsHideBottomTabBar(to)
      })
    }
    isFirstRun = false
  },
  methods: {
    ...mapActions('parentHome', [
      'fetchHomeData'
    ]),
    ...mapMutations('parentHome', [
      'setIsShowBottomTabBar'
    ]),
    go(item) {
      let target
      let isReplace
      if (typeof item === 'string') {
        target = item
        isReplace = target.toLowerCase().includes('home')
      } else {
        target = item.target
        isReplace = item.targetReplace !== undefined ? item.targetReplace : target.toLowerCase().includes('home')
      }
      handleRouteTarget(this.$router, target, isReplace)
    },
    updateActive(route) {
      const index = this.data.findIndex(item => item.target === route.name)
      if (Number.isInteger(index)) {
        this.active = index
      }
    },
    checkIsHideBottomTabBar(route) {
      this.setIsShowBottomTabBar(!route.meta.hideBottomTabBar)
    },
    checkCorrectRoute() {
      // 比如当前的路由是不允许进入的, 则自动跳转到其他允许进入的路由中
      const isExists = this.data.some(item => item.target === this.$route.name)
      if (!isExists && this.data.length > 0) {
        const name = this.data[0].target
        this.$router.replace({ name })
      }
    },
  }
}
</script>
<style>
.avoid_covered {
  padding-bottom: 50px;
}
</style>
