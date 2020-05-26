<template>
  <div id="parents-habit">
    <div class="go-back">
      <van-nav-bar title="习惯"/>
    </div>
    <div class="habit-content">
      <div class="item bread-et">
        <div class="title">
          <span class="border-w"></span>
          <span class="text">习惯养成情况</span>
        </div>
        <div v-if="habitSituation.length>0" id="echarts"
             :style="{width: '3.45rem', height: '2.7rem',margin:'0 auto',borderBottom:'0.01rem dotted #d4d4d4'}"></div>
        <div class="habit-info" v-if="habitSituation.length>0">
          <p class="theme">各类型获得数量</p>
          <ul class="num-list">
            <li class="tabs-li" v-for="(item , index) in habitSituation" :key="index">
              <span class="box" :style="{'backgroundColor':color[index]}"></span>
              <span class="name">{{item.name}}</span>
              <span class="num">{{item.value}}</span>
            </li>
          </ul>
        </div>
        <div class="flower-total" v-if="JSON.stringify(floweer)!='{}'">
          <div class="t-left">
            <p class="text">总红花数<span>{{floweer.extra.total}}</span>朵</p>
            <button type="button" class="view-list">查看排行榜</button>
          </div>
          <div class="t-right">
            <p class="text">排行榜第<span>{{floweer.extra.rankNo}}</span>名</p>
            <p class="diff-num" v-if="floweer.extra.info1">{{floweer.extra.info1}}</p>
            <p class="diff-num" v-if="floweer.extra.info2">{{floweer.extra.info2}}</p>
          </div>
        </div>
      </div>
      <div class="item red-flower-mall" v-if="JSON.stringify(goodsList)!='{}'">
        <div class="title">
          <span class="border-w"></span>
          <span class="text">红花商城兑奖</span>
        </div>
        <div class="flower-info">
          <p class="cash">
            <span class="num">可兑奖红花数 <span>{{goodsList.extra.safflower_cash_num}}</span> 朵</span>
            <span class="grand-num">累计兑奖{{goodsList.extra.convert_count}}次</span>
          </p>
          <p class="recently-cash" v-if="goodsList.extra.last_convert">{{goodsList.extra.last_convert}}</p>
          <div class="mall-list" v-if="goodsList.extra.prize_recommend && goodsList.extra.prize_recommend.length>0">
            <p class="mall-title"><span></span>前三个高红花值奖品</p>
            <ul class="goods-list">
              <li class="tabs" v-for="(item,index) in goodsList.extra.prize_recommend" :key="index">
                <div class="show-figure">
                  <img :src="item.image" alt="">
                </div>
                <p class="goods-name">{{item.name}}</p>
                <p class="flower-total" :class="diff(item.price) < 0 ? 'highlight': ''">{{item.price}}朵</p>
                <p class="diff-number" v-if="diff(item.price)<0">差{{Math.abs(diff(item.price))}}朵</p>
                <button type="button" v-if="diff(item.price)>0" class="exchange-btn">兑换奖品</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="item wrong-topic">
        <div class="title">
          <span class="border-w"></span>
          <span class="text">错题收录情况</span>
        </div>
        <!--<p class="grade">一年级 <van-icon name="arrow-down" size="0.14rem" color="#3770FB"/></p>-->
        <Homework :homework-list="homeworkList"></Homework>
        <!--<p class="wrong-num">错题组卷次数：8次</p>-->
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant';
import { Icon } from 'vant';
import Homework from './components/wrong-topic'
import { getHabit } from '@/api/parent/home'

export default {
  name: "habit",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    Homework: Homework,
  },
  data() {
    return {
      color: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2'],
      //习惯
      habitSituation: [],
      //红花情况
      floweer: {},
      //错题
      homeworkList: {},
      //商城
      goodsList: {},
    }
  },
  methods: {
    habitsCharts() {
      //如果 后台没有返回数据 不绘制图表
        let bread = document.getElementById('echarts');
        let myChart = this.echarts.init(bread);
        // 绘制图表
        myChart.setOption({
          /*title : {
              text: '各类型获得数量',
              x:'center',
              y: '60%',
          },*/
          color: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2'],
          /*legend: {
              // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
              orient: 'horizontal',
              // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
              x: 'center',
              // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
              y: 'bottom',
              itemWidth: 8,   // 设置图例图形的宽
              itemHeight: 8,  // 设置图例图形的高
              textStyle: {
                  color: '#666',  // 图例文字颜色
                  fontSize:14,
                  lineHeight:20
              },
              // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
              itemGap:45,
              backgroundColor: '#fff',  // 设置整个图例区域背景颜色
              data: ['学习','生活','文明','健康','纪律','其他']
          },*/
          series: [{
            name: '各类型获得数量',
            type: 'pie',
            radius: '40%',
            center: ['50%', '30%'],
            // 设置值域的那指向线
            labelLine: {
              normal: {
                length: 0,  // 改变标示线的长度
                show: false,   // show设置线是否显示，默认为true，可选值：true ¦ false
              },
            },
            // 设置值域的标签
            label: {
              normal: {
                position: 'outside',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: '{b}{d}%',
              },
              align: 'right',
              lineHeight: 17,
            },
            data: this.habitSituation,
          }],
        })
    },
  },
  mounted(){
    if (this.habitSituation.length > 0){
      this.habitsCharts();
    }else {
      let timer = setInterval(()=>{
        if (this.habitSituation.length > 0){
          clearInterval(timer);
          this.habitsCharts();
        }
      },500)
    }
  },
  created() {
    //this.habitsCharts();
    //获取习惯页面数据
    // type  habit  safflower  safflower_mall  puzzle_collection
    //let tArr = ["habit","safflower","safflower_mall","puzzle_collection"];

    let habit = [];
    getHabit()
      .then(res => {

        //console.log(res);
        if (res.data.meta && res.data.meta.code === 0) {
          this.habitSituation = [];//保存习惯
          let response = res.data.data;
          for (let item of response) {
            if (item.type === 'habit') {//习惯
              habit = item
            } else if (item.type === 'safflower') {//红花情况
              this.floweer = item
            } else if (item.type === 'safflower_mall') {//红花商城
              this.goodsList = item
            } else if (item.type === 'puzzle_collection') {//错题
              this.homeworkList = item
            }
          }
          for (let item of habit.extra) {
            this.habitSituation.push({
              name: item.name,
              value: item.nums,
            })
          }
         // this.habitsCharts();
        }
      }).catch(() => {
      throw new Error("异常")
    })
  },
  computed: {
    //计算 红花 兑换是否满足兑换
    diff() {
      return (price) => {
        if (this.goodsList.extra && this.goodsList.extra.prize_recommend && this.goodsList.extra.prize_recommend.length > 0) {
          if (this.goodsList.extra.safflower_cash_num || this.goodsList.extra.safflower_cash_num===0) {
            return (this.goodsList.extra.safflower_cash_num - price).toFixed(0)
          }
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
#parents-habit {
  padding-bottom: 50px;

  .go-back {
    .van-nav-bar {
      background-color: #3770FB;

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

  .habit-content {
    font-size: 0;
    background-color: #F3F7F8;

    .item {
      padding: 0.18rem 0.15rem;
      background-color: #fff;
      box-sizing: border-box;
      margin-bottom: 0.1rem;

      .title {
        .border-w {
          display: inline-block;
          margin-right: 0.07rem;
          height: 0.16rem;
          position: relative;
          top: 0.03rem;
          border-left: 0.02rem solid #3770FB;
        }

        .text {
          font-size: 0.16rem;
          color: #333;
          line-height: 0.22rem;
          font-weight: 500;
        }
      }
    }

    .bread-et {
      position: relative;

      .habit-info {
        position: absolute;
        top: 50%;
        transform: translateY(40%);
        width: 3.45rem;

        .theme {
          text-align: center;
          font-size: 0.14rem;
          line-height: 0.2rem;
          font-weight: 400;
          margin-bottom: 0.28rem;
          /*position: absolute;
          top: 50%;
          left: 1.235rem;*/
        }

        .num-list {
          overflow: hidden;
          margin-left: -0.15rem;
          /*position: absolute;
          top: 60%;*/

          .tabs-li {
            float: left;
            margin-left: 0.45rem;
            line-height: 0.2rem;

            .box {
              display: inline-block;
              width: 0.08rem;
              height: 0.08rem;
              margin-right: 0.06rem;
            }

            .name {
              font-size: 0.14rem;
              line-height: 0.2rem;
              margin-right: 0.06rem;
              color: #666;
            }

            .num {
              font-size: 0.14rem;
              line-height: 0.2rem;
              color: #666;
            }

          }
        }
      }

      .flower-total {
        margin-top: 0.19rem;
        overflow: hidden;

        .t-left {
          float: left;
          width: 50%;
          box-sizing: border-box;

          .text {
            font-size: 0.14rem;
            line-height: 0.2rem;
            color: #666;
            margin-bottom: 0.17rem;
            padding-left: 0.3rem;

            span {
              font-size: 0.17rem;
              color: #D80000;
              line-height: 0.2rem;
              margin: 0 0.07rem;
              font-weight: 500;
            }
          }

          .view-list {
            font-size: 0.12rem;
            color: #84C225;
            width: 1rem;
            height: 0.24rem;
            border: 0.01rem solid #84C225;
            margin-left: 0.35rem;
            margin-top: 0.05rem;
            background-color: #fff;
            border-radius: 0.05rem;
            outline: none;
            box-sizing: border-box;
          }
        }

        .t-right {
          float: left;
          padding-left: 0.36rem;
          width: 50%;
          border-left: 0.01rem solid #f1f1f1;
          box-sizing: border-box;

          .text {
            font-size: 0.14rem;
            line-height: 0.2rem;
            color: #666;
            margin-bottom: 0.17rem;

            span {
              font-size: 0.17rem;
              color: #D80000;
              line-height: 0.2rem;
              margin: 0 0.07rem;
              font-weight: 500;
            }
          }

          .diff-num {
            font-size: 0.12rem;
            color: #999;
            line-height: 0.17rem;
          }
        }
      }
    }

    .flower-info {
      margin-top: 0.18rem;

      .cash {
        overflow: hidden;
        margin-bottom: 0.1rem;
        padding-left: 0.1rem;
        box-sizing: border-box;

        .num {
          float: left;
          font-size: 0.14rem;
          color: #666;
          line-height: 0.22rem;

          span {
            font-size: 0.17rem;
            line-height: 0.24rem;
            color: #D80000;
            margin: 0 0.1rem;
          }
        }

        .grand-num {
          float: right;
          font-size: 0.14rem;
          color: #999;
          line-height: 0.2rem;
        }
      }

      .recently-cash {
        padding-left: 0.1rem;
        box-sizing: border-box;
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #666;
        margin-bottom: 0.25rem;
      }

      .mall-list {
        .mall-title {
          font-size: 0.14rem;
          color: #666;
          line-height: 0.2rem;
          margin-bottom: 0.1rem;

          span {
            display: inline-block;
            position: relative;
            top: -0.01rem;
            width: 0.06rem;
            height: 0.06rem;
            background-color: #84C225;
            border-radius: 50%;
            margin-right: 0.1rem;
          }
        }

        .goods-list {
          overflow: hidden;

          .tabs {
            float: left;
            text-align: center;
            margin-left: 0.07rem;
            margin-bottom: 0.08rem;

            .show-figure {
              width: 1.1rem;
              height: 0.83rem;
              margin-bottom: 0.1rem;

              img {
                width: 100%;
                height: 100%;
              }
            }

            > p {
              text-align: center;
              font-size: 0.12rem;
              line-height: 0.2rem;
            }

            .goods-name {
              color: #999;
              margin-bottom: 0.08rem;
            }

            .flower-total {
              color: #666;
              margin-bottom: 0.06rem;
            }

            .flower-total.highlight {
              color: #D80000;
              margin-bottom: 0.1rem;
            }

            .diff-number {
              color: #666;
            }

            .exchange-btn {
              width: 0.8rem;
              height: 0.24rem;
              font-size: 0.12rem;
              color: #84C225;
              border-radius: 0.05rem;
              border: 0.01rem solid #84C225;
              outline: none;
              background-color: #fff;
            }
          }

          .tabs:first-child {
            margin-left: 0;
          }
        }
      }
    }

    .wrong-topic {

    }
  }
}
</style>
