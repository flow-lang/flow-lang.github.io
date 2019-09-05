import { Node as N, Keyed as K, Property as P } from '@flow-lang/framework/dist/audio'

const { biquadFilter, dac, gain, oscillator, ref } = N
// Rename P.gain to vol to avoid name clashes with the gain node
const { delayTime, frequency, gain: vol, linearRampToValueAtTime, type } = P

// Audio -----------------------------------------------------------------------
export default function audio ({ currentTime, sequencer, synth }) {
  return [
    K.delay('delay', [ delayTime(synth.delayTime) ], [
      gain([ vol(synth.delayAmount) ], [
        biquadFilter([ type('lowpass'), frequency(400) ], [
          ref('delay'),
          ref('master')
        ])
      ])
    ]),

    K.gain('master', [ vol(synth.masterGain) ], [
      dac()
    ]),

    // Spread all the created synth voices into this array
    ...sequencer.rows.map(voice(currentTime, sequencer.step, synth))
  ]
}

const voice = (currentTime, step, synth) => ({ note, steps }) => {
  const { attack, decay, type: waveform } = synth
  
  const amp = steps[step] ? 0.2 : 0
  const atk = linearRampToValueAtTime(vol(amp), currentTime + attack)
  const dcy = linearRampToValueAtTime(vol(0), currentTime + attack + decay)
  
  return oscillator([ frequency(note), type(waveform) ], [
    gain([ atk, dcy ], [
      ref('delay'),
      ref('master'),
    ]),
  ])
}