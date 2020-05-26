<template>
    <div class="lunch-break">
        <!--件午休情况、午休纪律 表格组件-->
        <!--当前组件需要的数据类型 参照 data 函数中 d 对象-->
        <!--由于后台返回数据的格式  需要知道当前 用户 想要获取的是那种类型的 数据 目前 只有  午休情况  与 午休记录 用type 标识 分别 为 1， 2-->
        <div class="table-list" :style="computHeight">
            <div class="title-left">
                <span class="title" v-for="(value, key) in lunchBreak.comments">{{value.name}}</span>
                <span class="title date-title">情况/日期</span>
            </div>
            <div class="content-right">
                <div class="scroll-box" :style="computChildern">
                    <div class="w-box" :style="computWidth">
                        <div class="top-part">
                            <div class="hori" v-for="(value1,key1,index1) in lunchBreak.date">
                                <span class="linght"  v-for="(value,key,index) in lunchBreak.comments"><span v-if="goods(value1.date,value.cId,lunchBreak.type)"><van-icon name="success" /></span></span>
                            </div>
                        </div>
                        <div class="bottom-part">
                            <div class="date" v-for="value in lunchBreak.date">
                                <span class="week">{{value.week}}</span><br/>
                                <span class="time">{{value.date}}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
    import {Icon} from 'vant'
    export default {
        name: "break-table",
        props:{
          lunchBreak:{
              type:Object
          }
        },
        components:{
            [Icon.name]:Icon
        },
        data(){
            return{
                wid:'',
               /* d:{
                    type:1,
                    "name":"午休表现",
                    comments:[
                        {
                            "cId":1,
                            "name":"正常"
                        },
                        {
                            "cId":2,
                            "name":"学习"
                        },
                        {
                            "cId":3,
                            "name":"阅读"
                        },
                        {
                            "cId":4,
                            "name":"吃饭"
                        },
                        {
                            "cId":5,
                            "name":"嘻嘻"
                        }
                    ],
                    "date":[
                        {
                            "date":"2019-03-01",
                            "week":"周五"
                        },
                        {
                            "date":"2019-03-02",
                            "week":"周六"
                        },
                        {
                            "date":"2019-03-03",
                            "week":"周一"
                        },
                        {
                            "date":"2019-03-04",
                            "week":"周二"
                        },
                        {
                            "date":"2019-03-05",
                            "week":"周三"
                        },
                        {
                            "date":"2019-03-06",
                            "week":"周四"
                        },
                        {
                            "date":"2019-03-07",
                            "week":"周五"
                        },
                        {
                            "date":"2019-03-08",
                            "week":"周六"
                        },
                        {
                            "date":"2019-03-09",
                            "week":"周日"
                        },
                    ],
                    "stuDetaile":[
                        {
                            "2019-03-01":{
                                "oneCid":1,
                                "twoCid":2
                            },
                        },
                        {
                            "2019-03-02":{
                                "oneCid":4,
                                "twoCid":2
                            },
                        },
                        {
                            "2019-03-03":{
                                "oneCid":2,
                                "twoCid":2
                            },
                        },
                        {
                            "2019-03-04":{
                                "oneCid":5,
                                "twoCid":2
                            },
                        }
                    ]
                }*/
            }
        },
        computed:{
            goods(date,id, type){
                return  (date,id, type)=> {
                    let b = false;
                    for (let item of this.lunchBreak.stuDetaile){
                        for(let key in item){
                            // 判断是午休情况
                            if (key === date && type === 1 && item[key].oneCid && item[key].oneCid === id){
                                b = true;
                                return true;
                            }else if (key === date && type === 2 && item[key].twoCid && item[key].twoCid === id){//午休纪律
                                b = true;
                                return true;
                            }
                        }
                    }
                    return b;
                }
            },
            computWidth:{
                get(){
                    return {width:this.lunchBreak.date.length*0.78+'rem'}
                },
                set(val){
                    this.wid = val
                }
            },
            computHeight:{
                get(){
                    return {height:this.lunchBreak.comments.length*0.3+0.49+'rem'}
                }
            },
            computChildern:{
                get(){
                    return {height:this.lunchBreak.comments.length*0.3+0.7+'rem'}
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .lunch-break{
        font-size: 0;
        width: 100%;
        padding-left: 0.16rem;
        box-sizing: border-box;
        .table-list{
            width: 100%;
            overflow: hidden;
            .title-left{
                width: 0.78rem;
                float: left;
                .title{
                    display: block;
                    font-size: 0.12rem;
                    width: 100%;
                    height: 0.3rem;
                    color: #666;
                    text-align: center;
                    line-height: 0.3rem;
                    border: solid #dcdcdc;
                    border-width: 0 0.01rem 0.01rem 0.01rem;
                    box-sizing: border-box;
                }
                .title:first-child{
                    border-top-width: 0.01rem;
                }
                .date-title{
                    line-height:0.49rem;
                    height: 0.49rem;
                }
            }
            .content-right{
                float: left;
                width: 2.81rem;
                height: 100%;
                overflow: hidden;
                box-sizing: border-box;
                .scroll-box{
                    width: 100%;
                    overflow-x: scroll;
                    .w-box{
                        .top-part{
                            width: 100%;
                            /*height: 0.3rem;*/
                            overflow: hidden;

                            box-sizing: border-box;
                            .hori{
                                float: left;
                                width: 0.78rem;
                                /*height: 0.29rem;*/

                                box-sizing: border-box;
                                .linght{
                                    display: block;
                                    width: 100%;
                                    height: 0.3rem;
                                    line-height: 0.3rem;
                                    font-size: 0.16rem;
                                    color: #84C225;
                                    text-align: center;
                                    border:solid #dcdcdc;
                                    border-width: 0 0.01rem 0.01rem 0;
                                    box-sizing: border-box;
                                    /*position: relative;*/
                                    /*right: 0.01rem;*/
                                }
                                .linght:first-child{
                                    border-top: 0.01rem solid #dcdcdc;
                                }
                            }

                        }
                        .bottom-part{
                            width: 100%;
                            overflow: hidden;
                            .date{
                                float: left;
                                text-align: center;
                                width: 0.78rem;
                                height: 0.49rem;
                                padding: 0.06rem 0;
                                /*line-height: 0.18rem;*/
                                border: solid #dcdcdc;
                                border-width: 0 0.01rem 0.01rem 0;
                                box-sizing: border-box;
                                /*position: relative;*/
                                /*right: 0.01rem;*/
                                span{
                                    font-size: 0.12rem;
                                    color: #666;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>