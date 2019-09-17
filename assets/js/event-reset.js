import { DOM } from '@flow-lang/framework'
// All this is necessary to be able to say "remove all event listeners of type
// x".
const _listeners = []

if (!window.addEventListenerBase) {
  window.addEventListenerBase = window.addEventListener
  window.addEventListener = function (type, listener) {
    _listeners.push({ type, listener })
    window.addEventListenerBase(type, listener)
  }
  window.removeEventListeners = function (targetType) {
    for (let index = 0; index !== _listeners.length; index++) {
      const item = _listeners[index]

      const listener = item.listener
      const type = item.type

      if (type === targetType) {
        window.removeEventListener(type, listener)
      }
    }
  }
}

export default () => {
  for (const event in DOM.Event.$events) {
    window.removeEventListeners(event)
  }
}
