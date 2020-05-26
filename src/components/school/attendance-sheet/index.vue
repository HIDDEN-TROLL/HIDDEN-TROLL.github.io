<template>
  <div id="attendance-sheet">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar
        title="考勤报表"
        left-text="返回"
        right-text="查看指南"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="class-info">
      <div class="stat-list">
        <!-- <van-tabs> -->
        <!-- <van-tab v-for="(item,index) in 8" :title="'第 ' + item+'班' " :key="index"> -->
        <ClassList :class-list="classNameList" v-on:classGrade="getChangeIndex"></ClassList>
        <!-- </van-tab> -->
        <!-- </van-tabs> -->
      </div>
      <div class="select-cell">
        <van-row>
          <van-col span="11">
            <span @click="monthSelect">
<!--              {{currentDate | timeFilters}}-->
              {{year}}年{{month}}月
              <van-icon name="arrow-down" />
            </span>
          </van-col>
          <van-col span="2">|</van-col>
          <van-col span="11">
            <span  @click="typeSelect">
              {{typeSelectText}}
              <van-icon name="arrow-down"/>
            </span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="class-tabel">
      <div class="table-slect">
        <van-row>
          <van-col span="8">
            <img :src="objs.showGarde ? imgSrc: iimgSrc1" alt>
            <span @click="showGradeClick">{{hideGrade}}</span>|
          </van-col>
          <van-col span="16">本月签到学生：{{total}}位</van-col>
        </van-row>
      </div>
      <ScorllTabel :x-list="xList" :x-field="xField" :y-list="yList" :type-obj="objs"></ScorllTabel>
    </div>
    <div class="month-sleect">
      <van-popup v-model="showMonth" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :formatter="formatter"
          @cancel="cancelPopup"
          @confirm="confirmPopup"
          :max-date="maxDate"
        />
      </van-popup>
    </div>
    <div class="type-sleect">
      <van-actionsheet
        v-model="showTypeSelect"
        :actions="actions"
        @select="onSelect"
      />
    </div>
    <!--查看指南-->
    <Guide :guide-show="guideShow" @close="guideHide"></Guide>
  </div>
</template>

<script>
import { NavBar, Icon, Tab, Tabs, Row, Col, DatetimePicker, Popup, Actionsheet } from "vant";
import ScorllTabel from "../../common/scroll-tabel";
import ClassList from "../components/class-list";
import Guide from "./guide";
import { selectClassList, getSheetData } from '@/api/school/attendance-sheet';

export default {
  name: "attendance-sheet",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup,
    [Actionsheet.name]: Actionsheet,
    [DatetimePicker.name]: DatetimePicker,
    ScorllTabel: ScorllTabel,
    ClassList: ClassList,
    Guide:Guide
  },
  data() {
    return {
      guideShow:false,//显示查看指南
      imgSrc: require('@/assets/img/schoolRole/visibility-show.png'),
      iimgSrc1:require('@/assets/img/schoolRole/visibility-hide.png'),
      classNameList: [],
      actions: [
        {
          name: '全部数据',
          id: 0,
        },
        {
          name: '进园签到',
          id: 1,
        },
        {
          name: '离园签到',
          id: 2,
        },
        {
          name: '考勤记录',
          id: 3,
        },
      ],
      maxDate:new Date(),
      activeId:null,
      currentClaassId:"",
      currentDate: new Date(),
      cuntDays: null,//当月天数
      showMonth: false,
      showTypeSelect: false,
      typeSelectText: "进园签到",
      total: 0,
      xList: [
        [
          {
            field_name: "statis_date",
            name: "",
            week: '',
            colspan: 1, //指定单元格 横向 跨越的 列数
            rowspan: 2, //指定单元格 纵向 跨越的 行数
          },
        ],
      ],
      xField: [
        "statis_date",
      ],
      yList: [],
      objs: {
        type: 1,
        showGarde: true,
        maxHeight: 2,
      },
      backData: [],
      hideGrade:'隐藏年级',
      year:new Date().getFullYear(),
      month:new Date().getMonth()+1,
    };
  },
  filters: {
    timeFilters: function (value) {
      return value.getFullYear() + '年' + (value.getMonth() + 1) + '月'
    },
  },
  methods: {
    classGrade(){

    },
    onClickLeft() {
      this.$router.back(-1);
    },
    onClickRight(){
      this.guideShow = true;
    },
    guideHide(bl){
      this.guideShow = bl;
    },
    cancelPopup() {
      this.showMonth = false;
    },
    confirmPopup() {
      this.showMonth = false;
      this.getSheetDate();
    },
    //显示、隐藏年级
    showGradeClick() {
      this.objs.showGarde = !this.objs.showGarde;
      if (this.objs.showGarde) {
        //this.imgSrc = require("../../../assets/img/schoolRole/visibility-show.png");
        this.hideGrade = '隐藏年级'
      } else {
        //this.imgSrc = require("../../../assets/img/schoolRole/visibility-hide.png");
        this.hideGrade = '显示年级'
      }
    },
     // 切换班级重置
    getChangeIndex(obj) {
      if(obj.id!=this.activeId){
        this.currentClaassId = obj.id;
        this.getSheetDate();
      }
    },
    monthSelect() {
      this.showMonth = true;
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      this.getCountDays();//设置表格当月天数
      return value;
    },
    typeSelect() {
      this.showTypeSelect = true;
    },
    //考勤类型选择
    onSelect(item) {
      this.showTypeSelect = false;
      this.typeSelectText = item.name;
      this.objs.type = item.id
    },
    getCountDays() {
      var curDate = this.currentDate;
      /* 获取当前月份 */
      var curMonth = curDate.getMonth();
      /* 生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
      curDate.setMonth(curMonth + 1);
      /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
      curDate.setDate(0);
      /* 返回当月的天数 */
      this.cuntDays = curDate.getDate();

    },
    getClassList() {
      return selectClassList(0, 0)
        .then(res => {
          //班级列表数据处理
          if (res.data.meta.success) {
            this.classNameList = [];
            this.currentClaassId = res.data.data.list[0].id;
            this.getSheetDate();
            for (let item of res.data.data.list) {
              if (item.id) {
                this.classNameList.push({
                  id: item.id,
                  name: item.name,
                });
              }
            }
          }
        })
    },
    // 列表表格数据处理
    tabelFunction() {

      //重置表格
      this.xList= [
        [
          {
            field_name: "statis_date",
            name: "",
            week: '',
            colspan: 1, //指定单元格 横向 跨越的 列数
            rowspan: 2, //指定单元格 纵向 跨越的 行数
          },
        ],
      ];
      this.yList=[];
      this.xField=["statis_date"]

      //根据当月天数生成数组
      let weekArray = ["日", "一", "二", "三", "四", "五", "六"];
      let thDate = [];//表头数据
      // let lsObj = {};//表格内容对象
      // for (let x = 1; x <= this.cuntDays; x++) {//创建容器对象生成表格时间列表内容
      //   lsObj['area_name' + x] = { entryTime: [], exitTime: [], otherTime: [] }
      //   for (let l = 0; l < this.backData.length; l++) {
      //     for (let s = 0; s < this.backData[l].records.length; s++) {
      //       if (this.backData[l].records.length > 0) {
      //         if (this.backData[l].records[s].day == x) {
      //           lsObj['area_name' + x].entryTime = this.backData[l].records[s].entryTime;
      //           lsObj['area_name' + x].exitTime = this.backData[l].records[s].exitTime;
      //           lsObj['area_name' + x].otherTime = this.backData[l].records[s].otherTime
      //         }
      //       }
      //     }
      //   }
      // }
      //生成表格内容
      for (let b = 0; b < this.backData.length; b++) {
        let lsObj = {}
        for (let x = 1; x <= this.cuntDays; x++) {//创建容器对象生成表格时间列表内容
          lsObj['area_name' + x] = { entryTime: [], exitTime: [], otherTime: [] }
          for (let s = 0; s < this.backData[b].records.length; s++) {
            if (this.backData[b].records[s].day == x) {
              lsObj['area_name' + x].entryTime = this.backData[b].records[s].entryTime;
              lsObj['area_name' + x].exitTime = this.backData[b].records[s].exitTime;
              lsObj['area_name' + x].otherTime = this.backData[b].records[s].otherTime
            }
          }
        }
        lsObj.statis_date = { sName: this.backData[b].name, sNameTimes: "10", sGarde: this.backData[b].gradeName,id:this.backData[b].id }
        this.yList.push(lsObj)
      }

      for (let i = 1; i <= this.cuntDays; i++) {//从当月1号开始
        //生成表头
        //生成日期
        let today = this.currentDate.getFullYear() + '-' + (this.currentDate.getMonth()+1>=10 ? this.currentDate.getMonth()+1 : '0'+(this.currentDate.getMonth()+1)) + '-' + (i>=10 ? i : '0'+i)
        //获取对应日期的星期
        let weeks = weekArray[new Date(today).getDay()];
        thDate.push(
          {
            field_name: "area_name" + i,
            name: i + "号",
            week: '周' + weeks,
            colspan: 1, //指定单元格 横向 跨越的 列数
            rowspan: 1, //指定单元格 纵向 跨越的 行数
          },
        )
        //生成列名称
        this.xField.push("area_name" + i);


      }
      this.xList.push(thDate);

    },
    getSheetDate() {

      let parameter = {
        date: this.currentDate.getFullYear() + '-' + (
                (this.currentDate.getMonth() + 1) < 10 ? '0' + (this.currentDate.getMonth() + 1) : (this.currentDate.getMonth() + 1)),
        classId: this.currentClaassId,
      }
      this.year = this.currentDate.getFullYear()
      this.month =((this.currentDate.getMonth() + 1) < 10 ? '0' + (this.currentDate.getMonth() + 1) : (this.currentDate.getMonth() + 1))

      return getSheetData(parameter)
        .then(res => {
          if (res.data.meta.success) {
            //this.yList=[];
            this.total = res.data.data.length;
            this.backData = res.data.data;
            this.tabelFunction();//生成列表
          }
        })
    },
  },
  created() {
    this.getCountDays();//获取当月天数
   // this.$loading();
    this.getClassList();
  },
};
</script>

<style scoped lang="less">
#attendance-sheet {
  font-size: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;

  .go-back {
    flex-shrink: 0;

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

  .class-info {
    flex-shrink: 0;
    border-bottom: 10px solid #f3f7f8;

    .stat-list {
      padding: 0.05rem 0.16rem 0;
      background-color: #fff;
      box-sizing: border-box;
    }

    .select-cell {
      height: 48px;
      justify-content: center;
      align-items: center;
    }

    .select-cell {
      color: #666;
      padding: 0 0.16rem;
      height: 0.48rem;
      font-size: 0.14rem;
      text-align: center;
      line-height: 0.48rem;
    }
  }

  .class-tabel {
    font-size: 0.14rem;
    color: #666;
    line-height: 0.48rem;
    padding: 0 0.16rem 0.2rem;

    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .van-row {
      border-bottom: 1px solid #eee;

      .van-col {
        display: flex;
        align-items: center;

        img {
          width: 0.24rem;
          height: 0.24rem;
          text-align: center;
        }

        span {
          padding: 0 0.1rem;
        }
      }

      .van-col + .van-col {
        font-size: 0.12rem;
        color: #999;
        text-align: left;
      }
    }
  }
}
</style>
