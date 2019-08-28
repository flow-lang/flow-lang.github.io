import { Program, DOM, Audio, Music } from '@flow-lang/framework'
import eventReset from '~/assets/js/event-reset'

let App

// Init ------------------------------------------------------------------------
function init (flags) {
  const note = (key, name) => ({
    key, 
    freq: Music.Note.ntof(name),
    on: false
  })

  return {
    notes: [
      note('q', 'A3'),
      note('w', 'C4'),
      note('e', 'D4'),
      note('r', 'E4'),
      note('t', 'G4'),
      note('y', 'A4'),
      note('u', 'C5'),
      note('i', 'D5'),
      note('o', 'E5'),
      note('p', 'G5'),
    ]
  }
}

// Update ----------------------------------------------------------------------
const NoteOn  = 'note-on'
const NoteOff = 'note-off'

function update ({ action, payload }, model) {
  switch (action) {
    case NoteOn: {
      const { key } = payload
      const notes = model.notes.map(note => note.key === key
        ? { ...note, on: true }
        : { ...note }
      )

      return [{ ...model, notes },
        null
      ]
    }

    case NoteOff: {
      const { key } = payload
      const notes = model.notes.map(note => note.key === key
        ? { ...note, on: false }
        : { ...note }
      )

      return [{ ...model, notes },
        null
      ]
    }
  }
}

// Audio -----------------------------------------------------------------------
const { Node, Property } = Audio
const voice = ({ on, freq }) => {
  const vol   = Property.gain(on ? 0.1 : 0)
  const pitch = Property.frequency(freq)

  return (
    Node.oscillator([ pitch ], [
      Node.gain([ vol ], [
        Node.dac()
      ])
    ])
  )
}

function audio (model) {
  return model.notes.map(voice)
}

// View ------------------------------------------------------------------------
const { Element, Attribute } = DOM
const note = ({ key, freq, on }) => {
  const classes = `
    flex-1 text-center p-2 m-2 text-${on ? 'indigo-700' : 'gray-400'}
    border border-${on ? 'indigo-700' : 'gray-400'}
  `

  return (
    Element.div([ Attribute.className(classes) ], [
      Element.p([], [ key ]),
      Element.p([], [ Music.Note.fton(freq) ])
    ])
  )
}

function view (model) {
  return (
    Element.div([ Attribute.className('flex') ],
      model.notes.map(note)
    )
  )
}

// Listen ----------------------------------------------------------------------
const onKeyPress = action => e => ({
  action,
  payload: { key: e.key.toLowerCase() }
})

function listen (model) {
  return [
    DOM.Event.keydown('window', onKeyPress(NoteOn)),
    DOM.Event.keyup('window', onKeyPress(NoteOff))
  ]
}

// App -------------------------------------------------------------------------
export default {
  start (selector) {
    App = Program.instrument(
      init, update, audio, view, listen
    )
    
    App.use(DOM.Event)
    App.use(Audio.Event)

    App.start({
      root: document.querySelector( selector ),
      context: new AudioContext(),
      flags: {}
    })
  },

  destroy () {
    App.destroy()
    eventReset()
  }
}