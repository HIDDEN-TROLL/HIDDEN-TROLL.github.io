<template>
    <div id="student-add">
        <div class="go-back">
            <van-nav-bar title="修改班级" left-text="返回" left-arrow @click-left="onClickLeft"/>
        </div>

        <div class="class-from">
            <van-field v-model="studentName" label="班级名称：" maxlength="10" placeholder="请输入班级名称" border/>

            <van-field
                    v-model="selectedTeachersName"
                    label="教师："
                    placeholder="请选择教师"
                    border
                    readonly
                    right-icon="arrow"
                    @click="showTeacher = true"
                    @click-right-icon="showTeacher = true"/>
            <van-popup v-model="showTeacher" position="bottom" style="max-height: 80vh;">
                <p v-if="Array.isArray(teachersArr) && teachersArr.length === 0" style="font-size: .16rem;text-align: center;margin: .1rem 0;">没有可选的教师</p>
                <div v-else style="font-size: .16rem;text-align: center;margin: .1rem 0;">
                    <span @click="showTeacher = false" style="margin-left: 0.15rem;float: left;font-size: 0.14rem;color:#1989fa">取消</span>
                    选择教师
                </div>
                <van-checkbox-group v-model="selectedTeachersId">
                    <van-cell-group>
                        <van-cell
                                v-for="item in teachersArr"
                                :key="item.id"
                                :title="`${item.name}`"
                                clickable
                                @click="toggleTeacher(item)" >
                            <van-checkbox :name="item.id" ref="checkboxes"/>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </van-popup>

            <div v-for="(item,index) in newWeek" v-show="bStudentNumber" :key="index">
                <van-field
                        v-model="grade"
                        :label="'签到时间:周'+ item.week"
                        :placeholder="item.entryTimeStart + '~' +item.entryTimeEnd"
                        border
                        readonly
                        right-icon="arrow"
                        @click="onGradeActionsheet(item,index)"
                        @click-right-icon="onGradeActionsheet(item,index)"
                />
            </div>

            <div class="ac_line"></div>

            <div class="modal-stu" v-if="TrainingList.isStart === false">
                <span class="title">排课方式：</span>
                <van-radio-group v-model="addType" @change="getAddStuType">
                    <van-radio name="2">循环</van-radio>
                    <van-radio name="1">课次</van-radio>
                </van-radio-group>
            </div>

             <div class="modal-stu" v-if="TrainingList.isStart === true">
                 <span class="title">排课方式：</span>
                 <van-radio-group v-model="addType" disabled>
                     <van-radio name="2">循环</van-radio>
                     <van-radio name="1">课次</van-radio>
                 </van-radio-group>
             </div>

            <!--切换循环课次显示-->
            <div v-show="bStudentNumber" style="position: relative">
                <div v-if="TrainingList.isStart === false">
                    <van-field
                            v-model="grade"
                            label="开始日期："
                            :placeholder="startdate"
                            border
                            readonly
                            right-icon="arrow"
                            @click="StartDateFun"
                            @click-right-icon="StartDateFun"
                    />
                <van-cell  is-link>
                    <template slot="title">
                        <span class="custom-text">周几上课</span>
                    </template>
                    <template slot="label" >
                        <div v-for="(item,index) in Week " :key="index">
                            <div class="days_box" @click="choosingDays(item.type,index)" :id="'days'+index">{{item.day}}</div>
                        </div>
                    </template>
                </van-cell>
                </div>
            </div>

            <div v-if="TrainingList.isStart === false">
                <van-field v-model="studentNumber" label="总课数："   placeholder="请输入本期总共上课次数" border/>
            </div>

            <div v-if="bStudentNumber === false">
                <van-field
                        v-model="grade"
                        label="签到时间："
                        :placeholder="EnterTimeNone"
                        border
                        readonly
                        right-icon="arrow"
                        @click="onGradeActionsheet"
                        @click-right-icon="onGradeActionsheet"
                />
            </div>
            <!--</div>-->
            <div>
                <van-dialog
                        v-model="EnterTimeDia"
                        title="签到时间"
                        show-cancel-button
                        @confirm="EnterAllTime"
                >
                    <div style="height: 0.15rem;"></div>
                    <van-field
                            label="开始时间："
                            :placeholder="StartTime"
                            border
                            readonly
                            right-icon="arrow"
                            @click="showTimeSelect(1)"
                            @click-right-icon="showTimeSelect(1)"
                    />
                    <van-field
                            label="结束时间："
                            :placeholder="EndTime"
                            border
                            readonly
                            right-icon="arrow"
                            @click="showTimeSelect(2)"
                            @click-right-icon="showTimeSelect(2)"
                    />
                </van-dialog>
            </div>

            <van-popup v-model="chiocePou"  position="bottom">
                <van-datetime-picker
                        :title="this.EnterTimeType === 1? '开始时间' :'结束时间'"
                        v-model="currentDate"
                        type="time"
                        :min-hour="minHour"
                        :max-hour="maxHour"
                        @confirm="EnterTime"
                        @cancel="Close"
                />
            </van-popup>

            <!--选择循环开始时间-->
            <van-popup v-model="chioceDate"  position="bottom">
                <van-datetime-picker
                        v-model="currentStartDate"
                        type="date"
                        @confirm="StartDate()"
                        @cancel="Close"
                />
            </van-popup>
        </div>
        <div class="select-menu">
            <van-actionsheet v-model="showGrade" :actions="gradeList" @select="onSelectGrade"/>
            <van-actionsheet
                    v-model="showClassName"
                    :actions="classNameList"
                    @select="onSelectClassName"
            />
        </div>
        <!--底部提交按钮-->
        <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
    </div>
</template>

<script>
    import {
        NavBar,
        Icon,
        Tag,
        Field,
        Actionsheet,
        Row,
        Col,
        Popup,
        Checkbox,
        CheckboxGroup,
        RadioGroup,
        Radio,
        Cell,
        CellGroup,
        DatetimePicker ,
        Toast
    } from "vant";
    import FooterBtn from "../../common/footer-operate-btn";

    import { getTrainingClass } from '@/api/school/training-course'
    import { changeTraining } from '@/api/school/training-course'
    import { getTeacherList } from '@/api/school/teacher-manage'
    import { getDistributionStudentList } from '@/api/school/student-manage'

    export default {
        name: "change-training-class",
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Field.name]: Field,
            [DatetimePicker .name]: DatetimePicker ,
            [Actionsheet.name]: Actionsheet,
            [Row.name]: Row,
            [Col.name]: Col,
            [Tag.name]: Tag,
            [Popup.name]: Popup,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [RadioGroup.name]:RadioGroup,
            [Radio.name]:Radio,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Toast.name]: Toast,
            FooterBtn: FooterBtn
        },
        data() {
            return {
                stop:0,
                Daylist:[],
                StartDatePla:'请选择开始日期',
                StartTime:'请选择开始时间',
                EndTime:'请选择开始时间',
                EnterTimeType:0,
                EnterTimeDia:false,
                EnterTimeNone:'请选择签到时间',
                chiocePou:false,
                chioceDate:false,
                currentStartDate: new Date(),
                currentDate: '12:00',
                minHour:0,
                maxHour:23,
                //所有教师列表
                showTeacher: false,//教师菜单显示
                teachersArr: [],
                selectedTeachers: [],//保存选中的教师
                //所有学生 列表
                showStudent: false,//学生菜单显示
                studentsArr: [],
                selectedStudents: [],//保存选中的学生
                studentName: this.$route.params.name,
                studentIdCard: "",
                studentNumber: "",
                bStudentNumber:false,
                //studentId:'',
                bStudentId:true,
                addType:'1',//课次，循环类型
                grade: "",
                className: "",
                attendanceType: "",
                showGrade: false,
                showClassName: false,
                showAttendanceType: false,
                //学生年级
                gradeList: [
                    {
                        name: "一年级",
                        id: 1
                    },
                    {
                        name: "二年级",
                        id: 2
                    },
                    {
                        name: "三年级",
                        id: 3
                    },
                    {
                        name: "四年级",
                        id: 4
                    },
                    {
                        name: "五年级",
                        id: 5
                    },
                    {
                        name: "六年级",
                        id: 6
                    },
                    {
                        name: "初中",
                        id: 7
                    }
                ],
                //学生班级
                classNameList: [],
                //考勤类型列表
                attendanceTypeList: [],
                //选择的年级ID
                gradeId:null,
                //选择的班级ID
                classNameId:null,
                //选中的考勤类型id
                checkAttendanceType: [],
                //底部按钮
                btnText: [
                    {
                        type: 1,
                        title: "确定"
                    },
                ],
                Week:[{day:'周一',type:1},{day:'周二',type:1},{day:'周三',type:1},{day:'周四',type:1},{day:'周五',type:1},{day:'周六',type:1},{day:'周日',type:1},],
                id:this.$route.params.id,
                teachers:this.$route.params.teachers,
                name:this.$route.params.name,
                startdate:this.$route.params.startdate,
                TrainingList:[],
                newWeek:[],
                newWeekCopy:[],

                SelWeekIndex:"",
                SelWeekValue:"",
                changetype:1,
            };
        },
        methods: {
            getTrainingListFun() {
                getTrainingClass(this.id)
                    .then(res => {
                        this.$loading();

                        //console.log(res);
                        if (res.data.meta && res.data.meta.code === 0) {
                            this.$loadingHide()

                            if(res.data.data.type === 1){
                                console.log(111)
                                this.getAddStuType('1')
                                this.TrainingList = res.data.data
                                this.StartTime =
                                    this.TrainingList.entryTimeStart[0]+
                                    this.TrainingList.entryTimeStart[1]+
                                    this.TrainingList.entryTimeStart[2]+
                                    this.TrainingList.entryTimeStart[3]+
                                    this.TrainingList.entryTimeStart[4]
                                this.EndTime =
                                    this.TrainingList.entryTimeEnd[0]+
                                    this.TrainingList.entryTimeEnd[1]+
                                    this.TrainingList.entryTimeEnd[2]+
                                    this.TrainingList.entryTimeEnd[3]+
                                    this.TrainingList.entryTimeEnd[4]
                                this.EnterTimeNone = this.StartTime +'~'+this.EndTime
                            }else if(res.data.data.type === 2){
                                this.getAddStuType('2')
                                this.TrainingList = res.data.data
                                this.newWeekCopy = res.data.data.weekSignTime
                                for(let i=1;i<=this.TrainingList.week.length;i++){
                                    this.choosingDaysSe(1,this.TrainingList.week[i-1]-1)
                                }
                            }
                            this.teachersArr = this.TrainingList.teachers
                            this.selectedTeachers = this.TrainingList.teachers
                            this.studentNumber = this.TrainingList.number
                        }
                    }).catch(() => {
                    throw new Error("获取班级排课异常！")
                })
            },
            // 签到时间及开始时间选择
            StartDate(){
                var m = this.currentStartDate.getMonth() + 1;
                var d = this.currentStartDate.getDate();
                if (m >= 1 && m <= 9) {
                    m = "0" + m;
                }
                if (d >= 0 && d <= 9) {
                    d = "0" + d;
                }
                var timer = this.currentStartDate.getFullYear() + "-" + m + "-" + d
                this.StartDatePla = timer
                this.startdate = timer
                this.chioceDate = false
            },
            EnterAllTime(){
                this.EnterTimeNone = this.StartTime +'~'+ this.EndTime
                console.log(this.EnterTimeNone)
                if(this.changetype === 1){
                    // console.log(this.newWeek[this.SelWeekIndex])
                    this.newWeek[this.SelWeekIndex].entryTimeStart = this.StartTime
                    this.newWeek[this.SelWeekIndex].entryTimeEnd = this.EndTime
                }
            },
            showTimeSelect(type){
                if(type === 1){
                    this.EnterTimeType = 1
                }else if(type === 2){
                    this.EnterTimeType = 2
                }
                this.chiocePou = true
            },
            EnterTime(value){
                console.log(value)
                if(this.EnterTimeType === 1){
                    this.StartTime = value
                }else if(this.EnterTimeType === 2){
                    this.EndTime = value
                }
                this.chiocePou = false
            },
            Close(){
                this.chiocePou = false
                this.chioceDate = false
            },
            // 选择学生
            toggleStudent(student) {
                const index = this.selectedStudentsId.indexOf(student.id)
                if (index >= 0) {
                    this.selectedStudents.splice(index, 1)
                } else {
                    this.selectedStudents.push(student)
                }
            },
            selectStudentList() {
                getDistributionStudentList()
                    .then(res => {
                        //console.log(res);
                        if (res.data.meta && res.data.meta.code === 0) {
                            if (res.data.data.length > 0) {
                                this.studentsArr = [];
                                for (let item of res.data.data) {
                                    this.studentsArr.push({
                                        id: item.id,
                                        name: item.name,
                                    })
                                }
                            }
                        }
                    }).catch(() => {
                    throw new Error("异常！")
                })
            },
            //  选择教师
            toggleTeacher(teacher) {
                const index = this.selectedTeachersId.indexOf(teacher.id)
                if (index >= 0) {
                    this.selectedTeachers.splice(index, 1)
                } else {
                    this.selectedTeachers.push(teacher)
                }
                console.log(this.selectedTeachers)
            },
            selectTeacherList() {
                getTeacherList({ page: 0 })
                    .then(res => {
                        //console.log(res);
                        if (res.data.meta && res.data.meta.code === 0) {
                            if (res.data.data.list.length > 0) {
                                this.teachersArr = [];
                                for (let item of res.data.data.list) {
                                    this.teachersArr.push({
                                        name: item.name,
                                        id: item.id,
                                    })
                                }
                            }
                        }
                    })
            },
            // 选择周几
            choosingDaysSe(type,index){
                if(type === 1){
                    this.Daylist.push(index+1)

                    if(this.TrainingList.isStart === false){
                        console.log(index)
                        let timer = setTimeout(()=>{
                            document.getElementById('days'+index).style.color="blue"
                        },200)
                    }
                    for(let i=0;i<this.TrainingList.weekSignTime.length;i++){
                        if(this.TrainingList.weekSignTime[i].week === index+1){
                            this.newWeek.push({
                                week:index+1,
                                entryTimeStart:
                                    this.newWeekCopy[i].entryTimeStart[0]+
                                    this.newWeekCopy[i].entryTimeStart[1]+
                                    this.newWeekCopy[i].entryTimeStart[2]+
                                    this.newWeekCopy[i].entryTimeStart[3]+
                                    this.newWeekCopy[i].entryTimeStart[4],
                                // entryTimeEnd:this.newWeekCopy[index].entryTimeEnd
                                entryTimeEnd:
                                    this.newWeekCopy[i].entryTimeEnd[0]+
                                    this.newWeekCopy[i].entryTimeEnd[1]+
                                    this.newWeekCopy[i].entryTimeEnd[2]+
                                    this.newWeekCopy[i].entryTimeEnd[3]+
                                    this.newWeekCopy[i].entryTimeEnd[4],
                            })
                        }
                    }
                    this.Week[index].type = 2
                }
            },

            choosingDays(type,index){

                    if(type === 1){
                        this.Daylist.push(index+1)

                        this.newWeek.push({
                            week:index+1,
                            entryTimeStart:'',
                            entryTimeEnd:''
                        })
                        document.getElementById('days'+index).style.color="blue"
                        this.Week[index].type = 2
                        console.log(this.newWeek)
                    }
                    else{
                        for(let i=0;i<this.Daylist.length;i++){
                            if((index+1) === this.Daylist[i]){
                                this.Daylist.splice(i,1)
                            }
                        }

                        for(let i=0;i<this.newWeek.length;i++){
                            if((index+1) === this.newWeek[i].week){
                                this.newWeek.splice(i,1)
                            }
                        }
                        this.Week[index].type = 1
                        document.getElementById('days'+index).style.color="#969799"

                    }

            },
            // 循环课次切换
            getAddStuType(name){
                //console.log(name)
                if (name === '1'){
                    this.addType = '1';
                    this.bStudentNumber = false;
                    this.bStudentId = true;
                } else{
                    this.addType = '2';
                    this.bStudentId = false;
                    this.bStudentNumber = true;
                }
            },
            //返回
            onClickLeft() {
                // this.$router.push({name:'ClassDetails',params:{id:this.id}})
                this.$router.back()
            },
            //签到时间事件
            onGradeActionsheet(item,index) {
                this.SelWeekIndex = index
                this.SelWeekValue = item
                console.log(item,index,this.newWeek)
                this.EnterTimeDia = true;
            },
            //循环开始日期事件
            StartDateFun() {
                this.chioceDate = true;
            },
            //年级选择
            onSelectGrade(item) {
                this.showGrade = false;
                this.grade = item.name;
                this.gradeId =item.id
            },
            //班级选择点击事件
            onClassNameActivateSlecte() {
                this.showClassName = true;
            },
            //班级选择
            onSelectClassName(item) {
                this.showClassName = false;
                this.className = item.name;
                this.classNameId = item.id
            },
            //确认添加
            operateBtn() {
                if(this.stop === 0){
                    // this.stop = 1
                    const data = {}
                    const name = this.studentName
                    const teachers = this.selectedTeachersId
                    const students = this.selectedStudentsId
                    const type = this.addType
                    const entryTimeStart = this.StartTime
                    const entryTimeEnd = this.EndTime
                    const number = this.studentNumber
                    const id = this.id
                    const weekSignTime = this.newWeek

                    if(this.addType == 1){
                        if(
                                (this.studentName.length!=0)
                        ){

                            if (name) {
                                data.name = name
                            }if (teachers) {
                                data.teachers = teachers
                            }

                            if (type) {
                                data.type = type
                            }if (entryTimeStart) {
                                data.entryTimeStart = entryTimeStart
                            }if (entryTimeEnd) {
                                data.entryTimeEnd = entryTimeEnd
                            }if (number) {
                                data.number = number
                            }

                            console.log(data)

                            this.$loading();
                            changeTraining(this.id,data)
                                .then(res => {
                                    if (res.status === 200) {
                                        Toast.success('修改成功！')
                                        this.$loadingHide()
                                        this.$router.push({name:'ClassDetails',params:{id:this.id}})
                                    }
                                })
                                .catch(() => {
                                    throw new Error("修改班级异常！");
                                    this.stop = 0
                                });
                        }else {
                            Toast.fail('请填写完整')
                            this.stop = 0
                        }
                    }else if(this.addType == 2){
                        if( this.TrainingList.isStart === true){
                            if(
                                (this.studentName.length!=0)
                            ){
                                if (name) {
                                    data.name = name
                                }if (teachers) {
                                    data.teachers = teachers
                                }if (weekSignTime) {
                                    data.weekSignTime = weekSignTime
                                }if (type) {
                                    data.type = type
                                }

                                data.number = this.TrainingList.number
                                data.startDate = this.startdate
                                data.week = this.TrainingList.week
                                // data.startDate = this.StartDatePla

                                console.log(data)

                                this.$loading();
                                changeTraining(this.id,data)

                                        .then(res => {
                                        if (res.status === 200) {
                                            Toast.success('修改成功！')
                                            this.$loadingHide()
                                            this.$router.push({name:'ClassDetails',params:{id:this.id}})

                                            // this.onClickLeft()

                                        }
                                    })
                                    .catch(() => {
                                        throw new Error("修改班级异常！");
                                        this.stop = 0
                                    });
                            }else {
                                Toast.fail('请填写完整')
                                this.stop = 0
                            }
                        }
                        else if (this.TrainingList.isStart === false){
                            if(
                                (this.studentName.length!=0)
                            ){
                                if (name) {
                                    data.name = name
                                }if (teachers) {
                                    data.teachers = teachers
                                }if (type) {
                                    data.type = type
                                }if (number) {
                                    data.number = number
                                }if (weekSignTime) {
                                    data.weekSignTime = weekSignTime
                                }

                                data.week = this.Daylist
                                data.startDate = this.startdate
                                // data.startDate = this.StartDatePla

                                console.log(data)

                                this.$loading();
                                changeTraining(this.id,data)

                                        .then(res => {
                                        if (res.status === 200) {
                                            Toast.success('修改成功！')
                                            this.$loadingHide()
                                            this.$router.push({name:'ClassDetails',params:{id:this.id}})

                                            // this.onClickLeft()

                                        }
                                    })
                                    .catch(() => {
                                        throw new Error("修改班级异常！");
                                        this.stop = 0
                                    });
                            }else {
                                Toast.fail('请填写完整')
                                this.stop = 0
                            }
                        }

                    }
                }

            },
        },
        created() {
            this.selectTeacherList();
            this.selectStudentList();
            this.getTrainingListFun();
        },
        computed: {
            selectedTeachersId() {
                return this.selectedTeachers.map(s => s.id)
            },
            selectedTeachersName() {
                return this.selectedTeachers.map(s => s.name).join('，')
            },
            selectedStudentsId() {
                return this.selectedStudents.map(s => s.id)
            },
            selectedStudentsName() {
                return this.selectedStudents.map(s => s.name).join('，')
            },
        },
    };
</script>

<style scoped lang="less">
    #student-add {
        font-size: 0.12rem;
        background-color: #fff;
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
        }
        .class-from {
            padding: 0.25rem 0 0.4rem 0;
            /*padding-right: 14px;*/
            .van-cell::after {
                content: " ";
                position: absolute;
                pointer-events: none;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                left: 15px;
                right: 0;
                bottom: 0;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
                border-bottom: 1px solid #ebedf0;
            }
            .modal-stu{
                /* overflow: hidden;*/
                position: relative;
                display: flex;
                padding: 0.1rem 0.15rem;
                box-sizing: border-box;
                .title{
                    flex: 1;
                    font-size: 0.14rem;
                    max-width: 0.9rem;
                }
                .van-radio-group{
                    flex: 1;
                    font-size: 0.14rem;
                    overflow: hidden;
                    .van-radio{
                        float: right;
                        margin-right: 0.2rem;
                    }
                }
            }
            .modal-stu::after{
                content: ' ';
                position: absolute;
                pointer-events: none;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                left: 15px;
                right: 0;
                bottom: 0;
                -webkit-transform: scaleY(.5);
                transform: scaleY(.5);
                border-bottom: 1px solid #ebedf0;
            }
        }
        .footer-btn {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0.4rem;
            padding: 0.08rem 0;
            background-color: #3770fb;
            box-sizing: border-box;
            .van-col {
                font-size: 0.14rem;
                color: #fff;
                line-height: 0.24rem;
                text-align: center;
                border-right: 0.01rem solid #fff;
            }
            .van-col:last-child {
                border-right-width: 0;
            }
        }
        .btn {
            padding: 0 0.2rem;
            overflow: hidden;
            .cancel {
                padding: 0.1rem 0;
                float: left;
                font-size: 0.14rem;
                color: #3770fb;
            }
            .confirm {
                padding: 0.1rem 0;
                float: right;
                font-size: 0.14rem;
                color: #3770fb;
            }
        }
        .van-cell__value {
            /*line-height: 0.48rem;*/
        }
    }
    .cardNo {
        & /deep/ .van-field__body::before {
            content: "NO. ";
            color: #999;
        }
    }
    .ac_line{
        background-color: #f3f7f8;
        height: 0.1rem;
        margin: 0.1rem 0;
    }
    .days_box{
        width: 0.45rem;
        line-height: 0.3rem;
        border: solid 1px;
        float: left;
        text-align: center;
        margin-left: 0.15rem;
        margin-bottom: 0.15rem;
        border-radius: 8px;
    }
    .van-cell__label{
        margin: 0.1rem 0 0 0.5rem
    }
</style>
