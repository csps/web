<template>
  <ol class="relative border-l border-outline-variant">
    <li v-for="item in data" :key="item.title" class="mb-6 ml-6 flex gap-5">
      <span class="absolute -left-3 flex items-center justify-center text-secondary bg-surface-container-high ring-8 ring-surface h-6 w-6 rounded-full">
        <md-icon class="w-3 h-3" v-html="icon('event')" />
      </span>

      <div class="flex-grow">
        <div class="flex justify-between gap-5">
          <h3 class="flex items-center mb-1 text-lg font-semibold text-secondary">
            {{ item.title }}
          </h3>
          <time class="mb-2 body-small font-medium leading-none text-outline flex items-center gap-2 whitespace-nowrap">
            {{ item.date }}
          </time>
        </div>

        <time class="mb-2 body-small leading-none text-outline flex items-center gap-1">
          <md-icon class="w-3.5 h-3.5" v-html="icon('schedule', true)" />
          {{ item.time }}
        </time>

        <div class="mb-2 body-small leading-none text-outline flex items-center gap-1">
          <md-icon class="w-3.5 h-3.5" v-html="icon('location_on', true)" />
          {{ item.location }}
        </div>

        <div class="mt-3 body-medium">
          {{ item.content }}
        </div>
      </div>
    </li>
  </ol>
</template>

<script lang="ts" setup>
import { icon } from "~/utils/icon";
import "@material/web/icon/icon";

defineProps<{
  data: TimelineData[]
}>();
</script>

