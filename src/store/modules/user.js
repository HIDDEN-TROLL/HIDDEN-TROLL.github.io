import { setToken, removeToken, parseToken } from '@/utils/auth'
import { param2Obj, param, isWeixinBrowser } from '@/utils'
import request from '@/utils/request'
import { ROLE_TYPE_LIST } from '@/utils/constant'

// let token
// let tokenParams
// let roleType
// const params = param2Obj(location.href)
// if (params.token) {
//   token = params.token
//   setToken(token)
// } else {
//   token = getToken()
// }
// token = handleToken(token)
// tokenParams = parseToken(token)
// if (tokenParams) {
//   commit('UPDATE_ROLE_TYPE', parseInt(tokenParams['rt']))
// }

function handleToken(token) {
  if (typeof token !== 'string') {
    return token
  }
  if (!token.startsWith('Bearer ')) {
    if (token.toLowerCase().startsWith('bearer ')) {
      token = token.slice(7)
    }
    token = 'Bearer ' + token
  }

  return token
}

const user = {
  state: {
    token: '',
    roleType: undefined, // 家长30, 教师41, 校长42, 代理50, 品牌60, 新师路角色99
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      console.info('SET_TOKEN')
      token = handleToken(token)
      state.token = token
      setToken(token)
    },
    REMOVE_TOKEN: (state) => {
      state.token = ''
      removeToken()
    },

    // 设置当前登录的是哪个用户端
    UPDATE_ROLE_TYPE(state, roleType) {
      console.info('UPDATE_ROLE_TYPE', roleType)
      if (ROLE_TYPE_LIST.includes(roleType)) {
        state.roleType = roleType
      } else {
        console.error('无效的 role type ', roleType)
      }
    },
  },

  actions: {
    SetToken({ commit, state }, token) {
      commit('SET_TOKEN', token)
      const tokenParams = parseToken(state.token)
      if (tokenParams) {
        commit('UPDATE_ROLE_TYPE', parseInt(tokenParams['rt']))
      }
    },
    Login({ state, commit }) {
      commit('REMOVE_TOKEN')

      console.log('跳转页面进行微信授权重新登录', location.search)

      const params = param2Obj(location.search)
      const data = {
        redirect: location.href,
      }
      if (params['i']) {
        data['i'] = params['i']
      }
      if (params['s']) {
        data['s'] = params['s']
      }
      if (state.roleType) {
        data['rt'] = state.roleType
      } else {
        data['rt_uncertainty'] = 1 // 这个参数可有可无, 表示rt参数是猜的
        const list = [
          [30, 'Parent'],
          [41, 'Teacher'],
          [42, 'School'],
          [50, 'Agent'],
          [60, 'Brand'],
          [99, 'NewConcept'],
        ]
        let path = location.hash
        for (let [rt, prefix] of list) {
          if (path.startsWith(prefix) || path.startsWith('/' + prefix) || path.startsWith('#/' + prefix)) {
            data['rt'] = rt
            break
          }
        }
      }
      /*if (!IS_PRODUCTION_ENV) {
        request('/api/login?username=yuann72&password=123456')
      }*/
      if (isWeixinBrowser()) {
        location.href = '/api/login?' + param(data)
        return
      } else {
        alert('需要在微信浏览器中打开')
        // location.href = '/api/login/qrcode?' + param(data)
      }

      if (!IS_PRODUCTION_ENV) {
        request('/api/login?username=15555555557&password=123456')
          .finally(() => {
            const r = confirm('刚刚收到一个HTTP401错误, 可能token过期还是什么原因, 现在已经调用测试接口重新获取了新的token, 需要刷新页面来重新获取数据, 点确定则自动刷新页面')
            r && location.reload()
          })
      }
    },
  },
}

export default user
