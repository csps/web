<template>
  <div class="flex flex-col justify-center items-center w-full h-full text-on-surface-variant">
    <div v-if="store.isLoggedIn === undefined" class="flex flex-col gap-2 justify-center items-center">
      <md-linear-progress indeterminate />
      <span>Checking status...</span>
    </div>

    <div v-else-if="store.isLoggedIn" class="py-5 w-full">
      <h3 class="text-center headline-small mb-5 font-medium">My orders</h3>
      <div class="flex flex-col justify-center items-center w-full px-6 container mx-auto h-full">
        <div class="flex items-center gap-3">
          <md-outlined-text-field
            v-model="data.search"
            :label="'Search ' + capitalize(data.column)"
          >
            <md-icon slot="leadingicon" v-html="icon('search')" />
          </md-outlined-text-field>
          <md-outlined-select v-model="data.column" label="Filter by" class="dense" quick>
            <md-icon slot="leadingicon" v-html="icon('filter_list', true)" />
            <md-select-option
              v-for="option in allowedFilters"
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

        <div v-if="data.orders.length > 0" class="space-y-3 mt-8 w-full lg:w-2/3 xl:w-1/2 2xl:w-2/5">
          <div v-for="(order, i) in data.orders" :key="order.id">
            <p class="label-large font-medium text-on-surface-variant mb-3 text-left" v-if="getMonthCategory(order, i)">{{ getMonthCategory(order, i) }}</p>
            <CardOrder :order="order" @click="goToReceipt(order.receipt_id)" />
          </div>
        </div>
        <div v-else class="flex justify-center mt-8 flex-grow body-medium">
          {{ message || "Fetching orders..." }}
        </div>

        <VPagination
          class="mt-5"
          v-if="data.orders.length > 0"
          :limit="8"
          :page="data.page"
          :total="data.total"
          @change="p => data.page = p"
        />
      </div>
    </div>

    <div v-else>
      <h2 class="text-2xl md:text-3xl font-semibold mb-1 text-left">
        My orders
      </h2>
      <h6 class="text-sm">
        To view your orders, please enter your receipt and student ID.
      </h6>

      <div class="flex flex-col gap-6 mt-5">
        <md-outlined-text-field @keydown.enter="submit" v-model.trim="receiptId" label="Receipt ID">
          <md-icon slot="leadingicon" v-html="icon('receipt', true)" />
        </md-outlined-text-field>
        <md-outlined-text-field @keydown.enter="submit" v-model.trim="studentId" label="Student ID" type="number">
          <md-icon slot="leadingicon" v-html="icon('badge', true)" />
        </md-outlined-text-field>
  
        <md-filled-button @click="submit" :disabled="receiptId.length === 0 || studentId.length === 0 || isFetching">
          {{ isFetching ? 'Finding order...' : 'View order' }}
        </md-filled-button>
  
        <p class="body-small text-center">
          Have an account? 
          <router-link :to="{ name: 'Login' }">
            <span class="border-b border-outline-variant border-dashed">Click here</span>
          </router-link>
  
          to login  and view your orders!
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { icon } from "~/utils/icon";
import { useStore } from "~/store";
import { useRouter } from "vue-router";
import { FullOrderEnum } from "~/types/models";
import { OrderStatus } from "~/types/enums";
import { capitalize } from "~/utils/string";
import { getMonthYear } from "~/utils/date";

import "@material/web/icon/icon";
import "@material/web/progress/linear-progress";
import "@material/web/textfield/outlined-text-field";
import "@material/web/button/filled-button";
import "@material/web/select/outlined-select";
import "@material/web/chips/filter-chip";
import "@material/web/chips/chip-set";
import "@material/web/select/select-option";

import CardOrder from "../admin/components/CardOrder.vue";
import VPagination from "~/components/VPagination.vue";
import { Endpoints, makeRequest } from "~/network/request";
import { toast } from "vue3-toastify";

const store = useStore();
const router = useRouter();

const message = ref("");
const receiptId = ref("");
const studentId = ref("");
const isFetching = ref(false);

const data = ref({
  total: 0,
  orders: [] as FullOrderModel[],
  page: 1,
  search: "",
  filterStatus: [OrderStatus.PENDING_PAYMENT],
  column: FullOrderEnum.receipt_id,
});

const status = [
  { value: OrderStatus.PENDING_PAYMENT, label: "Pending" },
  { value: OrderStatus.COMPLETED, label: "Completed" },
  { value: OrderStatus.CANCELLED_BY_USER, label: "Cancelled by user" },
  { value: OrderStatus.CANCELLED_BY_ADMIN, label: "Cancelled by admin" },
  { value: OrderStatus.REMOVED, label: "Removed" },
  { value: OrderStatus.REJECTED, label: "Rejected" },
];

const allowedFilters = [
  FullOrderEnum.receipt_id,
  FullOrderEnum.product_name,
  FullOrderEnum.mode_of_payment,
  FullOrderEnum.variations_name,
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
  store.isLoading = true;

  const request: any = {
    search_value: [search, ...data.value.filterStatus],
    search_column: [data.value.column, ...Array(data.value.filterStatus.length).fill(FullOrderEnum.status)],
    page: data.value.page,
    sort_column: FullOrderEnum.date_stamp,
    sort_type: "DESC",
    limit: 8
  };

  if (data.value.filterStatus.length === 0) {
    message.value = "Select at least one status";
    store.isLoading = false;
    data.value.orders = [];
    return;
  }

  makeRequest<FullOrderModel[]>("GET", Endpoints.Orders, request, response => {
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

function submit() {
  if (receiptId.value.length === 0 || studentId.value.length === 0) return;

  isFetching.value = true;
  store.isLoading = true;

  const request: any = {
    search_value: [receiptId.value, studentId.value],
    search_column: [FullOrderEnum.receipt_id, FullOrderEnum.student_id],
  };

  makeRequest<FullOrderModel[]>("GET", Endpoints.Orders, request, response => {
    isFetching.value = false;
    store.isLoading = false;

    if (response.success) {
      goToReceipt(response.data[0].receipt_id);
      return;
    }

    toast.warn(response.message);
  });  
}

function goToReceipt(receipt: string) {
  router.push({ name: "Receipt", params: { receipt }});
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

function getMonthCategory(date: FullOrderModel, i: number) {
  const value = getMonthYear(date.date_stamp);

  if (i === 0) {
    return value;
  }

  const prev = data.value.orders[i - 1];

  if (getMonthYear(prev.date_stamp) !== value) {
    return value;
  }
    
  return "";
}
</script>