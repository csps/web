<template>
  <button :class="icon ? 'btn-icon' : 'btn-' + color" v-wave="!noRipple">
    <v-icon v-if="icon" :path="icon" />
    <slot v-else />
  </button>
</template>

<script lang="ts" setup>
import VIcon from './VIcon.vue';

withDefaults(defineProps<{
  variant?: "default" | "outlined" | "tonal" | "text",
  icon?: string,
  color?: string,
  noRipple?: boolean
}>(), {
  variant: 'default',
  color: "primary",
  noRipple: false
});

</script>

<style lang="scss" scoped>
button:not(.btn-icon) {
  @apply min-w-min px-4 py-1.5 rounded-lg whitespace-nowrap font-medium text-primary-light-90 hover:bg-primary-light-10;
}

.btn-icon {
  @apply p-2 bg-primary text-primary-light-90 hover:bg-primary-light-10 rounded-full;
}

.btn-secondary {
  @apply bg-secondary hover:bg-secondary-light-10;
  color: theme("colors.secondary-dark-90") !important;
}
</style>