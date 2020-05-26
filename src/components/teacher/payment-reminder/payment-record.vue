<template>
    <div>
        <div>
            <van-nav-bar
                    title="历史记录"
                    left-text="返回"
                    right-text=""
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
    <div class="cl-list" >

        <div>
            <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
            >
                <div slot="action" @click="onSearch(value)">搜索</div>
            </van-search>
        </div>

        <div class="ac_line"></div>

        <div v-if="Showsearch ">
            <div style="line-height: 0.5rem;padding: 0 0.2rem;border-bottom: solid 1px #CCCCCC;">
                <van-row>
                    <van-col span="2">
                       <span @click="otherMonth(1)"><</span>
                    </van-col>
                    <van-col span="20" style="text-align: center">
                        {{year}}年{{month}}月
                    </van-col>
                    <van-col span="2" style="text-align: right">
                        <span v-if="changemonth"  @click="otherMonth(2)"> > </span>
                    </van-col>
                </van-row>
            </div>
            <div class="list">
                <van-tabs v-model="active" title-active-color="#3770FB" color="#3770FB" @click="banji">
                    <van-tab v-for="(item,index) in classList " :title="item.name" :key="index">
                        <div class="fam_list" v-for="(item2,index2) in item.stuList" :key="index2">
                            <div style="line-height: 0.16rem">
                                <van-row class="Stu_box">
                                    <van-col span="5">
                                        <span style="font-weight: 700;font-size: 0.16rem">{{item2.stuName}}</span>
                                    </van-col>
                                    <van-col span="5" >
                                        {{item2.gradeName}}
                                    </van-col>
                                    <van-col span="12" >
                                        本月<span style="font-weight: 700;margin: 0 0.1rem">{{item2.fees.length}}</span>个到期缴费通知
                                    </van-col>
                                    <van-col span="2" v-if="item2.fees.length>0" >
                                        <span @click="hide(index,index2)" :id="'btn'+index+index2">&#9650;</span>
                                        <span @click="showMes(index,index2)" :id="'Sbtn'+index+index2" style="display: none">&#9660;</span>
                                    </van-col>
                                </van-row>
                            </div>
                            <div :id="'mes'+index+index2">
                                <div v-for="(item3,index3) in item2.fees" :key="index3" >
                                    <van-row>
                                        <van-col span="16">
                                             到期缴费时间：{{item3.maturityDate}}
                                        </van-col>
                                        <van-col span="8">
                                           <span v-if="item3.isNotice === false
                                                   && config.isNotice === 0
                                                   && item3.isRead === false
                                                   && (item3.maturityDate[8]+item3.maturityDate[9]) > today
                                                   && (item3.maturityDate[0]+item3.maturityDate[1]+item3.maturityDate[2]+item3.maturityDate[3]) >= thisyear
                                                   ">
                                                       {{item3.laveDay}}
                                                       天后到期
                                           </span>
                                           <span v-if="item3.isNotice === false
                                                   && config.isNotice === 1
                                                   && item3.isRead === false
                                                   && ((item3.maturityDate[8]+item3.maturityDate[9])-config.advanceDay) > today
                                                   && item3.laveDay != 0
                                                   && (item3.maturityDate[0]+item3.maturityDate[1]+item3.maturityDate[2]+item3.maturityDate[3]) >= thisyear ">
                                               {{item3.laveDay}}
                                                        天后通知
                                           </span>

<!--                                            <span v-if="-->
<!--                                                    config.isNotice === 1-->
<!--                                                   &&item3.isRead === false-->
<!--                                                   &&item3.laveDay != 0-->
<!--                                                   &&item3.laveDay < config.advanceDay-->
<!--                                                   &&(today+item3.laveDay) == (item3.maturityDate[8]+item3.maturityDate[9])-->
<!--                                                   && (item3.maturityDate[0]+item3.maturityDate[1]+item3.maturityDate[2]+item3.maturityDate[3]) >= thisyear-->
<!--                                                 ">-->
<!--                                                       {{item3.laveDay}}-->
<!--                                                        天后到期-->
<!--                                           </span>  -->
                                            <span v-if="item3.isNotice === false
                                                   && config.isNotice === 1
                                                   && item3.isRead === false
                                                   && item3.laveDay != 0
                                                   && item3.laveDay<config.advanceDay">
                                                        {{item3.laveDay}}
                                                        天后到期
                                           </span>

                                           <span v-if="item3.isRead === true " style="color: #6699CC">家长已阅</span>

                                            <div v-if="item3.isRead === false
                                                 && item3.isNotice === true"
                                                 style="padding: 0.1rem 0;color: #FF6666">
                                                家长未阅
                                            </div>

                                           <span v-if="
                                                    config.isNotice === 1
                                                   && item3.isRead === false
                                                   &&
                                                   (
                                                       ((
                                                           ((item3.maturityDate[8]+item3.maturityDate[9])-config.advanceDay) < today
                                                           && (item3.maturityDate[5]+item3.maturityDate[6]) <= thismonth
                                                           && (item3.maturityDate[8]+item3.maturityDate[9]) != today
                                                           && (item3.maturityDate[0]+item3.maturityDate[1]+item3.maturityDate[2]+item3.maturityDate[3]) <= thisyear
                                                       ))
                                                       || (item3.maturityDate[0]+item3.maturityDate[1]+item3.maturityDate[2]+item3.maturityDate[3]) < thisyear
                                                   )
                                                   &&item3.laveDay === 0"
                                                   style="color: #FF6666">
                                                       已到期
                                           </span>

                                           <span v-if="
                                                   config.isNotice === 0
                                                   && item3.isRead === false
                                                   && ((
                                                       ((item3.maturityDate[8]+item3.maturityDate[9]) < today)
                                                       && (item3.maturityDate[5]+item3.maturityDate[6]) <= thismonth
                                                       && (item3.maturityDate[0]+item3.maturityDate[1]+item3.maturityDate[2]+item3.maturityDate[3]) <= thisyear
                                                   ) || (item3.maturityDate[0]+item3.maturityDate[1]+item3.maturityDate[2]+item3.maturityDate[3]) < thisyear )
                                                    " style="color: #FF6666">
                                                       已到期
                                           </span>

                                           <span v-if="(
                                                    config.isNotice === 1
                                                       &&( ((item3.maturityDate[8]+item3.maturityDate[9])-config.advanceDay == today ) || (item3.maturityDate[8]+item3.maturityDate[9]) == today)
                                                       && (item3.maturityDate[5]+item3.maturityDate[6])== thismonth
                                                       && (item3.maturityDate[0]+item3.maturityDate[1]+item3.maturityDate[2]+item3.maturityDate[3]) == thisyear
                                                       && item3.isRead === false
                                                       && item3.isNotice === false
                                                   )
                                                   "
                                                         style="font-weight: 700">
                                                       今天通知
                                           </span>
                                            <span v-if="(
                                           config.isNotice === 0
                                                       && (item3.maturityDate[8]+item3.maturityDate[9]) == today
                                                       && (item3.maturityDate[5]+item3.maturityDate[6])== thismonth
                                                       && (item3.maturityDate[0]+item3.maturityDate[1]+item3.maturityDate[2]+item3.maturityDate[3]) == thisyear
                                                       && item3.isRead === false
                                                       && item3.isNotice === false
                                                   )
                                                   "
                                                         style="font-weight: 700">
                                                       今天通知
                                           </span>
                                        </van-col>
                                    </van-row>
                                </div>

                            </div>

                        </div>
                    </van-tab>
                </van-tabs>
            </div>
            <div class="c-dowm" @click="downMenuShow">
                <span class="fonticon">
                    <van-icon name="arrow-down" />
                </span>
            </div>
        </div>

        <div v-else>
            <div class="list" >
                <div v-if="SearchList[0]">
                    <div v-for="(item,index) in SearchList "  :key="index">
                        <div v-if="item.maturityDate || item.stuName" class="box">
                            <div  @click="push(item.stuId)">
                                <div style="line-height: 0.16rem">
                                    <van-row class="Stu_box">
                                        <van-col span="5">
                                            <span style="font-weight: 700;font-size: 0.16rem">{{item.stuName}}</span>
                                        </van-col>
                                        <van-col span="5" >
                                            {{item.gradeName}}
                                        </van-col>
                                        <van-col span="12" >
                                            {{item.className}}
                                        </van-col>
                                    </van-row>
                                </div>

                                <div style="line-height: 0.16rem" v-if="item.maturityDate">
                                    最近一次缴费时间：{{item.maturityDate}}
                                    <span style="float: right">  &#9658; </span>
                                </div>
                                <div style="line-height: 0.16rem" v-else>
                                    最近一次缴费时间：无数据
                                    <span style="float: right"> &#9658; </span>
                                </div>

                                <div v-if="item.maturityDate &&
                                    isNotice === 0
                                    && item.isRead === false
                                     && (
                                     (   (item.maturityDate[8]+item.maturityDate[9]) > today
                                        && (item.maturityDate[5]+item.maturityDate[6]) >= thismonth
                                        && (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) >= thisyear
                                     )
                                      || (  (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) > thisyear)
                                    )
                                   "
                                     style="padding: 0.1rem 0">
                                    {{item.laveDay}}天后通知家长
                                </div>

                                <div v-if="item.maturityDate &&
                                    config.isNotice === 1
                                    && item.isRead === false
                                    && (
                                     (  (item.maturityDate[8]+item.maturityDate[9]) > today
                                        && (item.maturityDate[5]+item.maturityDate[6]) >= thismonth
                                        && (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) >= thisyear
                                     )
                                        || (  (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) > thisyear)
                                    )
                                    "
                                     style="padding: 0.1rem 0">
                                    {{item.laveDay}}天后通知家长
                                </div>

                                <div v-if="item.isRead === true" style="padding: 0.1rem 0;color: #6699CC">
                                   家长已阅
                                </div>

                                <div v-if="item.isRead === false
                                && item.maturityDate
                                && (
                                 (     (item.maturityDate[8]+item.maturityDate[9]) < today
                                    && (item.maturityDate[5]+item.maturityDate[6]) <= thismonth
                                    && (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) <= thisyear
                                 )  || (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) < thisyear
                                )
                              " style="padding: 0.1rem 0;color: #FF6666">
                                    已过期
                                </div>

                                <div
                                v-if="isNotice === 1
                                && item.maturityDate
                                && item.laveDay === 0
                                && item.isRead === false
                                && (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) >= thisyear"
                                style="padding: 0.1rem 0;font-weight: 700 ">
                                    今日通知
                                </div>

                                <div
                                v-if="isNotice === 0
                                && item.maturityDate
                                && (item.maturityDate[8]+item.maturityDate[9]) == today
                                && item.laveDay === 0 "
                                style="padding: 0.1rem 0;font-weight: 700 ">
                                    今日到期
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div v-else style="text-align: center;font-size: 0.16rem;line-height: 0.6rem;padding: 0.15rem">
                    没有查询到姓名为" <span style="font-weight: 700">{{valueSE}}</span> "的学生
                </div>

            </div>
        </div>

        <div v-if="noneMes" style="font-size: 0.15rem;border: solid 2px">
            查无此人
        </div>

        <van-actionsheet
                v-model="getB"
                cancel-text="取消"
                :actions="classList"
                @select="onSelect"
                @cancel="onCancel(currentDate)"
                :showConfirmButton=false
        />


    </div>
    </div>

</template>

<script>
    import { NavBar,Icon, Tab, Tabs,Actionsheet,Row, Col, Button,Toast,Switch,Checkbox, CheckboxGroup,DatetimePicker,Search   } from "vant";
    import { mapState } from "vuex";
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
            [Row.name]: Row,
            [Search.name]: Search,
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
                minDate: new Date(),
                setTime:false,
                SetDays:false,
                showSetDays:false,
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
                changemonth:false,
                Tyear:new Date().getFullYear(),
                Tmonth:new Date().getMonth()+1,

                today:new Date().getDate(),
                thismonth:new Date().getMonth()+1,
                thisyear:new Date().getFullYear(),

            };
        },
        methods: {
            // 隐藏信息
            hide(index,index2){
                document.getElementById("mes"+index+index2).style.display='none'
                document.getElementById("btn"+index+index2).style.display='none'
                document.getElementById("Sbtn"+index+index2).style.display='block'

            },
            showMes(index,index2){
                document.getElementById("Sbtn"+index+index2).style.display='none'
                document.getElementById("btn"+index+index2).style.display='block'
                document.getElementById("mes"+index+index2).style.display='block'

            },
            // 切换月份
            otherMonth(type){
                if(type === 1){
                    this.changemonth = true
                    this.month-=1
                    if(this.month === 0){
                        this.year -=1
                        this.month = 12
                    }
                }else if(type === 2){
                    this.month +=1
                    if(this.month===13){
                        this.month = 1
                        this.year += 1
                    }
                }
                if(this.year === this.Tyear && this.month === this.Tmonth){
                    this.changemonth = false
                }

                this.date = this.year
                    +"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))
                console.log(this.date)
                this.GetStuList()
            },
            onClickLeft(){
                this.$router.back()
            },
            // 搜索跳转
            onSearch(){
                if(this.stopSearch === 0){
                    this.stopSearch = 1
                    this.GetStuList()
                }
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
            GetStuList(){
                this.$loading();
                PaymentHistory(this.date,this.value)
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            if(this.value.length === 0 || this.value===''){
                                this.classList =  []
                                this.config = res.data.data.config
                                this.isNotice = res.data.data.config.isNotice
                                for (let item of res.data.data.clsStu) {
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
                                for(let i =0;i<this.clsStuList.length;i++){
                                    this.testlist[i] = []
                                }
                                this.ClaIndex = 0
                                this.ClaStuId = []
                                for (let item of this.clsStuList[0].id) {
                                    this.ClaStuId.push(item.stuId);
                                }
                                    this.Showsearch = true
                            }else{
                                this.SearchList = res.data.data
                                this.Showsearch = false
                            }
                            this.valueSE = this.value
                            this.stopSearch = 0
                        }
                    }).catch(() => {
                    throw new Error("历史记录获取异常!")
                })
            },
            push(id){
                this.$router.push({name:'StudentDetails',params:{id:id}})
            },
            // 复选框
            test(index,id,index2,type){
                if(type === 1) {
                    this.checked = false
                    this.testlist[index].push(id)
                    document.getElementById("allchoice1"+index+index2).style.display = 'none'
                    document.getElementById("allchoice2"+index+index2).style.display = 'block'
                    this.checked2 = true
                }else if(type === 2){
                    this.banji(0)
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
                if(this.testlist[index].length === this.ClaStuId.length){
                    this.checked = true
                }
                console.log(this.testlist)
            },
            // 全选
            ChoiceAll(index){
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
            },
            downMenuShow() {
                this.$store.commit("getShow");
            },
            // 点击班级
            banji(index) {
                console.log(index)
                this.ClaIndex = index
                this.ClaStuId = []
                for (let item of this.clsStuList[index].id) {
                    this.ClaStuId.push(item.stuId);
                }
                console.log(this.ClaStuId)
                if(this.testlist[index].length === this.ClaStuId.length && this.ClaStuId.length != 0){
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
                    }
                }
                this.$emit("classGrade", { id: item.id,active:this.active });
            },
        },
        mounted(){
            // 今日日期
            console.log(this.today)
            this.today = ((this.today) < 10 ? '0' + (this.today) : (this.today))

            this.date = this.year
                +"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))

            this.GetStuList()
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
        padding: 0.15rem;
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
    .setTimebox/deep/.van-dialog .van-button{
        display: none;
    }
    .box{
        padding: 0.15rem;
        border-bottom: solid 1px #CCCCCC;
    }

</style>
