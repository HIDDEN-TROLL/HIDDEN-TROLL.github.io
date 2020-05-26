<template>
        <div class="body">
       <!--<div class="left_hr"></div>-->
             <div class="class_mes_div" v-for="(item,index) in tasklist">
                 <div class="class_mes">
                    <div class="d_p_title">
                        <button></button>
                        <span class="today"  >  {{item.today}}</span><span class="person">{{item.person}}</span>
                    </div>
                    <div class="hr_b"></div>
                    <div class="subjects">
                        <span class="sub_title">{{item.subject}}</span>  <span class="time_list">{{item.datelist}}</span>
                        <div class="comment">
                            <div  v-for="commentlist in item.commentlist">
                                <span>{{commentlist.comment}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="hr_b"></div>
                    <div class="task">
                        <div  v-for="tasklist in item.tasklist">
                            <span >{{tasklist.task}}</span><br>
                        </div>
                    </div>
                    <div class="parents_v_img_div">
                        <img class="parents_v_img "  :src=imglist.sub_p  v-for="imglist in item.imglist">
                    </div>
                 </div>
             </div>
         </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                tasklist:[
                    {
                        today:'今日 12.00',person:'发布人：林小黑',
                        subject:'#语文#数学',datelist:'2019-03-03    0.816',
                        commentlist:[
                            {comment:'我发现你又进步了',}, {comment:'我发现你又进步了???',}
                        ],
                        tasklist:[
                            {task:'1、背诵语文古诗词一篇',},{task:'1、背诵语文古诗词一篇',},{task:'1、背诵语文古诗词一篇',}
                        ],
                        imglist:[
                            {sub_p: require('../../../../assets/img/teachers/Mine/head.jpg')},
                            {sub_p: require('../../../../assets/img/teachers/Mine/head.jpg')},
                            {sub_p: require('../../../../assets/img/teachers/Mine/head.jpg')}
                        ]
                    },
                    {
                        today:'2019-03-09 1100',person:'发布人：林小黑',
                        subject:'#语文#数学',datelist:'2019-03-03    0.816',
                        commentlist:[
                            {comment:'我发现你又进步了',}, {comment:'我发现你又进步了???',}, {comment:'我发现你又5151进步了???',}
                        ],
                        tasklist:[
                            {task:'1、背诵语文古诗词一篇',}
                        ],
                        imglist:[{sub_p: require('../../../../assets/img/teachers/Mine/head.jpg')},
                            {sub_p: require('../../../../assets/img/teachers/Mine/head.jpg')}
                        ]
                    }

                ],
            }
        },
        component: {
            //someComponent
        }
    }
</script>

<style scoped>
    .body{
        background-color: #F3F7F8;
        font-family:PingFangSC-Regular;
        border-left: solid 1px #CACACA;
        font-size: 0.14rem;
        margin: 0 0.2rem ;
    }
    .class_mes_div{
        margin-top: 0.1rem;
        width: 100%;
        background-color: white;
    }
    .class_mes{
        margin-left: 0.2rem;
        width: 94%;
    }


    .hr_b{
        width: 100%;
        border-bottom: solid 1px #EEEEEE;
    }
    .subjects{
        margin: 0.2rem 0;
    }
    .comment{
        margin-top: 0.15rem;
    }
    .parents_v_img_div{
        margin-top: 0.15rem;
    }
    .parents_v_img{
        margin: 0 0.1rem 0.1rem 0;
        width: 0.9rem;
        height: 0.9rem;
    }


    /*文字样式*/
    .d_p_title{
        line-height: 0.55rem;
        /*margin: 0.2rem 0;*/
        /*>>>:last-child{*/
            /*display: none;*/
         /*}*/
    }
    .d_p_title button{
        background-color: white;
        border: solid 1px #3770fb;
        width: 0.15rem;
        height: 0.14rem;
        position: relative;
        right: 0.28rem;
        color: white;
        border-radius: 100%;
    }
    .today{
        margin-left: -0.2rem;
        font-family:MicrosoftYaHei;
        color:rgba(55,112,251,1);
        line-height:19px;
        :first-child {
            color: #000;
        }
    }
    .person{
        float: right;
        color:rgba(102,102,102,1);
        /*line-height:19px;*/
    }
    .sub_title{
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:20px;
    }
    .time_list{
        float: right;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:20px;
    }
    .comment span{
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:20px;
    }
    .task{
        margin-top: 0.15rem;
    }
    .task span{

        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:20px;
    }
</style>
