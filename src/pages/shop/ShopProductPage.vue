<template>
  <div class="container mx-auto p-6 w-full lg:w-3/4 xl:w-3/5 2xl:w-1/2 3xl:w-2/5 h-full flex-col flex justify-center text-on-surface-variant">

    <div class="flex flex-col justify-center items-center h-full" v-if="product === null || isLoading">
      <div v-if="isLoading">
        <md-linear-progress indeterminate />
        <p class="mt-3">Fetching product data...</p>
      </div>

      <div class="surface error" v-else>
        {{ message }}
      </div>
    </div>

    <div v-else class="grid grid-cols-1 justify-center h-full w-full mt-5">

      <div class="flex justify-between items-center">
        <div>
          <h2 class="headline-small mb-1 font-medium">{{ product?.name }}</h2>
          <h4 class="title-large">
            &#8369; {{ product?.price }}.00
          </h4>
        </div>
        <div>
          <md-icon-button toggle>
            <md-icon v-html="icon('favorite', true)" />
            <md-icon slot="selectedIcon" v-html="icon('favorite')" />
          </md-icon-button>
        </div>
      </div>

      <div class="my-5">
        <ImageTemplate />
      </div> 

      <p class="title-medium text-center mb-5">
        <span v-if="product?.stock !== undefined && product?.stock > 0">
          There are <span class="text-primary font-bold">{{ product?.stock }}</span> stocks available.
        </span>
      </p>

      <div class="mb-6">
        <h5 class="title-medium mb-1 font-medium">Description</h5>
        <p class="body-medium">
          {{ product?.description }}
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
import "@material/web/button/text-button";
import "@material/web/progress/linear-progress";
import "@material/web/iconbutton/icon-button";

import ImageTemplate from '~/composables/ImageTemplate.vue';

const store = useStore();
const route = useRoute();

const product = ref<ProductResponse | null>();

const message = ref("");
const isLoading = ref(false);

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