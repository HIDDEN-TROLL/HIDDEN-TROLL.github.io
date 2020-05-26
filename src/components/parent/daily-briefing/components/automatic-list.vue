<template>
    <div class="cl-list">
        <div class="list">
            <van-tabs v-model="active" title-active-color="#3770FB" color="#3770FB" @click="banji">
                <van-tab v-for="(item,index) in classList " :title="item.name" :key="index">
                        <div class="fam_list" v-for="(item2,index2) in item.stuList" :key="index2">
                            <div class="fam_box" style="border-right: solid 1px #CCCCCC;width: 0.7rem">
                                <span style="font-weight: 700" v-if="item2.stuName.length<6">{{item2.stuName}}</span>
                                <div style="font-weight: 700;float: left;width: 0.7rem;overflow:scroll;" v-else>
                                    <div style="width: 1rem; text-align: left;">
                                        {{item2.stuName}}
                                    </div>
                                </div>
                                <br>{{item2.gradeName}}
                            </div>
                            <div style="overflow: scroll">
                                    <div class="fam_box" v-if="item2.sendStatus === 0" style="line-height: 0.4rem">
                                        <span>未到推送时间</span>,下次推送时间为{{item2.time}}
                                    </div>
                                    <div v-if="item2.sendStatus === 1 ">
                                        <ul v-if="item2.reads" style="min-width: 75vw; overflow: scroll;display: flex;">
                                            <li class="fam_box" v-for="(item3,index3) in item2.reads" :key="index3">
                                                {{item3.parent}}<br>
                                                <span style="color: #6699FF" v-if="item3.isRead === 1">已阅</span>
                                                <span style="color: #FF6666" v-if="item3.isRead === 0">未阅</span>
                                            </li>
                                        </ul>
                                        <ul class="fam_box" style="line-height: 0.4rem;color: red" v-else>未绑定家长</ul>
                                    </div>
                            </div>
                        </div>
                </van-tab>
            </van-tabs>
        </div>
        <div class="c-dowm" @click="downMenuShow">
            <span class="fonticon">
                <van-icon name="arrow-down" />
            </span>
        </div>
        <van-actionsheet
                v-model="getB"
                cancel-text="取消"
                :actions="classList"
                @select="onSelect"
                @cancel="onCancel"
        />
    </div>

</template>

<script>
    import { Icon, Tab, Tabs,Actionsheet } from "vant";
    /*import DownMenu from "../../common/Grade-List";*/
    import { mapState } from "vuex";
    export default {
        name: "clas-title-list",
        props: {
            classList:{
                type:Array
            }
        },
        components: {
            [Icon.name]: Icon,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Actionsheet.name]:Actionsheet,
            /*DownMenu: DownMenu*/
        },
        data() {
            return {
                active: 0,
            };
        },
        methods: {
            downMenuShow() {
                this.$store.commit("getShow");
            },
            // 点击班级
            banji(index) {
                let id = this.classList[index].id;
                let name = this.classList[index].name;
                this.$emit("classGrade", {id:id,active:index,name:name});
            },
            onSelect(item){
                this.$store.commit('offShow');
                for (let i=0;i< this.classList.length;i++) {
                    if (this.classList[i].id === item.id){
                        this.active = i;
                    }
                }
                this.$emit("classGrade", { id: item.id,active:this.active });
            },
            onCancel(){
                this.$store.commit('offShow');
            }
        },
        computed: {
            ...mapState(["isShow"]),
            getB:{
                get () {
                    return this.$store.state.app.isShow
                },
                set (value) {
                    this.$store.state.app.isShow = value
                }
            },
        }
    };
</script>

<style scoped lang="less">
    /deep/.van-tab, .van-tag--large{
        font-size: 0.14rem;
    }
    /deep/.van-tab{
        line-height: 0.44rem;
    }
    .cl-list {
        width: 100%;
        overflow: hidden;
        .list {
            float: left;
            width: 100%;
            overflow: hidden;
            line-height: 0.2rem;
            .van-tabs--line{
                padding-top:0.44rem;
                /deep/.van-tabs__wrap{
                    height: 0.44rem;
                    width: 90%;
                }
            }
        }
        .c-dowm {
            position: absolute;
            right: 0;
            z-index: 200;
            background: white;
            float: left;
            width: 0.4rem;
            height: 0.45rem;
            border-bottom: 0.01rem solid #eee;
            box-sizing: border-box;
            .fonticon {
                position: absolute;
                top: 0.11rem;
                height: 0.2rem;
                padding-left: 0.16rem;
                font-size: 0.16rem;
                color: #999;
                border-left: 0.01rem solid #eeeeee;
            }
        }
    }
    .fam_box{
        padding: 0.1rem 0.15rem;
        float: left;
        text-align: center;
        flex-shrink: 0;
    }
    .fam_list{
        border-bottom: solid 1px #CCCCCC;
    }
</style>
