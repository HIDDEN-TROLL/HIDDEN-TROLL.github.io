<template>
  <div class="date">
    <icon name="arrow-left" class="left clickable" :class="{show: isShowLeftBtn}" @click="prev" />

    <span @click="show = true" class="center clickable" >
      <span>{{ dateText }}</span>
      <icon name="arrow-down" class="icon" />
    </span>

    <icon name="arrow" class="right clickable" :class="{show: isShowRightBtn}" @click="next" />

    <popup v-model="show" position="bottom" :get-container="container">
      <datetime-picker
        v-model="currentDate"
        :type="mode === 0 ? 'year-month' : 'date'"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="onConfirm"
        @cancel="show = false"/>
    </popup>
  </div>
</template>
<script>
import { date } from '@/utils'
import { Icon, Popup, DatetimePicker } from 'vant'

export default {
  name: 'datepicker',
  components: {
    Popup,
    DatetimePicker,
    Icon,
  },
  props: {
    value: {
      type: Date,
      default: () => new Date()
    },
    mode: { // 选择类型: 0: 年月 1: 年月日
      type: Number,
      default: 0,
      validator: v => [0, 1].includes(v)
    },
    textFormat: { // 日期格式化, 参考PHP的date函数, Y年份, m月份, d日期; 常用的两种: Y-m-d, Y-m
      type: String,
      default: 'Y-m',
    },
    change: {
      type: Event
    },
    minDate: {
      type: Date,
      default: () => new Date(2015, 0, 1)
    },
    maxDate: {
      type: [Boolean, Date],  // 传入false, 则不限制最大日期
      default: () => new Date()
    },

  },
  data() {
    return {
      show: false,
      currentDate: this.value,
      container: () => document.getElementById('app'),
    }
  },
  watch: {
    value(date) {
      if (date instanceof Date) {
        this.currentDate = date
      }
    }
  },
  computed: {
    dateText() {
      return date(this.textFormat, this.currentDate)
    },
    isShowLeftBtn() {
      if (this.mode === 0) {
        return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()) > new Date(this.minDate.getFullYear(), this.minDate.getMonth())
      } else {
        return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()) > new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate())
      }
    },
    isShowRightBtn() {
      if (!(this.maxDate instanceof Date)) {
        return true
      }
      if (this.mode === 0) {
        return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()) < new Date(this.maxDate.getFullYear(), this.maxDate.getMonth())
      } else {
        return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()) < new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate())
      }
    }
  },
  methods: {
    emitEvent() {
      this.$emit('input', this.currentDate)
      this.$emit('change', this.currentDate)
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
      this.show = false
      this.emitEvent()
    },
    prev() {
      if (!this.isShowLeftBtn) {
        return
      }
      if (this.mode === 0) {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1)
      } else {
        this.currentDate.setDate(this.currentDate.getDate() - 1)
      }
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate())
      this.emitEvent()
    },
    next() {
      if (!this.isShowRightBtn) {
        return
      }
      if (this.mode === 0) {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1)
      } else {
        this.currentDate.setDate(this.currentDate.getDate() + 1)
      }
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate())
      this.emitEvent()
    }
  }
}
</script>
<style scoped lang="less">
.date {
  height: .4rem;
  text-align: center;
  font-weight: 400;
  color: #666;
  line-height: .4rem;
  background: #fff;
  font-size: .14rem;
  vertical-align: middle;

  .clickable:active {
    background-color: #eee;
  }

  .center {
    margin: 0 .4rem;
    vertical-align: middle;
    .icon {
      margin-left: .1rem;
    }
  }

  .left, .right {
    opacity: 0;
    vertical-align: middle;
  }
  .show {
    opacity: 1;
  }
}
</style>
