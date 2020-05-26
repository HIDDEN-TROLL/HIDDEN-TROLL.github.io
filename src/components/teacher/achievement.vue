<template>
  <div id="parents-habit">
    <div class="go-back">
      <van-nav-bar
        title="怎么获取成就值"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <div class="date">
      <span>2019年2月27日</span>
    </div>
    <div class="habit-content">
      <div class="item bread-et">
        <div id="echarts" :style="{width: '3.45rem', height: '1.2rem',margin:'0 auto'}"></div>
        <div class="habit-info">
          <ul class="num-list">
            <li class="tabs-li" v-for="(item , index) in habitSituation" :key="index">
              <span class="box">{{item.progress}}</span>

              <span class="num" :style="{'color':color[index]}">{{item.value}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="unfinish">
      <div class="unfinish-title"><span>未完成</span></div>
      <div class="unfinish-title_list">
        <div class="unfinish-title_list_margin" v-for="item in unfinishedlist">
          <van-row type="flex" justify="space-between" class="fatherlist">
            <van-col class="unfinishjob">{{item.title}}</van-col>
            <van-col class="gofinish">
              {{item.fathergo}}
            </van-col>
          </van-row>
          <van-row type="flex" justify="space-between" class="childlist" v-for="items in item.setitle">
            <van-col>{{items.setitle}}</van-col>
            <van-col class="go">{{items.childgo}}</van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div class="finish">
      <div class="finish-title"><span>已完成</span></div>

      <van-row type="flex" justify="space-between" class="finishedlist" v-for="item in finishedlist">
        <van-col class="finishjob">
          {{item.title}}
        </van-col>
        <van-col class="end">
          {{item.end}}
        </van-col>
      </van-row>


    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant';
import { Icon } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Panel } from 'vant';
import { Row, Col } from 'vant';

// import Homework from './api/teacher-api'

export default {
  name: "habit",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Panel.name]: Panel,
    [Row.name]: Row,
    [Col.name]: Col,
    // Homework:Homework
  },
  data() {
    return {
      color: ['#2FC25B', '#1890FF'],
      habitSituation: [
        {
          progress: '已完成:',
          value: 2,
          /*color:'#2FC25B'*/
        },
        {
          progress: '未完成:',
          value: 4,
          /*color:'#1890FF'*/
        },
        {}],
      unfinishedlist: [
        {
          title: '2.负责年级内有学生签到',
          fathergo: '',
          setitle: [{
            setitle: '考勤机学生打卡',
            childgo: '去完成 >',

          },
            {
              setitle: '考勤机学生打卡',
              childgo: '去完成 >',
            },
            {
              setitle: '考勤机学生打卡',
              childgo: '去完成 >',
            }],
        },
        { title: '4.为完成作业的学生发布通知', fathergo: '去完成 >' },
        { title: '5.发布社区内容', fathergo: '去完成 >' },
        { title: '6.为负责的学生录入成绩', fathergo: '去完成 >' },
      ],
      finishedlist: [
        { title: '1.通过“教师入口”登陆系统', end: '+1成就值' },
        { title: '3.为负责的学生评小红花', end: '+1成就值' },
      ],
      floweer: {},
      unfinished: {},
      finished: {},
    }
  },

  mounted() {
    let bread = document.getElementById('echarts');
    let myChart = this.echarts.init(bread);
    // 绘制图表
    myChart.setOption({
      color: ['#2FC25B', '#1890FF'],
      series: [{
        type: 'pie',
        radius: '70%',
        center: ['30%', '50%', '', ''],
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
            position: 'outside',
            formatter: '{d}{b}',
          },
          align: 'right',
          lineHeight: 17,
        },
        data: this.habitSituation,
      }],
    })
  },
}
</script>

<style scoped lang="less">
.date {
  color: #84C225;
  background-color: white;
  font-size: 0.15rem;
  line-height: 0.5rem;
  text-align: center;
}

#parents-habit {
  background-color: #F3F7F8;
  margin-bottom: 0.58rem;

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
    background-color: white;
    margin: 0.1rem 0 0 0;
  }

  .unfinish {
    margin: 0.1rem 0 0 0;
  }

  .unfinish-title {
    font-weight: 700;
    font-size: 0.15rem;
    line-height: 0.5rem;
    text-align: center;
    background-color: white;
    color: red;
  }

  .unfinish-title_list {
    font-size: 0.14rem;
    background-color: white;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 0.2rem;

    .unfinish-title_list_margin {
      margin: 0 0.15rem;
      border-bottom: solid 1px #EEEEEE;

      .childlist {
        color: #999999;
        line-height: 0.3rem;
        font-size: 0.12rem;
        margin: 0 0.1rem;

        .go {
          color: red;
        }
      }

      .van-panel {
        .van-panel__content {
          .van-cell--clickable {
            font-size: 0.12rem;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 0.17rem;
          }
        }
      }
    }
  }

  .finish {
    background-color: white;
    margin: 0.1rem 0 0 0;

    .finish-title {
      font-weight: 700;
      font-size: 0.15rem;
      line-height: 0.5rem;
      text-align: center;
      background-color: white;
      color: #84C225;
    }

    .van-cell {
      .van-cell__title {
        width: 1.59rem;
        height: 0.2rem;
        font-size: 0.14rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 0.2rem;
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
        .theme {
          text-align: center;
          font-size: 0.14rem;
          line-height: 0.2rem;
          font-weight: 400;
          margin-bottom: 0.28rem;
          position: absolute;
          top: 50%;
          left: 1.235rem;
        }

        .num-list {
          overflow: hidden;
          margin-left: -0.15rem;
          position: absolute;
          top: 30%;
          left: 60%;

          .tabs-li {
            margin-left: 0.45rem;
            line-height: 0.2rem;

            .box {
              margin-right: 0.05rem;
              width: 0.64rem;
              height: 0.22rem;
              font-size: 0.14rem;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              line-height: 0.2rem;
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
    }
  }
}


.gofinish {
  color: #D80000;
}

.end {
  color: #84C225;
}

.fatherlist {
  line-height: 0.5rem;
}

.finishedlist {
  border-bottom: solid 1px #EEEEEE;
  line-height: 0.5rem;
  font-size: 0.14rem;
  background-color: white;
  margin: 0 0.15rem;
}

</style>
