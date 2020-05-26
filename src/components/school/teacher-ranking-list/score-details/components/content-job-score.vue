<template>
  <section class="job-score-content">
    <div ref="chart" class="chart"></div>

    <p class="date">{{ date }}</p>

    <van-list
      class="time_line"
      v-model="timeLineLoadingMore"
      :finished="timeLineFinished"
      finished-text="没有更多了"
      @load="fetchTimeLineData"
      :immediate-check="false">
      <div class="line header">
        <span class="col1">日期</span>
        <span class="col2">事项</span>
        <span class="col3">得分</span>
      </div>
      <div
        class="line"
        :class="{ last: index === timeLineData.length-1 }"
        v-for="(item, index) in timeLineData"
        :key="item.date">
        <span class="col1">{{ item.date }}</span>
        <span class="col2">{{ item.content }}</span>
        <span class="col3">{{ item.score }}</span>
      </div>
    </van-list>
  </section>
</template>

<script>
import { getJobScoreDetailsLineChart, getJobScoreDetailsTimeLine } from '@/api/school/teacher-ranking-list'
import { List } from 'vant'
import { date as PHPFunctionDate } from '@/utils'
import echarts from 'echarts'

export default {
  name: 'TeacherRankingListJobScoreDetails',
  props: {
    teacherId: {
      type: Number,
    },
  },
  components: {
    vanList: List,
  },
  data() {
    return {
      date: PHPFunctionDate('Y.m', new Date()),

      timeLineLoadingMore: false,
      timeLineFinished: false,
      timeLineLoadedPage: 0,
      timeLineData: [],
    }
  },
  created() {
    this.$loading(undefined, undefined, true)
    const p1 = this.fetchLineChartData()
    const p2 = this.fetchTimeLineData()
    Promise.all([p1, p2])
      .finally(() => {
        this.$loadingHide()
      })
  },
  methods: {
    async fetchLineChartData() {
      const response = await getJobScoreDetailsLineChart(this.teacherId)
      if (response.data.meta.success) {
        this.initCharts(response.data.data)
      }
    },
    async fetchTimeLineData() {
      this.timeLineLoadingMore = true
      this.timeLineLoadedPage += 1
      const response = await getJobScoreDetailsTimeLine(this.teacherId, this.timeLineLoadedPage)
      if (response.data.meta.success) {
        const data = response.data.data
        this.timeLineFinished = this.timeLineLoadedPage >= data.paginate.totalPage
        this.timeLineData.push(...data.timeLine)
        this.$emit('passScoreData', data.scores)
      }
      this.timeLineLoadingMore = false
    },


    initCharts(data) {
      const chart = echarts.init(this.$refs['chart']);
      const XData = data.map(item => item.date)
      const YData = data.map(item => item.score)
      let dataZoomEnd = 100 / Math.ceil(XData.length / 7)
      dataZoomEnd = dataZoomEnd < 20 ? 20 : dataZoomEnd
      let yAxisMax = Math.max.apply(null, YData)
      yAxisMax = yAxisMax <= 1 ? 1 : yAxisMax + Math.ceil(yAxisMax / 100 * 10)

      const option = {
        "color": [
          "#3770FB"
        ],
        "grid": {
          "left": 40,
          "top": 40,
          "right": 40,
          "bottom": 40
        },
        "tooltip": {
          "trigger": "axis",
          "axisPointer": {
            "type": "shadow"
          }
        },
        "xAxis": {
          "name": "日",
          "type": "category",
          "data": XData,
          "axisLine": {
            "lineStyle": {
              "color": "#999999"
            }
          },
          "axisLabel": {
            "textStyle": {
              "fontSize": '.14rem'
            }
          }
        },
        "yAxis": {
          "name": "得分",
          "type": "value",
          "axisLine": {
            "lineStyle": {
              "color": "#999999"
            }
          },
          max: yAxisMax,
        },
        "series": [
          {
            "data": YData,
            "type": "line",
            "symbol": "circle",
            "symbolSize": 10,
            "smooth": false
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 100 - dataZoomEnd,
            end: 100,
            zoomLock: true
          }
        ]
      }
      chart.setOption(option);
    },
  },
}
</script>

<style scoped lang="less">
.job-score-content {

  .chart {
    width: 100%;
    height: 2rem;
  }
  .date {
    padding-left: .15rem;
    margin: .1rem 0;
    font-size: 0.14rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.2rem;
  }

  .time_line {
    @borderWidth: 0.01rem;
    @borderColor: #DCDCDC;

    padding: 0 .15rem;
    font-size: 0.14rem;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 0.17rem;

    .header {
      color: rgba(102, 102, 102, 1);
    }

    .line {
      display: flex;

      &.last,
      &:last-of-type {
        border-bottom: @borderWidth solid @borderColor;
      }
    }

    .col1, .col2, .col3 {
      border-left: @borderWidth solid @borderColor;
      border-top: @borderWidth solid @borderColor;
      min-width: .8rem;
      min-height: .3rem;
      display: inline-flex;
      justify-content: center;
      align-items: center;

      word-wrap: break-word;
      word-break: break-all;

      padding: .05rem;
    }

    .col2 {
      flex-grow: 1;
    }

    .col3 {
      border-right: @borderWidth solid @borderColor;
    }
  }
}
</style>
