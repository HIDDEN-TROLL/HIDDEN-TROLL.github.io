<template>
    <div>
        <van-nav-bar
                :title="test.schoolName"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />


        <div  class="body">
            <div class="top_title">本月其他工作内容</div>

            <div class="ac_line"></div>

            <div v-if="test.community">
                <div style="margin: 0.15rem;">
                    <div class="title_b_c">
                        <div  class="get_number_se"><strong>互动社区</strong>
                            <span style="color: #999999;font-size: 0.12rem;" @click="PushCommunity">
                            去完成>
                            </span>
                        </div>
                    </div>
                    <div style="margin-left: 0.1rem;">
                        <div>
                            <van-row>
                                <van-col span="20">
                                    <div>发送1条动态得：{{test.community.integral}}分    <span style="margin-left: 0.1rem;">上限{{test.community.integralTotal}}分</span></div>
                                    <div>
                                        <div class="progress_div">
                                            <van-progress
                                                    :percentage="comunitypro"
                                                    :show-pivot=false
                                                    color="#3770FB"
                                            />
                                        </div>
                                    </div>
                                </van-col>
                                <!--<van-col span="3">&nbsp;</van-col>-->
                                <van-col span="4" style="text-align: center"><span style="font-size: 0.2rem;color: #D80000;line-height: 0.4rem;">+{{test.community.integralCount}}</span></van-col>
                            </van-row>
                        </div>
                        <div style="margin-top: 0.1rem;"  v-if="comunitypro>=100" >
                            <van-row>
                                <van-col span="9">本月已发送{{test.community.monthNumber}}条</van-col>
                                <van-col span="9">今日发送{{test.community.toDayNumber}}条</van-col>
                                <van-col span="2"> &nbsp;</van-col>
                                <van-col span="4" style="text-align: center;padding: 0.02rem 0.05rem;background-color: #D80000" class="finished_pro"><span >已获得</span></van-col>
                            </van-row>
                        </div>
                        <div style="margin-top: 0.1rem;"  v-else >
                            <van-row>
                                <van-col span="9">本月已发送{{test.community.monthNumber}}条</van-col>
                                <van-col span="9">今日发送{{test.community.toDayNumber}}条</van-col>
                                <van-col span="2">&nbsp;</van-col>
                                <van-col span="4" style="text-align: center;padding: 0.02rem 0.05rem;background-color: #84C225" class="finished_pro"><span >进行中</span></van-col>
                            </van-row>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ac_line"></div>

            <div v-if="test.score">
                <div style="margin: 0.15rem;">
                    <div class="title_b_c">
                        <div  class="get_number_se"><strong>成绩管理</strong>
                            <span style="color: #999999;font-size: 0.12rem;" @click="PushScore">去完成></span>
                        </div>
                    </div>
                    <div style="margin-left: 0.1rem;">
                        <div>
                            <van-row>
                                <van-col span="20">
                                    <div>每月录入1位学生1科成绩，得{{test.score.integral}}分</div>
                                    <div>
                                        <div class="progress_div">
                                            <!--<van-progress-->
                                                    <!--:percentage="30"-->
                                                    <!--:show-pivot=false-->
                                                    <!--color="#3770FB"-->
                                            <!--/>-->
                                        </div>
                                    </div>
                                </van-col>
                                <!--<van-col span="3">&nbsp;</van-col>-->
                                <van-col span="4" style="text-align: center"><span style="font-size: 0.2rem;color: #84C225;line-height: 0.4rem;">+{{test.score.integralCount}}</span></van-col>
                            </van-row>
                        </div>
                        <div style="margin-top: 0.1rem;">
                            <van-row>
                                <van-col span="9">本月已录入成绩{{test.score.monthNumber}}条</van-col>
                                <van-col span="9">今日录入{{test.score.toDayNumber}}条</van-col>
                                <van-col span="2">&nbsp;</van-col>
                                <van-col span="4" style="text-align: center;padding: 0.02rem 0.05rem;" class="finished_pro"><span >加分项</span></van-col>
                            </van-row>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ac_line"></div>

            <div v-if="test.birthday">
                <div style="margin: 0.15rem;">
                    <div class="title_b_c" style="float: left;width: 100%">
                        <div  class="get_number_se" style="float:left;"><strong>生日档案</strong></div>
                        <!--<div class="birth_q"><span>?</span></div>-->

                    </div>
                    <div class="mes_list">
                        <div style="margin-bottom: 0.1rem">生日建档</div>
                        <div>
                            <van-row>
                                <van-col span="20">
                                    <div>每为1位学生的生日日期进行建档：+{{test.birthday.record.integral}}分</div>
                                    <div>
                                        <div class="progress_div">
                                            <van-progress
                                                    :percentage="birthrecord"
                                                    :show-pivot=false
                                                    color="#3770FB"
                                            />
                                        </div>
                                    </div>
                                </van-col>
                                <!--<van-col span="3">&nbsp;</van-col>-->
                                <van-col span="4" style="text-align: center"><span style="font-size: 0.2rem;color: #84C225;line-height: 0.4rem;">+{{test.birthday.record.stuComplete}}</span></van-col>
                            </van-row>
                        </div>
                        <div style="margin-top: 0.1rem;"   v-if="birthrecord===100">
                            <van-row>
                                <van-col span="9">共{{test.stuTotal}}位学生</van-col>
                                <van-col span="9">已记录{{test.birthday.record.stuComplete}}位学生</van-col>
                                <van-col span="2">&nbsp;</van-col>
                                <van-col span="4" style="text-align: center;padding: 0.02rem 0.05rem;background-color: #84C225" class="finished_pro"><span >已完成</span></van-col>
                            </van-row>
                        </div>
                        <div style="margin-top: 0.1rem;"  v-else>
                            <van-row>
                                <van-col span="9">共{{test.stuTotal}}位学生</van-col>
                                <van-col span="9">已记录{{test.birthday.record.stuComplete}}位学生</van-col>
                                <van-col span="2">&nbsp;</van-col>
                                <van-col span="4" style="text-align: center;padding: 0.02rem 0.05rem;background-color: #999999" class="finished_pro"><span >未完成</span></van-col>
                            </van-row>
                        </div>
                    </div>

                    <div class="mes_list" style="margin-top: 0.1rem;">
                        <div style="margin-bottom: 0.1rem">生日祝福</div>
                        <div>
                            <van-row>
                                <van-col span="20">
                                    <div>每为1位学生记录生日：+{{test.birthday.blessing.integral}}分</div>
                                    <div>
                                        <div class="progress_div">
                                            <van-progress
                                                    :percentage="birthblessing"
                                                    :show-pivot=false
                                                    color="#3770FB"
                                            />
                                        </div>
                                    </div>
                                </van-col>
                                <!--<van-col span="3">&nbsp;</van-col>-->
                                <van-col span="4" style="text-align: center"><span style="font-size: 0.2rem;color: #D80000;line-height: 0.4rem;">+{{test.birthday.blessing.integralCount}}</span></van-col>
                            </van-row>
                        </div>
                        <div style="margin-top: 0.1rem;">
                            <van-row>
                                <van-col span="9">共{{test.birthday.blessing.stuTotal}}位学生</van-col>
                                <van-col span="9">已记录{{test.birthday.blessing.stuComplete}}位学生</van-col>
                                <van-col span="2">&nbsp; </van-col>
                                <van-col span="4" style="text-align: center;padding: 0.02rem 0.05rem;background-color: #D80000"  class="finished_pro"><span>已获得</span></van-col>
                            </van-row>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ac_line"></div>

            <div style="margin: 0.15rem;" v-if="test.student">
                <div class="title_b_c">
                    <div  class="get_number_se"><strong>学生学班情况 </strong></div>
                </div>
                <div style="margin-left: 0.1rem">
                    <div style="margin-bottom: 0.15rem;margin-top: 0.05rem;">校区本月共有{{test.stuTotal}}名学生</div>
                    <div >
                        <van-row>
                            <van-col span="12">截至2019年5月28日</van-col>
                            <van-col span="12">
                                <div style="margin-bottom: 0.1rem;">您管理{{test.student.stuNubmer}}名学生</div>
                                <div style="margin-bottom: 0.1rem;">期间流失{{test.student.outflowNumber}}名学生</div>
                                <div style="margin-bottom: 0.1rem;">新增{{test.student.addNumber}}名学生</div>
                                <div style="margin-bottom: 0.1rem;">净增学生数{{test.student.mountingNumber}}</div>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </div>



        </div>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import { Progress } from 'vant';
    import { Row, Col } from 'vant';
    import { OtherWork } from '@/api/teacher/briefing';
    import { getParamFromUrlAndRoute } from '@/utils'


    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                test:[],
                comunitypro:'',
                birthblessing:'',
                birthrecord:'',
                list:[
                    {project:'午休/用餐',title:'互动社区',finished:'+6',type: '1',fact:'1',add:'1',progress:'已获得',progresslist:100},
                ],
                score:[
                    {project:'午休/用餐',title:'互动社区',finished:'+6',type: '1',fact:'1',add:'1',progress:'进行中',progresslist:10},
                ],
                record: { title:'生日建档',finished:'100',type: '1',fact:'1',add:'1',progress:'进行中',progresslist:23},
                blessing: { title:'生日祝福',finished:'12',type: '1',fact:'1',add:'12',progress:'进行中',progresslist:56},

                arr:[{title:'工作成就值排行榜',type:1}],
                staffId:'1',
                date:'2019-6-29',

                from:'template',

            }
        },
        components: {
            [NavBar.name]: NavBar,
            [Progress.name]: Progress,
            [Row.name]: Row,
            [Col.name]: Col,
            //someComponent
        },
        methods:{

            onClickLeft(){
                this.$router.go(-1)
            },
            PushCommunity(){
              this.$router.push({name:'TeacherCommunityIndex'})
            },
            PushScore(){
              this.$router.push({name:'ScoreManage'})
            },
            // 获取数据
            GetOtherWork(){
                const template_id = getParamFromUrlAndRoute('template_id', this.$router)

                if(this.$route.query.template_id)
                {
                    OtherWork(this.from,template_id)
                    .then(res => {
                        this.test = res.data.data;
                        // this.SafflowerBarChart = res.data.data.safflower.barChart;
                        console.log(this.test)
                        this.checkpro()
                        this.birthprose()
                        this.birthpro()
                    }).catch(() => {
                    throw new Error("异常!")
                    })
                }else{
                    OtherWork()
                        .then(res => {
                            this.test = res.data.data;
                            // this.SafflowerBarChart = res.data.data.safflower.barChart;
                            console.log(this.test)
                            this.checkpro()
                            this.birthprose()
                            this.birthpro()
                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }
            },

            // 进度条上限与数值处理
            checkpro(){
                var allp=this.test.community.integralTotal
                var allg=this.test.community.integralCount
                var pronumber = (allg)/(allp)*100
                this.comunitypro=pronumber
            },
            birthprose(){
                var pronumber = 2
                var allp=this.test.birthday.blessing.stuTotal
                var allg=this.test.birthday.blessing.stuComplete
                if(allp===0){
                     pronumber =0
                }else{
                     pronumber = (allg)/(allp)*100
                }
                this.birthblessing = pronumber
            },
            birthpro(){
                var pronumber = 2
                var allp=this.test.stuTotal
                var allg=this.test.birthday.record.stuComplete
                var Proportion=this.test.birthday.record.integral
                if(allp===0){
                     pronumber =0
                }else{
                     pronumber = (allg*Proportion)/(allp)*100
                }
                this.birthrecord = pronumber
            },

        },
        mounted(){
           this.GetOtherWork()
        }
    }
</script>

<style scoped>
    .body{
        margin-bottom: 0.4rem;
        font-size: 0.12rem;
        color: #666666;
    }

    .van-progress{
        height: 0.1rem;
    }
    .top_title{
        color:#84C225;
        font-size: 0.16rem;
        text-align: center;
        line-height: 0.5rem;
    }
    .noon hr{
        margin: 0 ;
        float: left;
        height: 0.35rem;
        width: 1px;
        background: #CCCCCC;
        border: none;
    }
    .top_mes{
        text-align: center;
    }
    .birth_top_mes{
        float: left;
        text-align: center;
    }

    .font_big{
        font-size: 0.28rem;
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
    .birth_list_mes{
        float: left;
        border-bottom: solid 1px  #CCCCCC;
        /*padding-bottom: 0.35rem;*/
        margin: 0 0.15rem
    }
    .progress_div{
        width: 2.7rem;
        float:left;
        padding-top: 0.15rem;
        margin-right: 0.1rem;
    }
    .birth_progress_div{
        width: 2.55rem;
        float:left;
        padding-top: 0.15rem;
        padding-left: 0.15rem;
        margin-right: 0.1rem;
    }
    .progress_number{
        width: 0.6rem;
        background: #0099FF;
        float: left;
        line-height: 0.2rem;
        color: white;
    }
    .student_mes_div{
        margin: 0 0.15rem;
        border-bottom: solid 1px #CCCCCC;;
    }
    .deadline{
        margin: 0 0.15rem;
    }
    .ac_line{
        height: 0.1rem;
        background-color:#F3F7F8 ;
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
        padding:0.02rem 0.1rem ;
        border-radius:3px
    }
    .unfinished_pro{
        background-color: #999999;
        color: white;
        padding:0.02rem 0.05rem ;
        border-radius:3px
    }
    .ac_line{
        background-color: #F3F7F8;
        height: 0.1rem;
    }
    .mes_list{
        padding-bottom: 0.15rem;
        border-bottom: solid 1px #EEEEEE;
        margin-left: 0.1rem;
    }
    .birth_q{
        margin-left: 3rem;
        width: 0.16rem;
        height: 0.16rem;
        background: #3770FB;
        border-radius: 89px;
        text-align: center;
        font-size: 0.13rem;
        line-height: 0.16rem;
        color: white;
    }
</style>
