<template>
  <div class="card">
    <p><slot /></p>

  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.card {
  @apply flex justify-center items-center bg-surface-container-high p-8 lg:p-14 rounded-[28px] relative shadow-xl;
}

h4 {
  @apply text-on-tertiary-container text-center text-2xl mb-5;
}

p { 
  @apply text-on-tertiary-container font-medium text-sm leading-7 lg:text-base text-center lg:leading-[30px];
}
</style>