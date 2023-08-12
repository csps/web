<template>
  <div class="relative text-on-surface-variant">
    <!-- Call To Action -->
    <div class="rounded-br-3xl rounded-bl-3xl -z-[1]">
      <div class="container mx-auto text-center pt-12 pb-5 xl:pt-16 2xl:pb-8 px-6">
        <h2 class="text-2xl md:text-3xl font-bold">
          Style your own groove
        </h2>
        <h5 class="text-sm sm:text-base px-0 md:px-32 mt-4 mb-6">
          Experience the pride and passion with our university merch.
        </h5>

        <router-link to="/orders">
          <md-filled-button title="See my orders">
            <md-icon slot="icon" v-html="icon('shopping_cart', true)" />
            My orders
          </md-filled-button>
        </router-link>
      </div>
    </div>

    <div class="h-full flex-grow">
      <div class="container mx-auto flex flex-col justify-center items-center py-5 h-full w-full">

        <div v-if="isLoading">
          <md-linear-progress indeterminate />
          <p class="mt-3">Fetching products...</p>
        </div>
        
        <div class="text-error" v-else-if="products === null || products.length === 0">
          {{ message }}
        </div>

        <div v-show="!isLoading" class="-translate-y-1 px-6 w-full xl:w-4/5 3xl:w-3/5 !overflow-visible">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <ProductCard
              v-for="(product, i) in products"
              :key="product.id"
              :product="product"
              data-sal-duration="300"
              data-sal="slide-up"
              :data-sal-delay="100 * i"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Endpoints, makeRequest } from "~/network/request";
import { toast } from "vue3-toastify";
import { icon } from "~/utils/icon";
import sal from "sal.js";

import "@material/web/icon/icon";
import "@material/web/button/filled-button";
import "@material/web/progress/linear-progress";

import ProductCard from "~/composables/ProductCard.vue";

const isLoading = ref(true);
const message = ref("");
const products = ref<ProductResponse[]>([]);

onMounted(() => {
  makeRequest<ProductResponse[]>("GET", Endpoints.Products, null, response => {
    isLoading.value = false;

    if (response.success) {
      products.value = response.data;
      setTimeout(sal, 0);
      return;
    }

    message.value = response.message;
    toast.error(response.message);
  });
});
</script>