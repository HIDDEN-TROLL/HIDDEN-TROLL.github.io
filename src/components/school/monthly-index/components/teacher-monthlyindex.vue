<template>
    <div class="body">
        <div class="teacheruser" v-for="(item,index ) in teachermes" :key="index"  >
            <div class="mar_div">
                <div class="head"><img :src=item.avatar>
                </div>
                <div><div class="teachername">{{item.teacherName}}</div>
                    <div class="administration">
                        <div class="administration_title"><span>管理：</span></div>
                        <div class="administration_class">&nbsp;{{item.clsName}}</div>
                    </div>
                </div>
                <hr class="b_line">
                <div class="usetime">
                    <van-row type="flex" justify="space-between">
                        <van-col span="6"><p>本月使用平台  <span class="light">{{item.loginNum}}</span>   次</p></van-col>
                        <van-col span="6" class="check">
                            <p @click="jump(item.teacherId,date,item.teacherName)">查看详情</p>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { TeacherMonthindex } from '@/api/school/monthly-index'
    import { Row, Col } from 'vant';
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                teacher:[
                    {head: require('../../../../assets/img/monthlyindex/head.jpg'),name:'周老师',class:'第1班、 第2班、 第3班、 第4班、第1班、 第2班、 第3班、 第4班、第4班、',times:'126'},
                    {head: require('../../../../assets/img/monthlyindex/head.jpg'),name:'林老师',class:'第1班、 第2班、 第3班、',times:'121236'},],
                // date:'2019-04',

                date:this.$route.query.date,

                teachermes:{},
                teacherid:{},
            }
        },
        components: {
            [Row.name]:Row,
            [Col.name]:Col,
            //someComponent
        },
        methods:{
            teacherlist(){
                this.date=this.$route.query.date
                TeacherMonthindex(this.date).then(res => {
                    this.teachermes = res.data.data;
                    this.teacherid = res.data.data[2].teacherId;
                }).catch(() => {
                    throw new Error("异常!")
                })
            },

            jump(teacherId,date,teacherName){
                this.$router.push({ name:'MonthlyIndexBriefing',
                    query:{
                        uid:teacherId,
                        date:this.date,
                        teacherName:teacherName
                    }
                })
            },

        },
        created() {
            this.teacherlist()
        }
    }
</script>

<style scoped>
    .body{
        font-size: 62.5%;
        width: 100%;
        margin: 0.15rem 0 0.35rem 0 ;
        float: left;
        background-color:#F3F7F8 ;
    }
    .head{
        float: left;
        width: 0.5rem;
        height: 0.5rem;
    }
    .head img {
        float: left;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        font-size: 62.5%;
    }
    .teachername{
        margin-left: 0.65rem;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.25rem
    }
    .administration{
        /*float: left;*/
        margin-left: 0.65rem;
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.25rem
    }
    .administration_class{
        margin: 0 0.45rem 0 0.4rem;
    }
    .administration_title{
        float: left;
    }
    .b_line{
        margin: 0.15rem 0;
        width: 100%;
        border: solid 1px #EEEEEE;
    }
    .teacheruser{
        margin-top: 0.1rem;
        background-color: white;
        /*margin: 0 0.15rem;*/
        padding: 0.17rem 0.15rem;
    }
    .usetime{
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem
    }
    .van-col--6{
        width: 50%;
    }
    .check{
        text-align: right;
    }
    .light{
        color: #3770FB;
    }
</style>
