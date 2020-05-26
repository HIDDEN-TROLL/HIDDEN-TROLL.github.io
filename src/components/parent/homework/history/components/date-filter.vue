<template>
  <van-dialog
    :value="show"
    title="筛选日期"
    show-cancel-button
    close-on-popstate
    @confirm="confirm"
    @cancel="$emit('cancel')">

    <van-cell-group>
      <van-cell
        v-for="(option, index) in options"
        :key="index"
        :title="option.name"
        :title-class="{ active: option.id === active }"
        clickable
        size="large"
        @click="active = option.id">
        <van-icon v-show="option.id === active" name="success" slot="right-icon" color="#1989fa" />
      </van-cell>
    </van-cell-group>
    <van-cell-group title="自定义日期范围">
      <van-cell
        title="开始日期"
        :value="customDataStartText"
        :title-class="{ active: active === -1 }"
        :value-class="{ active: active === -1 }"
        clickable
        size="large"
        @click="showDateStartPicker" />
      <van-cell
        title="结束日期"
        :value="customDataEndText"
        :title-class="{ active: active === -1 }"
        :value-class="{ active: active === -1 }"
        clickable
        size="large"
        @click="showDateEndPicker" />
    </van-cell-group>

    <van-popup :value="datePickerStatus !== 0" position="bottom" get-container="#app" @close="datePickerStatus = 0">
      <van-datetime-picker
        v-model="datePickerDate"
        type="date"
        :min-date="datePickerMinDate"
        :max-date="datePickerMaxDate"
        :formatter="datePickerFormatter"
        @confirm="datePickerConfirm"
        @cancel="datePickerStatus = 0"/>
    </van-popup>

  </van-dialog>
</template>

<script>
import { CellGroup, Cell, Icon, Popup, DatetimePicker } from 'vant'
import { formatDate } from '@/utils'

function getMonday() {
  const date = new Date()
  const day = date.getDay() || 7
  return formatDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day))
}

function getFirstDayOfCurrentMonth() {
  const date = new Date()
  date.setDate(1)
  return formatDate(date)
}


export default {
  name: 'ParentHomeworkHistoryDateFilter',
  components: {
    vanCellGroup: CellGroup,
    vanCell: Cell,
    vanIcon: Icon,
    vanPopup: Popup,
    vanDatetimePicker: DatetimePicker,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      options: [
        {
          id: 0,
          name: '全部',
          dataStart: null,
          dataEnd: null,
        },
        {
          id: 1,
          name: '本周',
          dataStart: getMonday(),
          dataEnd: null,
        },
        {
          id: 2,
          name: '本月',
          dataStart: getFirstDayOfCurrentMonth(),
          dataEnd: null,
        },
      ],
      active: 0, // -1 自定义 0 全部 1 本周 2 本月
      customDataStart: null,
      customDataEnd: null,

      datePickerStatus: 0, // 0隐藏 1开始时间 2结束时间
      datePickerDate: new Date(),
      datePickerMinDate: undefined,
      datePickerMaxDate: undefined,
    }
  },
  computed: {
    customDataStartText() {
      if (this.customDataStart instanceof Date) {
        return formatDate(this.customDataStart)
      }
      return '点击设置开始日期'
    },
    customDataEndText() {
      if (this.customDataEnd instanceof Date) {
        return formatDate(this.customDataEnd)
      }
      return '点击设置结束日期'
    },
  },
  methods: {
    datePickerFormatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    showDateStartPicker() {
      if (this.customDataStart) {
        this.datePickerDate = this.customDataStart
      }
      this.datePickerMinDate = undefined
      this.datePickerMaxDate = this.customDataEnd ? this.customDataEnd : new Date()
      this.datePickerStatus = 1
    },
    showDateEndPicker() {
      if (this.customDataEnd) {
        this.datePickerDate = this.customDataEnd
      }
      this.datePickerMinDate = this.customDataStart ? this.customDataStart : undefined
      this.datePickerMaxDate = new Date()
      this.datePickerStatus = 2
    },
    datePickerConfirm() {
      if (this.datePickerStatus === 1) {
        this.customDataStart = this.datePickerDate
      } else if (this.datePickerStatus === 2) {
        this.customDataEnd = this.datePickerDate
      }
      this.active = -1
      this.datePickerStatus = 0
    },
    confirm() {
      const option = this.options.find(option => option.id === this.active)
      let data
      let rangeName
      if (option) {
        data = [option.dataStart, option.dataEnd]
        rangeName = option.name
      } else {
        const dateStart = this.customDataStart instanceof Date ? formatDate(this.customDataStart) : null
        const dateEnd = this.customDataEnd instanceof Date ? formatDate(this.customDataEnd) : null
        data = [dateStart, dateEnd]
        rangeName = '自定义'
      }

      if (rangeName === '全部') {
        rangeName = ''
      }
      this.$emit('confirm', {
        range: data,
        rangeName,
      })
    },
  }
}
</script>

<style scoped lang="less">
.active {
  color: #1989fa;
}
</style>
