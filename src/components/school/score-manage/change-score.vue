<template>

    <div class="body">
        <van-nav-bar
                title="成绩记录"
                left-text="返回"
                right-text="筛选日期"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <div style="text-align: center;line-height: 0.4rem">
            <van-row>
                <van-col span="8">
                    {{ScoreList.stuName}}
                </van-col>
                <van-col span="8">
                    {{ScoreList.gradeName}}
                </van-col>
                <van-col span="8">
                    {{ListNumber}}条数据
                </van-col>
            </van-row>
        </div>

        <div class="ac_line">
        </div>

        <div style="font-weight: 700;text-align: center;line-height: 0.4rem; border-bottom: solid 1px #CCCCCC;">
            {{dateMes}}
        </div>

        <div>
            <div v-if="List.length!=0">
                <div v-for="(item,index) in ScoreList.list" :key="index" class="dateBox">
                    <span class="date" >{{index}}</span>
                    <div v-for="(item2,index2) in item" :key="index2" class="mes">
                        <van-row>
                            <van-col span="4">
                                {{item2.termText}}

                            </van-col>
                            <van-col span="3">
                                {{item2.subjectText}}

                            </van-col>
                            <van-col span="5">
                                {{item2.unit}}

                            </van-col>
                            <van-col span="7" style="text-align: center">
                                <span style="color: #6699FF;font-size: 0.18rem;">
                                    {{item2.score}}分
                                </span>
                            </van-col>
                            <van-col span="5">
                                <div class="operation"
                                     @click="showChangeDialog(item2.termText,item2.subjectText,item2.unit,item2.score,item2.scoreId,item2.unitId,item2.subject,item2.term)">
                                    操作
                                </div>
                            </van-col>
                        </van-row>
                    </div>
            </div>
            </div>
            <div v-else style="font-size: 0.18rem;color: black;line-height: 1rem;text-align: center" >
                <div v-if="showNONE===1">
                    该学生暂无成绩数据
                </div>
            </div>
        </div>

        <!--        弹窗-->
        <van-dialog
                v-model="show"
                title=""
                show-cancel-button
                confirmButtonText="确定修改"
                @confirm="changeScoreFun()"
        >
                <div style="text-align: center;font-weight: 700;font-size: 0.18rem;margin: 0.2rem 0">
                    修改分数
                </div>

                    <van-cell :title="'学期：'+termText" is-link @click="change(1)" arrow-direction="down"/>
                    <van-cell :title="'科目：'+subjectText" is-link @click="change(2)" arrow-direction="down"/>
                    <van-cell :title="'单元：'+unit" is-link @click="change(3)" arrow-direction="down" />
                    <van-cell :title="'分数：'+score" is-link @click="change(4)" />

            <div style="font-size: 0.14rem;text-align: center;position: absolute;top: 10px;right: 10px;" >
                <van-button type="danger" @click="deleteScore" >删除成绩</van-button>
            </div>
        </van-dialog>

        <!--        弹窗-->
        <van-dialog
                v-model="deleteDia"
                title=""
                show-cancel-button
                confirmButtonText="删除"
                @confirm="deleteScoreFun"
        >
            <div style="font-size: 0.18rem;font-weight: 700;text-align: center;padding: 0.2rem">
                确定删除该成绩？
                <br><span style="color: red;font-size: 0.14rem;font-weight: 400">(删除后无法撤回)</span>
            </div>
        </van-dialog>

        <!--        选择分数-->
        <div>
            <!-- 学期选择下拉菜单 -->
            <van-actionsheet v-model="showTermSlecte" :actions="termArr" @select="onSelectTerm"/>
            <!-- 科目选择下拉菜单 -->
            <van-actionsheet
                    v-model="showSubjectSlecte"
                    :actions="subjectArr"
                    @select="onSelectSubject"
            />
            <!-- 单元选择下拉菜单 -->
            <van-actionsheet v-model="showUnitSlecte" :actions="unitArr" @select="onSelectUnit"/>
            <!-- 选择分数 -->
            <van-popup  v-model="showScoreSlecte"  position="right" style="width: 100%;height: 100%">
                <van-nav-bar
                        title="修改成绩"
                        left-text="返回"
                        left-arrow
                        @click-left="showScoreSlecte = false"
                />
                <div  style="line-height: 0.2rem;margin:  0.1rem">
                <van-switch v-model="checked" size="20px"/> <span style="margin-left: 0.1rem">开启小数点</span>
                </div>
                <van-row style="padding-right: 0.1rem">
                        <div v-for="(item,index) in scorelist" :key="index">
                            <van-col span="4">

                             <div class="scoreBox" v-if="checked === false" >
                                    <span  @click="choiceScore(item)">{{item}}</span>
                             </div>
                             <div class="scoreBox" v-if="checked === true && item<100">
                                    <span  @click="choiceScore(item+0.5)">{{item+0.5}}</span>
                             </div>

                            </van-col>

                        </div>
                </van-row>
            </van-popup>
            <van-dialog v-model="showDialog" title="标题" show-cancel-button></van-dialog>
            <!--筛选日期-->
            <div>
                <van-dialog
                        v-model="ChoiceDate"
                        title="日期筛选"
                        show-cancel-button
                        :showConfirmButton='false'
                >
                    <div style="line-height: 0.5rem;text-align: center;padding: 0 0.15rem">
                        <div>
                            <div @click="ChangeLeaveMesFun(1)" class="choicedateB">
                                今日
                            </div>
                            <div @click="ChangeLeaveMesFun(2)" class="choicedateB">
                                昨日
                            </div>
                            <div @click="ChangeLeaveMesFun(3)" class="choicedateB">
                                本周
                            </div>
                            <div @click="ChangeLeaveMesFun(4)" class="choicedateB">
                                本月
                            </div>
                        </div>

                        <div @click="choiceDTchange(1)" class="choicedateB">
                            自定义
                        </div>
                    </div>
                </van-dialog>
                <van-dialog
                        v-model="choiceDT"
                        title=""
                        show-cancel-button
                        @confirm="ChangeDate"
                >
                    <div style="padding: 0.15rem">
                        <div style="line-height: 0.6rem;text-align: center;font-size: 0.2rem;font-weight: 700;" >
                            请选择开始时间
                        </div>
                        <div @click="ChoiceTime(1)" class="choiceTime">{{startTime}}</div>

                        <div >
                            <div style="line-height: 0.6rem;text-align: center;font-size: 0.2rem;font-weight: 700;" >
                                请选择结束时间
                            </div>
                            <div @click="ChoiceTime(2)" class="choiceTime" v-if="showEnd">{{endTime}}</div>
                            <div class="choiceTime" v-if="showEnd===false" style="background-color: #c9c9c9" @click="ToastChioce">0-0-0</div>
                        </div>
                    </div>
                </van-dialog>
                <div >
                    <van-popup v-model="CStime" position="bottom" :overlay="true" >
                        <van-datetime-picker
                                v-model="currentDate"
                                type="date"
                                title="选择时间"
                                :max-date="minDate"
                                :formatter="formatter"
                                @confirm="confirm"
                                @cancel="close"
                        />
                    </van-popup>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import { NavBar,Switch,Tab,Tabs,Row, Col ,Button,Toast,Actionsheet,Popup , Cell, CellGroup,DatetimePicker,Picker  } from 'vant';
    import { getStudentScore } from '@/api/school/score-manage';
    import { deleteScore } from '@/api/school/score-manage';
    import { changeScore } from '@/api/school/score-manage';
    import { getCollection } from "@/api/school/score-manage";


    export default {
        name: "automatic-mode",
        data() {
            return {
                dateMes:'今日',
                ScoreList:[],
                List:[],
                id:this.$route.params.id,
                type:1
,                show:false,
                deleteDia:false,
                termText:'',
                subjectText:'',
                subject:'',
                unit:'',
                score:'',
                scoreId:'',
                unitId:'',
                term:'',
                termArr:[],
                subjectArr:[],
                unitArr:[],
                termValue: "选择学期",
                subjectValue: "选择科目",
                unitValue: "选择单元",
                showTermSlecte: false, //学期选择框
                termId: "", //学期Id
                subjectId: "", //科目id
                showSubjectSlecte: false, //科目选择框
                showUnitSlecte: false, //单元选择框
                showScoreSlecte: false, //单元选择框
                showDialog: false,
                checked: false,
                ChoiceDate:false,
                scorelist:[],

                showNONE:0,
                Number:0,
                ListNumber:0,

                startTime:'',
                choiceDT:false,
                showEnd:false,
                CStime:false,
                minDate: new Date(),
                currentDate: new Date(),
                date:0,
                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                today:new Date().getDate(),
                endTime:'',
                FirstChoice:0,

                Stop:false
            };
        },
        components: {
            [NavBar.name]: NavBar,
            [Tab.name]: Tab,
            [Popup .name]: Popup ,
            [CellGroup .name]: CellGroup ,
            [Picker .name]: Picker ,
            [DatetimePicker .name]: DatetimePicker ,
            [Tabs.name]: Tabs,
            [Toast.name]: Toast,
            [Cell.name]: Cell,
            [Switch.name]: Switch,
            [Row.name]: Row,
            [Button .name]: Button ,
            [Col.name]: Col,
            [Actionsheet.name]: Actionsheet,


            //someComponent
        },
        methods:{
            ChangeLeaveMesFun(type){
                this.type = type
                this.getStudentScoreFun()
                this.ChoiceDate = false
                if(type === 1){
                    this.dateMes = '今日'
                }else if(type === 2 ){
                    this.dateMes = '昨日'
                }else if(type === 3 ){
                    this.dateMes = '本周'
                }else if(type === 4 ){
                    this.dateMes = '本月'
                }
            },
            ChangeDate(){
                this.type = 5
                this.getStudentScoreFun()
                this.ChoiceDate = false
                this.dateMes = this.startTime + "~" +this.endTime

            },
            ChoiceTime(type){
                if(type === 1){
                    this.CStime = true ,
                        this.setTime = false ,
                        this.Ctype = 1,
                        this.minDate =  new Date()
                }else if(type === 2){
                    this.CStime = true
                    this.setTime = false
                    this.Ctype = 2
                }
            },
            close(){
                this.CStime = false
                this.setTime = true
            },
            confirm(value){
                this.Stop = true
                var date = value;
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate()

                if(this.Ctype === 1){
                    this.year = y
                    this.month = m
                    this.startday = d

                    this.startTime = this.year+"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))+'-'+((this.startday) < 10 ? '0' + (this.startday) : (this.startday))
                    // this.minDate = value
                    this.showEnd = true
                    if(this.FirstChoice === 0){
                        this.endTime =  this.startTime
                        this.FirstChoice = 1
                    }
                    if(this.year > this.EndYear ||  this.month>this.Endmonth && (this.year >= this.EndYear))  {
                        this.endTime = this.startTime
                    }
                }else if(this.Ctype === 2){
                    this.EndYear = y
                    this.Endmonth = m
                    this.endday = d

                    this.endTime = this.EndYear+"-"+((this.Endmonth) < 10 ? '0' + (this.Endmonth) : (this.Endmonth))+"-"+((this.endday) < 10 ? '0' + (this.endday) : (this.endday))

                }
                console.log(this.startTime,this.endTime)
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
            ToastChioce(){
                Toast("请先选择开始时间")
            },
            choiceDTchange(type){
                this.type = type
                if(type === 1)
                {
                    this.choiceDT = true
                }else {
                    this.choiceDT = false
                }
            },
            // 选择分数
            choiceScore(score){
                this.score = score
                this.showScoreSlecte = false
            },
            onSelectScore(){
            },
            //单元选择
            onSelectUnit(item) {
                this.unitValue = item.name;

                this.unit = item.name;
                this.unitId = item.value;
                this.showUnitSlecte = false;
            },
            //科目选择
            onSelectSubject(item) {
                this.subjectValue = item.name;

                this.subjectText = item.name;
                this.subject = item.value;
                this.showSubjectSlecte = false;
            },

            onSelectTerm(item) {
                // this.termValue = item.name;
                this.termText = item.name;
                this.termId = item.value;
                this.showTermSlecte = false;

                console.log(this.termValue,this.termId)
            },
            change(type){
                if(type === 1){
                    this.showTermSlecte = true;
                }else if(type === 2){
                    this.showSubjectSlecte = true;
                }else if(type === 3){
                    this.showUnitSlecte = true;
                }else if(type === 4){
                    this.showScoreSlecte = true;
                    console.log(this.scorelist)
                }
            },
            deleteScore(){
                this.deleteDia = true
            },
            showChangeDialog(termText,subjectText,unit,score,scoreId,unitId,subject,term){
                this.termText = termText
                this.subjectText = subjectText
                this.unit = unit

                this.scoreId = scoreId
                this.termId = term
                this.subject = subject
                this.unitId = unitId
                this.score = score

                this.show = true
            },
            // 切换日期
            onClickLeft(){
                this.$router.back(-1)
            },
            onClickRight(){
                this.ChoiceDate = true
            },
            // 获取学生成绩
            getStudentScoreFun(){
                this.$loading();
                if(this.type<5) {
                    getStudentScore(this.id,this.type)
                        .then(res => {
                            this.$loadingHide();
                            if (res.status === 200) {
                                this.ScoreList = res.data.data;
                                this.List = res.data.data.list;
                                this.showNONE = 1
                                this.Number = 0

                                for (var i = 0; i < Object.keys(this.List).length; i++) {
                                    this.Number += this.List[Object.keys(this.List)[i]].length
                                }
                                console.log(this.Number)
                                this.ListNumber = this.Number

                            }
                        }).catch(() => {
                        throw new Error("学生成绩获取异常!")
                        this.showNONE = 1
                    })
                } else {
                    if(this.Stop === false){
                        this.endTime = this.startTime
                    }
                    getStudentScore(this.id,null,this.startTime,this.endTime)
                        .then(res => {
                            this.$loadingHide();
                            if (res.status === 200) {
                                this.ScoreList = res.data.data;
                                this.List = res.data.data.list;
                                this.showNONE = 1

                                this.Number = 0
                                for (var i = 0; i < Object.keys(this.List).length; i++) {
                                    this.Number += this.List[Object.keys(this.List)[i]].length
                                }
                                console.log(this.Number)
                                this.ListNumber = this.Number
                            }
                        }).catch(() => {
                        throw new Error("学生成绩获取异常!")
                        this.showNONE = 1
                    })
                }
            },
            getCollectionFun(){
                getCollection()
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            console.log(res.data.data)
                            this.termArr = res.data.data.terms;
                            this.subjectArr = res.data.data.subject;
                            this.unitArr = res.data.data.unit;
                        }
                    }).catch(() => {
                    throw new Error("学生成绩获取异常!")
                })
            },

            // 删除学生成绩
            deleteScoreFun(){
                this.show = false

                this.$loading();
                deleteScore(this.scoreId)
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            Toast.success('删除成功')
                            this.getStudentScoreFun()
                        }
                    }).catch(() => {
                    throw new Error("删除成绩异常!")
                })
            }  ,
            // 修改学生成绩
            changeScoreFun(){
                this.$loading();
                changeScore(this.scoreId,this.termId,this.subject,this.unitId,this.score,)
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            Toast.success('修改成功')
                            this.getStudentScoreFun()
                        }
                    }).catch(() => {
                    throw new Error("修改失败!")
                })
            }
        },
        mounted(){
            this.getStudentScoreFun()
            this.getCollectionFun()
            this.date = this.year
                +"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))
                +"-"+((this.today) < 10 ? '0' + (this.today) : (this.today))
            // 获取班级
            this.startTime = this.date
            for(let i = 0;i<=100;i++){
                this.scorelist.push(i)
            }
        }
    }
</script>

<style scoped>
    .body{
        font-size:0.14rem
    }
    .date{
        font-weight: 700;
        line-height: 0.3rem;
    }
    .dateBox{
        border-bottom: solid 1px #CCCCCC;
        padding: 0.15rem;
    }
    .operation{
        border: solid 1px #6699FF;
        border-radius: 5px;
        width: 0.5rem;
        color:#6699FF;
        text-align: center;
        line-height: 0.25rem;
        padding: 0 0.05rem;
    }
    .mes{
        margin: 0.1rem 0;
    }
    .scoreBox{
        /*width: 0.5rem;*/
        /*height: 0.26rem;*/
        font-size: 0.14rem;
        background-color: #fff;
        border: 0.01rem solid #999;
        color: #999;
        text-align: center;
        /*margin-top: 0.09rem;*/
        line-height: 0.26rem;
        border-radius: 0.02rem;
        margin: 0.1rem 0 0.1rem 0.1rem;
    }
    .ac_line{
        height: 0.1rem;
        background: #F3F7F8;
    }
   /deep/ .van-dialog__header{
        font-weight: 700;
        margin-bottom: 0.15rem;
        font-size: 0.18rem;
    }
    .choiceTime{
        text-align: center;
        border-top: solid 1px #CCCCCC;
        border-bottom: solid 1px #CCCCCC;
        line-height: 0.4rem;
    }


</style>