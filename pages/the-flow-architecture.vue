<template>
  <div>
    <content-heading>The Flow Architecture</content-heading>

    <content-sub-heading>Model-View-Update</content-sub-heading>
    <content-text>
      Understanding the Flow architecture is essential for writing excellent applications.
      At the heart of Flow is a Model-View-Update architecture that focuses on pure
      functions (functions without side effects) and a unidirectional data flow.
    </content-text>

    <img class="{-spacing mx-auto py-4 -}" src="~/assets/img/flow-architecture-simple.png"/>

    <content-text>
      Data flows in one direction in the MVU architecture. A Model is passed to our
      Views, the audio and view function. The output of these functions is passed to
      the runtime to render our HTML and Web Audio elements. The runtime then produces
      Actions which as passed into the updae function to create a new Model, and so
      the cycle continues.
    </content-text>

    <content-sub-heading>Model</content-sub-heading>
    <content-text>
      In Flow, the Model represents the entire state of an application. It can be 
      as complex or as simple as you need. For a simple counter application the 
      Model could just be a single number:
    </content-text>

    <content-code>
      const Model = 0
    </content-code>

    <content-sub-heading>View</content-sub-heading>
    <content-text>
      When talking about Views, we traditionally mean the part of our application 
      that is displayed to the user. Let's look at how we might display our model 
      to the user:
    </content-text>

    <content-code>
      import { div, button, text } from "flow/dom/element"
      import { className } from "flow/dom/attribute"

      const view = model => {
        return div([], [
          button([ className("inc") ], [ text("+") ]),
          text(model),
          button([ className("dec") ], [ text("-") ])
        ])
      }
    </content-code>

    <content-text>
      The view function takes the current model and returns some HTML. DOM elements 
      are created with function calls like div and button and all have a uniform 
      API. The first argument is an array of attributes like id or className, and 
      the second is an array of child elements.
    </content-text>

    <content-text>
      It's important to note that functions like div and button don't actually 
      create real HTML. Instead, they produce pure data that the runtime can use
      to construct the real thing when it needs to.
    </content-text>

    <content-sub-heading>Audio</content-sub-heading>
    <content-text>
      In Flow, we think the visual display is only half the story. Because both 
      the visual and audio elements of our application are created from the same 
      model, we think it's fair to say the audio output is just as much a "view" 
      into the model as the HTML.
    </content-text>

    <content-text>
      Fortunately, the way we create audio nodes in Flow is very similar to the 
      way we create HTML elements. Let's use the model to control the gain of an 
      oscillator:
    </content-text>

    <content-code>
      import { oscillator, gain, dac } from "flow/audio/node"
      import { gainAmount } from "flow/audio/property"

      const audio = model => {
        return oscillator([], [
          gain([ gainAmount(model / 10) ], [
            dac()
          ])
        ])
      }
    </content-code>

    <content-text>
      As with our HTML functions, these audio nodes are virtual representations 
      of the real thing.
    </content-text>

    <content-sub-heading>Update</content-sub-heading>
    <content-text>
      There is only one way to change the Model in a Flow application, and that 
      is through the aptly named update function. To update the Model in a 
      controlled and predictable manner, we tend to switch over actions: strings 
      that describe what to update.
    </content-text>

    <content-text>
      For our simple counter example, we might have two actions to "Increment" 
      and "Decrement" the counter:
    </content-text>

    <content-code>
      const update ([ action ], model) => {
        switch (action) {
          case "Increment":
            return [model + 1]

          case "Decrement":
            return [model - 1]
        }
      }
    </content-code>

    <div class="{-typography text-right text-indigo-500 hover:text-indigo-800 -} {-spacing my-4 -}">
      <nuxt-link to="/examples/00-polysynth">00-polysynth</nuxt-link> »
    </div>
  </div>
</template>

<script>
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
    }
  }
</script>