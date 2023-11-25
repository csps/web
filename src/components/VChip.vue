<template>
  <span
    class="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full"
    :class="{
      'dark:bg-green-900 dark:text-green-300 bg-green-300 text-green-800': status === Status.SUCCESS,
      'dark:bg-red-900 dark:text-red-300 bg-red-300 text-red-800': status === Status.ERROR,
      'dark:bg-yellow-900 dark:text-yellow-300 bg-yellow-300 text-yellow-800': status === Status.WARNING,
      'dark:bg-blue-900 dark:text-blue-300 bg-blue-300 text-blue-800': status === Status.INFO,
    }"
  >
    <span
      class="w-2 h-2 me-1.5 rounded-full"
      :class="{
        'bg-green-700 dark:bg-green-500': status === Status.SUCCESS,
        'bg-red-700 dark:bg-red-500': status === Status.ERROR,
        'bg-yellow-700 dark:bg-yellow-500': status === Status.WARNING,
        'bg-blue-700 dark:bg-blue-500': status === Status.INFO,
      }"
    />

    {{ label }}
  </span>
</template>

<script lang="ts" setup>
import { Status } from '~/types/enums';

defineProps<{
  status: Status;
  label: string;
}>();
</script>