<template>
  <div class="charge-list">
    <header class="header">
      <van-nav-bar
        :title="title"
        left-text="取消"
        left-arrow
        @click-left="$router.back()" />
    </header>


    <section v-if="isBillDataAvailable && order !== undefined" class="body">
      <p class="cell-group-title">订单详情</p>
      <van-cell-group>
        <van-cell title="商品名称" :value="order.title" />
        <van-cell title="订单编号" :value="order.orderSn" />
        <van-cell title="商家名称" :value="order.merchantName" title-class="no-grow" />
        <van-cell title="商品价格" :value="order.fee" value-class="fee" />
      </van-cell-group>

      <p class="cell-group-title"></p>
      <van-cell-group>
        <van-cell title="还需支付" :value="order.fee" value-class="fee" />
      </van-cell-group>

      <p class="cell-group-title">选择支付方式</p>
      <van-button class="wechat-pay-button" :loading="inPayment" loading-text="处理中..." @click="pay" >
        <van-icon name="wechat" color="#fff" />
        <span> 微信支付</span>
      </van-button>
    </section>
    <p v-else class="body center">无数据</p>


  </div>

</template>

<script>
import { NavBar, CellGroup, Cell, Button, Icon } from 'vant'
import { getOrder, confirmOrder } from '@/api/school/charge'
import wx from 'weixin-js-sdk'

export default {
  name: 'charge-list',
  components: {
    vanNavBar: NavBar,
    vanCellGroup: CellGroup,
    vanCell: Cell,
    vanButton: Button,
    vanIcon: Icon,
  },
  data() {
    return {
      order: undefined,
      inPayment: false
    };
  },
  computed: {
    title() {
      let title = '确认支付'
      if (this.order) {
        title = this.order.title
      }
      document.title = title
      return title
    },
    billData() {
      return this.$store.state.charge ? this.$store.state.charge.billData : undefined
    },
    isBillDataAvailable() {
      return this.billData !== undefined && this.billData.id > 0
    },


  },
  methods: {
    fetchData() {
      const billId = this.billData.id
      this.$loading('获取中...')
      getOrder(billId)
        .then(response => {
          if (response.data.meta.success) {
            this.order = response.data.data
          }
        })
        .catch(() => {
          this.$router.back()
        })
        .finally(() => { this.$loadingHide() })
    },
    pay() {
      const tid = this.order.tid

      this.inPayment = true
      confirmOrder(tid, this.order.sign, this.order.expired)
        .then(response => {
          if (response.data.meta.success) {
            return response.data.data
          } else {
            return undefined
          }
        })
        .then(this.chooseWxPay)
        .finally(() => { this.inPayment = false })
    },
    chooseWxPay(data) {
      if (data === undefined) {
        return
      }
      wx.chooseWXPay({
        ...data,
        success: res => {
          console.log(res)
          this.$toast('支付成功')
          this.$router.replace({
            name: 'Charge',
            params: {
              checkPayResult: 1
            }
          })
        },
        error: res => {
          this.$toast('支付失败')
          console.error(res)
          // alert(res)
        },
      })
    }
  },
  created() {
    if (!this.isBillDataAvailable) {
      this.$router.replace({ name: 'Charge' })
      return
    }

    this.fetchData()
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

  .header {
    background-color: #fff;
    flex-shrink: 0;
  }

  .body {
    &.center {
      text-align: center;
      margin: 1rem 0;
    }

    .cell-group-title {
      padding: 10px 15px;
      margin: 0;
      font-weight: 400;
      font-size: 14px;
      color: rgba(69,90,100,.6);
    }

    .no-grow {
      flex-grow: 0;
      flex-shrink: 0;
      min-width: 1rem;
    }

    .fee {
      color: #04be02;
      font-size: 120%;

      &::before {
        content: '￥';
      }
      &::after {
        content: '元';
      }
    }

    .wechat-pay-button {
      background: #51c332;
      color: #fff;
      margin: 0 auto;
      display: block;
      width: 80%;
      border-radius: .1rem;
      font-size: .18rem;
    }
  }

}
</style>
