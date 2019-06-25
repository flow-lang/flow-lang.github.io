<template>
  <blockquote :class="blockquoteClass">
    <slot />
  </blockquote>
</template>

<script>
  export default {
    props: {
      colour: { type: String }
    },
    data () {
      return {
        blockquoteClass: `{-background bg-${this.colour}-100 -} {-border border-l-4 border-${this.colour}-500 -} {-spacing my-4 p-4 -}`
      }
    }
  }
</script>