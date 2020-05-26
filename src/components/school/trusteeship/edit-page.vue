<template>
  <div class="page">
    <van-nav-bar
      class="header"
      title="编辑微官网"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"/>

    <div class="content">
      <div class="div_bgc">
        <div class="Propaganda_div">
          <div class="title">宣传图片</div>
          <!--<van-uploader :after-read="test" accept="image/png,image/jpeg" multiple>-->
            <!--<van-icon name="plus"/>-->
          <!--</van-uploader>-->

          <image-uploader class="image-uploader" v-model="banner" ref="bannerUploader" itemWidth=".5rem"
                          upload-immediately/>
        </div>
      </div>

      <div class="div_bgc">
        <div class="introduce_div">
          <div class="title">结构介绍</div>
          <div class="enterintroduce">
            <van-field
              class="field"
              v-model="summary"
              type="textarea"
              placeholder="请输入机构的介绍"
              rows="2"
              autosize/>
          </div>
        </div>
      </div>

      <div class="div_bgc">
        <div class="team_div">
          <div class="title">教师团队</div>

          <van-row class="part1">
            <van-col class="center" span="20">教师数量：{{ teacherList.length }}位</van-col>
            <van-col class="right" span="4">
              <van-button class="add" type="info" @click="$store.commit('trusteeship/setEditPageData_newTeacher')">
                <van-icon name="plus"/>
              </van-button>
            </van-col>
          </van-row>

          <van-row class="part2" v-for="(teacher, index) in teacherList" :key="index" type="flex" align="center">
            <van-col span="20">
              <div class="team_name">
                <van-field
                  class="field"
                  :value="teacher.teacherName"
                  @input="$store.commit('trusteeship/setEditPageData_setTeacherName', [index, $event])"
                  maxLength="5"
                  label="教师姓名"
                  placeholder="请输入教师姓名"/>
              </div>
              <div class="team_introduction">
                <van-field
                  class="field"
                  :value="teacher.introduction"
                  @input="$store.commit('trusteeship/setEditPageData_setTeacherIntroduction', [index, $event])"
                  maxLength="50"
                  label="教师简介"
                  type="textarea"
                  placeholder="请输入教师简介"
                  rows="2"
                  autosize/>
              </div>
              <div class="team_avatar">
                <div class="left">教师照片</div>
                <div class="right">
                  <image-uploader class="image-uploader" :item-style="{ margin: 0 }" itemWidth=".5rem" :value="teacher.avatar" :max="1"
                                  :ref="`teacherAvatarUploader${index}`"
                                  @change="$store.commit('trusteeship/setEditPageData_setTeacherAvatar', [index, $event])"
                                  upload-immediately/>
                </div>
              </div>
            </van-col>
            <van-col class="right" span="4">
              <van-button class="remove" type="danger"
                          @click="$store.commit('trusteeship/setEditPageData_delTeacher', index)">
                <van-icon name="cross"/>
              </van-button>
            </van-col>
          </van-row>

        </div>
      </div>

      <div class="div_bgc">
        <div class="food_div">
          <div class="title">食谱饮食</div>
          <div class="day">
            <van-tabs color="#3770fb">
              <van-tab
                v-for="(dayRecipe, dayIndex) in recipe"
                :key="dayIndex"
                :title="dayRecipe.week">
                <!-- food edit start -->
                <van-row class="part1">
                  <van-col class="center" span="20">{{ dayRecipe.week }}食物数量：{{ dayRecipe.food.length }}种</van-col>
                  <van-col class="right" span="4">
                    <van-button class="add" type="info"
                                @click="$store.commit('trusteeship/setEditPageData_newFood', dayIndex)">
                      <van-icon name="plus"/>
                    </van-button>
                  </van-col>
                </van-row>

                <van-row class="part2" v-for="(food, foodIndex) in dayRecipe.food" :key="foodIndex" type="flex"
                         align="center">
                  <van-col span="20">
                    <div class="food_name">
                      <van-field
                        class="field"
                        :value="food.name"
                        @input="$store.commit('trusteeship/setEditPageData_setFoodName', [dayIndex, foodIndex, $event])"
                        maxLength="10"
                        label="食物名称"
                        placeholder="请输入食物名称"/>
                    </div>
                    <div class="food_img">
                      <div class="left">食物图片</div>
                      <div class="right">
                        <image-uploader class="image-uploader" :item-style="{ margin: 0 }" itemWidth=".5rem" :value="food.imgUrl" :max="1"
                                        ref="foodImgUrlUploader"
                                        @change="$store.commit('trusteeship/setEditPageData_setFoodImg', [dayIndex, foodIndex, $event])"
                                        upload-immediately/>
                      </div>
                    </div>
                  </van-col>
                  <van-col class="right" span="4">
                    <van-button class="remove" type="danger"
                                @click="$store.commit('trusteeship/setEditPageData_delFood', [dayIndex, foodIndex])">
                      <van-icon name="cross"/>
                    </van-button>
                  </van-col>
                </van-row>
                <!-- food edit end -->
              </van-tab>
            </van-tabs>
          </div>
        </div>
      </div>

      <div class="div_bgc">
        <div class="Propaganda_div">
          <div class="address">
            <div class="title">机构地址</div>
            <div class="enteraddress">
              <van-field
                class="field"
                v-model="addressText"
                maxLength="100"
                type="textarea"
                rows="2"
                autosize/>
            </div>
          </div>
          <div class="location">
            <van-cell title="点我为机构地址定位" icon="location" :to="{ name:'TrusteeshipEditPageLocation' }"/>
          </div>
        </div>
      </div>

      <div class="div_bgc">
        <div class="wechat_div">
          <div>上传联系人微信二维码</div>
          <image-uploader class="qrcode-uploader" v-model="qrCode" :max="1" ref="qrCodeUploader" itemWidth=".5rem"
                          upload-immediately/>
        </div>
      </div>

    </div>

    <van-row class="footer" type="flex" justify="center" align="center">
      <van-col span="12" class="right-border">
        <router-link class="button" :to="{ name: 'TrusteeshipShareOfficial', params: { preview: 1 } }">预览</router-link>
      </van-col>
      <van-col span="12">
        <span class="button" @click="submit">确定</span>
      </van-col>
    </van-row>


  </div>
</template>

<script>
import { NavBar, Row, Col, Cell, Tab, Tabs, Icon, Button, Field } from 'vant'
import imageUploader from '@/components/common/image-uploader'
import { submitEditWebsite, updateEditWebsite } from '@/api/school/trusteeship'
import wx from 'weixin-js-sdk'
import { isEmpty } from '@/utils'

export default {
  name: 'edit-page',
  data() {
    return {
      isNew: 1,
      schoolId: 0,
    }
  },
  components: {
    vanNavBar: NavBar,
    vanCell: Cell,
    vanTab: Tab,
    vanTabs: Tabs,
    vanRow: Row,
    vanCol: Col,
    vanIcon: Icon,
    vanButton: Button,
    vanField: Field,
    imageUploader,
  },
  computed: {
    banner: {
      get() {
        return this.$store.state.trusteeship.editPageData.imgUrl
      },
      set(data) {
        this.$store.commit('trusteeship/setEditPageData_imgUrl', data)
      },
    },
    summary: {
      get() {
        return this.$store.state.trusteeship.editPageData.summary
      },
      set(data) {
        this.$store.commit('trusteeship/setEditPageData_summary', data)
      },
    },
    teacherList: {
      get() {
        return this.$store.state.trusteeship.editPageData.teacherList
      },
    },
    recipe: {
      get() {
        return this.$store.state.trusteeship.editPageData.recipe
      },
    },
    addressText: {
      get() {
        return this.$store.state.trusteeship.editPageData.address.text
      },
      set(data) {
        this.$store.commit('trusteeship/setEditPageData_addressText', data)
      },
    },
    qrCode: {
      get() {
        return this.$store.state.trusteeship.editPageData.qrCode
      },
      set(data) {
        this.$store.commit('trusteeship/setEditPageData_qrCode', data)
      },
    },

  },
  created() {
    if (this.$store.state.trusteeship.status === 0) {
      this.$router.replace({ name: 'TrusteeshipShareOfficial' })
      return
    }

    // 声明进入编辑页面
    this.$store.commit('trusteeship/updateStatus', 2)

    this.$store.dispatch('initJSSDK')
      .then(this.getLocation)
  },
  activated() {
    console.log('activated', this.$route.query.new, this.isNew, this.$route.query.id, this.schoolId)
    if (parseInt(this.$route.query.new) !== this.isNew || parseInt(this.$route.query.id) !== this.schoolId) {
      this.$store.commit('trusteeship/resetEditPageData')
      this.$store.dispatch('trusteeship/generateEditPageData')
    }
    this.isNew = parseInt(this.$route.query.new)
    this.schoolId = parseInt(this.$route.query.id)
  },
  methods: {
    getLocation() {
      wx.getLocation({
        type: 'wgs84',
        success: res => {
          this.$store.commit('trusteeship/setEditPageData_addressLocation', [res.latitude, res.longitude])
        },
      })
    },
    submit() {
      let data
      try {
        data = this.buildData()
      } catch (e) {
        this.$toast(e.message)
        return
      }
      console.log(data)

      this.$loading('保存中...')
      const method = this.isNew ? submitEditWebsite : updateEditWebsite
      method(this.schoolId, data)
        .then(response => {
          if (response.data.meta.success) {
            this.$toast('提交成功')
            this.$router.back()
          }
        })
        .finally(() => {
          this.$loadingHide()
        })
    },
    buildData() {
      Array.prototype.concat.apply([], Object.values(this.$refs)).forEach(ref => {
        if (ref.isUploading) {
          throw new Error('图片正在上传中, 请稍候再进行保存')
        }
      })

      let imgUrl = this.banner.map(item => item.ossKey)

      let teacherList = this.teacherList.filter(teacher => {
        return !isEmpty(teacher.teacherName) || !isEmpty(teacher.introduction) || (teacher.avatar && teacher.avatar[0] && teacher.avatar[0].ossKey)
      }).map(teacher => {
        return {
          teacherName: teacher.teacherName,
          introduction: teacher.introduction,
          avatar: teacher.avatar && teacher.avatar[0] ? teacher.avatar[0].ossKey : '',
        }
      })

      let recipe = this.recipe.filter(day => {
        if (isEmpty(day.food)) {
          return false
        }
        return day.food.every(food => !isEmpty(food.name))
      }).map((day) => {
        return {
          week: day.weekIndex,
          food: day.food.map(food => {
            return {
              name: food.name,
              imgUrl: food.imgUrl && food.imgUrl[0] ? food.imgUrl[0].ossKey : '',
            }
          }),
        }
      })

      const data = {
        imgUrl,
        summary: this.summary,
        teacherList,
        recipe,
        address: this.addressText,
        longitude: this.$store.state.trusteeship.editPageData.address.longitude,
        latitude: this.$store.state.trusteeship.editPageData.address.latitude,
        qrCode: this.qrCode && this.qrCode[0] ? this.qrCode[0].ossKey : '',
      }
      this.validateForm(data)
      return data
    },
    validateForm(data) {
      const errMsgMap = {
        imgUrl: '请补充宣传图片',
        summary: '请补充结构介绍',
        teacherList: '请补充教师团队',
        recipe: '请补充食谱饮食',
        address: '请补充机构地址',
        longitude: '请使用定位功能进行定位',
        latitude: '请使用定位功能进行定位',
        qrCode: '请上传联系人微信二维码',
      }
      for (let key in errMsgMap) {
        if (isEmpty(data[key])) {
          throw new Error(errMsgMap[key])
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
* {
  font-size: 0.14rem;
  box-sizing: border-box;
}

.page {
  background-color: #F3F7F8;
  display: flex;
  flex-direction: column;
  height: 100vh;

  .header {
    flex-shrink: 0;
  }

  .content {
    flex-grow: 1;
    overflow: scroll;
  }

  .footer {
    flex-shrink: 0;
    height: .4rem;
    line-height: .4rem;
    font-size: .14rem;
    background: #3770fb;
    color: #fff;

    .right-border {
      height: .25rem;
      line-height: .25rem;
      border-right: 1px solid #fff;
    }

    .button {
      width: 100%;
      text-align: center;
      display: inline-block;
    }
  }

}

.div_bgc {
  background-color: white;
  margin-top: 0.1rem;
  float: left;
  width: 100%;
}

.div_bgc:nth-child(2) {
  margin-top: 0;
}


.Propaganda_div {
  padding: 0.15rem 0.15rem;

  .image-uploader {
    margin: .1rem 0;
  }
}

.address {
  border-bottom: solid 1px #EEEEEE;
}

.enteraddress {
  margin: 0.1rem 0 0.1rem 0;

  .field {
    padding: 0;
  }
}

.location {
  margin-top: 0.15rem;
  color: #D80000;
}

.location i {
  margin-right: 0.1rem;
  font-size: 0.24rem;
  color: #D80000;
}

.location span {
  line-height: 0.24rem;
  color: #D80000;
}

.location /deep/ .van-cell {
  padding: 0;
}

.introduce_div {
  /*margin-top: 0.1rem;*/
  padding: 0.15rem 0.15rem;
}

.enterintroduce .field {
  padding: 0;
  margin: .1rem 0;
}

textarea::-webkit-input-placeholder {
  color: #CACACA;
}

.choice {
  border-bottom: solid 1px #EEEEEE;
}

.choice_title {
  float: left;
}

.team_avatar_bor {
  border-bottom: solid 1px #EEEEEE;
  float: left;
  width: 100%;
}

.team_div {
  /*margin-top: 0.1rem;*/
  padding: 0.15rem 0.15rem;

  .right {
    text-align: right;
  }

  .part1 {
    padding: .1rem 0;

    .center {
      line-height: .4rem;
    }

    .add {
      width: .4rem;
      height: .4rem;
      padding: 0;
      margin: 0;
      text-align: center;
      line-height: .4rem;
      border-radius: 50%;
    }
  }

  .part2 {
    border-top: 1px solid #EEEEEE;

    .field {
      padding: 0;
    }

    .team_name,
    .team_introduction,
    .team_avatar {
      margin: .1rem 0;
      padding: 0;
    }


    .team_avatar {
      display: flex;

      .left {
        min-width: 90px;
        flex-shrink: 0;
      }
      .right {
        flex-grow: 1;
      }
      .image-uploader {
        margin: 0;
      }
    }

    .remove {
      width: .4rem;
      height: .4rem;
      padding: 0;
      margin: 0;
      text-align: center;
      line-height: .4rem;
      border-radius: 50%;
    }
  }

}

.food_div {
  padding: 0.15rem 0.15rem;

  .right {
    text-align: right;
  }

  .part1 {
    padding: .1rem 0;

    .center {
      line-height: .4rem;
    }

    .add {
      width: .4rem;
      height: .4rem;
      padding: 0;
      margin: 0;
      text-align: center;
      line-height: .4rem;
      border-radius: 50%;
    }
  }

  .part2 {
    border-top: 1px solid #EEEEEE;

    .field {
      padding: 0;
    }

    .food_name,
    .food_img {
      margin: .1rem 0;
      padding: 0;
    }

    .food_img {
      display: flex;

      .left {
        min-width: 90px;
        flex-shrink: 0;
      }
      .right {
        flex-grow: 1;
      }

      .image-uploader {
        margin: 0;
      }
    }

    .remove {
      width: .4rem;
      height: .4rem;
      padding: 0;
      margin: 0;
      text-align: center;
      line-height: .4rem;
      border-radius: 50%;
    }
  }
}


.wechat_div {
  padding: 0.15rem;
}


.operate-btn {
  z-index: 999;
}

.van-cell__left-icon, .van-cell__right-icon {
  height: 0.24rem;
  line-height: 0.24rem;
}

</style>

