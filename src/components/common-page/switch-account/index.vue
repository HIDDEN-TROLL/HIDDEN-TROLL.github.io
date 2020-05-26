<template>
  <div class="switch-account">
    <van-nav-bar
      class="nav"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()" />

    <van-list
      class="list"
      :loading="loading">
      <van-cell
        v-for="(account, index) in list"
        :key="index"
        clickable
        :title="account.name"
        :title-style="{ 'flex-grow': 3 }"
        :label="account | labelFilter"
        :value="account.isCurrent ? '✔' : ''"
        value-class="cell-value"
        @click="select(account)"
      />
    </van-list>

  </div>
</template>

<script>
import { NavBar, List, Cell } from 'vant';
import { getAccountList, switchAccount } from '@/api/common'
import { param2Obj, param } from '@/utils'

export default {
  name: 'SwitchAccount',
  data() {
    return {
      loading: false,
      list: [],
    }
  },
  components: {
    vanNavBar: NavBar,
    vanList: List,
    vanCell: Cell,
  },
  filters: {
    labelFilter(account) {
      let text
      switch(account.type) {
        case 1:
          text = (account.schoolName ? account.schoolName : '') + '(家长)'
          break;
        case 2:
          text = (account.schoolName ? account.schoolName : '') + '(教师)'
          break;
        case 3:
          text = (account.schoolName ? account.schoolName : '') + '(校长)'
          break;
        case 4:
          text = (account.brandName ? account.brandName : '') + '(品牌)'
          break;
        case 5:
          text = (account.agentName ? account.agentName : '') + '(代理)'
          break;
        case 6:
          text = '(新师路角色)'
          break;
      }
      return text
    }
  },
  methods: {
    select(account) {
      if (account.isCurrent) {
        return
      }
      this.$loading('切换中...')
      switchAccount({
        id: account.id,
        type: account.type,
      })
        .then(response => {
          if (response.data.meta.success) {
            this.resetCurrent(account)
            this.handleRedirect(account)
          }
        })
        .finally(() => { this.$loadingHide() })
    },
    resetCurrent(account) {
      this.list.forEach(item => item.isCurrent = false)
      account.isCurrent = true
    },
    handleRedirect(account) {
      let targetRouteName
      switch(account.type) {
        case 1:
          targetRouteName = 'ParentHomeIndex'
          break;
        case 2:
          targetRouteName = 'TeacherHomeIndex'
          break;
        case 3:
          targetRouteName = 'SchoolHomeIndex'
          break;
        case 4:
          targetRouteName = 'BrandIndex'
          break;
        case 5:
          targetRouteName = 'AgentIndex'
          break;
        case 6:
          targetRouteName = 'NewConceptIndex'
          break;

        default:
          targetRouteName = 'TeacherHomeIndex'
      }
      let targetRoute = this.$router.resolve({ name: targetRouteName }).href
      let search = location.search
      search = param2Obj(search)
      delete search.token
      search.random = Math.random() // 只修改hash值, 浏览器不会刷新页面. 增加一个随机的search浏览器就会刷新页面
      search = '?' + param(search)

      location.href = location.origin + location.pathname + search + targetRoute
    },
  },
  created() {
    this.loading = true
    getAccountList(true) // false 表示只获取当前端的账号, 就是说当前登录的是教师角色, 则只获取其他教师角色. true 则获取当前公众号的所有端的账号, 就是说学生,教师,校长等都一起获取
      .then(response => {
        if (response.data.meta.success) {
          this.list = response.data.data
        }
      })
      .finally(() => { this.loading = false })
  }
}
</script>

<style scoped lang="less">
.switch-account {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .nav {
    flex-shrink: 0;
  }

  .list {
    flex-grow: 1;
    overflow: scroll;

    .cell-value {
      color: #84C225;
      font-size: .2rem;
      justify-content: flex-end;
      align-items: center;
      display: flex;
    }
  }
}
</style>
