<template>
    <div id="attendance-type">
        <div class="go-back">
            <van-nav-bar
                    title="学生详情"
                    left-text="返回"
                    right-text="筛选日期"
                    left-arrow
                    @click-left="onClickLeft"
                    @click-right="changedate"
            />
        </div>

        <div class="body">
            <van-tabs type="card">
                <van-tab title="考勤">
                    <div style="line-height: 0.25rem;padding:  0.15rem;text-align: center">
                        <van-row>
                            <van-col span="8">
                                {{AttendanceList.name}}
                            </van-col>
                            <van-col span="8" >
                                剩余<span style="color:red">{{AttendanceList.number}}</span>课次
                            </van-col>
                            <van-col span="8">
                                请假{{AttendanceList.leave}}次
                            </van-col>
                        </van-row>
                    </div>
                    <div class="ac_line"></div>
                    <div v-if=" attend.length>0">
                        <div class="box"  v-for="(item,index) in AttendanceList.attend" :key="index">
                            <van-row >
                                <van-col span="12" style="color: #6699FF">
                                    {{item.date}}
                                </van-col>
                                <van-col span="4" >
                                    {{item.week}}
                                </van-col>
                                <van-col span="8" style="text-align: right">
                                    <span  v-if="item.isLeave===false" > 已签到  {{item.time}} </span>
                                    <span  v-else > 请假   </span>
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                    <div v-else style="text-align: center;line-height: 2rem"> 无数据 </div>

                </van-tab>
                <van-tab title="课评">
                    <div style="line-height: 0.25rem;padding:  0.15rem;text-align: center">
                        <van-row>
                            <van-col span="8">
                                {{CommentList.name}}
                            </van-col>
                            <van-col span="8">
                                奖励   {{CommentList.rewardNumber}}朵
                            </van-col>
                            <van-col span="8">
                                扣除  {{CommentList.deductNumber}}朵
                            </van-col>
                        </van-row>
                    </div>
                    <div class="ac_line"></div>
                    <div v-if=" comments.length>0">
                        <div class="boxse" id="box" v-for="(item,index) in CommentList.comments" :key="index" style="border-bottom: solid 1px #CCCCCC;">
                            <van-row>
                                <van-col span="12" style="color: #6699FF">
                                   {{item.date}}
                                </van-col>
                                <van-col span="4" >
                                    {{item.week}}
                                </van-col>
                                <van-col span="8" style="text-align: right">
                                    表现：{{item.discipline}}
                                    <span v-if="item.number > 0" style="color: red">{{item.number}}</span>
                                    <span v-else style="color: blue">{{item.number}}</span>
                                    朵
                                </van-col>
                            </van-row>
                            <div style="line-height: 0.2rem" >
                               <div v-if="item.comment.categorys.length!=0">
                                    {{item.comment.categorys.category}}：{{item.comment.categorys.list[0]}}
                               </div>
                                <div>
                                    点评：{{item.comment.content}}
                               </div>
                            </div>
                        </div>
                    </div>
                    <div v-else style="text-align: center;line-height: 2rem"> 无数据 </div>

                </van-tab>
            </van-tabs>

            <van-dialog
                    v-model="setTime"
                    title="筛选日期"
                    show-cancel-button
                    :show-confirm-button="false"
            >
                <div class="timebox">
                    <van-cell  @click="choiceDate(1)"  is-link value="今日" />
                    <van-cell  @click="choiceDate(2)"  is-link value="昨日" />
                    <van-cell  @click="choiceDate(3)"  is-link value="本周" />
                    <van-cell  @click="choiceDate(4)"  is-link value="本月" />
                    <van-cell  @click="showDIY"  is-link  value="自定义时间" />
                </div>

            </van-dialog>

            <!--时间筛选-->
            <van-dialog
                    v-model="setDIY"
                    title="选择日期"
                    show-cancel-button
                    @confirm="SendDate()"

            >
                <div class="timebox">
                    <div >开始时间</div>
                    <van-cell  @click="StartDate(1)"  is-link :value="StartTime" />
                    <div>结束事件</div>
                    <van-cell  @click="StartDate(2)"  is-link :value="EndTime" />
                </div>

            </van-dialog>
            <van-popup v-model="CStime" position="bottom" :overlay="true" >
                <van-datetime-picker
                        v-model="currentDate"
                        type="date"
                        title="选择时间"
                        :formatter="formatter"
                        @confirm="confirm"
                        @cancel="close"

                />
            </van-popup>

        </div>
    </div>
</template>

<script>
    import { NavBar, Icon, Row, Col, Field, DatetimePicker, Popup, Toast,Tab, Tabs ,Search,Cell, CellGroup  } from 'vant';
    import FooterBtn from "./components/class-footer";
    import { getStuAttendance,getStuComment} from '@/api/school/training-course'

    export default {
        name: "attendance-time",
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Search.name]: Search,
            [Row.name]: Row,
            [Col.name]: Col,
            //[Dialog.name]:Dialog,
            [Field.name]: Field,
            [DatetimePicker.name]: DatetimePicker,
            [Popup.name]: Popup,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Toast.name]: Toast,
            FooterBtn:FooterBtn
        },
        data() {
            return {
                Datetype:'',
                year:new Date().getFullYear(),
                month: new Date().getMonth()+1 ,
                days:new Date().getDate(),
                StartTime:'',
                EndTime:'0-0-0',

                currentDate: new Date(),
                minDate: new Date(),
                CStime:false,
                setDIY:false,
                filterType:4,

                classId: this.$route.params.classId,
                id: this.$route.params.id,

                // 筛选日期
                setTime:false,
                AttendanceList:[],
                attend:[],
                CommentList:[],
                comments:[],
                value:'',
                list:[{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},],
                btnText: [
                    {
                        type: 1,
                        title: "新学生入班"
                    }, {
                        type: 1,
                        title: "老学生退班"
                    }, {
                        type: 1,
                        title: "更换教师"
                    },
                ],

                startDate:'',
                endDate:'',
                choiceDateType:0,
                arrangingId:this.$route.params.arrangingId,
            }
        },
        methods:{
            SendDate(){
                this.setTime = false
                this.choiceDateType = 1
              this.getStuAttendanceFun()
              this.getStuCommentFun()
            },
            StartDate(type){
                this.Datetype = type
                this.CStime = true
            },
            close(){
                this.CStime = false
                this.setTime = true
            },
            confirm(value){
                var date = value;
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate()

                this.year = y
                this.month = ((m) < 10 ? '0' + (m) : (m))
                this.days = d

                if(this.Datetype === 1){
                    this.StartTime = y+"-"+((m) < 10 ? '0' + (m) : (m))+'-' +d
                    // this.StartTime = this.year+"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))+'-' +d
                    // this.minDate = value
                }else if(this.Datetype === 2){
                    this.EndTime = y+"-"+((m) < 10 ? '0' + (m) : (m))+'-' +d

                }
                console.log(this.StartTime , this.EndTime)
                this.CStime = false
                this.setTime = true

            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                } else if (type === 'day') {
                    return `${value}日`
                }
                return value
            },
            showDIY(){
                this.setDIY = true
            },
            choiceDate(type){
                this.choiceDateType = 0
                this.filterType = type
                this.getStuAttendanceFun()
                this.getStuCommentFun()
                this.setTime = false
            },
            // 获取考勤
            getStuAttendanceFun() {
                if(this.choiceDateType === 0){
                    const data = {}
                    data.filterType = this.filterType
                    getStuAttendance(this.classId,this.id,data)
                        .then(res => {
                            if (res.data.meta && res.data.meta.code === 0) {
                                this.AttendanceList = res.data.data
                                this.attend = res.data.data.attend
                            }
                        }).catch(() => {
                        throw new Error("学生考勤异常！")
                    })
                }else if(this.choiceDateType === 1){
                    getStuAttendance(this.classId,this.id,{startDate:this.StartTime,endDate:this.EndTime})
                        .then(res => {
                            if (res.data.meta && res.data.meta.code === 0) {
                                this.AttendanceList = res.data.data
                                this.attend = res.data.data.attend
                            }
                        }).catch(() => {
                        throw new Error("学生考勤异常！")
                    })
                }
            },
            // 获取课评
            getStuCommentFun() {
                if(this.choiceDateType === 0) {
                    const data = {}
                    data.filterType = this.filterType
                    getStuComment(this.classId, this.id,data)
                        .then(res => {
                            if (res.data.meta && res.data.meta.code === 0) {
                                this.CommentList = res.data.data
                                this.comments = res.data.data.comments
                            }
                        }).catch(() => {
                        throw new Error("获取课评异常！")
                    })
                }else if(this.choiceDateType === 1){
                    getStuComment(this.classId, this.id,{startDate:this.StartTime,endDate:this.EndTime})
                        .then(res => {
                            if (res.data.meta && res.data.meta.code === 0) {
                                this.CommentList = res.data.data
                                this.comments = res.data.data.comments
                            }
                        }).catch(() => {
                        throw new Error("获取课评异常！")
                    })
                }
            },
            changeClass(){
                this.$router.push({name:'ChangeClass'})
            },
            onClickLeft(){
                this.$router.back()
                // if(this.arrangingId){
                //     this.$router.push({name:'StudentSignIn',params:{id:this.classId,arrangingId:this.arrangingId}})
                //
                // }else{
                //     this.$router.push({name:'ClassDetails',params:{id:this.classId}})
                // }
            },
            changedate(){
                this.setTime = true
            },
            onSearch(){

            },
            //确认添加
            operateBtn(type) {
                if (type === 1) {
                    this.addStudent();
                } else if (type === 2) {
                    this.$router.back();
                }
            },

        },
        mounted() {
            this.classId === undefined ? this.classId = 0 : this.$route.params.classId
            this.id === undefined ? this.id = 0 : this.$route.params.id
            if(this.classId === 0 || this.id === 0){
                this.$router.replace({name:'trainingCourse'})
            }else{
                this.StartTime = this.year + '-' + this.month + '-' + this.days
                this.EndTime = this.year + '-' + this.month + '-' + this.days
                this.getStuAttendanceFun()
                this.getStuCommentFun()
            }
        },
    }
</script>

<style scoped lang="less">
    .body{
        font-size: 0.14rem;
        margin-top: 0.15rem;
    }
    #attendance-type {
        font-size: 0;
        height: 100%;
        margin-bottom: 0.7rem;

        .go-back {
            .van-nav-bar {
                background-color: #3770FB;

                .van-icon {
                    font-size: 0.22rem;
                    color: #fff;
                }

                .van-nav-bar__text {
                    font-size: 0.16rem;
                    line-height: 0.22rem;
                    color: #fff;
                    font-weight: 400;
                }

                .van-nav-bar__title {
                    color: #fff;
                    font-weight: 400;
                }
            }
        }

        .content {
            font-size: 0.14rem;
            color: #999;
            text-align: center;
            background-color: white;
            margin: 0.15rem;
            padding: 0.1rem;

            .list {
                background-color: #F3F7F8;

                .item {
                    height: 0.71rem;
                    width: 100%;
                    margin-bottom: 0.1rem;
                    background-color: #fff;
                    overflow: hidden;

                    .commen {
                        float: left;
                        height: 100%;
                        position: relative;
                        text-align: center;
                    }

                    .name {
                        width: 0.65rem;
                        span {
                            font-size: 0.14rem;
                            color: #666;
                            line-height: 0.2rem;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                    }

                    .time {
                        width: 2.45rem;

                        .comprehensive {
                            width: 100%;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);

                            p {
                                width: 100%;
                                text-align: center;
                                line-height: 0.2rem;

                                .title {
                                    font-size: 0.14rem;
                                    color: #666;
                                }

                                .num {
                                    font-size: 0.14rem;
                                    color: #999;
                                    margin-left: 0.08rem;
                                }
                            }
                        }
                    }

                    .jump {
                        width: 0.65rem;
                        text-align: center;

                        .icon {
                            font-size: 0.14rem;
                            color: #666;
                            line-height: 0.2rem;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }
                }
            }
        }

        /*.van-field__body{
            .van-field__control{
                border: 0.01rem solid #666;
                border-radius: 0.03rem;
            }
        }*/

        /*.footer{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0.4rem;
            padding: 0.08rem 0;
            background-color: #3770FB;
            box-sizing: border-box;
            .van-col{
                font-size: 0.14rem;
                color: #fff;
                line-height: 0.24rem;
                text-align: center;
                border-right: 0.01rem solid #fff;
            }
            .van-col:last-child{
                border-right-width:0 ;
            }
        }*/
        .ac_line{
            background-color: #f3f7f8;
            height: 0.1rem;
        }
        .newlist{
            line-height: 0.3rem;
            font-size: 0.14rem;
        }
        .change{
            border: solid 1px #6699FF;
            border-radius: 8px;
            padding: 0.03rem 0.05rem;
            margin-left: 0.1rem;
            color: #6699FF;
        }.delete{
             border: solid 1px #FF6666;
             border-radius: 8px;
             color: #FF6666;
             padding: 0.03rem 0.05rem;
         }
        .deleteDia{
            padding: 25px;
            font-size: 14px;
            line-height: 1.5;
            text-align: center;
        }
    }
    .title_mes{
        background: white;
        line-height: 0.4rem;
        font-size: 0.14rem;
        text-align: center;
        padding: 0 0.15rem;
    }
    /deep/.operate-btn .van-col[data-v-630cacce]:first-child{
        background: #FF6666;
    }
    .bottom_text{
        font-size: 0.14rem;
        position: fixed;
        bottom: 0.4rem;
        text-align: center;
        width: 100%;
        line-height: 0.4rem;
        background: white;
    }
    /deep/.van-tabs__line{
        width: 188px;transform: none;
        background-color: blue;
    }
    .box {
        padding: 0 0.15rem ;
        line-height: 0.45rem;
        border-bottom: solid 1px #CCCCCC;
    }
    .boxse {
        padding: 0 0.15rem 0.15rem 0.15rem;
        line-height: 0.45rem;
        border-top: solid 1px #CCCCCC;
        border-bottom: solid 1px #CCCCCC;
    }
    #id{
        border-top: solid 1px #CCCCCC;

    }
    /deep/.van-search{
        padding: 0.1rem;
    }
    /deep/.van-tabs--line .van-tabs__wrap{
        border-bottom: solid 1px #dddddd;
    }
    .search_box{
        height: 0.3rem;
        line-height: 0.3rem;
        padding: 0;
        margin-top: 0.1rem;
        width: 70%;
        margin-right: 0.1rem;
    }
    .Stu_mes{
        text-align: center;
        border: solid 1px #CCCCCC;
        border-radius: 8px;
        padding: 0.1rem;
        margin: 0.05rem;
    }
    .Stu_mes img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
    /deep/.operate-btn .van-col[data-v-46a72186]:first-child{
        background: #6699CC;
    }
    /deep/.operate-btn .van-col[data-v-46a72186]:last-child{
        background: #66CC99;
    }
   #box{
       border: none;
   }
    .timebox{
        margin:0.2rem 0;
        line-height: 0.4rem;
        text-align: center;
    }
</style>
