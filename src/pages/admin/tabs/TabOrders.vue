<template>
  <div class="flex flex-col justify-center items-center w-full px-6 container mx-auto h-full">
    <div class="flex items-center gap-3">
      <md-outlined-text-field
        v-model="data.search"
        :label="'Search ' + capitalize(data.column)"
        :prefix-text="data.column === FullOrderEnum.receipt_id ? 'CSPS' : ''"
      >
        <md-icon slot="leadingicon" v-html="icon('search')" />
      </md-outlined-text-field>
      <md-outlined-select v-model="data.column" label="Filter by" quick>
        <md-icon slot="leadingicon" v-html="icon('filter_list', true)" />
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
        elevated
        :key="s.value"
        :selected="data.filterStatus.includes(s.value)"
        :label="s.label"
        @click="onFilter(s.value)"
      />
    </div>

    <div class="flex justify-center mt-8 flex-grow">
      <div v-if="data.orders.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <OrderCard v-for="order in data.orders" :key="order.id" :order="order" />
      </div>
      <div v-else>
        {{ message || "Fetching orders..." }}
      </div>
    </div>

    <VPagination
      class="mt-5"
      v-if="data.orders.length > 0"
      :limit="parseInt(Env.admin_orders_per_page)"
      :page="data.page"
      :total="data.total"
      @change="p => data.page = p"
    />
  </div>
</template>

<script lang="ts" setup>
import { icon } from "~/utils/icon";
import { ref, onMounted, watch } from "vue";
import { Endpoints, makeRequest } from "~/network/request";
import { FullOrderEnum } from "~/types/models";
import { OrderStatus } from "~/types/enums";
import { capitalize } from "~/utils/string";
import { useStore } from "~/store";
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
import VPagination from "~/components/VPagination.vue";

const data = ref({
  total: 0,
  orders: [] as FullOrderModel[],
  page: 1,
  search: "",
  filterStatus: [OrderStatus.PENDING_PAYMENT],
  column: FullOrderEnum.receipt_id,
});

const message = ref("");
const isLoading = ref(true);
const store = useStore();

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
  () => data.value.page,
], v => {
  fetchOrders(v[0]);
});

onMounted(fetchOrders);

function fetchOrders(search = "") {
  isLoading.value = true;
  store.isLoading = true;

  const request: any = {
    search_value: [data.value.column === FullOrderEnum.receipt_id ? 'CSPS' + search : search, ...data.value.filterStatus],
    search_column: [data.value.column, ...Array(data.value.filterStatus.length).fill(FullOrderEnum.status)],
    page: data.value.page,
    limit: Env.admin_orders_per_page
  };

  if (data.value.filterStatus.length === 0) {
    message.value = "Select at least one status";
    isLoading.value = false;
    store.isLoading = false;
    data.value.orders = [];
    return;
  }

  makeRequest<FullOrderModel[]>("GET", Endpoints.Orders, request, response => {
    isLoading.value = false;
    store.isLoading = false;
    data.value.orders = [];

    if (response.success) {
      data.value.total = response.count || 0;
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