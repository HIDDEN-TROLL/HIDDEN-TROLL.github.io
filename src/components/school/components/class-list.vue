<template>
    <div class="cl-list" v-if="classList && classList.length>0">
        <div class="list">
            <van-tabs v-model="active" title-active-color="#3770FB" color="#3770FB" @click="banji">
                <van-tab v-for="(item,index) in classList " :title="item.name" :key="index">
                    <!--<div slot="title"  v-text="item.name"></div>-->
                </van-tab>
            </van-tabs>
        </div>
        <div class="c-dowm" @click="downMenuShow">
            <span class="fonticon">
                <van-icon name="arrow-down" />
            </span>
        </div>

        <!-- <DownMenu :actions="clsStuTk" v-on:getIndex="getChange"></DownMenu>-->
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
                //console.log(11111)
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
    .cl-list {
        width: 100%;
        overflow: hidden;
        .list {
            float: left;
            width: 3rem;
            overflow: hidden;
            line-height: 0.2rem;
            .van-tabs--line{
                padding-top:0.44rem;
                /deep/.van-tabs__wrap{
                    height: 0.44rem;
                }
            }
        }
        .c-dowm {
            position: relative;
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
</style>
