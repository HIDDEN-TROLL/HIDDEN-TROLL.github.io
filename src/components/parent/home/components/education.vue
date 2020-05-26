<template>
    <div id="education-list">
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <ul class="main">
                <li class="item" v-for="(item,index) in educationList" :key="index">
                    <div class="figure">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="content">
                        <p class="title">
                            <van-icon class-prefix="icon" name="attendance" />
                            <span>{{item.name}}</span>
                        </p>
                        <p class="desc">{{item.desc}}</p>
                    </div>
                </li>
            </ul>

        </van-list>
    </div>
</template>

<script>
    import { List , Icon} from 'vant';
    /*import { mapState } from 'vuex';*/
    import { getEducationPageData } from '@/api/parent/home'
    export default {
        name: "education-list",
        components:{
            [List.name]:List,
            [Icon.name]:Icon
        },
        data() {
            return {
                educationList:[],
                loading: false,
                finished: false
            }
        },
        methods:{
            onLoad(){
              //console.log(this.homeData)
              getEducationPageData()
                .then(res=>{
                  //console.log(res)
                  // 加载状态结束
                  this.loading = false;
                  if (res.status === 200){
                    this.educationList = res.data.data;
                  }
                  // 数据全部加载完成
                  this.finished = true;
                }).catch(()=>{
                throw new Error("异常！")
              })
            }
        },
      mounted(){
        //console.log(this.homeData)
      },
        created(){

        },
        computed:{
            /*...mapState([
                'homeData'
            ]),*/
          homeData() {
            return this.$store.getters["parentHome/getParentHomeEducationData"]
            //return this.$store.getters.getParentHomeEducationData
          }
        }
    }
</script>

<style scoped lang="less">
    #education-list{
        .main{
            padding: 0 0.16rem;
            box-sizing: border-box;
            background-color: #F3F7F8;
            .item{
                padding: 0.2rem 0 0.18rem 0;
                height: 1.09rem;
                box-sizing: border-box;
                border-bottom: 0.01rem solid #eee;
                overflow: hidden;
                .figure{
                    float: left;
                    width: 0.7rem;
                    height: 0.7rem;
                    img{
                        float: left;
                        width: 100%;
                        height: 100%;
                    }
                }
                .content{
                    float: left;
                    width: 2.61rem;
                    margin-left: 0.12rem;
                    .title{
                        font-size: 0.14rem;
                        color: #666;
                        font-weight: 400;
                        line-height: 0.2rem;
                        margin-bottom: 0.1rem;
                        span{
                            margin-left: 0.06rem;
                        }
                    }
                    .desc{
                        font-size: 0.14rem;
                        line-height: 0.2rem;
                        color: #999;
                    }
                }
            }
        }
    }
</style>
