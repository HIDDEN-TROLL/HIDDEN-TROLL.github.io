<template>
  <div id="class-director-add">
    <!--考勤关联教师-->
    <div class="go-back">
      <van-nav-bar
        title="修改教师信息"
        left-text="返回"
        left-arrow
        @click-left="$router.back()">
        <div class="nav-bar-right-slot" slot="right">
          <a v-if="!isBind" class="showQrCode" @click="showQrCode">生成二维码</a>
        </div>
      </van-nav-bar>
    </div>
    <div class="class-from">
      <van-field v-model="teacherName" required label="教师名称：" maxlength="32"  placeholder="请输入教师名称" border />
      <van-field v-model="teacherPhone" required label="手机号码：" type="number"  maxlength="11" placeholder="请输入教师手机号码" border />
      <van-field v-model="teacherCardNo" label="卡号：" placeholder="请输入教师卡号" border class="cardNo" />
      <van-field
        v-model="selectedClassName"
        label="教师班级："
        placeholder="请选择"
        border
        readonly
        right-icon="arrow"
        @click="showClassSelector"
        @click-right-icon="showClassSelector"
      />
    </div>
    <van-popup v-model="isClassSelectorShow" :close-on-click-overlay="false" position="bottom">
      <div class="btn">
        <span class="cancel" @click="isClassSelectorShow = false">取消</span>
        <span class="confirm" @click="confirmClassSelector">确定</span>
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
            <van-checkbox :name="item.id" ref="checkboxes" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <!--底部提交按钮-->
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>

    <van-dialog v-model="bindQrCode.show" class="bindQrCodeDialog">
      <van-loading v-show="bindQrCode.loading" class="loading" size="40px" />
      <img class="bindQrCode" :src="bindQrCode.image" alt="" />
    </van-dialog>
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Field,
  Actionsheet,
  Row,
  Col,
  Popup,
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  Toast,
  Loading
} from "vant";
import FooterBtn from "../../common/footer-operate-btn";
import { classList } from '@/api/school/class-manage'
import { getTeacherInfo, updateTeacher, getTeacherBindQrcode } from '@/api/school/teacher-manage'
import { isEmpty } from '@/utils'

export default {
  name: "class-director-add",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Actionsheet.name]: Actionsheet,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    FooterBtn: FooterBtn
  },
  data() {
    return {
      isBind: true, //是否已经绑定
      teacherName: "", //教师名称
      teacherPhone:"",//教师联系电话
      teacherCardNo:"",//教师卡号
      btnText: [
        {
          type: 2,
          title: "取消"
        },
        {
          type: 1,
          title: "确定"
        },
      ],
      isClassSelectorShow: false, //班级列表默认隐藏
      classList: [],
      selectedClassList: [],
      selectedClassIdList: [],

      bindQrCode: {
        show: false,
        loading: true,
        image: '',
      }
    };
  },
  computed: {
    selectedClassName() {
      if (!Array.isArray(this.selectedClassList) || this.selectedClassList.length === 0) {
        return '请选择'
      }
      return this.selectedClassList.map(clazz => clazz.name).join('、')
    }
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    showClassSelector() {
      this.selectedClassIdList = this.selectedClassList.map(clazz => clazz.id)
      this.isClassSelectorShow = true
    },
    confirmClassSelector() {
      this.isClassSelectorShow = false;

      this.selectedClassList = this.selectedClassIdList.map(classId =>
        this.classList.find(clazz => clazz.id == classId)
      )
        .filter(clazz => clazz !== undefined)
    },
    operateBtn(type) {
      if (type === 1) {
        if (!this.teacherName){
          Toast('请输入教师姓名')
        }else if (!this.teacherPhone){
          Toast('请输入教师手机号码(账号)')
        }else {
          this.mdfTeacher();
        }
      } else if (type === 2) {
        this.$router.back();
      }
    },
    //获取班级列表
    selectClassList() {
      this.$loading(undefined,undefined,true);
      //
      return new Promise((resolve, reject) => {
        classList({ page: 0, all: true })
          .then(res => {
            if (res.status === 200) {
              resolve(res.data.data.list);
            } else {
              reject("ggg");
            }
          })
          .catch(() => {
            throw new Error("异常！");
          });
      });
    },
    //获取教师信息
    getTeacherInfo() {
      let id = this.$route.query.id;
      return new Promise((resolve, reject) => {
        getTeacherInfo(id)
          .then(res => {
            if (res.status === 200) {
              resolve(res.data.data);
            } else {
              reject("ggg");
            }
          })
          .catch(() => {
            throw new Error("异常！");
          });
      });
    },
    //修改教师
    mdfTeacher() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认修改该教师信息！"
        })
        .then(() => {
          this.$loading();
          let dt = {
            name: this.teacherName,         //学生教师
            account: this.teacherPhone,    //教师手机号
            cardNo: this.teacherCardNo,    //教师卡号
            classes: this.selectedClassList.map(clazz => clazz.id), //班级ID数组
          };
          let id = this.$route.query.id;
          updateTeacher(id, dt)
            .then(res => {
              if (res.data.meta && res.data.meta.code === 0) {
                Toast.success({
                  forbidClick: true, // 禁用背景点击
                  loadingType: "success",
                  position:'middle',
                  message: "修改教师成功"
                });
                this.$router.replace({ name: "TeacherManage" });
              } else {
                this.$dialog
                  .alert({
                    message: "修改异常！"
                  })
                  .then(() => {
                    // on close
                  });
              }
            })
            .finally(() => {
              this.$loadingHide()
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    showQrCode() {
      this.bindQrCode.show = true
      if (!isEmpty(this.bindQrCode.image)) {
        return
      }

      this.bindQrCode.loading = true
      getTeacherBindQrcode(this.$route.query.id)
        .then(response => {
          if (response.data.meta.success) {
            this.bindQrCode.image = response.data.data.image
          }
        })
        .finally(() => {
          this.bindQrCode.loading = false
        })
    },
  },
  created() {
    Promise.all([
      this.selectClassList(),
      this.getTeacherInfo(),
    ]).then(res => {
      this.$loadingHide();
      //班级列表数据处理
      if (res[0].length > 0) {
        this.classList = [];
        for (let item of res[0]) {
          if (item.id) {
            this.classList.push({
              id: item.id,
              name: item.name,
            });
          }
        }
      }
      //教师个人信息数据处理
      if (res[1]) {
        this.teacherName = res[1].name;
        this.teacherPhone = res[1].account;
        this.isBind = res[1].isBind;
        if (typeof res[1].cardNo === 'string') {
          if (res[1].cardNo.startsWith('NO.')) {
            res[1].cardNo = res[1].cardNo.slice(3)
          }
          this.teacherCardNo = res[1].cardNo;
        }

        for (let item of res[1].classes) {
          //班级教师信息
          this.selectedClassList.push({id:item.id, name:item.name, });
        }
      }
    });
  }
};
</script>

<style scoped lang="less">
#class-director-add {
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
  .class-from {
    padding-top: 25px;
    padding-right: 14px;
    .van-cell::after {
      content: " ";
      position: absolute;
      pointer-events: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      left: 15px;
      right: 0;
      bottom: 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      border-bottom: 1px solid #ebedf0;
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
.cardNo {
  & /deep/ .van-field__body::before {
    content: "NO. ";
    color: #999;
  }
}
.showQrCode {
  margin-right: 0.1rem;
  color: #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 46px;
}
.bindQrCodeDialog {
  .loading {
    margin: .12rem auto;
  }
  .bindQrCode {
    margin: 0 auto;
    display: block;
    max-width: 80vw;
    max-height: 70vh;
  }
}
</style>
