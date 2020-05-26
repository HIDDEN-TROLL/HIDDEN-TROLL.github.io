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

            <div class="list_mes" >
                <div style="margin-top: 0.15rem;">
                    <van-row>
                        <van-col span="12">
                            <div class="title_b_c">
                                <div  class="get_number"><strong>互动社区</strong></div>
                            </div>
                        </van-col>
                        <van-col span="12" style="text-align: right;color:#999999">
                            <span @click="Pushcommunity">进入社区></span>
                        </van-col>
                    </van-row>
                </div>
                <div v-if="community">
                    <div>
                        <div style="margin-top: 0.3rem;font-size: 0.14rem;padding-bottom: 0.2rem;">
                          <van-row>
                              <van-col span="12">已发送动态<span style="color: #D80000;">{{community.count}}</span>条</van-col>
                              <van-col span="12">获得{{community.likeParentNumber}}名家长点赞<span style="color: #D80000;">{{community.likeNumber}}</span>次</van-col>
                          </van-row>
                        </div>
                    </div>

                    <div style="padding: 0.2rem 0;color: #999999;border-top: solid 1px #EEEEEE;" :class="{lunc_T_list_hide:lunc_T_list_hide}">
                        <div style="margin-bottom:0.1rem " v-for="(item,index) in community.staffList" :key="index">
                            <van-row>
                                <van-col span="8"><span style="color: #666666;">{{item.name}}</span></van-col>
                                <van-col span="5"> <span>发送{{item.count}}条</span></van-col>
                                <van-col span="11"><span>获得{{item.likeParentNumber}}名家长点赞{{item.likeNumber}}次</span></van-col>
                            </van-row>
                        </div>
                    </div>

                    <div v-if="lunc_T_list_hide===true" class="bottom_hide" @click="noonHide">展开所有教师信息↓</div>

                    <div v-if="lunc_T_list_hide===false" class="bottom_hide" @click="noonHide">收起教师信息↑</div>
                </div>
            </div>

            <div class="ac_line"></div>


            <div class="list_mes" >
                <!--<div class="title">生日档案<span v-if="item.type==1" style="font-size:0.1rem ;margin-left: 0.1rem;"></span></div>-->
                <div style="margin-top: 0.15rem">
                    <van-row>
                        <van-col span="12">
                            <div class="title_b_c">
                                <div  class="get_number"><strong>生日档案</strong></div>
                            </div>
                        </van-col>
                        <van-col span="12" style="text-align: right;color:#999999">
                            查看详情>
                        </van-col>
                    </van-row>
                </div>

                <div style="margin:0.3rem 0 0.15rem 0;" v-if="birthday">
                    <van-row>
                        <van-col span="14">
                            <div style="margin-bottom: 0.1rem;"><strong>生日建档</strong></div>
                            <div>共完成{{birthday.recordStuCount}}/{{test.stuTotal}}名学生建档</div>
                        </van-col>
                        <van-col span="10">
                            <div style="margin-bottom: 0.1rem;"><strong>生日记录</strong></div>
                            <div>本月{{birthday.birthdayCount}}名学生生日</div>
                        </van-col>
                    </van-row>
                </div>
            </div>

            <div class="ac_line"></div>

            <div class="achievement_mod" >
                <div style="margin-top: 0.15rem">
                    <van-row>
                        <van-col span="12">
                            <div class="title_b_c">
                                <div  class="get_number"><strong >成绩档案</strong></div>
                            </div>
                        </van-col>
                        <van-col span="12" style="text-align: right;color:#999999">
                            <span @click="PushScore">查看详情></span>
                        </van-col>
                    </van-row>
                </div>

                <div v-if="score">
                    <div style="text-align: center;">
                        <div style="margin-top: 0.15rem;"> <strong>共{{test.stuTotal}}名学生</strong></div>
                        <div style="padding: 0.2rem 0 ;border-bottom: solid 1px #EEEEEE">
                            <van-row>
                                <van-col span="12">本月已录入{{score.entryCount}}名</van-col>
                                <van-col span="12">{{score.notEntryCount}}名学生成绩未录入</van-col>
                            </van-row>
                        </div>
                    </div>
                    <div style="margin-top: 0.15rem;color: #999999;border-top: 1px solid rgb(238, 238, 238);padding: 0.15rem 0;"  :class="{habit_T_list_hide:habit_T_list_hide}">
                        <div style="margin-bottom: 0.1rem" v-for="(item,index) in score.staffList" :key="index">
                            <van-row>
                                <van-col span="8" style="color: #666666;">{{item.name}}</van-col>
                                <van-col span="8">共{{item.stuCount}}名学生</van-col>
                                <van-col span="8" style="text-align: right">{{item.notEntryCount}}名学生未录入</van-col>
                            </van-row>
                        </div>
                    </div>

                    <div v-if="habit_T_list_hide===true" class="bottom_hide" @click="ScoreHide">展开所有教师信息↓</div>

                    <div v-if="habit_T_list_hide===false" class="bottom_hide" @click="ScoreHide">收起教师信息↑</div>

                </div>
            </div>

            <div class="ac_line"></div>

            <div class="class_mod" v-if="student">
                <div class="title_b_c">
                    <div  class="get_number"><strong>学生续班</strong></div>
                </div>

                <div style="text-align: center;">
                    <div style="margin-top: 0.25rem;font-size: 0.14rem;"><strong>本月共有<span style="color:#3770FB ">{{test.stuTotal}}</span>明学生</strong></div>
                    <div style="border-bottom: solid 1px #EEEEEE;padding: 0.15rem 0;">
                        <van-row>
                            <van-col span="8" style="text-align: left">新增<span style="color:#3770FB ">{{student.addNumber}}</span>名学生</van-col>
                            <van-col span="8">减少<span style="color:#3770FB ">{{student.outflowNumber}}</span>名学生</van-col>
                            <van-col span="8">净增<span style="color:#3770FB ">{{student.mountingNumber}}</span>名学生</van-col>
                        </van-row>
                    </div>
                </div>


                <div style="overflow:scroll;" :class="{showlist:showlist}">
                    <div >
                        <div style="color: #999999;border-bottom:dashed 1px #EEEEEE;float: left;width: 98%;" v-for="(item,index) in student.staffList" :key="index">
                            <van-row>
                                <van-col  span="8" style="line-height: 0.9rem;color: #666666;">{{item.name}}</van-col>
                                <van-col  span="8" style="line-height: 0.9rem;">管理<span style="color: #84C225;">{{item.stuNubmer}}</span>名学生</van-col>
                                <van-col  span="8" style="line-height: 0.2rem;margin: 0.15rem 0;">
                                    <div>新增<span  style="color: #84C225;">{{item.addNumber}}</span>名学生</div>
                                    <div>减少<span  style="color: #84C225;">{{item.outflowNumber}}</span>名学生</div>
                                    <div>净增学生数<span  style="color: #84C225;">{{item.mountingNumber}}</span></div>
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                </div>


                <div v-if="showlist===true" class="bottom_hide" @click="habitHide">展开所有教师信息↓</div>

                <div v-if="showlist===false" class="bottom_hide" @click="habitHide">收起教师信息↑</div>

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
    import { SOther } from '@/api/school/briefing';
    import { getParamFromUrlAndRoute } from '@/utils/index';
    import Footer from '../../common/footer-operate-btn'


    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                score:[],
                community:[],
                birthday:[],
                student:[],

                test:[],
                uSchId:'12',
                date:'2019-06-19',


                arr:[{title:'教师工作绩效排行榜',type:1}],

                from:'template',

                showlist:true,

                noon_T_list_hide:true,
                lunc_T_list_hide:true,
                habit_T_list_hide:true,




            }
        },
        components: {
            [NavBar.name]: NavBar,
            [Progress.name]: Progress,
            [Row.name]: Row,
            [Col.name]: Col,
            Footer:Footer,
            //someComponent
        },
        methods:{
            noonHide(){
                if(this.lunc_T_list_hide===false){
                    this.lunc_T_list_hide = true
                }else if(this.lunc_T_list_hide===true){
                    this.lunc_T_list_hide = false
                }
            },
            ScoreHide(){
                if(this.habit_T_list_hide===false){
                    this.habit_T_list_hide = true
                }else if(this.habit_T_list_hide===true){
                    this.habit_T_list_hide = false
                }
            },

            Pushcommunity(){
                this.$router.push({name:'Community'})
            },
            PushScore(){
                this.$router.push({name:'ScoreManage'})
            },
            habitHide(){
                if(this.showlist===false){
                    this.showlist = true
                }else if(this.showlist===true){
                    this.showlist = false
                }
            },
            parent(){
                this.$router.push({name:'TeacherRankingList'})
            },
            GetSOther(){

                const template_id = getParamFromUrlAndRoute('template_id', this.$router)


                if(this.$route.query.template_id)
                {
                    SOther(this.from,template_id)
                    .then(res => {
                        this.test = res.data.data;
                        this.student = res.data.data.student
                        this.community = res.data.data.community
                        this.birthday = res.data.data.birthday
                        this.score = res.data.data.score
                        // console.log(this.test)

                    }).catch(() => {
                    throw new Error("异常!")
                    })
                }else{
                    SOther()
                        .then(res => {
                            this.test = res.data.data;
                            this.student = res.data.data.student
                            this.community = res.data.data.community
                            this.birthday = res.data.data.birthday
                            this.score = res.data.data.score
                            // console.log(this.test)

                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }
            },
            onClickLeft(){
                this.$router.go(-1)
            }
        },
        mounted(){
           this.GetSOther()

        }
    }
</script>

<style scoped>
    .body{
        margin-bottom: 0.6rem;
        font-size: 0.12rem;
        color: #666666;
    }
    .van-nav-bar__title{
        font-size: 0.16rem;
    }
    .van-progress{
        height: 0.15rem;
    }
    .top_title{
        color:#84C225;
        font-size: 0.16rem;
        text-align: center;
        line-height: 0.48rem;
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
        /*border-bottom: solid 1px  #CCCCCC;*/
        /*padding-bottom: 0.35rem;*/
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
        border-bottom: solid 1px #CCCCCC;
    }
    .deadline{
        margin: 0 0.15rem;
    }

    .community_left{
        text-align: center;
    }
    .community_left span{
        font-size: 0.24rem;
        color:#0099FF;
    }
    .achievement_mod{
        padding-bottom: 0.1rem;
        /*border-bottom: solid 1px #CCCCCC;*/
        margin: 0 0.15rem;
    }
    .class_mod{
        margin:  0.15rem;
    }
    .class_stu_list{
        line-height: 0.2rem;
    }
    .class_border{
        border-bottom: solid 1px #CCCCCC;
        padding: 0.1rem 0;
    }
    .class_border_top{
        border-bottom: solid 1px #CCCCCC;
        padding-bottom: 0.1rem;
    }
    .ac_line{
        background-color:#F3F7F8;
        height: 0.1rem;
    }
    .title_b_c{
        border-left: solid 0.02rem #3770FB;
        padding-left: 0.1rem;
    }
    .get_number{
        color: #333333;
        font-size: 0.16rem;
    }
    .showlist{
        display: none;
    }
    .bottom_hide{
        text-align: center;
        line-height: 0.2rem;
        color: rgb(153, 153, 153);
        border-top: solid 1px #F1F1F1;
        padding:0.1rem 0;
    }
    .lunc_T_list_hide{
        display: none;
    }
    .habit_T_list_hide{
        display: none;
    }
</style>
