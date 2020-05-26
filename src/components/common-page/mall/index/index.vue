<template>
  <div class="mall">

    <nav-bar
      class="header"
      title="新师路商城"/>

    <div  class="content">
      <div class="TopTitleImg">
        <div  style="height: 0;">
          <span class="TopRecommend"></span>
          <span class="TopRecommendText">推荐</span>
        </div>
        <van-swipe :autoplay="3000" indicator-color="white" :height="100" @change="onChange" >

          <van-swipe-item v-for="(item,index) in carousel" :key="index" >
            <img :src="item.image"  @click="TopJump(item.id)">
          </van-swipe-item>

          <div class="custom-indicator" slot="indicator">
            <div style="    padding: 0.1rem;border-bottom: solid 1px;">
              <span style="font-weight: 700;">{{current}}</span>
              <span style="float: right;color: red">{{payTypeName}}</span>
            </div>
          </div>

        </van-swipe>
      </div>

      <div style="text-align: center;height: 0.5rem;    margin: 0.6rem 0 0.25rem 0;">
        <van-row >
          <van-col span="6" v-for="(item,index) in TabList" :key="index">
            <div :class=" index === tabTitle ? 'TypeTab_active' : 'TypeTab' " @click="changeType(item.id,index)">{{item.name}}</div>
          </van-col>
        </van-row>
      </div>

      <div style="border-top: solid 1px;padding-top: 0.1rem;">
        <div v-for="(item,index) in MallList" Lkey="index" @click="jump(item.id)">
          <div class="ComBox">
            <div class="TitleImg">
              <div v-if="item.isRecommend === true" style="height: 0;">
                <span class="Recommend"></span>
                <span class="RecommendText">推荐</span>
              </div>

              <img :src="item.image">
            </div>
            <div class="MallBox">
              <a class="MallName">{{item.name}}</a>
              <a style="float: right;color: red">{{item.payType}}</a>
              <div class="MallDes">{{item.describe}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <van-tabbar v-model="active" style="border-top: 1px solid rgb(222, 222, 222)">
        <van-tabbar-item icon="home-o">商城</van-tabbar-item>
        <van-tabbar-item icon="search" >记录</van-tabbar-item>
      </van-tabbar>

    <div style="height: 1rem;"></div>
  </div>
</template>

<script>
import { getGoodsList, getMallIndex,getList,carouselList } from '@/api/common/mall'
import { Col, List, NavBar, NoticeBar, Row, Swipe, SwipeItem, Tag,Tabbar, TabbarItem,Tab, Tabs  } from 'vant'
import { handleRouteTarget, isNumeric } from '@/utils'

export default {
  name: 'MallIndex',
  components: {
    NavBar,
    vanRow: Row,
    vanCol: Col,
    vanList: List,
    vanSwipe: Swipe,
    vanSwipeItem: SwipeItem,
    vanNoticeBar: NoticeBar,
    vanTag: Tag,
    vanTabbar: Tabbar,
    vanTabbarItem: TabbarItem,
    vanTab: Tab,
    vanTabs: Tabs,
  },
  data() {
    return {
      swipeHeight: document.body.clientHeight / 10 * 3,
      data: null,
      list: {
        items: null,
        categoryId: 0,
        page: 1,
        loading: false,
        finished: false,
      },
      active: 0,
      tabTitle: 0,

      TabList:[
        {name:'软件',type:1},
        {name:'硬件',type:2},
        {name:'教育',type:3},
        {name:'其他',type:4}
      ],
      commodityList:[
        {name:'托管教育系统(人脸识别)'},
        {name:'托管教育系统(人脸识别+体温枪)'},
      ],
      listId:1,
      MallList:[],
      // 推荐轮播图
      carousel:[],
      current:'',
      payTypeName:'',

    }
  },
  created() {
    this.$loading()


    getList(1)
            .then(response => {
              if (response.data.meta.success) {
                this.MallList = response.data.data
              }
            })
     .finally(() => {
              this.$loadingHide()
     })
  // 轮播图
    carouselList()
            .then(response => {
              if (response.data.meta.success) {
                this.carousel = response.data.data
                this.current = this.carousel[0].name;
                this.payTypeName = this.carousel[0].payType;
              }
            })
            .finally(() => {
              this.$loadingHide()
            })


  },
  watch:{
    tabTitle(s){
      console.log(s)
      this.listId = s+1
      this.Comlist()
      // this.carouselListFun()
    },
    active(s){
      this.$router.push({name:'OrderRecord'})
    }
  },
  computed: {},
  methods: {
    // 推荐轮播图标题滚动
    onChange(index) {
      console.log(index)
      this.current = this.carousel[index].name;
      this.payTypeName = this.carousel[index].payType;
    },
    TopJump(id) {
      console.log(id)
      this.$router.push({
        name: 'GoodsDetail',
        query: {
          id
      },
      })
    },
    jump(id){
      this.$router.push({
        name: 'GoodsDetail',
        query: {
          id
        },
      })
    },
    Comlist(){
      this.$loading()
      getList(this.listId)
              .then(response => {
                if (response.data.meta.success) {
                  this.MallList = response.data.data
                }
              })
              .finally(() => {
                this.$loadingHide()
              })
    },
    // 轮播图
    carouselListFun(){
      this.$loading()
      carouselList(this.listId)
              .then(response => {
                if (response.data.meta.success) {
                  this.carousel = response.data.data
                }
              })
              .finally(() => {
                this.$loadingHide()
              })
    },
    changeType(id,index){
      this.tabTitle = index
    },
    onSelectCategory(id) {
      this.list.categoryId = this.list.categoryId === id ? 0 : id
      this.list.page = 0
      this.list.finished = false
      this.list.items = []
      this.$loading()
      this.onListLoadMore()
    },
    onListLoadMore() {
      const page = this.list.page + 1
      const categoryId = this.list.categoryId

      this.list.loading = true
      getGoodsList({
        categoryId,
        page,
      })
        .then(response => {
          if (response.data.meta.success) {
            if (response.data.data.length === 0) {
              this.list.finished = true
              return
            }
            let items = Array.isArray(this.list.items) ? this.list.items : []
            items = items.concat(response.data.data)
            this.list.items = items
          }
        })
        .finally(() => {
          this.list.loading = false
          this.list.page = page
          this.$loadingHide()
        })
    },
    handleTarget(goods) {
      if (!goods) {
        return
      }
      const { id, target } = goods
      if (isNumeric(id) && id > 0) {
        this.$router.push({
          name: 'GoodsDetail',
          query: {
            id
          },
        })
      } else if (target) {
        handleRouteTarget(this.$router, target)
      }
    },
  },
}
</script>




<style scoped lang="less">
.mall {
  font-size: .14rem;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header {
    flex-shrink: 0;
  }

  & > .content {
    flex-grow: 1;
    overflow: scroll;

    .banner {
      .banner-item {
        text-align: center;
        .banner-item-image {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
      }
    }

    .categories {
      overflow-x: scroll;
      width: 100%;
      margin: 10px 0;

      .category-col {
        flex-shrink: 0;
      }

      .category {
        width: 20vw;
        height: 20vw;
        border-radius: 50%;
        padding: 10px;
        border: 1px solid #000;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin: 0 auto;

        &.selected {
          border-color: #7dc5eb;
        }
      }
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-left: 8px;

      .goods {
        width: 50%;
        flex-basis: 50%;
        padding: 8px 8px 8px 0;
        box-sizing: border-box;
        position: relative;
        font-size: 0;

        .recommend, .purchased {
          position: absolute;
          top: 20px;
        }

        .thumb {
          width: 100%;
          object-fit: cover;
          height: 1.5rem;
        }

        .content {
          font-size: .14rem;
          padding: 8px;
          border: 1px solid #999;
          border-top: 0;
          border-bottom-left-radius: .1rem;
          border-bottom-right-radius: .1rem;

          .p1 {
            display: flex;
            justify-content: space-between;

            .title {
              font-weight: bold;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .price {
              color: #f66;
              flex-shrink: 0;
              font-size: .12rem;
            }
          }

          .p2 {
            font-size: .12rem;
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

}
  .TypeTab{
    border: solid 1px;
    width: 0.5rem;
    height: 0.5rem;
    margin: 0 auto;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 100%;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.9)
  }.TypeTab_active{
    border: solid 1px #3770FB;
    width: 0.5rem;
    height: 0.5rem;
    margin: 0 auto;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 100%;
    background-color: #3770FB;
    color: white;
  }
  .ComBox{
    border:solid 1px;
    border-radius: 8px;
    width: 85%;
    margin: 0.15rem auto;
  }
  .TitleImg{
    height: 0.6rem;
    margin-bottom: 0.1rem;
  }  .TitleImg img{
    height: 100%;
    width: 100%;
  }
     .MallBox{
       margin: 0.1rem;
     }
  .MallName{
    font-weight: 700;
    font-size: 0.15rem;
  }
  .MallDes{
    font-size: 0.13rem;
    color: #666666;
  }
  .Recommend{
    position: relative;
    top: 0.55rem;
    right: 0;
    width: 0;
    height: 0;
    border-color: #3770fb transparent;
    border-width: 0.58rem 0 0 0.58rem;
    border-style: solid;
    left: 2.63rem;
  }
  .RecommendText{
    position: relative;
    /* top: 0.55rem; */
    /* right: 0.2rem; */
    display: inline-block;
    color: white;
    font-size: 0.12rem;
    width: 0.26rem;
    left: 2.33rem;

  }.TopRecommend{
       z-index: 99999;
       position: absolute;
       /* top: 0.55rem; */
       right: 0;
       /* left: 0; */
       width: 0;
       height: 0;
       border-color: #3770fb transparent;
       border-width: 0.58rem 0 0 0.58rem;
       border-style: solid;
  }
  .TopRecommendText{
    z-index: 99999;

    position: absolute;
     top: 0.55rem;
    /* right: 0.2rem; */
    display: inline-block;
    color: white;
    font-size: 0.12rem;
    width: 0.26rem;
    right: 0;
  }

  .TopTitleImg{
    width: 100%;
    height: 1rem
  }.TopTitleImg img{
       height: 100%;
       width: 100%;
  }
</style>
