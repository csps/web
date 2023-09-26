<template>
  <div class="flex flex-col justify-center items-center w-full px-6 container mx-auto h-full">
    <div class="flex items-center gap-3">
      <md-outlined-text-field
        v-model="data.search"
        :label="'Search ' + capitalize(data.column)"
      >
        <md-icon slot="leadingicon" v-html="icon('search')" />
        <md-icon-button id="orders-sort-menu" class="mr-2" slot="trailingicon" title="Filter by" @click.stop="isMenuOpen = !isMenuOpen">
          <md-icon v-html="icon('filter_list')" />
        </md-icon-button>
      </md-outlined-text-field>

      <div class="flex justify-end items-center">
        <md-filled-tonal-button @click="data.sortDir = (data.sortDir === 'DESC' ? 'ASC' : 'DESC')">
          <md-icon slot="icon" v-html="icon(data.sortDir === 'DESC' ? 'arrow_upward' : 'arrow_downward')" />
          Sort {{ data.sortDir }}
        </md-filled-tonal-button>
      </div>

      <md-menu
        fixed
        :open="isMenuOpen"
        anchor="orders-sort-menu"
        @closed="isMenuOpen = false"
        class="min-w-min"
        y-offset="8"
        anchor-corner="END_END"
        menu-corner="START_END"
      >
        <md-menu-item
          v-for="option in allowedFilters"
          :key="option"
          :value="option"
          @click="data.column = option"
          :headline="capitalize(option)"
        />
      </md-menu>
    </div>

    <div class="flex justify-center items-center flex-wrap gap-2 mt-4 px-6">
      <md-filter-chip
        v-for="s in status"
        elevated
        :key="s.value"
        :selected="data.filterStatus.includes(s.value)"
        :label="s.label"
        @click="onFilter(s.value)"
      />
    </div>

    <div v-if="data.orders.length > 0" class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div v-for="order in data.orders" class="flex flex-col" :key="order.id">
        <CardOrder :order="order" @click="goToOrder(order.reference)" />
      </div>
    </div>
    <div v-else class="flex justify-center mt-8 flex-grow body-medium">
      {{ message || "Fetching orders..." }}
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
import { useRouter } from "vue-router";
import { Endpoints, makeRequest } from "~/network/request";
import { FullOrderEnum } from "~/types/models";
import { OrderStatus } from "~/types/enums";
import { capitalize } from "~/utils/string";
import { getStore, setStore } from "~/utils/storage";
import { useStore } from "~/store";
import { Env } from "~/config";

import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/progress/linear-progress";
import "@material/web/textfield/outlined-text-field";
import "@material/web/select/outlined-select";
import "@material/web/chips/filter-chip";
import "@material/web/chips/chip-set";
import "@material/web/iconbutton/icon-button";
import "@material/web/select/select-option";

import CardOrder from "../components/CardOrder.vue";
import VPagination from "~/components/VPagination.vue";

const data = ref({
  total: 0,
  orders: [] as FullOrderModel[],
  page: getStore("tabs_orders_page") ? parseInt(getStore("tabs_orders_page")) : 1,
  search: "",
  filterStatus: getStore("tabs_orders_status") ? JSON.parse(getStore("tabs_orders_status")) : [OrderStatus.PENDING_PAYMENT],
  column: getStore("tabs_orders_column") ? getStore("tabs_orders_column") : FullOrderEnum.reference,
  sortDir: getStore("tabs_orders_sort") ? getStore("tabs_orders_sort") : "DESC",
});

const message = ref("");
const store = useStore();
const router = useRouter();
const isLoading = ref(true);
const isMenuOpen = ref(false);

const status = [
  { value: OrderStatus.PENDING_PAYMENT, label: "Pending" },
  { value: OrderStatus.COMPLETED, label: "Completed" },
  { value: OrderStatus.CANCELLED_BY_USER, label: "Cancelled by user" },
  { value: OrderStatus.CANCELLED_BY_ADMIN, label: "Cancelled by admin" },
  { value: OrderStatus.REMOVED, label: "Removed" },
  { value: OrderStatus.REJECTED, label: "Rejected" },
];

const allowedFilters = [
  FullOrderEnum.reference,
  FullOrderEnum.student_id,
  FullOrderEnum.first_name,
  FullOrderEnum.last_name,
  FullOrderEnum.email_address,
  FullOrderEnum.product_name,
  FullOrderEnum.mode_of_payment,
  FullOrderEnum.variations_name,
];

watch([
  () => data.value.search,
  () => data.value.column,
  () => data.value.filterStatus,
  () => data.value.page,
  () => data.value.sortDir,
], v => {
  setStore("tabs_orders_status", JSON.stringify(data.value.filterStatus));
  fetchOrders(v[0]);
});

onMounted(fetchOrders);

function goToOrder(reference: string) {
  router.push({ name: "Order", params: { reference }});
}

function fetchOrders(search = "") {
  isLoading.value = true;
  store.isLoading = true;

  const request: any = {
    search_value: [search, ...data.value.filterStatus],
    search_column: [data.value.column, ...Array(data.value.filterStatus.length).fill(FullOrderEnum.status)],
    page: data.value.page,
    sort_column: data.value.column,
    sort_type: data.value.sortDir,
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
      setStore("tabs_orders_page", `${request.page}`);
      setStore("tabs_orders_column", data.value.column);
      setStore("tabs_orders_sort", data.value.sortDir);
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
