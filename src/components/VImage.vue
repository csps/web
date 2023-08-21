<template>
  <div class="flex justify-center items-center w-full h-full">
    <img class="w-full" v-show="isLoaded" @load="loaded" @error="loaded" :src="src" :alt="alt" />
    <md-circular-progress v-show="!isLoaded" indeterminate />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import "@material/web/progress/circular-progress";

defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
});

const isLoaded = ref(false);

function loaded() {
  isLoaded.value = true;
}
</script>

<syle lang="scss" scoped>
md-circular-progress {
  --md-circular-progress-size: 48px;
  --md-circular-progress-active-indicator-width: 10;
}

img {
  @apply rounded-xl;
}
</syle>