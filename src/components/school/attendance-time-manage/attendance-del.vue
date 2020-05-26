<template>
  <div id="attendance-type">
    <div class="go-back">
      <van-nav-bar
        title="删除考勤类型和时间"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <ul class="list">
        <li class="item" v-for="(item, index) in attendanceList" :key="index">
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
          <div class="jump commen">
            <!--<span class="icon"><van-icon name="arrow" /></span>-->
            <van-checkbox-group v-model="result">
              <van-checkbox :name="item.id"/>
            </van-checkbox-group>

          </div>
        </li>
      </ul>
    </div>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import { NavBar, Icon, Row, Col, Toast, Checkbox, CheckboxGroup } from 'vant';
import FooterBtn from '../../common/footer-operate-btn'
import { deleteAttendanceType, getAttendanceType } from '@/api/school/attendance-type-manage'

export default {
  name: "attendance-time",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      //定义页面固定底部按钮
      btnText: [
        {
          type: 2,
          title: '取消',
        },
        {
          type: 1,
          title: '确定删除',
        },
      ],
      //考勤类型列表
      attendanceList: [],
      result: [],
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
    operateBtn(type) {
      //console.log(type)
      if (type === 1) {//确定删除
        if (this.result.length === 0) {
          this.$dialog.alert({
            title: '提示',
            message: '请选择需要删除的考勤类型和时间',
          }).then(() => {
            // on close
          });
        } else {
          this.$dialog.confirm({
            title: '提示',
            message: '确认删除选中的内容？',
          }).then(() => {
            // on confirm
            this.delAttendance();
          }).catch(() => {
            // on cancel
          });
        }
      } else if (type === 2) {//取消
        this.$router.back(-1)
      }
    },
    delAttendance() {
      this.result.forEach(id => {
        deleteAttendanceType(id)
          .then(res => {
            //console.log(res);

            if (res.data.meta && res.data.meta.code === 0) {
              this.getList()
            }
          }).catch(() => {
          throw new Error("异常！")
        });
      })
    },
  },
  created() {
    this.getList()
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

        .jump {
          width: 0.65rem;
          text-align: center;

          .van-checkbox-group {
            font-size: 0.14rem;
            color: #666;
            line-height: 0.2rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
/deep/ #bottom1{
  background: #FF6666;
}
/deep/.van-checkbox__icon--checked .van-icon{
  border-color: #FF6666;
  background-color: #FF6666;
}
</style>
