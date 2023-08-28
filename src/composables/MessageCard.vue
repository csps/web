<template>
  <!-- Message Card -->
  <div class="profile">
    <img :src="image" :alt="name" />
  </div>
  <div class="card w-full">
    <h2 class="text-center">{{ name }}</h2>
    <h5 class="text-center">{{ position }}</h5>
    <div class="text-justify message">
      <p v-for="(p, i) in message" :key="i">
        <div v-if="Array.isArray(p)" class="closing">
          <p v-for="(c, j) in p" :key="j">{{ c }}</p>
        </div>
        <span class="paragraph" v-else>{{ p }}</span>
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
  @apply w-[175px] h-[175px] absolute overflow-hidden rounded-full top-28 left-1/2
    -translate-x-1/2 -translate-y-1/2 border-[6px] z-[500] border-surface-container;
}

h2 {
  @apply text-xl font-semibold mt-14 mb-1.5 text-on-surface-variant;
}

h5 {
  @apply text-xs sm:text-sm mb-3;
}

.message {
  @apply text-sm leading-6;
  font-family: Roboto;
}

.message > p {
  @apply text-justify;
}

.paragraph {
  @apply first-letter:text-xl;
}

.closing p {
  @apply mb-0 italic;
}

.card {
  @apply rounded-[32px] p-6 pt-14 sm:p-6 md:p-10 mx-4 w-full bg-surface text-on-surface
    border-surface-container md:w-3/4 lg:w-4/5 xl:w-2/3 2xl:w-3/4 3xl:w-2/3 flex
    flex-col items-center border-[6px];

  animation: glow 1.5s ease-in-out infinite alternate;
}

p {
  @apply mb-3;
}


@keyframes glow {
  0% {
    box-shadow: 0 0 120px -10px var(--md-sys-color-primary);
  }

  100% {
    box-shadow: 0 0 120px -50px var(--md-sys-color-primary);
  }
}
</style>