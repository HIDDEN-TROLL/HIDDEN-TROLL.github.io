<template>
    <div v-if="ranke.rankList && JSON.stringify(ranke.rankList)!=='{}'">
        <div style="height:0.1rem;background-color: #F3F7F8;margin-top: 0.15rem;"></div>

        <div class="top_mes_div" v-if="ranke.stuInfo && JSON.stringify(ranke.stuInfo)!=='{}'">
            <div class="top_head_div">
                <img :src="ranke.stuInfo.avatar">
            </div>
            <div style="line-height: 0.35rem;">
                <div>{{ranke.stuInfo.stuName}}</div>
                <div >目前排名：第{{ranke.stuInfo.randNum}}名</div>
                <!--<br>-->
                <!--<span class="s_span">{{ranke.stuInfo.comment}}</span>-->
            </div>
        </div>

        <div style="height:0.1rem;background-color: #F3F7F8"  v-if="ranke.stuInfo && JSON.stringify(ranke.stuInfo)!=='{}'"></div>

        <div style="text-align:center">

            <div class="ranking_title" style="line-height: 0.45rem;border-bottom:solid 1px #F3F7F8">
                <van-row type="flex" justify="space-between">
                    <van-col span="4"><span>排名</span></van-col>
                    <van-col span="6"><span>学生</span></van-col>
                    <van-col span="6"><span>年级</span></van-col>
                    <van-col span="6"><span>总红花数</span></van-col>
                </van-row>
            </div>

            <div class="ranking_list_div"   v-for="(item,index) in searchData" :key="index">
                <van-row type="flex" justify="space-between" v-if="index < 10">
                    <van-col span="4">
                        <span style="font-size: 0.18rem;color: #6699CC" class="ranking_number" :class="item.randNum===1?'first-result':item.randNum===2?'secend-result':item.randNum===3?'third-result':''" v-if="item.stuName==='我'" >
                            {{item.randNum}}
                        </span>
                        <span style="font-size: 0.18rem;" class="ranking_number" :class="item.randNum===1?'first-result':item.randNum===2?'secend-result':item.randNum===3?'third-result':''" v-else>
                            {{item.randNum}}
                        </span>
                    </van-col>
                    <van-col span="6" >
                        <div class="ranking_list_head" @click="Ranking(item.stuId)">
                            <img :src=item.avatar >
                            <span v-if="item.name==='我'" style="color: #6699CC">{{item.stuName}}</span>
                            <span v-else>{{item.stuName}}</span>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <span>{{item.gradeName}}</span>
                    </van-col>
                    <van-col span="6">
                        <i class="icon-flower" style="color: red;font-size: 0.16rem"></i>
                        <span>{{item.safflowerNum}}</span>
                    </van-col>
                </van-row>
            </div>
            <div style="line-height: 0.35rem;font-size: 0.15rem;font-weight: 700;margin: 0.1rem 0;" @click="showMore === false ? showMore = true : showMore = false">{{ showMore === false ? '展开查阅全部学生' : '点击收起全部学生'}}</div>


            <div v-if="showMore">
                <div class="ranking_list_div"   v-for="(item,index2) in searchData" :key="index2 + '-label'">
                    <van-row type="flex" justify="space-between" v-if="index2 >= 10">
                        <van-col span="4">
                        <span style="font-size: 0.18rem;color: #6699CC" class="ranking_number" :class="item.randNum===1?'first-result':item.randNum===2?'secend-result':item.randNum===3?'third-result':''" v-if="item.stuName==='我'" >
                            {{item.randNum}}
                        </span>
                            <span style="font-size: 0.18rem;" class="ranking_number" :class="item.randNum===1?'first-result':item.randNum===2?'secend-result':item.randNum===3?'third-result':''" v-else>
                            {{item.randNum}}
                        </span>
                        </van-col>
                        <van-col span="6" >
                            <div class="ranking_list_head" @click="Ranking(item.stuId)">
                                <img :src=item.avatar >
                                <span v-if="item.name==='我'" style="color: #6699CC">{{item.stuName}}</span>
                                <span v-else>{{item.stuName}}</span>
                            </div>
                        </van-col>
                        <van-col span="6">
                            <span>{{item.gradeName}}</span>
                        </van-col>
                        <van-col span="6">
                            <i class="icon-flower" style="color: red;font-size: 0.16rem"></i>
                            <span>{{item.safflowerNum}}</span>
                        </van-col>
                    </van-row>
                </div>
            </div>


        </div>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { Row, Col } from 'vant';
    //import someComponent from './someComponent'
    export default {
        name: "",
        props:{
            ranke:
                {
                Object,
                }
            ,
            search:{}
        },
        data() {
            return {
                showMore:false
            }
        },
        components: {
            [Row.name]:Row,
            [Col.name]:Col
        },
        methods:{
            Ranking(id){
                this.$router.push({ name: 'SafflowerArchivesDetail',query:{id:id}})
            },
        },
        computed: {
            searchData: function() {
                var search = this.search;
                if (search) {
                    return this.ranke.rankList.filter(function(product) {
                        return Object.keys(product).some(function(key) {
                            return String(product[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.ranke.rankList;
            }
        },
        mounted(){
        },
    }
</script>

<style scoped lang="less">
    *{

        font-size: 62.5%;
    }
    span{
        font-size: 0.14rem;
    }
    .s_span{
        font-size: 0.12rem;
    }
    .top_mes_div{
        height: 0.7rem;
        width: 3rem;
        margin: 0 auto;
        padding: 0.1rem 0;
    }
    .top_head_div{
        padding: 0.075rem 0.2rem 0.075rem 0;
        width: 0.55rem;
        height: 0.55rem;
        float: left;
    }
    .top_head_div img {
        width: 100%;
        height: 100%;
        border-radius: 0.7rem;
    }

    .ranking_list_div{
        line-height: 0.45rem;
        border-bottom:solid 0.1px #F3F7F8;
    }
    /*//前三名排名颜色*/

    .ranking_list_div .ranking_number.first-result{
        color: #FF6600;
    }
    .ranking_list_div .ranking_number.secend-result{
        color: #FF9900;
    }
    .ranking_list_div .ranking_number.third-result{
        color:#FFCC00;
    }
    .ranking_list_head{
        overflow-x:scroll ;
        white-space: nowrap;
        color: #3770fb;
        &::-webkit-scrollbar{
            display: none;
        }
        img{
            width: 0.32rem;
            height: 0.32rem;
            border-radius: 0.7rem;
            float: left;
            margin: 0.05rem 0;
        }
    }
</style>
