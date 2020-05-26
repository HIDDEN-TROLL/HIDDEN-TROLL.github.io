<template>
    <div>
        <van-nav-bar
                title="周报详情 "
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />

        <div class="title_date">
            <van-row>
                <van-col span="2" :class="{showL:showL}">
                    <a @click="changeweek(1)">  &lt; </a>
                </van-col>
                <van-col span="20">
                    <a style="margin: 0 0.15rem">本周:{{test.beginDate}}-{{test.endDate}}</a>
                </van-col>
                <van-col span="2"  :class="{showC:showC}" >
                    <a @click="changeweek(2)"> &gt; </a>
                </van-col>
            </van-row>
        </div>

        <div class="body">

            <div class="ac_line"></div>

            <div class="attendance_mod">
                <div class="mod_title_b">
                    <strong>本周考勤情况</strong>
                </div>
                <div class="attendance_table">
                    <div class="rolling_box">
                        <div class="rolling_box_se">
                            <div style="float:left; border-bottom: solid 1px #dcdcdc;" >
                                <div class="attendance_box" style="border-top: solid 1px #dcdcdc"><span style="line-height: 0.5rem;">类型</span></div>
                            </div>
                            <div style="float:left; border-bottom: solid 1px #dcdcdc;" v-for="(item,index) in date" :key="index">
                                <div class="attendance_box" style="border-top: solid 1px #dcdcdc"><span style="line-height: 0.25rem;">{{item.weekName}}</span><br><span style="line-height: 0.25rem;">{{item.dateSrc}}</span></div>
                            </div>
                        </div>
                        <div class="rolling_box_se" v-for="(item,index) in attend" :key="index" style="clear: both;">
                            <div style="float:left; border-bottom: solid 1px #dcdcdc;" >
                                <div class="attendance_box" style="height:0.3rem"><span style="line-height: 0.3rem;">{{ item.attendName }}</span></div>
                            </div>
                            <div style="float:left; border-bottom: solid 1px #dcdcdc;" v-for="(timeString,index2) in item.weekAttend" :key="index2">
                                <div class="attendance_box" style="height:0.3rem"><span style="line-height: 0.3rem;">{{ timeString }}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ac_line"></div>

            <div style="float: left;width: 100%;">
                <div class="mod_title_b" style="margin: 0.15rem 0.15rem 0 0.15rem">
                    <strong>本周作业情况</strong>
                </div>
                <div class="t2_box_con" style="padding:0px 10px 0px;">
                    <div id="rllfx" style="width: 100%; height: 2.2rem;"></div>
                </div>
            </div>

            <div class="ac_line"></div>

            <div class="noonbreak_mod">
                <div class="mod_title_b">
                    <strong>本周午休情况</strong>
                </div>
                <div style="float: left;width: 100%;">
                    <div style="text-align: center;margin: 0.15rem;font-weight: 700">
                        午休状况
                    </div>
                    <div style="text-align: center;border: solid 1px #dcdcdc;width:3.6rem;padding: 0.01rem;margin: 0 auto" class="thisweek_rolling">
                        <div style="width: 7rem">
                            <div class="lunch_box_out" v-for="(item,noonbreak) in date" :key="noonbreak">
                                <div class="date_box">
                                    <span style="line-height: 0.25rem;">{{item.weekName}}</span><br>
                                    <span style="line-height: 0.25rem;">{{item.dateSrc}}</span>
                                </div>
                            </div>
                            <div v-for="(item,index) in siestaDining.siestaWeekValue" :key="index+'S'" >
                                <div class="test_outbox" v-if="item.status.length>0 && item.status!=''" >
                                    <div   v-for="(itemse,indexse) in item.status" :key="indexse+'S'" >
                                        <div class="test_box">
                                            <div >
                                                <div class="lunchmes_box" :id="'siest'+index+indexse"><span >{{ itemse }}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="test_outbox" v-else>
                                    <div class="test_box">
                                        <div >
                                            <div class="lunchmes_box" :style="lineProgress"><span style="color: rgb(242, 48, 4);">无记录&nbsp;</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="float:left;">
                    <div style="text-align: center;margin: 0.15rem;font-weight: 700">午休纪律</div>
                    <div class="lunch_for">
                        <div v-for="(item,index) in siestaDining.discipline" :key="index" style="text-align: center;line-height: 0.3rem;float: left" class="lunch_forse">
                            <div style="width:0.45rem;height:0.3rem;float:left;color: #999999;font-size: 0.12rem;">
                                <span>{{item}}</span>
                            </div>
                            <div style="" class="lunch_box_outbor">
                                <div v-for="(itemse,index) in siestaDining.siestaWeekValue" :key="index" class="lunch_box_bor">
                                    <div v-if="item === itemse.discipline">
                                        <img src="../../../../assets/img/parents/daily-briefing/flag.png" style="padding-top: 0.08rem;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div  style="text-align: center;line-height: 0.3rem;float: left;margin: 0.05rem 0 0.15rem 0;">
                            <div style="width:0.45rem;height:0.3rem;float:left;"><span>&nbsp;</span></div>
                            <div v-for="(itemse,index) in date" :key="index" style="width: 0.45rem;height: 0.3rem;float:left;line-height: 0.15rem;font-size: 0.12rem;border-left: solid 1px white;color: #999999;">
                                <div > {{itemse.weekName}}<br>{{itemse.dateSrc}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ac_line"></div>

            <div class="lunch_mod">
                <div class="mod_title_b" style="float:left;"><strong>本周用餐情况</strong></div>

                <div >
                    <div style="float: left;width: 100%;">
                        <div style="text-align: center;margin: 0.15rem;font-weight: 700">
                            午餐状况
                        </div>
                        <div style="text-align: center;border: solid 1px #dcdcdc;width:3.6rem;padding: 0.01rem;margin: 0 auto"  class="thisweek_rolling">
                            <div style="width: 7rem">
                                <div class="lunch_box_out" v-for="item in date" :key="item.index">
                                    <div class="date_box">
                                        <span style="line-height: 0.25rem;">{{item.weekName}}</span><br>
                                        <span style="line-height: 0.25rem;">{{item.dateSrc}}</span>
                                    </div>
                                </div>
                                <div v-for="(item,index) in siestaDining.lunchWeekValue" :key="index" >
                                    <div class="test_outbox" v-if="item.status.length>0 && item.status!=''" >
                                        <div   v-for="(itemse,indexse) in item.status" :key="indexse" >
                                            <div class="test_box">
                                                <div >
                                                    <div class="lunchmes_box" :id="'lunch'+index+indexse"><span >{{ itemse }}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="test_outbox" v-else>
                                        <div class="test_box">
                                            <div >
                                                <div class="lunchmes_box" :style="LunchlineProgress"><span style="color: rgb(242, 48, 4);">无记录&nbsp;</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="float:left;">
                        <div style="text-align: center;margin: 0.15rem;font-weight: 700">午餐纪律</div>
                        <div class="lunch_for">
                            <div v-for="(item,index) in siestaDining.discipline" :key="index" style="text-align: center;line-height: 0.3rem;float: left" class="lunch_forse">
                                <div style="width:0.45rem;height:0.3rem;float:left;color: #999999;font-size: 0.12rem;">
                                    <span>{{item}}</span>
                                </div>
                                <div style="" class="lunch_box_outbor">
                                    <div v-for="(itemse,index) in siestaDining.lunchWeekValue" :key="index" class="lunch_box_bor">
                                        <div v-if="item === itemse.discipline">
                                            <img src="../../../../assets/img/parents/daily-briefing/flag.png"  style="padding-top: 0.08rem;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div  style="text-align: center;line-height: 0.3rem;float: left;margin: 0.05rem 0 0.15rem 0;">
                                <div style="width:0.45rem;height:0.3rem;float:left;"><span>&nbsp;</span></div>
                                <div v-for="(itemse,index) in date" :key="index" style="width: 0.45rem;height: 0.3rem;float:left;line-height: 0.15rem;font-size: 0.12rem;border-left: solid 1px white;color: #999999;">
                                    <div > {{itemse.weekName}}<br>{{itemse.dateSrc}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ac_line" v-if="Missingdinner.length>0"></div>

                <div v-if="Missingdinner.length>0">
                    <div style="float: left;width: 100%;">
                        <div style="text-align: center;margin: 0.15rem;font-weight: 700" >
                            晚餐状况
                        </div>
                        <div style="text-align: center;border: solid 1px #dcdcdc;width:3.6rem;padding: 0.01rem;margin: 0 auto"  class="thisweek_rolling">
                            <div style="width: 7rem">
                                <div class="lunch_box_out" v-for="item in date" :key="item.index">
                                    <div class="date_box">
                                        <span style="line-height: 0.25rem;">{{item.weekName}}</span><br>
                                        <span style="line-height: 0.25rem;">{{item.dateSrc}}</span>
                                    </div>
                                </div>
                                <div v-for="(item,index) in siestaDining.dinnerWeekValue" :key="index" >
                                    <div class="test_outbox" v-if="item.status.length>0 && item.status!=''" >
                                        <div   v-for="(itemse,indexse) in item.status" :key="indexse" >
                                            <div class="test_box">
                                                <div >
                                                    <div class="lunchmes_box" :id="'dinner'+index+indexse" ><span >{{ itemse }}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="test_outbox" v-else>
                                        <div class="test_box">
                                            <div >
                                                <div class="lunchmes_box"   :style="DinnerlineProgress"><span style="color: rgb(242, 48, 4);">无记录&nbsp;</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="float:left;">
                        <div style="text-align: center;margin: 0.15rem;font-weight: 700">
                            晚餐纪律
                        </div>
                        <div class="lunch_for">
                            <div v-for="(item,index) in siestaDining.discipline" :key="index" style="text-align: center;line-height: 0.3rem;float: left" class="lunch_forse">
                                <div style="width:0.45rem;height:0.3rem;float:left;color: #999999;font-size: 0.12rem;">
                                    <span>{{item}}</span>
                                </div>
                                <div style="" class="lunch_box_outbor">
                                    <div v-for="(itemse,index) in siestaDining.dinnerWeekValue" :key="index" class="lunch_box_bor">
                                        <div v-if="item === itemse.discipline">
                                            <img src="../../../../assets/img/parents/daily-briefing/flag.png"  style="padding-top: 0.08rem;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div  style="text-align: center;line-height: 0.3rem;float: left;margin: 0.05rem 0 0.15rem 0;">
                                <div style="width:0.45rem;height:0.3rem;float:left;"><span>&nbsp;</span></div>
                                <div v-for="(itemse,index) in date" :key="index" style="width: 0.45rem;height: 0.3rem;float:left;line-height: 0.15rem;font-size: 0.12rem;border-left: solid 1px white;color: #999999;">
                                    <div > {{itemse.weekName}}<br>{{itemse.dateSrc}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="ac_line"></div>

            <div class="habit_mod">
                <div class="mod_title_b"><strong>本周习惯表现</strong></div>
                <div style="text-align: center;margin: 0 0.15rem;border-bottom: solid 1px #EEEEEE;padding-bottom: 0.2rem;">
                    <strong>
                        <van-row>
                            <van-col span="12">奖励红花<br><span class="habit_t_c">   {{safflower.rewardNumber}}   </span></van-col>
                            <van-col span="12">扣除红花<br><span class="habit_t_c_r">   {{safflower.deductNumber}}   </span></van-col>
                        </van-row>
                    </strong>
                </div>
                <div style="text-align: center;margin:0.15rem;">
                    <van-row >
                        <van-col span="8">
                            <div>
                                总红花数<span style="font-size: 0.16rem;color: #D80000;">{{safflower.safflowerCount}}</span>朵
                            </div>
                        </van-col>
                        <van-col span="8">
                            <div>
                            </div>
                        </van-col>
                        <van-col span="8">
                            <div class="ranking_button" @click="CheckRank">查看排行榜</div>
                        </van-col>
                    </van-row>
                </div>
                <div style="text-align: center;margin: 0 0.15rem;">
                    <van-row >
                        <van-col span="8">
                            <div>排行第{{safflower.rankNum}}名</div>
                        </van-col>
                        <van-col span="16">
                            <div style="color: #999999;font-size: 0.12rem;">
                                超过上一名需要{{safflower.removingNum}}红花
                            </div>
                        </van-col>
                    </van-row>
                </div>

                <div style="text-align: center;margin-top: 0.2rem;">
                    <div>
                        <div class="habit_score"><span style="color: #FF6666">❀{{safflower.behaviorNumber}}</span></div>
                        <div>习惯表现奖励</div>
                    </div>
                    <div style="margin-top: 0.1rem;">
                        <div class="echarts" id="SafflowerMes" :style="{width: '3.5rem', height: '3.2rem'}" style="margin: 0 auto"></div>
                        <van-row >
                            <div v-for="(item,index) in safflower.category" :key="index">
                                <van-col span="8" style="margin-bottom: 0.1rem">
                                    <div>
                                        <div class="habit_score_se"><span style="color: #FF6666">❀{{item.number}}</span></div>
                                        <div class="habit_score_title">{{item.name}}</div>
                                    </div>
                                </van-col>
                            </div>
                        </van-row>
                    </div>
                    <div id="light" style="width: 3.5rem;height:2.2rem;margin: 0 auto;"></div>
                </div>

                <div class="ac_line"></div>

                <div class="get_flower_mes" v-for="(item,index) in details" :key="index">
                    <div style="line-height: 0.4rem;border-bottom: solid 1px #EEEEEE;font-size: 0.16rem">
                        <span>
                          <strong>
                            {{item.weekName}}
                            {{item.date}}
                          </strong>
                        </span>
                    </div>
                    <div v-for="(itemlist,index) in item.list" :key="index" >
                            <div v-if="itemlist.type===1">
                                <div class="weekDetails">
                                    <div class="habit_t_c" style="line-height: 0.4rem" >
                                        <van-icon name="setting"  size="0.15rem" style="line-height: 0.4rem;"/>
                                        <span style="margin-left: 0.05rem;" >奖励{{itemlist.number}}朵</span>
                                    </div>
                                    <div v-for="(itemcate,indexcate) in itemlist.category" :key="indexcate">
                                        <div v-for="(itemcom,indexcom) in itemcate.number" :key="indexcom">
                                            <div style="margin-left: 0.2rem;color: #666666">
                                                {{itemcom.content}}
                                                （{{itemcate.name}}）
                                                <span style="color:#3770FB " v-if="itemlist.type===1">+{{itemcom.worth}}</span>
                                                <span style="color:#FF6666 " v-else>-{{itemcom.worth}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="float: left;margin-left: 0.2rem;">
                                        <div class="habit_img" v-for="(itemimg,index) in itemlist.imgurl" :key="index" @click="preview(itemlist.imgurl, index)">
                                            <img :src="itemimg">
                                        </div>
                                    </div>
                                    <div>
                                        <van-row >
                                            <van-col span="19" style="margin-top: 0.1rem;">
                                                <div style="padding-left: 0.2rem;color: #999999;font-size: 0.1rem">
                                                    <span>今天 {{itemlist.time}}</span>
                                                    <span style="margin-left: 0.1rem;">{{itemlist.user}}</span>
                                                    <span>  奖  </span>
                                                </div>
                                            </van-col>
                                            <van-col span="5" style="margin-top: 0.1rem;" v-if="itemlist.reviewContent.length===0">
                                                <div >
                                                </div>
                                            </van-col>
                                        </van-row>
                                    </div>
                                    <div class="my_com"  v-if="itemlist.reviewContent.length!=0">
                                        <span style="color:#666666;">我的评论：</span>
                                        <span style="color: #999999;">{{itemlist.reviewContent.content}}</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="itemlist.type===2">
                                <div class="weekDetails">
                                    <div class="habit_t_c" style="line-height: 0.4rem"  >
                                        <van-icon name="setting"  color="red" size="0.15rem" style="line-height: 0.4rem;"/>
                                        <span style="margin-left: 0.05rem;color: red;">扣除{{itemlist.number}}朵</span>
                                    </div>
                                    <div v-for="(itemcate,indexcate) in itemlist.category" :key="indexcate">
                                        <div v-for="(itemcom,indexcom) in itemcate.number" :key="indexcom">
                                            <div style="margin-left: 0.2rem;color: #666666"
                                            >
                                                {{itemcom.content}}
                                                （{{itemcate.name}}）
                                                <span style="color:#3770FB " v-if="itemlist.type===1">+{{itemcom.worth}}</span>
                                                <span style="color:#FF6666 " v-else>-{{itemcom.worth}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="float: left;margin-left: 0.2rem;">
                                        <div class="habit_img" v-for="(itemimg,index) in itemlist.imgurl" :key="index" @click="preview(itemlist.imgurl, index)">
                                            <img :src="itemimg">
                                        </div>
                                    </div>
                                    <div>
                                        <van-row >
                                            <van-col span="19" style="margin-top: 0.1rem;">
                                                <div style="padding-left: 0.2rem;color: #999999;font-size: 0.1rem">
                                                    <span>今天 {{itemlist.time}}</span>
                                                    <span style="margin-left: 0.1rem;">{{itemlist.user}}</span>
                                                    <span>  奖  </span>
                                                </div>
                                            </van-col>
                                            <van-col span="5" style="margin-top: 0.1rem;" v-if="itemlist.reviewContent.length===0">
                                                <!--                    <div class="com_btn" @click="Addcom(itemlist)" >-->
                                                <!--                      评论-->
                                                <!--                    </div>-->
                                                <div></div>
                                            </van-col>
                                        </van-row>
                                    </div>
                                    <div class="my_com"  v-if="itemlist.reviewContent.length!=0">
                                        <span style="color:#666666;">我的评论：</span>
                                        <span style="color: #999999;">{{itemlist.reviewContent.content}}</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="itemlist.type===3">
                                <div class="weekDetails">
                                    <div class="habit_t_c" style="line-height: 0.4rem"  >
                                        <van-icon name="setting"  color="red" size="0.15rem" style="line-height: 0.4rem;"/>
                                        <span style="margin-left: 0.05rem;color: red;">兑换奖品扣除{{itemlist.number}}朵</span>
                                    </div>
                                    <div style="margin-left: 0.2rem">
                                        <div>使用小红花兑换【{{itemlist.mallName}}】</div>
                                        <div v-for="(url,Urlindex) in itemlist.imgurl" :key="Urlindex" @click="preview(itemlist.imgurl, index)">
                                            <div class="ExchangeUrl">
                                                <img :src="url">
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <van-row >
                                            <van-col span="19" style="margin-top: 0.1rem;">
                                                <div style="padding-left: 0.2rem;color: #999999;font-size: 0.1rem">
                                                    <span>今天 {{itemlist.time}}</span>
                                                    <span style="margin-left: 0.1rem;">{{itemlist.user}}</span>
                                                    <span>  奖  </span>
                                                </div>
                                            </van-col>
                                        </van-row>
                                    </div>
                                </div>
                            </div>
                            <div v-if="itemlist.type===4">
                                <div class="weekDetails">
                                    <div class="habit_t_c" style="line-height: 0.4rem"  >
                                        <van-icon name="setting"  color="red" size="0.15rem" style="line-height: 0.4rem;"/>
                                        <span style="margin-left: 0.05rem;color: red;">校长清零小红花共{{itemlist.number}}朵，请再接再厉</span>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="itemlist.type===5">
                                <div class="weekDetails">
                                    <div class="habit_t_c" style="line-height: 0.4rem"  >
                                        <van-icon name="warning-o"  color="red" size="0.15rem" style="line-height: 0.4rem;"/>
                                        <span style="margin-left: 0.05rem;color: red;">{{itemlist.comment[0]}}</span>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
            </div>

            <div class="ac_line" v-if="details.length!=0"></div>

            <div style="float: left;width: 100%;" v-if="training.length>0" >
                <div class="mod_title_b" style="margin: 0.15rem 0.15rem 0 0.15rem">
                    <strong>本周培训班表现</strong>
                </div>
                <div v-for="(item,index) in training" :key="index" >
                    <div class="training_title">{{item.clsName}}</div>
                    <div class="t2_box_con" style="padding:0px 10px 0px;">
                        <div :id="'Training'+index" style="width: 100%; height: 2.2rem;"></div>
                    </div>
                </div>
            </div>

            <div class="ac_line" v-if="training.length>0"></div>

            <div style="padding: 0.15rem;margin-top:0.1rem" v-if=" studentComment!='' || studentComment.length>0" >
                <div style="float:left;width: 100%;margin-top:0.15rem">
                    <span style="font-weight: 700">本周学生在“{{test.schoolName}}”的表现</span>
                    <pre style="white-space: pre-wrap;
                                    word-wrap: break-word;
                        margin:0">
                        <div style="margin: 0.1rem 0;word-wrap:break-word; word-break:break-all;"  v-html="studentComment.comment">&nbsp;&nbsp;</div>
                        </pre>
                    <div style="text-align: right">-
                        <span style="font-weight: 700">{{studentComment.userName}}</span>
                        教师点评
                    </div>
                </div>
                <div style="margin: 0.1rem 0;font-weight: 700">
                    家长给老师点评的留言
                </div>

                <div v-if="parentReply.length===0" style="margin: 0.1rem 0">家长尚未留言 </div>
                <pre style="white-space: pre-wrap;
                                    word-wrap: break-word;
                        margin:0"
                     v-else>
                        <div >&nbsp;&nbsp;{{parentReply.reply}}</div>
                    </pre>
            </div>
            <div style="height: 0.8rem">&nbsp;</div>
        </div>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import {  CellGroup } from 'vant';
    import {  Cell } from 'vant';
    import { Button } from 'vant';
    import { Progress } from 'vant';
    import { Row, Col } from 'vant';
    import { Icon } from 'vant';
    import { Toast } from 'vant';
    import { Field } from 'vant';
    import { Rate } from 'vant';
    import { Dialog } from 'vant';
    import { ImagePreview } from 'vant';

    import Footer from '../../../common/footer-operate-btn'
    import { HistoryStuMes } from '@/api/parent/briefing';
    import { Addreview } from '@/api/parent/briefing';

    import echarts from 'echarts'
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                lunchtap:true,
                dinnertap:false,
                showC:false,
                showL:false,
                // 当当周数据加载完才能切换其他周数
                continuity:true,

                dateaddse:[],
                size:18,
                stuId:'5974',
                year:new Date().getFullYear(),
                value:3,
                valuese:3,
                test:[],
                safflower:[],
                safflowerChart:[],
                siestaDining:[],

                siestaWeekValue:[],
                dinnerWeekValue:[],
                lunchWeekValue:[],

                Missingdinner:[],

                siestaDininglist:[],
                lunchWeekValuelist:[],
                dinnerWeekValuelist:[],

                workname:[],
                work:[],
                details:[],
                evaluation:[],
                studentComment:[],
                comment:[],
                parentReply:[],

                attend:[],
                date:[],

                arr:[{title:'提交',type:1}],
                arrse:[{title:'已提交',type:1}],

                from:'template',
                template_id:this.$route.params.template_id,
                week:this.$route.params.week,

                sms:'',
                content:'',
                show:false,

                safflowerId:'',

                // status:'',
                id:'',
                SendScore:[],
                stop:true,

                // 切换周报日期
                lastid:0,
                newxid:0,
                weekid:0,

                // 午休午餐晚餐模块表格，无记录时延长表格
                SiestaLine:'',
                LunchLine:'',
                DinnerLine:'',
                result:[],
                lunchresult:[],
                dinnerresult:[],
                // 本周作业情况折线图拐点颜色设置
                lineCole1: [{ gt: -1, lte: 0, color: "black" }],

                HistoryStuMes:[],
                StopChange:true,

                // 周报培训班
                training:[],
                trainingSe:[],
                // 本周奖励红花数
                integral:[]
            }
        },
        // 判断无记录行高
        computed:{
            lineProgress(){
                const style = {}
                style.lineHeight = this.SiestaLine*0.3+ (this.SiestaLine-2)*0.025 +0.03+'rem';
                return style
            },
            LunchlineProgress(){
                const style = {}
                style.lineHeight = this.LunchLine*0.3+ (this.LunchLine-2)*0.025 +0.03+'rem';
                return style
            },
            DinnerlineProgress(){
                const style = {}
                style.lineHeight = this.DinnerLine*0.3+ (this.DinnerLine-2)*0.025 +0.03+'rem';
                return style
            }
        },
        components: {
            Footer:Footer,
            [NavBar.name]: NavBar,
            [Progress.name]: Progress,
            [Row.name]: Row,
            [Col.name]: Col,
            [Rate.name]: Rate,
            [Icon.name]: Icon,
            [Toast.name]: Toast,
            [Field.name]: Field,
            [Button.name]: Button,
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Dialog.name]: Dialog,
            [ImagePreview.name]: ImagePreview,
            //someComponent
        },
        methods:{
            trainingEcharts(){
                // 培训班折线图对应优良点评转为数字
                for(let tl =0;tl<this.training.length;tl++){
                    for(let tw = 0;tw<this.training[tl].weekValue.length;tw++){
                        if(this.training[tl].weekValue[tw] ==='差'){
                            this.training[tl].weekValue[tw] = 1
                        }
                        else if(this.training[tl].weekValue[tw] ==='中'){
                            this.training[tl].weekValue[tw] = 2
                        }else if(this.training[tl].weekValue[tw] ==='良'){
                            this.training[tl].weekValue[tw] = 3
                        }
                        else if(this.training[tl].weekValue[tw] ==='优'){
                            this.training[tl].weekValue[tw] = 4
                        }
                        else if(this.training[tl].weekValue[tw] ===''){
                            this.training[tl].weekValue[tw]  =  0
                        }
                    }
                    let timer = setTimeout(()=>{

                        let  Training = echarts.init(document.getElementById("Training"+tl));
                        let option = {
                            /* 线条颜色，可设置多个颜色 */
                            color: ['black'],
                            /* 图像四周边距设置 */
                            grid:{
                                left:30,
                                top:30,
                                right:0,
                                bottom:60
                            },
                            /* 鼠标悬浮时显示数据 */
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            xAxis: {
                                type: 'category',
                                data: this.dateaddse,
                                //设置轴线的属性
                                axisLine:{
                                    lineStyle:{
                                        color:'black',
                                    }
                                },
                                //调整x轴的lable
                                axisLabel:{
                                    formatter: function(params) {
                                        var newParamsName = '';// 最终拼接成的字符串
                                        var paramsNameNumber = params.length;// 实际标签的个数
                                        var provideNumber = 2;// 每行能显示的字的个数
                                        // var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                                        if (paramsNameNumber > provideNumber) {

                                            for (var p = 0; p < 2; p++) {
                                                var tempStr = '';// 表示每一次截取的字符串
                                                var start = p * (provideNumber) ;// 开始截取的位置
                                                var end = start + provideNumber ;// 结束截取的位置
                                                // 此处特殊处理最后一行的索引值
                                                if (p == 2 - 1) {
                                                    // 最后一次不换行
                                                    tempStr = params.substring(start, paramsNameNumber);
                                                } else {
                                                    // 每一次拼接字符串并换行
                                                    tempStr = params.substring(start, end) + '\n';
                                                }
                                                newParamsName += tempStr;// 最终拼成的字符串
                                            }
                                        } else {
                                            // 将旧标签的值赋给新标签
                                            newParamsName = params;
                                        }
                                        //将最终的字符串返回
                                        return newParamsName
                                    },
                                    textStyle:{
                                        fontSize:10 // 让字体变小
                                    }
                                },
                            },
                            yAxis: {
                                type: 'value',
                                // 控制网格线是否显示
                                splitLine: {
                                    show: false,
                                    //  改变轴线颜色
                                    lineStyle: {
                                        // 使用深浅的间隔色
                                        color: ['#132a6e']
                                    }
                                },
                                //设置轴线的属性
                                axisLine:{
                                    lineStyle:{
                                        color:'black',
                                    }
                                },
                                axisLabel:{
                                    formatter: function (value) {
                                        var texts = [];
                                        if (value ===1){
                                            texts.push('差');
                                        }
                                        else if (value==2) {
                                            texts.push('中');
                                        }
                                        else if (value==3) {
                                            texts.push('良');
                                        }
                                        else if(value==4){
                                            texts.push('优');
                                        } else if(value==0){
                                            texts.push('无');
                                        }
                                        return texts;
                                    }
                                },
                            },
                            visualMap: {
                                show: false,
                                dimension: 0,
                                pieces: this.lineCole1
                            },
                            /* 数据配置，若有多条折线则在数组中追加{name: , data: } */
                            series: [{
                                // name:'显示/隐藏',
                                barCategoryGap:'80%',
                                // 培训班点评数值
                                data: this.training[tl].weekValue,
                                type: 'line',
                                lineStyle:{
                                    normal:{
                                        width:1,
                                        color:'#BFBFBF'
                                    }
                                },
                                symbol: 'square',
                                // 设置折点大小
                                symbolSize: 8,
                                // 设置为光滑曲线
                                smooth: false,
                            }]
                        };
                        Training.setOption(option);

                    },1000)


                }
                console.log(this.training)
            },

            // 切换日期
            changeweek(type){
                if(this.StopChange === true){
                    this.StopChange = false
                    if(type === 1){
                        this.weekid = this.lastid
                    }
                    if(type === 2){
                        this.weekid = this.newxid
                    }
                    this.GetPWeekBriefing()
                }
            },
            dinnerboxheight(){
                // 晚餐其他表格比较拉长比例
                var AllDinList = [];
                for(let d = 0;d<7;d++) {
                    AllDinList.push(this.dinnerWeekValuelist[d])
                    if(AllDinList[d].length < this.dinnerresult.length){
                        document.getElementById("dinner"+d+'0').style.lineHeight="0.63rem"
                    }
                }
            },
            lunchboxheight(){
                // 午餐其他表格比较拉长比例
                var AllLunchList = [];
                for(let l = 0;l<7;l++) {
                    AllLunchList.push(this.lunchWeekValuelist[l])
                    if(AllLunchList[l].length < this.lunchresult.length){
                        document.getElementById("lunch"+l+'0').style.lineHeight="0.63rem"
                    }
                }
            },
            //图片预览
            preview(imgArr, index) {
                ImagePreview({
                    images: imgArr,
                    startPosition: index ? index : 0,
                    lazyLoad: false
                });
            },
            CheckRank(){
                this.$router.push({name:'SafflowerRanking'})
            },
            // 红花奖惩评论
            pushcom(sms){
                if(sms.length>0){
                    this.content = sms
                    this.show=false
                    Addreview(this.safflowerId,this.content)
                        .then(res=>{
                            if (res.status === 200){
                                Toast.success("提交成功！");
                                let timer = setTimeout(()=>{
                                    clearTimeout(timer);
                                },2800)
                                this.GetPWeekBriefing()
                            }else {
                                Toast.fail("提交失败！")
                            }
                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }else{
                    Toast.fail('评论不能为空')
                }
            },
            Addcom(itemlist){
                this.safflowerId = itemlist.safflowerId
                this.show=true
            },
            // 本周作业情况X轴汉字转换显示
            echartsdate(){
                var dateaddse=[];
                for (let cd of this.date  ) {
                    dateaddse.push(cd.weekName+cd.dateSrc)
                }
                this.dateaddse = dateaddse
                for (let ca of this.work.weekValue  ) {
                    if(ca==='差'){
                        let bad = 1
                        this.workname.push(bad)
                    }else if(ca==='中'){
                        let nor = 2
                        this.workname.push(nor)
                    }else if(ca==='良'){
                        let mid = 3
                        this.workname.push(mid)
                    }else if(ca==='优'){
                        let good = 4
                        this.workname.push(good)
                    }else if(ca===''){
                        let not = 0
                        this.workname.push(not)
                    }
                }
                // 作业情况拐点颜色设置
                for (let x = 1; x < this.workname.length; x++) {
                    if (this.workname[x] < this.workname[x - 1]) {
                        this.lineCole1.push({
                            gt: (x - 1),
                            lte: x,
                            color: "red"
                        });
                    }
                    if (this.workname[x] > this.workname[x - 1]){
                        this.lineCole1.push({
                            gt: (x - 1),
                            lte: x,
                            color: "blue"
                        });
                    }
                    if (this.workname[x] === this.workname[x - 1]) {
                        this.lineCole1.push({
                            gt: (x - 1),
                            lte: x,
                            color: "black"
                        });
                    }
                }
            },
            jump(){
                this.$router.push({name:'OtherWork'})
            },

            // 获取周报首页数据
            GetPWeekBriefing(){
                this.$loading()

                HistoryStuMes(this.template_id,this.weekid)
                        .then(res => {
                            this.$loadingHide();
                            // if(this.status === 1){
                            this.studentComment = res.data.data.studentComment
                            // this.comment = res.data.data.studentComment.comment
                            this.parentReply = res.data.data.studentComment.parentReply

                            var i
                            var result = ""
                            var c
                            for(i=0;i<this.comment.length;i++){
                                c = this.comment.substr(i, 1);
                                if ( c == "\n")
                                    result = result + "<br/>";
                                else if (c != "\r")
                                    result = result + c;
                            }
                            this.comment = result
                            console.log(result)
                            // }
                            this.test = res.data.data;
                            this.safflower = res.data.data.safflower
                            this.safflowerChart = res.data.data.safflower.safflowerChart
                            this.details = res.data.data.safflower.details
                            this.date = res.data.data.date
                            this.attend = res.data.data.attend
                            this.siestaDining = res.data.data.siestaDining

                            this.siestaWeekValue = res.data.data.siestaDining.siestaWeekValue
                            this.lunchWeekValue = res.data.data.siestaDining.lunchWeekValue
                            this.dinnerWeekValue = res.data.data.siestaDining.dinnerWeekValue

                            this.work = res.data.data.work
                            this.evaluation = res.data.data.evaluation
                            // this.week = res.data.data.week
                            this.id = res.data.data.id

                            this.lastid = res.data.data.lastId
                            this.newxid = res.data.data.nextId

                            if(this.lastid!="" || this.lastid.length>0){
                                this.showL = false
                            }else{
                                this.showL = true
                            }

                            if(this.newxid!="" || this.lastid.length>0){
                                this.showC = false
                            }else{
                                this.showC = true
                            }


                            // 周报培训班折线图信息
                            this.training = res.data.data.training.classs
                            // 本周奖励红花数
                            this.trainingEcharts()
                            this.echartsdate()

                            // 提取午休状态数组
                            var siestaDininglist=[];
                            for (let sv of this.siestaWeekValue  ) {
                                siestaDininglist.push(sv.status)
                            }
                            this.siestaDininglist = siestaDininglist
                            // 提取午餐状态数组
                            var lunchWeekValuelist=[];
                            for (let sv of this.lunchWeekValue  ) {
                                lunchWeekValuelist.push(sv.status)
                            }
                            this.lunchWeekValuelist = lunchWeekValuelist
                            // 当无晚餐数据时隐藏晚餐模块/提取晚餐状态数组
                            let DinnerLIst= [];
                            for (let item of this.dinnerWeekValue){
                                DinnerLIst.push(item.status)
                            }
                            this.dinnerWeekValuelist = DinnerLIst
                            this.Missingdinner = DinnerLIst[0]+DinnerLIst[1]+DinnerLIst[2]+DinnerLIst[3]+DinnerLIst[4]+DinnerLIst[5]+DinnerLIst[6]
                            // 提取午休状态中不为空的部分
                            var newlist = [];
                            var Allnewlist = [];
                            for(var a = 0;a<7;a++) {
                                if(siestaDininglist[a]!=null && siestaDininglist[a]!=''&& siestaDininglist[a]!=undefined && siestaDininglist[a].length!=undefined) {
                                    newlist.push(siestaDininglist[a])
                                }
                                Allnewlist.push(siestaDininglist[a])
                            }
                            // 提取午餐状态中不为空的部分
                            var LunchList = [];
                            var AllLunchList = [];
                            for(var l = 0;l<7;l++) {
                                if(lunchWeekValuelist[l]!=null && lunchWeekValuelist[l]!=''&& lunchWeekValuelist[l]!=undefined && lunchWeekValuelist[l].length!=undefined) {
                                    LunchList.push(lunchWeekValuelist[l])
                                }
                                AllLunchList.push(lunchWeekValuelist[l])
                            }
                            // 提取晚餐状态中不为空的部分
                            var DinList = [];
                            var AllDinList = [];
                            for(var d = 0;d<7;d++) {
                                if(DinnerLIst[d]!=null && DinnerLIst[d]!=''&& DinnerLIst[d]!=undefined && DinnerLIst[d].length!=undefined) {
                                    DinList.push(DinnerLIst[d])
                                }
                                AllDinList.push(DinnerLIst[d])
                            }
                            // 无记录行高比例
                            // 比较并提取午休状态最多的数组（length）
                            var lineO = 0
                            var lineT = 0
                            var lineE = 0
                            for(let a =0;a<newlist.length;a++){
                                if(newlist.length === 1){
                                    this.result = newlist[0]
                                }
                                for(let c= 0;c<a; c++){
                                    if(newlist[a].length > newlist[c].length){
                                        this.result = newlist[a]
                                    }if(newlist[c].length > newlist[a].length){
                                        this.result = newlist[c]
                                    }if(newlist[a].length === newlist[c].length){
                                        this.result = newlist[a]
                                    }if(newlist.length === 1){
                                        this.result = newlist[0]
                                    }
                                }
                            }
                            for(let a =0;a<Allnewlist.length;a++){
                                if(Allnewlist[a].length < this.result.length && Allnewlist[a].length === 1){
                                    let timerl = setTimeout(()=>{
                                        document.getElementById("siest"+a+"0").style.lineHeight = "0.63rem"
                                    },10)
                                }
                            }
                            // 比较并提取午餐状态最多的数组（length）
                            var lunch0 = 0
                            var lunch1 = 0
                            // var lunch2 = 0
                            for(let a =0;a<LunchList.length;a++){
                                if(LunchList.length === 1){
                                    this.lunchresult = LunchList[0]
                                }
                                for(let c= 0;c<a; c++){
                                    if(LunchList[a].length > LunchList[c].length){
                                        this.lunchresult = LunchList[a]
                                    }if(LunchList[c].length > LunchList[a].length){
                                        this.lunchresult = LunchList[c]
                                    }if(LunchList[a].length === LunchList[c].length){
                                        this.lunchresult = LunchList[a]
                                    }
                                }
                            }
                            for(let a =0;a<AllLunchList.length;a++){
                                if(AllLunchList[a].length < this.lunchresult.length && AllLunchList[a].length === 1){
                                    let timerl = setTimeout(()=>{
                                        document.getElementById("lunch"+a+"0").style.lineHeight = "0.63rem"
                                    },10)
                                }
                            }
                            // 比较并提取晚餐状态最多的数组（length）
                            var dinner0 = 0
                            var dinner1 = 0
                            for(let a =0;a<DinList.length;a++){
                                if(DinList.length === 1){
                                    this.dinnerresult = DinList[0]
                                }
                                for(let c= 0;c<a; c++){
                                    if(DinList[a].length > DinList[c].length){
                                        this.dinnerresult = DinList[a]
                                    }if(DinList[c].length > DinList[a].length){
                                        this.dinnerresult = DinList[c]
                                    }if(DinList[a].length === DinList[c].length){
                                        this.dinnerresult = DinList[a]
                                    }
                                }
                            }
                            console.log(this.dinnerresult)
                            for(let a =0;a<AllDinList.length;a++){
                                if(AllDinList[a].length < this.dinnerresult.length && AllDinList[a].length === 1){
                                    let timerl = setTimeout(()=>{
                                        document.getElementById("dinner"+a+"0").style.lineHeight = "0.63rem"
                                    },10)
                                }
                            }


                            // 午休模块无记录时的高度比例
                            for(let a =0;a<this.result.length;a++){
                                if(this.result[a].length <= 6){
                                    lineO +=1
                                }
                                if(this.result[a].length > 6 && this.result[a].length <13){
                                    lineT +=2
                                }
                            }
                            this.SiestaLine = lineO+lineT+lineE
                            // 午餐模块无记录时的高度比例
                            for(let a =0;a<this.lunchresult.length;a++){
                                if(this.lunchresult[a].length <= 6){
                                    lunch0 +=1
                                }
                                if(this.lunchresult[a].length > 6 && this.lunchresult[a].length <13){
                                    lunch1 +=2
                                }
                            }
                            this.LunchLine = lunch0+lunch1
                            // console.log(this.LunchLine + '-'+lunch0+'-'+lunch1+'-'+lunch2)
                            // 晚餐模块无记录时的高度比例
                            for(let a =0;a<this.dinnerresult.length;a++){
                                if(this.dinnerresult[a].length <= 6){
                                    dinner0 +=1
                                }
                                if(this.dinnerresult[a].length > 6 && this.dinnerresult[a].length <13){
                                    dinner1 +=2
                                }

                            }
                            this.DinnerLine = dinner0+dinner1
                            // console.log(this.DinnerLine + '-'+dinner0+'-'+dinner1+'-'+dinner2)



                            // 6个习惯表现雷达图
                            let radarMaxValue =this.safflower.category.reduce((last, item) => {
                                return last > item.number ? last : item.number
                            }, 1)
                            let radarIndicator = this.safflower.category.map(item => ({
                                name: `${item.name}\n${item.number > 0 ? parseInt(item.number / radarMaxValue * 100) : 0}%`,
                                max: 100
                            }))
                            let radarData = this.safflower.category.map(item => item.number > 0 ? parseInt(item.number / radarMaxValue * 100) : 0)
                            let bread = document.getElementById('SafflowerMes');
                            let myChart = this.echarts.init(bread);
                            myChart.setOption({
                                radar: [
                                    {
                                        indicator: radarIndicator,
                                        center: ['50%','50%'],
                                        radius: 90
                                    },
                                ],
                                series: [
                                    {
                                        // symbol: "none", // 去掉图表中各个图区域的边框线拐点
                                        type: 'radar',
                                        tooltip: {
                                            trigger: 'item'
                                        },
                                        itemStyle: {
                                            normal: {
                                                color:'#0056ff',
                                                areaStyle: {
                                                    type: 'default'
                                                },
                                                lineStyle: {
                                                    color:"#0056ff" // 图表中各个图区域的边框线颜色
                                                },
                                            }
                                        },
                                        data: [
                                            {
                                                value: radarData,
                                                areaStyle: {
                                                    normal: {
                                                        color: '#6699FF'
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            })

                            // 本周作业情况折线图
                            let  rllfx = echarts.init(document.getElementById("rllfx"));
                            let option = {
                                /* 线条颜色，可设置多个颜色 */
                                color: ['black'],
                                /* 图像四周边距设置 */
                                grid:{
                                    left:30,
                                    top:30,
                                    right:0,
                                    bottom:60
                                },
                                /* 鼠标悬浮时显示数据 */
                                tooltip : {
                                    trigger: 'axis',
                                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    data: this.dateaddse,
                                    //设置轴线的属性
                                    axisLine:{
                                        lineStyle:{
                                            color:'black',
                                        }
                                    },
                                    //调整x轴的lable
                                    axisLabel:{
                                        formatter: function(params) {
                                            var newParamsName = '';// 最终拼接成的字符串
                                            var paramsNameNumber = params.length;// 实际标签的个数
                                            var provideNumber = 2;// 每行能显示的字的个数
                                            // var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                                            if (paramsNameNumber > provideNumber) {

                                                for (var p = 0; p < 2; p++) {
                                                    var tempStr = '';// 表示每一次截取的字符串
                                                    var start = p * (provideNumber) ;// 开始截取的位置
                                                    var end = start + provideNumber ;// 结束截取的位置
                                                    // 此处特殊处理最后一行的索引值
                                                    if (p == 2 - 1) {
                                                        // 最后一次不换行
                                                        tempStr = params.substring(start, paramsNameNumber);
                                                    } else {
                                                        // 每一次拼接字符串并换行
                                                        tempStr = params.substring(start, end) + '\n';
                                                    }
                                                    newParamsName += tempStr;// 最终拼成的字符串
                                                }
                                            } else {
                                                // 将旧标签的值赋给新标签
                                                newParamsName = params;
                                            }
                                            //将最终的字符串返回
                                            return newParamsName
                                        },
                                        textStyle:{
                                            fontSize:10 // 让字体变小
                                        }
                                    },
                                },
                                yAxis: {
                                    type: 'value',
                                    // 控制网格线是否显示
                                    splitLine: {
                                        show: false,
                                        //  改变轴线颜色
                                        lineStyle: {
                                            // 使用深浅的间隔色
                                            color: ['#132a6e']
                                        }
                                    },
                                    //设置轴线的属性
                                    axisLine:{
                                        lineStyle:{
                                            color:'black',
                                        }
                                    },
                                    axisLabel:{
                                        formatter: function (value) {
                                            var texts = [];
                                            if (value ===1){
                                                texts.push('差');
                                            }
                                            else if (value==2) {
                                                texts.push('中');
                                            }
                                            else if (value==3) {
                                                texts.push('良');
                                            }
                                            else if(value==4){
                                                texts.push('优');
                                            } else if(value==0){
                                                texts.push('无');
                                            }
                                            return texts;
                                        }
                                    },
                                },
                                visualMap: {
                                    show: false,
                                    dimension: 0,
                                    pieces: this.lineCole1
                                },
                                /* 数据配置，若有多条折线则在数组中追加{name: , data: } */
                                series: [{
                                    // name:'显示/隐藏',
                                    barCategoryGap:'80%',
                                    data: this.workname,
                                    type: 'line',
                                    lineStyle:{
                                        normal:{
                                            width:1,
                                            color:'#BFBFBF'
                                        }
                                    },
                                    symbol: 'square',
                                    // 设置折点大小
                                    symbolSize: 8,
                                    // 设置为光滑曲线
                                    smooth: false,
                                }]
                            };
                            rllfx.setOption(option);
                            // 习惯表现柱形图
                            var Lflower = echarts.init(document.getElementById('light'));
                            // 获取接口单独的值并赋予一个数组里
                            var get=[];
                            for (let gf of this.safflowerChart  ) {
                                get.push(gf.rewardNumber)
                            }
                            var loss=[];
                            for (let lf of this.safflowerChart  ) {
                                loss.push(lf.deductNumber)
                            }
                            // 指定图表的配置项和数据
                            var optionse = {
                                grid: {
                                    top:'20%',
                                    bottom:'30%',
                                    left:'5%',
                                    right: '0%',  //距离右侧边距
                                },
                                title: {
                                    text: '',
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                    }
                                },
                                legend: {
                                    textStyle:{
                                        fontSize:12,
                                        color:'#fff'
                                    },
                                    data:['']
                                },
                                //                    取消Y轴刻度值
                                xAxis: {
                                    name:'日期',
                                    splitLine:{
                                        show:false
                                    },
                                    axisLine: {
                                        lineStyle: {
                                            type: 'solid',
                                            color: '#BFBFBF',//左边线的颜色
                                            width:'1'//坐标线的宽度
                                        }
                                    },
                                    axisLabel:{
                                        formatter: function(params) {
                                            var newParamsName = '';// 最终拼接成的字符串
                                            var paramsNameNumber = params.length;// 实际标签的个数
                                            var provideNumber = 2;// 每行能显示的字的个数
                                            // var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                                            if (paramsNameNumber > provideNumber) {

                                                for (var p = 0; p <2; p++) {
                                                    var tempStr = '';// 表示每一次截取的字符串
                                                    var start = p * (provideNumber );// 开始截取的位置
                                                    var end = start + provideNumber;// 结束截取的位置
                                                    // 此处特殊处理最后一行的索引值
                                                    if (p == 2 - 1 ) {
                                                        // 最后一次不换行
                                                        tempStr = params.substring(start, paramsNameNumber);
                                                    } else {
                                                        // 每一次拼接字符串并换行
                                                        tempStr = params.substring(start, end) + '\n';
                                                    }
                                                    newParamsName += tempStr;// 最终拼成的字符串
                                                }
                                            } else {
                                                // 将旧标签的值赋给新标签
                                                newParamsName = params;
                                            }
                                            //将最终的字符串返回
                                            return newParamsName
                                        },
                                        textStyle:{
                                            fontSize:9 // 让字体变小
                                        }
                                    },
                                    data:this.dateaddse
                                },
                                yAxis: {
                                    name:'朵数',
                                    splitLine :{
                                        lineStyle:{
                                            type:'dashed'
                                        }
                                    },
                                    axisLabel: {
                                        show: false
                                    },
                                    axisLine: {
                                        lineStyle: {
                                            type: 'solid',
                                            color: '#BFBFBF',//左边线的颜色
                                            width:'1'//坐标线的宽度
                                        }
                                    },
                                },
                                series: [
                                    {
                                        name: '奖励',
                                        type: 'bar',
                                        barGap: 0,
                                        barCategoryGap:'30%',
                                        data: get,
                                        color: ['#0099FF'],
                                        // data: likevalue,
                                        itemStyle : {
                                            normal: {
                                                show: true,
                                                position: 'outside',

                                                textStyle: {
                                                    color: '#bb0004'
                                                }
                                            }
                                        },
                                        // barWidth : 23
                                    }
                                    , {
                                        name: '扣除',
                                        color:['#FF6666'],
                                        barCategoryGap:'30%',
                                        type: 'bar',
                                        data: loss,
                                        // data: likevalue,
                                        itemStyle : {
                                            normal : {
                                            },
                                        },
                                        // barWidth : 23
                                    }
                                ],
                                dataZoom: [//给x轴设置滚动条
                                    //下面这个属性是里面拖到
                                    {
                                        type: 'inside',
                                        show: true,
                                        xAxisIndex: [0],
                                        startValue:0,
                                        endValue:6
                                    },
                                ],
                            };
                            // 使用刚指定的配置项和数据显示图表。
                            Lflower.setOption(optionse);
                            this.StopChange = true
                        }).catch(() => {
                        throw new Error("获取周报页面异常!")
                    })

                // 午餐晚餐表格只有一项状态时的表格拉长
                let timer = setTimeout(()=>{
                    this.dinnerboxheight()
                },3000)
                let timerl = setTimeout(()=>{
                    this.lunchboxheight()
                },3000)
            },
            onClickLeft(){
                this.$router.back()
            }
        },
        mounted(){
            this.GetPWeekBriefing()
        },
        beforeRouteLeave(to,from,next){
            if(to.name==='SafflowerRanking'){
                if(!from.meta.keepAlive){
                    from.meta.keepAlive=true;//进入排行版时缓存周报页面
                }
                next()
            }else{
                // from.meta.keepAlive=false;
                // this.$destroy();//
                // next();//
                this.$router.go(0)
                // 退出周报页面时刷新
            }
        },
    }
</script>

<style scoped>
    *{
        word-wrap:break-word
    }
    .van-nav-bar__title{
        max-width: 100%;
    }
    .body{
        font-size: 62.5%;
        font-size: 0.14rem;
        float: left;
        width: 100%;
    }
    .ac_line{
        height: 0.1rem;
        background: #F3F7F8;
        float: left;
        width: 100%;
    }
    .top_mes{
        margin: 0.15rem 0;
        font-size: 0.14rem;
        float: left;
        width: 100%;
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
    .attendance_mod{
        float: left;
        width: 100%;
        margin-bottom: 0.15rem;
    }
    .attendance_box{
        text-align: center;
        height: 0.5rem;
        width: 0.7rem;
        border: solid 1px #dcdcdc;
        margin: 0.01rem;
    }
    .lunchmes_box{
        text-align: center;
        line-height: 0.3rem;
        margin: 0.01rem;
        border: solid 1px #dcdcdc;
    }
    .lunchmes_box_se{
        text-align: center;
        line-height: 0.3rem;
        border-top: solid 1px #dcdcdc;
        border-right: solid 1px #dcdcdc;
    }
    .mod_title_b{
        font-size: 0.16rem;
        border-left: solid 2px #3770FB;
        padding-left: 0.05rem;
        margin: 0.15rem 0 0.15rem 0.15rem;
    }
    .habit_score{
        font-size: 0.32rem;
        color: #6699FF;
    }
    .habit_score_se{
        font-size: 0.24rem;
        color: #6699FF;
    }
    .habit_t_c{
        color: #6699FF;
    }
    .habit_t_c_r{
        color: #FF6666;
    }
    .habit_score_title{
        font-size: 0.16rem;
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
    .get_flower_mes{
        margin: 0 0.15rem;
        border-bottom: 1px solid rgb(238, 238, 238);
    }
    .ranking_button{
        color: #84C225;
        line-height: 0.25rem;
        border: solid 1px #84C225;
        border-radius: 5px;
    }
    .lunch_box{
        border-top: solid 1px #dcdcdc;
        border-right: solid 1px #dcdcdc;
        height: 0.3rem;
        line-height: 0.3rem
    }
    .lunch_box_out{
        float:left;
        width: 1rem;
        /*border-bottom: solid 1px #dcdcdc;*/
    }
    .noonbreak_mod{
        float: left;
    }
    .lunch_mod{
        float: left;
    }
    .change_dinner{
        text-align: right;
        /* line-height: 0.4rem; */
        font-size: 0.1rem;
        color: #999999;
        margin: 0.15rem ;
    }
    .noonbreak_mod .lunch_box_out:nth-child(1) .lunch_box_l_b{
        border-left: solid 1px #dcdcdc;
    }
    .lunch_mod .lunch_box_out:nth-child(1) .lunch_box_l_b{
        border-left: solid 1px #dcdcdc;
    }
    .lunch_mod .lunch_box_out:nth-child(1) .date_box{
        border-left: solid 1px #dcdcdc;
    }
    .noonbreak_mod  .lunch_box_out:nth-child(1) .date_box{
        border-left: solid 1px #dcdcdc;
    }
    .date_box{
        /*border-top: solid 1px #dcdcdc;*/
        border: solid 1px #dcdcdc;
        height: 0.5rem;
        margin:0.01rem;
        font-weight: 700;
        padding: 0.05rem 0;

    }
    .top_title{
        color: #84C225;
        line-height:0.5rem ;
        font-size: 0.16rem;
        text-align: center;
        font-weight: 700;
    }
    .rolling_box{
        /*width: 3rem;*/
        overflow-x: scroll;/* 定义超出此盒子滚动 */
        overflow-y: hidden;
        border: solid 1px #dcdcdc;
        padding: 0.01rem;
        margin: 0 0.05rem;
    }
    .rolling_box_se{
        width: 5.95rem;
    }
    .thisweek_rolling{
        overflow-x: scroll;
        overflow-y: hidden;
        width: 3.75rem;
    }
    .habit_mod{
        float: left;
        width: 100%;
    }
    .lunch_box_bor{
        width: 0.45rem;
        height: 0.3rem;
        /*border: solid 1px #DCDCDC;*/
        border-left: solid 1px #DCDCDC;
        float:left;
    }
    .lunch_box_outbor{
        float:left;
        /*border: solid 1px;*/
        border-bottom: solid 1px #DCDCDC;
        border-right: solid 1px #DCDCDC;
    }
    .lunch_for .lunch_forse:nth-child(1) .lunch_box_outbor
    {
        border-top: solid 1px #DCDCDC;

    }
    .my_com{
        padding-left: 0.2rem;
        margin-top: 0.15rem;
        padding-top: 0.15rem;
        border-top: solid 1px #EEEEEE;
        word-break:break-all
    }
    .test_box{
    }
    .test_outbox{
        float: left;
        width:1rem
    }
    .test_outbox_none{
        height: 0.3rem;
        border: solid;
        float: left;
        width:0.7rem
    }
    .com_btn{
        border: solid 1px #84C225;
        color: #84C225;
        text-align: center;
        border-radius: 3px;
        line-height: 0.2rem
    }
    .ExchangeUrl{
        width: 0.7rem;
        height: 0.5rem;
        margin-top: 0.1rem;
    }
    .ExchangeUrl img{
        width: 100%;
        height: 100%;
    }
    .title_date{
        line-height: 0.5rem;
        text-align: center;
        font-weight: 700;
        font-size:0.14rem
    }
    .showC{
        display: none;
    }
    .showL{
        display: none;
    }
    .training_title{
        text-align: center;
        margin: 0.1rem 0;
        font-weight: 700;
        color: #6b5bc3;
    }
    .weekDetails{
        padding-bottom: 0.15rem
    }
</style>
