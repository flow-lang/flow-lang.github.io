<template>
  <div>
    <content-heading>Flow Playground</content-heading>

    <content-section>
      You can use the code editor at the bottom of the page to play around with
      the framework and test some ideas. Simply hit ctrl+enter to evaluate your
      code and your Flow app will appear just below.

      <content-notice colour="orange">
        For everything to work correctly, you must have: an init, update, audio,
        view, and listen function. You shouldn't set up the app yourself, however
        as this is done under the hood!
      </content-notice>

      <content-notice colour="green">
        You have access to all the core Flow libraries: Effect, DOM, Audio, and
        Music.
      </content-notice>
    </content-section>

    <content-section>
      <div @keypress.ctrl.enter="eval">
        <codemirror v-model="code" :options="cmOptions" />
      </div>
    </content-section>

    <content-section>
      <div id="flow" class="border-4 my-4 p-2 border-gray-900" />
    </content-section>

    <div class="{-typography text-right text-indigo-500 hover:text-indigo-800 -} {-spacing my-4 -}">
      <nuxt-link to="/guide/adding-interaction">Adding Interactiong</nuxt-link> »
    </div>
  </div>
</template>

<script>
  import * as FlowPlayground from '~/assets/js/playground/main.js'

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
      ContentNotice,
    },

    data () {
      return {
        code: FlowPlayground.template,
        cmOptions: {
          // codemirror options
          tabSize: 2,
          mode: 'text/javascript',
          theme: 'base16-dark',
          lineNumbers: true,
          line: true,
        }
      }
    },

    methods: {
      eval () {
        FlowPlayground.reset('#flow', this.code)
      }
    },

    mounted () {
      this.eval()
    }
  }
</script>

<style>
  .CodeMirror {
    height: 600px;
  }
</style>