<template>
  <!-- Message Card -->
  <div class="profile">
    <img :src="image" :alt="name" />
  </div>
  <div class="outer relative">
    <div class="inner w-full">
      <h2 class="text-center">{{ name }}</h2>
      <h5 class="text-center pb-4 sm:pb-8">{{ position }}</h5>
      <div class="text-sm leading-6 text-justify message">
        <p v-for="(p, i) in message" :key="i">
          <div v-if="Array.isArray(p)" class="closing">
            <p v-for="(c, j) in p" :key="j">{{ c }}</p>
          </div>
          <span v-else>{{ p }}</span>
        </p>
      </div>
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
  @apply w-[200px] h-[200px] absolute overflow-hidden rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[8px] z-[500] border-white/50;
}

h2 {
  @apply text-xl font-bold mt-12 mb-1.5 text-primary-dark-10;
}

h5 {
  @apply text-sm mb-3 text-neutral-700;
}

p {
  @apply text-sm leading-6 sm:text-base sm:leading-7;
  font-family: Arial, Helvetica, sans-serif;
}

.message > p {
  @apply text-justify;
}

.closing p {
  @apply mb-0 italic;
}

.outer {
  @apply mx-4 w-full md:w-3/4 lg:w-4/5 xl:w-2/3 2xl:w-3/4 3xl:w-1/2 flex flex-col items-center p-[6px] rounded-[32px] bg-white/50;
}

.inner {
  @apply rounded-[32px] p-6 pt-14 sm:p-14 bg-white/95;
}

p {
  @apply mb-3;
}
</style>