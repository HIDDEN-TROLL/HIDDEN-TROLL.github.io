<template>
  <div id="grade-detail">
    <div class="go-back">
      <van-nav-bar
        title="班级详情"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <div class="basci-info">
      <div class="b-left info">
        <p>班级名称： <span>{{detail.name}}</span></p>
      </div>
      <div class="b-right info">
        <p>学生数量： <span>{{studentList.length}}位学生</span></p>
      </div>
      <div class="info" style="padding: 0 0.16rem;">
        <p>教师： <span>{{ !Array.isArray(detail.teachers) || detail.teachers.length === 0 ? '暂无' : detail.teachers.map(t => t.name).join('、') }}</span></p>
      </div>
    </div>
    <div class="interval-box"></div>
    <div class="all-grade-list">
      <div class="c-search">
        <div class="according-scope">显示范围： <span @click="isGradeFilterShow = true">{{currentGradeFilterName}} <van-icon name="arrow-down"/></span></div>
        <div class="search-box">
          <van-search
            v-model="searchVal"
            placeholder=""
          />
          <!--<span><van-icon name="search" size="0.12rem"/></span>
          <input type="text">-->
          <!--<van-cell-group>
              <van-field
                      v-model="searchVal"
                      clearable
                      border
                      left-icon="search"
              />
          </van-cell-group>-->
        </div>
      </div>
      <p v-show="Array.isArray(filteredStudentList) && filteredStudentList.length === 0" class="no_data">无数据</p>
      <SchoolList :student-list="filteredStudentList"></SchoolList>
    </div>

    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>

    <Actionsheet
      class="action-sheet"
      v-model="isGradeFilterShow"
      :actions="gradeFilterOptions"
      get-container="#app"
      cancel-text="取消"
      @select="onGradeFilterSelect"/>
  </div>
</template>

<script>
import { NavBar, Field, Icon, Search, Actionsheet } from 'vant';
import SchoolList from '../components/student-list';
import FooterBtn from '../../common/footer-operate-btn'
import { selectClassDetail } from '@/api/school/class-manage'

export default {
  name: "school-class-detail",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Field.name]: Field,
    SchoolList: SchoolList,
    FooterBtn: FooterBtn,
    Actionsheet,
  },
  data() {
    return {
      searchVal: "",
      btnText: [
        {
          type: 1,
          title: '新学生入班',
        },
        {
          type: 2,
          title: '更换教师',
        },  {
          type: 3,
          title: '老学生退班',
        },
      ],
      detail: {},
      studentList: [],
      isGradeFilterShow: false,
      gradeFilterIndex: 0,
      gradeList: ['全部年级', '一年级','二年级','三年级','四年级','五年级','六年级','初中'],
    }
  },
  methods: {
    onGradeFilterSelect(item) {
      this.isGradeFilterShow = false
      this.gradeFilterIndex = item.index
      console.log(item)
    },
    operateBtn(type) {
      if (type === 1) {
        this.$router.push({ name: 'ClassManageClassDetailBox', query: { id: this.$route.query.id } })
      } else if (type === 2) {
        this.$router.push({ name: 'ClassManageReplaceTeacher', query: { id: this.$route.query.id } })
      } else if (type === 3) {
        this.$router.push({ name: 'ClassManageDeleteStu', query: { id: this.$route.query.id,DeleteList:this.studentList } })
      }
    },
    //获取班级详情
    selectClassDetail() {
      this.$loading()
      selectClassDetail(this.$route.query.id)
        .then(res => {
          if (res.data.meta && res.data.meta.code === 0) {
            this.detail = res.data.data;
            this.studentList = res.data.data.students;
          }
        })
        .finally(() => {
          this.$loadingHide()
        })
    },
  },
  created() {
    if (isNaN(parseInt(this.$route.query.id))) {
      this.$router.replace({name:'ClassManage'})
      return
    }
    this.selectClassDetail()
  },
  computed: {
    currentGradeFilterName() {
      return this.gradeList[this.gradeFilterIndex]
    },
    gradeFilterOptions() {
      return this.gradeList.map((name, index) => {
        return {
          index,
          name,
          className: index === this.gradeFilterIndex ? 'active' : 'non-active',
        }
      })
    },
    studentNum() {
      return this.detail.students.length
    },
    filteredStudentList() {
      if (this.gradeFilterIndex === 0 && this.searchVal.length === 0) {
        return this.studentList
      }
      return this.studentList.filter(student => {
        const condition1 = this.gradeFilterIndex === 0 || student.grade === this.gradeFilterIndex
        const condition2 = this.searchVal.length === 0 || student.name.includes(this.searchVal)
        return condition1 && condition2
      })
    },
  },
}
</script>

<style scoped lang="less">
@font14: 0.14rem;
@font16: 0.16rem;
@lineH: 0.2rem;
@color999: #999;
@color666: #666;
@colorfff: #fff;
@bgfff: #fff;
@bg: #F3F7F8;
#grade-detail {
  .go-back {
    .van-nav-bar {
      background-color: #3770FB;

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

  .basci-info {
    overflow: hidden;
    padding: @font16 0 @font14 0;
    box-sizing: border-box;
    background-color: #fff;

    .b-left {
      width: 1.72rem;
      padding-left: @font16;
      box-sizing: border-box;

      img {
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 0.1rem;

      }
    }

    .b-right {
      width: 2.03rem;
    }

    .info {
      float: left;

      p {
        font-size: @font14;
        color: @color666;
        line-height: @lineH;

        span {
          color: @color999;
        }
      }

      p:first-child {
        margin-bottom: 0.07rem;
      }
    }
  }

  .interval-box {
    background-color: @bg;
    width: 100%;
    height: 0.1rem;
  }

  .all-grade-list {
    padding: 0 0 0.41rem @font16;
    background-color: #fff;
    box-sizing: border-box;

    .c-search {
      margin-bottom: 0.26rem;
      overflow: hidden;

      .according-scope {
        float: left;
        padding: 0.1rem 0;
        font-size: @font14;
        line-height: 0.34rem;
        color: @color666;
        box-sizing: border-box;
      }

      .search-box {
        float: right;
        width: 1.76rem;
        font-size: 0;
        position: relative;
        /*input{
            width: 100%;
            height: 0.24rem;
            line-height: 0.22rem;
            border: 0.01rem solid #bcbcbc;
            border-radius:0.04rem ;
            padding-left: 0.2rem;
            background-color: #fff;
            box-sizing: border-box;
        }
        >span{
            position: absolute;
            top: 0.06rem;
            left: 0.06rem;
        }*/
      }
    }
  }

  .bot-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.4rem;
    padding: 0.08rem 0;
    background-color: #3770FB;
    box-sizing: border-box;

    a {
      float: left;
      width: 50%;
      text-align: center;
      font-size: 0.14rem;
      line-height: 0.24rem;
      color: #fff;
    }

    .add-grade {
      border-right: 0.01rem solid #fff;
      box-sizing: border-box;
    }
  }
}
.action-sheet {

  .active {
    color: #fff;
    background: #3770fb;
  }
}
.no_data {
  text-align: center;
  font-size: .16rem;
}
 /deep/ #bottom2{
    background: #FF6666;
  }/deep/ #bottom1{
      background: #66CC99;
  }
</style>
