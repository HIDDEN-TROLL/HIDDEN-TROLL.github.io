<template>
    <div class="detail-box">
        <div class="go-back">
            <van-nav-bar title="老学生退班" left-text="返回" left-arrow @click-left="back()"/>
        </div>
        <div class="tab">
            <div class="item" @click="showGradeFilter">
                <span>{{currentGradeFilterName}}</span>
                <span class="fonticon">
                  <van-icon name="arrow-down"/>
                </span>
            </div>
        </div>
        <div class="empty-box"></div>
        <div class="student">
            <p class="total">共{{stuNumber}}位学生</p>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div v-for="(item,index) in DeleteList" :key="index">
                    <div class="list-content" v-if="student && ((item.gradeName === ChiocegradeName) || ChiocegradeName =='全部年级')">
                        <van-checkbox-group v-model="result">
                            <van-cell-group>
                                <van-cell @click="toggle(index)">
                                    <div class="item">
                                        <div class="lt">
                                            <img :src="item.image" alt>
                                            <span>
                                              <span class="name">{{item.name}}</span>
                                              <br>
                                            </span>
                                        </div>
                                        <div class="rt">
                                            <p class="grade">
                                                <span class="text">年级：{{item.gradeName}}</span>
                                            </p>
                                        </div>
                                        <div class="chk">
                                            <van-checkbox :name="item.id" ref="checkboxes"/>
                                        </div>
                                    </div>
                                </van-cell>
                            </van-cell-group>
                        </van-checkbox-group>
                    </div>
                </div>
            </van-list>
        </div>
        <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
        <van-actionsheet
                class="action-sheet"
                v-model="actionSheet.show"
                :actions="actionSheet.options"
                get-container="#app"
                cancel-text="取消"
                @select="onActionSheetSelect"/>
    </div>
</template>

<script>
    import { NavBar, Icon, Actionsheet, List, Checkbox, CheckboxGroup, Cell, CellGroup, Toast } from "vant";
    import FooterBtn from '../../../common/footer-operate-btn'
    import { DeleteTraining } from '@/api/school/training-course'

    export default {
        name: "class-detail-box",
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Actionsheet.name]: Actionsheet,
            [List.name]: List,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Toast.name]: Toast,
            FooterBtn: FooterBtn,
        },
        data() {
            return {
                id: this.$route.params.id,
                IdList: this.$route.params.IdList,
                DeleteList: this.$route.params.DeleteList,

                loading: false,
                finished: false,
                show: false,
                result: [],//保存选择的学生id
                btnText: [{ type: 1, title: '确定退班' }],
                actions: [
                    /*{
                      name: "一年级",
                      type: 1
                    },
                    {
                      name: "二年级",
                      type: 2
                    }*/
                ],
                student: [],
                actionSheet: {
                    show: false,
                    options: [],
                    type: 1, // 1年级 2考勤类型
                },
                gradeList: ['全部年级', '一年级','二年级','三年级','四年级','五年级','六年级','初中'],
                gradeIndex: 0,
                attendanceTypeList: [{id:0,name:'全部类型'}],
                attendanceTypeIndex: 0,

                ChiocegradeName:'全部年级',
                stuNumber:''
            };
        },
        mounted(){
            this.DeleteList === undefined ? this.$router.replace({name:'trainingCourse'}) : null

            for(let i=0;i<this.filteredStudentList.length;i++){
                for( let a = 0;a<this.IdList.length;a++){
                    if(this.filteredStudentList[i].id === this.IdList[a]){
                        this.filteredStudentList.splice(i,1)
                    }
                }
            }
        },
        computed: {
            currentGradeFilterName() {
                return this.gradeList[this.gradeIndex]
            },
            filteredStudentList() {
                if (this.gradeIndex == 0 && this.attendanceTypeIndex == 0) {
                    return this.student
                }
                let list = this.student
                if (this.gradeIndex != 0) {
                    list = list.filter(student => student.grade == this.gradeIndex)
                }
                if (this.attendanceTypeIndex != 0) {
                    const attendanceTypeId = this.attendanceTypeList[this.attendanceTypeIndex].id
                    list = list.filter(student => {
                        return student.attendanceTypes.some(type => type.id == attendanceTypeId)
                    })
                }
                for(let i=0;i<this.filteredStudentList.length;i++){
                    for( let a = 0;a<this.IdList.length;a++){
                        if(this.filteredStudentList[i].id === this.IdList[a]){
                            this.filteredStudentList.splice(i,1)
                            return list
                        }
                    }
                }
            },
        },
        methods: {
            back(){
                this.$router.back()
            },
            showGradeFilter() {
                this.actionSheet.show = true
                this.actionSheet.options = this.gradeList.map((name, index) => {
                    return {
                        index, name,
                        className: index === this.gradeIndex ? 'active' : 'non-active',
                    }
                })
                this.actionSheet.type = 1
            },
            onActionSheetSelect(item) {
                if (this.actionSheet.type === 1) {
                    this.gradeIndex = item.index
                } else {
                    this.attendanceTypeIndex = item.index
                }
                this.actionSheet.show = false
                this.ChiocegradeName = item.name

                if(item.index === 0){
                    this.stuNumber = this.DeleteList.length
                }else{
                    this.stuNumber = 0
                    for(let i = 0;i<this.DeleteList.length;i++){
                        this.DeleteList[i].gradeName == this.ChiocegradeName ? this.stuNumber += 1 : null
                    }
                }
            },
            operateBtn() {
                this.$dialog.confirm({
                    title: '提示',
                    message: '学生退班将清空学生在该班级内的考勤记录，是否确定？',
                }).then(() => {
                    // on confirm
                    this.distributionStudent(this.result)
                }).catch(() => {
                    // on cancel
                });
            },
            toggle(index) {
                this.$refs.checkboxes[index].toggle();
            },
            onLoad() {
                this.loading = false;
                this.finished = true;
            },
            //分配学生
            distributionStudent(stu) {
                const data = {}
                if(stu){
                    data.students = stu
                }
                console.log(this.id, data)
                DeleteTraining(this.id,data )
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            Toast.success({
                                forbidClick: true, // 禁用背景点击
                                loadingType: "success",
                                position:'middle',
                                message: "退班成功"
                            });
                            this.back()
                        } else {
                            Toast.success("退班失败")
                        }
                    }).catch(() => {
                    throw new Error("退班异常！")
                })
            },
        },
    };
</script>

<style scoped lang="less">
    .detail-box {
        font-size: 0;

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

        .tab {
            display: flex;
            overflow: hidden;
            padding: 0.12rem 0.16rem;
            background-color: #fff;
            box-sizing: border-box;

            .item {
                flex: 1;
                text-align: center;
                font-size: 0.14rem;
                color: #666;
                line-height: 0.2rem;

                .fonticon {
                    position: relative;
                    top: 0.02rem;
                    left: 0.05rem;
                }
            }

            .item:first-child {
                margin-left: 0;
            }
        }

        .empty-box {
            width: 100%;
            height: 0.1rem;
            background-color: #f3f7f8;
        }

        .student {
            padding: 0 0 0.42rem;
            background-color: #fff;
            box-sizing: border-box;

            .total {
                font-size: 0.14rem;
                color: #666;
                text-align: center;
                padding: 0.14rem 0 0.16rem;
                margin: 0 0.16rem;
                line-height: 0.2rem;
                box-sizing: border-box;
                border-bottom: 0.02rem solid #eee;
            }

            .item {
                width: 100%;
                height: 0.69rem;
                padding: 0.08rem 0;
                box-sizing: border-box;
                border-bottom: 0.02rem solid #eee;
                position: relative;

                .lt {
                    float: left;
                    width: 1.45rem;
                    height: 0.5rem;
                    border-right: 0.02rem solid #eee;
                    box-sizing: border-box;

                    img {
                        float: left;
                        width: 0.5rem;
                        height: 0.5rem;
                        border-radius: 0.25rem;
                        margin-right: 0.11rem;
                    }

                    .name {
                        display: inline-block;
                        font-size: 0.14rem;
                        color: #666;
                        line-height: 0.5rem;
                    }

                    .num {
                        font-size: 0.12rem;
                        color: #999;
                        line-height: 0.16rem;
                    }
                }

                .rt {
                    float: left;
                    width: 1.7rem;
                    padding-left: 0.17rem;
                    height: 0.5rem;
                    box-sizing: border-box;

                    .grade {
                        width: 1.7rem;
                        font-size: 0.14rem;
                        color: #666;
                        line-height: 0.2rem;
                        overflow: hidden;

                        .text {
                            float: left;
                            line-height: 0.5rem;
                        }

                        .num {
                            margin-left: 0.19rem;
                        }
                    }

                    .type {
                        font-size: 0.12rem;
                        color: #999;
                        line-height: 0.16rem;
                    }
                }

                .chk {
                    float: right;
                    width: 0.3rem;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
            }
        }

        .fixed-btn {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0.4rem;
            background-color: #3770fb;

            .sure-classes {
                float: left;
                width: 100%;
                line-height: 0.4rem;
                text-align: center;
                font-size: 0.14rem;
                color: #fff;
            }
        }
    }
    .action-sheet {
        .active {
            color: #fff;
            background: #3770fb;
        }
    }
    /deep/.van-cell{
        padding: 0 0.15rem;
    }
    /deep/ #bottom0{
        background: #FF6666;
    }
</style>
