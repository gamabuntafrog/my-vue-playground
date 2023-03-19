<template>
  <button v-bind:type="type" :class="{default: variant === 'default'}">
    {{ text }}
    {{variant}}
  </button>
</template>

<script>
export default {
  name: 'ButtonTest',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    text: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style>

</style>