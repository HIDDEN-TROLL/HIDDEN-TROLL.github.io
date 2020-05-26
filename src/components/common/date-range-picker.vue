<template>
  <div class="date_range_picker">

    <span class="start_date clickable" @click="selectStartDate">
      <span v-for="item in startDateRenderData" :key="item.text" :class="item.className">{{ item.text }}</span>
    </span>

    <span class="divider">-</span>

    <span class="end_date clickable" @click="selectEndDate">
      <span v-for="item in endDateRenderData" :key="item.text" :class="item.className">{{ item.text }}</span>
    </span>


    <popup v-model="picker.show" position="bottom" get-container="#app">
      <datetime-picker
        v-model="picker.currentDate"
        :title="picker.title"
        type="date"
        :min-date="picker.minDate"
        :max-date="picker.maxDate"
        :formatter="formatter"
        @confirm="onConfirm"
        @cancel="picker.show = false"/>
    </popup>
  </div>
</template>
<script>
import { date as PHPFunctionDate } from '@/utils'
import { Popup, DatetimePicker } from 'vant'

const get7daysAgo = () => {
  const date = new Date()
  date.setDate(date.getDate() - 7)
  return date
}

export default {
  name: 'date_range_picker',
  components: {
    Popup,
    DatetimePicker,
  },
  props: {
    startDate: {
      type: Date,
      default: get7daysAgo,
    },
    endDate: {
      type: Date,
      default: () => new Date(),
    },

    textFormat: { // 日期格式化, 参考PHP的date函数, Y年份, m月份, d日期; 常用的两种: Y-m-d, Y-m
      type: String,
      default: 'Y年m月d日',
    },
    change: {
      type: Event,
    },
    minDate: {
      type: Date,
      default: () => new Date(2015, 0, 1),
    },
    maxDate: {
      type: [Boolean, Date],  // 传入false, 则不限制最大日期
      default: () => new Date(),
    },

  },
  data() {
    return {
      startDateRenderData: [],
      endDateRenderData: [],
      currentStartDate: null,
      currentEndDate: null,

      picker: {
        currentSelectType: 0, // 0表示当前选择的是开始日期, 1表示结束日期
        show: false,
        title: '选择开始日期',
        currentDate: null,
        minDate: null,
        maxDate: null,
      },
    }
  },
  created() {
    this.picker.minDate = this.minDate
    this.picker.maxDate = this.maxDate
    this.picker.currentDate = this.maxDate

    this.currentStartDate = this.startDate
    this.currentEndDate = this.endDate

    this.updateRenderData()
  },
  watch: {
    startDate(date) {
      if (date instanceof Date) {
        this.currentStartDate = date
      }
    },
    endDate(date) {
      if (date instanceof Date) {
        this.currentEndDate = date
      }
    },
    currentStartDate() {
      this.updateRenderData(1)
    },
    currentEndDate() {
      this.updateRenderData(2)
    },
  },
  computed: {

  },
  methods: {
    updateRenderData(which = 0) {
      if (which === 0) {
        this.startDateRenderData = this.computedRenderData(this.currentStartDate)
        this.endDateRenderData = this.computedRenderData(this.currentEndDate)
      } else if (which === 1) {
        this.startDateRenderData = this.computedRenderData(this.currentStartDate)
      } else if (which === 2) {
        this.endDateRenderData = this.computedRenderData(this.currentEndDate)
      }
    },
    computedRenderData(date) {
      const text = PHPFunctionDate(this.textFormat, date)
      const result = []
      let lastCharIsNumber = false
      let lastItem = null
      for (let i = 0, len = text.length; i < len; i++) {
        const char = text[i]
        const isNumber = Number.isInteger(Math.floor(char))
        const notNeedCreateNewItem = lastItem !== null && isNumber === lastCharIsNumber
        lastCharIsNumber = isNumber
        if (notNeedCreateNewItem) {
          lastItem.text += char
        } else {
          lastItem = {
            className: isNumber ? 'number' : 'word',
            text: char
          }
          result.push(lastItem)
        }
      }
      return result
    },
    emitEvent() {
      this.$emit('input', [this.currentStartDate, this.currentEndDate])
      this.$emit('change', [this.currentStartDate, this.currentEndDate])
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    onConfirm() {
      this.picker.show = false
      if (this.picker.currentSelectType === 0) {
        this.currentStartDate = this.picker.currentDate
      } else {
        this.currentEndDate = this.picker.currentDate
      }
      this.emitEvent()
    },
    selectStartDate() {
      this.picker.currentSelectType = 0
      this.picker.title = '选择开始日期'
      this.picker.currentDate = this.currentStartDate
      this.picker.minDate = this.minDate
      this.picker.maxDate = this.currentEndDate
      this.picker.show = true
    },
    selectEndDate() {
      this.picker.currentSelectType = 1
      this.picker.title = '选择结束日期'
      this.picker.currentDate = this.currentEndDate
      this.picker.minDate = this.currentStartDate
      this.picker.maxDate = this.maxDate
      this.picker.show = true
    },

  },
}
</script>
<style scoped lang="less">
.date_range_picker {
  height: .4rem;
  text-align: center;
  font-weight: 400;
  color: #666;
  line-height: .4rem;
  background: #fff;
  font-size: .14rem;
  vertical-align: middle;

  .show {
    opacity: 1;
  }

  .clickable:active {
    background-color: #eee;
  }
  .start_date, .end_date {
    .number {
      color: #3770FB;
    }
    .word {
      color: #999;
    }
  }
  .divider {
    color: #999;
    margin: 0 .1rem;
  }
}
</style>
