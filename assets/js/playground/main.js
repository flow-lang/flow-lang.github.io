import { Program, DOM, Audio, Music } from '@flow-lang/framework'

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
    // Destroy the old app
    app = null

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
    message: 'Hello Flow!'
  }
}

// Update ----------------------------------------------------------------------
function update ({ action, payload }, model) {
  switch (action) {
    

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
  return (
    Element.div([], [ model.message ])
  )
}

// Listen ----------------------------------------------------------------------
function listen (model) {
  return [

  ]
}`