import $store from '@/store'
import { isEmpty } from './index'

export default function (module) {
  const name = module.name
  if (isEmpty(name)) {
    throw new Error('vuex 模块的 name 属性为空')
  }
  if (!$store.state[name]) {
    $store.registerModule(name, module)
  }
}
