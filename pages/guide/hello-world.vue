<template>
  <div>
    <content-heading>Hello World</content-heading>

    <div class="{-typography text-right text-indigo-500 hover:text-indigo-800 -} {-spacing my-4 -}">
      <nuxt-link to="/guide/adding-interaction">Adding Interactiong</nuxt-link> »
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