<template>
  <div class="relative flex flex-col">
    <!-- Call To Action -->
    <div class="rounded-br-3xl rounded-bl-3xl -z-[1]">
      <div class="container mx-auto text-center pt-12 pb-5 2xl:pt-16 2xl:pb-8 px-6">
        <h2 class="text-2xl md:text-3xl font-bold text-on-surface-variant">
          Style your own groove
        </h2>
        <h5 class="text-sm sm:text-base px-0 md:px-32 text-on-surface-variant mt-4 mb-6">
          Experience the pride and passion with our university merch.
        </h5>
      </div>
      <div class="w-full overflow-hidden">
        <canvas ref="waveEl" />
      </div>
    </div>

    <div class="bg-surface-variant text-on-surface-variant h-full flex-grow">
      <div class="container mx-auto flex flex-col justify-center items-center py-20 h-full w-full">

        <div v-if="isLoading">
          <md-linear-progress indeterminate />
          <p class="mt-3">Fetching products...</p>
        </div>
        
        <div class="text-error" v-else-if="products === null || products.length === 0">
          {{ message }}
        </div>

        <div v-show="!isLoading" class="-translate-y-1 px-6 w-full xl:w-4/5 3xl:w-3/5 !overflow-visible">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
import { ref, watch, onMounted } from "vue";
import { useStore } from "~/store";
import wave from "~/utils/wave";
import sal from "sal.js";

import "@material/web/progress/linear-progress";

import ProductCard from "~/composables/ProductCard.vue";
import { Endpoints, makeRequest } from "~/network/request";
import { toast } from "vue3-toastify";

const store = useStore();
const waveEl = ref();
const isLoading = ref(true);
const message = ref("");
const products = ref<ProductResponse[]>([]);

let wavifyInstance: {
  setColor: (color: string) => void;
};

watch(() => store.isDark, v => {
  if (!wavifyInstance) return;
  wavifyInstance.setColor(v ? "#4c444d" : "#ebdfe9");
})

onMounted(() => {
  wavifyInstance = wave(waveEl.value, store.isDark ? "#4c444d" : "#ebdfe9");

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