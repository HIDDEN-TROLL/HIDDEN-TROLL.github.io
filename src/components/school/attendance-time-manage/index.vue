<template>
  <div id="attendance-type">
    <div class="go-back">
      <van-nav-bar
        title="考勤类型和时间"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
      <div style="margin-top: 0.15rem;">
          <van-tabs @click="changeTab" type="card">
              <van-tab title="学生考勤">
                  <div class="ac_line" style="margin-top: 0.15rem;"></div>
                  <div class="content">
                      <ul class="list">
                          <li class="item" v-for="(item, index) in attendanceList" :key="index">
                              <div class="name commen">
                                  <span>{{item.name}}</span>
                              </div>
                              <div class="time commen" @click="getSingleInfo(item)">
                                  <div class="comprehensive">
                                      <p class="enter">
                                          <span class="title">进园时间：</span>
                                          <span class="num">{{item.entryTimeStart}}-{{item.entryTimeEnd}}</span>
                                      </p>
                                      <p class="outer">
                                          <span class="title">离园时间：</span>
                                          <span class="num">{{item.exitTimeStart}}-{{item.exitTimeEnd}}</span>
                                      </p>
                                  </div>
                              </div>
                              <div class="jump commen">
                                  <router-link :to="{name:'ClassManageAssociatedStudent',query:{id:item.id,student:item.studentCount}}"><span
                                          class="icon"><van-icon name="arrow"/></span></router-link>
                              </div>
                          </li>
                      </ul>
                  </div>
              </van-tab>
              <van-tab title="教师考勤">
                  <div class="ac_line" style="margin-top: 0.15rem;"></div>
                  <div style="padding-bottom: 0.4rem;">
                      <div class="newlist"  v-for="(item, index) in teacherlist" :key="index">
                          <van-row style="padding:  0 0.15rem">
                              <van-col span="5" style="text-align: center">
                                  <span style="line-height: 0.71rem;">{{item.name}}</span>
                              </van-col>
                              <van-col span="12" style="line-height: 0.35rem">
                                  <p class="enter" style="line-height: 0.71rem;text-align: center">
                                      <span class="num">时间：{{item.entryTimeStart}}-{{item.entryTimeEnd}}</span>
                                  </p>
                              </van-col>
                              <van-col span="7" style="text-align: center">
                                  <div v-if="item.sort>2" style="line-height: 0.71rem">
                                      <span class="delete" @click="deleteTeaAttendanceFun(item.id)">删除</span>
                                      <span @click="getTeaSingleInfo(item)" class="change">修改</span>
                                  </div>
                                  <div v-else style="line-height: 0.6rem;">
                                      <span class="change" @click="getTeaSingleInfo(item)" >修改</span>
                                  </div>
                              </van-col>
                          </van-row>
                          <div class="ac_line"></div>
                      </div>
                  </div>
              </van-tab>
          </van-tabs>
      </div>

    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
    <!-- 新增、修改考勤弹出框-->
    <van-dialog
      v-model="addShow"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field
        maxlength="10"
        v-model="addInfo.type"
        type="text"
        label="考勤名称："
        placeholder="请输入考勤名称"

      />
      <span @click="chooseTime(0)">
                    <van-field
                      v-model="addInfo.enterS"
                      label="进园时间："
                      placeholder="请选择进园开始时间"
                      readonly

                    />
                </span>
      <span @click="chooseTime(1)">
                    <van-field
                      v-model="addInfo.enterE"
                      label=""
                      placeholder="请选择进园结束时间"
                      readonly
                    />
                </span>
      <span @click="chooseTime(2)">
                    <van-field
                      v-model="addInfo.exitS"
                      label="离园时间："
                      placeholder="请选择离园开始时间"
                      readonly

                    />
                </span>
      <span @click="chooseTime(3)">
                    <van-field
                      v-model="addInfo.exitE"
                      label=""
                      placeholder="请选择离园结束时间"
                      readonly
                    />
                </span>


    </van-dialog>
      <!-- 新增、修改教师考勤弹出框-->
    <van-dialog
      v-model="TeaaddShow"
      show-cancel-button
      :before-close="TeabeforeClose"
    >
      <van-field
        maxlength="10"
        v-model="addInfo.type"
        type="text"
        label="考勤名称："
        placeholder="请输入考勤名称"

      />
      <span @click="chooseTime(4)">
                    <van-field
                      v-model="addInfo.enterS"
                      label="开始时间："
                      placeholder="请选择开始时间"
                      readonly

                    />
                </span>
      <span @click="chooseTime(5)">
                    <van-field
                      v-model="addInfo.enterE"
                      label="结束时间："
                      placeholder="请选择结束时间"
                      readonly
                    />
      </span>
    </van-dialog>
    <!--时间选择-->
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="time"
        :min-hour="minHour"
        :max-hour="maxHour"
        :formatter="formatter"
        @confirm="onconfirm"
        @cancel="oncancel"
      />
    </van-popup>
<!--      确认教师删除-->
      <van-dialog
              v-model="DeleteTea"
              show-cancel-button
              @confirm="DeleteTeaDia"
              title="确认删除？"
      >
          <div class="deleteDia">
              确定删除该教师考勤类型？

          </div>
      </van-dialog>

  </div>
</template>

<script>
import { NavBar, Icon, Row, Col, Field, DatetimePicker, Popup, Toast,Tab, Tabs  } from 'vant';
import FooterBtn from '../../common/footer-operate-btn'
import { addAttendanceType, getAttendanceType, updateAttendanceType } from '@/api/school/attendance-type-manage'
import { attendanceTeacher,createTeaAttendance,deleteTeaAttendance,changeTeaAttendance } from '@/api/school/attendance-type-manage'

export default {
  name: "attendance-time",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    //[Dialog.name]:Dialog,
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Toast.name]: Toast,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      timeShow: false,
      DeleteTea: false,
      addShow: false,
      TeaaddShow: false,
      minHour: 0,
      maxHour: 24,
      currentDate: '08:00',
      type: 0,//标识现在是点击的哪个选择时间的输入框
      //定义页面固定底部按钮
      btnText: [

        {
          type: 2,
          title: '新增类型',
        }, {
              type: 1,
              title: '删除类型',
          },
      ],
      //考勤类型列表
      attendanceList: [],
      attendanceType:1,//标识操作新增 或 修改考勤  1  新增 2 修改
      addInfo: {
        type: '',
        enterS: '',
        enterE: '',
        exitS: '',
        exitE: '',
      },
        teacherStart:0,
        teacherEnd:0,
      updateId: 0,//保存修改的id

        teacherlist:[],
        TeacherId:0,
    }
  },
  methods: {
      // 删除教师考勤类型（弹窗）
      deleteTeaAttendanceFun(id) {
          this.TeacherId = id
          this.DeleteTea = true
      },
      // 修改教师考勤类型
      changeTeaAttendanceFun() {
          this.$loading();
          changeTeaAttendance(
              this.updateId,
              this.addInfo.type,
              this.addInfo.enterS,
              this.addInfo.enterE,
          )
              .then(res => {
                  if (res.data.meta && res.data.meta.code === 0) {
                      this.$loadingHide();
                      this.attendanceTeacherFun()
                            Toast.success('修改成功！')
                  }
              }).catch(() => {
              throw new Error("异常！")
          })
      },
      // 获取教师考勤类型
      attendanceTeacherFun() {
          attendanceTeacher()
              .then(res => {
                  if (res.data.meta && res.data.meta.code === 0) {
                      if (res.data.data.length > 0) {
                          this.teacherlist = res.data.data
                      }
                  }
              }).catch(() => {
              throw new Error("异常！")
          })
      },
      //新增教师考勤类型
      createTeaAttendanceFun(){
          this.$loading();
          createTeaAttendance(
              this.addInfo.type,
              this.addInfo.enterS,
              this.addInfo.enterE,
          )
              .then(res => {
                  this.$loadingHide();
                  if (res.data.meta.code === 0) {
                      Toast.success({
                          forbidClick: true, // 禁用背景点击
                          loadingType: "success",
                          position:'middle',
                          message: "新增成功!"
                      });
                          let timerl = setTimeout(()=>{
                              this.attendanceTeacherFun()
                          },100)
                  }
              }).catch(() => {
              throw new Error("新增教师考勤类型异常")
          });
      },
        // 切换标签
      changeTab(index) {
          if(index === 1){
              this.btnText = [
                  {
                      type: 3,
                      title: '新增类型',
                  }
              ]
          }else{
              this.btnText = [
                  {
                      type: 1,
                      title: '删除类型',
                  },
                  {
                      type: 2,
                      title: '新增类型',
                  },
              ]
          }
      },
    onClickLeft() {
      this.$router.back(-1)
    },
    getList() {
      getAttendanceType()
        .then(res => {
          //console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {
            if (res.data.data.length > 0) {
              this.attendanceList = res.data.data
            }
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    formatter(type, value) {
      if (type === 'hour') {
        return `${value}时`;
      } else if (type === 'minute') {
        return `${value}分`
      }
      return value;
    },
    //确定时间弹出框
    onconfirm(date) {
      //console.log(date);
      //let time = date.split(':');
      if (this.type === 0) {
        //this.addInfo.enterS = `${time[0]}时${time[1]}分`
        this.addInfo.enterS = date
      } else if (this.type === 1) {
        //this.addInfo.enterE = `${time[0]}时${time[1]}分`
        this.addInfo.enterE = date
      } else if (this.type === 2) {
        //this.addInfo.exitS = `${time[0]}时${time[1]}分`
        this.addInfo.exitS = date
      } else if (this.type === 3) {
        //this.addInfo.exitE = `${time[0]}时${time[1]}分`
        this.addInfo.exitE = date
      } else if (this.type === 4){
        this.addInfo.enterS = date
      } else if (this.type === 5){
        this.addInfo.enterE = date
      }
      this.timeShow = false;
    },
    //关闭时间弹出框
    oncancel() {
      this.timeShow = false;
    },
    operateBtn(type) {
      //console.log(type)
      /*if (type === 1) {//修改
        this.updateAttendance()
      } else */
        if (type === 1) {//删除
        this.delAttendance()
      } else if (type === 2) {//新增
        this.addAttendance()
      } else if(type === 3){
           this.addTeaAttendance()
        }
    },
    //新增考勤类型
    addAttendance() {
      this.attendanceType = 1;
      this.addInfo.type = '';
      this.addInfo.enterS = '';
      this.addInfo.enterE = '';
      this.addInfo.exitS = '';
      this.addInfo.exitE = '';
      this.updateId = 0;
      this.addShow = true;
    },
      //新增教师考勤类型
    addTeaAttendance() {
      this.attendanceType = 4;
      this.addInfo.type = '';
      this.addInfo.enterS = '';
      this.addInfo.enterE = '';
      this.addInfo.exitS = '';
      this.addInfo.exitE = '';
      this.updateId = 0;
      this.TeaaddShow = true;
    },
    //获取单条考勤类型信息
    getSingleInfo(item) {
      this.attendanceType = 2;
      this.addInfo.type = item.name;
      this.addInfo.enterS = item.entryTimeStart;
      this.addInfo.enterE = item.entryTimeEnd;
      this.addInfo.exitS = item.exitTimeStart;
      this.addInfo.exitE = item.exitTimeEnd;
      this.updateId = item.id;
      this.addShow = true;
    },
      //获取教师单条考勤类型信息
    getTeaSingleInfo(item) {
      this.attendanceType = 3;
      this.addInfo.type = item.name;
      this.addInfo.enterS = item.entryTimeStart;
      this.addInfo.enterE = item.entryTimeEnd;
      this.addInfo.exitS = item.exitTimeStart;
      this.addInfo.exitE = item.exitTimeEnd;
      this.updateId = item.id;
      this.TeaaddShow = true;
    },
    //修改考勤类型
    /*updateAttendance() {
      this.$router.push({ name: 'AttendanceTimeManageUpdate' })
    },*/
    //删除考勤类型
    delAttendance() {
      this.$router.push({ name: 'AttendanceTimeManageDel' })
    },
    //提交考勤类型
    beforeClose(action, done) {
      if (action === 'confirm') {
        if (!this.addInfo.type) {
          Toast('请输入考勤类型');
          done(false)
        } else if (!this.addInfo.enterS || !this.addInfo.enterE) {
          Toast('请选择进园时间');
          done(false)
        } else if (!this.addInfo.exitS || !this.addInfo.exitE) {
          Toast('请选择离园时间');
          done(false)
        } else {
          if (this.attendanceType === 1){
            this.addAtendanceType(done);
          }else if (this.attendanceType === 2){
            this.modifyAtendanceType(done)
          }else if (this.attendanceType === 3){
            this.changeTeaAttendanceFun(done)
          }
        }
      } else {
        done();
      }
    },
      //提交考勤类型
    TeabeforeClose(action, done) {
      if (action === 'confirm') {
        if (!this.addInfo.type) {
          Toast('请输入考勤类型');
          done(false)
        } else if (!this.addInfo.enterS) {
          Toast('请选择开始时间');
          done(false)
        } else if ( !this.addInfo.enterE) {
          Toast('请选择结束时间');
          done(false)
        } else {
            if (this.attendanceType === 3){
                this.changeTeaAttendanceFun();
            }else if (this.attendanceType === 4){
                this.createTeaAttendanceFun();
            }
            done()
        }
      } else {
        done();
      }
    },
      //删除考勤类型
    DeleteTeaDia() {
        this.$loading();
        deleteTeaAttendance(this.TeacherId)
              .then(res => {
                  this.$loadingHide();
                  if (res.data.meta && res.data.meta.code === 0) {
                      Toast.success({
                          forbidClick: true, // 禁用背景点击
                          loadingType: "success",
                          position:'middle',
                          message: "删除成功！"
                      });
                      let timer2 = setTimeout(()=>{
                          this.attendanceTeacherFun()
                      },100)
                  }
              }).catch(() => {
              throw new Error("异常！")
          })
          this.DeleteTea = false
    },
    //新增考勤类型
    addAtendanceType(done){
      this.$loading(undefined,undefined,true);
      addAttendanceType({
        name: this.addInfo.type,
        entryTimeStart: this.addInfo.enterS,
        entryTimeEnd: this.addInfo.enterE,
        exitTimeStart: this.addInfo.exitS,
        exitTimeEnd: this.addInfo.exitE,
      })
        .then(res => {
          this.$loadingHide();
          //console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {
            Toast.success({
              forbidClick: true, // 禁用背景点击
              loadingType: "success",
              position:'middle',
              message: "新增考勤类型成功"
            });
            const timer = setInterval(() => {
              clearInterval(timer);
              Toast.clear();
              this.getList()
            }, 2000);
          }
          done()
        }).catch(() => {
        throw new Error("异常")
      });
    },
    //修改考勤类型
    modifyAtendanceType(done){
      this.$loading(undefined,undefined,true);
      updateAttendanceType(this.updateId, {
        name: this.addInfo.type,
        entryTimeStart: this.addInfo.enterS,
        entryTimeEnd: this.addInfo.enterE,
        exitTimeStart: this.addInfo.exitS,
        exitTimeEnd: this.addInfo.exitE,
      })
        .then(res => {
          // console.log(res);
          this.$loadingHide();
          if (res.data.meta && res.data.meta.code === 0) {
            Toast.success({
              forbidClick: true, // 禁用背景点击
              loadingType: "success",
              position:'middle',
              message: "修改考勤类型成功"
            });
            const timer = setInterval(() => {
              clearInterval(timer);
              Toast.clear();
              this.getList()
            }, 2000);
          }
          done()
        }).catch(() => {
        throw new Error("异常")
      });
    },
    chooseTime(type) {
      this.type = type;
      this.timeShow = true;
    },
  },
  created() {
    this.getList()
    this.attendanceTeacherFun()
  },
}
</script>

<style scoped lang="less">
#attendance-type {
  font-size: 0;
  background-color: #fff;

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
    padding-bottom: 0.4rem;

    .list {
      background-color: #F3F7F8;

      .item {
        height: 0.71rem;
        width: 100%;
        margin-bottom: 0.1rem;
        background-color: #fff;
        overflow: hidden;

        .commen {
          float: left;
          height: 100%;
          position: relative;
          text-align: center;
        }

        .name {
          width: 0.65rem;

          span {
            font-size: 0.14rem;
            color: #666;
            line-height: 0.2rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .time {
          width: 2.45rem;

          .comprehensive {
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);

            p {
              width: 100%;
              text-align: center;
              line-height: 0.2rem;

              .title {
                font-size: 0.14rem;
                color: #666;
              }

              .num {
                font-size: 0.14rem;
                color: #999;
                margin-left: 0.08rem;
              }
            }
          }
        }

        .jump {
          width: 0.65rem;
          text-align: center;

          .icon {
            font-size: 0.14rem;
            color: #666;
            line-height: 0.2rem;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  /*.van-field__body{
      .van-field__control{
          border: 0.01rem solid #666;
          border-radius: 0.03rem;
      }
  }*/

  /*.footer{
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
  }*/
    .ac_line{
        background-color: #f3f7f8;
        height: 0.1rem;
    }
    .newlist{
        line-height: 0.3rem;
        font-size: 0.14rem;
    }
    .change{
        border: solid 1px #6699FF;
        border-radius: 8px;
        padding: 0.03rem 0.05rem;
        margin-left: 0.1rem;
        color: #6699FF;
    }.delete{
        border: solid 1px #FF6666;
        border-radius: 8px;
        color: #FF6666;
        padding: 0.03rem 0.05rem;
    }
    .deleteDia{
        padding: 25px;
        font-size: 14px;
        line-height: 1.5;
        text-align: center;
    }
}
/deep/ #bottom1{
    background: #FF6666;
}
</style>
