<template>
    <div>
        <div @click="playVid()">
            <audio src="" id="media-audio"   @click="playVid()"></audio>
        </div>
        <div id="startface">
            <div class="changelist_box">
                <!--                <div style="width:0.8rem;text-align: center;position: absolute;top: 0.1rem;right: 0.3rem" >-->
                <!--                    <div style="text-align:center;margin:0 auto;width: 0.25rem;font-size:0.15rem;height: 0.25rem;color: white;background: #666666;border-radius: 50%;font-weight: 700;line-height: 0.25rem">?</div>-->
                <!--                    <div>作业流程</div>-->
                <div class="changelist" @click="showlist()">
                    作业流程
                </div>
                <!--                </div>-->
            </div>
            <div style="height: 0.5rem">
            </div>
            <div class="title_se" v-if="Titletop.length !==0 &&  Titletop.title.length>7" > {{Titletop.title}} </div>
            <div class="title" v-else> {{Titletop.title}} </div>
            <div class="time">{{Titletop.time}} 分钟</div>
            <div style="text-align: center;">
                <van-circle
                        v-model="currentRate"
                        :rate="number"
                        :speed="750"
                        :text="text"
                        size="2rem"
                        color="#706666"
                />
            </div>
            <div style="height: 0.2rem;font-size: 0.12rem"> &nbsp;</div>
            <div style="text-align: center;line-height: 0.2rem;font-weight: 700; color: #484444;opacity:0.7;margin: 0 0.6rem;height: 1.5rem">
                <div>{{Titletop.desc}}</div>
            </div>
            <!--            <div style="height: 1rem"></div>-->
            <div style="line-height: 0.4rem;border: solid 2px #3b1616 ;width: 1rem;text-align: center;margin: 0 auto;font-weight: 700;color: #3b1616;opacity: 0.7;" >
                {{title}}
            </div>
        </div>
        <div id="listface">
            <div class="go-back" style="position: fixed;top: 0px;width: 100%">
                <van-nav-bar
                        title="作业流程"
                        left-text="返回"
                        left-arrow
                        @click-left="showtime()"
                />
            </div>
            <div style="margin-top: 46px;">
                <div v-for="(item,index) in list" :key="index">
                    <div>
                        <div class="listTitle">
                            <span style="font-size: 0.18rem;font-weight: 700">{{item.title}}</span>
                            <span style="border: solid 1px;padding: 0 0.15rem;margin-left: 0.1rem">{{item.totalTime}}分钟</span>
                            <span style="float:right;" @click="hidelist(index)" :id="'title'+index">收起详情↑</span>
                        </div>
                        <div style="line-height: 0.25rem" :id="'list'+index">
                            <div v-for="(itemse,indexse) in item.list" :key="indexse" style="padding:  0.1rem 0.15rem;border-bottom: solid 1px #F3F7F8">
                                <div style="border-left:solid 0.05rem #6699FF;padding-left: 0.15rem" :id="'Loading'+index+indexse">
                                    {{itemse.title}}
                                    <span :id="'nowloading'+index+indexse"  class="hide">（当前进行中）</span>
                                    <span style="float: right">{{itemse.time}}分钟</span>
                                </div>
                                <div style="margin: 0.05rem 0 0.05rem 0.15rem">{{itemse.desc}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="ac_line" :id="'acline'+index"></div>
                </div>
            </div>
        </div>
        <div id="end">
            今日作业流程已结束
            <div style="line-height: 0.4rem;font-size: 0.13rem;margin: 0 0.7rem">
                <div><span style="float:left;" @click="ShowStart()">返回介绍页面 </span>
                    <span style="float:right;" @click="RouterBack()">返回首页</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { NavBar, Field, Uploader, Icon, Toast, ImagePreview,Row, Col } from 'vant';
    import { getHomeworkProcess } from '@/api/teacher/homework'
    import { getHomeworkProcessTime } from '@/api/teacher/homework'

    import { Circle } from 'vant';
    export default {
        name: "start-homework",
        titile:'作业流程',
        components: {
            [Circle.name]: Circle,
            [NavBar.name]: NavBar,
        },
        data() {
            return {
                muted:true,
                rate:10,
                currentRate: 0,
                int:'',
                number:0,
                minute:0,
                seconds:0,
                Fseconds:0,
                Sseconds:0,
                type:1,
                startring:0,

                list:[],
                time:'',
                // startTime:Date.now()*0.001-200,
                startTime:Date.now()*0.001-4400,
                endTime:1574212457,

                Titletop:'',

                first:[],
                second:[],
                reList:[],
                third:[],
                fourth:[],
                SeThird:[],
                SeFourth:[],
                SeFiveth:[],
                ThFirst:[],

                title:'',
                firstTotalTime:'',

                secondTotalTime:'',
                thirdTotalTime:'',

                lastDate:'',
                testtime:0,

                firstTTime:0,
                secondTime:0,
                thirdTime:0,
                fourthTime:0,
                SeThirdTime:0,
                SeFourthTime:0,
                SeFivethTime:0,
                ThFirstTime:0,

                firstMin:0,
                secondMin:0,
                relaxMin:0,
                thirdMin:0,
                fourthMin:0,
                SeThirdMin:0,
                SeFourthMin:0,
                SeFivethMin:0,
                ThFirstMin:0,

                type0:true,
                type1:true,
                type2:true,

                closeTime:0,
                enterTime:0,

                testtype:0,
                BackTime:5,

                myVideo:'',
                // Ringsrc:require('../../../../assets/mp3/start-homeworkring.aac')

            };
        },
        computed: {
            // 计时器中心文本
            text() {
                if(this.testtime === 0){
                    return this.minute+":" + this.Sseconds
                }else{
                    return "已完成"
                }
            },
        },
        destroyed(){
        },
        created(){
            // 离开页面时刷新数据计时
            var hidden, visibilityChange;
            if (typeof document.hidden !== "undefined") {
                hidden = "hidden";
                visibilityChange = "visibilitychange";
            } else if (typeof document.mozHidden !== "undefined") {
                hidden = "mozHidden";
                visibilityChange = "mozvisibilitychange";
            } else if (typeof document.msHidden !== "undefined") {
                hidden = "msHidden";
                visibilityChange = "msvisibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
                hidden = "webkitHidden";
                visibilityChange = "webkitvisibilitychange";
            }
            document.addEventListener(visibilityChange, function() {
                // alert("当前页面是否被隐藏：" + document[hidden] );
                if(document[hidden] === true){
                    location.reload()
                }
            }, false);
        },
        mounted() {
            this.myVideo = document.getElementById("media-audio");
            // 获取数据/页面未显示时
            this.getHomeworkProcessTimeFun()
            this.getHomeworkProcessFun()
        },
        methods:{
            // 返回页面介绍
            ShowStart(){
                document.getElementById('startface').style.display = "block"
                document.getElementById('listface').style.display = "none"
                document.getElementById('end').style.display = "none"
                this.number=100
                this.title = this.thirdTotalTime
                this.Titletop = this.ThFirst
                this.testtime = 1
            },
            // 返回首页
            RouterBack(){
                this.$router.back()
            },
            // 展开/收缩
            hidelist(type){
                if(type === 0 && this.type0 === true){
                    this.type0 = false
                    document.getElementById('list0').style.display= "none"
                    document.getElementById('acline0').style.display= "none"
                    document.getElementById('title0').innerText = '展开详情↓'
                }else if(type === 0 && this.type0 === false){
                    this.type0 = true
                    document.getElementById('list0').style.display= "block"
                    document.getElementById('acline0').style.display= "block"
                    document.getElementById('title0').innerText = '收起详情↑'
                }
                if(type === 1 && this.type1 === true){
                    this.type1 = false
                    document.getElementById('list1').style.display= "none"
                    document.getElementById('title1').innerText = '展开详情↓'
                    document.getElementById('acline1').style.display= "none"

                }else if(type === 1 && this.type1 === false){
                    this.type1 = true
                    document.getElementById('list1').style.display= "block"
                    document.getElementById('title1').innerText = '收起详情↑'
                    document.getElementById('acline1').style.display= "block"
                }
                if(type === 2 && this.type2 === true){
                    this.type2 = false
                    document.getElementById('list2').style.display= "none"
                    document.getElementById('title2').innerText = '展开详情↓'
                    document.getElementById('acline2').style.display= "none"
                }else if(type === 2 && this.type2 === false){
                    this.type2 = true
                    document.getElementById('list2').style.display= "block"
                    document.getElementById('title2').innerText = '收起详情↑'
                    document.getElementById('acline2').style.display= "block"
                }
            },
            //1分钟休息时间
            relax() {
                if(this.type === 3){
                    document.getElementById('nowloading01').style.color = "white"
                    document.getElementById('Loading01').style.fontWeight = "400"
                    document.getElementById('nowloading02').style.color = "black"
                    document.getElementById('Loading02').style.fontWeight = "700"
                } if(this.type === 5){
                    document.getElementById('nowloading10').style.color = "white"
                    document.getElementById('Loading10').style.fontWeight = "400"
                    document.getElementById('nowloading11').style.color = "black"
                    document.getElementById('Loading11').style.fontWeight = "700"
                }if(this.type === 7){
                    document.getElementById('nowloading12').style.color = "white"
                    document.getElementById('Loading12').style.fontWeight = "400"
                    document.getElementById('nowloading13').style.color = "black"
                    document.getElementById('Loading13').style.fontWeight = "700"
                }if(this.type === 11){
                    document.getElementById('nowloading16').style.color = "white"
                    document.getElementById('Loading16').style.fontWeight = "400"
                    document.getElementById('nowloading17').style.color = "black"
                    document.getElementById('Loading17').style.fontWeight = "700"
                }
                    let addnumber = 100/(this.relaxMin*60)
                    if(this.number < 100 ){
                        this.title = '休息时间'
                        // this.Titletop = {title:'休息时间'}
                        this.Titletop = this.reList
                        let timerl = setTimeout(()=>{
                            this.seconds+=1
                            this.Fseconds = this.seconds
                            this.Sseconds = this.seconds
                            this.number= addnumber*this.Fseconds
                            if(this.seconds >= 60){
                                this.Sseconds = this.seconds % 60
                                this.minute = parseInt(this.seconds/60)
                            }
                            this.relax()
                        },1000)
                    }else{
                        this.minute = 0
                        this.seconds = 0
                        this.number =0
                        this.type +=1
                        this.playVid()
                        let timerl = setTimeout(()=>{
                            if(this.type === 4){
                                document.getElementById('nowloading02').style.color = "white"
                                document.getElementById('Loading02').style.fontWeight = "400"
                                this.Selist()
                            }if(this.type === 6){
                                document.getElementById('nowloading11').style.color = "white"
                                document.getElementById('Loading11').style.fontWeight = "400"
                                this.SeSelist()
                            }if(this.type === 8){
                                document.getElementById('nowloading13').style.color = "white"
                                document.getElementById('Loading13').style.fontWeight = "400"
                                this.SeThirdlist()
                            } if(this.type === 10){
                                document.getElementById('nowloading15').style.color = "white"
                                document.getElementById('Loading15').style.fontWeight = "400"
                                this.SeFourthist()
                            }if(this.type === 12){
                                document.getElementById('nowloading17').style.color = "white"
                                document.getElementById('Loading17').style.fontWeight = "400"
                                this.ThFirstlist()
                            }
                        },1000)
                    }
            },
            // 播放铃声
            playVid() {
                this.myVideo.src = 'http://beta.app.api.top910.com/top910/attachment/voice/start-homeworkring.wav'
                document.getElementById("media-audio").volume = 1;
                document.addEventListener("WeixinJSBridgeReady", function () {
                    this.myVideo.play();
                }, false);
                document.addEventListener('YixinJSBridgeReady', function() {
                    this.myVideo.play();
                }, false);
            this.myVideo.play();
                // this.myVideo.muted = false
            },
            // 右上作业流程按钮切换
            showlist(){
                document.getElementById("startface").style.zIndex = 1
                document.getElementById("listface").style.zIndex = 9999
                document.getElementById("listface").style.display = "block"
            },
            showtime(){
                document.getElementById("listface").style.zIndex = 1
                document.getElementById("startface").style.zIndex = 9999
                document.getElementById("listface").style.display = "none"
            },
            // 流程表
            // 获取数据
            getHomeworkProcessFun() {
                this.$loading();
                getHomeworkProcess()
                    .then(res => {
                        this.$loadingHide();

                        this.list = res.data.data
                        this.firstTotalTime = this.list[0].title
                        this.secondTotalTime = this.list[1].title
                        this.thirdTotalTime = this.list[2].title

                        this.first = this.list[0].list[0]
                        this.second = this.list[0].list[1]
                        this.reList = this.list[0].list[2]
                        this.third = this.list[1].list[0]
                        this.fourth = this.list[1].list[2]
                        this.SeThird = this.list[1].list[4]
                        this.SeFourth = this.list[1].list[5]
                        this.SeFiveth = this.list[1].list[6]
                        this.ThFirst= this.list[2].list[0]

                        this.firstTTime = 100/(this.list[0].list[0].time*60)
                        this.secondTime = 100/(this.list[0].list[1].time*60)
                        this.thirdTime = 100/(this.list[1].list[0].time*60)
                        this.fourthTime = 100/(this.list[1].list[2].time*60)
                        this.SeThirdTime = 100/(this.list[1].list[4].time*60)
                        this.SeFourthTime = 100/(this.list[1].list[5].time*60)
                        this.SeFivethTime = 100/(this.list[1].list[6].time*60)
                        this.ThFirstTime = 100/(this.list[2].list[0].time*60)

                        this.firstMin = this.list[0].list[0].time
                        this.secondMin = this.list[0].list[1].time
                        this.relaxMin = this.list[0].list[2].time
                        this.thirdMin = this.list[1].list[0].time
                        this.fourthMin = this.list[1].list[2].time
                        this.SeThirdMin = this.list[1].list[4].time
                        this.SeFourthMin =this.list[1].list[5].time
                        this.SeFivethMin =this.list[1].list[6].time
                        this.ThFirstMin = this.list[2].list[0].time

                        let timerl = setTimeout(()=>{
                            let timerl = setTimeout(()=>{
                                console.log("现在时间"+parseInt(Date.now()*0.001))
                                console.log("已经开始"+parseInt((Date.now()*0.001 - this.startTime)) +"秒")
                                console.log("已经开始"+parseInt((Date.now()*0.001 - this.startTime)/60) +"分钟")
                                let TimeDifference = (Date.now()*0.001 - this.startTime)/60
                                console.log("已经过了"+TimeDifference+"分钟")
                                console.log(parseInt(Date.now()*0.001))
                                if(TimeDifference<this.firstMin ){
                                    this.type = 1
                                    this.Firstlist()
                                    this.seconds = parseInt((TimeDifference)*60)
                                    console.log("可签热身")
                                }else if(TimeDifference<(this.firstMin+this.secondMin) &&
                                    TimeDifference>(this.firstMin)){
                                    this.type = 2
                                    this.title = this.firstTotalTime
                                    this.seconds = parseInt((TimeDifference-this.firstMin)*60)
                                    this.FirSelist()
                                    console.log("习惯培养")
                                }else if(TimeDifference<(this.firstMin+this.secondMin+this.relaxMin) &&
                                    TimeDifference>(this.firstMin+this.secondMin)){
                                    this.type = 3
                                    this.seconds = parseInt((TimeDifference-this.firstMin-this.secondMin)*60)
                                    this.relax()
                                    console.log("休息时间")
                                }else if(TimeDifference<(this.firstMin+this.secondMin+this.thirdMin+this.relaxMin) &&
                                    TimeDifference>(this.firstMin+this.secondMin+this.relaxMin)){
                                    this.type = 4
                                    this.title = this.secondTotalTime
                                    this.seconds = parseInt((TimeDifference-this.firstMin-this.secondMin-this.relaxMin)*60)
                                    this.Selist()
                                    console.log("复习巩固与摘录错题")
                                }else if(TimeDifference<(this.firstMin+this.secondMin+this.relaxMin*2+this.thirdMin) &&
                                    TimeDifference>(this.firstMin+this.secondMin+this.thirdMin+this.relaxMin)){
                                    this.type = 5
                                    this.seconds = parseInt((TimeDifference-this.firstMin-this.secondMin-this.relaxMin-this.thirdMin)*60)
                                    this.relax()
                                    console.log("休息时间2")
                                }else if(TimeDifference<(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.relaxMin*2) &&
                                    TimeDifference>(this.firstMin+this.secondMin+this.thirdMin+this.relaxMin*2)){
                                    this.type = 6
                                    this.title = this.secondTotalTime
                                    this.seconds = parseInt((TimeDifference-this.firstMin-this.secondMin-this.thirdMin-this.relaxMin*2)*60)
                                    this.SeSelist()
                                    console.log("作业规划与教师跟进")
                                }else if(TimeDifference<(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.relaxMin*3) &&
                                    TimeDifference>(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.relaxMin*2)){
                                    this.type = 7
                                    this.seconds = parseInt((TimeDifference-this.firstMin-this.secondMin-this.relaxMin*2-this.thirdMin-this.fourthMin)*60)
                                    this.relax()
                                    console.log("休息时间3")
                                }else if(TimeDifference<(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.SeThirdMin+this.relaxMin*3) &&
                                    TimeDifference>(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.relaxMin*3)){
                                    this.type = 8
                                    this.title = this.secondTotalTime
                                    this.seconds = parseInt((TimeDifference-this.firstMin-this.secondMin-this.thirdMin-this.fourthMin-this.relaxMin*3)*60)
                                    this.SeThirdlist()
                                    console.log("专注作业")
                                }else if(TimeDifference<(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.SeThirdMin+this.SeFourthMin+this.relaxMin*3) &&
                                    TimeDifference>(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.SeThirdMin+this.relaxMin*3)){
                                    this.type = 9
                                    this.title = this.secondTotalTime
                                    this.seconds = parseInt((TimeDifference-this.firstMin-this.secondMin-this.thirdMin-this.fourthMin-this.SeThirdMin-this.relaxMin*3)*60)
                                    this.SeFourthist()
                                    console.log("自主休息")
                                }else if(TimeDifference<(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.SeThirdMin+this.SeFourthMin+this.SeFivethMin+this.relaxMin*3) &&
                                    TimeDifference>(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.SeThirdMin+this.SeFourthMin+this.relaxMin*3)){
                                    this.type = 10
                                    this.title = this.thirdTotalTime
                                    this.seconds = parseInt((TimeDifference-this.firstMin-this.secondMin-this.thirdMin-this.fourthMin-this.SeThirdMin-this.SeFourthMin-this.relaxMin*3)*60)
                                    this.SeFivelist()
                                    console.log("自主检查与寻求帮助")
                                }else if(TimeDifference<(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.SeThirdMin+this.SeFourthMin+this.SeFivethMin+this.relaxMin*4) &&
                                    TimeDifference>(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.SeThirdMin+this.SeFourthMin+this.SeFivethMin+this.relaxMin*3)){
                                    this.type = 11
                                    this.title = this.thirdTotalTime
                                    this.seconds = parseInt((TimeDifference-this.firstMin-this.secondMin-this.thirdMin-this.fourthMin-this.SeThirdMin-this.SeFourthMin-this.SeFivethMin-this.relaxMin*3)*60)
                                    this.relax()
                                    console.log("休息时间4")
                                }else if(TimeDifference<(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.SeThirdMin+this.SeFourthMin+this.SeFivethMin+this.ThFirstMin+this.relaxMin*4) &&
                                    TimeDifference>(this.firstMin+this.secondMin+this.thirdMin+this.fourthMin+this.SeThirdMin+this.SeFourthMin+this.SeFivethMin+this.relaxMin*4)){
                                    this.type = 12
                                    this.title = this.thirdTotalTime
                                    this.seconds = parseInt((TimeDifference-this.firstMin-this.secondMin-this.thirdMin-this.fourthMin-this.SeThirdMin-this.SeFourthMin-this.SeFivethMin-this.relaxMin*4)*60)
                                    this.ThFirstlist()
                                    console.log("归类整理")
                                }else if(Date.now()*0.001>this.endTime){
                                    this.Back()
                                }
                            },1000)
                        },1000)
                    }).catch(() => {
                    throw new Error("获取流程表异常!")
                })
            },
            Back(){
                document.getElementById('startface').style.display = "none"
                document.getElementById('listface').style.display = "none"
                document.getElementById('end').style.display = "block"
            },
            // 流程时间
            getHomeworkProcessTimeFun() {
                getHomeworkProcessTime()
                    .then(res => {
                        this.time = res.data.data
                        this.startTime = res.data.data.startTime
                        this.endTime = res.data.data.endTime
                    }).catch(() => {
                    throw new Error("获取时间异常!")
                })
            },
            // 当前流程时间 状态
            Firstlist(){
                var addnumber = this.firstTTime
                if(this.number < 100 && this.type ===1){
                    if((this.seconds === 1 || this.seconds === 2 || this.seconds === 3 || this.seconds === 4 || this.seconds === 5)&& this.startring === 0){
                        this.playVid()
                        this.startring = 1
                    }
                    this.title = this.firstTotalTime
                    this.Titletop = this.first
                    let timerl = setTimeout(()=>{
                        this.seconds+=1
                        this.Fseconds = this.seconds
                        this.Sseconds = this.seconds
                        this.number= addnumber*this.Fseconds
                        if(this.seconds >= 60){
                            this.Sseconds = this.seconds % 60
                            this.minute = parseInt(this.seconds/60)
                        }
                        this.Firstlist()
                    },1000)
                }else{
                    this.minute = 0
                    this.seconds = 0
                    this.number =0
                    this.type +=1
                    this.playVid()
                    let timerl = setTimeout(()=>{
                        this.FirSelist()
                    },1000)
                }
                document.getElementById('nowloading00').style.color = "black"
                document.getElementById('Loading00').style.fontWeight = "700"
            },
            FirSelist(){
                document.getElementById('nowloading00').style.color = "white"
                document.getElementById('Loading00').style.fontWeight = "400"
                if(this.number < 100 && this.type ===2){
                    this.Titletop = this.second
                    let timerl = setTimeout(()=>{
                        let addnumber = this.secondTime
                        this.seconds+=1
                        this.Fseconds = this.seconds
                        this.Sseconds = this.seconds
                        this.number= addnumber*this.Fseconds
                        if(this.seconds >= 60){
                            this.Sseconds = this.seconds % 60
                            this.minute = parseInt(this.seconds/60)
                        }
                        this.FirSelist()
                    },1000)
                }else{
                    this.seconds = 0
                    this.number =0
                    this.minute =0
                    this.type +=1
                    this.playVid()
                    let timerl = setTimeout(()=>{
                        this.relax()
                    },1000)
                }
                document.getElementById('nowloading01').style.color = "black"
                document.getElementById('Loading01').style.fontWeight = "700"
            },
            Selist(){
                this.title = this.secondTotalTime
                document.getElementById('nowloading02').style.color = "white"
                document.getElementById('Loading02').style.fontWeight = "400"
                if(this.number < 100 && this.type ===4){
                    this.Titletop = this.third
                    let timerl = setTimeout(()=>{
                        let addnumber = this.thirdTime
                        this.seconds+=1
                        this.Fseconds = this.seconds
                        this.Sseconds = this.seconds
                        this.number= addnumber*this.Fseconds
                        if(this.seconds >= 60){
                            this.Sseconds = this.seconds % 60
                            this.minute = parseInt(this.seconds/60)
                        }
                        this.Selist()
                    },1000)
                }else{
                    this.minute =0
                    this.seconds = 0
                    this.number =0
                    this.type +=1
                    this.playVid()
                    let timerl = setTimeout(()=>{
                        this.relax()
                    },1000)
                }
                document.getElementById('nowloading10').style.color = "black"
                document.getElementById('Loading10').style.fontWeight = "700"
            },
            SeSelist(){
                this.title = this.secondTotalTime
                if(this.number < 100 && this.type === 6){
                    this.Titletop = this.fourth
                    let timerl = setTimeout(()=>{
                        let addnumber = this.fourthTime
                        this.seconds+=1
                        this.Fseconds = this.seconds
                        this.Sseconds = this.seconds
                        this.number= addnumber*this.Fseconds
                        if(this.seconds >= 60){
                            this.Sseconds = this.seconds % 60
                            this.minute = parseInt(this.seconds/60)
                        }
                        this.SeSelist()
                    },1000)
                }else{
                    this.minute =0
                    this.seconds = 0
                    this.number =0
                    this.type +=1
                    this.playVid()
                    let timerl = setTimeout(()=>{
                        this.relax()
                    },1000)
                }
                document.getElementById('nowloading12').style.color = "black"
                document.getElementById('Loading12').style.fontWeight = "700"
            },
            SeThirdlist(){
                this.title = this.secondTotalTime
                if(this.number < 100 && this.type === 8){
                    this.Titletop = this.SeThird
                    let timerl = setTimeout(()=>{
                        let addnumber = this.SeThirdTime
                        this.seconds+=1
                        this.Fseconds = this.seconds
                        this.Sseconds = this.seconds
                        this.number= addnumber*this.Fseconds
                        if(this.seconds >= 60){
                            this.Sseconds = this.seconds % 60
                            this.minute = parseInt(this.seconds/60)
                        }
                        this.SeThirdlist()
                    },1000)
                }else{
                    this.minute =0
                    this.seconds = 0
                    this.number =0
                    this.type +=1
                    this.playVid()
                    let timerl = setTimeout(()=>{
                        this.SeFourthist()
                    },1000)
                }
                document.getElementById('nowloading14').style.color = "black"
                document.getElementById('Loading14').style.fontWeight = "700"
            },
            SeFourthist(){
                this.title = this.secondTotalTime
                document.getElementById('nowloading14').style.color = "white"
                document.getElementById('Loading14').style.fontWeight = "400"
                if(this.number < 100 && this.type === 9){
                    this.Titletop = this.SeFourth
                    let timerl = setTimeout(()=>{
                        let addnumber = this.SeFourthTime
                        this.seconds+=1
                        this.Fseconds = this.seconds
                        this.Sseconds = this.seconds
                        this.number= addnumber*this.Fseconds
                        if(this.seconds >= 60){
                            this.Sseconds = this.seconds % 60
                            this.minute = parseInt(this.seconds/60)
                        }
                        this.SeFourthist()
                    },1000)
                }else{
                    this.minute =0
                    this.seconds = 0
                    this.number =0
                    this.type +=1
                    this.playVid()
                    let timerl = setTimeout(()=>{
                        this.SeFivelist()
                    },1000)
                }
                document.getElementById('nowloading15').style.color = "black"
                document.getElementById('Loading15').style.fontWeight = "700"
            },
            SeFivelist(){
                this.title = this.secondTotalTime
                document.getElementById('nowloading15').style.color = "white"
                document.getElementById('Loading15').style.fontWeight = "400"
                if(this.number < 100 && this.type === 10){
                    this.Titletop = this.SeFiveth
                    let timerl = setTimeout(()=>{
                        let addnumber = this.SeFivethTime
                        this.seconds+=1
                        this.Fseconds = this.seconds
                        this.Sseconds = this.seconds
                        this.number= addnumber*this.Fseconds
                        if(this.seconds >= 60){
                            this.Sseconds = this.seconds % 60
                            this.minute = parseInt(this.seconds/60)
                        }
                        this.SeFivelist()
                    },1000)
                }else{
                    this.minute =0
                    this.seconds = 0
                    this.number =0
                    this.type +=1
                    this.playVid()
                    let timerl = setTimeout(()=>{
                        this.relax()
                    },1000)
                }
                document.getElementById('nowloading16').style.color = "black"
                document.getElementById('Loading16').style.fontWeight = "700"
            },
            ThFirstlist(){
                this.title = this.thirdTotalTime
                if(this.number < 100 && this.type === 12){
                    this.Titletop = this.ThFirst
                    let timerl = setTimeout(()=>{
                        let addnumber = this.ThFirstTime
                        this.seconds+=1
                        this.Fseconds = this.seconds
                        this.Sseconds = this.seconds
                        this.number= addnumber*this.Fseconds
                        if(this.seconds >= 60){
                            this.Sseconds = this.seconds % 60
                            this.minute = parseInt(this.seconds/60)
                        }
                        this.ThFirstlist()
                    },1000)
                }else{
                    this.seconds = 0
                    this.number =0
                    this.type +=1
                    this.playVid()
                    this.Back()
                }
                document.getElementById('nowloading20').style.color = "black"
                document.getElementById('Loading20').style.fontWeight = "700"
            },
        }
    }
</script>

<style scoped>
    *{
        font-size: 0.14rem;
    }
    .title{
        font-size: 0.5rem;
        font-weight: 700;
        color: #3b1616;
        text-align: center;
        line-height: 0.5rem;
        /*background: #3b1616;*/
        filter: Alpha(opacity=10); -moz-opacity:0.7; opacity:0.7;
        opacity:0.7;
    }
    .title_se{
        font-size: 0.3rem;
        font-weight: 700;
        color: #3b1616;
        text-align: center;
        line-height: 0.5rem;
        opacity:0.7;
    }
    .time{
        text-align: center;
        font-size: 0.14rem;
        font-weight: 700;
        line-height: 0.25rem;
        margin: 0.2rem 0;
        color: #484444;
        opacity:0.7
    }
    .listTitle{
        line-height: 0.45rem;
        border-bottom: solid 1px #CCCCCC;
        padding:0 0.15rem;
    }
    .ac_line{
        height: 0.1rem;
        background: #F3F7F8;
    }
    .hide{
        color: white;
    }
    #startface{
        height: 100%;
        background: white;
        position: absolute;
        top: 0;
        width: 100%;
        z-index:999;
        background-image: url("http://beta.app.api.top910.com/top910/attachment/image/start-homework.png");
        background-size: 100% 100%;
    }
    #listface{
        z-index:1;
        background: white;
        height: 100%;
        position: absolute;
        top: 0;
        width: 100%;
        display: none;
    }
    #end{
        text-align: center;
        line-height: 2.8rem;
        font-size: 0.3rem;
        color: #6699FF;
        font-weight: 700;
    }
    .changelist{
        text-align: center;
        /* margin: 0 auto; */
        width: 2.5rem;
        font-size: 0.18rem;
        height: 0.5rem;
        color:#ffffff;
        position: relative;
        left: 0.4rem;
        top: 0.1rem;
        line-height: 0.5rem;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        background: #3b1616;
        z-index: 2;
        filter: Alpha(opacity=10); -moz-opacity:0.7; opacity:0.7;
    }
    .changelist_box{
        position: absolute;
        right: 0;
        top: 0;
        width: 2rem;
        overflow: hidden;
        height: 2rem;
    }
    >>>.van-circle__layer{
        stroke: black;
    }
</style>