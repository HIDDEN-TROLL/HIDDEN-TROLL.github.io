<template>
    <div id="icon-title">
        <p class="theme">
            <icon class="icons" :name="iconClass" />
            <span class="text">{{content}}</span>
        </p>

    </div>
</template>

<script>
import icon from '@/components/common/icon'
    export default {
        name: "icon-title",
      components: {
        icon,
      },
        props:{
            iconClass:{
                type:String,
                require:true
            },
            content:{
                type:String,
                require:true
            },
            // iconColor:{
            //     type:String,
            //     require:false
            // }
        },
        data(){
            return{

            }
        }

    }
</script>

<style scoped lang="less">
    #icon-title{
        display: inline-block;
        margin-bottom: 0.15rem;
        .theme{
            line-height: 0.22rem;
            .icons{
                font-size: 0.2rem;
                position: relative;
                top: 1px;
            }
            .text{
                font-size: 0.16rem;
                font-weight: 500;
                margin-left: 0.08rem;
                color: #333;
            }
        }
    }
</style>
