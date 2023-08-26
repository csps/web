<template>
  <div class="flex flex-col items-center py-5 md:py-10">

    <h2 class="headline-small font-medium">Order success!</h2>
    <p class="body-medium">Your order has been successfully placed.</p>

    <div class="mt-4">
      <router-link to="/orders">
        <md-filled-button class="whitespace-nowrap" title="See my orders">
          <md-icon slot="icon" v-html="icon('shopping_cart', true)" />
          My orders
        </md-filled-button>
      </router-link>
    </div>

    <div class="bg-surface-container p-6 rounded-2xl mt-8">
      <div class="w-[320px] body-medium">
        <VImage :src="getQRCodeLink('example', store.isDark)" class="pt-2 pb-6" alt="QR Code" />

        <div class=" content">
          <span>Merch</span>
          <span>Lanyard</span>
  
          <span>Amount</span>
          <span>120</span>
  
          <span>Quantity</span>
          <span>1</span>

          <span>Payment Method</span>
          <span>GCash</span>
        </div>

        <div class="divider" />

        <div class="content">
          <span>Receipt ID</span>
          <span>CSPS20230826-001</span>

          <span>Name</span>
          <span>Maverick Fabroa</span>

          <span>Order date</span>
          <span>2023-08-26 10:30:00</span>

          <span>Status</span>
          <span>Pending</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store';
import { icon } from '~/utils/icon';
import { getQRCodeLink } from '~/utils/network';

import VImage from '~/components/VImage.vue';

import "@material/web/icon/icon";
import "@material/web/divider/divider";
import "@material/web/button/text-button";
import "@material/web/button/filled-button";

const store = useStore();
</script>

<style lang="scss" scoped>
.content {
  @apply grid grid-cols-2 gap-x-6 gap-y-1.5;

  span:nth-child(even) {
    @apply text-right;
  }

  span:nth-child(odd) {
    // @apply 
  }
}

md-icon {
  @apply w-1/2 h-1/2;
}

.icon {
  @apply w-28 h-28 rounded-full bg-primary flex justify-center items-center text-on-primary border-[26px] border-primary90 dark:border-surface-container mb-2;
}

.divider {
  @apply w-full h-[1px] border-t border-outline-variant border-dashed my-5;
}
</style>