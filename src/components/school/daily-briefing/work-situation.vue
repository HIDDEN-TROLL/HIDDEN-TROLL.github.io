<template>
    <div>
        <van-nav-bar
                :title="school.schoolName"
        />
    <div  class="body">


        <div class="top_get_mes"><span class="top_get_number" >每日简报</span></div>
        <div class="other_get" @click="jump">其他工作内容></div>
        <div class="ac_line"></div>

        <div style="color:#999999" class="top">
            <div class="title_b_c">
                <span class="get_number"><strong>今日考勤</strong></span>
            </div>

            <div  class="noon">
                <!--<van-row>-->
                    <!--<van-col span="11">-->
                <div style="overflow: scroll" v-if="attend.attentTime">
                    <div style="width:7rem">
                        <div class="today_box" v-for="(item,index) in attend.attentTime" :key="index">

                                <div style="margin-bottom: 0.25rem;">
                                    <div style="text-align: center">

                                        <div class="noon_title"><strong>{{item.name}}</strong></div>
                                    </div>
                                    <div class="today_bor">
                                            <van-row >
                                                <van-col span="9"><span>未签到</span><br><span style="line-height: 0.2rem;color: #84C225">{{item.inNotNumber}}</span></van-col>
                                                <van-col span="4"><hr style="margin: 0 0.1rem;background: #F1F1F1"></van-col>
                                                <van-col span="9"><span>未签离</span><br><span style="line-height: 0.2rem;color: #84C225">{{item.outNotNumber}}</span></van-col>
                                            </van-row>
                                        <div class="progress">
                                            <van-progress
                                                    :percentage="item.inNotNumber/
                                                    (item.inNotNumber+item.outNotNumber)*100"
                                                    :show-pivot=false
                                                    color="#84C225"
                                            />
                                        </div>
                                        <div style="margin-top: 0.1rem;color: #999999;font-size: 0.1rem;" @click="CheckMore">查看详情>>></div>
                                    </div>
                                </div>

                                <div  class="noon_T_list"  :class="{noon_T_list_hide:noon_T_list_hide}">
                                    <div >
                                        <div style="margin-bottom: 0.1rem;float:left;width: 1.6rem;" v-for="(itemse,index) in item.staffList" :key="index">
                                            <div class="teacher_name">{{itemse.name}}</div>
                                            <van-col span="12">共{{itemse.stuTotal}}名学生</van-col>
                                            <span><span style="color: #3770FB;">{{itemse.inNotNumber}}</span>名未签到</span>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>

                <div v-if="noon_T_list_hide===true" class="bottom_hide" @click="teacherlist">展开所有教师信息↓</div>

                <div v-if="noon_T_list_hide===false" class="bottom_hide" @click="teacherlist">收起教师信息↑</div>
            </div>
    </div>

        <div class="ac_line"></div>

        <div class="lunch_mod" v-if="siestaDining">
            <div class="title_b_c">
                <div  class="get_number"><strong>午休用餐</strong></div>
            </div>
            <div style="margin-top: 0.3rem">
                <van-row>
                    <van-col span="6">
                        <div class="noonmod_lunch" v-if="siestaDining.siesta">
                            <div class="lunch_mod_title">
                                <div style="text-align: center;font-size: 0.14rem;color:#333333"><strong>午休情况</strong></div>
                                <div style="margin: 0.1rem 0;"><span style="color:#3770FB ">{{siestaDining.siesta.stuComplete}}/{{school.stuTotal}}</span>名学生</div>
                                <div >
                                    <van-progress
                                            :percentage="this.siestaPro"
                                            :show-pivot=false
                                            color="#3770FB"
                                    />
                                </div>
                            </div>
                            
                            <div style="overflow:scroll;" :class="{lunc_T_list_hide:lunc_T_list_hide}">
                                <div v-if="siestaDining.siesta">
                                    <div style="margin-bottom: 0.1rem;float:left;" v-for="(item,index) in siestaDining.siesta.staffList" :key="index">
                                        <div style="margin-bottom: 0.05rem">{{item.name}}</div>
                                        <span style="color: #84C225">{{item.stuComplete}}/{{item.stuCount}}</span><span>名学生</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-col>

                    <van-col span="2"><hr></van-col>

                    <van-col span="6">
                        <div class="noonmod_lunch" v-if="siestaDining.lunch">
                            <div class="lunch_mod_title">
                                <div style="text-align: center;font-size: 0.14rem;color:#333333"><strong>午餐情况</strong></div>
                                <div style="margin: 0.1rem 0;"><span style="color:#3770FB ">{{siestaDining.lunch.stuComplete}}/{{school.stuTotal}}</span>名学生</div>
                                <div >
                                    <van-progress
                                            :percentage="this.lunchPro"
                                            :show-pivot=false
                                            color="#3770FB"
                                    />
                                </div>
                            </div>
                            <div style="overflow:scroll;" :class="{lunc_T_list_hide:lunc_T_list_hide}">
                                <div v-if="siestaDining.lunch">
                                    <div style="margin-bottom: 0.1rem;float:left;" v-for="(item,index) in siestaDining.lunch.staffList" :key="index">
                                        <div style="margin-bottom: 0.05rem">{{item.name}}</div>
                                        <span style="color: #84C225">{{item.stuComplete}}/{{item.stuCount}}</span><span>名学生</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-col>

                    <van-col span="2"><hr></van-col>

                    <van-col span="6">
                        <div class="noonmod_lunch" v-if="siestaDining.dinner">
                            <div class="lunch_mod_title">
                                <div style="text-align: center;font-size: 0.14rem;color:#333333"><strong>晚餐情况</strong></div>
                                <div style="margin: 0.1rem 0;"><span style="color:#3770FB ">{{siestaDining.dinner.stuComplete}}/{{school.stuTotal}}</span>名学生</div>
                                <div >
                                    <van-progress
                                            :percentage="this.dinnerPro"
                                            :show-pivot=false
                                            color="#3770FB"
                                    />
                                </div>
                            </div>
                            <div style="overflow:scroll;" :class="{lunc_T_list_hide:lunc_T_list_hide}">
                                <div  v-if="siestaDining.dinner">
                                    <div style="margin-bottom: 0.1rem;float:left;" v-for="(item,index) in siestaDining.dinner.staffList" :key="index">
                                        <div style="margin-bottom: 0.05rem">{{item.name}}</div>
                                        <span style="color: #84C225">{{item.stuComplete}}/{{item.stuCount}}</span><span>名学生</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
            <div v-if="lunc_T_list_hide===true" class="bottom_hide" @click="noonHide">展开所有教师信息↓</div>

            <div v-if="lunc_T_list_hide===false" class="bottom_hide" @click="noonHide">收起教师信息↑</div>
        </div>

        <div class="ac_line"></div>

        <div class="homework_mod" v-if="work">
            <div class="title_b_c">
                <div  class="get_number"><strong>作业管理</strong></div>
            </div>
            <div style="padding: 0 0.1rem;">
                <div  class="noon">
                    <van-row>
                        <van-col span="11">
                            <div style="margin-bottom: 0.25rem;">
                                <div v-if="work.fulfilStus">
                                    <div class="noon_title" style="text-align: center"><strong>完成作业</strong></div>
                                    <div><span style="color: #3770FB">{{work.fulfilStus.stuComplete}}/{{school.stuTotal}}</span>名学生完成作业</div>
                                </div>
                                <div class="progress">
                                    <van-progress
                                            :percentage="this.homeworkPro"
                                            :show-pivot=false
                                            color="#3770FB"
                                    />
                                </div>
                                <div style="text-align: right;line-height: 0.4rem;color:#999999;font-size:0.1rem;">查看详情</div>
                            </div>

                            <div style="overflow:scroll;" :class="{work_T_list_hide:work_T_list_hide}">
                                <div v-if="work.fulfilStus">
                                    <div style="margin-bottom: 0.1rem;color: #999999;float:left;width: 1.5rem;margin-right: 0.15rem;" v-for="(finwork,index) in work.fulfilStus.staffList" :key="index">
                                        <div style="margin-bottom: 0.05rem;"><div style="float: left;font-size: 0.14rem;color: #666666;">{{finwork.name}}</div><div style="text-align: right">共{{finwork.stuCount}}名学生</div></div>
                                        <div ><span style="color: #84C225;">{{finwork.stuNotComplete}}</span>名学生未完成作业</div>
                                    </div>
                                </div>
                            </div>
                        </van-col>
                        <van-col span="2" class="homework_mid_hr">
                            <hr>
                        </van-col>
                        <van-col span="11">
                            <div style="margin-bottom: 0.25rem;">
                                <div v-if="work.reviewStus">
                                    <div class="noon_title" style="text-align: center"><strong>作业点评</strong></div>
                                    <div><span style="color: #3770FB">{{work.reviewStus.stuComplete}}/{{school.stuTotal}}</span>名学生完成作业</div>
                                </div>
                                <div class="progress">
                                    <van-progress
                                            :percentage="this.reviewPro"
                                            :show-pivot=false
                                            color="#3770FB"
                                    />
                                </div>
                                <div style="text-align: right;line-height: 0.4rem;color:#999999;font-size:0.1rem;">查看详情</div>

                            </div>
                            <div style="overflow:scroll;" :class="{work_T_list_hide:work_T_list_hide}">
                                <div  v-if="work.reviewStus">
                                    <div style="margin-bottom: 0.1rem;color: #999999;float:left;width: 1.5rem;margin-right: 0.15rem;" v-for="(item,index) in work.reviewStus.staffList" :key="index">
                                        <div style="margin-bottom: 0.05rem;"><div style="float: left;font-size: 0.14rem;color: #666666;">{{item.name}}</div><div style="text-align: right">共{{item.stuCount}}名学生</div></div>
                                        <div ><span style="color: #84C225;">{{item.stuNotComplete}}</span>名学生未完成作业</div>
                                    </div>
                                </div>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div v-if="work_T_list_hide===true" class="bottom_hide" @click="workhide">展开所有教师信息↓</div>

            <div v-if="work_T_list_hide===false" class="bottom_hide" @click="workhide">收起教师信息↑</div>
        </div>

        <div class="ac_line"></div>

        <div class="habit_mod" v-if="safflower">
            <div class="title_b_c">
                <div  class="get_number"><strong>习惯点评</strong></div>
            </div>
            <div style="padding: 0 0.1rem;">
                <div style="margin: 0.15rem 0 0.3rem 0;">
                    <div>
                        <div>已点评<span style="color: #3770FB">{{safflower.stuComplete}}/{{school.stuTotal}}</span>名学生</div>
                    </div>
                    <div class="b_progress">
                        <van-progress
                                :percentage="this.CompletePro"
                                :show-pivot=false
                                color="#3770FB"
                        />
                    </div>
                    <div style="line-height: 0.3rem;color: #666666;">查看详情</div>
                </div>

                <div style="overflow:scroll;" :class="{habit_T_list_hide:habit_T_list_hide}">
                    <div v-if="safflower.staffList">
                        <div style="line-height: 0.35rem;float:left;width: 3rem;margin-right: 0.5rem;color:#999999" v-for="(item,index) in safflower.staffList" :key="index">
                            <van-row>
                                <van-col span="6" style="color: #666666;">{{item.name}}</van-col>
                                <van-col span="8">共{{item.stuCount}}名学生</van-col>
                                <van-col span="9"><span style="color:#84C225;">{{item.stuNotComplete}}</span>名学生未记录</van-col>
                            </van-row>
                        </div>
                    </div>
                </div>

                <div v-if="habit_T_list_hide===true" class="bottom_hide" @click="habitHide">展开所有教师信息↓</div>

                <div v-if="habit_T_list_hide===false" class="bottom_hide" @click="habitHide">收起教师信息↑</div>
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
    import { SDailyBriefing } from '@/api/school/briefing';
    // import { getParamFromUrlAndRoute } from '@/utils/index';

    import Footer from '../../common/footer-operate-btn'
    import { getParamFromUrlAndRoute } from '@/utils'

    // import { SchoolBriefing } from '@/api/school/briefing';

    //import someComponent from './someComponent'

    export default {
        name: "",
        data() {
            return {
                noonpro:'',
                noonall:[],

                school:[],
                attend:[],
                siestaDining:[],
                work:[],
                safflower:[],
                uSchId:'1',
                date:'20190629' ,

                siestaPro:'',
                lunchPro:'',
                dinnerPro:'',
                homeworkPro:'',
                reviewPro:'',
                CompletePro:'',

                arr:[{title:'教师排行榜',type:1}],

                from:'template',

                // 教师列表显示隐藏
                noon_T_list_hide:true,
                lunc_T_list_hide:true,
                habit_T_list_hide:true,
                work_T_list_hide:true
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
            CheckMore(){
              this.$router.push({name:'UnsignedStatistical'})
            },
            teacherlist(){
             if(this.noon_T_list_hide===false){
                 this.noon_T_list_hide = true
             }else if(this.noon_T_list_hide===true){
                 this.noon_T_list_hide = false
                }
            },
            noonHide(){
             if(this.lunc_T_list_hide===false){
                 this.lunc_T_list_hide = true
             }else if(this.lunc_T_list_hide===true){
                 this.lunc_T_list_hide = false
                }
            },
            workhide(){
             if(this.work_T_list_hide===false){
                 this.work_T_list_hide = true
             }else if(this.work_T_list_hide===true){
                 this.work_T_list_hide = false
                }
            },
            habitHide(){
             if(this.habit_T_list_hide===false){
                 this.habit_T_list_hide = true
             }else if(this.habit_T_list_hide===true){
                 this.habit_T_list_hide = false
                }
            },


            GetSchoolBriefing(){
                const template_id = getParamFromUrlAndRoute('template_id', this.$router)

                // 接口请求（请求参数）
                if(this.$route.query.template_id)
                {
                    SDailyBriefing(this.from,template_id)
                        .then(res => {
                            this.school = res.data.data;
                            this.attend = res.data.data.attend
                            this.siestaDining = res.data.data.siestaDining
                            this.work = res.data.data.work
                            this.safflower = res.data.data.safflower

                            // this.noonPre()
                            this.GetsiestaPro()
                            this.GetlunchPro()
                            this.GetdinnerPro()
                            this.Getfhomework()
                            this.Getreview()
                            this.GetComplete()
                            // console.log(this.attend)
                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }else{
                    SDailyBriefing()
                        .then(res => {
                            this.school = res.data.data;
                            this.attend = res.data.data.attend
                            this.siestaDining = res.data.data.siestaDining
                            this.work = res.data.data.work
                            this.safflower = res.data.data.safflower

                            // this.noonPre()
                            this.GetsiestaPro()
                            this.GetlunchPro()
                            this.GetdinnerPro()
                            this.Getfhomework()
                            this.Getreview()
                            this.GetComplete()
                            // console.log(this.attend)
                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }

                // console.log(this.school)

            },
            GetsiestaPro(){
                let pronumber = 1
                var siestaDining = this.siestaDining.siesta.stuComplete
                var stuTotal = this.school.stuTotal
                if(stuTotal===0){
                    pronumber = 0
                }else{
                    pronumber = (siestaDining)/(stuTotal)*100
                }
                this.siestaPro = pronumber
            },
            GetlunchPro(){
                let pronumber = 2
                var lunch = this.siestaDining.lunch.stuComplete
                var stuTotal = this.school.stuTotal
                if(stuTotal===0){
                    pronumber = 0
                }else{
                    pronumber = (lunch)/(stuTotal)*100
                }
                this.lunchPro = pronumber
            },
            GetdinnerPro(){
                let pronumber = 3
                var dinner = this.siestaDining.dinner.stuComplete
                var stuTotal = this.school.stuTotal
                if(stuTotal===0){
                    pronumber = 0
                }else{
                    pronumber = (dinner)/(stuTotal)*100
                }
                this.dinnerPro = pronumber
            },

            Getfhomework(){
                let pronumber = 4
                var fhomework = this.work.fulfilStus.stuComplete
                var stuTotal = this.school.stuTotal
                if(stuTotal===0){
                    pronumber = 0
                }else{
                    pronumber = (fhomework)/(stuTotal)*100
                }
                this.homeworkPro = pronumber
            },
            Getreview(){
                let pronumber = 5
                var review = this.work.reviewStus.stuComplete
                var stuTotal = this.school.stuTotal
                if(stuTotal===0){
                    pronumber = 0
                }else{
                    pronumber = (review)/(stuTotal)*100
                }
                this.reviewPro = pronumber
            },
            GetComplete(){
                let pronumber = 6
                var Complete = this.safflower.stuComplete
                var stuTotal = this.school.stuTotal
                if(stuTotal===0){
                    pronumber = 0
                }else{
                    pronumber = (Complete)/(stuTotal)*100
                }
                this.CompletePro = pronumber
            },

            // noonPre(){
            //     var noonl= [];
            //     for (let nl of this.attend.attentTime){
            //         noonl.push(nl.inNotNumber)
            //     }
            //     var noonr= [];
            //     for (let nr of this.attend.attentTime){
            //         noonr.push(nr.outNotNumber)
            //     }
            //
            //     var noonall=[]
            //
            //     let npf = noonl[0]/noonr[0]
            //     let nps = noonl[1]/noonr[1]
            //     let npt = noonl[2]/noonr[2]
            //
            //     noonall.push({npf,nps,npt})
            //
            //     this.noonall= noonall
            //
            //     console.log(this.attend)
            //
            // },
            jump(){
                this.$router.push({name:'SchoolOtherWork'})
            },
            parent(){
                this.$router.push({name:'TeacherRankingList'})
            },
        },
        mounted(){
            this.GetSchoolBriefing()
        }
    }
</script>

<style scoped>
   .body{
       margin-bottom: 0.6rem;
        font-size: 0.12rem;
    }
    .top_get_mes{
        text-align: center;
        line-height: 0.5rem;
    }
    .top_get_number{
        font-size: 0.2rem;
        color: #84C225;
    }
    .other_get{
        position: absolute;
        right: 0.2rem;
        top: 0.7rem;
        color: #999999
    }
    .rule_div{
        position: absolute;
        left: 0.2rem;
        top: 0.7rem;
     }

    .progress{
        margin-top:10px;
    }
    .b_progress{
        margin-top: 0.1rem;
        width: 2.2rem;
        float: left;
        margin-right: 0.1rem;
    }
    .van-progress{
        height: 0.1rem;
        border-radius: 2px;
    }
   
    .noon_title{
        margin: 0.15rem 0;
        font-size: 0.16rem;
        color:  #333333;
    }
    .noon hr {
        margin: 0;
        float: left;
        height: 0.35rem;
        width: 1px;
        background: #CCCCCC;
        border: none;
    }
    .mid_hr hr{
        margin: 0.1rem 0.15rem;
        height: 3rem;
        background: #F1F1F1;
    }
   .homework_mid_hr hr{
        margin: 0.1rem 0.15rem;
        height: 3rem;
       background: #F2F2F2;
    }
    .get_number{
        color: #333333;
        font-size: 0.18rem;
    }
    .top{
        margin:0.15rem;
    }
    .lunch_title{
        color: #0099FF;
        font-size: 0.18rem;
        text-align: center;
        line-height: 0.4rem;
    }
    .noonmod_lunch{
        /*border-right: solid 1px;*/
        color: #999999;
    }
    .lunch_mod{
        margin:  0.15rem;
    }
    .lunch_mod hr{
        width:1px;
        height: 2.2rem;
        border: none;
        background: #F2F2F2
    }
    .lunch_mod_title{
        margin-bottom: 0.2rem;
    }


    .habit_mod{
        margin: 0.15rem;
    }
    .ac_line{
        background-color: #F3F7F8;
        height: 0.1rem;
    }
    .title_b_c{
        border-left: solid 0.02rem #3770FB;
        padding-left: 0.1rem;
    }
    .today_bor{
        text-align: center;
        border: solid 1px #EDEDED;
        box-shadow:0px 1px 2px 0px rgba(0,0,0,0.08);
        border-radius:3px;
        padding: 0.1rem 0.15rem;
    }
    .teacher_name{
        margin-bottom: 0.05rem;
        color: #666666;
        font-size: 0.14rem;
    }
    .van-col--6{
        width: 27%;
    }
    .homework_mod{
        margin:  0.15rem;
    }
   .today_box:nth-child(2)
   {
      padding:0 0.12rem
   }
   .today_box:nth-child(1)
   {
       padding-left:0;
       padding-right: 0.12rem;
   }
   .today_box:nth-child(3)
   {
       padding-left:0.12rem;
       padding-right:0;
       border: none;
   }
   .today_box{
        width:1.6rem;
        float:left;
        border-right: solid 1px #F1F1F1;
        padding: 0 0.15rem
   }
    .noon_T_list{
        overflow:scroll
    }
    .noon_T_list_hide{
        height: 2rem;
    }
   .lunc_T_list_hide{
        height: 1.4rem;
    }
    .work_T_list_hide{
        height: 1.4rem;
    }
   .habit_T_list_hide{
        height: 1.4rem;
    }
    .bottom_hide{
        text-align: center;
        line-height: 0.2rem;
        color: rgb(153, 153, 153);
        border-top: solid 1px #F1F1F1;
        margin-top: 0.1rem;
        padding-top: 0.1rem;
    }
</style>
