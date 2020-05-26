<template>
  <div id="school-role-mdf">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar
        title="修改校长"
        left-text="返回"
        left-arrow
        @click-left="$router.back()">
        <div class="nav-bar-right-slot" slot="right">
          <a v-if="!isBind" class="showQrCode" @click="showQrCode">生成二维码</a>
        </div>
      </van-nav-bar>
    </div>
    <div class="class-from">
      <van-field v-model="schoolRoleName" label="校长名称：" maxlength="32" placeholder="请输入校长名称" border/>
      />
      <van-field v-model="schoolRoleAccount" label="校长手机号码：" maxlength="11" type="number" placeholder="请输入校长手机号码" border/>
      />
    </div>
    <!--底部提交按钮-->
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>

    <van-dialog v-model="bindQrCode.show" class="bindQrCodeDialog">
      <van-loading v-show="bindQrCode.loading" class="loading" size="40px" />
      <img class="bindQrCode" :src="bindQrCode.image" alt="" />
    </van-dialog>
  </div>
</template>

<script>
import { NavBar, Icon, Field, Row, Col,Toast, Loading  } from "vant";
import FooterBtn from '../../common/footer-operate-btn';
import { getDirectorInfo, updateDirector, getDirectorBindQrcode } from '@/api/school/director-manage'
import { isEmpty } from '@/utils'

export default {
  name: "school-role-mdf",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]:Toast,
    [Loading.name]:Loading,
    FooterBtn:FooterBtn
  },
  data() {
    return {
      isBind: true, //是否已经绑定
      schoolRoleAccount: null,//校长账号
      schoolRoleName:null,//校长名称
      btnText:[
        {
          type:2,
          title:"取消"
        },
        {
          type:1,
          title:"确定"
        },
      ],
      bindQrCode: {
        show: false,
        loading: true,
        image: '',
      }
    };
  },
  methods: {
    operateBtn(type){
      if (type === 1){
        if (!this.schoolRoleName){
          Toast('请输入校长名称')
        }else if (!this.schoolRoleAccount){
          Toast('请输入校长手机号码')
        }else {
          this.mdfSchoolRole()
        }

      }else if (type === 2){
        this.$router.back();
      }
    },
    // 获取校长信息
    getSchoolRoleInfo() {
      let id = this.$route.query.id;
      getDirectorInfo(id)
          .then(res => {
            if (res.data.meta && res.data.meta.code === 0) {
              this.schoolRoleName =res.data.data.name;
              this.schoolRoleAccount = res.data.data.account;
              this.isBind = res.data.data.isBind;
            }
          })
          .catch(() => {
            throw new Error("异常！");
          });
      },
    //修改校长
    mdfSchoolRole(){
      this.$dialog.confirm({
        title: '提示',
        message: '确认修改校长！'
      }).then(() => {

        let id = this.$route.query.id;
        updateDirector(id, {
          name: this.schoolRoleName,         //校长名称
          account: this.schoolRoleAccount,    //校长账号
        })
          .then(res=>{
          if (res.data.meta && res.data.meta.code === 0){

            Toast.success({
              forbidClick: true, // 禁用背景点击
              loadingType: 'success',
              position:'middle',
              message: '修改校长成功'
            });
            const timer = setInterval(() => {
              clearInterval(timer);
              Toast.clear();
              this.$router.push({name:"DirectorManage"});
            }, 2000);
          }else {
            this.$dialog.alert({
              message: '修改异常！'
            }).then(() => {
              // on close
            });
          }
        }).catch(()=>{
          throw new Error("异常！")
        })
      }).catch(() => {
        // on cancel
      });
    },
    showQrCode() {
      this.bindQrCode.show = true
      if (!isEmpty(this.bindQrCode.image)) {
        return
      }

      this.bindQrCode.loading = true
      getDirectorBindQrcode(this.$route.query.id)
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
    //alert(this.$route.params.id)
    this. getSchoolRoleInfo();
  }
};
</script>

<style scoped lang="less">
#school-role-mdf {
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
  .footer-btn{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0.4rem;
            padding: 0.08rem 0;
            background-color: #3770FB;
            box-sizing: border-box;
            .van-col{
                font-size: 0.14rem;
                color: #fff;
                line-height: 0.24rem;
                text-align: center;
                border-right: 0.01rem solid #fff;
            }
            .van-col:last-child{
                border-right-width:0 ;
            }
        }
  .btn{
    padding: 0 0.2rem;
    overflow: hidden;
    .cancel{
      padding:0.1rem 0;
      float: left;
      font-size: 0.14rem;
      color: #3770fb;
    }
    .confirm{
      padding: 0.1rem 0;
      float: right;
      font-size: 0.14rem;
      color: #3770fb;
    }
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
