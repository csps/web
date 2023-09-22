<template>
  <div class="bg-surface-container-low rounded-2xl p-7">
    <div class="flex justify-between items-center mb-1">
      <div class="label-large font-medium">
        <h3 class="title-medium text-primary font-medium mb-1">{{ data.title }}</h3>
      </div>
      <h6 class="label-medium">{{ getReadableDate(data.date_stamp) }}</h6>
    </div>

    <div class="body-small">
      {{ data.content }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getReadableDate } from '~/utils/date';

import "@material/web/iconbutton/icon-button"

defineProps<{
  data: AnnouncementModel
}>();
</script>

<style lang="scss" scoped>
md-icon.verified {
  @apply w-3.5 h-3.5 text-primary;
}
</style>