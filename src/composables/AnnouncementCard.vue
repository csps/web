<template>
  <div class="bg-surface-container rounded-xl p-6">
    <div class="flex justify-between items-center mb-5">
      <div class="flex items-center gap-3">
        <div>
          <img width="38" :src="favicon" alt="CSPS" />
        </div>
        <div>
          <h4 class="title-medium flex items-center gap-1.5 mb-0.5">
            <span>Admin</span>
            <md-icon class="verified" v-html="icon('verified')" title="Verified" />
          </h4>
          <h6 class="label-medium">{{ getReadableDate(data.date_stamp) }}</h6>
        </div>
      </div>
      <div class="label-large font-medium">
        # {{ data.id }}
      </div>
    </div>

    <h3 class="title-large font-medium mb-1">{{ data.title }}</h3>
    <div class="body-medium">
      {{ data.content }}
    </div>

    <div v-if="data.photo_id" class="flex justify-center items-center mt-5 mb-2">
      <VImage class="rounded-xl w-full" :src="getPhotoLink(data.photo_id)" :alt="data.title" dynamic />
    </div>
  </div>
</template>

<script lang="ts" setup>
import favicon from '/favicon.png';
import { icon } from '~/utils/icon';
import { getReadableDate } from '~/utils/date';
import { getPhotoLink } from '~/utils/network';

import VImage from "~/components/VImage.vue"

defineProps<{
  data: Announcement
}>();
</script>

<style lang="scss" scoped>
md-icon.verified {
  @apply w-3.5 h-3.5 text-primary;
}
</style>