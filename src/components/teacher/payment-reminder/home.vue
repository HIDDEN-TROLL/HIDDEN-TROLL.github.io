<template>

    <div class="body">

        <div >
            <ClassList :class-list="classNameList" :week="week" :clsStuList="clsStuList"></ClassList>
        </div>

    </div>
</template>

<script>
    import { NavBar,Switch,Tab,Tabs,Row, Col, Icon } from 'vant';
    import { HistoryList } from '@/api/parent/briefing';
    import ClassList from "./components/student-list";

    export default {
        name: "automatic-mode",
        data() {
            return {
                checked: true,
                stulist:[],
                classNameList:[],
                clsStuList:[],
                currentClaass: '',//保存当前选择的班级
                currentClaassId: null,//保存当前选择的班级id
                show:true,
                showPar:true,
                date:'',
                week:this.$route.params.week,
                maxweek:this.$route.params.week,
                maxyear:this.$route.params.year,
                year:this.$route.params.year,
                showC:true,
                // 当当周数据加载完才能切换其他周数
                continuity:true
            };
        },
        components: {
            [NavBar.name]: NavBar,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Switch.name]: Switch,
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            ClassList:ClassList

            //someComponent
        },
        methods:{
            // 切换日期
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
                    this.GetStuList()
                }
                else if(type === 2 && this.continuity === true){
                    this.week +=1
                    if(this.week === this.maxweek  && this.year === this.maxyear){
                        this.showC = true
                    }
                    if(this.week > 52){
                        this.week = 1
                        this.year+=1
                    }
                    this.continuity = false
                    this.GetStuList()
                }
            },
            onClickLeft(){
                this.$router.back(-1)
            },
            // 获取历史记录信息
            GetStuList(){
                // console.log(this.week)
                this.$loading();
                HistoryList(this.year,this.week)
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            this.date = res.data.data.date;
                            this.classNameList =  []
                            for (let item of res.data.data) {
                                if (item.clsId) {
                                    this.classNameList.push({
                                        id: item.clsId,
                                        name: item.clsName,
                                        stuList: item.stuList,
                                        week: this.$route.params.week,
                                    });
                                }
                            }

                                this.clsStuList = []
                                for (let item of this.classNameList) {
                                    if (item.stuList) {
                                        this.clsStuList.push({
                                            stuList: item.stuList,
                                        });
                                    }
                                }

                            let timer = setTimeout(()=>{
                                this.continuity = true
                            },1000)
                        }
                    }).catch(() => {
                    throw new Error("历史记录获取异常!")
                })
            }
        },
        mounted(){
            // this.GetStuList()
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
        font-weight: 700;
    }
    .fam_box{
        padding: 0.1rem 0.15rem;
        float: left;
        text-align: center;
        width: 0.8rem;
    }
    .fam_fam_box{
        padding: 0.1rem 0.15rem;
        float: left;
        text-align: center;
    }
    .fam_list{
        /*border-bottom: solid 1px #CCCCCC;*/
    }
    .title_show{
        color: #6699FF;
        line-height: 0.4rem;
        text-align: center;
        border-bottom: 1px solid rgb(204, 204, 204);
    }
    .unsend{
        padding: 0.1rem 0.15rem;
        float: left;
        text-align: center;
        color: red;
    }
    >>>.van-tabs--line .van-tabs__wrap{
        border-bottom: solid 1px #e5e5e5;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .Hide_btn{
        border: none;
        background: white;
    }
    .showC{
        display: none;
    }

</style>