<template>
  <div id="permissions-management">
    <!--校长端 互动社区 权限管理-->
    <div class="go-back">
      <van-nav-bar
        title="权限管理"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <div class="list">
        <div class="switch">
          <van-switch
            v-model="aduit"
            active-color="#84C225"
            inactive-color="#666"
            size="0.2rem"
          />
        </div>
        <div class="inst">
          <h5 class="open">“校长审核功能”{{aduit ? '已打开' : '已关闭'}}</h5>
          <p class="explain" v-if="aduit">教师发布社区需要提交校长审核</p>
          <p class="explain" v-if="!aduit">教师可在社区功能中直接发布社区消息，不需要经过校长审核</p>
        </div>
      </div>
      <div class="list">
        <div class="switch">
          <van-switch
            v-model="comments"
            active-color="#84C225"
            inactive-color="#666"
            size="0.2rem"
          />
        </div>
        <div class="inst">
          <h5 class="open">“家长评论功能”{{comments ? '已打开' : '已关闭'}}</h5>
          <p class="explain" v-if="comments">家长可在社区功能中发布评论</p>
          <p class="explain" v-else>家长仅能在社区功能中点赞，不可发布评论</p>
        </div>
      </div>
      <div class="list">
        <div class="switch">
          <van-switch
            v-model="visible"
            active-color="#84C225"
            inactive-color="#666"
            size="0.2rem"
          />
        </div>
        <div class="inst">
          <h5 class="open">“家长之间评论可见”{{visible ? '已打开' : '已关闭'}}</h5>
          <p class="explain" v-if="visible">家长评论后全园区均可见</p>
          <p class="explain"  v-if="visible">包括校长、教师、其它家长</p>
          <p class="explain"  v-if="!visible">家长评论后仅教师&校长可见</p>
        </div>
      </div>
    </div>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import { NavBar, Switch, Toast } from 'vant';
import FooterBtn from '../../common/footer-operate-btn'
import { modifyPersimission, selectPersimissionList } from '@/api/school/community'

export default {
  name: "permissions-management",
  components: {
    [Switch.name]: Switch,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      aduit: false,
      comments: false,
      visible: false,
      btnText: [
        {
          type: 1,
          title: '保存该设置',
        },
      ],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    operateBtn() {
      this.$dialog.confirm({
        title: '提示',
        message: '确定保存当前权限设置？',
      }).then(() => {
        // on confirm
        this.modifyPersimissionSet();
      }).catch(() => {
        // on cancel
      });
    },
    selectPermission() {

      selectPersimissionList()
        .then(res => {

          if (res.status === 200) {
            let d = res.data.data;
            d.checkSwitch === 0 ? this.aduit = false : this.aduit = true;
            d.commentSwitch === 0 ? this.comments = false : this.comments = true;
            d.commentVisibleSwitch === 0 ? this.visible = false : this.visible = true
          }
          //console.log(res)
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    //修改
    modifyPersimissionSet() {

      let at, cs, ve;
      this.aduit ? at = 1 : at = 0;
      this.comments ? cs = 1 : cs = 0;
      this.visible ? ve = 1 : ve = 0;
      modifyPersimission({ checkSwitch: at, commentSwitch: cs, commentVisibleSwitch: ve })
        .then(res => {

          if (res.status === 200) {
            Toast.success("保存成功");
            let timer = setTimeout(() => {
              this.selectPermission();
              clearTimeout(timer)
            }, 2900)
          } else {
            Toast.fail('保存失败')
          }
          // console.log(res)
        }).catch(() => {
        throw new Error("异常！")
      })
    },
  },
  created() {
    this.selectPermission();
  },
}
</script>

<style scoped lang="less">
#permissions-management {
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
    padding: 0 0.16rem;
    box-sizing: border-box;

    .list {
      width: 100%;
      padding: 0.23rem 0;
      border-bottom: 0.02rem solid #eee;
      overflow: hidden;

      .switch {
        float: left;
        width: 0.4rem;
        margin-right: 0.07rem;
      }

      .inst {
        float: left;
        width: 2.96rem;

        .open {
          font-size: 0.14rem;
          color: #666;
          line-height: 0.2rem;
          margin-bottom: 0.1rem;
        }

        .explain {
          font-size: 0.14rem;
          color: #999;
          line-height: 0.2rem;
        }
      }
    }
  }
}
</style>
