<template>
  <div class="rail">
    <div>
      <div
        v-for="destination of destinations"
        class="destination"
        role="menuitem"
        @click="emit('select', destination.id)"
      >
        <div class="icon" :class="{ 'selected': destination.id === selected }">
          <md-icon
            class="w-6 h-6 text-on-surface-variant"
            v-html="icon(destination.icon, destination.id !== selected)"
          />
        </div>
        <h5>{{ destination.title }}</h5>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { icon } from '~/utils/icon';

defineProps<{
  destinations: NavigationRailItem[],
  selected: string
}>();

const emit = defineEmits(["select"]);
</script>

<style lang="scss" scoped>
.rail {
  @apply bg-surface dark:bg-background py-4 min-w-[80px] pt-6;
  transition: transform .2s cubic-bezier(.2,0,0,1);
}

.destination {
  @apply h-14 grid justify-center cursor-pointer;
  margin: -2px auto 14px;

  &:hover .icon {
    @apply bg-surface-container-high;
  }

  .icon {
    @apply h-8 w-14 flex items-center justify-center rounded-2xl mb-1 mx-3;
    transition: font-variation-settings .2s cubic-bezier(.2,0,0,1);

    &.selected {
      @apply bg-secondary-container;
    }
  }

  h5 {
    @apply text-xs font-medium text-on-surface text-center px-2;
  }
}
</style>
