<template>
    <div v-if="JSON.stringify(homeworkList)!='{}' && homeworkList.extra.length>0">
        <p class="grade">{{homeworkList.extra[active].grade}} <span @click="downMenuShow"><van-icon name="arrow-down" size="0.14rem" color="#3770FB"/></span></p>
        <div style="overflow: hidden;font-size: 0;height: 1.09rem;width: 3.6rem">
            <div id="homework">
                <ul class="list-content" :style="comWidth(homeworkList.extra[active].info.length)">
                    <li v-for="(item,index) in homeworkList.extra[active].info" class="item" :key="index">
                        <div class="diet-image">
                            <img class="" src="@/assets/logo.png">
                        </div>
                        <span class="title">{{item[0]}}</span>
                        <!--错题数量-->
                        <span v-if="item[1]" class="complete yes">{{item[1]}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <p class="wrong-num">{{homeworkList.extra[active].info2}}</p>

        <DownMenu  :actions="downOptions" v-on:getIndex="getChange"></DownMenu>
    </div>

</template>

<script>
    import { Icon } from 'vant';
    import DownMenu from '@/components/common/grade-List';
    export default{
        name:"wrong-topic",
        components: {
            [Icon.name]:Icon,
            DownMenu:DownMenu
        },
        props:{
            homeworkList:{
                type:Object
            }
        },
        data(){
            return{
                active:0
            }
        },
        methods:{
            getChange(item){
              this.active = item.type;
            },
            downMenuShow() {
              this.$store.commit("getShow");
              //console.log(this.$store)
            },
        },
        computed:{
          downOptions(){
            let options = [];
            let index = 0;
            for (let item of this.homeworkList.extra){
              options.push({
                name:item.grade,
                type:index
              });
              index = index + 1
            }
            return options;
          },
          comWidth(){
            return (len)=>{
              return {width:len*1.07+'rem'}
            }
          },

        }
    }
</script>

<style scoped lang="less">
    #homework{
        font-size: 0;
        height: 1.27rem;
        overflow-x:scroll;
        .list-content{
            /*width: 5.35rem;*/
            overflow: hidden;
            .item{
                float: left;
                width: 1.07rem;
                border-left: 0.01rem solid #f1f1f1;
                text-align: center;
                box-sizing: border-box;
                .diet-image{
                    width: 0.5rem;
                    height: 0.5rem;
                    margin:0 auto 0.11rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .title{
                    display: block;
                    font-size: 0.14rem;
                    line-height: 0.2rem;
                    color: #666;
                    text-align: center;
                    margin-bottom: 0.06rem;
                }
                .complete{
                    display: inline-block;
                    width: 0.6rem;
                    height: 0.22rem;
                    line-height: 0.22rem;
                    font-size: 0.12rem;
                    color: #fff;
                    border-radius: 1rem;
                    text-align: center;
                }
                .complete.yes{
                    background-color: #53ACF8;
                }
                .complete.no{
                    background-color: #C2DDF4;
                }
            }
            .item:first-child{
                border-left-width: 0;
            }
        }
    }
    .grade{
        text-align: center;
        margin-top: 0.14rem;
        font-size: 0.14rem;
        color: #3770fb;
        line-height: 0.2rem;
        margin-bottom: 0.27rem;
        .van-icon-arrow-down{
            position: relative;
            top: 0.02rem;
        }
    }
    .wrong-num{
        text-align: center;
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #666;
        margin-top: 0.28rem;
    }
</style>
