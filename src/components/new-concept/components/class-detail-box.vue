<template>
    <div class="detail-box">
        <div class="student">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text=""
                    @load="onLoad"
            >
                <div class="date_list">
                    <i  @click="computedDate(1)" class="van-icon van-icon-arrow-left van-cell__left-icon" is-link arrow-direction="left"><!----></i>
                    <span @click="Cymonth"> {{date}} <i data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"><!----></i></span>
                    <i @click="computedDate(2)" data-v-506ad3dd="" class="van-icon van-icon-arrow van-cell__right-icon" :class="{choosetime:choosetime}"><!----></i>
                </div>

                <div class="titile_bottom"></div>

                <ul class="list-content">
                    <li class="item"  >
                        <div class="lt">
                            <span>
                                <span class="name">使用红花的校区:{{statistics.safflowerSchoolCount}}</span><br/>
                            </span>
                        </div>
                        <div class="rt">
                            <p class="grade">
                                <span class="num">使用红花的人数:{{statistics.safflowerCount}}</span></p>
                        </div>
                    </li>
                    <li class="item"  >
                        <div class="lt">
                            <span>
                                <span class="name">使用社区的校区:{{statistics.communitySchoolCount}}</span><br/>
                            </span>
                        </div>
                        <div class="rt">
                            <p class="grade">
                                <span class="num">社区发布的次数:{{statistics.communityCount}}</span></p>
                        </div>
                    </li>
                    <li class="item lastlt" style="border: none;"  >
                        <div class="lt ">
                            <span>
                                <span class="name">使用成绩的校区:{{statistics.scoreSchoolCount}}</span><br/>
                            </span>
                        </div>
                        <div class="rt ">
                            <p class="grade">
                                <span class="num">使用成绩的人次:{{statistics.scoreCount}}</span></p>
                        </div>
                    </li>
                </ul>
            </van-list>
        </div>

        <van-popup v-model="Cdate" position="bottom" :overlay="true">
            <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :max-date="minDate"
                    :formatter="formatter"
                    @cancel="ondateCancel"
                    @confirm="ondateConfirm"
            />
        </van-popup>

    </div>
</template>

<script>
    import {NavBar, Icon, Actionsheet, List } from 'vant';
    import { Cell } from 'vant';
    import { Popup } from 'vant';
    import { Picker } from 'vant';
    import { DatetimePicker } from 'vant';
    import { Statistics } from '@/api/new-concept/new-concept';


    export default {
        name: "class-detail-box",
        components:{
            [NavBar.name]: NavBar,
            [Cell.name]:Cell,
            [Icon.name]:Icon,
            [Actionsheet.name]:Actionsheet,
            [List.name]:List,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [DatetimePicker.name]: DatetimePicker,
        },
        data(){
            return {
                currentDate: new Date(),
                minDate: new Date(),

                changedate:'',

                schoolId:0,
                statistics:[],

                year:'',
                month:'',
                day:'',
                date:'',

                Cdate: false,
                loading:false,
                finished:false,
                show:false,
                choosetime:true,
                actions:[
                    {
                        name: '一年级',
                        type:1
                    },
                    {
                        name: '二年级',
                        type:2
                    }
                ],

            }
        },
        methods:{
            parentHandleclick(e) {

                this.schoolId = e
               this.GetStatistics()
            },

            GetStatistics(){
                Statistics(this.schoolId,this.year,this.month,this.day).then(res => {
                    this.statistics = res.data.data;
                }).catch(() => {
                    throw new Error("获取数据（全部机构）异常!")
                })
            },
            computedDate(type){
                let date = new Date(this.date);
                date.setDate(type === 1 ? date.getDate(this.day) - 1 : date.getDate(this.day) + 1);

                this.year = date.getFullYear(this.year)
                this.month = date.getMonth(this.month)+1
                this.day = date.getDate(this.day)
                this.date = this.year+"-"+this.month+"-"+this.day

                console.log(this.date)

                if(type === 1){
                    this.choosetime = false
                }else if(type === 2){
                    if(this.year === new Date().getFullYear() && this.month === new Date().getMonth()+1 && this.day === new Date().getDate()){
                        this.choosetime = true
                    }
                }
                    Statistics(this.schoolId,this.year,this.month,this.day).then(res => {
                        this.statistics = res.data.data;
                    }).catch(() => {
                        throw new Error("切换日期异常!")
                })
            },
            onClickLeft() {
                this.$router.back(-1)
            },
            onSelect(item){
                this.show = false;
                alert(item.type)
            },
            onLoad(){
                this.loading = false;
                this.finished = true;
            },
            Cymonth(){
                this.Cdate = true
            },
            ondateConfirm(value) {
                var date = value;
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();

                this.year = y
                this.month = m
                this.day = d
                this.date = this.year+"-"+this.month+"-"+this.day
                // this.date=timer
                if(this.year === new Date().getFullYear() && this.month === new Date().getMonth()+1 && this.day === new Date().getDate()){
                    this.choosetime = true
                }else{
                    this.choosetime = false
                }

                Statistics(this.schoolId,this.year,this.month,this.day).then(res => {
                    this.statistics = res.data.data;
                }).catch(() => {
                    throw new Error("奖励/扣除红花图表时间选择异常!")
                })
                this.Cdate = false;
            },
            ondateCancel() {
                this.Cdate = false;
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
        },
        created(){
            //获取初始时间
            if (this.$route.params.date){
                this.changedate = this.$route.params.date
            }else {
                let date = new Date();
                date.setDate(date.getDate());
                this.changedate = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate() ;
            }
        },
        mounted(){
            this.day = new Date().getDate()
            this.month = new Date().getMonth()+1
            this.year = new Date().getFullYear()
            this.date = this.year+"-"+this.month+"-"+this.day
            this.GetStatistics()
        }
    }
</script>

<style scoped lang="less">
    .detail-box{
        margin-top:0.1rem;
        background-color: white;
        font-size: 0;
        .go-back{
            .van-nav-bar{
                background-color:#3770FB;
                .van-icon{
                    font-size: 0.22rem;
                    color: #fff;
                }
                .van-nav-bar__text{
                    font-size: 0.16rem;
                    line-height: 0.22rem;
                    color: #fff;
                    font-weight: 400;
                }
                .van-nav-bar__title{
                    color: #fff;
                    font-weight: 400;
                }
            }
        }
        .tab{
            margin: 0 auto;
            /*width: 1.1rem;*/
            overflow: hidden;
            padding: 0.12rem 0.16rem;
            background-color: #fff;
            box-sizing: border-box;
            .item{
                float: left;
                margin-left: 0.61rem;
                font-size: 0.14rem;
                color: #666;
                line-height: 0.2rem;
                .fonticon{
                    position: relative;
                    top: 0.02rem;
                    left: 0.05rem;
                }
            }
            .item:first-child{
                margin-left: 0;
            }
        }
        .empty-box{
            width: 100%;
            height: 0.1rem;
            background-color: #F3F7F8;
        }
        .student{
            padding: 0 0.16rem 0;
            background-color: #fff;
            box-sizing: border-box;
            .total{
                font-size: 0.14rem;
                color: #666;
                text-align: center;
                padding: 0.14rem 0 0.16rem;
                line-height: 0.2rem;
                box-sizing: border-box;
                border-bottom: 0.02rem solid #eee;
            }
            .item{
                width: 100%;
                height: 0.5rem;
                padding: 0.08rem 0;
                box-sizing: border-box;
                border-bottom: 0.02rem solid #eee;
                .lt{
                    float: left;
                    width: 1.45rem;
                    height: 0.5rem;
                    /*border-right: 0.02rem solid #eee;*/
                    box-sizing: border-box;
                    img{
                        float: left;
                        width: 0.5rem;
                        height: 0.5rem;
                        border-radius: 0.25rem;
                        margin-right: 0.11rem;
                    }
                    .name{
                        display: inline-block;
                        font-size: 0.14rem;
                        color: #666;
                        line-height: 0.2rem;
                        margin-top: 0.05rem;
                    }
                    .num{
                        font-size: 0.12rem;
                        color: #999;
                        line-height: 0.16rem;
                    }
                }
                .rt{
                    float: left;
                    width: 1.98rem;
                    padding-left: 0.17rem;
                    height: 0.5rem;
                    box-sizing: border-box;
                    .grade{
                        width: 1.82rem;
                        font-size: 0.14rem;
                        color: #666;
                        line-height: 0.2rem;
                        margin-top: 0.05rem;
                        overflow: hidden;
                        .text{
                            float: left;
                        }
                        .num{
                            float: right;
                        }
                    }
                    .type{
                        font-size: 0.12rem;
                        color: #999;
                        line-height: 0.16rem;
                    }
                }
            }
        }
        .fixed-btn{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0.4rem;
            background-color: #3770fb;
            .sure-classes{
                float: left;
                width: 100%;
                line-height: 0.4rem;
                text-align: center;
                font-size: 0.14rem;
                color: #fff;
            }
        }
    }
    .titile_bottom{
        border-bottom: 0.02rem solid #eee;
    }

.top_list{
    font-size:0;
    margin: 0 auto;
    width: 2.2rem;
    padding:0.2rem;
}
    .left_img{
        float: left;
    }
    .time_title{
        margin: 0 0.3rem;
        float: left;
    }
    .van-cell__title{
        color:#666666;
        text-align: center;
    }
    .van-cell  {
        line-height: 0.24rem;
        font-size: 0.14rem;
        margin:0 auto;
        width:1.3rem;
        padding:0;
    }



    .date_list{
        height: 0.5rem;
        text-align: center;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.5rem
    }
    .date_list span{
        margin: 0 0.4rem;
    }
    .lastlt{
        border: none;
    }
    .choosetime{
        display: none;
    }
</style>