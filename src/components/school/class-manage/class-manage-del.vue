<template>
  <div id="del-class">
    <div class="go-back">
      <van-nav-bar title="删除班级" left-text="返回" left-arrow @click-left="$router.back()"/>
    </div>
    <div class="class-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-radio-group v-model="result">
          <van-cell-group>
            <van-cell
              v-for="(item,index) in classListArr"
              :key="index"
              clickable
              @click="result=item.id"
            >
              <van-row>
                <van-col span="2">{{index+1}}</van-col>
                <van-col span="6">{{item.name}}</van-col>
                <van-col span="13">
                  <div class="class-profile">
                    <h2 class="text-overflow">教师：{{ !Array.isArray(item.teachers) || item.teachers.length === 0 ? '暂无' : item.teachers.map(t => t.name).join('、') }}</h2>
                    <p>
                      <span>{{item.studentCount}}位学生</span>
                      <span>{{ !Array.isArray(item.teachers) ? '0' : item.teachers.length }}位教师</span>
                    </p>
                  </div>
                </van-col>
                <van-col span="2">
                  <van-radio :name="item.id"/>
                </van-col>
              </van-row>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-list>
    </div>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import { NavBar, Icon, List, RadioGroup, Radio, Cell, CellGroup, Row, Col, Toast } from "vant";
import FooterBtn from '../../common/footer-operate-btn'
import { deleteClass, selectClassList } from '@/api/school/class-manage'

export default {
  name: "class-manage-del",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [List.name]: List,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      loading: false,
      finished: false,
      btnText: [
        {
          type: 2,
          title: '取消',
        },
        {
          type: 1,
          title: '删除班级',
        },
      ],
      page: 1,//当前页
      pageSize: 20,//每页数据
      totalPage: 0,//保存总页数
      classListArr: [],
      result: '',
    }
  },
  methods: {
    //删除班级
    deClass(id) {
      this.$loading(undefined,undefined,true)
      deleteClass(id)
        .then(res => {
          this.$loadingHide();
        if (res.data.meta && res.data.meta.code === 0) {
          Toast.success({message:"删除成功",position:'middle'});
          let timer = setTimeout(()=>{
            clearTimeout(timer);
            this.classListArr = [];
            this.page = 1;
            this.onLoad();
          },3000)
        } else {
          Toast.success({message:"删除失败",position:'middle'})
        }
      }).catch(() => {

        throw new Error("异常！");
      })
    },
    operateBtn(type) {
      if (type == 2) {
        this.$router.back()
        return
      }
      //console.log(this.result)
      if (this.result){
        this.$dialog.confirm({
          title: '提示',
          message: '确定删除当前选中的班级？',
        }).then(() => {
          // on confirm
          this.deClass(this.result)
        }).catch(() => {
          // on cancel
        });
      }else {
        Toast({position:'middle',message:'请选择需要删除的班级！'})
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

            }else {
              this.finished = true;
            }
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    onLoad() {
      this.selectClassList();
    },
  },
  computed: {
    teacherNum() {
      return (len) => {
        return (parseInt(len) + 1).toFixed(0)
      }
    },
  },
}
</script>

<style scoped lang="less">
#del-class {
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

  .class-list {
    /*padding: 0 0.16rem;*/
    text-align: center;
    height: 0.48rem;
    font-size: 0.14rem;
    line-height: 0.48rem;
    color: #666;

    .van-row {
      /*padding-bottom: 0.2rem;*/
      /*border-bottom: 1px solid #EEE;*/

      .class-profile {
        text-align: left;
        padding-left: 0.1rem;

        h2 {
          font-size: 0.14rem;
          font-weight: 400;
        }

        p {
          /* line-height: 0;*/
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
        line-height: 0.48rem;
      }

      .van-icon-arrow {
        .van-icon,
        .van-icon::before {
          text-align: right;
        }
      }
    }
  }
}
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/*底部按钮颜色*/
/deep/ #bottom1{
  background: #FF6666;
}
/deep/.van-radio__icon--checked .van-icon{
  border-color: #FF6666;
  background-color: #FF6666;
}
</style>
