<template>
  <div>
    <content-heading>Introduction</content-heading>

    <content-sub-heading>What is Flow?</content-sub-heading>
    <content-text>
      Flow is a complete front-end framework for developing interactive audio applications
      with the Web Audio API. It has been built from the ground up to provide a unified,
      declarative API for building both HTML interfaces and audio processing graphs.
    </content-text>
    <content-text>
      If you'd like to read a more technical overview of the framework, you can
      read our paper "A Model-View-Update Framework for Interactive Audio Web Applications".
    </content-text>
    <content-text>
      If you're an experienced Web Audio developer and are curious how Flow compares
      to other Web Audio libraries such as tone.js or the Web Audio API eXtension,
      check out the Comparison to Other Frameworks.
    </content-text>
    <content-notice colour="red">
      The follwing documentation assumes a familiarity with ES6 features such as
      arrow functions and object/array destructuring, as well as a basic understanding
      of functional javascript.
    </content-notice>
    <content-sub-heading>Declarative Programming</content-sub-heading>

    <content-text>
      The central idea behind declarative programming is adopting a style of programming
      that says what not how something should happen. Consider the simple scenario
      of creating an oscillator and setting some properties:
    </content-text>
    <content-code>
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const osc = audioContext.createOscillator()
      
      oscillator.type = "sine"
      oscillator.frequency.value = 440
      oscillator.connect(audioContext.destination)
      oscillator.start()
    </content-code>
    <content-text>
      The traditional approach is store a new oscillator node in some variable, then
      update that object's properties, and finally call the appropriate methods to
      connect the node to the audio output and start it. This is known as procedural
      programming where we take a step by step approach to computation.
    </content-text>
    <content-code>
      oscillator([ type("sine"), frequency(440) ], [
        dac()
      ])
    </content-code>
    <content-text>
      The declarative API provided by Flow allows you to focus on the most important
      parts of development; what you want to happen and the data you need for that.
      We don't have to worry about creating and managing an audio context, and we
      don't have to worry about variable names.
    </content-text>

    <content-sub-heading>Pure Functions</content-sub-heading>
    <content-text>
      Flow puts a heavy emphasis on writing pure code. Pure functions are like the
      functions you learn about in maths: same input equals same output, always.
      This makes our programs predictable and decidable.
    </content-text>
    <content-text>
      This goes hand in hand with declarative programming, because we're focused
      on what we want to happen rather thanhow we can let the runtime handle managing
      messy stateful actions like manipulating the DOM, scheduling audio events,
      and reacting to user input.
    </content-text>
    <content-text>
      Stateful actions become data that describe to the runtime how to do something.
      This is incredibly powerful; that data can be passed around, manipulated, o
      even shared with another program with ease.
    </content-text>

    <content-sub-heading>A Quick Example</content-sub-heading>
    <content-text>
      In the next section you'll learn about the Flow architecture and how update,
      audio, view, and listen come together to form a complete application, but for
      now here is a typical counter app with an audio twist.
    </content-text>
    <content-code>
      import { Program } from "flow"
      import { Element, Attribute, Event } from "flow/dom"
      import { Node, Property } from "flow/audio"

      const App = Program.instrument({
        init: _ => 1,
        update,
        audio,
        view,
        listen
      })

      function update ([ action ], model) {
        switch (action) {
          case "Increment":
            return model + 1
          case "Decrement":
            return model - 1
        }
      }

      function audio (model) {
        return Node.oscillator([ Property.frequency(440) ], [
          Node.gain([ Property.gain(model / 10) ], [
            Node.dac()
          ])
        ])
      }

      function view (model) {
        return Element.div([], [
          Element.button([ Attribute.className(".inc") ], [ "+" ]),
          Element.div([], [ model.toString() ]),
          Element.button([ Attribute.className(".dec") ], [ "-" ])
        ])
      }

      function listen (model) {
        return [
          Event.click(".inc", _ => [ "Increment" ]),
          Event.click(".dec", _ => [ "Decrement" ])
        ]
      }

      App.use(Event)
      App.start({ 
        content: new AudioContext(),
        root: document.querySelector("#app") 
      })
    </content-code>
    <content-text>
      Notice how each element is entirely decoupled. The runtime is in charge of
      slotting all these pieces together, so your application becomes a highly modular.
      It's now trivial to try different views or different audio graphs without
      wasting time hooking everything up.
    </content-text>

    <div class="{-typography text-right text-indigo-500 hover:text-indigo-800 -} {-spacing my-4 -}">
      <nuxt-link to="/the-flow-architecture" class>The Flow Architecture</nuxt-link>»
    </div>
  </div>
</template>

<script>
import ContentHeading from "~/components/content/ContentHeading";
import ContentSubHeading from "~/components/content/ContentSubHeading";
import ContentText from "~/components/content/ContentText";
import ContentCode from "~/components/content/ContentCode";
import ContentNotice from "~/components/content/ContentNotice";

export default {
  components: {
    ContentHeading,
    ContentSubHeading,
    ContentText,
    ContentCode,
    ContentNotice
  }
};
</script>