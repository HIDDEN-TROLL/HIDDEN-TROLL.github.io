d<template>
    <div>
        <van-nav-bar
                :title="teacherName"
                left-text="返回"
                right-text=""
                left-arrow
                @click-left="onclickLeft"

        />
        <div class="tab_div">
            <van-tabs>

                <van-tab title=" 小红花">
                    <Redflower ></Redflower>
                </van-tab>

                <van-tab title="作业">
                    <Homework :work="work"></Homework>
                </van-tab>

                <van-tab title="成绩">
                    <Achievement :score="score"></Achievement>
                </van-tab>

                <van-tab title="社区">
                    <Community :community="community"></Community>
                </van-tab>

            </van-tabs>
        </div>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import Achievement from './components/achievement'
    import Redflower from './components/redflower'
    import Homework from './components/homework'
    import Community from './components/community'
    import { NavBar } from 'vant';
    import { Tab, Tabs } from 'vant';
    import { TeacherMes } from '@/api/school/monthly-index'
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                work:[],
                score:[],
                community:[],

                test:[],
                date:this.$route.query.date,
                uid:this.$route.query.uid,

                teacherName:this.$route.query.teacherName,

            }
        },
        components: {
            [Tabs.name]:Tabs,
            [Tab.name]:Tab,
            [NavBar.name]:NavBar,
            Achievement:Achievement,
            Redflower:Redflower,
            Homework:Homework,
            Community:Community
            //someComponent
        },
        methods:{
            onclickLeft(){
                // this.$router.push({ path:'./MonthlyIndex' , })
                this.$router.go(-1)
            },

            Getteachermes(){
                TeacherMes(this.uid,this.date)
                    .then(res => {
                        // this.safflower = res.data.data.safflower;
                        // this.SafflowerBarChart = res.data.data.safflower.barChart;
                        this.work = res.data.data.work;
                        this.score = res.data.data.score;
                        this.community = res.data.data.community;
                        // console.log(this.work)

                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
        },
        mounted() {
            this.Getteachermes()

        }
    }
</script>

<style scoped>

    .van-nav-bar .van-icon ,.van-nav-bar__text{
        color: white;
    }
    .van-nav-bar{
        background-color:#3770FB ;
    }
    .van-nav-bar__title{
        font-size: 0.16rem;
        color: white;
    }

    .tab_div{
        /*margin: 0 0.15rem;*/
    }
    .tab_div>>>.van-tabs__line{
        background-color:#3770FB ;
    }
    .tab_div>>>.van-tab--active{
        color: #3770FB;

    }


    .ac_line{
        height: 0.1rem;
        width: 100%;
        background-color: red;
    }

</style>
