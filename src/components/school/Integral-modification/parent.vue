<template>
    <div>
        <div class="ac_line"></div>


        <div class="out_box" v-for="(item,index) in taskList" :key="index">
            <div style="margin: 0.15rem;">
                    <div class="title">{{item.title}}</div>

                    <div class="bottom_bor" v-for="(itemse,indexse) in item.list" :key="indexse">

                            <div style="margin-left: 0.1rem;" v-if="itemse.title.length>0">[{{itemse.title}}]</div>

                            <div style="float:left;width: 100%;line-height: 0.25rem;">
                                <div class="list_work" >{{itemse.desc}}
<!--                                    {{itemse.worth}}分-->
                                </div>
                                <div class="change_btn" @click= "changeshow(index,indexse)">修改</div>
                            </div>

                    </div>
            </div>
        </div>

        <div class="out_box" v-for="(item,index) in otherList" :key="'other'+index">
            <div style="margin: 0.15rem;">

                <div class="title">{{item.title}}</div>
                <div class="bottom_bor" v-for="(itemse,indexse) in item.list" :key="indexse">
                    <div style="margin-left: 0.1rem;">{{itemse.title}}</div>
                    <div style="float:left;width: 100%;line-height: 0.25rem;">
                        <div class="list_work">{{itemse.desc}}{{itemse.worth}}</div>
                        <div class="change_btn" @click="changeother(index,indexse)">修改</div>
                    </div>
                </div>

            </div>
        </div>

        <van-dialog
                v-model="changeScore"
                title="修改分数"
                :show-confirm-button=false
        >
            <div style="font-size: 0.12rem;margin-top: 0.15rem;text-align: center">
                <input type="text"  :value="this.Newworth" id="number">
            </div>
            <div style="float: right;margin: 0.15rem;">
                <div @click="out()" class="out_btn">取消</div>
                <div @click="change()" class="Yadd_btn">确认</div>
            </div>
        </van-dialog>

        <van-dialog
                v-model="OtherScore"
                title="修改分数"
                :show-confirm-button=false
        >
            <div style="font-size: 0.12rem;margin-top: 0.15rem;text-align: center">
                <input type="text"  :value="this.Otherworth" id="numberse">
            </div>
            <div style="float: right;margin: 0.15rem;">
                <div @click="outse()" class="out_btn">取消</div>
                <div @click="changese()" class="Yadd_btn">确认</div>
            </div>
        </van-dialog>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { ParentP } from '@/api/school/Integral-modification';
    import { ChangeParentP } from '@/api/school/Integral-modification';
    import { Toast } from 'vant';

    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                changeScore:false,
                OtherScore:false,

                Newworth:'',
                Otherworth:'',

                Id:'',
                Index:'',
                Indexse:'',
                oId:'',
                oIndex:'',
                oIndexse:'',

                test:[],
                taskList:[],
                otherList:[],

                Flist:[
                    {
                       title:"每日登陆",
                        list:[
                            {
                                id:111,
                                title:"",
                                desc:"家长每日首次登录 +",
                                worth:3
                            }
                        ]
                    },
                    {
                        title:"关注动态",
                        list:[
                            {
                                id:1,
                                title:"托管日报",
                                desc:"家长每日首次登录 +",
                                worth:1
                            } ,{
                                id:2,
                                title:"互动社区",
                                desc:"家长每日首次登录 +",
                                worth:2
                            }
                        ]
                    } ,
                ],
                Olist:[
                    {
                        title:"其他加分项",
                        list:[
                            {
                                id:3,
                                title:"",
                                desc:"家长每日首次登录 +",
                                worth:1
                            } ,{
                                id:4,
                                title:"每周简报",
                                desc:"家长每日首次登录啊实打实 +",
                                worth:2
                            }
                        ]
                    } ,
                ]
            }
            },

        methods:{
            // 获取数据-----
            GetParentP(){
                ParentP()
                    .then(res => {
                        this.taskList = res.data.data.taskList;

                        // if(res.data.data.taskList.list == null ){
                        //     // return "";
                        //     this.taskList = this.Flist;
                        // }else{
                        //     this.taskList = res.data.data.taskList;
                        //     this.otherList = res.data.data.otherList;
                        //     console.log(this.test)
                        // }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            // 修改积分操作-----
            changeshow(index,indexse){
                this.Id = this.taskList[index].list[indexse].id
                this.Newworth=this.taskList[index].list[indexse].worth

                this.Index = index
                this.Indexse = indexse
                this.changeScore=true
                console.log(this.Index +"和"+ this.Indexse +"和"+ this.Id)
            },
            change(){

                const data = {}
                const id = this.Id
                const number =  document.getElementById("number").value

                if (id) {
                    data.id = id
                } if (number){
                    data.number = number
                }

                ChangeParentP(data)
                    .then(res=>{
                        if (res.status === 200){

                            this.$set(
                                this.taskList[this.Index].list,this.Indexse,
                                {
                                    id:this.taskList[this.Index].list[this.Indexse].id,
                                    title:this.taskList[this.Index].list[this.Indexse].title,
                                    desc:this.taskList[this.Index].list[this.Indexse].desc,
                                    worth:number,
                                }
                            )
                            Toast.success("修改成功！");

                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetParentP()
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })


                // this.$set(
                //     this.taskList[this.Index].list,this.Indexse,
                //     {
                //         id:this.taskList[this.Index].list[this.Indexse].id,
                //         title:this.taskList[this.Index].list[this.Indexse].title,
                //         desc:this.taskList[this.Index].list[this.Indexse].desc,
                //         worth:number,
                //     }
                // )
                // Toast.success("修改成功！");

                this.changeScore=false
                console.log(this.taskList)
            },

            // 修改其他积分-----
            changeother(index,indexse){
                this.oId = this.otherList[index].list[indexse].id
                this.Otherworth=this.otherList[index].list[indexse].worth

                this.oIndex = index
                this.oIndexse = indexse
                this.OtherScore=true
            },
            changese(){
                const number =  document.getElementById("numberse").value
                this.$set(
                    this.otherList[this.oIndex].list,this.oIndexse,
                    {
                        id:this.otherList[this.oIndex].list[this.oIndexse].id,
                        title:this.otherList[this.oIndex].list[this.oIndexse].title,
                        desc:this.otherList[this.oIndex].list[this.oIndexse].desc,
                        worth:number,
                    }
                )
                Toast.success("修改成功！");

                console.log(this.otherList)
                this.OtherScore=false

            },

            out(){
                this.changeScore=false
            },
            outse(){
                this.OtherScore=false
            }
        },
        components: {
            [Toast.name]: Toast,

            //someComponent
        },
        mounted(){
            this.GetParentP()
        }
    }
</script>

<style scoped>
    .title{
        border-left:solid 2px #3770FB;
        padding-left: 0.05rem;
        font-weight:700;
        color:rgba(51,51,51,1);
    }
    .out_box{
        float: left;
        width: 100%;
    }
    .change_btn{
        float:right;
        width: 0.75rem;
        height: 0.25rem;
        background-color: #53ACF8;
        color: white;
        text-align: center;
        line-height: 0.25rem;
        border-radius:3px;
        font-size: 0.12rem;
    }
    .bottom_bor{
        margin-top: 0.1rem;
        border-bottom: 1px solid #EEEEEE;
        float: left;
        width: 100%;
        padding-bottom: 0.1rem;
    }
    .list_work{
        float:left;
        margin-left: 0.1rem;
        font-size: 0.12rem;
    }
    .ac_line{
        background-color:#F3F7F8;
        height: 0.1rem;
        margin-top: 0.15rem;
    }
    .out_btn{
        width: 0.7rem;
        line-height: 0.25rem;
        height: 0.25rem;
        color: white;
        background-color: #999999;
        float: left;
        border-radius:5px;
        text-align: center;
        margin-right: 0.1rem;
    }
    .Yadd_btn{
        width: 0.7rem;
        line-height: 0.25rem;
        height: 0.25rem;
        color: white;
        background-color: #00CCFF;
        float: left;
        border-radius:5px;
        text-align: center;
    }
</style>
