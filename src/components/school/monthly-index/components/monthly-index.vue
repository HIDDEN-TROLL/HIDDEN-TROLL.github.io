<template>
    <div class="workbenck">
        <div class="search_fun_div" >
            <div class="search_fun">
                <div class="search_title">
                    <div class="search_title_name">
                            <span>
                             学生
                            </span>
                    </div>
                </div>
                <div class="search_title_r"></div>
                <div class="message">
                    <div v-if="month.student">
                               <span>
                                   <span style="margin-right: 0.3rem;">新增<a style="color:#84C225">{{month.student.addNum}}</a>名学生</span>
                                   删除<a style="color:#84C225">{{month.student.deleteNum}}</a>名学生
                                <br>
                               </span>
                    </div>
                </div>
                <div class="search_title_r_b"></div>
            </div>

            <div class="search_fun">
                <div class="search_title">
                    <div class="search_title_name">
                        <span>
                         安全
                        </span>
                    </div>
                </div>
                <div class="search_title_r"></div>
                <div class="message" v-if="month.safety">
                    <div>
                           <span   >
                               为<a style="color:#FA6400">{{month.safety.parentCount}}</a>名家长完成<a style="color:#FA6400">{{month.safety.number}}</a>次报平安
                            <br>
                           </span>
                    </div>
                    <div class="delete">
                            <span    >
                              共{{month.safety.leaveStuCount}}名学生请假{{month.safety.leaveNum}}次 <br>
                            </span>
                    </div>
                </div>
                <div class="search_title_r_b"></div>
            </div>

            <div class="search_fun">
                <div class="search_title">
                    <div class="search_title_name">
                        <span>
                         小红花
                        </span>
                    </div>
                </div>
                <div class="search_title_r"></div>
                <div class="message" v-if="month.safflower">
                    <div>
                           <span   >
                               为<a style="color:#FA6400">{{month.safflower.stuCount}}</a>名学生记录日常表现共<a style="color:#FA6400">{{month.safflower.number}}</a>次
                            <br>
                           </span>
                    </div>
                    <div class="delete">
                            <span    >
                               <span>奖励 {{month.safflower.rewardNum}} 朵红花</span>
                                扣除 {{month.safflower.deductNum}} 朵红花 <br>
                            </span>
                        <span    >
                               为 {{month.safflower.convertCount}} 名学生兑换礼品
                                 {{month.safflower.convertNum}} 次<br>
                            </span>
                    </div>
                </div>
                <div class="search_title_r_b"></div>
            </div>

            <div class="search_fun">
                <div class="search_title">
                    <div class="search_title_name">
                        <span>
                         作业
                        </span>
                    </div>
                </div>
                <div class="search_title_r"></div>
                <div class="message" v-if="month.work">
                    <div>
                           <span   >
                               检查<a style="color:#53ACF8">{{month.work.completeStuCount}}</a>名学生完成<a style="color:#53ACF8">{{month.work.completeNumber}}</a>次作业
                            <br>
                           </span>
                        <span   >
                               为<a style="color:#53ACF8">{{month.work.detailedStucount}}</a>名学生录入<a style="color:#53ACF8">{{month.work.detailedNumber}}</a>次作业详情
                            <br>
                           </span>
                    </div>
                </div>
                <div class="search_title_r_b"></div>
            </div>

            <div class="search_fun">
                <div class="search_title">
                    <div class="search_title_name">
                        <span>
                         成绩
                        </span>
                    </div>
                </div>
                <div class="search_title_r"></div>
                <div class="message" v-if="month.score">
                    <div>
                           <span   >
                               为<a style="color:#56C8C3">{{month.score.stuCount}}</a>名学生录入档案<a style="color:#56C8C3">{{month.score.number}}</a>次
                            <br>
                           </span>
                    </div>
                </div>
                <div class="search_title_r_b"></div>
            </div>

            <div class="search_fun">
                <div class="search_title">
                    <div class="search_title_name">
                        <span>
                         社区
                        </span>
                    </div>
                </div>
                <div class="search_title_r"></div>
                <div class="message" v-if="month.communtiy">
                    <div>
                           <span   >
                             发布<a style="color:#F5A623">{{month.communtiy.count}}</a>名家长互动社区
                            <br>
                           </span>
                    </div>
                    <div class="delete">
                            <span   >
                              共获{{month.communtiy.StuCount}}名家长{{month.communtiy.number}}次赞<br>
                            </span>
                    </div>
                </div>
                <div class="search_title_r_b"></div>
            </div>

            <div class="search_fun">
                <div class="search_title">
                    <div class="search_title_name">
                        <span>
                         教师
                        </span>
                    </div>
                </div>
                <div class="search_title_r"></div>
                <div class="message" v-if="month.teacher">
                    <div>
                           <span   >
                            总贡献<a style="color:#B620E0">{{month.teacher.totalContribution}}</a>平均贡献<a style="color:#B620E0">{{month.teacher.averageContribution}}</a>
                            <br>
                           </span>
                    </div>
                    <div class="delete">
                            <span    >
                              超过 {{month.teacher.avgMoreThanPercentage}} %的机构<br>
                            </span>
                    </div>
                </div>
                <div class="search_title_r_b"></div>
            </div>
        </div>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { CampusMonthindex } from '@/api/school/monthly-index'
    //import someComponent from './someComponent'
    export default {
        name: "",
        data(){
            return {
                month:{},
                date:this.$route.query.date,
            }
        },
        components: {
            //someComponent
        },
        methods:{
            getList() {
                this.date=this.$route.query.date
                CampusMonthindex(this.date).then(res => {
                    if (res.status === 200){
                        this.month = res.data.data;
                    }
                }).catch(() => {
                    throw new Error("异常!")
                })
            }
        },
        mounted() {
            this.getList()
        },
    }
</script>

<style scoped>
    *{
        font-size: 0.14rem;
    }
    .workbenck{
        margin-top: 0.15rem;
        background-color: #F3F7F8;
        float: left;
    }
    .search_fun_div{
        margin-top: 0.1rem;
    }
    .search_fun{
        width: 100%;
        background-color: white;
        height: 0.8rem;
        float: left;
    }
    .search_title{
        /*!*margin: 0.4rem 0.25rem 0.4rem 0.25rem;*/
        float: left;
        width:0.8rem;
        height:0.2rem;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem;
    }
    .search_title_name{
        text-align: center;
        margin: 0.3rem 0  0.3rem 0 ;
    }
    .search_title_r{
        margin:0.1rem 0 0.1rem 0;
        height:77%;
        float: left;
        border-left: solid 0.02rem #EEEEEE;
    }
    .search_title_r_fun{
        margin-left:0.2rem;
        float: left;
    }
    .search_title_r_fun_s{
        font-size:0.14rem;
    }
    .search_title_r_fun_img{
        width:0.24rem;
        margin: 0 auto;
        line-height: 0;
    }
    .search_title_r_fun_img img{
        width:0.24rem;
        height:0.24rem;
        margin-bottom: 0.06rem;
    }
    .search_title_r_b{
        background-color:#EEEEEE ;
        width:90%;
        margin: 0.78rem auto;
        border:solid #EEEEEE 0.01rem;
    }
    .van-cell{
        padding: 0.08rem 0rem 0.08rem 0.2rem;
    }
    .van-cell__left-icon{
        margin-right: 0.17rem;
    }

    /*学生//----------------------------*/
    .message{
        margin: 0 0 0 0.2rem;
        float: left;
    }
    .search_fun:nth-child(1)>>>.message
    {
        margin: 0.3rem 0.2rem;
    }
    .search_fun:nth-child(1)>>>.search_title_name
    {
        color:#84C225 ;
    }

    /*//安全*/

    .search_fun>>>.delete
    {
        color:#999999;
    }

    .search_fun:nth-child(2)>>>.message
    {
        margin: 0.18rem 0.2rem;
    }
    .search_fun:nth-child(2)>>>.search_title_name
    {
        color:#FA6400;
    }

    .search_fun:nth-child(3)>>>.message
    {
        margin: 0.1rem 0.2rem;
    }
    .search_fun:nth-child(3)>>>.search_title_name
    {
        color:#FA6400;
    }

    /*作业--------------------------*/

    .search_fun:nth-child(4)>>>.message
    {
        margin: 0.22rem 0.2rem;
    }
    .search_fun:nth-child(4)>>>.search_title_name
    {
        color:#53ACF8;
    }

    /*成绩//----------------------------*/

    .search_fun:nth-child(5)>>>.message
    {
        margin: 0.35rem 0.2rem;
    }
    .search_fun:nth-child(5)>>>.search_title_name
    {
        color:#56C8C3;
    }
    /*社区//----------------------------*/

    .search_fun:nth-child(6)>>>.message
    {
        margin: 0.25rem 0.2rem;
    }
    .search_fun:nth-child(6)>>>.search_title_name
    {
        color:#F5A623;
    }
    /*教师//----------------------------*/

    .search_fun:nth-child(7)>>>.message
    {
        margin: 0.25rem 0.2rem;
    }
    .search_fun:nth-child(7)>>>.search_title_r_b
    {
        margin: 0.78rem 0 0.5rem  0;
        border: solid white 0.01rem;
    }
    .search_fun:nth-child(7)>>>.search_title_name
    {
        color:#B620E0;

    }
    search_title_r_b:nth-child(7){
        display: none;
    }


</style>
