<template>
  <div>
    <van-action-sheet v-model="isShow" :actions="actions" cancel-text="取消" @select="onSelect"/>

    <van-popup v-model="customDateRange.datePickerShow" position="bottom">
      <van-datetime-picker
        v-model="customDateRange.datePickerCurrentDate"
        type="date"
        :min-date="customDateRange.datePickerMinDate"
        :max-date="customDateRange.datePickerMaxDate"
        @confirm="datePickerConfirm"
        @cancel="datePickerCancel"
      />
    </van-popup>

    <van-dialog
      v-model="customDateRange.show"
      title="自选时间范围"
      show-cancel-button
      :before-close="beforeCustomDateRangeClose">
      <van-field
        v-model="customDateRangeStartDate"
        label="开始时间："
        placeholder="请设置开始时间"
        @click="startPickDate(0)"
        readonly
      />
      <van-field
        v-model="customDateRangeEndDate"
        label="结束时间："
        placeholder="请设置结束时间"
        @click="startPickDate(1)"
        readonly
      />
    </van-dialog>
  </div>
</template>

<script>
import { Popup, Field, DatetimePicker, Actionsheet } from 'vant'
import { formatDate } from '@/utils'

const now = new Date()
const nowTime = now.getTime()
const nowDay = now.getDay() === 0 ? 7 : now.getDay()
const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
const monday = new Date(nowTime - (nowDay - 1) * 24 * 60 * 60 * 1000)
const sunday = new Date(nowTime + (7 - nowDay) * 24 * 60 * 60 * 1000)
const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
const lastWeekMonday = new Date(monday.getTime() - 7 * 24 * 60 * 60 * 1000)
const lastWeekSunday = new Date(sunday.getTime() - 7 * 24 * 60 * 60 * 1000)
const lastMonthFirstDayOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
const lastMonthLastDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 0)

const ACTION_ALL = { name: '全部', type: 0, value: 0 }
const ACTION_TODAY = { name: '今日', type: 1, value: now }
const ACTION_YESTERDAY = { name: '昨天', type: 2, value: yesterday }
const ACTION_THIS_WEEK = { name: '本周', type: 3, value: [monday, sunday], }
const ACTION_THIS_MONTH = { name: '本月', type: 4, value: [firstDayOfMonth, lastDayOfMonth] }
const ACTION_LAST_WEEK = { name: '上周', type: 5, value: [lastWeekMonday, lastWeekSunday] }
const ACTION_LAST_MONTH = { name: '上月', type: 6, value: [lastMonthFirstDayOfMonth, lastMonthLastDayOfMonth] }
const ACTION_CUSTOM = { name: '自定义', type: -1 }
const ACTION_OTHER = { name: '', type: -2 }

const ALL_ACTIONS = [
  ACTION_ALL,
  ACTION_TODAY,
  ACTION_YESTERDAY,
  ACTION_THIS_WEEK,
  ACTION_THIS_MONTH,
  ACTION_LAST_WEEK,
  ACTION_LAST_MONTH,
  ACTION_CUSTOM,
  ACTION_OTHER,
]

const optionTypeMap = [
  [ // 0
    ACTION_ALL.type,
    ACTION_TODAY.type,
    ACTION_YESTERDAY.type,
    ACTION_THIS_WEEK.type,
    ACTION_THIS_MONTH.type,
    ACTION_CUSTOM.type
  ],
  [ // 1
    ACTION_ALL.type,
    ACTION_TODAY.type,
    ACTION_YESTERDAY.type,
    ACTION_CUSTOM.type
  ],
  [ // 2
    ACTION_TODAY.type,
    ACTION_YESTERDAY.type,
    ACTION_THIS_WEEK.type,
    ACTION_THIS_MONTH.type,
    ACTION_CUSTOM.type
  ],
  [ // 3
    ACTION_TODAY.type,
    ACTION_YESTERDAY.type,
    ACTION_THIS_WEEK.type,
    ACTION_LAST_WEEK.type,
    ACTION_THIS_MONTH.type,
    ACTION_LAST_MONTH.type,
    ACTION_CUSTOM.type
  ],
]

export default {
  name: 'date-range-filter-dialog',
  props: {
    optionType: {
      type: Number,
      default: 0,
      /*
      * 0 全部 今日 昨天 本周 本月 自定义
      * 1 全部 今日 昨天 自定义
      * 2 今日 昨天 本周 本月 自定义
      * 3 今日 昨天 本周 上周 本月 上月 自定义
      * */
    },
    customOptions: {
      type: Array,
      default: undefined
    },
    defaultSelected: {
      type: [Number, String],
      default: 0,
    },
  },
  components: {
    vanPopup: Popup,
    vanField: Field,
    vanDatetimePicker: DatetimePicker,
    vanActionSheet: Actionsheet,
  },
  data() {
    return {
      isShow: false,
      active: this.defaultSelected,
      customActionValue: [monday, sunday],
      customDateRange: {
        show: false,
        startDate: null,
        endDate: null,

        datePickerIndex: 0,
        datePickerShow: false,
        datePickerCurrentDate: null,
        datePickerMinDate: null,
        datePickerMaxDate: null,
      },
      optionIds: null,
    }
  },
  computed: {
    actions() {
      const optionIds = this.optionIds
      let actions
      if (!optionIds) {
        actions = ALL_ACTIONS
      } else {
        actions = ALL_ACTIONS.filter(action => optionIds.includes(action.type))
      }
      actions.forEach(action => {
        action.disabled = this.active === action.type
        if (action.type === -1) {
          action.value = this.customActionValue
        }
      })
      return actions
    },
    customDateRangeStartDate() {
      if (this.customDateRange.startDate instanceof Date) {
        return formatDate(this.customDateRange.startDate)
      } else {
        return ''
      }
    },
    customDateRangeEndDate() {
      if (this.customDateRange.endDate instanceof Date) {
        return formatDate(this.customDateRange.endDate)
      } else {
        return ''
      }
    },
  },
  methods: {
    show() {
      this.isShow = true
    },
    onSelect(item) {
      this.isShow = false
      if (item.type !== ACTION_CUSTOM.type) {
        this.active = item.type
        this.$emit('change', {
          name: item.name,
          startDate: Array.isArray(item.value) ? item.value[0] : item.value,
          endDate: Array.isArray(item.value) ? item.value[1] : item.value,
        })
        return
      }

      this.customDateRange.show = true
      this.customDateRange.startDate = item.value[0]
      this.customDateRange.endDate = item.value[1]
    },
    datePickerConfirm() {
      this.customDateRange.datePickerShow = false
      if (this.customDateRange.datePickerIndex === 0) {
        this.customDateRange.startDate = this.customDateRange.datePickerCurrentDate
      } else {
        this.customDateRange.endDate = this.customDateRange.datePickerCurrentDate
      }
    },
    datePickerCancel() {
      this.customDateRange.datePickerShow = false
    },

    beforeCustomDateRangeClose(action, next) {
      if (action === 'cancel') {
        next()
        return
      }

      if (this.customDateRange.startDate === null && this.customDateRange.endDate === null) {
        // 没有选择日期, 默认今天
        this.active = ACTION_TODAY.type
        this.$emit('change', {
          name: '今日',
          startDate: now,
          endDate: now,
        })
      } else {
        const actions = this.actions
        const targetAction = actions.find(action => action.type === ACTION_CUSTOM.type)
        if (targetAction) {
          this.customActionValue = [
            this.customDateRange.startDate,
            this.customDateRange.endDate,
          ]
          this.active = ACTION_OTHER.type // 设置为-2; 因为设置为-1会导致"自定义"选项被禁用
          this.$emit('change', {
            name: '自定义',
            startDate: this.customDateRange.startDate,
            endDate: this.customDateRange.endDate,
          })
        }
      }

      next()
    },
    startPickDate(index) {
      this.customDateRange.datePickerShow = true
      this.customDateRange.datePickerIndex = index
      if (index === 0) {
        this.customDateRange.datePickerCurrentDate = this.customDateRange.startDate
        this.customDateRange.datePickerMinDate = new Date(2015, 0, 1)
        this.customDateRange.datePickerMaxDate = this.customDateRange.endDate
      } else {
        this.customDateRange.datePickerCurrentDate = this.customDateRange.endDate
        this.customDateRange.datePickerMinDate = this.customDateRange.startDate
        this.customDateRange.datePickerMaxDate = now
      }
    },
  },
  created() {
    if (typeof this.defaultSelected === 'string') {
      const action = ALL_ACTIONS.find(action => action.name === this.defaultSelected)
      if (action) {
        this.active = action.type
      }
    }

    if (Array.isArray(this.customOptions)) {
      this.optionIds = this.customOptions.map(name => {
        const action = ALL_ACTIONS.find(action => action.name === name)
        return action ? action.type : null
      })
        .filter(id => id !== null)
    } else {
      this.optionIds = optionTypeMap[this.optionType]
    }
  },
}
</script>
