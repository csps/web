<template>
  <component
    class="btn"
    :is="to ? 'router-link' : 'button'"
    :class="[large ? 'large' : '', icon ? 'btn-icon' : 'btn-' + color, transparent ? 'btn-transparent' : '']"
    :to="to"
    v-wave="noRipple ? false : rippleColor ? { color: rippleColor } : true" 
  >
    <v-icon v-if="icon" :path="icon" />
    <slot v-else />
  </component>
</template>

<script lang="ts" setup>
import VIcon from './VIcon.vue';

withDefaults(defineProps<{
  variant?: "default" | "outlined" | "tonal" | "text",
  icon?: string,
  color?: string,
  noRipple?: boolean,
  to?: string,
  large?: boolean,
  transparent?: boolean,
  rippleColor?: string,
}>(), {
  variant: 'default',
  color: "primary",
  noRipple: false,
  transparent: false,
});

</script>

<style lang="scss" scoped>
.btn {
  @apply cursor-none sm:cursor-pointer;
}

.btn:not(.btn-icon) {
  @apply min-w-min px-4 py-1.5 rounded-lg whitespace-nowrap font-medium;
}

.btn.large {
  @apply px-5 py-3 #{!important};
}

.btn-icon {
  @apply p-2 bg-primary text-primary-light-90 hover:bg-primary-light-10 rounded-full;
}

.btn-primary {
  @apply text-primary-light-90 hover:bg-primary-light-10;
}

.btn-transparent {
  @extend .btn-primary;
  @apply bg-transparent hover:bg-primary-light-90/10;
}

.btn-secondary {
  @apply bg-secondary hover:bg-secondary-light-10;
  color: theme("colors.secondary-dark-80") !important;
}
</style>