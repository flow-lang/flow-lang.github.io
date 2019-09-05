import { Program, Audio, DOM, Music } from '@flow-lang/framework'
import eventReset from '~/assets/js/event-reset'

import update from './update'
import audio from './audio'
import view from './view'
import listen from './listen'

// Init ------------------------------------------------------------------------
function init () {
  const row = (note, name, length) => ({ note, name, steps: Array(length).fill(false) })

  const numSteps = 8
  const notes = [ 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4' ] 
  const bpm = 150

  return {
    currentTime: 0,
    sequencer: {
      rows: notes.map(note => row(Music.Note.ntof(note), note, numSteps)),
      running: false,
      step: 0,
      stepCount: numSteps,
      stepInterval: Music.Time.sec(bpm, Music.Time.Eighth),
      tempo: bpm,
    },
    synth: {
      attack: 0,
      decay: 0.2,
      type: 'sine',
      delayTime: 1,
      delayAmount: 0.2,
      masterGain: 0
    },
  }
}

// App -------------------------------------------------------------------------
let App

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