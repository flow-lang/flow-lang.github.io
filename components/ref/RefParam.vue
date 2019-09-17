<template>
  <div class="{-spacing ml-4 pb-1 mb-2 border-b -}">
    <span class="{-typography text-black font-bold text-md font-mono -} {-background bg-gray-200 -} {-border border-l-4 border-gray-900 rounded-r -} {-spacing pl-6 pr-2 mr-2 -}">
      {{ param }}
    </span>

    <slot/>
  </div>
</template>

<script>
export default {
  props: [ 'param' ]
}
</script>