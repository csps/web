<template>
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center flex-col lg:flex-row gap-3 mb-3">
      <div class="flex items-center gap-3 text-2xl font-medium text-on-surface-variant mb-3 lg:mb-0">
        <h2>Products</h2>
        <md-assist-chip label="Add" aria-label="Add product" title="Add product" @click="isDialogOpen = true">
          <md-icon slot="icon" v-html="icon('add')" />
        </md-assist-chip>
      </div>

      <div class="flex items-center gap-3 relative bottom-2">
        <md-filled-text-field  @keyup.enter="fetchProducts(data.search)" v-model="data.search" :label="capitalize(data.column)">
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
                  v-for="option in ProductEnum"
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
        <md-filled-button @click="fetchProducts(data.search)" :disabled="isLoading">
          Search
        </md-filled-button>
      </div>
    </div>

    <div>
      <VTable
        :loading="isLoading"
        :headers="headers"
        :data="data.products"
        @edit="onEdit"
        no-delete
      >
        <template v-slot:name="{ row }: { row: ProductModel }">
          <div class="flex gap-2 items-center">
            <img v-if="row.photos_hash" :src="getPhotoLink(row.photos_hash)" width="20" />
            <span>{{ row.name }}</span>
          </div>
        </template>

        <template v-slot:price="{ row }: { row: ProductModel }">
          <span class="font-medium">
            &#8369; {{ row.price }}
          </span>
        </template>

        <template v-slot:stock="{ row }: { row: ProductModel }">
          <span class="font-medium">
            {{ row.stock }}
          </span>
        </template>

        <template v-slot:is_available="{ row }: { row: ProductModel }">
          <md-switch
            icons
            :selected="row.is_available"
            @change="(e: any) =>
              updateProductKey(row.slug, ProductEnum.is_available, e.target.selected ? '1' : '0')
            "
          />
        </template>
      </VTable>

      <div v-if="message.length > 0 && data.products.length === 0" class="flex justify-center py-4 text-error font-medium">
        {{ message }}
      </div>

      <VPagination
        class="mt-5"
        v-if="data.products.length > 0"
        :limit="parseInt(Env.admin_products_per_page)"
        :page="data.page"
        :total="data.total"
        @change="p => goToPage(p)"
      />

      <DialogAdminProducts
        v-model="isDialogOpen"
        :product="selectedProduct"
        @done="fetchProducts"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { ProductEnum } from "~/types/models";
import { icon } from "~/utils/icon";
import { useStore } from "~/store";
import { capitalize } from "~/utils/string";
import { getPhotoLink } from "~/utils/network";

import { Env } from "~/config";
import { toast } from "vue3-toastify";
import { Endpoints, makeRequest } from "~/network/request";
import { createPagination } from "~/utils/pagination";
import { PaginationRequest } from "~/types/request";

import "@material/web/icon/icon";
import "@material/web/menu/menu";
import "@material/web/switch/switch";
import "@material/web/menu/menu-item";
import "@material/web/iconbutton/icon-button";
import "@material/web/textfield/filled-text-field";

import VTable from '~/components/VTable.vue';
import VPagination from "~/components/VPagination.vue";
import DialogAdminProducts from "~/components/dialogs/DialogAdminProducts.vue";

const store = useStore();
const message = ref("");
const selectedProduct = ref<ProductModel | undefined>();
const isDialogOpen = ref(false);
const isLoading = ref(false);
const isMenuOpen = ref(false);
const isSearched = ref(false);

const headers: TableHeader[] = [
  { id: ProductEnum.id, text: "#" },
  { id: ProductEnum.name, text: "Name" },
  { id: ProductEnum.slug, text: "URL Slug" },
  { id: ProductEnum.description, text: "Description", max: 100 },
  { id: ProductEnum.price, text: "Price", align: "right" },
  { id: ProductEnum.stock, text: "Stocks", align: "right" },
  { id: ProductEnum.is_available, text: "Status" },
];

const data = ref({
  total: 0,
  page: 1,
  search: "",
  products: [] as ProductModel[],
  column: ProductEnum.name
});

watch(isDialogOpen, v => {
  if (!v) {
    selectedProduct.value = undefined;
  }
});

onMounted(fetchProducts);

function goToPage(page: number) {
  data.value.page = page;
  fetchProducts(isSearched ? data.value.search : "");
}

function fetchProducts(search = "") {
  isLoading.value = true;
  store.isLoading = true;

  if (!isSearched.value && search.length > 0) {
    data.value.page = 1;
  }

  isSearched.value = search.length > 0;

  const request = createPagination({
    page: data.value.page,
    limit: Number(Env.admin_products_per_page),
    search: {
      key: [data.value.column],
      value: [search]
    },
  });

  makeRequest<ProductModel[], PaginationRequest>("GET", Endpoints.Products, request, response => {
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

/**
 * Edit product
 */
function onEdit(product: ProductModel) {
  selectedProduct.value = product;
  isDialogOpen.value = true;
}

/**
 * Update product
 */
function updateProductKey(slug: string, key: ProductEnum, value: string) {
  if (!slug) {
    toast.warn("Product slug is empty!");
    return;
  }

  store.isLoading = true;

  makeRequest<null, { slug: string, key: ProductEnum, value: string }>("PUT", Endpoints.ProductsKey, {
    slug, key, value
  }, response => {
    store.isLoading = false;

    if (response.success) {
      toast.success(response.message);
      return;
    }

    message.value = response.message;
    toast.error(response.message);
  });
}
</script>
