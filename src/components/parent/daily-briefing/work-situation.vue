<template>
    <div>
        <van-nav-bar
                :title="test.schoolName"
        />

    <div class="body">
        <div class="top_title">{{year}}.{{month}}.{{day}} 今日托管简报</div>

        <div class="ac_line"></div>

        <div class="top_mes">
            <div style="float:left;margin-right: 0.2rem">
                <div class="head_img"><img :src="test.headImgurl"> </div>
            </div>
            <div style="line-height: 0.4rem;">
                <div><span style="margin-right: 0.2rem;font-size: 0.16rem;"><strong>{{test.stuName}}</strong></span><span>{{test.className}}</span></div>
                <div><span style="margin-right: 0.2rem">{{test.gradeName}}</span><span>{{test.schoolName}}</span></div>
            </div>
        </div>

        <div class="ac_line"></div>

        <div class="today_mod">
            <div class="title_mid"><strong>今日考勤</strong></div>

            <div style="overflow: scroll;margin: 0.15rem 0">
            <div class="rollingbox">

                <div class="today_box" v-for="(item,index) in attend" :key="index">
                    <div class="today_l_box">{{item.attendName}}</div>
                    <div class="today_r_box" v-if="item.time.length!=0">
                        <span style="line-height: 0.3rem;color: #999999;">签到</span><br>
                        <span style="line-height: 0.3rem;color: #999999;">{{item.time}}</span>
                    </div>
                    <div class="today_r_box" style="line-height: 0.6rem;color: #999999;" v-else>未签到</div>

                </div>


            </div>
            </div>
        </div>

        <div class="ac_line" style="width: 100%;float:left;"></div>

        <div class="homework_mod" v-if="test.work">
            <div class="title_mid"><strong>作业完成情况</strong></div>
            <div style="overflow: scroll;margin: 0.15rem 0;">
                <div class="sub_div">
                    <div class="subject_box" v-for="(item,index) in subject" :key="index">
                                <div class="sub_img">
                                    <img :src="item.imgUrl">
                                </div>
                                <div style="margin: 0.1rem 0;">{{item.subjectName}}</div>
                                <div class="subject_fin" v-if="item.isFulfil===1"><span>已完成</span></div>
                                <div class="subject_fin" style="background-color: #C2DDF4" v-else><span>未完成</span></div>
                    </div>
                </div>
            </div>
            <div style="line-height: 0.8rem">作业表现<span style="margin-left: 0.2rem;color: #FF6666;">❀<span v-if="test.work.workBehavior.number.length!=0">{{test.work.workBehavior.number}}</span> 分</span></div>
            <div  >教师语音评价</div>
        </div>

        <div class="ac_line"></div>

        <div class="lunch_mod">
            <div>
                <div class="title_mid" style="float:left;">
                    <strong>午餐用餐情况</strong>
                </div>
                <div style="color: #999999;font-size: 0.12rem;text-align: right">查看晚餐></div>
            </div>

            <div class="lunch_list">

            <div style="width: 7rem;">
                        <div class="noonbreak_mes" v-if="siesta.length!=0">
                            <div class="lunch_list_title"><strong>午休</strong></div>
                            <div>
                                <van-row >
                                    <van-col span="8" class="lunch_color">状态</van-col>
                                    <div v-for="(item,index) in siesta.status" :key="index">
                                        <van-col span="8" class="lunch_state">{{item}}</van-col>
                                    </div>
                                </van-row>
                            </div>
                            <div >
                                <van-row >
                                    <van-col span="8" class="lunch_color">纪律</van-col>
                                    <van-col span="8" v-if="siesta.discipline.comment.length!=0">{{siesta.discipline.comment}}</van-col>
                                    <van-col span="8" v-else>无</van-col>
                                    <van-col span="8" style="color: #D80000">{{siesta.discipline.number}}分</van-col>
                                </van-row>
                            </div>
                        </div>

                        <div class="lunch_mes" v-if="lunch.length!=0">
                            <div class="lunch_list_title"><strong>午餐</strong></div>
                            <div >
                                <van-row >
                                    <van-col span="8" class="lunch_color">状态</van-col>
                                    <div v-for="(item,index) in lunch.status" :key="index">
                                        <van-col span="8" class="lunch_state">{{item}}</van-col>
                                    </div>
                                </van-row>
                            </div>
                            <div >
                                <van-row >
                                    <van-col span="8" class="lunch_color">纪律</van-col>
                                    <van-col span="8" v-if="lunch.discipline.comment.length!=0">{{lunch.discipline.comment}}</van-col>
                                    <van-col span="8" v-else>无</van-col>
                                    <van-col span="8" style="color: #D80000">{{lunch.discipline.number}}分</van-col>
                                </van-row>
                            </div>
                        </div>

                        <div class="dinner_mes" v-if="dinner.length!=0">
                            <div class="lunch_list_title"><strong>晚餐</strong></div>
                            <div >
                                <van-row >
                                    <van-col span="8" class="lunch_color">状态</van-col>
                                    <div v-for="(item,index) in dinner.status" :key="index">
                                        <van-col span="8" class="lunch_state">{{item}}</van-col>
                                    </div>
                                </van-row>
                            </div>
                            <div >
                                <van-row >
                                    <van-col span="8" class="lunch_color">纪律</van-col>
                                    <van-col span="8" v-if="dinner.discipline.comment.length!=0">{{dinner.discipline.comment}}</van-col>
                                    <van-col span="8" v-else>无</van-col>
                                    <van-col span="8" style="color: #D80000">{{dinner.discipline.number}}分</van-col>
                                </van-row>
                            </div>
                        </div>
                    </div>
                        <!--<div><hr></div>-->
            </div>
        </div>

        <div class="ac_line"></div>

        <div class="habit_mod" v-if="othermes.safflower.length!=0">
            <div class="title_mid"><strong>习惯表现</strong></div>
            <div style="text-align: center;border-bottom: solid 1px #EEEEEE;padding-bottom: 0.2rem;">
                <div>
                    <div class="habit_score"><span style="color: #FF6666;">❀</span>{{othermes.safflower.behaviorNumber}}</div>
                    <div>今日表现奖励</div>
                </div>
                <div>
                    <van-row >
                        <div v-for="(item,index) in safflower.category" :key="index">
                            <van-col span="8" >
                                <div>
                                    <div class="habit_score" style="font-size: 0.24rem;">❀{{item.number}}</div>
                                    <div class="habit_score_title">{{item.name}}</div>
                                </div>
                            </van-col>
                        </div>
                    </van-row>
                </div>
            </div>

            <div class="get_flower_out">
            <div class="get_flower_mes" v-for="(item,index) in details" :key="index">

                    <div class="habit_t_c" style="line-height: 0.4rem"  v-if="item.type===1">
                        <van-icon name="setting"  size="0.15rem" style="line-height: 0.4rem;"/>
                        <span style="margin-left: 0.05rem;"><strong>奖励{{item.number}}朵</strong></span>
                    </div>

                    <div class="habit_t_c" style="line-height: 0.4rem;color: #D80000"  v-if="item.type===2" >
                            <van-icon name="setting"  size="0.15rem" style="line-height: 0.4rem;"/>
                            <span style="margin-left: 0.05rem;color: #D80000" >
                                <strong>扣除{{item.number}}朵</strong>
                            </span>
                    </div>

                    <div v-for="(itemse,index) in item.category" :key="index">
                        <div v-for="(itemth,index) in itemse.number" :key="index">
                            <div style="margin-left: 0.2rem;color: #666666">
                                {{itemth.content}}
                                <span style="color:#3770FB " v-if="item.type===1">+{{itemth.worth}}</span>
                                <span style="color:#D80000 " v-if="item.type===2">-{{itemth.worth}}</span>
                            </div>
                        </div>
                    </div>


                <div style="float: left;margin-left: 0.2rem;">
                    <div class="habit_img" v-for="(url,index) in item.imgurl" :key="index">
                        <img :src="url">
                    </div>
                </div>
            </div>
            </div>

            <div  v-if="mall.length!=0" class="exchange_div">
                <div style="margin-left: 0.2rem;" v-for="(item,index) in mall" :key="index" class="exchange_box">
                    <div style="line-height: 0.3rem;font-size: 0.16rem;float:left;width: 100%;"><strong>兑换奖品</strong></div>
                    <div>使用红花<span style="color: #FF6600">{{item.number}}</span>朵</div>
                    <div style="margin-top: 0.15rem;height: 0.8rem;" >
                        <div>
                            <div class="ex_img">
                                <img :src="item.info.imageurl">
                            </div>
                            <div>
                                <div class="exchange_img">
                                    <img src="../../../assets/img/parents/daily-briefing/exchange.png">
                                    <span>兑换</span>
                                </div>
                                <div style="line-height: 0.5rem">
                                    【{{item.info.name}}】*1
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin: 0.1rem 0;color: #999999;">
                        今天 {{item.time}}<span style="margin-left: 0.1rem;">
                        <span v-for="(name,index) in item.userName" :key="index">{{name}}</span>
                        奖 </span>
                    </div>
                </div>
            </div>

            <div style="margin-left: 0.2rem;" v-else>
                <div>&nbsp;</div>
            </div>

        </div>

        <div class="ac_line"></div>

        <div class="Community_mod" v-if="community.length!=0">
            <div  class="title_mid">
               <strong>互动社区</strong>
            </div>
            <div v-for="(item,index) in community" :key="index">
                <strong>
                <div style="margin-top: 0.2rem;"><div style="float: left;">{{item.userName}}</div><div style="text-align: right">{{item.type}}</div></div>
                </strong>
                 <div style="color: #666666; margin-top: 0.1rem;">{{item.content}}</div>
                <div style="float:left;width: 100%;">
                    <div class="community_img" v-for="(itemse,index) in item.imageUrl" :key="index">
                        <img :src="itemse">
                    </div>
                </div>

            </div>
            <div style="text-align: right;color: #999999;" @click="PushCommunity">
                查看更多动态>>>
            </div>
        </div>

        <div class="ac_line" v-if="community.length!=0"></div>

        <div class="achievement_mod" v-if="score.length!=0">
            <div class="title_mid" ><strong>今日更新成绩</strong></div>
            <div  style="margin-top:0.15rem">
                <div class="achievement_list" v-for="(item,index) in score" :key="index">
                    <van-row>
                        <van-col span="6">{{item.subject}}</van-col>
                        <van-col span="6">{{item.term}}</van-col>
                        <van-col span="6">{{item.unit}}</van-col>
                        <van-col span="6">{{item.score}}</van-col>
                    </van-row>
                </div>
            </div>
        </div>

        <div class="ac_line" v-if="score.length!=0"></div>

        <div class="birth_mod" v-if="othermes.birthday.length!=0">
            <div class="title_mid"><strong>生日快乐</strong></div>
            <div style="margin-top:0.15rem ;">
                <div class=cake_img><img src="../../../assets/img/birthdaycake.png"></div>
                <div style="line-height: 0.24rem;" >{{othermes.birthday.belssing}}&nbsp;</div>
            </div>

            <div style="float: left;width: 100%">
                <div style="margin: 0 auto;width: 3rem;">
                    <div class="birth_img" v-for="(item,index) in othermes.birthday" :key="index">
                        <img :src="othermes.birthday.imageUrl">&nbsp;
                    </div>
                </div>
            </div>

            <div style="text-align: right;font-size: 0.12rem;color: #999999" >查看电子贺卡>></div>
        </div>

        <div class="ac_line" v-if="othermes.birthday.length!=0"></div>

        <div class="good_mod"  v-if="test.isLike===0">
            <div>如果您觉得满意，就给我们点个赞吧~</div>

            <div class="like_img"  v-if="this.unlike===true" @click="GetSendlike">
                <img src="../../../assets/img/parents/daily-briefing/like.png">
            </div>

            <div>已有{{test.likeCount}}位家长为每日简报点赞</div>
        </div>

        <div class="good_mod" v-if="test.isLike===1">
            <div>如果您觉得满意，就给我们点个赞吧~</div>
            <div style="color:red;position: absolute;right: 0.8rem;line-height: 0.5rem" >点赞成功</div>
            <div class="like_img">
                <img src="../../../assets/img/parents/daily-briefing/clike.png">
            </div>
            <div>已有{{test.likeCount}}位家长为每日简报点赞</div>
        </div>

    </div>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import { Progress } from 'vant';
    import { Icon } from 'vant';
    import { Row, Col } from 'vant';
    import { Toast } from 'vant';
    import { PDailyBriefing } from '@/api/parent/briefing';
    import { POther } from '@/api/parent/briefing';
    import { Sendlike } from '@/api/parent/briefing';
    // import Audit from "../../school/community/audit";
    import { getParamFromUrlAndRoute } from '@/utils'
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                test:[],
                othermes:[],
                attend:[],
                subject:[],
                siesta:[],
                dinner:[],
                lunch:[],

                status:[],

                safflower:[],
                mall:[],
                details:[],
                comment:[],
                score:[],
                community:[],

                number:'',
                from:'template',

                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                day:new Date().getDate(),

                arr:[{title:'工作成就值排行榜',type:1}],
                commentlist:[],

                unlike:true,
                like:false
            }
        },
        components: {
            [NavBar.name]: NavBar,
            [Progress.name]: Progress,
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Toast.name]: Toast,

            //someComponent
        },
        methods:{
            PushCommunity(){
              this.$router.push({name:'ParentCommunity'})
            },
            jump(){
                this.$router.push({name:'OtherWork'})
            },
            parent(){

            },
            GetPDailyBriefing(){

                const template_id = getParamFromUrlAndRoute('template_id', this.$router)
                if(this.$route.query.template_id)
                {
                    PDailyBriefing(this.from,template_id)
                        .then(res => {
                            this.test = res.data.data;
                            this.attend = res.data.data.attend
                            this.subject = res.data.data.work.subject
                            this.lunch = res.data.data.siestaDining.lunch
                            this.dinner = res.data.data.siestaDining.dinner
                            this.siesta = res.data.data.siestaDining.siesta
                            this.status = res.data.data.siestaDining.siesta.status
                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }else{
                    PDailyBriefing()
                        .then(res => {
                            this.test = res.data.data;
                            this.attend = res.data.data.attend
                            this.subject = res.data.data.work.subject
                            this.lunch = res.data.data.siestaDining.lunch
                            this.dinner = res.data.data.siestaDining.dinner
                            this.siesta = res.data.data.siestaDining.siesta
                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }


            },
            GetPOther(){

                const template_id = getParamFromUrlAndRoute('template_id', this.$router)

                if(this.$route.query.template_id)
                {
                    POther(this.from,template_id)
                        .then(res => {
                            this.othermes = res.data.data;
                            this.safflower = res.data.data.safflower;
                            this.mall = res.data.data.safflower.mall;
                            this.details = res.data.data.safflower.details;
                            // this.comment = res.data.data.safflower.details.category.comment;
                            this.score = res.data.data.score;
                            this.community = res.data.data.community
                            // console.log(this.community)
                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }else{
                    POther()
                        .then(res => {
                            this.othermes = res.data.data;
                            this.safflower = res.data.data.safflower;
                            this.mall = res.data.data.safflower.mall;
                            this.details = res.data.data.safflower.details;
                            // this.comment = res.data.data.safflower.details.category.comment;
                            this.score = res.data.data.score;
                            this.community = res.data.data.community
                            // console.log(this.community)
                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }

            },
            GetSendlike(){

                const date = this.year +'-'+ this.month +'-'+ this.day
                console.log(date)
                Sendlike(date)
                    .then(res=>{
                        if (res.status === 200){
                            // this.number = res.data.data
                            Toast.success("点赞成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.go(0)
                            },2800)
                            this.GetPDailyBriefing()
                        }else {
                            Toast.fail("新增失败！")
                        }
                    }).catch(() => {
                    Toast.fail("新增失败！")
                    throw new Error("异常!")
                })
            },
        },
        mounted(){
            this.GetPDailyBriefing()
            this.GetPOther()
        }
    }
</script>

<style scoped>
    .body{
        font-size: 62.5%;
        font-size: 0.14rem;
        /*margin-bottom: 1rem;*/
    }
    .ac_line{
        height: 0.1rem;
        /*width: 100%;*/
        background: #F3F7F8;
        /*float: left;*/
    }
    .title_mid{
        border-left: solid 2px #3770FB;
        padding-left: 0.1rem;
        font-size: 0.16rem;
        /*text-align: center;*/
        /*color:#00CCFF;*/
        /*line-height: 0.3rem;*/
        /*margin-left: 0.15rem;*/
    }
    .today_title{
        font-size: 0.16rem;
        color: #0099FF;
    }
    .top_mes{
        margin:   0.15rem;
        font-size: 0.14rem;
    }
    .head_img{
        width: 0.8rem;
        height: 0.8rem;
    }
    .head_img img{
        width: 100%;
        height: 100%;
        border-radius: 0.8rem;
    }
    .today_mod{
        /*text-align: center;*/
        margin: 0.15rem ;
    }
    .homework_mod   {
        margin:0.4rem 0.15rem 0.15rem 0.15rem;

    }
    .sub_div{
        width: 12rem;
        /*color: #6699FF;*/
    }
    .sub_img{
        width: 0.5rem;
        height: 0.5rem;
        margin: 0 auto;
    }
    .sub_img img{
        width: 100%;
        height: 100%;
    }
    .lunch_mod{
        margin: 0.15rem;
    }
    .lunch_mod hr{
        width: 1px;
        height: 1rem;
        border: none;
        background: black;
    }
    .lunch_list{
        text-align: center;
        overflow: scroll;
        margin-top: 0.1rem;
        line-height: 0.35rem;
    }
    .lunch_list_title{
        text-align: center;
        color: #333333
    }
    .lunch_color{
        font-weight:700;
        color: #333333
    }
    .lunch_state{
        color: #666666
    }
    .habit_mod{

        margin: 0.15rem;
    }
    .habit_score{
        font-size: 0.32rem;
        color: #D80000;
    }
    .habit_score_title{
        font-size: 0.14rem;
    }
    .habit_t_c{
        font-size: 0.16rem;
        color: #6699FF;
    }
    .get_flower_mes{
        float:left;
        margin-top:0.1rem;
        width:100%;
        display: none;
    }
    /*.get_flower_out{*/
        /*background-color: red;*/

    /*}*/
    .get_flower_out /deep/  .get_flower_mes:last-child{
        display: block;
    }

    .ex_img{
        width: 1.1rem;
        height: 0.8rem;
        float: left;
        margin-right: 0.4rem;
        border-radius:3px;
    }
    .ex_img img{
        width: 100%;
        height: 100%;
        border-radius:3px;
    }
    .Community_mod{
        margin: 0.15rem;
    }
    .community_img{
        width: 0.9rem;
        height: 0.9rem;
        float: left;
        margin: 0.1rem 0.1rem 0 0;
    }
    .community_img img{
        width: 100%;
        height: 100%;
    }
    .achievement_mod{
        margin: 0.15rem ;
    }
    .achievement_list{
              text-align: center;
              line-height: 0.4rem;
              border-top: solid 1px #EEEEEE
    }
    .achievement_list:nth-child(1)
    {
        border:none;
    }
    .birth_mod{
        margin: 0.15rem;
    }
    .birth_img{
        width: 0.9rem;
        height: 0.9rem;
        float: left;
        margin: 0.1rem 0.1rem 0 0;
    }
    .birth_img img{
        width: 100%;
        height: 100%;
    }
    .good_mod{
        text-align: center;
        color: #666666;
        margin: 0.15rem;
        line-height: 0.3rem;
    }
    .top_title{
        color: #84C225;
        font-size: 0.16rem;
        margin: 0.15rem 0;
        text-align: center;
    }
    .rollingbox{
        width: 12rem;
    }
    .today_box{
        box-shadow:0px 1px 2px 0px rgba(0,0,0,0.08);
        border-radius:3px;
        border: solid 1px #EDEDED;
        width: 1.6rem;
        height: 0.6rem;
        margin-right:0.15rem ;
        float: left;
    }
    .today_l_box{
        float:left;
        width: 0.6rem;
        border-right: solid 1px #EDEDED;
        line-height: 0.6rem;
        height: 0.6rem;
        text-align: center
    }
    .today_r_box{
        width: 100%;
        text-align: center
    }
    .subject_box{
        text-align: center;
        width: 1rem;
        border-right: solid 1px #F1F1F1;
        float: left;
    }
    .subject_fin{
        width: 0.6rem;
        background-color: #53ACF8;
        color: white;
        line-height: 0.22rem;
        height: 0.22rem;
        border-radius:100px;
        margin: 0 auto;
    }
    .habit_img{
        width: 0.9rem;
        height: 0.9rem;
        float: left;
        margin: 0.15rem 0.15rem 0.15rem 0;
    }
    .habit_img img{
        width: 100%;
        height: 100%;
    }
    .cake_img{
        width: 0.24rem;
        height: 0.24rem;
        float: left;
        margin-right: 0.1rem;
    }
    .cake_img img{
        width: 100%;
        height: 100%;
    }
    .noonbreak_mes{
        padding-right: 0.25rem;
        /*padding-left: 0.1rem;*/
        border-right: solid 1px #F1F1F1;
        width: 1.5rem;
        float: left;
        text-align: center;
    }
    .lunch_mes{
        padding-right: 0.25rem;
        padding-left: 0.25rem;
        border-right: solid 1px #F1F1F1;
        width: 1.5rem;
        float: left;
        text-align: center;
    }
    .dinner_mes{
        /*padding-right: 0.25rem;*/
        padding-left: 0.25rem;
        /*border-right: solid 1px #F1F1F1;*/
        width: 1.5rem;
        float: left;
        text-align: center;
    }
    .like_img{
       width:0.5rem;
        height:0.5rem;
        margin:0 auto;
    }
    .like_img img{

    }
    .exchange_img img {
        width:0.18rem;
        height: 0.18rem;
    }
    .exchange_div /deep/ .exchange_box:last-child{
        display: block;
    }
    .exchange_box{
        display: none;
    }
</style>
