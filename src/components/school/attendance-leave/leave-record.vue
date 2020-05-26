<template>
    <div>
        <div>
            <van-nav-bar
                    title="请假记录"
                    left-text="返回"
                    :right-text="showtype === 1 ? '显示年级' : '显示班级'"
                    left-arrow
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            />
        </div>
        <div style="height: 0.15rem"></div>
        <van-tabs type="card">
            <van-tab title="学生查询">
                <div style="line-height: 0.5rem;padding: 0 0.2rem;border-bottom: solid 1px #CCCCCC;">
                    <van-row>
                        <van-col span="24" style="text-align: center">
                            <div @click="ChoiceDate = true" >
                                <span style="font-weight: 700">{{date}}</span>
                                <span style="color: #cdcdcd;margin: 0 0.1rem">&#9660;</span>
                            </div>
                        </van-col>
                    </van-row>
                </div>
                <div style="line-height: 0.5rem;border-bottom: solid 1px #CCCCCC;padding: 0 0.15rem">
                    <span>{{LeaveLength}}人请假</span>
                    <span style="margin-left: 0.2rem">{{record.length}}条记录</span>
                    <span style="float:right;" @click="showYear">显示范围：{{searchAll}}<span style="color: #cdcdcd;margin: 0 0.1rem">&#9660;</span></span>
                </div>
                <div  v-for="(item,index) in leavelist"  :key="index" >
                    <div v-if="
                    (showtype === 1 &&
                    (item.gradeName === search || search === '')) ||
                    (showtype === 0 &&
                    (item.className === search || search === '')) "
                         style="border-bottom: 1px solid rgb(204, 204, 204);">
                        <div  style="margin: 0 0.15rem;line-height: 0.4rem;">
                            <van-row >
                                <van-col span="5">
                                    <span style="font-weight: 700">{{item.stuName}}</span>
                                </van-col>
                                <van-col span="5">
                                    <span>{{showtype === 1 ? item.gradeName : item.className}}</span>
                                </van-col>
                                <van-col span="12" style="text-align: center;">
                                    <span>共{{Object.keys(item.list).length}}条记录</span>
                                </van-col>
                                <van-col span="2" style="text-align: center;">
                                    <span @click="HideItemList(index,1)" :id="'d'+index">▼</span>
                                    <span @click="HideItemList(index,2)" :id="'u'+index" style="display: none">▲</span>
                                </van-col>
                            </van-row>
                        </div>
                        <div style="margin: 0 0.15rem 0.15rem 0.15rem;line-height: 0.4rem;border: solid 1px #CCCCCC;padding: 0 0.15rem" :id="'list'+index">
                            <div v-for="(item2,index2) in item.list" :key="index2">
                                <van-row >
                                    <van-col span="12">
                                        <span style="font-weight: 700">  {{item2.date}}</span>
                                    </van-col>
                                    <van-col span="12">
                                        <span style="color: #FF6666">{{item2.attendPeriod}}</span>
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="日期查询">
                <div class="cl-list" >
                    <div class="list">
                        <van-tabs v-model="active" title-active-color="#3770FB" color="#3770FB" @click="banji">
                            <van-tab v-for="(item,index) in classList " :title="item.name" :key="index">
                                <div class="fam_list" >
                                    <van-row >
                                        <van-col span="8" style="float: left" v-for="(item2,index2) in item.stuList" :key="index2">
                                            <div class="stuBox" @click="CheckMore(item2.stuId,item2.stuName)" >
                                                <span style="font-weight: 700">{{item2.stuName}}</span>
                                                <br>{{item2.gradeName}}
                                            </div>
                                        </van-col>
                                    </van-row>
                                </div>
                            </van-tab>
                        </van-tabs>
                    </div>
                    <div class="c-dowm" @click="downMenuShow">
                        <span class="fonticon">
                            <van-icon name="arrow-down" />
                        </span>
                    </div>
                    <van-actionsheet
                            v-model="getB"
                            cancel-text="取消"
                            :actions="classList"
                            @select="onSelect"
                            @cancel="onCancel"
                    />
                </div>
            </van-tab>
        </van-tabs>

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
                        @confirm="ChangeLeaveMesFun(5)"
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
            <div style="font-size: 0.14rem;line-height: 0.5rem;text-align: center;border-top: 1px solid #ebedf0;color: #1989fa" @click="back"> 点击此处显示全部 </div>
        </van-popup>

    </div>

</template>

<script>
    import { NavBar,Icon, Tab, Tabs,Actionsheet,Row, Col, Button,Toast,Switch,Checkbox, CheckboxGroup,DatetimePicker,Search,Popup,Picker    } from "vant";
    import { mapState } from "vuex";
    import { getLeaveCls } from '@/api/school/attendance-leave';
    import { getLeaveMes } from '@/api/school/attendance-leave';
    import { PaymentHistory } from '@/api/teacher/PaymentReminder';

    export default {
        name: "clas-title-list",
        components: {
            [Icon.name]: Icon,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [DatetimePicker .name]: DatetimePicker ,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Popup .name]: Popup ,
            [Row.name]: Row,
            [Search.name]: Search,
            [NavBar.name]: NavBar,
            [Col.name]: Col,
            [Picker.name]: Picker,
            [Toast.name]: Toast,
            [Button.name]: Button,
            [Actionsheet.name]:Actionsheet,
            [Switch .name]:Switch ,
            /*DownMenu: DownMenu*/
        },
        data() {
            return {
                value:'',
                valueSE:'',
                clsStuList:[],
                classList:[],
                config:[],
                isNotice:0,
                SearchList:[],

                active: 0,
                stopSearch: 0,
                show:true,
                allchoice:false,
                showPar:true,
                showUnCom:true,
                checked:false,
                checked2:false,
                Acheck:false,
                Showsearch:true,
                noneMes:false,

                currentDate: new Date(),
                ChoiceDate:false,
                minDate: new Date(),
                setTime:false,
                SetDays:false,
                choiceDT:false,

                date:0,

                stulist:[],

                checkedNames: [],
                StuIdList:[],
                ClaIndex:0,
                ClaStuId:[],

                testlist:[],
                checknumber:0,

                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                today:new Date().getDate(),

                Tyear:new Date().getFullYear(),
                Tmonth:new Date().getMonth()+1,
                Ttoday:new Date().getDate(),

                changemonth:false,
                leavelist:[],
                showse:false,
                columns: [],
                search:'',
                searchAll:'显示全部',
                ClassName:[],
                ClassType:[],
                showtype:1,
                record:0,

                startTime:'',
                endTime:'',
                showEnd:false,
                CStime:false,
                FirstChoice:0,
                LeaveLength:0,

                Stop:false



            };
        },
        methods: {
            HideItemList(index,type){
                if(type === 1){
                    document.getElementById('list'+index).style.display = 'none'
                    document.getElementById('d'+index).style.display = 'none'
                    document.getElementById('u'+index).style.display = 'block'
                }else if(type === 2){
                    document.getElementById('list'+index).style.display = 'block'
                    document.getElementById('d'+index).style.display = 'block'
                    document.getElementById('u'+index).style.display = 'none'
                }
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
                this.Stop = true;
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
                if(type === 1)
                {
                    this.choiceDT = true
                }else {
                    this.choiceDT = false
                }
            },
            // 查看年级
            showYear(){
                if(this.showtype === 1){
                    var resultArr = [];
                    for (var i = 0; i < this.ClassName.length; i++) {
                        for (var j = 0; j < resultArr.length; j++) {
                            if (resultArr[j] == this.ClassName[i]) {
                                break;
                            }
                        }
                        if (j == resultArr.length) {
                            resultArr[resultArr.length] = this.ClassName[i];
                        }
                    }
                    // 弹窗筛选年级年级排序
                    const arr = ['一', '二', '三', '四', '五', '六', '初','未']
                    const list = resultArr.sort((a, b) => arr.indexOf(a[0]) - arr.indexOf(b[0]))
                    this.columns = list
                    if(resultArr.length>0 && resultArr != []){
                        this.showse = true
                    }else{
                        Toast.fail('没有学生')
                    }
                }else{
                    var resultArrS = [];
                    for (var iS = 0; iS < this.ClassType.length; iS++) {
                        for (var jS = 0; jS < resultArrS.length; jS++) {
                            if (resultArrS[jS] == this.ClassType[iS]) {
                                break;
                            }
                        }
                        if (jS == resultArrS.length) {
                            resultArrS[resultArrS.length] = this.ClassType[iS];
                        }
                    }
                    // 弹窗筛选年级年级排序
                    const arrS = ['一', '二', '三', '四', '五', '六', '初','未']
                    const listS = resultArrS.sort((a, b) => arrS.indexOf(a[0]) - arrS.indexOf(b[0]))
                    this.columns = listS
                    if(resultArrS.length>0 && resultArrS != []){
                        this.showse = true
                    }else{
                        Toast.fail('没有学生')
                    }
                }

            },
            // 选择显示年级
            onConfirm(val){
                this.search = val
                this.searchAll = val
                this.showse = false
                // 每个班级请假人数
                if(this.showtype === 1){
                    let leaveNumber = []
                    for(let i =0;i<this.leavelist.length;i++){
                        if(this.leavelist[i].gradeName === val ){
                            leaveNumber.push(this.leavelist[i].list)
                        }
                    }
                    // 每个年级记录
                    let record = []
                    for(let i = 0;i<leaveNumber.length;i++){
                        for (let sv in leaveNumber[i]) {
                            record.push(leaveNumber[sv])
                        }
                    }
                    this.record = record
                    this.LeaveLength = leaveNumber.length

                    console.log(leaveNumber)
                }else{
                    let leaveNumber = []
                    for(let i =0;i<this.leavelist.length;i++){
                        if(this.leavelist[i].className === val ){
                            leaveNumber.push(this.leavelist[i].list)
                        }
                    }
                    // 每个班级记录
                    let record = []
                    for(let i = 0;i<leaveNumber.length;i++){
                        for (let sv in leaveNumber[i]) {
                            record.push(leaveNumber[sv])
                        }
                    }
                    this.LeaveLength = leaveNumber.length
                    this.record = record
                }
            },
            back(){
                this.search = ''
                this.searchAll = '显示全部'
                this.showse = false
                // 每个班级请假人数
                let leaveNumber = []
                for(let i =0;i<this.leavelist.length;i++){
                        leaveNumber.push(this.leavelist[i].list)
                }
                // 每个班级记录
                let record = []
                for(let i = 0;i<leaveNumber.length;i++){
                    for (let sv in leaveNumber[i]) {
                        record.push(leaveNumber[sv])
                    }
                }
                console.log(record)
                this.LeaveLength = leaveNumber.length
                this.record = record
            },
            onClickLeft(){
                this.$router.back()
            },
            onClickRight(){
                if(this.showtype === 1){
                    this.showtype = 0
                }else if (this.showtype === 0){
                    this.showtype = 1
                }
                this.search =''
                this.searchAll ='显示全部'

                // 每个班级请假人数
                let leaveNumber = []
                for(let i =0;i<this.leavelist.length;i++){
                    leaveNumber.push(this.leavelist[i].list)
                }
                // 每个班级记录
                let record = []
                for(let i = 0;i<leaveNumber.length;i++){
                    for (let sv in leaveNumber[i]) {
                        record.push(leaveNumber[sv])
                    }
                }
                this.LeaveLength = leaveNumber.length
                this.record = record
            },
            isFind(id){
                for(let i = 0;i<this.classList[id].length;i++){
                    if(id === this.classList[id][i]){
                        return false
                    }
                }
                return true
            },
            // 获取班级列表
            GetStuList(){
                this.$loading();
                getLeaveCls()
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                                this.classList =  []

                                for (let item of res.data.data) {
                                    if (item.clsId) {
                                        this.classList.push({
                                            id: item.clsId,
                                            name: item.clsName,
                                            stuList: item.stuList,
                                            week: this.$route.params.week,
                                        });
                                    }
                                }
                                for (let item of this.classList) {
                                    if (item.stuList) {
                                        this.clsStuList.push({
                                            id: item.stuList,
                                        });
                                    }
                                }

                        }
                    }).catch(() => {
                    throw new Error("历史记录获取异常!")
                })
            },
            // 请假记录日期查询选项卡
            getLeaveMesFun(){
                this.$loading();
                getLeaveMes(1)
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            this.leavelist = res.data.data
                            this.LeaveLength = res.data.data.length
                            // 每个班级请假人数
                            let leaveNumber = []
                            for(let i =0;i<this.leavelist.length;i++){
                                leaveNumber.push(this.leavelist[i].list)
                            }
                            // 每个班级记录
                            let record = []
                            for(let i = 0;i<leaveNumber.length;i++){
                                for (let sv in leaveNumber[i]) {
                                    record.push(leaveNumber[sv])
                                }
                            }
                            this.record = record

                            this.ClassName= [];
                            for (let item of this.leavelist){
                                this.ClassName.push(item.gradeName)
                            }

                            this.ClassType= [];
                            for (let item of this.leavelist){
                                this.ClassType.push(item.className)
                            }
                                console.log(res.data.data)
                        }
                    }).catch(() => {
                    throw new Error("请假记录日期查询选项卡获取异常!")
                })

            },
            ChangeLeaveMesFun(type){
                if( type < 5){
                    if(type === 1){
                        this.date = '今日'
                    } else if(type === 2){
                        this.date = '昨日'
                    } else if(type === 3){
                        this.date = '本周'
                    } else if(type === 4){
                        this.date = '本月'
                    }
                    this.$loading();
                    getLeaveMes(type)
                        .then(res => {
                            this.$loadingHide();
                            if (res.status === 200) {
                                this.leavelist = res.data.data
                                this.LeaveLength = res.data.data.length

                                // 每个班级请假人数
                                let leaveNumber = []
                                for(let i =0;i<this.leavelist.length;i++){
                                    leaveNumber.push(this.leavelist[i].list)
                                }
                                // 每个班级记录
                                let record = []
                                for(let i = 0;i<leaveNumber.length;i++){
                                    for (let sv in leaveNumber[i]) {
                                        record.push(leaveNumber[sv])
                                    }
                                }
                                this.record = record

                                this.ClassName= [];
                                for (let item of this.leavelist){
                                    this.ClassName.push(item.gradeName)
                                }

                                this.ClassType= [];
                                for (let item of this.leavelist){
                                    this.ClassType.push(item.className)
                                }
                            }
                        }).catch(() => {
                        throw new Error("请假记录日期查询选项卡获取异常!")
                    })
                }else{
                    if(this.Stop === true){
                        this.$loading();
                        getLeaveMes(null,this.startTime,this.endTime)
                            .then(res => {
                                this.$loadingHide();
                                if (res.status === 200) {
                                    this.leavelist = res.data.data
                                    this.LeaveLength = res.data.data.length

                                    // 每个班级请假人数
                                    let leaveNumber = []
                                    for(let i =0;i<this.leavelist.length;i++){
                                        leaveNumber.push(this.leavelist[i].list)
                                    }
                                    // 每个班级记录
                                    let record = []
                                    for(let i = 0;i<leaveNumber.length;i++){
                                        for (let sv in leaveNumber[i]) {
                                            record.push(leaveNumber[sv])
                                        }
                                    }
                                    this.record = record

                                    this.ClassName= [];
                                    for (let item of this.leavelist){
                                        this.ClassName.push(item.gradeName)
                                    }

                                    this.ClassType= [];
                                    for (let item of this.leavelist){
                                        this.ClassType.push(item.className)
                                    }
                                }
                            }).catch(() => {
                            throw new Error("请假记录日期查询选项卡获取异常!")
                        })
                        this.date = this.startTime + "~" +this.endTime
                    }else{
                        this.$loading();
                        getLeaveMes(null,this.startTime,this.startTime)
                            .then(res => {
                                this.$loadingHide();
                                if (res.status === 200) {
                                    this.leavelist = res.data.data
                                    this.LeaveLength = res.data.data.length

                                    // 每个班级请假人数
                                    let leaveNumber = []
                                    for(let i =0;i<this.leavelist.length;i++){
                                        leaveNumber.push(this.leavelist[i].list)
                                    }
                                    // 每个班级记录
                                    let record = []
                                    for(let i = 0;i<leaveNumber.length;i++){
                                        for (let sv in leaveNumber[i]) {
                                            record.push(leaveNumber[sv])
                                        }
                                    }
                                    this.record = record

                                    this.ClassName= [];
                                    for (let item of this.leavelist){
                                        this.ClassName.push(item.gradeName)
                                    }

                                    this.ClassType= [];
                                    for (let item of this.leavelist){
                                        this.ClassType.push(item.className)
                                    }
                                }
                            }).catch(() => {
                            throw new Error("请假记录日期查询选项卡获取异常!")
                        })
                        this.date = this.startTime + "~" +this.startTime
                    }
                }
                this.search = ''
                this.searchAll = '显示全部'
                this.ChoiceDate = false
            },
            push(id){
                this.$router.push({name:'StudentDetails',params:{id:id}})
            },
            // 复选框
            // 全选
            downMenuShow() {
                this.$store.commit("getShow");
            },
            // 点击班级
            banji(index) {
                let id = this.classList[index].id;
                let name = this.classList[index].name;
                this.$emit("classGrade", {id:id,active:index,name:name});
                var StuIdList=[];
                for (let id of this.classList[index].stuList) {
                    StuIdList.push(id.stuId)
                }
                this.StuIdList = StuIdList
            },
            onSelect(item){
                this.$store.commit('offShow');
                for (let i=0;i< this.classList.length;i++) {
                    if (this.classList[i].id === item.id){
                        this.active = i;
                    }
                }
                this.$emit("classGrade", { id: item.id,active:this.active });
            },
            onCancel(){
                this.$store.commit('offShow');
            },
            // 选择时间            // 切换月份
            changedate(value){
                var date = value;
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                let d = date.getDate()

                this.year = y
                this.month = m
                this.today = d

                this.date = y+"-"+((m) < 10 ? '0' + (m) : (m))+'-'+((d) < 10 ? '0' + (d) : (d))
                this.getLeaveMesFun()
                this.ChoiceDate = false
                console.log(this.date )

            },
            // 跳转记录
            CheckMore(id,name){
                this.$router.push( {name:'StudentLeaveRecord',query:{id:id,name:name}} )
            }
        },
        mounted(){
            // 今日日期
            console.log(this.today)
            this.today = ((this.today) < 10 ? '0' + (this.today) : (this.today))

            this.date = this.year
                +"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))
                +"-"+((this.today) < 10 ? '0' + (this.today) : (this.today))
            // 获取班级
            this.startTime = this.date

            this.GetStuList()
            // 请假记录日期查询选项卡
            this.getLeaveMesFun()
            // this.checkedNames.splice(index,0,indexse)
        },
        computed: {
            ...mapState(["isShow"]),
            getB:{
                get () {
                    return this.$store.state.app.isShow
                },
                set (value) {
                    this.$store.state.app.isShow = value
                }
            },
        }
    };
</script>

<style scoped lang="less">
    *{
        font-size:0.14rem;
        word-wrap:break-word
    }
    /deep/.van-tab, .van-tag--large{
        font-size: 0.14rem;
    }
    /deep/.van-tab{
        /*line-height: 0.44rem;*/
    }
    .cl-list {
        width: 100%;
        overflow: hidden;
        .list {
            float: left;
            width: 100%;
            overflow: hidden;
            line-height: 0.2rem;
            .van-tabs--line{
                padding-top:0.44rem;
                /deep/.van-tabs__wrap{
                    height: 0.44rem;
                    width: 90%;
                }
            }
        }
        .c-dowm {
            position: absolute;
            right: 0;
            z-index: 200;
            background: white;
            float: left;
            width: 0.4rem;
            height: 0.45rem;
            border-bottom: 0.01rem solid #eee;
            box-sizing: border-box;
            .fonticon {
                position: absolute;
                top: 0.11rem;
                height: 0.2rem;
                padding-left: 0.16rem;
                font-size: 0.16rem;
                color: #999;
                border-left: 0.01rem solid #eeeeee;
            }
        }
    }
    .fam_box{
        padding: 0.15rem;
        float: left;
        text-align: center;
    }
    .fam_list{
        padding:0.1rem 0.15rem;
        /*border-bottom: solid 1px #CCCCCC;*/
    }
    .text_box{
        margin: 0.15rem  0;
        border: solid 1px;
        width: 90%;
        border-radius: 10px;
        height: 0.6rem;
    }
    .title_date{
        line-height: 0.5rem;
        text-align: center;
        border-bottom: solid 1px #CCCCCC;
        font-weight: 700;
    }
    .title_show{
        color: #6699FF;
        line-height: 0.4rem;
        text-align: center;
        border-bottom: 1px solid rgb(204, 204, 204);
    }
    .Hide_btn{
        border: none;
        background: white;
    }
    .ac_line{
        height: 0.1rem;
        background: #F3F7F8;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .Stu_box{
        padding: 0.1rem ;
    }
    /deep/.van-checkbox__icon .van-icon{
        border: 1px solid #787c87
    }
    .ac_line{
        height: 0.1rem;
        background: #F3F7F8;
        width: 100%;
    }
    /*.setTimebox/deep/.van-dialog .van-button{*/
    /*    display: none;*/
    /*}*/
    .box{
        padding: 0.15rem;
        border-bottom: solid 1px #CCCCCC;
    }
    .stuBox{
        margin: 0.1rem;
        border: solid 1px;
        padding: 0.1rem;
        text-align: center;
        border-radius: 0.1rem;
    }
    /deep/.van-dialog__header{
        font-weight: 700;
        margin-bottom: 0.15rem;
        font-size: 0.18rem;
    }
    .choicedateB{
        border-top: solid 1px #e7e7e7;

    }
    .choiceTime{
        text-align: center;
        border-top: solid 1px #CCCCCC;
        border-bottom: solid 1px #CCCCCC;
        line-height: 0.4rem;
    }


</style>
