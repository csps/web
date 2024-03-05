<template>
  <ol class="relative border-l border-outline-variant">
    <li v-for="(item, i) in data" :key="item.title" class="relative mb-6 ml-6 flex gap-5 bg-surface-container-low py-5 px-6 rounded-xl" data-sal="slide-left" :data-sal-delay="250 * i">
      <div class="absolute -left-12 flex items-center justify-center text-secondary bg-surface-container-low ring-[10px] ring-surface-container-high dark:ring-surface h-12 w-12 rounded-full">
        <md-icon class="w-5 h-5" v-html="icon('event')" />
      </div>
      <div class="flex-grow">
        <div class="flex justify-between gap-5">
          <h3 class="flex items-center mb-2 text-lg font-semibold text-primary">
            {{ item.title }}
          </h3>
          <time class="mb-2 body-small font-medium leading-none text-secondary flex items-center gap-2 whitespace-nowrap">
            {{ item.date }}
          </time>
        </div>

        <div v-if="item.location" class="mb-2 body-small leading-none text-secondary flex items-center gap-1" :title="item.location">
          <md-icon class="w-3.5 h-3.5" v-html="icon('location_on', true)" />
          {{ item.location }}
        </div>

        <time v-if="item.time" :title="item.time" class="mb-2 body-small leading-none text-secondary flex items-center gap-1">
          <md-icon class="w-3.5 h-3.5" v-html="icon('schedule', true)" />
          {{ item.time }}
        </time>

        <div class="mt-3 body-medium">
          {{ item.content }}
        </div>
      </div>
    </li>
  </ol>
</template>

<script lang="ts" setup>
import sal from "sal.js";
import { onMounted } from "vue";
import { icon } from "~/utils/icon";
import "@material/web/icon/icon";

defineProps<{
  data: TimelineData[]
}>();

onMounted(() => {
  sal();
});
</script>

