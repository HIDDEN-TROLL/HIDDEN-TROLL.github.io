<template>
    <div id="safflower-score"
         :style="{minHeight:`${hieght}px`}" style="margin-bottom: 1rem;font-size: 0.2rem;">
        <!--考勤关联学生-->
        <div class="go-back" ref="nav">
            <van-nav-bar
                    title="兑换奖品"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
            />

        </div>

        <div class="class-info">
            <div class="stat-list">
                <ClassList :class-list="testse" v-on:classGrade="getChangeIndex"></ClassList>
            </div>
        </div>
        <div class="class-tabel">
            <div class="table-select">

                <span>
                    <a @click="gradeModel = !gradeModel" class="class_button">
                        <van-switch
                                v-model="checked"
                                active-color="#07c160"
                                inactive-color="white"
                        />
                    </a>
                        {{gradeModel ? '显示红花数目' : '隐藏红花数目'}}
                </span>

            </div>
            <div class="student-btn" v-if="studentList.length>0">
                <div style="overflow: hidden;transition: all 2s;"
                     :style="{width:getWidth,transform:`translateX(${translateX}rem)`}">
                    <div style="width: 3.43rem" class="page-list" v-for="(item,index) in currClassStudentList" :key="index"
                         @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
                        <van-row gutter="8" class="" v-if="item.length>0">
                            <van-col span="6" v-for="(val, idx) in item" :key="idx">
                                <van-button plain type="primary" @click="chooseStudent(val.stuId)" :class="{active:val.curr,hg:!gradeModel}">
                                    {{val.stuName}} <br/> <span v-if="gradeModel">{{val.safflowerNum}}</span>
                                    <div class="saf-mark" v-if="(reward === 0 &&val.rewardNum)||(reward === 1 &&val.deductNum)">{{reward
                                        === 0 ? '+':'-'}}{{reward === 0 ? val.rewardNum : val.deductNum}}
                                    </div>
                                </van-button>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </div>
        </div>

        <div class="ac_line" style="margin: 0.15rem 0;"></div>

        <div class="body">
            <div style="font-size:0.12rem;color: #999999;margin: 0 0.15rem">
                <div>学生名称下方显示该学生剩余可兑奖红花总数</div>
                <div>每日增加的可兑奖红花数于当天24:00统计至"可兑奖红花总数"中</div>
            </div>
            <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
        </div>
        <!--<div class="bg" :style="bgheight" v-show="bgshow" @click="operateBg"></div>-->
    </div>
</template>

<script>
    import { NavBar, Icon, Button, Row, Col, Tab, Tabs, Toast, Field, Uploader,Switch } from "vant";
    import ClassList from './components/class-list';
    import FooterBtn from '../../common/footer-operate-btn'
    import { ExchangePrizes } from '@/api/teacher/exchange-prizes'
    import { getAccountList } from '@/api/common/index'

    export default {
        name: "safflower-score",
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Row.name]: Row,
            [Col.name]: Col,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Toast.name]: Toast,
            [Field.name]: Field,
            [Uploader.name]: Uploader,
            [Switch.name]: Switch,
            ClassList: ClassList,
            FooterBtn: FooterBtn,
        },
        inject: ["reload"],
        data() {
            return {
                testse:[],

                test:[],
                adds:false,
                addlifem:false,
                addlifeb:false,
                checked: true,
                showpage:true,//重载
                gradeModel:true,//是否显示年级
                hieght: document.documentElement.clientHeight,//屏幕高度
                classList: [],//保存班级列表  todo 班级列表 与 学生列表 是一一对应
                studentList: [],//保存学生列表
                page: 1,//当前班级学生页数
                count: 1,//当前班级学生总页数
                currClassStudentList: [],//数据处理当前班级的学生列表 一页显示16个学生
                limit: 16,//每页显示学生数量
                translateX: 0,//左右滑动
                translateY: 0,//上下滑动
                startX: 0, //开始触摸x的位置
                startY: 0, //开始触摸y的位置
                endX: 0, //结束触摸的位置
                endY: 0,//
                disX: 0, //移动距离
                disY: 0,//
                lastX: 0, //结束X坐标
                lastY: 0, //结束Y坐标
                active: 0,//切换班级
                reward: 0,//保存 奖励  与  扣除 切换
                //定义页面固定底部按钮
                btnText: [
                    {
                        type: 1,
                        title: '下一步',
                    },
                ],
                currentLen: 0,//保存选择的学生数量
                currentStudent: [],//保存选择的学生id
                commentsLen: 0,//保存选择的评语数量
                currentClaass: '',//保存当前选择的班级
                currentClaassId: null,//保存当前选择的班级id
                commentBox: false,//评分评语显示
                upSlide: false,//是否 可执行上滑动
                commentHieght: 0,//评语框高度
                commentBottom: 0,//距离底部的距离
                zIndex: 100,
                Loop: null,// 删除 图片
                manageshow: false,//更多功能
                bgshow: false,
                commentmodel: {
                    addCommentDialog: false,//新增评语弹出框
                    addContent: '',//新增评语内容
                    addFlowerNum: 0,//新增花朵数量
                    current: 0,//评语内容切换
                    commentT: [],// 评语标题数组
                    commentC: [],//评语 详情
                    commentCurrent: [],//当前页面显示的 评语列表 （二维数组）
                    pageLimit: 5,//每页显示的评语数量
                    cStartX: 0,//评语 左右滑动开始位置
                    cEndX: 0,//评语 左右滑动结束位置
                    cDisx: 0,// 手滑动的距离
                    cPage: 1,
                    cCountPage: 1,
                    cTotalFlower: 0,//选中的红花数量总和
                    imgurl: [],//保存上传图片的URL
                    imgKey: [],//保存需要传递给后台的 key
                    cTranslateX: 0,//左右滑动距离
                },
              currentStuId:null,//选中学生id
              currentStuFlower:null,//选中学生红花数量
              userType:null
            };
        },
        methods: {
            operateBtn(){
              if (this.currentStuFlower > 0) {
                this.$router.push({name:'TeacherMallExchangePrize',params:{id:this.currentStuId,flower:this.currentStuFlower}})
              }else {
                Toast("红花数量不足")
              }
            },

            onClickLeft() {
              if (this.userType === 2) {
                this.$router.push({name:"TeacherHomeWorkbench"})
              }else if (this.userType === 3) {
                this.$router.push({name:"SchoolHomeWorkbench"})
              }else{
                this.$router.back(-1);
              }
            },
            onClickRight() {
                this.manageshow = true;
                this.bgshow = true;
            },
            operateBg() {
                this.manageshow = false;
                this.bgshow = false;
            },
            // 切换 奖励 与 扣除

            //一键选中所有学生

            //单个学生 选中 与取消
            chooseStudent(stuId) {
                this.currentLen = 0;
                this.currentStudent = [];
                for (let item of this.studentList[this.active]) {
                    if (item.stuId === stuId) {
                      item.curr = true;
                      this.currentStuId = item.stuId;
                      this.currentStuFlower = item.safflowerNum;
                    }else {
                      item.curr = false;
                    }
                }
                for (let item of this.studentList[this.active]) {
                    if (item.curr) {
                        this.currentLen = this.currentLen + 1;
                        this.currentStudent.push(item.stuId)
                    }
                }
            },
            // 切换班级重置
            getChangeIndex(obj) {
                if (obj.active !== this.active) {//如果操作的是同一个班级
                    this.currentLen = 0;
                    this.active = obj.active;
                    this.page = 1;//切换时 当前页重置为1
                    this.translateX = 0;
                    //切换时 将 所有 已选择的 学生重置为 未选中
                    if (this.studentList[this.active].length > 0) {
                        for (let item of this.studentList[this.active]) {
                            item.curr = false;
                        }
                    }
                    this.currentClaass = this.testse[this.active].name;
                    this.currentClaassId = this.testse[this.active].id;
                    //
                    this.currentShowDataArr(this.active);
                    // //将所有 选择的 评语 清除
                    this.commentmodel.commentT = [];
                    this.commentmodel.cTotalFlower = 0;
                    this.commentmodel.commentC = [];
                    this.commentsLen = 0;
                    this.commentmodel.current = 0
                }
            },
            //获取数据
            selectClassList() {
                ExchangePrizes()
                    .then(res => {
                        if (res.status === 200) {
                            if (res.data.data) {
                                for (let item of res.data.data) {
                                    this.testse.push({
                                        id: item.clsId,
                                        name: item.clsName,
                                    });
                                    for (let val of item.stuList) {
                                        val["curr"] = false;
                                    }
                                    this.studentList.push(item.stuList)
                                }
                                this.currentShowDataArr(0);
                                this.currentClaass = this.testse[0].name;
                                this.test = res.data.data;
                            }
                        }
                    }).catch(() => {
                    throw new Error("异常！")
                })
            },

            GetExchangePrizes(){
                ExchangePrizes()
                    .then(res => {
                        this.test = res.data.data;
                        console.log(this.test)
                        // console.log(this.work)

                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            //左右滑动
            touchstart(ev) {
                this.startX = 0;
                ev = ev || event;
                if (ev.touches.length === 1) {
                    this.startX = ev.touches[0].clientX;
                    //this.startY = ev.touches[0].clientY;
                }
                //console.log(ev)
            },
            touchmove(ev) {
                this.endX = 0;
                this.disX = 0;
                ev = ev || event;
                // console.log(ev);
                //保存最终的 x y
                if (ev.touches.length === 1) {
                    this.endX = ev.changedTouches[0].clientX;
                    //this.endY = ev.changedTouches[0].clientY;
                    this.disX = this.endX - this.startX;
                    //this.disY = this.endY - this.startY;
                }
            },
            touchend(ev) {
                ev = ev || event;
                //console.log(ev);
                if (ev.changedTouches.length === 1) {
                    //左滑动
                    if (this.disX < 0 && Math.abs(this.disX) > 30) {
                        //如果可滑动
                        if (this.page < this.count) {
                            this.page = this.page + 1;
                            this.translateX = this.translateX - 3.59;
                        }

                    } else if (this.disX > 0 && Math.abs(this.disX) > 30) {//右滑动
                        //如果可滑动
                        if (this.page > 1) {
                            this.page = this.page - 1;
                            this.translateX = this.translateX + 3.59
                        }
                    }
                }
            },





            //当前班级显示的学生
            currentShowDataArr(index) {
                if (this.studentList.length > 0) {
                    this.currClassStudentList = [];
                    let arr = this.studentList[index];
                    //console.log(index);
                    if (arr.length <= this.limit && arr.length > 0) {//每页显示 16 个学生
                        //this.page = 1;
                        this.count = 1;
                        this.currClassStudentList.push(arr)
                      this.currClassStudentList[0][0].curr = true;
                      this.currentStuId = this.currClassStudentList[0][0].stuId;
                      this.currentStuFlower = this.currClassStudentList[0][0].safflowerNum;
                    } else if (arr.length > this.limit) {
                        this.count = Math.ceil(arr.length / this.limit);
                        //this.page = 1;
                        for (let i = 0; i < this.count; i++) {
                            let middleArr = [];
                            if (i === 0) {
                                for (let n = 0; n < this.limit; n++) {
                                    middleArr.push(arr[n])
                                }
                            } else {
                                for (let v = this.limit * i; v < this.limit * (i + 1); v++) {
                                    if (arr.length > v) {
                                        middleArr.push(arr[v])
                                    }
                                }
                            }
                            this.currClassStudentList.push(middleArr);
                        }
                      this.currClassStudentList[0][0].curr = true;
                      this.currentStuId = this.currClassStudentList[0][0].stuId;
                      this.currentStuFlower = this.currClassStudentList[0][0].safflowerNum;
                    }
                }
            },

            cleartime() {
                // 这个方法主要是用来将每次手指移出之后将计时器清零
                clearInterval(this.Loop);
            },
        },
        created() {
            this.selectClassList();
            //this.GetExchangePrizes();
          getAccountList()
            .then(res=>{
              if (res.data.meta.code === 0) {
                let d = res.data.data.filter(item=>item.isCurrent);
                this.userType = d[0].type;
              }
            })
            .catch(()=>{
              throw new Error("异常！")
            })
        },
        computed: {
            getWidth: {
                get() {
                    let len = this.count;
                    return `${3.75 * len}rem`
                },
            },
            commentTitle: {
                get() {
                    let len = this.commentmodel.commentT.length;
                    if (len > 0) {
                        let w = 0.56 * len;
                        return { width: `${w}rem` }
                    } else {
                        return { width: 0 }
                    }
                },
            },
            commentBoxWidth: {
                get() {
                    let len = this.commentmodel.cCountPage;
                    return `${3.75 * len}rem`
                },
            },
            bgheight: {
                get() {
                    let height = document.documentElement.clientHeight;
                    return { height: `${height}px` }
                },
            },
        },
    };
</script>

<style scoped lang="less">
    #safflower-score {
        font-size: 0;
        background-color: #fff;

        .bg {
            background-color: #ddd;
            opacity: .4;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 10000;
        }

        .go-back {
            .van-nav-bar {
                background-color: #3770fb;

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

            .downmenu {
                position: absolute;
                top: 0.42rem;
                right: 0.1rem;
                z-index: 10001;
                width: 1rem;
                background-color: #fff;
                padding: 0 0.1rem;
                border-radius: 0.03rem;
                box-sizing: border-box;

                span {
                    display: block;
                    font-size: 0.12rem;
                    color: #666;
                    border-bottom: 0.01rem solid #ddd;
                    padding: 0.08rem 0;
                    text-align: center;
                }

                span:last-child {
                    border-bottom-width: 0;
                }

                i {
                    position: absolute;
                    top: -0.09rem;
                    right: 0.1rem;
                    border: 0.05rem solid transparent;
                    border-bottom-color: #fff;
                }
            }
        }

        .tip-top {
            font-size: 0.14rem;
            height: 0.48rem;
            line-height: 0.48rem;
            color: #84C225;
            text-align: center
        }

        .choose-info {
            font-size: 0.14rem;
            height: 0.48rem;
            line-height: 0.48rem;
            color: #84C225;
            text-align: center
        }

        .check-btn {
        }

        .class-info {
            .stat-list {
                padding: 0.05rem 0.16rem 0;
                background-color: #fff;
                box-sizing: border-box;
            }

            .select-cell {
                height: 48px;
                justify-content: center;
                align-items: center;
            }

            .select-cell {
                color: #666;
                padding: 0 0.16rem;
                height: 0.48rem;
                font-size: 0.14rem;
                text-align: center;
                line-height: 0.48rem;
            }

        }

        .class-tabel {
            font-size: 0.14rem;
            color: #666;
            /*line-height: 0.48rem;*/
            padding: 0.16rem;

            .table-select {
                text-align: right;

                .van-row {
                    border-bottom: 1px solid #EEE;

                    .van-col {
                        display: flex;
                        align-items: center;

                        img {
                            width: 0.24rem;
                            height: 0.24rem;
                            text-align: center;
                        }

                        span {
                            padding: 0 0.1rem;

                        }

                        .van-button--plain.van-button--primary {
                            color: #3770FB;
                        }

                        .van-button--primary {
                            border-color: #3770FB;
                            border-radius: 3px;
                            width: 100%;
                        }

                        .van-button {
                            margin-top: 0.12rem;
                            height: 0.26rem;
                            line-height: 0.24rem;
                        }
                    }

                    .van-col + .van-col {
                        font-size: 0.12rem;
                        color: #999;
                        text-align: left;
                    }
                }
            }

            .student-btn {
                width: 100%;
                overflow: hidden;

                .page-list {
                    float: left;
                    margin-right: 0.16rem;
                    min-height: 2rem;
                }

                .van-button--plain.van-button--primary {
                    color: #3770FB;
                }

                .van-button--primary {
                    border-color: #3770FB;
                    border-radius: 3px;
                    width: 100%;
                }

                .van-button--plain.van-button--primary.active {
                    background-color: #3770FB;
                    color: #fff;
                }

                .van-button {
                    margin-top: 0.12rem;
                    min-height: 0.26rem;
                    line-height: 0.18rem;
                    position: relative;
                    padding: 0.04rem 0;
                    text-align: center;

                    .saf-mark {
                        width: 0.3rem;
                        height: 0.18rem;
                        line-height: 0.18rem;
                        position: absolute;
                        color: #FFF;
                        background-color: #D80000;
                        border-radius: 0.2rem;
                        font-size: 0.12rem;
                        text-align: center;
                        top: -0.13rem;
                        right: -0.01rem;
                    }
                }
                .hg.van-button{
                    height: 0.26rem;
                }
            }

            .pages {
                margin-top: 0.1rem;
                overflow: hidden;
                text-align: center;
                font-size: 0.12rem;
                line-height: 0.3rem;
                color: #999;

                .nums {
                    margin: 0 0.3rem;
                }
            }


        }

        .prompt {
            font-size: 0.12rem;
            color: #999999;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            text-align: center;
            background-color: #fff;
            height: 0.4rem;
            line-height: 0.4rem;
            /*transform: translateX(-50%);*/
            z-index: 101;
        }

        .comments-box {
            width: 100%;
            position: fixed;
            left: 0;
            background-color: #fff;
            transition: all 2s;
            z-index: 100;

            .title {
                font-size: 0.12rem;
                color: #999999;
                line-height: 0.3rem;
                text-align: center;
                margin-bottom: 0.1rem;
            }

            .comments-content {
                width: 100%;
                padding: 0 0.16rem;
                overflow: hidden;
                box-sizing: border-box;

                .comment-box {
                    width: 100%;
                    overflow: hidden;
                    height: 0.6rem;

                    .scroll-x {
                        overflow-x: scroll;
                        height: 0.7rem;

                        .comment-title-list {
                            overflow: hidden;

                            .comment-title {
                                float: left;
                                font-size: 0.12rem;
                                color: #666;
                                margin-right: 0.16rem;
                                width: 0.4rem;
                                height: 0.6rem;
                                padding: 0.05rem;
                                text-align: center;
                                border: 0.01rem solid #ddd;
                                border-radius: 0.05rem;
                                box-sizing: border-box;

                                span {
                                    display: block;
                                    width: 100%;
                                }
                            }

                            .comment-title.active {
                                border-color: #3770fb;
                                color: #3770fb;
                            }
                        }
                    }
                }

                .comments-detail {
                    .comment-list {
                        transition: all 2s;
                        overflow: hidden;
                        height: 2rem;

                        .tab-items {
                            float: left;
                            width: 3.43rem;
                            padding: 0 0.16rem;
                            font-size: 0.14rem;
                            box-sizing: border-box;

                            .van-row {
                                .van-col {
                                    padding-top: 0.13rem;

                                    .van-button--default {
                                        text-align: center;
                                        padding: 0;
                                        width: 100%;
                                        height: 0.26rem;
                                        line-height: 0.26rem;
                                        border-color: #999;
                                        border-radius: 3px;
                                        color: #666;

                                        .btn-l {
                                            display: inline-block;
                                            width: 0.32rem;
                                            height: 0.26rem;
                                            float: left;
                                            border-right: 1px solid #999;
                                        }

                                        .btn-r {
                                            display: inline-block;
                                            text-align: center;
                                            height: 0.26rem;
                                        }
                                    }

                                    .van-button--default.active {
                                        background-color: #3770fb;
                                        color: #fff;
                                    }
                                }
                            }
                        }
                    }

                    .total-flower {
                        position: absolute;
                        left: 0;
                        bottom: 0.4rem;
                        width: 100%;
                        /*transform: translateX(-50%);*/

                        p {
                            font-size: 0.14rem;
                            color: #666;
                            line-height: 0.32rem;
                            text-align: center;
                        }
                    }

                    .pages {
                        margin-top: 0.1rem;
                        overflow: hidden;
                        text-align: center;
                        font-size: 0.12rem;
                        line-height: 0.3rem;
                        color: #999;

                        .nums {
                            margin: 0 0.3rem;
                        }

                        .add {
                            font-size: 0.14rem;
                            color: #3770fb;
                            float: right;
                            margin-right: 0.16rem;
                        }
                    }

                    .img-box {
                        overflow: hidden;
                        min-height: 0.6rem;

                        .img-list {
                            float: left;
                            margin-left: -0.1rem;

                            .img {
                                display: inline-block;
                                float: left;
                                width: 0.6rem;
                                height: 0.6rem;
                                margin-left: 0.1rem;
                                margin-bottom: 0.18rem;
                                position: relative;

                                img {
                                    float: left;
                                    width: 100%;
                                    height: 100%;
                                }
                            }

                            .upload {
                                display: inline-block;
                                float: left;
                                width: 0.3rem;
                                height: 0.3rem;
                                /*padding: 0.06rem;*/
                                font-size: 0.2rem;
                                margin-top: 0.15rem;
                                margin-left: 0.1rem;
                                color: #d6d6d6;
                                border: 0.01rem solid #d6d6d6;
                                box-sizing: border-box;
                                position: relative;

                                .van-uploader {
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    width: 0.2rem;
                                    height: 0.22rem;
                                    transform: translate(-50%, -50%);
                                }
                            }

                            .upload.curr {
                                margin-left: 0.1rem;
                            }
                        }

                    }
                }
            }
        }

        .add-info {
            .list {
                font-size: 0.14rem;
                color: #666;
                line-height: 0.18rem;
                padding: 0.1rem 0.15rem;

                .c-title {
                    color: #999;
                }
            }

        }
    }

    /deep/.van-switch{
        font-size: 0.14rem !important;
    }
    .ac_line{
        height: 0.1rem;
        background-color: #F3F7F8;
    }
    .list_mes{
        font-size: 0.17rem;
        border: solid 1px #999999;
        border-radius: 0.03rem;
        line-height: 0.26rem;
        color:#666666;
        margin-top: 0.05rem;
    }
    .flower_img{
        float: left;
        color: #D80000;
    }
    .mes_div{
        margin:  0.15rem;
    }
    .title{
        border-left: solid 5px #3770FB;
    }
    .title span{
        margin-left: 0.1rem;
    }
    .add{
        background: #CCCCCC;
        border-radius: 0.8rem;
        float: left;
        color: white;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        /*font-size: 0.08rem;*/
        text-align: center;
        margin: 0.02rem 0.12rem 0.02rem 0;
    }

    .img-box {
        overflow: hidden;
        min-height: 0.6rem;

        .img-list {
            float: left;
            margin-left: -0.1rem;

            .img {
                display: inline-block;
                float: left;
                width: 0.6rem;
                height: 0.6rem;
                margin-left: 0.1rem;
                margin-bottom: 0.18rem;
                position: relative;

                img {
                    float: left;
                    width: 100%;
                    height: 100%;
                }
            }

            .upload {
                display: inline-block;
                float: left;
                width: 0.3rem;
                height: 0.3rem;
                /*padding: 0.06rem;*/
                font-size: 0.2rem;
                margin-top: 0.15rem;
                margin-left: 0.1rem;
                color: #d6d6d6;
                border: 0.01rem solid #d6d6d6;
                box-sizing: border-box;
                position: relative;

                .van-uploader {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0.2rem;
                    height: 0.22rem;
                    transform: translate(-50%, -50%);
                }
            }

            .upload.curr {
                margin-left: 0.1rem;
            }
        }

    }
</style>
