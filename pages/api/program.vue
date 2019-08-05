<template>
  <div>
    <content-heading>Program</content-heading>

    <!-- Program.instrument --------------------------------------------------->
    <ref-module anchor="Program.instrument">
      Program.instrument
    </ref-module>

    <ref-constructor anchor="Program.instrument_Constructor">
      Constructor
    </ref-constructor>

    <ref-heading anchor="Program.instrument_Parameters">
      Parameters
    </ref-heading>

    <ref-heading anchor="Program.instrument_Methods">
      Methods
    </ref-heading>

    <ref-heading anchor="Program.instrument_Example">
      Example
    </ref-heading>

    <!-- Program.worker ------------------------------------------------------->
    <ref-module anchor="Program.worker">
      Program.worker
    </ref-module>

    <ref-constructor anchor="Program.worker_Constructor">
      Constructor
    </ref-constructor>

    <ref-heading anchor="Program.worker_Parameters">
      Parameters
    </ref-heading>

    <ref-heading anchor="Program.worker_Methods">
      Methods
    </ref-heading>

    <ref-heading anchor="Program.worker_Example">
      Example
    </ref-heading>

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
      RefHeading
    }
  }
</script>