<template>
    <div id="attendance-type">
        <div class="go-back">
            <van-nav-bar
                    :title="SigninList.date"
                    left-text="返回"
                    :right-text="(SStart === false)  && (Stype === 2)? '调课' : ''"
                    left-arrow
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            />
        </div>
        <div class="body">

            <div style="line-height: 0.25rem;padding:  0.15rem;text-align: center">
                <van-row>
                    <van-col span="8">
                        {{SigninList.name}}
                    </van-col>
                    <van-col span="8">
                        考勤统计：{{SigninList.signed}}/ {{SigninList.studentCount}}
                    </van-col>
                    <van-col span="8">
                        请假： {{SigninList.leaveCount}}
                    </van-col>
                </van-row>
            </div>
            <div class="ac_line"></div>
            <div>
                <div style="line-height: 0.25rem;padding:  0.15rem 0;text-align: center;color: #6699FF">
                    <span style="margin-right:0.15rem ">
                        <span @click="choiceYear"> {{GradeName}}<van-icon name="arrow-down" /></span>
                    </span>
                    <span style="margin-right:0.15rem " @click="ChoiceStatusBtn">
                        {{Status}}<van-icon name="arrow-down" />
                    </span>
                    <span v-if="SigninList.isSigned === true" style="border: solid 1px;padding: 0.05rem 0.1rem; border-radius: 8px;">
                       <span @click="SignAllStudents" >一键签到全部学生</span>
                    </span>
                    <span v-else style="border: solid 1px rgb(182, 182, 182);padding: 0.05rem 0.1rem; border-radius: 8px;color: rgb(182, 182, 182)">
                       <span >一键签到全部学生</span>
                    </span>
                </div>
                        <div  v-for="(item,index) in SigninList.students" :key="index">
                            <div v-if="
                                (item.gradeName === GradeName || GradeName === '全部年级')
                            &&  (
                                    (
                                            (item.time == '' && Status === '未签到' && item.isLeave != true)
                                        ||  (item.isLeave === true && Status === '请假' && item.isLeave === true)
                                        ||  (item.time !== '' && Status === '已签到' && item.isLeave === false)
                                        ||  (item.time !== '' && Status === '未课评' && item.isComment === false)
                                    )   ||  Status == '全部状态'
                                )
                            " class="box">
                                <van-row>
                                    <van-col span="4" style="color: #6699FF;line-height: 0.225rem" v-if="item.name.length>4">
                                        <span  @click="jumpStuDetails(item.id)" style="">{{item.name}}</span>
                                    </van-col>
                                    <van-col span="4" style="color: #6699FF;" v-else>
                                        <span  @click="jumpStuDetails(item.id)" style="">{{item.name}}</span>
                                    </van-col>
                                    <van-col span="4" >
                                        {{item.gradeName}}
                                    </van-col>
                                    <van-col span="8" >
                                        剩余  {{item.lessonLast}}课次
                                    </van-col>
                                    <van-col span="4" v-if="item.isLeave === false">
                                        <span v-if="item.time == '' && (SigninList.isSigned === true)" style="border: solid 1px rgb(102, 153, 255);padding: 0.04rem 0.06rem;border-radius: 8px;color: rgb(102, 153, 255);" @click="signed(item.id,index)">签到</span>
                                        <span v-if="item.time == '' && (SigninList.isSigned === false)"
                                              style="border: solid 1px rgb(182, 182, 182);color: rgb(182, 182, 182);padding: 0.04rem 0.06rem;border-radius: 8px;"
                                                >
                                            签到
                                        </span>
                                        <span v-if="item.time !== ''" >{{item.time}}</span>
                                    </van-col>
                                    <van-col span="4"  v-if="item.isLeave === false">
                                        <span v-if="item.time == ''" style="border: solid 1px rgb(102, 153, 255);color:rgb(102, 153, 255);padding: 0.04rem 0.06rem;border-radius: 8px;" @click="leaveBtn(item.id,index)">请假</span>
                                        <span v-if="(item.time !== '') && item.isComment === false" style="border: solid 1px #669966;padding: 0.04rem 0.06rem;border-radius: 8px;color: #669966;" @click="ComDia(item.id,item.name,index)">课评</span>
                                        <span v-if="(item.time !== '') && item.isComment === true" style="padding: 0.04rem 0.06rem;border-radius: 8px;color: #669966;" @click="pushCom(item.id)">已评</span>
                                    </van-col>
                                    <van-col span="8"  v-if="item.isLeave === true" style="text-align: center;color: red;">
                                        请假
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
            </div>
        </div>

        <van-dialog
                v-model="addCom"
                :title="Dianame"
                show-cancel-button
                @confirm="sendCom"
        >
            <div style="    border-bottom: solid 1px #CCCCCC;margin: 0.15rem 0;padding: 0 0.15rem 0.15rem 0.15rem;;">
                <van-row style="line-height: 0.3rem">
                    <van-col span="4">
                        <div style="float: left">表现</div>
                    </van-col>
                    <van-col span="16">
                        <van-tabs type="card" style="width:2rem" @click="onClick" v-model="typec" >
                            <div v-for="(item,index) in SigninList.discipline" :key="index">
                                <van-tab :title=item.name></van-tab>
                            </div>
                        </van-tabs>
                    </van-col>
                    <van-col span="4">
                        <div v-if="comNumber>0">+{{comNumber}}朵</div>
                        <div v-else>{{comNumber}}朵</div>
                    </van-col>
                </van-row>
            </div>

            <div>
                <div style="text-align:center;font-size: 0.2rem;line-height: 0.35rem;">选一句评语</div>
                <van-tabs v-model="active" @click="ChoiceComFun">
                    <van-tab :title="item.categoryName" v-for="(item,index) in ComList" :key="index" >
                        <div style="height:2rem;overflow: scroll;">
                            <div v-for="(item2,index2) in item.comments" :key="index2">
                                    <van-cell  :id="'ComList'+index+index2"  @click="changeCom(item2.content,item.categoryId,item2.id,index,index2)" :title="item2.content"  />
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
                <!--<div style="    border-top: solid 1px #dddddd;  border-bottom: solid 1px #dddddd;">-->
                    <!--<van-cell  :title="ChoiceCom"  />-->
                <!--</div>-->
                <div style="text-align:center">
                    <textarea id="textbox" class="textbox" placeholder="请输入评价的具体内容"></textarea>
                </div>
            </div>
        </van-dialog>

        <!--调课弹窗-->
        <van-dialog
                v-model="changeClassDia"
                title="调课时间选择"
                show-cancel-button
                @confirm="changeClassdate"
        >
            <div style="height: 0.15rem;"></div>
            <div>
                <van-field
                        v-model="grade"
                        label="调课前："
                        :placeholder="SigninList.date"
                        border
                        readonly
                       />

<!---->
                <!--原来课次时间：{{// SigninList.date}}-->
            </div>
            <div>
                <van-field
                        v-model="grade"
                        label="调课后："
                        :placeholder="AfterChange"
                        border
                        readonly
                        right-icon="arrow"
                        @click="onGradeActionsheet"
                        @click-right-icon="onGradeActionsheet"/>
            </div>
        </van-dialog>

        <!--调课日期-->
        <van-popup v-model="chiocePou"  position="bottom">
                <van-datetime-picker
                        v-model="currentStartDate"
                        type="date"
                        @confirm="EnterTime()"
                        @cancel="Close"
                />
        </van-popup>

        <!--筛选年级-->
        <van-popup v-model="ChioceYear" position="bottom" :overlay="true">
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
        <!--筛选状态-->
        <van-popup v-model="ChoiceStatus" position="bottom" :overlay="true">
            <div style="font-size: 0.14rem">
                <van-picker
                        show-toolbar
                        title="选择状态"
                        :columns="StatusList"
                        @cancel="onCancel"
                        @confirm="ShowStatus"
                />
            </div>
            <div style="font-size: 0.14rem;line-height: 0.5rem;text-align: center;border-top: 1px solid #ebedf0;color: #1989fa" @click="allstatus"> 点击此处显示全部状态 </div>
        </van-popup>

    </div>
</template>

<script>
    import { NavBar, Icon, Row, Col, Field, DatetimePicker, Popup, Toast,Tab, Tabs,Search,Picker,RadioGroup,Radio,Cell,CellGroup} from 'vant';
    import FooterBtn from "./components/class-footer";
    import { changeClassDate } from '@/api/school/training-course'
    import { getSigninList } from '@/api/school/training-course'
    import { getCommentList } from '@/api/school/training-course'
    import { sendStuCom } from '@/api/school/training-course'
    import { signed } from '@/api/school/attendance'
    import { Leave } from '@/api/school/attendance-leave'

    // 储存班级id
    import { mapActions, mapState, mapMutations } from 'vuex'
    import training from '@/store/modules/school/training'



    export default {
        name: "attendance-time",
        components: {
            [Radio.name]: Radio,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [RadioGroup.name]: RadioGroup,
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Search.name]: Search,
            [Row.name]: Row,
            [Col.name]: Col,
            //[Dialog.name]:Dialog,
            [Field.name]: Field,
            [DatetimePicker.name]: DatetimePicker,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Toast.name]: Toast,
            FooterBtn:FooterBtn
        },
        data() {
            return {
                AfterChange:'选择需要对提调的时间',
                minHour:0,
                maxHour:23,
                currentDate: '12:00',
                currentStartDate: new Date(),
                StartDatePla: "",

                grade:"",
                chiocePou:false,
                EnterTimeType:1,
                days:new Date().getDate(),
                typec:1,
                ChoiceComtypec:1,
                ChoiceCom:'',
                active: 0,
                radio: '1',
                stop:0,
                stopse:0,
                id:this.$route.params.id,
                arrangingId:this.$route.params.arrangingId,
                isStart:this.$route.params.isStart,
                Stype:this.$route.params.Stype,
                SStart:this.$route.params.SStart,
                ChioceYear:false,
                ChoiceStatus:false,
                GradeName:'全部年级',
                Status:'全部状态',
                addCom:false,
                value:'',
                list:[{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},{name:"大声点"},],
                btnText: [
                    // {
                    //     type: 2,
                    //     title: "取消"
                    // },
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
                StatusList:[
                    "请假","未签到","已签到","未课评"
                ],
                SigninList:[],
                ComList:[],
                Allcolumns:[],
                columns:[],

                comNumber:0,
                comId:2,
                Dianame:'',
                ComIndex:'',
                DiaId:'',

                data:[
                    {
                        stuId:'',
                        arrangingId:'',
                        discipline:'',
                        category:
                            [{
                                categoryId:'',
                                comment:''
                            }],
                        content:''
                     }
                ],
                Hid:'',
                Hidse:'',

                ChoiceComIndex:0,
                changeClassDia:false
            }
        },
        computed: {
            ...mapState('training', [
                'isDataReady','AarrangingId'
            ]),
        },
        methods:{

            Close(){
                this.chiocePou = false
            },
            EnterTime(value){

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

                this.AfterChange = timer
                this.chiocePou = false

                console.log(this.AfterChange)

            },
            // 调课时间选择-1
            onGradeActionsheet(){
                this.chiocePou = true
            },
            pushCom(id){
                this.$router.push({name:'TrainingStudentDetails',params:{classId:this.SigninList.clsId,id:id,arrangingId:this.arrangingId}})

                // this.$router.push({name:'TrainingStudentDetails',params:{id:id}})
            },
            sendCom(){
                const data = {}
                const stuId = this.DiaId
                const arrangingId = this.arrangingId
                const discipline = this.comNumber
                const categoryId = this.Hid
                const comment = this.Hidse
                const content = document.getElementById('textbox').value
                const category = [{
                    categoryId,
                    comment
                }]

                if(stuId){
                    data.stuId = stuId
                } if(arrangingId){
                    data.arrangingId = arrangingId
                }
                // if(discipline){
                //     data.discipline = discipline
                // }
                if(categoryId && comment){
                    data.category = category
                } if(content){
                    data.content = content
                }

                data.discipline = this.comId

                console.log(data)
                // 提交评语
                    sendStuCom(data)
                        .then(res => {
                            if (res.data.meta && res.data.meta.code === 0) {
                                Toast.success('提交成功')
                                this.SigninList.students[this.ComIndex].isComment = true
                                // this.getSigninListFun()
                            }else{
                                Toast.fail('提交失败')
                            }
                        }).catch(() => {
                        throw new Error("异常！")
                    })
            },
            ChoiceComFun(index){
                // console.log(index)
                let timer = setTimeout(()=>{
                    if(this.ChoiceComIndex != index){
                        for(let i=0;i<this.ComList[index].comments.length;i++){
                            document.getElementById('ComList'+index+i).style.color='black'
                        }
                    }
                },20)

            },

            changeCom(com,Hid,id,index,index2){
                this.ChoiceCom = com
                this.Hid = Hid
                this.Hidse = id


                this.ChoiceComIndex = index

                // for(let i=0;i<this.ComList.length;i++){
                    for(let l=0;l<this.ComList[index].comments.length;l++){
                        document.getElementById('ComList'+this.ChoiceComIndex+l).style.color='black'
                    }
                // }


                // let timer = setTimeout(()=>{
                    document.getElementById('ComList'+this.ChoiceComIndex+index2).style.color='#3770fb'
                // },200)

                // console.log(index)
            },
            onClick(index, title) {

                this.comNumber = this.SigninList.discipline[index].number
                this.comId = this.SigninList.discipline[index].id

            },
            // 一键签到所有
            SignAllStudents(){
                if(this.stopse === 0){
                    this.stopse = 1
                    let AllStuId =  {id:[]}
                    let indexList =  {id:[]}
                    for(let i=0;i<this.SigninList.students.length;i++){
                        if((this.SigninList.students[i].isLeave === false) && (this.SigninList.students[i].time == '')){
                            AllStuId.id.push(this.SigninList.students[i].id)
                            indexList.id.push(i)
                        }
                    }
                    if(Object.keys(AllStuId.id).length>0){
                        console.log(indexList.id.length)

                        this.$loading()
                        signed({
                            id:AllStuId.id,
                            classId:this.SigninList.clsId,
                            type:12
                        })
                            .then(res => {
                                this.$loadingHide();
                                if (res.data.meta && res.data.meta.code === 0) {
                                    // this.getSigninListFun()
                                    Toast.success('签到成功')
                                    this.stopse = 1

                                    this.SigninList.signed += indexList.id.length
                                    for(let i=0;i<indexList.id.length;i++){
                                        this.SigninList.students[indexList.id[i]].time = new Date().getHours() + ":" + new Date().getMinutes()
                                    }
                                    if( this.SigninList.date == '未开课'){
                                        this.SigninList.date = new Date().getFullYear() + "-" + new Date().getMonth()+1 + "-" + new Date().getDate()
                                    }

                                }
                            }).catch(() => {
                                Toast.fail('签到失败')
                                this.stopse = 0
                        })
                    }else{
                        this.stopse = 0
                        Toast('暂无可签到学生')
                    }
                }


            },
            allstatus(){
                this.Status = '全部状态'
                this.ChoiceStatus = false
            },
            back(){
                this.GradeName = '全部年级'
                this.ChioceYear = false
            },
            onCancel(){
                this.ChioceYear = false
                this.ChoiceStatus = false
            },
            ChoiceStatusBtn(){
                this.ChoiceStatus = true
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
                console.log(resultArr)
                // 弹窗筛选年级年级排序
                const arr = ['一', '二', '三', '四', '五', '六', '初','未']
                const list = resultArr.sort((a, b) => arr.indexOf(a[0]) - arr.indexOf(b[0]))
                this.columns = list
                if(resultArr.length>0 && resultArr != []){
                    this.ChioceYear = true
                }
                console.log(list)
            },
            ShowStatus(val){
                this.Status = val
                this.ChoiceStatus = false
            },
            onConfirm(val){
                // this.getClassStuFun()
                this.ChioceYear = false
                this.GradeName = val

            },
            // 请假
            leaveBtn(id,index){
                // const leaveday = this.SigninList.date[8]+this.SigninList.date[9]
                // console.log(this.SigninList.isSigned)

                if(this.SigninList.isSigned === true){
                    if(this.stop === 0) {
                        this.stop = 1
                        this.$loading()
                        Leave(id, null, this.id)
                            .then(res => {
                                if (res.status === 200) {
                                    this.$loadingHide();
                                    // this.getSigninListFun()
                                    Toast.success('请假成功')
                                    this.SigninList.students[index].isLeave = true
                                    this.SigninList.leaveCount +=1
                                    this.stop = 0
                                }
                            }).catch(() => {
                            throw new Error("历史记录获取异常!")
                            this.$loadingHide()
                            this.stop = 0
                        })
                    }
                }else if (  (this.SigninList.isSigned === false)
                    && (this.SigninList.date != '未开课')){
                    if(this.stop === 0) {
                        this.stop = 1
                        this.$loading()
                        Leave(id, null, this.id,this.SigninList.date)
                            .then(res => {
                                if (res.status === 200) {
                                    this.$loadingHide();
                                    this.getSigninListFun()
                                    Toast.success('请假成功')
                                }
                            }).catch(() => {
                            throw new Error("历史记录获取异常!")
                            this.$loadingHide()
                            this.stop = 0
                        })
                    }
                }else if (
                       (this.SigninList.isSigned === false)
                    && (this.SigninList.date == '未开课')
                ){
                    Toast('该时间段不可请假')
                }
                // if(leaveday > this.days){
                //     console.log("比今天大")
                // }else{
                //     console.log('笑笑笑笑笑笑笑笑笑笑')
                // }
                //

            },
            //签到
            signed(id,index) {
                if(this.stop === 0){
                    this.stop=1
                    this.$loading()
                    signed({
                        id:id,
                        classId:this.SigninList.clsId,
                        type:12,
                        userType:1
                    })
                        .then(res => {
                            if (res.data.meta && res.data.meta.code === 0) {
                                Toast.success('签到成功')
                                this.$loadingHide()

                                this.SigninList.students[index].time = new Date().getHours() + ":" + new Date().getMinutes()

                                if( this.SigninList.date == '未开课'){
                                    this.SigninList.date = new Date().getFullYear() + "-" + new Date().getMonth()+1 + "-" + new Date().getDate()
                                }

                                this.SigninList.signed +=1
                                // this.getSigninListFun()
                                this.stop=0

                            }
                        }).catch(() => {
                        this.$toast('签到失败')
                        this.$loadingHide()
                        this.stop=0
                    })
                }
            },
            // 获取点名列表
            getSigninListFun() {
                getSigninList(this.id,this.arrangingId)
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            this.SigninList = res.data.data
                            this.stop=0
                            var classlist= [];
                            for (let lfd of this.SigninList.students){
                                classlist.push(lfd.gradeName)
                            }
                            this.Allcolumns = classlist

                            this.comNumber = this.SigninList.discipline[1].number
                            this.comId = this.SigninList.discipline[1].id

                            this.stopse = 0


                        }
                    }).catch(() => {
                    throw new Error("异常！")
                })
            },
            // 获取提交的评语列表
            getCommentListFun() {
                getCommentList()
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            this.ComList = res.data.data
                        }
                    }).catch(() => {
                    throw new Error("异常！")
                })
            },

            ComDia(id,name,index){
                this.DiaId = id
                this.Dianame = name
                this.ComIndex = index
                this.addCom = true
            },
            jumpStuDetails(id){
                this.$router.push({name:'TrainingStudentDetails',params:{classId:this.SigninList.clsId,id:id,arrangingId:this.arrangingId}})

            },
            changeClass(){
                this.$router.push({name:'ChangeClass'})
            },
            onClickLeft(){
                this.$router.back()
            },
            // 调课
            onClickRight(){
                this.changeClassDia = true
            },
            changeClassdate(){
                // 调课接口
                    changeClassDate(this.id,this.arrangingId,this.AfterChange)
                        .then(res => {
                            if (res.data.meta && res.data.meta.code === 0) {
                                Toast.success('调课成功')
                                this.onClickLeft()
                            }
                        }).catch(() => {
                        throw new Error("调课异常！")
                    })
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
            this.arrangingId = training.state.AarrangingId
            this.id = training.state.isDataReady

            this.isStart = training.state.isStart
            this.Stype = training.state.Stype
            this.SStart = training.state.SStart
            if(this.id === null || this.arrangingId === null){
                this.$router.replace({name:'trainingCourse'})
            }else{
                this.getSigninListFun()
                this.getCommentListFun()
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
        padding: 0 0.15rem;
        line-height: 0.45rem;
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
    /deep/.van-col--4{
        text-align: center;
    }
    .textbox{
        width: 2.5rem;
        height: 0.7rem;
        margin: 0.15rem 0 0 0;
        border: solid 1px #939393;
        font-size: 0.14rem;
        border-radius: 9px;
    }
</style>
