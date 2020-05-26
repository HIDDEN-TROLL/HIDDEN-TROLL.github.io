<template>
  <div class="echarts">
    <head-top :title="'详情'" :rightText="''" :leftText="isFromTemplate ? '' : '成绩档案'" :leftArrow="!isFromTemplate"></head-top>
    <div class="score-name">
      <p class="score-item">
        <span>{{className}}</span>
        <span>{{stuName}}</span>
        <span v-if="!isEmpty(subjectName)">{{subjectName}}</span>
      </p>
    </div>
    <div class="spaceing"></div>
    <div class="echarts-wrapper">
      <div class="time">
        <span class="name-before"></span>
        <span class="time-name">上学期</span>
      </div>
      <div style="width:100%;overflow: scroll;">
        <div id="mycharts" ></div>
        <!--  :style="chartsWidth1" -->
      </div>
      <div style="padding-bottom: 0.19rem;">
        <span style="padding-right: 0.19rem;">最高分：{{highest1}}</span>
        <span>平均分：{{average1}}</span>
      </div>
    </div>
    <div class style="height: 0.16rem;background-color: #F3F7F8;"></div>
    <div class="echarts-wrapper">
      <div class="time">
        <span class="name-before"></span>
        <span class="time-name">下学期</span>
      </div>
      <div style="width:100%;overflow: scroll;">
        <div id="mycharts2"></div>
        <!--  :style="chartsWidth2" -->
      </div>
      <div style="padding-bottom: 0.19rem;">
        <span style="padding-right: 0.19rem;">最高分：{{highest2}}</span>
        <span>平均分：{{average2}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from "../../common/nav-bar";
import { getScoreDetails } from "@/api/school/score-manage";
import { getParamFromUrlAndRoute, isEmpty } from '@/utils'

export default {
  components: {
    headTop
  },
  data() {
    return {
      className: this.$route.query.className,
      stuName: this.$route.query.stuName,
      subjectName: this.$route.query.subjectName,
      echartScore1: [0], //上学期成绩
      echartScore2: [0], //下学期成绩
      echartDate1: [" "], //上学期日期
      echartDate2: [" "], //下学期日期
      echartUnit1: [" "], //上学期单元
      echartUnit2: [" "], //下学期单元
      average1: "--", //上学期评均成绩
      highest1: "--", //上学期最高分
      average2: "--", //下学期评均成绩
      highest2: "--", //下学期最高分
      chartsWidth1: "3.4rem",
      chartsWidth2: "3.4rem",
      lineCole1: [{ gt: 0, lte: 1, color: "#999999" }], //线条颜色
      lineCole2: [{ gt: 0, lte: 1, color: "#999999" }], //线条颜色

      isFromTemplate: false,
      templateId: 0,
    };
  },
  created() {
    // this.createdPage();
  },
  mounted() {
    const templateId = getParamFromUrlAndRoute('template_id', this.$router)
    if (templateId) {
      this.isFromTemplate = true
      this.templateId = templateId
    }

    if (getParamFromUrlAndRoute('className', this.$router)) {
      this.className = getParamFromUrlAndRoute('className', this.$router)
    }
    if (getParamFromUrlAndRoute('stuName', this.$router)) {
      this.stuName = getParamFromUrlAndRoute('stuName', this.$router)
    }
    if (getParamFromUrlAndRoute('subjectName', this.$router)) {
      this.subjectName = getParamFromUrlAndRoute('subjectName', this.$router)
    } else if (!isEmpty(this.$route.query.subjectId)) {
      const subjectNameList = [undefined, '语文', '数学', '英语']
      if (subjectNameList[this.$route.query.subjectId]) {
        this.subjectName = subjectNameList[this.$route.query.subjectId]
      }
    }

    this.createdPage();

  },
  methods: {
    createdPage() {
      this.$loading(undefined, undefined, true);
      return getScoreDetails(this.$route.query.id ? this.$route.query.id : 0, this.$route.query.subjectId ? this.$route.query.subjectId : 0, this.templateId)
        .then(res => {
          //学生详情数据处理
          if (res.data.meta.success) {
            let datas = res.data.data.lineChart;
            for (let i in datas) {
              if (datas[i].term === "上学期") {
                //生成图表数据
                for (let j = 0; j < datas[i].data.length; j++) {
                  this.echartScore1.push(parseFloat(datas[i].data[j].score));
                  this.echartDate1.push(datas[i].data[j].date);
                  this.echartUnit1.push(datas[i].data[j].unit);
                }
                //平均成绩，最高成绩
                this.average1 = datas[i].average;
                this.highest1 = datas[i].highest;
                //设置绘制区域宽度
               if(this.echartScore1.length>7){
                 this.chartsWidth1 = this.echartScore1.length*0.5+'rem'
               }
                 //设置线条颜色
                for (let x = 2; x < this.echartScore1.length; x++) {

                  if (this.echartScore1[x] < this.echartScore1[x - 1]) {
                    this.lineCole1.push({
                      gt: (x - 1),
                      lte: x,
                      color: "#D80000"
                    });
                  } else {
                    this.lineCole1.push({
                      gt: (x - 1),
                      lte: x,
                      color: "#3770FB"
                    });
                  }
                }

              }
              if (datas[i].term === "下学期") {
                //生成图表数据
                for (let j = 0; j < datas[i].data.length; j++) {
                  this.echartScore2.push(parseFloat(datas[i].data[j].score));
                  this.echartDate2.push(datas[i].data[j].date);
                  this.echartUnit2.push(datas[i].data[j].unit);
                }
                //平均成绩，最高成绩
                this.average2 = datas[i].average;
                this.highest2 = datas[i].highest;
                //设置绘制区域宽度
                if(this.echartScore2.length>7){
                 this.chartsWidth2 = this.echartScore2.length*0.4+"rem"
               }
                //设置线条颜色
                for (let x = 2; x < this.echartScore2.length; x++) {
                  if (this.echartScore2[x] < this.echartScore2[x - 1]) {
                    this.lineCole2.push({
                      gt: (x - 1),
                      lte: x,
                      color: "#D80000"
                    });
                  } else {
                    this.lineCole2.push({
                      gt: (x - 1),
                      lte: x,
                      color: "#3770FB"
                    });
                  }
                }
              }
            }
          }
          this.initCharts(); //绘图
        })
        .finally(() => {
          this.$loadingHide()
        })
    },
    initCharts() {

      let echartId1 = document.getElementById("mycharts");
      echartId1.style.width = this.chartsWidth1;//设置画布宽度
      let lineChart = this.echarts.init(echartId1);
      let echartId2 = document.getElementById("mycharts2");
       echartId2.style.width = this.chartsWidth2;//设置画布宽度
      let lineChart2 = this.echarts.init(echartId2);
      //上学期
      let option1 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          top: "15%",
          left: 25,
          right: 25,
          bottom: "10%",
          containLabel: true,
         // width:900
        },
          //  dataZoom: [{
          //       type: 'slider',
          //       show: true, //flase直接隐藏图形
          //       xAxisIndex: [0,1],
          //       filterMode: 'filter',
          //       left: '2%', //滚动条靠左侧的百分比
          //       bottom: -5,
          //       start: 0,//滚动条的起始位置
          //       end: 40 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
          //   }],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            barGap: "10%",
            data: this.echartDate1, //时间

            axisLine: {
              inheritAttrs: 0,
            lineStyle:{
              color:'#666'
            }
            },
            axisLabel: {
              interval: 0,

            },
             axisTick: {
              show: false,
            }

          },
          {
            type: "category",
            boundaryGap: false,
            data: this.echartUnit1, //单元
            axisLine: {
              inheritAttrs: 0,
            lineStyle:{
              color:'#666'
            }
            },
            axisLabel: {
              interval: 0,
              formatter:function (params) {
                //console.log(params);
                if (params.length > 3) {
                  return params.slice(0,-2)+'\n'+params.slice(-2)
                }else {
                  return params
                }

              },
            },
            axisTick: {
              show: false
            }
          }
        ],


        yAxis: {
          // //y轴刻度线
          max: 180,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              type: ["default", "dashed"],
              color:"#BFBFBF"
            }
          },
          //y坐标分割线样式
          splitLine: {
            show: true,
            lineStyle: {
              type: ["default", "dotted"],
              color:"#BFBFBF"
            }
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: this.lineCole1
        },
        series: [
          {
            name: "成绩",
            type: "line",

            data: this.echartScore1,
            // 折线点上显示数值
            itemStyle: { normal: { label: { show: true } } }
          }
        ]
      };
      //下学期
      let option2 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          top: "15%",
          left: 25,
          right: 25,
          bottom: "10%",
          containLabel: true
        },
        // legend: {
        //   data: ["成绩"]
        // },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.echartDate2, //时间

            axisLine: {
              inheritAttrs: 0,
              lineStyle:{
              color:'#666'
            }
            },
            axisLabel: {
              interval: 0
            },
            axisTick: {
              show: false,
              length:20,
               alignWithLabel:true,
            }
          },
          {
            type: "category",
            boundaryGap: false,
            data: this.echartUnit2, //单元
            axisLine: {
              inheritAttrs: 0,
              lineStyle:{
              color:'#666'
            }
            },
            axisLabel: {
              interval: 0,
              formatter:function (params) {
                //console.log(params);
                if (params.length > 3) {
                  return params.slice(0,-2)+'\n'+params.slice(-2)
                }else {
                  return params
                }

              },
            },
            axisTick: {
              show: false,
              length:20,
              alignWithLabel:true,
            }
          }
        ],

        // dataZoom: [{
        //         type: 'slider',
        //         show: true, //flase直接隐藏图形
        //         xAxisIndex: [0,1],
        //         filterMode: 'filter',
        //         left: '2%', //滚动条靠左侧的百分比
        //         bottom: -5,
        //         start: 0,//滚动条的起始位置
        //         end: 40 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
        //     }],
        yAxis: {
          // //y轴刻度线
          max: 180,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              type: ["default", "dashed"],
              color:"#BFBFBF",
            }
          },
          //y坐标分割线样式
          splitLine: {
            show: true,
            lineStyle: {
              type: ["default", "dotted"]
            }
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: this.lineCole2
        },
        series: [
          {
            name: "成绩",
            type: "line",
            data: this.echartScore2,
            // 折线点上显示数值
            itemStyle: { normal: { label: { show: true } } }
          }
        ]
      };
      lineChart.setOption(option1);
      lineChart2.setOption(option2);
    }
  }
};
</script>
<style lang="less" scoped>
.echarts {
  font-size: 0.14rem;
  color:#666666;
  .select-group {
    display: flex;
    .chooseTerm {
      position: relative;
      width: 1rem;
      height: 0.54rem;
      select {
        width: 1rem;
        height: 0.54rem;
        font-size: 0.14rem;
        //清除select的边框样式
        border: none;
        //清除select聚焦时候的边框颜色
        outline: none;
        padding: 0.14rem 0 0.1rem 0.16rem;
        //隐藏select的下拉图标
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }
      img {
        position: absolute;
        width: 0.13rem;
        height: 0.13rem;
        top: 0.24rem;
        right: 0.08rem;
      }
    }
  }
  .score-name {
    margin-top: 0.45rem;
    padding: 0.165rem 1rem;

    .score-item {
      display: flex;
      justify-content: space-between;
    }
  }
  .spaceing {
    margin: 0 0.16rem;
    height: 1px;
    background-color: #eeeeee;
  }
  .echarts-wrapper {
    padding: 0 0.16rem;
    .time {
      padding-top: 0.18rem;
      .name-before {
        padding-top: 0.16rem;
        padding: 0.01rem 0.01rem;
        background-color: #3770fb;
        margin-right: 0.1rem;
      }
      .time-name {
        font-weight: bold;
      }
    }
    #mycharts,
    #mycharts2 {
      height: 3rem;
    }
  }
}
</style>
