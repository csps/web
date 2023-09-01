<template>
  <div class="card">
    <md-ripple />
    <p><slot /></p>

  </div>
</template>

<script lang="ts" setup>
import "@material/web/ripple/ripple";

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.card {
  @apply flex justify-center items-center bg-surface-container-high p-8 lg:p-14 rounded-3xl relative shadow-xl;
}

h4 {
  @apply text-on-tertiary-container text-center text-2xl mb-5;
}

p { 
  @apply text-on-tertiary-container font-medium text-sm leading-7 lg:text-base text-center lg:leading-[30px];
}
</style>