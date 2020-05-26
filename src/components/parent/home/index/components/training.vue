<template>
    <div v-if="!isEmpty(extra)" class="content">
        <p class="title">{{ title }}        <span class="title_right" @click="CheckTraining()">我的培训班</span>
        </p>
        <ul class="container" v-for="(item,index) in extra" :key="index">
            <li class="item"  >
                <p class="name" >表现：{{ item.discipline }}  {{item.number}}</p>
                <p class="name" v-if="item.comment.categorys.list">
                    {{item.comment.categorys.category}}：
                    {{item.comment.categorys.list[0]}}
                </p>
                <p class="name" >点评：
                    {{item.comment.content}}
                </p>

            </li>
        </ul>
    </div>
    <div v-else class="content">
        <p class="title">{{ title }}
        <span class="title_right" @click="CheckTraining()">我的培训班</span>
        </p>

        <p class="no_data">无数据</p>
    </div>

</template>

<script>
    export default {
        name: 'Attendance',
        props: {
            title: {
                default: '',
                type: String,
            },
            extra: {
                default: () => [],
                type: Array,
            },
        },
        methods:{
            CheckTraining(){
                this.$router.push({name:'ParentTraining'})
            }
        }
    }
</script>

<style scoped lang="less">
    .content {
        background-color: #fff;
        border-bottom: .1rem solid #F3F7F8;
        padding: .15rem 0;

        .title {
            font-weight: 600;
            color: #333;
            line-height: 0.22rem;
            position: relative;
            padding: 0 .07rem;
            font-size: .16rem;
            margin-left: .16rem;

            &:before {
                content: '';
                width: 0.02rem;
                height: 0.16rem;
                background-color: #3770FB;
                border-radius: 10px;
                position: absolute;
                left: 0;
                margin-top: 0.03rem;
            }
        }

        .container {
            border-bottom: solid 1px #dedede;
            margin: 0.15rem;
            display: flex;
            flex-wrap: nowrap;
            /*margin-top: .23rem;*/
            overflow: scroll;
            font-size: .14rem;
            .item {
                margin-right: .13rem;

                &:first-of-type {
                    padding-left: .1rem;
                }
                &:last-of-type {
                    padding-right: .1rem;
                }

                & > .name {
                    margin-bottom: .09rem;
                    /*text-align: center;*/
                    font-weight:500;
                    color:#333;
                    line-height:0.2rem;
                }

                & > .info {
                    box-shadow: 0.01rem 0.02rem  rgba(0,0,0,0.08);
                    border-radius:0.03rem;
                    border:0.01rem solid rgba(237,237,237,1);
                    padding: .1rem;
                    display: flex;
                    min-width: 35vw;
                    margin-bottom: .1rem;
                    .entry {
                        border-right: .02rem dashed #f1f1f1;
                    }
                    .entry, .exit {
                        width: 50%;
                        flex-grow: 1;

                        .name {
                            margin-bottom: .08rem;
                            font-weight:400;
                            color:#666;
                            line-height:0.2rem;
                            display: block;
                            text-align: center;
                        }
                        .time {
                            font-size:0.12rem;
                            font-weight:400;
                            color:#84C225;
                            line-height:0.17rem;
                            display: block;
                            text-align: center;
                        }
                    }
                }

            }
        }
    }
    .no_data {
        text-align: center;
    }
    .title_right{
        margin-right: 0.15rem;
        text-align: right;
        font-size: 0.12rem;
        color: rgb(25, 137, 250);
        float: right;
        font-weight: 400;
    }
</style>
