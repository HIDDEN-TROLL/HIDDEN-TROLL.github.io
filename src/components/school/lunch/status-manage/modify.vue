<template>
  <div class="status_manage_modify">
    <nav-bar
      class="nav-bar"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      fixed />

    <div class="table_list">
      <div class="lunch_list">
        <span class="left_title">午休用餐：</span>
        <radio-group v-model="ftype" @change="onFtypeChange">
          <radio :name="2">用餐情况</radio>
          <radio :name="1">午休表现</radio>
        </radio-group>
      </div>
<!--      <div class="lunch_list">-->
<!--        <span class="left_title">状况纪律：</span>-->
<!--        <radio-group v-model="category">-->
<!--          <radio v-show="ftype === 1" :name="1">午休状况</radio>-->
<!--          <radio v-show="ftype === 1" :name="2">午休纪律</radio>-->
<!--          <radio v-show="ftype === 2" :name="3">用餐表现</radio>-->
<!--          <radio v-show="ftype === 2" :name="4">用餐时间</radio>-->
<!--        </radio-group>-->
<!--      </div>-->
      <div class="lunch_list">
        <span class="left_title">状态：</span>
        <text-input
          class="input"
          show-counter
          max="15"
          v-model="comment"
          placeholder="请输入状态" />
      </div>
    </div>

    <div class="bottom">
      <van-button plain @click="submit" class="button">确认修改</van-button>
      <i class="divider"></i>
      <van-button plain @click="del" class="button">删除状态</van-button>
    </div>

  </div>
</template>

<script>
import { NavBar, Button, Radio, RadioGroup } from 'vant'
import { modifyStatus, deleteStatus } from '@/api/school/lunch'
import { modifyComment } from '@/api/school/lunch'
import { isEmpty } from '@/utils'
import textInput from '@/components/common/text-input'

export default {
  name: 'status_manage_modify',
  data() {
    return {
      cid: 0,
      ftype: 1,
      category: 1,
      comment: '',
    }
  },
  components: {
    NavBar,
    Radio,
    RadioGroup,
    vanButton: Button,
    textInput
  },
  mounted(){
    const ftype = this.$route.params.ftype
    const category = this.$route.params.category
    this.cid = this.$route.params.cid
    this.comment = decodeURIComponent(this.$route.params.comment)
    if ((ftype !== 1 && ftype !== 2) || (category !== 1 && category !== 2)) {
      this.$toast('参数错误')
      this.$router.back()
      return
    }
    this.ftype = ftype
    this.category = this.ftype === 2 ? category + 2 : category
  },
  methods: {
    onFtypeChange() {
      this.category = this.ftype === 1 ? 1 : 3
    },
    submit() {
      if (isEmpty(this.comment)) {
        this.$toast('请输入状态')
        return
      }
      this.$loading()
      modifyComment(this.cid, this.ftype, this.comment)
        .then(response => {
          if (response.data.meta.success) {
            this.$toast('修改状态成功')
            this.$router.back()
          }
        })
        .finally(() => { this.$loadingHide() })
    },
    del() {
      this.$dialog.confirm({
        title: '删除状态',
        message: '状态删除后无法撤回，是否确定删除？',
        confirmButtonText: '确认删除',
        confirmButtonColor: '#D80000',
        overlay: true,
      })
        .then(() => {
          this.$loading('删除中...')
          deleteStatus(this.cid)
            .then(response => {
              if (response.data.meta.success) {
                this.$toast('删除状态成功')
                this.$router.back()
              }
            })
            .finally(() => { this.$loadingHide() })
        })
    },
  }
}
</script>

<style scoped>

.status_manage_modify {
  padding-top: 44px;
  padding-bottom: .4rem;
  background: #ffffff;
  font-size: 0.16rem;
}
.table_list{
  margin:  0.16rem;
}
.lunch_list{
  border-bottom: solid 1px #EEEEEE;
  display: flex;
  align-items: center;
  padding: .16rem 0;
}
.left_title{
  margin-right: 0.08rem;
  width: .8rem;
}
.enter_list{
  height: 0.18rem;
  border: none;
}
.changeadmin{
  font-size:0.06rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:0.064rem
}


.van-cell{
  font-size:0.15rem;
  padding: 0;
  line-height: .2rem;
}
.van-field__label{
  background-color: black;
  max-width: .2rem;
}

.van-cell__title>>>van-field__label{
  max-width: 50px;
}

.van-radio-group {
  display: inline-block;
}
.van-radio {
  display: inline-block;
  margin-right: .2rem;
}

.bottom {
  z-index: 2;
  position: fixed;
  height: .4rem;
  background: #3770fb;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}
.bottom .divider {
  border-right: 1px solid #fff;
  height: .2rem;
}
.bottom .button {
  background: #3770fb;
  height: .4rem;
  line-height: .4rem;
  width: 50%;
  text-align: center;
  display: block;
  color: #fff;
  border: 0;
}
</style>
