<template>
    <div v-if="flash">
        <van-nav-bar
                left-text="返回"
                right-text=""
                left-arrow
                @click-left="onclickLeft"
                @click-right="onclickRight"
        >
            <div name="search" slot="title" >
                {{years}}年{{months}}月指数
            </div>
        </van-nav-bar>

        <div class="van-tabs_div">
            <van-tabs type="card">
                <van-tab title="月总指数">
                    <Monthlyindex ref="monthlyindex"></Monthlyindex>
                </van-tab>
                <van-tab title="月教师指数">
                    <Teacher ref="teacher" ></Teacher>
                </van-tab>
            </van-tabs>
        </div>

        <Footer :event-arr="arr" v-on:commenEvent="parent">  </Footer>

        <van-dialog
                v-model="show"
                :show-cancel-button=false
                :show-confirm-button=false
                :close-on-click-overlay="true"
        >
            <div>
                <div style="text-align: center;font-size: 0.16rem;line-height: 0.5rem;">
                    <span><van-icon name="arrow-left" @click="Upward" /> </span><span style="margin: 0 0.7rem"> {{years}}</span><span :class="{testcho:showcho}"><van-icon  name="arrow" @click="down" /></span>
                </div>
                <div>
                    <div class="test">
                        <div class="addleft"
                             :class="{clickaddleft:leftchangebgc == index }"
                             v-for="(item,index) in leftlist" :key="index"
                             @click="changeleft(index)"
                             @click.stop="getdate()">
                            {{item.con}}
                        </div>
                    </div>
                </div>
            </div>
            <div> <hr style="width: 90%;margin: 0.1rem 0.15rem 0 0.15rem;"></div>
            <div @click="jumptothis" v-if="this.year=new Date().getFullYear()" class="jump" style="color: #6699FF;font-size: 0.14rem;text-align: center;line-height: 0.4rem;">跳转至本月</div>
        </van-dialog>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import Footer from './components/footer-operate-btn';
    import Monthlyindex from './components/monthly-index';
    import Teacher from './components/teacher-monthlyindex';
    import { Tab,Tabs } from 'vant';
    import { Tag } from 'vant';
    import { NavBar } from 'vant';
    import { Dialog } from 'vant';
    import { Icon } from 'vant';
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                showcho:true,
                flash:true,
                arr:[{title:'查看历史月份',type:1}],

                years:new Date().getFullYear(),
                months:new Date().getMonth()+1,

                leftlist:[
                    {con:"一月"},{con:"二月"},{con:"三月"},{con:"四月"},
                    {con:"五月"},{con:"六月"},{con:"七月"},{con:"八月"},
                    {con:"九月"},{con:"十月"},{con:"十一月"},{con:"十二月"},
                ],
                show:false,
                leftchangebgc:-1,
            }
        },
        components: {
            Monthlyindex:Monthlyindex,
            Teacher:Teacher,
            Footer:Footer,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Tag.name]:Tag,
            [NavBar.name]:NavBar,
            [Dialog.name]:Dialog,
            [Icon.name]:Icon,
        },
        methods:{
            jumptothis(){
                this.years = new Date().getFullYear()
                this.months = new Date().getMonth()+1
                this.$router.push({path: '', query: {date: this.years + '-' + '0' + this.months}})
                this.show=false;

                this.$refs.monthlyindex.getList();
                this.$refs.teacher.teacherlist()
            },
            parent(){
                this.show = !this.isShow;
            },
            onclickLeft(){
                this.$router.push({name:'SchoolHomeWorkbench'})
            },
            onclickRight(){

            },
            changeleft(index){
                if (index<9){
                    {
                        this.months = index + 1;
                        this.$router.push({path: '', query: {date: this.years + '-' + '0' + this.months}});
                        this.show=false;
                        console.log(this.years + '-' + '0' + this.months);
                        this.$refs.monthlyindex.getList();
                        this.$refs.teacher.teacherlist()

                    }
                }
                else {
                    this.months = index+1;
                    console.log(this.year+'-'+this.months);
                    this.$router.push({ path:'',query:{date:this.years+'-'+this.months} });
                    this.show=false
                    this.$refs.monthlyindex.getList();
                    this.$refs.teacher.teacherlist()
                }
                this.leftchangebgc = index;
            },
            getdate(){
                this.$router.push({ path:'',query:{date:this.years+'-'+this.months} })
            },
            Upward(){
                this.years-=1
                this.showcho=false
            },
            down(){
                this.years+=1
                var test = new Date().getFullYear()
                if(this.years === test){
                    this.showcho=true
                }
            }
        },
        mounted(){
            this.getdate();
        },
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


    .van-tabs{
        margin-top:0.15rem;
    }
    .van-tabs_div{
        margin-bottom: 1rem;
    }
    .van-tabs_div>>>.van-tabs__nav--card .van-tab.van-tab--active {
        background-color: #3770fb;
        color: white;
    }
    .van-tabs_div>>>.van-tabs__nav--card {
        border: 1px solid #3770fb;
    }
    .van-tabs_div>>>.van-tabs__nav--card .van-tab{
        color: #3770fb;
    }
    .van-tabs_div>>>.van-tabs__nav--card .van-tab{
        border-right: none;
    }

    .acline{
        width:100%;
        height: 1rem;
        background-color: #F3F7F8;
    }



    .test{
        font-size:0.14rem;
        width: 3.5rem;
        margin: 0 auto;
        float: left;
        padding-bottom: 0.15rem;
    }
    .addleft{
        float: left;
        margin: 0 0.14rem;
        color: #666666;
        text-align: center;
        line-height:0.3rem;
        width:0.5rem;
        height:0.3rem;
        background:white;
        border-radius:0.03rem;
        /*border: solid 1px #666666;*/
    }
    .clickaddleft{
        /*border: solid 1px #3770FB;*/
        color: white;
        background-color:#3770FB;}

    >>>.van-button--large{
        height: 0.4rem;
        font-size: 0.14rem;
        line-height: 0.4rem;
    }
    .testcho{
        display: none;
    }


</style>
