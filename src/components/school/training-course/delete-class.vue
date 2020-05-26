<template>
    <div id="attendance-type">
        <div class="go-back">
            <van-nav-bar
                    title="删除培训班"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div v-for="(item, index) in TrainingList" :key="index" style="line-height: 0.5rem" class="content">
            <van-row >
                <van-col span="2">
                    <span>{{index+1}}</span>
                </van-col>
                <van-col span="9">
                    <span>{{item.name}}</span>
                </van-col>
                <van-col span="9" style="line-height: 0.25rem;text-align: left">
                    <a  v-for="(item2,index2) in item.teachers" :key="index2">
                                    <span class="num" v-if="index2 === 0">
                                        教师：{{item2.name}}
                                    </span></a><br>
                    <span class="num">{{item.studentCount}}位学生  {{item.teacherCount}}位老师</span>
                </van-col>
                <van-col span="4">
                    <van-checkbox-group v-model="result">
                        <van-checkbox :name="item.id"/>
                    </van-checkbox-group>
                </van-col>
            </van-row>
        </div>
        <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
    </div>
</template>

<script>
    import { NavBar, Icon, Row, Col, Toast, Checkbox, CheckboxGroup } from 'vant';
    import FooterBtn from '../../common/footer-operate-btn'
    import { deleteAttendanceType, getAttendanceType } from '@/api/school/attendance-type-manage'

    import { getTrainingList } from '@/api/school/training-course'
    import { deleteClass } from '@/api/school/training-course'

    export default {
        name: "attendance-time",
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Row.name]: Row,
            [Col.name]: Col,
            [Toast.name]: Toast,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            FooterBtn: FooterBtn,
        },
        data() {
            return {
                //定义页面固定底部按钮
                TrainingList:[],
                btnText: [
                    {
                        type: 2,
                        title: '取消',
                    },
                    {
                        type: 1,
                        title: '确定删除',
                    },
                ],
                //考勤类型列表
                attendanceList: [],
                result: [],
            }
        },
        methods: {
            // 获取班级列表
            getTrainingListFun() {
                this.$loading();
                getTrainingList()
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            this.TrainingList = res.data.data
                            this.$loadingHide()
                        }
                    }).catch(() => {
                    throw new Error("异常！")
                })
            },
            onClickLeft() {
                this.$router.back(-1)
            },
            // 底部按钮
            operateBtn(type) {
                //console.log(type)
                if (type === 1) {//确定删除
                    if (this.result.length === 0) {
                        Toast.fail('未选择班级')
                    } else {
                        this.$dialog.confirm({
                            title: '提示',
                            message: '确认删除选中的班级？',
                        }).then(() => {
                            this.delAttendance();
                        }).catch(() => {
                        });
                    }
                } else if (type === 2) {//取消
                    this.$router.back(-1)
                }
            },
            delAttendance() {
                console.log(this.result)
                this.result.forEach(id => {
                    deleteClass(id)
                        .then(res => {
                            if (res.data.meta && res.data.meta.code === 0) {
                                Toast.success('删除成功')
                                this.getTrainingListFun()
                            }
                        }).catch(() => {
                        throw new Error("异常！")
                    });
                })
            },
        },
        created() {
            this.getTrainingListFun()
        },
    }
</script>

<style scoped lang="less">
    #attendance-type {
        margin-bottom: 0.35rem;
        font-size: 0;
        background-color: #fff;

        .go-back {
            .van-nav-bar {
                background-color: #3770FB;

                .van-icon {
                    font-size: 0.22rem;
                    color: #fff;
                }

                .van-nav-bar__text {
                    font-size: 0.16rem;
                    line-height: 0.22rem;
                    color: #fff;
                    font-weight: 400;
                }

                .van-nav-bar__title {
                    color: #fff;
                    font-weight: 400;
                }
            }
        }

        .content {
            font-size: 0.14rem;
            color: #999;
            text-align: center;
            background-color: white;
            padding: 0.1rem;
            border-bottom:solid 10px #f6f6f6;
            .list {
                background-color: #F3F7F8;

                .item {
                    height: 0.71rem;
                    width: 100%;
                    margin-bottom: 0.1rem;
                    background-color: #fff;
                    overflow: hidden;

                    .commen {
                        float: left;
                        height: 100%;
                        position: relative;
                        text-align: center;
                    }

                    .name {
                        width: 1rem;

                        span {
                            font-size: 0.14rem;
                            color: #666;
                            line-height: 0.2rem;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                    }

                    .time {
                        width: 2.45rem;

                        .comprehensive {
                            width: 100%;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);

                            p {
                                width: 100%;
                                text-align: center;
                                line-height: 0.2rem;

                                .title {
                                    font-size: 0.14rem;
                                    color: #666;
                                }

                                .num {
                                    font-size: 0.14rem;
                                    color: #999;
                                    margin-left: 0.08rem;
                                }
                            }
                        }
                    }

                    .jump {
                        width: 0.65rem;
                        text-align: center;

                        .van-checkbox-group {
                            font-size: 0.14rem;
                            color: #666;
                            line-height: 0.2rem;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                    }
                }
            }
        }
    }
    /deep/.van-checkbox__icon .van-icon{
        border:1px solid #3770fb
    }
    /*底部按钮颜色*/
    /deep/ #bottom1{
        background: #FF6666;
    }
    /deep/.van-checkbox__icon--checked .van-icon{
        border-color: #FF6666;
        background-color: #FF6666;
    }
</style>
