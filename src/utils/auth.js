// import Cookies from 'js-cookie'
import { isEmpty } from '@/utils'

const TokenKey = 'token'

export function getToken() {
  let token = window.localStorage.getItem(TokenKey)
  if (isEmpty(token)) {
    // token = Cookies.get(TokenKey)
  }
  return token
}

export function setToken(token) {
  window.localStorage.setItem(TokenKey, token)
  // Cookies.set(TokenKey, token)
}

export function removeToken() {
  window.localStorage.removeItem(TokenKey)
  // Cookies.remove(TokenKey)
}

export function parseToken(token) {
  if (!token) {
    token = getToken()
  }
  if (!token) {
    return
  }
  const split = token.split('.')
  if (split[1]) {
    return JSON.parse(atob(split[1]))
  }
}
