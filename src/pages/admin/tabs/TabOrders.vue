<template>
  <div class="container mx-auto px-4">
    <div class="flex items-center flex-col-reverse xl:flex-row justify-between gap-3">
      <div class="overflow-x-scroll flex w-full gap-x-2 overflow-y-hidden items-end py-1">
        <md-filter-chip
          v-for="status in Object.values(OrderStatus).filter(s => typeof s === 'number')"
          :key="status"
          :selected="data.filterStatus.includes(status)"
          :label="mapOrderStatusLabel(status as OrderStatus)"
          @click="onFilter(status as OrderStatus)"
          elevated
        />
      </div>
      <div class="flex items-center gap-3 relative bottom-3">
        <md-filled-text-field class="w-full" @keyup.enter="fetchOrders(data.search)" v-model="data.search" :label="capitalize(data.column)">
          <md-icon slot="leading-icon" v-html="icon('search')" />
          <div slot="trailing-icon">
            <div class="relative">
              <md-icon-button id="orders-sort-menu" class="mr-2" title="Filter by" @click.stop="isMenuOpen = !isMenuOpen">
                <md-icon v-html="icon('filter_list')" />
              </md-icon-button>
              <md-menu
                :open="isMenuOpen"
                anchor="orders-sort-menu"
                @closed="isMenuOpen = false"
                class="min-w-min"
                y-offset="8"
                anchor-corner="end-end"
                menu-corner="start-end"
              >
                <md-menu-item
                  v-for="option in allowedFilters"
                  :key="option"
                  :value="option"
                  @click="data.column = option"
                >
                  <span class="whitespace-nowrap">{{ capitalize(option) }}</span>
                </md-menu-item>
              </md-menu>
            </div>
          </div>
        </md-filled-text-field>
        <md-filled-button @click="fetchOrders(data.search)" :disabled="isLoading">
          Search
        </md-filled-button>
      </div>
    </div>

    <div>
      <VTable
        :loading="isLoading"
        :headers="headers"
        :data="data.orders"
        hoverable
        no-action
      >
        <template v-slot:reference="{ row }: { row: FullOrderModel }">
          <h3 class="body-medium font-medium mb-2 flex items-center gap-1">
            <router-link :to="{ name: 'Order', params: { reference: row.reference }}">
              <span class="border-b border-dashed border-primary">
                <md-icon class="w-4 h-4 text-primary mr-1 pt-0.5" v-html="icon('receipt', true)" />
                <span class="text-primary pe-1">{{ row.reference?.substring(0, 12) }}</span>
                <span class="text-secondary">{{ row.reference?.substring(12) }}</span>
              </span>
            </router-link>
          </h3>
        </template>

        <template v-slot:product_name="{ row }: { row: FullOrderModel }">
          {{ row.product_name }} <span>&times; {{ row.quantity }}</span>
        </template>

        <template v-slot:product_price="{ row }: { row: FullOrderModel }">
          &#8369;{{ row.product_price * row.quantity }}.00
        </template>

        <template v-slot:name="{ row }: { row: FullOrderModel }">
          {{ row.first_name + ' ' + row.last_name }}
        </template>

        <template v-slot:status="{ row }: { row: FullOrderModel }">
          <v-chip :status="mapOrderStatus(row.status)" :label="mapOrderStatusLabel(row.status)" />
        </template>
      </VTable>

      <div v-if="message.length > 0 && data.orders.length === 0" class="flex justify-center py-4 text-error font-medium">
        {{ message }}
      </div>
      
      <VPagination
        class="mt-5"
        v-if="data.orders.length > 0"
        :limit="parseInt(Env.admin_orders_per_page)"
        :page="data.page"
        :total="data.total"
        @change="p => goToPage(p)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useStore } from "~/store";
import { icon } from "~/utils/icon";
import { getStore, setStore } from "~/utils/storage";

import "@material/web/icon/icon";
import "@material/web/iconbutton/icon-button";
import "@material/web/textfield/filled-text-field";
import "@material/web/button/filled-button";
import "@material/web/select/select-option";
import "@material/web/chips/filter-chip";
import "@material/web/menu/menu";
import "@material/web/menu/menu-item";

import VTable from "~/components/VTable.vue";
import VPagination from "~/components/VPagination.vue";
import VChip from "~/components/VChip.vue";

import { FullOrderEnum } from "~/types/models";
import { OrderStatus } from "~/types/enums";
import { capitalize } from "~/utils/string";
import { Env } from "~/config";
import { Endpoints, makeRequest } from "~/network/request";
import { PaginationRequest } from "~/types/request";
import { createPagination } from "~/utils/pagination";
import { mapOrderStatusLabel, mapOrderStatus } from "~/utils/page";

onMounted(fetchOrders);

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
const isLoading = ref(true);
const isMenuOpen = ref(false);
const isSearched = ref(false);

const headers: TableHeader[] = [
  { id: FullOrderEnum.reference, text: "Reference #" },
  { id: FullOrderEnum.product_name, text: "Product" },
  { id: "name", text: "Student Name" },
  { id: FullOrderEnum.product_price, text: "Total", align: "right" },
  { id: FullOrderEnum.status, text: "Status" },
  { id: FullOrderEnum.date_stamp, text: "Created At" },
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

function goToPage(page: number) {
  data.value.page = page;
  fetchOrders(isSearched ? data.value.search : "");
}

function fetchOrders(search = "") {
  isLoading.value = true;
  store.isLoading = true;

  if (!isSearched.value && search.length > 0) {
    data.value.page = 1;
  }

  isSearched.value = search.length > 0;

  const request: PaginationRequest = createPagination({
    page: data.value.page,
    limit: Number(Env.admin_orders_per_page),
    search: {
      key: [data.value.column, ...Array(data.value.filterStatus.length).fill(FullOrderEnum.status)],
      value: [search, ...data.value.filterStatus],
    },
    sort: {
      key: data.value.column,
      type: data.value.sortDir as "ASC" | "DESC",
    }
  });

  if (data.value.filterStatus.length === 0) {
    message.value = "Select at least one status";
    isLoading.value = false;
    store.isLoading = false;
    data.value.orders = [];
    return;
  }

  makeRequest<FullOrderModel[], PaginationRequest>("GET", Endpoints.Orders, request, response => {
    isLoading.value = false;
    store.isLoading = false;
    data.value.orders = [];

    if (response.success) {
      data.value.total = response.count || 0;
      data.value.orders = response.data;
      message.value = response.message;
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
  } else {
    data.value.filterStatus.splice(index, 1);
  }

  fetchOrders(isSearched ? data.value.search : "");
}
</script>
