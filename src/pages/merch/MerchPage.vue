<template>
  <div class="relative text-on-surface-variant">
    <!-- Call To Action -->
    <div class="rounded-br-3xl rounded-bl-3xl -z-[1]" v-show="!isLoading && message.length === 0">
      <div class="container mx-auto text-center pb-5 pt-12 xl:pt-16 2xl:pb-8 px-6">
        <h2 class="text-2xl md:text-3xl font-bold" data-sal="zoom-in" data-sal-repeat>
          Style your own groove
        </h2>
        <h5 class="text-sm sm:text-base px-0 md:px-32 mt-4 mb-6" data-sal="zoom-in" data-sal-repeat>
          Experience the pride and passion with our university merch.
        </h5>

        <router-link to="/orders">
          <md-filled-button title="See my orders" data-sal="zoom-in" data-sal-repeat>
            <md-icon slot="icon" v-html="icon('shopping_cart', true)" />
            My orders
          </md-filled-button>
        </router-link>
      </div>
    </div>

    <div class="flex justify-center container mx-auto py-5">
      <div v-if="isLoading" class="flex flex-col justify-center items-center gap-5 h-full">
        <md-linear-progress indeterminate />
        <p>Fetching products...</p>
      </div>

      <div class="text-error flex justify-center items-center gap-5 h-full" v-else-if="products === null || products.length === 0">
        {{ message }}
      </div>

      <div v-show="!isLoading && message.length === 0" class="-translate-y-1 px-6 w-full 3xl:w-3/5 !overflow-visible">
        <div class="flex justify-center flex-wrap gap-6">
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
const products = ref<ProductModel[]>([]);

onMounted(() => {
  makeRequest<ProductModel[]>("GET", Endpoints.Products, null, response => {
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