<template>
    <div class="body">
        <div>
            <van-nav-bar
                    title="习惯表现"
                    @click-left="onClickLeft"
            />

        </div>
        <div class="habit">
            <div class="title">习惯表现</div>

            <div class="top_number_div">
                <van-icon name="setting" /><span class="all_number">{{habit.safflowerNumber}}</span>
                <div class="habit_title">习惯表现奖励</div>
            </div>

            <div class="echarts" id="restudents" :style="{width: '100%', height: '2rem'}" style="margin: 0 auto;"></div>

            <div class="top_number_div">
                <van-row>
                    <van-col span="8" v-for="(item,index) in habit.categorys" :key="index">
                        <van-icon name="setting" /><span class="list_number">{{item.number}}</span>
                        <div>{{item.name}}</div>
                    </van-col>
                </van-row>
            </div>

            <div  class="comment_div" >

                <div style="margin-bottom: 0.1rem;font-weight: 700">
                    <span>{{comments.date}}:</span>
                    <span style="color: red;margin-left: 0.1rem;" v-if="comments.type===1">+{{comments.number}}</span>
                    <span style="color: #1890FF;margin-left: 0.1rem" v-if="comments.type===2">-{{comments.number}}</span>
                </div>

                <div v-for="(item,index) in comments.categorys" :key="index" >
                    <div >
                        <div class="com_left">[{{item.categoryName}}]：</div>
                        <div v-for="(itemse,index) in item.comment" :key="index" class="com_right">
                            <span>{{itemse.content}}</span>
                            <span style="color: red;margin-left: 0.1rem" v-if="comments.type===1">+{{itemse.worth}}</span>
                            <span style="color: #1890FF;margin-left: 0.1rem" v-if="comments.type===2">-{{itemse.worth}}</span>
                        </div>
                    </div>
                </div>

            </div>

            <div style="color:rgb(55, 112, 251);text-align: right;font-size:0.12rem">
                <span @click="MoreComments" class="check_more">查看更多></span>
            </div>


        </div>

        <div class="ac_line"></div>

        <div style="margin-top: 0.15rem;" class="rank_div">
            <van-tabs type="card" @change="getMes()" v-model="active" >
                <van-tab title="总排行">
                    <div style="margin: 0 0.15rem;">
                        <van-row style="text-align: center;line-height: 0.5rem;">
                            <van-col span="10">名次</van-col>
                            <van-col span="7"><span style="margin: 0 0.05rem;">年级</span></van-col>
                            <van-col span="7">总红花数</van-col>
                        </van-row>

                        <van-row style="line-height: 0.5rem;border-bottom: solid 5px #f3f7f8;">
                            <van-col span="10">
                                <div class="rank_img" v-if="AllstuInfo.randNum===1"><img src="../../../assets/img/parents/habits-performance/first.png"></div>
                                <div class="rank_img" v-if="AllstuInfo.randNum===2"><img src="../../../assets/img/parents/habits-performance/second.png"></div>
                                <div class="rank_img" v-if="AllstuInfo.randNum===3"><img src="../../../assets/img/parents/habits-performance/third.png"></div>
                                <div class="rank_img_number" v-if="AllstuInfo.randNum>3">{{AllstuInfo.randNum}}</div>
                                <div class="head"><img :src="AllstuInfo.avatar"></div>
                                <div>{{AllstuInfo.stuName}}</div>
                            </van-col>
                            <van-col span="7" style="text-align: center;">{{AllstuInfo.grade}}</van-col>
                            <van-col span="7" style="text-align: center;">{{AllstuInfo.safflowerNum}}</van-col>
                        </van-row>

                        <div class="rank_list" v-for="(item,index) in rankone.rankList" :key="index">
                            <van-row>
                                <van-col span="10">

                                    <div class="rank_img" v-if="item.randNum===1"><img src="../../../assets/img/parents/habits-performance/first.png"></div>
                                    <div class="rank_img" v-if="item.randNum===2"><img src="../../../assets/img/parents/habits-performance/second.png"></div>
                                    <div class="rank_img" v-if="item.randNum===3"><img src="../../../assets/img/parents/habits-performance/third.png"></div>
                                    <div class="rank_img_number" v-if="item.randNum>3">{{item.randNum}}</div>

                                    <div class="head"><img :src="item.avatar"></div>
                                    <div>{{item.stuName}}</div>
                                </van-col>
                                <van-col span="7" style="text-align: center;">{{item.gradeName}}</van-col>
                                <van-col span="7" style="text-align: center;">{{item.safflowerNum}}</van-col>
                            </van-row>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="本月排行" >
                    <div style="margin: 0 0.15rem;" class="mid_tab">
                        <div class="date_list">
                            <i @click="left"  class="van-icon van-icon-arrow-left van-cell__left-icon" ><!----></i>
                            <span @click="Cymonth" v-if="year && month" style="margin: 0 0.15rem ;"> {{NewYear}}年{{NewMonth}}月  <i data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"><!----></i></span>
                            <i @click="right" class="van-icon van-icon-arrow van-cell__right-icon" ><!----></i>
                        </div>
                        <van-row style="text-align: center;line-height: 0.5rem;">
                            <van-col span="10">名次</van-col>
                            <van-col span="7"><span style="margin: 0 0.05rem;">年级</span></van-col>
                            <van-col span="7">总红花数</van-col>
                        </van-row>

                        <van-row style="line-height: 0.5rem;border-bottom: solid 5px #f3f7f8;">
                            <van-col span="10">
                                <div class="rank_img" v-if="MonthstuInfo.randNum===1"><img src="../../../assets/img/parents/habits-performance/first.png"></div>
                                <div class="rank_img" v-if="MonthstuInfo.randNum===2"><img src="../../../assets/img/parents/habits-performance/second.png"></div>
                                <div class="rank_img" v-if="MonthstuInfo.randNum===3"><img src="../../../assets/img/parents/habits-performance/third.png"></div>
                                <div class="rank_img_number" v-if="MonthstuInfo.randNum>3">{{MonthstuInfo.randNum}}</div>
                                <div class="head"><img :src="MonthstuInfo.avatar"></div>
                                <div>{{MonthstuInfo.stuName}}</div>
                            </van-col>
                            <van-col span="7" style="text-align: center;">{{MonthstuInfo.grade}}</van-col>
                            <van-col span="7" style="text-align: center;">{{MonthstuInfo.safflowerNum}}</van-col>
                        </van-row>

                        <div class="rank_list" v-for="(item,index) in ranktwo.rankList" :key="index">
                            <van-row>
                                <van-col span="10">

                                    <div class="rank_img" v-if="item.randNum===1"><img src="../../../assets/img/parents/habits-performance/first.png"></div>
                                    <div class="rank_img" v-if="item.randNum===2"><img src="../../../assets/img/parents/habits-performance/second.png"></div>
                                    <div class="rank_img" v-if="item.randNum===3"><img src="../../../assets/img/parents/habits-performance/third.png"></div>
                                    <div class="rank_img_number" v-if="item.randNum>3">{{item.randNum}}</div>

                                    <div class="head"><img :src="item.avatar"></div>
                                    <div>{{item.stuName}}</div>
                                </van-col>
                                <van-col span="7" style="text-align: center;">{{item.gradeName}}</van-col>
                                <van-col span="7" style="text-align: center;">{{item.safflowerNum}}</van-col>
                            </van-row>
                        </div>
                    </div>

                </van-tab>
                <van-tab title="本周排行">
                    <div style="margin: 0 0.15rem;">
                        <van-row style="text-align: center;line-height: 0.5rem;">
                            <van-col span="10">名次</van-col>
                            <van-col span="7"><span style="margin: 0 0.05rem;">年级</span></van-col>
                            <van-col span="7">总红花数</van-col>
                        </van-row>

                        <van-row style="line-height: 0.5rem;border-bottom: solid 5px #f3f7f8;">
                            <van-col span="10">
                                <div class="rank_img" v-if="WeekstuInfo.randNum===1"><img src="../../../assets/img/parents/habits-performance/first.png"></div>
                                <div class="rank_img" v-if="WeekstuInfo.randNum===2"><img src="../../../assets/img/parents/habits-performance/second.png"></div>
                                <div class="rank_img" v-if="WeekstuInfo.randNum===3"><img src="../../../assets/img/parents/habits-performance/third.png"></div>
                                <div class="rank_img_number" v-if="WeekstuInfo.randNum>3">{{WeekstuInfo.randNum}}</div>
                                <div class="head"><img :src="WeekstuInfo.avatar"></div>
                                <div>{{WeekstuInfo.stuName}}</div>
                            </van-col>
                            <van-col span="7" style="text-align: center;">{{WeekstuInfo.grade}}</van-col>
                            <van-col span="7" style="text-align: center;">{{WeekstuInfo.safflowerNum}}</van-col>
                        </van-row>

                        <div class="rank_list" v-for="(item,index) in rankthree.rankList" :key="index">
                            <van-row>
                                <van-col span="10">

                                    <div class="rank_img" v-if="item.randNum===1"><img src="../../../assets/img/parents/habits-performance/first.png"></div>
                                    <div class="rank_img" v-if="item.randNum===2"><img src="../../../assets/img/parents/habits-performance/second.png"></div>
                                    <div class="rank_img" v-if="item.randNum===3"><img src="../../../assets/img/parents/habits-performance/third.png"></div>
                                    <div class="rank_img_number" v-if="item.randNum>3">{{item.randNum}}</div>

                                    <div class="head"><img :src="item.avatar"></div>
                                    <div>{{item.stuName}}</div>
                                </van-col>
                                <van-col span="7" style="text-align: center;">{{item.gradeName}}</van-col>
                                <van-col span="7" style="text-align: center;">{{item.safflowerNum}}</van-col>
                            </van-row>
                        </div>
                    </div>

                </van-tab>
            </van-tabs>
        </div>

        <div class="ac_line"></div>

        <div class="flowermes_div">
            <div class="use_div">
                <van-icon name="setting" /><span class="use_number">{{habit.safflowerNumberExchange}}</span>
                <div style="margin-top: 0.05rem">可兑换红花总数</div>
            </div>
            <div>
                <div>今日增加可兑奖数：{{habit.daySafflowerNumberExchange}} 朵</div>
                <div style="font-size: 0.12rem;color: #666666;margin-top: 0.05rem">
                    每日增加的可兑奖红花于当天晚上24:00统计至"可兑奖红花总数"中
                </div>
            </div>
        </div>

        <div>
            <div style="margin: 0.15rem;">
                <div class="title" style="float: left;">红花商城兑奖</div>
                <div class="checkmore" >&nbsp;</div>
                <!--<div class="checkmore" >进入商城&#62;</div>-->
            </div>
            <div style="    margin: 0.1rem 0.25rem;" v-if="converInfo!=null">
                最近一次兑换【{{converInfo.name}}】{{converInfo.date}}
            </div>
            <div style="margin: 0.1rem 0.15rem 0.25rem 0.15rem;">
                <div class="green_"></div>
                <div>可兑换的3个奖品
                <span class="checkAll" @click="CheckAllPrize()">查看全部奖品 > </span>
                </div>
            </div>
            <div class="gift_list">
                <van-row>
                    <van-col span="8" v-for="(item,index) in  mallInfo.convertibleCommodityInfo" :key="index">
                        <div>
                            <div class="gift"><img :src="item.imageUrl && item.imageUrl[0]"></div>
                            <div style="color: #999999;margin-top: 0.1rem">{{item.name}}</div>

                            <div style="margin-top: 0.1rem;color: #D80000;" v-if="item.lackNumber!==0">{{item.number}}朵</div>
                            <div style="margin-top: 0.1rem;" v-else>{{item.number}}朵</div>

                            <div class="exchange_btn" style="display:none;" v-if="item.lackNumber===0" >兑换奖品</div>
                            <div style="margin-top: 0.1rem" v-else>差{{item.lackNumber}}朵</div>
                        </div>
                    </van-col>
                </van-row>
            </div>

            <div style="margin: 0.15rem 0.15rem 0.1rem 0.15rem;">
                家长积分可帮助孩子在“红花礼品商城”兑换礼品
            </div>
            <div style="margin:  0.15rem;color: #999999;">
                <span @click="PushIntegral">进入家长积分 ></span>
            </div>
        </div>

        <van-popup v-model="Cdate" position="bottom" :overlay="true">
            <van-picker :columns="columns" @change="onChange" show-toolbar  @cancel="Cdate = false" @confirm="onConfirm"/>
        </van-popup>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import { Icon } from 'vant';
    import { Row } from 'vant';
    import { Col } from 'vant';
    import { Tab, Tabs } from 'vant';
    import { Popup   } from 'vant';
    import { Picker  } from 'vant';
    import { Toast  } from 'vant';

    import { PwontBehavior } from '@/api/parent/habits-performance'
    import { PFlowerRank,PMonthFlowerRank } from '@/api/parent/habits-performance'
    import { getChildInfo } from '@/api/parent/home'
    import { getParamFromUrlAndRoute } from '@/utils'

    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                comindex:'',
                allrank:"1",
                weekrank:"2",
                monthrank:"3",
                rankone:[],
                ranktwo:[],
                rankthree:[],
                habit:[],
                mallInfo:[],
                converInfo:[],
                comments:[],
                dateList:[],

                id:'',

                isFromTemplate: false,
                templateId: 0,

                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                Cdate: false,
                choosetime:true,

                columns:[],
                ArrayList:[],

                // 红花排行日期
                NewMonth:'',
                NewYear:new Date().getFullYear(),
                // 红花排行
                active:1,
                saveList:[],
                SaveMesList:{0:'',1:'',2:''},
                WeekstuInfo:[],
                MonthstuInfo:[],
                AllstuInfo:[],

            }
        },
        async created() {
            // const templateId = getParamFromUrlAndRoute('template_id', this.$router)
            // if (templateId) {
            //   this.isFromTemplate = true
            //   this.templateId = templateId
            // }

            this.loading = true
            const response = await getChildInfo()
            if (response.data.meta.success) {
                this.id = response.data.data.accountInfo.id
            }
            this.loading = false

        },
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Row.name]: Row,
            [Toast.name]: Toast,
            [Col.name]: Col,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            //someComponent
        },
        methods:{
            // 选择月排行切换日期
            onConfirm(values){
                this.$loading(null,null,true)
                this.NewYear = values[0]
                this.NewMonth = values[1]
                const data = {}
                data.year = this.NewYear
                data.month = this.NewMonth
                PFlowerRank(2,data)
                        .then(res => {
                            this.ranktwo = res.data.data
                            this.SaveMesList[this.active] = 2
                            this.$loadingHide()
                        }).catch(() => {
                        throw new Error("获取月排行异常!")
                    })
                this.Cdate = false
            },
            PushIntegral(){
                this.$router.push({name:'ParentHomeMy'})
            },
            MoreComments(){
                this.$router.push({
                    name:'SafflowerArchivesDetail', query:{id: this.id}
                });
            },
            onClickLeft(){
                this.$router.go(-1)
            },
            // 绘制雷达图
            GetPwontBehavior(){
                const template_id = getParamFromUrlAndRoute('template_id', this.$router)
                if(this.$route.query.template_id || template_id){
                PwontBehavior(template_id)
                    .then(res => {
                        this.habit = res.data.data;
                        this.comments = res.data.data.comments;
                        this.mallInfo = res.data.data.mallInfo;
                        this.converInfo = res.data.data.mallInfo.converInfo;

                        for(var i=0;i<this.habit.comments.length;i++){
                        }

                        this.comindex = i

                        var bread = document.getElementById('restudents');

                        let radarMaxValue = this.habit.categorys.reduce((last, item) => {
                            return last > item.number ? last : item.number
                        }, 1)
                        let radarIndicator = this.habit.categorys.map(item => ({
                            name: `${item.name}\n${item.number > 0 ? parseInt(item.number / radarMaxValue * 100) : 0}%`,
                            max: 100
                        }))
                        let radarData = this.habit.categorys.map(item => item.number > 0 ? parseInt(item.number / radarMaxValue * 100) : 0)
                        let myChart = this.echarts.init(bread);
                        myChart.setOption({
                            color:['#1890FF', '#84C225','#FACC14',],
                            radar: {
                                radius: '50%',
                                center: ["50%", "50%"],
                                name: {
                                    textStyle: {
                                        color: '#666',
                                    },
                                    formatter: (text) => {
                                        return text
                                    },
                                },
                                indicator: radarIndicator,
                            },
                            series: [{
                                type: 'radar',
                                data: [
                                    {
                                        value: radarData
                                    }
                                ],
                            }]
                        })
                    }).catch(() => {
                    throw new Error("异常!")
                })
                }else{
                    PwontBehavior()
                        .then(res => {
                            this.habit = res.data.data;
                            this.comments = res.data.data.comments;
                            this.mallInfo = res.data.data.mallInfo;
                            this.converInfo = res.data.data.mallInfo.converInfo;
                            for(var i=0;i<this.habit.comments.length;i++){
                            }
                            this.comindex = i

                            var bread = document.getElementById('restudents');

                            let radarMaxValue = this.habit.categorys.reduce((last, item) => {
                                return last > item.number ? last : item.number
                            }, 1)
                            let radarIndicator = this.habit.categorys.map(item => ({
                                name: `${item.name}\n${item.number > 0 ? parseInt(item.number / radarMaxValue * 100) : 0}%`,
                                max: 100
                            }))
                            let radarData = this.habit.categorys.map(item => item.number > 0 ? parseInt(item.number / radarMaxValue * 100) : 0)
                            let myChart = this.echarts.init(bread);
                            myChart.setOption({
                                color:['#1890FF', '#84C225','#FACC14',],
                                radar: {
                                    radius: '50%',
                                    center: ["50%", "50%"],
                                    name: {
                                        textStyle: {
                                            color: '#666',
                                        },
                                        formatter: (text) => {
                                            return text
                                        },
                                    },
                                    indicator: radarIndicator,
                                },
                                series: [{
                                    type: 'radar',
                                    data: [
                                        {
                                            value: radarData
                                        }
                                    ],
                                }]
                            })
                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }
            },
            // 第一次切换排行获取数据
            getMes(){
                if(this.active === 0 && this.SaveMesList[this.active] === ''){
                    this.$loading(null,null,true)
                    PFlowerRank(this.active+1,null)
                        .then(res => {
                            this.rankone = res.data.data
                            this.AllstuInfo = res.data.data.stuInfo
                            this.SaveMesList[this.active] = 1
                            this.$loadingHide()
                        }).catch(() => {
                        throw new Error("获取总排行异常!")
                    })
                }else   if(this.active === 1 && this.SaveMesList[this.active] === ''){
                    this.$loading(null,null,true)
                    const data = {}
                    data.year = this.NewYear
                    data.month = this.NewMonth
                    PFlowerRank(this.active+1,data)
                        .then(res => {
                                this.ranktwo = res.data.data
                                this.MonthstuInfo = res.data.data.stuInfo
                                this.SaveMesList[this.active] =2
                            this.$loadingHide()
                        }).catch(() => {
                        throw new Error("获取月排行异常!")
                    })
                }else   if(this.active === 2 && this.SaveMesList[this.active] === ''){
                    this.$loading(null,null,true)
                    PFlowerRank(this.active+1,null)
                        .then(res => {
                            this.rankthree = res.data.data
                            this.WeekstuInfo = res.data.data.stuInfo
                            this.SaveMesList[this.active] = 3
                            this.$loadingHide()
                        }).catch(() => {
                        throw new Error("获取周排行异常!")
                    })
                }
            },
            // 红花排行榜查询月有数据的日期
            GetDateList(){
                PMonthFlowerRank()
                    .then(res => {
                        this.dateList = res.data.data
                        this.NewMonth = res.data.data[0].substring(5)
                        this.NewYear = res.data.data[0].substring(0,4)
                        const testlist = []
                        for(let l = 0 ; l<this.dateList.length; l++){
                            for(let a = 0;a<this.dateList[l].length;a++){
                                if(this.dateList[l][a] === '-'){
                                    let left = this.dateList[l].substring(0,a)
                                    testlist.push(left)
                                }
                            }
                        }
                        // 去除重复日期
                        let testList = Array.from(new Set(testlist))
                        // ArrayList为日期选择下拉所需数组格式
                        let ArrayList  = {}
                        for( let i = 0;i<testList.length; i++){
                            ArrayList[testList[i]] = []
                        }
                        for(let l = 0 ; l<this.dateList.length; l++){
                            for(let a = 0;a<this.dateList[l].length;a++){
                                if(this.dateList[l][a] === '-'){
                                    let left = this.dateList[l].substring(0,a)
                                    let right = this.dateList[l].substring(a+1)
                                    for( let i =0;i<testList.length;i++){0
                                        if(left == testList[i]){
                                            ArrayList[testList[i]].push(right)
                                        }
                                    }
                                }
                            }
                        }
                        this.ArrayList = ArrayList
                        this.columns = [
                            {
                                values: Object.keys(this.ArrayList),
                                className: 'column1'
                            },
                            {
                                values: this.ArrayList[testList[1]],
                                className: 'column2',
                                defaultIndex: 2
                            }
                        ]

                        // 获取排行数据
                        this.getMes()

                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            // 跳转红花奖品商城
            CheckAllPrize(){
                this.$router.push({name:'ParentFlowerMall'})
            },
            // 左右选择日期
            changeDate(){
                this.$loading(null,null,true)
                const data = {}
                data.year = this.NewYear
                data.month = this.NewMonth
                PFlowerRank(this.active+1,data)
                    .then(res => {
                        this.ranktwo = res.data.data
                        this.MonthstuInfo = res.data.data.stuInfo
                        this.SaveMesList[this.active] =2
                        this.$loadingHide()
                    }).catch(() => {
                    throw new Error("获取月排行异常!")
                })
            },
            left(){
                var n= this.ArrayList[this.NewYear].indexOf(this.NewMonth);
                console.log(this.ArrayList)
                console.log(this.ArrayList[this.NewYear])
                console.log(this.NewMonth)
                console.log(this.columns[0].values)
                console.log("位置",n)
                if(this.ArrayList[this.NewYear][n+1]){
                    this.NewMonth = this.ArrayList[this.NewYear][n+1]
                    this.changeDate()
                }else{
                    if(this.ArrayList[this.NewYear-1]){
                        this.NewYear -=1
                        this.NewMonth = this.ArrayList[this.NewYear][0]
                        this.changeDate()
                    }else{
                        this.$toast('无数据');
                    }
                }
            },
            right(){
                var n= this.ArrayList[this.NewYear].indexOf(this.NewMonth);
                console.log(this.ArrayList)
                console.log(this.ArrayList[this.NewYear])
                console.log(this.NewMonth)
                console.log(this.NewYear)
                console.log(this.columns[0].values)
                console.log("位置",n)
                if(this.ArrayList[this.NewYear][n-1]){
                    this.NewMonth = this.ArrayList[this.NewYear][n-1]
                    this.changeDate()
                }else{
                    this.NewYear = +this.NewYear
                    if(this.ArrayList[this.NewYear+1]){
                        this.NewYear +=1
                        this.NewMonth = this.ArrayList[this.NewYear][this.ArrayList[this.NewYear].length-1]
                        this.changeDate()
                    }else{
                        this.$toast('无数据');
                    }
                }
            },
            // 时间 选择
            Cymonth(){
                this.Cdate = true
            },
            onChange(picker, values) {
                picker.setColumnValues(1, this.ArrayList[values[0]]);
            }
        },
        mounted(){
            const templateId = getParamFromUrlAndRoute('template_id', this.$router)
            if (templateId) {
                this.isFromTemplate = true
                this.templateId = templateId
            }
            // 绘制雷达图
            this.GetPwontBehavior()
            // 红花排行榜查询月有数据的日期
            this.GetDateList()
        },
    }
</script>

<style scoped>
    *{
        font-size: 0.14rem;
    }
    .habit{
        margin: 0.15rem;
    }
    .title{
        border-left: solid 2px #3770FB;
        font-size:0.16rem;
        color: #333333;
        padding-left: 0.1rem;
        font-weight: 700;
    }
    .habit_title{
        color: #666666;
        font-size: 0.14rem;
    }
    .top_number_div .van-icon {
        font-size: 0.15rem;
        color: #D80000;
        line-height: 0.24rem;
    }
    .all_number{
        color: #D80000;
        font-size: 0.24rem;
    }
    .list_number{
        color: #D80000;
        font-size: 0.2rem;
    }
    .use_number{
        color: #D80000;
        font-size: 0.26rem;
    }
    .top_number_div{
        margin-bottom: 0.2rem;
        text-align: center;
        line-height: 0.24rem;
    }
    .addnumber{
        color: #D80000;

    }
    .comment_list_type{
        float: left;
    }
    .comment_list{
        margin-left: 0.7rem;
    }
    .checkmore{
        color: #999999;
        font-size: 0.12rem;
        text-align: right;
    }
    .comment_div{
        border-top: solid 1px #EEEEEE;
        padding: 0.1rem 0;
        /*display:none*/
    }

    /*.habit /deep/ .comment_div:last-child{*/
    /*display:block*/
    /*}*/

    .ac_line{
        background-color: #F3F7F8;
        height: 0.1rem;
    }
    .head{
        margin: 0.1rem;
        float: left;
        width:0.32rem ;
        height: 0.32rem;
    }
    .head img{
        width: 100%;
        height: 100%;
        border-radius:20px
    }
    .rank_img{
        margin: 0.05rem 0 0.05rem 0.1rem;
        float: left;
        width: 0.22rem;
        height: 0.25rem;
    }
    .rank_img_number{
        margin: 0 0 0 0.1rem;
        float: left;
        width: 0.22rem;
        text-align: center;
        height: 0.25rem;
        color: #666666;
        font-size: 0.16rem;
    }
    .rank_img img{
        width: 100%;
        height: 100%;
    }
    .rank_list{
        border-top: solid 1px #EEEEEE;
        line-height: 0.5rem;
    }
    .use_div{
        width: 1.37rem;
        height: 0.65rem;
        text-align: center;
        float: left;
        border-right: solid 1px #F1F1F1;
        margin-right: 0.15rem;
    }
    .flowermes_div{
        height: 0.64rem;
        padding: 0.2rem 0;
        margin: 0 0.15rem;
        border-bottom: solid 1px #EEEEEE;
    }
    .flowermes_div .van-icon{
        font-size: 0.15rem;
        color: #D80000;
        line-height: 0.24rem;
    }
    .green_{
        background-color:#84C225;
        width: 0.06rem;
        height: 0.06rem;
        border-radius:20px;
        float: left;
        margin: 0.06rem 0.06rem 0.06rem 0;
    }
    .gift{
        margin: 0 auto;
        width: 1.13rem;
        height: 0.87rem;
    }
    .gift img{
        border-radius:3px;
        width: 100%;
        height: 100%;
    }
    .gift_list{
        margin: 0 0.15rem;
        text-align: center;
        border-bottom: solid 1px #EEEEEE;
        padding-bottom: 0.15rem;
    }
    .exchange_btn{
        width: 0.8rem;
        height: 0.25rem;
        color: #84C225;
        border-radius:5px;
        border:1px solid rgba(132,194,37,1);
        line-height: 0.25rem;
        margin: 0 auto;
        margin-top: 0.1rem;
    }
    .rank_div /deep/ .van-tab:nth-child(2) {
        border-right:solid 1px #3770FB;
        border-left:solid 1px #3770FB;
    }
    .com_left{
        float: left;
    } .com_right{
          margin-left: 0.8rem;
      }
    .checkAll{
        text-align: right;
        float: right;
        color: darkgrey;
    }
    .check_more{
        border: solid 1px;
        padding: 0.05rem 0.05rem;
        text-align: center;
        border-radius: 8px;
    }
    .choosetime{
        display: none;
    }
    .date_list{
        line-height: 0.5rem;
        text-align: center;
        border-bottom: solid 1px #EEEEEE;
    }
</style>
