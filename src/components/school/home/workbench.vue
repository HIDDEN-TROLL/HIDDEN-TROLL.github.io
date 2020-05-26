<template>
  <div id="education">
    <div class="go-back">
      <van-nav-bar title="工作台" fixed/>
    </div>
    <div id="work_top_search">
      <van-search shape="round" placeholder="请输入内容" v-model="search" style="display: none;"/>
    </div>
    <van-loading v-show="loading" class="loading" />
    <workbench-fun :fun-list="list" />
  </div>
</template>

<script>
import { NavBar, Search, Loading } from 'vant'
import workbenchFun from './components/workbench-fun'
import { isEmpty } from '@/utils'
import { getWorkbenchPageData } from '@/api/school/home'

export default {
  name: 'SchoolHomeWorkbench',
  components: {
    vanNavBar: NavBar,
    vanSearch: Search,
    vanLoading: Loading,
    workbenchFun: workbenchFun
  },
  data() {
    return {
      data: [],
      search: '',
      loading: false,
    };
  },
  computed: {
    list() {
      const list = this.data
      if (isEmpty(this.search)) {
        return list
      }

      const keyword = this.search

      return list.map(category => {
        return Object.assign({}, category, {
          items: category.items.filter(item => item.name.includes(keyword))
        })
      })
        .filter(category => category.items.length > 0)
    }
  },
  created(){
    this.loading = true
    getWorkbenchPageData()
      .then(response => {
        if (response.data.meta.success) {
          this.data = response.data.data
        }
      })
      .finally(() => {
        this.loading = false
      })
  },
};
</script>

<style scoped lang="less">
#education {
  background-color: #fff;
  .go-back {
    .van-nav-bar {
      background-color: #3770fb;
      .van-icon {
        font-size: 0.22rem;
        color: #fff;
      }
      .van-nav-bar__text {
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: #fff;
        font-weight: 400;
      }
      .van-nav-bar__title {
        color: #fff;
        font-weight: 400;
      }
    }
  }
  .school_fun {
    float: left;
    padding-top: 0.1rem;
  }
  #work_top_search {
    margin: 46px 0 0 0;
    /*border-bottom: 0.11rem solid #f3f7f8;*/
    .van-search {
      padding: 0.18rem;
      .van-search__content--round {
        border: 1px solid #f3f7f8;
      }
      .van-search__content {
        background-color: #fff;
      }
    }
  }
}
.loading {
  margin: 10px auto;
  padding: 10px;
}
</style>
