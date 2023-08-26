<template>
  <div class="py-5 md:py-10">

    <div v-if="isLoading" class="flex justify-center items-center flex-col gap-4">
      <md-linear-progress indeterminate />
      <p>Generating receipt...</p>
    </div>

    <div class="flex flex-col items-center" v-else-if="isValid">
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
          <VImage :src="getQRCodeLink(order?.receipt_id || '', store.isDark)" class="pt-2 pb-6" alt="QR Code" />
  
          <div class=" content">
            <span>Merch</span>
            <span>{{ order?.product_name }}</span>
    
            <span>Amount</span>
            <span>{{ toCurrency(order?.product_price || 0) }}</span>
    
            <span>Quantity</span>
            <span>{{ order?.quantity }}</span>
  
            <span>Payment Method</span>
            <span>{{ order?.mode_of_payment === ModeOfPayment.GCASH ? "Gcash" : "Walk-in" }}</span>
          </div>
  
          <div class="divider" />
  
          <div class="content">
            <span>Receipt ID</span>
            <span>{{ order?.receipt_id }}</span>
  
            <span>Name</span>
            <span>{{ order?.first_name }} {{ order?.last_name }}</span>
  
            <span>Order date</span>
            <span>{{ order?.date_stamp }}</span>
  
            <span>Status</span>
            <span>{{ mapOrderStatus(order?.status) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="surface error" v-else>
      {{ message }}
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from '~/store';
import { icon } from '~/utils/icon';
import { useRoute } from 'vue-router';
import { getQRCodeLink } from '~/utils/network';
import { Endpoints, makeRequest } from "~/network/request";
import { toast } from "vue3-toastify";

import VImage from '~/components/VImage.vue';

import "@material/web/icon/icon";
import "@material/web/divider/divider";
import "@material/web/button/text-button";
import "@material/web/button/filled-button";
import "@material/web/progress/linear-progress";
import { ModeOfPayment } from "~/types/enums";
import { toCurrency } from "~/utils/string";
import { mapOrderStatus } from "~/utils/page";

const store = useStore();
const route = useRoute();
const message = ref();
const isValid = ref(false);
const isLoading = ref(true);
const order = ref<FullOrderModel>();

makeRequest<FullOrderModel>("GET", Endpoints.OrdersReceipt, { receipt: route.params.receipt }, response => {
  isLoading.value = false;

  if (response.success) {
    order.value = response.data;
    isValid.value = true;
    return;
  }

  message.value = response.message;
  toast.error(response.message);
});
</script>

<style lang="scss" scoped>
.content {
  @apply grid grid-cols-2 gap-x-6 gap-y-1.5;

  span:nth-child(even) {
    @apply text-right;
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