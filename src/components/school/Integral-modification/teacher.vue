<template>
    <div>
        <div class="ac_line"></div>

        <div class="out_box" v-for="(item,index) in Tasklist" :key="index">
            <div style="margin: 0.15rem;">
                <div class="title">{{item.title}}&nbsp;</div>

                <div v-if="item.list">
                    <div class="bottom_bor"  v-for="(itemse,indexse) in item.list" :key="indexse">
                            <div style="margin-left: 0.1rem;">{{itemse.title}}</div>
                            <div style="float:left;width: 100%;line-height: 0.25rem;">
                                <div class="list_work">{{itemse.desc}}</div>
                                <div class="change_btn" @click="changeBshow(index,indexse)">修改</div>
                            </div>
                    </div>
                </div>
                <div class="bottom_bor" v-else>
                    <div style="float:left;width: 100%;line-height: 0.25rem;">
                        <div class="list_work">{{item.desc}}&nbsp;</div>
                        <div class="change_btn" @click="changeshow(index)">修改</div>
                    </div>
                </div>
                <!--<div class="bottom_bor">-->
                    <!--<div style="margin-left: 0.1rem;">评教打分</div>-->
                    <!--<div style="float:left;width: 100%;line-height: 0.25rem;">-->
                        <!--<div class="list_work">为生日学生记录生日：+2分/人</div>-->
                        <!--<div class="change_btn">修改</div>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </div>

        <van-dialog
                v-model="changeScore"
                title="修改分数"
                :show-confirm-button=false
        >
            <div style="font-size: 0.12rem;margin-top: 0.15rem;text-align: center">
                    <input type="text"  :value="this.Newdesc" id="number">
            </div>
            <div style="float: right;margin: 0.15rem;">
                <div @click="out" class="out_btn">取消</div>
                <div @click="change()" class="Yadd_btn">确认</div>
            </div>
        </van-dialog>

        <van-dialog
                v-model="changeScorese"
                title="修改分数"
                :show-confirm-button=false
        >
            <div style="font-size: 0.12rem;margin-top: 0.15rem;text-align: center">
                    <input type="text"  :value="this.NewBdesc" id="numberse">
            </div>
            <div style="float: right;margin: 0.15rem;">
                <div @click="outse" class="out_btn">取消</div>
                <div @click="changese()" class="Yadd_btn">确认</div>
            </div>
        </van-dialog>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { TeacherTask } from '@/api/school/Integral-modification';
    import { ChangeTeacherTask } from '@/api/school/Integral-modification';
    import { Dialog } from 'vant';
    import { Toast } from 'vant';

    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                changeScore:false,
                changeScorese:false,
                Tasklist:[],
                Newdesc:'',
                Id:'',
                Idse:'',
                Index:'',
                Indexse:'',
                NewBdesc:'',
            }
        },
        component: {
            [Dialog.name]: Dialog,
            [Toast.name]: Toast,
            //someComponent
        },
        methods:{
            // 获取数据-----
            GetTeacherTask(){
                TeacherTask()
                    .then(res => {
                        this.Tasklist = res.data.data;
                        console.log(this.Tasklist)
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },

            // 修改积分操作接口（除了生日）-----
            changeshow(index){
                this.Newdesc = this.Tasklist[index].worth
                this.Id = this.Tasklist[index].id
                this.Index = index
                this.changeScore=true
                console.log(this.Newdesc + "和" +this.Id +"和"+ this.Index)
            },
            change()
            {

                const data = {}
                const id = this.Id
                const number =  document.getElementById("number").value
                if (id) {
                    data.id = id
                } if (number){
                data.number = number
                }

                if(number<100){
            // POST修改积分接口-----
                    ChangeTeacherTask(data)
                        .then(res=>{
                            if (res.status === 200){

                                this.$set(this.Tasklist[this.Index],this.Index,{
                                    desc:this.Tasklist[this.Index].desc,
                                    worth:number,
                                    id:this.Tasklist[this.Index].id,
                                    title:this.Tasklist[this.Index].title,
                                })
                                Toast.success("修改成功！");
                                let timer = setTimeout(()=>{
                                    clearTimeout(timer);
                                    // this.$router.push({name:'SafflowerPrizeManagement'});
                                },2800)
                                this.GetTeacherTask()
                            }else {
                                Toast.fail("修改失败！")
                            }
                        }).catch(() => {
                        throw new Error("异常!")
                    })
                this.changeScore=false
                }else{
                    alert("青输入小于100的数值")
                }
            },

            // 生日档案积分修改接口-----
            changeBshow(index,indexse){
                this.Index = index
                this.Indexse = indexse
                this.Idse = this.Tasklist[index].list[indexse].id
                this.NewBdesc = this.Tasklist[index].list[indexse].worth
                this.changeScorese=true
            },
            changese()
            {
                const data = {}
                const id = this.Idse
                const number =  document.getElementById("numberse").value
                if (id) {
                    data.id = id
                } if (number){
                data.number = number
                }
                console.log(data)
                // POST修改积分接口-----
                ChangeTeacherTask(data)
                    .then(res=>{
                        if (res.status === 200){

                            this.$set(this.Tasklist[this.Index].list[this.Indexse],this.Indexse,{
                                desc:this.Tasklist[this.Index].list[this.Indexse].desc,
                                worth:number,
                                id:this.Tasklist[this.Index].list[this.Indexse].id,
                                title:this.Tasklist[this.Index].list[this.Indexse].title,
                            })
                            Toast.success("修改成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetTeacherTask()
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })

                this.changeScorese=false
            },

            out(){
                this.changeScore=false
            },
            outse(){
                this.changeScorese=false
            },
        },
        mounted(){
            this.GetTeacherTask()
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
