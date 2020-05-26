<template>

    <div class="body">
        <van-nav-bar
                title="周报点评"
                left-text="工作台"
                left-arrow
                @click-left="onClickLeft"
        />
        <div class="top_title">
<!--            <van-switch v-model="checked"  @input="onInput" size="0.2rem" style="float:left;margin-right: 0.1rem"/>-->
            <div style="text-align: center">系统将于每周六晚上7:30分推送学生本周报表</div>
        </div>
        <div class="ac_line"></div>
        <div class="title_date">
            <van-row>
                <van-col span="2">
                    <a @click="changeweek(1)">  &lt; </a>
                </van-col>
                <van-col span="20">
                    <a style="margin: 0 0.15rem">本周:{{Testlist}}</a>
                </van-col>
                <van-col span="2"  :class="{showC:showC}" >
                    <a @click="changeweek(2)"> &gt; </a>
                </van-col>
            </van-row>
        </div>
        <div>
            <ClassList :class-list="classNameList" ></ClassList>
        </div>
    </div>
</template>

<script>
    import { NavBar,Switch,Tab,Tabs,Row, Col } from 'vant';
    // 从手动推送获取自动推送的推送时间参数
    import { StuList } from '@/api/parent/briefing';
    // 获取推送方式
    import { GetType } from '@/api/parent/briefing';
    // 自动推送
    import { GetStuStatus } from '@/api/parent/briefing';
    // 改变推送方式
    import { ChangeType } from '@/api/parent/briefing';
    import ClassList from "../components/automatic-list";
    import moreTabs from '@/components/common/more-tabs.vue'

    export default {
        name: "automatic-mode",
        data() {
            return {
                checked: true,
                showC:true,
                type:0,
                week:'',
                maxweek:'',
                maxyear:'',
                year:'',
                classIndex: 0,
                stulist:[],
                clsName:[],
                classNameList:[],
                Testlist:[]
            };
        },
        components: {
            [NavBar.name]: NavBar,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Switch.name]: Switch,
            [Row.name]: Row,
            [Col.name]: Col,
            moreTabs:moreTabs,
            ClassList:ClassList,
            //someComponent
        },
        methods:{
            changeweek(type){
                if(type === 1 && this.continuity === true){
                    this.week-=1
                    if(this.week<this.maxweek && this.year<=this.maxyear || this.year<this.maxyear){
                        this.showC = false
                    }
                    if(this.week === 0){
                        this.week = 52
                        this.year-=1
                        this.showC = false
                    }
                    this.continuity = false
                    this.GetMeslist()
                }
                else if(type === 2 && this.continuity === true){
                    this.week+=1
                    if(this.week === this.maxweek && this.year === this.maxyear){
                        this.showC = true
                    }
                    if(this.week > 52){
                        this.week = 1
                        this.year+=1
                    }
                    this.continuity = false
                    this.GetMeslist()
                }
            },
            onClickLeft(){
                this.$router.go(-2)
            },
            // 自动推送
            GetMeslist(){
                this.$loading();
                GetStuStatus(this.year,this.week)
                .then(res => {
                    this.$loadingHide();
                    if (res.status === 200) {
                        this.Testlist = res.data.data.date;
                        this.classNameList = []
                        for (let item of res.data.data.clsStu) {
                            if (item.clsId) {
                                this.classNameList.push({
                                    id: item.clsId,
                                    name: item.clsName,
                                    stuList: item.stuList
                                });
                            }
                        }
                        let timer = setTimeout(()=>{
                            this.continuity = true
                        },1000)
                    }
                    }).catch(() => {
                        throw new Error("异常!")
                    })
            },
            // 获取手动推送时间（自动推送参数）
            GetWeek(){
                this.$loading();
                StuList()
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            this.week = res.data.data.week
                            this.year = res.data.data.year
                            this.maxweek = res.data.data.week
                            this.maxyear = res.data.data.year
                            this.GetMeslist()
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            // 获取推送类型
            GetTypeFun(){
                GetType()
                    .then(res => {
                        this.status = res.data.data;
                    }).catch(() => {
                    throw new Error("获取手动/自动类型异常!")
                })
            },
            // 切换推送方式按钮
            onInput(checked){
                this.$loading();
                if(checked === false){
                    this.type = 1
                        let timer = setTimeout(()=>{
                            this.$loadingHide();
                                ChangeType(this.type)
                                    .then(res => {
                                        this.stulist = res.data.data.clsStu;
                                        this.$router.push({name:'SwitchWeeklyReport'})
                                    }).catch(() => {
                                    throw new Error("异常!")
                                })
                        },2000)
                }
            }
        },
        mounted(){

            this.GetWeek()
            this.GetTypeFun()
        }

    }
</script>

<style scoped>
    .body{
        font-size:0.14rem
    }
    .ac_line{
        height: 0.1rem;
        background: #F3F7F8;
        /*float: left;*/
        /*width: 100%;*/
    }
    .top_title{
        margin: 0.1rem;
        font-size: 0.14rem;
        line-height: 0.25rem;
    }
    .title_date{
        line-height: 0.5rem;
        text-align: center;
        border-bottom: solid 1px #CCCCCC;
        font-weight: 700;
    }
    .fam_box{
        padding: 0.1rem 0.15rem;
        float: left;
        text-align: center;
    }
    .fam_list{
        border-bottom: solid 1px #CCCCCC;
    }
    .showC{
        display: none;
    }

</style>