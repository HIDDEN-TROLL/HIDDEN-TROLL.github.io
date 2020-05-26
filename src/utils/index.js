import VueRouter from 'vue-router'
import wx from 'weixin-js-sdk'
import { ImagePreview } from 'vant'
import { getGlobalVar } from './global-var'

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
    )
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(
      Object.keys(json).map(key => {
        if (json[key] === undefined) return ''
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      })
  ).join('&')
}

export function param2Obj(url) {
  let search = url.split('?')[1]
  if (!search) {
    return {}
  }
  if (search.includes('#')) {
    search = search.slice(0, search.lastIndexOf('#'))
  }
  if (isEmpty(search)) {
    return {}
  }
  return JSON.parse(
      '{"' +
      decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
      '"}'
  )
}

export function param2Obj2(url) {
  url = new URL(url)
  const obj = {}
  const keys = url.searchParams.keys()
  while(true) {
    let next = keys.next()
    let key = next.value
    if (key) {
      obj[key] = url.searchParams.get(key)
    }
    if (next.done) {
      break
    }
  }
  return obj
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
        classString.substr(0, nameIndex) +
        classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function formatDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}

export function phpFunctionDate(format, timestamp) {
  return date(format, timestamp)
}

export function date(format, timestamp) {
  let jsdate
  if (timestamp instanceof Date) {
    jsdate = timestamp
  } else if (/^\d+$/.test(timestamp)) {
    if ((timestamp + '').length === 10) {
      jsdate = new Date(timestamp * 1000)
    } else {
      jsdate = new Date(timestamp)
    }
  } else {
    jsdate = new Date()
  }
  const pad = function(n, c) {
    if ((n = n + '').length < c) {
      return new Array(++c - n.length).join('0') + n
    } else {
      return n
    }
  }
  const txt_weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const txt_ordin = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    21: 'st',
    22: 'nd',
    23: 'rd',
    31: 'st'
  }
  const txt_months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const f = {
    d: function() {
      return pad(f.j(), 2)
    },
    D: function() {
      return f.l().substr(0, 3)
    },
    j: function() {
      return jsdate.getDate()
    },
    l: function() {
      return txt_weekdays[f.w()]
    },
    N: function() {
      return f.w() + 1
    },
    S: function() {
      return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
    },
    w: function() {
      return jsdate.getDay()
    },
    z: function() {
      return ((jsdate - new Date(jsdate.getFullYear() + '/1/1')) / 864e5) >> 0
    },
    W: function() {
      const a = f.z()
      const b = 364 + f.L() - a
      let nd2
      const nd = (new Date(jsdate.getFullYear() + '/1/1').getDay() || 7) - 1
      if (b <= 2 && (jsdate.getDay() || 7) - 1 <= 2 - b) {
        return 1
      } else {
        if (a <= 2 && nd >= 4 && a >= 6 - nd) {
          nd2 = new Date(jsdate.getFullYear() - 1 + '/12/31')
          return date('W', Math.round(nd2.getTime() / 1000))
        } else {
          return (1 + (nd <= 3 ? (a + nd) / 7 : (a - (7 - nd)) / 7)) >> 0
        }
      }
    },
    F: function() {
      return txt_months[f.n()]
    },
    m: function() {
      return pad(f.n(), 2)
    },
    M: function() {
      return f.F().substr(0, 3)
    },
    n: function() {
      return jsdate.getMonth() + 1
    },
    t: function() {
      let n
      if ((n = jsdate.getMonth() + 1) === 2) {
        return 28 + f.L()
      } else {
        if ((n & 1 && n < 8) || (!(n & 1) && n > 7)) {
          return 31
        } else {
          return 30
        }
      }
    },
    L: function() {
      const y = f.Y()
      return !(y & 3) && (y % 1e2 || !(y % 4e2)) ? 1 : 0
    },
    Y: function() {
      return jsdate.getFullYear()
    },
    y: function() {
      return (jsdate.getFullYear() + '').slice(2)
    },
    a: function() {
      return jsdate.getHours() > 11 ? 'pm' : 'am'
    },
    A: function() {
      return f.a().toUpperCase()
    },
    B: function() {
      const off = (jsdate.getTimezoneOffset() + 60) * 60
      const theSeconds = jsdate.getHours() * 3600 + jsdate.getMinutes() * 60 + jsdate.getSeconds() + off
      let beat = Math.floor(theSeconds / 86.4)
      if (beat > 1000) beat -= 1000
      if (beat < 0) beat += 1000
      if (String(beat).length === 1) beat = '00' + beat
      if (String(beat).length === 2) beat = '0' + beat
      return beat
    },
    g: function() {
      return jsdate.getHours() % 12 || 12
    },
    G: function() {
      return jsdate.getHours()
    },
    h: function() {
      return pad(f.g(), 2)
    },
    H: function() {
      return pad(jsdate.getHours(), 2)
    },
    i: function() {
      return pad(jsdate.getMinutes(), 2)
    },
    s: function() {
      return pad(jsdate.getSeconds(), 2)
    },
    O: function() {
      let t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4)
      if (jsdate.getTimezoneOffset() > 0) t = '-' + t
      else t = '+' + t
      return t
    },
    P: function() {
      const O = f.O()
      return O.substr(0, 3) + ':' + O.substr(3, 2)
    },
    c: function() {
      return f.Y() + '-' + f.m() + '-' + f.d() + 'T' + f.h() + ':' + f.i() + ':' + f.s() + f.P()
    },
    U: function() {
      return Math.round(jsdate.getTime() / 1000)
    }
  }

  return format.replace(/[\\]?([a-zA-Z])/g, function(t, s) {
    let ret
    if (t !== s) {
      // escaped
      ret = s
    } else if (f[s]) {
      // a date function exists
      ret = f[s]()
    } else {
      // nothing special
      ret = s
    }
    return ret
  })
}

export function AaUpper(text) {
  let i = 0
  let t
  return text
      .toLowerCase()
      .split('')
      .map(function(o) {
        t = i === 0 ? o.toUpperCase() : o
        o === ' ' ? (i = 0) : i++
        return t
      })
      .join('')
}

export function isEmpty(v) {
  if (v === undefined || v === null || v === '' || v === false || v === 0 || v === '0' || v.length === 0 || (typeof v === 'number' && isNaN(v))) {
    return true
  }
  if (typeof v === 'object') {
    try {
      return Object.keys(v).length === 0
    } catch (e) {
      console.log(e)
    }
  }
  return false
}

export function isSpace(v) {
  if (v === undefined || v === null || v === '' || v === false || v.length === 0 || (typeof v === 'number' && isNaN(v))) {
    return true
  }
  if (typeof v === 'object') {
    try {
      return Object.keys(v).length === 0
    } catch (e) {
      console.log(e)
    }
  }
  return false
}

export function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

export function handleRouteTarget(vueRouter, target, isReplace = false, routeConfig = {}) {
  if (target.startsWith('http')) {
    location.href = target
    return
  }
  if (!(vueRouter instanceof VueRouter)) {
    throw new Error('vue router 参数错误')
  }
  const key = target.includes('/') || target.includes('\\') ? 'path' : 'name'
  const functionName = isReplace ? 'replace' : 'push'
  vueRouter[functionName](Object.assign({
    [key]: target
  }, routeConfig))
}

// 获取URL中的参数, 没有匹配返回 null
export function getUrlParam(n) {
  let reg = new RegExp('(^|&)' + n + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])

  return null
}

export function getParamFromUrlAndRoute(n, router) {
  let param = getUrlParam(n)
  if (isEmpty(param) && isEmpty(router)) {
    router = getGlobalVar('router')
  }
  if (isEmpty(param) && !isEmpty(router) && !isEmpty(router.currentRoute)) {
    if (router.currentRoute.query[n]) {
      param = router.currentRoute.query[n]
    }
  }
  return param
}

export function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime())
}

export function previewImage(images, index) {
  console.info(images, index)
  if (isEmpty(images)) {
    return
  }
  const isContainBase64Image = images.some(image => image.startsWith('data:image'))
  if (isContainBase64Image) {
    const image = images[index] ? images[index] : images[0]
    ImagePreview({
      images: [image],
      startPosition: 0,
    })
    return
  }
  wx.previewImage({
    current: images[index] ? images[index] : images[0],
    urls: images
  })
}

export function isWechatImageLocalId(localId) {
  return typeof localId === 'string' && (localId.toLowerCase().startsWith('weixin://resourceid/') || localId.toLowerCase().startsWith('wxlocalresource://'))
}
export function isWechatImageServerId(serverId) {
  return typeof serverId === 'string' && !serverId.startsWith('http') && serverId.length === 64
}
export function getWechatLocalImgData(localId) {
  return new Promise(resolve => {
    console.log('wx.getLocalImgData start', localId)
    wx.getLocalImgData({
      localId,
      success(res) {
        const image = res.localData.startsWith('data:') ? res.localData : 'data:image/jpeg;base64,' + res.localData
        console.log('wx.getLocalImgData success', image)
        resolve(image)
      },
      fail() {
        console.error('wx.getLocalImgData fail', arguments)
        resolve(localId)
      }
    })
  })
}

export function saveImageLocalIdServerIdCache(images) {
  console.log('saveImageLocalIdServerIdCache', images)
  const key = 'wechatImageLocalIdServerIdCache'
  let list
  try {
    const json = localStorage[key] ? localStorage[key] : '[]'
    list = JSON.parse(json)
    if (!Array.isArray(list)) {
      list = []
    }
  } catch (e) {
    list = []
  }

  const timestamp = new Date().getTime()
  list = list.filter(item => timestamp - item.timestamp < 86400000)
  images.forEach(image => {
    list.push({
      localId: image.localId,
      serverId: image.serverId,
      timestamp
    })
  })

  localStorage[key] = JSON.stringify(list)
}

export function downloadImageByServerId(serverIds) {
  serverIds = [...new Set(serverIds)]
  console.info('downloadImageByServerId start', serverIds)
  const timestamp = new Date().getTime()
  const key = 'wechatImageLocalIdServerIdCache'
  let localIdServerIdCacheList
  try {
    const json = localStorage[key] ? localStorage[key] : '[]'
    localIdServerIdCacheList = JSON.parse(json)
    if (!Array.isArray(localIdServerIdCacheList)) {
      localIdServerIdCacheList = []
    }
  } catch (e) {
    localIdServerIdCacheList = []
  }
  localIdServerIdCacheList = localIdServerIdCacheList.filter(item => timestamp - item.timestamp < 86400000)

  let resultMap = {}
  let promise = Promise.resolve()
  serverIds.forEach(serverId => {
    if (typeof serverId !== 'string' || serverId.length !== 64) {
      resultMap[serverId] = serverId
      return
    }
    const cache = localIdServerIdCacheList.find(item => item.serverId === serverId)
    if (cache) {
      resultMap[serverId] = cache.localId
      console.log('from cache', serverId, cache.localId)
      return
    }
    promise = promise.then(() => new Promise(resolve => {
      wx.downloadImage({
        serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (res) {
          console.info('wx.downloadImage success', serverId, res.localId, res)
          resultMap[serverId] = res.localId; // 返回图片下载后的本地ID
          localIdServerIdCacheList.push({
            localId: res.localId,
            serverId,
            timestamp
          })
          resolve()
        },
        fail: function () {
          console.error('wx.downloadImage fail', serverId, arguments)
          resultMap[serverId] = serverId
          resolve()
        }
      })
    }))
  })

  return promise
    .then(() => new Promise(async resolve => {
      localStorage[key] = JSON.stringify(localIdServerIdCacheList)
      if (isIOS()) {
        console.log('IOS 系统开始处理将localId转base64图片')
        for (let key in resultMap) {
          if (resultMap.hasOwnProperty(key) && isWechatImageLocalId(resultMap[key])) {
            resultMap[key] = await getWechatLocalImgData(resultMap[key])
          }
        }
      }
      resolve()
    }))
    .then(() => {
      console.info('downloadImageByServerId result', resultMap)
      return resultMap
    })
}

export function uploadVoice(voiceLocalId) {
  return new Promise((resolve, reject) => {
    wx.uploadVoice({
      localId: voiceLocalId,
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: (res) => {
        console.log('wx.uploadVoice', res)
        resolve(res.serverId)
      },
      error: (e) => {
        console.error(e)
        alert('上传音频文件失败')
        reject(voiceLocalId)
      },
    })
  })
}

export function isIOS() {
  const ua = navigator.userAgent
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || ua.includes('iPhone') || ua.includes('iPad') || ua.includes('Mac');
}

export function isWeixinBrowser() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') !== -1;
}

export function trim(str) {
  return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '')
}

// 解决苹果不回弹页面
export function blurAdjustIOSTextField() {
  if (isIOS()) {
    setTimeout(() => {
      const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
      window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100)
  }
}
