<template>
    <ul id="family" v-if="familyList.length>0">
        <li class="item"  v-for="(item,index) in familyList" :style="{width:liWidth,marginLeft:backGauge}" :key="index">
            <div class="avatar" :style="avatarW">
                <img src="@/assets/logo.png" alt="">
            </div>
            <p class="named" v-if="!type">{{item.name}}</p>
            <p class="named" v-if="type">{{item.isMe ? item.relation+'(我)':item.relation}}</p>
            <p class="heart"><van-icon name="like" /> <span>{{item.total}}</span></p>
        </li>
    </ul>
</template>

<script>
    import { Icon } from 'vant';

    export default {
        name: "family",
        props:{
            familyList:{
                type:Array
            },
            liWidth:{
                type:String,
                require:true
            },
            backGauge:{
                type:String,
                require:true
            },
            avatarW:{
                type:Object,
                require:true
            },
            type:{
                type:Boolean
            }
        },
        components: {
            [Icon.name]:Icon
        },
    }
</script>

<style scoped lang="less">
    #family{
        overflow: hidden;
        .item{
            float: left;
            /*width: 0.6rem;*/
            /*margin-left: 0.38rem;*/
            .avatar{
               /* width:0.51rem ;
                height: 0.51rem;*/
                margin:  0 auto;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .named{
                font-size: 0.14rem;
                color: #666;
                line-height: 0.2rem;
                text-align: center;
                margin-top:0.1rem ;
            }
            .heart{
                font-size: 0.14rem;
                color:#D80000 ;
                line-height: 0.2rem;
                margin-top: 0.1rem;
                text-align: center;
                span{
                    margin-left: 0.05rem;
                }
            }
        }
    }
</style>
