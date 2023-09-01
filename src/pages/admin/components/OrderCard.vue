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
            <h3 class="body-medium font-medium mb-2 flex items-center gap-1 text-primary">
              <md-icon class="w-4 h-4" v-html="icon('receipt', true)" />
              {{ order.receipt_id }}
            </h3>
            <h3 class="body-medium font-medium">{{ order.product_name }}</h3>
            <h5 class="body-small">{{ order.variations_name || 'Standard' }}</h5>
          </div>

          <div class="mt-0.5 body-small flex flex-col justify-between items-end">
            <span>{{ getReadableDate(order.date_stamp) }}</span>
            <h3 class="label-medium mt-0.5 text-secondary font-medium">{{ mapOrderStatusLabel(order.status) }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getPhotoLink } from "~/utils/network";
import { OrderStatus } from "~/types/enums";

import "@material/web/icon/icon";
import "@material/web/ripple/ripple";

import VImage from "~/components/VImage.vue";
import ImageTemplate from "~/composables/ImageTemplate.vue";
import { icon } from "~/utils/icon";
import { getReadableDate } from "~/utils/date";

defineProps<{
  order: FullOrderModel;
}>();

/**
 * Convert order status to label
 * @param status Generic status
 */
function mapOrderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.PENDING_PAYMENT:
      return "Pending Payment";
    case OrderStatus.COMPLETED:
      return "Completed";
    case OrderStatus.CANCELLED_BY_USER:
      return "Cancelled by user";
    case OrderStatus.CANCELLED_BY_ADMIN:
      return "Cancelled by admin";
    case OrderStatus.REMOVED:
      return "Removed";
    case OrderStatus.REJECTED:
      return "Rejected";
    default:
      return "Unknown";
  }
}
</script>
