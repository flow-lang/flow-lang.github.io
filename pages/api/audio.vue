<template>
  <div>
    <content-heading>Audio</content-heading>

    <!-- Audio.Node --------------------------------------------------->
    <ref-module anchor="Audio.Node">
      Audio.Node
    </ref-module>

    <ref-constructor anchor="Audio.Node_node">
      Generic Node
    </ref-constructor>

    <ref-heading anchor="Audio.Node_node_Parameters">
      Parameters
    </ref-heading>

    <ref-constructor anchor="Audio.Node_keyed">
      Keyed Node
    </ref-constructor>

    <ref-heading anchor="Audio.Node_keyed_Parameters">
      Parameters
    </ref-heading>


    <div class="{-typography text-right text-indigo-500 hover:text-indigo-800 -} {-spacing my-4 -}">
      <nuxt-link to="/api/dom">API: DOM</nuxt-link> »
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