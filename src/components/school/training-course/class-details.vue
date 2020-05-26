<template>
    <div id="attendance-type">
        <div class="go-back">
            <van-nav-bar
                    title="班级详情"
                    left-text="返回"
                    :right-text="this.$store.state.user.roleType === 42 ? '修改班级' : ''"
                    left-arrow
                    @click-left="onClickLeft"
                    @click-right="changeClass"
            />
        </div>
        <div class="body" >
            <div style="line-height: 0.25rem;padding:  0.15rem">
                <van-row v-if="TrainingClassName.length>5">
                    <van-col span="5">
                        <span>班级名称：</span>
                    </van-col>
                    <van-col span="7" style="padding-right: 0.05rem;">
                        <span>{{TrainingList.name}}</span>
                    </van-col>
                    <van-col span="12">
                        总课数：{{Classlist.number}}
                    </van-col>
                </van-row>
                <van-row v-else>
                    <van-col span="12">
                        <span>班级名称：{{TrainingList.name}}</span>
                    </van-col>
                    <van-col span="12">
                        总课数：{{Classlist.number}}
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="12">
                        <span v-if="teachers.length>1" @click="showteacherDiaFun">
                            教师：{{teachers[0].name}}...
                        </span>
                        <span v-else>
                            <span v-for="(item,index) in teachers" :key="index">
                              教师： {{item.name}}
                            </span>
                        </span>
                    </van-col>
                    <van-col span="12">
                        <span v-if="TrainingList.type === 1">
                        签到时间：
                            {{(TrainingList.entryTimeStart).substring(0,5)}}
                        -
                            {{(TrainingList.entryTimeEnd).substring(0,5)}}
                        </span>
                        <span v-if="TrainingList.type === 2">
                            时间：({{loopTime}})
                            {{signStartTime}}~{{signEndTime}}
                        </span>
                    </van-col>
                </van-row>
            </div>
            <div class="ac_line"></div>
            <div>
                <van-tabs  >
                    <van-tab title="排课日期">
                            <div style="text-align: center;padding: 0.1rem 0.15rem;color:#6699FF;border-bottom: solid 1px #dddddd;"
                            v-if="TrainingList.type === 2">
                                <span style="float: left;" @click="changemonth(1)">
                                  &#9668;
                                </span>
                                <span>
                                   {{year}}-{{month}}
                                </span>
                                <span style="float: right;" @click="changemonth(2)">
                                  &#9658;
                                </span>
                            </div>
                            <div class="box"   v-for="(item,index) in Classlist.classDate" :key="index">
                                <van-row >
                                    <van-col span="2"  >
                                            <span class="tabback"></span>
                                        <span
                                                v-if="index < 9"
                                                class="tab">
                                                {{index+1}}</span>
                                        <span
                                               v-else
                                               class="tabSe">
                                                {{index+1}}</span>
                                    </van-col>
                                    <van-col span="12" style="line-height: 0.225rem">
                                        <a v-if="TrainingList.type === 2">
                                            <span >{{item.date}}</span>
                                            <span style="margin-left: 0.1rem;" v-if="new Date(item.date).getDay() == 0">星期天<br></span>
                                            <span style="margin-left: 0.1rem;" v-else>星期{{new Date(item.date).getDay()}}<br></span>
                                        </a>
                                        <a v-if="TrainingList.type === 1">
                                            <span v-if="item.isStart === false">第{{index+1}}次课<br></span>
                                            <span v-if="item.isStart === true">
                                                <span>{{item.date}}</span>
                                                <span v-if="new Date(item.date).getDay() == 0">
                                                    星期天
                                                    <br>
                                                </span>
                                                <span style="margin-left: 0.1rem;" v-else> 星期{{new Date(item.date).getDay()}}<br></span>
                                            </span>
                                        </a>

                                        <span v-if="item.isStart === true" style="color: #6699FF;">已开课</span>
                                        <span v-else style="color: #FF6666;">未开课</span>
                                    </van-col>
                                    <van-col span="8" style="line-height: 0.225rem">
                                        考勤：{{item.signed}}
                                        /
                                        {{Classlist.studentCount}}
                                        <br>
                                        请假：{{item.leave}}
                                    </van-col>
                                    <van-col span="2" >
                                        <span class="icon" @click="pushSignin(item.arrangingId,TrainingList.isStart,
                                                                              item.isStart,TrainingList.type)"><van-icon name="arrow"/></span>
                                    </van-col>
                                </van-row>
                            </div>
                        <div class="bottom_btn" v-if="Classlist.overdue === 0">
                            <FooterBtn :event-arr="Finished" v-on:commenEvent="operateBtn"></FooterBtn>
                        </div>
                        <div  v-if="Classlist.overdue === 1">
                            <FooterBtn :event-arr="UnFinished" v-on:commenEvent="operateBtn"></FooterBtn>
                        </div>

                    </van-tab>
                    <van-tab title="学生列表" >
                        <div>
                            <van-row style="line-height: 0.35rem">
                                <van-col span="11" style="padding: 0.1rem 0 0.1rem 0.1rem;">
                                    <span @click="choiceYear">显示范围：{{SearchGrade}}</span>
                                  <van-icon name="arrow-down" /></van-col>
                                <van-col span="13">
                                   <input type="text" class="search_box" placeholder="请输入搜索的学生名称" id="searchvalue">
                                    <span style="background: #6699FF;padding: 0.05rem 0.08rem;color: white" @click="searchFun()"><van-icon name="search" /></span>
                                </van-col>
                            </van-row>
                        </div>
                        <van-row style="margin: 0 0.05rem">
                            <div v-for="(item,index) in StuList.list" :key="index">
                                <van-col span="6" v-if="item.gradeName === SearchGrade || SearchGrade === '全部年级'">
                                    <div class="Stu_mes" @click="jumpAttendance(item.classId,item.id)" >
                                        <div style="width: 0.6rem;height: 0.6rem;">
                                            <img :src="item.image">
                                         </div>
                                        <div v-if="item.name.length>3">
                                            {{(item.name).substring(0,3)}}...
                                        </div>
                                        <div v-else>
                                            {{(item.name)}}
                                        </div>
                                        <div style="color: #999999;font-size: 0.12rem;">
                                            {{item.gradeName}}
                                        </div>
                                    </div>
                                </van-col>
                            </div>
                        </van-row>
                        <div class="stu_list">
                            <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>

            <van-popup v-model="showse" position="bottom" :overlay="true">
                <div style="font-size: 0.14rem">
                    <van-picker
                            show-toolbar
                            title="选择年级"
                            :columns="columns"
                            @cancel="onCancel"
                            @confirm="onConfirm"
                    />
                </div>
                <div style="font-size: 0.14rem;line-height: 0.5rem;text-align: center;border-top: 1px solid #ebedf0;color: #1989fa" @click="back"> 点击此处显示全部年级 </div>
            </van-popup>

            <van-dialog
                    v-model="showteacherDia"
                    title="教师列表"
                    :show-confirm-button="true"
                    :show-cancel-button="false"
                    class="teacher_list"
            >
                <div style="overflow: scroll;height: 3rem">
                    <div  class="teacher_box"  v-for="(item,index) in TrainingList.teachers" :key="index">
                        <van-cell :value="item.name" />
                    </div>
                </div>
            </van-dialog>

            <!--手动结课弹窗提醒-->
            <van-dialog
                    v-model="FinishedClassDia"
                    title="结课提醒"
                    show-cancel-button
                    :show-confirm-button="true"
                    @confirm="endCourseFun()"

            >
                <div style="">
                    <div  style="text-align: center;padding: 0.15rem 0;color: red">
                        将结束班级内全部课程！是否确定？
                    </div>
                </div>
            </van-dialog>

        </div>
    </div>
</template>

<script>
    import { NavBar, Icon, Row, Col, Field, DatetimePicker, Popup, Toast,Tab, Tabs ,Search,Picker,Cell, CellGroup  } from 'vant';
    import FooterBtn from "../../common/footer-operate-btn";

    import { getTrainingClass,getClassMes,getClassStu,endCourse } from '@/api/school/training-course'
    import training from '@/store/modules/school/training'
    import { mapActions, mapState, mapMutations } from 'vuex'

    export default {
        name: "training-class-details",
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Search.name]: Search,
            [Row.name]: Row,
            [Col.name]: Col,
            [Picker.name]: Picker,
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
                today:new Date().getDay(),
                showteacherDia:false,
                showse:false,
                search:'',
                columns: [],
                Allcolumns: [],
                IdList: [],
                DeleteList: [],


                StuList: [],
                Classlist: [],
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                TrainingList: [],
                TrainingClassName:"",
                teachers: [],
                id: null,
                TrainingId: '',
                value: '',
                btnText: [
                    {
                        type: 1,
                        title: "新学生入班"
                    }, {
                        type: 2,
                        title: "老学生退班"
                    }, {
                        type: 3,
                        title: "更换教师"
                    },
                ],
                Finished: [
                    {
                        type: 4,
                        title: "手动结课"
                    }
                ],
                UnFinished: [
                    {
                        type: 5,
                        title: "班级已经结课"
                    }
                ],

                // 学生列表
                query: "",
                grade: 0,

                SearchGrade:'全部年级',
                signStartTime:'',
                signEndTime:'',
                loopTime:'',
                DateDays:0,

                // 手动结课
                FinishedClassDia:false
            }
        },
        computed: {
            ...mapState('training', [
                'isDataReady'
            ]),
        },
        methods:{
            showteacherDiaFun(){
                this.showteacherDia = true
            },
            // 切换月份
            changemonth(type){
                const minyear = this.Classlist.minMonth.substring(0, 4)
                const minmonth = this.Classlist.minMonth.substring(5, 7)
                const maxyear = this.Classlist.maxMonth.substring(0, 4)
                const maxmonth = this.Classlist.maxMonth.substring(5, 7)
                console.log(minmonth,this.month)
                if(type === 1){
                    if((this.year <= minyear) && (this.month  <= minmonth)){
                        Toast.fail('无数据')
                    }else{
                        this.month -=1
                        if(this.month === 0)
                            {
                                this.year-=1
                                this.month = 12
                            }
                        ((this.year <= minyear)&&(this.month < minmonth)) ? console.log('无数据') : null
                    }
                }else if(type === 2){
                    if((this.year >= maxyear) && (this.month  >= maxmonth)) {
                        Toast.fail('无数据')
                    }else{
                        this.month +=1
                        if(this.month === 13){
                            this.year+=1
                            this.month = 1
                        }
                    }
                }
                this.getClassMesFun()
            },
            // 搜索学生
            searchFun(){
                this.query = document.getElementById('searchvalue').value
                this.getClassStuFun()
            },
            back(){
                this.SearchGrade = '全部年级'
                this.getClassStuFun
                this.showse = false

            },
            onCancel(){
                this.showse = false
            },
            onConfirm(val){
                this.SearchGrade = val
                this.showse = false
            },
            choiceYear(){
                var resultArr = [];
                for (var i = 0; i < this.Allcolumns.length; i++) {
                    for (var j = 0; j < resultArr.length; j++) {
                        if (resultArr[j] == this.Allcolumns[i]) {
                            break;
                        }
                    }
                    if (j == resultArr.length) {
                        resultArr[resultArr.length] = this.Allcolumns[i];
                    }
                }
                // 弹窗筛选年级年级排序
                const arr = ['一', '二', '三', '四', '五', '六', '初','未']
                const list = resultArr.sort((a, b) => arr.indexOf(a[0]) - arr.indexOf(b[0]))
                this.columns = list
                if(resultArr.length>0 && resultArr != []){
                    this.showse = true
                }
            },
            // 获取学生列表
            getClassStuFun() {
                const data = {}
                const query = this.query
                const grade = this.grade
                const classId = this.id

                if (query) {
                    data.query = query
                }
                if (grade) {
                    data.grade = grade
                }
                data.classId = classId
                data.page = 0

                this.$loading('加载中',null,true)

                getClassStu(data)
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            this.$loadingHide()
                            this.StuList = res.data.data
                                var classlist= [];
                                    for (let lfd of this.StuList.list){
                                        classlist.push(lfd.gradeName)
                                    }
                                this.Allcolumns = classlist

                                var IdList= [];
                                    for (let lfd of this.StuList.list){
                                        IdList.push(lfd.id)
                                    }
                                this.IdList = IdList

                                this.DeleteList = res.data.data.list
                        }
                    }).catch(() => {
                    throw new Error("获取学生列表异常！")
                })
            },
            // 手动结束课程
            endCourseFun() {
                endCourse(this.id)
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            Toast.success('结课成功！')
                            this.$router.back(0)
                        }
                    }).catch(() => {
                    throw new Error("结课异常！")
                })
            },
            // 获取排课信息
            getClassMesFun() {
                getClassMes(this.year,this.month,this.id)
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                                this.Classlist = res.data.data
                        }
                    }).catch(() => {
                    throw new Error("获取排课信息异常！")
                })
            },
            getTrainingListFun() {
                getTrainingClass(this.id)
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                                this.TrainingList = res.data.data
                                this.teachers = res.data.data.teachers
                                this.TrainingClassName = res.data.data.name
                            if(res.data.data.type === 2){
                                const weekSignTime = this.TrainingList.weekSignTime
                                const minDate = []
                                if(weekSignTime.length === 1){
                                    this.signStartTime = weekSignTime[0].entryTimeStart.substring(0,5)
                                    this.signEndTime = weekSignTime[0].entryTimeEnd.substring(0,5)
                                    this.loopTime = weekSignTime[0].week
                                }else{
                                    for(let i=0;i<weekSignTime.length;i++){
                                        if(weekSignTime[i].week === new Date().getDay()){
                                            this.signStartTime = weekSignTime[i].entryTimeStart.substring(0,5)
                                            this.signEndTime = weekSignTime[i].entryTimeEnd.substring(0,5)
                                            this.loopTime = weekSignTime[i].week
                                            this.DateDays = 1
                                            break;
                                        }else if((weekSignTime[i].week === 7) && (new Date().getDay() === 0)){
                                            this.signStartTime = weekSignTime[i].entryTimeStart.substring(0,5)
                                            this.signEndTime = weekSignTime[i].entryTimeEnd.substring(0,5)
                                            this.loopTime = weekSignTime[i].week
                                            this.DateDays = 1
                                            break;
                                        }else if((weekSignTime[i].week > new Date().getDay()) && (this.DateDays === 0)){
                                            this.signStartTime = weekSignTime[i].entryTimeStart.substring(0,5)
                                            this.signEndTime = weekSignTime[i].entryTimeEnd.substring(0,5)
                                            this.loopTime = weekSignTime[i].week
                                            this.DateDays = 1
                                        }
                                        else if((weekSignTime[i].week < new Date().getDay())  && (this.DateDays === 0)){
                                            minDate.push(weekSignTime[i].week)
                                            const minIndex = Math.min.apply(Math, minDate)
                                            console.log(minIndex)
                                            if(minIndex === weekSignTime[i].week){
                                                this.signStartTime = weekSignTime[i].entryTimeStart.substring(0,5)
                                                this.signEndTime = weekSignTime[i].entryTimeEnd.substring(0,5)
                                                this.loopTime = weekSignTime[i].week
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }).catch(() => {
                    throw new Error("获取班级排课异常！")
                })
            },
            jumpAttendance(classId,id){
                this.$router.push({name:'TrainingStudentDetails',params:{classId:this.id,id:id}})
            },
            pushSignin(arrangingId,isStart,SStart,Stype){

                training.state.AarrangingId = arrangingId
                training.state.isStart = isStart
                training.state.SStart = SStart
                training.state.Stype = Stype

                this.$router.push({name:'StudentSignIn',
                                        params:{
                                                    id:this.id,
                                                    arrangingId:arrangingId,
                                                    isStart:isStart,
                                                    Stype:Stype,
                                                    SStart:SStart
                                                }} )
            },
            changeClass(){
              this.$router.push({name:'ChangeClass',params:{id:this.id,teachers:this.TrainingList.teachers,name:this.TrainingList.name,startdate:this.Classlist.classDate[0].date}})
            },
            onClickLeft(){
                this.$router.back()
            },
            //确认添加
            operateBtn(type) {
                if (type === 1) {
                    this.$router.push({name:'AddNewStudents',params:{id:this.id,IdList:this.IdList}})
                } else if (type === 2) {
                    console.log(12)
                    this.$router.push({name:'DeleteStudents',params:{id:this.id,DeleteList:this.DeleteList}})
                } else if(type === 3){
                    console.log(this.id)
                    this.$router.push({name:'ChangeTeachers',query: { id: this.id ,teachers:this.TrainingList.teachers}})
                } else if(type === 4){
                    console.log(this.id)
                    this.FinishedClassDia = true
                }
            },
        },
        mounted() {
            this.id = training.state.isDataReady
            if(this.id === null){
                this.$router.replace({name:'trainingCourse'})
            }else{
                this.getTrainingListFun()
                this.getClassMesFun()
                this.getClassStuFun()
                console.log(training.state.isDataReady)

            }
        },
    }
</script>

<style scoped lang="less">
    .body{
        font-size: 0.14rem;
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
    .box{
        padding: 0.1rem;
        line-height: 0.45rem;
        border: solid 1px ;
        border-radius: 10px;
        margin: 0.15rem;
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
        margin-top: 0.12rem;
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
    .tabback{
        width: 14px;
        height: 14px;
        border-width: 0.12rem;
        position: relative;
        right: 12px;
        top: -15px;
        border-style: solid;
        border-color:  #6699FF #6699FF transparent
    }
    .tab{
        position: relative;
        bottom: 0.22rem;
        right: 0.3rem;
        color: white;
    }
    .tabSe{
        position: relative;
        bottom: 0.22rem;
        right: 0.35rem;
        color: white
    }
    .teacher_box{
        text-align: center;
        line-height: 0.3rem;
        border-bottom: solid 1px #f2f2f2;
    }
    /*底部按钮颜色*/
   .bottom_btn /deep/ #bottom0{
        background: #FF6666;
    }
    .stu_list /deep/ #bottom1{
        background: #FF6666;
    }
    .stu_list /deep/ #bottom2{
        background: #23bc44;
    }
    .teacher_list /deep/.van-dialog__header{
        padding: 0;
        line-height: 0.5rem;
        background: #3770FB;
        color: white;
        font-weight: 700;
    }
</style>
