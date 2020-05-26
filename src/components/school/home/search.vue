<template>
  <div id="Search">
    <div class="go-back">
      <van-nav-bar title="查询" fixed/>
    </div>

    <div class="top_search">
      <van-search shape="round" placeholder="请输入内容" v-model="search"/>
    </div>

    <van-loading v-show="$store.getters['schoolHome/isLoadingData']" class="loading" />

    <div class="search_fun">
      <van-row v-for="(item,index) in list" :key="index" type="flex">
        <van-col span="6">
          <div class="search_title_l">{{item.name}}</div>
        </van-col>
        <van-col span="18" type="flex">
          <div class="search_title_r" v-for="(item1,index) in item.items" :key="index">
            <a @click="go(item1.target)">
              <van-col span="4">
                <icon :name="item1.icon" style="font-size: .2rem;" />
              </van-col>
              <van-col span="16">{{item1.name}}</van-col>
              <van-col span="4">
                <van-icon name="arrow"/>
              </van-col>
            </a>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { NavBar, Search, Row, Col, Icon, Loading } from 'vant';
import { handleRouteTarget, isEmpty } from '@/utils'
import icon from '@/components/common/icon'

export default {
  name: 'SchoolHomeSearch',
  components: {
    vanNavBar: NavBar,
    vanSearch: Search,
    vanLoading: Loading,
    vanCol: Col,
    vanRow: Row,
    vanIcon: Icon,
    icon,
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    list() {
      const list = this.$store.getters['schoolHome/getSchoolHomeSearchData']
      if (isEmpty(this.search)) {
        return list
      }
      let name_Data = [];
      for (let i = 0; i < this.tt.length; i++) {
        let item = {
          name: this.tt[i].name,
          items: [],
        }
        for (let j = 0; j < this.tt[i].items.length; j++) {
          if (this.tt[i].items[j].name.search(this.search) !== -1) {
            item.items.push(this.tt[i].items[j])
          }
        }
        if (item.items.length > 0) {
          name_Data.push(item)
        }
      }
      return name_Data;
    },
  },
  methods: {
    go(target) {
      handleRouteTarget(this.$router, target)
    },
  },
  created() {
    this.$store.dispatch('schoolHome/fetchSearchPageData')
  },
};
</script>

<style scoped lang="less">
#Search {
  background-color: #f3f7f8;
  min-height: 100vh;
  /*margin-bottom: 0.7rem;*/

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
}

.top_search {
  margin-top: 46px;
  .van-search {
    padding: 0.18rem;

    .van-search__content van-search__content--round {
      border: solid;
    }
  }
}

.search_fun {
  font-size: 0.14rem;
  text-align: center;
  color: #666;
  padding-bottom: 0.57rem;

  .van-row {
    border-top: 10px solid #f3f7f8;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    .van-col {
      justify-content: center;
      align-items: center;
      border-left: 1px solid #f3f7f8;

      .van-col {
        border-bottom: 1px solid #f3f7f8;
        border-left: 0;

      }
    }
  }
}

.search_title_r {
  .van-col {
    color: #666;
    height: 0.48rem;
    line-height: 0.36rem;
    text-align: left;
    padding: 0.05rem 0.14rem;

    img {
      width: 0.2rem;
      height: 0.2rem;
      padding-top: 0.08rem;

      .search_title_r {
        .van-icon {
          font-size: 0.2rem;
        }
      }
    }
  }
}

// .search_title {
//   margin: 0.5rem 0.25rem 0.4rem 0.25rem;
//   float: left;
//   width: 0.28rem;
//   height: 0.2rem;
//   font-size: 0.14rem;
//   font-family: PingFangSC-Regular;
//   font-weight: 400;
//   color: rgba(102, 102, 102, 1);
//   line-height: 0.2rem;
// }
// .search_title_r {
//   // margin: 0.1rem 0 0.1rem 0;
//   // width: 77%;
//   // float: left;
//   // border-left: solid 0.01rem #eeeeee;
// }
.van-cell {
  padding: 0.08rem 0rem 0.08rem 0.2rem;
}
.loading {
  margin: 10px auto;
}
</style>
