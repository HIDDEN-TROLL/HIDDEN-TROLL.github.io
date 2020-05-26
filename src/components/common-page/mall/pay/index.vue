<template>
  <div class="mall-confirm-before-pay">
    <header class="header">
      <van-nav-bar
        :title="$route.meta.title"
        left-text="取消"
        left-arrow
        @click-left="$router.back()" />
    </header>

    <section v-if="order" class="body">
      <p class="cell-group-title">订单详情</p>
      <van-card
        :title="order.title"
        :desc="order.intro"
        :price="order.price"
        :thumb="order.thumb"
        currency=""
        class="card"
      />

      <p class="cell-group-title"></p>
      <van-cell-group>
        <van-cell title="还需支付" :value="order.price" value-class="fee" />
      </van-cell-group>

      <p class="cell-group-title">选择支付方式</p>
      <van-button class="wechat-pay-button" :loading="inPayment" loading-text="处理中..." @click="pay" >
        <van-icon name="wechat" color="#fff" />
        <span> 微信支付</span>
      </van-button>
    </section>

  </div>

</template>

<script>
import { NavBar, CellGroup, Cell, Button, Icon, Card } from 'vant'
import { getGoodsOrder, confirmGoodsOrder } from '@/api/common/mall'
import wx from 'weixin-js-sdk'

export default {
  name: 'mall-confirm-before-pay',
  components: {
    vanNavBar: NavBar,
    vanCellGroup: CellGroup,
    vanCell: Cell,
    vanButton: Button,
    vanIcon: Icon,
    vanCard: Card,
  },
  data() {
    return {
      goodsId: null,
      order: null,
      inPayment: false
    };
  },
  methods: {
    routeBack() {
      window.history.length > 1 ? this.$router.back() : this.$router.replace({ name: 'CommonMallIndex' })
    },
    fetchData() {
      this.$loading('获取中...')
      getGoodsOrder(this.goodsId)
        .then(response => {
          if (response.data.meta.success) {
            this.order = response.data.data
          } else {
            const message = response.data.meta.message
            this.$dialog({ message }).then(this.routeBack)
          }
        })
        .catch(this.routeBack)
        .finally(() => { this.$loadingHide() })
    },
    pay() {
      this.inPayment = true
      confirmGoodsOrder(this.goodsId)
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
      const { timestamp, nonceStr, signType, paySign } = data

      wx.chooseWXPay({
        timestamp,
        nonceStr,
        package: data.package,
        signType,
        paySign,
        success: res => {
          console.log(res)
          this.$toast('支付成功')
          this.routeBack()
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
    let id = this.$route.params.id
    if (!id) {
      this.$toast('缺少参数')
      this.routeBack()
      return
    }

    this.goodsId = id
    this.fetchData()
    this.$store.dispatch('initJSSDK')
  },
};
</script>

<style scoped lang="less">
.mall-confirm-before-pay {
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

    .card {
      font-size: .14rem;
    }

    .no-grow {
      flex-grow: 0;
      flex-shrink: 0;
      min-width: 1rem;
    }

    .fee {
      color: #04be02;
      font-size: 120%;
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
