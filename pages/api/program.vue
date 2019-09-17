<template>
  <div>
    <content-heading>Program</content-heading>

    <!-- Program.instrument --------------------------------------------------->
    <content-section>
      <ref-module anchor="Program.instrument">
        Program.instrument
      </ref-module>

      An instrument program is a full Flow application with both and audio and
      visual element.

      <ref-constructor anchor="Program.instrument_Constructor">
        Constructor
      </ref-constructor>

      Constructs a new Flow instrument application.

      <content-code>
        const App = Program.instrument(init, update, audio, view, listen)
      </content-code>

      <ref-heading anchor="Program.instrument_Parameters">
        Parameters
      </ref-heading>

      <ref-param :param="'init'">
        
      </ref-param>

      <ref-param :param="'update'">
        hello
      </ref-param>

      <ref-param :param="'audio'">
        hello
      </ref-param>

      <ref-param :param="'view'">
        hello
      </ref-param>

      <ref-param :param="'listen'">
        hello
      </ref-param>

      <ref-heading anchor="Program.instrument_Methods">
        Methods
      </ref-heading>

      <ref-param :param="'start'">
        Starts the application. Nothing will render before calling this method.
        An object with three properties must be passed in; (1) a node property
        with a reference to the DOM node to mount to, (2) a context property
        with a reference to an AudioContext, and (3) a flags object which gets
        passed to the init method.

        <content-code>
          App.start({
            node: document.querySelector('#app'),
            context: new AudioContext(),
            flags: {
              foo: 'bar'
            }
          })
        </content-code>
      </ref-param>

      <ref-param :param="'use'">
        Register a plugin for the application to use. Any calls to the use method
        must be done before calling start.

        <content-code>
          App.use(DOM.Event)
        </content-code>
      </ref-param>

      <ref-param :param="'send'">
        Send an action to the runtime. Useful if you need to integrate some
        external javascript without making use of Flow's plugin system.

        <content-code>
          App.send({
            action: 'do-something ',
            payload: {
              hello: 'world'
            }
          })
        </content-code>
      </ref-param>

      <ref-heading anchor="Program.instrument_Example">
        Example
      </ref-heading>

      <content-code>
        const App = Program.instrument(init, update, audio, view, listen)

        App.use(DOM.Event)
        App.use(Audio.Event)

        App.start({
          node: document.querySelector('#app'),
          context: new AudioContext(),
          flags: {}
        })
      </content-code>
    </content-section>

    <!-- Program.worker ------------------------------------------------------->
    <content-section>
      <ref-module anchor="Program.worker">
        Program.worker
      </ref-module>


      <ref-constructor anchor="Program.worker_Constructor">
        Constructor
      </ref-constructor>

      <ref-heading anchor="Program.worker_Parameters">
        Parameters
      </ref-heading>

      <ref-heading anchor="Program.worker_Example">
        Example
      </ref-heading>
    </content-section>

    <div class="{-typography text-right text-indigo-500 hover:text-indigo-800 -} {-spacing my-4 -}">
      <nuxt-link to="/api/audio">API: Audio</nuxt-link> »
    </div>
  </div>
</template>

<script>
  import ContentHeading from '~/components/content/ContentHeading'
  import ContentSubHeading from '~/components/content/ContentSubHeading'
  import ContentSection from '~/components/content/ContentSection'
  import ContentCode from '~/components/content/ContentCode'
  import ContentNotice from '~/components/content/ContentNotice'

  import RefModule from '~/components/ref/RefModule'
  import RefConstructor from '~/components/ref/RefConstructor'
  import RefHeading from '~/components/ref/RefHeading'
  import RefParam from '~/components/ref/RefParam'

  export default {
    components: {
      ContentHeading,
      ContentSubHeading,
      ContentSection,
      ContentCode,
      ContentNotice,
      //
      RefModule,
      RefConstructor,
      RefHeading,
      RefParam
    }
  }
</script>