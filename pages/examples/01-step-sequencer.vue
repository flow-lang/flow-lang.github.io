<template>
  <div>
    <content-heading>01-step-sequencer</content-heading>
    
    <content-section>
      <content-sub-heading></content-sub-heading>
      Here's a simple polysynth. You can use the top row of your keyboard to
      play some notes!

      <div id="flow" class="border-4 my-4 p-2 border-gray-900" />
    </content-section>

    <content-section>
      While we won't break down the whole app like we did with the polysynth
      example, below is the init function for this step sequencer. Notice how
      relatively simple the returned Model is; remember this is used to generate
      both the audio and the view for our step sequencer! 

      <content-code>
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
      </content-code>
    </content-section>

    <div class="{-typography text-right text-indigo-500 hover:text-indigo-800 -} {-spacing my-4 -}">
      <nuxt-link to="/guide/hello-world">Hello World</nuxt-link> »
    </div>
  </div>
</template>

<script>
  import FlowApp from '~/assets/js/step-sequencer/main'

  import ContentHeading from '~/components/content/ContentHeading'
  import ContentSubHeading from '~/components/content/ContentSubHeading'
  import ContentSection from '~/components/content/ContentSection'
  import ContentCode from '~/components/content/ContentCode'
  import ContentNotice from '~/components/content/ContentNotice'

  export default {
    components: {
      ContentHeading,
      ContentSubHeading,
      ContentSection,
      ContentCode,
      ContentNotice
    },

    mounted () {
      FlowApp.start('#flow')
    },

    beforeDestroy () {
      FlowApp.destroy()
    }
  }
</script>