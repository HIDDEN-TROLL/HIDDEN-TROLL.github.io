<template>
    <div>
        <div class="top_search">
            <div class="left">
                <div class="date_top_list">
                    <van-cell title="校区" is-link arrow-direction="down"    @click="showcho"/>
                </div>
                <div class="search_div">
                   <div><input type="text" class="search" placeholder="请输入校区名称"  v-model='search ' ></div>
                    <div> <i class="van-icon van-icon-search"><!----></i></div>
                </div>
            </div>
            <img :src="settingpic" @click="HideBox">
        </div>

        <div>
            <div style="float:left; width: 3.55rem;border: solid 0.01rem #dcdcdc;overflow-x: scroll;margin: 0.1rem 0 0.1rem 0.1rem;padding: 0.02rem">

                <div class="testsilder" style="width: 5rem">

                    <div style="float:left;width:5rem">

                        <div  class="box toptitle"  :class={DL:XQ} >
                            <span>校区</span>
                        </div>

                        <div  class="personbox" :class={DL:PL}>
                            <div  class="one">    <span>校长</span></div>
                            <div>
                                <div class="bind">绑定</div>
                                <div class="unbind">未绑</div>
                            </div>
                        </div>
                        <div  class="personbox" :class={DL:TE}>
                            <div  class="one">    <span> 教师</span></div>
                            <div>
                                <div class="bind">绑定</div>
                                <div class="unbind">未绑</div>
                            </div>
                        </div>
                        <div  class="personbox" :class={DL:ST}>
                            <div class="one" >    <span>学生</span></div>
                            <div>
                                <div class="bind">绑定</div>
                                <div class="unbind">未绑</div>
                            </div>
                        </div>
                        <div class="firstsign" :class={DL:FI}>
                            <span>首次启用</span>
                        </div>
                    </div>
                    <div style="float:left;width: 4.3rem">
                        <div v-if="searchData.length>0">
                            <div v-for="(itemfo,index) in searchData" :key="index" style="float: left;width: 5rem">

                                <div class="schoolname"  :class={DL:XQ}> {{itemfo.schoolName}}</div>
                                <div style="float:left;">
                                    <div  class="numberbox" :class={DL:PL}>{{itemfo.principal.hasBinding}}</div>
                                    <div  class="numberbox" :class={DL:PL}>{{itemfo.principal.notBinding}}</div>
                                    <div  class="numberbox" :class={DL:TE}>{{itemfo.teacher.hasBinding}}</div>
                                    <div  class="numberbox" :class={DL:TE}>{{itemfo.teacher.notBinding}}</div>
                                    <div  class="numberbox" :class={DL:ST}>{{itemfo.student.hasBinding}}</div>
                                    <div  class="numberbox" :class={DL:ST}>{{itemfo.student.notBinding}}</div>
                                    <div  class="timebox" :class={DL:FI}>{{itemfo.startUseDate}}</div>
                                </div>
                            </div></div>
                        <div v-else style="float:left;line-height: 1rem;text-align: center; width: 3.55rem;">查无此次校区数据</div>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="Caddress" position="bottom" :overlay="true">
            <div style="font-size: 0.15rem;border-bottom: solid 1px #dcdcdc;line-height: 0.5rem;color: #1989fa;font-weight: 700" @click="GetbrandnumberPeopleReport()">点击此处返回今日所有数据</div>
            <van-picker
                    show-toolbar
                    title="请选择校区"
                    :columns="columnss"
                    @cancel="onCancel"
                    @confirm="onConfirm"
            />
        </van-popup>

        <van-popup v-model="HideBoxTitle" position="bottom" :overlay="true">
            <div style="text-align: left;padding: 0.1rem;font-size: 0.14rem;float: left;" @click="onCancel">返回</div>
            <div style="text-align: left;padding: 0.1rem;font-size: 0.14rem;text-align: center;text-align: center;color: #1989fa;">选择要隐藏的表头</div>
            <van-checkbox v-model="XQ" class="hidebtn">校区</van-checkbox>
            <van-checkbox v-model="PL" class="hidebtn">校长</van-checkbox>
            <van-checkbox v-model="TE" class="hidebtn">教师</van-checkbox>
            <van-checkbox v-model="ST" class="hidebtn">学生</van-checkbox>
            <van-checkbox v-model="FI" class="hidebtn">首次启用</van-checkbox>
        </van-popup>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import { Search } from 'vant';
    import { Picker } from 'vant';
    import { Popup } from 'vant';
    import { Checkbox, CheckboxGroup } from 'vant';
    import { Cell, CellGroup,icon } from 'vant';
    import { brandnumberPeopleReport } from '@/api/brand/brand';

    //import someComponent from './someComponent'
    export default {
        name: "",

        computed: {
            searchData: function() {
                var search = this.search;
                if (search) {
                    return this.populationmesse.filter(function(product) {
                        return Object.keys(product).some(function(key) {
                            return String(product[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.populationmes;
            }
        },
        data(){
            return {
                populationmes:[],
                populationmesse:[],

                Caddress: false,

                columnss:[],
                search:'',
                searchse:'',
                msg: "Hello Vue.js",
                settingpic: require("../../assets/img/newconcept/settingse.png"),

                HideBoxTitle: false,
                DQ:false,
                XQ:false,
                PL:false,
                TE:false,
                ST:false,
                FI:false,
                TitleName:''
            }
        },
        components: {
            [NavBar.name]:NavBar,
            [Search.name]:Search,
            [icon.name]:icon,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,

            //someComponent
        },
       methods:{
           HideBox(){
               this.HideBoxTitle= true
           },
            // 获取数据
           GetbrandnumberPeopleReport(){
               this.$loading();

               brandnumberPeopleReport().then(res => {
                   this.$loadingHide();
                   if (res.status === 200) {
                       this.populationmes = res.data.data.school;
                       this.populationmesse = res.data.data.school;
                       this.TitleName = res.data.data.brandName;
                       this.$emit('func',this.TitleName)
                   }
               }).catch(() => {
                   throw new Error("获取品牌（人数报表）数据异常!")
               })
               this.Caddress = false
           },
           onCancel() {
               this.Caddress = false;
               this.HideBoxTitle= false
           },
           onConfirm(val) {
                   brandnumberPeopleReport(val).then(res => {
                       this.populationmes = res.data.data.school;
                   }).catch(() => {
                       throw new Error("选择品牌（人数报表校区）异常!")
                   })

               this.Caddress = false;
           },
           showcho(){
               var address= [];
               // var back = "查看quanb"

               for (let ad of this.populationmesse){
                   // back.push(ad)

                   address.push(ad.schoolName)
               }

               // for (let ad of this.populationmesse){
               //     back.push(ad)
               // }


               this.columnss = address
               this.Caddress = true

           },
       },
        mounted(){
            this.GetbrandnumberPeopleReport()
        }
    }
</script>

<style scoped>
    .lation_mes table,td,th{
        border-collapse: collapse;
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.17rem;
        border: solid 1px #DCDCDC;
    }
/*代理商------------------------------------------------------------------*/
    .left{
        font-size:0.14rem;
        float: left;
        width: 3.12rem;
        height: 0.25rem;
        border: solid #BCBCBC 0.01rem;
        border-radius: 0.04rem;
    }
    .top_search{
        float: left;
        margin:0.15rem ;
    }
    .top_search img{
        width:0.24rem;
        height:0.24rem;
        margin-left: 0.07rem;
        float: left;
    }
    .search_div{
        width:75%;
       margin-left:0.05rem;
        float: left;
        border-left: solid 1px #CCCCCC;
    }
    .search{
        float: left;
        width:90%;
        margin-left:0.05rem;
        line-height: 0.2rem;
        border:solid 1px white;
    }
    .lation_mes{
        float: left;
        margin-top: 0.3rem;
    }
    .date_top_list{
        width:0.7rem;
        float: left;
    }
    .van-cell__title{
        flex:none;
        color:#666666;
        text-align: center;
    }
    .van-cell  {
        line-height: 0.24rem;
        font-size: 0.14rem;
        margin-left:0.05rem;
        width:100%;
        padding: 0 ;
        height: 0.2rem;
    }
    .van-icon {
        font-size: 0.16rem;
        line-height: 0.24rem;
    }

    div{
        font-size: 0.12rem;
        text-align: center;
    }
    .box{
        width: 0.4rem;
        float: left;
        border: solid #dcdcdc;
        border-width: 0 0.01rem 0.01rem 0;
    }
    .toptitle{
        line-height: 0.9rem;
        height: 0.9rem;
        border: solid 1px #dcdcdc;
        margin: 0.01rem;
    }
    .schoolname{
        width: 0.4rem;
        text-align: center;
        height: 1rem;
        line-height: 0.2rem;
        float: left;
        border: solid 1px #dcdcdc;
        margin: 0.01rem;
    }
    .numberbox{
        line-height: 0.4rem;
        width: 0.4rem;
        height: 1rem;
        float: left;
        margin: 0.01rem;
        border: solid 1px #dcdcdc;
    }
    .timebox{
        line-height: 0.4rem;
        width: 1.35rem;
        height: 1rem;
        float: left;
        margin: 0.01rem;
        border: solid 1px #dcdcdc;
    }
    .personbox{
        width:0.84rem ;
        float: left;
        border: solid 1px #dcdcdc;
        margin: 0.01rem;
    }
    .personbox .one{
        line-height: 0.45rem;
        border: solid #dcdcdc;
        border-width: 0 0 0.01rem  0;
    }
    .firstsign{
        width: 1.35rem;
        line-height: 0.9rem;
        float: left;
        border: solid 1px #dcdcdc;
        margin: 0.01rem;
    }
    .bind{
        line-height: 0.44rem;
        width: 0.4rem;
        float: left;
        border: solid #dcdcdc;
        border-width: 0  0.01rem 0 0;
    }
    .unbind{
        line-height: 0.44rem;
    }
    .address{
        height: 0.4rem;
        line-height: 0.2rem;
    }
    .hidebtn{
        margin: 0.1rem 0;
    }
    .DL{
        display: none;
    }

</style>
