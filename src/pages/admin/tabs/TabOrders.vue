<template>
  <div class="flex flex-col justify-center items-center w-full px-6">
    <div class="flex items-center gap-3">
      <md-outlined-text-field
        v-model="data.search"
        :label="'Search ' + capitalize(data.column)"
        :prefix-text="data.column === FullOrderEnum.receipt_id ? 'CSPS' : ''"
      >
        <md-icon slot="leadingicon" v-html="icon('search')" />
      </md-outlined-text-field>
      <md-outlined-select v-model="data.column" label="Filter by" quick>
        <md-icon slot="leadingicon" v-html="icon('filter_alt', true)" />
        <md-select-option
          v-for="option in FullOrderEnum"
          :key="option"
          :value="option"
          :headline="capitalize(option)"
        />
      </md-outlined-select>
    </div>

    <div class="flex justify-center items-center flex-wrap gap-2 mt-4">
      <md-filter-chip
        v-for="s in status"
        :key="s.value"
        :selected="data.filterStatus.includes(s.value)"
        :label="s.label"
        @click="onFilter(s.value)"
      />
    </div>

    <!-- <p class="body-medium mt-3">{{ count }} results</p> -->

    <div v-if="isLoading" class="flex flex-col gap-3 items-center mt-10">
      <md-linear-progress indeterminate />
      <p>Fetching orders...</p>
    </div>

    <div v-else class="flex justify-center mt-8 container mx-auto">
      <div v-if="data.orders.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <OrderCard v-for="order in data.orders" :key="order.id" :order="order" />
      </div>
      <div v-else>
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { icon } from "~/utils/icon";
import { ref, onMounted, watch } from "vue";
import { Endpoints, makeRequest } from "~/network/request";
import { FullOrderEnum } from "~/types/models";
import { OrderStatus } from "~/types/enums";
import { capitalize } from "~/utils/string";
import { Env } from "~/config";

import "@material/web/button/filled-button";
import "@material/web/progress/linear-progress";
import "@material/web/textfield/outlined-text-field";
import "@material/web/select/outlined-select";
import "@material/web/chips/filter-chip";
import "@material/web/chips/chip-set";
import "@material/web/select/outlined-select";
import "@material/web/select/select-option";

import OrderCard from "../components/OrderCard.vue";

const data = ref({
  count: 0,
  orders: [] as FullOrderModel[],
  page: 1,
  search: "",
  filterStatus: [OrderStatus.PENDING_PAYMENT],
  column: FullOrderEnum.receipt_id,
});

const message = ref("");
const isLoading = ref(true);

const status = [
  { value: OrderStatus.PENDING_PAYMENT, label: "Pending" },
  { value: OrderStatus.COMPLETED, label: "Completed" },
  { value: OrderStatus.CANCELLED_BY_USER, label: "Cancelled by user" },
  { value: OrderStatus.CANCELLED_BY_ADMIN, label: "Cancelled by admin" },
  { value: OrderStatus.REMOVED, label: "Removed" },
  { value: OrderStatus.REJECTED, label: "Rejected" },
];

watch([
  () => data.value.search,
  () => data.value.column,
  () => data.value.filterStatus,
], v => {
  fetchOrders(v[0]);
});

onMounted(fetchOrders);

function fetchOrders(search = "") {
  isLoading.value = true;
  data.value.count = 0;
  data.value.orders = [];

  const request: any = {
    search_value: [data.value.column === FullOrderEnum.receipt_id ? 'CSPS' + search : search, ...data.value.filterStatus],
    search_column: [data.value.column, ...Array(data.value.filterStatus.length).fill(FullOrderEnum.status)],
    page: data.value.page,
    limit: Env.admin_orders_per_page
  };

  makeRequest<FullOrderModel[]>("GET", Endpoints.Orders, request, response => {
    isLoading.value = false;
    data.value.orders = [];

    if (response.success) {
      data.value.count = response.data.length;
      data.value.orders = response.data;
      return;
    }

    message.value = response.message;
  });
}

function onFilter(status: OrderStatus) {
  const index = data.value.filterStatus.indexOf(status);

  if (index === -1) {
    data.value.filterStatus.push(status);
    data.value.filterStatus = [...data.value.filterStatus];
    return;
  }

  data.value.filterStatus.splice(index, 1);
  data.value.filterStatus = [...data.value.filterStatus];
}
</script>
