<template>
    <div class="body">
        <div>
            <div style="margin-bottom: 0.15rem;">
                <van-nav-bar
                        title="奖惩修改"
                        left-text="返回"

                        left-arrow
                        @click-left="$router.back()"
                />
            </div>
            <van-tabs type="card" class="van-tabs-bor">
                <van-tab title="学生小红花">
                    <div >
                    <div class="ac_line" style="margin-top: 0.15rem;"></div>
                        <div >
                            <div class="noon_lunch">
                                <div class="title_bor"><span>午休用餐</span></div>
                                <div class="noon_box">
                                    <div class="mes_title"><span>午休纪律（奖惩小红花数量）</span></div>
                                    <div style="text-align: center;">
                                        <div class="changebox">
                                            <div style="float:left;" v-for="(item,index) in siest" :key="index" >
                                                <div >
                                                    <div class="mes_box ChangeName">{{item.name}}</div>
                                                    <div class="mes_box ChangeName" style="border-left: solid 1px #E7E7E7;">{{item.number}}</div>
                                                    <div class="Showchange" :class="{Showsiest:Showsiest}">
                                                        <div class="add_number" @click="Addsiest(index)">
                                                            +
                                                        </div>
                                                        <div class="reduce_number" @click="Reducesiest(index)">
                                                            -
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="change_btn" @click="ShowSiestFun()" v-if="Showsiest===false">修改</div>
                                        <div class="cancel_btn" @click="HideiestFun()" v-if="Showsiest===true">取消</div>
                                    </div>
                                </div>
                                <div class="noon_box">
                                    <div  class="mes_title"><span>用餐纪律（奖惩小红花数量）</span></div>
                                    <div style="text-align: center;">
                                        <div class="changebox">
                                            <div style="float:left;" v-for="(item,index) in dining" :key="index" >
                                                <div>
                                                    <div class="mes_box ChangeName">{{item.name}}</div>
                                                    <div class="mes_box ChangeName" style="border-left: solid 1px #E7E7E7;">{{item.number}}</div>
                                                    <div  class="Showchange" :class="{Showdining:Showdining}">
                                                        <div class="add_number" @click="Adddining(index)">
                                                            +
                                                        </div>
                                                        <div class="reduce_number" @click="Reducedining(index)">
                                                            -
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="change_btn" @click="ShowDiningFun()" v-if="Showdining===false">修改</div>
                                        <div class="cancel_btn" @click="HideDiningFun()" v-if="Showdining===true">取消</div>
                                    </div>
                                </div>
                            </div>
                            <div class="ac_line" style="float:left;width: 100%;"></div>
                            <div class="noon_lunch">
                                <div class="title_bor"><span>作业管理</span></div>
                                <div class="noon_box">
                                    <div  class="mes_title"><span>作业表现（奖惩小红花数量）</span></div>
                                    <div style="text-align: center;">

                                        <div class="changebox" >
                                            <div style="float:left;" v-for="(item,index) in work" :key="index" >
                                                <div>
                                                    <div class="mes_box ChangeName">{{item.name}}</div>
                                                    <div class="mes_box ChangeName" style="border-left: solid 1px #E7E7E7;">{{item.number}}</div>

                                                    <div  class="Showchange" :class="{Showwork:Showwork}">
                                                        <div class="add_number" @click="Addwork(index)">
                                                            +
                                                        </div>

                                                        <div class="reduce_number" @click="Reducework(index)">
                                                            -
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="change_btn" @click="ShowWorkFun()" v-if="Showwork===false">修改</div>
                                        <div class="cancel_btn" @click="HideWorkFun()" v-if="Showwork===true">取消</div>
                                    </div>
                                </div>
                            </div>
                            <div class="ac_line" style="float:left;width: 100%;"></div>

                            <div class="noon_lunch">
                                <div class="title_bor"><span>习惯点评</span></div>
                                <div class="noon_box">
                                    <div  class="mes_title"><span>习惯表现（奖惩小红花数量）</span></div>
                                    <div style="text-align: center;">

                                        <div class="changebox">
                                            <div style="float:left;" v-for="(item,index) in safflower" :key="index" >
                                                <div>
                                                    <div class="mes_box ChangeName" >{{item.name}}</div>
                                                    <div class="mes_box ChangeName" style="border-left: solid 1px #E7E7E7;">{{item.number}}</div>
                                                    <div  class="Showchange" :class="{Showsafflower:Showsafflower}">
                                                        <div class="add_number" @click="Addsafflower(index)">
                                                            +
                                                        </div>

                                                        <div class="reduce_number" @click="Reducesafflower(index)">
                                                            -
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="change_btn" @click="ShowSafflowerFun()" v-if="Showsafflower===false">修改</div>
                                        <div class="cancel_btn" @click="HideSafflowerFun()" v-if="Showsafflower===true">取消</div>
                                    </div>
                                </div>
                            </div>

                            <div class="ac_line" style="float:left;width: 100%;"></div>

                            <div class="noon_lunch">
                                <div class="title_bor"><span>培训班</span></div>
                                <div class="noon_box">
                                    <div  class="mes_title"><span>课评表现（奖惩小红花数量）</span></div>
                                    <div style="text-align: center;">

                                        <div class="changebox">
                                            <div style="float:left;" v-for="(item,index) in training" :key="index" >
                                                <div>
                                                    <div class="mes_box ChangeName" >{{item.name}}</div>
                                                    <div class="mes_box ChangeName" style="border-left: solid 1px #E7E7E7;">{{item.number}}</div>
                                                    <div  class="Showchange" :class="{Showtraining:Showtraining}">
                                                        <div class="add_number" @click="Addtraining(index)">
                                                            +
                                                        </div>

                                                        <div class="reduce_number" @click="Reducetraining(index)">
                                                            -
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="change_btn" @click="ShowtrainingFun()" v-if="Showtraining===false">修改</div>
                                        <div class="cancel_btn" @click="HidetrainingFun()" v-if="Showtraining===true">取消</div>
                                    </div>
                                </div>
                            </div>

                            <div class="ac_line" style="float:left;width: 100%;"></div>
                        </div>
                    </div>
                    <div class="noon_lunch" >
                        <div class="title_bor">成绩管理</div>
                        <div style="float:left;margin-top: 0.15rem;">
                            <div style="margin-left: 0.15rem;">进步/退步（奖惩小红花数量）</div>
                            <div style="margin-left: 0.15rem;">
                                <div style="margin: 0.05rem 0;" >
                                    <van-row>
                                        <van-col span="16">
                                            <div style="float:left;line-height: 0.25rem;color: #999999;">比上次分数进步  奖励{{score.diversification.progressNumber}}朵小红花</div>
                                        </van-col>
                                        <van-col span="8">
                                            <div class="change_btn_se" @click="progress">修改</div>
                                        </van-col>
                                    </van-row>
                                </div>
                            </div>
                            <div style="width: 3.4rem;float:left;" class="sc_hr"><hr></div>
                        </div>
                        <div style="margin-left: 0.15rem;">
                            <div style="margin-bottom: 0.1rem;float: left;width: 100%;">
                                <div style="float:left;margin-right: 0.25rem;">分数奖</div>
                                <div class="add_btn" @click="AddNewScore">+</div>
                                <div style="color: #999999;float:left;margin-right: 0.25rem;">
                                    新增
                                </div>
                                <div :class="ScoreType === false ? 'change_S_btn' : 'delete_S_btn'" @click="changeType()">
                                    {{ScoreType === false ? '修改分数' : '删除分数'}}
                                </div>
                            </div>
                            <div style="margin: 0.05rem 0;" v-for="(item,index) in score.fraction" :key="index" :id="'Score'+index">
                                <van-row>
                                    <van-col span="16">
                                        <div style="float:left;line-height: 0.25rem;color: #999999;">考试获得{{item.score}}分以上，奖{{item.number}}朵小红花</div>
                                    </van-col>
                                    <van-col span="8">
                                        <div class="change_btn_se" @click="changebtn(index)" v-if="ScoreType === true">修改</div>
                                        <div style="background-color: red" class="change_btn_se" @click="deletebtn(item.id,index)" v-if="ScoreType===false">删除</div>
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="家长积分"><ParentP></ParentP></van-tab>
                <van-tab title="教师成就值"><TeacherP></TeacherP></van-tab>
            </van-tabs>
        </div>

        <van-dialog
                v-model="addscore"
                title="新增分数奖"
                :show-confirm-button=false
        >
            <div style="font-size: 0.12rem;margin-top: 0.15rem;text-align: center">
                <van-row>
                    <van-col span="12">
                        <div>
                        考试获得<input type="text" id="score"  >分以上
                            <br><span id="ts">（请输入1-100以内数字）</span>
                        </div>
                    </van-col>
                    <van-col span="12">
                        <div>
                            奖励<input type="text" id="flowers">朵小红花
                            <br><span id="tsse">（请输入1-100以内数字）</span>
                        </div>
                    </van-col>
                </van-row>
            </div>
            <div style="float: right;margin: 0.15rem;">
                <div @click="out" class="out_btn">取消</div>
                <div @click="Yadd" class="Yadd_btn">确认</div>
            </div>
        </van-dialog>

        <van-dialog
                v-model="changeScore"
                title="修改分数"
                :show-confirm-button=false
        >
            <div style="font-size: 0.12rem;margin-top: 0.15rem;text-align: center">
                <van-row>
                    <van-col span="12">
                        <div>
                        考试获得<input type="text" id="Cscore" :value="this.Cscore" >分
                            <br><span id="Cts">（请输入1-100以内数字）</span>
                        </div>
                    </van-col>
                    <van-col span="12">
                        <div>
                            奖励<input type="text" id="Cflowers" :value="this.Cflowers">朵小红花
                            <br><span id="Ctsse">（请输入1-100以内数字）</span>
                        </div>
                    </van-col>
                </van-row>
            </div>
            <div style="float: right;margin: 0.15rem;">
                <div @click="out" class="out_btn">取消</div>
                <div @click="change()" class="Yadd_btn">确认</div>
            </div>
        </van-dialog>

        <van-dialog
                v-model="progressshow"
                title="修改分数"
                :show-confirm-button=false
        >
            <div style="font-size: 0.12rem;margin-top: 0.15rem;text-align: center">
                <input type="text"  :value="this.score.diversification.progressNumber" id="progressnumber">
            </div>
            <div style="float: right;margin: 0.15rem;">
                <div @click="out" class="out_btn">取消</div>
                <div @click="changePro()" class="Yadd_btn">确认</div>
            </div>
        </van-dialog>
        <!--修改评语分数-->
        <van-dialog
                v-model="CommentBtn"
                title="修改分数"
                :show-confirm-button=false
        >
            <div style="font-size: 0.12rem;margin-top: 0.15rem;text-align: center">
                <input type="text"   id="CommentNumber" :value="this.CommentValue">
            </div>
            <div style="float: right;margin: 0.15rem;">
                <div @click="out" class="out_btn">取消</div>
                <div @click="changeCom()" class="Yadd_btn">确认</div>
            </div>
        </van-dialog>

        <!--删除分数奖-->
        <van-dialog
                v-model="DeleteDia"
                title="删除分数"
                :show-cancel-button=true
                @confirm="DeleteFun"
        >
           <div style="padding: 0.2rem 0 ;text-align: center;color: red">
               确定删除该分数？
           </div>
        </van-dialog>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { Tab, Tabs } from 'vant';
    import { NavBar } from 'vant';
    import { Dialog } from 'vant';
    import { Row, Col } from 'vant';
    import { Toast } from 'vant';
    //import someComponent from './someComponent'
    import ParentP from './parent'
    import TeacherP from './teacher'
    import { StuFlower } from '@/api/school/Integral-modification';
    import { Changecomment } from '@/api/school/Integral-modification';
    import { ChangeScore } from '@/api/school/Integral-modification';
    import { ChangeFlower } from '@/api/school/Integral-modification';
    import { DeleteScore } from '@/api/school/Integral-modification';

    export default {
        name: "",
        data() {
            return {
                Cscore:'',
                Cflowers:'',
                Cid:'',
                Cindex:'',
                addscore:false,
                changeScore:false,
                progressshow:false,
                CommentBtn:false,
                CommentValue:'',
                Comindex:'',
                Comindexse:'',
                id:'',
                number:'',

                lunchNumber:'',

                one:[{mes:'差',number:'-3'},{mes:'中',number:'0'},{mes:'良',number:'1'},{mes:'优',number:'3'}],

                siest:[],
                dining:[],
                work:[],
                safflower:[],
                training:[],

                score:{
                    diversification:{
                        progressNumber:5,
                        leewayNumber:5
                    },
                    fraction:[
                        {
                            score:100,
                            number:5,
                            id:1
                        }, {
                            score:12,
                            number:5,
                            id:1
                        },{
                            score:13,
                            number:5,
                            id:1
                        },
                    ]
                },

                Flower:[],
                safflowerComment:[],

                behaviors:[
                    {
                        value:1,
                        number:-3
                    },
                    {
                        value:2,
                        number:0
                    },  {
                        value:3,
                        number:1
                    },  {
                        value:4,
                        number:3
                    },
                ],


                ChangeSiest:'',
                Showsiest:false,
                Showwork:false,
                Showdining:false,
                Showsafflower:false,
                Showtraining:false,

                ScoreType:true,
                DeleteDia:false,
                DeleteId:0,
                DeleteIndex:0,

            }
        },
        components: {
            [Tab.name]: Tab,
            [Dialog.name]: Dialog,
            [Tabs.name]: Tabs,
            [NavBar.name]: NavBar,
            [Row.name]: Row,
            [Toast.name]: Toast,
            [Col.name]: Col,
            ParentP:ParentP,
            TeacherP:TeacherP
            //someComponentw
        },
        methods:{
            DeleteFun(){
                // console.log(this.DeleteId)
                DeleteScore(this.DeleteId)
                    .then(res=>{
                        if (res.status === 200){
                            Toast.success("删除成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                document.getElementById('Score'+this.DeleteIndex).style.display = "none"
                            },100)
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            // 删除对应分数奖
            deletebtn(id,index){
                this.DeleteId = id
                this.DeleteIndex = index
                this.DeleteDia = true
            },
            // 切换修改/删除分数奖
            changeType(){
                this.ScoreType === true ? this.ScoreType = false : this.ScoreType = true
            },
            // 奖惩小红花数量修改（1午休纪律2用餐纪律3作业管理4习惯点评）
            Addsiest(index){
                var type = 1

                this.siest[index].number +=1
                var addnumber = this.siest[index].number

                const behaviors = this.siest
                const value = index + 1
                const number = addnumber
                if (value,number) {
                    behaviors.value = value
                    behaviors.number = number
                }
                ChangeFlower(type,behaviors)
                    .then(res=>{

                        if (res.status === 200){

                            Toast.success("修改成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetStuFlower()
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            Reducesiest(index){
                var type = 1
                this.siest[index].number -=1
                var addnumber = this.siest[index].number

                const behaviors = this.siest
                const value = index + 1
                const number = addnumber

                if (value,number) {
                    behaviors.value = value
                    behaviors.number = number
                }
                ChangeFlower(type,behaviors)
                    .then(res=>{

                        if (res.status === 200){

                            Toast.success("修改成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetStuFlower()
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            Adddining(index){
                var type = 2

                this.dining[index].number +=1
                var addnumber = this.dining[index].number

                const behaviors = this.dining
                const value = index + 1
                const number = addnumber
                if (value,number) {
                    behaviors.value = value
                    behaviors.number = number
                }
                ChangeFlower(type,behaviors)
                    .then(res=>{

                        if (res.status === 200){

                            Toast.success("修改成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetStuFlower()
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            Reducedining(index){
                var type = 2
                this.dining[index].number -=1
                var addnumber = this.dining[index].dining

                const behaviors = this.dining
                const value = index + 1
                const number = addnumber

                if (value,number) {
                    behaviors.value = value
                    behaviors.number = number
                }
                ChangeFlower(type,behaviors)
                    .then(res=>{

                        if (res.status === 200){

                            Toast.success("修改成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetStuFlower()
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            Addwork(index){
                var type = 3

                this.work[index].number +=1
                var addnumber = this.work[index].number

                const behaviors = this.work
                const value = index + 1
                const number = addnumber
                if (value,number) {
                    behaviors.value = value
                    behaviors.number = number
                }
                ChangeFlower(type,behaviors)
                    .then(res=>{

                        if (res.status === 200){

                            Toast.success("修改成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetStuFlower()
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            Reducework(index){
                var type = 3
                this.work[index].number -=1
                var addnumber = this.work[index].number

                const behaviors = this.work
                const value = index + 1
                const number = addnumber

                if (value,number) {
                    behaviors.value = value
                    behaviors.number = number
                }
                ChangeFlower(type,behaviors)
                    .then(res=>{

                        if (res.status === 200){

                            Toast.success("修改成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetStuFlower()
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            Addsafflower(index){
                var type = 4

                this.safflower[index].number +=1
                var addnumber = this.safflower[index].number

                const behaviors = this.safflower
                const value = index + 1
                const number = addnumber
                if (value,number) {
                    behaviors.value = value
                    behaviors.number = number
                }
                ChangeFlower(type,behaviors)
                    .then(res=>{

                        if (res.status === 200){

                            Toast.success("修改成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetStuFlower()
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            // 培训班
            Addtraining(index){
                var type = 5

                this.training[index].number +=1
                var addnumber = this.training[index].number

                const behaviors = this.training
                const value = index + 1
                const number = addnumber
                if (value,number) {
                    behaviors.value = value
                    behaviors.number = number
                }
                ChangeFlower(type,behaviors)
                    .then(res=>{

                        if (res.status === 200){

                            Toast.success("修改成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetStuFlower()
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            Reducetraining(index){
                var type = 5

                this.training[index].number -=1
                var addnumber = this.training[index].number

                const behaviors = this.training
                const value = index + 1
                const number = addnumber
                if (value,number) {
                    behaviors.value = value
                    behaviors.number = number
                }
                ChangeFlower(type,behaviors)
                    .then(res=>{

                        if (res.status === 200){

                            Toast.success("修改成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetStuFlower()
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
            Reducesafflower(index){
                var type = 4
                this.safflower[index].number -=1
                var addnumber = this.safflower[index].number

                const behaviors = this.safflower
                const value = index + 1
                const number = addnumber

                if (value,number) {
                    behaviors.value = value
                    behaviors.number = number
                }
                ChangeFlower(type,behaviors)
                    .then(res=>{

                        if (res.status === 200){

                            Toast.success("修改成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetStuFlower()
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },


            changeCom(){
                // console.log(this.Comindex + '-' + this.Comindexse)
                var number = document.getElementById("CommentNumber").value

                console.log(this.id + number)

                Changecomment(this.id,number)
                    .then(res=>{
                        if (res.status === 200){
                            this.$set(this.safflowerComment[this.Comindex].comments,[this.Comindexse],
                                {
                                    comment:this.safflowerComment[this.Comindex].comments[this.Comindexse].comment,
                                    commentId:this.safflowerComment[this.Comindex].comments[this.Comindexse].commentId,
                                    number:number,
                                }
                            )
                            Toast.success("修改成功！");
                            let timer = setTimeout(()=>{
                                clearTimeout(timer);
                                // this.$router.push({name:'SafflowerPrizeManagement'});
                            },2800)
                            this.GetStuFlower()
                            this.CommentBtn = false
                        }else {
                            Toast.fail("修改失败！")
                        }
                    }).catch(() => {
                    throw new Error("异常!")
                })

            },
            ChangeCommentBtn(index,indexse){
                this.CommentValue = this.safflowerComment[index].comments[indexse].number
                this.Comindex = index
                this.Comindexse = indexse

                this.id =  this.safflowerComment[this.Comindex].comments[this.Comindexse].commentId

                // console.log(this.safflowerComment[index].comments[indexse].number)
              this.CommentBtn = true
            },
            AddNewScore(){
                this.addscore=true
            },
            onClickLeft(){
                // this.$router.go(-1)
                this.$router.push({name:'SchoolHomeWorkbench'})

            },
            out(){
                this.CommentBtn = false
                this.progressshow = false
                this.changeScore = false
                this.addscore=false
            },
            // 午休纪律积分修改-----

            ShowSiestFun(){
                    this.Showsiest = true
            },
            HideiestFun(){
                    this.Showsiest = false
            },
            ShowDiningFun(){
                    this.Showdining = true
            },
            HideDiningFun(){
                    this.Showdining = false
            },
            ShowWorkFun(){
                    this.Showwork = true
            },
            HideWorkFun(){
                    this.Showwork = false
            },
            ShowSafflowerFun(){
                    this.Showsafflower = true
            },
            HideSafflowerFun(){
                    this.Showsafflower = false
            },
            ShowtrainingFun(){
                    this.Showtraining = true
            },
            HidetrainingFun(){
                    this.Showtraining = false
            },

            changeClunch(index){

                this.lunchNumber = this.siest[index].number

                var number = document.getElementById("ClunchNumber"[index]).value
                // this.$set(this.score.diversification,0,{progressNumber:number})
                console.log( number + "he"+ index)
            },
            // 修改进步分数-----
            changePro(){
                var rule = /^[0-9]+$/
                const data = {}
                const type = 1
                const number = document.getElementById('progressnumber').value
                if (number){
                    data.number = number
                }if (type){
                    data.type = type
                }
                if(rule.test(number) &&  number.length<4){
                    ChangeScore(data)
                        .then(res=>{
                            if (res.status === 200){
                                this.$set(this.score.diversification,0,{progressNumber:number})
                                Toast.success("修改成功！！");
                                let timer = setTimeout(()=>{
                                    clearTimeout(timer);
                                    // this.$router.push({name:'SafflowerPrizeManagement'});
                                },2800)
                                this.GetStuFlower()
                            }else {
                                Toast.fail("修改失败！")
                            }
                        }).catch(() => {
                        throw new Error("异常!")
                    })
                    this.progressshow=false
                }else{
                  alert("请输入3位以内的数字")
                }
            },
            progress(){
              this.progressshow = true
            },
            // 增加------------------------
            Yadd(){
                const data = {}
                const type = 3
                const score = document.getElementById("score").value
                const number = document.getElementById("flowers").value

                if (type) {
                    data.type = type
                } if (score) {
                    data.score = score
                } if (number) {
                    data.number = number
                }

                if(score<=100 && number<=100 && score>=1 && number>=1){
                    ChangeScore(data)
                        .then(res=>{
                            if (res.status === 200){
                                this.score.fraction.push({score:score,number:number})
                                this.addscore=false
                                Toast.success("修改成功！！");
                                let timer = setTimeout(()=>{
                                    clearTimeout(timer);
                                    // this.$router.push({name:'SafflowerPrizeManagement'});
                                },2800)
                                this.GetStuFlower()
                            }else {
                                Toast.fail("修改失败！")
                            }
                        }).catch(() => {
                        throw new Error("异常!")
                    })
                }else{
                    document.getElementById("ts").style.color="red"
                    document.getElementById("tsse").style.color="red"
                }
            },

            // 取对应修改分数与红花数量----------
            changebtn(index){
                this.changeScore = true
                this.Cscore = this.score.fraction[index].score
                this.Cflowers = this.score.fraction[index].number
                this.Cid = this.score.fraction[index].id
                this.Cindex = index
            },
            // 修改分数/红花操作------------------
            change()
            {
                var rule = /^[0-9]+$/
                const data = {}
                const type = 3
                const id = this.Cid
                const score =  document.getElementById("Cscore").value
                const number = document.getElementById('Cflowers').value
                if (id) {
                data.id = id
                } if (number){
                data.number = number
                }if (type){
                data.type = type
                }if (score){
                data.score = score
                }
                if(rule.test(score) && rule.test(number) && score.length<4 && number.length<4){
                    ChangeScore(data)
                            .then(res=>{
                                if (res.status === 200){
                                    this.$set(this.score.fraction,this.Cindex,{score:score,number:number,id:this.Cid})
                                    Toast.success("修改成功！！");
                                    let timer = setTimeout(()=>{
                                        clearTimeout(timer);
                                        // this.$router.push({name:'SafflowerPrizeManagement'});
                                    },2800)
                                    this.GetStuFlower()
                                }else {
                                    Toast.fail("修改失败！")
                                }
                            }).catch(() => {
                            throw new Error("异常!")
                        })
                    this.changeScore=false
                }else{
                    document.getElementById("Cts").style.color="red"
                    document.getElementById("Ctsse").style.color="red"
                }
            },
            // 获取接口数据（红花）
            GetStuFlower(){
                StuFlower()
                    .then(res => {
                        this.Flower = res.data.data;
                        this.safflowerComment = res.data.data.safflowerComment;
                        this.dining = res.data.data.dining;
                        this.siest = res.data.data.siest;
                        this.work = res.data.data.work;
                        this.safflower = res.data.data.safflower;
                        this.score = res.data.data.score;
                        this.training = res.data.data.training;
                        // this.score = res.data.data.score;
                        // console.log(this.score)
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
        },
        mounted(){
            this.GetStuFlower()
        }
    }


</script>

<style scoped type="less">
.body{
    font-size: 0.14rem;
    }
    .ac_line{
        background-color:#F3F7F8;
        height: 0.1rem;
    }
    .title_bor{
        border-left: solid 2px #3770FB;
        padding-left: 0.1rem;
        color: #333333;
        font-weight:700;
        font-size: 0.16rem;
    }
    .mes_box{
        width: 0.55rem;
        line-height: 0.25rem;
        height: 0.25rem;
        /*border: solid 1px #E7E7E7;*/
    }
    .noon_lunch{
        float: left;
        margin: 0.15rem;
    }
    .noon_box{
        color: #999999;
        margin: 0.15rem 0 0.15rem 0.15rem;
        float: left;
    }
    .change_btn{
        /*display: none;*/
        width: 0.75rem;
        height: 0.25rem;
        background-color: #53ACF8;
        border-radius:3px;
        float: left;
        color: white;
        line-height: 0.25rem;
        margin: 0.15rem 0 0.15rem 0.2rem;
        font-size: 0.12rem;
    }
    .cancel_btn{
        /*display: none;*/
        width: 0.75rem;
        height: 0.25rem;
        background-color: #999999;
        border-radius:3px;
        float: left;
        color: white;
        line-height: 0.25rem;
        margin: 0.15rem 0 0.15rem 0.2rem;
        font-size: 0.12rem;
    }
    .change_btn_se{
        width: 0.75rem;
        height: 0.25rem;
        background-color: #53ACF8;
        border-radius:3px;
        float: left;
        color: white;
        line-height: 0.25rem;
        margin-left: 0.1rem;
        text-align: center;
    }
    .mes_title{
        margin-bottom: 0.1rem;
        color: #666666;
    }
    .sc_hr hr{
        border: none;
        background-color: #EEEEEE;
        height: 0.01rem;
    }
    .add_btn{
        width: 0.2rem;
        height: 0.2rem;
        background: #CCCCCC;
        color: white;
        line-height: 0.2rem;
        text-align: center;
        border-radius:20px;
        float: left;
        margin-right: 0.1rem;
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
    input{
        width: 30%;
    }
    .van-tabs /deep/ span{
        font-size: 0.14rem;
    }
    .van-tabs-bor /deep/ .van-tab:nth-child(2)
    {
        /*background-color:black;*/
        border-right: 1px solid #3770fb;
        border-left: 1px solid #3770fb;
    }
    .siest_input{
        width:80%;
        height: 0.2rem;
        line-height: 0.2rem;
    }
    .add_number{
        margin: 0.1rem auto;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        border-radius:20px;
        background-color:cornflowerblue;
        color: white;

    }
    .reduce_number{
        margin: 0.1rem auto;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        border-radius:20px;
        background-color:red;
        color: white;

    }
    .Showchange{
        display:none
        /*border:solid 1px #E7E7E7*/
    }
    .changebox{
        float:left;border:1px solid rgb(231, 231, 231)
    }
    .ChangeName{
        /*border-bottom: solid 1px #E7E7E7;border-left: solid 1px #E7E7E7*/
        border: solid 1px #E7E7E7;
    }
    .Showsiest {
        display:block
    }
    .Showdining{
        display:block
    }
    .Showwork{
        display:block
    }
    .Showsafflower{
        display:block
    }
    .Showtraining{
        display:block
    }
    .change_S_btn{
        color: blue;
        font-weight: 700;
    }
    .delete_S_btn{
        color: red;
        font-weight: 700;

    }
</style>
