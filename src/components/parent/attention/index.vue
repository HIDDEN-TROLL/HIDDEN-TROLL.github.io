<template>
  <div id="focus-degree">
    <!--关注程度-->
    <div class="go-back">
      <van-nav-bar title="关注程度" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="content">
      <div class="now-time items">
        <p>
          {{initYear}}
          <span @click="show=true">
            <van-icon name="arrow-down" size="0.14rem" color="#3770FB"/>
          </span>
        </p>
      </div>
      <div class="focus-detail items" v-if="focus.statistics">
        <div class="focus-val">
          <p class="title">本月关注</p>
          <p class="val">
            <van-icon class-prefix="icon" name="mind"/>
            {{focus.statistics.totalThisMonth}}
          </p>
          <span>
            对比上月增加
            <br>
            {{focus.statistics.diffWithLastMonth}}关注值
          </span>
        </div>
        <div class="focus-people" v-if="focus.statistics.detail.length>0">
          <FamilyList
            :family-list="focus.statistics.detail"
            li-width="0.6rem"
            back-gauge="0.16rem"
            :avatar-w="{width:'0.33rem',height:'0.33rem'}"
          ></FamilyList>
        </div>
      </div>
      <div class="ranking-list items">
        <van-tabs type="card" title-active-color="#fff" color="#3770FB">
          <van-tab title="年级排行">
            <Ranking :ranking-list="focus.gradeRank"></Ranking>
          </van-tab>
          <van-tab title="园内排名">
            <Ranking :ranking-list="focus.schoolRank"></Ranking>
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <div class="instructions">说明：排行榜仅显示前十名的学生</div>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="onconfirm"
        @cancel="oncancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs, Icon, Popup, DatetimePicker } from "vant";
import FamilyList from "../components/family";
import Ranking from "./components/ranking-list";
import { getAttention } from '@/api/parent/home'


export default {
  name: "focus-degree",

  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    FamilyList: FamilyList,
    Ranking: Ranking
  },
  data() {
    return {
      show: false,
      maxDate: new Date(),
      currentDate: new Date(),
      initYear: "",
      family: [
        {
          src: require("@/assets/logo.png"),
          named: "爷爷",
          hearts: 111,
          present: false
        },
        {
          src: require("@/assets/logo.png"),
          named: "妈妈",
          hearts: 121,
          present: true
        },
        {
          src: require("@/assets/logo.png"),
          named: "爸爸",
          hearts: 110,
          present: false
        }
      ],
      focusDetail: [
        {
          src: require("@/assets/logo.png"),
          name: "是肯定",
          value: 254,
          contrastType: 1
        },
        {
          src: require("@/assets/img/parents/index/banner2.png"),
          name: "是肯定",
          value: 489,
          contrastType: 1
        },
        {
          src: require("@/assets/img/parents/index/banner2.png"),
          name: "是肯定",
          value: 566,
          contrastType: 1
        },
        {
          src: require("@/assets/img/parents/index/banner2.png"),
          name: "是肯定",
          value: 211,
          contrastType: 2
        },
        {
          src: require("@/assets/img/parents/index/banner2.png"),
          name: "是肯定",
          value: 489,
          contrastType: 1
        },
        {
          src: require("@/assets/img/parents/index/banner2.png"),
          name: "是肯定",
          value: 489,
          contrastType: 1
        },
        {
          src: require("@/assets/img/parents/index/banner2.png"),
          name: "是肯定",
          value: 489,
          contrastType: 1
        },
        {
          src: require("@/assets/img/parents/index/banner2.png"),
          name: "是肯定",
          value: 489,
          contrastType: 1
        },
        {
          src: require("@/assets/img/parents/index/banner2.png"),
          name: "是肯定",
          value: 489,
          contrastType: 1
        },
        {
          src: require("@/assets/img/parents/index/banner2.png"),
          name: "是肯定",
          value: 489,
          contrastType: 1
        }
      ],
      focus: {}
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
    //选择日期 确定之后的回调
    onconfirm(date) {
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      this.initYear = `${year}年${month > 10 ? month : "0" + month}月`;
      this.show = false;
      this.getFocus(year, month);
    },
    //关闭popup
    oncancel() {
      this.show = false;
    },
    //获取 关注值
    getFocus(year, month) {
      getAttention(year, month)
        .then(res => {
          console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {
            this.focus = res.data.data;
          }
        })
        .catch(() => {
          throw new Error("异常!");
        });
    },
    /*onchange(obj){
                console.log(obj.getValues())
            },*/
    getNowFormatDate() {
      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  created() {
    //获取初始进入页面时的关注度
    // 参数为 当年当月
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    this.initYear = `${year}年${month > 10 ? month : "0" + month}月`;
    getAttention(year, month)
      .then(res => {
        // console.log(res);
        if (res.data.meta && res.data.meta.code === 0) {
          this.focus = res.data.data;
        }
      })
      .catch(() => {
        throw new Error("异常！");
      });
  }
};
</script>

<style scoped lang="less">
@font14: 0.14rem;
@lineH: 0.2rem;
@color999: #999;
@color666: #666;
@colorfff: #fff;
@bgfff: #fff;
@bg: #f3f7f8;
#focus-degree {
  padding-bottom: 0.5rem;
  font-size: 0;
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
  .content {
    background-color: @bg;
    .items {
      background-color: @bgfff;
      margin-bottom: 0.1rem;
    }
    .now-time {
      height: 0.48rem;
      line-height: 0.48rem;
      p {
        text-align: center;
        font-size: @font14;
        color: #84c225;
      }
    }
    .focus-detail {
      overflow: hidden;
      height: 1.36rem;
      padding: 0.2rem 0.15rem;
      box-sizing: border-box;
      .focus-val {
        float: left;
        width: 1.15rem;
        padding-right: 0.21rem;
        text-align: center;
        border-right: 0.01rem solid #f1f1f1;
        box-sizing: border-box;
        .title {
          text-align: center;
          font-size: @font14;
          color: @color666;
          line-height: @lineH;
          margin-bottom: 0.08rem;
        }
        .val {
          font-size: 0.16rem;
          color: @color666;
          line-height: 0.22rem;
          margin-bottom: 0.1rem;
        }
        span {
          font-size: 0.12rem;
          color: @color999;
          line-height: 0.17rem;
        }
      }
      .focus-people {
        float: left;
        width: 2.3rem;
      }
    }
    .ranking-list {
      padding: 0.18rem 0 0;
      box-sizing: border-box;
    }
  }
  .instructions {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 0.14rem;
    height: 0.6rem;
    line-height: 0.6rem;
    color: #999;
    padding-left: 0.34rem;
    background-color: #fff;
  }
}
</style>
