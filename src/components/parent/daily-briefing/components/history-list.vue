<template>
    <div class="cl-list" >
        <div class="list">
            <van-tabs v-model="active" title-active-color="#3770FB" color="#3770FB" @click="banji">
                <van-tab v-for="(item,index) in classList " :title="item.name" :key="index">
                    <div class="fam_list" >
                        <van-row>
                            <van-col span="8" style="float: left" v-for="(item2,index2) in item.stuList" :key="index2">
                                <div class="Stu_box" @click="CheckMore(item2.stuId,item.week)">
                                    <span style="font-weight: 700">{{item2.stuName}}</span>
                                    <br>{{item2.gradeName}}
                                </div>
                            </van-col>
                        </van-row>
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
    import { Icon, Tab, Tabs,Actionsheet,Row, Col, Button,Toast,Switch } from "vant";
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
            [Row.name]: Row,
            [Col.name]: Col,
            [Toast.name]: Toast,
            [Button.name]: Button,
            [Actionsheet.name]:Actionsheet,
            [Switch .name]:Switch ,
            /*DownMenu: DownMenu*/
        },
        data() {
            return {
                active: 0,
                show:true,
                showPar:true,
                showUnCom:true,
            };
        },
        methods: {
            CheckMore(template_id,week){
              console.log(template_id,week,new Date().getFullYear())
                this.$router.push({name:'HistoryWeekBriefing',
                    params:{
                        template_id:template_id,
                        week:week
                    }
                    })
            },
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
        created(){
            //this.getClassList();
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
    *{
        word-wrap:break-word
    }
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
        padding: 0.15rem;
        float: left;
        text-align: center;
    }
    .fam_list{
        padding: 0.1rem;
    }
    .text_box{
        margin: 0.15rem  0;
        border: solid 1px;
        width: 90%;
        border-radius: 10px;
        height: 0.6rem;
    }
    .title_date{
        line-height: 0.5rem;
        text-align: center;
        border-bottom: solid 1px #CCCCCC;
        font-weight: 700;
    }
    .title_show{
        color: #6699FF;
        line-height: 0.4rem;
        text-align: center;
        border-bottom: 1px solid rgb(204, 204, 204);
    }
    .Hide_btn{
        border: none;
        background: white;
    }
    .ac_line{
        height: 0.1rem;
        background: #F3F7F8;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .Stu_box{
        text-align: center;
        border: solid 1px;
        margin: 0.1rem;
        border-radius: 20%;
        color: #3770fb;
        padding: 0.1rem 0;
    }

</style>
