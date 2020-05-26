<template>

    <div class="body">
        <van-nav-bar
                title="缴费提醒"
        />
        <div class="textbox">
            <span style="font-size: 0.2rem;font-weight: 700">{{classNameList.stuName}}家长，您好!</span><br>
            {{classNameList.schoolName}}:

            <span style="font-weight: 700;color: red" v-if="classNameList.laveDay === 0">将于今天</span>
            <span style="font-weight: 700;color: red" v-else>将于{{classNameList.laveDay}}天后，</span>

            {{classNameList.maturityDate}}
            收取学生托管费用。<br>
            请提前到机构现场办理缴费事宜。
            感谢您的理解和支持！
        </div>

    </div>
</template>

<script>
    import { NavBar,Switch,Tab,Tabs,Row, Col, Icon } from 'vant';
    import { GetParentsInformation } from '@/api/parent/briefing';
    import { getParamFromUrlAndRoute } from '@/utils'

    export default {
        name: "automatic-mode",
        data() {
            return {
                classNameList:[],
                template_id:'',
                from:'template',
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

            //someComponent
        },
        methods:{
            // 获取缴费时间
            GetStuList(){
                const template_id = getParamFromUrlAndRoute('template_id', this.$router)
                if(this.$route.query.template_id || template_id) {
                    this.$loading();
                    GetParentsInformation(this.from,template_id)
                        .then(res => {
                            this.$loadingHide();
                            if (res.status === 200) {
                                this.classNameList = res.data.data;
                            }
                        }).catch(() => {
                        throw new Error("历史记录获取异常!")
                    })
                }
            }
        },
        mounted(){
            this.GetStuList()
        }
    }
</script>

<style scoped>
    >>>.van-tabs--line .van-tabs__wrap{
        border-bottom: solid 1px #e5e5e5;
    }
    .body{
        font-size:0.14rem;
        background-image: linear-gradient(#ffffff, #d8d8d8);
        height: 100vh;
    }
    .textbox{
        line-height: 0.4rem;
        margin: 1rem 0.3rem;
    }
</style>