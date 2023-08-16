<template>
  <div class="container mx-auto p-6 w-full lg:w-3/4 xl:w-3/5 2xl:w-1/2 3xl:w-2/5 h-full flex-col flex justify-center text-on-surface-variant">

    <Transition name="slide-fade" mode="out-in">
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
  
        <div class="my-10 flex justify-center">
          <VImage v-if="product?.thumbnail && product?.thumbnail > 0" :src="getPhotoLink(product.thumbnail)" :alt="product.name" />
          <ImageTemplate class="w-full" v-else />
        </div> 
        
        <div class="mb-6">
          <h5 class="title-medium mb-1 font-medium">Description</h5>
          <p class="body-medium">
            {{ product?.description }}
          </p>
        </div>
  
        <div class="mb-6">
          <h5 class="title-medium mb-1 font-medium">Variants</h5>
          <div v-if="product?.variations && product.variations.length > 0">
            <p class="body-medium">
              Put variant options here
            </p>
          </div>
          <span class="body-medium" v-else>
            No variants available
          </span>
        </div>
  
        <div class="mb-6 flex flex-col items-center">
          <h5 class="title-medium mb-2 font-medium">Quantity</h5>
          <p class="body-medium">
            <md-outlined-select v-model="quantity" :disabled="!hasStock" quick>
              <md-select-option
                v-for="i in (hasStock ? product?.max_quantity : 1)"
                :key="i"
                :value="i"
                :headline="i"
              />
            </md-outlined-select>
          </p>
        </div>
        
        <p class="title-small text-center mb-3">
          <span v-if="hasStock">
            There are <span class="text-primary font-bold title-medium">{{ product?.stock }}</span> stocks left available.
          </span>
          <span class="text-error" v-else>
            We're sorry, but this product is currently out of stock. We expect to have more in stock soon!
          </span>
        </p>
  
        <!-- <div class="mb-6">
          <h5 class="title-medium mb-2 font-medium">Mode of Payment</h5>
          <div class="body-medium flex gap-5">
            <label class="space-x-2">
              <md-radio id="m" name="mop" :value="ModeOfPayment.WALK_IN" />
              <span>Walk-in</span>
            </label>
            <label class="space-x-2">
              <md-radio name="mop" :value="ModeOfPayment.GCASH" />
              <span>GCash</span>
            </label>
          </div>
        </div> -->
  
        <div class="flex justify-center gap-2">
          <md-filled-button @click="order" :disabled="!hasStock">
            {{ hasStock ? "Order" : "Out of stock" }}
          </md-filled-button>
        </div>
        
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store';
import { icon } from "~/utils/icon";
import { useRoute } from 'vue-router';
import { setPageTitle } from '~/utils/page';
import { ref, onMounted, computed } from 'vue';
import { Endpoints, makeRequest } from '~/network/request';
import { getPhotoLink } from '~/utils/network';
import { toast } from 'vue3-toastify';
// import { ModeOfPayment } from "~/types/enums";

import "@material/web/icon/icon";
import "@material/web/divider/divider";
import "@material/web/button/filled-button";
import "@material/web/button/text-button";
import "@material/web/progress/linear-progress";
import "@material/web/iconbutton/icon-button";
import "@material/web/select/outlined-select";
import "@material/web/select/select-option";
// import "@material/web/radio/radio"

import VImage from '~/components/VImage.vue';
import ImageTemplate from '~/composables/ImageTemplate.vue';

const store = useStore();
const route = useRoute();

const product = ref<ProductResponse | null>();
const hasStock = computed(() => product.value?.stock !== undefined && product.value?.stock > 0);
const quantity = ref(1);

const message = ref("");
const isLoading = ref(true);

onMounted(() => {
  // Set loading to true
  store.isLoading = true;

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

function order() {
  // If not logged in
  if (!store.isLoggedIn) {
    // Open dialog for acquiring user information
    toast.info("TODO: Open dialog for acquiring user information");
    return;
  }

  toast.success("Will order");
}
</script>