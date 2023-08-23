<template>
  <!-- Message Card -->
  <div class="profile">
    <img :src="image" :alt="name" />
  </div>
  <div class="card w-full">
    <h2 class="text-center">{{ name }}</h2>
    <h5 class="text-center pb-4 sm:pb-8">{{ position }}</h5>
    <div class="text-justify message">
      <p v-for="(p, i) in message" :key="i">
        <div v-if="Array.isArray(p)" class="closing">
          <p v-for="(c, j) in p" :key="j">{{ c }}</p>
        </div>
        <span v-else>{{ p }}</span>
      </p>
    </div>
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
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.profile {
  @apply w-[200px] h-[200px] absolute overflow-hidden rounded-full top-28 left-1/2
    -translate-x-1/2 -translate-y-1/2 border-[6px] z-[500] border-surface-container;
}

h2 {
  @apply text-xl font-bold mt-12 mb-1.5 text-on-surface-variant;
}

h5 {
  @apply text-xs sm:text-sm mb-3;
}

.message {
  @apply text-sm leading-6 md:leading-7;
  font-family: Roboto;
}

.message > p {
  @apply text-justify;
}

.closing p {
  @apply mb-0 italic;
}

.card {
  @apply rounded-[32px] p-6 pt-14 sm:p-6 md:p-10 mx-4 w-full bg-surface text-on-surface
    border-surface-container md:w-3/4 lg:w-4/5 xl:w-2/3 2xl:w-3/4 3xl:w-2/3 flex
    flex-col items-center border-[6px];
}

p {
  @apply mb-3;
}
</style>