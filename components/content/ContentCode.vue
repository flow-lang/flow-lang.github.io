<template>
    <pre :class="preClass">
      <code><slot /></code>
    </pre>
</template>

<script>
  export default {
    data: () => ({
      preClass: '{-display overflow-x-scroll -} {-typography text-sm -} {-background bg-gray-200 -} {-border border-l-4 rounded-r-lg border-gray-600 -} {-sizing -} {-spacing mb-4 p-2 -}'
    })
  }
</script>