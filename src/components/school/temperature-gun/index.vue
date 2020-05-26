<template>

    <div class="body">
        <van-nav-bar
                title="学生体温"
                :left-text="isFromTemplate ? '' : '返回'"
                :left-arrow="!isFromTemplate"
                right-text="筛选日期"
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />

        <div class="top_mes">
            <van-row>
                <van-col span="8" style="text-align: left">{{test.totalCount}}个学生</van-col>
                <van-col span="8" style="text-align: center">{{changeName}}</van-col>
                <van-col span="8" style="text-align: right">{{test.feverNumber}}人发烧</van-col>
            </van-row>
        </div>

        <div class="ac_line"></div>


        <div class="top_mes_c">
            <van-row>
                <van-col span="8" style="text-align: left">
                    <a   @click="onClassNameActivateSlecte">{{className}}
                        <van-icon name="arrow-down"  @click="onClassNameActivateSlecte"/>
                    </a>
                </van-col>
                <van-col span="8" style="text-align: center">
                    <a @click="onGradeActionsheet" >{{gradeName}}
                        <van-icon name="arrow-down" @click="onGradeActionsheet"/>
                    </a>
                </van-col>
                <van-col span="8" style="text-align: right" >
                    <a  @click="onStuStateActivateSlecte">{{stuState}}
                        <van-icon name="arrow-down" @click="onStuStateActivateSlecte"/>
                    </a>
                </van-col>
            </van-row>
        </div>

        <div class="mid_mod">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <div class="mes_list" v-for="(item,index) in test.list" :key="index">
                    <div>
                        <van-row>
                            <van-col span="4">
                                <a style="font-weight: 700;color: #6699FF" @click="jump(item.stuId)">
                                    {{item.stuName}}
                                </a>
                            </van-col>
                            <van-col span="4">{{item.gradeName}}</van-col>
                            <van-col span="4">{{item.className}}</van-col>
                            <van-col span="6">{{ item.latestTemperature > 0 ? `最近${item.latestTemperature}℃` : '' }}</van-col>
                            <van-col span="6" >
                                <a @click="ShowMore(index,1)" :id="'MoreMesC'+index">发烧{{item.feverNumber}}次
                                    <van-icon name="arrow-down" @click="ShowMore(index,1)" style="font-weight: 700;color:#6699FF"/>
                                </a>
                                <a @click="ShowMore(index,2)" :id="'MoreMesC_up'+index" style="display: none;">发烧{{item.feverNumber}}次
                                    <van-icon name="arrow-up" @click="ShowMore(index,2)" style="font-weight: 700;color:#6699FF"/>
                                </a>
                            </van-col>
                        </van-row>
                    </div>
                    <div :id="'moreMes'+index" class="mes_img_outbox">
                        <div class="mes_img_outboxse">
                            <div class="mes_img_box" v-for="(item2,index2) in item.temperatures">
                                <div style="margin: 0.1rem 0;">
                                    {{item2.date}}
                                </div>
                                <div>
                                    <div class="noimg_box" v-if="item2.type === 1">
                                        教师手动录入无照片
                                    </div>
                                    <div class="img_box" v-else @click="showImg(item2.image)">
                                        <img :src="item2.image">
                                    </div>
                                </div>
                                <div style="margin: 0.1rem 0;">
                                    {{item2.time}}
                                    <a v-if="item2.temperature >=38" style="color: red;font-weight: 700">{{item2.temperature}}℃</a>
                                    <a v-else>{{item2.temperature}}℃</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>

        <ChangeDate :default-selected="1" :option-type="2" ref="child" @change="changeFun($event)"> </ChangeDate>

        <div class="select-menu">
            <van-actionsheet v-model="showClassName" :actions="ClassFilterOptions" @select="onSelectClassName"/>
            <van-actionsheet v-model="showStuState" :actions="statusFilterOptions" @select="onSelectStuState"/>
            <van-actionsheet v-model="showGrade" :actions="gradeFilterOptions" @select="onSelectGrade"/>
        </div>

    </div>
</template>

<script>
    import ChangeDate from '../../common/date-range-filter-dialog.vue';
    import { formatDate } from '@/utils'
    import { NavBar,Switch,Tab,Tabs,Row, Col,Dialog,Button,Toast,Icon,Cell,DatetimePicker,Popup,Actionsheet,List,ImagePreview    } from 'vant';
    import { History , selectClassList } from '@/api/temperature-gun/app';
    import { getParamFromUrlAndRoute } from '@/utils'


    export default {
        name: "automatic-mode",
        data() {
            return {
                // 筛选日期参数
                setTime:true,
                isShow:false,

                setDIY:false,
                Datetype:'',
                CStime:false,
                currentDate: new Date(),
                year:new Date().getFullYear(),
                month: new Date().getMonth()+1 ,
                days:new Date().getDate(),

                // 状态下拉表参数
                showStuState: false, //状态隐藏状态下拉列表
                showClassName: false, //班级隐藏状态下拉列表
                showGrade: false, //年级隐藏状态下拉列表
                stuState:'全部状态',
                gradeName:'全部年级',
                className:'全部班级',
                stuStateId:'',
                stuStateList: [
                    "全部状态",
                    "发烧",
                    "正常",
                ],
                classFilterIndex:0,
                stateFilterIndex:0,
                gradeFilterIndex:0,

                test:[],
                status:1,
                classId:'',
                grade:'',
                nextId:0,

                loading: false,
                finished: false,

                //年级列表
                gradeList: ['全部年级', '一年级','二年级','三年级','四年级','五年级','六年级','初中'],
                // 班级列表
                classList:[],
                ClassNameList:[],
                // 获取班级数据参数
                page: 1,//当前页
                pageSize: 0,//每页数据 (因为要兼顾拖动排序, 所以不能分页, 设置为0)

                changeName:'今日',
                changeStart:null,
                changeEnd:null,
                isFromTemplate: false,
                templateId: 0,
            };
        },
        components: {
            [Toast.name]: Toast,
            [Cell.name]: Cell,
            [Popup.name]: Popup,
            [NavBar.name]: NavBar,
            [ImagePreview.name]: ImagePreview,
            [List .name]: List ,
            [Actionsheet.name]:Actionsheet  ,
            [Button.name]: Button ,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Switch.name]: Switch,
            [DatetimePicker.name]: DatetimePicker,
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon .name]: Icon ,
            [Dialog .name]: Dialog ,
            ChangeDate: ChangeDate,

        },
        computed: {
            ClassFilterOptions() {
                return this.ClassNameList.map((name,index) => {
                    return {
                        index,
                        name,
                        className: index === this.classFilterIndex ? 'GradeActive' : 'non-active',
                    }
                })
            },
            gradeFilterOptions() {
                return this.gradeList.map((name, index) => {
                    return {
                        index,
                        name,
                        className: index === this.gradeFilterIndex ? 'GradeActive' : 'non-active',
                    }
                })
            },
            statusFilterOptions() {
                return this.stuStateList.map((name, index) => {
                    return {
                        index,
                        name,
                        className: index === this.stateFilterIndex ? 'GradeActive' : 'non-active',
                    }
                })
            },
        },
        methods:{
            // 查看图片
            showImg(img){
                ImagePreview([
                    img
                ]);
            },
            changeFun(data){
                console.log(data)
                this.changeName = data.name
                this.changeStart = formatDate(new Date(data.startDate))
                this.changeEnd = formatDate(new Date(data.endDate))
                this.nextId = 0
                this.HistoryFun()
            },
            //获取班级列表
            selectClassList() {
                selectClassList(this.page, this.pageSize)
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            this.classList = res.data.data.list

                            const classListNew = ['全部班级']
                            for(let i=0;i<this.classList.length;i++){
                                classListNew.push(this.classList[i].name)
                            }
                            this.ClassNameList = classListNew
                        }
                    }).catch(() => {
                    throw new Error("获取班级列表异常！")
                })
            },
            onLoad() {
                this.$loading()
                // 异步更新数据
                setTimeout(() => {
                    if (this.test.list.length > 0) {
                        const ids = this.test.list.map(item => item.stuId)
                        this.nextId = Math.min.apply(Math, ids)
                    } else {
                        this.nextId = 0
                    }
                    console.log(this.nextId)
                    const data = {}
                    data.startDate = this.changeStart
                    data.endDate = this.changeEnd
                    data.nextId = this.nextId
                    if(this.classId){
                        data.classId = this.classId
                    }
                    if(this.grade){
                        data.grade = this.grade
                    }
                    if(this.status){
                        data.status = this.status
                    }
                    History(data)
                        .then(res => {
                            if (res.data.meta.success) {
                                this.$loadingHide()
                                const list = res.data.data.list
                                if (Array.isArray(list) && list.length > 0) {
                                    this.test.list = this.test.list.concat(list)
                                } else {
                                    this.finished = true
                                }

                                console.log(this.test)

                            }
                        }).catch(() => {
                        throw new Error("获取历史体温异常！")
                    }) .finally(() => {
                        this.loading = false
                    })
                }, 1500);
            },
            // 获取历史体温
            HistoryFun() {
                this.$loading()

                const data = {}
                data.startDate = this.changeStart
                data.endDate = this.changeEnd
                data.nextId = this.nextId
                if(this.classId){
                    data.classId = this.classId
                }
                if(this.grade){
                    data.grade = this.grade
                }
                if(this.status){
                    data.status = this.status
                }
              if (this.isFromTemplate && this.templateId > 0) {
                data.from = 'template'
                data.template_id = this.templateId
              }
                History(data)
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            this.$loadingHide()
                            this.test= res.data.data
                        }
                    }).catch(() => {
                    throw new Error("异常！")
                })
            },
            //年级选择点击事件
            onGradeActionsheet() {
                this.showGrade = true;
            },
            //年级选择
            onSelectGrade(item) {
                this.page = 1;
                this.finished = false;
                this.showGrade = false;
                this.gradeName = item.name;
                this.gradeId = item.id;
                this.studentList= [];
                this.reloader = false;
                this.$nextTick(()=>{
                    this.reloader = true;
                })
                this.gradeFilterIndex = item.index
                this.nextId = 0
                this.grade = item.index
                this.HistoryFun()

                console.log(item.index)

            },
            //班级选择点击事件
            onClassNameActivateSlecte() {
                this.showClassName = true;
            },
            //班级选择
            onSelectClassName(item) {
                this.finished = false;
                this.page = 1;
                this.showClassName = false;
                this.className = item.name;
                this.studentList= [];
                this.reloader = false;
                this.$nextTick(()=>{
                    this.reloader = true;
                })

                this.classFilterIndex = item.index

                let index = item.index-1

                if(index < 0){
                    this.classId = ''
                }else{
                    this.classId = this.classList[index].id;
                }
                this.nextId = 0
                this.HistoryFun()

                console.log(index)
            },
            // 状态点击事件
            onStuStateActivateSlecte() {
                this.showStuState = true;
            },
            //状态选择
            onSelectStuState(item) {
                this.page = 1;
                this.finished = false;
                this.showStuState = false;
                this.stuState = item.name;
                this.stuStateId = item.index;

                this.stateFilterIndex = item.index
                this.status = item.index+1

                this.nextId = 0
                this.HistoryFun()
            },
            // 箭头隐藏显示信息
            ShowMore(index,type){
                if(type === 1){
                    document.getElementById('moreMes'+index).style.display = 'none'
                    document.getElementById('MoreMesC'+index).style.display = 'none'
                    document.getElementById('MoreMesC_up'+index).style.display = 'block'
                    document.getElementById('MoreMesC_up'+index).style.display = 'block'
                }
                else if(type === 2){
                    document.getElementById('moreMes'+index).style.display = 'block'
                    document.getElementById('MoreMesC'+index).style.display = 'block'
                    document.getElementById('MoreMesC_up'+index).style.display = 'none'
                    document.getElementById('MoreMesC_up'+index).style.display = 'none'
                }

            },
            getMsgFormSon(data,year,week){
                this.date = data
                this.year = year
                this.week = week
            },
            onClickLeft(){
                this.$router.back()
            },
            onClickRight(){
                this.$refs.child.show();
            },
            ShowComment(){
                this.show = true
            }
        },
        mounted(){
          const templateId = getParamFromUrlAndRoute('template_id', this.$router)
          if (templateId) {
            this.isFromTemplate = true
            this.templateId = templateId
          }
            this.changeStart = this.year+"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))+"-"+this.days
            this.changeEnd = this.year+"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))+"-"+this.days
            this.HistoryFun()
            this.selectClassList()
        }

    }
</script>

<style scoped>
    *{
        word-wrap:break-word
    }
    .body{
        font-size:0.14rem
    }
    .ac_line{
        height: 0.1rem;
        background: #F3F7F8;
        /*float: left;*/
        /*width: 100%;*/
    }
    .top_mes{
        line-height: 0.4rem;
        padding: 0 0.15rem;
        border-bottom: solid 1px #CCCCCC;
    }
    .top_mes_c{
        line-height: 0.4rem;
        padding: 0 0.15rem;
        border-bottom: solid 1px #CCCCCC;
        color: #6699FF;
    }
    .mes_list{
        text-align: center;
        padding: 0.1rem 0;
        border-bottom: solid 1px #CCCCCC;
    }
    .img_box{
        width: 0.8rem;
        height: 0.8rem;
        margin: 0 auto;
    } .img_box img{
          width: 100%;
          height: 100%
      }
    .noimg_box{
        border: solid 1px #d5d5d5;
        width: 0.8rem;
        height: 0.8rem;
        margin: 0 auto;
        line-height: 0.4rem;
    }
    .timebox{
        margin: 0.2rem 0;
        line-height: 0.4rem;
        text-align: center;
    }
    .mes_img_outbox{
        overflow: scroll;
        width: 100%;

    }
    .mes_img_outboxse{
        min-width: 100vw;
        overflow: scroll;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
    }
    .mes_img_box{
        float: left;
        width: 1.2rem;
        flex-shrink: 0;
    }
    .GradeActive {
        color: #fff;
        background: #3770fb;
    }
    .mid_mod .van-icon{
        color: #6699FF;
    }
</style>
