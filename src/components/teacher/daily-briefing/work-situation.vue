<template>
    <div>
        <van-nav-bar
                title="今日工作进度"
        />
    <div  class="body">


            <!--<div class="rule_div">-->
                <!--<div class="rule_top"><strong>?</strong></div>-->
                <!--<div class="rule_down">积分规则</div>-->
            <!--</div>-->

            <div class="other_get" @click="jump">其他得分></div>

        <div class="top" v-if="test">
            <div class="top_get_mes">本月共<span class="top_get_number">{{test.achievement}}</span>分</div>
            <div style="text-align: center">
                <span class="get_number">{{test.todayAchievement}}</span><span style="font-size: 0.14rem;color:#D80000 ">分</span>
                <br>
                <span style="font-size: 0.14rem;color: #666666;">今日绩效分已得</span>
            </div>

            <div  class="noon">
                <div style="width: 5.45rem;" >
                    <div style="width: 1.6rem;float: left;margin-right: 0.15rem;" v-for="(item,index) in attentTime" :key="index">
                        <div style="text-align: center">
                            <div class="noon_title"><strong>{{item.name}}</strong></div>
                        </div>
                        <div class="noon_bor">
                            <van-row>
                                <van-col span="11"><span>未签到</span><br><span style="color: #84C225;">{{item.inNotNumber}}</span></van-col>
                                <van-col span="1"><hr></van-col>
                                <van-col span="11"><span>未签离</span><br><span style="color: #84C225;">{{item.outNotNumber}}</span></van-col>
                            </van-row>

                            <div class="progress" >
                                <van-progress
                                        :percentage="item.inNotNumber/
                                        (item.inNotNumber+item.outNotNumber)*100"
                                        :show-pivot=false
                                        color="#84C225"

                                />
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
            <div  style="margin: 0.15rem 0;" v-if="test.attend">
                <van-row>
                    <van-col span="18">监督所有学生完成考勤签到可得：+{{test.attend.integral}}分</van-col>
                    <van-col span="2" style="text-align: center;color:#D80000 ;" >+{{test.attend.attendNumber}}</van-col>
                    <van-col span="4" style="text-align: center"  class="finished_pro" v-if="test.attend.attendIsFulfil===1"><span>已完成</span></van-col>
                    <van-col span="4" style="text-align: center;background-color: #D80000"  v-if="test.attend.attendIsFulfil===0" class="finished_pro" ><span>进行中</span></van-col>
                </van-row>
            </div>

        </div>

        <div class="ac_line"></div>

        <div style="margin: 0.15rem;" v-if="test.siestaDining">
            <div class="title_b_c">
                <div  class="get_number_se"><strong>午休用餐</strong></div>
            </div>
            <div style="margin-left: 0.1rem;">
            <div>
                <van-row>
                    <van-col span="20">
                        <div>每天每完成1位学生的午休/用餐：+{{test.siestaDining.integral}}分</div>
                        <div>
                            <div class="progress_div">
                                <van-progress
                                :percentage="lunchpro"
                                :show-pivot=false
                                color="#3770FB"
                                />
                            </div>
                        </div>
                    </van-col>
                    <!--<van-col span="3">&nbsp;</van-col>-->
                    <van-col span="4" style="text-align: center"><span style="font-size: 0.2rem;color: #84C225;line-height: 0.4rem;">+{{test.siestaDining.stuComplete}}</span></van-col>
                </van-row>
            </div>
            <div style="margin-top: 0.1rem;">
                <van-row>
                    <van-col span="7">应完成:{{test.stuTotal}}人</van-col>
                    <van-col span="7">实际完成:{{test.siestaDining.stuComplete}}人</van-col>
                    <van-col span="6">{{lunchun}}人未完成</van-col>
                    <van-col span="4" style="text-align: center" class="finished_pro"><span >{{test.siestaDining.percentage}}</span></van-col>
                </van-row>
            </div>
            </div>
        </div>

        <div class="ac_line"></div>

        <div style="margin: 0.15rem;" v-if="test.work">
            <div class="title_b_c">
                <div  class="get_number_se"><strong>作业管理</strong></div>
            </div>
            <div style="margin-left: 0.1rem;">
                <div>
                    <van-row>
                        <van-col span="20">
                            <div>每天每完成1位学生的作业点评：+{{test.work.integral}}分</div>
                            <div>
                                <div class="progress_div">
                                    <van-progress
                                            :percentage="workpro"
                                            :show-pivot=false
                                            color="#3770FB"
                                    />
                                </div>
                            </div>
                        </van-col>
                        <!--<van-col span="3">&nbsp;</van-col>-->
                        <van-col span="4" style="text-align: center"><span style="font-size: 0.2rem;color: #84C225;line-height: 0.4rem;">+{{test.work.stuComplete}}</span></van-col>
                    </van-row>
                </div>
                <div style="margin-top: 0.1rem;">
                    <van-row>
                        <van-col span="7">应完成:{{test.stuTotal}}人</van-col>
                        <van-col span="7">实际完成:{{test.work.stuComplete}}人</van-col>
                        <van-col span="6">{{homeworkun}}人未完成</van-col>
                        <van-col span="4" style="text-align: center" class="finished_pro"><span >{{test.work.percentage}}</span></van-col>
                    </van-row>
                </div>
            </div>
        </div>

        <div class="ac_line"></div>

        <div style="margin: 0.15rem;" v-if="test.safflower">
            <div class="title_b_c">
                <div  class="get_number_se"><strong>习惯点评</strong>
                    <span style="color: #999999;font-size: 0.12rem;" @click="PushHabit">去完成></span>
                </div>
            </div>
            <div style="margin-left: 0.1rem;">
                <div>
                    <van-row>
                        <van-col span="20">
                            <div>每天每完成1位学生的习惯表现点评：+{{test.safflower.integral}}分</div>
                            <div>
                                <div class="progress_div">
                                    <van-progress
                                            :percentage="safflowerpro"
                                            :show-pivot=false
                                            color="#3770FB"
                                    />
                                </div>
                            </div>
                        </van-col>
                        <!--<van-col span="3">&nbsp;</van-col>-->
                        <van-col span="4" style="text-align: center"><span style="font-size: 0.2rem;color: #84C225;line-height: 0.4rem;">+{{test.safflower.stuComplete}}</span></van-col>
                    </van-row>
                </div>
                <div style="margin-top: 0.1rem;">
                    <van-row>
                        <van-col span="7">应完成:{{test.stuTotal}}人</van-col>
                        <van-col span="7">已完成:{{test.safflower.stuComplete}}人</van-col>
                        <van-col span="6">&nbsp;</van-col>
                        <!--<van-col span="4" style="text-align: center" class="unfinished_pro"><span >未完成</span></van-col>-->
                        <van-col span="4" style="text-align: center" class="finished_pro"><span >{{test.safflower.percentage}}</span></van-col>
                        <!--<van-col span="4" style="text-align: center"><span class="finished_pro">99%</span></van-col>-->
                    </van-row>
                </div>
            </div>
        </div>


    </div>

        <Footer :event-arr="arr" v-on:commenEvent="parent"></Footer>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import { Progress } from 'vant';
    import { Row, Col } from 'vant';
    import Footer from '../../common/footer-operate-btn'
    import { WorkSituation } from '@/api/teacher/briefing';
    import { getParamFromUrlAndRoute } from '@/utils'

    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                test:[],
                attentTime:[],
                lunchun:'',
                lunchpro:'',
                homeworkun:'',
                workpro:'',
                safflowerpro:'',

                arr:[{title:'工作成就值排行榜',type:1}],

                from:'template',

                stuTotal:''

            }
        },
        components: {
            Footer:Footer,
            [NavBar.name]: NavBar,
            [Progress.name]: Progress,
            [Row.name]: Row,
            [Col.name]: Col,
            //someComponent
        },
        methods:{
            PushHabit(){
                this.$router.push({name:'EvaluationIndex'})
            },
            jump(){
                this.$router.push({name:'OtherWork'})
            },
            parent(){
                this.$router.push({name:'TeacherAchievement'})
            },
            Listpro(){
                console.log(this.stuTotal)
            },
            GetWorkSituation(){

                const template_id = getParamFromUrlAndRoute('template_id', this.$router)

                if(this.$route.query.template_id)
                {
                    WorkSituation(this.from,template_id)
                        .then(res => {
                            this.test = res.data.data;
                            this.stuTotal = res.data.data.stuTotal
                            this.attentTime = res.data.data.attend.attentTime
                            // this.SafflowerBarChart = res.data.data.safflower.barChart;
                            this.lunch()
                            this.homework()
                            this.lunchProgress()
                            this.workProgress()
                            this.safflowerProgress()

                            this.Listpro()
                            // console.log(this.test)

                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }else{
                    WorkSituation()
                        .then(res => {
                            this.test = res.data.data;
                            this.stuTotal = res.data.data.stuTotal
                            this.attentTime = res.data.data.attend.attentTime
                            // this.SafflowerBarChart = res.data.data.safflower.barChart;
                            this.lunch()
                            this.homework()
                            this.lunchProgress()
                            this.workProgress()
                            this.safflowerProgress()

                            this.Listpro()
                            // console.log(this.test)

                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }

            },
            lunch(){
                let all = this.test.stuTotal
                let finished = this.test.siestaDining.stuComplete
                let lunch = all-finished
                this.lunchun = lunch
            } ,
            homework(){
                let all = this.test.stuTotal
                let finished = this.test.work.stuComplete
                let unwork = all-finished
                this.homeworkun = unwork
            },
            lunchProgress(){
                let pronumber = 2
                let allp=this.test.stuTotal
                let allg=this.test.siestaDining.stuComplete
                if(allp===0){
                    pronumber = 0
                }else{
                    pronumber = (allg)/(allp)*100
                }
                this.lunchpro = pronumber
            },
            workProgress(){
                let pronumber = 2
                let allp=this.test.stuTotal
                let allg=this.test.work.stuComplete
                if(allp===0){
                    pronumber = 0
                }else{
                    pronumber = (allg)/(allp)*100
                }
                this.workpro = pronumber
            },
            safflowerProgress(){
                let pronumber = 2
                let allp=this.test.stuTotal
                let allg=this.test.safflower.stuComplete
                if(allp===0){
                    pronumber = 0
                }else{
                    pronumber = (allg)/(allp)*100
                }
                this.safflowerpro = pronumber
            },
        },
        mounted(){
            this.GetWorkSituation()
        }
    }
</script>

<style scoped>
   .body{
       margin-bottom: 1rem;
        font-size: 0.12rem;
    }
    .top_get_mes{
        text-align: center;
        margin: 0.25rem 0 0.1rem 0;
    }
    .top_get_number{
        font-size: 0.16rem;
        color: #D80000;
    }
    .other_get{
        position: absolute;
        right: 0.2rem;
        top: 1.4rem;
        color: #999999;
    }
    .rule_div{
        position: absolute;
        right: 0.1rem;
        top: 0.75rem;
     }
    .rule_top{
        line-height: 0.16rem;
        width: 0.16rem;
        height: 0.16rem;
        border-radius: 0.8rem;
        background: #0099FF;
        text-align: center;
        color: white;
        margin-right: 0.05rem;
        float:left
    }
    .rule_down{
        color: #0099FF;
        width: 0.9rem;
    }
    .progress{
        margin-top:10px;
        padding:0 0.15rem ;
    }
    .van-progress{
        border-radius:2px;
        height: 0.1rem;
    }
    .unsign{
        float: left;
    }
    .noon{
        overflow-x: scroll;/* 定义超出此盒子滚动 */
        overflow-y: scroll;
        margin-top: 0.15rem;
    }
    .noon_title{
        margin: 0.15rem 0;
        font-size: 0.16rem;
        color:  #333333
    }
    .noon hr{
        margin:0 0.04rem ;
        float: left;
        height: 0.35rem;
        width: 1px;
        background: #F1F1F1;
        border: none;
    }
    .top_mes{
        text-align: center;
    }
    .finished{
        color: white;
        background: #D80000;
        padding: 0.02rem 0.05rem;
    }
    .unfinished{
        background: #00CCFF;
        padding: 0.02rem 0.05rem;
    }
    .font_big{
        /*font-size: 0.28rem;*/
    }
    .get_number{
        color: #D80000;
        font-size: 0.28rem;
    }
    .top{
        margin:  0 0.15rem;
    }
    .title{
        color: #0099FF;
        font-size: 0.16rem;
        line-height: 0.35rem;
    }
    .finished_mes{
        margin: 0.1rem 0;
    }
    .list_mes{
        border-bottom: solid 1px  #CCCCCC;
        padding-bottom: 0.35rem;
        margin: 0 0.15rem
    }
    .progress_div{
        width: 96%;
        float:left;
        padding-top: 0.1rem;
        margin-right: 0.1rem;
    }
    .progress_number{
        width: 0.6rem;
        background: #0099FF;
        float: left;
        line-height: 0.2rem;
        color: white;
    }
    .noon_bor{
        box-shadow:0px 1px 2px 0px rgba(0,0,0,0.08);
        border-radius:3px;
        border:1px solid rgba(237,237,237,1);
        text-align: center;
        padding:0.1rem 0 ;
    }
   .title_b_c{
       border-left: solid 0.02rem #3770FB;
       padding-left: 0.1rem;
       margin-bottom: 0.1rem;
   }
   .get_number_se{
       color: #333333;
       font-size: 0.16rem;
   }
    .finished_pro{
        background-color: #84C225;
        color: white;
        /*padding:0.02rem 0.1rem ;*/
        border-radius:3px;
        line-height: 0.2rem;
    }
   .unfinished_pro{
        background-color: #999999;
        color: white;
        padding:0.02rem 0.05rem ;
        border-radius:3px;
        line-height: 0.2rem;
    }
    .ac_line{
        background-color: #F3F7F8;
        height: 0.1rem;
    }
</style>
