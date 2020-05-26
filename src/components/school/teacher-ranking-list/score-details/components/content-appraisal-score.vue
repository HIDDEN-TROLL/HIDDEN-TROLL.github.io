<template>
  <section class="appraisal-score-content">

    <van-loading v-show="loading" class="loading"/>

    <div class="content">

      <div class="charts">
        <p class="info">
          <span>本月为老师打分家长：{{ gradingPeoples }}人</span>
          <span>获得分数：{{ totalScore }}分</span>
        </p>
        <div ref="chart_0" class="chart"></div>
        <div ref="chart_1" class="chart"></div>
      </div>

      <van-list
        class="time_line"
        v-model="timeLineLoadingMore"
        :finished="timeLineFinished"
        finished-text="没有更多了"
        @load="fetchTimeLineData(index)"
        :immediate-check="false">
        <div
          class="level_date"
          v-for="timeLineItem in timeLineData"
          :key="timeLineItem.date">

          <p class="date">{{ timeLineItem.date }}</p>

          <div
            class="level_record"
            v-for="record in timeLineItem.list"
            :key="`${record.name}${record.time}`">
            <p class="info">
              <span>{{ record.time }} {{ record.name }} {{ record.gradeName }} {{ record.className }}</span>
              <span class="score">+{{ record.score }}分</span>
            </p>

            <p class="content">{{ record.content ? record.content : '无评论内容' }}</p>
          </div>

        </div>
      </van-list>

    </div>

  </section>
</template>

<script>
import { getAppraisalScoreDetailsLineChart, getAppraisalScoreDetailsTimeLine } from '@/api/school/teacher-ranking-list'
import { List, Loading } from 'vant'
import echarts from 'echarts'

export default {
  name: 'TeacherRankingListAppraisalScoreDetails',
  props: {
    teacherId: {
      type: Number,
    },
  },
  components: {
    vanLoading: Loading,
    vanList: List,
  },
  data() {
    return {
      loading: false,
      gradingPeoples: 0,
      totalScore: 0,

      timeLineData: [],
      timeLineLoadingMore: false,
      timeLineFinished: false,
      timeLineLoadedPage: 0,
    }
  },
  created() {
    this.fetchLineChartData()
    this.fetchTimeLineData()
  },
  methods: {
    async fetchLineChartData() {
      this.loading = true
      try {
        const response = await getAppraisalScoreDetailsLineChart(this.teacherId)
        if (response.data.meta.success) {
          const responseData = response.data.data
          this.gradingPeoples = responseData.gradingParents
          this.totalScore = responseData.totalScore
          this.initCharts(responseData.lineChart)
        }
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },
    async fetchTimeLineData() {
      this.timeLineLoadingMore = true
      this.timeLineLoadedPage += 1
      try {
        const response = await getAppraisalScoreDetailsTimeLine(this.teacherId, this.timeLineLoadedPage)
        if (response.data.meta.success) {
          const responseData = response.data.data
          this.timeLineFinished = this.timeLineLoadedPage >= responseData.paginate.totalPage
          this.timeLineData.push(...responseData.timeLine)
        }
      } catch (e) {
        console.error(e)
      }
      this.timeLineLoadingMore = false
    },
    initCharts(data) {
      const weekNumberMapping = [undefined, '第一周', '第二周', '第三周', '第四周', '第五周']
      const XData = data.map(item => weekNumberMapping[item.weekNumber] ? weekNumberMapping[item.weekNumber] : item.weekNumber)

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
            "name": "周",
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
        }
      }

      const chartContainers = [
        this.$refs[`chart_0`],
        this.$refs[`chart_1`],
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
.appraisal-score-content {

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
      padding-top: .1rem;

      .level_date {
        padding-top: .15rem;
        padding-bottom: .12rem;
        margin: 0 .15rem;
        border-bottom: .02rem solid #eee;
        &:not(:last-of-type) {
          border-bottom: .02rem solid #eee;
        }

        .date {
          font-size:0.16rem;
          font-weight:bold;
          color:rgba(51,51,51,1);
          line-height:0.19rem;
        }

        .level_record {
          padding: .12rem 0;
          font-size:0.14rem;
          font-weight: 400;

          &:not(:last-of-type) {
            border-bottom: .02rem dashed #eee;
          }
          &:last-of-type {
            padding-bottom: 0;
          }
          .info {
            color:rgba(102,102,102,1);
            line-height:0.17rem;
            margin-bottom: .08rem;
            .score {
              color: rgba(216, 0, 0, 1);
              line-height: 0.2rem;
            }
          }
          .content {
            color:rgba(153,153,153,1);
            line-height:0.2rem;
          }
        }
      }

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

