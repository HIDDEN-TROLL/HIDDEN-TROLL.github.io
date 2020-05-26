<template>
    <div id="student-detail">
        <div class="go-back" v-if="templateId === 0">
            <van-nav-bar
                    title="考勤记录"
                    left-text="返回"
                    left-arrow
                    right-text="筛选日期"
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            />
        </div>
        <div class="go-back" v-else>
            <van-nav-bar
                    title="考勤记录"
                    right-text="筛选日期"
                    @click-right="onClickRight"
            />
        </div>
        <div class="content">
            <div class="sign-tab">
                        <div class="list">
                            <van-list
                                    v-model="loading"
                                    :finished="finished"
                                    finished-text="没有更多了"
                                    @load="onLoad"
                            >
                                <div class="item" v-for="(item, index) in attendanceList" :key="index">
                                    <div class="list-left">
                                        <div class="time">
                                            <span class="hm">{{item.HM}}</span>
                                            <span class="day">{{item.forDay}}</span>
                                        </div>
                                        <div class="bot-box">
                                            <span class="type">类型：{{item.typeText}}</span>
                                            <span class="origin">来源：{{item.originText}}</span>
                                        </div>
                                    </div>
                                    <div class="list-right">
                                        <div class="img" v-if="item.image" @click="viewImg(item.image)">
                                            <img :src="item.image" alt="">
                                        </div>
                                    </div>
                                </div>
                            </van-list>
                        </div>
            </div>
        </div>
        <!--选择时间类型-->
        <van-popup v-model="show" :style="{padding:'0.16rem',width:'50%'}">
            <div class="choose-time">
                <div class="all time" @click="chooseTime(0)">
                    <span class="title">全部</span>
                </div>
                <div class="nowday time" @click="chooseTime(1)">
                    <span class="title">今日</span>
                </div>
                <div class="tomorrow time" @click="chooseTime(2)">
                    <span class="title">昨日</span>
                </div>
                <div class="week time" @click="chooseTime(3)">
                    <span class="title">本周</span>
                </div>
                <div class="month time" @click="chooseTime(4)">
                    <span class="title">本月</span>
                </div>
                <div class="define time" @click="timeDefine">
                    <span class="title">自定义</span>
                </div>
            </div>
        </van-popup>

        <van-popup v-model="showTimeBox" position="bottom">
            <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :max-date="maxDate"
                    @confirm="confirmTime"
                    @cancel="cancelTime"
            />
        </van-popup>

        <van-dialog
                v-model="defineTime"
                title="标题"
                show-cancel-button
                :before-close="beforeClose"
        >
            <van-field
                    v-model="bgTime"
                    label="开始时间："
                    placeholder="请设置开始时间"
                    @click="setTime(1)"
                    readonly
            />
            <van-field
                    v-model="edTime"
                    label="结束时间："
                    placeholder="请设置结束时间"
                    @click="setTime(2)"
                    readonly
            />
        </van-dialog>
    </div>
</template>

<script>
    import { Tab, Tabs, NavBar, Row, Col, List, Popup, DatetimePicker, Field, ImagePreview   } from 'vant';
    import { TeacherReport } from '@/api/teacher/attendance';
    import { getParamFromUrlAndRoute } from '@/utils'
    export default {
        name: "student-detail",
        components: {
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
            [NavBar.name]: NavBar,
            [Row.name]: Row,
            [Col.name]: Col,
            [List.name]: List,
            [Popup.name]: Popup,
            [DatetimePicker.name]: DatetimePicker,
            [Field.name]: Field
        },
        data(){
            return {
                show:false,
                currentDate:new Date(),
                maxDate:new Date(),
                defineTime:false,//自定义时间
                showTimeBox:false,
                bged:0,//区分是 设置开始 还是结束时间
                name: this.$route.query.name ? this.$route.query.name : '',
                loading: false,
                finished: false,
                studentId: this.$route.query.id,//
                type:1,//1进园 2 离园
                time:0,//默认查询所有
                bgTime:"",//如果存在  time 不传   获取区间时间时 需要传
                edTime:"",//如果存在  time 不传   获取区间时间时 需要传
                page:1,//
                size:10,
                tDay: 0,//今天次数
                tWeek: 0,//本周次数
                tMonth: 0,//本月次数
                attendanceList: [],//进园签到列表数据
                leaveList:[],//离园签到列表
                recordList:[],//考勤记录列表
                queryData: {
                    id:this.$route.query.id,
                    type:1,
                    filterType:0,
                    page:1,
                    pageSize:10,
                    template_id:this.templateId
                },
                lof:1,
                isFromTemplate: true,
                templateId:0,
                template_id:this.$route.query.templateId,

            }
        },
        methods: {
            onClickLeft(){
                this.$router.back()
            },
            onClickRight(){
                this.show = true;
            },
            tabType(name){
                name === 0 ? this.type = 1 : name === 1 ? this.type = 2 : this.type = 0;
                this.queryData = {
                    id:this.$route.query.id,
                    type:this.type,
                    filterType:0,
                    page:1,
                    pageSize:10,
                    template_id:this.templateId
                };
                this.tDay = 0;
                this.tWeek = 0;
                this.tMonth = 0;
                this.lof = 1;
                this.page = 1;
                this.attendanceList = [];
                this.leaveList = [];
                this.recordList = [];
                this.loading = true;
                this.finished = false;
                if (this.loading){
                    this.onLoad()
                }
            },
            onLoad(){
                this.selectList();
            },
            selectList(){
                let toast = null;
                if (this.lof === 1){
                    toast = this.$toast.loading({
                        forbidClick: true, // 禁用背景点击
                        mask:true,
                        loadingType: 'spinner',
                        position:'middle',
                        message: '加载中'
                    })
                }
                this.queryData.page = this.page
                if (this.isFromTemplate) {
                    this.queryData.from = 'template'
                    this.queryData.template_id = this.templateId
                }
                TeacherReport(this.queryData)
                    .then(res=>{
                        if (this.lof === 1){
                            toast.clear();
                            this.lof = null;
                        }
                        if (res.data.meta.code === 0){
                            if (res.data.data.studentName) {
                                this.name = res.data.data.studentName
                            }
                            let d = res.data.data.list;
                            let moment = require('moment');
                            if (d.length > 0) {
                                for (let item of d) {
                                    item["HM"] = moment(item.time * 1000).format('HH:mm');
                                    item["forDay"] = moment(item.time * 1000).format('YYYY-MM-DD');
                                }
                            }
                            this.tDay = res.data.data.dayCount;
                            this.tWeek = res.data.data.weekCount;
                            this.tMonth = res.data.data.monthCount;
                            if (this.type === 1){
                                this.attendanceList.push.apply(this.attendanceList, d);
                            }else if (this.type === 2){
                                this.leaveList.push.apply(this.leaveList, d)
                            }else if (this.type === 0){
                                this.recordList.push.apply(this.recordList, d)
                            }
                            this.loading = false;
                            if (d.length < this.size){
                                this.finished = true
                            } else {
                                this.page = this.page + 1;
                            }
                        }else {
                            this.$toast("数据异常")
                        }
                    })
                    .catch((res)=>{
                        console.log(res);
                        throw new Error("异常")
                    })
            },
            chooseTime(type){
                this.show = false;
                this.queryData = {
                    id:this.$route.query.id,
                    type:this.type,
                    filterType:type,
                    page:1,
                    pageSize:10,
                    template_id:this.templateId
                };
                this.page = 1;
                this.attendanceList = [];
                this.leaveList = [];
                this.recordList = [];
                this.loading = true;
                this.finished = false;
                if (this.loading){
                    this.onLoad()
                }
            },
            timeDefine(){
                this.bgTime = "";
                this.edTime = "";
                this.defineTime = true;
            },
            setTime(t){
                this.showTimeBox = true;
                if (t === 1) {
                    this.bged = 1;
                }else if (t === 2) {
                    this.bged = 2;
                }
            },
            confirmTime(val){
                let moment = require("moment");
                this.showTimeBox = false;
                // console.log(val)
                if (this.bged === 1) {
                    this.bgTime = moment(val).format("YYYY-MM-DD");
                }else if (this.bged === 2) {
                    this.edTime = moment(val).format("YYYY-MM-DD");
                }
            },
            cancelTime(){
                this.showTimeBox = false;
            },
            beforeClose(action, done){
                if (action === 'confirm') {
                    if (!this.bgTime){
                        this.$toast('请设置开始时间')
                        done(false);
                    } else if (!this.edTime) {
                        this.$toast('请设置结束时间')
                        done(false);
                    }else if (new Date(this.bgTime.replace(/-/g, '/')) > new Date(this.edTime.replace(/-/g, '/'))) {
                        this.$toast('开始时间不能大于结束时间')
                        done(false);
                    }else {
                        this.show = false;
                        this.queryData = {
                            id:this.$route.query.id,
                            type:this.type,
                            beginDate:this.bgTime,
                            endDate:this.edTime,
                            page:1,
                            pageSize:10,
                            template_id:this.templateId
                        };
                        this.page = 1;
                        this.attendanceList = [];
                        this.leaveList = [];
                        this.recordList = [];
                        this.loading = true;
                        this.finished = false;
                        if (this.loading){
                            this.onLoad()
                        }
                        done();
                    }

                }else {
                    done();
                }
            },
            viewImg(img){
                ImagePreview([
                    img
                ]);
            }
        },
        created() {
            const templateId = getParamFromUrlAndRoute('template_id', this.$router)
            if (templateId && parseInt(templateId) > 0) {
                this.isFromTemplate = true
                this.templateId = parseInt(templateId)
            }

        }
    }
</script>

<style scoped lang="less">
    #student-detail{
        font-size: 0.12rem;
        background-color: #fff;
        .go-back {
            flex-shrink: 0;

            .van-nav-bar {
                background-color: #3770fb;

                .van-icon {
                    font-size: 0.16rem;
                    color: #fff;
                }

                .van-nav-bar__text {
                    font-size: 0.16rem;
                    line-height: 0.22rem;
                    color: #fff;
                    font-weight: 400;
                }

                .van-nav-bar__title {
                    font-size: 0.16rem;
                    color: #fff;
                    font-weight: 400;
                }
            }
        }
        .content{
            padding: 0.14rem 0.16rem 0.1rem;
            .sign-tab{
                /deep/ .van-tabs__wrap{
                    height: 0.34rem;
                    .van-tabs__nav--card{
                        margin: 0;
                        height: 0.34rem;
                        .van-tab{
                            line-height: 0.32rem;
                        }
                    }
                }
                /deep/ .van-tabs__content{
                    padding-top: 0.08rem;
                }
                .sign-info{
                    padding: 0.12rem 0;
                    .flex-box{
                        display: flex;
                        justify-content: space-between;
                        .sub{
                            flex: 1;
                        }
                    }
                }
                .total{
                    height: 0.28rem;
                    line-height: 0.28rem;
                    text-align: center;
                    color: #666;
                    background-color: #f2f2f2;
                }
                .list{
                    .item{
                        position: relative;
                        padding: 0.12rem 0;
                        overflow: hidden;
                        &:after{
                            content: "";
                            position: absolute;
                            width: 100%;
                            height: 0.02rem;
                            bottom: 0;
                            left: 0;
                            background-color: #eee;
                        }
                        .list-left{
                            float: left;
                            .time{
                                font-size: 0.14rem;
                                color: #999;
                                line-height: 0.28rem;
                                font-weight: bold;
                                .day{
                                    margin-left: 0.12rem;
                                }
                            }
                            .bot-box{
                                font-size: 0.14rem;
                                color: #666;
                                line-height: 0.24rem;
                                .origin{
                                    margin-left: 0.42rem;
                                }
                            }
                        }
                        .list-right{
                            float: right;
                            width: 0.5rem;
                            height: 0.5rem;
                            margin-right: 0.11rem;
                            overflow: hidden;
                            img{
                                float: left;
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }

                }
            }
        }
        .choose-time{
            .time{
                position: relative;
                width: 100%;
                line-height: 0.3rem;
                /*border-bottom: 1px solid #999;*/
                font-size: 0.14rem;
                color: #666;
                text-align: center;
                &:after{
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background: #999;
                    width: 100%;
                    height: 1px;
                    // box-sizing: border-box;
                    transform: scaleY(0.5);
                    transform-origin: bottom;
                }
            }
        }
    }
</style>
