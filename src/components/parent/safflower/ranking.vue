<template>
  <div>
    <van-nav-bar
            title="红花排行榜"
            left-text="返回"
            right-text="筛选年级"
            left-arrow
            @click-left="$router.back()"
            @click-right="choose()"
    />

    <div class="van-tabs_div">
      <van-tabs type="card" @click="getRankData" >
        <van-tab title="总排行">
          <Rankingmes :ranke="allList "  :search="search"></Rankingmes>
        </van-tab>
        <van-tab title="月排行">
          <div class="date_list">
            <i @click="left" class="van-icon van-icon-arrow-left van-cell__left-icon" is-link arrow-direction="left"><!----></i>
            <span @click="Cymonth" v-if="year && month"> {{year}}年{{month}}月  <i data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"><!----></i></span>
            <i @click="right" data-v-506ad3dd="" class="van-icon van-icon-arrow van-cell__right-icon" :class="{choosetime:choosetime}"><!----></i>
          </div>
          <Rankingmes :ranke="monthList" :search="search"></Rankingmes>
        </van-tab>
        <van-tab title="本周排行">
          <Rankingmes :ranke="weekList" :search="search"></Rankingmes>
        </van-tab>
      </van-tabs>
    </div>

    <van-popup v-model="showse" position="bottom" :overlay="true">
      <div style="font-size: 0.14rem">
      <van-picker
              show-toolbar
              title="选择年级"
              :columns="columns"
              @cancel="onCancel"
              @confirm="onConfirm"
      />
      </div>
      <div style="font-size: 0.14rem;line-height: 0.5rem;text-align: center;border-top: 1px solid #ebedf0;color: #1989fa" @click="back"> 点击此处显示全部年级 </div>
    </van-popup>

    <van-popup v-model="Cdate" position="bottom" :overlay="true">
      <van-datetime-picker
              :value="currentDate"
              type="year-month"
              :max-date="minDate"
              :formatter="formatter"
              @confirm="ondateConfirm"
              @cancel="onCancel"
      />
    </van-popup>

  </div>
  <!--<someComponent></someComponent>-->
</template>

<script>
  import Rankingmes from './components/ranking'
  import { Tab, Tabs } from 'vant';
  import { Tag } from 'vant';
  import { NavBar } from 'vant';
  import { Picker  } from 'vant';
  import { DatetimePicker  } from 'vant';
  import { Toast  } from 'vant';
  import { Popup   } from 'vant';
  import { getSafflowerRank } from '@/api/school/safflower'
  //import someComponent from './someComponent'
  export default {
    name: "",
    data() {
      return {
        arr: [{ title: '查看历史月份', type: 1 }],
        type: 1,
        columns: [],
        Allcolumns: [],
        // 年级弹窗
        showse:false,
        Month:new Date().getMonth()+1,
        // 时间选择（左右）
        choosetime:true,
        year:new Date().getFullYear(),
        month:new Date().getMonth()+1,
        // 时间选择弹窗
        Cdate: false,
        currentDate: new Date(),
        minDate: new Date(),
        // 年级筛选
        search:'',
        saveList:[],
        RankSaveList:{1:'',2:'',3:''},
        allList:[],// 总排行
        monthList:[],//月排行
        weekList:[],// 周排行
      }
    },
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Picker .name]: Picker ,
      [Tag.name]: Tag,
      [Popup .name]: Popup ,
      [Toast.name]: Toast,
      [NavBar.name]: NavBar,
      [DatetimePicker.name]: DatetimePicker,
      Rankingmes: Rankingmes,
      //someComponent
    },
    methods: {
      // 取消弹窗选择
      onCancel(){
        this.show = false
        this.showse = false
        this.Cdate = false;
      },
      // 时间 选择
      Cymonth(){
        this.Cdate = true
      },
        // 确定月排行日期
      ondateConfirm(value) {
         this.$loading(undefined, undefined, true)
        var date = value;
        var m = date.getMonth() + 1;
        var d = date.getDate();
        this.year=date.getFullYear()
        this.month=m
        if (m >= 1 && m <= 9) {
          m = "0" + m;
        }
        if (d >= 0 && d <= 9) {
          d = "0" + d;
        }
        this.date = date.getFullYear() + "-" + m
        if(this.year === new Date().getFullYear() && this.month === new Date().getMonth()+1){
          this.choosetime = true
        }else{
          this.choosetime = false
        }
          const data = {}
          data.year = this.year
          data.month = this.month
          getSafflowerRank(this.type,data)
                .then(res => {
                  this.$loadingHide()
                  if (res.status === 200) {
                      this.RankSaveList[this.type] = res.data.data
                      this.monthList = res.data.data
                      let classlist= [];
                      for (let lfd of this.monthList.rankList){
                        classlist.push(lfd.gradeName)
                      }
                      this.Allcolumns = classlist
                  }
                }).catch(() => {
          throw new Error("获取排行异常！")
        })
          this.monthList = this.RankSaveList[this.type]
          this.Cdate = false;
      },
        // 日期筛选字符
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }
        return value;
      },
      // 左右选择日期
      left(){
         this.$loading(undefined, undefined, true)
        this.month-=1
        if(this.month<1){
          this.month+=12
          this.year-=1
        }
        if(this.month<10 ){
          this.date=this.year+'-'+'0'+this.month
        }else{
          this.date=this.year+'-'+this.month
        }
        this.choosetime = false
          const data = {}
          data.year = this.year
          data.month = this.month
          getSafflowerRank(this.type,data)
                .then(res => {
                  this.$loadingHide()
                  if (res.status === 200) {
                      this.RankSaveList[this.type] = res.data.data
                      this.monthList = res.data.data
                      let classlist= [];
                      for (let lfd of this.monthList.rankList){
                        classlist.push(lfd.gradeName)
                      }
                      this.Allcolumns = classlist
                  }
                }).catch(() => {
          throw new Error("获取排行异常！")
        })
          this.monthList = this.RankSaveList[this.type]
      },
      right(){
         this.$loading(undefined, undefined, true)
        this.month+=1
        if(this.month>12){
          this.month-=12
          this.year+=1
        }
        if(this.month<10 ){
          this.date=this.year+'-'+'0'+this.month
        }else{
          this.date=this.year+'-'+this.month
        }

        if(this.year === new Date().getFullYear() && this.month === new Date().getMonth()+1 ){
          this.choosetime = true
        }
          const data = {}
          data.year = this.year
          data.month = this.month
          getSafflowerRank(this.type,data)
                .then(res => {
                  this.$loadingHide()
                  if (res.status === 200) {
                      this.RankSaveList[this.type] = res.data.data
                      this.monthList = res.data.data
                      let classlist= [];
                      for (let lfd of this.monthList.rankList){
                        classlist.push(lfd.gradeName)
                      }
                      this.Allcolumns = classlist
                  }
                }).catch(() => {
          throw new Error("获取排行异常！")
        })
          this.monthList = this.RankSaveList[this.type]
      },
      // 弹窗选择年级
      choose(){
        var resultArr = [];
        for (var i = 0; i < this.Allcolumns.length; i++) {
          for (var j = 0; j < resultArr.length; j++) {
            if (resultArr[j] == this.Allcolumns[i]) {
              break;
            }
          }
          if (j == resultArr.length) {
            resultArr[resultArr.length] = this.Allcolumns[i];
          }
        }
        // 弹窗筛选年级年级排序
        const arr = ['一', '二', '三', '四', '五', '六', '初','未']
        const list = resultArr.sort((a, b) => arr.indexOf(a[0]) - arr.indexOf(b[0]))
        this.columns = list
        if(resultArr.length>0 && resultArr != []){
          this.showse = true
        }
      },
        // 确定选择年级按键
      onConfirm(val){
        this.search = val
        this.showse = false
      },
      back(){
        this.search = ''
        this.showse = false
      },
      //  第一次切换排行选项卡获取排行数据，1
      getRankData(index) {
        this.type = index + 1;
        this.selectData()
      },
        // 第一次切换排行选项卡获取排行数据，2
      selectData() {
        if(this.type === 1 && this.RankSaveList[this.type] === ''){
           this.$loading(undefined, undefined, true)
          getSafflowerRank(this.type, this.type ===2 ? data : null)
                  .then(res => {
                    this.allList = res.data.data
                    var classlist= [];
                    for (let lfd of this.allList.rankList){
                      classlist.push(lfd.gradeName)
                    }
                    this.Allcolumns = classlist

                    this.RankSaveList[this.type] = 1
                    this.$loadingHide()
                  }).catch(() => {
            throw new Error("获取总排行异常!")
          })
        } else if(this.type === 2 && this.RankSaveList[this.type] === ''){
           this.$loading(undefined, undefined, true)
          const data = {}
              data.year = this.year
              data.month = this.month
          getSafflowerRank(this.type, this.type ===2 ? data : null)
                  .then(res => {
                    this.monthList = res.data.data
                    var classlist= [];
                    for (let lfd of this.monthList.rankList){
                      classlist.push(lfd.gradeName)
                    }
                    this.Allcolumns = classlist

                    this.RankSaveList[this.type] = 2
                    this.$loadingHide()
                  }).catch(() => {
            throw new Error("获取月排行异常!")
          })
        } else if(this.type === 3 && this.RankSaveList[this.type] === ''){
           this.$loading(undefined, undefined, true)
          getSafflowerRank(this.type, this.type ===2 ? data : null)
                  .then(res => {
                    this.weekList = res.data.data
                    var classlist= [];
                    for (let lfd of this.weekList.rankList){
                      classlist.push(lfd.gradeName)
                    }
                    this.Allcolumns = classlist

                    this.RankSaveList[this.type] = 3
                    this.$loadingHide()
                  }).catch(() => {
            throw new Error("获取月排行异常!")
          })
        }
      },
    },
    mounted() {
      this.selectData();
    },
  }
</script>

<style scoped>
  .van-nav-bar .van-icon, .van-nav-bar__text {
    color: white;
  }

  .van-nav-bar {
    background-color: #3770FB;
  }

  .van-nav-bar__title {
    font-size: 0.16rem;
    color: white;
  }


  .van-tabs {
    margin-top: 0.15rem;
  }

  .van-tabs_div {
    margin-bottom: 0.1rem;
  }

  .van-tabs_div >>> .van-tabs__nav--card .van-tab.van-tab--active {
    background-color: #3770fb;
    color: white;
  }

  .van-tabs_div >>> .van-tabs__nav--card {
    border: 1px solid #3770fb;
  }

  .van-tabs_div >>> .van-tabs__nav--card .van-tab {
    color: #3770fb;
  }

  .van-tabs_div >>> .van-tabs__nav--card .van-tab {
    border-right: none;
  }

  .van-tabs_div >>> .van-tab:nth-child(2) {
    border-left: 1px solid;
    border-right: 1px solid;
  }
  .date_list{
    margin-top: 0.15rem;
    text-align: center;
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .date_list span{
    margin: 0 0.4rem;
  }
  .choosetime{
    display: none;
  }
</style>
