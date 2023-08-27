<template>
  <div class="flex flex-col justify-center items-center w-full px-6">
    
    
    <div class="flex items-center gap-6">
      <md-outlined-text-field label="Search">
        <md-icon slot="leadingicon" v-html="icon('search')" />
      </md-outlined-text-field>
    </div>

    <div class="flex justify-center items-center flex-wrap gap-2 mt-6">
      <md-filter-chip elevated label="Pending" />
      <md-filter-chip elevated label="Completed" />
      <md-filter-chip elevated label="Cancelled by user" />
      <md-filter-chip elevated label="Cancelled by admin" />
      <md-filter-chip elevated label="Removed" />
      <md-filter-chip elevated label="Rejected" />
    </div>

    <!-- <p class="body-medium mt-3">{{ count }} results</p> -->

    <div v-if="isLoading" class="flex flex-col gap-3 items-center mt-10">
      <md-linear-progress indeterminate />
      <p>Fetching orders...</p>
    </div>

    <div v-else class="flex justify-center mt-10 container mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <OrderCard v-for="order in orders" :key="order.id" :order="order" />
      </div>
    </div>

    <!-- <div class="mt-10" v-else>
      Hello
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { icon } from "~/utils/icon";
import { toast } from "vue3-toastify";
import { Endpoints, makeRequest } from "~/network/request";

import "@material/web/button/filled-button";
import "@material/web/progress/linear-progress";
import "@material/web/textfield/outlined-text-field";
import "@material/web/chips/filter-chip";
import "@material/web/chips/chip-set";
// import "@material/web/select/filled-select";
// import "@material/web/select/select-option";

import OrderCard from "../components/OrderCard.vue";

const count = ref(0);
const orders = ref<FullOrderModel[]>([]);
const isLoading = ref(true);

onMounted(() => {
  makeRequest<FullOrderModel[]>("GET", Endpoints.Orders, null, response => {
    isLoading.value = false;

    if (response.success) {
      count.value = response.data.length;
      orders.value = response.data;
      return;
    }

    toast.error(response.message);
  });
});
</script>
