<template>
    <div id="replace-teacher">
        <!--教师列表-->
        <div class="go-back">
            <van-nav-bar title="更换教师" left-text="返回" left-arrow @click-left="back()"/>
        </div>
        <div class="teacher-list">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <van-checkbox-group v-model="result">
                    <van-cell-group>
                        <van-cell
                                v-for="(item,index) in teacherListArr"
                                :key="index"
                                clickable
                                @click="toggle(item.id)"
                        >
                            <van-row>
                                <van-col span="4">
                                    <div class="awator">
                                        <img :src="item.image" alt="">
                                    </div>
                                </van-col>
                                <van-col span="18">
                                    <div class="info">
                                        <span class="name">{{item.uRealName ? item.uRealName : item.name}}</span>
                                        <span class="num">{{item.cardNo}}</span>
                                    </div>
                                    <div class="info">
                                        <span class="account">账号：{{item.account}}</span>
                                        <span class="bind">绑定状态：{{item.isBind ? '已绑定':'未绑定'}}</span>
                                    </div>
                                    <div class="info">
                                        <span class="vice-class">班级：{{ !Array.isArray(item.classes) || item.classes.length === 0 ? '暂无' : item.classes.map(t => t.name).join('、') }}</span>
                                    </div>
                                </van-col>

                                <van-col span="2">
                                   <span class="radio-box">
                                       <van-checkbox :name="item.id"/>
                                   </span>

                                </van-col>
                            </van-row>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </van-list>
        </div>
        <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
    </div>
</template>

<script>
    import { NavBar, Icon, List, CheckboxGroup, Checkbox, Cell, CellGroup, Row, Col, Toast } from "vant";
    import FooterBtn from '../../../common/footer-operate-btn'
    import { replaceTeacher } from '@/api/school/class-manage'
    import { getTeacherList } from '@/api/school/teacher-manage'
    import { isNumeric } from '@/utils'

    export default {
        name: "replace-teacher",
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [List.name]: List,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Row.name]: Row,
            [Col.name]: Col,
            [Toast.name]: Toast,
            FooterBtn: FooterBtn,
        },
        data() {
            return {
                loading: false,
                finished: false,
                btnText: [
                    {
                        type: 1,
                        title: '确定更换',
                    },
                ],
                page: 1,//当前页
                pageSize: 20,//每页数据
                totalPage: 0,//保存总页数
                teacherListArr: [],
                result: [],
                id:this.$route.query.id,
                teachers:this.$route.query.teachers
            }
        },
        created() {
            if (!isNumeric(this.$route.query.id) || this.$route.query.id <= 0) {
                this.$toast('数据有问题，请重新进入')
                // this.$router.replace({ name: 'ClassManage'})
                this.back()
            }
        },
        methods: {
            back(){
                this.$router.back()
                // this.$router.push({name:'ClassDetails',params:{id:this.id}})
            },
            onLoad() {
                //获取教师列表
                const classId = this.$route.query.id
                getTeacherList({ page: 0 })
                    .then(res => {
                        //console.log(res);
                        this.loading = false;
                        if (res.data.meta && res.data.meta.code === 0) {
                            this.teacherListArr = res.data.data.list;
                            res.data.data.list.forEach(teacher => {
                                if (Array.isArray(teacher.classes) && teacher.classes.some(clazz => clazz.id == classId)) {
                                    this.result.push(teacher.id)
                                }
                            })
                        }
                        for(let item of this.teachers){
                            this.result.push(item.id)
                        }
                        this.finished = true;
                    })
            },
            operateBtn() {
                this.$dialog.confirm({
                    title: '提示',
                    message: '确定更换当前班级的教师？',
                }).then(() => {
                    // on confirm
                    this.replaceTeacher();
                }).catch(() => {
                    // on cancel
                });
            },
            //更换教师
            replaceTeacher() {
                if(this.result.length>0){
                    this.$loading('加载中',null,true)
                    replaceTeacher(this.$route.query.id, { teachers: this.result,type:2 })
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            Toast.success({message:"更换教师成功",position:'middle'});
                            this.back()
                            // this.$router.replace({ name: 'ClassManage'})
                        } else {
                            Toast.fail({message:"更换教师失败",position:'middle'})
                        }
                    })
                    .finally(() => {
                        this.$loadingHide()
                    })
                }else{
                    Toast('请选择教师')
                }
            },
            toggle(teacherId) {
                const index = this.result.indexOf(teacherId)
                if (index >= 0) {
                    this.result.splice(index, 1)
                } else {
                    this.result.push(teacherId)
                }
            },
        },
    }
</script>

<style scoped lang="less">
    #replace-teacher {
        font-size: 0;
        background-color: #fff;

        .go-back {
            .van-nav-bar {
                background-color: #3770fb;

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

        .teacher-list {
            position: relative;

            .awator {
                width: 0.5rem;
                height: 0.5rem;
                margin-top: 0.1rem;

                img {
                    width: 100%;
                    height: 100%;
                    float: left;
                }
            }

            .info {
                display: flex;

                span {
                    flex: 1;
                    font-size: 0.12rem;
                    color: #999;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .name {
                    color: #333;
                }

                .num, .bind {
                    text-align: right;
                }
            }

            .radio-box {
                text-align: right;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
            }
        }
    }
</style>
