<template>
  <div id="flower-mall">
    <!--红花商城   教师端-->
    <div class="go-back">
      <van-nav-bar :fixed="true" title="红花商城" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="mall-content">
      <div class="gift-list" >
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <van-row gutter="16">
            <van-col span="12" v-for="(item,index) in prize" :key="index">
              <div class="prize-info">
                <div class="figure" v-for="(val,idx) in item.imgurl" :key="idx">
                  <img :src="val" alt="">
                </div>
                <span class="title info">【{{item.name}}】</span>
                <span class="conditions info">需要：{{item.worth}} 朵红花</span>
                <span class="inventory info">库存：{{item.stock}}/{{item.number}}</span>
              </div>
            </van-col>
          </van-row>

        </van-list>
        <!--<div class="prize-info">
          <div class="figure">
            <img src="../../../assets/img/parents/index/banner2.png" alt="">
          </div>
          <span class="title info">【吴川】</span>
          <span class="conditions info">需要：1 朵红花</span>
          <span class="inventory info">库存：51/81</span>
          <span class="viewRecord info"></span>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import { NavBar, Icon, Row, Col, List  } from "vant";
  import { flowerMall } from '@/api/parent/mall'
  export default {
    name: "flower-mall",
    components:{
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Row.name]:Row,
      [Col.name]:Col,
      [List.name]:List
    },
    data(){
      return{
        loading:false,
        finished:false,
        prize:[],
        page:0,
        middleA:[],
      }
    },
    methods:{
      onClickLeft() {
        this.$router.back(-1);
      },
      selectFlowerMall(){
        return new Promise((resolve, reject) =>{
          flowerMall()
            .then(res=>{
              // console.log(res);
              if (res.status === 200){
                resolve(res.data.data);
                //this.tdPrize = res.data.data;
              }else {
                reject('数据异常！')
              }
            }).catch(()=>{
              throw new Error("异常！")
            })
        })
      },
      onLoad(){
        if (this.prize.length === 0){
          this.selectFlowerMall().then(res=>{
            if (Array.isArray(res)){
              if (res.length<=8){
                this.loading = false;
                this.prize = res;
                this.finished = true;
              }else {
                this.middleA = res;
                let timer = setTimeout(()=>{
                  for (let i=0*(this.page); i<8*(this.page+1); i++){
                    if (res[i]){
                      this.prize.push(res[i])
                    }
                  }
                  this.loading = false;
                  if (this.prize.length >= res.length){
                    this.finished = true;
                  }
                  clearTimeout(timer)
                },1000);
              }
            }
          })
        }else {
          let timer = setTimeout(()=>{
            for (let i=0*(this.page); i<8*(this.page+1); i++){
              if (this.middleA[i]){
                this.prize.push(this.middleA[i])
              }
            }
            this.loading = false;
            if (this.prize.length >= this.middleA.length){
              this.finished = true;
            }
            clearTimeout(timer)
          },1000);
        }

        this.page = this.page + 1;
      },
    }
  }
</script>

<style scoped lang="less">
  #flower-mall{
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
        .right-text{
          .title{
            color: #fff;
          }
        }
      }
    }
    .mall-content{
      width: 100%;
      padding: 0.62rem 0.16rem 0;
      box-sizing: border-box;
      .gift-list{
        width: 100%;
        .prize-info{
          width: 100%;
          border: 1px solid #eee;
          border-radius: 0.05rem;
          margin-bottom: 0.16rem;
          box-sizing: border-box;
          .figure{
            width: 100%;
            height: 0.8rem;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .info{
            display: block;
            font-size: 0.12rem;
            color: #666;
            line-height: 0.2rem;
            text-align: center;
          }
          .viewRecord{
            color: #999;
            border-top: 1px solid #eee;
          }
        }
      }
    }
  }
</style>