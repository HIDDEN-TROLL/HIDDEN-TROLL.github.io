<template>
  <div>
    <van-action-sheet v-model="isShow" :actions="actions" @select="onSelect"/>

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
const nowTime = now.getTime();
const nowDay = now.getDay();
const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
const monday = new Date(nowTime - (nowDay - 1) * 24 * 60 * 60 * 1000)
const sunday = new Date(nowTime + (7 - nowDay) * 24 * 60 * 60 * 1000)
const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

export default {
  name: 'date-filter-dialog',
  components: {
    vanPopup: Popup,
    vanField: Field,
    vanDatetimePicker: DatetimePicker,
    vanActionSheet: Actionsheet,
  },
  data() {
    return {
      isShow: false,
      active: 3,
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
    }
  },
  computed: {
    actions() {
      return [
        // {
        //   name: '全部',
        //   value: 0,
        //   type: 0,
        //   disabled: this.active === 0,
        // },
        {
          name: '今日',
          value: now,
          type: 1,
          disabled: this.active === 1,
        },
        {
          name: '昨日',
          value: yesterday,
          type: 2,
          disabled: this.active === 2,
        },
        {
          name: '本周',
          value: [monday, sunday],
          type: 3,
          disabled: this.active === 3,
        },
        {
          name: '本月',
          value: [firstDayOfMonth, lastDayOfMonth],
          type: 4,
          disabled: this.active === 4,
        },
        {
          name: '自定义',
          value: this.customActionValue,
          type: -1,
          disabled: this.active === -1,
        },
      ]
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
      if (item.type !== -1) {
        this.active = item.type
        this.$emit('change', item.value)
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
        this.active = 1
        this.$emit('change', now)
      } else {
        const actions = this.actions
        const targetAction = actions.find(action => action.type === -1)
        if (targetAction) {
          this.customActionValue = [
            this.customDateRange.startDate,
            this.customDateRange.endDate,
          ]
          this.active = -2
          this.$emit('change', this.customActionValue)
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
}
</script>

<style scoped lang="less">

</style>
