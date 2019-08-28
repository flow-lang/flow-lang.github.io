import { Program, DOM, Audio, Music } from '@flow-lang/framework'

// All this is necessary to be able to say "remove all event listeners of type
// x". 
const _listeners = [];
window.addEventListenerBase = window.addEventListener;
window.addEventListener = function (type, listener) {
  _listeners.push({ type, listener })
  window.addEventListenerBase(type, listener)
}
window.removeEventListeners = function (targetType) {
  for(let index = 0; index != _listeners.length; index++) {
    const item = _listeners[index];

    const listener = item.listener;
    const type = item.type

    if(type == targetType) {
      window.removeEventListener(type, listener);
    }
  }
}

let context = new AudioContext()
let root = null
let app = null

export function reset (selector, code) {
  const $flow__context = { DOM, Audio, Music }
  const contextualised =
    code.replace(/function (\w+)/g, '$flow__context.$1 = function $1') 
      .replace(/DOM/g, '$flow__context.DOM')
      .replace(/Audio/g, '$flow__context.Audio')
      .replace(/Music/g, '$flow__context.Music')

  eval(contextualised)

  const { init, update, audio, view, listen } = $flow__context
  if (init, update, audio, view, listen) {
    // Make double dip damn sure that all the event listeners are removed from
    // the window. There was a bug where listeners would continue firing after
    // the app was destroyed, and I can't work out why that is.
    if (app) {
      app.destroy()

      for (event in DOM.Event.$events) window.removeEventListeners(event)
    }

    // Close the audio context to stop anything from continuing to play
    context.close().then(() => {
      // Create a new one
      context = new AudioContext()
      root = document.querySelector(selector)
      // Create a new program
      app = Program.instrument(init, update, audio, view, listen)

      // Register both events plugins
      app.use(DOM.Event)
      app.use(Audio.Event)

      // Start it up!
      app.start({ context, root, flags: { debug: true } })
    })
  }
}

export const template = `// Init ------------------------------------------------------------------------
function init (flags) {
  return {
    count: 0
  }
}

// Update ----------------------------------------------------------------------
const Increment = 0
const Decrement = 1

function update ({ action, payload }, model) {
  switch (action) {
    case Increment: return { ...model, count: model.count + 1 }
    case Decrement: return { ...model, count: model.count - 1 }

    default: {
      return [ model, null ]
    }
  }
}

// Audio -----------------------------------------------------------------------
const { Node, Property } = Audio

function audio (model) {
  return [

  ]
}

// View ------------------------------------------------------------------------
const { Element, Attribute } = DOM

function view (model) {
  console.log(model)

  return (
    Element.div([], [
      Element.button([ Attribute.id('inc') ], [ '+' ]),
      model.count.toString(),
      Element.button([ Attribute.id('dec') ], [ '-' ]),
    ])
  )
}

// Listen ----------------------------------------------------------------------
function listen (model) {
  return [
    DOM.Event.click('#inc', () => ({ action: Increment })),
    DOM.Event.click('#dec', () => ({ action: Decrement })),
  ]
}`