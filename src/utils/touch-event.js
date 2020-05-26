// addTouchDirectionEvent 的参数 params 接口
// export interface touchDirectionEventParams {
//   left?: Function
//   top?: Function
//   right?: Function
//   bottom?: Function
//   moving_left?: Function
//   moving_top?: Function
//   moving_right?: Function
//   moving_bottom?: Function
//   moving_throttle_delay?: number // touchmove事件中调用相关方法时使用节流函数时的延迟时间
//   preventMove?: boolean // 是否在touchmove事件中调用preventDefault. 如果子元素中有些自身带有滚动效果的, 需要加上class: scrollable
//   touchstart_option?: any
//   touchmove_option?: any
//   touchend_option?: any
// }
export function addTouchDirectionEvent(el, params) {
  let start_x = 0
  let start_y = 0
  let is_prevent_move = false
  let is_calc_in_touchmove = params.moving_left || params.moving_top || params.moving_right || params.moving_bottom // 是否在touchmove事件中计算滑动方向
  let is_calc_in_touchend = params.left || params.top || params.right || params.bottom // 是否在touchend事件中计算滑动方向
  let last_time_exec_touchmove_calc = 0
  params.moving_throttle_delay = params.moving_throttle_delay !== undefined  ? params.moving_throttle_delay : 10

  // 返回 0 left, 1 top, 2 right, 3 bottom
  // at_less 最少滑动at_less像素, 才会计算滑动方向, 小于at_less参数, 则不认为有滑动
  let calcDirection = (start_x, start_y, end_x, end_y, at_less) => {
    let distance_x = end_x - start_x
    let distance_y = end_y - start_y
    if (Math.abs(distance_x) > at_less) {
      return distance_x < 0 ? 0 : 2
    }
    if (Math.abs(distance_y) > at_less) {
      return distance_y < 0 ? 1 : 3
    }
  }

  let event_handle = {
    touchstart: (e) => {
      start_x = e.touches[0].pageX
      start_y = e.touches[0].pageY

      if (params.preventMove && Array.isArray(e.path)) {
        is_prevent_move = !e.path.some((el) => {
          return el && el.classList && el.classList.contains('scrollable')
        })
      }
    },
    touchmove: (e) => {
      if (is_prevent_move) {
        e.preventDefault()
      }

      if (!is_calc_in_touchmove) {
        return
      }

      let curr = new Date().getTime()
      if (curr - last_time_exec_touchmove_calc < params.moving_throttle_delay){
        return
      }
      last_time_exec_touchmove_calc = curr

      let end_x = e.changedTouches[0].pageX
      let end_y = e.changedTouches[0].pageY
      let direction = calcDirection(start_x, start_y, end_x, end_y, 50)

      if (direction === 0 && params.moving_left instanceof Function) { // left
        params.moving_left(e)
      }
      if (direction === 1 && params.moving_top instanceof Function) { // top
        params.moving_top(e)
      }
      if (direction === 2 && params.moving_right instanceof Function) { // right
        params.moving_right(e)
      }
      if (direction === 3 && params.moving_bottom instanceof Function) { // bottom
        params.moving_bottom(e)
      }
    },
    touchend: (e) => {
      if (!is_calc_in_touchend) {
        return
      }

      let end_x = e.changedTouches[0].pageX
      let end_y = e.changedTouches[0].pageY
      let direction = calcDirection(start_x, start_y, end_x, end_y, 50)

      if (direction === 0 && params.left instanceof Function) { // left
        params.left(e)
      }
      if (direction === 1 && params.top instanceof Function) { // top
        params.top(e)
      }
      if (direction === 2 && params.right instanceof Function) { // right
        params.right(e)
      }
      if (direction === 3 && params.bottom instanceof Function) { // bottom
        params.bottom(e)
      }
    }
  }
  el.addEventListener('touchstart', event_handle['touchstart'], params.touchstart_option)
  el.addEventListener('touchmove', event_handle['touchmove'], params.touchmove_option)
  el.addEventListener('touchend', event_handle['touchend'], params.touchend_option)
  return event_handle
}
export function removeTouchDirectionEvent(el, event_handle) {
  if (event_handle.touchstart !== undefined) {
    el.removeEventListener('touchstart', event_handle.touchstart)
    event_handle.touchstart = undefined
  }
  if (event_handle.touchmove !== undefined) {
    el.removeEventListener('touchmove', event_handle.touchmove)
    event_handle.touchmove = undefined
  }
  if (event_handle.touchend !== undefined) {
    el.removeEventListener('touchend', event_handle.touchend)
    event_handle.touchend = undefined
  }
}
