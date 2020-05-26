<template>
  <div id="class-manage">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar title="班级管理" left-text="返回" left-arrow @click-left="$router.back()"/>
    </div>
    <div class="class-info">
      <van-row>
        <van-col span="6">共{{statistical.classNumber}}个班</van-col>
        <van-col span="9">{{statistical.inClassStudentNumber}}位学生已分班</van-col>
        <van-col span="9">{{statistical.notInClassStudentNumber}}位学生未分班</van-col>
      </van-row>
    </div>
    <div class="class-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">

        <draggable v-model="classListArr" @update="sortDragEnd" :options = "{animation:500, handle: '.drag-handle'}">
          <div v-for="(item,index) in classListArr" :key="index" >
            <van-row>
              <van-col span="2" class="drag-handle posi">{{index+1}}</van-col>
              <van-col span="6" class="class-name posi" @click.native="modifyClassName(item)">{{item.name}}</van-col>
              <van-col span="15" class="posi">
                <div class="class-profile" @click="$router.push({name:'ClassManageClassDetail',query:{id:item.id}})">
                  <h2 class="text-overflow">教师：{{ !Array.isArray(item.teachers) || item.teachers.length === 0 ? '暂无' : item.teachers.map(t => t.name).join('、') }}</h2>
                  <p>
                    <span>{{item.studentCount}}位学生</span>
                    <span>{{ !Array.isArray(item.teachers) ? '0' : item.teachers.length }}位教师</span>
                  </p>
                </div>
              </van-col>
              <van-col span="1" class="posi">
                <router-link :to="{name:'ClassManageClassDetail',query:{id:item.id}}">
                  <div class="icon-style">
                    <van-icon name="arrow"/>
                  </div>
                </router-link>
              </van-col>
            </van-row>
          </div>
        </draggable>

      </van-list>

    </div>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>

    <dialog-input
      v-model="dialogInput.show"
      :title="dialogInput.title"
      :text="dialogInput.text"
      :placeholder="dialogInput.placeholder"
      :validate="dialogInput.validate"
      :beforeClose="dialogInput.beforeClose"
    />
  </div>
</template>

<script>
import { NavBar, Icon, Row, Col, List, Toast } from "vant";
import FooterBtn from '../../common/footer-operate-btn'
import { classStatisticalInfo, selectClassList, updateClass, updateSort } from '@/api/school/class-manage'
import dialogInput from '@/components/common/dialog-input'
import { isSpace } from '@/utils'
import draggable from 'vuedraggable'

export default {
  name: "class-manage",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [List.name]: List,
    [Toast.name]: Toast,
    FooterBtn: FooterBtn,
    dialogInput,
    draggable,
  },
  data() {
    return {
      loading: false,
      finished: false,
      btnText: [
        {
          type: 1,
          title: '删除班级',
        },
        {
          type: 2,
          title: '新增班级',
        },
      ],
      page: 1,//当前页
      pageSize: 0,//每页数据 (因为要兼顾拖动排序, 所以不能分页, 设置为0)
      totalPage: 0,//保存总页数
      classListArr: [],
      statistical: {},//统计信息

      dialogInput: {
        show: false,
        title: '',
        text: '',
        placeholder: '',
        validate: null,
        beforeClose: null,
      },
    };
  },
  methods: {
    sortDragEnd(e) {
      e.preventDefault()

      this.$loading('保存中...')
      const classIdList = this.classListArr.map(clazz => clazz.id)
      updateSort(classIdList)
        .then(response => {
          if (response.data.meta.success) {
            this.$toast('班级排序保存成功')
          }
        })
        .finally(() => this.$loadingHide())
    },
    operateBtn(type) {
      if (type === 1) {
        this.$router.push({ name: 'ClassManageDel' })
      } else if (type === 2) {
        this.$router.push({ name: "ClassManagePopups" })
      }
    },
    //获取班级列表
    selectClassList() {

      selectClassList(this.page, this.pageSize)
        .then(res => {
          if (res.data.meta && res.data.meta.code === 0) {
            this.totalPage = res.data.data.paginate.totalPage;
            this.loading = false;
            if (res.data.data.list) {
              if (this.page === this.totalPage) {
                this.finished = true;
              } else {
                this.page = this.page + 1;
              }
              let d = res.data.data.list;
              this.classListArr.push(...d);
            }
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    //获取班级统计信息
    statisticalInfo() {
      classStatisticalInfo()
        .then(res => {
          if (res.data.meta && res.data.meta.code === 0) {
            this.statistical = res.data.data
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    onLoad() {
      //this.page = this.page + 1;
      this.selectClassList()
    },

    modifyClassName(clazz) {
      const classId = clazz.id
      const className = clazz.name

      this.dialogInput.show = true
      this.dialogInput.title = '更改班级名称'
      this.dialogInput.text = className
      this.dialogInput.placeholder = '班级名称'
      this.dialogInput.validate = text => {
        if (isSpace(text)) {
          this.$toast('班级名称不可为空')
          return false
        }
        if (text.length > 32) {
          this.$toast('班级名称最多32个字')
          return false
        }
        return true
      }
      this.dialogInput.beforeClose = (action, done, text) => {
        if (action !== 'confirm' || className === text) {
          done()
          return
        }

        updateClass(classId, { name: text })
          .then(response => {
            if (response.data.meta.success) {
              clazz.name = text
              this.$toast('修改班级名称成功')
              done()
            }
          })
          .finally(() => {
            done(false)
          })
      }
    },
  },
  created() {
    this.statisticalInfo()
  },
};
</script>

<style scoped lang="less">
#class-manage {
  font-size: 0;
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

  .class-info {
    text-align: center;
    height: 0.48rem;
    font-size: 0.14rem;
    line-height: 0.48rem;
    color: #666;
    border-bottom: 10px solid #f3f7f8;

    .van-col:first-child {
      font-weight: 500;
    }

    .van-col:last-child {
      color: #3770fb;
    }
  }

  .class-list {
    padding: 0 0.16rem;
    text-align: center;
    /*height: 0.48rem;*/
    font-size: 0.14rem;
    line-height: 0.24rem;
    color: #666;
    box-sizing: border-box;
    .class-name{
      line-height: 0.24rem;
    }
    .van-row {
      padding: 0.08rem 0;
      border-bottom: 1px solid #EEE;

      .class-profile {
        text-align: left;
        padding-left: 0.1rem;

        h2 {
          font-size: 0.14rem;
          font-weight: 400;
        }

        p {
          /*line-height: 0;*/
          font-size: 0.12rem;
          color: #999;

          span:last-child {
            margin-left: 0.2rem;
          }
        }
      }

      .icon-style {
        width: 100%;
        text-align: right;
        /*line-height: 0.48rem;*/
      }

      .van-icon-arrow {
        .van-icon,
        .van-icon::before {
          text-align: right;
        }
      }
    }
  }

  .footer-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.4rem;
    padding: 0.08rem 0;
    background-color: #3770FB;
    box-sizing: border-box;

    .van-col {
      font-size: 0.14rem;
      color: #fff;
      line-height: 0.24rem;
      text-align: center;
      border-right: 0.01rem solid #fff;
    }

    .van-col:last-child {
      border-right-width: 0;
    }
  }
}

.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/*底部按钮颜色*/
/deep/ #bottom0{
  background: #FF6666;
}
</style>
