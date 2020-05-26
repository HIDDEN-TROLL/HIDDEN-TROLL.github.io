<template>
  <div id="class-director-list">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar title="教师管理" left-text="返回" left-arrow @click-left="$router.back()"/>
    </div>
    <div class="class-director-select">
      <van-row type="flex" justify="center">
        <van-col span="12" style="display: inline-flex;justify-content: center;align-items: center;">
          <div class="select-text" @click="showClassFilter">{{ selectedClassName }}</div>
          <van-icon name="arrow-down" @click="showClassFilter"/>
        </van-col>
      </van-row>
    </div>
    <div class="role-info">
      <van-row>
        <van-col span="6">共{{totalNumber}}位教师</van-col>
        <van-col span="18">
          <form action="/">
            <van-search
              v-model="query"
              placeholder="请输入搜索的教师名称"
              @search="onSearch"
            />
          </form>
        </van-col>
      </van-row>
    </div>
    <div class="role-list">
      <ul>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <li class="role-list-item" v-for="(item,index) in teacherList" :key="index">
            <router-link :to="{ name: 'TeacherManageMdf', query:{id:item.id }}">
              <van-row>
                <van-col span="4">
                  <img :src="item.image" alt>
                </van-col>
                <van-col span="20">
                  <van-row>
                    <van-col span="12" style=" overflow: scroll;white-space: nowrap;">
                      <span>{{item.name}}</span>
                    </van-col>
                    <van-col span="12" style="text-align:right">{{item.cardNo}}</van-col>
                  </van-row>
                  <van-row>
                    <van-col span="12">账号：{{item.account}}</van-col>
                    <van-col span="12" style="text-align:right">
                      绑定状态:
                      <i :class="item.isBind?'':'active'">{{item.isBind ? "已绑定" : '未绑定'}}</i>
                    </van-col>
                  </van-row>
                  <van-row>
                    <van-col span="24">班级：<span v-if="!Array.isArray(item.classes) || item.classes.length === 0"> <i class="active">未分配</i> </span>
                      <span v-for="(item1,index) in item.classes"
                            :key="index"> {{item1.name}}</span></van-col>
                  </van-row>
                </van-col>
              </van-row>
            </router-link>
          </li>
        </van-list>
      </ul>
    </div>
    <van-popup v-model="isClassFilterPopupShow" position="bottom">
      <div class="btn">
        <span class="cancel" @click="isClassFilterPopupShow = false">取消</span>
        <span class="confirm" @click="confirmClassFilter">确定</span>
      </div>
      <van-checkbox-group v-model="selectedClassIdList">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in classList"
            clickable
            :key="item.id"
            :title="`${item.name}`"
            @click="toggle(index)"
          >
            <van-checkbox :name="item.id" ref="checkboxes"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Row,
  Col,
  List,
  Toast,
  Search,
  Popup,
  Checkbox,
  CheckboxGroup,
  Actionsheet,
  Cell,
  CellGroup,
} from "vant";
import FooterBtn from "../../common/footer-operate-btn";
import { classList } from '@/api/school/class-manage'
import { getTeacherList } from '@/api/school/teacher-manage'

export default {
  name: "class-director-list",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [List.name]: List,
    [Toast.name]: Toast,
    [Search.name]: Search,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Actionsheet.name]: Actionsheet,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      query: '',
      totalNumber: '',
      loading: false,
      finished: false,
      isClassFilterPopupShow: false, // 班级列表默认隐藏
      classList: [],
      selectedClassList: [],
      selectedClassIdList: [],
      teacherList: [],//教师列表
      btnText: [
        {
          type: 1,
          title: "删除教师",
        },
        {
          type: 2,
          title: "新增教师",
        },
      ],
      page: 1, //当前页
      pageSize: 20, //每页数据
      totalPage: 0, //保存总页数
    };
  },
  computed: {
    selectedClassName() {
      if (!Array.isArray(this.selectedClassList) || this.selectedClassList.length === 0) {
        return '全部班级'
      }
      return this.selectedClassList.map(clazz => clazz.name).join('、')
    }
  },
  methods: {
    onLoad() {
      //this.page = this.page + 1;
      this.getTeacherList();
    },
    //搜索
    onSearch() {
      // this.studentList= [];
      this.page = 1;
      this.teacherList = [];
      this.loading = true;
      this.finished = false;
      if (this.loading){
        this.onLoad();
      }
      //this.getTeacherList();
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    operateBtn(type) {
      if (type === 1) {
        this.$router.push({ name: "TeacherManageDel" });
      } else if (type === 2) {
        this.$router.push({ name: "TeacherManageAdd" });
      }
    },
    showClassFilter() {
      this.selectedClassIdList = this.selectedClassList.map(clazz => clazz.id)
      this.isClassFilterPopupShow = true
    },
    //班级选择确认
    confirmClassFilter() {
      this.isClassFilterPopupShow = false;

      this.selectedClassList = this.selectedClassIdList.map(classId =>
        this.classList.find(clazz => clazz.id == classId)
      )
        .filter(clazz => clazz !== undefined)

      this.page = 1;
      this.teacherList = [];
      this.loading = true;
      this.finished = false;
      if (this.loading){
        this.onLoad();
      }
    },
    //获取班级列表
    selectClassList() {
      classList({ page: 0, all: true })
        .then(res => {
          if (res.data.meta && res.data.meta.code === 0) {
            if (res.data.data.list.length > 0) {
              this.classList = [];
              for (let item of res.data.data.list) {
                if (item.id) {
                  this.classList.push({
                    id: item.id,
                    name: item.name,
                  });
                }
              }
            }
          }
        })
    },
    //获取教师列表
    getTeacherList() {
      getTeacherList({
        page: this.page,
        pageSize: this.pageSize,
        query: this.query,
        classes: this.selectedClassList.map(clazz => clazz.id),
      })
        .then(res => {
          if (res.data.meta && res.data.meta.code === 0) {
            this.totalNumber = res.data.data.paginate.total; //教师总数
            this.totalPage = res.data.data.paginate.totalPage;
            if (res.data.data.list.length > 0) {
              this.teacherList.push.apply(this.teacherList,res.data.data.list); //教师列表
              this.loading = false;
              if (this.page === this.totalPage) {
                this.finished = true;
              } else {
                this.page = this.page + 1;
              }
            }else if (res.data.data.list.length === 0) {
              this.loading = false;
              this.finished = true;
            }
          }
        })
        .catch(() => {
          throw new Error("异常！");
        });
    },
  },
  created() {
    this.selectClassList();
  },
}
</script>

<style scoped lang="less">
#class-director-list {
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

  .class-director-select {
    text-align: center;
    height: 0.48rem;
    font-size: 0.14rem;
    line-height: 0.48rem;
    color: #666;
    border-bottom: 10px solid #f3f7f8;

    .select-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

  }

  .role-info {
    text-align: center;
    height: 0.48rem;
    font-size: 0.14rem;
    line-height: 0.48rem;
    color: #666;
    border-bottom: 10px solid #f3f7f8;

    .van-search {
      padding: 0.06rem 0.16rem;
    }
  }

  .role-list {
    padding: 0 0.16rem 0.4rem;
    text-align: center;
    /*height: 0.48rem;*/
    font-size: 0.12rem;
    /*line-height: 0.48rem;*/
    color: #666;

    .role-list-item {
      .van-row {
        padding: 0.1rem 0;
        border-bottom: 1px solid #f3f7f8;

        .van-col {
          /*min-height: 0.48rem;*/

          .van-row {
            padding: 0;
            padding-left: 0.1rem;
            border-bottom: 0;
            text-align: left;
            color: #999;

            .van-col {
              /*height: 0.17rem;*/
              span {
                color: #333;
              }
              i {
                font-style: normal;
              }
              i.active {
                font-style: normal;
                color: #d80000;
              }
            }
          }
          .van-row:first-child {
            color: #666;
          }
          img {
            width: 0.48rem;
            height: 0.48rem;
            border-radius: 50%;
            border: 1px solid #f3f7f8;
          }
        }
        .van-col:last-child {
          line-height: 0.16rem;
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
    background-color: #3770fb;
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

  .btn {
    padding: 0 0.2rem;
    overflow: hidden;

    .cancel {
      padding: 0.1rem 0;
      float: left;
      font-size: 0.14rem;
      color: #3770fb;
    }

    .confirm {
      padding: 0.1rem 0;
      float: right;
      font-size: 0.14rem;
      color: #3770fb;
    }
  }
}
/*底部按钮颜色*/
/deep/ #bottom0{
  background: #FF6666;
}
</style>
