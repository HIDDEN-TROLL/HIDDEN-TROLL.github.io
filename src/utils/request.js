import axios from 'axios'
import { Notify } from 'vant'
import store from '@/store'
import { param2Obj, isEmpty } from '@/utils'

const baseURL = '/'

const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 45000 // request timeout
})

export default service

// 拦截JWT TOKEN
service.interceptors.response.use(
  response => {
    if (response.headers.authorization) {
      let authorization = response.headers.authorization
      if (authorization.startsWith('Bearer ') || authorization.startsWith('bearer ')) {
        store.dispatch('SetToken', authorization)
      }
    }

    if (response.data && response.data.meta && response.data.meta.success === false) {
      return Promise.reject(response)
    }

    return response
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    // 如果是某个请求被业务代码, 取消掉导致的错误, 则不处理, 直接将错误返回给业务代码
    if (axios.isCancel(error)) {
      console.info('Axios 拦截器, 取消请求导致的错误')
      return Promise.reject(error)
    }

    // 401 错误, 重新登录获取token
    if (error.response && error.response.status === 401) {
      store.dispatch('Login')
    }

    let errMsg = getErrorMessage(error)
    console.error('Axios 拦截器', error, errMsg)
    if (errMsg !== false) {
      if (errMsg === '' || errMsg === null || errMsg === undefined) {
        errMsg = '获取数据时发生了未知错误'
      }
      Notify({
        message: errMsg,
        background: '#ff4444',
        duration: 5000
      })
    }
    return Promise.reject(error)
  }
)

service.interceptors.request.use(
  config => {
    // 微信浏览器如果请求超过10秒未响应, 会重复发送请求, 增加这个参数用于取消重复发送请求
    if (isEmpty(param2Obj(config.url))) {
      config.url += '?connect_redirect=1'
    } else {
      config.url += '&connect_redirect=1'
    }

    const params = param2Obj(location.href)
    if (params['i']) {
      config.headers['X-INFO-I'] = params['i']
    }
    if (params['s']) {
      config.headers['X-INFO-S'] = params['s']
    }

    if (store.getters.token) {
      config.headers['Authorization'] = store.getters.token
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

function getErrorMessage(error) {
  let message
  if (error && error.data && error.data.meta) {
    message = error.data.meta.message
  } else if (error && error.response && error.response.data && error.response.data.meta) {
    message = error.response.data.meta.message
  } else {
    message = error.message
  }
  // FIXME 待优化
  if (error && error.response && error.response.status === 401 && message.includes('未提供 Token')) {
    message = false
  }
  return message
}

function getResponseDataMeta(obj) {
  let meta
  if (obj && obj.data && obj.data.meta) {
    meta = obj.data.meta
  } else if (obj && obj.response && obj.response.data && obj.response.data.meta) {
    meta = obj.response.data.meta
  }
  return isEmpty(meta) ? {} : meta
}


// 处理重定向需求
service.interceptors.response.use(
  response => {
    const meta = getResponseDataMeta(response)
    if (meta.code === 302 && !isEmpty(meta.target)) {
      location.href = meta.target
    }
    return response
  },
  error => {
    const meta = getResponseDataMeta(error)
    if (meta.code === 302 && !isEmpty(meta.target)) {
      location.href = meta.target
    }
    return Promise.reject(error)
  }
)
