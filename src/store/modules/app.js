import request from '@/utils/request'
import { shouldUpdateCompanyName, setCompanyName } from  '@/utils/company-name'
import { getCompanyName } from  '@/api/common'
import wx from 'weixin-js-sdk'

let JSSDKStatus = 0 // 0 未初始化 1 初始化中 2 初始化完成

const app = {
  state: {
    isShow:false,
  },

  mutations: {
    getShow(state) {
      state.isShow = true
    },
    offShow(state) {
      state.isShow = false
    },
  },

  actions: {
    initJSSDK() {
      if (JSSDKStatus !== 0) {
        if (JSSDKStatus === 1) {
          console.warn('JSSDK 初始化中')
        } else if (JSSDKStatus === 2) {
          console.warn('JSSDK 已初始化完成')
        } else {
          console.warn('JSSDK 状态不为 0')
        }
        return
      }

      JSSDKStatus = 1
      return request('/api/wechat/jssdk')
        .then(response => {
          if (response.data.meta.success) {
            wx.config({
              debug: false,
              jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'getLocalImgData', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'],
              ...response.data.data
            })

            return new Promise(resolve => {
              wx.ready(() => {
                JSSDKStatus = 2
                resolve()
              })
              wx.error(res => {
                console.error(res)
                JSSDKStatus = 0
                resolve()
              })
            })
          }
        })
        .finally(() => {
          // 没有初始化成功就是初始化失败了
          if (JSSDKStatus !== 2) {
            JSSDKStatus = 0
          }
        })
    },
    updateCompanyName() {
      if (shouldUpdateCompanyName()) {
        getCompanyName()
          .then(response => {
              if (response.data.meta.success) {
                setCompanyName(response.data.data.i, response.data.data.companyName)
              }
          })
      }
    }
  }
}

export default app
