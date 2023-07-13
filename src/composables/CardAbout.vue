<template>
  <div class="card">
    <h4>{{ title }}</h4>
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
  @apply bg-tertiary-95 dark:bg-tertiary dark:border-2 border-outline p-8 lg:p-14 rounded-[28px] relative shadow-xl;
}

h4 {
  @apply text-tertiary-20 dark:text-on-tertiary text-center text-2xl font-bold mb-5;
}

p { 
  @apply text-tertiary-30 dark:text-on-tertiary font-medium text-sm leading-7 lg:text-base text-center lg:leading-[30px];
}

.b {
  @apply absolute w-3 h-3 border-[3px] border-csps-secondary rotate-45;
}

.b1 {
  @apply top-0 left-0 -translate-x-1/2 -translate-y-1/2;
}

.b2 {
  @apply top-0 right-0 translate-x-1/2 -translate-y-1/2;
}

.b3 {
  @apply bottom-0 left-0 -translate-x-1/2 translate-y-1/2;
}

.b4 {
  @apply bottom-0 right-0 translate-x-1/2 translate-y-1/2;
}

.s {
  @apply w-[75%] h-2 bg-tertiary absolute left-1/2 -translate-x-1/2;
}

.s1 {
  @apply top-0;
}

.s2 {
  @apply bottom-0;
}
</style>