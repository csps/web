<template>
  <div class="flex flex-col justify-center items-center w-full h-full text-on-surface-variant">
    <div v-if="isFetching" class="flex flex-col gap-2 justify-center items-center">
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
            <md-icon slot="leading-icon" v-html="icon('search')" />
          </md-outlined-text-field>
          <md-filled-select v-model="data.column" label="Filter by" class="dense">
            <md-icon slot="leading-icon" v-html="icon('filter_list', true)" />
            <md-select-option
              v-for="option in allowedFilters"
              :key="option"
              :value="option"
            >
              <span slot="headline">{{ capitalize(option) }}</span>
            </md-select-option>
          </md-filled-select>
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

        <div v-if="data.orders.length > 0" class="space-y-3 mt-8 w-full lg:w-2/3 xl:w-1/2 2xl:w-2/5">
          <div v-for="(order, i) in data.orders" :key="order.id">
            <p class="label-large font-medium text-on-surface-variant mb-3 text-left" v-if="getMonthCategory(order, i)">{{ getMonthCategory(order, i) }}</p>

            <router-link :to="{ name: 'My Order', params: { uniqueId: order.unique_id }}">
              <CardOrder :order="order" />
            </router-link>
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

    <div class="px-6" v-else>
      <h2 class="text-2xl md:text-3xl font-semibold mb-1 text-left">
        My orders
      </h2>
      <h6 class="text-xs">
        To view your orders, please enter your reference number and student ID.
      </h6>

      <div class="flex flex-col gap-5 mt-8">
        <md-outlined-text-field
          v-model.trim="reference"
          label="Reference No."
          prefix-text="CSPS"
          @keydown.enter="submit"
          @paste="onPaste"
        >
          <md-icon slot="leading-icon" v-html="icon('receipt', true)" />
        </md-outlined-text-field>
        <md-outlined-text-field @keydown.enter="submit" v-model.trim="studentId" label="Student ID" type="number">
          <md-icon slot="leading-icon" v-html="icon('badge', true)" />
        </md-outlined-text-field>
        
        <div class="flex justify-end items-center">
          <md-filled-button @click="submit" :disabled="reference.length === 0 || studentId.length === 0 || isFetching" class="w-1/3">
            {{ isFetching ? 'Finding order...' : 'View order' }}
          </md-filled-button>
        </div>
  
        <p class="body-small text-right">
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
import { Endpoints, makeRequest } from "~/network/request";
import { toast } from "vue3-toastify";

import "@material/web/icon/icon";
import "@material/web/progress/linear-progress";
import "@material/web/textfield/outlined-text-field";
import "@material/web/button/filled-button";
import "@material/web/select/filled-select";
import "@material/web/chips/filter-chip";
import "@material/web/chips/chip-set";
import "@material/web/select/select-option";

import CardOrder from "../admin/components/CardOrder.vue";
import VPagination from "~/components/VPagination.vue";
import { createPagination } from "~/utils/pagination";
import { PaginationRequest } from "~/types/request";

const store = useStore();
const router = useRouter();

const message = ref("");
const reference = ref("");
const studentId = ref("");
const isFetching = ref(false);

const data = ref({
  total: 0,
  orders: [] as FullOrderModel[],
  page: 1,
  search: "",
  filterStatus: [OrderStatus.PENDING_PAYMENT],
  column: FullOrderEnum.reference,
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
  FullOrderEnum.reference,
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

  const request = createPagination({
    page: data.value.page,
    limit: 8,
    search: {
      key: [data.value.column, ...Array(data.value.filterStatus.length).fill(FullOrderEnum.status)],
      value: [search, ...data.value.filterStatus]
    },
    sort: {
      key: FullOrderEnum.date_stamp,
      type: "DESC"
    }
  });

  if (data.value.filterStatus.length === 0) {
    message.value = "Select at least one status";
    store.isLoading = false;
    data.value.orders = [];
    return;
  }

  makeRequest<FullOrderModel[], PaginationRequest>("GET", Endpoints.Orders, request, response => {
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
  if (reference.value.length === 0 || studentId.value.length === 0) return;

  isFetching.value = true;
  store.isLoading = true;

  const request = createPagination({
    search: {
      key: [FullOrderEnum.reference, FullOrderEnum.student_id],
      value: ["CSPS" + reference.value, studentId.value]
    },
  });

  makeRequest<FullOrderModel[], PaginationRequest>("GET", Endpoints.Orders, request, response => {
    isFetching.value = false;
    store.isLoading = false;

    if (response.success) {
      router.push({ name: "My Order", params: { uniqueId: response.data[0].unique_id }});
      return;
    }

    toast.warn(response.message);
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

/**
 * Handle pasting of reference number
 */
function onPaste(e: ClipboardEvent) {
  if (!e.clipboardData) return;

  e.preventDefault();
  e.stopPropagation();

  // Get pasted data via clipboard API
  const text = (e.clipboardData.getData("text/plain") || "").trim();
  // Discard if empty
  if (text.length === 0) return;

  // If pasted text starts with CSPS
  if (text.startsWith("CSPS")) {
    // Remove CSPS prefix and set the value
    reference.value = text.replace("CSPS", "");
    return;
  }

  // otherwise, append the text
  reference.value += text;
}
</script>