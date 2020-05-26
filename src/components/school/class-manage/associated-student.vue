<template>
    <div id="associated-student">
        <!--考勤关联学生-->
        <div class="go-back">
            <van-nav-bar
                    title="关联学生"
                    left-text="返回"
                    left-arrow
                    @click-left="$router.back()"
            />
        </div>
        <div class="total">
            <span>共{{student}}位学生</span>
        </div>
        <div class="bg"></div>
        <div class="list">
            <AttendanceStudentList :student-list="studentArr"></AttendanceStudentList>
        </div>
    </div>
</template>

<script>
    import {NavBar, Icon } from 'vant';
    import AttendanceStudentList from '../components/atendance-student-list'
    import { attendanceStudent } from '@/api/school/attendance-type-manage'
    export default {
        name: "associated-student",
        components:{
            [NavBar.name]: NavBar,
            [Icon.name]:Icon,
            AttendanceStudentList:AttendanceStudentList,
        },
        data(){
            return{
                student:0,
                studentArr:[]
            }
        },
        methods:{
            studentList(){
              attendanceStudent(this.$route.query.id, 0, 0)
                .then(res=>{
                    //console.log(res);
                    if (res.data.meta && res.data.meta.code === 0){
                        if (res.data.data && res.data.data.length > 0){
                            this.studentArr = res.data.data
                        }
                    }

                }).catch(()=>{
                    throw new Error("异常")
                })
            }
        },
        created(){
            this.student = this.$route.query.student;
            this.studentList()
        }

    }
</script>

<style scoped lang="less">
    #associated-student{
        font-size: 0;
        background-color: #fff;
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
        .total{
            width: 100%;
            height: 0.48rem;
            line-height: 0.48rem;
            font-size: 0.144rem;
            text-align: center;
            color: #84C225;
            background-color: #fff;
        }
        .bg{
            width: 100%;
            height: 0.1rem;
            background-color: #F3F7F8;
        }
        .list{
            padding: 0.13rem 0.16rem 0;
            box-sizing: border-box;
            ul{
                margin-left: -0.13rem;
            }
        }
    }
</style>
