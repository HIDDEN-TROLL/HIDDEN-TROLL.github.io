<template>
    <div>
        <div id="attendance-type">
            <div class="go-back">
                <van-nav-bar
                        title="培训班"
                        left-text="返回"
                        :right-text="typename"
                        left-arrow
                        @click-left="onClickLeft"
                        @click-right="onClickRight"
                />
            </div>
            <div class="title_mes">
                <van-row>
                    <van-col span="6">
                        共{{TopList.classNumber}}个班级
                    </van-col>
                    <van-col span="9">
                        {{TopList.inClassStudentNumber}}位学生已经分班
                    </van-col>
                    <van-col span="9">
                        {{TopList.notInClassStudentNumber}}位学生未分班
                    </van-col>
                </van-row>
            </div>
            <div >
                <draggable :options = "{animation: 60,handle: '.drag-handle'}" @update="Changelist" v-model="TrainingList">
                    <transition-group>
                        <div v-for="(item, index) in TrainingList" :key="index" style="line-height: 0.5rem;" class="content" >
                            <van-row >
                                <van-col span="2" class="drag-handle">
                                    <span>{{index+1}}</span>
                                </van-col>
                                <van-col span="8">
                                    <span>{{item.name}}</span>
                                </van-col>
                                <van-col span="10" style="line-height: 0.25rem;text-align: left">
                                    <router-link :to="{name:'ClassDetails',params:{id:item.id}}">
                                        <a  v-for="(item2,index2) in item.teachers" :key="index2">
                                            <span class="num" v-if="index2 === 0">
                                                教师：{{item2.name}}
                                            </span></a><br>
                                        <span class="num">{{item.studentCount}}位学生  {{item.teacherCount}}位老师</span>
                                    </router-link>
                                </van-col>
                                <van-col span="4">
                                        <span class="icon" @click="ChioceClass(item.id)"><van-icon name="arrow"/></span>
                                </van-col>
                            </van-row>
                        </div>
                    </transition-group>
                </draggable>
            </div>

            <div class="ac_line" style="background: white"></div>

            <div class="bottom_text" v-if="this.$store.state.user.roleType === 41" style="bottom: 0">长按拖动班级序号可进行排序</div>
            <div class="bottom_text" v-if="this.$store.state.user.roleType === 42">长按拖动班级序号可进行排序</div>
            <FooterBtn v-if="this.$store.state.user.roleType === 42" :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
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

        <div style="height: 0.7rem;"></div>
    </div>

</template>

<script>
    import { NavBar, Icon, Row, Col, Field, DatetimePicker, Popup, Toast,Tab, Tabs ,Actionsheet } from 'vant';
    import FooterBtn from './components/footer-operate-btn'
    import draggable from 'vuedraggable'
    import { getTrainingList } from '@/api/school/training-course'
    import { changeClassSort } from '@/api/school/training-course'
    import { getTraniningNumber } from '@/api/school/training-course'

    import { mapActions, mapState, mapMutations } from 'vuex'
    // import storeModuleRegister from '@/utils/store-module-register'


    import training from '@/store/modules/school/training'




    export default {
        name: "attendance-time",
        components: {
            draggable:draggable,
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Row.name]: Row,
            [Col.name]: Col,
            //[Dialog.name]:Dialog,
            [Field.name]: Field,
            [Actionsheet.name]: Actionsheet,
            [DatetimePicker.name]: DatetimePicker,
            [Popup.name]: Popup,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Toast.name]: Toast,
            FooterBtn: FooterBtn,
        },
        data() {
            return {
                TopList:[],
                data: {
                    category:[],
                    type: Array,
                    default: undefined
                },
                type: 0,
                btnText: [
                    {
                        type: 1,
                        title: '删除班级',
                    },
                    {
                        type: 2,
                        title: '新增班级',
                    },
                ],
                //班级列表
                TrainingList:[],
                TrainingClass:[],

                teacherStart:0,
                teacherEnd:0,
                updateId: 0,

                teacherlist:[],
                TeacherId:0,

                // 切换已结课未结课
                Rtype:0,
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
                filterType:2,
                typename:'未结课'

        }
        },
        computed: {
            ...mapState('training', [
                'isDataReady'
            ]),
        },
        methods: {
            // 切换课程类型
            onActionSheetSelect(item){
                this.typeindex = item.index
                this.typename = item.name
                this.ChioceType = false
                this.getTrainingListFun()
            },

            ChioceClass(id){
                this.$router.push({name:'ClassDetails',params:{id:id}})
                training.state.isDataReady = id
            },
            // 排序班级
            Changelist(evt){
                evt.preventDefault();
                /*console.log('拖动前的索引 :' + evt.oldIndex)
                console.log('拖动后的索引 :' + evt.newIndex)*/
                //console.log(this.category);
                let arrId = [];
                for (let item of this.TrainingList) {
                    arrId.push(item.id)
                }

                changeClassSort({list:arrId})
                    .then(res=>{
                        if (res.status === 200){
                            Toast.success("排序成功！");
                        }
                    }).catch(()=>{
                    throw new Error("排序方法进行异常！")
                })
            },
            // 顶部信息，班级详情
            getTraniningNumberFun(){
                getTraniningNumber()
                    .then(res=>{
                        if (res.status === 200){
                            this.TopList = res.data.data
                        }
                    }).catch(()=>{
                    throw new Error("排序方法进行异常！")
                })
            },
            onClickLeft() {
                this.$router.back()
            },
            onClickRight() {
                this.ChioceType = true
            },
            // 获取列表
            getTrainingListFun() {
                 this.$loading('加载中',null,true)
                getTrainingList(this.typeindex)
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            this.$loadingHide()
                            this.TrainingList = res.data.data
                        }
                    }).catch(() => {
                    throw new Error("异常！")
                })
            },
            // 底部按钮
            operateBtn(type) {
                if (type === 1) {//删除
                    this.delAttendance()
                } else if (type === 2) {//新增
                    this.$router.push({name:'AddClass'})
                } else if(type === 3){
                    this.addTeaAttendance()
                }
            },
            // 删除跳转
            delAttendance() {
                this.$router.push({ name: 'DeleteTraining' })
            },
        },
        mounted() {
            this.getTrainingListFun()
            this.getTraniningNumberFun()
        },
    }
</script>

<style scoped lang="less">
    #attendance-type {
        font-size: 0;
        background-color: #f3f7f8;
        height: 100%;
        /*margin-bottom: 0.7rem;*/


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
            color: #000;

            font-size: 0.14rem;
            text-align: center;
            background-color: white;
            margin: 0.15rem;
            padding: 0.1rem;

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
                        width: 0.65rem;
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

                        .icon {
                            font-size: 0.14rem;
                            color: #666;
                            line-height: 0.2rem;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }
                }
            }
        }

        /*.van-field__body{
            .van-field__control{
                border: 0.01rem solid #666;
                border-radius: 0.03rem;
            }
        }*/

        /*.footer{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0.4rem;
            padding: 0.08rem 0;
            background-color: #3770FB;
            box-sizing: border-box;
            .van-col{
                font-size: 0.14rem;
                color: #fff;
                line-height: 0.24rem;
                text-align: center;
                border-right: 0.01rem solid #fff;
            }
            .van-col:last-child{
                border-right-width:0 ;
            }
        }*/
        .ac_line{
            background-color: #f3f7f8;
            height: 0.1rem;
        }
        .newlist{
            line-height: 0.3rem;
            font-size: 0.14rem;
        }
        .change{
            border: solid 1px #6699FF;
            border-radius: 8px;
            padding: 0.03rem 0.05rem;
            margin-left: 0.1rem;
            color: #6699FF;
        }.delete{
             border: solid 1px #FF6666;
             border-radius: 8px;
             color: #FF6666;
             padding: 0.03rem 0.05rem;
         }
        .deleteDia{
            padding: 25px;
            font-size: 14px;
            line-height: 1.5;
            text-align: center;
        }
    }
    .title_mes{
        background: white;
        line-height: 0.4rem;
        font-size: 0.14rem;
        text-align: center;
        padding: 0 0.15rem;
    }
    /*/deep/.operate-btn .van-col[data-v-630cacce]:first-child{*/
        /*background: #FF6666;*/
    /*}  */
    /deep/#bottom0{
        background: #FF6666;
    }
    .bottom_text{
        font-size: 0.14rem;
        position: fixed;
        bottom: 0.4rem;
        text-align: center;
        width: 100%;
        line-height: 0.4rem;
        background: white;
    }

</style>
