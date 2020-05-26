<template>
  <div id="prize-management">
    <!--校长端  奖品管理-->
    <div class="go-back">
      <van-nav-bar :fixed="true" title="管理奖品" left-text="商城管理" left-arrow @click-left="onClickLeft" />
    </div>
    <p class="instructions">点击奖品进行修改删除管理</p>
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
              <div class="prize-info" @click="modifyGify(item.mallId)">
                <div class="figure" v-for="(val,idx) in item.imgurl" :key="idx">
                  <img class="image" :src="val" alt="" />
                </div>
                <span class="title info">【{{item.name}}】</span>
                <span class="conditions info">需要：{{item.worth}} 朵红花</span>
                <span class="inventory info">库存：{{item.stock}}/{{item.number}}</span>
              </div>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
  import { NavBar, Icon, Row, Col, List  } from "vant";
  import FooterBtn from '../../common/footer-operate-btn'
  import { flowerMall } from '@/api/school/safflower'
  export default {
    name: "prize-management",
    components:{
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Row.name]:Row,
      [Col.name]:Col,
      [List.name]:List,
      FooterBtn:FooterBtn
    },
    data(){
      return{
        loading:false,
        finished:false,
        prize:[],
        middleA:[],
        page:0,
        btnText:[
          {
            type:1,
            title:'上传新品'
          }
        ]
      }
    },
    methods:{
      onClickLeft(){
        this.$router.push({name:'SafflowerFlowerMall'})
      },
      operateBtn(){
        this.$router.push({name:'SafflowerAddGift'})
      },
      selectFlowerMall(){
        return new Promise((resolve, reject) =>{
          flowerMall()
            .then(res=>{
              if (res.status === 200){
                resolve(res.data.data);
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
          this.selectFlowerMall().then(response=>{
            if (Array.isArray(response)){
              let res = response.map(item=>{
                item.imgurl = typeof item.imgurl === 'string' ? JSON.parse(item.imgurl) : item.imgurl;
                return item;
              });
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
            for (let i=8*(this.page); i<8*(this.page+1); i++){
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
      modifyGify(id){
        this.$router.push({name:'SafflowerModifyGift',params:{id:id}})
      }
    }
  }
</script>

<style scoped lang="less">
#prize-management{
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
  .instructions{
    width: 100%;
    font-size: 0.12rem;
    color: #333;
    margin-top: 0.5rem;
    text-align: center;
  }
  .mall-content{
    width: 100%;
    padding: 0.16rem 0.16rem 0;
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
        .inventory{
          border-top: 1px solid #eee;
        }
      }
    }
  }
}
.image {
  object-fit: cover;
}
</style>
