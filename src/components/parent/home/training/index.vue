<template>
    <div>

            <div class="go-back">
                <van-nav-bar
                        title="我的培训班"
                        left-text="返回"
                        :right-text="typename"
                        left-arrow
                        @click-left="onClickLeft"
                        @click-right="onClickRight"
                />
            </div>

        <div v-for="(item,index) in ComList" :key="index">
            <div class="body"  v-if="(item.type === 1)">
                <div class="class_box">
                    <span class="comm-person" v-if="item.overdue===1"></span>
                    <span class="text-shcool" v-if="item.overdue===1">已结课</span>
                    <van-row>
                        <van-col span="8"><a style="font-weight: 700;">{{item.name}}</a><br><a style="font-weight: 700;">考勤签到：</a>{{item.attendNumber}}</van-col>
                        <van-col span="8"><a style="font-weight: 700;">总课数：</a>{{item.number}}<br><a style="font-weight: 700;">请假：</a>{{item.leaveNumber}}</van-col>
                        <van-col span="8" style="line-height: 0.4rem;color: #1989fa"><a style="font-weight: 700;">剩余课数:</a>{{item.lessonLast}}
                            <span style="color: black">&#9658;</span>
                        </van-col>
                    </van-row>
                </div>
            </div>

            <div class="body" v-if="(item.type === 2)">
                <div class="class_box">
                    <span class="comm-person" v-if="item.overdue===1"></span>
                    <span class="text-shcool" v-if="item.overdue===1">已结课</span>
                    <van-row>
                        <van-col span="16">
                            <van-row>
                                <van-col span="12"><a style="font-weight: 700;">{{item.name}}</a><br><a style="font-weight: 700;">考勤签到：</a>{{item.attendNumber}}</van-col>
                                <van-col span="12"><a style="font-weight: 700;">总课数：</a>{{item.number}}<br><a style="font-weight: 700;">请假：</a>{{item.leaveNumber}}</van-col>
                            </van-row>
                        </van-col>
                        <van-col span="8" style="line-height: 0.6rem;color: #1989fa"><a style="font-weight: 700;">剩余课数:</a>{{item.lessonLast}}
                                <span style="color: black">&#9658;</span>
                        </van-col>
                    </van-row>
                    <div><a style="font-weight: 700;">上课周数：</a>{{item.weeks}}</div>
                </div>
            </div>
        </div>

        <div>
            <van-actionsheet
                    class="action-sheet"
                    v-model="ChioceType"
                    :actions="actionSheetActions"
                    get-container="#app"
                    cancel-text="取消"
                    @select="onActionSheetSelect"/>

        </div>

    </div>

</template>

<script>
    import { NavBar, Icon, Row, Col, Field, DatetimePicker, Popup, Toast,Tab, Tabs ,Search,Picker,Actionsheet  } from 'vant';
    import { getParentTraining } from '@/api/school/training-course'

    export default {
        name: 'CheckTraining',
        data() {
            return {
                ComList:[],
                ChioceType:false,
                actionSheetActions: [
                    {
                        index: 1,
                        name: '未结课',
                    },
                    {
                        index: 2,
                        name: '已结课',
                    },
                    {
                        index: 3,
                        name: '全部',
                    },
                ],
                typeindex:1,
                typename:'未结课'
            }
        },
        mounted(){
          this.getParentTrainingFun()
        },
        methods:{
            onActionSheetSelect(item){
                this.typeindex = item.index
                this.typename = item.name
                this.ChioceType = false
                this.getParentTrainingFun()
            },
            // 获取培训班排课信息
            getParentTrainingFun() {
                this.$loading()
                getParentTraining(this.typeindex)
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            this.$loadingHide()

                            this.ComList = res.data.data
                        }
                    }).catch(() => {
                    throw new Error("异常！")
                })
            },
            onClickLeft(){
                this.$router.back(-1)
            } ,
            onClickRight(){
                this.ChioceType = true
            }
        },
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Search.name]: Search,
            [Row.name]: Row,
            [Col.name]: Col,
            [Picker.name]: Picker,
            //[Dialog.name]:Dialog,
            [Field.name]: Field,
            [DatetimePicker.name]: DatetimePicker,
            [Popup.name]: Popup,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Toast.name]: Toast,
            [Actionsheet.name]: Actionsheet,

        },
    }
</script>

<style scoped lang="less">
    .body{
        font-size: 0.14rem;
    }
    .no_data {
        text-align: center;
    }
    .title_right{
        text-align: right;
        font-size: 0.12rem;
        color: rgb(25, 137, 250);
        float: right;
        font-weight: 400;
    }
    .class_box{
        border: solid 1px;
        padding: 0.15rem;
        margin: 0.15rem;
        border-radius: 10px;
        line-height: 0.2rem;
    }

    /*.comm-person{*/
        /*!*float: right;*!*/
        /*position: absolute;*/
        /*top: 0;*/
        /*right: 0;*/
        /*width: 0;*/
        /*height: 0;*/
        /*border-color: #3770fb transparent;*/
        /*border-width: 0.58rem 0 0 0.58rem;*/
        /*border-style: solid;*/
    /*} */
    .comm-person{
        /*float: right;*/
              /* float: right; */
              position: relative;
              top: 41px;
              /* right: 0px; */
              left: 272px;
              /* width: 0; */
              /* height: 0; */
              border-color: #3770fb transparent;
              border-width: 0.58rem 0 0 0.58rem;
              border-style: solid;
    }
    .text-shcool{
             position: relative;
            top: -14px;
            left: 240px;
            width: 0.1rem;
            color: white;
            font-size: 0.12rem;
    }
</style>
