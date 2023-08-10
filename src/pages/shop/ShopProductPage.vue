<template>
  <div class="container mx-auto p-6 w-full h-full flex items-center justify-center text-on-surface-variant">
    <div class="flex flex-col justify-center items-center h-full" v-if="product === null || isLoading">
      <div v-if="isLoading">
        <md-linear-progress indeterminate />
        <p class="mt-3">Fetching product data...</p>
      </div>

      <div class="surface error" v-else>
        {{ message }}
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center h-full w-full">
      <div>
        <ImageTemplate class="md:!h-full" />
      </div>
      <div>
        <div class="flex justify-between mb-3">
          <div>
            <h2 class="headline-medium font-bold mb-1 text-primary">{{ product?.name }}</h2>
            <h4 class="title-large font-medium">
              &#8369; {{ product?.price }}.00
            </h4>
          </div>
          <div>
            <md-standard-icon-button toggle>
              <md-icon v-html="icon('favorite', true)" />
              <md-icon slot="selectedIcon" v-html="icon('favorite')" />
            </md-standard-icon-button>
          </div>
        </div>
        <p class="mb-3 body-medium">
          {{ product?.description }}
        </p>
  
        <div class="italic my-6 text-sm">
          <div v-if="product?.variations?.length">
            Show variations here
          </div>
          <span class="text-sm" v-else>
            No variations available
          </span>
        </div>
        
        <div class="mb-6 text-sm" :class="{ 'text-error': !product?.stock || product.stock <= 0 }">
          Stocks: {{ product?.stock }}
        </div>
        
        <div class="flex gap-3">
          <md-filled-button :disabled="!product?.stock || product.stock <= 0">
            {{ product?.stock && product.stock > 0 ? "Order" : "Out of stock" }}
          </md-filled-button>
          <router-link to="/shop">
            <md-tonal-button>
              Go back to shop
            </md-tonal-button>
          </router-link>
        </div>

        <p v-if="!product?.stock || product.stock <= 0" class="text-error text-sm mt-5">
          This product is out of stock. Please check back later.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Endpoints, makeRequest } from '~/network/request';
import { useStore } from '~/store';
import { setPageTitle } from '~/utils/page';
import { icon } from "~/utils/icon";

import "@material/web/icon/icon";
import "@material/web/divider/divider";
import "@material/web/button/filled-button";
import "@material/web/button/tonal-button";
import "@material/web/button/text-button";
import "@material/web/progress/linear-progress";
import "@material/web/iconbutton/standard-icon-button";

import ImageTemplate from '~/composables/ImageTemplate.vue';

const store = useStore();
const route = useRoute();

const product = ref<ProductResponse | null>();
const isLoading = ref(false);
const message = ref("");

onMounted(() => {
  // Set loading to true
  store.isLoading = true;
  isLoading.value = true;

  // Get product by id
  makeRequest<ProductResponse>("GET", Endpoints.ProductsId, {
    id: route.params.id,
  }, response => {
    // Set loading to false
    store.isLoading = false;
    isLoading.value = false;
    // Set product
    product.value = response.data || null;
    // Set message
    message.value = response.message;
    // Set page title
    setPageTitle(response.data?.name || "Product");
  });
});
</script>