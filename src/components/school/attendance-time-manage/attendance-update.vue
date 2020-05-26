<template>
  <div id="attendance-update">
    <div class="go-back">
      <van-nav-bar
        title="修改考勤类型和时间"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <ul class="list">
        <li class="item" v-for="(item, index) in attendanceList" :key="index" @click="getSingleInfo(item)">
          <div class="name commen">
            <span>{{item.name}}</span>
          </div>
          <div class="time commen">
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
        </li>
      </ul>
    </div>
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
                      readonly

                    />
                </span>
      <span @click="chooseTime(1)">
                    <van-field
                      v-model="addInfo.enterE"
                      label=""
                      readonly
                    />
                </span>
      <span @click="chooseTime(2)">
                    <van-field
                      v-model="addInfo.exitS"
                      label="离园时间："
                      readonly

                    />
                </span>
      <span @click="chooseTime(3)">
                    <van-field
                      v-model="addInfo.exitE"
                      label=""
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
  </div>
</template>

<script>
import { NavBar, Icon, Row, Col, Field, DatetimePicker, Popup, Toast } from 'vant';
import { getAttendanceType, updateAttendanceType } from '@/api/school/attendance-type-manage'

export default {
  name: "attendance-update",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
  },
  data() {
    return {
      timeShow: false,
      addShow: false,
      minHour: 0,
      maxHour: 24,
      currentDate: '08:00',
      type: 0,//标识现在是点击的哪个选择时间的输入框
      //考勤类型列表
      attendanceList: [],
      addInfo: {
        type: '',
        enterS: '',
        enterE: '',
        exitS: '',
        exitE: '',
      },
      updateId: 0,//保存修改的id
    }
  },
  methods: {
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
    //获取单条考勤类型信息
    getSingleInfo(item) {
      // console.log(item);
      this.addInfo.type = item.name;
      this.addInfo.enterS = item.entryTimeStart;
      this.addInfo.enterE = item.entryTimeEnd;
      this.addInfo.exitS = item.exitTimeStart;
      this.addInfo.exitE = item.exitTimeEnd;
      this.updateId = item.id;
      this.addShow = true;
    },
    //修改考勤类型
    updateAttendance() {

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
      // let time = date.split(':');
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
      }
      this.timeShow = false;
    },
    //关闭时间弹出框
    oncancel() {
      this.timeShow = false;
    },
    //确认修改考勤类型
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
          //
          updateAttendanceType(this.updateId, {
            name: this.addInfo.type,
            entryTimeStart: this.addInfo.enterS,
            entryTimeEnd: this.addInfo.enterE,
            exitTimeStart: this.addInfo.exitS,
            exitTimeEnd: this.addInfo.exitE,
          })
            .then(res => {
              //
              // console.log(res);
              if (res.data.meta && res.data.meta.code === 0) {
                this.getList()
              }
              done()
            }).catch(() => {
            throw new Error("异常")
          });
        }
      } else {
        done();
      }
    },
    chooseTime(type) {
      this.type = type;
      this.timeShow = true;
    },
  },
  created() {
    this.getList()
  },
}
</script>

<style scoped lang="less">
#attendance-update {
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
    padding-top: 0.15rem;
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
      }
    }
  }

  .footer {
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
}
</style>
