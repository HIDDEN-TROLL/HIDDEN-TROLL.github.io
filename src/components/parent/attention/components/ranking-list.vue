<template>
    <div id="ranking" v-if="rankingList && JSON.stringify(rankingList)!='{}'">
        <div style="padding: 0 0.16rem">
            <div class="summary" >
                <div class="children">
                    <div class="avatar">
                        <img src="@/assets/img/parents/index/banner2.png" alt="">
                    </div>
                    <span>我的孩子</span>
                </div>
                <div class="info">
                    <p class="number">排名：{{rankingList.info.rank}}</p>
                    <span v-if="rankingList.info.distanceToPreviousOne>0">超过上一名需{{rankingList.info.distanceToPreviousOne}}关注值</span>
                </div>
            </div>
        </div>
        <ul class="list" v-if="rankingList.list.length>0">
            <li class="item" v-for="(item, index) in rankingList.list" :key="index">
                <span class="num">{{index+1}}</span>
                <div class="avatar">
                    <img class="" src="@/assets/img/parents/index/banner2.png" alt="">
                </div>
                <span class="name">{{item.isMyChild ? '我的孩子':item.name}}</span>
               <!-- <span class="updown"><van-icon class-prefix="icon" :name="item.contrastType === 1 ? 'arrowsup' : item.contrastType === 2 ? 'arrowsdown' : ''" /></span>-->
                <span class="val">{{item.total}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Icon } from 'vant';
    export default {
        name: "rankling--list",
        props:{
            rankingList:{
                type:Object
            }
        },
        components: {
            [Icon.name]:Icon
        },
        data(){
            return {

            }
        },
        /*created(){
            console.log(this.rankingList)
            console.log(JSON.stringify(this.rankingList)!='{}')
        }*/
    }
</script>

<style scoped lang="less">
    @font14:0.14rem;
    @lineH:0.2rem;
    @color999:#999;
    @color666:#666;
    @colorfff:#fff;
    @bgfff:#fff;
    @bg:#F3F7F8;
  #ranking{
      .summary{
          padding: 0.24rem 0;
          border-bottom: 0.02rem solid #eee;
          box-sizing: border-box;
          overflow: hidden;
          .children{
              float: left;
              width: 1.36rem;
              height: 0.34rem;
              padding-left: 0.07rem;
              padding-right: 0.3rem;
              border-right: 0.02rem solid #f1f1f1;
              box-sizing: border-box;
              overflow: hidden;
              .avatar{
                  float: left;
                  width: 0.32rem;
                  height: 0.32rem;
                  img{
                      width: 100%;
                      height: 100%;
                      border-radius: 50%;
                  }
              }
              span{
                  font-size: @font14;
                  color: @color666;
                  line-height: 0.34rem;
                  margin-left: 0.09rem;
              }
          }
          .info{
              float: left;
              width: 2.06rem;
              padding-left: 0.37rem;
              height: 0.34rem;
              box-sizing: border-box;
              .number{
                  font-size: @font14;
                  color: @color666;
                  line-height: @lineH;
              }
              span{
                  font-size: 0.12rem;
                  color: @color999;
                  line-height: 0.17rem;
              }
          }
      }
      .list{
          padding: 0 0.16rem;
          box-sizing: border-box;
        .item{
            padding: 0.1rem 0;
            border-bottom: 0.02rem solid #eee;
            line-height: 0.32rem;
            overflow: hidden;
            .num{
                float:left;
                width: 0.39rem;
                font-size: 0.16rem;
                color: @color666;
                font-weight: 500;
                margin-left: 0.11rem;
            }
            .avatar{
                float:left;
                width:0.32rem ;
                height: 0.32rem;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .name{
                float:left;
                font-size: @font14;
                color: @color666;
                margin-left: 0.13rem;
            }
            .val{
                float:right;
                font-size: @font14;
                color: @color666;
                margin-right: 0.21rem;
            }
            .updown{
                float:right;
                font-size: 0.16rem;
                margin-right: 0.2rem;
            }
        }

      }
  }
</style>
