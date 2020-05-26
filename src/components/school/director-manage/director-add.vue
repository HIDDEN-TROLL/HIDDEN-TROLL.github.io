<template>
  <div id="school-role-add">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar title="新增校长" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="class-from">
      <van-field v-model="schoolRoleName" label="校长名称：" maxlength="32" placeholder="请输入校长名称" border/>
      />
      <van-field v-model="schoolRoleAccount" label="校长手机号码：" maxlength="11" type="number" placeholder="请输入校长手机号码" border/>
      />
    </div>
    <!--底部提交按钮-->
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import { NavBar, Icon, Field, Row, Col, Toast } from "vant";
import FooterBtn from '../../common/footer-operate-btn';
import { addDirector } from '@/api/school/director-manage'

export default {
  name: "school-role-add",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      schoolRoleAccount: null,//校长账号
      schoolRoleName: null,//校长名称
      btnText: [
        {
          type: 2,
          title: "取消",
        },
        {
          type: 1,
          title: "确定",
        },

      ],
    };
  },
  methods: {

    onClickLeft() {
      this.$router.back();
    },
    operateBtn(type) {
      if (type === 1) {
        if (!this.schoolRoleName){
          Toast('请输入校长名称')
        }else if (!this.schoolRoleAccount){
          Toast('请输入校长手机号码')
        }else {
          this.addSchoolRole()
        }
      } else if (type === 2) {
        this.$router.back();
      }
    },
    //新增校长
    addSchoolRole() {
      this.$dialog.confirm({
        title: '提示',
        message: '确认新增校长！',
      }).then(() => {
        addDirector({
          name: this.schoolRoleName,         //校长名称
          account: this.schoolRoleAccount,    //校长账号
        })
          .then(res => {
            if (res.data.meta && res.data.meta.code === 0) {

              Toast.success({
                forbidClick: true, // 禁用背景点击
                loadingType: 'success',
                position:'middle',
                message: '新增校长成功',
              });
              const timer = setInterval(() => {
                clearInterval(timer);
                Toast.clear();
                this.$router.push({ name: "DirectorManage" });
              }, 2000);
            } else {
              this.$dialog.alert({
                message: '新增异常！',
              }).then(() => {
                // on close
              });
            }
          }).catch(() => {
          throw new Error("异常！")
        })
      }).catch(() => {
        // on cancel
      });
    },
  },
  created() {
    //alert(this.$route.params.id)
    //this.selectTeacherList();
    //this.selectStudentList();
  },
};
</script>

<style scoped lang="less">
#school-role-add {
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
    /deep/ .van-field__label{
      max-width: 1.1rem;
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
</style>
