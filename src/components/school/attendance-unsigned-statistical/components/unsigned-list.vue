<template>
  <div class="unsigned" v-if="unsignList">
    <div class="top-box">
      <span class="total commen">共{{unsignList.length-LeaveList.length}}人{{ type == 1 ? '未到' : '未离' }}</span>
      <span class="total commen" style="margin-left: 0.25rem" >{{LeaveList.length}}人请假</span>
      <span v-show="!isEmpty(filterActionSheetActions)" class="show-view commen" @click="isFilterActionSheetShow = true">显示范围：<span>{{currentFilterActionName}}</span><span class="icons"><van-icon
        name="arrow-down"/></span></span>
    </div>

    <div style="border-bottom: 0.02rem solid #eee;" v-if="this.type === 1">
      <div class="SignAll" @click="SignAllStudents()" v-if="this.showType === 1">
        一键签到本年级所有学生
      </div> <div class="SignAll" @click="SignAllStudents()" v-if="this.showType === 2">
        一键签到本班级所有学生
      </div> <div class="SignAll" @click="SignAllStudents()" v-if="this.showType === 3">
        一键签到所有学生
      </div>
    </div>
    <div style="border-bottom: 0.02rem solid #eee;" v-if="this.type === 2">
      <div class="SignAll" @click="SignAllStudents()" v-if="this.showType === 1">
        一键签退本年级所有学生
      </div> <div class="SignAll" @click="SignAllStudents()" v-if="this.showType === 2">
        一键签退本班级所有学生
      </div> <div class="SignAll" @click="SignAllStudents()" v-if="this.showType === 3">
        一键签退所有学生
      </div>
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text=""
    >
      <ul class="list">
        <li v-show="isEmpty(unsignList)">
          <p v-if="emptyStudentListReason" style="text-align: center;font-size: .16rem;margin: .2rem 0;color: #999;">{{ emptyStudentListReason }}</p>
          <p v-else style="text-align: center;font-size: .16rem;margin: .2rem 0;color: #999;">{{ isUnsignListFiltered ? '该显示范围内' : '' }}所有学生均已{{ type == 1 ? '签到' : '签退' }}</p>
        </li>
<!--        <li class="items" v-for="(item,index) in unsignList" :key="index">-->
<!--          <div class="name tabs">-->
<!--            <div class="t-middel">-->
<!--              <span class="text">{{item.name}}</span>-->
<!--              <span class="num">{{item.cardNo}}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="grade tabs">-->
<!--            <span>{{ showType == 1 ? item.className : item.gradeName }}</span>-->
<!--          </div>-->
<!--          <div class="note tabs">-->
<!--            <span v-if="item.remark" @click="edetorStudent(item)">{{item.remark}}</span>-->
<!--            <span v-if="!item.remark" style="text-align: center" @click="edetorStudent(item)"><van-icon-->
<!--              name="edit"/></span>-->
<!--          </div>-->
<!--          <div class="btn tabs">-->
<!--            <button type="button" :class="{disable:!canSign || item.signing}" @click="signed(item)">{{ type == 1 ?-->
<!--              '签到' : '签退' }}-->
<!--            </button>-->
<!--          </div>-->
<!--        </li> -->
        <div class="items" v-for="(item,index) in unsignList" :key="index">
          <van-row style="font-size: 0.14rem">
            <van-col span="7" style="padding: 0.2rem 0">
              <span >{{item.name}}</span><br>
              <span style=" color: #999;;font-size: 0.12rem">{{item.cardNo}}</span>
            </van-col>
            <van-col span="5">
              <div style="padding: 0.2rem 0">
                            <span>{{ showType == 1 ? item.className : item.gradeName }}</span>
              </div>
            </van-col>
            <van-col span="2" style="padding: 0.2rem 0">

                            <span v-if="!item.remark"  @click="edetorStudent(item)"><van-icon
                              name="edit"/></span>
            </van-col>
            <van-col span="5" >
              <div class="btn tabs" v-if="type === 1 && item.isLeave === false">
                            <button type="button"  @click="leaveFun(item)" >
                              请假
                            </button>
              </div>

              <div v-if=" item.isLeave === true" style="padding: 0.2rem 0px;color: #FF6666">学生请假</div>
            </van-col>
            <van-col span="5">
              <div class="btn tabs" v-if="item.isLeave === false ">
                            <button type="button" :class="{disable:!canSign || item.signing}" @click="signed(item)">{{ type == 1 ?
                              '签到' : '签退' }}
                            </button>
              </div>

            </van-col>
          </van-row>
          <div style="font-size: 0.14rem;padding: 0 0 0.15rem 0">

            <span v-if="item.remark" @click="edetorStudent(item)" style=" color: #999;font-size: 0.12rem">
              <i data-v-8d7e38c0="" class="van-icon van-icon-edit"><!----></i>
              {{item.remark}}
            </span>
          </div>
<!--          <div class="name tabs">-->
<!--            <div class="t-middel">-->
<!--              <span class="text">{{item.name}}</span>-->
<!--              <span class="num">{{item.cardNo}}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="grade tabs">-->
<!--            <span>{{ showType == 1 ? item.className : item.gradeName }}</span>-->
<!--          </div>-->
<!--          <div class="note tabs">-->
<!--            <span v-if="item.remark" @click="edetorStudent(item)">{{item.remark}}</span>-->
<!--            <span v-if="!item.remark" style="text-align: center" @click="edetorStudent(item)"><van-icon-->
<!--              name="edit"/></span>-->
<!--          </div>-->
<!--          <div class="btn tabs">-->
<!--            <button type="button" :class="{disable:!canSign || item.signing}" @click="signed(item)">{{ type == 1 ?-->
<!--              '签到' : '签退' }}-->
<!--            </button>-->
<!--          </div>-->
        </div>
      </ul>
    </van-list>


    <van-dialog
      v-model="dialogShow"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field
        v-model="message"
        label="备注"
        type="textarea"
        placeholder="请输入备注20字符以内"
        maxlength="20"
        rows="2"
        autosize
      />
    </van-dialog>

<!--   确认请假-->
    <van-dialog
            v-model="ShowLeaveDia"
            title="请确认请假"
            show-cancel-button
            @confirm="onConfirm"
    >
      <div style="text-align: center;padding: 0.15rem;font-size: 0.14rem">
      是否确定为该学生请假？<br>
      姓名：
        <span style="color: red">        {{leaveId.name}}</span>
      </div>
    </van-dialog>

    <!--显示范围列表-->
    <van-actionsheet
      v-model="isFilterActionSheetShow"
      cancel-text="取消"
      :actions="filterActionSheetActions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { Icon, List, Actionsheet, Field, Toast,Row,Col } from 'vant';
import { signed } from '@/api/school/attendance'
import { Leave } from '@/api/school/attendance-leave'
import { updateStudentRemark } from '@/api/school/student-manage'

export default {
  name: "unsigned-list",
  props: {
    LeaveList:{
      type: Array,
    },
    unsignList: {
      type: Array,
    },
    isUnsignListFiltered: {
      type: Boolean,
    },
    canSign: {
      type: Boolean,
    },
    type: {
      type: [Number, String],
    },
    showType: { // 学生的显示类型, 按什么进行分类. 1按年级显示 2按班级显示 3显示全部
      type: Number,
    },
    filterActionSheetActions: {
      type: Array
    },
    emptyStudentListReason: {
      type: String
    },
    attendId: {
      type: Number,
    },
  },
  components: {
    [Icon.name]: Icon,
    [List.name]: List,
    [Actionsheet.name]: Actionsheet,
    [Row.name]: Row,
    [Field.name]: Field,
    [Col.name]: Col,
    [Toast.name]: Toast,
  },
  watch: {
    filterActionSheetActions() {
      if (Array.isArray(this.filterActionSheetActions) && this.filterActionSheetActions.length > 0) {
        this.currentFilterActionName = this.filterActionSheetActions[0].name
      }

    }
  },
  data() {
    return {
      isFilterActionSheetShow: false,
      currentFilterActionName: '全部年级',

      message: '',
      dialogShow: false,
      ShowLeaveDia: false,
      loading: false,
      finished: true,
      exitid: null,//保存要填写备注的学生id
      leaveId:''
    }
  },
  methods: {
    onSelect(item) {
      this.currentFilterActionName = item.name;
      this.isFilterActionSheetShow = false;
      this.$emit('onFilterActionSelect', item.id);

      let timerl = setTimeout(()=>{
        this.LeaveList= [];
        for (let item of this.unsignList){
          if(item.isLeave === true){
              this.LeaveList.push(item.isLeave)
          }
        }
        console.log(this.LeaveList.length)
      },10)



    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        if (this.message === null || this.message === undefined) {
          this.message = ''
        }
        if (typeof this.message === 'string') {
          this.message = this.message.trim()
        }
        updateStudentRemark(this.exitid, this.message)
          .then(res => {
            //console.log(res);
            if (res.data.meta && res.data.meta.code === 0) {
              this.$emit("updateRemark", { id: this.exitid, remark: this.message })
              done();
            } else {
              done(false)
            }
          })
          .catch(() => {
            done(false)
          })
      } else {
        done();
      }
    },
    //填写 备注
    edetorStudent(student) {
      this.dialogShow = true;
      this.exitid = student.id;
      this.message = student.remark == null || student.remark == undefined ? '' : student.remark
    },
    // 请假
    leaveFun(item){
      this.ShowLeaveDia = true
      this.leaveId = item
    },
    onConfirm(){
      Leave(this.leaveId.id,this.attendId)
              .then(res => {
                if (res.status === 200) {
                  this.$loadingHide();

                  this.$parent.getStudentList()
                }
              }).catch(() => {
        throw new Error("历史记录获取异常!")
      })
    },
    //签到
    signed(student) {
      const actionName = this.type === 1 ? '签到' : '签退'
      if (!this.canSign) {
        this.$toast(`当前选择考勤类型在当前时间内不能进行${actionName}，请选择正确的考勤类型`)
        return
      }
      if (student.signing) {
        this.$toast(`${student.name}正在${actionName}中，请勿重复点击`)
        return
      }
      const id = student.id

      student.signing = true
      this.$loading()
      signed({ id: id })
        .then(res => {
          //console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {
            this.$emit("signed", id);
          }
        }).catch(() => {
        this.$toast('签到失败')
      })
        .finally(() => {
          student.signing = false
          this.$loadingHide()
        })
    },
    // 一键签到所有
    SignAllStudents(){
      if(this.unsignList.length>0 && this.canSign){
        console.log(this.unsignList)
        let AllStuId =  { id:[]}
        for(let i=0;i<this.unsignList.length;i++){
          if(this.unsignList[i].isLeave === false){
            AllStuId.id.push(this.unsignList[i].id)
          }
        }
        signed(AllStuId)
                .then(res => {
                  this.$loadingHide();
                  if (res.data.meta && res.data.meta.code === 0) {
                    this.$parent.getStudentList()
                    // Toast.success('签到成功')
                  }
                }).catch(() => {
          if(this.type === 1){
            this.$toast('签到失败')
          }else if(this.type === 2){
            this.$toast('签退失败')
          }
        })
      }else if(this.unsignList.length>0 && !this.canSign){
        if(this.type === 1){
          Toast('当前时间不可签到')
        }else if(this.type === 2){
          Toast('当前时间不可签退')
        }
      }else if(this.unsignList.length === 0){
        if(this.type === 1){
          Toast('无学生可签到')
        }else if(this.type === 2){
          Toast('无学生可签退')
        }
      }
    }
  },


}
</script>

<style scoped lang="less">
.unsigned {
  .top-box {
    padding: 0.16rem 0;
    overflow: hidden;
    border-bottom: 0.02rem solid #eee;
    box-sizing: border-box;

    .commen {
      font-size: 0.14rem;
      line-height: 0.2rem;
    }

    .total {
      float: left;
      color: #333;
    }

    .show-view {
      float: right;
      color: #666;
    }
  }

  .list {
    .items {
      border-bottom: 0.02rem solid #eee;
      /*height: 0.71rem;*/
      overflow: hidden;
      box-sizing: border-box;

      .tabs {
        float: left;
        height: 0.69rem;
        padding: 0.1rem 0;
        position: relative;
        box-sizing: border-box;
      }

      .name {
        width: 0.85rem;

        .t-middel {
          max-height: 0.51rem;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);

          .text {
            display: block;
            font-size: 0.14rem;
            color: #666;
            line-height: 0.2rem;
            margin-bottom: 0.02rem;
          }

          .num {
            display: block;
            font-size: 0.12rem;
            color: #999;
            line-height: 0.17rem;
          }
        }

      }

      .grade {
        width: 0.7rem;

        span {
          font-size: 0.14rem;
          color: #666;
          line-height: 0.2rem;
          max-height: 0.51rem;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .note {
        width: 1.03rem;
        color: #999;
        line-height: 0.17rem;
        margin-right: 0.26rem;

        span {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.12rem;
          display: inline-block;
          width: 100%;
          max-height: 0.51rem;
          overflow: hidden;
          word-break: break-all;
          word-wrap: break-word;
        }
      }

      .btn {
        width: 0.58rem;

        button {
          width: 0.58rem;
          height: 0.24rem;
          font-size: 0.12rem;
          color: #3770FB;
          background-color: #fff;
          outline: none;
          border-radius: 0.05rem;
          border: 0.01rem solid #3770FB;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);

          &.disable {
            color: #999;
            border-color: #999;
          }
        }
      }
    }
  }
}
  .SignAll{
    font-size: 0.15rem;
    text-align: center;
    line-height: 0.3rem;
    border: solid 1px;
    border-radius: 0.1rem;
    margin: 0.15rem;
    color: #6699FF;
  }
  /deep/.van-dialog__header{
    font-weight: 700;
  }
</style>
