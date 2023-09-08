<template>
  <div class="card min-h-[700px]">
    <h1 class="headline-small font-semibold text-on-surface-variant mb-1 whitespace-nowrap">{{ name }}</h1>
    <h4 class="title-small text-on-surface-variant font-medium whitespace-nowrap">{{ position }}</h4>
    <div class="justify-center hidden lg:flex lg:float-right ml-8 mt-8 lg:mt-4">
      <img class="w-[300px] min-w-[300px] h-auto z-0" :src="image" :alt="name" />
    </div>
    <p class="text-justify body-medium mt-10" ref="message" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import Typed from 'typed.js';

const props = defineProps<{
  image: string;
  name: string;
  position: string;
  message: string;
  role: string;
  activeRole: Role | null;
}>();

const message = ref();

let instance: Typed | undefined;

onMounted(() => {
  if (props.activeRole === props.role) {
    startTyped();
  }
});

watch(() => props.activeRole, v => {
  if (!instance && v === props.role) {
    startTyped();
  }
});

function startTyped() {
  if (instance) {
    instance.destroy();
  }

  instance = new Typed(message.value, {
    strings: [ props.message ],
    typeSpeed: 15,
    showCursor: false,
  });
}
</script>

<style lang="scss" scoped>
.card {
  @apply rounded-[32px] p-6 pt-14 sm:p-6 lg:p-12 bg-surface text-on-surface gap-10 leading-6
    border-surface-container-low text-left border-[6px];
}

p {
  @apply mb-3;
  font-family: Helvitica, Arial, OpenSans, sans-serif;
}

img {
  @apply rounded-3xl;
}

.closing p {
  @apply mb-0 italic;
}
</style>