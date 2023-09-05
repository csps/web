<template>
  <div class="flex flex-col justify-center items-center w-full px-6 container mx-auto h-full">
    <md-filled-button @click="isDialogOpen = true" class="mb-5">
      <md-icon slot="icon" v-html="icon('add')" />
      Add Product
    </md-filled-button>

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
          v-for="option in ProductEnum"
          :key="option"
          :value="option"
          :headline="capitalize(option)"
        />
      </md-outlined-select>
    </div>

    <div v-if="data.products.length > 0" class="space-y-3 mt-5 w-full lg:w-3/4 xl:w-1/2 3xl:w-1/3">
      <ProductCard v-for="product in data.products" :key="product.id" :product="product" />
    </div>
    <div v-else class="flex justify-center mt-8 flex-grow body-medium">
      {{ message || "Fetching products..." }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { ProductEnum } from "~/types/models";
import { icon } from "~/utils/icon";
import { useStore } from "~/store";
import { capitalize } from "~/utils/string";

import { Env } from "~/config";
import { Endpoints, makeRequest } from "~/network/request";

import ProductCard from "../components/ProductCard.vue";

const store = useStore();
const isDialogOpen = ref(false);
const isLoading = ref(false);
const message = ref("");

const data = ref({
  total: 0,
  page: 1,
  search: "",
  products: [] as ProductModel[],
  column: ProductEnum.name
});

watch([
  () => data.value.search,
  () => data.value.column,
  () => data.value.page,
], v => {
  fetchProducts(v[0]);
});

onMounted(fetchProducts);

function fetchProducts(search = "") {
  isLoading.value = true;
  store.isLoading = true;

  const request: any = {
    search_value: [search],
    search_column: [data.value.column],
    page: data.value.page,
    limit: Env.admin_products_per_page
  };

  makeRequest<ProductModel[]>("GET", Endpoints.Products, request, response => {
    isLoading.value = false;
    store.isLoading = false;
    data.value.products = [];

    if (response.success) {
      data.value.total = response.count || 0;
      data.value.products = response.data;
      return;
    }

    message.value = response.message;
  });
}

</script>