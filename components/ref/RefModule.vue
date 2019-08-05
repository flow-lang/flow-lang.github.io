<template>
  <h1 class="{-typography text-gray-900 text-xl font-mono -} {-spacing pt-6 pb-2 -}">
    <slot/>
    <a :href="'#' + anchor" class="pl-2 text-sm">¶</a>
    <hr class="border-b border-gray-400 mb-4">
  </h1>
</template>

<script>

export default {
  props: [ 'anchor' ]
}
</script>