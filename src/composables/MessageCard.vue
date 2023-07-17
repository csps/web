<template>
  <!-- Message Card -->
  <div class="profile">
    <img :src="image" :alt="name" />
  </div>
  <div class="outer relative">
    <div class="inner w-full">
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
  @apply w-[200px] h-[200px] absolute overflow-hidden rounded-full top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[8px] z-[500] border-white/50 dark:border-neutral-100/10;
}

h2 {
  @apply text-xl font-bold mt-12 mb-1.5 text-primary-30 dark:text-on-surface-variant;
}

h5 {
  @apply text-xs sm:text-sm mb-3 text-neutral-700 dark:text-neutral-90;
}

p {
  font-family: Arial, Helvetica, sans-serif;
}

.message {
  @apply text-sm tracking-[0.1px] sm:text-base;
}

.message > p {
  @apply text-justify;
}

.closing p {
  @apply mb-0 italic;
}

.outer {
  @apply mx-4 w-full md:w-3/4 lg:w-4/5 xl:w-2/3 2xl:w-3/4 3xl:w-1/2 flex flex-col items-center p-[6px] rounded-[32px] bg-white/50 dark:bg-neutral-100/10;
}

.inner {
  @apply rounded-[32px] p-6 pt-14 sm:p-14 bg-surface text-on-surface dark:text-on-surface-variant;
}

p {
  @apply mb-3;
}
</style>