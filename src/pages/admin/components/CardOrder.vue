<template>
  <div class="bg-surface-container-low rounded-2xl p-6 relative" role="button">
    <md-ripple />
    <div class="flex gap-5">
      <div class="w-16 h-16 overflow-hidden">
        <VImage
          v-if="order.thumbnail > 0 || order.variations_photo_id > 0"
          :src="getPhotoLink(order.variations_photo_id || order.thumbnail)"
          :alt="order.product_name"
          :w-full="false"
          h-full
        />
        <ImageTemplate v-else />
      </div>
  
      <div class="flex-grow flex flex-col justify-between text-on-surface-variant">
        <div class="flex justify-between gap-6">
          <div>
            <h3 class="body-medium font-medium mb-2 flex items-center gap-1">
              <md-icon class="w-4 h-4 text-primary" v-html="icon('receipt', true)" />
              <span class="text-primary">{{ order.reference.substring(0, 12) }}</span>
              <span class="text-secondary">{{ order.reference.substring(12) }}</span>
            </h3>
            <h3 class="body-medium font-medium mb-1">{{ order.product_name }}</h3>
            <h5 class="body-small">{{ order.variations_name || 'Standard' }}</h5>
          </div>
          
          <div class="mt-0.5 body-small flex flex-col justify-between items-end">
            <h3 class="label-medium mt-0.5 font-medium text-outline">
              {{ mapOrderStatusLabel(order.status) }}
            </h3>
            <span class="text-outline">{{ getReadableDate(order.date_stamp) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { icon } from "~/utils/icon";
import { getReadableDate } from "~/utils/date";
import { getPhotoLink } from "~/utils/network";
import { mapOrderStatusLabel } from "~/utils/page";

import "@material/web/icon/icon";
import "@material/web/ripple/ripple";

import VImage from "~/components/VImage.vue";
import ImageTemplate from "~/composables/ImageTemplate.vue";

defineProps<{
  order: FullOrderModel;
}>();
</script>
