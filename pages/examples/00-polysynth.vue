<template>
  <div>
    <content-heading>00-polysynth</content-heading>

    <content-section>
      <content-sub-heading></content-sub-heading>
      Here's a simple polysynth. You can use the top row of your keyboard to
      play some notes!

      <div id="flow" class="border-4 my-4 p-2 border-gray-900" />
    </content-section>

    <content-section>
      The code for this is easy to break down. First we define a function to
      create a note object to keep track of what key is pressed and what pitch
      that key corresponds to:

      <content-code>
        const note = (key, name) => ({
          key, 
          freq: Music.Note.ntof(name),
          on: false
        })
      </content-code>

      We're using the ntof function in Flow's Music.Note package to convert note
      names like 'A4' to frequencies like 440.
    </content-section>

    <content-section>
      Then we can populate our model with an array of notes corresponding to the
      top row of the keyboard. This inital model will get generated when we first
      start the application:

      <content-code>
        function init (flags) {
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
      </content-code>
    </content-section>

    <content-section>
      We'll define two Actions for NoteOn and NoteOff events:

      <content-code>
        const NoteOn  = 'note-on'
        const NoteOff = 'note-off'
      </content-code>

      When dispatching those actions we'll also send along a payload with the
      current key being pressed. Using that we can simply map over the notes
      array and toggle a note on or off when appropriate:

      <content-code>
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
      </content-code>

      You'll note that we use the spread operatoe when returning the new model.
      This isn't strictly necessary as we only have one field right now, but
      doing this makes it easier to add new fields to the model at a later date.
    </content-section>

    <content-section>
      We also return the model in an array with null as the second element. This
      indicates to the runtime that there are no Effects to run. It's good
      practice to do this for clarity.
    </content-section>

    <content-section>
      For each note we're going to create a separate voice of our synth, this
      is how we'll get polyphony.

      <content-code>
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
      </content-code>

      If Flow's declarative audio API is doing its job properly, the above
      snippet should be fairly self explanatory. For each note we create an
      oscillator, connect it to a gain node, and then connect that to the
      output. 
    </content-section>

    <content-section>
      We the voice function defined, our audio function is a dead simple
      one-liner:

      <content-code>
        function audio (model) {
          return model.notes.map(voice)
        }
      </content-code>

      Easy!
    </content-section>

    <content-section>
      We can do the same thing for our view. We'll have a function that takes
      a note and uses the `on` property to toggle some different CSS classes:

      <content-code>
        const keyView = ({ key, freq, on }) => {
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
      </content-code>

      You can see we're using the fton function to convert the frequency back
      to a note name. The Music.Note library comes with a bunch of functions to
      convert to and from different types.
    </content-section>

    <content-section>
      And just like the audio function, our view function is super simple. We
      just need to wrap our rendered notes in a div and away we go:

      <content-code>
        function view (model) {
          return (
            Element.div([ Attribute.className('flex border-4 my-4 p-2 border-gray-900') ],
              model.notes.map(keyView)
            )
          )
        }
      </content-code>
    </content-section>

    <div class="{-typography text-right text-indigo-500 hover:text-indigo-800 -} {-spacing my-4 -}">
      <nuxt-link to="/examples/01-step-sequencer">01-step-sequencer</nuxt-link> »
    </div>
  </div>
</template>

<script>
  import FlowApp from '~/assets/js/polysynth/main'

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