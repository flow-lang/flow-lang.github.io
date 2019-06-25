<template>
  <div>
    <content-heading>The Flow Architecture</content-heading>

    <content-sub-heading>Model-View-Update</content-sub-heading>

    <div class="{-typography text-right text-indigo-500 hover:text-indigo-800 -} {-spacing my-4 -}">
      <nuxt-link to="/examples/00-polysynth">00-polysynth</nuxt-link> »
    </div>
  </div>
</template>

<script>
  import ContentHeading from '~/components/content/ContentHeading'
  import ContentSubHeading from '~/components/content/ContentSubHeading'
  import ContentText from '~/components/content/ContentText'
  import ContentCode from '~/components/content/ContentCode'
  import ContentNotice from '~/components/content/ContentNotice'

  export default {
    components: {
      ContentHeading,
      ContentSubHeading,
      ContentText,
      ContentCode,
      ContentNotice
    }
  }
</script>