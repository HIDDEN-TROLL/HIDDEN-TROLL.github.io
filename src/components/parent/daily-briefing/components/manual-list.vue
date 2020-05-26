<template>
    <div class="body">
    <div class="cl-list" v-if="classList && classList.length>0" >
        <div class="list">
            <van-tabs v-model="active" title-active-color="#3770FB" color="#3770FB" @click="banji">
                <van-tab v-for="(item,index) in classList " :title="item.name" :key="index">
                    <div style="overflow:scroll;height: 2.4rem;margin: 0.1rem ">
                        <div   v-if="item.stuList.unSends.length === 0">
                            <div style="line-height: 2.4rem;text-align: center">此班级暂无可点评学生</div>
                        </div>
                        <div v-else>
                                <van-row>
                                    <div class="fam_list" v-for="(item2,indexse) in item.stuList.unSends" :key="indexse">
                                            <van-col span="8">
                                                <div :id="'box'+index+indexse"
                                                     class="fam_box" @click="showcombox(item2.studentComment,item2.stuId,index,indexse)"
                                                     v-if="item2.studentComment===null || item2.studentComment===''"
                                                    :class="{changebackground:changebackground}"
                                                >
                                                    <div id="Fchange" style=" padding: 0.1rem 0;">
                                                      <span style="font-weight: 700">{{item2.stuName}}</span>
                                                      <br>{{item2.gradeName}}
                                                  </div>
                                                </div>

                                                <div :id="'box'+index+indexse" class="fam_box_value"
                                                     @click="showcombox(item2.studentComment,item2.stuId,index,indexse)"
                                                     v-else
                                                     :class="{changebackground:changebackground}"
                                                >
                                                    <div id="Schange" style=" padding:0.1rem 0 0 0;">
                                                        <span style="font-weight: 700">{{item2.stuName}}</span>
                                                        <br>{{item2.gradeName}}
                                                        <div class="showcom"></div>
                                                    </div>
                                                </div>
                                            </van-col>
                                    </div>
                                </van-row>
                        </div>
                    </div>

                    <div class="ac_line" :class="{ac_line_height:ac_line_height}"></div>

                    <div style="margin-bottom: 0.5rem;">
                        <div style="margin: 0.15rem 0.15rem 0.1rem 0.15rem;">
                            <van-row>
                                <van-col span="5">&nbsp;</van-col>
                                <van-col span="14" style="text-align: center;font-weight: 700">本周已点评学生</van-col>
                                <van-col span="5" style="color: #6699FF" > <span v-on:click="showPar = !showPar" v-if="showPar" >&#9650; 收起</span></van-col>
                                <van-col span="5" style="color: #FF6666" > <span v-on:click="showPar = true" v-if="!showPar" >&#9660; 展开</span></van-col>
                            </van-row>
                        </div>
                        <transition name="fade">
                            <van-row v-if="showPar">
                                <van-col span="6" class="Stu_box" v-for="(item,index) in item.stuList.sends" :key="index">
                                    <div class="Stu_list" @click="ShowComment(item.reads,item.studentComment,item.userName,item.time,item.stuId,item.timeSrc)">{{item.stuName}}<br>{{item.gradeName}}</div>
                                </van-col>
                            </van-row>
                        </transition>
                    </div>

                </van-tab>
            </van-tabs>

            <div style="text-align: center" id="com_box" :class="{showcomboxcss:showcomboxcss}">
                <textarea  v-model="newcom" @click="inputIdFun" @blur="inputFunction(newcom,stuId)"></textarea>
            </div>

        </div>
        <div class="c-dowm" @click="downMenuShow">
            <span class="fonticon">
                <van-icon name="arrow-down" />
            </span>
        </div>

        <Footer :event-arr="arr" v-on:commenEvent="parent"></Footer>
<!--班级选择列表弹窗-->
        <van-actionsheet
                v-model="getB"
                cancel-text="取消"
                :actions="classList"
                @select="onSelect"
                @cancel="onCancel"
        />
<!--本周已点评学生弹窗-->
        <van-dialog
                v-model="show"
                :show-confirm-button="false"
                :show-cancel-button="false"
                :closeOnClickOverlay="true"
                style="padding: 0.15rem"
        >
            <div style="font-size: 0.14rem">
                <div style="padding: 0.1rem 0.1rem 0.15rem 0.1rem;border-bottom: solid 1px #CCCCCC">
                    <van-row>
                        <van-col span="4" style="color: #6699FF" > <span @click="changedate(1)">上一篇</span></van-col>
                        <van-col span="16" style="text-align: center">点评时间:{{DialogShowTime}}</van-col>
                        <van-col span="4" style="color: #6699FF;text-align: right" ><span  @click="changedate(2)" v-if="showright">下一篇</span></van-col>
                    </van-row>
                </div>
                <div style="overflow:scroll;">
                    <div style="width: 7rem" v-if="DialogParent.length===0">
                        <div class="show_com_fam" >
                            <div  style="line-height: 0.4rem;color: red;" ><span>没有为该学生绑定家长</span></div>
                        </div>
                    </div>
                    <div style="width: 7rem">
                        <div class="show_com_fam" v-for="(item,index) in DialogParent" :key="index">{{item.parent}}<br>
                            <span v-if="item.isRead === 0" style="color: #FF6666">未阅</span>
                            <span v-else style="color: #6699FF">已阅</span>
                        </div>
                    </div>
                </div>
                <div style="line-height: 0.2rem">{{DialogComment}}</div>
                <div style="text-align: right;line-height: 0.3rem;font-weight: 700">-{{DialogName}}点评</div>
            </div>
        </van-dialog>
<!--        确认推送弹窗-->
        <van-dialog
                v-model="change"
                title="确认提交"
                show-cancel-button
                @confirm="Send()"
        >
            <div class="change_text">
                <div>
                    本次点评共
                    &nbsp;&nbsp;<span style="color: #6699FF">{{number.length}}</span>&nbsp;&nbsp;
                    位学生，提交后不可修改，是否确定？<br>
                </div>

            </div>
        </van-dialog>
    </div>
    </div>

</template>

<script>
    import { Icon, Tab, Tabs,Actionsheet,Row, Col, Button,Toast,Dialog} from "vant";
    // 更新点评
    import { SendComment } from '@/api/parent/briefing';
    // 推送周报
    import { SendBriefing } from '@/api/parent/briefing';
    // 获取学生单篇评价
    import {GetSends} from '@/api/parent/briefing';
    //  每周简报-获取教师每周学生评价列表（手动推送）
    import { StuList } from '@/api/parent/briefing';
    import Footer from '../../../common/footer-operate-btn'
    import { mapState } from "vuex";
    export default {
        name: "clas-title-list",
        components: {
            [Icon.name]: Icon,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [Col.name]: Col,
            [Toast.name]: Toast,
            [Button.name]: Button,
            [Actionsheet.name]:Actionsheet,
            [Dialog.name]:Dialog,
            Footer:Footer

            /*DownMenu: DownMenu*/
        },
        data() {
            return {
                newcom:'',
                stuId:'',

                showPar:true,
                show: false,
                msg:{value:[],id:[]},
                active: 0,
                question:'',
                test:[],
                SendComList:[{
                    question:'',
                    id:''
                }],

                questionlist:[],
                idlist:[],
                index:[],
                arr:[{title:'提交',type:1}],

                valuelist:[],
                stuidlist:[],

                enter:false,
                change: false,

                // 班级学生列表
                classNameList:[],
                classList:[],
                Sundlist:[],
                number:'',

                Sendslist:[],

                // 底部弹窗及已点评学生信息
                DialogName:'',
                DialogTime:'',
                DialogComment:'',
                DialogId:'',
                DialogShowTime:'',
                DialogParent:[],
                showright:false,

                DialogMes:[],

                comlist:[],
                curtainsDown:true,
                curtainsUp:false,

                // 时间参数
                year:'',
                week:'',
                date:'',
                maxweek:'',
                stop:true,

                // 选中班级学生时候的效果
                changebackground:true,
                showcomboxcss:false,
                ac_line_height:false,

                Classindex:'',

                StuVal:'',
                StuOval:'',

                classIndexVal:'',
                classIndexOVal:'',

                // 阻止冒泡（二次点击,学生选择）
                StopClick:true,
                // 选择过学生后选择班级取消选择样式
                boxcss:false,
                Cboxcss:false,
                // 当前选择班级id
                ClsStuIndex:0,
                // 当前选择学生id
                Stuindex:'',
                // 当点击评语框时取当前的各id更新评语
                inputId:'',
                inputIndex:'',
                inputClsStuIndex:'',

            };
        },
        methods: {
            // 选择学生效果
            showcombox(comment,stuId,index,indexse){
                if(this.StopClick === true){
                    // 输入框及边框隔离显示
                    this.changebackground = true
                    this.ac_line_height = true
                    document.getElementById('com_box').style.display = "block"
                    this.newcom = comment
                    this.stuId = stuId
                    this.Classindex = index
                    this.Stuindex = indexse
                    // 选择学生时的样式
                    let timer = setTimeout(()=>{
                        document.getElementById("box"+this.Classindex+indexse).style.backgroundColor = "#3770fb"
                        document.getElementById("box"+this.Classindex+indexse).style.color = "white"
                        if(this.Cboxcss === true){
                                document.getElementById("box"+index+this.StuOval).style.backgroundColor = "white"
                                document.getElementById("box"+index+this.StuOval).style.color = "#3770fb"
                        }
                        this.boxcss = true
                        this.Cboxcss = true
                    },100)
                }
            },
            // 获取点评列表(上一篇/下一篇)
            changedate(type){
                this.$loading('加载中',null,true)
                GetSends(this.DialogId,this.DialogTime,type)
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            if(res.data.data.length!=0 && type === 1){
                                this.DialogMes = res.data.data;
                                this.DialogTime = res.data.data.time
                                this.DialogShowTime = res.data.data.timeSrc
                                this.DialogName = res.data.data.userName
                                this.DialogParent = res.data.data.reads
                                this.DialogComment = res.data.data.studentComment
                                this.maxweek -=1
                                if(this.maxweek<this.week){
                                    this.showright = true
                                }
                            }else if(res.data.data.length!=0 && type === 2){
                                this.DialogMes = res.data.data;
                                this.DialogTime = res.data.data.time
                                this.DialogShowTime = res.data.data.timeSrc
                                this.DialogName = res.data.data.userName
                                this.DialogParent = res.data.data.reads
                                this.DialogComment = res.data.data.studentComment
                                this.maxweek +=1
                                if(this.maxweek===this.week){
                                    this.showright = false
                                }
                            }else{
                                Toast.fail("没有数据！")
                            }
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            // 提交提示学生数量
            UnsendsList(classList){
                var Sundlist = []
                for (let item of classList) {
                    if (item.stuList) {
                        Sundlist.push({
                            unSends: item.stuList.unSends,
                        });
                    }
                }
                this.Sundlist = Sundlist
            },
            // 更新已输入点评
            inputIdFun(){
                this.inputId = this.stuId
                this.inputIndex = this.Stuindex
                this.inputClsStuIndex = this.ClsStuIndex
                console.log('点击',this.inputId)
            },
            inputFunction(newcomment,id){
                // this.$loading('加载中',null,true)
                // this.StopClick = false
                if(  newcomment!=undefined && newcomment!=null && id!=undefined && id!=null && id!='' ){
                    this.classList[this.inputClsStuIndex].stuList.unSends[this.inputIndex].studentComment = newcomment;
                    SendComment(this.inputId,newcomment)
                        .then(res=>{
                            if (res.status === 200){
                                let timer = setTimeout(()=>{
                                    // this.$loadingHide();
                                    // console.log(this.classList[this.ClsStuIndex])
                                    this.StopClick = true
                                    clearTimeout(timer);
                                },1500)
                            }else {
                                Toast.fail("修改评语失败！")
                            }
                        }).catch(() => {
                        throw new Error("修改评语失败!")
                    })
                }
            },
            // 获取页面数据
            GetStuList(){
                this.$loading()
                StuList()
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            // this.clsStu = res.data.data.clsStu;
                            this.date = res.data.data.date
                            this.year  = res.data.data.year
                            this.week =  res.data.data.week
                            this.maxweek = res.data.data.week
                            var classList  = []
                            for (let item of res.data.data.clsStu) {
                                if (item.clsId) {
                                    classList.push({
                                        id: item.clsId,
                                        name: item.clsName,
                                        stuList: item.stuList
                                    });
                                }
                            }
                            this.classList = classList
                            this.UnsendsList(this.classList)
                            this.$emit('func',this.date,this.year,this.week)
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            // 确认推送周报
            Send(){
                if(this.stop === true){
                    this.$loading('加载中',null,true)
                        let timer = setTimeout(()=>{
                            clearTimeout(timer);
                                SendBriefing()
                                    .then(res=>{
                                        if (res.status === 200){
                                                    this.$loadingHide();
                                                Toast.success("提交成功！")
                                                        let timer = setTimeout(()=>{
                                                            this.$router.go(0)
                                                        },3000)
                                        }else {
                                            Toast.fail("手动提交评语失败！")
                                        }
                                    }).catch(() => {
                                    throw new Error("手动提交评语异常!")
                                })
                        },3000)
                    this.change = false
                }
                this.stop = false
            },
            // 加载已点评学生弹窗数据
            ShowComment(parent,comment,teacher,time,id,showtime){
                this.show = true
                // 弹窗信息
                this.DialogTime = time
                this.DialogComment = comment
                this.DialogName = teacher
                this.DialogParent = parent
                this.DialogId = id
                this.DialogShowTime = showtime
            },
            // 确认推送简报？（弹窗）
            parent(){
                this.$loading('加载中',null,true)
                let timer = setTimeout(()=>{
                    this.$loadingHide();
                    if(this.stop === true){
                        var unlist = []
                        for(var i=0;i<this.Sundlist.length;i++){
                            for (let item of this.Sundlist[i].unSends) {
                                if (item.studentComment) {
                                    unlist.push({
                                        studentComment: item.studentComment,
                                    });
                                }
                            }
                        }
                        this.number  = unlist
                        if(this.number!=0){
                            this.change = true
                        }else{
                            Toast.fail("没有进行点评")
                        }
                    }
                },4000)
            },
            // 点击班级
            banji(index) {
                this.ClsStuIndex = index
                let id = this.classList[index].id;
                let name = this.classList[index].name;
                this.$emit("classGrade", {id:id,active:index,name:name});
                this.ac_line_height = false
                if(this.boxcss === true){
                    document.getElementById('com_box').style.display = "none"
                    document.getElementById("box"+this.Classindex+this.Stuindex).style.backgroundColor = "white"
                    document.getElementById("box"+this.Classindex+this.Stuindex).style.color = "blue"
                }
            },
            downMenuShow() {
                this.$store.commit("getShow");
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
            }

        },
        mounted(){
            this.GetStuList()
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
        },
        watch: {
            Stuindex: function (StuVal,StuOval) {
                    this.StuVal = StuVal
                    this.StuOval = StuOval
                if(StuOval === ''){
                    StuVal = this.Stuindex
                    StuOval = this.Stuindex
                }
            },
            Classindex: function (classIndexVal,classIndexOval) {
                    this.classIndexVal = classIndexVal
                    this.classIndexOVal = classIndexOval
                if(classIndexOval === ''){
                    classIndexVal = this.Classindex
                    classIndexOval = this.Classindex
                }
            },
        }
    };
</script>

<style scoped lang="less">
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
        /* float: left; */
        text-align: center;
        border: solid 1px;
        margin: 0.1rem;
        border-radius: 20%;
        color:#3770fb
    }
    .fam_box_value{
        /* float: left; */
        text-align: center;
        border: solid 1px rgb(55, 112, 251);
        color: rgb(55, 112, 251);
        box-shadow:0 0 12px rgb(55, 112, 251);
        margin: 0.1rem;
        border-radius: 20%;
    }
    /*.fam_box{*/
    /*    padding: 0.25rem 0;*/
    /*    text-align: center;*/
    /*    !*float: left;*!*/
    /*}*/

    /*.fam_list{*/
    /*    border-top: solid 1px #CCCCCC;*/
    /*}*/
    .fam_list{
        /*border-top: solid 1px #CCCCCC;*/
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
    .ac_line{
        height: 0.1rem;
        background: #F3F7F8;
    }
    .Stu_list{
        border: solid 1px;
        text-align: center;
        border-radius: 8px;
    }
    .Stu_box{
        margin: 0.1rem 0.15rem;
    }
    .show_com_fam{
        float: left;
        text-align: center;
        margin: 0.15rem 0.1rem;
    }
    .change_text{
        font-size: 0.14rem;
        line-height: 0.3rem;
        padding: 0.15rem;
    }
    .curtains{
        display: none;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    #comment_box{
        margin: 0.15rem  0;
        border: solid 1px;
        width: 90%;
        border-radius: 10px;
        height: 0.6rem;
    }
    .testclass{

    }
    .not_bind{
        margin: 0.15rem ;
        line-height: 0.6rem;
        color: red;
    }

    #com_box{
        display: none;
        text-align: center;
        border-radius: 20px;
        position: absolute;
        top: 4.05rem;
        width: 90%;
        left: 5%;
    } #com_box textarea{
        width: 85%;
        padding: 0.1rem;
        height: 1.2rem;
        margin: 0.1rem;
        border-radius: 20px;
    }
    .changebackground{
        background:white
    }
    .showcomboxcss{
        display: block;
    }
    .ac_line_height{
        margin-top: 1.8rem;
    }
    .showcom{
        width: 0.1rem;
        height: 0.1rem;
        background: red;
        position: relative;
        top: -0.42rem;
        left: 0.82rem;
        border-radius: 8px;
    }
</style>
