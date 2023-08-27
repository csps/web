<template>
  <div class="bg-surface-container-low rounded-2xl p-6">
    <div class="flex">
      <div class="w-28 h-28 md:w-32 md:h-32 overflow-hidden">
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
          <div class="flex flex-col gap-1 items-end">
            <h3 class="label-medium mt-0.5">{{ mapOrderStatusLabel(order.status) }}</h3>
          </div>
        </div>
  
        <div class="flex justify-between gap-6">
          <div>
            <h4 class="title-small">{{ order.first_name }} {{ order.last_name }}</h4>
            <h5 class="body-small">{{ order.email_address }}</h5>
          </div>
  
          <div class="hidden md:flex justify-end">
            <md-filled-button>
              View Order
            </md-filled-button>
          </div>
        </div>
      </div>
    </div>

    <div class="block md:hidden mt-5 w-full">
      <md-filled-button class="w-full">
        View Order
      </md-filled-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { icon } from '~/utils/icon';
import { getPhotoLink } from "~/utils/network";
import { OrderStatus } from "~/types/enums";
// import { Status } from "~/types/enums";

import "@material/web/icon/icon";
import "@material/web/divider/divider";
import "@material/web/iconbutton/icon-button";
import "@material/web/chips/assist-chip";
import "@material/web/button/filled-button";

import VImage from "~/components/VImage.vue";
import ImageTemplate from "~/composables/ImageTemplate.vue";
import { icon } from "~/utils/icon";
// import { ModeOfPayment } from "~/types/enums";

defineProps<{
  order: FullOrderModel;
}>();

// /**
//  * Convert order status to generic status
//  * @param status Generic status
//  */
// function mapOrderStatus(status: OrderStatus): Status {
//   switch (status) {
//     case OrderStatus.PENDING_PAYMENT:
//       return Status.WARNING;
//     case OrderStatus.COMPLETED:
//       return Status.SUCCESS;
//     case OrderStatus.CANCELLED_BY_USER:
//     case OrderStatus.CANCELLED_BY_ADMIN:
//     case OrderStatus.REMOVED:
//     case OrderStatus.REJECTED:
//       return Status.ERROR;
//     default:
//       return Status.INFO;
//   }
// }

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
