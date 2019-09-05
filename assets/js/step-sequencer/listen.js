import { Action, DOM, Audio } from '@flow-lang/framework'
import {
  PLAY,             // Start the sequencer
  STOP,             // Stop the sequencer
  ADD_STEP,         // Add a step to the sequence
  RMV_STEP,         // Remove a step from the sequence
  RESET_STEPS,      // Clear all steps
  MUTE_TOGGLE,      // Mute/unmute the sequencer
  TGL_STEP,         // Turn a step on/off
  CHANGE_WAVEFORM,  // Change the synth waveform
  CHANGE_DELAY,     // Change the synth delay
  TICK              // Update the current time
} from './update'

export default function listen (model) {
  const listeners = [
    DOM.Event.click('#play', () => Action(PLAY)),
    DOM.Event.click('#stop', () => Action(STOP)),
    DOM.Event.click('#add-step', () => Action(ADD_STEP)),
    DOM.Event.click('#rmv-step', () => Action(RMV_STEP)),
    DOM.Event.click('#reset-steps', () => Action(RESET_STEPS)),
    DOM.Event.click('#mute-toggle', () => Action(MUTE_TOGGLE)),

    // This is an example of being a bit more clever with our css selectors. Here
    // we're using the attribute selector [] to select *any* elements that have
    // both the data-step and data-note attributes, regardless of their value.
    DOM.Event.click('[data-step][data-note]', ({ target }) => { 
      const { note, step } = target.dataset
      return Action(TGL_STEP, { note, step })
    }),

    // In each of these event handlers we're destructuring out the `target`
    // property. This is a reference to the DOM node that fired the event, and
    // we can access the values stored in any of the data-x attributes by
    // accessing `target.dataset`.
    DOM.Event.click('[data-waveform]', ({ target }) => {
      const { waveform } = target.dataset
      return Action(CHANGE_WAVEFORM, { type: waveform })
    }),


    DOM.Event.click('[data-delay]', ({ target }) => {
      const { delay } = target.dataset
      return Action(CHANGE_DELAY, { time: delay })
    })
  ]

  // We only need to listen for audio timing events when the sequencer is
  // actually running, so we can just conditionally push this listener when we
  // need to.
  if (model.sequencer.running) {
    listeners.push(
      // For now, audio events must be uniquely named. In this case we just call
      // it 'tick'. The next argument is the interval in *seconds* and finally
      // a callback to run that receives the current time.
      Audio.Event.every('tick', model.sequencer.stepInterval, time => 
        Action(TICK, { time })
      )
    )
  }

  return listeners
}