<template>
  <div class="card">
    <div class="b b1" />
    <div class="b b2" />
    <div class="b b3" />
    <div class="b b4" />

    <h4>{{ title }}</h4>
    <p><slot /></p>

    <div class="s s1" />
    <div class="s s2" />
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
  @apply bg-white p-9 rounded-lg relative w-1/2 lg:w-full;
}

h4 {
  @apply text-primary text-center text-2xl font-bold mb-5;
}

p { 
  @apply text-primary text-center leading-[30px];
}

.b {
  @apply absolute w-3 h-3 border-[3px] border-secondary rotate-45;
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
  @apply w-[75%] h-2 bg-primary absolute left-1/2 -translate-x-1/2;
}

.s1 {
  @apply top-0;
}

.s2 {
  @apply bottom-0;
}
</style>