<template>
  <div id="ticket-record">
    <!--校长  与  教师 共用 兑奖记录-->
    <div class="go-back">
      <van-nav-bar :fixed="true" :title="title" left-text="返回" right-text="筛选时间" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    </div>
    <div class="content">
      <p class="goods-name" v-if="productName">{{productName}}</p>
      <div class="record-list">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
        <div class="w-box">
            <div class="items" v-for="(item,index) in record" :key="index">
            <span class="top-b">
              <i class="crile"></i>
              <span class="time" :class="{active:index===0}">{{item.fsaf_created_at}}</span>
            </span>
              <div class="detail">
                <div class="info">
                  <div class="awator">
                    <img src="../../../assets/img/parents/index/banner2.png" alt="">
                  </div>
                  <div class="student">
                    <span class="name">{{item.ustu_name}}</span>
                    <span class="grade">{{item.ustu_grade}}</span>
                  </div>
                  <div class="number">
                    <span class="num">{{item.amount}}个</span>
                  </div>
                </div>
                <p class="desc">
                  使用{{item.fsafm_saf_number}}朵小红花兑奖{{item.fsafm_name}}
                  <span style="float:right;" @click="revokeExchangeFun(item.id)">撤销兑换</span>
                </p>
              </div>
            </div>
        </div>
        </van-list>
      </div>
    </div>
    <!--时间选择框-->
    <van-dialog
        v-model="timeShow"
        title="标题"
        show-cancel-button
        :before-close="confirmRequest"
    >
      <van-field
          v-model="startTime"
          label="开始时间"
          placeholder="请选择开始时间"
          readonly
          @click="beginTime"
      />
      <van-field
          v-model="endTime"
          placeholder="请选择结束时间"
          label="结束时间"
          readonly
          @click="endableTime"
      />
    </van-dialog>
    <!--时间选择上拉菜单-->
    <van-actionsheet v-model="menu" :close-on-click-overlay="false">
      <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          @cancel="closeTime"
          @confirm="confirmTime"
      />
    </van-actionsheet>

    <van-dialog
            v-model="Remove"
            title=""
            show-cancel-button
            @confirm="RemoveExchange()"
    >
          <div style="font-weight: 700;text-align: center;line-height: 0.5rem">确定撤销兑换？</div>
    </van-dialog>
  </div>
</template>

<script>
  import { NavBar, Icon, Row, Col, List, Field, Toast, Actionsheet, DatetimePicker } from "vant";
  import { exchangeRecord } from '@/api/school/safflower'
  import { revokeExchange } from '@/api/school/safflower'
  export default {
    name: "ticket-record",
    components:{
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Row.name]:Row,
      [Col.name]:Col,
      [List.name]:List,
      [Field.name]:Field,
      [Toast.name]:Toast,
      [Actionsheet.name]:Actionsheet,
      [DatetimePicker.name]:DatetimePicker
    },
    data(){
      return{
        loading:false,
        finished:false,
        timeShow:false,//时间选择框
        menu:false,//上拉菜单
        title:"全部兑换记录",
        currentDate: new Date(),
        minDate:new Date(2015,0,1),
        record:[],
        middleR:[],
        id:0,//查询 某个商品兑换记录 0 查询所有
        productName:'',//是否是查询单个奖品兑换记录
        timeType:null,//选择时间类型
        startTime:'',
        endTime:'',
        page:0,
        RemoveId:0,
        Remove:false
      }
    },
    methods:{
      RemoveExchange(){
        this.$loading();
        revokeExchange(this.RemoveId)
                .then(res=>{
                  this.$loadingHide();
                  if (res.status === 200){
                    Toast.success('撤销成功')
                    this.record = [];
                    this.middleR = [];
                    this.onLoad()
                  }else {
                    Toast.fail('撤销失败')
                  }
                }).catch(()=>{
          throw new Error("撤销异常！")
        })
      },
      revokeExchangeFun(id){
        this.RemoveId = id
        this.Remove = true
      },
      onClickLeft(){
        this.$router.back(-1)
      },
      onClickRight(){
       // if (this.record.length>0){
          this.startTime = '';
          this.endTime = '';
          this.timeShow = true;
        /*}else {
          Toast("没有可查询的数据")
        }*/

      },
      beginTime(){
        this.timeType = 1;
        this.menu = true;
      },
      endableTime(){
        this.timeType = 2;
        this.menu = true;
      },
      confirmTime(value){
        const Y = value.getFullYear();
        const M = value.getMonth()+1;
        const D = value.getDate();
        if (this.timeType === 1)
          this.startTime = `${Y}-${M}-${D}`;
        else if (this.timeType === 2)
          this.endTime = `${Y}-${M}-${D}`;
        this.menu = false;
        this.timeType = null;
      },
      closeTime(){
        this.menu = false;
        this.timeType = null;
      },
      confirmRequest(action, done){
        if (action === 'confirm'){
          if (!this.startTime){
            Toast('请选择开始时间');
            done(false)
          }
          else if (!this.endTime){
            Toast('请选择结束时间');
            done(false)
          }
          else{
            this.record = [];
            this.middleR = [];
            this.onLoad();
            done()
          }
        }else {
          done()
        }
      },
      selectRecord(){
        return new Promise((resolve, reject) => {
          exchangeRecord(this.id,this.startTime,this.endTime)
            .then(res=>{
              if (res.status === 200){
                resolve(res.data.data)
              }else {
                reject("数据异常")
              }
            }).catch(()=>{
              throw new Error("异常！")
            })
        });

      },
      onLoad(){
        if (this.record.length === 0){
          this.selectRecord().then(res=>{
            if (Array.isArray(res)){
              if (res.length<=6){
                this.loading = false;
                this.record = res;
                this.finished = true;
              }else {
                this.middleR = res;
                let timer = setTimeout(()=>{
                  for (let i=0*(this.page); i<8*(this.page+1); i++){
                    if (res[i]){
                      this.record.push(res[i])
                    }
                  }
                  this.loading = false;
                  if (this.record.length >= res.length){
                    this.finished = true;
                  }
                  clearTimeout(timer)
                },1000);
              }
            }
          });
        }else {
          let timer = setTimeout(()=>{
            for (let i=0*(this.page); i<8*(this.page+1); i++){
              if (this.middleR[i]){
                this.record.push(this.middleR[i])
              }
            }
            this.loading = false;
            if (this.record.length >= this.middleR.length){
              this.finished = true;
            }
            clearTimeout(timer)
          },1000);
        }
        this.page = this.page + 1
      }
    },
    created(){
      //todo 初始进入页面接收一个对象 {id:id,name:name} 商品id 与商品name 如果不存在查询所有
      if (this.$route.params.id){
        this.title = '奖品兑换记录';
        this.id = this.$route.params.id;
        this.productName = this.$route.params.name;
      }
    }
  }
</script>

<style scoped lang="less">
#ticket-record{
  font-size: 0.12rem;
  background-color: #fff;
  .go-back {
    .van-nav-bar {
      background-color: #3770fb;
      .van-icon {
        font-size: 0.22rem;
        color: #fff;
      }
      .van-nav-bar__text {
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: #fff;
        font-weight: 400;
      }
      .van-nav-bar__title {
        color: #fff;
        font-weight: 400;
      }
    }
  }
  .content{
    padding-top: 0.46rem;
    background-color: #F3F7F8;
    .goods-name{
      font-size: 0.14rem;
      color: #333;
      text-align: center;
      line-height: 0.22rem;
      background-color: #fff;
    }
    .record-list{
      width: 100%;
      padding:0 0.16rem 0.16rem;
      margin-top: 0.1rem;
      background-color: #fff;
      box-sizing: border-box;
        .w-box{
          width: 100%;
          border-left: 1px solid #cacaca;
          box-sizing: border-box;
          .items{
            width: 100%;
            padding: 0.08rem 0;
            .top-b{
              display: block;
              position: relative;
              font-size: 0.12rem;
              color: #666;
              margin-bottom: 0.1rem;
              .crile{
                display: inline-block;
                width: 0.1rem;
                height: 0.1rem;
                border-radius: 50%;
                border: 1px solid #cacaca;
                position: absolute;
                top: 0.04rem;
                left: -0.07rem;
                background-color: #fff;
              }
              .time{
                line-height: 0.2rem;
                padding-left: 0.12rem;
              }
              .time.active{
                color: #3770fb;
              }
            }
            .detail{
              width: 100%;
              padding-left: 0.2rem;
              box-sizing: border-box;
              .info{
                width: 100%;
                height: 0.44rem;
                overflow: hidden;
                .awator{
                  float: left;
                  width: 0.42rem;
                  height: 0.42rem;
                  border-radius: 50%;
                  overflow: hidden;
                  img{
                    width: 100%;
                    height: 100%;
                  }
                }
                .student{
                  float: left;
                  margin-left: 0.05rem;
                  .name,.grade{
                    display: block;
                    font-size: 0.14rem;
                    color: #666;
                    line-height: 0.22rem;
                  }
                }
                .number{
                  float: right;
                  width: 0.4rem;
                  height: 100%;
                  position: relative;
                  .num{
                    font-size: 0.14rem;
                    color: #666;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-right: 0.1rem;
                  }
                }
              }
              .desc{
                margin-top: 0.1rem;
                font-size: 0.12rem;
                color: #666;
              }
            }
          }
        }
    }
  }
  .van-dialog{
    top: 40%;
  }
}
</style>
