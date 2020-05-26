<template>
    <div>
        <div class="top_search">
            <div class="left">
                <div class="date_top_list">
                    <van-cell title="代理商" is-link arrow-direction="down"   @click="showcho"/>
                </div>
                <div class="search_div">
                   <div><input type="text" class="search" placeholder="请输入搜索关键词"  v-model='search ' ></div>
                    <div> <i class="van-icon van-icon-search"><!----></i></div>
                </div>
            </div>
            <img :src="settingpic" @click="HideBox">
        </div>

        <div>
            <div style="float:left; width: 3.55rem;height:5rem;border: solid 0.01rem #dcdcdc;overflow-x: scroll;margin:0 0.1rem ;">

                <div class="testsilder" style="width: 6rem;padding: 0.01rem">
                    <div>
                        <div  class="box firtoptitle " :class={DL:DL} >
                            <span>代理商</span>
                        </div>
                        <div  class="box toptitle" :class={DL:DQ} >
                            <span>地区</span>
                        </div>
                        <div  class="box toptitle" :class={DL:PP} >
                            <span>品牌</span>
                        </div>
                        <div  class="box toptitle"  :class={DL:XQ}>
                            <span>校区</span>
                        </div>

                        <div  class="personbox" >
                            <div  class="one">    <span>校长</span></div>
                            <div>
                                <div class="bind">绑定</div>
                                <div class="unbind">未绑</div>
                            </div>
                        </div>
                        <div  class="personbox" >
                            <div  class="one">    <span> 教师</span></div>
                            <div>
                                <div class="bind">绑定</div>
                                <div class="unbind">未绑</div>
                            </div>
                        </div>
                        <div  class="personbox" >
                            <div class="one" >    <span>学生</span></div>
                            <div>
                                <div class="bind">绑定</div>
                                <div class="unbind">未绑</div>
                            </div>
                        </div>
                        <div class="firstsign">
                            <span>首次启用</span>
                        </div>
                    </div>

                    <div v-if="searchData.length>0">
                        <div style="float: left;width: 100%;" v-for="(item,index) in searchData" :key="index">
                            <div  class="box" :class={DL:DL}>
                                <span>{{item.agentName}}</span>
                            </div>
                            <div  class=" " style="float:left;">
                                <div v-for="(itemse,index) in item.area" :key="index">
                                    <div  class="box" :class={DL:DQ}>
                                        {{itemse.areaName}}
                                    </div>
                                    <div class=" " style="float:left;">
                                        <div v-for="(itemth,index) in itemse.brand" :key="index">
                                            <div class="box address" :class={DL:PP} >
                                                <span>{{itemth.brandName}}</span>
                                            </div>
                                            <div style="float:left;">
                                                <div v-for="(itemfo,index) in itemth.school" :key="index">
                                                    <div class="schoolname" :class={DL:XQ} > {{itemfo.schoolName}}</div>
                                                    <div style="float:left;">
                                                        <div  class="numberbox">{{itemfo.principal.hasBinding}}</div>
                                                        <div  class="numberbox">{{itemfo.principal.notBinding}}</div>
                                                        <div  class="numberbox">{{itemfo.teacher.hasBinding}}</div>
                                                        <div  class="numberbox">{{itemfo.teacher.notBinding}}</div>
                                                        <div  class="numberbox">{{itemfo.student.hasBinding}}</div>
                                                        <div  class="numberbox">{{itemfo.student.notBinding}}</div>
                                                        <div   class="timebox">{{itemfo.startUseDate}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="float: left;text-align: center;width: 100%;line-height: 1rem;" v-else>查无此无数据</div>
                </div>
            </div>
        </div>

        <van-popup v-model="showMonth" position="bottom" :overlay="true">
            <div style="font-size: 0.15rem;border-bottom: solid 1px #dcdcdc;line-height: 0.5rem;color: #1989fa;font-weight: 700" @click="reset">点击此处返回所有数据</div>
            <Test @func="Showdate"></Test>
        </van-popup>

        <van-popup v-model="HideBoxTitle" position="bottom" :overlay="true">
           <div style="text-align: left;padding: 0.1rem;font-size: 0.14rem;float: left;" @click="onCancel">返回</div>
            <div style="text-align: left;padding: 0.1rem;font-size: 0.14rem;text-align: center;text-align: center;color: #1989fa;">选择要隐藏的表头</div>
            <van-checkbox v-model="DL" class="hidebtn">代理商</van-checkbox>
            <van-checkbox v-model="DQ" class="hidebtn">地区</van-checkbox>
            <van-checkbox v-model="PP" class="hidebtn">品牌</van-checkbox>
            <van-checkbox v-model="XQ" class="hidebtn">校区</van-checkbox>
        </van-popup>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import { Search } from 'vant';
    import { Cell, CellGroup,icon } from 'vant';
    import { Picker } from 'vant';
    import { Popup } from 'vant';
    import { Switch } from 'vant';
    import { Checkbox, CheckboxGroup } from 'vant';
    import { Populationreport } from '@/api/new-concept/new-concept';
    import Test from './components/population-picker'
    //import someComponent from './someComponent'
    export default {
        name: "",

        computed: {
            searchData: function() {
                var search = this.search;
                if (search) {
                    return this.populationmes.filter(function(product) {
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
                checked: true,

                populationmes:[],
                columnss:[],
                columnssse:[],
                citys:[],
                country:[],

                area:[],

                showMonth: false,
                HideBoxTitle: false,
                DL:false,
                DQ:false,
                PP:false,
                XQ:false,

                search:'',
                searchse:'',
                settingpic: require("../../assets/img/newconcept/settingse.png"),

                Tdate:''
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
            [Switch.name]: Switch,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            Test:Test
            //someComponent
        },
       methods:{
           reset(){
               this.year = new Date().getFullYear()
               this.month = new Date().getMonth()+1
               this.GetPopulationreport()
               this.showMonth = false
           },
           HideBox(){
               this.HideBoxTitle= true
           },
           Showdate(agent,area,brand,school){
               const data = {}
               if (agent) {
                   data.agent = agent
               }
               if (area) {
                   data.area = area
               }
               if (brand) {
                   data.brand = brand
               }
               if (school) {
                   data.school = school
               }
               // console.log(this.Tdate)
               Populationreport(agent,area,brand,school).then(res => {
                   this.populationmes = res.data.data;
               }).catch(() => {
                   throw new Error("选择日期（新师路角色）异常!")
               })
               this.showMonth = false

           },
           onChange(picker, values) {
               picker.setColumnValues(1, this.columnss [values[0].name]);
           },
           onCancel(){
               this.HideBoxTitle = false
               this.showMonth = false
           },
           onConfirm(value){
               this.showMonth = false
               console.log( value )
           },
           showcho(){
               var address= [];
               for (let ad of this.populationmes){
                   address.push(ad.agentName)
               }
               this.columnss = address
               this.showMonth = true
           },
           GetPopulationreport(){
               this.$loading();
               Populationreport().then(res => {
                   this.$loadingHide();
                   if (res.status === 200) {
                       this.populationmes = res.data.data;
                   }
               }).catch(() => {
                   throw new Error("获取新师路角色数据异常!")
               })
           },
       },
        mounted(){
            this.GetPopulationreport()
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
        border:solid 1px white;
        line-height: 0.2rem;
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
        width: 0.45rem;
        height: 1rem;
        float: left;
        border: solid #dcdcdc 0.01rem;
        margin: 0.01rem;
    }
    .firtoptitle
    {
        line-height:0.9rem;
        height: 0.9rem;
    }
    .toptitle{
        line-height: 0.9rem;
        height: 0.9rem;
    }
    .schoolname{
        width: 0.45rem;
        text-align: center;
        height: 1rem;
        line-height: 0.2rem;
        float: left;
        border: solid #dcdcdc 0.01rem;
        margin: 0.01rem;
    }
    .numberbox{
        line-height: 1rem;
        width: 0.4rem;
        height: 1rem;
        float: left;
        border: solid #dcdcdc 0.01rem;
        margin: 0.01rem;
    }
    .timebox{
        line-height: 1rem;
        width: 1.35rem;
        height: 1rem;
        float: left;
        border: solid #dcdcdc 0.01rem;
        margin: 0.01rem;
    }
    .personbox{
        width:0.84rem ;
        float: left;
        border: solid #dcdcdc 0.01rem;
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
        border: solid #dcdcdc 0.01rem;
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
        height:1rem;
        line-height: 0.2rem;
    }
    .hidebtn{
        margin: 0.1rem 0;
    }
    .DL{
        display: none;
    }

</style>
