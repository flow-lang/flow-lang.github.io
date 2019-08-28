// Init ------------------------------------------------------------------------
function init (flags) {
  return {

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
    Element.div([], [])
  )
}

// Listen ----------------------------------------------------------------------
function listen (model) {
  return [

  ]
}

// App -------------------------------------------------------------------------
const App = window.App = Program.instrument(init, update, audio, view, listen)

App.use(DOM.Event)
App.use(Audio.Event)

App.start({
  root: document.querySelector('#flow'),
  context: new AudioContext(),
  flags: {}
})