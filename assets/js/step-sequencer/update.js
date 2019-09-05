// Update ----------------------------------------------------------------------
// Here we declare all of our actions. It's not strictly necessary to do this,
// but doing so allows us to take advantage of auto-completion and helps to
// prevent string-typing our application. 
// Typos and misspellings are common when working with raw strings!
// Sequencer Actions -----------------------------------------------------------
export const PLAY = 'play'
export const STOP = 'stop'
export const TICK = 'tick'
export const ADD_STEP = 'add-step'
export const RMV_STEP = 'rmv-step'
export const TGL_STEP = 'tgl-step'
export const RESET_STEPS = 'reset-steps'
// Synth Actions ---------------------------------------------------------------
export const MUTE_TOGGLE = 'mute-toggle'
export const CHANGE_WAVEFORM = 'change-waveform'
export const CHANGE_DELAY = 'change-delay'

export default function update ({ action, payload }, model) {
  // This is catches mistakes if you try and send the wrong sort of object to
  // the update function.
  if (!action) return model

  switch (action) {
    case PLAY: {
      const sequencer = { ...model.sequencer,
        running: true,
        // The sequencer will immediately tick to the next step after hitting
        // play so setting this to one lower now means we'll start the sequence
        // on the step we're currently on.
        // We also check if the sequencer is already running to prevent this
        // messing with the current step if you hit the play button multiple
        // times.
        step: model.sequencer.running 
          ? model.sequencer.step 
          : model.sequencer.step - 1
      }

      return { ...model, sequencer }
    }

    case STOP: {
      const sequencer = { ...model.sequencer, running: false }

      return { ...model, sequencer }
    }

    case TICK: {
      const { time } = payload
      const step = (model.sequencer.step + 1) % model.sequencer.stepCount
      const sequencer = { ...model.sequencer, step }

      return { ...model, currentTime: time, sequencer }
    }

    case ADD_STEP: {
      const stepCount = model.sequencer.stepCount + 1
      const rows = model.sequencer.rows.map(row => ({
        ...row, steps: [ ...row.steps, false ]
      }))
      const sequencer = { ...model.sequencer, rows, stepCount }

      return { ...model, sequencer }
    }

    case RMV_STEP: {
      // There must always be at least four step sin the sequencer.
      const stepCount = model.sequencer.stepCount > 4
        ? model.sequencer.stepCount - 1
        : model.sequencer.stepCount
      const rows = model.sequencer.rows.map(row => ({
        ...row, steps: row.steps.slice(0, stepCount)
      }))
      const sequencer = { ...model.sequencer, rows, stepCount }

      return { ...model, sequencer }
    }

    case TGL_STEP: {
      const { note, step } = payload
      const rows = model.sequencer.rows.map(row =>
        row.name == note
          ? { ...row, steps: row.steps.map((a, i) => step == i ? !a : a) }
          : row
      )
      const sequencer = { ...model.sequencer, rows }

      return { ...model, sequencer }
    }

    case RESET_STEPS: {
      const rows = model.sequencer.rows.map(row =>
        ({ ...row, steps: row.steps.map(() => false)})  
      )
      const sequencer = { ...model.sequencer, rows }

      return { ...model, sequencer }
    }

    case MUTE_TOGGLE: {
      return { ...model, synth: {
        ...model.synth, masterGain: model.synth.masterGain == 1 ? 0 : 1
      }}
    }

    case CHANGE_WAVEFORM: {
      const { type } = payload
      const synth = { ...model.synth, type }

      return { ...model, synth }
    }

    case CHANGE_DELAY: {
      const { time } = payload
      const synth = { ...model.synth, delayTime: time === 'long' ? 1 : 0.2 }

      return { ...model, synth }
    }

    // This should serve as a handy reminder in case we forget to catch an
    // action in this switch statement while also not crashing that app by just
    // returning the model unchanged.
    default: {
      console.warn(`Unhandled action: ${action}`)
      return model
    }
  }
}