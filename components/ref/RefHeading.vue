<template>
  <h3 class="{-spacing mt-8 mb-4 -}">
    <span class="{-typography text-white text-md font-mono -} {-background bg-gray-800 -} {-border border-l-4 border-gray-900 rounded-r -} {-spacing pl-6 pr-2 -}">
      <slot/>
    </span>
    <a :href="'#' + anchor" class="pl-2 text-sm">¶</a>
  </h3>
</template>

<script>

export default {
  props: [ 'anchor' ]
}
</script>