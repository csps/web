<template>
  <!-- Message Card -->
  <div class="message-card">
    <!-- Image -->
    <img :src="image" :alt="name" class="w-40 h-40 mb-4" />
    <!-- Name -->
    <h4>{{ name }}</h4>
    <!-- Postiion -->
    <h5>{{ position }}</h5>
    <!-- Message -->
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  image: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
img {
  @apply pointer-events-none text-red-500 rounded-full;
}

h4 {
  @apply font-bold text-primary text-xl mb-1;
}

h5 {
  @apply text-xs text-tertiary font-medium mb-5;
}

p {
  @apply text-justify;
  font-family: Arial, Helvetica, sans-serif;
}

.message-card {
  @apply bg-white mx-4 w-full md:w-3/4 lg:w-3/5 xl:w-1/2 2xl:w-2/5 3xl:w-1/3 flex flex-col items-center p-10 rounded-[32px];
}
</style>