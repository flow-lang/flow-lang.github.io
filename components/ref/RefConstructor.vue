<template>
  <h2 class="{-typography text-gray-900 text-lg font-bold -} {-spacing pv-6 pt-2 -}">
    <slot/>
    <a :href="'#' + anchor" class="pl-2 text-sm">¶</a>
  </h2>
</template>

<script>

export default {
  props: [ 'anchor' ]
}
</script>