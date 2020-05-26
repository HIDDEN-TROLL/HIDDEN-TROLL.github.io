<template>
  <section class="energy-score-content">

    <van-tabs v-model="tabIndex" class="tabs">
      <van-tab title="教师互评"/>
      <van-tab title="校长评价"/>
    </van-tabs>

    <van-loading v-show="data[0].loadStatus === 1 || data[1].loadStatus === 1" class="loading"/>

    <div v-for="(item, index) in data" :key="index" v-show="tabIndex === index" class="content">

      <div class="charts">
        <p class="info">
          <span>本月为她打分{{ index === 0 ? '教师' : '校长' }}：{{ item.gradingPeoples }}人</span>
          <span>获得分数：{{ item.totalScore }}分</span>
        </p>
        <div :ref="`chart_${index}_0`" class="chart"></div>
        <div :ref="`chart_${index}_1`" class="chart"></div>
      </div>

      <van-list
        class="time_line"
        v-model="item.timeLineLoadingMore"
        :finished="item.timeLineFinished"
        finished-text="没有更多了"
        @load="fetchTimeLineData(index)"
        :immediate-check="false">
        <div
          class="line"
          v-for="(timeLineItem, timeLineIndex) in item.timeLineData"
          :key="timeLineIndex">

          <p class="info">
            <span>{{ timeLineItem.date }} {{ timeLineItem.name }}</span>
            <span class="score">+{{ timeLineItem.score }}分</span>
          </p>

          <p class="content">{{ timeLineItem.content ? timeLineItem.content : '无评论内容' }}</p>
        </div>
      </van-list>

    </div>

  </section>
</template>

<script>
import { getEnergyScoreDetailsLineChart, getEnergyScoreDetailsTimeLine } from '@/api/school/teacher-ranking-list'
import { List, Tabs, Tab, Loading } from 'vant'
import echarts from 'echarts'

const TeacherType = 1 // 教师互评
const DirectorType = 2 // 校长评价

const loadStatusNotLoaded = 0 // 未加载
const loadStatusLoading = 1 // 加载中
const loadStatusLoaded = 2 // 已加载

export default {
  name: 'TeacherRankingListEnergyScoreDetails',
  props: {
    teacherId: {
      type: Number,
    },
  },
  components: {
    vanLoading: Loading,
    vanTabs: Tabs,
    vanTab: Tab,
    vanList: List,
  },
  data() {
    return {
      tabIndex: 0,

      data: [
        {
          loadStatus: loadStatusNotLoaded,
          type: TeacherType,
          gradingPeoples: 0,
          totalScore: 0,
          timeLineData: [],
          timeLineLoadingMore: false,
          timeLineFinished: false,
          timeLineLoadedPage: 0,
        },
        {
          loadStatus: loadStatusNotLoaded,
          type: DirectorType,
          gradingPeoples: 0,
          totalScore: 0,
          timeLineData: [],
          timeLineLoadingMore: false,
          timeLineFinished: false,
          timeLineLoadedPage: 0,
        },
      ],
    }
  },
  created() {
    this.fetchLineChartData(0)
    this.fetchTimeLineData(0)
  },
  watch: {
    tabIndex() {
      const data = this.data[this.tabIndex]
      if (data.loadStatus === loadStatusNotLoaded) {
        this.fetchLineChartData(this.tabIndex)
      }
      if (data.timeLineLoadedPage === 0) {
        this.fetchTimeLineData(this.tabIndex)
      }
    },
  },
  methods: {
    async fetchLineChartData(index) {
      const data = this.data[index]

      data.loadStatus = loadStatusLoading

      try {
        const response = await getEnergyScoreDetailsLineChart(this.teacherId, data.type)
        if (response.data.meta.success) {
          const responseData = response.data.data
          data.gradingPeoples = responseData.gradingPeoples
          data.totalScore = responseData.totalScore
          this.initCharts(index, responseData.lineChart)
        }
      } catch (e) {
        console.error(e)
      }
      data.loadStatus = loadStatusLoaded
    },
    async fetchTimeLineData(index) {
      const data = this.data[index]

      data.timeLineLoadingMore = true
      data.timeLineLoadedPage += 1
      try {
        const response = await getEnergyScoreDetailsTimeLine(this.teacherId, data.type, data.timeLineLoadedPage)
        if (response.data.meta.success) {
          const responseData = response.data.data
          data.timeLineFinished = data.timeLineLoadedPage >= responseData.paginate.totalPage
          data.timeLineData.push(...responseData.timeLine)
        }
      } catch (e) {
        console.error(e)
      }
      data.timeLineLoadingMore = false
    },
    initCharts(index, data) {
      const XData = data.map(item => item.date)
      let dataZoomEnd = 100 / Math.ceil(XData.length / 7)
      dataZoomEnd = dataZoomEnd < 20 ? 20 : dataZoomEnd

      const getOption = (chartIndex, YData) => {
        let yAxisMax = Math.max.apply(null, YData)
        yAxisMax = yAxisMax <= 1 ? 1 : yAxisMax + Math.ceil(yAxisMax / 100 * 10)
        return {
          "color": [
            chartIndex === 0 ? '#3770FB' : '#84C225',
          ],
          "grid": {
            "left": 40,
            "top": 40,
            "right": 40,
            "bottom": 40,
          },
          "tooltip": {
            "trigger": "axis",
            "axisPointer": {
              "type": "shadow",
            },
          },
          "xAxis": {
            "name": "日",
            "type": "category",
            "data": XData,
            "axisLine": {
              "lineStyle": {
                "color": "#999999",
              },
            },
            "axisLabel": {
              "textStyle": {
                "fontSize": '.14rem',
              },
            },
          },
          "yAxis": {
            "name": chartIndex === 0 ? '人' : '分数',
            "type": "value",
            "axisLine": {
              "lineStyle": {
                "color": "#999999",
              },
            },
            max: yAxisMax,
          },
          "series": [
            {
              "data": YData,
              "type": "line",
              "symbol": "circle",
              "symbolSize": 10,
              "smooth": false,
            },
          ],
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0],
              start: 100 - dataZoomEnd,
              end: 100,
              zoomLock: true,
            },
          ],
        }
      }

      const chartContainers = [
        this.$refs[`chart_${index}_0`],
        this.$refs[`chart_${index}_1`],
      ]
      const chartData = [
        data.map(item => item.peopleNumbers),
        data.map(item => item.score),
      ]
      chartContainers.forEach((container, index) => {
        if (Array.isArray(container) && container[0]) {
          container = container[0]
        }
        if (container) {
          echarts.init(container)
            .setOption(getOption(index, chartData[index]))
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.energy-score-content {

  .loading {
    margin: .2rem auto;
  }

  .tabs /deep/ .van-tabs__line {
    background-color: #3770fb;
  }

  .content {
    .charts {
      border-bottom: .1rem solid #F3F7F8;

      .info {
        font-size: 0.14rem;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 0.2rem;
        display: flex;
        justify-content: space-between;
        margin: .12rem .15rem;
      }

      .chart {
        width: 100%;
        height: 2rem;
        margin-bottom: .1rem;
      }
    }

    .time_line {
      padding-top: .05rem;

      .line {
        padding: .12rem .15rem;
        border-bottom: .02rem solid #eee;

        .info {
          font-size: 0.14rem;
          color: rgba(102, 102, 102, 1);
          line-height: 0.17rem;
          display: flex;
          justify-content: space-between;
          margin-bottom: .08rem;

          .score {
            font-size: 0.14rem;
            font-weight: 400;
            color: rgba(216, 0, 0, 1);
            line-height: 0.2rem;
          }
        }

        .content {
          font-size: 0.14rem;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 0.2rem;
        }
      }
    }
  }
}
</style>

