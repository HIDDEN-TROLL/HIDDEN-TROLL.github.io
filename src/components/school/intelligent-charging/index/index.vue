<template>
  <div class="charge-list">
    <header class="header">
      <van-nav-bar
        :title="title"
        :left-text="!isFromTemplate ? '返回' : ''"
        :left-arrow="!isFromTemplate"
        right-text="收费规则"
        @click-left="$router.back()"
        @click-right="isChargeRuleDialogShow = true"/>

      <datepicker v-if="!isFromTemplate" class="datepicker" textFormat="Y年m月" @change="fetchData" :value="date" :max-date="datePickerMaxDate"/>

      <div v-if="isBillDataAvailable" class="top-info">
        <van-row v-if="isFromTemplate">
          <van-col span="8">{{ nowDate.getFullYear() !== date.getFullYear() ? date.getFullYear() + '年' : '' }}{{ date.getMonth() + 1 }}月份</van-col>
          <van-col
            :class="{ red: !billData.isPaid && billData.billChargeMode === 3 && isBalanceNotEnough }"
            span="8">共{{ billData.totalAmount }}元
          </van-col>
          <van-col span="8">{{ billData.studentCount }}位学生</van-col>
        </van-row>
        <van-row v-else>
          <van-col span="6">{{ billData.studentCount }}位学生</van-col>

          <van-col v-if="!billData.isPaid" span="8">本次需付{{ billData.totalAmount }}元</van-col>
          <van-col v-else span="8">共{{ billData.totalAmount }}元</van-col>

          <van-col v-if="!billData.isPaid && billData.billChargeMode === 3"
                   :class="{ red: isBalanceNotEnough }" span="10">余额：{{ billData.balance }}元
          </van-col>
          <van-col v-else-if="billData.feedbackCount !== undefined" span="8">{{ billData.feedbackCount }}次异议</van-col>
        </van-row>
      </div>
    </header>


    <section v-if="isBillDataAvailable" class="body">
      <charge-student-list :bill-data="billData" />
    </section>
    <p v-else class="body center">无数据</p>

    <div v-if="isBillDataAvailable" class="footer">
      <p v-if="billData.isPaid" class="tip">{{ billData.billChargeMode === 3 ? '已扣费' : '已付费' }}</p>
      <p v-else-if="billData.feedbackStatus === 1" class="tip red">该名单已提出异议并审核中，请耐心等待~</p>
      <!--充值扣费-->
      <template v-else-if="billData.billChargeMode === 3">
        <p v-if="isTimeBeforePayDeadline" class="tip small">本次费用将于{{ payDeadlineDateString }}从余额扣除，请知悉</p>

        <p v-if="billData.isStoppedServices" class="tip red">系统已暂停服务</p>
        <p class="tip" :class="{ red: isBalanceNotEnough }">当前校区的账户余额：{{ billData.balance }}元</p>
        <p v-if="billData.balance < 0" class="tip red">欠费金额：{{ Math.abs(billData.balance) }}元</p>
      </template>
      <!--智能收费-->
      <template v-else>
        <p v-if="isTimeBeforePayDeadline" class="tip">最晚付费时间：{{ payDeadlineDateString }}</p>
        <p v-else-if="isTimeBeforeStopServingDate" class="tip red">系统停服时间：{{ stopServingDateString }}</p>

        <p v-if="billData.isStoppedServices" class="tip red">系统已暂停服务，请尽快补交费用，感谢您的支持！</p>
      </template>

      <feedback-objection-dialog v-if="!billData.isPaid && (billData.feedbackStatus === 2 || billData.feedbackStatus === 3)" :bill-id="billData.id" />

      <van-row v-if="!billData.isPaid && billData.feedbackStatus !== 1" class="action" type="flex" justify="center" align="center">
        <van-col v-if="billData.submitFeedbackStatus === 0" :span="billData.billChargeMode === 3 && isBalanceNotEnough ? 8 : 12" class="right-border">
          <router-link class="button" :to="{ name: 'ChargeFeedback' }">提出异议</router-link>
        </van-col>
        <van-col :span="billData.submitFeedbackStatus === 0 ? (billData.billChargeMode === 3 && isBalanceNotEnough ? 16 : 12) : 24">
          <template v-if="billData.billChargeMode === 3">
            <router-link v-if="!isBalanceNotEnough" class="button" :to="billData.rechargeEntry">充值</router-link>
            <router-link v-else class="button red" :to="billData.rechargeEntry">余额不足请尽快点我充值</router-link>
          </template>

          <router-link v-else class="button" :to="{ name: 'ChargeConfirmBeforePay' }">微信支付</router-link>
        </van-col>
      </van-row>

    </div>




    <charge-rule-dialog v-model="isChargeRuleDialogShow" :bill-data="billData"/>
  </div>

</template>

<script>
import { NavBar, Row, Col } from 'vant'
import { getParamFromUrlAndRoute, date, isValidDate } from '@/utils'
import { getChargeList, getAvailableChargeDates } from '@/api/school/charge'
import chargeRuleDialog from './components/charge-rule-dialog'
import feedbackObjectionDialog from './components/feedback-objection-dialog'
import chargeStudentList from './components/charge-student-list'
import datepicker from '@/components/common/datepicker'
import wx from 'weixin-js-sdk'
import storeModuleRegister from '@/utils/store-module-register'
import storeModule from '@/store/modules/school/charge'

export default {
  name: 'charge-list',
  components: {
    vanNavBar: NavBar,
    vanRow: Row,
    vanCol: Col,
    datepicker,
    chargeRuleDialog,
    feedbackObjectionDialog,
    chargeStudentList,
  },
  data() {
    return {
      isChargeRuleDialogShow: false,
      isFromTemplate: false,
      date: new Date(),
      nowDate: new Date(),
      nowTimestamp: Math.floor(new Date().getTime() / 1000),
      datePickerMaxDate: new Date(),
      attemptCheckPayResultRemainingNumber: 5, // 尝试循环获取支付结果剩余尝试次数
    };
  },
  computed: {
    billData() {
      return this.$store.state.charge.billData
    },
    title() {
      let title = '收费名单'
      if (this.billData !== undefined && this.billData.id > 0
        && !this.billData.isPaid
        && this.isTimeAfterPayDeadline) {
        title = '欠费名单'
      }
      document.title = title
      return title
    },
    isBillDataAvailable() {
      return this.billData !== undefined && this.billData.id > 0
    },
    payDeadlineDateString() {
      if (!this.isBillDataAvailable) {
        return ''
      }
      return date('Y年m月d日 23:59', this.billData.payDeadline)
    },
    stopServingDateString() {
      if (!this.isBillDataAvailable) {
        return ''
      }
      return date('Y年m月d日 23:59', this.billData.stopServingDate)
    },

    isBalanceNotEnough() { // 余额是否不够账单金额
      if (!this.isBillDataAvailable) {
        return false
      }
      if (typeof this.billData.isBalanceEnough === 'boolean') {
        return !this.billData.isBalanceEnough
      }
      return parseInt(this.billData.balance) < parseInt(this.billData.totalAmount)
    },

    isTimeBeforePayDeadline() { // 当前时间点是否处于, 还没过付费最后期限
      if (!this.isBillDataAvailable) {
        return false
      }
      return this.nowTimestamp < this.billData.payDeadline
    },
    isTimeAfterPayDeadline() { // 当前时间点是否处于, 过了付费最后期限
      if (!this.isBillDataAvailable) {
        return false
      }
      return this.nowTimestamp > this.billData.payDeadline
    },
    isTimeBeforeStopServingDate() { // 当前时间点是否处于, 过了付费最后期限 且 还没过停服日期
      return this.isTimeAfterPayDeadline && this.nowTimestamp < this.billData.stopServingDate
    },

  },
  methods: {
    fetchData(targetDate = new Date(), templateId = null, silent = false) {
      const dateString = date('Y-m', targetDate)
      const data = {
        date: dateString,
      }
      if (templateId) {
        data.from = 'template'
        data.template_id = templateId
      }

      if (!silent) {
        this.$loading()
      }
      getChargeList(data)
        .then(response => {
          if (response.data.meta.success) {
            if (response.data.data.routeReplace) {
              this.$router.replace({ name: response.data.data.routeReplace })
              return
            }
            if (response.data.data.billChargeDate && /^\d{10}$/.test(response.data.data.billChargeDate)) {
              this.date = new Date(response.data.data.billChargeDate * 1000)
            }
            if (this.$route.params.checkPayResult && response.data.data.isPaid === false) {
              this.attemptCheckPayResult()
            }

            this.$store.commit('charge/setBillData', response.data.data)
          }
        })
        .finally(() => {
          this.$loadingHide()
        })
    },
    hideAllWeixinButton() {
      wx.hideAllNonBaseMenuItem()
      wx.hideMenuItems({
        menuList: ["menuItem:copyUrl","menuItem:editTag","menuItem:delete","menuItem:originPage","menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari","menuItem:share:email","menuItem:share:brand","menuItem:share:qq","menuItem:share:QZone"]
      })
      wx.ready(function() {
        wx.hideAllNonBaseMenuItem()
        wx.hideMenuItems({
          menuList: ["menuItem:copyUrl","menuItem:editTag","menuItem:delete","menuItem:originPage","menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari","menuItem:share:email","menuItem:share:brand","menuItem:share:qq","menuItem:share:QZone"]
        })
      })
    },
    attemptCheckPayResult() {
      if (this.attemptCheckPayResultRemainingNumber-- > 0) {
        setTimeout(() => {
          this.fetchData(this.date, null, true)
        }, 1000)
      }
    },
  },
  beforeCreate() {
    storeModuleRegister(storeModule)
  },
  created() {
    this.date.setMonth(this.date.getMonth() - 1)
    this.datePickerMaxDate.setMonth(this.datePickerMaxDate.getMonth() - 1)

    // const dateString = getParamFromUrlAndRoute('date', this.$router)
    const templateId = getParamFromUrlAndRoute('template_id', this.$router)
    if (templateId) {
      this.isFromTemplate = true
      // const targetDate = new Date(templateId)
      // this.date = isValidDate(targetDate) ? targetDate : this.date
    }
    this.hideAllWeixinButton()
    this.fetchData(this.date, templateId)

    this.$store.dispatch('initJSSDK')
  },
};
</script>

<style scoped lang="less">
.charge-list {
  background-color: #F3F7F8;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-size: .16rem;

  .red {
    color: #f66;
  }

  .header {
    background-color: #fff;
    margin-bottom: 10px;
    flex-shrink: 0;

    .datepicker {
      border-bottom: 1px solid #F3F7F8;
    }

    .top-info {
      font-size: 0.14rem;
      color: #333;
      text-align: center;
      height: 0.4rem;
      line-height: 0.4rem;
    }
  }

  .body {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    background-color: #fff;

    &.center {
      justify-content: center;
      align-items: center;
    }
  }

  .footer {
    background-color: #fff;
    flex-shrink: 0;

    .tip {
      font-size: 0.14rem;
      color: #999;
      line-height: .3rem;
      text-align: center;

      &.red {
        color: #f66;
      }
    }

    .action {
      height: .4rem;
      line-height: .4rem;
      background: #3770fb;
      color: #fff;

      .right-border {
        height: .25rem;
        line-height: .25rem;
        border-right: 1px solid #fff;
      }

      .button {
        width: 100%;
        text-align: center;
        display: inline-block;

        &.red {
          background: #f66;
          color: #fff;
          height: .4rem;
        }
      }
    }
  }
}
</style>
