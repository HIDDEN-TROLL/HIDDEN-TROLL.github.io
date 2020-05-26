<template>
    <div id="flower-reset">
        <!--    红花清零  -->
        <div class="go-back">
            <van-nav-bar  title="红花清零" left-text="返回"  left-arrow  @click-left="onClickLeft" />
        </div>
        <div class="content">
            <div class="flex-box">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <van-row gutter="32">
                        <van-col span="12" v-for="(item,index) in classListArr" :key="index">
                            <span class="name" :class="{active:item.active}" @click="resetClassFun(item.id, index)">{{item.name}}</span>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
        <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
    </div>
</template>

<script>
    import { NavBar, Icon, Row, Col,List, Toast } from "vant";
    import { getAllClass } from '@/api/common'
    import { flowerReset } from '@/api/school/safflower'
    import FooterBtn from "../../common/footer-operate-btn";

    export default {
        name: "flower-reset",
        components:{
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Row.name]:Row,
            [Col.name]:Col,
            [Toast.name]:Toast,
            [List.name]:List,
            FooterBtn:FooterBtn
        },
        data(){
            return{
                loading:false,
                finished:false,
                btnText:[
                    {
                        type:1,
                        title:'确定清零'
                    }
                ],
                classListArr:[],
                page:1,
                pageSize:20,
                totalPage:0,
                chooseClassListId:[],//保存选择的班级列表id
            }
        },
        methods:{
            onClickLeft(){
                this.$router.back(-1)
            },
            operateBtn(){
                if (this.chooseClassListId.length == 0){
                    Toast('请选择需要清零的班级')
                }else {
                    this.$dialog.confirm({
                        title: '提示',
                        message: '确定清零？'
                    }).then(() => {
                        // on confirm
                        flowerReset({clsId:this.chooseClassListId}).then(res=>{
                            if (res.data.meta.success ){
                                Toast.success("清除成功");
                                let timer = setTimeout(()=>{
                                    clearTimeout(timer);
                                    this.page = 1;
                                    this.classListArr = [];
                                    this.chooseClassListId = [];
                                    this.onLoad();
                                },2800)
                            }
                        }).catch(()=>{
                            throw new Error("异常！")
                        })
                    }).catch(() => {
                        // on cancel
                    });
                }

            },
            selectClassList(){
                getAllClass(1)
                    .then(res=>{
                        if (res.data.meta && res.data.meta.code === 0){
                            this.loading = false;
                            this.finished = true;
                            let d = res.data.data;
                            for (let item of d){
                                this.classListArr.push({
                                    id:item.id,
                                    name:item.name,
                                    active:false
                                })
                            }
                        }
                    }).catch(()=>{
                    throw new Error("异常！")
                })
            },
            onLoad(){
                this.selectClassList();
            },
            resetClassFun(id, index){
                let i = this.chooseClassListId.indexOf(id);
                if (this.classListArr[index].active){
                    this.classListArr[index].active = false;
                    //if (i>=0){}
                    if (i >= 0){
                        this.chooseClassListId.splice(i,1)
                    }
                }else {
                    this.classListArr[index].active = true;
                    this.chooseClassListId.push(id)
                }

                console.log(this.chooseClassListId )
            }
        }
    }
</script>

<style scoped lang="less">
    #flower-reset{
        font-size: 0.12rem;
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
        .content{
            width: 100%;
            padding: 0 0.16rem;
            box-sizing: border-box;
            .flex-box{
                width: 100%;
                text-align: center;
                .name{
                    display: block;
                    width: 100%;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    font-size: 0.14rem;
                    color: #333;
                    text-align: center;
                    border: 1px solid #999;
                    margin: 0.16rem 0;
                }
                .name.active{
                    background-color: #3770fb;
                    color: #fff;
                }
            }
        }
    }
</style>
