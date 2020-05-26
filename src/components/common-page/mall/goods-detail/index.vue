<template>
  <div>
  <div class="mall-goods-detail">
    <nav-bar
      class="header"
      title="详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"/>
    <div v-if="data" class="content">
      <div class="TopImg">
        <img :src="data.info.image">
      </div>

      <div class="intro">
        <p class="p1">
          <span class="title">{{ data.info.name }}</span>
          <span class="price">{{ data.info.payType }}</span>
        </p>
        <p class="p2">{{ data.info.describe }}</p>
      </div>
      <div v-html="data.info.introduce" class="desc"></div>
    </div>

    <div v-if="data" class="footer">
      <span v-if="data.purchased" class="purchased">已购买</span>
      <a v-else class="purchase" href="javascript:;" @click="purchase">选择套餐</a>
    </div>
    <!--选择套餐-->
  </div>
    <van-dialog
            v-model="Year"
            title="必填信息"
            show-cancel-button
            @confirm="comfirm()"
            style="border-radius:8px"
    >
        <div style="height: 0.15rem;"></div>
        <div style="font-weight: 700;font-size: 0.14rem">
        <div v-if="info.type == '1'" style="border-bottom: solid 1px #CCCCCC;padding: 0 0.15rem 0.15rem 0.15rem;">
          <div>购买套餐</div>
          <div @click="showValue" class="package_box">
            <a style="font-weight: 700">{{packageTitle}}<span v-if="isSchool === false">/{{price}}元</span></a>
            <van-icon name="play" style="transform: rotate(90deg);float:right;"/>
          </div>
        </div>
        <div v-if="info.type == '2'" style="border-bottom: solid 1px #CCCCCC;padding: 0.15rem;">
          <van-row>
            <van-col span="7">        <div >购买数量</div>
            </van-col>
            <van-col span="3">        <div class="reduce" @click="reduceNumber">-</div>
            </van-col>
            <van-col span="3">        <div style="text-align: center">{{number}}</div>
            </van-col>
            <van-col span="3">        <div class="add" @click="addNumber">+</div>
            </van-col>
          </van-row>
        </div>
        <div v-if="isSchool === false">
          <div class="pay_list">
            <div  class="pay_list_box">
              <div><a>机构名称:</a><input type="text" v-model="name"></div>
              <div><a>所在学校:</a><input type="text" v-model="schoolName"></div>
              <div><a>机构地址:</a><input type="text" v-model="address"></div>
            </div>
            <div class="pay_list_box">
              <div><a>手机号码:</a><input type='text'v-model="phone" onkeyup="this.value=this.value.replace(/[^0-9]+/,'' );" /></div>
              <div><a>微信账号:</a><input type="text" v-model="wechat"></div>
                <div style="font-size: 0.13rem;">
                  <div>
                    请确保手机号码跟微信账号填写无误
                  <br>
                    购买后等待工作人员与您取得联系
                  </div>
                </div>
            </div>
          </div>
          <div style="border-bottom: 1px solid rgb(204, 204, 204); padding: 0.15rem;text-align: center">
            <div style="margin-bottom: 0.1rem">是否使用过新师路教育系统？</div>
            <van-row>
              <van-col span="4"></van-col>
              <van-col span="3" >        <div :class=" isPay === 0 ? 'un_use' : 'use'" @click="changeIsPay(1)"></div></van-col>
              <van-col span="5">     未用过</van-col>
              <van-col span="3" >        <div :class=" isPay === 1 ? 'un_use' : 'use'" @click="changeIsPay(2)"></div></van-col>
              <van-col span="5">     使用过</van-col>
              <van-col span="4"></van-col>
            </van-row>
          </div>
        </div>
      </div>

    </van-dialog>

    <Actionsheet
            class="action-sheet"
            v-model="isGradeFilterShow"
            :actions="gradeFilterOptions"
            get-container="#app"
            cancel-text="取消"
            @select="onGradeFilterSelect"/>
  </div>

</template>

<script>
import { getdetailList,placeOrder } from '@/api/common/mall'
import { NavBar, Swipe, SwipeItem,Dialog,Row,Col,RadioGroup,Radio,Cell, CellGroup,Actionsheet,Icon  } from 'vant'
import wx from 'weixin-js-sdk'
import WeixinJSBridge from 'weixin-js-sdk'
import { getParamFromUrlAndRoute } from '@/utils'

export default {
  name: 'MallGoodsDetail',
  components: {
    NavBar,
    Actionsheet,
    vanSwipe: Swipe,
    vanIcon: Icon ,
    vanRow: Row,
    vanRadioGroup: RadioGroup,
    vanRadio: Radio,
    vanCell: Cell,
    vanCellGroup: CellGroup,
    vanCol: Col,
    vanSwipeItem: SwipeItem,
    Dialog : Dialog ,
    RadioGroup : RadioGroup ,
    Radio : Radio ,
  },
  data() {
    return {
      showC:false,
      Year:false,
      data: null,
      package:[],
      packageValueList:[],
      info:[],

      isPay:0,

      number:1,
      radio:1,
      name:'',
      schoolName:'',
      address:'',
      phone:'',
      wechat:'',
      value:'',

      isGradeFilterShow: false,
      gradeFilterIndex: 0,
      packageTitle:'',
      price:'',
      // 2020-04-23新增参数↓
      isSchool:'',
      billId:'',
      schoolId:'',
    }
  },
  created() {
    const data = {}

    const params = getParamFromUrlAndRoute('params', this.$router)
    const from = getParamFromUrlAndRoute('from', this.$router)
    if((from === "charge") && params){
      data.from = from
      data.params = params
    }

    let id = this.$route.params.id
    if (!id) {
      id = this.$route.query.id
      if (!id) {
        this.$toast('缺少参数')
        this.$router.replace({ name: 'CommonMallIndex' })
        return
      }
    }
    this.$loading()
    // 获取页面详情数据
    getdetailList( id ,data)
      .then(response => {
        if (response.data.meta.success) {
          this.data = response.data.data
          this.info = response.data.data.info

          // 2020-04-23新增参数↓
          this.isSchool  = response.data.data.isSchool
          this.billId  = response.data.data.billId
          this.schoolId  = response.data.data.schoolId
          // 2020-04-23新增参数↑

          this.packageValueList = response.data.data.info.package

          let packagelist = response.data.data.info.package

          if(response.data.data.info.package.length>0){
            this.packageTitle = this.packageValueList[0].title
            this.price = this.packageValueList[0].price
            this.value = this.packageValueList[0].value
          }

          for(let i =0 ; i < packagelist.length; i++){
             this.package.push(packagelist[i].title)}
           }
      })
      .finally(() => {
        this.$loadingHide()
      })
    this.$store.dispatch('initJSSDK')

  },
  computed: {
    // 选择套餐方案
    gradeFilterOptions() {
      return this.package.map((name, index) => {
        return {
          name,
          index,
          className: index === this.gradeFilterIndex ? 'active' : 'non-active',
        }
      })
    },
  },
  methods: {
    reduceNumber(){
      if(this.number >1){
        this.number -=1
      }
    },
    addNumber(){
        this.number +=1
    },
    showValue(){
      this.isGradeFilterShow = true
    },
    // 切换套餐
    onGradeFilterSelect(item) {
      this.isGradeFilterShow = false
      this.gradeFilterIndex = item.index

      this.value = this.packageValueList[item.index].value
      this.packageTitle = this.packageValueList[item.index].title
      this.price = this.packageValueList[item.index].price
    },
    // 切换是否使用
    changeIsPay(type){
      if(type === 1){
        this.isPay = 0
      }else if (type === 2){
        this.isPay = 1
      }
    },
    // 提交订单
    comfirm(){
      const data = {}
      if(this.data.info.type == 1){
        data.value = this.value
      }
      data.number = this.number
      data.id = this.$route.query.id ? this.$route.query.id : this.$route.params.id

     if(this.isSchool === true){
       data.billId = this.billId
       data.schoolId = this.schoolId
        this.sendList(data)
     }
     if(this.isSchool === false){
       data.name = this.name
       data.schoolName = this.schoolName
       data.address = this.address
       data.phone = this.phone
       data.wechat = this.wechat
       data.isPay = this.isPay

       if(
               ((data.name && data.schoolName && data.address && data.phone && data.wechat && data.isPay).length !== 0 )
       ){
        this.sendList(data)
       }else{
         this.$loading(null,null,true)
         let timer = setTimeout(()=>{
           this.$loadingHide()
           this.purchase()
           data.name.length === 0 ?  this.$toast("机构名称不能为空") : null
           data.schoolName.length === 0 ?  this.$toast("所在学校不能为空") : null
           data.address.length === 0 ?  this.$toast("机构地址不能为空") : null
           data.phone.length === 0 ?  this.$toast("手机号码不能为空") : null
           data.wechat.length === 0 ?  this.$toast("微信账号不能为空") : null
         },1000)
       }
     }
      console.log(data)
    },
      // 订单接口请求
    sendList(data){
      placeOrder( data )
              .then(response => {
                if (response.data.meta.success) {
                  this.chooseWxPay(response.data.data.config,response.data.data.recordId,response.data.data.order)
                }
              })
              .finally(() => {
                this.$loadingHide()
              })
    },
      // 微信支付
    chooseWxPay(data,recordId,order) {
      this.$loading(null,null,true)
      WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
                    "timeStamp":data.timestamp,
                    "nonceStr":data.nonceStr,
                    "package": data.package,
                    'signType': data.signType,
                    "paySign": data.paySign,
                    "appId": data.appId,
      },
      // 调用支付接口后回调跳转页面
        function(res){
          if(res.err_msg == "get_brand_wcpay_request:ok" ){
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              this.$router.push({
                name: 'LoadingStatus',
                params: {
                  order,
                  recordId
                },
              })
          }else{
            this.$router.push({
              name: 'LoadingStatus',
              params: {
                order,
                recordId
              },
            })
          }
        }
      )

      // if(order){
      //   this.$router.push({
      //     name: 'LoadingStatus',
      //     params: {
      //       order,
      //       recordId
      //     },
      //   })
      // }
    },
    purchase() {
      this.Year = true
    }
  },
  watch:{
    currentGradeFilterName() {
      return this.gradeList[this.gradeFilterIndex]
    },
  }
}
</script>

<style scoped lang="less">
.mall-goods-detail {
  font-size: .14rem;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header, .footer {
    flex-shrink: 0;
  }

  .content {
    flex-grow: 1;
    overflow: scroll;

    .thumbs {
      .thumbs-item {
        text-align: center;
        .thumbs-item-image {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
      }
    }

    .intro {
      border-bottom: 1px solid #eee;
      padding: 10px;
      .p1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        .title {
          font-size: 105%;
          font-weight: bold;
        }
        .price {
          color: #f66;
          flex-shrink: 0;
          margin-left: 8px;
        }
      }
      .p2 {
        font-size: 95%;
        color: #999;
      }
    }

    .desc {
      padding: 10px;
    }
  }

  .footer {
    .purchased, .purchase {
      font-size: 0.14rem;
      text-align: center;
      width: 100%;
      display: block;
      height: .4rem;
      line-height: .4rem;
    }
    .purchased {
      color: #999;
      background: #fff;
    }
    .purchase {
      color: #fff;
      background: #69f;

      &:active {
        opacity: .9;
      }

    }

  }
}
  .TopImg{
    width: 100%;
    height: 1.6rem;
  }.TopImg img{
    width: 100%;
    height: 100%
  }
  .reduce{
    margin: 0 auto;
    width: 0.2rem;
    height: 0.2rem;
    background: #69f;
    color: white;
    text-align: center;
    line-height: 0.2rem;
    border-radius: 84px;
  }
  .add{
    margin: 0 auto;
    width: 0.2rem;
    height: 0.2rem;
    background: #69f;
    color: white;
    text-align: center;
    line-height: 0.2rem;
    border-radius: 84px;
  }
  .pay_list div{
    margin-top: 0.12rem ;
  }.pay_list input{
       border: solid 1px;
       height: 0.24rem;
       margin-left: 0.05rem;
  }
  .pay_list_box{
    border-bottom: solid 1px #CCCCCC;padding: 0 0.15rem 0.15rem 0.15rem;
  }
  .use{
    margin: 0 auto;
    width: 0.15rem;
    height: 0.15rem;
    background: #fff;
    border: solid 2px #69f;
    color: white;
    text-align: center;
    line-height: 0.2rem;
    border-radius: 84px;
  }
  .un_use{
    margin: 0 auto;
    width: 0.15rem;
    height: 0.15rem;
    /*background: #fff;*/
    border: solid 2px #69f;
    color: white;
    text-align: center;
    line-height: 0.2rem;
    border-radius: 84px;
    background: #69f;
  }
.action-sheet {

  .active {
    color: #fff;
    background: #3770fb;
  }
}
  .package_box{
    border: solid 1px;
    padding: 0.1rem;
    margin-top: 0.1rem;
  }
  .pay_list_box a{
    width: 70%;
  }
    input{
      width: 45vw
    }
    /deep/.van-dialog__header {
        text-align: center;
        font-weight: 700;
        padding: 0;
        line-height: 0.5rem;
        background: #3770fb;
        color: white;
        border-bottom: 0
    }
    /deep/.van-dialog__cancel{
        border-right: solid 0.015rem #e3e3e3;
    }
    /deep/.van-dialog .van-button {
        line-height: 0.48rem;
        height: 0.48rem;
    }

</style>
