<template>
    <div class="cl-list" >
        <div>
            <van-nav-bar title="缴费提醒" left-text="返回" left-arrow  @click-left="onClickLeft">
                <div  slot="right" @click="push()" style="float:left;margin-right: 0.1rem;">
                    <div style="line-height: 0.3rem">
                        <van-icon name="coupon-o" />
                    </div>
                    <div style="font-size: 0.12rem;color: white;line-height: 0.1rem">
                        历史记录
                    </div>
                </div>
                <div  slot="right" @click="showSetDay()" style="float:left;margin-bottom:0.1rem">
                    <div style="line-height: 0.3rem">
                        <van-icon name="setting-o" />
                    </div>
                    <div style="font-size: 0.12rem;color: white;line-height: 0.1rem">
                        设置提醒
                    </div>
                </div>
            </van-nav-bar>
        </div>
        <div class="list">
            <van-tabs v-model="active" title-active-color="#3770FB" color="#3770FB" @click="banji">
                <van-tab v-for="(item,index) in classList " :title="item.name" :key="index">
                    <div style="margin: 0.1rem ">
                        <van-switch
                                v-model="checked"
                                size="15px"
                                @change="ChoiceAll(index)"
                        />
                        <span style="margin-left: 0.2rem;font-size: 0.15rem">全选</span>
                        <span v-if="checked2" style="float:right;;font-size: 0.15rem;font-weight: 700"  @click="showSet()">点击设置托辅费用到期时间</span>
                    </div>
                    <div class="ac_line"></div>
                    <div class="fam_list" v-for="(item2,index2) in item.stuList" :key="index2">
                        <van-row >
                            <van-col span="3">
                                <div
                                        style="border: solid 2px #1989fa;border-radius: 100%;width: 0.15rem;height: 0.15rem;margin: 0.2rem 0.1rem"
                                        :id="'allchoice1'+index+index2"
                                        @click="test(index,item2.stuId,index2,1)">

                                </div>
                                <div :id="'allchoice2'+index+index2"
                                     @click="test(index,item2.stuId,index2,2)"
                                     style="border: solid 2px #1989fa;border-radius: 100%;width: 0.15rem;height: 0.15rem;margin: 0.2rem 0.1rem;display: none;background-color: #1989fa"
                                >

                                </div>
                            </van-col>
                            <van-col span="5" style="float: left" >
                                <div class="Stu_box" >
                                    <span style="font-weight: 700">{{item2.stuName}}</span>
                                    <br>{{item2.gradeName}}
                                </div>
                            </van-col>
                            <van-col span="16" style="padding: 0.1rem 0;" v-if="item2.maturityDate">
                                到期缴费时间：{{item2.maturityDate}}
                                <br>

                                <span v-if="item2.laveDay!=0">剩余:{{item2.laveDay}}天</span>
                                <span v-if="item2.laveDay===0" style="font-weight: 700">今日到期</span>

                                <span v-if="showNotice === true" style="margin-left: 0.1rem">
                                    <span v-if="item2.isNotice === true" style="color: #6699CC">已通知，</span>
                                    <span v-if="item2.isRead === true" style="color: #6699CC">家长已阅</span>

                                    <span v-if="item2.isNotice === false" style="color: #FF0000">未通知，</span>
                                    <span v-if="item2.isRead === false" style="color: #FF0000">家长未阅</span>
                                </span>
                            </van-col>
                            <van-col span="16" style="margin: 0.2rem 0" v-else>
                                未设置托管费用到期时间
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
                @cancel="onCancel(currentDate)"
                :showConfirmButton=false
        />

        <div class="setTimebox">
        <van-dialog
                v-model="setTime"
                title=""
                show-cancel-button
        >
            <div style="line-height: 0.6rem;text-align: center;font-size: 0.2rem;font-weight: 700;" >
                请设置托辅费用到期时间
            </div>
            <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
                    @confirm="confirm"
                    @change="changedate"
                    @cancel="onCancel(currentDate)"
                    :title="this.Sdate"
                    :formatter="formatter"

            />
        </van-dialog>
        </div>


        <!--        提醒设置-->
        <van-dialog
                v-model="SetDays"
                title=""
                show-cancel-button
                @confirm="Include()"
                :beforeClose="chargeBtn"
        >
            <div style="line-height: 0.6rem;text-align: center;font-size: 0.2rem;font-weight: 700;" >
                提醒设置
            </div>
            <div style="padding:0 0.15rem;font-size: 0.14rem">
                <div style="margin: 0.1rem 0">
                    <span style="margin-right: 0.2rem">是否提醒家长</span>
                    <van-switch v-model="showSetDays" size="15px" @change="changeStatus(showSetDays)"/>
                </div>
                <div v-if="showSetDays">
                    <div style="margin: 0.1rem 0">
                        <span style="margin-right: 0.2rem">提前通知数</span>
                        <input maxlength="2" id="days" type="text"
                               style="width: 0.5rem;border: solid 1px;margin-right: 0.2rem;"
                               :value="earlyDays"
                               oninput="value=value.replace(/[^\d]/g, '')"
                               οninput="value=value.replace(/^[0]+[0-9]*$/gi,'')"
                        >
                        天
                    </div>
                    <div>
                        <span style="margin-right: 0.2rem;color: #9a9a9a" id="remind">(请输入1-10内的天数)</span>
                    </div>
                    <div style="margin: 0.1rem 0">
                        如2019年11月30日到期，则2019年11月28日晚上8点30分，系统自动提醒家长托辅费用到期通知。
                    </div>
                </div>
            </div>
        </van-dialog>
    </div>

</template>

<script>
    import { NavBar,Icon, Tab, Tabs,Actionsheet,Row, Col, Button,Toast,Switch,Checkbox, CheckboxGroup,DatetimePicker   } from "vant";
    import { mapState } from "vuex";
    import { HistoryList } from '@/api/parent/briefing';
    import { PaymentReminder } from '@/api/teacher/PaymentReminder';
    import { SetFeeTime } from '@/api/teacher/PaymentReminder';
    import { ReminderDays } from '@/api/teacher/PaymentReminder';
    import { GetSetDays } from '@/api/teacher/PaymentReminder';

    export default {
        name: "clas-title-list",
        inject: ['reload'],
        components: {
            [Icon.name]: Icon,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [DatetimePicker .name]: DatetimePicker ,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [NavBar.name]: NavBar,
            [Col.name]: Col,
            [Toast.name]: Toast,
            [Button.name]: Button,
            [Actionsheet.name]:Actionsheet,
            [Switch .name]:Switch ,
            /*DownMenu: DownMenu*/
        },
        data() {
            return {
                clsStuList:[],
                classList:[],

                active: 0,
                show:true,
                allchoice:false,
                showPar:true,
                showUnCom:true,
                checked:false,
                checked2:false,
                Acheck:false,

                currentDate: new Date(),
                minDate: new Date(),
                setTime:false,
                SetDays:false,
                showSetDays:false,
                date:0,
                year:0,
                month:0,
                day:0,

                Sdate:"",
                Syear:0,
                Smonth:0,
                Sday:0,

                stulist:[],


                checkedNames: [],
                StuIdList:[],
                ClaIndex:0,
                ClaStuId:[],

                testlist:[],
                checknumber:0,
                Setime:0,

                // 提醒天数
                isNotice:0,
                advanceDay:0,
                earlyDays:1,
                isNoticeArray:[],
                showNotice:false
            };
        },
        methods: {

            onClickLeft(){
              this.$router.back()
            },
            // 切换开关-家长提醒
            changeStatus(value){
                if(value === true){
                    this.isNotice = 1
                }else if(value === false){
                    this.isNotice = 0
                }
                console.log(value,this.isNotice)
            },
            chargeBtn(action, done){
                if(this.isNotice === 1) {
                    this.advanceDay = document.getElementById('days').value
                    if (action === 'confirm' && (this.advanceDay > 10 || this.advanceDay == 0 )) {
                        document.getElementById('remind').style.color='red'
                        done(false);
                        return;
                    }
                }else if(this.isNotice === 0){
                    done(true);
                }

                if (action === 'cancel') {//取消按钮
                    done();
                }
                done();
            },
            Include(){
                if(this.isNotice === 1){
                    this.showNotice = true
                    this.advanceDay = document.getElementById('days').value
                    if(this.advanceDay <= 10 && this.advanceDay >0 ) {
                        if(this.advanceDay[0] == 0){
                            this.advanceDay = this.advanceDay[1]
                        }
                        this.ReminderDaysFun()
                    }
                }else if(this.isNotice === 0){
                    this.showNotice = false
                    this.ReminderDaysFun()
                }
            },
            push(){
              this.$router.push({name:"PaymentRecord"})
            },
            isFind(id){
                for(let i = 0;i<this.testlist[this.ClaIndex].length;i++){
                    if(id === this.testlist[this.ClaIndex][i]){
                        return false
                    }
                }
                return true
            },
            showSet(){
              this.setTime = true
            },
            // 设置时间
            SetFeeTimeFun(date){
                this.$loading();
                SetFeeTime(this.testlist[this.ClaIndex],date)
                        .then(res => {
                            this.$loadingHide();
                            if (res.status === 200) {
                                Toast.success("提交成功！")
                                // history.go(0)
                                window.location.reload()
                                this.reload()
                            }
                        }).catch(() => {
                        throw new Error("提交时间异常!")
                    })
            },
            // 获取提醒天数设置

            showSetDay(){
                this.SetDays=true
                this.GetSetDaysFun()
            },
            GetSetDaysFun(){
                this.$loading();
                GetSetDays()
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            this.isNoticeArray = res.data.data
                            if(res.data.data.isNotice === 1){
                                this.showSetDays = true
                                this.showNotice = true
                                this.isNotice = 1
                                this.earlyDays = res.data.data.advanceDay
                            }else if(res.data.data.isNotice === 0){
                                this.showSetDays = false
                                this.showNotice = false
                                this.isNotice = 0
                            }
                        }
                    }).catch(() => {
                    throw new Error("获取提醒天数异常!")
                })
            },
            // 提醒天数设置
            ReminderDaysFun(){
                this.$loading();
                if(this.isNotice===1){
                ReminderDays(this.isNotice,this.advanceDay)
                        .then(res => {
                            this.$loadingHide();
                            if (res.status === 200) {
                                    Toast.success("设置成功！")
                            }
                        }).catch(() => {
                        throw new Error("设置提前提醒时间异常!")
                    })
                }else{
                ReminderDays(this.isNotice)
                        .then(res => {
                            this.$loadingHide();
                            if (res.status === 200) {
                                    Toast.success("设置成功！")
                            }
                        }).catch(() => {
                        throw new Error("设置提前提醒时间异常!")
                    })
                }
            },

            // 清除已选择样式
            cleanChoice(){
                for(var cl =0 ;cl<this.clsStuList[this.ClaIndex].id.length;cl++){
                    document.getElementById("allchoice2"+this.ClaIndex+cl).style.display = 'none'
                    document.getElementById("allchoice1"+this.ClaIndex+cl).style.display = 'block'
                    console.log("allchoice1"+this.ClaIndex+cl)
                }
                console.log(this.testlist[this.ClaIndex])

                this.testlist[this.ClaIndex]=[]
                // this.banji(this.ClaIndex+1)
                this.banji(this.ClaIndex)
            },
            // 获取数据不刷新当前数组
            GetStuListSE(){
                this.$loading();
                PaymentReminder()
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                                this.classList =  []
                                this.clsStuList=[]

                                for (let item of res.data.data.clsStu) {
                                    if (item.clsId) {
                                        this.classList.push({
                                            id: item.clsId,
                                            name: item.clsName,
                                            stuList: item.stuList,
                                            // week: this.$route.params.week,
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

                                this.ClaStuId = []
                                for (let item of this.clsStuList[0].id) {
                                    this.ClaStuId.push(item.stuId);
                                }
                        }

                    }).catch(() => {
                    throw new Error("历史记录获取异常!")
                })
            },

            GetStuList(){
                this.$loading();
                PaymentReminder()
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            this.classList =  []
                            this.clsStuList=[]

                            for (let item of res.data.data.clsStu) {
                                if (item.clsId) {
                                    this.classList.push({
                                        id: item.clsId,
                                        name: item.clsName,
                                        stuList: item.stuList,
                                        // week: this.$route.params.week,
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
                            for(let i =0;i<this.clsStuList.length;i++){
                                this.testlist[i] = []
                            }
                                this.ClaStuId = []
                                for (let item of this.clsStuList[0].id) {
                                    this.ClaStuId.push(item.stuId);
                                }
                        }
                    }).catch(() => {
                    throw new Error("历史记录获取异常!")
                })
            },
            test(index,id,index2,type){
                    if(type === 1) {
                        this.checked = false
                        this.testlist[index].push(id)
                        document.getElementById("allchoice1"+index+index2).style.display = 'none'
                        document.getElementById("allchoice2"+index+index2).style.display = 'block'
                        this.checked2 = true
                    }else if(type === 2){
                        // this.banji(0)
                        this.banji(index)
                        this.checked = false
                        for(var Dindex=0; Dindex < this.testlist[index].length; Dindex++){
                            if(this.testlist[index][Dindex] === id)
                            {
                                this.testlist[index].splice(Dindex, 1); //将这个元素移除
                            }
                        }
                        document.getElementById("allchoice2"+index+index2).style.display = 'none'
                        document.getElementById("allchoice1"+index+index2).style.display = 'block'
                            if (this.testlist[index].length === 0 ){
                                this.checked2 = false
                            }
                    }

                this.banji(index)
                if(this.testlist[index].length === this.ClaStuId.length){
                        this.checked = true
                    }
                console.log(this.testlist)
                // console.log(this.ClaStuId)
                this.ClaIndex = index
            },
            // 全选
            ChoiceAll(index){
                console.log("id"+ this.ClaIndex)
                if(index === 0){
                    this.ClaIndex = index
                    this.ClaStuId = []
                    for (let item of this.clsStuList[index].id) {
                        this.ClaStuId.push(item.stuId);
                    }
                }
                if (this.checked === true) {
                    this.testlist[index] = this.ClaStuId
                    if(this.testlist[index]){
                            for(let i=0;i<this.testlist[index].length;i++){
                                document.getElementById("allchoice1"+index+i).style.display = 'none'
                                document.getElementById("allchoice2"+index+i).style.display = 'block'
                            }
                    }
                    this.checked2 = true
                } else if(this.checked === false){
                    for(let i=0;i<this.testlist[index].length;i++){
                        document.getElementById("allchoice1"+index+i).style.display = 'block'
                        document.getElementById("allchoice2"+index+i).style.display = 'none'
                    }
                    this.testlist[index] = []
                    this.checked2 = false
                }
                console.log(this.testlist)

            },
            downMenuShow() {
                this.$store.commit("getShow");
            },
            // 点击班级
            banji(index) {
                // console.log(index)
                this.ClaIndex = index
                this.ClaStuId = []
                for (let item of this.clsStuList[index].id) {
                        this.ClaStuId.push(item.stuId);
                }
                console.log(this.ClaStuId)
                // console.log(this.testlist[index])

                if(this.testlist[index].length === this.ClaStuId.length ){
                    this.checked = true
                }else{
                    this.checked = false
                }
                    if(this.testlist[index].length >0 ){
                        this.checked2 = true
                    }else{
                        this.checked2 = false
                    }

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
                        this.banji(i)
                    }
                }
                this.$emit("classGrade", { id: item.id,active:this.active });
            },
            // 选时间
            confirm(value){
                var date = value;
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();

                this.year = y
                this.month = m
                this.day = d

                this.date = this.year
                    +"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))
                    +"-"+((this.day) < 10 ? '0' + (this.day) : (this.day))

                console.log(this.date,this.ClaIndex,this.testlist[this.ClaIndex])

                this.SetFeeTimeFun(this.date)

                this.setTime = false
                this.checked = false

                // this.cleanChoice()
                // this.GetStuListSE()

            },
            changedate(value){
                let y = value.getColumnValue(0)
                let m = value.getColumnValue(1)
                let d = value.getColumnValue(2)
                this.Sdate = y+m+d
            },
            onCancel(time){
               this.setTime = false
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
            }
        },
        mounted(){
            this.GetStuList()
            this.GetSetDaysFun()
            // this.GetPayList()
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
        word-wrap:break-word
    }
    /deep/.van-tab, .van-tag--large{
        font-size: 0.14rem;
    }
    /deep/.van-tab{
        line-height: 0.44rem;
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
        padding: 0.1rem;
        border-bottom: solid 1px #CCCCCC;
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
        padding: 0.1rem 0;
    }
    /deep/.van-checkbox__icon .van-icon{
        border: 1px solid #787c87
    }
    .ac_line{
        height: 0.1rem;
        background: #F3F7F8;
        width: 100%;
    }
    /*/deep/.van-hairline--top-bottom .van-picker__toolbar{*/
    /*    display: none;*/
    /*}*/
    /*/deep/.van-hairline--top {*/
    /*    display: none;*/
    /*}*/
    /*/deep/.van-dialog__footer {*/
    /*    display: none;*/
    /*}*/
    /*/deep/.van-dialog__footer--buttons{*/
    /*    display: none;*/
    /*}*/
    .setTimebox/deep/.van-dialog .van-button{
        display: none;
    }
    /deep/.van-nav-bar__right{
        right: 0.1rem;
    }

</style>
