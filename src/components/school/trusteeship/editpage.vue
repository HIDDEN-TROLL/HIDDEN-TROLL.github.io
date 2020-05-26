<template>
    <div class="bgc">
        <van-nav-bar
            title="阳扬家教园"
            left-text="返回"
            right-text=""
            left-arrow

    />

        <div class="div_bgc">
            <div class="Propaganda_div">
                <div class="title">宣传图片</div>
                <div class="add">+</div>
            </div>
        </div>

        <div class="div_bgc">
            <div class="introduce_div">
                <div class="title">结构介绍</div>
                <div class="enterintroduce">
                <textarea placeholder="请输入机构的介绍..."></textarea>
                </div>
            </div>
        </div>

        <div class="div_bgc">
            <div class="team_div">
                <div class="title">教师团队</div>
                <div class="choice">
                    <van-cell title="请选择教师的数量" is-link value="请选择" />
                </div>
                <div v-for="(teacher,index) in teacher"  :key="index">
                    <div class="team_name">
                        <div>{{teacher.name}}<input type="text" placeholder="请输入老师姓名"> </div>
                    </div>
                    <div class="team_img">
                        <div class="team_img_bor">
                            <div class="choice_title">老师照片</div>
                            <div class="team_add" style="float: left;">+</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="div_bgc">
            <div class="food_div">
                <div class="title">食谱饮食</div>
                <div class="day">
                    <van-tabs  >
                        <van-tab title="周一"><Editfood></Editfood></van-tab>
                        <van-tab title="周二">2</van-tab>
                        <van-tab title="周三"><Editfood></Editfood></van-tab>
                        <van-tab title="周四"><Editfood></Editfood></van-tab>
                        <van-tab title="周五"><Editfood></Editfood></van-tab>
                        <van-tab title="周六"><Editfood></Editfood></van-tab>
                        <van-tab title="周日"><Editfood></Editfood></van-tab>
                    </van-tabs>
                </div>
            </div>
        </div>

        <div class="div_bgc">
            <div class="Propaganda_div">
                <div class="address">
                     <div class="title">机构地址</div>
                     <div class="enteraddress"><input type="text" placeholder="请输入机构地址"></div>
                </div>
                <div class="location">
                    <van-cell title="点我为机构地址定位" icon="location" />
                </div>
            </div>
        </div>

        <div class="div_bgc">
            <div class="wechat_div">
                <div>上传联系人微信二维码</div>
                <div class="wechat_add">+</div>
            </div>
        </div>

        <Footer :event-arr="arr" v-on:commenEvent="parent"></Footer>



    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import { Cell, CellGroup } from 'vant';
    import { Tab, Tabs } from 'vant';
    import { Icon } from 'vant';
    import Editfood from './components/editpage-food';
    import Footer from './components/footer-operate-btn'

    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                teacher:[{name:'老师姓名'},{name:'老师姓名'}],
                arr:[{title: '预览',type:1},{title: '确定',type:1}]
            }
        },
        components: {
            [NavBar.name]:NavBar,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Icon.name]:Icon,
            Editfood:Editfood,
            Footer:Footer
            //someComponent
        },
        methods:{
            parent(){

            }
        }
    }
</script>

<style scoped>
    *{
        font-size: 0.14rem;
    }
    .bgc{
        margin-bottom: 0.4rem;
        float: left;
        background-color: #F3F7F8;

    }
    .div_bgc{
        background-color: white;
        margin-top: 0.1rem;
        float: left;
        width: 100%;
    }
    .div_bgc:nth-child(2){
        margin-top:0;
    }
    .title{
        font-weight: 700;
    }
    .van-nav-bar{
        background-color: #3770FB;
    }
    .van-nav-bar__title{
        color: #ffffff;
    }
    .van-nav-bar__text{
        color: white;
    }
    .van-nav-bar .van-icon{
        color: white;
    }

    .add{
        margin: 0.14rem 0 0rem 0.1rem;
        color: #D6D6D6;
        line-height:0.3rem;
        font-size: 0.3rem;
        text-align: center;
        width: 0.3rem;
        height: 0.3rem;
        border: dashed 1px #D6D6D6;
    }

    .Propaganda_div{
        padding : 0.15rem 0.15rem;
    }
    .Propaganda_div input {
        border:none;
    }
    .address{
        border-bottom: solid 1px #EEEEEE;
    }
    .enteraddress{
        margin: 0.1rem 0 0.1rem 0;
    }
    .location{
        margin-top: 0.15rem;
        color: #D80000;
    }
    .location i{
        margin-right:0.1rem ;
        font-size: 0.24rem;
        color: #D80000;
    }
    .location span{
        line-height: 0.24rem;
        color: #D80000;
    }
    .location>>>.van-cell{
        padding: 0;
    }

        .introduce_div{
            /*margin-top: 0.1rem;*/
            padding: 0.15rem 0.15rem;
        }
        .enterintroduce textarea{
            padding: 0;
            margin-top: 0.1rem;
            width: 90%;
            border: none;
            /*border: none;*/
        }
    textarea::-webkit-input-placeholder{
        color:#CACACA;
    }
        .choice{
            border-bottom: solid 1px #EEEEEE;
        }
        .choice_title{
            float: left;
        }
    .team_img_bor{
        border-bottom: solid 1px #EEEEEE;
        float: left;
        width: 100%;
    }
    .team_div{
        /*margin-top: 0.1rem;*/
        padding: 0.15rem 0.15rem;
    }
    .team_div>>>.van-cell{
        padding: 0;
        line-height: 0.45rem;
    }
    .team_div>>>i{
        padding: 0;
        line-height: 0.45rem;
    }
    .team_add{
        margin: 0.15rem 0 0.3rem 0.2rem;
        color: #D6D6D6;
        line-height:0.3rem;
        font-size: 0.3rem;
        text-align: center;
        width: 0.3rem;
        height: 0.3rem;
        border: dashed 1px #D6D6D6;
    }
    .team_name{
        line-height: 0.45rem;
        border-bottom: dashed 1px #EEEEEE;
    }
    .team_name input{
        border: none;
        margin-left: 0.2rem;
     }
    .team_img{
        line-height: 0.45rem;
        border-bottom: solid 1px #EEEEEE;
    }

        .food_div{
            padding: 0.15rem;
        }
        .food_div>>>.van-tab{
            flex-basis: 12% !important;
            padding: 0;
            margin-right: 0.1rem;
        }
        .food_div>>>.van-tabs__line{
            width: 0.3rem !important;
            left: -5px;
            background-color: #3770FB;
        }
        .food_div>>>.van-tab--active{
            color: #3770FB;
        }

    .wechat_div{
        padding: 0.15rem;
    }
    .wechat_add{
        margin: 0.1rem 0 0.3rem 0;
        color: #D6D6D6;
        line-height:0.3rem;
        font-size: 0.3rem;
        text-align: center;
        width: 0.3rem;
        height: 0.3rem;
        border: dashed 1px #D6D6D6;
    }

    .operate-btn{
        z-index:999;
    }

    .van-cell__left-icon, .van-cell__right-icon{
        height: 0.24rem;
        line-height: 0.24rem;
    }

</style>

