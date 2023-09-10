<template>
  <div class="card">
    <img :src="officer.thumb" :alt="officer.name" class="w-full h-full object-cover object-top rounded-3xl" />

    <div class="px-5 py-8 text-center">
      <h2 class="title-large font-semibold text-background dark:text-on-background">{{ officer.name }}</h2>
      <h3 class="title-medium font-medium text-background dark:text-on-background">{{ officer.position }}</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  officer: Officer
}>();
</script>

<style lang="scss" scoped>
.card {
  @apply bg-primary dark:bg-primary-container text-on-primary dark:text-on-background rounded-3xl relative shadow-xl;
}
</style>