<template>
    <!--考勤报表学生详情-->
    <div id="student-detail">
        <div class="go-back">
            <van-nav-bar
                    :title="student.stuName"
            />
        </div>

        <div class="head_div"  v-if="student.source !='教师点名' ">
            <img :src="student.imgUrl" @click="preview()">
        </div>

        <div style="line-height: 0.4rem;text-align: center;margin-top: 0.5rem" v-if="student.source === '教师点名'">
            <div v-if="student.temperature>0">
                <a style="font-weight: 700">体温：</a> {{student.temperature}}{{student.temperatureStatus}}
            </div>
            <div >
                <span style="font-weight: 700">打卡时间：</span>
                <span style="color: darkgrey;margin-right: 0.3rem">{{student.time}}</span>
                <span style="color: darkgrey">{{student.date}}</span>
            </div>
            <div>
                <span style="font-weight: 700">考勤类型：</span>{{student.type}}
            </div>
            <div>
                <span style="font-weight: 700">信息来源：</span>{{student.source}}
            </div>
            <div >
                <span style="font-weight: 700">注：</span>由教师点名仅有信息提醒，没有孩子的萌照哦~
            </div>
        </div>

        <div class="mes" v-else>
            <div v-if="student.temperature > 0">
                <a style="font-weight: 700">体温：</a> {{student.temperature}}{{student.temperatureStatus}}
            </div>
            <div >
                <span style="font-weight: 700">打卡时间：</span>
                <span style="color: darkgrey;margin-right: 0.3rem">{{student.time}}</span>
                <span style="color: darkgrey">{{student.date}}</span>
            </div>
            <div>
                <span style="font-weight: 700">考勤类型：</span>{{student.type}}
            </div>
            <div>
                <span style="font-weight: 700">信息来源：</span>{{student.source}}
            </div>
        </div>

        <FooterBtn :event-arr="student.temperatureConfig === true ? btnText : btnTextSe" v-on:commenEvent="operateBtn" ></FooterBtn>

    </div>
</template>

<script>
    import { Tab, Tabs, NavBar, Row, Col, List, Popup, DatetimePicker, Field, ImagePreview   } from 'vant';
    import { getStudentSignInPush } from '@/api/school/attendance-sheet';
    import { getParamFromUrlAndRoute } from '@/utils'
    import FooterBtn from "../../common/footer-operate-btn";

    export default {
        name: "student-signinpush",
        components: {
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
            [NavBar.name]: NavBar,
            [Row.name]: Row,
            [Col.name]: Col,
            [List.name]: List,
            [Popup.name]: Popup,
            [DatetimePicker.name]: DatetimePicker,
            [Field.name]: Field,
            [ImagePreview.name]: ImagePreview,
            FooterBtn:FooterBtn

        },
        data(){
            return {
                student:[],
                from:'template',
                templateId:0,
                btnText:[
                    {
                        type:1,
                        title:'考勤记录'
                    },
                    {
                        type:2,
                        title:'体温记录'
                    }
                ],
                btnTextSe:[
                    {
                        type:1,
                        title:'考勤记录'
                    },
                ],
            }
        },
        methods:{
            operateBtn(type){
                if(type === 1){
                    this.$router.push({name:'AttendanceSheetStudentDetail',query:{templateId:this.templateId}})
                }else if (type === 2 ){
                    this.$router.push({name:'ParentTemperature'})
                }
            },
            GetStudentMes(){
                const template_id = getParamFromUrlAndRoute('template_id', this.$router)
                if(this.$route.query.template_id || template_id) {
                    this.templateId = template_id
                    getStudentSignInPush(this.from,template_id)
                        .then(res => {
                            this.student = res.data.data;
                        }).catch(() => {
                        throw new Error("手动点评获取学生列表异常!")
                    })
                }else{
                    alert("找不到学生id")
                }
            },
            //图片预览
            preview() {
                ImagePreview({
                    images: [
                        this.student.imgUrl
                    ],
                });
            },
            onClickLeft(){

            }
        },
        mounted() {
            this.GetStudentMes()
        }
    }
</script>

<style scoped lang="less">
    *{
        font-size: 0.14rem;
    }
    .head_div{
        width:2rem;
        height:2rem;
        margin: 0.7rem auto;
    }
    .head_div img{
        width: 100%;
        height: 100%;
      object-fit: contain;
    }
    .mes{
        margin-left: 0.5rem;
        line-height: 0.4rem;
    }
</style>
