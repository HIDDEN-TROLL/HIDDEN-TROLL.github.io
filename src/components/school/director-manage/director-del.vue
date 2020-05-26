<template>
  <div id="del-school-role">
    <div class="go-back">
      <van-nav-bar title="删除校长" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="role-info">
      <van-row>
        <van-col span="6">共{{totalNumber}}位校长</van-col>
        <van-col span="18">
          <form action="/">
            <van-search
              v-model="schoolRoleName"
              placeholder="请输入搜索的校长名称"
              show-action
              @search="onSearch"
              @cancel="onCancel"
            />
          </form>
        </van-col>
      </van-row>
    </div>
    <div class="role-list">
      <ul>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-checkbox-group v-model="result">
            <van-cell-group>
              <van-cell
                v-for="(item,index) in schoolRoleList"
                :key="index"
                clickable
                @click="directorToggle(index)"
              >
                <li class="role-list-item">
                  <van-row>
                    <van-col span="4">
                      <img :src="item.image" alt>
                    </van-col>
                    <van-col span="4" style=" overflow: scroll;white-space: nowrap;">{{item.name}}</van-col>
                    <van-col span="8">账号:{{item.account}}</van-col>
                    <van-col span="6">
                      状态：
                      <i :class="item.isBind?'':`active`">{{item.isBind?'已绑定':`未绑定`}}</i>
                    </van-col>
                    <van-col span="2">
                      <van-checkbox :name="item.directorId" ref="checkboxesDirector"/>
                    </van-col>
                  </van-row>
                </li>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-list>
      </ul>
    </div>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import {
  Radio,
  RadioGroup,
  NavBar,
  Icon,
  Row,
  Col,
  List,
  Toast,
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  Search
} from "vant";
import FooterBtn from "../../common/footer-operate-btn";
import { batchDeleteDirector, getDirectorList } from '@/api/school/director-manage'
export default {
  name: "del-school-role",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [List.name]: List,
    [Toast.name]: Toast,
    [Search.name]: Search,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      totalNumber: "",
      schoolRoleName: null,
      loading: false,
      finished: false,
      btnText: [
        {
          type: 2,
          title: "取消"
        },
        {
          type: 1,
          title: "删除校长"
        }
      ],
      result: [], //选择的校长id
      page: 1, //当前页
      pageSize: 20, //每页数据
      totalPage: 0, //保存总页数
      schoolRoleList: [] //校长列表
    };
  },
  methods: {
    onLoad() {
      this.getSchoolRoleList();
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    directorToggle(index){
      this.$refs.checkboxesDirector[index].toggle();
    },
      //底部按钮
    operateBtn(type) {
      if (type === 2) {
        this.$router.back();
        return
      }
      if (!Array.isArray(this.result) || this.result.length === 0) {
        this.$toast('请先选择校长')
        return
      }
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定删除当前选中的校长？"
        })
        .then(() => {
          // on confirm

          this.delSchoolRole(this.result);
        })
        .catch(() => {
          // on cancel
        });
    },
    //搜索
    onSearch() {
      // this.studentList= [];
      this.page = 1;
      //this.finished = false;
      this.schoolRoleList = [];
      this.loading = true;
      this.finished = false;
      if (this.loading){
        this.onLoad();
      }
     // this.getSchoolRoleList();
    },
    //搜索取消
    onCancel() {
      this.page = 1;
      this.schoolRoleList = [];
      this.loading = true;
      this.finished = false;
      if (this.loading){
        this.onLoad();
      }
    },
    //获取校长列表
    getSchoolRoleList() {
      this.$loading();
      getDirectorList({
        page: this.page,
        pageSize: this.pageSize,
        query: this.schoolRoleName
      })
        .then(res => {
          if (res.data.meta && res.data.meta.code === 0) {
            this.totalNumber = res.data.data.paginate.total; //校长总数
            this.totalPage = res.data.data.paginate.totalPage;
            if (res.data.data.list) {
              this.schoolRoleList.push.apply(this.schoolRoleList,res.data.data.list); //教师列表
              this.loading = false;
              if (this.page === this.totalPage) {
                this.finished = true;
              } else {
                this.page = this.page + 1;
              }

              this.$loadingHide();
            }
          }
        })
        .catch(() => {
          throw new Error("异常！");
        });
    },
    //删除校长
     delSchoolRole(id) {
      this.$loading();
       batchDeleteDirector({list:id})
        .then(res => {
          this.$loadingHide();
          if (res.data.meta && res.data.meta.code === 0) {
            this.page = 1;
            this.schoolRoleList = [];
            this.loading = true;
            this.finished = false;
            if (this.loading){
              this.onLoad();
            }
            //this.getSchoolRoleList();
            Toast.success({message:"删除成功",position:'middle'});
          } else {
            Toast.success({message:"删除失败",position:'middle'});
          }
        })
        .catch(() => {
          this.$loading();
          throw new Error("异常！");
        });
    }

  },
  created() {}
};
</script>

<style scoped lang="less">
#del-school-role {
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
    line-height: 0.48rem;
    color: #666;
    .van-cell {
      font-size: 0.12rem;
      line-height: 0.48rem;
      padding: 0;
      .role-list-item {
        .van-row {
          padding: 0.1rem 0;
          border-bottom: 1px solid #f3f7f8;

          .van-col {
            height: 0.48rem;
            img {
              width: 0.48rem;
              height: 0.48rem;
              border-radius: 50%;
              border: 1px solid #f3f7f8;
            }
            i {
              font-style: normal;
            }
            i.active {
              font-style: normal;
              color: #d80000;
            }
          }
          .van-col:nth-child(3) {
            text-align: left;
            padding-left: 0.1rem;
          }
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
}
</style>
