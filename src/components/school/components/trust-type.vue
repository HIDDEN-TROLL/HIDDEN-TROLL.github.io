<template>
    <div class="trust-detail" v-if="trustList">
        <div class="outer-box">
            <ul class="content">
                <li class="item" :class="{active: item.id === currentId}" v-for="(item,index) in trustList" @click="attendanceType(item)" :key="index">
                    <span class="name">{{item.name}}</span>
                    <span class="times">{{item.time}}</span>
                </li>
              <li class="placeholder"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "trust--type",
        props:{
            trustList:{
                type:Array
            },
          currentId: {
              type: Number,
          },
        },
        methods:{
            attendanceType(item){
                this.$emit("attendanceType", item);
            }
        }
    }
</script>

<style scoped lang="less">
    .trust-detail{
        width: 100%;
        font-size: 0;
        background-color: #fff;
        overflow: hidden;
        .outer-box{
            min-width: 100vw;
            height: 0.7rem;
            overflow-x: scroll;

            .content{
              min-width: 100vw;
                overflow: scroll;
              display: flex;
              flex-wrap: nowrap;
                .item{
                    float: left;
                    width: 0.95rem;
                    height: 0.55rem;
                    border: 0.01rem solid #EDEDED;
                    border-radius: 0.03rem;
                    box-shadow:0 0.01rem 0.02rem 0 rgba(0,0,0,0.08);
                    padding: 0.07rem 0;
                    margin-left: 0.16rem;
                    box-sizing: border-box;
                  flex-shrink: 0;
                  &.active {
                    border: 0.01rem solid #3770fb;
                  }
                    span{
                        display: block;
                        text-align: center;
                        font-size: 0.14rem;
                        line-height: 0.2rem;
                    }
                    .name{
                        color: #666;
                    }
                    .times{
                        color: #84C225;
                    }
                }
              .placeholder {
                padding-left: .15rem;
              }
            }
        }
    }
</style>
