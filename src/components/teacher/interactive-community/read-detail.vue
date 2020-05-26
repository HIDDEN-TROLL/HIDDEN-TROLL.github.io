<template>
  <div id="read-detail">
    <div class="go-back">
      <van-nav-bar
        title="查阅详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <div class="info">
        <div class="total-person flex-box">共{{totalPerson}}人</div>
        <div class="unRead flex-box">{{unReadPerson}}人未阅</div>
        <div class="read flex-box">{{readPerson}}人已阅</div>
      </div>
      <div class="bg-box"></div>
      <ClassList :class-list="classList" v-on:classGrade="operateData"></ClassList>
      <div class="detail" v-if="JSON.stringify(pageData)!=='{}'">
        <div class="un-read" v-if="pageData.unreadStuList && pageData.unreadStuList.length>0">
          <span class="title">{{pageData.unreadStuList.length}}人未阅</span>
          <van-row gutter="20">
            <van-col span="8" v-for="(item,index) in pageData.unreadStuList" :key="index">
              <div class="student-list"  >
                <span class="student light">{{item.stuName}}</span>
              </div>
            </van-col>
          </van-row>
        </div>

        <div class="read" v-if="pageData.readStuList && pageData.readStuList.length>0">
          <span class="title">{{pageData.readStuList.length}}人已阅</span>
          <van-row gutter="20">
            <van-col span="8" v-for="(item,index) in pageData.readStuList" :key="index">
              <div class="student-list" >
                <span class="student">{{item.stuName}}</span>
              </div>
            </van-col>
          </van-row>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Field, List,Row, Col } from 'vant';
import ClassList from "../../school/components/class-list"
import { readDetail } from '@/api/school/community'

export default {
  name: "read-detail",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [List.name]: List,
    [Row.name]:Row,
    [Col.name]:Col,
    ClassList: ClassList,
  },
  data() {
    return {
      readPerson: this.$route.params.read,//已读学生
      unReadPerson: this.$route.params.unRead,//未读学生
      classList: [],//保存班级列表
      studentList: [],//保存已阅、未阅学生列表
      pageData: {},//保存当前页面显示的数据
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    selectInfo() {
      this.$loading()
      readDetail(this.$route.params.id)
        .then(res => {
          this.$loadingHide()
          if (res.status === 200) {
            if (res.data.data.length > 0) {
              for (let item of res.data.data) {
                this.classList.push({
                  id: item.clsId,
                  name: item.clsName,
                });
                this.studentList.push(item.stuList)
              }
              this.pageData = this.studentList[0]
            }
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    operateData(obj) {
      let index = obj.active;
      this.pageData = this.studentList[index]
    },
  },
  created() {
    this.selectInfo()
  },
  computed: {
    totalPerson: {
      get() {
        let total = parseInt(this.readPerson) + parseInt(this.unReadPerson);
        return total.toFixed(0)
      },
    },
  },
}
</script>

<style scoped lang="less">
#read-detail {
  font-size: 0;
  width: 100%;

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

  .content {
    width: 100%;

    .info {
      display: flex;
      width: 100%;

      .flex-box {
        flex: 1;
        text-align: center;
        font-size: 0.14rem;
        color: #666;
        line-height: 0.3rem;
      }

      .unRead {
        color: #D80000;
      }
    }

    .bg-box {
      background-color: #F3F7F8;
    }

    .detail {
      width: 100%;

      .un-read, .read {
        width: 100%;
        padding: 0.16rem;
        box-sizing: border-box;

        .title {
          display: block;
          font-size: 0.14rem;
          color: #666;
          text-align: center;
          margin-bottom: 0.2rem;
        }

        .student-list {
          width: 100%;
          overflow: hidden;

          .student {
            display: inline-block;
            font-size: 0.14rem;
            color: #fff;
            width: 1rem;
            height: 0.26rem;
            line-height: 0.26rem;
            border-radius: 0.03rem;
            /*margin-left: 0.18rem;*/
            margin-bottom: 0.12rem;
            background-color: #D6D6D6;
            text-align: center;
          }

          .student.light {
            background-color: #3770FB;
          }
        }
      }
    }
  }
}
</style>
