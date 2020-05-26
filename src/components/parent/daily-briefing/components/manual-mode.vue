<template>

    <div class="body">
        <van-nav-bar
                title="周报点评"
                left-text="工作台"
                right-text="历史记录"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <div class="top_title">
<!--            <van-switch v-model="checked"  @input="onInput" size="0.2rem" style="float:left;margin-right: 0.1rem"/>-->
            手动点评推送模式
            <span style="margin: 0 0.1rem">|</span>
                {{date}}
        </div>
        <div class="ac_line"></div>
        <div>
            <ClassList @func="getMsgFormSon"></ClassList>
        </div>
    </div>
</template>

<script>
    import { NavBar,Switch,Tab,Tabs,Row, Col,Dialog,Button,Toast   } from 'vant';
    import { StuList } from '@/api/parent/briefing';
    import { GetType } from '@/api/parent/briefing';
    import { ChangeType } from '@/api/parent/briefing';
    import Footer from '../../../common/footer-operate-btn'
    import TextInput from "@/components/common/text-input";
    import ClassList from "./manual-list";
    export default {
        name: "automatic-mode",
        data() {
            return {
                checked: false,
                sendbox:true,
                change: false,
                clsStu:[],
                question:'',
                arr:[{title:'提交',type:1}],
                Comlist:[],
                idlist:[],

                status:'',
                type:1,

                classNameList:[],
                date:'',
                year:'',
                week:'',
            };
        },
        components: {
            TextInput,
            [Toast.name]: Toast,
            [NavBar.name]: NavBar,
            [Button .name]: Button ,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Switch.name]: Switch,
            [Row.name]: Row,
            [Col.name]: Col,
            [Dialog .name]: Dialog ,
            ClassList:ClassList,
            //someComponent
        },
        methods:{
            getMsgFormSon(data,year,week){
                this.date = data
                this.year = year
                this.week = week
            },
            onInput(checked){
                this.$loading();
                if(checked === true){
                    this.type = 0
                    let timer = setTimeout(()=>{
                        this.$loadingHide();

                        ChangeType(this.type)
                            .then(res => {
                                let data = []
                                data = res.data.data
                                this.$router.push({name:'SwitchWeeklyReport'})
                            }).catch(() => {
                            throw new Error("手动模式切换到自动模式异常!")
                        })

                    },2000)
                }
            },
            onClickLeft(){
                this.$router.go(-2)
            },
            onClickRight(){
                this.$router.push({name:'History',params:{year:this.year,week:this.week}})
            },
            GetStuList(){
                StuList()
                    .then(res => {
                        this.clsStu = res.data.data.clsStu;
                        for (let item of res.data.data.clsStu) {
                            if (item.clsId) {
                                this.classNameList.push({
                                    id: item.clsId,
                                    name: item.clsName,
                                    stuList: item.stuList
                                });
                            }
                        }
                    }).catch(() => {
                    throw new Error("手动点评获取学生列表异常!")
                })
            },
            GetTypeFun(){
                GetType()
                    .then(res => {
                        this.status = res.data.data;
                    }).catch(() => {
                    throw new Error("获取手动/自动类型异常!")
                })
            },
            ShowComment(){
                this.show = true
            }
        },
        mounted(){
            this.GetTypeFun()
        }

    }
</script>

<style scoped>
    *{
        word-wrap:break-word
    }
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
        text-align: center;
    }
    .title_date{
        line-height: 0.5rem;
        text-align: center;
        border-bottom: solid 1px #CCCCCC;
        font-weight: 700;
    }
    .fam_box{
        padding: 0.25rem 0 0.25rem 0.15rem;
        float: left;
        text-align: center;
        line-height: 0.24rem;
    }
    .fam_list{
        border-top: solid 1px #CCCCCC;
    }
    .top_date{
        float: left;
        border-right: solid 1px;
        padding-right: 0.15rem;
        margin-right: 0.15rem;
    }
    .text_box{
        margin: 0.15rem  0;
        border: solid 1px;
        width: 90%;
        border-radius: 10px;
        height: 0.6rem;
    }
    .Stu_list{
        border: solid 1px;
        text-align: center;
        border-radius: 8px;
    }
    .Stu_box{
        margin: 0.1rem 0.15rem;
    }
    .change_text{
        font-size: 0.14rem;
        line-height: 0.3rem;
        padding: 0.15rem;
    }
    >>>.van-dialog__header{
        color: #1989fa;
    }
    .show_com_fam{
        float: left;
        text-align: center;
        margin: 0.15rem 0.1rem;
    }
    .van-button--normal{
        padding: 0 0.1rem;
        margin: 0.35rem 0.1rem 0.3rem 0;
        font-size: 14px;
        height: 0.3rem;
        line-height: 0.3rem;
    }



</style>